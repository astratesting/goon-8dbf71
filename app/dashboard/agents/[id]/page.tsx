"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import AgentConfigModal from "@/components/AgentConfigModal";
import {
  mockAgents,
  agentRoleLabels,
  agentRoleDescriptions,
  agentStatusColors,
  type Agent,
  type AgentConfig,
} from "@/lib/mock-data";

export default function AgentDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const agentId = params.id as string;

  const [agent, setAgent] = useState<Agent | undefined>(
    mockAgents.find((a) => a.id === agentId)
  );
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-ink">
        <DashboardNav user={session.user || {}} />
        <main className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="font-heading font-bold text-2xl text-white mb-4">
            Agent not found
          </h1>
          <p className="text-zinc-400 mb-6">
            This agent does not exist or has been decommissioned.
          </p>
          <button
            onClick={() => router.push("/dashboard/agents")}
            className="px-5 py-2.5 bg-indigo text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-medium"
          >
            Back to Agents
          </button>
        </main>
      </div>
    );
  }

  const handleToggle = () => {
    if (agent.status === "error") return;
    setAgent((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        status: prev.status === "paused" ? "active" : prev.status === "active" ? "paused" : prev.status,
        lastActive: prev.status === "paused" ? "just now" : prev.lastActive,
      };
    });
  };

  const handleSaveConfig = (config: AgentConfig) => {
    setAgent((prev) => {
      if (!prev) return prev;
      return { ...prev, config };
    });
    setShowConfig(false);
  };

  const failureRate =
    agent.completedJobs + agent.failedJobs > 0
      ? ((agent.failedJobs / (agent.completedJobs + agent.failedJobs)) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-ink">
      <DashboardNav user={session.user || {}} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => router.push("/dashboard/agents")}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Agents
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo to-cyan flex items-center justify-center shrink-0">
              <span className="text-white font-heading font-bold text-2xl">
                {agent.avatar}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                  {agent.name}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                    agentStatusColors[agent.status]
                  }`}
                >
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </span>
              </div>
              <p className="text-indigo text-sm font-mono mb-1">
                {agentRoleLabels[agent.role]}
              </p>
              <p className="text-zinc-400 text-sm max-w-xl">
                {agent.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {agent.status !== "error" && (
              <button
                onClick={handleToggle}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  agent.status === "paused"
                    ? "bg-teal/10 border border-teal/30 text-teal hover:bg-teal/20"
                    : "bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/20"
                }`}
              >
                {agent.status === "paused" ? "Resume Agent" : "Pause Agent"}
              </button>
            )}
            <button
              onClick={() => setShowConfig(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo to-cyan text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-semibold"
            >
              Configure
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          <div className="border-glow rounded-xl p-4">
            <p className="text-zinc-500 text-xs font-mono mb-1">Active Jobs</p>
            <p className="font-heading font-bold text-xl text-cyan">{agent.activeJobs}</p>
          </div>
          <div className="border-glow rounded-xl p-4">
            <p className="text-zinc-500 text-xs font-mono mb-1">Completed</p>
            <p className="font-heading font-bold text-xl text-teal">{agent.completedJobs}</p>
          </div>
          <div className="border-glow rounded-xl p-4">
            <p className="text-zinc-500 text-xs font-mono mb-1">Failed</p>
            <p className="font-heading font-bold text-xl text-red-400">{agent.failedJobs}</p>
          </div>
          <div className="border-glow rounded-xl p-4">
            <p className="text-zinc-500 text-xs font-mono mb-1">Failure Rate</p>
            <p className="font-heading font-bold text-xl text-white">{failureRate}%</p>
          </div>
          <div className="border-glow rounded-xl p-4">
            <p className="text-zinc-500 text-xs font-mono mb-1">Uptime</p>
            <p className="font-heading font-bold text-xl text-white">{agent.uptime}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity feed */}
          <div className="lg:col-span-2 border-glow rounded-2xl p-6">
            <h2 className="font-heading font-semibold text-lg text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {agent.recentActivity.map((entry, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-300">{entry.message}</p>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">{entry.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Config summary */}
          <div className="border-glow rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-lg text-white">
                Configuration
              </h2>
              <button
                onClick={() => setShowConfig(true)}
                className="text-xs text-indigo hover:text-cyan transition-colors font-mono"
              >
                Edit
              </button>
            </div>
            <dl className="space-y-3">
              <div className="flex justify-between items-center">
                <dt className="text-sm text-zinc-400">Auto-approve</dt>
                <dd className="text-sm font-mono">
                  {agent.config.autoApproveDesigns ? (
                    <span className="text-teal">ON</span>
                  ) : (
                    <span className="text-zinc-500">OFF</span>
                  )}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm text-zinc-400">Max Concurrent</dt>
                <dd className="text-sm text-white font-mono">{agent.config.maxConcurrentJobs}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm text-zinc-400">Notify on Done</dt>
                <dd className="text-sm font-mono">
                  {agent.config.notifyOnCompletion ? (
                    <span className="text-teal">ON</span>
                  ) : (
                    <span className="text-zinc-500">OFF</span>
                  )}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm text-zinc-400">Retry on Fail</dt>
                <dd className="text-sm font-mono">
                  {agent.config.retryOnFailure ? (
                    <span className="text-teal">ON</span>
                  ) : (
                    <span className="text-zinc-500">OFF</span>
                  )}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm text-zinc-400">Max Retries</dt>
                <dd className="text-sm text-white font-mono">{agent.config.maxRetries}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm text-zinc-400">Quality Threshold</dt>
                <dd className="text-sm text-white font-mono">{agent.config.qualityThreshold}%</dd>
              </div>
              <div className="pt-2 border-t border-white/5">
                <dt className="text-sm text-zinc-400 mb-2">Materials</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {agent.config.materialPreference.length > 0 ? (
                    agent.config.materialPreference.map((m) => (
                      <span
                        key={m}
                        className="px-2 py-0.5 rounded-full text-xs font-mono bg-indigo/10 text-indigo border border-indigo/20"
                      >
                        {m}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-zinc-500">All materials</span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>

      {showConfig && (
        <AgentConfigModal
          agent={agent}
          onClose={() => setShowConfig(false)}
          onSave={handleSaveConfig}
        />
      )}
    </div>
  );
}
