import { ChatHeader } from '@/components/ChatHeader';
import { ChatInput } from '@/components/ChatInput';
import { EmptyState } from '@/components/EmptyState';
import { MessageBubble } from '@/components/MessageBubble';
import { Sidebar } from '@/components/SideBar';
import { useStreaming } from '@/hooks/useStreaming';
import type { ModelId, Conversation } from '@/lib/types';
import { useEffect, useRef, useState, useCallback } from 'react';
import { apiGetExecutions, apiGetConversation, apiDeleteChat, type ApiExecution } from '@/lib/api';

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Executions represent the sidebar list
  const [executions, setExecutions] = useState<ApiExecution[]>([]);
  
  // Active conversation is the currently loaded detailed chat
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const [model, setModel] = useState<ModelId>('gemini-2.0-flash');
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    setMessages,
    isGenerating,
    error,
    sendMessage,
    stopGeneration,
  } = useStreaming();

  // Determine which messages to display
  // If we have an active saved conversation AND no streaming messages, show saved.
  // Otherwise show the streaming state.
  const displayMessages = messages.length > 0 ? messages : (activeConversation?.messages || []);

  const fetchExecutions = useCallback(async () => {
    try {
      const data = await apiGetExecutions();
      setExecutions(data);
    } catch (err) {
      console.error("Failed to fetch executions:", err);
    }
  }, []);

  // Initial load of the sidebar
  useEffect(() => {
    fetchExecutions();
  }, [fetchExecutions]);

  const loadConversation = async (id: string, targetConversationId: string) => {
    setActiveId(id);
    stopGeneration();
    setMessages([]);
    
    try {
      const conv = await apiGetConversation(targetConversationId);
      if (conv) {
        // Map backend shape to frontend Conversation
        setActiveConversation({
          id: conv._id,
          title: "Chat", // It's from Execution normally, but we just need it for types
          model: 'gemini-2.0-flash',
          messages: conv.messages.map(m => ({
            id: (Math.random()*10000).toString(),
            role: m.role as "user"|"assistant",
            content: m.content,
            createdAt: new Date(m.createdAt).getTime()
          })),
          createdAt: new Date(conv.createdAt).getTime(),
          updatedAt: new Date(conv.updatedAt).getTime()
        });
        
        // Also populate the streaming hook state so we can continue chatting from it
        setMessages(conv.messages.map(m => ({
          role: m.role as "user"|"assistant",
          content: m.content,
        })));
      }
    } catch (err) {
      console.error("Failed to load conversation:", err);
    }
  };

  const deleteConversation = async (id: string) => {
    const exec = executions.find(e => e._id === id);
    if (!exec) return;
    
    setExecutions((prev) => prev.filter((c) => c._id !== id));
    if (activeId === id) {
      setActiveId(null);
      setActiveConversation(null);
      setMessages([]);
    }
    
    try {
      await apiDeleteChat(exec.conversationId);
    } catch (err) {
      console.error("Failed to delete chat:", err);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [displayMessages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isGenerating) return;
    setInput('');
    
    // activeConversation?.id is the underlying Conversation _id (not Execution _id)
    const currentConvId = activeConversation?.id;
    
    const returnedConvId = await sendMessage(text, model, currentConvId);
    
    if (returnedConvId) {
      if (!currentConvId) {
        // New chat: persist the conversationId so follow-up messages continue the same thread
        setActiveConversation({
          id: returnedConvId,
          title: text.slice(0, 40),
          model,
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        // Refresh the sidebar to show the new entry
        await fetchExecutions();
      }
    }
  };

  // Convert ApiExecutions to Conversation interface just for Sidebar prop compatibility
  const sidebarConversations: Conversation[] = executions.map(ex => ({
    id: ex._id,
    title: ex.title,
    model: 'gemini-2.0-flash',
    messages: [],
    createdAt: new Date(ex.createdAt).getTime(),
    updatedAt: new Date(ex.updatedAt).getTime()
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar
        open={sidebarOpen}
        conversations={sidebarConversations}
        activeId={activeId}
        onSelect={(id) => {
          const exec = executions.find(e => e._id === id);
          if (exec) loadConversation(id, exec.conversationId);
        }}
        onDelete={deleteConversation}
        onNewChat={() => {
          stopGeneration();
          setActiveId(null);
          setActiveConversation(null);
          setMessages([]);
        }}
        onToggle={() => setSidebarOpen(false)}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <ChatHeader
          sidebarOpen={sidebarOpen}
          model={model}
          onModelChange={setModel}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        {displayMessages.length > 0 ? (
          <div ref={scrollRef} className="chat-scrollbar flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
              {displayMessages.map((message, index) => (
                <MessageBubble key={message.id ?? `msg-${index}`} message={message} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <EmptyState onPrompt={(prompt) => setInput(prompt)} />
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-3xl px-4 pb-2">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <ChatInput
          value={input}
          streaming={isGenerating}
          onChange={setInput}
          onSubmit={handleSend}
          onStop={stopGeneration}
        />
      </main>
    </div>
  );
};
