import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button';
import {
  Play,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  HelpCircle,
  Award,
  BookOpen,
  Volume2,
  Maximize,
  RotateCcw,
  Sparkles,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Learn: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, enrolledCourses, markLessonCompleted, unmarkLessonCompleted } = useData();
  const toast = useToast();

  const course = courses.find((c) => c.id === id);
  const enrollment = id ? enrolledCourses[id] : null;

  // Flatten all lessons with their module context
  const allLessons = React.useMemo(() => {
    if (!course) return [];
    const list: {
      moduleId: string;
      moduleTitle: string;
      lessonId: string;
      lessonTitle: string;
      duration: string;
      videoUrl: string;
      notes?: string;
    }[] = [];

    course.modules.forEach((m) => {
      m.lessons.forEach((l) => {
        list.push({
          moduleId: m.id,
          moduleTitle: m.title,
          lessonId: l.id,
          lessonTitle: l.title,
          duration: l.duration,
          videoUrl: l.videoUrl,
          notes: l.notes,
        });
      });
    });
    return list;
  }, [course]);

  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'resources'>('overview');
  const [studentNotes, setStudentNotes] = useState<string>('');

  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  const isCurrentCompleted = currentLesson
    ? !!enrollment?.completedLessons.includes(currentLesson.lessonId)
    : false;

  const totalLessons = allLessons.length;
  const completedCount = enrollment?.completedLessons.length || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Load saved scratchpad notes for this course
  useEffect(() => {
    if (course) {
      const savedNotes = localStorage.getItem(`eduvia_notes_${course.id}`);
      if (savedNotes) setStudentNotes(savedNotes);
    }
  }, [course]);

  if (!course || !currentLesson) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Course Not Found</h2>
        <p className="text-xs text-slate-500">Please enroll in this course before accessing lessons.</p>
        <Link to="/courses">
          <Button variant="primary" size="small">
            Explore Courses
          </Button>
        </Link>
      </div>
    );
  }

  const handleToggleComplete = () => {
    if (!id) return;
    if (isCurrentCompleted) {
      unmarkLessonCompleted(id, currentLesson.lessonId);
      toast.info('Lesson Unmarked', currentLesson.lessonTitle);
    } else {
      markLessonCompleted(id, currentLesson.lessonId);
      toast.success('Lesson Completed!', `Progress updated to ${Math.min(100, Math.round(((completedCount + 1) / totalLessons) * 100))}%`);

      // Trigger confetti if completed entire course
      if (completedCount + 1 >= totalLessons) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        toast.success('Course Completed!', 'You are now eligible to claim your verified Certificate & take the placement test!');
      }

      // Auto advance to next lesson if available
      if (currentLessonIndex < allLessons.length - 1) {
        setCurrentLessonIndex((prev) => prev + 1);
      }
    }
  };

  const handleNotesChange = (text: string) => {
    setStudentNotes(text);
    if (course) {
      localStorage.setItem(`eduvia_notes_${course.id}`, text);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header bar with Breadcrumbs & Certificate Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link to="/app/student/courses" className="hover:text-indigo-600">
              My Courses
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-none">
              {course.title}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {currentLesson.lessonTitle}
          </h2>
        </div>

        {/* Course Progress & Certificate Access */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              {completedCount} / {totalLessons} Lessons Done
            </p>
            <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
              {progressPercent}% Completed
            </p>
          </div>

          {progressPercent >= 100 && (
            <Link to={`/app/student/certificates?courseId=${course.id}`}>
              <Button
                variant="success"
                size="small"
                leftIcon={<Award className="w-4 h-4 text-amber-300" />}
              >
                Claim Certificate
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Main Classroom Layout (Video + Curriculum Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Video Player & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* HD Video Player Simulation */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between group">
            {/* Top Overlay Badge */}
            <div className="p-4 flex items-center justify-between text-xs text-white/80 z-10 bg-gradient-to-b from-black/80 to-transparent">
              <span className="font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                HD 1080p • {currentLesson.moduleTitle}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-mono">
                {currentLesson.duration}
              </span>
            </div>

            {/* Center Playback Canvas */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={course.thumbnail}
                alt={currentLesson.lessonTitle}
                className="w-full h-full object-cover opacity-30"
              />
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-indigo-500 transition-all z-10"
                aria-label={isPlaying ? 'Pause lesson' : 'Play lesson'}
              >
                {isPlaying ? <RotateCcw className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white space-y-3 z-10">
              {/* Progress Scrub Bar */}
              <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden cursor-pointer">
                <div className="bg-indigo-500 h-full rounded-full w-2/5" />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="font-bold hover:text-indigo-400 focus:outline-none"
                  >
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <span className="text-white/60 font-mono text-[11px]">04:20 / {currentLesson.duration}</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Speed selector */}
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                    className="bg-black/50 border border-white/20 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none"
                  >
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1.0x Normal</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2.0x</option>
                  </select>

                  <Volume2 className="w-4 h-4 cursor-pointer hover:text-indigo-400" />
                  <Maximize className="w-4 h-4 cursor-pointer hover:text-indigo-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Player Navigation & Mark Completed CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
            <Button
              variant="secondary"
              size="small"
              disabled={currentLessonIndex === 0}
              onClick={() => setCurrentLessonIndex((prev) => Math.max(0, prev - 1))}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous Lesson
            </Button>

            <Button
              variant={isCurrentCompleted ? 'secondary' : 'primary'}
              size="small"
              onClick={handleToggleComplete}
              leftIcon={
                isCurrentCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )
              }
            >
              {isCurrentCompleted ? 'Completed ✓ (Click to undo)' : 'Mark Lesson as Completed'}
            </Button>

            <Button
              variant="secondary"
              size="small"
              disabled={currentLessonIndex === allLessons.length - 1}
              onClick={() => setCurrentLessonIndex((prev) => Math.min(allLessons.length - 1, prev + 1))}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Next Lesson
            </Button>
          </div>

          {/* Lesson Content & Study Tabs */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5">
            {/* Tabs Header */}
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Lesson Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'notes'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                My Study Scratchpad
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'resources'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Download Materials & Code
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  About this Lesson: {currentLesson.lessonTitle}
                </h4>
                <p>
                  In this session of <strong>{currentLesson.moduleTitle}</strong>, you will master the architectural patterns, internal memory allocations, and algorithmic runtime complexities relevant to industry software design.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                  <p className="font-bold text-slate-900 dark:text-white">Key Takeaways:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Deep-dive into underlying syntax, idioms, and data structures.</li>
                    <li>Handling edge cases and writing clean, maintainable, production-ready code.</li>
                    <li>Frequently tested technical interview questions on this topic.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Scratchpad */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Personal Course Scratchpad (Auto-saved to Browser)
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-bold">Auto-synced</span>
                </div>
                <textarea
                  rows={8}
                  value={studentNotes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder="Type your notes, code snippets, memory hints, and revision points here..."
                  className="w-full p-4 text-xs font-mono rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* Tab 3: Resources */}
            {activeTab === 'resources' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Handouts, Source Code & Cheatsheets
                </h4>
                <div className="space-y-2">
                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          Lecture_{currentLessonIndex + 1}_Slides_Notes.pdf
                        </p>
                        <p className="text-[10px] text-slate-400">3.4 MB • Verified Study Material</p>
                      </div>
                    </div>
                    <Button size="small" variant="outline" leftIcon={<Download className="w-3.5 h-3.5" />}>
                      Download
                    </Button>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          Source_Code_Repository.zip
                        </p>
                        <p className="text-[10px] text-slate-400">12.1 MB • Full Executable Project</p>
                      </div>
                    </div>
                    <Button size="small" variant="outline" leftIcon={<Download className="w-3.5 h-3.5" />}>
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Course Syllabus Tree & Assessment Link */}
        <div className="space-y-6">
          {/* Progress Overview Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Course Curriculum</h3>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                {progressPercent}%
              </span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Direct Action Links: Quiz & Assignments */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <Link to={`/app/student/quizzes?courseId=${course.id}`}>
                <Button variant="secondary" size="small" fullWidth leftIcon={<HelpCircle className="w-3.5 h-3.5 text-purple-500" />}>
                  Take Quiz
                </Button>
              </Link>
              <Link to="/app/student/assignments">
                <Button variant="secondary" size="small" fullWidth leftIcon={<FileText className="w-3.5 h-3.5 text-blue-500" />}>
                  Assignments
                </Button>
              </Link>
            </div>
          </div>

          {/* Lessons List Tree */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                All Lessons ({allLessons.length})
              </p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-[550px] overflow-y-auto">
              {allLessons.map((item, idx) => {
                const isSelected = idx === currentLessonIndex;
                const isDone = !!enrollment?.completedLessons.includes(item.lessonId);

                return (
                  <button
                    key={item.lessonId}
                    type="button"
                    onClick={() => setCurrentLessonIndex(idx)}
                    className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${
                      isSelected
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-l-4 border-indigo-600'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Play className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-semibold leading-snug line-clamp-2 ${
                          isSelected
                            ? 'text-indigo-900 dark:text-indigo-200 font-bold'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {idx + 1}. {item.lessonTitle}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                        <span className="truncate max-w-[130px]">{item.moduleTitle}</span>
                        <span>•</span>
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
