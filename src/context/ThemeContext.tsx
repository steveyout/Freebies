import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeName = 'reddish' | 'cyber' | 'emerald' | 'amber' | 'purple';

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  primaryColor: string;
  accentClass: string;
  borderActive: string;
  bgActive: string;
  textAccent: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  gradientFromTo: string;
  glowShadow: string;
  colorDot: string;
  buttonBg: string;
}

export const THEME_CONFIGS: Record<ThemeName, ThemeConfig> = {
  reddish: {
    name: 'reddish',
    label: 'Reddish Crimson',
    primaryColor: '#ef4444',
    accentClass: 'bg-red-600',
    borderActive: 'border-red-500 dark:border-red-500',
    bgActive: 'bg-red-50 dark:bg-red-950/50',
    textAccent: 'text-red-600 dark:text-red-400',
    badgeBg: 'bg-red-100 dark:bg-red-950/80',
    badgeText: 'text-red-700 dark:text-red-300',
    badgeBorder: 'border-red-200 dark:border-red-800/80',
    gradientFromTo: 'from-red-500 via-rose-600 to-amber-500',
    glowShadow: 'shadow-[0_0_20px_rgba(239,68,68,0.35)]',
    colorDot: 'bg-red-500',
    buttonBg: 'bg-red-600 hover:bg-red-700 text-white',
  },
  cyber: {
    name: 'cyber',
    label: 'Cyber Cyan',
    primaryColor: '#06b6d4',
    accentClass: 'bg-cyan-500',
    borderActive: 'border-cyan-500 dark:border-cyan-500',
    bgActive: 'bg-cyan-50 dark:bg-cyan-950/50',
    textAccent: 'text-cyan-600 dark:text-cyan-400',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-950/80',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800/80',
    gradientFromTo: 'from-cyan-400 via-sky-500 to-blue-600',
    glowShadow: 'shadow-[0_0_20px_rgba(6,182,212,0.35)]',
    colorDot: 'bg-cyan-400',
    buttonBg: 'bg-cyan-600 hover:bg-cyan-500 text-white',
  },
  emerald: {
    name: 'emerald',
    label: 'Emerald Vault',
    primaryColor: '#10b981',
    accentClass: 'bg-emerald-500',
    borderActive: 'border-emerald-500 dark:border-emerald-500',
    bgActive: 'bg-emerald-50 dark:bg-emerald-950/50',
    textAccent: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/80',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800/80',
    gradientFromTo: 'from-emerald-400 via-teal-500 to-cyan-500',
    glowShadow: 'shadow-[0_0_20px_rgba(16,185,129,0.35)]',
    colorDot: 'bg-emerald-400',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
  },
  amber: {
    name: 'amber',
    label: 'Sunset Gold',
    primaryColor: '#f59e0b',
    accentClass: 'bg-amber-500',
    borderActive: 'border-amber-500 dark:border-amber-500',
    bgActive: 'bg-amber-50 dark:bg-amber-950/50',
    textAccent: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/80',
    badgeText: 'text-amber-800 dark:text-amber-300',
    badgeBorder: 'border-amber-200 dark:border-amber-800/80',
    gradientFromTo: 'from-amber-400 via-orange-500 to-red-500',
    glowShadow: 'shadow-[0_0_20px_rgba(245,158,11,0.35)]',
    colorDot: 'bg-amber-400',
    buttonBg: 'bg-amber-600 hover:bg-amber-500 text-white',
  },
  purple: {
    name: 'purple',
    label: 'Amethyst Violet',
    primaryColor: '#a855f7',
    accentClass: 'bg-purple-600',
    borderActive: 'border-purple-500 dark:border-purple-500',
    bgActive: 'bg-purple-50 dark:bg-purple-950/50',
    textAccent: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/80',
    badgeText: 'text-purple-700 dark:text-purple-300',
    badgeBorder: 'border-purple-200 dark:border-purple-800/80',
    gradientFromTo: 'from-purple-400 via-fuchsia-500 to-pink-500',
    glowShadow: 'shadow-[0_0_20px_rgba(168,85,247,0.35)]',
    colorDot: 'bg-purple-500',
    buttonBg: 'bg-purple-600 hover:bg-purple-500 text-white',
  },
};

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  toggleDarkMode: () => void;
  config: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    try {
      const saved = localStorage.getItem('freebies_theme');
      if (saved && saved in THEME_CONFIGS) {
        return saved as ThemeName;
      }
    } catch {
      // ignore
    }
    return 'reddish';
  });

  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('freebies_dark_theme');
      if (saved !== null) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return true;
    }
  });

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('freebies_theme', newTheme);
    } catch {
      // ignore
    }
  };

  const setDarkMode = (val: boolean) => {
    setDarkModeState(val);
    try {
      localStorage.setItem('freebies_dark_theme', val ? 'dark' : 'light');
    } catch {
      // ignore
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Sync DOM classes and attributes in realtime
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    root.setAttribute('data-theme', theme);

    const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.reddish;
    root.style.setProperty('--color-primary', themeConfig.primaryColor);
  }, [darkMode, theme]);

  const config = THEME_CONFIGS[theme] || THEME_CONFIGS.reddish;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, darkMode, setDarkMode, toggleDarkMode, config }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
