"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AuthGate from "@/frontend/app/lib/auth-gate";

const ACCEPTED = [".stl", ".obj", ".3mf", ".step", ".stp"];

function UploadForm() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [material, setMaterial] = useState("pla");
  const [color, setColor] = useState("black");
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const ext = "." + f.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED.includes(ext)) {
      setError(`Unsupported file type. Accepted: ${ACCEPTED.join(", ")}`);
      return;
    }
    setError("");
    setFile(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Please select a 3D design file.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("notes", notes);
      formData.append("material", material);
      formData.append("color", color);
      formData.append("quantity", String(quantity));

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      router.push("/dashboard");
    } catch {
      setError("Upload failed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <h1 className="font-heading font-bold text-3xl text-white mb-2">
          Upload a 3D Design
        </h1>
        <p className="text-zinc-400 text-sm mb-8">
          Upload your file and choose print options. We&apos;ll review and send a quote.
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File drop zone */}
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f) {
                setFile(f);
                setError("");
              }
            }}
            className="border-2 border-dashed border-white/10 hover:border-indigo/50 rounded-xl p-8 text-center cursor-pointer transition-colors"
          >
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPTED.join(",")}
              onChange={onFileChange}
              className="hidden"
            />
            {file ? (
              <p className="text-white font-mono text-sm">{file.name}</p>
            ) : (
              <p className="text-zinc-500 text-sm">
                Drag &amp; drop a file or{" "}
                <span className="text-indigo">browse</span>
                <br />
                <span className="text-xs">STL, OBJ, 3MF, STEP</span>
              </p>
            )}
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Material
            </label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all text-sm"
            >
              <option value="pla">PLA — General purpose</option>
              <option value="abs">ABS — Durable, heat-resistant</option>
              <option value="resin">Resin — High detail</option>
              <option value="petg">PETG — Chemical resistant</option>
              <option value="tpu">TPU — Flexible</option>
            </select>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Color
            </label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all text-sm"
            >
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="gray">Gray</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="custom">Custom (specify in notes)</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all text-sm"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Notes (optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Scale, orientation, finish, special instructions..."
              className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gradient-to-r from-indigo to-cyan text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Uploading..." : "Submit for Quote"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function UploadPage() {
  return (
    <AuthGate>
      <UploadForm />
    </AuthGate>
  );
}
