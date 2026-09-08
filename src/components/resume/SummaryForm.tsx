import React from 'react';
import { Sparkles, RefreshCw, Wand2 } from 'lucide-react';
import { Button } from '../Button';

interface SummaryFormProps {
  summary: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({
  summary,
  onChange,
  onGenerate,
  isGenerating = false,
}) => {
  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-slate-600 dark:text-slate-400">
          A compelling 2–4 sentence overview highlighting your engineering background, top tech stack, and career objective.
        </p>

        <Button
          type="button"
          size="small"
          variant="secondary"
          onClick={onGenerate}
          disabled={isGenerating}
          leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-500" />}
        >
          {isGenerating ? 'Generating...' : 'Generate Summary'}
        </Button>
      </div>

      <div className="relative">
        <textarea
          rows={4}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a short professional summary highlighting your skills, education, experience and career goals."
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
        <span>{summary ? summary.trim().split(/\s+/).filter(Boolean).length : 0} words • {summary?.length || 0} characters</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
          <Wand2 className="w-3 h-3" />
          ATS-Optimized format
        </span>
      </div>
    </div>
  );
};
