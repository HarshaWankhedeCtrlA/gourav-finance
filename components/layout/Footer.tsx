import { Link } from '@/i18n/navigation';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Branches', href: '/branches' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'We Finance',
    links: [
      { label: 'Business Loan (LAP)', href: '/loans/business' },
      { label: 'Housing Loan', href: '/loans/housing' },
      { label: 'EMI Calculator', href: '/emi-calculator' },
      { label: 'Apply Now', href: '/contact' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'Fair Practices Code', href: '/disclosures#fair-practices-code' },
      { label: 'Interest Rate Policy', href: '/disclosures#interest-rate-policy' },
      { label: 'Schedule of Charges', href: '/disclosures#schedule-of-charges' },
      { label: 'Key Fact Statement', href: '/disclosures#kfs' },
      { label: 'All Disclosures', href: '/disclosures' },
    ],
  },
  {
    title: 'Customers & Investors',
    links: [
      { label: 'Customer Hub', href: '/customer-hub' },
      { label: 'Grievance Redressal', href: '/grievance' },
      { label: 'Investors', href: '/investors' },
      { label: 'Notices', href: '/notices' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#0B3641] text-white font-sans">
      {/* CTA STRIP */}
      <div className="bg-[#E8A33D]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-xl sm:text-2xl font-bold text-[#1C2321] text-center md:text-left">
            Need funds for your business or home? Talk to our Rohtak team.
          </p>
          <div className="flex gap-3">
            <Link href="/contact" className="rounded-md bg-[#1C2321] px-6 py-3 text-sm font-bold text-white hover:bg-black transition-colors">
              Apply Now
            </Link>
            <a href="tel:+911234567890" className="rounded-md border-2 border-[#1C2321] px-6 py-3 text-sm font-bold text-[#1C2321] hover:bg-[#1C2321] hover:text-white transition-colors">
              Call Us
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-8">
        {/* LINK COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#E8A33D] text-[#0B3641] font-serif text-2xl font-bold">G</span>
              <span className="leading-tight">
                <span className="block font-serif text-2xl font-bold">Gourav Finance</span>
                <span className="block text-xs text-white/60">गौरव फाइनेंस प्राइवेट लिमिटेड</span>
              </span>
            </div>
            <p className="text-sm text-white/65 leading-relaxed">
              Trusted finance since 1996. Secured business and home loans for families and enterprises across Haryana.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
              <ShieldCheck size={14} className="text-[#E8A33D]" /> RBI-registered NBFC
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#E8A33D] mb-5">{col.title}</h4>
              <ul className="space-y-3 text-sm text-white/70">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-white hover:underline underline-offset-4 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* OFFICES + GRO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-b border-white/10 text-sm">
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#E8A33D] mb-3 text-sm">Registered Office</h4>
            <p className="flex gap-2 text-white/70 leading-relaxed">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#E8A33D]" />
              <span>MU-7B, First Floor, Pitampura, Delhi – 110034</span>
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#E8A33D] mb-3 text-sm">State Office</h4>
            <p className="flex gap-2 text-white/70 leading-relaxed">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#E8A33D]" />
              <span>331-332, 3rd Floor, Sunny Mart, New Aatish Market, Mansarover, Jaipur (Raj.) – 302020</span>
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#E8A33D] mb-3 text-sm">Corporate Office</h4>
            <p className="flex gap-2 text-white/70 leading-relaxed">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#E8A33D]" />
              <span>[Office address], Rohtak, Haryana</span>
            </p>
            <a href="tel:+911234567890" className="mt-2 flex items-center gap-2 text-white/70 hover:text-white">
              <Phone size={16} className="text-[#E8A33D]" /> +91 12345 67890
            </a>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#E8A33D] mb-3 text-sm">Grievance Redressal Officer</h4>
            <p className="text-white/70 leading-relaxed">Mr. Rajesh Kumar</p>
            <a href="mailto:gro@gouravfinance.com" className="mt-1 flex items-center gap-2 text-white/70 hover:text-white">
              <Mail size={16} className="text-[#E8A33D]" /> gro@gouravfinance.com
            </a>
            <a href="tel:+919876543210" className="mt-1 flex items-center gap-2 text-white/70 hover:text-white">
              <Phone size={16} className="text-[#E8A33D]" /> +91 98765 43210
            </a>
          </div>
        </div>

        {/* REGULATORY NOTICE */}
        <div className="py-8 text-xs leading-relaxed text-white/60">
          <p>
            <strong className="text-white">We do not accept public deposits.</strong> Gourav Finance Private Limited holds a
            valid Certificate of Registration No. B-14.02345 dated 15 May 1998 issued by the Reserve Bank of India under
            Section 45-IA of the RBI Act, 1934. However, the RBI does not accept any responsibility or guarantee about the
            present position as to the financial soundness of the company or for the correctness of any of the statements or
            representations made or opinions expressed by the company.
          </p>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <p>© {new Date().getFullYear()} Gourav Finance Private Limited. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link href="/terms" className="hover:text-white">Terms of Usage</Link>
            <span aria-hidden>|</span>
            <Link href="/privacy" className="hover:text-white">Data Privacy Policy</Link>
            <span aria-hidden>|</span>
            <Link href="/cookies" className="hover:text-white">Cookies</Link>
            <span aria-hidden>|</span>
            <span>CIN: U65191DL1996PTC332241</span>
            <span aria-hidden>|</span>
            <span>www.gouravfinance.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}