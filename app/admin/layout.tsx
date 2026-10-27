"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (status === "unauthenticated" && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [status, router, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!session) return null;

  // Complete list of Admin Modules
  const navLinks = [
    { name: "Dashboard", href: "/admin" },
    { name: "Leads", href: "/admin/leads" },
    { name: "Grievances", href: "/admin/grievances" },
    { name: "EMI Settings", href: "/admin/settings" },
    { name: "Products", href: "/admin/products" },
    { name: "Branches", href: "/admin/branches" },
    { name: "Policies & Disclosures", href: "/admin/policies" },
    { name: "Officers & Contacts", href: "/admin/officers" },
    { name: "Careers", href: "/admin/careers" },
     { name: "Notices", href: "/admin/notices" },
    { name: "Users & Roles", href: "/admin/users" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-ink text-white flex flex-col overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-serif text-accent">Gourav Finance</h2>
          <p className="text-xs text-gray-400 mt-1">Admin Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`block px-4 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  isActive 
                    ? "bg-[#0F4C5C] text-white" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-3 truncate">{session.user?.email}</p>
          <button 
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}