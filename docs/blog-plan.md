# Systemly blog plan

## Site review

Systemly teaches system design through concepts, algorithms, case studies, company architectures, learning paths, and a playground. The existing homepage owns hash-based navigation and browser-local bookmarks. Shared components provide an indigo-accented card system, theme tokens, a responsive menu, search, and a footer.

The blog extends this learning journey with explanations of decisions and tradeoffs. Existing learning routes remain available. Blog pages use Next.js App Router routes so articles have direct, shareable URLs and server-rendered content.

## Routes and content

- `/`: add a “From the blog” section before the FAQ with all four demo posts.
- `/blog`: introduce the publication, feature one post, and list articles with topic filters, search, result counts, and a resettable empty state.
- `/blog/[id]`: resolve a stable descriptive ID to a full article. Include category, level, demo label, author, date, reading time, architecture illustration, section links, code examples, takeaways, tags, and related posts.
- Missing IDs: render the blog-specific not-found page with a route back to the index. With the existing Cache Components configuration, Next.js may stream this UI with HTTP 200 and a robots noindex tag after the response starts.

Store typed content in `data/blogs.ts`. Keep content independent from layout so additional articles can be added without creating route files. Generate the four known article routes at build time and provide article-specific title, description, and Open Graph metadata.

## Integration and design

1. Add Blog links to desktop navigation, the mobile menu, and the Learn footer column.
2. Reuse the existing navigation, topic search, bookmark count, theme toggle, and footer in a blog layout. Map learning navigation back to the existing homepage hashes.
3. Reuse theme variables for light and dark mode, rounded cards, typography, borders, and focus treatment.
4. Use lightweight CSS and icon-based architecture illustrations rather than external image dependencies.
5. Stack the reading layout on smaller screens and position the table of contents beside the article on wider screens.

## Demo editorial lineup

| ID                                 | Topic     | Focus                                                      |
| ---------------------------------- | --------- | ---------------------------------------------------------- |
| `cache-aside-pattern`              | Caching   | Read paths, TTL, invalidation, stampedes, and measurement  |
| `token-bucket-rate-limiting`       | Traffic   | Bursts, fairness, atomic decisions, and useful rejections  |
| `reliable-background-jobs`         | Messaging | Delivery contracts, idempotency, retries, and queue health |
| `database-scaling-before-sharding` | Databases | Query plans, indexes, replicas, and sharding tradeoffs     |

These are explicitly demo articles, attributed to Systemly Editorial. Replace demo attribution, dates, and editorial content before a real publication launch.

## Validation

- Production build and generated routes.
- Lint on all new blog modules and modified navigation components.
- HTTP smoke checks for the homepage, index, all four posts, and missing-post content.
- Browser checks for topic filters, search empty state, reset, article navigation, table-of-contents links, and responsive menu integration.

## Follow-up scope

A CMS, remote content fetching, subscriber collection, comments, and analytics can be added when product requirements justify them. The initial implementation requires no new dependencies or external services.
