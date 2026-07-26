import { glyphPath } from "./glyphs.js";

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

export function renderTube(character, index, config, uid) {
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

export function renderSeparator(character, index, config, uid) {
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

export function renderScrews(enabled) {
  if (!enabled) return "";
  return ["tl", "tr", "bl", "br"].map((position) => `<span class="screw screw-${position}" aria-hidden="true"></span>`).join("");
}
