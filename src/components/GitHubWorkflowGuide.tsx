import React, { useState } from 'react';
import { Category } from '../types/fmhy';
import { 
  Github, 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  GitBranch, 
  GitPullRequest, 
  FileText, 
  Server, 
  Zap,
  Globe,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GitHubWorkflowGuideProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  activeCategory: Category;
}

export const GitHubWorkflowGuide: React.FC<GitHubWorkflowGuideProps> = ({
  isOpen,
  onClose,
  categories,
  activeCategory,
}) => {
  const [selectedCat, setSelectedCat] = useState<Category>(activeCategory);
  const [copied, setCopied] = useState(false);

  // Generate simulated raw Markdown file representation for the selected category
  const generateCategoryMarkdown = (cat: Category) => {
    let md = `# ${cat.name}\n\n${cat.description}\n\n`;
    cat.subcategories.forEach((sub) => {
      md += `## ${sub.name}\n${sub.description || ''}\n\n`;
      sub.items.forEach((item) => {
        md += `- [**${item.title}**](${item.url}) - ${item.description} \`${item.safetyRating}\` ${item.tags.map((t) => `#${t}`).join(' ')}\n`;
      });
      md += `\n`;
    });
    return md;
  };

  const currentMarkdown = generateCategoryMarkdown(selectedCat);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(currentMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-zinc-800 text-zinc-100 border border-zinc-700">
                <Github className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-zinc-100 flex items-center gap-2 font-mono">
                  GitHub Pages & PR Workflow
                </h3>
                <p className="text-xs text-zinc-400">
                  Static fast deployment architecture & continuous contribution model.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-6 max-h-[75vh] overflow-y-auto font-sans">
            
            {/* Steps Workflow Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold mb-1">
                  <GitBranch className="w-4 h-4" />
                  <span>1. Fork Repo</span>
                </div>
                <p className="text-xs text-zinc-300">
                  Fork the static repository <code className="text-rose-300">steveyout/Freebies</code> on GitHub. All sections are modular files.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold mb-1">
                  <FileText className="w-4 h-4" />
                  <span>2. Edit Source File</span>
                </div>
                <p className="text-xs text-zinc-300">
                  Add or edit links inside the respective category files (e.g. <code className="text-rose-300">{selectedCat.githubFile}</code>).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold mb-1">
                  <GitPullRequest className="w-4 h-4" />
                  <span>3. Open Pull Request</span>
                </div>
                <p className="text-xs text-zinc-300">
                  Submit your PR. GitHub Actions automatically builds & deploys to GitHub Pages static CDN.
                </p>
              </div>
            </div>

            {/* Source Markdown Inspector */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-mono font-bold text-zinc-200">
                    Category Source File Preview:
                  </span>
                  <select
                    value={selectedCat.id}
                    onChange={(e) => {
                      const found = categories.find((c) => c.id === e.target.value);
                      if (found) setSelectedCat(found);
                    }}
                    className="px-2 py-1 rounded bg-zinc-950 text-rose-300 border border-zinc-800 text-xs font-mono"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.githubFile}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyMarkdown}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 border border-zinc-700"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Markdown' : 'Copy Raw File'}</span>
                  </button>

                  <a
                    href={`https://github.com/steveyout/Freebies/edit/main/${selectedCat.githubFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Edit on steveyout/Freebies</span>
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto max-h-60 leading-relaxed text-left">
                <pre>{currentMarkdown}</pre>
              </div>
            </div>

            {/* GitHub Pages Specs */}
            <div className="p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800 text-xs space-y-2 text-zinc-400 font-mono">
              <div className="flex items-center justify-between">
                <span>Deployment Host:</span>
                <span className="text-zinc-200">GitHub Pages (Static Web Hosting)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Build Engine:</span>
                <span className="text-zinc-200">Vite Single Page Static Build</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Contribution Guide:</span>
                <span className="text-emerald-400 font-bold">CONTRIBUTING.md Available</span>
              </div>
            </div>

          </div>

          <div className="p-4 border-t border-zinc-800 bg-zinc-950/90 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
