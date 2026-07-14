import { useState } from "react";
import { Check, Copy, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "../lib/types";


interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable
    }
  };

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-bubble px-4 py-3 text-[0.9375rem] leading-relaxed tracking-tight">
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3.5">
      {/* Glowing agent icon trace */}
      <div className="agent-glow mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <Zap className="h-4 w-4 text-primary-foreground" fill="currentColor" />
      </div>

      <div className="group min-w-0 flex-1">
        <div
          className={`md-body text-foreground ${
            message.streaming && message.content ? "stream-cursor" : ""
          }`}
        >
          {message.content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          ) : message.streaming ? (
            <span className="inline-flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
            </span>
          ) : null}
          {message.error && (
            <p className="mt-2 text-sm text-destructive">
              Something went wrong while streaming this response.
            </p>
          )}
        </div>

        {/* Copy to clipboard shortcut — appears on completion */}
        {!message.streaming && message.content && (
          <button
            onClick={copyToClipboard}
            aria-label="Copy to clipboard"
            className="mt-2 flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-muted-foreground opacity-0 transition-all duration-200 hover:bg-secondary hover:text-foreground group-hover:opacity-100"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-primary" /> Copied
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
  );
}

