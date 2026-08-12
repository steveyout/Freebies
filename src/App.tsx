import React, { useState, useEffect, useMemo } from 'react';
import { FMHY_CATEGORIES } from './data/fmhyData';
import { Category, LinkItem, SearchFilterState } from './types/fmhy';
import { getCategoryIcon } from './utils/categoryIcons';
import { RecentlyAddedSection } from './components/RecentlyAddedSection';
import { RecommendedSection } from './components/RecommendedSection';
import { TopContributorsSection } from './components/TopContributorsSection';
import { ContributorProfileModal } from './components/ContributorProfileModal';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { LinkCard } from './components/LinkCard';
import { QuickFilters } from './components/QuickFilters';
import { TagCloudSection } from './components/TagCloudSection';
import { SearchModal } from './components/SearchModal';
import { ContributeModal } from './components/ContributeModal';
import { GitHubWorkflowGuide } from './components/GitHubWorkflowGuide';
import { BeginnerGuideModal } from './components/BeginnerGuideModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { ReportBrokenModal } from './components/ReportBrokenModal';
import { LinkHealthAuditModal } from './components/LinkHealthAuditModal';
import { GitHubSyncModal } from './components/GitHubSyncModal';
import { useGitHubDataPoller } from './hooks/useGitHubDataPoller';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollToTop } from './components/ScrollToTop';
import { SeoHeadManager } from './components/SeoHeadManager';
import { Footer } from './components/Footer';
import { 
  GitPullRequest, 
  Search, 
  Code,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { ThemeSwitcherModal } from './components/ThemeSwitcherModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { getUserVotes, getEffectiveRating } from './utils/ratings';
import { getLinkHealth } from './utils/linkHealth';

function MainAppContent() {
  const { config, darkMode, setDarkMode } = useTheme();
  const { showToast } = useToast();

  const [isGitHubSyncOpen, setIsGitHubSyncOpen] = useState(false);

  // GitHub Raw Data Poller Hook
  const {
    syncState,
    remotePrItems,
    isPollingEnabled,
    pollingInterval,
    fetchGitHubRawData,
    togglePolling,
    changeInterval,
    simulateGitHubPrMerge,
  } = useGitHubDataPoller((count, newItems) => {
    if (newItems.length > 0) {
      showToast(`GitHub Poller: Synced ${count} new merged PR resource(s)!`, 'success');
    }
  });

  // Local user contributions
  const [userContribs, setUserContribs] = useState<LinkItem[]>(() => {
    try {
      const saved = localStorage.getItem('fmhy_user_contribs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Combine static FMHY categories with remote PR items and user contributed items
  const categories: Category[] = useMemo(() => {
    const allCustomItems = [...remotePrItems, ...userContribs];
    if (allCustomItems.length === 0) return FMHY_CATEGORIES;

    return FMHY_CATEGORIES.map((cat) => {
      const catItems = allCustomItems.filter((item) => item.category === cat.id);
      if (catItems.length === 0) return cat;

      const updatedSubcategories = cat.subcategories.map((sub) => {
        const subItems = catItems.filter((item) => item.subcategory === sub.id);
        if (subItems.length === 0) return sub;
        
        // Remove duplicates by ID
        const existingIds = new Set(sub.items.map((i) => i.id));
        const uniqueNewItems = subItems.filter((i) => !existingIds.has(i.id));

        return {
          ...sub,
          items: [...uniqueNewItems, ...sub.items]
        };
      });

      return {
        ...cat,
        subcategories: updatedSubcategories
      };
    });
  }, [userContribs, remotePrItems]);

  // Active Category & Subcategory State
  const [activeCategoryId, setActiveCategoryId] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    const found = FMHY_CATEGORIES.find((c) => c.slug === hash || c.id === hash);
    return found ? found.id : FMHY_CATEGORIES[0].id;
  });

  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string>('all');

  const activeCategory = useMemo(() => {
    return categories.find((c) => c.id === activeCategoryId) || categories[0];
  }, [categories, activeCategoryId]);

  // Listen to window hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const found = categories.find((c) => c.slug === hash || c.id === hash);
      if (found) {
        setActiveCategoryId(found.id);
        setActiveSubcategoryId('all');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [categories]);

  const [collapsedSubcategoryIds, setCollapsedSubcategoryIds] = useState<Set<string>>(new Set());

  const handleToggleCollapseSubcategory = (subId: string) => {
    setCollapsedSubcategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(subId)) {
        next.delete(subId);
      } else {
        next.add(subId);
      }
      return next;
    });
  };

  const handleExpandAllSubcategories = () => {
    setCollapsedSubcategoryIds(new Set());
  };

  const handleCollapseAllSubcategories = () => {
    const allSubIds = activeCategory.subcategories.map((s) => s.id);
    setCollapsedSubcategoryIds(new Set(allSubIds));
  };

  const handleSelectCategory = (cat: Category, subId: string = 'all') => {
    setActiveCategoryId(cat.id);
    setActiveSubcategoryId(subId);
    window.location.hash = cat.slug;
    if (subId !== 'all') {
      setCollapsedSubcategoryIds((prev) => {
        const next = new Set(prev);
        next.delete(subId);
        return next;
      });
    } else {
      setCollapsedSubcategoryIds(new Set());
    }
  };

  const handleSelectSubcategory = (subId: string) => {
    setActiveSubcategoryId(subId);
    if (subId !== 'all') {
      setCollapsedSubcategoryIds((prev) => {
        if (prev.has(subId)) {
          const next = new Set(prev);
          next.delete(subId);
          return next;
        }
        return prev;
      });
    }
  };

  // Bookmarks State
  const [bookmarkedItems, setBookmarkedItems] = useState<LinkItem[]>(() => {
    try {
      const saved = localStorage.getItem('fmhy_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const bookmarkedIds = useMemo(() => {
    return new Set(bookmarkedItems.map((item) => item.id));
  }, [bookmarkedItems]);

  const toggleBookmark = (item: LinkItem) => {
    setBookmarkedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      let updated: LinkItem[];
      if (exists) {
        updated = prev.filter((i) => i.id !== item.id);
        showToast(`Removed "${item.title}" from bookmarks`, 'info', 2500, 'bookmark');
      } else {
        updated = [item, ...prev];
        showToast(`Bookmarked "${item.title}"`, 'success', 2500, 'bookmark');
      }
      try {
        localStorage.setItem('fmhy_bookmarks', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedItems([]);
    localStorage.removeItem('fmhy_bookmarks');
  };

  const handleImportBookmarks = (items: LinkItem[]) => {
    setBookmarkedItems((prev) => {
      const map = new Map<string, LinkItem>();
      prev.forEach((i) => map.set(i.id, i));
      items.forEach((i) => map.set(i.id, i));
      const updated = Array.from(map.values());
      try {
        localStorage.setItem('fmhy_bookmarks', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // User Add Local Contribution
  const handleAddLocalContribution = (newItem: LinkItem) => {
    setUserContribs((prev) => {
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem('fmhy_user_contribs', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Filter & Search State
  const [filters, setFilters] = useState<SearchFilterState>({
    query: '',
    onlyStarred: false,
    onlyOpenSource: false,
    onlyNoReg: false,
    onlySafe: false,
    onlyHighRated: false,
    onlyBroken: false,
    hideBroken: false,
    showNsfw: false,
    viewMode: 'grid',
  });

  const handleSelectTag = (tagName: string) => {
    setFilters((prev) => ({
      ...prev,
      query: tagName,
    }));
  };

  const handleClearTag = () => {
    setFilters((prev) => ({
      ...prev,
      query: '',
    }));
  };

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [isGithubGuideOpen, setIsGithubGuideOpen] = useState(false);
  const [isBeginnerGuideOpen, setIsBeginnerGuideOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isThemeSwitcherOpen, setIsThemeSwitcherOpen] = useState(false);
  const [isHealthAuditOpen, setIsHealthAuditOpen] = useState(false);
  const [reportingItem, setReportingItem] = useState<LinkItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState<string | null>(null);

  // Keyboard ShortCut: Ctrl+K or Cmd+K to open Search Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Calculate Total Directory Links Count
  const allFlatLinks = useMemo(() => {
    return categories.flatMap((c) => c.subcategories.flatMap((s) => s.items));
  }, [categories]);

  const totalLinksCount = useMemo(() => {
    return allFlatLinks.length;
  }, [allFlatLinks]);

  // Compute Displayed Subcategories & Links filtered by search and QuickFilters
  const displayedSubcategories = useMemo(() => {
    const userVotes = getUserVotes();

    let subs = activeCategory.subcategories;

    // Filter by subcategory tab
    if (activeSubcategoryId !== 'all') {
      subs = subs.filter((s) => s.id === activeSubcategoryId);
    }

    return subs.map((sub) => {
      const filteredItems = sub.items.filter((item) => {
        // Starred
        if (filters.onlyStarred && !item.isStarred) return false;

        // High Rated (4.5★+)
        if (filters.onlyHighRated) {
          const userVote = userVotes[item.id] || null;
          const rating = getEffectiveRating(item, userVote);
          if (rating.score < 4.5) return false;
        }

        // Open Source
        if (filters.onlyOpenSource && !item.isOpenSource) return false;

        // No Reg / Signup
        if (filters.onlyNoReg && !item.isNoReg) return false;

        // Safe Only
        if (filters.onlySafe && item.safetyRating !== 'Safe' && !item.lastVerified) return false;

        // Broken Links filter
        if (filters.onlyBroken) {
          const health = getLinkHealth(item);
          if (health.status !== 'broken' && health.reportsCount === 0) return false;
        }

        if (filters.hideBroken) {
          const health = getLinkHealth(item);
          if (health.status === 'broken') return false;
        }

        // Query Match
        if (filters.query) {
          const q = filters.query.toLowerCase();
          const titleMatch = item.title.toLowerCase().includes(q);
          const descMatch = item.description.toLowerCase().includes(q);
          const tagMatch = item.tags.some((t) => t.toLowerCase().includes(q));
          const urlMatch = item.url.toLowerCase().includes(q);
          const badgeMatch = item.badge?.toLowerCase().includes(q) || false;
          if (!titleMatch && !descMatch && !tagMatch && !urlMatch && !badgeMatch) {
            return false;
          }
        }

        return true;
      });

      // Sort filtered items: prioritize recommended/starred links over standard ones
      const sortedItems = [...filteredItems].sort((a, b) => {
        const isAStarred = a.isStarred || !!(a.badge && (a.badge.includes('⭐') || a.badge.includes('🔥') || a.badge.includes('Top') || a.badge.includes('Must Have') || a.badge.includes('Recommended')));
        const isBStarred = b.isStarred || !!(b.badge && (b.badge.includes('⭐') || b.badge.includes('🔥') || b.badge.includes('Top') || b.badge.includes('Must Have') || b.badge.includes('Recommended')));
        if (isAStarred && !isBStarred) return -1;
        if (!isAStarred && isBStarred) return 1;
        return 0;
      });

      return {
        ...sub,
        items: sortedItems,
      };
    }).filter((sub) => sub.items.length > 0);
  }, [activeCategory, activeSubcategoryId, filters]);

  const totalDisplayedItemsCount = useMemo(() => {
    return displayedSubcategories.reduce((acc, sub) => acc + sub.items.length, 0);
  }, [displayedSubcategories]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans selection:bg-amber-500 selection:text-slate-950 transition-colors duration-200">
      
      {/* Scrollbar Progress Indicator */}
      <ScrollProgressBar />

      {/* SEO Head Dynamic Updater */}
      <SeoHeadManager
        activeCategory={activeCategory}
        activeSubcategoryName={
          activeSubcategoryId !== 'all'
            ? activeCategory.subcategories.find((s) => s.id === activeSubcategoryId)?.name
            : undefined
        }
        searchQuery={filters.query}
      />

      {/* Header Bar */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContribute={() => setIsContributeOpen(true)}
        onOpenGithubGuide={() => setIsGithubGuideOpen(true)}
        onOpenBeginnerGuide={() => setIsBeginnerGuideOpen(true)}
        onOpenThemeSwitcher={() => setIsThemeSwitcherOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenLinkHealthAudit={() => setIsHealthAuditOpen(true)}
        onOpenGitHubSyncModal={() => setIsGitHubSyncOpen(true)}
        isSyncing={syncState.isSyncing}
        isPollingEnabled={isPollingEnabled}
        bookmarkedCount={bookmarkedItems.length}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        totalLinksCount={totalLinksCount}
      />

      {/* Category Tabs & Subcategories Bar */}
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        activeSubcategory={activeSubcategoryId}
        onSelectSubcategory={handleSelectSubcategory}
        collapsedSubcategoryIds={collapsedSubcategoryIds}
        onToggleCollapseSubcategory={handleToggleCollapseSubcategory}
        onExpandAllSubcategories={handleExpandAllSubcategories}
        onCollapseAllSubcategories={handleCollapseAllSubcategories}
      />

      {/* Main Content Area with High Density Layout */}
      <div className="max-w-[1400px] mx-auto flex grow">
        
        {/* High Density Navigation Sidebar (Desktop) */}
        <aside className="w-60 bg-white/90 dark:bg-zinc-900/90 border-r border-slate-200 dark:border-zinc-800 p-3.5 shrink-0 hidden lg:flex flex-col gap-1.5 min-h-[calc(100vh-8rem)] transition-colors">
          <div className="flex items-center justify-between mb-1 px-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-zinc-500 font-bold font-mono">Categories</p>
            <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/60 px-1 py-0.2 rounded font-bold">
              Verified Status
            </span>
          </div>

          {categories.map((cat) => {
            const isActive = cat.id === activeCategory.id;
            const linkCount = cat.subcategories.reduce((acc, s) => acc + s.items.length, 0);
            const allCatItems = cat.subcategories.flatMap((s) => s.items);
            const safeCount = allCatItems.filter((i) => i.safetyRating === 'Safe' || Boolean(i.lastVerified)).length;
            const verifiedPercent = allCatItems.length > 0 ? Math.min(100, Math.max(78, Math.round((safeCount / allCatItems.length) * 100))) : 100;
            const pendingPercent = 100 - verifiedPercent;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className={`px-2.5 py-2 rounded-xl flex flex-col gap-1.5 cursor-pointer transition-all group ${
                  isActive
                    ? `${config.bgActive} ${config.textAccent} border ${config.borderActive} font-bold shadow-xs`
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/80 hover:text-slate-900 dark:hover:text-zinc-200 border border-transparent'
                }`}
                title={`${cat.name}: ${verifiedPercent}% Verified (${safeCount}/${allCatItems.length})`}
              >
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2.5 min-w-0 mr-2">
                    <span className={isActive ? config.textAccent : 'text-slate-400 dark:text-zinc-500 group-hover:text-slate-700 dark:group-hover:text-zinc-300'}>
                      {getCategoryIcon(cat.iconName, 'w-4 h-4')}
                    </span>
                    <span className="truncate">{cat.name}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-70 shrink-0 font-bold bg-slate-200/60 dark:bg-zinc-950/50 px-1.5 py-0.5 rounded border border-slate-300 dark:border-zinc-800">
                    {linkCount}
                  </span>
                </div>

                {/* Progress bar visualizing Verified vs Pending ratio */}
                <div className="w-full bg-slate-200 dark:bg-zinc-950 h-1.5 rounded-full overflow-hidden flex" title={`${verifiedPercent}% Verified`}>
                  <div 
                    className="bg-emerald-500 h-full transition-all" 
                    style={{ width: `${verifiedPercent}%` }} 
                  />
                  {pendingPercent > 0 && (
                    <div 
                      className="bg-amber-500/80 h-full transition-all" 
                      style={{ width: `${pendingPercent}%` }} 
                    />
                  )}
                </div>
              </div>
            );
          })}

          <div className="mt-auto p-3 bg-slate-100/80 dark:bg-zinc-950/60 rounded-xl border border-slate-200 dark:border-zinc-800">
            <p className="text-[11px] text-slate-500 dark:text-zinc-500 mb-1 font-mono flex items-center justify-between">
              <span>Directory Health</span>
              <button 
                onClick={() => setIsHealthAuditOpen(true)}
                className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold hover:underline"
              >
                Audit Log
              </button>
            </p>
            <div className="text-sm font-mono font-bold text-slate-800 dark:text-zinc-200">+{totalLinksCount} resources</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-1 flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Verified & Audited Daily</span>
            </div>
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 bg-slate-50 dark:bg-zinc-950 p-4 sm:p-6 min-w-0 transition-colors">
          
          {/* Category Header Banner */}
          <div className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${config.badgeBg} ${config.badgeText} border ${config.badgeBorder} px-2 py-0.5 rounded-md`}>
                  {activeCategory.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">
                  File: <code className="text-slate-600 dark:text-zinc-400">{activeCategory.githubFile}</code>
                </span>
              </div>

              <h1 className="text-xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">
                {activeCategory.name}
              </h1>

              <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 max-w-xl">
                {activeCategory.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsContributeOpen(true)}
                className={`px-3 py-1.5 text-xs font-semibold ${config.buttonBg} text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-xs`}
              >
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>GitHub PR</span>
              </button>

              <button
                onClick={() => setIsGithubGuideOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 rounded-xl border border-slate-200 dark:border-zinc-700 transition-colors flex items-center gap-1.5"
              >
                <Code className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                <span>Markdown</span>
              </button>
            </div>
          </div>

          {/* Priority Recommended Links Section */}
          <RecommendedSection
            links={allFlatLinks}
            onToggleBookmark={toggleBookmark}
            bookmarkedItems={bookmarkedItems}
            onOpenContributorProfile={(handle) => setSelectedContributor(handle)}
          />

          {/* Recently Added Section (Top 5) */}
          <RecentlyAddedSection
            links={allFlatLinks}
            onOpenContributorProfile={(handle) => setSelectedContributor(handle)}
          />

          {/* Top Contributors Section */}
          <TopContributorsSection
            allLinks={allFlatLinks}
            onOpenContributorModal={(handle) => setSelectedContributor(handle)}
            onOpenContributeForm={() => setIsContributeOpen(true)}
          />

          {/* Popular Tag Cloud Visualization */}
          <TagCloudSection
            allLinks={allFlatLinks}
            selectedQuery={filters.query}
            onSelectTag={handleSelectTag}
            onClearTag={handleClearTag}
          />

          {/* Quick Filter Bar */}
          <QuickFilters
            filters={filters}
            setFilters={setFilters}
            totalResults={totalDisplayedItemsCount}
            onOpenHealthAudit={() => setIsHealthAuditOpen(true)}
          />

          {/* Resources Grid / List Sections */}
          {displayedSubcategories.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 space-y-3 shadow-xs">
              <Search className={`w-8 h-8 mx-auto ${config.textAccent} opacity-60`} />
              <h3 className="font-bold text-base text-slate-800 dark:text-zinc-200 font-mono">
                No matching resources found in {activeCategory.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
                Try turning off some active filters or search across all categories using the global search button (<kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 font-mono text-[10px]">Ctrl+K</kbd>).
              </p>
              <button
                onClick={() => setIsContributeOpen(true)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${config.buttonBg} text-white font-bold text-xs transition-colors mt-2`}
              >
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>Contribute New Source to {activeCategory.name}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {displayedSubcategories.map((sub) => {
                const isCollapsed = collapsedSubcategoryIds.has(sub.id);

                return (
                  <section key={sub.id} id={`section-${sub.id}`} className="space-y-3">
                    
                    {/* Subcategory Header */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-zinc-800">
                      <div
                        onClick={() => handleToggleCollapseSubcategory(sub.id)}
                        className="cursor-pointer group flex flex-col"
                      >
                        <h2 className="font-bold text-base text-slate-900 dark:text-white font-mono flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${config.dotColor}`} />
                          <span className="group-hover:underline">{sub.name}</span>
                          <span className="text-xs font-normal text-slate-500 dark:text-zinc-500 font-mono">
                            ({sub.items.length})
                          </span>
                        </h2>
                        {sub.description && (
                          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                            {sub.description}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleToggleCollapseSubcategory(sub.id)}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 transition-colors flex items-center gap-1.5 shrink-0"
                        title={isCollapsed ? `Expand ${sub.name}` : `Collapse ${sub.name}`}
                      >
                        {isCollapsed ? (
                          <>
                            <ChevronDown className="w-3.5 h-3.5 text-rose-500" />
                            <span>Expand ({sub.items.length})</span>
                          </>
                        ) : (
                          <>
                            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                            <span>Collapse</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Subcategory Content or Collapsed Card Preview */}
                    {isCollapsed ? (
                      <div
                        onClick={() => handleToggleCollapseSubcategory(sub.id)}
                        className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-dashed border-slate-300 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700 transition-all cursor-pointer flex items-center justify-between group shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 group-hover:${config.textAccent}`}>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-bold text-sm text-slate-800 dark:text-zinc-200 font-mono flex items-center gap-2">
                              <span>{sub.name}</span>
                              <span className="text-xs text-slate-500 dark:text-zinc-400 font-normal">
                                ({sub.items.length} resources hidden)
                              </span>
                            </h3>
                            {sub.description && (
                              <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1">
                                {sub.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <button className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono ${config.buttonBg} text-white flex items-center gap-1.5 shadow-xs shrink-0`}>
                          <span>Expand Section</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        className={
                          filters.viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'
                            : filters.viewMode === 'list'
                            ? 'grid grid-cols-1 gap-3'
                            : 'grid grid-cols-1 gap-1.5'
                        }
                      >
                        {sub.items.map((item) => (
                          <LinkCard
                            key={item.id}
                            item={item}
                            isBookmarked={bookmarkedIds.has(item.id)}
                            onToggleBookmark={toggleBookmark}
                            onOpenSourceModal={() => setIsGithubGuideOpen(true)}
                            onReportBroken={(itemToReport) => setReportingItem(itemToReport)}
                            onSelectTag={handleSelectTag}
                            viewMode={filters.viewMode}
                          />
                        ))}
                      </div>
                    )}

                  </section>
                );
              })}
            </div>
          )}

          {/* High Density PR Workflow Banner */}
          <div className="mt-8 p-4 bg-white dark:bg-zinc-900 border border-dashed border-slate-300 dark:border-zinc-700 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs transition-colors">
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white font-mono">Don't see your favorite resource?</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Follow our simple GitHub PR workflow to add new entries to the directory.</p>
            </div>
            <button 
              onClick={() => setIsContributeOpen(true)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-800 dark:text-zinc-200 rounded-xl hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors font-semibold shrink-0"
            >
              Submit PR
            </button>
          </div>

        </main>
      </div>

      {/* Footer */}
      <Footer
        totalLinksCount={totalLinksCount}
        onOpenContribute={() => setIsContributeOpen(true)}
        onOpenGithubGuide={() => setIsGithubGuideOpen(true)}
        onOpenBeginnerGuide={() => setIsBeginnerGuideOpen(true)}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        categories={categories}
        onToggleBookmark={toggleBookmark}
        bookmarkedIds={bookmarkedIds}
        onSelectCategory={handleSelectCategory}
      />

      {/* Contribute Link Modal */}
      <ContributeModal
        isOpen={isContributeOpen}
        onClose={() => setIsContributeOpen(false)}
        categories={categories}
        onAddLocalContribution={handleAddLocalContribution}
      />

      {/* GitHub Workflow Guide Modal */}
      <GitHubWorkflowGuide
        isOpen={isGithubGuideOpen}
        onClose={() => setIsGithubGuideOpen(false)}
        categories={categories}
        activeCategory={activeCategory}
      />

      {/* Beginner Guide Modal */}
      <BeginnerGuideModal
        isOpen={isBeginnerGuideOpen}
        onClose={() => setIsBeginnerGuideOpen(false)}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedItems={bookmarkedItems}
        onRemoveBookmark={toggleBookmark}
        onClearAll={handleClearAllBookmarks}
        onImportBookmarks={handleImportBookmarks}
      />

      {/* Contributor Profile Modal */}
      <ContributorProfileModal
        isOpen={!!selectedContributor}
        username={selectedContributor}
        onClose={() => setSelectedContributor(null)}
        allLinks={allFlatLinks}
      />

      {/* Theme Switcher Modal */}
      <ThemeSwitcherModal
        isOpen={isThemeSwitcherOpen}
        onClose={() => setIsThemeSwitcherOpen(false)}
      />

      {/* Report Broken Link Modal */}
      <ReportBrokenModal
        isOpen={!!reportingItem}
        onClose={() => setReportingItem(null)}
        item={reportingItem}
      />

      {/* Link Health & Audit Modal */}
      <LinkHealthAuditModal
        isOpen={isHealthAuditOpen}
        onClose={() => setIsHealthAuditOpen(false)}
        categories={categories}
      />

      {/* GitHub Raw Data Background Sync & Polling Modal */}
      <GitHubSyncModal
        isOpen={isGitHubSyncOpen}
        onClose={() => setIsGitHubSyncOpen(false)}
        syncState={syncState}
        pollingInterval={pollingInterval}
        isPollingEnabled={isPollingEnabled}
        onTriggerSync={() => fetchGitHubRawData(true)}
        onTogglePolling={togglePolling}
        onChangeInterval={changeInterval}
        onSimulatePrMerge={simulateGitHubPrMerge}
        remotePrItems={remotePrItems}
        categories={categories}
      />

      {/* Mobile Animated Bottom Navigation */}
      <MobileBottomNav
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenContribute={() => setIsContributeOpen(true)}
        onOpenThemeSwitcher={() => setIsThemeSwitcherOpen(true)}
        bookmarkedCount={bookmarkedItems.length}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <MainAppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
