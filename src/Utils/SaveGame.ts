import { GameState } from '../Game/GameContext.ts';

export type SaveGame = GameState & {
  version: number;
  timestamp: number;
};

const SAVE_VERSION = 1;
const SAVE_KEY = 'esn-clicker-save';

export const createSaveGame = (gameState: GameState): SaveGame => {
  return {
    ...gameState,
    version: SAVE_VERSION,
    timestamp: Date.now(),
  };
};

export const saveGameToLocalStorage = (saveGame: SaveGame): void => {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveGame));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
  }
};

export const loadGameFromLocalStorage = (): SaveGame | null => {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (!savedData) return null;
    
    const saveGame: SaveGame = JSON.parse(savedData);
    
    // Vérification de version pour migration future
    if (saveGame.version !== SAVE_VERSION) {
      console.warn(`Version de sauvegarde incompatible: ${saveGame.version}, attendue: ${SAVE_VERSION}`);
      return null;
    }
    
    return saveGame;
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    return null;
  }
};

export const exportSaveGame = (saveGame: SaveGame): string => {
  return btoa(JSON.stringify(saveGame));
};

export const importSaveGame = (saveData: string): SaveGame | null => {
  try {
    const decoded = atob(saveData);
    const saveGame: SaveGame = JSON.parse(decoded);
    
    // Validation basique
    if (!saveGame.version || typeof saveGame.codeLines !== 'number') {
      throw new Error('Format de sauvegarde invalide');
    }
    
    if (saveGame.version !== SAVE_VERSION) {
      throw new Error(`Version incompatible: ${saveGame.version}`);
    }
    
    return saveGame;
  } catch (error) {
    console.error('Erreur lors de l\'importation:', error);
    return null;
  }
};

export const clearSaveGame = (): void => {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
  }
};