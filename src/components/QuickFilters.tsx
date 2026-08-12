import React from 'react';
import { SearchFilterState } from '../types/fmhy';
import { 
  Star, 
  Code, 
  ShieldCheck, 
  UserCheck, 
  LayoutGrid, 
  List, 
  Rows, 
  X, 
  Filter,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface QuickFiltersProps {
  filters: SearchFilterState;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  totalResults: number;
  onOpenHealthAudit?: () => void;
}

export const QuickFilters: React.FC<QuickFiltersProps> = ({
  filters,
  setFilters,
  totalResults,
  onOpenHealthAudit,
}) => {
  const { config } = useTheme();

  const isAnyFilterActive = 
    filters.query ||
    filters.onlyStarred ||
    filters.onlyOpenSource ||
    filters.onlyNoReg ||
    filters.onlySafe ||
    filters.onlyHighRated ||
    filters.onlyBroken ||
    filters.hideBroken ||
    filters.showNsfw;

  const resetFilters = () => {
    setFilters((prev) => ({
      ...prev,
      query: '',
      onlyStarred: false,
      onlyOpenSource: false,
      onlyNoReg: false,
      onlySafe: false,
      onlyHighRated: false,
      onlyBroken: false,
      hideBroken: false,
      showNsfw: false,
    }));
  };

  return (
    <div className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-2xl p-3 mb-6 transition-colors shadow-xs">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 font-mono uppercase tracking-widest mr-1 flex items-center gap-1">
            <Filter className={`w-3.5 h-3.5 ${config.textAccent}`} />
            Filters:
          </span>

          <button
            onClick={() => setFilters((p) => ({ ...p, onlyStarred: !p.onlyStarred }))}
            id="filter-starred-btn"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
              filters.onlyStarred
                ? `${config.bgActive} ${config.textAccent} border ${config.borderActive}`
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border border-slate-200 dark:border-zinc-700/50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filters.onlyStarred ? 'text-amber-400 fill-amber-400' : 'text-amber-500 dark:text-amber-400'}`} />
            <span>Starred</span>
          </button>

          <button
            onClick={() => setFilters((p) => ({ ...p, onlyHighRated: !p.onlyHighRated }))}
            id="filter-highrated-btn"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
              filters.onlyHighRated
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-600/60 shadow-xs'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border border-slate-200 dark:border-zinc-700/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>High Rated (4.5★+)</span>
          </button>

          <button
            onClick={() => setFilters((p) => ({ ...p, onlyOpenSource: !p.onlyOpenSource }))}
            id="filter-foss-btn"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
              filters.onlyOpenSource
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/60'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border border-slate-200 dark:border-zinc-700/50'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Open Source</span>
          </button>

          <button
            onClick={() => setFilters((p) => ({ ...p, onlyNoReg: !p.onlyNoReg }))}
            id="filter-noreg-btn"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
              filters.onlyNoReg
                ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-400 border border-blue-300 dark:border-blue-800/60'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border border-slate-200 dark:border-zinc-700/50'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>No Signup</span>
          </button>

          <button
            onClick={() => setFilters((p) => ({ ...p, onlySafe: !p.onlySafe }))}
            id="filter-safe-btn"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
              filters.onlySafe
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/60'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border border-slate-200 dark:border-zinc-700/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>100% Safe</span>
          </button>

          <button
            onClick={() => setFilters((p) => ({ ...p, onlyBroken: !p.onlyBroken }))}
            id="filter-broken-btn"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
              filters.onlyBroken
                ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-xs'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border border-slate-200 dark:border-zinc-700/50'
            }`}
            title="Filter to broken or flagged links only"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>Broken / Flagged</span>
          </button>

          {isAnyFilterActive && (
            <button
              onClick={resetFilters}
              id="filter-reset-btn"
              className="flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* View Mode & Count */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-zinc-800">
          <span className="font-mono text-slate-500 dark:text-zinc-400 text-xs">
            Showing <strong className={config.textAccent}>{totalResults}</strong> items
          </span>

          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
            <button
              onClick={() => setFilters((p) => ({ ...p, viewMode: 'grid' }))}
              id="viewmode-grid-btn"
              className={`p-1 rounded-lg transition-colors ${
                filters.viewMode === 'grid' ? `${config.buttonBg}` : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setFilters((p) => ({ ...p, viewMode: 'list' }))}
              id="viewmode-list-btn"
              className={`p-1 rounded-lg transition-colors ${
                filters.viewMode === 'list' ? `${config.buttonBg}` : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
              title="Detailed List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setFilters((p) => ({ ...p, viewMode: 'compact' }))}
              id="viewmode-compact-btn"
              className={`p-1 rounded-lg transition-colors ${
                filters.viewMode === 'compact' ? `${config.buttonBg}` : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
              title="Compact Rows View"
            >
              <Rows className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
