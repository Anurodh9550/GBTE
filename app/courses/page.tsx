import { CourseListing } from "@/components/courses/course-listing";
import { pageMetadata } from "@/lib/seo";
import { CATEGORIES, PROGRAMME_KINDS, type CourseCategory, type CourseKind } from "@/lib/courses";

export const metadata = pageMetadata(
  "Courses",
  "Creative and professional diploma programmes — Interior Design, Culinary Arts, Fashion, Wellness, Pharmacy and more.",
  "/courses"
);

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ school?: string; kind?: string }>;
}) {
  const { school, kind } = await searchParams;
  const initial = CATEGORIES.some((c) => c.id === school)
    ? (school as CourseCategory | "all")
    : "all";
  const initialKind = PROGRAMME_KINDS.some((k) => k.id === kind) ? (kind as CourseKind) : undefined;

  return <CourseListing initialCategory={initial} initialKind={initialKind} />;
}
