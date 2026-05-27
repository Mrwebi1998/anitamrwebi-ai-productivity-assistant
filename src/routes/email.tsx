import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — Workly AI" }] }),
  component: () => (
    <ToolShell
      mode="email"
      title="Smart Email Generator"
      description="Describe what you need to say — get a polished email draft."
      icon={<Mail className="h-6 w-6" />}
      inputLabel="What's the email about?"
      placeholder="e.g. Follow up with a client about the Q3 proposal, friendly but professional tone, mention next steps and a meeting next week."
      examples={[
        "Decline a meeting politely",
        "Follow up on an unpaid invoice",
        "Introduce myself to a new team",
      ]}
    />
  ),
});
