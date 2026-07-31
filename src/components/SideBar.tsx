import { useState } from "react"
import type { Conversation } from "@/lib/types"
import {
  MessageSquare,
  PanelLeftClose,
  Plus,
  Trash2,
  LogOut,
  LogIn,
  Zap,
  Crown,
} from "lucide-react"
import { Logo } from "@/assets/logo"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { CreditsModal } from "./CreditsModal"

interface SidebarProps {
  open: boolean
  conversations: Conversation[]
  activeId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onNewChat: () => void
  onToggle: () => void
}

export function Sidebar({
  open,
  conversations,
  activeId,
  onSelect,
  onDelete,
  onNewChat,
  onToggle,
}: SidebarProps) {
  const sorted = [...conversations].sort((a, b) => b.updatedAt - a.updatedAt)
  const { user, isAuthenticated, signOut } = useAuth()
  const navigate = useNavigate()
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false)

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  const handleSignOut = () => {
    signOut()
    navigate("/signin")
  }

  return (
    <>
      <aside
        className={`flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 ${
          open ? "w-72" : "w-0 overflow-hidden border-r-0"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="">
              <Logo className="h-7 w-7 shrink-0" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Pulse AI
            </span>
          </div>
          <button
            onClick={onToggle}
            aria-label="Collapse sidebar"
            className="rounded-lg p-1.5 text-muted-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-foreground"
          >
            <PanelLeftClose className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="px-3 pb-3">
          <button
            onClick={onNewChat}
            className="flex w-full items-center gap-2 rounded-xl border border-sidebar-border bg-sidebar-accent px-3.5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.01] hover:border-primary/40"
          >
            <Plus className="h-4 w-4" />
            New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3">
          <p className="px-2 pt-1 pb-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Recent
          </p>
          {sorted.length === 0 && (
            <p className="px-2 py-4 text-sm text-muted-foreground">
              No conversations yet
            </p>
          )}
          <ul className="space-y-0.5">
            {sorted.map((conv) => (
              <li key={conv.id} className="group relative">
                <button
                  onClick={() => onSelect(conv.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 pr-9 text-left text-sm transition-all duration-200 ${
                    conv.id === activeId
                      ? "bg-sidebar-accent text-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                  }`}
                >
                  <MessageSquare className="h-4 w-4 shrink-0" />
                  <span className="truncate">{conv.title}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(conv.id)
                  }}
                  aria-label={`Delete ${conv.title}`}
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── Profile & Credits Section ─── */}
        <div className="space-y-2 border-t border-sidebar-border px-3 py-3">
          {isAuthenticated && user ? (
            <>
              {/* Credits Row */}
              <div className="flex items-center justify-between rounded-xl border border-sidebar-border bg-sidebar-accent/40 px-3 py-2">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  {user.isPremium ? (
                    <>
                      <Crown className="h-4 w-4 text-amber-400" />
                      <span className="font-bold text-amber-300">
                        Unlimited
                      </span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-foreground">
                        {user.credits ?? 0} Credits
                      </span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setIsCreditsModalOpen(true)}
                  className="flex items-center gap-1 rounded-lg bg-indigo-600/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.03] hover:bg-indigo-500"
                >
                  <Plus className="h-3 w-3" />
                  Add Credits
                </button>
              </div>

              {/* Profile Card */}
              <div className="group flex items-center gap-3 rounded-xl px-2.5 py-2 transition-all duration-200 hover:bg-sidebar-accent/60">
                {/* Avatar with initials */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white shadow-sm">
                  {getInitials(user.name)}
                </div>

                {/* Name + email */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm leading-tight font-medium text-foreground">
                    {user.name}
                  </p>
                  <p className="truncate text-[11px] leading-tight text-muted-foreground">
                    {user.email}
                  </p>
                </div>

                {/* Sign out button */}
                <button
                  onClick={handleSignOut}
                  aria-label="Sign out"
                  className="rounded-lg p-1.5 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-secondary hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] px-3.5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-right hover:shadow-lg hover:shadow-purple-500/20"
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </button>
          )}
        </div>
      </aside>

      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
      />
    </>
  )
}
