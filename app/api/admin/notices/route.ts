import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const notices = await prisma.notice.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(notices);
}

export async function POST(request: Request) {
  const body = await request.json();
  const notice = await prisma.notice.create({ data: body });
  return NextResponse.json({ success: true, notice });
}