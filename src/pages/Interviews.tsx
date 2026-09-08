import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import {
  Calendar,
  Clock,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Building2,
  CheckCircle2,
  Sparkles,
  Code2,
  HelpCircle,
  Play,
  Share2,
} from 'lucide-react';

export const Interviews: React.FC = () => {
  const [activeMeetingModal, setActiveMeetingModal] = useState<boolean>(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [activeTab, setActiveTab] = useState<'question' | 'code'>('question');
  const [codeDraft, setCodeDraft] = useState(
    `# Write a function to check if binary tree is Balanced\n\ndef isBalanced(root):\n    def check(node):\n        if not node: return 0\n        left = check(node.left)\n        if left == -1: return -1\n        right = check(node.right)\n        if right == -1: return -1\n        if abs(left - right) > 1: return -1\n        return max(left, right) + 1\n    return check(root) != -1`
  );

  const mockInterviews = [
    {
      id: 'INT-2026-TCS-01',
      company: 'Tata Consultancy Services',
      role: 'Associate Software Developer (Digital)',
      date: 'September 5, 2026',
      time: '11:00 AM - 12:00 PM IST',
      round: 'Technical Architecture & Coding Round 1',
      panel: 'Sanjay Deshmukh (Lead Architect, TCS)',
      status: 'upcoming',
    },
    {
      id: 'INT-2026-INF-02',
      company: 'Infosys Limited',
      role: 'Specialist Programmer',
      date: 'September 12, 2026',
      time: '02:30 PM - 03:30 PM IST',
      round: 'Advanced Algorithms & System Design',
      panel: 'Divya Iyer (Senior Staff Engineer, Infosys)',
      status: 'scheduled',
    },
  ];

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-xs font-bold text-indigo-700 dark:text-indigo-300">
          <Calendar className="w-3.5 h-3.5" />
          <span>Campus Recruitment Schedule</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          My Scheduled Interviews & Mock Room
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Join your upcoming live recruiter panels or practice in our simulated online interview room with integrated code editor and live questions.
        </p>
      </div>

      {/* Scheduled Interviews List */}
      <div className="space-y-4">
        {mockInterviews.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                    {item.round}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {item.id}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.role} @ {item.company}
                </h3>
              </div>

              <Button
                variant="primary"
                size="medium"
                onClick={() => setActiveMeetingModal(true)}
                leftIcon={<Video className="w-4 h-4" />}
              >
                Launch Interview Room
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-400">Date & Slot:</span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  {item.date}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Time Window:</span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  {item.time}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Interviewer Panel:</span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{item.panel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preparation Checklist */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Technical Interview Checklist & Guidelines
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Ensure functional webcam, clear noise-reduced microphone, and stable internet.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Keep your college identity card and updated EDUVIA ATS resume handy.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Be ready to explain time and space complexities (Big-O) for your algorithmic solutions.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Revise core CS fundamentals: OOPs, DBMS ACID properties, OS Paging & Process Synchronization.</span>
          </div>
        </div>
      </div>

      {/* Interactive Meeting Simulator Modal */}
      {activeMeetingModal && (
        <Modal
          isOpen={activeMeetingModal}
          onClose={() => setActiveMeetingModal(false)}
          maxWidth="4xl"
          title="EDUVIA Live Tech Interview Room"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Interviewer Video Feed */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                  alt="Interviewer"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Sanjay Deshmukh (Lead Interviewer)
                </div>
              </div>

              {/* Candidate Self Video Feed */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                {videoOn ? (
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=80"
                    alt="Student Self Video"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center space-y-2">
                    <VideoOff className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400">Camera Off</p>
                  </div>
                )}
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white font-bold">
                  You (Candidate)
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => setMicOn(!micOn)}
                    className={`p-2 rounded-xl text-white ${micOn ? 'bg-black/60' : 'bg-rose-600'}`}
                  >
                    {micOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setVideoOn(!videoOn)}
                    className={`p-2 rounded-xl text-white ${videoOn ? 'bg-black/60' : 'bg-rose-600'}`}
                  >
                    {videoOn ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Live Shared Scratchpad / Question Tab */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('question')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${activeTab === 'question' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    Current Interview Problem
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${activeTab === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    Live Code Editor
                  </button>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Connected: Session ID #INT-9941</span>
              </div>

              {activeTab === 'question' ? (
                <div className="text-xs text-slate-300 space-y-2">
                  <h4 className="font-bold text-white text-sm">
                    Problem: Check if a Binary Tree is Height-Balanced
                  </h4>
                  <p>
                    Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is defined as a binary tree in which the left and right subtrees of every node differ in height by no more than 1.
                  </p>
                  <p className="text-slate-400">
                    <strong>Constraints:</strong> The number of nodes in the tree is in the range [0, 5000]. -10^4 &lt;= Node.val &lt;= 10^4
                  </p>
                </div>
              ) : (
                <textarea
                  rows={6}
                  value={codeDraft}
                  onChange={(e) => setCodeDraft(e.target.value)}
                  className="w-full bg-slate-950 font-mono text-xs text-emerald-400 p-3 rounded-xl border border-slate-800 focus:outline-none"
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">Session duration: 18:42</span>
              <Button variant="danger" size="small" onClick={() => setActiveMeetingModal(false)}>
                End Interview Call
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
