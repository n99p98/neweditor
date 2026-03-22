'use client';
import { create } from 'zustand';
import { EditorPage, EditorElement } from '@/lib/types/editor';

type State = {
  pages: EditorPage[];
  activePage: number;
  zoom: number;
  selectedElementId?: string;
  history: EditorPage[][];
  future: EditorPage[][];
  setPages: (pages: EditorPage[]) => void;
  setSelectedElement: (id?: string) => void;
  setZoom: (zoom: number) => void;
  addText: () => void;
  addImage: () => void;
  addShape: () => void;
  setBackgroundColor: (color: string) => void;
  updateElement: (id: string, patch: Partial<EditorElement>) => void;
  undo: () => void;
  redo: () => void;
};

const pushHistory = (state: State) => ({
  history: [...state.history, state.pages],
  future: [],
});

export const useEditorStore = create<State>((set, get) => ({
  pages: [],
  activePage: 0,
  zoom: 1,
  history: [],
  future: [],
  setPages: (pages) =>
    set((state) => ({
      pages,
      ...pushHistory(state),
      selectedElementId: pages[0]?.canvas_data.elements[0]?.id,
    })),
  setSelectedElement: (id) => set({ selectedElementId: id }),
  setZoom: (zoom) => set({ zoom }),
  addText: () =>
    set((state) => {
      const page = state.pages[state.activePage];
      const element: EditorElement = {
        id: crypto.randomUUID(),
        type: 'text',
        x: 160,
        y: 180,
        width: 460,
        height: 110,
        rotation: 0,
        style: { fontFamily: 'Inter', fontSize: 44, fontWeight: 700, fill: '#0f172a' },
        content: { text: 'New headline' },
      };
      const pages = [...state.pages];
      pages[state.activePage] = {
        ...page,
        canvas_data: { ...page.canvas_data, elements: [...page.canvas_data.elements, element] },
      };

      return { pages, ...pushHistory(state), selectedElementId: element.id };
    }),
  addImage: () =>
    set((state) => {
      const page = state.pages[state.activePage];
      const element: EditorElement = {
        id: crypto.randomUUID(),
        type: 'image',
        x: 220,
        y: 420,
        width: 700,
        height: 460,
        rotation: 0,
        style: { borderRadius: 28 },
        content: {
          src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
          alt: 'Memorial portrait placeholder',
        },
      };
      const pages = [...state.pages];
      pages[state.activePage] = {
        ...page,
        canvas_data: { ...page.canvas_data, elements: [...page.canvas_data.elements, element] },
      };

      return { pages, ...pushHistory(state), selectedElementId: element.id };
    }),
  addShape: () =>
    set((state) => {
      const page = state.pages[state.activePage];
      const element: EditorElement = {
        id: crypto.randomUUID(),
        type: 'shape',
        x: 1380,
        y: 240,
        width: 520,
        height: 280,
        rotation: 0,
        style: { fill: 'linear-gradient(135deg, #38bdf8, #8b5cf6)', borderRadius: 36, opacity: 1 },
        content: { label: 'Accent panel' },
      };
      const pages = [...state.pages];
      pages[state.activePage] = {
        ...page,
        canvas_data: { ...page.canvas_data, elements: [...page.canvas_data.elements, element] },
      };

      return { pages, ...pushHistory(state), selectedElementId: element.id };
    }),
  setBackgroundColor: (color) =>
    set((state) => {
      const page = state.pages[state.activePage];
      const pages = [...state.pages];
      pages[state.activePage] = {
        ...page,
        canvas_data: {
          ...page.canvas_data,
          background: { ...page.canvas_data.background, type: 'solid', color },
        },
      };

      return { pages, ...pushHistory(state) };
    }),
  updateElement: (id, patch) =>
    set((state) => {
      const pages = state.pages.map((page, idx) =>
        idx !== state.activePage
          ? page
          : {
              ...page,
              canvas_data: {
                ...page.canvas_data,
                elements: page.canvas_data.elements.map((el) => (el.id === id ? { ...el, ...patch } : el)),
              },
            },
      );

      return { pages, selectedElementId: id };
    }),
  undo: () =>
    set((state) =>
      state.history.length
        ? {
            pages: state.history[state.history.length - 1],
            history: state.history.slice(0, -1),
            future: [state.pages, ...state.future],
          }
        : state,
    ),
  redo: () =>
    set((state) =>
      state.future.length
        ? {
            pages: state.future[0],
            future: state.future.slice(1),
            history: [...state.history, state.pages],
          }
        : state,
    ),
}));
