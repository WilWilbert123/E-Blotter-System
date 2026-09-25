import { createClient } from '@/lib/supabase/server';
import { AppRole, UserSession } from '@/types/auth.types';

export async function getCurrentUser(): Promise<UserSession | null> {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) return null;

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*, roles(name), barangay_users(barangay_id)')
    .eq('id', user.id)
    .single();

  if (!profile) return null;

  return {
    id: profile.id,
    email: user.email,
    role: profile.roles.name as AppRole,
    barangayId: profile.barangay_users?.[0]?.barangay_id,
    firstName: profile.first_name,
    lastName: profile.last_name,
    mustChangePassword: profile.must_change_password
  };
}

export async function requireAuth(allowedRoles?: AppRole[]): Promise<UserSession> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw new Error('Forbidden');
  }
  
  return user;
}\n