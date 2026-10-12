import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  RotateCcw,
  BookOpen,
  Tv,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { VideoChapter } from '../../types';
import { resolveYouTubeResource, YouTubeResource } from '../../data/youtubeResources';

export interface VideoPlayerProps {
  videoUrl?: string;
  backupVideoUrl?: string;
  title: string;
  durationString: string;
  chapters?: VideoChapter[];
  initialSeekSeconds?: number;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onLessonCompleted?: () => void;
  onNextLesson?: () => void;
  hasNextLesson?: boolean;

  // Dedicated YouTube Learning Fields
  youtubeVideoId?: string;
  youtubeUrl?: string;
  isVerifiedVideo?: boolean;
  channelTitle?: string;
  topic?: string;
  thumbnailUrl?: string;
  searchQuery?: string;
  courseTitle?: string;
  lessonId?: string;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  durationString,
  chapters = [],
  onLessonCompleted,
  onNextLesson,
  hasNextLesson = false,

  youtubeVideoId: propYoutubeVideoId,
  youtubeUrl: propYoutubeUrl,
  isVerifiedVideo: propIsVerifiedVideo,
  channelTitle: propChannelTitle,
  topic: propTopic,
  thumbnailUrl: propThumbnailUrl,
  searchQuery: propSearchQuery,
  courseTitle = 'Course',
  lessonId,
  isCompleted = false,
  onToggleComplete,
}) => {
  const [iframeError, setIframeError] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'player' | 'details' | 'chapters'>('player');

  // Resolve YouTube resource metadata
  const ytResource: YouTubeResource = React.useMemo(() => {
    // If explicitly provided as prop
    if (propYoutubeVideoId && propIsVerifiedVideo) {
      return {
        isVerifiedVideo: true,
        videoTitle: title,
        channelTitle: propChannelTitle || 'Verified Educational Channel',
        topic: propTopic || title,
        youtubeVideoId: propYoutubeVideoId,
        youtubeUrl: propYoutubeUrl || `https://www.youtube.com/watch?v=${propYoutubeVideoId}`,
        thumbnailUrl:
          propThumbnailUrl || `https://img.youtube.com/vi/${propYoutubeVideoId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${propYoutubeVideoId}?rel=0`,
        searchQuery: propSearchQuery || `${courseTitle} ${title}`,
        isSearchResult: false,
      };
    }

    // Resolve via registry using course and lesson
    return resolveYouTubeResource(courseTitle, title, lessonId, propYoutubeVideoId);
  }, [
    propYoutubeVideoId,
    propIsVerifiedVideo,
    propChannelTitle,
    propTopic,
    propYoutubeUrl,
    propThumbnailUrl,
    propSearchQuery,
    courseTitle,
    title,
    lessonId,
  ]);

  // Reset errors when lesson changes
  useEffect(() => {
    setIframeError(false);
  }, [title, lessonId]);

  return (
    <div className="w-full space-y-3 select-none">
      {/* 1. Header Information & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white">
        <div className="flex items-center gap-2.5 truncate max-w-[70%]">
          {ytResource.isVerifiedVideo ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified YouTube Video
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold shrink-0">
              <Search className="w-3 h-3 text-amber-400" />
              YouTube Search Results
            </span>
          )}

          <div className="truncate">
            <span className="font-bold text-xs sm:text-sm text-slate-100 truncate block">
              {ytResource.videoTitle || title}
            </span>
            <span className="text-[11px] text-slate-400 truncate block">
              {ytResource.isVerifiedVideo
                ? `Channel: ${ytResource.channelTitle} • Topic: ${ytResource.topic}`
                : `Topic: ${ytResource.topic} • Verified Search Results`}
            </span>
          </div>
        </div>

        {/* Action Button: Watch on YouTube in New Tab */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={ytResource.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/30 transition-all hover:scale-[1.02]"
            title="Open video in a new browser tab on YouTube"
          >
            {/* YouTube Icon SVG */}
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span>
              {ytResource.isVerifiedVideo ? 'Watch on YouTube' : 'Search on YouTube'}
            </span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-90" />
          </a>
        </div>
      </div>

      {/* 2. Main Player Screen */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
        {ytResource.isVerifiedVideo && ytResource.youtubeVideoId && !iframeError ? (
          /* A. Verified Video: Responsive Iframe Player */
          <div className="relative w-full h-full group">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ytResource.youtubeVideoId}?rel=0&modestbranding=1&enablejsapi=1`}
              title={ytResource.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
              onError={() => setIframeError(true)}
            />

            {/* Quick floating overlay button to open externally */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-auto">
              <a
                href={ytResource.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 hover:bg-red-600 transition-colors shadow-lg border border-white/10"
              >
                <span>Full Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : ytResource.isVerifiedVideo && iframeError ? (
          /* B. Verified Video: Fallback Screen when iframe is blocked */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900/90 text-white space-y-4">
            <img
              src={ytResource.thumbnailUrl}
              alt={ytResource.videoTitle}
              className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm pointer-events-none"
            />
            <div className="relative z-10 max-w-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto">
                <Tv className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">
                {ytResource.videoTitle}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your browser or network extension prevents embedded video playback. Watch this verified lesson directly on YouTube.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={ytResource.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Video on YouTube</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIframeError(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Embed</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* C. Search Result: High-Quality Topic Search Result Card */
          <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>YouTube Search Results • Exact Topic Match</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {durationString}
              </span>
            </div>

            <div className="max-w-xl space-y-3 my-auto">
              <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-400">
                {courseTitle} • Curriculum Topic
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {ytResource.topic}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                No single verified individual video ID is hardcoded for this exact subtopic. Click below to view official educational playlists and lectures on YouTube matching:
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-amber-300 flex items-center gap-2">
                <Search className="w-4 h-4 shrink-0 text-amber-400" />
                <span className="truncate">{ytResource.searchQuery}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
              <div className="text-xs text-slate-400">
                <span>Watch on YouTube in a new tab, then return here to track completion.</span>
              </div>

              <a
                href={ytResource.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-red-600/40 hover:scale-[1.02] transition-all"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>Search This Topic on YouTube</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 3. Below-Player Educational Ribbon & Manual Completion Banner */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {ytResource.topic}
            </span>
            <span className="text-[11px] text-slate-400">• {durationString}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isCompleted
              ? '✓ This lesson is marked as completed in your course progress.'
              : 'Watch the video lesson, take notes, and mark it complete to advance your curriculum progress.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
          {onToggleComplete && (
            <button
              type="button"
              onClick={onToggleComplete}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                  : 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-md shadow-indigo-600/30'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${
                  isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-white'
                }`}
              />
              <span>{isCompleted ? 'Completed ✓' : 'Mark as Completed'}</span>
            </button>
          )}

          {hasNextLesson && onNextLesson && (
            <button
              type="button"
              onClick={onNextLesson}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
