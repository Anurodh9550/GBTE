"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ACCOUNTS = {
  student: { email: "student@gbte.in", password: "student123", href: "/student/dashboard" },
  faculty: { email: "faculty@gbte.in", password: "faculty123", href: "/faculty/dashboard" },
  admin: { email: "admin@gbte.in", password: "admin123", href: "/admin" },
} as const;

export function PortalLogin({ role }: { role: keyof typeof ACCOUNTS }) {
  const account = ACCOUNTS[role];
  const router = useRouter();
  const [email, setEmail] = useState<string>(account.email);
  const [password, setPassword] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (email === account.email && password === account.password) {
      sessionStorage.setItem(`gbte-${role}`, "1");
      router.push(account.href);
      return;
    }
    toast.error("Use the demo credentials shown below.");
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-10 grid max-w-md gap-4 rounded-2xl border p-6">
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" />
      </div>
      <Button type="submit" className="h-11">Sign in</Button>
      <p className="text-xs text-slate-500">Demo: {account.email} / {account.password}</p>
    </form>
  );
}
