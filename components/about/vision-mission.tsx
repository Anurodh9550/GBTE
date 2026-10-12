"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/components/providers/language-provider";
import { ABOUT } from "@/lib/content";
import { Reveal } from "@/components/shared/reveal";

export function VisionMission() {
  const { locale } = useI18n();
  const hi = locale === "hi";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }, []);

  return (
    <Reveal as="section" hover={false} amount={0.18} className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
      <Reveal lift={false} className="pointer-events-none absolute inset-0">
      <video
        ref={videoRef}
        src="/videos/vision-globe.mp4"
        className="h-full w-full object-cover opacity-[0.16]"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      </Reveal>
      <div className="pointer-events-none absolute inset-0 bg-cream/82" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-stretch gap-5 md:gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal>
          <article className="flex h-full flex-col rounded-3xl border border-[#eedfd0] bg-white/90 p-7 shadow-[0_12px_32px_rgba(61,41,24,0.06)] sm:p-9 lg:p-10">
            <div className="h-1 w-12 rounded-full bg-brand" aria-hidden />
            <h2 className="mt-5 font-serif text-3xl tracking-tight text-navy sm:text-[2.15rem]">
              {hi ? "हमारी दृष्टि" : "Our Vision"}
            </h2>
            <p className="mt-4 max-w-prose text-base leading-8 text-stone-700">
              {hi ? ABOUT.visionHi : ABOUT.vision}
            </p>
          </article>
          </Reveal>

          <Reveal delay={0.08}>
          <article className="flex h-full flex-col rounded-3xl border border-[#eedfd0] bg-white/90 p-7 shadow-[0_12px_32px_rgba(61,41,24,0.06)] sm:p-9 lg:p-10">
            <div className="h-1 w-12 rounded-full bg-cyan" aria-hidden />
            <h2 className="mt-5 font-serif text-3xl tracking-tight text-navy sm:text-[2.15rem]">
              {hi ? "हमारा मिशन" : "Our Mission"}
            </h2>
            <p className="mt-4 max-w-prose text-base leading-8 text-stone-700">
              {hi ? ABOUT.missionHi : ABOUT.mission}
            </p>
          </article>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
}
