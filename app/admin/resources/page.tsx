'use client';

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  X,
  Code2,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { useSocket } from '@/hooks/useSocket';

interface ResourceItem {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  safetyRating: string;
  badge?: string | null;
  score: number;
  upvotesCount: number;
  downvotesCount: number;
  isStarred: boolean;
  isOpenSource: boolean;
  isNoAds: boolean;
  isNoReg: boolean;
  createdAt: string;
}

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: 'adblocking',
    subcategory: 'Extensions',
    safetyRating: 'Safe',
    isStarred: false,
    isOpenSource: false,
  });

  const { socket } = useSocket();

  const fetchResources = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (selectedCategory !== 'all') queryParams.set('category', selectedCategory);
      if (search.trim()) queryParams.set('search', search.trim());

      const res = await fetch(`/api/admin/resources?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setResources(data.resources || []);
      }
    } catch (err) {
      console.error('Failed to fetch resources:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [selectedCategory, search]);

  // Real-time updates via Socket.IO
  useEffect(() => {
    if (!socket) return;

    const handleVote = (payload: { resourceId: string; score: number; upvotesCount: number; downvotesCount: number }) => {
      setResources((prev) =>
        prev
          .map((r) =>
            r.id === payload.resourceId
              ? {
                  ...r,
                  score: payload.score ?? r.score,
                  upvotesCount: payload.upvotesCount ?? r.upvotesCount,
                  downvotesCount: payload.downvotesCount ?? r.downvotesCount,
                }
              : r
          )
          .sort((a, b) => {
            if (a.isStarred && !b.isStarred) return -1;
            if (!a.isStarred && b.isStarred) return 1;
            return b.score - a.score;
          })
      );
    };

    const handleResourceChanged = () => fetchResources();

    socket.on('vote_updated', handleVote);
    socket.on('resource_created', handleResourceChanged);
    socket.on('resource_updated', handleResourceChanged);
    socket.on('resource_deleted', handleResourceChanged);

    return () => {
      socket.off('vote_updated', handleVote);
      socket.off('resource_created', handleResourceChanged);
      socket.off('resource_updated', handleResourceChanged);
      socket.off('resource_deleted', handleResourceChanged);
    };
  }, [socket]);

  const handleOpenCreate = () => {
    setEditingResource(null);
    setFormData({
      title: '',
      url: '',
      description: '',
      category: 'adblocking',
      subcategory: 'Extensions',
      safetyRating: 'Safe',
      isStarred: false,
      isOpenSource: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (res: ResourceItem) => {
    setEditingResource(res);
    setFormData({
      title: res.title,
      url: res.url,
      description: res.description,
      category: res.category,
      subcategory: res.subcategory,
      safetyRating: res.safetyRating || 'Safe',
      isStarred: res.isStarred,
      isOpenSource: res.isOpenSource,
    });
    setIsModalOpen(true);
  };

  const handleToggleStar = async (item: ResourceItem) => {
    const nextStarred = !item.isStarred;
    setResources((prev) =>
      prev
        .map((r) => (r.id === item.id ? { ...r, isStarred: nextStarred } : r))
        .sort((a, b) => {
          const aStar = a.id === item.id ? nextStarred : a.isStarred;
          const bStar = b.id === item.id ? nextStarred : b.isStarred;
          if (aStar && !bStar) return -1;
          if (!aStar && bStar) return 1;
          return b.score - a.score;
        })
    );

    try {
      await fetch(`/api/admin/resources/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isStarred: nextStarred }),
      });
    } catch (err) {
      console.error('Failed to toggle star:', err);
      fetchResources();
    }
  };

  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingResource) {
        // Update
        const res = await fetch(`/api/admin/resources/${editingResource.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchResources();
        }
      } else {
        // Create
        const res = await fetch('/api/admin/resources', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchResources();
        }
      }
    } catch (err) {
      console.error('Error saving resource:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteResource = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/resources/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setResources((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error('Error deleting resource:', err);
    }
  };

  const categories = Array.from(new Set(resources.map((r) => r.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">Dynamic Resource Directory</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Dynamic community ranking determined live by public votes (<span className="text-emerald-400 font-mono">score = upvotes - downvotes</span>). Star priority resources to pin them on top.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Resource</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Categories ({resources.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap capitalize ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:max-w-xs sm:ml-auto">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search resources by title or URL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Ranked Resources Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            <div className="w-7 h-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading dynamic ranking...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 w-16 text-center">Rank</th>
                  <th className="py-3 px-4">Resource</th>
                  <th className="py-3 px-4">Category / Section</th>
                  <th className="py-3 px-4 text-center">Dynamic Score</th>
                  <th className="py-3 px-4 text-center">Votes Breakdown</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {resources.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No resources found.
                    </td>
                  </tr>
                ) : (
                  resources.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                      {/* Dynamic Rank */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`font-mono font-bold text-xs px-2 py-0.5 rounded-lg ${
                            item.isStarred
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : index === 0
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : index === 1
                              ? 'bg-slate-300/20 text-slate-200 border border-slate-400/30'
                              : index === 2
                              ? 'bg-amber-800/20 text-amber-500 border border-amber-800/30'
                              : 'text-slate-500'
                          }`}
                        >
                          {item.isStarred ? '⭐' : `#${index + 1}`}
                        </span>
                      </td>

                      {/* Title & Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-100">{item.title}</span>
                          {item.isStarred && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>Priority</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate max-w-sm mt-0.5">
                          {item.description}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium text-[11px]">
                          {item.category}
                        </span>
                        <span className="text-slate-500 block text-[10px] mt-0.5 font-mono">
                          {item.subcategory}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`font-mono text-sm font-bold ${
                            item.score > 0
                              ? 'text-emerald-400'
                              : item.score < 0
                              ? 'text-rose-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {item.score > 0 ? `+${item.score}` : item.score}
                        </span>
                      </td>

                      {/* Votes Breakdown */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-mono text-[11px] text-emerald-400">
                          {item.upvotesCount}▲
                        </span>
                        <span className="text-slate-600 mx-1">/</span>
                        <span className="font-mono text-[11px] text-rose-400">
                          {item.downvotesCount}▼
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* 1-Click Priority Star Toggle */}
                          <button
                            onClick={() => handleToggleStar(item)}
                            title={item.isStarred ? 'Remove Priority Star' : 'Star as Priority Resource'}
                            className={`p-1.5 rounded-lg transition-colors ${
                              item.isStarred
                                ? 'text-amber-300 bg-amber-500/20 hover:bg-amber-500/30'
                                : 'text-slate-500 hover:text-amber-400 hover:bg-slate-800'
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${item.isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                          </button>

                          <Link
                            href={`/resource/${item.id}`}
                            target="_blank"
                            title="View Public Page"
                            className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            title="Edit Resource"
                            className="p-1.5 text-slate-400 hover:text-indigo-300 hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteResource(item.id, item.title)}
                            title="Delete Resource"
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingResource ? `Edit: ${editingResource.title}` : 'Add New Resource'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveResource} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target URL</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subcategory</label>
                  <input
                    type="text"
                    required
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 py-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isStarred}
                    onChange={(e) => setFormData({ ...formData, isStarred: e.target.checked })}
                    className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Priority Resource (Staff Pick)</span>
                  </span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isOpenSource}
                    onChange={(e) => setFormData({ ...formData, isOpenSource: e.target.checked })}
                    className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Open Source (FOSS)</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingResource ? 'Update Resource' : 'Create Resource'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
