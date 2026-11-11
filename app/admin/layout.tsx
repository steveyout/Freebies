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
      label: 'Dynamic Resources',
      href: '/admin/resources',
      icon: Database,
      badge: metrics.totalResources > 0 ? {
        text: String(metrics.totalResources),
        type: 'neutral',
      } : null,
    },
  ];

  const renderNavLinks = (isDrawerMobile: boolean = false) => {
    return (
      <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const showText = isDrawerMobile || !isCollapsed;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (isDrawerMobile) {
                  setMobileDrawerOpen(false);
                }
              }}
              title={isCollapsed && !isDrawerMobile ? item.label : undefined}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600/30 via-indigo-600/20 to-transparent text-white border-l-4 border-indigo-500 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-indigo-400' : 'text-slate-400'
                }`}
              />

              {showText && (
                <span className="truncate flex-1 tracking-wide">{item.label}</span>
              )}

              {/* Badge */}
              {item.badge && showText && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold shrink-0 ${
                    item.badge.type === 'warning'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-xs'
                      : 'bg-slate-800 text-slate-300 border border-slate-700/60'
                  }`}
                >
                  {item.badge.text}
                </span>
              )}

              {/* Collapsed dot indicator when badge exists */}
              {!showText && item.badge && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900" />
              )}
            </Link>
          );
        })}

        {/* Public Site Link */}
        <div className="pt-3 mt-3 border-t border-slate-800/80">
          <Link
            href="/"
            target="_blank"
            className="group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
            title="Open Public Site in New Tab"
          >
            <span className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors shrink-0" />
              {(isDrawerMobile || !isCollapsed) && <span>Live Freebies Hub</span>}
            </span>
            {(isDrawerMobile || !isCollapsed) && (
              <span className="text-[10px] text-slate-500 font-mono">↗</span>
            )}
          </Link>
        </div>
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased">
      {/* Mobile Top App Bar */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open Navigation Drawer"
            className="p-2 -ml-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors focus:outline-none cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-indigo-600/30">
              F
            </div>
            <span className="font-bold text-white text-sm tracking-tight">Freebies Admin</span>
          </div>
        </div>

        {/* Realtime status pill in top bar */}
        <div className="flex items-center gap-2 font-mono text-[11px] bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-full">
          <Radio className={`w-3 h-3 ${isConnected ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
          <span className="text-slate-300">{isConnected ? 'Live' : 'Offline'}</span>
        </div>
      </header>

      {/* Mobile Slide-Over Backdrop Overlay */}
      {mobileDrawerOpen && (
        <div
          role="presentation"
          onClick={() => setMobileDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-xs transition-opacity duration-300 md:hidden animate-fade-in"
        />
      )}

      {/* Mobile Slide-Over Navigation Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-slate-900/98 border-r border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 ease-out md:hidden ${
          mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-black text-white text-sm shadow-md shadow-indigo-600/30">
              F
            </div>
            <div>
              <span className="font-bold text-white text-sm tracking-tight block">Freebies Portal</span>
              <span className="text-[10px] text-indigo-400 font-mono">v2.5 Next.js 15</span>
            </div>
          </div>
          <button
            onClick={() => setMobileDrawerOpen(false)}
            aria-label="Close Navigation Drawer"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Realtime Connection Status Card */}
        <div className="px-4 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className={`w-3.5 h-3.5 ${isConnected ? 'text-emerald-400 animate-pulse' : 'text-amber-500'}`} />
            <span className="text-xs text-slate-300 font-mono">
              {isConnected ? 'Socket.IO Realtime' : 'Reconnecting...'}
            </span>
          </div>
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 ring-4 ring-emerald-500/20' : 'bg-amber-500'}`} />
        </div>

        {/* Drawer Nav Items */}
        {renderNavLinks(true)}

        {/* Drawer Footer User Profile */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-indigo-900/80 border border-indigo-700/60 flex items-center justify-center font-bold text-xs text-indigo-300 shrink-0">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{user?.username}</p>
                <p className="text-[10px] text-indigo-400 uppercase tracking-wider font-semibold">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Desktop Persistent Collapsible Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-slate-900/95 border-r border-slate-800/80 flex-shrink-0 transition-all duration-300 ease-in-out relative ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Desktop Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-indigo-600/30 shrink-0">
              F
            </div>
            {!isCollapsed && (
              <div className="min-w-0 transition-opacity duration-200">
                <span className="font-bold text-white text-sm tracking-tight block truncate">Freebies Admin</span>
                <span className="text-[10px] text-indigo-400 font-mono block">Sequelize & MySQL Core</span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={toggleCollapsed}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors focus:outline-none cursor-pointer"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Realtime Status Indicator Card */}
        <div className="px-4 py-2.5 bg-slate-950/30 border-b border-slate-800/60 flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-2 min-w-0">
            <Radio className={`w-3.5 h-3.5 shrink-0 ${isConnected ? 'text-emerald-400 animate-pulse' : 'text-amber-500'}`} />
            {!isCollapsed && (
              <span className="text-[11px] text-slate-300 font-mono truncate">
                {isConnected ? 'Socket.IO Live' : 'Reconnecting...'}
              </span>
            )}
          </div>
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              isConnected ? 'bg-emerald-500 ring-4 ring-emerald-500/20' : 'bg-amber-500'
            }`}
          />
        </div>

        {/* Desktop Navigation Links */}
        {renderNavLinks(false)}

        {/* Desktop User Footer Card */}
        <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-indigo-900/80 border border-indigo-700/60 flex items-center justify-center font-bold text-xs text-indigo-300 shrink-0">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-200 truncate">{user?.username}</p>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider font-semibold font-mono">
                    {user?.role}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-slate-950 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
