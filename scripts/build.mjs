import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");

const stripExports = (source) => source
  .replace(/^export\s+const\s+/gm, "const ")
  .replace(/^export\s+function\s+/gm, "function ");

const glyphs = stripExports(read("glyphs.js"));
const renderer = stripExports(read("tube-renderer.js"))
  .replace(/^import .*?;\s*$/gm, "");
const styles = stripExports(read("card-styles.js"));
const card = read("glass-tube-display-card.js")
  .replace(/^import .*?;\s*$/gm, "")
  .replace(/const VERSION = "[^"]+";/, 'const VERSION = "0.1.3";');

const banner = `/* Glass Tube Display Card v0.1.3\n * Self-contained HACS bundle: no runtime imports.\n */\n`;
const bundle = `${banner}(() => {\n${glyphs}\n${renderer}\n${styles}\n${card}\n})();\n`;

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/glass-tube-display-card.js", bundle);
console.log("Built dist/glass-tube-display-card.js as a self-contained bundle.");
