"use client";

import { useMemo, useState } from "react";
import { Building2, Clock, Mail, MapPin, Navigation, Phone, Search } from "lucide-react";

/* ------------------------------------------------------------------ *
 * TODO (admin panel -> Branches module): load this list from the API.
 * Rohtak details are copied from the existing Branches page; the
 * Delhi and Jaipur addresses are from the company sign board.
 * Phone / email / hours are only shown where they are known.
 * ------------------------------------------------------------------ */
type Branch = {
  id: string;
  name: string;
  kind: string;
  address: string;
  city: string;
  pincode: string;
  phone?: string;
  email?: string;
  hours?: string;
};

const BRANCHES: Branch[] = [
  {
    id: "rohtak",
    name: "Rohtak Office",
    kind: "Corporate Office",
    address: "2nd Floor, Plot No. 123, Delhi Road, Rohtak, Haryana",
    city: "Rohtak",
    pincode: "124001",
    phone: "+91 12345 67890",
    email: "info@gouravfinance.com",
    hours: "Monday to Saturday, 10:00 AM to 6:00 PM",
  },
  {
    id: "jaipur",
    name: "Jaipur Office",
    kind: "State Office",
    address: "331-332, 3rd Floor, Sunny Mart, New Aatish Market, Mansarover, Jaipur (Raj.)",
    city: "Jaipur",
    pincode: "302020",
  },
  {
    id: "delhi",
    name: "Delhi Office",
    kind: "Registered Office",
    address: "MU-7B, First Floor, Pitampura, Delhi",
    city: "Delhi",
    pincode: "110034",
  },
];

const fullAddress = (b: Branch) => `${b.address} - ${b.pincode}`;
// Keyless Google Maps embed. For heavy production use, switch to the Maps Embed API with a key.
const embedSrc = (b: Branch) =>
  `https://www.google.com/maps?q=${encodeURIComponent(`Gourav Finance, ${fullAddress(b)}`)}&output=embed`;
const directionsHref = (b: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress(b))}`;

export default function BranchLocator() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(BRANCHES[0].id);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BRANCHES;
    return BRANCHES.filter((b) =>
      [b.name, b.kind, b.address, b.city, b.pincode].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  const selected = BRANCHES.find((b) => b.id === selectedId) ?? BRANCHES[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
      {/* SEARCH + LIST */}
      <div className="flex flex-col gap-4">
        <label className="relative block">
          <span className="sr-only">Search branches by city, area or pincode</span>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, area or pincode"
            className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20"
          />
        </label>

        <p className="text-sm text-[#6B7280]" aria-live="polite">
          {results.length} {results.length === 1 ? "branch" : "branches"} found
        </p>

        <ul className="space-y-3">
          {results.map((b) => {
            const active = b.id === selected.id;
            return (
              <li key={b.id}>
                <div
                  className={`rounded-2xl border bg-white p-5 transition ${
                    active ? "border-[#0F4C5C] shadow-lg ring-2 ring-[#0F4C5C]/15" : "border-gray-200 hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => setSelectedId(b.id)}
                    aria-pressed={active}
                    className="flex w-full items-start gap-4 text-left"
                  >
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${active ? "bg-[#0F4C5C] text-[#E8A33D]" : "bg-[#0F4C5C]/10 text-[#0F4C5C]"}`}>
                      <Building2 size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#E8A33D]">{b.kind}</span>
                      <span className="block font-serif text-lg font-bold text-[#0F4C5C]">{b.name}</span>
                      <span className="mt-1 flex gap-1.5 text-sm text-[#6B7280]">
                        <MapPin size={15} className="mt-0.5 shrink-0" />
                        <span>{fullAddress(b)}</span>
                      </span>
                    </span>
                  </button>

                  {(b.hours || b.phone || b.email) && (
                    <dl className="mt-4 space-y-1.5 border-t border-gray-100 pt-4 text-sm text-[#1C2321]/80">
                      {b.hours && (
                        <div className="flex gap-2"><Clock size={15} className="mt-0.5 shrink-0 text-[#0F4C5C]" /><dd>{b.hours}</dd></div>
                      )}
                      {b.phone && (
                        <div className="flex gap-2"><Phone size={15} className="mt-0.5 shrink-0 text-[#0F4C5C]" />
                          <dd><a href={`tel:${b.phone.replace(/\s/g, "")}`} className="hover:text-[#0F4C5C] hover:underline">{b.phone}</a></dd></div>
                      )}
                      {b.email && (
                        <div className="flex gap-2"><Mail size={15} className="mt-0.5 shrink-0 text-[#0F4C5C]" />
                          <dd><a href={`mailto:${b.email}`} className="hover:text-[#0F4C5C] hover:underline">{b.email}</a></dd></div>
                      )}
                    </dl>
                  )}

                  <a
                    href={directionsHref(b)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#E8A33D] px-4 py-2 text-sm font-bold text-[#1C2321] transition-colors hover:bg-[#d69331]"
                  >
                    <Navigation size={15} /> Get directions
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        {results.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-[#6B7280]">
            No branch matches &ldquo;{query}&rdquo;. Try a city name or pincode.
          </div>
        )}
      </div>

      {/* MAP */}
      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
            <div className="min-w-0">
              <p className="truncate font-serif font-bold text-[#0F4C5C]">{selected.name}</p>
              <p className="truncate text-xs text-[#6B7280]">{fullAddress(selected)}</p>
            </div>
            <a href={directionsHref(selected)} target="_blank" rel="noreferrer" className="shrink-0 text-sm font-bold text-[#0F4C5C] hover:text-[#E8A33D]">
              Open in Maps
            </a>
          </div>
          <iframe
            key={selected.id}
            title={`Map showing ${selected.name}`}
            src={embedSrc(selected)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-[420px] w-full border-0 lg:h-[560px]"
          />
        </div>
      </div>
    </div>
  );
}