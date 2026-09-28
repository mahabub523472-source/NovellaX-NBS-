import React, { useState, useEffect } from 'react';
import { Search, Menu, Bookmark, BookOpen, ShieldCheck } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Header: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    setIsSearchOpen,
    setIsMenuOpen,
    bookmarkedStoryIds,
    isAdminLoggedIn,
  } = useStory();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          aria-label="NovellaX NBS Home"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 font-serif block leading-none">
              NovellaX NBS
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
          <button
            onClick={() => navigateTo('home')}
            className={`cursor-pointer transition-colors hover:text-blue-600 ${
              currentPage === 'home' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('categories')}
            className={`cursor-pointer transition-colors hover:text-blue-600 ${
              currentPage === 'categories' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => navigateTo('latest')}
            className={`cursor-pointer transition-colors hover:text-blue-600 ${
              currentPage === 'latest' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Latest Stories
          </button>
          <button
            onClick={() => navigateTo('popular')}
            className={`cursor-pointer transition-colors hover:text-blue-600 ${
              currentPage === 'popular' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => navigateTo('writer')}
            className={`cursor-pointer transition-colors hover:text-blue-600 ${
              currentPage === 'writer' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            লেখক পরিচিতি
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Bookmarks, Menu) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Bookmarks Quick Access */}
          <button
            onClick={() => navigateTo('bookmarks')}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors relative cursor-pointer"
            aria-label="Bookmarks"
            title="পছন্দের গল্পসমূহ"
          >
            <Bookmark className="w-5 h-5" />
            {bookmarkedStoryIds.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            aria-label="Search stories"
            title="গল্প খুঁজুন"
          >
            <Search className="w-5 h-5" />
            <span className="hidden lg:inline text-xs text-gray-500 font-medium ml-1">খুঁজুন</span>
          </button>

          {/* Admin Indicator if Logged In */}
          {isAdminLoggedIn && (
            <button
              onClick={() => navigateTo('admin')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          )}

          {/* Menu Drawer Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
            <span className="hidden sm:inline text-xs font-semibold text-gray-700">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
