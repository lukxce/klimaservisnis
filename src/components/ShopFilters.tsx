"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

const ALL = "Sve";

type SortOption = "preporuceno" | "cena-rastuce" | "cena-opadajuce" | "btu-rastuce" | "btu-opadajuce";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "preporuceno", label: "Preporučeno" },
  { value: "cena-rastuce", label: "Cena: niža ka višoj" },
  { value: "cena-opadajuce", label: "Cena: viša ka nižoj" },
  { value: "btu-rastuce", label: "Kapacitet: manji ka većem" },
  { value: "btu-opadajuce", label: "Kapacitet: veći ka manjem" },
];

function selectClass(active: boolean) {
  return `w-full rounded-xl border px-3 py-2.5 text-sm text-navy transition focus:outline-none focus:ring-2 focus:ring-accent/40 ${
    active ? "border-accent bg-accent/5 font-medium" : "border-black/10 bg-white"
  }`;
}

export function ShopFilters({ products }: { products: Product[] }) {
  const [type, setType] = useState(ALL);
  const [btu, setBtu] = useState(ALL);
  const [brand, setBrand] = useState(ALL);
  const [sort, setSort] = useState<SortOption>("preporuceno");
  const [mobileOpen, setMobileOpen] = useState(false);

  const types = useMemo(
    () => [ALL, ...Array.from(new Set(products.map((p) => p.type))).sort()],
    [products],
  );
  const btuOptions = useMemo(
    () => [ALL, ...Array.from(new Set(products.map((p) => p.btu))).sort((a, b) => a - b)],
    [products],
  );
  const brands = useMemo(
    () => [ALL, ...Array.from(new Set(products.map((p) => p.brand))).sort()],
    [products],
  );

  const filtered = products.filter(
    (p) =>
      (type === ALL || p.type === type) &&
      (btu === ALL || p.btu === Number(btu)) &&
      (brand === ALL || p.brand === brand),
  );

  const sorted = [...filtered].sort((a, b) => {
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

  const activeCount = [type !== ALL, btu !== ALL, brand !== ALL, sort !== "preporuceno"].filter(
    Boolean,
  ).length;
  const hasActiveFilters = type !== ALL || btu !== ALL || brand !== ALL;

  return (
    <div>
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 sm:pointer-events-none"
        >
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-accent">
              <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
            </svg>
            <h2 className="text-sm font-semibold text-navy">Filtriraj i sortiraj</h2>
            {activeCount > 0 && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-white">
                {activeCount}
              </span>
            )}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-4 w-4 text-muted transition sm:hidden ${mobileOpen ? "rotate-180" : ""}`}
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.084l3.71-3.855a.75.75 0 111.08 1.04l-4.25 4.417a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>

        <div
          className={`gap-4 sm:mt-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 ${
            mobileOpen ? "mt-4 grid grid-cols-1" : "hidden"
          }`}
        >
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-muted">Vrsta klima uređaja</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={selectClass(type !== ALL)}
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t === ALL ? "Sve vrste" : t}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-muted">Kapacitet</span>
            <select
              value={btu}
              onChange={(e) => setBtu(e.target.value)}
              className={selectClass(btu !== ALL)}
            >
              {btuOptions.map((b) => (
                <option key={b} value={b}>
                  {b === ALL ? "Svi kapaciteti" : `${b.toLocaleString("sr-Latn-RS")} BTU`}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-muted">Proizvođač</span>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={selectClass(brand !== ALL)}
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b === ALL ? "Svi proizvođači" : b}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-muted">Sortiraj po</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className={selectClass(sort !== "preporuceno")}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setType(ALL);
              setBtu(ALL);
              setBrand(ALL);
            }}
            className={`mt-4 items-center gap-1 text-sm font-semibold text-accent hover:underline sm:inline-flex ${
              mobileOpen ? "inline-flex" : "hidden"
            }`}
          >
            ✕ Resetuj filtere
          </button>
        )}
      </div>

      <p className="mt-4 text-sm text-muted">
        {sorted.length} {sorted.length === 1 ? "model pronađen" : "modela pronađeno"}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
