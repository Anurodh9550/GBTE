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
};
