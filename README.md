# 🎁 freebies Directory

> The modern community mega-directory for curated free media, HD streaming indexers, open-source software, developer tools, adblocking shields, and AI utilities.

[![Website](https://img.shields.io/badge/Website-freeebies.site-f59e0b?style=for-the-badge&logo=google-chrome&logoColor=white)](https://freeebies.site)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🌟 Key Highlights & Architecture

- **Hybrid Submission Model**: Contributors can submit resources either directly via the web UI (`/contribute`) or by opening a GitHub Pull Request editing repository Markdown files (`data/*.md`).
- **Real-Time Synchronized Directory**: Live votes, new submissions, priority stars, and comments sync instantly across clients using native **Socket.IO** streams.
- **Dynamic Star Priority & IP Voting**: Resources are ranked by algorithmic community score (`score = upvotes - downvotes`). Administrators can 1-click star priority resources (e.g. FlixHQ, CineJoy, uBlock Origin) to pin them on top.
- **Zero-Stall Markdown Synchronization**:
  - Edits to `data/*.md` in GitHub PRs are automatically parsed into UI cards and synced to production MySQL on deployment.
  - Submissions approved in the Admin Panel automatically append new rows to their respective Markdown files (`data/<category>.md`) to keep the Git history and database 100% congruent.
- **Enterprise Security & Cloud Deployment**:
  - Fully proxied behind BunkerWeb WAF and Cloudflare SSL.
  - Automated Continuous Deployment pipeline running via GitHub Actions directly to Ubuntu VPS with PM2 cluster reload.

---

## 📁 Repository Structure

```
Freebies/
├── app/                           # Next.js App Router root
│   ├── admin/                     # Admin control center
│   │   ├── categories/            # Category & subcategory manager + Markdown sync editor
│   │   ├── comments/              # Moderation queue for discussions & team notes
│   │   ├── resources/             # Dynamic catalog manager, star pinning & voting
│   │   ├── submissions/           # Hybrid queue: UI & GitHub PR approvals
│   │   └── votes/                 # IP audit log & vote fraud prevention
│   ├── api/                       # REST endpoints & Socket.IO handlers
│   ├── category/                  # Dynamic category & subcategory listing pages
│   ├── resource/                  # Dynamic detail pages (/resource/[resourceId])
│   ├── contribute/                # Public community submission portal
│   ├── explore/                   # Full-text searchable index & tag filter
│   └── layout.tsx                 # Root layout with SEO metadata & theme providers
├── components/                    # Reusable React UI components
│   ├── admin/ConfirmDialog.tsx    # Styled modern modal dialogs (no window.confirm)
│   ├── CategoryContentClient.tsx  # Dynamic category pills with mouse-wheel scroll
│   ├── CategoryNav.tsx            # Horizontal scroll category nav tabs
│   ├── ExploreClient.tsx          # Real-time search & interactive directory filters
│   ├── Header.tsx                 # Responsive header with discreet admin indicator
│   └── LinkCard.tsx               # Verified directory link card with ratings & tags
├── data/                          # Master Markdown files & category manifests
│   ├── categories.json            # Category hierarchy and subcategory tree
│   ├── streaming.md               # HD Movies, TV shows & anime tables
│   ├── adblocking.md              # Content blockers, DNS filters & VPNs
│   ├── software.md                # Free & open-source software (FOSS)
│   └── ai-tools.md                # Free LLMs, local runners (Ollama, LM Studio)
├── db/                            # Sequelize ORM & MySQL database models
│   ├── models/                    # Resource, Submission, Comment, Vote, AuditLog
│   ├── connection.ts              # Connection pooling & dialect setup
│   └── syncResources.ts           # Safe zero-data-loss database sync script
├── deploy/                        # Production deployment configuration
│   └── ecosystem.config.cjs       # PM2 cluster configuration
└── .github/workflows/             # Continuous Deployment workflows
    └── deploy.yml                 # Automated zero-downtime VPS deployment
```

---

## 🚀 Getting Started Locally

### Prerequisites

- **Node.js**: v22 LTS or higher
- **pnpm**: v9 or v11 (`npm i -g pnpm`)
- **MySQL / MariaDB**: MySQL 8.0+ or local SQLite fallback

### 1. Clone the repository

```bash
git clone https://github.com/steveyout/Freebies.git
cd Freebies
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set your configuration:

```env
PORT=3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
JWT_SECRET=your_super_secret_jwt_key
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=freebies_directory
DB_USER=root
DB_PASSWORD=your_mysql_password
```

### 4. Seed the database

```bash
pnpm run seed
```

### 5. Start the development server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 How to Contribute Resources

We welcome all community contributions! There are two ways to submit new tools, open-source apps, or media sites:

### Method 1: Web UI Submission (Fastest)

1. Visit [https://freeebies.site/contribute](https://freeebies.site/contribute).
2. Enter the resource title, target URL, description, category, and safety attributes.
3. Submit! Your submission will enter the admin queue for immediate review and publication.

### Method 2: GitHub Pull Request (For Developers)

1. Fork this repository.
2. Edit the corresponding file in `data/<category>.md` (e.g. `data/streaming.md` or `data/ai-tools.md`).
3. Add a new row to the Markdown table following this standard format:

```markdown
| **Tool Name** | [toolurl.com](https://toolurl.com) | Quality / Type | Registration | Short description of key features |
```

4. Open a Pull Request titled `feat: add <Tool Name> to <Category>`.
5. Once merged, the GitHub Actions deployment pipeline will automatically ingest your changes into the live database!

---

## 🛡️ Admin Panel & Management Console

The administration dashboard is protected by JWT authentication and bcrypt password hashing.

- **URL**: `/admin`
- **Features**:
  - **Submissions Queue**: Review pending submissions with 1-click approval or custom styled rejection modal. Supports bulk actions (Bulk Approve & Bulk Reject).
  - **Categories & Markdown Sync**: Create/delete categories, add subcategories, and edit `data/*.md` files with in-browser syntax highlighting and live database sync.
  - **Dynamic Resources**: 1-click star toggle for top priority pinning, full metadata editor, and bulk delete with vote cleanup.
  - **Comment Moderation**: Moderate community discussion threads and private team feedback notes.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
