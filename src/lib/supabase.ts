import { createClient } from '@supabase/supabase-js';

// NOTE: You need to create a .env file in your project root with these values:
// VITE_SUPABASE_URL=your_project_url
// VITE_SUPABASE_ANON_KEY=your_anon_key

// Cast import.meta to any to avoid TypeScript errors regarding 'env' not existing on ImportMeta
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Booking {
    id: number;
    created_at?: string;
    date: string; // YYYY-MM-DD
    tour_id: string;
    guests: number;
    // 'blocked' allows you to manually close a date in the database without a payment
    payment_status: 'paid' | 'cancelled' | 'pending' | 'blocked';
    stripe_id?: string; // Crucial for identifying which booking to cancel
    customer_email?: string;
    customer_name?: string;
}