import React from 'react';
import { 
  Github, 
  GitPullRequest, 
  ShieldCheck 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  totalLinksCount: number;
  onOpenContribute: () => void;
  onOpenGithubGuide: () => void;
  onOpenBeginnerGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  totalLinksCount,
  onOpenContribute,
  onOpenGithubGuide,
  onOpenBeginnerGuide,
}) => {
  const { config } = useTheme();

  return (
    <footer className="mt-12 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-500 font-mono text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 bg-gradient-to-br ${config.gradientFromTo} rounded flex items-center justify-center font-bold text-white text-xs shadow-xs`}>
                🎁
              </div>
              <span className="font-mono font-bold text-base text-slate-900 dark:text-white tracking-tight uppercase">
                freebies<span className={`text-xs ml-1 font-mono uppercase ${config.badgeBg} ${config.badgeText} border ${config.badgeBorder} px-1 py-0.5 rounded`}>HUB</span>
              </span>
              <span className="text-[10px] font-mono uppercase bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-zinc-700 font-semibold">
                High Density Free Index
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed max-w-md font-sans">
              Curated static resource directory & index. Built for ultra-fast, high-density browsing of safe tools, games, streaming, educational, and developer resources.
            </p>

            <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-zinc-500 pt-1">
              <span>Status: <span className="text-emerald-500 font-bold">Online</span></span>
              <span>•</span>
              <span className={`${config.textAccent} font-bold`}>{totalLinksCount}+ Resources</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-1.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-zinc-200">
              Navigation & PRs
            </h4>
            <ul className="space-y-1 text-xs font-sans">
              <li>
                <button
                  onClick={onOpenContribute}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <GitPullRequest className={`w-3.5 h-3.5 ${config.textAccent}`} />
                  <span>GitHub PR & Submit Link</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGithubGuide}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                  <span>GitHub Repository Source</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBeginnerGuide}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Beginner Setup Guide</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Security */}
          <div className="space-y-1.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-zinc-200">
              Safety First
            </h4>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
              Always protect your browsing with <strong className="text-slate-800 dark:text-zinc-200">uBlock Origin</strong> and an encrypted DNS like <strong className="text-slate-800 dark:text-zinc-200">Quad9</strong>.
            </p>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500 dark:text-zinc-500 font-mono">
          <p>
            SEO Meta: FreebiesHub Static Link Hub | Built for High Density
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">API Docs</span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Status</span>
            <span className="text-slate-300 dark:text-zinc-700">|</span>
            <span>&copy; {new Date().getFullYear()} FreebiesHub</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
