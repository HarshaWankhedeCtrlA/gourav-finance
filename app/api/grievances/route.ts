import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, email, category, description } = body;

    // Generate Ticket ID: GF-YYYY-XXXXX
    const year = new Date().getFullYear();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const ticketId = `GF-${year}-${randomNum}`;

    const grievance = await prisma.grievance.create({
      data: {
        ticketId,
        name,
        mobile,
        email: email || null,
        category,
        description,
      },
    });

    return NextResponse.json({ success: true, grievance });
  } catch (error) {
    console.error("Grievance API Error:", error);
    return NextResponse.json({ error: "Failed to submit grievance" }, { status: 500 });
  }
}