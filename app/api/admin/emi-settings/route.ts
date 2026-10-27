import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { 
      productType, enabled, minAmount, maxAmount, minRate, maxRate,
      showAmortisation, showPdf, showDonut, heading, ctaLabel, disclaimer
    } = body;

    const updated = await prisma.emiSetting.update({
      where: { productType },
      data: {
        enabled,
        minAmount: Number(minAmount),
        maxAmount: Number(maxAmount),
        minRate: Number(minRate),
        maxRate: Number(maxRate),
        showAmortisation,
        showPdf,
        showDonut,
        heading,
        ctaLabel,
        disclaimer,
      },
    });

    return NextResponse.json({ success: true, updated });
  } catch (error: any) {
    console.error("EMI Settings Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}