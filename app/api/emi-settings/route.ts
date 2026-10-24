import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const product = searchParams.get("product");

  if (!product) {
    return NextResponse.json({ error: "Product query parameter required" }, { status: 400 });
  }

  try {
    const settings = await prisma.emiSetting.findUnique({
      where: { productType: product },
    });

    if (!settings) {
      return NextResponse.json({ error: "Settings not found" }, { status: 404 });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}