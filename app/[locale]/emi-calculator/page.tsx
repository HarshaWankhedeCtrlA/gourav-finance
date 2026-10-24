import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EmiCalculator from '@/components/emi-calculator';

export default function EmiCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-primary mb-4">EMI Calculator</h1>
          <p className="text-lg text-muted max-w-2xl">
            Plan your loan repayment with our easy-to-use EMI calculator. Adjust the loan amount, interest rate, and tenure to see your monthly installments instantly.
          </p>
        </div>
        
        <EmiCalculator />
        
      </main>
      <Footer />
    </div>
  );
}