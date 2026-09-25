const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\\n');
};

// ==========================================
// TYPES
// ==========================================
write('src/types/database.types.ts', `
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          role_id: string;
          username: string | null;
          first_name: string;
          last_name: string;
          is_active: boolean;
          must_change_password: boolean;
        };
      };
      roles: {
        Row: {
          id: string;
          name: string;
        };
      };
      barangays: {
        Row: {
          id: string;
          name: string;
          official_display_name: string;
        };
      };
    };
  };
}
`);

write('src/types/auth.types.ts', `
export type AppRole = 'POLICE_SUPER_ADMIN' | 'POLICE_OFFICER' | 'BARANGAY_CAPTAIN' | 'BARANGAY_STAFF';

export interface UserSession {
  id: string;
  email?: string;
  role: AppRole;
  barangayId?: string;
  firstName: string;
  lastName: string;
  mustChangePassword?: boolean;
}
`);

// ==========================================
// DB LAYER
// ==========================================
write('src/lib/database/index.ts', `
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/database.types';

export const getDb = () => {
  return createClient();
};
`);

write('src/lib/database/auth-queries.ts', `
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
}
`);

// ==========================================
// FEATURES - AUTH
// ==========================================
write('src/features/auth/schemas.ts', `
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username or Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;
`);

write('src/features/auth/actions.ts', `
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
    : \`\${parsed.data.username}@irosin.blotter.local\`;

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
}
`);

console.log('Built auth and db layer.');
