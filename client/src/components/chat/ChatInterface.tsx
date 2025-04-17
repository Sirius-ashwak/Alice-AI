import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { SuggestedQueries } from "./SuggestedQueries";
import { TypingIndicator } from "./TypingIndicator";
import { useChatContext } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";
import { Sparkles, Trash2, Info, Users, Briefcase, Calendar, Lightbulb, BrainCircuit, Stars } from "lucide-react";

export function ChatInterface() {
  const { messages, isTyping, clearChat, sendMessage } = useChatContext();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-zinc-900 to-black rounded-xl overflow-hidden max-w-5xl mx-auto w-full shadow-[0_0_50px_rgba(124,58,237,0.15)]">
      {/* Chat Header */}
      <div className="relative p-5 border-b border-zinc-800/70 flex justify-between items-center backdrop-blur-md bg-gradient-to-r from-zinc-900 to-zinc-900/95">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-600/20">
            <Stars className="text-white h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300 text-xl tracking-tight">
              Asha AI Assistant
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-zinc-400 font-medium">JobsForHer Career Partner</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline"
            size="icon"
            onClick={clearChat}
            aria-label="Clear chat"
            className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 h-9 w-9"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            size="icon"
            aria-label="Chat information"
            className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 h-9 w-9"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Feature Pills */}
      <div className="bg-zinc-900/70 backdrop-blur-sm px-5 py-2.5 flex gap-2 overflow-x-auto scrollbar-hide border-b border-zinc-800/50">
        <button 
          onClick={() => sendMessage("I need career advice for women in tech")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium whitespace-nowrap hover:bg-violet-500/20 transition-colors cursor-pointer"
        >
          <Users className="h-3.5 w-3.5" />
          <span>Career Advice</span>
        </button>
        <button 
          onClick={() => sendMessage("Show me job opportunities for women in tech")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-700/70 bg-zinc-800/30 text-zinc-300 text-xs font-medium whitespace-nowrap hover:bg-zinc-700/50 transition-colors cursor-pointer"
        >
          <Briefcase className="h-3.5 w-3.5" />
          <span>Job Search</span>
        </button>
        <button 
          onClick={() => sendMessage("What events are coming up for professional women?")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-700/70 bg-zinc-800/30 text-zinc-300 text-xs font-medium whitespace-nowrap hover:bg-zinc-700/50 transition-colors cursor-pointer"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Events</span>
        </button>
        <button 
          onClick={() => sendMessage("Tell me about mentorship programs for women")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-700/70 bg-zinc-800/30 text-zinc-300 text-xs font-medium whitespace-nowrap hover:bg-zinc-700/50 transition-colors cursor-pointer"
        >
          <Lightbulb className="h-3.5 w-3.5" />
          <span>Mentorship</span>
        </button>
      </div>
      
      {/* Chat Messages */}
      <div 
        id="chat-container" 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-6 py-5 space-y-7 chat-scrollbar relative z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(124, 58, 237, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(79, 70, 229, 0.05) 0%, transparent 50%)',
          backgroundSize: '100% 100%'
        }}
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
      </div>
      
      {/* Chat Input */}
      <div className="px-6 py-5 border-t border-zinc-800/70 bg-gradient-to-b from-zinc-900/95 to-zinc-900">
        <MessageInput />
        <SuggestedQueries />
      </div>
    </div>
  );
}
