"use client";

import {
  BookOpen,
  Briefcase,
  Building2,
  FlaskConical,
  GraduationCap,
  Laptop,
  MonitorSmartphone,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { useI18n } from "@/components/providers/language-provider";
import { WHY_CHOOSE } from "@/lib/content";

const ICONS = {
  BookOpen,
  Users,
  MonitorSmartphone,
  FlaskConical,
  Briefcase,
  GraduationCap,
  Building2,
  Laptop,
};

export function WhyChoose() {
  const { t, locale } = useI18n();
  return (
    <section className="bg-[#fff8f2] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          align="left"
          title={locale === "hi" ? "उन विद्यार्थियों के लिए जो बढ़ना चाहते हैं" : "Built for students who want to grow"}
          subtitle={t.why.subtitle}
          eyebrow="Why GBTE"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.slice(0, 4).map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <article className="h-full rounded-2xl border border-[#eedfd0] bg-white p-5 shadow-[0_8px_24px_rgba(61,41,24,0.08)] transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(61,41,24,0.12)]">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-semibold text-navy">{locale === "hi" ? item.titleHi : item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{locale === "hi" ? item.bodyHi : item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
