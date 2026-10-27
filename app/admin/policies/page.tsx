"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminPolicies() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", pdfUrl: "" });
  const [isAdding, setIsAdding] = useState(false);

  const fetchPolicies = () => {
    fetch("/api/admin/policies")
      .then((res) => res.json())
      .then((data) => setPolicies(data));
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/policies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setIsAdding(false);
    setForm({ title: "", pdfUrl: "" });
    fetchPolicies();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-primary mb-2">Policies & Disclosures</h1>
          <p className="text-muted">Manage the regulatory documents shown on the public site.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary">
          {isAdding ? "Cancel" : "+ Add Policy"}
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-semibold mb-4 text-ink">Add New Document</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Document Title</Label>
              <Input 
                required 
                value={form.title} 
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
                placeholder="e.g. Fair Practices Code" 
              />
            </div>
            <div className="space-y-2">
              <Label>PDF URL (Google Drive, Dropbox, etc.)</Label>
              <Input 
                required 
                value={form.pdfUrl} 
                onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })} 
                placeholder="https://..." 
              />
            </div>
            <Button type="submit" className="w-full bg-success hover:bg-success/90">
              Save Policy
            </Button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Document Title</th>
              <th className="px-6 py-4 font-semibold">PDF Link</th>
              <th className="px-6 py-4 font-semibold">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {policies.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No documents added yet. Click "+ Add Policy" to upload one.
                </td>
              </tr>
            ) : (
              policies.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-ink">{p.title}</td>
                  <td className="px-6 py-4 text-primary underline truncate max-w-xs">
                    <a href={p.pdfUrl} target="_blank" rel="noreferrer">View PDF</a>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(p.updatedAt).toLocaleDateString("en-IN")}
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