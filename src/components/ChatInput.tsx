import { useEffect, useRef, type KeyboardEvent } from "react"
import { ArrowRight, Square } from "lucide-react"

interface ChatInputProps {
  value: string
  streaming: boolean
  onChange: (value: string) => void
  onSubmit: () => void
  onStop: () => void
}

const MAX_HEIGHT = 200

export function ChatInput({
  value,
  streaming,
  onChange,
  onSubmit,
  onStop,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-growing textarea, capped at 200px
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`
  }, [value])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!streaming && value.trim()) onSubmit()
    }
  }

  const canSend = value.trim().length > 0 && !streaming

  return (
    <div className="px-4 pt-2 pb-5">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3 rounded-2xl border border-[#182338] bg-[#070d1a] px-4 py-3 shadow-lg shadow-black/40 transition-colors focus-within:border-[#00a6ff]/50">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask PulseAI anything..."
            className="chat-scrollbar max-h-48 flex-1 resize-none bg-transparent text-[15px] leading-relaxed text-[#f1f5f9] outline-none placeholder:text-[#64748b]"
          />
          {streaming ? (
            <button
              onClick={onStop}
              aria-label="Stop generation"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive text-white transition-all hover:scale-105 active:scale-95"
            >
              <Square className="h-4 w-4" fill="currentColor" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              disabled={!canSend}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00a6ff] text-white transition-all enabled:hover:scale-105 enabled:hover:bg-[#0095ea] enabled:active:scale-95 disabled:opacity-30"
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
          )}
        </div>
        <p className="mt-2 text-center text-[11px] text-[#64748b]/80">
          Enter to send · Shift + Enter for a new line
        </p>
      </div>
    </div>
  )
}
