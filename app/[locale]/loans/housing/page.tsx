import type { Metadata } from 'next';
import { Home, Hammer, Wrench } from 'lucide-react';
import LoanPage, { type LoanPageData } from '@/components/loan-page';

export const metadata: Metadata = {
  title: 'Home Loan in Haryana | Gourav Finance',
  description:
    'Housing loans to buy, build or renovate your home from Gourav Finance, an RBI-registered NBFC. Clear charges and a Key Fact Statement before you sign.',
};

/* TODO: amounts and tenure come from your existing page. Move to the admin product list. */
const data: LoanPageData = {
  product: 'housing',
  title: 'Housing Loans',
  intro:
    'Affordable home financing solutions to help you purchase, construct, or renovate your home.',
  facts: [
    { label: 'Loan amount', value: 'Up to ₹1 Crore' },
    { label: 'Tenure', value: 'Up to 20 years' },
    { label: 'Rate', value: 'Shown in your KFS*' },
    { label: 'Charges', value: 'Transparent, with a KFS' },
  ],
  uses: [
    { icon: Home, title: 'Purchase a home', text: 'Finance the purchase of a house or flat.' },
    { icon: Hammer, title: 'Construct a home', text: 'Build on land you own.' },
    { icon: Wrench, title: 'Renovate or extend', text: 'Repairs, improvements or an extra floor.' },
  ],
  // TODO: confirm these criteria against your credit policy.
  eligibility: [
    'Indian resident aged 21 to 65 years at loan maturity',
    'Regular income, from salary or business, that can service the EMI',
    'Property with a clear title and approved plan',
    'Satisfactory credit history',
    'Property located in our service area',
  ],
  documents: [
    { title: 'KYC documents', items: ['Aadhaar and PAN card', 'Photographs'] },
    { title: 'Property documents', items: ['Sale deed', 'Approved building plan'] },
    { title: 'Income documents', items: ['Salary slips or ITR', 'Bank statements'] },
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

export default function HousingLoanPage() {
  return <LoanPage data={data} />;
}