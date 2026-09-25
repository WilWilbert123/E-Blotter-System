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
