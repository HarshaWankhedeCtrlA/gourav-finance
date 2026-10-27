"use client";

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

// Exactly the header tabs from the spec: Home, Loans, EMI Calculator, About, Branches, Customer Hub, Contact.
// Dropdown items are only pages that exist in the page list.
const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Loans',
    href: '/loans/business',
    children: [
      { label: 'Business Loans', href: '/loans/business' },
      { label: 'Housing Loans', href: '/loans/housing' },
    ],
  },
  { label: 'EMI Calculator', href: '/emi-calculator' },
  { label: 'About', href: '/about' },
  { label: 'Branches', href: '/branches' },
  { label: 'Customer Hub', href: '/customer-hub' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loansOpen, setLoansOpen] = useState(false);
  const pathname = usePathname(); // locale-less path
  const router = useRouter();
  const locale = useLocale();

  const isHindi = locale === 'hi';
  const toggleLanguage = () => {
    router.replace(pathname, { locale: isHindi ? 'en' : 'hi' });
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setLoansOpen(false);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_2px_12px_rgba(15,76,92,0.08)]">
      {/* TOP BAR: phone, email, grievance link, language */}
      <div className="bg-[#0F4C5C] text-white/90 text-xs">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="tel:+911234567890" className="flex items-center gap-1.5 hover:text-[#E8A33D] transition-colors">
              <Phone size={12} /> <span className="font-medium">+91 12345 67890</span>
            </a>
            <a href="mailto:info@gouravfinance.com" className="hidden md:flex items-center gap-1.5 hover:text-[#E8A33D] transition-colors">
              <Mail size={12} /> info@gouravfinance.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/grievance" className="hover:text-[#E8A33D] transition-colors">
              Grievance Redressal
            </Link>
            <span className="w-px h-3 bg-white/30" />
            <button
              onClick={toggleLanguage}
              className="font-bold tracking-wider hover:text-[#E8A33D] transition-colors"
              aria-label="Switch language"
            >
              {isHindi ? 'EN' : 'हिंदी'}
            </button>
          </div>
        </div>
      </div>

      {/* MAIN BAR */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 h-[76px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={closeMobile}>
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0F4C5C] text-[#E8A33D] font-serif text-2xl font-bold">
            G
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-[#0F4C5C]">Gourav Finance</span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-gray-500">Trusted since 1996</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-stretch h-full" aria-label="Main">
          {NAV.map((item) => (
            <div key={item.label} className="relative group flex items-center">
              <Link
                href={item.href}
                className={`flex items-center gap-1 px-3.5 h-full text-[15px] font-semibold transition-colors group-hover:text-[#0F4C5C] ${
                  isActive(item.href) ? 'text-[#0F4C5C]' : 'text-[#1C2321]'
                }`}
              >
                {item.label}
                {item.children && (
                  <ChevronDown size={14} className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                )}
              </Link>
              <span
                className={`absolute bottom-0 left-3.5 right-3.5 h-[3px] rounded-t bg-[#E8A33D] origin-left transition-transform ${
                  isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />

              {item.children && (
                <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 absolute left-0 top-full w-56">
                  <ul className="bg-white rounded-b-xl border border-gray-100 border-t-[3px] border-t-[#E8A33D] shadow-xl py-2">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block px-5 py-3 text-sm font-semibold text-[#1C2321] hover:bg-[#F7F5F0] hover:text-[#0F4C5C] transition-colors">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/emi-calculator">
            <Button variant="outline" className="rounded-md border-[#0F4C5C] text-[#0F4C5C] font-semibold hover:bg-[#0F4C5C]/5 px-5">
              Calculate EMI
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="rounded-md bg-[#E8A33D] text-[#1C2321] font-bold hover:bg-[#d69331] px-6 shadow-sm">
              Apply Now
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 -mr-2 text-[#0F4C5C]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`lg:hidden absolute inset-x-0 top-full bg-white border-t border-gray-100 shadow-xl max-h-[calc(100vh-112px)] overflow-y-auto transition-all duration-300 ${
          mobileOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-3 invisible'
        }`}
      >
        <div className="px-4 py-3">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="border-b border-gray-100">
                <button
                  className="w-full flex items-center justify-between py-4 text-base font-semibold text-[#1C2321]"
                  onClick={() => setLoansOpen((v) => !v)}
                  aria-expanded={loansOpen}
                >
                  {item.label}
                  <ChevronDown size={18} className={`transition-transform ${loansOpen ? 'rotate-180' : ''}`} />
                </button>
                {loansOpen && (
                  <ul className="pb-3 pl-3 space-y-1">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} onClick={closeMobile} className="block py-2 text-sm text-gray-600 hover:text-[#0F4C5C]">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobile}
                className="block py-4 border-b border-gray-100 text-base font-semibold text-[#1C2321] hover:text-[#0F4C5C]"
              >
                {item.label}
              </Link>
            )
          )}

          <div className="grid grid-cols-2 gap-3 py-5">
            <Link href="/emi-calculator" onClick={closeMobile}>
              <Button variant="outline" className="w-full border-[#0F4C5C] text-[#0F4C5C] font-semibold">Calculate EMI</Button>
            </Link>
            <Link href="/contact" onClick={closeMobile}>
              <Button className="w-full bg-[#E8A33D] text-[#1C2321] font-bold hover:bg-[#d69331]">Apply Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}