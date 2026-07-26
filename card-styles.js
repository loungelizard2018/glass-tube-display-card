const escapeCss = (value) => String(value ?? "").replace(/[{};<>]/g, "");

export function renderStyles(config, { justify, brightness, animationMs }) {
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
