'use client';
import React, { useEffect, useState } from 'react';
import { getBarangays } from '@/features/barangays/actions';

type Barangay = {
  id: string;
  name: string;
  official_display_name: string;
  captain_name: string | null;
  is_active: boolean;
};

export function BarangayTable() {
  const [barangays, setBarangays] = useState<Barangay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getBarangays();
        setBarangays(data as Barangay[]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading barangays...</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Barangay Name</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Official Name</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Captain</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
            <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {barangays.map((b) => (
            <tr key={b.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="p-4 text-sm font-medium">{b.name}</td>
              <td className="p-4 text-sm text-gray-600">{b.official_display_name}</td>
              <td className="p-4 text-sm text-gray-600">{b.captain_name || 'N/A'}</td>
              <td className="p-4 text-sm">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${b.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {b.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-4 text-sm text-right">
                <a href={`/police/admin/barangays/${b.id}`} className="text-blue-600 hover:underline mr-3">View</a>
                <a href={`/police/admin/barangays/${b.id}/edit`} className="text-blue-600 hover:underline">Edit</a>
              </td>
            </tr>
          ))}
          {barangays.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">No barangays found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
