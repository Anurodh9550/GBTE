import { AboutView } from "@/components/about/about-view";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About GBTE",
  "Vision, mission, leadership, accreditation and affiliations of Gautam Buddha Technical Education Group.",
  "/about"
);

export default function AboutPage() {
  return <AboutView />;
}
