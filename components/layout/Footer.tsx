import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { SystemlyLogo } from "@/components/ui/SystemlyLogo";

const footerGroups = [
  {
    title: "Learn",
    links: [
      ["Explore", "/explore"],
      ["Concepts", "/concepts"],
      ["Algorithms", "/algorithms"],
      ["Case studies", "/case-studies"],
      ["Learning paths", "/learning-paths"],
      ["Playground", "/playground"],
    ],
  },
  {
    title: "Company resources",
    links: [
      ["Companies", "/companies"],
      ["Architecture models", "/companies"],
      ["Scalability patterns", "/concepts"],
      ["System design roadmap", "/learning-paths"],
      ["Best practices", "/blog"],
    ],
  },
  {
    title: "More",
    links: [
      ["Blog", "/blog"],
      ["About", "/about"],
      ["Contact", "/contact"],
      ["FAQ", "/#faq"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="sy-container site-footer__inner">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Link href="/" aria-label="System Design Mate home" className="site-footer__logo">
              <SystemlyLogo size={38} />
            </Link>
            <p>
              Learn system design through clear explanations, interactive diagrams,
              algorithm walkthroughs, company architecture models, and guided practice.
            </p>
            <Link className="site-footer__contact" href="/contact">
              <span><Mail size={17} aria-hidden="true" /></span>
              Get in touch
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <nav className="site-footer__groups" aria-label="Footer navigation">
            {footerGroups.map((group) => (
              <div className="site-footer__group" key={group.title}>
                <h2>{group.title}</h2>
                <ul>
                  {group.links.map(([label, href]) => (
                    <li key={`${label}-${href}`}><Link href={href}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <aside className="site-footer__updates" aria-labelledby="footer-updates-title">
            <span className="site-footer__updates-icon"><Mail size={22} aria-hidden="true" /></span>
            <div>
              <h2 id="footer-updates-title">Stay updated</h2>
              <p>Discover new system design guides, company examples, and learning paths.</p>
              <Link href="/blog" className="site-footer__updates-link">
                Explore the latest guides <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">© 2026 System Design Mate. All rights reserved.</p>
          <p className="site-footer__credits">
            <span>Owned by <a href="https://www.devkitmarket.com/" target="_blank" rel="noreferrer">DevKit Market</a></span>
            <span className="site-footer__credit-divider" aria-hidden="true">·</span>
            <span>Made by Nikhil</span>
          </p>
          <nav className="site-footer__legal" aria-label="Legal">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-use">Terms</Link>
            <Link href="/editorial-policy">Editorial policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
