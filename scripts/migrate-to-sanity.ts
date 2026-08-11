// Jednokratna migracija sadržaja iz src/lib/placeholder-data.ts u pravi
// Sanity dataset. Bezbedno se pokreće više puta (createOrReplace po
// deterministic _id-u, ne duplira dokumente).
//
// Pokretanje:
//   SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_TOKEN=xxx npx tsx scripts/migrate-to-sanity.ts
//
// Posle uspešne migracije: dodaj NEXT_PUBLIC_SANITY_PROJECT_ID i
// NEXT_PUBLIC_SANITY_DATASET u Vercel env vars i redeploy-uj.

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const token = process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error("SANITY_PROJECT_ID i SANITY_TOKEN su obavezni env var-ovi.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

let keyCounter = 0;
function key() {
  keyCounter += 1;
  return `k${Date.now().toString(36)}${keyCounter}`;
}

// Doda _key svuda gde Sanity to zahteva za array stavke, i markDefs/_key za
// Portable Text blokove (placeholder-data.ts helper funkcije ih ne dodaju
// jer lokalni PortableText renderer to ne zahteva, ali Sanity content lake
// zahteva _key za svaku array stavku).
function finalizeBlocks(blocks: unknown): unknown {
  if (!Array.isArray(blocks)) return blocks;
  return blocks.map((block: any) => {
    if (block && block._type === "block") {
      return {
        ...block,
        _key: key(),
        markDefs: block.markDefs ?? [],
        children: (block.children ?? []).map((child: any) => ({
          ...child,
          _key: key(),
        })),
      };
    }
    return { ...block, _key: key() };
  });
}

function withKeys<T extends Record<string, unknown>>(items: T[] | undefined): (T & { _key: string })[] | undefined {
  if (!items) return undefined;
  return items.map((item) => ({ ...item, _key: key() }));
}

const uploadedAssets = new Map<string, string>(); // local path -> asset _id

async function uploadImage(publicPath: string | undefined): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined> {
  if (!publicPath || !publicPath.startsWith("/")) return undefined;
  if (uploadedAssets.has(publicPath)) {
    return { _type: "image", asset: { _type: "reference", _ref: uploadedAssets.get(publicPath)! } };
  }
  const filePath = join(ROOT, "public", publicPath);
  if (!existsSync(filePath)) {
    console.warn(`  (preskačem sliku, fajl ne postoji lokalno: ${publicPath})`);
    return undefined;
  }
  const buffer = readFileSync(filePath);
  const filename = publicPath.split("/").pop()!;
  const asset = await client.assets.upload("image", buffer, { filename });
  uploadedAssets.set(publicPath, asset._id);
  console.log(`  uploaded image: ${publicPath} -> ${asset._id}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

function slugify(current: string) {
  return { _type: "slug", current };
}

async function migrateSiteSettings(data: any) {
  if (!data) return;
  console.log("siteSettings...");
  const doc: any = {
    _id: "siteSettings",
    _type: "siteSettings",
    title: data.title,
    tagline: data.tagline,
    phone: data.phone,
    phoneSecondary: data.phoneSecondary,
    email: data.email,
    address: data.address,
    city: data.city,
    serviceAreas: data.serviceAreas,
    foundedYear: data.foundedYear,
    workingHours: data.workingHours,
    openingHoursSpecification: withKeys(
      (data.openingHoursSpecification ?? []).map((b: any) => ({ ...b, _type: "hoursBlock" })),
    ),
    geo: data.geo,
    brands: data.brands,
    socials: data.socials,
    seoUsluge: data.seoUsluge,
    seoCenovnik: data.seoCenovnik,
    seoShop: data.seoShop,
    seoBlog: data.seoBlog,
  };
  if (data.logoUrl) doc.logo = await uploadImage(data.logoUrl);
  if (data.heroImageUrl) doc.heroImage = await uploadImage(data.heroImageUrl);
  if (data.aboutImageUrl) doc.aboutImage = await uploadImage(data.aboutImageUrl);
  await client.createOrReplace(doc);
}

async function migrateServices(items: any[] | undefined) {
  if (!items) return;
  console.log(`services (${items.length})...`);
  for (const [i, s] of items.entries()) {
    const doc: any = {
      _id: `service-${s.slug}`,
      _type: "service",
      title: s.title,
      slug: slugify(s.slug),
      category: s.category,
      shortDescription: s.shortDescription,
      priceFrom: s.priceFrom,
      priceTo: s.priceTo,
      priceNote: s.priceNote,
      body: finalizeBlocks(s.body),
      featured: s.featured ?? false,
      order: i,
    };
    if (s.imageUrl) doc.image = await uploadImage(s.imageUrl);
    await client.createOrReplace(doc);
  }
}

async function migrateServicePages(items: any[] | undefined) {
  if (!items) return;
  console.log(`servicePages (${items.length})...`);
  for (const p of items) {
    const doc: any = {
      _id: `servicePage-${p.slug}`,
      _type: "servicePage",
      title: p.title,
      slug: slugify(p.slug),
      heroSubtitle: p.heroSubtitle,
      body: finalizeBlocks(p.body),
      checklist: withKeys(p.checklist),
      ctaBandTitle: p.ctaBandTitle,
      ctaBandText: p.ctaBandText,
      ctaBandBullets: p.ctaBandBullets,
      whyUs: withKeys(p.whyUs),
      faq: withKeys(p.faq),
      seo: p.seo,
    };
    if (p.imageUrl) doc.image = await uploadImage(p.imageUrl);
    await client.createOrReplace(doc);
  }
}

async function migrateProducts(items: any[] | undefined) {
  if (!items) return;
  console.log(`products (${items.length})...`);
  for (const p of items) {
    const doc: any = {
      _id: `product-${p.slug}`,
      _type: "product",
      title: p.title,
      slug: slugify(p.slug),
      brand: p.brand,
      type: p.type,
      btu: p.btu,
      price: p.price,
      oldPrice: p.oldPrice,
      installationIncluded: p.installationIncluded ?? true,
      inStock: true,
      shortDescription: p.shortDescription,
      description: finalizeBlocks(p.description),
      features: p.features,
      specs: p.specs,
      featured: p.featured ?? false,
      seo: p.seo,
    };
    if (p.imageUrl) {
      const img = await uploadImage(p.imageUrl);
      if (img) doc.images = [{ ...img, _key: key() }];
    }
    await client.createOrReplace(doc);
  }
}

async function migrateBlogPosts(items: any[] | undefined) {
  if (!items) return;
  console.log(`blogPosts (${items.length})...`);
  for (const b of items) {
    const doc: any = {
      _id: `blogPost-${b.slug}`,
      _type: "blogPost",
      title: b.title,
      slug: slugify(b.slug),
      category: b.category,
      excerpt: b.excerpt,
      summary: b.summary,
      keyTakeaways: b.keyTakeaways,
      body: finalizeBlocks(b.body),
      faq: withKeys(b.faq),
      publishedAt: b.publishedAt ? new Date(b.publishedAt).toISOString() : undefined,
      author: b.author,
      seo: b.seo,
    };
    if (b.coverImageUrl) doc.coverImage = await uploadImage(b.coverImageUrl);
    await client.createOrReplace(doc);
  }
}

async function main() {
  const mod = await import("../src/lib/placeholder-data.ts");
  await migrateSiteSettings((mod as any).siteSettings);
  await migrateServices((mod as any).services);
  await migrateServicePages((mod as any).servicePages);
  await migrateProducts((mod as any).products);
  await migrateBlogPosts((mod as any).blogPosts);
  console.log("Готово.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
