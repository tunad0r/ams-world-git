import React, { useState, useEffect } from 'react';
import DisplayMods from '../components/mods/DisplayMods';
import RacetrackMarquee from '../components/layout/RacetrackMarquee';
import Footer from '../components/layout/Footer';
import { TRANSLATIONS } from '../data/translations';

export default function Home({ lang }) {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Controle de Scroll
  useEffect(() => {
    if (isGuideOpen) {
      document.body.style.overflow = 'hidden';
      window.lenis?.stop();
    } else {
      document.body.style.overflow = '';
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      window.lenis?.start();
    };
  }, [isGuideOpen]);

  const openGuide = () => {
    setIsClosing(false);
    setIsGuideOpen(true);
  };

  const closeGuide = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsGuideOpen(false);
      setIsClosing(false);
    }, 720);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center text-center overflow-hidden py-16 px-4 fade-in">
        
        {/* Imagem de Fundo Estática */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url('/images/hero-bg.jpg'), url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1920')`,
          }}
        />
        
        {/* Degradê Escuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/55 to-[#0a0a0c]/80 z-10" />

        {/* Conteúdo Centralizado */}
        <div className="relative z-20 space-y-8 max-w-4xl px-4 flex flex-col items-center">
          
          {/* Logo Centralizada */}
          <div className="flex flex-col items-center select-none pt-4">
            <img 
              src="/logo.png" 
              alt="AMS World" 
              className="h-32 md:h-44 w-auto object-contain filter drop-shadow-[0_12px_45px_rgba(227,6,19,0.4)] transition-transform duration-300 hover:scale-103"
            />
            <p className="text-[10px] md:text-xs font-black italic tracking-[0.45em] text-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase mt-4">
              M O T O R S P O R T S &nbsp; M O D &nbsp; H U B
            </p>
          </div>

          {/* Botões Horizontais */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <button className="w-full sm:w-auto px-8 py-3 bg-[#e30613] hover:bg-red-700 text-white font-black text-xs tracking-widest rounded uppercase transition-colors duration-200 shadow-xl shadow-accent/10 flex items-center justify-center space-x-2 cursor-pointer">
              <span>🎮</span>
              <span>{t.btnExplore}</span>
            </button>
            <button 
              onClick={openGuide}
              className="w-full sm:w-auto px-8 py-3 bg-[#16181f]/85 hover:bg-neutral-800 border border-[#2d313d] text-white font-black text-xs tracking-widest rounded uppercase transition-colors duration-200 backdrop-blur-sm flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>▶</span>
              <span>{t.btnInstall}</span>
            </button>
          </div>

        </div>

      </section>

      {/* 2. LINHA DE CHEGADA XADREZ CLÁSSICA */}
      <div className="w-full h-16 bg-white relative border-y border-black overflow-hidden flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.5)] z-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #000 25%, transparent 25%), 
              linear-gradient(-45deg, #000 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #000 75%), 
              linear-gradient(-45deg, transparent 75%, #000 75%)
            `,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 0 16px, 16px -16px, -16px 0px'
          }}
        />
      </div>

      {/* 3. VITRINE DE MODS */}
      <section className="max-w-[1400px] mx-auto py-16 fade-in">
        <DisplayMods lang={lang} />
      </section>

      {/* 4. PISTA DE MINICARROS INFINITA */}
      <RacetrackMarquee />

      {/* 5. RODAPÉ DE COPYRIGHT */}
      <Footer lang={lang} />

      {/* ========================================================
          POPUP DO TUTORIAL (PORTAL COM TRANSIÇÕES TRADUZIDAS)
          ======================================================== */}
      {isGuideOpen && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-[750ms] ease-out
            ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className={`bg-[#121318] border border-[#2d313d] w-full max-w-lg p-8 rounded-xl shadow-2xl relative text-left
            ${isClosing ? 'animate-portal-out' : 'animate-portal-in'}`}
          >
            <button 
              onClick={closeGuide}
              className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-2 border-b border-[#1c1e24] pb-4 mb-6">
              <span className="text-[10px] font-black tracking-widest text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded uppercase">
                {t.guideTag}
              </span>
              <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">
                {t.guideTitle}
              </h3>
            </div>

            <div className="space-y-6">
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded bg-accent text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">{t.step1Title}</h4>
                  <p className="text-gray-400 text-xs mt-1">{t.step1Desc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded bg-accent text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">{t.step2Title}</h4>
                  <p className="text-gray-400 text-xs mt-1">{t.step2Desc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded bg-accent text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">{t.step3Title}</h4>
                  <p className="text-gray-400 text-xs mt-1">{t.step3Desc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded bg-accent text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">{t.step4Title}</h4>
                  <p className="text-gray-400 text-xs mt-1">{t.step4Desc}</p>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-[#1c1e24]">
              <button 
                onClick={closeGuide}
                className="w-full py-3 bg-[#e30613] hover:bg-red-700 transition-colors duration-150 text-white font-bold text-xs tracking-wider rounded text-center block uppercase cursor-pointer"
              >
                {t.btnUnderstand}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}