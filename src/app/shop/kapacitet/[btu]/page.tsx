import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { ClosingCta } from "@/components/ClosingCta";
import { JsonLd } from "@/components/JsonLd";
import { getProducts, getSiteSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/site-config";
import { CAPACITY_HUBS, btuBucket, capacitySlug } from "@/lib/shop-taxonomy";

export async function generateStaticParams() {
  return CAPACITY_HUBS.map((hub) => ({ btu: capacitySlug(hub.btu) }));
}

function findHub(slug: string) {
  return CAPACITY_HUBS.find((h) => capacitySlug(h.btu) === slug);
}

export async function generateMetadata(
  props: PageProps<"/shop/kapacitet/[btu]">,
): Promise<Metadata> {
  const { btu } = await props.params;
  const hub = findHub(btu);
  if (!hub) return {};

  const settings = await getSiteSettings();
  const title = `Klima ${hub.btu.toLocaleString("sr-Latn-RS")} BTU (${hub.colloquial}) u ${settings.city}u | cena i ugradnja`;
  const description = `Klima uređaji od ${hub.btu.toLocaleString("sr-Latn-RS")} BTU za prostorije ${hub.roomSize} u ${settings.city}u, sa profesionalnom montažom uključenom u cenu.`;

  return {
    title,
    description,
    alternates: { canonical: `/shop/kapacitet/${capacitySlug(hub.btu)}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/shop/kapacitet/${capacitySlug(hub.btu)}`,
    },
  };
}

export default async function CapacityHubPage(
  props: PageProps<"/shop/kapacitet/[btu]">,
) {
  const { btu } = await props.params;
  const hub = findHub(btu);
  if (!hub) notFound();

  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);
  const capacityProducts = products.filter((p) => btuBucket(p.btu) === hub.btu);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Početna", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Prodaja klima", item: `${SITE_URL}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: `Klima ${hub.btu.toLocaleString("sr-Latn-RS")} BTU`,
        item: `${SITE_URL}/shop/kapacitet/${capacitySlug(hub.btu)}`,
      },
    ],
  };

  const faqJsonLd = hub.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: hub.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <PageHero
        eyebrow="Prodaja po kapacitetu"
        title={`Klima ${hub.btu.toLocaleString("sr-Latn-RS")} BTU (${hub.colloquial}) u ${settings.city}u`}
        subtitle={`Za prostorije ${hub.roomSize}. Profesionalna montaža uključena u cenu svakog uređaja.`}
        primaryCta={{ label: `Pozovite ${settings.phone}`, href: `tel:${settings.phone.replace(/\s/g, "")}` }}
        secondaryCta={{ label: "Svi modeli", href: "/shop" }}
        breadcrumb={
          <nav className="mb-3 text-sm text-white/60">
            <Link href="/shop" className="hover:text-white">Prodaja klima</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{hub.btu.toLocaleString("sr-Latn-RS")} BTU</span>
          </nav>
        }
        stats={[
          { value: `${capacityProducts.length} modela`, label: "u ponudi" },
          { value: hub.roomSize, label: "preporučena površina" },
        ]}
      />

      <section className="py-14">
        <Container className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Za koji prostor
          </span>
          <h2 className="mt-2 text-3xl font-bold text-navy">
            Klima {hub.btu.toLocaleString("sr-Latn-RS")} BTU: {hub.colloquial}
          </h2>
          {hub.intro.map((paragraph, i) => (
            <p key={i} className="mt-4 text-muted">
              {paragraph}
            </p>
          ))}
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <h2 className="text-2xl font-bold text-navy">
            Modeli od {hub.btu.toLocaleString("sr-Latn-RS")} BTU u ponudi
          </h2>
          {capacityProducts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {capacityProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-muted">
              Trenutno nemamo modele ovog kapaciteta u ponudi. Pozovite nas, možemo
              proveriti dostupnost na upit.
            </p>
          )}
        </Container>
      </section>

      {hub.faq.length > 0 && (
        <section className="bg-surface py-14">
          <Container className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Pitanja o kapacitetu
            </span>
            <h2 className="mt-2 text-3xl font-bold text-navy">Najčešća pitanja</h2>
            <div className="mt-8 space-y-6">
              {hub.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold text-navy">{item.question}</h3>
                  <p className="mt-1 text-muted">{item.answer}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-10">
        <Container>
          <p className="text-sm text-muted">
            Tražite po brendu umesto po kapacitetu?{" "}
            <Link href="/shop" className="font-semibold text-accent hover:underline">
              Pogledajte ceo katalog i filtere
            </Link>
            .
          </p>
        </Container>
      </section>

      <ClosingCta phone={settings.phone} />
    </>
  );
}
