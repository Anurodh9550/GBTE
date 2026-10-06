"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/components/providers/language-provider";
import { COURSES } from "@/lib/courses";
import { whatsappLink } from "@/lib/whatsapp";

const STORAGE_KEY = "gbte-counselling-dismissed";

export function CounsellingPopup() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState(COURSES[0].name);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY)) return;
    const timer = window.setTimeout(() => setOpen(true), 20000);
    return () => window.clearTimeout(timer);
  }, []);

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (!next) window.localStorage.setItem(STORAGE_KEY, "1");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/counselling", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, course }),
    });
    if (!res.ok) {
      toast.error("Please check the details and try again.");
      return;
    }
    toast.success(t.enquiry.success);
    onOpenChange(false);
    window.open(
      whatsappLink(`Hi GBTE, I am ${name}. Phone: ${phone}. Course: ${course}. Please book free career guidance.`),
      "_blank"
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.popup.title}</DialogTitle>
          <DialogDescription>{t.popup.body}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="popup-name">{t.popup.name}</Label>
            <Input id="popup-name" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="popup-phone">{t.popup.phone}</Label>
            <Input
              id="popup-phone"
              required
              inputMode="numeric"
              pattern="[6-9][0-9]{9}"
              title="Enter a 10-digit Indian mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="popup-course">{t.popup.course}</Label>
            <select
              id="popup-course"
              className="h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              {COURSES.map((item) => (
                <option key={item.slug} value={item.name}>
                  {locale === "hi" ? item.nameHi : item.name}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="h-11">{t.popup.cta}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
