// Logika BTU kalkulatora - odvojena od UI-ja i od upita ka Sanity-ju.
// Forma (KlimaCalculator.tsx) računa preporučeni kapacitet iz ovih funkcija,
// pa taj broj šalje na /api/kalkulator-klime da nađe stvarne proizvode.

import { btuBucket } from "@/lib/shop-taxonomy";

export type CeilingHeight = "low" | "standard" | "high";
export type Orientation = "north" | "south" | "east" | "west";
export type Floor = "standard" | "top";
export type Insulation = "poor" | "average" | "good";
export type Glazing = "single" | "double" | "triple";
export type Occupants = "1-2" | "3-4" | "5+";

export type CalculatorInput = {
  area: number; // m²
  ceilingHeight: CeilingHeight;
  orientation: Orientation;
  floor: Floor;
  insulation: Insulation;
  glazing: Glazing;
  occupants: Occupants;
};

const CEILING_MULT: Record<CeilingHeight, number> = { low: 0.95, standard: 1, high: 1.12 };
const ORIENTATION_MULT: Record<Orientation, number> = { north: 0.95, south: 1.15, east: 1.05, west: 1.1 };
const FLOOR_MULT: Record<Floor, number> = { standard: 1, top: 1.15 };
const INSULATION_MULT: Record<Insulation, number> = { poor: 1.2, average: 1, good: 0.9 };
const GLAZING_MULT: Record<Glazing, number> = { single: 1.1, double: 1, triple: 0.95 };
const OCCUPANTS_MULT: Record<Occupants, number> = { "1-2": 1, "3-4": 1.08, "5+": 1.15 };

// Bazni BTU/m² za prosečnu prostoriju, usidren na standardne prodajne
// stepenice ovog tržišta (~20m² -> 9000 BTU, ~25m² -> 12000 BTU pod
// prosečnim uslovima).
const BASE_BTU_PER_M2 = 500;

export function calculateRawBtu(input: CalculatorInput): number {
  const mult =
    CEILING_MULT[input.ceilingHeight] *
    ORIENTATION_MULT[input.orientation] *
    FLOOR_MULT[input.floor] *
    INSULATION_MULT[input.insulation] *
    GLAZING_MULT[input.glazing] *
    OCCUPANTS_MULT[input.occupants];
  return input.area * BASE_BTU_PER_M2 * mult;
}

export type CalculatorResult = {
  rawBtu: number;
  btu: 9000 | 12000 | 18000 | 24000;
  kw: number;
  suggestMultiSplit: boolean;
};

export function calculateResult(input: CalculatorInput): CalculatorResult {
  const rawBtu = calculateRawBtu(input);
  return {
    rawBtu: Math.round(rawBtu),
    btu: btuBucket(rawBtu),
    kw: Math.round(rawBtu * 0.000293 * 10) / 10,
    suggestMultiSplit: rawBtu > 27000,
  };
}
