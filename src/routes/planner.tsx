import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "AI Task Planner — Workly AI" }] }),
  component: () => (
    <ToolShell
      mode="planner"
      title="AI Task Planner"
      description="Describe a goal — get a prioritized, actionable plan."
      icon={<ListChecks className="h-6 w-6" />}
      inputLabel="What do you want to accomplish?"
      placeholder="e.g. Launch a marketing campaign for our new product in 4 weeks."
      examples={[
        "Plan a product launch",
        "Onboard a new hire in week one",
        "Prepare for a quarterly review",
      ]}
    />
  ),
});
