import React from 'react';

interface BrandLogoProps {
  variant?: 'default' | 'compact' | 'white' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  showTagline = true,
}) => {
  const isWhite = variant === 'white';
  const isIconOnly = variant === 'icon-only';
  const isCompact = variant === 'compact';

  // Sizing definitions
  const dimensions = {
    sm: {
      icon: 'w-8 h-8',
      title: 'text-lg sm:text-xl',
      badge: 'text-[9px] px-1.5 py-0.5',
      tagline: 'text-[9px]',
    },
    md: {
      icon: 'w-10 h-10',
      title: 'text-xl sm:text-2xl',
      badge: 'text-[10px] px-2 py-0.5 tracking-wider',
      tagline: 'text-[11px]',
    },
    lg: {
      icon: 'w-12 h-12',
      title: 'text-2xl sm:text-3xl',
      badge: 'text-xs px-2.5 py-1 tracking-widest',
      tagline: 'text-xs',
    },
    xl: {
      icon: 'w-16 h-16',
      title: 'text-3xl sm:text-4xl',
      badge: 'text-sm px-3 py-1 tracking-widest',
      tagline: 'text-sm',
    },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* 1. Ultra-Luxurious Royal Literary Seal Insignia */}
      <div className={`relative ${dimensions.icon} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        {/* Ambient Halo Glow */}
        <div
          className={`absolute -inset-1 rounded-2xl opacity-30 blur-xs transition-opacity duration-300 group-hover:opacity-60 ${
            isWhite
              ? 'bg-gradient-to-r from-amber-400 via-blue-500 to-indigo-500'
              : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500'
          }`}
        />

        {/* Outer Beveled Luxury Seal Container */}
        <div
          className={`relative w-full h-full rounded-xl sm:rounded-2xl p-0.5 shadow-lg flex items-center justify-center overflow-hidden border ${
            isWhite
              ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border-amber-400/40 shadow-slate-950/80'
              : 'bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-amber-400/50 shadow-blue-950/30'
          }`}
        >
          {/* Subtle Inner Gold Rim Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-white/10 to-transparent pointer-events-none" />

          {/* Handcrafted Masterpiece SVG Emblem */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1 drop-shadow-md"
          >
            <defs>
              {/* 24K Royal Gold Gradient */}
              <linearGradient id="imperialGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1B8" />
                <stop offset="25%" stopColor="#F59E0B" />
                <stop offset="60%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>

              {/* Sapphire Velvet Gradient */}
              <linearGradient id="sapphireVelvet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>

              {/* Pure Pearl White Pages */}
              <linearGradient id="pearlWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>

              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Circular Ornate Gold Filigree Ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="url(#imperialGold)"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              opacity="0.8"
            />
            <circle
              cx="50"
              cy="50"
              r="41"
              stroke="url(#imperialGold)"
              strokeWidth="0.75"
              opacity="0.4"
            />

            {/* Left Manuscript Wing (Sculpted Open Book) */}
            <path
              d="M18 68C28 64 39 65 48 70V30C39 25 28 24 18 28V68Z"
              fill="url(#pearlWhite)"
              opacity="0.95"
            />
            {/* Left Page Layer Shadow Accent */}
            <path
              d="M18 68C28 64 39 65 48 70C39 67 28 66 18 70V68Z"
              fill="url(#imperialGold)"
              opacity="0.7"
            />

            {/* Right Manuscript Wing */}
            <path
              d="M82 68C72 64 61 65 52 70V30C61 25 72 24 82 28V68Z"
              fill="url(#pearlWhite)"
              opacity="0.95"
            />
            {/* Right Page Layer Shadow Accent */}
            <path
              d="M82 68C72 64 61 65 52 70C61 67 72 66 82 70V68Z"
              fill="url(#imperialGold)"
              opacity="0.7"
            />

            {/* Book Spine Golden Axis */}
            <line
              x1="50"
              y1="25"
              x2="50"
              y2="73"
              stroke="url(#imperialGold)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Central Master Fountain Pen Nib & Calligraphy 'N' Monogram */}
            <path
              d="M50 14L59 34L54 44L50 40L46 44L41 34L50 14Z"
              fill="url(#imperialGold)"
              filter="url(#softGlow)"
            />

            {/* Pen Ink Channel / Breath Hole */}
            <line
              x1="50"
              y1="18"
              x2="50"
              y2="34"
              stroke="#0B132B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="50" cy="34" r="1.5" fill="#0B132B" />

            {/* Brilliant Diamond Star Radiance */}
            <path
              d="M50 7L52 12L57 14L52 16L50 21L48 16L43 14L48 12L50 7Z"
              fill="#FFFFFF"
            />
            <circle cx="50" cy="14" r="1" fill="#FEF3C7" />

            {/* Subtle Royal Accent Dots */}
            <circle cx="30" cy="74" r="1.5" fill="url(#imperialGold)" />
            <circle cx="70" cy="74" r="1.5" fill="url(#imperialGold)" />
            <circle cx="50" cy="79" r="2" fill="url(#imperialGold)" />
          </svg>
        </div>
      </div>

      {/* 2. Brand Typography & Luxury Cartouche */}
      {!isIconOnly && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span
              className={`font-serif font-extrabold tracking-tight leading-none ${dimensions.title} ${
                isWhite ? 'text-white' : 'text-slate-950'
              }`}
            >
              Novella
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 font-sans ml-0.5">
                X
              </span>
            </span>

            {/* NBS Luxury Gold/Sapphire Jewel Cartouche */}
            <span
              className={`font-mono font-bold uppercase rounded-md inline-flex items-center shadow-xs transition-colors duration-200 ${dimensions.badge} ${
                isWhite
                  ? 'bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-indigo-500/20 text-amber-300 border border-amber-400/40'
                  : 'bg-gradient-to-r from-amber-50 via-blue-50 to-indigo-50 text-blue-900 border border-amber-300/60 shadow-amber-500/5'
              }`}
            >
              <span className="text-amber-500 mr-1 text-[8px] font-sans">✦</span>
              NBS
            </span>
          </div>

          {/* Literary Bengali Slogan */}
          {showTagline && !isCompact && (
            <span
              className={`font-serif tracking-normal mt-0.5 line-clamp-1 flex items-center gap-1.5 ${dimensions.tagline} ${
                isWhite ? 'text-slate-400' : 'text-slate-500 font-medium'
              }`}
            >
              <span>গল্পের পাতায়, অনুভূতির ছোঁয়ায়</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
