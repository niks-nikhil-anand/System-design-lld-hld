"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  isAdminSection,
  recordKey,
  type AdminRecord,
} from "@/lib/admin/config";

const KEY = "systemly:admin-local-drafts:v1";
const EVENT = "systemly:admin-drafts-change";
const AdminContext = createContext<AdminRecord[]>([]);
function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(KEY) || "[]";
  } catch {
    return "[]";
  }
}
function parse(raw: string): AdminRecord[] {
  try {
    const values: unknown = JSON.parse(raw);
    if (!Array.isArray(values)) return [];
    return values.filter(
      (v): v is AdminRecord =>
        !!v &&
        typeof v === "object" &&
        isAdminSection(v.section) &&
        typeof v.slug === "string" &&
        typeof v.title === "string" &&
        typeof v.description === "string" &&
        typeof v.category === "string" &&
        typeof v.difficulty === "string" &&
        typeof v.metric === "string" &&
        ["Local draft", "Archived"].includes(v.status) &&
        !!v.data &&
        typeof v.data === "object",
    );
  } catch {
    return [];
  }
}
export function AdminStore({
  records,
  children,
}: {
  records: AdminRecord[];
  children: React.ReactNode;
}) {
  return (
    <AdminContext.Provider value={records}>{children}</AdminContext.Provider>
  );
}
export function useAdminStore() {
  const seeds = useContext(AdminContext);
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const local = useMemo(() => parse(raw), [raw]);
  const records = useMemo(() => {
    const result = new Map(seeds.map((r) => [recordKey(r), r]));
    local.forEach((r) => result.set(recordKey(r), r));
    return [...result.values()];
  }, [seeds, local]);
  function save(record: AdminRecord) {
    // Read at mutation time so a newer update in another tab is preserved.
    const current = parse(snapshot()).filter(
      (r) => recordKey(r) !== recordKey(record),
    );
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify([
          ...current,
          { ...record, updatedAt: new Date().toISOString() },
        ]),
      );
    } catch {
      throw new Error(
        "This browser could not save the draft. Export it as JSON to keep a copy.",
      );
    }
    window.dispatchEvent(new Event(EVENT));
  }
  function restore(record: AdminRecord) {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify(
          parse(snapshot()).filter((r) => recordKey(r) !== recordKey(record)),
        ),
      );
    } catch {
      throw new Error("This browser could not restore the resource.");
    }
    window.dispatchEvent(new Event(EVENT));
  }
  return { records, seeds, local, save, restore };
}
