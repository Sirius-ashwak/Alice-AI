import { useTheme } from '@/lib/theme';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="bg-white dark:bg-neutral-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <i className="ri-robot-line text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary dark:text-secondary">Asha AI</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">JobsForHer Career Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            id="theme-toggle" 
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <i className="ri-sun-line dark:hidden text-neutral-600"></i>
            <i className="ri-moon-line hidden dark:block text-neutral-300"></i>
          </button>
          
          <button className="flex gap-1 items-center px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-md transition">
            <i className="ri-user-line"></i>
            <span className="text-sm">Login</span>
          </button>
        </div>
      </div>
    </header>
  );
}
