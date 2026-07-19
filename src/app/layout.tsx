import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import { getSiteSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/site-config";

// Content lives in Sanity now — without this, every static page is frozen
// at build time and Studio edits never show up without a full redeploy.
export const revalidate = 60;

// Self-hosted Geist via the official `geist` package (next/font/local under
// the hood) instead of next/font/google. The Google CDN splits Geist into
// separate per-unicode-range files, so the Serbian glyphs (Č Ž Š Ć Đ) live
// in a file that either loads late (hurts LCP) or, if preloaded, swaps during
// the CLS window (hurts CLS) - no setting wins both. This ships one variable
// woff2 covering the full charset, preloaded, so text renders in Geist from
// first paint: no late-discovered subset file, no swap reflow. Same
// --font-geist-sans/-mono CSS variables, so nothing downstream changes.
const geistSans = GeistSans;
const geistMono = GeistMono;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = `${settings.title} | ${settings.tagline}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${settings.title}`,
    },
    description: `${settings.title} nudi servis, montažu i prodaju klima uređaja u ${settings.city}u i okolini. Pozovite ${settings.phone} za besplatnu procenu.`,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "sr_RS",
      siteName: settings.title,
      title,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const sameAs = [settings.socials?.facebook, settings.socials?.instagram].filter(
    (url): url is string => Boolean(url),
  );

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${SITE_URL}/#business`,
    name: settings.title,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    telephone: settings.phone,
    email: settings.email,
    address: settings.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressLocality: settings.city,
          addressCountry: "RS",
        }
      : undefined,
    geo: settings.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: settings.geo.lat,
          longitude: settings.geo.lng,
        }
      : undefined,
    areaServed: settings.serviceAreas,
    priceRange: "$$",
    openingHoursSpecification: settings.openingHoursSpecification?.map((block) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: block.dayOfWeek.map((day) => `https://schema.org/${day}`),
      opens: block.opens,
      closes: block.closes,
    })),
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    description: `Servis, montaža i prodaja klima uređaja u ${settings.city}u.`,
  };

  return (
    <html lang="sr-Latn-RS" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={localBusinessJsonLd} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallButton />
      </body>
    </html>
  );
}
