import type { Metadata } from 'next';
import { TrendingUp, Wallet, Layers } from 'lucide-react';
import LoanPage, { type LoanPageData } from '@/components/loan-page';

export const metadata: Metadata = {
  title: 'Business Loan Against Property in Rohtak | Gourav Finance',
  description:
    'Secured business loans (loan against property) for MSMEs in Rohtak and Haryana from Gourav Finance, an RBI-registered NBFC. Clear terms and a Key Fact Statement before you sign.',
};

/* TODO: amounts, tenure and rate come from your existing page. Move to the admin product list. */
const data: LoanPageData = {
  product: 'business',
  title: 'Business Loans',
  intro:
    'Loan Against Property (LAP) designed to help MSMEs expand, manage working capital, or consolidate debt.',
  facts: [
    { label: 'Loan amount', value: '₹5 Lakh – ₹50 Lakh' },
    { label: 'Tenure', value: 'Up to 10 years' },
    { label: 'Rate from', value: '12% p.a.*' },
    { label: 'Security', value: 'Residential or commercial property' },
  ],
  uses: [
    { icon: TrendingUp, title: 'Expand your business', text: 'Fund growth, new premises, machinery or stock.' },
    { icon: Wallet, title: 'Working capital', text: 'Manage day-to-day business cash flow.' },
    { icon: Layers, title: 'Consolidate debt', text: 'Bring existing business loans together.' },
  ],
  // TODO: confirm these criteria against your credit policy.
  eligibility: [
    'Indian resident aged 21 to 65 years at loan maturity',
    'Owner of a residential or commercial property with a clear title',
    'Running a business, or earning a regular income that can service the EMI',
    'Satisfactory credit history',
    'Property located in our service area',
  ],
  documents: [
    { title: 'KYC documents', items: ['Aadhaar and PAN card', 'Photographs'] },
    { title: 'Property documents', items: ['Title deed', 'Chain of documents'] },
    { title: 'Income documents', items: ['ITR of the last 2 years', 'Bank statements of the last 6 months'] },
    { title: 'If you are self-employed', items: ['Business proof (GST / Udyam / shop licence)', 'ITR with computation of income'] },
  ],
  // FAQ answers only restate points from the website brief. Have compliance review before publishing.
  faqs: [
    {
      q: 'Will I see the full cost before I sign?',
      a: 'Yes. You receive a Key Fact Statement showing the rate, EMI and charges before you sign.',
    },
    {
      q: 'Is approval guaranteed?',
      a: 'No. Every application goes through credit assessment, and the final rate, EMI and charges depend on that assessment as per our Interest Rate Policy.',
    },
    {
      q: 'Does Gourav Finance accept public deposits?',
      a: 'No. Gourav Finance is a non-deposit-taking NBFC registered with the Reserve Bank of India.',
    },
    {
      q: 'When do I get my property documents back after closing the loan?',
      a: 'Original property documents are returned within 30 days of loan closure.',
    },
    {
      q: 'Are the EMI calculator figures final?',
      a: 'No. They are indicative only. Your actual figures are shown in your Key Fact Statement before you sign.',
    },
    {
      q: 'How do I make a complaint?',
      a: 'Start with customer care, then our Grievance Redressal Officer. If it is unresolved within 30 days, you can approach the RBI Integrated Ombudsman. See our Grievance Redressal page for details.',
    },
  ],
};

export default function BusinessLoanPage() {
  return <LoanPage data={data} />;
}