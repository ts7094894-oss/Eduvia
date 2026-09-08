import React, { useState } from 'react';
import { Plus, Trash2, Edit3, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { Button } from '../Button';
import { ResumeEducation } from '../../types';

interface EducationFormProps {
  education: ResumeEducation[];
  onAdd: (item: ResumeEducation) => void;
  onUpdate: (id: string, updated: ResumeEducation) => void;
  onDelete: (id: string) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  education,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formState, setFormState] = useState<Omit<ResumeEducation, 'id'>>({
    degree: '',
    specialization: '',
    institution: '',
    college: '',
    location: '',
    startYear: '2022',
    graduationYear: '2026',
    cgpa: '',
    fieldOfStudy: '',
  });

  const resetForm = () => {
    setFormState({
      degree: '',
      specialization: '',
      institution: '',
      college: '',
      location: '',
      startYear: '2022',
      graduationYear: '2026',
      cgpa: '',
      fieldOfStudy: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartEdit = (item: ResumeEducation) => {
    setEditingId(item.id);
    setIsAdding(false);
    setFormState({
      degree: item.degree,
      specialization: item.specialization || '',
      institution: item.institution || item.college || '',
      college: item.college || item.institution || '',
      location: item.location || '',
      startYear: item.startYear || '2022',
      graduationYear: item.graduationYear || '2026',
      cgpa: item.cgpa || '',
      fieldOfStudy: item.fieldOfStudy || '',
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.degree.trim() || !formState.institution.trim()) return;

    if (editingId) {
      onUpdate(editingId, {
        id: editingId,
        ...formState,
        college: formState.institution,
      });
      setEditingId(null);
    } else {
      onAdd({
        id: `edu-${Date.now()}`,
        ...formState,
        college: formState.institution,
      });
      setIsAdding(false);
    }
    resetForm();
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Existing Education Entries List */}
      <div className="space-y-3">
        {education.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-start justify-between gap-3 group"
          >
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {item.degree}
                </h4>
                {item.cgpa && (
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-[10px]">
                    CGPA: {item.cgpa}
                  </span>
                )}
              </div>

              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {item.institution || item.college}
              </p>

              {item.specialization && (
                <p className="text-[10px] text-slate-500">
                  Specialization: {item.specialization}
                </p>
              )}

              <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.startYear} – {item.graduationYear}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
              <button
                type="button"
                onClick={() => handleStartEdit(item)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Edit entry"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Delete entry"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {education.length === 0 && !isAdding && (
          <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <GraduationCap className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-slate-500 text-xs">No education qualifications added yet.</p>
            <Button
              type="button"
              size="small"
              variant="outline"
              onClick={() => setIsAdding(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add First Degree
            </Button>
          </div>
        )}
      </div>

      {/* Add / Edit Form Modal/Drawer Container */}
      {(isAdding || editingId) && (
        <form
          onSubmit={handleSave}
          className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-4 animate-in fade-in-50"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Education Entry' : 'Add New Education'}
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
                Degree *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. B.Tech in Computer Science & Engineering"
                value={formState.degree}
                onChange={(e) => setFormState({ ...formState, degree: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Specialization / Major
              </label>
              <input
                type="text"
                placeholder="e.g. Artificial Intelligence / Cloud Computing"
                value={formState.specialization}
                onChange={(e) => setFormState({ ...formState, specialization: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                College / University *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. EduPath Institute of Engineering & Technology"
                value={formState.institution}
                onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Hyderabad, India"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                CGPA / Percentage
              </label>
              <input
                type="text"
                placeholder="e.g. 8.85 / 10.0 or 85%"
                value={formState.cgpa}
                onChange={(e) => setFormState({ ...formState, cgpa: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Start Year
              </label>
              <input
                type="text"
                placeholder="e.g. 2022"
                value={formState.startYear}
                onChange={(e) => setFormState({ ...formState, startYear: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Graduation Year
              </label>
              <input
                type="text"
                placeholder="e.g. 2026"
                value={formState.graduationYear}
                onChange={(e) => setFormState({ ...formState, graduationYear: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" size="small" variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" size="small" variant="primary">
              {editingId ? 'Update Education' : 'Save Education'}
            </Button>
          </div>
        </form>
      )}

      {/* Button to open add form */}
      {!isAdding && !editingId && (
        <Button
          type="button"
          size="small"
          variant="outline"
          onClick={() => setIsAdding(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Education
        </Button>
      )}
    </div>
  );
};
