from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    file_path = Path(path)
    source = file_path.read_text(encoding="utf-8")
    if old not in source:
        raise SystemExit(f"Expected source fragment not found in {path}: {old[:100]!r}")
    file_path.write_text(source.replace(old, new, 1), encoding="utf-8")


replace_once(
    "card-core.js",
    'const VERSION = "0.3.7";',
    'const VERSION = "0.3.8";',
)

replace_once(
    "tube-renderer.js",
    '''function renderCommaCathode(id) {
  const d = "M41 174 C45.5 174 47.5 177 46.7 180.8 C45.9 184.4 42.6 186.8 39.4 188.1 C39.1 192.8 37.3 197.1 33.8 201.2";
  return `<g class="comma-cathode">
    <path d="${d}" class="separator-comma-shadow"/>
    <path d="${d}" class="separator-comma-far" filter="url(#sep-comma-far-${id})"/>
    <path d="${d}" class="separator-comma-aura" filter="url(#sep-comma-glow-${id})"/>
    <path d="${d}" class="separator-comma-hot"/>
    <path d="${d}" class="separator-comma-core"/>
  </g>`;
}''',
    '''function renderCommaCathode(id) {
  // A small open cathode with a rounded head and a short descending tail.
  // It remains one continuous wire: no filled blob, detached dot or closed loop.
  const d = "M35 179 C34.5 173.2 39.2 169.2 44.5 170.2 C49.1 171.2 50.4 176.8 48.2 180.9 C46.2 184.5 42.2 186.3 38.4 185.4 C38.1 190.8 35.8 196.3 31.8 201.2";
  return `<g class="comma-cathode">
    <path d="${d}" class="separator-comma-shadow"/>
    <path d="${d}" class="separator-comma-far" filter="url(#sep-comma-far-${id})"/>
    <path d="${d}" class="separator-comma-aura" filter="url(#sep-comma-glow-${id})"/>
    <path d="${d}" class="separator-comma-hot"/>
    <path d="${d}" class="separator-comma-core"/>
    <path d="${d}" class="separator-comma-beads"/>
    <path d="${d}" class="separator-comma-spark"/>
  </g>`;
}''',
)

replace_once(
    "tube-renderer.js",
    '<div class="separator-slot" aria-label="${escapeAttr(character)}">',
    '<div class="separator-slot${isComma ? " separator-slot-comma" : ""}" aria-label="${escapeAttr(character)}">',
)

replace_once(
    "tube-renderer.js",
    '<filter id="sep-comma-far-${id}" x="-220%" y="-220%" width="540%" height="540%"><feGaussianBlur stdDeviation="3.6"/></filter>',
    '<filter id="sep-comma-far-${id}" x="-220%" y="-220%" width="540%" height="540%"><feGaussianBlur stdDeviation="4.2"/></filter>',
)

replace_once(
    "tube-renderer.js",
    '<filter id="sep-comma-glow-${id}" x="-190%" y="-190%" width="480%" height="480%"><feGaussianBlur stdDeviation="1.8"/></filter>',
    '<filter id="sep-comma-glow-${id}" x="-190%" y="-190%" width="480%" height="480%"><feGaussianBlur stdDeviation="2.1"/></filter>',
)

replace_once(
    "card-styles.js",
    '.separator-slot{flex:.60 1 0;min-width:10px;max-width:76px;aspect-ratio:76/286;animation:${animation};filter:drop-shadow(0 8px 6px rgba(0,0,0,.68)) drop-shadow(0 0 4px rgba(255,78,0,.03))}',
    '.separator-slot{flex:.60 1 0;min-width:10px;max-width:76px;aspect-ratio:76/286;animation:${animation};filter:drop-shadow(0 8px 6px rgba(0,0,0,.68)) drop-shadow(0 0 4px rgba(255,78,0,.03))}\n    .separator-slot-comma{flex:.66 1 0;max-width:84px}',
)

replace_once(
    "card-styles.js",
    '.separator-comma-shadow,.separator-comma-far,.separator-comma-aura,.separator-comma-hot,.separator-comma-core{fill:none;stroke-linecap:round;stroke-linejoin:round}\n    .separator-comma-shadow{stroke:#170300;stroke-width:5.4;opacity:.92}\n    .separator-comma-far{stroke:#ff3d00;stroke-width:5.8;opacity:.18;mix-blend-mode:screen}\n    .separator-comma-aura{stroke:var(--tube);stroke-width:3.6;opacity:.52;mix-blend-mode:screen}\n    .separator-comma-hot{stroke:#ff6a16;stroke-width:2.25;filter:drop-shadow(0 0 1.2px #ff3600)}\n    .separator-comma-core{stroke:var(--core);stroke-width:.95;opacity:.98}',
    '.separator-comma-shadow,.separator-comma-far,.separator-comma-aura,.separator-comma-hot,.separator-comma-core,.separator-comma-beads,.separator-comma-spark{fill:none;stroke-linecap:round;stroke-linejoin:round}\n    .separator-comma-shadow{stroke:#170300;stroke-width:6.4;opacity:.94}\n    .separator-comma-far{stroke:#ff3d00;stroke-width:7.2;opacity:.16;mix-blend-mode:screen}\n    .separator-comma-aura{stroke:var(--tube);stroke-width:4.8;opacity:.58;mix-blend-mode:screen}\n    .separator-comma-hot{stroke:#ff6a16;stroke-width:3.1;filter:drop-shadow(0 0 1.25px #ff3600)}\n    .separator-comma-core{stroke:var(--core);stroke-width:1.25;opacity:1;filter:drop-shadow(0 0 .6px #fff2cf)}\n    .separator-comma-beads{stroke:#fff8e9;stroke-width:1.15;stroke-dasharray:.001 2.35;opacity:.72;mix-blend-mode:screen}\n    .separator-comma-spark{stroke:#fff;stroke-width:.52;stroke-dasharray:.001 5.1;opacity:.62;mix-blend-mode:screen}',
)

print("Applied Glass Tube Display Card v0.3.8 comma redesign.")
