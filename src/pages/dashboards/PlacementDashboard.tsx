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

  const branchStats = [
    { branch: 'Computer Science & Eng (CSE)', eligible: 320, placed: 295, rate: 92 },
    { branch: 'Information Technology (IT)', eligible: 180, placed: 158, rate: 87 },
    { branch: 'Electronics & Comm (ECE)', eligible: 210, placed: 162, rate: 77 },
    { branch: 'Artificial Intelligence & DS', eligible: 140, placed: 128, rate: 91 },
  ];

  const salaryBrackets = [
    { range: 'Dream (> 20 LPA)', count: 48, pct: '8%' },
    { range: 'Super Dream (10 - 20 LPA)', count: 184, pct: '30%' },
    { range: 'Core / IT (6 - 10 LPA)', count: 260, pct: '42%' },
    { range: 'Standard (4 - 6 LPA)', count: 120, pct: '20%' },
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
            Institutional Placement Analytics & Drives
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Campus-wide recruitment performance, corporate partner visits, CTC distribution, and branch placement statistics.
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
          title="Placement Rate"
          value="88.2%"
          icon={<TrendingUp className="w-6 h-6" />}
          description="612 of 850 Eligible Placed"
          trend="+5.4% YoY"
          trendDirection="up"
          accentColor="emerald"
        />
        <DashboardCard
          title="Highest CTC Offered"
          value="44.0 LPA"
          icon={<Award className="w-6 h-6" />}
          description="Amazon SDE-1 Direct Drive"
          accentColor="amber"
        />
        <DashboardCard
          title="Average CTC"
          value="8.8 LPA"
          icon={<DollarSign className="w-6 h-6" />}
          description="Tier-1 Software Engineering"
          accentColor="indigo"
        />
        <DashboardCard
          title="Visiting Companies"
          value="142"
          icon={<Building2 className="w-6 h-6" />}
          description="Corporate Recruiting Partners"
          accentColor="purple"
        />
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branch-wise Placement Matrix */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Branch-wise Placement Statistics (2026 Batch)
            </h3>
          </div>

          <div className="space-y-4">
            {branchStats.map((item) => (
              <div key={item.branch} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.branch}</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {item.placed}/{item.eligible} ({item.rate}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTC Package Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            Salary Package (CTC) Brackets
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {salaryBrackets.map((bracket) => (
              <div
                key={bracket.range}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1 text-xs"
              >
                <p className="text-slate-400">{bracket.range}</p>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {bracket.count} Offers
                </p>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
                  {bracket.pct} of total placements
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
                    <td className="p-4 font-bold text-indigo-600">42 Students</td>
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
