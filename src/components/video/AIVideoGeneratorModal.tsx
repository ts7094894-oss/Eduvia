import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Video,
  FileText,
  Volume2,
  Layers,
  CheckCircle2,
  Play,
  ArrowRight,
  RefreshCw,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import {
  executeAIVideoGenerationPipeline,
  AIVideoJob,
  AIVideoGenerationRequest,
} from '../../services/videoService';
import { Button } from '../Button';

interface AIVideoGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
  defaultCourseTitle?: string;
  onLessonCreated?: (newLessonData: any) => void;
}

export const AIVideoGeneratorModal: React.FC<AIVideoGeneratorModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = 'Recursion and Memory Stack Trees in Python',
  defaultCourseTitle = 'Python Programming Masterclass',
  onLessonCreated,
}) => {
  const [topic, setTopic] = useState<string>(defaultTopic);
  const [courseTitle, setCourseTitle] = useState<string>(defaultCourseTitle);
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [voiceModel, setVoiceModel] = useState<string>('standard_neural_en');

  const [job, setJob] = useState<AIVideoJob | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [previewActive, setPreviewActive] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleStartGeneration = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setPreviewActive(false);

    const request: AIVideoGenerationRequest = {
      courseId: 'custom-course',
      courseTitle,
      moduleTitle: 'AI Generated Module',
      lessonTopic: topic,
      difficulty,
      includeCodeDemo: true,
    };

    try {
      const finalJob = await executeAIVideoGenerationPipeline(request, (updatedJob) => {
        setJob({ ...updatedJob });
      });
      setJob(finalJob);
    } catch (err) {
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAttachToCourse = () => {
    if (!job?.videoResult || !job.script) return;
    onLessonCreated?.({
      id: `ai-les-${Date.now()}`,
      title: topic,
      videoTitle: job.videoResult.videoTitle,
      duration: job.videoResult.duration,
      durationSeconds: job.videoResult.durationSeconds,
      videoUrl: job.videoResult.videoUrl,
      description: job.script.conceptExplanation,
      learningObjectives: [
        `Understand ${topic}`,
        'Analyze stack and memory execution',
        'Avoid common bugs in technical interviews',
      ],
      chapters: job.videoResult.chapters,
      transcript: job.videoResult.transcript,
      script: job.script,
      codeDemo: {
        language: job.script.codeDemonstration.language,
        code: job.script.codeDemonstration.code,
        output: job.script.codeDemonstration.output,
        explanation: job.script.codeDemonstration.explanation,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                AI Video Generator Studio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automated Pedagogical Video Production Pipeline
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 flex-1">
          {/* Architecture Pipeline Flow Diagram */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Pipeline Architecture:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                API-Ready Service
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-semibold text-slate-600 dark:text-slate-400">
              <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                1. Topic Input
              </div>
              <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                2. AI Script (7-Pt)
              </div>
              <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                3. Voice Synthesizer
              </div>
              <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                4. Visual Slides
              </div>
              <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                5. MP4 Video Stream
              </div>
            </div>
          </div>

          {/* Form Configuration */}
          {!isGenerating && !job?.videoResult && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Lesson Topic / Concept
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Recursion and Backtracking in Python"
                  className="w-full px-4 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Course Context
                  </label>
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Target Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Beginner">Beginner (Foundations)</option>
                    <option value="Intermediate">Intermediate (Core Engineering)</option>
                    <option value="Advanced">Advanced (Algorithms & Placements)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  API Integration Architecture Ready
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Separates mock educational streams from the external video generation service.
                  Generates full chapters, synced transcript, 7-part script, and runnable code.
                </p>
              </div>

              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={handleStartGeneration}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Generate Educational Video Lesson
              </Button>
            </div>
          )}

          {/* Active Generation Progress Indicator */}
          {isGenerating && job && (
            <div className="py-8 text-center space-y-5 animate-in fade-in">
              <div className="w-16 h-16 rounded-3xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-xl animate-pulse">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {job.currentStage}
                </h4>
                <div className="max-w-md mx-auto w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 font-mono">{job.progress}% complete</p>
              </div>
            </div>
          )}

          {/* Completed Generation Preview */}
          {!isGenerating && job?.status === 'completed' && job.videoResult && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    Video Lesson Successfully Generated!
                  </h4>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                    {job.videoResult.videoTitle} ({job.videoResult.duration})
                  </p>
                </div>
              </div>

              {/* Video Player Preview */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <video
                  src={job.videoResult.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Generated Metadata Summary */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Chapters</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {job.videoResult.chapters.length}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Transcript</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {job.videoResult.transcript.length} lines
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">AI Script</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">7 Sections</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="primary"
                  size="medium"
                  fullWidth
                  onClick={handleAttachToCourse}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Attach to Current Course & Start Learning
                </Button>
                <Button
                  variant="outline"
                  size="medium"
                  onClick={() => {
                    setJob(null);
                  }}
                  leftIcon={<RefreshCw className="w-4 h-4" />}
                >
                  Generate Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
