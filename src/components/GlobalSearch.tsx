import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  BookOpen,
  Briefcase,
  Brain,
  Code2,
  FileText,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  Building2,
  MapPin,
  X,
  Layers,
  GraduationCap,
  History,
  CheckCircle2,
  TrendingUp,
  SlidersHorizontal,
} from 'lucide-react';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'course' | 'job' | 'prep' | 'tool';
  categoryLabel: string;
  link: string;
  badge?: string;
  badgeColor?: string;
  meta?: string;
  tags?: string[];
  icon: React.ReactNode;
}

const PLACEMENT_MATERIALS = [
  {
    id: 'prep-coding-1',
    title: 'Two Sum (Target Array Indices)',
    subtitle: 'DSA Problem • Arrays & Hashing • Tested at Amazon, TCS Digital, Infosys',
    category: 'prep' as const,
    categoryLabel: 'Placement Prep',
    link: '/prep?tab=coding&id=p1',
    badge: 'Easy',
    badgeColor: 'emerald',
    meta: 'Amazon, TCS, Infosys',
    tags: ['dsa', 'arrays', 'hashing', 'coding', 'two sum', 'placement', 'interview'],
  },
  {
    id: 'prep-coding-2',
    title: 'Longest Substring Without Repeating Characters',
    subtitle: 'DSA Problem • Sliding Window • Tested at Microsoft, Wipro, Google',
    category: 'prep' as const,
    categoryLabel: 'Placement Prep',
    link: '/prep?tab=coding&id=p2',
    badge: 'Medium',
    badgeColor: 'amber',
    meta: 'Microsoft, Google, Wipro',
    tags: ['dsa', 'sliding window', 'strings', 'coding', 'placement', 'interview'],
  },
  {
    id: 'prep-coding-3',
    title: 'LRU Cache Design & Implementation',
    subtitle: 'DSA Problem • Linked List & Hash Map • Tested at Goldman Sachs, Amazon',
    category: 'prep' as const,
    categoryLabel: 'Placement Prep',
    link: '/prep?tab=coding&id=p3',
    badge: 'Hard',
    badgeColor: 'rose',
    meta: 'Goldman Sachs, Oracle',
    tags: ['dsa', 'lru cache', 'design', 'linked list', 'hash map', 'placement'],
  },
  {
    id: 'prep-coding-4',
    title: 'Valid Parentheses & Bracket Matching',
    subtitle: 'DSA Problem • Stack Data Structure • Tested at Accenture, Cognizant',
    category: 'prep' as const,
    categoryLabel: 'Placement Prep',
    link: '/prep?tab=coding&id=p4',
    badge: 'Easy',
    badgeColor: 'emerald',
    meta: 'Accenture, Cognizant, Capgemini',
    tags: ['dsa', 'stack', 'parentheses', 'brackets', 'coding', 'placement'],
  },
  {
    id: 'prep-aptitude-1',
    title: 'Quantitative Aptitude: Time & Work Formulas',
    subtitle: 'Shortcut tricks, combined efficiency calculations, and mock problems',
    category: 'prep' as const,
    categoryLabel: 'Placement Prep',
    link: '/prep?tab=aptitude',
    badge: 'Aptitude',
    badgeColor: 'indigo',
    meta: 'Campus Aptitude Round',
    tags: ['aptitude', 'time and work', 'math', 'reasoning', 'placement', 'tcs nqt'],
  },
  {
    id: 'prep-aptitude-2',
    title: 'Reasoning: Permutations, Combinations & Probability',
    subtitle: 'Formulas, step-by-step solutions for arrangement and selection puzzles',
    category: 'prep' as const,
    categoryLabel: 'Placement Prep',
    link: '/prep?tab=aptitude',
    badge: 'Aptitude',
    badgeColor: 'indigo',
    meta: 'Campus Aptitude Round',
    tags: ['aptitude', 'permutations', 'combinations', 'probability', 'reasoning'],
  },
  {
    id: 'prep-cs-os',
    title: 'Core CS: Operating Systems Quick Revision',
    subtitle: 'Processes vs Threads, Deadlock conditions, Banker\'s Algorithm, Virtual Memory',
    category: 'prep' as const,
    categoryLabel: 'Placement Prep',
    link: '/prep?tab=cs_core',
    badge: 'Core CS',
    badgeColor: 'blue',
    meta: 'Technical Interview',
    tags: ['operating systems', 'os', 'threads', 'deadlock', 'paging', 'virtual memory', 'core cs'],
  },
  {
    id: 'prep-cs-dbms',
    title: 'Core CS: DBMS, ACID & Normalization',
    subtitle: 'ACID properties, Normal Forms (1NF-BCNF), SQL Joins, B-Tree Indexing',
    category: 'prep' as const,
    categoryLabel: 'Placement Prep',
    link: '/prep?tab=cs_core',
    badge: 'Core CS',
    badgeColor: 'blue',
    meta: 'Technical Interview',
    tags: ['dbms', 'database', 'sql', 'acid', 'normalization', 'indexing', 'core cs'],
  },
  {
    id: 'prep-cs-cn',
    title: 'Core CS: Computer Networks & Protocols',
    subtitle: 'OSI 7-Layer Model, TCP 3-Way Handshake vs UDP, HTTP/1.1 to HTTP/3',
    category: 'prep' as const,
    categoryLabel: 'Placement Prep',
    link: '/prep?tab=cs_core',
    badge: 'Core CS',
    badgeColor: 'blue',
    meta: 'Technical Interview',
    tags: ['computer networks', 'cn', 'tcp', 'udp', 'osi model', 'http', 'core cs'],
  },
  {
    id: 'prep-hr-star',
    title: 'HR Interview: STAR Method Framework',
    subtitle: 'Behavioral answers for "Tell me about yourself", leadership, and conflict resolution',
    category: 'prep' as const,
    categoryLabel: 'Placement Prep',
    link: '/prep?tab=hr',
    badge: 'HR Round',
    badgeColor: 'purple',
    meta: 'HR & Behavioral',
    tags: ['hr', 'behavioral', 'star method', 'interview', 'tell me about yourself'],
  },
];

const QUICK_TOOLS = [
  {
    id: 'tool-resume',
    title: 'ATS Resume Builder',
    subtitle: 'Generate ATS-friendly resume for campus placements and export to PDF',
    category: 'tool' as const,
    categoryLabel: 'Tools',
    link: '/app/student/resume',
    badge: 'Free Tool',
    badgeColor: 'emerald',
    tags: ['resume', 'cv', 'builder', 'ats', 'placement', 'pdf'],
  },
  {
    id: 'tool-prep',
    title: 'Placement Preparation Hub',
    subtitle: 'Practice DSA problems, aptitude quizzes, and core CS fundamentals',
    category: 'tool' as const,
    categoryLabel: 'Tools',
    link: '/prep',
    badge: 'Prep Hub',
    badgeColor: 'indigo',
    tags: ['prep', 'placement', 'coding', 'practice', 'aptitude', 'dsa'],
  },
  {
    id: 'tool-certificates',
    title: 'Verified Certificates',
    subtitle: 'View and download course completion badges and tamper-proof certificates',
    category: 'tool' as const,
    categoryLabel: 'Tools',
    link: '/app/student/certificates',
    badge: 'Credentials',
    badgeColor: 'amber',
    tags: ['certificates', 'credentials', 'badge', 'verify', 'diploma'],
  },
  {
    id: 'tool-applications',
    title: 'Job & Drive Application Tracker',
    subtitle: 'Check status of your campus hiring rounds and scheduled interviews',
    category: 'tool' as const,
    categoryLabel: 'Tools',
    link: '/app/student/applications',
    badge: 'Tracking',
    badgeColor: 'blue',
    tags: ['applications', 'status', 'interviews', 'jobs', 'tracking'],
  },
  {
    id: 'tool-quizzes',
    title: 'Interactive Assessments & Quizzes',
    subtitle: 'Test your technical knowledge and earn XP badges',
    category: 'tool' as const,
    categoryLabel: 'Tools',
    link: '/app/student/quizzes',
    badge: 'Quizzes',
    badgeColor: 'purple',
    tags: ['quiz', 'test', 'assessment', 'xp', 'mcq'],
  },
];

const POPULAR_SEARCHES = [
  'Python Programming',
  'Full Stack Development',
  'TCS Digital',
  'Data Science',
  'Two Sum',
  'Operating Systems',
  'Resume Builder',
  'Infosys Drive',
];

interface GlobalSearchProps {
  variant?: 'navbar' | 'dashboard' | 'compact';
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ variant = 'navbar' }) => {
  const { courses, jobs } = useData();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'course' | 'job' | 'prep' | 'tool'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('eduvia_recent_searches');
      return saved ? JSON.parse(saved) : ['Full Stack', 'TCS', 'Operating Systems'];
    } catch {
      return ['Full Stack', 'TCS', 'Operating Systems'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Global shortcut (Cmd+K / Ctrl+K or '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in another input/textarea
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === '/' && !isInput && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Transform all searchable data items
  const allItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Courses
    courses.forEach((course) => {
      const instructorName = typeof course.instructor === 'string' ? course.instructor : course.instructor?.name || 'Faculty';
      items.push({
        id: `course-${course.id}`,
        title: course.title,
        subtitle: `${course.category} • By ${instructorName} • ${course.duration}`,
        category: 'course',
        categoryLabel: 'Courses',
        link: `/courses/${course.id}`,
        badge: course.level || course.difficulty || 'All Levels',
        badgeColor: 'blue',
        meta: `★ ${course.rating} (${course.studentsCount.toLocaleString()} learners)`,
        tags: [
          course.category.toLowerCase(),
          instructorName.toLowerCase(),
          ...(course.tags || []).map((t) => t.toLowerCase()),
          'course',
          'learning',
          'tutorial',
        ],
        icon: <BookOpen className="w-4 h-4 text-indigo-500" />,
      });
    });

    // 2. Jobs
    jobs.forEach((job) => {
      items.push({
        id: `job-${job.id}`,
        title: `${job.title} — ${job.company}`,
        subtitle: `${job.location} (${job.workplaceType}) • ${job.jobType} • ${job.salary}`,
        category: 'job',
        categoryLabel: 'Jobs & Drives',
        link: `/jobs/${job.id}`,
        badge: job.workplaceType,
        badgeColor: 'emerald',
        meta: `Apply by: ${job.deadline}`,
        tags: [
          job.company.toLowerCase(),
          job.location.toLowerCase(),
          job.jobType.toLowerCase(),
          ...job.skills.map((s) => s.toLowerCase()),
          'job',
          'placement',
          'campus drive',
          'hiring',
          'career',
        ],
        icon: <Briefcase className="w-4 h-4 text-emerald-500" />,
      });
    });

    // 3. Placement Materials
    PLACEMENT_MATERIALS.forEach((item) => {
      items.push({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        category: item.category,
        categoryLabel: item.categoryLabel,
        link: item.link,
        badge: item.badge,
        badgeColor: item.badgeColor,
        meta: item.meta,
        tags: item.tags,
        icon: <Brain className="w-4 h-4 text-purple-500" />,
      });
    });

    // 4. Tools
    QUICK_TOOLS.forEach((item) => {
      let resolvedLink = item.link;
      if (!isAuthenticated && item.link.startsWith('/app/student')) {
        resolvedLink = '/login';
      }
      items.push({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        category: item.category,
        categoryLabel: item.categoryLabel,
        link: resolvedLink,
        badge: item.badge,
        badgeColor: item.badgeColor,
        tags: item.tags,
        icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      });
    });

    return items;
  }, [courses, jobs, isAuthenticated]);

  // Filtered results
  const filteredResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    let list = allItems;

    if (activeCategory !== 'all') {
      list = list.filter((item) => item.category === activeCategory);
    }

    if (!cleanQuery) {
      return list.slice(0, 8);
    }

    // Match algorithm: title (highest), tags, subtitle, meta
    return list
      .filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(cleanQuery);
        const subtitleMatch = item.subtitle.toLowerCase().includes(cleanQuery);
        const metaMatch = item.meta ? item.meta.toLowerCase().includes(cleanQuery) : false;
        const tagMatch = item.tags ? item.tags.some((t) => t.includes(cleanQuery)) : false;
        return titleMatch || subtitleMatch || metaMatch || tagMatch;
      })
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(cleanQuery);
        const bTitle = b.title.toLowerCase().includes(cleanQuery);
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;
        return 0;
      })
      .slice(0, 16);
  }, [allItems, query, activeCategory]);

  const counts = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    const source = cleanQuery
      ? allItems.filter((item) => {
          const titleMatch = item.title.toLowerCase().includes(cleanQuery);
          const subtitleMatch = item.subtitle.toLowerCase().includes(cleanQuery);
          const metaMatch = item.meta ? item.meta.toLowerCase().includes(cleanQuery) : false;
          const tagMatch = item.tags ? item.tags.some((t) => t.includes(cleanQuery)) : false;
          return titleMatch || subtitleMatch || metaMatch || tagMatch;
        })
      : allItems;

    return {
      all: source.length,
      course: source.filter((i) => i.category === 'course').length,
      job: source.filter((i) => i.category === 'job').length,
      prep: source.filter((i) => i.category === 'prep').length,
      tool: source.filter((i) => i.category === 'tool').length,
    };
  }, [allItems, query]);

  const saveRecentSearch = (text: string) => {
    if (!text.trim()) return;
    const updated = [text.trim(), ...recentSearches.filter((s) => s.toLowerCase() !== text.trim().toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem('eduvia_recent_searches', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSelectItem = (item: SearchResultItem) => {
    saveRecentSearch(query || item.title);
    setIsOpen(false);
    navigate(item.link);
  };

  const handleSearchSuggestion = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('eduvia_recent_searches');
    } catch {
      // ignore
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelectItem(filteredResults[selectedIndex]);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Search Bar / Trigger Button */}
      {variant === 'dashboard' ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-between w-full max-w-md px-3.5 py-2 text-xs bg-slate-100 dark:bg-slate-900 hover:bg-slate-200/70 dark:hover:bg-slate-800/80 border border-transparent dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 group"
          aria-label="Search courses, jobs, and materials"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            <span className="truncate">Search courses, jobs, placement prep...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 shadow-2xs">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      ) : variant === 'compact' ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
          aria-label="Open global search"
          title="Search courses, jobs, and placement prep (⌘K)"
        >
          <Search className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-between gap-3 px-3 py-1.5 sm:py-2 text-xs rounded-xl bg-slate-100/90 dark:bg-slate-900/90 hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 group min-w-[150px] lg:min-w-[240px]"
          aria-label="Global Search"
          title="Quick search across all portal resources (Press ⌘K or /)"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
            <span className="truncate text-slate-500 dark:text-slate-400">Search EduPath...</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 shrink-0">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </button>
      )}

      {/* Global Search Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20 overflow-y-auto animate-in fade-in duration-150">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Search Dialog Window */}
          <div
            className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
            onKeyDown={handleKeyDown}
          >
            {/* Top Search Input Box */}
            <div className="relative flex items-center px-4 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search courses, campus jobs, DSA problems, CS core, tools..."
                className="w-full text-sm sm:text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-medium"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold px-2.5"
              >
                ESC
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto text-xs no-scrollbar">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All ({counts.all})</span>
              </button>

              <button
                onClick={() => {
                  setActiveCategory('course');
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeCategory === 'course'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Courses ({counts.course})</span>
              </button>

              <button
                onClick={() => {
                  setActiveCategory('job');
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeCategory === 'job'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>Jobs & Drives ({counts.job})</span>
              </button>

              <button
                onClick={() => {
                  setActiveCategory('prep');
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeCategory === 'prep'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                <span>Placement Prep ({counts.prep})</span>
              </button>

              <button
                onClick={() => {
                  setActiveCategory('tool');
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeCategory === 'tool'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Tools ({counts.tool})</span>
              </button>
            </div>

            {/* Results Container */}
            <div
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5 divide-y divide-slate-100 dark:divide-slate-800/60"
            >
              {/* Empty state & Trending suggestions when query is empty */}
              {!query && (
                <div className="pb-3 space-y-4">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between px-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <History className="w-3.5 h-3.5" /> Recent Searches
                        </span>
                        <button
                          onClick={handleClearRecent}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 capitalize font-medium"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-2">
                        {recentSearches.map((term, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSearchSuggestion(term)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 text-slate-700 dark:text-slate-300 transition-colors"
                          >
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{term}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Topics */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="px-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-500" /> Popular on EduPath
                    </div>
                    <div className="flex flex-wrap gap-1.5 px-2">
                      {POPULAR_SEARCHES.map((term, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSearchSuggestion(term)}
                          className="px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Result List Items */}
              {filteredResults.length > 0 ? (
                <div className="space-y-1 pt-1">
                  {filteredResults.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        data-index={index}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`group p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 shadow-xs'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          {/* Item Icon */}
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                              item.category === 'course'
                                ? 'bg-indigo-100/70 dark:bg-indigo-950 text-indigo-600'
                                : item.category === 'job'
                                ? 'bg-emerald-100/70 dark:bg-emerald-950 text-emerald-600'
                                : item.category === 'prep'
                                ? 'bg-purple-100/70 dark:bg-purple-950 text-purple-600'
                                : 'bg-amber-100/70 dark:bg-amber-950 text-amber-600'
                            } ${isSelected ? 'scale-105' : ''}`}
                          >
                            {item.icon}
                          </div>

                          {/* Content text */}
                          <div className="min-w-0 space-y-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4
                                className={`text-xs sm:text-sm font-bold truncate ${
                                  isSelected
                                    ? 'text-indigo-900 dark:text-indigo-200'
                                    : 'text-slate-900 dark:text-white'
                                }`}
                              >
                                {item.title}
                              </h4>
                              {item.badge && (
                                <span
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                    item.badgeColor === 'emerald'
                                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                                      : item.badgeColor === 'amber'
                                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300'
                                      : item.badgeColor === 'rose'
                                      ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300'
                                      : item.badgeColor === 'purple'
                                      ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300'
                                      : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                {item.categoryLabel}
                              </span>
                            </div>

                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xl">
                              {item.subtitle}
                            </p>

                            {item.meta && (
                              <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                                {item.meta}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Arrow indicator on active selection */}
                        <div className="shrink-0 flex items-center text-indigo-600 dark:text-indigo-400">
                          <ArrowRight
                            className={`w-4 h-4 transition-transform ${
                              isSelected ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0 group-hover:opacity-100'
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    No results found for "{query}"
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Try searching for different keywords such as <span className="font-semibold text-indigo-600">Python</span>, <span className="font-semibold text-indigo-600">DSA</span>, <span className="font-semibold text-indigo-600">TCS</span>, or <span className="font-semibold text-indigo-600">Resume</span>.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Keyboard Nav Hint Bar */}
            <div className="px-4 sm:px-6 py-2.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
                    ↓
                  </kbd>{' '}
                  to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
                    ↵
                  </kbd>{' '}
                  to select
                </span>
              </div>
              <span className="hidden sm:inline font-medium text-slate-400">
                Direct search across courses, campus drives & prep
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
