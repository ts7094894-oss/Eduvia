import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Assignment } from '../types';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  Send,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const Assignments: React.FC = () => {
  const { assignments, submitAssignment, courses } = useData();
  const { user } = useAuth();
  const toast = useToast();

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionCode, setSubmissionCode] = useState('');
  const [submissionFile, setSubmissionFile] = useState('solution_assignment.py');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenSubmit = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionCode('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitAssignment(selectedAssignment.id, {
        submissionUrl: `https://github.com/eduvia-student/assignment-${selectedAssignment.id}`,
        comments: submissionCode,
      });
      setIsSubmitting(false);
      setSelectedAssignment(null);
      toast.success('Assignment Submitted!', 'Your instructor will grade this and assign feedback.');
    }, 600);
  };

  const getStatusBadge = (status: Assignment['status'], grade?: string | number) => {
    const normalizedStatus = String(status).toLowerCase();
    switch (normalizedStatus) {
      case 'graded':
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Graded: {grade}/100</span>
          </span>
        );
      case 'submitted':
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Under Review</span>
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Pending Submission</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-xs font-bold text-indigo-700 dark:text-indigo-300">
          <FileText className="w-3.5 h-3.5" />
          <span>Continuous Academic Assessment</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Course Assignments & Lab Projects
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Submit coding assignments, project repositories, and design docs to be reviewed and graded by department faculty.
        </p>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => {
          const matchedCourse = courses.find((c) => c.id === assignment.courseId);

          return (
            <div
              key={assignment.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {matchedCourse?.title || 'CSE Core'}
                    </span>
                    <span>•</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Due: {assignment.dueDate}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {assignment.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {getStatusBadge(assignment.status, assignment.grade)}
                  {assignment.status === 'pending' ? (
                    <Button
                      size="small"
                      variant="primary"
                      onClick={() => handleOpenSubmit(assignment)}
                      leftIcon={<Upload className="w-3.5 h-3.5" />}
                    >
                      Submit Solution
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => handleOpenSubmit(assignment)}
                    >
                      Update Submission
                    </Button>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {assignment.description}
              </p>

              {/* Feedback and Graded Note */}
              {assignment.feedback && (
                <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-indigo-950 dark:text-indigo-200">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Faculty Evaluation & Feedback
                    </span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-black">
                      Score: {assignment.grade}/100
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{assignment.feedback}"
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <Modal
          isOpen={!!selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          title={`Submit: ${selectedAssignment.title}`}
          description={`Course: ${courses.find((c) => c.id === selectedAssignment.courseId)?.title || 'CSE'}`}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Upload Solution File or Archive (.py, .cpp, .java, .zip, .pdf)
              </label>
              <div className="p-4 rounded-2xl border border-dashed border-indigo-300 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-950/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Upload className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {submissionFile}
                    </p>
                    <p className="text-[10px] text-slate-400">Ready for faculty evaluation</p>
                  </div>
                </div>
                <label className="cursor-pointer">
                  <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50">
                    Change File
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSubmissionFile(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                GitHub Repository / Live Demo URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://github.com/my-username/project-repo"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Implementation Notes & Explanation
              </label>
              <textarea
                rows={4}
                value={submissionCode}
                onChange={(e) => setSubmissionCode(e.target.value)}
                placeholder="Briefly describe your approach, algorithms utilized, and any instructions to run the test cases..."
                className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSelectedAssignment(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Send className="w-4 h-4" />}
              >
                Submit Assignment
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
