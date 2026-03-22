import Link from 'next/link';

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[1.15fr,.85fr]">
      <div className="relative">
        <div className="absolute -left-12 top-6 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute left-40 top-32 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
        <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[.2em] text-cyan-200">
          Printable design SaaS
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight md:text-6xl">
          Create premium folded programs, brochures, flyers, and print-ready PDFs.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          A polished, Canva-inspired workspace for paper products with fold guides, template workflows,
          instant previews, and paid HD exports powered by Laravel.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/templates" className="button-primary">
            Browse templates
          </Link>
          <Link href="/editor/new" className="button-secondary">
            Start blank canvas
          </Link>
        </div>

        <div className="mt-10 grid gap-4 text-sm text-slate-300 md:grid-cols-3">
          <div className="panel p-4">
            <div className="text-xs uppercase tracking-[.2em] text-cyan-200">Templates</div>
            <div className="mt-2 text-lg font-semibold text-white">Funeral, brochure, flyer, invites</div>
          </div>
          <div className="panel p-4">
            <div className="text-xs uppercase tracking-[.2em] text-cyan-200">Editor</div>
            <div className="mt-2 text-lg font-semibold text-white">Fold guides, layers, text, images</div>
          </div>
          <div className="panel p-4">
            <div className="text-xs uppercase tracking-[.2em] text-cyan-200">Exports</div>
            <div className="mt-2 text-lg font-semibold text-white">Preview PDFs and paid HD print files</div>
          </div>
        </div>
      </div>

      <div className="panel min-h-[480px] overflow-hidden p-6">
        <div className="rounded-[26px] border border-white/10 bg-slate-950/80 p-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <div className="ml-3 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
              PrintFold Editor / Memorial Bi-fold
            </div>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[92px_minmax(0,1fr)]">
            <div className="rounded-[22px] border border-white/10 bg-white/5 p-3 text-xs text-slate-400">
              <div className="rounded-2xl bg-cyan-300 px-3 py-2 font-semibold text-slate-950">Text</div>
              <div className="mt-3 rounded-2xl bg-white/5 px-3 py-2">Photos</div>
              <div className="mt-3 rounded-2xl bg-white/5 px-3 py-2">Shapes</div>
              <div className="mt-3 rounded-2xl bg-white/5 px-3 py-2">Brand</div>
            </div>
            <div className="rounded-[24px] bg-[length:28px_28px] bg-hero-grid bg-center p-6">
              <div className="mx-auto max-w-[320px] rounded-[28px] bg-white p-4 shadow-glow">
                <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-5 text-slate-900">
                  <div className="mb-5 flex justify-between text-[11px] uppercase tracking-[.3em] text-slate-500">
                    <span>Tri-fold</span>
                    <span>Preview</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-[18px] bg-gradient-to-b from-slate-900 to-slate-700 p-3 text-white">
                      <div className="text-[10px] uppercase tracking-[.2em] text-cyan-200">Front</div>
                      <div className="mt-8 text-sm font-semibold leading-5">Celebration of Life</div>
                    </div>
                    <div className="rounded-[18px] border border-cyan-300 bg-cyan-50 p-3">
                      <div className="text-[10px] uppercase tracking-[.2em] text-cyan-700">Inside</div>
                      <div className="mt-8 text-sm font-semibold leading-5">Service Details</div>
                    </div>
                    <div className="rounded-[18px] bg-slate-900 p-3 text-white">
                      <div className="text-[10px] uppercase tracking-[.2em] text-violet-200">Back</div>
                      <div className="mt-8 text-sm font-semibold leading-5">Photo Collage</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 rounded-[18px] bg-slate-100 p-3 text-xs text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    Live preview, payment gating, queue exports
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
