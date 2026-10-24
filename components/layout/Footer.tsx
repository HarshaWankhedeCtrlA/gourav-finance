import { Link } from '@/i18n/navigation';

export default function Footer() {
  return (
    <footer className="border-t bg-ink text-white pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Column 1: Brand */}
        <div>
          <h3 className="font-serif text-2xl text-accent mb-4">Gourav Finance</h3>
          <p className="text-sm text-gray-300 mb-4">Trusted finance since 1996.</p>
          <p className="text-xs text-gray-400">
            An RBI-registered, non-deposit-taking NBFC (Investment and Credit Company).
          </p>
        </div>

        {/* Column 2: Products */}
        <div>
          <h4 className="font-semibold text-white mb-4">Products</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/loans/business" className="hover:text-accent transition-colors">Business Loans (LAP)</Link></li>
            <li><Link href="/loans/housing" className="hover:text-accent transition-colors">Housing Loans</Link></li>
            <li><Link href="/emi-calculator" className="hover:text-accent transition-colors">EMI Calculator</Link></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link href="/branches" className="hover:text-accent transition-colors">Branches</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            <li><Link href="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
          </ul>
        </div>

        {/* Column 4: Regulatory & Customers */}
        <div>
          <h4 className="font-semibold text-white mb-4">Customers & Regulatory</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/customer-hub" className="hover:text-accent transition-colors">Customer Hub</Link></li>
            <li><Link href="/grievance" className="hover:text-accent transition-colors">Grievance Redressal</Link></li>
            <li><Link href="/disclosures" className="hover:text-accent transition-colors">Regulatory Disclosures</Link></li>
            <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Regulatory Footer Info */}
      <div className="container mx-auto px-4 pt-8 border-t border-gray-700 text-xs text-gray-400 space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <p><strong>Gourav Finance Private Limited</strong></p>
            <p>CIN: U65191DL1996PTC332241</p>
            <p>Registered Office: New Delhi</p>
            <p>Corporate Office: Rohtak, Haryana</p>
          </div>
          <div>
            <p><strong>Grievance Redressal Officer</strong></p>
            <p>Mr. Rajesh Kumar</p>
            <p>Email: gro@gouravfinance.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-700/50">
          <p className="mb-2"><strong>We do not accept public deposits.</strong></p>
          <p className="leading-relaxed">
            Gourav Finance Private Limited holds a valid Certificate of Registration No. B-14.02345 dated 15 May 1998 issued by the Reserve Bank of India under Section 45-IA of the RBI Act, 1934. However, the RBI does not accept any responsibility or guarantee about the present position as to the financial soundness of the company or for the correctness of any of the statements or representations made or opinions expressed by the company.
          </p>
        </div>
        
        <div className="pt-4 text-center text-gray-500">
          © {new Date().getFullYear()} Gourav Finance Private Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}