import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Role } from '../types';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  UserCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

export const Login: React.FC = () => {
  const { login, loginAsDemo } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const demoRoles: { role: Role; label: string; email: string; icon: React.ReactNode; color: string }[] = [
    {
      role: 'student',
      label: 'Student Portal',
      email: 'student@eduvia.com',
      icon: <GraduationCap className="w-4 h-4" />,
      color: 'hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40',
    },
    {
      role: 'teacher',
      label: 'Faculty / Teacher',
      email: 'teacher@eduvia.com',
      icon: <UserCheck className="w-4 h-4" />,
      color: 'hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/40',
    },
    {
      role: 'placement',
      label: 'Placement Officer (TPO)',
      email: 'placement@eduvia.com',
      icon: <Briefcase className="w-4 h-4" />,
      color: 'hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40',
    },
    {
      role: 'recruiter',
      label: 'Company Recruiter',
      email: 'recruiter@eduvia.com',
      icon: <Building2 className="w-4 h-4" />,
      color: 'hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-950/40',
    },
    {
      role: 'admin',
      label: 'Platform Admin',
      email: 'admin@eduvia.com',
      icon: <ShieldCheck className="w-4 h-4" />,
      color: 'hover:border-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-950/40',
    },
  ];

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Validation Error', 'Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) {
        toast.success('Welcome back!', 'Signed in successfully.');
        navigate('/app/student');
      } else {
        toast.error('Invalid Credentials', 'Please check your email and password or use 1-Click Demo Login.');
      }
    }, 600);
  };

  const handleDemoLogin = (role: Role) => {
    loginAsDemo(role);
    toast.success(`Signed in as ${role.toUpperCase()}`, `Exploring the ${role} portal`);
    navigate(`/app/${role}`);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 rounded-3xl shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <Logo size="large" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-2">
            Welcome back to EduPath
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to continue learning, manage placements, or hire engineers.
          </p>
        </div>

        {/* 1-Click Quick Demo Login Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              1-Click Demo Credentials:
            </span>
            <span className="text-[10px] text-slate-400">Instant Access</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {demoRoles.map((d) => (
              <button
                key={d.role}
                type="button"
                onClick={() => handleDemoLogin(d.role)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all text-left ${d.color} ${
                  d.role === 'admin' ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="p-1 rounded-lg bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shrink-0 shadow-xs">
                  {d.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[11px] truncate">{d.label}</p>
                  <p className="text-[9px] text-slate-400 truncate">{d.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Or Sign in with Email
          </span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleStandardLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@eduvia.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Remember this browser</span>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="medium"
            fullWidth
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In to EduPath
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Don't have an account yet?{' '}
          <Link to="/signup" className="font-bold text-indigo-600 hover:text-indigo-500">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};
