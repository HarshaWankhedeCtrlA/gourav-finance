import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const branches = await prisma.branch.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(branches);
}

export async function POST(request: Request) {
  const body = await request.json();
  const branch = await prisma.branch.create({ data: body });
  return NextResponse.json({ success: true, branch });
}