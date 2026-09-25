import { getCurrentUser } from '@/lib/database/auth-queries';
import { getDb } from '@/lib/database';
import { redirect } from 'next/navigation';

export default async function PoliceDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/police/admin/login');

  const db = getDb();
  
  const [{ count: activeCases }, { count: totalCases }, { count: barangayCount }] = await Promise.all([
    db.from('blotter_cases').select('*', { count: 'exact', head: true }).eq('status', 'ACTIVE'),
    db.from('blotter_cases').select('*', { count: 'exact', head: true }),
    db.from('barangays').select('*', { count: 'exact', head: true })
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Police HQ Dashboard</h1>
      <p className="text-gray-500">Welcome back, {user.firstName} {user.lastName} (Super Admin)</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-white rounded shadow">
           <h3 className="text-sm font-medium text-gray-500">Total System Cases</h3>
           <p className="text-2xl font-bold">{totalCases ?? 0}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
           <h3 className="text-sm font-medium text-gray-500">System Active Cases</h3>
           <p className="text-2xl font-bold">{activeCases ?? 0}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
           <h3 className="text-sm font-medium text-gray-500">Registered Barangays</h3>
           <p className="text-2xl font-bold">{barangayCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
}\n