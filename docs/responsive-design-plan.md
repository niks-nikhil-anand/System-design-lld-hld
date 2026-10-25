# Responsive design plan: navbar, homepage, and footer

## Objective and scope

Make Systemly usable from a 320px-wide phone through a 2560px desktop, with continuous adaptation between sizes. Preserve the existing visual identity, content, theme support, bookmarks, search, and learning navigation.

Implemented on October 25, 2026. The source review and intended behavior below are retained as the design rationale. See [the verification report](responsive-verification.md) for delivered changes, measured viewport results, screenshots, and device-testing limits.

Primary scope: shared navbar, navigation drawer, footer, and every homepage section, including the blog preview. Include homepage search suggestions and the global search overlay because users open them from these surfaces. Check shared navigation on `/blog` and a blog article as regression coverage; a redesign of other learning views is outside this pass.

## 1. Findings from the current code

| Area | Current implementation | Issue to address |
| --- | --- | --- |
| Navbar | 60px height, four action controls, 36px-high buttons, desktop links from 1280px | Limited room on narrow phones, particularly with bookmark counts; small touch targets |
| Navigation | Logo is a clickable `div`; active state compares broad view names | Logo is not keyboard-operable by default; several Explore links can appear active simultaneously |
| Drawer | 320px maximum width, fixed overlay, `h-full`; close control lacks a label | Add dialog semantics, focus management, Escape handling, background scroll lock, and dynamic viewport sizing |
| Footer | One column until 768px, then five equal tracks with the brand spanning two | Abrupt change; intermediate layouts need more deliberate allocation and wrapping |
| Containers | Most sections independently repeat a 1240px cap and 16/24px gutters | Centralize layout rules and allow a modestly wider layout on large screens |
| Shelves | 1/2/3/5 columns at base/640/768/1024px | Five cards at 1024px leave roughly 180px per card; titles are also clamped to one line |
| Main card grids | Mostly 1/2/3 columns at base/768/1024px | Good starting point; add minimum-width checks and deliberate large-screen behavior |
| Hero | Stacked until 1024px; fixed-size diagram nodes at percentage positions | Check the diagram's available width at each layout transition and prevent clipped nodes |
| Playground teaser | Percentage-based positions, nodes at least 70px wide, nested padding, hidden overflow | Narrow canvases can overlap or clip labels; requires a different compact arrangement |
| Concept filters | Horizontal overflow container with a `scrollbar-none` class | Confirm scrollbar styling exists; add a discoverable way to reach offscreen choices |
| Animations | CSS honors reduced motion, but simulation timers continue | Pause simulation updates for reduced motion and inactive sections |

Primary source files: `components/layout/{Navbar,MobileMenu,Footer}.tsx`, `components/hero/HeroSection.tsx`, `components/views/HomeView.tsx`, `components/sections/*.tsx`, `components/cards/*.tsx`, `components/search/SearchModal.tsx`, and `app/globals.css`.

## 2. Viewport behavior

Use CSS viewport width, not device detection. These bands describe expected behavior; also test intermediate widths and landscape orientation. Retain the existing Tailwind 640/768/1024/1280/1536 breakpoints. Use a targeted 375px rule only where the smallest header or footer needs it.

| Viewport | Navbar | Homepage | Footer |
| --- | --- | --- | --- |
| Small phone: 320–374px | Wordmark, search icon, menu; bookmarks and theme in drawer | One column; compact vertical diagrams; full-width primary CTA where needed | Brand followed by three stacked link groups |
| Large phone: 375–767px | Wordmark, search icon, theme, menu; bookmarks in drawer | One main card column; compact shelves may use two columns from 640px | Brand full width; link groups in two columns, with final group on next row |
| Tablet: 768–1023px | Wordmark, search, bookmarks, theme, menu; show labels only when they fit | Two main card columns; stacked hero and playground; three compact shelf columns | Brand above three link-group columns |
| Desktop: 1024–1535px | Compact menu through 1279px; full nav from 1280px after fit validation | Two-part hero; three main card columns; two case-study columns; four shelf columns | Brand plus three link groups in one row |
| Large desktop: 1536px+ | Full navigation aligned to shared container | Capped content; four compact concept/algorithm/company cards where appropriate; three learning-path cards; four blogs; five shelf cards | Same structure with more breathing room; bounded line lengths |

Detailed cards should not gain columns merely because the viewport is wider. Preserve a target width of about 280–320px for information-rich cards and at least 220px for compact shelf cards. Use the available container width to confirm each grid transition. A 1024px four-column shelf is acceptable only with sufficient inner space; otherwise keep three until it fits.

## 3. Shared layout foundations

Implement these before changing individual sections:

- One shared container rule: full width, centered, approximately 1280px maximum below 1536px and 1440px maximum from 1536px. These caps include horizontal padding.
- Gutters: 16px on phones, 24px on tablets, 32px on desktops. Preserve additional safe-area clearance on devices with display cutouts.
- Section vertical padding: 32px on small phones, 40px on larger phones, 48px on tablets, and 64px on desktops. Use smaller internal gaps than inter-section gaps.
- Grid gaps: 16px on phones, 20px on tablets, and 24px on desktops. Shared section headers stack when their title and action cannot fit comfortably in one row.
- Use `min-width: 0` on shrinkable grid/flex children, and intentional wrapping for badges, long titles, and metadata. Scope horizontal scrolling to actual code or diagram regions.
- Use fluid heading sizes with bounded `clamp()` values: hero approximately 32–60px; section headings approximately 24–36px. Keep ordinary reading text around 16px with comfortable line spacing.
- Keep paragraphs around 60–70 characters per line. A large desktop should add useful spacing and suitable columns rather than stretching text across the screen.
- Use a 44×44px interaction target as the project's touch-design target. Small icons can remain visually compact inside those hit areas.
- Keep visible focus styles, existing theme tokens, and reduced-motion support. Do not conceal layout bugs with page-wide `overflow-x: hidden`.

## 4. Navbar and drawer work

### Navbar

1. Replace the clickable logo wrapper with a semantic home link, preserving the current home destination.
2. Increase the header's target height to 64px on phones/tablets and 72px on desktops; align all controls consistently.
3. Apply the action priorities in the viewport table. Keep search immediately available at every size; keep all destinations and theme controls reachable through the drawer.
4. Prevent action icons from shrinking. Give counts a bounded presentation such as `99+`, with the full count in the accessible label.
5. Expand search labels only when space permits. Show the keyboard shortcut hint on roomy layouts with a suitable input method.
6. Keep desktop links on one line at 1280px and above only if all controls fit. If that fit check fails, delay the full navigation transition rather than shrinking text below a readable size.
7. Pass the current route slug as needed so only the matching destination is active. Expose the current destination to assistive technology.
8. Add `aria-expanded` and `aria-controls` to the menu trigger. Keep sticky-header offsets consistent with anchor scrolling and focus visibility.

### Drawer

1. Use a full-width panel on the smallest phones and a bounded 360–400px panel on larger viewports, never exceeding viewport width.
2. Use `100dvh` with a fallback and safe-area padding. Make the middle navigation region scrollable while the close control stays reachable, including in short landscape viewports.
3. Add a named modal dialog, labeled close button, initial focus, focus trapping, Escape dismissal, and focus restoration to the menu trigger.
4. Lock background scrolling and make background content inert while the drawer is open; preserve and restore prior document state on cleanup.
5. Close after navigation and when resizing into the full desktop navbar, removing scroll locks and restoring the correct focus behavior.
6. Keep bookmarks, theme, Blog, and every existing navigation destination available. Avoid duplicate tab stops for controls that are visually hidden.

Acceptance: header fits at 320px with large counts; menu is fully usable by touch and keyboard; no hidden page interaction while it is open; resize and navigation never leave the body locked.

## 5. Homepage work by section

### Hero and search

- Keep text before the diagram in both DOM and visual order. Stack through tablet widths; use two columns on desktop only when both text and diagram fit their minimum widths.
- Let the headline wrap naturally without device-specific hard line breaks. Ensure badges wrap without pushing the viewport wider.
- Make the search input full width within its bounded container. Keep input text at 16px on phones; ensure the clear control and result rows have comfortable hit areas.
- Limit suggestion height to the available viewport and scroll the results internally. Check whether the hero's current hidden overflow clips the suggestion popup; remove that clipping or render the popup outside it.
- Wrap suggestion text and category badges gracefully. Verify suggestions remain reachable with the software keyboard open.
- On compact canvases, use a vertical client → load balancer → servers diagram. Use one shared coordinate definition for nodes, connectors, and animated packets in each orientation.
- Allow the simulator header and statistics to wrap. Keep pause/reset controls reachable without overlapping the title.

### Curated shelves

- Preserve all items. Use 1 column on phones, 2 from 640px, 3 from 768px, 4 only when compact cards fit, and 5 on large desktops.
- Permit two title lines instead of forcing one-line truncation at narrow widths. Avoid fixed card heights; align footers with flexible card bodies.
- Grow bookmark hit areas without placing overlapping click targets over the card's primary action.

### Concepts, algorithms, and companies

- Use 1/2/3 main columns at phone/tablet/desktop widths; permit 4 on large desktop only for cards that retain the target minimum width.
- Wrap card metadata and tags; preserve legible preview charts and company names.
- For concept filters, use a scrollable row on phones with a visible overflow cue and keyboard access. On larger screens, allow wrapping when preferable. Focused or selected filters must scroll into view.
- Keep preview-diagram overflow inside the card and discoverable. Never allow it to widen the entire document.

### Playground teaser

- Stack explanatory text, CTA, and diagram on phones and tablets. Use side-by-side content only when the diagram has enough usable width.
- Reduce nested padding on phones. Make the primary CTA full width when its label and icon otherwise feel cramped.
- Replace fixed horizontal node positions on compact canvases with a vertical flow and a final cache/database branch. Preserve every component and readable label.
- Set diagram height by arrangement; use bounded aspect ratios or content-aware heights rather than a single height for every viewport. Keep connectors and animation coordinates aligned.
- Honor reduced motion, provide pause/play for automatic animation, and suspend timers when the section is offscreen or the tab is hidden.

### Case studies and learning paths

- Keep case studies at 1 column on phones and 2 from tablet sizes, including wide desktops where the cards contain more text.
- Keep learning paths at 1/2/3 columns, with readable module names and metadata. Ensure long module titles do not force counts or labels outside the card.
- Keep section titles and “View all” actions stacked on narrow widths and aligned horizontally when space permits.

### Blog preview

- Use 1 column on phones, 2 on tablets and standard desktops, and 4 only when the large-desktop container supports readable cards.
- Check all four architecture illustrations at their actual card widths; use compact artwork arrangements where labels would otherwise clip.
- Let headlines and dates wrap naturally. Keep the entire article link keyboard-operable with a visible focus treatment.

### FAQ

- Keep a bounded reading width aligned within the shared container.
- Give each summary a comfortable full-row hit area; prevent the chevron from shrinking, and let long questions wrap.
- Verify expanded answers, inline links, and long words at the smallest viewport and at increased text size.

## 6. Footer work

1. Separate the brand area from a responsive link-group grid so intermediate layouts are deliberate.
2. Use the viewport table's progression: stacked groups on small phones; two columns on larger phones; three groups below the brand on tablets; brand beside all three groups on desktops.
3. Keep groups expanded so navigation remains immediately discoverable. Use semantic footer navigation and descriptive group headings.
4. Increase link text toward 14px and use vertical padding for comfortable touch targets. Wrap long labels without clipping.
5. Turn the logo into a semantic home link. Let the status indicator's text wrap while its dot remains fixed-size.
6. Stack copyright and secondary information until both fit in one row. Allow the technology badge to wrap or move to a separate row.
7. Apply safe-area bottom padding and align the footer's container with the navbar and homepage. Verify shared behavior on blog routes too.

## 7. Implementation sequence

| Phase | Work | Completion gate |
| --- | --- | --- |
| 1. Baseline | Capture current layouts and overflow at representative widths; record existing lint failures | Evidence distinguishes current defects from later regressions |
| 2. Foundations | Shared container, spacing, typography, touch-target utilities | Consistent alignment and no container-caused overflow |
| 3. Navigation | Responsive action priorities, active states, semantic logo, accessible drawer | Header and drawer pass 320px, keyboard, landscape, and resize checks |
| 4. Homepage structure | Hero, section headers, shelves, main grids, FAQ, blog preview | Readable content and sensible columns at every breakpoint |
| 5. Diagrams and search | Compact diagram arrangements, coordinated animation, popup bounds, keyboard behavior | No hidden nodes, overlapping labels, or inaccessible search results |
| 6. Footer | Intermediate layouts, link sizing, bottom bar, safe areas | Every link is reachable and aligned across viewport sizes |
| 7. Verification | Viewport matrix, browser checks, accessibility checks, lint/build | Acceptance checklist complete and remaining limitations recorded |

Keep implementation in small reviewable changes. Use existing dependencies first. Read the installed Next.js documentation before any routing or framework-specific changes, as required by `AGENTS.md`.

## 8. Verification matrix

All values are CSS pixels. Automated viewport checks demonstrate layout behavior; physical-device checks are still needed for mobile browser chrome, software keyboards, and safe areas.

| Class | Representative viewports |
| --- | --- |
| Small phones | 320×568, 360×640 |
| Large phones | 375×667, 390×844, 430×932 |
| Phone landscape | 667×375, 844×390 |
| Tablets | 768×1024, 820×1180 |
| Tablet landscape / small desktop | 1024×768 |
| Desktop | 1280×800, 1440×900 |
| Large desktop | 1536×960, 1920×1080, 2560×1440 |

Also check immediately around layout transitions: 374/375, 639/640, 767/768, 1023/1024, 1279/1280, and 1535/1536px. Drag-resize between these widths to find failures the named sizes miss.

### Interaction and content cases

- Light and dark themes; reduced motion; touch and mouse input.
- Zero, one, and large bookmark counts; long titles and metadata.
- Keyboard-only navigation, visible focus, drawer Escape and focus restoration.
- Search with no results, many results, and the mobile keyboard visible.
- Expanded FAQs, all filter choices, and every navigation destination.
- Browser zoom at 200% and reflow at a 320px CSS viewport, including 400% desktop zoom where supported; larger text settings without clipped controls.
- Chromium, Firefox, and Safari; real iOS Safari and Android Chrome where available. Record any device/browser not actually tested.
- Homepage, `/blog`, and a sample `/blog/[id]` for shared header/footer regressions.

### Acceptance checklist

- No document-level horizontal scrolling from 320px through 2560px.
- All text, links, controls, counts, and important diagram labels remain visible and operable.
- Header controls never overlap, and desktop navigation never wraps into a second row.
- Cards maintain useful widths, and long content grows vertically rather than clipping.
- Scrollable previews are contained, discoverable, and keyboard accessible.
- Drawers and overlays fit short viewports, restore focus and scrolling, and do not trap users after resizing.
- Automatic animation respects reduced motion; pause controls work; hidden simulations do not keep updating unnecessarily.
- Shared gutters and bounded text lengths remain consistent on large desktops.
- Capture full-page screenshots at 320, 390, 768, 1024, 1440, and 1920px plus drawer/search states. Use screenshots for visual review and assertions for overflow and interaction behavior.
- Production build succeeds. Changed code passes lint; pre-existing repository lint failures are documented separately.

## Deliverables

An updated responsive navbar/drawer, footer, and homepage; reusable layout rules; focused browser checks for overflow and navigation behavior; representative screenshots; and a short verification report listing tested browsers, devices, and any remaining limitations.
