import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/Container";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ServiceCard } from "@/components/ServiceCard";
import { ProductCard } from "@/components/ProductCard";
import { BlogCard } from "@/components/BlogCard";
import { ClosingCta } from "@/components/ClosingCta";
import {
  getSiteSettings,
  getFeaturedServices,
  getFeaturedProducts,
  getBlogPosts,
} from "@/lib/data";
import { formatServiceAreas } from "@/lib/format";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = `Klima servis ${settings.city} | Servis, montaža i prodaja klima uređaja`;
  const description = `Servis, montaža, popravka i prodaja klima uređaja u ${settings.city}u i okolini. Brz izlazak na teren, garancija na radove. Pozovite ${settings.phone}.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/" },
    openGraph: { title, description, type: "website", url: SITE_URL },
  };
}

export default async function HomePage() {
  const [settings, featuredServices, featuredProducts, posts] = await Promise.all([
    getSiteSettings(),
    getFeaturedServices(),
    getFeaturedProducts(),
    getBlogPosts(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(rgba(11,21,38,0.14) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to bottom, black, transparent 70%)",
          }}
        />
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <Container className="relative grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {settings.title}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-navy sm:text-5xl">
              Servis, montaža i prodaja klima uređaja u {settings.city}u
            </h1>
            <p className="mt-4 max-w-md text-muted">
              Brz izlazak na teren, transparentne cene i {settings.foundedYear ? `preko ${new Date().getFullYear() - settings.foundedYear} godina` : "dugogodišnje"} iskustva sa svim vodećim brendovima klima uređaja.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-dark"
              >
                Pogledajte klime
              </Link>
              <a
                href="#usluge"
                className="rounded-full border border-navy/15 bg-white/60 px-6 py-3 text-sm font-semibold text-navy backdrop-blur transition hover:bg-navy hover:text-white"
              >
                Pogledajte usluge
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy/80">
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Izlazak na teren isti dan
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Garancija na sve radove
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Cena poznata unapred
              </li>
            </ul>
          </div>
          {settings.heroImageUrl ? (
            <div className="relative h-72 w-full overflow-hidden rounded-3xl shadow-xl shadow-navy/10 sm:h-96">
              <Image src={settings.heroImageUrl} alt={settings.title} fill className="object-cover" />
            </div>
          ) : (
            <PlaceholderImage
              label="Hero slika: instalacija klime u modernom enterijeru"
              className="h-72 w-full rounded-3xl sm:h-96"
            />
          )}
        </Container>
        <div className="relative border-t border-black/5 bg-white/70 backdrop-blur">
          <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-sm font-medium text-navy/50">
            <span className="text-xs font-semibold uppercase tracking-wide text-navy/40">
              Radimo sa brendovima
            </span>
            {settings.brands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </Container>
        </div>
      </section>

      {/* Featured services */}
      <section id="usluge" className="scroll-mt-24 py-16">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                Usluge
              </span>
              <h2 className="mt-2 text-3xl font-bold text-navy">Najtraženije usluge</h2>
            </div>
            <Link href="/cenovnik" className="hidden text-sm font-semibold text-accent hover:underline sm:block">
              Kompletan cenovnik →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service, i) => (
              <div key={service.slug} className={i === 3 ? "hidden sm:block" : ""}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:hidden">
            <Link
              href="/cenovnik"
              className="rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
              Pogledajte cenovnik
            </Link>
            <Link
              href="/usluge"
              className="rounded-full border border-navy/15 px-6 py-3 text-center text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
            >
              Vidi sve usluge
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured products */}
      <section className="bg-surface py-16">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                Katalog klima
              </span>
              <h2 className="mt-2 text-3xl font-bold text-navy">Izdvojeni klima uređaji</h2>
            </div>
            <Link href="/shop" className="hidden text-sm font-semibold text-accent hover:underline sm:block">
              Kompletan katalog →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-6 sm:hidden">
            <Link
              href="/shop"
              className="block rounded-full bg-navy px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-navy-light"
            >
              Pogledajte sve modele
            </Link>
          </div>
        </Container>
      </section>

      {/* About */}
      <section className="bg-navy py-16 text-white">
        <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {settings.aboutImageUrl ? (
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image src={settings.aboutImageUrl} alt={settings.title} fill className="object-cover" />
            </div>
          ) : (
            <PlaceholderImage
              label="Slika: serviser na terenu"
              tone="navy"
              className="h-72 w-full rounded-3xl sm:h-96"
            />
          )}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              O nama
            </span>
            <h2 className="mt-2 text-3xl font-bold">
              Servis klima uređaja sa iskustvom na terenu
            </h2>
            <p className="mt-4 text-white/70">
              {settings.title} pruža usluge servisa, montaže, popravke i prodaje
              klima uređaja {settings.foundedYear ? `od ${settings.foundedYear}. godine` : ""}.
              Pokrivamo: {formatServiceAreas(settings.city, settings.serviceAreas)}.
            </p>
            <p className="mt-3 text-white/70">
              Radimo sa proverenim brendovima: {settings.brands.join(", ")}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
              >
                Pozovite {settings.phone}
              </a>
              <Link
                href="/kontakt"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-navy"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA strip */}
      <section className="py-16">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Link
            href="/cenovnik"
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Cenovnik
            </span>
            <h3 className="mt-2 text-lg font-semibold text-navy">Proverite cene usluga</h3>
            <p className="mt-1 text-sm text-muted">
              Servis, montaža, popravka i dodatni radovi prikazani pregledno.
            </p>
          </Link>
          <Link
            href="/shop"
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Shop
            </span>
            <h3 className="mt-2 text-lg font-semibold text-navy">Kupite novu klimu</h3>
            <p className="mt-1 text-sm text-muted">
              Pregledajte katalog uređaja sa montažom uključenom u cenu.
            </p>
          </Link>
          <Link
            href="/kontakt"
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Kvar
            </span>
            <h3 className="mt-2 text-lg font-semibold text-navy">Prijavite kvar</h3>
            <p className="mt-1 text-sm text-muted">
              Opišite problem i dogovorite izlazak servisera.
            </p>
          </Link>
        </Container>
      </section>

      {/* Blog preview */}
      <section className="bg-surface py-16">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                Blog
              </span>
              <h2 className="mt-2 text-3xl font-bold text-navy">Korisni tekstovi o klimama</h2>
            </div>
            <Link href="/blog" className="hidden text-sm font-semibold text-accent hover:underline sm:block">
              Ceo blog →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <ClosingCta phone={settings.phone} />
    </>
  );
}
