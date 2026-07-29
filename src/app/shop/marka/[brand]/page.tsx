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
import { BRAND_HUBS, brandSlug } from "@/lib/shop-taxonomy";

export async function generateStaticParams() {
  return BRAND_HUBS.map((hub) => ({ brand: hub.slug }));
}

export async function generateMetadata(
  props: PageProps<"/shop/marka/[brand]">,
): Promise<Metadata> {
  const { brand } = await props.params;
  const hub = BRAND_HUBS.find((h) => h.slug === brand);
  if (!hub) return {};

  const settings = await getSiteSettings();
  const title = `${hub.name} klime u ${settings.city}u | cena i ugradnja`;
  const description = `${hub.subtitle} Prodaja i profesionalna ugradnja u ${settings.city}u i okolini.`;

  return {
    title,
    description,
    alternates: { canonical: `/shop/marka/${hub.slug}` },
    openGraph: { title, description, type: "website", url: `${SITE_URL}/shop/marka/${hub.slug}` },
  };
}

export default async function BrandHubPage(
  props: PageProps<"/shop/marka/[brand]">,
) {
  const { brand } = await props.params;
  const hub = BRAND_HUBS.find((h) => h.slug === brand);
  if (!hub) notFound();

  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);
  const brandProducts = products.filter((p) => brandSlug(p.brand) === hub.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Početna", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Prodaja klima", item: `${SITE_URL}/shop` },
      { "@type": "ListItem", position: 3, name: `${hub.name} klime`, item: `${SITE_URL}/shop/marka/${hub.slug}` },
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
        eyebrow="Prodaja po brendu"
        title={`${hub.name} klime u ${settings.city}u`}
        subtitle={hub.subtitle}
        primaryCta={{ label: `Pozovite ${settings.phone}`, href: `tel:${settings.phone.replace(/\s/g, "")}` }}
        secondaryCta={{ label: "Svi modeli", href: "/shop" }}
        breadcrumb={
          <nav className="mb-3 text-sm text-white/60">
            <Link href="/shop" className="hover:text-white">Prodaja klima</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{hub.name}</span>
          </nav>
        }
        stats={[
          { value: `${brandProducts.length} modela`, label: "u ponudi" },
          { value: "Montaža uključena", label: "u cenu svakog uređaja" },
        ]}
      />

      <section className="py-14">
        <Container className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            O brendu
          </span>
          <h2 className="mt-2 text-3xl font-bold text-navy">{hub.name} klima uređaji</h2>
          {hub.intro.map((paragraph, i) => (
            <p key={i} className="mt-4 text-muted">
              {paragraph}
            </p>
          ))}
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <h2 className="text-2xl font-bold text-navy">{hub.name} modeli u ponudi</h2>
          {brandProducts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {brandProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-muted">
              Trenutno nemamo {hub.name} modele u ponudi. Pozovite nas, možemo proveriti
              dostupnost na upit.
            </p>
          )}
        </Container>
      </section>

      {hub.faq.length > 0 && (
        <section className="bg-surface py-14">
          <Container className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Pitanja o {hub.name} klimama
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
            Tražite po kapacitetu umesto po brendu?{" "}
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
