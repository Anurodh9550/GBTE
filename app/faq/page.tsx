import { FaqSection } from "@/components/home/faq-section";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { FAQS } from "@/lib/content";

export const metadata = pageMetadata(
  "Admission FAQs",
  "Twenty frequently asked questions about GBTE admissions, fees, hostels, scholarships and campuses.",
  "/faq"
);

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <PageHero title="Admission FAQs" subtitle="Clear answers before you apply or visit campus." />
      <FaqSection />
    </>
  );
}
