import type { ReactNode } from "react";

import { Container } from "@/components/Container";

type Stat = {
  value: string;
  label: string;
};

type Cta = {
  label: string;
  href: string;
};

function AccentBadge() {
  return (
    <div className="relative hidden h-full w-full items-center justify-center md:flex">
      <div className="absolute h-56 w-56 rounded-full bg-accent/20 blur-2xl" />
      <div className="absolute -top-4 right-6 h-16 w-16 rounded-2xl bg-accent/30" />
      <div className="absolute bottom-2 left-2 h-10 w-10 rounded-full bg-white/10" />
      <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] bg-white/10 backdrop-blur">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-20 w-20 text-white">
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.2" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  stats,
  breadcrumb,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  stats?: Stat[];
  breadcrumb?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <Container className="relative grid grid-cols-1 gap-8 py-16 md:grid-cols-[1fr_auto] md:items-center md:py-20">
        <div>
          {breadcrumb}
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {eyebrow}
          </span>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mt-4 max-w-2xl text-white/70">{subtitle}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                >
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-navy"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>
        <div className="hidden h-48 w-48 md:block">
          <AccentBadge />
        </div>
      </Container>

      {stats && stats.length > 0 && (
        <Container className="relative z-10 pb-14 md:pb-20">
          <div className="overflow-hidden rounded-2xl border border-black/5 bg-white text-navy shadow-lg sm:overflow-visible sm:rounded-none sm:border-none sm:bg-transparent sm:shadow-none sm:grid sm:grid-cols-3 sm:gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-0.5 px-5 py-4 sm:block sm:rounded-2xl sm:border sm:border-black/5 sm:bg-white sm:p-5 sm:shadow-lg ${
                  i !== stats.length - 1 ? "border-b border-black/5 sm:border-b-0" : ""
                }`}
              >
                <span className="text-xs text-muted sm:hidden">{stat.label}</span>
                <span className="font-bold sm:block">{stat.value}</span>
                <span className="hidden text-sm text-muted sm:block">{stat.label}</span>
              </div>
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}
