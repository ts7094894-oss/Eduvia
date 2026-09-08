import { User } from '../types';

export interface DemoAccount {
  email: string;
  password: string;
  role: User['role'];
  user: User;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: 'student@edupath.com',
    password: 'student123',
    role: 'student',
    user: {
      id: 'usr-student-1',
      name: 'Sai Krishna',
      email: 'student@edupath.com',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      college: 'EduPath Institute of Technology & Science',
      degree: 'B.Tech - Computer Science & Engineering',
      graduationYear: '2026',
      cgpa: '8.85',
      phone: '+91 98765 43210',
      bio: 'Pre-final year CSE student passionate about Full-Stack Development, Python, and Machine Learning. Actively seeking SDE opportunities.',
      skills: ['Python', 'Java', 'React', 'JavaScript', 'SQL', 'Data Structures', 'Git', 'Tailwind CSS']
    }
  },
  {
    email: 'teacher@edupath.com',
    password: 'teacher123',
    role: 'teacher',
    user: {
      id: 'usr-teacher-1',
      name: 'Dr. Rajesh Kumar',
      email: 'teacher@edupath.com',
      role: 'teacher',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: 'EduPath Institute of Technology',
      department: 'Department of Computer Science & Engineering',
      bio: 'Senior Professor with 14+ years of experience in Artificial Intelligence, Python Programming, and Distributed Systems.',
      phone: '+91 98123 45678'
    }
  },
  {
    email: 'placement@edupath.com',
    password: 'placement123',
    role: 'placement',
    user: {
      id: 'usr-placement-1',
      name: 'Prof. Venkat Raman',
      email: 'placement@edupath.com',
      role: 'placement',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      college: 'EduPath Training & Placement Cell (TPO)',
      department: 'Director of Corporate Relations & Placements',
      phone: '+91 98765 11223',
      bio: 'Leading campus recruitment relationships with 150+ Tier-1 tech giants and startups.'
    }
  },
  {
    email: 'recruiter@edupath.com',
    password: 'recruiter123',
    role: 'recruiter',
    user: {
      id: 'usr-recruiter-1',
      name: 'Priya Sharma',
      email: 'recruiter@edupath.com',
      role: 'recruiter',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      companyName: 'Tata Consultancy Services (TCS)',
      department: 'University Talent Acquisition Lead',
      phone: '+91 99887 76655',
      bio: 'Hiring the brightest software engineering and cloud development graduates for TCS Digital drives.'
    }
  },
  {
    email: 'admin@edupath.com',
    password: 'admin123',
    role: 'admin',
    user: {
      id: 'usr-admin-1',
      name: 'EduPath Platform Administrator',
      email: 'admin@edupath.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      college: 'EduPath Central Systems',
      bio: 'Super Admin managing system courses, platform analytics, placement drives, security, and global users.',
      phone: '+91 90000 00001'
    }
  }
];
