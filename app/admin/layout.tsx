"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Check if the current page is the login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Only redirect if the user is NOT logged in AND is NOT on the login page
    if (status === "unauthenticated" && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [status, router, isLoginPage]);

  // If we are on the login page, render the login form without the sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!session) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-ink text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-serif text-accent">Gourav Finance</h2>
          <p className="text-xs text-gray-400 mt-1">Admin Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/leads" className="block px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            Leads
          </Link>
          <Link href="/admin/settings" className="block px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            EMI Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <p className="text-sm mb-3 truncate">{session.user?.email}</p>
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