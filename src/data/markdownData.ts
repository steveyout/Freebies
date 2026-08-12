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
    filename: 'streaming.md',
    title: 'Streaming & Media Directory',
    category: 'streaming',
    description: 'Curated guide for movies, TV series, anime, live sports, and media players.',
    content: `# 🎬 Streaming Mega-Directory (\`streaming.md\`)

Welcome to the **FMHY Streaming Index**. This curated directory lists verified ad-free streaming platforms, high-definition cinema portals, anime hubs, live sports indexers, and media players.

---

> [!FLIXHQ] **Top Priority Streaming Platform**
> **FlixHQ** ([https://flixhq.ink](https://flixhq.ink)) is our top-rated platform for HD Movies & TV Shows with zero popup ads, auto-subtitles, fast servers, and zero registration requirement.
> <span class="badge-rose">Top Rated</span> <span class="badge-emerald">No Reg</span> <span class="badge-sky">1080p HD</span> <span class="badge-indigo">Fast Mirrors</span>

> [!CINEJOY] **Featured Online Cinema**
> **CineJoy** ([https://cinejoy.online](https://cinejoy.online)) features a clean minimalist theater UI, high-bitrate streaming, and mobile-friendly media playback with instant search.
> <span class="badge-amber">Popular</span> <span class="badge-emerald">Verified Safe</span> <span class="badge-sky">Multi-Server</span>

---

## 📺 High Definition Movies & TV Shows

| Platform Name | Direct URL | Quality | Registration | Key Features |
| :--- | :--- | :---: | :---: | :--- |
| **FlixHQ** | [flixhq.ink](https://flixhq.ink) | 1080p HD | ❌ Not Needed | Auto-play, Subtitles, Zero Ads |
| **CineJoy** | [cinejoy.online](https://cinejoy.online) | 1080p HD | ❌ Not Needed | Minimalist UI, Multi-server mirrors |
| **FMovies** | [fmovies.ps](https://fmovies.ps) | 720p/1080p | ❌ Not Needed | Massive catalog, trending filters |
| **Bflix** | [bflix.gg](https://bflix.gg) | 1080p | ❌ Not Needed | Quick bookmarks, clean layout |

---

## 💡 Important Streaming Guidelines & Security Callouts

> [!WARNING]
> **Adblocker Requirement:** Always ensure you have **uBlock Origin** or a secure DNS filter enabled when visiting media indexers to prevent unwanted popups or redirects.

> [!TIP]
> **Performance Tip:** If a stream buffers, click the **Server Switcher** on FlixHQ or CineJoy to select an alternate high-speed mirror.

---

## 🎨 Custom Styled Elements Demo

<div class="callout-box bg-slate-900/80 p-4 rounded-2xl border border-rose-500/40 shadow-lg">
  <h4 class="text-rose-400 font-bold font-mono text-sm flex items-center gap-2">
    <span>✨ Custom HTML & Tailwind Support</span>
  </h4>
  <p class="text-xs text-slate-300 mt-1">
    You can write raw HTML inside this <code class="bg-slate-800 px-1.5 py-0.5 rounded text-rose-300">streaming.md</code> file with inline Tailwind CSS classes, badges, and custom styled containers!
  </p>
  <div class="flex flex-wrap gap-2 mt-3">
    <span class="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-mono px-2.5 py-1 rounded-xl">#streaming</span>
    <span class="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[11px] font-mono px-2.5 py-1 rounded-xl">#flixhq</span>
    <span class="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono px-2.5 py-1 rounded-xl">#cinejoy</span>
  </div>
</div>
`
  },
  'adblocking.md': {
    id: 'adblocking.md',
    filename: 'adblocking.md',
    title: 'Adblocking & Privacy Guide',
    category: 'adblocking',
    description: 'Comprehensive guide for blocking ads, popups, trackers, and telemetry.',
    content: `# 🛡️ Adblocking & Privacy Guide (\`adblocking.md\`)

Essential tools, uBlock Origin filterlists, DNS blockers, and privacy configurations for a clean, ad-free web experience.

---

> [!RECOMMENDED] **Gold Standard Adblocker**
> **uBlock Origin** is the only open-source adblocker recommended by privacy researchers. Lightweight, efficient, and open source.
> <span class="badge-emerald">Open Source</span> <span class="badge-sky">Top Rated</span>

---

## 🚀 Recommended Extension Setup

1. Install **uBlock Origin** for Firefox, Brave, or Chrome.
2. Enable **FMHY Filterlist** in uBlock settings.
3. Configure **NextDNS** or **AdGuard DNS** for network-wide protection.

> [!NOTE]
> Avoid Manifest V3 adblockers that restrict network request filtering. Stick to recommended community filters.
`
  },
  'software.md': {
    id: 'software.md',
    filename: 'software.md',
    title: 'Free & FOSS Software Index',
    category: 'software',
    description: 'Open source desktop software, system utilities, and productive tools.',
    content: `# 💻 Free & Open Source Software (\`software.md\`)

Collection of open-source utilities, video editors, media players, and privacy tools for Windows, macOS, and Linux.

---

> [!TIP]
> All software listed in this index is verified malware-free and open source.

## 📦 Top Utilities

- **VLC Media Player**: Universal open-source media player.
- **7-Zip**: High compression ratio file archiver.
- **Obsidian**: Markdown-based knowledge base and note-taking tool.
- **Handbrake**: Open source video transcoder.
`
  },
  'games.md': {
    id: 'games.md',
    filename: 'games.md',
    title: 'Gaming & Emulators Hub',
    category: 'games',
    description: 'Open source game emulators, preservation tools, and launchers.',
    content: `# 🎮 Gaming & Emulators Hub (\`games.md\`)

Verified tools, emulators, game preservation directories, and open source launchers.

---

> [!WARNING]
> Only download game ROMs and preservation files from verified green-rated mirrors.

## 🕹️ Emulators & Clients

| System | Emulator | License | Platform |
| :--- | :--- | :---: | :--- |
| **Switch** | Ryujinx / Yuzu | GPL-3.0 | Windows, Linux |
| **PS2** | PCSX2 | GPL-3.0 | Windows, Linux, Mac |
| **Multi-System** | RetroArch | GPL-3.0 | All Platforms |
`
  },
  'ai-tools.md': {
    id: 'ai-tools.md',
    filename: 'ai-tools.md',
    title: 'Free AI Models & Tools',
    category: 'ai-tools',
    description: 'Free LLMs, image generators, audio tools, and AI utilities.',
    content: `# 🤖 Free AI Models & Utilities (\`ai-tools.md\`)

Directory of free LLM platforms, local model runners, image generation tools, and developer APIs.

---

> [!NOTE]
> Use local LLMs like **Ollama** or **LM Studio** for offline, private AI assistance.

## ⚡ Recommended Tools

- **Google Gemini Studio**: Fast multimodal AI workbench.
- **Ollama**: Run Llama, DeepSeek, and Qwen models locally.
- **Hugging Face**: Open-weight model repository and spaces.
`
  }
};
