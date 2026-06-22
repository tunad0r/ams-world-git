import React from 'react';
import { TRANSLATIONS } from '../../data/translations';

function SlidingNavLink({ label, active, lang }) {
  const chars = label.split('');

  return (
    <span className="relative flex overflow-hidden h-full items-center justify-center px-1">
      <span className="flex">
        {chars.map((char, i) => (
          <span 
            key={`norm-${i}`} 
            className={`inline-block transition-transform duration-300 ease-out transform group-hover:-translate-y-full italic
              ${active ? 'text-white font-black' : 'text-gray-400'}`}
            style={{ 
              transitionDelay: `${i * 22}ms`,
              paddingRight: char === ' ' ? '0' : '0.18em', 
              whiteSpace: char === ' ' ? 'pre' : 'normal' 
            }}
          >
            {char}
          </span>
        ))}
      </span>
      <span className="absolute inset-0 flex items-center justify-center px-1">
        {chars.map((char, i) => (
          <span 
            key={`hover-${i}`} 
            className="inline-block text-accent font-black italic transition-transform duration-300 ease-out transform translate-y-full group-hover:translate-y-0"
            style={{ 
              transitionDelay: `${i * 22}ms`,
              paddingRight: char === ' ' ? '0' : '0.18em',
              whiteSpace: char === ' ' ? 'pre' : 'normal'
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Navbar({ lang, activePage, onChangePage, onOpenLang }) {
  const text = TRANSLATIONS[lang];

  const menuItems = [
    { id: 'HOME', label: text.navHome },
    { id: 'MODS', label: text.navMods }, 
    { id: 'VEHICLES', label: text.navCars }, 
    { id: 'TRACKS', label: text.navTracks },  
    { id: 'SUPORTE', label: text.navSupport }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0d0e12]/95 border-b border-[#1c1e24] shadow-xl">
      <div className="max-w-[1400px] mx-auto grid grid-cols-3 items-center h-14 px-4 relative">
        
        {/* COLUNA 1: Lado Esquerdo */}
        <div className="flex items-center justify-start h-full">
          <button 
            onClick={() => onChangePage('HOME')} 
            className="flex items-center cursor-pointer focus:outline-none"
          >
            <img 
              src="/logo.png" 
              alt="AMS World" 
              className="h-7 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(227,6,19,0.25)]"
            />
          </button>
        </div>

        {/* COLUNA 2: Centro (Menu Centralizado) */}
        <div className="hidden lg:flex items-center justify-center h-full border-l border-r border-[#1c1e24] w-full">
          {menuItems.map((item) => {
            const isTabActive = 
              activePage === item.id || 
              (activePage === 'MODS' && item.id === 'MODS');

            return (
              <button
                key={item.label}
                onClick={() => onChangePage(item.id)}
                className={`h-full px-5 flex items-center justify-center relative group overflow-hidden border-r border-[#1c1e24] last:border-r-0 cursor-pointer focus:outline-none
                  ${isTabActive ? 'bg-[#252830]' : ''}`}
              >
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 shadow-[inset_0_0_20px_rgba(227,6,19,0.22)]" />
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

                <span className="text-[10px] tracking-widest relative z-10">
                  <SlidingNavLink label={item.label} active={isTabActive} lang={lang} />
                </span>
              </button>
            );
          })}
        </div>

        {/* COLUNA 3: Lado Direito */}
        <div className="flex items-center justify-end h-full">
          
          <button 
            onClick={onOpenLang}
            className="h-14 px-4.5 flex items-center justify-center relative group overflow-hidden border-l border-r border-[#1c1e24] cursor-pointer focus:outline-none"
            title="Language / Idioma"
          >
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 shadow-[inset_0_0_15px_rgba(227,6,19,0.22)]" />
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            <span className="text-sm group-hover:rotate-45 transition-transform duration-300 ease-out inline-block">
              ⚙️
            </span>
          </button>

          <div className="pl-4 flex items-center h-full">
            <a 
              href="https://discord.gg/" 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#e30613] hover:bg-red-700 hover:shadow-[0_0_15px_rgba(227,6,19,0.4)] transition-all duration-200 text-white font-extrabold text-[10px] tracking-widest rounded px-5 py-2 uppercase flex items-center space-x-2"
            >
              <span>💬</span>
              <span>{text.navDiscord}</span>
            </a>
          </div>

        </div>

      </div>
    </nav>
  );
}