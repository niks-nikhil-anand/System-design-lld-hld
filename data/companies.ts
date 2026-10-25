import { CompanyItem } from '@/types/systemly';

export interface RichCompanyItem extends CompanyItem {
  overview?: string;
  products?: { name: string; problem: string }[];
  takeaways?: string[];
  scale?: { k: string; v: string }[];
  flowTitle?: string;
  nodes?: any[];
  edges?: any[];
}

export const COMPANIES: RichCompanyItem[] = [
  {
    "kind": "company",
    "slug": "google",
    "title": "Google",
    "blurb": "Web-scale search, indexing pipelines and globally distributed storage.",
    "cat": "Company",
    "diff": "Intermediate",
    "mins": 20,
    "tags": [
      "search",
      "indexing",
      "mapreduce",
      "distributed storage",
      "caching"
    ],
    "topics": 11,
    "overview": "Search answers a query in a fraction of a second by fanning it out across thousands of index shards built offline by large batch pipelines.",
    "products": [
      {
        "name": "Search",
        "problem": "Query billions of documents in under 200 ms."
      },
      {
        "name": "Maps",
        "problem": "Shortest routes over a continent-sized road graph."
      },
      {
        "name": "Gmail",
        "problem": "Durable storage for billions of mailboxes."
      }
    ],
    "takeaways": [],
    "scale": [],
    "flowTitle": "distributed search query",
    "nodes": [
      {
        "id": "user",
        "label": "Browser",
        "kind": "client",
        "x": 7,
        "y": 28
      },
      {
        "id": "fe",
        "label": "Front-end server",
        "kind": "gateway",
        "x": 26,
        "y": 28
      },
      {
        "id": "cache",
        "label": "Results cache",
        "kind": "cache",
        "x": 26,
        "y": 6
      },
      {
        "id": "root",
        "label": "Query root",
        "kind": "service",
        "x": 48,
        "y": 28
      },
      {
        "id": "l1",
        "label": "Index shard 1",
        "kind": "database",
        "x": 74,
        "y": 8
      },
      {
        "id": "l2",
        "label": "Index shard 2",
        "kind": "database",
        "x": 74,
        "y": 28
      },
      {
        "id": "l3",
        "label": "Index shard N",
        "kind": "database",
        "x": 74,
        "y": 48
      },
      {
        "id": "rank",
        "label": "Ranking",
        "kind": "service",
        "x": 48,
        "y": 50
      }
    ],
    "edges": [
      [
        "user",
        "fe"
      ],
      [
        "fe",
        "cache"
      ],
      [
        "fe",
        "root"
      ],
      [
        "root",
        "l1"
      ],
      [
        "root",
        "l2"
      ],
      [
        "root",
        "l3"
      ],
      [
        "root",
        "rank"
      ]
    ]
  },
  {
    "kind": "company",
    "slug": "amazon",
    "title": "Amazon",
    "blurb": "Shopping carts, order pipelines and highly available key-value storage.",
    "cat": "Company",
    "diff": "Intermediate",
    "mins": 20,
    "tags": [
      "e-commerce",
      "dynamo",
      "queues",
      "microservices"
    ],
    "topics": 11,
    "overview": "A storefront where the cart must always accept writes and checkout must never charge twice, built from many independently owned services.",
    "products": [
      {
        "name": "Retail checkout",
        "problem": "Reserve inventory and charge exactly once under peak load."
      },
      {
        "name": "Shopping cart",
        "problem": "Always writable, even during partial outages."
      },
      {
        "name": "Order fulfilment",
        "problem": "Coordinate warehouses, payments and shipping asynchronously."
      }
    ],
    "takeaways": [],
    "scale": [],
    "flowTitle": "checkout",
    "nodes": [
      {
        "id": "app",
        "label": "Shopper",
        "kind": "client",
        "x": 7,
        "y": 28
      },
      {
        "id": "gw",
        "label": "API gateway",
        "kind": "gateway",
        "x": 26,
        "y": 28
      },
      {
        "id": "cart",
        "label": "Cart service",
        "kind": "service",
        "x": 50,
        "y": 8
      },
      {
        "id": "kv",
        "label": "Key-value store",
        "kind": "database",
        "x": 82,
        "y": 8
      },
      {
        "id": "order",
        "label": "Order service",
        "kind": "service",
        "x": 50,
        "y": 30
      },
      {
        "id": "pay",
        "label": "Payment service",
        "kind": "service",
        "x": 82,
        "y": 30
      },
      {
        "id": "q",
        "label": "Fulfilment queue",
        "kind": "queue",
        "x": 50,
        "y": 50
      },
      {
        "id": "wh",
        "label": "Warehouse workers",
        "kind": "worker",
        "x": 82,
        "y": 50
      }
    ],
    "edges": [
      [
        "app",
        "gw"
      ],
      [
        "gw",
        "cart"
      ],
      [
        "cart",
        "kv"
      ],
      [
        "gw",
        "order"
      ],
      [
        "order",
        "pay"
      ],
      [
        "order",
        "q"
      ],
      [
        "q",
        "wh"
      ]
    ]
  },
  {
    "kind": "company",
    "slug": "netflix",
    "title": "Netflix",
    "blurb": "Video streaming, CDN delivery, resilience engineering and recommendations.",
    "cat": "Company",
    "diff": "Intermediate",
    "mins": 20,
    "tags": [
      "streaming",
      "cdn",
      "caching",
      "circuit breaker",
      "recommendations"
    ],
    "topics": 10,
    "overview": "The control plane (browsing, auth, playback decisions) runs in the cloud; the data plane — the video bytes — comes from CDN appliances close to viewers.",
    "products": [
      {
        "name": "Video streaming",
        "problem": "Start playback fast and adapt quality to changing bandwidth."
      },
      {
        "name": "Recommendations",
        "problem": "Personalised rows for every profile on every launch."
      },
      {
        "name": "Global availability",
        "problem": "Survive failures of instances, services and whole regions."
      }
    ],
    "takeaways": [],
    "scale": [],
    "flowTitle": "pressing play",
    "nodes": [
      {
        "id": "tv",
        "label": "TV app / player",
        "kind": "client",
        "x": 7,
        "y": 28
      },
      {
        "id": "gw",
        "label": "API gateway",
        "kind": "gateway",
        "x": 28,
        "y": 28
      },
      {
        "id": "meta",
        "label": "Metadata service",
        "kind": "service",
        "x": 52,
        "y": 8
      },
      {
        "id": "play",
        "label": "Playback service",
        "kind": "service",
        "x": 52,
        "y": 30
      },
      {
        "id": "rec",
        "label": "Recommendations",
        "kind": "service",
        "x": 52,
        "y": 50
      },
      {
        "id": "cdn1",
        "label": "CDN edge (ISP)",
        "kind": "cdn",
        "x": 84,
        "y": 18
      },
      {
        "id": "cdn2",
        "label": "CDN edge (IX)",
        "kind": "cdn",
        "x": 84,
        "y": 42
      }
    ],
    "edges": [
      [
        "tv",
        "gw"
      ],
      [
        "gw",
        "meta"
      ],
      [
        "gw",
        "play"
      ],
      [
        "gw",
        "rec"
      ],
      [
        "tv",
        "cdn1"
      ],
      [
        "tv",
        "cdn2"
      ]
    ]
  },
  {
    "kind": "company",
    "slug": "meta",
    "title": "Meta",
    "blurb": "News feed ranking, social graph storage and fan-out at massive scale.",
    "cat": "Company",
    "diff": "Intermediate",
    "mins": 20,
    "tags": [
      "feed",
      "social graph",
      "fan-out",
      "caching"
    ],
    "topics": 10,
    "overview": "Every feed load reads a personalised slice of a huge social graph; the design leans on aggressive caching in front of sharded storage.",
    "products": [
      {
        "name": "News Feed",
        "problem": "Assemble and rank candidate posts per user in milliseconds."
      },
      {
        "name": "Social graph",
        "problem": "Friends, likes and comments as billions of edges."
      },
      {
        "name": "Messenger",
        "problem": "Real-time delivery across devices."
      }
    ],
    "takeaways": [],
    "scale": [],
    "flowTitle": "loading the feed",
    "nodes": [
      {
        "id": "app",
        "label": "App",
        "kind": "client",
        "x": 7,
        "y": 28
      },
      {
        "id": "web",
        "label": "Web tier",
        "kind": "service",
        "x": 28,
        "y": 28
      },
      {
        "id": "agg",
        "label": "Feed aggregator",
        "kind": "service",
        "x": 52,
        "y": 16
      },
      {
        "id": "rank",
        "label": "Ranking",
        "kind": "service",
        "x": 52,
        "y": 42
      },
      {
        "id": "mc",
        "label": "Graph cache",
        "kind": "cache",
        "x": 80,
        "y": 10
      },
      {
        "id": "db",
        "label": "Sharded graph DB",
        "kind": "database",
        "x": 80,
        "y": 40
      }
    ],
    "edges": [
      [
        "app",
        "web"
      ],
      [
        "web",
        "agg"
      ],
      [
        "agg",
        "rank"
      ],
      [
        "agg",
        "mc"
      ],
      [
        "mc",
        "db"
      ],
      [
        "agg",
        "db"
      ]
    ]
  },
  {
    "kind": "company",
    "slug": "uber",
    "title": "Uber",
    "blurb": "Real-time location updates, geospatial indexing and ride matching.",
    "cat": "Company",
    "diff": "Intermediate",
    "mins": 20,
    "tags": [
      "geospatial",
      "matching",
      "real-time",
      "events"
    ],
    "topics": 10,
    "overview": "Millions of drivers stream locations every few seconds; matching must find nearby available drivers and dispatch one before the rider gives up.",
    "products": [
      {
        "name": "Ride matching",
        "problem": "Find the best nearby driver in under a second."
      },
      {
        "name": "Live tracking",
        "problem": "Show the car moving on the rider’s map."
      },
      {
        "name": "Pricing",
        "problem": "Adjust prices by real-time supply and demand per area."
      }
    ],
    "takeaways": [],
    "scale": [],
    "flowTitle": "requesting a ride",
    "nodes": [
      {
        "id": "driver",
        "label": "Driver app",
        "kind": "client",
        "x": 7,
        "y": 10
      },
      {
        "id": "rider",
        "label": "Rider app",
        "kind": "client",
        "x": 7,
        "y": 46
      },
      {
        "id": "loc",
        "label": "Location service",
        "kind": "service",
        "x": 34,
        "y": 10
      },
      {
        "id": "geo",
        "label": "Geo index (cells)",
        "kind": "cache",
        "x": 64,
        "y": 10
      },
      {
        "id": "match",
        "label": "Matching / dispatch",
        "kind": "service",
        "x": 40,
        "y": 46
      },
      {
        "id": "bus",
        "label": "Event stream",
        "kind": "broker",
        "x": 72,
        "y": 46
      },
      {
        "id": "trip",
        "label": "Trip service",
        "kind": "service",
        "x": 92,
        "y": 28
      }
    ],
    "edges": [
      [
        "driver",
        "loc"
      ],
      [
        "loc",
        "geo"
      ],
      [
        "rider",
        "match"
      ],
      [
        "match",
        "geo"
      ],
      [
        "match",
        "driver"
      ],
      [
        "match",
        "bus"
      ],
      [
        "bus",
        "trip"
      ],
      [
        "loc",
        "bus"
      ]
    ]
  },
  {
    "kind": "company",
    "slug": "whatsapp",
    "title": "WhatsApp",
    "blurb": "Persistent connections, message delivery receipts and offline queues.",
    "cat": "Company",
    "diff": "Intermediate",
    "mins": 20,
    "tags": [
      "chat",
      "websockets",
      "delivery",
      "presence"
    ],
    "topics": 9,
    "overview": "Each phone keeps a persistent connection to a chat server. Messages are delivered immediately when the recipient is online and held until they reconnect when not.",
    "products": [
      {
        "name": "One-to-one chat",
        "problem": "Deliver in order with sent, delivered and read receipts."
      },
      {
        "name": "Group chat",
        "problem": "Fan out to up to hundreds of members."
      },
      {
        "name": "Media",
        "problem": "Upload once, deliver to many without re-uploading."
      }
    ],
    "takeaways": [],
    "scale": [],
    "flowTitle": "sending a message",
    "nodes": [
      {
        "id": "a",
        "label": "Asha",
        "kind": "client",
        "x": 7,
        "y": 14
      },
      {
        "id": "b",
        "label": "Ben",
        "kind": "client",
        "x": 7,
        "y": 46
      },
      {
        "id": "cs1",
        "label": "Chat server 1",
        "kind": "server",
        "x": 40,
        "y": 14
      },
      {
        "id": "cs2",
        "label": "Chat server 2",
        "kind": "server",
        "x": 40,
        "y": 46
      },
      {
        "id": "route",
        "label": "Session registry",
        "kind": "cache",
        "x": 74,
        "y": 30
      },
      {
        "id": "store",
        "label": "Offline store",
        "kind": "database",
        "x": 74,
        "y": 52
      },
      {
        "id": "push",
        "label": "Push service",
        "kind": "service",
        "x": 92,
        "y": 10
      }
    ],
    "edges": [
      [
        "a",
        "cs1"
      ],
      [
        "b",
        "cs2"
      ],
      [
        "cs1",
        "route"
      ],
      [
        "cs1",
        "cs2"
      ],
      [
        "cs1",
        "store"
      ],
      [
        "cs1",
        "push"
      ],
      [
        "cs2",
        "store"
      ]
    ]
  },
  {
    "kind": "company",
    "slug": "youtube",
    "title": "YouTube",
    "blurb": "Upload, transcoding pipelines and adaptive bitrate playback.",
    "cat": "Company",
    "diff": "Intermediate",
    "mins": 20,
    "tags": [
      "video",
      "transcoding",
      "cdn",
      "object storage"
    ],
    "topics": 11,
    "overview": "Hours of video are uploaded every minute; each upload is transcoded into many renditions and served globally from edge caches.",
    "products": [
      {
        "name": "Upload",
        "problem": "Accept huge files reliably over flaky connections."
      },
      {
        "name": "Transcoding",
        "problem": "Produce many resolutions and codecs quickly."
      },
      {
        "name": "Playback",
        "problem": "Start fast anywhere in the world."
      }
    ],
    "takeaways": [],
    "scale": [],
    "flowTitle": "upload to playback",
    "nodes": [
      {
        "id": "creator",
        "label": "Creator",
        "kind": "client",
        "x": 7,
        "y": 14
      },
      {
        "id": "up",
        "label": "Upload service",
        "kind": "service",
        "x": 30,
        "y": 14
      },
      {
        "id": "raw",
        "label": "Object storage",
        "kind": "database",
        "x": 56,
        "y": 14
      },
      {
        "id": "q",
        "label": "Transcode queue",
        "kind": "queue",
        "x": 56,
        "y": 40
      },
      {
        "id": "w",
        "label": "Transcode workers",
        "kind": "worker",
        "x": 82,
        "y": 40
      },
      {
        "id": "cdn",
        "label": "CDN edge",
        "kind": "cdn",
        "x": 82,
        "y": 14
      },
      {
        "id": "viewer",
        "label": "Viewer",
        "kind": "client",
        "x": 30,
        "y": 46
      }
    ],
    "edges": [
      [
        "creator",
        "up"
      ],
      [
        "up",
        "raw"
      ],
      [
        "up",
        "q"
      ],
      [
        "q",
        "w"
      ],
      [
        "w",
        "raw"
      ],
      [
        "raw",
        "cdn"
      ],
      [
        "cdn",
        "viewer"
      ]
    ]
  },
  {
    "kind": "company",
    "slug": "instagram",
    "title": "Instagram",
    "blurb": "Photo upload, feed generation and media delivery.",
    "cat": "Company",
    "diff": "Intermediate",
    "mins": 20,
    "tags": [
      "feed",
      "media",
      "sharding",
      "cdn"
    ],
    "topics": 10,
    "overview": "Photos go to object storage and the CDN; post metadata lives in sharded relational databases; feeds are precomputed for most users.",
    "products": [
      {
        "name": "Photo posts",
        "problem": "Upload, resize and serve images globally."
      },
      {
        "name": "Home feed",
        "problem": "Show followed accounts’ posts, ranked."
      },
      {
        "name": "Explore",
        "problem": "Recommend content from accounts you don’t follow."
      }
    ],
    "takeaways": [],
    "scale": [],
    "flowTitle": "posting a photo",
    "nodes": [
      {
        "id": "user",
        "label": "Creator",
        "kind": "client",
        "x": 7,
        "y": 28
      },
      {
        "id": "api",
        "label": "API",
        "kind": "service",
        "x": 28,
        "y": 28
      },
      {
        "id": "media",
        "label": "Media service",
        "kind": "service",
        "x": 52,
        "y": 8
      },
      {
        "id": "cdn",
        "label": "CDN",
        "kind": "cdn",
        "x": 82,
        "y": 8
      },
      {
        "id": "db",
        "label": "Sharded Postgres",
        "kind": "database",
        "x": 52,
        "y": 30
      },
      {
        "id": "fan",
        "label": "Fan-out workers",
        "kind": "worker",
        "x": 52,
        "y": 50
      },
      {
        "id": "feed",
        "label": "Feed cache",
        "kind": "cache",
        "x": 82,
        "y": 42
      }
    ],
    "edges": [
      [
        "user",
        "api"
      ],
      [
        "api",
        "media"
      ],
      [
        "media",
        "cdn"
      ],
      [
        "api",
        "db"
      ],
      [
        "api",
        "fan"
      ],
      [
        "fan",
        "feed"
      ]
    ]
  },
  {
    "kind": "company",
    "slug": "discord",
    "title": "Discord",
    "blurb": "Real-time voice and chat, fan-out to large servers and message storage.",
    "cat": "Company",
    "diff": "Intermediate",
    "mins": 20,
    "tags": [
      "chat",
      "websockets",
      "fan-out",
      "storage"
    ],
    "topics": 10,
    "overview": "Clients hold a WebSocket to a gateway; each server (guild) is handled by a process that fans messages out to online members, while history lives in a wide-column store.",
    "products": [
      {
        "name": "Text channels",
        "problem": "Deliver to thousands of online members instantly."
      },
      {
        "name": "Voice",
        "problem": "Low-latency audio between many participants."
      },
      {
        "name": "Message history",
        "problem": "Trillions of messages, fast reads of recent ones."
      }
    ],
    "takeaways": [],
    "scale": [],
    "flowTitle": "sending a channel message",
    "nodes": [
      {
        "id": "u1",
        "label": "Sender",
        "kind": "client",
        "x": 7,
        "y": 14
      },
      {
        "id": "u2",
        "label": "Member",
        "kind": "client",
        "x": 7,
        "y": 46
      },
      {
        "id": "gw1",
        "label": "Gateway A",
        "kind": "gateway",
        "x": 32,
        "y": 14
      },
      {
        "id": "gw2",
        "label": "Gateway B",
        "kind": "gateway",
        "x": 32,
        "y": 46
      },
      {
        "id": "guild",
        "label": "Guild process",
        "kind": "service",
        "x": 60,
        "y": 28
      },
      {
        "id": "store",
        "label": "Message store",
        "kind": "database",
        "x": 88,
        "y": 28
      }
    ],
    "edges": [
      [
        "u1",
        "gw1"
      ],
      [
        "u2",
        "gw2"
      ],
      [
        "gw1",
        "guild"
      ],
      [
        "gw2",
        "guild"
      ],
      [
        "guild",
        "store"
      ]
    ]
  },
  {
    "kind": "company",
    "slug": "cloudflare",
    "title": "Cloudflare",
    "blurb": "Edge networks, DNS, DDoS mitigation and rate limiting.",
    "cat": "Company",
    "diff": "Intermediate",
    "mins": 20,
    "tags": [
      "edge",
      "dns",
      "rate limiting",
      "cdn",
      "anycast"
    ],
    "topics": 10,
    "overview": "An anycast network: the same IP addresses are announced from hundreds of cities, so each user reaches the nearest data centre, which filters, caches and proxies to the origin.",
    "products": [
      {
        "name": "CDN and reverse proxy",
        "problem": "Serve and protect customer origins worldwide."
      },
      {
        "name": "DNS",
        "problem": "Answer queries fast and survive attacks."
      },
      {
        "name": "DDoS and WAF",
        "problem": "Drop malicious traffic before it reaches origins."
      }
    ],
    "takeaways": [],
    "scale": [],
    "flowTitle": "a request at the edge",
    "nodes": [
      {
        "id": "user",
        "label": "User",
        "kind": "client",
        "x": 7,
        "y": 14
      },
      {
        "id": "bot",
        "label": "Botnet",
        "kind": "client",
        "x": 7,
        "y": 46
      },
      {
        "id": "dns",
        "label": "Anycast DNS",
        "kind": "dns",
        "x": 30,
        "y": 6
      },
      {
        "id": "pop",
        "label": "Nearest PoP",
        "kind": "proxy",
        "x": 40,
        "y": 30
      },
      {
        "id": "waf",
        "label": "WAF / rate limit",
        "kind": "limiter",
        "x": 64,
        "y": 30
      },
      {
        "id": "cache",
        "label": "Edge cache",
        "kind": "cache",
        "x": 64,
        "y": 52
      },
      {
        "id": "origin",
        "label": "Customer origin",
        "kind": "server",
        "x": 90,
        "y": 30
      }
    ],
    "edges": [
      [
        "user",
        "dns"
      ],
      [
        "user",
        "pop"
      ],
      [
        "bot",
        "pop"
      ],
      [
        "pop",
        "waf"
      ],
      [
        "waf",
        "cache"
      ],
      [
        "waf",
        "origin"
      ]
    ]
  },
  {
    "kind": "company",
    "slug": "spotify",
    "title": "Spotify",
    "blurb": "Audio streaming, playlist services and event pipelines.",
    "cat": "Company",
    "diff": "Intermediate",
    "mins": 20,
    "tags": [
      "streaming",
      "events",
      "kafka",
      "recommendations"
    ],
    "topics": 10,
    "overview": "Audio files are served from CDNs; every play, skip and save becomes an event feeding personalisation pipelines.",
    "products": [
      {
        "name": "Playback",
        "problem": "Start a track in a few hundred milliseconds."
      },
      {
        "name": "Playlists",
        "problem": "Collaborative edits synced across devices."
      },
      {
        "name": "Discover Weekly",
        "problem": "Personalised playlists for every user, every week."
      }
    ],
    "takeaways": [],
    "scale": [],
    "flowTitle": "playing a track",
    "nodes": [
      {
        "id": "app",
        "label": "App",
        "kind": "client",
        "x": 7,
        "y": 28
      },
      {
        "id": "api",
        "label": "API",
        "kind": "gateway",
        "x": 28,
        "y": 28
      },
      {
        "id": "meta",
        "label": "Track metadata",
        "kind": "service",
        "x": 52,
        "y": 8
      },
      {
        "id": "cdn",
        "label": "Audio CDN",
        "kind": "cdn",
        "x": 84,
        "y": 8
      },
      {
        "id": "events",
        "label": "Event pipeline",
        "kind": "broker",
        "x": 52,
        "y": 46
      },
      {
        "id": "reco",
        "label": "Recommendation jobs",
        "kind": "worker",
        "x": 84,
        "y": 46
      }
    ],
    "edges": [
      [
        "app",
        "api"
      ],
      [
        "api",
        "meta"
      ],
      [
        "app",
        "cdn"
      ],
      [
        "api",
        "events"
      ],
      [
        "events",
        "reco"
      ]
    ]
  },
  {
    "kind": "company",
    "slug": "linkedin",
    "title": "LinkedIn",
    "blurb": "Feed, connection graph queries and the origin story of Kafka.",
    "cat": "Company",
    "diff": "Intermediate",
    "mins": 20,
    "tags": [
      "kafka",
      "graph",
      "feed",
      "search"
    ],
    "topics": 10,
    "overview": "Member activity flows through Kafka — which LinkedIn created — into feeds, search indexes and analytics; the connection graph powers “people you may know”.",
    "products": [
      {
        "name": "Feed",
        "problem": "Rank updates from connections and followed pages."
      },
      {
        "name": "Connections",
        "problem": "Degree-of-separation queries over a huge graph."
      },
      {
        "name": "Search",
        "problem": "Index people and jobs as profiles change."
      }
    ],
    "takeaways": [],
    "scale": [],
    "flowTitle": "an update reaching the feed",
    "nodes": [
      {
        "id": "member",
        "label": "Member",
        "kind": "client",
        "x": 7,
        "y": 28
      },
      {
        "id": "api",
        "label": "Profile / post API",
        "kind": "service",
        "x": 30,
        "y": 28
      },
      {
        "id": "kafka",
        "label": "Kafka topics",
        "kind": "broker",
        "x": 56,
        "y": 28
      },
      {
        "id": "feed",
        "label": "Feed index",
        "kind": "service",
        "x": 84,
        "y": 8
      },
      {
        "id": "search",
        "label": "Search index",
        "kind": "service",
        "x": 84,
        "y": 28
      },
      {
        "id": "graph",
        "label": "Graph service",
        "kind": "database",
        "x": 84,
        "y": 48
      }
    ],
    "edges": [
      [
        "member",
        "api"
      ],
      [
        "api",
        "kafka"
      ],
      [
        "kafka",
        "feed"
      ],
      [
        "kafka",
        "search"
      ],
      [
        "kafka",
        "graph"
      ]
    ]
  }
];
