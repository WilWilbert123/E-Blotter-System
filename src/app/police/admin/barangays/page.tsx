import { BarangayTable } from '@/components/barangays/barangay-table';
import { getCurrentUser } from '@/lib/database/auth-queries';
import { redirect } from 'next/navigation';

export default async function PoliceBarangaysPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'POLICE_SUPER_ADMIN') redirect('/unauthorized');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Barangays</h1>
        <a href="/police/admin/barangays/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium">
          + Add New Barangay
        </a>
      </div>
      <BarangayTable />
    </div>
  );
}\n