import React from 'react';
import { BookOpen, Home } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useStory();

  return (
    <div className="py-24 sm:py-32 max-w-xl mx-auto px-4 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs border border-blue-100">
        <BookOpen className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-blue-600 font-serif tracking-tight">
          ৪০৪
        </h1>
        <p className="text-lg sm:text-xl font-medium text-gray-800 font-serif">
          মনে হচ্ছে এই গল্পের পাতাটি খুঁজে পাওয়া যাচ্ছে না।
        </p>
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
          আপনি যে গল্প বা পেজটি খুঁজছেন তা হয়তো পরিবর্তিত হয়েছে কিংবা প্রকাশের অপেক্ষায় রয়েছে।
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-blue-200 inline-flex items-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>হোমপেজে ফিরে যান</span>
        </button>
      </div>
    </div>
  );
};
