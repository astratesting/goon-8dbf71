// Realistic mock data for the demo dashboard
// This data is used when there's no real database connection

export interface Project {
  id: string;
  name: string;
  status: "design" | "review" | "printing" | "shipped" | "completed";
  description: string;
  pieces: number;
  material: string;
  createdAt: string;
  updatedAt: string;
  estimatedShip: string;
  totalPrice: number;
}

export interface Order {
  id: string;
  projectId: string;
  projectName: string;
  status: "processing" | "printing" | "quality-check" | "shipped" | "delivered";
  pieces: number;
  placedAt: string;
  estimatedDelivery: string;
  trackingNumber: string | null;
  total: number;
}

export const mockProjects: Project[] = [
  {
    id: "proj-001",
    name: "Dragon Knight Miniature",
    status: "printing",
    description: "A 75mm scale dragon knight with lance and shield. Resin print at 50-micron layers for maximum detail on the armor engravings.",
    pieces: 1,
    material: "ABS-like Resin",
    createdAt: "2026-06-10",
    updatedAt: "2026-06-18",
    estimatedShip: "2026-06-22",
    totalPrice: 18.50,
  },
  {
    id: "proj-002",
    name: "Goblin Warband (10x)",
    status: "review",
    description: "Ten unique goblin miniatures for a D&D campaign. Mixed weapons: 3 with swords, 3 with bows, 2 with spears, 2 with daggers.",
    pieces: 10,
    material: "Standard Resin",
    createdAt: "2026-06-14",
    updatedAt: "2026-06-19",
    estimatedShip: "2026-06-28",
    totalPrice: 72.00,
  },
  {
    id: "proj-003",
    name: "Mandalorian Helmet",
    status: "design",
    description: "Full-size wearable Mandalorian helmet. Scaled to head circumference of 58cm. Includes visor slot and rangefinder mount.",
    pieces: 3,
    material: "PETG (FDM)",
    createdAt: "2026-06-17",
    updatedAt: "2026-06-19",
    estimatedShip: "2026-07-05",
    totalPrice: 95.00,
  },
  {
    id: "proj-004",
    name: "Terrain: Ruined Tower",
    status: "completed",
    description: "Modular ruined tower for tabletop wargaming. 4 sections that stack and lock. Fits standard 28-32mm scale.",
    pieces: 4,
    material: "PLA (FDM)",
    createdAt: "2026-05-28",
    updatedAt: "2026-06-08",
    estimatedShip: "2026-06-05",
    totalPrice: 34.00,
  },
];

export const mockOrders: Order[] = [
  {
    id: "ord-001",
    projectId: "proj-001",
    projectName: "Dragon Knight Miniature",
    status: "printing",
    pieces: 1,
    placedAt: "2026-06-12",
    estimatedDelivery: "2026-06-24",
    trackingNumber: null,
    total: 18.50,
  },
  {
    id: "ord-002",
    projectId: "proj-004",
    projectName: "Terrain: Ruined Tower",
    status: "delivered",
    pieces: 4,
    placedAt: "2026-05-30",
    estimatedDelivery: "2026-06-08",
    trackingNumber: "GOON-2026-0608-A3F",
    total: 34.00,
  },
];

export const statusColors: Record<string, string> = {
  design: "text-cyan bg-cyan/10 border-cyan/20",
  review: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  printing: "text-indigo bg-indigo/10 border-indigo/20",
  shipped: "text-teal bg-teal/10 border-teal/20",
  completed: "text-teal bg-teal/10 border-teal/20",
  processing: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "quality-check": "text-cyan bg-cyan/10 border-cyan/20",
  delivered: "text-teal bg-teal/10 border-teal/20",
};

export const statusLabels: Record<string, string> = {
  design: "In Design",
  review: "Awaiting Review",
  printing: "Printing",
  shipped: "Shipped",
  completed: "Completed",
  processing: "Processing",
  "quality-check": "Quality Check",
  delivered: "Delivered",
  active: "Active",
  paused: "Paused",
  idle: "Idle",
  error: "Error",
};

// ── Agent types & mock data ────────────────────────────────────────

export type AgentStatus = "active" | "paused" | "idle" | "error";
export type AgentRole = "print-manager" | "quality-inspector" | "order-processor" | "design-reviewer";

export interface AgentConfig {
  autoApproveDesigns: boolean;
  maxConcurrentJobs: number;
  notifyOnCompletion: boolean;
  retryOnFailure: boolean;
  maxRetries: number;
  materialPreference: string[];
  qualityThreshold: number; // 0-100
}

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  status: AgentStatus;
  description: string;
  avatar: string; // initial letter or emoji
  activeJobs: number;
  completedJobs: number;
  failedJobs: number;
  uptime: string;
  lastActive: string;
  config: AgentConfig;
  recentActivity: { time: string; message: string }[];
}

export const agentRoleLabels: Record<AgentRole, string> = {
  "print-manager": "Print Manager",
  "quality-inspector": "Quality Inspector",
  "order-processor": "Order Processor",
  "design-reviewer": "Design Reviewer",
};

export const agentRoleDescriptions: Record<AgentRole, string> = {
  "print-manager": "Manages print queue, schedules jobs, and monitors printer status in real-time.",
  "quality-inspector": "Inspects completed prints for defects, measures tolerances, and flags issues.",
  "order-processor": "Handles incoming orders, validates specifications, and prepares job tickets.",
  "design-reviewer": "Reviews submitted designs for printability, suggests optimizations, and approves for production.",
};

export const agentStatusColors: Record<AgentStatus, string> = {
  active: "text-teal bg-teal/10 border-teal/20",
  paused: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  idle: "text-zinc-400 bg-zinc-400/10 border-zinc-400/20",
  error: "text-red-400 bg-red-400/10 border-red-400/20",
};

export const mockAgents: Agent[] = [
  {
    id: "agent-001",
    name: "Forge",
    role: "print-manager",
    status: "active",
    description: "Primary print queue manager. Handles all FDM and resin print scheduling, monitors bed temperatures, and auto-balances load across printers.",
    avatar: "F",
    activeJobs: 3,
    completedJobs: 147,
    failedJobs: 2,
    uptime: "14d 6h",
    lastActive: "2 min ago",
    config: {
      autoApproveDesigns: false,
      maxConcurrentJobs: 4,
      notifyOnCompletion: true,
      retryOnFailure: true,
      maxRetries: 3,
      materialPreference: ["Standard Resin", "ABS-like Resin", "PLA (FDM)"],
      qualityThreshold: 85,
    },
    recentActivity: [
      { time: "2 min ago", message: "Started print job: Dragon Knight Miniature (layer 1/4200)" },
      { time: "18 min ago", message: "Completed print job: Terrain tile batch #12" },
      { time: "1h ago", message: "Printer #3 bed leveling recalibrated" },
      { time: "2h ago", message: "Queue reordered: priority bump for order ord-001" },
    ],
  },
  {
    id: "agent-002",
    name: "Lens",
    role: "quality-inspector",
    status: "active",
    description: "Automated quality control agent. Runs dimensional checks, surface quality scans, and compares output against source STL files.",
    avatar: "L",
    activeJobs: 1,
    completedJobs: 89,
    failedJobs: 0,
    uptime: "14d 6h",
    lastActive: "5 min ago",
    config: {
      autoApproveDesigns: false,
      maxConcurrentJobs: 2,
      notifyOnCompletion: true,
      retryOnFailure: false,
      maxRetries: 0,
      materialPreference: [],
      qualityThreshold: 92,
    },
    recentActivity: [
      { time: "5 min ago", message: "Quality check passed: Terrain tile batch #12 (score: 96/100)" },
      { time: "32 min ago", message: "Dimensional scan complete: Goblin Warband piece 7/10" },
      { time: "1h ago", message: "Flagged minor surface defect on piece 4 — within tolerance" },
      { time: "3h ago", message: "Batch quality report generated for order ord-002" },
    ],
  },
  {
    id: "agent-003",
    name: "Inkwell",
    role: "design-reviewer",
    status: "paused",
    description: "Design review and optimization agent. Analyzes mesh topology, wall thickness, and support requirements before approving designs for print.",
    avatar: "I",
    activeJobs: 0,
    completedJobs: 62,
    failedJobs: 5,
    uptime: "14d 6h",
    lastActive: "3h ago",
    config: {
      autoApproveDesigns: true,
      maxConcurrentJobs: 3,
      notifyOnCompletion: true,
      retryOnFailure: true,
      maxRetries: 2,
      materialPreference: ["Standard Resin", "ABS-like Resin"],
      qualityThreshold: 78,
    },
    recentActivity: [
      { time: "3h ago", message: "Paused by user — manual review requested for Mandalorian Helmet" },
      { time: "4h ago", message: "Auto-approved: Goblin Warband (10x) — all meshes valid" },
      { time: "5h ago", message: "Optimization suggested: reduce support density on helmet visor (-12% material)" },
      { time: "6h ago", message: "Mesh repair applied: Dragon Knight shield (non-manifold edges fixed)" },
    ],
  },
  {
    id: "agent-004",
    name: "Dispatch",
    role: "order-processor",
    status: "active",
    description: "Order intake and processing agent. Validates incoming orders, checks material stock, generates job tickets, and coordinates with Forge for scheduling.",
    avatar: "D",
    activeJobs: 2,
    completedJobs: 203,
    failedJobs: 1,
    uptime: "14d 6h",
    lastActive: "just now",
    config: {
      autoApproveDesigns: false,
      maxConcurrentJobs: 6,
      notifyOnCompletion: true,
      retryOnFailure: true,
      maxRetries: 3,
      materialPreference: [],
      qualityThreshold: 80,
    },
    recentActivity: [
      { time: "just now", message: "New order received: proj-002 — Goblin Warband (10x)" },
      { time: "12 min ago", message: "Stock check passed: Standard Resin sufficient for 10 pieces" },
      { time: "45 min ago", message: "Job ticket generated: JT-2026-0620-001" },
      { time: "2h ago", message: "Order ord-001 forwarded to Forge for scheduling" },
    ],
  },
  {
    id: "agent-005",
    name: "Sentinel",
    role: "print-manager",
    status: "error",
    description: "Backup print manager for overflow and overnight jobs. Currently offline due to printer connection timeout on Printer #5.",
    avatar: "S",
    activeJobs: 0,
    completedJobs: 34,
    failedJobs: 8,
    uptime: "0d 0h",
    lastActive: "6h ago",
    config: {
      autoApproveDesigns: false,
      maxConcurrentJobs: 2,
      notifyOnCompletion: true,
      retryOnFailure: true,
      maxRetries: 5,
      materialPreference: ["PLA (FDM)", "PETG (FDM)"],
      qualityThreshold: 75,
    },
    recentActivity: [
      { time: "6h ago", message: "ERROR: Lost connection to Printer #5 — USB timeout after 30s" },
      { time: "6h ago", message: "Retrying connection (attempt 5/5)..." },
      { time: "7h ago", message: "WARNING: Printer #5 temperature sensor reading anomalous" },
      { time: "8h ago", message: "Completed overflow batch: terrain tiles (overnight run)" },
    ],
  },
];
