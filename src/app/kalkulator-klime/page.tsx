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
    question: "Koliko je ova procena tačna u odnosu na dolazak servisera?",
    answer:
      "Kalkulator vam daje dobru polaznu tačku pre kupovine, ali serviser na licu mesta uvek može da uoči detalje koje online alat ne vidi, na primer spojene prostorije bez vrata ili neuobičajen raspored prozora. Za standardnu sobu ili dvosoban stan procena kalkulatora i procena na terenu se po pravilu poklapaju.",
  },
  {
    question: "Da li plafon viši od standardnog stvarno menja preporučenu snagu?",
    answer:
      "Da, i to primetno - prostorija sa plafonom preko 3 metra ima veću zapreminu vazduha za hlađenje iako je kvadratura ista, pa kalkulator za takve tavanice dodaje deo na osnovnu procenu.",
  },
  {
    question: "Imam veliki balkon sa staklenim vratima, da li to nešto menja?",
    answer:
      "Staklene površine puštaju više toplote unutra nego zid iste veličine, pa ih približno hvatamo kroz unos o tipu stakla (jednostruko, duplo ili trostruko zastakljeno). Za sobu sa neobično velikim staklenim frontom računajte da će stvarna potrošnja biti na gornjoj granici procene.",
  },
  {
    question: "Zašto kalkulator predlaže veću snagu za stan na poslednjem spratu?",
    answer:
      "Stanovi ispod krova, pogotovo u starijim zgradama bez termoizolacije potkrovlja, leti se zagrevaju znatno brže od stanova na srednjim spratovima, pa kalkulator za njih dodaje koeficijent na osnovnu procenu snage.",
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
        subtitle="Unesite osnovne podatke o prostoriji i za manje od minuta dobijate preporučenu BTU snagu i modele iz naše ponude koji joj odgovaraju."
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
          <h2 className="mt-2 text-2xl font-bold text-navy">Kako dolazimo do preporuke</h2>
          <p className="mt-4 text-muted">
            Računica kreće od kvadrature sobe i osnovne procene potrebne snage po
            kvadratu, a zatim je prilagođavamo stvarnim uslovima prostorije:
            visini plafona, strani sveta na koju gledaju prozori, spratu, stanju
            stolarije i izolacije, i broju osoba koje u prostoriji obično borave.
          </p>
          <p className="mt-4 text-muted">
            U Nišu se ta razlika često vidi između starijih zgrada u centru, sa
            debljim zidovima i manjim prozorima, i novijih naselja sa velikim
            staklenim površinama - kalkulator to hvata kroz unos o izolaciji i
            tipu stakla, ne kroz samu lokaciju. Rezultat se, kao i uvek,
            zaokružuje na realnu prodajnu snagu (9000, 12000, 18000 ili 24000
            BTU); kad procena pređe taj okvir, bolje rešenje je obično
            multi-split sistem nego jedna prevelika klima.
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
