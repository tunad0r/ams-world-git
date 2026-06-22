import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import Footer from '../components/layout/Footer'; // Importação do rodapé

export default function Support({ lang }) {
  const t = TRANSLATIONS[lang];

  return (
    // Estrutura em flex-col para empurrar o rodapé para o final em monitores grandes
    <div className="min-h-[90vh] flex flex-col justify-between">
      
      {/* Conteúdo Principal */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16 flex-grow">
        
        {/* Bloco de Chamada para o Discord */}
        <div className="bg-[#121318] border border-[#1c1e24] p-8 md:p-12 rounded-xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accent" />
          
          <div className="space-y-2">
            <span className="text-[10px] font-black tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded uppercase inline-block">
              {t.supTag}
            </span>
            <h2 className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tight">
              {t.supTitle}
            </h2>
          </div>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {t.supDesc}
          </p>

          <div className="pt-4 flex justify-center">
            <a 
              href="https://discord.gg/" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-3.5 bg-accent hover:bg-red-700 hover:shadow-[0_0_20px_rgba(227,6,19,0.35)] text-white font-extrabold text-xs tracking-wider rounded uppercase transition-all duration-200 inline-flex items-center space-x-2"
            >
              <span>💬</span>
              <span>{t.supBtn}</span>
            </a>
          </div>
        </div>

        {/* Seção FAQ */}
        <div className="space-y-8">
          <h3 className="text-2xl font-black italic text-white uppercase tracking-tight border-b border-[#1c1e24] pb-4">
            ❓ {t.supFaq}
          </h3>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-[#121318]/50 border border-[#1c1e24] p-6 rounded-lg space-y-2">
              <h4 className="text-white font-bold text-base leading-snug">
                {t.faq1Q}
              </h4>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                {t.faq1A}
              </p>
            </div>

            <div className="bg-[#121318]/50 border border-[#1c1e24] p-6 rounded-lg space-y-2">
              <h4 className="text-white font-bold text-base leading-snug">
                {t.faq2Q}
              </h4>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                {t.faq2A}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Rodapé de Copyright adicionado embaixo de tudo no Suporte */}
      <Footer lang={lang} />

    </div>
  );
}