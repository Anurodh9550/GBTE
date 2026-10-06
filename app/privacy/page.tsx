import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Privacy Policy", "How GBTE handles admission enquiries and student data.", "/privacy");

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-navy">Privacy Policy</h1>
      <p className="mt-4 text-slate-600 leading-7">
        Enquiry forms, counselling popups and brochure requests are used only for admissions communication
        via call, email, WhatsApp and the internal CRM. We do not sell leads.
      </p>
    </article>
  );
}
