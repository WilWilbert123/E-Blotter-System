const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\n');
};

// ==========================================
// UI PRIMITIVES
// ==========================================

write('src/components/ui/button.tsx', `
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({ variant = 'primary', size = 'md', isLoading, children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  };
  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  };

  return (
    <button className={\`\${baseStyles} \${variants[variant]} \${sizes[size]} \${className}\`} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <span className="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span> : null}
      {children}
    </button>
  );
}
`);

write('src/components/ui/input.tsx', `
import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        ref={ref}
        className={\`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 \${error ? 'border-red-500 focus:ring-red-500' : ''} \${className}\`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';
`);

write('src/components/ui/card.tsx', `
import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return <div className={\`bg-white rounded-lg shadow-sm border border-gray-200 \${className}\`}>{children}</div>;
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
  return <div className={\`p-6 \${className}\`}>{children}</div>;
}
`);

write('src/components/ui/table.tsx', `
import React from 'react';

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-50">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
}

export function TableRow({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return <tr className={\`hover:bg-gray-50 \${className}\`}>{children}</tr>;
}

export function TableHead({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return <th className={\`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider \${className}\`}>{children}</th>;
}

export function TableCell({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return <td className={\`px-6 py-4 whitespace-nowrap text-sm text-gray-900 \${className}\`}>{children}</td>;
}
`);

write('src/components/ui/badge.tsx', `
import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

export function Badge({ children, variant = 'default' }: { children: React.ReactNode, variant?: BadgeVariant }) {
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800'
  };
  return (
    <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium \${variants[variant]}\`}>
      {children}
    </span>
  );
}
`);

write('src/components/ui/textarea.tsx', `
import React, { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <textarea
        ref={ref}
        className={\`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 \${error ? 'border-red-500 focus:ring-red-500' : ''} \${className}\`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});
Textarea.displayName = 'Textarea';
`);

write('src/components/ui/select.tsx', `
import React, { forwardRef } from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, error, options, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <select
        ref={ref}
        className={\`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 \${error ? 'border-red-500 focus:ring-red-500' : ''} \${className}\`}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});
Select.displayName = 'Select';
`);

write('src/components/ui/modal.tsx', `
import React, { useEffect } from 'react';

export function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">&times;</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
`);

write('src/components/ui/skeleton.tsx', `
import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={\`animate-pulse bg-gray-200 rounded \${className}\`} />;
}
`);

write('src/components/ui/alert.tsx', `
import React from 'react';

export function Alert({ title, description, variant = 'info' }: { title: string, description?: string, variant?: 'info' | 'error' | 'success' | 'warning' }) {
  const variants = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
  };

  return (
    <div className={\`p-4 rounded-md border \${variants[variant]} mb-4\`}>
      <h4 className="text-sm font-medium">{title}</h4>
      {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
    </div>
  );
}
`);

console.log('Built core UI primitives.');
