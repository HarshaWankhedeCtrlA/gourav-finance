import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-primary">
            Gourav Finance
          </Link>
                   <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-primary">Home</Link>
            <Link href="/loans/business" className="hover:text-primary">Business Loans</Link>
            <Link href="/loans/housing" className="hover:text-primary">Housing Loans</Link>
            <Link href="/emi-calculator" className="hover:text-primary">EMI Calculator</Link>
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/branches" className="hover:text-primary">Branches</Link>
            <Link href="/customer-hub" className="hover:text-primary">Customer Hub</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/contact">
            <Button>Apply Now</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}