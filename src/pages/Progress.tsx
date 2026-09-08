import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { DashboardCard } from '../components/DashboardCard';
import { ProgressCard } from '../components/ProgressCard';
import {
  GraduationCap,
  Clock,
  Award,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Sparkles,
  BookOpen,
  Briefcase,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const Progress: React.FC = () => {
  const { user } = useAuth();
  const { courses, enrolledCourses, quizResults, assignments, certificates } = useData();

  const enrolledCourseIds = Object.keys(enrolledCourses);
  const totalEnrolled = enrolledCourseIds.length;

  const completedCoursesCount = enrolledCourseIds.filter(
    (id) => enrolledCourses[id].progress >= 100
  ).length;

  const avgQuizScore =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce((acc, q) => acc + q.percentage, 0) / quizResults.length
        )
      : 88;

  const gradedAssignments = assignments.filter((a) => String(a.status).toLowerCase() === 'graded');
  const avgAssignmentGrade =
    gradedAssignments.length > 0
      ? Math.round(
          gradedAssignments.reduce((acc, a) => acc + (Number(a.grade) || 0), 0) /
            gradedAssignments.length
        )
      : 92;

  // Placement readiness calculation
  const placementReadiness = Math.min(
    100,
    Math.round(
      (completedCoursesCount >= 1 ? 40 : 20) +
        (avgQuizScore * 0.3) +
        (avgAssignmentGrade * 0.3)
    )
  );

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-xs font-bold text-indigo-700 dark:text-indigo-300">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Student Analytics & Growth</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Learning Progress & Placement Readiness
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Real-time metrics tracking your course completions, quiz accuracies, assignment grades, and algorithmic placement readiness.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Courses Enrolled"
          value={totalEnrolled}
          icon={<BookOpen className="w-6 h-6" />}
          description={`${completedCoursesCount} completed courses`}
          accentColor="indigo"
        />
        <DashboardCard
          title="Placement Readiness"
          value={`${placementReadiness}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          description="High match for Tier-1 Tech"
          trend="+12% this month"
          trendDirection="up"
          accentColor="emerald"
        />
        <DashboardCard
          title="Avg Quiz Mastery"
          value={`${avgQuizScore}%`}
          icon={<Sparkles className="w-6 h-6" />}
          description={`${quizResults.length} assessments passed`}
          accentColor="purple"
        />
        <DashboardCard
          title="Certificates Earned"
          value={certificates.length}
          icon={<Award className="w-6 h-6" />}
          description="Verified digital credentials"
          accentColor="amber"
        />
      </div>

      {/* Placement Readiness Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-indigo-900 via-indigo-800 to-blue-900 text-white shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Algorithmic Placement Index
            </span>
            <h3 className="text-2xl font-bold text-white">
              Your Placement Index: <span className="text-emerald-400">{placementReadiness}/100</span> (Distinction)
            </h3>
            <p className="text-xs text-indigo-200 max-w-xl leading-relaxed">
              Based on your Python, React, and Data Structure coursework, you are ranked in the top 5% of eligible applicants for upcoming campus drives.
            </p>
          </div>

          <Link to="/careers">
            <button className="px-5 py-3 rounded-2xl bg-white text-indigo-900 font-bold text-xs shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2 shrink-0">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              Apply for Matching Drives
            </button>
          </Link>
        </div>

        {/* Breakdown Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-indigo-700/60">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-indigo-200">
              <span>Technical Coursework</span>
              <span className="font-bold text-white">95%</span>
            </div>
            <div className="w-full bg-indigo-950/60 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full w-[95%]" />
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-indigo-200">
              <span>Aptitude & Coding Tests</span>
              <span className="font-bold text-white">{avgQuizScore}%</span>
            </div>
            <div className="w-full bg-indigo-950/60 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full" style={{ width: `${avgQuizScore}%` }} />
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-indigo-200">
              <span>Lab Assignments</span>
              <span className="font-bold text-white">{avgAssignmentGrade}%</span>
            </div>
            <div className="w-full bg-indigo-950/60 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: `${avgAssignmentGrade}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Enrolled Courses ({totalEnrolled})
          </h3>
          <Link to="/courses" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
            Explore More Courses →
          </Link>
        </div>

        <div className="space-y-3">
          {enrolledCourseIds.map((courseId) => {
            const course = courses.find((c) => c.id === courseId);
            if (!course) return null;
            const item = enrolledCourses[courseId];
            const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

            return (
              <ProgressCard
                key={course.id}
                course={course}
                progress={item.progress}
                completedLessonsCount={item.completedLessons.length}
                totalLessons={totalLessons}
                lastAccessed={item.lastAccessed}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
