import { SuccessStoriesView } from "@/components/stories/success-stories-view";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Success Stories",
  "GBTE graduates in hospitals, schools, pharmacy and IT — first roles from diploma, degree and certificate pathways.",
  "/success-stories",
);

export default function SuccessStoriesPage() {
  return <SuccessStoriesView />;
}
