"use client";

import { Award } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { AWARDS } from "@/lib/content";

export function Awards() {
  const { locale } = useI18n();
  const row = [...AWARDS, ...AWARDS];

  return (
    <section className="relative z-0 isolate bg-white pt-6 pb-14 sm:pt-8 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-navy sm:text-[2.5rem]">
          {locale === "hi" ? "पुरस्कार" : "Awards"}
        </h2>
      </div>

      <div className="mt-10 overflow-hidden">
        <div className="animate-marquee flex w-max gap-5 pr-5">
          {row.map((award, i) => (
            <article
              key={`${award.title}-${i}`}
              className="flex w-72 shrink-0 flex-col items-center rounded-2xl border border-[#eedfd0] bg-cream px-6 py-8 text-center"
            >
              <span className="grid size-16 place-items-center rounded-full bg-brand text-white shadow-[0_8px_20px_rgba(232,92,26,0.28)]">
                <Award className="size-7" aria-hidden />
              </span>
              <p className="mt-4 text-xs font-semibold tracking-[0.18em] text-cyan uppercase">{award.year}</p>
              <h3 className="mt-2 text-[15px] font-semibold leading-snug text-navy">{locale === "hi" ? award.titleHi : award.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{locale === "hi" ? award.bodyHi : award.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
