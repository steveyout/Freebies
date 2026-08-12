import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, X, Check, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme, THEME_CONFIGS, ThemeName } from '../context/ThemeContext';

interface ThemeSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSwitcherModal: React.FC<ThemeSwitcherModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { theme, setTheme, darkMode, setDarkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl overflow-hidden relative text-slate-900 dark:text-zinc-100 transition-colors"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-red-500/20 via-cyan-500/20 to-purple-500/20 border border-slate-300 dark:border-zinc-700/50">
                <Palette className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold font-mono flex items-center gap-1.5 text-slate-900 dark:text-white">
                  <span>INTERFACE APPEARANCE</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-pulse" />
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Switch light/dark mode and choose your accent color.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Light / Dark Mode Toggle Cards */}
          <div className="mb-5">
            <label className="text-xs font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
              Color Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Light Mode Card */}
              <button
                onClick={() => setDarkMode(false)}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  !darkMode
                    ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm font-bold ring-2 ring-amber-500/20'
                    : 'bg-slate-100 dark:bg-zinc-950/60 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-800/60'
                }`}
              >
                <div className="p-2 rounded-lg bg-amber-500 text-white shadow-xs">
                  <Sun className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold font-mono">Light Mode</div>
                  <div className="text-[10px] opacity-75">Clean bright theme</div>
                </div>
                {!darkMode && <Check className="w-4 h-4 ml-auto text-amber-600 stroke-[3]" />}
              </button>

              {/* Dark Mode Card */}
              <button
                onClick={() => setDarkMode(true)}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  darkMode
                    ? 'bg-zinc-800 border-amber-500 text-white shadow-sm font-bold ring-2 ring-amber-500/20'
                    : 'bg-slate-100 dark:bg-zinc-950/60 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-800/60'
                }`}
              >
                <div className="p-2 rounded-lg bg-zinc-950 text-amber-400 border border-zinc-800 shadow-xs">
                  <Moon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold font-mono">Dark Mode</div>
                  <div className="text-[10px] opacity-75">Deep dark theme</div>
                </div>
                {darkMode && <Check className="w-4 h-4 ml-auto text-amber-400 stroke-[3]" />}
              </button>
            </div>
          </div>

          {/* Theme Color Palette Section */}
          <div className="space-y-2 mb-4">
            <label className="text-xs font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block">
              Accent Theme Palette
            </label>
            <div className="space-y-2">
              {(Object.keys(THEME_CONFIGS) as ThemeName[]).map((themeKey) => {
                const themeItem = THEME_CONFIGS[themeKey];
                const isSelected = theme === themeKey;

                return (
                  <button
                    key={themeKey}
                    onClick={() => setTheme(themeKey)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all group ${
                      isSelected
                        ? 'bg-slate-100 dark:bg-zinc-800/90 border-amber-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-zinc-950/60 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Theme Color Swatch */}
                      <div className="relative">
                        <div
                          className={`w-7 h-7 rounded-full bg-gradient-to-br ${themeItem.gradientFromTo} flex items-center justify-center shadow-md`}
                        />
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center text-zinc-950 font-bold">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="text-left">
                        <div className="text-xs font-bold font-mono flex items-center gap-2 text-slate-900 dark:text-white">
                          <span>{themeItem.label}</span>
                          {themeKey === 'reddish' && (
                            <span className="text-[9px] font-mono bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-800/60">
                              Default
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-zinc-400">
                          Primary: {themeItem.primaryColor}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-3 h-3 rounded-full ${themeItem.colorDot} opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200 dark:border-zinc-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
