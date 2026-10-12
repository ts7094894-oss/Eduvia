import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, Clock, User, Volume2, Sparkles } from 'lucide-react';
import { TranscriptLine } from '../../types';
import { formatTimeSeconds } from '../../services/videoService';

interface VideoTranscriptProps {
  transcript: TranscriptLine[];
  currentTimeSeconds: number;
  onSeekToTimestamp: (seconds: number) => void;
}

export const VideoTranscript: React.FC<VideoTranscriptProps> = ({
  transcript,
  currentTimeSeconds,
  onSeekToTimestamp,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Filter transcript lines based on search query
  const filteredLines = useMemo(() => {
    if (!searchQuery.trim()) return transcript;
    const lower = searchQuery.toLowerCase();
    return transcript.filter(
      (line) =>
        line.text.toLowerCase().includes(lower) ||
        (line.speaker && line.speaker.toLowerCase().includes(lower))
    );
  }, [transcript, searchQuery]);

  // Copy full transcript text
  const handleCopyTranscript = () => {
    const fullText = transcript
      .map((l) => `[${formatTimeSeconds(l.start)}] ${l.speaker ? l.speaker + ': ' : ''}${l.text}`)
      .join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header controls: Search & Copy */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words, terms, or topics in transcript..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyTranscript}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
            title="Copy full transcript"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Transcript</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Transcript Items List */}
      <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100/60 dark:divide-slate-800/40">
        {filteredLines.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No transcript text matches "{searchQuery}".
          </div>
        ) : (
          filteredLines.map((line) => {
            const isActive =
              currentTimeSeconds >= line.start && currentTimeSeconds <= line.end;

            return (
              <div
                key={line.id}
                onClick={() => onSeekToTimestamp(line.start)}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-150 flex items-start gap-3 text-left ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 shadow-xs'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {/* Timestamp Button */}
                <button
                  type="button"
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-colors flex items-center gap-1 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeSeconds(line.start)}</span>
                </button>

                {/* Content */}
                <div className="space-y-1 min-w-0 flex-1">
                  {line.speaker && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>{line.speaker}</span>
                      {isActive && (
                        <span className="ml-1 px-1.5 py-0.2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-bold">
                          Now Speaking
                        </span>
                      )}
                    </div>
                  )}
                  <p
                    className={`text-xs leading-relaxed transition-colors ${
                      isActive
                        ? 'text-slate-900 dark:text-white font-medium'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {line.text}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
        <span>Click any timestamp to jump to that moment in the video</span>
        <span className="font-mono">{filteredLines.length} sections</span>
      </div>
    </div>
  );
};
