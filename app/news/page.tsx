import Link from "next/link";
import Image from "next/image";
import { NEWS } from "@/lib/content";
import { PageHero } from "@/components/shared/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "News & Events",
  "Admission Open 2027, scholarships, placement drives, workshops and campus events.",
  "/news"
);

export default function NewsPage() {
  return (
    <>
      <PageHero title="News & Events" subtitle="Official updates from admissions, placements and campus life." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-2">
        {NEWS.map((item) => (
          <article key={item.slug} className="overflow-hidden rounded-2xl border bg-white">
            <div className="relative h-48">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold tracking-wide text-brand uppercase">{item.tag} · {item.date}</p>
              <h2 className="mt-2 text-xl font-bold text-navy">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.excerpt}</p>
              <Link href={`/news/${item.slug}`} className="mt-4 inline-block text-sm font-medium text-brand hover:underline">
                Read more
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
