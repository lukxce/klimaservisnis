import Link from "next/link";
import Image from "next/image";

import { PlaceholderImage } from "@/components/PlaceholderImage";
import { formatRsd, serviceCategoryLabel } from "@/lib/format";
import type { Service } from "@/lib/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/usluge/${service.category}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:border-accent/20 hover:shadow-lg"
    >
      <div className="relative h-40 w-full overflow-hidden">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage label={`Slika: ${service.title}`} className="h-40 w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          {serviceCategoryLabel(service.category)}
        </span>
        <h3 className="font-semibold text-navy group-hover:text-accent">
          {service.title}
        </h3>
        <p className="text-sm text-muted">{service.shortDescription}</p>
        <div className="mt-auto pt-2 text-lg font-bold text-navy">
          od {formatRsd(service.priceFrom)}
          {service.priceTo && (
            <span className="text-sm font-normal text-muted"> do {formatRsd(service.priceTo)}</span>
          )}
        </div>
        {service.priceNote && (
          <span className="text-xs text-muted">{service.priceNote}</span>
        )}
      </div>
    </Link>
  );
}
