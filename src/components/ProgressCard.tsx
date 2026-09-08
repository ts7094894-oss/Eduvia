import React from 'react';
import { Course } from '../types';
import { Play, CheckCircle2, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

interface ProgressCardProps {
  course: Course;
  progress: number;
  completedLessonsCount: number;
  totalLessons: number;
  lastAccessed?: string;
  className?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  course,
  progress,
  completedLessonsCount,
  totalLessons,
  lastAccessed = 'Recently',
  className = '',
}) => {
  const isCompleted = progress >= 100;

  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5 ${className}`}>
      {/* Course Thumbnail */}
      <div className="relative w-full sm:w-36 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {isCompleted && (
          <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-xs flex items-center justify-center text-emerald-300 font-bold text-xs gap-1">
            <Award className="w-4 h-4" />
            <span>Completed</span>
          </div>
        )}
      </div>

      {/* Progress Details */}
      <div className="flex-1 min-w-0 space-y-2 w-full">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {course.category}
          </span>
          <span className="text-xs text-slate-400">Accessed {lastAccessed}</span>
        </div>

        <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
          {course.title}
        </h4>

        {/* Progress Bar & Counter */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>
              {completedLessonsCount} of {totalLessons} lessons completed
            </span>
            <span className={isCompleted ? 'text-emerald-600 font-bold' : 'text-indigo-600 font-bold'}>
              {progress}%
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-blue-600'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="shrink-0 w-full sm:w-auto flex sm:flex-col items-center justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
        <Link to={`/app/student/learn/${course.id}`} className="w-full sm:w-auto">
          <Button
            size="small"
            variant={isCompleted ? 'secondary' : 'primary'}
            leftIcon={isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            fullWidth
          >
            {isCompleted ? 'Review Course' : 'Continue Learning'}
          </Button>
        </Link>
      </div>
    </div>
  );
};
