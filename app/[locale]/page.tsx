import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EmiCalculator from '@/components/emi-calculator';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#F7F5F0] py-20 px-4 border-b border-gray-200">
          <div className="container mx-auto max-w-5xl">
            <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-4">RBI-registered NBFC · Established 1996</p>
            <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6 leading-tight">
              Trusted finance <br className="hidden md:block"/> since 1996.
            </h1>
            <p className="text-lg text-muted max-w-2xl mb-8">
              Secured business and home loans for families and enterprises across Haryana. Clear terms, quick decisions, help at your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl">
                  Apply Now
                </Button>
              </Link>
              <Link href="/emi-calculator">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg rounded-xl">
                  Calculate EMI
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-primary mb-4">Our Loan Products</h2>
            <p className="text-muted">Financial solutions tailored for your needs.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-serif text-primary mb-3">Business Loans</h3>
              <p className="text-muted mb-6">Loan against property for MSMEs to expand your business.</p>
              <ul className="space-y-2 mb-8 text-sm text-ink">
                <li>• Up to ₹50 Lakhs</li>
                <li>• Flexible tenure up to 10 years</li>
                <li>• Quick processing in Rohtak</li>
              </ul>
              <Link href="/loans/business">
                <Button className="w-full bg-primary hover:bg-primary/90">Know More</Button>
              </Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-serif text-primary mb-3">Housing Loans</h3>
              <p className="text-muted mb-6">Turn your dream of owning a home into reality.</p>
              <ul className="space-y-2 mb-8 text-sm text-ink">
                <li>• Attractive interest rates</li>
                <li>• Tenure up to 20 years</li>
                <li>• Doorstep documentation</li>
              </ul>
              <Link href="/loans/housing">
                <Button className="w-full bg-primary hover:bg-primary/90">Know More</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* EMI Calculator Section */}
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif text-primary mb-4">Plan your Loan</h2>
              <p className="text-muted">Calculate your monthly EMI instantly.</p>
            </div>
            <EmiCalculator />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}