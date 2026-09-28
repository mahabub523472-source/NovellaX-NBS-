import React, { useState } from 'react';
import { BookOpen, ArrowRight, Sparkles, Star, ChevronRight, User, Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { StoryCard } from '../components/StoryCard';
import { HorizontalStoryCarousel } from '../components/HorizontalStoryCarousel';
import { CATEGORIES } from '../data/initialData';
import { StoryCategory } from '../types';
import { WRITER_IMAGE, WRITER_IMAGE_FALLBACK } from '../constants/assets';

export const HomePage: React.FC = () => {
  const { stories, navigateTo, setSelectedCategory } = useStory();
  const [activeFilterCategory, setActiveFilterCategory] = useState<StoryCategory | 'all'>('all');

  // Segregate story collections
  const featuredStories = stories.filter(s => s.featured);
  const popularStories = stories.filter(s => s.popular);
  const latestStories = stories.filter(s => s.latest);
  const readersChoiceStories = stories.filter(s => s.readersChoice);

  // Filtered stories for the general explore grid
  const filteredGridStories =
    activeFilterCategory === 'all'
      ? stories
      : stories.filter(s => s.category === activeFilterCategory);

  const heroFeaturedStory = featuredStories[0] || stories[0];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white pt-10 pb-12 sm:pt-16 sm:pb-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Subtle top indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>প্রিমিয়াম বাংলা গল্প ও উপন্যাস প্ল্যাটফর্ম</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 font-serif tracking-tight leading-tight text-balance">
                NovellaX NBS
              </h1>

              {/* Subheading */}
              <p className="text-xl sm:text-2xl font-serif text-blue-700 font-medium">
                "গল্পের পাতায়, অনুভূতির ছোঁয়ায়"
              </p>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                আপনার অবসর, আপনার অনুভূতি আর কিছু অসাধারণ গল্প—সবকিছু একসাথে NovellaX NBS-এ।
                শব্দের মায়াজালে হারিয়ে যাওয়ার এক অনন্য বাংলা পড়ার জগৎ।
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <button
                  onClick={() => {
                    if (heroFeaturedStory) {
                      navigateTo('story-detail', heroFeaturedStory.slug);
                    } else {
                      navigateTo('latest');
                    }
                  }}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-blue-200 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>গল্প পড়ুন</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('all-stories-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-medium text-sm border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>সব গল্প দেখুন</span>
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Stats Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-200/60 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 font-serif">১২+</div>
                  <div className="text-[11px] text-gray-500 font-medium">মৌলিক গল্প ও উপন্যাস</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 font-serif">১০০%</div>
                  <div className="text-[11px] text-gray-500 font-medium">বিনামূল্যে পড়ার সুবিধা</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 font-serif">৪.৯ ★</div>
                  <div className="text-[11px] text-gray-500 font-medium">পাঠক সন্তুষ্টি</div>
                </div>
              </div>
            </div>

            {/* Right Hero Spotlight Card */}
            {heroFeaturedStory && (
              <div className="lg:col-span-5">
                <div
                  onClick={() => navigateTo('story-detail', heroFeaturedStory.slug)}
                  className="relative group bg-white rounded-3xl p-4 sm:p-5 border border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="aspect-4/3 w-full rounded-2xl overflow-hidden bg-blue-50 relative">
                    <img
                      src={heroFeaturedStory.coverImage}
                      alt={heroFeaturedStory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                      <div className="text-xs text-blue-300 font-medium">আজকের বিশেষ পছন্দ</div>
                      <h3 className="text-xl sm:text-2xl font-bold font-serif leading-snug">
                        {heroFeaturedStory.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-200 mt-1">
                        <span>{heroFeaturedStory.category}</span>
                        <span>·</span>
                        <span>{heroFeaturedStory.chapters.length} টি অধ্যায়</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-amber-300">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{heroFeaturedStory.rating.toFixed(1)}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">লেখক</p>
                      <p className="text-sm font-semibold text-gray-900">{heroFeaturedStory.author}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                      <span>পড়তে শুরু করুন</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. POPULAR STORIES (জনপ্রিয় গল্প - Horizontal Carousel) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HorizontalStoryCarousel
          title="জনপ্রিয় গল্প"
          subtitle="পাঠকদের সর্বাধিক পঠিত ও ভালোবাসায় সিক্ত গল্পসমূহ"
          stories={popularStories}
          onViewAll={() => navigateTo('popular')}
        />
      </div>

      {/* 3. LATEST STORIES (নতুন প্রকাশিত গল্প - 3 Column Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif tracking-tight">
              নতুন প্রকাশিত
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              নিয়মিত প্রকাশিত সদ্য সংযোজিত নতুন গল্প ও অধ্যায়
            </p>
          </div>
          <button
            onClick={() => navigateTo('latest')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            সব দেখুন →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestStories.slice(0, 6).map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* 4. STORY CATEGORIES */}
      <section className="bg-gray-50/70 py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-serif">গল্পের ক্যাটাগরি</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              আপনার পছন্দের অনুভূতি ও ধারা অনুযায়ী বেছে নিন দারুণ সব গল্প
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CATEGORIES.map(cat => {
              const count = stories.filter(s => s.category === cat.name).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    navigateTo('categories');
                  }}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-gray-200/80 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-xs transition-all text-center cursor-pointer group"
                >
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </span>
                  <span className="text-xs text-gray-400 mt-1 font-medium">
                    {count} টি গল্প
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. READERS' CHOICE (পাঠকদের পছন্দ - Horizontal Carousel) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HorizontalStoryCarousel
          title="পাঠকদের পছন্দ"
          subtitle="পাঠকদের বুকমার্ক ও ইতিবাচক মতামতের শীর্ষ গল্পগুলো"
          stories={readersChoiceStories}
          onViewAll={() => navigateTo('popular')}
        />
      </div>

      {/* 6. ALL STORIES EXPLORER (সব গল্প এক্সপ্লোরার) */}
      <section id="all-stories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif tracking-tight">
              সকল গল্প ও উপন্যাস
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              NovellaX NBS লাইব্রেরির সকল প্রকাশনা একসাথে
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveFilterCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilterCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              সবগুলো ({stories.length})
            </button>
            {CATEGORIES.slice(0, 5).map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilterCategory(cat.name)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilterCategory === cat.name
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {filteredGridStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGridStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-700">
              এই বিভাগে এখনো কোনো গল্প প্রকাশিত হয়নি। খুব শিগগিরই নতুন গল্প আসছে।
            </p>
            <button
              onClick={() => setActiveFilterCategory('all')}
              className="mt-3 text-xs font-medium text-blue-600 hover:underline cursor-pointer"
            >
              সব গল্প দেখুন
            </button>
          </div>
        )}
      </section>

      {/* 7. FOUNDER & BRAND MESSAGE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-blue-300 text-xs font-semibold">
                <Heart className="w-4 h-4 text-rose-400 fill-current" />
                <span>গল্পকারের পক্ষ থেকে বার্তা</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
                "প্রতিটি গল্পে একটি নতুন অনুভূতি"
              </h2>
              <p className="text-sm text-blue-100 leading-relaxed max-w-2xl font-serif">
                "ছোটবেলা থেকেই গল্প লিখতে এবং নিজের কল্পনাকে গল্পের মাধ্যমে প্রকাশ করতে ভালোবাসি। সেই ভালো লাগা থেকেই NovellaX NBS প্রতিষ্ঠার স্বপ্ন। আশা করি NovellaX NBS-এর প্রতিটি গল্প আপনাদের হৃদয়ে ছোট্ট হলেও একটি অনুভূতির ছাপ রেখে যাবে।"
              </p>
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => navigateTo('writer')}
                  className="px-5 py-2.5 rounded-xl bg-white text-blue-900 font-semibold text-xs hover:bg-blue-50 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>লেখক পরিচিতি পড়ুন</span>
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className="px-5 py-2.5 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white font-semibold text-xs border border-blue-600 transition-colors cursor-pointer"
                >
                  যোগাযোগ করুন
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <img
                  src={WRITER_IMAGE}
                  alt="মাহবুব আলম"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-400 shadow-md shrink-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (e.currentTarget.src !== window.location.origin + WRITER_IMAGE_FALLBACK && !e.currentTarget.src.endsWith(WRITER_IMAGE_FALLBACK)) {
                      e.currentTarget.src = WRITER_IMAGE_FALLBACK;
                    }
                  }}
                />
                <div>
                  <h4 className="font-bold text-white text-base">মাহবুব আলম</h4>
                  <p className="text-xs text-blue-200">Founder & Writer</p>
                  <p className="text-[11px] text-blue-300">NovellaX NBS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
