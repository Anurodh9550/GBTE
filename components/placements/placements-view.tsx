"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { PartnerWordmark } from "@/components/brand/partner-logo";
import { PLACEMENT_STATS, SUCCESS_STORIES } from "@/lib/content";
import { HIRING_COMPANIES } from "@/lib/site";
import { cn } from "@/lib/utils";

const MOSAIC = [
  { src: "/photos/psychology.jpg", en: "First role", hi: "पहली भूमिका" },
  { src: "/photos/hero.jpg", en: "Career cell", hi: "करियर सेल" },
  { src: "/photos/marketing.jpg", en: "Corporate desk", hi: "कॉर्पोरेट डेस्क" },
  { src: "/photos/hero-campus.jpg", en: "Campus", hi: "परिसर" },
] as const;

const PARTNERS = [
  {
    name: "Apollo",
    sector: "Hospitals" as const,
    sectorHi: "अस्पताल",
    roles: "Pharmacy · allied health · front office",
    rolesHi: "फार्मेसी · संबद्ध स्वास्थ्य · फ्रंट ऑफिस",
    photo: "/photos/surgery.jpg",
  },
  {
    name: "Fortis",
    sector: "Hospitals" as const,
    sectorHi: "अस्पताल",
    roles: "OT · diagnostics · clinical support",
    rolesHi: "ओटी · डायग्नोस्टिक्स · क्लिनिकल सपोर्ट",
    photo: "/photos/xray.jpg",
  },
  {
    name: "Medanta",
    sector: "Hospitals" as const,
    sectorHi: "अस्पताल",
    roles: "Imaging · lab · patient services",
    rolesHi: "इमेजिंग · लैब · पेशेंट सेवा",
    photo: "/photos/medical.jpg",
  },
  {
    name: "TCS",
    sector: "IT" as const,
    sectorHi: "आईटी",
    roles: "Support · operations · first IT roles",
    rolesHi: "सपोर्ट · ऑपरेशन्स · पहली आईटी भूमिका",
    photo: "/photos/chatbot.jpg",
  },
  {
    name: "Wipro",
    sector: "IT" as const,
    sectorHi: "आईटी",
    roles: "Process · campus hiring · internships",
    rolesHi: "प्रोसेस · कैंपस हायरिंग · इंटर्नशिप",
    photo: "/photos/ai.jpg",
  },
  {
    name: "HCL",
    sector: "IT" as const,
    sectorHi: "आईटी",
    roles: "Infrastructure · service desk",
    rolesHi: "इंफ्रास्ट्रक्चर · सर्विस डेस्क",
    photo: "/photos/robot.jpg",
  },
  {
    name: "Infosys",
    sector: "IT" as const,
    sectorHi: "आईटी",
    roles: "Training pipeline · junior roles",
    rolesHi: "ट्रेनिंग पाइपलाइन · जूनियर भूमिकाएँ",
    photo: "/photos/data.jpg",
  },
  {
    name: "Deloitte",
    sector: "IT" as const,
    sectorHi: "आईटी",
    roles: "Business support · analyst desks",
    rolesHi: "बिजनेस सपोर्ट · एनालिस्ट डेस्क",
    photo: "/photos/chips.jpg",
  },
  {
    name: "Cipla",
    sector: "Pharmacy" as const,
    sectorHi: "फार्मेसी",
    roles: "Dispensing · quality · retail",
    rolesHi: "डिस्पेंसिंग · क्वालिटी · रिटेल",
    photo: "/photos/pharmacy.jpg",
  },
  {
    name: "Sun Pharma",
    sector: "Pharmacy" as const,
    sectorHi: "फार्मेसी",
    roles: "Production support · campus briefings",
    rolesHi: "प्रोडक्शन सपोर्ट · कैंपस ब्रीफिंग",
    photo: "/photos/photography.jpg",
  },
  {
    name: "Kendriya Vidyalaya",
    sector: "Schools" as const,
    sectorHi: "विद्यालय",
    roles: "D.El.Ed · BTC teaching practice",
    rolesHi: "डी.एल.एड · बीटीसी शिक्षण अभ्यास",
    photo: "/photos/campus-jalaun.jpg",
  },
  {
    name: "UP Govt. School",
    sector: "Schools" as const,
    sectorHi: "विद्यालय",
    roles: "Classroom posting · demo lessons",
    rolesHi: "कक्षा पोस्टिंग · डेमो लेसन",
    photo: "/photos/interior.jpg",
  },
] as const;

const FILTERS = ["All", "Hospitals", "IT", "Pharmacy", "Schools"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_HI: Record<Filter, string> = {
  All: "सभी",
  Hospitals: "अस्पताल",
  IT: "आईटी",
  Pharmacy: "फार्मेसी",
  Schools: "विद्यालय",
};

const STEPS = [
  {
    n: "01",
    title: "Map the role",
    titleHi: "भूमिका तय करें",
    body: "Counselling matches diploma, degree or certificate to a hospital, school, pharmacy or IT desk.",
    bodyHi: "काउंसलिंग डिप्लोमा, डिग्री या सर्टिफिकेट को अस्पताल, विद्यालय, फार्मेसी या आईटी डेस्क से जोड़ती है।",
    photo: "/photos/library.jpg",
  },
  {
    n: "02",
    title: "Practice the drive",
    titleHi: "ड्राइव का अभ्यास",
    body: "Mock interviews, GD rounds and hospital simulations run in the seminar hall before partners arrive.",
    bodyHi: "पार्टनर आने से पहले सेमिनार हॉल में मॉक इंटरव्यू, समूह चर्चा और अस्पताल सिमुलेशन।",
    photo: "/photos/education.jpg",
  },
  {
    n: "03",
    title: "Join the floor",
    titleHi: "फ्लोर पर जाएँ",
    body: "Internship postings and campus drives with the partners on this wall — a first role, not only a certificate.",
    bodyHi: "इस दीवार के पार्टनर के साथ इंटर्नशिप और कैंपस ड्राइव — पहली भूमिका, केवल सर्टिफिकेट नहीं।",
    photo: "/photos/transport.jpg",
  },
] as const;

const PLACED = SUCCESS_STORIES.slice(0, 3);

export function PlacementsView() {
  const { locale } = useI18n();
  const hi = locale === "hi";
  const [filter, setFilter] = useState<Filter>("All");

  const partners = useMemo(
    () => PARTNERS.filter((p) => filter === "All" || p.sector === filter),
    [filter],
  );

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:py-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.38em] text-brand uppercase">
              {hi ? "प्लेसमेंट" : "Placements"}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-navy sm:text-6xl">
              {hi ? (
                <>
                  हायरिंग फ्लोर,
                  <br />
                  नोएडा
                </>
              ) : (
                <>
                  The hiring floor,
                  <br />
                  Noida
                </>
              )}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              {hi
                ? "करियर सेल अस्पताल, आईटी, फार्मेसी और विद्यालयों के पार्टनर के साथ ड्राइव चलाता है। नीचे वही कंपनियाँ हैं जिनके डेस्क पर स्नातक जाते हैं।"
                : "The career cell runs drives with hospitals, IT, pharmacy and schools. Below are the companies whose desks our graduates join."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#partners"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-white hover:bg-navy/90"
              >
                {hi ? "कंपनियाँ" : "Companies"}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/success-stories"
                className="inline-flex h-12 items-center rounded-full border border-[#eedfd0] bg-white px-7 text-sm font-semibold text-navy hover:border-brand hover:text-brand"
              >
                {hi ? "सफलता कथाएँ" : "Success stories"}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {MOSAIC.map((frame) => (
              <figure key={frame.src} className="group relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={frame.src}
                    alt={hi ? frame.hi : frame.en}
                    fill
                    priority
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width:1024px) 50vw, 28vw"
                  />
                </div>
                <figcaption className="mt-1.5 text-[10px] font-semibold tracking-[0.18em] text-stone-500 uppercase">
                  {hi ? frame.hi : frame.en}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#eedfd0] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:grid-cols-4 sm:px-6">
          {PLACEMENT_STATS.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-3xl text-navy">
                {"display" in s && s.display ? (hi ? s.displayHi : s.display) : `${s.value}${s.suffix}`}
              </p>
              <p className="mt-1 text-sm text-stone-600">{hi ? s.labelHi : s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="partners" className="bg-cream scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="border-b-2 border-navy pb-6">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "हायरिंग पार्टनर" : "Hiring partners"}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-navy sm:text-4xl">
              {hi ? "कंपनियाँ, अपनी तस्वीर के साथ" : "Companies, each with a floor"}
            </h2>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition",
                  filter === f
                    ? "bg-navy text-white"
                    : "border border-[#eedfd0] bg-white text-navy hover:border-brand hover:text-brand",
                )}
              >
                {hi ? FILTER_HI[f] : f}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p) => (
              <article key={p.name} className="overflow-hidden border border-[#eedfd0] bg-white">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="px-5 pt-4 pb-5">
                  <PartnerWordmark name={p.name} className="h-10 justify-start text-navy/80" />
                  <p className="mt-3 text-[10px] font-semibold tracking-[0.2em] text-brand uppercase">
                    {hi ? p.sectorHi : p.sector}
                  </p>
                  <p className="mt-1 text-sm text-stone-600">{hi ? p.rolesHi : p.roles}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="text-center text-[11px] font-semibold tracking-[0.28em] text-stone-400 uppercase">
            {hi ? "वॉल पर नाम" : "On the wall"}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {HIRING_COMPANIES.map((name) => (
              <PartnerWordmark key={name} name={name} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
            {hi ? "करियर सेल" : "Career cell"}
          </p>
          <h2 className="mt-2 max-w-xl font-serif text-3xl text-navy">
            {hi ? "ड्राइव से पहले तीन कदम" : "Three steps before the drive"}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map((step) => (
              <article key={step.n}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={step.photo} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                </div>
                <p className="mt-4 font-serif text-2xl text-brand">{step.n}</p>
                <h3 className="mt-1 text-lg font-semibold text-navy">{hi ? step.titleHi : step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{hi ? step.bodyHi : step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-navy pb-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
                {hi ? "हाल की नियुक्तियाँ" : "Recent offers"}
              </p>
              <h2 className="mt-2 font-serif text-3xl text-navy">
                {hi ? "स्नातक, कंपनियों के साथ" : "Graduates, with the companies"}
              </h2>
            </div>
            <Link href="/success-stories" className="text-sm font-semibold text-brand hover:underline">
              {hi ? "सभी कथाएँ" : "All stories"}
            </Link>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {PLACED.map((story) => (
              <article key={story.name}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={story.photo}
                    alt={hi ? story.nameHi : story.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-navy">{hi ? story.nameHi : story.name}</p>
                <p className="mt-1 text-sm text-stone-600">
                  {hi ? story.courseHi : story.course} · {story.placement}
                </p>
                <p className="mt-1 text-sm font-medium text-brand">{story.package}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "करियर डेस्क" : "The career desk"}
            </p>
            <p className="mt-3 max-w-md font-serif text-2xl leading-snug text-navy sm:text-3xl">
              {hi
                ? "अगली नियुक्ति आपकी फाइल से शुरू हो सकती है।"
                : "The next offer can start with your file."}
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
              className="inline-flex h-12 items-center rounded-full border border-[#eedfd0] bg-white px-7 text-sm font-semibold text-navy hover:border-brand hover:text-brand"
            >
              {hi ? "प्रवेश" : "Admissions"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
