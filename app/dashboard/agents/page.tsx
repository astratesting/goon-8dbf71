"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import AgentCard from "@/components/AgentCard";
import {
  mockAgents,
  type Agent,
  type AgentRole,
  agentRoleLabels,
} from "@/lib/mock-data";

export default function AgentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [filterRole, setFilterRole] = useState<AgentRole | "all">("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

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

  const filtered = agents.filter((a) => {
    if (filterRole !== "all" && a.role !== filterRole) return false;
    if (filterStatus !== "all" && a.status !== filterStatus) return false;
    return true;
  });

  const activeCount = agents.filter((a) => a.status === "active").length;
  const totalJobs = agents.reduce((sum, a) => sum + a.completedJobs, 0);
  const totalActive = agents.reduce((sum, a) => sum + a.activeJobs, 0);

  const handleToggle = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id !== agentId) return a;
        if (a.status === "error") return a;
        return {
          ...a,
          status: a.status === "paused" ? "active" : a.status === "active" ? "paused" : a.status,
          lastActive: a.status === "paused" ? "just now" : a.lastActive,
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-ink">
      <DashboardNav user={session.user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-2">
              Agent Fleet
            </h1>
            <p className="text-zinc-400">
              Monitor and configure your autonomous print workflow agents.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="border-glow rounded-xl p-5">
            <p className="text-zinc-500 text-xs font-mono mb-1">Active Agents</p>
            <p className="font-heading font-bold text-2xl text-teal">{activeCount}</p>
          </div>
          <div className="border-glow rounded-xl p-5">
            <p className="text-zinc-500 text-xs font-mono mb-1">Total Agents</p>
            <p className="font-heading font-bold text-2xl text-white">{agents.length}</p>
          </div>
          <div className="border-glow rounded-xl p-5">
            <p className="text-zinc-500 text-xs font-mono mb-1">Running Jobs</p>
            <p className="font-heading font-bold text-2xl text-cyan">{totalActive}</p>
          </div>
          <div className="border-glow rounded-xl p-5">
            <p className="text-zinc-500 text-xs font-mono mb-1">Jobs Completed</p>
            <p className="font-heading font-bold text-2xl text-white">{totalJobs}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as AgentRole | "all")}
            className="px-3 py-2 rounded-lg bg-ink border border-white/10 text-zinc-300 text-sm focus:outline-none focus:border-indigo/50"
          >
            <option value="all">All Roles</option>
            {Object.entries(agentRoleLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg bg-ink border border-white/10 text-zinc-300 text-sm focus:outline-none focus:border-indigo/50"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="idle">Idle</option>
            <option value="error">Error</option>
          </select>

          <span className="text-zinc-500 text-xs font-mono ml-auto">
            {filtered.length} agent{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Agent grid */}
        {filtered.length === 0 ? (
          <div className="border-glow rounded-xl p-12 text-center">
            <p className="text-zinc-500">No agents match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onToggle={() => handleToggle(agent.id)}
                onView={() => router.push(`/dashboard/agents/${agent.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
