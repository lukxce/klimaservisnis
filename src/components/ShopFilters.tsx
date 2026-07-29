"use client";

import { useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

type SortOption = "preporuceno" | "cena-rastuce" | "cena-opadajuce" | "btu-rastuce" | "btu-opadajuce";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "preporuceno", label: "Preporučeno" },
  { value: "cena-rastuce", label: "Cena: niža ka višoj" },
  { value: "cena-opadajuce", label: "Cena: viša ka nižoj" },
  { value: "btu-rastuce", label: "Kapacitet: manji ka većem" },
  { value: "btu-opadajuce", label: "Kapacitet: veći ka manjem" },
];

export function ShopFilters({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("preporuceno");

  const sorted = [...products].sort((a, b) => {
    switch (sort) {
      case "cena-rastuce":
        return a.price - b.price;
      case "cena-opadajuce":
        return b.price - a.price;
      case "btu-rastuce":
        return a.btu - b.btu;
      case "btu-opadajuce":
        return b.btu - a.btu;
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {sorted.length} {sorted.length === 1 ? "model pronađen" : "modela pronađeno"}
        </p>

        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium text-muted">Sortiraj po</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-navy transition focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
