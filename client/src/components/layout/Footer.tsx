export function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <i className="ri-robot-line text-white text-sm"></i>
            </div>
            <p className="text-sm font-semibold">JobsForHer Foundation</p>
          </div>
          
          <div className="flex gap-3 items-center">
            <button className="flex gap-1 items-center text-sm text-neutral-600 dark:text-neutral-400">
              <i className="ri-feedback-line"></i>
              <span>Feedback</span>
            </button>
            <span className="text-neutral-300 dark:text-neutral-600">|</span>
            <button className="flex gap-1 items-center text-sm text-neutral-600 dark:text-neutral-400">
              <i className="ri-information-line"></i>
              <span>About</span>
            </button>
            <span className="text-neutral-300 dark:text-neutral-600">|</span>
            <button className="flex gap-1 items-center text-sm text-neutral-600 dark:text-neutral-400">
              <i className="ri-shield-line"></i>
              <span>Privacy</span>
            </button>
          </div>
          
          <p className="text-xs text-neutral-500 dark:text-neutral-400">&copy; 2023 JobsForHer Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
