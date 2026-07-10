import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { RichText } from "@/components/RichText";
import { JsonLd } from "@/components/JsonLd";
import { getProductBySlug, getProducts, getSiteSettings } from "@/lib/data";
import { formatEur } from "@/lib/format";
import { SITE_URL } from "@/lib/site-config";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/shop/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const title =
    product.seo?.title ??
    `${product.title} | ${product.btu.toLocaleString("sr-Latn-RS")} BTU, cena ${formatEur(product.price)}`;
  const description =
    product.seo?.description ??
    `${product.shortDescription} Cena ${formatEur(product.price)}${product.installationIncluded ? " sa montažom uključenom" : ""}.`;

  return {
    title,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { title, description, type: "website", url: `${SITE_URL}/shop/${product.slug}` },
  };
}

export default async function ProductDetailPage(
  props: PageProps<"/shop/[slug]">,
) {
  const { slug } = await props.params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Početna", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Prodaja klima", item: `${SITE_URL}/shop` },
      { "@type": "ListItem", position: 3, name: product.title, item: `${SITE_URL}/shop/${product.slug}` },
    ],
  };

  const priceValidUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.imageUrl,
    brand: { "@type": "Brand", name: product.brand },
    description: product.shortDescription,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price,
      priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "HVACBusiness", name: settings.title },
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={productJsonLd} />

      <Container className="py-14">
        <nav className="text-sm text-muted">
          <Link href="/shop" className="hover:text-accent">Prodaja klima</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">{product.title}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            {product.imageUrl ? (
              <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-black/5 bg-surface">
                <Image src={product.imageUrl} alt={product.title} fill className="object-contain p-8" />
              </div>
            ) : (
              <PlaceholderImage
                label={`Slika: ${product.title}`}
                tone="light"
                className="h-80 w-full rounded-3xl border border-black/5"
              />
            )}
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              {product.brand}
            </span>
            <h1 className="mt-1 text-3xl font-bold text-navy sm:text-4xl">{product.title}</h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-3xl font-bold text-navy">{formatEur(product.price)}</span>
              {product.oldPrice && (
                <span className="text-lg text-muted line-through">{formatEur(product.oldPrice)}</span>
              )}
            </div>
            {product.installationIncluded && (
              <span className="mt-3 inline-block rounded-full bg-surface px-4 py-1.5 text-sm font-medium text-accent">
                ✓ U cenu uključena profesionalna montaža
              </span>
            )}

            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              <div className="min-w-0 rounded-xl bg-surface p-3 sm:p-4">
                <div className="break-words text-[11px] font-semibold uppercase text-muted sm:text-xs sm:tracking-wide">
                  Energetski razred
                </div>
                <div className="mt-1 truncate font-semibold text-navy">
                  {product.specs?.energyClassCooling ?? "—"}
                </div>
              </div>
              <div className="min-w-0 rounded-xl bg-surface p-3 sm:p-4">
                <div className="break-words text-[11px] font-semibold uppercase text-muted sm:text-xs sm:tracking-wide">
                  Kapacitet
                </div>
                <div className="mt-1 truncate font-semibold text-navy">
                  {product.btu.toLocaleString("sr-Latn-RS")} BTU
                </div>
              </div>
              <div className="min-w-0 rounded-xl bg-surface p-3 sm:p-4">
                <div className="break-words text-[11px] font-semibold uppercase text-muted sm:text-xs sm:tracking-wide">
                  Proizvođač
                </div>
                <div className="mt-1 truncate font-semibold text-navy">{product.brand}</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border-l-4 border-accent bg-surface p-6">
              <p className="text-sm text-muted">Za porudžbinu ili dodatne informacije pozovite</p>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="mt-1 block text-2xl font-bold text-navy hover:text-accent"
              >
                {settings.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {product.specs?.warranty && (
            <div className="rounded-2xl bg-surface p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Garancija</span>
              <h3 className="mt-1 text-xl font-bold text-navy">{product.specs.warranty} garancije</h3>
              <p className="mt-2 text-sm text-muted">
                Uz kupovinu i profesionalnu montažu dobijate jasne uslove garancije i
                podršku za uređaj.
              </p>
            </div>
          )}

          <div className="rounded-2xl bg-surface p-6">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">Brendovi</span>
            <h3 className="mt-1 text-xl font-bold text-navy">U ponudi imamo proverene svetske brendove</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {settings.brands.map((brand) => (
                <span
                  key={brand}
                  className="rounded-full bg-white px-3 py-1 text-sm font-medium text-navy shadow-sm"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">Opis proizvoda</span>
          <h2 className="mt-1 text-2xl font-bold text-navy">Detalji o modelu {product.title}</h2>
          <p className="mt-4 text-muted">{product.shortDescription}</p>

          {product.features && product.features.length > 0 && (
            <>
              <h3 className="mt-6 font-semibold text-navy">Najvažnije karakteristike</h3>
              <ul className="mt-3 space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-1 text-accent">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {product.specs && (
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-black/5 pt-6 text-sm sm:grid-cols-4">
              {product.specs.energyClassCooling && (
                <div>
                  <div className="text-xs text-muted">Energetski razred (hlađenje)</div>
                  <div className="font-medium text-navy">{product.specs.energyClassCooling}</div>
                </div>
              )}
              {product.specs.energyClassHeating && (
                <div>
                  <div className="text-xs text-muted">Energetski razred (grejanje)</div>
                  <div className="font-medium text-navy">{product.specs.energyClassHeating}</div>
                </div>
              )}
              {product.specs.gasType && (
                <div>
                  <div className="text-xs text-muted">Tip gasa</div>
                  <div className="font-medium text-navy">{product.specs.gasType}</div>
                </div>
              )}
              <div>
                <div className="text-xs text-muted">Wi-Fi</div>
                <div className="font-medium text-navy">{product.specs.wifi ? "Da" : "Ne"}</div>
              </div>
            </div>
          )}

          {product.description ? <RichText value={product.description} /> : null}
        </div>
      </Container>
    </>
  );
}
