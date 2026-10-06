"use client";

import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { useI18n } from "@/components/providers/language-provider";
import { SCHOLARSHIPS } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Scholarships() {
  const { t, locale } = useI18n();
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title={t.scholarships.title} subtitle={t.scholarships.subtitle} eyebrow="Aid" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SCHOLARSHIPS.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-2xl border border-[#eedfd0] bg-white p-5">
                <h3 className="text-lg font-semibold text-navy">{locale === "hi" ? s.titleHi : s.title}</h3>
                <p className="mt-2 font-medium text-brand">{locale === "hi" ? s.amountHi : s.amount}</p>
                <p className="mt-3 flex-1 text-sm text-stone-600">{locale === "hi" ? s.detailHi : s.detail}</p>
                <Link href="/scholarships" className={cn(buttonVariants({ variant: "outline" }), "mt-4 h-10 border-brand/30 text-navy hover:bg-[#fff8f2]")}>
                  {t.news.read}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
