import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif text-primary mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: 01 April 2026</p>

        <div className="prose prose-sm md:prose-base text-gray-600 max-w-none space-y-6">
          <p>
            At Gourav Finance Private Limited, we respect your privacy and are committed to protecting your personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act).
          </p>

          <h2 className="text-xl font-semibold text-primary pt-4">1. Information We Collect</h2>
          <p>
            We collect personal information such as your name, mobile number, email address, PAN, Aadhaar, financial history, and property documents when you apply for a loan or interact with our website.
          </p>

          <h2 className="text-xl font-semibold text-primary pt-4">2. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To process and evaluate your loan application.</li>
            <li>To verify your identity and conduct credit assessments.</li>
            <li>To communicate with you regarding your application via SMS, WhatsApp, or phone.</li>
            <li>To comply with legal and regulatory requirements (e.g., RBI and KYC norms).</li>
          </ul>

          <h2 className="text-xl font-semibold text-primary pt-4">3. Consent</h2>
          <p>
            By submitting your information on our website, you provide explicit consent for us to contact you and process your data for the purposes mentioned above. You may withdraw this consent at any time by contacting our Grievance Redressal Officer.
          </p>

          <h2 className="text-xl font-semibold text-primary pt-4">4. Data Security & Sharing</h2>
          <p>
            Your data is stored securely on servers located in India. We do not sell your personal information. We may share your data with credit bureaus (e.g., CIBIL), regulatory authorities, or authorized service providers (like DLT SMS gateways) strictly for operational and legal purposes.
          </p>

          <h2 className="text-xl font-semibold text-primary pt-4">5. Contact Us</h2>
          <p>
            If you have any questions about this policy or your data, please contact our Grievance Officer at <strong>gro@gouravfinance.com</strong>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}