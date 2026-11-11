import fs from 'fs';
import path from 'path';
import { Category, LinkItem } from '@/types/fmhy';
import { parseMarkdownToCategories } from '@/utils/markdownParser';

const DATA_DIR = path.join(process.cwd(), 'data');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');

/**
 * Loads categories from data/categories.json, then merges any active data/*.md files
 */
export function getSavedCategories(): Category[] {
  try {
    if (fs.existsSync(CATEGORIES_FILE)) {
      const raw = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
      const cats: Category[] = JSON.parse(raw);
      return cats;
    }
  } catch (err) {
    console.warn('Failed to read data/categories.json:', err);
  }
  return [];
}

/**
 * Persists updated categories to data/categories.json
 */
export function saveCategories(categories: Category[]): boolean {
  try {
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to write data/categories.json:', err);
    return false;
  }
}

/**
 * Reads a markdown file from data/
 */
export function getCategoryMarkdown(filename: string): string | null {
  try {
    const fullPath = path.join(DATA_DIR, filename);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, 'utf-8');
    }
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
  }
  return null;
}

/**
 * Saves markdown file to data/
 */
export function saveCategoryMarkdown(filename: string, content: string): boolean {
  try {
    const fullPath = path.join(DATA_DIR, filename);
    fs.writeFileSync(fullPath, content, 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error saving ${filename}:`, err);
    return false;
  }
}

/**
 * Syncs an approved resource or custom resource into its respective Markdown file (e.g. data/streaming.md)
 * so GitHub Pull Requests and local repository markdown files stay 100% in sync with approved database items.
 */
export function appendResourceToMarkdown(resource: {
  title: string;
  url: string;
  category: string;
  subcategory?: string;
  description: string;
  safetyRating?: string;
  isNoReg?: boolean;
}): boolean {
  try {
    const mdFilename = `${resource.category}.md`;
    const fullPath = path.join(DATA_DIR, mdFilename);

    let content = '';
    if (fs.existsSync(fullPath)) {
      content = fs.readFileSync(fullPath, 'utf-8');
    } else {
      content = `# ${resource.category.toUpperCase()} Directory (\`data/${mdFilename}\`)\n\n---\n\n## ⚡ Curated Directory\n\n| Platform Name | Direct URL | Quality | Registration | Key Features & Notes |\n| :--- | :--- | :---: | :---: | :--- |\n`;
    }

    const regMark = resource.isNoReg ? '❌ Not Needed' : 'Optional';
    const cleanDesc = (resource.description || 'Verified directory resource').replace(/\|/g, '-');
    const tableRow = `| **${resource.title}** | [${resource.title}](${resource.url}) | Verified | ${regMark} | ${cleanDesc} |\n`;

    // If file has markdown table, append to the first table
    const tableIndex = content.lastIndexOf('| :---');
    if (tableIndex !== -1) {
      // Find end of this section table
      const nextSectionIndex = content.indexOf('\n## ', tableIndex);
      if (nextSectionIndex !== -1) {
        content = content.slice(0, nextSectionIndex) + tableRow + content.slice(nextSectionIndex);
      } else {
        content = content.trimEnd() + '\n' + tableRow;
      }
    } else {
      content += `\n${tableRow}`;
    }

    fs.writeFileSync(fullPath, content, 'utf-8');
    return true;
  } catch (err) {
    console.error('Error appending resource to markdown:', err);
    return false;
  }
}
