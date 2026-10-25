import type { Metadata } from "next";
import { LoginPage } from "@/components/auth/LoginPage";

export const metadata: Metadata = {
  title: "Log in — Systemly",
  description: "Log in to your Systemly workspace.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LoginPage />;
}
