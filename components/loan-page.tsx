import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EmiCalculator from '@/components/emi-calculator';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, FileText, type LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Shared layout for /loans/business and /loans/housing.
 * Spec: key facts, uses, eligibility, documents, calculator,
 * sample KFS, MITC, FAQ with schema.
 * ------------------------------------------------------------------ */

export type LoanPageData = {
  product: 'business' | 'housing';
  title: string;
  intro: string;
  facts: { label: string; value: string }[];
  uses: { icon: LucideIcon; title: string; text: string }[];
  eligibility: string[];
  documents: { title: string; items: string[] }[];
  faqs: { q: string; a: string }[];
};

export default function LoanPage({ data }: { data: LoanPageData }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0] text-[#1C2321]">
      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-gradient-to-br from-[#0F4C5C] to-[#0B3641] text-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 lg:py-16">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight size={12} />
              <span>Loans</span>
              <ChevronRight size={12} />
              <span className="text-[#E8A33D]">{data.title}</span>
            </nav>
            <h1 className="mt-4 font-serif text-4xl font-bold sm:text-5xl">{data.title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{data.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button className="h-12 rounded-md bg-[#E8A33D] px-8 text-base font-bold text-[#1C2321] hover:bg-[#d69331]">
                  Apply Now <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <a href="#emi-calculator">
                <Button variant="outline" className="h-12 rounded-md border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white hover:text-[#0F4C5C]">
                  Calculate EMI
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* KEY FACTS */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6">
          <dl className="-mt-8 grid gap-px overflow-hidden rounded-2xl bg-gray-200 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
            {data.facts.map((f) => (
              <div key={f.label} className="bg-white p-6 text-center">
                <dt className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">{f.label}</dt>
                <dd className="mt-2 font-serif text-2xl font-bold text-[#0F4C5C]">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-center text-xs text-[#6B7280]">
            Indicative. The actual rate, amount and tenure depend on credit assessment and are shown in your Key Fact Statement.
          </p>
        </section>

        {/* USES */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <Head eyebrow="Uses" title="What you can use it for" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {data.uses.map((u) => (
                <div key={u.title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F4C5C] text-[#E8A33D]">
                    <u.icon size={24} />
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-bold text-[#0F4C5C]">{u.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{u.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ELIGIBILITY + DOCUMENTS */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 grid gap-12 lg:grid-cols-2">
            <div>
              <Head left eyebrow="Eligibility" title="Who can apply" />
              <ul className="mt-8 space-y-4">
                {data.eligibility.map((e) => (
                  <li key={e} className="flex gap-3">
                    <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-[#2E7D5B]" />
                    <span className="text-[#1C2321]/85">{e}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-[#6B7280]">Final eligibility is decided after credit assessment.</p>
            </div>
            <div>
              <Head left eyebrow="Documents" title="Keep these ready" />
              <div className="mt-8 space-y-3">
                {data.documents.map((d, i) => (
                  <details key={d.title} open={i === 0} className="group rounded-xl border border-gray-200 bg-[#F7F5F0] px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#0F4C5C]">
                      {d.title}
                      <ChevronDown size={18} className="transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="mt-3 space-y-2 pl-1 text-sm text-[#1C2321]/80">
                      {d.items.map((x) => (
                        <li key={x} className="flex gap-2"><span className="text-[#E8A33D]">•</span>{x}</li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section id="emi-calculator" className="scroll-mt-32 py-16 lg:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <Head eyebrow="EMI Calculator" title="Plan your monthly payment" />
            <div className="mt-10"><EmiCalculator defaultProduct={data.product} /></div>
          </div>
        </section>

        {/* SAMPLE KFS + MITC */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <Head eyebrow="Before you sign" title="Read the key documents first" sub="You get your own Key Fact Statement before you sign. These show the format." />
            <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
              {/* TODO: link these to the uploaded PDFs from the admin panel (Policies & disclosures). */}
              {[
                { title: 'Sample Key Fact Statement', text: 'See how rate, EMI, fees and total cost are laid out.', href: '/disclosures#kfs' },
                { title: 'Most Important Terms & Conditions', text: 'The key terms of the loan in plain words.', href: '/disclosures#mitc' },
              ].map((d) => (
                <Link key={d.title} href={d.href} className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-[#F7F5F0] p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0F4C5C] text-[#E8A33D]"><FileText size={24} /></span>
                  <span>
                    <span className="block font-serif text-lg font-bold text-[#0F4C5C]">{d.title}</span>
                    <span className="mt-1 block text-sm text-[#6B7280]">{d.text}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#0F4C5C] group-hover:text-[#E8A33D]">View <ArrowRight size={15} /></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6">
            <Head eyebrow="FAQ" title="Common questions" />
            <div className="mt-10 space-y-3">
              {data.faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-gray-200 bg-white px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#0F4C5C]">
                    {f.q}
                    <ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#1C2321]/80">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 pb-16 lg:pb-20">
          <div className="container mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#0B3641] px-6 py-12 text-center text-white sm:px-12">
            <h2 className="font-serif text-3xl font-bold">Ready to apply?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/75">Share your details and our team will call you back.</p>
            <Link href="/contact" className="mt-7 inline-block">
              <Button className="h-12 rounded-md bg-[#E8A33D] px-8 text-base font-bold text-[#1C2321] hover:bg-[#d69331]">Apply Now</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}

function Head({ eyebrow, title, sub, left }: { eyebrow: string; title: string; sub?: string; left?: boolean }) {
  return (
    <div className={left ? '' : 'mx-auto max-w-2xl text-center'}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E8A33D]">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-3xl font-bold text-[#0F4C5C] sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-[#6B7280]">{sub}</p>}
    </div>
  );
}