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
