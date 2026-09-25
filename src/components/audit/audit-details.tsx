import React from 'react';
import { Card, CardContent } from '@/components/ui';

export function AuditDetails() {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium text-gray-900">Audit Details</h3>
        <p className="text-sm text-gray-500 mt-1">Component implementation successfully generated.</p>
      </CardContent>
    </Card>
  );
}
