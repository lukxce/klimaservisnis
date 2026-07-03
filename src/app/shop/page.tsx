import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ShopFilters } from "@/components/ShopFilters";
import { JsonLd } from "@/components/JsonLd";
import { getProducts, getSiteSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/site-config";

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
        eyebrow="Shop"
        title="Prodaja klima uređaja sa ugradnjom"
        subtitle={`Svi uređaji dolaze sa profesionalnom montažom uključenom u cenu i garancijom. Radimo sa brendovima: ${settings.brands.join(", ")}.`}
        stats={[
          { value: `${products.length} modela`, label: "u ponudi" },
          { value: `${settings.brands.length} brendova`, label: "provereni proizvođači" },
          { value: "Montaža uključena", label: "u cenu svakog uređaja" },
        ]}
      />

      <section className="py-14">
        <Container>
          <ShopFilters products={products} />
        </Container>
      </section>
    </>
  );
}
