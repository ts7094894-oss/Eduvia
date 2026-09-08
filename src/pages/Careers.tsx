import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { JobApplicationModal } from '../components/JobApplicationModal';
import { Button } from '../components/Button';
import { Job } from '../types';
import {
  Briefcase,
  Search,
  MapPin,
  DollarSign,
  Building2,
  Calendar,
  Sparkles,
  CheckCircle2,
  Filter,
  ArrowRight,
  ShieldCheck,
  X,
  FileText
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { calculateJobMatch } from '../data/resumeDefaults';

export const Careers: React.FC = () => {
  const { jobs, applications, resumeData } = useData();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialType = searchParams.get('type') || 'All';
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');

  // Set of applied job IDs by current user
  const appliedJobIds = useMemo(() => {
    return new Set(applications.map((app) => app.jobId));
  }, [applications]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType =
        selectedType === 'All' || job.jobType.toLowerCase().includes(selectedType.toLowerCase());

      const matchesWorkplace =
        selectedWorkplace === 'All' ||
        job.workplaceType.toLowerCase().includes(selectedWorkplace.toLowerCase());

      const matchesExperience =
        selectedExperience === 'All' ||
        job.experience.toLowerCase().includes(selectedExperience.toLowerCase());

      return matchesSearch && matchesType && matchesWorkplace && matchesExperience;
    });
  }, [jobs, searchQuery, selectedType, selectedWorkplace, selectedExperience]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedWorkplace('All');
    setSelectedExperience('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-xs font-bold text-indigo-700 dark:text-indigo-300">
          <Briefcase className="w-3.5 h-3.5" />
          <span>EduPath Direct Campus Placements</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Campus Job & Internship Drives
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Apply directly inside the EduPath portal with zero redirects. Your verified course credentials, quiz scores, and ATS resume are automatically submitted to hiring managers.
        </p>
      </div>

      {/* Resume Builder Quick Action Banner */}
      <div className="bg-gradient-to-r from-indigo-900/90 via-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 border border-indigo-800/60 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                Prepare Your ATS-Friendly Resume
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                1-Click Apply Ready
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Auto-sync your completed EduPath coursework, verified digital certificates, and project portfolio into 4 recruiter-tested templates for higher shortlisting rates.
            </p>
          </div>
        </div>
        <Link to="/resume-builder" className="shrink-0 w-full sm:w-auto">
          <Button
            variant="primary"
            size="small"
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="w-full sm:w-auto shadow-md shadow-indigo-600/30"
          >
            Open Resume Builder
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 rounded-3xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job role, company, skills (e.g. Python, TCS, React)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Type Selector */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Job Types</option>
              <option value="Full-time">Full-time Roles</option>
              <option value="Internship">Internships</option>
            </select>
          </div>

          {/* Workplace Selector */}
          <div>
            <select
              value={selectedWorkplace}
              onChange={(e) => setSelectedWorkplace(e.target.value)}
              className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Workplaces</option>
              <option value="On-site">On-site Campus</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        {/* Quick Tags Filter */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-slate-400 font-semibold">Popular Searches:</span>
            {['Python Developer', 'Full Stack', 'Data Analyst', 'Fresher 2026', 'TCS', 'Amazon'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-600 dark:text-slate-300 text-[11px] font-medium"
              >
                {tag}
              </button>
            ))}
          </div>

          {(searchQuery || selectedType !== 'All' || selectedWorkplace !== 'All') && (
            <button
              onClick={clearFilters}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline shrink-0 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Applied Info */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <p>
          Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredJobs.length}</strong> active campus placement drives
        </p>
        <Link to="/app/student/applications" className="font-bold text-indigo-600 hover:underline">
          View My Submitted Applications ({applications.length}) →
        </Link>
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobIds.has(job.id);
          const match = calculateJobMatch(job, resumeData);

          return (
            <div
              key={job.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-5 group"
            >
              {/* Top Row: Logo, Title, Salary & Match */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 shadow-xs"
                  />
                  <div className="space-y-1">
                    <Link to={`/jobs/${job.id}`}>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {job.title}
                      </h3>
                    </Link>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <span>{job.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {job.location}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {job.salary}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 border ${
                      match.percentage >= 80
                        ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                        : match.percentage >= 60
                        ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                        : 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{match.percentage}% Match</span>
                  </span>
                </div>
              </div>

              {/* Badges and Skills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  {job.jobType}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  {job.workplaceType}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
                  Min CGPA: {job.eligibilityCgpa}+
                </span>
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-[10px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Description Snippet */}
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {job.description}
              </p>

              {/* Footer CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Deadline: <strong className="text-slate-700 dark:text-slate-300">{job.deadline}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/jobs/${job.id}`}>
                    <Button size="small" variant="ghost">
                      Details
                    </Button>
                  </Link>

                  {isApplied ? (
                    <Link to="/app/student/applications">
                      <Button
                        size="small"
                        variant="secondary"
                        leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      >
                        Applied ✓
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="small"
                      variant="primary"
                      onClick={() => setSelectedJobForModal(job)}
                    >
                      Apply Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* In-Platform Application Modal */}
      <JobApplicationModal
        job={selectedJobForModal}
        isOpen={!!selectedJobForModal}
        onClose={() => setSelectedJobForModal(null)}
      />
    </div>
  );
};
