'use client';
import React from 'react';

type Person = {
  id: string;
  first_name: string;
  last_name: string;
  sex: string;
  contact_information: string;
};

export function PersonTable({ persons }: { persons: Person[] }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Sex</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Contact</th>
            <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons?.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-sm font-medium">{p.first_name} {p.last_name}</td>
              <td className="p-4 text-sm text-gray-600">{p.sex || '-'}</td>
              <td className="p-4 text-sm text-gray-600">{p.contact_information || '-'}</td>
              <td className="p-4 text-sm text-right">
                <a href={`/barangay/admin/persons/${p.id}`} className="text-blue-600 hover:underline">View Profile</a>
              </td>
            </tr>
          ))}
          {(!persons || persons.length === 0) && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">No persons registered.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
