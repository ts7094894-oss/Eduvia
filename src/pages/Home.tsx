import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { CourseCard } from '../components/CourseCard';
import { JobApplicationModal } from '../components/JobApplicationModal';
import { ContactSection } from '../components/ContactSection';
import { useData } from '../context/DataContext';
import { Job } from '../types';
import {
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  BookOpen,
  Building2,
  TrendingUp,
  Star,
  ShieldCheck,
  Play,
  FileCheck,
  ChevronRight,
  Code2,
  Flame,
  Search,
  Layers,
  FileText,
  Mail,
  MapPin,
  Phone,
  Clock,
} from 'lucide-react';

export const Home: React.FC = () => {
  const { courses, jobs } = useData();
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);

  const featuredCourses = courses.slice(0, 4);
  const featuredJobs = jobs.slice(0, 4);

  const stats = [
    { label: 'Enrolled Students', value: '10,000+', icon: Users, sub: 'Active CSE learners' },
    { label: 'Curated Courses', value: '500+', icon: BookOpen, sub: 'Industry-aligned curriculum' },
    { label: 'Expert Mentors', value: '100+', icon: GraduationCap, sub: 'FAANG & Top Faculty' },
    { label: 'Job Opportunities', value: '250+', icon: Briefcase, sub: 'Direct campus hiring' },
  ];

  const steps = [
    {
      step: '01',
      title: 'Learn',
      description: 'Join structured courses, watch HD video lessons, and download verified study notes curated by industry experts.',
      icon: BookOpen,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      step: '02',
      title: 'Practice',
      description: 'Solve real-world coding problems, take timed MCQ quizzes, and submit graded lab assignments.',
      icon: Code2,
      color: 'from-indigo-600 to-purple-600',
    },
    {
      step: '03',
      title: 'Get Certified',
      description: 'Complete course milestones, pass final certifications, and receive verified digital credentials with QR validation.',
      icon: Award,
      color: 'from-purple-600 to-pink-600',
    },
    {
      step: '04',
      title: 'Get Hired',
      description: 'Search campus drives, apply directly inside EduPath without external redirects, and track interview calls.',
      icon: Briefcase,
      color: 'from-pink-600 to-rose-600',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Unified EdTech + Placement Ecosystem',
      description: 'No more jumping between learning platforms and job portals. Learn skills and apply for matching companies in the same tab.',
      icon: Sparkles,
    },
    {
      title: 'In-Platform Job Applications',
      description: 'Apply directly to TCS, Infosys, Wipro, and Deloitte campus drives with automatic profile and resume parsing.',
      icon: CheckCircle2,
    },
    {
      title: 'Automated Job Matching Algorithm',
      description: 'Our placement engine matches your course completions, quiz scores, and skills with company eligibility criteria.',
      icon: TrendingUp,
    },
    {
      title: 'Comprehensive Placement Prep',
      description: 'Master Quantitative Aptitude, Logical Reasoning, Top 100 Technical Coding questions, and Mock HR interviews.',
      icon: ShieldCheck,
    },
  ];

  const testimonials = [
    {
      name: 'Pooja Reddy',
      role: 'Associate Software Engineer @ TCS (7.5 LPA)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      comment: 'EduPath changed my college placement journey! I completed the Python and DSA masterclasses, built my resume on the portal, and applied directly for TCS Digital. Got selected in the first attempt!',
    },
    {
      name: 'Venkata Sai Kumar',
      role: 'Specialist Programmer @ Infosys (9.5 LPA)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      comment: 'The in-platform video player, interactive timed quizzes, and immediate application tracking gave me the edge during campus season. Truly a world-class platform.',
    },
    {
      name: 'Ananya Deshmukh',
      role: 'Full Stack Engineer @ Accenture',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      comment: 'The single-click resume builder combined with real company drives makes EduPath the ultimate tool every engineering college needs.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        {/* Decorative Background Accents */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-500/15 via-blue-500/10 to-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/80 text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-xs animate-in fade-in slide-in-from-bottom-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Next-Gen College LMS + Campus Placement Portal</span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Learn Without Limits with{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduPath
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Learn from structured courses, practice your skills, earn verified certificates, and find your next career opportunity — <strong className="text-slate-900 dark:text-white font-semibold">all in one place</strong> without external redirects.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link to="/courses">
                <Button size="large" variant="primary" leftIcon={<BookOpen className="w-5 h-5" />}>
                  Explore Courses
                </Button>
              </Link>
              <Link to="/resume-builder">
                <Button size="large" variant="secondary" leftIcon={<FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}>
                  Resume Builder
                </Button>
              </Link>
              <Link to="/careers">
                <Button size="large" variant="outline" leftIcon={<Briefcase className="w-5 h-5" />}>
                  Find Campus Jobs
                </Button>
              </Link>
            </div>

            {/* Concept Flow Banner */}
            <div className="pt-8">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 sm:px-4 sm:py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                  <BookOpen className="w-3.5 h-3.5" /> Learn
                </span>
                <span className="text-slate-400">→</span>
                <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <Code2 className="w-3.5 h-3.5" /> Practice
                </span>
                <span className="text-slate-400">→</span>
                <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                  <Award className="w-3.5 h-3.5" /> Get Certified
                </span>
                <span className="text-slate-400">→</span>
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <FileText className="w-3.5 h-3.5" /> Build Resume
                </span>
                <span className="text-slate-400">→</span>
                <span className="flex items-center gap-1 text-pink-600 dark:text-pink-400">
                  <Briefcase className="w-3.5 h-3.5" /> Find Jobs
                </span>
                <span className="text-slate-400">→</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Get Hired
                </span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center space-y-2 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {stat.value}
                  </h3>
                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{stat.label}</p>
                    <p className="text-[11px] text-slate-400">{stat.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. ABOUT EDUPATH SECTION (Required Section) */}
      <section id="about" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-900/90 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-indigo-800/60 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>About EduPath</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Learn. Grow. Get Hired.
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                EduPath is a modern learning and career platform designed to help students build skills, track their learning progress, earn certifications, prepare for placements, create professional resumes, and discover career opportunities — all in one place.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <BookOpen className="w-5 h-5 text-indigo-400 mb-1" />
                  <h4 className="text-xs font-bold text-white">Skill Building</h4>
                  <p className="text-[11px] text-slate-300">500+ curated engineering courses</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <Award className="w-5 h-5 text-amber-400 mb-1" />
                  <h4 className="text-xs font-bold text-white">Certifications</h4>
                  <p className="text-[11px] text-slate-300">Verified credentials with QR codes</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <Briefcase className="w-5 h-5 text-emerald-400 mb-1" />
                  <h4 className="text-xs font-bold text-white">Direct Hiring</h4>
                  <p className="text-[11px] text-slate-300">250+ active campus placement drives</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-end gap-3 text-center lg:text-right">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 w-full text-center space-y-2">
                <span className="text-3xl font-black text-white">100%</span>
                <p className="text-xs font-bold text-indigo-200">Integrated Platform</p>
                <p className="text-[11px] text-slate-300">Zero third-party redirects required</p>
              </div>
              <Link to="/about" className="w-full">
                <Button variant="outline" size="medium" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW EDUPATH WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Methodology
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How EduPath Works
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A seamless four-step pipeline connecting student classroom learning with verified corporate hiring drives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-mono font-black text-slate-200 dark:text-slate-800 group-hover:text-indigo-500/30 transition-colors">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{s.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Step {s.step} in Career Track</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. POPULAR COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Academic Excellence
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Popular College Courses
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg">
              Master core Computer Science subjects, industry frameworks, and algorithmic problem-solving.
            </p>
          </div>

          <Link to="/courses">
            <Button variant="outline" size="medium" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All 500+ Courses
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE EDUPATH */}
      <section className="bg-gradient-to-b from-slate-100/70 to-slate-50 dark:from-slate-900/50 dark:to-slate-950 py-16 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>The All-In-One Solution</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                Why Engineering Colleges & Students Choose EduPath
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Traditional education keeps coursework, coding practice, and job applications disconnected. EduPath unites them into a single, high-performance platform designed specifically for CSE students and campus recruitment cells.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {whyChooseUs.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual Feature Card Showcase */}
            <div className="relative">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                      E
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">EduPath Career Engine</h4>
                      <p className="text-[11px] text-slate-400">Direct Campus Placement Integration</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                    Live Status
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Python Masterclass Completed</p>
                        <p className="text-[10px] text-slate-400">Grade: A+ (Distinction) • Verified</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-600">100%</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">TCS Digital Drive Match</p>
                        <p className="text-[10px] text-slate-400">Skills match: Python, Java, SQL, DSA</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                      85% Match
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <p className="text-xs font-bold text-indigo-950 dark:text-indigo-200">Interview Call Scheduled</p>
                        <p className="text-[10px] text-indigo-700 dark:text-indigo-300">Technical Round on Sep 5, 2026</p>
                      </div>
                    </div>
                    <Link to="/app/student/applications">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 underline">
                        View
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Zero external redirects required</span>
                  <span className="font-semibold text-indigo-600">Built-in ATS Pipeline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5. ATS RESUME BUILDER SHOWCASE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 border border-indigo-100 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
                <FileText className="w-3.5 h-3.5" />
                <span>Recruiter & ATS-Optimized</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Built-in ATS Resume Builder for Engineering Students
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Create a high-impact, ATS-ready tech resume in minutes. Seamlessly import your verified EduPath course certificates, completed project repositories, and technical skills with one click.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>1-Click EduPath Profile & Certificate Sync</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>4 Recruiter-Approved A4 Templates</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Live Job Match Score & Skill Gap Check</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Clean PDF Export & Direct 1-Click Apply</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link to="/resume-builder">
                  <Button size="large" variant="primary" leftIcon={<FileText className="w-5 h-5" />} rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Open Resume Builder
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button size="large" variant="secondary" leftIcon={<Briefcase className="w-5 h-5" />}>
                    Browse Placement Drives
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-bold text-slate-500 ml-2">ats_resume_preview.pdf</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    95% ATS Score
                  </span>
                </div>
                <div className="space-y-3 font-sans text-left">
                  <div className="space-y-1">
                    <p className="text-sm font-black text-slate-900 dark:text-white">Rahul Sharma</p>
                    <p className="text-[11px] text-indigo-600 font-bold">B.Tech Computer Science • CGPA 8.9</p>
                    <p className="text-[10px] text-slate-400">rahul.sharma@college.edu • Bangalore, India</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 space-y-1">
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Verified Certifications</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[9px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 px-1.5 py-0.5 rounded">Python DSA Masterclass</span>
                      <span className="text-[9px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.5 rounded">Full Stack Web Dev</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 space-y-1">
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Technical Skills</p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-300">Java, Python, React.js, Node.js, SQL, Docker, Git</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CAREER OPPORTUNITIES & JOB SEARCH PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Campus Recruitment
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Job & Internship Drives
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg">
              Apply directly inside EduPath to premier technology employers with our one-click application engine.
            </p>
          </div>

          <Link to="/careers">
            <Button variant="outline" size="medium" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore All 250+ Jobs
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      {job.company} • <span className="text-slate-500">{job.location}</span>
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                  {job.salary}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  {job.jobType}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  {job.workplaceType}
                </span>
                {job.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {job.description}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Deadline: <strong className="text-slate-600 dark:text-slate-300">{job.deadline}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <Link to={`/jobs/${job.id}`}>
                    <Button size="small" variant="ghost">
                      Details
                    </Button>
                  </Link>
                  <Button
                    size="small"
                    variant="primary"
                    onClick={() => setSelectedJobForModal(job)}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PLACEMENT SUCCESS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Proven Results
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student Placement Success Stories
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Hear from engineering graduates who learned, certified, and got placed through EduPath.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. DEDICATED CONTACT US SECTION (Required) */}
      <div className="py-8">
        <ContactSection id="contact" />
      </div>

      {/* 9. CALL TO ACTION (CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-blue-600 text-white p-8 sm:p-14 overflow-hidden shadow-2xl text-center space-y-6">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-indigo-100">
              Ready to Advance Your Tech Career?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Join EduPath Today & Unlock Campus Opportunities
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 leading-relaxed font-normal">
              Whether you want to master Python and DSA, build an ATS-compliant resume, or apply directly for 250+ tech roles, EduPath is your launchpad.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/signup">
                <button className="px-6 py-3.5 rounded-xl bg-white text-indigo-700 font-bold text-sm shadow-xl hover:bg-indigo-50 transition-all active:scale-95">
                  Create Student Account
                </button>
              </Link>
              <Link to="/login">
                <button className="px-6 py-3.5 rounded-xl bg-indigo-900/60 border border-white/20 text-white font-bold text-sm hover:bg-indigo-900/80 transition-all">
                  Instant Demo Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Direct In-Platform Job Application Modal */}
      <JobApplicationModal
        job={selectedJobForModal}
        isOpen={!!selectedJobForModal}
        onClose={() => setSelectedJobForModal(null)}
      />
    </div>
  );
};
