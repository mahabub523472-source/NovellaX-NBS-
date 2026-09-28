import React, { useState } from 'react';
import { X, Copy, Check, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, url }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${url}`)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-gray-900">শেয়ার করুন</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">গল্পের শিরোনাম:</p>
          <p className="text-sm font-medium text-gray-900 line-clamp-1">{title}</p>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={shareToFacebook}
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer group"
          >
            <Facebook className="w-5 h-5 text-blue-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-gray-700">Facebook</span>
          </button>

          <button
            onClick={shareToWhatsApp}
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 transition-colors cursor-pointer group"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-gray-700">WhatsApp</span>
          </button>

          <button
            onClick={shareToTwitter}
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 hover:bg-sky-50 hover:border-sky-300 transition-colors cursor-pointer group"
          >
            <Twitter className="w-5 h-5 text-sky-500 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-gray-700">Twitter / X</span>
          </button>
        </div>

        {/* Copy Link Field */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">সরাসরি লিংক কপি করুন:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:outline-hidden truncate"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>কপি হয়েছে</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>কপি</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
