"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { NEWS } from "@/lib/content";
import { SITE } from "@/lib/site";

function formatDate(iso: string, hi: boolean) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(hi ? "hi-IN" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function NewsArticleView({ slug }: { slug: string }) {
  const { locale } = useI18n();
  const hi = locale === "hi";
  const item = NEWS.find((n) => n.slug === slug);
  if (!item) return null;

  const related = NEWS.filter((n) => n.slug !== slug).slice(0, 3);
  const body = hi && "bodyHi" in item && item.bodyHi ? item.bodyHi : item.body;
  const first = body.trim().charAt(0);
  const rest = body.trim().slice(1);

  return (
    <>
      <article className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="flex items-center justify-between gap-3 border-y-2 border-navy py-2 text-[10px] font-semibold tracking-[0.28em] text-navy uppercase">
            <Link href="/news" className="inline-flex items-center gap-1 hover:text-brand">
              <ArrowLeft className="size-3" />
              {hi ? "गजट" : "The Gazette"}
            </Link>
            <span>{hi ? `सत्र ${SITE.year}` : `Session ${SITE.year}`}</span>
          </div>

          <p className="mt-10 text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
            {item.tag} · {formatDate(item.date, hi)}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-navy sm:text-5xl">
            {hi ? item.titleHi : item.title}
          </h1>
          <p className="mt-4 text-sm text-stone-500">
            {hi ? "प्रवेश डेस्क · नोएडा परिसर" : "Admissions desk · Noida campus"}
          </p>
        </div>

        <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden sm:mt-12">
          <Image
            src={item.image}
            alt={hi ? item.titleHi : item.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 1024px"
          />
        </div>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p className="text-lg leading-9 text-stone-700">
            <span className="float-left mr-3 mt-1 font-serif text-6xl leading-none text-brand">{first}</span>
            {rest}
          </p>
          <div className="mt-12 flex flex-wrap gap-3 border-t border-[#eedfd0] pt-8">
            <Link
              href="/counselling"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white hover:bg-navy/90"
            >
              {hi ? "काउंसलिंग" : "Counselling"}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/news"
              className="inline-flex h-11 items-center rounded-full border border-[#eedfd0] bg-white px-6 text-sm font-semibold text-navy hover:border-brand hover:text-brand"
            >
              {hi ? "और नोटिस" : "More notices"}
            </Link>
          </div>
        </div>
      </article>

      <section className="border-t-2 border-navy bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
            {hi ? "इसी अंक से" : "Also in this issue"}
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {related.map((story) => (
              <Link key={story.slug} href={`/news/${story.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={story.image}
                    alt={hi ? story.titleHi : story.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-3 text-[10px] font-semibold tracking-[0.2em] text-brand uppercase">{story.tag}</p>
                <h2 className="mt-1 font-serif text-xl text-navy group-hover:text-brand">
                  {hi ? story.titleHi : story.title}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
