import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from '@/i18n/navigation';

export default function DisclosuresPage() {
  const docs = [
    { title: "Fair Practices Code", date: "01 Apr 2026" },
    { title: "Interest Rate Policy", date: "01 Apr 2026" },
    { title: "Schedule of Charges", date: "01 Apr 2026" },
    { title: "Sample Key Fact Statement (KFS)", date: "01 Apr 2026" },
    { title: "Most Important Terms & Conditions (MITC)", date: "01 Apr 2026" },
    { title: "KYC & AML Policy", date: "01 Apr 2026" },
    { title: "Recovery Code of Conduct", date: "01 Apr 2026" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif text-primary mb-6">Regulatory Disclosures</h1>
        <p className="text-gray-600 mb-8">In compliance with RBI guidelines, our policies and disclosures are available for public viewing.</p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Document Name</th>
                <th className="px-6 py-4 font-semibold">Last Updated</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {docs.map((doc, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-ink">{doc.title}</td>
                  <td className="px-6 py-4 text-gray-500">{doc.date}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-primary text-xs font-semibold cursor-pointer hover:underline">View PDF (EN/HI)</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}