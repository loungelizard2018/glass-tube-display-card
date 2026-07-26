/* Glass Tube Display Card v0.3.1
 * Corrected photorealistic self-contained HACS bundle: no runtime imports.
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
  const stack = ["8", "4", "2", "M", "0", "7"];
  return stack
    .filter((char) => char !== activeChar)
    .map((char, index) => {
      const dx = (index - 2.5) * 0.42;
      const dy = index % 2 ? 0.32 : -0.24;
      const opacity = (0.072 + index * 0.011).toFixed(3);
      return `<path d="${glyphPath(char)}" transform="translate(${dx} ${dy})" class="cathode-ghost" opacity="${opacity}"/>`;
    }).join("");
}

function glyphTransform(character) {
  const compact = new Set(["0", "6", "8", "9", "O", "Q", "G"]);
  const wide = new Set(["M", "W"]);
  if (compact.has(character)) return "translate(25 88) scale(.84 1.02)";
  if (wide.has(character)) return "translate(24 89) scale(.86 1.00)";
  return "translate(23 88) scale(.90 1.04)";
}

function glassNoise(id) {
  return `<filter id="glass-noise-${id}" x="-15%" y="-10%" width="130%" height="125%">
    <feTurbulence type="fractalNoise" baseFrequency=".018 .12" numOctaves="2" seed="${id.length + 7}" result="noise"/>
    <feColorMatrix in="noise" type="saturate" values="0" result="mono"/>
    <feComponentTransfer in="mono" result="faint"><feFuncA type="table" tableValues="0 .045"/></feComponentTransfer>
    <feBlend in="SourceGraphic" in2="faint" mode="screen"/>
  </filter>`;
}

function renderTube(character, index, config, uid) {
  const id = `${uid}-${index}`;
  const path = glyphPath(character);
  const active = path ? 1 : 0;
  if (character === " " && config.show_blank_tubes === false) {
    return `<div class="tube-slot tube-slot-empty" aria-hidden="true"></div>`;
  }

  const outer = "M19 238 C17 207 17 77 19 51 C20 37 27 27 39 22 C43 20 44 16 44 11 C44 5 47 2 50 2 C53 2 56 5 56 11 C56 16 57 20 61 22 C73 27 80 37 81 51 C83 77 83 207 81 238 C80 250 20 250 19 238 Z";
  const inner = "M24 232 C22 202 22 80 24 55 C25 43 31 35 41 31 C45 29 46 25 46 20 H54 C54 25 55 29 59 31 C69 35 75 43 76 55 C78 80 78 202 76 232 Z";

  return `<div class="tube-slot" aria-label="${escapeAttr(character === " " ? "blank" : character)}">
    <svg class="tube-svg" viewBox="0 0 100 286" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="glass-fill-${id}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#68818e" stop-opacity=".10"/>
          <stop offset="5%" stop-color="#dff6ff" stop-opacity=".34"/>
          <stop offset="11%" stop-color="#ffffff" stop-opacity=".76"/>
          <stop offset="17%" stop-color="${escapeAttr(config.glass_tint)}" stop-opacity=".25"/>
          <stop offset="29%" stop-color="#738994" stop-opacity=".035"/>
          <stop offset="49%" stop-color="#ffffff" stop-opacity=".018"/>
          <stop offset="67%" stop-color="#7f97a2" stop-opacity=".045"/>
          <stop offset="82%" stop-color="#effbff" stop-opacity=".29"/>
          <stop offset="89%" stop-color="#ffffff" stop-opacity=".61"/>
          <stop offset="96%" stop-color="#9eb9c5" stop-opacity=".14"/>
          <stop offset="100%" stop-color="#4e6671" stop-opacity=".08"/>
        </linearGradient>
        <linearGradient id="glass-edge-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity=".88"/>
          <stop offset="12%" stop-color="#d9eff8" stop-opacity=".56"/>
          <stop offset="56%" stop-color="#72909e" stop-opacity=".15"/>
          <stop offset="88%" stop-color="#dff7ff" stop-opacity=".44"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity=".68"/>
        </linearGradient>
        <linearGradient id="base-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#666b70"/>
          <stop offset="5%" stop-color="#2b2e31"/>
          <stop offset="17%" stop-color="#111315"/>
          <stop offset="58%" stop-color="#020303"/>
          <stop offset="82%" stop-color="#0d0f10"/>
          <stop offset="100%" stop-color="#303438"/>
        </linearGradient>
        <linearGradient id="mica-${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fff9ee" stop-opacity=".82"/>
          <stop offset="24%" stop-color="#aaa49a" stop-opacity=".45"/>
          <stop offset="52%" stop-color="#625e58" stop-opacity=".24"/>
          <stop offset="82%" stop-color="#f4ede1" stop-opacity=".67"/>
          <stop offset="100%" stop-color="#8d8982" stop-opacity=".35"/>
        </linearGradient>
        <radialGradient id="warm-${id}" cx="50%" cy="52%" r="58%">
          <stop offset="0%" stop-color="${escapeAttr(config.core_color)}" stop-opacity=".86"/>
          <stop offset="18%" stop-color="${escapeAttr(config.tube_color)}" stop-opacity=".55"/>
          <stop offset="58%" stop-color="#e53600" stop-opacity=".16"/>
          <stop offset="100%" stop-color="#6d0c00" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="base-warm-${id}" cx="50%" cy="0%" r="82%">
          <stop offset="0%" stop-color="#ff6a16" stop-opacity=".43"/>
          <stop offset="42%" stop-color="#c42c00" stop-opacity=".11"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0"/>
        </radialGradient>
        <pattern id="mesh-${id}" width="7.4" height="6.4" patternUnits="userSpaceOnUse">
          <path d="M1.85 0 H5.55 L7.4 3.2 L5.55 6.4 H1.85 L0 3.2 Z" fill="#171817" fill-opacity=".08" stroke="#aaa49a" stroke-width=".48" opacity="${Number(config.mesh_opacity)}"/>
        </pattern>
        <filter id="glass-shadow-${id}" x="-65%" y="-30%" width="230%" height="195%"><feDropShadow dx="0" dy="7" stdDeviation="5.3" flood-color="#000" flood-opacity=".94"/></filter>
        <filter id="glow-far-${id}" x="-190%" y="-190%" width="480%" height="480%"><feGaussianBlur stdDeviation="7.2"/></filter>
        <filter id="glow-wide-${id}" x="-160%" y="-160%" width="420%" height="420%"><feGaussianBlur stdDeviation="4.0"/></filter>
        <filter id="glow-mid-${id}" x="-130%" y="-130%" width="360%" height="360%"><feGaussianBlur stdDeviation="1.65"/></filter>
        <filter id="soft-${id}" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="1.5"/></filter>
        ${glassNoise(id)}
        <clipPath id="inside-${id}"><path d="${inner}"/></clipPath>
        <clipPath id="cathode-window-${id}"><rect x="26" y="70" width="48" height="137" rx="2"/></clipPath>
      </defs>

      <ellipse cx="50" cy="249" rx="43" ry="24" fill="url(#warm-${id})" opacity="${active ? ".52" : ".09"}"/>
      <g filter="url(#glass-shadow-${id})"><path d="${outer}" fill="#030506" fill-opacity=".36" stroke="#0a0d0e" stroke-width="1.8"/></g>

      <g clip-path="url(#inside-${id})">
        <rect x="22" y="50" width="56" height="184" fill="#030404" opacity=".48"/>
        <ellipse cx="50" cy="48" rx="26" ry="6.4" fill="url(#mica-${id})" opacity=".78"/>
        <path d="M26 49 C34 44 66 44 74 49 L72 59 C63 64 37 64 28 59 Z" fill="url(#mica-${id})" opacity=".57"/>
        <ellipse cx="50" cy="63" rx="23" ry="4.8" fill="#d7d0c4" opacity=".28"/>
        <ellipse cx="50" cy="219" rx="25" ry="6" fill="url(#mica-${id})" opacity=".63"/>
        <path d="M26 215 C35 210 65 210 74 215 L72 224 C63 228 37 228 28 224 Z" fill="url(#mica-${id})" opacity=".40"/>

        <g class="support-wires">
          <path d="M29 53 L28 223 M71 53 L72 223"/>
          <path d="M34 58 L34 221 M66 58 L66 221" opacity=".7"/>
          <path d="M39 60 L38 221 M61 60 L62 221" opacity=".32"/>
          <path d="M26 69 C37 64 63 64 74 69 M26 205 C37 211 63 211 74 205" opacity=".62"/>
          <path d="M31 79 C42 75 58 75 69 79 M31 196 C42 200 58 200 69 196" opacity=".30"/>
        </g>

        <rect x="26" y="68" width="48" height="139" fill="url(#mesh-${id})" opacity=".80"/>
        <path d="M26 68 H74 M26 207 H74" stroke="#b5aea3" stroke-width="1.05" opacity=".53"/>

        <g clip-path="url(#cathode-window-${id})">
          <g transform="${glyphTransform(character)}">
            ${ghostCathodes(character, config)}
            <path d="${path}" class="cathode-shadow" opacity="${active}"/>
            <path d="${path}" class="cathode-far" filter="url(#glow-far-${id})" opacity="${active}"/>
            <path d="${path}" class="cathode-aura" filter="url(#glow-wide-${id})" opacity="${active}"/>
            <path d="${path}" class="cathode-glow" filter="url(#glow-mid-${id})" opacity="${active}"/>
            <path d="${path}" class="cathode-hot" opacity="${active}"/>
            <path d="${path}" class="cathode-core" opacity="${active}"/>
            <path d="${path}" class="cathode-beads" opacity="${active}"/>
            <path d="${path}" class="cathode-spark" opacity="${active}"/>
          </g>
        </g>

        <rect x="25" y="68" width="50" height="140" fill="url(#warm-${id})" opacity="${active ? ".09" : ".012"}"/>
        <g class="bottom-leads"><path d="M30 219 L29 248 M37 220 L37 249 M44 221 L44 250 M50 221 L50 250 M56 221 L56 250 M63 220 L63 249 M70 219 L71 248"/></g>
        <ellipse cx="50" cy="231" rx="25" ry="6.5" fill="#ff4e08" opacity="${active ? ".22" : ".025"}" filter="url(#soft-${id})"/>
      </g>

      <path d="${outer}" fill="url(#glass-fill-${id})" fill-opacity="${Number(config.glass_opacity)}" stroke="url(#glass-edge-${id})" stroke-opacity=".82" stroke-width="1.15" filter="url(#glass-noise-${id})"/>
      <path d="M25 50 C23 82 23 205 25 231" fill="none" stroke="#ffffff" stroke-width="5.2" stroke-linecap="round" opacity=".25"/>
      <path d="M29 45 C27 82 27 184 29 213" fill="none" stroke="#dff8ff" stroke-width="1.35" stroke-linecap="round" opacity=".63"/>
      <path d="M33 31 C27 35 24 41 23 50" fill="none" stroke="#ffffff" stroke-width="2.15" stroke-linecap="round" opacity=".88"/>
      <path d="M39 25 C43 22 57 22 61 25" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity=".46"/>
      <path d="M72 45 C77 69 77 101 77 125" fill="none" stroke="#f3fcff" stroke-width="2.6" stroke-linecap="round" opacity=".28"/>
      <path d="M74 133 C76 163 76 205 73 226" fill="none" stroke="#cdeefa" stroke-width="1.2" stroke-linecap="round" opacity=".18"/>
      <path d="M31 234 C39 239 61 239 69 234" fill="none" stroke="#ffffff" stroke-width="1.2" opacity=".28"/>
      <ellipse cx="50" cy="10" rx="3.1" ry="6.4" fill="#ffffff" opacity=".51"/>
      <ellipse cx="47.5" cy="7.2" rx="1.2" ry="2.4" fill="#ffffff" opacity=".92"/>
      <ellipse cx="47" cy="31" rx="10" ry="2.6" fill="#ffffff" opacity=".23"/>

      <ellipse cx="50" cy="239" rx="34" ry="7.8" fill="#303438" stroke="#747a7f" stroke-width="1"/>
      <ellipse cx="50" cy="238" rx="27" ry="4.5" fill="url(#base-warm-${id})" opacity="${active ? ".82" : ".08"}"/>
      <path d="M15 239 C19 246 81 246 85 239 L85 266 C77 276 23 276 15 266 Z" fill="url(#base-${id})" stroke="#050606" stroke-width="1.2"/>
      <path d="M20 246 C34 250 66 250 80 246" fill="none" stroke="#ffffff" stroke-width="1" opacity=".12"/>
      <path d="M18 261 C34 266 66 266 82 261" fill="none" stroke="#000" stroke-width="2" opacity=".75"/>
      <ellipse cx="50" cy="266" rx="35" ry="7.5" fill="#020303" stroke="#2c3033" stroke-width="1"/>
      <g class="tube-pins"><path d="M28 269 L28 283 M35 270 L35 284 M42 270 L42 285 M50 270 L50 285 M58 270 L58 285 M65 270 L65 284 M72 269 L72 283"/></g>
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
    ? `<circle cx="36" cy="111" r="9.5" class="separator-ring"/><circle cx="36" cy="111" r="6.2" class="separator-ring-core"/>`
    : isColon
      ? `<circle cx="36" cy="112" r="6" class="separator-dot"/><circle cx="36" cy="160" r="6" class="separator-dot"/>${isComma ? '<path d="M39 166 C42 180 35 191 25 198" class="separator-tail"/>' : ''}`
      : `<circle cx="36" cy="173" r="6.4" class="separator-dot"/>${isComma ? '<path d="M40 180 C43 196 36 207 24 214" class="separator-tail"/>' : ''}`;

  const outer = "M14 238 C12 207 12 78 14 52 C15 38 21 28 30 23 C33 21 34 17 34 12 C34 6 35 3 36 3 C38 3 39 6 39 12 C39 17 40 21 43 23 C52 28 58 38 59 52 C61 78 61 207 59 238 C58 250 15 250 14 238 Z";
  const inside = "M18 232 C16 203 16 82 18 56 C19 44 24 36 31 32 C34 30 34 27 34 22 H39 C39 27 39 30 42 32 C49 36 54 44 55 56 C57 82 57 203 55 232 Z";

  return `<div class="separator-slot" aria-label="${escapeAttr(character)}">
    <svg class="separator-svg" viewBox="0 0 72 286" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="sep-glass-${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#76909d" stop-opacity=".08"/><stop offset="9%" stop-color="#fff" stop-opacity=".70"/><stop offset="18%" stop-color="${escapeAttr(config.glass_tint)}" stop-opacity=".23"/><stop offset="66%" stop-color="#839da9" stop-opacity=".04"/><stop offset="86%" stop-color="#fff" stop-opacity=".53"/><stop offset="100%" stop-color="#5a707b" stop-opacity=".08"/></linearGradient>
        <linearGradient id="sep-base-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5a5f64"/><stop offset="8%" stop-color="#24272a"/><stop offset="24%" stop-color="#0d0f10"/><stop offset="76%" stop-color="#020303"/><stop offset="100%" stop-color="#2a2e31"/></linearGradient>
        <pattern id="sep-mesh-${id}" width="6.2" height="5.37" patternUnits="userSpaceOnUse"><path d="M1.55 0 H4.65 L6.2 2.685 L4.65 5.37 H1.55 L0 2.685 Z" fill="#151615" fill-opacity=".08" stroke="#aaa49a" stroke-width=".42" opacity="${Number(config.mesh_opacity)}"/></pattern>
        <filter id="sep-glow-far-${id}" x="-220%" y="-220%" width="540%" height="540%"><feGaussianBlur stdDeviation="6.6"/></filter>
        <filter id="sep-glow-${id}" x="-190%" y="-190%" width="480%" height="480%"><feGaussianBlur stdDeviation="3.2"/></filter>
        <filter id="sep-shadow-${id}" x="-100%" y="-35%" width="300%" height="205%"><feDropShadow dx="0" dy="6" stdDeviation="3.4" flood-color="#000" flood-opacity=".92"/></filter>
        <clipPath id="sep-inside-${id}"><path d="${inside}"/></clipPath>
      </defs>
      ${bare ? "" : `<g filter="url(#sep-shadow-${id})"><path d="${outer}" fill="#030506" fill-opacity=".40" stroke="#0a0d0e" stroke-width="1.1"/></g>`}
      ${bare ? "" : `<g clip-path="url(#sep-inside-${id})"><rect x="18" y="63" width="37" height="170" fill="#030404" opacity=".46"/><rect x="20" y="72" width="33" height="143" fill="url(#sep-mesh-${id})" opacity=".80"/><path d="M22 61 L22 232 M50 61 L50 232" stroke="#aaa49a" stroke-width=".8" opacity=".58"/><path d="M27 65 L27 229 M45 65 L45 229" stroke="#8e887f" stroke-width=".6" opacity=".32"/><ellipse cx="36" cy="58" rx="16" ry="4.3" fill="#d9d2c7" opacity=".48"/><ellipse cx="36" cy="221" rx="16" ry="4.3" fill="#d9d2c7" opacity=".40"/></g>`}
      <g class="separator-far" filter="url(#sep-glow-far-${id})">${marks}</g><g class="separator-aura" filter="url(#sep-glow-${id})">${marks}</g><g>${marks}</g>
      ${bare ? "" : `<path d="${outer}" fill="url(#sep-glass-${id})" fill-opacity="${Number(config.glass_opacity)}" stroke="#e4f5fb" stroke-opacity=".72" stroke-width=".95"/><path d="M19 56 C17 94 17 207 19 230" fill="none" stroke="#fff" stroke-width="3.3" stroke-linecap="round" opacity=".31"/><path d="M23 40 C19 45 17 51 16 59" fill="none" stroke="#fff" stroke-width="1.55" stroke-linecap="round" opacity=".80"/><path d="M52 50 C56 73 56 104 56 129" fill="none" stroke="#eafaff" stroke-width="1.5" opacity=".24"/><ellipse cx="36" cy="12" rx="2.4" ry="5.2" fill="#fff" opacity=".48"/><ellipse cx="36" cy="239" rx="23" ry="5.7" fill="#303438" stroke="#6b7075" stroke-width=".8"/><path d="M12 239 C16 246 56 246 60 239 L60 266 C55 275 17 275 12 266 Z" fill="url(#sep-base-${id})" stroke="#050606" stroke-width=".9"/><ellipse cx="36" cy="266" rx="24" ry="5.8" fill="#020303" stroke="#292d30" stroke-width=".8"/><path d="M24 269 L24 283 M30 269 L30 284 M36 269 L36 285 M42 269 L42 284 M48 269 L48 283" stroke="#746b61" stroke-width="1.1" opacity=".78"/>`}
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
  const gapVw = Math.max(.05, Math.min(1.05, gapPx / 11)).toFixed(2);
  const animation = config.animate === false ? "none" : `tube-enter ${animationMs}ms cubic-bezier(.22,1,.36,1)`;
  const analogFrame = config.screws === true ? `
    .device.panel:after{content:"";position:absolute;inset:0;z-index:18;pointer-events:none;border:clamp(35px,5.2vw,64px) solid transparent;border-image-source:url("/hacsfiles/analog-gauge-card/assets/base.webp");border-image-slice:135;border-image-width:clamp(35px,5.2vw,64px);border-image-repeat:stretch;filter:saturate(.95) contrast(1.04) brightness(.99);border-radius:inherit}
    .device.panel .screw{z-index:17}
  ` : `
    .device.panel:after{content:"";position:absolute;inset:0;z-index:18;pointer-events:none;border-radius:inherit;border:1px solid rgba(255,255,255,.10);box-shadow:inset 0 2px 0 rgba(255,255,255,.06),inset 0 -2px 0 rgba(0,0,0,.95)}
  `;

  return `<style>
    :host{display:block;width:100%;min-width:0}
    ha-card{width:100%;min-width:0;background:transparent;border:0;box-shadow:none;overflow:hidden}
    .device{--tube:${escapeCss(config.tube_color)};--core:${escapeCss(config.core_color)};position:relative;width:min(100%,${maxWidth}px);min-width:0;margin:0 auto;box-sizing:border-box;user-select:none;-webkit-tap-highlight-color:transparent;cursor:${config.entity ? "pointer" : "default"};filter:brightness(${brightness});isolation:isolate}
    .device.free{padding:4px 4px 15px}
    .device.panel{padding:clamp(28px,4vw,52px) clamp(25px,4.6vw,62px) clamp(31px,4.1vw,54px);border-radius:clamp(22px,3vw,38px);background:radial-gradient(ellipse at 50% -14%,rgba(255,255,255,.095),transparent 35%),repeating-linear-gradient(116deg,rgba(255,255,255,.008) 0 1px,transparent 1px 4px),linear-gradient(180deg,#191c1e 0%,${escapeCss(config.panel_edge)} 4%,${escapeCss(config.panel_color)} 14%,#070808 84%,#171a1c 96%,#050606 100%);border:1px solid rgba(255,255,255,.08);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.96),inset 0 0 42px rgba(0,0,0,.34),0 18px 40px rgba(0,0,0,.52),0 4px 8px rgba(0,0,0,.78)}
    .device.panel:before{content:"";position:absolute;inset:clamp(30px,5.1vw,62px);z-index:0;border-radius:clamp(13px,1.8vw,23px);background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.035),transparent 31%),repeating-linear-gradient(116deg,rgba(255,255,255,.006) 0 1px,transparent 1px 4px),linear-gradient(180deg,#101214,#070808 70%,#050606);border:1px solid rgba(255,255,255,.055);box-shadow:inset 0 1px 0 rgba(255,255,255,.03),inset 0 -1px 0 rgba(0,0,0,.92);pointer-events:none}
    ${analogFrame}
    .caption{position:relative;z-index:8;text-align:center;margin:0 8% clamp(12px,1.9vw,24px);letter-spacing:.20em;line-height:1.16;text-transform:uppercase;text-shadow:0 2px 2px #000,0 0 14px rgba(255,255,255,.06)}
    .title{display:inline-block;font:500 clamp(13px,2vw,24px)/1.12 Arial,Helvetica,sans-serif;background:linear-gradient(180deg,#ffffff 0%,#d9dcdf 25%,#91969a 47%,#53575b 52%,#dfe1e3 79%,#8b9094 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 1px 0 #000) drop-shadow(0 0 1px rgba(255,255,255,.35))}
    .subtitle{margin-top:6px;font:400 clamp(8px,1.2vw,12px)/1.2 Arial,Helvetica,sans-serif;color:rgba(194,198,202,.54);letter-spacing:.18em}
    .tube-row{position:relative;z-index:5;display:flex;align-items:flex-end;justify-content:${justify};gap:clamp(1px,${gapVw}vw,${gapPx}px);width:100%;min-width:0;box-sizing:border-box;padding:0 clamp(1px,.45vw,6px)}
    .tube-slot{flex:1 1 0;min-width:0;max-width:126px;aspect-ratio:100/286;animation:${animation};filter:drop-shadow(0 8px 6px rgba(0,0,0,.72)) drop-shadow(0 0 7px rgba(255,78,0,.055))}
    .tube-slot-empty{opacity:0}
    .separator-slot{flex:.62 1 0;min-width:10px;max-width:82px;aspect-ratio:72/286;animation:${animation};filter:drop-shadow(0 8px 6px rgba(0,0,0,.68)) drop-shadow(0 0 6px rgba(255,78,0,.05))}
    .tube-svg,.separator-svg{display:block;width:100%;height:auto;overflow:visible;shape-rendering:geometricPrecision;text-rendering:geometricPrecision}
    .support-wires,.bottom-leads{fill:none;stroke:#aaa39a;stroke-width:.86;stroke-linecap:round;opacity:.68;filter:drop-shadow(0 0 .45px rgba(255,205,150,.28))}
    .tube-pins{fill:none;stroke:#857a6e;stroke-width:1.22;stroke-linecap:round;opacity:.82}
    .cathode-ghost{fill:none;stroke:#73685e;stroke-width:1.08;stroke-linecap:round;stroke-linejoin:round}
    .cathode-shadow{fill:none;stroke:#160300;stroke-width:7.8;stroke-linecap:round;stroke-linejoin:round;opacity:.96}
    .cathode-far{fill:none;stroke:#ff3d00;stroke-width:11.2;stroke-linecap:round;stroke-linejoin:round;opacity:.27;mix-blend-mode:screen}
    .cathode-aura{fill:none;stroke:var(--tube);stroke-width:8.6;stroke-linecap:round;stroke-linejoin:round;opacity:.68;mix-blend-mode:screen}
    .cathode-glow{fill:none;stroke:#ff5208;stroke-width:5.3;stroke-linecap:round;stroke-linejoin:round;opacity:.98;mix-blend-mode:screen}
    .cathode-hot{fill:none;stroke:#ff761d;stroke-width:3.45;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 1.2px #ff3600)}
    .cathode-core{fill:none;stroke:var(--core);stroke-width:1.45;stroke-linecap:round;stroke-linejoin:round;opacity:1;filter:drop-shadow(0 0 .75px #fff2cf)}
    .cathode-beads{fill:none;stroke:#fff8e9;stroke-width:1.42;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:.001 2.05;opacity:.87;mix-blend-mode:screen}
    .cathode-spark{fill:none;stroke:#ffffff;stroke-width:.66;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:.001 5.4;opacity:.84;mix-blend-mode:screen}
    .separator-far{opacity:.28;fill:var(--tube);stroke:var(--tube)}
    .separator-aura{opacity:.78;fill:var(--tube);stroke:var(--tube)}
    .separator-dot{fill:#ff6814;stroke:var(--core);stroke-width:1.45;filter:drop-shadow(0 0 2px #ff3c00)}
    .separator-ring{fill:none;stroke:#ff5e0d;stroke-width:5.2;filter:drop-shadow(0 0 2px #ff3c00)}
    .separator-ring-core{fill:none;stroke:var(--core);stroke-width:1.4;opacity:.98}
    .separator-tail{fill:none;stroke:#ff6412;stroke-width:4.5;stroke-linecap:round;filter:drop-shadow(0 0 2px #ff3c00)}
    .base-board{position:relative;z-index:3;width:98.5%;height:clamp(29px,4vw,48px);margin:clamp(-21px,-2vw,-11px) auto 0;border-radius:clamp(8px,1.05vw,13px);background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.10),transparent 30%),linear-gradient(180deg,#44484c 0%,#202326 8%,#111315 22%,#070808 72%,#010202 100%);border:1px solid rgba(255,255,255,.09);box-shadow:inset 0 2px 0 rgba(255,255,255,.10),inset 0 -5px 8px rgba(0,0,0,.94),0 13px 18px rgba(0,0,0,.64)}
    .base-board:before{content:"";position:absolute;left:2%;right:2%;top:3%;height:25%;border-radius:50%;background:linear-gradient(90deg,transparent,rgba(255,125,31,.22),transparent);filter:blur(6px);opacity:.72}
    .base-board:after{content:"";position:absolute;left:4%;right:4%;bottom:-12px;height:13px;border-radius:0 0 11px 11px;background:linear-gradient(180deg,#111315,#010202);box-shadow:0 9px 13px rgba(0,0,0,.62)}
    .screw{position:absolute;z-index:17;width:clamp(19px,3.1vw,35px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 31% 25%,rgba(255,255,255,.24),transparent 18%),radial-gradient(circle at 50% 56%,#181b1d 0 29%,#020303 52%,#303438 72%,#040505 100%);border:1px solid rgba(255,255,255,.10);box-shadow:inset 0 1px 2px rgba(255,255,255,.12),inset 0 -3px 5px #000,0 4px 7px rgba(0,0,0,.86)}
    .screw:before,.screw:after{content:"";position:absolute;left:17%;right:17%;top:44%;height:12%;border-radius:2px;background:linear-gradient(180deg,#010202,#303438 44%,#000 57%);box-shadow:inset 0 1px 0 rgba(255,255,255,.09)}
    .screw:after{transform:rotate(90deg)}
    .screw-tl{left:clamp(9px,1.4vw,18px);top:clamp(9px,1.4vw,18px);transform:rotate(8deg)}
    .screw-tr{right:clamp(9px,1.4vw,18px);top:clamp(9px,1.4vw,18px);transform:rotate(-6deg)}
    .screw-bl{left:clamp(9px,1.4vw,18px);bottom:clamp(9px,1.4vw,18px);transform:rotate(4deg)}
    .screw-br{right:clamp(9px,1.4vw,18px);bottom:clamp(9px,1.4vw,18px);transform:rotate(-11deg)}
    @keyframes tube-enter{from{opacity:.28;transform:translateY(4px) scale(.988);filter:brightness(.62) saturate(.7)}to{opacity:1;transform:translateY(0) scale(1);filter:brightness(1) saturate(1)}}
    @media(max-width:620px){.device.panel{padding:25px 21px 32px}.device.panel:before{inset:34px}.caption{margin-bottom:10px;letter-spacing:.13em}.tube-row{gap:clamp(1px,.34vw,4px)}.screw{width:18px}.base-board{height:29px;margin-top:-12px}.tube-slot{max-width:114px}.separator-slot{max-width:72px}}
    @media(max-width:390px){.device.panel{padding:22px 16px 29px;border-radius:17px}.device.panel:before{inset:24px}.caption{margin-left:11%;margin-right:11%;letter-spacing:.09em}.title{font-size:12px}.screw{width:15px}.separator-slot{min-width:7px}.tube-row{padding:0}}
    @media(prefers-reduced-motion:reduce){.tube-slot,.separator-slot{animation:none!important}}
  </style>`;
}


const VERSION = "0.3.1";
const DEFAULT_CONFIG = Object.freeze({
  text:"HELLO",attribute:null,prefix:"",suffix:"",title:"",subtitle:"",unit:"",unit_separator:" ",
  decimals:null,decimal_separator:"auto",unavailable_text:"----",unknown_text:"----",
  min_characters:0,max_characters:12,pad:"left",pad_character:" ",overflow:"left",
  show_blank_tubes:true,show_cathode_stack:true,separator_style:"mini_tube",align:"center",
  mounting:"free",screws:false,max_width:1200,tube_gap:7,tube_color:"#ff5000",core_color:"#fff1cf",
  glass_tint:"#dff6ff",glass_opacity:.62,mesh_opacity:.40,pcb_color:"#0b0d0c",panel_color:"#08090a",
  panel_edge:"#272b2e",brightness:1,animate:true,animation_speed:480,tap_action:{action:"more-info"}
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
  getCardSize(){return this._config?.title||this._config?.subtitle?6:5}
  getGridOptions(){return{rows:6,columns:12,min_rows:4,min_columns:3}}

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
window.customCards=window.customCards||[];if(!window.customCards.some(card=>card.type==="glass-tube-display-card"))window.customCards.push({type:"glass-tube-display-card",name:"Glass Tube Display Card",description:"High-gloss photorealistic alphanumeric glass-tube display with separate punctuation tubes.",preview:true,documentationURL:"https://github.com/loungelizard2018/glass-tube-display-card"});
console.info(`%c GLASS-TUBE-DISPLAY-CARD %c v${VERSION} `,"color:#ff8a2b;background:#161616;font-weight:700;padding:3px 5px;border-radius:3px 0 0 3px","color:#ddd;background:#333;padding:3px 5px;border-radius:0 3px 3px 0");

})();
