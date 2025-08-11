import './App.css';
import { CodeMaker } from './Components/CodeMaker.tsx';
import { CodeSeller } from './Components/CodeSeller.tsx';
import { DevShop } from './Components/DevShop.tsx';
import { LinesViewer } from './Components/LinesViewer.tsx';
import { MoneyViewer } from './Components/MoneyViewer.tsx';
import { POShop } from './Components/POShop.tsx';
import { UpgradeShop } from './Components/UpgradeShop.tsx';
import { Game } from './Game/Game.tsx';

function App() {
  return (
    <Game>
      {/* Header with title */}
      <div style={{ 
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '2px solid #ccc'
      }}>
        <h1 style={{ margin: '0 0 10px 0' }}>ESN Clicker</h1>
        {/* Counters below title, left aligned */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <LinesViewer />
          <MoneyViewer />
        </div>
      </div>

      {/* Main game area */}
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
        <UpgradeShop />
      </div>
    </Game>
  );
}

export default App;
