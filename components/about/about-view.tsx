"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { ABOUT, LEADERSHIP, GOVERNMENT_APPROVALS } from "@/lib/content";
import { CAMPUSES, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ConnectMap } from "@/components/about/connect-map";
import { VisionMission } from "@/components/about/vision-mission";
import { Reveal } from "@/components/shared/reveal";

const ABOUT_HERO_VIDEOS = ["/videos/about-learn.mp4", "/videos/about-campus.mp4"] as const;

const TRUST_STATS = [
  { value: "15+", label: "Years Trust Legacy", labelHi: "वर्षों की शैक्षणिक विरासत" },
  { value: "5000+", label: "Successful Alumni Network", labelHi: "सफल पूर्व छात्र नेटवर्क" },
  { value: "150+", label: "Faculty & Clinical Mentors", labelHi: "संकाय व क्लिनिकल मार्गदर्शक" },
  { value: "100+", label: "Hiring & Placement Partners", labelHi: "हायरिंग व प्लेसमेंट पार्टनर" },
];

const CORE_PILLARS = [
  {
    icon: Award,
    title: "Practice-First Pedagogy",
    titleHi: "अभ्यास-प्रथम शिक्षण पद्धति",
    desc: "50% curriculum dedicated to clinical wards, pharmaceutical formulation labs, and live coding studios.",
    descHi: "50% पाठ्यक्रम क्लिनिकल वार्ड, फार्मेसी लैब और लाइव कोडिंग स्टूडियो में व्यावहारिक अभ्यास के लिए समर्पित।",
  },
  {
    icon: HeartHandshake,
    title: "Integrated Industry Alliances",
    titleHi: "एकीकृत उद्योग व अस्पताल साझेदारी",
    desc: "Hospital ward rotations at Apollo, Fortis & Medanta, alongside 24/7 digital upskilling via Parimanam LMS.",
    descHi: "अपोलो, फोर्टिस, मेदांता में अस्पताल रोटेशन और परिमाणम LMS के जरिए 24/7 डिजिटल कौशल विकास।",
  },
  {
    icon: ShieldCheck,
    title: "Statutory & State Accreditations",
    titleHi: "वैधानिक व सरकारी मान्यताएं",
    desc: "Approvals from Pharmacy Council of India (PCI) and Board of Technical Education, UP (BTE UP).",
    descHi: "फार्मेसी काउंसिल ऑफ इंडिया (PCI) और प्राविधिक शिक्षा परिषद उत्तर प्रदेश (BTE UP) से अनुमोदित।",
  },
  {
    icon: GraduationCap,
    title: "Equity & Inclusion Scholarships",
    titleHi: "समावेशी छात्रवृत्ति अवसर",
    desc: "Need-blind admissions, merit concessions, girl-child incentives, and state scholarship facilitation.",
    descHi: "मेरिट, बालिका प्रोत्साहन, ईडब्ल्यूएस और उत्तर प्रदेश सरकारी छात्रवृत्ति योजनाओं का पूर्ण सहयोग।",
  },
];

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
  const hi = locale === "hi";
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
      {/* Hero Overview Section */}
      <Reveal as="section" hover={false} amount={0.18} id="overview" className="relative scroll-mt-24 overflow-hidden bg-white">
        <Reveal lift={false} className="relative h-72 overflow-hidden sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[82%]">
          {ABOUT_HERO_VIDEOS.map((src, index) => (
            <AboutHeroVideo key={src} src={src} active={videoIndex === index} />
          ))}
          <div
            className="absolute inset-0 bg-gradient-to-t from-white from-0% via-white/18 via-22% to-transparent to-50% lg:bg-gradient-to-r lg:from-white lg:from-0% lg:via-white/25 lg:via-[6%] lg:to-transparent lg:to-[12%]"
            aria-hidden
          />
        </Reveal>

        <div className="relative mx-auto flex min-h-[24rem] max-w-7xl items-center px-4 py-14 sm:px-6 sm:py-20 lg:min-h-[38rem] lg:py-24">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand">
              <span>{hi ? `${SITE.trust} · नोएडा मुख्यालय` : `${SITE.trust} · Noida HQ`}</span>
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-navy sm:text-[2.15rem] sm:leading-[1.25]">
              {hi ? (
                <>
                  शिक्षा, नवाचार और उत्कृष्टता से
                  <br />
                  <span className="text-brand">भविष्य को सशक्त बनाना</span>
                </>
              ) : (
                <>
                  Empowering Futures Through
                  <br />
                  <span className="text-brand">Education, Innovation & Excellence</span>
                </>
              )}
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-stone-600 sm:text-base">
              {hi ? ABOUT.missionHi : ABOUT.mission}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/admissions"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand/90 hover:-translate-y-0.5"
              >
                {hi ? "प्रवेश 2027 प्रक्रिया" : "Admissions 2027"}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/campus"
                className="inline-flex h-12 items-center rounded-full border border-navy/20 bg-white px-7 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
              >
                {hi ? "परिसर भ्रमण" : "Campus Tour"}
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center rounded-full border border-[#eedfd0] bg-cream px-6 text-sm font-semibold text-stone-700 transition hover:bg-white"
              >
                {hi ? "संपर्क करें" : "Contact Us"}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Trust Stats Ribbon */}
      <Reveal as="section" hover={false} amount={0.18} className="border-y border-[#eedfd0] bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:divide-x md:divide-[#eedfd0]">
            {TRUST_STATS.map((s, idx) => (
              <div key={s.label} className={cn("text-center", idx > 0 && "md:pl-6")}>
                <p className="font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium text-stone-600 sm:text-sm">
                  {hi ? s.labelHi : s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <ConnectMap />

      <VisionMission />

      {/* ACCREDITATIONS & APPROVALS SECTION */}
      <Reveal as="section" hover={false} amount={0.18} id="accreditations" className="scroll-mt-28 border-y border-[#eedfd0] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "मान्यता एवं अनुमोदन" : "Recognitions on record"}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-navy sm:text-4xl">
              {hi ? "हमारी मान्यताएँ और अनुमोदन" : "Our Accreditations & Approvals"}
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-7 text-stone-600 sm:text-base">
              {hi
                ? "नीचे वही विनियामक अनुमोदन, राज्य संबद्धता और पाठ्यक्रम मान्यताएँ हैं जो इस संस्थान के रिकॉर्ड में पहले से दर्ज हैं।"
                : "Regulatory approvals, state-board affiliation and course recognitions already recorded for GBET programmes."}
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
            {GOVERNMENT_APPROVALS.map((appr, i) => (
              <Reveal key={appr.code} delay={i * 0.06}>
              <article
                className="flex h-full flex-col rounded-2xl border border-[#eedfd0] bg-cream/50 p-6 transition duration-300 hover:border-brand/40 hover:bg-white hover:shadow-[0_14px_32px_rgba(61,41,24,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-lg font-bold tracking-tight text-navy">
                    {appr.code}
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-right text-[10px] font-semibold leading-4 text-cyan">
                    {hi ? appr.badgeHi : appr.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold leading-6 text-navy">
                  {hi ? appr.titleHi : appr.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {hi ? appr.scopeHi : appr.scope}
                </p>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CORE INSTITUTIONAL PILLARS */}
      <Reveal as="section" hover={false} amount={0.18} className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "हमारे शैक्षणिक स्तंभ" : "Core Academic Pillars"}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-navy sm:text-4xl">
              {hi ? "हम अन्य संस्थानों से भिन्न कैसे हैं?" : "The GBET Educational Difference"}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-[#eedfd0] bg-white p-6 shadow-sm">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy">
                    {hi ? p.titleHi : p.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-stone-600">
                    {hi ? p.descHi : p.desc}
                  </p>
                </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* LEADERSHIP SECTION */}
      <Reveal as="section" hover={false} amount={0.18} id="leadership" className="scroll-mt-28 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="border-b-2 border-navy pb-4">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "शासन एवं मार्गदर्शन" : "Governance & Mentorship"}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-navy sm:text-4xl">
              {hi ? "मार्गदर्शक नेतृत्व" : "Visionary Leadership"}
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              {hi
                ? "शिक्षाविदों और उद्योग सलाहकारों की एक समर्पित टीम जो विद्यार्थियों के भविष्य को दिशा देती है।"
                : "Seasoned academicians and medical leaders committed to student employability and institutional integrity."}
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {LEADERSHIP.map((person, i) => (
              <Reveal key={person.role} delay={i * 0.06}>
              <blockquote
                className="flex h-full flex-col justify-between rounded-2xl border border-[#eedfd0] bg-cream/40 p-6 transition hover:border-brand/40 hover:bg-white hover:shadow-md"
              >
                <div>
                  <span className="inline-block rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand">
                    {hi ? person.roleHi : person.role}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-stone-600 italic">
                    “{hi ? person.messageHi : person.message}”
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#eedfd0] text-xs font-semibold text-navy">
                  {SITE.trust}
                </div>
              </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CAMPUS GATEWAY SECTION */}
      <Reveal as="section" hover={false} amount={0.18} id="campus" className="scroll-mt-28 bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-brand uppercase">
                {hi ? "परिसर परिचय" : "Campus Headquarters"}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-navy sm:text-4xl">
                {hi ? "नोएडा मुख्यालय — सेक्टर 63ए" : "Noida Headquarters — Sector 63A"}
              </h2>
              <p className="mt-4 text-sm leading-7 text-stone-600">
                {CAMPUSES[0].address}
              </p>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                {hi
                  ? "स्मार्ट क्लासरूम, पीसीआई-संरेखित फार्मेसी लैब्स, हाई-स्पीड एआई कंप्यूटिंग स्टूडियो, इन-कैंपस हॉस्टल्स और 24/7 वाई-फाई।"
                  : "Equipped with interactive smart lecture halls, compounding pharmacy labs, AI computing workstations, hygienic hostels and cafeteria."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/campus"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-navy px-6 text-xs font-semibold text-white transition hover:bg-navy/90"
                >
                  {hi ? "पूरा परिसर देखें" : "Explore the Campus"}
                  <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  href="/campus#visit"
                  className="inline-flex h-11 items-center rounded-full border border-[#eedfd0] bg-white px-6 text-xs font-semibold text-navy hover:border-brand hover:text-brand"
                >
                  {hi ? "कैंपस विजिट बुक करें" : "Book a Campus Visit"}
                </Link>
              </div>
            </div>

            <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/photos/campus-noida.jpg"
                alt="GBET Noida Campus"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-medium">
                C-77, Sector 63A, Noida, Uttar Pradesh
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </Reveal>

      {/* Bottom CTA Banner */}
      <Reveal as="section" hover={false} amount={0.18} className="relative isolate overflow-hidden bg-navy">
        <Reveal lift={false} className="absolute inset-0">
          <Image src="/photos/seminar.jpg" alt="" fill className="object-cover opacity-25" sizes="100vw" />
          <div className="absolute inset-0 bg-navy/80" />
        </Reveal>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="max-w-xl text-xl font-medium text-white sm:text-2xl">
              {hi
                ? "साथ मिलकर हम आपकी पहली भूमिका बनाते हैं — सुरक्षित और रोजगारपरक भविष्य।"
                : "Together, we shape your first role — an employable, digitally empowered future."}
            </p>
            <p className="mt-2 text-xs text-stone-300">
              {hi ? "सत्र 2027 के लिए निःशुल्क करियर काउंसलिंग एवं सीटें उपलब्ध हैं।" : "Session 2027 complimentary career guidance & admissions are open."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admissions"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-lg transition hover:bg-brand/90"
            >
              {hi ? "प्रवेश पोर्टल खोलें" : "Admissions Portal"}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20"
            >
              {hi ? "संपर्क करें" : "Contact Us"}
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
