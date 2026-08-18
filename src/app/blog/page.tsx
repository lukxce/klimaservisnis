import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { BlogCategoryFilter } from "@/components/BlogCategoryFilter";
import { JsonLd } from "@/components/JsonLd";
import { getBlogPosts, getSiteSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.seoBlog?.title ?? `Blog o klima uređajima: saveti za servis i izbor`;
  const description =
    settings.seoBlog?.description ??
    `Tekstovi o održavanju i izboru klima uređaja: kada je vreme za čišćenje, kako prepoznati gubitak gasa i koja snaga odgovara prostoru.`;

  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      images: [`${SITE_URL}/opengraph-image`], title, description, type: "website", url: `${SITE_URL}/blog` },
  };
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Početna", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <PageHero
        eyebrow="Blog"
        title="Korisni tekstovi o klima uređajima"
        subtitle="Praktični saveti o servisu, ugradnji i izboru klima uređaja. Pišemo ih na osnovu svakodnevnog rada na terenu."
      />

      <section className="py-14">
        <Container>
          <BlogCategoryFilter posts={posts} />
        </Container>
      </section>
    </>
  );
}
