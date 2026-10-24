import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function BranchesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif text-primary mb-6">Our Branch</h1>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-serif text-primary mb-4">Rohtak Corporate Office</h2>
          <div className="space-y-4 text-gray-600">
            <p><strong>Address:</strong> 2nd Floor, Plot No. 123, Delhi Road, Rohtak, Haryana - 124001</p>
            <p><strong>Phone:</strong> +91 12345 67890</p>
            <p><strong>Email:</strong> info@gouravfinance.com</p>
            <p><strong>Working Hours:</strong> Monday to Saturday, 10:00 AM to 6:00 PM</p>
          </div>
          
          {/* Map Placeholder */}
          <div className="mt-8 bg-gray-200 w-full h-64 rounded-xl flex items-center justify-center text-gray-500">
            Google Map Integration Here
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}