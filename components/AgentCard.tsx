"use client";

import {
  agentRoleLabels,
  agentStatusColors,
  type Agent,
} from "@/lib/mock-data";

interface AgentCardProps {
  agent: Agent;
  onToggle: () => void;
  onView: () => void;
}

export default function AgentCard({ agent, onToggle, onView }: AgentCardProps) {
  const statusDot =
    agent.status === "active"
      ? "bg-teal animate-pulse"
      : agent.status === "paused"
      ? "bg-yellow-400"
      : agent.status === "error"
      ? "bg-red-400"
      : "bg-zinc-500";

  return (
    <div className="border-glow rounded-xl p-5 hover:border-indigo/30 transition-all group">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo to-cyan flex items-center justify-center shrink-0">
          <span className="text-white font-heading font-bold text-lg">
            {agent.avatar}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Name & status */}
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full shrink-0 ${statusDot}`} />
            <h3 className="font-heading font-semibold text-white group-hover:text-cyan transition-colors truncate">
              {agent.name}
            </h3>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-mono font-semibold border shrink-0 ${
                agentStatusColors[agent.status]
              }`}
            >
              {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
            </span>
          </div>

          {/* Role */}
          <p className="text-indigo text-xs font-mono mb-1.5">
            {agentRoleLabels[agent.role]}
          </p>

          {/* Description */}
          <p className="text-zinc-500 text-sm line-clamp-2 mb-3">
            {agent.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-xs">
            <span className="text-zinc-500">
              <span className="text-cyan font-mono font-semibold">{agent.activeJobs}</span> active
            </span>
            <span className="text-zinc-500">
              <span className="text-teal font-mono font-semibold">{agent.completedJobs}</span> done
            </span>
            {agent.failedJobs > 0 && (
              <span className="text-zinc-500">
                <span className="text-red-400 font-mono font-semibold">{agent.failedJobs}</span> failed
              </span>
            )}
            <span className="text-zinc-600 ml-auto">{agent.lastActive}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
        <button
          onClick={onView}
          className="flex-1 py-2 text-sm text-zinc-300 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-all font-medium"
        >
          View Details
        </button>
        {agent.status !== "error" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all ${
              agent.status === "paused"
                ? "bg-teal/10 border border-teal/30 text-teal hover:bg-teal/20"
                : "bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/20"
            }`}
          >
            {agent.status === "paused" ? "Resume" : "Pause"}
          </button>
        )}
        {agent.status === "error" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="flex-1 py-2 text-sm rounded-lg font-medium bg-red-400/10 border border-red-400/30 text-red-400 hover:bg-red-400/20 transition-all"
          >
            Diagnose
          </button>
        )}
      </div>
    </div>
  );
}
