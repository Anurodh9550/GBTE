"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { useI18n } from "@/components/providers/language-provider";
import { STATS } from "@/lib/content";
import { ABOUT } from "@/lib/content";

export function GrowthStory() {
  const { locale } = useI18n();
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-stretch gap-8 px-4 sm:px-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#eedfd0] bg-[#fff8f2] p-7 shadow-[0_8px_24px_rgba(61,41,24,0.08)] sm:p-8">
          <p className="text-xs font-semibold tracking-[0.22em] text-brand uppercase">Institution</p>
          <h2 className="mt-3 max-w-md text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {locale === "hi" ? "डिप्लोमा से करियर तक" : "Powering careers through diploma education"}
          </h2>
          <p className="mt-5 text-base leading-8 text-stone-600">
            {locale === "hi" ? ABOUT.missionHi : ABOUT.mission}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90"
          >
            {locale === "hi" ? "हमारी कहानी पढ़ें" : "Learn More About Our Story"}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[#eedfd0] bg-white p-5 shadow-[0_8px_24px_rgba(61,41,24,0.08)] transition hover:shadow-[0_12px_32px_rgba(61,41,24,0.12)] sm:p-6"
            >
              <p className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-stone-600">{locale === "hi" ? s.labelHi : s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
