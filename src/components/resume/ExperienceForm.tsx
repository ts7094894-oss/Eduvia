import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Briefcase, Calendar, MapPin } from 'lucide-react';
import { Button } from '../Button';
import { ResumeExperience } from '../../types';

interface ExperienceFormProps {
  experience: ResumeExperience[];
  onAdd: (exp: ResumeExperience) => void;
  onUpdate: (id: string, exp: ResumeExperience) => void;
  onDelete: (id: string) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experience,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formState, setFormState] = useState<Omit<ResumeExperience, 'id'>>({
    company: '',
    position: '',
    role: '',
    location: '',
    startDate: '',
    endDate: 'Present',
    current: false,
    description: '',
  });

  const resetForm = () => {
    setFormState({
      company: '',
      position: '',
      role: '',
      location: '',
      startDate: '',
      endDate: 'Present',
      current: false,
      description: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartEdit = (item: ResumeExperience) => {
    setEditingId(item.id);
    setIsAdding(false);
    setFormState({
      company: item.company,
      position: item.position || item.role || '',
      role: item.role || item.position || '',
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      current: Boolean(item.current),
      description: item.description,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.company.trim() || !formState.position.trim()) return;

    if (editingId) {
      onUpdate(editingId, {
        id: editingId,
        role: formState.position,
        ...formState,
      });
      setEditingId(null);
    } else {
      onAdd({
        id: `exp-${Date.now()}`,
        role: formState.position,
        ...formState,
      });
      setIsAdding(false);
    }
    resetForm();
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-3">
        {experience.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start justify-between gap-3 group"
          >
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {item.position || item.role}
                </h4>
                {item.current && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold text-[10px]">
                    Current Role
                  </span>
                )}
              </div>

              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {item.company}
              </p>

              <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.startDate} – {item.current ? 'Present' : item.endDate}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed pt-1">
                {item.description}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleStartEdit(item)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Edit Experience"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Delete Experience"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {experience.length === 0 && !isAdding && (
          <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-slate-500 text-xs">No experience added yet.</p>
            <Button
              type="button"
              size="small"
              variant="outline"
              onClick={() => setIsAdding(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              + Add Experience
            </Button>
          </div>
        )}
      </div>

      {(isAdding || editingId) && (
        <form
          onSubmit={handleSave}
          className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-3 animate-in fade-in-50"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Work Experience' : 'Add Work Experience'}
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
                Company *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. TechVision Solutions"
                value={formState.company}
                onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Position / Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Junior Web Developer"
                value={formState.position}
                onChange={(e) => setFormState({ ...formState, position: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Bangalore, India / Remote"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Start Date
              </label>
              <input
                type="text"
                placeholder="e.g. Aug 2025"
                value={formState.startDate}
                onChange={(e) => setFormState({ ...formState, startDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                End Date
              </label>
              <input
                type="text"
                disabled={formState.current}
                placeholder="e.g. Present"
                value={formState.current ? 'Present' : formState.endDate}
                onChange={(e) => setFormState({ ...formState, endDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white disabled:opacity-60"
              />
              <label className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={formState.current}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      current: e.target.checked,
                      endDate: e.target.checked ? 'Present' : formState.endDate,
                    })
                  }
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>I currently work here</span>
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Description of Responsibilities
              </label>
              <textarea
                rows={3}
                placeholder="Highlight your responsibilities, team collaboration, stack, and results achieved..."
                value={formState.description}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" size="small" variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" size="small" variant="primary">
              {editingId ? 'Update Experience' : 'Save Experience'}
            </Button>
          </div>
        </form>
      )}

      {!isAdding && !editingId && experience.length > 0 && (
        <Button
          type="button"
          size="small"
          variant="outline"
          onClick={() => setIsAdding(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          + Add Experience
        </Button>
      )}
    </div>
  );
};
