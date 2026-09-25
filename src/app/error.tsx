'use client';

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto mt-10">
      <Card>
        <CardHeader title="Something went wrong!" />
        <CardContent>
          <p className="text-red-500 mb-4">{error?.message || 'An unexpected error occurred.'}</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try again
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

