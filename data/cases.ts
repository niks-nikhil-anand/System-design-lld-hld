import { CaseItem } from '@/types/systemly';

export interface RichCaseItem extends CaseItem {
  problem?: string;
  functional?: string[];
  nonFunctional?: string[];
  assume?: string;
  capacity?: any[];
  api?: any[];
  deepDives?: any[];
  tradeoffs?: any[];
  flowTitle?: string;
  nodes?: any[];
  edges?: any[];
}

export const CASES: RichCaseItem[] = [
  {
    "kind": "case",
    "slug": "url-shortener",
    "title": "URL Shortener",
    "blurb": "Short links with fast redirects for a read-heavy workload.",
    "cat": "Case study",
    "diff": "Beginner",
    "mins": 35,
    "tags": [
      "bitly",
      "key generation",
      "redirect",
      "cache",
      "base62"
    ],
    "preview": [
      "Client",
      "API",
      "Cache",
      "DB"
    ],
    "objectives": [
      "Generate collision-free short keys",
      "Serve redirects from cache",
      "Estimate storage for 5 years"
    ],
    "problem": "Users submit a long URL and get a short one like sho.rt/aZ3kQ9x. Anyone opening the short link is redirected to the original. Reads vastly outnumber writes, and redirects must be fast everywhere.",
    "functional": [
      "Create a short URL for a long URL, optionally with a custom alias",
      "Redirect a short URL to the original",
      "Optional expiry per link",
      "Basic click analytics per link"
    ],
    "nonFunctional": [
      "Redirect p99 under 50 ms",
      "99.99% availability for redirects",
      "Short keys must never collide",
      "Keys should not be guessable in sequence"
    ],
    "assume": "100M new links per month, 100:1 read-to-write ratio, 500 bytes per record, 5-year retention.",
    "capacity": [
      {
        "k": "Writes",
        "v": "~40 / s",
        "how": "100M ÷ 2.6M s per month"
      },
      {
        "k": "Redirects",
        "v": "~4,000 / s",
        "how": "40 × 100; plan for 3× peak"
      },
      {
        "k": "Storage (5 yrs)",
        "v": "~3 TB",
        "how": "6B links × 500 B"
      },
      {
        "k": "Key space",
        "v": "3.5 trillion",
        "how": "62⁷ for 7-char base62 keys"
      },
      {
        "k": "Cache for hot links",
        "v": "~35 GB",
        "how": "20% of 346M daily reads × 500 B"
      }
    ],
    "api": [
      [
        "POST",
        "/api/v1/urls",
        "Body: long_url, custom_alias?, expires_at?. Returns 201 with short_url. Rejects taken aliases with 409."
      ],
      [
        "GET",
        "/{key}",
        "Returns 302 with Location: long_url, or 404 / 410 if missing or expired."
      ],
      [
        "GET",
        "/api/v1/urls/{key}/stats",
        "Click counts by day, country and referrer."
      ]
    ],
    "deepDives": [],
    "tradeoffs": [
      {
        "q": "Key generation",
        "pick": "Counter ranges + base62",
        "why": "No collisions and no read-before-write. Hashing the URL avoids a counter service but needs collision handling and makes per-user links identical."
      },
      {
        "q": "301 vs 302",
        "pick": "302",
        "why": "Every click is counted and links can be changed. Costs more traffic than 301, which browsers cache."
      },
      {
        "q": "Storage",
        "pick": "Key-value store",
        "why": "Access is purely by key and scales linearly. Loses ad-hoc queries, which analytics handles separately."
      }
    ],
    "flowTitle": "",
    "nodes": [],
    "edges": []
  },
  {
    "kind": "case",
    "slug": "chat-app",
    "title": "Chat Application",
    "blurb": "One-to-one and group messaging with presence and receipts.",
    "cat": "Case study",
    "diff": "Intermediate",
    "mins": 45,
    "tags": [
      "whatsapp",
      "websockets",
      "presence",
      "messaging"
    ],
    "preview": [
      "Client",
      "WS",
      "Pub/Sub",
      "Store"
    ],
    "objectives": [
      "Route messages over WebSockets",
      "Deliver to offline users",
      "Track sent / delivered / read"
    ],
    "problem": "Users exchange one-to-one and group messages in real time across phones and laptops. Messages must arrive in order, survive the recipient being offline, and show sent, delivered and read states.",
    "functional": [
      "One-to-one and group chats (up to 500 members)",
      "Real-time delivery with ordering per conversation",
      "Offline delivery when the recipient reconnects",
      "Sent / delivered / read receipts and online presence",
      "Message history synced across devices"
    ],
    "nonFunctional": [
      "Delivery latency under 200 ms when both users are online",
      "No message loss once the server acknowledges it",
      "High availability; degraded presence is acceptable",
      "Horizontal scale to hundreds of millions of connections"
    ],
    "assume": "500M daily active users, 40 messages each per day, ~100 bytes per message, 30% online at peak.",
    "capacity": [
      {
        "k": "Messages",
        "v": "~230k / s",
        "how": "20B per day ÷ 86,400 s"
      },
      {
        "k": "Peak",
        "v": "~700k / s",
        "how": "3× average"
      },
      {
        "k": "New storage",
        "v": "~2 TB / day",
        "how": "20B × 100 B, before replication"
      },
      {
        "k": "Concurrent connections",
        "v": "150M",
        "how": "500M × 30%"
      },
      {
        "k": "Connection servers",
        "v": "~1,500",
        "how": "at 100k connections each"
      }
    ],
    "api": [
      [
        "WS",
        "send { client_msg_id, conversation_id, body }",
        "Client sends; server replies with ack { server_msg_id, seq, ts }. client_msg_id makes retries idempotent."
      ],
      [
        "WS",
        "deliver { conversation_id, seq, sender_id, body }",
        "Server pushes to every online device of each member."
      ],
      [
        "WS",
        "receipt { conversation_id, seq, status }",
        "delivered or read, sent back to the sender."
      ],
      [
        "GET",
        "/v1/conversations/{id}/messages?before={seq}&limit=50",
        "History and catch-up after reconnect."
      ]
    ],
    "deepDives": [],
    "tradeoffs": [
      {
        "q": "Transport",
        "pick": "WebSockets",
        "why": "Instant push and low overhead per message. Costs stateful connections that complicate deploys and load balancing."
      },
      {
        "q": "Message ids",
        "pick": "Server seq per conversation",
        "why": "Total order within a chat and easy gap detection. Requires a single writer per conversation at a time."
      },
      {
        "q": "Storage",
        "pick": "Wide-column store",
        "why": "High write throughput and partition-local range reads. Gives up joins and multi-row transactions."
      }
    ],
    "flowTitle": "",
    "nodes": [],
    "edges": []
  },
  {
    "kind": "case",
    "slug": "video-streaming",
    "title": "Video Streaming Platform",
    "blurb": "Upload, transcode and stream video worldwide.",
    "cat": "Case study",
    "diff": "Advanced",
    "mins": 50,
    "tags": [
      "youtube",
      "netflix",
      "transcoding",
      "cdn",
      "hls"
    ],
    "preview": [
      "Upload",
      "Transcode",
      "Storage",
      "CDN"
    ],
    "objectives": [
      "Design the transcoding pipeline",
      "Serve segments from the edge",
      "Adaptive bitrate playback"
    ],
    "problem": "Creators upload videos; the platform processes them into streamable formats and serves them to viewers worldwide with fast start and smooth playback on changing networks.",
    "functional": [
      "Upload large videos reliably",
      "Transcode into multiple resolutions and codecs",
      "Stream with adaptive bitrate",
      "Video metadata, search and view counts"
    ],
    "nonFunctional": [
      "Playback start under 2 s",
      "Rebuffering under 1% of watch time",
      "Uploads must never be lost once acknowledged",
      "Cost-efficient egress at massive scale"
    ],
    "assume": "500 hours uploaded per minute, ~3 GB stored per hour of video across renditions, 1B hours watched per day at 3 Mbps average.",
    "capacity": [
      {
        "k": "Upload volume",
        "v": "720k hours / day",
        "how": "500 h × 1,440 min"
      },
      {
        "k": "New storage",
        "v": "~2.2 PB / day",
        "how": "720k h × 3 GB"
      },
      {
        "k": "Egress per watched hour",
        "v": "1.35 GB",
        "how": "3 Mbps × 3,600 s ÷ 8"
      },
      {
        "k": "Average egress",
        "v": "~125 Tbps",
        "how": "1B h × 1.35 GB ÷ 86,400 s"
      }
    ],
    "api": [
      [
        "POST",
        "/v1/videos",
        "Creates a video record and returns a resumable upload URL."
      ],
      [
        "PUT",
        "/upload/{session}?offset=…",
        "Upload chunks; resume from the last confirmed offset."
      ],
      [
        "GET",
        "/v1/videos/{id}",
        "Title, status (processing / ready), duration, renditions."
      ],
      [
        "GET",
        "/v1/videos/{id}/master.m3u8",
        "HLS master playlist listing renditions; segments are fetched from the CDN."
      ]
    ],
    "deepDives": [],
    "tradeoffs": [
      {
        "q": "Segment length",
        "pick": "~4 s",
        "why": "Fast bitrate switching and startup. More files and requests than 10-second segments."
      },
      {
        "q": "Encoding ladder",
        "pick": "Per-title ladders",
        "why": "Fewer bits for simple content at equal quality. More compute per upload."
      },
      {
        "q": "Transcode timing",
        "pick": "Eager for common renditions",
        "why": "Instant playback for everyone. Wasted compute on videos nobody watches; rare formats can be on-demand."
      }
    ],
    "flowTitle": "",
    "nodes": [],
    "edges": []
  },
  {
    "kind": "case",
    "slug": "social-feed",
    "title": "Social Media Feed",
    "blurb": "Home timelines built from people you follow.",
    "cat": "Case study",
    "diff": "Advanced",
    "mins": 45,
    "tags": [
      "twitter",
      "instagram",
      "fan-out",
      "ranking",
      "timeline"
    ],
    "preview": [
      "Post",
      "Fan-out",
      "Feed cache",
      "Read"
    ],
    "objectives": [
      "Fan-out on write vs read",
      "Handle celebrity accounts",
      "Cursor-based pagination"
    ],
    "problem": "Show each user a home timeline of recent posts from accounts they follow, ranked, paginated and fresh — while some accounts have millions of followers.",
    "functional": [
      "Create posts with text and media",
      "Follow and unfollow accounts",
      "Home feed of followed accounts’ posts",
      "Infinite scroll with stable pagination"
    ],
    "nonFunctional": [
      "Feed load p99 under 300 ms",
      "New posts visible to followers within seconds",
      "Eventual consistency is acceptable",
      "Read-heavy: optimise reads over writes"
    ],
    "assume": "300M daily active users, 10 feed loads and 0.2 posts per user per day, 200 followers on average.",
    "capacity": [
      {
        "k": "Feed reads",
        "v": "~35k / s",
        "how": "3B ÷ 86,400; ~100k/s peak"
      },
      {
        "k": "New posts",
        "v": "~700 / s",
        "how": "60M per day"
      },
      {
        "k": "Fan-out writes",
        "v": "~140k / s",
        "how": "60M × 200 followers per day"
      },
      {
        "k": "Feed cache",
        "v": "~1.2 TB",
        "how": "300M × 500 ids × 8 B"
      }
    ],
    "api": [
      [
        "POST",
        "/v1/posts",
        "Create a post; returns post id."
      ],
      [
        "GET",
        "/v1/feed?cursor={c}&limit=20",
        "Returns posts and next_cursor (opaque: last score + id), so new posts don’t shift pages."
      ],
      [
        "POST",
        "/v1/users/{id}/follow",
        "Follow; DELETE to unfollow."
      ]
    ],
    "deepDives": [],
    "tradeoffs": [
      {
        "q": "Fan-out",
        "pick": "Hybrid write + read",
        "why": "Fast reads for almost everyone without celebrity write storms. More complex read path."
      },
      {
        "q": "Pagination",
        "pick": "Cursor",
        "why": "Stable pages as new posts arrive. Can’t jump to page 37."
      },
      {
        "q": "Consistency",
        "pick": "Eventual",
        "why": "A post may take seconds to appear in all feeds — acceptable for social content."
      }
    ],
    "flowTitle": "",
    "nodes": [],
    "edges": []
  },
  {
    "kind": "case",
    "slug": "notification-service",
    "title": "Notification Service",
    "blurb": "Push, email and SMS at scale with retries and dedup.",
    "cat": "Case study",
    "diff": "Intermediate",
    "mins": 40,
    "tags": [
      "push",
      "email",
      "sms",
      "queue",
      "retry"
    ],
    "preview": [
      "Event",
      "Queue",
      "Workers",
      "Provider"
    ],
    "objectives": [
      "Ingest and prioritise events",
      "Retry with backoff",
      "Deduplicate deliveries"
    ],
    "problem": "Other services need to notify users by push, email and SMS. The service must honour preferences, never double-send, retry transient provider failures and report delivery status.",
    "functional": [
      "Send via push, email or SMS from templates",
      "Respect user preferences and quiet hours",
      "Priorities: transactional before marketing",
      "Delivery status per notification"
    ],
    "nonFunctional": [
      "Transactional p95 under 5 s end to end",
      "At-least-once processing with no duplicate sends",
      "Isolate provider outages per channel",
      "Handle 10× campaign spikes"
    ],
    "assume": "1B notifications per day (70% push, 25% email, 5% SMS), 200-byte status record, 30-day retention.",
    "capacity": [
      {
        "k": "Average rate",
        "v": "~11.6k / s",
        "how": "1B ÷ 86,400"
      },
      {
        "k": "Campaign peak",
        "v": "~116k / s",
        "how": "10× average"
      },
      {
        "k": "SMS",
        "v": "~580 / s",
        "how": "5% of average — the costly channel"
      },
      {
        "k": "Status storage",
        "v": "~6 TB",
        "how": "1B × 200 B × 30 days"
      }
    ],
    "api": [
      [
        "POST",
        "/v1/notifications",
        "Body: user_id, template_id, data, channels?, priority, idempotency_key. Returns 202 with notification id."
      ],
      [
        "GET",
        "/v1/notifications/{id}",
        "Status per channel: queued, sent, delivered, failed."
      ],
      [
        "PUT",
        "/v1/users/{id}/preferences",
        "Opt-outs per category and channel, quiet hours."
      ]
    ],
    "deepDives": [],
    "tradeoffs": [
      {
        "q": "Delivery guarantee",
        "pick": "At-least-once + dedupe",
        "why": "Simple and reliable. Needs idempotency keys end to end."
      },
      {
        "q": "Template rendering",
        "pick": "Before enqueue",
        "why": "Workers stay simple. Re-rendering after a template fix means re-enqueueing."
      },
      {
        "q": "Status storage",
        "pick": "30-day retention",
        "why": "Enough for support and analytics; older data moves to cold storage."
      }
    ],
    "flowTitle": "",
    "nodes": [],
    "edges": []
  },
  {
    "kind": "case",
    "slug": "e-commerce",
    "title": "E-commerce Platform",
    "blurb": "Catalog, cart, checkout and inventory without overselling.",
    "cat": "Case study",
    "diff": "Advanced",
    "mins": 50,
    "tags": [
      "amazon",
      "checkout",
      "inventory",
      "payments"
    ],
    "preview": [
      "Gateway",
      "Cart",
      "Order",
      "Payment"
    ],
    "objectives": [
      "Reserve stock safely",
      "Idempotent payments",
      "Survive flash sales"
    ],
    "problem": "Customers browse a large catalogue, add items to a cart and check out. During flash sales thousands try to buy the same limited stock; we must never oversell or double-charge.",
    "functional": [
      "Browse and search products",
      "Cart that persists across devices",
      "Checkout with payment",
      "Order history and status"
    ],
    "nonFunctional": [
      "Catalogue pages p99 under 200 ms",
      "No overselling; exactly-once charging",
      "Survive 50× flash-sale spikes",
      "Cart always writable"
    ],
    "assume": "50M daily users, 30 page views each, 2% conversion, flash sales up to 5,000 orders/s.",
    "capacity": [
      {
        "k": "Catalogue reads",
        "v": "~17k / s",
        "how": "1.5B views ÷ 86,400"
      },
      {
        "k": "Orders",
        "v": "~12 / s avg",
        "how": "1M orders per day"
      },
      {
        "k": "Flash-sale peak",
        "v": "5,000 / s",
        "how": "400× average on one SKU"
      },
      {
        "k": "Catalogue size",
        "v": "10M SKUs",
        "how": "~2 KB each ≈ 20 GB"
      }
    ],
    "api": [
      [
        "GET",
        "/v1/products/{id}",
        "Cached product detail and price."
      ],
      [
        "POST",
        "/v1/cart/items",
        "Add sku and quantity."
      ],
      [
        "POST",
        "/v1/checkout",
        "Header Idempotency-Key. Reserves stock, creates order, starts payment. Returns order id."
      ],
      [
        "POST",
        "/v1/payments/webhook",
        "Payment provider callback, verified by signature."
      ]
    ],
    "deepDives": [],
    "tradeoffs": [
      {
        "q": "When to reserve stock",
        "pick": "At checkout",
        "why": "Carts don’t lock inventory others could buy. Users may learn at checkout that it sold out."
      },
      {
        "q": "Consistency",
        "pick": "Strong for inventory and orders",
        "why": "Overselling and double charges are unacceptable. Catalogue and reviews can be eventually consistent."
      },
      {
        "q": "Distributed transaction",
        "pick": "Saga with compensation",
        "why": "No locks across services. Requires careful compensating actions and idempotency."
      }
    ],
    "flowTitle": "",
    "nodes": [],
    "edges": []
  },
  {
    "kind": "case",
    "slug": "ride-hailing",
    "title": "Ride-Hailing Service",
    "blurb": "Match riders to nearby drivers in real time.",
    "cat": "Case study",
    "diff": "Advanced",
    "mins": 50,
    "tags": [
      "uber",
      "geospatial",
      "matching",
      "location"
    ],
    "preview": [
      "Driver",
      "Location",
      "Geo index",
      "Match"
    ],
    "objectives": [
      "Ingest location updates",
      "Index drivers geospatially",
      "Match and dispatch"
    ],
    "problem": "Riders request trips; the system finds a nearby available driver, dispatches them, and tracks the trip live — with millions of drivers sending locations every few seconds.",
    "functional": [
      "Drivers publish location and availability",
      "Riders request a ride and see an ETA",
      "Match and dispatch a driver",
      "Live trip tracking and fare calculation"
    ],
    "nonFunctional": [
      "Match within ~1 s",
      "Location ingestion of over a million updates per second",
      "Trip state must never be lost",
      "Regional isolation of failures"
    ],
    "assume": "5M active drivers pinging every 4 s, 20M trips per day, ~100 bytes per location update.",
    "capacity": [
      {
        "k": "Location writes",
        "v": "1.25M / s",
        "how": "5M ÷ 4 s"
      },
      {
        "k": "Trip requests",
        "v": "~230 / s avg",
        "how": "20M ÷ 86,400; ~1k/s peak"
      },
      {
        "k": "Live location memory",
        "v": "~500 MB",
        "how": "5M × 100 B (latest only)"
      },
      {
        "k": "Location history",
        "v": "~10.8 TB / day",
        "how": "1.25M/s × 100 B × 86,400"
      }
    ],
    "api": [
      [
        "WS",
        "location { lat, lng, heading, status }",
        "Driver app streams every 4 s."
      ],
      [
        "POST",
        "/v1/rides",
        "pickup, dropoff → ride id and ETA estimate."
      ],
      [
        "POST",
        "/v1/rides/{id}/accept",
        "Driver accepts an offer (expires after 15 s)."
      ],
      [
        "WS",
        "ride_update { status, driver_location, eta }",
        "Pushed to the rider during the trip."
      ]
    ],
    "deepDives": [],
    "tradeoffs": [
      {
        "q": "Location storage",
        "pick": "In-memory latest + stream history",
        "why": "Fast queries and cheap writes. A node loss loses only seconds-old positions that drivers resend."
      },
      {
        "q": "Offer strategy",
        "pick": "One driver at a time",
        "why": "No double-booking. Slower than broadcasting offers."
      },
      {
        "q": "Consistency",
        "pick": "Strong for trip state",
        "why": "A rider must never have two drivers; locations can be eventually consistent."
      }
    ],
    "flowTitle": "",
    "nodes": [],
    "edges": []
  },
  {
    "kind": "case",
    "slug": "file-storage",
    "title": "File Storage Service",
    "blurb": "Upload, sync and share files across devices.",
    "cat": "Case study",
    "diff": "Intermediate",
    "mins": 45,
    "tags": [
      "dropbox",
      "drive",
      "chunking",
      "object storage",
      "sync"
    ],
    "preview": [
      "Client",
      "Chunker",
      "Blob store",
      "Metadata"
    ],
    "objectives": [
      "Chunk and dedupe files",
      "Sync changes between devices",
      "Separate metadata from blobs"
    ],
    "problem": "Users store files in the cloud, sync them across devices and share them. Large files must upload efficiently, and unchanged parts should never be re-sent.",
    "functional": [
      "Upload and download files of any size",
      "Sync changes across a user’s devices",
      "Share files and folders",
      "Keep version history"
    ],
    "nonFunctional": [
      "Durability of 11 nines for stored data",
      "Resumable, bandwidth-efficient transfers",
      "Sync latency of a few seconds",
      "Consistency of metadata (no lost updates)"
    ],
    "assume": "50M users, 5 GB stored each on average, 2 file changes per user per day, 4 MB chunks.",
    "capacity": [
      {
        "k": "Logical storage",
        "v": "~250 PB",
        "how": "50M × 5 GB, before dedupe"
      },
      {
        "k": "File changes",
        "v": "~1,160 / s",
        "how": "100M per day ÷ 86,400"
      },
      {
        "k": "Chunks per 1 GB file",
        "v": "256",
        "how": "1 GB ÷ 4 MB"
      },
      {
        "k": "Metadata rows",
        "v": "~25B",
        "how": "50M users × ~500 files"
      }
    ],
    "api": [
      [
        "POST",
        "/v1/uploads",
        "path, size, chunk_hashes[] → which hashes the server is missing."
      ],
      [
        "PUT",
        "/v1/chunks/{sha256}",
        "Upload a missing chunk; idempotent by hash."
      ],
      [
        "POST",
        "/v1/files/commit",
        "path, base_version, chunk_hashes[] → new version, or 409 on conflict."
      ],
      [
        "GET",
        "/v1/changes?cursor={c}",
        "Long-poll for changes since cursor; drives sync."
      ]
    ],
    "deepDives": [],
    "tradeoffs": [
      {
        "q": "Chunking",
        "pick": "4 MB content-addressed chunks",
        "why": "Dedupe and resumable uploads. Larger metadata and more requests than whole-file storage."
      },
      {
        "q": "Conflict handling",
        "pick": "Conflicted copies",
        "why": "Never loses data. Users must merge manually."
      },
      {
        "q": "Sync signal",
        "pick": "Long-poll / push with cursors",
        "why": "Near real time without constant polling. Holds many open connections."
      }
    ],
    "flowTitle": "",
    "nodes": [],
    "edges": []
  },
  {
    "kind": "case",
    "slug": "food-delivery",
    "title": "Food Delivery Platform",
    "blurb": "Orders, restaurant acceptance and courier dispatch.",
    "cat": "Case study",
    "diff": "Intermediate",
    "mins": 45,
    "tags": [
      "swiggy",
      "doordash",
      "orders",
      "dispatch",
      "eta"
    ],
    "preview": [
      "App",
      "Orders",
      "Restaurant",
      "Courier"
    ],
    "objectives": [
      "Model the order state machine",
      "Dispatch couriers",
      "Estimate delivery time"
    ],
    "problem": "Customers order from nearby restaurants; restaurants accept and prepare; couriers are dispatched to arrive as the food is ready. Everyone sees live status and ETA.",
    "functional": [
      "Browse nearby restaurants and menus",
      "Place and pay for an order",
      "Restaurant accepts, prepares, marks ready",
      "Courier dispatch and live tracking"
    ],
    "nonFunctional": [
      "Order placement under 1 s",
      "Order state never lost",
      "Accurate ETAs",
      "Peaks at lunch and dinner"
    ],
    "assume": "3M orders per day concentrated in two meal peaks, 300k active couriers pinging every 5 s, 20M daily users with 20 menu views each.",
    "capacity": [
      {
        "k": "Orders (peak)",
        "v": "~300 / s",
        "how": "3M/day, most in ~3 peak hours"
      },
      {
        "k": "Courier pings",
        "v": "60k / s",
        "how": "300k ÷ 5 s"
      },
      {
        "k": "Menu reads",
        "v": "~4.6k / s",
        "how": "400M ÷ 86,400"
      },
      {
        "k": "Order events",
        "v": "~6 per order",
        "how": "placed → delivered"
      }
    ],
    "api": [
      [
        "GET",
        "/v1/restaurants?lat&lng",
        "Nearby open restaurants with prep-time estimates."
      ],
      [
        "POST",
        "/v1/orders",
        "Idempotency-Key header; returns order id and ETA."
      ],
      [
        "PATCH",
        "/v1/orders/{id}",
        "Restaurant: accepted / ready. Courier: picked_up / delivered."
      ],
      [
        "WS",
        "/v1/orders/{id}/track",
        "Status and courier location for the customer."
      ]
    ],
    "deepDives": [],
    "tradeoffs": [
      {
        "q": "Dispatch timing",
        "pick": "After restaurant accepts",
        "why": "Couriers don’t wait for rejected orders. Adds a little latency to pickup."
      },
      {
        "q": "State management",
        "pick": "Explicit state machine",
        "why": "Illegal transitions are rejected and auditable. More upfront modelling."
      },
      {
        "q": "Batching orders",
        "pick": "Batch when routes overlap",
        "why": "Fewer couriers per order. Slightly longer delivery for the first customer."
      }
    ],
    "flowTitle": "",
    "nodes": [],
    "edges": []
  },
  {
    "kind": "case",
    "slug": "job-queue",
    "title": "Distributed Job Queue",
    "blurb": "Schedule and run background jobs reliably across workers.",
    "cat": "Case study",
    "diff": "Advanced",
    "mins": 40,
    "tags": [
      "celery",
      "sidekiq",
      "scheduler",
      "retries",
      "leases"
    ],
    "preview": [
      "API",
      "Queue",
      "Workers",
      "Store"
    ],
    "objectives": [
      "At-least-once execution with leases",
      "Retries and dead letters",
      "Delayed and scheduled jobs"
    ],
    "problem": "Services submit background jobs — immediate, delayed or scheduled. A pool of workers must run each job at least once, survive worker crashes, retry failures and never lose a job.",
    "functional": [
      "Enqueue jobs with payload, priority and optional run_at",
      "Workers lease and execute jobs",
      "Retries with backoff and a dead-letter queue",
      "Query job status"
    ],
    "nonFunctional": [
      "No lost jobs once acknowledged",
      "At-least-once execution",
      "Scale workers horizontally",
      "Delayed jobs fire within seconds of run_at"
    ],
    "assume": "50M jobs per day, 2 s average runtime, 10× peaks, 1 KB per job record, 7-day retention.",
    "capacity": [
      {
        "k": "Average rate",
        "v": "~580 / s",
        "how": "50M ÷ 86,400"
      },
      {
        "k": "Worker slots (avg)",
        "v": "~1,160",
        "how": "580/s × 2 s (Little’s law)"
      },
      {
        "k": "Worker slots (peak)",
        "v": "~11,600",
        "how": "10× average"
      },
      {
        "k": "Storage",
        "v": "~350 GB",
        "how": "50M × 1 KB × 7 days"
      }
    ],
    "api": [
      [
        "POST",
        "/v1/jobs",
        "type, payload, priority, run_at?, max_attempts, idempotency_key → job id."
      ],
      [
        "POST",
        "/v1/leases",
        "Worker claims up to N ready jobs with a 30 s lease."
      ],
      [
        "POST",
        "/v1/jobs/{id}/heartbeat",
        "Extends the lease for long jobs."
      ],
      [
        "POST",
        "/v1/jobs/{id}/complete",
        "Or /fail with error; fail schedules a retry or dead-letters."
      ]
    ],
    "deepDives": [],
    "tradeoffs": [
      {
        "q": "Delivery semantics",
        "pick": "At-least-once",
        "why": "Simple and robust. Requires idempotent handlers."
      },
      {
        "q": "Storage",
        "pick": "Durable store + broker",
        "why": "Durability and queryable status. More moving parts than a broker alone."
      },
      {
        "q": "Lease length",
        "pick": "30 s + heartbeats",
        "why": "Fast recovery from crashes. Heartbeat traffic for long jobs."
      }
    ],
    "flowTitle": "",
    "nodes": [],
    "edges": []
  }
];
