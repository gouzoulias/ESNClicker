import { useContext, useState } from 'react';
import './App.css';
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
      <div
        style={{
          marginBottom: '20px',
          paddingBottom: '10px',
          borderBottom: '2px solid #ccc',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ margin: '0 0 10px 0' }}>ESN Clicker</h1>
            {/* Counters below title, left aligned */}
            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              <LinesViewer />
              <MoneyViewer />
            </div>
          </div>

          {/* Settings button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              padding: '8px 16px',
              backgroundColor: showSettings ? '#4CAF50' : '#f0f0f0',
              color: showSettings ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {showSettings ? 'Retour au jeu' : 'Paramètres'}
          </button>
        </div>
      </div>

      {showSettings ? (
        /* Settings mode */
        <div>
          <div
            style={{
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '4px',
              padding: '10px',
              marginBottom: '20px',
              color: '#856404',
            }}
          >
            ⚠️ <strong>Mode paramètres :</strong> Le jeu continue de tourner en arrière-plan pendant que vous gérez vos sauvegardes.
          </div>
          <SaveManager />
        </div>
      ) : (
        /* Game mode */
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
            <h2>Artisanat de Code</h2>
            <CodeMaker />
            <DevShop />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
            <h2>Vente de code</h2>
            <CodeSeller />
            <POShop />
          </div>
          {game.totalMoneyAccumulated >= 25 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <UpgradeShop />
            </div>
          )}
        </div>
      )}
    </Game>
  );
}

export default App;
