# Stripe + Supabase Booking Flow (Alentejo Bites)

This project now uses a **pending reservation + Stripe checkout** flow:

1. User picks date + guests in `TourDetails`.
2. Frontend inserts a `pending` booking row in Supabase (`bookings` table).
3. Frontend redirects user to Stripe Checkout URL (tour-specific).
4. Stripe webhook should update `payment_status` to `paid` (or `cancelled/expired`).
5. Availability query counts everything except `cancelled`, so pending+paid both block spots.

---

## Required Environment Variables

Set these in Netlify (Site settings → Environment variables):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_CHECKOUT_EVENING`
- `VITE_STRIPE_CHECKOUT_BRUNCH`

Example:

```bash
VITE_STRIPE_CHECKOUT_EVENING=https://buy.stripe.com/your_evening_link
VITE_STRIPE_CHECKOUT_BRUNCH=https://buy.stripe.com/your_brunch_link
```

---

## Supabase `bookings` Table (minimum columns)

- `id` bigint primary key
- `created_at` timestamptz default now()
- `date` date not null
- `tour_id` text not null
- `guests` int not null
- `payment_status` text not null  -- `pending` | `paid` | `cancelled` | `blocked`
- `stripe_id` text               -- stores reservation reference / Stripe id

You can keep your existing schema if these fields already exist.

---

## Stripe Webhook (important)

After payment confirmation, your webhook should update Supabase:

- on successful payment: set `payment_status = 'paid'`
- on expired/cancelled: set `payment_status = 'cancelled'`

Use `stripe_id` (or metadata reference) to find the row.

---

## How the automatic capacity block works

`TourDetails` reads bookings from Supabase and excludes only `cancelled`, so both
`pending` and `paid` reservations reduce remaining spots. When spots reach 0,
that date is shown as sold out and booking is disabled.
