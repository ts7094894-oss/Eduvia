import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Code2,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AILessonScript } from '../../types';

interface AILessonScriptViewProps {
  script: AILessonScript;
}

export const AILessonScriptView: React.FC<AILessonScriptViewProps> = ({ script }) => {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopyCode = () => {
    if (!script.codeDemonstration?.code) return;
    navigator.clipboard.writeText(script.codeDemonstration.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleToggleSpeech = () => {
    if (!speechSupported) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel(); // clear previous
      const fullNarration = `${script.topic}. ${script.introduction} ${script.conceptExplanation} ${script.simpleExample} ${script.quickRecap}`;
      const utterance = new SpeechSynthesisUtterance(fullNarration);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Script Header Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-pink-950/20 border border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase">
              AI Pedagogical Script
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              7-Part Learning Framework
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Topic: {script.topic}
          </h4>
          {script.targetAudience && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Designed for: {script.targetAudience}
            </p>
          )}
        </div>

        {speechSupported && (
          <button
            type="button"
            onClick={handleToggleSpeech}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 shrink-0 ${
              isSpeaking
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Stop Voice Narration</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Listen with AI Voice</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* 7-Part Structured Script Cards */}
      <div className="space-y-4">
        {/* 1. Introduction */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 flex items-center justify-center font-bold text-xs">
              1
            </span>
            <h5 className="text-xs font-bold tracking-wide uppercase">Introduction & Context</h5>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
            {script.introduction}
          </p>
        </div>

        {/* 2. Concept Explanation */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 flex items-center justify-center font-bold text-xs">
              2
            </span>
            <h5 className="text-xs font-bold tracking-wide uppercase">Concept Deep-Dive</h5>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
            {script.conceptExplanation}
          </p>
        </div>

        {/* 3. Simple Example */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <span className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/70 flex items-center justify-center font-bold text-xs">
              3
            </span>
            <h5 className="text-xs font-bold tracking-wide uppercase">Intuitive Mental Model / Example</h5>
          </div>
          <div className="pl-8 p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200">
            <p className="leading-relaxed">{script.simpleExample}</p>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        {script.codeDemonstration && (
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <span className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 flex items-center justify-center font-bold text-xs">
                  4
                </span>
                <h5 className="text-xs font-bold tracking-wide uppercase">
                  Live Code Demonstration ({script.codeDemonstration.language})
                </h5>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block */}
            <div className="pl-8 space-y-2">
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800">
                <code>{script.codeDemonstration.code}</code>
              </pre>

              {script.codeDemonstration.output && (
                <div className="p-3 rounded-2xl bg-slate-900 text-slate-200 font-mono text-[11px] border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                    Expected Terminal Output:
                  </p>
                  <pre className="whitespace-pre-wrap">{script.codeDemonstration.output}</pre>
                </div>
              )}

              {script.codeDemonstration.explanation && (
                <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                  💡 {script.codeDemonstration.explanation}
                </p>
              )}
            </div>
          </div>
        )}

        {/* 5. Common Mistakes */}
        {script.commonMistakes && script.commonMistakes.length > 0 && (
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <span className="w-6 h-6 rounded-lg bg-rose-50 dark:bg-rose-950/70 flex items-center justify-center font-bold text-xs">
                5
              </span>
              <h5 className="text-xs font-bold tracking-wide uppercase">
                Common Mistakes & Technical Interview Traps
              </h5>
            </div>

            <div className="pl-8 space-y-2">
              {script.commonMistakes.map((mistake, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2.5"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{mistake}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Practice Example */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <span className="w-6 h-6 rounded-lg bg-purple-50 dark:bg-purple-950/70 flex items-center justify-center font-bold text-xs">
              6
            </span>
            <h5 className="text-xs font-bold tracking-wide uppercase">
              Hands-on Practice Challenge
            </h5>
          </div>
          <div className="pl-8 p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 text-xs text-purple-900 dark:text-purple-200">
            <p className="leading-relaxed">{script.practiceExample}</p>
          </div>
        </div>

        {/* 7. Quick Recap */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 flex items-center justify-center font-bold text-xs">
              7
            </span>
            <h5 className="text-xs font-bold tracking-wide uppercase">Quick Pedagogical Recap</h5>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
            {script.quickRecap}
          </p>
        </div>
      </div>
    </div>
  );
};
