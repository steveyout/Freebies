import { MarkdownFile, DEFAULT_MARKDOWN_FILES } from '../data/markdownData';

const LOCAL_STORAGE_KEY = 'fmhy_custom_markdown_files_v1';

export function getStoredMarkdownFiles(): Record<string, MarkdownFile> {
  if (typeof window === 'undefined') return DEFAULT_MARKDOWN_FILES;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return DEFAULT_MARKDOWN_FILES;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_MARKDOWN_FILES, ...parsed };
  } catch (err) {
    console.error('Failed to load custom markdown files from localStorage', err);
    return DEFAULT_MARKDOWN_FILES;
  }
}

export function saveMarkdownFile(fileId: string, newContent: string): MarkdownFile {
  const allFiles = getStoredMarkdownFiles();
  const existing = allFiles[fileId] || {
    id: fileId,
    filename: fileId,
    title: fileId.replace('.md', '').toUpperCase(),
    category: 'general',
    description: 'Custom markdown file',
    content: newContent,
  };

  const updatedFile: MarkdownFile = {
    ...existing,
    content: newContent,
    lastModified: new Date().toISOString(),
  };

  const updatedMap = {
    ...allFiles,
    [fileId]: updatedFile,
  };

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMap));
  } catch (err) {
    console.error('Failed to save markdown file to localStorage', err);
  }

  return updatedFile;
}

export function resetMarkdownFile(fileId: string): MarkdownFile | null {
  const defaultFile = DEFAULT_MARKDOWN_FILES[fileId];
  if (!defaultFile) return null;

  const allFiles = getStoredMarkdownFiles();
  const updatedMap = { ...allFiles, [fileId]: defaultFile };

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMap));
  } catch (err) {
    console.error('Failed to reset markdown file in localStorage', err);
  }

  return defaultFile;
}

export function resetAllMarkdownFiles(): Record<string, MarkdownFile> {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset all markdown files', err);
  }
  return DEFAULT_MARKDOWN_FILES;
}

export function downloadMarkdownFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.md') ? filename : `${filename}.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
