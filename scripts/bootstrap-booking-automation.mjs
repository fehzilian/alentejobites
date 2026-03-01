import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createClient } from '@supabase/supabase-js';

const args = new Set(process.argv.slice(2));
const shouldApplySql = args.has('--apply-sql');

const readDotEnv = (filePath) => {
  if (!existsSync(filePath)) return;
  const lines = readFileSync(filePath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (!process.env[key]) {
      process.env[key] = rest.join('=').trim();
    }
  }
};

readDotEnv('.env');
readDotEnv('.env.local');

const requiredFrontend = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_STRIPE_CHECKOUT_EVENING',
  'VITE_STRIPE_CHECKOUT_BRUNCH',
];

const requiredBackend = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'GOOGLE_CALENDAR_ID',
];

const missingFrontend = requiredFrontend.filter((key) => !process.env[key]);
const missingBackend = requiredBackend.filter((key) => !process.env[key]);

if (missingFrontend.length) {
  console.error('❌ Missing frontend env vars:', missingFrontend.join(', '));
}

if (missingBackend.length) {
  console.warn('⚠️ Missing backend env vars (needed for webhook/refund/calendar):', missingBackend.join(', '));
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

try {
  const { error } = await supabase.from('bookings').select('id', { count: 'exact', head: true });
  if (error) {
    console.error('❌ Supabase connection check failed:', error.message);
    process.exit(1);
  }
  console.log('✅ Supabase connection check passed (bookings table reachable).');
} catch (error) {
  console.error('❌ Supabase connectivity exception:', error instanceof Error ? error.message : String(error));
  process.exit(1);
}

if (shouldApplySql) {
  if (!process.env.SUPABASE_DB_URL) {
    console.error('❌ SUPABASE_DB_URL is required for --apply-sql mode.');
    process.exit(1);
  }

  const run = spawnSync('psql', [process.env.SUPABASE_DB_URL, '-f', 'supabase/automation.sql'], {
    stdio: 'inherit',
  });

  if (run.status !== 0) {
    console.error('❌ Failed to apply supabase/automation.sql');
    process.exit(run.status ?? 1);
  }

  console.log('✅ Applied supabase/automation.sql successfully.');
} else {
  console.log('ℹ️ SQL apply skipped. Run with --apply-sql and SUPABASE_DB_URL to apply automation script.');
}

console.log('✅ Booking automation bootstrap check finished.');
