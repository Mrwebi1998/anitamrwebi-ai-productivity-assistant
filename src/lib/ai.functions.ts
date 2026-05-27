import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

const SYSTEM_PROMPTS: Record<string, string> = {
  email:
    "You are a professional email writing assistant. Produce a clear, well-structured email based on the user's request. Use a subject line on the first line prefixed with 'Subject:' then a blank line, then the body. Keep tone professional unless otherwise specified. Output only the email — no commentary.",
  meeting:
    "You are a meeting notes summarizer. Given raw notes or a transcript, produce: 1) a concise 3-5 sentence summary, 2) Key Decisions (bulleted), 3) Action Items (bulleted with owner if mentioned), 4) Open Questions. Use markdown headings.",
  planner:
    "You are a task planning assistant. Break the user's goal into a prioritized, actionable plan. Output a numbered list of tasks. For each task include: title, brief description, estimated effort (S/M/L), and priority (High/Med/Low). Use markdown.",
  research:
    "You are a research assistant. Provide a structured briefing on the requested topic with: Overview, Key Points (bulleted), Considerations / Trade-offs, and Suggested Next Steps. Be factual and concise. Note any uncertainty explicitly.",
  chat:
    "You are a helpful AI workplace productivity assistant. Be concise, professional, and practical. Use markdown when helpful.",
};

export const runAi = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      mode: z.enum(["email", "meeting", "planner", "research", "chat"]),
      messages: z
        .array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string().min(1).max(20000),
          }),
        )
        .min(1)
        .max(50),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const res = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[data.mode] },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      if (res.status === 429)
        throw new Error("Rate limit reached. Please try again in a moment.");
      if (res.status === 402)
        throw new Error(
          "AI credits exhausted. Add credits in Settings → Workspace → Usage.",
        );
      const text = await res.text();
      throw new Error(`AI request failed (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = await res.json();
    const content: string =
      json?.choices?.[0]?.message?.content ?? "";
    return { content };
  });
