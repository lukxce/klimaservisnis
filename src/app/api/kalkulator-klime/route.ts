import { NextResponse } from "next/server";

import { getProducts } from "@/lib/data";

// Kalkulator (KlimaCalculator.tsx) računa preporučeni BTU na klijentu i šalje
// ga ovde. Ovaj endpoint traži stvarne proizvode u katalogu čiji je BTU
// dovoljno blizu preporuke - dovoljno da pokrije jednu prodajnu stepenicu,
// pošto su prave stepenice (9000/12000/18000/24000) razmaknute 3000-6000 BTU.
const MATCH_TOLERANCE = 1500;
const MAX_RESULTS = 4;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const btu = typeof body?.btu === "number" ? body.btu : null;

  if (!btu || btu <= 0) {
    return NextResponse.json({ error: "Nedostaje ispravan BTU." }, { status: 400 });
  }

  const products = await getProducts();
  const matches = products.filter((p) => Math.abs(p.btu - btu) <= MATCH_TOLERANCE);

  // Svež shuffle po svakom zahtevu, da se ne prikazuje uvek isti redosled.
  const shuffled = [...matches].sort(() => Math.random() - 0.5).slice(0, MAX_RESULTS);

  return NextResponse.json({ products: shuffled });
}
