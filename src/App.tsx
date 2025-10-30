import { useContext, useEffect, useState } from 'react';
import './styles/global.scss';
import styles from './App.module.scss';
import { CodeMaker } from '@components/CodeMaker/CodeMaker';
import { CodeSeller } from '@components/CodeSeller/CodeSeller';
import { DevShop } from '@components/DevShop/DevShop';
import { LinesViewer } from '@components/LinesViewer/LinesViewer';
import { MoneyViewer } from '@components/MoneyViewer/MoneyViewer';
import { POShop } from '@components/POShop/POShop';
import { SaveManager } from '@components/SaveManager/SaveManager';
import { ThemeSelector } from '@components/ThemeSelector/ThemeSelector';
import { UpgradeShop } from '@components/UpgradeShop/UpgradeShop';
import { Game } from '@game/Game';
import { gameContext } from '@game/GameContext';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const game = useContext(gameContext);

  // Appliquer le thème au body
  useEffect(() => {
    // Retirer toutes les classes de thème
    document.body.classList.remove('theme-dark', 'theme-matrix', 'theme-cyberpunk', 'theme-corporate');

    // Appliquer la classe du thème actuel (sauf pour light qui est le défaut)
    if (game.theme !== 'light') {
      document.body.classList.add(`theme-${game.theme}`);
    }
  }, [game.theme]);

  return (
    <Game>
      {/* Header with title */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>ESN Clicker</h1>
            {/* Counters below title, left aligned */}
            <div className={styles.counters}>
              <LinesViewer />
              <MoneyViewer />
            </div>
          </div>

          <div className={styles.headerActions}>
            {/* Theme selector */}
            <ThemeSelector />

            {/* Settings button */}
            <button onClick={() => setShowSettings(!showSettings)} className={`${styles.settingsButton} ${showSettings ? styles.active : styles.inactive}`}>
              {showSettings ? 'Retour au jeu' : 'Paramètres'}
            </button>
          </div>
        </div>
      </div>

      {showSettings ? (
        /* Settings mode */
        <div>
          <div className={styles.warningBanner}>
            ⚠️ <strong>Mode paramètres :</strong> Le jeu continue de tourner en arrière-plan pendant que vous gérez vos sauvegardes.
          </div>
          <SaveManager />
        </div>
      ) : (
        /* Game mode */
        <div className={styles.gameLayout}>
          <div className={styles.column}>
            <h2>Artisanat de Code</h2>
            <CodeMaker />
            <DevShop />
          </div>
          <div className={styles.column}>
            <h2>Vente de code</h2>
            <CodeSeller />
            <POShop />
          </div>
          {game.totalMoneyAccumulated >= 25 && (
            <div className={styles.column}>
              <UpgradeShop />
            </div>
          )}
        </div>
      )}
    </Game>
  );
}

export default App;
