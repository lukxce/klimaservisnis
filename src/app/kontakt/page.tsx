import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/data";
import { formatServiceAreas } from "@/lib/format";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = "Kontakt";
  const description = `Pozovite ${settings.phone} ili nas posetite u ${settings.address ?? settings.city}. Radno vreme: ${settings.workingHours ?? ""}.`;

  return {
    title,
    description,
    alternates: { canonical: "/kontakt" },
    openGraph: {
      title: `${title} | ${settings.title}`,
      description,
      type: "website",
      url: `${SITE_URL}/kontakt`,
    },
  };
}

export default async function KontaktPage() {
  const settings = await getSiteSettings();

  return (
    <Container className="py-14">
      <span className="text-sm font-semibold uppercase tracking-wide text-accent">Kontakt</span>
      <h1 className="mt-2 text-4xl font-bold text-navy">Tu smo za servis, montažu ili savet</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Bez obzira da li zakazujete servis, prijavljujete kvar, planirate kupovinu
        nove klime ili vam samo treba savet pre montaže, javite nam se telefonom
        ili preko forme, odgovaramo brzo i izlazimo na teren u {settings.city}u i okolini.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-navy">Telefon</h2>
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="mt-1 block text-2xl font-bold text-accent"
            >
              {settings.phone}
            </a>
            {settings.phoneSecondary && (
              <a
                href={`tel:${settings.phoneSecondary.replace(/\s/g, "")}`}
                className="mt-1 block text-muted hover:text-accent"
              >
                {settings.phoneSecondary}
              </a>
            )}
          </div>

          {settings.email && (
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-navy">Email</h2>
              <a href={`mailto:${settings.email}`} className="mt-1 block text-accent hover:underline">
                {settings.email}
              </a>
            </div>
          )}

          {settings.address && (
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-navy">Adresa</h2>
              <p className="mt-1 text-muted">{settings.address}</p>
              {settings.workingHours && <p className="mt-1 text-sm text-muted">{settings.workingHours}</p>}
            </div>
          )}

          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-navy">Oblasti pokrivanja</h2>
            <p className="mt-1 text-muted">
              {formatServiceAreas(settings.city, settings.serviceAreas)}
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </Container>
  );
}
