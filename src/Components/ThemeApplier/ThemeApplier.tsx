import { useContext, useEffect } from 'react';
import { gameContext } from '@game/GameContext';

/**
 * Composant utilitaire qui applique le thème au body
 * Doit être placé à l'intérieur du GameContext.Provider
 */
export const ThemeApplier = () => {
  const game = useContext(gameContext);

  useEffect(() => {
    console.log('Applying theme:', game.theme);
    // Retirer toutes les classes de thème
    document.body.classList.remove('theme-dark', 'theme-matrix', 'theme-cyberpunk', 'theme-corporate');

    // Appliquer la classe du thème actuel (sauf pour light qui est le défaut)
    if (game.theme !== 'light') {
      document.body.classList.add(`theme-${game.theme}`);
    }
    console.log('Body classes:', document.body.className);
  }, [game.theme]);

  return null; // Ce composant ne rend rien
};
