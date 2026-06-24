"use client";

import { useState } from "react";
import { agentRoleLabels, type Agent, type AgentConfig } from "@/lib/mock-data";

interface AgentConfigModalProps {
  agent: Agent;
  onClose: () => void;
  onSave: (config: AgentConfig) => void;
}

const ALL_MATERIALS = [
  "Standard Resin",
  "ABS-like Resin",
  "Flexible Resin",
  "PLA (FDM)",
  "PETG (FDM)",
];

export default function AgentConfigModal({ agent, onClose, onSave }: AgentConfigModalProps) {
  const [config, setConfig] = useState<AgentConfig>({ ...agent.config });
  const [materialInput, setMaterialInput] = useState("");

  const toggleMaterial = (mat: string) => {
    setConfig((prev) => ({
      ...prev,
      materialPreference: prev.materialPreference.includes(mat)
        ? prev.materialPreference.filter((m) => m !== mat)
        : [...prev.materialPreference, mat],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto border-glow rounded-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo to-cyan flex items-center justify-center">
            <span className="text-white font-heading font-bold">{agent.avatar}</span>
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-white">{agent.name}</h2>
            <p className="text-indigo text-xs font-mono">{agentRoleLabels[agent.role]}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Auto-approve */}
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-sm text-white font-medium">Auto-approve Designs</p>
              <p className="text-xs text-zinc-500">Skip manual review for valid designs</p>
            </div>
            <button
              type="button"
              onClick={() => setConfig((p) => ({ ...p, autoApproveDesigns: !p.autoApproveDesigns }))}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                config.autoApproveDesigns ? "bg-teal" : "bg-white/10"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  config.autoApproveDesigns ? "translate-x-5.5 left-0.5" : "left-0.5"
                }`}
                style={{ transform: config.autoApproveDesigns ? "translateX(22px)" : "translateX(0)" }}
              />
            </button>
          </div>

          {/* Max concurrent */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Max Concurrent Jobs
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={config.maxConcurrentJobs}
              onChange={(e) => setConfig((p) => ({ ...p, maxConcurrentJobs: parseInt(e.target.value) || 1 }))}
              className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all text-sm font-mono"
            />
          </div>

          {/* Quality threshold */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Quality Threshold ({config.qualityThreshold}%)
            </label>
            <input
              type="range"
              min={50}
              max={100}
              value={config.qualityThreshold}
              onChange={(e) => setConfig((p) => ({ ...p, qualityThreshold: parseInt(e.target.value) }))}
              className="w-full accent-indigo"
            />
            <div className="flex justify-between text-xs text-zinc-500 font-mono mt-1">
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Notify on completion */}
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-sm text-white font-medium">Notify on Completion</p>
              <p className="text-xs text-zinc-500">Send notification when jobs finish</p>
            </div>
            <button
              type="button"
              onClick={() => setConfig((p) => ({ ...p, notifyOnCompletion: !p.notifyOnCompletion }))}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                config.notifyOnCompletion ? "bg-teal" : "bg-white/10"
              }`}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                style={{ transform: config.notifyOnCompletion ? "translateX(22px)" : "translateX(0)" }}
              />
            </button>
          </div>

          {/* Retry on failure */}
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-sm text-white font-medium">Retry on Failure</p>
              <p className="text-xs text-zinc-500">Automatically retry failed jobs</p>
            </div>
            <button
              type="button"
              onClick={() => setConfig((p) => ({ ...p, retryOnFailure: !p.retryOnFailure }))}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                config.retryOnFailure ? "bg-teal" : "bg-white/10"
              }`}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                style={{ transform: config.retryOnFailure ? "translateX(22px)" : "translateX(0)" }}
              />
            </button>
          </div>

          {/* Max retries */}
          {config.retryOnFailure && (
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Max Retries
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={config.maxRetries}
                onChange={(e) => setConfig((p) => ({ ...p, maxRetries: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all text-sm font-mono"
              />
            </div>
          )}

          {/* Materials */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Material Preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_MATERIALS.map((mat) => (
                <button
                  key={mat}
                  type="button"
                  onClick={() => toggleMaterial(mat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                    config.materialPreference.includes(mat)
                      ? "bg-indigo/20 border-indigo/40 text-indigo"
                      : "bg-transparent border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
            <p className="text-xs text-zinc-600 mt-1.5">Leave empty to accept all materials</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-white/10 text-zinc-300 rounded-xl hover:border-white/20 hover:text-white transition-all text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-indigo to-cyan text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-semibold"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
