import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { Placements } from "@/components/home/placements";
import { SuccessStories } from "@/components/home/success-stories";
import { pageMetadata } from "@/lib/seo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECTORS = [
  { name: "Hospitals", pct: 92 },
  { name: "Diagnostics", pct: 88 },
  { name: "Pharmacy retail", pct: 81 },
  { name: "Education", pct: 76 },
  { name: "Allied health", pct: 70 },
];

export const metadata = pageMetadata(
  "Placements",
  "500+ placement opportunities, 100+ hiring companies, internships and a dedicated career development cell.",
  "/placements"
);

export default function PlacementsPage() {
  return (
    <>
      <PageHero title="Placement Dashboard" subtitle="Live hiring partners, sector mix and student outcomes." />
      <Placements />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-navy">Hiring by sector</h2>
        <ul className="mt-6 space-y-4">
          {SECTORS.map((s) => (
            <li key={s.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{s.name}</span>
                <span>{s.pct}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-linear-to-r from-brand to-cyan" style={{ width: `${s.pct}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <Link href="/apply" className={cn(buttonVariants(), "mt-8 inline-flex h-11 px-6")}>
          Talk to the career cell
        </Link>
      </section>
      <SuccessStories />
    </>
  );
}
