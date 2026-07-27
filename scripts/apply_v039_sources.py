from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    file_path = Path(path)
    source = file_path.read_text(encoding="utf-8")
    if old not in source:
        raise SystemExit(f"Expected source fragment not found in {path}: {old[:120]!r}")
    file_path.write_text(source.replace(old, new, 1), encoding="utf-8")


replace_once(
    "card-core.js",
    'const VERSION = "0.3.8";',
    'const VERSION = "0.3.9";',
)

replace_once(
    "tube-renderer.js",
    'const d = "M35 179 C34.5 173.2 39.2 169.2 44.5 170.2 C49.1 171.2 50.4 176.8 48.2 180.9 C46.2 184.5 42.2 186.3 38.4 185.4 C38.1 190.8 35.8 196.3 31.8 201.2";',
    'const d = "M46 175 C49 179 48 184 44 187 C41 189 38 189 36 187 C37 193 34 198 30 202";',
)

replace_once(
    "tube-renderer.js",
    '// A small open cathode with a rounded head and a short descending tail.\n  // It remains one continuous wire: no filled blob, detached dot or closed loop.',
    '// A compact open comma cathode: one upper hook flowing directly into a short descending tail.\n  // It contains no loop, detached dot, filled blob or question-mark geometry.',
)

replace_once(
    "card-styles.js",
    '.device.panel{padding:clamp(48px,6vw,74px) clamp(30px,5vw,66px) clamp(36px,4.6vw,60px);border-radius:clamp(24px,3vw,38px);background:transparent;box-shadow:none;overflow:hidden;filter:brightness(${brightness}) drop-shadow(0 12px 18px rgba(0,0,0,.28))}',
    '.device.panel{padding:clamp(48px,6vw,74px) clamp(30px,5vw,66px) clamp(36px,4.6vw,60px);border-radius:clamp(24px,3vw,38px);background:transparent;box-shadow:none;overflow:hidden}',
)

replace_once(
    "card-styles.js",
    '.panel-backdrop{position:absolute;inset:0;z-index:0;width:100%;height:100%;display:block;object-fit:fill;pointer-events:none;filter:saturate(.97) contrast(1.03) brightness(.99)}',
    '.panel-backdrop{position:absolute;inset:0;z-index:0;width:100%;height:100%;display:block;object-fit:fill;pointer-events:none;transform:scale(1.10);transform-origin:50% 50%;filter:saturate(.97) contrast(1.03) brightness(.99)}',
)

replace_once(
    "card-styles.js",
    '.separator-comma-shadow{stroke:#170300;stroke-width:6.4;opacity:.94}\n    .separator-comma-far{stroke:#ff3d00;stroke-width:7.2;opacity:.16;mix-blend-mode:screen}\n    .separator-comma-aura{stroke:var(--tube);stroke-width:4.8;opacity:.58;mix-blend-mode:screen}\n    .separator-comma-hot{stroke:#ff6a16;stroke-width:3.1;filter:drop-shadow(0 0 1.25px #ff3600)}\n    .separator-comma-core{stroke:var(--core);stroke-width:1.25;opacity:1;filter:drop-shadow(0 0 .6px #fff2cf)}',
    '.separator-comma-shadow{stroke:#170300;stroke-width:6.1;opacity:.94}\n    .separator-comma-far{stroke:#ff3d00;stroke-width:7;opacity:.17;mix-blend-mode:screen}\n    .separator-comma-aura{stroke:var(--tube);stroke-width:4.6;opacity:.60;mix-blend-mode:screen}\n    .separator-comma-hot{stroke:#ff6a16;stroke-width:3;filter:drop-shadow(0 0 1.2px #ff3600)}\n    .separator-comma-core{stroke:var(--core);stroke-width:1.2;opacity:1;filter:drop-shadow(0 0 .6px #fff2cf)}',
)

print("Applied Glass Tube Display Card v0.3.9 single-panel and comma corrections.")
