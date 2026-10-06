"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FacultyDashboardPage() {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("gbte-faculty") !== "1") router.replace("/login/faculty");
  }, [router]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-navy">Faculty portal</h1>
      <p className="mt-2 text-slate-600">Today’s classes, mentees and assessment queue.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {["4 lectures today", "12 mentees", "8 scripts to evaluate"].map((c) => (
          <article key={c} className="rounded-2xl border p-5 font-medium text-navy">{c}</article>
        ))}
      </div>
      <Link href="/" className="mt-8 inline-block text-brand hover:underline">Back to website</Link>
    </div>
  );
}
