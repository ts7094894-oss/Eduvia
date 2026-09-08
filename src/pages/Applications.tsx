import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { JobApplication as Application } from '../types';
import { Button } from '../components/Button';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  Building2,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Applications: React.FC = () => {
  const { applications } = useData();
  const { user } = useAuth();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const statuses = [
    { id: 'all', label: 'All Applications', count: applications.length },
    { id: 'applied', label: 'Applied', count: applications.filter((a) => a.status === 'applied').length },
    { id: 'under_review', label: 'Under Review', count: applications.filter((a) => a.status === 'under_review').length },
    { id: 'shortlisted', label: 'Shortlisted', count: applications.filter((a) => a.status === 'shortlisted').length },
    { id: 'interview_scheduled', label: 'Interview Scheduled', count: applications.filter((a) => a.status === 'interview_scheduled').length },
    { id: 'selected', label: 'Selected / Hired', count: applications.filter((a) => a.status === 'selected').length },
  ];

  const filteredApps = applications.filter((app) => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusStage = (status: Application['status']) => {
    switch (status) {
      case 'applied':
        return 1;
      case 'under_review':
        return 2;
      case 'shortlisted':
        return 3;
      case 'interview_scheduled':
        return 4;
      case 'selected':
        return 5;
      case 'rejected':
        return 0;
      default:
        return 1;
    }
  };

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'selected':
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Selected / Offer Extended
          </span>
        );
      case 'interview_scheduled':
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Interview Scheduled
          </span>
        );
      case 'shortlisted':
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-lg bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Shortlisted for Round 1
          </span>
        );
      case 'under_review':
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Profile Under Review
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" /> Not Selected
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Application Submitted
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-xs font-bold text-indigo-700 dark:text-indigo-300">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Application Tracking System</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          My Campus Job Applications
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Track the live hiring status of all your campus placements, direct recruiter reviews, shortlisting notifications, and scheduled interview rounds.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company, job title, application ID..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {statuses.map((s) => {
            const isSelected = filterStatus === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setFilterStatus(s.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <span>{s.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                  {s.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length > 0 ? (
        <div className="space-y-6">
          {filteredApps.map((app) => {
            const currentStage = getStatusStage(app.status);

            return (
              <div
                key={app.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={app.companyLogo || 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80'}
                      alt={app.company}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {app.jobTitle}
                        </h3>
                        <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md font-bold">
                          {app.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-2">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{app.company}</span>
                        <span>•</span>
                        <span>Applied on: {app.appliedDate}</span>
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">{getStatusBadge(app.status)}</div>
                </div>

                {/* Visual Pipeline Stages */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Application Hiring Pipeline
                  </p>

                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    {[
                      { num: 1, label: 'Submitted' },
                      { num: 2, label: 'Under Review' },
                      { num: 3, label: 'Shortlisted' },
                      { num: 4, label: 'Interview' },
                      { num: 5, label: 'Offer / Result' },
                    ].map((step) => {
                      const isComplete = currentStage >= step.num;
                      const isCurrent = currentStage === step.num;

                      return (
                        <div key={step.num} className="space-y-1.5">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              isComplete
                                ? 'bg-indigo-600 dark:bg-indigo-500'
                                : 'bg-slate-200 dark:bg-slate-700'
                            }`}
                          />
                          <p
                            className={`text-[11px] font-semibold truncate ${
                              isCurrent
                                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                                : isComplete
                                ? 'text-slate-800 dark:text-slate-200'
                                : 'text-slate-400'
                            }`}
                          >
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Interview Action or Job details link */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-500">
                    {app.status === 'interview_scheduled' && (
                      <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> Technical Interview Scheduled: Sep 5, 2026 @ 11:00 AM IST
                      </span>
                    )}
                    {app.status === 'under_review' && (
                      <span>TPO & Recruiter team are reviewing your CGPA and coursework.</span>
                    )}
                    {app.status === 'selected' && (
                      <span className="text-emerald-600 font-bold">
                        Offer letter issued! Check your institutional email for onboarding steps.
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {app.status === 'interview_scheduled' && (
                      <Link to="/app/student/interviews">
                        <Button size="small" variant="primary" leftIcon={<Calendar className="w-3.5 h-3.5" />}>
                          Join Mock / Live Room
                        </Button>
                      </Link>
                    )}
                    <Link to={`/jobs/${app.jobId}`}>
                      <Button size="small" variant="ghost" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        View Job Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 mx-auto flex items-center justify-center">
            <Briefcase className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No applications found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You haven't submitted any applications in this status yet. Browse active campus drives and apply with 1-click.
          </p>
          <Link to="/careers">
            <Button variant="primary" size="small">
              Explore Campus Drives
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
