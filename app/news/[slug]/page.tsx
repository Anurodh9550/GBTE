import Image from "next/image";
import { notFound } from "next/navigation";
import { NEWS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = NEWS.find((n) => n.slug === slug);
  if (!item) return {};
  return pageMetadata(item.title, item.excerpt, `/news/${item.slug}`);
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = NEWS.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <>
      <PageHero title={item.title} subtitle={`${item.tag} · ${item.date}`} />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="relative mb-8 h-64 overflow-hidden rounded-3xl sm:h-80">
          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 768px" />
        </div>
        <p className="text-lg leading-8 text-slate-700">{item.body}</p>
      </article>
    </>
  );
}
