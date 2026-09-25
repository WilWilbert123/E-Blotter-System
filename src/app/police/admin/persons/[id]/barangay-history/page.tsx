import React from 'react';
import { Card, CardHeader, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';

export default function IdBarangayHistoryPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">IdBarangayHistory Dashboard</h1>
      <Card>
        <CardHeader title="Records" />
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Details</TableHead></TableRow></TableHeader>
            <TableBody><TableRow><TableCell>1001</TableCell><TableCell>Record details</TableCell></TableRow></TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
