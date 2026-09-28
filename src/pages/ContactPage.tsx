import React, { useState } from 'react';
import { Mail, Facebook, Instagram, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setFormSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactChannels = [
    {
      name: 'TikTok',
      id: 'tiktok',
      badge: 'ভিডিও ও শর্টস',
      description: 'গল্পের আকর্ষণীয় অডিও-ভিজ্যুয়াল ট্রেলার ও আপডেট দেখতে ফলো করুন।',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold font-serif text-sm">
          TT
        </div>
      ),
      actionText: 'যোগাযোগ করুন →',
      linkUrl: '#',
    },
    {
      name: 'Facebook',
      id: 'facebook',
      badge: 'অফিশিয়াল পেজ',
      description: 'গল্পের নতুন আপডেট, পাঠকদের রিভিউ ও সরাসরি মেসেজ পাঠানোর মাধ্যম।',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
          <Facebook className="w-5 h-5" />
        </div>
      ),
      actionText: 'যোগাযোগ করুন →',
      linkUrl: '#',
    },
    {
      name: 'Instagram',
      id: 'instagram',
      badge: 'ফটো ও কোটস',
      description: 'গল্পের সেরা কোটেশন, বুক কভার আর্ট ও সাহিত্য আড্ডায় যুক্ত হন।',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center">
          <Instagram className="w-5 h-5" />
        </div>
      ),
      actionText: 'যোগাযোগ করুন →',
      linkUrl: '#',
    },
    {
      name: 'Email',
      id: 'email',
      badge: 'অফিসিয়াল যোগাযোগ',
      description: 'যেকোনো ব্যক্তিগত বার্তা, পরামর্শ বা সহযোগিতার জন্য সরাসরি ইমেইল করুন।',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
          <Mail className="w-5 h-5" />
        </div>
      ),
      actionText: 'যোগাযোগ করুন →',
      linkUrl: 'mailto:contact@novellaxnbs.app',
    },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>আমাদের সাথে যুক্ত থাকুন</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 font-serif">
          যোগাযোগ করুন
        </h1>
        <p className="text-sm sm:text-base text-gray-600 font-serif leading-relaxed">
          "আপনার গল্প NovellaX NBS-এ প্রকাশ করতে কিংবা যেকোনো প্রয়োজনে আমাদের সঙ্গে যোগাযোগ করুন। আপনার মতামত, পরামর্শ ও সহযোগিতা আমাদের জন্য অত্যন্ত গুরুত্বপূর্ণ।"
        </p>
      </div>

      {/* 4 Premium Contact Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {contactChannels.map(channel => (
          <div
            key={channel.id}
            className="p-6 bg-white rounded-2xl border border-gray-200/80 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {channel.icon}
                <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2.5 py-1 rounded-md">
                  {channel.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-serif">{channel.name}</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-serif">
                {channel.description}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-gray-100">
              <a
                href={channel.linkUrl}
                onClick={e => {
                  if (channel.linkUrl === '#') {
                    e.preventDefault();
                    alert(`${channel.name} লিঙ্ক শীঘ্রই সংযুক্ত করা হবে।`);
                  }
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 group-hover:text-blue-800 transition-colors"
              >
                <span>{channel.actionText}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Message Sending Form */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-serif">সরাসরি বার্তা পাঠান</h2>
            <p className="text-xs text-gray-500">আপনার বার্তাটি সরাসরি সম্পাদকের কাছে পৌঁছাবে</p>
          </div>
        </div>

        {formSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-emerald-900">ধন্যবাদ! বার্তাটি সফলভাবে পাঠানো হয়েছে।</h3>
            <p className="text-xs text-emerald-700">
              আমরা দ্রুত আপনার বার্তার উত্তর দেওয়ার চেষ্টা করব।
            </p>
            <button
              onClick={() => setFormSubmitted(false)}
              className="mt-3 text-xs font-semibold text-emerald-800 underline cursor-pointer"
            >
              আরেকটি বার্তা পাঠান
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  আপনার নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: সাকিব আহমেদ"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  ইমেইল ঠিকানা (ঐচ্ছিক)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                বিষয়
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                placeholder="যেমন: নতুন গল্প সম্পর্কে মতামত / প্রশংসা"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                আপনার বার্তা বা অনুভূতি <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="আপনার মতামত বিস্তারিত লিখুন..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>বার্তা পাঠান</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
