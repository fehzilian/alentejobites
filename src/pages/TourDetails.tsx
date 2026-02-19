import React, { useState, useEffect, useRef } from 'react';
import { Page, Tour } from '../types.ts';
import { TOURS } from '../data.tsx';
import { Button, Section, Drawer } from '../components/UI.tsx';
import { SEO } from '../components/SEO.tsx';
import { SocialShare } from '../components/SocialShare.tsx';
import { Calendar } from '../components/Calendar.tsx';
import { supabase } from '../lib/supabase.ts';

interface TourDetailsProps {
  onNavigate: (page: Page) => void;
  onBook: (tourId: string, date?: Date, time?: string, guests?: number) => Promise<void> | void;
  tourId: 'evening' | 'brunch';
}

export const TourDetails: React.FC<TourDetailsProps> = ({ onNavigate, onBook, tourId }) => {
  const tour = TOURS.find(t => t.id === tourId) as Tour;
  
  // Booking State
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(1);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  
  // Real Data State
  const [availability, setAvailability] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const bookingWidgetRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const isEvening = tourId === 'evening';
  const hasBadges = tour.badges && tour.badges.length > 0;

  const heroStats = isEvening
    ? [
        { label: 'Duration', value: '3.5 hours' },
        { label: 'Distance', value: 'Easy 1.5 km walk' },
        { label: 'Group Size', value: `Up to ${tour.maxCapacity} guests` },
        { label: 'Start Time', value: tour.time },
      ]
    : [
        { label: 'Duration', value: '3 hours' },
        { label: 'Distance', value: 'Easy 1.3 km walk' },
        { label: 'Group Size', value: `Up to ${tour.maxCapacity} guests` },
        { label: 'Start Time', value: tour.time },
      ];

  const storyIntro = isEvening
    ? [
        'The Évora Evening Bites is designed for travelers who want more than a typical tasting. You will walk through the historic center at golden hour, stop at local family-run venues, and taste the dishes locals actually order after work.',
        'Along the way, your guide connects every bite to Alentejo traditions, from cured meats and tavern culture to regional wines and convent sweets. It is social, relaxed, and paced so you can enjoy every stop without rushing.',
      ]
    : [
        'The Morning Bites is a slower, brighter way to discover Évora. You will start with classic café culture, continue through market life, and experience how locals build flavor into everyday breakfast and lunch tables.',
        'This route combines fresh produce, bakery traditions, and olive oil heritage with stories about neighborhood life. It is ideal if you prefer daytime tours and want a rich food experience before the afternoon heat.',
      ];

  const quickSummary = isEvening
    ? [
        { title: 'The Alentejo Welcome', description: 'Porco Preto presunto, aged sheep cheese, and a crisp white from nearby vineyards.' },
        { title: 'The Portuguese Classic', description: 'A proper bifana paired with sparkling Vinho Verde in a laid-back local spot.' },
        { title: 'The Tavern Table', description: 'Seasonal petiscos shared family-style with a structured Alentejo red wine.' },
        { title: 'Sweet & Digestif Finale', description: 'Traditional convent dessert and local digestif to close the evening.' },
      ]
    : [
        { title: 'Historic Café Rituals', description: 'Coffee culture and pastries served in beloved morning meeting points.' },
        { title: 'Municipal Market Walk', description: 'Fresh produce, olives, cheeses, and conversations with local vendors.' },
        { title: 'Bread & Olive Oil Tasting', description: 'Artisan bread with premium olive oil and regional seasoning traditions.' },
        { title: 'Morning Signature Bite', description: 'A savory local specialty that ties together the morning food identity.' },
      ];

  const inclusions = isEvening
    ? ['7+ tastings across savory and sweet stops', '4 carefully paired drinks (wine + local pours)', 'Local guide and cultural storytelling', 'Small-group format for a more personal pace']
    : ['6+ tastings focused on morning flavors', 'Coffee and non-alcoholic pairings', 'Market walk with product insights', 'Local guide and practical food recommendations'];

  const notIncluded = ['Hotel pickup/drop-off', 'Extra drinks beyond the tasting menu', 'Gratuities (optional)'];

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [tourId]);

  // --- FETCH REAL AVAILABILITY ---
  useEffect(() => {
    const fetchBookings = async () => {
        setIsLoading(true);
        try {
            const todayStr = new Date().toISOString().split('T')[0];
            const { data, error } = await supabase
                .from('bookings')
                .select('date, guests')
                .eq('tour_id', tourId)
                .gte('date', todayStr)
                .neq('payment_status', 'cancelled');

            if (!error && data) {
                const counts: Record<string, number> = {};
                data.forEach((booking: any) => {
                    const dateKey = booking.date; 
                    counts[dateKey] = (counts[dateKey] || 0) + booking.guests;
                });
                setAvailability(counts);
            }
        } catch (err) {
            // Silently fail to allow UI to render even if DB is down
        } finally {
            setIsLoading(false);
        }
    };
    fetchBookings();
  }, [tourId]);

  const getSpotsLeft = (date: Date) => {
      const key = date.toISOString().split('T')[0];
      const booked = availability[key] || 0;
      return Math.max(0, tour.maxCapacity - booked);
  };

  useEffect(() => {
    if (selectedDate && !selectedTime) setSelectedTime(tour.time);
  }, [selectedDate, selectedTime, tour.time]);

  // Handle Hash Navigation (for "Book Now" click from Home)
  useEffect(() => {
    if (window.location.hash === '#book') {
        if (window.innerWidth < 1024) {
            setIsMobileDrawerOpen(true);
        } else {
            bookingWidgetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
  }, []);

  const seoData = isEvening ? {
      title: "The Évora Evening Bites | Dinner Walking Experience",
      desc: "Join a relaxed evening walking food tour in Évora with presunto, bifana, petiscos, dessert, and Alentejo wines."
  } : {
      title: "The Morning Bites | Morning Market & Food Walk",
      desc: "Explore Évora in the morning with coffee, pastries, market tastings, olive oil, and regional bites."
  };

  const totalPrice = tour.price * guests;
  const totalRegularPrice = tour.regularPrice * guests;

  const BookingForm = () => (
    <div className="flex flex-col gap-6">
        <div className="border-b border-gray-100 pb-4">
            <h3 className="font-serif text-2xl text-charcoal font-bold">Book your spot</h3>
            <p className="text-sm text-gray-500">Instant confirmation via Email</p>
        </div>

        <div>
            <label className="block text-xs font-bold text-olive uppercase tracking-wide mb-3 flex justify-between">
                <span>Select Date</span>
                {selectedDate && <span className="text-terracotta">{selectedDate.toLocaleDateString()}</span>}
            </label>
            <Calendar 
                selectedDate={selectedDate} 
                onDateSelect={(date) => {
                    setSelectedDate(date);
                    const spots = getSpotsLeft(date);
                    if (guests > spots) setGuests(1);
                }} 
                availability={availability}
                maxCapacity={tour.maxCapacity}
            />
        </div>

        <div>
            <label className="block text-xs font-bold text-olive uppercase tracking-wide mb-2">Guests</label>
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
                <span className="text-sm font-medium text-gray-600">Adults (€{tour.price})</span>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-600 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors"
                        disabled={guests <= 1}
                    >
                        -
                    </button>
                    <span className="font-bold text-lg w-4 text-center">{guests}</span>
                    <button 
                        onClick={() => setGuests(Math.min(selectedDate ? getSpotsLeft(selectedDate) : 12, guests + 1))}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-600 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={selectedDate ? guests >= getSpotsLeft(selectedDate) : guests >= 12}
                    >
                        +
                    </button>
                </div>
            </div>
             {selectedDate && getSpotsLeft(selectedDate) === 0 && (
                <p className="text-[10px] text-red-500 mt-1">Date sold out.</p>
             )}
             {selectedDate && getSpotsLeft(selectedDate) > 0 && getSpotsLeft(selectedDate) < 4 && (
                <p className="text-[10px] text-orange-500 mt-1 font-bold">Only {getSpotsLeft(selectedDate)} spots left!</p>
             )}
        </div>

        <div className="mt-2 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-end mb-4">
                <span className="text-sm text-gray-500 font-medium">Total</span>
                <div className="text-right">
                    {tour.regularPrice > tour.price && (
                        <span className="block text-xs text-gray-400 line-through">€{totalRegularPrice}</span>
                    )}
                    <span className="text-3xl font-serif font-bold text-terracotta">€{totalPrice}</span>
                </div>
            </div>

            <Button 
                fullWidth 
                onClick={() => onBook(tour.id, selectedDate || undefined, tour.time, guests)} 
                disabled={isLoading || !selectedDate || getSpotsLeft(selectedDate!) === 0}
                className={`py-4 text-lg shadow-xl transition-all 
                    ${(isLoading || !selectedDate || getSpotsLeft(selectedDate!) === 0)
                        ? 'opacity-50 cursor-not-allowed bg-gray-300 hover:bg-gray-300 shadow-none' 
                        : 'hover:shadow-2xl hover:-translate-y-1 bg-[#25D366] hover:bg-[#128C7E] border-transparent'
                    }
                `}
            >
                {isLoading ? 'Checking...' : (selectedDate ? (getSpotsLeft(selectedDate) === 0 ? 'Sold Out' : 'Pay with Stripe') : 'Choose a Date')}
            </Button>
            
            <p className="text-[10px] text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
                Secure payment via Stripe. Spots are reserved immediately.
            </p>
        </div>
    </div>
  );

  return (
    <div className="pt-20 bg-white" ref={topRef}>
        <SEO title={seoData.title} description={seoData.desc} />
        
        {/* Header */}
        <div className="bg-cream border-b border-gray-100 pt-16 pb-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col gap-2">
                    {hasBadges && (
                        <div className="flex gap-2 mb-2">
                            {tour.badges?.map(badge => (
                                <span key={badge} className="bg-terracotta text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
                                    {badge}
                                </span>
                            ))}
                        </div>
                    )}
                    <h1 className="font-serif text-4xl md:text-6xl text-charcoal font-bold leading-tight">{tour.title}</h1>
                    <p className="text-2xl text-gray-500 italic font-serif">{tour.tagline}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                        {heroStats.map((stat) => (
                            <div key={stat.label} className="bg-white/90 border border-olive/10 rounded-lg px-4 py-3">
                                <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">{stat.label}</p>
                                <p className="text-sm md:text-base text-charcoal font-semibold">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content Grid */}
        <Section className="!py-12">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 relative">
                
                {/* Desktop Social Share (Left Sidebar) */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-32 flex flex-col items-center">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest rotate-180 mb-4 writing-vertical-lr">Share</span>
                        <SocialShare title={tour.title} />
                    </div>
                </div>

                {/* Main Content (Center) */}
                <div className="lg:col-span-7 pb-20">
                    <img src={tour.image} alt={tour.title} className="w-full h-80 md:h-[450px] object-cover rounded-xl shadow-md mb-10" />
                    
                    {/* Mobile Info Bar */}
                    <div className="md:hidden flex items-center justify-between text-xs font-bold text-gray-500 bg-gray-50 p-4 rounded-lg mb-8 border border-gray-100">
                        <div className="flex items-center gap-1"><span>⏰</span> {tour.time}</div>
                        <div className="flex items-center gap-1"><span>⏳</span> {tour.duration}</div>
                        <div className="flex items-center gap-1"><span>👟</span> 1.5km</div>
                    </div>

                    <div className="text-gray-700 max-w-none space-y-10">
                        <div>
                            <h3 className="font-serif text-3xl md:text-4xl text-olive mb-5">The Experience</h3>
                            <div className="space-y-5 text-lg leading-8">
                                {storyIntro.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-7">
                            <h3 className="font-serif text-3xl text-olive mb-4">Quick Summary</h3>
                            <ul className="space-y-4">
                                {quickSummary.map((item, index) => (
                                    <li key={item.title} className="flex gap-3 text-base leading-7">
                                        <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta text-white text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <h4 className="font-bold text-terracotta text-lg md:text-xl mb-1">{item.title}</h4>
                                            <p className="text-[17px] leading-7">{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="rounded-xl border border-olive/20 bg-olive/5 p-6">
                                <h3 className="font-serif text-2xl text-olive mb-3">What&apos;s Included</h3>
                                <ul className="space-y-2 text-base leading-7">
                                    {inclusions.map((item) => (
                                        <li key={item} className="flex gap-2"><span className="text-terracotta">✓</span><span>{item}</span></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                                <h3 className="font-serif text-2xl text-olive mb-3">Not Included</h3>
                                <ul className="space-y-2 text-base leading-7 text-gray-700">
                                    {notIncluded.map((item) => (
                                        <li key={item} className="flex gap-2"><span className="text-gray-400">•</span><span>{item}</span></li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10 bg-yellow-50 p-6 rounded-lg border border-gold/40">
                             <h4 className="font-bold text-olive mb-2 text-lg">🌱 Dietary Accommodations</h4>
                             <p className="text-base leading-7">Vegetarian? Gluten-Free? Food allergies? We can adapt most tastings with advance notice when you book.</p>
                        </div>
                    </div>
                </div>

                {/* Booking Widget (Right Sidebar - Desktop Only) */}
                <div className="lg:col-span-4 relative hidden lg:block">
                    <div 
                        ref={bookingWidgetRef}
                        className="sticky top-28 bg-white p-6 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-30"
                    >
                        <BookingForm />
                    </div>
                </div>
            </div>
        </Section>

        {/* Mobile Sticky Footer */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] flex items-center justify-between safe-area-bottom">
             <div className="flex flex-col">
                 <span className="text-xs text-gray-500 uppercase tracking-wide">Total</span>
                 <span className="font-serif font-bold text-2xl text-terracotta">€{totalPrice}</span>
             </div>
             <Button 
                onClick={() => setIsMobileDrawerOpen(true)}
                className="!px-8 shadow-lg"
             >
                 {selectedDate ? 'Continue' : 'Check Availability'}
             </Button>
        </div>

        <Drawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)}>
            <BookingForm />
        </Drawer>
    </div>
  );
};
