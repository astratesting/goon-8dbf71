import Link from "next/link";

const plans = [
  {
    name: "Single Print",
    description: "One-off custom pieces — minis, props, or prototypes.",
    price: "From $12",
    priceNote: "per piece",
    features: [
      "Resin or FDM printing",
      "Guided design refinement",
      "Standard post-processing",
      "Ships in 3-5 business days",
    ],
    cta: "Get Started",
    href: "/auth/signin",
    featured: false,
  },
  {
    name: "Batch Order",
    description: "Multiple copies or a full army — volume pricing kicks in.",
    price: "From $8",
    priceNote: "per piece (5+)",
    features: [
      "Everything in Single Print",
      "Volume discount at 5+ pieces",
      "Priority queue placement",
      "Consistent color matching",
      "Free design revisions",
    ],
    cta: "Get Started",
    href: "/auth/signin",
    featured: true,
  },
  {
    name: "Project",
    description: "Full cosplay builds, board game sets, or multi-part assemblies.",
    price: "Custom",
    priceNote: "quote",
    features: [
      "Everything in Batch Order",
      "Dedicated project manager",
      "Multi-material printing",
      "Assembly & finishing included",
      "Iterative prototyping",
    ],
    cta: "Contact Us",
    href: "/auth/signin",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-cyan mb-3 tracking-wider uppercase">
            Pricing
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
            Fair, transparent, no surprises
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Every quote includes a full breakdown: material cost, print time,
            finishing, and shipping. You see exactly what you pay for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 ${
                plan.featured
                  ? "border-2 border-indigo/50 bg-indigo/5 glow-indigo relative"
                  : "border-glow"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo text-white text-xs font-mono font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-heading font-semibold text-xl text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-zinc-400 text-sm mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="font-heading font-bold text-4xl text-white">
                  {plan.price}
                </span>
                <span className="text-zinc-500 text-sm ml-2">
                  {plan.priceNote}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-zinc-300">
                    <svg className="w-5 h-5 text-teal shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-opacity ${
                  plan.featured
                    ? "bg-gradient-to-r from-indigo to-cyan text-white hover:opacity-90"
                    : "border border-white/10 text-zinc-300 hover:border-white/20 hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
