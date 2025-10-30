import { useContext, useState } from 'react';
import './styles/global.scss';
import styles from './App.module.scss';
import { CodeMaker } from './Components/CodeMaker';
import { CodeSeller } from './Components/CodeSeller';
import { DevShop } from './Components/DevShop';
import { LinesViewer } from './Components/LinesViewer';
import { MoneyViewer } from './Components/MoneyViewer';
import { POShop } from './Components/POShop';
import { SaveManager } from './Components/SaveManager';
import { UpgradeShop } from './Components/UpgradeShop';
import { Game } from './Game/Game';
import { gameContext } from './Game/GameContext';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const game = useContext(gameContext);

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

          {/* Settings button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`${styles.settingsButton} ${showSettings ? styles.active : styles.inactive}`}
          >
            {showSettings ? 'Retour au jeu' : 'Paramètres'}
          </button>
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
