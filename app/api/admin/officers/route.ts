import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: "global" },
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await prisma.siteSetting.update({
      where: { id: "global" },
      data: {
        grievanceOfficerName: body.grievanceOfficerName,
        grievanceOfficerEmail: body.grievanceOfficerEmail,
        grievanceOfficerPhone: body.grievanceOfficerPhone,
      },
    });
    return NextResponse.json({ success: true, updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}