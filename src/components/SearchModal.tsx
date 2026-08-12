import React, { useState, useEffect, useRef } from 'react';
import { Category, LinkItem } from '../types/fmhy';
import { POPULAR_TAGS } from '../data/fmhyData';
import { 
  Search, 
  X, 
  ExternalLink, 
  Star, 
  Copy, 
  Check, 
  History, 
  Tag,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onToggleBookmark: (item: LinkItem) => void;
  bookmarkedIds: Set<string>;
  onSelectCategory: (category: Category, subId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  categories,
  onToggleBookmark,
  bookmarkedIds,
  onSelectCategory,
}) => {
  const { config } = useTheme();
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fmhy_search_history');
      return saved ? JSON.parse(saved) : ['uBlock Origin', 'Proton VPN', 'Stremio', 'F-Droid'];
    } catch {
      return ['uBlock Origin', 'Proton VPN', 'Stremio', 'F-Droid'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const addHistoryItem = (term: string) => {
    if (!term.trim()) return;
    const clean = term.trim();
    const updated = [clean, ...history.filter((h) => h.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
    setHistory(updated);
    try {
      localStorage.setItem('fmhy_search_history', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCopy = (e: React.MouseEvent, item: LinkItem) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allItems: { item: LinkItem; categoryName: string; categoryObj: Category }[] = [];
  categories.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      sub.items.forEach((item) => {
        allItems.push({ item, categoryName: cat.name, categoryObj: cat });
      });
    });
  });

  const searchResults = query.trim()
    ? allItems.filter(({ item, categoryName }) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          categoryName.toLowerCase().includes(q) ||
          item.subcategory.toLowerCase().includes(q) ||
          item.url.toLowerCase().includes(q)
        );
      }).slice(0, 25)
    : [];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 dark:bg-zinc-950/80 backdrop-blur-md">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-colors"
        >
          
          {/* Top Search Input Box */}
          <div className="p-4 border-b border-slate-200 dark:border-zinc-800 flex items-center gap-3 bg-slate-50 dark:bg-zinc-950/60">
            <Search className={`w-5 h-5 ${config.textAccent} shrink-0`} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim()) {
                  addHistoryItem(query);
                }
              }}
              placeholder="Search freebies index: 'uBlock', 'VPN', 'FLAC', 'Anime', 'Ebooks'..."
              className="w-full bg-transparent text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 text-sm sm:text-base focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-mono font-medium rounded-xl bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border border-slate-300 dark:border-zinc-700/60"
            >
              ESC
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 overflow-y-auto space-y-4 font-sans">
            
            {/* If empty query: show search history & popular tags */}
            {!query.trim() && (
              <div className="space-y-4">
                
                {/* Search History */}
                {history.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                      <History className={`w-3.5 h-3.5 ${config.textAccent}`} />
                      <span>Recent Searches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {history.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-700/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60 text-xs transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Tags */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    <Flame className={`w-3.5 h-3.5 ${config.textAccent}`} />
                    <span>Popular freebies Topics</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setQuery(tag);
                          addHistoryItem(tag);
                        }}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800/40 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 text-xs transition-colors flex items-center gap-1"
                      >
                        <Tag className={`w-3 h-3 ${config.textAccent}`} />
                        <span>#{tag}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Results List */}
            {query.trim() && (
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-500 dark:text-zinc-400 mb-2">
                  Found <span className={`${config.textAccent} font-bold`}>{searchResults.length}</span> matching sources for "{query}"
                </div>

                {searchResults.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 dark:text-zinc-400">
                    <p className="text-sm">No curated resources found matching "{query}".</p>
                    <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">Try searching for broader keywords like 'adblock', 'vpn', 'streaming', 'foss'.</p>
                  </div>
                ) : (
                  searchResults.map(({ item, categoryName, categoryObj }) => {
                    const isBookmarked = bookmarkedIds.has(item.id);
                    const isRec = item.isStarred || !!(item.badge && (item.badge.includes('⭐') || item.badge.includes('🔥') || item.badge.includes('Top') || item.badge.includes('Recommended')));
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          addHistoryItem(query);
                          onSelectCategory(categoryObj, item.subcategory);
                          onClose();
                        }}
                        className={`p-3 rounded-xl transition-all cursor-pointer group flex items-start justify-between gap-3 shadow-xs border ${
                          isRec
                            ? 'bg-amber-50/50 dark:bg-zinc-900 border-amber-400/80 dark:border-amber-500/60 recommended-gradient-border recommended-glow-pulse'
                            : 'bg-slate-50 dark:bg-zinc-950/40 hover:bg-slate-100 dark:hover:bg-zinc-800/80 border-slate-200 dark:border-zinc-800'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${config.badgeBg} ${config.badgeText} border ${config.badgeBorder} font-mono`}>
                              {categoryName}
                            </span>
                            <span className="font-bold text-sm text-slate-900 dark:text-zinc-100 group-hover:underline transition-colors truncate">
                              {item.title}
                            </span>
                            {item.isStarred && (
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => onToggleBookmark(item)}
                            className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-400 hover:text-amber-500 transition-colors"
                            title="Bookmark"
                          >
                            <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'text-amber-500 fill-amber-400' : ''}`} />
                          </button>

                          <button
                            onClick={(e) => handleCopy(e, item)}
                            className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
                            title="Copy URL"
                          >
                            {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>

                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-1.5 rounded-lg ${config.buttonBg} text-white transition-colors`}
                            title="Open Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

          </div>

          {/* Footer Info */}
          <div className="p-3 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/90 text-[11px] text-slate-500 dark:text-zinc-400 flex items-center justify-between font-mono">
            <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300">K</kbd> anywhere to trigger search</span>
            <span>FreebiesHub Fast Search</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
