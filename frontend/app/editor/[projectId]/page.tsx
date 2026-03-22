import { EditorPageClient } from '@/components/editor/editor-page-client';

const demoPages = [{ page_number:1, name:'Front', canvas_data:{ version:1, page:{ width_px:2480, height_px:3508, width_mm:210, height_mm:297, orientation:'portrait' as const, bleed_mm:3, safe_margin_mm:5 }, fold_guides:[{ id:'g1', axis:'x' as const, position_ratio:0.5, label:'Fold', print:false }], background:{ type:'solid' as const, color:'#ffffff' }, elements:[{ id:'el1', type:'text' as const, x:360, y:260, width:1200, height:140, rotation:0, style:{ fontSize:72, fill:'#0f172a' }, content:{ text:'Beautiful Folded Design' } }], meta:{ snap:true } } }];
export default function EditorPage() { return <EditorPageClient pages={demoPages} />; }
