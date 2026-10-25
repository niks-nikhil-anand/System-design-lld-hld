"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, ThemeMode } from "@/hooks/useTheme";
import { Sun, Moon, Laptop } from "lucide-react";

export function ThemeToggle({
  placement = "bottom",
}: {
  placement?: "top" | "bottom";
}) {
  const { theme, isDark, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Choose theme"
        aria-expanded={open}
        className="sy-ghost flex items-center justify-center w-11 h-11 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] cursor-pointer transition-colors"
      >
        {theme === "auto" ? (
          <Laptop className="w-4 h-4" />
        ) : isDark ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </button>

      {open && (
        <div
          className={`absolute right-0 ${placement === "top" ? "bottom-full mb-2" : "top-full mt-2"} w-36 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg py-1 z-50`}
          style={{ boxShadow: "var(--shadow)" }}
        >
          {(
            [
              { mode: "light", label: "Light", icon: Sun },
              { mode: "dark", label: "Dark", icon: Moon },
              { mode: "auto", label: "System", icon: Laptop },
            ] as const
          ).map(({ mode, label, icon: Icon }) => (
            <button
              key={mode}
              type="button"
              onClick={() => {
                setTheme(mode as ThemeMode);
                setOpen(false);
              }}
              className={`w-full min-h-11 flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors text-left ${
                theme === mode
                  ? "bg-[var(--accentSoft)] text-[var(--accent)]"
                  : "text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
              {theme === mode && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
