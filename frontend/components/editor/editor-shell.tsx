'use client';
import { PointerEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Download,
  Image as ImageIcon,
  Italic,
  Layers3,
  LayoutTemplate,
  Palette,
  Search,
  Shapes,
  Sparkles,
  Type,
  Underline,
  Undo2,
  Upload,
} from 'lucide-react';
import { useEditorStore } from '@/lib/store/editor-store';

export function EditorShell() {
  const [activeTool, setActiveTool] = useState<'templates' | 'text' | 'images' | 'background' | 'elements'>('text');
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const {
    pages,
    activePage,
    addText,
    addImage,
    addShape,
    setBackgroundColor,
    selectedElementId,
    setSelectedElement,
    undo,
    redo,
    zoom,
    setZoom,
    updateElement,
    updateElementStyle,
    updateElementContent,
  } = useEditorStore();
  const page = pages[activePage];
  const selectedElement = page?.canvas_data.elements.find((element) => element.id === selectedElementId);
  const textToolsVisible = selectedElement?.type === 'text';

  const toolGroups = useMemo(
    () => [
      { id: 'templates', label: 'Design', icon: LayoutTemplate },
      { id: 'text', label: 'Text', icon: Type },
      { id: 'images', label: 'Photos', icon: ImageIcon },
      { id: 'background', label: 'Background', icon: Palette },
      { id: 'elements', label: 'Elements', icon: Shapes },
    ] as const,
    [],
  );

  if (!page) {
    return <div className="panel flex h-[780px] items-center justify-center">Loading editor…</div>;
  }

  const canvasWidth = (page.canvas_data.page.width_px / 4) * zoom;
  const canvasHeight = (page.canvas_data.page.height_px / 4) * zoom;
  const background = page.canvas_data.background.color || '#ffffff';

  useEffect(() => {
    const handlePointerMove = (event: globalThis.PointerEvent) => {
      if (!dragState.current || !canvasRef.current) {
        return;
      }

      const rect = canvasRef.current.getBoundingClientRect();
      const nextX = Math.max(0, Math.min((event.clientX - rect.left - dragState.current.offsetX) / zoom, page.canvas_data.page.width_px / 4));
      const nextY = Math.max(0, Math.min((event.clientY - rect.top - dragState.current.offsetY) / zoom, page.canvas_data.page.height_px / 4));

      updateElement(dragState.current.id, {
        x: nextX * 4,
        y: nextY * 4,
      });
    };

    const handlePointerUp = () => {
      dragState.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [page.canvas_data.page.height_px, page.canvas_data.page.width_px, updateElement, zoom]);

  const beginDrag = (event: PointerEvent<HTMLDivElement>, id: string) => {
    event.stopPropagation();
    const target = event.currentTarget.getBoundingClientRect();
    dragState.current = {
      id,
      offsetX: event.clientX - target.left,
      offsetY: event.clientY - target.top,
    };
    setSelectedElement(id);
  };

  const alignText = (align: 'left' | 'center' | 'right') => {
    if (!selectedElementId) return;

    updateElementStyle(selectedElementId, { textAlign: align });
  };

  return (
    <div className={`grid h-screen ${selectedElementId ? 'grid-cols-[88px_320px_minmax(0,1fr)_340px]' : 'grid-cols-[88px_320px_minmax(0,1fr)]'} bg-[#020617]`}>
      <aside className="flex flex-col items-center justify-between border-r border-white/10 bg-slate-950/90 px-3 py-5">
        <div className="flex w-full flex-col items-center gap-3">
          {toolGroups.map((tool) => {
            const Icon = tool.icon;

            return (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool.id);
                  if (tool.id === 'text') addText();
                }}
                className={`flex w-full flex-col items-center gap-2 rounded-[22px] px-3 py-3 text-xs font-medium transition ${
                  activeTool === tool.id ? 'bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/25' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-lg font-semibold text-white">
          N
        </div>
      </aside>

      <aside className="border-r border-white/10 bg-[#040b20] p-5">
        <div className="panel h-full p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[.24em] text-cyan-200">Workspace</div>
              <h2 className="mt-2 text-2xl font-semibold">Design controls</h2>
            </div>
            <button className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-300">
              <Search className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {activeTool === 'templates' && (
              <>
                <div className="rounded-[24px] bg-white/5 p-4">
                  <div className="text-sm font-semibold text-white">Template presets</div>
                  <div className="mt-4 grid gap-3">
                    {['Memorial Bi-Fold', 'Luxury Tri-Fold', 'Photo Invitation'].map((item) => (
                      <button key={item} className="rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-left hover:border-cyan-300/30">
                        <div className="text-sm font-semibold">{item}</div>
                        <div className="mt-1 text-xs text-slate-400">Premium ready-made layout</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-[24px] border border-dashed border-white/10 p-4 text-sm text-slate-400">
                  Switch between editable presets with fold guides, photo zones, and print-safe areas.
                </div>
              </>
            )}

            {activeTool === 'text' && (
              <>
                <div className="rounded-[24px] bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">Text styles</div>
                      <div className="text-xs text-slate-400">Add premium typography blocks</div>
                    </div>
                    <button onClick={addText} className="button-primary !px-4 !py-2 text-sm">
                      Add text
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {['Hero heading', 'Sub-heading', 'Quote block'].map((item, index) => (
                      <button key={item} onClick={addText} className="w-full rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-left hover:border-cyan-300/30">
                        <div className={`font-semibold text-white ${index === 0 ? 'text-2xl' : index === 1 ? 'text-lg' : 'text-base italic'}`}>{item}</div>
                        <div className="mt-1 text-xs text-slate-400">Tap to insert styled copy block</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTool === 'images' && (
              <>
                <div className="rounded-[24px] bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white">Photos & uploads</div>
                    <button onClick={addImage} className="button-primary !px-4 !py-2 text-sm">
                      Add photo
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {['bg-gradient-to-br from-amber-100 via-rose-100 to-violet-100', 'bg-gradient-to-br from-cyan-100 via-sky-100 to-blue-200', 'bg-gradient-to-br from-slate-200 to-slate-400', 'bg-gradient-to-br from-violet-200 to-fuchsia-300'].map((style, index) => (
                      <button key={style} onClick={addImage} className={`h-28 rounded-[20px] border border-white/10 ${style} ${index === 0 ? 'text-slate-900' : 'text-slate-800'} p-3 text-left shadow-inner`}>
                        <div className="text-xs font-semibold uppercase tracking-[.2em]">Photo</div>
                        <div className="mt-8 text-sm">Portrait frame</div>
                      </button>
                    ))}
                  </div>
                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 px-4 py-3 text-sm text-slate-300 hover:border-cyan-300/30 hover:text-white">
                    <Upload className="h-4 w-4" />
                    Upload your own image
                  </button>
                </div>
              </>
            )}

            {activeTool === 'background' && (
              <div className="rounded-[24px] bg-white/5 p-4">
                <div className="text-sm font-semibold text-white">Backgrounds</div>
                <div className="mt-1 text-xs text-slate-400">Switch the canvas mood instantly</div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {['#ffffff', '#f8fafc', '#fef3c7', '#e0f2fe', '#ede9fe', '#111827'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setBackgroundColor(color)}
                      className="h-14 rounded-2xl border border-white/10 shadow-inner"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300">
                  Use a light background for funeral programs and a darker dramatic base for marketing brochures.
                </div>
              </div>
            )}

            {activeTool === 'elements' && (
              <div className="rounded-[24px] bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">Shapes & accents</div>
                  <button onClick={addShape} className="button-primary !px-4 !py-2 text-sm">
                    Add shape
                  </button>
                </div>
                <div className="mt-4 grid gap-3">
                  {['Ribbon banner', 'Gradient panel', 'Icon badge'].map((item) => (
                    <button key={item} onClick={addShape} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-left hover:border-cyan-300/30">
                      <div className="text-sm font-semibold text-white">{item}</div>
                      <div className="mt-1 text-xs text-slate-400">Decorative layout accent</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="flex flex-col">
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/60 px-6">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-xs uppercase tracking-[.24em] text-cyan-200">Editor toolbar</div>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={undo} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 hover:text-white">
                  <Undo2 className="h-4 w-4" />
                </button>
                <button onClick={redo} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 hover:text-white">
                  <Undo2 className="h-4 w-4 rotate-180" />
                </button>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">Inter</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">Bold</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">Effects</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">Autosave enabled</div>
            <button className="button-secondary !px-4 !py-3 text-sm">
              Share
            </button>
            <button className="button-primary !px-4 !py-3 text-sm">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </button>
          </div>
        </header>

        {textToolsVisible && (
          <div className="flex items-center justify-between border-b border-white/10 bg-[#08132d] px-6 py-3">
            <div className="flex items-center gap-2">
              <select
                value={String(selectedElement.style?.fontFamily || 'Inter')}
                onChange={(event) => updateElementStyle(selectedElement.id, { fontFamily: event.target.value })}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 outline-none"
              >
                <option>Inter</option>
                <option>Playfair Display</option>
                <option>Montserrat</option>
                <option>Lora</option>
              </select>
              <select
                value={String(selectedElement.style?.fontSize || 44)}
                onChange={(event) => updateElementStyle(selectedElement.id, { fontSize: Number(event.target.value) })}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 outline-none"
              >
                {[24, 32, 44, 56, 72].map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
              <button
                onClick={() => updateElementStyle(selectedElement.id, { fontWeight: selectedElement.style?.fontWeight === 700 ? 500 : 700 })}
                className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                onClick={() => updateElementStyle(selectedElement.id, { fontStyle: selectedElement.style?.fontStyle === 'italic' ? 'normal' : 'italic' })}
                className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200"
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                onClick={() =>
                  updateElementStyle(selectedElement.id, {
                    textDecoration: selectedElement.style?.textDecoration === 'underline' ? 'none' : 'underline',
                  })
                }
                className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200"
              >
                <Underline className="h-4 w-4" />
              </button>
              <button onClick={() => alignText('left')} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <AlignLeft className="h-4 w-4" />
              </button>
              <button onClick={() => alignText('center')} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <AlignCenter className="h-4 w-4" />
              </button>
              <button onClick={() => alignText('right')} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <AlignRight className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-400">
              Text toolbox • click outside to close
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-white/10 bg-[#041029] px-6 py-4">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-200">Front panel</span>
            <span>A4 portrait</span>
            <span>•</span>
            <span>Bi-fold fold guides</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            {[0.5, 0.75, 1, 1.25].map((value) => (
              <button
                key={value}
                onClick={() => setZoom(value)}
                className={`rounded-xl px-3 py-1 text-xs ${zoom === value ? 'bg-cyan-300 text-slate-950' : 'text-slate-300 hover:bg-white/5'}`}
              >
                {Math.round(value * 100)}%
              </button>
            ))}
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        <div
          className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.09),transparent_20%),linear-gradient(180deg,#020617_0%,#020817_100%)] p-8"
          onPointerDown={() => setSelectedElement(undefined)}
        >
          <div className="mx-auto flex w-fit rounded-[40px] border border-white/10 bg-slate-200 p-8 shadow-2xl">
            <div
              ref={canvasRef}
              className="relative overflow-hidden rounded-[32px] border border-slate-300 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.22)]"
              style={{
                width: canvasWidth,
                height: canvasHeight,
                background,
              }}
            >
              <div className="absolute inset-6 rounded-[24px] border border-dashed border-slate-200/80" />
              <div className="absolute left-8 top-8 rounded-full bg-slate-900 px-3 py-1 text-[11px] uppercase tracking-[.24em] text-white">
                Safe area
              </div>
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
                <div
                  key={el.id}
                  onPointerDown={(event) => beginDrag(event, el.id)}
                  className={`absolute cursor-move overflow-hidden text-left transition ${selectedElementId === el.id ? 'ring-2 ring-cyan-300 ring-offset-2 ring-offset-white' : ''}`}
                  style={{
                    left: (el.x / 4) * zoom,
                    top: (el.y / 4) * zoom,
                    width: (el.width / 4) * zoom,
                    height: (el.height / 4) * zoom,
                    borderRadius: Number(el.style?.borderRadius || 0) / 4,
                    opacity: Number(el.style?.opacity || 1),
                  }}
                >
                  {el.type === 'text' && (
                    <div className="h-full rounded-[inherit] bg-transparent p-1">
                      <textarea
                        value={String(el.content?.text || '')}
                        onChange={(event) => updateElementContent(el.id, { text: event.target.value })}
                        onPointerDown={(event) => {
                          event.stopPropagation();
                          setSelectedElement(el.id);
                        }}
                        className="h-full w-full resize-none bg-transparent font-semibold outline-none"
                        style={{
                          color: String(el.style?.fill || '#111827'),
                          fontSize: (Number(el.style?.fontSize || 24) / 4) * zoom,
                          fontFamily: String(el.style?.fontFamily || 'Inter'),
                          fontStyle: String(el.style?.fontStyle || 'normal') as 'normal' | 'italic',
                          fontWeight: Number(el.style?.fontWeight || 700),
                          textDecoration: String(el.style?.textDecoration || 'none') as 'none' | 'underline',
                          textAlign: String(el.style?.textAlign || 'left') as 'left' | 'center' | 'right',
                        }}
                      />
                    </div>
                  )}
                  {el.type === 'image' && (
                    <div className="h-full w-full rounded-[inherit] bg-gradient-to-br from-slate-200 via-white to-slate-300 p-3">
                      <div className="flex h-full w-full items-end rounded-[inherit] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_40%),linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.18))] p-4 text-sm font-semibold text-slate-800">
                        Portrait image
                      </div>
                    </div>
                  )}
                  {el.type === 'shape' && (
                    <div
                      className="h-full w-full rounded-[inherit]"
                      style={{
                        background: String(el.style?.fill || '#38bdf8'),
                      }}
                    />
                  )}
                </div>,
              )}
            </div>
          </div>
        </div>
      </main>

      {selectedElementId && (
      <aside className="border-l border-white/10 bg-[#040b20] p-5">
        <div className="panel h-full p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-slate-400">Selected layer</div>
              <div className="text-lg font-semibold text-white">{selectedElement?.type || 'Canvas'}</div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-[24px] bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Layers3 className="h-4 w-4 text-cyan-200" />
                Properties
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                  <span>Position</span>
                  <span>{selectedElement ? `${selectedElement.x}, ${selectedElement.y}` : '—'}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                  <span>Size</span>
                  <span>{selectedElement ? `${selectedElement.width} × ${selectedElement.height}` : `${page.canvas_data.page.width_px} × ${page.canvas_data.page.height_px}`}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                  <span>Layer status</span>
                  <span>{selectedElement ? 'Editable' : 'Canvas locked'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] bg-white/5 p-4">
              <div className="text-sm font-semibold text-white">Typography</div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="rounded-2xl bg-slate-900/70 px-4 py-3 text-left text-sm">Font family<br /><span className="text-slate-400">{String(selectedElement?.style?.fontFamily || 'Inter')}</span></button>
                <button className="rounded-2xl bg-slate-900/70 px-4 py-3 text-left text-sm">Size<br /><span className="text-slate-400">{String(selectedElement?.style?.fontSize || 44)} px</span></button>
                <button className="rounded-2xl bg-slate-900/70 px-4 py-3 text-left text-sm">Color<br /><span className="text-slate-400">{String(selectedElement?.style?.fill || '#0f172a')}</span></button>
                <button className="rounded-2xl bg-slate-900/70 px-4 py-3 text-left text-sm">Alignment<br /><span className="text-slate-400">{String(selectedElement?.style?.textAlign || 'left')}</span></button>
              </div>
            </div>

            <div className="rounded-[24px] bg-white/5 p-4">
              <div className="text-sm font-semibold text-white">Export</div>
              <div className="mt-4 rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-300">
                Free preview PDF includes watermark. HD export unlocks print-ready output.
              </div>
              <button className="button-primary mt-4 w-full">
                <Download className="mr-2 h-4 w-4" />
                Download HD PDF
              </button>
            </div>
          </div>
        </div>
      </aside>
      )}
    </div>
  );
}
