import type { Conversation } from "@/lib/types";
import { MessageSquare, PanelLeftClose, Plus, Trash2} from "lucide-react";
import logo2 from "../assets/logo2.svg"
import { Logo } from "@/assets/logo";

interface SidebarProps {
  open: boolean;
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNewChat: () => void;
  onToggle: () => void;
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
  const sorted = [...conversations].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <aside
      className={`flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 ${
        open ? "w-72" : "w-0 overflow-hidden border-r-0"
      }`}
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="">
            <Logo className="h-7 w-7 shrink-0"/>
          </div>
          <span className="text-xl font-semibold tracking-tight">Pulse AI</span>
        </div>
        <button
          onClick={onToggle}
          aria-label="Collapse sidebar"
          className="rounded-lg p-1.5 text-muted-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-foreground"
        >
          <PanelLeftClose className="h-4.5 w-4.5"/>
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
        <p className="px-2 pb-2 pt-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
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
                  e.stopPropagation();
                  onDelete(conv.id);
                }}
                aria-label={`Delete ${conv.title}`}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground opacity-0 transition-all duration-200 hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
