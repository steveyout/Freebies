'use client';

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
  ShieldCheck,
  Send,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../context/ToastContext';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAddLocalContribution?: (item: LinkItem) => void;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({
  isOpen,
  onClose,
  categories,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'ui' | 'github_pr'>('ui');

  // Form State
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCatId, setSelectedCatId] = useState(categories[0]?.id || 'adblocking');
  const [selectedSubId, setSelectedSubId] = useState(categories[0]?.subcategories[0]?.name || 'Extensions');
  const [tags, setTags] = useState('Open Source, Free, No Ads');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [githubPrUrl, setGithubPrUrl] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const selectedCategoryObj = categories.find((c) => c.id === selectedCatId) || categories[0];

  const handleCatChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = categories.find((c) => c.id === catId);
    if (cat && cat.subcategories.length > 0) {
      setSelectedSubId(cat.subcategories[0].name);
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
- **Submitted By**: @${submitterName || 'anonymous'}

\`\`\`json
{
  "title": "${title || 'Sample Tool'}",
  "url": "${url || 'https://example.com'}",
  "description": "${description || 'Description of tool'}",
  "category": "${selectedCatId}",
  "subcategory": "${selectedSubId}",
  "tags": [${tags.split(',').map((t) => `"${t.trim()}"`).filter(Boolean).join(', ')}],
  "dateAdded": "${new Date().toISOString().slice(0, 10)}",
  "addedBy": "${submitterName.replace(/^@/, '') || 'community'}"
}
\`\`\`
`.trim();

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  const handleDirectUiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim() || !description.trim()) {
      setErrorMessage('Please fill in Title, URL, and Description.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          url: url.trim(),
          description: description.trim(),
          category: selectedCatId,
          subcategory: selectedSubId,
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
          submissionType: activeTab,
          submitterName: submitterName.trim() || 'Community Contributor',
          submitterEmail: submitterEmail.trim() || null,
          githubPrUrl: githubPrUrl.trim() || null,
          notes: notes.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit resource');
      }

      setSuccessMessage(data.message);
      showToast('Resource submitted to moderation queue!', 'success');

      // Reset form
      setTitle('');
      setUrl('');
      setDescription('');
      setNotes('');
      setGithubPrUrl('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Error submitting resource');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 dark:bg-zinc-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8 transition-colors"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-zinc-100 font-mono">
                  Submit a Freebie Resource
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Hybrid contribution: submit via direct UI queue or open a GitHub Pull Request.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modality Tabs */}
          <div className="p-4 bg-slate-100 dark:bg-zinc-950/80 border-b border-slate-200 dark:border-zinc-800 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('ui')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all ${
                activeTab === 'ui'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>⚡ Direct UI Submission</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('github_pr')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all ${
                activeTab === 'github_pr'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800'
              }`}
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>🐙 GitHub Pull Request</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleDirectUiSubmit} className="p-6 space-y-4 max-h-[65vh] overflow-y-auto text-xs">
            {successMessage && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">Submission Queued Successfully!</p>
                  <p className="mt-0.5 text-xs text-emerald-700 dark:text-emerald-400">
                    {successMessage}
                  </p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {activeTab === 'ui' ? (
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-800 dark:text-blue-300">
                <strong>Instant UI Submission:</strong> Submitting here sends the resource directly to the administrator approval queue. Upon review, it gets instantly published live into the directory!
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900/60 text-violet-800 dark:text-violet-300 space-y-2">
                <p>
                  <strong>GitHub PR Workflow:</strong> Submit your link by creating a Pull Request on our repository or register your existing PR URL below for fast-track moderation.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="https://github.com/steveyout/Freebies/pulls"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-bold"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Open GitHub PRs</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopySnippet}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-300 dark:border-zinc-700 rounded-lg font-bold"
                  >
                    {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet ? 'Copied Markdown' : 'Copy PR Markdown'}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Proton Pass"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Direct URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Category *
                </label>
                <select
                  value={selectedCatId}
                  onChange={(e) => handleCatChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Subcategory / Section
                </label>
                <select
                  value={selectedSubId}
                  onChange={(e) => setSelectedSubId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {selectedCategoryObj?.subcategories.map((sub) => (
                    <option key={sub.id} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Description *
              </label>
              <textarea
                rows={2}
                required
                placeholder="What does this resource provide? Why is it useful and safe?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
              />
            </div>

            {activeTab === 'github_pr' && (
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Optional: GitHub Pull Request URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/steveyout/Freebies/pull/123"
                  value={githubPrUrl}
                  onChange={(e) => setGithubPrUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-xs"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Your Handle / Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="@yourusername"
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Open Source, Ad-Free, Privacy"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Moderator Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="Any special notes or mirrors to verify?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Admin approval queue enabled
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-5 py-2 rounded-xl font-bold text-white shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50 ${
                    activeTab === 'github_pr'
                      ? 'bg-violet-600 hover:bg-violet-500 shadow-violet-600/30'
                      : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
                  }`}
                >
                  {submitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <span>Submit for Admin Approval</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
