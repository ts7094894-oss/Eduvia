import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Sparkles,
  Code,
  FolderGit2,
  Award,
  Briefcase,
  Building,
  Trophy,
  Languages,
  Target,
  Download,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { ResumeSection } from './ResumeSection';
import { PersonalInfoForm } from './PersonalInfoForm';
import { SummaryForm } from './SummaryForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { CertificationForm } from './CertificationForm';
import { InternshipForm } from './InternshipForm';
import { ExperienceForm } from './ExperienceForm';
import { AchievementsForm } from './AchievementsForm';
import { LanguagesForm } from './LanguagesForm';
import { CareerInterestsForm } from './CareerInterestsForm';
import { TemplateSelector } from './TemplateSelector';
import { ResumeCompletion } from './ResumeCompletion';
import {
  ResumeData,
  ResumeTemplate,
  ResumeSkill,
  SkillCategory,
  Course,
  Certificate,
  User as UserType,
} from '../../types';
import {
  COURSE_SKILL_MAP,
  generateLocalSummary,
  calculateResumeCompletion,
} from '../../data/resumeDefaults';

interface ResumeFormProps {
  resume: ResumeData;
  user: UserType;
  courses: Course[];
  enrolledCourses: Record<string, any>;
  certificates: Certificate[];
  onChange: (updated: ResumeData) => void;
  onSave: () => void;
  onReset: () => void;
  onDownload: () => void;
  onImportFromEduvia: () => void;
  isSaved?: boolean;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  resume,
  user,
  courses,
  enrolledCourses,
  certificates,
  onChange,
  onSave,
  onReset,
  onDownload,
  onImportFromEduvia,
  isSaved = false,
}) => {
  const [showResetModal, setShowResetModal] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [importNotice, setImportNotice] = useState<string | null>(null);

  // Form validation errors
  const errors: Record<string, string> = {};
  if (!resume.personalInfo.fullName.trim()) {
    errors.fullName = 'Full Name is required';
  }
  if (!resume.personalInfo.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resume.personalInfo.email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (!resume.personalInfo.professionalTitle?.trim()) {
    errors.professionalTitle = 'Professional Title is required';
  }

  // Derive suggested skills from student's enrolled / completed courses
  const suggestedSkills: { name: string; category: SkillCategory; sourceCourse: string }[] = [];
  const enrolledCourseIds = Object.keys(enrolledCourses);

  courses.forEach((c) => {
    const isEnrolled = enrolledCourseIds.includes(c.id);
    const hasCert = certificates.some(
      (cert) => cert.courseTitle.toLowerCase() === c.title.toLowerCase()
    );

    if (isEnrolled || hasCert) {
      const skillsForCourse = COURSE_SKILL_MAP[c.title] || c.tags || [];
      skillsForCourse.forEach((skillName) => {
        let category: SkillCategory = 'Web Technologies';
        const sn = skillName.toLowerCase();
        if (sn.includes('python') || sn.includes('java') || sn.includes('script') || sn.includes('c++')) {
          category = 'Programming Languages';
        } else if (sn.includes('react') || sn.includes('node') || sn.includes('tailwind') || sn.includes('html')) {
          category = 'Frameworks';
        } else if (sn.includes('sql') || sn.includes('mongo') || sn.includes('database')) {
          category = 'Databases';
        } else if (sn.includes('aws') || sn.includes('cloud') || sn.includes('docker')) {
          category = 'Cloud';
        } else if (sn.includes('git') || sn.includes('linux')) {
          category = 'Tools';
        }

        if (
          !suggestedSkills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())
        ) {
          suggestedSkills.push({
            name: skillName,
            category,
            sourceCourse: c.title,
          });
        }
      });
    }
  });

  // Handler for Personal Info
  const handlePersonalInfoChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    onChange({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value,
      },
    });
  };

  // Generate Professional Summary locally
  const handleGenerateSummary = () => {
    setIsGeneratingSummary(true);
    setTimeout(() => {
      const generated = generateLocalSummary(resume);
      onChange({
        ...resume,
        summary: generated,
      });
      setIsGeneratingSummary(false);
    }, 300);
  };

  // Import handler with feedback notice
  const handleTriggerImport = () => {
    onImportFromEduvia();
    setImportNotice('Successfully synced data from your EduPath Profile, Courses & Certifications!');
    setTimeout(() => setImportNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Actions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Resume Editor
            </h2>
            {isSaved && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3 h-3" />
                Auto-saved
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Customize every section. Live preview updates in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Import from EduPath Profile */}
          <Button
            type="button"
            size="small"
            variant="secondary"
            onClick={handleTriggerImport}
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-500" />}
          >
            Import from EduPath Profile
          </Button>

          {/* Save Resume */}
          <Button
            type="button"
            size="small"
            variant="outline"
            onClick={onSave}
            leftIcon={<Save className="w-3.5 h-3.5 text-slate-500" />}
          >
            Save Resume
          </Button>

          {/* Download Resume / Print PDF */}
          <Button
            type="button"
            size="small"
            variant="primary"
            onClick={onDownload}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Download Resume (PDF)
          </Button>

          {/* Reset Resume */}
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Reset Resume"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Import Notice */}
      {importNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-3 animate-in fade-in-50">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{importNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setImportNotice(null)}
            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline text-[11px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Completion Score Widget */}
      <ResumeCompletion resume={resume} />

      {/* Template Selector */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
        <TemplateSelector
          selectedTemplate={resume.selectedTemplate || 'professional'}
          onSelect={(tmpl: ResumeTemplate) =>
            onChange({ ...resume, selectedTemplate: tmpl })
          }
        />
      </div>

      {/* 1. PERSONAL INFORMATION */}
      <ResumeSection
        id="section-personal-info"
        title="Personal Information"
        subtitle="Contact details, professional headline and online portfolio links"
        icon={<User className="w-5 h-5" />}
        badge={
          errors.fullName || errors.email || errors.professionalTitle ? (
            <span className="text-[10px] text-rose-500 font-bold bg-rose-50 dark:bg-rose-950 px-1.5 py-0.5 rounded">
              Missing fields
            </span>
          ) : (
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
              Complete
            </span>
          )
        }
      >
        <PersonalInfoForm
          personalInfo={resume.personalInfo}
          onChange={handlePersonalInfoChange}
          errors={errors}
        />
      </ResumeSection>

      {/* 2. CAREER INTERESTS */}
      <ResumeSection
        id="section-career-interests"
        title="Career Interests & Target Roles"
        subtitle="Used for automatic job matching calculations and tailored recommendations"
        icon={<Target className="w-5 h-5" />}
        defaultOpen={false}
      >
        <CareerInterestsForm
          selectedInterests={resume.careerInterests || []}
          onChange={(interests) => onChange({ ...resume, careerInterests: interests })}
        />
      </ResumeSection>

      {/* 3. PROFESSIONAL SUMMARY */}
      <ResumeSection
        id="section-summary"
        title="Professional Summary"
        subtitle="Executive pitch detailing your engineering strengths and career objectives"
        icon={<Sparkles className="w-5 h-5" />}
      >
        <SummaryForm
          summary={resume.summary}
          onChange={(val) => onChange({ ...resume, summary: val })}
          onGenerate={handleGenerateSummary}
          isGenerating={isGeneratingSummary}
        />
      </ResumeSection>

      {/* 4. TECHNICAL SKILLS */}
      <ResumeSection
        id="section-skills"
        title="Technical Skills"
        subtitle="Programming languages, frameworks, databases, and development tools"
        icon={<Code className="w-5 h-5" />}
        badge={
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
            {(resume.categorizedSkills?.length || resume.skills?.length || 0)} Skills
          </span>
        }
      >
        <SkillsForm
          skills={
            resume.categorizedSkills && resume.categorizedSkills.length > 0
              ? resume.categorizedSkills
              : resume.skills.map((s, idx) => ({
                  id: `skill-${idx}`,
                  name: typeof s === 'string' ? s : (s as any).name,
                  category: 'Other Skills',
                }))
          }
          suggestedSkills={suggestedSkills}
          onAddSkill={(skill) => {
            const current = resume.categorizedSkills || [];
            const updated = [...current, skill];
            onChange({
              ...resume,
              categorizedSkills: updated,
              skills: updated.map((s) => s.name),
            });
          }}
          onRemoveSkill={(skillId) => {
            const current = resume.categorizedSkills || [];
            const updated = current.filter((s) => s.id !== skillId);
            onChange({
              ...resume,
              categorizedSkills: updated,
              skills: updated.map((s) => s.name),
            });
          }}
          onAddMultipleSkills={(newSkills) => {
            const current = resume.categorizedSkills || [];
            const updated = [...current, ...newSkills];
            onChange({
              ...resume,
              categorizedSkills: updated,
              skills: updated.map((s) => s.name),
            });
          }}
        />
      </ResumeSection>

      {/* 5. EDUCATION */}
      <ResumeSection
        id="section-education"
        title="Education"
        subtitle="Collegiate degrees, specializations, graduation years and academic marks"
        icon={<GraduationCap className="w-5 h-5" />}
        badge={
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            {resume.education?.length || 0} Entries
          </span>
        }
      >
        <EducationForm
          education={resume.education || []}
          onAdd={(edu) => onChange({ ...resume, education: [...(resume.education || []), edu] })}
          onUpdate={(id, updated) =>
            onChange({
              ...resume,
              education: (resume.education || []).map((e) => (e.id === id ? updated : e)),
            })
          }
          onDelete={(id) =>
            onChange({
              ...resume,
              education: (resume.education || []).filter((e) => e.id !== id),
            })
          }
        />
      </ResumeSection>

      {/* 6. PROJECTS */}
      <ResumeSection
        id="section-projects"
        title="Technical Projects"
        subtitle="Software engineering projects, repositories, live URLs and tech stacks"
        icon={<FolderGit2 className="w-5 h-5" />}
        badge={
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
            {resume.projects?.length || 0} Projects
          </span>
        }
      >
        <ProjectsForm
          projects={resume.projects || []}
          onAdd={(proj) => onChange({ ...resume, projects: [...(resume.projects || []), proj] })}
          onUpdate={(id, updated) =>
            onChange({
              ...resume,
              projects: (resume.projects || []).map((p) => (p.id === id ? updated : p)),
            })
          }
          onDelete={(id) =>
            onChange({
              ...resume,
              projects: (resume.projects || []).filter((p) => p.id !== id),
            })
          }
          onReorder={(newOrder) => onChange({ ...resume, projects: newOrder })}
        />
      </ResumeSection>

      {/* 7. CERTIFICATIONS */}
      <ResumeSection
        id="section-certifications"
        title="Certifications & Verified Credentials"
        subtitle="Integrated with EduPath course certificates and external credentials"
        icon={<Award className="w-5 h-5" />}
        badge={
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
            {resume.certifications?.length || 0} Verified
          </span>
        }
      >
        <CertificationForm
          certifications={resume.certifications || []}
          eduviaCertificates={certificates}
          onAdd={(cert) =>
            onChange({ ...resume, certifications: [...(resume.certifications || []), cert] })
          }
          onUpdate={(id, updated) =>
            onChange({
              ...resume,
              certifications: (resume.certifications || []).map((c) => (c.id === id ? updated : c)),
            })
          }
          onDelete={(id) =>
            onChange({
              ...resume,
              certifications: (resume.certifications || []).filter((c) => c.id !== id),
            })
          }
        />
      </ResumeSection>

      {/* 8. INTERNSHIPS */}
      <ResumeSection
        id="section-internships"
        title="Internships"
        subtitle="Summer internships, industrial training, and practical work experience"
        icon={<Building className="w-5 h-5" />}
        defaultOpen={false}
      >
        <InternshipForm
          internships={resume.internships || []}
          onAdd={(item) =>
            onChange({ ...resume, internships: [...(resume.internships || []), item] })
          }
          onUpdate={(id, updated) =>
            onChange({
              ...resume,
              internships: (resume.internships || []).map((i) => (i.id === id ? updated : i)),
            })
          }
          onDelete={(id) =>
            onChange({
              ...resume,
              internships: (resume.internships || []).filter((i) => i.id !== id),
            })
          }
        />
      </ResumeSection>

      {/* 9. WORK EXPERIENCE */}
      <ResumeSection
        id="section-experience"
        title="Work Experience"
        subtitle="Full-time, part-time, or contract software development roles"
        icon={<Briefcase className="w-5 h-5" />}
        defaultOpen={false}
      >
        <ExperienceForm
          experience={resume.experience || []}
          onAdd={(exp) =>
            onChange({ ...resume, experience: [...(resume.experience || []), exp] })
          }
          onUpdate={(id, updated) =>
            onChange({
              ...resume,
              experience: (resume.experience || []).map((e) => (e.id === id ? updated : e)),
            })
          }
          onDelete={(id) =>
            onChange({
              ...resume,
              experience: (resume.experience || []).filter((e) => e.id !== id),
            })
          }
        />
      </ResumeSection>

      {/* 10. ACHIEVEMENTS */}
      <ResumeSection
        id="section-achievements"
        title="Achievements & Honors"
        subtitle="Hackathons, coding competition rankings, scholarships and academic merits"
        icon={<Trophy className="w-5 h-5" />}
        defaultOpen={false}
      >
        <AchievementsForm
          achievements={resume.achievements || []}
          onAdd={(item) =>
            onChange({ ...resume, achievements: [...(resume.achievements || []), item] })
          }
          onUpdate={(index, updated) => {
            const list = [...(resume.achievements || [])];
            list[index] = updated;
            onChange({ ...resume, achievements: list });
          }}
          onDelete={(index) => {
            const list = [...(resume.achievements || [])];
            list.splice(index, 1);
            onChange({ ...resume, achievements: list });
          }}
        />
      </ResumeSection>

      {/* 11. LANGUAGES */}
      <ResumeSection
        id="section-languages"
        title="Languages"
        subtitle="Spoken and written languages with fluency levels"
        icon={<Languages className="w-5 h-5" />}
        defaultOpen={false}
      >
        <LanguagesForm
          languages={resume.languages || []}
          onAdd={(lang) =>
            onChange({ ...resume, languages: [...(resume.languages || []), lang] })
          }
          onUpdate={(index, updated) => {
            const list = [...(resume.languages || [])];
            list[index] = updated;
            onChange({ ...resume, languages: list });
          }}
          onDelete={(index) => {
            const list = [...(resume.languages || [])];
            list.splice(index, 1);
            onChange({ ...resume, languages: list });
          }}
        />
      </ResumeSection>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="primary"
            onClick={onDownload}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Download Resume (PDF)
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onSave}
            leftIcon={<Save className="w-4 h-4 text-slate-500" />}
          >
            Save Draft
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          className="text-xs text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Confirmation Modal for Reset */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset Resume?"
      >
        <div className="space-y-4 text-xs">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              This will remove your saved resume information from this browser. You can always re-import from your EduPath Profile or restore initial sample data.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="small"
              onClick={() => setShowResetModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              size="small"
              onClick={() => {
                onReset();
                setShowResetModal(false);
              }}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Reset Resume
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
