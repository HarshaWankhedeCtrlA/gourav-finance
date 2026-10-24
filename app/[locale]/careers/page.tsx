import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-primary mb-4">Careers at Gourav Finance</h1>
          <p className="text-lg text-muted">Join a team that has been building trust since 1996.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Job Opening 1 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-2">Relationship Manager</h3>
            <p className="text-sm text-gray-500 mb-4">Rohtak, Haryana · Full Time</p>
            <p className="text-sm text-gray-600 mb-6">
              We are looking for a dynamic individual to manage MSME and housing loan clients in the Rohtak region. Minimum 2 years of experience in secured lending is preferred.
            </p>
            <Button variant="outline" className="w-full border-primary text-primary">Apply Now</Button>
          </div>

          {/* Job Opening 2 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-2">Credit Analyst</h3>
            <p className="text-sm text-gray-500 mb-4">Rohtak, Haryana · Full Time</p>
            <p className="text-sm text-gray-600 mb-6">
              Responsible for evaluating loan applications, verifying property documents, and assessing creditworthiness. Strong analytical skills required.
            </p>
            <Button variant="outline" className="w-full border-primary text-primary">Apply Now</Button>
          </div>
        </div>

        {/* General CV Upload */}
        <div className="mt-12 bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
          <h3 className="text-xl font-serif text-primary mb-2">Don't see a suitable role?</h3>
          <p className="text-muted mb-6 text-sm">Send us your CV and we will contact you if a position opens up.</p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input type="file" className="bg-white" />
            <Button className="bg-primary hover:bg-primary/90">Upload CV</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}