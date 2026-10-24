import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

export default function GrievancePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif text-primary mb-6">Grievance Redressal</h1>
        <p className="text-gray-600 mb-8">At Gourav Finance, we are committed to resolving your concerns promptly and fairly.</p>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-2">Level 1: Customer Care</h2>
            <p className="text-gray-600">Call us at <strong>+91 12345 67890</strong> or email <strong>care@gouravfinance.com</strong> (10 AM to 6 PM, Mon-Sat).</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-2">Level 2: Grievance Redressal Officer (GRO)</h2>
            <p className="text-gray-600 mb-2">If your issue is not resolved within 7 days, contact:</p>
            <p className="text-sm text-gray-600"><strong>Name:</strong> Mr. Rajesh Kumar</p>
            <p className="text-sm text-gray-600"><strong>Email:</strong> gro@gouravfinance.com</p>
            <p className="text-sm text-gray-600"><strong>Phone:</strong> +91 98765 43210</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-2">Level 3: RBI Ombudsman</h2>
            <p className="text-gray-600 mb-4">If your complaint remains unresolved within 30 days, you may escalate to the RBI Integrated Ombudsman Scheme, 2021:</p>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li><strong>Portal:</strong> <a href="https://cms.rbi.org.in" target="_blank" rel="noreferrer" className="text-primary underline">cms.rbi.org.in</a></li>
              <li><strong>Toll-Free:</strong> 14448</li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">Have a new complaint? Track your existing ticket.</p>
            <Button className="bg-primary hover:bg-primary/90">File a Complaint</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}