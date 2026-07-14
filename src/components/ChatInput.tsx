import { useEffect, useRef, type KeyboardEvent } from "react";
import { ArrowUp, Square } from "lucide-react";

interface ChatInputProps {
  value: string;
  streaming: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop: () => void;
}

const MAX_HEIGHT = 200;

export function ChatInput({
  value,
  streaming,
  onChange,
  onSubmit,
  onStop,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-growing textarea, capped at 200px
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!streaming && value.trim()) onSubmit();
    }
    // Shift + Enter falls through → inserts a newline
  };

  const canSend = value.trim().length > 0 && !streaming;

  return (
    <div className="px-4 pb-5 pt-2">
      <div className="mx-auto max-w-3xl">
        {/* Gradient border fade wrapper */}
        <div className="rounded-3xl p-[1.5px] transition-all duration-200 focus-within:shadow-[0_0_28px_oklch(0.546_0.245_262.881/25%)]">
          <div className="flex items-end gap-2 rounded-[calc(1.5rem-1.5px)] bg-card px-4 py-3">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask Pulse anything…"
              className=" chat-scrollbar max-h-50 flex-1 resize-none bg-transparent text-[0.9375rem] leading-relaxed tracking-tight text-foreground outline-none placeholder:text-muted-foreground"
            />
            {streaming ? (
              <button
                onClick={onStop}
                aria-label="Stop generation"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-all duration-200 hover:scale-[1.05] hover:bg-secondary/80"
              >
                <Square className="h-3.5 w-3.5" fill="currentColor" />
              </button>
            ) : (
              <button
                onClick={onSubmit}
                disabled={!canSend}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 enabled:hover:scale-[1.05] enabled:hover:bg-primary/90 disabled:opacity-30"
              >
                <ArrowUp className="h-4.5 w-4.5" />
              </button>
            )}
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Enter to send · Shift + Enter for a new line
        </p>
      </div>
    </div>
  );
}

