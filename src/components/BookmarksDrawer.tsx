import React from 'react';
import { LinkItem } from '../types/fmhy';
import { 
  X, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  Star 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedItems: LinkItem[];
  onRemoveBookmark: (item: LinkItem) => void;
  onClearAll: () => void;
  onImportBookmarks: (items: LinkItem[]) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedItems,
  onRemoveBookmark,
  onClearAll,
  onImportBookmarks,
}) => {
  const { config } = useTheme();
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, url: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Copied to clipboard', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(bookmarkedItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'freebies_bookmarks.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(`Exported ${bookmarkedItems.length} bookmarks to JSON`, 'success');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportBookmarks(parsed);
          showToast(`Imported ${parsed.length} bookmarks successfully`, 'success');
        }
      } catch {
        showToast('Invalid JSON file format', 'error');
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 dark:bg-zinc-950/80 backdrop-blur-sm">
        
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-full max-w-md bg-white dark:bg-zinc-900 border-l border-slate-200 dark:border-zinc-800 h-full flex flex-col shadow-2xl transition-colors"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <h3 className="font-bold text-base text-slate-900 dark:text-zinc-100 font-mono">
                Saved Resources ({bookmarkedItems.length})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans">
            {bookmarkedItems.length === 0 ? (
              <div className="text-center py-16 text-slate-500 dark:text-zinc-500">
                <Star className="w-10 h-10 mx-auto mb-3 opacity-30 text-amber-500" />
                <p className="text-sm font-medium">No saved resources yet.</p>
                <p className="text-xs text-slate-400 dark:text-zinc-400 mt-1">
                  Click the star icon on any card to save your favorite freebies links here.
                </p>
              </div>
            ) : (
              bookmarkedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 transition-all flex items-start justify-between gap-3 group shadow-xs"
                >
                  <div className="min-w-0 flex-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-sm text-slate-900 dark:text-zinc-100 group-hover:underline transition-colors flex items-center gap-1.5 line-clamp-1"
                    >
                      <span>{item.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60" />
                    </a>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => handleCopy(e, item.url, item.id)}
                      className="p-1.5 rounded-lg bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => onRemoveBookmark(item)}
                      className="p-1.5 rounded-lg bg-slate-200 dark:bg-zinc-800 hover:bg-rose-100 dark:hover:bg-rose-950 text-slate-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls */}
          {bookmarkedItems.length > 0 && (
            <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/90 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportJSON}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-xs font-medium flex items-center gap-1.5 border border-slate-300 dark:border-zinc-700"
                  title="Export to JSON file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>

                <label className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-xs font-medium flex items-center gap-1.5 border border-slate-300 dark:border-zinc-700 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={onClearAll}
                className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/80 hover:bg-rose-200 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 text-xs font-medium border border-rose-300 dark:border-rose-800/80"
              >
                Clear All
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
