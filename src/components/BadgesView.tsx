import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Badge, BadgeCategory, BadgeTier, StudentReward } from '../types';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import {
  Award,
  Trophy,
  Zap,
  Star,
  CheckCircle2,
  Lock,
  Sparkles,
  Flame,
  GraduationCap,
  HelpCircle,
  Briefcase,
  Target,
  FileBadge,
  Users,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Share2,
  Download,
  Gift,
  Check,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BadgesViewProps {
  embedded?: boolean;
}

export const BadgesView: React.FC<BadgesViewProps> = ({ embedded = false }) => {
  const { user } = useAuth();
  const { badges, rewards, studentXp, studentLevel, unlockedBadgesCount, claimReward } = useData();
  const toast = useToast();

  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<BadgeTier | 'all'>('all');
  const [filterUnlocked, setFilterUnlocked] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadgeModal, setSelectedBadgeModal] = useState<Badge | null>(null);
  const [activeTab, setActiveTab] = useState<'badges' | 'rewards'>('badges');

  // Filtered badges
  const filteredBadges = badges.filter((b) => {
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    if (selectedTier !== 'all' && b.tier !== selectedTier) return false;
    if (filterUnlocked === 'unlocked' && !b.isUnlocked) return false;
    if (filterUnlocked === 'locked' && b.isUnlocked) return false;
    return true;
  });

  const getTierColors = (tier: BadgeTier) => {
    switch (tier) {
      case 'Bronze':
        return {
          bg: 'bg-amber-500/10 dark:bg-amber-500/20',
          border: 'border-amber-600/30 dark:border-amber-500/40',
          text: 'text-amber-700 dark:text-amber-400',
          badge: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
          glow: 'from-amber-500/20 to-orange-500/10',
          iconColor: 'text-amber-600 dark:text-amber-400',
        };
      case 'Silver':
        return {
          bg: 'bg-slate-500/10 dark:bg-slate-500/20',
          border: 'border-slate-400/40 dark:border-slate-500/40',
          text: 'text-slate-700 dark:text-slate-300',
          badge: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700',
          glow: 'from-slate-400/20 to-zinc-400/10',
          iconColor: 'text-slate-600 dark:text-slate-300',
        };
      case 'Gold':
        return {
          bg: 'bg-yellow-500/10 dark:bg-yellow-500/20',
          border: 'border-yellow-500/40 dark:border-yellow-400/40',
          text: 'text-yellow-700 dark:text-yellow-400',
          badge: 'bg-yellow-100 dark:bg-yellow-950/80 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-800',
          glow: 'from-yellow-400/20 to-amber-500/20',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
        };
      case 'Diamond':
        return {
          bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
          border: 'border-cyan-500/40 dark:border-cyan-400/40',
          text: 'text-cyan-700 dark:text-cyan-400',
          badge: 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800',
          glow: 'from-cyan-400/20 to-blue-500/20',
          iconColor: 'text-cyan-600 dark:text-cyan-400',
        };
    }
  };

  const getBadgeIcon = (iconName: string, tier: BadgeTier) => {
    const tierColors = getTierColors(tier);
    const className = `w-6 h-6 ${tierColors.iconColor}`;

    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'HelpCircle':
        return <HelpCircle className={className} />;
      case 'Target':
        return <Target className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'Trophy':
        return <Trophy className={className} />;
      case 'FileBadge':
        return <FileBadge className={className} />;
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={className} />;
      default:
        return <Star className={className} />;
    }
  };

  const handleClaim = (reward: StudentReward) => {
    if (reward.isClaimed) {
      toast.info('Already Claimed', `Reward code: ${reward.code}`);
      return;
    }

    const success = claimReward(reward.id);
    if (success) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      toast.success('Reward Unlocked! 🎉', `${reward.title} has been claimed. Code: ${reward.code}`);
    } else {
      toast.error('Requirements Not Met', `You need ${reward.requiredXp} XP and ${reward.requiredBadgeCount || 0} badges to claim this perk.`);
    }
  };

  const handleShareBadge = (badge: Badge) => {
    const shareText = `I just earned the "${badge.title}" (${badge.tier} Tier) badge on EduPath Learning & Placement Portal! 🚀 #EduPath #Learning #Achievement`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      toast.success('Badge Achievement Copied!', 'Share text copied to clipboard for LinkedIn or Twitter.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Level, XP, and Gamification Summary */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 border border-indigo-900/60 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Col 1: Student Level Rank */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-xs font-semibold text-indigo-300">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Student Achievement Level</span>
            </div>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Level {studentLevel.level}
                </span>
                <span className="text-sm font-semibold text-amber-400 px-2.5 py-0.5 rounded-lg bg-amber-400/10 border border-amber-400/20">
                  {studentLevel.title}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Keep learning, acing quizzes, and building your ATS resume to level up.
              </p>
            </div>
          </div>

          {/* Col 2: Level XP Progress */}
          <div className="space-y-2 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 fill-current" />
                Total Experience
              </span>
              <span className="font-bold text-white font-mono text-sm">{studentXp} XP</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 rounded-full transition-all duration-700"
                style={{ width: `${studentLevel.progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Current: {studentLevel.currentLevelXp} XP</span>
              <span>Next Rank: {studentLevel.nextLevelXp} XP ({studentLevel.progressPercent}%)</span>
            </div>
          </div>

          {/* Col 3: Key Stats Counters */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {unlockedBadgesCount} / {badges.length}
              </div>
              <p className="text-[11px] font-medium text-slate-300 mt-0.5">Badges Unlocked</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                {rewards.filter((r) => r.isClaimed).length} / {rewards.length}
              </div>
              <p className="text-[11px] font-medium text-slate-300 mt-0.5">Perks Claimed</p>
            </div>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Navigation Sub-Tabs: Badges Collection vs Rewards Shop */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            id="tab-badges-collection"
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'badges'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            Badges Catalog ({unlockedBadgesCount}/{badges.length})
          </button>

          <button
            id="tab-rewards-perks"
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'rewards'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-500" />
            Claimable Rewards & Perks ({rewards.filter((r) => r.isClaimed).length}/{rewards.length})
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Earn XP from lessons & quizzes to unlock tiers</span>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'badges' ? (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400 mr-1">Category:</span>
              {[
                { id: 'all', label: 'All Badges' },
                { id: 'course', label: '🎓 Courses' },
                { id: 'quiz', label: '🎯 Quizzes' },
                { id: 'placement', label: '💼 Placement' },
                { id: 'streak', label: '⚡ Labs' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Status:</span>
              <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'unlocked', label: 'Unlocked' },
                  { id: 'locked', label: 'Locked' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setFilterUnlocked(st.id as any)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                      filterUnlocked === st.id
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBadges.map((badge) => {
              const colors = getTierColors(badge.tier);
              const progressPercent = Math.min(100, Math.round((badge.progress / badge.maxProgress) * 100));

              return (
                <div
                  key={badge.id}
                  id={`badge-card-${badge.id}`}
                  onClick={() => setSelectedBadgeModal(badge)}
                  className={`group relative rounded-2xl border p-5 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between ${
                    badge.isUnlocked
                      ? 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 shadow-xs hover:shadow-md'
                      : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Top Bar: Icon + Tier Pill + XP */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colors.bg} ${colors.border} transition-transform group-hover:scale-105`}
                      >
                        {badge.isUnlocked ? (
                          getBadgeIcon(badge.iconName, badge.tier)
                        ) : (
                          <div className="relative">
                            <div className="opacity-40">{getBadgeIcon(badge.iconName, badge.tier)}</div>
                            <Lock className="w-3.5 h-3.5 text-slate-400 absolute -bottom-1 -right-1" />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors.badge}`}
                        >
                          {badge.tier}
                        </span>
                        <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                          +{badge.xpReward} XP
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        {badge.title}
                        {badge.isUnlocked && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: Progress or Unlocked Timestamp */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                    {badge.isUnlocked ? (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Earned & Active
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">Click to inspect</span>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 font-medium">Progress</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            {badge.progress} / {badge.maxProgress} ({progressPercent}%)
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {badge.perkDescription && (
                      <p className="text-[10px] text-indigo-600 dark:text-indigo-300/80 bg-indigo-50/50 dark:bg-indigo-950/40 p-1.5 rounded-lg">
                        <strong>Perk:</strong> {badge.perkDescription}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBadges.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Badges Match Your Filters</h4>
              <p className="text-xs text-slate-400 mt-1">Try changing category or unlocking status filters.</p>
            </div>
          )}

          {/* Quick Action Guide to Earn More XP */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-3xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Ways to Earn More Badges & High Placement Score
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Complete pending video lectures, score &gt;90% on module quizzes, or polish your ATS resume.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link to="/app/student/quizzes">
                  <Button size="small" variant="primary">
                    Take Quiz (+120 XP)
                  </Button>
                </Link>
                <Link to="/app/student/courses">
                  <Button size="small" variant="outline">
                    Finish Course (+150 XP)
                  </Button>
                </Link>
                <Link to="/app/student/resume">
                  <Button size="small" variant="secondary">
                    ATS Resume (+150 XP)
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Rewards & Perks Store Tab */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward) => {
              const canClaim =
                studentXp >= reward.requiredXp &&
                (!reward.requiredBadgeCount || unlockedBadgesCount >= reward.requiredBadgeCount);

              return (
                <div
                  key={reward.id}
                  id={`reward-card-${reward.id}`}
                  className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                    reward.isClaimed
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/30'
                      : canClaim
                      ? 'bg-white dark:bg-slate-900 border-indigo-500/40 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-90'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                        <Gift className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      </div>

                      {reward.isClaimed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          <Check className="w-3.5 h-3.5" /> Claimed
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          Requires {reward.requiredXp} XP
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {reward.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {reward.description}
                      </p>
                    </div>

                    {reward.isClaimed && reward.code && (
                      <div className="p-2.5 rounded-xl bg-emerald-100/60 dark:bg-emerald-950/60 border border-emerald-300/60 dark:border-emerald-800/60 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-600 dark:text-slate-300 text-[11px]">Voucher Code:</span>
                        <span className="font-bold text-emerald-800 dark:text-emerald-300">{reward.code}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500">
                      {reward.requiredBadgeCount ? (
                        <span>Min {reward.requiredBadgeCount} Badges required</span>
                      ) : (
                        <span>Unlocked by XP level</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleClaim(reward)}
                      disabled={reward.isClaimed || !canClaim}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        reward.isClaimed
                          ? 'bg-emerald-600 text-white opacity-80 cursor-default'
                          : canClaim
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {reward.isClaimed ? 'Perk Active' : canClaim ? 'Claim Perk Now' : 'Locked'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal: Badge Detailed View & Sharing */}
      {selectedBadgeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
          onClick={() => setSelectedBadgeModal(null)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Emblem */}
            <div className="text-center space-y-3 pt-2">
              <div
                className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center border-2 shadow-lg ${
                  getTierColors(selectedBadgeModal.tier).bg
                } ${getTierColors(selectedBadgeModal.tier).border}`}
              >
                {getBadgeIcon(selectedBadgeModal.iconName, selectedBadgeModal.tier)}
              </div>

              <div>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    getTierColors(selectedBadgeModal.tier).badge
                  }`}
                >
                  {selectedBadgeModal.tier} Tier Badge
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-2">
                  {selectedBadgeModal.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  {selectedBadgeModal.description}
                </p>
              </div>
            </div>

            {/* Badge Specs Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Reward Value</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">+{selectedBadgeModal.xpReward} XP</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Category</span>
                <span className="font-bold text-slate-700 dark:text-slate-300 capitalize">{selectedBadgeModal.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status</span>
                <span
                  className={`font-bold ${
                    selectedBadgeModal.isUnlocked
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {selectedBadgeModal.isUnlocked ? 'Unlocked & Verified' : 'In Progress'}
                </span>
              </div>
              {selectedBadgeModal.perkDescription && (
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-indigo-600 dark:text-indigo-300">
                  <strong>Special Privilege:</strong> {selectedBadgeModal.perkDescription}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {selectedBadgeModal.isUnlocked ? (
                <>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => handleShareBadge(selectedBadgeModal)}
                  >
                    <Share2 className="w-4 h-4 mr-1.5" /> Share Achievement
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      setSelectedBadgeModal(null);
                      toast.success('Badge Synced', 'This badge is verified on your public student profile.');
                    }}
                  >
                    Done
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => setSelectedBadgeModal(null)}
                >
                  Close
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
