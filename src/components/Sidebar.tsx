import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import {
  LayoutDashboard,
  GraduationCap,
  Compass,
  FileText,
  HelpCircle,
  BarChart3,
  Award,
  Briefcase,
  FileBadge,
  Bookmark,
  User,
  Settings,
  LogOut,
  PlusCircle,
  Users,
  Building2,
  Calendar,
  CheckCircle2,
  FolderKanban,
  FileSpreadsheet,
  Layers,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Target,
  Trophy
} from 'lucide-react';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleLinks = (role: Role) => {
    switch (role) {
      case 'student':
        return [
          { name: 'Dashboard', path: '/app/student', icon: LayoutDashboard },
          { name: 'My Courses', path: '/app/student/courses', icon: GraduationCap },
          { name: 'Explore Courses', path: '/courses', icon: Compass },
          { name: 'Assignments', path: '/app/student/assignments', icon: FileText },
          { name: 'Quizzes', path: '/app/student/quizzes', icon: HelpCircle },
          { name: 'Progress & Stats', path: '/app/student/progress', icon: BarChart3 },
          { name: 'Badges & Rewards', path: '/app/student/badges', icon: Trophy },
          { name: 'Certificates', path: '/app/student/certificates', icon: Award },
          { name: 'Resume Builder', path: '/resume-builder', icon: FileText, badge: 'ATS' },
          { name: 'Careers & Jobs', path: '/careers', icon: Briefcase },
          { name: 'My Applications', path: '/app/student/applications', icon: FolderKanban },
          { name: 'My Interviews', path: '/app/student/interviews', icon: Calendar },
          { name: 'Placement Prep', path: '/prep', icon: Target },
          { name: 'Bookmarks', path: '/app/student/bookmarks', icon: Bookmark },
          { name: 'Profile', path: '/app/profile', icon: User },
          { name: 'Settings', path: '/app/settings', icon: Settings },
        ];

      case 'teacher':
        return [
          { name: 'Dashboard', path: '/app/teacher', icon: LayoutDashboard },
          { name: 'My Courses', path: '/app/teacher/courses', icon: GraduationCap },
          { name: 'Create Course', path: '/app/teacher/create-course', icon: PlusCircle },
          { name: 'Students Enrolled', path: '/app/teacher/students', icon: Users },
          { name: 'Assignments Review', path: '/app/teacher/assignments', icon: FileText },
          { name: 'Quizzes & Tests', path: '/app/teacher/quizzes', icon: HelpCircle },
          { name: 'Class Analytics', path: '/app/teacher/analytics', icon: BarChart3 },
          { name: 'Profile', path: '/app/profile', icon: User },
          { name: 'Settings', path: '/app/settings', icon: Settings },
        ];

      case 'placement':
        return [
          { name: 'Dashboard', path: '/app/placement', icon: LayoutDashboard },
          { name: 'Companies & Drives', path: '/app/placement/companies', icon: Building2 },
          { name: 'Job Postings', path: '/app/placement/jobs', icon: Briefcase },
          { name: 'Student Directory', path: '/app/placement/students', icon: Users },
          { name: 'Applications Pool', path: '/app/placement/applications', icon: FolderKanban },
          { name: 'Interview Schedules', path: '/app/placement/interviews', icon: Calendar },
          { name: 'Placed Candidates', path: '/app/placement/placed', icon: CheckCircle2 },
          { name: 'Placement Reports', path: '/app/placement/reports', icon: FileSpreadsheet },
          { name: 'Settings', path: '/app/settings', icon: Settings },
        ];

      case 'recruiter':
        return [
          { name: 'Dashboard', path: '/app/recruiter', icon: LayoutDashboard },
          { name: 'Company Profile', path: '/app/recruiter/profile', icon: Building2 },
          { name: 'Post New Job', path: '/app/recruiter/post-job', icon: PlusCircle },
          { name: 'Job Listings', path: '/app/recruiter/jobs', icon: Briefcase },
          { name: 'Applicants Pipeline', path: '/app/recruiter/applicants', icon: Users },
          { name: 'Shortlisted Pool', path: '/app/recruiter/shortlisted', icon: ShieldCheck },
          { name: 'Interviews', path: '/app/recruiter/interviews', icon: Calendar },
          { name: 'Selected Hires', path: '/app/recruiter/selected', icon: CheckCircle2 },
        ];

      case 'admin':
        return [
          { name: 'Dashboard', path: '/app/admin', icon: LayoutDashboard },
          { name: 'Manage Students', path: '/app/admin/students', icon: Users },
          { name: 'Manage Teachers', path: '/app/admin/teachers', icon: GraduationCap },
          { name: 'Placement Cell', path: '/app/admin/placement', icon: Building2 },
          { name: 'Company Directory', path: '/app/admin/companies', icon: Building2 },
          { name: 'All Courses', path: '/app/admin/courses', icon: Layers },
          { name: 'Categories', path: '/app/admin/categories', icon: FolderKanban },
          { name: 'System Reports', path: '/app/admin/reports', icon: BarChart3 },
          { name: 'Global Settings', path: '/app/settings', icon: Settings },
        ];

      default:
        return [];
    }
  };

  const links = getRoleLinks(user?.role || 'student');

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white dark:bg-slate-950 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header & Logo */}
        <div>
          <div className="h-16 sm:h-20 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800/80">
            {!isCollapsed ? (
              <Logo size="small" />
            ) : (
              <div className="mx-auto">
                <Logo size="small" showTagline={false} />
              </div>
            )}

            {/* Desktop Collapse Toggle */}
            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* User Snapshot */}
          {user && !isCollapsed && (
            <div className="p-4 mx-3 mt-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {user.role}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Links List */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === '/app/student' || link.path === '/app/teacher' || link.path === '/app/placement' || link.path === '/app/recruiter' || link.path === '/app/admin'}
                  onClick={onCloseMobile}
                  title={isCollapsed ? link.name : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/20'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                    } ${isCollapsed ? 'justify-center px-2' : ''}`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && (
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <span className="truncate">{link.name}</span>
                      {(link as any).badge && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 group-[.active]:bg-white/25 group-[.active]:text-white">
                          {(link as any).badge}
                        </span>
                      )}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions (Logout) */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ${
              isCollapsed ? 'justify-center px-2' : ''
            }`}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
