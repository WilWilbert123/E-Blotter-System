import { getCurrentUser } from '@/lib/database/auth-queries';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function PoliceUsersPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'POLICE_SUPER_ADMIN') redirect('/unauthorized');

  // MOCK DATA for UI Design Phase
  const mockUsers = [
    { id: 1, name: 'Juan dela Cruz', role: 'Police Officer', barangay: '-', status: 'Active', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 2, name: 'Maria Santos', role: 'Barangay Captain', barangay: 'Irosin', status: 'Active', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 3, name: 'Pedro Reyes', role: 'Barangay Staff', barangay: 'San Roque', status: 'Active', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 4, name: 'Ana Lopez', role: 'Barangay Staff', barangay: 'San Isidro', status: 'Active', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 5, name: 'Carlos Garcia', role: 'Barangay Staff', barangay: 'Biga', status: 'Inactive', bg: 'bg-red-50 text-red-600 border-red-100' },
    { id: 6, name: 'Rizal Santos', role: 'Police Officer', barangay: '-', status: 'Active', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 7, name: 'Elena Cruz', role: 'Barangay Captain', barangay: 'San Juan', status: 'Active', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 8, name: 'Jose Martinez', role: 'Barangay Staff', barangay: 'Bacolod', status: 'Active', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 9, name: 'Mario Fernandez', role: 'Barangay Captain', barangay: 'Batang', status: 'Inactive', bg: 'bg-red-50 text-red-600 border-red-100' },
    { id: 10, name: 'Luzviminda Ocampo', role: 'Barangay Captain', barangay: 'Gabao', status: 'Active', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-slate-800">User Management</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-slate-200 px-6 pt-4">
          <nav className="flex gap-8">
            <button className="pb-4 text-sm font-bold text-blue-600 border-b-2 border-blue-600">
              Users
            </button>
            <button className="pb-4 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
              Bulk Upload
            </button>
          </nav>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-slate-100">
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4 border-b border-slate-100">Name</th>
                <th className="px-6 py-4 border-b border-slate-100">Role</th>
                <th className="px-6 py-4 border-b border-slate-100">Barangay</th>
                <th className="px-6 py-4 border-b border-slate-100">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors border-b border-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-800">{u.name}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{u.barangay}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${u.bg}`}>
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium text-sm shadow-sm">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">4</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">5</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
