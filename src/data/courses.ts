import { Course } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Python Programming Masterclass',
    slug: 'python-programming',
    instructor: {
      name: 'Dr. Rajesh Kumar',
      title: 'Senior AI Engineer & Ex-Professor IIT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
    },
    rating: 4.8,
    studentsCount: 3420,
    duration: '42 Hours',
    difficulty: 'Beginner',
    category: 'Programming',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80',
    description: 'Master Python 3 from basics to advanced Object-Oriented Programming, data manipulation, file handling, automation, and real-world backend scripting.',
    overview: 'This comprehensive course equips college students and aspiring software developers with industry-standard Python programming skills. You will build 10+ hands-on projects, solve live coding problems, and prepare for Python developer campus placements.',
    learningObjectives: [
      'Understand core Python syntax, variables, data types, and control flow',
      'Master data structures: Lists, Dictionaries, Sets, and Tuples',
      'Implement Object-Oriented Programming (Classes, Inheritance, Polymorphism)',
      'Handle files, exceptions, and third-party packages with PIP',
      'Build real-world automation scripts and data visualizers',
      'Prepare for placement technical rounds and coding tests'
    ],
    prerequisites: ['No prior programming experience required', 'A computer with internet access'],
    totalLessons: 24,
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Python Fundamentals & Environment Setup',
        duration: '4h 30m',
        lessons: [
          {
            id: 'les-101',
            title: '1.1 Introduction to Python & Setting up VS Code',
            duration: '18:45',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: 'Learn why Python is the #1 language for modern software engineering, install Python 3.12, and configure VS Code with essential extensions.',
            notes: 'Python was created by Guido van Rossum and released in 1991. It emphasizes code readability with its notable use of significant whitespace.',
          },
          {
            id: 'les-102',
            title: '1.2 Variables, Dynamic Typing & Standard I/O',
            duration: '22:10',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            description: 'Deep dive into Python variable assignment, type inference, formatting strings with f-strings, and receiving user input.',
            notes: 'Use type() to inspect object data types. Python supports arbitrary-precision integers out of the box.',
          },
          {
            id: 'les-103',
            title: '1.3 Control Flow: If-Else, Match-Case & Logical Operators',
            duration: '28:30',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            description: 'Build conditional decision trees and use structural pattern matching introduced in modern Python versions.',
            notes: 'Remember indentation rules: 4 spaces per indent level is standard PEP 8 practice.',
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Data Structures & Built-in Collections',
        duration: '6h 15m',
        lessons: [
          {
            id: 'les-201',
            title: '2.1 Working with Lists & List Comprehensions',
            duration: '25:00',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            description: 'Learn list slicing, indexing, sorting, appending, and high-performance Python list comprehensions.',
            notes: 'List comprehensions provide a concise way to create lists: [x**2 for x in range(10) if x % 2 == 0].',
          },
          {
            id: 'les-202',
            title: '2.2 Dictionaries, Sets & Hashing Mechanics',
            duration: '31:40',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            description: 'Understand key-value lookups, hash collisions, set operations (union, intersection), and time complexity O(1).',
            notes: 'Dictionary keys must be hashable immutable types (strings, numbers, tuples).',
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Functions, Modules & Object-Oriented Programming',
        duration: '8h 45m',
        lessons: [
          {
            id: 'les-301',
            title: '3.1 Defining Functions, *args, **kwargs & Lambda',
            duration: '29:15',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            description: 'Write reusable, modular functions with default arguments, variable positional/keyword args, and lambda expressions.',
            notes: 'Functions are first-class citizens in Python and can be passed as arguments or returned from other functions.',
          },
          {
            id: 'les-302',
            title: '3.2 Classes, Constructors (__init__), and Inheritance',
            duration: '36:20',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            description: 'Create real-world class architectures, encapsulation principles, super() initialization, and method overriding.',
            notes: 'Encapsulation in Python is conventionally indicated by leading underscores (_protected, __private).',
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Aakash Verma',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Helped me clear my technical round at TCS! Dr. Rajesh explains OOP concepts with crystal clarity.',
      },
      {
        id: 'rev-2',
        userName: 'Sneha Patel',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 month ago',
        comment: 'The quizzes and assignments are top-notch for CSE college students.',
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Java Programming & Enterprise Backend',
    slug: 'java-programming',
    instructor: {
      name: 'Prof. Ananya Roy',
      title: 'Principal Software Architect & Lead Instructor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
    },
    rating: 4.9,
    studentsCount: 4120,
    duration: '48 Hours',
    difficulty: 'Intermediate',
    category: 'Programming',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    description: 'Complete Java mastery covering Java 21, JVM internals, Collections Framework, Multithreading, Concurrency, and Spring Boot fundamentals.',
    overview: 'Java is the backbone of Fortune 500 enterprise architectures and campus recruitment drives. This course takes you from Core Java OOP principles to writing high-throughput concurrent systems and Spring Boot REST APIs.',
    learningObjectives: [
      'Understand JVM memory architecture (Stack vs Heap, Garbage Collection)',
      'Master Object-Oriented Principles: Abstraction, Polymorphism, Encapsulation, Inheritance',
      'Expertise in Java Collections Framework (ArrayList, HashMap, TreeSet, LinkedList)',
      'Concurrency, Thread Pools, and Synchronized Blocks',
      'Java 8+ Streams API, Optional, and Lambda expressions',
      'Crack campus interviews at Infosys, Wipro, TCS, and Capgemini'
    ],
    prerequisites: ['Basic logical thinking and programming familiarity'],
    totalLessons: 28,
    modules: [
      {
        id: 'mod-j1',
        title: 'Module 1: Java Core & Object Orientation',
        duration: '6h 00m',
        lessons: [
          {
            id: 'les-j101',
            title: '1.1 JDK, JRE, JVM Architecture & First Bytecode Program',
            duration: '21:15',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: 'Understand how Java compiles source code to Bytecode (.class) executed by the Java Virtual Machine across all platforms.',
            notes: 'Write Once, Run Anywhere (WORA) is Java’s cornerstone principle.',
          },
          {
            id: 'les-j102',
            title: '1.2 Polymorphism, Method Overloading & Overriding',
            duration: '27:40',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            description: 'Runtime vs Compile-time polymorphism with dynamic method dispatch.',
            notes: 'Static methods cannot be overridden in Java; they are shadowed.',
          }
        ]
      },
      {
        id: 'mod-j2',
        title: 'Module 2: Java Collections Framework & Generics',
        duration: '8h 30m',
        lessons: [
          {
            id: 'les-j201',
            title: '2.1 List, Set, Map Interfaces & Internal Working of HashMap',
            duration: '34:20',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            description: 'Understand buckets, hashCode(), equals() contracts, and Treeify threshold in modern Java HashMap.',
            notes: 'In Java 8+, HashMap bins convert from linked nodes to red-black trees when threshold > 8.',
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-j1',
        userName: 'Rohan Sharma',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Got placed at Infosys as Java Specialist Programmer! Best course for placement preparation.',
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Full Stack Web Development with React & Node',
    slug: 'web-development',
    instructor: {
      name: 'Vikramaditya Singhania',
      title: 'Full Stack Tech Lead & Open Source Contributor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 4.95,
    },
    rating: 4.9,
    studentsCount: 5200,
    duration: '54 Hours',
    difficulty: 'Intermediate',
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=80',
    description: 'Build modern responsive full-stack web applications using HTML5, CSS3, Tailwind CSS, TypeScript, React 19, Express.js, and MongoDB.',
    overview: 'Transform into a job-ready full stack web developer. Learn modern UI design, state management, REST API architecture, authentication, and deployment on modern cloud platforms.',
    learningObjectives: [
      'Master semantic HTML5, modern CSS3 layout (Flexbox & CSS Grid), and Tailwind CSS',
      'Modern JavaScript ES6+ (Async/Await, Promises, Destructuring, Closures)',
      'React architecture: Components, Hooks, Context, State Management',
      'Backend REST API development with Express.js and Node',
      'Database integration with MongoDB and PostgreSQL',
      'Deploy production apps on Cloud Run and Vercel'
    ],
    prerequisites: ['Basic computer proficiency'],
    totalLessons: 32,
    modules: [
      {
        id: 'mod-w1',
        title: 'Module 1: Modern Frontend & Tailwind CSS',
        duration: '7h 10m',
        lessons: [
          {
            id: 'les-w101',
            title: '1.1 Modern Responsive Design with Flexbox, Grid & Tailwind CSS',
            duration: '28:10',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            description: 'Create pixel-perfect, mobile-first responsive layouts with utility-first Tailwind classes.',
            notes: 'Always design mobile-first using min-width breakpoints in Tailwind.',
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-w1',
        userName: 'Pooja Hegde',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'The portfolio project got me 3 internship interview calls directly through the EduPath portal!',
      }
    ]
  },
  {
    id: 'course-4',
    title: 'Data Structures & Algorithms in Depth',
    slug: 'data-structures-algorithms',
    instructor: {
      name: 'Dr. Siddharth Sen',
      title: 'ACM ICPC Finalist & Ex-FAANG Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      rating: 5.0,
    },
    rating: 4.95,
    studentsCount: 6100,
    duration: '60 Hours',
    difficulty: 'Advanced',
    category: 'Programming',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    description: 'Crush technical coding interviews. Master Big-O notation, Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and Backtracking.',
    overview: 'The definitive DSA preparation course for college placement drives. Covers 250+ standard interview problems asked in FAANG, TCS Digital, Infosys Power Programmer, and top product companies.',
    learningObjectives: [
      'Calculate time and space complexity with asymptotic analysis',
      'Linear data structures: Arrays, Two-Pointer, Sliding Window, Linked Lists, Stacks, Queues',
      'Non-linear data structures: Binary Trees, BSTs, Heaps, and Graphs',
      'Advanced algorithm paradigms: Greedy, Divide and Conquer, Dynamic Programming',
      'Graph algorithms: BFS, DFS, Dijkstra, Bellman-Ford, Kruskal, Prim',
      'Systematic problem-solving framework for timed coding assessments'
    ],
    prerequisites: ['Proficiency in at least one language (C++, Java, or Python)'],
    totalLessons: 36,
    modules: [
      {
        id: 'mod-d1',
        title: 'Module 1: Algorithmic Complexity & Arrays Patterns',
        duration: '8h 00m',
        lessons: [
          {
            id: 'les-d101',
            title: '1.1 Time & Space Complexity (Big-O, Omega, Theta)',
            duration: '31:20',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: 'Learn how to analyze nested loops, recursion trees, and amortized complexity.',
            notes: 'Binary search runs in O(log N) time because it halves the search space each iteration.',
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-d1',
        userName: 'Naveen Reddy',
        userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'Cracked the 12 LPA package coding assessment thanks to Dr. Siddharth’s DP breakdowns!',
      }
    ]
  },
  {
    id: 'course-5',
    title: 'Machine Learning & Predictive Modeling',
    slug: 'machine-learning',
    instructor: {
      name: 'Dr. Meera Nambiar',
      title: 'Principal Data Scientist & IEEE Fellow',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      rating: 4.85,
    },
    rating: 4.8,
    studentsCount: 2900,
    duration: '45 Hours',
    difficulty: 'Intermediate',
    category: 'Data Science',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80',
    description: 'Hands-on Machine Learning: Supervised learning, Unsupervised clustering, Feature engineering, Scikit-Learn, and model deployment pipelines.',
    overview: 'Learn the mathematics and practical application of Machine Learning algorithms. Train models to predict trends, classify text, detect fraud, and build end-to-end data products.',
    learningObjectives: [
      'Data preprocessing, feature scaling, one-hot encoding, and imputation',
      'Linear Regression, Logistic Regression, Decision Trees, and Random Forests',
      'Support Vector Machines (SVM) and Gradient Boosting (XGBoost, LightGBM)',
      'Unsupervised Learning: K-Means, Hierarchical Clustering, and PCA',
      'Model evaluation metrics: Precision, Recall, F1-Score, ROC-AUC curve',
      'Deploying ML models as REST API endpoints'
    ],
    prerequisites: ['Python basics and fundamental linear algebra / calculus concepts'],
    totalLessons: 25,
    modules: [
      {
        id: 'mod-m1',
        title: 'Module 1: Data Exploration & Supervised Algorithms',
        duration: '7h 30m',
        lessons: [
          {
            id: 'les-m101',
            title: '1.1 Feature Engineering & Exploratory Data Analysis with Pandas & Seaborn',
            duration: '26:40',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            description: 'Master data cleaning, outlier detection, distribution plotting, and correlation matrices.',
            notes: 'Never fit data scalers on test data to avoid data leakage.',
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-m1',
        userName: 'Kavita Joshi',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Secured an ML Intern role at Deloitte after completing the predictive churn project.',
      }
    ]
  },
  {
    id: 'course-6',
    title: 'Database Management Systems & SQL',
    slug: 'dbms-sql',
    instructor: {
      name: 'Prof. Harish Chandra',
      title: 'Database Architect & Author',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      rating: 4.88,
    },
    rating: 4.85,
    studentsCount: 3800,
    duration: '38 Hours',
    difficulty: 'Beginner',
    category: 'Database',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    description: 'Relational Database concepts, ER Modeling, Normalization (1NF to BCNF), Complex SQL Joins, Indexing, Transactions (ACID), and Query Optimization.',
    overview: 'Core DBMS subject mastery essential for university exams, GATE, and campus technical placement interviews. Master relational theory and real-world SQL performance tuning.',
    learningObjectives: [
      'Entity-Relationship (ER) modeling and conversion to relational schemas',
      'Write advanced SQL queries with Window Functions, CTEs, Subqueries, and Grouping',
      'Understand Database Normalization: 1NF, 2NF, 3NF, BCNF, and dependency preservation',
      'Transaction processing, ACID properties, Concurrency Control, and Serializability',
      'B-Trees, B+ Trees, and Query Optimization with EXPLAIN',
      'NoSQL introduction: Document stores vs Key-Value vs Relational'
    ],
    prerequisites: ['No prior database experience required'],
    totalLessons: 22,
    modules: [
      {
        id: 'mod-db1',
        title: 'Module 1: Relational Model & SQL Mastery',
        duration: '6h 45m',
        lessons: [
          {
            id: 'les-db101',
            title: '1.1 Relational Algebra & SQL DDL/DML Fundamentals',
            duration: '24:50',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            description: 'Learn tables, primary keys, foreign keys, constraints, and relational algebra projections.',
            notes: 'Foreign key constraints guarantee referential integrity across relational schemas.',
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-db1',
        userName: 'Ritu Sen',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 weeks ago',
        comment: 'The normalization cheat sheets and SQL interview quiz helped me ace Wipro technical interview!',
      }
    ]
  },
  {
    id: 'course-7',
    title: 'Computer Networks & Network Security',
    slug: 'computer-networks',
    instructor: {
      name: 'Col. K. R. Ramanathan',
      title: 'Cybersecurity Consultant & Former Defence Adviser',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      rating: 4.82,
    },
    rating: 4.75,
    studentsCount: 2600,
    duration: '36 Hours',
    difficulty: 'Intermediate',
    category: 'Networking',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    description: 'Deep dive into OSI & TCP/IP reference models, Subnetting, Routing protocols, Transport layer sockets, TLS/SSL encryption, and modern protocols (HTTP/3, WebSockets).',
    overview: 'A fundamental CSE subject that separates top engineers from average candidates. Learn packet flows, handshake mechanisms, socket programming, and cryptographic principles.',
    learningObjectives: [
      'OSI 7-Layer and TCP/IP 4-Layer architectural models in depth',
      'IP Addressing, IPv4 vs IPv6, Subnetting, VLSM, and CIDR notation',
      'Routing algorithms: Distance Vector (RIP), Link State (OSPF), and BGP',
      'TCP 3-Way Handshake, Flow Control (Sliding Window), and Congestion Control',
      'Application Layer protocols: DNS, HTTP/1.1, HTTP/2, HTTP/3, SMTP, FTP',
      'Network Security: Public Key Cryptography, Symmetric Ciphers, and SSL/TLS'
    ],
    prerequisites: ['Basic operating systems and computer hardware knowledge'],
    totalLessons: 20,
    modules: [
      {
        id: 'mod-cn1',
        title: 'Module 1: Network Architectures & Layering',
        duration: '5h 30m',
        lessons: [
          {
            id: 'les-cn101',
            title: '1.1 OSI vs TCP/IP Models & Packet Encapsulation Lifecycle',
            duration: '22:30',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            description: 'Trace how data travels from application layer headers down to physical layer electromagnetic signals.',
            notes: 'Remember the acronym: Please Do Not Throw Sausage Pizza Away (Physical, Data Link, Network, Transport, Session, Presentation, Application).',
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-cn1',
        userName: 'Deepak Mohan',
        userAvatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 month ago',
        comment: 'Crystal clear explanation of TCP 3-way handshake and subnetting calculations!',
      }
    ]
  },
  {
    id: 'course-8',
    title: 'Artificial Intelligence & Generative Models',
    slug: 'artificial-intelligence',
    instructor: {
      name: 'Dr. Alok Nath Mukherjee',
      title: 'Lead AI Researcher & Author',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
      rating: 4.96,
    },
    rating: 4.92,
    studentsCount: 4700,
    duration: '46 Hours',
    difficulty: 'Advanced',
    category: 'AI & ML',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    description: 'From Search Algorithms (A*, Minimax) and Knowledge Representation to Modern Transformer Architectures, Prompt Engineering, and RAG systems.',
    overview: 'Prepare for the future of computer science. Learn classical AI algorithms alongside cutting-edge Large Language Models (LLMs), attention mechanisms, and building intelligent agents.',
    learningObjectives: [
      'Heuristic search algorithms: A*, IDA*, Greedy Best-First Search, and Minimax with Alpha-Beta Pruning',
      'Knowledge representation, first-order logic, and inference engines',
      'Neural Networks, Backpropagation, and Gradient Descent optimization',
      'Transformer architecture, self-attention mechanics, and embeddings',
      'Prompt engineering, fine-tuning, and Retrieval-Augmented Generation (RAG)',
      'Building production AI applications and ethics in AI systems'
    ],
    prerequisites: ['Python proficiency and foundational probability/linear algebra'],
    totalLessons: 26,
    modules: [
      {
        id: 'mod-ai1',
        title: 'Module 1: Classical AI & Search Strategies',
        duration: '6h 15m',
        lessons: [
          {
            id: 'les-ai101',
            title: '1.1 Intelligent Agents, State Space Search & A* Algorithm',
            duration: '27:50',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            description: 'Evaluate admissible and consistent heuristics for optimal pathfinding in high-dimensional state spaces.',
            notes: 'A* is guaranteed to find an optimal solution if the heuristic h(n) is admissible (never overestimates the true cost).',
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-ai1',
        userName: 'Tanvi Agarwal',
        userAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '4 days ago',
        comment: 'The explanation of Transformer attention matrices is the best I have ever seen on any EdTech platform.',
      }
    ]
  }
];
