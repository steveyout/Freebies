import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  ExternalLink,
  Info,
  AlertTriangle,
  Lightbulb,
  Tv,
  Film,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Star
} from 'lucide-react';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, className = '' }) => {
  const [copiedCodeId, setCopiedCodeId] = React.useState<string | null>(null);

  const handleCopyCode = (codeText: string, id: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className={`markdown-styled-container font-sans text-slate-800 dark:text-zinc-200 leading-relaxed space-y-4 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Custom Heading 1
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white pb-3 mb-4 border-b-2 border-slate-200 dark:border-zinc-800 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-rose-500 shrink-0" />
              <span>{children}</span>
            </h1>
          ),
          // Custom Heading 2
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white pt-4 pb-2 border-b border-slate-200 dark:border-zinc-800/80 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-rose-500 inline-block shrink-0" />
              <span>{children}</span>
            </h2>
          ),
          // Custom Heading 3
          h3: ({ children }) => (
            <h3 className="text-lg font-bold font-mono text-slate-800 dark:text-zinc-100 pt-2 pb-1 text-rose-600 dark:text-rose-400">
              {children}
            </h3>
          ),
          // Custom Paragraph
          p: ({ children }) => (
            <p className="text-sm sm:text-base leading-relaxed my-2 text-slate-700 dark:text-zinc-300">
              {children}
            </p>
          ),
          // Custom Blockquotes with Callout Detection ([!FLIXHQ], [!CINEJOY], [!NOTE], [!WARNING], [!TIP])
          blockquote: ({ children }) => {
            // Extract text from children to check for callout identifiers
            const rawChildrenText = React.Children.toArray(children)
              .map((c: any) => (typeof c === 'string' ? c : c?.props?.children))
              .flat()
              .join('');

            if (rawChildrenText.includes('[!FLIXHQ]')) {
              return (
                <div className="my-4 p-4 rounded-2xl bg-rose-950/20 dark:bg-rose-950/40 border-2 border-rose-500/60 text-rose-950 dark:text-rose-100 shadow-md">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold font-mono text-sm mb-1.5">
                    <Tv className="w-5 h-5 text-rose-500 animate-pulse" />
                    <span>FlixHQ Top Priority Streamer</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-zinc-200">
                    {children}
                  </div>
                </div>
              );
            }

            if (rawChildrenText.includes('[!CINEJOY]')) {
              return (
                <div className="my-4 p-4 rounded-2xl bg-amber-950/20 dark:bg-amber-950/40 border-2 border-amber-500/60 text-amber-950 dark:text-amber-100 shadow-md">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold font-mono text-sm mb-1.5">
                    <Film className="w-5 h-5 text-amber-500" />
                    <span>CineJoy Cinema Portal</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-zinc-200">
                    {children}
                  </div>
                </div>
              );
            }

            if (rawChildrenText.includes('[!WARNING]')) {
              return (
                <div className="my-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 text-amber-900 dark:text-amber-200">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold font-mono text-sm mb-1">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Important Security Alert</span>
                  </div>
                  <div className="text-xs sm:text-sm">{children}</div>
                </div>
              );
            }

            if (rawChildrenText.includes('[!TIP]')) {
              return (
                <div className="my-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-emerald-500 text-emerald-900 dark:text-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm mb-1">
                    <Lightbulb className="w-4 h-4 shrink-0" />
                    <span>Pro Tip</span>
                  </div>
                  <div className="text-xs sm:text-sm">{children}</div>
                </div>
              );
            }

            return (
              <blockquote className="my-4 p-4 rounded-2xl bg-slate-100 dark:bg-zinc-900/80 border-l-4 border-slate-400 dark:border-zinc-700 italic text-slate-700 dark:text-zinc-300 text-sm">
                {children}
              </blockquote>
            );
          },
          // Custom Tables
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900">
              <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-100/80 dark:bg-zinc-800/80 border-b border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white font-mono uppercase text-xs">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="p-3 font-bold tracking-wider">{children}</th>
          ),
          td: ({ children }) => (
            <td className="p-3 border-b border-slate-100 dark:border-zinc-800/60 text-slate-700 dark:text-zinc-300">
              {children}
            </td>
          ),
          // Custom Links
          a: ({ href, children }) => {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400 hover:text-rose-500 hover:underline transition-colors font-mono"
              >
                <span>{children}</span>
                {isExternal && <ExternalLink className="w-3 h-3 shrink-0" />}
              </a>
            );
          },
          // Custom Lists
          ul: ({ children }) => (
            <ul className="my-3 space-y-2 list-disc list-inside text-sm text-slate-700 dark:text-zinc-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 space-y-2 list-decimal list-inside text-sm text-slate-700 dark:text-zinc-300">
              {children}
            </ol>
          ),
          // Custom Code Blocks & Inline Code
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            const randomId = Math.random().toString(36).substring(2, 9);

            if (match) {
              return (
                <div className="relative my-4 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden text-zinc-200 font-mono text-xs">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-zinc-400 text-[11px]">
                    <span className="uppercase">{match[1]}</span>
                    <button
                      onClick={() => handleCopyCode(codeString, randomId)}
                      className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedCodeId === randomId ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code>{codeString}</code>
                  </pre>
                </div>
              );
            }

            return (
              <code
                className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-rose-600 dark:text-rose-400 font-mono text-xs font-semibold"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
