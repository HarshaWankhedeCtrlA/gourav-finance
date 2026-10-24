import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif text-primary mb-6">About Gourav Finance</h1>
        <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
          <p>
            Gourav Finance Private Limited is an RBI-registered, non-deposit-taking Non-Banking Financial Company (NBFC). Incorporated on 25th April 1996, we have been a trusted financial partner for families and enterprises across Haryana for over two decades.
          </p>
          <p>
            Promoted by Mr. Vikas Nandal, our mission is to provide secured business loans and housing loans with clear terms, transparent processes, and quick decisions. We believe in helping our customers achieve their dreams without hidden charges.
          </p>
          <h2 className="text-2xl font-serif text-primary pt-6">Our Commitment</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Transparency:</strong> We provide a Key Fact Statement (KFS) before you sign anything.</li>
            <li><strong>Local Presence:</strong> Headquartered in Rohtak, we understand the local business landscape.</li>
            <li><strong>Data Security:</strong> Your data is handled with strict confidentiality and consent.</li>
          </ul>
          <h2 className="text-2xl font-serif text-primary pt-6">Corporate Information</h2>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-4 text-sm">
            <p><strong>Legal Name:</strong> Gourav Finance Private Limited</p>
            <p><strong>CIN:</strong> U65191DL1996PTC332241</p>
            <p><strong>Registered Office:</strong> New Delhi (as per MCA records)</p>
            <p><strong>Corporate Office:</strong> Rohtak, Haryana</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}