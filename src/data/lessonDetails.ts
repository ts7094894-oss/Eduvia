import { VideoChapter, TranscriptLine, AILessonScript, LessonQuizQuestion, LessonResource } from '../types';

export interface EnrichedLessonMeta {
  videoTitle: string;
  durationSeconds: number;
  backupVideoUrl: string;
  learningObjectives: string[];
  chapters: VideoChapter[];
  transcript: TranscriptLine[];
  script: AILessonScript;
  codeDemo: {
    language: string;
    code: string;
    output?: string;
    explanation?: string;
  };
  miniQuiz: LessonQuizQuestion[];
  resources: LessonResource[];
}

export const DETAILED_LESSONS: Record<string, EnrichedLessonMeta> = {
  // Course 1 - Module 1: Python Basics
  'les-101': {
    videoTitle: 'Introduction to Python & Setting up VS Code — Beginner Lesson',
    durationSeconds: 1125, // 18m 45s
    backupVideoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    learningObjectives: [
      'Understand Python\'s philosophy, history, and why it leads AI & data engineering',
      'Install Python 3.12 and configure the official extension in Visual Studio Code',
      'Execute your first Python script through the integrated terminal and REPL',
      'Master indentation standards and PEP 8 best practices'
    ],
    chapters: [
      { id: 'ch-1', title: '00:00 - Introduction & Course Roadmap', timestamp: 0, formattedTime: '00:00' },
      { id: 'ch-2', title: '02:15 - Why Python in 2026? Industry Landscape', timestamp: 135, formattedTime: '02:15' },
      { id: 'ch-3', title: '05:40 - Installing Python 3.12 & Environment Path', timestamp: 340, formattedTime: '05:40' },
      { id: 'ch-4', title: '09:20 - VS Code Setup & Linters (Pylance/Black)', timestamp: 560, formattedTime: '09:20' },
      { id: 'ch-5', title: '13:50 - Writing & Running Your First Program', timestamp: 830, formattedTime: '13:50' },
      { id: 'ch-6', title: '16:30 - Common Pitfalls & Lesson Recap', timestamp: 990, formattedTime: '16:30' }
    ],
    transcript: [
      { id: 'tr-1', start: 0, end: 15, speaker: 'Dr. Rajesh Kumar', text: 'Welcome to EduPath\'s Python Programming Masterclass. I\'m Dr. Rajesh Kumar, and in this first lesson, we are laying the bedrock for your software engineering journey.' },
      { id: 'tr-2', start: 16, end: 45, speaker: 'Dr. Rajesh Kumar', text: 'Python is currently the most popular programming language in the world, powering machine learning at Google, cloud microservices, and campus placement technical assessments.' },
      { id: 'tr-3', start: 46, end: 95, speaker: 'Dr. Rajesh Kumar', text: 'Unlike compiled languages such as C++ or Java where code must pass through an ahead-of-time compiler, Python uses an interpreter and compiles to intermediate bytecode (.pyc).' },
      { id: 'tr-4', start: 96, end: 140, speaker: 'Dr. Rajesh Kumar', text: 'Let us open Visual Studio Code. We will install the official Python extension from Microsoft, which provides syntax highlighting, auto-completion via Pylance, and virtual environment support.' },
      { id: 'tr-5', start: 141, end: 210, speaker: 'Dr. Rajesh Kumar', text: 'In your terminal, run `python3 --version` to verify that Python 3.12 or above is available in your PATH environment variable.' },
      { id: 'tr-6', start: 211, end: 290, speaker: 'Dr. Rajesh Kumar', text: 'Now create a file called `main.py`. Notice Python uses clean significant whitespace instead of curly brackets. Let\'s write `print("Hello, EduPath Engineer!")` and execute it.' },
      { id: 'tr-7', start: 291, end: 380, speaker: 'Dr. Rajesh Kumar', text: 'A common beginner mistake is mixing tabs and spaces. PEP 8 strongly dictates exactly 4 spaces per indentation level. VS Code can convert tabs to spaces automatically.' },
      { id: 'tr-8', start: 381, end: 450, speaker: 'Dr. Rajesh Kumar', text: 'To summarize: Python is interpreted, dynamically typed, and emphasizes developer velocity. In the next lesson, we dive into variables and memory models!' }
    ],
    script: {
      topic: 'Introduction to Python & Environment Setup',
      targetAudience: 'Undergraduate engineering students and aspiring software developers',
      introduction: 'Python was created by Guido van Rossum in 1991. It emphasizes readability and high productivity. Today, it is essential for web development, cloud automation, data science, and placement interviews.',
      conceptExplanation: 'Python source code (.py) is compiled into platform-independent bytecode (.pyc) and subsequently executed by the Python Virtual Machine (PVM). It is an interpreted, dynamically-typed language with automatic memory management via reference counting and cyclic garbage collection.',
      simpleExample: 'Printing a message in C takes 6 lines of boilerplate with includes and main(). In Python, it is a single readable line: print("Hello World").',
      codeDemonstration: {
        language: 'python',
        code: `# Lesson 1.1: Environment Verification & Basic Output\nimport sys\nimport platform\n\nprint("=== Welcome to EduPath Python Studio ===")\nprint(f"Python Version: {platform.python_version()}")\nprint(f"System Architecture: {platform.architecture()[0]}")\n\n# Your first functional statement\nstudent_greeting = "Ready to become a certified Python Engineer!"\nprint(student_greeting)`,
        output: '=== Welcome to EduPath Python Studio ===\nPython Version: 3.12.2\nSystem Architecture: 64bit\nReady to become a certified Python Engineer!',
        explanation: 'We import standard system modules to inspect the runtime environment and demonstrate clean f-string interpolation.'
      },
      commonMistakes: [
        'Mixing Tab characters and Space characters in indentation, leading to TabError.',
        'Not checking the default system Python version vs the virtual environment version.',
        'Leaving unclosed quotation marks or parentheses in print calls.'
      ],
      practiceExample: 'Create a script that prints a personalized 3-line card showing your name, college, and your top 3 programming goals for this semester.',
      quickRecap: 'Python is readable, powerful, and interpreted. Setting up VS Code properly with 4-space indentation and Pylance will save dozens of debugging hours.'
    },
    codeDemo: {
      language: 'python',
      code: `import platform\n\n# Welcome to Python!\nname = "EduPath Student"\nprint(f"Hello {name}, running on Python {platform.python_version()}!")\nprint("Next up: Variables and Memory Layout.")`,
      output: 'Hello EduPath Student, running on Python 3.12.2!\nNext up: Variables and Memory Layout.',
      explanation: 'Verifies your interpreter and demonstrates Python 3 formatted string literals (f-strings).'
    },
    miniQuiz: [
      {
        question: 'Who created Python, and in what year was it first released?',
        options: ['James Gosling in 1995', 'Guido van Rossum in 1991', 'Bjarne Stroustrup in 1985', 'Dennis Ritchie in 1972'],
        correctIndex: 1,
        explanation: 'Guido van Rossum developed Python in the late 1980s at CWI and released it publicly in February 1991.'
      },
      {
        question: 'What is the standard PEP 8 guideline for indentation in Python?',
        options: ['2 spaces', '8 spaces', '4 spaces', '1 tab key'],
        correctIndex: 2,
        explanation: 'PEP 8 specifies exactly 4 spaces per indentation level and recommends avoiding tab characters.'
      }
    ],
    resources: [
      { id: 'res-1', title: 'Python_3_12_Quickstart_Cheatsheet.pdf', size: '2.1 MB', type: 'pdf' },
      { id: 'res-2', title: 'vscode_python_settings.json', size: '14 KB', type: 'code' }
    ]
  },

  'les-102': {
    videoTitle: 'Python Variables and Data Types — Beginner Lesson',
    durationSeconds: 1330, // 22m 10s
    backupVideoUrl: 'https://www.youtube.com/watch?v=nLRL_NcnK-4',
    learningObjectives: [
      'Understand dynamic typing and Python\'s object model (Everything is an Object)',
      'Master primitive types: int, float, str, bool, and NoneType',
      'Explore mutability vs immutability in Python memory heap',
      'Learn explicit type casting with int(), float(), str(), bool()'
    ],
    chapters: [
      { id: 'ch-1', title: '00:00 - Introduction to Variables', timestamp: 0, formattedTime: '00:00' },
      { id: 'ch-2', title: '01:30 - What is a Variable in Python?', timestamp: 90, formattedTime: '01:30' },
      { id: 'ch-3', title: '04:10 - Fundamental Data Types (int, float, str, bool)', timestamp: 250, formattedTime: '04:10' },
      { id: 'ch-4', title: '08:20 - Dynamic Typing & id() Memory Inspection', timestamp: 500, formattedTime: '08:20' },
      { id: 'ch-5', title: '12:30 - Live Code Demonstrations & Type Casting', timestamp: 750, formattedTime: '12:30' },
      { id: 'ch-6', title: '16:00 - Common Mistakes in Campus Coding Rounds', timestamp: 960, formattedTime: '16:00' },
      { id: 'ch-7', title: '18:00 - Recap & Key Takeaways', timestamp: 1080, formattedTime: '18:00' }
    ],
    transcript: [
      { id: 'tr-1', start: 0, end: 20, speaker: 'Dr. Rajesh Kumar', text: 'Welcome back. In this lesson, we will uncover how Python handles variables and data types under the hood.' },
      { id: 'tr-2', start: 21, end: 70, speaker: 'Dr. Rajesh Kumar', text: 'In C or Java, a variable is a memory box with a fixed type like `int x = 10`. But in Python, variables are simply references or name tags bound to objects residing in heap memory.' },
      { id: 'tr-3', start: 71, end: 135, speaker: 'Dr. Rajesh Kumar', text: 'When you write `age = 21`, Python instantiates an integer object with value 21, and the identifier `age` points to that memory address. You can verify this using the `id()` function.' },
      { id: 'tr-4', start: 136, end: 220, speaker: 'Dr. Rajesh Kumar', text: 'Python has four primary scalar data types: integers for whole numbers, floats for floating-point decimals, strings for text literals enclosed in single or double quotes, and booleans for True or False.' },
      { id: 'tr-5', start: 221, end: 320, speaker: 'Dr. Rajesh Kumar', text: 'Notice that booleans in Python are capitalized: `True` and `False`. Also, Python booleans are actually a subclass of integers where True is 1 and False is 0.' },
      { id: 'tr-6', start: 321, end: 410, speaker: 'Dr. Rajesh Kumar', text: 'Let us see type casting: if user input returns `"45"`, that is a string. If you try to add 5, Python raises a TypeError! You must explicitly cast it using `int("45")`.' },
      { id: 'tr-7', start: 411, end: 510, speaker: 'Dr. Rajesh Kumar', text: 'A classic technical interview question: Are strings in Python mutable? The answer is NO. Strings are immutable; modifying a string creates a new string object in memory.' },
      { id: 'tr-8', start: 511, end: 600, speaker: 'Dr. Rajesh Kumar', text: 'Remember to use descriptive variable names in snake_case according to PEP 8 standards, and test your code with different data types!' }
    ],
    script: {
      topic: 'Python Variables and Data Types',
      targetAudience: 'College CSE students preparing for placements and software engineering',
      introduction: 'Welcome! Variables are the fundamental containers of information in any programming language. In Python, variables are dynamic references to objects stored in memory.',
      conceptExplanation: 'Python uses dynamic typing and strong typing. Dynamic typing means you do not declare types explicitly (no "int x"). Strong typing means Python will not implicitly convert incompatible types (e.g. "5" + 5 raises TypeError instead of coercing to "55").',
      simpleExample: 'Think of a variable as a sticky note with a name written on it. You can stick that label onto an apple (integer), then peel it off and stick it onto an orange (string). The object changed, but the label remained.',
      codeDemonstration: {
        language: 'python',
        code: `# Python Variables & Dynamic Typing Demonstration\n# 1. Primitives\nstudent_name = "Sai Krishna"      # String (str)\nroll_number = 1042                # Integer (int)\ncgpa = 8.85                       # Float (float)\nis_eligible = True                # Boolean (bool)\n\n# 2. Inspecting Types and Identity\nprint(f"Name: {student_name} | Type: {type(student_name).__name__}")\nprint(f"CGPA: {cgpa} | Type: {type(cgpa).__name__}")\nprint(f"Memory ID of roll_number: {id(roll_number)}")\n\n# 3. Type Conversion\nage_str = "21"\nage_int = int(age_str)            # Explicit casting\nprint(f"Age in 5 years: {age_int + 5}")`,
        output: 'Name: Sai Krishna | Type: str\nCGPA: 8.85 | Type: float\nMemory ID of roll_number: 140239482910\nAge in 5 years: 26',
        explanation: 'Shows variable assignment, type inspection with type(), memory ID tracking with id(), and explicit type conversion with int().'
      },
      commonMistakes: [
        'Attempting to concatenate a string and a number without casting: print("Age: " + age) instead of f"Age: {age}".',
        'Writing lowercase true or false instead of capitalized True and False.',
        'Using reserved Python keywords as variable names (e.g., class, def, return, for).',
        'Assuming strings can be modified in place: name[0] = "A" will raise a TypeError.'
      ],
      practiceExample: 'Write a program that takes a student\'s marks in 5 subjects, calculates the total and percentage, and prints whether they passed (percentage >= 40) using boolean variables.',
      quickRecap: 'Variables in Python are pointers to objects. Python is dynamically and strongly typed. Always use snake_case for variable names and f-strings for formatted output.'
    },
    codeDemo: {
      language: 'python',
      code: `# Live Variable Demonstration\nx = 100\nprint("Initial x:", x, "Type:", type(x))\n\n# Re-binding x to a float\nx = 99.95\nprint("Reassigned x:", x, "Type:", type(x))\n\n# Re-binding x to a string\nx = "EduPath Masterclass"\nprint("String x:", x, "Length:", len(x))`,
      output: 'Initial x: 100 Type: <class \'int\'>\nReassigned x: 99.95 Type: <class \'float\'>\nString x: EduPath Masterclass Length: 19',
      explanation: 'Demonstrates Python\'s dynamic rebinding where a variable identifier can point to different data types throughout its lifecycle.'
    },
    miniQuiz: [
      {
        question: 'What is the output of: type("123") == int?',
        options: ['True', 'False', 'TypeError', 'None'],
        correctIndex: 1,
        explanation: '"123" is enclosed in quotes, so its type is str, not int. Therefore the equality evaluates to False.'
      },
      {
        question: 'Which of the following is an IMMUTABLE data type in Python?',
        options: ['List', 'Dictionary', 'String', 'Set'],
        correctIndex: 2,
        explanation: 'In Python, strings (str), integers (int), floats (float), and tuples are immutable. Lists and dictionaries are mutable.'
      }
    ],
    resources: [
      { id: 'res-3', title: 'Python_Variables_Memory_Model.pdf', size: '1.8 MB', type: 'pdf' },
      { id: 'res-4', title: 'variables_and_types_practice.py', size: '8 KB', type: 'code' }
    ]
  },

  'les-103': {
    videoTitle: 'Operators in Python: Arithmetic, Comparison & Logical — Beginner Lesson',
    durationSeconds: 1240, // 20m 40s
    backupVideoUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
    learningObjectives: [
      'Master arithmetic operators including floor division (//) and exponentiation (**)',
      'Understand comparison operators and chaining in Python (e.g. 10 < x < 20)',
      'Learn logical operators: and, or, not with short-circuit evaluation',
      'Differentiate identity operators (is, is not) from equality operators (==, !=)'
    ],
    chapters: [
      { id: 'ch-1', title: '00:00 - Overview of Python Operators', timestamp: 0, formattedTime: '00:00' },
      { id: 'ch-2', title: '02:00 - Arithmetic Operators & Floor Division vs Float Division', timestamp: 120, formattedTime: '02:00' },
      { id: 'ch-3', title: '05:30 - Comparison Operators & Python Chained Comparisons', timestamp: 330, formattedTime: '05:30' },
      { id: 'ch-4', title: '09:00 - Logical Operators & Short-circuiting Mechanics', timestamp: 540, formattedTime: '09:00' },
      { id: 'ch-5', title: '13:15 - Identity (is) vs Equality (==) Interview Trap', timestamp: 795, formattedTime: '13:15' },
      { id: 'ch-6', title: '17:00 - Summary & Placement Test Questions', timestamp: 1020, formattedTime: '17:00' }
    ],
    transcript: [
      { id: 'tr-1', start: 0, end: 20, speaker: 'Dr. Rajesh Kumar', text: 'Operators are special symbols that carry out computation on operands. Python offers an expressive set of arithmetic, relational, and boolean operators.' },
      { id: 'tr-2', start: 21, end: 65, speaker: 'Dr. Rajesh Kumar', text: 'Pay special attention to division: `/` always returns a float in Python 3. For integer division, use `//`. And for exponents like 2 to the power 10, use `2 ** 10` instead of the caret symbol.' },
      { id: 'tr-3', start: 66, end: 120, speaker: 'Dr. Rajesh Kumar', text: 'In Python, comparison operators can be chained! You can write `18 <= age <= 25` cleanly, exactly like mathematical notation.' },
      { id: 'tr-4', start: 121, end: 180, speaker: 'Dr. Rajesh Kumar', text: 'Now for a major interview question: what is the difference between `==` and `is`? `==` checks value equality, whereas `is` checks reference or identity equality.' }
    ],
    script: {
      topic: 'Operators in Python',
      targetAudience: 'College students preparing for technical screening tests',
      introduction: 'Operators allow us to transform, evaluate, and compare data. Understanding operator precedence and nuances like integer division is crucial for bug-free algorithms.',
      conceptExplanation: 'Python provides Arithmetic (+, -, *, /, //, %, **), Comparison (==, !=, >, <, >=, <=), Logical (and, or, not), Bitwise (&, |, ^, ~, <<, >>), and Identity (is, is not) operators.',
      simpleExample: 'Dividing 7 by 2 with / gives 3.5. Dividing 7 by 2 with // gives 3. The remainder with % gives 1.',
      codeDemonstration: {
        language: 'python',
        code: `# Demonstration of Python Operators\na, b = 15, 4\n\nprint("Float Division (a / b):", a / b)      # 3.75\nprint("Floor Division (a // b):", a // b)    # 3\nprint("Modulo Remainder (a % b):", a % b)     # 3\nprint("Power (a ** 2):", a ** 2)             # 225\n\n# Chained comparison\nscore = 85\nprint("Grade A Range:", 80 <= score <= 90)   # True\n\n# == vs is\nlist1 = [1, 2, 3]\nlist2 = [1, 2, 3]\nprint("Values Equal (list1 == list2):", list1 == list2) # True\nprint("Same Object (list1 is list2):", list1 is list2)   # False (different heap locations)`,
        output: 'Float Division (a / b): 3.75\nFloor Division (a // b): 3\nModulo Remainder (a % b): 3\nPower (a ** 2): 225\nGrade A Range: True\nValues Equal (list1 == list2): True\nSame Object (list1 is list2): False',
        explanation: 'Highlights the distinction between value comparison and object identity.'
      },
      commonMistakes: [
        'Using ^ for exponentiation (^ is bitwise XOR in Python, use ** for power).',
        'Confusing == (value equality) with is (memory address comparison).',
        'Ignoring operator precedence when combining and with or.'
      ],
      practiceExample: 'Write an expression to check if a year is a Leap Year using modulus (%) and logical operators (and, or).',
      quickRecap: 'Use // for floor division, ** for power, chain comparisons cleanly, and remember that is checks memory identity while == checks value.'
    },
    codeDemo: {
      language: 'python',
      code: `# Leap Year Logic with Operators\nyear = 2024\nis_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)\nprint(f"Is {year} a leap year? {is_leap}")`,
      output: 'Is 2024 a leap year? True',
      explanation: 'Applies boolean logic and modulo arithmetic to test standard calendar constraints.'
    },
    miniQuiz: [
      {
        question: 'What is the result of 11 // 3 in Python?',
        options: ['3.66', '3', '4', '2'],
        correctIndex: 1,
        explanation: 'Floor division // discards the fractional part and returns the largest integer less than or equal to the quotient (11 // 3 = 3).'
      }
    ],
    resources: [
      { id: 'res-5', title: 'Python_Operators_Precedence_Table.pdf', size: '1.2 MB', type: 'pdf' }
    ]
  },

  'les-104': {
    videoTitle: 'Input and Output: User Interaction & Formatting in Python — Beginner Lesson',
    durationSeconds: 1080, // 18m
    backupVideoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    learningObjectives: [
      'Capture console inputs using the input() built-in function',
      'Format output using f-strings with padding, alignment, and decimal precision',
      'Handle multiple space-separated inputs with split() and map()',
      'Use print parameters: sep and end for competitive programming formatting'
    ],
    chapters: [
      { id: 'ch-1', title: '00:00 - Console I/O Architecture', timestamp: 0, formattedTime: '00:00' },
      { id: 'ch-2', title: '03:10 - Using input() and Casting Return Values', timestamp: 190, formattedTime: '03:10' },
      { id: 'ch-3', title: '06:45 - Advanced f-strings Formatting', timestamp: 405, formattedTime: '06:45' },
      { id: 'ch-4', title: '11:20 - Fast I/O Patterns in Coding Contests', timestamp: 680, formattedTime: '11:20' },
      { id: 'ch-5', title: '15:00 - Review & Practice', timestamp: 900, formattedTime: '15:00' }
    ],
    transcript: [
      { id: 'tr-1', start: 0, end: 20, speaker: 'Dr. Rajesh Kumar', text: 'Software interacts with users through inputs and outputs. In Python, the `input()` function pauses execution and captures keyboard input as a string.' },
      { id: 'tr-2', start: 21, end: 60, speaker: 'Dr. Rajesh Kumar', text: 'Remember that `input()` ALWAYS returns a string. If you want numbers, wrap it in `int()` or `float()`. For multiple inputs on one line, use `input().split()`.' },
      { id: 'tr-3', start: 61, end: 120, speaker: 'Dr. Rajesh Kumar', text: 'For output, Python 3.6 introduced f-strings: `f"Result: {val:.2f}"`. You can format currency, decimal precision, and column widths with ease!' }
    ],
    script: {
      topic: 'Input and Output in Python',
      targetAudience: 'Students preparing for online coding tests and real-world scripting',
      introduction: 'Interactive applications rely on receiving user data and displaying clean, structured responses. Python makes this intuitive with input() and formatted print().',
      conceptExplanation: 'input() reads a line from sys.stdin, converts it to a string (stripping the trailing newline), and returns it. print() sends objects to sys.stdout separated by sep and ending with end.',
      simpleExample: 'name = input("Enter name: ") pauses the program until the user types their name and presses Enter.',
      codeDemonstration: {
        language: 'python',
        code: `# Comprehensive I/O and f-string demonstration\nitem = "EduPath Cloud Pro"\nprice = 1499.7523\nquantity = 2\n\n# 1. Formatting decimals and widths\nprint(f"Item: {item}")\nprint(f"Price: Rs. {price:.2f} (formatted to 2 decimal places)")\nprint(f"Total: Rs. {price * quantity:.2f}")\n\n# 2. Custom sep and end\nprint("2026", "09", "15", sep="-")  # 2026-09-15\nprint("Loading", end="...")\nprint("Complete!")`,
        output: 'Item: EduPath Cloud Pro\nPrice: Rs. 1499.75 (formatted to 2 decimal places)\nTotal: Rs. 2999.50\n2026-09-15\nLoading...Complete!',
        explanation: 'Demonstrates precision rounding in f-strings and controlling separator and end arguments.'
      },
      commonMistakes: [
        'Forgetting that input() always returns str, causing unintended string concatenation.',
        'Not stripping whitespace when reading files or user inputs.'
      ],
      practiceExample: 'Write a program that takes space-separated marks for 3 students and prints an aligned table with rank, name, and score.',
      quickRecap: 'Always cast input(), master f-string precision formatting (: .2f), and customize sep and end for competitive programming.'
    },
    codeDemo: {
      language: 'python',
      code: `# Multi-input reading pattern\ninput_data = "10 20 30 40 50"\nnumbers = list(map(int, input_data.split()))\nprint(f"Sum: {sum(numbers)} | Average: {sum(numbers) / len(numbers):.2f}")`,
      output: 'Sum: 150 | Average: 30.00',
      explanation: 'Standard technique for parsing space-separated numbers from coding test inputs.'
    },
    miniQuiz: [
      {
        question: 'What does input("Enter number: ") return if the user enters 42?',
        options: ['Integer 42', 'String "42"', 'Float 42.0', 'Tuple (42,)'],
        correctIndex: 1,
        explanation: 'input() invariably returns the captured input as a string type (str).'
      }
    ],
    resources: [
      { id: 'res-6', title: 'Python_String_Formatting_Guide.pdf', size: '1.4 MB', type: 'pdf' }
    ]
  },

  // Module 2 - Control Flow
  'les-201': {
    videoTitle: 'Control Flow: If-Else & Match-Case — Beginner Lesson',
    durationSeconds: 1710, // 28m 30s
    backupVideoUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
    learningObjectives: [
      'Construct conditional decision branching with if, elif, and else',
      'Understand truthy and falsy values in Python conditional expressions',
      'Write ternary conditional expressions: x if condition else y',
      'Utilize modern Python 3.10+ match-case structural pattern matching'
    ],
    chapters: [
      { id: 'ch-1', title: '00:00 - Introduction to Decision Branching', timestamp: 0, formattedTime: '00:00' },
      { id: 'ch-2', title: '03:40 - If-Elif-Else Multi-way Decisions', timestamp: 220, formattedTime: '03:40' },
      { id: 'ch-3', title: '08:15 - Truthy and Falsy Values in Python', timestamp: 495, formattedTime: '08:15' },
      { id: 'ch-4', title: '13:00 - Ternary Operator (One-line If-Else)', timestamp: 780, formattedTime: '13:00' },
      { id: 'ch-5', title: '18:20 - Python 3.10+ Structural Pattern Matching', timestamp: 1100, formattedTime: '18:20' },
      { id: 'ch-6', title: '24:00 - Common Logic Traps & Summary', timestamp: 1440, formattedTime: '24:00' }
    ],
    transcript: [
      { id: 'tr-1', start: 0, end: 25, speaker: 'Dr. Rajesh Kumar', text: 'Welcome to Module 2 on Control Flow. Programs must make intelligent decisions based on runtime states and user credentials.' },
      { id: 'tr-2', start: 26, end: 80, speaker: 'Dr. Rajesh Kumar', text: 'In Python, we use `if`, `elif`, and `else`. There are no switch statements in legacy Python, but starting with Python 3.10, we have structural pattern matching with `match-case`.' },
      { id: 'tr-3', start: 81, end: 150, speaker: 'Dr. Rajesh Kumar', text: 'Python considers empty sequences (`[]`, `""`, `()`), empty dictionaries (`{}`), `0`, `0.0`, and `None` to be falsy! Non-empty objects evaluate to truthy.' }
    ],
    script: {
      topic: 'If-Else and Control Flow in Python',
      targetAudience: 'Engineering undergraduates preparing for placements',
      introduction: 'Control flow determines the direction of program execution based on boolean conditions.',
      conceptExplanation: 'Conditions are evaluated from top to bottom. Once a condition evaluates to True, its block runs and subsequent elif/else branches are bypassed.',
      simpleExample: 'Like a security gate at an exam center: if student has hall ticket, allow entry; elif has special pass, inspect; else deny entry.',
      codeDemonstration: {
        language: 'python',
        code: `# If-Else and Match-Case in Python\nmarks = 88\n\n# Multi-branching logic\nif marks >= 90:\n    grade = "A+ (Distinction)"\nelif marks >= 75:\n    grade = "A (Merit)"\nelif marks >= 60:\n    grade = "B (First Class)"\nelse:\n    grade = "C (Pass)"\n\nprint(f"Marks: {marks} => Result Grade: {grade}")\n\n# Ternary Operator\nstatus = "Eligible for Placement" if marks >= 75 else "Requires Remedial"\nprint("Status:", status)`,
        output: 'Marks: 88 => Result Grade: A (Merit)\nStatus: Eligible for Placement',
        explanation: 'Demonstrates standard multi-way branching and compact Python ternary expressions.'
      },
      commonMistakes: [
        'Using = (assignment) instead of == (comparison) inside an if condition.',
        'Over-nesting if blocks when boolean operators (and / or) can flatten the structure.',
        'Forgetting the colon (:) at the end of if, elif, or else statements.'
      ],
      practiceExample: 'Implement a tax bracket calculator that reads income and calculates tax based on progressive tax slabs.',
      quickRecap: 'Master truthy/falsy definitions, use ternary operators for clean single-line assignments, and remember Python 4-space indentation.'
    },
    codeDemo: {
      language: 'python',
      code: `# Python 3.10+ Structural Pattern Matching\ndef route_request(http_code):\n    match http_code:\n        case 200:\n            return "OK: Success"\n        case 404:\n            return "Not Found: Resource Missing"\n        case 500:\n            return "Internal Server Error"\n        case _:\n            return "Unknown HTTP Status"\n\nprint(route_request(200))\nprint(route_request(404))`,
      output: 'OK: Success\nNot Found: Resource Missing',
      explanation: 'Uses modern pattern matching with wildcard default case (_).'
    },
    miniQuiz: [
      {
        question: 'Which of the following values is considered TRUTHY in a Python if statement?',
        options: ['"" (empty string)', '[] (empty list)', '"0" (string containing zero)', 'None'],
        correctIndex: 2,
        explanation: '"0" is a non-empty string, so it evaluates to True in Python! 0 (integer) is falsy, but "0" (string) is truthy.'
      }
    ],
    resources: [
      { id: 'res-7', title: 'Control_Flow_And_Pattern_Matching.pdf', size: '1.9 MB', type: 'pdf' }
    ]
  },

  'les-202': {
    videoTitle: 'Loops in Python: For, While, Range & Break/Continue — Beginner Lesson',
    durationSeconds: 1560, // 26m
    backupVideoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    learningObjectives: [
      'Master the for loop iterating over sequences, ranges, and strings',
      'Use the range(start, stop, step) generator function efficiently',
      'Implement while loops with proper termination conditions to avoid infinite loops',
      'Master loop controls: break, continue, and Python\'s unique for-else construct'
    ],
    chapters: [
      { id: 'ch-1', title: '00:00 - Why Loops? Iteration Mechanics', timestamp: 0, formattedTime: '00:00' },
      { id: 'ch-2', title: '03:15 - For Loop & The range() Function', timestamp: 195, formattedTime: '03:15' },
      { id: 'ch-3', title: '08:40 - While Loops & Preventing Infinite Execution', timestamp: 520, formattedTime: '08:40' },
      { id: 'ch-4', title: '14:00 - Break and Continue Statements', timestamp: 840, formattedTime: '14:00' },
      { id: 'ch-5', title: '19:10 - The Unique For-Else Pattern', timestamp: 1150, formattedTime: '19:10' },
      { id: 'ch-6', title: '23:00 - Placement Coding Patterns Recap', timestamp: 1380, formattedTime: '23:00' }
    ],
    transcript: [
      { id: 'tr-1', start: 0, end: 20, speaker: 'Dr. Rajesh Kumar', text: 'Repetitive automation is the primary superpower of computers. Python loops let us traverse datasets with elegant syntax.' },
      { id: 'tr-2', start: 21, end: 70, speaker: 'Dr. Rajesh Kumar', text: 'In Python, a for loop is fundamentally a "for-each" loop. When you iterate over a list or range, Python requests each item through the iterator protocol.' },
      { id: 'tr-3', start: 71, end: 140, speaker: 'Dr. Rajesh Kumar', text: 'A unique feature of Python that surprises developers from Java or C++ is the `else` clause on loops! The loop `else` runs ONLY if the loop finishes naturally without hitting a `break`.' }
    ],
    script: {
      topic: 'Loops and Iteration in Python',
      targetAudience: 'College CSE students preparing for algorithmic tests',
      introduction: 'Loops execute a code block repeatedly until a terminating condition is met. Python provides for and while loops.',
      conceptExplanation: 'for loops iterate over iterable objects (lists, tuples, ranges). while loops run as long as a boolean expression remains True.',
      simpleExample: 'for page in notebook: read(page) processes each page until the notebook is complete.',
      codeDemonstration: {
        language: 'python',
        code: `# Demonstrating For, While, and Loop-Else\n# 1. Using range with step\nprint("Even numbers from 2 to 10:")\nfor num in range(2, 11, 2):\n    print(num, end=" ")\nprint()\n\n# 2. Loop-Else search pattern (Prime Number Check)\ntarget = 17\nfor i in range(2, int(target ** 0.5) + 1):\n    if target % i == 0:\n        print(f"{target} is NOT prime (divisible by {i})")\n        break\nelse:\n    print(f"{target} IS a prime number! (Loop finished without break)")`,
        output: 'Even numbers from 2 to 10:\n2 4 6 8 10 \n17 IS a prime number! (Loop finished without break)',
        explanation: 'Demonstrates range step parameters and the powerful for-else prime verification pattern.'
      },
      commonMistakes: [
        'Off-by-one errors with range(start, stop): range(1, 5) generates 1, 2, 3, 4 (stop is exclusive).',
        'Forgetting to increment the loop counter inside a while loop, leading to an infinite freeze.',
        'Modifying a list while actively iterating over it.'
      ],
      practiceExample: 'Print Fibonacci sequence numbers up to 100 using a while loop and multiple assignment (a, b = b, a + b).',
      quickRecap: 'Use for loops when iterating over known collections, while loops for state-driven loops, and for-else for linear searches.'
    },
    codeDemo: {
      language: 'python',
      code: `# Generating Fibonacci with While Loop\na, b = 0, 1\nfib_series = []\nwhile a <= 50:\n    fib_series.append(a)\n    a, b = b, a + b\nprint("Fibonacci series up to 50:", fib_series)`,
      output: 'Fibonacci series up to 50: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]',
      explanation: 'Classic interview pattern demonstrating simultaneous variable swapping and while loop control.'
    },
    miniQuiz: [
      {
        question: 'What is the output of list(range(2, 8, 2))?',
        options: ['[2, 4, 6, 8]', '[2, 4, 6]', '[2, 3, 4, 5, 6, 7]', '[4, 6, 8]'],
        correctIndex: 1,
        explanation: 'range(2, 8, 2) starts at 2, steps by 2, and stops strictly before 8, producing [2, 4, 6].'
      }
    ],
    resources: [
      { id: 'res-8', title: 'Python_Loops_And_Recursion_Patterns.pdf', size: '2.4 MB', type: 'pdf' }
    ]
  },

  'les-203': {
    videoTitle: 'Control Flow Practice Problems & Placement Coding — Beginner Lesson',
    durationSeconds: 1680, // 28m
    backupVideoUrl: 'https://www.youtube.com/watch?v=8ext9G7xspg',
    learningObjectives: [
      'Solve top campus placement coding questions on control flow and loops',
      'Implement Palindrome Number detection without converting to string',
      'Generate star, pyramid, and number patterns for university coding exams',
      'Optimize runtime from O(n^2) to O(n) for searching and aggregation problems'
    ],
    chapters: [
      { id: 'ch-1', title: '00:00 - Problem 1: Palindrome Number (LeetCode 9)', timestamp: 0, formattedTime: '00:00' },
      { id: 'ch-2', title: '07:30 - Problem 2: Inverted Pyramid Pattern', timestamp: 450, formattedTime: '07:30' },
      { id: 'ch-3', title: '15:10 - Problem 3: Two Sum Brute Force vs Optimized', timestamp: 910, formattedTime: '15:10' },
      { id: 'ch-4', title: '22:00 - Interview Tips & Code Quality Checklist', timestamp: 1320, formattedTime: '22:00' }
    ],
    transcript: [
      { id: 'tr-1', start: 0, end: 25, speaker: 'Dr. Rajesh Kumar', text: 'In this session, we put theory into practice with real technical assessment problems asked by recruiters at TCS, Infosys, and Amazon.' },
      { id: 'tr-2', start: 26, end: 80, speaker: 'Dr. Rajesh Kumar', text: 'Problem 1: Reverse an integer and check if it is a palindrome. Interviewers often prohibit converting to a string to test your arithmetic loop logic.' }
    ],
    script: {
      topic: 'Practice Problems: Control Flow & Loops',
      targetAudience: 'Students preparing for campus recruitment technical rounds',
      introduction: 'Technical recruiters test whether you can translate a problem statement into clean, efficient conditionals and loops.',
      conceptExplanation: 'We focus on boundary checks (negative numbers, zero), space optimization, and handling edge cases without runtime crashes.',
      simpleExample: 'Checking if 121 reversed is 121: extract digits using % 10 and construct the reversed integer using * 10.',
      codeDemonstration: {
        language: 'python',
        code: `# Placement Problem: Palindrome Number without string conversion\ndef is_palindrome_number(num: int) -> bool:\n    if num < 0 or (num % 10 == 0 and num != 0):\n        return False  # Negative numbers or trailing zeroes (except 0) are not palindromes\n    \n    reversed_num = 0\n    original = num\n    while num > 0:\n        digit = num % 10\n        reversed_num = reversed_num * 10 + digit\n        num //= 10\n        \n    return original == reversed_num\n\n# Test Cases\nprint("121 is palindrome:", is_palindrome_number(121))\nprint("-121 is palindrome:", is_palindrome_number(-121))\nprint("10 is palindrome:", is_palindrome_number(10))`,
        output: '121 is palindrome: True\n-121 is palindrome: False\n10 is palindrome: False',
        explanation: 'Mathematical digit extraction with % and // maintaining O(log10 N) runtime and O(1) space.'
      },
      commonMistakes: [
        'Overlooking negative numbers (e.g. -121 reads as 121- backwards).',
        'Integer overflow in other languages (Python handles arbitrary precision, but worth mentioning to interviewers).'
      ],
      practiceExample: 'Write a program to print Pascal\'s Triangle up to 5 rows using nested loops.',
      quickRecap: 'Always check negative inputs, write clean variable names, and state the time and space complexity to the interviewer.'
    },
    codeDemo: {
      language: 'python',
      code: `# Pyramid Pattern Generator\nrows = 4\nfor i in range(1, rows + 1):\n    print(" " * (rows - i) + "* " * i)`,
      output: '   * \n  * * \n * * * \n* * * * ',
      explanation: 'Leverages Python string multiplication for compact, readable pattern generation.'
    },
    miniQuiz: [
      {
        question: 'What is the time complexity of reversing an integer with d digits?',
        options: ['O(1)', 'O(d) or O(log10 n)', 'O(n^2)', 'O(2^n)'],
        correctIndex: 1,
        explanation: 'Since we divide by 10 in each iteration, the loop runs d times where d = floor(log10 n) + 1.'
      }
    ],
    resources: [
      { id: 'res-9', title: 'Top_50_Placement_Coding_Problems.pdf', size: '3.1 MB', type: 'pdf' }
    ]
  },

  // Module 3 - Functions
  'les-301': {
    videoTitle: 'Functions in Python: Definition, Scope & Return Values — Beginner Lesson',
    durationSeconds: 1755, // 29m 15s
    backupVideoUrl: 'https://www.youtube.com/watch?v=nLRL_NcnK-4',
    learningObjectives: [
      'Define modular reusable functions using the def keyword',
      'Understand local vs global scope and the LEGB lookup rule',
      'Return single and multiple values using tuple packing/unpacking',
      'Write informative docstrings adhering to PEP 257 conventions'
    ],
    chapters: [
      { id: 'ch-1', title: '00:00 - The DRY Principle & Function Anatomy', timestamp: 0, formattedTime: '00:00' },
      { id: 'ch-2', title: '04:20 - Defining Functions & Parameters vs Arguments', timestamp: 260, formattedTime: '04:20' },
      { id: 'ch-3', title: '09:40 - The LEGB Variable Scope Rule', timestamp: 580, formattedTime: '09:40' },
      { id: 'ch-4', title: '15:10 - Returning Multiple Values with Tuples', timestamp: 910, formattedTime: '15:10' },
      { id: 'ch-5', title: '21:30 - Docstrings and Type Annotations', timestamp: 1290, formattedTime: '21:30' },
      { id: 'ch-6', title: '26:00 - Wrap-up & Exercises', timestamp: 1560, formattedTime: '26:00' }
    ],
    transcript: [
      { id: 'tr-1', start: 0, end: 25, speaker: 'Dr. Rajesh Kumar', text: 'Welcome to Module 3 on Functions. Software architecture is built on the DRY principle: Don\'t Repeat Yourself.' },
      { id: 'tr-2', start: 26, end: 80, speaker: 'Dr. Rajesh Kumar', text: 'A function in Python is a first-class object. You define it with `def`, give it descriptive arguments, and return values with `return`. If no return statement is reached, Python returns `None`.' }
    ],
    script: {
      topic: 'Functions and Scope in Python',
      targetAudience: 'Undergraduate engineering students',
      introduction: 'Functions encapsulate logic into reusable blocks, improving readability and testability.',
      conceptExplanation: 'Python resolves names using the LEGB rule: Local -> Enclosing -> Global -> Built-in. When a function executes, a new local stack frame is created.',
      simpleExample: 'A coffee machine: you provide beans and water (parameters), it runs the brew process, and dispenses espresso (return value).',
      codeDemonstration: {
        language: 'python',
        code: `# Modular Function Definition with Type Hints\ndef calculate_student_stats(scores: list[float]) -> tuple[float, float, str]:\n    """\n    Computes total score, average, and performance tier.\n    """\n    total = sum(scores)\n    average = total / len(scores) if scores else 0.0\n    tier = "Distinction" if average >= 75 else "Standard"\n    return total, round(average, 2), tier\n\n# Unpacking return tuple\ntot, avg, performance = calculate_student_stats([82.5, 91.0, 78.5, 88.0])\nprint(f"Total: {tot} | Average: {avg} | Tier: {performance}")`,
        output: 'Total: 340.0 | Average: 85.0 | Tier: Distinction',
        explanation: 'Shows type hinting, docstring formatting, and automatic tuple unpacking.'
      },
      commonMistakes: [
        'Modifying global variables without the global keyword (though modifying globals is generally an anti-pattern).',
        'Forgetting that functions return None by default if you omit the return statement.'
      ],
      practiceExample: 'Write a function is_armstrong(n) that returns True if the sum of the cubes of its digits equals the number.',
      quickRecap: 'Functions organize code. Remember the LEGB scope rule, type hints for clarity, and always write docstrings.'
    },
    codeDemo: {
      language: 'python',
      code: `# LEGB Scope in Action\nx = "GLOBAL"\ndef outer():\n    x = "ENCLOSING"\n    def inner():\n        x = "LOCAL"\n        return x\n    return inner()\nprint("Resolved variable:", outer())`,
      output: 'Resolved variable: LOCAL',
      explanation: 'Demonstrates Python prioritizing local scope over enclosing and global namespaces.'
    },
    miniQuiz: [
      {
        question: 'What does a Python function return if it executes to the end without a return statement?',
        options: ['0', 'False', 'None', 'Empty string ""'],
        correctIndex: 2,
        explanation: 'In Python, a function that finishes execution without an explicit return statement implicitly returns None.'
      }
    ],
    resources: [
      { id: 'res-10', title: 'Python_Functions_And_Scope_Mastery.pdf', size: '2.0 MB', type: 'pdf' }
    ]
  },

  'les-302': {
    videoTitle: 'Function Parameters: Default, Positional, *args & **kwargs — Beginner Lesson',
    durationSeconds: 1620, // 27m
    backupVideoUrl: 'https://www.youtube.com/watch?v=YYXdXT2l-Gg',
    learningObjectives: [
      'Master positional vs keyword argument invocation',
      'Use default parameter values and avoid the mutable default argument trap',
      'Collect arbitrary positional arguments with *args as a tuple',
      'Collect arbitrary keyword arguments with **kwargs as a dictionary'
    ],
    chapters: [
      { id: 'ch-1', title: '00:00 - Argument Types in Python', timestamp: 0, formattedTime: '00:00' },
      { id: 'ch-2', title: '04:15 - Default Arguments & The Mutable Trap', timestamp: 255, formattedTime: '04:15' },
      { id: 'ch-3', title: '10:00 - Variable Length Positional Arguments (*args)', timestamp: 600, formattedTime: '10:00' },
      { id: 'ch-4', title: '16:30 - Arbitrary Keyword Arguments (**kwargs)', timestamp: 990, formattedTime: '16:30' },
      { id: 'ch-5', title: '22:00 - Function Argument Ordering Rule', timestamp: 1320, formattedTime: '22:00' }
    ],
    transcript: [
      { id: 'tr-1', start: 0, end: 25, speaker: 'Dr. Rajesh Kumar', text: 'Python gives you extreme flexibility in how functions accept arguments. You can pass values positionally, by name, or capture dynamic variable-length arguments.' },
      { id: 'tr-2', start: 26, end: 85, speaker: 'Dr. Rajesh Kumar', text: 'Be extremely careful with default arguments! Never use a mutable default like `def add_item(item, lst=[])`. The default list is created once at function definition time, not on every call!' }
    ],
    script: {
      topic: 'Function Parameters, *args and **kwargs',
      targetAudience: 'College CSE students preparing for enterprise codebases and interview rounds',
      introduction: 'Flexible parameter handling is essential for writing clean decorators, utility libraries, and extensible APIs.',
      conceptExplanation: '*args packs extra positional arguments into a tuple. **kwargs packs extra keyword arguments into a dictionary.',
      simpleExample: 'Ordering custom pizza: base toppings are positional, extra toppings are *args, special delivery notes are **kwargs.',
      codeDemonstration: {
        language: 'python',
        code: `# Demonstration of *args, **kwargs, and safe default parameters\ndef build_student_profile(name, college="IIT Hyderabad", *skills, **metadata):\n    print(f"Student: {name} ({college})")\n    print(f"Skills: {', '.join(skills) if skills else 'None'}")\n    for key, value in metadata.items():\n        print(f"  - {key.capitalize()}: {value}")\n\n# Calling with diverse arguments\nbuild_student_profile(\n    "Sai Krishna",\n    "EduPath Tech",\n    "Python", "React", "PostgreSQL", "Machine Learning",\n    cgpa=8.85,\n    placed=True,\n    year=2026\n)`,
        output: 'Student: Sai Krishna (EduPath Tech)\nSkills: Python, React, PostgreSQL, Machine Learning\n  - Cgpa: 8.85\n  - Placed: True\n  - Year: 2026',
        explanation: 'Shows how *skills collects variable arguments into a tuple and **metadata collects named parameters into a dict.'
      },
      commonMistakes: [
        'Using a mutable default parameter like def func(a, items=[]). Always use items=None instead.',
        'Violating parameter order: positional -> default -> *args -> keyword-only -> **kwargs.'
      ],
      practiceExample: 'Write a wrapper function my_logger(*args, **kwargs) that prints timestamp and passes all arguments to another target function.',
      quickRecap: '*args captures positional tuples, **kwargs captures keyword dicts, and always use None as default for mutable arguments.'
    },
    codeDemo: {
      language: 'python',
      code: `# Safe Mutable Default Pattern\ndef append_to_cache(entry, cache=None):\n    if cache is None:\n        cache = []\n    cache.append(entry)\n    return cache\n\nprint("Call 1:", append_to_cache("A"))\nprint("Call 2:", append_to_cache("B"))`,
      output: 'Call 1: [\'A\']\nCall 2: [\'B\']',
      explanation: 'Uses cache=None sentinel pattern to avoid the notorious shared mutable default list bug.'
    },
    miniQuiz: [
      {
        question: 'What data structure does *args create inside a function?',
        options: ['List', 'Tuple', 'Set', 'Dictionary'],
        correctIndex: 1,
        explanation: '*args captures positional arguments into an immutable Tuple.'
      }
    ],
    resources: [
      { id: 'res-11', title: 'Python_Args_Kwargs_Design_Patterns.pdf', size: '1.7 MB', type: 'pdf' }
    ]
  },

  'les-303': {
    videoTitle: 'Lambda Functions & Functional Programming (Map, Filter, Sorted) — Beginner Lesson',
    durationSeconds: 1440, // 24m
    backupVideoUrl: 'https://www.youtube.com/watch?v=YYXdXT2l-Gg',
    learningObjectives: [
      'Write anonymous one-line lambda expressions in Python',
      'Use lambdas as custom sort keys in sorted() and list.sort()',
      'Apply functional primitives: map(), filter(), and functools.reduce()',
      'Compare lambda expressions vs Pythonic list comprehensions'
    ],
    chapters: [
      { id: 'ch-1', title: '00:00 - What is a Lambda Function?', timestamp: 0, formattedTime: '00:00' },
      { id: 'ch-2', title: '03:30 - Lambda Syntax & Limitations', timestamp: 210, formattedTime: '03:30' },
      { id: 'ch-3', title: '07:45 - Custom Sorting with key=lambda', timestamp: 465, formattedTime: '07:45' },
      { id: 'ch-4', title: '13:00 - Map and Filter in Data Pipelines', timestamp: 780, formattedTime: '13:00' },
      { id: 'ch-5', title: '19:00 - Lambda vs List Comprehensions: When to use what?', timestamp: 1140, formattedTime: '19:00' }
    ],
    transcript: [
      { id: 'tr-1', start: 0, end: 20, speaker: 'Dr. Rajesh Kumar', text: 'Lambda functions are anonymous functions defined using the `lambda` keyword. They are restricted to a single expression and return its value automatically.' },
      { id: 'tr-2', start: 21, end: 70, speaker: 'Dr. Rajesh Kumar', text: 'Where do lambdas shine most? As key callbacks in `sorted()`. For instance, sorting a list of student dictionaries by CGPA or name.' }
    ],
    script: {
      topic: 'Lambda Functions and Functional Programming',
      targetAudience: 'College CSE students preparing for interview coding rounds',
      introduction: 'Lambdas are concise functions without a name, frequently passed as arguments to higher-order functions.',
      conceptExplanation: 'Syntax: lambda arguments: expression. The expression is evaluated and returned without requiring a return statement.',
      simpleExample: 'square = lambda x: x ** 2 is identical to def square(x): return x ** 2.',
      codeDemonstration: {
        language: 'python',
        code: `# Lambdas with Custom Sorting and Filtering\nstudents = [\n    {"name": "Aakash", "cgpa": 8.2, "package": 9.5},\n    {"name": "Sneha", "cgpa": 9.4, "package": 14.0},\n    {"name": "Rohan", "cgpa": 7.8, "package": 8.0},\n    {"name": "Pooja", "cgpa": 8.9, "package": 12.0},\n]\n\n# Sort by CGPA descending\nsorted_by_cgpa = sorted(students, key=lambda s: s["cgpa"], reverse=True)\nprint("Top Student by CGPA:", sorted_by_cgpa[0]["name"], f"({sorted_by_cgpa[0]['cgpa']})")\n\n# Filter students with package >= 10 LPA\nhigh_package = list(filter(lambda s: s["package"] >= 10.0, students))\nprint(f"Students with >= 10 LPA: {[s['name'] for s in high_package]}")`,
        output: 'Top Student by CGPA: Sneha (9.4)\nStudents with >= 10 LPA: [\'Sneha\', \'Pooja\']',
        explanation: 'Demonstrates real-world use of lambda keys for dictionary sorting and filtering.'
      },
      commonMistakes: [
        'Attempting to write multiple statements or assignments inside a lambda (lambdas only accept single expressions).',
        'Overusing lambdas when a named def function or list comprehension would be much more readable.'
      ],
      practiceExample: 'Given a list of words, sort them by length ascending, and if lengths are equal, sort alphabetically.',
      quickRecap: 'Use lambdas for short inline key functions in sorted() and min()/max(). Favor list comprehensions for transformations.'
    },
    codeDemo: {
      language: 'python',
      code: `# Multi-key sorting with Lambda Tuple Key\nwords = ["apple", "pie", "banana", "kiwi", "fig", "pear"]\nsorted_words = sorted(words, key=lambda w: (len(w), w))\nprint("Sorted by length then alphabetically:", sorted_words)`,
      output: 'Sorted by length then alphabetically: [\'fig\', \'pie\', \'kiwi\', \'pear\', \'apple\', \'banana\']',
      explanation: 'Uses a tuple in the lambda return to achieve primary and secondary sort orders.'
    },
    miniQuiz: [
      {
        question: 'Which statement about lambda functions in Python is TRUE?',
        options: ['They can contain multiple lines and while loops', 'They must contain a return keyword', 'They can only contain a single expression', 'They cannot accept parameters'],
        correctIndex: 2,
        explanation: 'In Python, lambda functions are syntactically restricted to a single expression that is automatically returned.'
      }
    ],
    resources: [
      { id: 'res-12', title: 'Functional_Python_Cheatsheet.pdf', size: '1.5 MB', type: 'pdf' }
    ]
  },

  // Module 4 - Projects
  'les-401': {
    videoTitle: 'Mini Project: Student Performance Tracker & Automated Reporting — Capstone Lesson',
    durationSeconds: 1920, // 32m
    backupVideoUrl: 'https://www.youtube.com/watch?v=8ext9G7xspg',
    learningObjectives: [
      'Architect an end-to-end Python console application from scratch',
      'Store, validate, and manipulate records using Dictionaries and Lists',
      'Compute aggregate statistics (mean, median, top percentile)',
      'Export formatted reports with clean text borders and CSV files'
    ],
    chapters: [
      { id: 'ch-1', title: '00:00 - Project Scope & Requirements', timestamp: 0, formattedTime: '00:00' },
      { id: 'ch-2', title: '05:00 - Designing the Data Schema (Records & In-Memory Store)', timestamp: 300, formattedTime: '05:00' },
      { id: 'ch-3', title: '12:30 - Implementing CRUD Functions (Add, View, Update)', timestamp: 750, formattedTime: '12:30' },
      { id: 'ch-4', title: '20:15 - Analytics Engine & Grading Logic', timestamp: 1215, formattedTime: '20:15' },
      { id: 'ch-5', title: '27:00 - Report Generation & Code Walkthrough', timestamp: 1620, formattedTime: '27:00' }
    ],
    transcript: [
      { id: 'tr-1', start: 0, end: 25, speaker: 'Dr. Rajesh Kumar', text: 'Welcome to your first Capstone Mini Project! We are going to build an automated Student Performance Tracker that you can showcase on your resume.' },
      { id: 'tr-2', start: 26, end: 90, speaker: 'Dr. Rajesh Kumar', text: 'This project integrates all concepts covered so far: variables, data structures, conditional control flow, loops, and modular functions.' }
    ],
    script: {
      topic: 'Mini Project: Student Performance Tracker',
      targetAudience: 'College students building projects for resume and portfolio verification',
      introduction: 'Building cohesive, multi-function projects demonstrates engineering competence to campus recruiters.',
      conceptExplanation: 'We structure the application into separation of concerns: Data Layer, Business Logic Layer, and Presentation Layer.',
      simpleExample: 'A digital gradebook used by college faculty to track student marks, compute SGPA/CGPA, and export class statistics.',
      codeDemonstration: {
        language: 'python',
        code: `# Student Performance Tracker Core Engine\nclass PerformanceTracker:\n    def __init__(self):\n        self.students = []\n\n    def add_student(self, roll: str, name: str, scores: dict[str, float]):\n        avg = sum(scores.values()) / len(scores) if scores else 0\n        record = {\n            "roll": roll,\n            "name": name,\n            "scores": scores,\n            "average": round(avg, 2),\n            "passed": avg >= 50.0\n        }\n        self.students.append(record)\n        return record\n\n    def generate_report(self):\n        print("=" * 50)\n        print(f"{'ROLL':<10} {'NAME':<15} {'AVG':<8} {'STATUS'}")\n        print("-" * 50)\n        for s in self.students:\n            status = "PASS" if s["passed"] else "FAIL"\n            print(f"{s['roll']:<10} {s['name']:<15} {s['average']:<8.2f} {status}")\n        print("=" * 50)\n\n# Execution sample\ntracker = PerformanceTracker()\ntracker.add_student("22CS101", "Sai Krishna", {"DSA": 88, "Python": 92, "DBMS": 85})\ntracker.add_student("22CS102", "Sneha Patel", {"DSA": 94, "Python": 96, "DBMS": 91})\ntracker.generate_report()`,
        output: '==================================================\nROLL       NAME            AVG      STATUS\n--------------------------------------------------\n22CS101    Sai Krishna     88.33    PASS\n22CS102    Sneha Patel     93.67    PASS\n==================================================',
        explanation: 'Clean object-oriented data manager with aligned ASCII tabular reporting.'
      },
      commonMistakes: [
        'Hardcoding records instead of structuring data dictionaries.',
        'Not handling division by zero when calculating averages on empty scores.'
      ],
      practiceExample: 'Enhance this tracker to support saving and loading records from a local JSON or CSV file using Python\'s built-in json module.',
      quickRecap: 'This mini project provides concrete proof of your ability to write modular Python code with clean formatted output.'
    },
    codeDemo: {
      language: 'python',
      code: `# Quick Stats Engine\nscores = [88.33, 93.67, 72.0, 65.5, 91.0]\nprint(f"Class Topper: {max(scores):.2f}%")\nprint(f"Class Average: {sum(scores)/len(scores):.2f}%")\nprint(f"Pass Rate: {(sum(1 for s in scores if s >= 50)/len(scores))*100:.1f}%")`,
      output: 'Class Topper: 93.67%\nClass Average: 82.10%\nPass Rate: 100.0%',
      explanation: 'Computes essential classroom summary analytics using list comprehensions and generators.'
    },
    miniQuiz: [
      {
        question: 'Which built-in Python module is best suited for serializing structured dictionaries to disk?',
        options: ['sys', 'json', 'math', 'random'],
        correctIndex: 1,
        explanation: 'The built-in json module serializes Python dictionaries, lists, and strings to JSON format easily with json.dump().'
      }
    ],
    resources: [
      { id: 'res-13', title: 'Student_Tracker_Starter_Project.zip', size: '4.8 MB', type: 'code' },
      { id: 'res-14', title: 'Project_Rubric_And_Placement_Checklist.pdf', size: '1.1 MB', type: 'pdf' }
    ]
  },

  'les-402': {
    videoTitle: 'Final Project: Automated Web Scraper, Data Analyzer & Visualizer — Capstone Lesson',
    durationSeconds: 2280, // 38m
    backupVideoUrl: 'https://www.youtube.com/watch?v=8ext9G7xspg',
    learningObjectives: [
      'Build a production-grade automated Python project from specification to deployment',
      'Parse web content and JSON endpoints cleanly with proper error handling',
      'Cleanse, filter, and extract key metrics from raw datasets',
      'Generate professional analytical summaries and showcase on EduPath & GitHub'
    ],
    chapters: [
      { id: 'ch-1', title: '00:00 - Final Project Architecture & System Design', timestamp: 0, formattedTime: '00:00' },
      { id: 'ch-2', title: '06:15 - Fetching and Parsing Live Web Data', timestamp: 375, formattedTime: '06:15' },
      { id: 'ch-3', title: '14:40 - Data Cleansing Pipeline & Outlier Filtering', timestamp: 880, formattedTime: '14:40' },
      { id: 'ch-4', title: '23:10 - Statistical Analysis & Insights Extraction', timestamp: 1390, formattedTime: '23:10' },
      { id: 'ch-5', title: '31:00 - Writing the README, Licensing & Portfolio Packaging', timestamp: 1860, formattedTime: '31:00' }
    ],
    transcript: [
      { id: 'tr-1', start: 0, end: 25, speaker: 'Dr. Rajesh Kumar', text: 'Congratulations on reaching the Final Capstone Project of the Python Programming Masterclass!' },
      { id: 'tr-2', start: 26, end: 90, speaker: 'Dr. Rajesh Kumar', text: 'In this project, we engineer an automated data pipeline. Completing this unlocks your verified EduPath Certificate and qualifies you for direct recruiter applications!' }
    ],
    script: {
      topic: 'Final Capstone Project: Automated Data Scraper & Reporter',
      targetAudience: 'Graduating engineering students completing certification',
      introduction: 'This capstone project validates your mastery of Python. You will build a complete end-to-end data pipeline.',
      conceptExplanation: 'The pipeline extracts raw data, transforms it with string formatting and mathematical aggregations, and loads it into structured summary reports.',
      simpleExample: 'Tracking top tech jobs and salary trends across cities to help campus graduates identify hiring patterns.',
      codeDemonstration: {
        language: 'python',
        code: `# Final Project: Automated Data Pipeline & Insights Engine\nimport json\n\nraw_data = """[\n  {"role": "Python Backend Engineer", "package_lpa": 12.5, "openings": 24},\n  {"role": "Full Stack React Developer", "package_lpa": 14.0, "openings": 38},\n  {"role": "Data Analyst / ML Engineer", "package_lpa": 11.0, "openings": 19},\n  {"role": "DevOps & Cloud Associate", "package_lpa": 10.5, "openings": 15}\n]"""\n\njob_postings = json.loads(raw_data)\ntotal_openings = sum(j["openings"] for j in job_postings)\navg_salary = sum(j["package_lpa"] * j["openings"] for j in job_postings) / total_openings\n\nprint("=== EduPath Campus Placement Intelligence Report ===")\nprint(f"Total Tracked Openings: {total_openings}")\nprint(f"Weighted Average CTC: Rs. {avg_salary:.2f} LPA")\nprint(f"Highest Paying Role: {max(job_postings, key=lambda j: j['package_lpa'])['role']}")`,
        output: '=== EduPath Campus Placement Intelligence Report ===\nTotal Tracked Openings: 96\nWeighted Average CTC: Rs. 12.48 LPA\nHighest Paying Role: Full Stack React Developer',
        explanation: 'Parses JSON, executes weighted statistical aggregations, and formats a recruiter intelligence summary.'
      },
      commonMistakes: [
        'Neglecting edge cases like missing keys in raw data.',
        'Not providing clear documentation or setup instructions in your project repository.'
      ],
      practiceExample: 'Commit this project to GitHub, create a professional README with architectural diagrams, and link it in your EduPath Resume Builder!',
      quickRecap: 'You have mastered Python fundamentals, control flow, functions, and hands-on projects. Claim your certificate and start applying for campus drives!'
    },
    codeDemo: {
      language: 'python',
      code: `# Final Graduation Verification Code\nprint("🎉 Congratulations on completing the Python Programming Masterclass!")\nprint("Your verified course certificate is ready for generation.")`,
      output: '🎉 Congratulations on completing the Python Programming Masterclass!\nYour verified course certificate is ready for generation.',
      explanation: 'Confirms completion of the course curriculum.'
    },
    miniQuiz: [
      {
        question: 'Which of the following demonstrates the best engineering practice when shipping a Python project?',
        options: ['Hardcoding all configurations in code', 'Including a requirements.txt / virtual environment and README', 'Deleting all comments before deployment', 'Never writing test cases'],
        correctIndex: 1,
        explanation: 'A clean project repository should always include dependency specifications (requirements.txt) and clear setup documentation.'
      }
    ],
    resources: [
      { id: 'res-15', title: 'Complete_Final_Project_Source.zip', size: '12.4 MB', type: 'code' },
      { id: 'res-16', title: 'Python_Mastery_Verified_Syllabus.pdf', size: '2.8 MB', type: 'pdf' }
    ]
  }
};

/**
 * Fallback generator for lessons that don't have dedicated bespoke metadata in DETAILED_LESSONS.
 * Generates high quality, realistic chapters, transcripts, 7-part scripts, and code demonstrations!
 */
export const getEnrichedLessonMeta = (
  courseTitle: string,
  moduleTitle: string,
  lessonId: string,
  lessonTitle: string,
  duration: string,
  description?: string
): EnrichedLessonMeta => {
  // If we have explicit bespoke lesson metadata, return it
  if (DETAILED_LESSONS[lessonId]) {
    return DETAILED_LESSONS[lessonId];
  }

  // Parse duration "MM:SS" or default 15 minutes
  let durationSeconds = 900;
  if (duration && duration.includes(':')) {
    const parts = duration.split(':').map(Number);
    if (parts.length === 2) {
      durationSeconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      durationSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
  }

  const cleanTitle = lessonTitle.replace(/^[0-9.]+\s*/, '');

  const chapters: VideoChapter[] = [
    { id: `ch-${lessonId}-1`, title: '00:00 - Introduction & Learning Goals', timestamp: 0, formattedTime: '00:00' },
    { id: `ch-${lessonId}-2`, title: `02:30 - Core Concepts: ${cleanTitle}`, timestamp: Math.min(150, Math.floor(durationSeconds * 0.15)), formattedTime: '02:30' },
    { id: `ch-${lessonId}-3`, title: '06:45 - Code Demonstration & Implementation', timestamp: Math.min(405, Math.floor(durationSeconds * 0.4)), formattedTime: '06:45' },
    { id: `ch-${lessonId}-4`, title: '11:20 - Common Mistakes & Technical Interview Traps', timestamp: Math.min(680, Math.floor(durationSeconds * 0.7)), formattedTime: '11:20' },
    { id: `ch-${lessonId}-5`, title: '14:00 - Summary & Practice Problem', timestamp: Math.min(840, Math.floor(durationSeconds * 0.88)), formattedTime: '14:00' },
  ];

  const transcript: TranscriptLine[] = [
    { id: `tr-${lessonId}-1`, start: 0, end: 20, speaker: 'Lead Instructor', text: `Welcome to this session on ${cleanTitle} as part of ${moduleTitle}. Today we will master foundational principles that will accelerate your engineering career.` },
    { id: `tr-${lessonId}-2`, start: 21, end: 65, speaker: 'Lead Instructor', text: description || `In this lesson, we break down algorithmic structures, memory allocations, and best practices expected in top technical interviews.` },
    { id: `tr-${lessonId}-3`, start: 66, end: 140, speaker: 'Lead Instructor', text: `Let us examine the implementation. Notice how the syntax guarantees type safety, separation of concerns, and clean runtime execution.` },
    { id: `tr-${lessonId}-4`, start: 141, end: 220, speaker: 'Lead Instructor', text: `A common error candidates make is overlooking edge cases. Always verify null checks, boundary conditions, and test with diverse sample inputs.` },
    { id: `tr-${lessonId}-5`, start: 221, end: 300, speaker: 'Lead Instructor', text: `To summarize: master this design pattern, write idiomatic clean code, and try the practice exercise in your Study Scratchpad below!` }
  ];

  const script: AILessonScript = {
    topic: cleanTitle,
    targetAudience: `College engineering students enrolled in ${courseTitle}`,
    introduction: `Welcome to ${cleanTitle}. In modern software engineering, mastering this subject is essential for writing scalable, robust applications.`,
    conceptExplanation: description || `This topic explores the core design patterns and runtime paradigms underpinning ${moduleTitle}. We inspect memory management and computational efficiency.`,
    simpleExample: `Consider an everyday metaphor: like a well-organized logistics distribution system, this architecture processes inputs through predictable, deterministic transformations without side effects.`,
    codeDemonstration: {
      language: courseTitle.toLowerCase().includes('python') ? 'python' : courseTitle.toLowerCase().includes('java') ? 'java' : 'typescript',
      code: `// Implementation of ${cleanTitle}\nfunction solveProblem(inputs) {\n  // 1. Validate inputs\n  if (!inputs || inputs.length === 0) return null;\n  \n  // 2. Process with optimal runtime (O(n))\n  const result = inputs.map(item => item * 2);\n  \n  // 3. Return verified state\n  return result;\n}\n\n// Sample execution\nconsole.log(solveProblem([10, 20, 30]));`,
      output: '[20, 40, 60]',
      explanation: `Demonstrates clean procedural flow, parameter validation, and optimal execution without memory leaks.`
    },
    commonMistakes: [
      'Neglecting to validate edge cases such as empty or null collections.',
      'Unintended variable scope leakage or mutations.',
      'Failing to maintain consistent indentation and formatting according to language style guides.'
    ],
    practiceExample: `Write a modular function that solves this problem for a dataset of 1,000 records. Measure the execution time and verify that space complexity remains minimal.`,
    quickRecap: `Always keep operations modular, protect state immutability where appropriate, and practice explaining your thought process out loud for campus interviews!`
  };

  return {
    videoTitle: `${cleanTitle} — Comprehensive Educational Lesson`,
    durationSeconds,
    backupVideoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    learningObjectives: [
      `Understand core concepts of ${cleanTitle}`,
      `Implement production-ready solutions avoiding anti-patterns`,
      `Analyze time and space complexity benchmarks`,
      `Prepare for related campus placement interview questions`
    ],
    chapters,
    transcript,
    script,
    codeDemo: {
      language: 'javascript',
      code: `// ${cleanTitle} Demo\nconst demo = () => {\n  console.log("Mastering ${cleanTitle}");\n};\ndemo();`,
      output: `Mastering ${cleanTitle}`,
      explanation: `Executable snippet verifying the core lesson principle.`
    },
    miniQuiz: [
      {
        question: `What is the primary design objective of ${cleanTitle}?`,
        options: ['To maximize runtime overhead', 'To build maintainable, robust, and clean logic', 'To bypass compiler safety checks', 'None of the above'],
        correctIndex: 1,
        explanation: 'The fundamental objective is writing maintainable, correct, and high-performance software.'
      }
    ],
    resources: [
      { id: `res-${lessonId}-1`, title: `${cleanTitle.replace(/\s+/g, '_')}_Lecture_Notes.pdf`, size: '2.5 MB', type: 'pdf' },
      { id: `res-${lessonId}-2`, title: `starter_code_${lessonId}.zip`, size: '8.2 MB', type: 'code' }
    ]
  };
};
