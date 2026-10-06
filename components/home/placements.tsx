"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Briefcase, Building2, Handshake, MessageCircle, Share2 } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";

const TRACKS = [
  {
    icon: Briefcase,
    title: "Career mapping",
    titleHi: "करियर मैपिंग",
    href: "/admissions",
    body: "Counselling maps hospitals, schools, pharmacy and IT roles to the credential you actually chose.",
    bodyHi: "काउंसलिंग अस्पताल, विद्यालय, फार्मेसी और आईटी भूमिकाओं को आपके क्रेडेंशियल से जोड़ती है।",
    lines: [
      "M0 34 C 52 34, 78 78, 118 80",
      "M0 80 H 118",
      "M0 126 C 52 126, 78 82, 118 80",
      "M280 34 C 228 34, 202 78, 162 80",
      "M280 80 H 162",
      "M280 126 C 228 126, 202 82, 162 80",
    ],
  },
  {
    icon: Building2,
    title: "Internship postings",
    titleHi: "इंटर्नशिप पोस्टिंग",
    href: "/campus",
    body: "Hospital, school and studio postings run with the semester — so the first job is not a surprise.",
    bodyHi: "अस्पताल, विद्यालय और स्टूडियो पोस्टिंग सेमेस्टर के साथ चलती हैं — पहली नौकरी अचानक नहीं लगती।",
    lines: [
      "M0 28 C 36 28, 36 80, 118 80",
      "M0 80 H 118",
      "M0 132 C 36 132, 36 80, 118 80",
      "M0 52 C 28 52, 42 80, 90 80",
      "M280 28 C 244 28, 244 80, 162 80",
      "M280 80 H 162",
      "M280 132 C 244 132, 244 80, 162 80",
    ],
  },
  {
    icon: Share2,
    title: "Placement drives",
    titleHi: "प्लेसमेंट ड्राइव",
    href: "/placements",
    body: "Campus drives with 100+ hiring partners across healthcare, education, pharmacy and IT.",
    bodyHi: "हेल्थकेयर, शिक्षा, फार्मेसी और आईटी में 100+ हायरिंग पार्टनर के साथ कैंपस ड्राइव।",
    lines: [
      "M0 40 C 60 40, 88 80, 118 80",
      "M0 80 H 118",
      "M0 120 C 60 120, 88 80, 118 80",
      "M280 22 C 236 22, 210 80, 162 80",
      "M280 80 H 162",
      "M280 138 C 236 138, 210 80, 162 80",
    ],
  },
  {
    icon: MessageCircle,
    title: "Interview prep",
    titleHi: "इंटरव्यू तैयारी",
    href: "/contact",
    body: "Mock interviews, portfolio reviews and professional-skills coaching from the career cell.",
    bodyHi: "कैरियर सेल से मॉक इंटरव्यू, पोर्टफोलियो रिव्यू और प्रोफेशनल स्किल कोचिंग।",
    lines: [
      "M0 24 C 48 24, 70 80, 118 80",
      "M0 80 H 118",
      "M0 136 C 48 136, 70 80, 118 80",
      "M280 46 C 232 46, 200 80, 162 80",
      "M280 80 H 162",
      "M280 114 C 232 114, 200 80, 162 80",
    ],
  },
  {
    icon: Handshake,
    title: "Hiring partners",
    titleHi: "हायरिंग पार्टनर",
    href: "/placements",
    body: "Apollo, Fortis, TCS, Wipro, HCL and more — partners who hire the roles this campus trains.",
    bodyHi: "अपोलो, फोर्टिस, टीसीएस, विप्रो, एचसीएल — जो भूमिका हम सिखाते हैं, वही भर्ती करते हैं।",
    lines: [
      "M0 38 C 44 38, 44 80, 118 80",
      "M0 80 H 118",
      "M0 122 C 44 122, 44 80, 118 80",
      "M280 38 C 236 38, 236 80, 162 80",
      "M280 80 H 162",
      "M280 122 C 236 122, 236 80, 162 80",
    ],
  },
] as const;

function NodeField({ lines }: { lines: readonly string[] }) {
  return (
    <svg className="absolute inset-0 h-full w-full text-brand transition-colors duration-300 group-hover:text-cyan" viewBox="0 0 280 160" fill="none" aria-hidden>
      {lines.map((d, i) => (
        <g key={`${d}-${i}`}>
          <path d={d} stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" opacity="0.5" />
          <path d={d} className="line-flow" stroke="currentColor" strokeWidth="2.35" strokeLinecap="round" />
          <g className="line-arrow">
            <polygon points="0,-3.4 10,0 0,3.4 2.2,0" fill="currentColor">
              <animateMotion dur={`${1.45 + (i % 3) * 0.2}s`} begin={`${i * 0.12}s`} repeatCount="indefinite" rotate="auto" path={d} />
            </polygon>
          </g>
        </g>
      ))}
    </svg>
  );
}

function TrackCard({ track, locale }: { track: (typeof TRACKS)[number]; locale: string }) {
  const Icon = track.icon;
  return (
    <Link
      href={track.href}
      className="group flex h-full w-[17.25rem] shrink-0 flex-col rounded-2xl border border-[#e7d8c8] bg-white transition duration-300 hover:-translate-y-1 hover:border-brand/45 hover:bg-linear-to-b hover:from-[#fff1e6] hover:to-[#f3d5b8] hover:shadow-[0_16px_32px_rgba(232,92,26,0.14)]"
    >
      <div className="relative h-40">
        <NodeField lines={track.lines} />
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid size-16 place-items-center rounded-full bg-brand text-white transition duration-300 group-hover:bg-cyan">
            <Icon className="size-7 stroke-[1.5]" aria-hidden />
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-6 pt-1 pb-7">
        <h3 className="text-[1.15rem] leading-snug font-semibold text-navy">
          {locale === "hi" ? track.titleHi : track.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">{locale === "hi" ? track.bodyHi : track.body}</p>
      </div>
    </Link>
  );
}

export function Placements() {
  const { locale } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [nudge, setNudge] = useState(0);
  const count = TRACKS.length;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, count, nudge]);

  const prev = () => {
    setIndex((current) => (current - 1 + count) % count);
    setNudge((value) => value + 1);
  };
  const next = () => {
    setIndex((current) => (current + 1) % count);
    setNudge((value) => value + 1);
  };

  return (
    <section className="relative z-0 isolate overflow-x-clip bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold tracking-tight text-navy sm:text-2xl lg:text-3xl lg:whitespace-nowrap">
            {locale === "hi" ? "करियर सेल से प्लेसमेंट तक का स्पष्ट मार्ग" : "Placement support to Drive Career Transformation"}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            {locale === "hi"
              ? "कैरियर डेवलपमेंट सेल अस्पताल, डायग्नोस्टिक्स, फार्मेसी और विद्यालयों के हायरिंग पार्टनर के साथ इंटर्नशिप और पहली भूमिका तक ले जाता है।"
              : "A dedicated career cell with hiring partners across hospitals, diagnostics, pharmacy and schools — internships, drives and a first role, not only a certificate."}
          </p>
          <Link
            href="/placements"
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(232,92,26,0.28)] hover:bg-brand/90"
          >
            {locale === "hi" ? "और जानें" : "Read more"}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div
        className="mx-auto mt-12 max-w-7xl overflow-hidden px-4 sm:px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex gap-4 transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(calc(-${index} * (17.25rem + 1rem)))` }}
        >
          {[...TRACKS, ...TRACKS].map((track, i) => (
            <TrackCard key={`${track.title}-${i}`} track={track} locale={locale} />
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-5 text-sm font-medium text-navy">
          <button
            type="button"
            onClick={prev}
            className="grid size-9 place-items-center rounded-full border border-[#eedfd0] hover:border-brand hover:text-brand"
            aria-label={locale === "hi" ? "पिछला" : "Previous"}
          >
            <ArrowLeft className="size-4" />
          </button>
          <span className="tabular-nums tracking-wide">
            {index + 1}/{count}
          </span>
          <button
            type="button"
            onClick={next}
            className="grid size-9 place-items-center rounded-full border border-[#eedfd0] hover:border-brand hover:text-brand"
            aria-label={locale === "hi" ? "अगला" : "Next"}
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
