"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminCareers() {
  const [careers, setCareers] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", location: "", type: "Full Time", description: "" });
  const [isAdding, setIsAdding] = useState(false);

  const fetchCareers = () => {
    fetch("/api/admin/careers").then(res => res.json()).then(data => setCareers(data));
  };
  useEffect(() => { fetchCareers(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/careers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setIsAdding(false);
    setForm({ title: "", location: "", type: "Full Time", description: "" });
    fetchCareers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-primary mb-2">Careers</h1>
          <p className="text-muted">Manage job openings on the public site.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary">
          {isAdding ? "Cancel" : "+ Add Job"}
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Job Title</Label><Input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
            <div><Label>Location</Label><Input required value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
            <div>
              <Label>Employment Type</Label>
              <select className="w-full h-10 px-3 border rounded-md mt-1" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div><Label>Description</Label><Input required value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
            <Button type="submit" className="w-full bg-success">Save Job</Button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {careers.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No jobs posted yet.</td></tr>
            ) : (
              careers.map(c => (
                <tr key={c.id}>
                  <td className="px-6 py-4 font-medium">{c.title}</td>
                  <td className="px-6 py-4 text-gray-600">{c.location}</td>
                  <td className="px-6 py-4 text-gray-600">{c.type}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}