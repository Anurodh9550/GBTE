"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentDashboardPage() {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("gbte-student") !== "1") router.replace("/login/student");
  }, [router]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-navy">Student portal</h1>
      <p className="mt-2 text-slate-600">Notifications, LMS shortcuts and placement status.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {["Attendance 94%", "LMS: 3 assignments due", "Placement profile complete"].map((c) => (
          <article key={c} className="rounded-2xl border p-5 font-medium text-navy">{c}</article>
        ))}
      </div>
      <ul className="mt-8 space-y-2 text-sm text-slate-600">
        <li>Admission Open 2027 — keep documents updated.</li>
        <li>Hospital placement drive next week.</li>
        <li>Girl Child Scholarship window live.</li>
      </ul>
      <Link href="/" className="mt-8 inline-block text-brand hover:underline">Back to website</Link>
    </div>
  );
}
