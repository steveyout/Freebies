'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Search, 
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
  FileText,
  Compass,
  ChevronDown,
  PlusCircle,
  Wrench,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check admin session on mount
  useEffect(() => {
    let isMounted = true;
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && (data.user?.role === 'admin' || data.user?.role === 'moderator')) {
          if (isMounted) setIsAdmin(true);
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      setReportsCount(getBrokenReports().length);
    };
    window.addEventListener('freebies-link-health-updated', handleUpdate);
    return () => window.removeEventListener('freebies-link-health-updated', handleUpdate);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-900/90 border-b border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <Link 
              href="/" 
              id="header-logo-link"
              className="flex items-center gap-2 group focus:outline-none"
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
                  className={`hidden sm:inline-block text-[10px] font-mono font-extrabold ${config.badgeText} ${config.badgeBg} border ${config.badgeBorder} px-1.5 py-0.5 rounded ml-1 tracking-wider uppercase shadow-xs`}
                >
                  HUB
                </motion.span>
              </div>
            </Link>
          </div>

          {/* Quick Search Button */}
          <div className="flex-1 max-w-xs xl:max-w-sm hidden md:block">
            <button
              onClick={onOpenSearch}
              id="header-search-bar-btn"
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-zinc-800/80 hover:bg-slate-200/80 dark:hover:bg-zinc-700/80 border border-slate-200/80 dark:border-zinc-700 text-xs text-slate-500 dark:text-zinc-400 transition-all cursor-pointer shadow-2xs group"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                <span className="font-sans">Search 1,000+ resources...</span>
              </div>
              <kbd className="hidden sm:inline-block font-mono text-[10px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-zinc-400 shadow-2xs">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Streamlined Desktop Navigation Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            
            {/* Explore Link */}
            <Link
              href="/explore"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100/90 dark:bg-zinc-800/90 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 transition-colors"
              title="Explore all resources with filters"
            >
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>Explore</span>
            </Link>

            {/* Tools & Guides Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                id="header-tools-dropdown-btn"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
                  toolsDropdownOpen 
                    ? 'bg-slate-200 dark:bg-zinc-700 border-amber-500 text-slate-900 dark:text-white' 
                    : 'bg-slate-100/90 dark:bg-zinc-800/90 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700'
                }`}
                title="Tools, Link Audits, Studios & Guides"
              >
                <Wrench className="w-3.5 h-3.5 text-indigo-500" />
                <span>Tools &amp; Guides</span>
                {reportsCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} />
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl p-2 z-50 text-slate-900 dark:text-zinc-100 space-y-1 backdrop-blur-xl"
                  >
                    <div className="px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
                      Directory Tools &amp; Utilities
                    </div>

                    {/* Link Health Audit */}
                    <Link
                      href="/audit"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                          <Activity className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-rose-500 transition-colors">
                            Link Health Audit
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                            Community reports &amp; dead mirrors
                          </div>
                        </div>
                      </div>
                      {reportsCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-mono text-[10px] font-bold">
                          {reportsCount}
                        </span>
                      )}
                    </Link>

                    {/* Beginner Setup Guide */}
                    <button
                      onClick={() => {
                        onOpenBeginnerGuide();
                        setToolsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-left group cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-amber-500 transition-colors">
                          Beginner Setup Guide
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                          uBlock, Quad9 DNS &amp; anti-malware
                        </div>
                      </div>
                    </button>

                    {/* Markdown Studio */}
                    {onOpenMarkdownEditor && (
                      <button
                        onClick={() => {
                          onOpenMarkdownEditor('streaming.md');
                          setToolsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-left group cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-rose-500 transition-colors">
                            Markdown Editor Studio
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                            Edit and download FMHY markdown
                          </div>
                        </div>
                      </button>
                    )}

                    {/* SEO & Meta Studio */}
                    {onOpenSeoStudio && (
                      <button
                        onClick={() => {
                          onOpenSeoStudio();
                          setToolsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-left group cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900">
                          <Globe className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-indigo-500 transition-colors">
                            SEO &amp; Meta Studio
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                            Audit Schema.org &amp; OpenGraph
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Sync Poller Status */}
                    {onOpenGitHubSyncModal && (
                      <button
                        onClick={() => {
                          onOpenGitHubSyncModal();
                          setToolsDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-left group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-900">
                            <Activity className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-cyan-500 transition-colors">
                              Live Poller Status
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                              {isPollingEnabled ? 'Sync active' : 'Polling paused'}
                            </div>
                          </div>
                        </div>
                        <span className={`w-2 h-2 rounded-full ${isPollingEnabled ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      </button>
                    )}

                    <div className="pt-1 border-t border-slate-100 dark:border-zinc-800">
                      {/* GitHub Source Link */}
                      <button
                        onClick={() => {
                          onOpenGithubGuide();
                          setToolsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-left group cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                          <Github className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-amber-500 transition-colors">
                            GitHub Repository
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                            PR workflow &amp; source repository
                          </div>
                        </div>
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hybrid Submit Resource Button */}
            <button
              onClick={onOpenContribute}
              id="header-contribute-btn"
              className={`px-3 py-1.5 text-xs font-bold ${config.buttonBg} rounded-xl transition-all flex items-center gap-1.5 shadow-sm hover:scale-[1.02] cursor-pointer`}
              title="Submit resource via UI or GitHub PR"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>

          </div>

          {/* Icon Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            
            {/* Admin Portal Direct Icon if Authenticated */}
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500/15 to-violet-500/15 hover:from-indigo-500/25 hover:to-violet-500/25 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 text-xs font-bold font-mono transition-all shadow-xs"
                title="Admin Control Center (Authenticated)"
              >
                <ShieldAlert className="w-4 h-4 text-indigo-500 animate-pulse" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            {/* Mobile Search Button */}
            <button
              onClick={onOpenSearch}
              id="header-mobile-search-btn"
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-amber-500 border border-slate-200 dark:border-zinc-700 cursor-pointer"
              aria-label="Search freebies"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bookmarks Button */}
            <button
              onClick={onOpenBookmarks}
              id="header-bookmarks-btn"
              className="relative p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-amber-500 border border-slate-200 dark:border-zinc-700 transition-colors cursor-pointer"
              aria-label="View Saved Bookmarks"
              title="Saved Bookmarks"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {bookmarkedCount}
                </span>
              )}
            </button>

            {/* Theme Customizer Switcher */}
            {onOpenThemeSwitcher && (
              <button
                onClick={onOpenThemeSwitcher}
                id="header-theme-switcher-btn"
                className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-amber-500 border border-slate-200 dark:border-zinc-700 transition-colors cursor-pointer"
                title="Change UI Theme & Accent Colors"
                aria-label="Change Theme"
              >
                <Palette className="w-4 h-4" />
              </button>
            )}

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleDarkMode}
              id="header-dark-mode-toggle"
              className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-amber-500 border border-slate-200 dark:border-zinc-700 transition-colors cursor-pointer"
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="header-mobile-menu-btn"
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 space-y-2 transition-colors">
          {/* Admin Control Center direct mobile card if authenticated */}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-indigo-950/50 border border-indigo-800/80 text-indigo-300 text-xs font-bold shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-indigo-400" />
                <span>Admin Control Center</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900 text-indigo-200 uppercase tracking-wider">
                Portal &rarr;
              </span>
            </Link>
          )}

          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 dark:border-zinc-800">
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Explore All</span>
            </Link>

            <Link
              href="/audit"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900"
            >
              <Activity className="w-4 h-4 text-rose-500" />
              <span>Link Health</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 dark:border-zinc-800">
            <button
              onClick={() => {
                onOpenContribute();
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-semibold ${config.buttonBg} cursor-pointer`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Resource</span>
            </button>
            
            <button
              onClick={() => {
                onOpenBeginnerGuide();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 cursor-pointer"
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
              className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 cursor-pointer"
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
              className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-rose-500" />
              <span>Markdown Studio (.md Editor)</span>
            </button>
          )}

          <button
            onClick={() => {
              onOpenGithubGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <Github className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
            <span>GitHub Repository &amp; PR Workflow</span>
          </button>
        </div>
      )}
    </header>
  );
};
