import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const careers = await prisma.career.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(careers);
}

export async function POST(request: Request) {
  const body = await request.json();
  const career = await prisma.career.create({ data: body });
  return NextResponse.json({ success: true, career });
}