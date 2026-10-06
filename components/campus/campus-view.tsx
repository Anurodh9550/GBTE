"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { FACILITIES } from "@/lib/content";
import { CAMPUSES, SITE } from "@/lib/site";

const SPACE_COPY: Record<string, { body: string; bodyHi: string }> = {
  "Smart Classrooms": {
    body: "Interactive boards, hybrid lectures and recorded revision for diploma, degree and certificate batches.",
    bodyHi: "डिप्लोमा, डिग्री और सर्टिफिकेट बैच के लिए इंटरैक्टिव बोर्ड, हाइब्रिड लेक्चर और रिकॉर्डेड रिवीजन।",
  },
  Library: {
    body: "Quiet stacks and reference desks for pharmacy, education and allied-health study.",
    bodyHi: "फार्मेसी, शिक्षा और संबद्ध स्वास्थ्य अध्ययन के लिए शांत पुस्तकालय।",
  },
  "Computer Labs": {
    body: "Workstations for AI, design, documentation and digital assignments.",
    bodyHi: "एआई, डिज़ाइन, डॉक्यूमेंटेशन और डिजिटल असाइनमेंट के लिए वर्कस्टेशन।",
  },
  "Pharmacy Labs": {
    body: "PCI-aligned compounding and dispensing practice — not theory only.",
    bodyHi: "पीसीआई-संरेखित कंपाउंडिंग और डिस्पेंसिंग अभ्यास — केवल सिद्धांत नहीं।",
  },
  Hostel: {
    body: "Secure residential blocks with mess, wifi and round-the-clock support.",
    bodyHi: "मेस, वाई-फाई और 24x7 सहायता के साथ सुरक्षित आवासीय ब्लॉक।",
  },
  Transport: {
    body: "Noida routes that keep daily attendance realistic for outstation students.",
    bodyHi: "बाहरी छात्रों के लिए नोएडा रूट — रोज़ उपस्थिति संभव।",
  },
  "Sports Ground": {
    body: "Fitness hours and inter-batch meets on the Sector 63A campus.",
    bodyHi: "सेक्टर 63ए परिसर पर फिटनेस और इंटर-बैच मीट।",
  },
  "Seminar Hall": {
    body: "Industry guests, mock interviews and counselling briefings.",
    bodyHi: "इंडस्ट्री अतिथि, मॉक इंटरव्यू और काउंसलिंग ब्रीफिंग।",
  },
};

const campus = CAMPUSES[0];

export function CampusView() {
  const { locale } = useI18n();
  const hi = locale === "hi";
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campus.mapQuery)}`;

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="relative h-64 overflow-hidden sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[62%]">
          <video
            src="/videos/about-campus.mp4"
            className="absolute inset-0 h-full w-full scale-[1.12] object-cover object-center brightness-[1.15]"
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-white from-0% via-white/20 via-22% to-transparent to-55% lg:bg-gradient-to-r lg:from-white lg:from-0% lg:via-white/30 lg:via-[8%] lg:to-transparent lg:to-[18%]"
            aria-hidden
          />
        </div>

        <div className="relative mx-auto flex min-h-[22rem] max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:min-h-[34rem] lg:py-20">
          <div className="relative z-10 max-w-lg">
            <p className="text-xs font-semibold tracking-[0.22em] text-brand uppercase">
              {hi ? "परिसर" : "Campus"}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-[2.75rem] sm:leading-[1.18]">
              {hi ? (
                <>
                  नोएडा का परिसर —
                  <br />
                  पहली भूमिका के लिए
                </>
              ) : (
                <>
                  A Noida campus built
                  <br />
                  for first roles
                </>
              )}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              {hi
                ? `${campus.address} पर स्मार्ट कक्षाएँ, लैब, पुस्तकालय, छात्रावास और प्लेसमेंट डेस्क — डिप्लोमा, डिग्री और सर्टिफिकेट एक ही परिसर में।`
                : `Smart classrooms, labs, library, hostel and a career desk at ${campus.address} — diploma, degree and certificate on one working campus.`}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-white transition hover:bg-navy/90"
              >
                {hi ? "मैप खोलें" : "Open in Maps"}
                <ArrowRight className="size-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#eedfd0] bg-white px-7 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
              >
                {hi ? "टूर बुक करें" : "Book a tour"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#eedfd0] bg-cream">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:grid-cols-3 sm:px-6">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brand" />
            <div>
              <p className="text-sm font-semibold text-navy">{hi ? campus.nameHi : campus.name}</p>
              <p className="mt-1 text-sm text-stone-600">{campus.address}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">{hi ? "मुख्यालय" : campus.role}</p>
            <p className="mt-1 text-sm text-stone-600">
              {hi ? "सभी कार्यक्रमों का एक परिसर — सेक्टर 63ए।" : "One headquarters for every pathway — Sector 63A."}
            </p>
          </div>
          <a href={`tel:${SITE.phoneTel}`} className="flex gap-3 hover:text-brand">
            <Phone className="mt-0.5 size-5 shrink-0 text-brand" />
            <div>
              <p className="text-sm font-semibold text-navy">{SITE.phone}</p>
              <p className="mt-1 text-sm text-stone-600">{hi ? "टूर और काउंसलिंग के लिए कॉल करें।" : "Call to schedule a campus visit."}</p>
            </div>
          </a>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.22em] text-brand uppercase">
            {hi ? "सुविधाएँ" : "Facilities"}
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {hi ? "जहाँ अभ्यास परीक्षा से पहले आता है" : "Where practice comes before the exam"}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            {hi
              ? "फार्मेसी लैब से सेमिनार हॉल तक — परिसर उसी काम के लिए बना है जो प्लेसमेंट डेस्क बाद में माँगता है।"
              : "From pharmacy labs to the seminar hall, the campus is built for the work hiring desks later ask for."}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {FACILITIES.map((f, i) => {
              const copy = SPACE_COPY[f.title];
              const featured = i === 0;
              return (
                <article
                  key={f.title}
                  className={
                    featured
                      ? "relative col-span-2 row-span-2 min-h-[18rem] overflow-hidden rounded-2xl md:min-h-[28rem]"
                      : "relative min-h-[11rem] overflow-hidden rounded-2xl md:min-h-[13.5rem]"
                  }
                >
                  <Image
                    src={f.image}
                    alt={hi ? f.titleHi : f.title}
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                    sizes={featured ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3d2918]/80 via-[#3d2918]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <h3 className="font-semibold text-white">{hi ? f.titleHi : f.title}</h3>
                    {copy ? (
                      <p className="mt-1 max-w-sm text-xs leading-5 text-white/85 sm:text-sm">
                        {hi ? copy.bodyHi : copy.body}
                      </p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/photos/campus-noida.jpg" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-[#3d2918]/50" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-medium text-white sm:text-xl">
              {hi ? "आवेदन से पहले परिसर देखें।" : "Walk the campus before you apply."}
            </p>
            <p className="mt-2 max-w-xl text-sm text-white/80">
              {campus.address}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/counselling"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(232,92,26,0.28)] hover:bg-brand/90"
            >
              {hi ? "काउंसलिंग बुक करें" : "Book counselling"}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/apply"
              className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-navy hover:bg-cream"
            >
              {hi ? "आवेदन करें" : "Apply now"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
