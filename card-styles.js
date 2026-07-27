const escapeCss = (value) => String(value ?? "").replace(/[{};<>]/g, "");

export function renderStyles(config, { justify, brightness, animationMs }) {
  const maxWidth = Math.max(240, Number(config.max_width));
  const gapPx = Math.max(0, Number(config.tube_gap));
  const gapVw = Math.max(.05, Math.min(1.05, gapPx / 11)).toFixed(2);
  const animation = config.animate === false ? "none" : `tube-enter ${animationMs}ms cubic-bezier(.22,1,.36,1)`;
  const analogAsset = "/hacsfiles/analog-gauge-card/assets/base.webp";
  const screwStyle = config.screws === true ? `
    .device.panel .screw{display:block;z-index:20;width:clamp(34px,5vw,56px);aspect-ratio:1;border:0;border-radius:50%;overflow:hidden;clip-path:circle(48% at 50% 50%);background-image:url("${analogAsset}");background-repeat:no-repeat;background-size:1150% 1150%;box-shadow:none;filter:saturate(.96) contrast(1.06) brightness(.99) drop-shadow(0 3px 4px rgba(0,0,0,.72))}
    .device.panel .screw:before,.device.panel .screw:after{display:none}
    .device.panel .screw-tl{background-position:3.2% 3.2%}
    .device.panel .screw-tr{background-position:96.8% 3.2%}
    .device.panel .screw-bl{background-position:3.2% 96.8%}
    .device.panel .screw-br{background-position:96.8% 96.8%}
  ` : ``;

  return `<style>
    :host{display:block;width:100%;min-width:0}
    ha-card{width:100%;min-width:0;background:transparent;border:0;box-shadow:none;overflow:hidden}
    .device{--tube:${escapeCss(config.tube_color)};--core:${escapeCss(config.core_color)};position:relative;width:min(100%,${maxWidth}px);min-width:0;margin:0 auto;box-sizing:border-box;user-select:none;-webkit-tap-highlight-color:transparent;cursor:${config.entity ? "pointer" : "default"};filter:brightness(${brightness});isolation:isolate}
    .device.free{padding:4px 4px 15px}
    .device.panel{padding:clamp(50px,6.2vw,76px) clamp(28px,4.8vw,64px) clamp(34px,4.4vw,58px);border-radius:clamp(21px,2.7vw,34px);background:radial-gradient(ellipse at 50% -12%,rgba(255,255,255,.11),transparent 34%),repeating-linear-gradient(116deg,rgba(255,255,255,.010) 0 1px,transparent 1px 4px),linear-gradient(180deg,#202326 0%,${escapeCss(config.panel_edge)} 4%,${escapeCss(config.panel_color)} 14%,#070808 84%,#171a1c 96%,#050606 100%);border:1px solid rgba(255,255,255,.09);box-shadow:inset 0 2px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.96),inset 0 0 44px rgba(0,0,0,.34),0 18px 40px rgba(0,0,0,.52),0 4px 8px rgba(0,0,0,.78);overflow:hidden}
    .device.panel:before{content:"";position:absolute;inset:clamp(9px,1.35vw,16px);z-index:1;border-radius:clamp(14px,1.9vw,24px);background:repeating-linear-gradient(116deg,rgba(255,255,255,.004) 0 1px,transparent 1px 4px);border:1px solid rgba(255,255,255,.07);box-shadow:inset 0 1px 0 rgba(255,255,255,.035),inset 0 -2px 0 rgba(0,0,0,.93),0 1px 0 rgba(0,0,0,.8);pointer-events:none}
    .device.panel:after{content:"";position:absolute;inset:clamp(4px,.65vw,8px);z-index:18;pointer-events:none;border-radius:clamp(17px,2.25vw,29px);border:1px solid rgba(210,218,224,.13);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),inset 0 -1px 0 rgba(0,0,0,.95)}
    ${screwStyle}
    .caption{position:relative;z-index:8;text-align:center;margin:0 9% clamp(14px,2vw,25px);letter-spacing:.20em;line-height:1.16;text-transform:uppercase;text-shadow:0 2px 2px #000,0 0 14px rgba(255,255,255,.06)}
    .title{display:inline-block;font:500 clamp(13px,2vw,24px)/1.12 Arial,Helvetica,sans-serif;background:linear-gradient(180deg,#ffffff 0%,#d9dcdf 25%,#91969a 47%,#53575b 52%,#dfe1e3 79%,#8b9094 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 1px 0 #000) drop-shadow(0 0 1px rgba(255,255,255,.35))}
    .subtitle{margin-top:6px;font:400 clamp(8px,1.2vw,12px)/1.2 Arial,Helvetica,sans-serif;color:rgba(194,198,202,.54);letter-spacing:.18em}
    .tube-row{position:relative;z-index:5;display:flex;align-items:flex-end;justify-content:${justify};gap:clamp(1px,${gapVw}vw,${gapPx}px);width:100%;min-width:0;box-sizing:border-box;padding:0 clamp(1px,.45vw,6px)}
    .tube-slot{flex:1 1 0;min-width:0;max-width:126px;aspect-ratio:100/286;animation:${animation};filter:drop-shadow(0 8px 6px rgba(0,0,0,.72)) drop-shadow(0 0 7px rgba(255,78,0,.055))}
    .tube-slot-empty{opacity:0}
    .separator-slot{flex:.66 1 0;min-width:10px;max-width:82px;aspect-ratio:76/286;animation:${animation};filter:drop-shadow(0 8px 6px rgba(0,0,0,.68)) drop-shadow(0 0 6px rgba(255,78,0,.05))}
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
    .separator-far{opacity:.22;fill:none;stroke:var(--tube);stroke-width:8.5;stroke-linecap:round;stroke-linejoin:round}
    .separator-aura{opacity:.80;fill:none;stroke:var(--tube);stroke-width:5.5;stroke-linecap:round;stroke-linejoin:round}
    .separator-dot{fill:#ff6814;stroke:var(--core);stroke-width:1.35;filter:drop-shadow(0 0 2px #ff3c00)}
    .separator-ring{fill:none;stroke:#ff5e0d;stroke-width:4.8;filter:drop-shadow(0 0 2px #ff3c00)}
    .separator-ring-core{fill:none;stroke:var(--core);stroke-width:1.3;opacity:.98}
    .separator-comma{fill:none;stroke:#ff6412;stroke-width:3.7;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 1.8px #ff3c00)}
    .separator-tail{fill:none;stroke:#ff6412;stroke-width:4.1;stroke-linecap:round;filter:drop-shadow(0 0 2px #ff3c00)}
    .base-board{position:relative;z-index:3;width:98.5%;height:clamp(29px,4vw,48px);margin:clamp(-21px,-2vw,-11px) auto 0;border-radius:clamp(8px,1.05vw,13px);background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.10),transparent 30%),linear-gradient(180deg,#44484c 0%,#202326 8%,#111315 22%,#070808 72%,#010202 100%);border:1px solid rgba(255,255,255,.09);box-shadow:inset 0 2px 0 rgba(255,255,255,.10),inset 0 -5px 8px rgba(0,0,0,.94),0 13px 18px rgba(0,0,0,.64)}
    .base-board:before{content:"";position:absolute;left:2%;right:2%;top:3%;height:25%;border-radius:50%;background:linear-gradient(90deg,transparent,rgba(255,125,31,.22),transparent);filter:blur(6px);opacity:.72}
    .base-board:after{content:"";position:absolute;left:4%;right:4%;bottom:-12px;height:13px;border-radius:0 0 11px 11px;background:linear-gradient(180deg,#111315,#010202);box-shadow:0 9px 13px rgba(0,0,0,.62)}
    .screw{position:absolute;width:clamp(34px,5vw,56px);aspect-ratio:1;pointer-events:none}
    .screw-tl{left:clamp(14px,2.1vw,25px);top:clamp(14px,2.1vw,25px)}
    .screw-tr{right:clamp(14px,2.1vw,25px);top:clamp(14px,2.1vw,25px)}
    .screw-bl{left:clamp(14px,2.1vw,25px);bottom:clamp(14px,2.1vw,25px)}
    .screw-br{right:clamp(14px,2.1vw,25px);bottom:clamp(14px,2.1vw,25px)}
    @keyframes tube-enter{from{opacity:.28;transform:translateY(4px) scale(.988);filter:brightness(.62) saturate(.7)}to{opacity:1;transform:translateY(0) scale(1);filter:brightness(1) saturate(1)}}
    @media(max-width:620px){.device.panel{padding:46px 21px 34px}.device.panel:before{inset:9px}.caption{margin-bottom:10px;letter-spacing:.13em}.tube-row{gap:clamp(1px,.34vw,4px)}.screw{width:34px}.base-board{height:29px;margin-top:-12px}.tube-slot{max-width:114px}.separator-slot{max-width:74px}}
    @media(max-width:390px){.device.panel{padding:42px 16px 31px;border-radius:17px}.caption{margin-left:11%;margin-right:11%;letter-spacing:.09em}.title{font-size:12px}.screw{width:30px}.separator-slot{min-width:8px}.tube-row{padding:0}}
    @media(prefers-reduced-motion:reduce){.tube-slot,.separator-slot{animation:none!important}}
  </style>`;
}
