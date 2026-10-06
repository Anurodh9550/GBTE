import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Compare Courses",
  "Compare GBTE programmes by duration, eligibility, seats and career paths.",
  "/compare"
);

export default function CompareLayout({ children }: { children: ReactNode }) {
  return children;
}
