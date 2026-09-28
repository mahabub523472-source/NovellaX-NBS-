import React, { createContext, useContext, useState, useEffect } from 'react';
import { Story, Chapter, StoryCategory, NavigationPage, ReaderSettings } from '../types';
import { INITIAL_STORIES } from '../data/initialData';

interface StoryContextType {
  stories: Story[];
  currentPage: NavigationPage;
  currentStorySlug: string | null;
  currentChapterNumber: number | null;
  selectedCategory: StoryCategory | 'all';
  searchQuery: string;
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  isAdminLoggedIn: boolean;
  bookmarkedStoryIds: string[];
  readerSettings: ReaderSettings;
  readingProgress: Record<string, number>; // storyId -> last read chapter number
  
  // Navigation & Page Setters
  navigateTo: (page: NavigationPage, storySlug?: string, chapterNumber?: number) => void;
  setSelectedCategory: (cat: StoryCategory | 'all') => void;
  setSearchQuery: (q: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsMenuOpen: (open: boolean) => void;
  
  // Bookmarks & Progress
  toggleBookmark: (storyId: string) => void;
  isBookmarked: (storyId: string) => boolean;
  updateReadingProgress: (storyId: string, chapterNum: number) => void;
  updateReaderSettings: (settings: Partial<ReaderSettings>) => void;
  
  // Admin Operations
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  addStory: (story: Omit<Story, 'id' | 'createdAt' | 'updatedAt' | 'readsCount' | 'rating'>) => void;
  updateStory: (storyId: string, story: Partial<Story>) => void;
  deleteStory: (storyId: string) => void;
  addChapter: (storyId: string, chapter: Omit<Chapter, 'id' | 'storyId' | 'publishedAt'>) => void;
  updateChapter: (storyId: string, chapterId: string, chapter: Partial<Chapter>) => void;
  deleteChapter: (storyId: string, chapterId: string) => void;
  resetToDefaults: () => void;
  
  // Helpers
  getStoryBySlug: (slug: string) => Story | undefined;
  incrementStoryRead: (storyId: string) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_STORIES = 'novellax_nbs_stories_v1';
const LOCAL_STORAGE_KEY_BOOKMARKS = 'novellax_nbs_bookmarks_v1';
const LOCAL_STORAGE_KEY_PROGRESS = 'novellax_nbs_progress_v1';
const LOCAL_STORAGE_KEY_SETTINGS = 'novellax_nbs_settings_v1';
const LOCAL_STORAGE_KEY_ADMIN = 'novellax_nbs_admin_auth_v1';

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Stories State
  const [stories, setStories] = useState<Story[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_STORIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_STORIES;
  });

  // 2. Navigation State
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [currentStorySlug, setCurrentStorySlug] = useState<string | null>(null);
  const [currentChapterNumber, setCurrentChapterNumber] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // 3. User & Reader Preferences
  const [bookmarkedStoryIds, setBookmarkedStoryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKMARKS);
      return saved ? JSON.parse(saved) : ['story-1', 'story-2'];
    } catch {
      return ['story-1', 'story-2'];
    }
  });

  const [readingProgress, setReadingProgress] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PROGRESS);
      return saved ? JSON.parse(saved) : { 'story-1': 2 };
    } catch {
      return {};
    }
  });

  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      fontSize: 'lg',
      theme: 'light',
      fontFamily: 'hind',
      lineHeight: 'relaxed',
    };
  });

  // 4. Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEY_ADMIN) === 'true';
    } catch {
      return false;
    }
  });

  // Save stories to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_STORIES, JSON.stringify(stories));
    } catch {
      // Ignore
    }
  }, [stories]);

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarkedStoryIds));
    } catch {
      // Ignore
    }
  }, [bookmarkedStoryIds]);

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROGRESS, JSON.stringify(readingProgress));
    } catch {
      // Ignore
    }
  }, [readingProgress]);

  // Save reader settings
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(readerSettings));
    } catch {
      // Ignore
    }
  }, [readerSettings]);

  // Navigation handler
  const navigateTo = (page: NavigationPage, storySlug?: string, chapterNumber?: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
    if (storySlug !== undefined) setCurrentStorySlug(storySlug);
    if (chapterNumber !== undefined) setCurrentChapterNumber(chapterNumber);
    setIsMenuOpen(false);
    setIsSearchOpen(false);

    // Update browser URL for clean routing
    try {
      if (page === 'admin') {
        window.history.pushState({ page: 'admin' }, '', '/adminsahid09');
      } else if (page === 'writer') {
        window.history.pushState({ page: 'writer' }, '', '/writer');
      } else if (page === 'rules') {
        window.history.pushState({ page: 'rules' }, '', '/rules');
      } else if (page === 'contact') {
        window.history.pushState({ page: 'contact' }, '', '/contact');
      } else if (page === 'categories') {
        window.history.pushState({ page: 'categories' }, '', '/categories');
      } else if (page === 'story-detail' && storySlug) {
        window.history.pushState({ page: 'story-detail', slug: storySlug }, '', `/story/${storySlug}`);
      } else if (page === 'reading' && storySlug && chapterNumber) {
        window.history.pushState(
          { page: 'reading', slug: storySlug, chapter: chapterNumber },
          '',
          `/story/${storySlug}/chapter-${chapterNumber}`
        );
      } else if (page === 'home') {
        window.history.pushState({ page: 'home' }, '', '/');
      }
    } catch {
      // Ignore if pushState fails in certain sandbox iframe contexts
    }
  };

  const toggleBookmark = (storyId: string) => {
    setBookmarkedStoryIds(prev =>
      prev.includes(storyId) ? prev.filter(id => id !== storyId) : [...prev, storyId]
    );
  };

  const isBookmarked = (storyId: string) => bookmarkedStoryIds.includes(storyId);

  const updateReadingProgress = (storyId: string, chapterNum: number) => {
    setReadingProgress(prev => ({
      ...prev,
      [storyId]: Math.max(prev[storyId] || 1, chapterNum),
    }));
  };

  const updateReaderSettings = (settings: Partial<ReaderSettings>) => {
    setReaderSettings(prev => ({ ...prev, ...settings }));
  };

  const getStoryBySlug = (slug: string) => {
    return stories.find(s => s.slug === slug);
  };

  const incrementStoryRead = (storyId: string) => {
    setStories(prev =>
      prev.map(s => (s.id === storyId ? { ...s, readsCount: s.readsCount + 1 } : s))
    );
  };

  // Admin Auth functions
  const loginAdmin = (pass: string) => {
    const trimmed = pass.trim();
    if (
      trimmed === 'adminsahid09' ||
      trimmed === 'sahid09' ||
      trimmed === 'admin123' ||
      trimmed === 'novella2026' ||
      trimmed === 'mahbub'
    ) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY_ADMIN, 'true');
      } catch {
        // Ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY_ADMIN);
    } catch {
      // Ignore
    }
  };

  const addStory = (newStoryData: Omit<Story, 'id' | 'createdAt' | 'updatedAt' | 'readsCount' | 'rating'>) => {
    const newStory: Story = {
      ...newStoryData,
      id: `story-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      readsCount: 1,
      rating: 5.0,
      chapters: newStoryData.chapters || [],
    };
    setStories(prev => [newStory, ...prev]);
  };

  const updateStory = (storyId: string, updatedFields: Partial<Story>) => {
    setStories(prev =>
      prev.map(s =>
        s.id === storyId
          ? {
              ...s,
              ...updatedFields,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : s
      )
    );
  };

  const deleteStory = (storyId: string) => {
    setStories(prev => prev.filter(s => s.id !== storyId));
  };

  const addChapter = (
    storyId: string,
    chapterData: Omit<Chapter, 'id' | 'storyId' | 'publishedAt'>
  ) => {
    const newChapter: Chapter = {
      ...chapterData,
      id: `chap-${Date.now()}`,
      storyId,
      publishedAt: new Date().toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    setStories(prev =>
      prev.map(s => {
        if (s.id === storyId) {
          const updatedChapters = [...s.chapters, newChapter];
          return {
            ...s,
            chapters: updatedChapters,
            updatedAt: new Date().toISOString().split('T')[0],
          };
        }
        return s;
      })
    );
  };

  const updateChapter = (storyId: string, chapterId: string, chapterData: Partial<Chapter>) => {
    setStories(prev =>
      prev.map(s => {
        if (s.id === storyId) {
          const updatedChapters = s.chapters.map(c =>
            c.id === chapterId ? { ...c, ...chapterData } : c
          );
          return {
            ...s,
            chapters: updatedChapters,
            updatedAt: new Date().toISOString().split('T')[0],
          };
        }
        return s;
      })
    );
  };

  const deleteChapter = (storyId: string, chapterId: string) => {
    setStories(prev =>
      prev.map(s => {
        if (s.id === storyId) {
          const updatedChapters = s.chapters.filter(c => c.id !== chapterId);
          return {
            ...s,
            chapters: updatedChapters,
            updatedAt: new Date().toISOString().split('T')[0],
          };
        }
        return s;
      })
    );
  };

  const resetToDefaults = () => {
    setStories(INITIAL_STORIES);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_STORIES, JSON.stringify(INITIAL_STORIES));
    } catch {
      // Ignore
    }
  };

  return (
    <StoryContext.Provider
      value={{
        stories,
        currentPage,
        currentStorySlug,
        currentChapterNumber,
        selectedCategory,
        searchQuery,
        isSearchOpen,
        isMenuOpen,
        isAdminLoggedIn,
        bookmarkedStoryIds,
        readerSettings,
        readingProgress,
        navigateTo,
        setSelectedCategory,
        setSearchQuery,
        setIsSearchOpen,
        setIsMenuOpen,
        toggleBookmark,
        isBookmarked,
        updateReadingProgress,
        updateReaderSettings,
        loginAdmin,
        logoutAdmin,
        addStory,
        updateStory,
        deleteStory,
        addChapter,
        updateChapter,
        deleteChapter,
        resetToDefaults,
        getStoryBySlug,
        incrementStoryRead,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};
