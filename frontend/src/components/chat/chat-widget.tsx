"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { apiPost } from "@/lib/api";
import type { ChatMessage } from "@/lib/types";
import { Button } from "@/components/ui/button";

const SUGGESTIONS = [
  "What services do you offer?",
  "How much does a redesign cost?",
  "Book a consultation",
];

let idSeq = 0;
const nextId = () => `m${++idSeq}`;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nextId(),
      role: "assistant",
      content:
        "Hi! I'm Vision Digital Labs' assistant 👋 Ask me about services, pricing, or book a free consultation.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;
    const userMsg: ChatMessage = { id: nextId(), role: "user", content };
    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setPending(true);
    try {
      const res = await apiPost<{ reply: string }>("/chat/message", {
        message: content,
        history,
      });
      setMessages((m) => [
        ...m,
        { id: nextId(), role: "assistant", content: res.reply },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: nextId(),
          role: "assistant",
          content:
            "I had trouble responding just now. You can reach us at hello@visiondigitallab.com.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Open chat assistant"
          className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-2 text-[#04121a] shadow-[0_10px_40px_-8px_rgba(0,217,255,0.7)]"
        >
          {open ? <X className="size-6" /> : <Bot className="size-6" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-40 flex h-[30rem] w-[calc(100%-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border-strong bg-bg-2 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
              <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-[#04121a]">
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-fg">Vision Assistant</p>
                <p className="text-xs text-fg-subtle">Typically replies instantly</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-gradient-to-r from-primary to-primary-2 text-[#04121a]"
                        : "rounded-bl-sm border border-border bg-white/[0.03] text-fg-muted"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {pending && (
                <div className="flex gap-1 pl-2 text-fg-subtle">
                  <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
                  <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" />
                  <span className="size-2 animate-bounce rounded-full bg-primary" />
                </div>
              )}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border-strong px-3 py-1.5 text-xs text-fg-muted transition-colors hover:border-primary/50 hover:text-fg"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 rounded-full border border-border-strong bg-white/[0.02] px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-primary/60 focus:outline-none"
              />
              <Button type="submit" size="icon" disabled={pending}>
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
