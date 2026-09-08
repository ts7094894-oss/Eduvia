import React from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
  clickable?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  showTagline = true,
  clickable = true,
  className = '',
}) => {
  const sizeConfig = {
    small: {
      icon: 'w-6 h-6',
      iconBox: 'p-1.5 rounded-lg',
      title: 'text-lg font-extrabold tracking-tight',
      tagline: 'text-[9px] tracking-wider font-semibold',
      gap: 'gap-2',
    },
    medium: {
      icon: 'w-7 h-7',
      iconBox: 'p-2 rounded-xl',
      title: 'text-2xl font-black tracking-tight',
      tagline: 'text-[11px] tracking-wider font-semibold',
      gap: 'gap-2.5',
    },
    large: {
      icon: 'w-10 h-10',
      iconBox: 'p-3 rounded-2xl shadow-lg shadow-indigo-500/20',
      title: 'text-3xl sm:text-4xl font-black tracking-tight',
      tagline: 'text-xs sm:text-sm tracking-wider font-semibold',
      gap: 'gap-3.5',
    },
  };

  const current = sizeConfig[size];

  const content = (
    <div className={`inline-flex items-center ${current.gap} select-none ${className}`}>
      {/* Brand Icon Badge */}
      <div className={`relative bg-gradient-to-tr from-indigo-600 via-indigo-700 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md ${current.iconBox}`}>
        <GraduationCap className={current.icon} />
        <div className="absolute -top-1 -right-1">
          <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center leading-none">
          <span className={`bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-900 dark:from-white dark:via-slate-100 dark:to-indigo-200 bg-clip-text text-transparent ${current.title}`}>
            EduPath
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 ml-0.5 inline-block"></span>
        </div>
        {showTagline && (
          <span className={`text-indigo-600 dark:text-indigo-400 uppercase leading-tight mt-0.5 font-sans ${current.tagline}`}>
            Learn. Grow. Get Hired.
          </span>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link to="/" className="inline-block transition-transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};
