"use client";

import { MessageCircle } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { whatsappLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const { t } = useI18n();
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-700/30 transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-white"
      aria-label={t.whatsapp}
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
