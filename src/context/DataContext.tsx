import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Course,
  Job,
  JobApplication,
  Interview,
  Quiz,
  QuizResult,
  Assignment,
  Certificate,
  ResumeData,
  ApplicationStatus,
  Badge,
  StudentReward,
} from '../types';
import { INITIAL_COURSES } from '../data/courses';
import { INITIAL_JOBS } from '../data/jobs';
import { INITIAL_QUIZZES } from '../data/quizzes';
import { INITIAL_ASSIGNMENTS } from '../data/assignments';
import { INITIAL_BADGES_CATALOG, INITIAL_STUDENT_REWARDS } from '../data/badges';

export interface EnrolledCourseData {
  courseId: string;
  enrolledAt: string;
  progress: number;
  completedLessons: string[];
  lastAccessed?: string;
}

export interface DataContextType {
  courses: Course[];
  jobs: Job[];
  quizzes: Quiz[];
  assignments: Assignment[];
  enrolledCourses: { [courseId: string]: EnrolledCourseData };
  savedJobs: string[];
  bookmarkedCourses: string[];
  applications: JobApplication[];
  interviews: Interview[];
  quizResults: QuizResult[];
  certificates: Certificate[];
  resumeData: ResumeData;
  badges: Badge[];
  rewards: StudentReward[];
  studentXp: number;
  studentLevel: {
    level: number;
    title: string;
    currentLevelXp: number;
    nextLevelXp: number;
    progressPercent: number;
  };
  unlockedBadgesCount: number;
  claimedRewardIds: string[];
  claimReward: (rewardId: string) => boolean;
  // Actions
  enrollCourse: (courseId: string) => void;
  markLessonCompleted: (courseId: string, lessonId: string) => void;
  unmarkLessonCompleted: (courseId: string, lessonId: string) => void;
  toggleBookmarkCourse: (courseId: string) => void;
  toggleSaveJob: (jobId: string) => void;
  submitApplication: (applicationData: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>) => string;
  updateApplicationStatus: (applicationId: string, newStatus: ApplicationStatus, notes?: string) => void;
  saveQuizResult: (result: Omit<QuizResult, 'id' | 'completedAt'>) => void;
  submitQuizResult: (result: any) => void;
  submitAssignment: (assignmentId: string, answerText: any, fileName?: string) => void;
  updateResumeData: (data: ResumeData) => void;
  addNewJob: (job: Omit<Job, 'id' | 'postedDate'>) => void;
  addJob: (job: any) => void;
  addNewCourse: (course: Omit<Course, 'id' | 'studentsCount' | 'rating' | 'reviews'>) => void;
  addCourse: (course: any) => void;
  scheduleInterview: (interview: Omit<Interview, 'id'>) => void;
  getCourseProgress: (courseId: string) => number;
  isCourseCompleted: (courseId: string) => boolean;
  generateCertificate: (courseId: string, studentName: string) => Certificate;
}

const DEFAULT_RESUME: ResumeData = {
  personalInfo: {
    fullName: 'Sai Krishna',
    email: 'student@edupath.com',
    phone: '+91 98765 43210',
    location: 'Hyderabad, Telangana, India',
    linkedin: 'https://linkedin.com/in/sai-krishna-edupath',
    github: 'https://github.com/edupath-tech',
    portfolio: 'https://saikrishna-portfolio.dev',
  },
  summary:
    'Detail-oriented final-year Computer Science Engineering student with strong problem-solving skills in Data Structures, Python, Java, and modern React full-stack development. Eager to engineer high-scale software solutions for progressive enterprise and tech organizations.',
  education: [
    {
      id: 'edu-1',
      institution: 'EduPath Institute of Technology & Science',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science and Engineering',
      startDate: '2022',
      endDate: '2026',
      cgpa: '8.85 / 10.0',
    },
    {
      id: 'edu-2',
      institution: 'Sri Chaitanya Junior College',
      degree: 'Higher Secondary (Class XII - MPC)',
      fieldOfStudy: 'Maths, Physics, Chemistry',
      startDate: '2020',
      endDate: '2022',
      cgpa: '96.4%',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Full Stack Web Developer Intern',
      company: 'TechVision Software Labs',
      location: 'Hyderabad (Remote)',
      startDate: 'May 2025',
      endDate: 'July 2025',
      current: false,
      description:
        'Built responsive client dashboards using React, Tailwind CSS, and RESTful Node.js backend endpoints. Reduced API response latency by 24% with optimized MongoDB queries.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'EduPath E-Learning & Placement Portal',
      technologies: 'React.js, Tailwind CSS, TypeScript, LocalStorage, Vite',
      link: 'https://github.com/edupath-tech/edupath-portal',
      description:
        'Engineered an end-to-end EdTech and Campus Placement portal with role-based routing, video classroom, interactive quiz engines, and in-platform job application pipelines.',
    },
    {
      id: 'proj-2',
      title: 'Real-time AI Sentiment Analyzer & Dashboard',
      technologies: 'Python, FastAPI, Scikit-Learn, React, Chart.js',
      link: 'https://github.com/edupath-tech/sentiment-ai',
      description:
        'Developed a NLP sentiment classification engine processing 10k+ customer feedback reviews with 91.4% accuracy.',
    },
  ],
  skills: [
    'Python',
    'Java',
    'Data Structures & Algorithms',
    'JavaScript / TypeScript',
    'React.js',
    'Tailwind CSS',
    'SQL & PostgreSQL',
    'Git & GitHub',
    'REST APIs',
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Python Programming Masterclass',
      issuer: 'EduPath Learning Platform',
      date: 'Aug 2026',
    },
    {
      id: 'cert-2',
      name: 'Full Stack Web Development',
      issuer: 'EduPath Learning Platform',
      date: 'Jul 2026',
    },
  ],
  achievements: [
    'Ranked in Top 2% in National Level Coding Hackathon (CodeFest 2025)',
    'Solved 350+ algorithmic problems across LeetCode & GeeksForGeeks',
    'College Academic Excellence Merit Award - CSE Department (2024 & 2025)',
  ],
  languages: ['English (Fluent)', 'Telugu (Native)', 'Hindi (Conversational)'],
};

const DEFAULT_APPLICATIONS: JobApplication[] = [
  {
    id: 'APP-2026-8819',
    jobId: 'job-1',
    jobTitle: 'Software Developer (Digital Drive)',
    company: 'Tata Consultancy Services (TCS)',
    companyLogo:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
    applicantId: 'usr-student-1',
    applicantName: 'Sai Krishna',
    studentName: 'Sai Krishna',
    applicantEmail: 'student@edupath.com',
    applicantPhone: '+91 98765 43210',
    college: 'EduPath Institute of Technology',
    degree: 'B.Tech - CSE',
    graduationYear: '2026',
    cgpa: '8.85',
    skills: ['Python', 'Java', 'Data Structures', 'SQL', 'React'],
    resumeName: 'Sai_Krishna_Resume.pdf',
    appliedDate: '2026-09-01',
    status: 'applied',
    notes: 'Application received and undergoing automated preliminary eligibility screening.',
  },
  {
    id: 'APP-2026-7241',
    jobId: 'job-2',
    jobTitle: 'Java Developer - Specialist Programmer',
    company: 'Infosys',
    companyLogo:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&auto=format&fit=crop&q=80',
    applicantId: 'usr-student-1',
    applicantName: 'Sai Krishna',
    studentName: 'Sai Krishna',
    applicantEmail: 'student@edupath.com',
    applicantPhone: '+91 98765 43210',
    college: 'EduPath Institute of Technology',
    degree: 'B.Tech - CSE',
    graduationYear: '2026',
    cgpa: '8.85',
    skills: ['Java', 'Spring Boot', 'SQL', 'Microservices'],
    resumeName: 'Sai_Krishna_Resume.pdf',
    appliedDate: '2026-08-30',
    status: 'shortlisted',
    notes: 'Shortlisted based on Java quiz score and 8.85 CGPA. Technical interview round being scheduled.',
  },
  {
    id: 'APP-2026-6102',
    jobId: 'job-3',
    jobTitle: 'Python Backend Engineer (Turbo Drive)',
    company: 'Wipro Technologies',
    companyLogo:
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=120&auto=format&fit=crop&q=80',
    applicantId: 'usr-student-1',
    applicantName: 'Sai Krishna',
    studentName: 'Sai Krishna',
    applicantEmail: 'student@edupath.com',
    applicantPhone: '+91 98765 43210',
    college: 'EduPath Institute of Technology',
    degree: 'B.Tech - CSE',
    graduationYear: '2026',
    cgpa: '8.85',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Git'],
    resumeName: 'Sai_Krishna_Resume.pdf',
    appliedDate: '2026-08-28',
    status: 'interview_scheduled',
    notes: 'Technical Interview Round 1 scheduled for Sep 5, 2026 at 11:00 AM IST.',
    interviewDate: '2026-09-05T11:00:00',
  },
];

const DEFAULT_INTERVIEWS: Interview[] = [
  {
    id: 'int-1',
    applicationId: 'APP-2026-6102',
    company: 'Wipro Technologies',
    companyLogo:
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=120&auto=format&fit=crop&q=80',
    position: 'Python Backend Engineer (Turbo Drive)',
    date: '2026-09-05',
    time: '11:00 AM - 12:00 PM',
    type: 'Technical',
    meetingLink: 'https://meet.google.com/edupath-wipro-interview',
    interviewer: 'Sudhir Rao (Principal Python Architect)',
    status: 'upcoming',
    notes: 'Prepare Python generator functions, GIL, asynchronous programming, and live coding on binary trees.',
  },
  {
    id: 'int-2',
    applicationId: 'APP-2026-7241',
    company: 'Infosys',
    companyLogo:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&auto=format&fit=crop&q=80',
    position: 'Java Developer - Specialist Programmer',
    date: '2026-09-08',
    time: '02:30 PM - 03:30 PM',
    type: 'Technical',
    meetingLink: 'https://meet.google.com/edupath-infosys-interview',
    interviewer: 'Meghna Roy (Senior Engineering Manager)',
    status: 'upcoming',
    notes: 'Topics include Java 21 Virtual Threads, Spring Boot REST architecture, and Database Indexing.',
  },
];

const DEFAULT_ENROLLED: { [courseId: string]: EnrolledCourseData } = {
  'course-1': {
    courseId: 'course-1',
    enrolledAt: '2026-08-15',
    progress: 75,
    completedLessons: ['les-101', 'les-102', 'les-103', 'les-201', 'les-202', 'les-301'],
    lastAccessed: '2 hours ago',
  },
  'course-2': {
    courseId: 'course-2',
    enrolledAt: '2026-08-18',
    progress: 45,
    completedLessons: ['les-j101', 'les-j102'],
    lastAccessed: '1 day ago',
  },
  'course-3': {
    courseId: 'course-3',
    enrolledAt: '2026-08-20',
    progress: 60,
    completedLessons: ['les-w101'],
    lastAccessed: '3 days ago',
  },
};

const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-auto-1',
    certificateId: 'EDUPATH-CERT-001',
    certificateNumber: 'EDUPATH-CERT-001',
    studentName: 'Sai Krishna',
    courseTitle: 'Python Programming Masterclass',
    instructorName: 'Dr. Rajesh Kumar',
    issueDate: '2026-08-25',
    grade: 'Grade A+ (Distinction)',
    verificationUrl: 'https://edupath.edu/verify/EDUPATH-CERT-001',
  },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const stored = localStorage.getItem('eduvia_courses');
      return stored ? JSON.parse(stored) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const stored = localStorage.getItem('eduvia_jobs');
      return stored ? JSON.parse(stored) : INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  const [quizzes] = useState<Quiz[]>(INITIAL_QUIZZES);
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    try {
      const stored = localStorage.getItem('eduvia_assignments');
      return stored ? JSON.parse(stored) : INITIAL_ASSIGNMENTS;
    } catch {
      return INITIAL_ASSIGNMENTS;
    }
  });

  const [enrolledCourses, setEnrolledCourses] = useState<{ [courseId: string]: EnrolledCourseData }>(() => {
    try {
      const stored = localStorage.getItem('eduvia_enrolled_courses');
      return stored ? JSON.parse(stored) : DEFAULT_ENROLLED;
    } catch {
      return DEFAULT_ENROLLED;
    }
  });

  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('eduvia_saved_jobs');
      return stored ? JSON.parse(stored) : ['job-4', 'job-5'];
    } catch {
      return ['job-4', 'job-5'];
    }
  });

  const [bookmarkedCourses, setBookmarkedCourses] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('eduvia_bookmarked_courses');
      return stored ? JSON.parse(stored) : ['course-4', 'course-8'];
    } catch {
      return ['course-4', 'course-8'];
    }
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    try {
      const stored = localStorage.getItem('eduvia_applications');
      return stored ? JSON.parse(stored) : DEFAULT_APPLICATIONS;
    } catch {
      return DEFAULT_APPLICATIONS;
    }
  });

  const [interviews, setInterviews] = useState<Interview[]>(() => {
    try {
      const stored = localStorage.getItem('eduvia_interviews');
      return stored ? JSON.parse(stored) : DEFAULT_INTERVIEWS;
    } catch {
      return DEFAULT_INTERVIEWS;
    }
  });

  const [quizResults, setQuizResults] = useState<QuizResult[]>(() => {
    try {
      const stored = localStorage.getItem('eduvia_quiz_results');
      return stored
        ? JSON.parse(stored)
        : [
            {
              id: 'qres-1',
              quizId: 'quiz-python-1',
              courseTitle: 'Python Programming Masterclass',
              score: 6,
              totalQuestions: 6,
              percentage: 100,
              passed: true,
              answers: { 'pq-1': 1, 'pq-2': 3, 'pq-3': 1, 'pq-4': 2, 'pq-5': 1, 'pq-6': 2 },
              completedAt: '2026-08-25T14:30:00',
            },
          ];
    } catch {
      return [];
    }
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    try {
      const stored = localStorage.getItem('eduvia_certificates');
      return stored ? JSON.parse(stored) : DEFAULT_CERTIFICATES;
    } catch {
      return DEFAULT_CERTIFICATES;
    }
  });

  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const stored = localStorage.getItem('eduvia_resume_data');
      return stored ? JSON.parse(stored) : DEFAULT_RESUME;
    } catch {
      return DEFAULT_RESUME;
    }
  });

  const [claimedRewardIds, setClaimedRewardIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('eduvia_claimed_rewards');
      return stored ? JSON.parse(stored) : ['reward-recruiter-token'];
    } catch {
      return ['reward-recruiter-token'];
    }
  });

  // Sync to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('eduvia_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('eduvia_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('eduvia_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('eduvia_enrolled_courses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('eduvia_saved_jobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem('eduvia_bookmarked_courses', JSON.stringify(bookmarkedCourses));
  }, [bookmarkedCourses]);

  useEffect(() => {
    localStorage.setItem('eduvia_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('eduvia_interviews', JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    localStorage.setItem('eduvia_quiz_results', JSON.stringify(quizResults));
  }, [quizResults]);

  useEffect(() => {
    localStorage.setItem('eduvia_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('eduvia_resume_data', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('eduvia_claimed_rewards', JSON.stringify(claimedRewardIds));
  }, [claimedRewardIds]);

  // Compute dynamic badges based on student activities
  const badges = React.useMemo<Badge[]>(() => {
    const enrollmentsList = Object.values(enrolledCourses) as Array<{
      courseId: string;
      progress: number;
      completedLessons?: string[];
      lastAccessed?: string;
    }>;

    const completedCoursesCount = enrollmentsList.filter(
      (e) => e.progress >= 100
    ).length;
    const effectiveCompletedCourses = Math.max(completedCoursesCount, certificates.length);

    let maxLessonsCompletedInAnyCourse = 0;
    enrollmentsList.forEach((e) => {
      const count = e.completedLessons?.length || 0;
      if (count > maxLessonsCompletedInAnyCourse) {
        maxLessonsCompletedInAnyCourse = count;
      }
    });

    const passedQuizzesCount = quizResults.filter((q) => q.passed).length;
    const highestQuizScore = quizResults.reduce((max, q) => Math.max(max, q.percentage || 0), 0);
    const has90Quiz = quizResults.some((q) => (q.percentage || 0) >= 90);
    const has100Quiz = quizResults.some((q) => (q.percentage || 0) >= 100);
    const applicationsCount = applications.length;
    const hasInterview = interviews.length > 0 || applications.some((a) => a.status === 'interview_scheduled' || a.status === 'shortlisted');
    const submittedAssignmentsCount = assignments.filter((a) => a.status === 'submitted' || a.status === 'graded' || a.status === 'Submitted' || a.status === 'Graded').length;

    return INITIAL_BADGES_CATALOG.map((item) => {
      let isUnlocked = false;
      let progress = 0;

      switch (item.id) {
        case 'badge-first-course':
          progress = Math.min(1, effectiveCompletedCourses);
          isUnlocked = effectiveCompletedCourses >= 1;
          break;
        case 'badge-dual-specialist':
          progress = Math.min(2, effectiveCompletedCourses);
          isUnlocked = effectiveCompletedCourses >= 2;
          break;
        case 'badge-master-polymath':
          progress = Math.min(3, effectiveCompletedCourses);
          isUnlocked = effectiveCompletedCourses >= 3;
          break;
        case 'badge-lesson-sprinter':
          progress = Math.min(5, maxLessonsCompletedInAnyCourse);
          isUnlocked = maxLessonsCompletedInAnyCourse >= 5;
          break;
        case 'badge-quiz-pioneer':
          progress = Math.min(1, passedQuizzesCount);
          isUnlocked = passedQuizzesCount >= 1;
          break;
        case 'badge-sharp-shooter':
          progress = has90Quiz ? 1 : Math.min(1, Math.round((highestQuizScore / 90) * 100) / 100);
          isUnlocked = has90Quiz;
          break;
        case 'badge-perfect-score':
          progress = has100Quiz ? 1 : 0;
          isUnlocked = has100Quiz;
          break;
        case 'badge-quiz-grandmaster':
          progress = Math.min(3, passedQuizzesCount);
          isUnlocked = passedQuizzesCount >= 3;
          break;
        case 'badge-ats-ready':
          progress = 1;
          isUnlocked = true;
          break;
        case 'badge-placement-ambition':
          progress = Math.min(2, applicationsCount);
          isUnlocked = applicationsCount >= 2;
          break;
        case 'badge-interview-ready':
          progress = hasInterview ? 1 : 0;
          isUnlocked = hasInterview;
          break;
        case 'badge-assignment-ace':
          progress = Math.min(1, submittedAssignmentsCount);
          isUnlocked = submittedAssignmentsCount >= 1;
          break;
        default:
          isUnlocked = false;
          progress = 0;
      }

      return {
        ...item,
        isUnlocked,
        progress,
        unlockedAt: isUnlocked ? 'Unlocked' : undefined,
      };
    });
  }, [enrolledCourses, certificates, quizResults, applications, interviews, assignments]);

  const studentXp = React.useMemo(() => {
    const badgeXp = badges.filter((b) => b.isUnlocked).reduce((sum, b) => sum + b.xpReward, 0);
    const quizScoreXp = quizResults.reduce((sum, q) => sum + (q.passed ? 60 : 20), 0);
    const enrollmentsList = Object.values(enrolledCourses) as Array<{
      completedLessons?: string[];
    }>;
    const lessonXp = enrollmentsList.reduce((sum, e) => sum + (e.completedLessons?.length || 0) * 25, 0);
    const certXp = certificates.length * 150;
    return badgeXp + quizScoreXp + lessonXp + certXp;
  }, [badges, quizResults, enrolledCourses, certificates]);

  const studentLevel = React.useMemo(() => {
    if (studentXp < 500) {
      return {
        level: 1,
        title: 'Novice Scholar',
        currentLevelXp: studentXp,
        nextLevelXp: 500,
        progressPercent: Math.min(100, Math.round((studentXp / 500) * 100)),
      };
    } else if (studentXp < 1100) {
      return {
        level: 2,
        title: 'Skilled Apprentice',
        currentLevelXp: studentXp - 500,
        nextLevelXp: 600,
        progressPercent: Math.min(100, Math.round(((studentXp - 500) / 600) * 100)),
      };
    } else if (studentXp < 1800) {
      return {
        level: 3,
        title: 'Core CS Specialist',
        currentLevelXp: studentXp - 1100,
        nextLevelXp: 700,
        progressPercent: Math.min(100, Math.round(((studentXp - 1100) / 700) * 100)),
      };
    } else if (studentXp < 2800) {
      return {
        level: 4,
        title: 'Engineering Master',
        currentLevelXp: studentXp - 1800,
        nextLevelXp: 1000,
        progressPercent: Math.min(100, Math.round(((studentXp - 1800) / 1000) * 100)),
      };
    } else {
      return {
        level: 5,
        title: 'Placement Star (Grandmaster)',
        currentLevelXp: studentXp,
        nextLevelXp: studentXp,
        progressPercent: 100,
      };
    }
  }, [studentXp]);

  const rewards = React.useMemo<StudentReward[]>(() => {
    return INITIAL_STUDENT_REWARDS.map((r) => ({
      ...r,
      isClaimed: claimedRewardIds.includes(r.id),
      claimedAt: claimedRewardIds.includes(r.id) ? 'Claimed' : undefined,
    }));
  }, [claimedRewardIds]);

  const unlockedBadgesCount = React.useMemo(() => {
    return badges.filter((b) => b.isUnlocked).length;
  }, [badges]);

  const claimReward = useCallback(
    (rewardId: string): boolean => {
      const reward = INITIAL_STUDENT_REWARDS.find((r) => r.id === rewardId);
      if (!reward) return false;
      const count = badges.filter((b) => b.isUnlocked).length;
      if (studentXp >= reward.requiredXp && (!reward.requiredBadgeCount || count >= reward.requiredBadgeCount)) {
        setClaimedRewardIds((prev) => (prev.includes(rewardId) ? prev : [...prev, rewardId]));
        return true;
      }
      return false;
    },
    [studentXp, badges]
  );

  const enrollCourse = useCallback((courseId: string) => {
    setEnrolledCourses((prev) => {
      if (prev[courseId]) return prev;
      return {
        ...prev,
        [courseId]: {
          courseId,
          enrolledAt: new Date().toISOString().split('T')[0],
          progress: 5,
          completedLessons: [],
          lastAccessed: 'Just now',
        },
      };
    });
  }, []);

  const markLessonCompleted = useCallback(
    (courseId: string, lessonId: string) => {
      setEnrolledCourses((prev) => {
        const existing = prev[courseId] || {
          courseId,
          enrolledAt: new Date().toISOString().split('T')[0],
          progress: 0,
          completedLessons: [],
          lastAccessed: 'Just now',
        };

        if (existing.completedLessons.includes(lessonId)) {
          return prev;
        }

        const updatedCompleted = [...existing.completedLessons, lessonId];
        const course = courses.find((c) => c.id === courseId);
        const total = course?.totalLessons || course?.modules.reduce((a, m) => a + m.lessons.length, 0) || 10;
        const calculatedProgress = Math.min(100, Math.round((updatedCompleted.length / total) * 100));

        return {
          ...prev,
          [courseId]: {
            ...existing,
            completedLessons: updatedCompleted,
            progress: calculatedProgress,
            lastAccessed: 'Just now',
          },
        };
      });
    },
    [courses]
  );

  const unmarkLessonCompleted = useCallback(
    (courseId: string, lessonId: string) => {
      setEnrolledCourses((prev) => {
        const existing = prev[courseId];
        if (!existing) return prev;

        const updatedCompleted = existing.completedLessons.filter((id) => id !== lessonId);
        const course = courses.find((c) => c.id === courseId);
        const total = course?.totalLessons || course?.modules.reduce((a, m) => a + m.lessons.length, 0) || 10;
        const calculatedProgress = Math.min(100, Math.round((updatedCompleted.length / total) * 100));

        return {
          ...prev,
          [courseId]: {
            ...existing,
            completedLessons: updatedCompleted,
            progress: calculatedProgress,
            lastAccessed: 'Just now',
          },
        };
      });
    },
    [courses]
  );

  const toggleBookmarkCourse = useCallback((courseId: string) => {
    setBookmarkedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  }, []);

  const toggleSaveJob = useCallback((jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  }, []);

  const submitApplication = useCallback(
    (applicationData: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>): string => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const appId = `APP-2026-${randomNum}`;
      const newApp: JobApplication = {
        ...applicationData,
        id: appId,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'applied',
        notes: 'Application submitted successfully on EduPath Portal and queued for HR review.',
      };

      setApplications((prev) => [newApp, ...prev]);
      return appId;
    },
    []
  );

  const updateApplicationStatus = useCallback(
    (applicationId: string, newStatus: ApplicationStatus, notes?: string) => {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus, notes: notes || app.notes } : app
        )
      );
    },
    []
  );

  const saveQuizResult = useCallback((result: Omit<QuizResult, 'id' | 'completedAt'>) => {
    const newResult: QuizResult = {
      ...result,
      id: `qres-${Date.now()}`,
      completedAt: new Date().toISOString(),
    };
    setQuizResults((prev) => [newResult, ...prev]);
  }, []);

  const submitQuizResult = useCallback((result: any) => {
    saveQuizResult(result);
  }, [saveQuizResult]);

  const submitAssignment = useCallback(
    (assignmentId: string, answerOrPayload: any, fileName = 'submission_edupath.zip') => {
      const answerText = typeof answerOrPayload === 'string' ? answerOrPayload : answerOrPayload?.comments || '';
      setAssignments((prev) =>
        prev.map((asg) =>
          asg.id === assignmentId
            ? {
                ...asg,
                status: 'submitted',
                submittedAnswer: answerText,
                submittedFile: fileName,
                submittedAt: new Date().toISOString().split('T')[0],
                feedback: 'Assignment received. Pending evaluation by Course Instructor.',
              }
            : asg
        )
      );
    },
    []
  );

  const updateResumeData = useCallback((data: ResumeData) => {
    setResumeData(data);
  }, []);

  const addNewJob = useCallback((job: Omit<Job, 'id' | 'postedDate'>) => {
    const newJob: Job = {
      ...job,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
    };
    setJobs((prev) => [newJob, ...prev]);
  }, []);

  const addJob = useCallback((job: any) => {
    addNewJob(job);
  }, [addNewJob]);

  const addNewCourse = useCallback(
    (course: Omit<Course, 'id' | 'studentsCount' | 'rating' | 'reviews'>) => {
      const newCourse: Course = {
        ...course,
        id: `course-${Date.now()}`,
        studentsCount: 1,
        rating: 5.0,
        reviews: [],
      };
      setCourses((prev) => [newCourse, ...prev]);
    },
    []
  );

  const addCourse = useCallback((course: any) => {
    addNewCourse(course);
  }, [addNewCourse]);

  const scheduleInterview = useCallback((interview: Omit<Interview, 'id'>) => {
    const newInterview: Interview = {
      ...interview,
      id: `int-${Date.now()}`,
    };
    setInterviews((prev) => [newInterview, ...prev]);
  }, []);

  const getCourseProgress = useCallback(
    (courseId: string) => {
      return enrolledCourses[courseId]?.progress || 0;
    },
    [enrolledCourses]
  );

  const isCourseCompleted = useCallback(
    (courseId: string) => {
      return (enrolledCourses[courseId]?.progress || 0) >= 100;
    },
    [enrolledCourses]
  );

  const generateCertificate = useCallback(
    (courseId: string, studentName: string): Certificate => {
      const course = courses.find((c) => c.id === courseId);
      const certId = `EDUPATH-${(course?.category || 'TECH').substring(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const instructorName = typeof course?.instructor === 'object' ? course.instructor.name : (course?.instructor || 'EduPath Academic Council');
      const newCert: Certificate = {
        id: `cert-${Date.now()}`,
        certificateId: certId,
        certificateNumber: certId,
        studentName,
        courseTitle: course?.title || 'Computer Science Specialization',
        instructorName,
        issueDate: new Date().toISOString().split('T')[0],
        grade: 'Grade A+ (Excellence)',
        verificationUrl: `https://edupath.edu/verify/${certId}`,
      };

      setCertificates((prev) => {
        if (prev.some((c) => c.courseTitle === newCert.courseTitle)) {
          return prev;
        }
        return [newCert, ...prev];
      });

      return newCert;
    },
    [courses]
  );

  return (
    <DataContext.Provider
      value={{
        courses,
        jobs,
        quizzes,
        assignments,
        enrolledCourses,
        savedJobs,
        bookmarkedCourses,
        applications,
        interviews,
        quizResults,
        certificates,
        resumeData,
        badges,
        rewards,
        studentXp,
        studentLevel,
        unlockedBadgesCount,
        claimedRewardIds,
        claimReward,
        enrollCourse,
        markLessonCompleted,
        unmarkLessonCompleted,
        toggleBookmarkCourse,
        toggleSaveJob,
        submitApplication,
        updateApplicationStatus,
        saveQuizResult,
        submitQuizResult,
        submitAssignment,
        updateResumeData,
        addNewJob,
        addJob,
        addNewCourse,
        addCourse,
        scheduleInterview,
        getCourseProgress,
        isCourseCompleted,
        generateCertificate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
