import { Assignment } from '../types';

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    courseId: 'course-1',
    courseTitle: 'Python Programming Masterclass',
    title: 'Assignment 1: Student Grade Automation Script',
    description: 'Write a Python script that reads a CSV containing student names, marks in 5 subjects, calculates total/average/grade (A+, A, B, C, F), and exports a formatted summary file.',
    dueDate: '2026-09-15',
    points: 100,
    status: 'Submitted',
    submittedAnswer: 'def calculate_grade(avg):\n    if avg >= 90: return "A+"\n    elif avg >= 80: return "A"\n    elif avg >= 70: return "B"\n    elif avg >= 60: return "C"\n    return "F"',
    submittedFile: 'student_grade_processor.py',
    submittedAt: '2026-08-30',
    grade: '95/100',
    feedback: 'Excellent code modularity and clean exception handling for missing CSV columns.'
  },
  {
    id: 'asg-2',
    courseId: 'course-1',
    courseTitle: 'Python Programming Masterclass',
    title: 'Assignment 2: Bank Account Class with Transaction History',
    description: 'Implement a BankAccount class with deposit, withdraw (with insufficient balance exception), transfer, and transaction log tracking using Python OOP.',
    dueDate: '2026-09-22',
    points: 100,
    status: 'Pending'
  },
  {
    id: 'asg-3',
    courseId: 'course-2',
    courseTitle: 'Java Programming & Enterprise Backend',
    title: 'Assignment 1: Multithreaded Producer-Consumer with BlockingQueue',
    description: 'Create a thread-safe Producer-Consumer simulation using Java Concurrency utilities (ArrayBlockingQueue or custom wait/notify synchronization).',
    dueDate: '2026-09-18',
    points: 100,
    status: 'Pending'
  },
  {
    id: 'asg-4',
    courseId: 'course-3',
    courseTitle: 'Full Stack Web Development with React & Node',
    title: 'Assignment 1: Responsive E-Commerce Product Catalog',
    description: 'Build a responsive React application with dynamic category filters, search input with debouncing, cart quantity counter, and dark mode toggle.',
    dueDate: '2026-09-20',
    points: 100,
    status: 'Submitted',
    submittedAnswer: 'https://github.com/edupath-student/react-product-catalog',
    submittedFile: 'react-catalog-submission.zip',
    submittedAt: '2026-08-28',
    grade: '98/100',
    feedback: 'Phenomenal UI layout and smooth responsive breakpoint handling.'
  },
  {
    id: 'asg-5',
    courseId: 'course-4',
    courseTitle: 'Data Structures & Algorithms in Depth',
    title: 'Assignment 1: LRU Cache Implementation in O(1)',
    description: 'Implement a Least Recently Used (LRU) Cache data structure supporting get(key) and put(key, value) operations in strict O(1) time complexity using a HashMap + Doubly Linked List.',
    dueDate: '2026-09-25',
    points: 100,
    status: 'Pending'
  },
  {
    id: 'asg-6',
    courseId: 'course-6',
    courseTitle: 'Database Management Systems & SQL',
    title: 'Assignment 1: E-Commerce Relational Schema & Complex Joins',
    description: 'Design a 3NF normalized schema for an online marketplace with Customers, Orders, OrderItems, Products, and Categories. Write 5 analytical queries with Window functions.',
    dueDate: '2026-09-12',
    points: 100,
    status: 'Graded',
    submittedAnswer: 'CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(100)...);',
    submittedFile: 'marketplace_schema.sql',
    submittedAt: '2026-08-26',
    grade: '92/100',
    feedback: 'Good normalization, correct use of DENSE_RANK() for customer spending tiers.'
  }
];
