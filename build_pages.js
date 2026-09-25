const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\\n');
};

write('src/components/ui/button.tsx', `
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
`);

write('src/app/barangay/admin/dashboard/page.tsx', `
import { getCurrentUser } from '@/lib/database/auth-queries';
import { getDb } from '@/lib/database';
import { redirect } from 'next/navigation';
import { StatCard } from '@/components/dashboard/stat-card';

export default async function BarangayDashboardPage() {
  const user = await getCurrentUser();
  if (!user || !user.barangayId) redirect('/barangay/admin/login');

  const db = getDb();
  
  // Example real queries for the dashboard
  const [{ count: activeCases }, { count: totalCases }] = await Promise.all([
    db.from('blotter_cases').select('*', { count: 'exact', head: true }).eq('barangay_id', user.barangayId).eq('status', 'ACTIVE'),
    db.from('blotter_cases').select('*', { count: 'exact', head: true }).eq('barangay_id', user.barangayId)
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Barangay {user.barangayId} Dashboard</h1>
      <p className="text-gray-500">Welcome back, {user.firstName} {user.lastName}</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-white rounded shadow">
           <h3 className="text-sm font-medium text-gray-500">Total Cases</h3>
           <p className="text-2xl font-bold">{totalCases ?? 0}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
           <h3 className="text-sm font-medium text-gray-500">Active Cases</h3>
           <p className="text-2xl font-bold">{activeCases ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
`);

write('src/app/police/admin/dashboard/page.tsx', `
import { getCurrentUser } from '@/lib/database/auth-queries';
import { getDb } from '@/lib/database';
import { redirect } from 'next/navigation';

export default async function PoliceDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/police/admin/login');

  const db = getDb();
  
  const [{ count: activeCases }, { count: totalCases }, { count: barangayCount }] = await Promise.all([
    db.from('blotter_cases').select('*', { count: 'exact', head: true }).eq('status', 'ACTIVE'),
    db.from('blotter_cases').select('*', { count: 'exact', head: true }),
    db.from('barangays').select('*', { count: 'exact', head: true })
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Police HQ Dashboard</h1>
      <p className="text-gray-500">Welcome back, {user.firstName} {user.lastName} (Super Admin)</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-white rounded shadow">
           <h3 className="text-sm font-medium text-gray-500">Total System Cases</h3>
           <p className="text-2xl font-bold">{totalCases ?? 0}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
           <h3 className="text-sm font-medium text-gray-500">System Active Cases</h3>
           <p className="text-2xl font-bold">{activeCases ?? 0}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
           <h3 className="text-sm font-medium text-gray-500">Registered Barangays</h3>
           <p className="text-2xl font-bold">{barangayCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
`);

console.log('Built real React Pages for Dashboards and basic UI components.');
