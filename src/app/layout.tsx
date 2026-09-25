import './globals.css';
import React from 'react';

export const metadata = {
  title: 'E-Blotter System',
  description: 'Production-grade E-Blotter Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}\n