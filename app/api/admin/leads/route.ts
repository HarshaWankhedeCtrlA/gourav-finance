import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes, assignedTo } = body;

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { status, notes, assignedTo },
    });

    return NextResponse.json({ success: true, updatedLead });
  } catch (error) {
    console.error("Lead Update Error:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}