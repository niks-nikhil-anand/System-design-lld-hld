import type { Metadata } from "next";
import { LoginPage } from "@/components/auth/LoginPage";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your System Design Mate workspace.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LoginPage />;
}
