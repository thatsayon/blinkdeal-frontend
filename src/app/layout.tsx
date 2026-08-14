import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://blinkdeal.cc";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BlinkDeal — Find the Best Coupon Codes & Deals",
    template: "%s | BlinkDeal",
  },
  description:
    "BlinkDeal is your go-to source for verified coupon codes, promo codes, and exclusive deals from top stores like Nike, Amazon, Sephora, and more. Save money every time you shop.",
  keywords: [
    "coupon codes",
    "promo codes",
    "deals",
    "discounts",
    "BlinkDeal",
    "online shopping deals",
    "verified coupons",
    "free shipping codes",
  ],
  authors: [{ name: "BlinkDeal" }],
  creator: "BlinkDeal",
  publisher: "BlinkDeal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "BlinkDeal",
    title: "BlinkDeal — Find the Best Coupon Codes & Deals",
    description:
      "Find and use verified coupon codes from your favorite stores. BlinkDeal makes saving money fast, easy, and reliable.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BlinkDeal — Find the Best Coupon Codes & Deals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@blinkdeal",
    creator: "@blinkdeal",
    title: "BlinkDeal — Find the Best Coupon Codes & Deals",
    description:
      "Find and use verified coupon codes from your favorite stores.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// JSON-LD: Organization structured data (sitewide)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BlinkDeal",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: [
    "https://twitter.com/blinkdeal",
    "https://facebook.com/blinkdeal",
  ],
  description:
    "BlinkDeal is a coupon and deals aggregator helping shoppers find verified promo codes from top retailers worldwide.",
};

// JSON-LD: WebSite with SearchAction
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BlinkDeal",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/deals?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

