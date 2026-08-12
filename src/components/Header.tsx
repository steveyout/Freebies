import React, { useState, useEffect } from 'react';
import { 
  Search, 
  GitPullRequest, 
  Bookmark, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Github, 
  ShieldCheck, 
  Gift,
  Palette,
  Activity,
  Globe,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { getBrokenReports } from '../utils/linkHealth';

interface HeaderProps {
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  onOpenSearch: () => void;
  onOpenContribute: () => void;
  onOpenGithubGuide: () => void;
  onOpenBeginnerGuide: () => void;
  onOpenBookmarks: () => void;
  onOpenThemeSwitcher?: () => void;
  onOpenLinkHealthAudit?: () => void;
  onOpenGitHubSyncModal?: () => void;
  onOpenSeoStudio?: () => void;
  onOpenMarkdownEditor?: (fileId?: string) => void;
  isSyncing?: boolean;
  isPollingEnabled?: boolean;
  bookmarkedCount: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
  totalLinksCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenContribute,
  onOpenGithubGuide,
  onOpenBeginnerGuide,
  onOpenBookmarks,
  onOpenThemeSwitcher,
  onOpenLinkHealthAudit,
  onOpenGitHubSyncModal,
  onOpenSeoStudio,
  onOpenMarkdownEditor,
  isSyncing = false,
  isPollingEnabled = true,
  bookmarkedCount,
  mobileMenuOpen,
  setMobileMenuOpen,
  totalLinksCount,
}) => {
  const { darkMode, toggleDarkMode, config } = useTheme();
  const [reportsCount, setReportsCount] = useState(() => getBrokenReports().length);

  useEffect(() => {
    const handleUpdate = () => {
      setReportsCount(getBrokenReports().length);
    };
    window.addEventListener('freebies-link-health-updated', handleUpdate);
    return () => window.removeEventListener('freebies-link-health-updated', handleUpdate);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-900/90 border-b border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              id="header-logo-link"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <motion.div 
                whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
                className={`w-9 h-9 bg-gradient-to-br ${config.gradientFromTo} rounded-xl flex items-center justify-center p-0.5 shadow-md ${config.glowShadow} transition-all shrink-0`}
              >
                <Gift className="w-5 h-5 text-white animate-pulse" />
              </motion.div>
              
              <div className="flex items-baseline gap-1">
                <div className="flex items-center">
                  {"freebies".split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      whileHover={{ y: -3, scale: 1.25 }}
                      className="text-2xl font-black font-mono tracking-tight text-slate-900 dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-red-400 dark:to-amber-400 cursor-pointer"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
                <motion.span
                  animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`hidden sm:inline-block text-[10px] font-mono font-extrabold ${config.badgeText} ${config.badgeBg} border ${config.badgeBorder} px-1.5 py-0.5 rounded ml-1.5 tracking-wider uppercase shadow-xs`}
                >
                  HUB
                </motion.span>
              </div>
            </a>
          </div>

          {/* Quick Search Button */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <button
              onClick={onOpenSearch}
              id="header-search-bar-btn"
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:border-amber-500 transition-colors text-sm group"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 group-hover:text-amber-500 transition-colors" />
                <span className="text-slate-500 dark:text-zinc-400 text-xs sm:text-sm">Search {totalLinksCount.toLocaleString()} resources...</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 px-1.5 py-0.5 rounded">
                <kbd>Ctrl</kbd>
                <span>+</span>
                <kbd>K</kbd>
              </div>
            </button>
          </div>

          {/* Action Navigation Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            
            {onOpenLinkHealthAudit && (
              <button
                onClick={onOpenLinkHealthAudit}
                id="header-health-audit-btn"
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 transition-colors"
                title="Automated Link Health & Community Reports Audit"
              >
                <Activity className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                <span>Link Health</span>
                {reportsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white font-mono text-[10px] font-bold">
                    {reportsCount}
                  </span>
                )}
              </button>
            )}

            {onOpenGitHubSyncModal && (
              <button
                onClick={onOpenGitHubSyncModal}
                id="header-github-sync-btn"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/80 transition-colors shadow-2xs"
                title="GitHub Raw Poller Status & Polling Controls"
              >
                <span className="relative flex h-2 w-2">
                  {isPollingEnabled && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isPollingEnabled ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                </span>
                <span className="hidden xl:inline">Live Poller</span>
                <Activity className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-500' : 'text-emerald-600 dark:text-emerald-400'}`} />
              </button>
            )}

            {onOpenSeoStudio && (
              <button
                onClick={onOpenSeoStudio}
                id="header-seo-studio-btn"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors"
                title="SEO Meta & Social Open Graph Studio"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden xl:inline">SEO &amp; Social</span>
              </button>
            )}

            {onOpenMarkdownEditor && (
              <button
                onClick={() => onOpenMarkdownEditor('streaming.md')}
                id="header-markdown-editor-btn"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 transition-colors"
                title="Edit Category .md Files with Styling Support"
              >
                <FileText className="w-3.5 h-3.5 text-rose-500" />
                <span className="hidden xl:inline">.md Studio</span>
              </button>
            )}

            <button
              onClick={onOpenBeginnerGuide}
              id="header-guide-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 transition-colors"
              title="Beginner Setup Guide (uBlock, Quad9 DNS)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Beginner Setup</span>
            </button>

            <button
              onClick={onOpenGithubGuide}
              id="header-github-workflow-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 transition-colors"
              title="GitHub Pages & PR Workflow"
            >
              <Github className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" />
              <span>Source Code</span>
            </button>

            <button
              onClick={onOpenContribute}
              id="header-contribute-btn"
              className={`px-3 py-1.5 text-xs font-semibold ${config.buttonBg} rounded-xl transition-colors flex items-center gap-2 shadow-sm`}
              title="Submit a link or edit source via GitHub PR"
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>GitHub PR</span>
            </button>

          </div>

          {/* Icon Controls */}
          <div className="flex items-center gap-2">
            
            {/* Mobile Search Button */}
            <button
              onClick={onOpenSearch}
              id="header-mobile-search-btn"
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-amber-500 border border-slate-200 dark:border-zinc-700"
              aria-label="Search freebies"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bookmarks Button */}
            <button
              onClick={onOpenBookmarks}
              id="header-bookmarks-btn"
              className="relative p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-amber-500 border border-slate-200 dark:border-zinc-700 transition-colors"
              aria-label="View Saved Bookmarks"
              title="Saved Links"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkedCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-950 font-mono">
                  {bookmarkedCount}
                </span>
              )}
            </button>

            {/* Theme Palette Switcher Button */}
            {onOpenThemeSwitcher && (
              <button
                onClick={onOpenThemeSwitcher}
                id="header-theme-picker-btn"
                className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-purple-600 dark:text-purple-400 border border-slate-200 dark:border-zinc-700 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-mono font-bold"
                aria-label="Change Theme Accent"
                title="Change UI Accent & Appearance"
              >
                <Palette className="w-4 h-4" />
                <span className="hidden md:inline">Theme</span>
              </button>
            )}

            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              id="header-theme-toggle-btn"
              className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-amber-500 border border-slate-200 dark:border-zinc-700 transition-colors"
              aria-label="Toggle Light/Dark Theme"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-800" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="header-mobile-menu-toggle-btn"
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-amber-500 border border-slate-200 dark:border-zinc-700"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 space-y-2 transition-colors">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 dark:border-zinc-800">
            <button
              onClick={() => {
                onOpenContribute();
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-semibold ${config.buttonBg}`}
            >
              <GitPullRequest className="w-4 h-4" />
              <span>GitHub PR</span>
            </button>
            
            <button
              onClick={() => {
                onOpenBeginnerGuide();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700"
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Beginner Setup</span>
            </button>
          </div>

          {onOpenSeoStudio && (
            <button
              onClick={() => {
                onOpenSeoStudio();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900"
            >
              <Globe className="w-4 h-4 text-indigo-500" />
              <span>SEO Meta &amp; Social Studio</span>
            </button>
          )}

          {onOpenMarkdownEditor && (
            <button
              onClick={() => {
                onOpenMarkdownEditor('streaming.md');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900"
            >
              <FileText className="w-4 h-4 text-rose-500" />
              <span>Markdown Studio (.md Editor)</span>
            </button>
          )}

          {onOpenLinkHealthAudit && (
            <button
              onClick={() => {
                onOpenLinkHealthAudit();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900"
            >
              <Activity className="w-4 h-4 text-rose-500" />
              <span>Link Health & Community Audit</span>
            </button>
          )}

          <button
            onClick={() => {
              onOpenGithubGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            <Github className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
            <span>GitHub Pages & PR Source Code</span>
          </button>
        </div>
      )}
    </header>
  );
};
