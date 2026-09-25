'use client';
import React, { useEffect, useState } from 'react';
import { getAuditLogs } from '@/features/audit/actions';

export function AuditTable() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const data = await getAuditLogs(100);
        setLogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  if (loading) return <div className="p-4">Loading audit logs...</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Timestamp</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Action</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Entity</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Actor</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-sm text-gray-600">{new Date(log.created_at).toLocaleString()}</td>
              <td className="p-4 text-sm font-medium">{log.action}</td>
              <td className="p-4 text-sm text-gray-600">{log.entity_type}</td>
              <td className="p-4 text-sm text-gray-600">
                {log.user_profiles ? `${log.user_profiles.first_name} ${log.user_profiles.last_name}` : 'System'}
              </td>
              <td className="p-4 text-sm">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {log.success ? 'SUCCESS' : 'FAILED'}
                </span>
              </td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr><td colSpan={5} className="p-4 text-center text-gray-500">No audit logs found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
