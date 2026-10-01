import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE_URL = "https://www.positivepp.co.za";
const SITE_TITLE = "Positive Print & Promotion";
const SITE_DESCRIPTION =
  "Durban branding studio — apparel, signage, packaging and promotional print. 100% Woman-owned, BEE Level 2.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/hero/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Positive Print & Promotion — Durban branding studio",
      },
    ],
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/hero/hero.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Public+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
