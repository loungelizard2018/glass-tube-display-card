/* Glass Tube Display Card v0.1.3
 * Self-contained HACS bundle: no runtime imports.
 */
(() => {
const GLYPH_PATHS = Object.freeze({
  " ": "",
  "0": "M30 5 C13 5 8 23 8 55 C8 87 13 105 30 105 C47 105 52 87 52 55 C52 23 47 5 30 5 Z",
  "1": "M17 24 L30 7 L30 105 M17 105 L44 105",
  "2": "M9 28 C11 9 47 5 51 27 C54 44 42 54 31 63 C20 72 12 84 10 105 L53 105",
  "3": "M10 20 C18 5 47 7 50 25 C53 42 42 51 30 54 C43 56 53 67 50 86 C47 106 18 109 8 93",
  "4": "M44 105 L44 6 M44 66 L8 66 L36 6",
  "5": "M51 7 L13 7 L10 52 C20 45 45 44 50 63 C56 84 44 104 25 105 C16 105 10 101 7 95",
  "6": "M48 15 C40 5 20 6 12 27 C5 45 6 89 18 101 C30 113 49 103 51 82 C53 61 40 48 20 55 C14 57 10 62 8 67",
  "7": "M8 8 L52 8 C42 31 32 57 28 105",
  "8": "M30 5 C14 5 8 17 10 31 C12 46 22 53 30 55 C18 58 8 68 9 84 C10 101 20 107 30 107 C40 107 50 101 51 84 C52 68 42 58 30 55 C38 53 48 46 50 31 C52 17 46 5 30 5 Z",
  "9": "M52 45 C50 22 43 7 30 6 C15 5 8 18 9 38 C10 59 23 70 41 62 C47 59 50 54 52 48 C53 76 49 98 31 105 C21 109 12 105 8 97",
  "A": "M6 105 L24 7 L36 7 L54 105 M15 65 L45 65",
  "B": "M10 5 L10 105 L31 105 C47 105 53 94 52 79 C51 66 43 58 31 56 C44 54 50 45 50 31 C50 16 42 5 28 5 Z",
  "C": "M50 20 C42 4 18 3 10 27 C3 47 3 78 10 96 C18 112 42 108 51 94",
  "D": "M10 5 L10 105 L28 105 C45 105 52 88 52 55 C52 22 45 5 28 5 Z",
  "E": "M51 5 L10 5 L10 105 L52 105 M10 55 L43 55",
  "F": "M51 5 L10 5 L10 105 M10 55 L43 55",
  "G": "M51 22 C43 4 18 3 10 27 C3 47 3 79 10 97 C18 112 42 108 51 93 L51 61 L32 61",
  "H": "M9 5 L9 105 M51 5 L51 105 M9 56 L51 56",
  "I": "M15 5 L45 5 M30 5 L30 105 M15 105 L45 105",
  "J": "M12 5 L51 5 M42 5 L42 82 C42 100 31 108 19 104 C11 101 7 94 7 84",
  "K": "M9 5 L9 105 M51 5 L10 61 M26 44 L53 105",
  "L": "M10 5 L10 105 L52 105",
  "M": "M6 105 L6 5 L30 58 L54 5 L54 105",
  "N": "M8 105 L8 5 L52 105 L52 5",
  "O": "M30 5 C13 5 8 23 8 55 C8 87 13 105 30 105 C47 105 52 87 52 55 C52 23 47 5 30 5 Z",
  "P": "M10 105 L10 5 L31 5 C46 5 52 17 51 33 C50 49 42 58 29 58 L10 58",
  "Q": "M30 5 C13 5 8 23 8 55 C8 87 13 105 30 105 C47 105 52 87 52 55 C52 23 47 5 30 5 Z M34 79 L55 108",
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
  return ["8", "4", "2", "M"]
    .filter((char) => char !== activeChar)
    .map((char, index) => {
      const dx = (index - 1.5) * 0.75;
      const dy = index % 2 ? 0.6 : -0.5;
      return `<path d="${glyphPath(char)}" transform="translate(${dx} ${dy})" class="cathode-ghost"/>`;
    }).join("");
}

function renderTube(character, index, config, uid) {
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

function renderSeparator(character, index, config, uid) {
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

function renderScrews(enabled) {
  if (!enabled) return "";
  return ["tl", "tr", "bl", "br"].map((position) => `<span class="screw screw-${position}" aria-hidden="true"></span>`).join("");
}

const escapeCss = (value) => String(value ?? "").replace(/[{};<>]/g, "");

function renderStyles(config, { justify, brightness, animationMs }) {
  const maxWidth = Math.max(240, Number(config.max_width));
  const gapVw = Math.max(0.2, Math.min(2.4, Number(config.tube_gap) / 5)).toFixed(2);
  const gapPx = Math.max(1, Number(config.tube_gap));
  const animation = config.animate === false ? "none" : `tube-enter ${animationMs}ms cubic-bezier(.22,1,.36,1)`;

  return `<style>
    :host{display:block;width:100%;min-width:0}ha-card{width:100%;min-width:0;background:transparent;border:0;box-shadow:none;overflow:hidden}
    .device{--tube:${escapeCss(config.tube_color)};--core:${escapeCss(config.core_color)};position:relative;width:min(100%,${maxWidth}px);min-width:0;margin:0 auto;box-sizing:border-box;user-select:none;-webkit-tap-highlight-color:transparent;cursor:${config.entity ? "pointer" : "default"};filter:brightness(${brightness})}
    .device.free{padding:3px 3px 0}.device.panel{padding:clamp(18px,3vw,34px) clamp(20px,4vw,46px) clamp(20px,3.5vw,38px);border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,.055),transparent 23%,rgba(255,255,255,.018) 52%,transparent 76%),radial-gradient(circle at 50% 4%,rgba(255,255,255,.055),transparent 34%),linear-gradient(180deg,${escapeCss(config.panel_edge)},${escapeCss(config.panel_color)} 14%,#060707 88%,#1e2022);border:1px solid rgba(255,255,255,.08);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.85),0 10px 28px rgba(0,0,0,.28)}
    .caption{position:relative;z-index:8;text-align:center;margin:0 6% clamp(4px,1.2vw,11px);color:rgba(234,238,240,.84);text-shadow:0 1px 0 #000;letter-spacing:.14em;line-height:1.25}.title{font:500 clamp(11px,2vw,17px)/1.2 Arial,Helvetica,sans-serif}.subtitle{margin-top:3px;font:400 clamp(8px,1.45vw,12px)/1.2 Arial,Helvetica,sans-serif;color:rgba(211,216,219,.58)}
    .tube-row{position:relative;z-index:4;display:flex;align-items:flex-end;justify-content:${justify};gap:clamp(1px,${gapVw}vw,${gapPx}px);width:100%;min-width:0;box-sizing:border-box;padding:0 clamp(2px,1vw,9px)}
    .tube-slot{flex:1 1 0;min-width:0;max-width:112px;aspect-ratio:104/220;animation:${animation}}.tube-slot-empty{opacity:0}.separator-slot{flex:.30 1 0;min-width:8px;max-width:38px;aspect-ratio:38/220;animation:${animation}}.tube-svg,.separator-svg{display:block;width:100%;height:auto;overflow:visible}
    .cathode-ghost{fill:none;stroke:#5b554f;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;opacity:.11}.cathode-shadow{fill:none;stroke:#1b0904;stroke-width:6.5;stroke-linecap:round;stroke-linejoin:round;opacity:.86}.cathode-glow-wide{fill:none;stroke:var(--tube);stroke-width:8.5;stroke-linecap:round;stroke-linejoin:round;opacity:.78}.cathode-glow-mid{fill:none;stroke:var(--tube);stroke-width:4.8;stroke-linecap:round;stroke-linejoin:round;opacity:.98}.cathode-hot{fill:none;stroke:var(--tube);stroke-width:3.6;stroke-linecap:round;stroke-linejoin:round}.cathode-core{fill:none;stroke:var(--core);stroke-width:1.15;stroke-linecap:round;stroke-linejoin:round;opacity:.95}
    .separator-hot{fill:var(--tube);stroke:var(--core);stroke-width:1.2}.separator-degree{fill:none;stroke:var(--tube);stroke-width:4.2}.separator-tail{fill:none;stroke:var(--tube);stroke-width:4.2;stroke-linecap:round}
    .base-board{position:relative;z-index:2;height:clamp(20px,4.1vw,39px);margin:clamp(-16px,-2.2vw,-8px) 0 0;border-radius:5px 5px 9px 9px;background:repeating-linear-gradient(90deg,transparent 0 17px,rgba(197,160,83,.18) 18px 19px,transparent 20px 32px),linear-gradient(180deg,#242923 0 12%,${escapeCss(config.pcb_color)} 13% 68%,#070807 69% 100%);border:1px solid rgba(159,166,145,.26);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -5px 8px rgba(0,0,0,.86),0 5px 10px rgba(0,0,0,.44)}
    .base-board:before{content:"";position:absolute;left:2%;right:2%;top:21%;height:28%;background:repeating-linear-gradient(90deg,rgba(239,70,18,.48) 0 3px,transparent 4px 13px);filter:blur(1px);opacity:.55}.base-board:after{content:"";position:absolute;left:3%;right:3%;bottom:-7px;height:9px;border-radius:0 0 7px 7px;background:linear-gradient(180deg,#141617,#050606);box-shadow:0 5px 9px rgba(0,0,0,.42)}
    .screw{position:absolute;z-index:20;width:clamp(15px,2.8vw,25px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 34% 29%,rgba(255,255,255,.18),transparent 20%),radial-gradient(circle at 50% 56%,#111315 0 34%,#030404 55%,#25282b 76%,#050606 100%);border:1px solid rgba(255,255,255,.07);box-shadow:inset 0 1px 2px rgba(255,255,255,.08),inset 0 -2px 3px #000,0 2px 4px rgba(0,0,0,.7)}.screw:before,.screw:after{content:"";position:absolute;left:19%;right:19%;top:44%;height:12%;border-radius:2px;background:linear-gradient(180deg,#020303,#202326 48%,#000 54%);box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}.screw:after{transform:rotate(90deg)}.screw-tl{left:10px;top:10px;transform:rotate(12deg)}.screw-tr{right:10px;top:10px;transform:rotate(-7deg)}.screw-bl{left:10px;bottom:10px;transform:rotate(4deg)}.screw-br{right:10px;bottom:10px;transform:rotate(-14deg)}
    @keyframes tube-enter{from{opacity:.45;transform:translateY(2px);filter:brightness(.75)}to{opacity:1;transform:translateY(0);filter:brightness(1)}}
    @media(max-width:420px){.device.panel{padding:17px 19px 22px;border-radius:13px}.caption{letter-spacing:.08em;margin-bottom:2px}.screw{width:14px}.screw-tl,.screw-bl{left:5px}.screw-tr,.screw-br{right:5px}.screw-tl,.screw-tr{top:5px}.screw-bl,.screw-br{bottom:5px}}
    @media(prefers-reduced-motion:reduce){.tube-slot,.separator-slot{animation:none!important}}
  </style>`;
}




const VERSION = "0.1.3";
const DEFAULT_CONFIG = Object.freeze({
  text:"HELLO",attribute:null,prefix:"",suffix:"",title:"",subtitle:"",unit:"",unit_separator:" ",
  decimals:null,decimal_separator:"auto",unavailable_text:"----",unknown_text:"----",
  min_characters:0,max_characters:12,pad:"left",pad_character:" ",overflow:"left",
  show_blank_tubes:true,show_cathode_stack:true,separator_style:"mini_tube",align:"center",
  mounting:"free",screws:false,max_width:920,tube_gap:8,tube_color:"#ff6a00",core_color:"#ffd0a3",
  glass_tint:"#d7edff",glass_opacity:.72,mesh_opacity:.34,pcb_color:"#131713",panel_color:"#090a0b",
  panel_edge:"#22262a",brightness:1,animate:true,animation_speed:420,tap_action:{action:"more-info"}
});

const escapeHtml = (value) => String(value ?? "")
  .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
  .replace(/"/g,"&quot;").replace(/'/g,"&#039;");

class GlassTubeDisplayCard extends HTMLElement {
  constructor(){super();this.attachShadow({mode:"open"});this._config=null;this._hass=null;this._lastDisplay=null;this._uid=`gtd-${Math.random().toString(36).slice(2,10)}`}

  static getStubConfig(){return{type:"custom:glass-tube-display-card",entity:"sensor.example",title:"GLASS TUBE DISPLAY",min_characters:6,mounting:"panel",screws:true}}

  setConfig(config){
    if(!config||(!config.entity&&config.text===undefined))throw new Error("glass-tube-display-card: define either 'entity' or 'text'");
    const mounting=config.mounted===true||config.screwed===true?"panel":String(config.mounting??DEFAULT_CONFIG.mounting).toLowerCase();
    const screws=config.screwed===true?true:Boolean(config.screws??false);
    this._config={...DEFAULT_CONFIG,...config,mounting,screws};
    this._validateConfig();this._lastDisplay=null;this._render();
  }

  set hass(hass){this._hass=hass;if(!this._config)return;const display=this._displayValue();if(display!==this._lastDisplay)this._render()}
  getCardSize(){return this._config?.title||this._config?.subtitle?4:3}
  getGridOptions(){return{rows:4,columns:12,min_rows:2,min_columns:3}}

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
