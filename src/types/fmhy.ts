export type SafetyRating = 'Safe' | 'Use Adblock' | 'Requires Registration' | 'Torrent' | 'Freemium';

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  isStarred?: boolean;
  isOpenSource?: boolean;
  isNoAds?: boolean;
  isNoReg?: boolean;
  safetyRating: SafetyRating;
  badge?: string;
  mirrorUrls?: string[];
  lastVerified?: string;
  dateAdded?: string; // YYYY-MM-DD e.g. "2026-07-28"
  addedBy?: string; // GitHub handle e.g. "octocat"
  githubFile?: string; // e.g. "data/software.json" or "docs/adblocking.md"
  nsfw?: boolean;
}

export interface ContributorProfile {
  githubUsername: string;
  avatarUrl: string;
  linksCount: number;
  joinedDate?: string;
  bio?: string;
  contributedLinks: LinkItem[];
}

export interface SubCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  items: LinkItem[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string; // Lucide icon identifier
  description: string;
  subcategories: SubCategory[];
  githubFile: string;
}

export interface SearchFilterState {
  query: string;
  selectedCategory: string;
  onlyStarred: boolean;
  onlyOpenSource: boolean;
  onlyNoReg: boolean;
  onlySafe: boolean;
  onlyHighRated?: boolean;
  onlyBroken?: boolean;
  hideBroken?: boolean;
  showNsfw: boolean;
  viewMode: 'grid' | 'list' | 'compact';
}

export interface UserContribution {
  title: string;
  url: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string;
  safetyRating: SafetyRating;
  isOpenSource: boolean;
  reason: string;
  submitterGithub?: string;
}
