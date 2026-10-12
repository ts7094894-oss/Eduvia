import React from 'react';
import { Play, CheckCircle2, Clock, Bookmark, ChevronRight } from 'lucide-react';
import { VideoChapter } from '../../types';
import { formatTimeSeconds } from '../../services/videoService';

interface VideoChaptersListProps {
  chapters: VideoChapter[];
  currentTimeSeconds: number;
  onSeekToChapter: (timestamp: number) => void;
}

export const VideoChaptersList: React.FC<VideoChaptersListProps> = ({
  chapters,
  currentTimeSeconds,
  onSeekToChapter,
}) => {
  if (!chapters || chapters.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-slate-400">
        No chapter markers available for this video lesson.
      </div>
    );
  }

  // Find active chapter
  const sorted = [...chapters].sort((a, b) => a.timestamp - b.timestamp);
  let activeIndex = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (currentTimeSeconds >= sorted[i].timestamp) {
      activeIndex = i;
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800">
        <span className="font-bold text-slate-900 dark:text-white">
          Video Chapters ({chapters.length})
        </span>
        <span className="text-slate-400 text-[11px]">Click to jump to topic</span>
      </div>

      <div className="space-y-2">
        {sorted.map((chapter, idx) => {
          const isActive = idx === activeIndex;
          const isPassed = currentTimeSeconds > chapter.timestamp + 5;

          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onSeekToChapter(chapter.timestamp)}
              className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/80 shadow-xs'
                  : 'bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isPassed
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {isPassed && !isActive ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-xs truncate ${
                      isActive
                        ? 'font-bold text-indigo-900 dark:text-indigo-200'
                        : 'font-semibold text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {chapter.title}
                  </p>
                  {chapter.description && (
                    <p className="text-[11px] text-slate-400 truncate">
                      {chapter.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pl-2">
                <span
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold ${
                    isActive
                      ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400'
                  }`}
                >
                  {chapter.formattedTime || formatTimeSeconds(chapter.timestamp)}
                </span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400 translate-x-0.5' : 'text-slate-300 dark:text-slate-600'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
