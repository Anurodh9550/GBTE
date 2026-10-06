"use client";

import { useMemo, useState } from "react";
import { COURSES } from "@/lib/courses";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(["d-pharma", "dmlt"]);
  const picked = useMemo(() => COURSES.filter((c) => selected.includes(c.slug)), [selected]);

  function toggle(slug: string) {
    setSelected((curr) => {
      if (curr.includes(slug)) return curr.filter((s) => s !== slug);
      if (curr.length >= 3) return curr;
      return [...curr, slug];
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-navy">Course Comparison</h1>
      <p className="mt-2 text-slate-600">Select up to three programmes.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {COURSES.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => toggle(c.slug)}
            className={`rounded-full border px-3 py-1.5 text-sm ${selected.includes(c.slug) ? "border-brand bg-brand text-white" : "bg-white"}`}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-brand text-white">
              <th className="p-3 text-left">Feature</th>
              {picked.map((c) => (
                <th key={c.slug} className="p-3 text-left">{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Duration", (c: (typeof COURSES)[number]) => c.duration],
              ["Eligibility", (c: (typeof COURSES)[number]) => c.eligibility],
              ["Seats", (c: (typeof COURSES)[number]) => String(c.seats)],
              ["Careers", (c: (typeof COURSES)[number]) => c.careers.join(", ")],
              ["Mode", (c: (typeof COURSES)[number]) => c.mode],
            ].map(([label, getter]) => (
              <tr key={String(label)} className="border-b">
                <th className="bg-[#fff8f2] p-3 text-left">{label as string}</th>
                {picked.map((c) => (
                  <td key={c.slug} className="p-3">{(getter as (c: (typeof COURSES)[number]) => string)(c)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <th className="p-3 text-left">Apply</th>
              {picked.map((c) => (
                <td key={c.slug} className="p-3">
                  <Link href={`/apply?course=${c.slug}`} className="text-brand hover:underline">Apply</Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      {picked.length === 0 ? <p className="mt-6 text-slate-600">Choose at least one programme.</p> : null}
      <Link href="/apply" className={cn(buttonVariants(), "mt-6 inline-flex h-11 px-6")}>
        Apply with counsellor
      </Link>
    </div>
  );
}
