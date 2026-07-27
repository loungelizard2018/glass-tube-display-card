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
const screwAsset = await read("exact-screw-asset.js");
const hacs = JSON.parse(await read("hacs.json"));

if (/^\s*import\s/m.test(bundle)) fail("root HACS bundle contains runtime imports");
if (!bundle.includes("Glass Tube Display Card v0.3.11")) fail("root bundle version is not v0.3.11");
if (!bundle.includes("data:image/webp;base64,")) fail("embedded WebP assets are missing");
if (!renderer.includes('src="${PANEL_ASSET_URI}"')) fail("panel renderer does not use the generated panel asset");
if (!renderer.includes('class="screw-wrap screw-${position}"')) fail("screw renderer does not use the clipped screw wrapper");
if (!renderer.includes('class="screw-asset" src="${SCREW_ASSET_URI}"')) fail("screw renderer does not use the exact Gauge screw asset inside the wrapper");
if (!renderer.includes('from "./exact-screw-asset.js"')) fail("renderer does not import the dedicated Gauge screw asset");
if (renderer.includes("const rotations") || renderer.includes("style=\"transform:rotate")) fail("Gauge screw artwork must not be rotated or restyled");
if (!styles.includes(".screw-wrap{position:absolute;z-index:20")) fail("clipped screw wrapper styles are missing");
if (!styles.includes("clip-path:circle(49% at 50% 50%)")) fail("screw wrapper does not clip the surrounding black material");
if (!styles.includes(".screw-asset{position:absolute;left:50%;top:50%;width:150%;height:150%")) fail("screw artwork is not cropped tightly enough");
if (!styles.includes("filter:none")) fail("Gauge screw artwork is being altered by CSS filters");
if (!styles.includes("const screwScale = Math.max(.5, Math.min(1.5, Number(config.screw_scale ?? 1)))")) fail("screw_scale is not applied to responsive sizing");
if (!styles.includes("background:transparent;box-shadow:none;overflow:hidden}")) fail("panel wrapper still paints a second enclosure or shadow layer");
if (!styles.includes("transform:scale(1.10);transform-origin:50% 50%")) fail("outer panel shell is not cropped to a single visible face");
if (!renderer.includes("M46 175 C49 179 48 184 44 187 C41 189 38 189 36 187 C37 193 34 198 30 202")) fail("open-hook comma cathode path is missing");
if (!renderer.includes("separator-comma-beads") || !renderer.includes("separator-comma-spark")) fail("comma lacks incandescent bead and spark layers");
if (!renderer.includes("renderDegreeCathode") || !renderer.includes("sep-degree-far-${id}") || !renderer.includes("sep-degree-glow-${id}")) fail("degree symbol lacks dedicated glow rendering");
if (!core.includes('const VERSION = "0.3.11"')) fail("card-core version is not v0.3.11");
if (!core.includes("screw_scale:1")) fail("screw_scale default is missing");
if (!core.includes("'screw_scale' must be between 0.5 and 1.5")) fail("screw_scale validation is missing");
if (!panelAssets.includes("PANEL_ASSET_URI")) fail("panel asset module is incomplete");
if (!screwAsset.includes("SCREW_ASSET_URI") || !screwAsset.includes("data:image/webp;base64,")) fail("exact Gauge screw asset module is incomplete");
if (hacs.name !== "Glass Tube Display Card" || hacs.filename !== "glass-tube-display-card.js") fail("hacs.json is not the standard single-resource manifest");

const requiredOptions = [
  "entity", "text", "title", "subtitle", "unit", "decimals", "decimal_separator",
  "min_characters", "max_characters", "pad", "overflow", "mounting", "screws", "screw_scale",
  "separator_style", "show_blank_tubes", "show_cathode_stack", "max_width", "tube_gap",
  "brightness", "glass_opacity", "mesh_opacity", "tube_color", "core_color", "glass_tint", "tap_action"
];
for (const option of requiredOptions) {
  if (!core.includes(option)) fail(`configuration option '${option}' is missing from card-core.js`);
}

if (!process.exitCode) console.log("Glass Tube Display Card v0.3.11 verification passed.");
