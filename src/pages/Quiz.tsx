import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button';
import {
  Clock,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Quiz: React.FC = () => {
  const [searchParams] = useSearchParams();
  const courseIdParam = searchParams.get('courseId');
  const navigate = useNavigate();
  const { quizzes, courses, quizResults, submitQuizResult } = useData();
  const toast = useToast();

  const activeQuiz = courseIdParam
    ? quizzes.find((q) => q.courseId === courseIdParam) || quizzes[0]
    : quizzes[0];

  const matchedCourse = courses.find((c) => c.id === activeQuiz?.courseId);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(activeQuiz ? activeQuiz.timeLimitMinutes * 60 : 900);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  if (!activeQuiz) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-bold">No Quizzes Available</h3>
      </div>
    );
  }

  const currentQ = activeQuiz.questions[currentQuestionIndex];
  const totalQuestions = activeQuiz.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    const percent = Math.round((score / totalQuestions) * 100);
    const passed = percent >= activeQuiz.passingScorePercent;

    submitQuizResult({
      quizId: activeQuiz.id,
      score,
      totalQuestions,
      percentage: percent,
      passed,
    });

    setIsSubmitted(true);

    if (passed) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      toast.success('Congratulations! Quiz Passed', `You scored ${percent}% (Passing: ${activeQuiz.passingScorePercent}%)`);
    } else {
      toast.error('Quiz Assessment Finished', `Score: ${percent}%. You need ${activeQuiz.passingScorePercent}% to pass.`);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(activeQuiz.timeLimitMinutes * 60);
    setIsSubmitted(false);
    setShowReview(false);
  };

  // Calculate score for display
  const finalScore = activeQuiz.questions.filter(
    (q) => selectedAnswers[q.id] === q.correctAnswer
  ).length;
  const finalPercentage = Math.round((finalScore / totalQuestions) * 100);
  const isPassed = finalPercentage >= activeQuiz.passingScorePercent;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {matchedCourse?.title || 'Academic Assessment'}
            </span>
            <span>•</span>
            <span>Assessment Module</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {activeQuiz.title}
          </h1>
        </div>

        {/* Timer Bar */}
        {!isSubmitted && (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-mono font-bold text-sm ${
              timeLeft < 120
                ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse dark:bg-rose-950/60 dark:border-rose-800'
                : 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/60 dark:border-indigo-800 dark:text-indigo-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* Result Card if Submitted */}
      {isSubmitted && !showReview && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center space-y-6 animate-in zoom-in-95">
          <div
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${
              isPassed
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                : 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
            }`}
          >
            {isPassed ? <Award className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              {isPassed ? 'Assessment Passed with Distinction!' : 'Assessment Not Cleared'}
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {isPassed
                ? `You have demonstrated mastery in ${matchedCourse?.title}. Your score has been verified and registered on your student profile.`
                : `You scored below the passing threshold of ${activeQuiz.passingScorePercent}%. Review your incorrect answers and retake to earn your verified badge.`}
            </p>
          </div>

          {/* Stats Breakdown */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
              <p className="text-[10px] uppercase font-bold text-slate-400">Score</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {finalScore}/{totalQuestions}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
              <p className="text-[10px] uppercase font-bold text-slate-400">Percentage</p>
              <p className={`text-2xl font-black mt-1 ${isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                {finalPercentage}%
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
              <p className="text-[10px] uppercase font-bold text-slate-400">Status</p>
              <p className={`text-sm font-black mt-2 uppercase ${isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                {isPassed ? 'PASSED' : 'FAILED'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button
              variant="outline"
              size="medium"
              onClick={() => setShowReview(true)}
              leftIcon={<HelpCircle className="w-4 h-4" />}
            >
              Review All Answers
            </Button>
            <Button
              variant="secondary"
              size="medium"
              onClick={handleRetake}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Retake Quiz
            </Button>
            {isPassed && (
              <Link to="/app/student/certificates">
                <Button variant="primary" size="medium" leftIcon={<Sparkles className="w-4 h-4" />}>
                  View Certificate
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Review Mode showing all questions */}
      {showReview && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Quiz Solution & Explanations Review
            </h3>
            <Button variant="outline" size="small" onClick={() => setShowReview(false)}>
              Back to Score Summary
            </Button>
          </div>

          <div className="space-y-4">
            {activeQuiz.questions.map((q, qIndex) => {
              const studentAnswer = selectedAnswers[q.id];
              const isCorrect = studentAnswer === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-3xl border ${
                    isCorrect
                      ? 'bg-emerald-50/40 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/60'
                      : 'bg-rose-50/40 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/60'
                  } space-y-4`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Q{qIndex + 1}. {q.question}
                    </h4>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Correct (+1)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-600 shrink-0">
                        <XCircle className="w-4 h-4" /> Incorrect (0)
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, oIndex) => {
                      const isOptionCorrect = oIndex === q.correctAnswer;
                      const isOptionSelected = oIndex === studentAnswer;

                      return (
                        <div
                          key={oIndex}
                          className={`p-3 rounded-xl text-xs flex items-center justify-between ${
                            isOptionCorrect
                              ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/80 dark:text-emerald-100 font-bold'
                              : isOptionSelected
                              ? 'bg-rose-100 text-rose-900 dark:bg-rose-900/80 dark:text-rose-100 font-medium'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>{opt}</span>
                          {isOptionCorrect && <span>✓ Correct Answer</span>}
                          {isOptionSelected && !isOptionCorrect && <span>✗ Your Answer</span>}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      <strong className="text-slate-900 dark:text-white">Explanation: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Question Matrix & Form (When taking test) */}
      {!isSubmitted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Question Display Card */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-xs text-slate-400">
                {answeredCount} of {totalQuestions} answered
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/90 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-100 ring-2 ring-indigo-500/20 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span>{option}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Button
                variant="secondary"
                size="small"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Previous
              </Button>

              {currentQuestionIndex < totalQuestions - 1 ? (
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Next Question
                </Button>
              ) : (
                <Button
                  variant="success"
                  size="small"
                  onClick={handleSubmitQuiz}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Submit & Finish Assessment
                </Button>
              )}
            </div>
          </div>

          {/* Question Grid Navigator Sidebar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Question Navigator</h4>

            {/* Matrix of Question numbers */}
            <div className="grid grid-cols-5 gap-2">
              {activeQuiz.questions.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = idx === currentQuestionIndex;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                      isCurrent
                        ? 'ring-2 ring-indigo-600 bg-indigo-600 text-white'
                        : isAnswered
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-indigo-600" />
                <span>Current Question</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-slate-100 dark:bg-slate-800" />
                <span>Unanswered ({totalQuestions - answeredCount})</span>
              </div>
            </div>

            <Button
              variant="success"
              size="medium"
              fullWidth
              onClick={handleSubmitQuiz}
            >
              Submit Quiz ({answeredCount}/{totalQuestions})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
