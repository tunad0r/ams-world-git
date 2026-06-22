import React from 'react';

// ==========================================
// CONFIGURAÇÃO DOS SEUS CARRINHOS PERSONALIZADOS
// ==========================================
const USE_CUSTOM_PNGS = true; // Mantém ligado para rodar suas fotos!

const CUSTOM_CARS_PNGS = [
  '/images/car1.png',
  '/images/car2.png',
  '/images/car3.png',
  '/images/car4.png',
  '/images/car5.png',
  '/images/car6.png',
];

const CAR_COLORS = ['#e30613', '#0056b3', '#e2b714', '#28a745', '#8a2be2', '#00ffff'];

// Triplicamos a lista para que a pista fique com mais de 3000px de largura,
// evitando buracos ou atrasos no loop em telas grandes (Ultrawide e 4K)
const MULTIPLIED_CARS = [...CAR_COLORS, ...CAR_COLORS, ...CAR_COLORS];

function MiniCar({ color }) {
  return (
    <svg className="h-6 w-auto filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.4)]" viewBox="0 0 120 40" fill={color}>
      <path d="M10 28 C 10 28, 12 18, 25 15 C 35 12, 45 4, 65 4 C 80 4, 95 12, 105 18 C 112 22, 115 28, 115 28 L 105 32 L 15 32 Z" />
      <path d="M42 14 C 45 7, 60 6, 65 6 C 75 6, 85 11, 89 15 Z" fill="#ffffff" opacity="0.3" />
      <path d="M6 18 L 18 18 L 14 26 L 6 26 Z" fill="#000" />
      <circle cx="28" cy="30" r="7.5" fill="#111" />
      <circle cx="28" cy="30" r="3.5" fill="#666" />
      <circle cx="92" cy="30" r="7.5" fill="#111" />
      <circle cx="92" cy="30" r="3.5" fill="#666" />
    </svg>
  );
}

export default function RacetrackMarquee() {
  return (
    <div className="w-full h-16 bg-[#0c0d12] relative border-y border-black overflow-hidden flex items-center shadow-[0_4px_25px_rgba(0,0,0,0.5)] z-10">
      
      {/* Linhas Xadrez */}
      <div 
        className="absolute top-0 left-0 w-full h-3 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #fff 25%, transparent 25%), 
            linear-gradient(-45deg, #fff 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #fff 75%), 
            linear-gradient(-45deg, transparent 75%, #fff 75%)
          `,
          backgroundSize: '12px 12px',
          backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-full h-3 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #fff 25%, transparent 25%), 
            linear-gradient(-45deg, #fff 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #fff 75%), 
            linear-gradient(-45deg, transparent 75%, #fff 75%)
          `,
          backgroundSize: '12px 12px',
          backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px'
        }}
      />

      <div className="absolute w-full h-0 border-b border-dashed border-neutral-800/80 top-[50%] -translate-y-[50%] z-0" />

      {/* Pista Dinâmica (Sem buracos no loop) */}
      <div className="flex animate-marquee whitespace-nowrap h-full items-center absolute z-10">
        
        {/* Bloco 1 (Contém 18 carros) */}
        <div className="flex space-x-12 items-center px-4">
          {MULTIPLIED_CARS.map((_, index) => (
            <div key={`car-a-${index}`} className="flex-shrink-0 w-24 md:w-32 flex justify-center items-center">
              {USE_CUSTOM_PNGS ? (
                <img 
                  src={CUSTOM_CARS_PNGS[index % CUSTOM_CARS_PNGS.length]} 
                  alt="Mod Car" 
                  draggable={false}
                  className="max-h-10 w-auto object-contain select-none pointer-events-none"
                  onError={(e) => {
                    e.target.src = '/images/hero-car.png';
                  }}
                />
              ) : (
                <MiniCar color={CAR_COLORS[index % CAR_COLORS.length]} />
              )}
            </div>
          ))}
        </div>

        {/* Bloco 2 (Contém 18 carros duplicados para emenda infinita sem cortes) */}
        <div className="flex space-x-12 items-center px-4">
          {MULTIPLIED_CARS.map((_, index) => (
            <div key={`car-b-${index}`} className="flex-shrink-0 w-24 md:w-32 flex justify-center items-center">
              {USE_CUSTOM_PNGS ? (
                <img 
                  src={CUSTOM_CARS_PNGS[index % CUSTOM_CARS_PNGS.length]} 
                  alt="Mod Car" 
                  draggable={false}
                  className="max-h-10 w-auto object-contain select-none pointer-events-none"
                  onError={(e) => {
                    e.target.src = '/images/hero-car.png';
                  }}
                />
              ) : (
                <MiniCar color={CAR_COLORS[index % CAR_COLORS.length]} />
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}