import Link from "next/link";
import Image from "next/image";

import { PlaceholderImage } from "@/components/PlaceholderImage";
import { formatEur } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative h-44 w-full bg-surface">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-contain p-6"
          />
        ) : (
          <PlaceholderImage
            label={`Slika: ${product.title}`}
            tone="light"
            className="h-44 w-full"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-surface px-2 py-1 font-medium text-navy">
            {product.brand}
          </span>
          <span className="rounded-full bg-surface px-2 py-1 font-medium text-navy">
            {product.btu.toLocaleString("sr-Latn-RS")} BTU
          </span>
        </div>
        <h3 className="font-semibold text-navy group-hover:text-accent">
          {product.title}
        </h3>
        <p className="text-sm text-muted">{product.shortDescription}</p>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-lg font-bold text-navy">{formatEur(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted line-through">
              {formatEur(product.oldPrice)}
            </span>
          )}
        </div>
        {product.installationIncluded && (
          <span className="text-xs font-medium text-accent">✓ Montaža uključena</span>
        )}
        <span className="mt-3 inline-block w-fit rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-accent">
          Pogledaj model
        </span>
      </div>
    </Link>
  );
}
