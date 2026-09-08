import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Award, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '../Button';
import { ResumeCertification, Certificate } from '../../types';

interface CertificationFormProps {
  certifications: ResumeCertification[];
  onAdd: (cert: ResumeCertification) => void;
  onUpdate: (id: string, cert: ResumeCertification) => void;
  onDelete: (id: string) => void;
  eduviaCertificates?: Certificate[];
}

export const CertificationForm: React.FC<CertificationFormProps> = ({
  certifications,
  onAdd,
  onUpdate,
  onDelete,
  eduviaCertificates = [],
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formState, setFormState] = useState<Omit<ResumeCertification, 'id'>>({
    name: '',
    issuer: '',
    issueDate: '2026',
    certificateId: '',
    certificateUrl: '',
    isEduviaVerified: false,
  });

  const resetForm = () => {
    setFormState({
      name: '',
      issuer: '',
      issueDate: '2026',
      certificateId: '',
      certificateUrl: '',
      isEduviaVerified: false,
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartEdit = (cert: ResumeCertification) => {
    setEditingId(cert.id);
    setIsAdding(false);
    setFormState({
      name: cert.name,
      issuer: cert.issuer,
      issueDate: cert.issueDate || cert.date || '2026',
      certificateId: cert.certificateId || '',
      certificateUrl: cert.certificateUrl || '',
      isEduviaVerified: Boolean(cert.isEduviaVerified),
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.issuer.trim()) return;

    if (editingId) {
      onUpdate(editingId, {
        id: editingId,
        ...formState,
      });
      setEditingId(null);
    } else {
      onAdd({
        id: `cert-${Date.now()}`,
        ...formState,
      });
      setIsAdding(false);
    }
    resetForm();
  };

  // Find unimported EDUVIA certificates
  const unimportedEduviaCerts = eduviaCertificates.filter(
    (eCert) =>
      !certifications.some(
        (c) =>
          c.name.toLowerCase() === eCert.courseTitle.toLowerCase() ||
          (c.certificateId && c.certificateId === eCert.certificateId)
      )
  );

  const handleImportEduviaCert = (eCert: Certificate) => {
    onAdd({
      id: `cert-eduvia-${Date.now()}`,
      name: eCert.courseTitle,
      issuer: 'EduPath Learning Platform',
      issueDate: eCert.issueDate,
      certificateId: eCert.certificateId || eCert.certificateNumber || 'EDUPATH-VERIFIED',
      certificateUrl: eCert.verificationUrl || `https://edupath.edu/verify/${eCert.certificateId}`,
      isEduviaVerified: true,
    });
  };

  return (
    <div className="space-y-4 text-xs">
      {/* EduPath Earned Certificates Suggestions */}
      {unimportedEduviaCerts.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Available Verified Certificates from your EduPath Learning Records:</span>
          </div>

          <div className="space-y-1.5">
            {unimportedEduviaCerts.map((ecert) => (
              <div
                key={ecert.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/70 text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {ecert.courseTitle}
                    </span>
                    <span className="text-slate-400 text-[10px] ml-2">
                      Issued {ecert.issueDate} • ID: {ecert.certificateId || 'Verified'}
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  size="small"
                  variant="outline"
                  onClick={() => handleImportEduviaCert(ecert)}
                  leftIcon={<Plus className="w-3 h-3" />}
                >
                  Add to Resume
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications List */}
      <div className="space-y-3">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start justify-between gap-3 group"
          >
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {cert.name}
                </h4>
                {cert.isEduviaVerified ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                    <CheckCircle2 className="w-3 h-3" />
                    EduPath Verified
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-[10px]">
                    External
                  </span>
                )}
              </div>

              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {cert.issuer}
              </p>

              <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1 flex-wrap">
                <span>Issued: {cert.issueDate || cert.date}</span>
                {cert.certificateId && <span>ID: {cert.certificateId}</span>}
                {cert.certificateUrl && (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 flex items-center gap-1 text-indigo-500 font-medium"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleStartEdit(cert)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Edit Certificate"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(cert.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Delete Certificate"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {certifications.length === 0 && !isAdding && (
          <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <Award className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-slate-500 text-xs">No certifications added yet.</p>
            <Button
              type="button"
              size="small"
              variant="outline"
              onClick={() => setIsAdding(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Certification
            </Button>
          </div>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      {(isAdding || editingId) && (
        <form
          onSubmit={handleSave}
          className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-3 animate-in fade-in-50"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Certification' : 'Add New Certification'}
            </h4>
            <button
              type="button"
              onClick={resetForm}
              className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Certificate Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AWS Certified Cloud Practitioner / Python Masterclass"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Issuing Organization *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. EduPath / Amazon Web Services / Google"
                value={formState.issuer}
                onChange={(e) => setFormState({ ...formState, issuer: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Issue Date
              </label>
              <input
                type="text"
                placeholder="e.g. Aug 2026"
                value={formState.issueDate}
                onChange={(e) => setFormState({ ...formState, issueDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Credential ID
              </label>
              <input
                type="text"
                placeholder="e.g. CERT-982741"
                value={formState.certificateId}
                onChange={(e) => setFormState({ ...formState, certificateId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Credential Verification URL
              </label>
              <input
                type="url"
                placeholder="https://edupath.edu/verify/..."
                value={formState.certificateUrl}
                onChange={(e) => setFormState({ ...formState, certificateUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" size="small" variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" size="small" variant="primary">
              {editingId ? 'Update Certificate' : 'Save Certificate'}
            </Button>
          </div>
        </form>
      )}

      {!isAdding && !editingId && (
        <Button
          type="button"
          size="small"
          variant="outline"
          onClick={() => setIsAdding(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Certification
        </Button>
      )}
    </div>
  );
};
