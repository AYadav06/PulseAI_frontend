import { useState } from "react"
import { Check, Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { ChatMessage } from "../lib/types"

interface MessageBubbleProps {
  message: ChatMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard unavailable
    }
  }

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%] rounded-[18px] bg-[#00a6ff] px-5 py-3 text-[15px] font-normal leading-relaxed text-white shadow-sm">
          <p className="wrap-break-words whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    )
  }

  // Standalone typing indicator when response is pending
  if (message.streaming && !message.content) {
    return (
      <div className="flex justify-start">
        <div className="inline-flex items-center gap-1.5 rounded-2xl border border-[#182338]/70 bg-[#0c1322] px-4 py-3 shadow-sm">
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
        </div>
      </div>
    )
  }

  // Assistant response inside dark card bubble
  return (
    <div className="flex justify-start">
      <div className="group relative max-w-[85%] rounded-[18px] border border-[#182338]/60 bg-[#0c1322] px-5 py-4 text-[15px] leading-relaxed text-[#e2e8f0] shadow-sm">
        <div
          className={`md-body ${
            message.streaming && message.content ? "stream-cursor" : ""
          }`}
        >
          {message.content && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          )}
          {message.error && (
            <p className="mt-2 text-sm text-destructive">
              Something went wrong while streaming this response.
            </p>
          )}
        </div>

        {!message.streaming && message.content && (
          <button
            onClick={copyToClipboard}
            aria-label="Copy to clipboard"
            className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-[#131c30]/80 px-2 py-1 text-xs text-slate-400 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-[#1a2640] hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-sky-400" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
