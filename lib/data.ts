import { Category, SubCategory, LinkItem } from '@/types/fmhy';
import { FMHY_CATEGORIES, HOME_CATEGORY } from '@/data/fmhyData';
import { DEFAULT_MARKDOWN_FILES } from '@/data/markdownData';
import { parseMarkdownToCategories } from '@/utils/markdownParser';
import categoriesJson from '@/data/categories.json';

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
        answer: 'The vast majority are GPL, MIT, or Apache-licensed open-source tools. A small number are audited non-commercial freeware utilities with exceptional utility.',
      },
    ],
  },
  'ai-tools': {
    title: 'Free AI Models, Developer Workspaces, LLMs & Local Runners',
    summary: 'Direct access to free LLM interfaces, local execution runners (Ollama, LM Studio), image generation platforms, and coding assistants.',
    longDescription: `Artificial intelligence tools accelerate research, coding, writing, and creative ideation. The freebies AI Directory indexes platforms offering generous free tiers, uncapped local open-source models, API test workspaces, and private offline assistants.

We feature local model runners that protect your privacy by keeping prompt data strictly on your machine, alongside cloud platforms offering free developer access to Gemini, Llama 3, and DeepSeek models.`,
    keyFeatures: [
      'Offline Private Execution: Run models locally with Ollama and LM Studio without sending data to third parties.',
      'Zero-Cost Access: High rate limits and generous free developer quotas.',
      'Cutting-Edge Open Weights: Easy deployment of DeepSeek, Llama 3, and Qwen architectures.',
    ],
    safetyTips: [
      'Never input proprietary passwords, keys, or private personal data into public cloud LLMs.',
      'Prefer local offline model runners for confidential programming and document analysis.',
    ],
    faqs: [
      {
        question: 'Can I run state-of-the-art AI models locally on my computer?',
        answer: 'Yes! Applications like Ollama and LM Studio allow you to download and run optimized quantized models (GGUF) directly on modern CPUs and GPUs with zero internet connection.',
      },
    ],
  },
  'dev-tools': {
    title: 'Developer Tools, Free Hosting, Cloud Databases & Public APIs',
    summary: 'Curated index of free cloud application hosting, serverless databases, CI/CD runners, public APIs, and developer productivity tools.',
    longDescription: `Building modern web and software applications is more accessible than ever thanks to generous developer tiers. The freebies Dev Tools Directory lists production-grade tools offering robust free tiers: from full-stack hosting on Vercel to serverless PostgreSQL databases on Supabase.`,
    keyFeatures: [
      'Generous Free Tiers: Generous quotas suitable for side projects and production MVPs.',
      'Modern Stack Support: Seamless integration with Next.js, Node.js, Python, and Docker.',
      'Instant Provisioning: Deploy web services and databases in seconds with Git integration.',
    ],
    safetyTips: [
      'Always set billing spend caps or disable automatic overage billing on cloud accounts.',
      'Use environment variables (.env) to keep API secrets out of public GitHub repositories.',
    ],
    faqs: [
      {
        question: 'What is the best free hosting platform for modern web apps?',
        answer: 'Vercel, Netlify, and Cloudflare Pages offer exceptional free tiers for modern JavaScript frameworks with automatic SSL and global CDN distribution.',
      },
    ],
  },
  'books-reading': {
    title: 'Free Digital Libraries, E-Books, Academic Papers & Public Domain Literature',
    summary: 'Comprehensive guide to public domain book repositories, open academic journals, digital archives, and reader applications.',
    longDescription: `Access to literature, scientific research, and historical documentation should be universal. The freebies Books & Reading Directory curates safe and legal platforms providing access to millions of digitized books, public domain classics, and open-access research repositories.`,
    keyFeatures: [
      'Extensive Digital Archives: Access to millions of out-of-print, historical, and public domain texts.',
      'Standard Formats: EPUB, PDF, and MOBI files compatible with Kindle, Kobo, and e-readers.',
      'Open Access Science: Peer-reviewed research papers and academic textbooks.',
    ],
    safetyTips: [
      'Use official e-reader apps and avoid executable (.exe) files disguised as book downloads.',
    ],
    faqs: [
      {
        question: 'Are public domain books completely legal to download?',
        answer: 'Yes. Works whose copyright has expired (such as those hosted on Project Gutenberg) are in the public domain and completely free and legal to read, share, and redistribute.',
      },
    ],
  },
  'gaming-emulation': {
    title: 'Video Game Emulators, Game Preservation, Free Launchers & Mods',
    summary: 'Open-source game console emulators, game preservation archives, native indie game stores, and gaming optimization utilities.',
    longDescription: `Video game preservation ensures classic interactive art remains playable across modern hardware. The freebies Gaming Directory showcases audited open-source emulators (RetroArch, PCSX2, Dolphin) and game platforms offering DRM-free indie titles.`,
    keyFeatures: [
      'High-Definition Enhancement: Internal resolution scaling, widescreen patches, and custom shaders.',
      'DRM-Free Gaming: Platforms like itch.io offering independent indie games with zero restrictive DRM.',
      'Open Source Engines: Active maintainer communities continually improving compatibility and performance.',
    ],
    safetyTips: [
      'Only dump ROMs and BIOS files from consoles and cartridges you legally own.',
      'Scan third-party game mods and custom texture packs on VirusTotal before installation.',
    ],
    faqs: [
      {
        question: 'Is video game emulation legal?',
        answer: 'Yes. Developing and using emulators is completely legal. Users must legally dump their own BIOS and game copies.',
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

// Master Category & Resource Loader with Markdown & JSON Merging
export function getAllCategories(): Category[] {
  // Use parsed JSON categories as the dynamic baseline
  const baseCategories: Category[] = (categoriesJson && Array.isArray(categoriesJson) && categoriesJson.length > 0)
    ? (categoriesJson as unknown as Category[])
    : FMHY_CATEGORIES;

  return baseCategories.map((cat) => {
    const mdFilename = `${cat.id}.md`;
    const mdFile = DEFAULT_MARKDOWN_FILES[mdFilename];
    let baseSubcategories = [...(cat.subcategories || [])];

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
    for (const sub of cat.subcategories || []) {
      for (const item of sub.items || []) {
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
    for (const sub of cat.subcategories || []) {
      for (const item of sub.items || []) {
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
