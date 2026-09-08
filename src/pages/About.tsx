import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import {
  Sparkles,
  BookOpen,
  Award,
  Briefcase,
  Code2,
  CheckCircle2,
  Users,
  ShieldCheck,
  GraduationCap,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Breadcrumb Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700 dark:text-slate-200">About EduPath</span>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>About Our Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            About EduPath
          </h1>
          <p className="text-base sm:text-lg text-indigo-600 dark:text-indigo-400 font-bold">
            Learn. Grow. Get Hired.
          </p>
        </div>
      </div>

      {/* Core Statement Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white border border-indigo-900/60 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Empowering the Next Generation of Engineers & Leaders
          </h2>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            EduPath is a modern learning and career platform designed to help students build skills, track their learning progress, earn certifications, prepare for placements, create professional resumes, and discover career opportunities — all in one place.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/courses">
              <Button variant="primary" size="medium">
                Explore All Courses
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="medium">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>

        {/* Ambient background accent */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Four Pillars */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Platform Pillars
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need Under One Roof
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Learn & Upskill',
              desc: 'High-definition video curriculum, interactive slides, and faculty-led masterclasses across Web, AI, Data, and Core CS.',
              icon: BookOpen,
              color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900/60',
            },
            {
              title: 'Practice & Validate',
              desc: 'Solve algorithmic coding challenges, submit lab assignments, and take timed MCQ assessments with instant grading.',
              icon: Code2,
              color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900/60',
            },
            {
              title: 'Earn Verified Credentials',
              desc: 'Tamper-proof digital certificates featuring instant QR validation recognized by top recruitment partners.',
              icon: Award,
              color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-900/60',
            },
            {
              title: 'Campus Placements',
              desc: 'Apply directly to premier technology recruiters, track rounds, and practice mock technical interviews.',
              icon: Briefcase,
              color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900/60',
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${pillar.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{pillar.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Office & Contact Callout */}
      <div className="bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            Have questions or want to partner with EduPath?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Reach out to our campus desk in Chennai, Tamil Nadu, India • support@edupath.com
          </p>
        </div>
        <Link to="/contact">
          <Button variant="primary" size="medium" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Contact Support & Admissions
          </Button>
        </Link>
      </div>
    </div>
  );
};
