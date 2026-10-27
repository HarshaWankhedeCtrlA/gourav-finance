"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({ email: "", password: "", role: "VIEWER" });
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchUsers = () => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setIsAdding(false);
        setFormData({ email: "", password: "", role: "VIEWER" });
        fetchUsers();
        alert("✅ User created successfully!");
      } else {
        alert("❌ " + (data.error || "Failed to create user"));
      }
    } catch (error) {
      alert("❌ Error connecting to server");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-primary mb-2">Users & Roles</h1>
          <p className="text-muted">Manage staff access to the admin panel.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary">
          {isAdding ? "Cancel" : "+ Add User"}
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8 max-w-xl">
          <h2 className="text-xl font-semibold mb-4 text-ink">Add New Staff Member</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input 
                required 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                placeholder="staff@gouravfinance.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input 
                required 
                type="password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                placeholder="Minimum 6 characters"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <select 
                className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.role} 
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="SUPER_ADMIN">Super Admin (Full Access)</option>
                <option value="EDITOR">Editor (Content)</option>
                <option value="SALES">Sales (Leads)</option>
                <option value="COMPLIANCE">Compliance (Policies)</option>
                <option value="GRIEVANCE_OFFICER">Grievance Officer</option>
                <option value="VIEWER">Viewer (Read Only)</option>
              </select>
            </div>
            <Button type="submit" disabled={saving} className="w-full bg-success">
              {saving ? "Creating..." : "Create User"}
            </Button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Email Address</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-ink">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      user.role === "SUPER_ADMIN" ? "bg-red-100 text-red-800" :
                      user.role === "EDITOR" ? "bg-purple-100 text-purple-800" :
                      user.role === "SALES" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {user.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("en-IN")}
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