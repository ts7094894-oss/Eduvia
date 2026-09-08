import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { DashboardCard } from '../../components/DashboardCard';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { JobApplication as Application, Job } from '../../types';
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  Eye,
  Sparkles,
  Building2,
  Clock,
} from 'lucide-react';

export const RecruiterDashboard: React.FC = () => {
  const { user } = useAuth();
  const { jobs, applications, updateApplicationStatus, addJob } = useData();
  const toast = useToast();

  const [postJobModal, setPostJobModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const [newJobForm, setNewJobForm] = useState({
    title: '',
    company: user?.name || 'TCS Digital',
    location: 'Hyderabad / Bangalore / Chennai',
    salary: '7.5 - 11.5 LPA',
    jobType: 'Full-time',
    workplaceType: 'Hybrid',
    experience: 'Fresher / 2026 Batch',
    eligibilityCgpa: 7.0,
    deadline: 'October 15, 2026',
    description: '',
    skills: 'Python, Java, React, SQL',
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobForm.title) return;

    addJob({
      title: newJobForm.title,
      company: newJobForm.company,
      companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80',
      location: newJobForm.location,
      salary: newJobForm.salary,
      jobType: newJobForm.jobType,
      workplaceType: newJobForm.workplaceType,
      experience: newJobForm.experience,
      eligibilityCgpa: Number(newJobForm.eligibilityCgpa),
      deadline: newJobForm.deadline,
      description: newJobForm.description || 'Join our premier engineering team building scalable systems.',
      skills: newJobForm.skills.split(',').map((s) => s.trim()),
      responsibilities: [
        'Design and deploy backend microservices.',
        'Collaborate with product and UX designers on student platform features.',
      ],
      requirements: [
        'B.Tech / M.Tech in Computer Science or allied branches.',
        'Strong problem-solving skills in DSA and OOP principles.',
      ],
    });

    toast.success('Campus Drive Published!', 'Student applications are now open in the EduPath portal.');
    setPostJobModal(false);
    setNewJobForm({
      title: '',
      company: user?.name || 'TCS Digital',
      location: 'Hyderabad / Bangalore / Chennai',
      salary: '7.5 - 11.5 LPA',
      jobType: 'Full-time',
      workplaceType: 'Hybrid',
      experience: 'Fresher / 2026 Batch',
      eligibilityCgpa: 7.0,
      deadline: 'October 15, 2026',
      description: '',
      skills: 'Python, Java, React, SQL',
    });
  };

  const handleStatusChange = (appId: string, status: Application['status']) => {
    updateApplicationStatus(appId, status);
    toast.success('Applicant Status Updated', `Application ${appId} moved to ${status.replace('_', ' ')}.`);
    setSelectedApp(null);
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-xs font-bold text-blue-700 dark:text-blue-300">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Recruiter & Talent Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Campus Hiring & Candidate Evaluation
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Post campus recruitment drives, review verified student profiles, evaluate ATS resumes, and schedule interviews.
          </p>
        </div>

        <Button
          variant="primary"
          size="medium"
          onClick={() => setPostJobModal(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Post New Campus Drive
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Active Drives"
          value={jobs.length}
          icon={<Briefcase className="w-6 h-6" />}
          description="Open for campus applications"
          accentColor="indigo"
        />
        <DashboardCard
          title="Direct Applicants"
          value={applications.length}
          icon={<Users className="w-6 h-6" />}
          description="Verified student submissions"
          accentColor="emerald"
        />
        <DashboardCard
          title="Interviews Set"
          value="18"
          icon={<Calendar className="w-6 h-6" />}
          description="Scheduled this week"
          accentColor="purple"
        />
        <DashboardCard
          title="Offers Extended"
          value="12"
          icon={<CheckCircle2 className="w-6 h-6" />}
          description="Selected candidates"
          accentColor="amber"
        />
      </div>

      {/* Applicants Management Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Received Candidate Applications ({applications.length})
        </h3>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Candidate Name</th>
                  <th className="p-4">Applied Role</th>
                  <th className="p-4">Degree & CGPA</th>
                  <th className="p-4">Applied Date</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-4">
                      <p className="font-bold text-slate-900 dark:text-white">{app.studentName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">Roll: 22B91A0588</p>
                    </td>
                    <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                      {app.jobTitle}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-emerald-600">8.85 CGPA</span>
                      <p className="text-[10px] text-slate-400">B.Tech CSE (2026)</p>
                    </td>
                    <td className="p-4 text-slate-500">{app.appliedDate}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold uppercase text-[10px]">
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        size="small"
                        variant="primary"
                        onClick={() => setSelectedApp(app)}
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                      >
                        Evaluate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Post Drive Modal */}
      <Modal
        isOpen={postJobModal}
        onClose={() => setPostJobModal(false)}
        title="Post New Campus Placement Drive"
      >
        <form onSubmit={handleCreateJob} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Job Title / Position
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Graduate Software Engineer (Digital)"
              value={newJobForm.title}
              onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                value={newJobForm.company}
                onChange={(e) => setNewJobForm({ ...newJobForm, company: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Annual CTC (Salary)</label>
              <input
                type="text"
                value={newJobForm.salary}
                onChange={(e) => setNewJobForm({ ...newJobForm, salary: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Minimum CGPA Criteria</label>
              <input
                type="number"
                step="0.1"
                value={newJobForm.eligibilityCgpa}
                onChange={(e) => setNewJobForm({ ...newJobForm, eligibilityCgpa: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Application Deadline</label>
              <input
                type="text"
                value={newJobForm.deadline}
                onChange={(e) => setNewJobForm({ ...newJobForm, deadline: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Required Skills (Comma-separated)</label>
            <input
              type="text"
              value={newJobForm.skills}
              onChange={(e) => setNewJobForm({ ...newJobForm, skills: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="ghost" onClick={() => setPostJobModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Post Drive
            </Button>
          </div>
        </form>
      </Modal>

      {/* Evaluate Candidate Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Evaluate Candidate: ${selectedApp.studentName}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Position Applied:</span>
                <strong className="text-slate-900 dark:text-white">{selectedApp.jobTitle}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Academic Standing:</span>
                <span className="font-bold text-emerald-600">8.85 CGPA • No Backlogs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">EduPath Coursework:</span>
                <span className="font-bold text-indigo-600">Full Stack & Python Mastery (Grade: A+)</span>
              </div>
            </div>

            <p className="font-bold text-slate-900 dark:text-white">Update Hiring Stage:</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="small"
                variant="secondary"
                onClick={() => handleStatusChange(selectedApp.id, 'shortlisted')}
              >
                Shortlist Candidate
              </Button>
              <Button
                size="small"
                variant="primary"
                onClick={() => handleStatusChange(selectedApp.id, 'interview_scheduled')}
              >
                Schedule Tech Interview
              </Button>
              <Button
                size="small"
                variant="success"
                onClick={() => handleStatusChange(selectedApp.id, 'selected')}
              >
                Extend Job Offer
              </Button>
              <Button
                size="small"
                variant="danger"
                onClick={() => handleStatusChange(selectedApp.id, 'rejected')}
              >
                Reject Application
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
