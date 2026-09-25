const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\n');
};

// ==========================================
// DOMAIN COMPONENTS - BARANGAYS
// ==========================================
write('src/components/barangays/barangay-branding-form.tsx', `
'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Input, Button, Textarea } from '@/components/ui';

export function BarangayBrandingForm() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };
  return (
    <Card>
      <CardHeader title="Barangay Branding Settings" description="Update the official logo, header, and contact details for documents." />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Official Display Name" defaultValue="Barangay San Juan (Poblacion)" />
          <Input label="Captain Name" defaultValue="Hon. Juan Dela Cruz" />
          <Input label="Contact Details" defaultValue="(056) 123-4567" />
          <Textarea label="Office Address" defaultValue="Barangay Hall, San Juan, Irosin" rows={3} />
          <Button type="submit" isLoading={loading}>Save Branding</Button>
        </form>
      </CardContent>
    </Card>
  );
}
`);

// ==========================================
// DOMAIN COMPONENTS - PERSONS
// ==========================================
write('src/components/persons/person-form.tsx', `
'use client';
import React, { useState } from 'react';
import { Card, CardContent, Input, Select, Button, Textarea } from '@/components/ui';

export function PersonForm() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };
  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Input label="First Name" required />
            <Input label="Middle Name" />
            <Input label="Last Name" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Sex" options={[{label: 'Male', value:'M'}, {label: 'Female', value:'F'}]} required />
            <Input label="Date of Birth" type="date" required />
          </div>
          <Textarea label="Contact Information & Address" rows={3} required />
          <div className="flex justify-end">
            <Button type="submit" isLoading={loading}>Save Person Profile</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
`);

write('src/components/persons/person-profile.tsx', `
import React from 'react';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui';

export function PersonProfile({ id }: { id?: string }) {
  return (
    <Card>
      <CardHeader title="Person Profile" action={<Badge variant="success">Active Resident</Badge>} />
      <CardContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900">Juan D. Cruz</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
            <dd className="mt-1 text-sm text-gray-900">Jan 1, 1980</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Sex</dt>
            <dd className="mt-1 text-sm text-gray-900">Male</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
`);

// ==========================================
// DOMAIN COMPONENTS - TRANSFERS
// ==========================================
write('src/components/transfers/transfer-form.tsx', `
'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Select, Textarea, Button } from '@/components/ui';

export function TransferForm() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };
  return (
    <Card>
      <CardHeader title="Request Record Transfer" description="Request permission from another barangay to view a resident's prior blotter cases." />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select label="Target Barangay" options={[{label:'San Juan', value:'1'}, {label:'San Pedro', value:'2'}]} required />
          <Textarea label="Reason for Transfer Request" rows={4} required placeholder="State the official police/barangay business reason..." />
          <Button type="submit" isLoading={loading}>Submit Request</Button>
        </form>
      </CardContent>
    </Card>
  );
}
`);

// ==========================================
// DOMAIN COMPONENTS - RECOVERY
// ==========================================
write('src/components/recovery/recovery-request-table.tsx', `
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Button } from '@/components/ui';

export function RecoveryRequestTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>jdelacruz</TableCell>
          <TableCell>Forgot password, locked out.</TableCell>
          <TableCell><Badge variant="warning">Pending</Badge></TableCell>
          <TableCell>Oct 26, 2024</TableCell>
          <TableCell><Button size="sm">Review</Button></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
`);

// ==========================================
// DOMAIN COMPONENTS - REPORTS
// ==========================================
write('src/components/reports/report-filter.tsx', `
'use client';
import React from 'react';
import { Card, CardContent, Input, Select, Button } from '@/components/ui';

export function ReportFilter() {
  return (
    <Card className="mb-6">
      <CardContent className="py-4">
        <div className="flex gap-4 items-end">
          <Input type="date" label="Start Date" className="max-w-[200px]" />
          <Input type="date" label="End Date" className="max-w-[200px]" />
          <Select label="Status" options={[{label:'All', value:'ALL'}, {label:'Pending', value:'PENDING'}]} className="max-w-[200px]" />
          <Button variant="outline">Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
}
`);

// ==========================================
// DOMAIN COMPONENTS - SECURITY
// ==========================================
write('src/components/security/login-history-table.tsx', `
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from '@/components/ui';

export function LoginHistoryTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>IP Address</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>2024-10-26 10:30 AM</TableCell>
          <TableCell>192.168.1.100</TableCell>
          <TableCell><Badge variant="success">Success</Badge></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
`);

// Fix empty barrels one more time to export everything
write('src/components/ui/index.ts', `
export * from './button';
export * from './input';
export * from './card';
export * from './table';
export * from './badge';
export * from './textarea';
export * from './select';
export * from './modal';
export * from './skeleton';
export * from './alert';
`);

console.log('Built domain components.');
