import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from '@/components/ui';

export function PersonHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>#1001</TableCell>
          <TableCell><Badge variant="success">Active</Badge></TableCell>
          <TableCell>{new Date().toLocaleDateString()}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
