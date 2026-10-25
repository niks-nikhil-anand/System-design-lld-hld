import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="cms-empty">
      <h1>Admin page not found</h1>
      <p>Choose a collection from the sidebar or return to the overview.</p>
      <Button render={<Link href="/admin" />} nativeButton={false}>
        Back to overview
      </Button>
    </div>
  );
}
