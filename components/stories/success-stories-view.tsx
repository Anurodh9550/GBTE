"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { PLACEMENT_STATS, SUCCESS_STORIES } from "@/lib/content";
import { HIRING_COMPANIES } from "@/lib/site";
import { PartnerWordmark } from "@/components/brand/partner-logo";

export function SuccessStoriesView() {
  const { locale } = useI18n();
  const hi = locale === "hi";
  const featured = SUCCESS_STORIES[0];

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="relative h-64 overflow-hidden sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[62%]">
          <video
            src="/videos/about-learn.mp4"
            className="absolute inset-0 h-full w-full scale-[1.12] object-cover object-center brightness-[1.15]"
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-white from-0% via-white/20 via-22% to-transparent to-55% lg:bg-gradient-to-r lg:from-white lg:from-0% lg:via-white/30 lg:via-[8%] lg:to-transparent lg:to-[18%]"
            aria-hidden
          />
        </div>

        <div className="relative mx-auto flex min-h-[22rem] max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:min-h-[34rem] lg:py-20">
          <div className="relative z-10 max-w-lg">
            <p className="text-xs font-semibold tracking-[0.22em] text-brand uppercase">
              {hi ? "सफलता कथाएँ" : "Success Stories"}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-[2.75rem] sm:leading-[1.18]">
              {hi ? (
                <>
                  पहली भूमिकाएँ —
                  <br />
                  स्नातकों की ज़ुबानी
                </>
              ) : (
                <>
                  First roles,
                  <br />
                  told by graduates
                </>
              )}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              {hi
                ? "डिप्लोमा, डिग्री और सर्टिफिकेट से निकले छात्र अस्पताल, विद्यालय, फार्मेसी और आईटी में काम कर रहे हैं — लैब, काउंसलिंग और करियर सेल के साथ।"
                : "Alumni from diploma, degree and certificate pathways now work in hospitals, schools, pharmacy and IT — with labs, counselling and the career cell behind them."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-white transition hover:bg-navy/90"
              >
                {hi ? "आवेदन करें" : "Apply now"}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/placements"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#eedfd0] bg-white px-7 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
              >
                {hi ? "प्लेसमेंट देखें" : "View placements"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#eedfd0] bg-cream">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:grid-cols-4 sm:px-6">
          {PLACEMENT_STATS.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-semibold text-navy">
                {"display" in s && s.display ? (hi ? s.displayHi : s.display) : `${s.value}${s.suffix}`}
              </p>
              <p className="mt-1 text-sm text-stone-600">{hi ? s.labelHi : s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-brand uppercase">
                {hi ? "फीचर्ड" : "Featured"}
              </p>
              <blockquote className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-navy sm:text-3xl">
                “{hi ? featured.reviewHi : featured.review}”
              </blockquote>
              <p className="mt-6 text-sm font-semibold text-navy">{hi ? featured.nameHi : featured.name}</p>
              <p className="mt-1 text-sm text-stone-600">
                {hi ? featured.courseHi : featured.course} · {featured.placement} · {featured.package}
              </p>
            </div>
            <div className="relative min-h-[18rem] overflow-hidden rounded-2xl lg:min-h-[22rem]">
              <Image
                src={featured.photo}
                alt={hi ? featured.nameHi : featured.name}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {hi ? "कहानियाँ जिन्होंने फर्क किया" : "Stories that made a difference"}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            {hi
              ? "हर कथा एक परिसर अभ्यास और एक हायरिंग डेस्क के बीच की कड़ी है।"
              : "Each story is the link between campus practice and a hiring desk."}
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SUCCESS_STORIES.map((story) => (
              <article
                key={`${story.name}-${story.course}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#eedfd0] bg-white"
              >
                <div className="relative h-48">
                  <Image
                    src={story.photo}
                    alt={hi ? story.nameHi : story.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm font-semibold text-brand">{story.placement}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-600 line-clamp-4">
                    “{hi ? story.reviewHi : story.review}”
                  </p>
                  <div className="mt-auto pt-4">
                    <p className="text-sm font-semibold text-navy">{hi ? story.nameHi : story.name}</p>
                    <p className="mt-0.5 text-xs text-stone-500">
                      {hi ? story.courseHi : story.course} · {story.package}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold tracking-[0.22em] text-brand uppercase">
            {hi ? "हायरिंग पार्टनर" : "Hiring partners"}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-5">
            {HIRING_COMPANIES.map((name) => (
              <PartnerWordmark key={name} name={name} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xl text-2xl font-semibold tracking-tight text-navy">
            {hi ? "अगली सफलता कथा आपकी हो सकती है।" : "The next success story can be yours."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/counselling"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(232,92,26,0.28)] hover:bg-brand/90"
            >
              {hi ? "काउंसलिंग बुक करें" : "Book counselling"}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/apply"
              className="inline-flex h-11 items-center rounded-full border border-[#eedfd0] bg-white px-6 text-sm font-semibold text-navy hover:border-brand hover:text-brand"
            >
              {hi ? "आवेदन करें" : "Apply now"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
