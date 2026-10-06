import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse } from "@/lib/courses";
import { pageMetadata, JsonLd } from "@/lib/seo";
import { buttonVariants } from "@/components/ui/button";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return pageMetadata(course.name, course.overview, `/courses/${course.slug}`);
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.overview,
    provider: { "@type": "EducationalOrganization", name: SITE.fullName, url: SITE.url },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div className="relative min-h-72 overflow-hidden rounded-3xl">
          <Image src={course.image} alt={course.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-brand uppercase">{course.category}</p>
          <h1 className="mt-2 text-4xl font-bold text-navy">{course.name}</h1>
          <p className="mt-4 text-slate-600">{course.overview}</p>
          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-xl bg-[#fff8f2] p-4"><dt className="text-stone-500">Duration</dt><dd className="font-semibold">{course.duration}</dd></div>
            <div className="rounded-xl bg-[#fff8f2] p-4"><dt className="text-stone-500">Seats</dt><dd className="font-semibold">{course.seats}</dd></div>
            <div className="rounded-xl bg-[#fff8f2] p-4 sm:col-span-2"><dt className="text-stone-500">Eligibility</dt><dd className="font-semibold">{course.eligibility}</dd></div>
          </dl>
          <p className="mt-4 text-sm"><strong>What you'll learn:</strong> {course.learn.join(" · ")}</p>
          <p className="mt-2 text-sm"><strong>Jobs you'll unlock:</strong> {course.careers.join(", ")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/apply?course=${course.slug}`} className={cn(buttonVariants(), "h-11 px-5")}>Apply Now</Link>
            <Link href={`/compare?add=${course.slug}`} className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}>Compare</Link>
          </div>
        </div>
      </section>
      <EnquiryForm defaultCourse={course.name} />
    </>
  );
}
