from __future__ import annotations

import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]


def update_tube_renderer() -> None:
    path = ROOT / "tube-renderer.js"
    text = path.read_text(encoding="utf-8")

    if 'import { PANEL_ASSET_URI, SCREW_ASSET_URI } from "./panel-asset.js";' not in text:
        text = text.replace(
            'import { glyphPath } from "./glyphs.js";\n',
            'import { glyphPath } from "./glyphs.js";\n'
            'import { PANEL_ASSET_URI, SCREW_ASSET_URI } from "./panel-asset.js";\n',
            1,
        )

    panel_replacement = '''export function renderPanelBackdrop() {
  return `<img class="panel-backdrop" src="${PANEL_ASSET_URI}" alt="" aria-hidden="true">`;
}

export function renderTube'''
    text, count = re.subn(
        r'export function renderPanelBackdrop\([^)]*\) \{.*?\n\}\n\nexport function renderTube',
        panel_replacement,
        text,
        count=1,
        flags=re.S,
    )
    if count != 1 and 'return `<img class="panel-backdrop"' not in text:
        raise RuntimeError("Could not replace renderPanelBackdrop()")

    text = re.sub(
        r'const d = "M41 174 C46 174 48 177 47 181 C46 185 42 187 39 188 C39 193 37 197 33 201";',
        'const d = "M42 178 C43 184 41 189 38 192 C36 194 35 198 34 202";',
        text,
        count=1,
    )

    screw_replacement = '''export function renderScrews(enabled) {
  if (!enabled) return "";
  const rotations = { tl: -7, tr: 5, bl: 8, br: -4 };
  return ["tl", "tr", "bl", "br"].map((position) =>
    `<img class="screw screw-${position}" src="${SCREW_ASSET_URI}" alt="" aria-hidden="true" style="transform:rotate(${rotations[position]}deg)">`
  ).join("");
}
'''
    text, count = re.subn(
        r'export function renderScrews\([^)]*\) \{.*?\n\}\s*$',
        screw_replacement,
        text,
        count=1,
        flags=re.S,
    )
    if count != 1 and 'src="${SCREW_ASSET_URI}"' not in text:
        raise RuntimeError("Could not replace renderScrews()")

    path.write_text(text, encoding="utf-8")


def update_version() -> None:
    path = ROOT / "card-core.js"
    text = path.read_text(encoding="utf-8")
    text = text.replace('const VERSION = "0.3.5";', 'const VERSION = "0.3.6";')
    path.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    update_tube_renderer()
    update_version()
    print("Applied Glass Tube Display Card v0.3.6 source changes.")
