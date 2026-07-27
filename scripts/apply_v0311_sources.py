from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    file_path = Path(path)
    source = file_path.read_text(encoding="utf-8")
    if old not in source:
        raise SystemExit(f"Expected source fragment not found in {path}: {old[:140]!r}")
    file_path.write_text(source.replace(old, new, 1), encoding="utf-8")


replace_once(
    "card-core.js",
    'const VERSION = "0.3.10";',
    'const VERSION = "0.3.11";',
)

replace_once(
    "card-core.js",
    'mounting:"free",screws:false,max_width:1200,tube_gap:7,tube_color:"#ff5000",core_color:"#fff1cf",',
    'mounting:"free",screws:false,screw_scale:1,max_width:1200,tube_gap:7,tube_color:"#ff5000",core_color:"#fff1cf",',
)

replace_once(
    "card-core.js",
    'for(const field of ["min_characters","max_characters","max_width","tube_gap","brightness","animation_speed"]){if(!Number.isFinite(Number(cfg[field])))throw new Error(`glass-tube-display-card: \'${field}\' must be numeric`)}',
    'for(const field of ["min_characters","max_characters","max_width","tube_gap","brightness","animation_speed","screw_scale"]){if(!Number.isFinite(Number(cfg[field])))throw new Error(`glass-tube-display-card: \'${field}\' must be numeric`)}',
)

replace_once(
    "card-core.js",
    'if(Number(cfg.min_characters)<0||Number(cfg.min_characters)>Number(cfg.max_characters))throw new Error("glass-tube-display-card: \'min_characters\' must be between 0 and \'max_characters\'");',
    'if(Number(cfg.min_characters)<0||Number(cfg.min_characters)>Number(cfg.max_characters))throw new Error("glass-tube-display-card: \'min_characters\' must be between 0 and \'max_characters\'");\n    if(Number(cfg.screw_scale)<.5||Number(cfg.screw_scale)>1.5)throw new Error("glass-tube-display-card: \'screw_scale\' must be between 0.5 and 1.5");',
)

replace_once(
    "tube-renderer.js",
    '''export function renderScrews(enabled) {
  if (!enabled) return "";
  return ["tl", "tr", "bl", "br"].map((position) =>
    `<img class="screw screw-${position}" src="${SCREW_ASSET_URI}" alt="" aria-hidden="true">`
  ).join("");
}''',
    '''export function renderScrews(enabled) {
  if (!enabled) return "";
  return ["tl", "tr", "bl", "br"].map((position) =>
    `<span class="screw-wrap screw-${position}" aria-hidden="true"><img class="screw-asset" src="${SCREW_ASSET_URI}" alt=""></span>`
  ).join("");
}''',
)

replace_once(
    "card-styles.js",
    '  const animation = config.animate === false ? "none" : `tube-enter ${animationMs}ms cubic-bezier(.22,1,.36,1)`;\n',
    '  const animation = config.animate === false ? "none" : `tube-enter ${animationMs}ms cubic-bezier(.22,1,.36,1)`;\n  const screwScale = Math.max(.5, Math.min(1.5, Number(config.screw_scale ?? 1)));\n  const screwMin = (42 * screwScale).toFixed(1);\n  const screwPreferred = (5.4 * screwScale).toFixed(2);\n  const screwMax = (64 * screwScale).toFixed(1);\n  const screwMobile = (44 * screwScale).toFixed(1);\n  const screwSmall = (36 * screwScale).toFixed(1);\n',
)

replace_once(
    "card-styles.js",
    '''    .screw{position:absolute;z-index:20;width:clamp(58px,8.2vw,88px);height:auto;aspect-ratio:1;pointer-events:none;object-fit:contain;filter:none}
    .screw-tl{left:clamp(9px,1.25vw,15px);top:clamp(9px,1.25vw,15px)}
    .screw-tr{right:clamp(9px,1.25vw,15px);top:clamp(9px,1.25vw,15px)}
    .screw-bl{left:clamp(9px,1.25vw,15px);bottom:clamp(9px,1.25vw,15px)}
    .screw-br{right:clamp(9px,1.25vw,15px);bottom:clamp(9px,1.25vw,15px)}
    @keyframes tube-enter{from{opacity:.28;transform:translateY(4px) scale(.988);filter:brightness(.62) saturate(.7)}to{opacity:1;transform:translateY(0) scale(1);filter:brightness(1) saturate(1)}}
    @media(max-width:620px){.device.panel{padding:44px 21px 34px}.caption{margin-bottom:10px;letter-spacing:.13em}.tube-row{gap:clamp(1px,.34vw,4px)}.screw{width:54px}.base-board{height:29px;margin-top:-12px}.tube-slot{max-width:114px}.separator-slot{max-width:68px}}
    @media(max-width:390px){.device.panel{padding:40px 16px 31px;border-radius:20px}.caption{margin-left:12%;margin-right:12%;letter-spacing:.09em}.title{font-size:12px}.screw{width:46px}.separator-slot{min-width:8px}.tube-row{padding:0}}''',
    '''    .screw-wrap{position:absolute;z-index:20;width:clamp(${screwMin}px,${screwPreferred}vw,${screwMax}px);aspect-ratio:1;pointer-events:none;overflow:hidden;border-radius:50%;clip-path:circle(49% at 50% 50%)}
    .screw-asset{position:absolute;left:50%;top:50%;width:150%;height:150%;max-width:none;transform:translate(-50%,-50%);object-fit:cover;display:block;filter:none}
    .screw-tl{left:clamp(14px,1.8vw,22px);top:clamp(14px,1.8vw,22px)}
    .screw-tr{right:clamp(14px,1.8vw,22px);top:clamp(14px,1.8vw,22px)}
    .screw-bl{left:clamp(14px,1.8vw,22px);bottom:clamp(14px,1.8vw,22px)}
    .screw-br{right:clamp(14px,1.8vw,22px);bottom:clamp(14px,1.8vw,22px)}
    @keyframes tube-enter{from{opacity:.28;transform:translateY(4px) scale(.988);filter:brightness(.62) saturate(.7)}to{opacity:1;transform:translateY(0) scale(1);filter:brightness(1) saturate(1)}}
    @media(max-width:620px){.device.panel{padding:44px 21px 34px}.caption{margin-bottom:10px;letter-spacing:.13em}.tube-row{gap:clamp(1px,.34vw,4px)}.screw-wrap{width:${screwMobile}px}.base-board{height:29px;margin-top:-12px}.tube-slot{max-width:114px}.separator-slot{max-width:68px}}
    @media(max-width:390px){.device.panel{padding:40px 16px 31px;border-radius:20px}.caption{margin-left:12%;margin-right:12%;letter-spacing:.09em}.title{font-size:12px}.screw-wrap{width:${screwSmall}px}.separator-slot{min-width:8px}.tube-row{padding:0}}''',
)

print("Applied Glass Tube Display Card v0.3.11 screw crop and scaling changes.")
