export type PlaygroundTemplateId = "web" | "event" | "edge";
export interface PlaygroundNode {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  desc: string;
}
export interface PlaygroundTemplate {
  name: string;
  desc: string;
  p99: string;
  qps: string;
  bottleneck: string;
  nodes: PlaygroundNode[];
  flow: string[];
}
export const PLAYGROUND_TEMPLATES: Record<
  PlaygroundTemplateId,
  PlaygroundTemplate
> = {
  web: {
    name: "Three-Tier Web App",
    desc: "Classic client -> CDN -> load balancer -> app servers -> database topology with Redis caching.",
    p99: "42 ms",
    qps: "15,000 req/s",
    bottleneck: "Primary Database writes under flash sales",
    nodes: [
      {
        id: "client",
        name: "Web Client",
        type: "Client",
        x: 10,
        y: 50,
        desc: "Browser or mobile app initiating HTTPS requests",
      },
      {
        id: "cdn",
        name: "Cloud CDN",
        type: "Edge",
        x: 28,
        y: 50,
        desc: "Caches static assets and terminates TLS near user",
      },
      {
        id: "lb",
        name: "Load Balancer",
        type: "Gateway",
        x: 48,
        y: 50,
        desc: "Layer 7 proxy distributing HTTP requests evenly",
      },
      {
        id: "api",
        name: "API Cluster",
        type: "Service",
        x: 68,
        y: 50,
        desc: "Stateless Go/Node backend workers",
      },
      {
        id: "cache",
        name: "Redis Cache",
        type: "Cache",
        x: 88,
        y: 25,
        desc: "In-memory key-value store for hot sessions & data",
      },
      {
        id: "db",
        name: "Postgres DB",
        type: "Database",
        x: 88,
        y: 75,
        desc: "ACID relational database with read replica",
      },
    ],
    flow: ["client", "cdn", "lb", "api", "cache", "db"],
  },
  event: {
    name: "Async Event Pipeline",
    desc: "High-throughput stream processing with Kafka partitions and decoupled worker consumers.",
    p99: "18 ms",
    qps: "85,000 msg/s",
    bottleneck: "Consumer worker pool processing lag during spikes",
    nodes: [
      {
        id: "client",
        name: "IoT / Producers",
        type: "Client",
        x: 10,
        y: 50,
        desc: "Sensors or client apps generating event streams",
      },
      {
        id: "gateway",
        name: "Ingress Gateway",
        type: "Gateway",
        x: 30,
        y: 50,
        desc: "Validates schemas and enforces rate limits",
      },
      {
        id: "kafka",
        name: "Kafka Cluster",
        type: "Queue",
        x: 55,
        y: 50,
        desc: "Distributed partitioned commit log with replication",
      },
      {
        id: "worker1",
        name: "Worker Pool A",
        type: "Service",
        x: 85,
        y: 25,
        desc: "Real-time analytics and alerting processor",
      },
      {
        id: "worker2",
        name: "Worker Pool B",
        type: "Service",
        x: 85,
        y: 75,
        desc: "Batch persistence and long-term storage sync",
      },
    ],
    flow: ["client", "gateway", "kafka", "worker1", "worker2"],
  },
  edge: {
    name: "Global Edge Architecture",
    desc: "Multi-region edge network utilizing Anycast routing and geo-distributed caching.",
    p99: "12 ms",
    qps: "120,000 req/s",
    bottleneck: "Cross-region database replication latency",
    nodes: [
      {
        id: "client",
        name: "Global Users",
        type: "Client",
        x: 10,
        y: 50,
        desc: "Worldwide users routed via BGP Anycast",
      },
      {
        id: "dns",
        name: "Anycast DNS",
        type: "Network",
        x: 32,
        y: 50,
        desc: "Resolves to geographically closest edge point",
      },
      {
        id: "edgeNode",
        name: "Edge Workers",
        type: "Edge",
        x: 58,
        y: 50,
        desc: "Lightweight V8 isolate compute running at edge",
      },
      {
        id: "origin",
        name: "Origin Cluster",
        type: "Service",
        x: 88,
        y: 50,
        desc: "Central data plane with primary transaction store",
      },
    ],
    flow: ["client", "dns", "edgeNode", "origin"],
  },
};
