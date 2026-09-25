import { BlotterTable } from '@/components/blotter/blotter-table';
import { getDb } from '@/lib/database';
import { getCurrentUser } from '@/lib/database/auth-queries';
import { redirect } from 'next/navigation';

export default async function BarangayBlotterPage() {
  const user = await getCurrentUser();
  if (!user || !user.barangayId) redirect('/barangay/admin/login');

  const db = getDb();
  const { data: cases } = await db.from('blotter_cases').select('*').eq('barangay_id', user.barangayId).order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blotter Records</h1>
        <a href="/barangay/admin/blotter/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium">
          + File New Blotter
        </a>
      </div>
      <BlotterTable cases={cases || []} />
    </div>
  );
}\n