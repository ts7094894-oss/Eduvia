import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Certificate } from '../types';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Logo } from '../components/Logo';
import {
  Award,
  Download,
  Printer,
  Share2,
  CheckCircle2,
  Sparkles,
  QrCode,
  ShieldCheck,
  Calendar,
  User,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Certificates: React.FC = () => {
  const { certificates, courses } = useData();
  const { user } = useAuth();
  const toast = useToast();

  const [activeCert, setActiveCert] = useState<Certificate | null>(
    certificates[0] || null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenCertificate = (cert: Certificate) => {
    setActiveCert(cert);
    setModalOpen(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `https://eduvia.com/verify/${activeCert?.certificateNumber || 'EDUVIA-CERT-2026-PYTHON-9941'}`
    );
    toast.success('Verification URL Copied!', 'Share this link on your LinkedIn profile or resume.');
  };

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-xs font-bold text-amber-700 dark:text-amber-300">
          <Award className="w-3.5 h-3.5" />
          <span>Accredited Academic Credentials</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Verified Course Certificates
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Official digital certificates awarded upon 100% course completion and assessment clearance. Verified by EDUVIA academic council.
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all space-y-5 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {cert.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Issued to <strong className="text-slate-800 dark:text-slate-200">{cert.studentName}</strong>
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border border-emerald-200 dark:border-emerald-800 shrink-0">
                Grade: {cert.grade}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span>Certificate ID:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {cert.certificateNumber}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Issue Date:</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{cert.issueDate}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Instructor:</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{cert.instructorName}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Digitally Verified</span>
              </div>

              <Button
                size="small"
                variant="primary"
                onClick={() => handleOpenCertificate(cert)}
                leftIcon={<Award className="w-3.5 h-3.5 text-amber-300" />}
              >
                View & Print Certificate
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Printable Certificate Modal & Detailed Viewer */}
      {activeCert && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          maxWidth="3xl"
          title="Verified Digital Certificate of Completion"
        >
          <div className="space-y-6">
            {/* The Certificate Canvas (Specially styled for Print & Screen) */}
            <div
              id="printable-certificate"
              className="relative p-8 sm:p-12 rounded-3xl bg-amber-50/30 dark:bg-slate-950 border-8 border-amber-500/20 text-center space-y-6 overflow-hidden shadow-inner"
            >
              {/* Corner Ornaments */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-600 pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-600 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-600 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-600 pointer-events-none" />

              {/* Header Logo */}
              <div className="flex flex-col items-center justify-center space-y-1">
                <Logo size="medium" showTagline={true} />
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 pt-2">
                  Academic Council of Computer Science & Engineering
                </p>
              </div>

              {/* Certificate Title */}
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 dark:text-white tracking-wide uppercase">
                  Certificate of Mastery & Completion
                </h2>
                <p className="text-xs text-slate-500 italic">
                  This is to officially certify that
                </p>
              </div>

              {/* Recipient Student Name */}
              <div className="py-2 border-b-2 border-indigo-600/40 inline-block px-8">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 dark:text-indigo-300">
                  {activeCert.studentName}
                </h3>
              </div>

              {/* Body Statement */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                has successfully fulfilled all curriculum milestones, interactive lab assignments, and the final assessment for the specialized engineering course:
              </p>

              {/* Course Title */}
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                "{activeCert.courseTitle}"
              </h4>

              <div className="inline-block px-4 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-xs font-black">
                Honors Grade: {activeCert.grade}
              </div>

              {/* Signatures & Seal */}
              <div className="pt-6 grid grid-cols-3 items-end text-xs text-slate-600 dark:text-slate-400 gap-4">
                {/* Instructor */}
                <div className="space-y-1 text-center">
                  <div className="font-serif italic font-bold text-slate-800 dark:text-slate-200 border-b border-slate-300 dark:border-slate-700 pb-1">
                    {activeCert.instructorName}
                  </div>
                  <p className="text-[10px]">Lead Course Instructor</p>
                </div>

                {/* Gold Seal */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-600 text-white flex items-center justify-center shadow-lg border-2 border-amber-200 ring-4 ring-amber-500/20">
                    <Award className="w-8 h-8" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 mt-1">
                    Verified Seal
                  </span>
                </div>

                {/* Dean / Academic Director */}
                <div className="space-y-1 text-center">
                  <div className="font-serif italic font-bold text-slate-800 dark:text-slate-200 border-b border-slate-300 dark:border-slate-700 pb-1">
                    Dr. K. S. Rao
                  </div>
                  <p className="text-[10px]">Dean of Engineering & Placement</p>
                </div>
              </div>

              {/* Verification Footer ID */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>Issue Date: {activeCert.issueDate}</span>
                <span className="font-mono font-bold text-indigo-600">ID: {activeCert.certificateNumber}</span>
                <span>Verify at eduvia.com/verify</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Button
                variant="outline"
                size="small"
                onClick={handleShare}
                leftIcon={<Share2 className="w-4 h-4" />}
              >
                Copy Public Link
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="small"
                  onClick={handlePrint}
                  leftIcon={<Printer className="w-4 h-4" />}
                >
                  Print Certificate
                </Button>
                <Button
                  variant="primary"
                  size="small"
                  onClick={handlePrint}
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
