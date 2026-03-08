export interface WorkItem {
  id: number;
  title: string;
  description: string;
  category: "Software" | "Research" | "Automation";
}

export const works: WorkItem[] = [
  {
    id: 1,
    title: "Distributed Task Scheduler",
    description: "A fault-tolerant job orchestration engine built for high-throughput workloads with deterministic scheduling guarantees.",
    category: "Software",
  },
  {
    id: 2,
    title: "Constraint Propagation in NP-Hard Domains",
    description: "Research into arc-consistency algorithms applied to large-scale constraint satisfaction problems.",
    category: "Research",
  },
  {
    id: 3,
    title: "CI/CD Pipeline Generator",
    description: "Automated infrastructure-as-code tool that generates deployment pipelines from declarative YAML configs.",
    category: "Automation",
  },
  {
    id: 4,
    title: "Real-Time Telemetry Dashboard",
    description: "Low-latency monitoring platform ingesting millions of data points per second with sub-second rendering.",
    category: "Software",
  },
  {
    id: 5,
    title: "Formal Verification of State Machines",
    description: "Model checking techniques for verifying correctness properties of concurrent finite-state automata.",
    category: "Research",
  },
  {
    id: 6,
    title: "Self-Healing Infrastructure Agent",
    description: "An autonomous agent that monitors, diagnoses, and remediates production incidents using rule-based heuristics.",
    category: "Automation",
  },
  {
    id: 7,
    title: "Graph-Based Dependency Resolver",
    description: "Topological sort-based resolver for complex dependency graphs with cycle detection and conflict resolution.",
    category: "Software",
  },
  {
    id: 8,
    title: "Entropy Analysis in Chaotic Systems",
    description: "Quantifying information entropy across non-linear dynamical systems using Lyapunov exponent estimation.",
    category: "Research",
  },
];
