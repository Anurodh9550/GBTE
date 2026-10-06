"use client";

import { useI18n } from "@/components/providers/language-provider";
import { ABOUT } from "@/lib/content";

export function VisionMission() {
  const { locale } = useI18n();
  const hi = locale === "hi";

  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-24">
      <video
        src="/videos/vision-globe.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.12] object-cover object-center"
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-cream/55" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:py-8">
        <article className="max-w-md">
          <div className="relative">
            <span className="pointer-events-none absolute -left-3 -top-10 select-none font-serif text-[7.5rem] leading-none text-brand/20 sm:-left-5 sm:text-[9rem]">
              “
            </span>
            <p className="relative text-2xl font-semibold text-brand sm:text-3xl">
              {hi ? "हमारी दृष्टि" : "Our Vision"}
            </p>
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {hi ? "सीखो, अभ्यास करो, भूमिका पाओ" : "Learn, practise and place"}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-stone-600 sm:text-base">
            {hi ? ABOUT.visionHi : ABOUT.vision}
          </p>
        </article>

        <article className="max-w-sm lg:mt-40 lg:ml-auto">
          <div className="relative">
            <span className="pointer-events-none absolute -left-3 -top-10 select-none font-serif text-[7.5rem] leading-none text-[#1f7a32]/25 sm:-left-5 sm:text-[9rem]">
              “
            </span>
            <p className="relative text-2xl font-semibold text-[#1f7a32] sm:text-3xl">
              {hi ? "हमारा मिशन" : "Our Mission"}
            </p>
          </div>
          <p className="mt-5 text-sm leading-7 text-stone-600 sm:text-base">
            {hi ? ABOUT.missionHi : ABOUT.mission}
          </p>
        </article>
      </div>

      <article className="relative mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <div className="relative max-w-md">
          <span className="pointer-events-none absolute -left-3 -top-10 select-none font-serif text-[7.5rem] leading-none text-brand/20 sm:-left-5 sm:text-[9rem]">
            “
          </span>
          <p className="relative text-2xl font-semibold text-brand sm:text-3xl">
            {hi ? "हमारा प्रत्यायन" : "Our Accreditation"}
          </p>
        </div>
        <ul className="mt-6 max-w-lg list-disc space-y-2 pl-5 text-sm leading-7 text-stone-600 sm:text-base">
          {(hi ? ABOUT.accreditationHi : ABOUT.accreditation).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
