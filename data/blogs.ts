export interface BlogSection {
  id: string;
  title: string;
  paragraphs: string[];
  code?: string;
  takeaway?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "Caching" | "Traffic" | "Messaging" | "Databases";
  level: "Beginner" | "Intermediate";
  publishedAt: string;
  author: string;
  readMinutes: number;
  tags: string[];
  diagram: { nodes: string[]; label: string };
  intro: string;
  sections: BlogSection[];
}

// Demo editorial content. IDs are stable, human-readable URL segments.
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "cache-aside-pattern",
    title: "A faster read path: understanding cache-aside",
    excerpt:
      "Follow a request from cache miss to cache hit, and learn where freshness, invalidation, and failure handling fit in.",
    category: "Caching",
    level: "Beginner",
    publishedAt: "2026-10-24",
    author: "Systemly Editorial",
    readMinutes: 4,
    tags: ["Cache-aside", "Redis", "Latency"],
    diagram: {
      nodes: ["Client", "API", "Cache", "Database"],
      label: "Read fast. Refresh deliberately.",
    },
    intro:
      "A product page might be read thousands of times between updates. Fetching the same record from the database on every request repeats work. Cache-aside puts a small, fast store beside the database and lets the application decide when to use it.",
    sections: [
      {
        id: "read-path",
        title: "Start with the read path",
        paragraphs: [
          "The application looks up a key in the cache first. A hit returns the cached value immediately. On a miss, the application reads the database, stores the result with a time to live (TTL), and returns it to the caller. The database remains the source of truth.",
          "Use a stable key such as product:42 and cache only the data the response needs. Keep authorization checks outside a shared cache, or include the user or tenant context in the key when the result depends on it.",
        ],
        code: "const cached = await cache.get(key);\nif (cached !== null) return JSON.parse(cached);\n\nconst product = await database.findProduct(id);\nif (product !== null) {\n  await cache.set(key, JSON.stringify(product), { ttlSeconds: 60 });\n}\nreturn product;",
        takeaway:
          "A cache accelerates a read; it does not replace the durable record.",
      },
      {
        id: "freshness",
        title: "Choose a freshness budget",
        paragraphs: [
          "TTL is a product decision as much as a technical setting. A profile picture can tolerate more staleness than an inventory reservation. Decide how old a value may be before choosing an expiration period.",
          "For a simple write path, commit the database update and then invalidate the matching cache entry. This reduces stale reads, but a concurrent reader can still repopulate an old value. Short TTLs bound the damage; versioned values or stronger coordination may be necessary for stricter guarantees.",
        ],
      },
      {
        id: "failure-modes",
        title: "Plan for misses and failures",
        paragraphs: [
          "When a popular key expires, many requests can hit the database at once. Coalesce concurrent reads for the same key and add random jitter to expiration times so that many keys do not expire together.",
          "Set short cache timeouts. If the cache is unavailable, fall back only when the database has enough spare capacity. Otherwise, apply rate limits, shed low-priority work, or serve a permitted stale response instead of overwhelming the database.",
        ],
      },
      {
        id: "measure",
        title: "Measure the whole system",
        paragraphs: [
          "Track hit ratio, database query volume, eviction rate, and end-to-end tail latency. A high hit ratio does not help if the remaining misses dominate your slowest requests.",
          "Start with one expensive, frequently repeated query. Compare latency and database load before and after caching, then test cache loss under realistic traffic. Add more caching only when measurements justify the added invalidation complexity.",
        ],
        takeaway:
          "Optimize for reliable user-facing latency, not just a beautiful cache hit rate.",
      },
    ],
  },
  {
    id: "token-bucket-rate-limiting",
    title: "Rate limiting without punishing every burst",
    excerpt:
      "Use a token bucket to balance short bursts, steady throughput, and fair access to your API.",
    category: "Traffic",
    level: "Intermediate",
    publishedAt: "2026-10-21",
    author: "Systemly Editorial",
    readMinutes: 4,
    tags: ["Token bucket", "APIs", "Reliability"],
    diagram: {
      nodes: ["Request", "Bucket", "Allow / deny"],
      label: "Allow the burst. Bound the average.",
    },
    intro:
      "Traffic rarely arrives at a perfectly constant rate. A dashboard can issue several requests together even when its average usage is modest. A token bucket permits a bounded burst while controlling the sustained request rate.",
    sections: [
      {
        id: "bucket",
        title: "Give each client a bucket",
        paragraphs: [
          "A bucket has a capacity and a refill rate. Each request consumes a token. When no token remains, the request is rejected or delayed. Tokens accumulate only up to the capacity, so an idle client cannot save unlimited future traffic.",
          "A capacity of 20 tokens and a refill rate of 5 tokens per second allows an immediate burst of 20 requests from a full bucket. After it empties, the long-term allowance is about 5 requests per second. Choose limits based on downstream capacity and the cost of an operation.",
        ],
        code: "elapsed = max(0, now - lastRefill)\ntokens = min(capacity, tokens + elapsed * refillRate)\nlastRefill = now\n\nif tokens >= requestCost:\n    tokens -= requestCost\n    allow()\nelse:\n    reject()",
        takeaway:
          "Bucket capacity controls bursts; refill rate controls sustained throughput.",
      },
      {
        id: "identity",
        title: "Pick a fair identity",
        paragraphs: [
          "An authenticated API key or tenant ID is often a better identity than an IP address. Many users can share one address, and a single user can change addresses. Public endpoints may need an IP-based fallback with explicit limitations.",
          "Use layered limits when appropriate: a per-user limit for fairness, a per-tenant limit for budget protection, and a global limit for service health. Expensive operations can consume more than one token.",
        ],
      },
      {
        id: "distributed",
        title: "Make distributed decisions atomic",
        paragraphs: [
          "A bucket stored independently on each API server multiplies the effective allowance as you add servers. Shared storage can enforce one budget, but reading the current balance and writing a new one must happen atomically.",
          "Use an atomic operation or a server-side script to refill, check, and consume tokens together. Use a consistent time source and expire inactive bucket records. Decide explicitly whether an unavailable limiter should fail open or fail closed for each endpoint.",
        ],
      },
      {
        id: "response",
        title: "Make rejection useful",
        paragraphs: [
          "Return a 429 response when a client exceeds its allowance. Where you can estimate the wait, provide Retry-After and explain the relevant limit in your API documentation. Clients should back off and add jitter instead of retrying immediately.",
          "Observe rejection rates by endpoint and tenant. Test simultaneous requests against the same bucket, bursts after idle time, and limiter outages. Rate limiting is useful only when its behavior remains predictable during the traffic spikes it is intended to handle.",
        ],
      },
    ],
  },
  {
    id: "reliable-background-jobs",
    title: "What happens after you put a job on a queue?",
    excerpt:
      "Design background work around retries, idempotency, and the reality that a message may arrive more than once.",
    category: "Messaging",
    level: "Intermediate",
    publishedAt: "2026-10-18",
    author: "Systemly Editorial",
    readMinutes: 4,
    tags: ["Queues", "Idempotency", "Retries"],
    diagram: {
      nodes: ["Producer", "Queue", "Worker", "Result"],
      label: "Decouple the request from the work.",
    },
    intro:
      "Sending an email, resizing an image, or generating a report should not always block a user request. A queue lets the application hand work to a background worker. The hard part is deciding what happens when a worker crashes halfway through.",
    sections: [
      {
        id: "contract",
        title: "Define the job contract",
        paragraphs: [
          "A useful job includes a stable ID, the type of work, the data needed to find its inputs, and a payload version. Prefer referencing durable records over copying large objects into the message. This keeps jobs smaller and makes schema changes easier to manage.",
          "If creating a business record and publishing its job must succeed together, consider a transactional outbox. Write the business change and an outbox row in the same database transaction. A separate publisher delivers the outbox event and can retry safely.",
        ],
        takeaway:
          "A queue separates timing. It does not automatically make database writes and message publication atomic.",
      },
      {
        id: "delivery",
        title: "Expect duplicate delivery",
        paragraphs: [
          "With at-least-once delivery, a worker can complete an action and crash before acknowledging the message. The broker may deliver the same job again. Acknowledging before the work is durable creates the opposite problem: a crash can lose unfinished work.",
          "Make repeat execution safe with a stable idempotency key. For database-only work, a unique constraint and a transaction can couple the result with a processed-job record. For an external side effect such as a payment, use the provider’s idempotency mechanism with the same stable key.",
        ],
        code: "// Conceptual transaction for database-only work\nBEGIN\n  INSERT INTO processed_jobs (job_id) VALUES (:job_id)\n    -- unique job_id rejects duplicate processing\n  UPDATE reports SET status = 'ready' WHERE id = :report_id\nCOMMIT\n// Acknowledge only after the transaction succeeds.",
      },
      {
        id: "retries",
        title: "Retry temporary failures carefully",
        paragraphs: [
          "A short network outage may recover on retry. An invalid email address will not. Classify errors and retry only those that might succeed later, with exponential backoff, jitter, and a maximum attempt count.",
          "Move exhausted or invalid jobs to a dead-letter queue with enough context to investigate. Replaying a job must preserve its idempotency key. A dead-letter queue is an operational workflow, so assign ownership for inspection and recovery.",
        ],
      },
      {
        id: "backlog",
        title: "Watch age as well as depth",
        paragraphs: [
          "Queue depth tells you how many jobs are waiting, but the age of the oldest job tells you how long a user may be waiting. Monitor both alongside processing latency, retries, and worker saturation.",
          "Scale workers only while the downstream systems can absorb the extra work. A large queue can buffer a burst; it cannot fix a permanently slower consumer. Apply backpressure or admission limits when incoming work consistently exceeds processing capacity.",
        ],
        takeaway:
          "Reliable background work needs safe retries, visible failures, and bounded waiting time.",
      },
    ],
  },
  {
    id: "database-scaling-before-sharding",
    title: "Before you shard: a practical database scaling checklist",
    excerpt:
      "Work through queries, indexes, replicas, and access patterns before committing to a partitioned database.",
    category: "Databases",
    level: "Beginner",
    publishedAt: "2026-10-15",
    author: "Systemly Editorial",
    readMinutes: 4,
    tags: ["Indexes", "Replication", "Sharding"],
    diagram: {
      nodes: ["Queries", "Indexes", "Replicas", "Shards"],
      label: "Measure first. Distribute when needed.",
    },
    intro:
      "Sharding distributes data across databases, but it also distributes your operational complexity. Before choosing a shard key, identify why the current database is struggling. A slow query, a connection storm, and a write-capacity limit call for different responses.",
    sections: [
      {
        id: "baseline",
        title: "Find the bottleneck first",
        paragraphs: [
          "Measure query latency, CPU, storage latency, lock waits, connection usage, and the working set size. Look at slow requests and their query plans rather than assuming table size is the entire problem.",
          "Check for repeated queries, unbounded result sets, and missing pagination. Fetch only the columns you need. Set query timeouts and use a bounded connection pool so application concurrency does not become unbounded database concurrency.",
        ],
      },
      {
        id: "indexes",
        title: "Make the common query cheap",
        paragraphs: [
          "Build indexes around actual filter and ordering patterns. For a query that lists a tenant’s recent orders, a composite index beginning with tenant_id and followed by created_at may let the database avoid scanning and sorting unrelated rows.",
          "Validate with the database’s query-plan tools and representative data. Each additional index consumes storage and makes writes more expensive. A useful index for one query can be redundant or harmful elsewhere.",
        ],
        code: "SELECT id, created_at, total\nFROM orders\nWHERE tenant_id = :tenant\nORDER BY created_at DESC\nLIMIT 50;\n\n-- Candidate index; verify against your database and query plan.\nCREATE INDEX orders_tenant_created\nON orders (tenant_id, created_at DESC);",
        takeaway:
          "An index is a tradeoff between cheaper reads and additional write and storage costs.",
      },
      {
        id: "replicas",
        title: "Separate reads that tolerate lag",
        paragraphs: [
          "Read replicas can absorb reporting and other read traffic when replication lag is acceptable. They usually do not increase the primary’s write capacity, because each write still flows through the primary and must be replayed on replicas.",
          "Keep reads requiring immediate read-after-write consistency on the primary, or use a database-specific consistency mechanism. Monitor replica lag and define a fallback when a replica falls too far behind.",
        ],
      },
      {
        id: "shards",
        title: "Shard with a known access pattern",
        paragraphs: [
          "Consider sharding once measured capacity or isolation requirements justify it. A good shard key spreads load and keeps frequent operations within one shard. A tenant key can simplify tenant-local reads but leave a very large tenant as a hotspot.",
          "Plan cross-shard queries, uniqueness, migrations, backups, and rebalancing before moving data. Write down how you will add a shard and recover one. Those operational paths are part of the design, not work to postpone until after launch.",
        ],
        takeaway:
          "Choose distribution when its benefits exceed the cost of operating it.",
      },
    ],
  },
];

export function getBlogPost(id: string) {
  return BLOG_POSTS.find((post) => post.id === id);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
