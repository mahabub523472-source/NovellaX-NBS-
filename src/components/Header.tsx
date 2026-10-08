import React, { useState, useEffect } from 'react';
import {
  Search,
  Menu,
  Bookmark,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Compass,
  Feather,
  TrendingUp,
  Flame,
  Layers,
  Phone,
  User,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    setIsSearchOpen,
    setIsMenuOpen,
    bookmarkedStoryIds,
    isAdminLoggedIn,
    currentUser,
    setIsAuthModalOpen,
  } = useStory();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener for Command+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  const navItems = [
    { id: 'home', label: 'হোম', subLabel: 'Home', icon: BookOpen },
    { id: 'categories', label: 'ক্যাটাগরি', subLabel: 'Genres', icon: Layers },
    { id: 'latest', label: 'নতুন গল্প', subLabel: 'Latest', icon: Sparkles },
    { id: 'popular', label: 'জনপ্রিয়', subLabel: 'Popular', icon: Flame },
    { id: 'writer', label: 'লেখক পরিচিতি', subLabel: 'Author', icon: Feather },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 1. Top Luxury Utility Micro-Bar */}
      <div className="bg-slate-900 text-slate-300 border-b border-slate-800/80 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-blue-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>বাংলা সাহিত্যের প্রিমিয়াম ডিজিটাল প্ল্যাটফর্ম</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-serif">
              "গল্পের পাতায়, অনুভূতির ছোঁয়ায়" — NovellaX NBS
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => navigateTo('rules')}
              className="hover:text-blue-300 transition-colors cursor-pointer"
            >
              নীতিমালা
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => navigateTo('contact')}
              className="hover:text-blue-300 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-blue-400" />
              <span>যোগাযোগ</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Glassmorphic Header */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-blue-950/5 border-b border-slate-200/80 py-2 sm:py-2.5'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center text-left cursor-pointer focus:outline-hidden group"
            aria-label="NovellaX NBS Home"
          >
            <BrandLogo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map(item => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id as any)}
                  className={`group relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/90 shadow-xs shadow-blue-500/5'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'
                    }`}
                  />
                  <span>{item.label}</span>

                  {/* Active Indicator Underline Bar */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Pill Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100/90 text-slate-600 hover:text-slate-900 rounded-xl border border-slate-200/80 transition-all duration-200 cursor-pointer text-xs group shadow-2xs"
              aria-label="গল্প অনুসন্ধান করুন"
              title="গল্প অনুসন্ধান (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="hidden sm:inline font-medium text-slate-500 group-hover:text-slate-700">
                গল্প খুঁজুন...
              </span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white border border-slate-200 rounded text-slate-400 group-hover:text-slate-600 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Bookmarks Quick Link */}
            <button
              onClick={() => navigateTo('bookmarks')}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border transition-all duration-200 relative cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                currentPage === 'bookmarks'
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700 hover:text-blue-600'
              }`}
              aria-label="বুকমার্ক ও সংরক্ষিত গল্পসমূহ"
              title="সংরক্ষিত গল্প"
            >
              <Bookmark className="w-4 h-4 text-blue-600" />
              <span className="hidden md:inline">সংরক্ষিত</span>
              {bookmarkedStoryIds.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[10px] font-bold text-white bg-blue-600 rounded-full shadow-xs">
                  {bookmarkedStoryIds.length}
                </span>
              )}
            </button>

            {/* Reader Account Button */}
            {currentUser ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 sm:py-1.5 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/80 transition-all cursor-pointer shadow-2xs text-xs group"
                title={`${currentUser.name} - প্রোফাইল ও অ্যাকাউন্ট`}
              >
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1.5 ring-blue-500 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="font-bold text-slate-900 line-clamp-1 max-w-[85px] font-serif">
                    {currentUser.name}
                  </span>
                  <span className="text-[9px] text-blue-600 font-medium">পাঠক প্রোফাইল</span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 rounded-xl border border-blue-200/80 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                title="পাঠক অ্যাকাউন্ট খুলুন"
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">অ্যাকাউন্ট</span>
              </button>
            )}

            {/* Primary Action CTA: Explore / Read Stories */}
            <button
              onClick={() => navigateTo('latest')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>গল্পসমগ্র</span>
            </button>

            {/* Mobile Menu Drawer Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 sm:px-2.5 sm:py-2 text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200/70 transition-all cursor-pointer flex items-center gap-1"
              aria-label="মেনু খুলুন"
            >
              <Menu className="w-5 h-5 text-slate-800" />
              <span className="hidden sm:inline text-xs font-bold text-slate-700">মেনু</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
