import { client, projectId } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
  siteSettingsQuery,
  servicesQuery,
  serviceBySlugQuery,
  servicePagesQuery,
  servicePageBySlugQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
} from "@/sanity/lib/queries";
import {
  siteSettings as placeholderSettings,
  services as placeholderServices,
  servicePages as placeholderServicePages,
  blogPosts as placeholderBlogPosts,
} from "@/lib/placeholder-data";
import type { SiteSettings, Service, ServicePage, BlogPost } from "@/lib/types";

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
  const data = await client.fetch(siteSettingsQuery, {}, { next: { tags: ["siteSettings"] } });
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
  };
}

export async function getServices(): Promise<Service[]> {
  if (!cmsConfigured) return placeholderServices.map(mapService);
  const data = await client.fetch(servicesQuery, {}, { next: { tags: ["service"] } });
  if (!data?.length) return placeholderServices.map(mapService);
  return data.map(mapService);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!cmsConfigured) {
    const found = placeholderServices.find((s) => s.slug === slug);
    return found ? mapService(found) : null;
  }
  const data = await client.fetch(serviceBySlugQuery, { slug }, { next: { tags: ["service"] } });
  return data ? mapService(data) : null;
}

function mapServicePage(raw: any): ServicePage {
  return {
    slug: typeof raw.slug === "string" ? raw.slug : raw.slug?.current,
    title: raw.title,
    heroTitle: raw.heroTitle,
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
  const data = await client.fetch(servicePagesQuery, {}, { next: { tags: ["servicePage"] } });
  if (!data?.length) return placeholderServicePages.map(mapServicePage);
  return data.map(mapServicePage);
}

export async function getServicePageBySlug(slug: string): Promise<ServicePage | null> {
  if (!cmsConfigured) {
    const found = placeholderServicePages.find((p) => p.slug === slug);
    return found ? mapServicePage(found) : null;
  }
  const data = await client.fetch(servicePageBySlugQuery, { slug }, { next: { tags: ["servicePage"] } });
  return data ? mapServicePage(data) : null;
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
    coverImageUrl: raw.coverImageUrl ?? imgUrl(raw.coverImage),
    body: isPlainBody ? undefined : raw.body,
    bodyPlain: isPlainBody ? raw.body : undefined,
    faq: raw.faq,
    seo: raw.seo,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!cmsConfigured) return placeholderBlogPosts.map(mapBlogPost);
  const data = await client.fetch(blogPostsQuery, {}, { next: { tags: ["blogPost"] } });
  if (!data?.length) return placeholderBlogPosts.map(mapBlogPost);
  return data.map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!cmsConfigured) {
    const found = placeholderBlogPosts.find((p) => p.slug === slug);
    return found ? mapBlogPost(found) : null;
  }
  const data = await client.fetch(blogPostBySlugQuery, { slug }, { next: { tags: ["blogPost"] } });
  return data ? mapBlogPost(data) : null;
}
