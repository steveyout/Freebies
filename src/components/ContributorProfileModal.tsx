import React from 'react';
import { LinkItem } from '../types/fmhy';
import { X, Github, ExternalLink, Award, CheckCircle, Calendar, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContributionHeatmap } from './ContributionHeatmap';
import { useTheme } from '../context/ThemeContext';

interface ContributorProfileModalProps {
  isOpen: boolean;
  username: string | null;
  onClose: () => void;
  allLinks: LinkItem[];
}

export const ContributorProfileModal: React.FC<ContributorProfileModalProps> = ({
  isOpen,
  username,
  onClose,
  allLinks,
}) => {
  const { config } = useTheme();

  if (!isOpen || !username) return null;

  const handle = username.replace(/^@/, '');
  const userLinks = allLinks.filter((item) => (item.addedBy || '').toLowerCase() === handle.toLowerCase());

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 bg-zinc-950/80 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img
                src={`https://github.com/${handle}.png`}
                alt={handle}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className={`w-12 h-12 rounded-full border-2 ${config.borderActive} bg-zinc-800 object-cover shrink-0`}
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-white font-mono">
                    @{handle}
                  </h3>
                  <span className={`text-[10px] font-mono font-bold ${config.badgeBg} ${config.badgeText} px-2 py-0.5 rounded-full border ${config.badgeBorder}`}>
                    Directory Contributor
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 font-sans">
                  Submitted {userLinks.length} verified {userLinks.length === 1 ? 'resource' : 'resources'} to the directory.
                </p>
                <a
                  href={`https://github.com/${handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-[11px] font-mono ${config.textAccent} hover:underline mt-1`}
                >
                  <Github className="w-3 h-3" />
                  <span>github.com/{handle}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 max-h-[75vh] overflow-y-auto space-y-5 font-sans">
            {/* GitHub-style Contribution Heatmap Visualization */}
            <ContributionHeatmap username={handle} userLinks={userLinks} />

            {/* List of Contributed Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono flex items-center justify-between">
                <span>Contributed Links ({userLinks.length})</span>
                <span className="text-[10px] text-emerald-400 font-normal">All PRs Approved & Merged</span>
              </h4>

              {userLinks.length === 0 ? (
                <div className="text-center py-8 bg-zinc-950/50 rounded-xl border border-zinc-800 text-xs text-zinc-500 font-mono">
                  No indexed links found for @{handle}.
                </div>
              ) : (
                <div className="space-y-2">
                  {userLinks.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-bold text-xs text-zinc-100 hover:${config.textAccent} transition-colors truncate`}
                          >
                            {item.title}
                          </a>
                          {item.isOpenSource && (
                            <span className="text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-900/50 px-1.5 py-0.2 rounded font-mono">
                              FOSS
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-zinc-500 font-mono">
                          <span>Category: {item.category} / {item.subcategory}</span>
                          {item.dateAdded && <span>• Added {item.dateAdded}</span>}
                        </div>
                      </div>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white shrink-0"
                        title="Visit link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Verified GitHub Contributor Profile</span>
            <button
              onClick={onClose}
              className={`px-4 py-1.5 ${config.buttonBg} rounded-xl text-xs font-semibold transition-colors`}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
