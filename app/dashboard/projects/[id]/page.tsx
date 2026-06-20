"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import DashboardNav from "@/components/DashboardNav";
import { mockProjects, statusColors, statusLabels } from "@/lib/mock-data";

const timelineSteps = [
  { key: "design", label: "Design", description: "Your project is being designed and refined" },
  { key: "review", label: "Review", description: "Design ready for your approval" },
  { key: "printing", label: "Printing", description: "Your pieces are being printed" },
  { key: "shipped", label: "Shipped", description: "On its way to you" },
  { key: "completed", label: "Completed", description: "Delivered and complete" },
];

export default function ProjectDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const project = mockProjects.find((p) => p.id === projectId);

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

  if (!project) {
    return (
      <div className="min-h-screen bg-ink">
        <DashboardNav user={session.user || {}} />
        <main className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="font-heading font-bold text-2xl text-white mb-4">Project not found</h1>
          <p className="text-zinc-400 mb-6">This project does not exist or you do not have access.</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-5 py-2.5 bg-indigo text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-medium"
          >
            Back to Dashboard
          </button>
        </main>
      </div>
    );
  }

  const currentStepIndex = timelineSteps.findIndex((s) => s.key === project.status);

  return (
    <div className="min-h-screen bg-ink">
      <DashboardNav user={session.user || {}} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                {project.name}
              </h1>
              <span
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                  statusColors[project.status]
                }`}
              >
                {statusLabels[project.status]}
              </span>
            </div>
            <p className="text-zinc-400 text-sm max-w-2xl">{project.description}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-heading font-bold text-3xl text-white">
              ${project.totalPrice.toFixed(2)}
            </p>
            <p className="text-xs text-zinc-500 font-mono">Total estimate</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="border-glow rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="font-heading font-semibold text-lg text-white mb-6">Project Timeline</h2>
          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/5" />
            <div
              className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-indigo to-cyan transition-all"
              style={{
                height: `${((currentStepIndex + 0.5) / timelineSteps.length) * 100}%`,
              }}
            />

            <div className="space-y-8">
              {timelineSteps.map((step, i) => {
                const isComplete = i < currentStepIndex;
                const isCurrent = i === currentStepIndex;
                const isFuture = i > currentStepIndex;

                return (
                  <div key={step.key} className="flex items-start gap-4 relative">
                    {/* Dot */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        isComplete
                          ? "bg-teal/20 border-2 border-teal"
                          : isCurrent
                          ? "bg-indigo/20 border-2 border-indigo animate-pulse"
                          : "bg-ink border-2 border-white/10"
                      }`}
                    >
                      {isComplete ? (
                        <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : isCurrent ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                      )}
                    </div>

                    <div className="pt-1">
                      <h3
                        className={`font-heading font-semibold text-sm ${
                          isFuture ? "text-zinc-500" : "text-white"
                        }`}
                      >
                        {step.label}
                      </h3>
                      <p className={`text-xs mt-0.5 ${isFuture ? "text-zinc-600" : "text-zinc-400"}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border-glow rounded-xl p-5">
            <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-3">
              Specifications
            </h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-zinc-400">Pieces</dt>
                <dd className="text-sm text-white font-mono">{project.pieces}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-zinc-400">Material</dt>
                <dd className="text-sm text-white">{project.material}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-zinc-400">Est. Ship Date</dt>
                <dd className="text-sm text-white font-mono">{project.estimatedShip}</dd>
              </div>
            </dl>
          </div>

          <div className="border-glow rounded-xl p-5">
            <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-3">
              Activity
            </h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-zinc-400">Created</dt>
                <dd className="text-sm text-white font-mono">{project.createdAt}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-zinc-400">Last Updated</dt>
                <dd className="text-sm text-white font-mono">{project.updatedAt}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-zinc-400">Project ID</dt>
                <dd className="text-sm text-zinc-500 font-mono">{project.id}</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
