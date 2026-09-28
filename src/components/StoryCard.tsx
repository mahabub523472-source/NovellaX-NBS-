import React, { useState } from 'react';
import { Bookmark, ArrowRight, BookOpen, Star } from 'lucide-react';
import { Story } from '../types';
import { useStory } from '../context/StoryContext';

interface StoryCardProps {
  story: Story;
  variant?: 'standard' | 'compact' | 'horizontal';
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, variant = 'standard' }) => {
  const { navigateTo, toggleBookmark, isBookmarked } = useStory();
  const bookmarked = isBookmarked(story.id);
  const [imgError, setImgError] = useState(false);

  const handleReadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateTo('story-detail', story.slug);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(story.id);
  };

  if (variant === 'compact') {
    return (
      <div
        onClick={() => navigateTo('story-detail', story.slug)}
        className="group flex gap-3.5 p-3 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xs transition-all cursor-pointer"
      >
        <div className="w-16 h-22 rounded-lg overflow-hidden bg-blue-50 shrink-0 relative">
          {!imgError ? (
            <img
              src={story.coverImage}
              alt={story.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 text-blue-500 p-2 text-center">
              <BookOpen className="w-6 h-6 mb-1" />
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between py-0.5">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-blue-600 font-medium mb-1">
              <span>{story.category}</span>
              <span className="text-gray-300">·</span>
              <span className="text-gray-500">{story.chapters.length} অধ্যায়</span>
            </div>
            <h4 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {story.title}
            </h4>
            <p className="text-xs text-gray-500 line-clamp-1 mt-1">{story.description}</p>
          </div>
          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-gray-50 text-xs">
            <span className="text-gray-400">{story.author}</span>
            <span className="text-blue-600 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              পড়ুন →
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article
      onClick={() => navigateTo('story-detail', story.slug)}
      className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Cover Image Container */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
          {!imgError ? (
            <img
              src={story.coverImage}
              alt={story.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600 p-4">
              <BookOpen className="w-10 h-10 mb-2 opacity-80" />
              <span className="text-xs font-serif font-medium">{story.title}</span>
            </div>
          )}

          {/* Bookmark Button Top Right */}
          <button
            onClick={handleBookmarkClick}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark story'}
            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
              bookmarked
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/85 text-gray-700 hover:bg-white hover:text-blue-600'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Zero-Pill Clean Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span className="text-blue-600 font-semibold">{story.category}</span>
            <span aria-hidden="true" className="text-gray-300">·</span>
            <span>{story.chapters.length} অধ্যায়</span>
            <span aria-hidden="true" className="text-gray-300">·</span>
            <span className="flex items-center gap-1 text-amber-600">
              <Star className="w-3 h-3 fill-current" />
              <span>{story.rating.toFixed(1)}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 font-serif">
            {story.title}
          </h3>

          {/* Author */}
          <p className="text-xs text-gray-400 font-medium">
            লেখক: <span className="text-gray-700">{story.author}</span>
          </p>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {story.description}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between">
        <div className="text-xs text-gray-400">
          <span>{story.status}</span>
          <span className="mx-1.5">·</span>
          <span>{story.readsCount.toLocaleString('bn-BD')} পাঠক</span>
        </div>

        <button
          onClick={handleReadClick}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors group-hover:translate-x-0.5 transform duration-150 cursor-pointer"
        >
          <span>পড়ুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
