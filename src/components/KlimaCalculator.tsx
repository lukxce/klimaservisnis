"use client";

import { useState } from "react";
import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import {
  calculateResult,
  type CalculatorInput,
  type CalculatorResult,
} from "@/lib/klima-calculator";
import type { Product } from "@/lib/types";

type Step = 1 | 2 | 3 | 4;

const initialInput: CalculatorInput = {
  area: 20,
  ceilingHeight: "standard",
  orientation: "south",
  floor: "standard",
  insulation: "average",
  glazing: "double",
  occupants: "1-2",
};

type OptionDef<T extends string> = { value: T; label: string };

function OptionGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: OptionDef<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-navy">{legend}</legend>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={value === opt.value}
            className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition ${
              value === opt.value
                ? "border-accent bg-accent/10 text-accent-dark"
                : "border-navy/15 text-navy hover:border-accent/40"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function KlimaCalculator({ phone }: { phone: string }) {
  const [step, setStep] = useState<Step>(1);
  const [input, setInput] = useState<CalculatorInput>(initialInput);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  function update<K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  async function handleFinish() {
    const calculated = calculateResult(input);
    setResult(calculated);
    setLoading(true);
    setFetchError(false);
    try {
      const res = await fetch("/api/kalkulator-klime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ btu: calculated.btu }),
      });
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch {
      setFetchError(true);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(1);
    setInput(initialInput);
    setResult(null);
    setProducts(null);
    setFetchError(false);
  }

  if (result) {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-dark">Rezultat</span>
        <h2 className="mt-2 text-3xl font-bold text-navy">
          Preporučena snaga: {result.btu.toLocaleString("sr-Latn-RS")} BTU
        </h2>
        <p className="mt-1 text-muted">({result.kw} kW)</p>

        {result.suggestMultiSplit && (
          <div className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-navy">
            Za ovakvu prostoriju jedna klima od 24000 BTU je na samoj granici.
            Vredi razmisliti o multi-split sistemu ili podeli prostora na dve
            zone. Pozovite {phone} za besplatan savet pre kupovine.
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-navy">Modeli koji odgovaraju</h3>
          {loading && <p className="mt-3 text-sm text-muted">Tražimo modele...</p>}
          {!loading && products && products.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
          {!loading && products && products.length === 0 && (
            <div className="mt-4 rounded-xl border border-navy/10 bg-surface p-5 text-sm text-muted">
              Trenutno nemamo tačan model te snage u ponudi na sajtu.{" "}
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold text-accent-dark">
                Pozovite {phone}
              </a>{" "}
              i predložićemo model koji odgovara.
            </div>
          )}
          {fetchError && (
            <p className="mt-3 text-sm text-muted">
              Nismo uspeli da učitamo ponudu.{" "}
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold text-accent-dark">
                Pozovite {phone}
              </a>{" "}
              direktno.
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
          >
            Izračunaj ponovo
          </button>
          <Link
            href="/shop"
            className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Pogledaj celu ponudu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted">
        <span className={step >= 1 ? "text-accent-dark" : ""}>Korak {step} od 4</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="mt-6 space-y-6">
        {step === 1 && (
          <>
            <div>
              <label className="text-sm font-semibold text-navy" htmlFor="area">
                Površina prostorije (m²)
              </label>
              <input
                id="area"
                type="number"
                min={5}
                max={150}
                value={input.area}
                onChange={(e) => update("area", Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-navy/15 px-4 py-2.5 text-navy focus:border-accent focus:outline-none"
              />
            </div>
            <OptionGroup
              legend="Visina plafona"
              value={input.ceilingHeight}
              onChange={(v) => update("ceilingHeight", v)}
              options={[
                { value: "low", label: "Do 2.6m" },
                { value: "standard", label: "2.6-3m" },
                { value: "high", label: "Preko 3m" },
              ]}
            />
          </>
        )}

        {step === 2 && (
          <>
            <OptionGroup
              legend="Orijentacija prostorije"
              value={input.orientation}
              onChange={(v) => update("orientation", v)}
              options={[
                { value: "north", label: "Severna" },
                { value: "south", label: "Južna" },
                { value: "east", label: "Istočna" },
                { value: "west", label: "Zapadna" },
              ]}
            />
            <OptionGroup
              legend="Sprat / pozicija"
              value={input.floor}
              onChange={(v) => update("floor", v)}
              options={[
                { value: "standard", label: "Prizemlje / međusprat" },
                { value: "top", label: "Poslednji sprat, pod krovom" },
              ]}
            />
          </>
        )}

        {step === 3 && (
          <>
            <OptionGroup
              legend="Kvalitet izolacije"
              value={input.insulation}
              onChange={(v) => update("insulation", v)}
              options={[
                { value: "poor", label: "Loša" },
                { value: "average", label: "Prosečna" },
                { value: "good", label: "Dobra / nova fasada" },
              ]}
            />
            <OptionGroup
              legend="Tip stakla"
              value={input.glazing}
              onChange={(v) => update("glazing", v)}
              options={[
                { value: "single", label: "Jedno staklo" },
                { value: "double", label: "Duplo IZO" },
                { value: "triple", label: "Trostruko" },
              ]}
            />
          </>
        )}

        {step === 4 && (
          <OptionGroup
            legend="Broj osoba koje su najčešće u prostoriji"
            value={input.occupants}
            onChange={(v) => update("occupants", v)}
            options={[
              { value: "1-2", label: "1-2" },
              { value: "3-4", label: "3-4" },
              { value: "5+", label: "5+" },
            ]}
          />
        )}
      </div>

      <div className="mt-8 flex justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1) as Step)}
            className="rounded-lg border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
          >
            Nazad
          </button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s + 1) as Step)}
            className="rounded-lg bg-navy px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Dalje
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            className="rounded-lg bg-navy px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Izračunaj
          </button>
        )}
      </div>
    </div>
  );
}
