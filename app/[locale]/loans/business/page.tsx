import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export default function BusinessLoanPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-primary text-white py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Business Loans</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl">
              Loan Against Property (LAP) designed to help MSMEs expand, manage working capital, or consolidate debt.
            </p>
          </div>
        </section>
        
        <section className="py-16 container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif text-primary mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-600">
              <li>✅ Loan amounts from ₹5 Lakhs to ₹50 Lakhs</li>
              <li>✅ Competitive interest rates starting from 12% p.a.</li>
              <li>✅ Flexible tenure up to 10 years</li>
              <li>✅ Secured against residential or commercial property</li>
              <li>✅ Doorstep service in Rohtak and surrounding areas</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-serif text-primary mb-4">Eligibility & Documents</h2>
            <p className="text-sm text-gray-500 mb-2">KYC Documents: Aadhaar, PAN, Photographs</p>
            <p className="text-sm text-gray-500 mb-2">Property Documents: Title deed, chain of documents</p>
            <p className="text-sm text-gray-500 mb-6">Income Documents: ITR of last 2 years, bank statements of last 6 months</p>
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 w-full">Apply Now</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}