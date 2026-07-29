import Link from "next/link";
import Image from "next/image";

import { PlaceholderImage } from "@/components/PlaceholderImage";
import { formatRsd } from "@/lib/format";
import { brandSlug, btuBucket, capacitySlug } from "@/lib/shop-taxonomy";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:border-accent/20 hover:shadow-lg">
      <div className="relative h-56 w-full overflow-hidden bg-surface">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            quality={60}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2 transition duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage
            label={`Slika: ${product.title}`}
            tone="light"
            className="h-56 w-full"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="relative z-10 flex items-center gap-2 text-xs">
          <Link
            href={`/shop/marka/${brandSlug(product.brand)}`}
            className="rounded-full bg-surface px-2 py-1 font-medium text-navy hover:bg-accent/10 hover:text-accent"
          >
            {product.brand}
          </Link>
          <Link
            href={`/shop/kapacitet/${capacitySlug(btuBucket(product.btu))}`}
            className="rounded-full bg-surface px-2 py-1 font-medium text-navy hover:bg-accent/10 hover:text-accent"
          >
            {product.btu.toLocaleString("sr-Latn-RS")} BTU
          </Link>
        </div>
        <h3 className="font-semibold text-navy group-hover:text-accent">
          {product.title}
        </h3>
        <p className="text-sm text-muted">{product.shortDescription}</p>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-lg font-bold text-navy">{formatRsd(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted line-through">
              {formatRsd(product.oldPrice)}
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
      <Link
        href={`/shop/${product.slug}`}
        className="absolute inset-0"
        aria-label={product.title}
      />
    </div>
  );
}
