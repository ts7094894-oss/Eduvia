import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Languages } from 'lucide-react';
import { Button } from '../Button';
import { ResumeLanguage } from '../../types';

interface LanguagesFormProps {
  languages: (string | ResumeLanguage)[];
  onAdd: (lang: ResumeLanguage) => void;
  onUpdate: (index: number, lang: ResumeLanguage) => void;
  onDelete: (index: number) => void;
}

const PROFICIENCY_OPTIONS: ResumeLanguage['proficiency'][] = [
  'Native',
  'Fluent',
  'Advanced',
  'Intermediate',
  'Basic',
];

export const LanguagesForm: React.FC<LanguagesFormProps> = ({
  languages,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [formState, setFormState] = useState<{
    name: string;
    proficiency: ResumeLanguage['proficiency'];
  }>({
    name: '',
    proficiency: 'Fluent',
  });

  const resetForm = () => {
    setFormState({ name: '', proficiency: 'Fluent' });
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleStartEdit = (item: string | ResumeLanguage, index: number) => {
    setEditingIndex(index);
    setIsAdding(false);
    if (typeof item === 'string') {
      const match = item.match(/^(.*?)(?:\s*\((.*?)\))?$/);
      setFormState({
        name: match?.[1] || item,
        proficiency: (match?.[2] as ResumeLanguage['proficiency']) || 'Fluent',
      });
    } else {
      setFormState({
        name: item.name,
        proficiency: item.proficiency,
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) return;

    const newItem: ResumeLanguage = {
      id: `lang-${Date.now()}`,
      name: formState.name.trim(),
      proficiency: formState.proficiency,
    };

    if (editingIndex !== null) {
      onUpdate(editingIndex, newItem);
    } else {
      onAdd(newItem);
    }
    resetForm();
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-wrap gap-2">
        {languages.map((item, index) => {
          const name = typeof item === 'string' ? item.split('(')[0].trim() : item.name;
          const prof =
            typeof item === 'string'
              ? item.includes('(')
                ? item.split('(')[1].replace(')', '').trim()
                : ''
              : item.proficiency;

          return (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 shadow-xs"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-bold text-xs">{name}</span>
              {prof && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 font-medium">
                  {prof}
                </span>
              )}

              <button
                type="button"
                onClick={() => handleStartEdit(item, index)}
                className="text-slate-400 hover:text-indigo-600 ml-1"
                title="Edit language"
              >
                <Edit3 className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(index)}
                className="text-slate-400 hover:text-rose-500"
                title="Remove language"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          );
        })}

        {languages.length === 0 && !isAdding && (
          <p className="text-slate-400 italic py-1">No languages added yet.</p>
        )}
      </div>

      {(isAdding || editingIndex !== null) && (
        <form
          onSubmit={handleSave}
          className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-3 animate-in fade-in-50"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 dark:text-white">
              {editingIndex !== null ? 'Edit Language' : 'Add Language'}
            </h4>
            <button
              type="button"
              onClick={resetForm}
              className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Language Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. English, Telugu, Hindi, German"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Proficiency Level
              </label>
              <select
                value={formState.proficiency}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    proficiency: e.target.value as ResumeLanguage['proficiency'],
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
              >
                {PROFICIENCY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <Button type="button" size="small" variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" size="small" variant="primary">
              {editingIndex !== null ? 'Update Language' : 'Save Language'}
            </Button>
          </div>
        </form>
      )}

      {!isAdding && editingIndex === null && (
        <Button
          type="button"
          size="small"
          variant="outline"
          onClick={() => setIsAdding(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Language
        </Button>
      )}
    </div>
  );
};
