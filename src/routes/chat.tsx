import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, MessageSquare, AlertTriangle } from "lucide-react";

import { runAi } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Chatbot — Workly AI" }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const callAi = useServerFn(runAi);

  const mutation = useMutation({
    mutationFn: (history: Msg[]) =>
      callAi({ data: { mode: "chat", messages: history } }),
    onSuccess: (data) =>
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]),
    onError: (err: Error) => toast.error(err.message),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, mutation.isPending]);

  const send = () => {
    const text = input.trim();
    if (!text || mutation.isPending) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    mutation.mutate(next);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] w-full max-w-4xl flex-col p-4 md:p-6">
      <div className="flex items-center gap-3 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">AI Chatbot</h1>
          <p className="text-sm text-muted-foreground">
            Conversational assistant for quick questions and ideas.
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <MessageSquare className="mb-3 h-10 w-10 opacity-40" />
            <p className="text-sm">Start a conversation — ask anything productivity-related.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-[image:var(--gradient-primary)] text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {mutation.isPending && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask anything... (Shift+Enter for newline)"
            className="min-h-12 max-h-40 resize-none"
          />
          <Button onClick={send} disabled={!input.trim() || mutation.isPending} size="lg" className="gap-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <AlertTriangle className="h-3 w-3" />
          AI responses may be inaccurate. Verify important information.
        </div>
      </div>
    </div>
  );
}
