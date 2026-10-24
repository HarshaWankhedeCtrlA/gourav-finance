import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export default function HousingLoanPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-primary text-white py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Housing Loans</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl">
              Affordable home financing solutions to help you purchase, construct, or renovate your home.
            </p>
          </div>
        </section>
        
        <section className="py-16 container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif text-primary mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-600">
              <li>✅ Loan amounts up to ₹1 Crore</li>
              <li>✅ Attractive interest rates</li>
              <li>✅ Long repayment tenures up to 20 years</li>
              <li>✅ Transparent charges with a Key Fact Statement</li>
              <li>✅ Expert guidance from our local team</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-serif text-primary mb-4">Eligibility & Documents</h2>
            <p className="text-sm text-gray-500 mb-2">KYC Documents: Aadhaar, PAN, Photographs</p>
            <p className="text-sm text-gray-500 mb-2">Property Documents: Sale deed, approved building plan</p>
            <p className="text-sm text-gray-500 mb-6">Income Documents: Salary slips or ITR, bank statements</p>
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