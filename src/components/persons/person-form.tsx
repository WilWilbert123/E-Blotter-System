'use client';
import React, { useState } from 'react';
import { Card, CardContent, Input, Select, Button, Textarea } from '@/components/ui';

export function PersonForm() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };
  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Input label="First Name" required />
            <Input label="Middle Name" />
            <Input label="Last Name" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Sex" options={[{label: 'Male', value:'M'}, {label: 'Female', value:'F'}]} required />
            <Input label="Date of Birth" type="date" required />
          </div>
          <Textarea label="Contact Information & Address" rows={3} required />
          <div className="flex justify-end">
            <Button type="submit" isLoading={loading}>Save Person Profile</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
