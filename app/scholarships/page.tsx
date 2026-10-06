import { PageHero } from "@/components/shared/page-hero";
import { Scholarships } from "@/components/home/scholarships";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Scholarships",
  "Merit, girl child, sports and EWS scholarships at GBTE.",
  "/scholarships"
);

export default function ScholarshipsPage() {
  return (
    <>
      <PageHero title="Scholarship Programmes" subtitle="Upload documents with your application. Counsellors confirm eligibility in one call." />
      <Scholarships />
      <EnquiryForm />
    </>
  );
}
