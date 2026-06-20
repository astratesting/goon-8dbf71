"use client";

import { useState } from "react";

interface NewProjectModalProps {
  onClose: () => void;
  onSubmit: (project: { name: string; description: string; material: string; pieces: number }) => void;
}

export default function NewProjectModal({ onClose, onSubmit }: NewProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("Standard Resin");
  const [pieces, setPieces] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;
    onSubmit({ name, description, material, pieces });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg border-glow rounded-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="font-heading font-bold text-xl text-white mb-6">New Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="proj-name" className="block text-sm font-medium text-zinc-300 mb-1.5">
              Project Name
            </label>
            <input
              id="proj-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dragon Knight Miniature"
              className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all text-sm"
            />
          </div>

          <div>
            <label htmlFor="proj-desc" className="block text-sm font-medium text-zinc-300 mb-1.5">
              Description
            </label>
            <textarea
              id="proj-desc"
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you want — size, pose, details, reference images..."
              className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="proj-material" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Material
              </label>
              <select
                id="proj-material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all text-sm"
              >
                <option value="Standard Resin">Standard Resin</option>
                <option value="ABS-like Resin">ABS-like Resin</option>
                <option value="Flexible Resin">Flexible Resin</option>
                <option value="PLA (FDM)">PLA (FDM)</option>
                <option value="PETG (FDM)">PETG (FDM)</option>
              </select>
            </div>

            <div>
              <label htmlFor="proj-pieces" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Pieces
              </label>
              <input
                id="proj-pieces"
                type="number"
                min={1}
                max={100}
                value={pieces}
                onChange={(e) => setPieces(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all text-sm"
              />
            </div>
          </div>

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
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
