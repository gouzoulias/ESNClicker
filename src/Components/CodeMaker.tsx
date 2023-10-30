import * as _ from 'lodash';
import { KeyboardEventHandler, useCallback, useContext, useEffect, useState } from 'react';
import sourceCode from '../assets/code.txt';
import { GameContext, gameContext } from '../Game/GameContext.ts';

export const CodeMaker = () => {
  const game: GameContext = useContext(gameContext);

  const [loading, setLoading] = useState(true);

  const [textAreaValue, setTextAreaValue] = useState('');
  const [iCode, setICode] = useState(0);
  const [code, setCode] = useState('');

  useEffect(() => {
    fetch(sourceCode)
      .then((value) => value.text())
      .then(setCode)
      .finally(() => setLoading(false));
  }, []);

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(() => {
    const codeToAdd: string = code.substring(iCode, iCode + game.manualProductivity);
    if (codeToAdd.includes('\n')) {
      game.createManualLine(
        game.manualProductivity *
          _(codeToAdd)
            .filter((codeChar) => codeChar === '\n')
            .size(),
      );
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
  }, [code, game, iCode]);

  return (
    <div style={{ display: 'flex' }}>
      <textarea
        disabled={loading}
        value={textAreaValue}
        autoCorrect={'off'}
        onKeyDownCapture={onKeyDown}
        onChange={() => {}}
        rows={15}
        placeholder={'Codez ici !'}
        style={{ width: '100%' }}
        spellCheck={false}
      ></textarea>
    </div>
  );
};
