import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import { getSiteSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="sr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
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
