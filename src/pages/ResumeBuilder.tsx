import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button';
import { ResumeForm } from '../components/resume/ResumeForm';
import { ResumePreview } from '../components/resume/ResumePreview';
import {
  DEFAULT_RESUME_DATA,
  calculateResumeCompletion,
  COURSE_SKILL_MAP,
} from '../data/resumeDefaults';
import { ResumeData, ResumeSkill, SkillCategory, ResumeTemplate } from '../types';
import {
  FileText,
  Download,
  Save,
  RotateCcw,
  Sparkles,
  Eye,
  Edit3,
  CheckCircle2,
  Share2,
  Printer,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

const STORAGE_KEY = 'eduvia_resume';
const LEGACY_STORAGE_KEY = 'eduvia_resume_draft';
const CONTEXT_STORAGE_KEY = 'eduvia_resume_data';

export const ResumeBuilder: React.FC = () => {
  const { user } = useAuth();
  const {
    courses,
    enrolledCourses,
    certificates,
    updateResumeData,
  } = useData();
  const toast = useToast();

  const previewRef = useRef<HTMLDivElement>(null);

  // Active view on mobile: 'form' | 'preview'
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');
  const [isSaved, setIsSaved] = useState(false);

  // Resume state initialized from localStorage or default data
  const [resume, setResume] = useState<ResumeData>(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem(CONTEXT_STORAGE_KEY) ||
        localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Normalize fields if old format
        return {
          ...DEFAULT_RESUME_DATA,
          ...parsed,
          personalInfo: {
            ...DEFAULT_RESUME_DATA.personalInfo,
            ...(parsed.personalInfo || {}),
            fullName: parsed.personalInfo?.fullName || parsed.fullName || user?.name || DEFAULT_RESUME_DATA.personalInfo.fullName,
            email: parsed.personalInfo?.email || parsed.email || user?.email || DEFAULT_RESUME_DATA.personalInfo.email,
            professionalTitle:
              parsed.personalInfo?.professionalTitle ||
              parsed.professionalTitle ||
              DEFAULT_RESUME_DATA.personalInfo.professionalTitle,
          },
          selectedTemplate: parsed.selectedTemplate || 'professional',
        };
      }
    } catch (e) {
      console.error('Error loading saved resume:', e);
    }
    return DEFAULT_RESUME_DATA;
  });

  // Auto-persist to localStorage on state changes (debounced)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
      localStorage.setItem(CONTEXT_STORAGE_KEY, JSON.stringify(resume));
      // Update global context so job applications and matching stay in sync
      updateResumeData(resume);
      setIsSaved(true);
      const timer = setTimeout(() => setIsSaved(false), 3000);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Failed to auto-save resume:', err);
    }
  }, [resume, updateResumeData]);

  // Handle explicit manual save
  const handleManualSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
      localStorage.setItem(CONTEXT_STORAGE_KEY, JSON.stringify(resume));
      updateResumeData(resume);
      setIsSaved(true);
      toast.success('Resume Saved!', 'All resume sections and templates have been saved to this browser.');
    } catch (err) {
      toast.error('Save Failed', 'Could not write to local storage.');
    }
  };

  // Handle Print / PDF Download
  const handleDownload = () => {
    // Check basic completeness
    if (!resume.personalInfo.fullName.trim() || !resume.personalInfo.email.trim()) {
      toast.warning('Incomplete Details', 'Please enter your Full Name and Email before exporting.');
    }
    toast.info('Preparing Document...', 'Opening print dialog. Select "Save as PDF" to download your high-resolution ATS resume.');
    setTimeout(() => {
      window.print();
    }, 250);
  };

  // Handle Reset Resume to empty/clean draft
  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    setResume({
      ...DEFAULT_RESUME_DATA,
      personalInfo: {
        fullName: user?.name || '',
        professionalTitle: user?.degree ? `${user.degree} Graduate` : 'Software Engineering Student',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.college ? `${user.college}, India` : '',
        profilePhoto: user?.avatar || '',
        linkedin: '',
        github: '',
        portfolio: '',
      },
      summary: '',
      education: user?.college
        ? [
            {
              id: 'edu-reset-1',
              degree: user.degree || 'Bachelor of Technology',
              institution: user.college,
              college: user.college,
              cgpa: user.cgpa ? String(user.cgpa) : '',
              startYear: '2022',
              graduationYear: user.graduationYear || '2026',
            },
          ]
        : [],
      experience: [],
      internships: [],
      projects: [],
      skills: [],
      categorizedSkills: [],
      certifications: [],
      achievements: [],
      languages: [
        { id: 'l1', name: 'English', proficiency: 'Fluent' },
      ],
      careerInterests: ['Software Developer'],
      selectedTemplate: 'professional',
    });
    toast.info('Resume Reset', 'Saved resume draft has been cleared.');
  };

  // Handle Import from EDUVIA Profile
  const handleImportFromEduvia = () => {
    if (!user) return;

    // Collect verified course certificates
    const verifiedCertifications = certificates.map((cert) => ({
      id: `cert-${cert.id}`,
      name: cert.courseTitle,
      issuer: 'EDUVIA Learning Platform',
      issueDate: cert.issueDate,
      date: cert.issueDate,
      certificateId: cert.certificateId || cert.certificateNumber || 'EDUVIA-CERT',
      certificateUrl: cert.verificationUrl || `https://eduvia.edu/verify/${cert.certificateId}`,
      isEduviaVerified: true,
    }));

    // Auto-extract skills from enrolled/completed courses
    const importedSkills: ResumeSkill[] = [...(resume.categorizedSkills || [])];
    const enrolledIds = Object.keys(enrolledCourses);

    courses.forEach((c) => {
      if (enrolledIds.includes(c.id) || certificates.some((crt) => crt.courseTitle === c.title)) {
        const cSkills = COURSE_SKILL_MAP[c.title] || c.tags || [];
        cSkills.forEach((s) => {
          if (!importedSkills.some((sk) => sk.name.toLowerCase() === s.toLowerCase())) {
            let cat: SkillCategory = 'Web Technologies';
            const sLow = s.toLowerCase();
            if (sLow.includes('python') || sLow.includes('java') || sLow.includes('script') || sLow.includes('c++')) {
              cat = 'Programming Languages';
            } else if (sLow.includes('react') || sLow.includes('node') || sLow.includes('tailwind')) {
              cat = 'Frameworks';
            } else if (sLow.includes('sql') || sLow.includes('database')) {
              cat = 'Databases';
            } else if (sLow.includes('cloud') || sLow.includes('aws') || sLow.includes('docker')) {
              cat = 'Cloud';
            } else if (sLow.includes('git')) {
              cat = 'Tools';
            }
            importedSkills.push({
              id: `skill-imp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
              name: s,
              category: cat,
            });
          }
        });
      }
    });

    // Merge education if profile has collegiate details
    const importedEducation = [...resume.education];
    if (user.college && !importedEducation.some((e) => e.institution?.toLowerCase() === user.college?.toLowerCase())) {
      importedEducation.unshift({
        id: `edu-eduvia-${Date.now()}`,
        degree: user.degree || 'B.Tech in Computer Science & Engineering',
        institution: user.college,
        college: user.college,
        location: 'India',
        startYear: '2022',
        graduationYear: user.graduationYear || '2026',
        cgpa: user.cgpa ? String(user.cgpa) : '8.85',
      });
    }

    const updated: ResumeData = {
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        fullName: user.name || resume.personalInfo.fullName,
        email: user.email || resume.personalInfo.email,
        phone: user.phone || resume.personalInfo.phone,
        location: user.college ? `${user.college}, India` : resume.personalInfo.location,
        profilePhoto: user.avatar || resume.personalInfo.profilePhoto,
        professionalTitle:
          resume.personalInfo.professionalTitle ||
          (user.degree ? `${user.degree} Student` : 'Computer Science Student'),
      },
      education: importedEducation,
      categorizedSkills: importedSkills,
      skills: importedSkills.map((s) => s.name),
      certifications: [
        ...verifiedCertifications,
        ...resume.certifications.filter((c) => !c.isEduviaVerified),
      ],
    };

    setResume(updated);
    toast.success(
      'EDUVIA Profile Imported',
      'Synced name, verified course certificates, and recommended skills into your resume.'
    );
  };

  const { score } = calculateResumeCompletion(resume);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Student Career Toolkit</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600 dark:text-slate-300">Resume Builder</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <FileText className="w-6 h-6" />
            </span>
            EDUVIA Resume Builder
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Build a professional, job-ready resume from your skills, education, projects and achievements.
          </p>
        </div>

        {/* Action Header Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="small"
            onClick={handleManualSave}
            leftIcon={<Save className="w-4 h-4 text-slate-500" />}
          >
            Save Resume
          </Button>

          <Button
            type="button"
            variant="primary"
            size="small"
            onClick={handleDownload}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Download Resume
          </Button>
        </div>
      </div>

      {/* Mobile/Tablet Screen View Switcher */}
      <div className="lg:hidden flex items-center p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setMobileTab('form')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            mobileTab === 'form'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Editor & Sections</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            mobileTab === 'preview'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Live Resume Preview ({score}%)</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Editor Form */}
        <div
          className={`lg:col-span-6 xl:col-span-6 ${
            mobileTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          <ResumeForm
            resume={resume}
            user={user!}
            courses={courses}
            enrolledCourses={enrolledCourses}
            certificates={certificates}
            onChange={setResume}
            onSave={handleManualSave}
            onReset={handleReset}
            onDownload={handleDownload}
            onImportFromEduvia={handleImportFromEduvia}
            isSaved={isSaved}
          />
        </div>

        {/* RIGHT COLUMN: Sticky Live Resume Preview */}
        <div
          ref={previewRef}
          className={`lg:col-span-6 xl:col-span-6 lg:sticky lg:top-24 ${
            mobileTab === 'form' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between no-print">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-500" />
                  <span>Live Document Preview</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Reflects all input edits instantaneously in standard print A4 dimensions.
                </p>
              </div>

              <Button
                type="button"
                size="small"
                variant="primary"
                onClick={handleDownload}
                leftIcon={<Printer className="w-3.5 h-3.5" />}
              >
                Print / PDF
              </Button>
            </div>

            {/* Live Document Preview Engine */}
            <div className="max-h-[calc(100vh-180px)] overflow-hidden flex flex-col">
              <ResumePreview
                resume={resume}
                template={resume.selectedTemplate || 'professional'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResumeBuilder;
