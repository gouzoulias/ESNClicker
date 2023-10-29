import { useContext, useEffect } from 'react';
import './App.css';
import { CodeMaker } from './Components/CodeMaker.tsx';
import { CodeSeller } from './Components/CodeSeller.tsx';
import { DevShop } from './Components/DevShop.tsx';
import { LinesViewer } from './Components/LinesViewer.tsx';
import { MoneyViewer } from './Components/MoneyViewer.tsx';
import { Game } from './Game/Game.tsx';
import { GameContext, gameContext } from './Game/GameContext.ts';

function GameDebugger() {
  const game: GameContext = useContext(gameContext);
  useEffect(() => {
    // TODO : Delete this log
    console.log('GameDebugger : game', game);
  }, [game]);
  return null;
}

function App() {
  return (
    <Game>
      <h2>Welcome to ESN !</h2>
      <GameDebugger />
      <LinesViewer />
      <MoneyViewer />
      <CodeSeller />
      <CodeMaker />
      <DevShop />
    </Game>
  );
}

export default App;
