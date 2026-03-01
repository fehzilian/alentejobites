-- Supabase automation baseline for Alentejo Bites
-- Apply in Supabase SQL Editor (or migration pipeline) after reviewing.

-- 1) Capacity per tour (single source of truth)
create table if not exists public.tour_capacity (
  tour_id text primary key,
  max_guests integer not null check (max_guests > 0)
);

insert into public.tour_capacity (tour_id, max_guests)
values
  ('evening', 12),
  ('brunch', 10)
on conflict (tour_id) do update set max_guests = excluded.max_guests;

-- 2) Optional operational columns for automation/refund/calendar
alter table public.bookings
  add column if not exists starts_at timestamptz,
  add column if not exists cancelled_at timestamptz,
  add column if not exists cancellation_reason text,
  add column if not exists checkout_session_id text,
  add column if not exists google_event_id text,
  add column if not exists refund_status text;

-- 3) Enforce capacity in database (cross-platform safety)
-- Counts pending + paid + blocked as inventory consumers.
create or replace function public.validate_booking_capacity()
returns trigger
language plpgsql
as $$
declare
  cap integer;
  used_spots integer;
begin
  if new.payment_status = 'cancelled' then
    return new;
  end if;

  select tc.max_guests into cap
  from public.tour_capacity tc
  where tc.tour_id = new.tour_id;

  if cap is null then
    raise exception 'No capacity configured for tour_id=%', new.tour_id;
  end if;

  -- transaction-scoped advisory lock per tour/date to prevent oversell races
  perform pg_advisory_xact_lock(hashtextextended(new.tour_id || ':' || new.date::text, 0));

  select coalesce(sum(b.guests), 0)
    into used_spots
  from public.bookings b
  where b.tour_id = new.tour_id
    and b.date = new.date
    and b.payment_status <> 'cancelled'
    and (tg_op = 'INSERT' or b.id <> new.id);

  if used_spots + new.guests > cap then
    raise exception
      'Capacity exceeded for % on %: used %, new %, cap %',
      new.tour_id, new.date, used_spots, new.guests, cap;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_validate_booking_capacity on public.bookings;
create trigger trg_validate_booking_capacity
before insert or update of date, tour_id, guests, payment_status
on public.bookings
for each row
execute function public.validate_booking_capacity();

-- 4) Helpful index for availability queries
create index if not exists idx_bookings_tour_date_status
  on public.bookings (tour_id, date, payment_status);
