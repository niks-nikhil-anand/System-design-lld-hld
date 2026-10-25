"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
export default function Error({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>We couldn’t load this page.</CardTitle>
        <CardDescription>
          Your saved local drafts are still in this browser. Try loading the
          page again.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => retry()}>Try again</Button>
      </CardContent>
    </Card>
  );
}
