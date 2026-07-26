const escapeCss = (value) => String(value ?? "").replace(/[{};<>]/g, "");

export function renderStyles(config, { justify, brightness, animationMs }) {
  const maxWidth = Math.max(240, Number(config.max_width));
  const gapPx = Math.max(0, Number(config.tube_gap));
  const gapVw = Math.max(.05, Math.min(1.15, gapPx / 10)).toFixed(2);
  const animation = config.animate === false ? "none" : `tube-enter ${animationMs}ms cubic-bezier(.22,1,.36,1)`;

  return `<style>
    :host{display:block;width:100%;min-width:0}
    ha-card{width:100%;min-width:0;background:transparent;border:0;box-shadow:none;overflow:hidden}
    .device{--tube:${escapeCss(config.tube_color)};--core:${escapeCss(config.core_color)};position:relative;width:min(100%,${maxWidth}px);min-width:0;margin:0 auto;box-sizing:border-box;user-select:none;-webkit-tap-highlight-color:transparent;cursor:${config.entity ? "pointer" : "default"};filter:brightness(${brightness});isolation:isolate}
    .device.free{padding:4px 4px 15px}
    .device.panel{padding:clamp(24px,3.5vw,46px) clamp(22px,4.2vw,58px) clamp(28px,3.7vw,48px);border-radius:clamp(18px,2.3vw,30px);background:radial-gradient(ellipse at 50% -16%,rgba(255,255,255,.12),transparent 36%),linear-gradient(135deg,rgba(255,255,255,.05),transparent 19%,rgba(255,255,255,.012) 51%,transparent 79%),repeating-linear-gradient(116deg,rgba(255,255,255,.008) 0 1px,transparent 1px 4px),radial-gradient(circle at 16% 12%,rgba(255,255,255,.025),transparent 28%),linear-gradient(180deg,${escapeCss(config.panel_edge)} 0%,#15181a 4%,${escapeCss(config.panel_color)} 15%,#070808 82%,#1b1e20 96%,#050606 100%);border:1px solid rgba(255,255,255,.14);box-shadow:inset 0 2px 0 rgba(255,255,255,.10),inset 0 -2px 0 rgba(0,0,0,.96),inset 0 0 0 3px rgba(0,0,0,.38),inset 0 0 38px rgba(0,0,0,.34),0 18px 40px rgba(0,0,0,.52),0 4px 8px rgba(0,0,0,.78)}
    .device.panel:before{content:"";position:absolute;inset:clamp(9px,1.2vw,16px);z-index:-1;border-radius:clamp(13px,1.7vw,22px);border:1px solid rgba(255,255,255,.072);box-shadow:inset 0 1px 0 rgba(255,255,255,.04),inset 0 -1px 0 rgba(0,0,0,.9),0 1px 0 rgba(0,0,0,.92);pointer-events:none}
    .device.panel:after{content:"";position:absolute;left:7%;right:7%;top:1.35%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.24),transparent);opacity:.72;pointer-events:none}
    .caption{position:relative;z-index:8;text-align:center;margin:0 8% clamp(12px,1.9vw,24px);letter-spacing:.20em;line-height:1.16;text-transform:uppercase;text-shadow:0 2px 2px #000,0 0 14px rgba(255,255,255,.06)}
    .title{display:inline-block;font:500 clamp(13px,2vw,24px)/1.12 Arial,Helvetica,sans-serif;background:linear-gradient(180deg,#ffffff 0%,#d9dcdf 25%,#91969a 47%,#53575b 52%,#dfe1e3 79%,#8b9094 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 1px 0 #000) drop-shadow(0 0 1px rgba(255,255,255,.35))}
    .subtitle{margin-top:6px;font:400 clamp(8px,1.2vw,12px)/1.2 Arial,Helvetica,sans-serif;color:rgba(194,198,202,.54);letter-spacing:.18em}
    .tube-row{position:relative;z-index:5;display:flex;align-items:flex-end;justify-content:${justify};gap:clamp(1px,${gapVw}vw,${gapPx}px);width:100%;min-width:0;box-sizing:border-box;padding:0 clamp(1px,.55vw,7px)}
    .tube-slot{flex:1 1 0;min-width:0;max-width:132px;aspect-ratio:100/286;animation:${animation};filter:drop-shadow(0 8px 6px rgba(0,0,0,.72)) drop-shadow(0 0 7px rgba(255,78,0,.055))}
    .tube-slot-empty{opacity:0}
    .separator-slot{flex:.34 1 0;min-width:5px;max-width:50px;aspect-ratio:50/286;animation:${animation};filter:drop-shadow(0 8px 6px rgba(0,0,0,.68)) drop-shadow(0 0 6px rgba(255,78,0,.05))}
    .tube-svg,.separator-svg{display:block;width:100%;height:auto;overflow:visible;shape-rendering:geometricPrecision;text-rendering:geometricPrecision}
    .support-wires,.bottom-leads{fill:none;stroke:#aaa39a;stroke-width:.86;stroke-linecap:round;opacity:.68;filter:drop-shadow(0 0 .45px rgba(255,205,150,.28))}
    .tube-pins{fill:none;stroke:#857a6e;stroke-width:1.22;stroke-linecap:round;opacity:.82}
    .cathode-ghost{fill:none;stroke:#73685e;stroke-width:1.12;stroke-linecap:round;stroke-linejoin:round}
    .cathode-shadow{fill:none;stroke:#160300;stroke-width:8.2;stroke-linecap:round;stroke-linejoin:round;opacity:.96}
    .cathode-far{fill:none;stroke:#ff3d00;stroke-width:12.5;stroke-linecap:round;stroke-linejoin:round;opacity:.31;mix-blend-mode:screen}
    .cathode-aura{fill:none;stroke:var(--tube);stroke-width:9.4;stroke-linecap:round;stroke-linejoin:round;opacity:.72;mix-blend-mode:screen}
    .cathode-glow{fill:none;stroke:#ff5208;stroke-width:5.8;stroke-linecap:round;stroke-linejoin:round;opacity:.98;mix-blend-mode:screen}
    .cathode-hot{fill:none;stroke:#ff761d;stroke-width:3.8;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 1.2px #ff3600)}
    .cathode-core{fill:none;stroke:var(--core);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;opacity:1;filter:drop-shadow(0 0 .75px #fff2cf)}
    .cathode-beads{fill:none;stroke:#fff8e9;stroke-width:1.55;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:.001 2.05;opacity:.90;mix-blend-mode:screen}
    .cathode-spark{fill:none;stroke:#ffffff;stroke-width:.72;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:.001 5.4;opacity:.88;mix-blend-mode:screen}
    .separator-far{opacity:.32;fill:var(--tube);stroke:var(--tube)}
    .separator-aura{opacity:.82;fill:var(--tube);stroke:var(--tube)}
    .separator-dot{fill:#ff6814;stroke:var(--core);stroke-width:1.35;filter:drop-shadow(0 0 2px #ff3c00)}
    .separator-ring{fill:none;stroke:#ff5e0d;stroke-width:4.8;filter:drop-shadow(0 0 2px #ff3c00)}
    .separator-ring-core{fill:none;stroke:var(--core);stroke-width:1.25;opacity:.98}
    .separator-tail{fill:none;stroke:#ff6412;stroke-width:4.1;stroke-linecap:round;filter:drop-shadow(0 0 2px #ff3c00)}
    .base-board{position:relative;z-index:3;width:98.5%;height:clamp(29px,4vw,48px);margin:clamp(-21px,-2vw,-11px) auto 0;border-radius:clamp(8px,1.05vw,13px);background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.10),transparent 30%),linear-gradient(180deg,#44484c 0%,#202326 8%,#111315 22%,#070808 72%,#010202 100%);border:1px solid rgba(255,255,255,.09);box-shadow:inset 0 2px 0 rgba(255,255,255,.10),inset 0 -5px 8px rgba(0,0,0,.94),0 13px 18px rgba(0,0,0,.64)}
    .base-board:before{content:"";position:absolute;left:2%;right:2%;top:3%;height:25%;border-radius:50%;background:linear-gradient(90deg,transparent,rgba(255,125,31,.22),transparent);filter:blur(6px);opacity:.72}
    .base-board:after{content:"";position:absolute;left:4%;right:4%;bottom:-12px;height:13px;border-radius:0 0 11px 11px;background:linear-gradient(180deg,#111315,#010202);box-shadow:0 9px 13px rgba(0,0,0,.62)}
    .screw{position:absolute;z-index:20;width:clamp(19px,3.1vw,35px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 31% 25%,rgba(255,255,255,.24),transparent 18%),radial-gradient(circle at 50% 56%,#181b1d 0 29%,#020303 52%,#303438 72%,#040505 100%);border:1px solid rgba(255,255,255,.10);box-shadow:inset 0 1px 2px rgba(255,255,255,.12),inset 0 -3px 5px #000,0 4px 7px rgba(0,0,0,.86)}
    .screw:before,.screw:after{content:"";position:absolute;left:17%;right:17%;top:44%;height:12%;border-radius:2px;background:linear-gradient(180deg,#010202,#303438 44%,#000 57%);box-shadow:inset 0 1px 0 rgba(255,255,255,.09)}
    .screw:after{transform:rotate(90deg)}
    .screw-tl{left:clamp(9px,1.4vw,18px);top:clamp(9px,1.4vw,18px);transform:rotate(8deg)}
    .screw-tr{right:clamp(9px,1.4vw,18px);top:clamp(9px,1.4vw,18px);transform:rotate(-6deg)}
    .screw-bl{left:clamp(9px,1.4vw,18px);bottom:clamp(9px,1.4vw,18px);transform:rotate(4deg)}
    .screw-br{right:clamp(9px,1.4vw,18px);bottom:clamp(9px,1.4vw,18px);transform:rotate(-11deg)}
    @keyframes tube-enter{from{opacity:.28;transform:translateY(4px) scale(.988);filter:brightness(.62) saturate(.7)}to{opacity:1;transform:translateY(0) scale(1);filter:brightness(1) saturate(1)}}
    @media(max-width:620px){.device.panel{padding:22px 18px 30px}.caption{margin-bottom:10px;letter-spacing:.13em}.tube-row{gap:clamp(1px,.38vw,4px)}.screw{width:18px}.base-board{height:29px;margin-top:-12px}.tube-slot{max-width:118px}}
    @media(max-width:390px){.device.panel{padding:20px 14px 27px;border-radius:14px}.device.panel:before{inset:7px}.caption{margin-left:11%;margin-right:11%;letter-spacing:.09em}.title{font-size:12px}.screw{width:15px}.separator-slot{min-width:3px}.tube-row{padding:0}}
    @media(prefers-reduced-motion:reduce){.tube-slot,.separator-slot{animation:none!important}}
  </style>`;
}
