"use client";

import { useState, useMemo, useEffect } from "react";
import { calculateEmi, formatINR } from "@/lib/emi";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function EmiCalculator() {
  const [product, setProduct] = useState<"business" | "housing">("business");
  const [config, setConfig] = useState<any>(null);
  
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [tenureMonths, setTenureMonths] = useState(0);
  const [showTable, setShowTable] = useState(false);

  // Fetch settings from the Admin API when the component loads or product changes
  useEffect(() => {
    setConfig(null); // Show loading state
    fetch(`/api/emi-settings?product=${product}`)
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setAmount(data.defaultAmount);
        setRate(data.defaultRate);
        setTenureMonths(data.defaultTenureMonths);
      })
      .catch((err) => console.error("Failed to load settings", err));
  }, [product]);

  // 🛑 IMPORTANT: All hooks MUST be above this line. 
  // We calculate EMI using fallback 0s if config isn't loaded yet.
  const { emi, totalInterest, totalPayment } = calculateEmi(amount, rate, tenureMonths || 1);

  const chartData = [
    { name: "Principal", value: amount, color: "#0F4C5C" },
    { name: "Interest", value: totalInterest, color: "#E8A33D" },
  ];

  const amortizationData = useMemo(() => {
    let balance = amount;
    const monthlyRate = rate / 12 / 100;
    const data = [];
    for (let i = 1; i <= tenureMonths; i++) {
      const interest = balance * monthlyRate;
      const principal = emi - interest;
      balance -= principal;
      if (i % 12 === 0 || i === tenureMonths) {
        data.push({
          year: Math.ceil(i / 12),
          principalPaid: formatINR(amount - balance),
          interestPaid: formatINR(interest * (i % 12 === 0 ? 12 : i % 12)),
          balance: formatINR(balance > 0 ? balance : 0),
        });
      }
    }
    return data;
  }, [amount, rate, tenureMonths, emi]);

  // ✅ Safe to return early here, now that all hooks are called
  if (!config) {
    return <div className="p-10 text-center animate-pulse bg-white rounded-2xl border">Loading calculator settings...</div>;
  }

  return (
    <div className="bg-card rounded-2xl shadow-xl border border-gray-100 overflow-hidden" id="emi-calculator">
      
      {/* Product Tabs */}
      <div className="flex border-b border-gray-100 bg-[#F7F5F0]">
        <button
          onClick={() => setProduct("business")}
          className={`flex-1 py-4 text-center font-semibold transition-colors ${product === "business" ? "text-primary border-b-2 border-primary bg-white" : "text-muted hover:text-primary"}`}
        >
          Business Loan
        </button>
        <button
          onClick={() => setProduct("housing")}
          className={`flex-1 py-4 text-center font-semibold transition-colors ${product === "housing" ? "text-primary border-b-2 border-primary bg-white" : "text-muted hover:text-primary"}`}
        >
          Housing Loan
        </button>
      </div>

      <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT SIDE: Inputs */}
        <div className="space-y-8">
          {/* Amount */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-semibold text-ink">Loan Amount</Label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-1">
                <span className="text-muted mr-1">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Math.min(Math.max(Number(e.target.value) || 0, config.minAmount), config.maxAmount))}
                  className="w-24 text-right font-semibold text-primary bg-transparent border-none focus:outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={config.minAmount}
              max={config.maxAmount}
              step={config.amountStep}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted font-medium">
              <span>{formatINR(config.minAmount)}</span>
              <span>{formatINR(config.maxAmount)}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-semibold text-ink">Interest Rate (p.a.)</Label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-1">
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Math.min(Math.max(Number(e.target.value) || 0, config.minRate), config.maxRate))}
                  className="w-16 text-right font-semibold text-primary bg-transparent border-none focus:outline-none"
                />
                <span className="text-muted ml-1">%</span>
              </div>
            </div>
            <input
              type="range"
              min={config.minRate}
              max={config.maxRate}
              step={config.rateStep}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted font-medium">
              <span>{config.minRate}%</span>
              <span>{config.maxRate}%</span>
            </div>
          </div>

          {/* Tenure (Months) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-semibold text-ink">Tenure (Years)</Label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-1">
                <input
                  type="number"
                  value={tenureMonths / 12}
                  onChange={(e) => {
                    const yrs = Number(e.target.value) || 1;
                    const months = yrs * 12;
                    setTenureMonths(Math.min(Math.max(months, config.minTenureMonths), config.maxTenureMonths));
                  }}
                  className="w-12 text-right font-semibold text-primary bg-transparent border-none focus:outline-none"
                />
                <span className="text-muted ml-1">Yrs</span>
              </div>
            </div>
            <input
              type="range"
              min={config.minTenureMonths}
              max={config.maxTenureMonths}
              step={12}
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted font-medium">
              <span>{config.minTenureMonths / 12} Yr</span>
              <span>{config.maxTenureMonths / 12} Yrs</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Results & Chart */}
        <div className="flex flex-col space-y-8">
          <div className="text-center">
            <p className="text-muted mb-1 font-medium">Monthly EMI</p>
            <h3 className="text-5xl font-serif text-primary font-bold">{formatINR(emi)}</h3>
            <p className="text-sm text-muted mt-2">
              {Math.floor(tenureMonths / 12)} yrs · {rate}% p.a. · {tenureMonths} EMIs
            </p>
          </div>

          {/* Donut Chart */}
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatINR(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 text-sm bg-[#F7F5F0] p-6 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-muted">Principal Amount</span>
              </div>
              <span className="font-semibold text-ink">{formatINR(amount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span className="text-muted">Total Interest</span>
              </div>
              <span className="font-semibold text-ink">{formatINR(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-primary pt-3 border-t border-gray-300 mt-3">
              <span>Total Payable</span>
              <span>{formatINR(totalPayment)}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-xl">
              Apply for this Loan
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 py-6 rounded-xl" onClick={() => setShowTable(!showTable)}>
              {showTable ? "Hide Table" : "View Table"}
            </Button>
          </div>
        </div>
      </div>

      {/* Amortization Table */}
      {showTable && (
        <div className="p-6 md:p-10 border-t border-gray-100 bg-white">
          <h4 className="font-serif text-xl text-primary mb-4">Yearly Amortization Schedule</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-muted">
                  <th className="pb-3 font-semibold">Year</th>
                  <th className="pb-3 font-semibold text-right">Principal Paid</th>
                  <th className="pb-3 font-semibold text-right">Interest Paid</th>
                  <th className="pb-3 font-semibold text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {amortizationData.map((row) => (
                  <tr key={row.year} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 font-medium text-ink">Year {row.year}</td>
                    <td className="py-3 text-right text-muted">{row.principalPaid}</td>
                    <td className="py-3 text-right text-muted">{row.interestPaid}</td>
                    <td className="py-3 text-right font-medium text-primary">{row.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-[#F7F5F0] p-4 text-center border-t border-gray-200">
        <p className="text-xs text-muted max-w-3xl mx-auto">
          Indicative figures only. The actual rate, EMI and charges depend on credit assessment as per our Interest Rate Policy and will be shown in your Key Fact Statement before you sign.
        </p>
      </div>

    </div>
  );
}