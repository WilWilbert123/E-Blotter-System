const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\\n');
};

write('src/components/users/user-table.tsx', `
'use client';
import React, { useEffect, useState } from 'react';
import { getDb } from '@/lib/database';

export function UserTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const db = getDb();
        const { data, error } = await db.from('user_profiles').select('*, roles(name), barangay_users(barangays(name))');
        if (!error && data) setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-4">Loading users...</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Username</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Role</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Barangay</th>
            <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-sm font-medium">{u.username}</td>
              <td className="p-4 text-sm text-gray-600">{u.first_name} {u.last_name}</td>
              <td className="p-4 text-sm">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                  {u.roles?.name?.replace(/_/g, ' ')}
                </span>
              </td>
              <td className="p-4 text-sm text-gray-600">
                {u.barangay_users?.[0]?.barangays?.name || 'N/A'}
              </td>
              <td className="p-4 text-sm text-right">
                <a href={\`/police/admin/users/\${u.id}\`} className="text-blue-600 hover:underline">Manage</a>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr><td colSpan={5} className="p-4 text-center text-gray-500">No users found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
`);

write('src/app/police/admin/users/page.tsx', `
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
}
`);

console.log('Built remaining core tables.');
