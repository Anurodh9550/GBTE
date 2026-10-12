"use client";

import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { useI18n } from "@/components/providers/language-provider";
import { ABOUT, LEADERSHIP } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AboutPreview() {
  const { t, locale } = useI18n();
  return (
    <Reveal as="section" hover={false} amount={0.18} className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title={t.about.title} subtitle={SITE_LINE[locale]} eyebrow="Institution" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Reveal>
          <article className="h-full rounded-2xl border p-6">
            <h3 className="font-semibold text-navy">{t.about.vision}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{locale === "hi" ? ABOUT.visionHi : ABOUT.vision}</p>
          </article>
          </Reveal>
          <Reveal delay={0.06}>
          <article className="h-full rounded-2xl border p-6">
            <h3 className="font-semibold text-navy">{t.about.mission}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{locale === "hi" ? ABOUT.missionHi : ABOUT.mission}</p>
          </article>
          </Reveal>
          <Reveal delay={0.12}>
          <article className="h-full rounded-2xl border p-6">
            <h3 className="font-semibold text-navy">{t.about.accreditation}</h3>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-600">
              {(locale === "hi" ? ABOUT.accreditationHi : ABOUT.accreditation).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          </Reveal>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {LEADERSHIP.map((person, i) => (
            <Reveal key={person.role} delay={i * 0.06}>
            <blockquote className="h-full rounded-2xl border border-[#eedfd0] bg-[#fff8f2] p-6">
              <p className="text-sm font-semibold text-brand">{locale === "hi" ? person.roleHi : person.role}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">“{locale === "hi" ? person.messageHi : person.message}”</p>
            </blockquote>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/about" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6")}>
            {t.news.read}
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

const SITE_LINE = {
  en: "Gautam Buddha Educational Trust — Noida campus, one admission promise.",
  hi: "गौतम बुद्ध एजुकेशनल ट्रस्ट — नोएडा परिसर, एक प्रवेश वादा।",
};
