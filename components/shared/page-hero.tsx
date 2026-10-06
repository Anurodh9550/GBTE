export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="hero-grid relative overflow-hidden border-b border-[#eedfd0] py-12">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-5xl">{title}</h1>
        {subtitle ? <p className="mt-3 max-w-2xl text-stone-600">{subtitle}</p> : null}
      </div>
    </section>
  );
}
