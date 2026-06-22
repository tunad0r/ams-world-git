import React, { useState } from 'react';

export default function TiltCard({ mod, onClick }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Divide para obter um fator de rotação controlado (máximo ~15 graus)
    setRotate({
      x: -(y / (box.height / 2)) * 12,
      y: (x / (box.width / 2)) * 12
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      onClick={() => onClick(mod)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 w-full h-[320px] cursor-pointer group"
    >
      <div 
        className="preserve-3d w-full h-full rounded border border-[#1c1e24] bg-[#121318] overflow-hidden transition-transform duration-200 ease-out flex flex-col justify-end p-6 relative"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Imagem do Mod de Fundo */}
        <div className="absolute inset-0 z-0">
          <img 
            src={mod.image} 
            alt={mod.title} 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
          />
          {/* Sombra interna para dar leitura ao texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Detalhes do Mod */}
        <div className="relative z-10 space-y-2 transform translate-z-[40px] transition-transform duration-300">
          <span className="text-[9px] font-black tracking-widest text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded uppercase inline-block">
            {mod.category}
          </span>
          <h3 className="text-xl font-black italic text-white uppercase tracking-tight group-hover:text-accent transition-colors duration-200">
            {mod.title}
          </h3>
          <p className="text-gray-400 text-xs line-clamp-2">
            {mod.description}
          </p>
          <div className="pt-2 flex items-center justify-between text-[10px] text-gray-500 font-mono">
            <span>📥 {mod.downloads} DOWNLOADS</span>
            <span className="text-accent font-bold group-hover:translate-x-1 transition-transform duration-200">VER DETALHES &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
}