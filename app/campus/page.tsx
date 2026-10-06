import { CampusView } from "@/components/campus/campus-view";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Campus | Noida HQ",
  "Visit GBTE at C-77, Sector 63A, Noida — smart classrooms, pharmacy labs, library, hostel, transport and seminar hall for diploma, degree and certificate pathways.",
  "/campus",
);

export default function CampusPage() {
  return <CampusView />;
}
