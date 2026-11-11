'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  MessageSquare,
  Vote,
  Database,
  ExternalLink,
  LogOut,
  Radio,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Layers,
  FolderTree,
  Settings,
} from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';

interface AdminUser {
  username: string;
  email: string;
  role: string;
}

interface AdminNavMetrics {
  pendingSubmissionsCount: number;
  totalResources: number;
  totalComments: number;
  totalVotes: number;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { socket, isConnected } = useSocket();

  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [metrics, setMetrics] = useState<AdminNavMetrics>({
    pendingSubmissionsCount: 0,
    totalResources: 0,
    totalComments: 0,
    totalVotes: 0,
  });

  const isLoginPage = pathname === '/admin/login';

  // Restore collapsed state preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCollapsed = localStorage.getItem('admin_sidebar_collapsed');
      if (savedCollapsed === 'true') {
        setIsCollapsed(true);
      }
    }
  }, []);

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_sidebar_collapsed', String(next));
      }
      return next;
    });
  };

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileDrawerOpen]);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileDrawerOpen]);

  // Fetch admin session and initial badge metrics
  const fetchNavMetrics = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        if (data?.metrics) {
          setMetrics({
            pendingSubmissionsCount: data.metrics.pendingSubmissionsCount ?? 0,
            totalResources: data.metrics.totalResources ?? 0,
            totalComments: data.metrics.totalComments ?? 0,
            totalVotes: data.metrics.totalVotes ?? 0,
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
          fetchNavMetrics();
        } else {
          router.push('/admin/login');
        }
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router, fetchNavMetrics]);

  // Realtime updates for drawer badges
  useEffect(() => {
    if (!socket) return;

    const handleSubmissionEvent = () => {
      fetchNavMetrics();
    };

    const handleCommentEvent = () => {
      fetchNavMetrics();
    };

    const handleVoteEvent = () => {
      fetchNavMetrics();
    };

    const handleResourceEvent = () => {
      fetchNavMetrics();
    };

    socket.on('new_submission', handleSubmissionEvent);
    socket.on('submission_approved', handleSubmissionEvent);
    socket.on('submission_rejected', handleSubmissionEvent);
    socket.on('new_comment', handleCommentEvent);
    socket.on('comment_deleted', handleCommentEvent);
    socket.on('vote_updated', handleVoteEvent);
    socket.on('resource_created', handleResourceEvent);
    socket.on('resource_deleted', handleResourceEvent);

    return () => {
      socket.off('new_submission', handleSubmissionEvent);
      socket.off('submission_approved', handleSubmissionEvent);
      socket.off('submission_rejected', handleSubmissionEvent);
      socket.off('new_comment', handleCommentEvent);
      socket.off('comment_deleted', handleCommentEvent);
      socket.off('vote_updated', handleVoteEvent);
      socket.off('resource_created', handleResourceEvent);
      socket.off('resource_deleted', handleResourceEvent);
    };
  }, [socket, fetchNavMetrics]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-indigo-500/20" />
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Verifying Admin Credentials...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: 'Submissions Queue',
      href: '/admin/submissions',
      icon: Inbox,
      badge: metrics.pendingSubmissionsCount > 0 ? {
        text: String(metrics.pendingSubmissionsCount),
        type: 'warning',
      } : null,
    },
    {
      label: 'Categories & Markdown',
      href: '/admin/categories',
      icon: FolderTree,
      badge: null,
    },
    {
      label: 'Dynamic Resources',
      href: '/admin/resources',
      icon: Database,
      badge: metrics.totalResources > 0 ? {
        text: String(metrics.totalResources),
        type: 'neutral',
      } : null,
    },
    {
      label: 'Comments & Notes',
      href: '/admin/comments',
      icon: MessageSquare,
      badge: metrics.totalComments > 0 ? {
        text: String(metrics.totalComments),
        type: 'neutral',
      } : null,
    },
    {
      label: 'IP Votes & Ranking',
      href: '/admin/votes',
      icon: Vote,
      badge: metrics.totalVotes > 0 ? {
        text: String(metrics.totalVotes),
        type: 'neutral',
      } : null,
    },
    {
      label: 'Security & Settings',
      href: '/admin/settings',
      icon: ShieldCheck,
      badge: null,
    },
  ];

  const renderNavLinks = (isDrawerMobile: boolean = false) => {
    return (
      <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => isDrawerMobile && setMobileDrawerOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
              title={isCollapsed && !isDrawerMobile ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />

              {(!isCollapsed || isDrawerMobile) && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-tight shrink-0 ${
                        item.badge.type === 'warning'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {item.badge.text}
                    </span>
                  )}
                </div>
              )}

              {/* Tooltip for collapsed desktop bar */}
              {isCollapsed && !isDrawerMobile && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                  {item.badge && ` (${item.badge.text})`}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Open Navigation Drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-amber-500 flex items-center justify-center font-black text-slate-950 text-sm shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              F
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                freebies
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  ADMIN
                </span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Master Directory Console</span>
            </div>
          </Link>
        </div>

        {/* Status Indicators & Right CTAs */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Real-time Socket status indicator */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border ${
              isConnected
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80'
                : 'bg-amber-950/60 text-amber-300 border-amber-800/80'
            }`}
            title={isConnected ? 'Live Socket.IO Stream Active' : 'Connecting to real-time events...'}
          >
            <Radio className={`w-3 h-3 ${isConnected ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
            <span>{isConnected ? 'LIVE SYNC' : 'RECONNECTING'}</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-800/60 transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* User profile dropdown / settings / logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-800/70 text-slate-300 hover:text-white transition-colors"
              title="Security &amp; Password Settings"
            >
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-200">
                {user?.username ? user.username[0].toUpperCase() : 'A'}
              </div>
              <span className="hidden lg:inline text-xs font-medium">
                {user?.username || 'Admin'}
              </span>
              <Settings className="w-3.5 h-3.5 text-slate-400 hover:text-slate-200" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Administrative Layout Frame */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Collapsible Navigation Sidebar */}
        <aside
          className={`hidden md:flex flex-col border-r border-slate-800 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 ${
            isCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          {/* Top Collapse Toggle Button */}
          <div className="p-3 border-b border-slate-800/80 flex items-center justify-between">
            {!isCollapsed && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 pl-2">
                Navigation
              </span>
            )}
            <button
              type="button"
              onClick={toggleCollapsed}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ${
                isCollapsed ? 'mx-auto' : 'ml-auto'
              }`}
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Desktop Nav Links */}
          {renderNavLinks(false)}

          {/* Bottom Version / Security Badge */}
          {!isCollapsed && (
            <div className="p-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Freebies Engine</span>
                <span className="text-emerald-400 font-bold">v1.0.0</span>
              </div>
              <p className="text-[10px] text-slate-500">Security Hardened &bull; Bcrypt 12</p>
            </div>
          )}
        </aside>

        {/* Mobile Navigation Drawer Modal */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex animate-fade-in">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setMobileDrawerOpen(false)}
            />

            {/* Slide-out Drawer */}
            <div className="relative w-72 max-w-[85vw] bg-slate-900 border-r border-slate-800 flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
              {/* Drawer Header */}
              <div className="h-16 border-b border-slate-800 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                    F
                  </div>
                  <span className="font-bold text-sm text-white">Admin Navigation</span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close Navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer Links */}
              {renderNavLinks(true)}

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Logged in as <strong>{user?.username || 'admin'}</strong></span>
                <button
                  onClick={handleLogout}
                  className="text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
