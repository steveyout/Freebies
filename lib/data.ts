import { Category, SubCategory, LinkItem } from '@/types/fmhy';
import { FMHY_CATEGORIES, HOME_CATEGORY } from '@/data/fmhyData';
import { DEFAULT_MARKDOWN_FILES } from '@/data/markdownData';
import { parseMarkdownToCategories } from '@/utils/markdownParser';

// Category Editorial Overviews for high-quality SEO content
export interface CategoryEditorial {
  title: string;
  summary: string;
  longDescription: string;
  keyFeatures: string[];
  safetyTips: string[];
  faqs: { question: string; answer: string }[];
}

export const CATEGORY_EDITORIALS: Record<string, CategoryEditorial> = {
  streaming: {
    title: 'Free HD Movies, TV Series, Anime & Live Sports Streaming Directory',
    summary: 'A comprehensively audited collection of high-definition streaming portals, media players, and sports indexers with zero required registration and minimal intrusive ads.',
    longDescription: `Navigating the modern web for free movies, television series, anime, and live sporting events requires discernment. The freebies Streaming Directory curates platforms that prioritize viewer safety, high resolution (1080p and 4K), multi-server reliability, and ad-free or low-friction viewing experiences.

Our team and community audit media indexers daily to verify server uptime, test multi-language subtitles, and check for responsive mobile playback. Platforms such as FlixHQ and CineJoy represent the benchmark for modern web streaming: fast cloud CDNs, clean user interfaces, zero registration walls, and robust backup mirrors in case of domain rotations.`,
    keyFeatures: [
      'Zero Registration Required: Immediate playback without personal accounts or credit cards.',
      'High Definition Streams: 1080p Full HD video with auto-adaptive bitrate for smooth playback.',
      'Auto Subtitles & Multi-Audio: Built-in closed captions in English, Spanish, French, and 20+ languages.',
      'Multiple Redundant Mirrors: Fast server switchers ensuring uninterrupted viewing during peak hours.',
      'Mobile & Smart TV Friendly: Compatible with iOS Safari, Android Chrome, and TV browsers.',
    ],
    safetyTips: [
      'Always install uBlock Origin or enable a privacy-focused DNS (like NextDNS or AdGuard) before visiting media indexers.',
      'Never download executable (.exe, .dmg, .apk) files disguised as video players or codec updates.',
      'Use official mirror domains verified on freebies to avoid phishing clones and imposter sites.',
      'Consider using a privacy VPN or private DNS if your local ISP implements DNS-level filtering.',
    ],
    faqs: [
      {
        question: 'What is the highest-rated free movie streaming site on freebies?',
        answer: 'FlixHQ (https://flixhq.ink) and CineJoy (https://cinejoy.online) are our highest-rated streaming platforms, selected for their 1080p HD library, zero required accounts, auto-subtitles, and clean user experience.',
      },
      {
        question: 'Do I need to sign up or register an account to watch streams?',
        answer: 'No. Every primary movie, TV series, and sports stream listed in our verified tier does not require user registration or credit card information.',
      },
      {
        question: 'How do I bypass video buffering on streaming sites?',
        answer: 'Most top platforms feature a server switcher directly below the media player (e.g. UpCloud, VidCloud, MegaCloud). If one server buffers, switch to an alternate mirror.',
      },
      {
        question: 'Are free streaming platforms safe to use on mobile devices?',
        answer: 'Yes, provided you use an adblocking mobile browser such as Brave, Firefox with uBlock Origin on Android, or Safari with AdGuard on iOS to block malicious popups.',
      },
    ],
  },
  adblocking: {
    title: 'Adblocking, DNS Filtering & Online Privacy Shields Guide',
    summary: 'Protect your digital footprint with open-source content blockers, hardened browser configurations, DNS firewalls, and tracker-bypassing extensions.',
    longDescription: `Digital privacy and adblocking are the foundational shield of the modern internet. Intrusive advertisements, malicious telemetry trackers, crypto-miners, and forced countdown redirects degrade browsing speed and compromise user security.

The freebies Adblocking Directory provides an exhaustive breakdown of the gold-standard open-source content blockers, starting with uBlock Origin, privacy-preserving DNS services, and crowdsourced filterlists. We outline the technical differences between browser extension shields and system-wide network DNS sinks, giving users complete autonomy over their data.`,
    keyFeatures: [
      'GPL & Open Source: Audited codebases free of commercial monetization or data harvesting.',
      'Sub-Millisecond Filter Processing: Highly optimized memory footprints that speed up page load times.',
      'Anti-Circumvention Rules: Advanced cosmetic filtering that strips sponsored elements and anti-adblock banners.',
      'Cross-Platform Deployment: Solutions available for desktop browsers, Android, iOS, and home routers.',
    ],
    safetyTips: [
      'Only download extensions from official browser stores or verified developer GitHub repositories.',
      'Avoid running multiple extension adblockers simultaneously, which causes memory waste and filter rule conflicts.',
      'Subscribe to region-specific filterlists in uBlock Origin settings if browsing non-English websites.',
    ],
    faqs: [
      {
        question: 'Why is uBlock Origin considered the best content blocker?',
        answer: 'uBlock Origin is completely open source (GPLv3), uses significantly less CPU and memory than commercial competitors, and operates purely for user protection without selling "acceptable ads".',
      },
      {
        question: 'What is the difference between DNS blocking and browser extension blocking?',
        answer: 'Browser extensions can block inline DOM elements, cosmetic elements, and YouTube video ads, whereas DNS blocking stops domain requests across the entire operating system before they leave your device.',
      },
      {
        question: 'How do I bypass link shorteners and countdown timers?',
        answer: 'Use FastForward, an open-source extension that automatically solves and bypasses tracker countdowns, redirect loops, and timer walls.',
      },
    ],
  },
  software: {
    title: 'Free & Open Source Software (FOSS), Utilities & Portable Apps',
    summary: 'Curated directory of high-utility open-source software, system diagnostics, media players, compression tools, and portable applications for Windows, Mac, and Linux.',
    longDescription: `High-quality software should be accessible, lightweight, and respectful of user privacy. The freebies Software Directory features the premier open-source and freeware applications across computing disciplines: from media playback and document conversion to system optimization and disk diagnostics.

We prioritize software with clean installers, zero bundled adware or telemetry, active GitHub/GitLab repositories, and portable build options that run without touching the system registry.`,
    keyFeatures: [
      'Adware & Telemetry Free: No bundled toolbars, trialware offers, or covert background telemetry.',
      'Portable Executables: Many utilities run directly from a USB stick without installation.',
      'Multi-Platform Compatibility: Seamless support across Windows, macOS, Linux, and BSD.',
      'Community Audited: Open-source repositories allowing code verification and reproducible builds.',
    ],
    safetyTips: [
      'Verify SHA-256 checksums provided by the release notes before executing installers.',
      'Use package managers like Winget or Chocolatey for automated and verified software installation.',
      'Check for official digital code signatures on Windows executables.',
    ],
    faqs: [
      {
        question: 'What are portable applications?',
        answer: 'Portable applications are self-contained programs that do not write configuration files to your operating system registry or require administrative installation privileges.',
      },
      {
        question: 'Are all tools listed in the Software category open source?',
        answer: 'A majority are FOSS (Free and Open Source Software) under licenses like GPL, MIT, and Apache 2.0. Any proprietary freeware is rigorously tested for zero malware or adware.',
      },
    ],
  },
  'ai-tools': {
    title: 'Free AI Tools, LLMs, Generative Models & Developer APIs',
    summary: 'Explore cutting-edge artificial intelligence assistants, local open-weight LLMs, generative art creators, voice synthesis, and zero-cost AI developer tiers.',
    longDescription: `Artificial Intelligence has transformed productivity, software development, creative design, and research. However, many commercial AI suites gate capabilities behind expensive recurring subscriptions.

The freebies AI Tools Directory catalogues top-tier zero-cost and freemium AI platforms, unrestricted local LLM frontends, image generation models, and voice synthesis tools. Whether you need writing assistance, code refactoring, or creative media synthesis, our listings highlight generous free tiers and open-weight alternatives.`,
    keyFeatures: [
      'Generous Free Tiers: Chat models and generators that do not require mandatory payment cards.',
      'Local & Private AI: Guides and tools for running models locally (like Ollama) with 100% data privacy.',
      'Multi-Modal Capabilities: Text generation, visual reasoning, code generation, and voice audio cloning.',
    ],
    safetyTips: [
      'Do not submit sensitive personal identifiers or confidential code to cloud-hosted public models.',
      'Verify AI-generated code snippets in a sandbox before executing in production environments.',
    ],
    faqs: [
      {
        question: 'Can I run generative AI models locally on my computer for free?',
        answer: 'Yes. Tools like Ollama and LM Studio allow you to download and run open-weight models (Llama, Mistral, DeepSeek) locally on your GPU with complete privacy.',
      },
    ],
  },
  'dev-tools': {
    title: 'Developer Tools, Free Cloud Hosting, APIs & Coding Resources',
    summary: 'Comprehensive directory of free cloud tiers, database hosting, code editors, API testing suites, and frontend component libraries.',
    longDescription: `Building software in the modern era does not require an enterprise budget. The freebies Developer Tools section aggregates generous free tiers from cloud providers, serverless databases, CI/CD runners, and developer utilities.

From free SSL certificates and static hosting on Vercel/Netlify to container hosting and REST testing tools, developers can build, test, and ship complete full-stack web applications without spending a dime.`,
    keyFeatures: [
      'Zero-Cost Developer Tiers: Free cloud compute, database rows, and hosting bandwidth.',
      'Productivity Accelerators: Instant snippet sharing, regex testers, JSON formatters, and API clients.',
      'Open Standards: Compliant with modern web frameworks and developer toolchains.',
    ],
    safetyTips: [
      'Always set billing alerts and usage caps on cloud providers even when using free tiers.',
      'Never commit API keys or environment secrets to public GitHub repositories.',
    ],
    faqs: [
      {
        question: 'Where can I host my web application for free?',
        answer: 'Vercel, Netlify, Cloudflare Pages, and Render offer generous free tiers for hosting static frontends and serverless backends.',
      },
    ],
  },
  'gaming-emulation': {
    title: 'Gaming, Retro Emulation, Mods & Free Game Repositories',
    summary: 'Curated index of console emulators, open-source game engines, preservation archives, performance enhancement mods, and legal free games.',
    longDescription: `Preserving video game history through open-source emulation and community modding is a vital facet of digital culture. The freebies Gaming & Emulation Directory indexes verified emulators for PlayStation, Nintendo, Sega, Xbox, and arcade hardware.

We also highlight game optimization utilities, DRM-free legal gaming stores, translation patches, and open-source re-implementations of classic game engines.`,
    keyFeatures: [
      'Multi-Platform Emulators: Play historic titles on PC, Android, Steam Deck, and macOS.',
      'Performance Enhancers: Texture packs, widescreen patches, and unlocked framerate mods.',
      'Open Source Engines: Community remakes of legendary game engines.',
    ],
    safetyTips: [
      'Never download game files from unverified third-party pop-up advertisements.',
      'Use 7-Zip to extract archives and scan any downloaded files with an updated antivirus.',
    ],
    faqs: [
      {
        question: 'Is video game emulation legal?',
        answer: 'Yes, developing and using console emulators is completely legal. Users should dump BIOS files and game ROMs from hardware and discs they legally own.',
      },
    ],
  },
  'books-reading': {
    title: 'Free E-Books, Audiobooks, Manga, Comics & Research Papers',
    summary: 'Discover public domain literary works, open-access academic research journals, comics, manga readers, and free audiobook archives.',
    longDescription: `Knowledge and literature should be universally accessible. The freebies Books & Reading Directory connects avid readers, students, and academic researchers with legal e-book archives, public domain libraries, scientific paper repositories, and comic readers.`,
    keyFeatures: [
      'Public Domain Classics: Thousands of copyright-free literary masterworks.',
      'Academic Open Access: Free peer-reviewed journals, science articles, and research dissertations.',
      'Multi-Format Support: EPUB, PDF, MOBI, and browser-based online readers.',
    ],
    safetyTips: [
      'Use dedicated e-reader apps like KOReader or Calibre to organize and read digital books comfortably.',
    ],
    faqs: [
      {
        question: 'Where can I read free public domain books legally?',
        answer: 'Project Gutenberg and Standard Ebooks provide thousands of verified public domain e-books in beautifully formatted EPUB and Kindle formats.',
      },
    ],
  },
  'design-assets': {
    title: 'Free Design Assets, SVG Icons, Fonts, Mockups & Stock Photos',
    summary: 'High-resolution creative resources, commercial-friendly vector illustrations, typography kits, 3D models, and royalty-free stock imagery.',
    longDescription: `Designers, creators, and UI/UX developers require high-fidelity visual assets. The freebies Design Assets Directory curates copyright-free and CC0-licensed design libraries, open-source icon fonts, realistic device mockups, and palette generators.`,
    keyFeatures: [
      'Commercial Use Permitted: Clear licensing terms for client and personal projects.',
      'Vector & Lossless Formats: Scalable SVG, EPS, and high-DPI raster files.',
      'Zero Watermarks: Clean downloads without intrusive branding.',
    ],
    safetyTips: [
      'Always review the specific Creative Commons or MIT license attached to each asset before commercial redistribution.',
    ],
    faqs: [
      {
        question: 'Can I use these design assets in commercial projects?',
        answer: 'Most assets listed have CC0 (Public Domain) or MIT licenses permitting commercial usage. Always verify the license badge on the resource detail page.',
      },
    ],
  },
  'utility-tools': {
    title: 'Online Web Utilities, PDF Tools, Converters & Temporary Mail',
    summary: 'Essential browser-based utility tools for PDF editing, format conversion, disposable email, privacy phone numbers, and file encryption.',
    longDescription: `Solve everyday digital tasks without installing bulky software. The freebies Utility Tools Directory features client-side file converters, browser-based PDF editors, disposable inbox services for avoiding spam, and strong password generators.`,
    keyFeatures: [
      'Client-Side WebAssembly: File processing happens directly in your browser without uploading to remote servers.',
      'No Spam Inboxes: Temporary disposable email addresses to protect your primary inbox.',
      'Instant Zero-Install Access: Tools work instantly on any mobile or desktop browser.',
    ],
    safetyTips: [
      'Use client-side converters whenever handling sensitive personal documents or financial statements.',
    ],
    faqs: [
      {
        question: 'Is it safe to convert files on online utility websites?',
        answer: 'Yes, especially for tools listed on freebies that utilize WebAssembly to process files locally in your browser memory without uploading data to external servers.',
      },
    ],
  },
};

// Fallback editorial for unlisted categories
export function getCategoryEditorial(slug: string, name: string): CategoryEditorial {
  return CATEGORY_EDITORIALS[slug] || {
    title: `${name} Resources & Curated Free Tools Directory`,
    summary: `Comprehensive collection of free, open-source, and verified ${name} tools and platforms.`,
    longDescription: `The freebies ${name} Directory provides an audited breakdown of verified resources, privacy tools, and free utilities. Each listing is evaluated by the community for safety, uptime, and accessibility without hidden fees.`,
    keyFeatures: [
      'Community Audited: Verified by active maintainers and community contributors.',
      'Privacy Focused: Tools prioritized for clean access and minimal tracking.',
      'Zero Registration: Fast access without required user accounts.',
    ],
    safetyTips: [
      'Always enable an adblocker like uBlock Origin when exploring new web directories.',
      'Verify URLs against the official freebies index to avoid phishing mirrors.',
    ],
    faqs: [
      {
        question: `How often is the ${name} directory updated?`,
        answer: 'Our community and automated sync pollers audit entries daily to verify domain health, server availability, and new releases.',
      },
    ],
  };
}

// Master Category & Resource Loader with Markdown Merging
export function getAllCategories(): Category[] {
  return FMHY_CATEGORIES.map((cat) => {
    const mdFilename = `${cat.id}.md`;
    const mdFile = DEFAULT_MARKDOWN_FILES[mdFilename];
    let baseSubcategories = [...cat.subcategories];

    if (mdFile && mdFile.content) {
      const parsedSubs = parseMarkdownToCategories(cat.id, cat.name, mdFile.content);
      if (parsedSubs.length > 0) {
        const mergedSubs = [...baseSubcategories];
        parsedSubs.forEach((parsedSub) => {
          const existingIdx = mergedSubs.findIndex(
            (s) => s.id === parsedSub.id || s.name.toLowerCase() === parsedSub.name.toLowerCase()
          );
          if (existingIdx >= 0) {
            const existingSub = mergedSubs[existingIdx];
            const existingUrls = new Set(existingSub.items.map((i) => i.url.toLowerCase()));
            const uniqueParsed = parsedSub.items.filter((i) => !existingUrls.has(i.url.toLowerCase()));
            mergedSubs[existingIdx] = {
              ...existingSub,
              items: [...uniqueParsed, ...existingSub.items],
            };
          } else {
            mergedSubs.push(parsedSub);
          }
        });
        baseSubcategories = mergedSubs;
      }
    }

    return {
      ...cat,
      subcategories: baseSubcategories,
    };
  });
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const categories = getAllCategories();
  return categories.find((c) => c.slug === slug || c.id === slug);
}

export function getSubcategory(categorySlug: string, subcategorySlug: string): { category: Category; subcategory: SubCategory } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;

  const subcategory = category.subcategories.find(
    (s) => s.id === subcategorySlug || s.id.endsWith(subcategorySlug) || s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === subcategorySlug
  );

  if (!subcategory) return undefined;
  return { category, subcategory };
}

export function getAllResources(): LinkItem[] {
  const categories = getAllCategories();
  const map = new Map<string, LinkItem>();
  for (const cat of categories) {
    for (const sub of cat.subcategories) {
      for (const item of sub.items) {
        if (!map.has(item.id)) {
          map.set(item.id, item);
        }
      }
    }
  }
  return Array.from(map.values());
}

export function getResourceById(id: string): { item: LinkItem; category: Category; subcategory?: SubCategory } | undefined {
  const categories = getAllCategories();
  const normalizedId = decodeURIComponent(id).toLowerCase();

  for (const cat of categories) {
    for (const sub of cat.subcategories) {
      for (const item of sub.items) {
        if (
          item.id.toLowerCase() === normalizedId ||
          item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normalizedId ||
          item.id.toLowerCase().replace(/^md-[a-z0-9]+-/, '') === normalizedId
        ) {
          return { item, category: cat, subcategory: sub };
        }
      }
    }
  }
  return undefined;
}

export function getFeaturedResources(limit: number = 8): LinkItem[] {
  const all = getAllResources();
  // Filter starred or high priority items
  const featured = all.filter(
    (item) =>
      item.isStarred ||
      (item.badge && (item.badge.includes('⭐') || item.badge.includes('🔥') || item.badge.includes('Must Have') || item.badge.includes('Top'))) ||
      item.title === 'FlixHQ' ||
      item.title === 'CineJoy' ||
      item.title === 'uBlock Origin'
  );
  return featured.slice(0, limit);
}

export function getRecentlyAddedResources(limit: number = 10): LinkItem[] {
  const all = getAllResources();
  return [...all]
    .sort((a, b) => {
      const dateA = a.dateAdded || a.lastVerified || '2026-01-01';
      const dateB = b.dateAdded || b.lastVerified || '2026-01-01';
      return dateB.localeCompare(dateA);
    })
    .slice(0, limit);
}

export function getRelatedResources(currentItem: LinkItem, limit: number = 4): LinkItem[] {
  const all = getAllResources();
  return all
    .filter(
      (item) =>
        item.id !== currentItem.id &&
        (item.subcategory === currentItem.subcategory || item.category === currentItem.category)
    )
    .slice(0, limit);
}
