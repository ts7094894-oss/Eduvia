import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface ThemeToggleProps {
  id?: string;
  className?: string;
  variant?: 'icon' | 'button' | 'compact';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  id = 'theme-toggle-button',
  className = '',
  variant = 'icon',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'button' || showLabel) {
    return (
      <button
        id={id}
        type="button"
        onClick={toggleTheme}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
          isDark
            ? 'bg-slate-800 text-amber-300 hover:bg-slate-700 border border-slate-700'
            : 'bg-slate-100 text-indigo-700 hover:bg-slate-200 border border-slate-200'
        } ${className}`}
        aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      >
        {isDark ? (
          <>
            <Sun className="w-4 h-4 text-amber-400 transition-transform group-hover:rotate-45" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 text-indigo-600 transition-transform group-hover:-rotate-12" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      id={id}
      type="button"
      onClick={toggleTheme}
      className={`group relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/80 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${className}`}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
      )}
    </button>
  );
};

export default ThemeToggle;
