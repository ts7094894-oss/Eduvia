import React, { useState } from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { ThemeToggle } from '../components/ThemeToggle';
import { GlobalSearch } from '../components/GlobalSearch';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import {
  Menu,
  Bell,
  Home,
  ChevronRight,
  ShieldAlert,
  FileText
} from 'lucide-react';

interface DashboardLayoutProps {
  allowedRoles?: Role[];
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Access Restricted</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This module requires the <span className="font-bold text-indigo-600">{allowedRoles.join(', ')}</span> role. You are currently signed in as <span className="font-bold">{user.role}</span>.
          </p>
          <div className="pt-2">
            <Link
              to={`/app/${user.role}`}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-600/20"
            >
              Go to My {user.role} Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Role Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 h-16 sm:h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Info */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>EduPath</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="capitalize font-semibold text-slate-700 dark:text-slate-300">
                {user.role} Portal
              </span>
            </div>
          </div>

          {/* Center Search bar on desktop */}
          <div className="hidden md:flex items-center max-w-md w-full">
            <GlobalSearch placeholder="Search courses, lessons, jobs, materials..." />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Resume Builder Shortcut for Students */}
            {user.role === 'student' && (
              <Link
                to="/resume-builder"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/80 transition-colors shadow-xs"
                title="Build your ATS-friendly resume"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">Resume Builder</span>
                <span className="text-[9px] font-extrabold px-1 py-0.2 rounded bg-indigo-200/80 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                  ATS
                </span>
              </Link>
            )}

            {/* Theme Toggle Component */}
            <ThemeToggle id="dashboard-header-theme-toggle" />

            <Link
              to="/app/student/applications"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600" />
            </Link>

            {/* Quick Profile Pill */}
            <Link
              to="/app/profile"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 transition-colors"
            >
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                alt={user.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden sm:inline truncate max-w-[100px]">
                {user.name.split(' ')[0]}
              </span>
            </Link>
          </div>
        </header>

        {/* Page View Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
