"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, Puzzle, RefreshCw, Search } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { useI18n } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Apply",
    titleHi: "आवेदन",
    href: "/apply",
    cta: "Start application",
    ctaHi: "आवेदन शुरू करें",
    body: "We start with your marks, interests and constraints. Counselling maps the diploma that will actually move your career.",
    bodyHi: "अंक, रुचि और सीमाएँ समझकर काउंसलिंग वही डिप्लोमा सुझाती है जो करियर आगे बढ़ाए।",
    process: [
      { title: "Enquiry", titleHi: "पूछताछ", detail: "Share your marks, city and the field you want to enter.", detailHi: "अंक, शहर और वो क्षेत्र बताएँ जिसमें आप जाना चाहते हैं।" },
      { title: "Counselling", titleHi: "काउंसलिंग", detail: "A counsellor maps diploma, degree or certificate to your goal.", detailHi: "काउंसलर आपके लक्ष्य के हिसाब से डिप्लोमा, डिग्री या सर्टिफिकेट सुझाता है।" },
      { title: "Documents", titleHi: "दस्तावेज़", detail: "Marksheets, ID and category proofs go into your admission file.", detailHi: "मार्कशीट, आईडी और श्रेणी प्रमाण आपकी प्रवेश फाइल में जाते हैं।" },
      { title: "Allotment", titleHi: "आवंटन", detail: "Fee, allotment letter and student portal access close the step.", detailHi: "शुल्क, आवंटन पत्र और स्टूडेंट पोर्टल से यह चरण पूरा होता है।" },
    ],
  },
  {
    n: "02",
    icon: Puzzle,
    title: "Learn",
    titleHi: "सीखें",
    href: "/courses",
    cta: "See programmes",
    ctaHi: "कार्यक्रम देखें",
    body: "Classrooms, labs and hospital or school postings run together — technology and practice aimed at one job-ready goal.",
    bodyHi: "कक्षा, लैब और अस्पताल या विद्यालय पोस्टिंग एक साथ चलती हैं — अभ्यास एक लक्ष्य से जुड़ा रहता है।",
    process: [
      { title: "Classroom", titleHi: "कक्षा", detail: "Subject teaching with faculty who work the same tools you will use.", detailHi: "वही टूल सिखाने वाले फैकल्टी के साथ विषय की पढ़ाई।" },
      { title: "Labs", titleHi: "लैब", detail: "Pharmacy, diagnostic, studio and kitchen practice — not display labs.", detailHi: "फार्मेसी, डायग्नोस्टिक, स्टूडियो और किचन — प्रदर्शन नहीं, अभ्यास।" },
      { title: "Posting", titleHi: "पोस्टिंग", detail: "Hospital, school or studio posting so the job is not a surprise.", detailHi: "अस्पताल, विद्यालय या स्टूडियो पोस्टिंग — नौकरी अचानक न लगे।" },
      { title: "Review", titleHi: "समीक्षा", detail: "Internal assessments keep the semester tied to one job-ready goal.", detailHi: "आंतरिक आकलन से सेमेस्टर एक जॉब-रेडी लक्ष्य से जुड़ा रहता है।" },
    ],
  },
  {
    n: "03",
    icon: RefreshCw,
    title: "Succeed",
    titleHi: "सफल हों",
    href: "/placements",
    cta: "See placements",
    ctaHi: "प्लेसमेंट देखें",
    body: "Placement support, internships and interviews turn the diploma into a first role — not just a certificate.",
    bodyHi: "प्लेसमेंट, इंटर्नशिप और साक्षात्कार डिप्लोमा को पहली भूमिका में बदलते हैं।",
    process: [
      { title: "Internship", titleHi: "इंटर्नशिप", detail: "A live posting with hospitals, schools or hiring partners.", detailHi: "अस्पताल, विद्यालय या हायरिंग पार्टनर के साथ लाइव पोस्टिंग।" },
      { title: "Prep", titleHi: "तैयारी", detail: "Interview, portfolio and professional-skills support from the career cell.", detailHi: "कैरियर सेल से इंटरव्यू, पोर्टफोलियो और प्रोफेशनल स्किल सपोर्ट।" },
      { title: "Connect", titleHi: "कनेक्ट", detail: "100+ hiring partners shortlist against the role you trained for.", detailHi: "100+ हायरिंग पार्टनर उसी भूमिका के लिए शॉर्टलिस्ट करते हैं।" },
      { title: "Offer", titleHi: "ऑफर", detail: "The credential becomes a first role — not only a certificate.", detailHi: "क्रेडेंशियल पहली भूमिका बनती है — केवल सर्टिफिकेट नहीं।" },
    ],
  },
] as const;

export function PathToCareer() {
  const { locale } = useI18n();
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  const show = (id: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const hide = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 180);
  };

  return (
    <section className="path-mesh relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <svg className="absolute -top-16 right-[-6rem] h-[28rem] w-[28rem] text-brand/15" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="92" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="148" stroke="currentColor" strokeWidth="0.8" />
        </svg>
        <svg
          className="absolute inset-x-0 top-24 hidden h-40 w-full opacity-40 md:block"
          viewBox="0 0 1200 160"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M-20 110 C 220 30, 420 150, 640 70 S 1020 30, 1220 100"
            stroke="#e85c1a"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold tracking-tight text-navy sm:text-2xl lg:text-3xl lg:whitespace-nowrap">
            {locale === "hi" ? "डिजिटल करियर रूपांतरण का मार्ग" : "The Pathway to Digital Career Transformation"}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-stone-600">
            {locale === "hi"
              ? "हर सफल प्रवेश स्पष्टता से शुरू होता है। तीन चरण — आवेदन, सीखना, सफल होना।"
              : "Every successful admission starts with clarity. Three steps — apply, learn, succeed."}
          </p>
          <Link
            href="/admissions"
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(232,92,26,0.28)] hover:bg-brand/90"
          >
            {locale === "hi" ? "और जानें" : "Know More"}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="relative mt-12 grid items-start gap-6 md:grid-cols-3">
          <svg
            className="pointer-events-none absolute top-[2.4rem] right-[12%] left-[12%] hidden h-8 md:block"
            viewBox="0 0 800 32"
            fill="none"
            aria-hidden
          >
            <path
              d="M0 16 C 140 16, 140 16, 200 16 S 280 4, 400 4 S 520 28, 600 16 S 720 16, 800 16"
              stroke="#e85c1a"
              strokeWidth="2"
              strokeDasharray="7 8"
              strokeOpacity="0.45"
            />
          </svg>

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const active = open === step.title;
            return (
              <Reveal
                key={step.title}
                delay={i * 0.08}
                className={cn("relative overflow-visible", active && "z-30")}
              >
                <article
                  className={cn(
                    "relative overflow-hidden rounded-3xl border bg-white/85 p-6 shadow-[0_12px_32px_rgba(61,41,24,0.1)] backdrop-blur-sm transition duration-300",
                    active
                      ? "border-brand shadow-[0_18px_40px_rgba(232,92,26,0.16)]"
                      : "border-[#eedfd0] hover:border-brand/50"
                  )}
                  onMouseEnter={() => show(step.title)}
                  onMouseLeave={hide}
                  onFocus={() => show(step.title)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) hide();
                  }}
                  onClick={() => {
                    if (window.matchMedia("(hover: hover)").matches) return;
                    if (closeTimer.current) window.clearTimeout(closeTimer.current);
                    setOpen((current) => (current === step.title ? null : step.title));
                  }}
                  aria-expanded={active}
                >
                  <span className="pointer-events-none absolute -right-2 -bottom-4 text-8xl font-semibold text-brand/[0.08] select-none">
                    {step.n}
                  </span>
                  <div className="relative flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-2xl transition",
                        active ? "bg-brand text-white" : "bg-[#fff1e6] text-brand"
                      )}
                    >
                      <Icon className="size-6 stroke-[1.6]" aria-hidden />
                    </span>
                    <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
                      {locale === "hi" ? `चरण ${step.n}` : `Step ${step.n}`}
                    </p>
                  </div>
                  <h3 className="relative mt-5 text-2xl font-semibold text-navy">
                    {locale === "hi" ? step.titleHi : step.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-6 text-stone-600">
                    {locale === "hi" ? step.bodyHi : step.body}
                  </p>

                  <div
                    className={cn(
                      "relative grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out",
                      active ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
                        {locale === "hi" ? "प्रक्रिया" : "Process"}
                      </p>
                      <ol className="mt-3 space-y-2.5">
                        {step.process.map((item, index) => (
                          <li key={item.title} className="flex gap-3">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#fff1e6] text-[10px] font-bold text-brand">
                              {index + 1}
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-navy">
                                {locale === "hi" ? item.titleHi : item.title}
                              </span>
                              <span className="mt-0.5 block text-xs leading-5 text-stone-600">
                                {locale === "hi" ? item.detailHi : item.detail}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ol>
                      <Link
                        href={step.href}
                        className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white hover:bg-brand/90"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {locale === "hi" ? step.ctaHi : step.cta}
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
