import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { Careers } from './pages/Careers';
import { JobDetails } from './pages/JobDetails';
import { PlacementPrep } from './pages/PlacementPrep';

// Student & Learning Pages
import { Learn } from './pages/Learn';
import { Quiz } from './pages/Quiz';
import { Badges } from './pages/Badges';
import { Assignments } from './pages/Assignments';
import { Progress } from './pages/Progress';
import { Certificates } from './pages/Certificates';
import { ResumeBuilder } from './pages/ResumeBuilder';
import { Applications } from './pages/Applications';
import { Interviews } from './pages/Interviews';

// Role Dashboards
import { StudentDashboard } from './pages/dashboards/StudentDashboard';
import { TeacherDashboard } from './pages/dashboards/TeacherDashboard';
import { PlacementDashboard } from './pages/dashboards/PlacementDashboard';
import { RecruiterDashboard } from './pages/dashboards/RecruiterDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { Profile } from './pages/Profile';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Marketing & General Catalog Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/prep" element={<PlacementPrep />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Route>

        {/* Dedicated direct route for /resume-builder with full dashboard layout */}
        <Route path="/resume-builder" element={<DashboardLayout />}>
          <Route index element={<ResumeBuilder />} />
        </Route>

        {/* Authenticated Role-Based Dashboard Routes */}
        <Route path="/app" element={<DashboardLayout />}>
          {/* Default redirect to student dashboard */}
          <Route index element={<Navigate to="/app/student/dashboard" replace />} />

          {/* Student Sub-routes */}
          <Route path="student" element={<StudentDashboard />} />
          <Route path="student/dashboard" element={<StudentDashboard />} />
          <Route path="student/courses" element={<Progress />} />
          <Route path="student/learn/:id" element={<Learn />} />
          <Route path="student/quizzes" element={<Quiz />} />
          <Route path="student/badges" element={<Badges />} />
          <Route path="student/assignments" element={<Assignments />} />
          <Route path="student/progress" element={<Progress />} />
          <Route path="student/certificates" element={<Certificates />} />
          <Route path="student/prep" element={<PlacementPrep />} />
          <Route path="student/resume" element={<ResumeBuilder />} />
          <Route path="student/jobs" element={<Careers />} />
          <Route path="student/applications" element={<Applications />} />
          <Route path="student/interviews" element={<Interviews />} />

          {/* Teacher Sub-routes */}
          <Route path="teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="teacher/courses" element={<TeacherDashboard />} />
          <Route path="teacher/assignments" element={<Assignments />} />

          {/* Placement Cell (TPO) Sub-routes */}
          <Route path="placement/dashboard" element={<PlacementDashboard />} />
          <Route path="placement/drives" element={<PlacementDashboard />} />
          <Route path="placement/students" element={<PlacementDashboard />} />
          <Route path="placement/analytics" element={<PlacementDashboard />} />

          {/* Recruiter Sub-routes */}
          <Route path="recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="recruiter/jobs" element={<RecruiterDashboard />} />
          <Route path="recruiter/applicants" element={<RecruiterDashboard />} />

          {/* Admin Sub-routes */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/users" element={<AdminDashboard />} />
          <Route path="admin/courses" element={<AdminDashboard />} />
          <Route path="admin/jobs" element={<AdminDashboard />} />
          <Route path="admin/system" element={<AdminDashboard />} />

          {/* User Profile */}
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Wildcard Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
