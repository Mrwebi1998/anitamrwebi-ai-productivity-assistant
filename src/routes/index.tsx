import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workly AI" },
      {
        name: "description",
        content:
          "Your AI workplace productivity hub: emails, meeting notes, planning, research, and chat.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    title: "Smart Email Generator",
    description: "Draft polished, on-tone emails in seconds.",
    href: "/email",
    icon: Mail,
  },
  {
    title: "Meeting Notes Summarizer",
    description: "Turn raw notes into summaries and action items.",
    href: "/meetings",
    icon: FileText,
  },
  {
    title: "AI Task Planner",
    description: "Break goals into prioritized, actionable plans.",
    href: "/planner",
    icon: ListChecks,
  },
  {
    title: "AI Research Assistant",
    description: "Get structured briefings on any topic.",
    href: "/research",
    icon: Search,
  },
  {
    title: "AI Chatbot",
    description: "Conversational assistant for everything else.",
    href: "/chat",
    icon: MessageSquare,
  },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 p-6 md:p-10">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-[image:var(--gradient-subtle)] p-8 md:p-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[image:var(--gradient-primary)] opacity-20 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI-powered productivity
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Anita Mrwebi
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            A unified AI workspace for emails, meetings, planning, and research — designed for
            modern professionals.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Your toolkit
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.href} to={tool.href} className="group">
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition group-hover:bg-[image:var(--gradient-primary)] group-hover:text-primary-foreground">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="flex items-center justify-between text-base">
                    {tool.title}
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Responsible AI</p>
        <p className="mt-1">
          Workly AI uses large language models that can produce inaccurate, biased, or outdated
          information. Always review and edit AI outputs before sharing or acting on them. Avoid
          submitting confidential or personal data you don't have permission to process.
        </p>
      </section>
    </div>
  );
}
