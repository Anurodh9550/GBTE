"use client";

import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { useI18n } from "@/components/providers/language-provider";
import { FACILITIES } from "@/lib/content";

export function CampusGallery() {
  const { t, locale } = useI18n();
  return (
    <section className="bg-[#fff8f2] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title={t.campus.title} subtitle={t.campus.subtitle} eyebrow="Campuses" />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {FACILITIES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.03} className={i === 0 ? "col-span-2 row-span-2" : ""}>
              <figure className="group relative h-40 overflow-hidden rounded-2xl md:h-full min-h-40">
                <Image
                  src={f.image}
                  alt={locale === "hi" ? f.titleHi : f.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-brand/80 to-transparent p-3 text-sm font-medium text-white">
                  {locale === "hi" ? f.titleHi : f.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
