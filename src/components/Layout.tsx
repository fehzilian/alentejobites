import React, { useState, useEffect } from 'react';
import { Page } from '../types.ts';
import { TOURS } from '../data.tsx';
import { Button } from './UI.tsx';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
  onBookClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate, onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/logo.png');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = '/logo.png';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      const threshold = 245;
      const featherStart = 225;

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];
        const minChannel = Math.min(r, g, b);

        if (minChannel >= threshold) {
          pixels[i + 3] = 0;
        } else if (minChannel >= featherStart) {
          const t = (threshold - minChannel) / (threshold - featherStart);
          pixels[i + 3] = Math.round(a * Math.max(0, Math.min(1, t)));
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setLogoSrc(canvas.toDataURL('image/png'));
    };

    image.onerror = () => {
      setImgError(true);
    };
  }, []);

  const handleNavClick = (item: { label: string, page: Page }) => {
    setIsMobileMenuOpen(false);
    
    if (item.label === 'Tours') {
        onNavigate(Page.HOME);
        // Small timeout to ensure page transition happens before scroll
        setTimeout(() => {
            const toursSection = document.getElementById('tours-section');
            if (toursSection) {
                toursSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        onNavigate(item.page);
    }
  };

  const handleLogoClick = () => {
      onNavigate(Page.HOME);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Tours', page: Page.HOME }, // Changed from Home to Tours
    { label: 'About Us', page: Page.ABOUT },
    { label: 'Blog', page: Page.BLOG },
    { label: 'Contact', page: Page.CONTACT },
  ];

  // Size classes for the logo container
  const logoSize = isScrolled ? 'h-14 w-14' : 'h-20 w-20';

  return (
    <div className="min-h-screen flex flex-col font-sans text-charcoal">
      {/* Navigation */}
      <header 
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-cream/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={handleLogoClick}
          >
            <div className="flex items-center">
                {/* Logo Image - Requires logo.png in the same folder */}
                {imgError ? (
                    <div className={`${logoSize} rounded-full bg-gradient-to-br from-gold to-terracotta flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                        AB
                    </div>
                ) : (
                    <div className={`${logoSize} rounded-full overflow-hidden transition-all duration-300 drop-shadow-md`}>
                      <img 
                          src={logoSrc} 
                          alt="Alentejo Bites" 
                          className="h-full w-full object-cover"
                          onError={() => setImgError(true)}
                      />
                    </div>
                )}
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium tracking-wide hover:text-terracotta transition-colors ${
                  !isScrolled && activePage === Page.HOME ? 'text-white drop-shadow-sm' : 'text-charcoal'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={onBookClick}
              className="!py-2 !px-6 text-sm"
              variant="primary"
            >
              Book Now
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden text-2xl ${
              !isScrolled && activePage === Page.HOME ? 'text-white' : 'text-olive'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-cream shadow-xl border-t border-gold/20 flex flex-col p-6 md:hidden gap-4 animate-slideDown">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-left text-lg py-2 border-b border-gray-100 text-olive"
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => { onBookClick(); setIsMobileMenuOpen(false); }} fullWidth>
              Book Now
            </Button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-white pt-16 pb-8 px-6 md:pb-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
                {/* Footer Logo */}
                <div className="flex items-center mb-4">
                    {imgError ? (
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold to-terracotta flex items-center justify-center text-white font-bold text-[10px]">AB</div>
                    ) : (
                        <div className="h-14 w-14 rounded-full overflow-hidden">
                          <img src={logoSrc} alt="Logo" className="h-full w-full object-cover" />
                        </div>
                    )}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Évora's first and only dedicated walking food tour. Small groups, expert guides, authentic experiences.
                </p>
                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 mt-6">
                    <div className="bg-white/10 p-2 rounded text-center w-20">
                        <div className="text-[10px] text-gold uppercase font-bold leading-tight">Turismo de Portugal</div>
                        <div className="text-[8px] text-gray-400">RNAAT 123/2026</div>
                    </div>
                     <div className="bg-white/10 p-2 rounded text-center w-20">
                        <div className="text-[10px] text-green-400 uppercase font-bold leading-tight">Clean & Safe</div>
                        <div className="text-[8px] text-gray-400">Certified</div>
                    </div>
                </div>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-white">Quick Links</h4>
                <div className="flex flex-col gap-2 text-gray-400 text-sm">
                    <button onClick={() => { onNavigate(Page.HOME); setTimeout(() => document.getElementById('tours-section')?.scrollIntoView({behavior:'smooth'}), 100); }} className="text-left hover:text-gold">Tours</button>
                    <button onClick={() => onNavigate(Page.ABOUT)} className="text-left hover:text-gold">About Us</button>
                    <button onClick={() => onNavigate(Page.EVENING_TOUR)} className="text-left hover:text-gold">Evening Tour</button>
                    <button onClick={() => onNavigate(Page.BRUNCH_TOUR)} className="text-left hover:text-gold">Brunch Tour</button>
                    <button onClick={() => onNavigate(Page.CONTACT)} className="text-left hover:text-gold">Contact</button>
                </div>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-white">Contact</h4>
                <div className="flex flex-col gap-2 text-gray-400 text-sm">
                    <p>📧 alentejobites@gmail.com</p>
                    <p>📱 +351 925 464 464</p>
                    <p>📍 Évora, Portugal</p>
                </div>
            </div>
            <div>
                 <h4 className="font-bold mb-4 text-white">Legal</h4>
                 <div className="flex flex-col gap-2 text-gray-400 text-sm">
                    <button onClick={() => onNavigate(Page.TERMS)} className="text-left hover:text-gold">Terms of Service</button>
                    <button onClick={() => onNavigate(Page.CANCELLATION)} className="text-left hover:text-gold">Cancellation Policy</button>
                    <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer" className="text-left hover:text-gold flex items-center gap-2">
                        <span>Complaints Book</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                 </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-700 pt-8 text-center text-gray-500 text-xs">
            <p>© 2026 Alentejo Bites. All rights reserved.</p>
            <p>Registered Tourism Company in Portugal | RNAAT No 1234/2026</p>
        </div>
      </footer>
    </div>
  );
};
