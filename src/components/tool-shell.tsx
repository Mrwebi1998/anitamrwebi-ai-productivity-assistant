import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Sparkles, Copy, Check, AlertTriangle } from "lucide-react";

import { runAi } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

type Mode = "email" | "meeting" | "planner" | "research";

interface ToolShellProps {
  mode: Mode;
  title: string;
  description: string;
  icon: ReactNode;
  inputLabel: string;
  placeholder: string;
  examples?: string[];
}

export function ToolShell({
  mode,
  title,
  description,
  icon,
  inputLabel,
  placeholder,
  examples = [],
}: ToolShellProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const callAi = useServerFn(runAi);
  const mutation = useMutation({
    mutationFn: (prompt: string) =>
      callAi({ data: { mode, messages: [{ role: "user", content: prompt }] } }),
    onSuccess: (data) => setOutput(data.content),
    onError: (err: Error) => toast.error(err.message),
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6 md:p-10">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">{description}</p>
        </div>
      </div>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-base">{inputLabel}</CardTitle>
          {examples.length > 0 && (
            <CardDescription>
              <div className="mt-2 flex flex-wrap gap-2">
                {examples.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setInput(ex)}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:bg-accent hover:text-accent-foreground"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="min-h-40 resize-y"
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">{input.length} chars</p>
            <Button
              onClick={() => mutation.mutate(input)}
              disabled={!input.trim() || mutation.isPending}
              className="gap-2"
            >
              {mutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {mutation.isPending ? "Generating..." : "Generate"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {(output || mutation.isPending) && (
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">AI Output</CardTitle>
              <CardDescription>Editable — refine before using.</CardDescription>
            </div>
            {output && (
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {mutation.isPending && !output ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
              </div>
            ) : (
              <Textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                className="min-h-64 resize-y font-mono text-sm"
              />
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          AI-generated content may be inaccurate or biased. Always review and verify before sharing
          or acting on it. Do not paste sensitive personal data.
        </p>
      </div>
    </div>
  );
}
