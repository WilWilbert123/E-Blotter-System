import React from 'react';

export function Toast({ children, className = '' }: { children?: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>;
}
