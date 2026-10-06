"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, FlaskConical, GraduationCap, Route, Trophy } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";

const EDGES = [
  {
    icon: Route,
    title: "Proven admission path",
    titleHi: "सिद्ध प्रवेश मार्ग",
    body: "Apply. Learn. Succeed. — one counselling desk from enquiry to allotment.",
    bodyHi: "आवेदन। सीखें। सफल हों। — पूछताछ से आवंटन तक एक काउंसलिंग डेस्क।",
  },
  {
    icon: GraduationCap,
    title: "Depth across schools",
    titleHi: "हर स्कूल में गहराई",
    body: "AI, design, hospitality, pharmacy, education and paramedical on one campus.",
    bodyHi: "एआई, डिज़ाइन, हॉस्पिटैलिटी, फार्मेसी, शिक्षा और पैरामेडिकल एक परिसर पर।",
  },
  {
    icon: FlaskConical,
    title: "Labs that match the job",
    titleHi: "नौकरी जैसी लैब",
    body: "Pharmacy, diagnostic, studio and kitchen spaces built for practice, not display.",
    bodyHi: "फार्मेसी, डायग्नोस्टिक, स्टूडियो और किचन — प्रदर्शन नहीं, अभ्यास के लिए।",
  },
  {
    icon: Trophy,
    title: "Clear placement outcomes",
    titleHi: "स्पष्ट प्लेसमेंट परिणाम",
    body: "95% placement support with hospitals, schools and 100+ hiring partners.",
    bodyHi: "अस्पताल, विद्यालय और 100+ हायरिंग पार्टनर के साथ 95% प्लेसमेंट सहायता।",
  },
] as const;

export function OurEdge() {
  const { locale } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="overflow-hidden bg-[#fff8f2] pt-10 pb-6 sm:pt-12 sm:pb-8 lg:pt-14 lg:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            {locale === "hi" ? "करियर बढ़ाने वालों के लिए बना परिसर" : "Built for students who want to grow"}
          </h2>
          <Link
            href="/about"
            className="mt-3 inline-flex h-10 items-center gap-2 rounded-full border border-[#eedfd0] bg-white px-5 text-sm font-semibold text-navy hover:border-brand"
          >
            {locale === "hi" ? "और जानें" : "Know More"}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-5 grid items-start gap-5 lg:mt-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-3">
          <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
            {EDGES.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="max-w-xs">
                  <Icon className="size-7 stroke-[1.2] text-brand" aria-hidden />
                  <h3 className="mt-1.5 text-xl font-semibold text-navy">
                    {locale === "hi" ? item.titleHi : item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {locale === "hi" ? item.bodyHi : item.body}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="relative flex min-h-[14rem] -translate-y-4 items-center justify-center overflow-hidden lg:min-h-[22rem] lg:-translate-y-8">
            <svg className="absolute h-0 w-0" aria-hidden>
              <filter id="gbte-cream-match" colorInterpolationFilters="sRGB">
                <feComponentTransfer>
                  <feFuncR type="linear" slope="1" intercept="0.078" />
                  <feFuncG type="linear" slope="1" intercept="0.118" />
                  <feFuncB type="linear" slope="1" intercept="0.188" />
                </feComponentTransfer>
              </filter>
            </svg>
            <video
              ref={videoRef}
              className="w-[138%] max-w-none origin-bottom saturate-125"
              style={{ filter: "url(#gbte-cream-match) saturate(1.22)" }}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              aria-label="GBTE career edge"
            >
              <source src="/videos/edge.mp4" type="video/mp4" />
              <source src="/Rotating_wireframe_human_brain_20261005163839.mp4" type="video/mp4" />
            </video>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 58% 64% at 50% 48%, transparent 40%, #fff8f2 73%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
