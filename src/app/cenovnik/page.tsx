import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ServiceRow } from "@/components/ServiceRow";
import { ClosingCta } from "@/components/ClosingCta";
import { JsonLd } from "@/components/JsonLd";
import { getServices, getSiteSettings } from "@/lib/data";
import { serviceCategoryLabel } from "@/lib/format";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title =
    settings.seoCenovnik?.title ?? `Cenovnik servisa i montaže klime u ${settings.city}u`;
  const description =
    settings.seoCenovnik?.description ??
    `Cene servisa, montaže, popravke i dijagnostike klima uređaja u ${settings.city}u, pregledno po usluzi i bez skrivenih troškova. Pozovite ${settings.phone}.`;

  return {
    title,
    description,
    alternates: { canonical: "/cenovnik" },
    openGraph: {
      images: [`${SITE_URL}/opengraph-image`], title, description, type: "website", url: `${SITE_URL}/cenovnik` },
  };
}

const categoryOrder = ["servis", "montaza", "popravka", "dijagnostika"];

export default async function CenovnikPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);

  const grouped = categoryOrder
    .map((category) => ({
      category,
      items: services.filter((s) => s.category === category),
    }))
    .filter((group) => group.items.length > 0);

  const experienceYears = settings.foundedYear
    ? new Date().getFullYear() - settings.foundedYear
    : undefined;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Početna", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Cenovnik usluga", item: `${SITE_URL}/cenovnik` },
    ],
  };

  const priceFaq = [
    {
      question: `Koliko košta ugradnja klime u ${settings.city}u?`,
      answer: "Montaža standardnog uređaja od 9 ili 12 BTU košta od 8000 dinara, uključujući osnovnu instalaciju do tri metra. Jače jedinice su nešto skuplje za montirati: 18 BTU od 10000 dinara, a 24 BTU od 12000 dinara, zbog dužih cevi i veće spoljašnje jedinice. Svaki dodatni dužni metar instalacije preko standardne dužine naplaćuje se posebno.",
    },
    {
      question: "Da li se montaža na zgradi razlikuje po ceni od montaže u kući?",
      answer: `Osnovna cena montaže je ista, ali pozicija spoljašnje jedinice na višim spratovima ili fasadi zgrade ponekad zahteva dodatnu opremu za rad na visini, što se dogovara unapred na osnovu procene na licu mesta. Uglavnom radimo montažu u zgradama širom ${settings.city} bez dodatnih komplikacija, uz poštovanje pravila zajednice zgrade.`,
    },
    {
      question: "Koliko košta demontaža stare klime?",
      answer: "Demontaža postojećeg uređaja košta od 3000 dinara. Ako se demontaža radi zajedno sa montažom novog uređaja na istoj poziciji, ponekad je moguć popust na ukupnu cenu, pa vredi pitati prilikom zakazivanja.",
    },
    {
      question: "Da li cena servisa zavisi od jačine uređaja?",
      answer: "Da, veći uređaji (18 i 24 BTU) imaju veći isparivač i turbinu, pa dubinsko pranje traje duže i koristi više sredstva za dezinfekciju, zbog čega je servis nešto skuplji nego kod manjih 9 i 12 BTU jedinica.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: priceFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const servicesJsonLd = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: { "@type": "HVACBusiness", name: settings.title, address: settings.address ? { "@type": "PostalAddress", streetAddress: settings.address, addressLocality: settings.city, addressCountry: "RS" } : undefined, },
    areaServed: settings.city,
    offers: {
      "@type": "Offer",
      priceCurrency: "RSD",
      price: service.priceFrom,
      description: service.priceNote,
    },
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      {servicesJsonLd.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      <PageHero
        eyebrow="Cenovnik usluga"
        title="Cenovnik servisa, montaže i popravke klima uređaja"
        subtitle={`Pregled aktuelnih cena usluga ${settings.title}. Sve cene su orijentacione i mogu zavisiti od tipa i kapaciteta uređaja. Za tačnu ponudu pozovite ili nam pošaljite upit.`}
        primaryCta={{ label: `Pozovite ${settings.phone}`, href: `tel:${settings.phone.replace(/\s/g, "")}` }}
        secondaryCta={{ label: "Prijavite kvar", href: "/kontakt" }}
        stats={[
          ...(settings.workingHours
            ? [{ value: settings.workingHours, label: "mobilna ekipa servisera" }]
            : []),
          { value: `${settings.city} i okolina`, label: "servis, montaža i popravka" },
          ...(experienceYears !== undefined
            ? [{ value: `${experienceYears}+ godina`, label: "iskustva na terenu" }]
            : []),
        ]}
      />

      {/* Intro: what drives montaza/servis pricing in Nis */}
      <section className="py-14">
        <Container className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">Koliko košta ugradnja klime</span>
          <h2 className="mt-2 text-3xl font-bold text-navy">Od čega zavisi cena montaže i servisa</h2>
          <p className="mt-4 text-muted">
            Cena ugradnje klime u {settings.city}u najviše zavisi od jačine uređaja i dužine
            instalacije. Standardna montaža do tri metra je uključena u osnovnu cenu, dok se
            svaki dodatni metar cevi naplaćuje posebno, jer zahteva dodatni bakar, izolaciju i
            radno vreme.
          </p>
          <p className="mt-4 text-muted">
            Isto važi i za servis: veći uređaj znači veći isparivač i turbinu, pa dubinsko
            pranje traje duže. Ispod je pregled cena po usluzi, sa rasponom koji pokriva
            uobičajene slučajeve na terenu u {settings.city}u i okolini.
          </p>
        </Container>
      </section>

      {/* Price table */}
      <section className="py-4">
        <Container>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">Usluge</span>
          <h2 className="mt-2 text-3xl font-bold text-navy">Pregled cena</h2>
          <p className="mt-2 text-muted">
            Cene su prikazane u dinarima. Za preciznu procenu ili zakazivanje termina
            pozovite {settings.phone}.
          </p>

          {grouped.map((group) => (
            <div key={group.category} className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-navy">
                  {serviceCategoryLabel(group.category)}
                </h3>
                <Link
                  href={`/usluge/${group.category}`}
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  Sve o ovoj usluzi →
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {group.items.map((service) => (
                  <ServiceRow
                    key={service.slug}
                    service={service}
                    href={`/usluge/${group.category}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* FAQ: direct answers to the most common price questions */}
      <section className="bg-surface py-14">
        <Container className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">Pitanja o ceni</span>
          <h2 className="mt-2 text-3xl font-bold text-navy">Najčešća pitanja o cenama</h2>
          <div className="mt-8 space-y-6">
            {priceFaq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-navy">{item.question}</h3>
                <p className="mt-1 text-muted">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCta phone={settings.phone} />
    </>
  );
}
