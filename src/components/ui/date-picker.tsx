import React from 'react';

export function DatePicker({ children, className = '' }: { children?: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>;
}
