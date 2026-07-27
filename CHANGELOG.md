# Changelog

## 0.3.8

- Replaced the slash-like comma with a larger open-wire cathode containing a rounded upper head and short descending tail.
- Kept the comma as one continuous, unfilled cathode path without a detached dot or closed loop.
- Gave comma tubes a dedicated 66% width so the punctuation is legible without approaching full digit width.
- Added hot-wire, bright-core, incandescent bead and pinpoint spark layers matching the material treatment of the main digits.
- Increased only the comma glow and retained the independently restrained degree-sign glow from v0.3.7.
- Added regression checks for the new comma geometry, dedicated tube width and incandescent layers.
- Kept the panel, existing Lovelace API and automatic HACS resource management unchanged.

## 0.3.7

- Removed the remaining visible CSS panel surface so the embedded Gauge-family WebP is now the only enclosure layer.
- Kept only layout, clipping and one subtle external drop shadow on `.device.panel`.
- Rebuilt the comma with dedicated far-glow and mid-glow filters instead of sharing the generic punctuation bloom.
- Increased comma visibility while retaining an open wire shape and a small footprint in the lower third of the separator tube.
- Rebuilt the degree symbol with independent far, aura, hot-wire and core layers.
- Reduced the degree-sign radius, stroke widths, blur and opacity so it no longer overpowers the digits.
- Added regression checks for a transparent panel wrapper, dedicated comma filters and dedicated low-intensity degree rendering.
- Added a complete Lovelace showcase YAML covering live values, all punctuation, digits, symbols and the alphabet.
- Kept the existing Lovelace API and standard single HACS resource compatible.

## 0.3.6

- Replaced the browser-generated SVG turbulence panel that caused coloured noise with a deterministic monochrome WebP panel.
- Derived the panel material and optional screw artwork directly from the published Analog Gauge `base.webp` during the release build.
- Embedded the generated panel and screw assets into the single HACS JavaScript resource, so no extra Lovelace resource is required.
- Kept the panel rectangular and free from the Analog Gauge dial, scale, needle, gears and circular housing.
- Replaced the comma curve with a shorter one-direction wire cathode that cannot form a question-mark hook.
- Reduced comma glow from 0.23/0.62 to 0.12/0.38 and reduced the hot/core stroke widths.
- Retained the existing separator tube, responsive layout, YAML API and automatic HACS resource management.

## 0.3.5

- Rebuilt the rectangular instrument enclosure as a dedicated self-contained SVG surface instead of approximating it with flat CSS layers.
- Matched the Analog Gauge product family with a pebbled black face, raised outer shell, thin upper metal highlight, recessed inner bezel, deep lower edge and matching light direction.
- Kept the panel completely rectangular and free of all circular dial, scale, needle, gear and gauge-housing structures.
- Reworked the four Phillips screws as smaller recessed black screw heads without grey plus-sign faces or oversized circular holders.
- Replaced the filled comma glyph with one open wire cathode curve rendered through five stroke-only layers: shadow, far glow, aura, hot wire and bright core.
- Limited comma bloom to 0.23 / 0.62 opacity so the punctuation remains small and legible.
- Retained a full-height separator tube at 60% of normal tube width with matching glass, mica, mesh, base and pins.
- Added automated bundle verification for versioning, HACS packaging, runtime imports, panel isolation, comma geometry and configuration compatibility.
- Kept the existing Lovelace configuration API compatible.

## 0.3.4

- Removed every use of cropped Analog Gauge image regions from the panel and screw rendering.
- Replaced the oversized circular image fragments with isolated inline SVG Phillips screws containing only the screw head.
- Kept the complete black panel surface visible without opaque corner discs or image spill.
- Replaced the question-mark-shaped comma stroke with a compact filled typographic comma cathode.
- Reduced comma bloom so the punctuation remains legible inside the miniature tube.
- Retained automatic HACS management of the single `/hacsfiles/...` resource.
- Kept the existing Lovelace configuration API compatible.

## 0.3.3

- Removed the opaque inner panel layer that visually covered the enclosure background.
- Replaced the Analog Gauge border-image approach with a clean uniform enclosure and tightly cropped original Analog Gauge screw heads only.
- Added extra top clearance so the title is never covered by the screw layer.
- Reduced punctuation-tube width and glow intensity.
- Replaced the comma with a smaller continuous curved cathode without a loop or detached dot.
- Switched `hacs.json` to the standard dashboard-resource manifest used by the Analog Gauge Card so HACS manages the `/hacsfiles/...` resource automatically.
- Kept the existing Lovelace configuration API compatible.

## 0.3.2

- Removed the thick Analog Gauge `base.webp` nine-slice that exposed parts of the circular dial housing.
- Limited the reused Analog Gauge image to a thin outer edge strip with no centre fill.
- Reused cropped regions of the original Analog Gauge asset for the four screws instead of drawing substitute CSS screws.
- Increased punctuation-tube width and retained full-height glass, mesh, mica and base construction.
- Replaced the comma's disconnected dot and tail with one continuous curved glowing cathode.
- Kept the existing Lovelace configuration API compatible.

## 0.3.1

- Added a dedicated cathode clipping window so illuminated glyphs and all glow layers remain inside the tube cage.
- Reduced and centred wide round glyphs such as `0`, `6`, `8`, `9`, `O`, `Q` and `G`.
- Rebuilt punctuation tubes at roughly two-thirds of the main tube width with matching glass, mesh, mica and bases.
- Added an Analog Gauge `base.webp` nine-slice panel frame when `mounting: panel` and `screws: true` are enabled.

## 0.3.0

- Rebuilt the tubes around a larger 100 × 286 high-gloss glass envelope.
- Added stronger cylindrical refraction, multi-band specular highlights and subtle glass texture.
- Added brighter multi-stage cathode bloom with hot cores, incandescent micro-beads and pinpoint sparks.
- Increased the depth and visibility of mica plates, support wires, internal leads and honeycomb anode mesh.
- Reworked the black Bakelite-style bases with polished rims, bevels and reflected orange light.
- Rebuilt miniature punctuation tubes to use the same glass, mesh, base and glow language as the main tubes.
- Increased the default tube scale and card height while retaining responsive no-overflow behaviour.
- Kept the existing Lovelace configuration API compatible.

## 0.2.0

- Rebuilt the main and punctuation tubes with taller cylindrical glass envelopes.
- Added realistic shoulders, exhaust tips, black Bakelite-style bases and visible pins.
- Added internal mica plates, support wires, cathode stacks and honeycomb anode mesh.
- Added layered orange cathode glow with a fine incandescent bead texture.
- Reworked the black instrument panel, metallic title, rail and cross-head screws.
- Refined the digit paths while preserving digits, uppercase letters and existing symbols.
- Kept the existing Lovelace configuration API and responsive scaling behaviour.
