import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button';
import {
  Star,
  Clock,
  Users,
  Play,
  CheckCircle2,
  Bookmark,
  Award,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Share2,
  Lock,
  Briefcase,
} from 'lucide-react';

export const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { courses, enrolledCourses, bookmarkedCourses, toggleBookmarkCourse, enrollCourse } = useData();
  const toast = useToast();

  const course = courses.find((c) => c.id === id);
  const [expandedModule, setExpandedModule] = useState<string | null>(
    course?.modules[0]?.id || null
  );

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Course Not Found</h2>
        <p className="text-xs text-slate-500">The course you requested does not exist or has been archived.</p>
        <Link to="/courses">
          <Button variant="primary" size="small">
            Back to Courses
          </Button>
        </Link>
      </div>
    );
  }

  const isEnrolled = !!enrolledCourses[course.id];
  const progress = enrolledCourses[course.id]?.progress || 0;
  const isBookmarked = bookmarkedCourses.includes(course.id);

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const instructorName = typeof course.instructor === 'object' ? course.instructor.name : course.instructor;
  const instructorTitle = typeof course.instructor === 'object' ? course.instructor.title : 'Principal Faculty Lead';
  const instructorAvatar = typeof course.instructor === 'object' && course.instructor.avatar ? course.instructor.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80';
  const instructorBio = typeof course.instructor === 'object' && course.instructor.bio ? course.instructor.bio : 'Senior educator and tech consultant with 10+ years specializing in enterprise engineering systems.';

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.info('Sign In Required', 'Please log in to enroll and start learning.');
      navigate('/login');
      return;
    }
    enrollCourse(course.id);
    toast.success('Enrolled!', `You are now enrolled in ${course.title}`);
    navigate(`/app/student/learn/${course.id}`);
  };

  const handleBookmark = () => {
    toggleBookmarkCourse(course.id);
    toast.info(isBookmarked ? 'Removed from Bookmarks' : 'Course Saved', course.title);
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="pb-20">
      {/* Top Banner / Hero */}
      <section className="bg-slate-900 text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-6">
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to all courses
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left Content info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-bold rounded-lg bg-indigo-600 text-white">
                  {course.category}
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-800 text-indigo-300 border border-slate-700">
                  {course.difficulty} Level
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Placement Ready
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {course.description}
              </p>

              {/* Course Meta Specs */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({course.reviews?.length || 150} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>{course.studentsCount.toLocaleString()} students enrolled</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>{course.duration} ({totalLessons} lessons)</span>
                </div>
              </div>

              {/* Instructor Capsule */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <img
                  src={instructorAvatar}
                  alt={instructorName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40"
                />
                <div>
                  <p className="text-xs text-slate-400">Created by</p>
                  <p className="text-xs font-bold text-white">{instructorName} • {instructorTitle}</p>
                </div>
              </div>
            </div>

            {/* Right Sticky Enrollment Card for Desktop */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 text-slate-900 dark:text-slate-100">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Link
                    to={isEnrolled ? `/app/student/learn/${course.id}` : '#'}
                    onClick={isEnrolled ? undefined : handleEnroll}
                    className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </Link>
                </div>
              </div>

              {/* Enrollment State CTA */}
              <div className="space-y-3">
                {isEnrolled ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Your Progress</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <Link to={`/app/student/learn/${course.id}`} className="block">
                      <Button variant="primary" size="large" fullWidth leftIcon={<Play className="w-4 h-4" />}>
                        Continue Learning
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="large"
                    fullWidth
                    onClick={handleEnroll}
                    leftIcon={<Sparkles className="w-4 h-4" />}
                  >
                    Enroll Now (Free with College Account)
                  </Button>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="small"
                    fullWidth
                    onClick={handleBookmark}
                    leftIcon={<Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />}
                  >
                    {isBookmarked ? 'Saved to Bookmarks' : 'Bookmark Course'}
                  </Button>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white">This course includes:</h4>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{course.duration} on-demand HD video lessons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    <span>Comprehensive lecture notes & source code</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
                    <span>Interactive chapter quizzes with instant feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Official EDUVIA Certificate of Completion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Direct eligibility for matching campus drives</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Detail Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Course Details Tabs & Syllabus */}
          <div className="lg:col-span-2 space-y-10">
            {/* What you'll learn */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                What You Will Learn
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.whatYouWillLearn?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Syllabus / Modules Accordion */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Course Syllabus & Curriculum
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {course.modules.length} Modules • {totalLessons} Lessons • {course.duration} Total Length
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {course.modules.map((module, mIdx) => {
                  const isExpanded = expandedModule === module.id;
                  return (
                    <div
                      key={module.id}
                      className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900"
                    >
                      {/* Module Header */}
                      <button
                        type="button"
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                      >
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            Module {mIdx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {module.title}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            {module.lessons.length} lessons • {module.duration}
                          </p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-500" />
                        )}
                      </button>

                      {/* Module Lessons list */}
                      {isExpanded && (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                          {module.lessons.map((lesson, lIdx) => (
                            <div
                              key={lesson.id}
                              className="p-4 sm:px-6 flex items-center justify-between gap-4 text-xs hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                                  <Play className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                                    {lIdx + 1}. {lesson.title}
                                  </span>
                                  {lesson.freePreview && (
                                    <span className="ml-2 px-2 py-0.5 text-[9px] font-bold rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                                      Free Preview
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-slate-400 font-mono text-[11px]">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Prerequisites & Requirements
              </h3>
              <ul className="space-y-2">
                {course.prerequisites?.map((prereq, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Student Reviews */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Student Feedback & Reviews
                </h3>
                <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>

              <div className="space-y-4">
                {course.reviews?.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.avatar}
                          alt={rev.userName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {rev.userName}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructor Bio & Placement Alignment sidebar */}
          <div className="space-y-6">
            {/* Instructor Bio Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
              <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                About the Instructor
              </h4>
              <div className="flex items-center gap-3">
                <img
                  src={instructorAvatar}
                  alt={instructorName}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{instructorName}</h4>
                  <p className="text-xs text-slate-500">{instructorTitle}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {instructorBio}
              </p>
            </div>

            {/* Target Job Placement Card */}
            <div className="bg-gradient-to-tr from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 border border-indigo-200 dark:border-indigo-800/80 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Placement Alignment</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Prepares you for roles at:
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Completing this course fulfills the technical round requirements for TCS Digital, Infosys SP, Wipro Turbo, and Amazon SDE Intern drives.
              </p>
              <Link to="/careers">
                <Button size="small" variant="primary" fullWidth>
                  Explore Matching Campus Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
