"use client";

import { useState, useEffect } from "react";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

export default function BranchesPage() {
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/branches")
      .then((res) => res.json())
      .then((data) => {
        setBranches(data);
        setLoading(false);
      });
  }, []);

  const filteredBranches = branches.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0] text-[#1C2321]">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0F4C5C] to-[#0B3641] text-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E8A33D]">Branches</p>
            <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Find our nearest office</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              Search by city or pincode, see the location on the map and get directions.
            </p>
          </div>
        </section>

        {/* Search & List */}
        <section className="container mx-auto max-w-5xl px-4 sm:px-6 py-12 lg:py-16">
          
          <div className="max-w-md mx-auto mb-12 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              placeholder="Search by city, branch name, or pincode..." 
              className="pl-12 py-6 rounded-full border-gray-300 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid gap-6">
            {loading ? (
              <p className="text-center text-gray-500">Loading branches...</p>
            ) : filteredBranches.length === 0 ? (
              <p className="text-center text-gray-500">No branches found matching "{search}".</p>
            ) : (
              filteredBranches.map((branch) => (
                <div key={branch.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 bg-gray-100 rounded-xl flex items-center justify-center min-h-[160px]">
                    {branch.mapLink ? (
                      <a href={branch.mapLink} target="_blank" rel="noreferrer" className="text-primary font-semibold hover:underline flex flex-col items-center gap-2">
                        <MapPin size={32} className="text-[#E8A33D]" /> View on Map
                      </a>
                    ) : (
                      <MapPin size={32} className="text-gray-400" />
                    )}
                  </div>
                  
                  <div className="md:w-2/3 flex flex-col justify-center">
                    <h2 className="text-2xl font-serif text-primary mb-4">{branch.name}</h2>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p className="flex items-start gap-3">
                        <MapPin size={18} className="text-[#E8A33D] shrink-0 mt-0.5" /> {branch.address}
                      </p>
                      <p className="flex items-center gap-3">
                        <Phone size={18} className="text-[#E8A33D] shrink-0" /> {branch.phone}
                      </p>
                      {branch.email && (
                        <p className="flex items-center gap-3">
                          <Mail size={18} className="text-[#E8A33D] shrink-0" /> {branch.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}