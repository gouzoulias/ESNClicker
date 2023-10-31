import * as _ from 'lodash';
import { useCallback, useContext, useEffect, useState } from 'react';
import sourceCode from '../assets/code.txt';
import { gameContext } from '../Game/GameContext.ts';
import { useTick } from '../Utils/useTick.ts';

export const DevCodeVisualizer = () => {
  const game = useContext(gameContext);

  const [code, setCode] = useState('');
  const [iLine, setILine] = useState(0);
  const [textAreaValue, setTextAreaValue] = useState('');

  useEffect(() => {
    fetch(sourceCode)
      .then((value) => value.text())
      .then(setCode);
  }, []);

  const onTick = useCallback(
    (deltaTimeInSecond: number) => {
      const codeProduction: number = _.chain(game.devTeamInfo)
        .map(({ numberOwned, productivity }) => numberOwned * productivity * deltaTimeInSecond)
        .reduce((prev, curr) => prev + curr, 0)
        .value();
      setILine((prevState) => (prevState + codeProduction) % code.length);
    },
    [code.length, game.devTeamInfo],
  );

  useEffect(() => {
    setTextAreaValue(
      code
        .split('\n')
        .slice(iLine - 15, iLine)
        .join('\n'),
    );
  }, [code, iLine]);

  useTick(onTick, 100);

  return (
    <div style={{ display: 'flex' }}>
      <textarea
        value={textAreaValue}
        autoCorrect={'off'}
        disabled={true}
        onChange={() => {}}
        rows={15}
        style={{ width: '100%', resize: 'none' }}
        spellCheck={false}
      ></textarea>
    </div>
  );
};
