"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminBranches() {
  const [branches, setBranches] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", address: "", phone: "", email: "", mapLink: "" });
  const [isAdding, setIsAdding] = useState(false);

  const fetchBranches = () => {
    fetch("/api/admin/branches").then(res => res.json()).then(data => setBranches(data));
  };
  useEffect(() => { fetchBranches(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/branches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setIsAdding(false);
    setForm({ name: "", address: "", phone: "", email: "", mapLink: "" });
    fetchBranches();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-primary mb-2">Branches</h1>
          <p className="text-muted">Manage the physical locations of Gourav Finance.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary">
          {isAdding ? "Cancel" : "+ Add Branch"}
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Branch Name</Label><Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
            <div><Label>Phone</Label><Input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
            <div className="md:col-span-2"><Label>Full Address</Label><Input required value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></div>
            <div><Label>Email (Optional)</Label><Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
            <div><Label>Google Maps Link</Label><Input value={form.mapLink} onChange={e => setForm({...form, mapLink: e.target.value})} /></div>
            <div className="md:col-span-2"><Button type="submit" className="w-full bg-success">Save Branch</Button></div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Branch Name</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Address</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {branches.map(b => (
              <tr key={b.id}>
                <td className="px-6 py-4 font-medium text-ink">{b.name}</td>
                <td className="px-6 py-4 text-gray-600">{b.phone}</td>
                <td className="px-6 py-4 text-gray-500">{b.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}