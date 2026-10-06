import { PageHero } from "@/components/shared/page-hero";
import { PortalLogin } from "@/components/portals/portal-login";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Student Login", "GBTE student portal for attendance, LMS and notifications.", "/login/student");

export default function StudentLoginPage() {
  return (
    <>
      <PageHero title="Student Login" subtitle="Access LMS, attendance and placement alerts." />
      <PortalLogin role="student" />
    </>
  );
}
