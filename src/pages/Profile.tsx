import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button';
import {
  User,
  Mail,
  Shield,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Camera,
  Lock,
  Bell,
  Sun,
  Moon,
  Palette,
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || 'Sai Krishna',
    email: user?.email || 'student@eduvia.com',
    rollNumber: user?.rollNumber || '22B91A0588',
    department: user?.department || 'Computer Science & Engineering',
    cgpa: user?.cgpa || 8.85,
    skills: user?.skills?.join(', ') || 'Python, React, TypeScript, DSA, SQL',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateUser({
        name: formData.name,
        email: formData.email,
        rollNumber: formData.rollNumber,
        department: formData.department,
        cgpa: Number(formData.cgpa),
        skills: formData.skills.split(',').map((s) => s.trim()),
      });
      setIsSaving(false);
      toast.success('Profile Updated!', 'Your student credentials and placement profile are up to date.');
    }, 500);
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-xs font-bold text-indigo-700 dark:text-indigo-300">
          <User className="w-3.5 h-3.5" />
          <span>Institutional Account Profile</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Account Settings & Academic Credentials
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Manage your personal details, academic CGPA verification, and placement preferences.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        {/* User Card */}
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100 dark:border-indigo-950 shadow-md"
            />
            <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-indigo-600 text-white shadow hover:bg-indigo-500">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{user?.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-[10px] font-bold uppercase">
                {user?.role}
              </span>
            </h3>
            <p className="text-xs text-slate-500">{user?.email}</p>
            <p className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
              Roll No: {user?.rollNumber || '22B91A0588'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Institutional Email</label>
              <input
                type="email"
                disabled
                value={formData.email}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">University Roll Number</label>
              <input
                type="text"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Academic Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Cumulative CGPA</label>
              <input
                type="number"
                step="0.01"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Key Technical Skills</label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button type="submit" variant="primary" isLoading={isSaving} leftIcon={<CheckCircle2 className="w-4 h-4" />}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>

      {/* Theme & Display Preferences */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Appearance & Theme Setting
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize EDUVIA interface theme. Your preference is saved independently of device settings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Light Mode Option */}
          <button
            type="button"
            id="profile-set-light-theme-btn"
            onClick={() => setTheme('light')}
            className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
              theme === 'light'
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Light Mode</p>
                <p className="text-[11px] text-slate-500">Default bright, crisp aesthetic</p>
              </div>
            </div>
            {theme === 'light' && (
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-100 dark:ring-indigo-950" />
            )}
          </button>

          {/* Dark Mode Option */}
          <button
            type="button"
            id="profile-set-dark-theme-btn"
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
              theme === 'dark'
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-indigo-400 flex items-center justify-center shadow-sm">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</p>
                <p className="text-[11px] text-slate-500">High-contrast night coding theme</p>
              </div>
            </div>
            {theme === 'dark' && (
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-100 dark:ring-indigo-950" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
