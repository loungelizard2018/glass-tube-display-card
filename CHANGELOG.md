# Changelog

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
- Updated the root HACS bundle and the mirrored `dist` bundle.
