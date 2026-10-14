import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PartnerWordmark({
  name,
  light = false,
  className,
}: {
  name: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-12 w-full items-center justify-center transition",
        light ? "text-white/90" : "text-[#9a9a9a] hover:text-[#5c5c5c]",
        className,
      )}
    >
      {WORDMARKS[name] ?? (
        <span className="text-lg font-semibold tracking-[0.12em] uppercase">{name}</span>
      )}
    </div>
  );
}

const WORDMARKS: Record<string, ReactNode> = {
  "Parimanam Solutions": (
    <svg viewBox="0 0 210 38" className="h-9 w-auto" aria-label="Parimanam Solutions">
      <path d="M4 8 L18 8 C24 8 26 12 26 18 C26 24 24 28 18 28 L4 28 Z M9 13 L9 23 L17 23 C20 23 21 21 21 18 C21 15 20 13 17 13 Z" fill="currentColor" />
      <circle cx="28" cy="10" r="2.5" fill="currentColor" />
      <text x="36" y="21" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="15" fontWeight="800" letterSpacing="1">
        PARIMANAM
      </text>
      <text x="36" y="32" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8" fontWeight="600" letterSpacing="2.6" opacity="0.85">
        SOLUTIONS · LMS
      </text>
    </svg>
  ),
  Parimanam: (
    <svg viewBox="0 0 170 36" className="h-9 w-auto" aria-label="Parimanam">
      <circle cx="10" cy="18" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="10" cy="18" r="3.5" fill="currentColor" />
      <text x="24" y="24" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="700" letterSpacing="0.8">
        Parimanam
      </text>
      <text x="124" y="15" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8" fontWeight="700" letterSpacing="1">
        LMS
      </text>
    </svg>
  ),
  TCS: (
    <svg viewBox="0 0 120 36" className="h-9 w-auto" aria-label="TCS">
      <text x="4" y="26" fill="currentColor" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" letterSpacing="2">
        TCS
      </text>
    </svg>
  ),
  Wipro: (
    <svg viewBox="0 0 140 36" className="h-9 w-auto" aria-label="Wipro">
      <circle cx="12" cy="18" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="18" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text x="28" y="25" fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="600" letterSpacing="1.5">
        wipro
      </text>
    </svg>
  ),
  HCL: (
    <svg viewBox="0 0 110 36" className="h-9 w-auto" aria-label="HCL">
      <text x="2" y="26" fill="currentColor" fontFamily="Arial Black, system-ui" fontSize="22" fontWeight="800">
        HCL
      </text>
      <text x="58" y="25" fill="currentColor" fontFamily="system-ui" fontSize="9" fontWeight="600" letterSpacing="1.4">
        Tech
      </text>
    </svg>
  ),
  Infosys: (
    <svg viewBox="0 0 150 36" className="h-9 w-auto" aria-label="Infosys">
      <text x="2" y="26" fill="currentColor" fontFamily="Georgia, serif" fontSize="20" fontStyle="italic" fontWeight="600">
        Infosys
      </text>
    </svg>
  ),
  Apollo: (
    <svg viewBox="0 0 160 40" className="h-10 w-auto" aria-label="Apollo">
      <path d="M14 6 L16 13 H23 L17.5 17.2 L19.6 24 L14 20 L8.4 24 L10.5 17.2 L5 13 H12 Z" fill="currentColor" />
      <text x="30" y="18" fill="currentColor" fontFamily="system-ui" fontSize="13" fontWeight="700" letterSpacing="2">
        APOLLO
      </text>
      <text x="30" y="32" fill="currentColor" fontFamily="system-ui" fontSize="8" letterSpacing="3.2">
        HOSPITALS
      </text>
    </svg>
  ),
  Fortis: (
    <svg viewBox="0 0 140 36" className="h-9 w-auto" aria-label="Fortis">
      <path d="M6 8 H18 V11 H13.5 V28 H10.5 V11 H6 Z" fill="currentColor" />
      <text x="26" y="25" fill="currentColor" fontFamily="system-ui" fontSize="18" fontWeight="700" letterSpacing="1">
        Fortis
      </text>
    </svg>
  ),
  Medanta: (
    <svg viewBox="0 0 160 36" className="h-9 w-auto" aria-label="Medanta">
      <path d="M12 6 C9 10 6 13 6 17 A6 6 0 0 0 18 17 C18 13 15 10 12 6 Z" fill="currentColor" />
      <text x="26" y="25" fill="currentColor" fontFamily="Georgia, serif" fontSize="18" fontWeight="600">
        Medanta
      </text>
    </svg>
  ),
  Cipla: (
    <svg viewBox="0 0 120 36" className="h-9 w-auto" aria-label="Cipla">
      <text x="2" y="26" fill="currentColor" fontFamily="system-ui" fontSize="22" fontWeight="500" letterSpacing="0.5">
        Cipla
      </text>
    </svg>
  ),
  "Sun Pharma": (
    <svg viewBox="0 0 170 40" className="h-10 w-auto" aria-label="Sun Pharma">
      <circle cx="12" cy="18" r="4" fill="currentColor" />
      <path
        d="M12 8 V10.5 M12 25.5 V28 M4 18 H6.5 M17.5 18 H20 M6.2 10.2 L8 12 M16 24 L17.8 25.8 M17.8 10.2 L16 12 M8 24 L6.2 25.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <text x="28" y="16" fill="currentColor" fontFamily="system-ui" fontSize="12" fontWeight="700" letterSpacing="1.5">
        SUN
      </text>
      <text x="28" y="30" fill="currentColor" fontFamily="system-ui" fontSize="11" fontWeight="500" letterSpacing="2">
        PHARMA
      </text>
    </svg>
  ),
  Deloitte: (
    <svg viewBox="0 0 160 36" className="h-9 w-auto" aria-label="Deloitte">
      <text x="2" y="26" fill="currentColor" fontFamily="Georgia, serif" fontSize="20" fontWeight="500">
        Deloitte
      </text>
      <circle cx="118" cy="26" r="3.2" fill="currentColor" />
    </svg>
  ),
  "Kendriya Vidyalaya": (
    <svg viewBox="0 0 180 36" className="h-9 w-auto" aria-label="Kendriya Vidyalaya">
      <text x="2" y="16" fill="currentColor" fontFamily="system-ui" fontSize="11" fontWeight="700" letterSpacing="1.4">
        KENDRIYA
      </text>
      <text x="2" y="30" fill="currentColor" fontFamily="system-ui" fontSize="11" fontWeight="500" letterSpacing="1.8">
        VIDYALAYA
      </text>
    </svg>
  ),
  "UP Govt. School": (
    <svg viewBox="0 0 180 36" className="h-9 w-auto" aria-label="UP Government School">
      <text x="2" y="16" fill="currentColor" fontFamily="system-ui" fontSize="11" fontWeight="700" letterSpacing="1.2">
        UP GOVT
      </text>
      <text x="2" y="30" fill="currentColor" fontFamily="system-ui" fontSize="11" fontWeight="500" letterSpacing="1.6">
        SCHOOL
      </text>
    </svg>
  ),
  "Max Healthcare": (
    <svg viewBox="0 0 180 36" className="h-9 w-auto" aria-label="Max Healthcare">
      <text x="2" y="16" fill="currentColor" fontFamily="Georgia, serif" fontSize="16" fontWeight="700">
        MAX
      </text>
      <text x="2" y="30" fill="currentColor" fontFamily="system-ui" fontSize="9" letterSpacing="2.4">
        HEALTHCARE
      </text>
    </svg>
  ),
  Accenture: (
    <svg viewBox="0 0 170 36" className="h-9 w-auto" aria-label="Accenture">
      <text x="2" y="25" fill="currentColor" fontFamily="system-ui" fontSize="16" fontWeight="600" letterSpacing="0.4">
        accenture
      </text>
      <path d="M148 10 L156 22 L148 28" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  "Tech Mahindra": (
    <svg viewBox="0 0 200 36" className="h-9 w-auto" aria-label="Tech Mahindra">
      <text x="2" y="16" fill="currentColor" fontFamily="system-ui" fontSize="11" fontWeight="700" letterSpacing="1.6">
        TECH
      </text>
      <text x="2" y="30" fill="currentColor" fontFamily="Georgia, serif" fontSize="14" fontWeight="600">
        Mahindra
      </text>
    </svg>
  ),
  Cognizant: (
    <svg viewBox="0 0 180 36" className="h-9 w-auto" aria-label="Cognizant">
      <text x="2" y="26" fill="currentColor" fontFamily="Georgia, serif" fontSize="17" fontWeight="600">
        Cognizant
      </text>
    </svg>
  ),
  IBM: (
    <svg viewBox="0 0 90 36" className="h-9 w-auto" aria-label="IBM">
      <text x="2" y="26" fill="currentColor" fontFamily="Arial Black, system-ui" fontSize="22" fontWeight="800" letterSpacing="3">
        IBM
      </text>
    </svg>
  ),
  "Dr Reddy's": (
    <svg viewBox="0 0 180 36" className="h-9 w-auto" aria-label="Dr Reddy's">
      <text x="2" y="16" fill="currentColor" fontFamily="Georgia, serif" fontSize="14" fontWeight="700">
        Dr. Reddy's
      </text>
      <text x="2" y="30" fill="currentColor" fontFamily="system-ui" fontSize="9" letterSpacing="2">
        LABORATORIES
      </text>
    </svg>
  ),
  Lupin: (
    <svg viewBox="0 0 120 36" className="h-9 w-auto" aria-label="Lupin">
      <text x="2" y="26" fill="currentColor" fontFamily="Georgia, serif" fontSize="20" fontWeight="600">
        Lupin
      </text>
    </svg>
  ),
  "HDFC Bank": (
    <svg viewBox="0 0 160 36" className="h-9 w-auto" aria-label="HDFC Bank">
      <text x="2" y="16" fill="currentColor" fontFamily="system-ui" fontSize="14" fontWeight="800" letterSpacing="2">
        HDFC
      </text>
      <text x="2" y="30" fill="currentColor" fontFamily="system-ui" fontSize="9" letterSpacing="3">
        BANK
      </text>
    </svg>
  ),
};
