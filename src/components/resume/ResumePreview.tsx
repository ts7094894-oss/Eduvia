import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  ExternalLink,
  Award,
  CheckCircle2,
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles,
  Trophy,
  Languages,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import { ResumeData, ResumeTemplate, ResumeSkill } from '../../types';

interface ResumePreviewProps {
  resume: ResumeData;
  template?: ResumeTemplate;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  template = 'professional',
}) => {
  const [zoom, setZoom] = useState<number>(100);

  const {
    personalInfo,
    summary,
    education = [],
    experience = [],
    internships = [],
    projects = [],
    skills = [],
    categorizedSkills = [],
    certifications = [],
    achievements = [],
    languages = [],
    careerInterests = [],
  } = resume;

  // Flatten all skills for display
  const allSkills: string[] =
    categorizedSkills.length > 0
      ? categorizedSkills.map((s) => s.name)
      : Array.isArray(skills)
      ? skills
      : [];

  // Categorize for templates that benefit from grouping
  const skillsByGroup: Record<string, string[]> = {};
  if (categorizedSkills.length > 0) {
    categorizedSkills.forEach((s) => {
      if (!skillsByGroup[s.category]) {
        skillsByGroup[s.category] = [];
      }
      skillsByGroup[s.category].push(s.name);
    });
  }

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Preview Top Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-100 dark:bg-slate-800/80 rounded-2xl text-xs text-slate-600 dark:text-slate-300 no-print">
        <div className="flex items-center gap-2 font-semibold">
          <span className="capitalize">{template}</span>
          <span className="text-slate-400">•</span>
          <span className="text-[11px] text-slate-500">A4 Live Document</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setZoom((prev) => Math.max(70, prev - 10))}
            className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1 min-w-[36px] text-center">
            {zoom}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((prev) => Math.min(130, prev + 10))}
            className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(100)}
            className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 transition-colors"
            title="Reset Zoom"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Outer Scaled Canvas Container */}
      <div className="flex-1 overflow-auto p-2 sm:p-4 bg-slate-200/60 dark:bg-slate-950/60 rounded-3xl border border-slate-200 dark:border-slate-800 flex justify-center">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="transition-transform duration-150"
        >
          {/* Printable Resume Sheet */}
          <div
            id="resume-preview-sheet"
            className="printable-area w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl p-8 sm:p-10 text-[11px] leading-normal font-sans border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0"
            style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
          >
            {/* RENDER TEMPLATE */}
            {template === 'professional' && (
              <ProfessionalTemplate
                personalInfo={personalInfo}
                summary={summary}
                education={education}
                experience={experience}
                internships={internships}
                projects={projects}
                allSkills={allSkills}
                skillsByGroup={skillsByGroup}
                certifications={certifications}
                achievements={achievements}
                languages={languages}
              />
            )}

            {template === 'modern' && (
              <ModernTemplate
                personalInfo={personalInfo}
                summary={summary}
                education={education}
                experience={experience}
                internships={internships}
                projects={projects}
                allSkills={allSkills}
                skillsByGroup={skillsByGroup}
                certifications={certifications}
                achievements={achievements}
                languages={languages}
              />
            )}

            {template === 'minimal' && (
              <MinimalTemplate
                personalInfo={personalInfo}
                summary={summary}
                education={education}
                experience={experience}
                internships={internships}
                projects={projects}
                allSkills={allSkills}
                skillsByGroup={skillsByGroup}
                certifications={certifications}
                achievements={achievements}
                languages={languages}
              />
            )}

            {template === 'ats' && (
              <AtsFriendlyTemplate
                personalInfo={personalInfo}
                summary={summary}
                education={education}
                experience={experience}
                internships={internships}
                projects={projects}
                allSkills={allSkills}
                skillsByGroup={skillsByGroup}
                certifications={certifications}
                achievements={achievements}
                languages={languages}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   TEMPLATE 1: PROFESSIONAL (Classic Corporate & Academic)
   ========================================================= */
interface TemplateProps {
  personalInfo: ResumeData['personalInfo'];
  summary: string;
  education: ResumeData['education'];
  experience: ResumeData['experience'];
  internships: ResumeData['internships'];
  projects: ResumeData['projects'];
  allSkills: string[];
  skillsByGroup: Record<string, string[]>;
  certifications: ResumeData['certifications'];
  achievements: ResumeData['achievements'];
  languages: ResumeData['languages'];
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({
  personalInfo,
  summary,
  education,
  experience,
  internships,
  projects,
  allSkills,
  skillsByGroup,
  certifications,
  achievements,
  languages,
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="border-b-2 border-slate-800 pb-3 text-center">
        <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        {personalInfo.professionalTitle && (
          <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase mt-0.5">
            {personalInfo.professionalTitle}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-slate-600 mt-2 font-medium">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-2.5 h-2.5" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-2.5 h-2.5" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-2.5 h-2.5" />
              {personalInfo.linkedin.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="w-2.5 h-2.5" />
              {personalInfo.github.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="w-2.5 h-2.5" />
              {personalInfo.portfolio.replace(/^https?:\/\//, '')}
            </span>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <section className="space-y-1">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Professional Summary
          </h2>
          <p className="text-[10.5px] text-slate-700 leading-relaxed text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start text-[10.5px]">
                <div>
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-700 font-medium">
                    {edu.institution || edu.college}
                    {edu.specialization ? ` — ${edu.specialization}` : ''}
                  </div>
                  {edu.cgpa && (
                    <div className="text-slate-600 text-[10px]">CGPA / Score: {edu.cgpa}</div>
                  )}
                </div>
                <div className="text-right shrink-0 text-[10px] text-slate-600">
                  <div className="font-semibold">
                    {edu.startYear || edu.startDate} – {edu.graduationYear || edu.endDate}
                  </div>
                  {edu.location && <div>{edu.location}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {allSkills.length > 0 && (
        <section className="space-y-1.5">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Technical Skills
          </h2>
          {Object.keys(skillsByGroup).length > 0 ? (
            <div className="space-y-1 text-[10.5px]">
              {Object.entries(skillsByGroup).map(([group, list]: [string, string[]]) => (
                <div key={group} className="flex">
                  <span className="font-bold text-slate-900 min-w-[140px] shrink-0">
                    {group}:
                  </span>
                  <span className="text-slate-700">{list.join(', ')}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[10.5px] text-slate-700">{allSkills.join(', ')}</p>
          )}
        </section>
      )}

      {/* Technical Projects */}
      {projects.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Projects
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id} className="text-[10.5px] space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">
                    {proj.name || proj.title}
                    {proj.role && <span className="font-normal text-slate-600"> | {proj.role}</span>}
                  </span>
                  <div className="text-[10px] text-slate-600 space-x-2">
                    {proj.link && <span>{proj.link.replace(/^https?:\/\//, '')}</span>}
                    {proj.githubLink && <span>{proj.githubLink.replace(/^https?:\/\//, '')}</span>}
                  </div>
                </div>
                <div className="text-[10px] font-semibold text-slate-800">
                  Tech Stack: <span className="font-normal">{proj.technologies}</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-justify">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Experience
          </h2>
          <div className="space-y-2">
            {experience.map((exp) => (
              <div key={exp.id} className="text-[10.5px] space-y-0.5">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>
                    {exp.position || exp.role} <span className="font-medium text-slate-600">at {exp.company}</span>
                  </span>
                  <span className="text-[10px] text-slate-600 font-normal">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} {exp.location ? `| ${exp.location}` : ''}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internships */}
      {internships && internships.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Internships
          </h2>
          <div className="space-y-2">
            {internships.map((item) => (
              <div key={item.id} className="text-[10.5px] space-y-0.5">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>
                    {item.role} <span className="font-medium text-slate-600">at {item.company}</span>
                  </span>
                  <span className="text-[10px] text-slate-600 font-normal">
                    {item.startDate} – {item.endDate} {item.location ? `| ${item.location}` : ''}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed text-justify">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="space-y-1.5">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Certifications
          </h2>
          <div className="space-y-1 text-[10.5px]">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{cert.name}</span>
                  <span className="text-slate-600"> — {cert.issuer}</span>
                  {cert.isEduviaVerified && (
                    <span className="text-[9px] font-bold text-indigo-700 ml-1">
                      [EduPath Verified]
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500">
                  {cert.issueDate || cert.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements & Languages Split Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {achievements.length > 0 && (
          <section className="space-y-1">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
              Achievements & Honors
            </h2>
            <ul className="list-disc list-inside space-y-0.5 text-[10px] text-slate-700">
              {achievements.map((ach, idx) => {
                const title = typeof ach === 'string' ? ach : ach.title;
                const desc = typeof ach === 'string' ? '' : ach.description;
                return (
                  <li key={idx}>
                    <span className="font-semibold text-slate-800">{title}</span>
                    {desc ? `: ${desc}` : ''}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {languages.length > 0 && (
          <section className="space-y-1">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2 text-[10px] text-slate-700">
              {languages.map((lang, idx) => {
                const name = typeof lang === 'string' ? lang : `${lang.name} (${lang.proficiency})`;
                return (
                  <span key={idx} className="font-medium">
                    {name}
                    {idx < languages.length - 1 ? ' •' : ''}
                  </span>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   TEMPLATE 2: MODERN (Contemporary Styling & Badges)
   ========================================================= */
const ModernTemplate: React.FC<TemplateProps> = ({
  personalInfo,
  summary,
  education,
  experience,
  internships,
  projects,
  allSkills,
  certifications,
  achievements,
  languages,
}) => {
  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border-l-4 border-indigo-600">
        {personalInfo.profilePhoto && (
          <img
            src={personalInfo.profilePhoto}
            alt={personalInfo.fullName}
            className="w-16 h-16 rounded-xl object-cover ring-2 ring-indigo-600/20"
          />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-xs font-bold text-indigo-600">
            {personalInfo.professionalTitle || 'Software Engineer'}
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500 mt-1.5 font-medium">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.linkedin && (
              <span>• {personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
            )}
            {personalInfo.github && (
              <span>• {personalInfo.github.replace(/^https?:\/\//, '')}</span>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="text-[10.5px] text-slate-700 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100">
          <span className="font-bold text-indigo-700">PROFILE: </span>
          {summary}
        </div>
      )}

      {/* Skills Badges */}
      {allSkills.length > 0 && (
        <section className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            Core Competencies & Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {allSkills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-[10px]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            Featured Technical Projects
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id} className="p-3 rounded-xl bg-slate-50/60 border border-slate-100 space-y-1 text-[10.5px]">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{proj.name || proj.title}</span>
                  {proj.role && <span className="text-[10px] text-indigo-600 font-semibold">{proj.role}</span>}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  {proj.technologies}
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience & Internships */}
      {(experience.length > 0 || (internships && internships.length > 0)) && (
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            Experience & Practical Training
          </h2>
          <div className="space-y-2">
            {experience.map((exp) => (
              <div key={exp.id} className="text-[10.5px] space-y-0.5">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.position || exp.role} <span className="font-normal text-slate-600">at {exp.company}</span></span>
                  <span className="text-[10px] text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}

            {internships &&
              internships.map((intern) => (
                <div key={intern.id} className="text-[10.5px] space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{intern.role} <span className="font-normal text-slate-600">at {intern.company} (Internship)</span></span>
                    <span className="text-[10px] text-slate-500">{intern.startDate} – {intern.endDate}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{intern.description}</p>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Education & Certifications Side by Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {education.length > 0 && (
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              Education
            </h2>
            <div className="space-y-1.5 text-[10.5px]">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600 text-[10px]">{edu.institution || edu.college}</div>
                  <div className="text-slate-500 text-[9px]">{edu.startYear} – {edu.graduationYear} {edu.cgpa ? `• CGPA: ${edu.cgpa}` : ''}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              Certifications
            </h2>
            <div className="space-y-1 text-[10.5px]">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-bold text-slate-900">{cert.name}</div>
                  <div className="text-slate-600 text-[10px]">{cert.issuer} • {cert.issueDate || cert.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Achievements & Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {achievements.length > 0 && (
          <div className="text-[10px] text-slate-700 space-y-1">
            <span className="font-bold uppercase tracking-wider text-indigo-700 block text-xs">
              Achievements
            </span>
            <ul className="list-disc list-inside space-y-0.5">
              {achievements.map((ach, i) => (
                <li key={i}>{typeof ach === 'string' ? ach : `${ach.title} (${ach.date})`}</li>
              ))}
            </ul>
          </div>
        )}

        {languages.length > 0 && (
          <div className="text-[10px] text-slate-700 space-y-1">
            <span className="font-bold uppercase tracking-wider text-indigo-700 block text-xs">
              Languages
            </span>
            <p>
              {languages
                .map((l) => (typeof l === 'string' ? l : `${l.name} (${l.proficiency})`))
                .join(' • ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   TEMPLATE 3: MINIMAL (Monochrome & Generous Space)
   ========================================================= */
const MinimalTemplate: React.FC<TemplateProps> = ({
  personalInfo,
  summary,
  education,
  experience,
  internships,
  projects,
  allSkills,
  certifications,
  achievements,
  languages,
}) => {
  return (
    <div className="space-y-5 font-serif text-slate-900">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-normal tracking-tight text-slate-900 font-sans">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-xs text-slate-600 font-sans mt-0.5">
          {personalInfo.professionalTitle}
        </p>
        <p className="text-[10px] text-slate-500 font-sans mt-1">
          {[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.linkedin?.replace(/^https?:\/\//, ''),
            personalInfo.github?.replace(/^https?:\/\//, ''),
          ]
            .filter(Boolean)
            .join('  /  ')}
        </p>
      </div>

      <div className="border-t border-slate-200" />

      {/* Summary */}
      {summary && (
        <section className="space-y-1">
          <p className="text-[10.5px] text-slate-700 leading-relaxed font-sans text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {(experience.length > 0 || (internships && internships.length > 0)) && (
        <section className="space-y-2">
          <h2 className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-500">
            Experience & Internships
          </h2>
          <div className="space-y-2 font-sans text-[10.5px]">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-0.5">
                <div className="flex justify-between font-bold">
                  <span>{exp.position} — {exp.company}</span>
                  <span className="font-normal text-slate-500 text-[10px]">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
            {internships &&
              internships.map((item) => (
                <div key={item.id} className="space-y-0.5">
                  <div className="flex justify-between font-bold">
                    <span>{item.role} — {item.company}</span>
                    <span className="font-normal text-slate-500 text-[10px]">{item.startDate} – {item.endDate}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-500">
            Selected Projects
          </h2>
          <div className="space-y-2 font-sans text-[10.5px]">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between font-bold">
                  <span>{proj.name || proj.title}</span>
                  <span className="font-normal text-slate-500 text-[10px]">{proj.technologies}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-500">
            Education
          </h2>
          <div className="space-y-1.5 font-sans text-[10.5px]">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-bold">{edu.degree}</span>, {edu.institution || edu.college}
                  {edu.cgpa && <span className="text-slate-500 text-[10px]"> (CGPA: {edu.cgpa})</span>}
                </div>
                <span className="text-slate-500 text-[10px]">{edu.startYear} – {edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <section className="space-y-1">
          <h2 className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-500">
            Skills
          </h2>
          <p className="font-sans text-[10.5px] text-slate-700 leading-relaxed">
            {allSkills.join('  •  ')}
          </p>
        </section>
      )}

      {/* Certifications & Awards */}
      {(certifications.length > 0 || achievements.length > 0) && (
        <section className="space-y-1 font-sans text-[10px] text-slate-600">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Certifications & Honors
          </h2>
          <p>
            {certifications.map((c) => c.name).concat(achievements.map((a) => (typeof a === 'string' ? a : a.title))).join('  /  ')}
          </p>
        </section>
      )}
    </div>
  );
};

/* =========================================================
   TEMPLATE 4: ATS FRIENDLY (Pure Linear 1-Column Format)
   ========================================================= */
const AtsFriendlyTemplate: React.FC<TemplateProps> = ({
  personalInfo,
  summary,
  education,
  experience,
  internships,
  projects,
  allSkills,
  skillsByGroup,
  certifications,
  achievements,
  languages,
}) => {
  return (
    <div className="space-y-3.5 font-sans text-slate-900">
      {/* Header */}
      <div className="text-center pb-2 border-b border-black">
        <h1 className="text-xl font-bold uppercase text-black">
          {personalInfo.fullName || 'YOUR FULL NAME'}
        </h1>
        {personalInfo.professionalTitle && (
          <div className="text-xs font-semibold text-black uppercase mt-0.5">
            {personalInfo.professionalTitle}
          </div>
        )}
        <div className="text-[10px] text-black mt-1">
          {[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.linkedin,
            personalInfo.github,
            personalInfo.portfolio,
          ]
            .filter(Boolean)
            .join(' | ')}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase border-b border-black text-black">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-[10px] text-black leading-relaxed text-justify">{summary}</p>
        </div>
      )}

      {/* Technical Skills */}
      {allSkills.length > 0 && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase border-b border-black text-black">
            TECHNICAL SKILLS
          </h2>
          {Object.keys(skillsByGroup).length > 0 ? (
            <div className="space-y-0.5 text-[10px] text-black">
              {Object.entries(skillsByGroup).map(([grp, sks]: [string, string[]]) => (
                <div key={grp}>
                  <span className="font-bold">{grp}: </span>
                  <span>{sks.join(', ')}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-black">{allSkills.join(', ')}</p>
          )}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase border-b border-black text-black">
            EDUCATION
          </h2>
          <div className="space-y-1.5 text-[10px] text-black">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold">{edu.degree}</span> — {edu.institution || edu.college}
                  {edu.specialization && ` (${edu.specialization})`}
                  {edu.cgpa && ` | CGPA: ${edu.cgpa}`}
                </div>
                <div className="shrink-0 font-medium">
                  {edu.startYear} – {edu.graduationYear}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase border-b border-black text-black">
            PROJECTS
          </h2>
          <div className="space-y-1.5 text-[10px] text-black">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline font-bold">
                  <span>
                    {proj.name || proj.title} {proj.role ? `(${proj.role})` : ''}
                  </span>
                  <span className="font-normal">{proj.technologies}</span>
                </div>
                <p className="text-black leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience & Internships */}
      {(experience.length > 0 || (internships && internships.length > 0)) && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase border-b border-black text-black">
            EXPERIENCE & INTERNSHIPS
          </h2>
          <div className="space-y-1.5 text-[10px] text-black">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline font-bold">
                  <span>{exp.position || exp.role}, {exp.company}</span>
                  <span className="font-medium text-[9px]">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="leading-relaxed">{exp.description}</p>
              </div>
            ))}

            {internships &&
              internships.map((intern) => (
                <div key={intern.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold">
                    <span>{intern.role}, {intern.company} (Intern)</span>
                    <span className="font-medium text-[9px]">{intern.startDate} – {intern.endDate}</span>
                  </div>
                  <p className="leading-relaxed">{intern.description}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase border-b border-black text-black">
            CERTIFICATIONS
          </h2>
          <div className="space-y-0.5 text-[10px] text-black">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <span>
                  <span className="font-bold">{cert.name}</span> — {cert.issuer}
                </span>
                <span>{cert.issueDate || cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements & Languages */}
      <div className="grid grid-cols-2 gap-4 pt-1">
        {achievements.length > 0 && (
          <div className="space-y-0.5 text-[10px] text-black">
            <h2 className="font-bold uppercase border-b border-black">ACHIEVEMENTS</h2>
            <ul className="list-disc list-inside">
              {achievements.map((a, i) => (
                <li key={i}>{typeof a === 'string' ? a : a.title}</li>
              ))}
            </ul>
          </div>
        )}

        {languages.length > 0 && (
          <div className="space-y-0.5 text-[10px] text-black">
            <h2 className="font-bold uppercase border-b border-black">LANGUAGES</h2>
            <p>
              {languages
                .map((l) => (typeof l === 'string' ? l : `${l.name} (${l.proficiency})`))
                .join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
