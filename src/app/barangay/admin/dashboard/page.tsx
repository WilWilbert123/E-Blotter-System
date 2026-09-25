import { getCurrentUser } from '@/lib/database/auth-queries';
import { getDb } from '@/lib/database';
import { redirect } from 'next/navigation';
import { StatCard } from '@/components/dashboard/stat-card';

export default async function BarangayDashboardPage() {
  const user = await getCurrentUser();
  if (!user || !user.barangayId) redirect('/barangay/admin/login');

  const db = getDb();
  
  // Example real queries for the dashboard
  const [{ count: activeCases }, { count: totalCases }] = await Promise.all([
    db.from('blotter_cases').select('*', { count: 'exact', head: true }).eq('barangay_id', user.barangayId).eq('status', 'ACTIVE'),
    db.from('blotter_cases').select('*', { count: 'exact', head: true }).eq('barangay_id', user.barangayId)
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Barangay {user.barangayId} Dashboard</h1>
      <p className="text-gray-500">Welcome back, {user.firstName} {user.lastName}</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-white rounded shadow">
           <h3 className="text-sm font-medium text-gray-500">Total Cases</h3>
           <p className="text-2xl font-bold">{totalCases ?? 0}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
           <h3 className="text-sm font-medium text-gray-500">Active Cases</h3>
           <p className="text-2xl font-bold">{activeCases ?? 0}</p>
        </div>
      </div>
    </div>
  );
}\n