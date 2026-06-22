import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Mantém a tela 100% preta por 800ms
    const fadeTimeout = setTimeout(() => {
      setIsFading(true); // Inicia o fade out de 500ms
    }, 800);

    // Remove completamente o elemento da tela após o fade acabar (1.3s no total)
    const removeTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 1300);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 bg-[#0a0a0c] z-[9999] pointer-events-none transition-opacity duration-500 ease-out
        ${isFading ? 'opacity-0' : 'opacity-100'}`}
    />
  );
}