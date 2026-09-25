'use client';
import React from 'react';
import { Card, CardHeader, CardContent, Input, Button } from '@/components/ui';

export default function PersonsNewPage() {
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); };
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader title="Manage PersonsNew" />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
             <Input label="Configuration" />
             <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
