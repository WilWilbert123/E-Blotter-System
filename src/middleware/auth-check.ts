import { UserSession } from '@/types/auth.types';

export function hasPermission(user: UserSession, requiredRole: string) {
  if (user.role === 'POLICE_SUPER_ADMIN') return true;
  return user.role === requiredRole;
}\n