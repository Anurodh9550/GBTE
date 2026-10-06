import { Hero } from "@/components/home/hero";
import { PathToCareer } from "@/components/home/path-to-career";
import { GrowthStory } from "@/components/home/growth-story";
import { WhyChoose } from "@/components/home/why-choose";
import { CourseExplorer } from "@/components/home/course-explorer";
import { OurEdge } from "@/components/home/our-edge";
import { Placements } from "@/components/home/placements";
import { DrivingEdge } from "@/components/home/driving-edge";
import { SuccessStories } from "@/components/home/success-stories";
import { Awards } from "@/components/home/awards";
import { JsonLd } from "@/lib/seo";
import { FAQS } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function HomePage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.slice(0, 8).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <Hero />
      <PathToCareer />
      <GrowthStory />
      <WhyChoose />
      <CourseExplorer />
      <OurEdge />
      <Placements />
      <DrivingEdge />
      <SuccessStories />
      <Awards />
      <p className="sr-only">{SITE.fullName}</p>
    </>
  );
}
