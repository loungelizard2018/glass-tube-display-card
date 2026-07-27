import { glyphPath } from "./glyphs.js";

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

export function renderTube(character, index, config, uid) {
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
        <linearGradient id="glass-fill-${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#68818e" stop-opacity=".10"/><stop offset="5%" stop-color="#dff6ff" stop-opacity=".34"/><stop offset="11%" stop-color="#ffffff" stop-opacity=".76"/><stop offset="17%" stop-color="${escapeAttr(config.glass_tint)}" stop-opacity=".25"/><stop offset="29%" stop-color="#738994" stop-opacity=".035"/><stop offset="49%" stop-color="#ffffff" stop-opacity=".018"/><stop offset="67%" stop-color="#7f97a2" stop-opacity=".045"/><stop offset="82%" stop-color="#effbff" stop-opacity=".29"/><stop offset="89%" stop-color="#ffffff" stop-opacity=".61"/><stop offset="96%" stop-color="#9eb9c5" stop-opacity=".14"/><stop offset="100%" stop-color="#4e6671" stop-opacity=".08"/></linearGradient>
        <linearGradient id="glass-edge-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".88"/><stop offset="12%" stop-color="#d9eff8" stop-opacity=".56"/><stop offset="56%" stop-color="#72909e" stop-opacity=".15"/><stop offset="88%" stop-color="#dff7ff" stop-opacity=".44"/><stop offset="100%" stop-color="#ffffff" stop-opacity=".68"/></linearGradient>
        <linearGradient id="base-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#666b70"/><stop offset="5%" stop-color="#2b2e31"/><stop offset="17%" stop-color="#111315"/><stop offset="58%" stop-color="#020303"/><stop offset="82%" stop-color="#0d0f10"/><stop offset="100%" stop-color="#303438"/></linearGradient>
        <linearGradient id="mica-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff9ee" stop-opacity=".82"/><stop offset="24%" stop-color="#aaa49a" stop-opacity=".45"/><stop offset="52%" stop-color="#625e58" stop-opacity=".24"/><stop offset="82%" stop-color="#f4ede1" stop-opacity=".67"/><stop offset="100%" stop-color="#8d8982" stop-opacity=".35"/></linearGradient>
        <radialGradient id="warm-${id}" cx="50%" cy="52%" r="58%"><stop offset="0%" stop-color="${escapeAttr(config.core_color)}" stop-opacity=".86"/><stop offset="18%" stop-color="${escapeAttr(config.tube_color)}" stop-opacity=".55"/><stop offset="58%" stop-color="#e53600" stop-opacity=".16"/><stop offset="100%" stop-color="#6d0c00" stop-opacity="0"/></radialGradient>
        <radialGradient id="base-warm-${id}" cx="50%" cy="0%" r="82%"><stop offset="0%" stop-color="#ff6a16" stop-opacity=".43"/><stop offset="42%" stop-color="#c42c00" stop-opacity=".11"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>
        <pattern id="mesh-${id}" width="7.4" height="6.4" patternUnits="userSpaceOnUse"><path d="M1.85 0 H5.55 L7.4 3.2 L5.55 6.4 H1.85 L0 3.2 Z" fill="#171817" fill-opacity=".08" stroke="#aaa49a" stroke-width=".48" opacity="${Number(config.mesh_opacity)}"/></pattern>
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
        <g class="support-wires"><path d="M29 53 L28 223 M71 53 L72 223"/><path d="M34 58 L34 221 M66 58 L66 221" opacity=".7"/><path d="M39 60 L38 221 M61 60 L62 221" opacity=".32"/><path d="M26 69 C37 64 63 64 74 69 M26 205 C37 211 63 211 74 205" opacity=".62"/><path d="M31 79 C42 75 58 75 69 79 M31 196 C42 200 58 200 69 196" opacity=".30"/></g>
        <rect x="26" y="68" width="48" height="139" fill="url(#mesh-${id})" opacity=".80"/>
        <path d="M26 68 H74 M26 207 H74" stroke="#b5aea3" stroke-width="1.05" opacity=".53"/>
        <g clip-path="url(#cathode-window-${id})"><g transform="${glyphTransform(character)}">${ghostCathodes(character, config)}<path d="${path}" class="cathode-shadow" opacity="${active}"/><path d="${path}" class="cathode-far" filter="url(#glow-far-${id})" opacity="${active}"/><path d="${path}" class="cathode-aura" filter="url(#glow-wide-${id})" opacity="${active}"/><path d="${path}" class="cathode-glow" filter="url(#glow-mid-${id})" opacity="${active}"/><path d="${path}" class="cathode-hot" opacity="${active}"/><path d="${path}" class="cathode-core" opacity="${active}"/><path d="${path}" class="cathode-beads" opacity="${active}"/><path d="${path}" class="cathode-spark" opacity="${active}"/></g></g>
        <rect x="25" y="68" width="50" height="140" fill="url(#warm-${id})" opacity="${active ? ".09" : ".012"}"/>
        <g class="bottom-leads"><path d="M30 219 L29 248 M37 220 L37 249 M44 221 L44 250 M50 221 L50 250 M56 221 L56 250 M63 220 L63 249 M70 219 L71 248"/></g>
        <ellipse cx="50" cy="231" rx="25" ry="6.5" fill="#ff4e08" opacity="${active ? ".22" : ".025"}" filter="url(#soft-${id})"/>
      </g>
      <path d="${outer}" fill="url(#glass-fill-${id})" fill-opacity="${Number(config.glass_opacity)}" stroke="url(#glass-edge-${id})" stroke-opacity=".82" stroke-width="1.15" filter="url(#glass-noise-${id})"/>
      <path d="M25 50 C23 82 23 205 25 231" fill="none" stroke="#ffffff" stroke-width="5.2" stroke-linecap="round" opacity=".25"/><path d="M29 45 C27 82 27 184 29 213" fill="none" stroke="#dff8ff" stroke-width="1.35" stroke-linecap="round" opacity=".63"/><path d="M33 31 C27 35 24 41 23 50" fill="none" stroke="#ffffff" stroke-width="2.15" stroke-linecap="round" opacity=".88"/><path d="M39 25 C43 22 57 22 61 25" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity=".46"/><path d="M72 45 C77 69 77 101 77 125" fill="none" stroke="#f3fcff" stroke-width="2.6" stroke-linecap="round" opacity=".28"/><path d="M74 133 C76 163 76 205 73 226" fill="none" stroke="#cdeefa" stroke-width="1.2" stroke-linecap="round" opacity=".18"/><path d="M31 234 C39 239 61 239 69 234" fill="none" stroke="#ffffff" stroke-width="1.2" opacity=".28"/><ellipse cx="50" cy="10" rx="3.1" ry="6.4" fill="#ffffff" opacity=".51"/><ellipse cx="47.5" cy="7.2" rx="1.2" ry="2.4" fill="#ffffff" opacity=".92"/><ellipse cx="47" cy="31" rx="10" ry="2.6" fill="#ffffff" opacity=".23"/>
      <ellipse cx="50" cy="239" rx="34" ry="7.8" fill="#303438" stroke="#747a7f" stroke-width="1"/><ellipse cx="50" cy="238" rx="27" ry="4.5" fill="url(#base-warm-${id})" opacity="${active ? ".82" : ".08"}"/><path d="M15 239 C19 246 81 246 85 239 L85 266 C77 276 23 276 15 266 Z" fill="url(#base-${id})" stroke="#050606" stroke-width="1.2"/><path d="M20 246 C34 250 66 250 80 246" fill="none" stroke="#ffffff" stroke-width="1" opacity=".12"/><path d="M18 261 C34 266 66 266 82 261" fill="none" stroke="#000" stroke-width="2" opacity=".75"/><ellipse cx="50" cy="266" rx="35" ry="7.5" fill="#020303" stroke="#2c3033" stroke-width="1"/><g class="tube-pins"><path d="M28 269 L28 283 M35 270 L35 284 M42 270 L42 285 M50 270 L50 285 M58 270 L58 285 M65 270 L65 284 M72 269 L72 283"/></g>
    </svg>
  </div>`;
}

export function renderSeparator(character, index, config, uid) {
  const id = `${uid}-sep-${index}`;
  const bare = String(config.separator_style).toLowerCase() === "bare";
  const isColon = character === ":" || character === ";";
  const isComma = character === "," || character === ";";
  const isDegree = character === "°";
  const commaPath = `<path d="M38 174 C43 171 48 173 48 178 C48 182 45 185 40 187 C40 192 37 197 32 201" class="separator-comma"/>`;
  const marks = isDegree
    ? `<circle cx="38" cy="112" r="9.5" class="separator-ring"/><circle cx="38" cy="112" r="6.1" class="separator-ring-core"/>`
    : isColon
      ? `<circle cx="38" cy="116" r="5.7" class="separator-dot"/>${isComma ? commaPath : '<circle cx="38" cy="163" r="5.7" class="separator-dot"/>'}`
      : isComma ? commaPath : `<circle cx="38" cy="176" r="5.9" class="separator-dot"/>`;

  const outer = "M14 238 C12 207 12 78 14 52 C15 38 21 28 31 23 C35 21 36 17 36 12 C36 6 37 3 38 3 C40 3 41 6 41 12 C41 17 42 21 46 23 C56 28 62 38 63 52 C65 78 65 207 63 238 C62 250 15 250 14 238 Z";
  const inside = "M18 232 C16 203 16 82 18 56 C19 44 24 36 32 32 C36 30 36 27 36 22 H41 C41 27 41 30 45 32 C53 36 58 44 59 56 C61 82 61 203 59 232 Z";

  return `<div class="separator-slot" aria-label="${escapeAttr(character)}">
    <svg class="separator-svg" viewBox="0 0 76 286" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="sep-glass-${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#76909d" stop-opacity=".08"/><stop offset="9%" stop-color="#fff" stop-opacity=".70"/><stop offset="18%" stop-color="${escapeAttr(config.glass_tint)}" stop-opacity=".23"/><stop offset="66%" stop-color="#839da9" stop-opacity=".04"/><stop offset="86%" stop-color="#fff" stop-opacity=".53"/><stop offset="100%" stop-color="#5a707b" stop-opacity=".08"/></linearGradient>
        <linearGradient id="sep-base-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5a5f64"/><stop offset="8%" stop-color="#24272a"/><stop offset="24%" stop-color="#0d0f10"/><stop offset="76%" stop-color="#020303"/><stop offset="100%" stop-color="#2a2e31"/></linearGradient>
        <pattern id="sep-mesh-${id}" width="6.2" height="5.37" patternUnits="userSpaceOnUse"><path d="M1.55 0 H4.65 L6.2 2.685 L4.65 5.37 H1.55 L0 2.685 Z" fill="#151615" fill-opacity=".08" stroke="#aaa49a" stroke-width=".42" opacity="${Number(config.mesh_opacity)}"/></pattern>
        <filter id="sep-glow-far-${id}" x="-220%" y="-220%" width="540%" height="540%"><feGaussianBlur stdDeviation="5.8"/></filter><filter id="sep-glow-${id}" x="-190%" y="-190%" width="480%" height="480%"><feGaussianBlur stdDeviation="2.8"/></filter><filter id="sep-shadow-${id}" x="-100%" y="-35%" width="300%" height="205%"><feDropShadow dx="0" dy="6" stdDeviation="3.4" flood-color="#000" flood-opacity=".92"/></filter>
        <clipPath id="sep-inside-${id}"><path d="${inside}"/></clipPath>
      </defs>
      ${bare ? "" : `<g filter="url(#sep-shadow-${id})"><path d="${outer}" fill="#030506" fill-opacity=".40" stroke="#0a0d0e" stroke-width="1.1"/></g>`}
      ${bare ? "" : `<g clip-path="url(#sep-inside-${id})"><rect x="18" y="63" width="41" height="170" fill="#030404" opacity=".46"/><rect x="20" y="72" width="37" height="143" fill="url(#sep-mesh-${id})" opacity=".80"/><path d="M22 61 L22 232 M54 61 L54 232" stroke="#aaa49a" stroke-width=".8" opacity=".58"/><path d="M27 65 L27 229 M49 65 L49 229" stroke="#8e887f" stroke-width=".6" opacity=".32"/><ellipse cx="38" cy="58" rx="18" ry="4.4" fill="#d9d2c7" opacity=".48"/><ellipse cx="38" cy="221" rx="18" ry="4.4" fill="#d9d2c7" opacity=".40"/></g>`}
      <g class="separator-far" filter="url(#sep-glow-far-${id})">${marks}</g><g class="separator-aura" filter="url(#sep-glow-${id})">${marks}</g><g>${marks}</g>
      ${bare ? "" : `<path d="${outer}" fill="url(#sep-glass-${id})" fill-opacity="${Number(config.glass_opacity)}" stroke="#e4f5fb" stroke-opacity=".72" stroke-width=".95"/><path d="M19 56 C17 94 17 207 19 230" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" opacity=".31"/><path d="M23 40 C19 45 17 51 16 59" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".80"/><path d="M55 50 C59 73 59 104 59 129" fill="none" stroke="#eafaff" stroke-width="1.4" opacity=".24"/><ellipse cx="38" cy="12" rx="2.4" ry="5.2" fill="#fff" opacity=".48"/><ellipse cx="38" cy="239" rx="25" ry="5.8" fill="#303438" stroke="#6b7075" stroke-width=".8"/><path d="M12 239 C16 246 60 246 64 239 L64 266 C59 275 17 275 12 266 Z" fill="url(#sep-base-${id})" stroke="#050606" stroke-width=".9"/><ellipse cx="38" cy="266" rx="26" ry="5.9" fill="#020303" stroke="#292d30" stroke-width=".8"/><path d="M25 269 L25 283 M31 269 L31 284 M38 269 L38 285 M45 269 L45 284 M51 269 L51 283" stroke="#746b61" stroke-width="1.1" opacity=".78"/>`}
    </svg>
  </div>`;
}

export function renderScrews(enabled) {
  if (!enabled) return "";
  return ["tl", "tr", "bl", "br"].map((position) => `<span class="screw screw-${position}" aria-hidden="true"></span>`).join("");
}
