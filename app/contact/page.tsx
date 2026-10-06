import Image from "next/image";
import { PageHero } from "@/components/shared/page-hero";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { pageMetadata } from "@/lib/seo";
import { CAMPUSES, SITE } from "@/lib/site";

export const metadata = pageMetadata(
  "Contact GBTE",
  "C-77, Sector 63A, Noida, Uttar Pradesh. Call +91 9355470710.",
  "/contact"
);

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" subtitle={`${SITE.phone} · ${SITE.email}`} />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 md:max-w-3xl">
        {CAMPUSES.map((c) => (
          <article key={c.id} className="overflow-hidden rounded-2xl border border-[#eedfd0] bg-white">
            <div className="relative h-44">
              <Image src={c.image} alt={c.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-navy">{c.name}</h2>
              <p className="mt-1 text-sm text-brand">{c.role}</p>
              <p className="mt-3 text-slate-600">{c.address}</p>
              <a className="mt-2 block font-medium text-brand" href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
              <a className="block font-medium text-brand" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
          </article>
        ))}
      </section>
      <EnquiryForm />
    </>
  );
}
