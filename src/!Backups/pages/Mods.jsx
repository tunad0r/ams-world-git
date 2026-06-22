import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { ALL_MODS } from '../data/allMods';
import Footer from '../components/layout/Footer';

export default function Mods({ lang, activeFilter, onResetFilter }) {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedMod, setSelectedMod] = useState(null);

  const t = TRANSLATIONS[lang];
  const modsList = ALL_MODS[lang] || ALL_MODS.pt;

  useEffect(() => {
    if (activeFilter) {
      setSelectedFilter(activeFilter);
    }
  }, [activeFilter]);

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
    if (onResetFilter) onResetFilter();
  };

  const filteredMods = modsList.filter((mod) => {
    const matchesSearch = mod.title.toLowerCase().includes(search.toLowerCase()) || 
                          mod.description.toLowerCase().includes(search.toLowerCase());
    
    let targetCategory = '';
    if (selectedFilter === 'VEHICLES') targetCategory = lang === 'pt' ? 'VEÍCULOS' : 'VEHICLES';
    if (selectedFilter === 'TRACKS') targetCategory = lang === 'pt' ? 'CIRCUITOS' : 'TRACKS';
    if (selectedFilter === 'PHYSICS') targetCategory = lang === 'pt' ? 'FÍSICAS' : 'PHYSICS';
    if (selectedFilter === 'SKINS') targetCategory = lang === 'pt' ? 'SKINS' : 'SKINS';

    const matchesFilter = selectedFilter === 'ALL' || mod.category === targetCategory;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="max-w-[1400px] w-full mx-auto px-6 py-12 flex-grow space-y-12">
        
        {/* Cabeçalho */}
        <div className="space-y-4 max-w-2xl">
          <span className="text-[10px] font-black tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded uppercase">
            {t.modsTag}
          </span>
          <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tight leading-none">
            {t.modsTitle}
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            {t.modsDesc}
          </p>
        </div>

        {/* Barra de Pesquisa e Filtros */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#1c1e24] pb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ALL', label: t.filterAll },
              { id: 'VEHICLES', label: t.filterCars },
              { id: 'TRACKS', label: t.filterTracks },
              { id: 'PHYSICS', label: t.filterPhysics },
              { id: 'SKINS', label: t.filterSkins }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleSelectFilter(btn.id)}
                className={`px-5 py-2.5 rounded font-extrabold text-[10px] tracking-widest uppercase transition-all duration-200 border cursor-pointer
                  ${selectedFilter === btn.id 
                    ? 'bg-accent border-accent text-white shadow-lg shadow-accent/15 scale-105' 
                    : 'bg-[#121318] border-[#1c1e24] text-gray-400 hover:border-neutral-700 hover:text-white'}`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm pointer-events-none">
              🔍
            </span>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#121318] border border-[#1c1e24] rounded px-4 py-2.5 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all font-medium"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Grid de Cards */}
        {filteredMods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMods.map((mod) => (
              <div 
                key={mod.id}
                onClick={() => setSelectedMod(mod)}
                className="group bg-card border border-borderDark rounded overflow-hidden hover:border-accent/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={mod.image} 
                    alt={mod.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0a0a0c]/90 text-accent text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1">
                    {mod.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-200 uppercase italic tracking-tight">
                      {mod.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                      {mod.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-borderDark text-xs text-gray-500 font-mono">
                    <span>📥 {mod.downloads} {t.downloadCount}</span>
                    <button className="text-accent font-black text-[10px] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      {t.downloadBtn} &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#121318]/20 border border-dashed border-[#1c1e24] rounded">
            <span className="text-3xl block mb-2">🚗💨</span>
            <p className="text-gray-400 text-sm font-medium">{t.noModsFound}</p>
          </div>
        )}

      </div>

      <Footer lang={lang} />

      {/* Modal de Download */}
      {selectedMod && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-opacity duration-300">
          <div className="bg-[#121318] border border-[#2d313d] w-full max-w-2xl rounded overflow-hidden shadow-2xl relative animate-elastic-scale flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-48 md:h-auto">
              <img src={selectedMod.image} alt={selectedMod.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#121318] via-transparent to-transparent" />
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-between space-y-6">
              <button 
                onClick={() => setSelectedMod(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
              
              <div className="space-y-3">
                <span className="text-[9px] font-black tracking-widest text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded uppercase inline-block">
                  {selectedMod.category}
                </span>
                <h3 className="text-2xl font-black italic text-white uppercase leading-tight tracking-tight">
                  {selectedMod.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {selectedMod.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#1c1e24]">
                <div className="text-[10px] text-gray-500 font-mono uppercase">
                  Available Mirrors (Tested)
                </div>
                <a 
                  href={selectedMod.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-3 bg-[#e30613] hover:bg-red-700 transition-colors duration-150 text-white font-bold text-xs tracking-wider rounded text-center block uppercase cursor-pointer"
                >
                  {t.downloadBtn}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}