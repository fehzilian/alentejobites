import React, { useState, useEffect } from 'react';
import { Page } from '../types.ts';
import { BLOG_POSTS } from '../data.tsx';
import { Button, Section, SectionTitle } from '../components/UI.tsx';
import { SEO } from '../components/SEO.tsx';

interface AboutPageProps {
    onNavigate?: (p: Page) => void;
    onBlogClick?: (id: number) => void;
}

// --- About Page ---
export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onBlogClick }) => (
    <div className="pt-24">
        <SEO 
            title="About Alentejo Bites | Local Food Tours in Évora" 
            description="Meet the local team behind Évora’s first dedicated walking food tour. Discover Alentejo’s heritage cuisine, family-run stops, and TasteAtlas-ranked flavors." 
        />
        
        {/* Founder Bio Section - Redesigned to be less prominent */}
        <Section className="bg-white border-b border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                 <div className="md:w-1/3 order-1 md:order-2">
                     <div className="relative">
                        <div className="absolute inset-0 bg-gold/10 rounded-xl transform translate-x-3 translate-y-3"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop" 
                            alt="Felippe Santos" 
                            className="w-full h-auto rounded-xl shadow-lg relative z-10 grayscale hover:grayscale-0 transition-all duration-700" 
                        />
                     </div>
                 </div>
                 <div className="md:w-2/3 order-2 md:order-1">
                     <h2 className="font-serif text-3xl text-olive mb-6">A Note from the Founder</h2>
                     <div className="prose prose-md text-gray-600 leading-relaxed">
                        <p className="mb-4">
                            Hi, I’m Felippe. Alentejo Bites was born from a simple realization after years of guiding in Lisbon: while the capital is beautiful, the most authentic food stories in Portugal are hidden here in the Alentejo.
                        </p>
                        <p className="mb-4">
                            This region is often considered Portugal's best-kept culinary secret. Recently recognized by <strong>TasteAtlas</strong> as one of the world's top food regions, Évora offers flavors you simply can't find anywhere else—from ancient wine traditions to recipes passed down through generations.
                        </p>
                        <p className="mb-4">
                            We aren't a big tour corporation. We are a small team of locals who believe that to understand Alentejo, you have to taste it. We’ve built relationships with the families who run these tascas, bakeries, and adegas so we can share the real, unfiltered Évora with you.
                        </p>
                        <p className="font-serif text-terracotta italic text-lg mt-6">
                            "More than a tour, it’s an invitation to our table."
                        </p>
                     </div>
                 </div>
            </div>
        </Section>

        {/* Meet Our Guides Section */}
        <Section className="bg-cream">
            <SectionTitle subtitle="The locals who make it happen">Get to Know the Guides</SectionTitle>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Guide 1 - Maria */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                    <div className="h-64 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop" alt="Maria Guide" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-charcoal/80 to-transparent p-4">
                            <h3 className="text-white font-serif text-xl">Maria Costa</h3>
                            <span className="text-gold text-xs uppercase font-bold tracking-widest">Wine Specialist</span>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                            Maria grew up in a vineyard family near Reguengos. She knows every grape variety in Alentejo and can tell you exactly why talha wine tastes the way it does.
                        </p>
                        <button 
                            onClick={() => { if(onNavigate && onBlogClick) { onBlogClick(101); onNavigate(Page.BLOG); } }}
                            className="text-terracotta font-bold text-sm uppercase hover:text-olive transition-colors flex items-center gap-2"
                        >
                            Read My Story <span>→</span>
                        </button>
                    </div>
                </div>

                {/* Guide 2 - João */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                    <div className="h-64 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" alt="João Guide" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                         <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-charcoal/80 to-transparent p-4">
                            <h3 className="text-white font-serif text-xl">João Silva</h3>
                            <span className="text-gold text-xs uppercase font-bold tracking-widest">History Geek</span>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                            João is obsessed with Roman history and conventual sweets. Ask him about the Temple of Diana, but be prepared for a 20-minute passionate explanation.
                        </p>
                        <button 
                             onClick={() => { if(onNavigate && onBlogClick) { onBlogClick(102); onNavigate(Page.BLOG); } }}
                            className="text-terracotta font-bold text-sm uppercase hover:text-olive transition-colors flex items-center gap-2"
                        >
                            Read My Story <span>→</span>
                        </button>
                    </div>
                </div>

                {/* Guide 3 - Ana */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                    <div className="h-64 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400&h=400&fit=crop" alt="Ana Guide" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                         <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-charcoal/80 to-transparent p-4">
                            <h3 className="text-white font-serif text-xl">Ana Ferreira</h3>
                            <span className="text-gold text-xs uppercase font-bold tracking-widest">Chef & Foodie</span>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                            A former chef who decided the kitchen was too small. Ana loves taking guests to the municipal market to touch, smell, and taste the raw ingredients.
                        </p>
                        <button 
                             onClick={() => { if(onNavigate && onBlogClick) { onBlogClick(103); onNavigate(Page.BLOG); } }}
                            className="text-terracotta font-bold text-sm uppercase hover:text-olive transition-colors flex items-center gap-2"
                        >
                            Read My Story <span>→</span>
                        </button>
                    </div>
                </div>
            </div>
        </Section>

        {/* Commitment Section (Kept as is, but slightly simplified if needed) */}
        <Section className="bg-white">
            <SectionTitle subtitle="What drives us">Our Philosophy</SectionTitle>
            <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {/* 1. Independent & Local First */}
                <div className="text-center group">
                    <div className="w-16 h-16 mx-auto bg-cream rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl">🏘️</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-olive mb-3">Independent & Local</h3>
                    <p className="text-gray-600 text-sm leading-relaxed px-2">
                        We support small businesses. No chains, no commissions, just good food.
                    </p>
                </div>

                {/* 2. Personal Connections */}
                <div className="text-center group">
                     <div className="w-16 h-16 mx-auto bg-cream rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl">🍷</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-olive mb-3">Small Groups</h3>
                    <p className="text-gray-600 text-sm leading-relaxed px-2">
                        Max 12 people. We want you to make friends, not just follow a flag.
                    </p>
                </div>

                {/* 3. Experts in Local Food */}
                <div className="text-center group">
                     <div className="w-16 h-16 mx-auto bg-cream rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl">🎓</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-olive mb-3">Regional Experts</h3>
                    <p className="text-gray-600 text-sm leading-relaxed px-2">
                        We don't just eat; we teach you about the history and culture of Alentejo.
                    </p>
                </div>
            </div>
        </Section>
    </div>
);

// --- Blog Page ---
export const BlogPage: React.FC<{onNavigate: (p: Page) => void, initialPostId?: number | null}> = ({ onNavigate, initialPostId }) => {
    const [viewingPostId, setViewingPostId] = useState<number | null>(null);

    // Effect to handle navigation from external links (Home sidebar)
    useEffect(() => {
        if (initialPostId) {
            setViewingPostId(initialPostId);
        }
    }, [initialPostId]);

    // Use all posts without filtering
    const posts = BLOG_POSTS;
    const featuredPost = BLOG_POSTS[0];

    // --- Single Post View ---
    if (viewingPostId) {
        const post = BLOG_POSTS.find(p => p.id === viewingPostId);
        if (!post) return null;

        return (
            <div className="pt-24 bg-white min-h-screen">
                 <SEO 
                    title={`${post.title} | Alentejo Bites Blog`} 
                    description={post.excerpt} 
                />
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <button 
                        onClick={() => setViewingPostId(null)}
                        className="mb-8 flex items-center gap-2 text-terracotta hover:underline font-medium text-sm"
                    >
                        ← Back to Journal
                    </button>

                    <div className="text-center mb-10">
                         <span className="text-gold uppercase tracking-widest text-xs font-bold">{post.category}</span>
                         <h1 className="font-serif text-4xl md:text-5xl text-charcoal mt-4 mb-6 leading-tight">{post.title}</h1>
                         <div className="flex justify-center items-center gap-4 text-gray-500 text-sm">
                             <span>By {post.author}</span>
                             <span>•</span>
                             <span>{post.date}</span>
                         </div>
                    </div>

                    <img src={post.image} alt={post.title} className="w-full h-[50vh] object-cover rounded-xl shadow-lg mb-12" />

                    <div className="prose prose-lg prose-olive mx-auto leading-loose text-gray-600">
                        <p className="text-xl font-serif text-charcoal leading-relaxed mb-8 border-l-4 border-gold pl-6 italic">
                            {post.excerpt}
                        </p>
                        {post.content}
                        <p>
                            (This is a placeholder for the full article content. In a real application, the full text would come from a CMS.)
                        </p>
                    </div>

                    {/* Author/CTA Box */}
                    <div className="mt-16 bg-cream p-8 rounded-xl border border-gold/30 flex flex-col md:flex-row items-center gap-8">
                        <div className="shrink-0">
                            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&h=200&fit=crop" alt="Author" className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md" />
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="font-serif text-xl text-olive mb-2">Taste Évora with Us</h4>
                            <p className="text-sm text-gray-600 mb-4">Did this story make you hungry? Join one of our small-group walking food tours and experience these flavors in person.</p>
                            <Button onClick={() => onNavigate(Page.HOME)}>View Tours</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Main Blog List View ---
    return (
        <div className="pt-24 bg-white min-h-screen">
            <SEO 
                title="Alentejo Bites Journal | Food & Travel Stories" 
                description="Explore our journal for insider tips on Alentejo wine, Portuguese food history, and travel guides to Évora. Written by locals." 
            />
            
            {/* Header - Editorial Style (High-end Magazine Look) */}
            <div className="bg-white pb-16 pt-12 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold mb-4 block">The Alentejo Bites</span>
                    <h1 className="font-serif text-6xl md:text-7xl text-charcoal mb-6 tracking-tight leading-none">Journal</h1>
                    <div className="w-16 h-0.5 bg-charcoal mx-auto mb-6"></div>
                    <p className="text-xl text-gray-500 font-serif italic max-w-2xl mx-auto leading-relaxed">
                        Curated stories about heritage ingredients, wine culture, and the people who make Évora taste like home.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                
                {/* Featured Post */}
                <div 
                    className="group relative h-[600px] rounded-sm overflow-hidden mb-20 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                    onClick={() => setViewingPostId(featuredPost.id)}
                >
                    <div className="absolute inset-0">
                        <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white w-full md:w-2/3">
                        <span className="border border-white/40 px-3 py-1 text-xs font-bold tracking-widest uppercase mb-6 inline-block hover:bg-white hover:text-charcoal transition-colors">Latest Issue</span>
                        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight group-hover:underline decoration-white underline-offset-8">
                            {featuredPost.title}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-200 line-clamp-2 mb-8 font-light">
                            {featuredPost.excerpt}
                        </p>
                        <span className="text-sm font-bold border-b border-white pb-1 uppercase tracking-wide group-hover:text-gold group-hover:border-gold transition-colors">Read Full Story</span>
                    </div>
                </div>

                {/* Post Grid - 3 Columns for editorial look */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {posts.filter(p => p.id !== featuredPost.id).map(post => (
                        <div key={post.id} className="flex flex-col group cursor-pointer" onClick={() => setViewingPostId(post.id)}>
                            <div className="h-64 overflow-hidden mb-6 rounded-sm relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-charcoal text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                                    {post.category}
                                </div>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-3 text-xs text-gray-400 font-medium uppercase tracking-wider">
                                    <span>{post.date}</span>
                                    <span>—</span>
                                    <span>By {post.author}</span>
                                </div>
                                <h3 className="font-serif text-2xl text-charcoal mb-4 leading-tight group-hover:text-terracotta transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed font-light">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto">
                                    <span className="text-xs font-bold text-olive uppercase tracking-widest border-b border-transparent group-hover:border-olive transition-all">Read Story</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter Section - Moved here specifically for the blog context */}
            <div className="bg-terracotta text-white py-20 px-6 mt-12">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-gold text-sm font-bold uppercase tracking-[0.2em] mb-4 block">The Inner Circle</span>
                    <h3 className="font-serif text-4xl md:text-5xl font-bold mb-6">Join the Alentejo Bites Table</h3>
                    <p className="mb-10 opacity-90 text-lg md:text-xl font-light max-w-2xl mx-auto">
                        Stories, recipes, and exclusive invites. Subscribe to our newsletter and get a <strong>5% discount code</strong> instantly sent to your email.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="p-4 rounded-none text-charcoal focus:outline-none w-full placeholder-gray-400 font-serif" 
                        />
                        <button className="bg-charcoal text-white py-4 px-8 font-bold hover:bg-olive transition-colors whitespace-nowrap tracking-wide uppercase text-sm">
                            Get My 5% Off
                        </button>
                    </div>
                    <p className="text-xs mt-6 opacity-60">We respect your privacy. Unsubscribe at any time.</p>
                </div>
            </div>
        </div>
    );
};

// --- Contact Page ---
export const ContactPage: React.FC = () => (
    <div className="pt-24 bg-cream min-h-screen">
        <SEO title="Contact Us | Alentejo Bites" description="Get in touch with Alentejo Bites for bookings, private tours, or press inquiries." />
        <Section>
            <SectionTitle subtitle="Get in touch">Contact Us</SectionTitle>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gold/20">
                <p className="text-center text-gray-600 mb-8">
                    Have a question about our tours? Want to book a private experience? 
                    We'd love to hear from you.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="text-center">
                        <h3 className="font-serif text-xl text-olive mb-2">Email</h3>
                        <p className="text-terracotta font-medium">alentejobites@gmail.com</p>
                    </div>
                    <div className="text-center">
                         <h3 className="font-serif text-xl text-olive mb-2">Phone / WhatsApp</h3>
                         <p className="text-terracotta font-medium">+351 925 464 464</p>
                    </div>
                </div>
                 <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Name" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-olive" />
                        <input type="email" placeholder="Email" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-olive" />
                    </div>
                    <textarea rows={5} placeholder="Message" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-olive"></textarea>
                    <Button fullWidth>Send Message</Button>
                </form>
            </div>
        </Section>
    </div>
);

// --- Text Page Wrapper ---
export const TextPage: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="pt-24 bg-white min-h-screen">
        <Section>
            <h1 className="font-serif text-4xl text-olive mb-8 border-b border-gold/20 pb-4">{title}</h1>
            <div className="prose prose-lg text-gray-600 max-w-none">
                {children}
            </div>
        </Section>
    </div>
);

// --- Terms Page ---
export const TermsPage: React.FC = () => (
    <TextPage title="Terms of Service">
        <SEO title="Terms of Service | Alentejo Bites" description="Terms and conditions for Alentejo Bites tours." />
        <p className="mb-4"><strong>Last updated: January 2026</strong></p>
        
        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">1. Booking & Payments</h3>
        <p className="mb-4">All bookings must be made online via our secure checkout or through our approved partners. Full payment is required to confirm your reservation. Prices are in Euro (€) and include all applicable taxes.</p>
        
        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">2. Health & Safety</h3>
        <p className="mb-4">Guests are responsible for informing us of any dietary restrictions or allergies at the time of booking. While we try to accommodate all requests, we cannot guarantee that food is free from allergens as we visit third-party establishments.</p>
        
        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">3. Liability</h3>
        <p className="mb-4">Alentejo Bites is not liable for any personal injury, loss of property, or damage occurred during the tour. Guests are advised to have their own travel insurance.</p>
        
        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">4. Media & Photography</h3>
        <p className="mb-4">We may take photos or videos during the tour for marketing purposes. If you prefer not to be photographed, please inform your guide at the start of the tour.</p>
    </TextPage>
);

// --- Cancellation Page ---
export const CancellationPage: React.FC = () => (
    <TextPage title="Cancellation Policy">
        <SEO title="Cancellation Policy | Alentejo Bites" description="Cancellation and refund policy for Alentejo Bites." />
        
        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">Flexible Cancellation</h3>
        <p className="mb-4">We understand travel plans change. That's why we offer free cancellation up to 48 hours before your scheduled tour time.</p>
        
        <ul className="list-disc pl-5 space-y-2 mt-4 mb-8">
            <li><strong>More than 48 hours notice:</strong> 100% Refund of the ticket price.</li>
            <li><strong>Less than 48 hours notice:</strong> No Refund, but we may offer rescheduling subject to availability.</li>
            <li><strong>No-shows:</strong> No Refund. Late arrivals of more than 15 minutes may be considered no-shows to respect the schedule of other guests.</li>
        </ul>
        
        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">Weather Policy</h3>
        <p className="mb-4">Our tours run rain or shine. In the event of extreme weather warnings (Red Alert) issued by civil protection, we will cancel the tour and offer a full refund or rescheduling.</p>
    </TextPage>
);

// --- Private Tours Page ---
export const PrivateToursPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
     <div className="pt-24 bg-cream min-h-screen">
        <SEO title="Private Food Tours in Évora | Alentejo Bites" description="Exclusive private food and wine tours in Évora for couples, families, and corporate groups." />
        <Section>
            <SectionTitle subtitle="Exclusive Experiences">Private & Corporate Tours</SectionTitle>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                 <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop" alt="Private Group" className="rounded-xl shadow-lg w-full h-auto" />
                 <div>
                     <h3 className="font-serif text-3xl text-olive mb-4">Tailored to You</h3>
                     <p className="text-gray-600 leading-relaxed mb-6">
                         Looking for a more intimate experience? Whether it's a romantic evening, a family gathering, or a corporate team-building event, we can customize our food tours to suit your needs.
                     </p>
                     <ul className="space-y-3 text-gray-600 mb-8">
                         <li className="flex items-center gap-2"><span className="text-terracotta">✓</span> Flexible start times</li>
                         <li className="flex items-center gap-2"><span className="text-terracotta">✓</span> Custom dietary menus</li>
                         <li className="flex items-center gap-2"><span className="text-terracotta">✓</span> Pick-up from your hotel (within Évora)</li>
                         <li className="flex items-center gap-2"><span className="text-terracotta">✓</span> Available in English, Portuguese, Spanish, or French</li>
                     </ul>
                     <Button onClick={() => onNavigate(Page.CONTACT)}>Inquire Now</Button>
                 </div>
            </div>
        </Section>
    </div>
);