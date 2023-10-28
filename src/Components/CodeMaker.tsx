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
      .then((value) => {
        setCode(value);
      })
      .finally(() => setLoading(false));
  }, []);

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(() => {
    setTextAreaValue((prevState) => {
      const codeToAdd: string = code.substring(iCode, iCode + 2);
      if (iCode === 0) return '' + codeToAdd;
      return prevState + codeToAdd;
    });
    setICode((prevState) => {
      let newState: number = prevState + 2;
      if (newState > code.length) newState = 0;
      return newState;
    });
  }, [code, iCode]);

  return (
    <>
      <textarea disabled={loading} value={textAreaValue} onKeyDown={onKeyDown} onChange={() => {}}></textarea>
      <button type={'button'} onClick={game.createManualLine}>
        Coder !
      </button>
    </>
  );
};
