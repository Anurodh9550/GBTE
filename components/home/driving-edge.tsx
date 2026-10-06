"use client";

import { useEffect, useRef } from "react";
import { BarChart3, Layers, MapPin, Route } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";

const POINTS = [
  {
    icon: Route,
    title: "Proven method — Apply. Learn. Succeed.",
    titleHi: "सिद्ध विधि — आवेदन। सीखें। सफल हों।",
    body: "One counselling desk from enquiry to allotment, then labs and a first role.",
    bodyHi: "पूछताछ से आवंटन तक एक काउंसलिंग डेस्क, फिर लैब और पहली भूमिका।",
  },
  {
    icon: Layers,
    title: "Depth across schools",
    titleHi: "हर स्कूल में गहराई",
    body: "AI, design, hospitality, pharmacy, education and paramedical on one campus.",
    bodyHi: "एआई, डिज़ाइन, हॉस्पिटैलिटी, फार्मेसी, शिक्षा और पैरामेडिकल एक परिसर पर।",
  },
  {
    icon: MapPin,
    title: "Noida campus, live postings",
    titleHi: "नोएडा परिसर, लाइव पोस्टिंग",
    body: "Hospital, school and studio postings from Sector 63A — practice, not display.",
    bodyHi: "सेक्टर 63A से अस्पताल, विद्यालय और स्टूडियो पोस्टिंग — प्रदर्शन नहीं, अभ्यास।",
  },
  {
    icon: BarChart3,
    title: "Clear outcomes, quantified",
    titleHi: "स्पष्ट परिणाम, मापने योग्य",
    body: "95% placement support and 100+ hiring partners across hospitals, schools and IT.",
    bodyHi: "अस्पताल, विद्यालय और आईटी में 95% प्लेसमेंट सहायता और 100+ हायरिंग पार्टनर।",
  },
] as const;

export function DrivingEdge() {
  const { locale } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="relative z-0 isolate overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[28rem] lg:min-h-[36rem]">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-label={locale === "hi" ? "जीबीटीई परिसर" : "GBTE campus"}
          >
            <source src="/videos/driving-edge.mp4" type="video/mp4" />
            <source src="/Aerial_view_of_campus_20261006000604.mp4" type="video/mp4" />
          </video>
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#fff8f2] lg:to-[#fff8f2]"
            aria-hidden
          />
        </div>

        <div className="flex flex-col justify-center bg-[#fff8f2] px-5 py-14 sm:px-10 lg:px-14 lg:py-16">
          <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-navy sm:text-4xl sm:leading-[1.15]">
            {locale === "hi" ? "करियर रूपांतरण में हमारी धार" : "Our Edge in Driving Transformation"}
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12">
            {POINTS.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="max-w-xs">
                  <Icon className="size-10 stroke-[1.15] text-brand" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-navy">{locale === "hi" ? item.titleHi : item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{locale === "hi" ? item.bodyHi : item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
