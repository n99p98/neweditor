'use client';
import { useEditorStore } from '@/lib/store/editor-store';

export function EditorShell() {
  const { pages, activePage, addText } = useEditorStore();
  const page = pages[activePage];

  if (!page) {
    return <div className="panel flex h-[780px] items-center justify-center">Loading editor…</div>;
  }

  return (
    <div className="grid h-screen grid-cols-[88px_260px_minmax(0,1fr)_320px] bg-[#020617]">
      <aside className="border-r border-white/10 p-4">
        <button onClick={addText} className="button-primary w-full !rounded-2xl !px-3 !py-2 text-sm">
          Text
        </button>
      </aside>
      <aside className="border-r border-white/10 p-4">
        <div className="panel p-4">Pages<br />Uploads<br />Background</div>
      </aside>
      <main className="flex flex-col">
        <header className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <div>Editor toolbar</div>
          <div className="text-sm text-slate-400">Autosave enabled</div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <div className="mx-auto flex w-fit rounded-[32px] bg-slate-200 p-6 shadow-2xl">
            <div
              className="relative overflow-hidden rounded-[24px] border border-slate-300 bg-white"
              style={{
                width: page.canvas_data.page.width_px / 4,
                height: page.canvas_data.page.height_px / 4,
                background: page.canvas_data.background.color || '#fff',
              }}
            >
              {page.canvas_data.fold_guides.map((guide) =>
                guide.axis === 'x' ? (
                  <div
                    key={guide.id}
                    className="absolute top-0 h-full border-l-2 border-dashed border-cyan-400/90"
                    style={{ left: `${(guide.position_ratio || 0) * 100}%` }}
                  />
                ) : null,
              )}
              {page.canvas_data.elements.map((el) =>
                el.type === 'text' ? (
                  <div
                    key={el.id}
                    className="absolute whitespace-pre-wrap font-semibold"
                    style={{
                      left: el.x / 4,
                      top: el.y / 4,
                      width: el.width / 4,
                      color: String(el.style?.fill || '#111827'),
                      fontSize: Number(el.style?.fontSize || 24) / 4,
                    }}
                  >
                    {String(el.content?.text || '')}
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </main>
      <aside className="border-l border-white/10 p-4">
        <div className="panel p-4">Properties<br />Typography<br />Export</div>
      </aside>
    </div>
  );
}
