"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.visualViewport?.addEventListener("resize", callback);
  window.visualViewport?.addEventListener("scroll", callback);
  window.addEventListener("resize", callback);
  return () => {
    window.visualViewport?.removeEventListener("resize", callback);
    window.visualViewport?.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}
const snapshot = () =>
  `${window.visualViewport?.height ?? window.innerHeight}:${window.visualViewport?.offsetTop ?? 0}`;

// The software keyboard can shrink the visual viewport without changing CSS dvh.
export function useVisualViewport() {
  const value = useSyncExternalStore(subscribe, snapshot, () => "0:0");
  const [height, top] = value.split(":").map(Number);
  return { height, top };
}
