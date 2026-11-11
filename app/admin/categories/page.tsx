'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderTree,
  Plus,
  Trash2,
  Layers,
  FileText,
  RefreshCw,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  GitPullRequest,
  Check,
  X,
  Code
} from 'lucide-react';
import Link from 'next/link';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

interface SubCategoryItem {
  id: string;
  name: string;
  description?: string;
  items?: any[];
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  description: string;
  githubFile?: string;
  subcategories: SubCategoryItem[];
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [markdownFiles, setMarkdownFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('streaming.md');
  const [fileContent, setFileContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'categories' | 'markdown'>('categories');

  const [loading, setLoading] = useState(true);
  const [savingFile, setSavingFile] = useState(false);
  const [syncingAll, setSyncingAll] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // New Category Modal
  const [newCatModal, setNewCatModal] = useState(false);
  const [newCatData, setNewCatData] = useState({ name: '', slug: '', description: '', iconName: 'Layers' });

  // New Subcategory Modal
  const [newSubModal, setNewSubModal] = useState(false);
  const [targetCatId, setTargetCatId] = useState<string>('');
  const [newSubData, setNewSubData] = useState({ name: '', description: '' });

  // Confirm delete dialog
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    type: 'category' | 'subcategory';
    categoryId: string;
    subcategoryId?: string;
    title: string;
  }>({
    isOpen: false,
    type: 'category',
    categoryId: '',
    title: '',
  });

  const loadCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const loadMarkdownFiles = async () => {
    try {
      const res = await fetch('/api/admin/markdown');
      if (res.ok) {
        const data = await res.json();
        setMarkdownFiles(data.files || []);
        if (data.files && data.files.length > 0 && !selectedFile) {
          setSelectedFile(data.files[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load markdown files:', err);
    }
  };

  const loadFileContent = async (file: string) => {
    try {
      const res = await fetch(`/api/admin/markdown?file=${file}`);
      if (res.ok) {
        const data = await res.json();
        setFileContent(data.content || '');
      }
    } catch (err) {
      console.error('Failed to load file content:', err);
    }
  };

  useEffect(() => {
    Promise.all([loadCategories(), loadMarkdownFiles()]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedFile) {
      loadFileContent(selectedFile);
    }
  }, [selectedFile]);

  // Handle Save Category
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_category',
          category: newCatData,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ message: data.message, type: 'success' });
        setNewCatModal(false);
        setNewCatData({ name: '', slug: '', description: '', iconName: 'Layers' });
        loadCategories();
      } else {
        setFeedback({ message: data.error || 'Failed to create category', type: 'error' });
      }
    } catch (err: any) {
      setFeedback({ message: err.message, type: 'error' });
    }
  };

  // Handle Add Subcategory
  const handleCreateSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_subcategory',
          categoryId: targetCatId,
          subcategory: newSubData,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ message: data.message, type: 'success' });
        setNewSubModal(false);
        setNewSubData({ name: '', description: '' });
        loadCategories();
      } else {
        setFeedback({ message: data.error || 'Failed to add subcategory', type: 'error' });
      }
    } catch (err: any) {
      setFeedback({ message: err.message, type: 'error' });
    }
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = async () => {
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: deleteDialog.type === 'category' ? 'delete_category' : 'delete_subcategory',
          categoryId: deleteDialog.categoryId,
          subcategoryId: deleteDialog.subcategoryId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ message: data.message, type: 'success' });
        loadCategories();
      } else {
        setFeedback({ message: data.error || 'Failed to delete', type: 'error' });
      }
    } catch (err: any) {
      setFeedback({ message: err.message, type: 'error' });
    } finally {
      setDeleteDialog((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // Save Markdown file content
  const handleSaveMarkdown = async () => {
    setSavingFile(true);
    try {
      const res = await fetch('/api/admin/markdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_file',
          file: selectedFile,
          content: fileContent,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ message: data.message, type: 'success' });
        loadCategories();
      } else {
        setFeedback({ message: data.error || 'Failed to save markdown', type: 'error' });
      }
    } catch (err: any) {
      setFeedback({ message: err.message, type: 'error' });
    } finally {
      setSavingFile(false);
    }
  };

  // Trigger Full Markdown -> DB Sync
  const handleSyncAll = async () => {
    setSyncingAll(true);
    try {
      const res = await fetch('/api/admin/markdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync_all' }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ message: data.message, type: 'success' });
        loadCategories();
      } else {
        setFeedback({ message: data.error || 'Sync failed', type: 'error' });
      }
    } catch (err: any) {
      setFeedback({ message: err.message, type: 'error' });
    } finally {
      setSyncingAll(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Categories &amp; Markdown Sync</h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Manage categories, subcategories, and synchronize repository markdown files for users submitting via GitHub Pull Requests.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSyncAll}
            disabled={syncingAll}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-md shadow-emerald-600/20 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncingAll ? 'animate-spin' : ''}`} />
            <span>{syncingAll ? 'Syncing...' : 'Sync All Markdown ➔ DB'}</span>
          </button>

          <button
            onClick={() => setNewCatModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl text-xs flex items-center justify-between gap-3 shadow-lg ${
            feedback.type === 'success'
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80'
              : 'bg-rose-950/80 text-rose-300 border border-rose-800/80'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="font-semibold">{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-xs opacity-75 hover:opacity-100 underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'categories'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Category &amp; Subcategory Tree ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('markdown')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'markdown'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Live Markdown Sync Editor ({markdownFiles.length} files)</span>
        </button>
      </div>

      {/* TAB 1: Categories Tree */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          {loading ? (
            <div className="py-16 text-center text-slate-400 text-sm bg-slate-900/60 rounded-2xl border border-slate-800">
              <div className="w-7 h-7 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Loading category hierarchy...
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">{cat.name}</h3>
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            /{cat.slug}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            {cat.subcategories?.length || 0} subcategories
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link
                        href={`/category/${cat.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <span>View Page</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <button
                        onClick={() => {
                          setTargetCatId(cat.id);
                          setNewSubModal(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Subcategory</span>
                      </button>

                      <button
                        onClick={() =>
                          setDeleteDialog({
                            isOpen: true,
                            type: 'category',
                            categoryId: cat.id,
                            title: cat.name,
                          })
                        }
                        className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Subcategories list */}
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <div className="pt-3 border-t border-slate-800/80">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                        Subcategories
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {cat.subcategories.map((sub) => (
                          <div
                            key={sub.id}
                            className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="min-w-0">
                              <span className="font-semibold text-slate-200 block truncate">{sub.name}</span>
                              <span className="text-[10px] font-mono text-slate-500 block truncate">{sub.id}</span>
                            </div>
                            <button
                              onClick={() =>
                                setDeleteDialog({
                                  isOpen: true,
                                  type: 'subcategory',
                                  categoryId: cat.id,
                                  subcategoryId: sub.id,
                                  title: sub.name,
                                })
                              }
                              className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer shrink-0"
                              title="Delete subcategory"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Live Markdown Sync Editor */}
      {activeTab === 'markdown' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Select Markdown Document:</span>
              <select
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer font-mono"
              >
                {markdownFiles.map((file) => (
                  <option key={file} value={file}>
                    data/{file}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => loadFileContent(selectedFile)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload</span>
              </button>

              <button
                onClick={handleSaveMarkdown}
                disabled={savingFile}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-amber-500/20 disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingFile ? 'Saving & Syncing...' : 'Save & Sync to DB'}</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-amber-500" />
                <span>Editing: data/{selectedFile}</span>
              </div>
              <span>Changes automatically re-parse and sync into the database on save</span>
            </div>

            <textarea
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              rows={24}
              className="w-full p-4 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-y"
              placeholder="Markdown content..."
            />
          </div>
        </div>
      )}

      {/* Modal: Add Category */}
      {newCatModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Create New Category</h3>
              <button onClick={() => setNewCatModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design Assets, Audio Tools"
                  value={newCatData.name}
                  onChange={(e) => setNewCatData({ ...newCatData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Slug / ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. design-assets (leave empty to auto-generate)"
                  value={newCatData.slug}
                  onChange={(e) => setNewCatData({ ...newCatData, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief description of resources indexed in this category..."
                  value={newCatData.description}
                  onChange={(e) => setNewCatData({ ...newCatData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setNewCatModal(false)}
                  className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Subcategory */}
      {newSubModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Add Subcategory</h3>
              <button onClick={() => setNewSubModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubcategory} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Subcategory Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Browser Extensions, Cloud Storage"
                  value={newSubData.name}
                  onChange={(e) => setNewSubData({ ...newSubData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Brief summary..."
                  value={newSubData.description}
                  onChange={(e) => setNewSubData({ ...newSubData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setNewSubModal(false)}
                  className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Add Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styled Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmDelete}
        title={`Delete ${deleteDialog.type === 'category' ? 'Category' : 'Subcategory'}`}
        description={`Are you sure you want to remove "${deleteDialog.title}"?`}
        itemTitle={deleteDialog.title}
        confirmText="Confirm Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
