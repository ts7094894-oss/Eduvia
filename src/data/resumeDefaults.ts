import {
  ResumeData,
  ResumeSkill,
  ResumeEducation,
  ResumeProject,
  ResumeCertification,
  ResumeInternship,
  ResumeExperience,
  ResumeAchievement,
  ResumeLanguage,
  SkillCategory,
  Course,
} from '../types';

export const CAREER_INTERESTS_LIST: string[] = [
  'Software Developer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Analyst',
  'Data Scientist',
  'Machine Learning Engineer',
  'AI Engineer',
  'Cloud Engineer',
  'Cybersecurity Analyst',
  'Database Developer',
];

export const SKILL_CATEGORIES_LIST: SkillCategory[] = [
  'Programming Languages',
  'Web Technologies',
  'Frameworks',
  'Databases',
  'Tools',
  'Cloud',
  'Other Skills',
];

export const COURSE_SKILL_MAP: Record<string, string[]> = {
  'Python Programming Masterclass': ['Python', 'Data Structures', 'OOP', 'Algorithms'],
  'Full Stack Web Development with React': ['JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Tailwind CSS', 'HTML5/CSS3'],
  'Machine Learning & AI Bootcamp': ['Python', 'Machine Learning', 'Scikit-Learn', 'TensorFlow', 'Data Analysis'],
  'Cloud Computing with AWS & Docker': ['AWS', 'Docker', 'Cloud Architecture', 'Linux', 'DevOps'],
  'Database Systems & SQL Mastery': ['SQL', 'PostgreSQL', 'MySQL', 'Database Design', 'Query Optimization'],
  'Cybersecurity Essentials & Ethical Hacking': ['Network Security', 'Cryptography', 'Cybersecurity', 'Penetration Testing'],
  'Data Structures & Algorithms in Java': ['Java', 'Algorithms', 'Data Structures', 'System Design'],
  'Mobile App Development with React Native': ['React Native', 'Mobile Development', 'JavaScript', 'Redux'],
};

export const INITIAL_CATEGORIZED_SKILLS: ResumeSkill[] = [
  { id: 'sk-1', name: 'Python', category: 'Programming Languages' },
  { id: 'sk-2', name: 'Java', category: 'Programming Languages' },
  { id: 'sk-3', name: 'TypeScript', category: 'Programming Languages' },
  { id: 'sk-4', name: 'JavaScript', category: 'Programming Languages' },
  { id: 'sk-5', name: 'React.js', category: 'Web Technologies' },
  { id: 'sk-6', name: 'HTML5 & CSS3', category: 'Web Technologies' },
  { id: 'sk-7', name: 'Tailwind CSS', category: 'Frameworks' },
  { id: 'sk-8', name: 'Node.js & Express', category: 'Frameworks' },
  { id: 'sk-9', name: 'PostgreSQL', category: 'Databases' },
  { id: 'sk-10', name: 'MySQL', category: 'Databases' },
  { id: 'sk-11', name: 'Git & GitHub', category: 'Tools' },
  { id: 'sk-12', name: 'Docker', category: 'Tools' },
  { id: 'sk-13', name: 'AWS (EC2, S3)', category: 'Cloud' },
  { id: 'sk-14', name: 'REST APIs & Postman', category: 'Other Skills' },
  { id: 'sk-15', name: 'Data Structures & Algorithms', category: 'Other Skills' },
];

export const INITIAL_EDUCATION: ResumeEducation[] = [
  {
    id: 'edu-1',
    degree: 'B.Tech in Computer Science & Engineering',
    specialization: 'Artificial Intelligence & Software Engineering',
    institution: 'EduPath Institute of Engineering & Technology',
    college: 'EduPath Institute of Engineering & Technology',
    location: 'Hyderabad, India',
    startYear: '2022',
    graduationYear: '2026',
    startDate: 'Aug 2022',
    endDate: 'May 2026',
    cgpa: '8.85 / 10.0',
    fieldOfStudy: 'Computer Science and Engineering',
  },
  {
    id: 'edu-2',
    degree: 'Senior Secondary (Class XII - MPC)',
    specialization: 'Mathematics, Physics, Chemistry',
    institution: 'EduPath Junior College of Sciences',
    college: 'EduPath Junior College of Sciences',
    location: 'Hyderabad, India',
    startYear: '2020',
    graduationYear: '2022',
    startDate: 'Jun 2020',
    endDate: 'Mar 2022',
    cgpa: '96.4%',
    fieldOfStudy: 'Mathematics, Physics & Chemistry',
  },
];

export const INITIAL_PROJECTS: ResumeProject[] = [
  {
    id: 'proj-1',
    name: 'EduPath - Integrated E-Learning & Placement Portal',
    title: 'EduPath - Integrated E-Learning & Placement Portal',
    technologies: 'React, TypeScript, Tailwind CSS, LocalStorage, Vite',
    role: 'Full Stack Lead',
    link: 'https://edupath.app',
    githubLink: 'https://github.com/edupath-tech/edupath-portal',
    description:
      'Engineered an all-in-one EdTech LMS platform combining course videos, interactive quizzes, automated resume generation, and in-portal direct campus placement applications with real-time tracking.',
  },
  {
    id: 'proj-2',
    name: 'ATS Keyword Matcher & Resume Intelligence Scanner',
    title: 'ATS Keyword Matcher & Resume Intelligence Scanner',
    technologies: 'Python, FastAPI, Scikit-Learn, NLTK, React',
    role: 'Backend & ML Developer',
    link: 'https://github.com/edupath-tech/ats-scanner',
    githubLink: 'https://github.com/edupath-tech/ats-scanner',
    description:
      'Developed an automated semantic resume parser extracting technical skills and calculating job description match score with 92% accuracy, reducing candidate screening latency by 60%.',
  },
];

export const INITIAL_CERTIFICATIONS: ResumeCertification[] = [
  {
    id: 'cert-1',
    name: 'Python Programming Masterclass',
    issuer: 'EduPath Certified Credentials',
    issueDate: 'Aug 2026',
    date: 'Aug 2026',
    certificateId: 'EDUPATH-CERT-001',
    certificateUrl: 'https://edupath.edu/verify/EDUPATH-CERT-001',
    isEduviaVerified: true,
  },
  {
    id: 'cert-2',
    name: 'Full Stack Web Development with React',
    issuer: 'EduPath Certified Credentials',
    issueDate: 'Jul 2026',
    date: 'Jul 2026',
    certificateId: 'EDUPATH-CERT-002',
    certificateUrl: 'https://edupath.edu/verify/EDUPATH-CERT-002',
    isEduviaVerified: true,
  },
];

export const INITIAL_INTERNSHIPS: ResumeInternship[] = [
  {
    id: 'intern-1',
    company: 'InnovateX Software Labs',
    role: 'Frontend Engineering Intern',
    location: 'Hyderabad, India (Hybrid)',
    startDate: 'May 2025',
    endDate: 'July 2025',
    description:
      'Developed responsive student dashboards using React, TypeScript, and Tailwind CSS serving 10,000+ active users. Optimized client bundle size by 35% through code-splitting and memoization.',
  },
];

export const INITIAL_EXPERIENCE: ResumeExperience[] = [
  {
    id: 'exp-1',
    company: 'TechVision Solutions',
    position: 'Junior Web Developer (Part-Time)',
    role: 'Junior Web Developer',
    location: 'Remote',
    startDate: 'Aug 2025',
    endDate: 'Present',
    current: true,
    description:
      'Collaborated with a 6-member agile engineering pod building client web portals, implementing RESTful API integrations, and maintaining 98% unit test code coverage.',
  },
];

export const INITIAL_ACHIEVEMENTS: ResumeAchievement[] = [
  {
    id: 'ach-1',
    title: 'Hackathon Winner - Smart Campus Solutions',
    description: 'Secured 1st place among 120+ collegiate teams for developing an automated campus drive recruitment portal.',
    date: '2025',
  },
  {
    id: 'ach-2',
    title: 'LeetCode & GeeksForGeeks 400+ DSA Milestone',
    description: 'Solved 400+ problems across arrays, trees, dynamic programming, and graphs with top 5% contest rating.',
    date: '2025',
  },
  {
    id: 'ach-3',
    title: 'Academic Merit Scholar - CSE Department',
    description: 'Awarded Dean’s List Academic Excellence Merit for maintaining top 3 rank across consecutive semesters.',
    date: '2024 - 2025',
  },
];

export const INITIAL_LANGUAGES: ResumeLanguage[] = [
  { id: 'lang-1', name: 'English', proficiency: 'Fluent' },
  { id: 'lang-2', name: 'Telugu', proficiency: 'Native' },
  { id: 'lang-3', name: 'Hindi', proficiency: 'Intermediate' },
];

export const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Sai Krishna',
    professionalTitle: 'Computer Science Student',
    email: 'student@edupath.com',
    phone: '+91 98765 43210',
    location: 'Hyderabad, Telangana, India',
    profilePhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
    linkedin: 'https://linkedin.com/in/sai-krishna-edupath',
    github: 'https://github.com/edupath-tech',
    portfolio: 'https://saikrishna-portfolio.dev',
  },
  summary:
    'Dedicated and analytical final-year Computer Science Engineering student with strong foundations in Data Structures, Python, Java, and modern React full-stack architectures. Proven track record of building robust web applications, earning verified certifications, and winning national hackathons. Seeking an Associate Software Engineer or Full Stack Developer role to deliver measurable impact in a high-growth engineering team.',
  education: INITIAL_EDUCATION,
  experience: INITIAL_EXPERIENCE,
  internships: INITIAL_INTERNSHIPS,
  projects: INITIAL_PROJECTS,
  skills: INITIAL_CATEGORIZED_SKILLS.map((s) => s.name),
  categorizedSkills: INITIAL_CATEGORIZED_SKILLS,
  certifications: INITIAL_CERTIFICATIONS,
  achievements: INITIAL_ACHIEVEMENTS,
  languages: INITIAL_LANGUAGES,
  careerInterests: ['Software Developer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer'],
  selectedTemplate: 'professional',
};

/**
 * Calculates resume completion percentage according to strict weighted criteria:
 * - Personal Information: 10%
 * - Summary: 10%
 * - Education: 15%
 * - Skills: 15%
 * - Projects: 20%
 * - Certifications: 10%
 * - Internships/Experience: 10%
 * - Achievements: 5%
 * - Languages: 5%
 */
export function calculateResumeCompletion(resume: ResumeData): {
  score: number;
  breakdown: Record<string, { earned: number; total: number; complete: boolean }>;
  suggestions: string[];
} {
  const suggestions: string[] = [];

  // Personal Info (10%)
  const hasPersonalInfo =
    Boolean(resume.personalInfo?.fullName?.trim()) &&
    Boolean(resume.personalInfo?.email?.trim()) &&
    Boolean(resume.personalInfo?.professionalTitle?.trim());
  const personalInfoScore = hasPersonalInfo ? 10 : 4;
  if (!hasPersonalInfo) {
    suggestions.push('Add your full name, email, and professional title in Personal Information.');
  } else if (!resume.personalInfo?.linkedin?.trim() || !resume.personalInfo?.github?.trim()) {
    suggestions.push('Add your LinkedIn and GitHub profile links to impress technical recruiters.');
  }

  // Summary (10%)
  const summaryLength = resume.summary ? resume.summary.trim().length : 0;
  const summaryScore = summaryLength >= 50 ? 10 : summaryLength > 10 ? 5 : 0;
  if (summaryLength < 50) {
    suggestions.push('Write or generate a strong Professional Summary highlighting your career goals.');
  }

  // Education (15%)
  const eduCount = resume.education?.length || 0;
  const educationScore = eduCount >= 1 ? 15 : 0;
  if (eduCount === 0) {
    suggestions.push('Add your Degree and University in the Education section.');
  }

  // Skills (15%)
  const skillCount =
    (resume.categorizedSkills?.length || 0) > 0
      ? resume.categorizedSkills!.length
      : resume.skills?.length || 0;
  const skillsScore = skillCount >= 6 ? 15 : skillCount >= 3 ? 10 : skillCount > 0 ? 5 : 0;
  if (skillCount < 6) {
    suggestions.push('Add at least 6 technical skills across languages, frameworks, and databases.');
  }

  // Projects (20%)
  const projCount = resume.projects?.length || 0;
  const projectsScore = projCount >= 2 ? 20 : projCount === 1 ? 12 : 0;
  if (projCount < 2) {
    suggestions.push('Add at least 2 technical projects detailing your role and technologies used.');
  }

  // Certifications (10%)
  const certCount = resume.certifications?.length || 0;
  const certScore = certCount >= 1 ? 10 : 0;
  if (certCount === 0) {
    suggestions.push('Import your EduPath course certificates or add external certifications.');
  }

  // Internships/Experience (10%)
  const expCount = (resume.experience?.length || 0) + (resume.internships?.length || 0);
  const expScore = expCount >= 1 ? 10 : 0;
  if (expCount === 0) {
    suggestions.push('Add any internship, part-time work, or practical engineering experience.');
  }

  // Achievements (5%)
  const achCount = resume.achievements?.length || 0;
  const achScore = achCount >= 1 ? 5 : 0;
  if (achCount === 0) {
    suggestions.push('Include academic achievements, hackathon ranks, or coding milestones.');
  }

  // Languages (5%)
  const langCount = resume.languages?.length || 0;
  const langScore = langCount >= 1 ? 5 : 0;
  if (langCount === 0) {
    suggestions.push('Add the languages you can speak and your proficiency level.');
  }

  const totalScore = Math.min(
    100,
    personalInfoScore +
      summaryScore +
      educationScore +
      skillsScore +
      projectsScore +
      certScore +
      expScore +
      achScore +
      langScore
  );

  return {
    score: totalScore,
    breakdown: {
      personalInfo: { earned: personalInfoScore, total: 10, complete: personalInfoScore === 10 },
      summary: { earned: summaryScore, total: 10, complete: summaryScore === 10 },
      education: { earned: educationScore, total: 15, complete: educationScore === 15 },
      skills: { earned: skillsScore, total: 15, complete: skillsScore === 15 },
      projects: { earned: projectsScore, total: 20, complete: projectsScore === 20 },
      certifications: { earned: certScore, total: 10, complete: certScore === 10 },
      experience: { earned: expScore, total: 10, complete: expScore === 10 },
      achievements: { earned: achScore, total: 5, complete: achScore === 5 },
      languages: { earned: langScore, total: 5, complete: langScore === 5 },
    },
    suggestions,
  };
}

/**
 * Generates an articulate, ATS-friendly professional summary locally without requiring any external AI API.
 */
export function generateLocalSummary(resume: ResumeData, careerGoal?: string): string {
  const name = resume.personalInfo?.fullName || 'Ambitious Engineering Graduate';
  const title = resume.personalInfo?.professionalTitle || careerGoal || 'Software Engineer';
  const primaryEdu = resume.education?.[0];
  const degree = primaryEdu?.degree || 'Computer Science Engineering graduate';
  const college = primaryEdu?.institution || primaryEdu?.college || 'reputed technical institute';
  const cgpa = primaryEdu?.cgpa ? `with a CGPA of ${primaryEdu.cgpa}` : '';

  const skillNames =
    resume.categorizedSkills?.map((s) => s.name) ||
    (Array.isArray(resume.skills) ? resume.skills : []);
  const topSkills = skillNames.slice(0, 5).join(', ') || 'modern software technologies';

  const projectsCount = resume.projects?.length || 0;
  const projectMention =
    projectsCount > 0
      ? `Demonstrated project capability in developing ${resume.projects[0]?.name || 'end-to-end full stack applications'} utilizing ${resume.projects[0]?.technologies || 'scalable web tools'}.`
      : 'Hands-on practical experience implementing algorithms and responsive software interfaces.';

  const careerTarget =
    careerGoal ||
    (resume.careerInterests && resume.careerInterests.length > 0
      ? resume.careerInterests[0]
      : title);

  return `Results-driven and detail-oriented ${title} pursuing ${degree} at ${college} ${cgpa}. Possesses solid foundations in ${topSkills}. ${projectMention} Dedicated to continuous learning and eager to leverage engineering problem-solving to deliver high-quality software solutions as a ${careerTarget}.`;
}

/**
 * Calculates a match score between a job (or job skills) and student's resume
 */
export function calculateJobMatch(
  jobOrSkills: { skills: string[]; title?: string } | string[],
  resume: ResumeData,
  optionalJobTitle: string = ''
): {
  matchPercentage: number;
  percentage: number;
  matchedSkills: string[];
  matchingSkills: string[];
  missingSkills: string[];
  suggestion: string;
} {
  const jobSkills = Array.isArray(jobOrSkills) ? jobOrSkills : (jobOrSkills?.skills || []);
  const jobTitle = Array.isArray(jobOrSkills) ? optionalJobTitle : (jobOrSkills?.title || optionalJobTitle);

  const resumeSkillNames = new Set(
    (resume.categorizedSkills?.map((s) => s.name.toLowerCase()) || []).concat(
      (Array.isArray(resume.skills) ? resume.skills : []).map((s) => s.toLowerCase())
    )
  );

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  jobSkills.forEach((skill) => {
    const sLower = skill.toLowerCase().trim();
    let isMatch = false;
    resumeSkillNames.forEach((resSkill) => {
      if (resSkill.includes(sLower) || sLower.includes(resSkill)) {
        isMatch = true;
      }
    });

    if (isMatch) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // Base skill match ratio
  let matchRatio = jobSkills.length > 0 ? matchedSkills.length / jobSkills.length : 0.8;

  // Career interest bonus
  const jobTitleLower = (jobTitle || '').toLowerCase();
  const hasCareerMatch = resume.careerInterests?.some((interest) =>
    jobTitleLower.includes(interest.toLowerCase()) || interest.toLowerCase().includes(jobTitleLower)
  );
  if (hasCareerMatch) {
    matchRatio = Math.min(1, matchRatio + 0.1);
  }

  // Convert to 55% - 98% realistic career range
  const percentage = Math.round(Math.max(55, Math.min(98, matchRatio * 100)));

  const suggestion =
    missingSkills.length > 0
      ? `Add ${missingSkills.slice(0, 2).join(' & ')} to improve your match to ${Math.min(98, percentage + 12)}%`
      : 'Great match! Your skills align strongly with this job description.';

  return {
    matchPercentage: percentage,
    percentage,
    matchedSkills,
    matchingSkills: matchedSkills,
    missingSkills,
    suggestion,
  };
}
