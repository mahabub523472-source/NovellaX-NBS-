import React, { useRef, useState, useEffect } from 'react';
import {
  Sparkles,
  Mail,
  Facebook,
  Instagram,
  Send,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { WhatsAppIcon, formatWhatsAppUrl } from './WhatsAppIcon';

interface Interactive3DContactCardProps {
  className?: string;
  onCtaClick?: () => void;
  ctaText?: string;
}

export const Interactive3DContactCard: React.FC<Interactive3DContactCardProps> = ({
  className = '',
  onCtaClick,
  ctaText = 'সরাসরি বার্তা পাঠান',
}) => {
  const { contactInfo, navigateTo } = useStory();
  const cardRef = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(true);
  const rafRef = useRef<number | null>(null);

  // Detect touch devices to disable cursor tilt tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
      setCanHover(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !canHover) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalized coordinates from -1 to 1
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    // Smooth tilt bounded to approx 8–10 degrees
    // Mouse moves left (percentX < 0) -> tilts left (rotateY < 0)
    // Mouse moves right (percentX > 0) -> tilts right (rotateY > 0)
    // Mouse moves up (percentY < 0) -> tilts upward (rotateX > 0)
    // Mouse moves down (percentY > 0) -> tilts downward (rotateX < 0)
    const rotateX = -percentY * 9.5;
    const rotateY = percentX * 9.5;

    // Glare coordinates
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    // Dynamic physical shadow offset
    const shadowX = -rotateY * 1.5;
    const shadowY = rotateX * 1.5 + 20;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.boxShadow = `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 42px -8px rgba(2, 6, 23, 0.75), 0 0 30px rgba(13, 110, 253, 0.25)`;

      card.style.setProperty('--mouse-x', `${glareX.toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${glareY.toFixed(1)}%`);
      card.style.setProperty('--glare-opacity', '1');
    });
  };

  const handleMouseEnter = () => {
    if (!canHover || !cardRef.current) return;
    cardRef.current.style.transition = 'transform 80ms ease-out, box-shadow 120ms ease-out';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const card = cardRef.current;
    // Elegant reset animation 400-600ms
    card.style.transition = 'transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 500ms cubic-bezier(0.2, 0.8, 0.2, 1)';
    card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = '0 20px 35px -8px rgba(2, 6, 23, 0.5), 0 0 25px rgba(13, 110, 253, 0.2)';
    card.style.setProperty('--glare-opacity', '0');
  };

  const socialChannels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      subtitle: 'সরাসরি চ্যাট',
      href: formatWhatsAppUrl(contactInfo?.whatsapp),
      target: contactInfo?.whatsapp ? '_blank' : undefined,
      onClick: (e: React.MouseEvent) => !contactInfo?.whatsapp && e.preventDefault(),
      icon: (
        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/25 group-hover:shadow-emerald-500/40 group-hover:bg-emerald-400 transition-all duration-300">
          <WhatsAppIcon className="w-5 h-5 fill-current" />
        </div>
      ),
      hoverBorder: 'hover:border-emerald-500/60',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]',
      hoverText: 'group-hover:text-emerald-400',
      mobileSpan: '',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      subtitle: 'অফিশিয়াল পেজ',
      href: contactInfo?.facebook || '#',
      target: contactInfo?.facebook ? '_blank' : undefined,
      onClick: (e: React.MouseEvent) => !contactInfo?.facebook && e.preventDefault(),
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:bg-[#2084ff] transition-all duration-300">
          <Facebook className="w-5 h-5" />
        </div>
      ),
      hoverBorder: 'hover:border-blue-500/60',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(24,119,242,0.25)]',
      hoverText: 'group-hover:text-blue-400',
      mobileSpan: '',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      subtitle: 'ভিডিও ও আপডেট',
      href: contactInfo?.tiktok || '#',
      target: contactInfo?.tiktok ? '_blank' : undefined,
      onClick: (e: React.MouseEvent) => !contactInfo?.tiktok && e.preventDefault(),
      icon: (
        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700/80 text-white flex items-center justify-center shrink-0 shadow-md group-hover:border-cyan-400/60 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all duration-300 font-serif font-black text-xs">
          TT
        </div>
      ),
      hoverBorder: 'hover:border-slate-500/70',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]',
      hoverText: 'group-hover:text-white',
      mobileSpan: '',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      subtitle: 'ফটো ও আপডেট',
      href: contactInfo?.instagram || '#',
      target: contactInfo?.instagram ? '_blank' : undefined,
      onClick: (e: React.MouseEvent) => !contactInfo?.instagram && e.preventDefault(),
      icon: (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-500/25 group-hover:shadow-rose-500/40 group-hover:scale-105 transition-all duration-300">
          <Instagram className="w-5 h-5" />
        </div>
      ),
      hoverBorder: 'hover:border-rose-500/60',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(225,48,108,0.25)]',
      hoverText: 'group-hover:text-rose-400',
      mobileSpan: '',
    },
    {
      id: 'email',
      name: 'Email',
      subtitle: 'সরাসরি ইমেইল',
      href: contactInfo?.email
        ? contactInfo.email.startsWith('mailto:')
          ? contactInfo.email
          : `mailto:${contactInfo.email}`
        : '#',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300">
          <Mail className="w-5 h-5" />
        </div>
      ),
      hoverBorder: 'hover:border-indigo-500/60',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]',
      hoverText: 'group-hover:text-indigo-400',
      mobileSpan: 'col-span-2 sm:col-span-1',
    },
  ];

  return (
    <div
      className={`w-full py-2 [perspective:1200px] select-none ${className}`}
      style={{ WebkitPerspective: 1200 }}
    >
      {/* 3D Physical Floating Contact Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          boxShadow: '0 20px 35px -8px rgba(2, 6, 23, 0.5), 0 0 25px rgba(13, 110, 253, 0.2)',
        }}
        className="relative w-full rounded-3xl p-5 sm:p-7 lg:p-9 bg-gradient-to-br from-[#0F172A] via-[#111D36] to-[#0A101E] border border-blue-500/25 transition-all duration-500 overflow-hidden"
      >
        {/* Layer 1: Ambient Background Atmosphere & Cursor Glare (translateZ 0px) */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Subtle Deep Navy / Blue Glow Accents */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Glare following mouse position */}
          <div
            className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
            style={{
              opacity: 'var(--glare-opacity, 0)',
              background:
                'radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.15), transparent 38%)',
            }}
          />
        </div>

        {/* 3D Depth Layer Stack */}
        <div className="relative z-10 flex flex-col gap-6 sm:gap-7">
          {/* Layer 2 & 3: Logo, Brand & Title (translateZ 20px - 30px) */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-700/60"
            style={{
              transform: 'translateZ(28px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Logo / Emblem (Layer 2: translateZ 20px) */}
            <div className="flex items-center gap-3.5">
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#0D6EFD] to-indigo-500 p-0.5 shadow-lg shadow-blue-500/30 flex items-center justify-center shrink-0"
                style={{ transform: 'translateZ(20px)' }}
              >
                <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
              </div>

              {/* Title & Brand (Layer 3: translateZ 30px) */}
              <div style={{ transform: 'translateZ(30px)' }}>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-blue-400 font-serif">
                    NovellaX NBS
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/25">
                    <ShieldCheck className="w-3 h-3 text-blue-400" />
                    অফিশিয়াল
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-white font-serif tracking-tight mt-0.5">
                  আমার সাথে সরাসরি যোগাযোগ করুন
                </h3>
              </div>
            </div>

            {/* Sub-label */}
            <div className="text-xs text-slate-400 sm:text-right font-medium max-w-xs">
              গল্প সম্পর্কে আপনার প্রতিক্রিয়া জানাতে বা যেকোনো প্রয়োজনে সরাসরি নিচের মাধ্যমে যোগাযোগ করতে পারেন:
            </div>
          </div>

          {/* Layer 4: Social Icons 3D Grid (translateZ 25px) */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
            style={{
              transform: 'translateZ(25px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {socialChannels.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target={item.target}
                rel="noopener noreferrer"
                onClick={item.onClick}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(10px)',
                }}
                className={`group relative p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 ${item.hoverBorder} ${item.hoverGlow} ${item.mobileSpan} transition-all duration-300 ease-out flex flex-col items-center text-center gap-2.5 cursor-pointer hover:-translate-y-1 hover:scale-[1.08]`}
              >
                {/* 3D Elevated Icon with subtle bounce/lift on hover */}
                <div
                  className="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1"
                  style={{ transform: 'translateZ(18px)' }}
                >
                  {item.icon}
                </div>

                {/* Text Labels */}
                <div
                  className="w-full min-w-0"
                  style={{ transform: 'translateZ(12px)' }}
                >
                  <p
                    className={`text-xs sm:text-sm font-bold text-white transition-colors duration-200 ${item.hoverText} truncate`}
                  >
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-400 group-hover:text-slate-300 truncate mt-0.5 font-medium">
                    {item.subtitle}
                  </p>
                </div>

                {/* External link hint */}
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-slate-400">
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>

          {/* Layer 5: Bottom CTA Button "সরাসরি বার্তা পাঠান" (translateZ 35px) */}
          <div
            className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80"
            style={{
              transform: 'translateZ(35px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="text-xs text-slate-400 text-center sm:text-left">
              সাহিত্য সম্পর্কিত প্রশ্ন বা পাঠ প্রতিক্রিয়া সরাসরি পাঠাতে পারেন
            </div>

            <button
              onClick={() => {
                if (onCtaClick) {
                  onCtaClick();
                } else {
                  navigateTo('contact');
                }
              }}
              style={{
                transform: 'translateZ(14px)',
              }}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#0D6EFD] via-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(13,110,253,0.35)] hover:shadow-[0_0_28px_rgba(13,110,253,0.55)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{ctaText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
