'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { barangaySchema, BarangayInput } from '@/features/barangays/schemas';
import { createBarangay } from '@/features/barangays/actions';

export function BarangayForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BarangayInput>({
    resolver: zodResolver(barangaySchema)
  });

  const onSubmit = async (data: BarangayInput) => {
    setLoading(true);
    setMessage('');
    const res = await createBarangay(data);
    if (res?.error) {
      setMessage(`Error: ${res.error}`);
    } else {
      setMessage('Barangay created successfully.');
      reset();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg bg-white p-6 rounded shadow">
      {message && <div className="p-3 bg-blue-50 text-blue-700 rounded text-sm">{message}</div>}
      
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input {...register('name')} className="w-full border rounded p-2" placeholder="e.g. Monbon" />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Official Display Name</label>
        <input {...register('official_display_name')} className="w-full border rounded p-2" placeholder="e.g. Barangay Monbon" />
        {errors.official_display_name && <span className="text-red-500 text-xs">{errors.official_display_name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Captain Name (Optional)</label>
        <input {...register('captain_name')} className="w-full border rounded p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Address (Optional)</label>
        <textarea {...register('address')} className="w-full border rounded p-2" rows={3}></textarea>
      </div>

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Saving...' : 'Save Barangay'}
      </button>
    </form>
  );
}\n