# Workly AI — Workplace Productivity Assistant

A modern, responsive web application that helps professionals automate workplace tasks using AI. Built as a clean SaaS-style dashboard with sidebar navigation and five powerful AI-powered tools.

## Features

- **Smart Email Generator** — Compose professional emails with AI. Just describe what you need, and get a polished email with subject line and body.
- **Meeting Notes Summarizer** — Paste raw notes or a transcript and get a structured summary with key decisions, action items, and open questions.
- **AI Task Planner** — Enter a goal and receive a prioritized, actionable task plan with effort estimates and priorities.
- **AI Research Assistant** — Request a briefing on any topic and get a structured overview with key points, trade-offs, and next steps.
- **AI Chatbot Interface** — A real-time conversational assistant for any workplace productivity question.

## Tech Stack

- **Framework:** TanStack Start (React 19, file-based routing, SSR/SSG)
- **Styling:** Tailwind CSS v4 with custom design tokens
- **UI Components:** shadcn/ui (sidebar, cards, buttons, toasts, etc.)
- **Package Manager:** Bun
- **Build Tool:** Vite 7
- **AI:** Lovable AI Gateway (Google Gemini 3 Flash)

## Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- A Lovable API key (required for AI features)

## Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Set up environment variables

Create a `.env` file in the project root with your Lovable API key:

```bash
LOVABLE_API_KEY=your_lovable_api_key_here
```

You can get your API key from your Lovable workspace settings.

### 3. Start the development server

```bash
bun dev
```

The app will be available at `http://localhost:3000`.

### 4. Build for production

```bash
bun run build
```

To preview the production build locally:

```bash
bun run preview
```

## Project Structure

```
src/
  components/
    app-sidebar.tsx       # Sidebar navigation with tool links
    tool-shell.tsx        # Reusable AI tool layout (input, output, copy)
    chat.tsx              # Real-time chatbot interface
    ui/                   # shadcn/ui components
  lib/
    ai.functions.ts       # Server function for AI calls (all 5 modes)
  routes/
    __root.tsx            # Root layout (sidebar, header, providers)
    index.tsx             # Dashboard homepage
    email.tsx             # Smart Email Generator
    meetings.tsx          # Meeting Notes Summarizer
    planner.tsx           # AI Task Planner
    research.tsx          # AI Research Assistant
    chat.tsx              # AI Chatbot Interface
  styles.css              # Tailwind CSS + custom design tokens
  router.tsx              # TanStack Router setup
  start.ts                # TanStack Start configuration
```

## How It Works

All AI features are powered by a single server function (`src/lib/ai.functions.ts`) that communicates with the Lovable AI Gateway. Each tool uses a tailored system prompt to shape the AI's output:

- **Email mode** — Produces emails with a subject line and professional body.
- **Meeting mode** — Structures notes into summary, decisions, action items, and open questions.
- **Planner mode** — Breaks goals into numbered tasks with effort and priority.
- **Research mode** — Delivers briefings with overview, key points, trade-offs, and next steps.
- **Chat mode** — General-purpose conversational assistance.

All AI outputs are editable directly in the UI, and every tool includes a one-click copy button.

## Important Notes

- **Bun is required** — This project uses `bunfig.toml` and Bun-specific features. Using npm or yarn may cause issues.
- **AI requires a key** — Without `LOVABLE_API_KEY`, the UI will still render, but AI generation will show a "not configured" error.
- **No .env file in the repo** — The project does not include a `.env` file. You must create one locally.

## Responsible AI

This application includes a responsible AI disclaimer: AI-generated content should be reviewed before use in professional settings. Outputs are editable so you can refine them before sending or sharing.

## License

Private — built for personal or internal use.
