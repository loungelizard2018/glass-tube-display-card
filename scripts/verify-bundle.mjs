import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const fail = (message) => {
  console.error(`Verification failed: ${message}`);
  process.exitCode = 1;
};

const bundle = await read("glass-tube-display-card.js");
const renderer = await read("tube-renderer.js");
const core = await read("card-core.js");
const styles = await read("card-styles.js");
const panelAssets = await read("panel-asset.js");
const hacs = JSON.parse(await read("hacs.json"));

if (/^\s*import\s/m.test(bundle)) fail("root HACS bundle contains runtime imports");
if (!bundle.includes("Glass Tube Display Card v0.3.6")) fail("root bundle version is not v0.3.6");
if (!bundle.includes("data:image/webp;base64,")) fail("embedded WebP panel assets are missing");
if (!renderer.includes('src="${PANEL_ASSET_URI}"')) fail("panel renderer does not use the generated panel asset");
if (!renderer.includes('src="${SCREW_ASSET_URI}"')) fail("screw renderer does not use the generated Gauge screw asset");
if (renderer.includes('id="${id}-grain"') || renderer.includes('baseFrequency=".72"')) fail("legacy browser-generated panel turbulence is still present");
if (!renderer.includes("M42 178 C43 184 41 189 38 192 C36 194 35 198 34 202")) fail("compact comma cathode path is missing");
if (!styles.includes(".separator-comma-core{stroke:var(--core);stroke-width:.8")) fail("comma core stroke layer is missing");
if (!styles.includes(".separator-comma-far{stroke:#ff3d00;stroke-width:5.4;opacity:.12")) fail("comma bloom is not sufficiently restrained");
if (!styles.includes("fill:none")) fail("comma must remain stroke-only");
if (!core.includes('const VERSION = "0.3.6"')) fail("card-core version is not v0.3.6");
if (!panelAssets.includes("PANEL_ASSET_URI") || !panelAssets.includes("SCREW_ASSET_URI")) fail("generated panel asset module is incomplete");
if (hacs.name !== "Glass Tube Display Card" || hacs.filename !== "glass-tube-display-card.js") fail("hacs.json is not the standard single-resource manifest");

const requiredOptions = [
  "entity", "text", "title", "subtitle", "unit", "decimals", "decimal_separator",
  "min_characters", "max_characters", "pad", "overflow", "mounting", "screws",
  "separator_style", "show_blank_tubes", "show_cathode_stack", "max_width", "tube_gap",
  "brightness", "glass_opacity", "mesh_opacity", "tube_color", "core_color", "glass_tint", "tap_action"
];
for (const option of requiredOptions) {
  if (!core.includes(option)) fail(`configuration option '${option}' is missing from card-core.js`);
}

if (!process.exitCode) console.log("Glass Tube Display Card v0.3.6 verification passed.");
