import Link from "next/link";

import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { getSiteSettings } from "@/lib/data";
import { formatServiceAreas } from "@/lib/format";

const serviceLinks = [
  { href: "/usluge/servis", label: "Servis klima uređaja" },
  { href: "/usluge/montaza", label: "Montaža klima uređaja" },
  { href: "/usluge/popravka", label: "Popravka klima uređaja" },
  { href: "/usluge/dijagnostika", label: "Dijagnostika kvara" },
];

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 bg-navy text-white">
      <div className="h-1 bg-gradient-to-r from-accent via-sky-400 to-accent-dark" />
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold">
            <Logo title={settings.title} />
          </h3>
          <p className="mt-2 text-sm text-white/70">{settings.tagline}</p>
          {settings.foundedYear && (
            <p className="mt-4 text-sm text-white/50">
              Radimo od {settings.foundedYear}. godine
            </p>
          )}
          <p className="mt-2 text-sm text-white/70">
            {formatServiceAreas(settings.city, settings.serviceAreas)}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Brzi linkovi
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/cenovnik" className="hover:text-accent">Cenovnik usluga</Link></li>
            <li><Link href="/shop" className="hover:text-accent">Prodaja klima uređaja</Link></li>
            <li><Link href="/blog" className="hover:text-accent">Blog</Link></li>
            <li><Link href="/kontakt" className="hover:text-accent">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Usluge
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Kontakt
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {settings.phone}
              </a>
            </li>
            {settings.email && (
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-accent">
                  {settings.email}
                </a>
              </li>
            )}
            {settings.address && <li>{settings.address}</li>}
            {settings.workingHours && <li>{settings.workingHours}</li>}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <span>© {year} {settings.title}. Sva prava zadržana.</span>
          <span>{settings.brands.join(" · ")}</span>
        </Container>
      </div>
    </footer>
  );
}
