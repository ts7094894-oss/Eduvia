import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Trophy, Calendar } from 'lucide-react';
import { Button } from '../Button';
import { ResumeAchievement } from '../../types';

interface AchievementsFormProps {
  achievements: (string | ResumeAchievement)[];
  onAdd: (item: ResumeAchievement) => void;
  onUpdate: (index: number, item: ResumeAchievement) => void;
  onDelete: (index: number) => void;
}

export const AchievementsForm: React.FC<AchievementsFormProps> = ({
  achievements,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [formState, setFormState] = useState<Omit<ResumeAchievement, 'id'>>({
    title: '',
    description: '',
    date: '2025',
  });

  const resetForm = () => {
    setFormState({ title: '', description: '', date: '2025' });
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleStartEdit = (item: string | ResumeAchievement, index: number) => {
    setEditingIndex(index);
    setIsAdding(false);
    if (typeof item === 'string') {
      setFormState({
        title: item,
        description: '',
        date: '2025',
      });
    } else {
      setFormState({
        title: item.title,
        description: item.description || '',
        date: item.date || '2025',
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    const newItem: ResumeAchievement = {
      id: `ach-${Date.now()}`,
      ...formState,
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
      <div className="space-y-3">
        {achievements.map((item, index) => {
          const title = typeof item === 'string' ? item : item.title;
          const description = typeof item === 'string' ? '' : item.description;
          const date = typeof item === 'string' ? '' : item.date;

          return (
            <div
              key={index}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {title}
                  </h4>
                  {date && (
                    <span className="text-[10px] text-slate-400 font-medium ml-1">
                      ({date})
                    </span>
                  )}
                </div>

                {description && (
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed pl-5">
                    {description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStartEdit(item, index)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Edit Achievement"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(index)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Delete Achievement"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {achievements.length === 0 && !isAdding && (
          <div className="text-center py-5 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <Trophy className="w-7 h-7 text-slate-400 mx-auto" />
            <p className="text-slate-500 text-xs">No honors or achievements added yet.</p>
            <Button
              type="button"
              size="small"
              variant="outline"
              onClick={() => setIsAdding(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Achievement
            </Button>
          </div>
        )}
      </div>

      {(isAdding || editingIndex !== null) && (
        <form
          onSubmit={handleSave}
          className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-3 animate-in fade-in-50"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 dark:text-white">
              {editingIndex !== null ? 'Edit Achievement' : 'Add Achievement'}
            </h4>
            <button
              type="button"
              onClick={resetForm}
              className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Achievement Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 1st Place - National Smart Campus Hackathon"
                value={formState.title}
                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Year / Date
              </label>
              <input
                type="text"
                placeholder="e.g. 2025"
                value={formState.date}
                onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Details / Impact
              </label>
              <textarea
                rows={2}
                placeholder="Briefly describe the competition scale, recognition, or metric (e.g. Selected among 150+ teams)..."
                value={formState.description}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" size="small" variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" size="small" variant="primary">
              {editingIndex !== null ? 'Update Achievement' : 'Save Achievement'}
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
          Add Achievement
        </Button>
      )}
    </div>
  );
};
