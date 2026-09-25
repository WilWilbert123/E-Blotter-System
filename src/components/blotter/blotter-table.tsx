'use client';
import React from 'react';

type BlotterCase = {
  id: string;
  case_number: string;
  incident_type: string;
  status: string;
  incident_date: string;
  location: string;
};

export function BlotterTable({ cases }: { cases: BlotterCase[] }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Case No.</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Type</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
            <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases?.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-sm font-medium">{c.case_number}</td>
              <td className="p-4 text-sm text-gray-600">{c.incident_type}</td>
              <td className="p-4 text-sm">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {c.status}
                </span>
              </td>
              <td className="p-4 text-sm text-gray-600">{new Date(c.incident_date).toLocaleDateString()}</td>
              <td className="p-4 text-sm text-right">
                <a href={`/barangay/admin/blotter/${c.id}`} className="text-blue-600 hover:underline">View Case</a>
              </td>
            </tr>
          ))}
          {(!cases || cases.length === 0) && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">No blotter records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
