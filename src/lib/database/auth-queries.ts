import { createClient } from '@/lib/supabase/server';
import { AppRole, UserSession } from '@/types/auth.types';

export async function getCurrentUser(): Promise<UserSession | null> {
  // MOCKED for design development
  return {
    id: 'mocked-id',
    email: 'police@admin.com',
    role: 'POLICE_SUPER_ADMIN' as AppRole,
    firstName: 'PNP',
    lastName: 'Officer',
    mustChangePassword: false
  };
}

export async function requireAuth(allowedRoles?: AppRole[]): Promise<UserSession> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw new Error('Forbidden');
  }
  
  return user;
}
