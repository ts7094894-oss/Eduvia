import { Quiz } from '../types';

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-python-1',
    courseId: 'course-1',
    courseTitle: 'Python Programming Masterclass',
    title: 'Python Core & Data Structures Assessment',
    timeLimitMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'pq-1',
        question: 'What is the correct file extension for Python source files?',
        options: ['.java', '.py', '.html', '.cpp'],
        correctAnswer: 1,
        explanation: 'Python source code files traditionally use the .py extension, whereas compiled bytecode uses .pyc.'
      },
      {
        id: 'pq-2',
        question: 'Which of the following data types is IMMUTABLE in Python?',
        options: ['List', 'Dictionary', 'Set', 'Tuple'],
        correctAnswer: 3,
        explanation: 'Tuples and strings are immutable in Python, meaning their elements cannot be changed after creation.'
      },
      {
        id: 'pq-3',
        question: 'What will be the output of print(2 ** 3 ** 2) in Python?',
        options: ['64', '512', '128', '256'],
        correctAnswer: 1,
        explanation: 'Exponentiation operator (**) in Python is right-associative, so 3 ** 2 = 9, and then 2 ** 9 = 512.'
      },
      {
        id: 'pq-4',
        question: 'Which keyword is used to define a function in Python?',
        options: ['func', 'define', 'def', 'function'],
        correctAnswer: 2,
        explanation: 'Python uses the "def" keyword to define user functions.'
      },
      {
        id: 'pq-5',
        question: 'What does the list comprehension [x for x in range(5) if x % 2 != 0] produce?',
        options: ['[0, 2, 4]', '[1, 3]', '[1, 3, 5]', '[2, 4]'],
        correctAnswer: 1,
        explanation: 'range(5) yields 0, 1, 2, 3, 4. Filtering for odd numbers (x % 2 != 0) yields [1, 3].'
      },
      {
        id: 'pq-6',
        question: 'What is the time complexity of looking up a key in a Python dictionary on average?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N^2)'],
        correctAnswer: 2,
        explanation: 'Python dictionaries are implemented as hash tables, providing average O(1) constant time lookup.'
      }
    ]
  },
  {
    id: 'quiz-java-1',
    courseId: 'course-2',
    courseTitle: 'Java Programming & Enterprise Backend',
    title: 'Core Java & OOP Certification Quiz',
    timeLimitMinutes: 20,
    passingScore: 70,
    questions: [
      {
        id: 'jq-1',
        question: 'Which of the following is NOT a Java primitive data type?',
        options: ['int', 'boolean', 'String', 'char'],
        correctAnswer: 2,
        explanation: 'String is an object/class in java.lang package, not a primitive data type.'
      },
      {
        id: 'jq-2',
        question: 'Which memory area in JVM stores object instances allocated via "new"?',
        options: ['Stack', 'Heap', 'Method Area', 'Program Counter Register'],
        correctAnswer: 1,
        explanation: 'All dynamic object instances and arrays are allocated in the Heap memory in JVM.'
      },
      {
        id: 'jq-3',
        question: 'Can static methods in Java be overridden in a subclass?',
        options: [
          'Yes, using @Override annotation',
          'No, static methods are hidden (method shadowing), not overridden',
          'Only if the parent method is public',
          'Only if both are declared in the same package'
        ],
        correctAnswer: 1,
        explanation: 'Static methods belong to the class, not instance. In a subclass, declaring a same static method shadows rather than overrides it.'
      },
      {
        id: 'jq-4',
        question: 'Which collection class does NOT permit duplicate elements and preserves insertion order?',
        options: ['HashSet', 'TreeSet', 'LinkedHashSet', 'ArrayList'],
        correctAnswer: 2,
        explanation: 'LinkedHashSet prevents duplicate elements and maintains a doubly-linked list across all entries for insertion order.'
      },
      {
        id: 'jq-5',
        question: 'What is the default initial capacity of a Java HashMap in Java 8+?',
        options: ['8', '16', '32', '64'],
        correctAnswer: 1,
        explanation: 'The default initial capacity of HashMap is 16, with a default load factor of 0.75.'
      }
    ]
  },
  {
    id: 'quiz-dsa-1',
    courseId: 'course-4',
    courseTitle: 'Data Structures & Algorithms in Depth',
    title: 'DSA Placement Readiness Quiz',
    timeLimitMinutes: 20,
    passingScore: 75,
    questions: [
      {
        id: 'dq-1',
        question: 'What is the worst-case time complexity of QuickSort?',
        options: ['O(N log N)', 'O(N)', 'O(N^2)', 'O(log N)'],
        correctAnswer: 2,
        explanation: 'When the chosen pivot is always the extreme (smallest or largest) element in an already sorted array, QuickSort degrades to O(N^2).'
      },
      {
        id: 'dq-2',
        question: 'Which data structure is fundamentally used for Breadth-First Search (BFS) graph traversal?',
        options: ['Stack', 'Queue', 'Heap', 'Trie'],
        correctAnswer: 1,
        explanation: 'BFS uses a FIFO Queue to visit nodes level by level.'
      },
      {
        id: 'dq-3',
        question: 'What is the height of a balanced Binary Search Tree (AVL / Red-Black) with N nodes?',
        options: ['O(N)', 'O(log N)', 'O(N^2)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Balanced BSTs maintain a height of O(log N), guaranteeing O(log N) search, insertion, and deletion.'
      },
      {
        id: 'dq-4',
        question: 'Which algorithm finds the shortest path in a weighted graph with NON-NEGATIVE edge weights?',
        options: ['Kruskal Algorithm', 'Dijkstra Algorithm', 'Floyd-Warshall Algorithm', 'Prim Algorithm'],
        correctAnswer: 1,
        explanation: 'Dijkstra’s algorithm uses a priority queue (min-heap) to calculate single-source shortest paths in non-negative weighted graphs in O((V + E) log V).'
      }
    ]
  },
  {
    id: 'quiz-dbms-1',
    courseId: 'course-6',
    courseTitle: 'Database Management Systems & SQL',
    title: 'DBMS & SQL Placement Screening Test',
    timeLimitMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'dbq-1',
        question: 'What does the "I" stand for in ACID properties of database transactions?',
        options: ['Integrity', 'Isolation', 'Inheritance', 'Indexing'],
        correctAnswer: 1,
        explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability.'
      },
      {
        id: 'dbq-2',
        question: 'Which normal form eliminates transitive functional dependencies (X → Y and Y → Z)?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: 2,
        explanation: 'Third Normal Form (3NF) requires a relation to be in 2NF and have no transitive functional dependencies on the primary key.'
      },
      {
        id: 'dbq-3',
        question: 'Which SQL clause is used to filter records AFTER an aggregation with GROUP BY?',
        options: ['WHERE', 'HAVING', 'ORDER BY', 'FILTER'],
        correctAnswer: 1,
        explanation: 'WHERE filters rows before grouping; HAVING filters aggregated groups after GROUP BY.'
      }
    ]
  }
];
