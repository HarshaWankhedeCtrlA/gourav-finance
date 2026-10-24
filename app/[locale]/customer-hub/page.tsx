import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CustomerHubPage() {
  const services = [
    { title: "View Statement", desc: "Check your loan balance and repayment schedule." },
    { title: "Foreclosure Quote", desc: "Request a quote to close your loan early." },
    { title: "EMI Payment Details", desc: "Official bank account and UPI details for payments." },
    { title: "Document Return / NOC", desc: "Request return of property documents after closure." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-primary mb-4">Customer Hub</h1>
          <p className="text-gray-600">Access your loan services and important alerts.</p>
        </div>

        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-8 text-sm text-red-800">
          <strong>Fraud Alert:</strong> Gourav Finance will never ask for your OTP or passwords. Only pay to our official verified bank accounts or UPI handles.
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}