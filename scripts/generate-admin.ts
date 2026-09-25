import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function generateAdmin() {
  const email = process.argv[2] || 'admin@eblotter.gov.ph';
  const password = process.argv[3] || 'SecureAdmin123!';

  console.log(`Creating SUPER_ADMIN user: ${email}`);

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (authError) {
    console.error('Failed to create auth user:', authError.message);
    process.exit(1);
  }

  // Assign POLICE_SUPER_ADMIN role
  const { error: profileError } = await supabase.from('user_profiles').insert({
    id: authData.user.id,
    username: email.split('@')[0],
    first_name: 'System',
    last_name: 'Administrator',
    role_id: 'POLICE_SUPER_ADMIN',
    must_change_password: false
  });

  if (profileError) {
    console.error('Failed to create admin profile:', profileError.message);
    await supabase.auth.admin.deleteUser(authData.user.id);
    process.exit(1);
  }

  console.log('✅ Successfully created SUPER_ADMIN.');
}

generateAdmin();
