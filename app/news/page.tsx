import { NewsView } from "@/components/news/news-view";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "News & Events",
  "The GBTE campus gazette — admissions notices, scholarships, placement drives, workshops and events at Noida.",
  "/news",
);

export default function NewsPage() {
  return <NewsView />;
}
