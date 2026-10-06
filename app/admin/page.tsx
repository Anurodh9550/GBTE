"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PortalLogin } from "@/components/portals/portal-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const LEADS = [
  { name: "Riya Malhotra", course: "D Pharma", city: "Noida", status: "New" },
  { name: "Amit Yadav", course: "DMLT", city: "Lucknow", status: "Counselling" },
  { name: "Sana Khan", course: "D.El.Ed", city: "Kanpur", status: "Documents" },
];

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [note, setNote] = useState("Admissions Open 2027 — hostel allotment this week.");

  useEffect(() => {
    setAuthed(sessionStorage.getItem("gbte-admin") === "1");
  }, []);

  function sendNotification(e: FormEvent) {
    e.preventDefault();
    toast.success("Notification queued to student and faculty apps.");
  }

  if (!authed) {
    return (
      <div className="px-4 py-12">
        <h1 className="text-center text-3xl font-bold text-navy">Admin panel</h1>
        <PortalLogin role="admin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-navy">Admin panel</h1>
        <Button
          variant="outline"
          onClick={() => {
            sessionStorage.removeItem("gbte-admin");
            router.refresh();
            setAuthed(false);
          }}
        >
          Sign out
        </Button>
      </div>
      <h2 className="mt-8 font-semibold">CRM-ready enquiries</h2>
      <table className="mt-3 w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2">Name</th>
            <th>Course</th>
            <th>City</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {LEADS.map((l) => (
            <tr key={l.name} className="border-b">
              <td className="py-2">{l.name}</td>
              <td>{l.course}</td>
              <td>{l.city}</td>
              <td>{l.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={sendNotification} className="mt-8 grid gap-3">
        <h2 className="font-semibold">Notification system</h2>
        <Input value={note} onChange={(e) => setNote(e.target.value)} />
        <Button type="submit" className="h-11 w-fit">Broadcast</Button>
      </form>
    </div>
  );
}
