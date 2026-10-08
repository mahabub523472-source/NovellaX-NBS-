import React, { useState, useRef } from 'react';
import {
  X,
  Check,
  User,
  Sparkles,
  BookOpen,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Upload,
  Link as LinkIcon,
  Compass,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { USER_AVATARS } from '../data/avatars';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    registerUser,
    currentUser,
    bookmarkedStoryIds,
    readingProgress,
    navigateTo,
  } = useStory();

  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(USER_AVATARS[0].url);
  const [avatarCategory, setAvatarCategory] = useState<'সব' | 'ছেলে' | 'মেয়ে' | 'ফান'>('সব');
  const [avatarMode, setAvatarMode] = useState<'preset' | 'custom'>('preset');
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [bio, setBio] = useState('নভেলাএক্স এনবিএস এর নিয়মিত পাঠক');
  const [errorMessage, setErrorMessage] = useState('');
  const [successToast, setSuccessToast] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    if (window.location.pathname === '/profile') {
      try {
        window.history.replaceState({}, '', '/');
      } catch {
        // sandbox safe
      }
    }
  };

  const filteredAvatars = USER_AVATARS.filter(a => {
    if (avatarCategory === 'সব') return true;
    return a.category === avatarCategory;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('দয়া করে একটি সঠিক ছবি (JPG, PNG) নির্বাচন করুন');
      return;
    }

    const reader = new FileReader();
    reader.onload = event => {
      const result = event.target?.result as string;
      if (result) {
        setSelectedAvatar(result);
        setAvatarMode('custom');
        setErrorMessage('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    setSelectedAvatar(customUrlInput.trim());
    setAvatarMode('custom');
    setCustomUrlInput('');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('দয়া করে আপনার সুন্দর নামটি লিখুন!');
      return;
    }

    const created = registerUser(name, selectedAvatar, undefined, bio);
    setSuccessToast(`স্বাগতম ${created.name}! আপনার স্থায়ী পাঠক অ্যাকাউন্ট তৈরি হয়েছে।`);
    setTimeout(() => {
      setSuccessToast('');
      handleClose();
      setName('');
    }, 1300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={e => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] flex flex-col relative text-slate-100">
        {/* Toast inside modal */}
        {successToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl flex items-center gap-1.5 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              {currentUser ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-serif flex items-center gap-2">
                <span>{currentUser ? 'আমার স্থায়ী পাঠক পরিচয়পত্র' : 'পাঠক অ্যাকাউন্ট তৈরি করুন'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-semibold">
                  {currentUser ? '🔒 Permanent ID' : '১ পাঠক = ১ অ্যাকাউন্ট'}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {currentUser
                  ? 'আপনার প্রোফাইলটি স্থায়ী ও সুরক্ষিত (অপরিবর্তনযোগ্য)'
                  : 'একজন পাঠক কেবল একটি অ্যাকাউন্ট খুলতে পারবেন'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* CASE 1: USER ALREADY HAS AN ACCOUNT (PERMANENT ID CARD - NO EDIT / NO SWITCH) */}
        {currentUser ? (
          <div className="space-y-4 overflow-y-auto pr-1 flex-1">
            {/* Verified Digital Member ID Card */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/60 border border-blue-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden space-y-4">
              {/* Luminous Top Watermark & Accent */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-3 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>যাচাইকৃত পাঠক</span>
              </div>

              {/* Avatar + Main Details */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
                <div className="relative shrink-0">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-20 h-20 sm:w-22 sm:h-22 rounded-full object-cover ring-4 ring-blue-500/40 shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center ring-2 ring-slate-900 shadow-md">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 justify-center sm:justify-start">
                    <h4 className="text-lg sm:text-xl font-bold text-white font-serif">
                      {currentUser.name}
                    </h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-semibold">
                      <Lock className="w-2.5 h-2.5" />
                      <span>স্থায়ী মেম্বার</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 italic font-serif max-w-sm">
                    "{currentUser.bio || 'নভেলাএক্স এনবিএস এর নিয়মিত পাঠক'}"
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-[11px] text-slate-400">
                    <span>
                      আইডি: <strong className="text-slate-200 font-mono">#{currentUser.id.replace('user-', '')}</strong>
                    </span>
                    <span>·</span>
                    <span>নিবন্ধন: <strong className="text-slate-200">{currentUser.createdAt}</strong></span>
                  </div>
                </div>
              </div>

              {/* Reader Stats Bar */}
              <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80 text-center">
                <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                    <Bookmark className="w-3 h-3 text-blue-400" />
                    <span>সংরক্ষিত</span>
                  </div>
                  <div className="text-base font-bold text-white font-serif">
                    {bookmarkedStoryIds.length} টি
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                    <BookOpen className="w-3 h-3 text-indigo-400" />
                    <span>পড়ছেন</span>
                  </div>
                  <div className="text-base font-bold text-white font-serif">
                    {Object.keys(readingProgress).length} টি
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>স্ট্যাটাস</span>
                  </div>
                  <div className="text-base font-bold text-emerald-400 font-serif">
                    সক্রিয়
                  </div>
                </div>
              </div>
            </div>

            {/* Permanent Lock Notice */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                <Lock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>অ্যাকাউন্ট নীতিমালা ও নিরাপত্তা</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                NovellaX NBS নীতি অনুযায়ী একজন পাঠক শুধুমাত্র একটি অ্যাকাউন্ট খুলতে পারবেন। আপনার এই অ্যাকাউন্টটি স্থায়ী এবং এটি এডিট বা পরিবর্তন করা যাবে না। অন্য কোনো পাঠকের অ্যাকাউন্টে প্রবেশ বা লগইন করা নিষিদ্ধ।
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  navigateTo('bookmarks');
                }}
                className="py-2.5 px-4 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>সংরক্ষিত লাইব্রেরি</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleClose();
                  navigateTo('latest');
                }}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>নতুন গল্প পড়ুন</span>
              </button>
            </div>
          </div>
        ) : (
          /* CASE 2: FIRST TIME REGISTRATION (ONE-TIME ONLY) */
          <form onSubmit={handleRegister} className="space-y-4 overflow-y-auto pr-1 flex-1">
            {/* Warning Rule Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed space-y-1">
              <div className="flex items-center gap-2 font-bold text-amber-200">
                <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>বিশেষ নিয়মাবলী (এককালীন নিবন্ধন)</span>
              </div>
              <p className="text-[11px] text-amber-300/90">
                একজন পাঠক শুধু <strong>একটি অ্যাকাউন্ট</strong> খুলতে পারবেন। অ্যাকাউন্টটি একবার তৈরি হয়ে গেলে নাম বা ছবি পরবর্তীতে আর <strong>এডিট করা যাবে না</strong> এবং অন্য কোনো অ্যাকাউন্টে লগইন করা যাবে না। অনুগ্রহ করে সতর্কতার সাথে আপনার সঠিক তথ্য নির্বাচন করুন।
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                আপনার নাম (পূর্ণ নাম লিখুন) <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="যেমন: তানভীর আহমেদ / মেঘলা জাহান"
                className="w-full px-4 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                maxLength={40}
                required
              />
              <p className="text-[10px] text-slate-400 mt-1">
                ⚠️ এই নামটি পরবর্তীতে আর পরিবর্তন বা এডিট করা যাবে না।
              </p>
            </div>

            {/* Avatar Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">
                  প্রোফাইল অবতার ছবি নির্বাচন করুন <span className="text-rose-400">*</span>
                </label>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setAvatarMode('preset')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      avatarMode === 'preset'
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    অবতার গ্যালারি
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarMode('custom')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      avatarMode === 'custom'
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    কাস্টম ছবি
                  </button>
                </div>
              </div>

              {/* Mode A: Preset Avatars */}
              {avatarMode === 'preset' ? (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5">
                    {(['সব', 'ছেলে', 'মেয়ে', 'ফান'] as const).map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setAvatarCategory(cat)}
                        className={`text-[11px] px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                          avatarCategory === cat
                            ? 'bg-slate-800 text-blue-400 font-bold border border-blue-500/40'
                            : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 max-h-48 overflow-y-auto p-1 bg-slate-950 rounded-2xl border border-slate-800">
                    {filteredAvatars.map(avatar => {
                      const isSelected = selectedAvatar === avatar.url;
                      return (
                        <button
                          key={avatar.id}
                          type="button"
                          onClick={() => {
                            setSelectedAvatar(avatar.url);
                            setErrorMessage('');
                          }}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group cursor-pointer ${
                            isSelected
                              ? 'border-blue-500 ring-2 ring-blue-500/50 scale-95'
                              : 'border-slate-800 hover:border-slate-600 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={avatar.url}
                            alt={avatar.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center">
                              <Check className="w-5 h-5 text-white stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Mode B: Custom Upload or Link */
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedAvatar}
                      alt="Selected preview"
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500 shrink-0"
                    />
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-white">আপনার নিজস্ব ছবি দিন</p>
                      <p className="text-[10px] text-slate-400">
                        মোবাইল/কম্পিউটার থেকে আপলোড করুন অথবা ছবির লিঙ্ক দিন
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>ডিভাইস থেকে আপলোড</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        value={customUrlInput}
                        onChange={e => setCustomUrlInput(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className="w-full pl-8 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCustomUrl}
                      className="px-3 py-2 bg-slate-800 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      প্রয়োগ
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Bio Tag Pills */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                আপনার পছন্দের পরিচিতি (বায়ো)
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  'নভেলাএক্স এনবিএস এর নিয়মিত পাঠক',
                  'বইপোকা ও সাহিত্যপ্রেমী',
                  'রোমান্টিক গল্পের একনিষ্ঠ পাঠক',
                  'রহস্য ও থ্রিলার লাভার',
                ].map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBio(b)}
                    className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      bio === b
                        ? 'bg-blue-600 text-white border-blue-500 font-semibold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>একটি স্থায়ী অ্যাকাউন্ট খুলুন (Create Permanent Account)</span>
              </button>
            </div>
          </form>
        )}

        {/* Modal Footer */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>১ জন পাঠক = ১টি অপরিবর্তনযোগ্য অ্যাকাউন্ট</span>
          <button
            type="button"
            onClick={handleClose}
            className="hover:text-slate-300 cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
