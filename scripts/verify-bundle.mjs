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
const hacs = JSON.parse(await read("hacs.json"));

if (/^\s*import\s/m.test(bundle)) fail("root HACS bundle contains runtime imports");
if (!bundle.includes("Glass Tube Display Card v0.3.5")) fail("root bundle version is not v0.3.5");
if (!bundle.includes("renderPanelBackdrop")) fail("dedicated inline panel backdrop is missing from bundle");
if (renderer.includes("base.webp") || styles.includes("base.webp")) fail("Analog Gauge base.webp sprite use must be removed");
if (!renderer.includes("M41 174 C46 174 48 177 47 181 C46 185 42 187 39 188 C39 193 37 197 33 201")) fail("open comma cathode path is missing");
if (!styles.includes(".separator-comma-core{stroke:var(--core);stroke-width:1.05")) fail("comma core stroke layer is missing");
if (!styles.includes(".separator-comma-shadow") || !styles.includes("fill:none")) fail("comma must use open stroke-only layers");
if (!core.includes('const VERSION = "0.3.5"')) fail("card-core version is not v0.3.5");
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

if (!process.exitCode) console.log("Glass Tube Display Card v0.3.5 verification passed.");
