import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../../data/translations';

export default function LanguageModal({ isOpen, isForceOpen, onSelectLanguage, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Controla o ciclo de renderização e animações
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  const selectLang = (lang) => {
    onSelectLanguage(lang);
    triggerClose();
  };

  const triggerClose = () => {
    if (isForceOpen) return; // Se for o primeiro acesso obrigatório, não deixa fechar sem escolher
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 720);
  };

  if (!isVisible) return null;

  // Usa "pt" por padrão temporário apenas para ler os textos do próprio modal
  const text = TRANSLATIONS.pt; 

  return (
    <div 
      className={`fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-[750ms] ease-out
        ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className={`bg-[#121318] border border-[#2d313d] w-full max-w-sm p-8 rounded-xl shadow-2xl relative text-center
        ${isClosing ? 'animate-portal-out' : 'animate-portal-in'}`}
      >
        
        {/* Botão Fechar (Inativo se for primeiro acesso obrigatório) */}
        {!isForceOpen && (
          <button 
            onClick={triggerClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-lg cursor-pointer"
          >
            ✕
          </button>
        )}

        {/* Cabeçalho */}
        <div className="space-y-2 border-b border-[#1c1e24] pb-4 mb-6">
          <span className="text-[10px] font-black tracking-widest text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded uppercase">
            {text.langTag}
          </span>
          <h3 className="text-xl font-black italic text-white uppercase tracking-tight">
            {text.langTitle}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
            {text.langDesc}
          </p>
        </div>

        {/* Botões de Seleção de Idioma */}
        <div className="flex flex-col space-y-3">
          <button 
            onClick={() => selectLang('pt')}
            className="w-full py-3 bg-[#e30613] hover:bg-red-700 transition-colors duration-150 text-white font-extrabold text-xs tracking-wider rounded uppercase cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>🇧🇷</span>
            <span>PORTUGUÊS (PT-BR)</span>
          </button>
          <button 
            onClick={() => selectLang('en')}
            className="w-full py-3 bg-[#1e2129] hover:bg-neutral-800 border border-[#2d313d] text-white font-extrabold text-xs tracking-wider rounded uppercase transition-colors duration-200 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>🇺🇸</span>
            <span>ENGLISH (EN)</span>
          </button>
        </div>

      </div>
    </div>
  );
}