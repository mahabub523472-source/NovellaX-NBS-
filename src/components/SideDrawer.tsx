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

export const SideDrawer: React.FC = () => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    navigateTo,
    currentPage,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
  } = useStory();

  const [showAdminPassModal, setShowAdminPassModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminError, setAdminError] = useState('');

  if (!isMenuOpen) return null;

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(adminPasswordInput);
    if (success) {
      setShowAdminPassModal(false);
      setAdminPasswordInput('');
      setAdminError('');
      setIsMenuOpen(false);
      navigateTo('admin');
    } else {
      setAdminError('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড লিখুন (ডিফল্ট: admin123)');
    }
  };

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
          <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 font-serif">NovellaX NBS</h2>
                <p className="text-xs text-gray-500">গল্পের পাতায়, অনুভূতির ছোঁয়ায়</p>
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content & Menu Items */}
          <div className="px-6 py-6 space-y-8 flex-1">
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

          {/* Drawer Footer & Admin Access */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
            {isAdminLoggedIn ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigateTo('admin');
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <span>Admin Dashboard খুলুন</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={logoutAdmin}
                  className="w-full py-2 px-4 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Admin Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAdminPassModal(true)}
                className="w-full py-2 px-3 text-xs text-gray-500 hover:text-blue-600 hover:bg-white rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-transparent hover:border-gray-200"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login (এডমিন প্রবেশ)</span>
              </button>
            )}

            <div className="text-center">
              <p className="text-xs text-gray-400">© 2026 NovellaX NBS. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Password Modal */}
      {showAdminPassModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-900">এডমিন লগইন</h3>
              </div>
              <button
                onClick={() => {
                  setShowAdminPassModal(false);
                  setAdminError('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-600">
              শুধুমাত্র ওয়েবসাইট অ্যাডমিনের জন্য গল্প ও অধ্যায় সম্পাদনা প্যানেল।
            </p>

            <form onSubmit={handleAdminLoginSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  এডমিন পাসওয়ার্ড (/adminsahid09)
                </label>
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={e => setAdminPasswordInput(e.target.value)}
                  placeholder="পাসওয়ার্ড লিখুন..."
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                />
              </div>

              {adminError && <p className="text-xs text-red-600">{adminError}</p>}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminPassModal(false)}
                  className="flex-1 py-2 px-3 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  প্রবেশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
