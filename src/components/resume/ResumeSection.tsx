import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ResumeSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  actionButton?: React.ReactNode;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  id,
  title,
  subtitle,
  icon,
  badge,
  children,
  defaultOpen = true,
  actionButton,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      id={id}
      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-700"
    >
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div
          className="flex items-center gap-3 cursor-pointer select-none flex-1 min-w-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                {title}
              </h3>
              {badge}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {actionButton}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={isOpen ? `Collapse ${title}` : `Expand ${title}`}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isOpen && <div className="pt-4 space-y-4">{children}</div>}
    </div>
  );
};
