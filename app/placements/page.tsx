import { PlacementsView } from "@/components/placements/placements-view";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Placements",
  "GBTE Noida hiring floor — Apollo, Fortis, TCS, Wipro, Cipla and more. Campus drives, internships and a dedicated career cell.",
  "/placements",
);

export default function PlacementsPage() {
  return <PlacementsView />;
}
