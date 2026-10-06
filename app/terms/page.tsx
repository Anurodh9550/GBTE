import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Terms", "Terms of use for the GBTE admissions website.", "/terms");

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-navy">Terms of Use</h1>
      <p className="mt-4 text-slate-600 leading-7">
        Programme approvals, seats and fees are confirmed during counselling. Online enquiries are not a confirmed admission
        until document verification and fee realisation.
      </p>
    </article>
  );
}
