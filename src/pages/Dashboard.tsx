
import { ChatHeader } from '@/components/ChatHeader';
import { ChatInput } from '@/components/ChatInput';
import { EmptyState } from '@/components/EmptyState';
import { MessageBubble } from '@/components/MessageBubble';
import { Sidebar } from '@/components/SideBar';
import type { ModelId,Conversation } from '@/lib/types';
import  { useRef, useState } from 'react';

export const Dashboard = () => {
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const [conversations,setconversations]=useState<Conversation[]>([]);
  const [activeId,setActiveId]=useState<string | null >(null);
  const [model,setModel]=useState<ModelId>('gemini-2.5-flash');
  const [input,setInput]=useState("");
  const [streaming,setStreaming]=useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

   const sendMessage=(text:string)=>{

   }
  



  const active = conversations.find((c) => c.id === activeId) ?? null;
    const stopGeneration = ()=>{

    }


  const deleteConversation = ()=>{

  }

  return (
    <div className='flex h-screen overflow-hidden bg-background text-foreground'> 
  <Sidebar
        open={sidebarOpen}
        conversations={conversations}
        activeId={activeId}
        onSelect={(id) => setActiveId(id)}
        onDelete={deleteConversation}
        onNewChat={() => {
          stopGeneration();
          setActiveId(null);
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

        {active ? (
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
              {active.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <EmptyState onPrompt={(prompt) => setInput(prompt)} />
          </div>
        )}

        <ChatInput
          value={input}
          streaming={streaming}
          onChange={setInput}
          onSubmit={() => sendMessage(input)}
          onStop={stopGeneration}
        />
      </main>
    </div>
  )
}
