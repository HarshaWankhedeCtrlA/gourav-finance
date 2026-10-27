// lib/emi.ts — pure EMI maths. Drop-in replacement: keeps the existing exports
// (calculateEmi, formatINR) and adds amountInWords + yearlySchedule.

export function calculateEmi(principal: number, annualRatePct: number, months: number) {
  const n = Math.max(1, Math.round(months));
  const r = annualRatePct / 12 / 100;
  let emi: number;
  if (!principal || principal <= 0) {
    emi = 0;
  } else if (r === 0) {
    emi = principal / n;
  } else {
    const f = Math.pow(1 + r, n);
    emi = (principal * r * f) / (f - 1);
  }
  // Totals use the UNROUNDED EMI so they match the spec's worked examples.
  const totalPayment = emi * n;
  const totalInterest = Math.max(0, totalPayment - principal);
  return { emi, totalInterest, totalPayment };
}

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatINR(value: number) {
  return inr.format(Math.round(value));
}

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
  'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function below100(n: number) {
  return n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
}
function below1000(n: number) {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  return [h ? ONES[h] + ' Hundred' : '', rest ? below100(rest) : ''].filter(Boolean).join(' ');
}

/** 1500000 -> "Rupees Fifteen Lakh Only" (Indian numbering). */
export function amountInWords(amount: number) {
  let n = Math.round(amount);
  if (n <= 0) return 'Zero';
  const crore = Math.floor(n / 1e7); n %= 1e7;
  const lakh = Math.floor(n / 1e5); n %= 1e5;
  const thousand = Math.floor(n / 1e3); n %= 1e3;
  const parts = [
    crore ? below100(crore) + ' Crore' : '',
    lakh ? below100(lakh) + ' Lakh' : '',
    thousand ? below100(thousand) + ' Thousand' : '',
    n ? below1000(n) : '',
  ].filter(Boolean);
  return 'Rupees ' + parts.join(' ') + ' Only';
}

export type YearRow = { year: number; principalPaid: number; interestPaid: number; balance: number };

/** Year-wise amortisation (sums of the monthly schedule). */
export function yearlySchedule(principal: number, annualRatePct: number, months: number): YearRow[] {
  const n = Math.max(1, Math.round(months));
  const r = annualRatePct / 12 / 100;
  const { emi } = calculateEmi(principal, annualRatePct, n);
  const rows: YearRow[] = [];
  let balance = principal;
  let yp = 0;
  let yi = 0;
  for (let m = 1; m <= n; m++) {
    const interest = balance * r;
    const princ = emi - interest;
    balance -= princ;
    yp += princ;
    yi += interest;
    if (m % 12 === 0 || m === n) {
      rows.push({
        year: Math.ceil(m / 12),
        principalPaid: yp,
        interestPaid: yi,
        balance: balance > 0.5 ? balance : 0,
      });
      yp = 0;
      yi = 0;
    }
  }
  return rows;
}