import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Flame,
  BookOpen,
  Search,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { StoryCard } from '../components/StoryCard';
import { CATEGORIES } from '../data/initialData';
import { StoryCategory } from '../types';

interface StoriesCatalogPageProps {
  mode: 'latest' | 'popular' | 'all';
}

export const StoriesCatalogPage: React.FC<StoriesCatalogPageProps> = ({ mode }) => {
  const { stories, navigateTo } = useStory();
  const [selectedCat, setSelectedCat] = useState<StoryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'rating' | 'title'>('latest');

  // Filter base stories by mode
  const baseStories = useMemo(() => {
    if (mode === 'latest') {
      return stories.filter(s => s.latest || true).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    if (mode === 'popular') {
      return stories.filter(s => s.popular || s.readsCount > 10).sort((a, b) => b.readsCount - a.readsCount);
    }
    return stories;
  }, [stories, mode]);

  // Apply filters and sorting
  const filteredStories = useMemo(() => {
    return baseStories
      .filter(s => {
        const matchesCategory = selectedCat === 'all' || s.category === selectedCat;
        const matchesSearch =
          searchQuery.trim() === '' ||
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.readsCount - a.readsCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'title') return a.title.localeCompare(b.title, 'bn');
        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [baseStories, selectedCat, searchQuery, sortBy]);

  const pageMeta = {
    latest: {
      badge: 'সদ্য প্রকাশিত',
      badgeIcon: Sparkles,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'নতুন প্রকাশিত গল্পসমূহ',
      subtitle: 'নিয়মিত প্রকাশিত সাম্প্রতিক সব মৌলিক গল্প, রোমাঞ্চ ও উপন্যাসের সংগ্রহ।',
    },
    popular: {
      badge: 'সর্বাধিক পঠিত',
      badgeIcon: Flame,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'জনপ্রিয় পাঠকপ্রিয় গল্প',
      subtitle: 'পাঠকদের ভালোবাসা ও প্রশংসায় শীর্ষে থাকা সেরা বাংলা সাহিত্য সম্ভার।',
    },
    all: {
      badge: 'সমগ্র তালিকা',
      badgeIcon: BookOpen,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'সব গল্প ও উপন্যাস সম্ভার',
      subtitle: 'NovellaX NBS-এর সম্পূর্ণ আর্কাইভ থেকে বেছে নিন আপনার পছন্দের গল্প।',
    },
  }[mode];

  const BadgeIcon = pageMeta.badgeIcon;

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[70vh]">
      {/* Top Breadcrumb & Back Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোমপেজে ফিরুন</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>হোম</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-medium">{pageMeta.title}</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/40 rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${pageMeta.badgeColor}`}>
            <BadgeIcon className="w-3.5 h-3.5" />
            <span>{pageMeta.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
            {pageMeta.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
            {pageMeta.subtitle}
          </p>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute right-4 -bottom-6 text-slate-200/40 select-none pointer-events-none hidden sm:block">
          <BadgeIcon className="w-48 h-48" />
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search box */}
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="গল্পের শিরোনাম, লেখক বা বিষয় লিখে খুঁজুন..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                মুছুন
              </button>
            )}
          </div>

          {/* Sort By selector */}
          <div className="sm:col-span-4 flex items-center justify-end gap-2">
            <span className="text-xs text-slate-500 hidden lg:inline flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              <span>সাজান:</span>
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="latest">নতুন প্রকাশিত</option>
              <option value="popular">সর্বাধিক পঠিত</option>
              <option value="rating">রেটিং অনুযায়ী</option>
              <option value="title">শিরোনাম (বর্ণানুক্রমিক)</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
              selectedCat === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            সব ক্যাটাগরি ({baseStories.length})
          </button>

          {CATEGORIES.map(cat => {
            const count = baseStories.filter(s => s.category === cat.name).length;
            if (count === 0) return null;
            const isSelected = selectedCat === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.name as StoryCategory)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              মোট <strong>{filteredStories.length}</strong> টি গল্প প্রদর্শিত হচ্ছে
            </span>
            {selectedCat !== 'all' && (
              <button
                onClick={() => setSelectedCat('all')}
                className="text-blue-600 hover:underline"
              >
                ফিল্টার মুছুন
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">কোনো গল্প পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            আপনার অনুসন্ধান বা নির্বাচিত ক্যাটাগরিতে কোনো গল্প নেই। অন্য কোনো শব্দ বা ফিল্টার চেষ্টা করুন।
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCat('all');
            }}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
          >
            সব গল্প দেখুন
          </button>
        </div>
      )}
    </div>
  );
};
