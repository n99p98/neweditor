'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3 text-xl font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-sky-400 to-violet-400 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20">
            PF
          </span>
          <span>PrintFold Studio</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-300">
          <Link href="/templates" className="hover:text-white">
            Templates
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
          <Link href="/editor/demo" className="button-secondary !px-4 !py-2 text-sm">
            Launch editor
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
