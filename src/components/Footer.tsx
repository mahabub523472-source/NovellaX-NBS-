import React from 'react';
import { BookOpen, Mail, Facebook, Instagram, Heart, Shield, Lock } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Footer: React.FC = () => {
  const { navigateTo, isAdminLoggedIn } = useStory();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pb-12 border-b border-gray-800">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                NovellaX NBS
              </span>
            </div>
            <p className="text-sm text-blue-400 font-serif font-medium">
              "গল্পের পাতায়, অনুভূতির ছোঁয়ায়"
            </p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              আপনার অবসর, আপনার অনুভূতি আর কিছু অসাধারণ গল্প—সবকিছু একসাথে NovellaX NBS-এ। 
              মৌলিক বাংলা সাহিত্য পাঠের এক অনন্য ঠিকানা।
            </p>
            <div className="pt-2 text-xs text-gray-400">
              <span>প্রতিষ্ঠাতা ও লেখক: </span>
              <strong className="text-gray-200">মাহবুব আলম</strong>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              ন্যাভিগেশন / Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-blue-400 transition-colors cursor-pointer py-1"
                >
                  Home (হোমপেজ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('latest')}
                  className="hover:text-blue-400 transition-colors cursor-pointer py-1"
                >
                  All Stories (সব গল্প)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('categories')}
                  className="hover:text-blue-400 transition-colors cursor-pointer py-1"
                >
                  Categories (ক্যাটাগরি)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('writer')}
                  className="hover:text-blue-400 transition-colors cursor-pointer py-1"
                >
                  Writer Introduction
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('rules')}
                  className="hover:text-blue-400 transition-colors cursor-pointer py-1"
                >
                  Rules / Policies
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-blue-400 transition-colors cursor-pointer py-1"
                >
                  Contact (যোগাযোগ)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Social & Community */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              সোশ্যাল মিডিয়া ও সংযোগ
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              নতুন গল্পের আপডেট ও সাহিত্য আড্ডায় যুক্ত থাকুন আমাদের সামাজিক মাধ্যমে।
            </p>
            <div className="flex items-center gap-3">
              {/* TikTok */}
              <button
                onClick={() => navigateTo('contact')}
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="TikTok"
              >
                <span className="text-xs font-bold font-serif">TT</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => navigateTo('contact')}
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>

              {/* Instagram */}
              <button
                onClick={() => navigateTo('contact')}
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>

              {/* Email */}
              <button
                onClick={() => navigateTo('contact')}
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>

            {/* Admin quick entry */}
            <div className="pt-2">
              <button
                onClick={() => navigateTo('admin')}
                className="text-xs text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isAdminLoggedIn ? (
                  <>
                    <Shield className="w-3.5 h-3.5 text-blue-400" />
                    <span>Admin Panel চালু আছে</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Admin Panel লগইন</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 NovellaX NBS. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for story lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
