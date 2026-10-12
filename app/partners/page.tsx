import { PartnersView } from "@/components/partners/partners-view";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Alliance Partners",
  "GBET strategic alliance and hiring partners — Parimanam Solutions LMS, Apollo, Fortis, TCS, Wipro, Cipla, Kendriya Vidyalaya and more.",
  "/partners",
);

export default function PartnersPage() {
  return <PartnersView />;
}
