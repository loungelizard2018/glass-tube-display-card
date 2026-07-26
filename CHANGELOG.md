# Changelog

## 0.3.1

- Added an explicit cathode clipping window so illuminated paths and their glow cannot extend beyond the usable tube area.
- Added character-specific scaling for wide round glyphs including `0`, `6`, `8`, `9`, `O`, `Q` and `G`.
- Rebuilt punctuation tubes at roughly two-thirds of the main-tube width instead of using needle-thin miniature envelopes.
- Enlarged comma, point, colon and degree cathodes and aligned them within the full-height punctuation tubes.
- Reused the installed Analog Gauge Card `base.webp` as a nine-slice outer frame when `mounting: panel` and `screws: true` are active.
- Retained the local CSS housing and screw implementation as a fallback when the Analog Gauge asset is unavailable.
- Kept the existing Lovelace configuration API compatible.

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
