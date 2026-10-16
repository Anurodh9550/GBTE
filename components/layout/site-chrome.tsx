"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/widgets/whatsapp-button";
import { AdmissionChatbot } from "@/components/widgets/chatbot";
import { CounsellingPopup } from "@/components/widgets/counselling-popup";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const online = pathname === "/online" || pathname.startsWith("/online/");

  if (online) {
    return (
      <>
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <AdmissionChatbot />
      <CounsellingPopup />
    </>
  );
}
