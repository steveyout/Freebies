import React, { useState, useMemo } from 'react';
import { Tag, TrendingUp, X, Search, Sparkles, Filter, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LinkItem } from '../types/fmhy';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

interface TagCloudSectionProps {
  allLinks: LinkItem[];
  selectedQuery: string;
  onSelectTag: (tagName: string) => void;
  onClearTag: () => void;
}

interface TagFrequency {
  name: string;
  count: number;
}

export const TagCloudSection: React.FC<TagCloudSectionProps> = ({
  allLinks,
  selectedQuery,
  onSelectTag,
  onClearTag,
}) => {
  const { config } = useTheme();
  const { showToast } = useToast();
  
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Extract and calculate tag frequencies from all provided links
  const tagFrequencies = useMemo<TagFrequency[]>(() => {
    const map = new Map<string, number>();

    allLinks.forEach((link) => {
      if (Array.isArray(link.tags)) {
        link.tags.forEach((tag) => {
          const cleanTag = tag.trim().toLowerCase();
          if (cleanTag) {
            map.set(cleanTag, (map.get(cleanTag) || 0) + 1);
          }
        });
      }
    });

    const result: TagFrequency[] = [];
    map.forEach((count, name) => {
      result.push({ name, count });
    });

    // Sort descending by count, then alphabetically
    return result.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [allLinks]);

  // Max count for scaling fonts/colors
  const maxCount = useMemo(() => {
    return tagFrequencies.length > 0 ? tagFrequencies[0].count : 1;
  }, [tagFrequencies]);

  // Filter tags based on internal search query if user types in tag search
  const filteredTags = useMemo(() => {
    if (!tagSearchQuery.trim()) return tagFrequencies;
    const q = tagSearchQuery.toLowerCase().trim();
    return tagFrequencies.filter((tf) => tf.name.includes(q));
  }, [tagFrequencies, tagSearchQuery]);

  // Slice based on whether "Show All Tags" is active
  const displayedTags = useMemo(() => {
    if (showAllTags || tagSearchQuery.trim().length > 0) {
      return filteredTags;
    }
    return filteredTags.slice(0, 28);
  }, [filteredTags, showAllTags, tagSearchQuery]);

  // Identify if currently active search query matches a tag
  const activeNormalizedTag = useMemo(() => {
    if (!selectedQuery) return null;
    const queryClean = selectedQuery.trim().toLowerCase().replace(/^#/, '');
    const found = tagFrequencies.find((t) => t.name === queryClean);
    return found ? found.name : queryClean;
  }, [selectedQuery, tagFrequencies]);

  const handleTagClick = (tagName: string) => {
    if (activeNormalizedTag === tagName) {
      onClearTag();
      showToast(`Cleared tag filter`, 'info');
    } else {
      onSelectTag(tagName);
      const count = tagFrequencies.find((t) => t.name === tagName)?.count || 0;
      showToast(`Filtering by tag: #${tagName} (${count} resources)`, 'success');
    }
  };

  if (tagFrequencies.length === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs transition-colors">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl bg-gradient-to-br ${config.gradientFromTo} text-white shadow-xs`}>
            <Hash className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white font-mono flex items-center gap-1.5">
                <span>Popular Tag Cloud</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700">
                  {tagFrequencies.length} tags
                </span>
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Click any tag to filter resources instantly across all sections
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Tag search input inside section */}
          <div className="relative w-36 sm:w-44">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Find tag..."
              value={tagSearchQuery}
              onChange={(e) => setTagSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1 text-xs rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            />
            {tagSearchQuery && (
              <button
                onClick={() => setTagSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="px-2.5 py-1 rounded-xl text-xs font-mono font-medium bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 transition-colors"
          >
            {isCollapsed ? 'Expand' : 'Hide'}
          </button>
        </div>
      </div>

      {/* Active Filter Banner if Tag Selected */}
      {activeNormalizedTag && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-2.5 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-amber-900 dark:text-amber-200">
            <Filter className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>
              Filtered by tag: <strong className="underline">#{activeNormalizedTag}</strong>
            </span>
          </div>

          <button
            onClick={() => {
              onClearTag();
              showToast('Cleared tag filter', 'info');
            }}
            className="flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 hover:bg-amber-300 dark:hover:bg-amber-800 transition-colors"
          >
            <X className="w-3 h-3" />
            <span>Clear Filter</span>
          </button>
        </motion.div>
      )}

      {/* Tags Cloud Box */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3.5"
          >
            {displayedTags.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono py-2 text-center">
                No tags match &quot;{tagSearchQuery}&quot;
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {displayedTags.map((tf) => {
                  const isActive = activeNormalizedTag === tf.name;
                  const ratio = tf.count / maxCount;
                  
                  // Compute dynamic visual weight
                  let sizeClass = 'text-[11px] py-1 px-2.5';
                  let weightClass = 'font-normal';

                  if (ratio > 0.4 || tf.count >= 8) {
                    sizeClass = 'text-xs py-1.5 px-3';
                    weightClass = 'font-bold';
                  } else if (ratio > 0.2 || tf.count >= 4) {
                    sizeClass = 'text-[11.5px] py-1 px-2.5';
                    weightClass = 'font-semibold';
                  }

                  return (
                    <motion.button
                      key={tf.name}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTagClick(tf.name)}
                      className={`inline-flex items-center gap-1.5 rounded-xl transition-all duration-150 cursor-pointer font-mono border shadow-2xs ${sizeClass} ${weightClass} ${
                        isActive
                          ? `${config.bgActive} ${config.textAccent} border-${config.borderActive} ring-2 ring-amber-500/30 shadow-xs`
                          : ratio > 0.4 || tf.count >= 8
                          ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800/80 hover:bg-amber-100 dark:hover:bg-amber-900/50'
                          : ratio > 0.2 || tf.count >= 4
                          ? 'bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border-slate-200 dark:border-zinc-700 hover:border-amber-400 dark:hover:border-amber-500/50'
                          : 'bg-slate-50 dark:bg-zinc-800/50 text-slate-600 dark:text-zinc-400 border-slate-200/80 dark:border-zinc-700/50 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-200'
                      }`}
                      title={`Filter by #${tf.name} (${tf.count} items)`}
                    >
                      <span className="opacity-70">#</span>
                      <span>{tf.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                        isActive
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-200/80 dark:bg-zinc-900/80 text-slate-600 dark:text-zinc-400'
                      }`}>
                        {tf.count}
                      </span>
                      {isActive && <X className="w-3 h-3 text-amber-500 ml-0.5" />}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Expand / Show All Toggle Button */}
            {tagFrequencies.length > 28 && !tagSearchQuery && (
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-zinc-800/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                  Showing {displayedTags.length} of {tagFrequencies.length} popular tags
                </span>

                <button
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{showAllTags ? 'Show Top 28 Tags' : `Show All ${tagFrequencies.length} Tags`}</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
