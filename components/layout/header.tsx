"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  Globe,
  Menu,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/components/providers/language-provider";
import { CATEGORIES, COURSES } from "@/lib/courses";
import { CAMPUSES, SITE } from "@/lib/site";
import { NOTIFICATIONS, NEWS } from "@/lib/content";
import { cn } from "@/lib/utils";

const NAV_LINK =
  "relative rounded-lg px-2.5 py-2 text-sm font-medium text-navy/80 transition-all hover:bg-[#fde8d8] hover:font-semibold hover:text-brand after:absolute after:inset-x-2.5 after:bottom-1 after:h-0.5 after:rounded-full after:bg-transparent hover:after:bg-brand";

const NAV = [
  { href: "/about", key: "about" as const, about: true },
  { href: "/courses", key: "courses" as const, mega: true },
  { href: "/news", key: "news" as const },
  { href: "/placements", key: "placements" as const },
  { href: "/scholarships", key: "scholarships" as const },
  { href: "/contact", key: "contact" as const },
];

const ABOUT_DROPDOWN = [
  { href: "/about#overview", label: "Overview", labelHi: "परिचय" },
  { href: "/about#leadership", label: "Leadership", labelHi: "नेतृत्व" },
  { href: "/campus", label: "Campus", labelHi: "परिसर" },
  { href: "/success-stories", label: "Success Stories", labelHi: "सफलता कथाएँ" },
  { href: "/admissions", label: "Admissions", labelHi: "प्रवेश" },
] as const;

function scrollToAboutHash(href: string) {
  const hash = href.split("#")[1];
  if (!hash) return;
  window.setTimeout(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutTimer = useRef<number>(0);

  const showAbout = () => {
    window.clearTimeout(aboutTimer.current);
    setAboutOpen(true);
  };
  const hideAbout = () => {
    aboutTimer.current = window.setTimeout(() => setAboutOpen(false), 120);
  };
  const goAboutLink = (href: string) => {
    window.clearTimeout(aboutTimer.current);
    setAboutOpen(false);
    setOpen(false);
    scrollToAboutHash(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(aboutTimer.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-brand text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs sm:px-6">
          <div className="flex flex-wrap items-center gap-4">
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-1.5 hover:text-white/80">
              <Phone className="size-3.5" aria-hidden />
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="hidden items-center gap-2 sm:inline-flex hover:text-white/80"
              dir="ltr"
            >
              <Mail className="size-3.5 shrink-0" aria-hidden />
              <span className="whitespace-nowrap [font-variant-ligatures:none]">
                {SITE.email.split("@")[0]}
                <span className="mx-px">@</span>
                {SITE.email.split("@")[1]}
              </span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 md:inline-flex">
              <MapPin className="size-3.5" aria-hidden />
              {t.top.hq}
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2 py-0.5 hover:bg-white/10"
              onClick={() => setLocale(locale === "en" ? "hi" : "en")}
              aria-label="Switch language"
            >
              <Globe className="size-3.5" aria-hidden />
              {t.top.language}
            </button>
            <Link href="/login/student" className="hidden hover:text-white/80 sm:inline">
              {t.top.student}
            </Link>
            <Link href="/login/faculty" className="hidden hover:text-white/80 lg:inline">
              {t.top.faculty}
            </Link>
          </div>
        </div>
      </div>

      <div className={cn("relative border-b bg-white transition-shadow", scrolled ? "shadow-sm" : "")}>
        <div className="mx-auto flex max-w-7xl items-stretch gap-3 px-4 sm:px-6">
          <div className="flex items-center py-3">
            <Logo />
          </div>
          <nav className="ml-4 hidden items-stretch gap-0.5 xl:flex" aria-label="Primary">
            {NAV.map((item) =>
              "about" in item && item.about ? (
                <div
                  key={item.href}
                  className="flex items-center"
                  onMouseEnter={showAbout}
                  onMouseLeave={hideAbout}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      NAV_LINK,
                      "inline-flex items-center gap-1",
                      aboutOpen && "bg-[#fde8d8] font-semibold text-brand after:bg-brand",
                    )}
                    aria-expanded={aboutOpen}
                  >
                    {t.nav[item.key]}
                    <ChevronDown className="size-3.5" aria-hidden />
                  </Link>
                </div>
              ) : "mega" in item && item.mega ? (
                <div key={item.href} className="group relative flex items-center">
                  <Link
                    href={item.href}
                    className={cn(NAV_LINK, "inline-flex items-center gap-1")}
                  >
                    {t.nav[item.key]}
                    <ChevronDown className="size-3.5" aria-hidden />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 w-[min(920px,90vw)] -translate-x-1/3 translate-y-1 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="grid grid-cols-2 gap-3 rounded-2xl border bg-white p-4 shadow-xl md:grid-cols-3 lg:grid-cols-5">
                      {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                        <div key={cat.id}>
                          <p className="mb-2 text-xs font-semibold tracking-wide text-brand uppercase">
                            {locale === "hi" ? cat.labelHi : cat.label}
                          </p>
                          <ul className="space-y-1">
                            {COURSES.filter((c) => c.category === cat.id).map((course) => (
                              <li key={course.slug}>
                                <Link
                                  href={`/courses/${course.slug}`}
                                  className="block rounded-md px-1.5 py-1 text-sm text-slate-700 transition-colors hover:bg-[#fde8d8] hover:font-medium hover:text-brand"
                                >
                                  {locale === "hi" ? course.nameHi : course.shortName}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(NAV_LINK, "flex items-center")}
                >
                  {t.nav[item.key]}
                </Link>
              )
            )}
          </nav>

          <div className="ml-auto flex items-center gap-2 py-3">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" aria-label="Notifications" />
                }
              >
                <Bell className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                {NOTIFICATIONS.map((n) => (
                  <DropdownMenuItem key={n.title} className="flex flex-col items-start gap-0.5">
                    <span className="font-medium">{locale === "hi" ? n.titleHi : n.title}</span>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/apply"
              className={cn(buttonVariants({ size: "lg" }), "hidden h-10 px-4 sm:inline-flex")}
            >
              {t.nav.apply}
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger render={<Button variant="outline" size="icon" className="xl:hidden" aria-label="Open menu" />}>
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(100%,20rem)] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>GBET</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 grid gap-1">
                  {NAV.map((item) =>
                    "about" in item && item.about ? (
                      <div key={item.href} className="grid gap-1">
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-[#fde8d8] hover:font-semibold hover:text-brand"
                        >
                          {t.nav[item.key]}
                        </Link>
                        {ABOUT_DROPDOWN.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => goAboutLink(link.href)}
                            className="rounded-lg px-6 py-1.5 text-sm text-stone-600 hover:bg-[#fde8d8] hover:text-brand"
                          >
                            {locale === "hi" ? link.labelHi : link.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-[#fde8d8] hover:font-semibold hover:text-brand"
                      >
                        {t.nav[item.key]}
                      </Link>
                    ),
                  )}
                  <Link href="/apply" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-[#fde8d8] hover:font-semibold hover:text-brand">
                    {t.nav.apply}
                  </Link>
                  <Link href="/brochure" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-[#fde8d8] hover:font-semibold hover:text-brand">
                    {t.nav.brochure}
                  </Link>
                  <Link href="/login/student" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-[#fde8d8] hover:font-semibold hover:text-brand">
                    {t.top.student}
                  </Link>
                </nav>
                <p className="mt-6 text-xs text-muted-foreground">
                  {CAMPUSES[0].address}
                </p>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-x-0 top-full z-[80] hidden pl-16 pr-3 sm:pl-20 sm:pr-5 lg:pl-36 lg:pr-8 xl:block",
            aboutOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0",
          )}
          onMouseEnter={showAbout}
          onMouseLeave={hideAbout}
          aria-hidden={!aboutOpen}
        >
          <div className="overflow-hidden rounded-b-2xl border border-[#eedfd0] bg-white shadow-2xl">
            <div className="flex items-stretch justify-center">
              <aside className="border-r border-[#e8ddd0] py-10 pl-10 pr-8">
                <div className="w-44">
                  <p className="text-3xl font-semibold tracking-tight text-navy">
                    {locale === "hi" ? "हमारे बारे में" : "About Us"}
                  </p>
                  <nav className="mt-8 flex flex-col gap-3.5 text-sm text-stone-600">
                    {ABOUT_DROPDOWN.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => goAboutLink(link.href)}
                        className={cn(
                          "transition-colors hover:text-brand",
                          !link.href.includes("#") && pathname === link.href && "font-medium text-brand",
                        )}
                      >
                        {locale === "hi" ? link.labelHi : link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </aside>
              <div className="flex gap-4 bg-cream p-5 sm:p-6">
                {NEWS.slice(0, 3).map((news) => (
                  <Link
                    key={news.slug}
                    href={`/news/${news.slug}`}
                    onClick={() => goAboutLink(`/news/${news.slug}`)}
                    className="group/card relative isolate h-[22rem] w-[15.5rem] shrink-0 overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={news.image}
                      alt={locale === "hi" ? news.titleHi : news.title}
                      fill
                      className="object-cover transition duration-500 group-hover/card:scale-105"
                      sizes="232px"
                    />
                    <div className="absolute inset-0 bg-[#1f7a32]/50 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3d2918]/80 via-[#3d2918]/20 to-transparent" />
                    <div className="relative z-10 flex h-full flex-col p-4">
                      <span className="w-fit rounded-md bg-brand/90 px-2 py-0.5 text-[11px] font-medium text-white">
                        {news.tag}
                      </span>
                      <h3 className="mt-3 text-[15px] font-semibold leading-snug text-white">
                        {locale === "hi" ? news.titleHi : news.title}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-1 text-sm text-white">
                        {locale === "hi" ? "और पढ़ें" : "Read More"}
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
