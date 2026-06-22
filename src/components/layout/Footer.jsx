import React from 'react';
import { TRANSLATIONS } from '../../data/translations';

export default function Footer({ lang }) {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="w-full bg-[#07080b] border-t border-[#1c1e24] py-12 flex flex-col items-center justify-center space-y-4 relative z-10">
      
      {/* Logo Curta (logo2.png) Centralizada e AUMENTADA */}
      <div className="flex justify-center">
        <img 
          src="/logo2.png" 
          alt="AMS World Footer" 
          className="h-16 md:h-24 w-auto object-contain filter drop-shadow-[0_4px_15px_rgba(227,6,19,0.25)]"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.insertAdjacentHTML('afterend', '<span class="text-lg font-black italic text-neutral-500">AMS<span class="text-accent">WORLD</span></span>');
          }}
        />
      </div>

      {/* Textos de Copyright */}
      <div className="flex flex-col items-center space-y-1">
        <p className="text-[10px] tracking-widest text-neutral-500 font-mono text-center">
          © {new Date().getFullYear()} AMS WORLD. {t.footerRights}
        </p>
        <p className="text-[9px] tracking-wider text-neutral-600 font-mono text-center max-w-xs md:max-w-md px-4 leading-relaxed">
          {t.footerDisclaimer}
        </p>
      </div>

    </footer>
  );
}