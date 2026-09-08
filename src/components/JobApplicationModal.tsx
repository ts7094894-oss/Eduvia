import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Job } from '../types';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { calculateJobMatch } from '../data/resumeDefaults';
import {
  CheckCircle2,
  Upload,
  Sparkles,
  Building2,
  MapPin,
  DollarSign,
  FileText,
  AlertCircle,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (applicationId: string) => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  job,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const { submitApplication, resumeData, updateResumeData } = useData();
  const toast = useToast();

  const [resumeSource, setResumeSource] = useState<'eduvia' | 'upload'>('eduvia');

  // Compute job match based on current resume
  const matchResult = job
    ? calculateJobMatch(job, resumeData)
    : { percentage: 80, matchingSkills: [], missingSkills: [], suggestion: '' };

  const [formData, setFormData] = useState({
    applicantName: resumeData.personalInfo.fullName || user?.name || '',
    applicantEmail: resumeData.personalInfo.email || user?.email || '',
    applicantPhone: resumeData.personalInfo.phone || user?.phone || '+91 98765 43210',
    college:
      resumeData.education[0]?.institution ||
      user?.college ||
      'EduPath Institute of Technology',
    degree:
      resumeData.education[0]?.degree ||
      user?.degree ||
      'B.Tech - Computer Science & Engineering',
    graduationYear:
      resumeData.education[0]?.graduationYear || user?.graduationYear || '2026',
    cgpa: resumeData.education[0]?.cgpa || String(user?.cgpa || '8.85'),
    skills:
      resumeData.skills?.join(', ') ||
      user?.skills?.join(', ') ||
      'Python, Java, React, SQL, Data Structures',
    resumeName: `EduPath_Resume_${(resumeData.personalInfo.fullName || user?.name || 'Student').replace(/\s+/g, '_')}.pdf`,
    coverLetter: `Dear Hiring Team at ${job?.company || 'the company'},\n\nI am thrilled to apply for the ${job?.title || 'position'}. Having completed specialized CSE coursework and verified projects on the EduPath platform, I am confident in delivering high-quality engineering value.`,
    githubUrl:
      resumeData.personalInfo.github ||
      user?.github ||
      'https://github.com/edupath-tech',
    linkedinUrl:
      resumeData.personalInfo.linkedin ||
      user?.linkedin ||
      'https://linkedin.com/in/sai-krishna-edupath',
    portfolioUrl:
      resumeData.personalInfo.portfolio || 'https://saikrishna-portfolio.dev',
  });

  // When modal opens or resumeData updates, sync if in eduvia mode
  useEffect(() => {
    if (resumeSource === 'eduvia') {
      const skillsStr =
        resumeData.categorizedSkills?.map((s) => s.name).join(', ') ||
        resumeData.skills?.join(', ') ||
        user?.skills?.join(', ') ||
        '';

      setFormData((prev) => ({
        ...prev,
        applicantName: resumeData.personalInfo.fullName || user?.name || prev.applicantName,
        applicantEmail: resumeData.personalInfo.email || user?.email || prev.applicantEmail,
        applicantPhone: resumeData.personalInfo.phone || user?.phone || prev.applicantPhone,
        college: resumeData.education[0]?.institution || user?.college || prev.college,
        degree: resumeData.education[0]?.degree || user?.degree || prev.degree,
        graduationYear: resumeData.education[0]?.graduationYear || user?.graduationYear || prev.graduationYear,
        cgpa: resumeData.education[0]?.cgpa || String(user?.cgpa || prev.cgpa),
        skills: skillsStr || prev.skills,
        githubUrl: resumeData.personalInfo.github || prev.githubUrl,
        linkedinUrl: resumeData.personalInfo.linkedin || prev.linkedinUrl,
        portfolioUrl: resumeData.personalInfo.portfolio || prev.portfolioUrl,
        resumeName: `EduPath_Resume_${(resumeData.personalInfo.fullName || user?.name || 'Student').replace(/\s+/g, '_')}.pdf`,
      }));
    }
  }, [resumeSource, resumeData, user]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  if (!job) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resumeName: e.target.files![0].name }));
      toast.success('Resume Uploaded', e.target.files[0].name);
    }
  };

  const handleAddMissingSkillsToResume = () => {
    if (matchResult.missingSkills.length === 0) return;
    const currentCategorized = resumeData.categorizedSkills || [];
    const newSkills = matchResult.missingSkills.map((sk) => ({
      id: `skill-auto-${Date.now()}-${sk}`,
      name: sk,
      category: 'Frameworks' as const,
    }));
    const updated = {
      ...resumeData,
      categorizedSkills: [...currentCategorized, ...newSkills],
      skills: [...(resumeData.skills || []), ...matchResult.missingSkills],
    };
    updateResumeData(updated);
    toast.success(
      'Skills Added to Resume',
      `Added ${matchResult.missingSkills.join(', ')} to your EduPath resume.`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const skillsArray = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const appId = submitApplication({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        companyLogo: job.companyLogo,
        applicantId: user?.id || 'guest-student',
        applicantName: formData.applicantName,
        applicantEmail: formData.applicantEmail,
        applicantPhone: formData.applicantPhone,
        college: formData.college,
        degree: formData.degree,
        graduationYear: formData.graduationYear,
        cgpa: formData.cgpa,
        skills: skillsArray,
        resumeName: formData.resumeName,
        coverLetter: formData.coverLetter,
        githubUrl: formData.githubUrl,
        linkedinUrl: formData.linkedinUrl,
        portfolioUrl: formData.portfolioUrl,
      });

      setIsSubmitting(false);
      setSubmittedAppId(appId);
      toast.success('Application Submitted!', `Application ID: ${appId}`);
      if (onSuccess) onSuccess(appId);
    }, 800);
  };

  const handleResetAndClose = () => {
    setSubmittedAppId(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      maxWidth="2xl"
      title={
        submittedAppId ? (
          'Application Submitted!'
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Apply for {job.title}
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {job.company}
                </span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span className="font-semibold text-emerald-600">{job.salary}</span>
              </p>
            </div>
          </div>
        )
      }
    >
      {submittedAppId ? (
        <div className="py-6 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Application Submitted Successfully!
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Your application and verified credentials have been received by{' '}
              <span className="font-bold text-slate-900 dark:text-white">
                {job.company}
              </span>{' '}
              talent team. You can track progress in real-time under{' '}
              <span className="font-semibold text-indigo-600">My Applications</span>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 max-w-sm mx-auto">
            <p className="text-xs text-indigo-600 dark:text-indigo-300 font-semibold uppercase tracking-wider">
              Application Tracking ID
            </p>
            <p className="text-xl font-mono font-black text-indigo-900 dark:text-white mt-1">
              {submittedAppId}
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <Button variant="primary" onClick={handleResetAndClose}>
              View My Applications
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Match Percentage Indicator */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-blue-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Resume Match Score
                </span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                  matchResult.percentage >= 80
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : matchResult.percentage >= 60
                    ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                }`}
              >
                {matchResult.percentage}% Match
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  matchResult.percentage >= 80
                    ? 'bg-emerald-500'
                    : matchResult.percentage >= 60
                    ? 'bg-indigo-600'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${matchResult.percentage}%` }}
              />
            </div>

            {/* Missing skills suggestion */}
            {matchResult.missingSkills.length > 0 && (
              <div className="pt-1 flex items-start justify-between gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                <p className="flex-1">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Suggestion:{' '}
                  </span>
                  {matchResult.suggestion}
                </p>
                <button
                  type="button"
                  onClick={handleAddMissingSkillsToResume}
                  className="shrink-0 text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add to Resume</span>
                </button>
              </div>
            )}
          </div>

          {/* Option: Choose Resume Source */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Select Resume Document *
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setResumeSource('eduvia')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  resumeSource === 'eduvia'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    resumeSource === 'eduvia'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Use EduPath Resume
                  </p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                    Synced from Resume Builder with verified certificates
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setResumeSource('upload')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  resumeSource === 'upload'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    resumeSource === 'upload'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Upload Different Resume
                  </p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                    Select custom PDF or DOCX file from computer
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Resume Upload / Document Display Box */}
          {resumeSource === 'eduvia' ? (
            <div className="p-3.5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 dark:text-white truncate">
                    {formData.resumeName}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Format: {resumeData.selectedTemplate || 'Professional'} ATS Template • Auto-attached
                  </p>
                </div>
              </div>

              <Link
                to="/resume-builder"
                target="_blank"
                className="shrink-0 text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                <span>Edit Resume</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 p-3 rounded-2xl border border-dashed border-indigo-300 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/20">
                <Upload className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {formData.resumeName}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    PDF or DOCX document up to 10MB
                  </p>
                </div>
                <label className="cursor-pointer">
                  <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 shadow-xs">
                    Browse
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="applicantEmail"
                value={formData.applicantEmail}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* College & Degree */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                College / University *
              </label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="applicantPhone"
                value={formData.applicantPhone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Degree & Branch *
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Graduation Year *
              </label>
              <input
                type="text"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                CGPA / Percentage *
              </label>
              <input
                type="text"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Key Technical Skills (Comma-separated) *
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Social & Portfolio Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Portfolio URL
              </label>
              <input
                type="url"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Cover Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Cover Letter / Statement of Purpose
            </label>
            <textarea
              name="coverLetter"
              rows={3}
              value={formData.coverLetter}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Submit Application
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
