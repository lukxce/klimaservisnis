import { Container } from "@/components/Container";

export function ClosingCta({ phone }: { phone: string }) {
  return (
    <section className="py-10">
      <Container>
        <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-light p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Napomena
            </span>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Niste sigurni koja usluga vam je potrebna?
            </h2>
            <p className="mt-2 max-w-xl text-white/70">
              Pozovite nas i opišite problem. Pomoći ćemo vam da dobijete okvirnu
              procenu i dogovorimo izlazak servisera.
            </p>
          </div>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            Pozovite {phone}
          </a>
        </div>
      </Container>
    </section>
  );
}
