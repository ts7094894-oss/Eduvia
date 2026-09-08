import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { useToast } from '../context/ToastContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Building2,
  Headphones,
  Calendar,
  HelpCircle,
} from 'lucide-react';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface StoredMessage extends ContactFormData {
  id: string;
  submittedAt: string;
}

interface ContactSectionProps {
  id?: string;
  isStandalonePage?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  id = 'contact',
  isStandalonePage = false,
}) => {
  const toast = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [savedMessages, setSavedMessages] = useState<StoredMessage[]>([]);

  // Load existing demo inquiries from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('eduvia_contact_messages');
      if (stored) {
        setSavedMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse contact messages from localStorage', e);
    }
  }, []);

  const quickSubjects = [
    'Student Course Enrollment',
    'Placement & Campus Hiring',
    'Technical Support & LMS Access',
    'College Institutional Partnership',
    'Resume & ATS Review Inquiry',
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please specify a subject for your inquiry.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Validation Error', 'Please correct the highlighted fields in the form.');
      return;
    }

    setIsSubmitting(true);

    // Simulate responsive submission delay for authentic UX
    setTimeout(() => {
      const newMessage: StoredMessage = {
        ...formData,
        id: `msg-${Date.now()}`,
        submittedAt: new Date().toISOString(),
      };

      try {
        const updated = [newMessage, ...savedMessages];
        localStorage.setItem('eduvia_contact_messages', JSON.stringify(updated));
        setSavedMessages(updated);
      } catch (err) {
        console.error('Error saving contact message', err);
      }

      setIsSubmitting(false);
      setIsSubmittedSuccess(true);
      toast.success(
        'Message Sent Successfully! 🎉',
        'Thank you for contacting EduPath. Our team will get back to you soon.'
      );

      // Reset form fields
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});
    }, 600);
  };

  return (
    <section id={id} className="relative scroll-mt-24">
      {/* Background glow styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/80 text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-xs">
            <Headphones className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>24/7 Dedicated Student & Campus Support</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Get in Touch with{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduPath
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Have questions about our course certifications, placement drives, enterprise college onboarding, or ATS resume parsing? We are here to assist you every step of the way.
          </p>

          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
            "Learn. Grow. Get Hired."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Official Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Headquarters Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                  E
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">EduPath</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    Learn. Grow. Get Hired.
                  </p>
                </div>
              </div>

              {/* Info Items List */}
              <div className="space-y-5 text-sm">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-100 dark:border-indigo-900/60">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Registered Campus Office
                    </h4>
                    <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                      EduPath Learning & Career Platform
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Chennai, Tamil Nadu, India
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100 dark:border-blue-900/60">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Official Support Email
                    </h4>
                    <a
                      href="mailto:support@edupath.com"
                      className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline mt-0.5 block text-sm"
                    >
                      support@edupath.com
                    </a>
                    <p className="text-xs text-slate-500">24–48 hours standard response time</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100 dark:border-emerald-900/60">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Direct Helpline & WhatsApp
                    </h4>
                    <a
                      href="tel:+919876543210"
                      className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mt-0.5 block text-sm"
                    >
                      +91 98765 43210
                    </a>
                    <p className="text-xs text-slate-500">Toll-free student counseling</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5 border border-purple-100 dark:border-purple-900/60">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Operating Hours
                    </h4>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                      Monday – Saturday
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      9:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Verified Academic & Placement Security Guarantee</span>
              </div>
            </div>

            {/* Quick Resolution SLA Banner */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold">Fast Student Assistance</h4>
              </div>
              <p className="text-xs text-indigo-100 leading-relaxed">
                Need immediate course access or have an upcoming campus interview? Select your department subject on the form for priority response routing.
              </p>
            </div>
          </div>

          {/* Right Column: Functional Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Send Us a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Fill out the form below and an EduPath education counselor or placement advisor will reach out to you.
              </p>
            </div>

            {/* Success Banner */}
            {isSubmittedSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-200 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-sm">
                    Thank you for contacting EduPath!
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-300">
                    Our team will get back to you soon at your registered email. Your demo message has been saved in your local session.
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-fullName"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-fullName"
                    type="text"
                    required
                    placeholder="e.g. Sai Krishna"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    className={`w-full px-4 py-3 rounded-xl text-sm border bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. student@college.edu"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full px-4 py-3 rounded-xl text-sm border bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone Number (Optional) & Subject Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    placeholder="e.g. Question regarding TCS Digital drive"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    className={`w-full px-4 py-3 rounded-xl text-sm border bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                      errors.subject
                        ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Topic Chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400">Quick Subject Suggestions:</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickSubjects.map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, subject: sub });
                        if (errors.subject) setErrors({ ...errors, subject: undefined });
                      }}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                        formData.subject === sub
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5 pt-1">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Describe your query, feedback, or institutional request in detail..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-sm border bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 resize-none ${
                    errors.message
                      ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500'
                      : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-slate-400">
                  By submitting, you agree to EduPath's academic communication policy.
                </p>

                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  disabled={isSubmitting}
                  leftIcon={<Send className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message to EduPath'}
                </Button>
              </div>
            </form>

            {/* Local Session Inquiries History (Frontend Demo Transparency) */}
            {savedMessages.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    Your Submitted Inquiries ({savedMessages.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem('eduvia_contact_messages');
                      setSavedMessages([]);
                      toast.info('Cleared', 'Demo contact history cleared from LocalStorage.');
                    }}
                    className="text-[10px] text-slate-400 hover:text-rose-500 underline"
                  >
                    Clear History
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {savedMessages.slice(0, 3).map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {msg.subject}
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Received
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] line-clamp-1">
                        {msg.message}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        From: {msg.fullName} ({msg.email}) • {new Date(msg.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
