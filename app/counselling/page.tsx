import { PageHero } from "@/components/shared/page-hero";
import { CounsellingForm } from "@/components/forms/counselling-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Free Counselling",
  "Book free career guidance for GBTE admissions 2027.",
  "/counselling"
);

export default function CounsellingPage() {
  return (
    <>
      <PageHero title="Free Career Guidance" subtitle="A counsellor calls you within the working day." />
      <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <CounsellingForm />
      </div>
    </>
  );
}
