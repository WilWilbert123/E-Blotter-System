import { AuditTable } from '@/components/audit/audit-table';
import { getCurrentUser } from '@/lib/database/auth-queries';
import { redirect } from 'next/navigation';

export default async function PoliceAuditLogsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'POLICE_SUPER_ADMIN') redirect('/unauthorized');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">System Audit Logs</h1>
      <p className="text-gray-500 mb-4">Real-time immutable security and action logs.</p>
      <AuditTable />
    </div>
  );
}\n