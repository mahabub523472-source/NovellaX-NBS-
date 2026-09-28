import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Sparkles,
  Heart,
  MapPin,
  GraduationCap,
  ArrowRight,
  Maximize2,
  X,
  Feather,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { StoryCard } from '../components/StoryCard';
import { WRITER_IMAGE, WRITER_IMAGE_FALLBACK } from '../constants/assets';

export const WriterPage: React.FC = () => {
  const { stories, navigateTo } = useStory();
  const [imgError, setImgError] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const writerStories = stories.filter(s => s.author.includes('মাহবুব আলম'));
  const WRITER_IMAGE_URL = WRITER_IMAGE;

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Page Header & Literary Quote */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>গল্পকারের স্বপ্ন ও পথচলা</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 font-serif tracking-tight">
          লেখক পরিচিতি
        </h1>

        <blockquote className="text-base sm:text-lg font-serif italic text-gray-700 border-y border-gray-100 py-4 leading-relaxed">
          "প্রতিটি গল্পের আড়ালে লুকিয়ে থাকে একজন গল্পকারের অনুভূতি, কিছু না বলা কথা এবং কল্পনার এক নিজস্ব জগৎ। NovellaX NBS সেই অনুভূতিগুলোকে গল্পের পাতায় তুলে ধরার একটি ছোট্ট প্রচেষ্টা।"
        </blockquote>
      </div>

      {/* 2. Founder Profile Showcase Card with High Quality Photo */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Portrait Photo Container */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div
              onClick={() => setIsZoomOpen(true)}
              className="relative group cursor-pointer w-full max-w-xs"
              title="সম্পূর্ণ ছবি দেখতে ক্লিক করুন"
            >
              <div className="aspect-4/3 sm:aspect-1/1 w-full rounded-2xl overflow-hidden ring-4 ring-blue-600/15 border-2 border-blue-600 shadow-xl bg-blue-50 relative">
                {!imgError ? (
                  <img
                    src={WRITER_IMAGE_URL}
                    alt="মাহবুব আলম — Founder & Writer, NovellaX NBS"
                    onError={(e) => {
                      if (e.currentTarget.src !== window.location.origin + WRITER_IMAGE_FALLBACK && !e.currentTarget.src.endsWith(WRITER_IMAGE_FALLBACK)) {
                        e.currentTarget.src = WRITER_IMAGE_FALLBACK;
                      } else {
                        setImgError(true);
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-blue-100 text-blue-700 p-4 text-center">
                    <BookOpen className="w-12 h-12 mb-2 text-blue-600" />
                    <span className="font-bold text-sm">মাহবুব আলম</span>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 text-xs font-medium backdrop-blur-xs">
                  <Maximize2 className="w-4 h-4" />
                  <span>ছবি বড় করুন</span>
                </div>
              </div>

              {/* Verified Author Badge */}
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2.5 rounded-xl shadow-lg flex items-center gap-1.5 ring-4 ring-white">
                <Award className="w-4 h-4" />
                <span className="text-[11px] font-semibold pr-1">গল্পকার</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 mt-3 flex items-center gap-1">
              <Feather className="w-3 h-3 text-blue-500" />
              <span>মাহবুব আলম · স্টাডি টেবিলে লেখার মুহূর্তে</span>
            </p>
          </div>

          {/* Profile Info & Bio Highlight */}
          <div className="md:col-span-7 space-y-4 text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
                <span>NovellaX NBS Founder</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 font-serif">
                মাহবুব আলম
              </h2>
              <p className="text-sm font-semibold text-gray-600 mt-1">
                Founder & Writer — NovellaX NBS
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-gray-500 pt-1">
              <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>কুমিল্লা (জন্মস্থান) · ঢাকা, কেরানীগঞ্জ</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                <GraduationCap className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>সপ্তম শ্রেণির শিক্ষার্থী</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                <BookOpen className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{writerStories.length} টি প্রকাশিত গল্প</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed font-serif pt-2">
              লেখালেখি আমার কাছে শুধু একটি শখ নয়; এটি আমার চিন্তা, কল্পনা ও অনুভূতিগুলো প্রকাশ করার একটি মাধ্যম। 
              আমার লক্ষ্য প্রতিটি গল্পপ্রেমী পাঠকের হৃদয়ে বিশুদ্ধ অনুভূতির দোলা দেওয়া।
            </p>
          </div>
        </div>
      </div>

      {/* 3. Detailed Authentic Founder Narrative */}
      <div className="bg-gradient-to-br from-blue-50/40 via-white to-white rounded-3xl border border-blue-100 p-6 sm:p-10 space-y-6 shadow-xs">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif flex items-center gap-2">
          <Heart className="w-5 h-5 text-blue-600" />
          <span>আমার কিছু কথা ও গল্প লেখার গল্প</span>
        </h3>

        <div className="text-sm sm:text-base text-gray-700 leading-loose space-y-5 font-serif">
          <p>
            আসসালামুয়ালাইকুম। কেমন আছেন সবাই? আশা করি সবাই ভালো আছেন। আমি মাহবুব আলম, NovellaX NBS-এর প্রতিষ্ঠাতা। ছোটবেলা থেকেই গল্প লিখতে এবং নিজের কল্পনাকে গল্পের মাধ্যমে প্রকাশ করতে ভালোবাসি। সেই ভালো লাগা থেকেই NovellaX NBS প্রতিষ্ঠার স্বপ্ন। আমার ইচ্ছা—আমি যে গল্পগুলো লিখি, সেগুলো যেন আপনাদের কাছে পৌঁছায় এবং আপনারা সেগুলো পড়ে আনন্দ, অনুভূতি ও ভালো লাগা খুঁজে পান।
          </p>

          <p>
            আমি বর্তমানে একজন শিক্ষার্থী এবং সপ্তম শ্রেণিতে পড়াশোনা করছি। আমার জন্মস্থান কুমিল্লা জেলা এবং বর্তমানে আমি ঢাকার কেরানীগঞ্জে বসবাস করছি। লেখালেখি আমার কাছে শুধু একটি শখ নয়; এটি আমার চিন্তা, কল্পনা ও অনুভূতিগুলো প্রকাশ করার একটি মাধ্যম।
          </p>

          <p>
            NovellaX NBS-এর মাধ্যমে আমি নিয়মিত গল্প ও উপন্যাস প্রকাশ করতে চাই। আপনাদের ভালোবাসা, মতামত ও উৎসাহই আমার লেখালেখির পথচলার সবচেয়ে বড় অনুপ্রেরণা। আশা করি NovellaX NBS-এর প্রতিটি গল্প আপনাদের হৃদয়ে ছোট্ট হলেও একটি অনুভূতির ছাপ রেখে যাবে।
          </p>

          <p className="font-semibold text-gray-900 pt-2">
            সবাইকে আন্তরিক ধন্যবাদ NovellaX NBS-এর সঙ্গে থাকার জন্য।
          </p>
        </div>

        {/* Signature Block */}
        <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">বিনীত,</p>
            <p className="text-base font-bold text-gray-900 font-serif">মাহবুব আলম</p>
            <p className="text-xs text-blue-600">NovellaX NBS</p>
          </div>
          <button
            onClick={() => navigateTo('contact')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>বার্তা পাঠান</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Stories by Mahbub Alam */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-serif">
            মাহবুব আলমের প্রকাশিত গল্প ও উপন্যাসসমূহ
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            সরাসরি ক্লিক করে পড়তে শুরু করুন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {writerStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* Photo Fullscreen Zoom Lightbox */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 text-white hover:bg-black rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={WRITER_IMAGE_URL}
              alt="মাহবুব আলম"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (e.currentTarget.src !== window.location.origin + WRITER_IMAGE_FALLBACK && !e.currentTarget.src.endsWith(WRITER_IMAGE_FALLBACK)) {
                  e.currentTarget.src = WRITER_IMAGE_FALLBACK;
                }
              }}
            />
            <div className="p-4 text-center">
              <h4 className="text-base font-bold text-gray-900 font-serif">মাহবুব আলম</h4>
              <p className="text-xs text-blue-600 font-medium">Founder & Writer — NovellaX NBS</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
