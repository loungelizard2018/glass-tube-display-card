const escapeCss = (value) => String(value ?? "").replace(/[{};<>]/g, "");

export function renderStyles(config, { justify, brightness, animationMs }) {
  const maxWidth = Math.max(240, Number(config.max_width));
  const gapPx = Math.max(0, Number(config.tube_gap));
  const gapVw = Math.max(.05, Math.min(1.05, gapPx / 11)).toFixed(2);
  const animation = config.animate === false ? "none" : `tube-enter ${animationMs}ms cubic-bezier(.22,1,.36,1)`;

  return `<style>
    :host{display:block;width:100%;min-width:0}
    ha-card{width:100%;min-width:0;background:transparent;border:0;box-shadow:none;overflow:hidden}
    .device{--tube:${escapeCss(config.tube_color)};--core:${escapeCss(config.core_color)};position:relative;width:min(100%,${maxWidth}px);min-width:0;margin:0 auto;box-sizing:border-box;user-select:none;-webkit-tap-highlight-color:transparent;cursor:${config.entity ? "pointer" : "default"};filter:brightness(${brightness});isolation:isolate}
    .device.free{padding:4px 4px 15px}
    .device.panel{padding:clamp(48px,6vw,74px) clamp(30px,5vw,66px) clamp(36px,4.6vw,60px);border-radius:clamp(24px,3vw,38px);background:#070808;box-shadow:0 18px 40px rgba(0,0,0,.52),0 4px 8px rgba(0,0,0,.78);overflow:hidden}
    .panel-backdrop{position:absolute;inset:0;z-index:0;width:100%;height:100%;display:block;pointer-events:none}
    .caption{position:relative;z-index:8;text-align:center;margin:0 11% clamp(14px,2vw,25px);letter-spacing:.20em;line-height:1.16;text-transform:uppercase;text-shadow:0 2px 2px #000,0 0 14px rgba(255,255,255,.06)}
    .title{display:inline-block;font:500 clamp(13px,2vw,24px)/1.12 Arial,Helvetica,sans-serif;background:linear-gradient(180deg,#ffffff 0%,#d9dcdf 25%,#91969a 47%,#53575b 52%,#dfe1e3 79%,#8b9094 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 1px 0 #000) drop-shadow(0 0 1px rgba(255,255,255,.35))}
    .subtitle{margin-top:6px;font:400 clamp(8px,1.2vw,12px)/1.2 Arial,Helvetica,sans-serif;color:rgba(194,198,202,.54);letter-spacing:.18em}
    .tube-row{position:relative;z-index:5;display:flex;align-items:flex-end;justify-content:${justify};gap:clamp(1px,${gapVw}vw,${gapPx}px);width:100%;min-width:0;box-sizing:border-box;padding:0 clamp(1px,.45vw,6px)}
    .tube-slot{flex:1 1 0;min-width:0;max-width:126px;aspect-ratio:100/286;animation:${animation};filter:drop-shadow(0 8px 6px rgba(0,0,0,.72)) drop-shadow(0 0 7px rgba(255,78,0,.055))}
    .tube-slot-empty{opacity:0}
    .separator-slot{flex:.60 1 0;min-width:10px;max-width:76px;aspect-ratio:76/286;animation:${animation};filter:drop-shadow(0 8px 6px rgba(0,0,0,.68)) drop-shadow(0 0 5px rgba(255,78,0,.04))}
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
    .separator-far{opacity:.22;mix-blend-mode:screen}
    .separator-aura{opacity:.64;mix-blend-mode:screen}
    .separator-far .separator-dot{fill:var(--tube);stroke:var(--tube);stroke-width:3.6}
    .separator-aura .separator-dot{fill:var(--tube);stroke:var(--tube);stroke-width:2}
    .separator-far .separator-ring,.separator-aura .separator-ring{fill:none;stroke:var(--tube)}
    .separator-dot{fill:#ff6814;stroke:var(--core);stroke-width:1.25;filter:drop-shadow(0 0 1.8px #ff3c00)}
    .separator-ring{fill:none;stroke:#ff5e0d;stroke-width:4.6;filter:drop-shadow(0 0 1.8px #ff3c00)}
    .separator-ring-core{fill:none;stroke:var(--core);stroke-width:1.25;opacity:.98}
    .separator-comma-shadow,.separator-comma-far,.separator-comma-aura,.separator-comma-hot,.separator-comma-core{fill:none;stroke-linecap:round;stroke-linejoin:round}
    .separator-comma-shadow{stroke:#170300;stroke-width:6;opacity:.94}
    .separator-comma-far{stroke:#ff3d00;stroke-width:6.6;opacity:.23;mix-blend-mode:screen}
    .separator-comma-aura{stroke:var(--tube);stroke-width:4;opacity:.62;mix-blend-mode:screen}
    .separator-comma-hot{stroke:#ff6a16;stroke-width:2.8;filter:drop-shadow(0 0 1px #ff3600)}
    .separator-comma-core{stroke:var(--core);stroke-width:1.05;opacity:.98}
    .base-board{position:relative;z-index:3;width:98.5%;height:clamp(29px,4vw,48px);margin:clamp(-21px,-2vw,-11px) auto 0;border-radius:clamp(8px,1.05vw,13px);background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.10),transparent 30%),linear-gradient(180deg,#44484c 0%,#202326 8%,#111315 22%,#070808 72%,#010202 100%);border:1px solid rgba(255,255,255,.09);box-shadow:inset 0 2px 0 rgba(255,255,255,.10),inset 0 -5px 8px rgba(0,0,0,.94),0 13px 18px rgba(0,0,0,.64)}
    .base-board:before{content:"";position:absolute;left:2%;right:2%;top:3%;height:25%;border-radius:50%;background:linear-gradient(90deg,transparent,rgba(255,125,31,.22),transparent);filter:blur(6px);opacity:.72}
    .base-board:after{content:"";position:absolute;left:4%;right:4%;bottom:-12px;height:13px;border-radius:0 0 11px 11px;background:linear-gradient(180deg,#111315,#010202);box-shadow:0 9px 13px rgba(0,0,0,.62)}
    .screw{position:absolute;z-index:20;width:clamp(34px,4.1vw,42px);aspect-ratio:1;pointer-events:none;overflow:visible;filter:drop-shadow(0 3px 4px rgba(0,0,0,.78))}
    .screw-tl{left:clamp(18px,2.2vw,27px);top:clamp(18px,2.2vw,27px)}
    .screw-tr{right:clamp(18px,2.2vw,27px);top:clamp(18px,2.2vw,27px)}
    .screw-bl{left:clamp(18px,2.2vw,27px);bottom:clamp(18px,2.2vw,27px)}
    .screw-br{right:clamp(18px,2.2vw,27px);bottom:clamp(18px,2.2vw,27px)}
    @keyframes tube-enter{from{opacity:.28;transform:translateY(4px) scale(.988);filter:brightness(.62) saturate(.7)}to{opacity:1;transform:translateY(0) scale(1);filter:brightness(1) saturate(1)}}
    @media(max-width:620px){.device.panel{padding:44px 21px 34px}.caption{margin-bottom:10px;letter-spacing:.13em}.tube-row{gap:clamp(1px,.34vw,4px)}.screw{width:28px}.base-board{height:29px;margin-top:-12px}.tube-slot{max-width:114px}.separator-slot{max-width:68px}}
    @media(max-width:390px){.device.panel{padding:40px 16px 31px;border-radius:20px}.caption{margin-left:12%;margin-right:12%;letter-spacing:.09em}.title{font-size:12px}.screw{width:24px}.separator-slot{min-width:8px}.tube-row{padding:0}}
    @media(prefers-reduced-motion:reduce){.tube-slot,.separator-slot{animation:none!important}}
  </style>`;
}
