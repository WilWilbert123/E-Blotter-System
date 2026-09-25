import { getCurrentUser } from '@/lib/database/auth-queries';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function PoliceLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/police/admin/login');
  }

  if (!['POLICE_SUPER_ADMIN', 'POLICE_OFFICER'].includes(user.role)) {
    redirect('/unauthorized');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '250px', backgroundColor: '#111827', color: 'white', padding: '1rem' }}>
        <h2>Police HQ</h2>
        <nav style={{ marginTop: '2rem' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
             <li style={{ marginBottom: '1rem' }}><a href="/police/admin/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a></li>
             <li style={{ marginBottom: '1rem' }}><a href="/police/admin/blotter" style={{ color: 'white', textDecoration: 'none' }}>All Blotters</a></li>
             <li style={{ marginBottom: '1rem' }}><a href="/police/admin/barangays" style={{ color: 'white', textDecoration: 'none' }}>Manage Barangays</a></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f9fafb' }}>
        {children}
      </main>
    </div>
  );
}
