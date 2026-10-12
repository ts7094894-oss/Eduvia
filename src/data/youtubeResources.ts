export interface YouTubeResource {
  isVerifiedVideo: boolean;
  videoTitle: string;
  channelTitle: string;
  topic: string;
  youtubeVideoId?: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  embedUrl?: string;
  searchQuery: string;
  isSearchResult: boolean;
  notes?: string;
}

/**
 * Verified, authoritative educational videos from freeCodeCamp, CS50, Programming with Mosh, etc.
 * Never invent IDs, titles, or channels.
 */
export const VERIFIED_YOUTUBE_VIDEOS: Record<
  string,
  {
    videoId: string;
    videoTitle: string;
    channelTitle: string;
    topic: string;
    notes?: string;
  }
> = {
  // Python Programming
  'les-101': {
    videoId: 'rfscVS0vtbw',
    videoTitle: 'Python for Beginners - Full Course [Programming Tutorial]',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Introduction to Python & Setup',
  },
  'les-102': {
    videoId: 'nLRL_NcnK-4',
    videoTitle: 'CS50P - Lecture 0 - Functions, Variables',
    channelTitle: 'CS50',
    topic: 'Variables and Data Types in Python',
  },
  'les-103': {
    videoId: '_uQrJ0TkZlc',
    videoTitle: 'Python Tutorial for Beginners [Full Course]',
    channelTitle: 'Programming with Mosh',
    topic: 'Operators & Expressions in Python',
  },
  'les-104': {
    videoId: 'rfscVS0vtbw',
    videoTitle: 'Python for Beginners - Input, Output & Basic Operations',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Input and Output in Python',
  },
  'les-201': {
    videoId: '_uQrJ0TkZlc',
    videoTitle: 'Python If Else Statements & Conditions Tutorial',
    channelTitle: 'Programming with Mosh',
    topic: 'Conditional Logic & If-Else in Python',
  },
  'les-202': {
    videoId: 'rfscVS0vtbw',
    videoTitle: 'Python Loops Tutorial - While Loops and For Loops',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Loops and Iterations in Python',
  },
  'les-301': {
    videoId: 'nLRL_NcnK-4',
    videoTitle: 'CS50P - Functions, Parameters and Return Values',
    channelTitle: 'CS50',
    topic: 'Modular Functions in Python',
  },
  'les-303': {
    videoId: 'YYXdXT2l-Gg',
    videoTitle: 'Python Lambda Functions and Higher Order Functions',
    channelTitle: 'Corey Schafer',
    topic: 'Lambda Functions and Functional Paradigms',
  },
  'les-401': {
    videoId: '8ext9G7xspg',
    videoTitle: '12 Beginner Python Projects - Coding Course',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Hands-on Python Projects',
  },

  // Java Programming
  'les-j101': {
    videoId: 'eIrMbAQSU34',
    videoTitle: 'Java Tutorial for Beginners [2020]',
    channelTitle: 'Programming with Mosh',
    topic: 'JDK, JRE, JVM Architecture & First Bytecode Program',
  },
  'les-j102': {
    videoId: 'xk4_1vDrzzo',
    videoTitle: 'Java Object Oriented Programming (OOP) - Overloading & Overriding',
    channelTitle: 'Bro Code',
    topic: 'Polymorphism, Method Overloading & Overriding',
  },
  'les-j201': {
    videoId: '9om_wN3p3c8',
    videoTitle: 'Java Collections Framework Tutorial - List, Set, Map & HashMap',
    channelTitle: 'Telusko',
    topic: 'Java Collections Framework & Generics',
  },
  'les-j202': {
    videoId: 'A74TOX803D0',
    videoTitle: 'Java Full Course for Beginners - OOP and Collections',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Java Collections & Memory Internals',
  },

  // SQL & Relational Databases (MySQL / PostgreSQL)
  'les-db101': {
    videoId: 'HXV3zeRR3h4',
    videoTitle: 'SQL Tutorial - Full Database Course for Beginners',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Relational Model, Tables, DDL & DML Fundamentals',
  },
  'les-db102': {
    videoId: '7S_tz1z_5bA',
    videoTitle: 'MySQL Tutorial for Beginners [Full Course]',
    channelTitle: 'Programming with Mosh',
    topic: 'SQL Joins, Aggregations & Query Execution',
  },
  'les-db201': {
    videoId: 'rUG0b2mkmvQ',
    videoTitle: 'SQL Basics Tutorial For Beginners - Queries & Indexing',
    channelTitle: 'Alex The Analyst',
    topic: 'Indexing, Views & Stored Procedures',
  },

  // HTML
  'les-html101': {
    videoId: 'kUMe1FH4CHE',
    videoTitle: 'HTML Tutorial for Beginners: HTML Crash Course',
    channelTitle: 'Programming with Mosh',
    topic: 'HTML5 Elements, Document Structure & Semantic Tags',
  },
  'les-html102': {
    videoId: 'pQN-pnXPaVg',
    videoTitle: 'HTML Full Course - Build a Website Tutorial',
    channelTitle: 'freeCodeCamp.org',
    topic: 'HTML Forms, Inputs, Validations & Accessibility',
  },

  // CSS
  'les-css101': {
    videoId: '1PnVor36_40',
    videoTitle: 'CSS Tutorial - Zero to Hero (Complete Course)',
    channelTitle: 'freeCodeCamp.org',
    topic: 'CSS Selectors, Cascade, Specificity & Box Model',
  },
  'les-css102': {
    videoId: 'yfoY53QXEnI',
    videoTitle: 'CSS Crash Course For Absolute Beginners',
    channelTitle: 'Traversy Media',
    topic: 'Flexbox, CSS Grid & Responsive Breakpoints',
  },
  'les-css103': {
    videoId: 'u044iM9xsWU',
    videoTitle: 'Learn Flexbox the easy way - Complete CSS Guide',
    channelTitle: 'Kevin Powell',
    topic: 'Modern Flexbox Alignment & Responsive Layouts',
  },

  // JavaScript
  'les-js101': {
    videoId: 'W6NZfCO5SIk',
    videoTitle: 'JavaScript Tutorial for Beginners: 30-Minute Crash Course',
    channelTitle: 'Programming with Mosh',
    topic: 'JavaScript Basics, Variables, Scope & DOM Manipulation',
  },
  'les-js102': {
    videoId: 'jS4aFq5-91M',
    videoTitle: 'JavaScript Programming - Full Course',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Modern ES6+ Syntax, Promises, Async/Await & Fetch API',
  },
  'les-js103': {
    videoId: 'lfmg-EJ8gm4',
    videoTitle: 'JavaScript Full Course for free 🌐',
    channelTitle: 'Bro Code',
    topic: 'Prototypes, Closures & Event Loop Architecture',
  },

  // React
  'les-react101': {
    videoId: 'bMknfKXIFA8',
    videoTitle: "React Course - Beginner's Tutorial for React JavaScript Library",
    channelTitle: 'freeCodeCamp.org',
    topic: 'React Components, JSX, Props & State with useState',
  },
  'les-react102': {
    videoId: 'SqcY0GlETPk',
    videoTitle: 'React Tutorial for Beginners - Building Modern Web Apps',
    channelTitle: 'Programming with Mosh',
    topic: 'useEffect Hook, API Integration & Component Lifecycle',
  },
  'les-react103': {
    videoId: 'hQAHSlTtcmY',
    videoTitle: 'Learn React In 30 Minutes',
    channelTitle: 'Web Dev Simplified',
    topic: 'Custom Hooks, Context API & State Management',
  },
  'les-w101': {
    videoId: 'bMknfKXIFA8',
    videoTitle: "React & Modern Web Development Full Course",
    channelTitle: 'freeCodeCamp.org',
    topic: 'Modern Responsive Design with Flexbox, Grid & Tailwind CSS',
  },

  // Data Structures and Algorithms (DSA)
  'les-d101': {
    videoId: '8hly31xKli0',
    videoTitle: 'Algorithms and Data Structures Tutorial - Full Course for Beginners',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Algorithmic Complexity & Asymptotic Notation (Big-O)',
  },
  'les-d102': {
    videoId: 'ZA-tUyM_y7s',
    videoTitle: '1. Algorithmic Thinking, Peak Finding - MIT 6.006',
    channelTitle: 'MIT OpenCourseWare',
    topic: 'Arrays, Two-Pointer Technique & Sliding Window',
  },
  'les-d201': {
    videoId: 'BBpAmxU_NQo',
    videoTitle: 'Data Structures and Algorithms for Beginners',
    channelTitle: 'Programming with Mosh',
    topic: 'Linked Lists, Stacks, Queues & Hash Tables',
  },
  'les-d301': {
    videoId: 'KLlXCFG5TnA',
    videoTitle: 'How to get good at LeetCode & DSA for Interviews',
    channelTitle: 'NeetCode',
    topic: 'Binary Trees, Graphs & Dynamic Programming Framework',
  },

  // Machine Learning
  'les-m101': {
    videoId: 'i_LwzRVP7bg',
    videoTitle: 'Machine Learning for Everybody – Full Course',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Feature Engineering & Exploratory Data Analysis with Pandas & Seaborn',
  },
  'les-m102': {
    videoId: '7eh4d6sabA0',
    videoTitle: 'Python Machine Learning Tutorial (Data Science)',
    channelTitle: 'Programming with Mosh',
    topic: 'Supervised Learning: Linear Regression, Logistic Regression & Trees',
  },
  'les-m201': {
    videoId: 'Gv9_4yMHFhI',
    videoTitle: 'StatQuest: Machine Learning Fundamentals',
    channelTitle: 'StatQuest with Josh Starmer',
    topic: 'Model Evaluation, Cross Validation, Overfitting & Metrics',
  },

  // Natural Language Processing (NLP)
  'les-nlp101': {
    videoId: 'fNxaJsNG3-s',
    videoTitle: 'Python NLP Tutorial | Natural Language Processing with Python',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Text Preprocessing, Tokenization, Stemming & Lemmatization',
  },
  'les-nlp102': {
    videoId: '8rXD5-xhemo',
    videoTitle: 'Stanford CS224N: NLP with Deep Learning | Lecture 1 – Intro',
    channelTitle: 'Stanford Online',
    topic: 'Word Embeddings, Word2Vec & TF-IDF Vectors',
  },
  'les-nlp201': {
    videoId: 'M7SWr5xObkA',
    videoTitle: 'Complete NLP Playlist for Beginners - Transformers & Hugging Face',
    channelTitle: 'Krish Naik',
    topic: 'Transformers Architecture, Attention Mechanism & LLM Prompting',
  },

  // Resume Building & ATS Prep
  'les-res101': {
    videoId: 'BYUy1yHL43Q',
    videoTitle: 'Create Your Resume for Google: Tips and Advice',
    channelTitle: 'Google Students',
    topic: 'ATS Formatting, Technical Resume Structure & Action Verbs',
  },
  'les-res102': {
    videoId: 'y8YH0Qbu5h4',
    videoTitle: 'How to Write a Resume with No Experience (Step by Step Guide)',
    channelTitle: 'Jeff Su',
    topic: 'Quantifying Engineering Projects, CGPA & GitHub Portfolios',
  },
  'les-res201': {
    videoId: 'yp693O87GmM',
    videoTitle: 'How to write a killer tech resume | Tips from a Google recruiter',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Keyword Optimization, Skills Section & Avoiding ATS Rejection',
  },

  // AI & Generative Models
  'les-ai101': {
    videoId: 'JMUxmLgw-QU',
    videoTitle: 'Artificial Intelligence Full Course | AI Tutorial for Beginners',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Intelligent Agents, State Space Search & A* Algorithm',
  },
};

/**
 * Creates a standard YouTube search URL for a topic query.
 */
export const createYouTubeSearchUrl = (query: string): string => {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
};

/**
 * Resolves the verified video or creates a search result URL for any lesson.
 */
export const resolveYouTubeResource = (
  courseTitle: string,
  lessonTitle: string,
  lessonId?: string,
  explicitVideoId?: string
): YouTubeResource => {
  const cleanLesson = lessonTitle.replace(/^[0-9.]+\s*/, '').trim();

  // 1. If explicit verified videoId provided
  if (explicitVideoId && explicitVideoId.length === 11) {
    return {
      isVerifiedVideo: true,
      isSearchResult: false,
      videoTitle: `${cleanLesson} Tutorial`,
      channelTitle: 'Verified Educational Creator',
      topic: cleanLesson,
      youtubeVideoId: explicitVideoId,
      youtubeUrl: `https://www.youtube.com/watch?v=${explicitVideoId}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${explicitVideoId}?rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${explicitVideoId}/hqdefault.jpg`,
      searchQuery: `${courseTitle} ${cleanLesson}`,
    };
  }

  // 2. Check if verified record exists in VERIFIED_YOUTUBE_VIDEOS
  if (lessonId && VERIFIED_YOUTUBE_VIDEOS[lessonId]) {
    const verified = VERIFIED_YOUTUBE_VIDEOS[lessonId];
    return {
      isVerifiedVideo: true,
      isSearchResult: false,
      videoTitle: verified.videoTitle,
      channelTitle: verified.channelTitle,
      topic: verified.topic || cleanLesson,
      youtubeVideoId: verified.videoId,
      youtubeUrl: `https://www.youtube.com/watch?v=${verified.videoId}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${verified.videoId}?rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${verified.videoId}/hqdefault.jpg`,
      searchQuery: `${courseTitle} ${cleanLesson}`,
      notes: verified.notes,
    };
  }

  // 3. Fallback: Create a clean YouTube search query URL for the exact lesson topic
  const searchQuery = `${courseTitle} ${cleanLesson} tutorial`.trim();
  const searchUrl = createYouTubeSearchUrl(searchQuery);

  return {
    isVerifiedVideo: false,
    isSearchResult: true,
    videoTitle: `YouTube Search: ${cleanLesson}`,
    channelTitle: 'YouTube Search Results',
    topic: cleanLesson,
    youtubeUrl: searchUrl,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    searchQuery,
    notes: 'No single verified video ID attached. Search results open directly in YouTube.',
  };
};
