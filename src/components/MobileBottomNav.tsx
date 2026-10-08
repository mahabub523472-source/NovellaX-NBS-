import React from 'react';
import { Home, BookOpen, Search, Bookmark, User } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export interface MobileNavItem {
  id: 'home' | 'stories' | 'search' | 'library' | 'profile';
  label: string;
  enLabel: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: readonly MobileNavItem[] = [
  {
    id: 'home',
    label: 'হোম',
    enLabel: 'Home',
    path: '/',
    icon: Home,
  },
  {
    id: 'stories',
    label: 'গল্প',
    enLabel: 'Stories',
    path: '/stories',
    icon: BookOpen,
  },
  {
    id: 'search',
    label: 'খুঁজুন',
    enLabel: 'Search',
    path: '/search',
    icon: Search,
  },
  {
    id: 'library',
    label: 'লাইব্রেরি',
    enLabel: 'Library',
    path: '/library',
    icon: Bookmark,
  },
  {
    id: 'profile',
    label: 'প্রোফাইল',
    enLabel: 'Profile',
    path: '/profile',
    icon: User,
  },
];

export const MobileBottomNav: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    isSearchOpen,
    setIsSearchOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    bookmarkedStoryIds,
    currentUser,
  } = useStory();

  // Compute active tab based on route / page / modal state
  const getActiveTabId = (): MobileNavItem['id'] => {
    if (isSearchOpen) return 'search';
    if (isAuthModalOpen) return 'profile';

    if (currentPage === 'home') return 'home';
    if (currentPage === 'bookmarks') return 'library';
    if (
      currentPage === 'latest' ||
      currentPage === 'popular' ||
      currentPage === 'categories' ||
      currentPage === 'story-detail'
    ) {
      return 'stories';
    }

    // URL path fallback
    const path = window.location.pathname.toLowerCase();
    if (path === '/stories') return 'stories';
    if (path === '/search') return 'search';
    if (path === '/library' || path === '/bookmarks') return 'library';
    if (path === '/profile') return 'profile';

    return 'home';
  };

  const activeTabId = getActiveTabId();
  const activeIndex = NAV_ITEMS.findIndex(item => item.id === activeTabId);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  const handleTabClick = (item: MobileNavItem) => {
    if (item.id === 'home') {
      setIsSearchOpen(false);
      setIsAuthModalOpen(false);
      navigateTo('home');
      try {
        window.history.pushState({ page: 'home' }, '', '/');
      } catch {
        // sandbox safe
      }
    } else if (item.id === 'stories') {
      setIsSearchOpen(false);
      setIsAuthModalOpen(false);
      navigateTo('latest');
      try {
        window.history.pushState({ page: 'stories' }, '', '/stories');
      } catch {
        // sandbox safe
      }
    } else if (item.id === 'search') {
      setIsAuthModalOpen(false);
      setIsSearchOpen(true);
      try {
        window.history.pushState({ page: 'search' }, '', '/search');
      } catch {
        // sandbox safe
      }
    } else if (item.id === 'library') {
      setIsSearchOpen(false);
      setIsAuthModalOpen(false);
      navigateTo('bookmarks');
      try {
        window.history.pushState({ page: 'library' }, '', '/library');
      } catch {
        // sandbox safe
      }
    } else if (item.id === 'profile') {
      setIsSearchOpen(false);
      setIsAuthModalOpen(true);
      try {
        window.history.pushState({ page: 'profile' }, '', '/profile');
      } catch {
        // sandbox safe
      }
    }
  };

  return (
    <>
      <style>{`
        .nav-spring-transition {
          transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 280ms ease,
                      box-shadow 360ms ease;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
        }
        .nav-icon-spring {
          transition: transform 360ms cubic-bezier(0.34, 1.45, 0.64, 1),
                      color 260ms cubic-bezier(0.2, 0.8, 0.2, 1),
                      filter 320ms ease;
          will-change: transform;
          backface-visibility: hidden;
        }
        .nav-label-spring {
          transition: transform 340ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 260ms ease,
                      font-weight 200ms ease;
          will-change: transform;
        }
      `}</style>

      {/* Floating Animated Mobile Navigation Bar */}
      <nav
        aria-label="মোবাইল বটম নেভিগেশন"
        className="fixed bottom-3 inset-x-3.5 sm:inset-x-6 max-w-md mx-auto z-40 md:hidden select-none pointer-events-auto"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl sm:rounded-3xl p-1.5 shadow-[0_12px_32px_-6px_rgba(13,110,253,0.14),0_4px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03]">
          {/* Sliding Soft Pill Highlight (Ultra Smooth Spring Glide) */}
          <div
            className="absolute top-1.5 bottom-1.5 nav-spring-transition pointer-events-none z-0"
            style={{
              left: '6px',
              width: 'calc((100% - 12px) / 5)',
              transform: `translate3d(${safeActiveIndex * 100}%, 0, 0)`,
            }}
          >
            <div className="w-full h-full rounded-xl sm:rounded-2xl bg-gradient-to-b from-blue-50/95 via-blue-50/80 to-blue-100/50 border border-[#0D6EFD]/25 shadow-[0_2px_14px_rgba(13,110,253,0.18)] flex items-center justify-center relative overflow-hidden transition-all duration-300">
              {/* Luminous soft ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0D6EFD]/10 via-[#0D6EFD]/4 to-transparent pointer-events-none" />
              {/* Micro top shine line */}
              <div className="absolute top-0 inset-x-2.5 h-[2px] bg-gradient-to-r from-transparent via-[#0D6EFD]/75 to-transparent rounded-full pointer-events-none" />
            </div>
          </div>

          {/* Navigation Item Buttons */}
          <div className="relative z-10 grid grid-cols-5 items-center">
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === activeTabId;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item)}
                  type="button"
                  className="group relative flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-xl cursor-pointer focus:outline-hidden active:scale-92 transition-transform duration-150"
                  aria-label={`${item.label} (${item.enLabel})`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Icon Container with Fluid Spring Response */}
                  <div
                    className={`relative flex items-center justify-center nav-icon-spring ${
                      isActive
                        ? 'scale-115 -translate-y-1 text-[#0D6EFD] drop-shadow-[0_3px_10px_rgba(13,110,253,0.4)]'
                        : 'text-slate-400 group-hover:text-slate-600 scale-100 translate-y-0'
                    }`}
                  >
                    {/* User profile avatar or default icon */}
                    {item.id === 'profile' && currentUser?.avatar ? (
                      <div className="relative">
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className={`w-5 h-5 rounded-full object-cover transition-all duration-300 ${
                            isActive
                              ? 'ring-2 ring-[#0D6EFD] shadow-xs'
                              : 'ring-1 ring-slate-300 opacity-80'
                          }`}
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                      </div>
                    ) : (
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    )}

                    {/* Library Bookmark Badge Count */}
                    {item.id === 'library' && bookmarkedStoryIds.length > 0 && (
                      <span
                        className={`absolute -top-1 -right-1.5 min-w-3.5 h-3.5 px-0.5 text-[9px] font-bold text-white rounded-full flex items-center justify-center shadow-xs transition-transform duration-300 ${
                          isActive ? 'bg-[#0D6EFD] scale-105' : 'bg-blue-600 scale-95'
                        }`}
                      >
                        {bookmarkedStoryIds.length > 9 ? '9+' : bookmarkedStoryIds.length}
                      </span>
                    )}
                  </div>

                  {/* Bengali Label with Smooth Font & Position Transition */}
                  <span
                    className={`text-[10px] leading-tight tracking-tight mt-1 select-none font-sans nav-label-spring ${
                      isActive
                        ? 'font-bold text-[#0D6EFD] scale-105 -translate-y-0.5'
                        : 'font-medium text-slate-500 group-hover:text-slate-700 scale-100 translate-y-0'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};
