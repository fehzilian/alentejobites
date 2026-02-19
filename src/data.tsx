import React from 'react';
import { Page, Tour, BlogPost } from './types.ts';

const eveningCheckoutUrl =
  (import.meta as any).env?.VITE_STRIPE_CHECKOUT_EVENING || 'https://example.com/checkout/evening';
const brunchCheckoutUrl =
  (import.meta as any).env?.VITE_STRIPE_CHECKOUT_BRUNCH || 'https://example.com/checkout/brunch';

// --- TOURS DATA ---
export const TOURS: Tour[] = [
  {
    id: 'evening',
    title: "The Évora Evening Bites",
    tagline: "“Discover Évora, one bite at a time”",
    description: "Explore Évora by night on a relaxed walking dinner tour, tasting local cheeses, cured hams, bifana, traditional Alentejo plates, and a sweet convent dessert — all paired with regional wines.",
    price: 59,
    regularPrice: 69,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    time: "5:00 PM - 8:00 PM", // Updated to full range
    duration: "3 Hours",
    page: Page.EVENING_TOUR,
    checkoutUrl: eveningCheckoutUrl,
    badges: ["Most Popular"],
    flexibleSchedule: true,
    maxCapacity: 12
  },
  {
    id: 'brunch',
    title: "The Morning Bites",
    tagline: "\"Morning traditions & market flavors\"",
    description: "Start your day in Évora with a guided food & wine brunch walk, tasting local pastries, bifana, regional cheeses, traditional Alentejo plates, and a dessert finale — all at a comfortable pace.",
    price: 49,
    regularPrice: 59,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    time: "10:00 AM - 1:00 PM", // Updated to full range
    duration: "3 Hours",
    page: Page.BRUNCH_TOUR,
    checkoutUrl: brunchCheckoutUrl,
    flexibleSchedule: true,
    maxCapacity: 10
  }
];

// --- BLOG POSTS DATA (Includes Guides now) ---
export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "5 Secret Wine Spots in Alentejo",
        excerpt: "Forget the big commercial wineries. Here’s where the locals go to drink talha wine straight from the clay pot.",
        content: (
            <>
                <p className="mb-4">Alentejo is famous for its vast vineyards, but the real magic happens in the small adegas.</p>
                <p className="mb-4">In this guide, we take you off the beaten path to discover <strong>Vinho de Talha</strong>, an ancient Roman tradition of making wine in large clay pots that has survived in Alentejo for over 2,000 years.</p>
                <h3 className="text-2xl font-serif text-olive my-6">1. Adega do Mestre</h3>
                <p className="mb-4">Located in a tiny village, this spot offers... (Full article content would go here).</p>
            </>
        ),
        author: "Felippe Santos",
        date: "Jan 12, 2026",
        category: "Wine & Drink",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop"
    },
    {
        id: 101, // Guide Profile Maria
        title: "Meet Maria: Born in the Vineyards",
        excerpt: "Our wine specialist Maria shares how growing up in Reguengos shaped her palate and why Talha wine is more than just a drink.",
        content: <p>Growing up, the harvest wasn't just work; it was a festival. I remember the smell of the crushed grapes...</p>,
        author: "Maria Costa",
        date: "Jan 10, 2026",
        category: "Team Stories",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop"
    },
    {
        id: 2,
        title: "Why Évora is the Capital of Culture 2027",
        excerpt: "The city is buzzing with preparation. From restored heritage sites to new art installations, see what's changing.",
        content: <p>Évora has always been a museum city, but 2027 marks a new era...</p>,
        author: "Maria Costa",
        date: "Jan 05, 2026",
        category: "Culture",
        image: "https://images.unsplash.com/photo-1590076215667-875d4e0ce5a0?w=800&h=600&fit=crop"
    },
    {
        id: 102, // Guide Profile João
        title: "Meet João: The History Geek",
        excerpt: "João can talk for hours about the Temple of Diana. Find out why he traded an academic career for the streets of Évora.",
        content: <p>History books are great, but the stones of Évora speak louder. I wanted to tell the stories that aren't written down...</p>,
        author: "João Silva",
        date: "Jan 02, 2026",
        category: "Team Stories",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
    },
    {
        id: 3,
        title: "Bifana: The Story Behind the Sandwich",
        excerpt: "It looks simple, but the bifana is a religion in Portugal. We trace the history of the country's favorite pork sandwich.",
        content: <p>Garlic, wine, paprika, and pork. The four pillars of happiness...</p>,
        author: "Felippe Santos",
        date: "Dec 28, 2025",
        category: "Food History",
        image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&h=600&fit=crop"
    },
    {
        id: 103, // Guide Profile Ana
        title: "Meet Ana: From Chef to Guide",
        excerpt: "Why Ana left a professional kitchen to walk the markets of Évora with our guests.",
        content: <p>In a restaurant, I was hidden away. I missed the look on people's faces when they taste something new...</p>,
        author: "Ana Ferreira",
        date: "Dec 20, 2025",
        category: "Team Stories",
        image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=800&h=600&fit=crop"
    },
    {
        id: 4,
        title: "A Guide to Portuguese Cheese",
        excerpt: "Queijo de Ovelha, Nisa, Serpa. Confused by the cheese counter? Here is your cheat sheet to Alentejo cheese.",
        content: <p>Cheese in Alentejo is intense, salty, and often runny...</p>,
        author: "Maria Costa",
        date: "Nov 30, 2025",
        category: "Food History",
        image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=600&fit=crop"
    },
     {
        id: 5,
        title: "Sweet Truths: Conventual Desserts",
        excerpt: "Why do all Portuguese desserts use egg yolks? The answer lies in the convents and monasteries of the 15th century.",
        content: <p>It started with egg whites being used to starch nun's habits...</p>,
        author: "Felippe Santos",
        date: "Dec 15, 2025",
        category: "Food History",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop"
    }
];
