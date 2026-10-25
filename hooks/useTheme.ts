"use client";

import { useEffect, useSyncExternalStore } from "react";
export type ThemeMode = "light" | "dark" | "auto";
const changeEvent = "systemly:theme-change";
let temporaryTheme: ThemeMode = "auto";
function readTheme(): ThemeMode {
  try {
    const value = localStorage.getItem("systemly:theme");
    return value === "light" || value === "dark" ? value : "auto";
  } catch {
    return temporaryTheme;
  }
}
function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}
function subscribeSystem(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const readSystem = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;
export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    readTheme,
    () => "auto" as ThemeMode,
  );
  const systemDark = useSyncExternalStore(
    subscribeSystem,
    readSystem,
    () => false,
  );
  const isDark = theme === "dark" || (theme === "auto" && systemDark);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
  const setTheme = (mode: ThemeMode) => {
    temporaryTheme = mode;
    try {
      localStorage.setItem("systemly:theme", mode);
    } catch {}
    window.dispatchEvent(new Event(changeEvent));
  };
  return {
    theme,
    isDark,
    setTheme,
    toggleTheme: () => setTheme(isDark ? "light" : "dark"),
  };
}
