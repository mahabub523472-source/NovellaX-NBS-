import React, { useState } from 'react';
import {
  X,
  User,
  ShieldAlert,
  Mail,
  Home,
  Layers,
  Bookmark,
  BookOpen,
  ChevronRight,
  Lock,
  LogOut,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { BrandLogo } from './BrandLogo';

export const SideDrawer: React.FC = () => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    navigateTo,
    currentPage,
    currentUser,
    setIsAuthModalOpen,
    logoutUser,
  } = useStory();

  if (!isMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigateTo('home');
              }}
              className="text-left cursor-pointer focus:outline-hidden"
            >
              <BrandLogo size="sm" />
            </button>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content & Menu Items */}
          <div className="px-6 py-6 space-y-6 flex-1">
            {/* User Account Status Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 space-y-3">
              {currentUser ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-gray-900 text-sm font-serif">
                          {currentUser.name}
                        </h4>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-semibold">
                          পাঠক
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{currentUser.bio || 'NovellaX মেম্বার'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="p-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  >
                    প্রোফাইল
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs font-serif">
                      পাঠক অ্যাকাউন্টে যুক্ত হন
                    </h4>
                    <p className="text-[11px] text-gray-600">
                      ১৮টি অবতার থেকে যেকোনো একটি ছবি ও নাম দিয়ে সহজে যোগ দিন
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs shrink-0 cursor-pointer"
                  >
                    অ্যাকাউন্ট খুলুন
                  </button>
                </div>
              )}
            </div>
            {/* Primary Required Navigation Items */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                মূল মেনু / Main Options
              </p>

              {/* 1. Writer Introduction / লেখক পরিচিতি */}
              <button
                onClick={() => {
                  navigateTo('writer');
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                  currentPage === 'writer'
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold block">Writer Introduction</span>
                    <span className="text-xs text-gray-500">লেখক পরিচিতি (মাহবুব আলম)</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              {/* 2. Rules / Terms of Policy */}
              <button
                onClick={() => {
                  navigateTo('rules');
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                  currentPage === 'rules'
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold block">Rules / Terms of Policy</span>
                    <span className="text-xs text-gray-500">নীতিমালা ও কপিরাইট নির্দেশিকা</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              {/* 3. Contact */}
              <button
                onClick={() => {
                  navigateTo('contact');
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                  currentPage === 'contact'
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold block">Contact</span>
                    <span className="text-xs text-gray-500">যোগাযোগ ও সোশ্যাল মিডিয়া</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Quick Explore Section */}
            <div className="space-y-1.5 pt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                দ্রুত প্রবেশ / Quick Links
              </p>

              <button
                onClick={() => {
                  navigateTo('home');
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4 text-gray-400" />
                <span>হোমপেজ (Home)</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('categories');
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4 text-gray-400" />
                <span>গল্পের ক্যাটাগরি (Categories)</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('bookmarks');
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Bookmark className="w-4 h-4 text-gray-400" />
                <span>সংরক্ষিত গল্প (Saved Bookmarks)</span>
              </button>
            </div>

            {/* Quote Card */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NovellaX NBS বিশেষ ভাবনা</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed italic">
                "প্রতিটি গল্পের আড়ালে লুকিয়ে থাকে একজন গল্পকারের অনুভূতি, কিছু না বলা কথা এবং কল্পনার এক নিজস্ব জগৎ।"
              </p>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigateTo('rules');
                }}
                className="hover:text-blue-600 transition-colors"
              >
                নীতিমালা ও নিয়মাবলী
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigateTo('contact');
                }}
                className="hover:text-blue-600 transition-colors"
              >
                যোগাযোগ
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-[11px] text-gray-400">© 2026 NovellaX NBS. সর্বস্বত্ব সংরক্ষিত।</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
