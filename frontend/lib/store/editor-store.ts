'use client';
import { create } from 'zustand';
import { EditorPage, EditorElement } from '@/lib/types/editor';
type State = { pages: EditorPage[]; activePage: number; zoom: number; selectedElementId?: string; history: EditorPage[][]; future: EditorPage[][]; setPages: (pages: EditorPage[]) => void; addText: () => void; updateElement: (id: string, patch: Partial<EditorElement>) => void; undo: () => void; redo: () => void; };
export const useEditorStore = create<State>((set,get)=>({
 pages: [], activePage: 0, zoom: 1, history: [], future: [],
 setPages: (pages)=>set((state)=>({ pages, history:[...state.history, state.pages], future:[] })),
 addText: ()=>set((state)=>{ const page = state.pages[state.activePage]; const element: EditorElement = { id: crypto.randomUUID(), type:'text', x:120, y:120, width:320, height:80, rotation:0, style:{ fontFamily:'Inter', fontSize:32, fontWeight:700, fill:'#0f172a' }, content:{ text:'New headline' } }; const pages=[...state.pages]; pages[state.activePage] = { ...page, canvas_data:{ ...page.canvas_data, elements:[...page.canvas_data.elements, element] } }; return { pages, history:[...state.history,state.pages], future:[] }; }),
 updateElement: (id,patch)=>set((state)=>{ const pages=state.pages.map((page,idx)=> idx!==state.activePage ? page : ({ ...page, canvas_data:{ ...page.canvas_data, elements:page.canvas_data.elements.map((el)=> el.id===id ? { ...el, ...patch } : el) } })); return { pages }; }),
 undo: ()=>set((state)=> state.history.length ? { pages: state.history[state.history.length-1], history: state.history.slice(0,-1), future:[state.pages,...state.future] } : state),
 redo: ()=>set((state)=> state.future.length ? { pages: state.future[0], future: state.future.slice(1), history:[...state.history,state.pages] } : state),
}));
