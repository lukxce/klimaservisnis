import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { KlimaCalculator } from "@/components/KlimaCalculator";
import { JsonLd } from "@/components/JsonLd";
import { getSiteSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/site-config";

const PATH = "/kalkulator-klime";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = `Kalkulator klime u ${settings.city}u | koja snaga mi treba`;
  const description = `Izračunajte koja BTU snaga klime vam treba na osnovu kvadrature, orijentacije i sprata, i vidite koji modeli u ${settings.city}u odgovaraju.`;

  return {
    title,
    description,
    alternates: { canonical: PATH },
    openGraph: {
      images: [`${SITE_URL}/opengraph-image`],
      title,
      description,
      type: "website",
      url: `${SITE_URL}${PATH}`,
    },
  };
}

const faq = [
  {
    question: "Da li je rezultat kalkulatora tačan kao procena servisera?",
    answer:
      "Kalkulator daje dobru okvirnu procenu na osnovu kvadrature, orijentacije, sprata, izolacije i broja osoba, ali za graničan slučaj, na primer prostoriju sa dosta staklenih površina ili neobičnim oblikom, preporučujemo i kratak razgovor sa serviserom pre kupovine.",
  },
  {
    question: "Zašto je važna orijentacija prostorije?",
    answer:
      "Prostorija okrenuta ka jugu ili zapadu prima znatno više direktnog sunca tokom dana, pa se zagreva brže i klima mora da radi jače da održi istu temperaturu u odnosu na severnu ili istočnu sobu iste veličine.",
  },
  {
    question: "Šta ako mi kalkulator predloži 24000 BTU sa napomenom o multi-splitu?",
    answer:
      "To znači da je prostorija na granici gde jedna standardna klima teško održava temperaturu. Multi-split sistem ili podela na dve manje zone su obično bolje i isplativije rešenje od jedne prevelike jedinice.",
  },
];

export default async function KalkulatorKlimePage() {
  const settings = await getSiteSettings();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Početna", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Kalkulator klime", item: `${SITE_URL}${PATH}` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <PageHero
        eyebrow="Besplatan alat"
        title={`Koja klima mi treba za ${settings.city}?`}
        subtitle="Odgovorite na nekoliko pitanja o prostoriji i dobićete preporučenu snagu u BTU, plus modele iz naše ponude koji joj odgovaraju."
        breadcrumb={
          <nav className="mb-3 text-sm text-muted">
            <Link href="/" className="hover:text-accent">Početna</Link>
            <span className="mx-2">/</span>
            <span className="text-navy">Kalkulator klime</span>
          </nav>
        }
      />

      <section className="py-14">
        <Container className="max-w-2xl">
          <KlimaCalculator phone={settings.phone} />
        </Container>
      </section>

      <section className="border-t border-black/5 bg-surface py-14">
        <Container className="max-w-3xl">
          <span className="font-mono text-sm font-semibold uppercase tracking-wide text-accent">
            Kako računamo
          </span>
          <h2 className="mt-2 text-2xl font-bold text-navy">Šta ulazi u procenu</h2>
          <p className="mt-4 text-muted">
            Polazimo od kvadrature prostorije i standardne procene snage po metru
            kvadratnom, pa je korigujemo prema stvarnim uslovima: viši plafon i
            južna ili zapadna orijentacija znače da klima mora jače da radi, dok
            dobra izolacija i novije, duplo zastakljeno staklo smanjuju potrebnu
            snagu. Sprat pod krovom i broj osoba u prostoriji takođe utiču na
            konačnu procenu.
          </p>
          <p className="mt-4 text-muted">
            Rezultat se zaokružuje na stvarnu prodajnu snagu (9000, 12000, 18000
            ili 24000 BTU), jer se klime ne prave u proizvoljnim kapacitetima.
            Ako izračunata snaga pređe ono što jedna standardna klima realno
            može da pokrije, predlažemo multi-split sistem umesto predimenzionisane
            jedinice.
          </p>
        </Container>
      </section>

      <section className="py-14">
        <Container className="max-w-3xl">
          <span className="font-mono text-sm font-semibold uppercase tracking-wide text-accent">
            Pitanja
          </span>
          <h2 className="mt-2 text-2xl font-bold text-navy">Često postavljana pitanja</h2>
          <div className="mt-6 space-y-6">
            {faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-navy">{item.question}</h3>
                <p className="mt-1 text-sm text-muted">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
