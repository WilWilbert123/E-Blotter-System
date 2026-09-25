const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\\n');
};

// ==========================================
// APP PAGES - AUTH
// ==========================================
write('src/components/auth/login-form.tsx', `
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/features/auth/schemas';
import { loginAction } from '@/features/auth/actions';

export function LoginForm({ role }: { role: 'police' | 'barangay' }) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    const result = await loginAction(data);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{role === 'police' ? 'Police Admin Login' : 'Barangay Admin Login'}</h2>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium">Username or Email</label>
        <input {...register('username')} className="mt-1 block w-full border rounded p-2" />
        {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input type="password" {...register('password')} className="mt-1 block w-full border rounded p-2" />
        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white rounded p-2 mt-4 hover:bg-blue-700 disabled:opacity-50">
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
`);

write('src/app/barangay/admin/login/page.tsx', `
import { LoginForm } from '@/components/auth/login-form';

export default function BarangayLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm role="barangay" />
    </div>
  );
}
`);

write('src/app/police/admin/login/page.tsx', `
import { LoginForm } from '@/components/auth/login-form';

export default function PoliceLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <LoginForm role="police" />
    </div>
  );
}
`);

// ==========================================
// GLOBALS CSS
// ==========================================
write('src/app/globals.css', `
:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 245, 245, 245;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 10, 10, 10;
    --background-end-rgb: 20, 20, 20;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  padding: 0;
}

/* Basic Tailwind-like classes for vanilla css since user rejected tailwind */
.min-h-screen { min-height: 100vh; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.bg-gray-100 { background-color: #f3f4f6; }
.bg-gray-900 { background-color: #111827; }
.bg-white { background-color: #ffffff; color: #000; }
.p-6 { padding: 1.5rem; }
.rounded { border-radius: 0.25rem; }
.shadow { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }
.max-w-sm { max-width: 24rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.w-full { width: 100%; }
.mt-1 { margin-top: 0.25rem; }
.mt-4 { margin-top: 1rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.block { display: block; }
.text-sm { font-size: 0.875rem; }
.text-xs { font-size: 0.75rem; }
.text-xl { font-size: 1.25rem; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
.text-red-500 { color: #ef4444; }
.text-white { color: #ffffff; }
.bg-blue-600 { background-color: #2563eb; }
.hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
.border { border: 1px solid #e5e7eb; }
.p-2 { padding: 0.5rem; }
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1rem;
}
`);

// ==========================================
// LAYOUTS
// ==========================================
write('src/app/layout.tsx', `
import './globals.css';
import React from 'react';

export const metadata = {
  title: 'E-Blotter System',
  description: 'Production-grade E-Blotter Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`);

write('src/app/barangay/admin/layout.tsx', `
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
`);

write('src/app/police/admin/layout.tsx', `
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
`);

console.log('Built UI layouts and globals.');
