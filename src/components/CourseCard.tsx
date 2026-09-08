import React from 'react';
import { Course } from '../types';
import { Star, Clock, Users, Bookmark, Play, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from './Button';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  showEnrollButton?: boolean;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  showProgress = false,
  showEnrollButton = true,
  className = '',
}) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { enrolledCourses, bookmarkedCourses, toggleBookmarkCourse, enrollCourse } = useData();
  const toast = useToast();

  const isEnrolled = !!enrolledCourses[course.id];
  const progress = enrolledCourses[course.id]?.progress || 0;
  const isBookmarked = bookmarkedCourses.includes(course.id);

  const handleEnroll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.info('Please Sign In', 'Log in to enroll in courses and track your progress.');
      navigate('/login');
      return;
    }
    enrollCourse(course.id);
    toast.success('Enrolled Successfully!', `You are now enrolled in ${course.title}.`);
    navigate(`/app/student/learn/${course.id}`);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmarkCourse(course.id);
    toast.info(isBookmarked ? 'Removed from Bookmarks' : 'Course Bookmarked', course.title);
  };

  const difficultyColors = {
    Beginner: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    Intermediate: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    Advanced: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  };

  return (
    <div className={`group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1 ${className}`}>
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70" />

        {/* Category & Difficulty Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-600/90 backdrop-blur-md text-white shadow-sm">
            {course.category}
          </span>
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border backdrop-blur-md ${difficultyColors[course.difficulty]}`}>
            {course.difficulty}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={handleBookmark}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
            isBookmarked
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-black/40 text-white hover:bg-black/60'
          }`}
          aria-label="Bookmark course"
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{course.duration}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Rating and Students */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1 font-semibold text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({course.reviews?.length || 120})</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Users className="w-3.5 h-3.5" />
              <span>{course.studentsCount.toLocaleString()} students</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/courses/${course.id}`}>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
              {course.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Progress Bar (if enrolled and requested) */}
        {(showProgress || isEnrolled) && (
          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
                {progress === 100 ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-indigo-500" />
                )}
                {progress === 100 ? 'Completed' : 'Course Progress'}
              </span>
              <span className={progress === 100 ? 'text-emerald-600 font-bold' : 'text-indigo-600 font-bold'}>
                {progress}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer info & action */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          {/* Instructor */}
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
              {course.instructor.name}
            </span>
          </div>

          {/* Action Button */}
          {showEnrollButton && (
            <div>
              {isEnrolled ? (
                <Link to={`/app/student/learn/${course.id}`}>
                  <Button size="small" variant="primary" leftIcon={<Play className="w-3.5 h-3.5" />}>
                    {progress === 100 ? 'Review' : 'Continue'}
                  </Button>
                </Link>
              ) : (
                <Button size="small" variant="outline" onClick={handleEnroll}>
                  Enroll Now
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
