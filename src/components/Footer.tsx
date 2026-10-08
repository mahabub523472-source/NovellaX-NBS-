import React from 'react';
import { Mail, Facebook, Instagram, Heart, Sparkles, Feather, BookOpen } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon, formatWhatsAppUrl } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  const { navigateTo, contactInfo } = useStory();

  return (
    <footer className="bg-gradient-to-b from-slate-50 via-white to-blue-50/30 border-t border-slate-200/80 text-slate-600 pt-12 pb-24 sm:pb-16 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pb-10 border-b border-slate-200/70">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <button
              onClick={() => navigateTo('home')}
              className="text-left cursor-pointer focus:outline-hidden block"
            >
              <BrandLogo variant="default" size="md" />
            </button>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-serif">
              আপনার অবসর, আপনার অনুভূতি আর কিছু অসাধারণ গল্প—সবকিছু একসাথে NovellaX NBS-এ। 
              মৌলিক বাংলা সাহিত্য পাঠের এক অনন্য উন্মুক্ত প্ল্যাটফর্ম।
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>প্রতিষ্ঠাতা ও গল্পকার: </span>
              <strong className="text-slate-800 font-semibold font-serif">মাহবুব আলম</strong>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>দ্রুত লিঙ্ক / Navigation</span>
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-blue-600 transition-colors cursor-pointer py-1 text-left"
                >
                  হোমপেজ (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('latest')}
                  className="hover:text-blue-600 transition-colors cursor-pointer py-1 text-left"
                >
                  নতুন গল্প (Latest)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('popular')}
                  className="hover:text-blue-600 transition-colors cursor-pointer py-1 text-left"
                >
                  জনপ্রিয় গল্প (Popular)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('categories')}
                  className="hover:text-blue-600 transition-colors cursor-pointer py-1 text-left"
                >
                  ক্যাটাগরি (Genres)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('writer')}
                  className="hover:text-blue-600 transition-colors cursor-pointer py-1 text-left"
                >
                  লেখক পরিচিতি (Author)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('rules')}
                  className="hover:text-blue-600 transition-colors cursor-pointer py-1 text-left"
                >
                  নীতিমালা (Policies)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-blue-600 transition-colors cursor-pointer py-1 text-left"
                >
                  যোগাযোগ (Contact)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('bookmarks')}
                  className="hover:text-blue-600 transition-colors cursor-pointer py-1 text-left"
                >
                  সংরক্ষিত গল্প
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Social & Community */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>সোশ্যাল মিডিয়া ও সংযোগ</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              নতুন গল্পের আপডেট ও সাহিত্য আড্ডায় যুক্ত থাকুন আমাদের সামাজিক মাধ্যমে।
            </p>
            <div className="flex items-center gap-2.5">
              {/* WhatsApp */}
              {contactInfo.whatsapp ? (
                <a
                  href={formatWhatsAppUrl(contactInfo.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-500 text-slate-700 hover:text-white border border-slate-200 hover:border-emerald-500 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="WhatsApp Chat"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                </a>
              ) : (
                <button
                  onClick={() => navigateTo('contact')}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-500 text-slate-700 hover:text-white border border-slate-200 hover:border-emerald-500 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                </button>
              )}

              {/* Facebook */}
              {contactInfo.facebook ? (
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-blue-600 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              ) : (
                <button
                  onClick={() => navigateTo('contact')}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-blue-600 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
              )}

              {/* TikTok */}
              {contactInfo.tiktok ? (
                <a
                  href={contactInfo.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-black text-slate-700 hover:text-white border border-slate-200 hover:border-black flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="TikTok"
                >
                  <span className="text-xs font-bold font-serif">TT</span>
                </a>
              ) : (
                <button
                  onClick={() => navigateTo('contact')}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-black text-slate-700 hover:text-white border border-slate-200 hover:border-black flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="TikTok"
                >
                  <span className="text-xs font-bold font-serif">TT</span>
                </button>
              )}

              {/* Instagram */}
              {contactInfo.instagram ? (
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-slate-700 hover:text-white border border-slate-200 hover:border-transparent flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              ) : (
                <button
                  onClick={() => navigateTo('contact')}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-slate-700 hover:text-white border border-slate-200 hover:border-transparent flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </button>
              )}

              {/* Email */}
              <a
                href={contactInfo.email ? (contactInfo.email.startsWith('mailto:') ? contactInfo.email : `mailto:${contactInfo.email}`) : 'mailto:contact@novellaxnbs.app'}
                className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-600 text-slate-700 hover:text-white border border-slate-200 hover:border-emerald-600 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 NovellaX NBS. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for Bengali story lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
