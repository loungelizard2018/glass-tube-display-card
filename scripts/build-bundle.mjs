import { mkdir, readFile, writeFile } from "node:fs/promises";

const VERSION = "0.3.7";
const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const stripImports = (source) => source
  .split("\n")
  .filter((line) => !line.startsWith("import "))
  .join("\n");

const glyphs = (await read("glyphs.js"))
  .replace("export const GLYPH_PATHS", "const GLYPH_PATHS")
  .replace("export function normaliseCharacter", "function normaliseCharacter")
  .replace("export function glyphPath", "function glyphPath");

const panelAssets = (await read("panel-asset.js"))
  .replace("export const PANEL_ASSET_URI", "const PANEL_ASSET_URI")
  .replace("export const SCREW_ASSET_URI", "const SCREW_ASSET_URI");

const renderer = stripImports(await read("tube-renderer.js"))
  .replace("export function renderPanelBackdrop", "function renderPanelBackdrop")
  .replace("export function renderTube", "function renderTube")
  .replace("export function renderSeparator", "function renderSeparator")
  .replace("export function renderScrews", "function renderScrews");

const styles = (await read("card-styles.js"))
  .replace("export function renderStyles", "function renderStyles");

const core = stripImports(await read("card-core.js"));

const bundle = `/* Glass Tube Display Card v${VERSION}
 * Single-layer Gauge-family panel with independently balanced punctuation cathodes.
 */
(() => {
${glyphs}
${panelAssets}
${renderer}
${styles}
${core}
})();
`;

await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
await writeFile(new URL("../glass-tube-display-card.js", import.meta.url), bundle);
await writeFile(new URL("../dist/glass-tube-display-card.js", import.meta.url), bundle);
await writeFile(new URL("../dist/glyphs.js", import.meta.url), await read("glyphs.js"));
await writeFile(new URL("../dist/tube-renderer.js", import.meta.url), await read("tube-renderer.js"));
await writeFile(new URL("../dist/card-styles.js", import.meta.url), await read("card-styles.js"));

console.log(`Built Glass Tube Display Card v${VERSION} (${bundle.length} bytes).`);
