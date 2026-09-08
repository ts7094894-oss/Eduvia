import React, { useState } from 'react';
import { Plus, X, Sparkles, Check, Tag } from 'lucide-react';
import { ResumeSkill, SkillCategory } from '../../types';
import { SKILL_CATEGORIES_LIST } from '../../data/resumeDefaults';
import { Button } from '../Button';

interface SkillsFormProps {
  skills: ResumeSkill[];
  onAddSkill: (skill: ResumeSkill) => void;
  onRemoveSkill: (skillId: string) => void;
  onAddMultipleSkills: (skills: ResumeSkill[]) => void;
  suggestedSkills?: { name: string; category: SkillCategory; sourceCourse: string }[];
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  onAddSkill,
  onRemoveSkill,
  onAddMultipleSkills,
  suggestedSkills = [],
}) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('Programming Languages');
  const [customSkillName, setCustomSkillName] = useState('');
  const [customCategory, setCustomCategory] = useState<SkillCategory>('Programming Languages');

  // Filter existing skills by category
  const skillsByCategory = (category: SkillCategory) =>
    skills.filter((s) => s.category === category);

  // Suggested skills that are not already added
  const unaddedSuggestions = suggestedSkills.filter(
    (sug) => !skills.some((s) => s.name.toLowerCase() === sug.name.toLowerCase())
  );

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillName.trim()) return;

    onAddSkill({
      id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: customSkillName.trim(),
      category: customCategory,
    });
    setCustomSkillName('');
  };

  const handleAcceptAllSuggestions = () => {
    const newItems: ResumeSkill[] = unaddedSuggestions.map((sug) => ({
      id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: sug.name,
      category: sug.category,
    }));
    onAddMultipleSkills(newItems);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Course Auto-Suggestions Banner */}
      {unaddedSuggestions.length > 0 && (
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Suggested Skills from your EduPath Courses:</span>
            </div>
            <button
              type="button"
              onClick={handleAcceptAllSuggestions}
              className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 hover:underline flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              Add All ({unaddedSuggestions.length})
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {unaddedSuggestions.map((sug) => (
              <button
                key={sug.name}
                type="button"
                onClick={() =>
                  onAddSkill({
                    id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                    name: sug.name,
                    category: sug.category,
                  })
                }
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:border-indigo-500 flex items-center gap-1 text-[11px] font-medium transition-colors shadow-xs"
                title={`From course: ${sug.sourceCourse}`}
              >
                <Plus className="w-3 h-3 text-indigo-500" />
                <span>{sug.name}</span>
                <span className="text-[9px] text-slate-400">({sug.category.split(' ')[0]})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add New Skill Input Row */}
      <form
        onSubmit={handleAddCustom}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
      >
        <div className="relative flex-1">
          <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={customSkillName}
            onChange={(e) => setCustomSkillName(e.target.value)}
            placeholder="Add a technical skill (e.g. React, PostgreSQL, Docker)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value as SkillCategory)}
          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
        >
          {SKILL_CATEGORIES_LIST.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <Button
          type="submit"
          size="small"
          variant="primary"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Skill
        </Button>
      </form>

      {/* Category Tabs & Categorized Chips View */}
      <div className="space-y-4 pt-2">
        {/* Categorized Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SKILL_CATEGORIES_LIST.map((cat) => {
            const catSkills = skillsByCategory(cat);
            return (
              <div
                key={cat}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                    {cat}
                  </h5>
                  <span className="text-[10px] text-slate-400 font-semibold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    {catSkills.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 min-h-[32px]">
                  {catSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium text-[11px] shadow-xs group"
                    >
                      {skill.name}
                      <button
                        type="button"
                        onClick={() => onRemoveSkill(skill.id)}
                        className="text-slate-400 hover:text-rose-500 rounded p-0.5"
                        title={`Remove ${skill.name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  {catSkills.length === 0 && (
                    <span className="text-[11px] text-slate-400 italic py-1">
                      No skills added in this category yet.
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
