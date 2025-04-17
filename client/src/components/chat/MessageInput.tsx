import { useState, useEffect, useRef } from 'react';
import { useChatContext } from '@/context/ChatContext';
import { Paperclip, Mic, SendHorizontal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export function MessageInput() {
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useChatContext();
  const { toast } = useToast();

  useEffect(() => {
    setCharCount(message.length);
  }, [message]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);
  
  // Cleanup speech recognition when component unmounts
  useEffect(() => {
    return () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload the file to a server
      // For now, we'll just show a toast notification
      toast({
        title: "File uploaded",
        description: `${file.name} has been attached to your message.`,
        duration: 3000,
      });
      
      // Add file name to message
      setMessage(prev => prev + `\n[Attached file: ${file.name}]`);
    }
  };
  
  // Create a reference for the speech recognition object
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleVoiceInput = () => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      if (!isListening) {
        // Start listening
        setIsListening(true);
        
        // Initialize speech recognition
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';
        
        // Show toast notification
        toast({
          title: "Voice input started",
          description: "Speak now...",
          duration: 2000,
        });
        
        // Handle results
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            }
          }
          
          if (finalTranscript) {
            setMessage(prev => {
              // If there's already text, add a space before the transcript
              if (prev && !prev.endsWith(' ')) {
                return prev + ' ' + finalTranscript;
              }
              return prev + finalTranscript;
            });
          }
        };
        
        // Handle end of speech recognition
        recognitionRef.current.onend = () => {
          if (isListening) {
            setIsListening(false);
            toast({
              title: "Voice input completed",
              description: "Text has been added to your message.",
              duration: 2000,
            });
          }
        };
        
        // Handle errors
        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
          toast({
            title: "Voice input error",
            description: `Error: ${event.error}`,
            variant: "destructive",
            duration: 3000,
          });
        };
        
        // Start recognition
        recognitionRef.current.start();
      } else {
        // Stop listening
        setIsListening(false);
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        
        toast({
          title: "Voice input stopped",
          duration: 2000,
        });
      }
    } else {
      toast({
        title: "Not supported",
        description: "Voice input is not supported in your browser.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const handleAISuggestions = () => {
    const suggestions = [
      "How can I improve my resume for tech roles?",
      "What are the best networking strategies for women in tech?",
      "Tips for work-life balance in demanding careers",
      "How to negotiate salary as a woman in tech"
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setMessage(randomSuggestion);
    
    toast({
      title: "AI Suggestion",
      description: "A suggested query has been added to your message.",
      duration: 2000,
    });
  };

  return (
    <div className="relative">
      <div className="flex items-end gap-2.5">
        <div className="flex-1 bg-zinc-800/80 backdrop-blur-sm rounded-xl p-3.5 border border-zinc-700/50 transition-all focus-within:border-violet-500/50 focus-within:shadow-[0_0_0_1px_rgba(124,58,237,0.1),0_0_0_4px_rgba(124,58,237,0.1)] shadow-sm">
          <textarea 
            ref={textareaRef}
            id="message-input" 
            rows={1}
            className="w-full resize-none bg-transparent outline-none placeholder-zinc-500 text-zinc-200 text-[15px]" 
            placeholder="Ask Asha about career opportunities..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={1000}
          />
          
          {/* Hidden file input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />
          
          {/* Message Options */}
          <div className="flex justify-between items-center mt-2.5 pt-2.5 border-t border-zinc-700/50">
            <div className="flex gap-2.5">
              <button 
                className="p-1.5 text-zinc-500 hover:text-violet-400 transition-colors" 
                title="Upload file"
                onClick={handleFileUpload}
              >
                <Paperclip className={`h-4 w-4 ${fileInputRef.current?.files?.length ? 'text-violet-400' : ''}`} />
              </button>
              <button 
                className={`p-1.5 ${isListening 
                  ? 'text-red-400 bg-red-500/10 border border-red-500/30 rounded-md animate-pulse' 
                  : 'text-zinc-500 hover:text-violet-400'} transition-all`}
                title={isListening ? "Stop recording" : "Voice input"}
                onClick={handleVoiceInput}
              >
                <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
                {isListening && <span className="sr-only">Recording...</span>}
              </button>
              <button 
                className="p-1.5 text-zinc-500 hover:text-violet-400 transition-colors" 
                title="AI suggestions"
                onClick={handleAISuggestions}
              >
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
            <span className="text-xs text-zinc-500 font-mono" id="char-count">
              {charCount > 900 ? (
                <span className={charCount > 980 ? "text-amber-500" : ""}>
                  {charCount}/1000
                </span>
              ) : null}
            </span>
          </div>
        </div>
        
        <Button
          id="send-message" 
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white p-3 rounded-xl flex-shrink-0 transition-all h-11 w-11 shadow-md shadow-violet-600/20"
          onClick={handleSend}
          disabled={!message.trim()}
          aria-label="Send message"
          size="icon"
        >
          <SendHorizontal className="h-4.5 w-4.5" />
        </Button>
      </div>
    </div>
  );
}
