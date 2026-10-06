"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, Minus, Plus, Search, Star } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { CATEGORIES, COURSES, PROGRAMME_KINDS, courseKind, type Course, type CourseCategory, type CourseKind } from "@/lib/courses";
import { cn } from "@/lib/utils";

const DURATIONS = ["6 Months", "1 Year", "2 Years", "3 Years", "4 Years"] as const;
type SortKey = "relevance" | "rating" | "name";

export function CourseListing({
  initialCategory = "all",
  initialKind,
}: {
  initialCategory?: CourseCategory | "all";
  initialKind?: CourseKind;
}) {
  const { locale } = useI18n();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<CourseKind | "all">(initialKind ?? "all");
  const [schools, setSchools] = useState<string[]>(initialCategory === "all" ? [] : [initialCategory]);
  const [durations, setDurations] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [openSchool, setOpenSchool] = useState(true);
  const [openDuration, setOpenDuration] = useState(true);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let list: Course[] = COURSES.filter((course) => {
      if (kind !== "all" && courseKind(course) !== kind) return false;
      if (schools.length && !schools.includes(course.category)) return false;
      if (durations.length && !durations.includes(course.duration)) return false;
      if (!needle) return true;
      const hay = `${course.name} ${course.nameHi} ${course.shortName} ${course.overview} ${course.overviewHi}`.toLowerCase();
      return hay.includes(needle);
    });
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [query, kind, schools, durations, sort]);

  function toggle(list: string[], value: string, set: (next: string[]) => void) {
    set(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  function clearAll() {
    setQuery("");
    setKind("all");
    setSchools([]);
    setDurations([]);
    setSort("relevance");
  }

  const chips = [
    ...(kind !== "all"
      ? [
          {
            key: `k-${kind}`,
            label: PROGRAMME_KINDS.find((k) => k.id === kind)?.[locale === "hi" ? "labelHi" : "label"] ?? kind,
            onRemove: () => setKind("all"),
          },
        ]
      : []),
    ...schools.map((id) => ({
      key: `s-${id}`,
      label: CATEGORIES.find((c) => c.id === id)?.[locale === "hi" ? "labelHi" : "label"] ?? id,
      onRemove: () => setSchools(schools.filter((s) => s !== id)),
    })),
    ...durations.map((d) => ({
      key: `d-${d}`,
      label: d,
      onRemove: () => setDurations(durations.filter((x) => x !== d)),
    })),
  ];

  return (
    <div className="bg-[#f7f4f0] pb-16">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <p className="text-sm text-stone-500">
          <Link href="/" className="hover:text-brand">Home</Link>
          <span> / </span>
          <span className="text-navy">Courses</span>
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy">
          {locale === "hi" ? "पाठ्यक्रम" : "Programmes"}
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          {filtered.length} {locale === "hi" ? "पाठ्यक्रम उपलब्ध" : "courses available"}
        </p>

        <div className="mt-6 grid gap-5 lg:grid-cols-[16rem_1fr_17rem]">
          <aside className="h-fit rounded-2xl border border-[#eedfd0] bg-white p-4 shadow-[0_8px_24px_rgba(61,41,24,0.06)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-navy">{locale === "hi" ? "फ़िल्टर" : "All filters"}</p>
              <button type="button" onClick={clearAll} className="text-xs font-semibold text-brand hover:underline">
                {locale === "hi" ? "साफ़ करें" : "Clear all filters"}
              </button>
            </div>

            <div className="mt-4 border-t border-[#eedfd0] pt-3">
              <p className="text-sm font-semibold text-navy">{locale === "hi" ? "कार्यक्रम" : "Programme"}</p>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {PROGRAMME_KINDS.map((row) => (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => setKind(kind === row.id ? "all" : row.id)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-left text-sm font-medium",
                      kind === row.id
                        ? "border-brand bg-[#fff8f2] text-brand"
                        : "border-[#eedfd0] text-stone-700 hover:border-brand"
                    )}
                  >
                    {locale === "hi" ? row.labelHi : row.label}
                    <span className="ml-2 text-xs text-stone-400">
                      {COURSES.filter((c) => courseKind(c) === row.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t border-[#eedfd0] pt-3">
              <button type="button" className="flex w-full items-center justify-between text-sm font-semibold text-navy" onClick={() => setOpenSchool((v) => !v)}>
                {locale === "hi" ? "स्कूल / कैटेगरी" : "School / Category"}
                {openSchool ? <Minus className="size-4" /> : <Plus className="size-4" />}
              </button>
              {openSchool ? (
                <ul className="mt-3 space-y-2">
                  {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                    <li key={cat.id}>
                      <label className="flex cursor-pointer items-center justify-between gap-2 text-sm text-stone-700">
                        <span className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={schools.includes(cat.id)}
                            onChange={() => toggle(schools, cat.id, setSchools)}
                            className="size-4 accent-[#e85c1a]"
                          />
                          {locale === "hi" ? cat.labelHi : cat.label}
                        </span>
                        <span className="text-xs text-stone-400">{COURSES.filter((c) => c.category === cat.id).length}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="mt-4 border-t border-[#eedfd0] pt-3">
              <button type="button" className="flex w-full items-center justify-between text-sm font-semibold text-navy" onClick={() => setOpenDuration((v) => !v)}>
                {locale === "hi" ? "अवधि" : "Duration"}
                {openDuration ? <Minus className="size-4" /> : <Plus className="size-4" />}
              </button>
              {openDuration ? (
                <ul className="mt-3 space-y-2">
                  {DURATIONS.map((d) => (
                    <li key={d}>
                      <label className="flex cursor-pointer items-center justify-between gap-2 text-sm text-stone-700">
                        <span className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={durations.includes(d)}
                            onChange={() => toggle(durations, d, setDurations)}
                            className="size-4 accent-[#e85c1a]"
                          />
                          {d}
                        </span>
                        <span className="text-xs text-stone-400">{COURSES.filter((c) => c.duration === d).length}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#eedfd0] bg-white px-3 py-2.5 shadow-[0_8px_24px_rgba(61,41,24,0.06)]">
              {chips.length ? (
                chips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={chip.onRemove}
                    className="rounded-full bg-[#fff8f2] px-3 py-1 text-xs font-semibold text-navy"
                  >
                    {chip.label} ×
                  </button>
                ))
              ) : (
                <span className="text-xs text-stone-500">{locale === "hi" ? "कोई फ़िल्टर नहीं" : "No filters applied"}</span>
              )}
              <label className="ml-auto inline-flex items-center gap-2 text-xs text-stone-600">
                {locale === "hi" ? "क्रम" : "Sort by"}
                <span className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="appearance-none rounded-lg border border-[#eedfd0] bg-white py-1.5 pr-7 pl-2 text-xs font-semibold text-navy"
                  >
                    <option value="relevance">{locale === "hi" ? "प्रासंगिकता" : "Relevance"}</option>
                    <option value="rating">{locale === "hi" ? "रेटिंग" : "Rating"}</option>
                    <option value="name">{locale === "hi" ? "नाम" : "Name"}</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-1.5 size-3.5 -translate-y-1/2 text-stone-400" />
                </span>
              </label>
            </div>

            <p className="mt-4 text-sm text-stone-500">
              {locale === "hi" ? `${filtered.length} पाठ्यक्रम दिख रहे हैं` : `Showing ${filtered.length} of ${COURSES.length} courses`}
            </p>

            <div className="mt-3 space-y-4">
              {filtered.length ? (
                filtered.map((course) => (
                  <article key={course.slug} className="flex flex-col overflow-hidden rounded-2xl border border-[#eedfd0] bg-white shadow-[0_8px_24px_rgba(61,41,24,0.06)] sm:flex-row">
                    <div className="relative h-44 w-full shrink-0 sm:h-auto sm:w-56">
                      <Image src={course.image} alt={course.name} fill className="object-cover" sizes="224px" />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <h2 className="text-lg font-bold text-navy">{locale === "hi" ? course.nameHi : course.name}</h2>
                      <p className="mt-1 flex items-center gap-2 text-sm text-stone-500">
                        <span className="inline-flex items-center gap-1 font-semibold text-brand">
                          <Star className="size-3.5 fill-brand text-brand" />
                          {course.rating.toFixed(1)}
                        </span>
                        ({course.reviews}) · {locale === "hi" ? course.durationHi : course.duration} · {course.seats} seats
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">
                        {locale === "hi" ? course.overviewHi : course.overview}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        <Link href={`/courses/${course.slug}`} className="inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-brand/90">
                          {locale === "hi" ? "विवरण देखें" : "View details"}
                        </Link>
                        <Link href={`/apply?course=${course.slug}`} className="inline-flex h-10 items-center rounded-full border border-brand/30 px-5 text-sm font-semibold text-navy hover:bg-[#fff8f2]">
                          {locale === "hi" ? "आवेदन" : "Apply"}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-[#eedfd0] bg-white px-6 py-16 text-center">
                  <p className="text-lg font-semibold text-navy">{locale === "hi" ? "कोई पाठ्यक्रम नहीं मिला" : "No courses found"}</p>
                  <p className="mt-2 text-sm text-stone-500">{locale === "hi" ? "फ़िल्टर हटाकर फिर देखें।" : "Try removing filters to see more diplomas."}</p>
                  <button type="button" onClick={clearAll} className="mt-4 text-sm font-semibold text-brand hover:underline">
                    {locale === "hi" ? "सभी पाठ्यक्रम देखें" : "Browse all courses"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-[#eedfd0] bg-white p-4 shadow-[0_8px_24px_rgba(61,41,24,0.06)]">
              <p className="text-sm font-semibold text-navy">{locale === "hi" ? "कोर्स खोजें" : "Course search"}</p>
              <p className="mt-1 text-xs text-stone-500">
                {locale === "hi" ? "जैसे AI, Pharmacy, Fashion" : "e.g. AI diploma, Pharmacy, Fashion"}
              </p>
              <div className="relative mt-3">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={locale === "hi" ? "जो कोर्स चाहिए लिखें…" : "Describe the course you want…"}
                  className="h-11 w-full rounded-xl border border-[#eedfd0] bg-[#fff8f2] pr-3 pl-9 text-sm outline-none focus:border-brand"
                />
              </div>
              <button type="button" className="mt-3 h-10 w-full rounded-full bg-brand text-sm font-semibold text-white hover:bg-brand/90">
                {locale === "hi" ? "खोजें" : "Search courses"}
              </button>
            </div>

            <div className="rounded-2xl border border-[#eedfd0] bg-white p-4 shadow-[0_8px_24px_rgba(61,41,24,0.06)]">
              <p className="text-sm font-semibold text-navy">{locale === "hi" ? "लोकप्रिय डिप्लोमा" : "Trending diplomas"}</p>
              <ul className="mt-3 space-y-2">
                {COURSES.slice(0, 5).map((course) => (
                  <li key={course.slug}>
                    <Link href={`/courses/${course.slug}`} className="text-sm text-stone-700 hover:text-brand">
                      {locale === "hi" ? course.shortName : course.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand p-4 text-white shadow-[0_8px_24px_rgba(232,92,26,0.25)]">
              <p className="text-sm font-semibold">{locale === "hi" ? "सही कोर्स चुनें" : "Need help choosing?"}</p>
              <p className="mt-1 text-xs text-white/85">{locale === "hi" ? "निःशुल्क काउंसलिंग बुक करें।" : "Book free counselling with admissions."}</p>
              <Link href="/counselling" className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-brand">
                {locale === "hi" ? "काउंसलिंग" : "Free counselling"}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
