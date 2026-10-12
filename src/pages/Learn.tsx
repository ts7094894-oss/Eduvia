import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button';
import { VideoPlayer } from '../components/video/VideoPlayer';
import { VideoTranscript } from '../components/video/VideoTranscript';
import { VideoChaptersList } from '../components/video/VideoChaptersList';
import { AILessonScriptView } from '../components/video/AILessonScriptView';
import { AILearningAssistant } from '../components/video/AILearningAssistant';
import { AIVideoGeneratorModal } from '../components/video/AIVideoGeneratorModal';
import { getEnrichedLessonMeta } from '../data/lessonDetails';
import {
  getVideoProgress,
  saveVideoProgress,
  getCourseVideoProgressMap,
  formatTimeSeconds,
} from '../../src/services/videoService';
import {
  Play,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  HelpCircle,
  Award,
  BookOpen,
  Sparkles,
  Layers,
  Search,
  Clock,
  Code2,
  Check,
  Copy,
  Lightbulb,
  Video,
  ListFilter,
  CheckSquare,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson } from '../types';

export const Learn: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, enrolledCourses, markLessonCompleted, unmarkLessonCompleted, addNewCourse } = useData();
  const { user } = useAuth();
  const toast = useToast();

  const currentUserId = user?.id || 'demo_student';
  const course = courses.find((c) => c.id === id);
  const enrollment = id ? enrolledCourses[id] : null;

  // Flatten all lessons with their module context
  const allLessons = useMemo(() => {
    if (!course) return [];
    const list: Array<{
      moduleId: string;
      moduleTitle: string;
      lessonId: string;
      lessonTitle: string;
      duration: string;
      videoUrl: string;
      notes?: string;
      rawLesson: Lesson;
    }> = [];

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
          rawLesson: l,
        });
      });
    });
    return list;
  }, [course]);

  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'chapters' | 'script' | 'code' | 'quiz' | 'resources'>('overview');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [lessonSearchQuery, setLessonSearchQuery] = useState<string>('');
  const [studentNotes, setStudentNotes] = useState<string>('');
  const [currentPlaybackSeconds, setCurrentPlaybackSeconds] = useState<number>(0);
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [copyCodeSuccess, setCopyCodeSuccess] = useState<boolean>(false);

  // Initialize expanded modules
  useEffect(() => {
    if (course) {
      const initialMap: Record<string, boolean> = {};
      course.modules.forEach((m) => {
        initialMap[m.id] = true;
      });
      setExpandedModules(initialMap);
    }
  }, [course]);

  // Load saved scratchpad notes
  useEffect(() => {
    if (course) {
      const savedNotes = localStorage.getItem(`eduvia_notes_${course.id}`);
      if (savedNotes) setStudentNotes(savedNotes);
    }
  }, [course]);

  const currentLessonItem = allLessons[currentLessonIndex] || allLessons[0];

  // Retrieve enriched lesson metadata (chapters, transcript, 7-part AI script, code demo, quiz, etc.)
  const enrichedMeta = useMemo(() => {
    if (!course || !currentLessonItem) return null;
    return getEnrichedLessonMeta(
      course.title,
      currentLessonItem.moduleTitle,
      currentLessonItem.lessonId,
      currentLessonItem.lessonTitle,
      currentLessonItem.duration,
      currentLessonItem.rawLesson.description
    );
  }, [course, currentLessonItem]);

  // Merged lesson object
  const activeLesson: Lesson = useMemo(() => {
    if (!currentLessonItem || !enrichedMeta) {
      return {
        id: currentLessonItem?.lessonId || 'les-default',
        title: currentLessonItem?.lessonTitle || 'Lesson',
        duration: currentLessonItem?.duration || '15:00',
        videoUrl: currentLessonItem?.videoUrl || '',
      };
    }

    return {
      ...currentLessonItem.rawLesson,
      id: currentLessonItem.lessonId,
      title: currentLessonItem.lessonTitle,
      videoTitle: currentLessonItem.rawLesson.videoTitle || enrichedMeta.videoTitle,
      duration: currentLessonItem.duration,
      durationSeconds: enrichedMeta.durationSeconds,
      videoUrl: currentLessonItem.rawLesson.youtubeUrl || currentLessonItem.videoUrl || '',
      backupVideoUrl: enrichedMeta.backupVideoUrl,
      youtubeVideoId: currentLessonItem.rawLesson.youtubeVideoId,
      youtubeUrl: currentLessonItem.rawLesson.youtubeUrl,
      isVerifiedVideo: currentLessonItem.rawLesson.isVerifiedVideo,
      channelTitle: currentLessonItem.rawLesson.channelTitle,
      videoTopic: currentLessonItem.rawLesson.videoTopic,
      videoThumbnail: currentLessonItem.rawLesson.videoThumbnail,
      youtubeSearchQuery: currentLessonItem.rawLesson.youtubeSearchQuery,
      description: currentLessonItem.rawLesson.description || enrichedMeta.script.conceptExplanation,
      learningObjectives: enrichedMeta.learningObjectives,
      chapters: enrichedMeta.chapters,
      transcript: enrichedMeta.transcript,
      script: enrichedMeta.script,
      codeDemo: enrichedMeta.codeDemo,
      miniQuiz: enrichedMeta.miniQuiz,
      resources: enrichedMeta.resources,
    };
  }, [currentLessonItem, enrichedMeta]);

  // Read video watch progress from local storage
  const videoProgressRecord = useMemo(() => {
    if (!course || !activeLesson) return null;
    return getVideoProgress(currentUserId, course.id, activeLesson.id);
  }, [currentUserId, course, activeLesson]);

  // Course progress map
  const courseProgressMap = useMemo(() => {
    if (!course) return {};
    return getCourseVideoProgressMap(currentUserId, course.id);
  }, [currentUserId, course, currentPlaybackSeconds]);

  const isCurrentCompleted = activeLesson
    ? !!enrollment?.completedLessons.includes(activeLesson.id)
    : false;

  const totalLessons = allLessons.length;
  const completedCount = enrollment?.completedLessons.length || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Handle time update from video player
  const handleTimeUpdate = useCallback(
    (currentTime: number, duration: number) => {
      setCurrentPlaybackSeconds(currentTime);
      if (course && activeLesson && currentTime > 2) {
        saveVideoProgress(
          currentUserId,
          course.id,
          activeLesson.id,
          currentTime,
          duration,
          isCurrentCompleted
        );
      }
    },
    [course, activeLesson, currentUserId, isCurrentCompleted]
  );

  // Handle completion from video player
  const handleLessonAutoCompleted = useCallback(() => {
    if (!id || !activeLesson || isCurrentCompleted) return;
    markLessonCompleted(id, activeLesson.id);
    saveVideoProgress(
      currentUserId,
      id,
      activeLesson.id,
      activeLesson.durationSeconds || 600,
      activeLesson.durationSeconds || 600,
      true
    );
    toast.success('Lesson Completed!', `"${activeLesson.title}" marked as completed.`);

    if (completedCount + 1 >= totalLessons) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      toast.success(
        'Congratulations! Course Completed!',
        'You have mastered this course and are eligible to claim your verified certificate.'
      );
    }
  }, [id, activeLesson, isCurrentCompleted, markLessonCompleted, currentUserId, completedCount, totalLessons, toast]);

  if (!course || !currentLessonItem || !activeLesson) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Course Not Found</h2>
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
      unmarkLessonCompleted(id, activeLesson.id);
      toast.info('Lesson Unmarked', activeLesson.title);
    } else {
      markLessonCompleted(id, activeLesson.id);
      saveVideoProgress(
        currentUserId,
        id,
        activeLesson.id,
        activeLesson.durationSeconds || 600,
        activeLesson.durationSeconds || 600,
        true
      );
      toast.success(
        'Lesson Completed!',
        `Progress updated to ${Math.min(100, Math.round(((completedCount + 1) / totalLessons) * 100))}%`
      );

      if (completedCount + 1 >= totalLessons) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        toast.success(
          'Course Completed!',
          'You are now eligible to claim your verified Certificate & take the placement test!'
        );
      }

      if (currentLessonIndex < allLessons.length - 1) {
        setCurrentLessonIndex((prev) => prev + 1);
        setQuizSubmitted(false);
        setQuizAnswers({});
      }
    }
  };

  const handleNotesChange = (text: string) => {
    setStudentNotes(text);
    if (course) {
      localStorage.setItem(`eduvia_notes_${course.id}`, text);
    }
  };

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const handleSeekFromChild = (seconds: number) => {
    // We can dispatch or seek the video by scrolling to top
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleCopyCodeSnippet = () => {
    if (!activeLesson.codeDemo?.code) return;
    navigator.clipboard.writeText(activeLesson.codeDemo.code);
    setCopyCodeSuccess(true);
    setTimeout(() => setCopyCodeSuccess(false), 2000);
  };

  const handleQuizOptionSelect = (qIdx: number, optIdx: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  const nextLessonItem = allLessons[currentLessonIndex + 1];

  return (
    <div className="space-y-6 pb-24 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link to="/app/student/courses" className="hover:text-indigo-600">
              My Courses
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-none">
              {course.title}
            </span>
            <span>/</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium truncate">
              {currentLessonItem.moduleTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {activeLesson.title}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold border border-indigo-200 dark:border-indigo-800">
              Lesson {currentLessonIndex + 1} of {totalLessons}
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          {/* AI Video Generator Studio Demo Button */}
          <button
            type="button"
            onClick={() => setIsGeneratorModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 transition-all flex items-center gap-1.5 shadow-xs"
            title="Open AI Video Generation Architecture Studio"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Video Studio</span>
          </button>

          {/* Progress Indicator */}
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

      {/* Main 3-Column Learning Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Course Modules and Lessons (3 cols on desktop) */}
        <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Course Modules
                </h3>
                <p className="text-[11px] text-slate-400">
                  {course.modules.length} modules • {totalLessons} video lessons
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {progressPercent}%
              </span>
            </div>

            {/* Quick search inside course */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={lessonSearchQuery}
                onChange={(e) => setLessonSearchQuery(e.target.value)}
                placeholder="Search lessons..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Modules Accordion List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 divide-y divide-slate-100/80 dark:divide-slate-800/60">
              {course.modules.map((module, mIdx) => {
                const isExpanded = !!expandedModules[module.id];
                const matchingLessons = module.lessons.filter(
                  (l) =>
                    !lessonSearchQuery.trim() ||
                    l.title.toLowerCase().includes(lessonSearchQuery.toLowerCase())
                );

                if (matchingLessons.length === 0 && lessonSearchQuery.trim()) {
                  return null;
                }

                return (
                  <div key={module.id} className="pt-2 first:pt-0 space-y-1.5">
                    {/* Module Header Button */}
                    <button
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      className="w-full py-2 px-2.5 rounded-xl flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {module.title}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {module.lessons.length} lessons {module.duration && `• ${module.duration}`}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {/* Lessons in this module */}
                    {isExpanded && (
                      <div className="space-y-1 pl-1">
                        {matchingLessons.map((lesson) => {
                          const flatIndex = allLessons.findIndex(
                            (item) => item.lessonId === lesson.id
                          );
                          const isSelected = flatIndex === currentLessonIndex;
                          const isDone = !!enrollment?.completedLessons.includes(lesson.id);
                          const progressData = courseProgressMap[lesson.id];
                          const watchedPct = progressData?.percentage || (isDone ? 100 : 0);

                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              onClick={() => {
                                if (flatIndex !== -1) {
                                  setCurrentLessonIndex(flatIndex);
                                  setQuizSubmitted(false);
                                  setQuizAnswers({});
                                }
                              }}
                              className={`w-full p-2.5 rounded-2xl flex items-start gap-2.5 text-left transition-all ${
                                isSelected
                                  ? 'bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 shadow-xs'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent'
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <div
                                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                      isSelected
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                                    }`}
                                  >
                                    <Play className="w-2 h-2 fill-current ml-0.2" />
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <p
                                  className={`text-xs leading-snug line-clamp-2 ${
                                    isSelected
                                      ? 'font-bold text-indigo-900 dark:text-indigo-200'
                                      : 'font-medium text-slate-800 dark:text-slate-200'
                                  }`}
                                >
                                  {lesson.title}
                                </p>

                                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                                  <span>{lesson.duration}</span>
                                  {watchedPct > 0 && watchedPct < 95 && (
                                    <>
                                      <span>•</span>
                                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                                        {watchedPct}% watched
                                      </span>
                                    </>
                                  )}
                                  {isDone && (
                                    <>
                                      <span>•</span>
                                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                        Completed
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Real Video Player & Learning Tabs & AI Assistant (6 cols on desktop) */}
        <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
          {/* 1. Real Video Player */}
          <div className="relative">
            <VideoPlayer
              key={activeLesson.id}
              lessonId={activeLesson.id}
              courseTitle={course?.title || 'Course'}
              videoUrl={activeLesson.videoUrl}
              backupVideoUrl={activeLesson.backupVideoUrl}
              title={`${activeLesson.videoTitle || activeLesson.title}`}
              durationString={activeLesson.duration}
              chapters={activeLesson.chapters}
              initialSeekSeconds={videoProgressRecord?.watchedSeconds || 0}
              onTimeUpdate={handleTimeUpdate}
              onLessonCompleted={handleLessonAutoCompleted}
              onNextLesson={() => {
                if (currentLessonIndex < allLessons.length - 1) {
                  setCurrentLessonIndex((prev) => prev + 1);
                }
              }}
              hasNextLesson={currentLessonIndex < allLessons.length - 1}
              youtubeVideoId={activeLesson.youtubeVideoId}
              youtubeUrl={activeLesson.youtubeUrl}
              isVerifiedVideo={activeLesson.isVerifiedVideo}
              channelTitle={activeLesson.channelTitle}
              topic={activeLesson.videoTopic || activeLesson.title}
              thumbnailUrl={activeLesson.videoThumbnail}
              searchQuery={activeLesson.youtubeSearchQuery}
              isCompleted={isCurrentCompleted}
              onToggleComplete={handleToggleComplete}
            />
          </div>

          {/* 2. Navigation CTA Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xs">
            <Button
              variant="secondary"
              size="small"
              disabled={currentLessonIndex === 0}
              onClick={() => {
                setCurrentLessonIndex((prev) => Math.max(0, prev - 1));
                setQuizSubmitted(false);
                setQuizAnswers({});
              }}
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
              {isCurrentCompleted ? 'Completed ✓ (Undo)' : 'Mark Lesson as Completed'}
            </Button>

            <Button
              variant="secondary"
              size="small"
              disabled={currentLessonIndex === allLessons.length - 1}
              onClick={() => {
                setCurrentLessonIndex((prev) => Math.min(allLessons.length - 1, prev + 1));
                setQuizSubmitted(false);
                setQuizAnswers({});
              }}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Next Lesson
            </Button>
          </div>

          {/* 3. Comprehensive Learning Tabs */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
            {/* Tabs Header */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Overview & Objectives
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('transcript')}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'transcript'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Transcript ({activeLesson.transcript?.length || 0})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('chapters')}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'chapters'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Chapters ({activeLesson.chapters?.length || 0})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('script')}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'script'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Lesson Script</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('code')}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'code'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Code Demo
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('quiz')}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'quiz'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Knowledge Check
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('resources')}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'resources'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Study Materials
              </button>
            </div>

            {/* TAB 1: Overview & Learning Objectives */}
            {activeTab === 'overview' && (
              <div className="space-y-5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    About this Lesson: {activeLesson.title}
                  </h4>
                  <p className="text-xs leading-relaxed">
                    {activeLesson.description ||
                      `In this session of ${currentLessonItem.moduleTitle}, you will master the core idioms, runtime complexities, and patterns expected in industry software development.`}
                  </p>
                </div>

                {/* Learning Objectives Checklist */}
                {activeLesson.learningObjectives && activeLesson.learningObjectives.length > 0 && (
                  <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2.5">
                    <p className="font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                      <CheckSquare className="w-4 h-4 text-indigo-600" />
                      Learning Objectives for this Lesson:
                    </p>
                    <ul className="space-y-1.5 pl-1">
                      {activeLesson.learningObjectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Concepts Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white text-[11px] uppercase tracking-wider">
                      Module Track
                    </p>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {currentLessonItem.moduleTitle}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white text-[11px] uppercase tracking-wider">
                      Lesson Duration
                    </p>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">
                      {activeLesson.duration} (HD Educational Stream)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Transcript */}
            {activeTab === 'transcript' && (
              <VideoTranscript
                transcript={activeLesson.transcript || []}
                currentTimeSeconds={currentPlaybackSeconds}
                onSeekToTimestamp={handleSeekFromChild}
              />
            )}

            {/* TAB 3: Chapters */}
            {activeTab === 'chapters' && (
              <VideoChaptersList
                chapters={activeLesson.chapters || []}
                currentTimeSeconds={currentPlaybackSeconds}
                onSeekToChapter={handleSeekFromChild}
              />
            )}

            {/* TAB 4: AI Lesson Script */}
            {activeTab === 'script' && activeLesson.script && (
              <AILessonScriptView script={activeLesson.script} />
            )}

            {/* TAB 5: Code Demo & Sandbox */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Code Demonstration & Syntax Explorer
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Executable implementation of {activeLesson.title}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCodeSnippet}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
                  >
                    {copyCodeSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 p-4 font-mono text-xs leading-relaxed">
                  <pre className="overflow-x-auto">
                    <code>{activeLesson.codeDemo?.code || activeLesson.script?.codeDemonstration?.code}</code>
                  </pre>
                </div>

                {activeLesson.codeDemo?.output && (
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      Console Output:
                    </p>
                    <pre className="whitespace-pre-wrap">{activeLesson.codeDemo.output}</pre>
                  </div>
                )}

                {activeLesson.codeDemo?.explanation && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                    💡 {activeLesson.codeDemo.explanation}
                  </p>
                )}
              </div>
            )}

            {/* TAB 6: Check Your Understanding Mini Quiz */}
            {activeTab === 'quiz' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Lesson Comprehension Check
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {activeLesson.miniQuiz?.length || 0} Questions
                  </span>
                </div>

                <div className="space-y-4">
                  {activeLesson.miniQuiz?.map((q, qIdx) => {
                    const selectedOpt = quizAnswers[qIdx];
                    const isCorrect = selectedOpt === q.correctIndex;

                    return (
                      <div
                        key={qIdx}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3"
                      >
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          {qIdx + 1}. {q.question}
                        </p>

                        <div className="space-y-1.5">
                          {q.options.map((opt, optIdx) => {
                            const isChosen = selectedOpt === optIdx;
                            let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';

                            if (quizSubmitted) {
                              if (optIdx === q.correctIndex) {
                                btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-200 font-bold';
                              } else if (isChosen && !isCorrect) {
                                btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-800 dark:text-rose-200';
                              }
                            } else if (isChosen) {
                              btnStyle = 'bg-indigo-50 dark:bg-indigo-950 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold';
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => handleQuizOptionSelect(qIdx, optIdx)}
                                className={`w-full p-2.5 rounded-xl text-xs text-left border transition-all flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {quizSubmitted && optIdx === q.correctIndex && (
                                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="pt-2 text-[11px] text-slate-600 dark:text-slate-400 italic border-t border-slate-200/60 dark:border-slate-700/60">
                            <strong>Explanation:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => setQuizSubmitted(true)}
                    disabled={Object.keys(quizAnswers).length === 0}
                  >
                    Submit Answers
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                    }}
                  >
                    Reset Quiz
                  </Button>
                )}
              </div>
            )}

            {/* TAB 7: Resources & Downloads */}
            {activeTab === 'resources' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Handouts, Source Code & Cheatsheets
                </h4>
                <div className="space-y-2">
                  {activeLesson.resources?.map((res) => (
                    <div
                      key={res.id}
                      className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {res.type === 'pdf' ? (
                          <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
                        ) : (
                          <Code2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {res.title}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {res.size} • Verified Study Material
                          </p>
                        </div>
                      </div>
                      <Button
                        size="small"
                        variant="outline"
                        leftIcon={<Download className="w-3.5 h-3.5" />}
                        onClick={() => toast.success('Download Initiated', res.title)}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. AI Learning Assistant Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs">
            <AILearningAssistant lesson={activeLesson} courseTitle={course.title} />
          </div>
        </div>

        {/* RIGHT COLUMN: Course Progress, Next Up, Scratchpad (3 cols on desktop) */}
        <div className="lg:col-span-3 space-y-6 order-3">
          {/* Progress Overview Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Course Progress</h3>
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

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>{completedCount} of {totalLessons} done</span>
              <span>{totalLessons - completedCount} remaining</span>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <Link to={`/app/student/quizzes?courseId=${course.id}`}>
                <Button
                  variant="secondary"
                  size="small"
                  fullWidth
                  leftIcon={<HelpCircle className="w-3.5 h-3.5 text-purple-500" />}
                >
                  Course Quiz
                </Button>
              </Link>
              <Link to="/app/student/assignments">
                <Button
                  variant="secondary"
                  size="small"
                  fullWidth
                  leftIcon={<FileText className="w-3.5 h-3.5 text-blue-500" />}
                >
                  Assignments
                </Button>
              </Link>
            </div>
          </div>

          {/* Next Lesson Recommendation Card */}
          {nextLessonItem && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Next in Queue
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {nextLessonItem.duration}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                  {nextLessonItem.lessonTitle}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {nextLessonItem.moduleTitle}
                </p>
              </div>

              <Button
                variant="primary"
                size="small"
                fullWidth
                onClick={() => {
                  setCurrentLessonIndex(currentLessonIndex + 1);
                  setQuizSubmitted(false);
                  setQuizAnswers({});
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
              >
                Up Next: Start Lesson
              </Button>
            </div>
          )}

          {/* Personal Course Scratchpad with Auto-sync */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Study Scratchpad
              </h4>
              <span className="text-[10px] text-emerald-600 font-bold">Auto-synced</span>
            </div>
            <textarea
              rows={7}
              value={studentNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Type your notes, code snippets, memory hints, and revision points here..."
              className="w-full p-3 text-xs font-mono rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* AI Video Generator Modal */}
      <AIVideoGeneratorModal
        isOpen={isGeneratorModalOpen}
        onClose={() => setIsGeneratorModalOpen(false)}
        defaultTopic="Recursion and Memory Stack Trees in Python"
        defaultCourseTitle={course.title}
        onLessonCreated={(newLesson) => {
          toast.success(
            'New AI Video Lesson Attached!',
            `"${newLesson.title}" has been appended to ${course.title}.`
          );
        }}
      />
    </div>
  );
};
