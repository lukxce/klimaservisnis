import { revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

// Sanity webhook receiver za on-demand revalidaciju.
//
// Podešavanje (jednom, ručno):
// 1. U Vercel projektu dodaj env var SANITY_REVALIDATE_SECRET (proizvoljan
//    dugačak random string, npr. `openssl rand -hex 32`).
// 2. U Sanity manage konzoli (sanity.io/manage -> ovaj projekat -> API ->
//    Webhooks) napravi webhook:
//    - URL: https://<ovaj-sajt>/api/revalidate
//    - Dataset: production
//    - Trigger on: Create, Update, Delete
//    - Filter: prazno (šaljemo za sve tipove, filtriramo ovde)
//    - Projection: { "_type": _type, "slug": slug.current }
//    - Secret: ista vrednost kao SANITY_REVALIDATE_SECRET iz koraka 1
// Dok ovo nije podešeno, Sanity izmene se neće videti na sajtu bez novog
// deploy-a (revalidate je namerno isključen iz vremenskog modela).

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { revalidated: false, message: "SANITY_REVALIDATE_SECRET nije podešen" },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);

  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return Response.json({ revalidated: false, message: "Nevažeći potpis" }, { status: 401 });
  }

  let payload: { _type?: string; slug?: string } = {};
  try {
    payload = JSON.parse(body);
  } catch {
    return Response.json({ revalidated: false, message: "Neispravan JSON" }, { status: 400 });
  }

  if (!payload._type) {
    return Response.json({ revalidated: false, message: "Nedostaje _type u payload-u" }, { status: 400 });
  }

  revalidateTag(payload._type, "max");

  return Response.json({
    revalidated: true,
    tag: payload._type,
    slug: payload.slug ?? null,
    now: Date.now(),
  });
}
