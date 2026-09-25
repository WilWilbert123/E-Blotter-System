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
