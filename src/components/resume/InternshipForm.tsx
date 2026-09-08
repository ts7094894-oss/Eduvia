import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Building, Calendar, MapPin, Briefcase } from 'lucide-react';
import { Button } from '../Button';
import { ResumeInternship } from '../../types';

interface InternshipFormProps {
  internships: ResumeInternship[];
  onAdd: (internship: ResumeInternship) => void;
  onUpdate: (id: string, internship: ResumeInternship) => void;
  onDelete: (id: string) => void;
}

export const InternshipForm: React.FC<InternshipFormProps> = ({
  internships,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formState, setFormState] = useState<Omit<ResumeInternship, 'id'>>({
    company: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const resetForm = () => {
    setFormState({
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartEdit = (item: ResumeInternship) => {
    setEditingId(item.id);
    setIsAdding(false);
    setFormState({
      company: item.company,
      role: item.role,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      description: item.description,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.company.trim() || !formState.role.trim()) return;

    if (editingId) {
      onUpdate(editingId, {
        id: editingId,
        ...formState,
      });
      setEditingId(null);
    } else {
      onAdd({
        id: `intern-${Date.now()}`,
        ...formState,
      });
      setIsAdding(false);
    }
    resetForm();
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-3">
        {internships.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start justify-between gap-3 group"
          >
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {item.role}
                </h4>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold text-[10px]">
                  Internship
                </span>
              </div>

              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {item.company}
              </p>

              <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.startDate} – {item.endDate}
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
                title="Edit Internship"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Delete Internship"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {internships.length === 0 && !isAdding && (
          <div className="text-center py-5 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <Briefcase className="w-7 h-7 text-slate-400 mx-auto" />
            <p className="text-slate-500 text-xs">No internships added yet.</p>
            <Button
              type="button"
              size="small"
              variant="outline"
              onClick={() => setIsAdding(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Internship
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
              {editingId ? 'Edit Internship' : 'Add New Internship'}
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
                Company Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. InnovateX Software Labs"
                value={formState.company}
                onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Intern Role *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Frontend Engineering Intern"
                value={formState.role}
                onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Hyderabad, India (Hybrid) or Remote"
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
                placeholder="e.g. May 2025"
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
                placeholder="e.g. July 2025"
                value={formState.endDate}
                onChange={(e) => setFormState({ ...formState, endDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Responsibilities & Impact
              </label>
              <textarea
                rows={3}
                placeholder="Describe your contributions, key technologies applied, and measurable outcomes..."
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
              {editingId ? 'Update Internship' : 'Save Internship'}
            </Button>
          </div>
        </form>
      )}

      {!isAdding && !editingId && (
        <Button
          type="button"
          size="small"
          variant="outline"
          onClick={() => setIsAdding(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Internship
        </Button>
      )}
    </div>
  );
};
