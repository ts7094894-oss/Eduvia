import React from 'react';
import { BadgesView } from '../components/BadgesView';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, ShieldCheck } from 'lucide-react';

export const Badges: React.FC = () => {
  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <Link to="/app/student" className="hover:text-indigo-600">
              Student Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-700 dark:text-slate-200">Badges & Gamified Rewards</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Award className="w-7 h-7 text-indigo-600" />
            Student Badges & Rewards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Earn verifiable badges, build up your total XP, and unlock real placement and learning perks.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>EDUVIA Verified Credentials Engine</span>
        </div>
      </div>

      {/* Badges and Rewards System View */}
      <BadgesView />
    </div>
  );
};
