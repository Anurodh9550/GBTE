import { ScholarshipsView } from "@/components/scholarships/scholarships-view";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Scholarships",
  "Merit, girl child, sports and EWS scholarships at GBTE Noida — claimed on the admission file, confirmed after counselling.",
  "/scholarships",
);

export default function ScholarshipsPage() {
  return <ScholarshipsView />;
}
