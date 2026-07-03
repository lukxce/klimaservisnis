export type OpeningHoursBlock = {
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

export type SeoOverride = {
  title?: string;
  description?: string;
};

export type SiteSettings = {
  title: string;
  tagline?: string;
  phone: string;
  phoneSecondary?: string;
  email?: string;
  address?: string;
  city: string;
  serviceAreas: string[];
  foundedYear?: number;
  workingHours?: string;
  openingHoursSpecification: OpeningHoursBlock[];
  geo?: { lat: number; lng: number };
  brands: string[];
  logoUrl?: string;
  heroImageUrl?: string;
  aboutImageUrl?: string;
  socials?: { facebook?: string; instagram?: string };
  seoUsluge?: SeoOverride;
  seoCenovnik?: SeoOverride;
  seoShop?: SeoOverride;
  seoBlog?: SeoOverride;
};

export type Service = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  priceFrom: number;
  priceTo?: number;
  priceNote?: string;
  featured?: boolean;
  imageUrl?: string;
  body?: unknown;
};

export type ChecklistItem = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  heroSubtitle?: string;
  imageUrl?: string;
  body?: unknown;
  checklist: ChecklistItem[];
  ctaBandTitle?: string;
  ctaBandText?: string;
  ctaBandBullets: string[];
  whyUs: ChecklistItem[];
  faq: FaqItem[];
  seo?: SeoOverride;
};

export type Product = {
  slug: string;
  title: string;
  brand: string;
  type: string;
  btu: number;
  price: number;
  oldPrice?: number;
  installationIncluded: boolean;
  shortDescription: string;
  featured?: boolean;
  imageUrl?: string;
  description?: unknown;
  features?: string[];
  specs?: {
    energyClassCooling?: string;
    energyClassHeating?: string;
    gasType?: string;
    wifi?: boolean;
    warranty?: string;
  };
  seo?: SeoOverride;
};

export type BlogPost = {
  slug: string;
  title: string;
  category?: string;
  excerpt: string;
  summary?: string;
  keyTakeaways?: string[];
  publishedAt: string;
  author?: string;
  coverImageUrl?: string;
  body?: unknown;
  bodyPlain?: string[];
  faq?: FaqItem[];
  seo?: SeoOverride;
};
