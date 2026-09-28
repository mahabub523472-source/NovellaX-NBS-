import React from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, Copyright } from 'lucide-react';

export const RulesPage: React.FC = () => {
  const allowedRules = [
    'প্রকাশিত সকল গল্প ও উপন্যাস বিনামূল্যে পাঠ করা।',
    'NovellaX NBS-এর গল্পের লিংক বন্ধুদের সাথে শেয়ার করা।',
    'ফেসবুক, হোয়াটসঅ্যাপ সহ বিভিন্ন সোশ্যাল মিডিয়ায় ওয়েবসাইটের লিংক শেয়ার করা।',
    'গল্প সম্পর্কে গঠনমূলক মতামত, পর্যালোচনা ও প্রতিক্রিয়া জানানো।',
    'গল্প সম্পর্কিত যেকোনো তথ্যের জন্য সরাসরি ওয়েবসাইট কর্তৃপক্ষের সঙ্গে যোগাযোগ করা।',
  ];

  const prohibitedRules = [
    'অনুমতি ছাড়া NovellaX NBS-এর গল্প বা উপন্যাস কপি করা।',
    'অনুমতি ছাড়া অন্য কোনো website, Facebook page, group, blog বা platform-এ সম্পূর্ণ গল্প পুনরায় পোস্ট করা।',
    'গল্পের লেখক বা NovellaX NBS-এর নাম বাদ দিয়ে কনটেন্ট প্রকাশ করা।',
    'গল্প পরিবর্তন করে নিজের নামে প্রকাশ করা।',
    'গল্পের screenshot বা PDF তৈরি করে অনুমতি ছাড়া বিতরণ করা।',
    'Website-এর content ব্যবহার করে বাণিজ্যিক উদ্দেশ্যে প্রকাশ করা।',
    'অন্য কোনো ব্যক্তির লেখা নিজের লেখা হিসেবে দাবি করা।',
    'Website-এ spam, abusive content বা inappropriate content প্রচার করা।',
    'Website-এর security বা functionality ক্ষতিগ্রস্ত করার চেষ্টা করা।',
    'Website-এর কোনো content ব্যবহার করে copyright infringement করা।',
  ];

  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>নীতিমালা ও কপিরাইট</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 font-serif">
          Rules / Terms of Policy
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-serif leading-relaxed">
          NovellaX NBS একটি গল্প ও উপন্যাস প্রকাশের প্ল্যাটফর্ম। পাঠকদের জন্য সুন্দর, নিরাপদ ও সম্মানজনক পরিবেশ বজায় রাখতে নিচের নিয়মগুলো অনুসরণ করা আবশ্যক।
        </p>
      </div>

      {/* Allowed Activities */}
      <section className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-emerald-700">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-serif">যা যা অনুমোদিত (Allowed)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {allowedRules.map((rule, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/40 text-xs sm:text-sm text-gray-700 leading-relaxed font-serif"
            >
              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Prohibited Activities (10 Points) */}
      <section className="bg-white rounded-3xl border border-red-100 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-red-700">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-serif">কঠোরভাবে নিষিদ্ধ (Prohibited)</h2>
        </div>

        <p className="text-xs text-gray-500 font-medium">
          নিচের কাজগুলো আইনত দণ্ডনীয় এবং NovellaX NBS-এর নীতির পরিপন্থী:
        </p>

        <div className="space-y-2.5 pt-1">
          {prohibitedRules.map((rule, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-red-50/40 text-xs sm:text-sm text-gray-800 leading-relaxed font-serif border border-red-100/50"
            >
              <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Important Copyright Notice */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 sm:p-6 space-y-2 text-amber-900">
        <div className="flex items-center gap-2 text-sm font-bold">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <span>বিশেষ সতর্কবার্তা ও কপিরাইট অধিকার</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed font-serif">
          "NovellaX NBS-এর কোনো গল্প বা উপন্যাস অনুমতি ছাড়া কপি, পুনঃপ্রকাশ, বিক্রি বা অন্য কোনো মাধ্যমে বিতরণ করা সম্পূর্ণ নিষিদ্ধ।"
        </p>
      </div>

      {/* Legal Copyright Footer */}
      <div className="text-center py-4 border-t border-gray-100 space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium">
          <Copyright className="w-3.5 h-3.5" />
          <span>NovellaX NBS — All Rights Reserved.</span>
        </div>
        <p className="text-[11px] text-gray-400">সর্বস্বত্ব স্বত্বাধিকারী কর্তৃক সংরক্ষিত।</p>
      </div>
    </div>
  );
};
