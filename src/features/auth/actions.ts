'use server';

import { createClient } from '@/lib/supabase/server';
import { loginSchema, LoginInput } from './schemas';
import { redirect } from 'next/navigation';

export async function loginAction(data: LoginInput) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'Invalid input' };
  }

  const supabase = createClient();
  
  // Convert username to email if it doesn't contain @, or use a custom auth setup
  const email = parsed.data.username.includes('@') 
    ? parsed.data.username 
    : `${parsed.data.username}@irosin.blotter.local`;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }
  
  // Need to redirect based on role, fetch profile
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
     const { data: profile } = await supabase
      .from('user_profiles')
      .select('roles(name)')
      .eq('id', user.id)
      .single();
      
     if (profile?.roles?.name?.startsWith('POLICE')) {
        redirect('/police/admin/dashboard');
     } else {
        redirect('/barangay/admin/dashboard');
     }
  }

  return { success: true };
}

export async function logoutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/barangay/admin/login');
}\n