# Editor Canvas JSON Format

```json
{
  "version": 1,
  "page": {
    "width_mm": 210,
    "height_mm": 297,
    "width_px": 2480,
    "height_px": 3508,
    "orientation": "portrait",
    "bleed_mm": 3,
    "safe_margin_mm": 5
  },
  "fold_guides": [
    {"id": "g1", "axis": "x", "position_mm": 99, "label": "panel 1", "print": false}
  ],
  "background": {
    "type": "solid",
    "color": "#F8FAFC",
    "image_upload_id": null,
    "gradient": null
  },
  "elements": [
    {
      "id": "el_1",
      "type": "text",
      "x": 120,
      "y": 140,
      "width": 460,
      "height": 80,
      "rotation": 0,
      "locked": false,
      "style": {
        "fontFamily": "Inter",
        "fontSize": 32,
        "fontWeight": 700,
        "italic": false,
        "underline": false,
        "fill": "#0F172A",
        "align": "center",
        "lineHeight": 1.2,
        "letterSpacing": 0
      },
      "content": {"text": "Folded brochure headline"}
    }
  ],
  "meta": {
    "snap": true,
    "show_rulers": true,
    "updated_at": "2026-03-22T00:00:00Z"
  },
  "export": {
    "dpi": 300,
    "color_profile": "CMYK-ready",
    "include_crop_marks": true
  }
}
```
