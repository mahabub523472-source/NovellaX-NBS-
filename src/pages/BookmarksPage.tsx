import React from 'react';
import { Bookmark, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { StoryCard } from '../components/StoryCard';

export const BookmarksPage: React.FC = () => {
  const { stories, bookmarkedStoryIds, readingProgress, navigateTo } = useStory();

  const bookmarkedStories = stories.filter(s => bookmarkedStoryIds.includes(s.id));
  const progressStoryIds = Object.keys(readingProgress);
  const inProgressStories = stories.filter(s => progressStoryIds.includes(s.id));

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          <Bookmark className="w-3.5 h-3.5" />
          <span>আপনার পাঠাগার</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 font-serif">
          সংরক্ষিত ও চলমান গল্পসমূহ
        </h1>
        <p className="text-sm text-gray-600 font-serif">
          আপনার প্রিয় গল্পগুলো সংরক্ষণ করুন এবং যেকোনো সময় সেখান থেকেই পড়া চালিয়ে যান।
        </p>
      </div>

      {/* 1. Continue Reading (চলমান গল্প) */}
      {inProgressStories.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-bold text-gray-900 font-serif">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2>পড়া চালিয়ে যান (Recently Read)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressStories.map(story => {
              const lastChapNum = readingProgress[story.id] || 1;
              return (
                <div
                  key={story.id}
                  onClick={() => navigateTo('reading', story.slug, lastChapNum)}
                  className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-12 h-16 object-cover rounded-lg shadow-xs shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {story.title}
                      </h4>
                      <p className="text-xs text-blue-700 font-medium mt-0.5">
                        অধ্যায় {lastChapNum} চলমান
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        মোট {story.chapters.length} অধ্যায়
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 2. Bookmarked Stories (বুকমার্ককৃত গল্প) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2 text-lg font-bold text-gray-900 font-serif">
            <Bookmark className="w-5 h-5 text-blue-600" />
            <h2>সংরক্ষিত তালিকা ({bookmarkedStories.length})</h2>
          </div>
        </div>

        {bookmarkedStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200 space-y-3">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-semibold text-gray-800 font-serif">
              আপনার সংরক্ষিত তালিকায় এখনো কোনো গল্প যোগ করেননি
            </h3>
            <p className="text-xs text-gray-500">
              যেকোনো গল্পের কার্ডের বুকমার্ক আইকনে ক্লিক করে সহজেই এখানে সংরক্ষণ করুন।
            </p>
            <button
              onClick={() => navigateTo('home')}
              className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              গল্প খুঁজুন
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
