import { useCallback, useEffect, useRef } from 'react';

export function useDebouncedClick(callback, delay = 300) {
  const callbackRef = useRef(callback);
  const lastCallRef = useRef(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastCallRef.current < delay) {
      return;
    }

    lastCallRef.current = now;
    return callbackRef.current?.(...args);
  }, [delay]);
}
