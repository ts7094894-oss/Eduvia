import React from 'react';
import { Layout, Check, Sparkles, FileText, AlignLeft, ShieldCheck } from 'lucide-react';
import { ResumeTemplate } from '../../types';

interface TemplateSelectorProps {
  selectedTemplate: ResumeTemplate;
  onSelect: (template: ResumeTemplate) => void;
}

interface TemplateOption {
  id: ResumeTemplate;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  badge?: string;
}

const TEMPLATES: TemplateOption[] = [
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Classic corporate layout with refined typography and structured headers',
    icon: <FileText className="w-4 h-4" />,
    badge: 'Popular',
  },
  {
    id: 'modern',
    name: 'Modern',
    tagline: 'Sleek contemporary design with skill badges and clean section accents',
    icon: <Sparkles className="w-4 h-4" />,
    badge: 'Creative',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Monochrome elegance, high negative space, and disciplined typography',
    icon: <AlignLeft className="w-4 h-4" />,
  },
  {
    id: 'ats',
    name: 'ATS Friendly',
    tagline: 'Strict 1-column linear format guaranteed for corporate ATS scanning',
    icon: <ShieldCheck className="w-4 h-4" />,
    badge: 'High Pass Rate',
  },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Layout className="w-3.5 h-3.5 text-indigo-500" />
          <span>Resume Template</span>
        </label>
        <span className="text-[11px] text-slate-400">
          Live switches layout instant in preview & print
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplate === tmpl.id;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelect(tmpl.id)}
              className={`p-3 rounded-2xl text-left border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`p-1.5 rounded-lg ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {tmpl.icon}
                  </span>

                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>

                <div className="pt-1.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {tmpl.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight mt-0.5">
                    {tmpl.tagline}
                  </p>
                </div>
              </div>

              {tmpl.badge && (
                <span className="inline-block mt-2 self-start px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  {tmpl.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
