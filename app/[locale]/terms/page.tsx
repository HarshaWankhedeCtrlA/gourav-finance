import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif text-primary mb-6">Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: 01 April 2026</p>

        <div className="prose prose-sm md:prose-base text-gray-600 max-w-none space-y-6">
          <p>
            Welcome to the website of Gourav Finance Private Limited. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="text-xl font-semibold text-primary pt-4">1. No Offer or Commitment</h2>
          <p>
            The information provided on this website does not constitute an offer or commitment to provide any loan or financial service. All loan applications are subject to our credit assessment and approval processes.
          </p>

          <h2 className="text-xl font-semibold text-primary pt-4">2. Accuracy of Information</h2>
          <p>
            While we strive to keep the information on this site accurate and up to date, Gourav Finance makes no warranties or representations of any kind regarding the completeness or accuracy of the content. The EMI calculator results are indicative only and actual figures will be provided in your Key Fact Statement.
          </p>

          <h2 className="text-xl font-semibold text-primary pt-4">3. Intellectual Property</h2>
          <p>
            All content, logos, and materials on this website are the property of Gourav Finance Private Limited and are protected by applicable copyright and trademark laws.
          </p>

          <h2 className="text-xl font-semibold text-primary pt-4">4. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Rohtak, Haryana.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}