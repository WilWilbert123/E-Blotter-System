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
