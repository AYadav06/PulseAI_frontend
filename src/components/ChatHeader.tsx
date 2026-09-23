import { Check, ChevronDown, Lock, PanelLeftOpen, Sparkle } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { MODEL_OPTIONS, type ModelId } from "../lib/types"
import { useAuth } from "../context/AuthContext"

interface ChatHeaderProps {
  sidebarOpen: boolean
  model: ModelId
  onModelChange: (model: ModelId) => void
  onOpenSidebar: () => void
  onOpenCreditsModal?: () => void
}

export function ChatHeader({
  sidebarOpen,
  model,
  onModelChange,
  onOpenSidebar,
  onOpenCreditsModal,
}: ChatHeaderProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const active = MODEL_OPTIONS.find((m) => m.id === model) ?? MODEL_OPTIONS[0]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <header className="flex items-center gap-2 border-b border-border px-4 py-3">
      {!sidebarOpen && (
        <button
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
          className="rounded-lg p-1.5 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
        >
          <PanelLeftOpen className="h-4.5 w-4.5" />
        </button>
      )}

      {/* AI engine version selector */}
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium tracking-tight transition-all duration-200 hover:bg-secondary"
        >
          <span>{active.label}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              active.tier === "premium"
                ? "bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {active.badge}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute top-full left-0 z-50 mt-1.5 w-84 overflow-hidden rounded-xl border border-border bg-popover shadow-2xl shadow-black/50">
            {MODEL_OPTIONS.map((option) => {
              const isLocked = option.tier === "premium" && !user?.isPremium
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (isLocked && onOpenCreditsModal) {
                      onOpenCreditsModal()
                      setOpen(false)
                      return
                    }
                    onModelChange(option.id)
                    setOpen(false)
                  }}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-secondary"
                >
                  {isLocked ? (
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  ) : (
                    <Sparkle
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        option.tier === "premium"
                          ? "text-glow"
                          : "text-muted-foreground"
                      }`}
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{option.label}</span>
                      <span className="text-[10px] text-muted-foreground">
                        [{option.badge}]
                      </span>
                      {isLocked ? (
                        <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">
                          PRO
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground/80">
                          {user?.isPremium ? "Included" : `${option.creditCost} credits`}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {isLocked ? "Requires Premium Unlock plan to access." : option.description}
                    </p>
                  </div>
                  {option.id === model && (
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}
