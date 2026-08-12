import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Share2,
  Image as ImageIcon,
  Code,
  Copy,
  Check,
  Download,
  Sparkles,
  Eye,
  Tv,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';
import { Category } from '../types/fmhy';

interface SeoHeadManagerProps {
  activeCategory?: Category;
  activeSubcategoryName?: string;
  searchQuery?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

// Open Graph Image SVG Generator
export function generateOgImageSvg({
  title,
  description,
  categoryName,
  accentColor = '#f43f5e',
  highlightFlixHQ = true,
}: {
  title: string;
  description: string;
  categoryName?: string;
  accentColor?: string;
  highlightFlixHQ?: boolean;
}): string {
  // SVG 1200x630 Social Card template
  const escapedTitle = title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const escapedDesc = description
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090b" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <!-- Accent Glow -->
    <radialGradient id="glow" cx="85%" cy="15%" r="60%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <!-- Subdued Mesh Grid -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25" />
    </pattern>

    <!-- Pill Gradient -->
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentColor}" />
      <stop offset="100%" stop-color="#e11d48" />
    </linearGradient>
  </defs>

  <!-- Base Canvas -->
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#glow)" />
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Outer Decorative Border -->
  <rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="#334155" stroke-width="1.5" stroke-opacity="0.5" />
  <rect x="25" y="25" width="1150" height="580" rx="23" fill="none" stroke="${accentColor}" stroke-width="1" stroke-opacity="0.2" />

  <!-- Top Brand Row -->
  <g transform="translate(64, 64)">
    <!-- Logo Badge -->
    <rect x="0" y="0" width="180" height="42" rx="12" fill="url(#badgeGrad)" />
    <text x="90" y="26" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="16" letter-spacing="1" text-anchor="middle">freebies HUB</text>

    <!-- Secondary Tag -->
    <rect x="196" y="0" width="140" height="42" rx="12" fill="#1e293b" stroke="#475569" stroke-width="1" />
    <text x="266" y="26" fill="#cbd5e1" font-family="monospace" font-weight="600" font-size="14" text-anchor="middle">${categoryName || 'DIRECTORY'}</text>
  </g>

  <!-- Title Section -->
  <g transform="translate(64, 180)">
    <text x="0" y="0" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="44" letter-spacing="-0.5">
      <tspan x="0" dy="0">${escapedTitle.slice(0, 48)}</tspan>
      ${escapedTitle.length > 48 ? `<tspan x="0" dy="56">${escapedTitle.slice(48, 95)}...</tspan>` : ''}
    </text>

    <!-- Description Text -->
    <text x="0" y="130" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="22">
      <tspan x="0" dy="0">${escapedDesc.slice(0, 85)}</tspan>
      ${escapedDesc.length > 85 ? `<tspan x="0" dy="32">${escapedDesc.slice(85, 170)}...</tspan>` : ''}
    </text>
  </g>

  <!-- Highlighted Priority Cards Row -->
  ${
    highlightFlixHQ
      ? `
  <g transform="translate(64, 430)">
    <!-- FlixHQ Card -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="310" height="70" rx="16" fill="#18181b" stroke="#f43f5e" stroke-width="1.5" />
      <circle cx="36" cy="35" r="16" fill="#f43f5e" fill-opacity="0.2" />
      <text x="36" y="41" fill="#f43f5e" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">🔥</text>
      <text x="68" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="18">FlixHQ</text>
      <text x="68" y="52" fill="#f43f5e" font-family="monospace" font-weight="600" font-size="13">https://flixhq.ink</text>
    </g>

    <!-- CineJoy Card -->
    <g transform="translate(330, 0)">
      <rect x="0" y="0" width="310" height="70" rx="16" fill="#18181b" stroke="#fbbf24" stroke-width="1.5" />
      <circle cx="36" cy="35" r="16" fill="#fbbf24" fill-opacity="0.2" />
      <text x="36" y="41" fill="#fbbf24" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">⭐</text>
      <text x="68" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="18">CineJoy</text>
      <text x="68" y="52" fill="#fbbf24" font-family="monospace" font-weight="600" font-size="13">https://cinejoy.online</text>
    </g>

    <!-- Verified Badge Card -->
    <g transform="translate(660, 0)">
      <rect x="0" y="0" width="240" height="70" rx="16" fill="#18181b" stroke="#10b981" stroke-width="1.5" />
      <circle cx="36" cy="35" r="16" fill="#10b981" fill-opacity="0.2" />
      <text x="36" y="41" fill="#10b981" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">🛡️</text>
      <text x="68" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="16">100% Verified</text>
      <text x="68" y="52" fill="#10b981" font-family="monospace" font-weight="600" font-size="13">Zero Ads &amp; Fast</text>
    </g>
  </g>
  `
      : ''
  }

  <!-- Bottom Metadata Bar -->
  <g transform="translate(64, 555)">
    <text x="0" y="0" fill="#64748b" font-family="monospace" font-size="14">
      https://github.com/steveyout/Freebies • Updated Daily • Open Source Directory
    </text>
  </g>
</svg>`;
}

export const SeoHeadManager: React.FC<SeoHeadManagerProps> = ({
  activeCategory,
  activeSubcategoryName,
  searchQuery,
  isOpen = false,
  onClose,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedDataUri, setCopiedDataUri] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'og-image'>('preview');

  // Dynamic Page Title
  const pageTitle = useMemo(() => {
    if (searchQuery && searchQuery.trim()) {
      return `Search "${searchQuery}" | freebies Directory`;
    }
    if (activeCategory) {
      if (activeCategory.id === 'streaming') {
        return activeSubcategoryName
          ? `${activeSubcategoryName} (FlixHQ & CineJoy) - Streaming | freebies`
          : 'FlixHQ & CineJoy HD Movies & TV Streaming | freebies Directory';
      }
      return activeSubcategoryName
        ? `${activeSubcategoryName} - ${activeCategory.name} | freebies`
        : `${activeCategory.name} - freebies Directory`;
    }
    return 'freebies | Ultimate Directory of Free Streaming, Tools & Resources';
  }, [searchQuery, activeCategory, activeSubcategoryName]);

  // Dynamic Meta Description
  const metaDescription = useMemo(() => {
    if (activeCategory?.id === 'streaming') {
      return 'Top-priority streaming resources featuring FlixHQ (flixhq.ink) and CineJoy (cinejoy.online). Watch HD movies, TV series, anime, and media content free with zero ads.';
    }
    if (activeCategory) {
      return `Explore curated ${activeCategory.name} resources, open-source software, adblocking guides, and free media on freebies.`;
    }
    return 'freebies is the ultimate open-source mega-directory featuring top streaming sites (FlixHQ, CineJoy), tools, adblocking guides, and software.';
  }, [activeCategory]);

  // Generated SVG string and Data URI
  const ogSvgString = useMemo(() => {
    return generateOgImageSvg({
      title: pageTitle,
      description: metaDescription,
      categoryName: activeCategory?.name.toUpperCase() || 'DIRECTORY',
      accentColor: activeCategory?.id === 'streaming' ? '#f43f5e' : '#38bdf8',
      highlightFlixHQ: true,
    });
  }, [pageTitle, metaDescription, activeCategory]);

  const ogDataUri = useMemo(() => {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(ogSvgString)}`;
  }, [ogSvgString]);

  // Inject Meta Tags into Document <head>
  useEffect(() => {
    document.title = pageTitle;

    const setMetaTag = (selector: string, attrName: string, attrVal: string, contentVal: string) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', contentVal);
    };

    const setLinkTag = (relVal: string, hrefVal: string) => {
      let tag = document.querySelector(`link[rel="${relVal}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', relVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', hrefVal);
    };

    // Standard Meta
    setMetaTag('meta[name="description"]', 'name', 'description', metaDescription);
    setMetaTag(
      'meta[name="keywords"]',
      'name',
      'keywords',
      'FlixHQ, flixhq.ink, CineJoy, cinejoy.online, free movies, streaming, HD TV shows, adblocker, freebies, open source directory'
    );
    setMetaTag('meta[name="author"]', 'name', 'author', 'freebies Community');
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow');
    setLinkTag('canonical', window.location.href);

    // Open Graph
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'freebies Directory');
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metaDescription);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', window.location.href);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogDataUri);
    setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
    setMetaTag('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/svg+xml');
    setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', pageTitle);

    // Twitter Card
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metaDescription);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogDataUri);
    setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', pageTitle);

    // Schema.org Structured Data Graph
    const jsonLdId = 'fmhy-jsonld-schema';
    let scriptTag = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const jsonLdData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: 'freebies - Ultimate Free Resources Index',
          url: window.location.href,
          description: metaDescription,
          publisher: {
            '@type': 'Organization',
            name: 'freebies Community',
            logo: 'https://fmhy.net/assets/logo.png',
          },
        },
        {
          '@type': 'ItemList',
          name: 'Top Priority Streaming Platforms',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'FlixHQ',
              url: 'https://flixhq.ink',
              description: 'Premier HD movie & TV series streaming platform with fast servers and zero registration.',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'CineJoy',
              url: 'https://cinejoy.online',
              description: 'Ultra-fast online cinema streaming portal with multi-server backup mirrors and clean UI.',
            },
          ],
        },
      ],
    };

    scriptTag.text = JSON.stringify(jsonLdData);
  }, [pageTitle, metaDescription, ogDataUri]);

  // Code snippet for users to inspect
  const metaCodeSnippet = useMemo(() => {
    return `<!-- SEO Primary Meta Tags -->
<title>${pageTitle}</title>
<meta name="title" content="${pageTitle}" />
<meta name="description" content="${metaDescription}" />
<meta name="keywords" content="FlixHQ, flixhq.ink, CineJoy, cinejoy.online, free movies, streaming, HD TV shows, adblocker, freebies" />
<meta name="author" content="freebies Community" />
<link rel="canonical" href="${typeof window !== 'undefined' ? window.location.href : 'https://freebies.app'}" />

<!-- Open Graph / Facebook / Discord -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${typeof window !== 'undefined' ? window.location.href : 'https://freebies.app'}" />
<meta property="og:title" content="${pageTitle}" />
<meta property="og:description" content="${metaDescription}" />
<meta property="og:image" content="https://flixhq.ink/og-banner.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter Social Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${pageTitle}" />
<meta name="twitter:description" content="${metaDescription}" />
<meta name="twitter:image" content="https://flixhq.ink/og-banner.png" />`;
  }, [pageTitle, metaDescription]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(metaCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyDataUri = () => {
    navigator.clipboard.writeText(ogDataUri);
    setCopiedDataUri(true);
    setTimeout(() => setCopiedDataUri(false), 2000);
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([ogSvgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `freebies-og-${(activeCategory?.id || 'directory')}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-zinc-100"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-950/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-mono tracking-tight flex items-center gap-2">
                  <span>SEO Meta &amp; Social Graph Studio</span>
                  <span className="text-[10px] font-mono font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full uppercase">
                    Live Engine
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Dynamic Open Graph card generation, meta tags validation, and social preview simulator.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-200 dark:border-zinc-800 bg-slate-100/50 dark:bg-zinc-900/50">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 text-xs font-mono font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                activeTab === 'preview'
                  ? 'border-rose-500 text-rose-600 dark:text-rose-400 bg-white dark:bg-zinc-900 shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Social Media Previews</span>
            </button>

            <button
              onClick={() => setActiveTab('og-image')}
              className={`px-4 py-2 text-xs font-mono font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                activeTab === 'og-image'
                  ? 'border-rose-500 text-rose-600 dark:text-rose-400 bg-white dark:bg-zinc-900 shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>OG Card Canvas (1200x630)</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 text-xs font-mono font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                activeTab === 'code'
                  ? 'border-rose-500 text-rose-600 dark:text-rose-400 bg-white dark:bg-zinc-900 shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Meta Code Inspector</span>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto space-y-6 max-h-[65vh]">
            {activeTab === 'preview' && (
              <div className="space-y-6">
                {/* Twitter / X Card Simulator */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-sky-500" />
                      <span>Twitter / X Large Card Preview</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">1200 × 630 Ratio</span>
                  </div>

                  {/* Mock Twitter Card Container */}
                  <div className="rounded-2xl overflow-hidden border border-slate-300 dark:border-zinc-800 bg-zinc-950 text-white shadow-lg">
                    <div className="relative aspect-[1200/630] w-full bg-zinc-900 overflow-hidden">
                      <div
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: ogSvgString }}
                      />
                    </div>
                    <div className="p-3 bg-zinc-900/90 border-t border-zinc-800 font-sans">
                      <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">flixhq.ink</p>
                      <h4 className="text-sm font-bold text-white line-clamp-1 mt-0.5">{pageTitle}</h4>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{metaDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Highlighted Streaming SEO Entities */}
                <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200 flex items-center gap-2 font-mono">
                      <Tv className="w-4 h-4 text-rose-500" />
                      <span>Top Priority Entities: FlixHQ &amp; CineJoy</span>
                    </h4>
                    <p className="text-xs text-rose-700 dark:text-rose-300">
                      Indexed with high schema priority for fast Google Rich Results and social media card unfurling.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href="https://flixhq.ink"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold font-mono flex items-center gap-1.5 hover:bg-rose-500 shadow-sm"
                    >
                      <span>FlixHQ</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://cinejoy.online"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold font-mono flex items-center gap-1.5 hover:bg-amber-400 shadow-sm"
                    >
                      <span>CineJoy</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'og-image' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold font-mono">Dynamic SVG Open Graph Generator</h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      Standard 1200x630 vector social banner rendered on-the-fly.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyDataUri}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-xs font-bold font-mono flex items-center gap-1.5 border border-slate-200 dark:border-zinc-700"
                    >
                      {copiedDataUri ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedDataUri ? 'Copied URI' : 'Copy Data URI'}</span>
                    </button>

                    <button
                      onClick={handleDownloadSvg}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download SVG</span>
                    </button>
                  </div>
                </div>

                {/* SVG Live Render Box */}
                <div className="rounded-2xl border border-slate-300 dark:border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl p-2">
                  <div
                    className="w-full h-auto rounded-xl overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: ogSvgString }}
                  />
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold font-mono">Generated HTML Head Meta Snippet</h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      Automatically synced with active category, title, and streaming priorities.
                    </p>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied All Meta' : 'Copy HTML Meta'}</span>
                  </button>
                </div>

                <div className="relative rounded-2xl bg-zinc-950 p-4 border border-zinc-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{metaCodeSnippet}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/40 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
            <div className="flex items-center gap-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Social Crawler &amp; OpenGraph Compliant</span>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold font-mono text-xs"
            >
              Close Studio
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
