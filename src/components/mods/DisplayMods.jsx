import React, { useState, useEffect } from 'react';
import { DISPLAY_MODS } from '../../data/displayMods';
import { TRANSLATIONS } from '../../data/translations';

export default function DisplayMods({ lang }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0); 
  const [dimensions, setDimensions] = useState({ cardWidth: 800, gap: 32 });

  // Puxa a lista de mods específica do idioma ativo
  const modsList = DISPLAY_MODS[lang] || DISPLAY_MODS.pt;
  const totalItems = modsList.length;
  const timerDuration = 5000;

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setDimensions({
        cardWidth: isMobile ? window.innerWidth * 0.8 : 800,
        gap: isMobile ? 16 : 32
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Timer automático
  useEffect(() => {
    const intervalTime = 50; 
    const step = (intervalTime / timerDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [totalItems]);

  // Sempre reseta para o primeiro card ao mudar o idioma para evitar erros de índice out-of-bounds
  useEffect(() => {
    setActiveIndex(0);
    setProgress(0);
  }, [lang]);

  const stepSize = dimensions.cardWidth + dimensions.gap;
  const halfCard = dimensions.cardWidth / 2;
  const halfGap = dimensions.gap / 2;
  const transformStyle = `translateX(calc(50vw - ${halfCard}px - ${halfGap}px - ${activeIndex * stepSize}px))`;

  const currentMod = modsList[activeIndex];
  const text = TRANSLATIONS[lang];

  return (
    <div className="w-full flex flex-col items-center py-6 select-none">
      
      {/* Título da seção traduzido */}
      <div className="text-center mb-4">
        <span className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">
          {text.vitrineTitle}
        </span>
      </div>

      {/* Barrinha de Carregamento */}
      <div className="w-24 h-[3px] bg-neutral-900 rounded-full overflow-hidden mb-10 mx-auto">
        <div 
          className="h-full bg-accent transition-all duration-75 ease-linear shadow-[0_0_8px_#e30613]" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Área do Slider */}
      <div className="w-full overflow-hidden relative flex py-4">
        <div 
          className="flex transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
          style={{ transform: transformStyle }}
        >
          {modsList.map((mod, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={mod.id}
                onClick={() => {
                  setActiveIndex(index);
                  setProgress(0);
                }}
                className={`aspect-video rounded-xl overflow-hidden border transition-all duration-500 flex-shrink-0 relative cursor-pointer
                  ${isActive 
                    ? 'border-accent shadow-[0_0_40px_rgba(227,6,19,0.3)] opacity-100 scale-100 z-20' 
                    : 'border-[#1c1e24] opacity-35 scale-90 z-10 hover:opacity-55'}`}
                style={{ 
                  width: `${dimensions.cardWidth}px`,
                  marginLeft: `${dimensions.gap / 2}px`,
                  marginRight: `${dimensions.gap / 2}px`
                }}
              >
                <img 
                  src={mod.image} 
                  alt={mod.title} 
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detalhes do Mod Ativo */}
      <div className="max-w-2xl px-6 text-center mt-8 space-y-4">
        <div className="flex items-center justify-center space-x-3 text-white">
          <span className="text-2xl">{currentMod.icon}</span>
          <h2 className="text-xl md:text-2xl font-black italic tracking-wider uppercase">
            {currentMod.title}
          </h2>
        </div>

        <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-xl mx-auto min-h-[60px]">
          {currentMod.description}
        </p>

        {/* Indicadores de Paginação */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          {modsList.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setProgress(0);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer
                ${index === activeIndex ? 'w-6 bg-accent' : 'w-1.5 bg-neutral-700'}`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}