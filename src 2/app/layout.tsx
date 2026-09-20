import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Positive Print & Promotion",
  description:
    "Durban branding studio — apparel, signage, packaging and promotional print, 100% Woman-owned, 50% Black Woman-owned.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Public+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
