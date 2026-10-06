import { PageHero } from "@/components/shared/page-hero";
import { AdmissionProcess } from "@/components/home/admission-process";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Admissions 2027",
  "Register online, attend counselling, verify documents, pay fees and confirm your GBTE admission.",
  "/admissions"
);

export default function AdmissionsPage() {
  return (
    <>
      <PageHero title="Admissions Open 2027" subtitle="A five-step funnel with counsellor support on call, WhatsApp and campus." />
      <AdmissionProcess />
      <EnquiryForm />
    </>
  );
}
