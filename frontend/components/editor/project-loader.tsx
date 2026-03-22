'use client';
import { useEffect } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { EditorPage } from '@/lib/types/editor';
export function ProjectLoader({ pages }: { pages: EditorPage[] }) { const setPages = useEditorStore((s)=>s.setPages); useEffect(()=>{ setPages(pages); },[pages,setPages]); return null; }
