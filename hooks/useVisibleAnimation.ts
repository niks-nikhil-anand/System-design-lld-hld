"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}
const readMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const readVisibility = () => document.visibilityState === "visible";

export function useVisibleAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    readMotion,
    () => true,
  );
  const documentVisible = useSyncExternalStore(
    subscribeVisibility,
    readVisibility,
    () => false,
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return {
    ref,
    active: visible && documentVisible && !reducedMotion,
    reducedMotion,
  };
}
