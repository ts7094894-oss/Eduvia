import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { GlobalSearch } from './GlobalSearch';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  Menu,
  X,
  Bell,
  User,
  LogOut,
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  Award,
  ChevronDown,
  Sparkles,
  FileText
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { applications } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'student':
        return '/app/student';
      case 'teacher':
        return '/app/teacher';
      case 'placement':
        return '/app/placement';
      case 'recruiter':
        return '/app/recruiter';
      case 'admin':
        return '/app/admin';
      default:
        return '/app/student';
    }
  };

  const roleLabels = {
    student: 'Student',
    teacher: 'Teacher / Faculty',
    placement: 'Placement Officer (TPO)',
    recruiter: 'Recruiter / Company',
    admin: 'Platform Admin',
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Careers', path: '/careers' },
    { name: 'Resume Builder', path: '/resume-builder', isHighlight: true },
    { name: 'Placement Prep', path: '/prep' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Logo size="medium" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-xl transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.isHighlight && <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                  <span>{link.name}</span>
                  {link.isHighlight && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800">
                      ATS
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons, Global Search & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Component */}
            <div className="hidden sm:block">
              <GlobalSearch variant="navbar" />
            </div>
            <div className="sm:hidden">
              <GlobalSearch variant="compact" />
            </div>

            {/* Theme Toggle Component */}
            <ThemeToggle id="public-header-theme-toggle" />

            {/* Notification Bell (if authenticated) */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors focus:outline-none"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                </button>

                {/* Notifications Panel */}
                {notificationsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setNotificationsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Recent Updates</h4>
                        <span className="text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                          Live Portal
                        </span>
                      </div>
                      <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1">
                          <div className="font-semibold text-slate-900 dark:text-slate-200 flex items-center justify-between">
                            <span>TCS Digital Application</span>
                            <span className="text-[10px] text-emerald-600 font-bold">Under Review</span>
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                            Your application for Software Developer was submitted successfully.
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1">
                          <div className="font-semibold text-slate-900 dark:text-slate-200 flex items-center justify-between">
                            <span>Wipro Turbo Interview</span>
                            <span className="text-[10px] text-blue-600 font-bold">Scheduled</span>
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                            Technical round set for Sep 5, 2026 at 11:00 AM IST.
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1">
                          <div className="font-semibold text-slate-900 dark:text-slate-200 flex items-center justify-between">
                            <span>Course Quiz Passed</span>
                            <span className="text-[10px] text-purple-600 font-bold">100% Score</span>
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                            Python Programming Masterclass Assessment completed with distinction!
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                        <Link
                          to="/app/student/applications"
                          onClick={() => setNotificationsOpen(false)}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                        >
                          View All Applications ({applications.length}) →
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Authenticated User Menu vs Public Login/Signup */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700 transition-all focus:outline-none"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-600/30"
                  />
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[110px]">
                      {user.name}
                    </span>
                    <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50">
                      <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                        <div className="mt-2 inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                          {roleLabels[user.role]}
                        </div>
                      </div>

                      <div className="py-1.5 space-y-0.5">
                        <Link
                          to={getDashboardPath()}
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                          <span>My Dashboard</span>
                        </Link>
                        {user.role === 'student' && (
                          <>
                            <Link
                              to="/app/student/courses"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <GraduationCap className="w-4 h-4 text-blue-600" />
                              <span>Enrolled Courses</span>
                            </Link>
                            <Link
                              to="/app/student/applications"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <Briefcase className="w-4 h-4 text-emerald-600" />
                              <span>My Applications</span>
                            </Link>
                            <Link
                              to="/app/student/certificates"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <Award className="w-4 h-4 text-amber-600" />
                              <span>My Certificates</span>
                            </Link>
                            <Link
                              to="/resume-builder"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                            >
                              <FileText className="w-4 h-4 text-indigo-600" />
                              <span className="font-bold">Resume Builder</span>
                              <span className="ml-auto text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                                ATS
                              </span>
                            </Link>
                          </>
                        )}
                        <Link
                          to="/app/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-500" />
                          <span>Profile & Account</span>
                        </Link>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="small">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="small" rightIcon={<Sparkles className="w-3.5 h-3.5" />}>
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          {/* Quick Search in Mobile Drawer */}
          <div className="pt-1 pb-1">
            <GlobalSearch variant="dashboard" />
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 text-sm font-medium rounded-xl flex items-center justify-between ${
                  location.pathname === link.path
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.isHighlight && <FileText className="w-4 h-4 text-indigo-600" />}
                  <span>{link.name}</span>
                </div>
                {link.isHighlight && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    ATS Ready
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {/* Mobile Theme Toggle Row */}
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Appearance
              </span>
              <ThemeToggle id="mobile-drawer-theme-toggle" variant="button" />
            </div>

            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="primary" fullWidth leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                    Go to {user?.role} Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  leftIcon={<LogOut className="w-4 h-4 text-rose-500" />}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth>
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
