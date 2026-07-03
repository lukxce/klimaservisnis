import type { MetadataRoute } from "next";

import { getServicePages, getProducts, getBlogPosts } from "@/lib/data";
import { SITE_URL } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [servicePages, products, posts] = await Promise.all([
    getServicePages(),
    getProducts(),
    getBlogPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/usluge`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/cenovnik`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/kontakt`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const servicePageRoutes: MetadataRoute.Sitemap = servicePages.map((page) => ({
    url: `${SITE_URL}/usluge/${page.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/shop/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...servicePageRoutes, ...productRoutes, ...blogRoutes];
}
