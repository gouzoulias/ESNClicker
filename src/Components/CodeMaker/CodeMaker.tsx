// import * as _ from 'lodash';
import { KeyboardEventHandler, useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './CodeMaker.module.scss';
import sourceCode from '../assets/code.txt';
import { GameContext, gameContext } from '../Game/GameContext';
import { Upgrade } from '../Game/Upgrade';

export const CodeMaker = () => {
  const game: GameContext = useContext(gameContext);

  const [loading, setLoading] = useState(true);

  const [textAreaValue, setTextAreaValue] = useState('');
  const [iCode, setICode] = useState(0);
  const [code, setCode] = useState('');

  // Speed tracking (only if upgrade is bought)
  const typingEvents = useRef<Array<{ timestamp: number; chars: number }>>([]);
  const lineEvents = useRef<Array<{ timestamp: number; lines: number }>>([]);
  const [currentSpeed, setCurrentSpeed] = useState({ charsPerSec: 0, linesPerMin: 0 });

  // Autocode throttling - utilise la vitesse d'autocode du jeu
  const lastAutocodeTime = useRef<number>(0);

  useEffect(() => {
    fetch(sourceCode)
      .then((value) => value.text())
      .then(setCode)
      .finally(() => setLoading(false));
  }, []);

  // Track typing activity for speed calculation
  const recordTypingActivity = useCallback(
    (charsAdded: number, linesAdded: number) => {
      if (!game.boughtUpgrade[Upgrade.SpeedCounter]) return;

      const now = Date.now();

      // Add new character event (5-second window)
      typingEvents.current.push({ timestamp: now, chars: charsAdded });
      const fiveSecondsAgo = now - 5000;
      typingEvents.current = typingEvents.current.filter((event) => event.timestamp >= fiveSecondsAgo);

      // Add new line event (30-second window)
      if (linesAdded > 0) {
        lineEvents.current.push({ timestamp: now, lines: linesAdded });
      }
      const thirtySecondsAgo = now - 30000;
      lineEvents.current = lineEvents.current.filter((event) => event.timestamp >= thirtySecondsAgo);

      // Calculate chars per second (5-second window)
      const totalChars = typingEvents.current.reduce((sum, event) => sum + event.chars, 0);
      const charTimeSpanMs = typingEvents.current.length > 0 ? now - typingEvents.current[0].timestamp : 0;
      const charTimeSpanSec = Math.max(charTimeSpanMs / 1000, 0.1);
      const charsPerSec = totalChars / charTimeSpanSec;

      // Calculate lines per minute (30-second window)
      const totalLines = lineEvents.current.reduce((sum, event) => sum + event.lines, 0);
      const lineTimeSpanMs = lineEvents.current.length > 0 ? now - lineEvents.current[0].timestamp : 0;
      const lineTimeSpanMin = Math.max(lineTimeSpanMs / 60000, 1 / 60);
      const linesPerMin = totalLines / lineTimeSpanMin;

      setCurrentSpeed({ charsPerSec, linesPerMin });
    },
    [game.boughtUpgrade],
  );

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    const now = Date.now();
    
    // Détection de l'autocode : utilise event.repeat (plus fiable)
    const isAutocode = event.repeat;

    if (isAutocode) {
      // Mode autocode détecté - appliquer la limitation selon la vitesse d'autocode
      const timeSinceLastAutocode = now - lastAutocodeTime.current;
      const minTimeBetweenChars = 1000 / game.autocodeSpeed; // Utilise la vitesse d'autocode du jeu

      if (timeSinceLastAutocode < minTimeBetweenChars) {
        return; // Ignorer si trop rapide pour l'autocode
      }
      lastAutocodeTime.current = now;
    }

    const codeToAdd: string = code.substring(iCode, iCode + game.manualProductivity);
    const linesAdded = (codeToAdd.match(/\n/g) || []).length;

    // Record typing activity for speed tracking
    recordTypingActivity(game.manualProductivity, linesAdded);

    if (linesAdded > 0) {
      game.createManualLine(linesAdded);
    }
    setTextAreaValue((prevState) => {
      if (iCode === 0) return '' + codeToAdd;
      return prevState + codeToAdd;
    });
    setICode((prevState) => {
      let newState: number = prevState + game.manualProductivity;
      if (newState > code.length) newState = 0;
      return newState;
    });
  }, [code, game, iCode, recordTypingActivity]);

  return (
    <div className={styles.container}>
      {/* Speed display - only show if upgrade is bought */}
      {game.boughtUpgrade[Upgrade.SpeedCounter] && (
        <div className={styles.speedDisplay}>
          <strong>Vitesse:</strong> {currentSpeed.charsPerSec.toFixed(1)} chars/sec | {currentSpeed.linesPerMin.toFixed(1)} lignes/min
        </div>
      )}

      <textarea
        disabled={loading}
        value={textAreaValue}
        autoCorrect={'off'}
        onKeyDownCapture={onKeyDown}
        onChange={() => {}}
        rows={15}
        placeholder={'Codez ici !'}
        className={styles.textarea}
        spellCheck={false}
      ></textarea>
    </div>
  );
};
