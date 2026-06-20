import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(79,107,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,107,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo/30 bg-indigo/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          <span className="text-sm font-mono text-teal">Custom 3D Printing for Makers</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight mb-6">
          <span className="text-white">Describe it.</span>
          <br />
          <span className="text-gradient">Sketch it. Print it.</span>
        </h1>

        {/* Value prop */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Goon turns your ideas into real, physical objects. From tabletop miniatures
          to cosplay props — no minimum orders, no hassle. Just upload your concept
          and we handle the rest.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/auth/signin?demo=1"
            className="px-8 py-3.5 bg-gradient-to-r from-indigo to-cyan text-white font-semibold rounded-xl hover:opacity-90 transition-opacity glow-indigo text-lg"
          >
            View Live Demo
          </Link>
          <a
            href="#features"
            className="px-8 py-3.5 border border-white/10 text-zinc-300 font-semibold rounded-xl hover:border-white/20 hover:text-white transition-all text-lg"
          >
            See How It Works
          </a>
        </div>

        {/* Trust bar - honest, no fake metrics */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-teal" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            <span>No minimum orders</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-teal" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            <span>Guided co-creation</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-teal" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            <span>Fast local fulfillment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
