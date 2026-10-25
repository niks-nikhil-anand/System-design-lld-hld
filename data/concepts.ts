import { ConceptItem } from '@/types/systemly';

export interface RichConceptItem extends ConceptItem {
  companies?: string[];
  related?: string[];
}

export const CONCEPTS: RichConceptItem[] = [
  {
    "kind": "concept",
    "slug": "load-balancer",
    "title": "Load Balancer",
    "blurb": "Spreads incoming requests across healthy servers so no single machine is overwhelmed.",
    "cat": "Traffic",
    "diff": "Beginner",
    "mins": 12,
    "tags": [
      "availability",
      "round robin",
      "health checks",
      "l4",
      "l7"
    ],
    "preview": [
      "Client",
      "LB",
      "Server ×3"
    ],
    "def": "A load balancer sits between clients and a pool of servers and spreads requests across the healthy ones.",
    "variants": [
      {
        "id": "rr",
        "label": "Round Robin",
        "note": "Simple rotation. Fair when servers and requests are uniform."
      },
      {
        "id": "lc",
        "label": "Least Connections",
        "note": "Sends work to the least busy server. Better for long or uneven requests."
      },
      {
        "id": "wrr",
        "label": "Weighted Round Robin",
        "note": "Bigger servers take proportionally more turns (A = 3, B = 1, C = 1)."
      }
    ],
    "variantLabel": "Routing algorithm",
    "what": "A load balancer is a reverse proxy whose main job is distribution. It owns the public address of a service and forwards each request to one of several backend servers. Layer-4 balancers route by IP and port; layer-7 balancers read HTTP and can route by path, header or cookie.",
    "why": "One server has a ceiling on CPU, memory and connections, and it is a single point of failure. Putting several identical servers behind a balancer lets you add capacity by adding machines, and lets the system keep serving when one of them dies.",
    "how": [
      "Clients resolve the service name to the balancer’s IP and send requests there.",
      "The balancer keeps a pool of backends and probes each with periodic health checks.",
      "For each request it picks a healthy backend using its algorithm — round robin, least connections, weighted, or a hash of the client.",
      "It forwards the request, relays the response, and records connection counts and latency for the next decision.",
      "Backends that fail checks are removed from the pool and re-added once they pass again."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "reverse-proxy",
      "scaling",
      "consistent-hashing",
      "api-gateway"
    ]
  },
  {
    "kind": "concept",
    "slug": "api-gateway",
    "title": "API Gateway",
    "blurb": "A single entry point that authenticates, routes and shapes requests to backend services.",
    "cat": "Traffic",
    "diff": "Intermediate",
    "mins": 14,
    "tags": [
      "auth",
      "routing",
      "microservices",
      "bff"
    ],
    "preview": [
      "Client",
      "Gateway",
      "Services"
    ],
    "def": "An API gateway is the single front door to a set of backend services: it authenticates, routes, limits and shapes every request.",
    "variants": [],
    "variantLabel": "",
    "what": "A reverse proxy specialised for APIs. It terminates client connections, applies cross-cutting policy — authentication, rate limits, request validation, transformation — and routes to the right internal service.",
    "why": "With many microservices, every client would otherwise need to know every service address and every service would re-implement auth, throttling and logging. The gateway centralises those concerns and lets internal topology change without breaking clients.",
    "how": [
      "Clients call one stable hostname with versioned paths.",
      "The gateway authenticates the caller and enforces quotas.",
      "A routing table maps paths and methods to upstream services.",
      "Optional aggregation or transformation builds client-specific responses.",
      "It emits logs, metrics and trace ids for every call."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "load-balancer",
      "rate-limiting",
      "microservices",
      "reverse-proxy"
    ]
  },
  {
    "kind": "concept",
    "slug": "reverse-proxy",
    "title": "Reverse Proxy",
    "blurb": "Sits in front of your apps to terminate TLS, cache responses and hide origin servers.",
    "cat": "Networking",
    "diff": "Beginner",
    "mins": 10,
    "tags": [
      "nginx",
      "tls",
      "proxy",
      "origin"
    ],
    "preview": [
      "Client",
      "Proxy",
      "App"
    ],
    "def": "A reverse proxy accepts requests on behalf of your servers, then forwards them — hiding the servers and handling TLS, compression and caching.",
    "variants": [],
    "variantLabel": "",
    "what": "A server that sits in front of one or more origin servers and forwards client requests to them. Unlike a forward proxy (which acts for clients), a reverse proxy acts for servers.",
    "why": "It gives you one hardened, public-facing component that handles TLS, compression, caching, request buffering and basic protection, while the application servers stay private and focused on business logic.",
    "how": [
      "Public DNS points at the proxy; origin servers stay on a private network.",
      "The proxy terminates TLS and parses the HTTP request.",
      "Rules choose an upstream by host or path; headers like X-Forwarded-For carry client details.",
      "Responses can be compressed, cached and buffered to slow clients.",
      "The proxy logs every request for observability."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "load-balancer",
      "cdn",
      "api-gateway",
      "caching"
    ]
  },
  {
    "kind": "concept",
    "slug": "cdn",
    "title": "CDN",
    "blurb": "Edge servers near users cache static and media content to cut latency and origin load.",
    "cat": "Networking",
    "diff": "Beginner",
    "mins": 11,
    "tags": [
      "edge",
      "cache",
      "latency",
      "static assets",
      "video"
    ],
    "preview": [
      "User",
      "Edge",
      "Origin"
    ],
    "def": "A content delivery network caches content on edge servers close to users, so most requests never travel to your origin.",
    "variants": [],
    "variantLabel": "",
    "what": "A geographically distributed fleet of caching reverse proxies (points of presence). Users are routed to a nearby PoP, which serves cached copies of static assets, images, video segments and sometimes API responses.",
    "why": "Latency is bounded by the speed of light: a request from India to Europe costs over 100 ms per round trip before any work is done. Serving from a nearby edge cuts latency and offloads most bandwidth from your origin.",
    "how": [
      "Users resolve your asset hostname to a nearby edge via GeoDNS or anycast.",
      "The edge checks its cache for the URL (cache key).",
      "On a miss it fetches from the origin or a regional shield cache.",
      "It stores the response according to Cache-Control and serves it.",
      "Purges or versioned URLs replace content when it changes."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "caching",
      "dns",
      "reverse-proxy",
      "load-balancer"
    ]
  },
  {
    "kind": "concept",
    "slug": "dns",
    "title": "DNS",
    "blurb": "Turns human-readable names into IP addresses through a chain of resolvers and name servers.",
    "cat": "Networking",
    "diff": "Beginner",
    "mins": 10,
    "tags": [
      "domain",
      "resolver",
      "ttl",
      "networking"
    ],
    "preview": [
      "Browser",
      "Resolver",
      "NS"
    ],
    "def": "The Domain Name System translates names like api.example.com into IP addresses through a hierarchy of name servers.",
    "variants": [],
    "variantLabel": "",
    "what": "A distributed, hierarchical, heavily cached directory. Root servers delegate to top-level domain servers, which delegate to the authoritative servers for each domain, which hold records such as A, AAAA, CNAME, MX and TXT.",
    "why": "Humans and configs use names; networks route IP addresses. DNS decouples the two so you can move services, add regions or fail over by changing records instead of changing every client.",
    "how": [
      "The client checks its local cache, then asks a recursive resolver.",
      "The resolver walks root → TLD → authoritative servers, following referrals.",
      "The authoritative server returns the record with a TTL.",
      "Every layer caches the answer until the TTL expires.",
      "Advanced setups return different answers by location or health (GeoDNS, failover routing)."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "cdn",
      "load-balancer",
      "reverse-proxy"
    ]
  },
  {
    "kind": "concept",
    "slug": "caching",
    "title": "Caching",
    "blurb": "Keeps hot data in fast memory so repeated reads skip the slow database.",
    "cat": "Data",
    "diff": "Beginner",
    "mins": 12,
    "tags": [
      "cache aside",
      "write through",
      "ttl",
      "lru",
      "invalidation"
    ],
    "preview": [
      "App",
      "Cache",
      "DB"
    ],
    "def": "A cache keeps a copy of frequently read data in fast storage so repeated reads skip the slower source of truth.",
    "variants": [
      {
        "id": "aside",
        "label": "Cache-aside",
        "note": "App reads the cache, falls back to the DB on a miss, then fills the cache."
      },
      {
        "id": "through",
        "label": "Write-through",
        "note": "Writes go through the cache to the DB, so the cache is always current."
      }
    ],
    "variantLabel": "Caching strategy",
    "what": "A layer of fast storage — usually memory — holding results that are expensive to compute or fetch. Caches exist at every level: CPU, browser, CDN, application (Redis, Memcached) and database buffer pools.",
    "why": "Databases are slower and harder to scale than memory, and most workloads are read-heavy and skewed: a small fraction of keys gets most reads. Serving those from memory cuts latency and protects the database.",
    "how": [
      "Pick a key that identifies the data, e.g. product:42.",
      "On read, check the cache; on a hit return immediately.",
      "On a miss, load from the source, store it with a TTL, return it.",
      "On write, update the source and invalidate or update the cached copy.",
      "When memory fills, evict by policy — usually LRU or LFU."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "redis",
      "cdn",
      "consistent-hashing",
      "db-replication"
    ]
  },
  {
    "kind": "concept",
    "slug": "redis",
    "title": "Redis",
    "blurb": "An in-memory data-structure store used for caching, counters, sessions and pub/sub.",
    "cat": "Data",
    "diff": "Intermediate",
    "mins": 13,
    "tags": [
      "in-memory",
      "cache",
      "pubsub",
      "key value"
    ],
    "preview": [
      "API",
      "Redis",
      "Replica"
    ],
    "def": "Redis is an in-memory data-structure server: strings, hashes, lists, sets, sorted sets and streams, with sub-millisecond operations.",
    "variants": [],
    "variantLabel": "",
    "what": "A single-threaded (per shard) in-memory server where values are typed data structures with their own atomic commands. It can persist to disk (RDB snapshots, AOF logs), replicate, and shard with Redis Cluster.",
    "why": "Many problems need shared state that is faster than a database and richer than a plain key-value cache: sessions, counters, rate limits, leaderboards, queues, locks and pub/sub. Redis offers those primitives with atomic operations.",
    "how": [
      "Clients send commands over TCP using the RESP protocol.",
      "A single event loop executes commands one at a time, so each is atomic.",
      "Data lives in RAM; optional RDB/AOF persistence writes to disk.",
      "Replicas receive a stream of writes asynchronously.",
      "Redis Cluster splits keys into 16,384 hash slots across primaries."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "caching",
      "rate-limiting",
      "consistent-hashing",
      "db-replication"
    ]
  },
  {
    "kind": "concept",
    "slug": "sql-vs-nosql",
    "title": "SQL vs NoSQL",
    "blurb": "Relational schemas and transactions versus flexible, horizontally partitioned stores.",
    "cat": "Data",
    "diff": "Beginner",
    "mins": 15,
    "tags": [
      "database",
      "postgres",
      "mongodb",
      "acid",
      "schema"
    ],
    "preview": [
      "App",
      "SQL",
      "NoSQL"
    ],
    "def": "Relational databases model data as related tables with transactions; NoSQL stores trade some of that for flexible schemas and easy horizontal scaling.",
    "variants": [],
    "variantLabel": "",
    "what": "SQL (relational) databases — PostgreSQL, MySQL — store rows in tables with a fixed schema, enforce constraints and support multi-row ACID transactions and joins. NoSQL is a family: document (MongoDB), wide-column (Cassandra), key-value (DynamoDB) and graph (Neo4j) stores, each optimised for particular access patterns.",
    "why": "Data shape and access patterns differ. Money, inventory and anything with invariants benefit from transactions and constraints. Massive key-based workloads with simple access patterns benefit from stores that partition and replicate automatically.",
    "how": [
      "Relational: normalise into tables, index the columns you filter on, use transactions for invariants.",
      "Document: store an aggregate (an order with its line items) as one document.",
      "Wide-column / key-value: design tables around queries; the partition key decides placement.",
      "Both families replicate; NoSQL systems usually shard by design.",
      "Many systems use both: SQL for the core ledger, NoSQL for feeds, sessions or events."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "db-replication",
      "db-sharding",
      "cap-theorem",
      "caching"
    ]
  },
  {
    "kind": "concept",
    "slug": "db-replication",
    "title": "Database Replication",
    "blurb": "Copies data from a primary to replicas for read scaling and failover.",
    "cat": "Data",
    "diff": "Intermediate",
    "mins": 14,
    "tags": [
      "primary",
      "replica",
      "failover",
      "lag",
      "database"
    ],
    "preview": [
      "Primary",
      "Replica ×2"
    ],
    "def": "Replication keeps copies of a database on several machines: one primary accepts writes and streams changes to replicas.",
    "variants": [],
    "variantLabel": "",
    "what": "A primary database records every change in a log and ships it to one or more replicas, which apply the same changes. Replication can be asynchronous (fast, may lose recent writes on failover), synchronous (safe, slower) or semi-synchronous (at least one replica confirms).",
    "why": "Copies give you read scalability, geographic proximity for reads, and a standby to promote when the primary fails. Without replicas, a single machine failure means downtime and possibly data loss.",
    "how": [
      "All writes go to the primary and are appended to its log (WAL / binlog).",
      "Replicas stream the log and apply changes in the same order.",
      "Applications send reads to replicas, accepting replication lag.",
      "A monitor detects primary failure and promotes the most current replica.",
      "Clients are redirected to the new primary via DNS, a proxy, or a service-discovery update."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "db-sharding",
      "cap-theorem",
      "sql-vs-nosql",
      "caching"
    ]
  },
  {
    "kind": "concept",
    "slug": "db-sharding",
    "title": "Database Sharding",
    "blurb": "Splits one dataset across many databases using a shard key.",
    "cat": "Data",
    "diff": "Advanced",
    "mins": 16,
    "tags": [
      "partitioning",
      "shard key",
      "hotspot",
      "database"
    ],
    "preview": [
      "Router",
      "Shard ×3"
    ],
    "def": "Sharding splits one logical dataset across several databases, each holding a subset of rows chosen by a shard key.",
    "variants": [],
    "variantLabel": "",
    "what": "Horizontal partitioning of data across independent database nodes. Each row belongs to exactly one shard based on its shard key, using ranges, hashing, or a lookup directory.",
    "why": "Replication scales reads but every replica still holds all the data and all writes still hit one primary. When data size or write throughput exceeds one machine, you must split the data itself.",
    "how": [
      "Choose a shard key with high cardinality that appears in most queries (user_id, tenant_id).",
      "Map keys to shards: range, hash, or consistent hashing with virtual nodes.",
      "Route every query through a router or a client library that knows the map.",
      "Keep related data on the same shard to avoid cross-shard joins.",
      "Rebalance by splitting shards or moving virtual nodes as data grows."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "consistent-hashing",
      "db-replication",
      "sql-vs-nosql",
      "cap-theorem"
    ]
  },
  {
    "kind": "concept",
    "slug": "message-queues",
    "title": "Message Queues",
    "blurb": "Buffers work between producers and consumers so traffic spikes don’t overwhelm services.",
    "cat": "Messaging",
    "diff": "Intermediate",
    "mins": 12,
    "tags": [
      "queue",
      "sqs",
      "rabbitmq",
      "async",
      "dlq",
      "retry"
    ],
    "preview": [
      "Producer",
      "Queue",
      "Workers"
    ],
    "def": "A message queue stores work items from producers until consumers are ready, decoupling who creates work from who does it.",
    "variants": [],
    "variantLabel": "",
    "what": "A durable buffer (SQS, RabbitMQ, Redis lists, Kafka used as a queue) where producers publish messages and consumers receive, process and acknowledge them. Each message is typically processed by one consumer.",
    "why": "Synchronous calls couple availability and speed: if the email service is slow, checkout is slow. A queue lets the producer finish fast, smooths bursts, and lets consumers fail and retry independently.",
    "how": [
      "Producer sends a message and moves on.",
      "The queue persists it durably.",
      "A consumer receives it; the message is hidden from others while in flight.",
      "On success the consumer acknowledges and the message is deleted.",
      "On failure or timeout it is redelivered; after N attempts it goes to a dead-letter queue."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "kafka",
      "event-driven",
      "circuit-breaker",
      "microservices"
    ]
  },
  {
    "kind": "concept",
    "slug": "kafka",
    "title": "Kafka",
    "blurb": "A partitioned, replayable commit log for high-throughput event streams.",
    "cat": "Messaging",
    "diff": "Advanced",
    "mins": 18,
    "tags": [
      "streaming",
      "partitions",
      "consumer group",
      "offsets",
      "log"
    ],
    "preview": [
      "Producer",
      "Partitions",
      "Consumers"
    ],
    "def": "Apache Kafka is a distributed, partitioned, append-only log: producers append events, consumers read at their own offsets and can replay.",
    "variants": [],
    "variantLabel": "",
    "what": "Topics are split into partitions; each partition is an ordered, immutable log replicated across brokers. Producers append; consumers in a group split partitions between them and track progress with offsets. Data is retained by time or size, independent of consumption.",
    "why": "Queues delete messages once processed and usually deliver to one consumer. Many systems need the same event stream consumed by several independent services, processed in order per key, at very high throughput, with the ability to reprocess history.",
    "how": [
      "Producers send records with a key; the key’s hash chooses a partition.",
      "The partition leader appends to its log and replicates to followers (ISR).",
      "Consumers in a group are assigned partitions and poll records in order.",
      "Consumers commit offsets to record progress.",
      "Retention keeps data for a configured period so new consumers can replay."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "message-queues",
      "event-driven",
      "consistent-hashing",
      "microservices"
    ]
  },
  {
    "kind": "concept",
    "slug": "rate-limiting",
    "title": "Rate Limiting",
    "blurb": "Caps how many requests a client can make in a window to protect capacity.",
    "cat": "Traffic",
    "diff": "Intermediate",
    "mins": 11,
    "tags": [
      "token bucket",
      "429",
      "throttling",
      "abuse"
    ],
    "preview": [
      "Client",
      "Limiter",
      "API"
    ],
    "def": "Rate limiting caps how many requests a client can make in a period, rejecting or delaying the excess.",
    "variants": [],
    "variantLabel": "",
    "what": "A policy enforced per client identity (API key, user, IP) that allows a certain number of requests per time unit. Common algorithms: token bucket, leaky bucket, fixed window and sliding window log/counter.",
    "why": "Capacity is finite. Without limits a buggy client, a scraper or an attack can consume everything and take the service down for everyone. Limits also enforce pricing tiers and fair use.",
    "how": [
      "Identify the caller: API key, user id, or IP.",
      "Look up its counter or bucket in fast shared storage.",
      "Apply the algorithm atomically: allow and decrement, or reject.",
      "Return 429 with Retry-After and rate-limit headers when rejected.",
      "Layer limits: per-IP at the edge, per-user at the gateway, per-dependency inside."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "api-gateway",
      "redis",
      "circuit-breaker",
      "load-balancer"
    ]
  },
  {
    "kind": "concept",
    "slug": "consistent-hashing",
    "title": "Consistent Hashing",
    "blurb": "Maps keys to nodes on a ring so adding a node moves only a fraction of keys.",
    "cat": "Data",
    "diff": "Advanced",
    "mins": 15,
    "tags": [
      "hash ring",
      "partitioning",
      "virtual nodes",
      "distributed cache"
    ],
    "preview": [
      "Key",
      "Ring",
      "Node"
    ],
    "def": "Consistent hashing places nodes and keys on the same hash ring, so each key belongs to the next node clockwise and membership changes move few keys.",
    "variants": [],
    "variantLabel": "",
    "what": "A partitioning technique: hash both servers and keys into the same space arranged as a ring; a key is stored on the first server found moving clockwise from the key’s hash. With virtual nodes, each physical server appears many times on the ring.",
    "why": "Simple modulo hashing reassigns almost every key when the number of servers changes, causing mass cache misses or massive data movement. Consistent hashing limits movement to about K/N keys when a node joins or leaves.",
    "how": [
      "Hash each server (or each of its virtual nodes) to a position on the ring.",
      "Keep positions in a sorted structure.",
      "For a key, hash it and binary-search for the next position clockwise.",
      "On join, the new node takes keys from its clockwise successor only.",
      "On leave, its keys go to its successor; replicas can be the next R distinct nodes."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "db-sharding",
      "caching",
      "load-balancer",
      "redis"
    ]
  },
  {
    "kind": "concept",
    "slug": "scaling",
    "title": "Horizontal vs Vertical Scaling",
    "blurb": "Bigger machines versus more machines — and why most systems end up doing both.",
    "cat": "Architecture",
    "diff": "Beginner",
    "mins": 10,
    "tags": [
      "scale up",
      "scale out",
      "capacity",
      "stateless"
    ],
    "preview": [
      "Users",
      "LB",
      "Servers"
    ],
    "def": "Vertical scaling makes one machine bigger; horizontal scaling adds more machines and spreads work across them.",
    "variants": [],
    "variantLabel": "",
    "what": "Vertical scaling (scale up) increases the CPU, memory or disk of one machine. Horizontal scaling (scale out) adds more machines running the same software, with a load balancer or partitioning to spread work.",
    "why": "Every system eventually exceeds what it was sized for. How you add capacity determines cost, availability and how much architectural change you need.",
    "how": [
      "Measure the bottleneck first: CPU, memory, I/O, or a downstream dependency.",
      "Scale up when the component is hard to distribute (a primary database) and headroom exists.",
      "Scale out stateless tiers: move session state to a shared store, put instances behind a balancer.",
      "For stateful data, combine replication (reads) and sharding (writes).",
      "Automate: autoscaling groups react to load."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "load-balancer",
      "db-sharding",
      "microservices",
      "caching"
    ]
  },
  {
    "kind": "concept",
    "slug": "microservices",
    "title": "Microservices",
    "blurb": "Splits an application into independently deployable services owned by small teams.",
    "cat": "Architecture",
    "diff": "Intermediate",
    "mins": 16,
    "tags": [
      "services",
      "monolith",
      "deployment",
      "domain"
    ],
    "preview": [
      "Gateway",
      "Services",
      "DBs"
    ],
    "def": "A microservice architecture splits an application into small services, each owning its data and deployed independently.",
    "variants": [],
    "variantLabel": "",
    "what": "An architectural style where each business capability (users, orders, payments) is a separately deployed service with its own codebase, data store and team, communicating over the network via APIs or events.",
    "why": "In a large monolith, many teams share one codebase and one release train; a change anywhere risks everything and slows everyone. Microservices trade some technical complexity for organisational independence and isolated scaling.",
    "how": [
      "Split by business domain (bounded contexts), not by technical layer.",
      "Give each service exclusive ownership of its data.",
      "Communicate synchronously (REST/gRPC) for queries and asynchronously (events) for reactions.",
      "Use a gateway, service discovery, tracing and per-service CI/CD.",
      "Add resilience: timeouts, retries with backoff, circuit breakers."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "api-gateway",
      "event-driven",
      "circuit-breaker",
      "message-queues"
    ]
  },
  {
    "kind": "concept",
    "slug": "websockets",
    "title": "WebSockets",
    "blurb": "A persistent, two-way connection for pushing real-time updates to clients.",
    "cat": "Networking",
    "diff": "Intermediate",
    "mins": 12,
    "tags": [
      "real-time",
      "push",
      "chat",
      "presence",
      "upgrade"
    ],
    "preview": [
      "Client",
      "WS Server",
      "Pub/Sub"
    ],
    "def": "WebSocket upgrades an HTTP connection into a persistent, full-duplex channel so the server can push data at any time.",
    "variants": [],
    "variantLabel": "",
    "what": "A protocol (RFC 6455) that starts as HTTP and upgrades to a long-lived TCP connection carrying framed messages in both directions with small overhead.",
    "why": "HTTP is request-response: the server can only answer. Polling for updates wastes requests and adds delay. Chat, live dashboards, multiplayer games and collaborative editing need the server to push immediately.",
    "how": [
      "Client sends an HTTP request with Upgrade: websocket.",
      "Server responds 101 and the connection switches protocol.",
      "Both sides exchange text or binary frames over the same connection.",
      "Heartbeats detect dead peers; clients reconnect with backoff.",
      "With many servers, a pub/sub layer routes messages to the server holding the recipient."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "event-driven",
      "load-balancer",
      "redis",
      "message-queues"
    ]
  },
  {
    "kind": "concept",
    "slug": "event-driven",
    "title": "Event-Driven Architecture",
    "blurb": "Services publish facts as events; others react without being called directly.",
    "cat": "Messaging",
    "diff": "Intermediate",
    "mins": 14,
    "tags": [
      "events",
      "pubsub",
      "decoupling",
      "async"
    ],
    "preview": [
      "Service",
      "Event bus",
      "Subscribers"
    ],
    "def": "In an event-driven architecture, services announce facts (“OrderPlaced”) and interested services react, without the publisher calling them.",
    "variants": [],
    "variantLabel": "",
    "what": "Components communicate by producing and consuming events — immutable records of something that happened — through a broker (Kafka, SNS/SQS, EventBridge, NATS). Producers and consumers are decoupled in time and knowledge.",
    "why": "With direct calls, the order service must know and call every downstream system, and is blocked by their failures. Events invert the dependency: new behaviour is added by subscribing, and slow consumers don’t slow producers.",
    "how": [
      "Define events as past-tense facts with a schema and version.",
      "Producers publish after committing their own state (outbox pattern avoids lost events).",
      "The broker durably stores and routes events.",
      "Consumers subscribe, process idempotently and track progress.",
      "Long workflows use choreography (react to events) or an orchestrator."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "kafka",
      "message-queues",
      "microservices",
      "websockets"
    ]
  },
  {
    "kind": "concept",
    "slug": "cap-theorem",
    "title": "CAP Theorem",
    "blurb": "During a network partition, a distributed store must choose consistency or availability.",
    "cat": "Data",
    "diff": "Advanced",
    "mins": 13,
    "tags": [
      "consistency",
      "availability",
      "partition",
      "distributed"
    ],
    "preview": [
      "Node A",
      "✕",
      "Node B"
    ],
    "def": "When a network partition splits a distributed data store, it must choose between consistency (every read sees the latest write) and availability (every request gets a response).",
    "variants": [
      {
        "id": "cp",
        "label": "Choose consistency (CP)",
        "note": "Reject requests that can’t be confirmed by a majority."
      },
      {
        "id": "ap",
        "label": "Choose availability (AP)",
        "note": "Keep answering on both sides and reconcile later."
      }
    ],
    "variantLabel": "During the partition",
    "what": "A result about replicated systems: of Consistency (linearizability), Availability (every non-failed node answers) and Partition tolerance, you cannot have all three during a partition. Since partitions happen, the real choice is C or A while one lasts.",
    "why": "It forces an explicit decision about behaviour during network failures — the hardest time to improvise. Bank balances and leader election usually need C; shopping carts and social likes often prefer A.",
    "how": [
      "Data is replicated on nodes in different racks or regions.",
      "Normally, replicas sync and both C and A are achievable.",
      "A partition prevents some nodes from communicating.",
      "CP systems refuse writes or reads that can’t reach a quorum.",
      "AP systems accept them locally and resolve conflicts after healing (versions, CRDTs, last-writer-wins)."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "db-replication",
      "consistent-hashing",
      "sql-vs-nosql",
      "db-sharding"
    ]
  },
  {
    "kind": "concept",
    "slug": "circuit-breaker",
    "title": "Circuit Breaker",
    "blurb": "Stops calling a failing dependency so one outage doesn’t cascade through the system.",
    "cat": "Traffic",
    "diff": "Intermediate",
    "mins": 11,
    "tags": [
      "resilience",
      "fail fast",
      "half-open",
      "retries"
    ],
    "preview": [
      "Service",
      "Breaker",
      "Dependency"
    ],
    "def": "A circuit breaker wraps calls to a dependency and, after repeated failures, fails fast instead of waiting on a service that is down.",
    "variants": [],
    "variantLabel": "",
    "what": "A stateful proxy around remote calls with three states: Closed (normal), Open (calls rejected immediately) and Half-open (a few trial calls test recovery). Transitions are driven by failure rates and timers.",
    "why": "When a dependency hangs, callers pile up waiting on timeouts, exhausting threads and connections until they fail too. Failing fast preserves the caller’s resources, gives the dependency room to recover, and enables fallbacks.",
    "how": [
      "Wrap each remote dependency call in a breaker.",
      "In Closed state, record successes and failures in a sliding window.",
      "When failure rate or count exceeds a threshold, switch to Open.",
      "While Open, return an error or fallback immediately.",
      "After a cool-down, go Half-open; close on success, reopen on failure."
    ],
    "tradeoffs": {
      "pros": [],
      "cons": []
    },
    "companies": [],
    "related": [
      "microservices",
      "rate-limiting",
      "message-queues",
      "api-gateway"
    ]
  }
];
