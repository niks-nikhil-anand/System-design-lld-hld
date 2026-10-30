import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export type InformationPageKey =
  | "about"
  | "contact"
  | "editorial-policy"
  | "privacy-policy"
  | "terms-of-use"
  | "cookie-policy"
  | "disclaimer";

export interface InformationSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
}

export interface InformationPageContent {
  slug: InformationPageKey;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  updated: string;
  effective?: string;
  sections: InformationSection[];
}

export const CONTACT_EMAIL = siteConfig.contactEmail;

export const INFORMATION_PAGES: Record<
  InformationPageKey,
  InformationPageContent
> = {
  about: {
    slug: "about",
    eyebrow: "About the platform",
    title: "Clearer ways to learn complex systems",
    summary:
      "System Design Mate is an interactive learning platform for building practical intuition about distributed systems, backend architecture, and scalability.",
    description:
      "Learn about System Design Mate, its educational mission, and how its visual system design resources are created.",
    updated: "2026-10-30",
    sections: [
      {
        id: "mission",
        title: "Our mission",
        paragraphs: [
          "System design is often taught as a collection of diagrams and rules of thumb. We want to make the subject easier to reason about by connecting each pattern to the problem it solves, the tradeoffs it introduces, and the behavior users can observe.",
          "System Design Mate combines concise explanations, interactive visual models, case studies, algorithms, and guided learning paths so learners can move from vocabulary to informed architectural decisions.",
        ],
      },
      {
        id: "who-it-is-for",
        title: "Who it is for",
        paragraphs: [
          "The platform is designed for software engineers, students, interview candidates, technical leads, and anyone who wants a structured introduction to scalable software systems.",
        ],
        bullets: [
          "Beginners learning core distributed-systems concepts",
          "Engineers preparing for system design interviews",
          "Practitioners refreshing architecture patterns and tradeoffs",
          "Teams looking for a shared visual language for technical discussions",
        ],
      },
      {
        id: "how-we-teach",
        title: "How we teach",
        paragraphs: [
          "Lessons are organized around real engineering questions: how requests move, where state lives, what fails, and which constraints shape the design. Interactive diagrams and compact examples are used to make those relationships visible.",
          "Learning material is educational rather than prescriptive. Production systems depend on context, workload, organizational constraints, and operational experience.",
        ],
      },
      {
        id: "independence",
        title: "Independent educational models",
        paragraphs: [
          "Company architecture pages are simplified models assembled from public engineering posts, conference talks, papers, and other cited material. They are not verified descriptions of private internal systems.",
          "Companies and products mentioned on the platform do not sponsor, endorse, or maintain System Design Mate unless a page explicitly states otherwise.",
        ],
        note: "For our research and review standards, read the Editorial Policy.",
      },
    ],
  },
  contact: {
    slug: "contact",
    eyebrow: "Get in touch",
    title: "Questions, corrections, and thoughtful feedback",
    summary:
      "Contact the System Design Mate team about content corrections, privacy requests, accessibility issues, partnerships, or general enquiries.",
    description:
      "Contact System Design Mate for support, content corrections, privacy requests, accessibility feedback, or partnerships.",
    updated: "2026-10-30",
    sections: [
      {
        id: "general",
        title: "General enquiries",
        paragraphs: [
          `Email ${CONTACT_EMAIL} for questions about the platform, learning material, or account access. Include a clear subject and the relevant page URL when possible.`,
        ],
      },
      {
        id: "corrections",
        title: "Content corrections",
        paragraphs: [
          "We welcome specific, well-sourced corrections. Please include the page title, the statement you believe needs attention, and a reliable public source that supports the correction.",
        ],
      },
      {
        id: "privacy",
        title: "Privacy and account requests",
        paragraphs: [
          `For access, correction, or deletion requests relating to personal data, email ${CONTACT_EMAIL} from the address associated with your account. We may need to verify your identity before completing a request.`,
        ],
      },
      {
        id: "accessibility",
        title: "Accessibility feedback",
        paragraphs: [
          "If any interaction, diagram, or document is difficult to use with assistive technology, tell us what you were trying to do, the page involved, and your browser or assistive technology where comfortable.",
        ],
      },
      {
        id: "response-times",
        title: "Response times",
        paragraphs: [
          "We aim to acknowledge substantive enquiries within five business days. Privacy, security, and accessibility matters are prioritized, although a complete investigation may take longer.",
        ],
      },
    ],
  },
  "editorial-policy": {
    slug: "editorial-policy",
    eyebrow: "How content is made",
    title: "Editorial standards for useful technical learning",
    summary:
      "Our editorial process prioritizes clear explanations, trustworthy public sources, visible tradeoffs, and corrections when material changes or falls short.",
    description:
      "Read how System Design Mate researches, reviews, simplifies, updates, and corrects its technical educational content.",
    updated: "2026-10-30",
    sections: [
      {
        id: "principles",
        title: "Editorial principles",
        paragraphs: [
          "We create material for people first. A useful lesson should explain not only what a component does, but when it is appropriate, what can go wrong, and which tradeoffs deserve attention.",
        ],
        bullets: [
          "Clarity without hiding important complexity",
          "Original synthesis instead of copied summaries",
          "Explicit assumptions and tradeoffs",
          "Respect for uncertainty and changing systems",
          "Prompt, visible correction of material errors",
        ],
      },
      {
        id: "sources",
        title: "Research and source selection",
        paragraphs: [
          "We prefer primary and technically authoritative material, including official documentation, engineering publications, standards, research papers, and talks by people who worked on the systems being discussed.",
          "Secondary sources may help identify a topic or provide context, but important claims should be checked against stronger evidence whenever practical.",
        ],
      },
      {
        id: "review",
        title: "Drafting and review",
        paragraphs: [
          "Content is structured around a learning objective, reviewed for internal consistency, and checked for misleading absolutes. Examples and diagrams are simplified deliberately, and relevant limitations should appear near the explanation they qualify.",
          "Material may be supported by automated tools, including tools used for research organization, editing, or code generation. Automated output is not treated as an authoritative source and remains subject to human editorial responsibility.",
        ],
      },
      {
        id: "company-models",
        title: "Company architecture models",
        paragraphs: [
          "Architecture pages about named companies are educational reconstructions from public information. Real systems evolve continuously and may differ materially from the simplified model shown.",
          "A company name or product mark is used only for identification and does not imply access to confidential information, affiliation, sponsorship, or endorsement.",
        ],
      },
      {
        id: "updates",
        title: "Updates and corrections",
        paragraphs: [
          "We review content when underlying technologies change, credible corrections are received, or a lesson no longer reflects its intended learning objective. Significant corrections should update the page's review date or be noted in the content.",
          `To report an issue, email ${CONTACT_EMAIL} with the page URL, the disputed passage, and supporting evidence.`,
        ],
      },
    ],
  },
  "privacy-policy": {
    slug: "privacy-policy",
    eyebrow: "Your information",
    title: "Privacy Policy",
    summary:
      "This policy explains what information System Design Mate processes, why it is used, and the choices available to visitors and registered users.",
    description:
      "Learn what personal information System Design Mate processes and how account, session, bookmark, and progress data are handled.",
    updated: "2026-10-30",
    effective: "2026-10-30",
    sections: [
      {
        id: "scope",
        title: "Scope and contact",
        paragraphs: [
          `This policy applies to System Design Mate's website, accounts, and learning features. Questions or requests about personal information can be sent to ${CONTACT_EMAIL}.`,
        ],
      },
      {
        id: "information-we-process",
        title: "Information we process",
        paragraphs: [
          "You can browse public learning content without creating an account. If you register, we process the details needed to create and secure the account and to provide account-based learning features.",
        ],
        bullets: [
          "Account information: email address, optional display name, password hash, role, and account timestamps",
          "Session information: a random session token and expiration date",
          "Learning information: saved bookmarks, progress percentages, and related timestamps",
          "Local browser preferences: theme, recent searches, and locally stored learning state where those features are used",
          "Technical records: hosting or security logs that may include request time, IP address, browser information, and requested URL",
          "Communications: information you include when contacting us",
        ],
      },
      {
        id: "how-we-use-information",
        title: "How information is used",
        paragraphs: [
          "We use information to operate the service, authenticate users, synchronize requested account features, protect the platform, respond to enquiries, diagnose failures, and meet legal obligations.",
          "We do not sell personal information. The current application code does not identify advertising trackers or non-essential analytics cookies.",
        ],
      },
      {
        id: "storage-and-sharing",
        title: "Storage and service providers",
        paragraphs: [
          "Account, session, bookmark, and progress records are stored in the application's database. Browser-only preferences remain on your device until cleared, unless a feature explicitly synchronizes them to an account.",
          "Information may be processed by infrastructure providers that host the application, database, or operational logs. We may also disclose information when required by law, to protect users or the service, or as part of a legitimate business transfer subject to appropriate safeguards.",
        ],
      },
      {
        id: "retention",
        title: "Retention and security",
        paragraphs: [
          "Session records expire after 30 days unless ended earlier. Other account records are retained while an account remains active and for a reasonable period afterward when needed for security, dispute resolution, backups, or legal obligations.",
          "Passwords are stored as cryptographic hashes, and authentication cookies are configured as HTTP-only and SameSite=Lax. No online service can guarantee absolute security.",
        ],
      },
      {
        id: "choices",
        title: "Your choices and rights",
        paragraphs: [
          `Depending on where you live, you may have rights to access, correct, delete, restrict, or receive a copy of personal information. Send a request to ${CONTACT_EMAIL} from the email associated with your account. Identity verification may be required.`,
          "You can clear browser-only preferences through your browser settings. You can end an active session by logging out.",
        ],
      },
      {
        id: "children-and-changes",
        title: "Children and policy changes",
        paragraphs: [
          "System Design Mate is not directed to children under 13, and we do not knowingly collect personal information from them. A parent or guardian who believes a child provided information should contact us.",
          "We may update this policy as the service changes. The updated date at the top of this page identifies the current version, and material changes may receive additional notice where appropriate.",
        ],
      },
    ],
  },
  "terms-of-use": {
    slug: "terms-of-use",
    eyebrow: "Using the platform",
    title: "Terms of Use",
    summary:
      "These terms describe the rules for using System Design Mate and the limits that apply to its educational content and services.",
    description:
      "Review the terms governing accounts, acceptable use, educational content, intellectual property, and service availability.",
    updated: "2026-10-30",
    effective: "2026-10-30",
    sections: [
      {
        id: "acceptance",
        title: "Acceptance and eligibility",
        paragraphs: [
          "By accessing or using System Design Mate, you agree to these Terms of Use and the Privacy Policy. If you do not agree, do not use the service.",
          "You must be legally capable of agreeing to these terms. If you use the service on behalf of an organization, you represent that you have authority to bind that organization.",
        ],
      },
      {
        id: "accounts",
        title: "Accounts and security",
        paragraphs: [
          "You are responsible for providing accurate registration information, protecting your credentials, and activity conducted through your account. Notify us promptly if you suspect unauthorized access.",
          "We may suspend or terminate accounts used in violation of these terms or in a manner that threatens users, content, infrastructure, or the availability of the service.",
        ],
      },
      {
        id: "acceptable-use",
        title: "Acceptable use",
        paragraphs: [
          "You may use the platform for lawful personal, educational, and professional learning purposes.",
        ],
        bullets: [
          "Do not disrupt, overload, probe, or bypass the service's security controls",
          "Do not attempt to access another user's account or restricted administration areas",
          "Do not use automated access in a way that harms service availability or violates applicable law",
          "Do not misrepresent System Design Mate content as an endorsed description of a company's private systems",
          "Do not reproduce or redistribute substantial portions of the service in violation of applicable intellectual-property rights",
        ],
      },
      {
        id: "content-and-ip",
        title: "Content and intellectual property",
        paragraphs: [
          "The platform's original text, visual design, diagrams, software, and organization are protected by applicable intellectual-property laws. References to third-party products, companies, and trademarks remain the property of their respective owners.",
          "Feedback may be used to improve the service without an obligation to compensate you, provided we do not publicly attribute private feedback to you without permission.",
        ],
      },
      {
        id: "educational-service",
        title: "Educational service and availability",
        paragraphs: [
          "Content is provided for education and interview preparation, not as professional engineering, security, legal, or operational advice. You remain responsible for decisions made in real systems.",
          "Features may change, become unavailable, or be discontinued. We do not promise uninterrupted availability or that every explanation will remain current for every technology or use case.",
        ],
      },
      {
        id: "liability",
        title: "Disclaimers and limitation of liability",
        paragraphs: [
          "To the extent permitted by law, the service is provided without warranties of accuracy, fitness for a particular purpose, or non-infringement. System Design Mate is not responsible for indirect, incidental, special, consequential, or exemplary losses arising from use of the service.",
          "Nothing in these terms excludes rights or liabilities that cannot legally be excluded. The dedicated Disclaimer forms part of these terms.",
        ],
      },
      {
        id: "changes-and-contact",
        title: "Changes and contact",
        paragraphs: [
          `We may revise these terms as the platform evolves. Continued use after revised terms take effect constitutes acceptance where permitted by law. Questions can be sent to ${CONTACT_EMAIL}.`,
          "Governing-law and dispute-resolution provisions will be added when the operating entity and jurisdiction are finalized.",
        ],
        note: "The governing jurisdiction must be completed before a commercial production launch.",
      },
    ],
  },
  "cookie-policy": {
    slug: "cookie-policy",
    eyebrow: "Browser storage",
    title: "Cookie Policy",
    summary:
      "System Design Mate uses a necessary authentication cookie for signed-in sessions and browser storage for preferences and learning convenience features.",
    description:
      "Understand the essential session cookie and local browser storage used by System Design Mate.",
    updated: "2026-10-30",
    effective: "2026-10-30",
    sections: [
      {
        id: "what-we-use",
        title: "What we use",
        paragraphs: [
          "Cookies are small values stored by a browser and sent with relevant requests. Local storage keeps values in the browser but does not automatically send them to the server.",
          "The current application uses one essential cookie for authenticated sessions. It also uses local storage for features such as theme, bookmarks, learned topics, and recent searches where those features are not synchronized to an account.",
        ],
      },
      {
        id: "essential-cookie",
        title: "Essential authentication cookie",
        paragraphs: [
          "systemly_session — set by System Design Mate after login or registration; used to authenticate the account; HTTP-only; SameSite=Lax; secure in production; expires after 30 days unless the user logs out earlier.",
          "Because this cookie is required to provide account login and security, it is not used for advertising and is not controlled through an optional-cookie preference.",
        ],
      },
      {
        id: "local-storage",
        title: "Local browser storage",
        paragraphs: [
          "Local storage may remember theme choice, bookmarks, learning state, and recent searches so these preferences remain available on the same browser. Clearing site data removes locally stored values.",
          "Some bookmarks or progress may instead be stored in the account database when an account synchronization feature is used. That processing is described in the Privacy Policy.",
        ],
      },
      {
        id: "analytics",
        title: "Analytics and advertising",
        paragraphs: [
          "The current application code does not identify non-essential analytics cookies, advertising cookies, or third-party behavioral tracking. If these technologies are introduced, this policy and any required consent controls should be updated before they are enabled.",
        ],
      },
      {
        id: "controls",
        title: "Your controls",
        paragraphs: [
          "You can delete or block cookies through browser settings and clear local storage through the browser's site-data controls. Blocking the essential session cookie prevents login and account-based features from working correctly.",
          `Questions about browser storage can be sent to ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },
  disclaimer: {
    slug: "disclaimer",
    eyebrow: "Important limitations",
    title: "Educational Content Disclaimer",
    summary:
      "System Design Mate provides simplified educational models. It is not a substitute for professional judgment, production testing, or current first-party documentation.",
    description:
      "Read the limitations that apply to System Design Mate's educational models, company architecture pages, and technical examples.",
    updated: "2026-10-30",
    effective: "2026-10-30",
    sections: [
      {
        id: "education-only",
        title: "Educational use only",
        paragraphs: [
          "Material on System Design Mate is provided for general education and interview preparation. It is not professional engineering, security, compliance, legal, financial, or operational advice.",
          "Examples are intentionally compact and may omit production requirements such as threat modeling, privacy controls, regional regulation, incident response, organizational capacity, migration cost, and vendor-specific constraints.",
        ],
      },
      {
        id: "accuracy",
        title: "Accuracy and changing technology",
        paragraphs: [
          "We aim to publish useful and well-supported material, but we do not guarantee that every explanation is complete, error-free, or current. Technologies, pricing, limits, and recommended practices change over time.",
          "Verify important decisions against current primary documentation, qualified experts, representative testing, and the requirements of your own system.",
        ],
      },
      {
        id: "company-pages",
        title: "Company architectures and trademarks",
        paragraphs: [
          "Company architecture pages are simplified reconstructions from publicly available sources. They do not claim to reveal current or confidential internal architecture.",
          "Company names, product names, and trademarks belong to their respective owners and are used for identification and commentary. Their appearance does not imply affiliation, sponsorship, or endorsement.",
        ],
      },
      {
        id: "interviews",
        title: "Interview preparation",
        paragraphs: [
          "Learning paths and case studies cannot guarantee an interview outcome. Interview expectations vary by company, role, level, interviewer, and time.",
        ],
      },
      {
        id: "external-resources",
        title: "External resources and responsibility",
        paragraphs: [
          "Links to external resources are provided for context. We do not control their availability, security, or continued accuracy.",
          `You are responsible for how you apply the material. To report a substantive error, contact ${CONTACT_EMAIL} with the page URL and supporting evidence.`,
        ],
      },
    ],
  },
};

export const INFORMATION_LINKS: Array<{
  slug: InformationPageKey;
  label: string;
}> = [
  { slug: "about", label: "About" },
  { slug: "contact", label: "Contact" },
  { slug: "editorial-policy", label: "Editorial Policy" },
  { slug: "privacy-policy", label: "Privacy Policy" },
  { slug: "terms-of-use", label: "Terms of Use" },
  { slug: "cookie-policy", label: "Cookie Policy" },
  { slug: "disclaimer", label: "Disclaimer" },
];

export function informationMetadata(slug: InformationPageKey): Metadata {
  const page = INFORMATION_PAGES[slug];
  const canonical = `/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: page.title,
      description: page.description,
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
    },
  };
}
