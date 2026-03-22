<!doctype html>
<html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;margin:0;background:#fff}.page{width:210mm;height:297mm;position:relative;page-break-after:always;border:1px solid #eee}.watermark{position:absolute;top:45%;left:15%;font-size:48px;color:rgba(15,23,42,.15);transform:rotate(-24deg)}</style></head>
<body>
@foreach($project->pages as $page)
<div class="page">@if($export->watermarked)<div class="watermark">PREVIEW</div>@endif<pre>{{ json_encode($page->canvas_data, JSON_PRETTY_PRINT) }}</pre></div>
@endforeach
</body></html>
