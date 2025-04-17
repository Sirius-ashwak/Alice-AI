import { JobListings } from "./JobListings";
import { MentorshipPrograms } from "./MentorshipPrograms";
import { EventsList } from "./EventsList";
import { ChatMessage as ChatMessageType } from "@shared/types";
import { User, Sparkles, Brain, Stars } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { role, content, attachments, timestamp } = message;
  
  // Function to format the message with Markdown formatting
  const formatMessage = (text: string) => {
    return (
      <div className="whitespace-pre-wrap text-base leading-relaxed markdown-content">
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => <p className="mb-3 last:mb-0" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-3" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-3" {...props} />,
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-3 mt-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 mt-4" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-md font-bold mb-2 mt-3" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
            em: ({ node, ...props }) => <em className="italic" {...props} />,
            a: ({ node, ...props }) => <a className="text-violet-400 hover:underline" {...props} target="_blank" rel="noopener noreferrer" />,
            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-zinc-600 pl-4 italic my-3" {...props} />,
            code: ({ node, ...props }) => <code className="bg-zinc-700/50 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    );
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }).format(new Date(date));
  };
  
  if (role === 'user') {
    return (
      <div className="flex gap-3 justify-end group animate-fadeIn">
        <div className="flex flex-col items-end gap-1.5">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-4 rounded-2xl rounded-tr-sm max-w-[93%] shadow-md shadow-violet-600/5 transition-all">
            <span className="whitespace-pre-wrap text-base leading-relaxed">
              {content}
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {timestamp ? formatTime(timestamp) : ''}
          </span>
        </div>
        <div className="w-9 h-9 bg-zinc-800 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center shadow-inner shadow-black/20 border border-zinc-700/70">
          <User className="text-zinc-300 h-4.5 w-4.5" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex gap-3 items-start group animate-fadeIn">
      <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex-shrink-0 flex items-center justify-center shadow-md shadow-violet-600/20">
        <Stars className="text-white h-5 w-5" />
      </div>
      <div className="space-y-5 max-w-[95%]">
        <div className="flex flex-col gap-1.5">
          <div className="bg-zinc-800/80 p-4 rounded-2xl rounded-tl-sm shadow-md shadow-black/5 text-zinc-100 border border-zinc-700/50 backdrop-blur-sm">
            {formatMessage(content)}
          </div>
          <span className="text-[10px] text-zinc-500 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {timestamp ? formatTime(timestamp) : ''}
          </span>
        </div>
        
        {attachments?.map((attachment, index) => {
          if (attachment.type === 'jobs') {
            return (
              <div key={`jobs-${index}`} className="transform hover:scale-[1.01] transition-transform">
                <JobListings 
                  jobs={attachment.data as any} 
                />
              </div>
            );
          } else if (attachment.type === 'mentorships') {
            return (
              <div key={`mentorships-${index}`} className="transform hover:scale-[1.01] transition-transform">
                <MentorshipPrograms 
                  mentorships={attachment.data as any} 
                />
              </div>
            );
          } else if (attachment.type === 'events') {
            return (
              <div key={`events-${index}`} className="transform hover:scale-[1.01] transition-transform duration-300 w-full">
                <EventsList 
                  events={attachment.data as any} 
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
