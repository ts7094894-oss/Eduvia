import { Job } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Software Developer (Digital Drive)',
    company: 'Tata Consultancy Services (TCS)',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
    location: 'Hyderabad / Bangalore / Chennai',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    experience: 'Fresher (2025/2026 Batch)',
    salary: '₹7.5 LPA - ₹9.0 LPA',
    skills: ['Python', 'Java', 'Data Structures', 'SQL', 'Git'],
    eligibility: 'B.Tech / B.E (CSE, IT, ECE), MCA with 65%+ or 6.5+ CGPA with no active backlogs.',
    minCgpa: 6.5,
    description: 'TCS Digital is hiring talented engineering graduates to engineer high-velocity digital solutions across Cloud, AI, and enterprise architectures.',
    responsibilities: [
      'Design, develop, test, and deploy clean, maintainable software modules',
      'Collaborate with cross-functional agile teams and product owners',
      'Implement robust RESTful services and database schemas',
      'Participate in code reviews, bug fixes, and continuous integration pipelines',
      'Learn emerging enterprise frameworks and modern cloud tools'
    ],
    qualifications: [
      'Strong problem-solving fundamentals in Data Structures & Algorithms',
      'Solid programming foundation in Python, Java, or C++',
      'Understanding of Relational Databases and SQL queries',
      'Excellent verbal and written communication skills',
      'Demonstrated academic or personal coding projects'
    ],
    deadline: '2026-09-30',
    postedDate: '2026-08-25',
    featured: true,
    openings: 85,
    category: 'Software Engineering'
  },
  {
    id: 'job-2',
    title: 'Java Developer - Specialist Programmer',
    company: 'Infosys',
    companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&auto=format&fit=crop&q=80',
    location: 'Bangalore / Pune / Hyderabad',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    experience: 'Fresher (2025/2026 Batch)',
    salary: '₹9.5 LPA - ₹11.0 LPA',
    skills: ['Java', 'Spring Boot', 'Microservices', 'SQL', 'Docker'],
    eligibility: 'B.Tech/M.Tech in CS/IT/All Circuital Branches with CGPA ≥ 7.0.',
    minCgpa: 7.0,
    description: 'The Infosys Specialist Programmer role is an elite high-compensation developer track focused on deep technical engineering, algorithm design, and microservices.',
    responsibilities: [
      'Architect resilient backend services using Spring Boot and Java 21',
      'Write optimized SQL queries, stored procedures, and ORM mappings',
      'Build containerized microservices running on Kubernetes/Docker',
      'Implement authentication, OAuth2, and secure API gateways',
      'Ensure 99.9% uptime and low-latency response times for enterprise clients'
    ],
    qualifications: [
      'Deep command of Java OOP, Multithreading, and Collections Framework',
      'Familiarity with Spring Boot, JPA/Hibernate, and RESTful APIs',
      'Strong understanding of algorithmic complexity and competitive programming',
      'Hands-on experience with Git version control and unit testing (JUnit)'
    ],
    deadline: '2026-09-28',
    postedDate: '2026-08-28',
    featured: true,
    openings: 50,
    category: 'Backend Development'
  },
  {
    id: 'job-3',
    title: 'Python Backend Engineer (Turbo Drive)',
    company: 'Wipro Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=120&auto=format&fit=crop&q=80',
    location: 'Hyderabad / Noida / Bangalore',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    experience: 'Fresher (2026 Batch)',
    salary: '₹6.5 LPA - ₹8.0 LPA',
    skills: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Redis'],
    eligibility: 'B.E/B.Tech (Any branch with demonstrated programming skills) with CGPA ≥ 6.0.',
    minCgpa: 6.0,
    description: 'Wipro Turbo is seeking proactive Python developers to build modern backend services, automation suites, and data pipelines for global clients.',
    responsibilities: [
      'Develop backend APIs using Python (FastAPI / Flask / Django)',
      'Manage asynchronous task queues with Celery and Redis',
      'Design database schemas and write optimized PostgreSQL queries',
      'Build automated unit and integration test suites',
      'Work alongside DevOps teams on containerized CI/CD deployments'
    ],
    qualifications: [
      'Strong proficiency in Python 3, object-oriented concepts, and packages',
      'Experience building web APIs or web scraping pipelines',
      'Understanding of asynchronous programming in Python',
      'Knowledge of REST API conventions and JSON data formats'
    ],
    deadline: '2026-10-05',
    postedDate: '2026-08-20',
    featured: false,
    openings: 60,
    category: 'Backend Development'
  },
  {
    id: 'job-4',
    title: 'Frontend React Developer - Associate Engineer',
    company: 'Accenture',
    companyLogo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=120&auto=format&fit=crop&q=80',
    location: 'Bangalore / Mumbai / Gurgaon',
    workplaceType: 'Remote',
    jobType: 'Full-time',
    experience: 'Fresher / 0-1 Year',
    salary: '₹6.0 LPA - ₹7.5 LPA',
    skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'],
    eligibility: 'B.Tech / B.E / MCA / B.Sc (Computer Science) with CGPA ≥ 6.5.',
    minCgpa: 6.5,
    description: 'Join Accenture Advanced Technology Centers in India (ATCI) to build world-class, responsive, accessible web applications for global enterprise clients.',
    responsibilities: [
      'Translate UI/UX wireframes and Figma designs into responsive React components',
      'Manage client-side state using React Hooks, Context, or Redux',
      'Optimize web vitals, asset loading speeds, and responsive cross-browser compatibility',
      'Integrate frontend applications with backend REST and GraphQL APIs',
      'Ensure WCAG AA accessibility compliance across all UI components'
    ],
    qualifications: [
      'Strong mastery of modern JavaScript (ES6+), HTML5, and CSS3',
      'Hands-on project experience with React.js and component libraries',
      'Understanding of Tailwind CSS or CSS-in-JS utility frameworks',
      'Familiarity with Git, NPM, and modern frontend build tools (Vite, Webpack)'
    ],
    deadline: '2026-10-10',
    postedDate: '2026-08-22',
    featured: true,
    openings: 45,
    category: 'Frontend Development'
  },
  {
    id: 'job-5',
    title: 'Data Analyst - Technology & Analytics',
    company: 'Deloitte India',
    companyLogo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&auto=format&fit=crop&q=80',
    location: 'Hyderabad / Mumbai / Bangalore',
    workplaceType: 'On-site',
    jobType: 'Full-time',
    experience: 'Fresher / 0-1 Year',
    salary: '₹8.0 LPA - ₹10.5 LPA',
    skills: ['SQL', 'Python', 'Power BI', 'Data Visualization', 'Excel'],
    eligibility: 'B.Tech / B.E / Dual Degree / M.Tech in CSE, IT, Data Science, Math, or Stats with CGPA ≥ 7.0.',
    minCgpa: 7.0,
    description: 'Deloitte USI is looking for analytical minds to transform massive data streams into actionable strategic insights, executive dashboards, and statistical models.',
    responsibilities: [
      'Extract, clean, and transform data from distributed SQL databases and data lakes',
      'Build dynamic, interactive dashboards and business intelligence reports in Power BI / Tableau',
      'Conduct exploratory data analysis (EDA) to detect anomalies, churn, and revenue trends',
      'Write advanced SQL queries involving Window functions, CTEs, and complex joins',
      'Present findings and data-driven recommendations to leadership'
    ],
    qualifications: [
      'Solid command of SQL and relational database concepts',
      'Proficiency in Python (Pandas, NumPy, Matplotlib/Seaborn) for data manipulation',
      'Analytical mindset with strong grasp of descriptive and inferential statistics',
      'Superb presentation and stakeholder communication abilities'
    ],
    deadline: '2026-10-15',
    postedDate: '2026-08-29',
    featured: true,
    openings: 30,
    category: 'Data Science'
  },
  {
    id: 'job-6',
    title: 'Machine Learning Research Intern',
    company: 'Cognizant AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=120&auto=format&fit=crop&q=80',
    location: 'Chennai / Hyderabad',
    workplaceType: 'Hybrid',
    jobType: 'Internship',
    experience: 'Final Year / Pre-final Year Student',
    salary: '₹35,000 / month (Stipend + PPO Opportunity)',
    skills: ['Python', 'Machine Learning', 'PyTorch', 'Scikit-Learn', 'NLP'],
    eligibility: 'Students currently enrolled in B.Tech / M.Tech / MS (CSE, AI, Data Science) graduating 2026 or 2027.',
    minCgpa: 7.5,
    description: 'Work alongside leading AI researchers and engineers at Cognizant AI Labs to research, benchmark, and deploy predictive models, NLP classifiers, and computer vision systems.',
    responsibilities: [
      'Preprocess large unstructured text and tabular datasets for deep learning experiments',
      'Fine-tune open-weight transformer models and benchmark accuracy vs latency tradeoffs',
      'Implement feature engineering pipelines using Python and Scikit-Learn',
      'Document research experiments, ablation studies, and technical whitepapers'
    ],
    qualifications: [
      'Strong grasp of ML theory: Supervised/Unsupervised algorithms, loss functions, optimization',
      'Experience with Python, NumPy, Pandas, Scikit-Learn, and PyTorch / TensorFlow',
      'Familiarity with Git and Jupyter Notebooks'
    ],
    deadline: '2026-09-25',
    postedDate: '2026-08-30',
    featured: false,
    openings: 15,
    category: 'AI & ML'
  },
  {
    id: 'job-7',
    title: 'Web Development Intern (Full Stack)',
    company: 'Tech Mahindra',
    companyLogo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&auto=format&fit=crop&q=80',
    location: 'Pune / Hyderabad / Remote',
    workplaceType: 'Remote',
    jobType: 'Internship',
    experience: 'College Student (Any Year)',
    salary: '₹25,000 / month (6 Months Duration)',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js'],
    eligibility: 'College student with active web development portfolio or projects.',
    minCgpa: 6.0,
    description: 'Exciting 6-month full-stack internship working on digital transformation applications, internal tools, and high-traffic portal development.',
    responsibilities: [
      'Build reusable React components according to design specifications',
      'Assist senior engineers in developing backend REST APIs with Node.js and Express',
      'Test web applications across browsers and responsive viewports',
      'Participate in daily standup meetings and sprint retrospectives'
    ],
    qualifications: [
      'Knowledge of HTML5, CSS3, JavaScript (ES6+), and React basics',
      'Familiarity with Git branching and repository management',
      'Strong desire to learn, collaborate, and adapt to modern tech stacks'
    ],
    deadline: '2026-10-01',
    postedDate: '2026-08-26',
    featured: false,
    openings: 25,
    category: 'Web Development'
  },
  {
    id: 'job-8',
    title: 'Cloud & DevOps Engineer - Campus Drive',
    company: 'Amazon Web Services (AWS)',
    companyLogo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&auto=format&fit=crop&q=80',
    location: 'Hyderabad / Bangalore',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    experience: 'Fresher (2026 Batch)',
    salary: '₹14.0 LPA - ₹18.0 LPA',
    skills: ['Computer Networks', 'Linux', 'Python', 'AWS', 'Docker'],
    eligibility: 'B.Tech / B.E (CSE/IT/ECE) with CGPA ≥ 7.5 and strong networking fundamentals.',
    minCgpa: 7.5,
    description: 'AWS is hiring high-potential campus graduates to support global infrastructure, automate cloud operations, and architect fault-tolerant distributed cloud networks.',
    responsibilities: [
      'Troubleshoot complex networking, DNS, load-balancer, and VPC configurations',
      'Write automation scripts in Python/Bash to streamline cloud infrastructure provisioning',
      'Monitor distributed cloud service health and participate in incident management',
      'Collaborate with enterprise solutions architects on cloud migrations'
    ],
    qualifications: [
      'Solid command of Computer Networks (TCP/IP, OSI, DNS, Subnetting, Routing)',
      'Hands-on Linux command-line skills and shell scripting',
      'Basic knowledge of virtualization, containers (Docker), and cloud services',
      'Strong analytical debugging and root cause analysis capabilities'
    ],
    deadline: '2026-09-20',
    postedDate: '2026-08-31',
    featured: true,
    openings: 20,
    category: 'Cloud & DevOps'
  }
];
