import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { DashboardCard } from '../../components/DashboardCard';
import { ProgressCard } from '../../components/ProgressCard';
import { BadgesView } from '../../components/BadgesView';
import { Button } from '../../components/Button';
import { Link, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  TrendingUp,
  Award,
  Briefcase,
  Play,
  Calendar,
  Sparkles,
  FileText,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  Zap,
  LayoutDashboard,
  GraduationCap,
} from 'lucide-react';

interface StudentDashboardProps {
  initialTab?: 'overview' | 'badges' | 'courses';
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ initialTab = 'overview' }) => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get('tab');

  const [activeMainTab, setActiveMainTab] = useState<'overview' | 'badges' | 'courses'>(
    urlTab === 'badges' || initialTab === 'badges'
      ? 'badges'
      : urlTab === 'courses' || initialTab === 'courses'
      ? 'courses'
      : 'overview'
  );

  useEffect(() => {
    if (urlTab === 'badges') setActiveMainTab('badges');
    else if (urlTab === 'courses') setActiveMainTab('courses');
    else if (urlTab === 'overview') setActiveMainTab('overview');
  }, [urlTab]);

  const {
    courses,
    enrolledCourses,
    applications,
    assignments,
    quizResults,
    certificates,
    jobs,
    badges,
    studentXp,
    studentLevel,
    unlockedBadgesCount,
  } = useData();

  const enrolledCourseIds = Object.keys(enrolledCourses);
  const activeCourseId = enrolledCourseIds[0] || courses[0]?.id;
  const activeCourse = courses.find((c) => c.id === activeCourseId);
  const activeEnrollment = activeCourse ? enrolledCourses[activeCourse.id] : null;

  const pendingAssignments = assignments.filter((a) => a.status === 'pending');
  const upcomingApplications = applications.filter((a) => a.status !== 'rejected');

  const handleTabChange = (tab: 'overview' | 'badges' | 'courses') => {
    setActiveMainTab(tab);
    setSearchParams(tab === 'overview' ? {} : { tab });
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Top Primary Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            id="tab-student-overview"
            onClick={() => handleTabChange('overview')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeMainTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview Dashboard
          </button>

          <button
            id="tab-student-badges"
            onClick={() => handleTabChange('badges')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeMainTab === 'badges'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Badges & Rewards</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              {unlockedBadgesCount}/{badges.length}
            </span>
          </button>

          <button
            id="tab-student-courses"
            onClick={() => handleTabChange('courses')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeMainTab === 'courses'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            My Courses ({enrolledCourseIds.length})
          </button>
        </div>

        {/* Level Pill Quick Indicator */}
        <div
          onClick={() => handleTabChange('badges')}
          className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-xs hover:bg-indigo-100/60 transition-all"
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Lvl {studentLevel.level}: {studentLevel.title}</span>
          <span className="text-[10px] font-mono text-indigo-500 font-normal">({studentXp} XP)</span>
        </div>
      </div>

      {activeMainTab === 'badges' ? (
        /* Badges & Rewards Tab Content */
        <BadgesView />
      ) : activeMainTab === 'courses' ? (
        /* My Courses Tab Content */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Enrolled Courses</h3>
              <p className="text-xs text-slate-500">Track your curriculum completion and earn master badges.</p>
            </div>
            <Link to="/courses">
              <Button size="small" variant="primary">
                + Browse More Courses
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {enrolledCourseIds.map((courseId) => {
              const c = courses.find((item) => item.id === courseId);
              const enroll = enrolledCourses[courseId];
              if (!c || !enroll) return null;
              const total = c.modules.reduce((a, b) => a + b.lessons.length, 0);

              return (
                <ProgressCard
                  key={c.id}
                  course={c}
                  progress={enroll.progress}
                  completedLessonsCount={enroll.completedLessons.length}
                  totalLessons={total}
                  lastAccessed={enroll.lastAccessed}
                />
              );
            })}
          </div>
        </div>
      ) : (
        /* Standard Overview Tab Content */
        <>
          {/* Welcome Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white p-6 sm:p-10 shadow-xl">
            <div className="relative z-10 space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-indigo-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>CSE Engineering Batch 2026 • Lvl {studentLevel.level} ({studentXp} XP)</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Welcome back, {user?.name || 'Sai Krishna'}! 👋
              </h1>

              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                You have <strong>{pendingAssignments.length} pending assignment</strong>, <strong>{unlockedBadgesCount} achievement badges earned</strong>, and <strong>{upcomingApplications.length} active placement drives</strong> under review by recruiters.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {activeCourse && (
                  <Link to={`/app/student/learn/${activeCourse.id}`}>
                    <button className="px-5 py-2.5 rounded-2xl bg-white text-indigo-900 font-bold text-xs shadow-md hover:bg-indigo-50 transition-all flex items-center gap-2">
                      <Play className="w-4 h-4 text-indigo-600 fill-current" />
                      Resume Learning: {activeCourse.title}
                    </button>
                  </Link>
                )}

                <button
                  onClick={() => handleTabChange('badges')}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold text-xs border border-amber-400/40 transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  View My Badges ({unlockedBadgesCount})
                </button>

                <Link to="/resume-builder">
                  <button className="px-5 py-2.5 rounded-2xl bg-indigo-700/80 hover:bg-indigo-700 text-white font-bold text-xs border border-indigo-500/40 transition-all flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Update ATS Resume
                  </button>
                </Link>
              </div>
            </div>

            {/* Decorative background glow */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/20 to-transparent pointer-events-none hidden sm:block" />
          </div>

          {/* Resume Builder Quick-Action Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-50 via-white to-blue-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-blue-950/30 border border-indigo-200/80 dark:border-indigo-800/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Build Your Resume
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    Career Ready
                  </span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-xl">
                  Create a professional resume using your EDUVIA profile, skills, courses, and verified certificates.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link to="/resume-builder">
                <Button size="small" variant="primary" leftIcon={<FileText className="w-3.5 h-3.5" />}>
                  Build Resume
                </Button>
              </Link>
            </div>
          </div>

          {/* KPI Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              title="Active Courses"
              value={enrolledCourseIds.length}
              icon={<BookOpen className="w-6 h-6" />}
              description="Enrolled CSE Subjects"
              accentColor="indigo"
            />
            <div
              onClick={() => handleTabChange('badges')}
              className="cursor-pointer"
            >
              <DashboardCard
                title="Badges Earned"
                value={`${unlockedBadgesCount} / ${badges.length}`}
                icon={<Award className="w-6 h-6" />}
                description={`Level ${studentLevel.level} (${studentXp} XP)`}
                trend="+150 XP recent"
                trendDirection="up"
                accentColor="amber"
              />
            </div>
            <DashboardCard
              title="Pending Labs"
              value={pendingAssignments.length}
              icon={<FileText className="w-6 h-6" />}
              description="Action required"
              accentColor="indigo"
            />
            <DashboardCard
              title="Campus Applications"
              value={applications.length}
              icon={<Briefcase className="w-6 h-6" />}
              description="Direct in-portal drives"
              accentColor="purple"
            />
          </div>

          {/* Badges Spotlight Strip */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 border border-amber-200 dark:border-amber-800 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Student Rewards & Badges System
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    Active
                  </span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Earn XP by completing video lessons, scoring &gt;90% in quizzes, and submitting code assignments.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleTabChange('badges')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>Open Badges Tab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Continue Learning + Scheduled Interview Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left 2 Cols: In-Progress Course */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Continue Where You Left Off
                </h3>
                <button
                  onClick={() => handleTabChange('courses')}
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  All Courses ({enrolledCourseIds.length}) →
                </button>
              </div>

              {activeCourse && activeEnrollment && (
                <ProgressCard
                  course={activeCourse}
                  progress={activeEnrollment.progress}
                  completedLessonsCount={activeEnrollment.completedLessons.length}
                  totalLessons={activeCourse.modules.reduce((a, b) => a + b.lessons.length, 0)}
                  lastAccessed={activeEnrollment.lastAccessed}
                />
              )}

              {/* Quick Shortcuts to Assessment, Badges, & Certificates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <Link
                  to="/app/student/quizzes"
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 transition-all flex items-center gap-3 shadow-xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">
                      Course Quizzes
                    </p>
                    <p className="text-[10px] text-slate-400">Earn Quiz Badges</p>
                  </div>
                </Link>

                <button
                  onClick={() => handleTabChange('badges')}
                  className="text-left p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 transition-all flex items-center gap-3 shadow-xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">
                      Badges & XP
                    </p>
                    <p className="text-[10px] text-slate-400">{unlockedBadgesCount} Badges Unlocked</p>
                  </div>
                </button>

                <Link
                  to="/app/student/certificates"
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 transition-all flex items-center gap-3 shadow-xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">
                      My Certificates
                    </p>
                    <p className="text-[10px] text-slate-400">{certificates.length} Verified Credentials</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Col: Next Interview & Application Pipeline Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Recruitment Spotlight
              </h3>

              {/* Scheduled Interview Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Upcoming Round 1
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Sep 5, 2026</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Tata Consultancy Services
                  </h4>
                  <p className="text-xs text-slate-500">Associate Software Engineer (Digital)</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs space-y-1">
                  <p className="text-slate-500">Panelist: Sanjay Deshmukh</p>
                  <p className="font-bold text-indigo-600 dark:text-indigo-400">11:00 AM - 12:00 PM IST</p>
                </div>

                <Link to="/app/student/interviews">
                  <Button size="small" variant="primary" fullWidth>
                    Join Live Interview Room
                  </Button>
                </Link>
              </div>

              {/* Quick Job Recommendation */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Recommended For You
                  </h4>
                  <Link to="/careers" className="text-[11px] text-indigo-600 font-bold hover:underline">
                    View All →
                  </Link>
                </div>

                {jobs.slice(0, 2).map((j) => (
                  <div key={j.id} className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{j.title}</p>
                      <p className="text-[10px] text-slate-500">{j.company} • {j.salary}</p>
                    </div>
                    <Link to={`/jobs/${j.id}`}>
                      <Button size="small" variant="outline">
                        Apply
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

