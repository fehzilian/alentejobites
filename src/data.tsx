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
        title: "Discover the Dishes of Évora That Helped Alentejo Rank 9th in the World",
        excerpt: "When TasteAtlas ranked Alentejo as the 9th best food region in the world, it recognized centuries of resilience, tradition, and extraordinary flavors rooted in Évora.",
        content: (
            <>
                <p className="mb-4">When TasteAtlas ranked Alentejo as the 9th best food region in the world, it wasn’t by accident. The region’s cuisine is deeply rooted in history, shaped by resilience, and built on simple ingredients transformed into extraordinary flavors.</p>
                <p className="mb-4">Évora, the heart of Alentejo, holds some of the most iconic dishes that helped define this global recognition. These recipes were not born in luxury kitchens — they were created by farmers, shepherds, and working families who turned scarcity into tradition.</p>
                <p className="mb-6">Let’s explore the dishes that tell the real story of Alentejo.</p>

                <h3 className="text-2xl font-serif text-olive my-6">1. Sopa Alentejana – From Poverty to Culinary Pride</h3>
                <p className="mb-4">Few dishes represent Alentejo better than Sopa Alentejana.</p>
                <p className="mb-4">This humble soup was born from necessity. In a region historically marked by agricultural labor and economic hardship, rural families had to stretch ingredients as far as possible. Bread — especially the dense, rustic Alentejo bread — became the foundation of many meals.</p>
                <p className="mb-4">Instead of wasting stale bread, people transformed it into sustenance.</p>
                <figure className="my-6">
                    <img
                        src="https://lh3.googleusercontent.com/gps-cs-s/AHVAwer2gV8iABU_FkllwuhBgcuREy5bDrVXSBwFZmmaEAozFjQ3kk2bVXFcucGMnEfngpl-Irm2EP4am9Av8KoTCCBwnvY7zFQYLRcdbKO3Ik5KFKrPipaEs2q-UQFqwJU9vzBUGq5UznvyJHPh=s1360-w1360-h1020-rw"
                        alt="Traditional Sopa Alentejana served in Évora"
                        className="w-full rounded-xl object-cover shadow-md"
                    />
                    <figcaption className="mt-2 text-sm text-gray-500">
                        📸 Traditional Sopa Alentejana served in Évora. Photo courtesy of Restaurante Fialho Évora.
                    </figcaption>
                </figure>
                <h4 className="text-xl font-serif text-charcoal mt-6 mb-3">A Dish of the Working Class</h4>
                <p className="mb-4">The origins of Sopa Alentejana are deeply tied to the lives of rural workers. Field laborers needed something nourishing yet simple. With access to olive oil, garlic, coriander, eggs, and water, they created a dish that was both filling and comforting.</p>
                <p className="mb-4">It was a poor man’s meal — but rich in flavor.</p>
                <h4 className="text-xl font-serif text-charcoal mt-6 mb-3">Key Ingredients</h4>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li>Day-old Alentejo bread</li>
                    <li>Garlic</li>
                    <li>Fresh coriander</li>
                    <li>Olive oil</li>
                    <li>Poached egg</li>
                    <li>Water and salt</li>
                </ul>
                <p className="mb-6">Today, what was once survival food is served in traditional restaurants and fine dining spaces alike. It embodies the essence of Alentejo: simplicity elevated to excellence.</p>

                <h3 className="text-2xl font-serif text-olive my-6">2. Carne de Porco à Alentejana – A Fusion of Land and Sea</h3>
                <p className="mb-4">One of Portugal’s most famous dishes, Carne de Porco à Alentejana, is surprisingly not coastal — yet it includes clams.</p>
                <p className="mb-4">The pork is marinated for hours in white wine, garlic, paprika, bay leaf, olive oil, salt, and pepper before being cooked and paired with fresh clams.</p>
                <figure className="my-6">
                    <img
                        src="https://lh3.googleusercontent.com/gps-cs-s/AHVAwerUUjM5NfKXGNe1enh-vgpwFHS9teHoiZ5R8s8PGA2wnwd5BVQvF-L4hI7zA09xf9hPQhOWiDVjTFXUokfOqbqebbI2mONdsih58A6FUkqXguIEfI6GuIYyiLejDmJLxqV1Vdg3=s1360-w1360-h1020-rw"
                        alt="Traditional Carne de porco Alentejana served in Évora"
                        className="w-full rounded-xl object-cover shadow-md"
                    />
                    <figcaption className="mt-2 text-sm text-gray-500">
                        📸 Traditional Carne de porco Alentejana served in Évora. Photo courtesy of Restaurante Adega da Talha Velha.
                    </figcaption>
                </figure>
                <p className="mb-6">Served with fried potatoes and fresh coriander, it became one of the most emblematic dishes of Alentejo cuisine.</p>

                <h3 className="text-2xl font-serif text-olive my-6">3. Vendas Novas and the Birth of the Bifana</h3>
                <p className="mb-4">Just outside Évora, the town of Vendas Novas became famous as the birthplace of one of Portugal’s most beloved sandwiches: the Bifana de Vendas Novas.</p>
                <p className="mb-4">In the 1960s, taverns started serving marinated pork sandwiches to travelers between Lisbon and Alentejo. The wine-and-garlic marinade links to older Iberian and colonial culinary influences, including the historic "vinha d’alhos" technique.</p>
                <figure className="my-6">
                    <img
                        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/5e/62/5a/vai-uma-bifana.jpg?w=900&h=500&s=1"
                        alt="Traditional Bifanas served in Vendas"
                        className="w-full rounded-xl object-cover shadow-md"
                    />
                    <figcaption className="mt-2 text-sm text-gray-500">
                        📸 Traditional Bifanas served in Vendas. Photo courtesy of Restaurante Bifanas &amp; Companhia
                    </figcaption>
                </figure>
                <p className="mb-6">Today, this bifana is considered one of the best in Portugal and draws food lovers from all over the country.</p>

                <h3 className="text-2xl font-serif text-olive my-6">4. Azevia – The Sweet Tradition of Alentejo</h3>
                <p className="mb-4">To finish, we turn to dessert: the Azevia, a traditional fried pastry often filled with chickpea paste, pumpkin jam, almond, sugar, and cinnamon.</p>
                <figure className="my-6">
                    <img
                        src="https://tradicional.dgadr.gov.pt/images/prod_imagens/doces/azevia.jpg"
                        alt="Produtos Tradicionais Portugueses — Azevia"
                        className="w-full rounded-xl object-cover shadow-md"
                    />
                    <figcaption className="mt-2 text-sm text-gray-500">
                        📸 Traditional Azevia from Alentejo. Photo courtesy of DGADR Traditional Portuguese Products.
                    </figcaption>
                </figure>
                <p className="mb-6">Crispy on the outside and delicately sweet inside, azevias are a living symbol of Alentejo’s conventual dessert heritage.</p>

                <h3 className="text-2xl font-serif text-olive my-6">The Flavors That Define a World-Class Region</h3>
                <p className="mb-4">Alentejo’s global ranking is the result of centuries of tradition — not trends. Sopa Alentejana speaks of resilience, Carne de Porco à Alentejana of cultural exchange, the bifana of Vendas Novas of local ingenuity, and azevias of sweet conventual legacy.</p>
                <p className="mb-4">These dishes are more than recipes — they are living memories of a land shaped by agriculture, migration, and time.</p>
                <p className="mb-4">To understand why Alentejo is one of the world’s top food regions, you don’t just read about it — you sit at the table, break bread, and taste the stories passed down through generations.</p>
                <p>Because in Évora, food isn’t just nourishment. It is heritage.</p>
            </>
        ),
        author: "Alentejo Bites Team",
        date: "Feb 19, 2026",
        category: "Food Culture",
        image: "https://www.bioarmonia.gr/images/Awards2025/Taste-Atlas-2025.png"
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
