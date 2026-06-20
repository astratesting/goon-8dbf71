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
};
