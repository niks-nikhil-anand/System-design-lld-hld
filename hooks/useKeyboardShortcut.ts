'use client';

import { useEffect } from 'react';

export function useKeyboardShortcut(
  keyCombo: string,
  callback: () => void,
  targetElement?: HTMLElement | null
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();

      if (keyCombo.toLowerCase() === 'cmd+k' || keyCombo.toLowerCase() === 'ctrl+k') {
        if (isCmdOrCtrl && key === 'k') {
          e.preventDefault();
          callback();
        }
      } else if (keyCombo.toLowerCase() === 'escape' && key === 'escape') {
        callback();
      }
    };

    const target = targetElement || window;
    target.addEventListener('keydown', handleKeyDown as EventListener);
    return () => target.removeEventListener('keydown', handleKeyDown as EventListener);
  }, [keyCombo, callback, targetElement]);
}
