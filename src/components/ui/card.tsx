import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>{children}</div>;
}

export function CardHeader({ title, description, action }: { title: string, description?: string, action?: React.ReactNode }) {
  return (
    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
