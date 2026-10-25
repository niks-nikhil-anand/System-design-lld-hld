# Responsive blog implementation

Implemented October 25, 2026 for `/blog` and `/blog/[id]`.

## Layout behavior

| Viewport | Blog listing | Article |
| --- | --- | --- |
| Small phones, 320–374px | Single-column introduction, featured story, and cards; full-width search; wrapping topic buttons | Fluid title, wrapping metadata, collapsible contents, single reading column, internally scrolling code |
| Large phones, 375–767px | Same layout with additional breathing room | Same reading layout, with the contents panel above the introduction |
| Tablets, 768–1023px | Two card columns; featured story remains stacked | Reading column capped at 680px; two related-post columns; collapsible contents |
| Desktops, 1024–1535px | Split introduction and featured story; three card columns | Sticky contents sidebar, bounded reading width, and three related posts |
| Large desktops, 1536px+ | Four card columns within the shared 1440px site container | Reading text remains capped at 680px; extra width provides margins rather than longer lines |

Other changes:

- Removed the forced blog headline line break and added fluid title sizes.
- Matched page gutters and content framing to the shared responsive navbar and footer.
- Kept search inputs at 16px and topic controls at least 44px high.
- Made card metadata wrap and card padding adapt to smaller screens.
- Added native, keyboard-operable mobile contents panels and scrollable desktop sidebars for short screens.
- Kept section anchors below the sticky header and marked the linked section heading visually.
- Added labeled, focusable code regions that scroll independently of the page, with a visible scrolling hint.
- Adapted the missing-article page and added a responsive article loading skeleton. The loading boundary also resolves the installed Next.js version's warning about reading route parameters outside Suspense during navigation.

## Verification

The in-app browser was used against the local development site.

**96 page/width combinations passed:**

- Listing: 20 widths from 320px through 2560px, including breakpoint boundaries.
- All four demo articles: 19 widths each from 320px through 2560px.
- No document-level horizontal overflow in these measurements.
- Every article's reading column was at most 680px wide.
- All code blocks stayed inside the reading column, and every contents link resolved to an article section.
- Listing cards progressed through 1/2/3/4 columns at the intended breakpoints; all topic buttons were at least 44px high.
- Listing illustrations stayed within their artwork bounds.

Additional interaction checks passed:

- At 320px, expand the contents panel and follow a section link; the heading remains below the sticky header.
- At 320px, focus a code region and press Arrow Right: its horizontal scroll position changes while the page remains within the viewport.
- At 390px, filter to Traffic, search for an unmatched term, and clear filters to restore all four articles.
- At 1920px, contents navigation remains sticky at 96px from the top; at 1280×375, the sidebar scrolls internally and remains within the viewport.
- Listing and article layouts have no horizontal overflow at 667×375 and 844×390 landscape sizes.
- Light mode, dark mode, expanded mobile contents, and the 320px missing-article state render correctly.
- Shared homepage blog cards remain present and introduce no page overflow at 320, 768, and 1536px.
- A fresh article navigation after adding the loading boundary produced no new browser warnings or errors.

## Evidence

`artifacts/blog-responsive/viewport-checks.json` contains the measurements, and `landscape-checks.json` contains the landscape observations.

Full-page screenshots for the index and a sample article are saved at widths 320, 390, 768, 1024, 1440, and 1920px. Additional images include `index-preview.jpg`, `article-preview.jpg`, `article-mobile-light.jpg`, and `article-mobile-contents.jpg` in the same directory.

## Checks and limits

- Production build, including TypeScript and generated article routes: passed.
- ESLint for `components/blog` and `app/blog`: passed.
- Existing unrelated repository lint findings from the previous responsive pass remain outside this change.
- These are browser viewport checks. Physical iOS/Android devices, standalone Safari/Firefox, real software keyboards, and OS text-size/browser zoom settings were not available for this pass.
