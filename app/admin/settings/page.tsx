"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EmiSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch current settings from DB
    fetch("/api/emi-settings?product=business")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

    const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const res = await fetch("/api/admin/emi-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save");

      alert("✅ Settings actually saved to the database!");
    } catch (error) {
      alert("❌ Error saving settings. Make sure you are logged in as an admin.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif text-primary mb-2">EMI Calculator Settings</h1>
      <p className="text-muted mb-8">Control the limits and defaults for the public Business Loan calculator.</p>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Amount (₹)</Label>
              <Input 
                type="number" 
                value={settings.minAmount} 
                onChange={(e) => setSettings({...settings, minAmount: Number(e.target.value)})} 
              />
            </div>
            <div className="space-y-2">
              <Label>Max Amount (₹)</Label>
              <Input 
                type="number" 
                value={settings.maxAmount} 
                onChange={(e) => setSettings({...settings, maxAmount: Number(e.target.value)})} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Rate (%)</Label>
              <Input 
                type="number" 
                step="0.25"
                value={settings.minRate} 
                onChange={(e) => setSettings({...settings, minRate: Number(e.target.value)})} 
              />
            </div>
            <div className="space-y-2">
              <Label>Max Rate (%)</Label>
              <Input 
                type="number" 
                step="0.25"
                value={settings.maxRate} 
                onChange={(e) => setSettings({...settings, maxRate: Number(e.target.value)})} 
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      </div>
    </div>
  );
}