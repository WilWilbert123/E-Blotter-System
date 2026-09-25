const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\\n');
};

// ==========================================
// REAL COMPONENTS - BARANGAY
// ==========================================
write('src/components/barangays/barangay-table.tsx', `
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
                <span className={\`px-2 py-1 text-xs font-semibold rounded-full \${b.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}\`}>
                  {b.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-4 text-sm text-right">
                <a href={\`/police/admin/barangays/\${b.id}\`} className="text-blue-600 hover:underline mr-3">View</a>
                <a href={\`/police/admin/barangays/\${b.id}/edit\`} className="text-blue-600 hover:underline">Edit</a>
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
`);

write('src/components/barangays/barangay-form.tsx', `
'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { barangaySchema, BarangayInput } from '@/features/barangays/schemas';
import { createBarangay } from '@/features/barangays/actions';

export function BarangayForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BarangayInput>({
    resolver: zodResolver(barangaySchema)
  });

  const onSubmit = async (data: BarangayInput) => {
    setLoading(true);
    setMessage('');
    const res = await createBarangay(data);
    if (res?.error) {
      setMessage(\`Error: \${res.error}\`);
    } else {
      setMessage('Barangay created successfully.');
      reset();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg bg-white p-6 rounded shadow">
      {message && <div className="p-3 bg-blue-50 text-blue-700 rounded text-sm">{message}</div>}
      
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input {...register('name')} className="w-full border rounded p-2" placeholder="e.g. Monbon" />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Official Display Name</label>
        <input {...register('official_display_name')} className="w-full border rounded p-2" placeholder="e.g. Barangay Monbon" />
        {errors.official_display_name && <span className="text-red-500 text-xs">{errors.official_display_name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Captain Name (Optional)</label>
        <input {...register('captain_name')} className="w-full border rounded p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Address (Optional)</label>
        <textarea {...register('address')} className="w-full border rounded p-2" rows={3}></textarea>
      </div>

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Saving...' : 'Save Barangay'}
      </button>
    </form>
  );
}
`);


// ==========================================
// REAL COMPONENTS - BLOTTER
// ==========================================
write('src/components/blotter/blotter-table.tsx', `
'use client';
import React from 'react';

type BlotterCase = {
  id: string;
  case_number: string;
  incident_type: string;
  status: string;
  incident_date: string;
  location: string;
};

export function BlotterTable({ cases }: { cases: BlotterCase[] }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Case No.</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Type</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
            <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases?.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-sm font-medium">{c.case_number}</td>
              <td className="p-4 text-sm text-gray-600">{c.incident_type}</td>
              <td className="p-4 text-sm">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {c.status}
                </span>
              </td>
              <td className="p-4 text-sm text-gray-600">{new Date(c.incident_date).toLocaleDateString()}</td>
              <td className="p-4 text-sm text-right">
                <a href={\`/barangay/admin/blotter/\${c.id}\`} className="text-blue-600 hover:underline">View Case</a>
              </td>
            </tr>
          ))}
          {(!cases || cases.length === 0) && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">No blotter records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
`);

write('src/components/blotter/blotter-form.tsx', `
'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blotterSchema, BlotterInput } from '@/features/blotter/schemas';
import { createBlotter } from '@/features/blotter/actions';

export function BlotterForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BlotterInput>({
    resolver: zodResolver(blotterSchema)
  });

  const onSubmit = async (data: BlotterInput) => {
    setLoading(true);
    setMessage('');
    const res = await createBlotter(data);
    if (res?.error) {
      setMessage(\`Error: \${res.error}\`);
    } else {
      setMessage('Blotter case recorded successfully.');
      reset();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl bg-white p-6 rounded shadow">
      {message && <div className="p-3 bg-blue-50 text-blue-700 rounded text-sm">{message}</div>}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Case Number</label>
          <input {...register('case_number')} className="w-full border rounded p-2" />
          {errors.case_number && <span className="text-red-500 text-xs">{errors.case_number.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Incident Type</label>
          <select {...register('incident_type')} className="w-full border rounded p-2 bg-white">
            <option value="">Select Type</option>
            <option value="THEFT">Theft</option>
            <option value="PHYSICAL_INJURY">Physical Injury</option>
            <option value="THREATS">Threats</option>
            <option value="TRESPASSING">Trespassing</option>
            <option value="MALICIOUS_MISCHIEF">Malicious Mischief</option>
            <option value="SLANDER">Slander</option>
            <option value="DOMESTIC_VIOLENCE">Domestic Violence</option>
            <option value="PROPERTY_DISPUTE">Property Dispute</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.incident_type && <span className="text-red-500 text-xs">{errors.incident_type.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Incident Date & Time</label>
          <input type="datetime-local" {...register('incident_date')} className="w-full border rounded p-2" />
          {errors.incident_date && <span className="text-red-500 text-xs">{errors.incident_date.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input {...register('location')} className="w-full border rounded p-2" />
          {errors.location && <span className="text-red-500 text-xs">{errors.location.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Narrative (Detailed Report)</label>
        <textarea {...register('narrative')} className="w-full border rounded p-2" rows={6}></textarea>
        {errors.narrative && <span className="text-red-500 text-xs">{errors.narrative.message}</span>}
      </div>

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Filing...' : 'File Blotter Record'}
      </button>
    </form>
  );
}
`);

// ==========================================
// REAL COMPONENTS - PERSONS
// ==========================================
write('src/components/persons/person-table.tsx', `
'use client';
import React from 'react';

type Person = {
  id: string;
  first_name: string;
  last_name: string;
  sex: string;
  contact_information: string;
};

export function PersonTable({ persons }: { persons: Person[] }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Sex</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Contact</th>
            <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons?.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-sm font-medium">{p.first_name} {p.last_name}</td>
              <td className="p-4 text-sm text-gray-600">{p.sex || '-'}</td>
              <td className="p-4 text-sm text-gray-600">{p.contact_information || '-'}</td>
              <td className="p-4 text-sm text-right">
                <a href={\`/barangay/admin/persons/\${p.id}\`} className="text-blue-600 hover:underline">View Profile</a>
              </td>
            </tr>
          ))}
          {(!persons || persons.length === 0) && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">No persons registered.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
`);


// ==========================================
// REAL COMPONENTS - AUDIT
// ==========================================
write('src/components/audit/audit-table.tsx', `
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
                {log.user_profiles ? \`\${log.user_profiles.first_name} \${log.user_profiles.last_name}\` : 'System'}
              </td>
              <td className="p-4 text-sm">
                <span className={\`px-2 py-1 text-xs font-semibold rounded-full \${log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}\`}>
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
`);


// ==========================================
// WIRE PAGES TO COMPONENTS
// ==========================================
write('src/app/police/admin/barangays/page.tsx', `
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
}
`);

write('src/app/police/admin/barangays/new/page.tsx', `
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
`);

write('src/app/barangay/admin/blotter/page.tsx', `
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
}
`);

write('src/app/barangay/admin/blotter/new/page.tsx', `
import { BlotterForm } from '@/components/blotter/blotter-form';

export default function BarangayNewBlotterPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">File New Blotter Record</h1>
      <BlotterForm />
    </div>
  );
}
`);

write('src/app/police/admin/audit-logs/page.tsx', `
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
}
`);

console.log('Replaced placeholder components with real full functionality.');
