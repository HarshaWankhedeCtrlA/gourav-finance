export function calculateEmi(
  principal: number,
  annualRate: number,
  tenureMonths: number
) {
  // If rate is 0, simple division
  if (annualRate === 0) {
    const emi = principal / tenureMonths;
    return {
      emi: Math.round(emi),
      totalInterest: 0,
      totalPayment: principal,
    };
  }

  const monthlyRate = annualRate / 12 / 100;
  const mathPower = Math.pow(1 + monthlyRate, tenureMonths);
  
  // Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emi = (principal * monthlyRate * mathPower) / (mathPower - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
}

// Helper to format currency in Indian style (e.g., ₹15,00,000)
export function formatINR(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}