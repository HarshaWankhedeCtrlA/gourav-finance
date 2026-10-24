"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [totalLeads, setTotalLeads] = useState<number | string>("...");

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        setTotalLeads(data.length || 0);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-serif text-primary mb-2">Dashboard</h1>
      <p className="text-muted mb-8">Welcome to the Gourav Finance admin panel.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Total Leads</h3>
          <p className="text-4xl font-bold text-primary">{totalLeads}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Active Grievances</h3>
          <p className="text-4xl font-bold text-accent">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-600 mb-2">System Status</h3>
          <p className="text-4xl font-bold text-success">Online</p>
        </div>
      </div>
    </div>
  );
}