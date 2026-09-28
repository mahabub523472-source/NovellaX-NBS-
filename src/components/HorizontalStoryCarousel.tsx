import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Story } from '../types';
import { useStory } from '../context/StoryContext';

interface HorizontalStoryCarouselProps {
  title: string;
  subtitle?: string;
  stories: Story[];
  onViewAll?: () => void;
}

export const HorizontalStoryCarousel: React.FC<HorizontalStoryCarouselProps> = ({
  title,
  subtitle,
  stories,
  onViewAll,
}) => {
  const { navigateTo } = useStory();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (stories.length === 0) return null;

  return (
    <section className="py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif tracking-tight">
            {title}
          </h2>
          {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>

        {/* Carousel Controls & View All */}
        <div className="flex items-center gap-2">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mr-2 cursor-pointer"
            >
              সব দেখুন →
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
              className="p-2 rounded-full border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
              className="p-2 rounded-full border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {stories.map(story => (
          <div
            key={story.id}
            onClick={() => navigateTo('story-detail', story.slug)}
            className="w-64 sm:w-72 shrink-0 snap-start bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Cover Aspect */}
              <div className="aspect-16/10 w-full overflow-hidden bg-gray-100 relative">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              <div className="p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                  <span className="text-blue-600 font-semibold">{story.category}</span>
                  <span>·</span>
                  <span>{story.chapters.length} অধ্যায়</span>
                </div>

                <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 font-serif">
                  {story.title}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>

            <div className="px-4 sm:px-5 py-3 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between text-xs">
              <span className="text-gray-400 font-medium">{story.author}</span>
              <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                পড়ুন →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
