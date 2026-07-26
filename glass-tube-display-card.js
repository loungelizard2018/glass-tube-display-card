/* Glass Tube Display Card v0.2.0
 * Photorealistic self-contained HACS bundle: no runtime imports.
 */
(() => {
const GLYPH_PATHS = Object.freeze({
  " ": "",
  "0": "M30 5 C15 5 9 22 9 55 C9 88 15 105 30 105 C45 105 51 88 51 55 C51 22 45 5 30 5 Z",
  "1": "M18 22 L30 7 L30 105 M18 105 L43 105",
  "2": "M9 27 C11 10 45 4 50 25 C54 42 43 53 31 63 C20 72 12 84 10 105 L52 105",
  "3": "M10 20 C17 7 45 5 50 24 C53 39 43 50 31 54 C44 57 53 68 50 86 C47 105 19 110 8 94",
  "4": "M44 105 L44 6 M44 67 L8 67 L36 6",
  "5": "M51 7 L14 7 L10 51 C20 45 43 44 49 61 C56 81 45 103 27 105 C18 106 11 102 7 95",
  "6": "M48 16 C40 5 21 6 13 26 C6 44 6 88 18 100 C30 112 48 103 51 82 C54 61 41 48 21 55 C15 57 11 62 8 68",
  "7": "M8 8 L52 8 C42 31 32 58 28 105",
  "8": "M30 5 C15 5 9 16 10 31 C11 44 20 52 30 55 C19 58 9 68 9 84 C10 101 20 107 30 107 C40 107 50 101 51 84 C51 68 41 58 30 55 C40 52 49 44 50 31 C51 16 45 5 30 5 Z",
  "9": "M52 44 C50 22 43 7 30 6 C15 5 8 18 9 38 C10 59 23 70 41 62 C47 59 50 54 52 48 C53 76 49 98 31 105 C21 109 12 105 8 97",
  "A": "M7 105 L24 7 L36 7 L53 105 M15 65 L45 65",
  "B": "M10 5 L10 105 L31 105 C47 105 53 94 52 79 C51 66 43 58 31 56 C44 54 50 45 50 31 C50 16 42 5 28 5 Z",
  "C": "M50 20 C42 4 18 3 10 27 C3 47 3 78 10 96 C18 112 42 108 51 94",
  "D": "M10 5 L10 105 L28 105 C45 105 52 88 52 55 C52 22 45 5 28 5 Z",
  "E": "M51 5 L10 5 L10 105 L52 105 M10 55 L43 55",
  "F": "M51 5 L10 5 L10 105 M10 55 L43 55",
  "G": "M51 22 C43 4 18 3 10 27 C3 47 3 79 10 97 C18 112 42 108 51 93 L51 61 L32 61",
  "H": "M9 5 L9 105 M51 5 L51 105 M9 56 L51 56",
  "I": "M16 5 L44 5 M30 5 L30 105 M16 105 L44 105",
  "J": "M12 5 L51 5 M42 5 L42 82 C42 100 31 108 19 104 C11 101 7 94 7 84",
  "K": "M9 5 L9 105 M51 5 L10 61 M26 44 L53 105",
  "L": "M10 5 L10 105 L52 105",
  "M": "M6 105 L6 5 L30 58 L54 5 L54 105",
  "N": "M8 105 L8 5 L52 105 L52 5",
  "O": "M30 5 C15 5 9 22 9 55 C9 88 15 105 30 105 C45 105 51 88 51 55 C51 22 45 5 30 5 Z",
  "P": "M10 105 L10 5 L31 5 C46 5 52 17 51 33 C50 49 42 58 29 58 L10 58",
  "Q": "M30 5 C15 5 9 22 9 55 C9 88 15 105 30 105 C45 105 51 88 51 55 C51 22 45 5 30 5 Z M34 79 L55 108",
  "R": "M10 105 L10 5 L31 5 C46 5 52 17 51 33 C50 49 42 58 29 58 L10 58 M29 58 L54 105",
  "S": "M51 18 C42 4 17 4 10 23 C3 43 17 53 31 57 C46 61 55 72 50 91 C45 109 18 111 8 94",
  "T": "M5 5 L55 5 M30 5 L30 105",
  "U": "M8 5 L8 78 C8 97 17 106 30 106 C43 106 52 97 52 78 L52 5",
  "V": "M6 5 L26 105 L34 105 L54 5",
  "W": "M4 5 L15 105 L30 58 L45 105 L56 5",
  "X": "M7 5 L53 105 M53 5 L7 105",
  "Y": "M6 5 L30 58 L54 5 M30 58 L30 105",
  "Z": "M7 5 L53 5 L8 105 L54 105",
  "-": "M9 56 L51 56",
  "_": "M7 105 L53 105",
  "/": "M8 105 L52 5",
  "\\": "M8 5 L52 105",
  "+": "M9 56 L51 56 M30 34 L30 78",
  "=": "M9 43 L51 43 M9 69 L51 69",
  "?": "M9 25 C12 7 47 4 51 25 C54 42 43 51 33 58 C28 62 27 68 27 75 M27 98 L27 103",
  "!": "M30 5 L30 78 M30 99 L30 104",
  "%": "M12 19 C12 10 18 5 24 9 C30 13 29 28 22 31 C15 34 11 28 12 19 Z M47 79 C47 70 41 66 35 70 C29 74 30 89 37 92 C44 95 48 88 47 79 Z M13 102 L48 8"
});

function normaliseCharacter(character) {
  const source = String(character ?? " ");
  if (source === "ß") return "S";
  const stripped = source.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return stripped.toUpperCase().slice(0, 1) || " ";
}

function glyphPath(character) {
  return GLYPH_PATHS[character] ?? GLYPH_PATHS["?"];
}


const escapeAttr = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

function ghostCathodes(activeChar, config) {
  if (config.show_cathode_stack === false) return "";
  const stack = ["8", "4", "2", "M", "0"];
  return stack
    .filter((char) => char !== activeChar)
    .map((char, index) => {
      const dx = (index - 2) * 0.62;
      const dy = index % 2 ? 0.45 : -0.35;
      return `<path d="${glyphPath(char)}" transform="translate(${dx} ${dy})" class="cathode-ghost"/>`;
    }).join("");
}

function renderTube(character, index, config, uid) {
  const id = `${uid}-${index}`;
  const path = glyphPath(character);
  const active = path ? 1 : 0;
  if (character === " " && config.show_blank_tubes === false) {
    return `<div class="tube-slot tube-slot-empty" aria-hidden="true"></div>`;
  }

  const outer = "M18 204 C16 177 16 68 18 46 C19 33 26 24 37 19 C41 17 42 14 42 10 C42 5 44 2 46 2 C49 2 51 5 51 10 C51 14 52 17 56 19 C67 24 74 33 75 46 C77 68 77 177 75 204 C73 215 20 215 18 204 Z";
  const inner = "M23 199 C21 173 21 70 23 49 C24 38 30 31 39 27 C43 25 44 21 44 17 L49 17 C49 21 50 25 54 27 C63 31 69 38 70 49 C72 70 72 173 70 199 Z";

  return `<div class="tube-slot" aria-label="${escapeAttr(character === " " ? "blank" : character)}">
    <svg class="tube-svg" viewBox="0 0 92 250" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="glass-${id}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#b9d8e8" stop-opacity=".08"/>
          <stop offset="9%" stop-color="#ffffff" stop-opacity=".58"/>
          <stop offset="18%" stop-color="${escapeAttr(config.glass_tint)}" stop-opacity=".16"/>
          <stop offset="43%" stop-color="#8ca2ad" stop-opacity=".035"/>
          <stop offset="68%" stop-color="#dceef6" stop-opacity=".08"/>
          <stop offset="86%" stop-color="#ffffff" stop-opacity=".36"/>
          <stop offset="100%" stop-color="#8aa3af" stop-opacity=".06"/>
        </linearGradient>
        <linearGradient id="base-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#41454a"/>
          <stop offset="13%" stop-color="#151719"/>
          <stop offset="66%" stop-color="#050606"/>
          <stop offset="100%" stop-color="#202326"/>
        </linearGradient>
        <radialGradient id="warm-${id}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${escapeAttr(config.core_color)}" stop-opacity=".74"/>
          <stop offset="38%" stop-color="${escapeAttr(config.tube_color)}" stop-opacity=".31"/>
          <stop offset="100%" stop-color="#7b1200" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="mica-${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e7e0d5" stop-opacity=".74"/>
          <stop offset="42%" stop-color="#8f8a82" stop-opacity=".36"/>
          <stop offset="100%" stop-color="#e6e1d8" stop-opacity=".58"/>
        </linearGradient>
        <pattern id="mesh-${id}" width="7.8" height="6.75" patternUnits="userSpaceOnUse">
          <path d="M1.95 0 H5.85 L7.8 3.375 L5.85 6.75 H1.95 L0 3.375 Z" fill="none" stroke="#8d8982" stroke-width=".55" opacity="${Number(config.mesh_opacity)}"/>
        </pattern>
        <filter id="glass-shadow-${id}" x="-55%" y="-25%" width="210%" height="180%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.4" flood-color="#000" flood-opacity=".88"/>
        </filter>
        <filter id="glow-wide-${id}" x="-160%" y="-160%" width="420%" height="420%"><feGaussianBlur stdDeviation="5.8"/></filter>
        <filter id="glow-mid-${id}" x="-120%" y="-120%" width="340%" height="340%"><feGaussianBlur stdDeviation="2.5"/></filter>
        <filter id="soft-${id}" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="1.25"/></filter>
        <clipPath id="inside-${id}"><path d="${inner}"/></clipPath>
      </defs>

      <ellipse cx="46" cy="224" rx="37" ry="19" fill="url(#warm-${id})" opacity="${active ? ".48" : ".08"}"/>
      <g filter="url(#glass-shadow-${id})">
        <path d="${outer}" fill="#080a0b" fill-opacity=".23" stroke="#111416" stroke-width="1.4"/>
      </g>

      <g clip-path="url(#inside-${id})">
        <rect x="23" y="48" width="47" height="151" fill="#080908" opacity=".31"/>
        <ellipse cx="46" cy="43" rx="23" ry="5.4" fill="url(#mica-${id})" opacity=".72"/>
        <path d="M25 44 C33 40 59 40 67 44 L65 53 C57 57 35 57 27 53 Z" fill="url(#mica-${id})" opacity=".46"/>
        <ellipse cx="46" cy="57" rx="20" ry="4" fill="#bbb7b0" opacity=".24"/>
        <ellipse cx="46" cy="187" rx="22" ry="5.2" fill="url(#mica-${id})" opacity=".56"/>

        <g class="support-wires">
          <path d="M27 48 L27 192 M65 48 L65 192"/>
          <path d="M31 55 L31 190 M61 55 L61 190" opacity=".52"/>
          <path d="M25 64 C35 60 57 60 67 64 M25 179 C35 184 57 184 67 179" opacity=".52"/>
          <path d="M34 52 L33 189 M58 52 L59 189" opacity=".32"/>
        </g>

        <g transform="translate(16 68) scale(1 1.08)">
          ${ghostCathodes(character, config)}
          <path d="${path}" class="cathode-shadow" opacity="${active}"/>
          <path d="${path}" class="cathode-aura" filter="url(#glow-wide-${id})" opacity="${active}"/>
          <path d="${path}" class="cathode-glow" filter="url(#glow-mid-${id})" opacity="${active}"/>
          <path d="${path}" class="cathode-hot" opacity="${active}"/>
          <path d="${path}" class="cathode-core" opacity="${active}"/>
          <path d="${path}" class="cathode-beads" opacity="${active}"/>
        </g>

        <rect x="24" y="60" width="44" height="124" fill="url(#mesh-${id})" opacity=".82"/>
        <path d="M24 60 H68 M24 184 H68" stroke="#8c8881" stroke-width="1.1" opacity=".48"/>
        <g class="bottom-leads">
          <path d="M29 184 L28 211 M36 185 L36 212 M43 186 L43 213 M50 186 L50 213 M57 185 L57 212 M64 184 L65 211"/>
        </g>
        <ellipse cx="46" cy="200" rx="22" ry="4.8" fill="#b83311" opacity="${active ? ".22" : ".04"}" filter="url(#soft-${id})"/>
      </g>

      <path d="${outer}" fill="url(#glass-${id})" fill-opacity="${Number(config.glass_opacity)}" stroke="#d9e7ed" stroke-opacity=".44" stroke-width="1.05"/>
      <path d="M25 42 C22 71 22 170 25 198" fill="none" stroke="#fff" stroke-width="3.8" stroke-linecap="round" opacity=".23"/>
      <path d="M29 31 C25 34 23 39 22 46" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".72"/>
      <path d="M64 30 C70 40 71 61 71 91" fill="none" stroke="#dff6ff" stroke-width="1.8" stroke-linecap="round" opacity=".22"/>
      <path d="M68 102 C70 129 70 166 68 190" fill="none" stroke="#fff" stroke-width=".8" opacity=".12"/>
      <ellipse cx="46.5" cy="9" rx="2.8" ry="5.4" fill="#fff" opacity=".38"/>
      <ellipse cx="43" cy="24" rx="8" ry="2.1" fill="#fff" opacity=".18"/>

      <ellipse cx="46" cy="205" rx="30" ry="6.5" fill="#202225" stroke="#565a5e" stroke-width=".9"/>
      <path d="M16 205 C20 211 72 211 76 205 L76 228 C69 236 23 236 16 228 Z" fill="url(#base-${id})" stroke="#0a0b0c" stroke-width="1.1"/>
      <ellipse cx="46" cy="228" rx="30" ry="6.6" fill="#030404" stroke="#24272a" stroke-width="1"/>
      <path d="M21 211 C32 214 60 214 71 211" fill="none" stroke="#fff" stroke-width=".8" opacity=".08"/>
      <g class="tube-pins">
        <path d="M27 230 L27 246 M34 231 L34 247 M41 231 L41 247 M48 231 L48 247 M55 231 L55 247 M62 231 L62 246"/>
      </g>
    </svg>
  </div>`;
}

function renderSeparator(character, index, config, uid) {
  const id = `${uid}-sep-${index}`;
  const bare = String(config.separator_style).toLowerCase() === "bare";
  const isColon = character === ":" || character === ";";
  const isComma = character === "," || character === ";";
  const isDegree = character === "°";
  const marks = isDegree
    ? `<circle cx="22" cy="101" r="6.8" class="separator-ring"/>`
    : isColon
      ? `<circle cx="22" cy="104" r="4.4" class="separator-dot"/><circle cx="22" cy="145" r="4.4" class="separator-dot"/>${isComma ? '<path d="M23 150 C24 160 20 166 16 170" class="separator-tail"/>' : ''}`
      : `<circle cx="22" cy="157" r="4.8" class="separator-dot"/>${isComma ? '<path d="M24 161 C25 171 21 177 16 181" class="separator-tail"/>' : ''}`;

  return `<div class="separator-slot" aria-label="${escapeAttr(character)}">
    <svg class="separator-svg" viewBox="0 0 44 250" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="sep-glass-${id}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#9db8c5" stop-opacity=".06"/>
          <stop offset="14%" stop-color="#fff" stop-opacity=".54"/>
          <stop offset="38%" stop-color="${escapeAttr(config.glass_tint)}" stop-opacity=".12"/>
          <stop offset="82%" stop-color="#fff" stop-opacity=".28"/>
          <stop offset="100%" stop-color="#8aa3af" stop-opacity=".05"/>
        </linearGradient>
        <linearGradient id="sep-base-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#383b3f"/><stop offset="18%" stop-color="#121416"/><stop offset="78%" stop-color="#030404"/><stop offset="100%" stop-color="#202326"/></linearGradient>
        <pattern id="sep-mesh-${id}" width="5.6" height="4.85" patternUnits="userSpaceOnUse"><path d="M1.4 0 H4.2 L5.6 2.425 L4.2 4.85 H1.4 L0 2.425 Z" fill="none" stroke="#8d8982" stroke-width=".42" opacity="${Number(config.mesh_opacity)}"/></pattern>
        <filter id="sep-glow-${id}" x="-220%" y="-220%" width="540%" height="540%"><feGaussianBlur stdDeviation="4.4"/></filter>
        <filter id="sep-shadow-${id}" x="-100%" y="-30%" width="300%" height="190%"><feDropShadow dx="0" dy="4" stdDeviation="2.7" flood-color="#000" flood-opacity=".88"/></filter>
        <clipPath id="sep-inside-${id}"><path d="M12 202 C10 174 10 82 12 60 C13 46 17 37 20 34 C21 32 21 28 21 24 H24 C24 28 24 32 25 34 C29 37 32 46 33 60 C35 82 35 174 33 202 Z"/></clipPath>
      </defs>
      ${bare ? "" : `<g filter="url(#sep-shadow-${id})"><path d="M9 205 C7 176 7 78 9 57 C10 42 15 33 19 29 C20 27 20 23 20 18 C20 12 21 7 22 7 C24 7 25 12 25 18 C25 23 25 27 26 29 C31 33 35 42 36 57 C38 78 38 176 35 205 C33 215 11 215 9 205 Z" fill="#080a0b" fill-opacity=".26" stroke="#111416" stroke-width="1"/></g>`}
      ${bare ? "" : `<g clip-path="url(#sep-inside-${id})"><rect x="11" y="61" width="23" height="137" fill="#070808" opacity=".28"/><rect x="12" y="66" width="21" height="118" fill="url(#sep-mesh-${id})" opacity=".82"/><path d="M14 59 L14 198 M31 59 L31 198" stroke="#908b84" stroke-width=".8" opacity=".52"/><ellipse cx="22" cy="55" rx="10" ry="3.3" fill="#c8c3ba" opacity=".43"/><ellipse cx="22" cy="190" rx="10" ry="3.3" fill="#c8c3ba" opacity=".36"/></g>`}
      <g class="separator-aura" filter="url(#sep-glow-${id})">${marks}</g><g>${marks}</g>
      ${bare ? "" : `<path d="M9 205 C7 176 7 78 9 57 C10 42 15 33 19 29 C20 27 20 23 20 18 C20 12 21 7 22 7 C24 7 25 12 25 18 C25 23 25 27 26 29 C31 33 35 42 36 57 C38 78 38 176 35 205 C33 215 11 215 9 205 Z" fill="url(#sep-glass-${id})" fill-opacity="${Number(config.glass_opacity)}" stroke="#d9e7ed" stroke-opacity=".42" stroke-width=".85"/><path d="M13 55 C11 83 11 169 13 196" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".24"/><ellipse cx="22" cy="17" rx="1.8" ry="3.7" fill="#fff" opacity=".34"/><ellipse cx="22" cy="206" rx="13" ry="4.2" fill="#202225" stroke="#505459" stroke-width=".7"/><path d="M9 206 C12 211 32 211 35 206 L35 228 C31 234 13 234 9 228 Z" fill="url(#sep-base-${id})" stroke="#080909" stroke-width=".8"/><ellipse cx="22" cy="228" rx="13" ry="4.2" fill="#030404"/><path d="M16 231 L16 246 M22 231 L22 247 M28 231 L28 246" stroke="#6f675e" stroke-width="1" opacity=".72"/>`}
    </svg>
  </div>`;
}

function renderScrews(enabled) {
  if (!enabled) return "";
  return ["tl", "tr", "bl", "br"].map((position) => `<span class="screw screw-${position}" aria-hidden="true"></span>`).join("");
}

const escapeCss = (value) => String(value ?? "").replace(/[{};<>]/g, "");

function renderStyles(config, { justify, brightness, animationMs }) {
  const maxWidth = Math.max(240, Number(config.max_width));
  const gapPx = Math.max(0, Number(config.tube_gap));
  const gapVw = Math.max(.08, Math.min(1.3, gapPx / 9)).toFixed(2);
  const animation = config.animate === false ? "none" : `tube-enter ${animationMs}ms cubic-bezier(.22,1,.36,1)`;

  return `<style>
    :host{display:block;width:100%;min-width:0}
    ha-card{width:100%;min-width:0;background:transparent;border:0;box-shadow:none;overflow:hidden}
    .device{--tube:${escapeCss(config.tube_color)};--core:${escapeCss(config.core_color)};position:relative;width:min(100%,${maxWidth}px);min-width:0;margin:0 auto;box-sizing:border-box;user-select:none;-webkit-tap-highlight-color:transparent;cursor:${config.entity ? "pointer" : "default"};filter:brightness(${brightness});isolation:isolate}
    .device.free{padding:4px 4px 12px}
    .device.panel{padding:clamp(30px,4.3vw,56px) clamp(25px,4.8vw,62px) clamp(28px,4vw,50px);border-radius:clamp(17px,2.2vw,28px);background:radial-gradient(ellipse at 50% -14%,rgba(255,255,255,.105),transparent 35%),linear-gradient(142deg,rgba(255,255,255,.045),transparent 22%,rgba(255,255,255,.012) 52%,transparent 78%),repeating-radial-gradient(circle at 0 0,rgba(255,255,255,.013) 0 1px,transparent 1px 3px),linear-gradient(180deg,${escapeCss(config.panel_edge)} 0%,#151719 4%,${escapeCss(config.panel_color)} 15%,#070808 84%,#1b1e20 96%,#060707 100%);border:1px solid rgba(255,255,255,.13);box-shadow:inset 0 2px 0 rgba(255,255,255,.09),inset 0 -2px 0 rgba(0,0,0,.94),inset 0 0 0 3px rgba(0,0,0,.34),0 16px 36px rgba(0,0,0,.48),0 3px 7px rgba(0,0,0,.75)}
    .device.panel:before{content:"";position:absolute;inset:clamp(9px,1.25vw,16px);z-index:-1;border-radius:clamp(12px,1.65vw,21px);border:1px solid rgba(255,255,255,.065);box-shadow:inset 0 1px 0 rgba(255,255,255,.035),0 1px 0 rgba(0,0,0,.9);pointer-events:none}
    .device.panel:after{content:"";position:absolute;left:8%;right:8%;top:1.2%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);opacity:.62;pointer-events:none}
    .caption{position:relative;z-index:8;text-align:center;margin:0 8% clamp(15px,2.3vw,29px);letter-spacing:.22em;line-height:1.2;text-transform:uppercase;text-shadow:0 2px 2px #000,0 0 12px rgba(255,255,255,.05)}
    .title{display:inline-block;font:500 clamp(13px,2.25vw,26px)/1.15 Arial,Helvetica,sans-serif;background:linear-gradient(180deg,#f2f3f4 0%,#bfc2c5 45%,#686c70 51%,#d7d9db 88%,#85898d 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 1px 0 #000)}
    .subtitle{margin-top:5px;font:400 clamp(8px,1.25vw,12px)/1.2 Arial,Helvetica,sans-serif;color:rgba(190,194,198,.5);letter-spacing:.17em}
    .tube-row{position:relative;z-index:5;display:flex;align-items:flex-end;justify-content:${justify};gap:clamp(1px,${gapVw}vw,${gapPx}px);width:100%;min-width:0;box-sizing:border-box;padding:0 clamp(2px,.7vw,8px)}
    .tube-slot{flex:1 1 0;min-width:0;max-width:102px;aspect-ratio:92/250;animation:${animation};filter:drop-shadow(0 5px 4px rgba(0,0,0,.66))}
    .tube-slot-empty{opacity:0}
    .separator-slot{flex:.38 1 0;min-width:5px;max-width:44px;aspect-ratio:44/250;animation:${animation};filter:drop-shadow(0 5px 4px rgba(0,0,0,.62))}
    .tube-svg,.separator-svg{display:block;width:100%;height:auto;overflow:visible}
    .support-wires,.bottom-leads{fill:none;stroke:#8f8a82;stroke-width:.85;stroke-linecap:round;opacity:.62}
    .tube-pins{fill:none;stroke:#766d63;stroke-width:1.2;stroke-linecap:round;opacity:.72}
    .cathode-ghost{fill:none;stroke:#625a52;stroke-width:1.15;stroke-linecap:round;stroke-linejoin:round;opacity:.15}
    .cathode-shadow{fill:none;stroke:#160400;stroke-width:7.4;stroke-linecap:round;stroke-linejoin:round;opacity:.92}
    .cathode-aura{fill:none;stroke:var(--tube);stroke-width:9.4;stroke-linecap:round;stroke-linejoin:round;opacity:.62}
    .cathode-glow{fill:none;stroke:var(--tube);stroke-width:5.2;stroke-linecap:round;stroke-linejoin:round;opacity:.96}
    .cathode-hot{fill:none;stroke:#ff6812;stroke-width:3.6;stroke-linecap:round;stroke-linejoin:round}
    .cathode-core{fill:none;stroke:var(--core);stroke-width:1.35;stroke-linecap:round;stroke-linejoin:round;opacity:.98}
    .cathode-beads{fill:none;stroke:#fff4d8;stroke-width:1.18;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:.2 2.15;opacity:.78}
    .separator-aura{opacity:.8}
    .separator-dot{fill:var(--tube);stroke:var(--core);stroke-width:1.2}
    .separator-ring{fill:none;stroke:var(--tube);stroke-width:4.2}
    .separator-tail{fill:none;stroke:var(--tube);stroke-width:3.8;stroke-linecap:round}
    .base-board{position:relative;z-index:3;width:98%;height:clamp(27px,4.1vw,46px);margin:clamp(-19px,-2vw,-10px) auto 0;border-radius:clamp(7px,1vw,12px);background:linear-gradient(180deg,#36393c 0%,#151719 13%,#090a0b 70%,#020303 100%);border:1px solid rgba(255,255,255,.07);box-shadow:inset 0 2px 0 rgba(255,255,255,.075),inset 0 -4px 7px rgba(0,0,0,.9),0 12px 16px rgba(0,0,0,.58)}
    .base-board:before{content:"";position:absolute;left:1.5%;right:1.5%;top:5%;height:20%;border-radius:50%;background:linear-gradient(90deg,transparent,rgba(255,129,37,.18),transparent);filter:blur(5px);opacity:.65}
    .base-board:after{content:"";position:absolute;left:4%;right:4%;bottom:-11px;height:12px;border-radius:0 0 10px 10px;background:linear-gradient(180deg,#101214,#020303);box-shadow:0 8px 12px rgba(0,0,0,.58)}
    .screw{position:absolute;z-index:20;width:clamp(19px,3.1vw,34px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 34% 29%,rgba(255,255,255,.2),transparent 19%),radial-gradient(circle at 50% 55%,#16191b 0 30%,#030404 53%,#2a2e31 72%,#050606 100%);border:1px solid rgba(255,255,255,.09);box-shadow:inset 0 1px 2px rgba(255,255,255,.1),inset 0 -3px 4px #000,0 3px 6px rgba(0,0,0,.82)}
    .screw:before,.screw:after{content:"";position:absolute;left:18%;right:18%;top:44%;height:12%;border-radius:2px;background:linear-gradient(180deg,#020303,#2a2d30 45%,#000 56%);box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
    .screw:after{transform:rotate(90deg)}
    .screw-tl{left:clamp(9px,1.4vw,18px);top:clamp(9px,1.4vw,18px);transform:rotate(8deg)}
    .screw-tr{right:clamp(9px,1.4vw,18px);top:clamp(9px,1.4vw,18px);transform:rotate(-6deg)}
    .screw-bl{left:clamp(9px,1.4vw,18px);bottom:clamp(9px,1.4vw,18px);transform:rotate(4deg)}
    .screw-br{right:clamp(9px,1.4vw,18px);bottom:clamp(9px,1.4vw,18px);transform:rotate(-11deg)}
    @keyframes tube-enter{from{opacity:.35;transform:translateY(3px) scale(.992);filter:brightness(.68)}to{opacity:1;transform:translateY(0) scale(1);filter:brightness(1)}}
    @media(max-width:620px){.device.panel{padding:25px 20px 31px}.caption{margin-bottom:12px;letter-spacing:.13em}.tube-row{gap:clamp(1px,.45vw,4px)}.screw{width:18px}.base-board{height:28px;margin-top:-11px}}
    @media(max-width:390px){.device.panel{padding:21px 16px 27px;border-radius:14px}.device.panel:before{inset:7px}.caption{margin-left:11%;margin-right:11%;letter-spacing:.09em}.title{font-size:12px}.screw{width:15px}.separator-slot{min-width:3px}}
    @media(prefers-reduced-motion:reduce){.tube-slot,.separator-slot{animation:none!important}}
  </style>`;
}


const VERSION = "0.2.0";
const DEFAULT_CONFIG = Object.freeze({
  text:"HELLO",attribute:null,prefix:"",suffix:"",title:"",subtitle:"",unit:"",unit_separator:" ",
  decimals:null,decimal_separator:"auto",unavailable_text:"----",unknown_text:"----",
  min_characters:0,max_characters:12,pad:"left",pad_character:" ",overflow:"left",
  show_blank_tubes:true,show_cathode_stack:true,separator_style:"mini_tube",align:"center",
  mounting:"free",screws:false,max_width:1100,tube_gap:8,tube_color:"#ff5b00",core_color:"#ffe2ba",
  glass_tint:"#d9eff8",glass_opacity:.42,mesh_opacity:.48,pcb_color:"#0b0d0c",panel_color:"#090a0b",
  panel_edge:"#25292c",brightness:1,animate:true,animation_speed:460,tap_action:{action:"more-info"}
});

const escapeHtml = (value) => String(value ?? "")
  .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
  .replace(/"/g,"&quot;").replace(/'/g,"&#039;");

class GlassTubeDisplayCard extends HTMLElement {
  constructor(){super();this.attachShadow({mode:"open"});this._config=null;this._hass=null;this._lastDisplay=null;this._uid=`gtd-${Math.random().toString(36).slice(2,10)}`}

  static getStubConfig(){return{type:"custom:glass-tube-display-card",text:"TEST 26,4°C",title:"GLASS TUBE DISPLAY",min_characters:8,max_characters:12,mounting:"panel",screws:true}}

  setConfig(config){
    if(!config||(!config.entity&&config.text===undefined))throw new Error("glass-tube-display-card: define either 'entity' or 'text'");
    const mounting=config.mounted===true||config.screwed===true?"panel":String(config.mounting??DEFAULT_CONFIG.mounting).toLowerCase();
    const screws=config.screwed===true?true:Boolean(config.screws??false);
    this._config={...DEFAULT_CONFIG,...config,mounting,screws};
    this._validateConfig();this._lastDisplay=null;this._render();
  }

  set hass(hass){this._hass=hass;if(!this._config)return;const display=this._displayValue();if(display!==this._lastDisplay)this._render()}
  getCardSize(){return this._config?.title||this._config?.subtitle?5:4}
  getGridOptions(){return{rows:5,columns:12,min_rows:3,min_columns:3}}

  _validateConfig(){
    const cfg=this._config;
    if(!["free","panel"].includes(String(cfg.mounting).toLowerCase()))throw new Error("glass-tube-display-card: 'mounting' must be 'free' or 'panel'");
    if(!["mini_tube","bare"].includes(String(cfg.separator_style).toLowerCase()))throw new Error("glass-tube-display-card: 'separator_style' must be 'mini_tube' or 'bare'");
    if(!["left","center","right"].includes(String(cfg.align).toLowerCase()))throw new Error("glass-tube-display-card: 'align' must be 'left', 'center' or 'right'");
    for(const field of ["min_characters","max_characters","max_width","tube_gap","brightness","animation_speed"]){if(!Number.isFinite(Number(cfg[field])))throw new Error(`glass-tube-display-card: '${field}' must be numeric`)}
    if(Number(cfg.max_characters)<1||Number(cfg.max_characters)>40)throw new Error("glass-tube-display-card: 'max_characters' must be between 1 and 40");
    if(Number(cfg.min_characters)<0||Number(cfg.min_characters)>Number(cfg.max_characters))throw new Error("glass-tube-display-card: 'min_characters' must be between 0 and 'max_characters'");
  }

  _entityValue(){
    const cfg=this._config;if(!cfg.entity)return cfg.text??"";
    const stateObj=this._hass?.states?.[cfg.entity];if(!stateObj)return cfg.unavailable_text;
    let value=cfg.attribute?stateObj.attributes?.[cfg.attribute]:stateObj.state;
    if(value===undefined||value===null||value==="unavailable")return cfg.unavailable_text;if(value==="unknown")return cfg.unknown_text;
    if(cfg.decimals!==null&&cfg.decimals!==undefined&&cfg.decimals!==""){const numeric=Number(value);if(Number.isFinite(numeric))value=numeric.toFixed(Math.max(0,Math.min(8,Number(cfg.decimals))))}
    return String(value);
  }

  _displayValue(){
    const cfg=this._config;const unit=cfg.unit?`${cfg.unit_separator??" "}${cfg.unit}`:"";
    let value=`${cfg.prefix??""}${this._entityValue()}${cfg.suffix??""}${unit}`;
    const separator=String(cfg.decimal_separator||"auto").toLowerCase();
    if(separator==="comma")value=value.replace(/(\d)\.(?=\d)/g,"$1,");if(separator==="dot")value=value.replace(/(\d),(?=\d)/g,"$1.");
    return value.toUpperCase();
  }

  _tokens(value){
    const separators=new Set([".",",",":",";","°"]);
    let tokens=Array.from(String(value)).map(raw=>({kind:separators.has(raw)?"separator":"glyph",char:separators.has(raw)?raw:normaliseCharacter(raw)}));
    const max=Math.max(1,Math.floor(Number(this._config.max_characters)));
    const glyphIndexes=tokens.map((token,index)=>token.kind==="glyph"?index:-1).filter(index=>index>=0);
    if(glyphIndexes.length>max){const overflow=glyphIndexes.length-max;if(String(this._config.overflow).toLowerCase()==="right")tokens=tokens.slice(0,glyphIndexes[max-1]+1);else tokens=tokens.slice(glyphIndexes[overflow])}
    const glyphCount=tokens.filter(token=>token.kind==="glyph").length;const min=Math.max(0,Math.floor(Number(this._config.min_characters)));const padCount=Math.max(0,min-glyphCount);
    if(padCount){const char=normaliseCharacter(this._config.pad_character||" ");const padding=Array.from({length:padCount},()=>({kind:"glyph",char}));tokens=String(this._config.pad).toLowerCase()==="right"?[...tokens,...padding]:[...padding,...tokens]}
    return tokens;
  }

  _render(){
    if(!this._config)return;const cfg=this._config;const display=this._displayValue();this._lastDisplay=display;
    const tubeHtml=this._tokens(display).map((token,index)=>token.kind==="separator"?renderSeparator(token.char,index,cfg,this._uid):renderTube(token.char,index,cfg,this._uid)).join("");
    const mounted=String(cfg.mounting).toLowerCase()==="panel";const justify={left:"flex-start",center:"center",right:"flex-end"}[String(cfg.align).toLowerCase()]||"center";
    const brightness=Math.max(.1,Math.min(3,Number(cfg.brightness)));const animationMs=Math.max(0,Number(cfg.animation_speed));
    this.shadowRoot.innerHTML=`${renderStyles(cfg,{justify,brightness,animationMs})}<ha-card><div class="device ${mounted?"panel":"free"}" role="button" tabindex="${cfg.entity?"0":"-1"}">${renderScrews(cfg.screws===true)}${cfg.title||cfg.subtitle?`<div class="caption">${cfg.title?`<div class="title">${escapeHtml(cfg.title)}</div>`:""}${cfg.subtitle?`<div class="subtitle">${escapeHtml(cfg.subtitle)}</div>`:""}</div>`:""}<div class="tube-row">${tubeHtml}</div><div class="base-board" aria-hidden="true"></div></div></ha-card>`;
    const device=this.shadowRoot.querySelector(".device");if(device&&cfg.entity){device.addEventListener("click",()=>this._handleAction(cfg.tap_action));device.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();this._handleAction(cfg.tap_action)}})}
  }

  _handleAction(actionConfig){
    const cfg=this._config;const action=typeof actionConfig==="string"?{action:actionConfig}:actionConfig||{action:"more-info"};const type=String(action.action||"more-info").toLowerCase();
    if(type==="none")return;if(type==="more-info"){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:true,composed:true,detail:{entityId:cfg.entity}}));return}
    if(type==="navigate"&&action.navigation_path){history.pushState(null,"",action.navigation_path);window.dispatchEvent(new Event("location-changed"));return}
    if(type==="url"&&action.url_path){window.open(action.url_path,action.new_tab===false?"_self":"_blank","noopener");return}
    if(type==="toggle"&&cfg.entity&&this._hass){const[domain]=cfg.entity.split(".");this._hass.callService(domain,"toggle",{entity_id:cfg.entity});return}
    if(type==="call-service"&&action.service&&this._hass){const[domain,service]=String(action.service).split(".",2);if(domain&&service)this._hass.callService(domain,service,action.service_data||action.data||{})}
  }
}

if(!customElements.get("glass-tube-display-card"))customElements.define("glass-tube-display-card",GlassTubeDisplayCard);
window.customCards=window.customCards||[];if(!window.customCards.some(card=>card.type==="glass-tube-display-card"))window.customCards.push({type:"glass-tube-display-card",name:"Glass Tube Display Card",description:"Photorealistic alphanumeric glass-tube display with separate punctuation tubes.",preview:true,documentationURL:"https://github.com/loungelizard2018/glass-tube-display-card"});
console.info(`%c GLASS-TUBE-DISPLAY-CARD %c v${VERSION} `,"color:#ff8a2b;background:#161616;font-weight:700;padding:3px 5px;border-radius:3px 0 0 3px","color:#ddd;background:#333;padding:3px 5px;border-radius:0 3px 3px 0");

})();
