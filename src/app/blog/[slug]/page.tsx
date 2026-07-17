import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { RichText } from "@/components/RichText";
import { JsonLd } from "@/components/JsonLd";
import { getBlogPostBySlug, getBlogPosts, getSiteSettings } from "@/lib/data";
import { blogCategoryLabel, formatDate } from "@/lib/format";
import { SITE_URL } from "@/lib/site-config";

const serviceLinks = [
  { href: "/usluge/servis", label: "Servis klima uređaja" },
  { href: "/usluge/montaza", label: "Montaža klima uređaja" },
  { href: "/usluge/popravka", label: "Popravka klima uređaja" },
  { href: "/usluge/dijagnostika", label: "Dijagnostika kvara" },
];

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage(
  props: PageProps<"/blog/[slug]">,
) {
  const { slug } = await props.params;
  const [post, settings] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Početna", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl ?? `${SITE_URL}/opengraph-image`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    author: { "@type": "Organization", name: post.author ?? settings.title },
    publisher: { "@type": "Organization", name: settings.title },
  };

  const faqJsonLd =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 max-w-3xl">
            <nav className="text-sm text-muted">
              <Link href="/blog" className="hover:text-accent">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-navy">{post.title}</span>
            </nav>

            {post.category && (
              <span className="mt-4 inline-block rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                {blogCategoryLabel(post.category)}
              </span>
            )}
            <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">{post.title}</h1>
            <p className="mt-2 text-sm text-muted">
              {formatDate(post.publishedAt)} · {post.author ?? settings.title}
            </p>

            <div className="mt-6">
              {post.coverImageUrl ? (
                <div className="relative h-72 w-full overflow-hidden rounded-3xl">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <PlaceholderImage label={`Naslovna slika: ${post.title}`} className="h-72 w-full rounded-3xl" />
              )}
            </div>

            {(post.summary || (post.keyTakeaways && post.keyTakeaways.length > 0)) && (
              <div className="mt-6 rounded-2xl border-l-4 border-accent bg-surface p-6">
                {post.summary && (
                  <p className="text-navy">{post.summary}</p>
                )}
                {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {post.keyTakeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted">
                        <span className="mt-1 text-accent">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <article className="mt-6">
              {post.body ? (
                <RichText value={post.body} />
              ) : (
                post.bodyPlain?.map((paragraph, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))
              )}
            </article>

            {post.faq && post.faq.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-navy">Najčešća pitanja</h2>
                <div className="mt-4 space-y-3">
                  {post.faq.map((item, i) => (
                    <details
                      key={i}
                      className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
                    >
                      <summary className="cursor-pointer list-none font-semibold text-navy marker:content-none">
                        <span className="flex items-center justify-between">
                          {item.question}
                          <span className="ml-4 text-accent transition group-open:rotate-45">+</span>
                        </span>
                      </summary>
                      <p className="mt-3 text-sm text-muted">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 rounded-2xl bg-navy p-6 text-white sm:p-8">
              <p className="text-lg font-semibold">Treba vam neka od ovih usluga?</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium transition hover:bg-white/20"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="mt-4 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
              >
                Pozovite {settings.phone}
              </a>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border-l-4 border-accent bg-surface p-6">
              <p className="text-sm text-muted">Treba vam savet ili termin?</p>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="mt-1 block text-xl font-bold text-navy hover:text-accent"
              >
                {settings.phone}
              </a>
              <p className="mt-3 text-xs text-muted">{settings.workingHours}</p>
              <Link
                href="/kontakt"
                className="mt-4 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
              >
                Pošaljite poruku
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
