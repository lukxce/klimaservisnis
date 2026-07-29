import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ShopFilters } from "@/components/ShopFilters";
import { JsonLd } from "@/components/JsonLd";
import { getProducts, getSiteSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/site-config";
import { BRAND_HUBS, CAPACITY_HUBS, capacitySlug } from "@/lib/shop-taxonomy";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title =
    settings.seoShop?.title ?? `Prodaja klima uređaja u ${settings.city}u | katalog sa ugradnjom`;
  const description =
    settings.seoShop?.description ??
    `Klima uređaji svih vodećih brendova (${settings.brands.slice(0, 4).join(", ")}...) sa profesionalnom montažom uključenom u cenu.`;

  return {
    title,
    description,
    alternates: { canonical: "/shop" },
    openGraph: { title, description, type: "website", url: `${SITE_URL}/shop` },
  };
}

export default async function ShopPage() {
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Početna", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Prodaja klima", item: `${SITE_URL}/shop` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <PageHero
        eyebrow="Prodaja"
        title={`Prodaja klima uređaja u ${settings.city}u`}
        subtitle={`Klima uređaji sa profesionalnom montažom uključenom u cenu i garancijom, isporuka i ugradnja u ${settings.city}u i okolini. Radimo sa brendovima: ${settings.brands.join(", ")}.`}
        stats={[
          { value: `${products.length} modela`, label: "u ponudi" },
          { value: `${settings.brands.length} brendova`, label: "provereni proizvođači" },
          { value: "Montaža uključena", label: "u cenu svakog uređaja" },
        ]}
      />

      <section className="pt-14">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                Pretraga po brendu
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {BRAND_HUBS.map((hub) => (
                  <Link
                    key={hub.slug}
                    href={`/shop/marka/${hub.slug}`}
                    className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-navy transition hover:border-accent hover:text-accent"
                  >
                    {hub.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                Pretraga po kapacitetu
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {CAPACITY_HUBS.map((hub) => (
                  <Link
                    key={hub.btu}
                    href={`/shop/kapacitet/${capacitySlug(hub.btu)}`}
                    className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-navy transition hover:border-accent hover:text-accent"
                  >
                    {hub.btu.toLocaleString("sr-Latn-RS")} BTU ({hub.colloquial})
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <ShopFilters products={products} />
        </Container>
      </section>
    </>
  );
}
