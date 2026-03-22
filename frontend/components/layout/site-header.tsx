'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
export function SiteHeader() { return <motion.header initial={{y:-24,opacity:0}} animate={{y:0,opacity:1}} className="sticky top-0 z-40 mx-auto flex max-w-7xl items-center justify-between px-6 py-5"><Link href="/" className="text-xl font-semibold">PrintFold Studio</Link><nav className="flex items-center gap-6 text-sm text-slate-300"><Link href="/templates">Templates</Link><Link href="/pricing">Pricing</Link><Link href="/dashboard">Dashboard</Link></nav></motion.header>; }
