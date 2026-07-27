import { normaliseCharacter } from "./glyphs.js";
import { renderPanelBackdrop, renderTube, renderSeparator, renderScrews } from "./tube-renderer.js";
import { renderStyles } from "./card-styles.js";

const VERSION = "0.3.9";
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
    this.shadowRoot.innerHTML=`${renderStyles(cfg,{justify,brightness,animationMs})}<ha-card><div class="device ${mounted?"panel":"free"}" role="button" tabindex="${cfg.entity?"0":"-1"}">${mounted?renderPanelBackdrop(this._uid):""}${renderScrews(mounted&&cfg.screws===true,this._uid)}${cfg.title||cfg.subtitle?`<div class="caption">${cfg.title?`<div class="title">${escapeHtml(cfg.title)}</div>`:""}${cfg.subtitle?`<div class="subtitle">${escapeHtml(cfg.subtitle)}</div>`:""}</div>`:""}<div class="tube-row">${tubeHtml}</div><div class="base-board" aria-hidden="true"></div></div></ha-card>`;
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
