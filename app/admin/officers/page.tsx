"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminOfficersPage() {
  const [formData, setFormData] = useState({
    grievanceOfficerName: "",
    grievanceOfficerEmail: "",
    grievanceOfficerPhone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/officers")
      .then((res) => res.json())
      .then((data) => {
        if (data) setFormData(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/admin/officers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("✅ Officer details updated! They will now reflect site-wide.");
    } catch (error) {
      alert("❌ Error saving settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-serif text-primary mb-2">Officers & Contacts</h1>
      <p className="text-muted mb-8">Update these details once, and they will reflect in the Footer and Grievance pages across the entire website.</p>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <Label>Grievance Redressal Officer Name</Label>
            <Input 
              required 
              value={formData.grievanceOfficerName} 
              onChange={(e) => setFormData({...formData, grievanceOfficerName: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <Label>Officer Email</Label>
            <Input 
              required 
              type="email" 
              value={formData.grievanceOfficerEmail} 
              onChange={(e) => setFormData({...formData, grievanceOfficerEmail: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <Label>Officer Phone</Label>
            <Input 
              required 
              value={formData.grievanceOfficerPhone} 
              onChange={(e) => setFormData({...formData, grievanceOfficerPhone: e.target.value})} 
            />
          </div>
          <Button type="submit" disabled={saving} className="w-full bg-primary">
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      </div>
    </div>
  );
}