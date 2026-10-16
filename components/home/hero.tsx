"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

const WORD_COLORS = ["text-[#ff5a12]", "text-[#14913a]", "text-[#8a3d16]"] as const;

const SLIDES = [
  {
    id: "apply",
    label: "Apply",
    labelHi: "आवेदन",
    body: "Build a career with industry-oriented diplomas in AI, Design, Pharmacy, Education and Paramedical Sciences.",
    bodyHi: "एआई, डिज़ाइन, फार्मेसी, शिक्षा और पैरामेडिकल डिप्लोमा से करियर बनाएँ।",
    href: "/apply",
    video: "/videos/hero-class.mp4",
  },
  {
    id: "learn",
    label: "Learn",
    labelHi: "सीखें",
    body: "Smart classrooms, labs and hospital-linked training on a working campus in Noida Sector 63A.",
    bodyHi: "नोएडा सेक्टर 63A के परिसर पर स्मार्ट कक्षाएँ, लैब और अस्पताल प्रशिक्षण।",
    href: "/campus",
    video: "/videos/hero-campus.mp4",
  },
  {
    id: "succeed",
    label: "Succeed",
    labelHi: "सफल हों",
    body: "A dedicated career cell, hiring partners and internships that turn a diploma into a first role.",
    bodyHi: "कैरियर सेल, हायरिंग पार्टनर और इंटर्नशिप — डिप्लोमा से पहली भूमिका तक।",
    href: "/placements",
    video: "/videos/hero-campus.mp4",
  },
] as const;

export function Hero() {
  const { locale } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = SLIDES[index];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const ringLabel =
    locale === "hi"
      ? "आवेदन करें · परिसर देखें · आवेदन करें · "
      : "Apply Now  ·  Contact Us  ·  Apply Now  ·  ";

  return (
    <Reveal as="section" hover={false} amount={0.18}
      className="relative overflow-hidden bg-[#fff8f2]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="GBTE admission highlights"
    >
      <div className="relative min-h-[26rem] sm:min-h-[30rem] lg:min-h-[34rem] xl:min-h-[36rem]">
        <Reveal lift={false} className="absolute inset-0">
        <HeroVideo src="/videos/hero-class.mp4" active={active.video === "/videos/hero-class.mp4"} />
        <HeroVideo src="/videos/hero-campus.mp4" active={active.video === "/videos/hero-campus.mp4"} />
        </Reveal>

        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,244,232,0.55)_70%,rgba(255,248,242,0.82)_100%)] lg:bg-[linear-gradient(90deg,rgba(255,250,246,0.94)_0%,rgba(255,228,206,0.72)_28%,rgba(255,255,255,0.15)_52%,transparent_68%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute -left-10 top-16 size-56 rounded-full bg-[#ff7a32]/35 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute bottom-10 left-24 size-48 rounded-full bg-[#2fbf5b]/25 blur-3xl" aria-hidden />

        <div className="relative z-10 mx-auto flex min-h-[26rem] max-w-7xl items-end px-4 pt-6 pb-6 sm:min-h-[30rem] sm:px-6 sm:py-8 lg:min-h-[34rem] lg:items-center lg:py-0 xl:min-h-[36rem]">
          <div className="max-w-md lg:max-w-lg">
            <div className="relative">
            <h1 className="font-medium tracking-tight">
              <span className="sr-only">Apply, Learn, Succeed</span>
              <span className="flex flex-col items-start gap-0.5 sm:gap-1" role="tablist" aria-label="Hero themes">
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    onClick={() => setIndex(i)}
                    onMouseEnter={() => setIndex(i)}
                    onFocus={() => setIndex(i)}
                    className={cn(
                      "text-left text-[2.65rem] leading-[1.02] transition sm:text-6xl sm:leading-[1.08] lg:text-[4.25rem]",
                      WORD_COLORS[i],
                      i === index
                        ? "opacity-100 drop-shadow-[0_6px_18px_rgba(255,255,255,0.9)]"
                        : "opacity-70 hover:opacity-100"
                    )}
                  >
                    {locale === "hi" ? slide.labelHi : slide.label}
                  </button>
                ))}
              </span>
            </h1>

            <p key={active.id} className="mt-4 max-w-[18rem] text-sm leading-6 font-medium text-[#5c2e14] transition-opacity sm:mt-6 sm:max-w-sm sm:text-base sm:leading-7">
              {locale === "hi" ? active.bodyHi : active.body}
            </p>
            </div>

            <Link
              href={active.href}
              className="mt-6 inline-flex size-[5.5rem] items-center justify-center sm:mt-10 sm:size-[7.25rem]"
              aria-label={locale === "hi" ? "अभी आवेदन करें" : "Apply Now"}
            >
              <span className="relative grid size-full place-items-center">
                <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 size-full">
                  <defs>
                    <path
                      id="hero-cta-circle"
                      d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                    />
                  </defs>
                  <text className="fill-brand text-[11px] font-semibold tracking-[0.28em] uppercase">
                    <textPath href="#hero-cta-circle">{ringLabel}</textPath>
                  </text>
                </svg>
                <span className="grid size-14 place-items-center rounded-full bg-brand text-white shadow-[0_10px_24px_rgba(232,92,26,0.35)] sm:size-[4.25rem]">
                  <ArrowRight className="size-5 sm:size-6" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function HeroVideo({ src, active }: { src: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <video
      ref={ref}
      src={src}
      className={cn(
        "absolute inset-0 h-full w-full object-cover object-[62%_center] brightness-110 saturate-125 contrast-105 transition-opacity duration-700 sm:object-center",
        active ? "opacity-100" : "opacity-0"
      )}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden={!active}
    />
  );
}
