'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blotterSchema, BlotterInput } from '@/features/blotter/schemas';
import { createBlotter } from '@/features/blotter/actions';

export function BlotterForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BlotterInput>({
    resolver: zodResolver(blotterSchema)
  });

  const onSubmit = async (data: BlotterInput) => {
    setLoading(true);
    setMessage('');
    const res = await createBlotter(data);
    if (res?.error) {
      setMessage(`Error: ${res.error}`);
    } else {
      setMessage('Blotter case recorded successfully.');
      reset();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl bg-white p-6 rounded shadow">
      {message && <div className="p-3 bg-blue-50 text-blue-700 rounded text-sm">{message}</div>}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Case Number</label>
          <input {...register('case_number')} className="w-full border rounded p-2" />
          {errors.case_number && <span className="text-red-500 text-xs">{errors.case_number.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Incident Type</label>
          <select {...register('incident_type')} className="w-full border rounded p-2 bg-white">
            <option value="">Select Type</option>
            <option value="THEFT">Theft</option>
            <option value="PHYSICAL_INJURY">Physical Injury</option>
            <option value="THREATS">Threats</option>
            <option value="TRESPASSING">Trespassing</option>
            <option value="MALICIOUS_MISCHIEF">Malicious Mischief</option>
            <option value="SLANDER">Slander</option>
            <option value="DOMESTIC_VIOLENCE">Domestic Violence</option>
            <option value="PROPERTY_DISPUTE">Property Dispute</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.incident_type && <span className="text-red-500 text-xs">{errors.incident_type.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Incident Date & Time</label>
          <input type="datetime-local" {...register('incident_date')} className="w-full border rounded p-2" />
          {errors.incident_date && <span className="text-red-500 text-xs">{errors.incident_date.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input {...register('location')} className="w-full border rounded p-2" />
          {errors.location && <span className="text-red-500 text-xs">{errors.location.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Narrative (Detailed Report)</label>
        <textarea {...register('narrative')} className="w-full border rounded p-2" rows={6}></textarea>
        {errors.narrative && <span className="text-red-500 text-xs">{errors.narrative.message}</span>}
      </div>

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Filing...' : 'File Blotter Record'}
      </button>
    </form>
  );
}\n