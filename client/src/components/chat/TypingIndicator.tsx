import { Stars } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start typing-indicator animate-fadeIn">
      <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex-shrink-0 flex items-center justify-center shadow-md shadow-violet-600/20">
        <Stars className="text-white h-5 w-5" />
      </div>
      <div className="bg-zinc-800/80 p-4 rounded-2xl rounded-tl-sm shadow-md shadow-black/5 border border-zinc-700/50 backdrop-blur-sm inline-flex">
        <div className="flex items-center gap-2.5">
          {/* Custom typing animation with more elegant bubbles */}
          <span className="typing-bubble bg-gradient-to-r from-violet-500 to-indigo-500"></span>
          <span className="typing-bubble bg-gradient-to-r from-violet-500 to-indigo-500" style={{ animationDelay: "0.2s" }}></span>
          <span className="typing-bubble bg-gradient-to-r from-violet-500 to-indigo-500" style={{ animationDelay: "0.4s" }}></span>
        </div>
      </div>
    </div>
  );
}
