'use client';

import { useState, useEffect, useCallback } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [learned, setLearned] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const b = localStorage.getItem('systemly:bookmarks');
      if (b) setBookmarks(JSON.parse(b));
    } catch {}

    try {
      const l = localStorage.getItem('systemly:learned');
      if (l) setLearned(JSON.parse(l));
    } catch {}

    try {
      const r = localStorage.getItem('systemly:recent');
      if (r) setRecent(JSON.parse(r));
    } catch {}
  }, []);

  const toggleBookmark = useCallback((key: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(key);
      const updated = exists ? prev.filter((k) => k !== key) : [...prev, key];
      try {
        localStorage.setItem('systemly:bookmarks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const isBookmarked = useCallback(
    (key: string) => bookmarks.includes(key),
    [bookmarks]
  );

  const toggleLearned = useCallback((key: string) => {
    setLearned((prev) => {
      const exists = prev.includes(key);
      const updated = exists ? prev.filter((k) => k !== key) : [...prev, key];
      try {
        localStorage.setItem('systemly:learned', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const isLearned = useCallback(
    (key: string) => learned.includes(key),
    [learned]
  );

  const addRecent = useCallback((query: string) => {
    const q = query.trim();
    if (!q) return;
    setRecent((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== q.toLowerCase());
      const updated = [q, ...filtered].slice(0, 8);
      try {
        localStorage.setItem('systemly:recent', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  return {
    bookmarks,
    learned,
    recent,
    toggleBookmark,
    isBookmarked,
    toggleLearned,
    isLearned,
    addRecent
  };
}
