import { notFound } from "next/navigation";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EmiCalculator from '@/components/emi-calculator';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function DynamicLoanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Fetch the product from the Neon Database
  const product = await prisma.product.findUnique({
    where: { slug }
  });

  // If the product doesn't exist, show 404
  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">{product.name}</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl">{product.description}</p>
          </div>
        </section>
        
        {/* Details Section */}
        <section className="py-16 container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif text-primary mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-600">
              <li>✅ Loan amounts from ₹{product.minAmount.toLocaleString('en-IN')} to ₹{product.maxAmount.toLocaleString('en-IN')}</li>
              <li>✅ Interest rates starting from {product.interestRate}% p.a.</li>
              <li>✅ Flexible tenure from {product.minTenure} to {product.maxTenure} months</li>
              <li>✅ Transparent charges with a Key Fact Statement</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-serif text-primary mb-4">Apply Now</h2>
            <p className="text-sm text-gray-500 mb-6">Get in touch with our Rohtak team to start your application.</p>
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 w-full">Apply for {product.name}</Button>
            </Link>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 bg-gray-50 border-t">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-serif text-primary mb-8 text-center">Calculate your EMI</h2>
            <EmiCalculator defaultProduct="business" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}