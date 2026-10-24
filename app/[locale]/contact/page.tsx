"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    town: "",
    loanType: "business",
    amount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessRef(data.lead.refNumber);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Failed to connect to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-primary mb-4">Apply for a Loan</h1>
          <p className="text-lg text-muted">Fill out the form below and our Rohtak team will get in touch with you.</p>
        </div>

        {successRef ? (
          <div className="bg-green-50 border border-green-200 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-serif text-success mb-2">Application Received!</h2>
            <p className="text-gray-700 mb-4">Thank you, {formData.name}. Your application has been successfully submitted.</p>
            <div className="bg-white p-4 rounded-lg inline-block border border-green-100 mb-6">
              <p className="text-sm text-gray-500 mb-1">Your Reference Number</p>
              <p className="text-2xl font-bold text-primary tracking-wider">{successRef}</p>
            </div>
            <p className="text-sm text-gray-500">Our team will contact you shortly on {formData.mobile}.</p>
            <Button className="mt-6 w-full md:w-auto bg-primary" onClick={() => router.push("/en")}>
              Return to Home
            </Button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Rahul Sharma" />
                </div>
                <div className="space-y-2">
                  <Label>Mobile Number *</Label>
                  <Input required type="tel" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} placeholder="+91 9876543210" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Email (Optional)</Label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="rahul@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Town / City *</Label>
                  <Input required value={formData.town} onChange={(e) => setFormData({...formData, town: e.target.value})} placeholder="e.g. Rohtak" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Loan Type *</Label>
                  <select 
                    className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.loanType}
                    onChange={(e) => setFormData({...formData, loanType: e.target.value})}
                  >
                    <option value="business">Business Loan (LAP)</option>
                    <option value="housing">Housing Loan</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Loan Amount (₹) *</Label>
                  <Input required type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} placeholder="e.g. 1500000" />
                </div>
              </div>

              <div className="flex items-start gap-3 mt-4">
                <input type="checkbox" required className="mt-1" id="consent" />
                <Label htmlFor="consent" className="text-sm text-gray-600 font-normal leading-tight">
                  I consent to Gourav Finance contacting me via SMS, WhatsApp, or phone regarding my application. I agree to the Privacy Policy.
                </Label>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 py-6 text-lg mt-4">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}