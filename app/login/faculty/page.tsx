import { PageHero } from "@/components/shared/page-hero";
import { PortalLogin } from "@/components/portals/portal-login";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Faculty Login", "GBTE faculty portal for classes, assessments and mentoring.", "/login/faculty");

export default function FacultyLoginPage() {
  return (
    <>
      <PageHero title="Faculty Login" subtitle="Classes, assessments and mentee tracking." />
      <PortalLogin role="faculty" />
    </>
  );
}
