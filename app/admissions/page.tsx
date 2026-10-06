import { AdmissionsView } from "@/components/admissions/admissions-view";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Admissions 2027",
  "Apply to GBTE Noida for diploma, degree and certificate pathways. Five-step admission, free counselling, documents and scholarships.",
  "/admissions",
);

export default function AdmissionsPage() {
  return <AdmissionsView />;
}
