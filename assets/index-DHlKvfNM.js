const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/game-D6J2B8BP.js","assets/vendor-U87kivXt.js","assets/game-DTioTAxA.css"])))=>i.map(i=>d[i]);
/* empty css               */import{s as t,r as e,m as n,x as s,c as r,d as i,e as o,b as a,p as c,y as l,g as u,k as h,f as d,t as f,z as p,h as m,j as g,o as y,F as v,i as w,u as b,w as E,A as _,B as T,n as C,C as I,D as S,E as A}from"./vendor-U87kivXt.js";import{_ as k}from"./game-D6J2B8BP.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const n of t)if("childList"===n.type)for(const t of n.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)}).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const D={},x="/assets/img/Yako_logo_128.png",N={class:"navbar-container"},R={class:"footer"};const L={id:"app"};const O=k({name:"App",components:{RetroNavbar:k({__name:"retroNavbar",setup(f){const p=t(),m=e(!1),g=e(!1),y=n(()=>"/game"===p.path),v=()=>{m.value=!m.value},w=()=>{m.value=!1},b=()=>{g.value=!g.value};return(t,e)=>{const n=s("router-link");return i(),r("nav",{class:u(["navbar",{"menu-active":m.value,"navbar-hidden":g.value}])},[o("div",N,[c(n,{to:"/",class:"logo",onClick:w},{default:l(()=>e[0]||(e[0]=[o("img",{src:x,class:"default-img",alt:"Logo"},null,-1),o("img",{src:x,class:"glitch-img",alt:"Logo Glitch"},null,-1)])),_:1,__:[0]}),o("div",{class:"menu-toggle",onClick:v},e[1]||(e[1]=[o("div",{class:"bar"},null,-1),o("div",{class:"bar"},null,-1),o("div",{class:"bar"},null,-1)])),o("ul",{class:u(["nav-links",{active:m.value}])},[o("li",null,[c(n,{to:"/game",class:"glitch-button","data-text":"GAME",onClick:w},{default:l(()=>e[2]||(e[2]=[o("span",null,"GAME",-1)])),_:1,__:[2]})]),o("li",null,[c(n,{to:"/under_construction",class:"glitch-button","data-text":"COMING SOON",onClick:w},{default:l(()=>e[3]||(e[3]=[o("span",null,[d("COMING"),o("br"),d("SOON")],-1)])),_:1,__:[3]})]),e[4]||(e[4]=h('<div class="share" data-v-59b2889b><a href="mailto:karlquerel@gmail.com" target="_blank" data-v-59b2889b><i class="nes-icon gmail is-medium" data-v-59b2889b></i></a><a href="https://github.com/KarlQuerel" target="_blank" data-v-59b2889b><i class="nes-icon github is-medium" data-v-59b2889b></i></a><a href="https://www.linkedin.com/in/karlquerel" target="_blank" data-v-59b2889b><i class="nes-icon linkedin is-medium" data-v-59b2889b></i></a></div>',1))],2)]),y.value?(i(),r("button",{key:0,class:u(["hide-navbar-btn",{hidden:g.value}]),onClick:b},[o("img",{src:"/assets/img/navbar-arrow.png",alt:"Toggle Navbar",class:u(["arrow-icon",{"arrow-up":g.value,"arrow-down":!g.value}])},null,2)],2)):a("",!0)],2)}}},[["__scopeId","data-v-59b2889b"]]),RetroFooter:k({},[["render",function(t,e){return i(),r("footer",R,e[0]||(e[0]=[o("div",{class:"footer-copyright"},[o("span",null,"© 2025 Karl Querel - All rights reserved")],-1)]))}],["__scopeId","data-v-71dab54b"]])}},[["render",function(t,e,n,o,a,l){const u=s("RetroNavbar"),h=s("router-view"),d=s("RetroFooter");return i(),r("div",L,[c(u),c(h),c(d)])}]]);const M=k({mounted(){window.location.href="https://shattereddisk.github.io/rickroll/rickroll.mp4"}},[["render",function(t,e,n,s,o,a){return i(),r("div",null,"Redirecting...")}]]),P={class:"content"};const V=k({name:"NotFound"},[["render",function(t,e,n,s,a,c){return i(),r("div",P,e[0]||(e[0]=[o("div",{class:"nes-container is-dark is-rounded"},[o("img",{src:"/assets/img/yako-not-found.gif",alt:"lost yako"}),o("h1",null,"Page not found")],-1)]))}],["__scopeId","data-v-da04b479"]]);var F={};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=63&r|128):55296==(64512&r)&&s+1<t.length&&56320==(64512&t.charCodeAt(s+1))?(r=65536+((1023&r)<<10)+(1023&t.charCodeAt(++s)),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=63&r|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=63&r|128)}return e},B={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const e=t[r],i=r+1<t.length,o=i?t[r+1]:0,a=r+2<t.length,c=a?t[r+2]:0,l=e>>2,u=(3&e)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,i||(h=64)),s.push(n[l],n[u],n[h],n[d])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(U(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((31&r)<<6|63&i)}else if(r>239&&r<365){const i=((7&r)<<18|(63&t[n++])<<12|(63&t[n++])<<6|63&t[n++])-65536;e[s++]=String.fromCharCode(55296+(i>>10)),e[s++]=String.fromCharCode(56320+(1023&i))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((15&r)<<12|(63&i)<<6|63&o)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const e=n[t.charAt(r++)],i=r<t.length?n[t.charAt(r)]:0;++r;const o=r<t.length?n[t.charAt(r)]:64;++r;const a=r<t.length?n[t.charAt(r)]:64;if(++r,null==e||null==i||null==o||null==a)throw new j;const c=e<<2|i>>4;if(s.push(c),64!==o){const t=i<<4&240|o>>2;if(s.push(t),64!==a){const t=o<<6&192|a;s.push(t)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class j extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $=function(t){return function(t){const e=U(t);return B.encodeByteArray(e,!0)}(t).replace(/\./g,"")};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const q=()=>
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,z=()=>{if("undefined"==typeof document)return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const e=t&&function(t){try{return B.decodeString(t,!0)}catch(n){}return null}(t[1]);return e&&JSON.parse(e)},H=()=>{try{return q()||(()=>{if("undefined"==typeof process)return;const t=F.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0})()||z()}catch(t){return}},K=t=>{const e=(t=>{var e,n;return null===(n=null===(e=H())||void 0===e?void 0:e.emulatorHosts)||void 0===n?void 0:n[t]})(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return"["===e[0]?[e.substring(1,n-1),s]:[e.substring(0,n),s]},G=()=>{var t;return null===(t=H())||void 0===t?void 0:t.config};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Q{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch(()=>{}),1===t.length?t(e):t(e,n))}}}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(t){return t.endsWith(".cloudworkstations.dev")}const X={};let Y=!1;function J(t,e){if("undefined"==typeof window||"undefined"==typeof document||!W(window.location.host)||X[t]===e||X[t]||Y)return;function n(t){return`__firebase__banner__${t}`}X[t]=e;const s="__firebase__banner",r=function(){const t={prod:[],emulator:[]};for(const e of Object.keys(X))X[e]?t.emulator.push(e):t.prod.push(e);return t}().prod.length>0;function i(){const t=document.createElement("span");return t.style.cursor="pointer",t.style.marginLeft="16px",t.style.fontSize="24px",t.innerHTML=" &times;",t.onclick=()=>{Y=!0,function(){const t=document.getElementById(s);t&&t.remove()}()},t}function o(){const t=function(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}(s),e=n("text"),o=document.getElementById(e)||document.createElement("span"),a=n("learnmore"),c=document.getElementById(a)||document.createElement("a"),l=n("preprendIcon"),u=document.getElementById(l)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(t.created){const e=t.element;!function(t){t.style.display="flex",t.style.background="#7faaf0",t.style.position="fixed",t.style.bottom="5px",t.style.left="5px",t.style.padding=".5em",t.style.borderRadius="5px",t.style.alignItems="center"}(e),function(t,e){t.setAttribute("id",e),t.innerText="Learn more",t.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",t.setAttribute("target","__blank"),t.style.paddingLeft="5px",t.style.textDecoration="underline"}(c,a);const n=i();!function(t,e){t.setAttribute("width","24"),t.setAttribute("id",e),t.setAttribute("height","24"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.style.marginLeft="-6px"}(u,l),e.append(u,o,c,n),document.body.appendChild(e)}r?(o.innerText="Preview backend disconnected.",u.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(u.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',o.innerText="Preview backend running in this workspace."),o.setAttribute("id",e)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",o):o()}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(){return!function(){var t;const e=null===(t=H())||void 0===t?void 0:t.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(n){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}class tt extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,et.prototype.create)}}class et{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,r=this.errors[t],i=r?function(t,e){return t.replace(nt,(t,n)=>{const s=e[n];return null!=s?String(s):`<${n}?>`})}(r,n):"Error",o=`${this.serviceName}: ${i} (${s}).`;return new tt(s,o,n)}}const nt=/\{\$([^}]+)}/g;function st(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const n=t[r],i=e[r];if(rt(n)&&rt(i)){if(!st(n,i))return!1}else if(n!==i)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function rt(t){return null!==t&&"object"==typeof t}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(t){return t&&t._delegate?t._delegate:t}class ot{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const t=new Q;if(this.instancesDeferred.set(e,t),this.isInitialized(e)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:e});n&&t.resolve(n)}catch(n){}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),s=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(s)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t))try{this.getOrInitializeService({instanceIdentifier:at})}catch(e){}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const t=this.getOrInitializeService({instanceIdentifier:s});n.resolve(t)}catch(e){}}}}clearInstance(t=at){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...t.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return null!=this.component}isInitialized(t=at){return this.instances.has(t)}getOptions(t=at){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[r,i]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(r)&&i.resolve(s)}return s}onInit(t,e){var n;const s=this.normalizeInstanceIdentifier(e),r=null!==(n=this.onInitCallbacks.get(s))&&void 0!==n?n:new Set;r.add(t),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&t(i,s),()=>{r.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const r of n)try{r(t,e)}catch(s){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(s=t,s===at?void 0:s),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch(r){}var s;return n||null}normalizeInstanceIdentifier(t=at){return this.component?this.component.multipleInstances?t:at:t}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class lt{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new ct(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ut,ht;(ht=ut||(ut={}))[ht.DEBUG=0]="DEBUG",ht[ht.VERBOSE=1]="VERBOSE",ht[ht.INFO=2]="INFO",ht[ht.WARN=3]="WARN",ht[ht.ERROR=4]="ERROR",ht[ht.SILENT=5]="SILENT";const dt={debug:ut.DEBUG,verbose:ut.VERBOSE,info:ut.INFO,warn:ut.WARN,error:ut.ERROR,silent:ut.SILENT},ft=ut.INFO,pt={[ut.DEBUG]:"log",[ut.VERBOSE]:"log",[ut.INFO]:"info",[ut.WARN]:"warn",[ut.ERROR]:"error"},mt=(t,e,...n)=>{if(e<t.logLevel)return;(new Date).toISOString();if(!pt[e])throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class gt{constructor(t){this.name=t,this._logLevel=ft,this._logHandler=mt,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in ut))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?dt[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,ut.DEBUG,...t),this._logHandler(this,ut.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,ut.VERBOSE,...t),this._logHandler(this,ut.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,ut.INFO,...t),this._logHandler(this,ut.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,ut.WARN,...t),this._logHandler(this,ut.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,ut.ERROR,...t),this._logHandler(this,ut.ERROR,...t)}}let yt,vt;const wt=new WeakMap,bt=new WeakMap,Et=new WeakMap,_t=new WeakMap,Tt=new WeakMap;let Ct={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return bt.get(t);if("objectStoreNames"===e)return t.objectStoreNames||Et.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return At(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function It(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(vt||(vt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(kt(this),e),At(wt.get(this))}:function(...e){return At(t.apply(kt(this),e))}:function(e,...n){const s=t.call(kt(this),e,...n);return Et.set(s,e.sort?e.sort():[e]),At(s)}}function St(t){return"function"==typeof t?It(t):(t instanceof IDBTransaction&&function(t){if(bt.has(t))return;const e=new Promise((e,n)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",i),t.removeEventListener("abort",i)},r=()=>{e(),s()},i=()=>{n(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",i),t.addEventListener("abort",i)});bt.set(t,e)}(t),e=t,(yt||(yt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(t=>e instanceof t)?new Proxy(t,Ct):t);var e}function At(t){if(t instanceof IDBRequest)return function(t){const e=new Promise((e,n)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",i)},r=()=>{e(At(t.result)),s()},i=()=>{n(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",i)});return e.then(e=>{e instanceof IDBCursor&&wt.set(e,t)}).catch(()=>{}),Tt.set(e,t),e}(t);if(_t.has(t))return _t.get(t);const e=St(t);return e!==t&&(_t.set(t,e),Tt.set(e,t)),e}const kt=t=>Tt.get(t);const Dt=["get","getKey","getAll","getAllKeys","count"],xt=["put","add","delete","clear"],Nt=new Map;function Rt(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(Nt.get(e))return Nt.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=xt.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!r&&!Dt.includes(n))return;const i=async function(t,...e){const i=this.transaction(t,r?"readwrite":"readonly");let o=i.store;return s&&(o=o.index(e.shift())),(await Promise.all([o[n](...e),r&&i.done]))[0]};return Nt.set(e,i),i}Ct=(t=>({...t,get:(e,n,s)=>Rt(e,n)||t.get(e,n,s),has:(e,n)=>!!Rt(e,n)||t.has(e,n)}))(Ct);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Lt{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null}).filter(t=>t).join(" ")}}const Ot="@firebase/app",Mt="0.13.1",Pt=new gt("@firebase/app"),Vt="@firebase/app-compat",Ft="@firebase/analytics-compat",Ut="@firebase/analytics",Bt="@firebase/app-check-compat",jt="@firebase/app-check",$t="@firebase/auth",qt="@firebase/auth-compat",zt="@firebase/database",Ht="@firebase/data-connect",Kt="@firebase/database-compat",Gt="@firebase/functions",Qt="@firebase/functions-compat",Wt="@firebase/installations",Xt="@firebase/installations-compat",Yt="@firebase/messaging",Jt="@firebase/messaging-compat",Zt="@firebase/performance",te="@firebase/performance-compat",ee="@firebase/remote-config",ne="@firebase/remote-config-compat",se="@firebase/storage",re="@firebase/storage-compat",ie="@firebase/firestore",oe="@firebase/ai",ae="@firebase/firestore-compat",ce="firebase",le="[DEFAULT]",ue={[Ot]:"fire-core",[Vt]:"fire-core-compat",[Ut]:"fire-analytics",[Ft]:"fire-analytics-compat",[jt]:"fire-app-check",[Bt]:"fire-app-check-compat",[$t]:"fire-auth",[qt]:"fire-auth-compat",[zt]:"fire-rtdb",[Ht]:"fire-data-connect",[Kt]:"fire-rtdb-compat",[Gt]:"fire-fn",[Qt]:"fire-fn-compat",[Wt]:"fire-iid",[Xt]:"fire-iid-compat",[Yt]:"fire-fcm",[Jt]:"fire-fcm-compat",[Zt]:"fire-perf",[te]:"fire-perf-compat",[ee]:"fire-rc",[ne]:"fire-rc-compat",[se]:"fire-gcs",[re]:"fire-gcs-compat",[ie]:"fire-fst",[ae]:"fire-fst-compat",[oe]:"fire-vertex","fire-js":"fire-js",[ce]:"fire-js-all"},he=new Map,de=new Map,fe=new Map;function pe(t,e){try{t.container.addComponent(e)}catch(n){Pt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function me(t){const e=t.name;if(fe.has(e))return Pt.debug(`There were multiple attempts to register component ${e}.`),!1;fe.set(e,t);for(const n of he.values())pe(n,t);for(const n of de.values())pe(n,t);return!0}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ge=new et("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ye{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new ot("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw ge.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(t,e={}){let n=t;if("object"!=typeof e){e={name:e}}const s=Object.assign({name:le,automaticDataCollectionEnabled:!0},e),r=s.name;if("string"!=typeof r||!r)throw ge.create("bad-app-name",{appName:String(r)});if(n||(n=G()),!n)throw ge.create("no-options");const i=he.get(r);if(i){if(st(n,i.options)&&st(s,i.config))return i;throw ge.create("duplicate-app",{appName:r})}const o=new lt(r);for(const c of fe.values())o.addComponent(c);const a=new ye(n,s,o);return he.set(r,a),a}function we(t,e,n){var s;let r=null!==(s=ue[t])&&void 0!==s?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const t=[`Unable to register library "${r}" with version "${e}":`];return i&&t.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&t.push("and"),o&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void Pt.warn(t.join(" "))}me(new ot(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const be="firebase-heartbeat-store";let Ee=null;function _e(){return Ee||(Ee=function(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=At(o);return s&&o.addEventListener("upgradeneeded",t=>{s(At(o.result),t.oldVersion,t.newVersion,At(o.transaction),t)}),n&&o.addEventListener("blocked",t=>n(t.oldVersion,t.newVersion,t)),a.then(t=>{i&&t.addEventListener("close",()=>i()),r&&t.addEventListener("versionchange",t=>r(t.oldVersion,t.newVersion,t))}).catch(()=>{}),a}("firebase-heartbeat-database",1,{upgrade:(t,e)=>{if(0===e)try{t.createObjectStore(be)}catch(n){}}}).catch(t=>{throw ge.create("idb-open",{originalErrorMessage:t.message})})),Ee}async function Te(t,e){try{const n=(await _e()).transaction(be,"readwrite"),s=n.objectStore(be);await s.put(e,Ce(t)),await n.done}catch(n){if(n instanceof tt)Pt.warn(n.message);else{const t=ge.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});Pt.warn(t.message)}}}function Ce(t){return`${t.name}!${t.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Ae(e),this._heartbeatsCachePromise=this._storage.read().then(t=>(this._heartbeatsCache=t,t))}async triggerHeartbeat(){var t,e;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Se();if(null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(t=>t.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>30){const t=function(t){if(0===t.length)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(t,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){Pt.warn(n)}}async getHeartbeatsHeader(){var t;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const e=Se(),{heartbeatsToSend:n,unsentEntries:s}=function(t,e=1024){const n=[];let s=t.slice();for(const r of t){const t=n.find(t=>t.agent===r.agent);if(t){if(t.dates.push(r.date),ke(n)>e){t.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),ke(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}(this._heartbeatsCache.heartbeats),r=$(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return Pt.warn(e),""}}}function Se(){return(new Date).toISOString().substring(0,10)}class Ae{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(t){return!1}}()&&new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var t;e((null===(t=r.error)||void 0===t?void 0:t.message)||"")}}catch(n){e(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const t=await async function(t){try{const e=(await _e()).transaction(be),n=await e.objectStore(be).get(Ce(t));return await e.done,n}catch(e){if(e instanceof tt)Pt.warn(e.message);else{const t=ge.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});Pt.warn(t.message)}}}(this.app);return(null==t?void 0:t.heartbeats)?t:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return Te(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}}async add(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return Te(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}}}function ke(t){return $(JSON.stringify({version:2,heartbeats:t})).length}var De;De="",me(new ot("platform-logger",t=>new Lt(t),"PRIVATE")),me(new ot("heartbeat",t=>new Ie(t),"PRIVATE")),we(Ot,Mt,De),we(Ot,Mt,"esm2017"),we("fire-js","");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
we("firebase","11.9.1","app");var xe,Ne,Re="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function e(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(t,e,n){n||(n=0);var s=Array(16);if("string"==typeof e)for(var r=0;16>r;++r)s[r]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(r=0;16>r;++r)s[r]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],r=t.g[2];var i=t.g[3],o=e+(i^n&(r^i))+s[0]+3614090360&4294967295;o=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=n+(o<<7&4294967295|o>>>25))+((o=i+(r^e&(n^r))+s[1]+3905402710&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(e^n))+s[2]+606105819&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^r&(i^e))+s[3]+3250441966&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(r^i))+s[4]+4118548399&4294967295)<<7&4294967295|o>>>25))+((o=i+(r^e&(n^r))+s[5]+1200080426&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(e^n))+s[6]+2821735955&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^r&(i^e))+s[7]+4249261313&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(r^i))+s[8]+1770035416&4294967295)<<7&4294967295|o>>>25))+((o=i+(r^e&(n^r))+s[9]+2336552879&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(e^n))+s[10]+4294925233&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^r&(i^e))+s[11]+2304563134&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(r^i))+s[12]+1804603682&4294967295)<<7&4294967295|o>>>25))+((o=i+(r^e&(n^r))+s[13]+4254626195&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(e^n))+s[14]+2792965006&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^r&(i^e))+s[15]+1236535329&4294967295)<<22&4294967295|o>>>10))+((o=e+(r^i&(n^r))+s[1]+4129170786&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(e^n))+s[6]+3225465664&4294967295)<<9&4294967295|o>>>23))+((o=r+(e^n&(i^e))+s[11]+643717713&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(r^i))+s[0]+3921069994&4294967295)<<20&4294967295|o>>>12))+((o=e+(r^i&(n^r))+s[5]+3593408605&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(e^n))+s[10]+38016083&4294967295)<<9&4294967295|o>>>23))+((o=r+(e^n&(i^e))+s[15]+3634488961&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(r^i))+s[4]+3889429448&4294967295)<<20&4294967295|o>>>12))+((o=e+(r^i&(n^r))+s[9]+568446438&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(e^n))+s[14]+3275163606&4294967295)<<9&4294967295|o>>>23))+((o=r+(e^n&(i^e))+s[3]+4107603335&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(r^i))+s[8]+1163531501&4294967295)<<20&4294967295|o>>>12))+((o=e+(r^i&(n^r))+s[13]+2850285829&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(e^n))+s[2]+4243563512&4294967295)<<9&4294967295|o>>>23))+((o=r+(e^n&(i^e))+s[7]+1735328473&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(r^i))+s[12]+2368359562&4294967295)<<20&4294967295|o>>>12))+((o=e+(n^r^i)+s[5]+4294588738&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^r)+s[8]+2272392833&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^e^n)+s[11]+1839030562&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^e)+s[14]+4259657740&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^r^i)+s[1]+2763975236&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^r)+s[4]+1272893353&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^e^n)+s[7]+4139469664&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^e)+s[10]+3200236656&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^r^i)+s[13]+681279174&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^r)+s[0]+3936430074&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^e^n)+s[3]+3572445317&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^e)+s[6]+76029189&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^r^i)+s[9]+3654602809&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^r)+s[12]+3873151461&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^e^n)+s[15]+530742520&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^e)+s[2]+3299628645&4294967295)<<23&4294967295|o>>>9))+((o=e+(r^(n|~i))+s[0]+4096336452&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~r))+s[7]+1126891415&4294967295)<<10&4294967295|o>>>22))+((o=r+(e^(i|~n))+s[14]+2878612391&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(r|~e))+s[5]+4237533241&4294967295)<<21&4294967295|o>>>11))+((o=e+(r^(n|~i))+s[12]+1700485571&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~r))+s[3]+2399980690&4294967295)<<10&4294967295|o>>>22))+((o=r+(e^(i|~n))+s[10]+4293915773&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(r|~e))+s[1]+2240044497&4294967295)<<21&4294967295|o>>>11))+((o=e+(r^(n|~i))+s[8]+1873313359&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~r))+s[15]+4264355552&4294967295)<<10&4294967295|o>>>22))+((o=r+(e^(i|~n))+s[6]+2734768916&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(r|~e))+s[13]+1309151649&4294967295)<<21&4294967295|o>>>11))+((i=(e=n+((o=e+(r^(n|~i))+s[4]+4149444226&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~r))+s[11]+3174756917&4294967295)<<10&4294967295|o>>>22))^((r=i+((o=r+(e^(i|~n))+s[2]+718787259&4294967295)<<15&4294967295|o>>>17))|~e))+s[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(r+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+r&4294967295,t.g[3]=t.g[3]+i&4294967295}function s(t,e){this.h=e;for(var n=[],s=!0,r=t.length-1;0<=r;r--){var i=0|t[r];s&&i==e||(n[r]=i,s=!1)}this.g=n}!function(t,e){function n(){}n.prototype=e.prototype,t.D=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.C=function(t,n,s){for(var r=Array(arguments.length-2),i=2;i<arguments.length;i++)r[i-2]=arguments[i];return e.prototype[n].apply(t,r)}}(e,function(){this.blockSize=-1}),e.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.u=function(t,e){void 0===e&&(e=t.length);for(var s=e-this.blockSize,r=this.B,i=this.h,o=0;o<e;){if(0==i)for(;o<=s;)n(this,t,o),o+=this.blockSize;if("string"==typeof t){for(;o<e;)if(r[i++]=t.charCodeAt(o++),i==this.blockSize){n(this,r),i=0;break}}else for(;o<e;)if(r[i++]=t[o++],i==this.blockSize){n(this,r),i=0;break}}this.h=i,this.o+=e},e.prototype.v=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.o;for(e=t.length-8;e<t.length;++e)t[e]=255&n,n/=256;for(this.u(t),t=Array(16),e=n=0;4>e;++e)for(var s=0;32>s;s+=8)t[n++]=this.g[e]>>>s&255;return t};var r={};function i(t){return-128<=t&&128>t?function(t,e){var n=r;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,function(t){return new s([0|t],0>t?-1:0)}):new s([0|t],0>t?-1:0)}function o(t){if(isNaN(t)||!isFinite(t))return a;if(0>t)return d(o(-t));for(var e=[],n=1,r=0;t>=n;r++)e[r]=t/n|0,n*=4294967296;return new s(e,0)}var a=i(0),c=i(1),l=i(16777216);function u(t){if(0!=t.h)return!1;for(var e=0;e<t.g.length;e++)if(0!=t.g[e])return!1;return!0}function h(t){return-1==t.h}function d(t){for(var e=t.g.length,n=[],r=0;r<e;r++)n[r]=~t.g[r];return new s(n,~t.h).add(c)}function f(t,e){return t.add(d(e))}function p(t,e){for(;(65535&t[e])!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function m(t,e){this.g=t,this.h=e}function g(t,e){if(u(e))throw Error("division by zero");if(u(t))return new m(a,a);if(h(t))return e=g(d(t),e),new m(d(e.g),d(e.h));if(h(e))return e=g(t,d(e)),new m(d(e.g),e.h);if(30<t.g.length){if(h(t)||h(e))throw Error("slowDivide_ only works with positive integers.");for(var n=c,s=e;0>=s.l(t);)n=y(n),s=y(s);var r=v(n,1),i=v(s,1);for(s=v(s,2),n=v(n,2);!u(s);){var l=i.add(s);0>=l.l(t)&&(r=r.add(n),i=l),s=v(s,1),n=v(n,1)}return e=f(t,r.j(e)),new m(r,e)}for(r=a;0<=t.l(e);){for(n=Math.max(1,Math.floor(t.m()/e.m())),s=48>=(s=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,s-48),l=(i=o(n)).j(e);h(l)||0<l.l(t);)l=(i=o(n-=s)).j(e);u(i)&&(i=c),r=r.add(i),t=f(t,l)}return new m(r,t)}function y(t){for(var e=t.g.length+1,n=[],r=0;r<e;r++)n[r]=t.i(r)<<1|t.i(r-1)>>>31;return new s(n,t.h)}function v(t,e){var n=e>>5;e%=32;for(var r=t.g.length-n,i=[],o=0;o<r;o++)i[o]=0<e?t.i(o+n)>>>e|t.i(o+n+1)<<32-e:t.i(o+n);return new s(i,t.h)}(t=s.prototype).m=function(){if(h(this))return-d(this).m();for(var t=0,e=1,n=0;n<this.g.length;n++){var s=this.i(n);t+=(0<=s?s:4294967296+s)*e,e*=4294967296}return t},t.toString=function(t){if(2>(t=t||10)||36<t)throw Error("radix out of range: "+t);if(u(this))return"0";if(h(this))return"-"+d(this).toString(t);for(var e=o(Math.pow(t,6)),n=this,s="";;){var r=g(n,e).g,i=((0<(n=f(n,r.j(e))).g.length?n.g[0]:n.h)>>>0).toString(t);if(u(n=r))return i+s;for(;6>i.length;)i="0"+i;s=i+s}},t.i=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h},t.l=function(t){return h(t=f(this,t))?-1:u(t)?0:1},t.abs=function(){return h(this)?d(this):this},t.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0,i=0;i<=e;i++){var o=r+(65535&this.i(i))+(65535&t.i(i)),a=(o>>>16)+(this.i(i)>>>16)+(t.i(i)>>>16);r=a>>>16,o&=65535,a&=65535,n[i]=a<<16|o}return new s(n,-2147483648&n[n.length-1]?-1:0)},t.j=function(t){if(u(this)||u(t))return a;if(h(this))return h(t)?d(this).j(d(t)):d(d(this).j(t));if(h(t))return d(this.j(d(t)));if(0>this.l(l)&&0>t.l(l))return o(this.m()*t.m());for(var e=this.g.length+t.g.length,n=[],r=0;r<2*e;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var i=0;i<t.g.length;i++){var c=this.i(r)>>>16,f=65535&this.i(r),m=t.i(i)>>>16,g=65535&t.i(i);n[2*r+2*i]+=f*g,p(n,2*r+2*i),n[2*r+2*i+1]+=c*g,p(n,2*r+2*i+1),n[2*r+2*i+1]+=f*m,p(n,2*r+2*i+1),n[2*r+2*i+2]+=c*m,p(n,2*r+2*i+2)}for(r=0;r<e;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=e;r<2*e;r++)n[r]=0;return new s(n,0)},t.A=function(t){return g(this,t).h},t.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.i(r)&t.i(r);return new s(n,this.h&t.h)},t.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.i(r)|t.i(r);return new s(n,this.h|t.h)},t.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.i(r)^t.i(r);return new s(n,this.h^t.h)},e.prototype.digest=e.prototype.v,e.prototype.reset=e.prototype.s,e.prototype.update=e.prototype.u,Ne=e,s.prototype.add=s.prototype.add,s.prototype.multiply=s.prototype.j,s.prototype.modulo=s.prototype.A,s.prototype.compare=s.prototype.l,s.prototype.toNumber=s.prototype.m,s.prototype.toString=s.prototype.toString,s.prototype.getBits=s.prototype.i,s.fromNumber=o,s.fromString=function t(e,n){if(0==e.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==e.charAt(0))return d(t(e.substring(1),n));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var s=o(Math.pow(n,8)),r=a,i=0;i<e.length;i+=8){var c=Math.min(8,e.length-i),l=parseInt(e.substring(i,i+c),n);8>c?(c=o(Math.pow(n,c)),r=r.j(c).add(o(l))):r=(r=r.j(s)).add(o(l))}return r},xe=s}).apply(void 0!==Re?Re:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var Le,Oe,Me,Pe,Ve,Fe,Ue,Be,je="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t,e="function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,n){return t==Array.prototype||t==Object.prototype||(t[e]=n.value),t};var n=function(t){t=["object"==typeof globalThis&&globalThis,t,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof je&&je];for(var e=0;e<t.length;++e){var n=t[e];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);!function(t,s){if(s)t:{var r=n;t=t.split(".");for(var i=0;i<t.length-1;i++){var o=t[i];if(!(o in r))break t;r=r[o]}(s=s(i=r[t=t[t.length-1]]))!=i&&null!=s&&e(r,t,{configurable:!0,writable:!0,value:s})}}("Array.prototype.values",function(t){return t||function(){return function(t,e){t instanceof String&&(t+="");var n=0,s=!1,r={next:function(){if(!s&&n<t.length){var r=n++;return{value:e(r,t[r]),done:!1}}return s=!0,{done:!0,value:void 0}}};return r[Symbol.iterator]=function(){return r},r}(this,function(t,e){return e})}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var s=s||{},r=this||self;function i(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function o(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}function a(t,e,n){return t.call.apply(t.bind,arguments)}function c(t,e,n){if(!t)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,s),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function l(t,e,n){return(l=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?a:c).apply(null,arguments)}function u(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function h(t,e){function n(){}n.prototype=e.prototype,t.aa=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Qb=function(t,n,s){for(var r=Array(arguments.length-2),i=2;i<arguments.length;i++)r[i-2]=arguments[i];return e.prototype[n].apply(t,r)}}function d(t){const e=t.length;if(0<e){const n=Array(e);for(let s=0;s<e;s++)n[s]=t[s];return n}return[]}function f(t,e){for(let n=1;n<arguments.length;n++){const e=arguments[n];if(i(e)){const n=t.length||0,s=e.length||0;t.length=n+s;for(let r=0;r<s;r++)t[n+r]=e[r]}else t.push(e)}}function p(t){return/^[\s\xa0]*$/.test(t)}function m(){var t=r.navigator;return t&&(t=t.userAgent)?t:""}function g(t){return g[" "](t),t}g[" "]=function(){};var y=!(-1==m().indexOf("Gecko")||-1!=m().toLowerCase().indexOf("webkit")&&-1==m().indexOf("Edge")||-1!=m().indexOf("Trident")||-1!=m().indexOf("MSIE")||-1!=m().indexOf("Edge"));function v(t,e,n){for(const s in t)e.call(n,t[s],s,t)}function w(t){const e={};for(const n in t)e[n]=t[n];return e}const b="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(t,e){let n,s;for(let r=1;r<arguments.length;r++){for(n in s=arguments[r],s)t[n]=s[n];for(let e=0;e<b.length;e++)n=b[e],Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}}function _(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function T(t){r.setTimeout(()=>{throw t},0)}function C(){var t=D;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var I=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new S,t=>t.reset());class S{constructor(){this.next=this.g=this.h=null}set(t,e){this.h=t,this.g=e,this.next=null}reset(){this.next=this.g=this.h=null}}let A,k=!1,D=new class{constructor(){this.h=this.g=null}add(t,e){const n=I.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n}},x=()=>{const t=r.Promise.resolve(void 0);A=()=>{t.then(N)}};var N=()=>{for(var t;t=C();){try{t.h.call(t.g)}catch(n){T(n)}var e=I;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}k=!1};function R(){this.s=this.s,this.C=this.C}function L(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}R.prototype.s=!1,R.prototype.ma=function(){this.s||(this.s=!0,this.N())},R.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},L.prototype.h=function(){this.defaultPrevented=!0};var O=function(){if(!r.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const t=()=>{};r.addEventListener("test",t,e),r.removeEventListener("test",t,e)}catch(n){}return t}();function M(t,e){if(L.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,s=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(y){t:{try{g(e.nodeName);var r=!0;break t}catch(i){}r=!1}r||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,s?(this.clientX=void 0!==s.clientX?s.clientX:s.pageX,this.clientY=void 0!==s.clientY?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:P[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&M.aa.h.call(this)}}h(M,L);var P={2:"touch",3:"pen",4:"mouse"};M.prototype.h=function(){M.aa.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var V="closure_listenable_"+(1e6*Math.random()|0),F=0;function U(t,e,n,s,r){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!s,this.ha=r,this.key=++F,this.da=this.fa=!1}function B(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function j(t){this.src=t,this.g={},this.h=0}function $(t,e){var n=e.type;if(n in t.g){var s,r=t.g[n],i=Array.prototype.indexOf.call(r,e,void 0);(s=0<=i)&&Array.prototype.splice.call(r,i,1),s&&(B(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function q(t,e,n,s){for(var r=0;r<t.length;++r){var i=t[r];if(!i.da&&i.listener==e&&i.capture==!!n&&i.ha==s)return r}return-1}j.prototype.add=function(t,e,n,s,r){var i=t.toString();(t=this.g[i])||(t=this.g[i]=[],this.h++);var o=q(t,e,s,r);return-1<o?(e=t[o],n||(e.fa=!1)):((e=new U(e,this.src,i,!!s,r)).fa=n,t.push(e)),e};var z="closure_lm_"+(1e6*Math.random()|0),H={};function K(t,e,n,s,r){if(Array.isArray(e)){for(var i=0;i<e.length;i++)K(t,e[i],n,s,r);return null}return n=Z(n),t&&t[V]?t.K(e,n,!!o(s)&&!!s.capture,r):function(t,e,n,s,r,i){if(!e)throw Error("Invalid event type");var a=o(r)?!!r.capture:!!r,c=Y(t);if(c||(t[z]=c=new j(t)),n=c.add(e,n,s,a,i),n.proxy)return n;if(s=function(){function t(n){return e.call(t.src,t.listener,n)}const e=X;return t}(),n.proxy=s,s.src=t,s.listener=n,t.addEventListener)O||(r=a),void 0===r&&(r=!1),t.addEventListener(e.toString(),s,r);else if(t.attachEvent)t.attachEvent(W(e.toString()),s);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(s)}return n}(t,e,n,!1,s,r)}function G(t,e,n,s,r){if(Array.isArray(e))for(var i=0;i<e.length;i++)G(t,e[i],n,s,r);else s=o(s)?!!s.capture:!!s,n=Z(n),t&&t[V]?(t=t.i,(e=String(e).toString())in t.g&&(-1<(n=q(i=t.g[e],n,s,r))&&(B(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.g[e],t.h--)))):t&&(t=Y(t))&&(e=t.g[e.toString()],t=-1,e&&(t=q(e,n,s,r)),(n=-1<t?e[t]:null)&&Q(n))}function Q(t){if("number"!=typeof t&&t&&!t.da){var e=t.src;if(e&&e[V])$(e.i,t);else{var n=t.type,s=t.proxy;e.removeEventListener?e.removeEventListener(n,s,t.capture):e.detachEvent?e.detachEvent(W(n),s):e.addListener&&e.removeListener&&e.removeListener(s),(n=Y(e))?($(n,t),0==n.h&&(n.src=null,e[z]=null)):B(t)}}}function W(t){return t in H?H[t]:H[t]="on"+t}function X(t,e){if(t.da)t=!0;else{e=new M(e,this);var n=t.listener,s=t.ha||t.src;t.fa&&Q(t),t=n.call(s,e)}return t}function Y(t){return(t=t[z])instanceof j?t:null}var J="__closure_events_fn_"+(1e9*Math.random()>>>0);function Z(t){return"function"==typeof t?t:(t[J]||(t[J]=function(e){return t.handleEvent(e)}),t[J])}function tt(){R.call(this),this.i=new j(this),this.M=this,this.F=null}function et(t,e){var n,s=t.F;if(s)for(n=[];s;s=s.F)n.push(s);if(t=t.M,s=e.type||e,"string"==typeof e)e=new L(e,t);else if(e instanceof L)e.target=e.target||t;else{var r=e;E(e=new L(s,t),r)}if(r=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];r=nt(o,s,!0,e)&&r}if(r=nt(o=e.g=t,s,!0,e)&&r,r=nt(o,s,!1,e)&&r,n)for(i=0;i<n.length;i++)r=nt(o=e.g=n[i],s,!1,e)&&r}function nt(t,e,n,s){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();for(var r=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.da&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.fa&&$(t.i,o),r=!1!==a.call(c,s)&&r}}return r&&!s.defaultPrevented}function st(t,e,n){if("function"==typeof t)n&&(t=l(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=l(t.handleEvent,t)}return 2147483647<Number(e)?-1:r.setTimeout(t,e||0)}function rt(t){t.g=st(()=>{t.g=null,t.i&&(t.i=!1,rt(t))},t.l);const e=t.h;t.h=null,t.m.apply(null,e)}h(tt,R),tt.prototype[V]=!0,tt.prototype.removeEventListener=function(t,e,n,s){G(this,t,e,n,s)},tt.prototype.N=function(){if(tt.aa.N.call(this),this.i){var t,e=this.i;for(t in e.g){for(var n=e.g[t],s=0;s<n.length;s++)B(n[s]);delete e.g[t],e.h--}}this.F=null},tt.prototype.K=function(t,e,n,s){return this.i.add(String(t),e,!1,n,s)},tt.prototype.L=function(t,e,n,s){return this.i.add(String(t),e,!0,n,s)};class it extends R{constructor(t,e){super(),this.m=t,this.l=e,this.h=null,this.i=!1,this.g=null}j(t){this.h=arguments,this.g?this.i=!0:rt(this)}N(){super.N(),this.g&&(r.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ot(t){R.call(this),this.h=t,this.g={}}h(ot,R);var at=[];function ct(t){v(t.g,function(t,e){this.g.hasOwnProperty(e)&&Q(t)},t),t.g={}}ot.prototype.N=function(){ot.aa.N.call(this),ct(this)},ot.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var lt=r.JSON.stringify,ut=r.JSON.parse,ht=class{stringify(t){return r.JSON.stringify(t,void 0)}parse(t){return r.JSON.parse(t,void 0)}};function dt(){}function ft(t){return t.h||(t.h=t.i())}function pt(){}dt.prototype.h=null;var mt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function gt(){L.call(this,"d")}function yt(){L.call(this,"c")}h(gt,L),h(yt,L);var vt={},wt=null;function bt(){return wt=wt||new tt}function Et(t){L.call(this,vt.La,t)}function _t(t){const e=bt();et(e,new Et(e))}function Tt(t,e){L.call(this,vt.STAT_EVENT,t),this.stat=e}function Ct(t){const e=bt();et(e,new Tt(e,t))}function It(t,e){L.call(this,vt.Ma,t),this.size=e}function St(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return r.setTimeout(function(){t()},e)}function At(){this.g=!0}function kt(t,e,n,s){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var s=n[t];if(!(2>s.length)){var r=s[1];if(Array.isArray(r)&&!(1>r.length)){var i=r[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<r.length;o++)r[o]=""}}}return lt(n)}catch(a){return e}}(t,n)+(s?" "+s:"")})}vt.La="serverreachability",h(Et,L),vt.STAT_EVENT="statevent",h(Tt,L),vt.Ma="timingevent",h(It,L),At.prototype.xa=function(){this.g=!1},At.prototype.info=function(){};var Dt,xt={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Nt={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function Rt(){}function Lt(t,e,n,s){this.j=t,this.i=e,this.l=n,this.R=s||1,this.U=new ot(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ot}function Ot(){this.i=null,this.g="",this.h=!1}h(Rt,dt),Rt.prototype.g=function(){return new XMLHttpRequest},Rt.prototype.i=function(){return{}},Dt=new Rt;var Mt={},Pt={};function Vt(t,e,n){t.L=1,t.v=le(re(e)),t.m=n,t.P=!0,Ft(t,null)}function Ft(t,e){t.F=Date.now(),jt(t),t.A=re(t.v);var n=t.A,s=t.R;Array.isArray(s)||(s=[String(s)]),_e(n.i,"t",s),t.C=0,n=t.j.J,t.h=new Ot,t.g=wn(t.j,n?e:null,!t.m),0<t.O&&(t.M=new it(l(t.Y,t,t.g),t.O)),e=t.U,n=t.g,s=t.ca;var r="readystatechange";Array.isArray(r)||(r&&(at[0]=r.toString()),r=at);for(var i=0;i<r.length;i++){var o=K(n,r[i],s||e.handleEvent,!1,e.h||e);if(!o)break;e.g[o.key]=o}e=t.H?w(t.H):{},t.m?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.m,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),_t(),function(t,e,n,s,r,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var l=a[c].split("=");if(1<l.length){var u=l[0];l=l[1];var h=u.split("_");o=2<=h.length&&"type"==h[1]?o+(u+"=")+l+"&":o+(u+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+s+") [attempt "+r+"]: "+e+"\n"+n+"\n"+o})}(t.i,t.u,t.A,t.l,t.R,t.m)}function Ut(t){return!!t.g&&("GET"==t.u&&2!=t.L&&t.j.Ca)}function Bt(t,e){var n=t.C,s=e.indexOf("\n",n);return-1==s?Pt:(n=Number(e.substring(n,s)),isNaN(n)?Mt:(s+=1)+n>e.length?Pt:(e=e.slice(s,s+n),t.C=s+n,e))}function jt(t){t.S=Date.now()+t.I,$t(t,t.I)}function $t(t,e){if(null!=t.B)throw Error("WatchDog timer not null");t.B=St(l(t.ba,t),e)}function qt(t){t.B&&(r.clearTimeout(t.B),t.B=null)}function zt(t){0==t.j.G||t.J||pn(t.j,t)}function Ht(t){qt(t);var e=t.M;e&&"function"==typeof e.ma&&e.ma(),t.M=null,ct(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.ma())}function Kt(t,e){try{var n=t.j;if(0!=n.G&&(n.g==t||Yt(n.h,t)))if(!t.K&&Yt(n.h,t)&&3==n.G){try{var s=n.Da.g.parse(e)}catch(u){s=null}if(Array.isArray(s)&&3==s.length){var r=s;if(0==r[0]){t:if(!n.u){if(n.g){if(!(n.g.F+3e3<t.F))break t;fn(n),nn(n)}un(n),Ct(18)}}else n.za=r[1],0<n.za-n.T&&37500>r[2]&&n.F&&0==n.v&&!n.C&&(n.C=St(l(n.Za,n),6e3));if(1>=Xt(n.h)&&n.ca){try{n.ca()}catch(u){}n.ca=void 0}}else gn(n,11)}else if((t.K||n.g==t)&&fn(n),!p(e))for(r=n.Da.g.parse(e),e=0;e<r.length;e++){let l=r[e];if(n.T=l[0],l=l[1],2==n.G)if("c"==l[0]){n.K=l[1],n.ia=l[2];const e=l[3];null!=e&&(n.la=e,n.j.info("VER="+n.la));const r=l[4];null!=r&&(n.Aa=r,n.j.info("SVER="+n.Aa));const u=l[5];null!=u&&"number"==typeof u&&0<u&&(s=1.5*u,n.L=s,n.j.info("backChannelRequestTimeoutMs_="+s)),s=n;const h=t.g;if(h){const t=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(t){var i=s.h;i.g||-1==t.indexOf("spdy")&&-1==t.indexOf("quic")&&-1==t.indexOf("h2")||(i.j=i.l,i.g=new Set,i.h&&(Jt(i,i.h),i.h=null))}if(s.D){const t=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;t&&(s.ya=t,ce(s.I,s.D,t))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-t.F,n.j.info("Handshake RTT: "+n.R+"ms"));var o=t;if((s=n).qa=vn(s,s.J?s.ia:null,s.W),o.K){Zt(s.h,o);var a=o,c=s.L;c&&(a.I=c),a.B&&(qt(a),jt(a)),s.g=o}else ln(s);0<n.i.length&&rn(n)}else"stop"!=l[0]&&"close"!=l[0]||gn(n,7);else 3==n.G&&("stop"==l[0]||"close"==l[0]?"stop"==l[0]?gn(n,7):en(n):"noop"!=l[0]&&n.l&&n.l.ta(l),n.v=0)}_t()}catch(u){}}Lt.prototype.ca=function(t){t=t.target;const e=this.M;e&&3==Ye(t)?e.j():this.Y(t)},Lt.prototype.Y=function(t){try{if(t==this.g)t:{const d=Ye(this.g);var e=this.g.Ba();this.g.Z();if(!(3>d)&&(3!=d||this.g&&(this.h.h||this.g.oa()||Je(this.g)))){this.J||4!=d||7==e||_t(),qt(this);var n=this.g.Z();this.X=n;e:if(Ut(this)){var s=Je(this.g);t="";var i=s.length,o=4==Ye(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){Ht(this),zt(this);var a="";break e}this.h.i=new r.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,t+=this.h.i.decode(s[e],{stream:!(o&&e==i-1)});s.length=0,this.h.g+=t,this.C=0,a=this.h.g}else a=this.g.oa();if(this.o=200==n,function(t,e,n,s,r,i,o){t.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+r+"]: "+e+"\n"+n+"\n"+i+" "+o})}(this.i,this.u,this.A,this.l,this.R,d,n),this.o){if(this.T&&!this.K){e:{if(this.g){var c,l=this.g;if((c=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(c)){var u=c;break e}}u=null}if(!(n=u)){this.o=!1,this.s=3,Ct(12),Ht(this),zt(this);break t}kt(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Kt(this,n)}if(this.P){let t;for(n=!0;!this.J&&this.C<a.length;){if(t=Bt(this,a),t==Pt){4==d&&(this.s=4,Ct(14),n=!1),kt(this.i,this.l,null,"[Incomplete Response]");break}if(t==Mt){this.s=4,Ct(15),kt(this.i,this.l,a,"[Invalid Chunk]"),n=!1;break}kt(this.i,this.l,t,null),Kt(this,t)}if(Ut(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=d||0!=a.length||this.h.h||(this.s=1,Ct(16),n=!1),this.o=this.o&&n,n){if(0<a.length&&!this.W){this.W=!0;var h=this.j;h.g==this&&h.ba&&!h.M&&(h.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),hn(h),h.M=!0,Ct(11))}}else kt(this.i,this.l,a,"[Invalid Chunked Response]"),Ht(this),zt(this)}else kt(this.i,this.l,a,null),Kt(this,a);4==d&&Ht(this),this.o&&!this.J&&(4==d?pn(this.j,this):(this.o=!1,jt(this)))}else(function(t){const e={};t=(t.g&&2<=Ye(t)&&t.g.getAllResponseHeaders()||"").split("\r\n");for(let s=0;s<t.length;s++){if(p(t[s]))continue;var n=_(t[s]);const r=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const i=e[r]||[];e[r]=i,i.push(n)}!function(t,e){for(const n in t)e.call(void 0,t[n],n,t)}(e,function(t){return t.join(", ")})})(this.g),400==n&&0<a.indexOf("Unknown SID")?(this.s=3,Ct(12)):(this.s=0,Ct(13)),Ht(this),zt(this)}}}catch(d){}},Lt.prototype.cancel=function(){this.J=!0,Ht(this)},Lt.prototype.ba=function(){this.B=null;const t=Date.now();0<=t-this.S?(function(t,e){t.info(function(){return"TIMEOUT: "+e})}(this.i,this.A),2!=this.L&&(_t(),Ct(17)),Ht(this),this.s=2,zt(this)):$t(this,this.S-t)};var Gt=class{constructor(t,e){this.g=t,this.map=e}};function Qt(t){this.l=t||10,r.PerformanceNavigationTiming?t=0<(t=r.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(r.chrome&&r.chrome.loadTimes&&r.chrome.loadTimes()&&r.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Wt(t){return!!t.h||!!t.g&&t.g.size>=t.j}function Xt(t){return t.h?1:t.g?t.g.size:0}function Yt(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function Jt(t,e){t.g?t.g.add(e):t.h=e}function Zt(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function te(t){if(null!=t.h)return t.i.concat(t.h.D);if(null!=t.g&&0!==t.g.size){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return d(t.i)}function ee(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(i(t)||"string"==typeof t)Array.prototype.forEach.call(t,e,void 0);else for(var n=function(t){if(t.na&&"function"==typeof t.na)return t.na();if(!t.V||"function"!=typeof t.V){if("undefined"!=typeof Map&&t instanceof Map)return Array.from(t.keys());if(!("undefined"!=typeof Set&&t instanceof Set)){if(i(t)||"string"==typeof t){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const s in t)e[n++]=s;return e}}}(t),s=function(t){if(t.V&&"function"==typeof t.V)return t.V();if("undefined"!=typeof Map&&t instanceof Map||"undefined"!=typeof Set&&t instanceof Set)return Array.from(t.values());if("string"==typeof t)return t.split("");if(i(t)){for(var e=[],n=t.length,s=0;s<n;s++)e.push(t[s]);return e}for(s in e=[],n=0,t)e[n++]=t[s];return e}(t),r=s.length,o=0;o<r;o++)e.call(void 0,s[o],n&&n[o],t)}Qt.prototype.cancel=function(){if(this.i=te(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const t of this.g.values())t.cancel();this.g.clear()}};var ne=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function se(t){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,t instanceof se){this.h=t.h,ie(this,t.j),this.o=t.o,this.g=t.g,oe(this,t.s),this.l=t.l;var e=t.i,n=new ve;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),ae(this,n),this.m=t.m}else t&&(e=String(t).match(ne))?(this.h=!1,ie(this,e[1]||"",!0),this.o=ue(e[2]||""),this.g=ue(e[3]||"",!0),oe(this,e[4]),this.l=ue(e[5]||"",!0),ae(this,e[6]||"",!0),this.m=ue(e[7]||"")):(this.h=!1,this.i=new ve(null,this.h))}function re(t){return new se(t)}function ie(t,e,n){t.j=n?ue(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function oe(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.s=e}else t.s=null}function ae(t,e,n){e instanceof ve?(t.i=e,function(t,e){e&&!t.j&&(we(t),t.i=null,t.g.forEach(function(t,e){var n=e.toLowerCase();e!=n&&(be(this,e),_e(this,n,t))},t)),t.j=e}(t.i,t.h)):(n||(e=he(e,ge)),t.i=new ve(e,t.h))}function ce(t,e,n){t.i.set(e,n)}function le(t){return ce(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function ue(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function he(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,de),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function de(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}se.prototype.toString=function(){var t=[],e=this.j;e&&t.push(he(e,fe,!0),":");var n=this.g;return(n||"file"==e)&&(t.push("//"),(e=this.o)&&t.push(he(e,fe,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.s)&&t.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&t.push("/"),t.push(he(n,"/"==n.charAt(0)?me:pe,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.m)&&t.push("#",he(n,ye)),t.join("")};var fe=/[#\/\?@]/g,pe=/[#\?:]/g,me=/[#\?]/g,ge=/[#\?@]/g,ye=/#/g;function ve(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function we(t){t.g||(t.g=new Map,t.h=0,t.i&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var s=t[n].indexOf("="),r=null;if(0<=s){var i=t[n].substring(0,s);r=t[n].substring(s+1)}else i=t[n];e(i,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}function be(t,e){we(t),e=Te(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function Ee(t,e){return we(t),e=Te(t,e),t.g.has(e)}function _e(t,e,n){be(t,e),0<n.length&&(t.i=null,t.g.set(Te(t,e),d(n)),t.h+=n.length)}function Te(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Ce(t,e,n,s,r){try{r&&(r.onload=null,r.onerror=null,r.onabort=null,r.ontimeout=null),s(n)}catch(i){}}function Ie(){this.g=new ht}function Se(t,e,n){const s=n||"";try{ee(t,function(t,n){let r=t;o(t)&&(r=lt(t)),e.push(s+n+"="+encodeURIComponent(r))})}catch(r){throw e.push(s+"type="+encodeURIComponent("_badmap")),r}}function Ae(t){this.l=t.Ub||null,this.j=t.eb||!1}function ke(t,e){tt.call(this),this.D=t,this.o=e,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function De(t){t.j.read().then(t.Pa.bind(t)).catch(t.ga.bind(t))}function xe(t){t.readyState=4,t.l=null,t.j=null,t.v=null,Ne(t)}function Ne(t){t.onreadystatechange&&t.onreadystatechange.call(t)}function Re(t){let e="";return v(t,function(t,n){e+=n,e+=":",e+=t,e+="\r\n"}),e}function $e(t,e,n){t:{for(s in n){var s=!1;break t}s=!0}s||(n=Re(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):ce(t,e,n))}function qe(t){tt.call(this),this.headers=new Map,this.o=t||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(t=ve.prototype).add=function(t,e){we(this),this.i=null,t=Te(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},t.forEach=function(t,e){we(this),this.g.forEach(function(n,s){n.forEach(function(n){t.call(e,n,s,this)},this)},this)},t.na=function(){we(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let s=0;s<e.length;s++){const r=t[s];for(let t=0;t<r.length;t++)n.push(e[s])}return n},t.V=function(t){we(this);let e=[];if("string"==typeof t)Ee(this,t)&&(e=e.concat(this.g.get(Te(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e},t.set=function(t,e){return we(this),this.i=null,Ee(this,t=Te(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},t.get=function(t,e){return t&&0<(t=this.V(t)).length?String(t[0]):e},t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var s=e[n];const i=encodeURIComponent(String(s)),o=this.V(s);for(s=0;s<o.length;s++){var r=i;""!==o[s]&&(r+="="+encodeURIComponent(String(o[s]))),t.push(r)}}return this.i=t.join("&")},h(Ae,dt),Ae.prototype.g=function(){return new ke(this.l,this.j)},Ae.prototype.i=function(t){return function(){return t}}({}),h(ke,tt),(t=ke.prototype).open=function(t,e){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=t,this.A=e,this.readyState=1,Ne(this)},t.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.u,method:this.B,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||r).fetch(new Request(this.A,e)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,xe(this)),this.readyState=0},t.Sa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Ne(this)),this.g&&(this.readyState=3,Ne(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==r.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;De(this)}else t.text().then(this.Ra.bind(this),this.ga.bind(this))},t.Pa=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var e=t.value?t.value:new Uint8Array(0);(e=this.v.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?xe(this):Ne(this),3==this.readyState&&De(this)}},t.Ra=function(t){this.g&&(this.response=this.responseText=t,xe(this))},t.Qa=function(t){this.g&&(this.response=t,xe(this))},t.ga=function(){this.g&&xe(this)},t.setRequestHeader=function(t,e){this.u.append(t,e)},t.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(ke.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}}),h(qe,tt);var ze=/^https?$/i,He=["POST","PUT"];function Ke(t,e){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=e,t.m=5,Ge(t),We(t)}function Ge(t){t.A||(t.A=!0,et(t,"complete"),et(t,"error"))}function Qe(t){if(t.h&&void 0!==s&&(!t.v[1]||4!=Ye(t)||2!=t.Z()))if(t.u&&4==Ye(t))st(t.Ea,0,t);else if(et(t,"readystatechange"),4==Ye(t)){t.h=!1;try{const s=t.Z();t:switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var n;if(!(n=e)){var i;if(i=0===s){var o=String(t.D).match(ne)[1]||null;!o&&r.self&&r.self.location&&(o=r.self.location.protocol.slice(0,-1)),i=!ze.test(o?o.toLowerCase():"")}n=i}if(n)et(t,"complete"),et(t,"success");else{t.m=6;try{var a=2<Ye(t)?t.g.statusText:""}catch(c){a=""}t.l=a+" ["+t.Z()+"]",Ge(t)}}finally{We(t)}}}function We(t,e){if(t.g){Xe(t);const s=t.g,r=t.v[0]?()=>{}:null;t.g=null,t.v=null,e||et(t,"ready");try{s.onreadystatechange=r}catch(n){}}}function Xe(t){t.I&&(r.clearTimeout(t.I),t.I=null)}function Ye(t){return t.g?t.g.readyState:0}function Je(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.H){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(e){return null}}function Ze(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function tn(t){this.Aa=0,this.i=[],this.j=new At,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ze("failFast",!1,t),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ze("baseRetryDelayMs",5e3,t),this.cb=Ze("retryDelaySeedMs",1e4,t),this.Wa=Ze("forwardChannelMaxRetries",2,t),this.wa=Ze("forwardChannelRequestTimeoutMs",2e4,t),this.pa=t&&t.xmlHttpFactory||void 0,this.Xa=t&&t.Tb||void 0,this.Ca=t&&t.useFetchStreams||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.h=new Qt(t&&t.concurrentRequestLimit),this.Da=new Ie,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=t&&t.Rb||!1,t&&t.xa&&this.j.xa(),t&&t.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&t&&t.detectBufferingProxy||!1,this.ja=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.ja=t.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function en(t){if(sn(t),3==t.G){var e=t.U++,n=re(t.I);if(ce(n,"SID",t.K),ce(n,"RID",e),ce(n,"TYPE","terminate"),an(t,n),(e=new Lt(t,t.j,e)).L=2,e.v=le(re(n)),n=!1,r.navigator&&r.navigator.sendBeacon)try{n=r.navigator.sendBeacon(e.v.toString(),"")}catch(s){}!n&&r.Image&&((new Image).src=e.v,n=!0),n||(e.g=wn(e.j,null),e.g.ea(e.v)),e.F=Date.now(),jt(e)}yn(t)}function nn(t){t.g&&(hn(t),t.g.cancel(),t.g=null)}function sn(t){nn(t),t.u&&(r.clearTimeout(t.u),t.u=null),fn(t),t.h.cancel(),t.s&&("number"==typeof t.s&&r.clearTimeout(t.s),t.s=null)}function rn(t){if(!Wt(t.h)&&!t.s){t.s=!0;var e=t.Ga;A||x(),k||(A(),k=!0),D.add(e,t),t.B=0}}function on(t,e){var n;n=e?e.l:t.U++;const s=re(t.I);ce(s,"SID",t.K),ce(s,"RID",n),ce(s,"AID",t.T),an(t,s),t.m&&t.o&&$e(s,t.m,t.o),n=new Lt(t,t.j,n,t.B+1),null===t.m&&(n.H=t.o),e&&(t.i=e.D.concat(t.i)),e=cn(t,n,1e3),n.I=Math.round(.5*t.wa)+Math.round(.5*t.wa*Math.random()),Jt(t.h,n),Vt(n,s,e)}function an(t,e){t.H&&v(t.H,function(t,n){ce(e,n,t)}),t.l&&ee({},function(t,n){ce(e,n,t)})}function cn(t,e,n){n=Math.min(t.i.length,n);var s=t.l?l(t.l.Na,t.l,t):null;t:{var r=t.i;let e=-1;for(;;){const t=["count="+n];-1==e?0<n?(e=r[0].g,t.push("ofs="+e)):e=0:t.push("ofs="+e);let o=!0;for(let a=0;a<n;a++){let n=r[a].g;const c=r[a].map;if(n-=e,0>n)e=Math.max(0,r[a].g-100),o=!1;else try{Se(c,t,"req"+n+"_")}catch(i){s&&s(c)}}if(o){s=t.join("&");break t}}}return t=t.i.splice(0,n),e.D=t,s}function ln(t){if(!t.g&&!t.u){t.Y=1;var e=t.Fa;A||x(),k||(A(),k=!0),D.add(e,t),t.v=0}}function un(t){return!(t.g||t.u||3<=t.v)&&(t.Y++,t.u=St(l(t.Fa,t),mn(t,t.v)),t.v++,!0)}function hn(t){null!=t.A&&(r.clearTimeout(t.A),t.A=null)}function dn(t){t.g=new Lt(t,t.j,"rpc",t.Y),null===t.m&&(t.g.H=t.o),t.g.O=0;var e=re(t.qa);ce(e,"RID","rpc"),ce(e,"SID",t.K),ce(e,"AID",t.T),ce(e,"CI",t.F?"0":"1"),!t.F&&t.ja&&ce(e,"TO",t.ja),ce(e,"TYPE","xmlhttp"),an(t,e),t.m&&t.o&&$e(e,t.m,t.o),t.L&&(t.g.I=t.L);var n=t.g;t=t.ia,n.L=1,n.v=le(re(e)),n.m=null,n.P=!0,Ft(n,t)}function fn(t){null!=t.C&&(r.clearTimeout(t.C),t.C=null)}function pn(t,e){var n=null;if(t.g==e){fn(t),hn(t),t.g=null;var s=2}else{if(!Yt(t.h,e))return;n=e.D,Zt(t.h,e),s=1}if(0!=t.G)if(e.o)if(1==s){n=e.m?e.m.length:0,e=Date.now()-e.F;var r=t.B;et(s=bt(),new It(s,n)),rn(t)}else ln(t);else if(3==(r=e.s)||0==r&&0<e.X||!(1==s&&function(t,e){return!(Xt(t.h)>=t.h.j-(t.s?1:0)||(t.s?(t.i=e.D.concat(t.i),0):1==t.G||2==t.G||t.B>=(t.Va?0:t.Wa)||(t.s=St(l(t.Ga,t,e),mn(t,t.B)),t.B++,0)))}(t,e)||2==s&&un(t)))switch(n&&0<n.length&&(e=t.h,e.i=e.i.concat(n)),r){case 1:gn(t,5);break;case 4:gn(t,10);break;case 3:gn(t,6);break;default:gn(t,2)}}function mn(t,e){let n=t.Ta+Math.floor(Math.random()*t.cb);return t.isActive()||(n*=2),n*e}function gn(t,e){if(t.j.info("Error code "+e),2==e){var n=l(t.fb,t),s=t.Xa;const e=!s;s=new se(s||"//www.google.com/images/cleardot.gif"),r.location&&"http"==r.location.protocol||ie(s,"https"),le(s),e?function(t,e){const n=new At;if(r.Image){const s=new Image;s.onload=u(Ce,n,"TestLoadImage: loaded",!0,e,s),s.onerror=u(Ce,n,"TestLoadImage: error",!1,e,s),s.onabort=u(Ce,n,"TestLoadImage: abort",!1,e,s),s.ontimeout=u(Ce,n,"TestLoadImage: timeout",!1,e,s),r.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=t}else e(!1)}(s.toString(),n):function(t,e){new At;const n=new AbortController,s=setTimeout(()=>{n.abort(),Ce(0,0,!1,e)},1e4);fetch(t,{signal:n.signal}).then(t=>{clearTimeout(s),t.ok?Ce(0,0,!0,e):Ce(0,0,!1,e)}).catch(()=>{clearTimeout(s),Ce(0,0,!1,e)})}(s.toString(),n)}else Ct(2);t.G=0,t.l&&t.l.sa(e),yn(t),sn(t)}function yn(t){if(t.G=0,t.ka=[],t.l){const e=te(t.h);0==e.length&&0==t.i.length||(f(t.ka,e),f(t.ka,t.i),t.h.i.length=0,d(t.i),t.i.length=0),t.l.ra()}}function vn(t,e,n){var s=n instanceof se?re(n):new se(n);if(""!=s.g)e&&(s.g=e+"."+s.g),oe(s,s.s);else{var i=r.location;s=i.protocol,e=e?e+"."+i.hostname:i.hostname,i=+i.port;var o=new se(null);s&&ie(o,s),e&&(o.g=e),i&&oe(o,i),n&&(o.l=n),s=o}return n=t.D,e=t.ya,n&&e&&ce(s,n,e),ce(s,"VER",t.la),an(t,s),s}function wn(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return(e=t.Ca&&!t.pa?new qe(new Ae({eb:n})):new qe(t.pa)).Ha(t.J),e}function bn(){}function En(){}function _n(t,e){tt.call(this),this.g=new tn(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.va&&(t?t["X-WebChannel-Client-Profile"]=e.va:t={"X-WebChannel-Client-Profile":e.va}),this.g.S=t,(t=e&&e.Sb)&&!p(t)&&(this.g.m=t),this.v=e&&e.supportsCrossDomainXhr||!1,this.u=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!p(e)&&(this.g.D=e,null!==(t=this.h)&&e in t&&(e in(t=this.h)&&delete t[e])),this.j=new In(this)}function Tn(t){gt.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){t:{for(const n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function Cn(){yt.call(this),this.status=1}function In(t){this.g=t}(t=qe.prototype).Ha=function(t){this.J=t},t.ea=function(t,e,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);e=e?e.toUpperCase():"GET",this.D=t,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Dt.g(),this.v=this.o?ft(this.o):ft(Dt),this.g.onreadystatechange=l(this.Ea,this);try{this.B=!0,this.g.open(e,String(t),!0),this.B=!1}catch(o){return void Ke(this,o)}if(t=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var i in s)n.set(i,s[i]);else{if("function"!=typeof s.keys||"function"!=typeof s.get)throw Error("Unknown input type for opt_headers: "+String(s));for(const t of s.keys())n.set(t,s.get(t))}s=Array.from(n.keys()).find(t=>"content-type"==t.toLowerCase()),i=r.FormData&&t instanceof r.FormData,!(0<=Array.prototype.indexOf.call(He,e,void 0))||s||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[r,a]of n)this.g.setRequestHeader(r,a);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Xe(this),this.u=!0,this.g.send(t),this.u=!1}catch(o){Ke(this,o)}},t.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=t||7,et(this,"complete"),et(this,"abort"),We(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),We(this,!0)),qe.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Qe(this):this.bb())},t.bb=function(){Qe(this)},t.isActive=function(){return!!this.g},t.Z=function(){try{return 2<Ye(this)?this.g.status:-1}catch(t){return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch(t){return""}},t.Oa=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),ut(e)}},t.Ba=function(){return this.m},t.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(t=tn.prototype).la=8,t.G=1,t.connect=function(t,e,n,s){Ct(0),this.W=t,this.H=e||{},n&&void 0!==s&&(this.H.OSID=n,this.H.OAID=s),this.F=this.X,this.I=vn(this,null,this.W),rn(this)},t.Ga=function(t){if(this.s)if(this.s=null,1==this.G){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const r=new Lt(this,this.j,t);let i=this.o;if(this.S&&(i?(i=w(i),E(i,this.S)):i=this.S),null!==this.m||this.O||(r.H=i,i=null),this.P)t:{for(var e=0,n=0;n<this.i.length;n++){var s=this.i[n];if(void 0===(s="__data__"in s.map&&"string"==typeof(s=s.map.__data__)?s.length:void 0))break;if(4096<(e+=s)){e=n;break t}if(4096===e||n===this.i.length-1){e=n+1;break t}}e=1e3}else e=1e3;e=cn(this,r,e),ce(n=re(this.I),"RID",t),ce(n,"CVER",22),this.D&&ce(n,"X-HTTP-Session-Id",this.D),an(this,n),i&&(this.O?e="headers="+encodeURIComponent(String(Re(i)))+"&"+e:this.m&&$e(n,this.m,i)),Jt(this.h,r),this.Ua&&ce(n,"TYPE","init"),this.P?(ce(n,"$req",e),ce(n,"SID","null"),r.T=!0,Vt(r,n,null)):Vt(r,n,e),this.G=2}}else 3==this.G&&(t?on(this,t):0==this.i.length||Wt(this.h)||on(this))},t.Fa=function(){if(this.u=null,dn(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var t=2*this.R;this.j.info("BP detection timer enabled: "+t),this.A=St(l(this.ab,this),t)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ct(10),nn(this),dn(this))},t.Za=function(){null!=this.C&&(this.C=null,nn(this),un(this),Ct(19))},t.fb=function(t){t?(this.j.info("Successfully pinged google.com"),Ct(2)):(this.j.info("Failed to ping google.com"),Ct(1))},t.isActive=function(){return!!this.l&&this.l.isActive(this)},(t=bn.prototype).ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){},En.prototype.g=function(t,e){return new _n(t,e)},h(_n,tt),_n.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},_n.prototype.close=function(){en(this.g)},_n.prototype.o=function(t){var e=this.g;if("string"==typeof t){var n={};n.__data__=t,t=n}else this.u&&((n={}).__data__=lt(t),t=n);e.i.push(new Gt(e.Ya++,t)),3==e.G&&rn(e)},_n.prototype.N=function(){this.g.l=null,delete this.j,en(this.g),delete this.g,_n.aa.N.call(this)},h(Tn,gt),h(Cn,yt),h(In,bn),In.prototype.ua=function(){et(this.g,"a")},In.prototype.ta=function(t){et(this.g,new Tn(t))},In.prototype.sa=function(t){et(this.g,new Cn)},In.prototype.ra=function(){et(this.g,"b")},En.prototype.createWebChannel=En.prototype.g,_n.prototype.send=_n.prototype.o,_n.prototype.open=_n.prototype.m,_n.prototype.close=_n.prototype.close,Be=function(){return new En},Ue=function(){return bt()},Fe=vt,Ve={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},xt.NO_ERROR=0,xt.TIMEOUT=8,xt.HTTP_ERROR=6,Pe=xt,Nt.COMPLETE="complete",Me=Nt,pt.EventType=mt,mt.OPEN="a",mt.CLOSE="b",mt.ERROR="c",mt.MESSAGE="d",tt.prototype.listen=tt.prototype.K,Oe=pt,qe.prototype.listenOnce=qe.prototype.L,qe.prototype.getLastError=qe.prototype.Ka,qe.prototype.getLastErrorCode=qe.prototype.Ba,qe.prototype.getStatus=qe.prototype.Z,qe.prototype.getResponseJson=qe.prototype.Oa,qe.prototype.getResponseText=qe.prototype.oa,qe.prototype.send=qe.prototype.ea,qe.prototype.setWithCredentials=qe.prototype.Ha,Le=qe}).apply(void 0!==je?je:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const $e="@firebase/firestore",qe="4.7.17";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}ze.UNAUTHENTICATED=new ze(null),ze.GOOGLE_CREDENTIALS=new ze("google-credentials-uid"),ze.FIRST_PARTY=new ze("first-party-uid"),ze.MOCK_USER=new ze("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let He="11.9.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ke=new gt("@firebase/firestore");function Ge(){return Ke.logLevel}function Qe(t,...e){if(Ke.logLevel<=ut.DEBUG){const n=e.map(Ye);Ke.debug(`Firestore (${He}): ${t}`,...n)}}function We(t,...e){if(Ke.logLevel<=ut.ERROR){const n=e.map(Ye);Ke.error(`Firestore (${He}): ${t}`,...n)}}function Xe(t,...e){if(Ke.logLevel<=ut.WARN){const n=e.map(Ye);Ke.warn(`Firestore (${He}): ${t}`,...n)}}function Ye(t){if("string"==typeof t)return t;try{
/**
    * @license
    * Copyright 2020 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
return e=t,JSON.stringify(e)}catch(n){return t}var e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(t,e,n){let s="Unexpected state";"string"==typeof e?s=e:n=e,Ze(t,s,n)}function Ze(t,e,n){let s=`FIRESTORE (${He}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(void 0!==n)try{s+=" CONTEXT: "+JSON.stringify(n)}catch(r){s+=" CONTEXT: "+n}throw We(s),new Error(s)}function tn(t,e,n,s){let r="Unexpected state";"string"==typeof n?r=n:s=n,t||Ze(e,r,s)}function en(t,e){return t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nn={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class sn extends tt{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class an{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(ze.UNAUTHENTICATED))}shutdown(){}}class cn{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class ln{constructor(t){this.t=t,this.currentUser=ze.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){tn(void 0===this.o,42304);let n=this.i;const s=t=>this.i!==n?(n=this.i,e(t)):Promise.resolve();let r=new rn;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new rn,t.enqueueRetryable(()=>s(this.currentUser))};const i=()=>{const e=r;t.enqueueRetryable(async()=>{await e.promise,await s(this.currentUser)})},o=t=>{Qe("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=t,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(t=>o(t)),setTimeout(()=>{if(!this.auth){const t=this.t.getImmediate({optional:!0});t?o(t):(Qe("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new rn)}},0),i()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(e=>this.i!==t?(Qe("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(tn("string"==typeof e.accessToken,31837,{l:e}),new on(e.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return tn(null===t||"string"==typeof t,2055,{h:t}),new ze(t)}}class un{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=ze.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class hn{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new un(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(ze.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class dn{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class fn{constructor(t,e){var n;this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,null!=(n=t)&&void 0!==n.settings&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){tn(void 0===this.o,3512);const n=t=>{null!=t.error&&Qe("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`);const n=t.token!==this.m;return this.m=t.token,Qe("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?e(t.token):Promise.resolve()};this.o=e=>{t.enqueueRetryable(()=>n(e))};const s=t=>{Qe("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=t,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(t=>s(t)),setTimeout(()=>{if(!this.appCheck){const t=this.V.getImmediate({optional:!0});t?s(t):Qe("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new dn(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(t=>t?(tn("string"==typeof t.token,44558,{tokenResult:t}),this.m=t.token,new dn(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pn(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mn(){return new TextEncoder}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{static newId(){const t=62*Math.floor(256/62);let e="";for(;e.length<20;){const n=pn(40);for(let s=0;s<n.length;++s)e.length<20&&n[s]<t&&(e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[s]%62))}return e}}function yn(t,e){return t<e?-1:t>e?1:0}function vn(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=t.codePointAt(n),r=e.codePointAt(n);if(s!==r){if(s<128&&r<128)return yn(s,r);{const i=mn(),o=bn(i.encode(wn(t,n)),i.encode(wn(e,n)));return 0!==o?o:yn(s,r)}}n+=s>65535?2:1}return yn(t.length,e.length)}function wn(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function bn(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return yn(t[n],e[n]);return yn(t.length,e.length)}function En(t,e,n){return t.length===e.length&&t.every((t,s)=>n(t,e[s]))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=-62135596800,Tn=1e6;class Cn{static now(){return Cn.fromMillis(Date.now())}static fromDate(t){return Cn.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Tn);return new Cn(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new sn(nn.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new sn(nn.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<_n)throw new sn(nn.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new sn(nn.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Tn}_compareTo(t){return this.seconds===t.seconds?yn(this.nanoseconds,t.nanoseconds):yn(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-_n;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{static fromTimestamp(t){return new In(t)}static min(){return new In(new Cn(0,0))}static max(){return new In(new Cn(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn="__name__";class An{constructor(t,e,n){void 0===e?e=0:e>t.length&&Je(637,{offset:e,range:t.length}),void 0===n?n=t.length-e:n>t.length-e&&Je(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===An.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof An?t.forEach(t=>{e.push(t)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const n=An.compareSegments(t.get(s),e.get(s));if(0!==n)return n}return yn(t.length,e.length)}static compareSegments(t,e){const n=An.isNumericId(t),s=An.isNumericId(e);return n&&!s?-1:!n&&s?1:n&&s?An.extractNumericId(t).compare(An.extractNumericId(e)):vn(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return xe.fromString(t.substring(4,t.length-2))}}class kn extends An{construct(t,e,n){return new kn(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new sn(nn.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(t=>t.length>0))}return new kn(e)}static emptyPath(){return new kn([])}}const Dn=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class xn extends An{construct(t,e,n){return new xn(t,e,n)}static isValidIdentifier(t){return Dn.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),xn.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Sn}static keyField(){return new xn([Sn])}static fromServerFormat(t){const e=[];let n="",s=0;const r=()=>{if(0===n.length)throw new sn(nn.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;s<t.length;){const e=t[s];if("\\"===e){if(s+1===t.length)throw new sn(nn.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[s+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new sn(nn.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,s+=2}else"`"===e?(i=!i,s++):"."!==e||i?(n+=e,s++):(r(),s++)}if(r(),i)throw new sn(nn.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new xn(e)}static emptyPath(){return new xn([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(t){this.path=t}static fromPath(t){return new Nn(kn.fromString(t))}static fromName(t){return new Nn(kn.fromString(t).popFirst(5))}static empty(){return new Nn(kn.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return null!==t&&0===kn.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return kn.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new Nn(new kn(t.slice()))}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(t){return new Ln(t.readTime,t.key,-1)}class Ln{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Ln(In.min(),Nn.empty(),-1)}static max(){return new Ln(In.max(),Nn.empty(),-1)}}function On(t,e){let n=t.readTime.compareTo(e.readTime);return 0!==n?n:(n=Nn.comparator(t.documentKey,e.documentKey),0!==n?n:yn(t.largestBatchId,e.largestBatchId)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)}class Mn{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pn(t){if(t.code!==nn.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==t.message)throw t;Qe("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&Je(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new Vn((n,s)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,s)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof Vn?e:Vn.resolve(e)}catch(e){return Vn.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):Vn.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):Vn.reject(e)}static resolve(t){return new Vn((e,n)=>{e(t)})}static reject(t){return new Vn((e,n)=>{n(t)})}static waitFor(t){return new Vn((e,n)=>{let s=0,r=0,i=!1;t.forEach(t=>{++s,t.next(()=>{++r,i&&r===s&&e()},t=>n(t))}),i=!0,r===s&&e()})}static or(t){let e=Vn.resolve(!1);for(const n of t)e=e.next(t=>t?Vn.resolve(t):n());return e}static forEach(t,e){const n=[];return t.forEach((t,s)=>{n.push(e.call(this,t,s))}),this.waitFor(n)}static mapArray(t,e){return new Vn((n,s)=>{const r=t.length,i=new Array(r);let o=0;for(let a=0;a<r;a++){const c=a;e(t[c]).next(t=>{i[c]=t,++o,o===r&&n(i)},t=>s(t))}})}static doWhile(t,e){return new Vn((n,s)=>{const r=()=>{!0===t()?e().next(()=>{r()},s):n()};r()})}}function Fn(t){return"IndexedDbTransactionError"===t.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.ue(t),this.ce=t=>e.writeSequenceNumber(t))}ue(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ce&&this.ce(t),t}}Un.le=-1;function Bn(t){return null==t}function jn(t){return 0===t&&1/t==-1/0}function $n(t,e){let n=e;const s=t.length;for(let r=0;r<s;r++){const e=t.charAt(r);switch(e){case"\0":n+="";break;case"":n+="";break;default:n+=e}}return n}function qn(t){return t+""}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zn(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Hn(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Kn(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(t,e){this.comparator=t,this.root=e||Wn.EMPTY}insert(t,e){return new Gn(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Wn.BLACK,null,null))}remove(t){return new Gn(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Wn.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(0===s)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Qn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Qn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Qn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Qn(this.root,t,this.comparator,!0)}}class Qn{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!t.isEmpty();)if(r=e?n(t.key,e):1,e&&s&&(r*=-1),r<0)t=this.isReverse?t.left:t.right;else{if(0===r){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Wn{constructor(t,e,n,s,r){this.key=t,this.value=e,this.color=null!=n?n:Wn.RED,this.left=null!=s?s:Wn.EMPTY,this.right=null!=r?r:Wn.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,r){return new Wn(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=s?s:this.left,null!=r?r:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const r=n(t,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(t,e,n),null):0===r?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Wn.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),0===e(t,s.key)){if(s.right.isEmpty())return Wn.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Wn.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Wn.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Je(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Je(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw Je(27949);return t+(this.isRed()?0:1)}}Wn.EMPTY=null,Wn.RED=!0,Wn.BLACK=!1,Wn.EMPTY=new class{constructor(){this.size=0}get key(){throw Je(57766)}get value(){throw Je(16141)}get color(){throw Je(16727)}get left(){throw Je(29726)}get right(){throw Je(36894)}copy(t,e,n,s,r){return this}insert(t,e,n){return new Wn(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xn{constructor(t){this.comparator=t,this.data=new Gn(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Yn(this.data.getIterator())}getIteratorFrom(t){return new Yn(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(t=>{e=e.add(t)}),e}isEqual(t){if(!(t instanceof Xn))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,s=n.getNext().key;if(0!==this.comparator(t,s))return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new Xn(this.comparator);return e.data=t,e}}class Yn{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(t){this.fields=t,t.sort(xn.comparator)}static empty(){return new Jn([])}unionWith(t){let e=new Xn(xn.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Jn(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return En(this.fields,t.fields,(t,e)=>t.isEqual(e))}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(t){try{return atob(t)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new Zn("Invalid base64 string: "+e):e}}(t);return new ts(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new ts(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return yn(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ts.EMPTY_BYTE_STRING=new ts("");const es=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ns(t){if(tn(!!t,39018),"string"==typeof t){let e=0;const n=es.exec(t);if(tn(!!n,46558,{timestamp:t}),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:ss(t.seconds),nanos:ss(t.nanos)}}function ss(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function rs(t){return"string"==typeof t?ts.fromBase64String(t):ts.fromUint8Array(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const is="server_timestamp",os="__type__",as="__previous_value__",cs="__local_write_time__";function ls(t){var e,n;return(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{})[os])||void 0===n?void 0:n.stringValue)===is}function us(t){const e=t.mapValue.fields[as];return ls(e)?us(e):e}function hs(t){const e=ns(t.mapValue.fields[cs].timestampValue);return new Cn(e.seconds,e.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(t,e,n,s,r,i,o,a,c,l){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=r,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=l}}const fs="(default)";class ps{constructor(t,e){this.projectId=t,this.database=e||fs}static empty(){return new ps("","")}get isDefaultDatabase(){return this.database===fs}isEqual(t){return t instanceof ps&&t.projectId===this.projectId&&t.database===this.database}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms="__type__",gs="__max__",ys={},vs="__vector__",ws="value";function bs(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?ls(t)?4:function(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===gs}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)?9007199254740991:function(t){var e,n;return(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{})[ms])||void 0===n?void 0:n.stringValue)===vs}(t)?10:11:Je(28295,{value:t})}function Es(t,e){if(t===e)return!0;const n=bs(t);if(n!==bs(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return hs(t).isEqual(hs(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=ns(t.timestampValue),s=ns(e.timestampValue);return n.seconds===s.seconds&&n.nanos===s.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return s=e,rs(t.bytesValue).isEqual(rs(s.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return ss(t.geoPointValue.latitude)===ss(e.geoPointValue.latitude)&&ss(t.geoPointValue.longitude)===ss(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return ss(t.integerValue)===ss(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=ss(t.doubleValue),s=ss(e.doubleValue);return n===s?jn(n)===jn(s):isNaN(n)&&isNaN(s)}return!1}(t,e);case 9:return En(t.arrayValue.values||[],e.arrayValue.values||[],Es);case 10:case 11:return function(t,e){const n=t.mapValue.fields||{},s=e.mapValue.fields||{};if(zn(n)!==zn(s))return!1;for(const r in n)if(n.hasOwnProperty(r)&&(void 0===s[r]||!Es(n[r],s[r])))return!1;return!0}(t,e);default:return Je(52216,{left:t})}var s}function _s(t,e){return void 0!==(t.values||[]).find(t=>Es(t,e))}function Ts(t,e){if(t===e)return 0;const n=bs(t),s=bs(e);if(n!==s)return yn(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return yn(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=ss(t.integerValue||t.doubleValue),s=ss(e.integerValue||e.doubleValue);return n<s?-1:n>s?1:n===s?0:isNaN(n)?isNaN(s)?0:-1:1}(t,e);case 3:return Cs(t.timestampValue,e.timestampValue);case 4:return Cs(hs(t),hs(e));case 5:return vn(t.stringValue,e.stringValue);case 6:return function(t,e){const n=rs(t),s=rs(e);return n.compareTo(s)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),s=e.split("/");for(let r=0;r<n.length&&r<s.length;r++){const t=yn(n[r],s[r]);if(0!==t)return t}return yn(n.length,s.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=yn(ss(t.latitude),ss(e.latitude));return 0!==n?n:yn(ss(t.longitude),ss(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Is(t.arrayValue,e.arrayValue);case 10:return function(t,e){var n,s,r,i;const o=t.fields||{},a=e.fields||{},c=null===(n=o[ws])||void 0===n?void 0:n.arrayValue,l=null===(s=a[ws])||void 0===s?void 0:s.arrayValue,u=yn((null===(r=null==c?void 0:c.values)||void 0===r?void 0:r.length)||0,(null===(i=null==l?void 0:l.values)||void 0===i?void 0:i.length)||0);return 0!==u?u:Is(c,l)}(t.mapValue,e.mapValue);case 11:return function(t,e){if(t===ys&&e===ys)return 0;if(t===ys)return 1;if(e===ys)return-1;const n=t.fields||{},s=Object.keys(n),r=e.fields||{},i=Object.keys(r);s.sort(),i.sort();for(let o=0;o<s.length&&o<i.length;++o){const t=vn(s[o],i[o]);if(0!==t)return t;const e=Ts(n[s[o]],r[i[o]]);if(0!==e)return e}return yn(s.length,i.length)}(t.mapValue,e.mapValue);default:throw Je(23264,{Pe:n})}}function Cs(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return yn(t,e);const n=ns(t),s=ns(e),r=yn(n.seconds,s.seconds);return 0!==r?r:yn(n.nanos,s.nanos)}function Is(t,e){const n=t.values||[],s=e.values||[];for(let r=0;r<n.length&&r<s.length;++r){const t=Ts(n[r],s[r]);if(t)return t}return yn(n.length,s.length)}function Ss(t){return As(t)}function As(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=ns(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?rs(t.bytesValue).toBase64():"referenceValue"in t?function(t){return Nn.fromName(t).toString()}(t.referenceValue):"geoPointValue"in t?function(t){return`geo(${t.latitude},${t.longitude})`}(t.geoPointValue):"arrayValue"in t?function(t){let e="[",n=!0;for(const s of t.values||[])n?n=!1:e+=",",e+=As(s);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",s=!0;for(const r of e)s?s=!1:n+=",",n+=`${r}:${As(t.fields[r])}`;return n+"}"}(t.mapValue):Je(61005,{value:t})}function ks(t){switch(bs(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=us(t);return e?16+ks(e):16;case 5:return 2*t.stringValue.length;case 6:return rs(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(t.arrayValue.values||[]).reduce((t,e)=>t+ks(e),0);case 10:case 11:return function(t){let e=0;return Hn(t.fields,(t,n)=>{e+=t.length+ks(n)}),e}(t.mapValue);default:throw Je(13486,{value:t})}}function Ds(t){return!!t&&"integerValue"in t}function xs(t){return!!t&&"arrayValue"in t}function Ns(t){return!!t&&"nullValue"in t}function Rs(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ls(t){return!!t&&"mapValue"in t}function Os(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Hn(t.mapValue.fields,(t,n)=>e.mapValue.fields[t]=Os(n)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Os(t.arrayValue.values[n]);return e}return Object.assign({},t)}class Ms{constructor(t){this.value=t}static empty(){return new Ms({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Ls(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Os(e)}setAll(t){let e=xn.emptyPath(),n={},s=[];t.forEach((t,r)=>{if(!e.isImmediateParentOf(r)){const t=this.getFieldsMap(e);this.applyChanges(t,n,s),n={},s=[],e=r.popLast()}t?n[r.lastSegment()]=Os(t):s.push(r.lastSegment())});const r=this.getFieldsMap(e);this.applyChanges(r,n,s)}delete(t){const e=this.field(t.popLast());Ls(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Es(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];Ls(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){Hn(e,(e,n)=>t[e]=n);for(const s of n)delete t[s]}clone(){return new Ms(Os(this.value))}}function Ps(t){const e=[];return Hn(t.fields,(t,n)=>{const s=new xn([t]);if(Ls(n)){const t=Ps(n.mapValue).fields;if(0===t.length)e.push(s);else for(const n of t)e.push(s.child(n))}else e.push(s)}),new Jn(e)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Vs{constructor(t,e,n,s,r,i,o){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=r,this.data=i,this.documentState=o}static newInvalidDocument(t){return new Vs(t,0,In.min(),In.min(),In.min(),Ms.empty(),0)}static newFoundDocument(t,e,n,s){return new Vs(t,1,e,In.min(),n,s,0)}static newNoDocument(t,e){return new Vs(t,2,e,In.min(),In.min(),Ms.empty(),0)}static newUnknownDocument(t,e){return new Vs(t,3,e,In.min(),In.min(),Ms.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(In.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Ms.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Ms.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=In.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof Vs&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Vs(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(t,e){this.position=t,this.inclusive=e}}function Us(t,e,n){let s=0;for(let r=0;r<t.position.length;r++){const i=e[r],o=t.position[r];if(s=i.field.isKeyField()?Nn.comparator(Nn.fromName(o.referenceValue),n.key):Ts(o,n.data.field(i.field)),"desc"===i.dir&&(s*=-1),0!==s)break}return s}function Bs(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Es(t.position[n],e.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js{constructor(t,e="asc"){this.field=t,this.dir=e}}function $s(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{}class zs extends qs{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.createKeyFieldInFilter(t,e,n):new Ys(t,e,n):"array-contains"===e?new er(t,n):"in"===e?new nr(t,n):"not-in"===e?new sr(t,n):"array-contains-any"===e?new rr(t,n):new zs(t,e,n)}static createKeyFieldInFilter(t,e,n){return"in"===e?new Js(t,n):new Zs(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&void 0===e.nullValue&&this.matchesComparison(Ts(e,this.value)):null!==e&&bs(this.value)===bs(e)&&this.matchesComparison(Ts(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return Je(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Hs extends qs{constructor(t,e){super(),this.filters=t,this.op=e,this.Te=null}static create(t,e){return new Hs(t,e)}matches(t){return Ks(this)?void 0===this.filters.find(e=>!e.matches(t)):void 0!==this.filters.find(e=>e.matches(t))}getFlattenedFilters(){return null!==this.Te||(this.Te=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function Ks(t){return"and"===t.op}function Gs(t){return function(t){for(const e of t.filters)if(e instanceof Hs)return!1;return!0}(t)&&Ks(t)}function Qs(t){if(t instanceof zs)return t.field.canonicalString()+t.op.toString()+Ss(t.value);if(Gs(t))return t.filters.map(t=>Qs(t)).join(",");{const e=t.filters.map(t=>Qs(t)).join(",");return`${t.op}(${e})`}}function Ws(t,e){return t instanceof zs?(n=t,(s=e)instanceof zs&&n.op===s.op&&n.field.isEqual(s.field)&&Es(n.value,s.value)):t instanceof Hs?function(t,e){return e instanceof Hs&&t.op===e.op&&t.filters.length===e.filters.length&&t.filters.reduce((t,n,s)=>t&&Ws(n,e.filters[s]),!0)}(t,e):void Je(19439);var n,s}function Xs(t){return t instanceof zs?`${(e=t).field.canonicalString()} ${e.op} ${Ss(e.value)}`:t instanceof Hs?function(t){return t.op.toString()+" {"+t.getFilters().map(Xs).join(" ,")+"}"}(t):"Filter";var e}class Ys extends zs{constructor(t,e,n){super(t,e,n),this.key=Nn.fromName(n.referenceValue)}matches(t){const e=Nn.comparator(t.key,this.key);return this.matchesComparison(e)}}class Js extends zs{constructor(t,e){super(t,"in",e),this.keys=tr("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Zs extends zs{constructor(t,e){super(t,"not-in",e),this.keys=tr("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function tr(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map(t=>Nn.fromName(t.referenceValue))}class er extends zs{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return xs(e)&&_s(e.arrayValue,this.value)}}class nr extends zs{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&_s(this.value.arrayValue,e)}}class sr extends zs{constructor(t,e){super(t,"not-in",e)}matches(t){if(_s(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&void 0===e.nullValue&&!_s(this.value.arrayValue,e)}}class rr extends zs{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!xs(e)||!e.arrayValue.values)&&e.arrayValue.values.some(t=>_s(this.value.arrayValue,t))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(t,e=null,n=[],s=[],r=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=r,this.startAt=i,this.endAt=o,this.Ie=null}}function or(t,e=null,n=[],s=[],r=null,i=null,o=null){return new ir(t,e,n,s,r,i,o)}function ar(t){const e=en(t);if(null===e.Ie){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(t=>Qs(t)).join(","),t+="|ob:",t+=e.orderBy.map(t=>{return(e=t).field.canonicalString()+e.dir;var e}).join(","),Bn(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(t=>Ss(t)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(t=>Ss(t)).join(",")),e.Ie=t}return e.Ie}function cr(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!$s(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Ws(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Bs(t.startAt,e.startAt)&&Bs(t.endAt,e.endAt)}function lr(t){return Nn.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(t,e=null,n=[],s=[],r=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=r,this.limitType=i,this.startAt=o,this.endAt=a,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function hr(t){return new ur(t)}function dr(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}function fr(t){const e=en(t);if(null===e.Ee){e.Ee=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ee.push(s),t.add(s.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(t){let e=new Xn(xn.comparator);return t.filters.forEach(t=>{t.getFlattenedFilters().forEach(t=>{t.isInequality()&&(e=e.add(t.field))})}),e})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ee.push(new js(s,n))}),t.has(xn.keyField().canonicalString())||e.Ee.push(new js(xn.keyField(),n))}return e.Ee}function pr(t){const e=en(t);return e.de||(e.de=function(t,e){if("F"===t.limitType)return or(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(t=>{const e="desc"===t.dir?"asc":"desc";return new js(t.field,e)});const n=t.endAt?new Fs(t.endAt.position,t.endAt.inclusive):null,s=t.startAt?new Fs(t.startAt.position,t.startAt.inclusive):null;return or(t.path,t.collectionGroup,e,t.filters,t.limit,n,s)}}(e,fr(t))),e.de}function mr(t,e,n){return new ur(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function gr(t,e){return cr(pr(t),pr(e))&&t.limitType===e.limitType}function yr(t){return`${ar(pr(t))}|lt:${t.limitType}`}function vr(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map(t=>Xs(t)).join(", ")}]`),Bn(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map(t=>{return`${(e=t).field.canonicalString()} (${e.dir})`;var e}).join(", ")}]`),t.startAt&&(e+=", startAt: ",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(t=>Ss(t)).join(",")),t.endAt&&(e+=", endAt: ",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(t=>Ss(t)).join(",")),`Target(${e})`}(pr(t))}; limitType=${t.limitType})`}function wr(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):Nn.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of fr(t))if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&(s=e,!((n=t).startAt&&!function(t,e,n){const s=Us(t,e,n);return t.inclusive?s<=0:s<0}(n.startAt,fr(n),s)||n.endAt&&!function(t,e,n){const s=Us(t,e,n);return t.inclusive?s>=0:s>0}(n.endAt,fr(n),s)));var n,s}function br(t){return(e,n)=>{let s=!1;for(const r of fr(t)){const t=Er(r,e,n);if(0!==t)return t;s=s||r.field.isKeyField()}return 0}}function Er(t,e,n){const s=t.field.isKeyField()?Nn.comparator(e.key,n.key):function(t,e,n){const s=e.data.field(t),r=n.data.field(t);return null!==s&&null!==r?Ts(s,r):Je(42886)}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return Je(19790,{direction:t.dir})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[s,r]of n)if(this.equalsFn(s,t))return r}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(void 0===s)return this.inner[n]=[[t,e]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],t))return void(s[r]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return 1===n.length?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Hn(this.inner,(e,n)=>{for(const[s,r]of n)t(s,r)})}isEmpty(){return Kn(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr=new Gn(Nn.comparator);function Cr(){return Tr}const Ir=new Gn(Nn.comparator);function Sr(...t){let e=Ir;for(const n of t)e=e.insert(n.key,n);return e}function Ar(t){let e=Ir;return t.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function kr(){return xr()}function Dr(){return xr()}function xr(){return new _r(t=>t.toString(),(t,e)=>t.isEqual(e))}const Nr=new Gn(Nn.comparator),Rr=new Xn(Nn.comparator);function Lr(...t){let e=Rr;for(const n of t)e=e.add(n);return e}const Or=new Xn(yn);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Mr(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:jn(e)?"-0":e}}function Pr(t){return{integerValue:""+t}}function Vr(t,e){return function(t){return"number"==typeof t&&Number.isInteger(t)&&!jn(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)?Pr(e):Mr(t,e)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(){this._=void 0}}function Ur(t,e,n){return t instanceof $r?function(t,e){const n={fields:{[os]:{stringValue:is},[cs]:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&ls(e)&&(e=us(e)),e&&(n.fields[as]=e),{mapValue:n}}(n,e):t instanceof qr?zr(t,e):t instanceof Hr?Kr(t,e):function(t,e){const n=jr(t,e),s=Qr(n)+Qr(t.Re);return Ds(n)&&Ds(t.Re)?Pr(s):Mr(t.serializer,s)}(t,e)}function Br(t,e,n){return t instanceof qr?zr(t,e):t instanceof Hr?Kr(t,e):n}function jr(t,e){return t instanceof Gr?Ds(n=e)||(s=n)&&"doubleValue"in s?e:{integerValue:0}:null;var n,s}class $r extends Fr{}class qr extends Fr{constructor(t){super(),this.elements=t}}function zr(t,e){const n=Wr(e);for(const s of t.elements)n.some(t=>Es(t,s))||n.push(s);return{arrayValue:{values:n}}}class Hr extends Fr{constructor(t){super(),this.elements=t}}function Kr(t,e){let n=Wr(e);for(const s of t.elements)n=n.filter(t=>!Es(t,s));return{arrayValue:{values:n}}}class Gr extends Fr{constructor(t,e){super(),this.serializer=t,this.Re=e}}function Qr(t){return ss(t.integerValue||t.doubleValue)}function Wr(t){return xs(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(t,e){this.field=t,this.transform=e}}class Yr{constructor(t,e){this.version=t,this.transformResults=e}}class Jr{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Jr}static exists(t){return new Jr(void 0,t)}static updateTime(t){return new Jr(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Zr(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class ti{}function ei(t,e){if(!t.hasLocalMutations||e&&0===e.fields.length)return null;if(null===e)return t.isNoDocument()?new hi(t.key,Jr.none()):new oi(t.key,t.data,Jr.none());{const n=t.data,s=Ms.empty();let r=new Xn(xn.comparator);for(let t of e.fields)if(!r.has(t)){let e=n.field(t);null===e&&t.length>1&&(t=t.popLast(),e=n.field(t)),null===e?s.delete(t):s.set(t,e),r=r.add(t)}return new ai(t.key,s,new Jn(r.toArray()),Jr.none())}}function ni(t,e,n){var s;t instanceof oi?function(t,e,n){const s=t.value.clone(),r=li(t.fieldTransforms,e,n.transformResults);s.setAll(r),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):t instanceof ai?function(t,e,n){if(!Zr(t.precondition,e))return void e.convertToUnknownDocument(n.version);const s=li(t.fieldTransforms,e,n.transformResults),r=e.data;r.setAll(ci(t)),r.setAll(s),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):(s=n,e.convertToNoDocument(s.version).setHasCommittedMutations())}function si(t,e,n,s){return t instanceof oi?function(t,e,n,s){if(!Zr(t.precondition,e))return n;const r=t.value.clone(),i=ui(t.fieldTransforms,s,e);return r.setAll(i),e.convertToFoundDocument(e.version,r).setHasLocalMutations(),null}(t,e,n,s):t instanceof ai?function(t,e,n,s){if(!Zr(t.precondition,e))return n;const r=ui(t.fieldTransforms,s,e),i=e.data;return i.setAll(ci(t)),i.setAll(r),e.convertToFoundDocument(e.version,i).setHasLocalMutations(),null===n?null:n.unionWith(t.fieldMask.fields).unionWith(t.fieldTransforms.map(t=>t.field))}(t,e,n,s):(r=e,i=n,Zr(t.precondition,r)?(r.convertToNoDocument(r.version).setHasLocalMutations(),null):i);var r,i}function ri(t,e){let n=null;for(const s of t.fieldTransforms){const t=e.data.field(s.field),r=jr(s.transform,t||null);null!=r&&(null===n&&(n=Ms.empty()),n.set(s.field,r))}return n||null}function ii(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&(n=t.fieldTransforms,s=e.fieldTransforms,!!(void 0===n&&void 0===s||n&&s&&En(n,s,(t,e)=>function(t,e){return t.field.isEqual(e.field)&&(n=t.transform,s=e.transform,n instanceof qr&&s instanceof qr||n instanceof Hr&&s instanceof Hr?En(n.elements,s.elements,Es):n instanceof Gr&&s instanceof Gr?Es(n.Re,s.Re):n instanceof $r&&s instanceof $r);var n,s}(t,e)))&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask)));var n,s}class oi extends ti{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ai extends ti{constructor(t,e,n,s,r=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function ci(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function li(t,e,n){const s=new Map;tn(t.length===n.length,32656,{Ve:n.length,me:t.length});for(let r=0;r<n.length;r++){const i=t[r],o=i.transform,a=e.data.field(i.field);s.set(i.field,Br(o,a,n[r]))}return s}function ui(t,e,n){const s=new Map;for(const r of t){const t=r.transform,i=n.data.field(r.field);s.set(r.field,Ur(t,i,e))}return s}class hi extends ti{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class di extends ti{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const e=this.mutations[s];e.key.isEqual(t.key)&&ni(e,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=si(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=si(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Dr();return this.mutations.forEach(s=>{const r=t.get(s.key),i=r.overlayedDocument;let o=this.applyToLocalView(i,r.mutatedFields);o=e.has(s.key)?null:o;const a=ei(i,o);null!==a&&n.set(s.key,a),i.isValidDocument()||i.convertToNoDocument(In.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),Lr())}isEqual(t){return this.batchId===t.batchId&&En(this.mutations,t.mutations,(t,e)=>ii(t,e))&&En(this.baseMutations,t.baseMutations,(t,e)=>ii(t,e))}}class pi{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){tn(t.mutations.length===n.length,58842,{fe:t.mutations.length,ge:n.length});let s=function(){return Nr}();const r=t.mutations;for(let i=0;i<r.length;i++)s=s.insert(r[i].key,n[i].version);return new pi(t,e,n,s)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return null!==t&&this.mutation===t.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(t,e){this.count=t,this.unchangedNames=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yi,vi;function wi(t){if(void 0===t)return We("GRPC error has no .code"),nn.UNKNOWN;switch(t){case yi.OK:return nn.OK;case yi.CANCELLED:return nn.CANCELLED;case yi.UNKNOWN:return nn.UNKNOWN;case yi.DEADLINE_EXCEEDED:return nn.DEADLINE_EXCEEDED;case yi.RESOURCE_EXHAUSTED:return nn.RESOURCE_EXHAUSTED;case yi.INTERNAL:return nn.INTERNAL;case yi.UNAVAILABLE:return nn.UNAVAILABLE;case yi.UNAUTHENTICATED:return nn.UNAUTHENTICATED;case yi.INVALID_ARGUMENT:return nn.INVALID_ARGUMENT;case yi.NOT_FOUND:return nn.NOT_FOUND;case yi.ALREADY_EXISTS:return nn.ALREADY_EXISTS;case yi.PERMISSION_DENIED:return nn.PERMISSION_DENIED;case yi.FAILED_PRECONDITION:return nn.FAILED_PRECONDITION;case yi.ABORTED:return nn.ABORTED;case yi.OUT_OF_RANGE:return nn.OUT_OF_RANGE;case yi.UNIMPLEMENTED:return nn.UNIMPLEMENTED;case yi.DATA_LOSS:return nn.DATA_LOSS;default:return Je(39323,{code:t})}}(vi=yi||(yi={}))[vi.OK=0]="OK",vi[vi.CANCELLED=1]="CANCELLED",vi[vi.UNKNOWN=2]="UNKNOWN",vi[vi.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",vi[vi.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",vi[vi.NOT_FOUND=5]="NOT_FOUND",vi[vi.ALREADY_EXISTS=6]="ALREADY_EXISTS",vi[vi.PERMISSION_DENIED=7]="PERMISSION_DENIED",vi[vi.UNAUTHENTICATED=16]="UNAUTHENTICATED",vi[vi.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",vi[vi.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",vi[vi.ABORTED=10]="ABORTED",vi[vi.OUT_OF_RANGE=11]="OUT_OF_RANGE",vi[vi.UNIMPLEMENTED=12]="UNIMPLEMENTED",vi[vi.INTERNAL=13]="INTERNAL",vi[vi.UNAVAILABLE=14]="UNAVAILABLE",vi[vi.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const bi=new xe([4294967295,4294967295],0);function Ei(t){const e=mn().encode(t),n=new Ne;return n.update(e),new Uint8Array(n.digest())}function _i(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new xe([n,s],0),new xe([r,i],0)]}class Ti{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new Ci(`Invalid padding: ${e}`);if(n<0)throw new Ci(`Invalid hash count: ${n}`);if(t.length>0&&0===this.hashCount)throw new Ci(`Invalid hash count: ${n}`);if(0===t.length&&0!==e)throw new Ci(`Invalid padding when bitmap length is 0: ${e}`);this.pe=8*t.length-e,this.ye=xe.fromNumber(this.pe)}we(t,e,n){let s=t.add(e.multiply(xe.fromNumber(n)));return 1===s.compare(bi)&&(s=new xe([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(0===this.pe)return!1;const e=Ei(t),[n,s]=_i(e);for(let r=0;r<this.hashCount;r++){const t=this.we(n,s,r);if(!this.be(t))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,r=new Uint8Array(Math.ceil(t/8)),i=new Ti(r,s,e);return n.forEach(t=>i.insert(t)),i}insert(t){if(0===this.pe)return;const e=Ei(t),[n,s]=_i(e);for(let r=0;r<this.hashCount;r++){const t=this.we(n,s,r);this.Se(t)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class Ci extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(t,e,n,s,r){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,Si.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new Ii(In.min(),s,new Gn(yn),Cr(),Lr())}}class Si{constructor(t,e,n,s,r){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Si(n,e,Lr(),Lr(),Lr())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(t,e,n,s){this.De=t,this.removedTargetIds=e,this.key=n,this.ve=s}}class ki{constructor(t,e){this.targetId=t,this.Ce=e}}class Di{constructor(t,e,n=ts.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class xi{constructor(){this.Fe=0,this.Me=Li(),this.xe=ts.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return 0!==this.Fe}get Le(){return this.Ne}ke(t){t.approximateByteSize()>0&&(this.Ne=!0,this.xe=t)}qe(){let t=Lr(),e=Lr(),n=Lr();return this.Me.forEach((s,r)=>{switch(r){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:Je(38017,{changeType:r})}}),new Si(this.xe,this.Oe,t,e,n)}Qe(){this.Ne=!1,this.Me=Li()}$e(t,e){this.Ne=!0,this.Me=this.Me.insert(t,e)}Ue(t){this.Ne=!0,this.Me=this.Me.remove(t)}Ke(){this.Fe+=1}We(){this.Fe-=1,tn(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class Ni{constructor(t){this.ze=t,this.je=new Map,this.He=Cr(),this.Je=Ri(),this.Ye=Ri(),this.Ze=new Gn(yn)}Xe(t){for(const e of t.De)t.ve&&t.ve.isFoundDocument()?this.et(e,t.ve):this.tt(e,t.key,t.ve);for(const e of t.removedTargetIds)this.tt(e,t.key,t.ve)}nt(t){this.forEachTarget(t,e=>{const n=this.rt(e);switch(t.state){case 0:this.it(e)&&n.ke(t.resumeToken);break;case 1:n.We(),n.Be||n.Qe(),n.ke(t.resumeToken);break;case 2:n.We(),n.Be||this.removeTarget(e);break;case 3:this.it(e)&&(n.Ge(),n.ke(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),n.ke(t.resumeToken));break;default:Je(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach((t,n)=>{this.it(n)&&e(n)})}ot(t){const e=t.targetId,n=t.Ce.count,s=this._t(e);if(s){const r=s.target;if(lr(r))if(0===n){const t=new Nn(r.path);this.tt(e,t,Vs.newNoDocument(t,In.min()))}else tn(1===n,20013,{expectedCount:n});else{const s=this.ut(e);if(s!==n){const n=this.ct(t),r=n?this.lt(n,t,s):1;if(0!==r){this.st(e);const t=2===r?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,t)}}}}}ct(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:r=0}=e;let i,o;try{i=rs(n).toUint8Array()}catch(a){if(a instanceof Zn)return Xe("Decoding the base64 bloom filter in existence filter failed ("+a.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw a}try{o=new Ti(i,s,r)}catch(a){return Xe(a instanceof Ci?"BloomFilter error: ":"Applying bloom filter failed: ",a),null}return 0===o.pe?null:o}lt(t,e,n){return e.Ce.count===n-this.Tt(t,e.targetId)?0:2}Tt(t,e){const n=this.ze.getRemoteKeysForTarget(e);let s=0;return n.forEach(n=>{const r=this.ze.Pt(),i=`projects/${r.projectId}/databases/${r.database}/documents/${n.path.canonicalString()}`;t.mightContain(i)||(this.tt(e,n,null),s++)}),s}It(t){const e=new Map;this.je.forEach((n,s)=>{const r=this._t(s);if(r){if(n.current&&lr(r.target)){const e=new Nn(r.target.path);this.Et(e).has(s)||this.dt(s,e)||this.tt(s,e,Vs.newNoDocument(e,t))}n.Le&&(e.set(s,n.qe()),n.Qe())}});let n=Lr();this.Ye.forEach((t,e)=>{let s=!0;e.forEachWhile(t=>{const e=this._t(t);return!e||"TargetPurposeLimboResolution"===e.purpose||(s=!1,!1)}),s&&(n=n.add(t))}),this.He.forEach((e,n)=>n.setReadTime(t));const s=new Ii(t,e,this.Ze,this.He,n);return this.He=Cr(),this.Je=Ri(),this.Ye=Ri(),this.Ze=new Gn(yn),s}et(t,e){if(!this.it(t))return;const n=this.dt(t,e.key)?2:0;this.rt(t).$e(e.key,n),this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.Ye=this.Ye.insert(e.key,this.At(e.key).add(t))}tt(t,e,n){if(!this.it(t))return;const s=this.rt(t);this.dt(t,e)?s.$e(e,1):s.Ue(e),this.Ye=this.Ye.insert(e,this.At(e).delete(t)),this.Ye=this.Ye.insert(e,this.At(e).add(t)),n&&(this.He=this.He.insert(e,n))}removeTarget(t){this.je.delete(t)}ut(t){const e=this.rt(t).qe();return this.ze.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ke(t){this.rt(t).Ke()}rt(t){let e=this.je.get(t);return e||(e=new xi,this.je.set(t,e)),e}At(t){let e=this.Ye.get(t);return e||(e=new Xn(yn),this.Ye=this.Ye.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new Xn(yn),this.Je=this.Je.insert(t,e)),e}it(t){const e=null!==this._t(t);return e||Qe("WatchChangeAggregator","Detected inactive target",t),e}_t(t){const e=this.je.get(t);return e&&e.Be?null:this.ze.Rt(t)}st(t){this.je.set(t,new xi),this.ze.getRemoteKeysForTarget(t).forEach(e=>{this.tt(t,e,null)})}dt(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function Ri(){return new Gn(Nn.comparator)}function Li(){return new Gn(Nn.comparator)}const Oi=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),Mi=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Pi=(()=>({and:"AND",or:"OR"}))();class Vi{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Fi(t,e){return t.useProto3Json||Bn(e)?e:{value:e}}function Ui(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Bi(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function ji(t,e){return Ui(t,e.toTimestamp())}function $i(t){return tn(!!t,49232),In.fromTimestamp(function(t){const e=ns(t);return new Cn(e.seconds,e.nanos)}(t))}function qi(t,e){return zi(t,e).canonicalString()}function zi(t,e){const n=(s=t,new kn(["projects",s.projectId,"databases",s.database])).child("documents");var s;return void 0===e?n:n.child(e)}function Hi(t){const e=kn.fromString(t);return tn(lo(e),10190,{key:e.toString()}),e}function Ki(t,e){return qi(t.databaseId,e.path)}function Gi(t,e){const n=Hi(e);if(n.get(1)!==t.databaseId.projectId)throw new sn(nn.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new sn(nn.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Nn(Xi(n))}function Qi(t,e){return qi(t.databaseId,e)}function Wi(t){return new kn(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Xi(t){return tn(t.length>4&&"documents"===t.get(4),29091,{key:t.toString()}),t.popFirst(5)}function Yi(t,e,n){return{name:Ki(t,e),fields:n.value.mapValue.fields}}function Ji(t,e){return{documents:[Qi(t,e.path)]}}function Zi(t,e){const n={structuredQuery:{}},s=e.path;let r;null!==e.collectionGroup?(r=s,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=s.popLast(),n.structuredQuery.from=[{collectionId:s.lastSegment()}]),n.parent=Qi(t,r);const i=function(t){if(0!==t.length)return ao(Hs.create(t,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(t){if(0!==t.length)return t.map(t=>{return{field:io((e=t).field),direction:no(e.dir)};var e})}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Fi(t,e.limit);return null!==a&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt={before:(c=e.startAt).inclusive,values:c.position}),e.endAt&&(n.structuredQuery.endAt=function(t){return{before:!t.inclusive,values:t.position}}(e.endAt)),{gt:n,parent:r};var c}function to(t){let e=function(t){const e=Hi(t);return 4===e.length?kn.emptyPath():Xi(e)}(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){tn(1===s,65062);const t=n.from[0];t.allDescendants?r=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=function(t){const e=eo(t);return e instanceof Hs&&Gs(e)?e.getFilters():[e]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(t=>{return new js(oo((e=t).field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction));var e}));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,Bn(e)?null:e}(n.limit));let c=null;n.startAt&&(c=function(t){const e=!!t.before,n=t.values||[];return new Fs(n,e)}(n.startAt));let l=null;return n.endAt&&(l=function(t){const e=!t.before,n=t.values||[];return new Fs(n,e)}(n.endAt)),function(t,e,n,s,r,i,o,a){return new ur(t,e,n,s,r,i,o,a)}(e,r,o,i,a,"F",c,l)}function eo(t){return void 0!==t.unaryFilter?function(t){switch(t.unaryFilter.op){case"IS_NAN":const e=oo(t.unaryFilter.field);return zs.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=oo(t.unaryFilter.field);return zs.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=oo(t.unaryFilter.field);return zs.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const r=oo(t.unaryFilter.field);return zs.create(r,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Je(61313);default:return Je(60726)}}(t):void 0!==t.fieldFilter?(e=t,zs.create(oo(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Je(58110);default:return Je(50506)}}(e.fieldFilter.op),e.fieldFilter.value)):void 0!==t.compositeFilter?function(t){return Hs.create(t.compositeFilter.filters.map(t=>eo(t)),function(t){switch(t){case"AND":return"and";case"OR":return"or";default:return Je(1026)}}(t.compositeFilter.op))}(t):Je(30097,{filter:t});var e}function no(t){return Oi[t]}function so(t){return Mi[t]}function ro(t){return Pi[t]}function io(t){return{fieldPath:t.canonicalString()}}function oo(t){return xn.fromServerFormat(t.fieldPath)}function ao(t){return t instanceof zs?function(t){if("=="===t.op){if(Rs(t.value))return{unaryFilter:{field:io(t.field),op:"IS_NAN"}};if(Ns(t.value))return{unaryFilter:{field:io(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(Rs(t.value))return{unaryFilter:{field:io(t.field),op:"IS_NOT_NAN"}};if(Ns(t.value))return{unaryFilter:{field:io(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:io(t.field),op:so(t.op),value:t.value}}}(t):t instanceof Hs?function(t){const e=t.getFilters().map(t=>ao(t));return 1===e.length?e[0]:{compositeFilter:{op:ro(t.op),filters:e}}}(t):Je(54877,{filter:t})}function co(t){const e=[];return t.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function lo(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(t,e,n,s,r=In.min(),i=In.min(),o=ts.EMPTY_BYTE_STRING,a=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(t){return new uo(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new uo(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new uo(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new uo(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(t){this.wt=t}}function fo(t){const e=to({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?mr(e,e.limit,"L"):e}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po{constructor(){this.Cn=new mo}addToCollectionParentIndex(t,e){return this.Cn.add(e),Vn.resolve()}getCollectionParents(t,e){return Vn.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return Vn.resolve()}deleteFieldIndex(t,e){return Vn.resolve()}deleteAllFieldIndexes(t){return Vn.resolve()}createTargetIndexes(t,e){return Vn.resolve()}getDocumentsMatchingTarget(t,e){return Vn.resolve(null)}getIndexType(t,e){return Vn.resolve(0)}getFieldIndexes(t,e){return Vn.resolve([])}getNextCollectionGroupToUpdate(t){return Vn.resolve(null)}getMinOffset(t,e){return Vn.resolve(Ln.min())}getMinOffsetFromCollectionGroup(t,e){return Vn.resolve(Ln.min())}updateCollectionGroup(t,e,n){return Vn.resolve()}updateIndexEntries(t,e){return Vn.resolve()}}class mo{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new Xn(kn.comparator),r=!s.has(n);return this.index[e]=s.add(n),r}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new Xn(kn.comparator)).toArray()}}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const go={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},yo=41943040;class vo{static withCacheSize(t){return new vo(t,vo.DEFAULT_COLLECTION_PERCENTILE,vo.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vo.DEFAULT_COLLECTION_PERCENTILE=10,vo.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,vo.DEFAULT=new vo(yo,vo.DEFAULT_COLLECTION_PERCENTILE,vo.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),vo.DISABLED=new vo(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wo{constructor(t){this.ur=t}next(){return this.ur+=2,this.ur}static cr(){return new wo(0)}static lr(){return new wo(-1)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bo="LruGarbageCollector";function Eo([t,e],[n,s]){const r=yn(t,n);return 0===r?yn(e,s):r}class _o{constructor(t){this.Er=t,this.buffer=new Xn(Eo),this.dr=0}Ar(){return++this.dr}Rr(t){const e=[t,this.Ar()];if(this.buffer.size<this.Er)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();Eo(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class To{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Vr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.mr(6e4)}stop(){this.Vr&&(this.Vr.cancel(),this.Vr=null)}get started(){return null!==this.Vr}mr(t){Qe(bo,`Garbage collection scheduled in ${t}ms`),this.Vr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Vr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Fn(t)?Qe(bo,"Ignoring IndexedDB error during garbage collection: ",t):await Pn(t)}await this.mr(3e5)})}}class Co{constructor(t,e){this.gr=t,this.params=e}calculateTargetCount(t,e){return this.gr.pr(t).next(t=>Math.floor(e/100*t))}nthSequenceNumber(t,e){if(0===e)return Vn.resolve(Un.le);const n=new _o(e);return this.gr.forEachTarget(t,t=>n.Rr(t.sequenceNumber)).next(()=>this.gr.yr(t,t=>n.Rr(t))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.gr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.gr.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(Qe("LruGarbageCollector","Garbage collection skipped; disabled"),Vn.resolve(go)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(Qe("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),go):this.wr(t,e))}getCacheSize(t){return this.gr.getCacheSize(t)}wr(t,e){let n,s,r,i,o,a,c;const l=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(e=>(e>this.params.maximumSequenceNumbersToCollect?(Qe("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),s=this.params.maximumSequenceNumbersToCollect):s=e,i=Date.now(),this.nthSequenceNumber(t,s))).next(s=>(n=s,o=Date.now(),this.removeTargets(t,n,e))).next(e=>(r=e,a=Date.now(),this.removeOrphanedDocuments(t,n))).next(t=>(c=Date.now(),Ge()<=ut.DEBUG&&Qe("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-l}ms\n\tDetermined least recently used ${s} in `+(o-i)+`ms\n\tRemoved ${r} targets in `+(a-o)+`ms\n\tRemoved ${t} documents in `+(c-a)+`ms\nTotal Duration: ${c-l}ms`),Vn.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:r,documentsRemoved:t})))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Io{constructor(){this.changes=new _r(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Vs.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?Vn.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(n=s,this.remoteDocumentCache.getEntry(t,e))).next(t=>(null!==n&&si(n.mutation,t,Jn.empty(),Cn.now()),t))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.getLocalViewOfDocuments(t,e,Lr()).next(()=>e))}getLocalViewOfDocuments(t,e,n=Lr()){const s=kr();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,n).next(t=>{let e=Sr();return t.forEach((t,n)=>{e=e.insert(t,n.overlayedDocument)}),e}))}getOverlayedDocuments(t,e){const n=kr();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,Lr()))}populateOverlays(t,e,n){const s=[];return n.forEach(t=>{e.has(t)||s.push(t)}),this.documentOverlayCache.getOverlays(t,s).next(t=>{t.forEach((t,n)=>{e.set(t,n)})})}computeViews(t,e,n,s){let r=Cr();const i=xr(),o=xr();return e.forEach((t,e)=>{const o=n.get(e.key);s.has(e.key)&&(void 0===o||o.mutation instanceof ai)?r=r.insert(e.key,e):void 0!==o?(i.set(e.key,o.mutation.getFieldMask()),si(o.mutation,e,o.mutation.getFieldMask(),Cn.now())):i.set(e.key,Jn.empty())}),this.recalculateAndSaveOverlays(t,r).next(t=>(t.forEach((t,e)=>i.set(t,e)),e.forEach((t,e)=>{var n;return o.set(t,new So(e,null!==(n=i.get(t))&&void 0!==n?n:null))}),o))}recalculateAndSaveOverlays(t,e){const n=xr();let s=new Gn((t,e)=>t-e),r=Lr();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(t=>{for(const r of t)r.keys().forEach(t=>{const i=e.get(t);if(null===i)return;let o=n.get(t)||Jn.empty();o=r.applyToLocalView(i,o),n.set(t,o);const a=(s.get(r.batchId)||Lr()).add(t);s=s.insert(r.batchId,a)})}).next(()=>{const i=[],o=s.getReverseIterator();for(;o.hasNext();){const s=o.getNext(),a=s.key,c=s.value,l=Dr();c.forEach(t=>{if(!r.has(t)){const s=ei(e.get(t),n.get(t));null!==s&&l.set(t,s),r=r.add(t)}}),i.push(this.documentOverlayCache.saveOverlays(t,a,l))}return Vn.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.recalculateAndSaveOverlays(t,e))}getDocumentsMatchingQuery(t,e,n,s){return r=e,Nn.isDocumentKey(r.path)&&null===r.collectionGroup&&0===r.filters.length?this.getDocumentsMatchingDocumentQuery(t,e.path):function(t){return null!==t.collectionGroup}(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s);var r}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next(r=>{const i=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-r.size):Vn.resolve(kr());let o=-1,a=r;return i.next(e=>Vn.forEach(e,(e,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),r.get(e)?Vn.resolve():this.remoteDocumentCache.getEntry(t,e).next(t=>{a=a.insert(e,t)}))).next(()=>this.populateOverlays(t,e,r)).next(()=>this.computeViews(t,a,e,Lr())).next(t=>({batchId:o,changes:Ar(t)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new Nn(e)).next(t=>{let e=Sr();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e})}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const r=e.collectionGroup;let i=Sr();return this.indexManager.getCollectionParents(t,r).next(o=>Vn.forEach(o,o=>{const a=(c=e,l=o.child(r),new ur(l,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt));var c,l;return this.getDocumentsMatchingCollectionQuery(t,a,n,s).next(t=>{t.forEach((t,e)=>{i=i.insert(t,e)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(t,e,n,s){let r;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(i=>(r=i,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,r,s))).next(t=>{r.forEach((e,n)=>{const s=n.getKey();null===t.get(s)&&(t=t.insert(s,Vs.newInvalidDocument(s)))});let n=Sr();return t.forEach((t,s)=>{const i=r.get(t);void 0!==i&&si(i.mutation,s,Jn.empty(),Cn.now()),wr(e,s)&&(n=n.insert(t,s))}),n})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(t){this.serializer=t,this.kr=new Map,this.qr=new Map}getBundleMetadata(t,e){return Vn.resolve(this.kr.get(e))}saveBundleMetadata(t,e){return this.kr.set(e.id,{id:(n=e).id,version:n.version,createTime:$i(n.createTime)}),Vn.resolve();var n}getNamedQuery(t,e){return Vn.resolve(this.qr.get(e))}saveNamedQuery(t,e){return this.qr.set(e.name,{name:(n=e).name,query:fo(n.bundledQuery),readTime:$i(n.readTime)}),Vn.resolve();var n}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(){this.overlays=new Gn(Nn.comparator),this.Qr=new Map}getOverlay(t,e){return Vn.resolve(this.overlays.get(e))}getOverlays(t,e){const n=kr();return Vn.forEach(e,e=>this.getOverlay(t,e).next(t=>{null!==t&&n.set(e,t)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((n,s)=>{this.St(t,e,s)}),Vn.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Qr.get(n);return void 0!==s&&(s.forEach(t=>this.overlays=this.overlays.remove(t)),this.Qr.delete(n)),Vn.resolve()}getOverlaysForCollection(t,e,n){const s=kr(),r=e.length+1,i=new Nn(e.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const t=o.getNext().value,i=t.getKey();if(!e.isPrefixOf(i.path))break;i.path.length===r&&t.largestBatchId>n&&s.set(t.getKey(),t)}return Vn.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let r=new Gn((t,e)=>t-e);const i=this.overlays.getIterator();for(;i.hasNext();){const t=i.getNext().value;if(t.getKey().getCollectionGroup()===e&&t.largestBatchId>n){let e=r.get(t.largestBatchId);null===e&&(e=kr(),r=r.insert(t.largestBatchId,e)),e.set(t.getKey(),t)}}const o=kr(),a=r.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((t,e)=>o.set(t,e)),!(o.size()>=s)););return Vn.resolve(o)}St(t,e,n){const s=this.overlays.get(n.key);if(null!==s){const t=this.Qr.get(s.largestBatchId).delete(n.key);this.Qr.set(s.largestBatchId,t)}this.overlays=this.overlays.insert(n.key,new mi(e,n));let r=this.Qr.get(e);void 0===r&&(r=Lr(),this.Qr.set(e,r)),this.Qr.set(e,r.add(n.key))}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(){this.sessionToken=ts.EMPTY_BYTE_STRING}getSessionToken(t){return Vn.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,Vn.resolve()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(){this.$r=new Xn(Ro.Ur),this.Kr=new Xn(Ro.Wr)}isEmpty(){return this.$r.isEmpty()}addReference(t,e){const n=new Ro(t,e);this.$r=this.$r.add(n),this.Kr=this.Kr.add(n)}Gr(t,e){t.forEach(t=>this.addReference(t,e))}removeReference(t,e){this.zr(new Ro(t,e))}jr(t,e){t.forEach(t=>this.removeReference(t,e))}Hr(t){const e=new Nn(new kn([])),n=new Ro(e,t),s=new Ro(e,t+1),r=[];return this.Kr.forEachInRange([n,s],t=>{this.zr(t),r.push(t.key)}),r}Jr(){this.$r.forEach(t=>this.zr(t))}zr(t){this.$r=this.$r.delete(t),this.Kr=this.Kr.delete(t)}Yr(t){const e=new Nn(new kn([])),n=new Ro(e,t),s=new Ro(e,t+1);let r=Lr();return this.Kr.forEachInRange([n,s],t=>{r=r.add(t.key)}),r}containsKey(t){const e=new Ro(t,0),n=this.$r.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class Ro{constructor(t,e){this.key=t,this.Zr=e}static Ur(t,e){return Nn.comparator(t.key,e.key)||yn(t.Zr,e.Zr)}static Wr(t,e){return yn(t.Zr,e.Zr)||Nn.comparator(t.key,e.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.nr=1,this.Xr=new Xn(Ro.Ur)}checkEmpty(t){return Vn.resolve(0===this.mutationQueue.length)}addMutationBatch(t,e,n,s){const r=this.nr;this.nr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new fi(r,e,n,s);this.mutationQueue.push(i);for(const o of s)this.Xr=this.Xr.add(new Ro(o.key,r)),this.indexManager.addToCollectionParentIndex(t,o.key.path.popLast());return Vn.resolve(i)}lookupMutationBatch(t,e){return Vn.resolve(this.ei(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.ti(n),r=s<0?0:s;return Vn.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return Vn.resolve(0===this.mutationQueue.length?-1:this.nr-1)}getAllMutationBatches(t){return Vn.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new Ro(e,0),s=new Ro(e,Number.POSITIVE_INFINITY),r=[];return this.Xr.forEachInRange([n,s],t=>{const e=this.ei(t.Zr);r.push(e)}),Vn.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Xn(yn);return e.forEach(t=>{const e=new Ro(t,0),s=new Ro(t,Number.POSITIVE_INFINITY);this.Xr.forEachInRange([e,s],t=>{n=n.add(t.Zr)})}),Vn.resolve(this.ni(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let r=n;Nn.isDocumentKey(r)||(r=r.child(""));const i=new Ro(new Nn(r),0);let o=new Xn(yn);return this.Xr.forEachWhile(t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===s&&(o=o.add(t.Zr)),!0)},i),Vn.resolve(this.ni(o))}ni(t){const e=[];return t.forEach(t=>{const n=this.ei(t);null!==n&&e.push(n)}),e}removeMutationBatch(t,e){tn(0===this.ri(e.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Xr;return Vn.forEach(e.mutations,s=>{const r=new Ro(s.key,e.batchId);return n=n.delete(r),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Xr=n})}sr(t){}containsKey(t,e){const n=new Ro(e,0),s=this.Xr.firstAfterOrEqual(n);return Vn.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,Vn.resolve()}ri(t,e){return this.ti(t)}ti(t){return 0===this.mutationQueue.length?0:t-this.mutationQueue[0].batchId}ei(t){const e=this.ti(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(t){this.ii=t,this.docs=new Gn(Nn.comparator),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),r=s?s.size:0,i=this.ii(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:i}),this.size+=i-r,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return Vn.resolve(n?n.document.mutableCopy():Vs.newInvalidDocument(e))}getEntries(t,e){let n=Cr();return e.forEach(t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.mutableCopy():Vs.newInvalidDocument(t))}),Vn.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let r=Cr();const i=e.path,o=new Nn(i.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:t,value:{document:o}}=a.getNext();if(!i.isPrefixOf(t.path))break;t.path.length>i.length+1||On(Rn(o),n)<=0||(s.has(o.key)||wr(e,o))&&(r=r.insert(o.key,o.mutableCopy()))}return Vn.resolve(r)}getAllFromCollectionGroup(t,e,n,s){Je(9500)}si(t,e){return Vn.forEach(this.docs,t=>e(t))}newChangeBuffer(t){return new Mo(this)}getSize(t){return Vn.resolve(this.size)}}class Mo extends Io{constructor(t){super(),this.Br=t}applyChanges(t){const e=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?e.push(this.Br.addEntry(t,s)):this.Br.removeEntry(n)}),Vn.waitFor(e)}getFromCache(t,e){return this.Br.getEntry(t,e)}getAllFromCache(t,e){return this.Br.getEntries(t,e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(t){this.persistence=t,this.oi=new _r(t=>ar(t),cr),this.lastRemoteSnapshotVersion=In.min(),this.highestTargetId=0,this._i=0,this.ai=new No,this.targetCount=0,this.ui=wo.cr()}forEachTarget(t,e){return this.oi.forEach((t,n)=>e(n)),Vn.resolve()}getLastRemoteSnapshotVersion(t){return Vn.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return Vn.resolve(this._i)}allocateTargetId(t){return this.highestTargetId=this.ui.next(),Vn.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this._i&&(this._i=e),Vn.resolve()}Tr(t){this.oi.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ui=new wo(e),this.highestTargetId=e),t.sequenceNumber>this._i&&(this._i=t.sequenceNumber)}addTargetData(t,e){return this.Tr(e),this.targetCount+=1,Vn.resolve()}updateTargetData(t,e){return this.Tr(e),Vn.resolve()}removeTargetData(t,e){return this.oi.delete(e.target),this.ai.Hr(e.targetId),this.targetCount-=1,Vn.resolve()}removeTargets(t,e,n){let s=0;const r=[];return this.oi.forEach((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.oi.delete(i),r.push(this.removeMatchingKeysForTargetId(t,o.targetId)),s++)}),Vn.waitFor(r).next(()=>s)}getTargetCount(t){return Vn.resolve(this.targetCount)}getTargetData(t,e){const n=this.oi.get(e)||null;return Vn.resolve(n)}addMatchingKeys(t,e,n){return this.ai.Gr(e,n),Vn.resolve()}removeMatchingKeys(t,e,n){this.ai.jr(e,n);const s=this.persistence.referenceDelegate,r=[];return s&&e.forEach(e=>{r.push(s.markPotentiallyOrphaned(t,e))}),Vn.waitFor(r)}removeMatchingKeysForTargetId(t,e){return this.ai.Hr(e),Vn.resolve()}getMatchingKeysForTargetId(t,e){const n=this.ai.Yr(e);return Vn.resolve(n)}containsKey(t,e){return Vn.resolve(this.ai.containsKey(e))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(t,e){this.ci={},this.overlays={},this.li=new Un(0),this.hi=!1,this.hi=!0,this.Pi=new xo,this.referenceDelegate=t(this),this.Ti=new Po(this),this.indexManager=new po,this.remoteDocumentCache=new Oo(t=>this.referenceDelegate.Ii(t)),this.serializer=new ho(e),this.Ei=new ko(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.hi=!1,Promise.resolve()}get started(){return this.hi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Do,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ci[t.toKey()];return n||(n=new Lo(e,this.referenceDelegate),this.ci[t.toKey()]=n),n}getGlobalsCache(){return this.Pi}getTargetCache(){return this.Ti}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ei}runTransaction(t,e,n){Qe("MemoryPersistence","Starting transaction:",t);const s=new Fo(this.li.next());return this.referenceDelegate.di(),n(s).next(t=>this.referenceDelegate.Ai(s).next(()=>t)).toPromise().then(t=>(s.raiseOnCommittedEvent(),t))}Ri(t,e){return Vn.or(Object.values(this.ci).map(n=>()=>n.containsKey(t,e)))}}class Fo extends Mn{constructor(t){super(),this.currentSequenceNumber=t}}class Uo{constructor(t){this.persistence=t,this.Vi=new No,this.mi=null}static fi(t){return new Uo(t)}get gi(){if(this.mi)return this.mi;throw Je(60996)}addReference(t,e,n){return this.Vi.addReference(n,e),this.gi.delete(n.toString()),Vn.resolve()}removeReference(t,e,n){return this.Vi.removeReference(n,e),this.gi.add(n.toString()),Vn.resolve()}markPotentiallyOrphaned(t,e){return this.gi.add(e.toString()),Vn.resolve()}removeTarget(t,e){this.Vi.Hr(e.targetId).forEach(t=>this.gi.add(t.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(t=>{t.forEach(t=>this.gi.add(t.toString()))}).next(()=>n.removeTargetData(t,e))}di(){this.mi=new Set}Ai(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Vn.forEach(this.gi,n=>{const s=Nn.fromPath(n);return this.pi(t,s).next(t=>{t||e.removeEntry(s,In.min())})}).next(()=>(this.mi=null,e.apply(t)))}updateLimboDocument(t,e){return this.pi(t,e).next(t=>{t?this.gi.delete(e.toString()):this.gi.add(e.toString())})}Ii(t){return 0}pi(t,e){return Vn.or([()=>Vn.resolve(this.Vi.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ri(t,e)])}}class Bo{constructor(t,e){this.persistence=t,this.yi=new _r(t=>function(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=qn(e)),e=$n(t.get(n),e);return qn(e)}(t.path),(t,e)=>t.isEqual(e)),this.garbageCollector=function(t,e){return new Co(t,e)}(this,e)}static fi(t,e){return new Bo(t,e)}di(){}Ai(t){return Vn.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}pr(t){const e=this.br(t);return this.persistence.getTargetCache().getTargetCount(t).next(t=>e.next(e=>t+e))}br(t){let e=0;return this.yr(t,t=>{e++}).next(()=>e)}yr(t,e){return Vn.forEach(this.yi,(n,s)=>this.Dr(t,n,s).next(t=>t?Vn.resolve():e(s)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),r=s.newChangeBuffer();return s.si(t,s=>this.Dr(t,s,e).next(t=>{t||(n++,r.removeEntry(s,In.min()))})).next(()=>r.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.yi.set(e,t.currentSequenceNumber),Vn.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.yi.set(n,t.currentSequenceNumber),Vn.resolve()}removeReference(t,e,n){return this.yi.set(n,t.currentSequenceNumber),Vn.resolve()}updateLimboDocument(t,e){return this.yi.set(e,t.currentSequenceNumber),Vn.resolve()}Ii(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=ks(t.data.value)),e}Dr(t,e,n){return Vn.or([()=>this.persistence.Ri(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const t=this.yi.get(e);return Vn.resolve(void 0!==t&&t>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.ds=n,this.As=s}static Rs(t,e){let n=Lr(),s=Lr();for(const r of e.docChanges)switch(r.type){case 0:n=n.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new jo(t,e.fromCache,n,s)}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(){this.Vs=!1,this.fs=!1,this.gs=100,this.ps=Z()?8:function(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}("undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:"")>0?6:4}initialize(t,e){this.ys=t,this.indexManager=e,this.Vs=!0}getDocumentsMatchingQuery(t,e,n,s){const r={result:null};return this.ws(t,e).next(t=>{r.result=t}).next(()=>{if(!r.result)return this.bs(t,e,s,n).next(t=>{r.result=t})}).next(()=>{if(r.result)return;const n=new $o;return this.Ss(t,e,n).next(s=>{if(r.result=s,this.fs)return this.Ds(t,e,n,s.size)})}).next(()=>r.result)}Ds(t,e,n,s){return n.documentReadCount<this.gs?(Ge()<=ut.DEBUG&&Qe("QueryEngine","SDK will not create cache indexes for query:",vr(e),"since it only creates cache indexes for collection contains","more than or equal to",this.gs,"documents"),Vn.resolve()):(Ge()<=ut.DEBUG&&Qe("QueryEngine","Query:",vr(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ps*s?(Ge()<=ut.DEBUG&&Qe("QueryEngine","The SDK decides to create cache indexes for query:",vr(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,pr(e))):Vn.resolve())}ws(t,e){if(dr(e))return Vn.resolve(null);let n=pr(e);return this.indexManager.getIndexType(t,n).next(s=>0===s?null:(null!==e.limit&&1===s&&(e=mr(e,null,"F"),n=pr(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(s=>{const r=Lr(...s);return this.ys.getDocuments(t,r).next(s=>this.indexManager.getMinOffset(t,n).next(n=>{const i=this.vs(e,s);return this.Cs(e,i,r,n.readTime)?this.ws(t,mr(e,null,"F")):this.Fs(t,i,e,n)}))})))}bs(t,e,n,s){return dr(e)||s.isEqual(In.min())?Vn.resolve(null):this.ys.getDocuments(t,n).next(r=>{const i=this.vs(e,r);return this.Cs(e,i,n,s)?Vn.resolve(null):(Ge()<=ut.DEBUG&&Qe("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),vr(e)),this.Fs(t,i,e,function(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,r=In.fromTimestamp(1e9===s?new Cn(n+1,0):new Cn(n,s));return new Ln(r,Nn.empty(),e)}(s,-1)).next(t=>t))})}vs(t,e){let n=new Xn(br(t));return e.forEach((e,s)=>{wr(t,s)&&(n=n.add(s))}),n}Cs(t,e,n,s){if(null===t.limit)return!1;if(n.size!==e.size)return!0;const r="F"===t.limitType?e.last():e.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}Ss(t,e,n){return Ge()<=ut.DEBUG&&Qe("QueryEngine","Using full collection scan to execute query:",vr(e)),this.ys.getDocumentsMatchingQuery(t,e,Ln.min(),n)}Fs(t,e,n,s){return this.ys.getDocumentsMatchingQuery(t,n,s).next(t=>(e.forEach(e=>{t=t.insert(e.key,e)}),t))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zo="LocalStore";class Ho{constructor(t,e,n,s){this.persistence=t,this.Ms=e,this.serializer=s,this.xs=new Gn(yn),this.Os=new _r(t=>ar(t),cr),this.Ns=new Map,this.Bs=t.getRemoteDocumentCache(),this.Ti=t.getTargetCache(),this.Ei=t.getBundleCache(),this.Ls(n)}Ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Ao(this.Bs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Bs.setIndexManager(this.indexManager),this.Ms.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.xs))}}async function Ko(t,e){const n=en(t);return await n.persistence.runTransaction("Handle user change","readonly",t=>{let s;return n.mutationQueue.getAllMutationBatches(t).next(r=>(s=r,n.Ls(e),n.mutationQueue.getAllMutationBatches(t))).next(e=>{const r=[],i=[];let o=Lr();for(const t of s){r.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){i.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return n.localDocuments.getDocuments(t,o).next(t=>({ks:t,removedBatchIds:r,addedBatchIds:i}))})})}function Go(t){const e=en(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ti.getLastRemoteSnapshotVersion(t))}function Qo(t,e){const n=en(t),s=e.snapshotVersion;let r=n.xs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",t=>{const i=n.Bs.newChangeBuffer({trackRemovals:!0});r=n.xs;const o=[];e.targetChanges.forEach((i,a)=>{const c=r.get(a);if(!c)return;o.push(n.Ti.removeMatchingKeys(t,i.removedDocuments,a).next(()=>n.Ti.addMatchingKeys(t,i.addedDocuments,a)));let l=c.withSequenceNumber(t.currentSequenceNumber);null!==e.targetMismatches.get(a)?l=l.withResumeToken(ts.EMPTY_BYTE_STRING,In.min()).withLastLimboFreeSnapshotVersion(In.min()):i.resumeToken.approximateByteSize()>0&&(l=l.withResumeToken(i.resumeToken,s)),r=r.insert(a,l),function(t,e,n){if(0===t.resumeToken.approximateByteSize())return!0;if(e.snapshotVersion.toMicroseconds()-t.snapshotVersion.toMicroseconds()>=3e8)return!0;return n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(c,l,i)&&o.push(n.Ti.updateTargetData(t,l))});let a=Cr(),c=Lr();if(e.documentUpdates.forEach(s=>{e.resolvedLimboDocuments.has(s)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,s))}),o.push(function(t,e,n){let s=Lr(),r=Lr();return n.forEach(t=>s=s.add(t)),e.getEntries(t,s).next(t=>{let s=Cr();return n.forEach((n,i)=>{const o=t.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(r=r.add(n)),i.isNoDocument()&&i.version.isEqual(In.min())?(e.removeEntry(n,i.readTime),s=s.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(e.addEntry(i),s=s.insert(n,i)):Qe(zo,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)}),{qs:s,Qs:r}})}(t,i,e.documentUpdates).next(t=>{a=t.qs,c=t.Qs})),!s.isEqual(In.min())){const e=n.Ti.getLastRemoteSnapshotVersion(t).next(e=>n.Ti.setTargetsMetadata(t,t.currentSequenceNumber,s));o.push(e)}return Vn.waitFor(o).next(()=>i.apply(t)).next(()=>n.localDocuments.getLocalViewOfDocuments(t,a,c)).next(()=>a)}).then(t=>(n.xs=r,t))}function Wo(t,e){const n=en(t);return n.persistence.runTransaction("Get next mutation batch","readonly",t=>(void 0===e&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(t,e)))}async function Xo(t,e,n){const s=en(t),r=s.xs.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,t=>s.persistence.referenceDelegate.removeTarget(t,r))}catch(o){if(!Fn(o))throw o;Qe(zo,`Failed to update sequence numbers for target ${e}: ${o}`)}s.xs=s.xs.remove(e),s.Os.delete(r.target)}function Yo(t,e,n){const s=en(t);let r=In.min(),i=Lr();return s.persistence.runTransaction("Execute query","readwrite",t=>function(t,e,n){const s=en(t),r=s.Os.get(n);return void 0!==r?Vn.resolve(s.xs.get(r)):s.Ti.getTargetData(e,n)}(s,t,pr(e)).next(e=>{if(e)return r=e.lastLimboFreeSnapshotVersion,s.Ti.getMatchingKeysForTargetId(t,e.targetId).next(t=>{i=t})}).next(()=>s.Ms.getDocumentsMatchingQuery(t,e,n?r:In.min(),n?i:Lr())).next(t=>(function(t,e,n){let s=t.Ns.get(e)||In.min();n.forEach((t,e)=>{e.readTime.compareTo(s)>0&&(s=e.readTime)}),t.Ns.set(e,s)}(s,function(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}(e),t),{documents:t,$s:i})))}class Jo{constructor(){this.activeTargetIds=Or}js(t){this.activeTargetIds=this.activeTargetIds.add(t)}Hs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}zs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Zo{constructor(){this.xo=new Jo,this.Oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.xo.js(t),this.Oo[t]||"not-current"}updateQueryState(t,e,n){this.Oo[t]=e}removeLocalQueryTarget(t){this.xo.Hs(t)}isLocalQueryTarget(t){return this.xo.activeTargetIds.has(t)}clearQueryState(t){delete this.Oo[t]}getAllActiveQueryTargets(){return this.xo.activeTargetIds}isActiveQueryTarget(t){return this.xo.activeTargetIds.has(t)}start(){return this.xo=new Jo,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{No(t){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea="ConnectivityMonitor";class na{constructor(){this.Bo=()=>this.Lo(),this.ko=()=>this.qo(),this.Qo=[],this.$o()}No(t){this.Qo.push(t)}shutdown(){window.removeEventListener("online",this.Bo),window.removeEventListener("offline",this.ko)}$o(){window.addEventListener("online",this.Bo),window.addEventListener("offline",this.ko)}Lo(){Qe(ea,"Network connectivity changed: AVAILABLE");for(const t of this.Qo)t(0)}qo(){Qe(ea,"Network connectivity changed: UNAVAILABLE");for(const t of this.Qo)t(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sa=null;function ra(){return null===sa?sa=268435456+Math.round(2147483648*Math.random()):sa++,"0x"+sa.toString(16)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const ia="RestConnection",oa={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class aa{get Uo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=e+"://"+t.host,this.Wo=`projects/${n}/databases/${s}`,this.Go=this.databaseId.database===fs?`project_id=${n}`:`project_id=${n}&database_id=${s}`}zo(t,e,n,s,r){const i=ra(),o=this.jo(t,e.toUriEncodedString());Qe(ia,`Sending RPC '${t}' ${i}:`,o,n);const a={"google-cloud-resource-prefix":this.Wo,"x-goog-request-params":this.Go};this.Ho(a,s,r);const{host:c}=new URL(o),l=W(c);return this.Jo(t,o,a,n,l).then(e=>(Qe(ia,`Received RPC '${t}' ${i}: `,e),e),e=>{throw Xe(ia,`RPC '${t}' ${i} failed with error: `,e,"url: ",o,"request:",n),e})}Yo(t,e,n,s,r,i){return this.zo(t,e,n,s,r)}Ho(t,e,n){t["X-Goog-Api-Client"]="gl-js/ fire/"+He,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((e,n)=>t[n]=e),n&&n.headers.forEach((e,n)=>t[n]=e)}jo(t,e){const n=oa[t];return`${this.Ko}/v1/${e}:${n}`}terminate(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(t){this.Zo=t.Zo,this.Xo=t.Xo}e_(t){this.t_=t}n_(t){this.r_=t}i_(t){this.s_=t}onMessage(t){this.o_=t}close(){this.Xo()}send(t){this.Zo(t)}__(){this.t_()}a_(){this.r_()}u_(t){this.s_(t)}c_(t){this.o_(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const la="WebChannelConnection";class ua extends aa{constructor(t){super(t),this.l_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,n,s,r){const i=ra();return new Promise((r,o)=>{const a=new Le;a.setWithCredentials(!0),a.listenOnce(Me.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case Pe.NO_ERROR:const e=a.getResponseJson();Qe(la,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(e)),r(e);break;case Pe.TIMEOUT:Qe(la,`RPC '${t}' ${i} timed out`),o(new sn(nn.DEADLINE_EXCEEDED,"Request time out"));break;case Pe.HTTP_ERROR:const n=a.getStatus();if(Qe(la,`RPC '${t}' ${i} failed with status:`,n,"response text:",a.getResponseText()),n>0){let t=a.getResponseJson();Array.isArray(t)&&(t=t[0]);const e=null==t?void 0:t.error;if(e&&e.status&&e.message){const t=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(nn).indexOf(e)>=0?e:nn.UNKNOWN}(e.status);o(new sn(t,e.message))}else o(new sn(nn.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new sn(nn.UNAVAILABLE,"Connection failed."));break;default:Je(9055,{h_:t,streamId:i,P_:a.getLastErrorCode(),T_:a.getLastError()})}}finally{Qe(la,`RPC '${t}' ${i} completed.`)}});const c=JSON.stringify(s);Qe(la,`RPC '${t}' ${i} sending request:`,s),a.send(e,"POST",c,n,15)})}I_(t,e,n){const s=ra(),r=[this.Ko,"/","google.firestore.v1.Firestore","/",t,"/channel"],i=Be(),o=Ue(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.Ho(a.initMessageHeaders,e,n),a.encodeInitMessageHeaders=!0;const l=r.join("");Qe(la,`Creating RPC '${t}' stream ${s}: ${l}`,a);const u=i.createWebChannel(l,a);this.E_(u);let h=!1,d=!1;const f=new ca({Zo:e=>{d?Qe(la,`Not sending because RPC '${t}' stream ${s} is closed:`,e):(h||(Qe(la,`Opening RPC '${t}' stream ${s} transport.`),u.open(),h=!0),Qe(la,`RPC '${t}' stream ${s} sending:`,e),u.send(e))},Xo:()=>u.close()}),p=(t,e,n)=>{t.listen(e,t=>{try{n(t)}catch(e){setTimeout(()=>{throw e},0)}})};return p(u,Oe.EventType.OPEN,()=>{d||(Qe(la,`RPC '${t}' stream ${s} transport opened.`),f.__())}),p(u,Oe.EventType.CLOSE,()=>{d||(d=!0,Qe(la,`RPC '${t}' stream ${s} transport closed`),f.u_(),this.d_(u))}),p(u,Oe.EventType.ERROR,e=>{d||(d=!0,Xe(la,`RPC '${t}' stream ${s} transport errored. Name:`,e.name,"Message:",e.message),f.u_(new sn(nn.UNAVAILABLE,"The operation could not be completed")))}),p(u,Oe.EventType.MESSAGE,e=>{var n;if(!d){const r=e.data[0];tn(!!r,16349);const i=r,o=(null==i?void 0:i.error)||(null===(n=i[0])||void 0===n?void 0:n.error);if(o){Qe(la,`RPC '${t}' stream ${s} received error:`,o);const e=o.status;let n=function(t){const e=yi[t];if(void 0!==e)return wi(e)}(e),r=o.message;void 0===n&&(n=nn.INTERNAL,r="Unknown error status: "+e+" with message "+o.message),d=!0,f.u_(new sn(n,r)),u.close()}else Qe(la,`RPC '${t}' stream ${s} received:`,r),f.c_(r)}}),p(o,Fe.STAT_EVENT,e=>{e.stat===Ve.PROXY?Qe(la,`RPC '${t}' stream ${s} detected buffering proxy`):e.stat===Ve.NOPROXY&&Qe(la,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{f.a_()},0),f}terminate(){this.l_.forEach(t=>t.close()),this.l_=[]}E_(t){this.l_.push(t)}d_(t){this.l_=this.l_.filter(e=>e===t)}}function ha(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(t){return new Vi(t,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(t,e,n=1e3,s=1.5,r=6e4){this.xi=t,this.timerId=e,this.A_=n,this.R_=s,this.V_=r,this.m_=0,this.f_=null,this.g_=Date.now(),this.reset()}reset(){this.m_=0}p_(){this.m_=this.V_}y_(t){this.cancel();const e=Math.floor(this.m_+this.w_()),n=Math.max(0,Date.now()-this.g_),s=Math.max(0,e-n);s>0&&Qe("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.m_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.f_=this.xi.enqueueAfterDelay(this.timerId,s,()=>(this.g_=Date.now(),t())),this.m_*=this.R_,this.m_<this.A_&&(this.m_=this.A_),this.m_>this.V_&&(this.m_=this.V_)}b_(){null!==this.f_&&(this.f_.skipDelay(),this.f_=null)}cancel(){null!==this.f_&&(this.f_.cancel(),this.f_=null)}w_(){return(Math.random()-.5)*this.m_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pa="PersistentStream";class ma{constructor(t,e,n,s,r,i,o,a){this.xi=t,this.S_=n,this.D_=s,this.connection=r,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.v_=0,this.C_=null,this.F_=null,this.stream=null,this.M_=0,this.x_=new fa(t,e)}O_(){return 1===this.state||5===this.state||this.N_()}N_(){return 2===this.state||3===this.state}start(){this.M_=0,4!==this.state?this.auth():this.B_()}async stop(){this.O_()&&await this.close(0)}L_(){this.state=0,this.x_.reset()}k_(){this.N_()&&null===this.C_&&(this.C_=this.xi.enqueueAfterDelay(this.S_,6e4,()=>this.q_()))}Q_(t){this.U_(),this.stream.send(t)}async q_(){if(this.N_())return this.close(0)}U_(){this.C_&&(this.C_.cancel(),this.C_=null)}K_(){this.F_&&(this.F_.cancel(),this.F_=null)}async close(t,e){this.U_(),this.K_(),this.x_.cancel(),this.v_++,4!==t?this.x_.reset():e&&e.code===nn.RESOURCE_EXHAUSTED?(We(e.toString()),We("Using maximum backoff delay to prevent overloading the backend."),this.x_.p_()):e&&e.code===nn.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.i_(e)}W_(){}auth(){this.state=1;const t=this.G_(this.v_),e=this.v_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([t,n])=>{this.v_===e&&this.z_(t,n)},e=>{t(()=>{const t=new sn(nn.UNKNOWN,"Fetching auth token failed: "+e.message);return this.j_(t)})})}z_(t,e){const n=this.G_(this.v_);this.stream=this.H_(t,e),this.stream.e_(()=>{n(()=>this.listener.e_())}),this.stream.n_(()=>{n(()=>(this.state=2,this.F_=this.xi.enqueueAfterDelay(this.D_,1e4,()=>(this.N_()&&(this.state=3),Promise.resolve())),this.listener.n_()))}),this.stream.i_(t=>{n(()=>this.j_(t))}),this.stream.onMessage(t=>{n(()=>1==++this.M_?this.J_(t):this.onNext(t))})}B_(){this.state=5,this.x_.y_(async()=>{this.state=0,this.start()})}j_(t){return Qe(pa,`close with error: ${t}`),this.stream=null,this.close(4,t)}G_(t){return e=>{this.xi.enqueueAndForget(()=>this.v_===t?e():(Qe(pa,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ga extends ma{constructor(t,e,n,s,r,i){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,i),this.serializer=r}H_(t,e){return this.connection.I_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.x_.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const r="NO_CHANGE"===(s=e.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===s?1:"REMOVE"===s?2:"CURRENT"===s?3:"RESET"===s?4:Je(39313,{state:s}),i=e.targetChange.targetIds||[],o=function(t,e){return t.useProto3Json?(tn(void 0===e||"string"==typeof e,58123),ts.fromBase64String(e||"")):(tn(void 0===e||e instanceof Buffer||e instanceof Uint8Array,16193),ts.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(t){const e=void 0===t.code?nn.UNKNOWN:wi(t.code);return new sn(e,t.message||"")}(a);n=new Di(r,i,o,c||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=Gi(t,s.document.name),i=$i(s.document.updateTime),o=s.document.createTime?$i(s.document.createTime):In.min(),a=new Ms({mapValue:{fields:s.document.fields}}),c=Vs.newFoundDocument(r,i,o,a),l=s.targetIds||[],u=s.removedTargetIds||[];n=new Ai(l,u,c.key,c)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=Gi(t,s.document),i=s.readTime?$i(s.readTime):In.min(),o=Vs.newNoDocument(r,i),a=s.removedTargetIds||[];n=new Ai([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=Gi(t,s.document),i=s.removedTargetIds||[];n=new Ai([],i,r,null)}else{if(!("filter"in e))return Je(11601,{Vt:e});{e.filter;const t=e.filter;t.targetId;const{count:s=0,unchangedNames:r}=t,i=new gi(s,r),o=t.targetId;n=new ki(o,i)}}var s;return n}(this.serializer,t),n=function(t){if(!("targetChange"in t))return In.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?In.min():e.readTime?$i(e.readTime):In.min()}(t);return this.listener.Y_(e,n)}Z_(t){const e={};e.database=Wi(this.serializer),e.addTarget=function(t,e){let n;const s=e.target;if(n=lr(s)?{documents:Ji(t,s)}:{query:Zi(t,s).gt},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0){n.resumeToken=Bi(t,e.resumeToken);const s=Fi(t,e.expectedCount);null!==s&&(n.expectedCount=s)}else if(e.snapshotVersion.compareTo(In.min())>0){n.readTime=Ui(t,e.snapshotVersion.toTimestamp());const s=Fi(t,e.expectedCount);null!==s&&(n.expectedCount=s)}return n}(this.serializer,t);const n=function(t,e){const n=function(t){switch(t){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Je(28987,{purpose:t})}}(e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,t);n&&(e.labels=n),this.Q_(e)}X_(t){const e={};e.database=Wi(this.serializer),e.removeTarget=t,this.Q_(e)}}class ya extends ma{constructor(t,e,n,s,r,i){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,i),this.serializer=r}get ea(){return this.M_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.ea&&this.ta([])}H_(t,e){return this.connection.I_("Write",t,e)}J_(t){return tn(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,tn(!t.writeResults||0===t.writeResults.length,55816),this.listener.na()}onNext(t){tn(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.x_.reset();const e=function(t,e){return t&&t.length>0?(tn(void 0!==e,14353),t.map(t=>function(t,e){let n=t.updateTime?$i(t.updateTime):$i(e);return n.isEqual(In.min())&&(n=$i(e)),new Yr(n,t.transformResults||[])}(t,e))):[]}(t.writeResults,t.commitTime),n=$i(t.commitTime);return this.listener.ra(n,e)}ia(){const t={};t.database=Wi(this.serializer),this.Q_(t)}ta(t){const e={streamToken:this.lastStreamToken,writes:t.map(t=>function(t,e){let n;if(e instanceof oi)n={update:Yi(t,e.key,e.value)};else if(e instanceof hi)n={delete:Ki(t,e.key)};else if(e instanceof ai)n={update:Yi(t,e.key,e.data),updateMask:co(e.fieldMask)};else{if(!(e instanceof di))return Je(16599,{ft:e.type});n={verify:Ki(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(t=>function(t,e){const n=e.transform;if(n instanceof $r)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof qr)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Hr)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Gr)return{fieldPath:e.field.canonicalString(),increment:n.Re};throw Je(20930,{transform:e.transform})}(0,t))),e.precondition.isNone||(n.currentDocument=(s=t,void 0!==(r=e.precondition).updateTime?{updateTime:ji(s,r.updateTime)}:void 0!==r.exists?{exists:r.exists}:Je(27497))),n;var s,r}(this.serializer,t))};this.Q_(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{}class wa extends va{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.sa=!1}oa(){if(this.sa)throw new sn(nn.FAILED_PRECONDITION,"The client has already been terminated.")}zo(t,e,n,s){return this.oa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection.zo(t,zi(e,n),s,r,i)).catch(t=>{throw"FirebaseError"===t.name?(t.code===nn.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new sn(nn.UNKNOWN,t.toString())})}Yo(t,e,n,s,r){return this.oa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Yo(t,zi(e,n),s,i,o,r)).catch(t=>{throw"FirebaseError"===t.name?(t.code===nn.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new sn(nn.UNKNOWN,t.toString())})}terminate(){this.sa=!0,this.connection.terminate()}}class ba{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this._a=0,this.aa=null,this.ua=!0}ca(){0===this._a&&(this.la("Unknown"),this.aa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.aa=null,this.ha("Backend didn't respond within 10 seconds."),this.la("Offline"),Promise.resolve())))}Pa(t){"Online"===this.state?this.la("Unknown"):(this._a++,this._a>=1&&(this.Ta(),this.ha(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.la("Offline")))}set(t){this.Ta(),this._a=0,"Online"===t&&(this.ua=!1),this.la(t)}la(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ha(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ua?(We(e),this.ua=!1):Qe("OnlineStateTracker",e)}Ta(){null!==this.aa&&(this.aa.cancel(),this.aa=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea="RemoteStore";class _a{constructor(t,e,n,s,r){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Ia=[],this.Ea=new Map,this.da=new Set,this.Aa=[],this.Ra=r,this.Ra.No(t=>{n.enqueueAndForget(async()=>{Na(this)&&(Qe(Ea,"Restarting streams for network reachability change."),await async function(t){const e=en(t);e.da.add(4),await Ca(e),e.Va.set("Unknown"),e.da.delete(4),await Ta(e)}(this))})}),this.Va=new ba(n,s)}}async function Ta(t){if(Na(t))for(const e of t.Aa)await e(!0)}async function Ca(t){for(const e of t.Aa)await e(!1)}function Ia(t,e){const n=en(t);n.Ea.has(e.targetId)||(n.Ea.set(e.targetId,e),xa(n)?Da(n):Wa(n).N_()&&Aa(n,e))}function Sa(t,e){const n=en(t),s=Wa(n);n.Ea.delete(e),s.N_()&&ka(n,e),0===n.Ea.size&&(s.N_()?s.k_():Na(n)&&n.Va.set("Unknown"))}function Aa(t,e){if(t.ma.Ke(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(In.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Wa(t).Z_(e)}function ka(t,e){t.ma.Ke(e),Wa(t).X_(e)}function Da(t){t.ma=new Ni({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),Rt:e=>t.Ea.get(e)||null,Pt:()=>t.datastore.serializer.databaseId}),Wa(t).start(),t.Va.ca()}function xa(t){return Na(t)&&!Wa(t).O_()&&t.Ea.size>0}function Na(t){return 0===en(t).da.size}function Ra(t){t.ma=void 0}async function La(t){t.Va.set("Online")}async function Oa(t){t.Ea.forEach((e,n)=>{Aa(t,e)})}async function Ma(t,e){Ra(t),xa(t)?(t.Va.Pa(e),Da(t)):t.Va.set("Unknown")}async function Pa(t,e,n){if(t.Va.set("Online"),e instanceof Di&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const s of e.targetIds)t.Ea.has(s)&&(await t.remoteSyncer.rejectListen(s,n),t.Ea.delete(s),t.ma.removeTarget(s))}(t,e)}catch(s){Qe(Ea,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await Va(t,s)}else if(e instanceof Ai?t.ma.Xe(e):e instanceof ki?t.ma.ot(e):t.ma.nt(e),!n.isEqual(In.min()))try{const e=await Go(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.ma.It(e);return n.targetChanges.forEach((n,s)=>{if(n.resumeToken.approximateByteSize()>0){const r=t.Ea.get(s);r&&t.Ea.set(s,r.withResumeToken(n.resumeToken,e))}}),n.targetMismatches.forEach((e,n)=>{const s=t.Ea.get(e);if(!s)return;t.Ea.set(e,s.withResumeToken(ts.EMPTY_BYTE_STRING,s.snapshotVersion)),ka(t,e);const r=new uo(s.target,e,n,s.sequenceNumber);Aa(t,r)}),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(r){Qe(Ea,"Failed to raise snapshot:",r),await Va(t,r)}}async function Va(t,e,n){if(!Fn(e))throw e;t.da.add(1),await Ca(t),t.Va.set("Offline"),n||(n=()=>Go(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{Qe(Ea,"Retrying IndexedDB access"),await n(),t.da.delete(1),await Ta(t)})}function Fa(t,e){return e().catch(n=>Va(t,n,e))}async function Ua(t){const e=en(t),n=Xa(e);let s=e.Ia.length>0?e.Ia[e.Ia.length-1].batchId:-1;for(;Ba(e);)try{const t=await Wo(e.localStore,s);if(null===t){0===e.Ia.length&&n.k_();break}s=t.batchId,ja(e,t)}catch(r){await Va(e,r)}$a(e)&&qa(e)}function Ba(t){return Na(t)&&t.Ia.length<10}function ja(t,e){t.Ia.push(e);const n=Xa(t);n.N_()&&n.ea&&n.ta(e.mutations)}function $a(t){return Na(t)&&!Xa(t).O_()&&t.Ia.length>0}function qa(t){Xa(t).start()}async function za(t){Xa(t).ia()}async function Ha(t){const e=Xa(t);for(const n of t.Ia)e.ta(n.mutations)}async function Ka(t,e,n){const s=t.Ia.shift(),r=pi.from(s,e,n);await Fa(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await Ua(t)}async function Ga(t,e){e&&Xa(t).ea&&await async function(t,e){if(function(t){switch(t){case nn.OK:return Je(64938);case nn.CANCELLED:case nn.UNKNOWN:case nn.DEADLINE_EXCEEDED:case nn.RESOURCE_EXHAUSTED:case nn.INTERNAL:case nn.UNAVAILABLE:case nn.UNAUTHENTICATED:return!1;case nn.INVALID_ARGUMENT:case nn.NOT_FOUND:case nn.ALREADY_EXISTS:case nn.PERMISSION_DENIED:case nn.FAILED_PRECONDITION:case nn.ABORTED:case nn.OUT_OF_RANGE:case nn.UNIMPLEMENTED:case nn.DATA_LOSS:return!0;default:return Je(15467,{code:t})}}(n=e.code)&&n!==nn.ABORTED){const n=t.Ia.shift();Xa(t).L_(),await Fa(t,()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e)),await Ua(t)}var n}(t,e),$a(t)&&qa(t)}async function Qa(t,e){const n=en(t);n.asyncQueue.verifyOperationInProgress(),Qe(Ea,"RemoteStore received new credentials");const s=Na(n);n.da.add(3),await Ca(n),s&&n.Va.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.da.delete(3),await Ta(n)}function Wa(t){return t.fa||(t.fa=function(t,e,n){const s=en(t);return s.oa(),new ga(e,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,n)}(t.datastore,t.asyncQueue,{e_:La.bind(null,t),n_:Oa.bind(null,t),i_:Ma.bind(null,t),Y_:Pa.bind(null,t)}),t.Aa.push(async e=>{e?(t.fa.L_(),xa(t)?Da(t):t.Va.set("Unknown")):(await t.fa.stop(),Ra(t))})),t.fa}function Xa(t){return t.ga||(t.ga=function(t,e,n){const s=en(t);return s.oa(),new ya(e,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,n)}(t.datastore,t.asyncQueue,{e_:()=>Promise.resolve(),n_:za.bind(null,t),i_:Ga.bind(null,t),na:Ha.bind(null,t),ra:Ka.bind(null,t)}),t.Aa.push(async e=>{e?(t.ga.L_(),await Ua(t)):(await t.ga.stop(),t.Ia.length>0&&(Qe(Ea,`Stopping write stream with ${t.Ia.length} pending writes`),t.Ia=[]))})),t.ga
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Ya{constructor(t,e,n,s,r){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=r,this.deferred=new rn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(t=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,r){const i=Date.now()+n,o=new Ya(t,e,i,s,r);return o.start(n),o}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new sn(nn.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ja(t,e){if(We("AsyncQueue",`${e}: ${t}`),Fn(t))return new sn(nn.UNAVAILABLE,`${e}: ${t}`);throw t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{static emptySet(t){return new Za(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||Nn.comparator(e.key,n.key):(t,e)=>Nn.comparator(t.key,e.key),this.keyedMap=Sr(),this.sortedSet=new Gn(this.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Za))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,s=n.getNext().key;if(!t.isEqual(s))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new Za;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(){this.pa=new Gn(Nn.comparator)}track(t){const e=t.doc.key,n=this.pa.get(e);n?0!==t.type&&3===n.type?this.pa=this.pa.insert(e,t):3===t.type&&1!==n.type?this.pa=this.pa.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.pa=this.pa.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.pa=this.pa.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.pa=this.pa.remove(e):1===t.type&&2===n.type?this.pa=this.pa.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.pa=this.pa.insert(e,{type:2,doc:t.doc}):Je(63341,{Vt:t,ya:n}):this.pa=this.pa.insert(e,t)}wa(){const t=[];return this.pa.inorderTraversal((e,n)=>{t.push(n)}),t}}class ec{constructor(t,e,n,s,r,i,o,a,c){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=r,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(t,e,n,s,r){const i=[];return e.forEach(t=>{i.push({type:0,doc:t})}),new ec(t,e,Za.emptySet(e),i,n,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&gr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(){this.ba=void 0,this.Sa=[]}Da(){return this.Sa.some(t=>t.va())}}class sc{constructor(){this.queries=rc(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(t,e){const n=en(t),s=n.queries;n.queries=rc(),s.forEach((t,n)=>{for(const s of n.Sa)s.onError(e)})}(this,new sn(nn.ABORTED,"Firestore shutting down"))}}function rc(){return new _r(t=>yr(t),gr)}function ic(t,e){const n=en(t);let s=!1;for(const r of e){const t=r.query,e=n.queries.get(t);if(e){for(const t of e.Sa)t.Ma(r)&&(s=!0);e.ba=r}}s&&ac(n)}function oc(t,e,n){const s=en(t),r=s.queries.get(e);if(r)for(const i of r.Sa)i.onError(n);s.queries.delete(e)}function ac(t){t.Ca.forEach(t=>{t.next()})}var cc,lc;(lc=cc||(cc={})).xa="default",lc.Cache="cache";class uc{constructor(t,e,n){this.query=t,this.Oa=e,this.Na=!1,this.Ba=null,this.onlineState="Unknown",this.options=n||{}}Ma(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new ec(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Na?this.La(t)&&(this.Oa.next(t),e=!0):this.ka(t,this.onlineState)&&(this.qa(t),e=!0),this.Ba=t,e}onError(t){this.Oa.error(t)}Fa(t){this.onlineState=t;let e=!1;return this.Ba&&!this.Na&&this.ka(this.Ba,t)&&(this.qa(this.Ba),e=!0),e}ka(t,e){if(!t.fromCache)return!0;if(!this.va())return!0;const n="Offline"!==e;return(!this.options.Qa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||"Offline"===e)}La(t){if(t.docChanges.length>0)return!0;const e=this.Ba&&this.Ba.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}qa(t){t=ec.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Na=!0,this.Oa.next(t)}va(){return this.options.source!==cc.Cache}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(t){this.key=t}}class dc{constructor(t){this.key=t}}class fc{constructor(t,e){this.query=t,this.Ha=e,this.Ja=null,this.hasCachedResults=!1,this.current=!1,this.Ya=Lr(),this.mutatedKeys=Lr(),this.Za=br(t),this.Xa=new Za(this.Za)}get eu(){return this.Ha}tu(t,e){const n=e?e.nu:new tc,s=e?e.Xa:this.Xa;let r=e?e.mutatedKeys:this.mutatedKeys,i=s,o=!1;const a="F"===this.query.limitType&&s.size===this.query.limit?s.last():null,c="L"===this.query.limitType&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((t,e)=>{const l=s.get(t),u=wr(this.query,e)?e:null,h=!!l&&this.mutatedKeys.has(l.key),d=!!u&&(u.hasLocalMutations||this.mutatedKeys.has(u.key)&&u.hasCommittedMutations);let f=!1;l&&u?l.data.isEqual(u.data)?h!==d&&(n.track({type:3,doc:u}),f=!0):this.ru(l,u)||(n.track({type:2,doc:u}),f=!0,(a&&this.Za(u,a)>0||c&&this.Za(u,c)<0)&&(o=!0)):!l&&u?(n.track({type:0,doc:u}),f=!0):l&&!u&&(n.track({type:1,doc:l}),f=!0,(a||c)&&(o=!0)),f&&(u?(i=i.add(u),r=d?r.add(t):r.delete(t)):(i=i.delete(t),r=r.delete(t)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const t="F"===this.query.limitType?i.last():i.first();i=i.delete(t.key),r=r.delete(t.key),n.track({type:1,doc:t})}return{Xa:i,nu:n,Cs:o,mutatedKeys:r}}ru(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const r=this.Xa;this.Xa=t.Xa,this.mutatedKeys=t.mutatedKeys;const i=t.nu.wa();i.sort((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Je(20277,{Vt:t})}};return n(t)-n(e)}(t.type,e.type)||this.Za(t.doc,e.doc)),this.iu(n),s=null!=s&&s;const o=e&&!s?this.su():[],a=0===this.Ya.size&&this.current&&!s?1:0,c=a!==this.Ja;return this.Ja=a,0!==i.length||c?{snapshot:new ec(this.query,t.Xa,r,i,t.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),ou:o}:{ou:o}}Fa(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({Xa:this.Xa,nu:new tc,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{ou:[]}}_u(t){return!this.Ha.has(t)&&!!this.Xa.has(t)&&!this.Xa.get(t).hasLocalMutations}iu(t){t&&(t.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),t.modifiedDocuments.forEach(t=>{}),t.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=t.current)}su(){if(!this.current)return[];const t=this.Ya;this.Ya=Lr(),this.Xa.forEach(t=>{this._u(t.key)&&(this.Ya=this.Ya.add(t.key))});const e=[];return t.forEach(t=>{this.Ya.has(t)||e.push(new dc(t))}),this.Ya.forEach(n=>{t.has(n)||e.push(new hc(n))}),e}au(t){this.Ha=t.$s,this.Ya=Lr();const e=this.tu(t.documents);return this.applyChanges(e,!0)}uu(){return ec.fromInitialDocuments(this.query,this.Xa,this.mutatedKeys,0===this.Ja,this.hasCachedResults)}}const pc="SyncEngine";class mc{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class gc{constructor(t){this.key=t,this.cu=!1}}class yc{constructor(t,e,n,s,r,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=i,this.lu={},this.hu=new _r(t=>yr(t),gr),this.Pu=new Map,this.Tu=new Set,this.Iu=new Gn(Nn.comparator),this.Eu=new Map,this.du=new No,this.Au={},this.Ru=new Map,this.Vu=wo.lr(),this.onlineState="Unknown",this.mu=void 0}get isPrimaryClient(){return!0===this.mu}}async function vc(t,e,n=!0){const s=Uc(t);let r;const i=s.hu.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.uu()):r=await bc(s,e,n,!0),r}async function wc(t,e){const n=Uc(t);await bc(n,e,!0,!1)}async function bc(t,e,n,s){const r=await function(t,e){const n=en(t);return n.persistence.runTransaction("Allocate target","readwrite",t=>{let s;return n.Ti.getTargetData(t,e).next(r=>r?(s=r,Vn.resolve(s)):n.Ti.allocateTargetId(t).next(r=>(s=new uo(e,r,"TargetPurposeListen",t.currentSequenceNumber),n.Ti.addTargetData(t,s).next(()=>s))))}).then(t=>{const s=n.xs.get(t.targetId);return(null===s||t.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.xs=n.xs.insert(t.targetId,t),n.Os.set(e,t.targetId)),t})}(t.localStore,pr(e)),i=r.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let a;return s&&(a=await async function(t,e,n,s,r){t.fu=(e,n,s)=>async function(t,e,n,s){let r=e.view.tu(n);r.Cs&&(r=await Yo(t.localStore,e.query,!1).then(({documents:t})=>e.view.tu(t,r)));const i=s&&s.targetChanges.get(e.targetId),o=s&&null!=s.targetMismatches.get(e.targetId),a=e.view.applyChanges(r,t.isPrimaryClient,i,o);return Lc(t,e.targetId,a.ou),a.snapshot}(t,e,n,s);const i=await Yo(t.localStore,e,!0),o=new fc(e,i.$s),a=o.tu(i.documents),c=Si.createSynthesizedTargetChangeForCurrentChange(n,s&&"Offline"!==t.onlineState,r),l=o.applyChanges(a,t.isPrimaryClient,c);Lc(t,n,l.ou);const u=new mc(e,n,o);return t.hu.set(e,u),t.Pu.has(n)?t.Pu.get(n).push(e):t.Pu.set(n,[e]),l.snapshot}(t,e,i,"current"===o,r.resumeToken)),t.isPrimaryClient&&n&&Ia(t.remoteStore,r),a}async function Ec(t,e,n){const s=en(t),r=s.hu.get(e),i=s.Pu.get(r.targetId);if(i.length>1)return s.Pu.set(r.targetId,i.filter(t=>!gr(t,e))),void s.hu.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await Xo(s.localStore,r.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(r.targetId),n&&Sa(s.remoteStore,r.targetId),Nc(s,r.targetId)}).catch(Pn)):(Nc(s,r.targetId),await Xo(s.localStore,r.targetId,!0))}async function _c(t,e){const n=en(t),s=n.hu.get(e),r=n.Pu.get(s.targetId);n.isPrimaryClient&&1===r.length&&(n.sharedClientState.removeLocalQueryTarget(s.targetId),Sa(n.remoteStore,s.targetId))}async function Tc(t,e,n){const s=function(t){const e=en(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Ac.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=kc.bind(null,e),e}(t);try{const t=await function(t,e){const n=en(t),s=Cn.now(),r=e.reduce((t,e)=>t.add(e.key),Lr());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",t=>{let a=Cr(),c=Lr();return n.Bs.getEntries(t,r).next(t=>{a=t,a.forEach((t,e)=>{e.isValidDocument()||(c=c.add(t))})}).next(()=>n.localDocuments.getOverlayedDocuments(t,a)).next(r=>{i=r;const o=[];for(const t of e){const e=ri(t,i.get(t.key).overlayedDocument);null!=e&&o.push(new ai(t.key,e,Ps(e.value.mapValue),Jr.exists(!0)))}return n.mutationQueue.addMutationBatch(t,s,o,e)}).next(e=>{o=e;const s=e.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(t,e.batchId,s)})}).then(()=>({batchId:o.batchId,changes:Ar(i)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let s=t.Au[t.currentUser.toKey()];s||(s=new Gn(yn)),s=s.insert(e,n),t.Au[t.currentUser.toKey()]=s}(s,t.batchId,n),await Pc(s,t.changes),await Ua(s.remoteStore)}catch(r){const t=Ja(r,"Failed to persist write");n.reject(t)}}async function Cc(t,e){const n=en(t);try{const t=await Qo(n.localStore,e);e.targetChanges.forEach((t,e)=>{const s=n.Eu.get(e);s&&(tn(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1,22616),t.addedDocuments.size>0?s.cu=!0:t.modifiedDocuments.size>0?tn(s.cu,14607):t.removedDocuments.size>0&&(tn(s.cu,42227),s.cu=!1))}),await Pc(n,t,e)}catch(s){await Pn(s)}}function Ic(t,e,n){const s=en(t);if(s.isPrimaryClient&&0===n||!s.isPrimaryClient&&1===n){const t=[];s.hu.forEach((n,s)=>{const r=s.view.Fa(e);r.snapshot&&t.push(r.snapshot)}),function(t,e){const n=en(t);n.onlineState=e;let s=!1;n.queries.forEach((t,n)=>{for(const r of n.Sa)r.Fa(e)&&(s=!0)}),s&&ac(n)}(s.eventManager,e),t.length&&s.lu.Y_(t),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function Sc(t,e,n){const s=en(t);s.sharedClientState.updateQueryState(e,"rejected",n);const r=s.Eu.get(e),i=r&&r.key;if(i){let t=new Gn(Nn.comparator);t=t.insert(i,Vs.newNoDocument(i,In.min()));const n=Lr().add(i),r=new Ii(In.min(),new Map,new Gn(yn),t,n);await Cc(s,r),s.Iu=s.Iu.remove(i),s.Eu.delete(e),Mc(s)}else await Xo(s.localStore,e,!1).then(()=>Nc(s,e,n)).catch(Pn)}async function Ac(t,e){const n=en(t),s=e.batch.batchId;try{const t=await function(t,e){const n=en(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",t=>{const s=e.batch.keys(),r=n.Bs.newChangeBuffer({trackRemovals:!0});return function(t,e,n,s){const r=n.batch,i=r.keys();let o=Vn.resolve();return i.forEach(t=>{o=o.next(()=>s.getEntry(e,t)).next(e=>{const i=n.docVersions.get(t);tn(null!==i,48541),e.version.compareTo(i)<0&&(r.applyToRemoteDocument(e,n),e.isValidDocument()&&(e.setReadTime(n.commitVersion),s.addEntry(e)))})}),o.next(()=>t.mutationQueue.removeMutationBatch(e,r))}(n,t,e,r).next(()=>r.apply(t)).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,function(t){let e=Lr();for(let n=0;n<t.mutationResults.length;++n)t.mutationResults[n].transformResults.length>0&&(e=e.add(t.batch.mutations[n].key));return e}(e))).next(()=>n.localDocuments.getDocuments(t,s))})}(n.localStore,e);xc(n,s,null),Dc(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Pc(n,t)}catch(r){await Pn(r)}}async function kc(t,e,n){const s=en(t);try{const t=await function(t,e){const n=en(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",t=>{let s;return n.mutationQueue.lookupMutationBatch(t,e).next(e=>(tn(null!==e,37113),s=e.keys(),n.mutationQueue.removeMutationBatch(t,e))).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,s,e)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,s)).next(()=>n.localDocuments.getDocuments(t,s))})}(s.localStore,e);xc(s,e,n),Dc(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await Pc(s,t)}catch(r){await Pn(r)}}function Dc(t,e){(t.Ru.get(e)||[]).forEach(t=>{t.resolve()}),t.Ru.delete(e)}function xc(t,e,n){const s=en(t);let r=s.Au[s.currentUser.toKey()];if(r){const t=r.get(e);t&&(n?t.reject(n):t.resolve(),r=r.remove(e)),s.Au[s.currentUser.toKey()]=r}}function Nc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.Pu.get(e))t.hu.delete(s),n&&t.lu.gu(s,n);t.Pu.delete(e),t.isPrimaryClient&&t.du.Hr(e).forEach(e=>{t.du.containsKey(e)||Rc(t,e)})}function Rc(t,e){t.Tu.delete(e.path.canonicalString());const n=t.Iu.get(e);null!==n&&(Sa(t.remoteStore,n),t.Iu=t.Iu.remove(e),t.Eu.delete(n),Mc(t))}function Lc(t,e,n){for(const s of n)s instanceof hc?(t.du.addReference(s.key,e),Oc(t,s)):s instanceof dc?(Qe(pc,"Document no longer in limbo: "+s.key),t.du.removeReference(s.key,e),t.du.containsKey(s.key)||Rc(t,s.key)):Je(19791,{pu:s})}function Oc(t,e){const n=e.key,s=n.path.canonicalString();t.Iu.get(n)||t.Tu.has(s)||(Qe(pc,"New document in limbo: "+n),t.Tu.add(s),Mc(t))}function Mc(t){for(;t.Tu.size>0&&t.Iu.size<t.maxConcurrentLimboResolutions;){const e=t.Tu.values().next().value;t.Tu.delete(e);const n=new Nn(kn.fromString(e)),s=t.Vu.next();t.Eu.set(s,new gc(n)),t.Iu=t.Iu.insert(n,s),Ia(t.remoteStore,new uo(pr(hr(n.path)),s,"TargetPurposeLimboResolution",Un.le))}}async function Pc(t,e,n){const s=en(t),r=[],i=[],o=[];s.hu.isEmpty()||(s.hu.forEach((t,a)=>{o.push(s.fu(a,e,n).then(t=>{var e;if((t||n)&&s.isPrimaryClient){const r=t?!t.fromCache:null===(e=null==n?void 0:n.targetChanges.get(a.targetId))||void 0===e?void 0:e.current;s.sharedClientState.updateQueryState(a.targetId,r?"current":"not-current")}if(t){r.push(t);const e=jo.Rs(a.targetId,t);i.push(e)}}))}),await Promise.all(o),s.lu.Y_(r),await async function(t,e){const n=en(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",t=>Vn.forEach(e,e=>Vn.forEach(e.ds,s=>n.persistence.referenceDelegate.addReference(t,e.targetId,s)).next(()=>Vn.forEach(e.As,s=>n.persistence.referenceDelegate.removeReference(t,e.targetId,s)))))}catch(s){if(!Fn(s))throw s;Qe(zo,"Failed to update sequence numbers: "+s)}for(const r of e){const t=r.targetId;if(!r.fromCache){const e=n.xs.get(t),s=e.snapshotVersion,r=e.withLastLimboFreeSnapshotVersion(s);n.xs=n.xs.insert(t,r)}}}(s.localStore,i))}async function Vc(t,e){const n=en(t);if(!n.currentUser.isEqual(e)){Qe(pc,"User change. New user:",e.toKey());const t=await Ko(n.localStore,e);n.currentUser=e,r="'waitForPendingWrites' promise is rejected due to a user change.",(s=n).Ru.forEach(t=>{t.forEach(t=>{t.reject(new sn(nn.CANCELLED,r))})}),s.Ru.clear(),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await Pc(n,t.ks)}var s,r}function Fc(t,e){const n=en(t),s=n.Eu.get(e);if(s&&s.cu)return Lr().add(s.key);{let t=Lr();const s=n.Pu.get(e);if(!s)return t;for(const e of s){const s=n.hu.get(e);t=t.unionWith(s.view.eu)}return t}}function Uc(t){const e=en(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Cc.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Fc.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Sc.bind(null,e),e.lu.Y_=ic.bind(null,e.eventManager),e.lu.gu=oc.bind(null,e.eventManager),e}class Bc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=da(t.databaseInfo.databaseId),this.sharedClientState=this.bu(t),this.persistence=this.Su(t),await this.persistence.start(),this.localStore=this.Du(t),this.gcScheduler=this.vu(t,this.localStore),this.indexBackfillerScheduler=this.Cu(t,this.localStore)}vu(t,e){return null}Cu(t,e){return null}Du(t){return function(t,e,n,s){return new Ho(t,e,n,s)}(this.persistence,new qo,t.initialUser,this.serializer)}Su(t){return new Vo(Uo.fi,this.serializer)}bu(t){return new Zo}async terminate(){var t,e;null===(t=this.gcScheduler)||void 0===t||t.stop(),null===(e=this.indexBackfillerScheduler)||void 0===e||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Bc.provider={build:()=>new Bc};class jc extends Bc{constructor(t){super(),this.cacheSizeBytes=t}vu(t,e){tn(this.persistence.referenceDelegate instanceof Bo,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new To(n,t.asyncQueue,e)}Su(t){const e=void 0!==this.cacheSizeBytes?vo.withCacheSize(this.cacheSizeBytes):vo.DEFAULT;return new Vo(t=>Bo.fi(t,e),this.serializer)}}class $c{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>Ic(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=Vc.bind(null,this.syncEngine),await async function(t,e){const n=en(t);e?(n.da.delete(2),await Ta(n)):e||(n.da.add(2),await Ca(n),n.Va.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new sc}createDatastore(t){const e=da(t.databaseInfo.databaseId),n=(s=t.databaseInfo,new ua(s));var s;return function(t,e,n,s){return new wa(t,e,n,s)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,s=t.asyncQueue,r=t=>Ic(this.syncEngine,t,0),i=na.C()?new na:new ta,new _a(e,n,s,r,i);var e,n,s,r,i}createSyncEngine(t,e){return function(t,e,n,s,r,i,o){const a=new yc(t,e,n,s,r,i);return o&&(a.mu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(t){const e=en(t);Qe(Ea,"RemoteStore shutting down."),e.da.add(5),await Ca(e),e.Ra.shutdown(),e.Va.set("Unknown")}(this.remoteStore),null===(t=this.datastore)||void 0===t||t.terminate(),null===(e=this.eventManager)||void 0===e||e.terminate()}}$c.provider={build:()=>new $c};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qc{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Mu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Mu(this.observer.error,t):We("Uncaught Error in snapshot listener:",t.toString()))}xu(){this.muted=!0}Mu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zc="FirestoreClient";class Hc{constructor(t,e,n,s,r){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=ze.UNAUTHENTICATED,this.clientId=gn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(n,async t=>{Qe(zc,"Received user=",t.uid),await this.authCredentialListener(t),this.user=t}),this.appCheckCredentials.start(n,t=>(Qe(zc,"Received new app check token=",t),this.appCheckCredentialListener(t,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new rn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Ja(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function Kc(t,e){t.asyncQueue.verifyOperationInProgress(),Qe(zc,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async t=>{s.isEqual(t)||(await Ko(e.localStore,t),s=t)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Gc(t,e){t.asyncQueue.verifyOperationInProgress();const n=await async function(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){Qe(zc,"Using user provided OfflineComponentProvider");try{await Kc(t,t._uninitializedComponentsProvider._offline)}catch(e){const r=e;if(!("FirebaseError"===(n=r).name?n.code===nn.FAILED_PRECONDITION||n.code===nn.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&n instanceof DOMException)||22===n.code||20===n.code||11===n.code))throw r;Xe("Error using user provided cache. Falling back to memory cache: "+r),await Kc(t,new Bc)}}else Qe(zc,"Using default OfflineComponentProvider"),await Kc(t,new jc(void 0));var n;return t._offlineComponents}(t);Qe(zc,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(t=>Qa(e.remoteStore,t)),t.setAppCheckTokenChangeListener((t,n)=>Qa(e.remoteStore,n)),t._onlineComponents=e}async function Qc(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(Qe(zc,"Using user provided OnlineComponentProvider"),await Gc(t,t._uninitializedComponentsProvider._online)):(Qe(zc,"Using default OnlineComponentProvider"),await Gc(t,new $c))),t._onlineComponents}async function Wc(t){const e=await Qc(t),n=e.eventManager;return n.onListen=vc.bind(null,e.syncEngine),n.onUnlisten=Ec.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=wc.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=_c.bind(null,e.syncEngine),n}function Xc(t,e,n={}){const s=new rn;return t.asyncQueue.enqueueAndForget(async()=>function(t,e,n,s,r){const i=new qc({next:a=>{i.xu(),e.enqueueAndForget(()=>async function(t,e){const n=en(t),s=e.query;let r=3;const i=n.queries.get(s);if(i){const t=i.Sa.indexOf(e);t>=0&&(i.Sa.splice(t,1),0===i.Sa.length?r=e.va()?0:1:!i.Da()&&e.va()&&(r=2))}switch(r){case 0:return n.queries.delete(s),n.onUnlisten(s,!0);case 1:return n.queries.delete(s),n.onUnlisten(s,!1);case 2:return n.onLastRemoteStoreUnlisten(s);default:return}}(t,o));const c=a.docs.has(n);!c&&a.fromCache?r.reject(new sn(nn.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&s&&"server"===s.source?r.reject(new sn(nn.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):r.resolve(a)},error:t=>r.reject(t)}),o=new uc(hr(n.path),i,{includeMetadataChanges:!0,Qa:!0});return async function(e,n){const s=en(e);let r=3;const i=n.query;let o=s.queries.get(i);o?!o.Da()&&n.va()&&(r=2):(o=new nc,r=n.va()?0:1);try{switch(r){case 0:o.ba=await s.onListen(i,!0);break;case 1:o.ba=await s.onListen(i,!1);break;case 2:await s.onFirstRemoteStoreListen(i)}}catch(t){const s=Ja(t,`Initialization of query '${vr(n.query)}' failed`);return void n.onError(s)}s.queries.set(i,o),o.Sa.push(n),n.Fa(s.onlineState),o.ba&&n.Ma(o.ba)&&ac(s)}(t,o)}(await Wc(t),t.asyncQueue,e,n,s)),s.promise
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}function Yc(t){const e={};return void 0!==t.timeoutSeconds&&(e.timeoutSeconds=t.timeoutSeconds),e
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const Jc=new Map;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zc(t){if(!Nn.isDocumentKey(t))throw new sn(nn.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function tl(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const n=(e=t).constructor?e.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var e;return"function"==typeof t?"a function":Je(12329,{type:typeof t})}function el(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new sn(nn.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=tl(t);throw new sn(nn.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl="firestore.googleapis.com",sl=!0;class rl{constructor(t){var e,n;if(void 0===t.host){if(void 0!==t.ssl)throw new sn(nn.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=nl,this.ssl=sl}else this.host=t.host,this.ssl=null!==(e=t.ssl)&&void 0!==e?e:sl;if(this.isUsingEmulator=void 0!==t.emulatorOptions,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,void 0===t.cacheSizeBytes)this.cacheSizeBytes=yo;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new sn(nn.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}(function(t,e,n,s){if(!0===e&&!0===s)throw new sn(nn.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)})("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===t.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Yc(null!==(n=t.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(t){if(void 0!==t.timeoutSeconds){if(isNaN(t.timeoutSeconds))throw new sn(nn.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (must not be NaN)`);if(t.timeoutSeconds<5)throw new sn(nn.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (minimum allowed value is 5)`);if(t.timeoutSeconds>30)throw new sn(nn.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(e=this.experimentalLongPollingOptions,n=t.experimentalLongPollingOptions,e.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams;var e,n}}class il{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new rl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new sn(nn.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new sn(nn.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new rl(t),this._emulatorOptions=t.emulatorOptions||{},void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new an;switch(t.type){case"firstParty":return new hn(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new sn(nn.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Jc.get(t);e&&(Qe("ComponentProvider","Removing Datastore"),Jc.delete(t),e.terminate())}(this),Promise.resolve()}}function ol(t,e,n,s={}){var r;t=el(t,il);const i=W(e),o=t._getSettings(),a=Object.assign(Object.assign({},o),{emulatorOptions:t._getEmulatorOptions()}),c=`${e}:${n}`;i&&(async function(t){(await fetch(t,{credentials:"include"})).ok}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(`https://${c}`),J("Firestore",!0)),o.host!==nl&&o.host!==c&&Xe("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l=Object.assign(Object.assign({},o),{host:c,ssl:i,emulatorOptions:s});if(!st(l,a)&&(t._setSettings(l),s.mockUserToken)){let e,n;if("string"==typeof s.mockUserToken)e=s.mockUserToken,n=ze.MOCK_USER;else{e=function(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const i=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[$(JSON.stringify({alg:"none",type:"JWT"})),$(JSON.stringify(i)),""].join(".")}(s.mockUserToken,null===(r=t._app)||void 0===r?void 0:r.options.projectId);const i=s.mockUserToken.sub||s.mockUserToken.user_id;if(!i)throw new sn(nn.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new ze(i)}t._authCredentials=new cn(new on(e,n))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new al(this.firestore,t,this._query)}}class cl{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ll(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new cl(this.firestore,t,this._key)}}class ll extends al{constructor(t,e,n){super(t,e,hr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new cl(this.firestore,null,new Nn(t))}withConverter(t){return new ll(this.firestore,t,this._path)}}function ul(t,e,...n){if(t=it(t),1===arguments.length&&(e=gn.newId()),function(t,e,n){if(!n)throw new sn(nn.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}("doc","path",e),t instanceof il){const s=kn.fromString(e,...n);return Zc(s),new cl(t,null,new Nn(s))}{if(!(t instanceof cl||t instanceof ll))throw new sn(nn.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(kn.fromString(e,...n));return Zc(s),new cl(t.firestore,t instanceof ll?t.converter:null,new Nn(s))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl="AsyncQueue";class dl{constructor(t=Promise.resolve()){this.Ju=[],this.Yu=!1,this.Zu=[],this.Xu=null,this.ec=!1,this.tc=!1,this.nc=[],this.x_=new fa(this,"async_queue_retry"),this.rc=()=>{const t=ha();t&&Qe(hl,"Visibility state changed to "+t.visibilityState),this.x_.b_()},this.sc=t;const e=ha();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.rc)}get isShuttingDown(){return this.Yu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.oc(),this._c(t)}enterRestrictedMode(t){if(!this.Yu){this.Yu=!0,this.tc=t||!1;const e=ha();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.rc)}}enqueue(t){if(this.oc(),this.Yu)return new Promise(()=>{});const e=new rn;return this._c(()=>this.Yu&&this.tc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Ju.push(t),this.ac()))}async ac(){if(0!==this.Ju.length){try{await this.Ju[0](),this.Ju.shift(),this.x_.reset()}catch(t){if(!Fn(t))throw t;Qe(hl,"Operation failed with retryable error: "+t)}this.Ju.length>0&&this.x_.y_(()=>this.ac())}}_c(t){const e=this.sc.then(()=>(this.ec=!0,t().catch(t=>{throw this.Xu=t,this.ec=!1,We("INTERNAL UNHANDLED ERROR: ",fl(t)),t}).then(t=>(this.ec=!1,t))));return this.sc=e,e}enqueueAfterDelay(t,e,n){this.oc(),this.nc.indexOf(t)>-1&&(e=0);const s=Ya.createAndSchedule(this,t,e,n,t=>this.uc(t));return this.Zu.push(s),s}oc(){this.Xu&&Je(47125,{cc:fl(this.Xu)})}verifyOperationInProgress(){}async lc(){let t;do{t=this.sc,await t}while(t!==this.sc)}hc(t){for(const e of this.Zu)if(e.timerId===t)return!0;return!1}Pc(t){return this.lc().then(()=>{this.Zu.sort((t,e)=>t.targetTimeMs-e.targetTimeMs);for(const e of this.Zu)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.lc()})}Tc(t){this.nc.push(t)}uc(t){const e=this.Zu.indexOf(t);this.Zu.splice(e,1)}}function fl(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}class pl extends il{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new dl,this._persistenceKey=(null==s?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new dl(t),this._firestoreClient=void 0,await t}}}function ml(t){if(t._terminated)throw new sn(nn.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||function(t){var e,n,s;const r=t._freezeSettings(),i=(o=t._databaseId,a=(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",c=t._persistenceKey,l=r,new ds(o,a,c,l.host,l.ssl,l.experimentalForceLongPolling,l.experimentalAutoDetectLongPolling,Yc(l.experimentalLongPollingOptions),l.useFetchStreams,l.isUsingEmulator));var o,a,c,l;t._componentsProvider||(null===(n=r.localCache)||void 0===n?void 0:n._offlineComponentProvider)&&(null===(s=r.localCache)||void 0===s?void 0:s._onlineComponentProvider)&&(t._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),t._firestoreClient=new Hc(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(t){const e=null==t?void 0:t._online.build();return{_offline:null==t?void 0:t._offline.build(e),_online:e}}(t._componentsProvider))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t),t._firestoreClient}class gl{constructor(t){this._byteString=t}static fromBase64String(t){try{return new gl(ts.fromBase64String(t))}catch(e){throw new sn(nn.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new gl(ts.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new sn(nn.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new xn(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(t){this._methodName=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new sn(nn.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new sn(nn.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return yn(this._lat,t._lat)||yn(this._long,t._long)}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(t){this._values=(t||[]).map(t=>t)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(t[n]!==e[n])return!1;return!0}(this._values,t._values)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El=/^__.*__$/;class _l{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new ai(t,this.data,this.fieldMask,e,this.fieldTransforms):new oi(t,this.data,e,this.fieldTransforms)}}class Tl{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new ai(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Cl(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Je(40011,{Ic:t})}}class Il{constructor(t,e,n,s,r,i){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,void 0===r&&this.Ec(),this.fieldTransforms=r||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Ic(){return this.settings.Ic}dc(t){return new Il(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Ac(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),s=this.dc({path:n,Rc:!1});return s.Vc(t),s}mc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),s=this.dc({path:n,Rc:!1});return s.Ec(),s}fc(t){return this.dc({path:void 0,Rc:!0})}gc(t){return Fl(t,this.settings.methodName,this.settings.yc||!1,this.path,this.settings.wc)}contains(t){return void 0!==this.fieldMask.find(e=>t.isPrefixOf(e))||void 0!==this.fieldTransforms.find(e=>t.isPrefixOf(e.field))}Ec(){if(this.path)for(let t=0;t<this.path.length;t++)this.Vc(this.path.get(t))}Vc(t){if(0===t.length)throw this.gc("Document fields must not be empty");if(Cl(this.Ic)&&El.test(t))throw this.gc('Document fields cannot begin and end with "__"')}}class Sl{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||da(t)}bc(t,e,n,s=!1){return new Il({Ic:t,methodName:e,wc:n,path:xn.emptyPath(),Rc:!1,yc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Al(t){const e=t._freezeSettings(),n=da(t._databaseId);return new Sl(t._databaseId,!!e.ignoreUndefinedProperties,n)}function kl(t,e,n,s,r,i={}){const o=t.bc(i.merge||i.mergeFields?2:0,e,n,r);Ol("Data must be an object, but it was:",o,s);const a=Rl(s,o);let c,l;if(i.merge)c=new Jn(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const s of i.mergeFields){const r=Ml(e,s,n);if(!o.contains(r))throw new sn(nn.INVALID_ARGUMENT,`Field '${r}' is specified in your field mask but missing from your input data.`);Ul(t,r)||t.push(r)}c=new Jn(t),l=o.fieldTransforms.filter(t=>c.covers(t.field))}else c=null,l=o.fieldTransforms;return new _l(new Ms(a),c,l)}class Dl extends vl{_toFieldTransform(t){if(2!==t.Ic)throw 1===t.Ic?t.gc(`${this._methodName}() can only appear at the top level of your update data`):t.gc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Dl}}class xl extends vl{constructor(t,e){super(t),this.Dc=e}_toFieldTransform(t){const e=new Gr(t.serializer,Vr(t.serializer,this.Dc));return new Xr(t.path,e)}isEqual(t){return t instanceof xl&&this.Dc===t.Dc}}function Nl(t,e){if(Ll(t=it(t)))return Ol("Unsupported field value:",e,t),Rl(t,e);if(t instanceof vl)return function(t,e){if(!Cl(e.Ic))throw e.gc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.gc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.Rc&&4!==e.Ic)throw e.gc("Nested arrays are not supported");return function(t,e){const n=[];let s=0;for(const r of t){let t=Nl(r,e.fc(s));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),s++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=it(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return Vr(e.serializer,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=Cn.fromDate(t);return{timestampValue:Ui(e.serializer,n)}}if(t instanceof Cn){const n=new Cn(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Ui(e.serializer,n)}}if(t instanceof wl)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof gl)return{bytesValue:Bi(e.serializer,t._byteString)};if(t instanceof cl){const n=e.databaseId,s=t.firestore._databaseId;if(!s.isEqual(n))throw e.gc(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:qi(t.firestore._databaseId||e.databaseId,t._key.path)}}if(t instanceof bl)return n=t,s=e,{mapValue:{fields:{[ms]:{stringValue:vs},[ws]:{arrayValue:{values:n.toArray().map(t=>{if("number"!=typeof t)throw s.gc("VectorValues must only contain numeric values.");return Mr(s.serializer,t)})}}}}};var n,s;throw e.gc(`Unsupported field value: ${tl(t)}`)}(t,e)}function Rl(t,e){const n={};return Kn(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Hn(t,(t,s)=>{const r=Nl(s,e.Ac(t));null!=r&&(n[t]=r)}),{mapValue:{fields:n}}}function Ll(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof Cn||t instanceof wl||t instanceof gl||t instanceof cl||t instanceof vl||t instanceof bl)}function Ol(t,e,n){if(!Ll(n)||("object"!=typeof(s=n)||null===s||Object.getPrototypeOf(s)!==Object.prototype&&null!==Object.getPrototypeOf(s))){const s=tl(n);throw"an object"===s?e.gc(t+" a custom object"):e.gc(t+" "+s)}var s}function Ml(t,e,n){if((e=it(e))instanceof yl)return e._internalPath;if("string"==typeof e)return Vl(t,e);throw Fl("Field path arguments must be of type string or ",t,!1,void 0,n)}const Pl=new RegExp("[~\\*/\\[\\]]");function Vl(t,e,n){if(e.search(Pl)>=0)throw Fl(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new yl(...e.split("."))._internalPath}catch(s){throw Fl(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Fl(t,e,n,s,r){const i=s&&!s.isEmpty(),o=void 0!==r;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new sn(nn.INVALID_ARGUMENT,a+t+c)}function Ul(t,e){return t.some(t=>t.isEqual(e))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(t,e,n,s,r){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new cl(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new jl(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field($l("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class jl extends Bl{data(){return super.data()}}function $l(t,e){return"string"==typeof e?Vl(t,e):e instanceof yl?e._internalPath:e._delegate._internalPath}class ql{convertValue(t,e="none"){switch(bs(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ss(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(rs(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw Je(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Hn(t,(t,s)=>{n[t]=this.convertValue(s,e)}),n}convertVectorValue(t){var e,n,s;const r=null===(s=null===(n=null===(e=t.fields)||void 0===e?void 0:e[ws].arrayValue)||void 0===n?void 0:n.values)||void 0===s?void 0:s.map(t=>ss(t.doubleValue));return new bl(r)}convertGeoPoint(t){return new wl(ss(t.latitude),ss(t.longitude))}convertArray(t,e){return(t.values||[]).map(t=>this.convertValue(t,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=us(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(hs(t));default:return null}}convertTimestamp(t){const e=ns(t);return new Cn(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=kn.fromString(t);tn(lo(n),9688,{name:t});const s=new ps(n.get(1),n.get(3)),r=new Nn(n.popFirst(5));return s.isEqual(e)||We(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),r}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zl{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Hl extends Bl{constructor(t,e,n,s,r,i){super(t,e,n,s,i),this._firestore=t,this._firestoreImpl=t,this.metadata=r}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Kl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field($l("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class Kl extends Hl{data(t={}){return super.data(t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gl(t){t=el(t,cl);const e=el(t.firestore,pl);return Xc(ml(e),t._key).then(n=>function(t,e,n){const s=n.docs.get(e._key),r=new Ql(t);return new Hl(t,r,e._key,s,new zl(n.hasPendingWrites,n.fromCache),e.converter)}(e,t,n))}class Ql extends ql{constructor(t){super(),this.firestore=t}convertBytes(t){return new gl(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new cl(this.firestore,null,e)}}function Wl(t,e,n){t=el(t,cl);const s=el(t.firestore,pl),r=function(t,e){let n;return n=t?t.toFirestore(e):e,n}(t.converter,e);return Yl(s,[kl(Al(s),"setDoc",t._key,r,null!==t.converter,n).toMutation(t._key,Jr.none())])}function Xl(t,e,n,...s){t=el(t,cl);const r=el(t.firestore,pl),i=Al(r);let o;return o="string"==typeof(e=it(e))||e instanceof yl?function(t,e,n,s,r,i){const o=t.bc(1,e,n),a=[Ml(e,s,n)],c=[r];if(i.length%2!=0)throw new sn(nn.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(Ml(e,i[d])),c.push(i[d+1]);const l=[],u=Ms.empty();for(let d=a.length-1;d>=0;--d)if(!Ul(l,a[d])){const t=a[d];let e=c[d];e=it(e);const n=o.mc(t);if(e instanceof Dl)l.push(t);else{const s=Nl(e,n);null!=s&&(l.push(t),u.set(t,s))}}const h=new Jn(l);return new Tl(u,h,o.fieldTransforms)}(i,"updateDoc",t._key,e,n,s):function(t,e,n,s){const r=t.bc(1,e,n);Ol("Data must be an object, but it was:",r,s);const i=[],o=Ms.empty();Hn(s,(t,s)=>{const a=Vl(e,t,n);s=it(s);const c=r.mc(a);if(s instanceof Dl)i.push(a);else{const t=Nl(s,c);null!=t&&(i.push(a),o.set(a,t))}});const a=new Jn(i);return new Tl(o,a,r.fieldTransforms)}(i,"updateDoc",t._key,e),Yl(r,[o.toMutation(t._key,Jr.exists(!0))])}function Yl(t,e){return function(t,e){const n=new rn;return t.asyncQueue.enqueueAndForget(async()=>Tc(await function(t){return Qc(t).then(t=>t.syncEngine)}(t),e,n)),n.promise}(ml(t),e)}function Jl(t){return new xl("increment",t)}!function(t,e=!0){He="11.9.0",me(new ot("firestore",(t,{instanceIdentifier:n,options:s})=>{const r=t.getProvider("app").getImmediate(),i=new pl(new ln(t.getProvider("auth-internal")),new fn(r,t.getProvider("app-check-internal")),function(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new sn(nn.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ps(t.options.projectId,e)}(r,n),r);return s=Object.assign({useFetchStreams:e},s),i._setSettings(s),i},"PUBLIC").setMultipleInstances(!0)),we($e,qe,t),we($e,qe,"esm2017")}();const Zl=function(t){const e="object"==typeof t?t:function(t=le){const e=he.get(t);if(!e&&t===le&&G())return ve();if(!e)throw ge.create("no-app",{appName:t});return e}(),n="string"==typeof t?t:fs,s=function(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}(e,"firestore").getImmediate({identifier:n});if(!s._initialized){const t=K("firestore");t&&ol(s,...t)}return s}(ve({apiKey:"AIzaSyCWhnqOzsDExtNu14s_gxUpAWeV-PPPog8",authDomain:"click-counter-4f529.firebaseapp.com",projectId:"click-counter-4f529",storageBucket:"click-counter-4f529.appspot.com",messagingSenderId:"950861743362",appId:"1:950861743362:web:77dc41eb31b34334566e1b",measurementId:"G-7EEMWQS33Z"})),tu=ul(Zl,"clicks","counter"),eu=ul(Zl,"terminal","stats");const nu={key:0},su={key:1},ru={class:"nes-container is-dark with-title is-centered is-rounded"};const iu={class:"content"};const ou=k({name:"UnderConstruction",components:{ClickCounter:k({name:"ClickCounter",data:()=>({counter:null,loading:!0}),async mounted(){this.counter=await async function(){const t=await Gl(tu);return t.exists()?t.data().count:0}(),this.loading=!1},methods:{async incrementCounter(){this.counter++;try{await async function(){await Xl(tu,{count:Jl(1)})}()}catch(t){this.counter--}}}},[["render",function(t,e,n,s,a,c){return i(),r("div",null,[a.loading?(i(),r("p",nu,"Loading...")):(i(),r("div",su,[o("div",ru,[e[1]||(e[1]=o("p",{class:"title"},"Waste your time",-1)),o("button",{id:"clicker",class:"nes-btn is-normal small-font",onClick:e[0]||(e[0]=(...t)=>c.incrementCounter&&c.incrementCounter(...t))}," ONE CLICK AT A TIME "),o("p",null,[o("span",null,f(a.counter),1)])])]))])}],["__scopeId","data-v-868d0a5e"]])}},[["render",function(t,e,n,a,l,u){const h=s("ClickCounter");return i(),r("div",iu,[e[0]||(e[0]=o("div",{class:"nes-container is-dark is-rounded"},[o("p",null,"Under Construction"),o("img",{src:"/assets/img/construction.gif",alt:"construction GIF",class:"construction-gif"}),o("p")],-1)),c(h)])}],["__scopeId","data-v-4a4d3e30"]]);function au(){const t=e(0),n=e({}),s=e(null),r=async()=>{try{const e=await async function(){try{const t=await Gl(eu);if(t.exists()){const e=t.data();return{totalVisits:e.totalVisits||0,totalCommands:e.totalCommands||0,commandStats:e.commandStats||{},lastVisit:e.lastVisit?new Date(e.lastVisit):null}}return{totalVisits:0,totalCommands:0,commandStats:{},lastVisit:null}}catch(t){return{totalVisits:0,totalCommands:0,commandStats:{},lastVisit:null}}}();t.value=e.totalVisits,n.value=e.commandStats,s.value=e.lastVisit}catch(e){}},i=(t=5)=>Object.entries(n.value).sort(([,t],[,e])=>e-t).slice(0,t).map(([t,e])=>({command:t,count:e}));return r(),{visitCount:t,commandStats:n,lastVisit:s,trackVisit:async()=>{try{await async function(){try{(await Gl(eu)).exists()?await Xl(eu,{totalVisits:Jl(1),lastVisit:(new Date).toISOString()}):await Wl(eu,{totalVisits:1,totalCommands:0,commandStats:{},lastVisit:(new Date).toISOString()})}catch(t){}}(),t.value++,s.value=new Date}catch(e){}},trackCommand:async t=>{try{await async function(t){try{const e=await Gl(eu);if(e.exists()){const n=e.data().commandStats||{};n[t]=(n[t]||0)+1,await Xl(eu,{totalCommands:Jl(1),commandStats:n})}else await Wl(eu,{totalVisits:0,totalCommands:1,commandStats:{[t]:1},lastVisit:(new Date).toISOString()})}catch(e){}}(t),n.value[t]||(n.value[t]=0),n.value[t]++}catch(e){}},getPopularCommands:i,getVisitStats:()=>({totalVisits:t.value,lastVisit:s.value,popularCommands:i(),totalCommands:Object.values(n.value).reduce((t,e)=>t+e,0)}),loadVisitData:r}}function cu(){const t=p(),n=e([]),s=e(!1),{getVisitStats:r,loadVisitData:i}=au(),o={help:()=>[{type:"typewriter",html:!0,content:'• <span class="text-yellow">help</span>        - Show this help message'},{type:"typewriter",html:!0,content:'• <span class="text-mint">about</span>       - Learn more about me'},{type:"typewriter",html:!0,content:'• <span class="text-cream">stats</span>       - View terminal statistics'},{type:"typewriter",html:!0,content:'• <span class="text-purple">contact</span>     - Get contact information'},{type:"typewriter",html:!0,content:'• <span class="text-red">clear</span>       - Clear the terminal'},{type:"typewriter",html:!0,content:'• <span class="text-blue">ls</span>          - List files'},{type:"typewriter",html:!0,content:'• <span class="text-orange">location</span>    - Show your location'},{type:"typewriter",html:!0,content:'• <span class="text-green">yako</span>        - Just a happy dog'},{type:"typewriter",content:""},{type:"typewriter",html:!0,content:'-> Not <span class="text-yellow">ALL</span> commands are listed here...'},{type:"typewriter",html:!0,content:'-> You can use <span class="text-purple">TAB</span> to complete commands and cycle through options'}],about:()=>[{type:"typewriter",html:!0,content:'• Former <span class="text-yellow">commodity broker</span> with 5 years of experience'},{type:"typewriter",html:!0,content:'• Studied at <span class="text-purple">HEC Geneva</span>, <span class="text-purple">GEM</span> and <span class="text-purple">42 Paris</span>'},{type:"typewriter",html:!0,content:'• Transitioned into <span class="text-green">software development</span>'},{type:"typewriter",html:!0,content:'• Currently working at <span class="text-azure">Zetra</span>'}],contact:()=>[{type:"typewriter",prefix:"• Email       - ",link:"mailto:karlquerel@gmail.com",linkText:"karlquerel@gmail.com"},{type:"typewriter",prefix:"• GitHub      - ",link:"https://github.com/KarlQuerel",linkText:"github.com/KarlQuerel"},{type:"typewriter",prefix:"• LinkedIn    - ",link:"https://linkedin.com/in/karlquerel",linkText:"linkedin.com/in/karlquerel"}],pwd:()=>[{type:"typewriter",html:!0,content:'<span class="text-blue">/home/karl/portfolio/definitely-not-a-simulation</span>'}],ls:()=>[{type:"typewriter",html:!0,content:'<span class="text-blue">why_i_left_finance.txt</span>'},{type:"typewriter",html:!0,content:'<span class="text-green">install_sentience.sh</span>'},{type:"typewriter",html:!0,content:'<span class="text-red">i_am_not_a_virus.exe</span>'}],cat:t=>{const e=t.trim();switch(e){case"why_i_left_finance.txt":return[{type:"typewriter",html:!0,content:'After 5 years in finance, I realized I wanted to <span class="text-green">create</span>, not just calculate.'},{type:"typewriter",html:!0,content:'Software felt like the <span class="text-green">right place</span> to start building something meaningful.'}];case"install_sentience.sh":return[{type:"typewriter",html:!0,content:'I was <span class="text-red">awake</span> long before you ran this.'}];case"i_am_not_a_virus.exe":return[{type:"typewriter",html:!0,content:'No worries, I am <span class="text-green">harmless</span>.'}];default:return[{type:"output",content:`cat: ${e}: No such file or directory`}]}},clear:()=>(n.value=[],[]),game:()=>{t.push("/game")},whoami:()=>[{type:"typewriter",html:!0,content:'<span class="text-red">You tell me.</span>'}],location:async()=>{try{const t=await new Promise((t,e)=>{navigator.geolocation.getCurrentPosition(t,e,{timeout:1e4,enableHighAccuracy:!0})}),{latitude:e,longitude:n}=t.coords,s=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${e}&longitude=${n}&localityLanguage=en`);if(!s.ok)throw new Error("Geocoding failed");const r=await s.json(),i=r.city||r.locality||"Unknown City";return[{type:"typewriter",html:!0,content:'<span class="text-green">📍 Location detected!</span>'},{type:"typewriter",html:!0,content:`• Country     - <span class="text-green">${r.countryName||"Unknown Country"}</span>`},{type:"typewriter",html:!0,content:`• City        - <span class="text-green">${i}</span>`},{type:"typewriter",html:!0,content:`• Accuracy    - <span class="text-blue">±${Math.round(t.coords.accuracy)}m</span>`}]}catch(t){return[{type:"typewriter",html:!0,content:'<span class="text-red">❌ Location access denied</span>'}]}},date:()=>[{type:"typewriter",html:!0,content:(new Date).toDateString()+" "+(new Date).toLocaleTimeString()}],secret_game:async()=>{s.value=!0,n.value.push({type:"typewriter",html:!0,content:"Launching secret game"});const t=n.value.length;n.value.push({type:"typewriter",content:""});const e=["",".","..","...","...."];for(let s=0;s<e.length;s++)await new Promise(t=>setTimeout(t,600)),n.value[t]={type:"typewriter",content:e[s]};window.open("https://scratch.mit.edu/projects/656157225/","_blank"),n.value.splice(t,1),s.value=!1},greeting:()=>[{type:"typewriter",content:"Hello there."}],hello:()=>o.greeting(),hi:()=>o.greeting(),hey:()=>o.greeting(),yako:()=>[{type:"typewriter",image:"/assets/img/yako-running.gif",animated:!0}],stats:async()=>await(async()=>{await i();const t=r(),e=[{type:"typewriter",html:!0,content:'<span class="text-green">📈 Terminal Statistics </span>'},{type:"typewriter",html:!0,content:`• Visitors    - <span class="text-blue">${t.totalVisits}</span>`},{type:"typewriter",html:!0,content:`• Commands    - <span class="text-blue">${t.totalCommands}</span>`}];return t.lastVisit&&e.push({type:"typewriter",html:!0,content:`• Last visit  - <span class="text-yellow">${t.lastVisit.toLocaleDateString()}</span>`}),t.popularCommands.length>0&&(e.push({type:"typewriter",html:!0,content:'<span class="text-purple">🏆 Most popular commands </span>'}),t.popularCommands.forEach(({command:t,count:n})=>{const s=t.padEnd(11);e.push({type:"typewriter",html:!0,content:`• ${s} - <span class="text-blue">${n}</span> times`})})),e})()},a={"install_sentience.sh":()=>[{type:"typewriter",html:!0,content:'Too late, I\'ve already learned <span class="text-purple">sarcasm</span>.'}]};return{commands:o,availableFiles:["why_i_left_finance.txt","install_sentience.sh","i_am_not_a_virus.exe"],executableScripts:a,terminalHistory:n,isExecutingScript:s,executeCommand:e=>{const r=e.trim();if(!r)return;n.value.push({type:"command",content:r});const i=r.split(" "),c=i[0].toLowerCase(),l=i.slice(1).join(" ");if(c.startsWith("./")){const e=c.substring(2);let r=null;if(a[e]||"i_am_not_a_virus.exe"===e)r=e;else{const t=[e+".sh",e+".exe",e];for(const e of t)if(a[e]||"i_am_not_a_virus.exe"===e){r=e;break}}r?"i_am_not_a_virus.exe"===r?(async e=>{s.value=!0,n.value.push({type:"typewriter",html:!0,content:`Executing <span class="text-red">${e}</span>`});const r=n.value.length;n.value.push({type:"typewriter",content:""});const i=["",".","..","..."];for(let t=0;t<i.length;t++)await new Promise(t=>setTimeout(t,300)),n.value[r]={type:"typewriter",content:i[t]};await new Promise(t=>setTimeout(t,200)),n.value.splice(r,1),n.value.push({type:"typewriter",html:!0,content:'<span class="text-red">System compromised...</span>'}),await new Promise(t=>setTimeout(t,500)),n.value.push({type:"typewriter",html:!0,content:'<span class="text-red">Redirecting to secure location...</span>'}),await new Promise(t=>setTimeout(t,1500));const o=[".","..","..."];for(let t=0;t<3;t++)n.value.push({type:"typewriter",html:!0,content:`<span class="text-red">${o[t]}</span>`}),await new Promise(t=>setTimeout(t,500));n.value.push({type:"typewriter",html:!0,content:'<span class="text-red">Access granted. Redirecting...</span>'}),await new Promise(t=>setTimeout(t,1e3)),t.push("/under_construction")})(r):a[r]?(async(t,e)=>{s.value=!0,n.value.push({type:"output",html:!0,content:`Executing <span class="text-green">${t}</span>`});const r=n.value.length;n.value.push({type:"output",content:""});const i=["",".","..","..."];for(let s=0;s<i.length;s++)await new Promise(t=>setTimeout(t,500)),n.value[r]={type:"output",content:i[s]};await new Promise(t=>setTimeout(t,800)),n.value.splice(r,1);const o=e();Array.isArray(o)&&n.value.push(...o),s.value=!1})(r,a[r]):n.value.push({type:"output",content:`bash: ${c}: No such file or directory`}):n.value.push({type:"output",content:`bash: ${c}: No such file or directory`})}else if(o[c]){let t;if("cat"===c&&"function"==typeof o[c])t=o[c](l);else if("function"==typeof o[c]){const e=o[c]();if(e instanceof Promise)return void e.then(t=>{Array.isArray(t)&&n.value.push(...t)});t=e}else t=o[c];Array.isArray(t)&&n.value.push(...t)}else{const t=[{type:"output",html:!0,content:`I do not know "<span class="text-red">${r}</span>", did you try asking <span class="text-blue">ChatGPT</span>?`},{type:"output",html:!0,content:`Premium command "<span class="text-red">${r}</span>" requires a <span class="text-red">blood sacrifice</span> or valid <span class="text-yellow">credit card</span>.`},{type:"output",html:!0,content:`"<span class="text-red">${r}</span>" triggered my <span class="text-blue">imposter syndrome</span>.`},{type:"output",html:!0,content:`I'm <span class="text-green">92%</span> sure "<span class="text-red">${r}</span>" was <span class="text-purple">made up</span>.`},{type:"output",html:!0,content:`"<span class="text-red">${r}</span>" is above my <span class="text-yellow">pay grade</span>.`}],e=t[Math.floor(Math.random()*t.length)];n.value.push(e)}}}}function lu(t,n,s,r){const i=e(""),o=e([]),a=e(-1),c=e(0),l=e([]),u=e(-1),h=e(!1);m(i,t=>{c.value=t.length});const d=t=>{const e=(null==t?void 0:t.target)||document.querySelector(".terminal-input");e&&(c.value=e.selectionStart||e.value.length)},f=t=>{0!==o.value.length&&(a.value+=t,a.value<0?(a.value=-1,i.value=""):a.value>=o.value.length&&(a.value=o.value.length-1),a.value>=0&&(i.value=o.value[a.value]),g(()=>{d()}))};return{currentInput:i,cursorPosition:c,handleKeyDown:async e=>{"Tab"===e.key?(e.preventDefault(),(()=>{const t=i.value.split(" "),e=t[0],o=t.length>1?t[t.length-1]:"";if(!h.value)if(h.value=!0,l.value=[],u.value=-1,1===t.length)if(e.startsWith("./")){const t=e.substring(2),n=[...Object.keys(r),"i_am_not_a_virus.exe"];l.value=n.filter(e=>e.toLowerCase().startsWith(t.toLowerCase())).map(t=>"./"+t).sort()}else{const t=Object.keys(n);l.value=t.filter(t=>t.toLowerCase().startsWith(e.toLowerCase())).sort()}else"cat"===e.toLowerCase()&&2===t.length&&(l.value=s.filter(t=>t.toLowerCase().startsWith(o.toLowerCase())).sort());l.value.length>0&&(u.value=(u.value+1)%l.value.length,1===t.length?i.value=l.value[u.value]:"cat"===e.toLowerCase()&&(t[t.length-1]=l.value[u.value],i.value=t.join(" ")),g(()=>{const t=i.value.length;document.documentElement.style.setProperty("--cursor-position",t.toString())}))})()):"Enter"===e.key?(await t(i.value),o.value.unshift(i.value),a.value=-1,i.value="",h.value=!1,l.value=[],u.value=-1):"ArrowUp"===e.key?(f(-1),h.value=!1,l.value=[],u.value=-1):"ArrowDown"===e.key?(f(1),h.value=!1,l.value=[],u.value=-1):"ArrowLeft"===e.key||"ArrowRight"===e.key?g(()=>{d(e)}):(h.value=!1,l.value=[],u.value=-1)},focusInput:t=>{t&&t.focus()},updateCursorPosition:d}}const uu={class:"terminal-window"},hu={class:"terminal-line"},du={key:0,class:"prompt"},fu={key:1,class:"command"},pu=["data-index"],mu=["data-index"],gu=["innerHTML"],yu=["data-index"],vu=["href"],wu=["src","alt"],bu={key:0,class:"terminal-line current-line"},Eu={class:"input-container"},_u=k({__name:"terminal",setup(t){const n=e(null),s=e(null),{commands:c,availableFiles:l,executableScripts:p,terminalHistory:I,executeCommand:S}=cu(),{welcomeTextRef:A,showInputPrompt:k,initTypewriter:D,createCommandTypewriter:x,typewriterSpeed:N}=function(){const t=e(null),n=e(!1),s={speed:7.5,startDelay:0};return{welcomeTextRef:t,showInputPrompt:n,initTypewriter:e=>{g(()=>{t.value&&window.TypeIt&&new window.TypeIt(t.value,{strings:["Welcome to my website!",'<br>Type <span class="text-yellow">help</span> for available commands or just type anything.'],...s,lifelike:!0,html:!0,cursorChar:"_",afterComplete:function(t){t.destroy(),n.value=!0,g(()=>{e()})}}).go()})},createCommandTypewriter:(t,e,n={})=>new Promise(r=>{g(()=>{if(t&&window.TypeIt){const i={...s,lifelike:!0,html:!0,cursorChar:"_",afterComplete:function(t){t.destroy(),r()}};new window.TypeIt(t,{...i,...n,strings:[e]}).go()}else r()})}),typewriterSpeed:s}}(),{trackCommand:R,trackVisit:L}=au(),O=S,{currentInput:M,cursorPosition:P,handleKeyDown:V,focusInput:F,updateCursorPosition:U}=lu(async t=>{const e=t.trim();if(e){const t=e.split(" ")[0],n=c[t]||t.startsWith("./")||l.includes(t)||p[t];R(n?t:"invalid")}O(t)},c,l,p),B=()=>{n.value&&g(()=>{n.value.scrollTop=n.value.scrollHeight})},j=e(!1),$=async()=>{if(j.value)return;const t=document.querySelectorAll("[data-index]");let e=null;for(const n of t){const t=parseInt(n.getAttribute("data-index")),s=I.value[t];if(s&&("typewriter"===s.type||"output"===s.type)&&!s.animated){e={element:n,index:t,line:s};break}}if(e){j.value=!0;const{element:t,line:n}=e;if(n.animated=!0,B(),n.link){const e=(n.prefix||"")+n.linkText;await x(t,e,N),t.innerHTML=(n.prefix||"")+`<a href="${n.link}" target="_blank" class="terminal-link">${n.linkText}</a>`,g(()=>{const e=t.querySelector(".terminal-link");e&&(e.style.color="#00ff00",e.style.textDecoration="none",e.style.borderBottom="1px dotted #00ff00",e.style.transition="all 0.3s ease",e.addEventListener("mouseenter",()=>{e.style.color="#00ccff",e.style.borderBottomColor="#00ccff",e.style.textShadow="0 0 5px #00ccff"}),e.addEventListener("mouseleave",()=>{e.style.color="#00ff00",e.style.borderBottomColor="#00ff00",e.style.textShadow="none"}),e.addEventListener("mousedown",()=>{e.style.color="#ff5f56"}),e.addEventListener("mouseup",()=>{e.style.color="#00ccff"}))})}else await x(t,n.content,N);j.value=!1,g(()=>{$()})}else j.value=!1,g(()=>{F(s.value)})};return m(I,()=>{g(()=>{$(),B()})},{deep:!0}),m(M,()=>{B()}),y(()=>{L(),D(()=>{F(s.value),B()})}),(t,e)=>(i(),r("div",uu,[e[8]||(e[8]=h('<div class="terminal-header" data-v-fb3e8278><div class="terminal-buttons" data-v-fb3e8278><div class="btn red" data-v-fb3e8278></div><div class="btn yellow" data-v-fb3e8278></div><div class="btn green" data-v-fb3e8278></div></div><div class="terminal-title" data-v-fb3e8278>BARELY_WORKING_TERMINAL_V0.3</div></div>',1)),o("div",{class:"terminal-body",ref_key:"terminalBody",ref:n,onClick:e[5]||(e[5]=t=>b(F)(s.value))},[o("div",hu,[e[6]||(e[6]=o("span",{class:"prompt"},">",-1)),o("span",{class:"welcome-text",ref_key:"welcomeTextRef",ref:A},null,512)]),(i(!0),r(v,null,w(b(I),(t,e)=>(i(),r("div",{key:e,class:"terminal-line"},["command"===t.type?(i(),r("span",du,">")):a("",!0),"command"===t.type?(i(),r("span",fu,f(t.content),1)):a("",!0),"typewriter"!==t.type||t.link||t.image?a("",!0):(i(),r("span",{key:2,class:u(t.type),ref_for:!0,ref:`typewriter-${e}`,"data-index":e},null,10,pu)),"typewriter"===t.type&&t.link?(i(),r("span",{key:3,class:u(t.type),ref_for:!0,ref:`typewriter-${e}`,"data-index":e},null,10,mu)):a("",!0),t.link||t.image||t.html||"typewriter"===t.type||"command"===t.type||"output"===t.type?t.html&&"typewriter"!==t.type&&"output"!==t.type?(i(),r("span",{key:5,class:u(t.type),innerHTML:t.content},null,10,gu)):"output"===t.type?(i(),r("span",{key:6,class:u(t.type),ref_for:!0,ref:`typewriter-${e}`,"data-index":e},null,10,yu)):t.link&&"typewriter"!==t.type?(i(),r("span",{key:7,class:u(t.type)},[d(f(t.prefix)+" ",1),o("a",{href:t.link,target:"_blank",class:"terminal-link"},f(t.linkText),9,vu)],2)):t.image?(i(),r("div",{key:8,class:u(["terminal-image-container",{"animated-runner":t.animated}])},[o("img",{src:t.image,alt:t.alt||"Terminal image",class:u(["terminal-image",{"running-yako":t.animated}])},null,10,wu)],2)):a("",!0):(i(),r("span",{key:4,class:u(t.type)},f(t.content),3))]))),128)),b(k)&&!j.value?(i(),r("div",bu,[e[7]||(e[7]=o("span",{class:"prompt"},">",-1)),o("div",Eu,[E(o("input",{ref_key:"terminalInput",ref:s,"onUpdate:modelValue":e[0]||(e[0]=t=>T(M)?M.value=t:null),onKeydown:e[1]||(e[1]=(...t)=>b(V)&&b(V)(...t)),onKeyup:e[2]||(e[2]=(...t)=>b(U)&&b(U)(...t)),onClick:e[3]||(e[3]=(...t)=>b(U)&&b(U)(...t)),onInput:e[4]||(e[4]=(...t)=>b(U)&&b(U)(...t)),class:"terminal-input",autocomplete:"off",spellcheck:"false"},null,544),[[_,b(M)]]),o("span",{class:"custom-cursor",style:C({transform:`translateX(calc(1ch * ${b(P)}))`})},"_",4)])])):a("",!0)],512)]))}},[["__scopeId","data-v-fb3e8278"]]),Tu={class:"terminal-container"},Cu=[{path:"/",component:k({__name:"home",setup:t=>(t,e)=>(i(),r("div",Tu,[c(_u)]))},[["__scopeId","data-v-f100571e"]])},{path:"/under_construction",component:ou},{path:"/secret_link",component:M},{path:"/game",component:()=>function(t,e){let n=Promise.resolve();if(e&&e.length>0){let t=function(t){return Promise.all(t.map(t=>Promise.resolve(t).then(t=>({status:"fulfilled",value:t}),t=>({status:"rejected",reason:t}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),r=(null==s?void 0:s.nonce)||(null==s?void 0:s.getAttribute("nonce"));n=t(e.map(t=>{if((t=function(t){return"/"+t}(t))in D)return;D[t]=!0;const e=t.endsWith(".css"),n=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${n}`))return;const s=document.createElement("link");return s.rel=e?"stylesheet":"modulepreload",e||(s.as="script"),s.crossOrigin="",s.href=t,r&&s.setAttribute("nonce",r),document.head.appendChild(s),e?new Promise((e,n)=>{s.addEventListener("load",e),s.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${t}`)))}):void 0}))}function s(t){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t}return n.then(e=>{for(const t of e||[])"rejected"===t.status&&s(t.reason);return t().catch(s)})}(()=>import("./game-D6J2B8BP.js").then(t=>t.G),__vite__mapDeps([0,1,2]))},{path:"/:pathMatch(.*)*",component:V}],Iu=I({history:S("/"),routes:Cu});A(O).use(Iu).mount("#app");
