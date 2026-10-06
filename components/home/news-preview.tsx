"use client";

import Link from "next/link";
import Image from "next/image";
import { NEWS } from "@/lib/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { useI18n } from "@/components/providers/language-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NewsPreview() {
  const { t, locale } = useI18n();
  return (
    <section className="bg-[#fff8f2] pt-10 pb-16 sm:pt-12 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          align="left"
          title={locale === "hi" ? "परिसर समाचार और अपडेट" : "Campus news & updates"}
          subtitle={t.news.title}
          eyebrow="Updates"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {NEWS.slice(0, 3).map((item) => (
            <article key={item.slug} className="overflow-hidden rounded-2xl border bg-white">
              <div className="relative h-40">
                <Image src={item.image} alt={locale === "hi" ? item.titleHi : item.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold tracking-wide text-brand uppercase">{item.tag}</p>
                <h3 className="mt-2 text-lg font-semibold text-navy">{locale === "hi" ? item.titleHi : item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{locale === "hi" ? item.excerptHi : item.excerpt}</p>
                <Link href={`/news/${item.slug}`} className="mt-4 inline-block text-sm font-medium text-brand hover:underline">
                  {t.news.read}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/news" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6")}>
            {t.nav.news}
          </Link>
        </div>
      </div>
    </section>
  );
}
