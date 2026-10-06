"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { NEWS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const FILM = [
  { src: "/photos/hostel.jpg", en: "Residence", hi: "निवास" },
  { src: "/photos/sports.jpg", en: "Ground", hi: "मैदान" },
  { src: "/photos/culinary.jpg", en: "Kitchen", hi: "रसोई" },
  { src: "/photos/fashion.jpg", en: "Atelier", hi: "एटेलियर" },
  { src: "/photos/yoga.jpg", en: "Wellness", hi: "वेलनेस" },
] as const;

const FILTERS = ["All", "Admissions", "Campus", "Placements", "Events"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_HI: Record<Filter, string> = {
  All: "सभी",
  Admissions: "प्रवेश",
  Campus: "परिसर",
  Placements: "प्लेसमेंट",
  Events: "कार्यक्रम",
};

function matches(tag: string, filter: Filter) {
  if (filter === "All") return true;
  if (filter === "Admissions") return tag === "Admissions" || tag === "Scholarships";
  return tag === filter;
}

function formatDate(iso: string, hi: boolean) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(hi ? "hi-IN" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function NewsView() {
  const { locale } = useI18n();
  const hi = locale === "hi";
  const [filter, setFilter] = useState<Filter>("All");

  const items = useMemo(
    () =>
      NEWS.filter((n) => matches(n.tag, filter)).slice().sort((a, b) => b.date.localeCompare(a.date)),
    [filter],
  );
  const lead = items[0];
  const briefs = items.slice(1, 4);
  const rest = items.slice(4);

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="flex items-center justify-between gap-3 border-y-2 border-navy py-2.5 text-[10px] font-semibold tracking-[0.28em] text-navy uppercase sm:text-[11px]">
            <span>{hi ? "नोएडा · सेक्टर 63ए" : "Noida · Sector 63A"}</span>
            <span className="hidden sm:inline">
              {hi ? `अंक I · सत्र ${SITE.year}` : `Vol. I · Session ${SITE.year}`}
            </span>
            <span>{hi ? "परिसर गजट" : "Campus gazette"}</span>
          </div>

          <div className="py-10 text-center sm:py-12">
            <p className="text-[11px] font-semibold tracking-[0.38em] text-brand uppercase">
              {hi ? "समाचार और कार्यक्रम" : "News & Events"}
            </p>
            <h1 className="mt-4 font-serif text-5xl font-medium tracking-tight text-navy sm:text-7xl">
              {hi ? "गजट" : "The Gazette"}
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-stone-600">
              {hi
                ? "प्रवेश डेस्क, परिसर, प्लेसमेंट और कार्यक्रम — एक क्लासिक बुलेटिन, हर नोटिस के साथ एक अलग छायाचित्र।"
                : "Notices from the admissions desk, campus, placements and the diary — a classic bulletin, each story with its own photograph."}
            </p>
          </div>

          <div className="border-t-2 border-navy" />
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl grid-cols-2 gap-2 px-4 sm:mt-8 sm:grid-cols-5 sm:px-6">
          {FILM.map((frame) => (
            <figure key={frame.src} className="group relative overflow-hidden">
              <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                <Image
                  src={frame.src}
                  alt={hi ? frame.hi : frame.en}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width:640px) 50vw, 20vw"
                />
              </div>
              <figcaption className="mt-2 mb-1 text-center text-[10px] font-semibold tracking-[0.22em] text-stone-500 uppercase">
                {hi ? frame.hi : frame.en}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-y border-[#eedfd0] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-4 sm:px-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition",
                filter === f
                  ? "bg-navy text-white"
                  : "border border-[#eedfd0] bg-cream text-navy hover:border-brand hover:text-brand",
              )}
            >
              {hi ? FILTER_HI[f] : f}
            </button>
          ))}
        </div>
      </section>

      {lead ? (
        <section className="bg-cream">
          <div
            className={cn(
              "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:gap-14 lg:py-16",
              briefs.length ? "lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)]" : "",
            )}
          >
            <Link href={`/news/${lead.slug}`} className="group min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
                {hi ? "मुख पृष्ठ" : "Lead story"} · {lead.tag}
              </p>
              <div className="relative mt-4 aspect-[16/10] overflow-hidden">
                <Image
                  src={lead.image}
                  alt={hi ? lead.titleHi : lead.title}
                  fill
                  priority
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width:1024px) 100vw, 60vw"
                />
              </div>
              <p className="mt-3 text-[11px] tracking-[0.18em] text-stone-500 uppercase">
                {formatDate(lead.date, hi)} · {hi ? "नोएडा परिसर" : "Noida campus"}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-navy sm:text-4xl">
                {hi ? lead.titleHi : lead.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">
                {hi ? lead.excerptHi : lead.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                {hi ? "पूरा नोटिस" : "Read the notice"}
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>

            {briefs.length ? (
            <aside className="min-w-0 border-t border-[#eedfd0] pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-navy uppercase">
                {hi ? "इस अंक में" : "In this issue"}
              </p>
              <div className="mt-6 divide-y divide-[#eedfd0]">
                {briefs.map((item) => (
                  <Link key={item.slug} href={`/news/${item.slug}`} className="group flex gap-4 py-4 first:pt-0">
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="96px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold tracking-[0.18em] text-brand uppercase">
                        {item.tag} · {formatDate(item.date, hi)}
                      </p>
                      <h3 className="mt-1 font-serif text-lg leading-snug text-navy group-hover:text-brand">
                        {hi ? item.titleHi : item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
            ) : null}
          </div>
        </section>
      ) : null}

      {rest.length ? (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
            <div className="flex items-end justify-between gap-4 border-b-2 border-navy pb-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
                  {hi ? "डायरी" : "The diary"}
                </p>
                <h2 className="mt-2 font-serif text-3xl text-navy">
                  {hi ? "और छायाचित्र, और नोटिस" : "Further notices"}
                </h2>
              </div>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item, i) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className={cn("group", i === 0 && rest.length > 1 && "sm:col-span-2 lg:col-span-1")}
                >
                  <div className={cn("relative overflow-hidden", i === 0 && rest.length > 1 ? "aspect-[16/9] lg:aspect-[4/3]" : "aspect-[4/3]")}>
                    <Image
                      src={item.image}
                      alt={hi ? item.titleHi : item.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="mt-3 text-[10px] font-semibold tracking-[0.2em] text-brand uppercase">
                    {item.tag} · {formatDate(item.date, hi)}
                  </p>
                  <h3 className="mt-2 font-serif text-xl leading-snug text-navy group-hover:text-brand">
                    {hi ? item.titleHi : item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{hi ? item.excerptHi : item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-cream">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "प्रवेश डेस्क" : "The desk"}
            </p>
            <p className="mt-3 max-w-md font-serif text-2xl leading-snug text-navy sm:text-3xl">
              {hi
                ? "अगला नोटिस आपकी फाइल का हो सकता है।"
                : "The next notice can be the one that opens your file."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/counselling"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-white hover:bg-navy/90"
            >
              {hi ? "काउंसलिंग" : "Counselling"}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/admissions"
              className="inline-flex h-12 items-center rounded-full border border-[#eedfd0] bg-white px-7 text-sm font-semibold text-navy hover:border-brand hover:text-brand"
            >
              {hi ? "प्रवेश" : "Admissions"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
