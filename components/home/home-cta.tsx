"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

export function HomeCta() {
  const { locale } = useI18n();
  return (
    <section className="bg-brand">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl text-white">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {locale === "hi" ? "अगला सत्र शुरू करने के लिए तैयार हैं?" : "Ready to start your next session?"}
          </h2>
          <p className="mt-3 text-base leading-7 text-white/90">
            {locale === "hi"
              ? "डिप्लोमा आवेदन से निःशुल्क काउंसलिंग तक — हम आपको तेज़ और स्पष्ट रास्ता देते हैं।"
              : "From diploma application to free counselling, we help you move faster and with a clearer plan."}
          </p>
        </div>
        <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full bg-white px-8 text-base text-brand hover:bg-[#fff8f2]")}>
          {locale === "hi" ? "संपर्क करें" : "Contact Us"}
        </Link>
      </div>
    </section>
  );
}
