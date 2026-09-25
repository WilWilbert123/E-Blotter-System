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
