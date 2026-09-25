import React from 'react';

export function Tabs({ children, className = '' }: { children?: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>;
}
