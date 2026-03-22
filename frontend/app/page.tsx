import { Hero } from '@/components/marketing/hero';
import { SiteHeader } from '@/components/layout/site-header';
import { AuthModal } from '@/components/auth/auth-modal';

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_1fr_420px]">
        <div className="panel p-6">
          <h3 className="text-xl font-semibold">Fold-aware templates</h3>
          <p className="mt-3 text-slate-300">Bi-fold, tri-fold, half-fold, and custom guide systems.</p>
        </div>
        <div className="panel p-6">
          <h3 className="text-xl font-semibold">Commerce-ready exports</h3>
          <p className="mt-3 text-slate-300">Free watermarked previews and paid HD print PDFs.</p>
        </div>
        <AuthModal mode="register" />
      </section>
    </main>
  );
}
