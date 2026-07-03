import { NextResponse } from "next/server";

import { serverClient } from "@/sanity/lib/serverClient";

const VALID_REASONS = ["servis", "montaza", "kvar", "kupovina", "ostalo"];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Neispravan zahtev." }, { status: 400 });
  }

  const { name, phone, email, reason, message, website } = body as Record<string, unknown>;

  // Honeypot — botovi popunjavaju skrivena polja, ljudi ne.
  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    typeof phone !== "string" ||
    phone.trim().length < 5 ||
    typeof message !== "string" ||
    message.trim().length < 5
  ) {
    return NextResponse.json(
      { error: "Popunite ime, telefon i poruku." },
      { status: 400 },
    );
  }

  const safeReason = typeof reason === "string" && VALID_REASONS.includes(reason) ? reason : "ostalo";

  try {
    await serverClient.create({
      _type: "contactSubmission",
      name: name.trim().slice(0, 200),
      phone: phone.trim().slice(0, 50),
      email: typeof email === "string" ? email.trim().slice(0, 200) : undefined,
      reason: safeReason,
      message: message.trim().slice(0, 4000),
      status: "novo",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Greška pri čuvanju poruke:", error);
    return NextResponse.json(
      { error: "Došlo je do greške. Pokušajte ponovo ili nas pozovite telefonom." },
      { status: 500 },
    );
  }
}
