import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FileText, Download } from 'lucide-react';

export default function InvestorsPage() {
  const documents = [
    { title: "Annual Return MGT-7 (FY 2024-25)", date: "30 Sep 2025", size: "2.4 MB" },
    { title: "Annual Return MGT-7A (FY 2024-25)", date: "30 Sep 2025", size: "1.8 MB" },
    { title: "Audited Financial Statements (FY 2024-25)", date: "15 Jul 2025", size: "5.1 MB" },
    { title: "Audited Financial Statements (FY 2023-24)", date: "12 Jul 2024", size: "4.9 MB" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif text-primary mb-4">Investors Relations</h1>
        <p className="text-gray-600 mb-10">Compliance documents and financial disclosures for stakeholders.</p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {documents.map((doc, idx) => (
              <li key={idx} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#0F4C5C]/10 text-[#0F4C5C] rounded-lg">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{doc.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">Uploaded: {doc.date} · PDF · {doc.size}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-sm font-semibold text-[#0F4C5C] hover:text-[#E8A33D] transition-colors">
                  <Download size={16} /> Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}