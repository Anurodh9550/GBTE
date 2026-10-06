import Image from "next/image";
import { PageHero } from "@/components/shared/page-hero";
import { CampusGallery } from "@/components/home/campus-gallery";
import { pageMetadata } from "@/lib/seo";
import { CAMPUSES } from "@/lib/site";

export const metadata = pageMetadata(
  "Campus Facilities",
  "Smart classrooms, library, computer labs, pharmacy labs, hostel, transport, sports ground and seminar hall.",
  "/campus"
);

export default function CampusPage() {
  return (
    <>
      <PageHero title="Campus Life" subtitle="Noida headquarters at C-77, Sector 63A." />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 md:max-w-3xl">
        {CAMPUSES.map((c) => (
          <article key={c.id} className="overflow-hidden rounded-2xl border border-[#eedfd0] bg-white">
            <div className="relative h-52">
              <Image src={c.image} alt={c.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-navy">{c.name}</h2>
              <p className="mt-1 text-sm text-brand">{c.role}</p>
              <p className="mt-3 text-slate-600">{c.address}</p>
              <a
                className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Maps
              </a>
            </div>
          </article>
        ))}
      </section>
      <CampusGallery />
    </>
  );
}
