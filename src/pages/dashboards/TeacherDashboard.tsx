import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { DashboardCard } from '../../components/DashboardCard';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import {
  BookOpen,
  Users,
  FileCheck,
  Award,
  Plus,
  Video,
  Upload,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart2,
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses, assignments, addCourse } = useData();
  const toast = useToast();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'Computer Science',
    level: 'Beginner' as const,
    duration: '6 Weeks',
    description: '',
  });

  const teacherCourses = courses.filter((c) => c.instructor === (user?.name || 'Dr. K. S. Sharma') || true);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title) return;

    addCourse({
      title: newCourse.title,
      instructor: user?.name || 'Faculty Lead',
      category: newCourse.category,
      level: newCourse.level,
      duration: newCourse.duration,
      rating: 4.9,
      studentsCount: 1,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      description: newCourse.description || 'Comprehensive computer science engineering course with hands-on lab projects.',
      modules: [
        {
          id: `m-${Date.now()}`,
          title: 'Module 1: Foundations & Architecture',
          lessons: [
            {
              id: `l-${Date.now()}-1`,
              title: 'Introduction and Environment Setup',
              duration: '14 mins',
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            },
          ],
        },
      ],
    });

    toast.success('Course Published!', 'New course syllabus and modules are now live for student enrollments.');
    setCreateModalOpen(false);
    setNewCourse({ title: '', category: 'Computer Science', level: 'Beginner', duration: '6 Weeks', description: '' });
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Faculty & Instructor Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Management & Grading
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Create courses, upload recorded lectures, review submitted assignments, and monitor student completion analytics.
          </p>
        </div>

        <Button
          variant="primary"
          size="medium"
          onClick={() => setCreateModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create New Course
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Courses Authored"
          value={teacherCourses.length}
          icon={<BookOpen className="w-6 h-6" />}
          description="Active CSE Curriculum"
          accentColor="indigo"
        />
        <DashboardCard
          title="Total Students"
          value="4,820"
          icon={<Users className="w-6 h-6" />}
          description="Enrolled across all courses"
          accentColor="emerald"
        />
        <DashboardCard
          title="Pending Submissions"
          value={assignments.filter((a) => a.status === 'submitted').length || 2}
          icon={<FileCheck className="w-6 h-6" />}
          description="Requires grading & feedback"
          accentColor="amber"
        />
        <DashboardCard
          title="Class Average Grade"
          value="89.4%"
          icon={<Award className="w-6 h-6" />}
          description="Assessment clearance rate"
          accentColor="purple"
        />
      </div>

      {/* Managed Courses Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Active Managed Courses ({teacherCourses.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teacherCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-36 object-cover rounded-2xl border border-slate-100 dark:border-slate-800"
              />
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">
                  {course.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                  {course.title}
                </h4>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs flex justify-between text-slate-500">
                <span>{course.modules.length} Modules</span>
                <span>{course.studentsCount} Students Enrolled</span>
                <span className="text-amber-500 font-bold">★ {course.rating}</span>
              </div>

              <div className="flex gap-2">
                <Button size="small" variant="secondary" fullWidth>
                  Edit Syllabus
                </Button>
                <Button size="small" variant="outline" fullWidth>
                  Analytics
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Course Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create & Publish New Engineering Course"
      >
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Course Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Advanced Cloud Computing & Microservices"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department / Category</label>
              <input
                type="text"
                value={newCourse.category}
                onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Duration</label>
              <input
                type="text"
                value={newCourse.duration}
                onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Course Description & Outcomes</label>
            <textarea
              rows={3}
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="ghost" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Publish Course to Portal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
