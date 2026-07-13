
import { Sidebar } from '@/components/SideBar';
import { type Conversation } from '@/lib/types';
import  { useState } from 'react';

export const Dashboard = () => {
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const [conversations,setconversations]=useState<Conversation[]>([]);
  const [activeId,setActiveId]=useState<string | null >(null);
  

    const stopGeneration = ()=>{

    }


  const deleteConversation = ()=>{

  }

  return (
    <div>
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
    </div>
  )
}
