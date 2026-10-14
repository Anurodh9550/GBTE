"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Building2,
  Laptop,
  Award,
  BookOpen,
  Users,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

export const FEATURED_ALLIANCE = {
  name: "Parimanam Solutions",
  title: "Parimanam Learning Management System (LMS)",
  titleHi: "परिमाणम लर्निंग मैनेजमेंट सिस्टम (LMS)",
  role: "Official Strategic Alliance & Digital LMS Partner",
  roleHi: "आधिकारिक रणनीतिक एलायंस एवं डिजिटल LMS पार्टनर",
  category: "Strategic Learning Alliance",
  categoryHi: "रणनीतिक शिक्षा एलायंस",
  url: "https://parimanamsolutions.com/",
  badge: "Official Online & LMS Alliance Partner",
  badgeHi: "आधिकारिक ऑनलाइन एवं LMS एलायंस पार्टनर",
  description:
    "Gautam Buddha Educational Trust has partnered with Parimanam Solutions to deliver an integrated, enterprise-grade digital learning ecosystem. Through the innovative 'Skill Foundry' model aligned with NSDC & NCVET standards, our students gain 24/7 access to cloud-hosted courses, hands-on labs, AI & Big Data masterclasses, and verifiable career-readiness certifications.",
  descriptionHi:
    "गौतम बुद्ध एजुकेशनल ट्रस्ट ने परिमाणम सॉल्यूशंस के साथ मिलकर छात्रों के लिए उच्च स्तरीय डिजिटल लर्निंग इकोसिस्टम स्थापित किया है। 'स्किल फाउंड्री' मॉडल के तहत एनएसडीसी (NSDC) व एनसीवीईटी (NCVET) मानकों के अनुरूप, यह छात्रों को 24/7 क्लाउड-होस्टेड कोर्स, हैंड्स-ऑन लैब्स, एआई व बिग डेटा मास्टरक्लास और उद्योग-सत्यापित सर्टिफिकेशन प्रदान करता है।",
  features: [
    {
      title: "24/7 Digital LMS Student Portal",
      titleHi: "24/7 डिजिटल LMS छात्र पोर्टल",
      desc: "Round-the-clock access to digitized lecture modules, revision vaults, study guides, and faculty notes from anywhere on mobile or desktop.",
      descHi: "मोबाइल व डेस्कटॉप पर चौबीसों घंटे डिजिटल लेक्चर, रिवीजन सामग्री, स्टडी नोट्स और फैकल्टी गाइड उपलब्ध।",
    },
    {
      title: "Industry-Demanded Tech Tracks",
      titleHi: "उच्च-मांग टेक्नोलॉजी ट्रैक्स",
      desc: "Curated programs in Artificial Intelligence (AI), Python, Apache Spark, Hadoop, Cloud Computing (Azure), SQL, and Full-Stack Coding.",
      descHi: "आर्टिफिशियल इंटेलिजेंस (AI), पायथन, अपाचे स्पार्क, हडूप, माइक्रोसॉफ्ट एज़्योर क्लाउड और एसक्यूएल में विशेषज्ञता।",
    },
    {
      title: "NSDC & NCVET Aligned Framework",
      titleHi: "NSDC व NCVET से संबद्ध ढाँचा",
      desc: "Standardized Skill India training model designed for immediate employability, hands-on capstone projects, and real enterprise relevance.",
      descHi: "स्किल इंडिया और राष्ट्रीय कौशल विकास परिषद मानकों पर आधारित रोजगारोन्मुखी प्रशिक्षण व लाइव प्रोजेक्ट्स।",
    },
    {
      title: "Continuous Evaluation & Certifications",
      titleHi: "निरंतर मूल्यांकन व सत्यापन",
      desc: "Interactive quizzes, automated programming assignments, real-time feedback, and verified completion credentials for portfolios.",
      descHi: "इंटरएक्टिव क्विज, ऑटोमेटेड कोडिंग टेस्ट, त्वरित परिणाम और रिज्यूमे के लिए सत्यापित डिजिटल सर्टिफिकेट।",
    },
  ],
  stats: [
    { value: "24/7", label: "Digital LMS Access", labelHi: "डिजिटल पोर्टल एक्सेस" },
    { value: "10+", label: "Advanced Tech Modules", labelHi: "एडवांस्ड टेक्नोलॉजी मॉड्यूल" },
    { value: "100%", label: "Batch Coverage", labelHi: "छात्र सहभागिता" },
    { value: "NSDC", label: "Skill India Aligned", labelHi: "स्किल इंडिया से मान्यता" },
  ],
};

const PARTNERS = [
  {
    name: "Parimanam Solutions",
    sector: "Alliances" as const,
    sectorHi: "रणनीतिक एलायंस",
    role: "Official LMS & Online Learning Partner",
    roleHi: "आधिकारिक LMS व ऑनलाइन लर्निंग पार्टनर",
    about: "Enterprise LMS, AI & cloud computing labs, and NSDC-aligned digital upskilling for all GBET diploma and degree batches.",
    aboutHi: "एंटरप्राइज LMS, एआई व क्लाउड कंप्यूटिंग लैब्स और सभी जीबीईटी छात्रों के लिए एनएसडीसी-संबद्ध डिजिटल अपस्किलिंग।",
    photo: "/photos/ai.jpg",
    url: "https://parimanamsolutions.com/",
    badge: "Official Online Partner",
    badgeHi: "आधिकारिक ऑनलाइन पार्टनर",
  },
  {
    name: "Apollo",
    sector: "Hospitals" as const,
    sectorHi: "अस्पताल",
    role: "Clinical Rotations & Pharmacy Counters",
    roleHi: "क्लिनिकल रोटेशन व फार्मेसी काउंटर",
    about: "Multi-speciality hospital postings, patient dispensing logs, and priority placement drives for D.Pharm and paramedical graduates.",
    aboutHi: "मल्टी-स्पेशियलिटी अस्पताल पोस्टिंग, पेशेंट डिस्पेंसिंग लॉग और डी.फार्म व पैरामेडिकल छात्रों के लिए प्राथमिकता प्लेसमेंट ड्राइव।",
    photo: "/photos/medical.jpg",
    badge: "Healthcare Network",
    badgeHi: "हेल्थकेयर नेटवर्क",
  },
  {
    name: "Fortis",
    sector: "Hospitals" as const,
    sectorHi: "अस्पताल",
    role: "OT Simulation & Diagnostic Training",
    roleHi: "ओटी सिमुलेशन व डायग्नोस्टिक ट्रेनिंग",
    about: "Operation theatre discipline, critical care assistance, and diagnostic laboratory training matching hospital floor standards.",
    aboutHi: "ऑपरेशन थिएटर अनुशासन, क्रिटिकल केयर सहायता और अस्पताल मानकों के अनुरूप डायग्नोस्टिक लैब प्रशिक्षण।",
    photo: "/photos/surgery.jpg",
    badge: "Super Speciality",
    badgeHi: "सुपर स्पेशियलिटी",
  },
  {
    name: "Medanta",
    sector: "Hospitals" as const,
    sectorHi: "अस्पताल",
    role: "Advanced Imaging & Patient Services",
    roleHi: "एडवांस्ड इमेजिंग व पेशेंट सर्विसेज",
    about: "Radiology, clinical pathology assistance, and patient ward management rotations for allied health professionals.",
    aboutHi: "रेडियोलॉजी, क्लिनिकल पैथोलॉजी सहायता और अलाइड हेल्थ प्रोफेशनल्स के लिए पेशेंट वार्ड मैनेजमेंट रोटेशन।",
    photo: "/photos/xray.jpg",
    badge: "Advanced Care Partner",
    badgeHi: "एडवांस्ड केयर पार्टनर",
  },
  {
    name: "Max Healthcare",
    sector: "Hospitals" as const,
    sectorHi: "अस्पताल",
    role: "Nursing & Emergency Desk Practice",
    roleHi: "नर्सिंग व इमरजेंसी डेस्क अभ्यास",
    about: "In-patient nursing support, clinical triage, and hospital pharmacy inventory management across Delhi-NCR network hospitals.",
    aboutHi: "इन-पेशेंट नर्सिंग सहायता, क्लिनिकल ट्रायज और दिल्ली-एनसीआर अस्पतालों में फार्मेसी इन्वेंटरी प्रबंधन।",
    photo: "/photos/medical.jpg",
    badge: "Hospital Network",
    badgeHi: "हॉस्पिटल नेटवर्क",
  },
  {
    name: "TCS",
    sector: "IT" as const,
    sectorHi: "आईटी",
    role: "Support Automation & IT Operations",
    roleHi: "सपोर्ट ऑटोमेशन व आईटी ऑपरेशन्स",
    about: "Digital infrastructure support, customer operations, and junior technology analyst hiring through campus recruitment drives.",
    aboutHi: "डिजिटल इंफ्रास्ट्रक्चर सपोर्ट, कस्टमर ऑपरेशन्स और कैंपस ड्राइव के माध्यम से जूनियर एनालिस्ट हायरिंग।",
    photo: "/photos/computer.jpg",
    badge: "Tech Giant",
    badgeHi: "आईटी लीडर",
  },
  {
    name: "Wipro",
    sector: "IT" as const,
    sectorHi: "आईटी",
    role: "Process Engineering & Cloud Services",
    roleHi: "प्रोसेस इंजीनियरिंग व क्लाउड सर्विसेज",
    about: "Enterprise process workflows, IT support desks, and internship pathways aligned to AI and business computing students.",
    aboutHi: "एंटरप्राइज प्रोसेस वर्कफ़्लो, आईटी सपोर्ट डेस्क और एआई व बिजनेस कंप्यूटिंग छात्रों के लिए इंटर्नशिप पाथवे।",
    photo: "/photos/seminar.jpg",
    badge: "Global IT Services",
    badgeHi: "ग्लोबल आईटी सर्विसेज",
  },
  {
    name: "HCL",
    sector: "IT" as const,
    sectorHi: "आईटी",
    role: "Infrastructure Services & Helpdesk",
    roleHi: "इंफ्रास्ट्रक्चर सर्विसेज व हेल्पडेस्क",
    about: "Campus tech drives for hardware-networking, IT helpdesk management, and enterprise technical support roles.",
    aboutHi: "हार्डवेयर-नेटवर्किंग, आईटी हेल्पडेस्क प्रबंधन और एंटरप्राइज टेक्निकल सपोर्ट भूमिकाओं के लिए कैंपस ड्राइव।",
    photo: "/photos/robot.jpg",
    badge: "Enterprise Tech",
    badgeHi: "एंटरप्राइज टेक",
  },
  {
    name: "Infosys",
    sector: "IT" as const,
    sectorHi: "आईटी",
    role: "Junior Software & Data Desks",
    roleHi: "जूनियर सॉफ्टवेयर व डेटा डेस्क",
    about: "Structured training foundation, database support, and operations desks for students clearing technical shortlists.",
    aboutHi: "स्ट्रक्चर्ड ट्रेनिंग फाउंडेशन, डेटाबेस सपोर्ट और तकनीकी शॉर्टलिस्ट पास करने वाले छात्रों के लिए ऑपरेशन्स डेस्क।",
    photo: "/photos/data.jpg",
    badge: "IT Leader",
    badgeHi: "आईटी लीडर",
  },
  {
    name: "Deloitte",
    sector: "IT" as const,
    sectorHi: "आईटी",
    role: "Business Analysis & Professional Advisory",
    roleHi: "बिजनेस एनालिसिस व एडवाइजरी",
    about: "Financial analyst desks, business documentation, and audit-support operations for commerce and technology graduates.",
    aboutHi: "कॉमर्स और टेक्नोलॉजी स्नातकों के लिए फाइनेंशियल एनालिस्ट डेस्क, बिजनेस डॉक्यूमेंटेशन व ऑडिट-सपोर्ट।",
    photo: "/photos/chatbot.jpg",
    badge: "Consulting Big 4",
    badgeHi: "कंसल्टिंग बिग 4",
  },
  {
    name: "Accenture",
    sector: "IT" as const,
    sectorHi: "आईटी",
    role: "Operations & Digital Delivery",
    roleHi: "ऑपरेशन्स व डिजिटल डिलीवरी",
    about: "Technology operations, application maintenance, and client service roles for our diploma and degree graduates.",
    aboutHi: "डिप्लोमा और डिग्री स्नातकों के लिए टेक्नोलॉजी ऑपरेशन्स, एप्लीकेशन मेंटेनेंस व क्लाइंट सर्विस भूमिकाएँ।",
    photo: "/photos/chips.jpg",
    badge: "Global Consulting",
    badgeHi: "ग्लोबल कंसल्टिंग",
  },
  {
    name: "Tech Mahindra",
    sector: "IT" as const,
    sectorHi: "आईटी",
    role: "Telecom & Customer Operations",
    roleHi: "टेलीकॉम व कस्टमर ऑपरेशन्स",
    about: "Network support, telecommunications data floors, and junior technical analyst roles from campus placement rosters.",
    aboutHi: "नेटवर्क सपोर्ट, टेलीकॉम डेटा फ्लोर और कैंपस प्लेसमेंट से जूनियर टेक्निकल एनालिस्ट भूमिकाएँ।",
    photo: "/photos/hero-class.jpg",
    badge: "Digital Services",
    badgeHi: "डिजिटल सर्विसेज",
  },
  {
    name: "Cognizant",
    sector: "IT" as const,
    sectorHi: "आईटी",
    role: "Process Automation & Testing",
    roleHi: "प्रोसेस ऑटोमेशन व टेस्टिंग",
    about: "Quality assurance support, operations workflows, and digital transformation desks aligned with modern IT curriculum.",
    aboutHi: "क्वालिटी एश्योरेंस सपोर्ट, प्रोसेस वर्कफ़्लो और आधुनिक आईटी पाठ्यक्रम से जुड़ी डिजिटल ट्रांसफॉर्मेशन डेस्क।",
    photo: "/photos/hero-campus.jpg",
    badge: "Digital Solutions",
    badgeHi: "डिजिटल सॉल्यूशंस",
  },
  {
    name: "IBM",
    sector: "IT" as const,
    sectorHi: "आईटी",
    role: "Cloud Infrastructure & Data Analytics",
    roleHi: "क्लाउड इंफ्रास्ट्रक्चर व डेटा एनालिटिक्स",
    about: "Cognitive solutions practice, cloud platform support, and real-world client scripts for computing diploma holders.",
    aboutHi: "कंप्यूटिंग डिप्लोमा धारकों के लिए कॉग्निटिव सॉल्यूशंस प्रैक्टिस, क्लाउड प्लेटफॉर्म सपोर्ट और डेटा एनालिटिक्स।",
    photo: "/photos/chips.jpg",
    badge: "Technology Pioneer",
    badgeHi: "टेक्नोलॉजी पायनियर",
  },
  {
    name: "Cipla",
    sector: "Pharmacy" as const,
    sectorHi: "फार्मेसी",
    role: "Formulation QA & Retail Pharmacy",
    roleHi: "फॉर्मूलेशन QA व रिटेल फार्मेसी",
    about: "Drug dispensing logs, retail pharmacy management, and formulation quality control on an integrated hiring calendar.",
    aboutHi: "ड्रग डिस्पेंसिंग लॉग, रिटेल फार्मेसी प्रबंधन और फॉर्मूलेशन क्वालिटी कंट्रोल — एक एकीकृत हायरिंग कैलेंडर पर।",
    photo: "/photos/pharmacy.jpg",
    badge: "Pharma Major",
    badgeHi: "फार्मा प्रमुख",
  },
  {
    name: "Sun Pharma",
    sector: "Pharmacy" as const,
    sectorHi: "फार्मेसी",
    role: "Manufacturing Support & Lab Testing",
    roleHi: "मैन्युफैक्चरिंग सपोर्ट व लैब टेस्टिंग",
    about: "Pharmaceutical production lines, cleanroom protocols, and analytical chemistry support for D.Pharm students.",
    aboutHi: "डी.फार्म छात्रों के लिए फार्मास्युटिकल प्रोडक्शन लाइन, क्लीनरूम प्रोटोकॉल और एनालिटिकल केमिस्ट्री सपोर्ट।",
    photo: "/photos/pharmacy.jpg",
    badge: "Global Pharma",
    badgeHi: "ग्लोबल फार्मा",
  },
  {
    name: "Dr Reddy's",
    sector: "Pharmacy" as const,
    sectorHi: "फार्मेसी",
    role: "Packaging & Regulatory Documentation",
    roleHi: "पैकेजिंग व रेगुलेटरी डॉक्यूमेंटेशन",
    about: "Good Manufacturing Practices (GMP), medication packaging oversight, and compliance documentation desks.",
    aboutHi: "गुड मैन्युफैक्चरिंग प्रैक्टिसेज (GMP), मेडिकेशन पैकेजिंग और अनुपालन दस्तावेज डेस्क।",
    photo: "/photos/pharmacy.jpg",
    badge: "Research & Healthcare",
    badgeHi: "रिसर्च व हेल्थकेयर",
  },
  {
    name: "Lupin",
    sector: "Pharmacy" as const,
    sectorHi: "फार्मेसी",
    role: "Quality Control & Formulation Desks",
    roleHi: "क्वालिटी कंट्रोल व फॉर्मूलेशन डेस्क",
    about: "Active pharmaceutical ingredient handling, dosage quality checks, and production floor briefings for diploma cohorts.",
    aboutHi: "डिप्लोमा बैचों के लिए एपीआई हैंडलिंग, खुराक गुणवत्ता जांच और प्रोडक्शन फ्लोर ब्रीफिंग।",
    photo: "/photos/pharmacy.jpg",
    badge: "Pharma Network",
    badgeHi: "फार्मा नेटवर्क",
  },
  {
    name: "HDFC Bank",
    sector: "Corporate" as const,
    sectorHi: "कॉर्पोरेट",
    role: "Branch Operations & Financial Services",
    roleHi: "ब्रांच ऑपरेशन्स व वित्तीय सेवाएँ",
    about: "Retail banking desks, client relationship operations, and documentation workflows for business graduates.",
    aboutHi: "बिजनेस स्नातकों के लिए रिटेल बैंकिंग डेस्क, क्लाइंट रिलेशनशिप ऑपरेशन्स और वित्तीय दस्तावेज वर्कफ़्लो।",
    photo: "/photos/seminar.jpg",
    badge: "Leading Bank",
    badgeHi: "अग्रणी बैंक",
  },
  {
    name: "Kendriya Vidyalaya",
    sector: "Schools" as const,
    sectorHi: "विद्यालय",
    role: "Classroom Teaching Practice & Demo Lessons",
    roleHi: "कक्षा शिक्षण अभ्यास व डेमो लेसन",
    about: "D.El.Ed and education teaching practice — structured classroom postings, lesson planning, and pedagogy mentoring.",
    aboutHi: "डी.एल.एड और शिक्षण अभ्यास — संरचित कक्षा पोस्टिंग, लेसन प्लानिंग और पेडागोजी मेंटरिंग।",
    photo: "/photos/classroom.jpg",
    badge: "Premier School Network",
    badgeHi: "प्रमुख विद्यालय नेटवर्क",
  },
  {
    name: "UP Govt. School",
    sector: "Schools" as const,
    sectorHi: "विद्यालय",
    role: "Primary Education Postings & Curricula",
    roleHi: "प्राथमिक शिक्षा पोस्टिंग व पाठ्यचर्या",
    about: "Government elementary school practical exposure, student engagement techniques, and foundational literacy instruction.",
    aboutHi: "सरकारी प्राथमिक विद्यालयों में व्यावहारिक अनुभव, छात्र सहभागिता तकनीक और मूलभूत साक्षरता शिक्षण।",
    photo: "/photos/education.jpg",
    badge: "State Education",
    badgeHi: "राज्य शिक्षा विभाग",
  },
] as const;

const FILTERS = ["All", "Alliances", "Hospitals", "IT", "Pharmacy", "Schools", "Corporate"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_HI: Record<Filter, string> = {
  All: "सभी",
  Alliances: "रणनीतिक एलायंस",
  Hospitals: "अस्पताल",
  IT: "आईटी",
  Pharmacy: "फार्मेसी",
  Schools: "विद्यालय",
  Corporate: "कॉर्पोरेट",
};

const CAMPUS_TOOLS = [
  { tag: "Productivity & Cloud", en: "Campus licences, productivity suites & IT certification labs", hi: "कैंपस लाइसेंस, प्रोडक्टिविटी सूट और आईटी सर्टिफिकेशन लैब" },
  { tag: "Digital Classroom", en: "Education workspace tools & digital interactive classrooms", hi: "शिक्षा वर्कस्पेस टूल्स और डिजिटल इंटरएक्टिव कक्षाएँ" },
  { tag: "Cloud Infrastructure", en: "Cloud computing laboratories & structured cloud learning modules", hi: "क्लाउड कंप्यूटिंग लैब्स और संरचित क्लाउड लर्निंग मॉड्यूल" },
  { tag: "Networking", en: "Networking hardware simulators & certification prep", hi: "नेटवर्किंग सिम्युलेटर और सर्टिफिकेशन तैयारी" },
  { tag: "Database", en: "Enterprise database engines & SQL data administration labs", hi: "डेटाबेस इंजन और एसक्यूएल डेटा एडमिनिस्ट्रेशन लैब" },
  { tag: "Finance & Accounts", en: "ERP business accounting software desks", hi: "ईआरपी बिजनेस अकाउंटिंग सॉफ्टवेयर डेस्क" },
  { tag: "Creative & Design", en: "Design studios for multimedia & UI diplomas", hi: "मल्टीमीडिया और यूआई डिप्लोमा के लिए डिजाइन स्टूडियो" },
  { tag: "CAD & Drafting", en: "CAD & 3D digital modelling workstations", hi: "कैड और 3D डिजिटल मॉडलिंग वर्कस्टेशन" },
  { tag: "National Skills", en: "National skill-development compliant curricula", hi: "राष्ट्रीय कौशल विकास पाठ्यक्रम के अनुरूप" },
  { tag: "Internships", en: "Verified internship postings with the Career Development Cell", hi: "करियर डेवलपमेंट सेल के साथ सत्यापित इंटर्नशिप पोस्टिंग" },
  { tag: "Process Training", en: "BPO process training & corporate communication coaching", hi: "बीपीओ प्रोसेस ट्रेनिंग और कॉर्पोरेट कम्युनिकेशन कोचिंग" },
  { tag: "Service Desk", en: "Customer experience & enterprise service-desk workshops", hi: "कस्टमर एक्सपीरियंस और सर्विस-डेस्क वर्कशॉप" },
] as const;

const STATS = [
  { value: "100+", label: "Hiring & Placement Partners", labelHi: "हायरिंग व प्लेसमेंट पार्टनर" },
  { value: "1", label: "Strategic LMS Alliance Partner", labelHi: "रणनीतिक ऑनलाइन LMS पार्टनर" },
  { value: "95%", label: "Practical Placement Conversion", labelHi: "प्लेसमेंट व इंटर्नशिप दर" },
  { value: "12+", label: "Campus Technology Enablers", labelHi: "टेक्नोलॉजी व सॉफ्टवेयर प्रदाता" },
];

export function PartnersView() {
  const { locale } = useI18n();
  const hi = locale === "hi";
  const [filter, setFilter] = useState<Filter>("All");

  const list = useMemo(
    () => PARTNERS.filter((p) => filter === "All" || p.sector === filter),
    [filter],
  );
  return (
    <>
      {/* Hero Section */}
      <Reveal as="section" hover={false} amount={0.18} className="relative isolate min-h-[30rem] overflow-hidden bg-cream sm:min-h-[34rem]">
        <Reveal lift={false} className="absolute inset-0">
          <Image
            src="/photos/world-connect.jpg"
            alt={hi ? "एलायंस एवं पार्टनर नेटवर्क" : "Alliance and partner network"}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </Reveal>
        <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/80 to-cream/90" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream/80" aria-hidden />

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <div className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold text-brand">
            <span>{hi ? `सत्र ${SITE.year} · रणनीतिक एलायंस एवं पार्टनर` : `Session ${SITE.year} · Strategic Alliances & Partners`}</span>
          </div>

          <h1 className="mt-6 font-serif text-4xl font-medium tracking-tight text-navy sm:text-6xl">
            {hi ? "एलायंस एवं उद्योग पार्टनर" : "Alliance & Industry Partners"}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
            {hi
              ? "विश्वस्तरीय अस्पतालों, प्रमुख आईटी कंपनियों, प्रतिष्ठित फार्मेसी नेटवर्कों और हमारे विशेष ऑनलाइन LMS पार्टनर (Parimanam Solutions) के साथ मिलकर तैयार की गई एक मजबूत करियर नींव।"
              : "Bridging the campus-to-career journey with premier healthcare networks, technology leaders, pharmaceutical giants, and our dedicated online LMS partner — Parimanam Solutions."}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#online-partner"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand/90 hover:-translate-y-0.5"
            >
              <Laptop className="size-4" />
              {hi ? "ऑनलाइन LMS पार्टनर" : "Online LMS Partner"}
            </a>
            <a
              href="#partners"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white transition hover:bg-navy/90 hover:-translate-y-0.5"
            >
              <Building2 className="size-4" />
              {hi ? "हायरिंग कंपनियाँ" : "Hiring Companies"}
            </a>
            <a
              href="#service-providers"
              className="inline-flex h-12 items-center rounded-full border border-[#eedfd0] bg-white px-6 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
            >
              {hi ? "टेक्नोलॉजी प्रदाता" : "Technology Enablers"}
            </a>
            <a
              href="#collaborate"
              className="inline-flex h-12 items-center rounded-full border border-navy/20 bg-white/70 px-6 text-sm font-semibold text-navy transition hover:bg-white"
            >
              {hi ? "पार्टनर बनें" : "Partner With Us"}
            </a>
          </div>
        </div>
      </Reveal>

      {/* Metrics Bar */}
      <Reveal as="section" hover={false} amount={0.18} className="border-y border-[#eedfd0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:divide-x md:divide-[#eedfd0]">
            {STATS.map((s, idx) => (
              <div key={s.label} className={cn("text-center", idx > 0 && "md:pl-6")}>
                <p className="font-serif text-3xl font-bold tracking-tight text-brand sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium text-stone-600 sm:text-sm">
                  {hi ? s.labelHi : s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* FEATURED ALLIANCE PARTNER SPOTLIGHT: Parimanam Solutions */}
      <Reveal as="section" hover={false} amount={0.18} id="online-partner" className="relative scroll-mt-24 overflow-hidden bg-navy py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-brand/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
                <span>{hi ? FEATURED_ALLIANCE.badgeHi : FEATURED_ALLIANCE.badge}</span>
              </div>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
                {hi ? FEATURED_ALLIANCE.titleHi : FEATURED_ALLIANCE.title}
              </h2>
              <p className="mt-2 text-sm font-medium tracking-wide text-amber-200/90 uppercase">
                {hi ? FEATURED_ALLIANCE.roleHi : FEATURED_ALLIANCE.role}
              </p>
            </div>

            <a
              href={FEATURED_ALLIANCE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand/90 hover:scale-[1.02]"
            >
              <span>{hi ? "परिमाणम पोर्टल पर जाएँ" : "Visit Parimanam LMS Portal"}</span>
              <ExternalLink className="size-4" />
            </a>
          </div>

          <Reveal>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="text-base leading-relaxed text-stone-200 sm:text-lg">
                  {hi ? FEATURED_ALLIANCE.descriptionHi : FEATURED_ALLIANCE.description}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {FEATURED_ALLIANCE.stats.map((item, i) => (
                    <Reveal key={item.label} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                      <p className="font-serif text-2xl font-bold text-amber-300 sm:text-3xl">{item.value}</p>
                      <p className="mt-1 text-[11px] font-medium text-stone-300">
                        {hi ? item.labelHi : item.label}
                      </p>
                    </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Reveal className="lg:col-span-5" delay={0.08}>
              <div className="h-full rounded-2xl border border-amber-300/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
                      {hi ? "आधिकारिक वेबसाइट" : "Official Web Portal"}
                    </p>
                    <p className="text-lg font-bold text-white">parimanamsolutions.com</p>
                  </div>
                  <span className="flex size-3 rounded-full bg-emerald-400 animate-pulse" title="Live Portal" />
                </div>

                <div className="mt-4 space-y-2.5 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-amber-400 shrink-0" />
                    <span>{hi ? "NSDC एवं NCVET डिजिटल अपस्किलिंग मॉडल" : "NSDC & NCVET Digital Upskilling Framework"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
                    <span>{hi ? "आर्टिफिशियल इंटेलिजेंस (AI) व कोडिंग लैब्स" : "Artificial Intelligence (AI) & Coding Labs"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
                    <span>{hi ? "अपाचे स्पार्क, हडूप व क्लाउड कंप्यूटिंग" : "Apache Spark, Hadoop & Cloud Computing Tracks"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
                    <span>{hi ? "एसक्यूएल डेटाबेस व एंटरप्राइज बिजनेस सोल्यूशंस" : "SQL Database & Enterprise SAP Solutions"}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={FEATURED_ALLIANCE.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-navy transition hover:bg-stone-100"
                  >
                    <span>{hi ? "LMS वेबसाइट खोलें" : "Open LMS Website"}</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                  <Link
                    href="/login/student"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-transparent px-5 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    {hi ? "छात्र लॉगिन" : "Student Login"}
                  </Link>
                </div>
              </div>
              </Reveal>
            </div>

            {/* 4 Feature Pillars */}
            <div className="mt-10 grid gap-4 pt-8 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURED_ALLIANCE.features.map((feat, i) => (
                <Reveal key={feat.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition hover:bg-white/[0.06]">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-brand/20 text-brand">
                    <CheckCircle2 className="size-5 text-amber-300" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-white">
                    {hi ? feat.titleHi : feat.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-300">
                    {hi ? feat.descHi : feat.desc}
                  </p>
                </div>
                </Reveal>
              ))}
            </div>
          </div>
          </Reveal>
        </div>
      </Reveal>

      <Reveal as="section" hover={false} amount={0.18} className="border-b border-[#eedfd0] bg-white">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-2">
          <article id="kalpna-traders" className="scroll-mt-28 rounded-2xl border border-[#eedfd0] bg-cream p-6 sm:p-8">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-brand uppercase">
              {hi ? "एलायंस पार्टनर" : "Alliance partner"}
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy">Kalpna Traders</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {hi
                ? "गौतम बुद्ध एजुकेशनल ट्रस्ट का एलायंस पार्टनर।"
                : "Alliance partner of Gautam Buddha Educational Trust."}
            </p>
          </article>
          <article id="mskp-technology" className="scroll-mt-28 rounded-2xl border border-[#eedfd0] bg-cream p-6 sm:p-8">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-brand uppercase">
              {hi ? "एलायंस पार्टनर" : "Alliance partner"}
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy">MSKP Technology</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {hi
                ? "गौतम बुद्ध एजुकेशनल ट्रस्ट का एलायंस पार्टनर।"
                : "Alliance partner of Gautam Buddha Educational Trust."}
            </p>
          </article>
        </div>
      </Reveal>

      {/* Directory Section with Filters */}
      <Reveal as="section" hover={false} amount={0.18} id="partners" className="scroll-mt-24 bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="border-b-2 border-navy pb-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
                  {hi ? "हायरिंग एवं एलायंस निर्देशिका" : "Hiring & Alliance Directory"}
                </p>
                <h2 className="mt-2 font-serif text-3xl text-navy sm:text-4xl">
                  {hi ? "जो संगठन परिसर से जुड़ते हैं" : "Organizations that partner with this campus"}
                </h2>
              </div>
              <p className="max-w-md text-xs leading-5 text-stone-500">
                {hi
                  ? "अस्पताल, बहुराष्ट्रीय आईटी कंपनियां, फार्मास्युटिकल प्लांट्स और ऑनलाइन लर्निंग प्लेटफॉर्म।"
                  : "Clinical hospital wards, multinational IT desks, pharmaceutical plants and digital learning networks."}
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition",
                  filter === f
                    ? "bg-navy text-white shadow-sm"
                    : "border border-[#eedfd0] bg-white text-navy hover:border-brand hover:text-brand",
                )}
              >
                {hi ? FILTER_HI[f] : f}
              </button>
            ))}
          </div>

          {/* Partners Grid */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => {
              return (
                <Reveal key={p.role} delay={(i % 3) * 0.08}>
                <article
                  className={cn(
                    "group flex flex-col overflow-hidden border border-[#eedfd0] bg-white transition hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_16px_32px_rgba(232,92,26,0.12)]",
                    p.sector === "Alliances" && "border-amber-400/60 ring-2 ring-brand/10",
                  )}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <Image
                      src={p.photo}
                      alt={hi ? p.roleHi : p.role}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.05]"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      <span className="rounded-full bg-navy/85 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase">
                        {hi ? p.sectorHi : p.sector}
                      </span>
                      {"badge" in p && p.badge && (
                        <span className="rounded-full bg-brand/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white">
                          {hi ? p.badgeHi : p.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
                    <h3 className="text-base font-semibold text-navy">
                      {hi ? p.roleHi : p.role}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-stone-600 flex-1">
                      {hi ? p.aboutHi : p.about}
                    </p>
                  </div>
                </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Campus Tech Enablers */}
      <Reveal as="section" hover={false} amount={0.18} id="service-providers" className="scroll-mt-24 border-y border-[#eedfd0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="border-b-2 border-navy pb-6 text-center">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "टेक्नोलॉजी व सॉफ्टवेयर प्रदाता" : "Campus Technology Enablers"}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-navy sm:text-4xl">
              {hi ? "सॉफ्टवेयर और टूल्स जो हमारे कैंपस को सशक्त बनाते हैं" : "Software and tools that equip our labs"}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-stone-500 sm:text-sm">
              {hi
                ? "क्लाउड लैब्स, नेटवर्किंग टूल्स, डेटाबेस और सर्टिफिकेशन फ्रेमवर्क जो छात्रों को व्यावहारिक अनुभव देते हैं।"
                : "Cloud infrastructure, simulation software, creative tools and national certification frameworks powering our campus."}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-px bg-[#eedfd0] sm:grid-cols-3 lg:grid-cols-4">
            {CAMPUS_TOOLS.map((tool, i) => (
              <Reveal key={tool.tag} delay={(i % 4) * 0.1}>
              <article className="flex h-full flex-col items-center bg-white px-4 py-6 text-center transition hover:bg-cream/40">
                <h3 className="text-sm font-semibold text-navy">
                  {tool.tag}
                </h3>
                <p className="mt-2.5 text-xs leading-5 text-stone-500">
                  {hi ? tool.hi : tool.en}
                </p>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Why Partner With GBET */}
      <Reveal as="section" hover={false} amount={0.18} className="bg-cream/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              {hi ? "उद्योग मूल्य प्रस्ताव" : "Partner Value Proposition"}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-navy sm:text-4xl">
              {hi ? "कंपनियां GBET के साथ साझेदारी क्यों करती हैं?" : "Why Leading Organizations Partner With GBET"}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-stone-600">
              {hi
                ? "हम केवल डिग्री नहीं देते — बल्कि उद्योगों की वास्तविक जरूरतों के अनुरूप प्रशिक्षित छात्र तैयार करते हैं।"
                : "We do not merely hand out credentials — we cultivate disciplined, practically trained talent ready for day-one productivity."}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal>
            <div className="h-full rounded-2xl border border-[#eedfd0] bg-white p-6 shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Award className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-navy">
                {hi ? "व्यावहारिक लैब अनुभव" : "Hands-On Clinical & Tech Labs"}
              </h3>
              <p className="mt-2 text-xs leading-6 text-stone-600">
                {hi
                  ? "परिसर में मौजूद सिमुलेशन अस्पताल वार्ड, फार्मेसी फॉर्मूलेशन लैब और हाई-स्पीड कोडिंग स्टूडियो।"
                  : "Students train in hospital simulation wards, compounding pharmacy labs, and AI programming desks."}
              </p>
            </div>
            </Reveal>

            <Reveal delay={0.06}>
            <div className="h-full rounded-2xl border border-[#eedfd0] bg-white p-6 shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Laptop className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-navy">
                {hi ? "डिजिटल लर्निंग इकोसिस्टम" : "24/7 Digital LMS Ecosystem"}
              </h3>
              <p className="mt-2 text-xs leading-6 text-stone-600">
                {hi
                  ? "Parimanam Solutions के साथ आधुनिक ई-लर्निंग, कोड लैब और लगातार कौशल मूल्यांकन।"
                  : "Continuous upskilling in AI, Cloud, and Big Data via our dedicated Parimanam LMS alliance."}
              </p>
            </div>
            </Reveal>

            <Reveal delay={0.12}>
            <div className="h-full rounded-2xl border border-[#eedfd0] bg-white p-6 shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Users className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-navy">
                {hi ? "सक्रिय करियर सेल" : "Dedicated Placement Cell"}
              </h3>
              <p className="mt-2 text-xs leading-6 text-stone-600">
                {hi
                  ? "मॉक इंटरव्यू, जीडी राउंड और जीरो-फ्रिक्शन ऑन-कैंपस रिक्रूटमेंट ड्राइव का सुगम संचालन।"
                  : "Full logistical support for campus recruitment drives, pre-placement talks, and candidate screening."}
              </p>
            </div>
            </Reveal>

            <Reveal delay={0.18}>
            <div className="h-full rounded-2xl border border-[#eedfd0] bg-white p-6 shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Building2 className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-navy">
                {hi ? "अनुशासित व प्रतिबद्ध प्रतिभा" : "Industry-Ready Graduates"}
              </h3>
              <p className="mt-2 text-xs leading-6 text-stone-600">
                {hi
                  ? "डिप्लोमा और डिग्री धारक जो पहले दिन से ही अस्पताल वार्ड, आईटी सपोर्ट व कॉर्पोरेट फ्लोर पर योगदान देते हैं।"
                  : "Graduates equipped with domain rigor, work ethics, and verifiable practical training."}
              </p>
            </div>
            </Reveal>
          </div>
        </div>
      </Reveal>

      {/* PARTNER WITH US / COLLABORATE SECTION */}
      <Reveal as="section" hover={false} amount={0.18} id="collaborate" className="scroll-mt-24 border-t border-[#eedfd0] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
          <div className="rounded-3xl border border-[#eedfd0] bg-gradient-to-br from-cream via-white to-cream p-8 sm:p-12 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <p className="text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
                  {hi ? "कॉर्पोरेट व संस्थागत साझेदारी" : "Corporate & Institutional Collaboration"}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-medium text-navy sm:text-4xl">
                  {hi ? "क्या आपका संगठन GBET के साथ जुड़ना चाहता है?" : "Interested in partnering or recruiting from GBET?"}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                  {hi
                    ? "हम अस्पतालों, आईटी कंपनियों, एडटेक इनोवेटर्स और शोध संस्थानों के साथ एमओयू (MOU), इंटर्नशिप टाई-अप और कैंपस प्लेसमेंट ड्राइव का स्वागत करते हैं। हमारे प्लेसमेंट और एलायंस सेल से सीधे संपर्क करें।"
                    : "We welcome MOUs, internship agreements, curriculum partnerships, and on-campus recruitment drives with hospitals, IT corporations, and educational innovators. Connect directly with our Alliance & Placement Cell."}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-navy sm:text-sm">
                  <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-2 font-semibold hover:text-brand">
                    <Phone className="size-4 text-brand" />
                    <span>{SITE.phone}</span>
                  </a>
                  <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 font-semibold hover:text-brand">
                    <Mail className="size-4 text-brand" />
                    <span>{SITE.email}</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                <Link
                  href="/contact"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:bg-brand/90 sm:w-auto"
                >
                  <span>{hi ? "साझेदारी का प्रस्ताव भेजें" : "Submit Partnership Enquiry"}</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/placements"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-navy/20 bg-white px-7 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand sm:w-auto"
                >
                  {hi ? "प्लेसमेंट विवरण देखें" : "View Placement Statistics"}
                </Link>
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </Reveal>

      {/* Bottom CTA */}
      <Reveal as="section" hover={false} amount={0.18} className="bg-cream/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-serif text-2xl text-navy sm:text-3xl">
              {hi ? "अगली भूमिका इन्हीं प्रतिष्ठित डेस्क पर हो सकती है।" : "Your first career role can be at one of these desks."}
            </p>
            <p className="mt-2 text-xs text-stone-600 sm:text-sm">
              {hi ? "सत्र 2027 के लिए डिप्लोमा एवं डिग्री प्रवेश प्रक्रिया जारी है।" : "Admissions open for Session 2027 across Pharmacy, AI, Education & Paramedical."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-white hover:bg-navy/90"
            >
              {hi ? "अभी आवेदन करें" : "Apply Now"}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex h-12 items-center rounded-full border border-[#eedfd0] bg-white px-7 text-sm font-semibold text-navy hover:border-brand hover:text-brand"
            >
              {hi ? "पाठ्यक्रम देखें" : "Explore Courses"}
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
