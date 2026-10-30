"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";

interface Snapshot { bookmarks: string[]; learned: string[]; recent: string[] }
const emptySnapshot: Snapshot = { bookmarks: [], learned: [], recent: [] };
let snapshot = emptySnapshot;
const changeEvent = "systemly:learning-state-change";
const StoreContext = createContext(false);

function publish(next: Snapshot) {
  snapshot = next;
  if (typeof window !== "undefined") window.dispatchEvent(new Event(changeEvent));
}
function subscribe(callback: () => void) {
  window.addEventListener(changeEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(changeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}
function getSnapshot() { return snapshot; }
function getServerSnapshot() { return emptySnapshot; }
function readList(key: string) {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
  } catch { return []; }
}

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    publish({
      bookmarks: readList("systemly:bookmarks"),
      learned: readList("systemly:learned"),
      recent: readList("systemly:recent"),
    });
  }, []);
  return <StoreContext.Provider value={true}>{children}</StoreContext.Provider>;
}

export function useBookmarks() {
  const inProvider = useContext(StoreContext);
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!inProvider) throw new Error("useBookmarks must be used within BookmarkProvider");
  const toggle = useCallback((field: "bookmarks" | "learned", storageKey: string, key: string) => {
    const current = snapshot[field];
    const updated = current.includes(key) ? current.filter((item) => item !== key) : [...current, key];
    try { localStorage.setItem(storageKey, JSON.stringify(updated)); } catch {}
    publish({ ...snapshot, [field]: updated });
  }, []);
  const toggleBookmark = useCallback((key: string) => toggle("bookmarks", "systemly:bookmarks", key), [toggle]);
  const toggleLearned = useCallback((key: string) => toggle("learned", "systemly:learned", key), [toggle]);
  const addRecent = useCallback((query: string) => {
    const value = query.trim();
    if (!value) return;
    const updated = [value, ...snapshot.recent.filter((item) => item.toLowerCase() !== value.toLowerCase())].slice(0, 8);
    try { localStorage.setItem("systemly:recent", JSON.stringify(updated)); } catch {}
    publish({ ...snapshot, recent: updated });
  }, []);
  const isBookmarked = useCallback((key: string) => state.bookmarks.includes(key), [state.bookmarks]);
  const isLearned = useCallback((key: string) => state.learned.includes(key), [state.learned]);
  return { ...state, toggleBookmark, isBookmarked, toggleLearned, isLearned, addRecent };
}
