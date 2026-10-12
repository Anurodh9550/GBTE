"use client";

import Link from "next/link";
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
  Award,
  Building2,
  FileText,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Users,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
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
import { NOTIFICATIONS } from "@/lib/content";
import { cn } from "@/lib/utils";

const DESKTOP_NAV = "min-[1360px]:flex";
const MOBILE_ONLY = "min-[1360px]:hidden";

const NAV_LINK =
  "relative inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-[15px] font-medium text-[#3E2B20] transition-colors hover:text-[#F15A16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F15A16]/35 after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-[#F15A16] after:transition-transform hover:after:scale-x-100";

const NAV = [
  { href: "/about", key: "about" as const, menu: "about" as const, en: "About Us", hi: "हमारे बारे में" },
  { href: "/courses", key: "courses" as const, menu: "courses" as const },
  { href: "/placements", key: "placements" as const },
  { href: "/scholarships", key: "scholarships" as const },
  { href: "/partners", key: "partners" as const },
  { href: "/news", key: "news" as const },
  { href: "/contact", key: "contact" as const },
] as const;

export const ABOUT_SECTIONS = [
  {
    category: "Institution & Governance",
    categoryHi: "संस्था एवं प्रशासन",
    items: [
      {
        href: "/about#overview",
        label: "Overview & Vision",
        labelHi: "परिचय एवं दृष्टि",
        desc: "Trust philosophy, 15+ years legacy & mission",
        descHi: "ट्रस्ट दर्शन, 15+ वर्ष की विरासत व उद्देश्य",
        icon: Landmark,
      },
      {
        href: "/about#leadership",
        label: "Leadership & Advisory",
        labelHi: "नेतृत्व एवं सलाहकार बोर्ड",
        desc: "Meet our visionary trustees, deans & council",
        descHi: "हमारे दूरदर्शी ट्रस्टी, डीन व मार्गदर्शक",
        icon: Users,
      },
      {
        href: "/about#accreditations",
        label: "Approvals & Accreditations",
        labelHi: "सरकारी मान्यता एवं संबद्धता",
        desc: "PCI, BTE UP & state statutory recognitions",
        descHi: "पीसीआई, बीटीई यूपी व राज्य मान्यता प्राप्त",
        icon: Award,
      },
    ],
  },
  {
    category: "Campus & Experience",
    categoryHi: "परिसर एवं सुविधाएं",
    items: [
      {
        href: "/campus",
        label: "Noida Campus Infrastructure",
        labelHi: "नोएडा परिसर इंफ्रास्ट्रक्चर",
        desc: "Smart classes, hostel blocks & Wi-Fi amenities",
        descHi: "स्मार्ट क्लास, हॉस्टल और वाई-फाई सुविधाएं",
        icon: Building2,
      },
      {
        href: "/campus#facilities",
        label: "Laboratories & Studios",
        labelHi: "प्रयोगशालाएं व स्टूडियो",
        desc: "Pharma compounding, clinical wards & AI labs",
        descHi: "फार्मेसी लैब, क्लिनिकल वार्ड व एआई कोडिंग स्टूडियो",
        icon: FlaskConical,
      },
      {
        href: "/campus#location",
        label: "Location & Transit Guide",
        labelHi: "स्थान एवं आवागमन",
        desc: "Sector 63A Noida transit routes & accessibility",
        descHi: "सेक्टर 63A नोएडा बस रूट व संपर्क मार्ग",
        icon: MapPin,
      },
    ],
  },
  {
    category: "Outcomes & Admissions",
    categoryHi: "उपलब्धियां एवं प्रवेश",
    items: [
      {
        href: "/success-stories",
        label: "Success Stories & Alumni",
        labelHi: "सफलता कथाएं व पूर्व छात्र",
        desc: "Graduates placed at Apollo, Fortis, TCS & Cipla",
        descHi: "अपोलो, फोर्टिस, टीसीएस व सिप्ला में कार्यरत छात्र",
        icon: GraduationCap,
      },
      {
        href: "/admissions",
        label: "Admissions 2027 Portal",
        labelHi: "प्रवेश 2027 पोर्टल",
        desc: "Eligibility pathways, scholarship & 5-step file",
        descHi: "पात्रता, छात्रवृत्ति व 5-चरणीय प्रवेश प्रक्रिया",
        icon: FileText,
      },
      {
        href: "/counselling",
        label: "Free Career Guidance",
        labelHi: "निःशुल्क करियर काउंसलिंग",
        desc: "1-on-1 personalized guidance before applying",
        descHi: "दाखिले से पहले व्यक्तिगत मार्गदर्शन",
        icon: HeartHandshake,
      },
    ],
  },
] as const;

function scrollToAboutHash(href: string) {
  const hash = href.split("#")[1];
  if (!hash) return;
  window.setTimeout(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const aboutTimer = useRef(0);
  const coursesTimer = useRef(0);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [mobileCourses, setMobileCourses] = useState(false);
  const [menuTop, setMenuTop] = useState(112);
  const [pathSnapshot, setPathSnapshot] = useState(pathname);
  if (pathSnapshot !== pathname) {
    setPathSnapshot(pathname);
    setAboutOpen(false);
    setCoursesOpen(false);
    setOpen(false);
    setMobileAbout(false);
    setMobileCourses(false);
  }

  const showAbout = () => {
    window.clearTimeout(aboutTimer.current);
    window.clearTimeout(coursesTimer.current);
    setCoursesOpen(false);
    setAboutOpen(true);
  };
  const hideAbout = () => {
    aboutTimer.current = window.setTimeout(() => setAboutOpen(false), 140);
  };
  const showCourses = () => {
    window.clearTimeout(coursesTimer.current);
    window.clearTimeout(aboutTimer.current);
    setAboutOpen(false);
    setCoursesOpen(true);
  };
  const hideCourses = () => {
    coursesTimer.current = window.setTimeout(() => setCoursesOpen(false), 140);
  };
  const closeMenus = () => {
    window.clearTimeout(aboutTimer.current);
    window.clearTimeout(coursesTimer.current);
    setAboutOpen(false);
    setCoursesOpen(false);
  };
  const goAboutLink = (href: string) => {
    closeMenus();
    setOpen(false);
    scrollToAboutHash(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeMenus();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.clearTimeout(aboutTimer.current);
      window.clearTimeout(coursesTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!aboutOpen && !coursesOpen) return;
    const update = () => {
      const bottom = barRef.current?.getBoundingClientRect().bottom ?? 112;
      setMenuTop(bottom);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [aboutOpen, coursesOpen]);

  const itemLabel = (item: (typeof NAV)[number]) => {
    if ("en" in item) return locale === "hi" ? item.hi : item.en;
    return t.nav[item.key];
  };

  const menuStyle = {
    top: menuTop,
    maxHeight: `calc(100vh - ${menuTop}px - 12px)`,
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      <div className="bg-[#F15A16] text-white">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between gap-3 px-4 text-[12px] leading-none sm:px-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-1.5 hover:text-white/80">
              <Phone className="size-3.5 shrink-0" aria-hidden />
              <span className="whitespace-nowrap">{SITE.phone}</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-1.5 hover:text-white/80 sm:hidden"
              aria-label={SITE.email}
            >
              <Mail className="size-3.5" aria-hidden />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="hidden items-center gap-1.5 whitespace-nowrap hover:text-white/80 sm:inline-flex"
            >
              <Mail className="size-3.5 shrink-0" aria-hidden />
              {SITE.email}
            </a>
            <span className="hidden items-center gap-1.5 whitespace-nowrap md:inline-flex">
              <MapPin className="size-3.5 shrink-0" aria-hidden />
              {t.top.hq}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full px-1 py-0.5 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              onClick={() => setLocale(locale === "en" ? "hi" : "en")}
              aria-label={locale === "en" ? "Switch to Hindi" : "Switch to English"}
            >
              <Globe className="size-3.5" aria-hidden />
              {t.top.language}
            </button>
            <Link href="/login/student" className="hidden whitespace-nowrap hover:text-white/80 md:inline">
              {t.top.student}
            </Link>
            <Link href="/login/faculty" className="hidden whitespace-nowrap hover:text-white/80 lg:inline">
              {t.top.faculty}
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={barRef}
        className={cn(
          "relative border-b border-[#E7DFD6] bg-white",
          scrolled ? "shadow-[0_8px_24px_rgba(62,43,32,0.08)]" : "shadow-[0_1px_2px_rgba(62,43,32,0.05)]",
        )}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center gap-3 px-4 sm:px-6">
          <Logo />

          <nav className={cn("hidden flex-1 items-center justify-center gap-0.5", DESKTOP_NAV)} aria-label="Primary">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              const menu = "menu" in item ? item.menu : null;
              const opened = menu === "about" ? aboutOpen : menu === "courses" ? coursesOpen : false;
              return (
                <div
                  key={item.href}
                  className="flex items-center"
                  onMouseEnter={menu === "about" ? showAbout : menu === "courses" ? showCourses : undefined}
                  onMouseLeave={menu === "about" ? hideAbout : menu === "courses" ? hideCourses : undefined}
                  onFocus={menu === "about" ? showAbout : menu === "courses" ? showCourses : undefined}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(NAV_LINK, (active || opened) && "text-[#F15A16] after:scale-x-100")}
                  >
                    {itemLabel(item)}
                  </Link>
                  {menu ? (
                    <button
                      type="button"
                      className="inline-flex size-7 items-center justify-center rounded-md text-[#3E2B20] hover:text-[#F15A16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F15A16]/35"
                      aria-expanded={opened}
                      aria-controls={menu === "about" ? "about-menu" : "courses-menu"}
                      aria-label={locale === "hi" ? `${itemLabel(item)} मेनू` : `${itemLabel(item)} menu`}
                      onClick={() => (menu === "about" ? (aboutOpen ? closeMenus() : showAbout()) : coursesOpen ? closeMenus() : showCourses())}
                    >
                      <ChevronDown className={cn("size-3.5 transition-transform", opened && "rotate-180")} aria-hidden />
                    </button>
                  ) : null}
                  {menu === "about" && aboutOpen ? (
                    <AboutMenu locale={locale} pathname={pathname} menuStyle={menuStyle} onEnter={showAbout} onLeave={hideAbout} onNavigate={goAboutLink} />
                  ) : null}
                  {menu === "courses" && coursesOpen ? (
                    <CoursesMenu locale={locale} menuStyle={menuStyle} onEnter={showCourses} onLeave={hideCourses} onNavigate={closeMenus} />
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 min-[1360px]:ml-0">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon" className="text-[#3E2B20]" aria-label="Notifications" />}
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
              className="inline-flex h-10 items-center rounded-lg bg-[#F15A16] px-4 text-[15px] font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-[#d94e10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F15A16]/40"
            >
              {t.nav.apply}
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button variant="outline" size="icon" className={cn(MOBILE_ONLY, "border-[#E7DFD6] text-[#3E2B20]")} aria-label="Open menu" />
                }
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(100%,22rem)] overflow-y-auto bg-white">
                <SheetHeader>
                  <SheetTitle className="text-[#3E2B20]">GBET</SheetTitle>
                </SheetHeader>
                <Link
                  href="/apply"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#F15A16] text-sm font-semibold text-white"
                >
                  {t.nav.apply}
                </Link>
                <nav className="mt-4 grid gap-1" aria-label="Mobile">
                  {NAV.map((item) => {
                    const menu = "menu" in item ? item.menu : null;
                    if (menu === "about") {
                      return (
                        <div key={item.href}>
                          <div className="flex items-center">
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="flex-1 rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#3E2B20] hover:bg-[#FFF8F1] hover:text-[#F15A16]"
                            >
                              {itemLabel(item)}
                            </Link>
                            <button
                              type="button"
                              className="inline-flex size-10 items-center justify-center rounded-lg text-[#3E2B20]"
                              aria-expanded={mobileAbout}
                              aria-label={locale === "hi" ? "परिचय मेनू" : "About Us menu"}
                              onClick={() => setMobileAbout((value) => !value)}
                            >
                              <ChevronDown className={cn("size-4 transition-transform", mobileAbout && "rotate-180")} aria-hidden />
                            </button>
                          </div>
                          {mobileAbout ? (
                            <div className="grid gap-2 pb-2 pl-2">
                              {ABOUT_SECTIONS.map((section) => (
                                <div key={section.category}>
                                  <p className="px-3 text-[10px] font-bold tracking-wider text-stone-400 uppercase">
                                    {locale === "hi" ? section.categoryHi : section.category}
                                  </p>
                                  {section.items.map((link) => (
                                    <Link
                                      key={link.href}
                                      href={link.href}
                                      onClick={() => goAboutLink(link.href)}
                                      className="block rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-[#FFF8F1] hover:text-[#F15A16]"
                                    >
                                      {locale === "hi" ? link.labelHi : link.label}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      );
                    }
                    if (menu === "courses") {
                      return (
                        <div key={item.href}>
                          <div className="flex items-center">
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="flex-1 rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#3E2B20] hover:bg-[#FFF8F1] hover:text-[#F15A16]"
                            >
                              {itemLabel(item)}
                            </Link>
                            <button
                              type="button"
                              className="inline-flex size-10 items-center justify-center rounded-lg text-[#3E2B20]"
                              aria-expanded={mobileCourses}
                              aria-label={locale === "hi" ? "पाठ्यक्रम मेनू" : "Courses menu"}
                              onClick={() => setMobileCourses((value) => !value)}
                            >
                              <ChevronDown className={cn("size-4 transition-transform", mobileCourses && "rotate-180")} aria-hidden />
                            </button>
                          </div>
                          {mobileCourses ? (
                            <div className="grid max-h-80 gap-2 overflow-y-auto pb-2 pl-2">
                              {CATEGORIES.filter((category) => category.id !== "all").map((category) => (
                                <div key={category.id}>
                                  <p className="px-3 text-[10px] font-bold tracking-wider text-[#F15A16] uppercase">
                                    {locale === "hi" ? category.labelHi : category.label}
                                  </p>
                                  {COURSES.filter((course) => course.category === category.id).map((course) => (
                                    <Link
                                      key={course.slug}
                                      href={`/courses/${course.slug}`}
                                      onClick={() => setOpen(false)}
                                      className="block rounded-lg px-3 py-1.5 text-sm text-stone-600 hover:bg-[#FFF8F1] hover:text-[#F15A16]"
                                    >
                                      {locale === "hi" ? course.nameHi : course.shortName}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#3E2B20] hover:bg-[#FFF8F1] hover:text-[#F15A16]"
                      >
                        {itemLabel(item)}
                      </Link>
                    );
                  })}
                  <Link href="/login/student" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#3E2B20] hover:bg-[#FFF8F1] hover:text-[#F15A16]">
                    {t.top.student}
                  </Link>
                  <Link href="/login/faculty" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#3E2B20] hover:bg-[#FFF8F1] hover:text-[#F15A16]">
                    {t.top.faculty}
                  </Link>
                </nav>
                <p className="mt-6 text-xs text-stone-500">{CAMPUSES[0].address}</p>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function AboutMenu({
  locale,
  pathname,
  menuStyle,
  onEnter,
  onLeave,
  onNavigate,
}: {
  locale: "en" | "hi";
  pathname: string;
  menuStyle: { top: number; maxHeight: string };
  onEnter: () => void;
  onLeave: () => void;
  onNavigate: (href: string) => void;
}) {
  return (
          <div
            id="about-menu"
            role="region"
            aria-label="About Us"
            className="fixed inset-x-0 z-50 overflow-y-auto px-4 sm:px-6"
            style={menuStyle}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-[#E7DFD6] bg-white shadow-[0_16px_40px_rgba(62,43,32,0.12)]">
              <div className="grid grid-cols-12">
                <div className="col-span-8 p-7">
                  <div className="flex items-center justify-between gap-4 border-b border-[#E7DFD6] pb-4">
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.22em] text-[#F15A16] uppercase">
                        {locale === "hi" ? "गौतम बुद्ध एजुकेशनल ट्रस्ट" : "Gautam Buddha Educational Trust"}
                      </p>
                      <h3 className="font-serif text-2xl font-medium text-[#3E2B20]">
                        {locale === "hi" ? "हमारे बारे में — विरासत, परिसर और उपलब्धियां" : "About Us — Heritage, Campus & Outcomes"}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#FFF8F1] px-3 py-1 text-xs font-semibold text-[#F15A16]">
                      {locale === "hi" ? `सत्र ${SITE.year}` : `Session ${SITE.year}`}
                    </span>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-5">
                    {ABOUT_SECTIONS.map((section) => (
                      <div key={section.category} className="space-y-3">
                        <p className="text-[10.5px] font-bold tracking-wider text-stone-400 uppercase">
                          {locale === "hi" ? section.categoryHi : section.category}
                        </p>
                        <div className="space-y-1.5">
                          {section.items.map((item) => {
                            const Icon = item.icon;
                            const current = !item.href.includes("#") && pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => onNavigate(item.href)}
                                className={cn(
                                  "group flex items-start gap-2.5 rounded-xl p-2 transition hover:bg-[#FFF8F1]",
                                  current && "bg-[#FFF8F1] ring-1 ring-[#F15A16]/20",
                                )}
                              >
                                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#3E2B20]/5 text-[#3E2B20] transition group-hover:bg-[#F15A16] group-hover:text-white">
                                  <Icon className="size-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-semibold text-[#3E2B20] transition group-hover:text-[#F15A16]">
                                    {locale === "hi" ? item.labelHi : item.label}
                                  </p>
                                  <p className="mt-0.5 line-clamp-1 text-[10.5px] text-stone-500">
                                    {locale === "hi" ? item.descHi : item.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3 rounded-xl bg-[#FFF8F1] px-4 py-2.5 text-xs text-stone-600">
                    <span>
                      {locale === "hi"
                        ? "निःशुल्क करियर परामर्श उपलब्ध — 15 मिनट में गाइडेंस पाएं।"
                        : "Complimentary career guidance — talk to an expert in 15 minutes."}
                    </span>
                    <Link href="/counselling" onClick={() => onNavigate("/counselling")} className="shrink-0 font-semibold text-[#F15A16] hover:underline">
                      {locale === "hi" ? "काउंसलिंग बुक करें →" : "Book Counselling →"}
                    </Link>
                  </div>
                </div>
                <div className="col-span-4 flex flex-col justify-between border-l border-[#E7DFD6] bg-[#FFF8F1] p-7">
                  <div>
                    <div className="inline-flex rounded-full bg-[#F15A16]/15 px-3 py-1 text-[11px] font-semibold text-[#F15A16]">
                      {locale === "hi" ? "प्रवेश 2027 खुले हैं" : "Admissions Open 2027"}
                    </div>
                    <h4 className="mt-3 font-serif text-xl font-medium text-[#3E2B20]">
                      {locale === "hi" ? "गुणवत्तापूर्ण शिक्षा एवं 100% करियर सपोर्ट" : "Outcome-Driven Education in Noida"}
                    </h4>
                    <p className="mt-2 text-xs leading-5 text-stone-600">
                      {locale === "hi"
                        ? "PCI व राज्य परिषद अनुमोदित डिप्लोमा, 100+ हायरिंग पार्टनर, परिमाणम ऑनलाइन LMS और आधुनिक सिमुलेशन लैब्स।"
                        : "PCI approved diplomas, 100+ hiring partners, dedicated Parimanam online LMS and state-of-the-art simulation labs."}
                    </p>
                    <div className="mt-5 space-y-2 border-y border-[#E7DFD6] py-3 text-xs text-stone-700">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#3E2B20]">{locale === "hi" ? "हायरिंग नेटवर्क" : "Hiring Network"}</span>
                        <span className="font-bold text-[#F15A16]">100+ Partners</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#3E2B20]">{locale === "hi" ? "प्लेसमेंट दर" : "Placement Support"}</span>
                        <span className="font-bold text-[#F15A16]">95% Record</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#3E2B20]">{locale === "hi" ? "ऑनलाइन LMS" : "Online LMS"}</span>
                        <span className="font-bold text-[#F15A16]">24/7 Access</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <Link
                      href="/admissions"
                      onClick={() => onNavigate("/admissions")}
                      className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-[#3E2B20] text-xs font-semibold text-white transition hover:bg-[#3E2B20]/90"
                    >
                      <span>{locale === "hi" ? "प्रवेश पोर्टल खोलें" : "Open Admissions Portal"}</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                    <Link
                      href="/brochure"
                      onClick={() => onNavigate("/brochure")}
                      className="flex h-9 w-full items-center justify-center rounded-xl border border-[#3E2B20]/20 bg-white text-xs font-semibold text-[#3E2B20] transition hover:border-[#F15A16] hover:text-[#F15A16]"
                    >
                      {locale === "hi" ? "ब्रोशर डाउनलोड करें" : "Download Brochure"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}

function CoursesMenu({
  locale,
  menuStyle,
  onEnter,
  onLeave,
  onNavigate,
}: {
  locale: "en" | "hi";
  menuStyle: { top: number; maxHeight: string };
  onEnter: () => void;
  onLeave: () => void;
  onNavigate: () => void;
}) {
  return (
          <div
            id="courses-menu"
            role="region"
            aria-label="Courses"
            className="fixed inset-x-0 z-50 overflow-y-auto px-4 sm:px-6"
            style={menuStyle}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            <div className="mx-auto max-w-7xl rounded-2xl border border-[#E7DFD6] bg-white p-4 shadow-[0_16px_40px_rgba(62,43,32,0.12)]">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
                {CATEGORIES.filter((category) => category.id !== "all").map((category) => (
                  <div key={category.id}>
                    <p className="mb-2 text-xs font-semibold tracking-wide text-[#F15A16] uppercase">
                      {locale === "hi" ? category.labelHi : category.label}
                    </p>
                    <ul className="space-y-1">
                      {COURSES.filter((course) => course.category === category.id).map((course) => (
                        <li key={course.slug}>
                          <Link
                            href={`/courses/${course.slug}`}
                            onClick={onNavigate}
                            className="block rounded-md px-1.5 py-1 text-sm text-[#3E2B20] hover:bg-[#FFF8F1] hover:text-[#F15A16]"
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
  );
}
