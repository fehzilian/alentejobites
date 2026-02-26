# Stripe + Supabase Automation (Alentejo Bites)

This is the production-grade flow to keep availability, cancellations/refunds, and calendar sync consistent across **all channels**.

---

## 1) End-to-end flow

1. Frontend creates `pending` booking in Supabase (`bookings` table).
2. Frontend redirects to Stripe Checkout with metadata (`booking_id`, `tour_id`, `date`, `guests`).
3. Stripe webhook updates booking status:
   - `checkout.session.completed` -> `paid`
   - `checkout.session.expired` / failed lifecycle -> `cancelled`
4. Cancellation endpoint checks 48h rule:
   - if cancellation time is **>= 48h** before `starts_at`: auto-refund in Stripe + `cancelled`
   - else: no auto-refund (manual policy), still set proper status/reason
5. Google Calendar sync:
   - on payment confirmed: create event
   - on cancellation: update/cancel event

---

## 2) Required env vars

Frontend (`VITE_*`):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_CHECKOUT_EVENING`
- `VITE_STRIPE_CHECKOUT_BRUNCH`

Backend/Edge Functions (secret):
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `GOOGLE_SERVICE_ACCOUNT_JSON` (or equivalent secret reference)
- `GOOGLE_CALENDAR_ID`

---

## 3) Database hardening (must-have)

Apply `supabase/automation.sql`.

What it gives you:
- `tour_capacity` table as source of truth.
- booking operational columns (`starts_at`, `cancelled_at`, `google_event_id`, etc.).
- DB-level capacity trigger (`validate_booking_capacity`) that prevents oversell even if bookings come from multiple platforms.
- advisory lock per tour/date to avoid race conditions on concurrent inserts.

This is what guarantees “lock reservations if limit is reached” across every integration path.

---

## 4) Stripe webhook responsibilities

Implement webhook with signature verification and idempotency.

### `checkout.session.completed`
- find booking by metadata/reference (`booking_id` preferred)
- set:
  - `payment_status = 'paid'`
  - `checkout_session_id`
  - `stripe_id` (payment intent/charge reference)
- create Google Calendar event and store `google_event_id`

### `checkout.session.expired`
- set `payment_status = 'cancelled'`
- set `cancelled_at = now()` + `cancellation_reason = 'checkout_expired'`

---

## 5) Auto-refund before 48h

Expose a cancellation endpoint/function:

1. Load booking and compute `starts_at - now()`.
2. If `>= interval '48 hours'` and booking is paid:
   - call Stripe refund API (`refunds.create`)
   - set `refund_status = 'refunded_auto_48h'`
3. Set booking cancelled:
   - `payment_status = 'cancelled'`
   - `cancelled_at = now()`
   - `cancellation_reason` (user/system)
4. If `google_event_id` exists, delete or mark cancelled in Google Calendar.

Recommended:
- use idempotency key on refund call (`booking_id + action`) to avoid duplicate refunds.

---

## 6) Google Calendar sync (automatic)

### Create event on paid booking
- title: `Alentejo Bites - {tour_id}`
- start/end from `starts_at` + tour duration
- description: guests, booking id, customer info, stripe reference
- store returned event id in `bookings.google_event_id`

### Cancel/update on booking cancellation
- if event exists, call Calendar API to cancel/delete event
- keep DB in sync (`google_event_id` retained for traceability)

---

## 7) Availability query rule

Availability should count every non-cancelled reservation:
- include: `pending`, `paid`, `blocked`
- exclude: `cancelled`

This matches current frontend behavior and DB trigger guarantees.

---

## 8) Minimal operational checklist

- [ ] `supabase/automation.sql` applied
- [ ] capacities configured for each `tour_id`
- [ ] Stripe webhook endpoint live + signature verification
- [ ] cancellation endpoint with 48h auto-refund policy
- [ ] Google Calendar service account configured and tested
- [ ] test scenarios:
  - paid booking creates event
  - expired checkout frees spot
  - cancel >48h triggers refund + frees spot + cancels event
  - concurrent booking attempts never exceed cap
