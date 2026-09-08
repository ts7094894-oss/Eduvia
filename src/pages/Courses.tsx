import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { CourseCard } from '../components/CourseCard';
import { Button } from '../components/Button';
import {
  Search,
  SlidersHorizontal,
  GraduationCap,
  BookOpen,
  Sparkles,
  Bookmark,
  X,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export const Courses: React.FC = () => {
  const { courses, bookmarkedCourses } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);

  const categories = [
    'All',
    'Programming',
    'Web Development',
    'Data Science',
    'AI & ML',
    'Algorithms',
    'Networking',
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        const matchesCategory =
          selectedCategory === 'All' || course.category === selectedCategory;
        const matchesDifficulty =
          selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
        const instructorName =
          typeof course.instructor === 'object'
            ? course.instructor.name
            : course.instructor || '';
        const matchesSearch =
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesBookmark = onlyBookmarked
          ? bookmarkedCourses.includes(course.id)
          : true;

        return matchesCategory && matchesDifficulty && matchesSearch && matchesBookmark;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return b.id.localeCompare(a.id);
        return b.studentsCount - a.studentsCount; // default popular
      });
  }, [
    courses,
    selectedCategory,
    selectedDifficulty,
    searchQuery,
    sortBy,
    onlyBookmarked,
    bookmarkedCourses,
  ]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSearchQuery('');
    setOnlyBookmarked(false);
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-xs font-bold text-indigo-700 dark:text-indigo-300">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Curated CSE Course Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Online Courses
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Learn cutting-edge engineering disciplines, complete comprehensive video lessons, take assessments, and earn certificates.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 rounded-3xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Field */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, instructor, keywords (e.g. Python, React, DSA)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Difficulties</option>
              {difficulties.filter((d) => d !== 'All').map((d) => (
                <option key={d} value={d}>
                  {d} Level
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Recently Added</option>
            </select>

            {/* Bookmarks Toggle */}
            <button
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                onlyBookmarked
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
              }`}
              title="Filter Bookmarked Courses"
            >
              <Bookmark className={`w-4 h-4 ${onlyBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">Saved</span>
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <p>
          Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredCourses.length}</strong> available courses
        </p>
        {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchQuery || onlyBookmarked) && (
          <button
            onClick={clearFilters}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Clear active filters
          </button>
        )}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No matching courses found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms, changing category filters, or resetting the difficulty selector.
          </p>
          <Button variant="secondary" size="small" onClick={clearFilters}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};
