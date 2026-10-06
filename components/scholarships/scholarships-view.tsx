"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { SCHOLARSHIPS } from "@/lib/content";
import { SITE } from "@/lib/site";

const HERO_FILM = [
  { src: "/photos/classroom.jpg", en: "Merit", hi: "मेरिट" },
  { src: "/photos/education.jpg", en: "Girl child", hi: "बालिका" },
  { src: "/photos/sports.jpg", en: "Sports", hi: "खेल" },
  { src: "/photos/campus-jalaun.jpg", en: "Need-based", hi: "आवश्यकता" },
  { src: "/photos/library.jpg", en: "The file", hi: "फाइल" },
  { src: "/photos/hero.jpg", en: "Counselling", hi: "काउंसलिंग" },
] as const;

const ROMAN = ["I", "II", "III", "IV"] as const;

const STEPS = [
  {
    title: "Open the admission file",
    titleHi: "प्रवेश फाइल शुरू करें",
    body: "Apply for diploma, degree or certificate. The bursary is claimed on the same file — not a second form.",
    bodyHi: "डिप्लोमा, डिग्री या सर्टिफिकेट के लिए आवेदन करें। सहायता उसी फाइल पर माँगी जाती है — दूसरा फॉर्म नहीं।",
  },
  {
    title: "Attach the papers",
    titleHi: "कागज़ लगाएँ",
    body: "Marksheets, ID, and — where claimed — income, EWS or sports certificates. Incomplete files wait.",
    bodyHi: "मार्कशीट, आईडी, और — यदि दावा है — आय, ईडब्ल्यूएस या खेल प्रमाण। अधूरी फाइलें रुकती हैं।",
  },
  {
    title: "Sit with counselling",
    titleHi: "काउंसलिंग में बैठें",
    body: "A counsellor names the award that fits the programme. Merit and need are not guessed from the website.",
    bodyHi: "काउंसलर बताते हैं कि कार्यक्रम के लिए कौन-सी सहायता बैठती है। वेबसाइट से अनुमान नहीं।",
  },
  {
    title: "Written on the fee letter",
    titleHi: "शुल्क पत्र पर लिखा जाता है",
    body: "The waiver is confirmed only after documents and seat confirmation at the Noida desk.",
    bodyHi: "दस्तावेज़ और सीट पुष्टि के बाद ही छूट नोएडा डेस्क पर लिखी जाती है।",
  },
] as const;

const NOTES = [
  {
    en: "Awards are limited for the session and confirmed only after verification.",
    hi: "सत्र की सहायता सीमित है और केवल जाँच के बाद पुष्टि होती है।",
  },
  {
    en: "You may be eligible for more than one line; counselling names the one that applies.",
    hi: "एक से अधिक पंक्ति संभव है; काउंसलिंग वही बताती है जो लागू हो।",
  },
  {
    en: "Diploma, degree and certificate files are all received at the same desk.",
    hi: "डिप्लोमा, डिग्री और सर्टिफिकेट फाइलें एक ही डेस्क पर आती हैं।",
  },
] as const;

export function ScholarshipsView() {
  const { locale } = useI18n();
  const hi = locale === "hi";
  const film = [...HERO_FILM, ...HERO_FILM];

  return (
    <>
      <section className="overflow-hidden bg-cream">
        <div className="relative isolate">
          <Image
            src="/photos/hero-class.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-cream/70" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-b from-cream/50 via-cream/40 to-cream"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-20 sm:pb-12">
            <p className="text-[11px] font-semibold tracking-[0.38em] text-brand uppercase">
              {hi ? `सत्र ${SITE.year}` : `Session ${SITE.year}`}
            </p>
            <div className="mx-auto mt-6 h-px w-12 bg-brand" />
            <h1 className="mt-6 font-serif text-5xl font-medium tracking-tight text-navy sm:text-6xl">
              {hi ? "छात्रवृत्ति" : "Scholarships"}
            </h1>
            <p className="mt-6 text-base leading-8 text-stone-600">
              {hi
                ? "मेरिट, बालिका, खेल और आवश्यकता — चार पंक्तियाँ, एक डेस्क। छूट कागज़ और काउंसलिंग के बाद शुल्क पत्र पर लिखी जाती है।"
                : "Merit, girl child, sports and need — four lines, one desk. A waiver is written on the fee letter after papers and counselling, not from a poster."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="#steps"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-white hover:bg-navy/90"
              >
                {hi ? "चार कदम" : "Four steps"}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#awards"
                className="inline-flex h-12 items-center rounded-full border border-[#eedfd0] bg-white px-7 text-sm font-semibold text-navy hover:border-brand hover:text-brand"
              >
                {hi ? "चार पंक्तियाँ" : "The four awards"}
              </Link>
            </div>
          </div>
        </div>

        <div className="pb-10 sm:pb-14">
          <div className="overflow-hidden">
            <div className="animate-card-marquee flex w-max gap-3 pr-3 hover:[animation-play-state:paused] sm:gap-4 sm:pr-4">
              {film.map((frame, i) => (
                <figure key={`${frame.src}-${i}`} className="w-44 shrink-0 sm:w-56">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={frame.src}
                      alt={hi ? frame.hi : frame.en}
                      fill
                      className="object-cover"
                      sizes="224px"
                      priority={i < 4}
                    />
                  </div>
                  <figcaption className="mt-2 text-center text-[10px] font-semibold tracking-[0.2em] text-stone-500 uppercase">
                    {hi ? frame.hi : frame.en}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#eedfd0] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:grid-cols-4 sm:px-6">
          {SCHOLARSHIPS.map((s) => (
            <div key={s.slug}>
              <p className="font-serif text-xl text-navy">{hi ? s.amountHi : s.amount}</p>
              <p className="mt-1 text-sm text-stone-600">{hi ? s.titleHi : s.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="steps" className="scroll-mt-24 bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
            {hi ? "प्रक्रिया" : "How an award is confirmed"}
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl text-navy sm:text-4xl">
            {hi ? "पोस्टर से नहीं — फाइल से, चार कदम" : "Four steps, from the file — not the poster"}
          </h2>

          <ol className="mt-12 divide-y divide-[#eedfd0] border-y border-[#eedfd0]">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-4 py-8 sm:grid-cols-[5rem_1fr] sm:items-baseline lg:grid-cols-[6rem_16rem_1fr] lg:gap-10"
              >
                <p className="font-serif text-3xl text-brand">{ROMAN[i]}</p>
                <h3 className="text-lg font-semibold text-navy">{hi ? step.titleHi : step.title}</h3>
                <p className="text-sm leading-7 text-stone-600 sm:col-span-2 lg:col-span-1">
                  {hi ? step.bodyHi : step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="awards" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="border-b-2 border-navy pb-6">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "लेजर" : "The ledger"}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-navy sm:text-4xl">
              {hi ? "चार पंक्तियाँ, अलग कागज़" : "Four lines, each with its papers"}
            </h2>
          </div>

          <div className="mt-10 space-y-8">
            {SCHOLARSHIPS.map((s, i) => (
              <article
                key={s.slug}
                className="grid overflow-hidden border border-[#eedfd0] bg-cream lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]"
              >
                <div className="relative min-h-[14rem] lg:min-h-[15rem]">
                  <Image
                    src={s.image}
                    alt={hi ? s.titleHi : s.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 22rem"
                  />
                </div>
                <div className="flex flex-col justify-center px-6 py-8 sm:px-10">
                  <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
                    {ROMAN[i]} · {hi ? s.amountHi : s.amount}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-navy sm:text-3xl">
                    {hi ? s.titleHi : s.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-stone-600">
                    {hi ? s.detailHi : s.detail}
                  </p>
                  <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-[10px] font-semibold tracking-[0.18em] text-stone-400 uppercase">
                        {hi ? "पात्रता" : "Eligibility"}
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-navy">{hi ? s.eligibilityHi : s.eligibility}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold tracking-[0.18em] text-stone-400 uppercase">
                        {hi ? "दस्तावेज़" : "Documents"}
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-navy">{hi ? s.docsHi : s.docs}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
            {hi ? "डेस्क नोट" : "Desk notes"}
          </p>
          <ul className="mt-8 divide-y divide-[#eedfd0] border-y border-[#eedfd0]">
            {NOTES.map((note) => (
              <li key={note.en} className="py-5 text-sm leading-7 text-stone-700 sm:text-base">
                {hi ? note.hi : note.en}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "सहायता डेस्क" : "The aid desk"}
            </p>
            <p className="mt-3 max-w-md font-serif text-2xl leading-snug text-navy sm:text-3xl">
              {hi
                ? "छूट उसी फाइल पर लिखी जाती है जिससे सीट खुलती है।"
                : "The waiver is written on the same file that opens the seat."}
            </p>
            <p className="mt-3 text-sm text-stone-600">
              {SITE.email} · {SITE.phone}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/counselling"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-white hover:bg-navy/90"
            >
              {hi ? "काउंसलिंग" : "Counselling"}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/admissions"
              className="inline-flex h-12 items-center rounded-full border border-[#eedfd0] bg-cream px-7 text-sm font-semibold text-navy hover:border-brand hover:text-brand"
            >
              {hi ? "प्रवेश" : "Admissions"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
