"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { ABOUT, LEADERSHIP } from "@/lib/content";
import { CAMPUSES } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ConnectMap } from "@/components/about/connect-map";
import { VisionMission } from "@/components/about/vision-mission";

const ABOUT_HERO_VIDEOS = ["/videos/about-learn.mp4", "/videos/about-campus.mp4"] as const;

function scrollToHash() {
  const id = window.location.hash.replace("#", "");
  if (!id) return;
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

function AboutHeroVideo({ src, active }: { src: string; active: boolean }) {
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
        "absolute inset-0 h-full w-full origin-center scale-[1.14] object-cover object-center brightness-[1.2] contrast-[1.05] transition-opacity duration-700",
        active ? "opacity-100" : "opacity-0",
      )}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden={!active}
    />
  );
}

export function AboutView() {
  const { locale } = useI18n();
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setVideoIndex((current) => (current + 1) % ABOUT_HERO_VIDEOS.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section id="overview" className="relative overflow-hidden bg-white">
        <div className="relative h-64 overflow-hidden sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[82%]">
          {ABOUT_HERO_VIDEOS.map((src, index) => (
            <AboutHeroVideo key={src} src={src} active={videoIndex === index} />
          ))}
          <div
            className="absolute inset-0 bg-gradient-to-t from-white from-0% via-white/18 via-22% to-transparent to-50% lg:bg-gradient-to-r lg:from-white lg:from-0% lg:via-white/25 lg:via-[6%] lg:to-transparent lg:to-[12%]"
            aria-hidden
          />
        </div>

        <div className="relative mx-auto flex min-h-[22rem] max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:min-h-[36rem] lg:py-20">
          <div className="relative z-10 max-w-lg">
            <h1 className="text-4xl font-semibold tracking-tight text-navy sm:text-[2.75rem] sm:leading-[1.18]">
              {locale === "hi" ? (
                <>
                  डिप्लोमा, डिग्री और सर्टिफिकेट से
                  <br />
                  करियर की पहली भूमिका
                </>
              ) : (
                <>
                  Driving first roles through
                  <br />
                  diploma, degree and certificate
                </>
              )}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              {locale === "hi" ? ABOUT.missionHi : ABOUT.mission}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(61,41,24,0.18)] transition hover:bg-navy/90"
            >
              {locale === "hi" ? "संपर्क करें" : "Contact Us"}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <ConnectMap />

      <VisionMission />

      <section id="leadership" className="scroll-mt-28 bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-navy">
            {locale === "hi" ? "नेतृत्व" : "Leadership"}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {LEADERSHIP.map((person) => (
              <blockquote key={person.role} className="rounded-2xl border border-[#eedfd0] bg-white p-6">
                <p className="text-sm font-semibold text-brand">{locale === "hi" ? person.roleHi : person.role}</p>
                <p className="mt-1 font-semibold text-navy">{person.name}</p>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  “{locale === "hi" ? person.messageHi : person.message}”
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="campus" className="scroll-mt-28 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.22em] text-brand uppercase">
            {locale === "hi" ? "परिसर" : "Campus"}
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-navy">
            {locale === "hi" ? "नोएडा मुख्यालय — सेक्टर 63ए" : "Noida headquarters — Sector 63A"}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">
            {CAMPUSES[0].address}
          </p>
          <Link
            href="/campus"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            {locale === "hi" ? "पूरा परिसर देखें" : "Explore the campus"}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/photos/campus-noida.jpg" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-[#3d2918]/55" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xl text-lg font-medium text-white sm:text-xl">
            {locale === "hi"
              ? "साथ मिलकर हम आपकी पहली भूमिका बनाते हैं।"
              : "Together, we shape your first role — a digital and employable future."}
          </p>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(232,92,26,0.28)] hover:bg-brand/90"
          >
            {locale === "hi" ? "संपर्क करें" : "Contact Us"}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
