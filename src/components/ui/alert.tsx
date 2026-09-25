import React from 'react';

export function Alert({ title, description, variant = 'info' }: { title: string, description?: string, variant?: 'info' | 'error' | 'success' | 'warning' }) {
  const variants = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
  };

  return (
    <div className={`p-4 rounded-md border ${variants[variant]} mb-4`}>
      <h4 className="text-sm font-medium">{title}</h4>
      {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
    </div>
  );
}
