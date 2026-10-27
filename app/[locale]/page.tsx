import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EmiCalculator from '@/components/emi-calculator';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  ArrowRight, Banknote, Building2, CalendarClock, CheckCircle2, ChevronDown, ClipboardCheck,
  FileSignature, FileText, Home as HomeIcon, KeyRound, Landmark, Lock, MapPin, ShieldCheck,
  Store, UserCheck, Users, Wallet, Briefcase, Search,
} from 'lucide-react';

/* ------------------------------------------------------------------ *
 * TODO (admin panel): replace these constants with data from your API.
 * - PRODUCTS  -> admin product list
 * - CUSTOMERS_SERVED -> admin "site settings"
 * ------------------------------------------------------------------ */
const CUSTOMERS_SERVED = '10000+';

const PRODUCTS = [
  {
    slug: 'business',
    icon: Store,
    name: 'Business Loan',
    tag: 'Loan against property',
    blurb: 'Working capital, expansion or debt consolidation for MSMEs, secured against your property.',
    amount: '₹5 Lakh – ₹50 Lakh',
    tenure: 'Up to 10 years',
    rate: 'From 12% p.a.*',
    pills: ['Residential or commercial property', 'Flexible tenure', 'Local team support'],
  },
  {
    slug: 'housing',
    icon: HomeIcon,
    name: 'Housing Loan',
    tag: 'Buy, build or renovate',
    blurb: 'Home financing to purchase, construct or improve your home, with clear and transparent charges.',
    amount: 'Up to ₹1 Crore',
    tenure: 'Up to 20 years',
    rate: 'Rate shown in your KFS*',
    pills: ['Long repayment tenure', 'KFS before you sign', 'Doorstep documentation'],
  },
];

const STEPS = [
  { icon: FileSignature, title: 'Apply', text: 'Share your details online or at our office. Our team calls you back.' },
  { icon: ClipboardCheck, title: 'Credit assessment & sanction', text: 'We assess your application and, if sanctioned, give you a sanction letter and Key Fact Statement.' },
  { icon: Search, title: 'Property verification', text: 'Legal and technical checks on the property offered as security.' },
  { icon: Banknote, title: 'Disbursal', text: 'After documentation is complete, the loan amount is disbursed to your account.' },
];

const ELIGIBILITY = [
  'Indian resident aged 21 to 65 years at loan maturity',
  'Owner of a residential or commercial property with a clear title',
  'Running a business, or earning a regular income that can service the EMI',
  'Satisfactory credit history',
  'Property located in our service area',
];

const DOCS = [
  { title: 'KYC documents', items: ['Aadhaar and PAN card', 'Recent passport-size photographs', 'Address proof, if different from Aadhaar'] },
  { title: 'Property documents', items: ['Title deed / sale deed and chain of documents', 'Approved building plan', 'Latest property tax receipt'] },
  { title: 'Income documents', items: ['Salary slips or ITR of the last 2 years', 'Bank statements of the last 6 months'] },
  { title: 'If you are self-employed', items: ['Business proof (GST / Udyam / shop licence)', 'ITR with computation of income and balance sheet', 'Current account statements of the last 12 months'] },
];

const WHY = [
  { icon: CalendarClock, title: 'Since 1996', text: 'Over two decades of lending experience, registered with the Reserve Bank of India.' },
  { icon: MapPin, title: 'Local team', text: 'People you can meet in person, who understand local businesses and property.' },
  { icon: FileText, title: 'KFS before you sign', text: 'You see the Key Fact Statement with the rate, EMI and charges before you commit.' },
  { icon: ShieldCheck, title: 'No hidden charges', text: 'Every fee is listed in our Schedule of Charges, including penal charges.' },
  { icon: Lock, title: 'Data security & consent', text: 'We use your data only with your consent, in line with the DPDP Act, 2023.' },
  { icon: KeyRound, title: 'Doorstep service', text: 'Documentation help at your home or shop, so you do not lose a working day.' },
];

const AUDIENCES = [
  { icon: Users, title: 'Borrowers', text: 'Explore loans, check your EMI and apply.', href: '/loans/business', cta: 'See our loans' },
  { icon: UserCheck, title: 'Existing customers', text: 'Statements, foreclosure quote, NOC and document return.', href: '/customer-hub', cta: 'Go to Customer Hub' },
  { icon: Briefcase, title: 'Job seekers', text: 'Join a local team that values trust and service.', href: '/careers', cta: 'View careers' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0] text-[#1C2321]">
      <Header />

      <main className="flex-1">
        {/* 1. HERO */}
        <section className="relative overflow-hidden bg-[#F7F5F0]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#0F4C5C]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0F4C5C]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" />
                RBI-registered NBFC · Established 1996
              </p>
              <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-[#0F4C5C]">
                Trusted finance <br className="hidden sm:block" /> since 1996.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#6B7280]">
                Secured business and home loans for families and enterprises across Haryana. Clear terms, quick decisions, help at your doorstep.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button className="h-12 rounded-md bg-[#E8A33D] px-8 text-base font-bold text-[#1C2321] hover:bg-[#d69331] shadow-sm">
                    Apply Now <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link href="/emi-calculator">
                  <Button variant="outline" className="h-12 rounded-md border-2 border-[#0F4C5C] px-8 text-base font-semibold text-[#0F4C5C] hover:bg-[#0F4C5C]/5">
                    Calculate EMI
                  </Button>
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#1C2321]">
                {['RBI-registered', 'Non-deposit taking', 'KFS before you sign', 'Local Rohtak team'].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-[#2E7D5B]" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo placeholder + stat card */}
            <div className="relative">
              {/* TODO: replace with <Image src="/images/hero.jpg" alt="Shop owner discussing a loan with a Gourav Finance executive" ... /> */}
              <div
                role="img"
                aria-label="Placeholder: North Indian shop owner meeting a Gourav Finance executive"
                className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-[#0F4C5C] via-[#14697d] to-[#0B3641] shadow-2xl flex items-center justify-center"
              >
                <Building2 size={96} className="text-white/25" />
              </div>
              <div className="absolute -bottom-6 left-4 sm:-left-6 rounded-2xl bg-white px-6 py-4 shadow-xl border border-gray-100">
                <p className="font-serif text-3xl font-bold text-[#0F4C5C]">{CUSTOMERS_SERVED}</p>
                <p className="text-sm text-[#6B7280]">customers served</p>
              </div>
              <div className="absolute -top-4 right-4 hidden sm:flex items-center gap-2 rounded-full bg-[#E8A33D] px-4 py-2 text-sm font-bold text-[#1C2321] shadow-lg">
                <Landmark size={16} /> Since 1996
              </div>
            </div>
          </div>
        </section>

        {/* 2. PRODUCTS */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHead eyebrow="Our Loans" title="Loans built around your property and your plans" sub="Two products, explained plainly. Rates and charges are confirmed in your Key Fact Statement." />
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {PRODUCTS.map((p) => (
                <article key={p.slug} className="group flex flex-col rounded-2xl border border-gray-200 bg-[#F7F5F0] p-8 transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0F4C5C] text-[#E8A33D]">
                      <p.icon size={28} />
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#0F4C5C]">{p.name}</h3>
                      <p className="text-sm text-[#6B7280]">{p.tag}</p>
                    </div>
                  </div>
                  <p className="mt-5 leading-relaxed text-[#1C2321]/80">{p.blurb}</p>
                  <dl className="mt-6 grid grid-cols-3 gap-3 rounded-xl bg-white p-4 text-center">
                    <div><dt className="text-xs text-[#6B7280]">Amount</dt><dd className="mt-1 text-sm font-bold text-[#0F4C5C] tabular-nums">{p.amount}</dd></div>
                    <div><dt className="text-xs text-[#6B7280]">Tenure</dt><dd className="mt-1 text-sm font-bold text-[#0F4C5C]">{p.tenure}</dd></div>
                    <div><dt className="text-xs text-[#6B7280]">Rate</dt><dd className="mt-1 text-sm font-bold text-[#0F4C5C]">{p.rate}</dd></div>
                  </dl>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.pills.map((x) => (
                      <li key={x} className="rounded-full border border-[#0F4C5C]/20 bg-white px-3 py-1 text-xs font-medium text-[#0F4C5C]">{x}</li>
                    ))}
                  </ul>
                  <Link href={`/loans/${p.slug}`} className="mt-7 inline-flex items-center gap-2 font-bold text-[#0F4C5C] group-hover:text-[#E8A33D]">
                    Know more <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-[#6B7280]">*Indicative. Actual rate depends on credit assessment as per our Interest Rate Policy.</p>
          </div>
        </section>

        {/* 3. HOW IT WORKS */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHead eyebrow="How it works" title="From application to disbursal in four steps" sub="Timelines depend on your documents and the property verification." />
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                  <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#E8A33D] text-sm font-bold text-[#1C2321]">{i + 1}</span>
                  <s.icon size={30} className="mt-2 text-[#0F4C5C]" />
                  <h3 className="mt-4 font-serif text-lg font-bold text-[#0F4C5C]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. ELIGIBILITY + DOCUMENTS */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHead left eyebrow="Eligibility" title="Who can apply" />
              <ul className="mt-8 space-y-4">
                {ELIGIBILITY.map((e) => (
                  <li key={e} className="flex gap-3">
                    <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-[#2E7D5B]" />
                    <span className="text-[#1C2321]/85">{e}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-[#6B7280]">Final eligibility is decided after credit assessment. Criteria may vary by product.</p>
            </div>
            <div>
              <SectionHead left eyebrow="Documents" title="Keep these ready" />
              <div className="mt-8 space-y-3">
                {DOCS.map((d, i) => (
                  <details key={d.title} open={i === 0} className="group rounded-xl border border-gray-200 bg-[#F7F5F0] px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#0F4C5C]">
                      {d.title}
                      <ChevronDown size={18} className="transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="mt-3 space-y-2 pl-1 text-sm text-[#1C2321]/80">
                      {d.items.map((x) => (<li key={x} className="flex gap-2"><span className="text-[#E8A33D]">•</span>{x}</li>))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. EMI CALCULATOR */}
        <section id="emi-calculator" className="scroll-mt-32 py-16 lg:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHead eyebrow="EMI Calculator" title="Plan your monthly payment" sub="Move the sliders and see your EMI instantly." />
            <div className="mt-10"><EmiCalculator /></div>
          </div>
        </section>

        {/* 6. WHY */}
        <section className="bg-[#0F4C5C] py-16 lg:py-20 text-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHead light eyebrow="Why Gourav Finance" title="Finance you can trust, people you can meet" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WHY.map((w) => (
                <div key={w.title} className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E8A33D] text-[#1C2321]"><w.icon size={24} /></span>
                  <h3 className="mt-4 font-serif text-xl font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. PROMOTER'S MESSAGE */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid items-center gap-8 rounded-3xl bg-white p-8 shadow-sm border border-gray-100 md:grid-cols-[200px_1fr] md:p-12">
              {/* TODO: replace with promoter photo */}
              <div role="img" aria-label="Placeholder: photo of Mr Vikas Nandal" className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-[#0F4C5C] to-[#0B3641] font-serif text-5xl font-bold text-[#E8A33D] md:h-48 md:w-48">VN</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#E8A33D]">Promoter&apos;s message</p>
                {/* TODO: replace with text approved by Mr Vikas Nandal */}
                <blockquote className="mt-3 font-serif text-xl leading-relaxed text-[#0F4C5C] md:text-2xl">
                  &ldquo;Our work is built on one simple promise: tell the customer everything clearly, before they sign. That is how we have earned trust since 1996.&rdquo;
                </blockquote>
                <p className="mt-5 font-semibold">Mr Vikas Nandal</p>
                <p className="text-sm text-[#6B7280]">Promoter, Gourav Finance Private Limited</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CUSTOMER STORIES */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHead eyebrow="Customer stories" title="In their words" sub="Shown only with the customer's written consent." />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {/* TODO: replace with real, consenting customers from the admin panel */}
              {[1, 2, 3].map((n) => (
                <figure key={n} className="rounded-2xl border border-dashed border-gray-300 bg-[#F7F5F0] p-6">
                  <Wallet size={24} className="text-[#E8A33D]" />
                  <blockquote className="mt-4 text-sm leading-relaxed text-[#6B7280]">Customer story placeholder. Add a real story with the customer&apos;s written consent from the admin panel.</blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-[#1C2321]">Customer name, Town</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 9. WHO WE SERVE */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHead eyebrow="Who we serve" title="How can we help you today?" />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {AUDIENCES.map((a) => (
                <Link key={a.title} href={a.href} className="group rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0F4C5C]/10 text-[#0F4C5C]"><a.icon size={28} /></span>
                  <h3 className="mt-5 font-serif text-xl font-bold text-[#0F4C5C]">{a.title}</h3>
                  <p className="mt-2 text-sm text-[#6B7280]">{a.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0F4C5C] group-hover:text-[#E8A33D]">{a.cta} <ArrowRight size={16} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section className="px-4 sm:px-6 pb-16 lg:pb-20">
          <div className="container mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#0B3641] px-6 py-14 text-center text-white sm:px-12">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">Ready to talk about your loan?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/75">Share your details and our team will call you at a time that suits you. No obligation.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact"><Button className="h-12 rounded-md bg-[#E8A33D] px-8 text-base font-bold text-[#1C2321] hover:bg-[#d69331]">Apply Now</Button></Link>
              <a href="tel:+911234567890"><Button variant="outline" className="h-12 rounded-md border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white hover:text-[#0F4C5C]">Call Us</Button></a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SectionHead({
  eyebrow, title, sub, left, light,
}: { eyebrow: string; title: string; sub?: string; left?: boolean; light?: boolean }) {
  return (
    <div className={left ? '' : 'mx-auto max-w-2xl text-center'}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E8A33D]">{eyebrow}</p>
      <h2 className={`mt-2 font-serif text-3xl font-bold sm:text-4xl ${light ? 'text-white' : 'text-[#0F4C5C]'}`}>{title}</h2>
      {sub && <p className={`mt-3 ${light ? 'text-white/70' : 'text-[#6B7280]'}`}>{sub}</p>}
    </div>
  );
}