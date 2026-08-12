import { Category } from '../types/fmhy';

export const HOME_CATEGORY: Category = {
  id: 'home',
  name: 'Home',
  slug: 'home',
  iconName: 'Home',
  description: 'Complete directory overview featuring Top Priority picks, recently added resources, top contributors, and quick category highlights.',
  githubFile: 'README.md',
  subcategories: []
};

export const FMHY_CATEGORIES: Category[] = [
  {
    id: 'adblocking',
    name: 'Adblocking & Privacy',
    slug: 'adblocking',
    iconName: 'ShieldCheck',
    description: 'Essential tools, DNS blockers, browser extensions, and guides to stay ad-free and secure online.',
    githubFile: 'src/data/categories/adblocking.md',
    subcategories: [
      {
        id: 'browsers-ext',
        name: 'Browser Extensions & Shields',
        description: 'Must-have extensions for blocking ads, trackers, bypassers, and popups.',
        items: [
          {
            id: 'ublock-origin',
            title: 'uBlock Origin',
            url: 'https://ublockorigin.com/',
            description: 'The gold standard open-source content blocker for Firefox, Chrome, and Edge. Extremely light on CPU and memory.',
            category: 'adblocking',
            subcategory: 'browsers-ext',
            tags: ['Extension', 'Open Source', 'Must Have', 'Adblocker'],
            isStarred: true,
            isOpenSource: true,
            isNoAds: true,
            isNoReg: true,
            safetyRating: 'Safe',
            badge: '⭐ Must Have',
            lastVerified: '2026-07',
            dateAdded: '2026-07-28',
            addedBy: 'ublock-team',
            githubFile: 'src/data/categories/adblocking.md'
          },
          {
            id: 'fastforward',
            title: 'FastForward',
            url: 'https://fastforward.team/',
            description: 'Don\'t waste time with link shorteners. Automatically bypass annoying timer countdowns and redirects.',
            category: 'adblocking',
            subcategory: 'browsers-ext',
            tags: ['Bypasser', 'Open Source', 'Utility'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '⚡ Fast Bypasser',
            lastVerified: '2026-07',
            dateAdded: '2026-07-27',
            addedBy: 'freemediaheckyeah',
            githubFile: 'src/data/categories/adblocking.md'
          },
          {
            id: 'sponsorblock',
            title: 'SponsorBlock',
            url: 'https://sponsor.ajay.app/',
            description: 'Skip sponsored segments, intros, outros, and subscription reminders on YouTube videos automatically.',
            category: 'adblocking',
            subcategory: 'browsers-ext',
            tags: ['YouTube', 'Open Source', 'Crowdsourced'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '🔥 Popular',
            lastVerified: '2026-07',
            dateAdded: '2026-07-26',
            addedBy: 'octocat',
            githubFile: 'src/data/categories/adblocking.md'
          },
          {
            id: 'privacy-badger',
            title: 'Privacy Badger',
            url: 'https://privacybadger.org/',
            description: 'EFF extension that automatically learns to block invisible trackers based on third-party domain behavior.',
            category: 'adblocking',
            subcategory: 'browsers-ext',
            tags: ['Privacy', 'EFF', 'Open Source'],
            isOpenSource: true,
            safetyRating: 'Safe',
            lastVerified: '2026-06',
            dateAdded: '2026-07-25',
            addedBy: 'privacy-pioneer',
            githubFile: 'src/data/categories/adblocking.md'
          },
          {
            id: 'localcdn',
            title: 'LocalCDN',
            url: 'https://www.localcdn.org/',
            description: 'Emulates remote frameworks (like jQuery, Bootstrap) locally to protect your privacy from big tech tracking.',
            category: 'adblocking',
            subcategory: 'browsers-ext',
            tags: ['Privacy', 'CDN', 'Open Source'],
            isOpenSource: true,
            safetyRating: 'Safe',
            lastVerified: '2026-05',
            dateAdded: '2026-07-24',
            addedBy: 'nbatman',
            githubFile: 'src/data/categories/adblocking.md'
          }
        ]
      },
      {
        id: 'dns-vpn',
        name: 'DNS, Firewalls & VPNs',
        description: 'Network-wide adblocking, encrypted DNS resolvers, and privacy-first network proxies.',
        items: [
          {
            id: 'quad9',
            title: 'Quad9 DNS',
            url: 'https://www.quad9.net/',
            description: 'Free, recursive, privacy-focused DNS service that blocks malicious domains, phishers, and spyware at DNS level.',
            category: 'adblocking',
            subcategory: 'dns-vpn',
            tags: ['DNS', 'Security', 'Non-Profit'],
            isStarred: true,
            isNoAds: true,
            isNoReg: true,
            safetyRating: 'Safe',
            badge: '🛡️ Top DNS',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/adblocking.md'
          },
          {
            id: 'nextdns',
            title: 'NextDNS',
            url: 'https://nextdns.io/',
            description: 'The modern cloud-based Pi-hole. Custom DNS blocking rules, analytics, and privacy filters for all devices.',
            category: 'adblocking',
            subcategory: 'dns-vpn',
            tags: ['DNS', 'Custom Filter', 'Freemium'],
            isStarred: true,
            safetyRating: 'Safe',
            badge: '⭐ Recommended',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/adblocking.md'
          },
          {
            id: 'protonvpn',
            title: 'Proton VPN',
            url: 'https://protonvpn.com/',
            description: 'Swiss-based, audited, open-source VPN with a high-speed unlimited free plan with strict no-logs policy.',
            category: 'adblocking',
            subcategory: 'dns-vpn',
            tags: ['VPN', 'Swiss', 'No-Logs', 'Open Source'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '🔒 Free Plan',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/adblocking.md'
          },
          {
            id: 'mullvad',
            title: 'Mullvad VPN',
            url: 'https://mullvad.net/',
            description: 'Gold standard privacy VPN requiring zero personal information—not even an email address to register.',
            category: 'adblocking',
            subcategory: 'dns-vpn',
            tags: ['VPN', 'Privacy', 'No Email'],
            safetyRating: 'Safe',
            lastVerified: '2026-06',
            githubFile: 'src/data/categories/adblocking.md'
          }
        ]
      }
    ]
  },
  {
    id: 'streaming',
    name: 'Streaming & Video',
    slug: 'streaming',
    iconName: 'Tv',
    description: 'Free HD movies, TV shows indexers, FlixHQ, CineJoy, anime hubs, live sports streaming, and media players.',
    githubFile: 'src/data/categories/streaming.md',
    subcategories: [
      {
        id: 'movies-tv',
        name: 'Movies & TV Series (Top Priority)',
        description: 'Featured top-tier free HD movie & TV show streaming portals with fast playback, no ads, and multi-server mirrors.',
        items: [
          {
            id: 'flixhq',
            title: 'FlixHQ',
            url: 'https://flixhq.ink',
            description: 'Premier top-priority HD movie & TV series streaming platform featuring thousands of high-quality titles, instant fast-loading servers, zero registration, and regular release updates.',
            category: 'streaming',
            subcategory: 'movies-tv',
            tags: ['FlixHQ', 'Movies', 'TV Shows', 'HD Streaming', 'Free Movies', 'No Ads', 'Top Priority'],
            isStarred: true,
            isNoAds: true,
            isNoReg: true,
            safetyRating: 'Safe',
            badge: '🔥 Top Priority',
            lastVerified: '2026-08',
            dateAdded: '2026-08-12',
            addedBy: 'steveyout',
            githubFile: 'src/data/categories/streaming.md'
          },
          {
            id: 'cinejoy',
            title: 'CineJoy',
            url: 'https://cinejoy.online',
            description: 'Ultra-fast online cinema streaming portal offering full HD movies and trending TV series with multi-source backup mirrors, sleek ad-free UI, and smooth playback.',
            category: 'streaming',
            subcategory: 'movies-tv',
            tags: ['CineJoy', 'Cinema', 'Movies', 'HD Stream', 'No Reg', 'Top Streaming', 'Top Priority'],
            isStarred: true,
            isNoAds: true,
            isNoReg: true,
            safetyRating: 'Safe',
            badge: '⭐ Top Priority',
            lastVerified: '2026-08',
            dateAdded: '2026-08-12',
            addedBy: 'steveyout',
            githubFile: 'src/data/categories/streaming.md'
          }
        ]
      },
      {
        id: 'media-players',
        name: 'Media Players & Apps',
        description: 'Powerful desktop & mobile clients for streaming and local media playback.',
        items: [
          {
            id: 'stremio',
            title: 'Stremio',
            url: 'https://www.stremio.com/',
            description: 'Modern media center app that aggregates video content from various add-ons into one sleek interface with progress sync.',
            category: 'streaming',
            subcategory: 'media-players',
            tags: ['Media Center', 'Add-ons', 'Cross-Platform', 'Open Source'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '⭐ Top Pick',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/streaming.md'
          },
          {
            id: 'mpv',
            title: 'MPV Player',
            url: 'https://mpv.io/',
            description: 'Extremely lightweight, customizable, command-line and GPU-accelerated video player supporting modern codecs.',
            category: 'streaming',
            subcategory: 'media-players',
            tags: ['Video Player', 'Open Source', 'Lightweight'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/streaming.md'
          },
          {
            id: 'vlc',
            title: 'VLC Media Player',
            url: 'https://www.videolan.org/vlc/',
            description: 'The universally compatible open-source multimedia player that plays virtually any video format out of the box.',
            category: 'streaming',
            subcategory: 'media-players',
            tags: ['Player', 'Open Source', 'Essential'],
            isOpenSource: true,
            safetyRating: 'Safe',
            lastVerified: '2026-06',
            githubFile: 'src/data/categories/streaming.md'
          }
        ]
      },
      {
        id: 'anime-cartoons',
        name: 'Anime & Cartoons',
        description: 'Curated anime indexers, subbed/dubbed repositories, and manga readers.',
        items: [
          {
            id: 'aniwave',
            title: 'HiAnime',
            url: 'https://hianime.to/',
            description: 'Clean anime streaming interface with dual audio (subbed/dubbed), episode auto-play, skip filler options, and HD streams.',
            category: 'streaming',
            subcategory: 'anime-cartoons',
            tags: ['Anime', 'Sub & Dub', 'HD'],
            isStarred: true,
            safetyRating: 'Use Adblock',
            badge: '🔥 Anime Hub',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/streaming.md'
          },
          {
            id: 'aniwatch',
            title: 'Anify',
            url: 'https://anify.tv/',
            description: 'Sleek open-source anime and manga aggregator with tracking integration for AniList and MyAnimeList.',
            category: 'streaming',
            subcategory: 'anime-cartoons',
            tags: ['Anime', 'Manga', 'Open Source', 'AniList'],
            isOpenSource: true,
            safetyRating: 'Safe',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/streaming.md'
          }
        ]
      }
    ]
  },
  {
    id: 'software',
    name: 'Software & Apps',
    slug: 'software',
    iconName: 'Laptop',
    description: 'Free & open-source software (FOSS) for Windows, macOS, Linux, and Android.',
    githubFile: 'src/data/categories/software.md',
    subcategories: [
      {
        id: 'foss-utilities',
        name: 'FOSS Utilities & Tools',
        description: 'Indispensable open-source system software and productivity tools.',
        items: [
          {
            id: 'sharex',
            title: 'ShareX',
            url: 'https://getsharex.com/',
            description: 'Screen capture, file sharing, productivity tool, OCR text recognition, screen recorder, and image annotation utility.',
            category: 'software',
            subcategory: 'foss-utilities',
            tags: ['Windows', 'Screen Capture', 'OCR', 'Open Source'],
            isStarred: true,
            isOpenSource: true,
            isNoAds: true,
            isNoReg: true,
            safetyRating: 'Safe',
            badge: '⭐ Must Have',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/software.md'
          },
          {
            id: 'localsend',
            title: 'LocalSend',
            url: 'https://localsend.org/',
            description: 'An open-source AirDrop alternative for Windows, Mac, Linux, Android, and iOS using local Wi-Fi network.',
            category: 'software',
            subcategory: 'foss-utilities',
            tags: ['File Transfer', 'AirDrop Alternative', 'Cross-Platform', 'Open Source'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '⚡ Cross-Platform',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/software.md'
          },
          {
            id: '7zip',
            title: '7-Zip',
            url: 'https://www.7-zip.org/',
            description: 'High-compression ratio archive extractor and compressor supporting 7z, ZIP, RAR, TAR, GZ formats.',
            category: 'software',
            subcategory: 'foss-utilities',
            tags: ['Archive', 'Compressor', 'Open Source'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            lastVerified: '2026-06',
            githubFile: 'src/data/categories/software.md'
          },
          {
            id: 'handbrake',
            title: 'HandBrake',
            url: 'https://handbrake.fr/',
            description: 'Open source video transcoder that converts videos from nearly any format to modern, optimized codecs.',
            category: 'software',
            subcategory: 'foss-utilities',
            tags: ['Video Converter', 'Transcoder', 'Open Source'],
            isOpenSource: true,
            safetyRating: 'Safe',
            lastVerified: '2026-06',
            githubFile: 'src/data/categories/software.md'
          }
        ]
      },
      {
        id: 'android-apps',
        name: 'Android & Mobile FOSS',
        description: 'Ad-free Android app stores and privacy-centric mobile client software.',
        items: [
          {
            id: 'f-droid',
            title: 'F-Droid',
            url: 'https://f-droid.org/',
            description: 'An installable catalog of FOSS (Free and Open Source Software) applications for the Android platform.',
            category: 'software',
            subcategory: 'android-apps',
            tags: ['App Store', 'Android', 'FOSS', 'Open Source'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '⭐ App Store',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/software.md'
          },
          {
            id: 'aurora-store',
            title: 'Aurora Store',
            url: 'https://aurorastore.org/',
            description: 'An open-source alternative Google Play Store client allowing downloads without a Google Account.',
            category: 'software',
            subcategory: 'android-apps',
            tags: ['Android', 'Play Store Client', 'No Google Account'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '🛡️ Privacy Choice',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/software.md'
          },
          {
            id: 'revanced',
            title: 'ReVanced',
            url: 'https://revanced.app/',
            description: 'Modular patcher for Android applications enabling background play, adblocking, and customization on YouTube and Spotify.',
            category: 'software',
            subcategory: 'android-apps',
            tags: ['Patcher', 'YouTube', 'Adblock', 'Open Source'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '🔥 Essential',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/software.md'
          }
        ]
      }
    ]
  },
  {
    id: 'books-reading',
    name: 'Books & Knowledge',
    slug: 'books-reading',
    iconName: 'BookOpen',
    description: 'Digital libraries, open textbook repositories, academic papers, audiobooks, and research archives.',
    githubFile: 'src/data/categories/books.md',
    subcategories: [
      {
        id: 'ebook-libraries',
        name: 'Digital Libraries & Archives',
        description: 'Millions of free books, textbooks, literature classics, and research publications.',
        items: [
          {
            id: 'annas-archive',
            title: 'Anna\'s Archive',
            url: 'https://annas-archive.org/',
            description: 'The world\'s largest open-data search engine for shadow libraries, books, academic papers, magazines, and comics.',
            category: 'books-reading',
            subcategory: 'ebook-libraries',
            tags: ['Shadow Library', 'Ebooks', 'Papers', 'Mega Archive'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '⭐ Premier Archive',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/books.md'
          },
          {
            id: 'internet-archive',
            title: 'Internet Archive Books',
            url: 'https://archive.org/details/books',
            description: 'Non-profit digital library of millions of free books, movies, software, music, and web pages.',
            category: 'books-reading',
            subcategory: 'ebook-libraries',
            tags: ['Non-Profit', 'Public Domain', 'Archive'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '🏛️ Official Archive',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/books.md'
          },
          {
            id: 'project-gutenberg',
            title: 'Project Gutenberg',
            url: 'https://www.gutenberg.org/',
            description: 'Library of over 70,000 free public domain ebooks available in EPUB, Kindle, and plain text formats.',
            category: 'books-reading',
            subcategory: 'ebook-libraries',
            tags: ['Public Domain', 'Classic Literature', 'Legal'],
            isStarred: true,
            safetyRating: 'Safe',
            lastVerified: '2026-06',
            githubFile: 'src/data/categories/books.md'
          },
          {
            id: 'libgen',
            title: 'Library Genesis (LibGen)',
            url: 'https://libgen.is/',
            description: 'Search engine for scientific articles, textbooks, and general interest books.',
            category: 'books-reading',
            subcategory: 'ebook-libraries',
            tags: ['Textbooks', 'Academic', 'Papers'],
            safetyRating: 'Safe',
            lastVerified: '2026-06',
            githubFile: 'src/data/categories/books.md'
          }
        ]
      }
    ]
  },
  {
    id: 'dev-tools',
    name: 'Dev & Coding',
    slug: 'dev-tools',
    iconName: 'Code',
    description: 'Free developer tiers, open-source APIs, UI design systems, code editors, and learning platforms.',
    githubFile: 'src/data/categories/dev.md',
    subcategories: [
      {
        id: 'hosting-db',
        name: 'Free Hosting & Cloud APIs',
        description: 'Generous free hosting platforms, backend-as-a-service, and serverless databases.',
        items: [
          {
            id: 'vercel',
            title: 'Vercel',
            url: 'https://vercel.com/',
            description: 'Deploy web projects instantly with automated GitHub CI/CD, global CDN edge network, and serverless functions.',
            category: 'dev-tools',
            subcategory: 'hosting-db',
            tags: ['Hosting', 'Frontend', 'Next.js', 'Free Tier'],
            isStarred: true,
            safetyRating: 'Safe',
            badge: '⭐ Top Host',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/dev.md'
          },
          {
            id: 'supabase',
            title: 'Supabase',
            url: 'https://supabase.com/',
            description: 'The open-source Firebase alternative. Instant Postgres database, Auth, row-level security, Realtime, and Storage.',
            category: 'dev-tools',
            subcategory: 'hosting-db',
            tags: ['PostgreSQL', 'Database', 'Auth', 'Open Source'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '🔥 Open Source',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/dev.md'
          },
          {
            id: 'public-apis',
            title: 'Public APIs Repository',
            url: 'https://github.com/public-apis/public-apis',
            description: 'A collective list of free APIs for use in software and web development categorized by domain.',
            category: 'dev-tools',
            subcategory: 'hosting-db',
            tags: ['APIs', 'Open Source', 'Directory'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '📚 Mega List',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/dev.md'
          }
        ]
      },
      {
        id: 'coding-utilities',
        name: 'Coding & Debugging Utilities',
        description: 'Online playgrounds, regex testers, diagramming tools, and formatters.',
        items: [
          {
            id: 'excalidraw',
            title: 'Excalidraw',
            url: 'https://excalidraw.com/',
            description: 'Virtual whiteboard for sketching hand-drawn like diagrams, architecture flows, and wireframes with end-to-end encryption.',
            category: 'dev-tools',
            subcategory: 'coding-utilities',
            tags: ['Whiteboard', 'Diagrams', 'Open Source', 'E2EE'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '⭐ Hand Drawn',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/dev.md'
          },
          {
            id: 'cyberchef',
            title: 'CyberChef',
            url: 'https://gchq.github.io/CyberChef/',
            description: 'The Cyber Swiss Army Knife for encoding, decoding, hashing, encryption, compression, and data parsing.',
            category: 'dev-tools',
            subcategory: 'coding-utilities',
            tags: ['Security', 'Decoding', 'GCHQ', 'Open Source'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '🔧 Swiss Knife',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/dev.md'
          },
          {
            id: 'carbon-now',
            title: 'Carbon (Code Screenshots)',
            url: 'https://carbon.now.sh/',
            description: 'Create and share beautiful images of your source code snippets with custom syntax themes and typography.',
            category: 'dev-tools',
            subcategory: 'coding-utilities',
            tags: ['Code Image', 'Syntax', 'Open Source'],
            isOpenSource: true,
            safetyRating: 'Safe',
            lastVerified: '2026-06',
            githubFile: 'src/data/categories/dev.md'
          }
        ]
      }
    ]
  },
  {
    id: 'design-assets',
    name: 'Art & Design Assets',
    slug: 'design-assets',
    iconName: 'Palette',
    description: 'Free stock photography, open-source fonts, UI icon sets, 3D assets, and web photo editing suites.',
    githubFile: 'src/data/categories/design.md',
    subcategories: [
      {
        id: 'web-editors',
        name: 'Web Graphics & Editors',
        description: 'Browser-based Photoshop alternatives, image compressors, and background removers.',
        items: [
          {
            id: 'photopea',
            title: 'Photopea',
            url: 'https://www.photopea.com/',
            description: 'Advanced browser-based photo editor supporting PSD, AI, XD, RAW, Sketch, and PDF formats with Photoshop-like keybindings.',
            category: 'design-assets',
            subcategory: 'web-editors',
            tags: ['Web Editor', 'Photoshop Alternative', 'PSD', 'No Installation'],
            isStarred: true,
            isNoReg: true,
            safetyRating: 'Safe',
            badge: '⭐ Web Photoshop',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/design.md'
          },
          {
            id: 'tinypng',
            title: 'TinyPNG / TinyJPG',
            url: 'https://tinypng.com/',
            description: 'Smart WEBP, PNG and JPEG compression that drastically reduces file size with imperceptible loss in image quality.',
            category: 'design-assets',
            subcategory: 'web-editors',
            tags: ['Compressor', 'Web Optimization', 'Utility'],
            isStarred: true,
            safetyRating: 'Safe',
            badge: '⚡ Fast Optimizer',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/design.md'
          }
        ]
      },
      {
        id: 'stock-icons',
        name: 'Stock Photos, Icons & Fonts',
        description: 'Commercial-use free image collections, vector icons, and typography.',
        items: [
          {
            id: 'unsplash',
            title: 'Unsplash',
            url: 'https://unsplash.com/',
            description: 'Over 5 million high-resolution photography images gifted by the world\'s most generous community of photographers.',
            category: 'design-assets',
            subcategory: 'stock-icons',
            tags: ['Stock Photos', 'High Res', 'Commercial Use'],
            isStarred: true,
            safetyRating: 'Safe',
            badge: '⭐ High-Res',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/design.md'
          },
          {
            id: 'lucide-icons',
            title: 'Lucide Icons',
            url: 'https://lucide.dev/',
            description: 'Beautiful & consistent open-source icon suite engineered for React, Vue, Svelte, and modern design tools.',
            category: 'design-assets',
            subcategory: 'stock-icons',
            tags: ['Icons', 'SVG', 'Open Source'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '🎨 Design Essential',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/design.md'
          },
          {
            id: 'font-squirrel',
            title: 'Font Squirrel',
            url: 'https://www.fontsquirrel.com/',
            description: 'Free, hand-picked fonts licensed for commercial work, plus webfont generator.',
            category: 'design-assets',
            subcategory: 'stock-icons',
            tags: ['Fonts', 'Commercial Use', 'Webfont'],
            safetyRating: 'Safe',
            lastVerified: '2026-05',
            githubFile: 'src/data/categories/design.md'
          }
        ]
      }
    ]
  },
  {
    id: 'ai-tools',
    name: 'AI & Machine Learning',
    slug: 'ai-tools',
    iconName: 'Sparkles',
    description: 'Free LLM access, open source AI models, image synthesis engines, and developer playgrounds.',
    githubFile: 'src/data/categories/ai.md',
    subcategories: [
      {
        id: 'free-llms',
        name: 'Free LLM Frontends & APIs',
        description: 'Web interfaces to query state-of-the-art AI models without monthly subscriptions.',
        items: [
          {
            id: 'google-ai-studio',
            title: 'Google AI Studio',
            url: 'https://aistudio.google.com/',
            description: 'Fast prototype development workspace for Gemini models with high free rate limits, multimodal inputs, and API key generation.',
            category: 'ai-tools',
            subcategory: 'free-llms',
            tags: ['Gemini', 'Google', 'Prototyping', 'Free API'],
            isStarred: true,
            safetyRating: 'Safe',
            badge: '⭐ High Speed',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/ai.md'
          },
          {
            id: 'huggingface-chat',
            title: 'HuggingChat',
            url: 'https://huggingface.co/chat/',
            description: 'Open-source web chat client powered by leading open models (Llama 3, Qwen, DeepSeek, Mistral) by Hugging Face.',
            category: 'ai-tools',
            subcategory: 'free-llms',
            tags: ['Open Source', 'Open Models', 'Llama', 'DeepSeek'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '🔥 Open Models',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/ai.md'
          },
          {
            id: 'duckduckgo-ai',
            title: 'DuckDuckGo AI Chat',
            url: 'https://duckduckgo.com/?q=DuckDuckGo+AI+Chat&ia=chat',
            description: 'Anonymized, free access to popular AI chat models with complete privacy protection and zero data logging.',
            category: 'ai-tools',
            subcategory: 'free-llms',
            tags: ['Privacy', 'No Account', 'Anonymous AI'],
            isStarred: true,
            isNoReg: true,
            safetyRating: 'Safe',
            badge: '🛡️ Anonymous',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/ai.md'
          }
        ]
      }
    ]
  },
  {
    id: 'gaming-emulation',
    name: 'Gaming & Emulation',
    slug: 'gaming-emulation',
    iconName: 'Gamepad2',
    description: 'Browser emulators, open-source game engines, game modding hubs, and indie game repositories.',
    githubFile: 'src/data/categories/gaming.md',
    subcategories: [
      {
        id: 'emulators-clients',
        name: 'Emulators & Frontends',
        description: 'Cross-platform retro game emulation software and launchers.',
        items: [
          {
            id: 'retroarch',
            title: 'RetroArch',
            url: 'https://www.retroarch.com/',
            description: 'All-in-one frontend for emulators, game engines, media players, and retro consoles with netplay support.',
            category: 'gaming-emulation',
            subcategory: 'emulators-clients',
            tags: ['Emulation', 'Cross-Platform', 'Open Source', 'Cores'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '⭐ Retro King',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/gaming.md'
          },
          {
            id: 'itch-io',
            title: 'itch.io',
            url: 'https://itch.io/',
            description: 'Open marketplace for independent digital creators, game developers, indie game jams, and DRM-free titles.',
            category: 'gaming-emulation',
            subcategory: 'emulators-clients',
            tags: ['Indie Games', 'DRM-Free', 'Game Jams'],
            isStarred: true,
            safetyRating: 'Safe',
            badge: '🎮 Indie Hub',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/gaming.md'
          }
        ]
      }
    ]
  },
  {
    id: 'utility-tools',
    name: 'Utility & Security',
    slug: 'utility-tools',
    iconName: 'Wrench',
    description: 'Password managers, online virus scanners, temporary mail services, and web converters.',
    githubFile: 'src/data/categories/utilities.md',
    subcategories: [
      {
        id: 'security-passwords',
        name: 'Security & Password Managers',
        description: 'Encrypted vault managers and online threat analysis platforms.',
        items: [
          {
            id: 'bitwarden',
            title: 'Bitwarden',
            url: 'https://bitwarden.com/',
            description: 'Open-source, end-to-end encrypted password manager for all browsers, desktops, and mobile devices with cross-device sync.',
            category: 'utility-tools',
            subcategory: 'security-passwords',
            tags: ['Password Vault', 'Open Source', 'E2EE', 'Cross-Platform'],
            isStarred: true,
            isOpenSource: true,
            safetyRating: 'Safe',
            badge: '⭐ Must Have Vault',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/utilities.md'
          },
          {
            id: 'virustotal',
            title: 'VirusTotal',
            url: 'https://www.virustotal.com/',
            description: 'Analyze suspicious files, URLs, domains, and IP addresses to detect malware using 70+ antivirus engines.',
            category: 'utility-tools',
            subcategory: 'security-passwords',
            tags: ['Malware Scanner', 'Security', 'Essential'],
            isStarred: true,
            isNoReg: true,
            safetyRating: 'Safe',
            badge: '🛡️ Scanner',
            lastVerified: '2026-07',
            githubFile: 'src/data/categories/utilities.md'
          },
          {
            id: 'temp-mail',
            title: '10 Minute Mail / TempMail',
            url: 'https://temp-mail.org/',
            description: 'Disposable temporary email address that self-destructs after a set time to avoid spam and unneeded registrations.',
            category: 'utility-tools',
            subcategory: 'security-passwords',
            tags: ['Temp Mail', 'Privacy', 'Spam Guard'],
            isStarred: true,
            isNoReg: true,
            safetyRating: 'Safe',
            lastVerified: '2026-06',
            githubFile: 'src/data/categories/utilities.md'
          }
        ]
      }
    ]
  }
];

export const POPULAR_TAGS = [
  'FlixHQ',
  'CineJoy',
  'HD Streaming',
  'Free Movies',
  'Open Source',
  'Must Have',
  'Extension',
  'No Ads',
  'Privacy',
  'Ebooks',
  'Hosting',
  'Adblocker',
  'DNS',
  'VPN',
  'Password Vault',
  'Anime',
  'Indie Games',
  'Media Center'
];

export const BEGINNER_STEPS = [
  {
    step: '1. Install uBlock Origin',
    desc: 'The single most important step for safe browsing. Works best on Firefox or Brave.',
    icon: 'ShieldAlert'
  },
  {
    step: '2. Change Your DNS',
    desc: 'Set Quad9 (9.9.9.9) or NextDNS on your router or device to block malware network-wide.',
    icon: 'Globe'
  },
  {
    step: '3. Use FastForward',
    desc: 'Skip countdown timers and malicious link shorteners automatically.',
    icon: 'Zap'
  },
  {
    step: '4. Verify Suspicious Files',
    desc: 'Always drop downloaded files or links into VirusTotal before running them.',
    icon: 'FileCheck'
  }
];
