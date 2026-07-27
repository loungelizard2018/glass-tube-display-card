from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    file_path = Path(path)
    source = file_path.read_text(encoding="utf-8")
    if old not in source:
        raise SystemExit(f"Expected source fragment not found in {path}: {old[:140]!r}")
    file_path.write_text(source.replace(old, new, 1), encoding="utf-8")


replace_once(
    "card-core.js",
    'const VERSION = "0.3.9";',
    'const VERSION = "0.3.10";',
)

replace_once(
    "tube-renderer.js",
    'import { PANEL_ASSET_URI, SCREW_ASSET_URI } from "./panel-asset.js";',
    'import { PANEL_ASSET_URI } from "./panel-asset.js";\nimport { SCREW_ASSET_URI } from "./exact-screw-asset.js";',
)

replace_once(
    "tube-renderer.js",
    '''export function renderScrews(enabled) {
  if (!enabled) return "";
  const rotations = { tl: -7, tr: 5, bl: 8, br: -4 };
  return ["tl", "tr", "bl", "br"].map((position) =>
    `<img class="screw screw-${position}" src="${SCREW_ASSET_URI}" alt="" aria-hidden="true" style="transform:rotate(${rotations[position]}deg)">`
  ).join("");
}''',
    '''export function renderScrews(enabled) {
  if (!enabled) return "";
  return ["tl", "tr", "bl", "br"].map((position) =>
    `<img class="screw screw-${position}" src="${SCREW_ASSET_URI}" alt="" aria-hidden="true">`
  ).join("");
}''',
)

replace_once(
    "card-styles.js",
    '.screw{position:absolute;z-index:20;width:clamp(31px,4vw,42px);height:auto;aspect-ratio:1;pointer-events:none;filter:saturate(.95) contrast(1.04) brightness(.99) drop-shadow(0 3px 4px rgba(0,0,0,.72))}',
    '.screw{position:absolute;z-index:20;width:clamp(58px,8.2vw,88px);height:auto;aspect-ratio:1;pointer-events:none;object-fit:contain;filter:none}',
)

replace_once(
    "card-styles.js",
    '.screw-tl{left:clamp(18px,2.2vw,27px);top:clamp(18px,2.2vw,27px)}\n    .screw-tr{right:clamp(18px,2.2vw,27px);top:clamp(18px,2.2vw,27px)}\n    .screw-bl{left:clamp(18px,2.2vw,27px);bottom:clamp(18px,2.2vw,27px)}\n    .screw-br{right:clamp(18px,2.2vw,27px);bottom:clamp(18px,2.2vw,27px)}',
    '.screw-tl{left:clamp(9px,1.25vw,15px);top:clamp(9px,1.25vw,15px)}\n    .screw-tr{right:clamp(9px,1.25vw,15px);top:clamp(9px,1.25vw,15px)}\n    .screw-bl{left:clamp(9px,1.25vw,15px);bottom:clamp(9px,1.25vw,15px)}\n    .screw-br{right:clamp(9px,1.25vw,15px);bottom:clamp(9px,1.25vw,15px)}',
)

replace_once(
    "card-styles.js",
    '@media(max-width:620px){.device.panel{padding:44px 21px 34px}.caption{margin-bottom:10px;letter-spacing:.13em}.tube-row{gap:clamp(1px,.34vw,4px)}.screw{width:27px}.base-board{height:29px;margin-top:-12px}.tube-slot{max-width:114px}.separator-slot{max-width:68px}}',
    '@media(max-width:620px){.device.panel{padding:44px 21px 34px}.caption{margin-bottom:10px;letter-spacing:.13em}.tube-row{gap:clamp(1px,.34vw,4px)}.screw{width:54px}.base-board{height:29px;margin-top:-12px}.tube-slot{max-width:114px}.separator-slot{max-width:68px}}',
)

replace_once(
    "card-styles.js",
    '@media(max-width:390px){.device.panel{padding:40px 16px 31px;border-radius:20px}.caption{margin-left:12%;margin-right:12%;letter-spacing:.09em}.title{font-size:12px}.screw{width:23px}.separator-slot{min-width:8px}.tube-row{padding:0}}',
    '@media(max-width:390px){.device.panel{padding:40px 16px 31px;border-radius:20px}.caption{margin-left:12%;margin-right:12%;letter-spacing:.09em}.title{font-size:12px}.screw{width:46px}.separator-slot{min-width:8px}.tube-row{padding:0}}',
)

print("Applied Glass Tube Display Card v0.3.10 exact Analog Gauge screws.")
