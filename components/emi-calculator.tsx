"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Download, ArrowRight, ChevronDown, RefreshCw } from "lucide-react";
import { amountInWords, calculateEmi, formatINR, yearlySchedule } from "@/lib/emi";

/* ------------------------------------------------------------------ *
 * Settings come from GET /api/emi-settings?product=...  (admin panel).
 * Nothing below hard-codes loan limits. Optional admin fields fall back
 * to sensible UI defaults when the API does not send them yet.
 * ------------------------------------------------------------------ */
type Product = "business" | "housing";
type Unit = "years" | "months";

type Config = {
  enabled: boolean;
  minAmount: number; maxAmount: number; amountStep: number; defaultAmount: number;
  minRate: number; maxRate: number; rateStep: number; defaultRate: number;
  minTenureMonths: number; maxTenureMonths: number; defaultTenureMonths: number;
  tenureChips: number[]; // in years
  defaultUnit: Unit;
  showAmortisation: boolean;
  showPdf: boolean;
  showDonut: boolean;
  heading?: string;
  ctaLabel: string;
  ctaLink: string;
  disclaimer: string;
};

const DEFAULT_DISCLAIMER =
  "Indicative figures only. The actual rate, EMI and charges depend on credit assessment as per our Interest Rate Policy and will be shown in your Key Fact Statement before you sign.";

const PRODUCT_LABEL: Record<Product, string> = {
  business: "Business Loan",
  housing: "Housing Loan",
};

function normalise(d: any): Config {
  const n = (v: unknown) => Number(v);
  const c: Config = {
    enabled: d.enabled !== false,
    minAmount: n(d.minAmount), maxAmount: n(d.maxAmount), amountStep: n(d.amountStep), defaultAmount: n(d.defaultAmount),
    minRate: n(d.minRate), maxRate: n(d.maxRate), rateStep: n(d.rateStep), defaultRate: n(d.defaultRate),
    minTenureMonths: n(d.minTenureMonths), maxTenureMonths: n(d.maxTenureMonths), defaultTenureMonths: n(d.defaultTenureMonths),
    tenureChips: Array.isArray(d.tenureChips) ? d.tenureChips.map(Number) : [3, 5, 7, 10],
    defaultUnit: d.defaultUnit === "months" ? "months" : "years",
    showAmortisation: d.showAmortisation !== false,
    showPdf: d.showPdf !== false,
    showDonut: d.showDonut !== false,
    heading: d.heading || undefined,
    ctaLabel: d.ctaLabel || "Apply for this loan",
    ctaLink: d.ctaLink || "/contact",
    disclaimer: d.disclaimer || DEFAULT_DISCLAIMER,
  };
  const required = [
    c.minAmount, c.maxAmount, c.amountStep, c.defaultAmount,
    c.minRate, c.maxRate, c.rateStep, c.defaultRate,
    c.minTenureMonths, c.maxTenureMonths, c.defaultTenureMonths,
  ];
  if (required.some((v) => !Number.isFinite(v))) throw new Error("Invalid calculator settings");
  c.tenureChips = c.tenureChips.filter(
    (y) => Number.isFinite(y) && y * 12 >= c.minTenureMonths && y * 12 <= c.maxTenureMonths
  );
  return c;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/** Animated count-up; jumps straight to the value if the user prefers reduced motion. */
function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = from.current;
    const t0 = performance.now();
    const dur = 450;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = start + (target - start) * eased;
      from.current = cur;
      setValue(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

/** Number box that updates live while typing and clamps on blur. */
function NumberBox({
  value, min, max, onChange, display, label, prefix, suffix, widthClass = "w-28",
}: {
  value: number; min: number; max: number; onChange: (v: number) => void;
  display: (v: number) => string; label: string; prefix?: string; suffix?: string; widthClass?: string;
}) {
  const [focus, setFocus] = useState(false);
  const [draft, setDraft] = useState("");
  return (
    <label className="flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 focus-within:border-[#0F4C5C] focus-within:ring-2 focus-within:ring-[#0F4C5C]/20">
      {prefix && <span className="mr-1 text-[#6B7280]">{prefix}</span>}
      <input
        aria-label={label}
        inputMode="decimal"
        className={`${widthClass} bg-transparent text-right font-semibold tabular-nums text-[#0F4C5C] outline-none`}
        value={focus ? draft : display(value)}
        onFocus={() => { setDraft(String(value)); setFocus(true); }}
        onChange={(e) => {
          setDraft(e.target.value);
          const n = parseFloat(e.target.value.replace(/,/g, ""));
          if (Number.isFinite(n)) onChange(clamp(n, min, max));
        }}
        onBlur={() => {
          const n = parseFloat(draft.replace(/,/g, ""));
          if (Number.isFinite(n)) onChange(clamp(n, min, max));
          setFocus(false);
        }}
        onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
      />
      {suffix && <span className="ml-1 text-[#6B7280]">{suffix}</span>}
    </label>
  );
}

function Slider({
  value, min, max, step, onChange, label, valueText,
}: {
  value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; label: string; valueText: string;
}) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  return (
    <input
      type="range"
      aria-label={label}
      aria-valuetext={valueText}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="h-2 w-full cursor-pointer rounded-lg accent-[#0F4C5C]"
      style={{ background: `linear-gradient(to right, #0F4C5C ${pct}%, #E5E7EB ${pct}%)` }}
    />
  );
}

function tenureCaption(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mo`;
  return m ? `${y} yrs ${m} mo` : `${y} yrs`;
}

export default function EmiCalculator({ defaultProduct = "business" }: { defaultProduct?: Product }) {
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [config, setConfig] = useState<Config | null>(null);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [months, setMonths] = useState(0);
  const [unit, setUnit] = useState<Unit>("years");
  const [showTable, setShowTable] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    setConfig(null);
    setError(false);
    fetch(`/api/emi-settings?product=${product}`, { signal: ctrl.signal })
      .then((r) => { if (!r.ok) throw new Error("bad status"); return r.json(); })
      .then((data) => {
        const c = normalise(data);
        setConfig(c);
        setAmount(clamp(c.defaultAmount, c.minAmount, c.maxAmount));
        setRate(clamp(c.defaultRate, c.minRate, c.maxRate));
        setMonths(clamp(c.defaultTenureMonths, c.minTenureMonths, c.maxTenureMonths));
        setUnit(c.defaultUnit);
      })
      .catch((e) => { if (e.name !== "AbortError") setError(true); });
    return () => ctrl.abort();
  }, [product, reloadKey]);

  // Hooks must stay above any early return.
  const { emi, totalInterest, totalPayment } = useMemo(
    () => calculateEmi(amount, rate, months || 1),
    [amount, rate, months]
  );
  const rows = useMemo(
    () => (amount > 0 && months > 0 ? yearlySchedule(amount, rate, months) : []),
    [amount, rate, months]
  );
  const animatedEmi = useCountUp(emi);

  const downloadPdf = useCallback(async () => {
    if (!config) return;
    setPdfBusy(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const W = doc.internal.pageSize.getWidth();
      // jsPDF's built-in fonts have no rupee glyph, so the PDF uses "Rs."
      const rs = (v: number) => "Rs. " + Math.round(v).toLocaleString("en-IN");

      doc.setFillColor(15, 76, 92);
      doc.rect(0, 0, W, 90, "F");
      doc.setFont("helvetica", "bold").setFontSize(24).setTextColor(232, 163, 61);
      doc.text("Gourav Finance", 40, 52);
      doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(255, 255, 255);
      doc.text("Trusted finance since 1996.", 40, 71);
      doc.text("EMI Estimate", W - 40, 52, { align: "right" });
      doc.text(new Date().toLocaleDateString("en-IN"), W - 40, 71, { align: "right" });

      let y = 130;
      doc.setTextColor(28, 35, 33).setFont("helvetica", "bold").setFontSize(14);
      doc.text(PRODUCT_LABEL[product], 40, y);
      y += 26;

      const facts: [string, string][] = [
        ["Loan amount", rs(amount)],
        ["Interest rate", `${rate}% p.a.`],
        ["Tenure", `${tenureCaption(months)} (${months} EMIs)`],
        ["Monthly EMI", rs(emi)],
        ["Total interest", rs(totalInterest)],
        ["Total payable", rs(totalPayment)],
      ];
      doc.setFontSize(11);
      facts.forEach(([k, v], i) => {
        if (i % 2 === 0) { doc.setFillColor(247, 245, 240); doc.rect(40, y - 14, W - 80, 24, "F"); }
        doc.setFont("helvetica", "normal").setTextColor(107, 114, 128).text(k, 50, y);
        doc.setFont("helvetica", "bold").setTextColor(15, 76, 92).text(v, W - 50, y, { align: "right" });
        y += 24;
      });

      if (config.showAmortisation && rows.length) {
        y += 18;
        doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(28, 35, 33);
        doc.text("Yearly schedule", 40, y);
        y += 20;
        doc.setFillColor(15, 76, 92).rect(40, y - 14, W - 80, 22, "F");
        doc.setFontSize(10).setTextColor(255, 255, 255);
        doc.text("Year", 50, y);
        doc.text("Principal paid", 230, y, { align: "right" });
        doc.text("Interest paid", 380, y, { align: "right" });
        doc.text("Balance", W - 50, y, { align: "right" });
        y += 22;
        doc.setFont("helvetica", "normal").setTextColor(28, 35, 33);
        rows.forEach((r, i) => {
          if (y > 760) { doc.addPage(); y = 60; }
          if (i % 2 === 1) { doc.setFillColor(247, 245, 240); doc.rect(40, y - 13, W - 80, 20, "F"); }
          doc.text(`Year ${r.year}`, 50, y);
          doc.text(rs(r.principalPaid), 230, y, { align: "right" });
          doc.text(rs(r.interestPaid), 380, y, { align: "right" });
          doc.text(rs(r.balance), W - 50, y, { align: "right" });
          y += 20;
        });
      }

      y = Math.max(y + 24, 740);
      if (y > 790) { doc.addPage(); y = 60; }
      doc.setFont("helvetica", "italic").setFontSize(8).setTextColor(107, 114, 128);
      doc.text(doc.splitTextToSize(config.disclaimer, W - 80), 40, y);
      doc.setFont("helvetica", "normal");
      doc.text("Gourav Finance Private Limited | CIN U65191DL1996PTC332241 | www.gouravfinance.com", 40, y + 34);

      doc.save(`Gourav-Finance-EMI-${product}.pdf`);
    } finally {
      setPdfBusy(false);
    }
  }, [config, product, amount, rate, months, emi, totalInterest, totalPayment, rows]);

  /* ---------------- early states ---------------- */
  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
        <p className="text-[#1C2321]">The calculator could not load right now.</p>
        <button
          onClick={() => setReloadKey((k) => k + 1)}
          className="mt-4 inline-flex items-center gap-2 rounded-md border-2 border-[#0F4C5C] px-5 py-2 text-sm font-semibold text-[#0F4C5C] hover:bg-[#0F4C5C]/5"
        >
          <RefreshCw size={16} /> Try again
        </button>
      </div>
    );
  }
  if (!config) {
    return (
      <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-10 text-center text-[#6B7280]" aria-busy="true">
        Loading calculator…
      </div>
    );
  }
  if (!config.enabled) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-[#6B7280]">
        The EMI calculator is not available for this product right now.
      </div>
    );
  }

  const years = months / 12;
  const chartData = [
    { name: "Principal", value: amount, color: "#0F4C5C" },
    { name: "Interest", value: Math.max(totalInterest, 0), color: "#E8A33D" },
  ];
  const interestShare = totalPayment > 0 ? Math.round((totalInterest / totalPayment) * 100) : 0;
  const applyHref = `${config.ctaLink}${config.ctaLink.includes("?") ? "&" : "?"}product=${product}&amount=${amount}&rate=${rate}&months=${months}`;

  return (
    <div id="emi-calculator" className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
      {config.heading && (
        <h2 className="border-b border-gray-100 px-6 pt-6 font-serif text-2xl font-bold text-[#0F4C5C] md:px-10">{config.heading}</h2>
      )}

      {/* Product switch */}
      <div role="tablist" aria-label="Loan product" className="flex border-b border-gray-100 bg-[#F7F5F0]">
        {(Object.keys(PRODUCT_LABEL) as Product[]).map((p) => (
          <button
            key={p}
            role="tab"
            aria-selected={product === p}
            onClick={() => setProduct(p)}
            className={`flex-1 border-b-[3px] py-4 text-center font-semibold transition-colors ${
              product === p ? "border-[#E8A33D] bg-white text-[#0F4C5C]" : "border-transparent text-[#6B7280] hover:text-[#0F4C5C]"
            }`}
          >
            {PRODUCT_LABEL[p]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 p-6 md:p-10 lg:grid-cols-2 lg:gap-14">
        {/* INPUTS */}
        <div className="space-y-9">
          {/* Amount */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-[#1C2321]">Loan amount</span>
              <NumberBox
                label="Loan amount in rupees" prefix="₹" value={amount}
                min={config.minAmount} max={config.maxAmount} onChange={setAmount}
                display={(v) => v.toLocaleString("en-IN")}
              />
            </div>
            <Slider
              label="Loan amount" value={amount} min={config.minAmount} max={config.maxAmount}
              step={config.amountStep} onChange={setAmount} valueText={`${formatINR(amount)}, ${amountInWords(amount)}`}
            />
            <div className="flex justify-between text-xs font-medium text-[#6B7280]">
              <span>{formatINR(config.minAmount)}</span>
              <span>{formatINR(config.maxAmount)}</span>
            </div>
            <p className="text-sm font-medium text-[#0F4C5C]">{amountInWords(amount)}</p>
          </div>

          {/* Rate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-[#1C2321]">Interest rate (p.a.)</span>
              <NumberBox
                label="Interest rate percent per annum" suffix="%" value={rate}
                min={config.minRate} max={config.maxRate} onChange={setRate}
                display={(v) => String(v)} widthClass="w-16"
              />
            </div>
            <Slider
              label="Interest rate" value={rate} min={config.minRate} max={config.maxRate}
              step={config.rateStep} onChange={setRate} valueText={`${rate} percent per annum`}
            />
            <div className="flex justify-between text-xs font-medium text-[#6B7280]">
              <span>{config.minRate}%</span>
              <span>{config.maxRate}%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-semibold text-[#1C2321]">Tenure</span>
              <div className="flex items-center gap-2">
                <div role="group" aria-label="Tenure unit" className="flex overflow-hidden rounded-md border border-gray-300 text-xs font-semibold">
                  {(["years", "months"] as Unit[]).map((u) => (
                    <button
                      key={u}
                      aria-pressed={unit === u}
                      onClick={() => setUnit(u)}
                      className={`px-3 py-1.5 capitalize ${unit === u ? "bg-[#0F4C5C] text-white" : "bg-white text-[#6B7280] hover:text-[#0F4C5C]"}`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
                {unit === "years" ? (
                  <NumberBox
                    label="Tenure in years" suffix="Yrs" value={years}
                    min={config.minTenureMonths / 12} max={config.maxTenureMonths / 12}
                    onChange={(y) => setMonths(clamp(Math.round(y * 12), config.minTenureMonths, config.maxTenureMonths))}
                    display={(v) => String(Number(v.toFixed(2)))} widthClass="w-12"
                  />
                ) : (
                  <NumberBox
                    label="Tenure in months" suffix="Mo" value={months}
                    min={config.minTenureMonths} max={config.maxTenureMonths}
                    onChange={(m) => setMonths(Math.round(m))}
                    display={(v) => String(Math.round(v))} widthClass="w-12"
                  />
                )}
              </div>
            </div>
            <Slider
              label="Tenure" value={months} min={config.minTenureMonths} max={config.maxTenureMonths}
              step={unit === "years" ? 12 : 1} onChange={setMonths} valueText={tenureCaption(months)}
            />
            <div className="flex justify-between text-xs font-medium text-[#6B7280]">
              <span>{unit === "years" ? `${config.minTenureMonths / 12} yr` : `${config.minTenureMonths} mo`}</span>
              <span>{unit === "years" ? `${config.maxTenureMonths / 12} yrs` : `${config.maxTenureMonths} mo`}</span>
            </div>
            {config.tenureChips.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {config.tenureChips.map((y) => (
                  <button
                    key={y}
                    onClick={() => setMonths(y * 12)}
                    aria-pressed={months === y * 12}
                    className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                      months === y * 12
                        ? "border-[#0F4C5C] bg-[#0F4C5C] text-white"
                        : "border-gray-300 bg-white text-[#0F4C5C] hover:border-[#0F4C5C]"
                    }`}
                  >
                    {y} {y === 1 ? "yr" : "yrs"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RESULTS */}
        <div className="flex flex-col gap-7">
          <div className="text-center">
            <p className="mb-1 font-medium text-[#6B7280]">Monthly EMI</p>
            <p aria-hidden="true" className="font-serif text-5xl font-bold tabular-nums text-[#0F4C5C]">
              {formatINR(animatedEmi)}
            </p>
            <p className="sr-only" aria-live="polite">Monthly EMI {formatINR(emi)}</p>
            <p className="mt-2 text-sm text-[#6B7280]">
              {tenureCaption(months)} · {rate}% p.a. · {months} EMIs
            </p>
          </div>

          {config.showDonut && (
            <div className="relative mx-auto h-52 w-full max-w-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" innerRadius={62} outerRadius={86} paddingAngle={2} stroke="none">
                    {chartData.map((e) => (<Cell key={e.name} fill={e.color} />))}
                  </Pie>
                  <Tooltip formatter={(v: any) => formatINR(Number(v))} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-[#6B7280]">Interest</span>
                <span className="font-serif text-2xl font-bold text-[#E8A33D]">{interestShare}%</span>
              </div>
            </div>
          )}

          <dl className="space-y-3 rounded-xl bg-[#F7F5F0] p-6 text-sm">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-[#6B7280]"><span className="h-3 w-3 rounded-full bg-[#0F4C5C]" />Principal amount</dt>
              <dd className="font-semibold tabular-nums text-[#1C2321]">{formatINR(amount)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-[#6B7280]"><span className="h-3 w-3 rounded-full bg-[#E8A33D]" />Total interest</dt>
              <dd className="font-semibold tabular-nums text-[#1C2321]">{formatINR(totalInterest)}</dd>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-gray-300 pt-3 font-bold text-[#0F4C5C]">
              <dt>Total payable</dt>
              <dd className="tabular-nums">{formatINR(totalPayment)}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={applyHref}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-[#E8A33D] px-6 font-bold text-[#1C2321] transition-colors hover:bg-[#d69331]"
            >
              {config.ctaLabel} <ArrowRight size={18} />
            </Link>
            {config.showPdf && (
              <button
                onClick={downloadPdf}
                disabled={pdfBusy}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border-2 border-[#0F4C5C] px-5 font-semibold text-[#0F4C5C] transition-colors hover:bg-[#0F4C5C]/5 disabled:opacity-60"
              >
                <Download size={18} /> {pdfBusy ? "Preparing…" : "Download PDF"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Yearly amortisation */}
      {config.showAmortisation && (
        <div className="border-t border-gray-100 px-6 py-6 md:px-10">
          <button
            onClick={() => setShowTable((s) => !s)}
            aria-expanded={showTable}
            className="flex w-full items-center justify-between font-serif text-xl font-bold text-[#0F4C5C]"
          >
            Yearly amortisation schedule
            <ChevronDown size={20} className={`transition-transform ${showTable ? "rotate-180" : ""}`} />
          </button>
          {showTable && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-[#6B7280]">
                    <th className="pb-3 font-semibold">Year</th>
                    <th className="pb-3 text-right font-semibold">Principal paid</th>
                    <th className="pb-3 text-right font-semibold">Interest paid</th>
                    <th className="pb-3 text-right font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.year} className="border-b border-gray-100 hover:bg-[#F7F5F0]">
                      <td className="py-3 font-medium text-[#1C2321]">Year {r.year}</td>
                      <td className="py-3 text-right tabular-nums text-[#6B7280]">{formatINR(r.principalPaid)}</td>
                      <td className="py-3 text-right tabular-nums text-[#6B7280]">{formatINR(r.interestPaid)}</td>
                      <td className="py-3 text-right font-medium tabular-nums text-[#0F4C5C]">{formatINR(r.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 bg-[#F7F5F0] p-4 text-center">
        <p className="mx-auto max-w-3xl text-xs text-[#6B7280]">{config.disclaimer}</p>
      </div>
    </div>
  );
}