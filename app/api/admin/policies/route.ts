import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const policies = await prisma.policy.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(policies);
}

export async function POST(request: Request) {
  const body = await request.json();
  const policy = await prisma.policy.create({ data: body });
  return NextResponse.json({ success: true, policy });
}