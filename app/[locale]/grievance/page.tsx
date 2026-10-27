"use client";

import { useState } from "react";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function GrievancePage() {
  const [formData, setFormData] = useState({
    name: "", mobile: "", email: "", category: "Loan Query", description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/grievances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setTicketId(data.grievance.ticketId);
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Failed to submit grievance.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif text-primary mb-6">Grievance Redressal</h1>
        <p className="text-gray-600 mb-8">At Gourav Finance, we are committed to resolving your concerns promptly and fairly.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Escalation Matrix */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-primary mb-2">Level 1: Customer Care</h2>
              <p className="text-gray-600 text-sm">Call us at <strong>+91 12345 67890</strong> or email <strong>care@gouravfinance.com</strong> (10 AM to 6 PM, Mon-Sat).</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-primary mb-2">Level 2: Grievance Officer</h2>
              <p className="text-gray-600 text-sm mb-2">If unresolved within 7 days, contact:</p>
              <p className="text-sm text-gray-600"><strong>Mr. Rajesh Kumar</strong></p>
              <p className="text-sm text-gray-600">gro@gouravfinance.com</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-primary mb-2">Level 3: RBI Ombudsman</h2>
              <p className="text-gray-600 text-sm">If unresolved within 30 days, escalate to RBI:</p>
              <ul className="text-sm text-gray-600 mt-2">
                <li>Portal: <a href="https://cms.rbi.org.in" target="_blank" rel="noreferrer" className="text-primary underline">cms.rbi.org.in</a></li>
                <li>Toll-Free: 14448</li>
              </ul>
            </div>
          </div>

          {/* Complaint Form */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
            <h2 className="text-xl font-semibold text-primary mb-4">File a Complaint</h2>
            
            {ticketId ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
                <h3 className="text-lg font-bold text-success mb-2">Complaint Registered!</h3>
                <p className="text-sm text-gray-600 mb-4">Your ticket number is:</p>
                <p className="text-2xl font-bold text-primary tracking-wider mb-4">{ticketId}</p>
                <Button onClick={() => setTicketId(null)} variant="outline" className="w-full">File Another Complaint</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <Label>Mobile Number *</Label>
                  <Input required type="tel" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
                </div>
                <div>
                  <Label>Email (Optional)</Label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <Label>Category *</Label>
                  <select className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option>Loan Query</option>
                    <option>Repayment Issue</option>
                    <option>Document Return</option>
                    <option>Staff Behaviour</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <Label>Description *</Label>
                  <textarea required className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-primary">
                  {isSubmitting ? "Submitting..." : "Submit Complaint"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}