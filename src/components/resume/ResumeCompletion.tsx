import React from 'react';
import { CheckCircle2, AlertCircle, Lightbulb, Sparkles, ChevronRight } from 'lucide-react';
import { ResumeData } from '../../types';
import { calculateResumeCompletion } from '../../data/resumeDefaults';

interface ResumeCompletionProps {
  resume: ResumeData;
  onFocusSection?: (sectionId: string) => void;
}

export const ResumeCompletion: React.FC<ResumeCompletionProps> = ({
  resume,
  onFocusSection,
}) => {
  const { score, breakdown, suggestions } = calculateResumeCompletion(resume);

  // Determine progress color
  const getProgressColor = () => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 70) return 'bg-indigo-600';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getBadgeText = () => {
    if (score >= 90) return 'Job Ready';
    if (score >= 75) return 'Strong Profile';
    if (score >= 50) return 'Developing';
    return 'Incomplete';
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xs">
            {score}%
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                Resume Completion Score
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                {getBadgeText()}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Evaluated across personal details, skills, projects, and certifications
            </p>
          </div>
        </div>

        <span className="text-xs font-black text-slate-900 dark:text-white">
          {score} / 100
        </span>
      </div>

      {/* Visual Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-500 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Actionable Suggestions Banner */}
      {suggestions.length > 0 && (
        <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <span className="font-bold">Next Step: </span>
            <span>{suggestions[0]}</span>
            {suggestions.length > 1 && (
              <span className="text-[10px] text-amber-700/80 dark:text-amber-400 block mt-0.5">
                +{suggestions.length - 1} more optimization tips available
              </span>
            )}
          </div>
        </div>
      )}

      {score === 100 && (
        <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="font-semibold">
            Outstanding! Your resume is 100% complete and optimized for EduPath campus placement drives.
          </span>
        </div>
      )}
    </div>
  );
};
