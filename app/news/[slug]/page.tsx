import { notFound } from "next/navigation";
import { NEWS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { NewsArticleView } from "@/components/news/news-article-view";

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

  return <NewsArticleView slug={item.slug} />;
}
