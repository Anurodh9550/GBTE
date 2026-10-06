"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ADMISSION_STEPS, SCHOLARSHIPS } from "@/lib/content";
import { CAMPUSES, SITE } from "@/lib/site";
import { PROGRAMME_KINDS } from "@/lib/courses";

const ROMAN = ["I", "II", "III", "IV", "V"] as const;

const DOCUMENTS = [
  { en: "Passport photograph and government ID", hi: "पासपोर्ट फोटो और सरकारी पहचान" },
  { en: "Class 10 and 12 marksheets", hi: "कक्षा 10 और 12 की मार्कशीट" },
  { en: "Graduation marksheets, if applying for a degree", hi: "डिग्री के लिए स्नातक मार्कशीट" },
  { en: "Category or income certificate, where claimed", hi: "श्रेणी या आय प्रमाण, यदि लागू" },
  { en: "Transfer / character certificate", hi: "ट्रांसफर / चरित्र प्रमाण पत्र" },
];

const PATHS = [
  {
    kind: "diploma" as const,
    line: "10+2 as notified for pharmacy, education, paramedical, design and more.",
    lineHi: "फार्मेसी, शिक्षा, पैरामेडिकल, डिज़ाइन आदि के लिए अधिसूचित 10+2।",
  },
  {
    kind: "degree" as const,
    line: "Graduation or 10+2 with NCTE / PCI / university rules for the chosen programme.",
    lineHi: "चुने कार्यक्रम के लिए एनसीटीई / पीसीआई / विश्वविद्यालय नियमों के साथ स्नातक या 10+2।",
  },
  {
    kind: "certificate" as const,
    line: "Short professional certificates. 10+2 in any stream for most desks.",
    lineHi: "संक्षिप्त पेशेवर सर्टिफिकेट। अधिकांश डेस्क पर किसी भी स्ट्रीम में 10+2।",
  },
];

const campus = CAMPUSES[0];

export function AdmissionsView() {
  const { locale } = useI18n();
  const hi = locale === "hi";

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image
          src="/photos/campus-noida.jpg"
          alt={hi ? "जीबीटीई नोएडा परिसर" : "GBTE Noida campus"}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-cream/55" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/50 via-transparent to-cream/70" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 sm:py-28">
          <p className="text-[11px] font-semibold tracking-[0.38em] text-brand uppercase">
            {hi ? `सत्र ${SITE.year}` : `Session ${SITE.year}`}
          </p>
          <div className="mx-auto mt-6 h-px w-12 bg-brand" />
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-navy sm:text-6xl">
            {hi ? "प्रवेश" : "Admissions"}
          </h1>
          <p className="mt-6 text-base leading-8 text-stone-600">
            {hi
              ? "गौतम बुद्ध एजुकेशनल ट्रस्ट, नोएडा, डिप्लोमा, डिग्री और सर्टिफिकेट के लिए आवेदन आमंत्रित करता है। काउंसलिंग निःशुल्क है; सीट आवंटन पात्रता, दस्तावेज़ और शुल्क पुष्टि पर निर्भर है।"
              : "Gautam Buddha Educational Trust, Noida, invites applications for diploma, degree and certificate pathways. Counselling is complimentary; a seat is confirmed after eligibility, documents and fee."}
          </p>
          <p className="mt-8 text-[11px] font-semibold tracking-[0.22em] text-stone-500 uppercase">
            PCI · AICTE · NCTE
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#enquiry"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-white hover:bg-navy/90"
            >
              {hi ? "फ़ाइल शुरू करें" : "Open your file"}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/counselling"
              className="inline-flex h-12 items-center rounded-full border border-[#eedfd0] bg-white/90 px-7 text-sm font-semibold text-navy hover:border-brand hover:text-brand"
            >
              {hi ? "काउंसलिंग" : "Counselling"}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#eedfd0] bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(26rem,32rem)] lg:gap-16 lg:py-20">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "प्रवेश क्रम" : "The sequence"}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy">
              {hi ? "पाँच कदम, एक फ़ाइल" : "Five steps, one file"}
            </h2>
            <ol className="relative mt-12 border-l border-[#eedfd0] pl-8">
              {ADMISSION_STEPS.map((step, i) => (
                <li key={step.step} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[2.55rem] top-0 w-8 text-right text-xs font-semibold tracking-widest text-brand">
                    {ROMAN[i]}
                  </span>
                  <h3 className="text-lg font-semibold text-navy">
                    {hi ? step.titleHi : step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-7 text-stone-600">
                    {hi ? step.bodyHi : step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-[#eedfd0] bg-cream/60 p-5 sm:p-8">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
                {hi ? "फ़ाइल शुरू करें" : "Open your file"}
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {hi
                  ? "नाम, मोबाइल और कार्यक्रम भेजें। उसी कार्य दिवस पर डेस्क कॉल करेगा।"
                  : "Share your name, mobile and programme. The desk calls the same working day."}
              </p>
              <div className="mt-6">
                <EnquiryForm compact />
              </div>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="mt-5 flex items-center gap-2 text-sm font-medium text-navy hover:text-brand"
              >
                <Phone className="size-4 text-brand" />
                {SITE.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:py-20">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "दस्तावेज़" : "Documents"}
            </p>
            <div className="mt-4 h-px w-10 bg-brand" />
            <ul className="mt-8 space-y-4">
              {DOCUMENTS.map((item, i) => (
                <li key={item.en} className="flex gap-4 border-b border-[#eedfd0] pb-4 text-sm leading-6 text-stone-600">
                  <span className="w-6 shrink-0 text-xs tracking-widest text-brand">0{i + 1}</span>
                  {hi ? item.hi : item.en}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#1f7a32] uppercase">
              {hi ? "पात्रता" : "Eligibility"}
            </p>
            <div className="mt-4 h-px w-10 bg-[#1f7a32]" />
            <ul className="mt-8 space-y-8">
              {PATHS.map((path) => {
                const kind = PROGRAMME_KINDS.find((k) => k.id === path.kind)!;
                return (
                  <li key={path.kind}>
                    <h3 className="text-lg font-semibold text-navy">{hi ? kind.labelHi : kind.label}</h3>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{hi ? path.lineHi : path.line}</p>
                  </li>
                );
              })}
            </ul>
            <Link href="/courses" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
              {hi ? "सभी कार्यक्रम देखें" : "See all programmes"}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
            {hi ? "छात्रवृत्ति" : "Scholarships"}
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-navy">
            {hi ? "योग्यता और आवश्यकता, दोनों के लिए मार्ग" : "Aid for merit, and for need"}
          </h2>
          <div className="mt-12 divide-y divide-[#eedfd0] border-y border-[#eedfd0]">
            {SCHOLARSHIPS.map((s) => (
              <div key={s.slug} className="grid gap-2 py-6 sm:grid-cols-[14rem_1fr_11rem] sm:items-baseline">
                <p className="font-semibold text-navy">{hi ? s.titleHi : s.title}</p>
                <p className="text-sm leading-6 text-stone-600">{hi ? s.detailHi : s.detail}</p>
                <p className="text-sm font-medium text-brand sm:text-right">{hi ? s.amountHi : s.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-8 border-t border-brand/30 pt-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
                {hi ? "प्रवेश डेस्क" : "The admissions desk"}
              </p>
              <p className="mt-4 max-w-md text-lg leading-8 text-navy">
                {campus.address}
              </p>
              <p className="mt-2 text-sm text-stone-600">
                {SITE.email} · {SITE.phone}
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
                href="/brochure"
                className="inline-flex h-12 items-center rounded-full border border-[#eedfd0] bg-white px-7 text-sm font-semibold text-navy hover:border-brand hover:text-brand"
              >
                {hi ? "ब्रांशर" : "Brochure"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
