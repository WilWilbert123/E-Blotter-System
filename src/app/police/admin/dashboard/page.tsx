import { getCurrentUser } from '@/lib/database/auth-queries';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function PoliceDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/police/admin/login');

  // MOCK DATA for UI Design Phase (Bypassing database fetches)
  const activeCases = 62;
  const totalCases = 248;
  const barangayCount = 28;

  const mockCases = [
    { no: 'EB-2025-000248', type: 'Theft', date: 'Sep 24, 2025', status: 'Open', bg: 'bg-red-50 text-red-600 border-red-100', barangay: 'Irosin' },
    { no: 'EB-2025-000247', type: 'Assault', date: 'Sep 24, 2025', status: 'Under Investigation', bg: 'bg-orange-50 text-orange-600 border-orange-100', barangay: 'San Roque' },
    { no: 'EB-2025-000246', type: 'Physical Injury', date: 'Sep 23, 2025', status: 'Closed', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100', barangay: 'San Isidro' },
    { no: 'EB-2025-000245', type: 'Fraud', date: 'Sep 23, 2025', status: 'Open', bg: 'bg-red-50 text-red-600 border-red-100', barangay: 'Biga' },
    { no: 'EB-2025-000244', type: 'Vandalism', date: 'Sep 22, 2025', status: 'Closed', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100', barangay: 'San Juan' },
    { no: 'EB-2025-000243', type: 'Theft', date: 'Sep 21, 2025', status: 'Open', bg: 'bg-red-50 text-red-600 border-red-100', barangay: 'Bacolod' },
    { no: 'EB-2025-000242', type: 'Disturbance', date: 'Sep 21, 2025', status: 'Closed', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100', barangay: 'Batang' },
    { no: 'EB-2025-000241', type: 'Assault', date: 'Sep 20, 2025', status: 'Under Investigation', bg: 'bg-orange-50 text-orange-600 border-orange-100', barangay: 'Cawayan' },
    { no: 'EB-2025-000240', type: 'Vandalism', date: 'Sep 19, 2025', status: 'Closed', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100', barangay: 'Gabao' },
    { no: 'EB-2025-000239', type: 'Physical Injury', date: 'Sep 18, 2025', status: 'Open', bg: 'bg-red-50 text-red-600 border-red-100', barangay: 'Mabini' },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-xl bg-[#1e3a5f] text-white shadow-md border border-slate-200/50 shrink-0">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#112340] via-[#112340]/90 to-transparent z-10"></div>
          <img
            src="/hero_bg.jpg"
            alt="Police Station"
            className="w-full h-full object-cover object-center opacity-60 mix-blend-overlay"
          />
        </div>
        <div className="relative z-20 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, {user.firstName} {user.lastName}</h1>
            <p className="text-blue-200 text-sm">Irosin Municipal Police Station - E-Blotter System</p>
            <p className="text-xs text-blue-300 mt-1">Safer Communities, Stronger Barangays.</p>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-xl p-3 border border-white/10 mt-4 md:mt-0 shadow-xl">
            <div className="w-12 h-12 shrink-0 rounded-full bg-red-600 border-[3px] border-yellow-400 flex items-center justify-center filter drop-shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 to-transparent"></div>
              <span className="text-yellow-400 font-bold text-[10px] text-center leading-[1.1] z-10">PNP<br/>SEAL</span>
            </div>
            <div>
              <div className="font-bold tracking-wide leading-tight text-white text-sm">PHILIPPINE NATIONAL</div>
              <div className="font-bold tracking-wide leading-tight text-white text-sm">POLICE</div>
              <div className="text-[10px] text-blue-200 mt-0.5">Service • Honor • Justice</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 shrink-0">
        {/* Total Cases */}
        <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-600/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-500 mb-0.5">Total Cases</h3>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-slate-800">{totalCases}</p>
            </div>
            <p className="text-[10px] font-medium text-emerald-500 mt-0.5 flex items-center gap-1">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              12% <span className="text-slate-400 font-normal">from last month</span>
            </p>
          </div>
        </div>

        {/* Active Cases */}
        <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-red-500/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-500 mb-0.5">Active Cases</h3>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-slate-800">{activeCases}</p>
            </div>
            <p className="text-[10px] font-medium text-emerald-500 mt-0.5 flex items-center gap-1">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              8% <span className="text-slate-400 font-normal">from last month</span>
            </p>
          </div>
        </div>

        {/* Persons in Database */}
        <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-600/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-500 mb-0.5">Persons in Database</h3>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-slate-800">1,482</p>
            </div>
            <p className="text-[10px] font-medium text-emerald-500 mt-0.5 flex items-center gap-1">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              15% <span className="text-slate-400 font-normal">from last month</span>
            </p>
          </div>
        </div>

        {/* Barangays */}
        <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-600/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-500 mb-0.5">Barangays</h3>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-slate-800">{barangayCount}</p>
            </div>
            <p className="text-[10px] font-medium text-slate-400 mt-0.5">All barangays in Irosin</p>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 pb-2">
        {/* Chart Area */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col h-[280px] lg:h-auto">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="font-bold text-sm text-slate-800">Cases by Incident Type</h3>
            <select className="text-[11px] border border-slate-200 rounded-md bg-transparent text-slate-500 font-medium outline-none px-1.5 py-0.5">
              <option>This Year</option>
              <option>Last 30 days</option>
            </select>
          </div>

          <div className="flex-1 flex min-h-0">
            {/* Y Axis */}
            <div className="flex flex-col justify-between text-[9px] text-slate-400 font-medium pr-3 pb-5 h-full text-right border-r border-slate-100 shrink-0">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* Bars */}
            <div className="flex-1 flex items-end justify-between pl-3 pb-5 relative h-full">
              {/* Grid Lines */}
              <div className="absolute inset-0 pl-3 pb-5 pointer-events-none flex flex-col justify-between">
                <div className="w-full border-b border-slate-50"></div>
                <div className="w-full border-b border-slate-50"></div>
                <div className="w-full border-b border-slate-50"></div>
                <div className="w-full border-b border-slate-50"></div>
                <div className="w-full border-b border-slate-100"></div>
              </div>

              {/* Mock Chart Bars */}
              <div className="flex flex-col items-center gap-1 group z-10 w-8 h-full justify-end relative">
                <span className="text-[9px] font-bold text-slate-700">42</span>
                <div className="w-full bg-blue-500 rounded-t-sm group-hover:opacity-80 transition-opacity" style={{ height: '42%' }}></div>
                <span className="text-[9px] text-slate-500 font-medium absolute -bottom-5">Theft</span>
              </div>
              <div className="flex flex-col items-center gap-1 group z-10 w-8 h-full justify-end relative">
                <span className="text-[9px] font-bold text-slate-700">38</span>
                <div className="w-full bg-blue-500 rounded-t-sm group-hover:opacity-80 transition-opacity" style={{ height: '38%' }}></div>
                <span className="text-[9px] text-slate-500 font-medium absolute -bottom-5">Assault</span>
              </div>
              <div className="flex flex-col items-center gap-1 group z-10 w-8 h-full justify-end relative">
                <span className="text-[9px] font-bold text-slate-700">31</span>
                <div className="w-full bg-blue-500 rounded-t-sm group-hover:opacity-80 transition-opacity" style={{ height: '31%' }}></div>
                <span className="text-[9px] text-slate-500 font-medium absolute -bottom-5 whitespace-nowrap">Physical</span>
              </div>
              <div className="flex flex-col items-center gap-1 group z-10 w-8 h-full justify-end relative">
                <span className="text-[9px] font-bold text-slate-700">22</span>
                <div className="w-full bg-emerald-500 rounded-t-sm group-hover:opacity-80 transition-opacity" style={{ height: '22%' }}></div>
                <span className="text-[9px] text-slate-500 font-medium absolute -bottom-5">Fraud</span>
              </div>
              <div className="flex flex-col items-center gap-1 group z-10 w-8 h-full justify-end relative">
                <span className="text-[9px] font-bold text-slate-700">18</span>
                <div className="w-full bg-orange-400 rounded-t-sm group-hover:opacity-80 transition-opacity" style={{ height: '18%' }}></div>
                <span className="text-[9px] text-slate-500 font-medium absolute -bottom-5">Vandalism</span>
              </div>
              <div className="flex flex-col items-center gap-1 group z-10 w-8 h-full justify-end relative">
                <span className="text-[9px] font-bold text-slate-700">97</span>
                <div className="w-full bg-blue-500 rounded-t-sm group-hover:opacity-80 transition-opacity" style={{ height: '97%' }}></div>
                <span className="text-[9px] text-slate-500 font-medium absolute -bottom-5">Others</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Cases Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-100 shrink-0">
            <h3 className="font-bold text-sm text-slate-800">Recent Cases</h3>
            <Link href="/police/admin/blotter" className="text-[11px] font-semibold text-blue-600 hover:text-blue-700">View all →</Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-2 border-b border-slate-100">Case No.</th>
                  <th className="px-4 py-2 border-b border-slate-100">Incident Type</th>
                  <th className="px-4 py-2 border-b border-slate-100">Date</th>
                  <th className="px-4 py-2 border-b border-slate-100">Status</th>
                  <th className="px-4 py-2 border-b border-slate-100 text-right">Barangay</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {mockCases.slice(0, 5).map((c) => (
                  <tr key={c.no} className="hover:bg-slate-50 transition-colors border-b border-slate-50">
                    <td className="px-4 py-2.5 font-medium text-slate-800">{c.no}</td>
                    <td className="px-4 py-2.5 text-slate-600">{c.type}</td>
                    <td className="px-4 py-2.5 text-slate-500">{c.date}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${c.bg}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-600">{c.barangay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
