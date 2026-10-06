import { PageHero } from "@/components/shared/page-hero";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { pageMetadata } from "@/lib/seo";
import { COURSES } from "@/lib/courses";

export const metadata = pageMetadata(
  "Apply Now",
  "Start your GBTE 2027 application. Counsellors respond on call, email and WhatsApp.",
  "/apply"
);

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  const found = COURSES.find((c) => c.slug === course);

  return (
    <>
      <PageHero title="Apply Now — Admissions 2027" subtitle="Share your details. We create your file the same working day." />
      <EnquiryForm defaultCourse={found?.name} />
    </>
  );
}
