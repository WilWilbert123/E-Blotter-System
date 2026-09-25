import { UserTable } from '@/components/users/user-table';
import { getCurrentUser } from '@/lib/database/auth-queries';
import { redirect } from 'next/navigation';

export default async function PoliceUsersPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'POLICE_SUPER_ADMIN') redirect('/unauthorized');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage System Users</h1>
        <a href="/police/admin/users/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium">
          + Create User
        </a>
      </div>
      <UserTable />
    </div>
  );
}\n