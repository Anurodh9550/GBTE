"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useI18n } from "@/components/providers/language-provider";
import { SUCCESS_STORIES } from "@/lib/content";
import { HIRING_COMPANIES } from "@/lib/site";
import { PartnerWordmark } from "@/components/brand/partner-logo";

const IMPACT = [
  {
    type: "story" as const,
    story: SUCCESS_STORIES[0],
    badge: "Success Story",
    badgeHi: "सफलता कथा",
    title: "From D Pharma labs to Apollo Hospitals: a first clinical role.",
    titleHi: "डी फार्मा लैब से अपोलो हॉस्पिटल्स — पहली क्लिनिकल भूमिका।",
    image: "/photos/pharmacy.jpg",
    readMore: false,
  },
  {
    type: "story" as const,
    story: SUCCESS_STORIES[1],
    badge: "Success Story",
    badgeHi: "सफलता कथा",
    title: "Diagnostic rotations that opened a Fortis lab career.",
    titleHi: "डायग्नोस्टिक रोटेशन ने फोर्टिस लैब करियर खोला।",
    image: "/photos/medical.jpg",
    readMore: false,
  },
  {
    type: "news" as const,
    slug: "placement-drives",
    badge: "News",
    badgeHi: "समाचार",
    title: "Placement drives with Apollo, Fortis, TCS and 100+ hiring desks.",
    titleHi: "अपोलो, फोर्टिस, टीसीएस और 100+ हायरिंग डेस्क के साथ प्लेसमेंट ड्राइव।",
    image: "/photos/seminar.jpg",
    readMore: true,
  },
  {
    type: "news" as const,
    slug: "workshops",
    badge: "Campus",
    badgeHi: "परिसर",
    title: "Clinical skills workshops that turn practice into first jobs.",
    titleHi: "क्लिनिकल स्किल्स वर्कशॉप जो अभ्यास को पहली नौकरी बनाती हैं।",
    image: "/photos/education.jpg",
    readMore: true,
  },
  {
    type: "story" as const,
    story: SUCCESS_STORIES[2],
    badge: "Success Story",
    badgeHi: "सफलता कथा",
    title: "School internships that led to a classroom role in two years.",
    titleHi: "स्कूल इंटर्नशिप से दो साल में कक्षा भूमिका मिली।",
    image: "/photos/classroom.jpg",
    readMore: false,
  },
  {
    type: "story" as const,
    story: SUCCESS_STORIES[3],
    badge: "Success Story",
    badgeHi: "सफलता कथा",
    title: "Imaging labs that opened a Medanta radiology posting.",
    titleHi: "इमेजिंग लैब से मेदांता रेडियोलॉजी पोस्टिंग खुली।",
    image: "/photos/xray.jpg",
    readMore: false,
  },
  {
    type: "news" as const,
    slug: "admission-open-2027",
    badge: "Admissions",
    badgeHi: "प्रवेश",
    title: "Admission Open 2027: diploma, degree and certificate desks are live.",
    titleHi: "प्रवेश 2027 खुला — डिप्लोमा, डिग्री और सर्टिफिकेट डेस्क लाइव।",
    image: "/photos/campus-noida.jpg",
    readMore: true,
  },
  {
    type: "news" as const,
    slug: "scholarship-announcements",
    badge: "Scholarships",
    badgeHi: "छात्रवृत्ति",
    title: "Merit, girl-child and EWS scholarships now taking documents.",
    titleHi: "मेरिट, बालिका और ईडब्ल्यूएस छात्रवृत्ति के दस्तावेज़ चल रहे हैं।",
    image: "/photos/library.jpg",
    readMore: true,
  },
  {
    type: "story" as const,
    story: SUCCESS_STORIES[6],
    badge: "Success Story",
    badgeHi: "सफलता कथा",
    title: "AI studio hours that mapped onto a first TCS sprint.",
    titleHi: "एआई स्टूडियो घंटे पहली टीसीएस स्प्रिंट तक गए।",
    image: "/photos/ai.jpg",
    readMore: false,
  },
  {
    type: "story" as const,
    story: SUCCESS_STORIES[5],
    badge: "Success Story",
    badgeHi: "सफलता कथा",
    title: "OT rotations that became a Fortis theatre first role.",
    titleHi: "ओटी रोटेशन से फोर्टिस थिएटर पहली भूमिका बनी।",
    image: "/photos/surgery.jpg",
    readMore: false,
  },
  {
    type: "news" as const,
    slug: "campus-events",
    badge: "Campus",
    badgeHi: "परिसर",
    title: "Orientation and campus fest dates for the 2027 batch.",
    titleHi: "2027 बैच के ओरिएंटेशन और कैंपस फेस्ट की तिथियाँ।",
    image: "/photos/sports.jpg",
    readMore: true,
  },
  {
    type: "story" as const,
    story: SUCCESS_STORIES[9],
    badge: "Success Story",
    badgeHi: "सफलता कथा",
    title: "Dispensing practice that continued onto a Cipla plant floor.",
    titleHi: "डिस्पेंसिंग अभ्यास सिप्ला प्लांट फ्लोर तक चला।",
    image: "/photos/pharmacy.jpg",
    readMore: false,
  },
] as const;

function partnerMeta(placement: string) {
  if (placement.includes("Apollo")) return { mark: "Apollo", type: "Hospital", typeHi: "अस्पताल" };
  if (placement.includes("Fortis")) return { mark: "Fortis", type: "Hospital", typeHi: "अस्पताल" };
  if (placement.includes("Medanta")) return { mark: "Medanta", type: "Hospital", typeHi: "अस्पताल" };
  if (placement.includes("TCS")) return { mark: "TCS", type: "IT", typeHi: "आईटी" };
  if (placement.includes("Wipro")) return { mark: "Wipro", type: "IT", typeHi: "आईटी" };
  if (placement.includes("HCL")) return { mark: "HCL", type: "IT", typeHi: "आईटी" };
  if (placement.includes("Infosys")) return { mark: "Infosys", type: "IT", typeHi: "आईटी" };
  if (placement.includes("Cipla")) return { mark: "Cipla", type: "Pharma", typeHi: "फार्मा" };
  if (placement.includes("Sun Pharma")) return { mark: "Sun Pharma", type: "Pharma", typeHi: "फार्मा" };
  if (placement.includes("Deloitte")) return { mark: "Deloitte", type: "Consulting", typeHi: "कंसल्टिंग" };
  if (placement.includes("Kendriya") || placement.includes("Vidyalaya")) {
    return { mark: "Kendriya Vidyalaya", type: "School", typeHi: "विद्यालय" };
  }
  if (placement.includes("School")) return { mark: "UP Govt. School", type: "School", typeHi: "विद्यालय" };
  return { mark: null, type: "Partner", typeHi: "पार्टनर" };
}

function QuoteMark() {
  return (
    <svg viewBox="0 0 72 48" className="h-11 w-16 text-brand" aria-hidden>
      <path
        fill="currentColor"
        d="M14.5 6.5c7.4 0 13.2 5.6 13.2 14.6 0 3.6-1 7.2-3.2 10.4L16.2 46.5c5.4-7.6 8.2-13.4 8.2-20.6 0-7.4-4.4-12.8-10.4-12.8-7.2 0-11.2 5.6-11.2 11.6 0 4.6 2.6 8.2 7.2 9.4-.8-2.6-1.2-4.8-1.2-7.2 0-7.8 2.8-16.8 5.7-20.4zm36 0c7.4 0 13.2 5.6 13.2 14.6 0 3.6-1 7.2-3.2 10.4L52.2 46.5c5.4-7.6 8.2-13.4 8.2-20.6 0-7.4-4.4-12.8-10.4-12.8-7.2 0-11.2 5.6-11.2 11.6 0 4.6 2.6 8.2 7.2 9.4-.8-2.6-1.2-4.8-1.2-7.2 0-7.8 2.8-16.8 5.7-20.4z"
      />
    </svg>
  );
}

export function SuccessStories() {
  const { locale } = useI18n();
  const [active, setActive] = useState<(typeof SUCCESS_STORIES)[number] | null>(null);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [nudge, setNudge] = useState(0);
  const [impactPage, setImpactPage] = useState(0);
  const [impactPaused, setImpactPaused] = useState(false);
  const pages = Math.ceil(SUCCESS_STORIES.length / 2);
  const slides = Array.from({ length: pages }, (_, i) => SUCCESS_STORIES.slice(i * 2, i * 2 + 2));
  const impactPages = Math.ceil(IMPACT.length / 4);
  const impactSlides = Array.from({ length: impactPages }, (_, i) => IMPACT.slice(i * 4, i * 4 + 4));
  const logosLeft = [...HIRING_COMPANIES, ...HIRING_COMPANIES, ...HIRING_COMPANIES, ...HIRING_COMPANIES];
  const logosRight = [...logosLeft].reverse();

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setPage((current) => (current + 1) % pages);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [paused, pages, nudge]);

  useEffect(() => {
    if (impactPaused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setImpactPage((current) => (current + 1) % impactPages);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [impactPaused, impactPages]);

  const prev = () => {
    setPage((current) => (current - 1 + pages) % pages);
    setNudge((value) => value + 1);
  };
  const next = () => {
    setPage((current) => (current + 1) % pages);
    setNudge((value) => value + 1);
  };

  return (
    <>
      <section className="relative z-0 isolate bg-white py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-[2.5rem] sm:leading-tight">
              {locale === "hi" ? "अस्पताल और उद्योग के साथ साझेदारी" : "Partnering with Hospitals & Industry"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-[15px]">
              {locale === "hi"
                ? "हम अस्पताल, डायग्नोस्टिक्स, फार्मेसी, विद्यालय और आईटी नेटवर्क के साथ काम करते हैं ताकि स्नातक पहली भूमिका तक पहुँचें — केवल सर्टिफिकेट नहीं।"
                : "We partner with hospitals, diagnostics, pharmacy, schools and IT networks to deliver first roles — not only a certificate. Hiring desks span Apollo, Fortis, Medanta, TCS, Wipro, HCL and 100+ partners."}
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-[15px]">
              {locale === "hi"
                ? "डिप्लोमा, डिग्री या सर्टिफिकेट — काउंसलिंग, लैब अभ्यास और प्लेसमेंट सेल एक सिस्टम की तरह काम करते हैं।"
                : "Whether you join through a diploma, degree or certificate, counselling, lab practice and the career cell work as one system."}
            </p>
            <Link
              href="/placements"
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(232,92,26,0.28)] hover:bg-brand/90"
            >
              {locale === "hi" ? "और जानें" : "Know more"}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />
            <div className="flex flex-col gap-4">
              <div className="animate-marquee flex w-max flex-nowrap items-center gap-16 pr-16">
                {logosLeft.map((name, i) => (
                  <div key={`left-${name}-${i}`} className="w-44 shrink-0">
                    <PartnerWordmark name={name} />
                  </div>
                ))}
              </div>
              <div className="animate-marquee-reverse flex w-max flex-nowrap items-center gap-16 pr-16">
                {logosRight.map((name, i) => (
                  <div key={`right-${name}-${i}`} className="w-44 shrink-0">
                    <PartnerWordmark name={name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-0 isolate bg-cream pt-16 pb-8 sm:pt-20 sm:pb-10">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-[2.6rem] sm:leading-tight">
            {locale === "hi" ? "कहानियाँ जिन्होंने फर्क किया।" : "Stories that made a difference."}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-stone-600 sm:text-[15px]">
            {locale === "hi"
              ? "जीबीटीई में हर सफलता एक साझेदारी है — लैब अभ्यास, इंटरव्यू तैयारी और हायरिंग पार्टनर एक साथ काम करते हैं। डिप्लोमा, डिग्री या सर्टिफिकेट से निकले स्नातक अस्पताल, विद्यालय और उद्योग में पहली भूमिका तक पहुँचते हैं।"
              : "At GBTE every outcome is a purposeful partnership — lab practice, interview prep and hiring desks working as one. From diploma, degree or certificate pathways, graduates step into first roles across hospitals, schools and industry."}
          </p>
          <Link
            href="/news"
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(232,92,26,0.28)] hover:bg-brand/90"
          >
            {locale === "hi" ? "और देखें" : "Explore more"}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6">
          <div
            className="overflow-hidden"
            onMouseEnter={() => setImpactPaused(true)}
            onMouseLeave={() => setImpactPaused(false)}
          >
            <div
              className="flex"
              style={{ transform: `translateX(-${impactPage * 100}%)`, transition: "transform 700ms ease-in-out" }}
            >
              {impactSlides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                  style={{ flex: "0 0 100%" }}
                >
                {slide.map((item) => {
                  const badge = locale === "hi" ? item.badgeHi : item.badge;
                  const title = locale === "hi" ? item.titleHi : item.title;
                  const readLabel = locale === "hi" ? "और पढ़ें" : "Read More";
                  const inner = (
                    <>
                      <Image
                        src={item.image}
                        alt={title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-[#1f7a32]/50 mix-blend-multiply" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3d2918]/88 via-[#3d2918]/25 to-transparent" />
                      <div className="relative z-10 flex h-full min-h-[26rem] flex-col p-5">
                        <span className="w-fit rounded-md bg-brand/90 px-2.5 py-1 text-[11px] font-medium text-white">
                          {badge}
                        </span>
                        <h3 className="mt-5 text-[1.45rem] font-semibold leading-snug tracking-tight text-white">
                          {title}
                        </h3>
                        {item.readMore ? (
                          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-white">
                            {readLabel}
                            <ArrowRight className="size-4" />
                          </span>
                        ) : (
                          <span className="mt-auto" />
                        )}
                      </div>
                    </>
                  );

                  if (item.type === "story") {
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setActive(item.story)}
                        className="group relative isolate overflow-hidden rounded-2xl text-left"
                      >
                        {inner}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.slug}
                      href={`/news/${item.slug}`}
                      className="group relative isolate overflow-hidden rounded-2xl"
                    >
                      {inner}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="relative z-0 isolate bg-cream pt-8 pb-8 sm:pt-10 sm:pb-10">
        <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-[2.5rem]">
              {locale === "hi" ? "अस्पताल और उद्योग का विश्वव्यापी विश्वास" : "Trusted by Hospitals & Industry Worldwide"}
            </h2>
            <Link
              href="/placements"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(232,92,26,0.28)] hover:bg-brand/90"
            >
              {locale === "hi" ? "सभी देखें" : "View All"}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div
            className="mt-10 overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {slides.map((pair, slideIndex) => (
                <div key={slideIndex} className="grid min-w-full shrink-0 basis-full grid-cols-1 gap-6 lg:grid-cols-2">
                  {pair.map((story) => {
                    const meta = partnerMeta(story.placement);
                    return (
                      <article
                        key={story.name}
                        className="flex min-h-[300px] flex-col rounded-2xl border border-[#eedfd0] bg-white p-7 text-left shadow-sm sm:min-h-[340px] sm:p-10"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <QuoteMark />
                          <div className="w-44 shrink-0 text-right">
                            {meta.mark ? (
                              <PartnerWordmark name={meta.mark} className="h-10 justify-end text-navy" />
                            ) : (
                              <p className="text-sm font-semibold tracking-wide text-navy uppercase">
                                {story.placement}
                              </p>
                            )}
                            <p className="mt-1 text-[11px] font-semibold tracking-[0.14em] text-cyan uppercase">
                              {locale === "hi" ? meta.typeHi : meta.type}
                            </p>
                          </div>
                        </div>
                        <p className="mt-5 text-sm leading-7 text-stone-600 sm:text-[15px]">
                          “{locale === "hi" ? story.reviewHi : story.review}”
                        </p>
                        <div className="mt-auto flex items-center gap-3 pt-8">
                          <span className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-brand/40">
                            <Image
                              src={story.photo}
                              alt={locale === "hi" ? story.nameHi : story.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </span>
                          <div>
                            <p className="font-semibold text-navy">{locale === "hi" ? story.nameHi : story.name}</p>
                            <p className="text-xs text-stone-500">
                              {locale === "hi" ? story.courseHi : story.course} · {story.placement}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5 text-sm font-medium text-navy">
            <button
              type="button"
              aria-label={locale === "hi" ? "पिछला" : "Previous testimonials"}
              onClick={prev}
              className="grid size-9 place-items-center rounded-full border border-[#eedfd0] bg-white hover:border-brand hover:text-brand"
            >
              <ArrowLeft className="size-4" />
            </button>
            <span>
              {page + 1}/{pages}
            </span>
            <button
              type="button"
              aria-label={locale === "hi" ? "अगला" : "Next testimonials"}
              onClick={next}
              className="grid size-9 place-items-center rounded-full border border-[#eedfd0] bg-white hover:border-brand hover:text-brand"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="sm:max-w-lg">
          {active ? (
            <>
              <DialogHeader>
                <DialogTitle>{locale === "hi" ? active.nameHi : active.name}</DialogTitle>
                <DialogDescription>
                  {locale === "hi" ? active.courseHi : active.course} · {active.placement} · {active.package}
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-6 text-stone-600">{locale === "hi" ? active.reviewHi : active.review}</p>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
