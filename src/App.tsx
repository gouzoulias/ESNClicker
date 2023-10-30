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
      <h1>ESN Clicker</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
          <h2>Artisanat de Code</h2>
          <LinesViewer />
          <CodeMaker />
          <DevShop />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
          <h2>Vente de code</h2>
          <MoneyViewer />
          <CodeSeller />
          <POShop />
        </div>
        <UpgradeShop />
      </div>
    </Game>
  );
}

export default App;
