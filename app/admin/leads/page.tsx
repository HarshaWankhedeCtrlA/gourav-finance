"use client";

import { useState, useEffect } from "react";
import { Download, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const fetchLeads = () => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdate = async (id: string) => {
    await fetch("/api/admin/leads", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: editStatus, notes: editNotes }),
    });
    setEditingId(null);
    fetchLeads();
  };

  const exportCSV = () => {
    const headers = ["Ref Number", "Date", "Name", "Mobile", "Loan Type", "Amount", "Status"];
    const csvData = leads.map(l => [l.refNumber, new Date(l.createdAt).toLocaleDateString(), l.name, l.mobile, l.loanType, l.amount, l.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...csvData.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "gourav_finance_leads.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (loading) return <div className="p-8">Loading leads...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-primary mb-2">Customer Leads</h1>
          <p className="text-muted">Manage and track all incoming loan applications.</p>
        </div>
        <Button onClick={exportCSV} variant="outline" className="border-primary text-primary">
          <Download size={16} className="mr-2" /> Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[900px]">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Ref / Date</th>
              <th className="px-6 py-4 font-semibold">Applicant</th>
              <th className="px-6 py-4 font-semibold">Loan Details</th>
              <th className="px-6 py-4 font-semibold">Status Pipeline</th>
              <th className="px-6 py-4 font-semibold">Staff Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No leads found. Try submitting one from the public form!
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 align-top">
                  <td className="px-6 py-4">
                    <div className="font-medium text-primary">{lead.refNumber}</div>
                    <div className="text-xs text-gray-400">{new Date(lead.createdAt).toLocaleDateString("en-IN")}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-ink">{lead.name}</div>
                    <div className="text-xs text-gray-500">{lead.mobile}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="capitalize text-gray-700">{lead.loanType}</div>
                    <div className="font-semibold text-gray-800">₹{lead.amount.toLocaleString("en-IN")}</div>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === lead.id ? (
                      <select 
                        value={editStatus} 
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="border rounded p-1 text-xs w-full"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        lead.status === "NEW" ? "bg-blue-100 text-blue-800" :
                        lead.status === "CONTACTED" ? "bg-yellow-100 text-yellow-800" :
                        lead.status === "APPROVED" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {lead.status.replace("_", " ")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === lead.id ? (
                      <div className="flex flex-col gap-2">
                        <textarea 
                          value={editNotes} 
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="border rounded p-2 text-xs w-full" 
                          rows={2}
                          placeholder="Add notes..."
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleUpdate(lead.id)} className="bg-success h-7 text-xs">Save</Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="h-7 text-xs">Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-600 line-clamp-2">{lead.notes || "No notes added."}</p>
                        <button 
                          onClick={() => { setEditingId(lead.id); setEditStatus(lead.status); setEditNotes(lead.notes || ""); }}
                          className="text-primary text-xs flex items-center gap-1 hover:underline w-fit"
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                      </div>
                    )}
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