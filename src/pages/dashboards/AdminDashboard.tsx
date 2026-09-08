import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { DashboardCard } from '../../components/DashboardCard';
import { Button } from '../../components/Button';
import {
  ShieldAlert,
  Users,
  BookOpen,
  Briefcase,
  Activity,
  CheckCircle2,
  Server,
  Lock,
  Search,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses, jobs, applications } = useData();
  const [filterRole, setFilterRole] = useState<string>('all');

  const usersList = [
    { id: 'u1', name: 'Sai Krishna', email: 'student@eduvia.com', role: 'student', status: 'active', joined: 'Aug 2024' },
    { id: 'u2', name: 'Dr. K. S. Rao', email: 'teacher@eduvia.com', role: 'teacher', status: 'active', joined: 'Jan 2020' },
    { id: 'u3', name: 'Suresh Varma (TPO)', email: 'tpo@eduvia.com', role: 'tpo', status: 'active', joined: 'Jul 2021' },
    { id: 'u4', name: 'Ananya Sharma (TCS HR)', email: 'recruiter@eduvia.com', role: 'recruiter', status: 'active', joined: 'May 2025' },
    { id: 'u5', name: 'Priya Reddy', email: 'priya.it@eduvia.com', role: 'student', status: 'active', joined: 'Aug 2024' },
  ];

  const filteredUsers = usersList.filter((u) => filterRole === 'all' || u.role === filterRole);

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-xs font-bold text-purple-700 dark:text-purple-300">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Super Admin Control Center</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System Administration & RBAC Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Monitor system throughput, manage multi-role institutional user accounts, audit security logs, and oversee course accreditations.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Platform Users"
          value="5,240"
          icon={<Users className="w-6 h-6" />}
          description="Students, Faculty & Recruiters"
          accentColor="indigo"
        />
        <DashboardCard
          title="Active Courses"
          value={courses.length}
          icon={<BookOpen className="w-6 h-6" />}
          description="Accredited Curricula"
          accentColor="emerald"
        />
        <DashboardCard
          title="Campus Drives"
          value={jobs.length}
          icon={<Briefcase className="w-6 h-6" />}
          description="Institutional Openings"
          accentColor="purple"
        />
        <DashboardCard
          title="System Health"
          value="99.98%"
          icon={<Server className="w-6 h-6" />}
          description="All microservices operational"
          accentColor="amber"
        />
      </div>

      {/* User Management Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            User Accounts & Permissions Directory
          </h3>

          <div className="flex items-center gap-2">
            {['all', 'student', 'teacher', 'tpo', 'recruiter'].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase ${
                  filterRole === r
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">User Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{u.name}</td>
                  <td className="p-4 text-slate-500">{u.email}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold uppercase text-[10px]">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Active
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{u.joined}</td>
                  <td className="p-4 text-right">
                    <Button size="small" variant="ghost">
                      Edit Permissions
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Audit Log */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          Real-time Audit Log
        </h3>
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
            <span className="text-slate-700 dark:text-slate-300">
              <strong>Sai Krishna</strong> submitted solution for <em>Assignment: Two-Pointer Algorithm</em>.
            </span>
            <span className="text-slate-400 text-[10px]">2 mins ago</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
            <span className="text-slate-700 dark:text-slate-300">
              <strong>TCS Recruiter</strong> updated application status for <em>Associate Software Developer</em>.
            </span>
            <span className="text-slate-400 text-[10px]">14 mins ago</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
            <span className="text-slate-700 dark:text-slate-300">
              <strong>System Engine</strong> issued verified certificate <em>EDUVIA-CERT-2026-PYTHON-9941</em>.
            </span>
            <span className="text-slate-400 text-[10px]">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};
