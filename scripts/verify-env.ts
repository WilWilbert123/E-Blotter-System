import { config } from 'dotenv';
config();

const requiredEnvs = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

let missing = false;

for (const env of requiredEnvs) {
  if (!process.env[env]) {
    console.error(`❌ Missing required environment variable: ${env}`);
    missing = true;
  }
}

if (missing) {
  console.error('Please configure your .env.local file based on .env.example');
  process.exit(1);
} else {
  console.log('✅ Environment variables verified.');
}
