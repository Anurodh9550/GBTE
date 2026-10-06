"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

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
    <section
      className="relative overflow-hidden bg-[#fff8f2]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="GBTE admission highlights"
    >
      <div className="relative min-h-[36rem] lg:min-h-[42rem] xl:min-h-[46rem]">
        <HeroVideo src="/videos/hero-class.mp4" active={active.video === "/videos/hero-class.mp4"} />
        <HeroVideo src="/videos/hero-campus.mp4" active={active.video === "/videos/hero-campus.mp4"} />

        <div
          className="absolute inset-0 bg-linear-to-t from-[#fff8f2] from-25% via-[#fff8f2]/55 via-45% to-transparent to-70% lg:bg-linear-to-r lg:from-[#fff8f2] lg:from-[32%] lg:via-[#fff8f2]/80 lg:via-[48%] lg:to-transparent lg:to-[72%]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[36rem] max-w-7xl items-end px-4 py-10 sm:px-6 lg:min-h-[42rem] lg:items-center lg:py-0 xl:min-h-[46rem]">
          <div className="max-w-md lg:max-w-lg">
            <h1 className="font-medium tracking-tight">
              <span className="sr-only">Apply, Learn, Succeed</span>
              <span className="flex flex-col items-start gap-1" role="tablist" aria-label="Hero themes">
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "text-left text-5xl leading-[1.08] transition sm:text-6xl lg:text-[4.25rem]",
                      i === index ? "text-navy" : "text-navy/30 hover:text-navy/60"
                    )}
                  >
                    {locale === "hi" ? slide.labelHi : slide.label}
                  </button>
                ))}
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-stone-600 sm:text-base">
              {locale === "hi" ? active.bodyHi : active.body}
            </p>

            <Link
              href={active.href}
              className="mt-10 inline-flex size-[7.25rem] items-center justify-center"
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
                <span className="grid size-[4.25rem] place-items-center rounded-full bg-brand text-white shadow-[0_10px_24px_rgba(232,92,26,0.35)]">
                  <ArrowRight className="size-6" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
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
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
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
