import React from 'react';

export enum Page {
  HOME = 'home',
  ABOUT = 'about',
  EVENING_TOUR = 'evening-tour',
  BRUNCH_TOUR = 'brunch-tour',
  PRIVATE = 'private',
  TRANSFER = 'transfer',
  CORPORATE = 'corporate',
  CONTACT = 'contact',
  TERMS = 'terms',
  CANCELLATION = 'cancellation',
  COMPLAINTS = 'complaints',
  BLOG = 'blog'
}

export interface Tour {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  regularPrice: number;
  image: string;
  time: string;
  duration: string;
  page: Page;
  checkoutUrl: string; // URL to the WooCommerce Product/Checkout
  badges?: string[]; // New field for "Most Popular", "Best Seller", etc.
  flexibleSchedule?: boolean; // New field to indicate if other times are available on request
  maxCapacity: number; // Max guests per tour
}

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: React.ReactNode;
    author: string;
    date: string;
    category: string;
    image: string;
}