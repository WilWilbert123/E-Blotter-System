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
