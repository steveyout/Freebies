export interface MarkdownFile {
  id: string;
  filename: string;
  title: string;
  category: string;
  description: string;
  content: string;
  lastModified?: string;
}

export const DEFAULT_MARKDOWN_FILES: Record<string, MarkdownFile> = {
  'streaming.md': {
    id: 'streaming.md',
    filename: 'data/streaming.md',
    title: 'Streaming & Media Directory',
    category: 'streaming',
    description: 'Curated guide for movies, TV series, anime, live sports, and media players.',
    content: `# 🎬 Streaming Mega-Directory (\`data/streaming.md\`)

Welcome to the **FMHY Streaming Index**. This curated repository file lists verified ad-free movie streaming platforms, high-definition cinema portals, anime hubs, live sports indexers, and media players.

> 💡 **Repository Note**: To add a new movie or TV site to this directory, simply edit this \`data/streaming.md\` file in Markdown format! The web application automatically parses table rows, callouts, and lists, rendering them into interactive UI cards with search, filtering, and bookmarking.

---

> [!FLIXHQ] **Top Priority Streaming Platform**
> **FlixHQ** ([https://flixhq.ink](https://flixhq.ink)) is our top-rated platform for HD Movies & TV Shows with zero popup ads, auto-subtitles, fast servers, and zero registration requirement.
> <span class="badge-rose">Top Rated</span> <span class="badge-emerald">No Reg</span> <span class="badge-sky">1080p HD</span> <span class="badge-indigo">Fast Mirrors</span>

> [!CINEJOY] **Featured Online Cinema**
> **CineJoy** ([https://cinejoy.online](https://cinejoy.online)) features a clean minimalist theater UI, high-bitrate streaming, and mobile-friendly media playback with instant search.
> <span class="badge-amber">Popular</span> <span class="badge-emerald">Verified Safe</span> <span class="badge-sky">Multi-Server</span>

---

## 📺 High Definition Movies & TV Shows

| Platform Name | Direct URL | Quality | Registration | Key Features & Notes |
| :--- | :--- | :---: | :---: | :--- |
| **FlixHQ** | [flixhq.ink](https://flixhq.ink) | 1080p HD | ❌ Not Needed | Auto-play, Subtitles, Zero Ads, Fast Mirrors |
| **CineJoy** | [cinejoy.online](https://cinejoy.online) | 1080p HD | ❌ Not Needed | Minimalist UI, Multi-server mirrors, Mobile friendly |
| **FMovies** | [fmovies.ps](https://fmovies.ps) | 1080p | ❌ Not Needed | Massive movie catalog, trending filters |
| **Bflix** | [bflix.gg](https://bflix.gg) | 1080p | ❌ Not Needed | Quick bookmarks, clean layout, multi-audio |
| **Sflix** | [sflix.to](https://sflix.to) | 1080p HD | ❌ Not Needed | Fast video player, daily updates, multi-subtitles |
| **LookMovie** | [lookmovie2.to](https://lookmovie2.to) | 720p/1080p | ❌ Not Needed | Clean interface, minimal ads, verified catalog |

---

## 🍿 Anime & Animated Series

| Platform Name | Direct URL | Type | Registration | Notes |
| :--- | :--- | :---: | :---: | :--- |
| **AniWave** | [aniwave.to](https://aniwave.to) | Subbed & Dubbed | ❌ Not Needed | Auto-next episode, skip filler, high speed |
| **GogoAnime** | [gogoanime.cl](https://gogoanime.cl) | Subbed & Dubbed | ❌ Not Needed | Classic anime portal, daily releases |
| **YugenAnime** | [yugenanime.tv](https://yugenanime.tv) | Subbed & Dubbed | ❌ Not Needed | Modern clean interface, custom watchlists |

---

## ⚽ Live Sports & Event Indexers

| Platform Name | Direct URL | Coverage | Registration | Notes |
| :--- | :--- | :---: | :---: | :--- |
| **Streamed.su** | [streamed.su](https://streamed.su) | All Major Sports | ❌ Not Needed | Clean schedule layout, HD streams, zero popups |
| **MethStreams** | [methstreams.com](https://methstreams.com) | NBA, NFL, UFC, Football | ❌ Not Needed | Multiple stream mirrors, live chat |

---

## 💡 Streaming Guidelines & Security Callouts

> [!WARNING]
> **Adblocker Requirement:** Always ensure you have **uBlock Origin** or a secure DNS filter enabled when visiting media indexers to prevent unwanted popups or redirects.

> [!TIP]
> **Performance Tip:** If a stream buffers, click the **Server Switcher** on FlixHQ or CineJoy to select an alternate high-speed mirror.
`
  },
  'adblocking.md': {
    id: 'adblocking.md',
    filename: 'data/adblocking.md',
    title: 'Adblocking & Privacy Guide',
    category: 'adblocking',
    description: 'Essential tools, uBlock Origin filterlists, DNS blockers, and privacy configurations.',
    content: `# 🛡️ Adblocking & Privacy Guide (\`data/adblocking.md\`)

Essential tools, uBlock Origin filterlists, DNS blockers, browser extensions, and guides to stay ad-free and secure online.

---

> [!RECOMMENDED] **Gold Standard Adblocker**
> **uBlock Origin** ([https://ublockorigin.com](https://ublockorigin.com)) is the open-source content blocker recommended by privacy researchers. Lightweight, efficient, and open source.
> <span class="badge-emerald">Open Source</span> <span class="badge-sky">Top Rated</span> <span class="badge-rose">Must Have</span>

---

## 🌐 Browser Extensions & Shields

| Tool Name | Direct URL | Type | License | Notes |
| :--- | :--- | :---: | :---: | :--- |
| **uBlock Origin** | [ublockorigin.com](https://ublockorigin.com) | Content Blocker | GPLv3 | Gold standard adblocker for Firefox, Chrome, and Edge |
| **FastForward** | [fastforward.team](https://fastforward.team) | Link Bypasser | Open Source | Automatically bypasses timer countdowns and link shorteners |
| **SponsorBlock** | [sponsor.ajay.app](https://sponsor.ajay.app) | YouTube Extension | Open Source | Crowdsourced skipping of sponsors, intros, outros, and reminders |
| **Privacy Badger** | [privacybadger.org](https://privacybadger.org) | Tracker Blocker | Open Source | EFF extension that automatically learns to block invisible trackers |
| **LocalCDN** | [localcdn.org](https://localcdn.org) | Privacy Utility | Open Source | Emulates remote web frameworks locally to prevent big tech tracking |

---

## 🛡️ Network & DNS Protection

| Service Name | Direct URL | Type | Features |
| :--- | :--- | :---: | :--- |
| **NextDNS** | [nextdns.io](https://nextdns.io) | Cloud DNS | Custom blocklists, analytics, parental controls |
| **AdGuard DNS** | [adguard-dns.io](https://adguard-dns.io) | Public DNS | Zero-config ad blocking DNS servers |
| **Pi-hole** | [pi-hole.net](https://pi-hole.net) | Self-Hosted | Network-wide ad blocking for home routers |
`
  },
  'software.md': {
    id: 'software.md',
    filename: 'data/software.md',
    title: 'Free & FOSS Software Index',
    category: 'software',
    description: 'Open source desktop software, system utilities, and productive tools.',
    content: `# 💻 Free & Open Source Software (\`data/software.md\`)

Collection of verified open-source software, media editors, archivers, productivity apps, and utilities for Windows, macOS, and Linux.

---

> [!TIP]
> All software listed in this index is verified malware-free, open-source, or non-commercial freeware.

---

## 📦 Top Open-Source Software

| Application | Direct URL | Category | License | Key Features |
| :--- | :--- | :---: | :---: | :--- |
| **VLC Media Player** | [videolan.org](https://www.videolan.org) | Media Player | GPLv2 | Plays virtually all video formats, codecs, and DVDs |
| **7-Zip** | [7-zip.org](https://www.7-zip.org) | Archiver | LGPL | Open source file archiver with highest compression ratio |
| **Obsidian** | [obsidian.md](https://obsidian.md) | Knowledge Base | Freeware | Local-first Markdown note-taking tool with rich plugin ecosystem |
| **HandBrake** | [handbrake.fr](https://handbrake.fr) | Video Converter | GPLv2 | Open-source video transcoder for all platforms |
| **ShareX** | [getsharex.com](https://getsharex.com) | Screen Capture | GPLv3 | Screen capture, file sharing, and productivity tool for Windows |
| **LibreOffice** | [libreoffice.org](https://www.libreoffice.org) | Office Suite | MPLv2 | Powerful free office suite compatible with MS Office files |
`
  },
  'games.md': {
    id: 'games.md',
    filename: 'data/games.md',
    title: 'Gaming & Emulators Hub',
    category: 'games',
    description: 'Open source game emulators, preservation tools, and launchers.',
    content: `# 🎮 Gaming & Emulators Hub (\`data/games.md\`)

Verified game emulators, preservation tools, open source launchers, and gaming utilities.

---

> [!WARNING]
> Only download game ROMs and preservation files from verified green-rated community mirrors.

---

## 🕹️ Top Game Emulators & Launchers

| Emulator Name | Direct URL | Target System | License | Platform |
| :--- | :--- | :---: | :---: | :--- |
| **RetroArch** | [retroarch.com](https://www.retroarch.com) | Multi-System | GPLv3 | Frontend for emulators, game engines, and media players |
| **PCSX2** | [pcsx2.net](https://pcsx2.net) | PlayStation 2 | GPLv3 | Open source PS2 emulator with high-resolution upscaling |
| **Heroic Games Launcher** | [heroicgameslauncher.com](https://heroicgameslauncher.com) | Epic & GOG | GPLv3 | Native open source game launcher for Epic, GOG, and Prime Gaming |
| **Dolphin Emulator** | [dolphin-emu.org](https://dolphin-emu.org) | GameCube & Wii | GPLv2+ | High performance emulator for GameCube and Wii consoles |
| **Lutris** | [lutris.net](https://lutris.net) | Open Gaming | GPLv3 | Open source gaming platform for Linux with one-click installers |
`
  },
  'ai-tools.md': {
    id: 'ai-tools.md',
    filename: 'data/ai-tools.md',
    title: 'Free AI Models & Tools',
    category: 'ai-tools',
    description: 'Free LLMs, image generators, audio tools, and AI utilities.',
    content: `# 🤖 Free AI Models & Utilities (\`data/ai-tools.md\`)

Directory of free LLM platforms, local model runners, image generation tools, and developer AI workspaces.

---

> [!NOTE]
> Use local LLMs like **Ollama** or **LM Studio** for offline, private AI assistance.

---

## ⚡ Free AI Tools & Local Runners

| Platform Name | Direct URL | Type | License / Model | Key Features |
| :--- | :--- | :---: | :---: | :--- |
| **Ollama** | [ollama.com](https://ollama.com) | Local LLM Runner | MIT | Get up and running with Llama 3, DeepSeek, and Qwen locally |
| **Hugging Face** | [huggingface.co](https://huggingface.co) | Model Hub | Open Source | The AI community's hub for datasets, models, and demo spaces |
| **LM Studio** | [lmstudio.ai](https://lmstudio.ai) | Local LLM GUI | Freeware | Run local LLMs on your Mac or PC with an elegant ChatGPT-like UI |
| **Pinokio** | [pinokio.computer](https://pinokio.computer) | AI Browser | Open Source | Browser that lets you install, run, and automate AI tools locally |
`
  }
};
