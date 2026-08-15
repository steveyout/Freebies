import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend
} from 'recharts';
import { Category, LinkItem } from '../types/fmhy';
import {
  PieChart as PieChartIcon,
  BarChart2,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Filter,
  ShieldCheck,
  Code,
  BookOpen,
  Monitor
} from 'lucide-react';

interface CategoryResourceDistributionChartProps {
  category: Category;
  items: LinkItem[];
  onSelectTag?: (tag: string) => void;
  onSelectSubcategory?: (subcategoryId: string) => void;
}

export type DistributionMode = 'resource_type' | 'subcategories' | 'features';

const PALETTE = [
  '#0ea5e9', // Sky 500
  '#10b981', // Emerald 500
  '#8b5cf6', // Violet 500
  '#f59e0b', // Amber 500
  '#f43f5e', // Rose 500
  '#06b6d4', // Cyan 500
  '#6366f1', // Indigo 500
  '#ec4899', // Pink 500
  '#14b8a6', // Teal 500
  '#84cc16', // Lime 500
];

export const CategoryResourceDistributionChart: React.FC<CategoryResourceDistributionChartProps> = ({
  category,
  items,
  onSelectTag,
  onSelectSubcategory,
}) => {
  const [chartType, setChartType] = useState<'donut' | 'bar'>('donut');
  const [distributionMode, setDistributionMode] = useState<DistributionMode>('resource_type');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 1. Classify items into standard Resource Types (Software, Docs, Guides, Tools, Media, Extensions)
  const resourceTypeDistribution = useMemo(() => {
    const counts: Record<string, { count: number; icon: string; description: string }> = {
      Software: { count: 0, icon: '💻', description: 'Desktop, mobile apps & executables' },
      Docs: { count: 0, icon: '📚', description: 'Wikis, cheat-sheets & documentation' },
      Guides: { count: 0, icon: '📖', description: 'Tutorials, walkthroughs & learning' },
      'Web Tools': { count: 0, icon: '⚡', description: 'Online tools, utilities & web apps' },
      'Streaming & Media': { count: 0, icon: '🎬', description: 'Video, audio & media players' },
      'Extensions & Scripts': { count: 0, icon: '🧩', description: 'Browser extensions & filterlists' },
      'Indexers & Hubs': { count: 0, icon: '🗂️', description: 'Directories, search engines & catalogs' },
    };

    items.forEach((item) => {
      const text = `${item.title} ${item.description} ${item.subcategory} ${item.tags.join(' ')}`.toLowerCase();

      if (
        text.includes('doc') ||
        text.includes('wiki') ||
        text.includes('cheat') ||
        text.includes('reference') ||
        text.includes('specs') ||
        text.includes('readme')
      ) {
        counts['Docs'].count += 1;
      } else if (
        text.includes('guide') ||
        text.includes('tutorial') ||
        text.includes('walkthrough') ||
        text.includes('course') ||
        text.includes('how to') ||
        text.includes('setup')
      ) {
        counts['Guides'].count += 1;
      } else if (
        text.includes('extension') ||
        text.includes('addon') ||
        text.includes('filterlist') ||
        text.includes('script') ||
        text.includes('ublock') ||
        text.includes('tampermonkey')
      ) {
        counts['Extensions & Scripts'].count += 1;
      } else if (
        text.includes('stream') ||
        text.includes('movie') ||
        text.includes('tv ') ||
        text.includes('anime') ||
        text.includes('cinema') ||
        text.includes('player') ||
        text.includes('video') ||
        text.includes('audio') ||
        text.includes('music')
      ) {
        counts['Streaming & Media'].count += 1;
      } else if (
        item.isOpenSource ||
        text.includes('software') ||
        text.includes('desktop') ||
        text.includes('app') ||
        text.includes('client') ||
        text.includes('foss') ||
        text.includes('emulator')
      ) {
        counts['Software'].count += 1;
      } else if (
        text.includes('index') ||
        text.includes('directory') ||
        text.includes('catalog') ||
        text.includes('hub') ||
        text.includes('search') ||
        text.includes('tracker')
      ) {
        counts['Indexers & Hubs'].count += 1;
      } else {
        counts['Web Tools'].count += 1;
      }
    });

    return Object.entries(counts)
      .map(([name, data]) => ({
        name,
        count: data.count,
        icon: data.icon,
        description: data.description,
        percentage: items.length > 0 ? Math.round((data.count / items.length) * 100) : 0,
      }))
      .filter((entry) => entry.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [items]);

  // 2. Subcategory breakdown
  const subcategoryDistribution = useMemo(() => {
    if (!category.subcategories || category.subcategories.length === 0) return [];
    return category.subcategories
      .map((sub) => {
        const subItems = items.filter((i) => i.subcategory === sub.id);
        return {
          id: sub.id,
          name: sub.name,
          count: subItems.length,
          percentage: items.length > 0 ? Math.round((subItems.length / items.length) * 100) : 0,
        };
      })
      .filter((s) => s.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [category, items]);

  // 3. Feature / Safety breakdown
  const featureDistribution = useMemo(() => {
    const openSourceCount = items.filter((i) => i.isOpenSource).length;
    const noRegCount = items.filter((i) => i.isNoReg).length;
    const noAdsCount = items.filter((i) => i.isNoAds).length;
    const starredCount = items.filter((i) => i.isStarred).length;
    const verifiedSafeCount = items.filter((i) => i.safetyRating === 'Safe').length;

    return [
      { name: 'Verified Safe', count: verifiedSafeCount, percentage: items.length ? Math.round((verifiedSafeCount / items.length) * 100) : 0 },
      { name: 'No Registration', count: noRegCount, percentage: items.length ? Math.round((noRegCount / items.length) * 100) : 0 },
      { name: 'Open Source', count: openSourceCount, percentage: items.length ? Math.round((openSourceCount / items.length) * 100) : 0 },
      { name: 'Ad-Free / Zero Ads', count: noAdsCount, percentage: items.length ? Math.round((noAdsCount / items.length) * 100) : 0 },
      { name: 'Starred Picks', count: starredCount, percentage: items.length ? Math.round((starredCount / items.length) * 100) : 0 },
    ].filter((f) => f.count > 0);
  }, [items]);

  const activeData = useMemo(() => {
    if (distributionMode === 'resource_type') return resourceTypeDistribution;
    if (distributionMode === 'subcategories') return subcategoryDistribution;
    return featureDistribution;
  }, [distributionMode, resourceTypeDistribution, subcategoryDistribution, featureDistribution]);

  const totalCount = items.length;
  const topResource = resourceTypeDistribution[0];

  if (totalCount === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800/90 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs transition-all">
      {/* Header bar of chart component */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 dark:from-sky-500/30 dark:to-indigo-500/30 border border-sky-300 dark:border-sky-700/50 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-mono text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Resource Type Distribution</span>
                <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 px-1.5 py-0.2 rounded font-bold">
                  {totalCount} Total Items
                </span>
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Live breakdown of Software, Docs, Guides, and tools in <strong className="text-slate-700 dark:text-zinc-300">{category.name}</strong>
            </p>
          </div>
        </div>

        {/* Action Controls & Mode switchers */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Mode Selector */}
          <div className="bg-slate-100 dark:bg-zinc-800 p-0.5 rounded-xl flex items-center text-xs font-mono border border-slate-200 dark:border-zinc-700">
            <button
              onClick={() => setDistributionMode('resource_type')}
              className={`px-2.5 py-1 rounded-lg transition-all font-semibold ${
                distributionMode === 'resource_type'
                  ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Distribution of Software, Docs, Guides, Tools"
            >
              Resource Types
            </button>
            <button
              onClick={() => setDistributionMode('subcategories')}
              className={`px-2.5 py-1 rounded-lg transition-all font-semibold ${
                distributionMode === 'subcategories'
                  ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Distribution across Subcategories"
            >
              Subcategories
            </button>
            <button
              onClick={() => setDistributionMode('features')}
              className={`px-2.5 py-1 rounded-lg transition-all font-semibold ${
                distributionMode === 'features'
                  ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Open Source, No Reg, Safety metrics"
            >
              Features & Safety
            </button>
          </div>

          {/* Chart format toggles */}
          <div className="bg-slate-100 dark:bg-zinc-800 p-0.5 rounded-xl flex items-center border border-slate-200 dark:border-zinc-700">
            <button
              onClick={() => setChartType('donut')}
              className={`p-1.5 rounded-lg transition-all ${
                chartType === 'donut'
                  ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
              }`}
              title="Donut Chart View"
            >
              <PieChartIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-1.5 rounded-lg transition-all ${
                chartType === 'bar'
                  ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
              }`}
              title="Bar Chart View"
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Expand / Collapse */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 dark:text-zinc-400 transition-colors border border-slate-200 dark:border-zinc-700"
            title={isExpanded ? 'Collapse Chart' : 'Expand Chart'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4">
          {/* Quick Metrics highlight pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {topResource && (
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 dark:text-zinc-500">
                    Primary Type
                  </span>
                  <p className="text-xs font-bold text-slate-800 dark:text-zinc-200 truncate">
                    {topResource.icon} {topResource.name}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/80 px-1.5 py-0.5 rounded">
                  {topResource.percentage}%
                </span>
              </div>
            )}

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 dark:text-zinc-500">
                  Open Source Ratio
                </span>
                <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                  {items.filter((i) => i.isOpenSource).length} / {totalCount}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded">
                {Math.round((items.filter((i) => i.isOpenSource).length / (totalCount || 1)) * 100)}%
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 dark:text-zinc-500">
                  No Registration
                </span>
                <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                  {items.filter((i) => i.isNoReg).length} resources
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/80 px-1.5 py-0.5 rounded">
                {Math.round((items.filter((i) => i.isNoReg).length / (totalCount || 1)) * 100)}%
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 dark:text-zinc-500">
                  Verified Safe
                </span>
                <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                  {items.filter((i) => i.safetyRating === 'Safe').length} entries
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-950/80 px-1.5 py-0.5 rounded">
                {Math.round((items.filter((i) => i.safetyRating === 'Safe').length / (totalCount || 1)) * 100)}%
              </span>
            </div>
          </div>

          {/* Recharts Canvas Container & Interactive Legend Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Chart Area */}
            <div className="lg:col-span-7 h-56 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'donut' ? (
                  <PieChart>
                    <Pie
                      data={activeData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={78}
                      paddingAngle={3}
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      {activeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PALETTE[index % PALETTE.length]}
                          stroke="transparent"
                          className="transition-all duration-300 cursor-pointer"
                          style={{
                            filter: activeIndex === index ? 'drop-shadow(0 0 6px rgba(14, 165, 233, 0.5))' : undefined,
                            transform: activeIndex === index ? 'scale(1.04)' : 'scale(1)',
                            transformOrigin: 'center center',
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900/95 text-white p-2.5 rounded-xl shadow-xl text-xs font-mono border border-slate-700/80 backdrop-blur-xs">
                              <div className="font-bold flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: payload[0].color }} />
                                <span>{data.name}</span>
                              </div>
                              <div className="mt-1 flex items-center justify-between gap-4 text-slate-300">
                                <span>Count: <strong className="text-white">{data.count}</strong></span>
                                <span>Ratio: <strong className="text-sky-400">{data.percentage}%</strong></span>
                              </div>
                              {data.description && (
                                <p className="text-[10px] text-slate-400 mt-1">{data.description}</p>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                ) : (
                  <BarChart data={activeData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                      width={110}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900/95 text-white p-2 rounded-lg shadow-lg text-xs font-mono border border-slate-700">
                              <span className="font-bold">{data.name}</span>: {data.count} ({data.percentage}%)
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {activeData.map((_, index) => (
                        <Cell key={`bar-cell-${index}`} fill={PALETTE[index % PALETTE.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </ResponsiveContainer>

              {/* Centered Donut Label */}
              {chartType === 'donut' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold font-mono text-slate-800 dark:text-zinc-100">
                    {totalCount}
                  </span>
                  <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 dark:text-zinc-500 font-semibold">
                    Items
                  </span>
                </div>
              )}
            </div>

            {/* Interactive Type Cards / Legend List */}
            <div className="lg:col-span-5 flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
              {activeData.map((item, idx) => {
                const color = PALETTE[idx % PALETTE.length];
                const isHovered = activeIndex === idx;

                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={() => {
                      if (distributionMode === 'subcategories' && 'id' in item && onSelectSubcategory) {
                        onSelectSubcategory(item.id as string);
                      } else if (onSelectTag) {
                        onSelectTag(item.name);
                      }
                    }}
                    className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isHovered
                        ? 'bg-slate-100 dark:bg-zinc-800/90 border-sky-400 dark:border-sky-500 shadow-xs'
                        : 'bg-slate-50/60 dark:bg-zinc-950/40 border-slate-200/80 dark:border-zinc-800/60 hover:bg-slate-100/80 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-xs font-semibold font-mono text-slate-800 dark:text-zinc-200 truncate">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                        {item.count}
                      </span>
                      <span
                        className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md"
                        style={{
                          backgroundColor: `${color}20`,
                          color: color,
                        }}
                      >
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
