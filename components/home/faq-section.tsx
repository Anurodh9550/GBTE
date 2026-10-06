"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { useI18n } from "@/components/providers/language-provider";
import { FAQS } from "@/lib/content";

export function FaqSection({ limit }: { limit?: number }) {
  const { t, locale } = useI18n();
  const items = limit ? FAQS.slice(0, limit) : FAQS;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading title={t.faq.title} eyebrow="Help" />
        <Accordion className="mt-8 rounded-2xl border bg-white px-4">
          {items.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`}>
              <AccordionTrigger className="py-4 text-left text-navy">
                {locale === "hi" ? item.qHi : item.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                {locale === "hi" ? item.aHi : item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
