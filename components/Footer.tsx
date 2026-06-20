import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo to-cyan flex items-center justify-center">
              <span className="text-white font-bold font-mono text-xs">G</span>
            </div>
            <span className="font-heading font-bold text-lg text-white">Goon</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <Link href="/auth/signin" className="hover:text-white transition-colors">Sign In</Link>
          </div>

          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Goon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
