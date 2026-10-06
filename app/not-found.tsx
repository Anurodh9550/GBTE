import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-navy">Page not found</h1>
      <p className="mt-3 text-slate-600">The admissions desk can still help you choose a programme.</p>
      <Link href="/" className={cn(buttonVariants(), "mt-6 inline-flex h-11 px-6")}>
        Back to GBTE
      </Link>
    </div>
  );
}
