import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, GitBranch, Layers, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { SystemlyLogo } from "@/components/ui/SystemlyLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function LoginPage() {
  return (
    <div className="workspace-page login-page">
      <header className="workspace-header sy-container">
        <Link href="/" aria-label="System Design Mate home"><SystemlyLogo /></Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="workspace-back"><ArrowLeft size={15} /> Back to learning</Link>
          <ThemeToggle />
        </div>
      </header>
      <main id="main-content" className="login-main sy-container">
        <section className="login-story" aria-labelledby="login-story-title">
          <span className="workspace-eyebrow"><span className="workspace-dot" /> YOUR SYSTEM DESIGN WORKSPACE</span>
          <h2 id="login-story-title">Great systems start<br />with <span>clear thinking.</span></h2>
          <p>A little curiosity. A few building blocks. A better understanding of how everything connects.</p>
          <div className="login-diagram" aria-label="System architecture: client connects to an API, which connects to a cache and database" role="img">
            <div className="login-node"><GitBranch size={22} /><span>Client</span></div>
            <span className="login-connector" aria-hidden="true" />
            <div className="login-node login-node-accent"><Layers size={22} /><span>API</span></div>
            <span className="login-connector" aria-hidden="true" />
            <div className="login-node-stack"><div className="login-node">Cache</div><div className="login-node">Database</div></div>
          </div>
          <div className="login-story-caption"><BookOpen size={17} /><span>Learn the concepts. See the connections.</span></div>
        </section>
        <section className="login-card" aria-labelledby="login-title">
          <span className="workspace-icon"><LockKeyhole size={23} /></span>
          <h1 id="login-title">Welcome back</h1>
          <p className="text-[var(--muted)]">Log in to your System Design Mate workspace.</p>
          <div className="login-form">
            <div>
              <label htmlFor="email">Email address</label>
              <div className="workspace-input"><Mail size={17} aria-hidden="true" /><input id="email" name="email" type="email" autoComplete="username" placeholder="you@example.com" required /></div>
            </div>
            <div>
              <div className="login-label-row"><label htmlFor="password">Password</label><span>Forgot password?</span></div>
              <div className="workspace-input"><LockKeyhole size={17} aria-hidden="true" /><input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required /></div>
            </div>
            <p className="login-help">Use the email associated with your account.</p>
            <Link href="/admin" className="workspace-button workspace-button-primary sy-primary">Log in <ArrowRight size={17} /></Link>
          </div>
          <div className="login-preview"><span>Just looking around?</span><Link href="/admin">Explore the workspace preview <ArrowRight size={15} /></Link></div>
          <p className="login-footnote"><ShieldCheck size={15} /> Interface preview · access controls are not connected</p>
        </section>
      </main>
      <footer className="login-footer sy-container"><span>System Design Mate · Understand the systems behind the software.</span><Link href="/about">About System Design Mate <ArrowRight size={14} /></Link></footer>
    </div>
  );
}
