import { getCurrentUser } from '@/lib/database/auth-queries';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function BarangayLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/barangay/admin/login');
  }

  if (!['BARANGAY_CAPTAIN', 'BARANGAY_STAFF'].includes(user.role)) {
    redirect('/unauthorized');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '250px', backgroundColor: '#1f2937', color: 'white', padding: '1rem' }}>
        <h2>Barangay Panel</h2>
        <nav style={{ marginTop: '2rem' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
             <li style={{ marginBottom: '1rem' }}><a href="/barangay/admin/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a></li>
             <li style={{ marginBottom: '1rem' }}><a href="/barangay/admin/blotter" style={{ color: 'white', textDecoration: 'none' }}>Blotter Records</a></li>
             <li style={{ marginBottom: '1rem' }}><a href="/barangay/admin/persons" style={{ color: 'white', textDecoration: 'none' }}>Persons</a></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f3f4f6' }}>
        {children}
      </main>
    </div>
  );
}
