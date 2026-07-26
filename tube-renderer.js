import { glyphPath } from "./glyphs.js";

const escapeAttr = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

function ghostCathodes(activeChar, config) {
  if (config.show_cathode_stack === false) return "";
  return ["8", "4", "2", "M"]
    .filter((char) => char !== activeChar)
    .map((char, index) => {
      const dx = (index - 1.5) * 0.75;
      const dy = index % 2 ? 0.6 : -0.5;
      return `<path d="${glyphPath(char)}" transform="translate(${dx} ${dy})" class="cathode-ghost"/>`;
    }).join("");
}

export function renderTube(character, index, config, uid) {
  const id = `${uid}-${index}`;
  const path = glyphPath(character);
  const opacity = path ? 1 : 0;
  if (character === " " && config.show_blank_tubes === false) {
    return `<div class="tube-slot tube-slot-empty" aria-hidden="true"></div>`;
  }

  return `<div class="tube-slot" aria-label="${escapeAttr(character === " " ? "blank" : character)}">
    <svg class="tube-svg" viewBox="0 0 104 220" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="glass-${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fff" stop-opacity=".76"/>
          <stop offset="18%" stop-color="${escapeAttr(config.glass_tint)}" stop-opacity=".23"/>
          <stop offset="52%" stop-color="#5b7180" stop-opacity=".08"/>
          <stop offset="80%" stop-color="${escapeAttr(config.glass_tint)}" stop-opacity=".18"/>
          <stop offset="100%" stop-color="#fff" stop-opacity=".48"/>
        </linearGradient>
        <linearGradient id="base-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4a4b4d"/><stop offset="25%" stop-color="#151719"/>
          <stop offset="68%" stop-color="#070808"/><stop offset="100%" stop-color="#292a2c"/>
        </linearGradient>
        <radialGradient id="red-${id}">
          <stop offset="0%" stop-color="${escapeAttr(config.tube_color)}" stop-opacity=".75"/>
          <stop offset="45%" stop-color="#d52e00" stop-opacity=".34"/>
          <stop offset="100%" stop-color="#7b0900" stop-opacity="0"/>
        </radialGradient>
        <pattern id="mesh-${id}" width="10" height="8.66" patternUnits="userSpaceOnUse">
          <path d="M2.5 0 L7.5 0 L10 4.33 L7.5 8.66 L2.5 8.66 L0 4.33 Z" fill="none" stroke="#a8a19a" stroke-width=".7" opacity="${Number(config.mesh_opacity)}"/>
        </pattern>
        <filter id="glow-wide-${id}" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5.2"/></filter>
        <filter id="glow-mid-${id}" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="2.2"/></filter>
        <filter id="glass-shadow-${id}" x="-40%" y="-20%" width="180%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="2.2" flood-color="#000" flood-opacity=".78"/></filter>
        <clipPath id="inside-${id}"><path d="M25 180 C22 151 22 85 25 58 C27 40 36 30 45 27 C49 25 50 20 50 15 C50 11 52 9 52 9 C55 9 57 11 57 15 C57 20 58 25 62 27 C71 30 80 40 82 58 C85 85 85 151 82 180 Z"/></clipPath>
      </defs>

      <ellipse cx="52" cy="191" rx="37" ry="20" fill="url(#red-${id})" opacity=".68"/>
      <g filter="url(#glass-shadow-${id})"><path d="M22 183 C19 151 19 83 23 56 C25 38 34 27 44 23 C47 22 48 18 48 13 C48 8 50 5 52 5 C55 5 58 8 58 13 C58 18 59 22 62 23 C72 27 81 38 83 56 C87 83 87 151 84 183 C80 193 25 193 22 183 Z" fill="url(#glass-${id})" fill-opacity="${Number(config.glass_opacity)}" stroke="#dce8ee" stroke-opacity=".58" stroke-width="1.15"/></g>

      <g clip-path="url(#inside-${id})">
        <ellipse cx="52" cy="42" rx="27" ry="7" fill="#d6d7d2" opacity=".38"/>
        <ellipse cx="52" cy="52" rx="27" ry="6" fill="none" stroke="#c4c4bd" stroke-width="2.3" opacity=".58"/>
        <ellipse cx="52" cy="61" rx="25" ry="5" fill="#7b7d7a" opacity=".26"/>
        <path d="M31 49 C31 37 34 33 37 31 M73 49 C73 37 70 33 67 31" fill="none" stroke="#9ea0a0" stroke-width="1.1" opacity=".48"/>
        <path d="M34 50 C40 46 64 46 70 50" fill="none" stroke="#d4d4d0" stroke-width="1.4" opacity=".58"/>
        <g transform="translate(22 65)">
          ${ghostCathodes(character, config)}
          <path d="${path}" class="cathode-shadow" opacity="${opacity}"/>
          <path d="${path}" class="cathode-glow-wide" filter="url(#glow-wide-${id})" opacity="${opacity}"/>
          <path d="${path}" class="cathode-glow-mid" filter="url(#glow-mid-${id})" opacity="${opacity}"/>
          <path d="${path}" class="cathode-hot" opacity="${opacity}"/>
          <path d="${path}" class="cathode-core" opacity="${opacity}"/>
        </g>
        <rect x="25" y="70" width="54" height="105" fill="url(#mesh-${id})" opacity=".92"/>
        <path d="M29 72 L29 176 M75 72 L75 176" stroke="#7b7772" stroke-width="1.3" opacity=".48"/>
        <path d="M25 178 C33 174 71 174 79 178" fill="none" stroke="#8e8c87" stroke-width="2" opacity=".5"/>
        <g stroke="#a9a29b" stroke-width="1" opacity=".42"><path d="M37 176 L36 190"/><path d="M45 176 L45 190"/><path d="M53 176 L53 190"/><path d="M61 176 L62 190"/><path d="M69 176 L70 190"/></g>
      </g>

      <path d="M24 179 C29 175 75 175 82 179 L82 196 C72 202 32 202 22 196 Z" fill="url(#base-${id})" stroke="#404246" stroke-width="1"/>
      <ellipse cx="52" cy="181" rx="30" ry="6" fill="#b32a0f" opacity=".32"/>
      <ellipse cx="52" cy="195" rx="29" ry="5" fill="#050606" stroke="#343638" stroke-width="1"/>
      <g stroke="#776b5d" stroke-width="1.2" opacity=".68"><path d="M34 198 L34 211"/><path d="M42 198 L42 212"/><path d="M50 198 L50 212"/><path d="M58 198 L58 212"/><path d="M66 198 L66 211"/></g>
      <path d="M31 38 C24 62 24 148 29 172" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" opacity=".22"/>
      <path d="M36 28 C31 31 28 36 26 43" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".65"/>
      <path d="M69 31 C76 44 78 67 78 95" fill="none" stroke="#cce7f5" stroke-width="1.4" stroke-linecap="round" opacity=".26"/>
      <ellipse cx="52" cy="13" rx="2.8" ry="4.8" fill="#fff" opacity=".46"/>
    </svg>
  </div>`;
}

export function renderSeparator(character, index, config, uid) {
  const id = `${uid}-sep-${index}`;
  const isColon = character === ":" || character === ";";
  const isComma = character === "," || character === ";";
  const isDegree = character === "°";
  const bare = String(config.separator_style).toLowerCase() === "bare";
  const marks = isDegree
    ? `<circle cx="19" cy="92" r="7" class="separator-degree"/>`
    : isColon
      ? `<circle cx="19" cy="99" r="5.5" class="separator-hot"/><circle cx="19" cy="143" r="5.5" class="separator-hot"/>`
      : `<circle cx="19" cy="151" r="6" class="separator-hot"/>${isComma ? '<path d="M21 155 C22 166 17 171 13 176" class="separator-tail"/>' : ''}`;

  return `<div class="separator-slot" aria-label="${escapeAttr(character)}">
    <svg class="separator-svg" viewBox="0 0 38 220" aria-hidden="true">
      <defs>
        <linearGradient id="sep-glass-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity=".72"/><stop offset="45%" stop-color="${escapeAttr(config.glass_tint)}" stop-opacity=".13"/><stop offset="100%" stop-color="#fff" stop-opacity=".36"/></linearGradient>
        <filter id="sep-glow-${id}" x="-180%" y="-180%" width="460%" height="460%"><feGaussianBlur stdDeviation="4.2"/></filter>
      </defs>
      ${bare ? "" : `<path d="M10 181 C8 148 8 95 10 71 C11 59 15 52 19 50 C23 52 27 59 28 71 C30 95 30 148 28 181 C25 189 13 189 10 181 Z" fill="url(#sep-glass-${id})" fill-opacity="${Number(config.glass_opacity)}" stroke="#dce8ee" stroke-opacity=".48" stroke-width=".9"/><path d="M10 178 L28 178 L27 193 C23 197 15 197 11 193 Z" fill="#101214" stroke="#3a3d40" stroke-width=".8"/><path d="M15 194 L15 208 M23 194 L23 208" stroke="#6f665b" stroke-width="1"/>`}
      <g filter="url(#sep-glow-${id})" opacity=".9">${marks}</g><g>${marks}</g>
      ${bare ? "" : '<path d="M13 68 C11 92 12 148 14 172" fill="none" stroke="#fff" stroke-width="1.5" opacity=".25"/>'}
    </svg>
  </div>`;
}

export function renderScrews(enabled) {
  if (!enabled) return "";
  return ["tl", "tr", "bl", "br"].map((position) => `<span class="screw screw-${position}" aria-hidden="true"></span>`).join("");
}
