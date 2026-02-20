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
  const [activeInfoTab, setActiveInfoTab] = useState<'summary' | 'included' | 'notIncluded' | 'dietary'>('summary');
  const [galleryIndex, setGalleryIndex] = useState(0);
  
  // Real Data State
  const [availability, setAvailability] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const bookingWidgetRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const isEvening = tourId === 'evening';
  const hasBadges = tour.badges && tour.badges.length > 0;
  const pickupPointLabel = 'Largo do Conde de Vila Flor, 7000-804 Évora';
  const pickupPointMapUrl = (import.meta as any).env?.VITE_PICKUP_POINT_MAP_URL || 'https://www.google.com/maps/place/Largo+do+Conde+de+Vila+Flor,+7000-804+%C3%89vora/@38.5728787,-7.9087468,19z/data=!3m1!4b1!4m14!1m7!3m6!1s0xd19e4dd098f7a41:0x1a7638f5bfbe7fbd!2sTemplo+Romano+de+%C3%89vora!8m2!3d38.5725904!4d-7.9072944!16s%2Fm%2F03hlk1t!3m5!1s0xd19e4dda07f87b5:0xaddcc9a45a282541!8m2!3d38.5728777!4d-7.9075291!16s%2Fg%2F11c63_x270?entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D';
  const pickupPointEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(pickupPointLabel)}&z=18&output=embed`;

  const heroStats = isEvening
    ? [
        { label: 'Duration', value: '3 hours' },
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
        'The Évora Evening Bites is for travelers who want more than a classic sightseeing walk — combining Évora’s history with the food and wine locals truly enjoy. You’ll walk through Évora’s UNESCO historic center at golden hour, stopping at family-run venues and tasting the dishes residents often order after work.',
        'Along the way, your guide connects every bite to Alentejo traditions — from regional cheeses and cured meats to tavern culture, local wines, and conventual sweets. The experience follows the Alentejo spirit of vagar: relaxed, welcoming, and meant to be savored slowly.',
        'This evening walk includes 4 delicious tasting stops, each offering a true flavor of Évora and the Alentejo way of life.',
      ]
    : [
        'The Évora Brunch Bites is a relaxed morning food walk that combines sweet bakery flavors, regional tastings, and a traditional brunch-style lunch in the heart of Évora.',
        'Throughout the experience, you’ll enjoy fresh pastries and coffee, sample Alentejo cheeses, and classic local bites.',
        'Set within Évora’s UNESCO-listed historic center, this tour offers a satisfying taste of Alentejo cuisine from morning to midday, with 4 carefully selected stops meant to be enjoyed at a comfortable pace.',
      ];

  const quickSummary = isEvening
    ? [
        { title: '1st Stop – Local tasting & wine introduction', description: 'A welcome tasting of regional cheeses, charcuterie, and an introduction to Alentejo wine culture.' },
        { title: '2nd Stop – The famous regional sandwich', description: 'Enjoy Évora’s beloved regional bifana sandwich, paired with a refreshing glass of Vinho Verde.' },
        { title: '3rd Stop – Seasonal Alentejo dishes', description: 'A tasting of two warm traditional dishes, served with a glass of local wine.' },
        { title: '4th Stop – Final stop in a local tavern', description: 'Enjoy two regional plates, another glass of wine, and a conventual sweet to close the evening in true Alentejo tradition.' },
      ]
    : [
        { title: '1st Stop – Historic Bakery & Regional Sweets', description: 'Begin with three traditional pastries in a beloved local bakery, served with coffee or another drink.' },
        { title: '2nd Stop – Bifana & Vinho Verde', description: 'Enjoy the famous Portuguese bifana, paired with a light glass of Vinho Verde.' },
        { title: '3rd Stop – Regional Tasting Board', description: 'Sample a selection of regional cheese and charcuterie, served with local wine.' },
        { title: '4th Stop – Traditional Plates & Dessert', description: 'Finish with two regional dishes, a drink, and a sweet local dessert to complete your Évora brunch experience.' },
      ];

  const inclusions = isEvening
    ? [
        '9+ curated tastings, from local bites to traditional Alentejo specialties',
        '4 carefully paired drinks (wine-focused, with beer or non-alcoholic alternatives available)',
        'Small-group experience for a personal and relaxed pace',
        'Local guide with cultural storytelling and practical food recommendations',
      ]
    : [
        '8+ tastings focused on morning flavors',
        'Coffee and non-alcoholic pairings',
        '3 wine pairings',
        'Market walk',
      ];

  const notIncluded = ['Hotel pickup/drop-off', 'Extra drinks beyond the tasting menu', 'Gratuities (optional)'];

  const experienceGallery = isEvening
    ? [
        'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1529692236671-f1de44ff8a9a?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=900&h=700&fit=crop',
      ]
    : [
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1513267048331-5611cad62e41?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=900&h=700&fit=crop',
        'https://images.unsplash.com/photo-1464306076886-da185f6a9d05?w=900&h=700&fit=crop',
      ];

  const nextGalleryImage = () => {
    setGalleryIndex((prev) => (prev + 1) % experienceGallery.length);
  };

  const previousGalleryImage = () => {
    setGalleryIndex((prev) => (prev - 1 + experienceGallery.length) % experienceGallery.length);
  };

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'auto' });
    setGalleryIndex(0);
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
            
            <p className="text-[11px] text-gray-500 text-center mt-3 flex items-center justify-center gap-2">
                <span className="inline-flex items-center rounded-md border border-[#635BFF]/20 bg-[#635BFF]/10 px-2 py-0.5 text-[#635BFF] font-semibold tracking-wide">
                  stripe
                </span>
                <span>Secure payment. Spots are reserved immediately.</span>
            </p>

            <a
              href={pickupPointMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-olive/20 bg-cream/60 px-3 py-2 text-xs font-semibold text-olive hover:bg-cream transition-colors"
            >
              <span>📍</span>
              <span>Open pickup point in Google Maps ({pickupPointLabel})</span>
            </a>


            <div className="mt-3 overflow-hidden rounded-xl border border-olive/20 bg-white">
              <div className="px-3 py-2 border-b border-olive/10 bg-cream/50">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-olive">Meeting point mini map</p>
              </div>
              <iframe
                title="Meeting point map"
                src={pickupPointEmbedUrl}
                className="w-full h-44"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
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

                        <div className="rounded-xl border border-olive/20 bg-white shadow-sm overflow-hidden">
                            <div className="flex flex-wrap gap-2 px-3 py-3 bg-cream/70 border-b border-olive/10">
                                <button onClick={() => setActiveInfoTab('summary')} className={`px-3 py-1 text-xs rounded-full transition-colors ${activeInfoTab === 'summary' ? 'bg-olive text-white' : 'bg-white text-olive border border-olive/20'}`}>Quick Summary</button>
                                <button onClick={() => setActiveInfoTab('included')} className={`px-3 py-1 text-xs rounded-full transition-colors ${activeInfoTab === 'included' ? 'bg-olive text-white' : 'bg-white text-olive border border-olive/20'}`}>What&apos;s Included</button>
                                <button onClick={() => setActiveInfoTab('notIncluded')} className={`px-3 py-1 text-xs rounded-full transition-colors ${activeInfoTab === 'notIncluded' ? 'bg-olive text-white' : 'bg-white text-olive border border-olive/20'}`}>Not Included</button>
                                <button onClick={() => setActiveInfoTab('dietary')} className={`px-3 py-1 text-xs rounded-full transition-colors ${activeInfoTab === 'dietary' ? 'bg-olive text-white' : 'bg-white text-olive border border-olive/20'}`}>Dietary</button>
                            </div>

                            <div className="p-4 md:p-5">
                                {activeInfoTab === 'summary' && (
                                    <div>
                                        <h3 className="font-serif text-xl text-olive mb-3">The 4 Stops</h3>
                                        <ul className="space-y-2.5">
                                            {quickSummary.map((item, index) => (
                                                <li key={item.title} className="flex gap-2.5 text-sm leading-6">
                                                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-terracotta text-white text-[10px] font-bold">{index + 1}</span>
                                                    <div>
                                                        <h4 className="font-bold text-terracotta text-sm md:text-base mb-0.5">{item.title}</h4>
                                                        <p className="text-xs md:text-sm leading-5 text-gray-700">{item.description}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {activeInfoTab === 'included' && (
                                    <div>
                                        <h3 className="font-serif text-xl text-olive mb-2">What&apos;s Included</h3>
                                        <ul className="space-y-1.5 text-xs md:text-sm leading-6">
                                            {inclusions.map((item) => (
                                                <li key={item} className="flex gap-2"><span className="text-terracotta">✓</span><span>{item}</span></li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {activeInfoTab === 'notIncluded' && (
                                    <div>
                                        <h3 className="font-serif text-xl text-olive mb-2">Not Included</h3>
                                        <ul className="space-y-1.5 text-xs md:text-sm leading-6 text-gray-700">
                                            {notIncluded.map((item) => (
                                                <li key={item} className="flex gap-2"><span className="text-gray-400">•</span><span>{item}</span></li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {activeInfoTab === 'dietary' && (
                                    <div className="bg-yellow-50 p-3 rounded-lg border border-gold/40">
                                        <h4 className="font-bold text-olive mb-1 text-sm">🌱 Dietary Accommodations</h4>
                                        <p className="text-xs md:text-sm leading-6">Vegetarian? Gluten-Free? Food allergies? We can adapt most tastings with advance notice when you book.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h4 className="font-serif text-xl text-olive">Experience Gallery</h4>
                                <div className="flex items-center gap-2">
                                    <button onClick={previousGalleryImage} className="h-8 w-8 rounded-full border border-olive/20 text-olive hover:bg-olive hover:text-white transition-colors">‹</button>
                                    <button onClick={nextGalleryImage} className="h-8 w-8 rounded-full border border-olive/20 text-olive hover:bg-olive hover:text-white transition-colors">›</button>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-black/5">
                                <img
                                  src={experienceGallery[galleryIndex]}
                                  alt={`Experience moment ${galleryIndex + 1}`}
                                  className="w-full h-[360px] md:h-[430px] object-cover transition-all duration-500"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/55 to-transparent text-white text-xs md:text-sm">
                                    Photo {galleryIndex + 1} of {experienceGallery.length}
                                </div>
                            </div>

                            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                                {experienceGallery.map((image, index) => (
                                    <button
                                      key={image}
                                      onClick={() => setGalleryIndex(index)}
                                      className={`overflow-hidden rounded-md border ${galleryIndex === index ? 'border-terracotta ring-1 ring-terracotta/40' : 'border-gray-200'}`}
                                    >
                                      <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-12 md:h-14 object-cover" />
                                    </button>
                                ))}
                            </div>
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
                onClick={() => {
                  if (selectedDate && getSpotsLeft(selectedDate) > 0) {
                    onBook(tour.id, selectedDate, tour.time, guests);
                    return;
                  }
                  setIsMobileDrawerOpen(true);
                }}
                className="!px-8 shadow-lg"
             >
                 {selectedDate ? (getSpotsLeft(selectedDate) === 0 ? 'Sold Out' : 'Pay with Stripe') : 'Check Availability'}
             </Button>
        </div>

        <Drawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)}>
            <BookingForm />
        </Drawer>
    </div>
  );
};
