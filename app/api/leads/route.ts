import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, email, town, loanType, amount } = body;

    // Generate a unique reference number: GF-LEAD-1234
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refNumber = `GF-LEAD-${randomNum}`;

    const lead = await prisma.lead.create({
      data: {
        refNumber,
        name,
        mobile,
        email: email || null,
        loanType,
        amount: Number(amount) || 0,
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}