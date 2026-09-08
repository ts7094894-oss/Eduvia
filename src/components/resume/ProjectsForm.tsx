import React, { useState } from 'react';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, FolderGit2, Globe, Github, Tag, UserCheck } from 'lucide-react';
import { Button } from '../Button';
import { ResumeProject } from '../../types';

interface ProjectsFormProps {
  projects: ResumeProject[];
  onAdd: (project: ResumeProject) => void;
  onUpdate: (id: string, project: ResumeProject) => void;
  onDelete: (id: string) => void;
  onReorder: (newOrder: ResumeProject[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({
  projects,
  onAdd,
  onUpdate,
  onDelete,
  onReorder,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formState, setFormState] = useState<Omit<ResumeProject, 'id'>>({
    name: '',
    description: '',
    technologies: '',
    role: '',
    link: '',
    githubLink: '',
  });

  const resetForm = () => {
    setFormState({
      name: '',
      description: '',
      technologies: '',
      role: '',
      link: '',
      githubLink: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartEdit = (proj: ResumeProject) => {
    setEditingId(proj.id);
    setIsAdding(false);
    setFormState({
      name: proj.name || proj.title || '',
      description: proj.description,
      technologies: proj.technologies,
      role: proj.role || '',
      link: proj.link || '',
      githubLink: proj.githubLink || '',
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.technologies.trim()) return;

    if (editingId) {
      onUpdate(editingId, {
        id: editingId,
        title: formState.name,
        ...formState,
      });
      setEditingId(null);
    } else {
      onAdd({
        id: `proj-${Date.now()}`,
        title: formState.name,
        ...formState,
      });
      setIsAdding(false);
    }
    resetForm();
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onReorder(updated);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Existing Projects List */}
      <div className="space-y-3">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col gap-3 group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {proj.name || proj.title}
                  </h4>
                  {proj.role && (
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold text-[10px]">
                      {proj.role}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                  <Tag className="w-3 h-3" />
                  <span>{proj.technologies}</span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed pt-1">
                  {proj.description}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-600 flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {proj.githubLink && (
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-600 flex items-center gap-1"
                    >
                      <Github className="w-3 h-3" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Actions & Reorder controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveItem(idx, 'up')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === projects.length - 1}
                  onClick={() => moveItem(idx, 'down')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStartEdit(proj)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Edit Project"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(proj.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && !isAdding && (
          <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-slate-500 text-xs">No technical projects added yet.</p>
            <Button
              type="button"
              size="small"
              variant="outline"
              onClick={() => setIsAdding(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add First Project
            </Button>
          </div>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      {(isAdding || editingId) && (
        <form
          onSubmit={handleSave}
          className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-3 animate-in fade-in-50"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Project' : 'Add New Project'}
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
                Project Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AI Automated Placement Portal"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Role in Project
              </label>
              <input
                type="text"
                placeholder="e.g. Full Stack Developer / Team Lead"
                value={formState.role}
                onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Technologies Used *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. React, TypeScript, Node.js, PostgreSQL, Docker"
                value={formState.technologies}
                onChange={(e) => setFormState({ ...formState, technologies: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Project Description *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Detail key problems solved, engineering challenges, architecture choices, and measurable results (e.g. Reduced processing latency by 40%)..."
                value={formState.description}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Live Demo / Project URL
              </label>
              <input
                type="url"
                placeholder="https://myproject.app"
                value={formState.link}
                onChange={(e) => setFormState({ ...formState, link: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/repo"
                value={formState.githubLink}
                onChange={(e) => setFormState({ ...formState, githubLink: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" size="small" variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" size="small" variant="primary">
              {editingId ? 'Update Project' : 'Save Project'}
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
          Add Project
        </Button>
      )}
    </div>
  );
};
