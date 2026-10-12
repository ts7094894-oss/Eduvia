import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  HelpCircle,
  Lightbulb,
  Copy,
  Check,
  Bot,
  User,
  RotateCcw,
} from 'lucide-react';
import { Lesson } from '../../types';
import { answerLessonQuestion, AssistantAnswer } from '../../services/videoService';

interface AILearningAssistantProps {
  lesson: Lesson;
  courseTitle: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  codeSnippet?: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

export const AILearningAssistant: React.FC<AILearningAssistantProps> = ({
  lesson,
  courseTitle,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello! I'm your EduPath AI Learning Assistant for **${lesson.title}**. You can ask me to explain any code line by line, clarify concepts, debug common errors, or give you placement interview practice problems!`,
      timestamp: 'Just now',
      suggestedFollowUps: [
        'Explain this code snippet',
        'What are the common errors?',
        'Give me another example',
        'How does this appear in technical placement rounds?',
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleSendMessage = async (textToSend?: string) => {
    const question = (textToSend || inputValue).trim();
    if (!question || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      sender: 'user',
      text: question,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const answer: AssistantAnswer = await answerLessonQuestion(
        question,
        lesson,
        courseTitle
      );

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-a`,
        sender: 'assistant',
        text: answer.reply,
        codeSnippet: answer.codeSnippet,
        suggestedFollowUps: answer.suggestedFollowUps,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errMsg: ChatMessage = {
        id: `msg-${Date.now()}-e`,
        sender: 'assistant',
        text: 'Sorry, I encountered an issue analyzing that question. Please try asking again!',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'init-1',
        sender: 'assistant',
        text: `Reset! I'm ready to answer any questions about **${lesson.title}**.`,
        timestamp: 'Just now',
        suggestedFollowUps: [
          'Explain this code snippet',
          'What are the common errors?',
          'Give me another example',
        ],
      },
    ]);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              Ask About This Lesson
            </h4>
            <p className="text-[10px] text-slate-400">
              Context-aware tutor grounded in {lesson.title}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetChat}
          className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
          title="Restart conversation"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="flex flex-wrap gap-2">
        {[
          'Explain this code snippet',
          'What are the common errors?',
          'Give me another example',
          'How does this appear in placement interviews?',
        ].map((chip) => (
          <button
            key={chip}
            type="button"
            disabled={loading}
            onClick={() => handleSendMessage(chip)}
            className="px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/70 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/60 dark:border-slate-700/60 transition-all flex items-center gap-1.5"
          >
            <Lightbulb className="w-3 h-3 text-amber-500" />
            <span>{chip}</span>
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="max-h-[360px] overflow-y-auto space-y-3.5 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
              }`}
            >
              {msg.sender === 'user' ? (
                <User className="w-3.5 h-3.5" />
              ) : (
                <Bot className="w-3.5 h-3.5" />
              )}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/70 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Code snippet inside response */}
              {msg.codeSnippet && (
                <div className="relative mt-2 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 p-3 font-mono text-[11px]">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-[10px] text-slate-400">
                    <span>Code Snippet</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.codeSnippet!, msg.id)}
                      className="hover:text-white flex items-center gap-1"
                    >
                      {copiedCodeId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre">
                    <code>{msg.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Follow up chips inside message */}
              {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-200/50 dark:border-slate-700/50">
                  {msg.suggestedFollowUps.map((fu, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={loading}
                      onClick={() => handleSendMessage(fu)}
                      className="px-2 py-1 rounded-lg text-[10px] font-medium bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-600 dark:text-slate-400 hover:text-indigo-600 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      {fu}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2.5 text-xs text-slate-400 italic">
            <div className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600">
              <Bot className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px]">Analyzing lesson curriculum & code...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 pt-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Ask anything about ${lesson.title}...`}
          disabled={loading}
          className="flex-1 px-4 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || loading}
          className="p-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white shadow-xs transition-colors focus:outline-none"
          title="Send question"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
