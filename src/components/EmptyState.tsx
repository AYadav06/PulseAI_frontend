import { Code2, PenLine, Network } from "lucide-react";

interface EmptyStateProps {
  onPrompt: (prompt: string) => void;
}

const FEATURES = [
  {
    icon: Code2,
    title: "Explain code snippets",
    prompt: "Explain what this code snippet does and how I could improve it:",
  },
  {
    icon: PenLine,
    title: "Draft content blocks",
    prompt: "Draft a compelling landing-page hero section for a developer tool.",
  },
  {
    icon: Network,
    title: "Brainstorm systems design architectures",
    prompt:
      "Brainstorm a scalable systems design architecture for a real-time chat app.",
  },
];

export function EmptyState({ onPrompt }: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 pb-24">
      <h1 className="text-3xl font-semibold tracking-tight">
        Hello, I'm{" "}
        <span className="bg-linear-to-r from-blue-600 via-white to-blue-500 bg-clip-text text-transparent">
          Pulse
        </span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your real-time streaming AI assistant. How can I help today?
      </p>

      <div className="mt-10 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
        {FEATURES.map((feature) => (
          <button
            key={feature.title}
            onClick={() => onPrompt(feature.prompt)}
            className="group rounded-2xl border border-border bg-card p-4 text-left transition-all duration-200 hover:scale-[1.01] hover:border-primary/40"
          >
            <feature.icon className="h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
            <p className="mt-3 text-sm font-medium tracking-tight">
              {feature.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

