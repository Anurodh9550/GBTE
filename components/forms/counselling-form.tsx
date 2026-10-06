"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COURSES } from "@/lib/courses";
import { useI18n } from "@/components/providers/language-provider";
import { whatsappLink } from "@/lib/whatsapp";

export function CounsellingForm() {
  const { t, locale } = useI18n();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState(COURSES[0].name);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/counselling", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, course }),
    });
    if (!res.ok) {
      toast.error("Please enter a valid name and 10-digit mobile.");
      return;
    }
    toast.success(t.enquiry.success);
    window.open(whatsappLink(`Hi GBTE, I am ${name}. Phone: ${phone}. Course: ${course}. Book free career guidance.`), "_blank");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border bg-white p-6">
      <div className="grid gap-1.5">
        <Label htmlFor="c-name">{t.popup.name}</Label>
        <Input id="c-name" required value={name} onChange={(e) => setName(e.target.value)} className="h-11" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="c-phone">{t.popup.phone}</Label>
        <Input id="c-phone" required pattern="[6-9][0-9]{9}" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="c-course">{t.popup.course}</Label>
        <select id="c-course" className="h-11 rounded-lg border px-2.5 text-sm" value={course} onChange={(e) => setCourse(e.target.value)}>
          {COURSES.map((c) => (
            <option key={c.slug} value={c.name}>{locale === "hi" ? c.nameHi : c.name}</option>
          ))}
        </select>
      </div>
      <Button type="submit" className="h-12">{t.popup.cta}</Button>
    </form>
  );
}
