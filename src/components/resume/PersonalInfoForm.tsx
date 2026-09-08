import React from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, Briefcase, Camera } from 'lucide-react';
import { ResumeData } from '../../types';

interface PersonalInfoFormProps {
  personalInfo: ResumeData['personalInfo'];
  onChange: (field: keyof ResumeData['personalInfo'], value: string) => void;
  errors?: Record<string, string>;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  personalInfo,
  onChange,
  errors = {} as Record<string, string>,
}) => {
  return (
    <div className="space-y-4 text-xs">
      {/* Photo & Basic Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
        <div className="relative group shrink-0">
          <img
            src={
              personalInfo.profilePhoto ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80'
            }
            alt={personalInfo.fullName || 'User Profile'}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/30 border border-slate-200 dark:border-slate-700"
          />
          <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
            <Camera className="w-5 h-5" />
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <label className="block font-semibold text-slate-700 dark:text-slate-300">
            Profile Photo URL (Optional)
          </label>
          <input
            type="url"
            value={personalInfo.profilePhoto || ''}
            onChange={(e) => onChange('profilePhoto', e.target.value)}
            placeholder="https://images.unsplash.com/... or paste image URL"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-[10px] text-slate-500">
            Visible in modern & professional templates. Leave blank if preferring ATS text-only format.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              placeholder="e.g. John Doe"
              className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${
                errors.fullName
                  ? 'border-rose-500 bg-rose-50/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
              } text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
          </div>
          {errors.fullName && (
            <p className="text-[10px] text-rose-500 font-semibold mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Professional Title */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Professional Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.professionalTitle || ''}
              onChange={(e) => onChange('professionalTitle', e.target.value)}
              placeholder="e.g. Computer Science Student / Full Stack Developer"
              className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${
                errors.professionalTitle
                  ? 'border-rose-500 bg-rose-50/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
              } text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
          </div>
          {errors.professionalTitle && (
            <p className="text-[10px] text-rose-500 font-semibold mt-1">{errors.professionalTitle}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="e.g. student@edupath.com"
              className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${
                errors.email
                  ? 'border-rose-500 bg-rose-50/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
              } text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
          </div>
          {errors.email && (
            <p className="text-[10px] text-rose-500 font-semibold mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Location (City, State, Country)
          </label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="e.g. Hyderabad, Telangana, India"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            LinkedIn Profile URL
          </label>
          <div className="relative">
            <Linkedin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.linkedin}
              onChange={(e) => onChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/yourname"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            GitHub Profile URL
          </label>
          <div className="relative">
            <Github className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.github}
              onChange={(e) => onChange('github', e.target.value)}
              placeholder="github.com/yourusername"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Portfolio */}
        <div className="sm:col-span-2">
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Portfolio / Personal Website URL
          </label>
          <div className="relative">
            <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.portfolio}
              onChange={(e) => onChange('portfolio', e.target.value)}
              placeholder="https://yourportfolio.dev"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
