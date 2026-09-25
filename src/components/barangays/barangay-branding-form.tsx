'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Input, Button, Textarea } from '@/components/ui';

export function BarangayBrandingForm() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };
  return (
    <Card>
      <CardHeader title="Barangay Branding Settings" description="Update the official logo, header, and contact details for documents." />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Official Display Name" defaultValue="Barangay San Juan (Poblacion)" />
          <Input label="Captain Name" defaultValue="Hon. Juan Dela Cruz" />
          <Input label="Contact Details" defaultValue="(056) 123-4567" />
          <Textarea label="Office Address" defaultValue="Barangay Hall, San Juan, Irosin" rows={3} />
          <Button type="submit" isLoading={loading}>Save Branding</Button>
        </form>
      </CardContent>
    </Card>
  );
}
