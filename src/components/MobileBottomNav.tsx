import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  Star, 
  GitPullRequest, 
  Palette,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface MobileBottomNavProps {
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenContribute: () => void;
  onOpenThemeSwitcher: () => void;
  bookmarkedCount?: number;
  bookmarksCount?: number;
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenSearch,
  onOpenBookmarks,
  onOpenContribute,
  onOpenThemeSwitcher,
  bookmarkedCount = 0,
  bookmarksCount = 0,
}) => {
  const { config } = useTheme();
  const count = bookmarkedCount || bookmarksCount || 0;
  const [activeTab, setActiveTab] = useState<string>('home');

  const handleHomeClick = () => {
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchClick = () => {
    setActiveTab('search');
    onOpenSearch();
  };

  const handleContributeClick = () => {
    setActiveTab('contribute');
    onOpenContribute();
  };

  const handleBookmarksClick = () => {
    setActiveTab('bookmarks');
    onOpenBookmarks();
  };

  const handleThemeClick = () => {
    setActiveTab('theme');
    onOpenThemeSwitcher();
  };

  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto pointer-events-auto">
      {/* Subtle Background Glow behind floating bar */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 blur-xl rounded-full pointer-events-none -z-10 opacity-70 dark:opacity-40" />

      {/* Elegant Floating Pill Nav Container */}
      <nav className="relative bg-white/90 dark:bg-zinc-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl sm:rounded-3xl shadow-[0_12px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.7)] p-1.5 px-2 transition-colors duration-200">
        <div className="grid grid-cols-5 items-center justify-items-center w-full">
          
          {/* 1. Directory / Home */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            whileHover={{ y: -2 }}
            onClick={handleHomeClick}
            id="mobile-nav-home"
            className="relative flex flex-col items-center justify-center py-1 px-1 rounded-xl w-full text-center group focus:outline-none"
          >
            {activeTab === 'home' && (
              <motion.div
                layoutId="mobileNavActivePill"
                className="absolute inset-0 bg-slate-100 dark:bg-zinc-800/90 rounded-xl -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Home className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
              activeTab === 'home' ? 'text-amber-500 dark:text-amber-400' : 'text-slate-600 dark:text-zinc-400'
            }`} />
            <span className={`text-[10px] font-mono font-medium mt-0.5 truncate transition-colors ${
              activeTab === 'home' ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-zinc-400'
            }`}>
              Directory
            </span>
          </motion.button>

          {/* 2. Fast Search */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            whileHover={{ y: -2 }}
            onClick={handleSearchClick}
            id="mobile-nav-search"
            className="relative flex flex-col items-center justify-center py-1 px-1 rounded-xl w-full text-center group focus:outline-none"
          >
            {activeTab === 'search' && (
              <motion.div
                layoutId="mobileNavActivePill"
                className="absolute inset-0 bg-amber-50 dark:bg-amber-950/40 rounded-xl -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Search className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
              activeTab === 'search' ? 'text-amber-500' : 'text-slate-600 dark:text-zinc-400'
            }`} />
            <span className={`text-[10px] font-mono font-medium mt-0.5 truncate transition-colors ${
              activeTab === 'search' ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500 dark:text-zinc-400'
            }`}>
              Search
            </span>
          </motion.button>

          {/* 3. Central Elevated Contribute CTA */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ y: -4, scale: 1.05 }}
            onClick={handleContributeClick}
            id="mobile-nav-contribute"
            className="relative flex flex-col items-center justify-center -mt-5 z-20 focus:outline-none group"
          >
            <div className="relative">
              {/* Outer Pulsing Glow Ring */}
              <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${config.gradientFromTo} opacity-70 blur-xs group-hover:opacity-100 transition-opacity animate-pulse`} />
              
              <motion.div 
                className={`relative w-11 h-11 bg-gradient-to-br ${config.gradientFromTo} rounded-full flex items-center justify-center text-white shadow-md border-2 border-white dark:border-zinc-900`}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                <GitPullRequest className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              </motion.div>
            </div>
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${config.textAccent} mt-0.5 truncate`}>
              Submit
            </span>
          </motion.button>

          {/* 4. Bookmarks / Saved */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            whileHover={{ y: -2 }}
            onClick={handleBookmarksClick}
            id="mobile-nav-bookmarks"
            className="relative flex flex-col items-center justify-center py-1 px-1 rounded-xl w-full text-center group focus:outline-none"
          >
            {activeTab === 'bookmarks' && (
              <motion.div
                layoutId="mobileNavActivePill"
                className="absolute inset-0 bg-amber-50 dark:bg-amber-950/40 rounded-xl -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <div className="relative">
              <Star className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                count > 0 ? 'text-amber-500 fill-amber-400' : 'text-slate-600 dark:text-zinc-400'
              }`} />
              
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1.5 -right-2.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-mono font-black text-[9px] min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center border border-white dark:border-zinc-900 shadow-xs"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <span className={`text-[10px] font-mono font-medium mt-0.5 truncate transition-colors ${
              activeTab === 'bookmarks' ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500 dark:text-zinc-400'
            }`}>
              Saved
            </span>
          </motion.button>

          {/* 5. Theme Switcher */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            whileHover={{ y: -2 }}
            onClick={handleThemeClick}
            id="mobile-nav-theme"
            className="relative flex flex-col items-center justify-center py-1 px-1 rounded-xl w-full text-center group focus:outline-none"
          >
            {activeTab === 'theme' && (
              <motion.div
                layoutId="mobileNavActivePill"
                className="absolute inset-0 bg-purple-50 dark:bg-purple-950/40 rounded-xl -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Palette className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
              activeTab === 'theme' ? 'text-purple-500' : 'text-slate-600 dark:text-zinc-400'
            }`} />
            <span className={`text-[10px] font-mono font-medium mt-0.5 truncate transition-colors ${
              activeTab === 'theme' ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-slate-500 dark:text-zinc-400'
            }`}>
              Theme
            </span>
          </motion.button>

        </div>
      </nav>
    </div>
  );
};
