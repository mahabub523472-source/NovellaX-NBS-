import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Coffee,
  Type,
  Bookmark,
  Share2,
  List,
  Sliders,
  Sparkles,
  Heart,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { ShareModal } from '../components/ShareModal';

interface ReaderPageProps {
  slug: string;
  chapterNumber: number;
}

export const ReaderPage: React.FC<ReaderPageProps> = ({ slug, chapterNumber }) => {
  const {
    getStoryBySlug,
    navigateTo,
    readerSettings,
    updateReaderSettings,
    toggleBookmark,
    isBookmarked,
    updateReadingProgress,
    incrementStoryRead,
  } = useStory();

  const story = getStoryBySlug(slug);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isChapterListOpen, setIsChapterListOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [likedReaction, setLikedReaction] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<{ name: string; text: string; time: string }[]>([
    {
      name: 'সৌরভ দত্ত',
      text: 'ভাষার টান আর দৃশ্যপট অসাধারণ লেগেছে। পরবর্তী অধ্যায়ের জন্য অপেক্ষা রইল!',
      time: '২ দিন আগে',
    },
    {
      name: 'আফরিন জাহান',
      text: 'মাহবুব আলমের লেখার হাত সত্যিই মুগ্ধ করার মতো। অনুভূতির গভীরতা দারুণ।',
      time: '৫ দিন আগে',
    },
  ]);

  const currentChapter = story?.chapters.find(c => c.chapterNumber === chapterNumber) || story?.chapters[0];

  useEffect(() => {
    if (story) {
      updateReadingProgress(story.id, chapterNumber);
      incrementStoryRead(story.id);
    }
  }, [story?.id, chapterNumber]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const percent = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
        setScrollPercent(percent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!story || !currentChapter) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center space-y-4 px-4">
        <h2 className="text-2xl font-bold text-gray-900 font-serif">অধ্যায়টি পাওয়া যায়নি</h2>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
        >
          হোমপেজে ফিরে যান
        </button>
      </div>
    );
  }

  const bookmarked = isBookmarked(story.id);
  const hasPrev = chapterNumber > 1;
  const hasNext = chapterNumber < story.chapters.length;

  const fontSizes = {
    sm: 'text-base sm:text-lg',
    base: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
    '2xl': 'text-3xl sm:text-4xl',
  };

  const themeClasses = {
    light: 'bg-white text-gray-900 border-gray-100',
    sepia: 'bg-[#FBF8EE] text-[#332A20] border-[#E8E1D1]',
    dark: 'bg-[#0F172A] text-gray-200 border-gray-800',
  };

  const activeThemeClass = themeClasses[readerSettings.theme];

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments(prev => [
      {
        name: 'পাঠক',
        text: commentInput.trim(),
        time: 'এইমাত্র',
      },
      ...prev,
    ]);
    setCommentInput('');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${activeThemeClass} pb-24`}>
      {/* 1. Sticky Reading Progress Bar (Top) */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-gray-200/40">
        <div
          className="h-full bg-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* 2. Top Navigation & Control Toolbar */}
      <div
        className={`sticky top-1.5 z-40 w-full backdrop-blur-md border-b px-4 sm:px-8 py-3 transition-colors ${
          readerSettings.theme === 'dark'
            ? 'bg-slate-900/90 border-slate-800'
            : readerSettings.theme === 'sepia'
            ? 'bg-[#FBF8EE]/90 border-[#E8E1D1]'
            : 'bg-white/90 border-gray-100'
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Back to Story Details */}
          <button
            onClick={() => navigateTo('story-detail', story.slug)}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">গল্পের বিবরণ</span>
          </button>

          {/* Center Story/Chapter Title */}
          <div className="text-center truncate px-2 max-w-[200px] sm:max-w-sm">
            <h1 className="text-xs sm:text-sm font-bold truncate">{story.title}</h1>
            <p className="text-[11px] opacity-70 truncate">অধ্যায় {chapterNumber}: {currentChapter.title}</p>
          </div>

          {/* Reading Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Scroll percent indicator */}
            <span className="text-[11px] font-mono opacity-60 font-medium px-2 py-0.5 rounded-md hidden md:inline">
              {scrollPercent}%
            </span>

            {/* Chapter List Modal Toggle */}
            <button
              onClick={() => setIsChapterListOpen(!isChapterListOpen)}
              className="p-2 rounded-lg border border-transparent hover:border-gray-300 transition-colors cursor-pointer"
              title="অধ্যায় সূচী"
            >
              <List className="w-4 h-4" />
            </button>

            {/* Reading Settings Drawer Toggle */}
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 rounded-lg border border-transparent hover:border-gray-300 transition-colors cursor-pointer"
              title="পাঠ সেটিংস"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Bookmark */}
            <button
              onClick={() => toggleBookmark(story.id)}
              className="p-2 rounded-lg border border-transparent hover:border-gray-300 transition-colors cursor-pointer"
              title="বুকমার্ক"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={() => setIsShareOpen(true)}
              className="p-2 rounded-lg border border-transparent hover:border-gray-300 transition-colors cursor-pointer"
              title="শেয়ার"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Settings Floating Panel */}
        {isSettingsOpen && (
          <div className="absolute right-4 top-14 w-72 sm:w-80 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-slate-800 p-4 space-y-4 z-50 text-gray-900 dark:text-gray-100">
            {/* Theme Selector */}
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                পড়ার থিম (Theme)
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => updateReaderSettings({ theme: 'light' })}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium cursor-pointer ${
                    readerSettings.theme === 'light'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                      : 'border-gray-200 bg-white text-gray-800'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>সাদা</span>
                </button>
                <button
                  onClick={() => updateReaderSettings({ theme: 'sepia' })}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium cursor-pointer ${
                    readerSettings.theme === 'sepia'
                      ? 'border-amber-700 bg-amber-50 text-amber-900 font-bold'
                      : 'border-amber-200 bg-[#FBF8EE] text-[#332A20]'
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>সেপিয়া</span>
                </button>
                <button
                  onClick={() => updateReaderSettings({ theme: 'dark' })}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium cursor-pointer ${
                    readerSettings.theme === 'dark'
                      ? 'border-blue-400 bg-slate-800 text-blue-300 font-bold'
                      : 'border-slate-700 bg-slate-900 text-gray-300'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>রাত</span>
                </button>
              </div>
            </div>

            {/* Font Size Adjust */}
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                ফন্টের আকার (Font Size)
              </p>
              <div className="flex items-center justify-between gap-1 p-1 bg-gray-100 dark:bg-slate-800 rounded-lg">
                {(['sm', 'base', 'lg', 'xl'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => updateReaderSettings({ fontSize: size })}
                    className={`flex-1 py-1.5 text-xs rounded-md font-medium transition-all cursor-pointer ${
                      readerSettings.fontSize === size
                        ? 'bg-white dark:bg-slate-700 shadow-xs text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {size === 'sm' ? 'A-' : size === 'base' ? 'A' : size === 'lg' ? 'A+' : 'A++'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chapter Quick Jump Drawer */}
        {isChapterListOpen && (
          <div className="absolute left-4 top-14 w-80 sm:w-96 max-h-96 overflow-y-auto bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-slate-800 p-4 space-y-2 z-50 text-gray-900 dark:text-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              সকল অধ্যায় ({story.chapters.length})
            </p>
            {story.chapters.map(chap => (
              <button
                key={chap.id}
                onClick={() => {
                  navigateTo('reading', story.slug, chap.chapterNumber);
                  setIsChapterListOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  chap.chapterNumber === chapterNumber
                    ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold'
                    : 'hover:bg-gray-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>অধ্যায় {chap.chapterNumber}: {chap.title}</span>
                <span className="text-[10px] opacity-60">{chap.estimatedReadTime}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Distraction-Free Reading Canvas (Max Width 750px) */}
      <main className="max-w-[760px] mx-auto px-5 sm:px-8 pt-10 sm:pt-14 space-y-8">
        {/* Chapter Header */}
        <div className="text-center space-y-3 pb-8 border-b border-current/10">
          <span className="text-xs tracking-wider uppercase font-semibold text-blue-600 dark:text-blue-400">
            অধ্যায় {chapterNumber}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif leading-snug">
            {currentChapter.title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-xs opacity-60">
            <span>লেখক: {story.author}</span>
            <span>·</span>
            <span>{currentChapter.publishedAt}</span>
            <span>·</span>
            <span>{currentChapter.estimatedReadTime} পাঠ</span>
          </div>
        </div>

        {/* Story Prose Body */}
        <div
          className={`${fontSizes[readerSettings.fontSize]} leading-loose space-y-6 text-justify font-serif tracking-normal selection:bg-blue-200 selection:text-blue-950`}
        >
          {currentChapter.content.split('\n\n').map((paragraph, idx) => (
            <p
              key={idx}
              className={`leading-[2.1] ${
                idx === 0
                  ? 'first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-bold first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-blue-600'
                  : ''
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Chapter End Divider */}
        <div className="text-center py-6">
          <div className="inline-flex items-center gap-2 opacity-40 text-xs">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>
          <p className="text-xs opacity-60 mt-1 font-serif">অধ্যায় {chapterNumber} সমাপ্ত</p>
        </div>

        {/* Chapter Reactions */}
        <div className="p-6 rounded-2xl border border-current/10 bg-current/5 space-y-4">
          <div className="text-center">
            <h4 className="text-sm font-bold font-serif mb-1">অধ্যায়টি কেমন লেগেছে?</h4>
            <p className="text-xs opacity-70">আপনার অনুভূতি প্রকাশ করুন</p>
          </div>
          <div className="flex justify-center gap-3 sm:gap-4">
            {[
              { id: 'love', icon: Heart, label: 'ভালো লেগেছে' },
              { id: 'spark', icon: Sparkles, label: 'মুগ্ধকর' },
              { id: 'complete', icon: CheckCircle, label: 'পড়া শেষ' },
            ].map(rx => {
              const Icon = rx.icon;
              const isSelected = likedReaction === rx.id;
              return (
                <button
                  key={rx.id}
                  onClick={() => setLikedReaction(rx.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/80 dark:bg-slate-800 text-current hover:bg-white border border-current/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{rx.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chapter Navigation Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-current/10 gap-3">
          {hasPrev ? (
            <button
              onClick={() => navigateTo('reading', story.slug, chapterNumber - 1)}
              className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>পূর্ববর্তী অধ্যায়</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={() => navigateTo('story-detail', story.slug)}
            className="text-xs opacity-70 hover:opacity-100 font-medium underline"
          >
            সূচিপত্র
          </button>

          {hasNext ? (
            <button
              onClick={() => navigateTo('reading', story.slug, chapterNumber + 1)}
              className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs sm:text-sm hover:bg-blue-700 transition-colors cursor-pointer shadow-md"
            >
              <span>পরবর্তী অধ্যায়</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => navigateTo('story-detail', story.slug)}
              className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <span>গল্প সমাপ্তি</span>
            </button>
          )}
        </div>

        {/* Reader Comments / Feedback */}
        <section className="pt-10 space-y-5">
          <div className="flex items-center gap-2 text-base font-bold font-serif">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>পাঠক প্রতিক্রিয়া ও আলোচনা ({comments.length})</span>
          </div>

          <form onSubmit={handleAddComment} className="space-y-3">
            <textarea
              rows={3}
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              placeholder="এই অধ্যায় সম্পর্কে আপনার মূল্যবান মতামত বা অনুভূতি জানান..."
              className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-current/20 bg-transparent focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                মন্তব্য পাঠান
              </button>
            </div>
          </form>

          <div className="space-y-3 pt-2">
            {comments.map((c, i) => (
              <div key={i} className="p-4 rounded-xl border border-current/10 bg-current/5 space-y-1 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <span>{c.name}</span>
                  <span className="opacity-50 text-[11px] font-normal">{c.time}</span>
                </div>
                <p className="opacity-80 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={`${story.title} - অধ্যায় ${chapterNumber}`}
        url={window.location.href}
      />
    </div>
  );
};
