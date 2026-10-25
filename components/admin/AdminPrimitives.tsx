"use client";
import { Info, SearchX } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminStatus } from "@/lib/admin/config";

export function PageHeading({
  eyebrow = "CONTENT WORKSPACE",
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="cms-heading">
      <div>
        <span className="workspace-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}
export function LocalNotice() {
  return (
    <Alert className="cms-notice">
      <Info />
      <AlertDescription>
        Local preview workspace. Drafts and archives are saved in this browser;
        publishing and account access need a backend.
      </AlertDescription>
    </Alert>
  );
}
export function StatusBadge({ status }: { status: AdminStatus }) {
  return (
    <span
      className={`cms-status cms-status-${status === "Published" ? "published" : status === "Archived" ? "archived" : "draft"}`}
    >
      <span />
      {status}
    </span>
  );
}
export function Stats({
  items,
}: {
  items: {
    label: string;
    value: number | string;
    note: string;
    icon: React.ReactNode;
  }[];
}) {
  return (
    <section className="cms-stats" aria-label="Collection summary">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm text-muted-foreground">{item.label}</h2>
              <span className="text-primary">{item.icon}</span>
            </div>
            <strong className="cms-stat-value">{item.value}</strong>
            <p className="text-xs text-muted-foreground">{item.note}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
export function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value !== null) onChange(value);
      }}
      items={options}
    >
      <SelectTrigger aria-label={label} className="min-h-11 w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
export function EmptyState({
  title = "No resources found",
  description = "Try changing your search or filters.",
  onReset,
}: {
  title?: string;
  description?: string;
  onReset?: () => void;
}) {
  return (
    <div className="cms-empty">
      <SearchX size={28} />
      <h2>{title}</h2>
      <p>{description}</p>
      {onReset && (
        <Button variant="outline" onClick={onReset}>
          Clear filters
        </Button>
      )}
    </div>
  );
}
