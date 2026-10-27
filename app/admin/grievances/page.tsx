"use client";

import { useState, useEffect } from "react";

export default function AdminGrievances() {
  const [grievances, setGrievances] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/grievances")
      .then((res) => res.json())
      .then((data) => setGrievances(data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-serif text-primary mb-2">Grievance Tickets</h1>
      <p className="text-muted mb-8">Track and resolve customer complaints.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Ticket ID</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {grievances.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No grievances found.</td>
              </tr>
            ) : (
              grievances.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-primary">{g.ticketId}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(g.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-6 py-4 font-medium text-ink">{g.name}</td>
                  <td className="px-6 py-4 text-gray-600">{g.category}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {g.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}