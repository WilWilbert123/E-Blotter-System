import { BarangayForm } from '@/components/barangays/barangay-form';
import { getCurrentUser } from '@/lib/database/auth-queries';
import { redirect } from 'next/navigation';

export default async function PoliceNewBarangayPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'POLICE_SUPER_ADMIN') redirect('/unauthorized');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Barangay</h1>
      <BarangayForm />
    </div>
  );
}
