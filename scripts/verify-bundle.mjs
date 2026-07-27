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
if (!bundle.includes("Glass Tube Display Card v0.3.9")) fail("root bundle version is not v0.3.9");
if (!bundle.includes("data:image/webp;base64,")) fail("embedded WebP panel assets are missing");
if (!renderer.includes('src="${PANEL_ASSET_URI}"')) fail("panel renderer does not use the generated panel asset");
if (!renderer.includes('src="${SCREW_ASSET_URI}"')) fail("screw renderer does not use the generated Gauge screw asset");
if (!styles.includes("background:transparent;box-shadow:none;overflow:hidden}")) fail("panel wrapper still paints a second enclosure or shadow layer");
if (!styles.includes("transform:scale(1.10);transform-origin:50% 50%")) fail("outer panel shell is not cropped to a single visible face");
if (!renderer.includes("M46 175 C49 179 48 184 44 187 C41 189 38 189 36 187 C37 193 34 198 30 202")) fail("v0.3.9 open-hook comma cathode path is missing");
if (!renderer.includes("separator-comma-beads") || !renderer.includes("separator-comma-spark")) fail("comma lacks incandescent bead and spark layers");
if (!renderer.includes('separator-slot${isComma ? " separator-slot-comma" : ""}')) fail("comma tube does not receive its dedicated width class");
if (!styles.includes(".separator-slot-comma{flex:.66 1 0;max-width:84px}")) fail("comma tube width is not configured");
if (!styles.includes(".separator-comma-aura{stroke:var(--tube);stroke-width:4.6;opacity:.60")) fail("comma aura is not balanced for v0.3.9");
if (!styles.includes(".separator-comma-core{stroke:var(--core);stroke-width:1.2")) fail("comma core is not balanced for v0.3.9");
if (!renderer.includes("renderDegreeCathode") || !renderer.includes("sep-degree-far-${id}") || !renderer.includes("sep-degree-glow-${id}")) fail("degree symbol lacks dedicated glow rendering");
if (!styles.includes(".separator-degree-far{stroke:#ff3d00;stroke-width:3.2;opacity:.10")) fail("degree far glow is too strong or missing");
if (!styles.includes(".separator-degree-aura{stroke:var(--tube);stroke-width:2.2;opacity:.28")) fail("degree aura is too strong or missing");
if (!core.includes('const VERSION = "0.3.9"')) fail("card-core version is not v0.3.9");
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

if (!process.exitCode) console.log("Glass Tube Display Card v0.3.9 verification passed.");
