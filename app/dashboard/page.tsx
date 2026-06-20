"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import NewProjectModal from "@/components/NewProjectModal";
import {
  mockProjects,
  mockOrders,
  statusColors,
  statusLabels,
  type Project,
  type Order,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [orders] = useState<Order[]>(mockOrders);
  const [activeTab, setActiveTab] = useState<"projects" | "orders">("projects");
  const [showNewProject, setShowNewProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session?.user) return null;

  const handleNewProject = (data: { name: string; description: string; material: string; pieces: number }) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: data.name,
      status: "design",
      description: data.description,
      pieces: data.pieces,
      material: data.material,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      estimatedShip: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
      totalPrice: data.pieces * 12,
    };
    setProjects([newProject, ...projects]);
    setShowNewProject(false);
    setSelectedProject(newProject);
  };

  // Project detail view
  if (selectedProject) {
    const relatedOrder = orders.find((o) => o.projectId === selectedProject.id);
    return (
      <div className="min-h-screen bg-ink">
        <DashboardNav user={session.user} />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6 text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Dashboard
          </button>

          <div className="border-glow rounded-2xl p-6 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="font-heading font-bold text-2xl text-white mb-2">
                  {selectedProject.name}
                </h1>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                    statusColors[selectedProject.status]
                  }`}
                >
                  {statusLabels[selectedProject.status]}
                </span>
              </div>
              <div className="text-right">
                <p className="text-zinc-500 text-xs mb-1">Estimated Total</p>
                <p className="font-heading font-bold text-2xl text-white">
                  ${selectedProject.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-zinc-500 text-xs mb-1">Material</p>
                <p className="text-white text-sm font-medium font-mono">{selectedProject.material}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-zinc-500 text-xs mb-1">Pieces</p>
                <p className="text-white text-sm font-medium font-mono">{selectedProject.pieces}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-zinc-500 text-xs mb-1">Created</p>
                <p className="text-white text-sm font-medium font-mono">{selectedProject.createdAt}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-zinc-500 text-xs mb-1">Est. Ship</p>
                <p className="text-white text-sm font-medium font-mono">{selectedProject.estimatedShip}</p>
              </div>
            </div>
          </div>

          {/* Progress tracker */}
          <div className="border-glow rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-heading font-semibold text-lg text-white mb-6">Progress</h2>
            <div className="flex items-center justify-between">
              {["design", "review", "printing", "shipped", "completed"].map((step, i) => {
                const steps = ["design", "review", "printing", "shipped", "completed"];
                const currentIdx = steps.indexOf(selectedProject.status);
                const isActive = i <= currentIdx;
                return (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold mb-2 ${
                        isActive
                          ? "bg-indigo text-white"
                          : "bg-white/5 text-zinc-600"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className={`text-xs text-center ${isActive ? "text-white" : "text-zinc-600"}`}>
                      {statusLabels[step]}
                    </span>
                    {i < 4 && (
                      <div
                        className={`absolute h-0.5 w-full ${isActive ? "bg-indigo" : "bg-white/5"}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order info if exists */}
          {relatedOrder && (
            <div className="border-glow rounded-2xl p-6 sm:p-8">
              <h2 className="font-heading font-semibold text-lg text-white mb-4">Order Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-zinc-500 text-xs mb-1">Order ID</p>
                  <p className="text-white text-sm font-medium font-mono">{relatedOrder.id}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-zinc-500 text-xs mb-1">Placed</p>
                  <p className="text-white text-sm font-medium font-mono">{relatedOrder.placedAt}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-zinc-500 text-xs mb-1">Tracking</p>
                  <p className="text-white text-sm font-medium font-mono">
                    {relatedOrder.trackingNumber || "Not yet available"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Dashboard overview
  const activeProjects = projects.filter((p) => p.status !== "completed");
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-ink">
      <DashboardNav user={session.user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-2">
            Welcome back, {session.user.name || "Maker"}
          </h1>
          <p className="text-zinc-400">
            Manage your custom 3D print projects and track orders.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="border-glow rounded-xl p-5">
            <p className="text-zinc-500 text-xs font-mono mb-1">Active Projects</p>
            <p className="font-heading font-bold text-2xl text-white">{activeProjects.length}</p>
          </div>
          <div className="border-glow rounded-xl p-5">
            <p className="text-zinc-500 text-xs font-mono mb-1">Total Projects</p>
            <p className="font-heading font-bold text-2xl text-white">{projects.length}</p>
          </div>
          <div className="border-glow rounded-xl p-5">
            <p className="text-zinc-500 text-xs font-mono mb-1">Orders</p>
            <p className="font-heading font-bold text-2xl text-white">{orders.length}</p>
          </div>
          <div className="border-glow rounded-xl p-5">
            <p className="text-zinc-500 text-xs font-mono mb-1">Total Spent</p>
            <p className="font-heading font-bold text-2xl text-white">${totalSpent.toFixed(2)}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "projects"
                ? "bg-indigo/10 text-indigo border border-indigo/20"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "orders"
                ? "bg-indigo/10 text-indigo border border-indigo/20"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Orders
          </button>
          {activeTab === "projects" && (
            <button
              onClick={() => setShowNewProject(true)}
              className="ml-auto px-4 py-2 bg-gradient-to-r from-indigo to-cyan text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              + New Project
            </button>
          )}
        </div>

        {/* Projects list */}
        {activeTab === "projects" && (
          <div className="space-y-3">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="w-full text-left border-glow rounded-xl p-5 hover:border-indigo/30 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-heading font-semibold text-white group-hover:text-cyan transition-colors truncate">
                        {project.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-mono font-semibold border shrink-0 ${
                          statusColors[project.status]
                        }`}
                      >
                        {statusLabels[project.status]}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-sm truncate">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm shrink-0">
                    <span className="text-zinc-500 font-mono">{project.material}</span>
                    <span className="text-white font-mono font-semibold">
                      ${project.totalPrice.toFixed(2)}
                    </span>
                    <svg className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Orders list */}
        {activeTab === "orders" && (
          <div className="space-y-3">
            {orders.length === 0 ? (
              <div className="border-glow rounded-xl p-12 text-center">
                <p className="text-zinc-500">No orders yet. Create a project to get started.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="border-glow rounded-xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-heading font-semibold text-white">
                          {order.projectName}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-mono font-semibold border ${
                            statusColors[order.status]
                          }`}
                        >
                          {statusLabels[order.status]}
                        </span>
                      </div>
                      <p className="text-zinc-500 text-sm">
                        Order {order.id} &middot; {order.pieces} piece{order.pieces > 1 ? "s" : ""} &middot; Placed {order.placedAt}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm shrink-0">
                      {order.trackingNumber && (
                        <span className="text-zinc-500 font-mono text-xs">
                          {order.trackingNumber}
                        </span>
                      )}
                      <span className="text-white font-mono font-semibold">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {showNewProject && (
        <NewProjectModal
          onClose={() => setShowNewProject(false)}
          onSubmit={handleNewProject}
        />
      )}
    </div>
  );
}
