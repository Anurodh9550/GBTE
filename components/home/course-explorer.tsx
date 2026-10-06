"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Award, Check, Clock3, Download, GraduationCap, ScrollText, Star, Users } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { useI18n } from "@/components/providers/language-provider";
import { COURSES, PROGRAMME_KINDS, courseKind, programmeLabel, type Course, type CourseCategory, type CourseKind } from "@/lib/courses";
import { cn } from "@/lib/utils";

const KIND_META: Record<
  CourseKind,
  { icon: typeof GraduationCap; line: string; lineHi: string }
> = {
  diploma: {
    icon: ScrollText,
    line: "1–2 years. Practice-first. Job-ready.",
    lineHi: "1–2 वर्ष। अभ्यास पहले। नौकरी के लिए तैयार।",
  },
  degree: {
    icon: GraduationCap,
    line: "2–4 years. Full qualification.",
    lineHi: "2–4 वर्ष। पूरी योग्यता।",
  },
  certificate: {
    icon: Award,
    line: "6 months. One focused skill.",
    lineHi: "6 माह। एक फोकस्ड स्किल।",
  },
};

export function CourseExplorer({ initialCategory: _initialCategory = "all" }: { initialCategory?: CourseCategory | "all" }) {
  const { locale } = useI18n();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="courses" className="bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-brand uppercase">Programmes</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            {locale === "hi"
              ? "एक परिसर, तीन रास्ते — सर्टिफिकेट, डिप्लोमा, डिग्री"
              : "One campus. Three credentials. Your next career."}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-stone-600">
            {locale === "hi"
              ? "छोटा सर्टिफिकेट, गहरा डिप्लोमा या पूरी डिग्री — जो कदम आपके करियर के हिसाब से सही हो।"
              : "Start with a certificate, go deeper with a diploma, or complete a degree — pick the level that fits you."}
          </p>
        </div>

        <div className="mt-12 divide-y divide-[#eedfd0]">
          {PROGRAMME_KINDS.map((row) => {
            const meta = KIND_META[row.id];
            const Icon = meta.icon;
            const list = COURSES.filter((c) => courseKind(c) === row.id).slice(0, 4);
            const count = COURSES.filter((c) => courseKind(c) === row.id).length;
            return (
              <div key={row.id} id={row.id} className="scroll-mt-28 py-10 first:pt-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-brand" aria-hidden />
                      <h3 className="text-2xl font-semibold tracking-tight text-navy">
                        {locale === "hi" ? row.labelHi : row.label}
                      </h3>
                    </div>
                    <div className="mt-2 h-px w-16 bg-brand" />
                    <p className="mt-3 text-sm text-stone-600">
                      {locale === "hi" ? meta.lineHi : meta.line} · {count}{" "}
                      {locale === "hi" ? "कार्यक्रम" : "programmes"}
                    </p>
                  </div>
                  <Link
                    href={`/courses?kind=${row.id}`}
                    className="inline-flex h-10 items-center gap-2 text-sm font-semibold text-brand hover:underline"
                  >
                    {locale === "hi" ? "सभी देखें" : "See all"}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>

                <div className="mt-5 grid gap-5 overflow-visible sm:grid-cols-2 xl:grid-cols-4">
                  {list.map((course, i) => (
                    <Reveal
                      key={course.slug}
                      delay={Math.min(i, 4) * 0.03}
                      className={cn("relative overflow-visible", hovered === course.slug && "z-40")}
                    >
                      <CourseCard
                        course={course}
                        flip={(i + 1) % 4 === 0}
                        onHoverChange={(open) =>
                          setHovered((prev) => {
                            if (open) return course.slug;
                            return prev === course.slug ? null : prev;
                          })
                        }
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CourseCard({
  course,
  flip,
  onHoverChange,
}: {
  course: Course;
  flip: boolean;
  onHoverChange: (open: boolean) => void;
}) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const learn = locale === "hi" ? course.learnHi : course.learn;
  const jobs = locale === "hi" ? course.careersHi : course.careers;
  const overview = locale === "hi" ? course.overviewHi : course.overview;
  const short = overview.length > 90 ? `${overview.slice(0, 87).trim()}…` : overview;

  const show = () => {
    if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    setOpen(true);
    onHoverChange(true);
  };

  const hide = () => {
    leaveTimer.current = setTimeout(() => {
      setOpen(false);
      onHoverChange(false);
    }, 160);
  };

  useEffect(() => {
    return () => {
      if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    };
  }, []);

  return (
    <article className="relative h-full" onMouseEnter={show} onMouseLeave={hide}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#eedfd0] bg-white shadow-[0_8px_24px_rgba(61,41,24,0.08)]">
        <div className="relative h-28">
          <Image
            src={course.image}
            alt={locale === "hi" ? course.nameHi : course.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-white">
            <Clock3 className="size-3.5" aria-hidden />
            {locale === "hi" ? course.durationHi : course.duration}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-bold leading-snug text-navy">
            {locale === "hi" ? course.nameHi : course.name}
          </h3>
          <p className="mt-1.5 line-clamp-1 text-sm text-stone-600">{short}</p>
          <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-brand">
              <Star className="size-3.5 fill-brand text-brand" aria-hidden />
              {course.rating.toFixed(1)}
            </span>
            <span>({course.reviews})</span>
          </p>
          <Link
            href={`/courses?kind=${courseKind(course)}&school=${course.category}`}
            className="mt-3 inline-flex h-9 items-center justify-center gap-1 rounded-full bg-brand text-sm font-semibold text-white hover:bg-brand/90"
          >
            {t.courses.more}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "absolute z-50 transition duration-150",
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
          "max-xl:top-full max-xl:right-0 max-xl:left-0 max-xl:pt-2",
          flip ? "xl:top-0 xl:right-full xl:pr-2" : "xl:top-0 xl:left-full xl:pl-2"
        )}
      >
        <div className="w-[20.5rem] rounded-2xl border border-[#eedfd0] bg-white p-5 shadow-[0_20px_50px_rgba(61,41,24,0.18)] max-xl:w-auto">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
          {programmeLabel(courseKind(course), locale === "hi")}
        </p>
        <h4 className="mt-1 text-lg font-bold text-navy">{locale === "hi" ? course.nameHi : course.name}</h4>
        <p className="mt-2 text-sm leading-6 text-stone-600">{overview}</p>
        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-xl bg-[#fff8f2] p-2.5">
            <dt className="text-stone-500">{t.courses.duration}</dt>
            <dd className="font-semibold text-navy">{locale === "hi" ? course.durationHi : course.duration}</dd>
          </div>
          <div className="rounded-xl bg-[#fff8f2] p-2.5">
            <dt className="text-stone-500">{t.courses.seats}</dt>
            <dd className="font-semibold text-navy">{course.seats}</dd>
          </div>
          <div className="col-span-2 rounded-xl bg-[#fff8f2] p-2.5">
            <dt className="text-stone-500">{t.courses.eligibility}</dt>
            <dd className="font-semibold text-navy">{locale === "hi" ? course.eligibilityHi : course.eligibility}</dd>
          </div>
        </dl>
        <p className="mt-4 text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase">{t.courses.learn}</p>
        <ul className="mt-2 grid grid-cols-2 gap-1.5">
          {learn.map((item) => (
            <li key={item} className="flex items-start gap-1.5 text-xs text-navy">
              <Check className="mt-0.5 size-3.5 shrink-0 text-cyan" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase">{t.courses.jobs}</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {jobs.map((job) => (
            <li key={job} className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-navy">
              {job}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/courses?kind=${courseKind(course)}&school=${course.category}`}
            className="inline-flex h-9 flex-1 items-center justify-center rounded-full bg-brand text-xs font-bold text-white hover:bg-brand/90"
          >
            {t.courses.more}
          </Link>
          <Link
            href="/brochure"
            className="grid size-9 place-items-center rounded-full border border-slate-200 text-navy hover:bg-slate-50"
            aria-label={t.nav.brochure}
          >
            <Download className="size-4" />
          </Link>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
            <Users className="size-3.5" aria-hidden />
            {course.enrolled}
          </span>
        </div>
        </div>
      </div>
    </article>
  );
}
