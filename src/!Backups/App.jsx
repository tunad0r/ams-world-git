import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Support from './pages/Support';
import Mods from './pages/Mods'; // Página de Mods
import LoadingScreen from './components/common/LoadingScreen';
import LanguageModal from './components/common/LanguageModal';
import { getCookie, setCookie } from './utils/cookies';

function App() {
  const [language, setLanguage] = useState('pt'); 
  const [isLangOpen, setIsLangOpen] = useState(false); 
  const [isFirstAccess, setIsForceOpen] = useState(false); 

  // Sistema de Navegação Geral e Filtro Dinâmico de Categorias
  const [activePage, setActivePage] = useState('HOME'); 
  const [modsFilter, setModsFilter] = useState('ALL'); 
  const [pageOpacity, setPageOpacity] = useState(1); 

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // COOKIES
    const savedLang = getCookie('lang');
    if (savedLang) {
      setLanguage(savedLang);
    } else {
      setIsForceOpen(true);
      setIsLangOpen(true);
    }

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  useEffect(() => {
    if (isLangOpen) {
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
  }, [isLangOpen]);

  // Transição transparente de tela
  const handlePageChange = (targetPage) => {
    setPageOpacity(0); 

    setTimeout(() => {
      if (targetPage === 'VEHICLES') {
        setModsFilter('VEHICLES');
        setActivePage('MODS');
      } else if (targetPage === 'TRACKS') {
        setModsFilter('TRACKS');
        setActivePage('MODS');
      } else {
        if (targetPage === 'MODS') setModsFilter('ALL');
        setActivePage(targetPage);
      }

      window.lenis?.scrollTo(0, { immediate: true });
      setPageOpacity(1); 
    }, 300);
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    setCookie('lang', lang, 365);
    setIsForceOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-gray-200 flex flex-col justify-between">
      
      <LoadingScreen />

      <LanguageModal 
        isOpen={isLangOpen}
        isForceOpen={isFirstAccess}
        onClose={() => setIsLangOpen(false)}
        onSelectLanguage={handleSelectLanguage} // Propriedade de seleção corrigida
      />
      
      <div className="absolute inset-0 bg-grid pointer-events-none z-0" />
      
      <Navbar 
        lang={language} 
        activePage={activePage} 
        onChangePage={handlePageChange} 
        onOpenLang={() => setIsLangOpen(true)} 
      />
      
      <main 
        className="relative z-10 flex-grow pt-14 transition-opacity duration-300 ease-in-out"
        style={{ opacity: pageOpacity }}
      >
        {activePage === 'HOME' && <Home lang={language} />}
        {activePage === 'SUPORTE' && <Support lang={language} />}
        {activePage === 'MODS' && (
          <Mods 
            lang={language} 
            activeFilter={modsFilter} 
            onResetFilter={() => setModsFilter('ALL')} 
          />
        )}
      </main>

    </div>
  );
}

export default App;