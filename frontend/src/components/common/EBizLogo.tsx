import React from 'react';

interface EBizLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
  iconOnly?: boolean;
}

export const EBizLogo: React.FC<EBizLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  subtitleText = 'ebiznetworking.com',
  className = '',
  iconOnly = false,
}) => {
  const isDark = variant === 'dark';

  // Sizing scales
  const dimensions = {
    sm: { icon: 32, text: 'text-lg', sub: 'text-[8.5px]', height: 'h-8' },
    md: { icon: 42, text: 'text-2xl', sub: 'text-[9.5px]', height: 'h-10' },
    lg: { icon: 54, text: 'text-3xl', sub: 'text-[11px]', height: 'h-12' },
    xl: { icon: 66, text: 'text-4xl', sub: 'text-[13px]', height: 'h-16' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 1. Ultra-Modern Geometric 3D Hexagonal Nexus Mark */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={dimensions.icon}
          height={dimensions.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(0,229,255,0.22)]"
        >
          <defs>
            {/* Primary Electric Cyan to Cobalt Ribbon */}
            <linearGradient id="nexusCyanBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F5FF" />
              <stop offset="55%" stopColor="#0072FF" />
              <stop offset="100%" stopColor="#0B2046" />
            </linearGradient>

            {/* Deep Royal Sapphire to Indigo Ribbon */}
            <linearGradient id="nexusRoyalIndigo" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </linearGradient>

            {/* Radiant Emerald to Cyan Escrow Trust Accent */}
            <linearGradient id="nexusEmeraldCyan" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#00F5FF" />
            </linearGradient>

            {/* Core Node Glow Filter */}
            <filter id="coreGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Outer Geometric Shield / Hexagonal Nexus Shell */}
          {/* Isometric Facet 1: Upper-Right Folding Wing ('e' loop contour) */}
          <path
            d="M 50 12 L 84 31 L 84 59 L 66 48 L 66 33 L 50 24 Z"
            fill="url(#nexusCyanBlue)"
          />

          {/* Isometric Facet 2: Bottom Interlocking Foundation Ribbon ('N' lower fold) */}
          <path
            d="M 84 59 L 50 79 L 16 59 L 16 40 L 34 51 L 34 66 L 50 73 L 66 64 L 66 48 L 84 59 Z"
            fill="url(#nexusRoyalIndigo)"
          />

          {/* Isometric Facet 3: Upper-Left & Diagonal Cross-Bridge ('N' diagonal node) */}
          <path
            d="M 50 12 L 50 24 L 34 33 L 34 51 L 16 40 L 16 31 Z"
            fill="url(#nexusEmeraldCyan)"
          />
          <path
            d="M 34 33 L 66 51 L 66 64 L 50 73 L 50 61 L 50 46 L 34 37 Z"
            fill="url(#nexusCyanBlue)"
            opacity="0.92"
          />

          {/* 2. Central Luminescent Escrow Consensus Core */}
          <circle cx="50" cy="46" r="6" fill="#00F5FF" opacity="0.4" filter="url(#coreGlow)" />
          <circle cx="50" cy="46" r="4.2" fill="#00F5FF" />
          <circle cx="50" cy="46" r="2.2" fill="#FFFFFF" />

          {/* 3. Interconnected Geometric Satellite Nodes (UAE & Global Network) */}
          <circle cx="50" cy="12" r="3.2" fill="#00F5FF" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="84" cy="31" r="3.2" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="84" cy="59" r="3.2" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="50" cy="79" r="3.2" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="16" cy="59" r="3.2" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="16" cy="31" r="3.2" fill="#00F5FF" stroke="#FFFFFF" strokeWidth="1" />
        </svg>
      </div>

      {/* 2. Brand Typography: 'e' + 'biz' + 'NETWORKING' */}
      {!iconOnly && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline font-black tracking-tight">
            {/* The vibrant gradient 'e' */}
            <span className="bg-gradient-to-r from-[#00F5FF] via-[#00A3FF] to-[#0066FF] bg-clip-text text-transparent font-extrabold text-[1.18em]">
              e
            </span>
            {/* The bold corporate 'Biz' */}
            <span
              className={`font-black tracking-tight ${
                isDark ? 'text-white' : 'text-[#07182F]'
              } ${dimensions.text}`}
            >
              Biz
            </span>
            {/* Radiant glowing status node */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] shadow-[0_0_8px_#00F5FF] ml-1 mb-1 animate-pulse" />
          </div>

          {/* 'N E T W O R K I N G' sub-brand with elegant wide tracking */}
          <div className="flex items-center justify-between mt-0.5">
            <span
              className={`font-black tracking-[0.32em] uppercase ${
                isDark ? 'text-[#38BDF8]' : 'text-[#0284C7]'
              } ${dimensions.sub}`}
            >
              NETWORKING
            </span>
          </div>

          {showSubtitle && (
            <span
              className={`text-[8px] font-mono tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              } uppercase mt-0.5`}
            >
              {subtitleText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
