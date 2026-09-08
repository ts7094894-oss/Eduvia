import React from 'react';
import { Target, Check, Compass } from 'lucide-react';
import { CAREER_INTERESTS_LIST } from '../../data/resumeDefaults';

interface CareerInterestsFormProps {
  selectedInterests: string[];
  onChange: (interests: string[]) => void;
}

export const CareerInterestsForm: React.FC<CareerInterestsFormProps> = ({
  selectedInterests = [],
  onChange,
}) => {
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onChange(selectedInterests.filter((i) => i !== interest));
    } else {
      onChange([...selectedInterests, interest]);
    }
  };

  return (
    <div className="space-y-3 text-xs">
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
        <Compass className="w-4 h-4 text-indigo-500 shrink-0" />
        <p>
          Select your target roles. These guide summary generation and calculate real-time job match percentages across the EduPath Career Portal.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {CAREER_INTERESTS_LIST.map((interest) => {
          const isSelected = selectedInterests.includes(interest);
          return (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/20 ring-2 ring-indigo-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500'
              }`}
            >
              {isSelected ? (
                <Check className="w-3.5 h-3.5 text-white" />
              ) : (
                <Target className="w-3 h-3 text-slate-400" />
              )}
              <span>{interest}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
