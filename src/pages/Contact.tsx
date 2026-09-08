import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, MapPin, Phone, Clock, Headphones, Sparkles, Building2, HelpCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Breadcrumbs & Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700 dark:text-slate-200">Contact Us</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Contact EDUVIA
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              "Learn. Grow. Get Hired." • We're here to answer your questions and help you accelerate your tech career.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300 self-start md:self-auto">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Support Hours: Mon – Sat, 9:00 AM – 6:00 PM IST</span>
          </div>
        </div>
      </div>

      {/* Main Contact Section Component */}
      <ContactSection isStandalonePage={true} />

      {/* Frequently Asked Inquiries Accordion Grid */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Quick Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Find immediate answers to common questions about courses, certifications, and placements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              How do I receive course certificates?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Once you complete all video lessons and score &ge;80% on the module quizzes, your verified digital certificate with unique QR code validation will be immediately issued in your student profile.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Can I apply directly for campus drives?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes! EDUVIA has native integration with hiring partners like TCS, Infosys, and Deloitte. You can apply directly in-platform without external redirects and track interview schedules.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              How do colleges partner with EDUVIA?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Academic institutions and Placement Cells (TPOs) can onboard entire student batches with batch management, faculty LMS authoring, and direct company recruitment drives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
