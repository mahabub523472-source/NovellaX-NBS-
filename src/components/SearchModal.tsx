import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, stories, navigateTo, setSelectedCategory } = useStory();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = searchTerm.trim().toLowerCase();
  const filteredStories = trimmed
    ? stories.filter(
        story =>
          story.title.toLowerCase().includes(trimmed) ||
          story.category.toLowerCase().includes(trimmed) ||
          story.description.toLowerCase().includes(trimmed) ||
          story.author.toLowerCase().includes(trimmed) ||
          story.chapters.some(chap =>
            chap.title.toLowerCase().includes(trimmed) ||
            chap.content.toLowerCase().includes(trimmed)
          )
      )
    : [];

  const suggestedCategories = [
    'রোমান্টিক',
    'আবেগ',
    'ভালোবাসার গল্প',
    'রহস্য',
    'থ্রিলার',
    'ইসলামিক',
    'উপন্যাস',
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (trimmed === '/adminsahid09' || trimmed === 'adminsahid09') {
        navigateTo('admin');
        setIsSearchOpen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative mx-auto max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 divide-y divide-gray-100">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 sm:px-6">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={e => {
              const val = e.target.value;
              setSearchTerm(val);
              if (val.trim() === '/adminsahid09' || val.trim() === 'adminsahid09') {
                navigateTo('admin');
                setIsSearchOpen(false);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="গল্পের নাম, ক্যাটাগরি বা বিষয় লিখে খুঁজুন... (যেমন: ভালোবাসা, রহস্য)"
            className="w-full text-base bg-transparent border-none text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-0"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-md mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-900 px-2 py-1 bg-gray-100 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-6">
          {trimmed ? (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-gray-500 font-medium">
                <span>অনুসন্ধান ফলাফল: {filteredStories.length} টি গল্প পাওয়া গেছে</span>
              </div>

              {filteredStories.length > 0 ? (
                <div className="space-y-2.5">
                  {filteredStories.map(story => (
                    <div
                      key={story.id}
                      onClick={() => {
                        navigateTo('story-detail', story.slug);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          className="w-12 h-16 object-cover rounded-md shadow-xs shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {story.title}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {story.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                            <span className="text-blue-600 font-medium">{story.category}</span>
                            <span>·</span>
                            <span>{story.author}</span>
                            <span>·</span>
                            <span>{story.chapters.length} টি অধ্যায়</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 space-y-2">
                  <BookOpen className="w-8 h-8 text-gray-300 mx-auto" />
                  <p className="text-sm font-medium text-gray-700">কোনো গল্প খুঁজে পাওয়া যায়নি</p>
                  <p className="text-xs text-gray-500">
                    বানান পরিবর্তন করে অথবা অন্য কোনো ক্যাটাগরি অনুসন্ধান করুন।
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>জনপ্রিয় ক্যাটাগরি ও বিষয়সমূহ:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat as any);
                      navigateTo('categories');
                      setIsSearchOpen(false);
                    }}
                    className="px-3 py-1.5 text-xs bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-2 font-medium">জনপ্রিয় গল্পের তালিকা</p>
                <div className="space-y-1.5">
                  {stories.slice(0, 3).map(story => (
                    <button
                      key={story.id}
                      onClick={() => {
                        navigateTo('story-detail', story.slug);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-gray-50 flex items-center justify-between text-xs text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <span className="font-medium">{story.title}</span>
                      <span className="text-gray-400">{story.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
