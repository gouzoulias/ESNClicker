import * as _ from 'lodash';
import { KeyboardEventHandler, useCallback, useContext, useEffect, useRef, useState } from 'react';
import sourceCode from '../assets/code.txt';
import { GameContext, gameContext } from '../Game/GameContext.ts';

export const CodeMaker = () => {
  const game: GameContext = useContext(gameContext);

  const [loading, setLoading] = useState(true);

  const [textAreaValue, setTextAreaValue] = useState('');
  const [iCode, setICode] = useState(0);
  const [code, setCode] = useState('');
  
  // Rate limiting: 10 lines per minute for autocode mode
  const characterBudget = useRef(0);
  const lastUpdateTime = useRef(Date.now());
  const [averageCharsPerLine, setAverageCharsPerLine] = useState(30); // default estimate
  
  // Typing speed tracking - separate windows for chars and lines
  const typingEvents = useRef<Array<{ timestamp: number; chars: number }>>([]);
  const lineEvents = useRef<Array<{ timestamp: number; lines: number }>>([]);
  const [currentSpeed, setCurrentSpeed] = useState({ charsPerSec: 0, linesPerMin: 0 });

  useEffect(() => {
    fetch(sourceCode)
      .then((value) => value.text())
      .then((codeContent) => {
        setCode(codeContent);
        
        // Calculate file statistics dynamically
        const lines = codeContent.split('\n');
        const totalLines = lines.length;
        const totalChars = codeContent.length;
        const avgChars = totalLines > 0 ? totalChars / totalLines : 30;
        
        setAverageCharsPerLine(avgChars);
        
        console.log(`File stats: ${totalLines} lines, ${totalChars} chars, avg ${avgChars.toFixed(1)} chars/line`);
      })
      .finally(() => setLoading(false));
  }, []);

  // Track typing activity for speed calculation
  const recordTypingActivity = useCallback((charsAdded: number, linesAdded: number) => {
    const now = Date.now();
    
    // Add new character event (5-second window)
    typingEvents.current.push({ timestamp: now, chars: charsAdded });
    const fiveSecondsAgo = now - 5000;
    typingEvents.current = typingEvents.current.filter(event => event.timestamp >= fiveSecondsAgo);
    
    // Add new line event (30-second window)
    if (linesAdded > 0) {
      lineEvents.current.push({ timestamp: now, lines: linesAdded });
    }
    const thirtySecondsAgo = now - 30000;
    lineEvents.current = lineEvents.current.filter(event => event.timestamp >= thirtySecondsAgo);
    
    // Calculate chars per second (5-second window)
    const totalChars = typingEvents.current.reduce((sum, event) => sum + event.chars, 0);
    const charTimeSpanMs = typingEvents.current.length > 0 ? now - typingEvents.current[0].timestamp : 0;
    const charTimeSpanSec = Math.max(charTimeSpanMs / 1000, 0.1);
    const charsPerSec = totalChars / charTimeSpanSec;
    
    // Calculate lines per minute (30-second window)
    const totalLines = lineEvents.current.reduce((sum, event) => sum + event.lines, 0);
    const lineTimeSpanMs = lineEvents.current.length > 0 ? now - lineEvents.current[0].timestamp : 0;
    const lineTimeSpanMin = Math.max(lineTimeSpanMs / 60000, 1/60); // At least 1 second
    const linesPerMin = totalLines / lineTimeSpanMin;
    
    setCurrentSpeed({ charsPerSec, linesPerMin });
  }, []);

  const updateCharacterBudget = useCallback(() => {
    const now = Date.now();
    const deltaTime = (now - lastUpdateTime.current) / 1000; // seconds
    lastUpdateTime.current = now;
    
    // 10 lines per minute = 1 line every 6 seconds
    // Use average chars per line from file analysis for consistent speed
    const charsPerSecond = averageCharsPerLine / 6;
    const maxBudget = charsPerSecond * 2; // Allow 2 seconds of burst
    
    // Regenerate budget based on file's average line length
    characterBudget.current = Math.min(maxBudget, characterBudget.current + deltaTime * charsPerSecond);
  }, [averageCharsPerLine]);

  const addCodeLogic = useCallback(() => {
    updateCharacterBudget();
    
    // Check if we have enough budget for at least 1 character
    if (characterBudget.current < 1) {
      return; // Rate limited
    }
    
    // Use productivity but limited by character budget
    const maxCharsToAdd = Math.floor(characterBudget.current);
    const charsToAdd = Math.min(game.manualProductivity, maxCharsToAdd);
    
    const codeToAdd: string = code.substring(iCode, iCode + charsToAdd);
    
    // Consume budget
    characterBudget.current -= charsToAdd;
    
    // Count actual lines in added content
    const linesAdded = (codeToAdd.match(/\n/g) || []).length;
    
    // Record typing activity for speed tracking
    recordTypingActivity(charsToAdd, linesAdded);
    
    if (linesAdded > 0) {
      game.createManualLine(linesAdded);
    }
    setTextAreaValue((prevState) => {
      if (iCode === 0) return '' + codeToAdd;
      return prevState + codeToAdd;
    });
    setICode((prevState) => {
      let newState: number = prevState + charsToAdd;
      if (newState > code.length) newState = 0;
      return newState;
    });
  }, [code, game, iCode, updateCharacterBudget]);

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    if (event.repeat) {
      // Key hold detected - use autocode mode with rate limiting
      addCodeLogic();
    } else {
      // Manual key press - no rate limiting, reward the tryhardeur!
      const codeToAdd: string = code.substring(iCode, iCode + game.manualProductivity);
      
      // Count actual lines in added content
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
    }
  }, [addCodeLogic, code, game, iCode]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Typing speed display */}
      <div style={{ 
        marginBottom: '10px', 
        padding: '8px 12px', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '4px',
        fontSize: '14px',
        fontFamily: 'monospace'
      }}>
        <strong>Vitesse:</strong> {currentSpeed.charsPerSec.toFixed(1)} chars/sec | {currentSpeed.linesPerMin.toFixed(1)} lignes/min
      </div>
      
      <textarea
        disabled={loading}
        value={textAreaValue}
        autoCorrect={'off'}
        onKeyDown={onKeyDown}
        onChange={() => {}}
        rows={15}
        placeholder={'Codez ici !'}
        style={{ width: '100%' }}
        spellCheck={false}
      ></textarea>
    </div>
  );
};
