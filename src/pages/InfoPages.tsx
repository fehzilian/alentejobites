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
                            Hi, I’m Felippe. Alentejo Bites was born from a simple realization after years of working in tourism—studying in Évora and guiding tours in Lisbon: while the capital is beautiful, the most authentic food stories in Portugal are hidden here in the Alentejo.
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

        <Section className="bg-cream/50">
            <SectionTitle subtitle="What drives us">Our Philosophy</SectionTitle>
            <div className="max-w-7xl mx-auto rounded-3xl border border-olive/10 bg-white overflow-hidden shadow-xl">
                <div className="grid lg:grid-cols-5">
                    <div className="lg:col-span-2 bg-gradient-to-b from-olive to-charcoal p-8 md:p-10 text-white">
                        <p className="text-gold text-xs uppercase tracking-[0.3em] font-bold mb-4">Our Promise</p>
                        <h3 className="font-serif text-3xl leading-tight mb-5">Every stop should feel personal, local, and deeply Alentejano.</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                            We design each experience with the same care we use when hosting friends at home — a relaxed pace,
                            honest flavors, and stories that connect people to Évora beyond the postcard version.
                        </p>
                    </div>

                    <div className="lg:col-span-3 p-6 md:p-10 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        <article className="rounded-2xl border border-olive/10 bg-cream/40 p-5">
                            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-2xl mb-4 shadow-sm">🏘️</div>
                            <h4 className="font-serif text-lg text-olive mb-2">Independent & Local</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">No chains or tourist traps — just trusted family-run spots and real neighborhood flavors.</p>
                        </article>

                        <article className="rounded-2xl border border-olive/10 bg-cream/40 p-5">
                            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-2xl mb-4 shadow-sm">🍷</div>
                            <h4 className="font-serif text-lg text-olive mb-2">Small Group Energy</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">With groups capped at 12, the vibe stays warm, social, and easy to enjoy at every table.</p>
                        </article>

                        <article className="rounded-2xl border border-olive/10 bg-cream/40 p-5 sm:col-span-2 xl:col-span-1">
                            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-2xl mb-4 shadow-sm">🎓</div>
                            <h4 className="font-serif text-lg text-olive mb-2">Culture Through Food</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">Every bite comes with context — wines, recipes, and traditions that shaped Alentejo life.</p>
                        </article>
                    </div>
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

        const postHeroImage = post.image;

        const handleBackToJournal = () => {
            setViewingPostId(null);
            if (window.location.pathname !== '/blog') {
                window.history.pushState({}, '', '/blog');
            }
        };

        return (
            <div className="pt-24 bg-white min-h-screen">
                 <SEO 
                    title={`${post.title} | Alentejo Bites Blog`} 
                    description={post.excerpt} 
                />
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <button 
                        onClick={handleBackToJournal}
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

                    <div className={`w-full rounded-xl shadow-lg mb-12 ${post.id === 1 ? 'bg-cream border border-gold/20 p-8 md:p-10' : ''}`}>
                        <img
                            src={postHeroImage}
                            alt={post.id === 1 ? 'TasteAtlas logo' : post.title}
                            className={`w-full ${post.id === 1 ? 'h-20 md:h-24 object-contain' : 'h-[50vh] object-cover rounded-xl'}`}
                        />
                    </div>

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
                    onClick={() => {
                        setViewingPostId(featuredPost.id);
                        window.history.pushState({}, '', `/blog/${featuredPost.id}`);
                    }}
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
                        <a
                            key={post.id}
                            href={`/blog/${post.id}`}
                            className="flex flex-col group cursor-pointer"
                            onClick={(event) => {
                                if (
                                    event.button !== 0 ||
                                    event.metaKey ||
                                    event.ctrlKey ||
                                    event.shiftKey ||
                                    event.altKey
                                ) {
                                    return;
                                }
                                event.preventDefault();
                                setViewingPostId(post.id);
                                window.history.pushState({}, '', `/blog/${post.id}`);
                            }}
                        >
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
                        </a>
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
                 <form
                    className="space-y-4"
                    action="https://formsubmit.co/alentejobites@gmail.com"
                    method="POST"
                  >
                    <input type="hidden" name="_subject" value="New contact form message - Alentejo Bites" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <div className="grid md:grid-cols-2 gap-4">
                        <input name="name" type="text" placeholder="Name" required className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-olive" />
                        <input name="email" type="email" placeholder="Email" required className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-olive" />
                    </div>
                    <textarea name="message" rows={5} placeholder="Message" required className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-olive"></textarea>
                    <Button fullWidth type="submit">Send Message</Button>
                    <p className="text-xs text-gray-500 text-center">After clicking send, you'll see a confirmation page and we'll receive your email directly.</p>
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
        <p className="mb-4"><strong>Last updated: 19/02/2026</strong></p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">1. Company Details</h3>
        <p className="mb-4">1.1. The website www.alentejobites.com is a service provided by:</p>
        <p className="mb-4">Alentejo Bites<br/>Address: Travessa dos Mastros 19 2D, Lisboa 1200-265, Portugal<br/>Tax ID: 301201196<br/>Contact email: alentejobites@gmail.com</p>
        <p className="mb-4">Hereinafter referred to as Alentejo Bites.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">2. Purpose</h3>
        <p className="mb-4">2.1. These Terms of Service govern access to and use of this website and the services offered by Alentejo Bites.</p>
        <p className="mb-4">2.2. Accessing and using the website implies full and unconditional acceptance of these Terms.</p>
        <p className="mb-4">2.3. Alentejo Bites reserves the right to modify, update, or change these Terms at any time without prior notice. Continued use of the website constitutes acceptance of the updated Terms.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">3. Use of the Website</h3>
        <p className="mb-4">3.1. By using this website, the User declares having the legal capacity to accept these Terms.</p>
        <p className="mb-4">3.2. If the User registers or requests any service, they agree to provide truthful, accurate, complete, and lawful information.</p>
        <p className="mb-4">3.3. The User undertakes to use the website and its contents lawfully and agrees not to:</p>
        <p className="mb-4">a) Use the content for illegal, immoral, or public policy–violating purposes;<br/>b) Reproduce, copy, distribute, modify, or transform any content without the express written authorization of Alentejo Bites;<br/>c) Use the information obtained to send unsolicited advertising, spam, or any commercial communications;<br/>d) Introduce viruses, malware, or any harmful systems that could damage or disrupt the website or its services.</p>
        <p className="mb-4">3.4. Alentejo Bites shall not be held responsible for damages to the User’s equipment or systems resulting from accessing the website or from improper or negligent use.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">4. Intellectual Property</h3>
        <p className="mb-4">4.1. All content on this website, including but not limited to texts, images, logos, graphics, videos, software, source code, and design, is the exclusive property of Alentejo Bites or its licensors and is protected by intellectual and industrial property laws.</p>
        <p className="mb-4">4.2. Any reproduction, distribution, public communication, transformation, extraction, or reuse of the contents is strictly prohibited without prior written authorization from Alentejo Bites.</p>
        <p className="mb-4">4.3. Alentejo Bites reserves the right to take civil and/or criminal legal action against any person or entity that infringes its intellectual or industrial property rights.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">5. Responsibilities and Warranties</h3>
        <p className="mb-4">5.1. Alentejo Bites does not guarantee:</p>
        <p className="mb-4">a) The uninterrupted availability of the website;<br/>b) The absence of errors or defects in the content;<br/>c) That the website or its servers are free from viruses or harmful components;<br/>d) That the security measures implemented are completely invulnerable;<br/>e) The usefulness or suitability of the content for any specific purpose.</p>
        <p className="mb-4">5.2. Alentejo Bites states that it has adopted all reasonable technical measures, in accordance with the state of the art, to ensure the proper functioning of the website and reduce security risks.</p>
        <p className="mb-4">5.3. Alentejo Bites is not responsible for any damage caused by misuse of the website by Users or third parties.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">6. Data Protection</h3>
        <p className="mb-4">6.1. Alentejo Bites complies with all applicable data protection regulations, including the General Data Protection Regulation (GDPR) and Portuguese national legislation.</p>
        <p className="mb-4">6.2. Personal data provided by the User will be processed for the following purposes:</p>
        <p className="mb-4">a) Providing the requested services;<br/>b) Managing User requests and inquiries;<br/>c) Sending information related to Alentejo Bites’ activities, when authorized by the User.</p>
        <p className="mb-4">6.3. By providing personal data, the User expressly authorizes its processing for the purposes described above.</p>
        <p className="mb-4">6.4. The User guarantees that all data provided is true, accurate, complete, and up to date and shall be responsible for any damages arising from incorrect or false information.</p>
        <p className="mb-4">6.5. Alentejo Bites adopts appropriate technical and organizational measures to ensure the security, confidentiality, and integrity of personal data.</p>
        <p className="mb-4">6.6. The User may exercise their rights of access, rectification, erasure, restriction, portability, and objection by sending a request to:</p>
        <p className="mb-4">Email: alentejobites@gmail.com</p>
        <p className="mb-4">Address: Travessa dos Mastros 19 2D, Lisboa 1200-265, Portugal</p>
        <p className="mb-4">Proof of identity may be required.</p>
        <p className="mb-4">6.7. Alentejo Bites reserves the right to modify its data protection practices and will inform Users of any significant changes.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">7. Conduct in Events or On-Site Services (if applicable)</h3>
        <p className="mb-4">7.1. Users must not attend events or participate in activities if they are suffering from any contagious or infectious disease or are under self-quarantine.</p>
        <p className="mb-4">7.2. Users may only access areas and facilities authorized by Alentejo Bites or its representatives.</p>
        <p className="mb-4">7.3. Users must comply with all health, safety, and operational guidelines provided by Alentejo Bites.</p>
        <p className="mb-4">7.4. Users acknowledge that participation in certain activities involves inherent risks and agree that, except in cases of gross negligence or willful misconduct by Alentejo Bites, they waive any claims for damages arising from such risks.</p>
        <p className="mb-4">7.5. Users accept full responsibility for their own conduct.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">8. Applicable Law and Jurisdiction</h3>
        <p className="mb-4">8.1. These Terms of Service shall be governed by and construed in accordance with the laws of Portugal.</p>
        <p className="mb-4">8.2. Any disputes arising from these Terms or from the use of this website shall be submitted to the exclusive jurisdiction of the courts of Lisbon, Portugal, with express waiver of any other jurisdiction.</p>

        <p className="mb-4">Copyright © 2026 Alentejo Bites. All rights reserved.</p>
    </TextPage>
);

// --- Cancellation Page ---
export const CancellationPage: React.FC = () => (
    <TextPage title="Cancellation Policy">
        <SEO title="Cancellation Policy | Alentejo Bites" description="Cancellation and refund policy for Alentejo Bites." />

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">CANCELLATION &amp; BOOKING POLICY – ALENTEJO BITES</h3>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">SMALL GROUP TOURS</h3>
        <p className="mb-4">A small group tour can be cancelled with a full refund up to 48 hours before the tour departure time.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">PRIVATE TOURS</h3>
        <p className="mb-4">A private tour can be cancelled with a full refund up to 72 hours before the tour departure time.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">LATE ARRIVALS AND NO SHOWS</h3>
        <p className="mb-4">Due to extremely strict time slots for entry into attractions and for food preparation, we recommend that you arrive at the meeting point at least 5 minutes before the scheduled start time of the tour or experience.</p>
        <p className="mb-4">Our tours begin and depart precisely at the scheduled time. If you arrive late or fail to find the meeting point for any reason, refund requests will not be honored.</p>
        <p className="mb-4">If you experience difficulties arriving on time, please contact us as soon as possible so we can do our best to assist you. In some cases, if the tour has already started, we may be able to help you locate the guide and join the group during the itinerary, subject to feasibility and timing.</p>
        <p className="mb-4">Rescheduling to the next available tour may also be offered, depending on availability.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">CANCELLATION DUE TO FLIGHTS, TRAINS, VEHICLES OR ILLNESS</h3>
        <p className="mb-4">Within 24 hours of the tour start time, your place on the tour is reserved exclusively for you. As we are unable to refill your spot on short notice, we do not offer refunds for cancellations made within this period, including those caused by transportation issues or illness.</p>
        <p className="mb-4">We strongly recommend planning your schedule carefully to avoid missing your experience.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">WEATHER</h3>
        <p className="mb-4">Our tours run rain or shine. We do not offer refunds for cancellations made within 24 hours due to unfavorable weather conditions.</p>
        <p className="mb-4">In the rare event that weather conditions make it impossible or unsafe to operate the tour, Alentejo Bites will contact you to offer either a rescheduling or a full refund.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">DISCOUNT CODES</h3>
        <p className="mb-4">Discount codes are valid for new bookings only. They cannot be applied to existing reservations or used retroactively.</p>
        <p className="mb-4">Gift cards cannot be combined with discount or promotional codes.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">AMENDMENT POLICY</h3>
        <p className="mb-4">We are happy to help you reschedule your tour free of charge for any request made more than 24 hours before the tour start time, subject to availability.</p>
        <p className="mb-4">For rescheduling requests made within 24 hours of the tour start time, Alentejo Bites reserves the right to charge an amendment fee to cover any additional costs incurred (such as tickets or supplier fees). We do not profit from amendments and always aim to keep additional costs to a minimum.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">PROMOTIONAL CODES</h3>
        <p className="mb-4">Promotional or discount codes must be used at the time of purchase. They cannot be used retroactively and cannot be stacked, transferred, consolidated, or reused unless otherwise stated.</p>
        <p className="mb-4">All promotional codes have an expiration date. If none is specified, the default expiration is one year from the date of issue.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">TRAVEL INSURANCE</h3>
        <p className="mb-4">Alentejo Bites strongly recommends that guests purchase travel insurance to cover cancellations, delays, or unforeseen circumstances beyond anyone’s control.</p>
        <p className="mb-4">Guests agree that Alentejo Bites and any partner operators are not liable for such circumstances and hold both parties harmless. Any claims must be made directly with the insurance provider, not with Alentejo Bites.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">CHANGES TO THIS POLICY</h3>
        <p className="mb-4">Alentejo Bites reserves the right to update or modify this policy at any time at its sole discretion.</p>

        <h3 className="text-2xl text-olive mt-8 mb-4 font-serif">CONTACT US</h3>
        <p className="mb-4">If you have any questions regarding this policy, please contact us at:</p>
        <p className="mb-4">📧 alentejobites@gmail.com</p>
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
