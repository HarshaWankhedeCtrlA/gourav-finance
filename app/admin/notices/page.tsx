"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminNotices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [isAdding, setIsAdding] = useState(false);

  const fetchNotices = () => {
    fetch("/api/admin/notices").then(res => res.json()).then(data => setNotices(data));
  };
  useEffect(() => { fetchNotices(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setIsAdding(false);
    setForm({ title: "", content: "" });
    fetchNotices();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-primary mb-2">Notices</h1>
          <p className="text-muted">Publish announcements and updates.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary">
          {isAdding ? "Cancel" : "+ Add Notice"}
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Notice Title</Label><Input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
            <div><Label>Notice Content</Label><textarea required rows={3} className="w-full border rounded-md p-2 text-sm" value={form.content} onChange={e => setForm({...form, content: e.target.value})} /></div>
            <Button type="submit" className="w-full bg-success">Publish Notice</Button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Notice Title</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {notices.map(n => (
              <tr key={n.id}>
                <td className="px-6 py-4 font-medium">{n.title}</td>
                <td className="px-6 py-4 text-gray-500">{new Date(n.createdAt).toLocaleDateString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}