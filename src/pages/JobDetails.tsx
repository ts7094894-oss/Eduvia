import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { JobApplicationModal } from '../components/JobApplicationModal';
import { Button } from '../components/Button';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Share2,
  Sparkles,
  Users,
  ShieldCheck,
} from 'lucide-react';

export const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { jobs, applications } = useData();
  const { isAuthenticated } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);

  const job = jobs.find((j) => j.id === id);
  const isApplied = job ? applications.some((app) => app.jobId === job.id) : false;

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Job Drive Not Found</h2>
        <p className="text-xs text-slate-500">This placement opening may have expired or is closed.</p>
        <Link to="/careers">
          <Button variant="primary" size="small">
            Explore All Campus Drives
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-20">
      {/* Back Button */}
      <Link
        to="/careers"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Careers & Drives
      </Link>

      {/* Main Job Banner Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  {job.jobType}
                </span>
                <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {job.workplaceType}
                </span>
                <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  Direct Campus Drive
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {job.title}
              </h1>

              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-3">
                <span className="text-slate-900 dark:text-white font-bold">{job.company}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                </span>
                <span>•</span>
                <span className="text-emerald-600 font-bold">{job.salary}</span>
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="shrink-0 flex items-center gap-3">
            {isApplied ? (
              <Link to="/app/student/applications">
                <Button variant="secondary" size="large" leftIcon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}>
                  Application Submitted ✓
                </Button>
              </Link>
            ) : (
              <Button
                variant="primary"
                size="large"
                onClick={() => setModalOpen(true)}
                leftIcon={<Sparkles className="w-5 h-5" />}
              >
                Apply Directly (In-Platform)
              </Button>
            )}
          </div>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <p className="text-slate-400">Experience Required</p>
            <p className="font-bold text-slate-900 dark:text-white mt-0.5">{job.experience}</p>
          </div>
          <div>
            <p className="text-slate-400">Minimum CGPA Criteria</p>
            <p className="font-bold text-slate-900 dark:text-white mt-0.5">{job.eligibilityCgpa}+ CGPA</p>
          </div>
          <div>
            <p className="text-slate-400">Application Deadline</p>
            <p className="font-bold text-rose-600 dark:text-rose-400 mt-0.5">{job.deadline}</p>
          </div>
          <div>
            <p className="text-slate-400">Open Positions</p>
            <p className="font-bold text-slate-900 dark:text-white mt-0.5">25 Openings</p>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Description, Responsibilities, Requirements */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job Overview */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Role Overview</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Key Responsibilities</h3>
            <ul className="space-y-2.5">
              {job.responsibilities?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements & Skills */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Qualifications & Requirements</h3>
            <ul className="space-y-2.5">
              {job.requirements?.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-900 dark:text-white mb-2">Required Technical Stack:</p>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-900"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Eligibility & Process */}
        <div className="space-y-6">
          {/* Eligibility Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Campus Drive Eligibility
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <span className="text-slate-400">Eligible Degrees:</span>
                <p className="font-bold text-slate-900 dark:text-white">B.Tech / B.E (CSE, IT, ECE, AI&DS)</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <span className="text-slate-400">Batch Eligibility:</span>
                <p className="font-bold text-slate-900 dark:text-white">2026 & 2025 Passing Out Graduates</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <span className="text-slate-400">Academic Standing:</span>
                <p className="font-bold text-slate-900 dark:text-white">No Active Backlogs • {job.eligibilityCgpa}+ CGPA</p>
              </div>
            </div>
          </div>

          {/* Placement Rounds */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Selection Process</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">1</div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Online Aptitude & Coding Test</p>
                  <p className="text-[10px] text-slate-400">90 mins • Quant & DSA</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">2</div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Technical Interview Round 1</p>
                  <p className="text-[10px] text-slate-400">Live Coding & Architecture</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">3</div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Managerial & HR Discussion</p>
                  <p className="text-[10px] text-slate-400">Behavioral & Offer Rollout</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Apply CTA */}
          {!isApplied && (
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={() => setModalOpen(true)}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Apply for this Role
            </Button>
          )}
        </div>
      </div>

      {/* Application Modal */}
      <JobApplicationModal
        job={job}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
