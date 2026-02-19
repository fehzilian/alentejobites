import React, { useEffect, useRef, useState } from 'react';
import { Page } from '../types.ts';
import { BLOG_POSTS, TOURS } from '../data.tsx';
import { Button, Section, SectionTitle } from '../components/UI.tsx';
import { SEO } from '../components/SEO.tsx';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onBook: (tourId: string) => void;
  onBlogClick?: (postId: number) => void;
}

// --- Helper Components ---
const FAQItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gold/20 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className={`font-serif text-lg md:text-xl transition-colors ${isOpen ? 'text-terracotta' : 'text-olive group-hover:text-terracotta'}`}>
          {question}
        </span>
        <span className={`ml-4 flex-shrink-0 text-gold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-gray-600 leading-relaxed pr-8">
          {answer}
        </div>
      </div>
    </div>
  );
};

interface BlogSidebarProps {
    className?: string;
    onBlogClick?: (id: number) => void;
    onViewAllClick?: () => void;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ className, onBlogClick, onViewAllClick }) => (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-6 ${className}`}>
        <h3 className="font-serif text-2xl text-olive mb-6 border-b border-gold/20 pb-3">Latest Stories</h3>
        <div className="space-y-6">
            {/* Show only first 5 posts in sidebar */}
            {BLOG_POSTS.slice(0, 5).map((post) => (
                <div 
                    key={post.id} 
                    className="group cursor-pointer flex gap-4 items-start"
                    onClick={() => onBlogClick && onBlogClick(post.id)}
                >
                    <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded-lg group-hover:opacity-80 transition-opacity" />
                    <div>
                        <div className="text-xs text-terracotta font-bold uppercase mb-1">{post.date}</div>
                        <h4 className="font-serif text-sm font-semibold text-charcoal group-hover:text-olive group-hover:underline transition-colors leading-tight">
                            {post.title}
                        </h4>
                    </div>
                </div>
            ))}
        </div>
        <button 
            onClick={onViewAllClick}
            className="w-full mt-6 text-sm font-bold text-olive uppercase tracking-wide border border-olive rounded-full py-2 hover:bg-olive hover:text-white transition-colors"
        >
            Read Our Blog
        </button>
    </div>
);

export const Home: React.FC<HomeProps> = ({ onNavigate, onBook, onBlogClick }) => {
  const [showAllFAQs, setShowAllFAQs] = useState(false);
  const [heroVideoSrc, setHeroVideoSrc] = useState('/home-hero.mp4');
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.loop = true;

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Autoplay can be blocked by browser policies; keep component stable.
      });
    }
  }, [heroVideoSrc]);
  
  const faqs = [
    {
      question: "How do I book my spot?",
      answer: "Booking is quick and fully online. Simply click Book Now, choose your preferred date, and receive instant confirmation by email."
    },
    {
      question: "How far in advance should I reserve?",
      answer: "We recommend booking at least one week ahead, as group sizes are small and dates often sell out."
    },
    {
      question: "When is the best time to take the tour?",
      answer: "At the beginning of your trip! Guests love receiving local restaurant tips and cultural insights for the rest of their stay."
    },
    {
      question: "What is the group size?",
      answer: "Tours are intimate by design — typically 8–10 guests, with a strict maximum of 12."
    },
    {
      question: "Do you offer private tours?",
      answer: (
        <>
          Yes. Private tours are available for couples, families, anniversaries, honeymoons, and corporate groups. Please{" "}
          <button 
            onClick={() => onNavigate(Page.CONTACT)} 
            className="text-terracotta font-semibold underline hover:text-olive transition-colors"
          >
            contact us
          </button>
          {" "}for arrangements.
        </>
      )
    },
    {
      question: "What languages are tours offered in?",
      answer: "Public tours are conducted in English. Private tours may be arranged in Portuguese, Spanish, or French."
    },
    {
      question: "What if the weather is bad?",
      answer: "Tours run rain or shine, with most tastings taking place indoors. In extreme conditions, we will reschedule or offer a full refund."
    },
    {
      question: "How much walking is involved?",
      answer: "A very easy stroll — about 1.5 km (1 mile) over 3 hours, mostly flat within the old town walls."
    },
    {
      question: "Is it enough food for a full meal?",
      answer: "Yes. Tastings are generous and equivalent to a full dinner or brunch."
    },
    {
      question: "Can you accommodate dietary restrictions?",
      answer: "We do our best to welcome everyone. Please inform us of allergies or dietary needs when booking."
    },
    {
      question: "Why Alentejo?",
      answer: "Alentejo is one of Portugal’s richest culinary regions, ranked among the best food regions in the world by TasteAtlas, known for its wines, cheeses, olive oils, and heritage recipes."
    }
  ];

  const visibleFAQs = showAllFAQs ? faqs : faqs.slice(0, 5);

  return (
    <>
      <SEO 
        title="Évora Food Tour | Walking Food & Wine Experience in Alentejo"
        description="Discover Évora through local food, wine, and heritage. Small-group walking tours with authentic tastings — ranked among the world’s best regions by TasteAtlas."
      />

      {/* Hero Section */}
      <div className="relative h-[95vh] w-full overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-olive/55 to-charcoal/40 z-10" />
        <video 
          ref={heroVideoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="metadata"
          onError={() => {
            if (heroVideoSrc !== 'https://cdn.coverr.co/videos/coverr-tourists-walking-around-the-city-9477/1080p.mp4') {
              setHeroVideoSrc('https://cdn.coverr.co/videos/coverr-tourists-walking-around-the-city-9477/1080p.mp4');
            }
          }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
             <source src={heroVideoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-olive/30 to-terracotta/70 z-10" />

        <div className="relative z-20 max-w-4xl px-6 text-white pt-20">
          <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-sm font-semibold tracking-wider mb-6 animate-fadeIn">
            Évora 2027 — European Capital of Culture
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
            Évora Walking Food & Wine Experiences
          </h1>
          <p className="text-xl md:text-2xl font-light italic mb-8 opacity-90">
            Évora’s first dedicated culinary walking tour
          </p>
          <p className="text-lg mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Discover Évora through its most traditional flavors, local stories, and family-run food spots.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button onClick={() => {
                const el = document.getElementById('tours-section');
                el?.scrollIntoView({behavior: 'smooth'});
            }}>View Our Tours</Button>
          </div>
        </div>
      </div>

      {/* Launch Banner */}
      <div className="bg-gradient-to-b from-terracotta/90 via-terracotta to-olive text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-serif text-3xl font-bold mb-3">Launch Offer (Founding Member Price)</h3>
            <p className="mb-6 opacity-90">Book now and enjoy our special launch pricing — the same full experience, for less.</p>
            <div className="inline-block bg-white/20 border-2 border-white/40 px-6 py-3 rounded-full font-bold text-lg backdrop-blur-sm">
                🍷 Evening Bites €59 (Reg €69) | ☕ Morning Bites €49 (Reg €59)
            </div>
            <p className="mt-4 text-sm opacity-75">⏳ Launch pricing ends March 31, 2026</p>
        </div>
      </div>

      {/* Main Content Split: Commitment + Blog Sidebar (Desktop) */}
      <div className="bg-cream border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-16 md:flex md:gap-12 lg:gap-16">
              
              {/* Left Column: Commitment */}
              <div className="md:w-3/4">
                  
                  {/* Commitment */}
                  <div className="text-center md:text-left mb-8 md:mb-0">
                      <SectionTitle subtitle="What sets Alentejo Bites apart">Our Commitment</SectionTitle>
                      <div className="grid md:grid-cols-3 gap-8">
                         <div className="group text-center md:text-left">
                             <div className="overflow-hidden rounded-xl shadow-md mb-4 h-40">
                                  <img 
                                     src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop" 
                                     alt="Local shop display" 
                                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                  />
                             </div>
                             <h3 className="font-serif text-lg font-bold text-olive mb-2">Local, Family-Run Stops</h3>
                             <p className="text-gray-600 text-xs leading-relaxed">
                                 We partner with small, independent businesses loved by locals. No chains, no staged tastings — just real Évora food culture.
                             </p>
                         </div>
                         <div className="group text-center md:text-left">
                             <div className="overflow-hidden rounded-xl shadow-md mb-4 h-40">
                                  <img 
                                     src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=600&h=400&fit=crop" 
                                     alt="Guide" 
                                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                  />
                             </div>
                             <h3 className="font-serif text-lg font-bold text-olive mb-2">Hosted by a Local Guide</h3>
                             <p className="text-gray-600 text-xs leading-relaxed">
                                 Your guide is an Évora resident who knows the city’s traditions, the owners behind each stop, and the stories that make Alentejo cuisine so special.
                             </p>
                         </div>
                         <div className="group text-center md:text-left">
                             <div className="overflow-hidden rounded-xl shadow-md mb-4 h-40">
                                  <img 
                                     src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop" 
                                     alt="Food" 
                                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                  />
                             </div>
                             <h3 className="font-serif text-lg font-bold text-olive mb-2">A Region Worth Discovering</h3>
                             <p className="text-gray-600 text-xs leading-relaxed">
                                 Alentejo is often considered Portugal’s best-kept culinary secret — recognized by TasteAtlas as one of the world’s top regions for food, authenticity, and tradition.
                             </p>
                         </div>
                      </div>
                  </div>
              </div>

              {/* Right Column: Blog Sidebar (Visible on Desktop) */}
              <div className="hidden md:block md:w-1/4">
                  <BlogSidebar 
                    className="sticky top-28" 
                    onBlogClick={onBlogClick}
                    onViewAllClick={() => onNavigate(Page.BLOG)}
                  />
              </div>
          </div>
      </div>

      {/* Tours Section */}
      <Section id="tours-section" className="bg-white">
        <SectionTitle subtitle="Slow travel through Alentejo's heritage">Our Culinary Experiences</SectionTitle>
        
        {/* Adjusted Grid: md:grid-cols-2 ensures side-by-side on tablet/desktop. max-w-5xl centers them tightly. */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TOURS.map((tour) => (
                <div key={tour.id} className="bg-cream rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col">
                    {/* Clickable Image Area */}
                    <div 
                        className="relative h-64 overflow-hidden shrink-0 cursor-pointer"
                        onClick={() => onNavigate(tour.page)}
                    >
                        {tour.badges && tour.badges.includes("Most Popular") && (
                            <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wide z-10 shadow-lg">
                                Most Popular
                            </div>
                        )}
                        <div className="absolute top-4 right-4 bg-terracotta text-white px-4 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                            Founding Price
                        </div>
                        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                        <div className="mb-4">
                            {/* Clickable Title with Classic Underline Hover (decoration-2) */}
                            <h3 
                                className="font-serif text-2xl text-olive mb-2 leading-tight cursor-pointer hover:underline decoration-terracotta decoration-2 underline-offset-4 transition-all"
                                onClick={() => onNavigate(tour.page)}
                            >
                                {tour.title}
                            </h3>
                            <p className="text-terracotta italic text-sm mb-4">{tour.tagline}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium bg-white inline-block px-3 py-1 rounded-md border border-gray-200">
                                <span>⏰ {tour.time}</span>
                                <span>•</span>
                                <span>{tour.duration}</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 border-2 border-gold/30 text-center mb-6">
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-3xl font-serif font-bold text-terracotta">€{tour.price}</span>
                                <span className="text-lg text-gray-400 line-through decoration-1">€{tour.regularPrice}</span>
                            </div>
                            <div className="text-olive text-xs font-semibold mt-1">✓ Free Cancellation up to 48h</div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6 text-sm flex-grow">
                            {tour.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-auto">
                            {/* CHANGE: Button now navigates to details page instead of calling onBook */}
                            <Button onClick={() => onNavigate(tour.page)} className="!px-2 text-center flex justify-center items-center">Book Now</Button>
                            {/* Details button navigates */}
                            <Button variant="outline" onClick={() => onNavigate(tour.page)} className="!px-2 text-center flex justify-center items-center">Full Details</Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </Section>

      {/* Trust Signals & Social Proof - Moved here */}
      <Section className="bg-cream border-t border-gray-100">
            {/* Trust Signals */}
            <div className="max-w-5xl mx-auto mb-16 border-b border-gold/20 pb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-terracotta shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex flex-col">
                            <span className="font-serif font-bold text-olive text-sm md:text-base">Free Cancellation</span>
                            <span className="text-xs text-gray-500 mt-0.5">Up to 48h before tour</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-terracotta shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div className="flex flex-col">
                            <span className="font-serif font-bold text-olive text-sm md:text-base">Secure Payment</span>
                            <span className="text-xs text-gray-500 mt-0.5">Stripe & Visa accepted</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-terracotta shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="flex flex-col">
                            <span className="font-serif font-bold text-olive text-sm md:text-base">Small Groups</span>
                            <span className="text-xs text-gray-500 mt-0.5">Intimate & Authentic</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-terracotta shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-3.138-3.138z" />
                        </svg>
                        <div className="flex flex-col">
                            <span className="font-serif font-bold text-olive text-sm md:text-base">Expert Locals</span>
                            <span className="text-xs text-gray-500 mt-0.5">Resident Guides</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted Platforms */}
            <div className="text-center max-w-4xl mx-auto">
                <h4 className="font-serif text-2xl text-gray-600 mb-8">Trusted by Travelers</h4>
                <div className="relative max-w-3xl mx-auto">
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-60">
                        {/* TripAdvisor */}
                        <div className="group cursor-pointer transition-all duration-300 grayscale hover:grayscale-0 hover:scale-105">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/02/TripAdvisor_Logo.svg" alt="TripAdvisor" className="h-10 w-auto"/>
                        </div>
                        {/* GetYourGuide */}
                        <div className="group cursor-pointer transition-all duration-300 grayscale hover:grayscale-0 hover:scale-105">
                        <img src="https://www.vhv.rs/dpng/d/611-6116095_getyourguide-logo-logo-get-your-guide-hd-png.png" alt="GetYourGuide" className="h-12 w-auto object-contain"/>
                        </div>
                        {/* Airbnb */}
                        <div className="group cursor-pointer transition-all duration-300 grayscale hover:grayscale-0 hover:scale-105">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" alt="Airbnb" className="h-9 w-auto"/>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="px-5 py-2 rounded-full border border-white/60 bg-charcoal/45 backdrop-blur-sm text-white text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">Under Implementation</span>
                    </div>
                </div>
            </div>
      </Section>
      
      {/* FAQ Section */}
      <Section className="bg-white">
        <SectionTitle subtitle="Everything you need to know">FAQ</SectionTitle>
        <div className="max-w-3xl mx-auto">
            {visibleFAQs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
            
            {/* Show More/Less Button */}
            <div className="text-center mt-8 pt-6 border-t border-gray-100">
                <button 
                    onClick={() => setShowAllFAQs(!showAllFAQs)}
                    className="group inline-flex items-center gap-2 text-terracotta hover:text-olive font-bold uppercase tracking-wider text-xs transition-colors py-2 px-4 rounded-full hover:bg-cream"
                >
                    <span>{showAllFAQs ? "Show Less" : "Load More Questions"}</span>
                    <span className={`transform transition-transform duration-300 ${showAllFAQs ? 'rotate-180' : ''}`}>
                         ▼
                    </span>
                </button>
            </div>
        </div>
      </Section>

      {/* Mobile Blog Section (Only visible on mobile, below trusted travelers) */}
      <div className="md:hidden px-4 py-12 bg-cream border-t border-gray-100">
           <BlogSidebar 
                onBlogClick={onBlogClick}
                onViewAllClick={() => onNavigate(Page.BLOG)}
           />
      </div>
      
      {/* Booking Promise Parallax */}
      <div className="relative py-32 text-center text-charcoal bg-fixed bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1590076215667-875d4e0ce5a0?w=1200&h=400&fit=crop")'}}>
        <div className="absolute inset-0 bg-cream/90"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 border-4 border-gold p-10 rounded-lg">
            <h3 className="font-serif text-4xl text-olive mb-6">Risk-Free Booking</h3>
            <p className="text-xl leading-relaxed mb-6">
                Reserve your spot today. Cancel up to 48 hours before the tour for a full refund — simple, flexible, and stress-free.
            </p>
            <Button onClick={() => {
                const el = document.getElementById('tours-section');
                el?.scrollIntoView({behavior: 'smooth'});
            }}>Book Now</Button>
        </div>
      </div>
    </>
  );
};