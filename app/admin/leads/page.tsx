"use client";

import { useState, useEffect } from "react";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading leads...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif text-primary mb-2">Customer Leads</h1>
      <p className="text-muted mb-8">Manage and track all incoming loan applications.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Ref Number</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Mobile</th>
                <th className="px-6 py-4 font-semibold">Loan Type</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No leads found. Try submitting one from the public form!
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-primary">{lead.refNumber}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4 font-medium text-ink">{lead.name}</td>
                    <td className="px-6 py-4 text-gray-600">{lead.mobile}</td>
                    <td className="px-6 py-4 capitalize text-gray-600">{lead.loanType}</td>
                    <td className="px-6 py-4 text-gray-600">
                      ₹{lead.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}