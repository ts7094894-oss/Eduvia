import React from 'react';
import { useData } from '../../context/DataContext';
import { DashboardCard } from '../../components/DashboardCard';
import { Button } from '../../components/Button';
import {
  TrendingUp,
  Users,
  Briefcase,
  Award,
  DollarSign,
  Building2,
  Calendar,
  Download,
  CheckCircle2,
  Sparkles,
  BarChart3,
} from 'lucide-react';

export const PlacementDashboard: React.FC = () => {
  const { jobs, applications } = useData();

  const totalDrives = jobs.length;
  const totalApplications = applications.length;
  const inReviewApplications = applications.filter(
    (a) => a.status === 'under_review' || a.status === 'Under Review' || a.status === 'shortlisted' || a.status === 'Shortlisted'
  ).length;
  const fullTimeRoles = jobs.filter((j) => j.jobType === 'Full-time').length;

  const statusCounts = [
    { label: 'Submitted', count: applications.filter((a) => a.status === 'applied' || a.status === 'Applied').length, color: 'bg-blue-600' },
    { label: 'In Review', count: applications.filter((a) => a.status === 'under_review' || a.status === 'Under Review').length, color: 'bg-amber-600' },
    { label: 'Shortlisted', count: applications.filter((a) => a.status === 'shortlisted' || a.status === 'Shortlisted').length, color: 'bg-emerald-600' },
    { label: 'Rejected', count: applications.filter((a) => a.status === 'rejected' || a.status === 'Rejected').length, color: 'bg-rose-600' },
  ];

  const workplaceCounts = [
    { type: 'On-site Campus', count: jobs.filter((j) => j.workplaceType === 'On-site').length },
    { type: 'Hybrid', count: jobs.filter((j) => j.workplaceType === 'Hybrid').length },
    { type: 'Remote', count: jobs.filter((j) => j.workplaceType === 'Remote').length },
  ];

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Training & Placement Cell (TPO)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Institutional Placement Management & Drives
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Real-time management of active campus drives, student application submissions, and evaluation pipelines.
          </p>
        </div>

        <Button
          variant="outline"
          size="medium"
          onClick={() => window.print()}
          leftIcon={<Download className="w-4 h-4" />}
        >
          Export Placement Report (PDF)
        </Button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Active Campus Drives"
          value={totalDrives}
          icon={<Briefcase className="w-6 h-6" />}
          description="Verified hiring openings"
          accentColor="indigo"
        />
        <DashboardCard
          title="Total Applications"
          value={totalApplications}
          icon={<Users className="w-6 h-6" />}
          description="Student submissions"
          accentColor="emerald"
        />
        <DashboardCard
          title="Under Review"
          value={inReviewApplications}
          icon={<Award className="w-6 h-6" />}
          description="Shortlisted / In Evaluation"
          accentColor="amber"
        />
        <DashboardCard
          title="Full-Time Roles"
          value={fullTimeRoles}
          icon={<Building2 className="w-6 h-6" />}
          description="Direct campus positions"
          accentColor="purple"
        />
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Status Pipeline */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Application Pipeline Distribution
            </h3>
          </div>

          <div className="space-y-4">
            {statusCounts.map((item) => {
              const pct = totalApplications > 0 ? Math.round((item.count / totalApplications) * 100) : 0;
              return (
                <div key={item.label} className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.label}</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400 font-bold">
                      {item.count} {item.count === 1 ? 'Application' : 'Applications'} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workplace Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            Drive Distribution by Workplace
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {workplaceCounts.map((wp) => (
              <div
                key={wp.type}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1 text-xs"
              >
                <p className="text-slate-400">{wp.type}</p>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {wp.count} {wp.count === 1 ? 'Drive' : 'Drives'}
                </p>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
                  {totalDrives > 0 ? Math.round((wp.count / totalDrives) * 100) : 0}% of catalog
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Campus Placement Drives */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Active Institutional Campus Drives ({jobs.length})
        </h3>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Company</th>
                  <th className="p-4">Role Title</th>
                  <th className="p-4">Package (CTC)</th>
                  <th className="p-4">Eligible CGPA</th>
                  <th className="p-4">Drive Deadline</th>
                  <th className="p-4">Applicants</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <img src={job.companyLogo} alt={job.company} className="w-8 h-8 rounded-lg object-cover" />
                      <span>{job.company}</span>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{job.title}</td>
                    <td className="p-4 font-bold text-emerald-600">{job.salary}</td>
                    <td className="p-4">{job.eligibilityCgpa}+ CGPA</td>
                    <td className="p-4 text-rose-600 font-medium">{job.deadline}</td>
                    <td className="p-4 font-bold text-indigo-600">
                      {applications.filter((a) => a.jobId === job.id).length} Applicants
                    </td>
                    <td className="p-4 text-right">
                      <Button size="small" variant="ghost">
                        Manage Drive
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
