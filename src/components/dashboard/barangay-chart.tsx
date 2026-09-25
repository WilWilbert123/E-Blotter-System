import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui';

export function BarangayChart() {
  return (
    <Card>
      <CardHeader title="Barangay Chart" />
      <CardContent>
        <div className="h-48 w-full bg-gray-50 flex items-center justify-center border border-dashed border-gray-200 rounded text-sm text-gray-500">
          Data Visualization Area
        </div>
      </CardContent>
    </Card>
  );
}
