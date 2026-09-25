'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setError('');
    
    // Call our server action or supabase client to update password here
    // Example placeholder logic since we don't have the exact server action in this file
    setTimeout(() => {
       setLoading(false);
       // On success, redirect to dashboard
       router.push('/barangay/admin/dashboard'); 
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold text-center">Change Required Password</h3>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border rounded-md shadow-sm p-2 border-gray-300"
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input 
          type="password" 
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mt-1 block w-full border rounded-md shadow-sm p-2 border-gray-300"
          required 
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  );
}
