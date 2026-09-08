import React, { useState } from 'react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';
import {
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-36 bg-gradient-to-r from-indigo-600/10 via-blue-600/10 to-purple-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand Info & About (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="medium" />
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Learn. Grow. Get Hired.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              EduPath is a modern learning and career platform designed to help students build skills, track their learning progress, earn certifications, prepare for placements, create professional resumes, and discover career opportunities — all in one place.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 block mb-2">Connect with EduPath:</span>
              <div className="flex items-center gap-2.5">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-indigo-600 hover:text-white text-slate-300 transition-all border border-slate-700/60 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="EduPath on LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-pink-600 hover:text-white text-slate-300 transition-all border border-slate-700/60 shadow-xs focus:outline-none focus:ring-2 focus:ring-pink-500"
                  aria-label="EduPath on Instagram"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-red-600 hover:text-white text-slate-300 transition-all border border-slate-700/60 shadow-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="EduPath on YouTube"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 hover:text-white text-slate-300 transition-all border border-slate-700/60 shadow-xs focus:outline-none focus:ring-2 focus:ring-slate-400"
                  aria-label="EduPath on X/Twitter"
                  title="X (Twitter)"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Accredited Academic & Career Partner</span>
            </div>
          </div>

          {/* Column 2: Platform (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/app/student/courses" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Learning
                </Link>
              </li>
              <li>
                <Link to="/app/student/quizzes" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link to="/app/student/assignments" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Assignments
                </Link>
              </li>
              <li>
                <Link to="/app/student/certificates" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Certificates
                </Link>
              </li>
              <li>
                <Link to="/app/student/progress" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Progress Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Career (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Career</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/careers" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/careers?type=Internship" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/prep" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Placement Preparation
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span>Resume Builder</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    ATS
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/app/student/applications" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Applications
                </Link>
              </li>
              <li>
                <Link to="/app/student/interviews" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Interviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  About EduPath
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(true)}
                  className="text-left text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setTermsModalOpen(true)}
                  className="text-left text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Details (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <p className="leading-tight text-slate-300">
                  Chennai, Tamil Nadu, India
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a
                  href="mailto:support@edupath.com"
                  className="text-slate-300 hover:text-indigo-400 transition-colors truncate"
                >
                  support@edupath.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-slate-300 hover:text-indigo-400 transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1 border-t border-slate-800 text-[11px] text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Mon – Sat: 9:00 AM – 6:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="font-medium text-slate-400">© 2026 EduPath. All Rights Reserved.</p>
            <span className="hidden sm:inline text-slate-700">•</span>
            <p className="font-semibold text-indigo-400">Learn. Grow. Get Hired.</p>
          </div>

          <div className="flex items-center gap-5 text-xs text-slate-400">
            <Link to="/about" className="hover:text-indigo-400 transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-indigo-400 transition-colors">
              Contact
            </Link>
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-indigo-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setTermsModalOpen(true)}
              className="hover:text-indigo-400 transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        title="EduPath — Privacy Policy"
      >
        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 max-h-96 overflow-y-auto pr-2">
          <p className="font-semibold text-slate-900 dark:text-white">
            Last Updated: January 2026
          </p>
          <p>
            Welcome to EduPath ("Learn. Grow. Get Hired."). We value your privacy and are committed to protecting the academic data, course completion records, and job application information of all students, faculty members, and recruiting partners.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">1. Information We Collect</h4>
          <p>
            We collect personal information such as full name, email address, academic credentials, enrolled course progress, submitted assignments, quiz assessment scores, and uploaded resume details when you use the EduPath learning and placement platform.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">2. Placement & Recruitment Data Sharing</h4>
          <p>
            When you explicitly apply for a job or internship drive hosted on EduPath, your verified student profile and resume data are shared securely with the respective corporate recruiter for interview evaluation.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">3. Contact Us</h4>
          <p>
            If you have questions regarding this Privacy Policy, please contact our Data Governance desk at <strong className="text-indigo-600 dark:text-indigo-400">support@edupath.com</strong> or call <strong className="text-slate-900 dark:text-white">+91 98765 43210</strong>.
          </p>
        </div>
      </Modal>

      {/* Terms and Conditions Modal */}
      <Modal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="EduPath — Terms & Conditions"
      >
        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 max-h-96 overflow-y-auto pr-2">
          <p className="font-semibold text-slate-900 dark:text-white">
            Last Updated: January 2026
          </p>
          <p>
            By accessing or using EduPath, you agree to be bound by these platform terms. EduPath provides academic learning management, coding labs, verified digital certification, and campus placement recruitment services.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">1. Academic Integrity & Honor Code</h4>
          <p>
            Students must submit authentic coursework and complete quizzes without unauthorized assistance. Certificates issued on EduPath represent verified individual achievement.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">2. Direct In-Platform Applications</h4>
          <p>
            EduPath provides verified corporate placement listings. All interview rounds and recruitment communications are conducted in compliance with institutional guidelines.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">3. Platform Copyright</h4>
          <p>
            © 2026 EduPath. All Rights Reserved. "Learn. Grow. Get Hired." is an official trademark.
          </p>
        </div>
      </Modal>
    </footer>
  );
};
