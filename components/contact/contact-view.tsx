"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { CAMPUSES, SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

const campus = CAMPUSES[0];

const HERO_BG = [
  { src: "/photos/hero-campus.jpg", en: "Campus", hi: "परिसर" },
  { src: "/photos/hero-class.jpg", en: "The desk", hi: "डेस्क" },
  { src: "/photos/library.jpg", en: "Noida", hi: "नोएडा" },
] as const;

const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(campus.mapQuery)}&z=16&hl=en&output=embed`;
const mapOpen = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campus.mapQuery)}`;

export function ContactView() {
  const { locale } = useI18n();
  const hi = locale === "hi";

  return (
    <>
      <section className="relative isolate min-h-[28rem] overflow-hidden bg-cream sm:min-h-[32rem]">
        <div className="absolute inset-0 grid grid-cols-3">
          {HERO_BG.map((frame) => (
            <div key={frame.src} className="relative min-h-full">
              <Image
                src={frame.src}
                alt={hi ? frame.hi : frame.en}
                fill
                priority
                className="object-cover object-center"
                sizes="33vw"
              />
            </div>
          ))}
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-cream/25 via-cream/88 to-cream/25"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-transparent to-cream/50" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <p className="text-[11px] font-semibold tracking-[0.38em] text-brand uppercase">
            {hi ? `सत्र ${SITE.year}` : `Session ${SITE.year}`}
          </p>
          <div className="mx-auto mt-6 h-px w-12 bg-brand" />
          <h1 className="mt-6 font-serif text-5xl font-medium tracking-tight text-navy sm:text-6xl">
            {hi ? "संपर्क" : "Contact"}
          </h1>
          <p className="mt-6 text-base leading-8 text-stone-600">
            {hi
              ? "नोएडा का प्रवेश डेस्क — कॉल, व्हाट्सएप, ईमेल, या परिसर पर आएँ। काउंसलिंग निःशुल्क है।"
              : "The Noida admissions desk — call, WhatsApp, write, or walk in. Counselling is complimentary."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-white hover:bg-navy/90"
            >
              {hi ? "कॉल करें" : "Call the desk"}
              <Phone className="size-4" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-[#eedfd0] bg-white px-7 text-sm font-semibold text-navy hover:border-brand hover:text-brand"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-[#eedfd0] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-brand uppercase">
              <MapPin className="size-3.5" />
              {hi ? "पता" : "Address"}
            </p>
            <p className="mt-2 text-sm leading-6 text-navy">{campus.address}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-brand uppercase">
              <Phone className="size-3.5" />
              {hi ? "फोन" : "Phone"}
            </p>
            <a href={`tel:${SITE.phoneTel}`} className="mt-2 block text-sm text-navy hover:text-brand">
              {SITE.phone}
            </a>
          </div>
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-brand uppercase">
              <Mail className="size-3.5" />
              {hi ? "ईमेल" : "Email"}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 block text-sm text-navy hover:text-brand"
              dir="ltr"
            >
              {SITE.email.split("@")[0]}
              <span className="mx-px">@</span>
              {SITE.email.split("@")[1]}
            </a>
          </div>
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-brand uppercase">
              <Clock className="size-3.5" />
              {hi ? "समय" : "Hours"}
            </p>
            <p className="mt-2 text-sm leading-6 text-navy">
              {hi ? "सोम–शनि, सुबह 9 – शाम 6" : "Mon–Sat, 9:00 am – 6:00 pm"}
            </p>
            <p className="text-sm text-stone-500">
              {hi ? "रविवार नियुक्ति पर" : "Sunday by appointment"}
            </p>
          </div>
        </div>
      </section>

      <section id="map" className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-navy pb-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
                {hi ? "मानचित्र" : "The map"}
              </p>
              <h2 className="mt-2 font-serif text-3xl text-navy">
                {hi ? "सी-77, सेक्टर 63ए, नोएडा" : "C-77, Sector 63A, Noida"}
              </h2>
            </div>
            <a
              href={mapOpen}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              {hi ? "Google Maps खोलें" : "Open in Google Maps"}
              <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="relative mt-8 min-h-[22rem] overflow-hidden border border-[#eedfd0] bg-white sm:min-h-[28rem] lg:min-h-[32rem]">
            <iframe
              title={hi ? "जीबीटीई नोएडा परिसर का नक्शा" : "GBTE Noida campus map"}
              src={mapEmbed}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="mt-3 text-sm text-stone-500">
            {hi ? "मुख्यालय · प्रवेश, काउंसलिंग और खाता डेस्क यहीं हैं।" : "Headquarters · admissions, counselling and the accounts desk sit here."}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "डेस्क" : "The desk"}
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy">
              {hi ? "फ़ाइल यहीं खुलती है" : "The file opens here"}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-stone-600">
              {hi
                ? "नाम, मोबाइल और कार्यक्रम लिखें। प्रवेश टीम एक कार्य दिवस में फोन करेगी। परिसर पर मार्कशीट लेकर भी आ सकते हैं।"
                : "Leave your name, mobile and programme. The admissions team calls within one working day. You may also walk in with marksheets."}
            </p>
            <ul className="mt-8 space-y-3 text-sm leading-6 text-navy">
              <li>{hi ? "निःशुल्क काउंसलिंग" : "Complimentary counselling"}</li>
              <li>{hi ? "डिप्लोमा, डिग्री और सर्टिफिकेट" : "Diploma, degree and certificate"}</li>
              <li>{hi ? "छात्रवृत्ति कागज़ उसी फाइल पर" : "Scholarship papers on the same file"}</li>
            </ul>
            <Link
              href="/admissions"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              {hi ? "प्रवेश प्रक्रिया" : "Admission steps"}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="min-w-0 border border-[#eedfd0] bg-cream p-1">
            <EnquiryForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
