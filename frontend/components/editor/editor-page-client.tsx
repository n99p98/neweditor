'use client';

import dynamic from 'next/dynamic';
import { ProjectLoader } from '@/components/editor/project-loader';
import { EditorPage } from '@/lib/types/editor';

const EditorShell = dynamic(() => import('@/components/editor/editor-shell').then((mod) => mod.EditorShell), {
  ssr: false,
});

export function EditorPageClient({
  pages,
}: {
  pages: EditorPage[];
}) {
  return (
    <>
      <ProjectLoader pages={pages} />
      <EditorShell />
    </>
  );
}
