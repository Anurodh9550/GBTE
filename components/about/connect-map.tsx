"use client";

import Image from "next/image";
import { useI18n } from "@/components/providers/language-provider";

export function ConnectMap() {
  const { locale } = useI18n();
  const hi = locale === "hi";

  return (
    <section className="relative isolate min-h-[28rem] overflow-hidden sm:min-h-[34rem] lg:min-h-[40rem]">
      <Image
        src="/photos/world-connect.jpg"
        alt={hi ? "GBTE का वैश्विक कनेक्ट मैप — भारत केंद्र" : "GBTE connect map with India at the centre"}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority={false}
      />

      <div className="relative z-10 flex min-h-[28rem] w-full flex-col items-start px-6 pt-6 sm:min-h-[34rem] sm:px-10 sm:pt-8 lg:min-h-[40rem] lg:px-16 lg:pt-10">
        <div className="max-w-md text-left">
          <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {hi ? "हम छात्रों को पहली भूमिका से जोड़ते हैं" : "We connect talent with first roles"}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            {hi
              ? "GBTE डिप्लोमा, डिग्री और सर्टिफिकेट को काउंसलिंग, लैब और प्लेसमेंट से जोड़ता है — नोएडा से अस्पताल, स्कूल और इंडस्ट्री तक।"
              : "GBTE bridges diploma, degree and certificate pathways with counselling, labs and placements — from Noida into hospitals, schools and industry."}
          </p>
        </div>

        <div className="pointer-events-none absolute top-1/2 left-[30%] z-10 -translate-x-1/2 -translate-y-1/2 sm:left-[34%]">
          <div className="grid size-28 place-items-center rounded-full bg-white/95 text-center shadow-[0_0_0_10px_rgba(232,92,26,0.08),0_0_40px_rgba(232,92,26,0.25)] sm:size-40">
            <div className="px-3">
              <p className="text-2xl font-semibold tracking-tight text-navy sm:text-4xl">5000+</p>
              <p className="mt-1 text-[10px] leading-4 text-stone-600 sm:text-xs">
                {hi ? "छात्र — डिप्लोमा, डिग्री, सर्टिफिकेट" : "Students across diploma, degree and certificate"}
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 right-6 z-10 sm:bottom-12 sm:right-10 lg:right-16">
          <div className="grid size-24 place-items-center rounded-full bg-white/95 text-center shadow-[0_0_0_8px_rgba(31,122,50,0.08),0_0_36px_rgba(31,122,50,0.22)] sm:size-32">
            <div className="px-3">
              <p className="text-xl font-semibold tracking-tight text-navy sm:text-3xl">100+</p>
              <p className="mt-1 text-[10px] leading-4 text-stone-600 sm:text-xs">
                {hi ? "हायरिंग पार्टनर" : "Hiring partners"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
