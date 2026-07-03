export function formatRsd(amount: number): string {
  return `${new Intl.NumberFormat("sr-Latn-RS").format(amount)} din`;
}

export function formatEur(amount: number): string {
  return `${new Intl.NumberFormat("sr-Latn-RS").format(amount)} €`;
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("sr-Latn-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

const categoryLabels: Record<string, string> = {
  servis: "Servis",
  montaza: "Montaža",
  popravka: "Popravka",
  dijagnostika: "Dijagnostika",
};

export function serviceCategoryLabel(category: string): string {
  return categoryLabels[category] ?? category;
}

export function formatServiceAreas(city: string, serviceAreas: string[]): string {
  const municipalities = serviceAreas.filter((area) => area !== city);
  if (municipalities.length === 0) return city;
  return `${city} i okolina (${municipalities.join(", ")})`;
}

const contactReasonLabels: Record<string, string> = {
  servis: "Zakazivanje servisa",
  montaza: "Montaža",
  kvar: "Prijava kvara",
  kupovina: "Upit o kupovini klime",
  ostalo: "Ostalo",
};

export function contactReasonLabel(reason: string): string {
  return contactReasonLabels[reason] ?? reason;
}

const blogCategoryLabels: Record<string, string> = {
  servis: "Servis i održavanje",
  montaza: "Montaža",
  izbor: "Izbor uređaja",
  saveti: "Saveti",
};

export function blogCategoryLabel(category: string): string {
  return blogCategoryLabels[category] ?? category;
}

export const blogCategories = Object.entries(blogCategoryLabels).map(([value, label]) => ({
  value,
  label,
}));
