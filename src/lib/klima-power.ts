// Zaokruživanje izračunate snage na stvarne prodajne stepenice - klime se
// ne prave u proizvoljnim BTU kapacitetima, nego u standardnim koracima.
export function btuBucket(btu: number): 9000 | 12000 | 18000 | 24000 {
  if (btu <= 10500) return 9000;
  if (btu <= 15000) return 12000;
  if (btu <= 21000) return 18000;
  return 24000;
}
