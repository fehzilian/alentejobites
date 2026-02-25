import React, { useState, useEffect } from 'react';
import { Page, Tour } from './types.ts';
import { TOURS } from './data.tsx';
import { Layout } from './components/Layout.tsx';
import { Home } from './pages/Home.tsx';
import { TourDetails } from './pages/TourDetails.tsx';
import { AboutPage, ContactPage, TextPage, TermsPage, CancellationPage, BlogPage } from './pages/InfoPages.tsx';
import { Modal, Button } from './components/UI.tsx';
import { SEO } from './components/SEO.tsx';
import { supabase } from './lib/supabase.ts';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Handle Booking: creates a pending reservation and redirects to Stripe checkout
  const handleBooking = async (tourId: string, date?: Date, time?: string, guests?: number) => {
    const tour = TOURS.find(t => t.id === tourId);
    if (tour) {
        if (!date || !time || !guests) {
          console.warn('Attempted to book without date selection.');
          return;
        }

        const dateStr = date.toISOString().split('T')[0];
        const rawStartTime = time.split(' - ')[0].trim();
        const timeStr = rawStartTime.replace(/[^a-zA-Z0-9]/g, '');
        const reservationRef = `${tourId}_${dateStr}_${timeStr}_${guests}_${Date.now()}`;

        // Create a pending reservation in Supabase so inventory is blocked immediately.
        // This should later be finalized by a Stripe webhook changing payment_status to "paid".
        try {
          await supabase.from('bookings').insert({
            date: dateStr,
            tour_id: tourId,
            guests,
            payment_status: 'pending',
            stripe_id: reservationRef,
          });
        } catch {
          // If the insert fails (missing env/db issue), we still let checkout continue.
        }

        const params = new URLSearchParams({
          ref: reservationRef,
          tour: tourId,
          date: dateStr,
          time,
          guests: String(guests),
        });

        const checkoutUrl = `${tour.checkoutUrl}${tour.checkoutUrl.includes('?') ? '&' : '?'}${params.toString()}`;
        window.open(checkoutUrl, '_blank');
    }
  };

  const handleNavigateToBooking = (tourId: string, tourPage: Page) => {
      setCurrentPage(tourPage);
      // Wait for page render then scroll
      setTimeout(() => {
          window.location.hash = '#book';
      }, 100);
      setActiveModal(null);
  };

  const handleBlogNavigation = (postId?: number) => {
      if (postId) setSelectedBlogPostId(postId);
      else setSelectedBlogPostId(null);
      setCurrentPage(Page.BLOG);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return (
            <Home 
                onNavigate={setCurrentPage} 
                onBook={(tourId) => {
                     const tour = TOURS.find(t => t.id === tourId);
                     if(tour) handleNavigateToBooking(tourId, tour.page);
                }} 
                onBlogClick={handleBlogNavigation} 
            />
        );
      case Page.EVENING_TOUR:
        return <TourDetails onNavigate={setCurrentPage} onBook={handleBooking} tourId="evening" />;
      case Page.BRUNCH_TOUR:
        return <TourDetails onNavigate={setCurrentPage} onBook={handleBooking} tourId="brunch" />;
      case Page.ABOUT:
        return <AboutPage onNavigate={setCurrentPage} onBlogClick={handleBlogNavigation} />;
      case Page.CONTACT:
        return <ContactPage />;
      case Page.BLOG:
        return <BlogPage onNavigate={setCurrentPage} initialPostId={selectedBlogPostId} />;
      case Page.TERMS: return <TermsPage />;
      case Page.CANCELLATION: return <CancellationPage />;
      case Page.COMPLAINTS: return <TextPage title="Complaints"><p>Redirecting to Complaints Book...</p></TextPage>;
      default: return <Home onNavigate={setCurrentPage} onBook={handleBooking} />;
    }
  };

  return (
    <Layout 
        activePage={currentPage} 
        onNavigate={setCurrentPage} 
        onBookClick={() => setActiveModal('booking_selection')}
    >
      {renderPage()}

      <Modal
        isOpen={activeModal === 'booking_selection'}
        onClose={() => setActiveModal(null)}
        title="Choose Your Experience"
      >
        <div className="grid md:grid-cols-2 gap-6">
            {TOURS.map(tour => (
                <div key={tour.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                    <div 
                        className="h-32 overflow-hidden relative cursor-pointer"
                        onClick={() => handleNavigateToBooking(tour.id, tour.page)}
                    >
                        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                         <div className="absolute top-2 right-2 bg-terracotta text-white text-xs font-bold px-2 py-1 rounded">€{tour.price}</div>
                    </div>
                    <div className="p-5 flex flex-col h-[calc(100%-8rem)]">
                        <h3 className="font-serif font-bold text-lg text-olive mb-1 cursor-pointer hover:underline decoration-terracotta underline-offset-4 transition-all" onClick={() => handleNavigateToBooking(tour.id, tour.page)}>{tour.title}</h3>
                        <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">{tour.time}</p>
                        <div className="mt-auto">
                            <Button fullWidth className="!py-2 !text-sm" onClick={() => handleNavigateToBooking(tour.id, tour.page)}>Check Availability</Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </Modal>
    </Layout>
  );
};

export default App;
