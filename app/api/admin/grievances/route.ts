import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const grievances = await prisma.grievance.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(grievances);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch grievances" }, { status: 500 });
  }
}