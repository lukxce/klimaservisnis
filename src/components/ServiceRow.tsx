import Link from "next/link";

import { formatRsd } from "@/lib/format";
import type { Service } from "@/lib/types";

export function ServiceRow({ service, href }: { service: Service; href?: string }) {
  const content = (
    <>
      <div>
        <h3 className="font-semibold text-navy group-hover:text-accent">
          {service.title}
        </h3>
        <p className="mt-1 max-w-xl text-sm text-muted">{service.shortDescription}</p>
        {service.priceNote && (
          <p className="mt-1 text-xs text-muted">{service.priceNote}</p>
        )}
      </div>
      <div className="shrink-0 rounded-full bg-surface px-5 py-2.5 text-center">
        <span className="font-bold text-navy">
          od {formatRsd(service.priceFrom)}
        </span>
        {service.priceTo && (
          <span className="block text-xs text-muted">do {formatRsd(service.priceTo)}</span>
        )}
      </div>
    </>
  );

  const className =
    "group flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between";

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={href} className={`${className} transition hover:shadow-md`}>
      {content}
    </Link>
  );
}
