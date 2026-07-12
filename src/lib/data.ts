import { client, projectId } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
  siteSettingsQuery,
  servicesQuery,
  serviceBySlugQuery,
  servicePagesQuery,
  servicePageBySlugQuery,
  productsQuery,
  featuredProductsQuery,
  productBySlugQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
} from "@/sanity/lib/queries";
import {
  siteSettings as placeholderSettings,
  services as placeholderServices,
  servicePages as placeholderServicePages,
  products as placeholderProducts,
  blogPosts as placeholderBlogPosts,
} from "@/lib/placeholder-data";
import type { SiteSettings, Service, ServicePage, Product, BlogPost } from "@/lib/types";

const cmsConfigured = Boolean(projectId);

type SanityImage = Parameters<typeof urlForImage>[0] | undefined | null;

function imgUrl(image: SanityImage): string | undefined {
  if (!image) return undefined;
  try {
    return urlForImage(image).width(1200).auto("format").url();
  } catch {
    return undefined;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!cmsConfigured) return placeholderSettings;
  const data = await client.fetch(siteSettingsQuery);
  if (!data) return placeholderSettings;
  return {
    title: data.title ?? placeholderSettings.title,
    tagline: data.tagline,
    phone: data.phone ?? placeholderSettings.phone,
    phoneSecondary: data.phoneSecondary,
    email: data.email,
    address: data.address,
    city: data.city ?? placeholderSettings.city,
    serviceAreas: data.serviceAreas ?? placeholderSettings.serviceAreas,
    foundedYear: data.foundedYear,
    workingHours: data.workingHours,
    openingHoursSpecification:
      data.openingHoursSpecification ?? placeholderSettings.openingHoursSpecification,
    geo: data.geo,
    brands: data.brands ?? placeholderSettings.brands,
    logoUrl: imgUrl(data.logo),
    heroImageUrl: imgUrl(data.heroImage),
    aboutImageUrl: imgUrl(data.aboutImage),
    socials: data.socials,
    seoUsluge: data.seoUsluge,
    seoCenovnik: data.seoCenovnik,
    seoShop: data.seoShop,
    seoBlog: data.seoBlog,
  };
}

function mapService(raw: any): Service {
  return {
    slug: typeof raw.slug === "string" ? raw.slug : raw.slug?.current,
    title: raw.title,
    category: raw.category ?? "servis",
    shortDescription: raw.shortDescription ?? "",
    priceFrom: raw.priceFrom,
    priceTo: raw.priceTo,
    priceNote: raw.priceNote,
    featured: raw.featured,
    imageUrl: imgUrl(raw.image),
    body: raw.body,
  };
}

export async function getServices(): Promise<Service[]> {
  if (!cmsConfigured) return placeholderServices.map(mapService);
  const data = await client.fetch(servicesQuery);
  if (!data?.length) return placeholderServices.map(mapService);
  return data.map(mapService);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!cmsConfigured) {
    const found = placeholderServices.find((s) => s.slug === slug);
    return found ? mapService(found) : null;
  }
  const data = await client.fetch(serviceBySlugQuery, { slug });
  return data ? mapService(data) : null;
}

function mapServicePage(raw: any): ServicePage {
  return {
    slug: typeof raw.slug === "string" ? raw.slug : raw.slug?.current,
    title: raw.title,
    heroSubtitle: raw.heroSubtitle,
    imageUrl: imgUrl(raw.image),
    body: raw.body,
    checklist: raw.checklist ?? [],
    ctaBandTitle: raw.ctaBandTitle,
    ctaBandText: raw.ctaBandText,
    ctaBandBullets: raw.ctaBandBullets ?? [],
    whyUs: raw.whyUs ?? [],
    faq: raw.faq ?? [],
    seo: raw.seo,
  };
}

export async function getServicePages(): Promise<ServicePage[]> {
  if (!cmsConfigured) return placeholderServicePages.map(mapServicePage);
  const data = await client.fetch(servicePagesQuery);
  if (!data?.length) return placeholderServicePages.map(mapServicePage);
  return data.map(mapServicePage);
}

export async function getServicePageBySlug(slug: string): Promise<ServicePage | null> {
  if (!cmsConfigured) {
    const found = placeholderServicePages.find((p) => p.slug === slug);
    return found ? mapServicePage(found) : null;
  }
  const data = await client.fetch(servicePageBySlugQuery, { slug });
  return data ? mapServicePage(data) : null;
}

function mapProduct(raw: any): Product {
  return {
    slug: typeof raw.slug === "string" ? raw.slug : raw.slug?.current,
    title: raw.title,
    brand: raw.brand,
    type: raw.type ?? "Zidni",
    btu: raw.btu,
    price: raw.price,
    oldPrice: raw.oldPrice,
    installationIncluded: raw.installationIncluded ?? true,
    shortDescription: raw.shortDescription ?? "",
    featured: raw.featured,
    imageUrl: Array.isArray(raw.images)
      ? imgUrl(raw.images[0])
      : imgUrl(raw.image),
    description: raw.description,
    features: raw.features,
    specs: raw.specs,
    seo: raw.seo,
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!cmsConfigured) return placeholderProducts.map(mapProduct);
  const data = await client.fetch(productsQuery);
  if (!data?.length) return placeholderProducts.map(mapProduct);
  return data.map(mapProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!cmsConfigured)
    return placeholderProducts.filter((p) => p.featured).map(mapProduct);
  const data = await client.fetch(featuredProductsQuery);
  if (!data?.length)
    return placeholderProducts.filter((p) => p.featured).map(mapProduct);
  return data.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!cmsConfigured) {
    const found = placeholderProducts.find((p) => p.slug === slug);
    return found ? mapProduct(found) : null;
  }
  const data = await client.fetch(productBySlugQuery, { slug });
  return data ? mapProduct(data) : null;
}

function mapBlogPost(raw: any): BlogPost {
  const isPlainBody = Array.isArray(raw.body) && typeof raw.body[0] === "string";

  return {
    slug: typeof raw.slug === "string" ? raw.slug : raw.slug?.current,
    title: raw.title,
    category: raw.category,
    excerpt: raw.excerpt ?? "",
    summary: raw.summary,
    keyTakeaways: raw.keyTakeaways,
    publishedAt: raw.publishedAt,
    author: raw.author,
    coverImageUrl: imgUrl(raw.coverImage),
    body: isPlainBody ? undefined : raw.body,
    bodyPlain: isPlainBody ? raw.body : undefined,
    faq: raw.faq,
    seo: raw.seo,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!cmsConfigured) return placeholderBlogPosts.map(mapBlogPost);
  const data = await client.fetch(blogPostsQuery);
  if (!data?.length) return placeholderBlogPosts.map(mapBlogPost);
  return data.map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!cmsConfigured) {
    const found = placeholderBlogPosts.find((p) => p.slug === slug);
    return found ? mapBlogPost(found) : null;
  }
  const data = await client.fetch(blogPostBySlugQuery, { slug });
  return data ? mapBlogPost(data) : null;
}
