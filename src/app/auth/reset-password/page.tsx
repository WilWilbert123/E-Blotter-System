'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
       setLoading(false);
       router.push('/barangay/admin/login'); 
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold text-center">Reset Password</h3>
      <p className="text-sm text-gray-500 text-center">Enter your new secure password.</p>
      
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

      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save New Password'}
      </button>
    </form>
  );
}
