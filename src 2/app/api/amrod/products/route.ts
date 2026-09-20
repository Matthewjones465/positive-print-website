import { NextResponse } from "next/server";
import { getAmrodProducts } from "@/lib/amrod";

export async function GET() {
  try {
    const products = await getAmrodProducts();
    return NextResponse.json({ ok: true, products });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
