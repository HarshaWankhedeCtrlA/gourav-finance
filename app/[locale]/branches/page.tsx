import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BranchLocator from '@/components/branch-locator';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Branches & Offices in Rohtak, Jaipur and Delhi | Gourav Finance',
  description:
    'Find Gourav Finance offices with address, working hours and directions. Search by city or pincode.',
};

export default function BranchesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0] text-[#1C2321]">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-[#0F4C5C] to-[#0B3641] text-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E8A33D]">Branches</p>
            <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Find our nearest office</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              Search by city or pincode, see the location on the map and get directions.
            </p>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
          <BranchLocator />
        </section>

        <section className="px-4 sm:px-6 pb-16">
          <div className="container mx-auto max-w-7xl rounded-3xl bg-white border border-gray-200 px-6 py-10 text-center sm:px-12">
            <h2 className="font-serif text-2xl font-bold text-[#0F4C5C]">Prefer we call you?</h2>
            <p className="mx-auto mt-2 max-w-xl text-[#6B7280]">Share your details and our team will get in touch.</p>
            <Link href="/contact" className="mt-6 inline-block">
              <Button className="h-12 rounded-md bg-[#E8A33D] px-8 font-bold text-[#1C2321] hover:bg-[#d69331]">Apply Now</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}