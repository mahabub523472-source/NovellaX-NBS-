import React from 'react';
import { useStory } from '../context/StoryContext';
import { CATEGORIES } from '../data/initialData';
import { StoryCard } from '../components/StoryCard';
import { StoryCategory } from '../types';
import { Layers, BookOpen } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { stories, selectedCategory, setSelectedCategory } = useStory();

  const filteredStories =
    selectedCategory === 'all'
      ? stories
      : stories.filter(s => s.category === selectedCategory);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>ক্যাটাগরি অনুসন্ধান</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 font-serif">
          গল্পের সকল বিভাগ ও ক্যাটাগরি
        </h1>
        <p className="text-sm text-gray-600 font-serif">
          পছন্দের অনুভূতি বেছে নিন এবং আপনার রুচির গল্পগুলো উপভোগ করুন।
        </p>
      </div>

      {/* Category Pills / Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          সবগুলো ({stories.length})
        </button>

        {CATEGORIES.map(cat => {
          const count = stories.filter(s => s.category === cat.name).length;
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name as StoryCategory)}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Stories Results Grid */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 font-serif">
            {selectedCategory === 'all' ? 'সকল গল্পসমূহ' : `"${selectedCategory}" বিভাগের গল্প`}
          </h2>
          <span className="text-xs text-gray-500 font-medium">
            {filteredStories.length} টি গল্প পাওয়া গেছে
          </span>
        </div>

        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200 space-y-3">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
            <p className="text-base font-semibold text-gray-800 font-serif">
              এই বিভাগে এখনো কোনো গল্প প্রকাশিত হয়নি। খুব শিগগিরই নতুন গল্প আসছে।
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              সব গল্প দেখুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
