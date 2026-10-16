"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Star, X } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { useI18n } from "@/components/providers/language-provider";
import { CATEGORIES, COURSES, courseKind, programmeLabel, type CourseCategory } from "@/lib/courses";
import { SUCCESS_STORIES } from "@/lib/content";
import { CAMPUSES, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const HERO = [
  { field: "Creative Arts", fieldHi: "क्रिएटिव आर्ट्स", photo: "/photos/fashion.jpg" },
  { field: "Media", fieldHi: "मीडिया", photo: "/photos/film.jpg" },
  { field: "Healthcare", fieldHi: "हेल्थकेयर", photo: "/photos/medical.jpg" },
] as const;

const SHOWCASE = [
  "interior-design",
  "culinary-arts",
  "fashion-design",
  "naturopathy",
  "screenwriting",
  "psychology",
  "makeup",
  "photography",
] as const;

const WHY = [
  { en: "Learn what studios and hospitals actually use", hi: "स्टूडियो और अस्पताल में जो काम आता है" },
  { en: "Mentors from the Noida campus faculty", hi: "नोएडा परिसर की फैकल्टी से मेंटर" },
  { en: "Recorded lessons plus live sessions", hi: "रिकॉर्डेड पाठ और लाइव सेशन" },
  { en: "A portfolio you can take to interviews", hi: "इंटरव्यू में ले जाने लायक पोर्टफोलियो" },
  { en: "Workshops and masterclasses through the year", hi: "साल भर वर्कशॉप और मास्टरक्लास" },
  { en: "Career cell for internships and first roles", hi: "इंटर्नशिप और पहली भूमिका का करियर सेल" },
  { en: "Study while you work", hi: "नौकरी के साथ पढ़ाई" },
  { en: "Visit the Noida labs when you want", hi: "जब चाहें नोएडा लैब देखें" },
] as const;

const STUDIOS = [
  { title: "Interior Design", titleHi: "इंटीरियर डिज़ाइन", photo: "/photos/interior.jpg" },
  { title: "Fashion Design", titleHi: "फैशन डिज़ाइन", photo: "/photos/fashion.jpg" },
  { title: "Culinary Arts", titleHi: "कलिनरी आर्ट्स", photo: "/photos/culinary.jpg" },
  { title: "Wellness", titleHi: "वेलनेस", photo: "/photos/yoga.jpg" },
  { title: "Screen & Media", titleHi: "स्क्रीन और मीडिया", photo: "/photos/film.jpg" },
  { title: "Psychology", titleHi: "साइकोलॉजी", photo: "/photos/psychology.jpg" },
] as const;

const WORKSHOPS = [
  { title: "Kitchen workshop", titleHi: "किचन वर्कशॉप", role: "Culinary studio", roleHi: "कलिनरी स्टूडियो", photo: "/photos/culinary.jpg" },
  { title: "Design critique", titleHi: "डिज़ाइन क्रिटिक", role: "Interior studio", roleHi: "इंटीरियर स्टूडियो", photo: "/photos/interior.jpg" },
  { title: "Lookbook day", titleHi: "लुकबुक डे", role: "Fashion studio", roleHi: "फैशन स्टूडियो", photo: "/photos/fashion.jpg" },
  { title: "Story lab", titleHi: "स्टोरी लैब", role: "Media studio", roleHi: "मीडिया स्टूडियो", photo: "/photos/film.jpg" },
  { title: "Wellness circle", titleHi: "वेलनेस सर्कल", role: "Health studio", roleHi: "हेल्थ स्टूडियो", photo: "/photos/yoga.jpg" },
  { title: "Lab briefing", titleHi: "लैब ब्रीफिंग", role: "Healthcare studio", roleHi: "हेल्थकेयर स्टूडियो", photo: "/photos/medical.jpg" },
] as const;

const FAQS = [
  {
    q: "What is GBET Online?",
    qHi: "GBET Online क्या है?",
    a: "It is the online desk of Gautam Buddha Educational Trust. You study diploma, degree and certificate programmes with recorded lessons, live sessions and counselling from the Noida campus.",
    aHi: "यह गौतम बुद्ध एजुकेशनल ट्रस्ट का ऑनलाइन डेस्क है। रिकॉर्डेड पाठ, लाइव सेशन और नोएडा परिसर की काउंसलिंग के साथ डिप्लोमा, डिग्री और सर्टिफिकेट पढ़े जाते हैं।",
  },
  {
    q: "Who can apply?",
    qHi: "कौन आवेदन कर सकता है?",
    a: "Anyone who meets the eligibility of the chosen programme. Counselling checks your marks and the latest rules before a seat is confirmed.",
    aHi: "जो चुने हुए कार्यक्रम की पात्रता पूरी करता है। सीट से पहले काउंसलिंग अंक और नवीनतम नियम जाँचती है।",
  },
  {
    q: "Can I study while working?",
    qHi: "क्या नौकरी के साथ पढ़ सकते हैं?",
    a: "Yes. Lessons stay available online, and live sessions are scheduled so working learners can join.",
    aHi: "हाँ। पाठ ऑनलाइन रहते हैं और लाइव सेशन ऐसे समय पर होते हैं कि कामकाजी छात्र जुड़ सकें।",
  },
  {
    q: "How does admission work?",
    qHi: "प्रवेश कैसे होता है?",
    a: "Send an enquiry. An advisor calls, confirms the programme, and helps with documents, fees and scholarship options.",
    aHi: "पूछताछ भेजें। सलाहकार कॉल करता है, कार्यक्रम पक्का करता है, और दस्तावेज़, शुल्क व छात्रवृत्ति में मदद करता है।",
  },
  {
    q: "Can I visit the campus?",
    qHi: "क्या परिसर देख सकते हैं?",
    a: "Yes. Book a visit to C-77, Sector 63A, Noida, or call +91 9355470710.",
    aHi: "हाँ। सी-77, सेक्टर 63ए, नोएडा का दौरा बुक करें, या +91 9355470710 पर कॉल करें।",
  },
] as const;

export function OnlineView() {
  const { locale } = useI18n();
  const hi = locale === "hi";
  const [hero, setHero] = useState(0);
  const [category, setCategory] = useState<CourseCategory | "all">("all");
  const [menu, setMenu] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setHero((n) => (n + 1) % HERO.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const courses = useMemo(() => {
    if (category === "all") {
      return SHOWCASE.map((slug) => COURSES.find((c) => c.slug === slug)).filter((c) => c != null);
    }
    return COURSES.filter((c) => c.category === category).slice(0, 8);
  }, [category]);

  const stories = SUCCESS_STORIES.slice(0, 6);

  return (
    <div className="bg-[#fff8f2] text-[#3d2918]">
      <header className="sticky top-0 z-50 border-b border-[#eedfd0] bg-[#fff8f2]/95 backdrop-blur">
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/online" className="flex items-center gap-2.5" aria-label="GBET Online home">
            <span className="relative size-11 overflow-hidden rounded-full ring-2 ring-brand">
              <Image src="/logo.png" alt="" fill className="object-cover" sizes="44px" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-bold">GBET Online</span>
              <span className="hidden text-[11px] text-stone-500 sm:block">Gautam Buddha Educational Trust</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
            <a href="#top">{hi ? "होम" : "Home"}</a>
            <button type="button" className="inline-flex items-center gap-1" onClick={() => setCoursesOpen((v) => !v)}>
              {hi ? "कोर्स" : "Courses"} <ChevronDown className="size-4" />
            </button>
            <a href="#stories">{hi ? "कहानियाँ" : "Explore"}</a>
            <a href="#workshops">{hi ? "वर्कशॉप" : "Workshops"}</a>
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/login/student" className="px-3 py-2 text-sm font-semibold">{hi ? "लॉगिन" : "Login"}</Link>
            <a href="#enquiry" className="rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white">{hi ? "शुरू करें" : "Get started"}</a>
          </div>
          <button type="button" className="grid size-10 place-items-center rounded-full border border-[#eedfd0] lg:hidden" onClick={() => setMenu((v) => !v)} aria-label="Menu">
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {coursesOpen ? (
          <div className="hidden border-t border-[#eedfd0] bg-white lg:block">
            <div className="mx-auto grid max-w-7xl grid-cols-4 gap-3 px-6 py-5 text-sm">
              {SHOWCASE.map((slug) => {
                const course = COURSES.find((c) => c.slug === slug);
                if (!course) return null;
                return (
                  <Link key={slug} href={`/courses/${slug}`} className="rounded-xl px-3 py-2 hover:bg-[#fff8f2]" onClick={() => setCoursesOpen(false)}>
                    {course.shortName}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
        {menu ? (
          <div className="space-y-3 border-t border-[#eedfd0] px-4 py-4 text-sm font-semibold lg:hidden">
            <a href="#courses" onClick={() => setMenu(false)} className="block">{hi ? "कोर्स" : "Courses"}</a>
            <a href="#stories" onClick={() => setMenu(false)} className="block">{hi ? "कहानियाँ" : "Stories"}</a>
            <a href="#workshops" onClick={() => setMenu(false)} className="block">{hi ? "वर्कशॉप" : "Workshops"}</a>
            <a href="#faq" onClick={() => setMenu(false)} className="block">FAQ</a>
            <Link href="/login/student" className="block">{hi ? "लॉगिन" : "Login"}</Link>
          </div>
        ) : null}
      </header>

      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
          <div className="min-w-0">
            <h1 className="font-serif text-4xl leading-[1.08] sm:text-6xl">
              {hi ? "ऑनलाइन सीखें। असर बनाएँ। भविष्य का नेतृत्व करें।" : "Learn Online. Create Impact. Lead the Future."}
            </h1>
            <p className="mt-6 max-w-md text-lg text-stone-600">
              {hi
                ? "हमारे नोएडा परिसर से मीडिया में लचीली ऑनलाइन डिग्री और डिप्लोमा के साथ अपना भविष्य बनाएँ।"
                : "Build your future in media with flexible online degrees and diplomas from our Noida campus."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#enquiry" className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white">
                {hi ? "पूछताछ करें" : "Enquire now"} <ArrowRight className="size-4" />
              </a>
              <Link href="/brochure" className="inline-flex h-12 items-center rounded-full bg-[#3d2918] px-6 text-sm font-semibold text-white">
                {hi ? "ब्रोशर डाउनलोड" : "Download brochure"}
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4]">
            {HERO.map((item, i) => (
              <Image key={item.field} src={item.photo} alt="" fill priority={i === 0} className={cn("object-cover transition duration-700", i === hero ? "opacity-100" : "opacity-0")} sizes="(max-width:1024px) 100vw, 50vw" />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-0 overflow-hidden border-y border-[#eedfd0] bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4 sm:px-6">
          <p className="shrink-0 text-xs font-semibold tracking-[0.16em] text-stone-500 uppercase">{hi ? "अध्ययन क्षेत्र" : "Study areas"}</p>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="animate-marquee flex w-max gap-10 pr-10 text-sm font-semibold text-navy">
              {[...STUDIOS, ...STUDIOS].map((item, i) => (
                <span key={`${item.title}-${i}`} className="shrink-0">{hi ? item.titleHi : item.title}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="relative z-10 mx-auto max-w-7xl bg-[#fff8f2] px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-semibold text-brand">{hi ? "डिप्लोमा कोर्स" : "Diploma courses"}</p>
        <h2 className="mt-2 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-6xl">
          {hi ? "वह कोर्स चुनें जो आपके लक्ष्य से मेल खाए" : "Find the course that aligns with your goals"}
        </h2>
        <p className="mt-4 max-w-2xl text-stone-600">
          {hi ? "डिज़ाइन, मीडिया, वेलनेस, हॉस्पिटैलिटी और टेक्नोलॉजी में से अपना कार्यक्रम चुनें।" : "Choose a programme in design, media, wellness, hospitality or technology."}
        </p>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.filter((c) => ["all", "design", "media", "arts", "wellness", "hospitality", "business", "ai"].includes(c.id)).map((cat) => (
            <button key={cat.id} type="button" onClick={() => setCategory(cat.id)} className={cn("shrink-0 rounded-full px-4 py-2 text-sm font-semibold", category === cat.id ? "bg-[#3d2918] text-white" : "bg-white ring-1 ring-[#eedfd0]")}>
              {hi ? cat.labelHi : cat.label}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <article key={course.slug} className="grid overflow-hidden rounded-3xl border border-[#eedfd0] bg-white md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-56">
                <Image src={course.image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 40vw" />
              </div>
              <div className="flex flex-col p-6">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wide text-stone-500">
                  <span className="text-brand">{programmeLabel(courseKind(course), hi)}</span>
                  <span>{hi ? course.durationHi : course.duration}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold">{hi ? course.nameHi : course.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm">
                  <Star className="size-4 fill-brand text-brand" />
                  {course.rating}
                  <span className="text-stone-400">({course.reviews})</span>
                  <span className="ml-auto text-stone-500">{course.enrolled} {hi ? "नामांकित" : "enrolled"}</span>
                </p>
                <p className="mt-5 text-[11px] font-bold tracking-wide text-[#1f7a32] uppercase">{hi ? "आप क्या सीखेंगे" : "What you'll learn"}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(hi ? course.learnHi : course.learn).slice(0, 4).map((item) => (
                    <span key={item} className="rounded-full bg-[#fff8f2] px-3 py-1 text-xs">{item}</span>
                  ))}
                </div>
                <p className="mt-4 text-[11px] font-bold tracking-wide text-[#1f7a32] uppercase">{hi ? "भूमिकाएँ" : "Jobs you'll unlock"}</p>
                <p className="mt-1 text-sm text-stone-600">{(hi ? course.careersHi : course.careers).join("  ·  ")}</p>
                <Link href={`/courses/${course.slug}`} className="mt-auto pt-5 text-sm font-semibold text-brand">
                  {hi ? "और जानें" : "Learn more"} →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/courses" className="inline-flex h-12 items-center rounded-full border border-[#3d2918] px-6 text-sm font-semibold hover:bg-[#3d2918] hover:text-white">
            {hi ? "सभी डिप्लोमा कोर्स देखें" : "Explore all diploma courses"}
          </Link>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="max-w-xl font-serif text-4xl leading-tight sm:text-6xl">{hi ? "पहली भूमिका तक का रास्ता" : "Your gateway to a first role"}</h2>
          <p className="mt-3 max-w-lg text-stone-600">{hi ? "करियर सेल इंटर्नशिप और बातचीत में साथ देता है।" : "The career cell stays with you through internships and interviews."}</p>
        </div>
        <div className="mt-8 overflow-hidden">
          <div className="animate-marquee flex w-max gap-4 pr-4">
            {[...STUDIOS, ...STUDIOS].map((studio, i) => (
              <div key={`${studio.title}-${i}`} className="relative h-44 w-72 shrink-0 overflow-hidden rounded-2xl">
                <Image src={studio.photo} alt="" fill className="object-cover" sizes="288px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d2918]/80 to-transparent" />
                <p className="absolute bottom-3 left-4 font-semibold text-white">{hi ? studio.titleHi : studio.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="font-serif text-4xl sm:text-6xl">{hi ? "असली कहानियाँ।" : "Real stories."}<span className="block italic text-brand">{hi ? "असली प्रगति।" : "Real progress."}</span></h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <article key={story.name} className="overflow-hidden rounded-3xl border border-[#eedfd0] bg-white">
              <div className="relative h-44">
                <Image src={story.photo} alt="" fill className="object-cover" sizes="400px" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">{hi ? story.courseHi : story.course}</p>
                <h3 className="mt-2 text-xl font-semibold">{hi ? story.nameHi : story.name}</h3>
                <p className="mt-2 line-clamp-4 text-sm leading-6 text-stone-600">{hi ? story.reviewHi : story.review}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-[#3d2918] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="max-w-xl font-serif text-4xl sm:text-6xl">{hi ? "शिक्षार्थी GBET Online क्यों चुनते हैं" : "Why learners choose GBET Online"}</h2>
        </div>
        <div className="mt-8 space-y-3 overflow-hidden">
          <div className="animate-marquee flex w-max gap-3 pr-3">
            {[...WHY, ...WHY].map((item, i) => (
              <span key={`a-${item.en}-${i}`} className="shrink-0 rounded-full bg-white/10 px-5 py-3 text-sm">{hi ? item.hi : item.en}</span>
            ))}
          </div>
          <div className="animate-marquee-reverse flex w-max gap-3 pr-3">
            {[...WHY].reverse().concat([...WHY].reverse()).map((item, i) => (
              <span key={`b-${item.en}-${i}`} className="shrink-0 rounded-full bg-white/10 px-5 py-3 text-sm">{hi ? item.hi : item.en}</span>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4">
          {[
            ["95%", hi ? "प्लेसमेंट सहायता" : "Placement support"],
            ["100+", hi ? "हायरिंग पार्टनर" : "Hiring partners"],
            [SITE.year, hi ? "प्रवेश खुला" : "Admissions open"],
            ["Noida", hi ? "काउंसलिंग डेस्क" : "Counselling desk"],
          ].map(([value, label]) => (
            <div key={String(label)}>
              <p className="font-serif text-5xl text-brand">{value}</p>
              <p className="mt-1 text-sm text-white/75">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-4xl sm:text-6xl">{hi ? "हर कोर्स के पीछे एक स्टूडियो" : "A studio behind each course"}</h2>
        <p className="mt-3 max-w-xl text-stone-600">{hi ? "डिज़ाइन, मीडिया, वेलनेस और हेल्थकेयर की पढ़ाई नोएडा टीम से जुड़ी है।" : "Design, media, wellness and healthcare study stays linked to the Noida team."}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STUDIOS.map((studio) => (
            <article key={studio.title} className="relative h-64 overflow-hidden rounded-3xl">
              <Image src={studio.photo} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d2918] via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 text-lg font-semibold text-white">{hi ? studio.titleHi : studio.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-[#fff8f2] p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{hi ? "परिसर रिकॉर्ड" : "Campus record"}</p>
            <h2 className="mt-3 font-serif text-4xl">{hi ? "पढ़ाई का प्रमाण" : "A record of the work you did"}</h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">{hi ? "कोर्स पूरा होने पर दस्तावेज़ काउंसलिंग डेस्क से मिलता है। नियम हर कार्यक्रम के अनुसार होते हैं।" : "On completion, the counselling desk issues the programme document. Rules follow the programme you join."}</p>
          </article>
          <article className="rounded-3xl bg-[#3d2918] p-8 text-white">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{hi ? "अभ्यास" : "Practice"}</p>
            <h2 className="mt-3 font-serif text-4xl">{hi ? "दिखाने लायक काम" : "Work you can show"}</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">{hi ? "प्रोजेक्ट, लैब फाइल और लाइव सेशन उसी पोर्टफोलियो में जाते हैं जिसे आप इंटरव्यू में रखते हैं।" : "Projects, lab files and live sessions go into the portfolio you take to an interview."}</p>
          </article>
        </div>
      </section>

      <section id="workshops" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-4xl sm:text-6xl">{hi ? "विशेषज्ञ वर्कशॉप" : "Expert-led workshops"}</h2>
        <p className="mt-3 max-w-xl text-stone-600">{hi ? "साल भर स्टूडियो सत्र जो ऑनलाइन बैच का हिस्सा हैं।" : "Studio sessions through the year, as part of the online batch."}</p>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
          {WORKSHOPS.map((item) => (
            <article key={item.title} className="w-64 shrink-0">
              <div className="relative h-72 overflow-hidden rounded-3xl">
                <Image src={item.photo} alt="" fill className="object-cover" sizes="256px" />
              </div>
              <h3 className="mt-3 text-lg font-semibold">{hi ? item.titleHi : item.title}</h3>
              <p className="text-sm text-stone-500">{hi ? item.roleHi : item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#eedfd0] bg-white">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-3xl bg-[#fff8f2] p-8">
            <p className="text-sm font-semibold text-brand">{stories[0] ? (hi ? stories[0].courseHi : stories[0].course) : ""}</p>
            <h2 className="mt-4 font-serif text-3xl">{hi ? "हुनर से काम तक" : "From practice to a role"}</h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">“{stories[0] ? (hi ? stories[0].reviewHi : stories[0].review) : ""}”</p>
            <div className="mt-6 flex items-center gap-3">
              {stories[0] ? (
                <span className="relative size-12 overflow-hidden rounded-full">
                  <Image src={stories[0].photo} alt="" fill className="object-cover" sizes="48px" />
                </span>
              ) : null}
              <div>
                <p className="font-semibold">{stories[0] ? (hi ? stories[0].nameHi : stories[0].name) : ""}</p>
                <p className="text-xs text-stone-500">{hi ? "सत्यापित छात्र" : "Verified learner"}</p>
              </div>
            </div>
          </article>
          <div>
            <h2 className="mb-4 font-serif text-4xl">{hi ? "अपना करियर पथ तय करें" : "Let's plan your career path"}</h2>
            <p className="mb-4 text-sm text-stone-500">{hi ? "सिर्फ करियर से जुड़ी कॉल।" : "No spam. Only career-related calls."}</p>
            <EnquiryForm compact />
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-serif text-4xl sm:text-6xl">{hi ? "सवाल हैं?" : "Got questions?"}<span className="block">{hi ? "जवाब हैं।" : "We've got answers."}</span></h2>
        <div className="mt-8 divide-y divide-[#eedfd0] overflow-hidden rounded-3xl border border-[#eedfd0] bg-white">
          {FAQS.map((item) => (
            <details key={item.q} className="px-5 py-4">
              <summary className="cursor-pointer font-semibold">{hi ? item.qHi : item.q}</summary>
              <p className="mt-2 text-sm leading-7 text-stone-600">{hi ? item.aHi : item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/contact" className="font-semibold text-brand">{hi ? "और सवाल हों तो प्रवेश टीम से बात करें" : "Have more questions? Contact the admissions team"}</Link>
        </p>
      </section>

      <section className="bg-brand text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-serif text-4xl sm:text-6xl">{hi ? "GBET Online से जुड़ें" : "Join GBET Online"}</h2>
            <p className="mt-3 text-white/85">{hi ? "नोएडा की टीम कोर्स चुनने में मदद करेगी।" : "The Noida team will help you choose a course."}</p>
            <p className="mt-6 text-3xl font-semibold">95% <span className="text-base font-medium">{hi ? "प्लेसमेंट सहायता" : "placement support"}</span></p>
          </div>
          <a href="#enquiry" className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-brand">
            {hi ? "पूछताछ करें" : "Enquire now"} <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <footer className="bg-[#3d2918] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="text-lg font-semibold">GBET Online</p>
            <p className="mt-3 text-sm leading-6 text-white/70">{SITE.fullName}</p>
            <Link href="/apply" className="mt-5 inline-flex rounded-full bg-brand px-4 py-2 text-sm font-semibold">{hi ? "आवेदन करें" : "Apply now"}</Link>
          </div>
          <div>
            <p className="text-sm font-semibold">{hi ? "डिप्लोमा कोर्स" : "Diploma courses"}</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {SHOWCASE.slice(0, 6).map((slug) => {
                const course = COURSES.find((c) => c.slug === slug);
                return course ? <li key={slug}><Link href={`/courses/${slug}`} className="hover:text-white">{course.shortName}</Link></li> : null;
              })}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">{hi ? "लिंक" : "Quick links"}</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white">{hi ? "परिसर साइट" : "Campus site"}</Link></li>
              <li><a href="#courses" className="hover:text-white">{hi ? "सभी प्रोग्राम" : "All programmes"}</a></li>
              <li><a href="#stories" className="hover:text-white">{hi ? "छात्र कहानियाँ" : "Student stories"}</a></li>
              <li><Link href="/login/student" className="hover:text-white">{hi ? "स्टूडेंट लॉगिन" : "Student login"}</Link></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              <li><Link href="/contact" className="hover:text-white">{hi ? "संपर्क" : "Contact"}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">{hi ? "संपर्क" : "Contact"}</p>
            <p className="mt-3 text-sm leading-6 text-white/70">{CAMPUSES[0].address}<br />{SITE.phone}<br />{SITE.email}</p>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {SITE.fullName}. <Link href="/privacy" className="hover:text-white">Privacy</Link> · <Link href="/terms" className="hover:text-white">Terms</Link>
        </div>
      </footer>
    </div>
  );
}
