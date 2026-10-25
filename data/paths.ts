import { PathItem } from '@/types/systemly';

export const PATHS: PathItem[] = [
  {
    "kind": "path",
    "slug": "fundamentals",
    "title": "System Design Fundamentals",
    "blurb": "How a request travels through the internet and the building blocks every design uses.",
    "cat": "Path",
    "diff": "Beginner",
    "duration": "≈ 3 h",
    "modules": [
      {
        "title": "How a request travels",
        "items": [
          "concept:dns",
          "concept:cdn",
          "concept:reverse-proxy",
          "concept:load-balancer"
        ]
      },
      {
        "title": "Making reads fast",
        "items": [
          "concept:caching",
          "concept:redis"
        ]
      },
      {
        "title": "Storing data",
        "items": [
          "concept:sql-vs-nosql",
          "concept:db-replication"
        ]
      },
      {
        "title": "Putting it together",
        "items": [
          "concept:scaling",
          "case:url-shortener"
        ]
      }
    ],
    "tags": [
      "path",
      "course"
    ],
    "mins": 0,
    "total": 10
  },
  {
    "kind": "path",
    "slug": "backend-essentials",
    "title": "Backend Engineering Essentials",
    "blurb": "The everyday tools of a backend engineer: gateways, limits, caches, queues and real-time.",
    "cat": "Path",
    "diff": "Beginner",
    "duration": "≈ 4 h",
    "modules": [
      {
        "title": "The front door",
        "items": [
          "concept:api-gateway",
          "concept:rate-limiting"
        ]
      },
      {
        "title": "State and speed",
        "items": [
          "concept:caching",
          "concept:sql-vs-nosql"
        ]
      },
      {
        "title": "Async and real-time",
        "items": [
          "concept:message-queues",
          "concept:websockets"
        ]
      },
      {
        "title": "Capstone",
        "items": [
          "case:notification-service"
        ]
      }
    ],
    "tags": [
      "path",
      "course"
    ],
    "mins": 0,
    "total": 7
  },
  {
    "kind": "path",
    "slug": "distributed-systems",
    "title": "Distributed Systems",
    "blurb": "Partitions, replication, ordering and failure — the theory behind every large system.",
    "cat": "Path",
    "diff": "Advanced",
    "duration": "≈ 6 h",
    "modules": [
      {
        "title": "Trade-offs",
        "items": [
          "concept:cap-theorem",
          "concept:db-replication"
        ]
      },
      {
        "title": "Partitioning",
        "items": [
          "concept:db-sharding",
          "concept:consistent-hashing",
          "algorithm:consistent-hashing"
        ]
      },
      {
        "title": "Streams and events",
        "items": [
          "concept:kafka",
          "concept:event-driven"
        ]
      },
      {
        "title": "Failure",
        "items": [
          "concept:circuit-breaker",
          "case:job-queue"
        ]
      }
    ],
    "tags": [
      "path",
      "course"
    ],
    "mins": 0,
    "total": 9
  },
  {
    "kind": "path",
    "slug": "hld-interview",
    "title": "High-Level Design Interview Prep",
    "blurb": "Six classic interview problems plus the concepts interviewers probe most.",
    "cat": "Path",
    "diff": "Intermediate",
    "duration": "≈ 8 h",
    "modules": [
      {
        "title": "Core toolkit",
        "items": [
          "concept:load-balancer",
          "concept:caching",
          "concept:db-sharding"
        ]
      },
      {
        "title": "Warm-up problems",
        "items": [
          "case:url-shortener",
          "case:notification-service"
        ]
      },
      {
        "title": "Real-time problems",
        "items": [
          "case:chat-app",
          "case:ride-hailing"
        ]
      },
      {
        "title": "Scale problems",
        "items": [
          "case:social-feed",
          "case:video-streaming"
        ]
      }
    ],
    "tags": [
      "path",
      "course"
    ],
    "mins": 0,
    "total": 9
  },
  {
    "kind": "path",
    "slug": "lld",
    "title": "Low-Level Design",
    "blurb": "Design the classes inside components: limiters, breakers, caches and core data structures.",
    "cat": "Path",
    "diff": "Intermediate",
    "duration": "≈ 4 h",
    "modules": [
      {
        "title": "Stateful components",
        "items": [
          "concept:rate-limiting",
          "concept:circuit-breaker",
          "concept:caching"
        ]
      },
      {
        "title": "Data structures behind them",
        "items": [
          "algorithm:trie",
          "algorithm:union-find",
          "algorithm:consistent-hashing"
        ]
      },
      {
        "title": "Capstone",
        "items": [
          "case:job-queue"
        ]
      }
    ],
    "tags": [
      "path",
      "course"
    ],
    "mins": 0,
    "total": 7
  },
  {
    "kind": "path",
    "slug": "dsa",
    "title": "Algorithms and Data Structures",
    "blurb": "Fourteen core algorithms with visual, input-driven traces.",
    "cat": "Path",
    "diff": "Beginner",
    "duration": "≈ 7 h",
    "modules": [
      {
        "title": "Arrays and searching",
        "items": [
          "algorithm:binary-search",
          "algorithm:two-pointers",
          "algorithm:sliding-window"
        ]
      },
      {
        "title": "Sorting",
        "items": [
          "algorithm:merge-sort",
          "algorithm:quick-sort"
        ]
      },
      {
        "title": "Graphs",
        "items": [
          "algorithm:bfs",
          "algorithm:dfs",
          "algorithm:dijkstra",
          "algorithm:a-star",
          "algorithm:topological-sort",
          "algorithm:union-find"
        ]
      },
      {
        "title": "Strings and DP",
        "items": [
          "algorithm:trie",
          "algorithm:kmp",
          "algorithm:dynamic-programming"
        ]
      }
    ],
    "tags": [
      "path",
      "course"
    ],
    "mins": 0,
    "total": 14
  },
  {
    "kind": "path",
    "slug": "scalable-backend",
    "title": "Scalable Backend Architecture",
    "blurb": "From one server to a fleet: scaling, services, streams and three full designs.",
    "cat": "Path",
    "diff": "Advanced",
    "duration": "≈ 6 h",
    "modules": [
      {
        "title": "Scaling out",
        "items": [
          "concept:scaling",
          "concept:load-balancer",
          "concept:cdn"
        ]
      },
      {
        "title": "Services and messaging",
        "items": [
          "concept:microservices",
          "concept:api-gateway",
          "concept:message-queues",
          "concept:kafka"
        ]
      },
      {
        "title": "Data at scale",
        "items": [
          "concept:db-sharding"
        ]
      },
      {
        "title": "Designs",
        "items": [
          "case:e-commerce",
          "case:food-delivery",
          "case:file-storage"
        ]
      }
    ],
    "tags": [
      "path",
      "course"
    ],
    "mins": 0,
    "total": 11
  }
];
