import { useChatContext } from '@/context/ChatContext';
import { 
  Briefcase, GraduationCap, FileText, Clock, Users, Heart, Sparkles, Search 
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface SuggestedQuery {
  text: string;
  icon: React.ReactNode;
  color: string;
}

const SUGGESTED_QUERIES: SuggestedQuery[] = [
  {
    text: "Career transition advice",
    icon: <Briefcase className="h-3 w-3" />,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300 border-purple-200 dark:border-purple-800/40"
  },
  {
    text: "Upcoming tech workshops",
    icon: <GraduationCap className="h-3 w-3" />,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 border-blue-200 dark:border-blue-800/40"
  },
  {
    text: "Resume review tips",
    icon: <FileText className="h-3 w-3" />,
    color: "bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300 border-green-200 dark:border-green-800/40"
  },
  {
    text: "Jobs with flexible hours",
    icon: <Clock className="h-3 w-3" />,
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/40"
  },
  {
    text: "Networking opportunities",
    icon: <Users className="h-3 w-3" />,
    color: "bg-pink-100 text-pink-700 dark:bg-pink-900/60 dark:text-pink-300 border-pink-200 dark:border-pink-800/40"
  },
  {
    text: "Work-life balance strategies",
    icon: <Heart className="h-3 w-3" />,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/40"
  }
];

export function SuggestedQueries() {
  const { setInputMessage } = useChatContext();
  const [visibleQueries, setVisibleQueries] = useState<SuggestedQuery[]>([]);
  
  // Randomly select queries for a more dynamic feel on each render
  useEffect(() => {
    // Shuffle array and take first 4 items
    const shuffled = [...SUGGESTED_QUERIES].sort(() => 0.5 - Math.random());
    setVisibleQueries(shuffled.slice(0, 4));
  }, []);

  const handleSuggestedQuery = (query: string) => {
    setInputMessage(query);
  };

  if (visibleQueries.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2 animate-fadeIn">
      <div className="flex items-center text-xs text-violet-400 font-medium px-1 mr-1">
        <Sparkles className="h-3 w-3 mr-1.5 opacity-70" />
        <span>Try asking:</span>
      </div>
      {visibleQueries.map((query, index) => (
        <button 
          key={index.toString()}
          className="border border-zinc-700/70 bg-zinc-800/50 hover:bg-zinc-700/70 px-3 py-1.5 rounded-lg text-xs text-zinc-300 flex items-center gap-1.5 transition-all shadow-sm"
          onClick={() => handleSuggestedQuery(query.text)}
        >
          {query.icon}
          <span>{query.text}</span>
        </button>
      ))}
      
      <button 
        className="border border-zinc-700/70 bg-violet-500/10 hover:bg-violet-500/20 px-3 py-1.5 rounded-lg text-xs text-violet-300 flex items-center gap-1.5 transition-all shadow-sm border-violet-500/30"
        onClick={() => {
          // Reshuffle suggestions
          const shuffled = [...SUGGESTED_QUERIES].sort(() => 0.5 - Math.random());
          setVisibleQueries(shuffled.slice(0, 4));
        }}
      >
        <Search className="h-3 w-3" />
        <span>More suggestions</span>
      </button>
    </div>
  );
}
