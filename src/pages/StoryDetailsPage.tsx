import React, { useState } from 'react';
import {
  BookOpen,
  Bookmark,
  Share2,
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { ShareModal } from '../components/ShareModal';
import { StoryCard } from '../components/StoryCard';
import { WRITER_IMAGE, WRITER_IMAGE_FALLBACK } from '../constants/assets';

interface StoryDetailsPageProps {
  slug: string;
}

export const StoryDetailsPage: React.FC<StoryDetailsPageProps> = ({ slug }) => {
  const {
    getStoryBySlug,
    navigateTo,
    toggleBookmark,
    isBookmarked,
    stories,
    readingProgress,
  } = useStory();

  const [isShareOpen, setIsShareOpen] = useState(false);
  const story = getStoryBySlug(slug);

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 font-serif">গল্পটি খুঁজে পাওয়া যায়নি</h2>
        <p className="text-sm text-gray-600">
          সম্ভবত গল্পটির লিংক পরিবর্তিত হয়েছে বা মুছে ফেলা হয়েছে।
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
        >
          হোমপেজে ফিরে যান
        </button>
      </div>
    );
  }

  const bookmarked = isBookmarked(story.id);
  const lastReadChapNum = readingProgress[story.id] || 1;
  const relatedStories = stories
    .filter(s => s.id !== story.id && s.category === story.category)
    .slice(0, 3);

  const totalWords = story.chapters.reduce((acc, c) => acc + (c.wordCount || 0), 0);

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('categories')}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          {story.category}
        </button>
        <span>/</span>
        <span className="text-gray-800 font-medium truncate max-w-xs">{story.title}</span>
      </nav>

      {/* Story Hero Header Card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Cover Art */}
          <div className="md:col-span-4 lg:col-span-3 flex justify-center">
            <div className="w-48 sm:w-56 aspect-3/4 rounded-2xl overflow-hidden shadow-lg border border-gray-200/80 relative group bg-blue-50">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Details & Metadata */}
          <div className="md:col-span-8 lg:col-span-9 space-y-4">
            {/* Category and Status */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <span className="text-blue-600">{story.category}</span>
              <span>·</span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {story.status}
              </span>
              <span>·</span>
              <span>{story.readsCount.toLocaleString('bn-BD')} পাঠক</span>
            </div>

            {/* Story Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 font-serif leading-tight">
              {story.title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pt-1">
              <img
                src={WRITER_IMAGE}
                alt={story.author}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-blue-200"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src !== window.location.origin + WRITER_IMAGE_FALLBACK && !e.currentTarget.src.endsWith(WRITER_IMAGE_FALLBACK)) {
                    e.currentTarget.src = WRITER_IMAGE_FALLBACK;
                  }
                }}
              />
              <div>
                <p className="text-xs text-gray-400">লেখক</p>
                <p className="text-sm font-semibold text-gray-900">{story.author}</p>
              </div>
            </div>

            {/* Synopsis / Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-serif max-w-2xl">
              {story.description}
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>{story.chapters.length} টি অধ্যায়</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>প্রায় {totalWords} শব্দ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>প্রকাশকাল: {story.createdAt}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => navigateTo('reading', story.slug, lastReadChapNum)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-blue-200 flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  {readingProgress[story.id]
                    ? `অধ্যায় ${readingProgress[story.id]} থেকে পড়ুন`
                    : 'প্রথম অধ্যায় পড়ুন'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleBookmark(story.id)}
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  bookmarked
                    ? 'bg-blue-50 border-blue-200 text-blue-600'
                    : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current text-blue-600' : ''}`} />
                <span>{bookmarked ? 'সংরক্ষিত' : 'বুকমার্ক করুন'}</span>
              </button>

              <button
                onClick={() => setIsShareOpen(true)}
                className="px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-gray-500" />
                <span>শেয়ার</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Index Table */}
      <section className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif">অধ্যায় তালিকা</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              মোট {story.chapters.length} টি প্রকাশিত অধ্যায়
            </p>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {story.chapters.map(chap => (
            <div
              key={chap.id}
              onClick={() => navigateTo('reading', story.slug, chap.chapterNumber)}
              className="py-4 px-3 sm:px-4 rounded-xl hover:bg-blue-50/60 transition-colors flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold font-mono flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {chap.chapterNumber < 10 ? `0${chap.chapterNumber}` : chap.chapterNumber}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    অধ্যায় {chap.chapterNumber}: {chap.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                    <span>{chap.publishedAt}</span>
                    <span>·</span>
                    <span>{chap.estimatedReadTime} পাঠ সময়</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>পড়ুন</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 font-serif">
              "{story.category}" বিভাগের আরও গল্প
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStories.map(rel => (
              <StoryCard key={rel.id} story={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={story.title}
        url={window.location.href}
      />
    </div>
  );
};
