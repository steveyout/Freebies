import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Save,
  RotateCcw,
  Download,
  Upload,
  Eye,
  Edit3,
  Columns,
  X,
  Plus,
  Check,
  Sparkles,
  Tv,
  Film,
  AlertTriangle,
  Lightbulb,
  Tag,
  Table,
  Code,
  Heading,
  Bold,
  Italic,
  List,
  ExternalLink,
  ShieldAlert,
  Info
} from 'lucide-react';
import { MarkdownFile } from '../data/markdownData';
import {
  getStoredMarkdownFiles,
  saveMarkdownFile,
  resetMarkdownFile,
  downloadMarkdownFile
} from '../utils/markdownStorage';
import { MarkdownViewer } from './MarkdownViewer';
import { useToast } from '../context/ToastContext';

interface MarkdownEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFileId?: string; // e.g. "streaming.md"
  onSaved?: () => void;
}

export const MarkdownEditorModal: React.FC<MarkdownEditorModalProps> = ({
  isOpen,
  onClose,
  initialFileId = 'streaming.md',
  onSaved,
}) => {
  const { showToast } = useToast();
  const [markdownFiles, setMarkdownFiles] = useState<Record<string, MarkdownFile>>({});
  const [activeFileId, setActiveFileId] = useState<string>(initialFileId);
  const [editorContent, setEditorContent] = useState<string>('');
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [newFilenameInput, setNewFilenameInput] = useState('');
  const [isAddingNewFile, setIsAddingNewFile] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load files from storage when modal opens
  useEffect(() => {
    if (isOpen) {
      const files = getStoredMarkdownFiles();
      setMarkdownFiles(files);
      const targetId = files[initialFileId] ? initialFileId : Object.keys(files)[0] || 'streaming.md';
      setActiveFileId(targetId);
      if (files[targetId]) {
        setEditorContent(files[targetId].content);
      }
    }
  }, [isOpen, initialFileId]);

  // When changing file selection
  const handleSelectFile = (fileId: string) => {
    setActiveFileId(fileId);
    if (markdownFiles[fileId]) {
      setEditorContent(markdownFiles[fileId].content);
    }
  };

  // Save current file
  const handleSave = () => {
    const updated = saveMarkdownFile(activeFileId, editorContent);
    setMarkdownFiles((prev) => ({
      ...prev,
      [activeFileId]: updated,
    }));
    setIsSavedSuccess(true);
    showToast(`Successfully saved ${activeFileId}!`, 'success');
    setTimeout(() => setIsSavedSuccess(false), 2500);
    if (onSaved) onSaved();
  };

  // Reset current file
  const handleReset = () => {
    if (window.confirm(`Reset ${activeFileId} back to its default original template?`)) {
      const restored = resetMarkdownFile(activeFileId);
      if (restored) {
        setMarkdownFiles((prev) => ({
          ...prev,
          [activeFileId]: restored,
        }));
        setEditorContent(restored.content);
        showToast(`Reset ${activeFileId} to default template`, 'info');
      }
    }
  };

  // Download current file
  const handleDownload = () => {
    downloadMarkdownFile(activeFileId, editorContent);
    showToast(`Downloaded ${activeFileId}`, 'success');
  };

  // Upload markdown file from local disk
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const filename = file.name.endsWith('.md') ? file.name : `${file.name}.md`;
        const updated = saveMarkdownFile(filename, text);
        setMarkdownFiles((prev) => ({
          ...prev,
          [filename]: updated,
        }));
        setActiveFileId(filename);
        setEditorContent(text);
        showToast(`Uploaded and saved ${filename}`, 'success');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Add custom file
  const handleCreateCustomFile = () => {
    if (!newFilenameInput.trim()) return;
    const cleanName = newFilenameInput.trim().toLowerCase().endsWith('.md')
      ? newFilenameInput.trim().toLowerCase()
      : `${newFilenameInput.trim().toLowerCase()}.md`;

    const initialText = `# 📝 ${cleanName}\n\nCustom markdown content for ${cleanName}.\n\n> [!NOTE]\n> Add custom links, tables, and styled callout boxes here.`;
    const created = saveMarkdownFile(cleanName, initialText);

    setMarkdownFiles((prev) => ({
      ...prev,
      [cleanName]: created,
    }));
    setActiveFileId(cleanName);
    setEditorContent(initialText);
    setNewFilenameInput('');
    setIsAddingNewFile(false);
    showToast(`Created new file ${cleanName}`, 'success');
  };

  // Quick insertion helper
  const insertText = (before: string, after: string = '') => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = editorContent.substring(start, end) || 'text';
    const newText = editorContent.substring(0, start) + before + selected + after + editorContent.substring(end);
    setEditorContent(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 50);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-6xl h-[92vh] bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-zinc-100"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 dark:bg-zinc-950/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-mono tracking-tight flex items-center gap-2">
                  <span>Markdown Studio &amp; Document Editor</span>
                  <span className="text-[10px] font-mono font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full uppercase">
                    Live MD Sync
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Edit category markdown files (<code className="text-rose-500 font-mono">streaming.md</code>, etc.) with custom styling support.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm transition-all"
              >
                {isSavedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{isSavedSuccess ? 'Saved!' : 'Save Changes'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* File Selector Bar & View Mode Toggles */}
          <div className="px-4 py-2.5 border-b border-slate-200 dark:border-zinc-800 bg-slate-100/60 dark:bg-zinc-900/60 flex flex-wrap items-center justify-between gap-3">
            {/* File List Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {Object.keys(markdownFiles).map((fileId) => (
                <button
                  key={fileId}
                  onClick={() => handleSelectFile(fileId)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    activeFileId === fileId
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{fileId}</span>
                </button>
              ))}

              {!isAddingNewFile ? (
                <button
                  onClick={() => setIsAddingNewFile(true)}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-300 dark:hover:bg-zinc-700 flex items-center gap-1 border border-dashed border-slate-300 dark:border-zinc-700"
                  title="Create custom .md file"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New .md</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-800 p-1 rounded-xl border border-rose-500">
                  <input
                    type="text"
                    value={newFilenameInput}
                    onChange={(e) => setNewFilenameInput(e.target.value)}
                    placeholder="my-file.md"
                    className="w-24 px-2 py-0.5 text-xs font-mono bg-transparent outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleCreateCustomFile}
                    className="p-1 rounded-lg bg-rose-600 text-white hover:bg-rose-500"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setIsAddingNewFile(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* View Mode Switches & Actions */}
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700 flex items-center gap-1">
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold flex items-center gap-1 transition-colors ${
                    viewMode === 'split'
                      ? 'bg-rose-500 text-white'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Side-by-side Split View"
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Split</span>
                </button>

                <button
                  onClick={() => setViewMode('editor')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold flex items-center gap-1 transition-colors ${
                    viewMode === 'editor'
                      ? 'bg-rose-500 text-white'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Editor Only"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </button>

                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold flex items-center gap-1 transition-colors ${
                    viewMode === 'preview'
                      ? 'bg-rose-500 text-white'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Preview Only"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
              </div>

              {/* Extra File Actions */}
              <button
                onClick={handleDownload}
                className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors"
                title="Download .md File"
              >
                <Download className="w-4 h-4" />
              </button>

              <label
                className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer"
                title="Upload .md File"
              >
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  accept=".md,.markdown"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors"
                title="Reset File to Original Template"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Styling Helpers Toolbar */}
          {(viewMode === 'split' || viewMode === 'editor') && (
            <div className="px-4 py-2 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 flex flex-wrap items-center gap-1.5 overflow-x-auto text-xs">
              <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500 uppercase font-bold mr-1">
                Styling Helpers:
              </span>

              {/* FlixHQ Callout */}
              <button
                onClick={() =>
                  insertText(
                    `\n> [!FLIXHQ] **Top Priority Streamer**\n> **FlixHQ** ([https://flixhq.ink](https://flixhq.ink)) - HD Movies & TV Shows.\n> <span class="badge-rose">Top Rated</span>\n`
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 font-mono font-bold flex items-center gap-1 border border-rose-500/30"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>+ FlixHQ</span>
              </button>

              {/* CineJoy Callout */}
              <button
                onClick={() =>
                  insertText(
                    `\n> [!CINEJOY] **Cinema Portal**\n> **CineJoy** ([https://cinejoy.online](https://cinejoy.online)) - Cinema streaming mirror.\n> <span class="badge-amber">Popular</span>\n`
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 font-mono font-bold flex items-center gap-1 border border-amber-500/30"
              >
                <Film className="w-3.5 h-3.5" />
                <span>+ CineJoy</span>
              </button>

              {/* Warning Callout */}
              <button
                onClick={() =>
                  insertText(
                    `\n> [!WARNING]\n> **Adblocker Required:** Enable uBlock Origin before visiting external indexers.\n`
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 font-mono font-bold flex items-center gap-1 border border-amber-500/30"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>+ Warning</span>
              </button>

              {/* Tip Callout */}
              <button
                onClick={() =>
                  insertText(`\n> [!TIP]\n> **Pro Tip:** Switch mirror server if stream buffers.\n`)
                }
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 font-mono font-bold flex items-center gap-1 border border-emerald-500/30"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>+ Tip</span>
              </button>

              {/* Styled Badge */}
              <button
                onClick={() =>
                  insertText('<span class="badge-rose">', '</span>')
                }
                className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 font-mono font-bold flex items-center gap-1"
              >
                <Tag className="w-3.5 h-3.5 text-rose-500" />
                <span>+ Badge Tag</span>
              </button>

              {/* Table Template */}
              <button
                onClick={() =>
                  insertText(
                    `\n| Name | URL | Quality | Features |\n| :--- | :--- | :---: | :--- |\n| **FlixHQ** | [flixhq.ink](https://flixhq.ink) | 1080p | Fast mirror |\n| **CineJoy** | [cinejoy.online](https://cinejoy.online) | 1080p | Clean UI |\n`
                  )
                }
                className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 font-mono font-bold flex items-center gap-1"
              >
                <Table className="w-3.5 h-3.5" />
                <span>+ Table</span>
              </button>

              {/* Standard Formatting */}
              <button
                onClick={() => insertText('**', '**')}
                className="p-1 rounded bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 font-mono font-bold"
                title="Bold"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => insertText('*', '*')}
                className="p-1 rounded bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 font-mono font-bold"
                title="Italic"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => insertText('\n## ', '')}
                className="p-1 rounded bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 font-mono font-bold"
                title="Heading 2"
              >
                <Heading className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => insertText('```\n', '\n```')}
                className="p-1 rounded bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 font-mono font-bold"
                title="Code Block"
              >
                <Code className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Main Editor & Live Preview Body */}
          <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-zinc-800 overflow-hidden bg-slate-50/30 dark:bg-zinc-950/30">
            {/* Editor Pane */}
            {(viewMode === 'split' || viewMode === 'editor') && (
              <div
                className={`flex flex-col h-full ${
                  viewMode === 'editor' ? 'col-span-2' : 'col-span-1'
                }`}
              >
                <div className="px-4 py-2 bg-slate-100/80 dark:bg-zinc-900/80 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="font-bold text-slate-700 dark:text-zinc-300">Raw Markdown Source ({activeFileId})</span>
                  <span>{editorContent.length} characters</span>
                </div>
                <textarea
                  ref={textareaRef}
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  placeholder="Type markdown content here..."
                  className="flex-1 w-full p-4 font-mono text-xs sm:text-sm bg-slate-900 text-emerald-400 dark:bg-zinc-950 dark:text-emerald-300 outline-none resize-none leading-relaxed"
                />
              </div>
            )}

            {/* Live Rendered Markdown Preview Pane */}
            {(viewMode === 'split' || viewMode === 'preview') && (
              <div
                className={`flex flex-col h-full overflow-y-auto p-5 bg-white dark:bg-zinc-900 ${
                  viewMode === 'preview' ? 'col-span-2' : 'col-span-1'
                }`}
              >
                <div className="pb-3 mb-3 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    <span>Live Rendered Output (With Custom Styling)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full font-bold">
                    HTML &amp; Tailwind Enabled
                  </span>
                </div>

                <MarkdownViewer content={editorContent} />
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-3.5 border-t border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/60 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-mono">
            <span>
              Editing <strong className="text-slate-800 dark:text-zinc-200">{activeFileId}</strong> • Persistent in localStorage
            </span>

            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xs"
            >
              Save File
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
