'use client';

import React, { useState } from 'react';
import { requestRecovery } from '@/features/recovery/actions';

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await requestRecovery(username, reason);
    if (res?.error) {
      setMessage(`Error: ${res.error}`);
    } else {
      setMessage('Recovery request submitted. An admin will review it.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold text-center">Account Recovery</h3>
      <p className="text-sm text-gray-500 text-center">Submit a request to the Super Admin to recover your account.</p>
      
      {message && <div className="text-blue-600 bg-blue-50 p-2 rounded text-sm text-center">{message}</div>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full border rounded-md shadow-sm p-2 border-gray-300"
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Reason for Recovery</label>
        <textarea 
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-1 block w-full border rounded-md shadow-sm p-2 border-gray-300"
          rows={3}
          required 
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>

      <div className="text-center text-sm">
        <a href="/barangay/admin/login" className="font-medium text-blue-600 hover:text-blue-500">Back to Login</a>
      </div>
    </form>
  );
}
