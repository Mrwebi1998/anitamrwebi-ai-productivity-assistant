import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";

export const Route = createFileRoute("/meetings")({
  head: () => ({ meta: [{ title: "Meeting Summarizer — Workly AI" }] }),
  component: () => (
    <ToolShell
      mode="meeting"
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript — get summary, decisions, and action items."
      icon={<FileText className="h-6 w-6" />}
      inputLabel="Paste your meeting notes or transcript"
      placeholder="Paste meeting notes here..."
    />
  ),
});
