#!/usr/bin/env node
/**
 * One-shot script: patches heroTitle + SEO fields on all 4 servicePage
 * documents in the Sanity dataset.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/patch-hero-titles.mjs
 */

import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId: "d10dfhk5",
  dataset: "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const patches = [
  {
    id: "servicePage-servis",
    heroTitle: "Servis klima uređaja u Nišu",
    seo: {
      title: "Servis klima uređaja u Nišu | čišćenje klime, cene",
      description:
        "Profesionalni servis i čišćenje klima uređaja u Nišu i okolini. Redovno održavanje, dopuna freona, dezinfekcija. Pozovite 062 649 40 49.",
    },
  },
  {
    id: "servicePage-montaza",
    heroTitle: "Montaža i ugradnja klime u Nišu",
    seo: {
      title: "Montaža klime u Nišu | ugradnja klime, postavljanje, cene",
      description:
        "Profesionalna montaža i ugradnja klima uređaja u Nišu. Postavljanje klime na zgradi i kući, standardna i nestandardna montaža. Pozovite 062 649 40 49.",
    },
  },
  {
    id: "servicePage-popravka",
    heroTitle: "Popravka klima uređaja u Nišu",
    seo: {
      title: "Popravka klima uređaja u Nišu | kvar na klimi, dijagnostika",
      description:
        "Brza popravka klima uređaja u Nišu. Otklanjanje kvarova, zamena delova, servis kompresora. Dolazak isti dan. Pozovite 062 649 40 49.",
    },
  },
  {
    id: "servicePage-dijagnostika",
    heroTitle: "Dijagnostika kvara na klimi u Nišu",
    seo: {
      title: "Dijagnostika kvara na klimi u Nišu | pregled, greške",
      description:
        "Stručna dijagnostika kvarova na klima uređajima u Nišu. Očitavanje error kodova, merenje pritiska, provera električne instalacije. Pozovite 062 649 40 49.",
    },
  },
];

console.log("Patching 4 servicePage documents in project d10dfhk5...\n");

let ok = 0;
let fail = 0;

for (const { id, heroTitle, seo } of patches) {
  try {
    const doc = await client.getDocument(id);
    if (!doc) {
      console.log(`  ⚠  ${id} — document not found, skipping`);
      fail++;
      continue;
    }
    await client.patch(id).set({ heroTitle, seo }).commit();
    console.log(`  ✓  ${id} → heroTitle: "${heroTitle}"`);
    ok++;
  } catch (err) {
    console.error(`  ✗  ${id} — ${err.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} patched, ${fail} failed.`);
if (fail > 0) process.exit(1);
