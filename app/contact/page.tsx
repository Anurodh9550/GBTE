import { ContactView } from "@/components/contact/contact-view";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Contact",
  "GBTE Noida desk — C-77, Sector 63A. Call +91 9355470710, WhatsApp, or visit the map.",
  "/contact",
);

export default function ContactPage() {
  return <ContactView />;
}
