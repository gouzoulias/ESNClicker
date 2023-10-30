import { useEffect, useRef } from 'react';

export const useTick = (callback: (deltaTimeInSecond: number) => void, deltaTimeMS: number) => {
  const intervalRef = useRef<number>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => callbackRef.current(deltaTimeMS / 1000), deltaTimeMS);

    return () => window.clearInterval(intervalRef.current);
  }, [deltaTimeMS]);

  return intervalRef;
};
