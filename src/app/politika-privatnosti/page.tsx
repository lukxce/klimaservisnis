import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { getSiteSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = `Politika privatnosti | ${settings.title}`;
  const description = `Politika privatnosti i informacije o vlasništvu sajta ${settings.title}.`;

  return {
    title,
    description,
    alternates: { canonical: "/politika-privatnosti" },
    robots: { index: false, follow: true },
    openGraph: {
      images: [`${SITE_URL}/opengraph-image`],
      title,
      description,
      type: "website",
      url: `${SITE_URL}/politika-privatnosti`,
    },
  };
}

export default async function PolitikaPrivatnostiPage() {
  const settings = await getSiteSettings();

  return (
    <Container className="py-14">
      <span className="font-mono text-sm font-semibold uppercase tracking-wide text-accent">
        Pravne informacije
      </span>
      <h1 className="mt-2 text-4xl font-bold text-navy">Politika privatnosti</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Poslednje ažurirano: {new Date().toLocaleDateString("sr-Latn-RS", { year: "numeric", month: "long" })}.
      </p>

      <div className="mt-10 max-w-3xl space-y-10">
        <section>
          <h2 className="text-xl font-bold text-navy">Vlasništvo sajta i izvođenje usluga</h2>
          <p className="mt-3 text-muted">
            Sajt {settings.title} u vlasništvu je i pod upravom kompanije DIGITL. Kompanija DIGITL
            upravlja sajtom, oglašavanjem i zakazivanjem, ali usluge prikazane na sajtu (isušivanje
            vlage, iznajmljivanje i najam mašina, sanacija posle poplave i ostale usluge) izvodi
            nezavisni izvođač, samostalni preduzetnik ili firma kojoj je ovaj sajt ustupljen radi
            oglašavanja i zakazivanja usluga u {settings.city}u i okolini.
          </p>
          <p className="mt-3 text-muted">Nezavisni izvođač je isključivo odgovoran za:</p>
          <ul className="mt-3 space-y-2 text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-accent">•</span>
              <span>kvalitet, obim i način izvođenja usluga koje pruža,</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-accent">•</span>
              <span>posedovanje odgovarajuće registracije delatnosti, dozvola i licenci,</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-accent">•</span>
              <span>osiguranje od profesionalne i opšte odgovornosti i eventualnu štetu nastalu tokom izvođenja usluga,</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-accent">•</span>
              <span>poštovanje svih važećih zakona i propisa u vezi sa delatnošću koju obavlja.</span>
            </li>
          </ul>
          <p className="mt-3 text-muted">
            DIGITL, kao vlasnik sajta, ne izvodi usluge prikazane na sajtu, ne učestvuje u izvođenju
            radova i ne snosi odgovornost za kvalitet, ishod ili eventualnu štetu nastalu prilikom
            pružanja usluga od strane izvođača. Sajt služi kao platforma za oglašavanje i
            uspostavljanje kontakta između korisnika i izvođača, a ugovorni odnos u vezi sa samom
            uslugom nastaje neposredno između korisnika i izvođača.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy">Koje podatke prikupljamo</h2>
          <p className="mt-3 text-muted">
            Putem kontakt forme na sajtu prikupljamo podatke koje nam sami dostavite: ime, broj
            telefona, email adresu i sadržaj poruke ili upita. Ove podatke prikupljamo isključivo
            radi odgovaranja na vaš upit i organizovanja zakazane usluge.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy">Kako koristimo podatke</h2>
          <p className="mt-3 text-muted">
            Vaše podatke koristimo isključivo radi kontaktiranja u vezi sa vašim upitom i
            prosleđivanja izvođaču radi realizacije zakazane usluge. Ne prodajemo i ne ustupamo
            vaše podatke trećim licima u marketinške svrhe, niti ih koristimo za slanje
            neželjenih poruka bez vaše saglasnosti.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy">Kolačići (cookies)</h2>
          <p className="mt-3 text-muted">
            Sajt koristi samo osnovne, tehnički neophodne kolačiće potrebne za ispravan rad
            stranice. Ne koristimo kolačiće trećih strana za praćenje ponašanja korisnika u
            reklamne svrhe.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy">Vaša prava</h2>
          <p className="mt-3 text-muted">
            U skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije, imate pravo da u
            svakom trenutku zatražite uvid, izmenu ili brisanje podataka koje smo o vama
            zabeležili. Zahtev možete poslati na email adresu navedenu u nastavku.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy">Kontakt</h2>
          <p className="mt-3 text-muted">
            Za sva pitanja u vezi sa ovom politikom privatnosti ili obradom vaših podataka,
            pišite nam na{" "}
            {settings.email ? (
              <a href={`mailto:${settings.email}`} className="font-semibold text-accent hover:underline">
                {settings.email}
              </a>
            ) : (
              "email adresu navedenu u zaglavlju sajta"
            )}
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
