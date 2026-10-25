# Separate admin pages

## Routes

- `/admin`: overview and collection shortcuts.
- `/admin/concepts`
- `/admin/algorithms`
- `/admin/case-studies`
- `/admin/companies`
- `/admin/learning-paths`
- `/admin/blog`
- `/admin/playground`

Each collection has `/new` and `/[slug]/edit` routes. Existing resources are prerendered; browser-local resources also open by their own edit URLs in the browser where they were saved.

## Implementation

The shared admin layout uses the configured shadcn Base UI components: Sidebar, Sheet, Breadcrumb, Button, Card, Table, Input, Select, Tabs, Dropdown Menu, Alert Dialog, Skeleton, Label, Textarea, and Alert. Theme aliases preserve Systemly's indigo accent, Geist typeface, existing surface colors, and light/dark modes.

Collection pages support search, category/difficulty/status filters, sorting, pagination, previews, duplication, JSON export, local archiving, restoration, and discarding local changes. Learning paths have module/resource ordering controls. Articles have section editors with paragraphs, optional code, and takeaways. Diagram data is edited in a validated Advanced tab; playground previews visualize request flow order.

## Persistence boundary

This remains a frontend administration workspace. Existing resources come from project data files. Local changes are stored under `systemly:admin-local-drafts:v1` in localStorage, with storage error feedback and cross-tab updates. Save buttons explicitly say “Save local draft”. The public website and source data files are not changed by these actions. Published resources retain links to their original public versions. There is no authenticated backend, authorization system, or live publishing API yet.

## Browser verification

- All seven collections loaded with distinct headings and tables.
- Existing edit/preview screens opened for concepts, algorithms, case studies, companies, learning paths, articles, and playground templates.
- Search plus category filtering produced the expected match and empty state.
- A temporary concept draft saved, received its own edit route, and survived a full reload.
- An unsaved-edit warning appeared when leaving via an internal link.
- Invalid structured JSON was rejected without overwriting the saved draft.
- Local archive and restore actions updated the collection.
- The temporary test draft was discarded after verification.
- Desktop sidebar collapse and both themes were checked visually.
- Editor route URL access is wrapped in page-level Suspense boundaries for this Next.js version's instant navigation behavior.

Responsive layout rules are implemented for small screens, including the shadcn mobile sidebar Sheet, stacked form/filter layouts, and horizontal table scrolling. Manual browser screenshots were taken at the desktop panel width; a physical mobile-device pass was not performed.

## Checks

Run `npm run build`, `npx tsc --noEmit`, and ESLint on `app/admin`, `components/admin`, `lib/admin`, `hooks/use-mobile.ts`, and the added UI primitives.

The full repository lint command still reports pre-existing issues in `app/page.tsx`, `hooks/useBookmarks.ts`, `data/cases.ts`, and `data/companies.ts`.
