import { Plus_Jakarta_Sans, Noto_Sans_Devanagari, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/widgets/whatsapp-button";
import { AdmissionChatbot } from "@/components/widgets/chatbot";
import { CounsellingPopup } from "@/components/widgets/counselling-popup";
import { defaultMetadata, JsonLd } from "@/lib/seo";
import { SITE, CAMPUSES } from "@/lib/site";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = defaultMetadata;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE.fullName,
  alternateName: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  slogan: SITE.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: "C-77, Sector 63A",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  department: CAMPUSES.map((c) => ({
    "@type": "EducationalOrganization",
    name: c.role === "Headquarters" ? SITE.fullName : c.role,
    address: c.address,
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${devanagari.variable} ${mono.variable} h-full antialiased`}
    >
      <body className={`${sans.className} flex min-h-full flex-col bg-cream text-navy`}>
        <JsonLd data={orgJsonLd} />
        <LanguageProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <AdmissionChatbot />
          <CounsellingPopup />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
