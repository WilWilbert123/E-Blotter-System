'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Input, Button } from '@/components/ui';

export function IncidentForm() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 500); };
  return (
    <Card>
      <CardHeader title="Incident Form" />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Search/Input Field" required />
          <Button type="submit" isLoading={loading}>Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
