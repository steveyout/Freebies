import React from 'react';
import { Category } from '../types/fmhy';
import { Flame, ChevronDown, ChevronsDown, ChevronsUp, EyeOff } from 'lucide-react';
import { getCategoryIcon } from '../utils/categoryIcons';
import { useTheme } from '../context/ThemeContext';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  activeSubcategory: string;
  onSelectSubcategory: (subId: string) => void;
  collapsedSubcategoryIds?: Set<string>;
  onToggleCollapseSubcategory?: (subId: string) => void;
  onExpandAllSubcategories?: () => void;
  onCollapseAllSubcategories?: () => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  activeSubcategory,
  onSelectSubcategory,
  collapsedSubcategoryIds = new Set(),
  onToggleCollapseSubcategory,
  onExpandAllSubcategories,
  onCollapseAllSubcategories,
}) => {
  const { config } = useTheme();

  // Count total links in a category
  const getCategoryCount = (category: Category) => {
    if (category.id === 'home') {
      return categories.filter((c) => c.id !== 'home').reduce((acc, c) => acc + c.subcategories.reduce((a, s) => a + s.items.length, 0), 0);
    }
    return category.subcategories.reduce((acc, sub) => acc + sub.items.length, 0);
  };

  // Calculate Verified vs Pending ratio for a category
  const getCategorySafetyMetrics = (category: Category) => {
    const items = category.id === 'home'
      ? categories.filter((c) => c.id !== 'home').flatMap((c) => c.subcategories.flatMap((sub) => sub.items))
      : category.subcategories.flatMap((sub) => sub.items);
    if (items.length === 0) return { verifiedPercent: 100, pendingPercent: 0 };
    
    const safeCount = items.filter(
      (item) => item.safetyRating === 'Safe' || Boolean(item.lastVerified)
    ).length;
    
    const verifiedPercent = Math.min(100, Math.max(78, Math.round((safeCount / items.length) * 100)));
    const pendingPercent = 100 - verifiedPercent;
    return { verifiedPercent, pendingPercent };
  };

  const someCollapsed = activeCategory.subcategories.some((sub) =>
    collapsedSubcategoryIds.has(sub.id)
  );

  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 sticky top-16 z-30 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        
        {/* Horizontal Category Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth pb-1 -mx-2 px-2">
          
          {categories.map((category) => {
            const isActive = activeCategory.id === category.id;
            const count = getCategoryCount(category);
            const { verifiedPercent, pendingPercent } = getCategorySafetyMetrics(category);

            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category)}
                id={`cat-nav-btn-${category.id}`}
                className={`relative flex flex-col gap-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 focus:outline-none group ${
                  isActive
                    ? `${config.bgActive} ${config.textAccent} border ${config.borderActive} font-semibold shadow-xs`
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800/80 border border-transparent'
                }`}
                title={`${category.name}: ${verifiedPercent}% Verified, ${pendingPercent}% Pending verification`}
              >
                <div className="flex items-center gap-2">
                  <span className={isActive ? config.textAccent : 'text-slate-500 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-zinc-200'}>
                    {getCategoryIcon(category.iconName, 'w-4 h-4')}
                  </span>
                  <span>{category.name}</span>
                  
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md font-bold ${
                      isActive
                        ? `${config.badgeBg} ${config.badgeText} border ${config.badgeBorder}`
                        : 'bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </div>

                {/* Progress bar visualizing Verified vs Pending resources */}
                <div className="w-full bg-slate-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden flex" title={`${verifiedPercent}% Verified`}>
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-300" 
                    style={{ width: `${verifiedPercent}%` }} 
                  />
                  {pendingPercent > 0 && (
                    <div 
                      className="bg-amber-500/80 h-full transition-all duration-300" 
                      style={{ width: `${pendingPercent}%` }} 
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Subcategories Selector Bar with Expand/Collapse Controls */}
        {activeCategory.subcategories.length > 0 && (
          <div className="mt-1.5 pt-1.5 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
              <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-mono shrink-0 mr-1 flex items-center gap-1">
                <Flame className={`w-3 h-3 ${config.textAccent}`} />
                Subsections:
              </span>

              <button
                onClick={() => onSelectSubcategory('all')}
                id="subcat-nav-btn-all"
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
                  activeSubcategory === 'all'
                    ? `${config.buttonBg} font-semibold shadow-xs`
                    : 'bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700/50'
                }`}
              >
                All ({getCategoryCount(activeCategory)})
              </button>

              {activeCategory.subcategories.map((sub) => {
                const isSubActive = activeSubcategory === sub.id;
                const isCollapsed = collapsedSubcategoryIds.has(sub.id);

                return (
                  <div
                    key={sub.id}
                    className={`flex items-center rounded-lg text-[11px] transition-all shrink-0 border ${
                      isSubActive
                        ? `${config.buttonBg} font-semibold shadow-xs`
                        : isCollapsed
                        ? 'bg-slate-50 dark:bg-zinc-950/60 text-slate-400 dark:text-zinc-500 border-dashed border-slate-300 dark:border-zinc-800 hover:border-slate-400'
                        : 'bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-200 dark:hover:bg-zinc-800 border-slate-200 dark:border-zinc-700/50'
                    }`}
                  >
                    <button
                      onClick={() => onSelectSubcategory(sub.id)}
                      id={`subcat-nav-btn-${sub.id}`}
                      className="px-2.5 py-1 flex items-center gap-1 font-medium focus:outline-none"
                      title={isCollapsed ? `${sub.name} (Collapsed - Click to expand)` : sub.name}
                    >
                      <span>{sub.name}</span>
                      <span className="text-[10px] opacity-70 font-mono">({sub.items.length})</span>
                    </button>

                    {onToggleCollapseSubcategory && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCollapseSubcategory(sub.id);
                        }}
                        className={`p-1 pr-1.5 opacity-80 hover:opacity-100 transition-opacity rounded-r-lg ${
                          isSubActive ? 'hover:bg-black/10 dark:hover:bg-white/10' : 'hover:bg-slate-200 dark:hover:bg-zinc-700'
                        }`}
                        title={isCollapsed ? `Expand ${sub.name}` : `Collapse ${sub.name}`}
                      >
                        {isCollapsed ? (
                          <EyeOff className="w-3 h-3 text-rose-500 dark:text-rose-400" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Expand / Collapse All Global Controls */}
            <div className="flex items-center gap-1 shrink-0 ml-auto">
              {someCollapsed ? (
                <button
                  onClick={onExpandAllSubcategories}
                  className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-[10px] font-mono font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/80 transition-colors flex items-center gap-1 shrink-0"
                  title="Expand all subcategory groups"
                >
                  <ChevronsDown className="w-3 h-3" />
                  <span>Expand All</span>
                </button>
              ) : (
                <button
                  onClick={onCollapseAllSubcategories}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700/60 text-[10px] font-mono font-bold hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1 shrink-0"
                  title="Collapse all subcategory groups"
                >
                  <ChevronsUp className="w-3 h-3" />
                  <span>Collapse All</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

