import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — Workly AI" }] }),
  component: () => (
    <ToolShell
      mode="research"
      title="AI Research Assistant"
      description="Get a structured briefing on any topic — overview, key points, trade-offs."
      icon={<Search className="h-6 w-6" />}
      inputLabel="What topic should I research?"
      placeholder="e.g. Compare leading customer support platforms for a 50-person startup."
      examples={[
        "Best practices for remote onboarding",
        "Overview of OKR frameworks",
        "Trends in enterprise AI 2025",
      ]}
    />
  ),
});
