import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">E-Blotter System</h2>
          <p className="mt-2 text-sm text-gray-600">Secure Authentication Portal</p>
        </div>
        {children}
      </div>
    </div>
  );
}\n