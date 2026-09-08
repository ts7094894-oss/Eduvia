export type Role = 'student' | 'teacher' | 'placement' | 'recruiter' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  rollNumber?: string;
  college?: string;
  degree?: string;
  graduationYear?: string;
  cgpa?: string | number;
  bio?: string;
  phone?: string;
  skills?: string[];
  github?: string;
  linkedin?: string;
  companyName?: string;
  department?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description?: string;
  completed?: boolean;
  notes?: string;
  freePreview?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  duration?: string;
  lessons: Lesson[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CourseInstructor {
  name: string;
  title?: string;
  avatar?: string;
  rating?: number;
  bio?: string;
}

export interface Course {
  id: string;
  title: string;
  slug?: string;
  instructor: string | CourseInstructor;
  rating: number;
  studentsCount: number;
  duration: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  description: string;
  overview?: string;
  thumbnail: string;
  tags?: string[];
  learningObjectives?: string[];
  whatYouWillLearn?: string[];
  prerequisites?: string[];
  modules: CourseModule[];
  reviews?: Review[];
  totalLessons?: number;
  enrolledAt?: string;
  progress?: number; // 0 to 100
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  courseTitle?: string;
  title: string;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
  passingScore?: number;
  passingScorePercent?: number;
}

export interface QuizResult {
  id?: string;
  quizId: string;
  courseTitle?: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  answers?: { [questionId: string]: number };
  completedAt?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseTitle?: string;
  title: string;
  description: string;
  dueDate: string;
  points?: number;
  status: 'pending' | 'submitted' | 'graded' | 'Pending' | 'Submitted' | 'Graded' | 'Late';
  submittedAnswer?: string;
  submittedFile?: string;
  submittedAt?: string;
  grade?: string | number;
  feedback?: string;
}

export type ApplicationStatus =
  | 'applied'
  | 'under_review'
  | 'shortlisted'
  | 'interview_scheduled'
  | 'selected'
  | 'rejected'
  | 'Applied'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Selected'
  | 'Rejected';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  workplaceType: 'Remote' | 'On-site' | 'Hybrid' | string;
  jobType: 'Full-time' | 'Internship' | 'Part-time' | string;
  experience: string;
  salary: string;
  skills: string[];
  eligibility?: string;
  eligibilityCgpa?: number;
  minCgpa?: number;
  description: string;
  responsibilities?: string[];
  qualifications?: string[];
  requirements?: string[];
  deadline: string;
  postedDate?: string;
  featured?: boolean;
  openings?: number;
  category?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo?: string;
  studentName?: string;
  applicantId?: string;
  applicantName?: string;
  applicantEmail?: string;
  applicantPhone?: string;
  college?: string;
  degree?: string;
  graduationYear?: string;
  cgpa?: string | number;
  skills?: string[];
  resumeName?: string;
  coverLetter?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  appliedDate: string;
  status: ApplicationStatus;
  notes?: string;
  interviewDate?: string;
}

export interface Interview {
  id: string;
  applicationId?: string;
  company: string;
  companyLogo?: string;
  position?: string;
  role?: string;
  date: string;
  time: string;
  type?: 'Online' | 'In-person' | 'Technical' | 'HR' | string;
  round?: string;
  meetingLink?: string;
  interviewer?: string;
  panel?: string;
  status: 'upcoming' | 'scheduled' | 'completed' | 'cancelled' | 'Upcoming' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface Certificate {
  id: string;
  certificateId?: string;
  certificateNumber?: string;
  studentName: string;
  courseTitle: string;
  instructorName: string;
  issueDate: string;
  grade: string;
  verificationUrl?: string;
}

export type SkillCategory =
  | 'Programming Languages'
  | 'Web Technologies'
  | 'Frameworks'
  | 'Databases'
  | 'Tools'
  | 'Cloud'
  | 'Other Skills';

export interface ResumeSkill {
  id: string;
  name: string;
  category: SkillCategory;
}

export interface ResumeEducation {
  id: string;
  degree: string;
  specialization?: string;
  institution: string;
  college?: string;
  location?: string;
  startYear?: string;
  graduationYear?: string;
  startDate?: string;
  endDate?: string;
  cgpa: string;
  fieldOfStudy?: string;
}

export interface ResumeProject {
  id: string;
  name?: string;
  title?: string;
  description: string;
  technologies: string;
  link?: string;
  githubLink?: string;
  role?: string;
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  date?: string;
  certificateId?: string;
  certificateUrl?: string;
  isEduviaVerified?: boolean;
}

export interface ResumeInternship {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeExperience {
  id: string;
  company: string;
  position?: string;
  role?: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description: string;
}

export interface ResumeAchievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface ResumeLanguage {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
}

export type ResumeTemplate = 'professional' | 'modern' | 'minimal' | 'ats';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    professionalTitle?: string;
    email: string;
    phone: string;
    location: string;
    profilePhoto?: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  education: ResumeEducation[];
  experience: ResumeExperience[];
  internships?: ResumeInternship[];
  projects: ResumeProject[];
  skills: string[];
  categorizedSkills?: ResumeSkill[];
  certifications: ResumeCertification[];
  achievements: (string | ResumeAchievement)[];
  languages: (string | ResumeLanguage)[];
  careerInterests?: string[];
  selectedTemplate?: ResumeTemplate;
}

export type BadgeCategory = 'course' | 'quiz' | 'placement' | 'streak' | 'special';
export type BadgeTier = 'Bronze' | 'Silver' | 'Gold' | 'Diamond';

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: BadgeCategory;
  tier: BadgeTier;
  iconName: string;
  xpReward: number;
  unlockedAt?: string;
  isUnlocked: boolean;
  progress: number;
  maxProgress: number;
  perkDescription?: string;
}

export interface StudentReward {
  id: string;
  title: string;
  description: string;
  requiredXp: number;
  requiredBadgeCount?: number;
  type: 'referral' | 'mentorship' | 'certificate_boost' | 'ats_highlight' | 'exclusive_access';
  iconName: string;
  isClaimed: boolean;
  claimedAt?: string;
  code?: string;
}

