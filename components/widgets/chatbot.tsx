"use client";

import { FormEvent, useMemo, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/components/providers/language-provider";
import { CHATBOT_KB } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

type Msg = { from: "bot" | "user"; text: string };

export function AdmissionChatbot() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const greet = t.chat.greet;
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: greet }]);

  const fallback = useMemo(
    () =>
      locale === "hi"
        ? "मैं प्रवेश सहायक हूँ। प्रवेश, शुल्क, छात्रावास या पाठ्यक्रम पूछें — या व्हाट्सएप पर काउंसलर से बात करें।"
        : "I am the GBTE admission assistant. Ask about admissions, fees, hostels or courses — or chat with a counsellor on WhatsApp.",
    [locale]
  );

  function reply(q: string) {
    const needle = q.toLowerCase();
    const hit = CHATBOT_KB.find((item) => item.keys.some((k) => needle.includes(k)));
    if (hit) return locale === "hi" ? hit.answerHi : hit.answer;
    return fallback;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setMessages((m) => [...m, { from: "user", text: q }, { from: "bot", text: reply(q) }]);
    setInput("");
  }

  return (
    <div className="fixed right-4 bottom-20 z-40">
      {open ? (
        <div className="mb-3 flex h-[min(28rem,70vh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-brand px-3 py-2.5 text-white">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Bot className="size-4 text-white" aria-hidden />
              {t.chat.title}
            </p>
            <button type="button" onClick={() => setOpen(false)} className="rounded-md p-1 hover:bg-white/10" aria-label="Close chatbot">
              <X className="size-4" />
            </button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
            {messages.map((m, i) => (
              <p
                key={`${m.from}-${i}`}
                className={
                  m.from === "bot"
                    ? "max-w-[90%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-navy"
                    : "ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-brand px-3 py-2 text-white"
                }
              >
                {m.text}
              </p>
            ))}
          </div>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 text-xs font-medium text-brand hover:underline"
          >
            {t.whatsapp}
          </a>
          <form onSubmit={onSubmit} className="flex gap-2 p-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chat.placeholder}
              aria-label={t.chat.placeholder}
            />
            <Button type="submit" size="icon" aria-label="Send">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      ) : null}
      <Button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-12 rounded-full bg-brand px-4 text-white shadow-lg hover:bg-brand/90"
        aria-expanded={open}
        aria-controls="gbte-chatbot"
      >
        <Bot className="size-4" />
        {t.chat.title}
      </Button>
    </div>
  );
}
