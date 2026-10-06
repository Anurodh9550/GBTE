"use client";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { useI18n } from "@/components/providers/language-provider";
import { ADMISSION_STEPS } from "@/lib/content";

export function AdmissionProcess() {
  const { t, locale } = useI18n();
  return (
    <section className="bg-[#fff8f2] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title={t.process.title} subtitle={t.process.subtitle} eyebrow="How to join" />
        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {ADMISSION_STEPS.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.05}>
              <li className="relative h-full rounded-2xl border bg-white p-5">
                <span className="text-3xl font-bold text-brand/20">0{step.step}</span>
                <h3 className="mt-2 font-semibold text-navy">{locale === "hi" ? step.titleHi : step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{locale === "hi" ? step.bodyHi : step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
