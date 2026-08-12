import React, { useState } from 'react';
import { Category, LinkItem, SafetyRating } from '../types/fmhy';
import { 
  GitPullRequest, 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Github, 
  Sparkles, 
  PlusCircle, 
  AlertCircle,
  FileCode,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAddLocalContribution: (item: LinkItem) => void;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({
  isOpen,
  onClose,
  categories,
  onAddLocalContribution,
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCatId, setSelectedCatId] = useState(categories[0]?.id || 'adblocking');
  const [selectedSubId, setSelectedSubId] = useState(categories[0]?.subcategories[0]?.id || '');
  const [tags, setTags] = useState('Open Source, Free, No Ads');
  const [safetyRating, setSafetyRating] = useState<SafetyRating>('Safe');
  const [isOpenSource, setIsOpenSource] = useState(true);
  const [submitterHandle, setSubmitterHandle] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [testedLive, setTestedLive] = useState(false);

  const selectedCategoryObj = categories.find((c) => c.id === selectedCatId) || categories[0];

  const handleCatChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = categories.find((c) => c.id === catId);
    if (cat && cat.subcategories.length > 0) {
      setSelectedSubId(cat.subcategories[0].id);
    }
  };

  // Generate GitHub PR Markdown snippet
  const generatedMarkdown = `
### Proposed Resource Contribution for freebies
- **Title**: ${title || '[Title]'}
- **URL**: ${url || '[https://example.com]'}
- **Category**: \`${selectedCategoryObj?.name}\` -> \`${selectedSubId}\`
- **Description**: ${description || '[Detailed description of the tool/source]'}
- **Tags**: \`${tags}\`
- **Safety Rating**: ${safetyRating}
- **Open Source**: ${isOpenSource ? 'Yes (FOSS)' : 'No'}
- **Submitted By**: @${submitterHandle || 'anonymous'}

\`\`\`json
{
  "id": "${(title || 'resource').toLowerCase().replace(/[^a-z0-9]/g, '-')}",
  "title": "${title || 'Sample Tool'}",
  "url": "${url || 'https://example.com'}",
  "description": "${description || 'Description of tool'}",
  "category": "${selectedCatId}",
  "subcategory": "${selectedSubId}",
  "tags": [${tags.split(',').map((t) => `"${t.trim()}"`).join(', ')}],
  "safetyRating": "${safetyRating}",
  "isOpenSource": ${isOpenSource},
  "dateAdded": "${new Date().toISOString().slice(0, 10)}",
  "addedBy": "${submitterHandle.replace(/^@/, '') || 'anonymous'}",
  "lastVerified": "${new Date().toISOString().slice(0, 7)}"
}
\`\`\`
`.trim();

  // Copy Markdown snippet
  const handleCopySnippet = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  // Open GitHub Issue
  const handleOpenGithubIssue = () => {
    const issueTitle = encodeURIComponent(`[Resource Submission]: ${title || 'New Link'}`);
    const issueBody = encodeURIComponent(generatedMarkdown);
    window.open(`https://github.com/fmhy/FMHY/issues/new?title=${issueTitle}&body=${issueBody}`, '_blank');
  };

  // Submit & Test Live in React State
  const handleTestLive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    const cleanHandle = submitterHandle.replace(/^@/, '').trim() || 'anonymous';
    const today = new Date().toISOString().slice(0, 10);

    const newItem: LinkItem = {
      id: `contrib-${Date.now()}`,
      title,
      url: url.startsWith('http') ? url : `https://${url}`,
      description: description || 'User contributed resource.',
      category: selectedCatId,
      subcategory: selectedSubId,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      safetyRating,
      isOpenSource,
      isStarred: true,
      badge: '✨ User Contribution',
      dateAdded: today,
      addedBy: cleanHandle,
      lastVerified: new Date().toISOString().slice(0, 7),
      githubFile: selectedCategoryObj.githubFile
    };

    onAddLocalContribution(newItem);
    setTestedLive(true);
    setTimeout(() => {
      setTestedLive(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8 transition-colors"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-600/30">
                <GitPullRequest className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-zinc-100 flex items-center gap-2 font-mono">
                  Contribute Source / Add Link
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Submit via GitHub PR workflow or test your addition directly.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleTestLive} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto font-sans">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., uBlock Origin"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Website URL *
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g., https://ublockorigin.com/"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Category & Subcategory Select */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Target Category
                </label>
                <select
                  value={selectedCatId}
                  onChange={(e) => handleCatChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-rose-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.githubFile})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Subcategory
                </label>
                <select
                  value={selectedSubId}
                  onChange={(e) => setSelectedSubId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-rose-500"
                >
                  {selectedCategoryObj?.subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Description & Why It Should Be Added
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain why this source is safe, ad-free, or useful..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Tags & Safety */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Open Source, Privacy, Adblock"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Safety Rating
                </label>
                <select
                  value={safetyRating}
                  onChange={(e) => setSafetyRating(e.target.value as SafetyRating)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-rose-500"
                >
                  <option value="Safe">Safe</option>
                  <option value="Use Adblock">Use Adblock</option>
                  <option value="Requires Registration">Requires Registration</option>
                  <option value="Torrent">Torrent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Your GitHub Handle
                </label>
                <input
                  type="text"
                  value={submitterHandle}
                  onChange={(e) => setSubmitterHandle(e.target.value)}
                  placeholder="octocat"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="foss-check"
                checked={isOpenSource}
                onChange={(e) => setIsOpenSource(e.target.checked)}
                className="rounded bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800 text-rose-600 focus:ring-rose-500"
              />
              <label htmlFor="foss-check" className="text-xs text-slate-700 dark:text-zinc-300">
                This project is Free & Open Source Software (FOSS)
              </label>
            </div>

            {/* Generated GitHub PR Snippet Preview */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5" />
                  GitHub PR Snippet Generator ({selectedCategoryObj.githubFile})
                </span>

                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 border border-slate-300 dark:border-zinc-700 flex items-center gap-1"
                >
                  {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet ? 'Copied PR Code!' : 'Copy Snippet'}</span>
                </button>
              </div>

              <pre className="text-[11px] font-mono bg-slate-100 dark:bg-zinc-900/90 p-2.5 rounded-lg text-slate-800 dark:text-zinc-300 overflow-x-auto max-h-28 text-left border border-slate-200 dark:border-zinc-800">
                {generatedMarkdown}
              </pre>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleOpenGithubIssue}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-medium text-xs flex items-center gap-2 border border-slate-200 dark:border-zinc-700"
              >
                <Github className="w-4 h-4" />
                <span>Open Issue on GitHub</span>
              </button>

              <button
                type="submit"
                disabled={!title || !url}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-md transition-all ${
                  title && url
                    ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-950/40'
                    : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 cursor-not-allowed'
                }`}
              >
                {testedLive ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Added Live to Directory!</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Add to Live Directory Preview</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
