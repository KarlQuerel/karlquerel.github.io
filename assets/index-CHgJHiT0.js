const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/pixelTransition-DCnRY8xR.js","assets/vendor-BVer9QHr.js","assets/game-BrEHgKzf.js","assets/game-BVAnjPlV.css","assets/pixelTransition-DNZrZfa3.css","assets/styles-DI8uVRxW.css","assets/home-Bs-htu3r.js","assets/home-DTpQWr7h.css","assets/Contact-BwNEUtbL.js","assets/Contact-lvPCUx5y.css","assets/sport-DCUSFl1a.js"])))=>i.map(i=>d[i]);
/* empty css               */import{x as t,c as e,d as n,e as r,m as s,y as i,f as o,z as a,i as c,h as u,A as h,p as l,b as d,t as f,B as p,C as g,D as m}from"./vendor-BVer9QHr.js";import{_ as y}from"./game-BrEHgKzf.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const n of t)if("childList"===n.type)for(const t of n.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)}).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const v={},w=function(t,e,n){let r=Promise.resolve();if(e&&e.length>0){let t=function(t){return Promise.all(t.map(t=>Promise.resolve(t).then(t=>({status:"fulfilled",value:t}),t=>({status:"rejected",reason:t}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),s=(null==n?void 0:n.nonce)||(null==n?void 0:n.getAttribute("nonce"));r=t(e.map(t=>{if((t=function(t){return"/"+t}(t))in v)return;v[t]=!0;const e=t.endsWith(".css"),n=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${n}`))return;const r=document.createElement("link");return r.rel=e?"stylesheet":"modulepreload",e||(r.as="script"),r.crossOrigin="",r.href=t,s&&r.setAttribute("nonce",s),document.head.appendChild(r),e?new Promise((e,n)=>{r.addEventListener("load",e),r.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${t}`)))}):void 0}))}function s(t){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t}return r.then(e=>{for(const t of e||[])"rejected"===t.status&&s(t.reason);return t().catch(s)})},E={class:"site-chrome-bar site-chrome-bar--sticky-top","aria-label":"Main navigation"},b={class:"site-chrome-links"};const T=y({},[["render",function(a,c){const u=t("router-link");return n(),e("nav",E,[r("div",b,[s(u,{to:"/",class:"site-chrome-link"},{default:i(()=>[...c[0]||(c[0]=[o("Home",-1)])]),_:1}),s(u,{to:"/game",class:"site-chrome-link"},{default:i(()=>[...c[1]||(c[1]=[o("Game",-1)])]),_:1}),s(u,{to:"/under_construction",class:"site-chrome-link"},{default:i(()=>[...c[2]||(c[2]=[o("Coming Soon",-1)])]),_:1}),s(u,{to:"/terminal",class:"site-chrome-link"},{default:i(()=>[...c[3]||(c[3]=[o("Terminal Simulator",-1)])]),_:1})])])}]]),_={class:"site-chrome-bar site-chrome-bar--fixed-bottom","data-nosnippet":""},C={class:"site-chrome-copyright"};const I=y({},[["render",function(a,c){const u=t("router-link");return n(),e("footer",_,[r("span",C,[c[1]||(c[1]=o(" © 2026 Karl Querel - ",-1)),s(u,{to:"/contact",class:"site-chrome-link"},{default:i(()=>[...c[0]||(c[0]=[o("Contact",-1)])]),_:1})])])}]]),S={class:"app-root"},A={class:"app-main"},D={__name:"App",setup(i){const o=["/","/sport"],f=a(),p=u(()=>"/"!==(f.path.replace(/\/$/,"")||"/")),g=u(()=>{const t=f.path.replace(/\/$/,"")||"/";return o.includes(t)});return c(g,t=>{document.documentElement.classList.toggle("page-scrollable",t),t||window.scrollTo(0,0)},{immediate:!0}),h(()=>{document.documentElement.classList.remove("page-scrollable")}),(i,o)=>{const a=t("router-view");return n(),e("div",S,[p.value?(n(),l(T,{key:0})):d("",!0),r("main",A,[s(a)]),s(I)])}}};const k=y({mounted(){window.location.href="https://shattereddisk.github.io/rickroll/rickroll.mp4"}},[["render",function(t,r,s,i,o,a){return n(),e("div",null,"Redirecting...")}]]),N={class:"content"};const x=y({name:"NotFound"},[["render",function(t,s,i,o,a,c){return n(),e("div",N,[...s[0]||(s[0]=[r("div",{class:"nes-container is-dark is-rounded"},[r("img",{src:"/assets/img/yako-not-found.gif",alt:"lost yako"}),r("h1",null,"Page not found")],-1)])])}],["__scopeId","data-v-da04b479"]]);var R={};
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
 */const O=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=63&s|128):55296==(64512&s)&&r+1<t.length&&56320==(64512&t.charCodeAt(r+1))?(s=65536+((1023&s)<<10)+(1023&t.charCodeAt(++r)),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=63&s|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=63&s|128)}return e},L={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const e=t[s],i=s+1<t.length,o=i?t[s+1]:0,a=s+2<t.length,c=a?t[s+2]:0,u=e>>2,h=(3&e)<<4|o>>4;let l=(15&o)<<2|c>>6,d=63&c;a||(d=64,i||(l=64)),r.push(n[u],n[h],n[l],n[d])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(O(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((31&s)<<6|63&i)}else if(s>239&&s<365){const i=((7&s)<<18|(63&t[n++])<<12|(63&t[n++])<<6|63&t[n++])-65536;e[r++]=String.fromCharCode(55296+(i>>10)),e[r++]=String.fromCharCode(56320+(1023&i))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((15&s)<<12|(63&i)<<6|63&o)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const e=n[t.charAt(s++)],i=s<t.length?n[t.charAt(s)]:0;++s;const o=s<t.length?n[t.charAt(s)]:64;++s;const a=s<t.length?n[t.charAt(s)]:64;if(++s,null==e||null==i||null==o||null==a)throw new M;const c=e<<2|i>>4;if(r.push(c),64!==o){const t=i<<4&240|o>>2;if(r.push(t),64!==a){const t=o<<6&192|a;r.push(t)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class M extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const P=function(t){return function(t){const e=O(t);return L.encodeByteArray(e,!0)}(t).replace(/\./g,"")};
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
const V=()=>
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
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,F=()=>{if("undefined"==typeof document)return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const e=t&&function(t){try{return L.decodeString(t,!0)}catch(n){}return null}(t[1]);return e&&JSON.parse(e)},U=()=>{try{return V()||(()=>{if("undefined"==typeof process)return;const t=R.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0})()||F()}catch(t){return}},B=t=>{const e=(t=>{var e,n;return null===(n=null===(e=U())||void 0===e?void 0:e.emulatorHosts)||void 0===n?void 0:n[t]})(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return"["===e[0]?[e.substring(1,n-1),r]:[e.substring(0,n),r]},j=()=>{var t;return null===(t=U())||void 0===t?void 0:t.config};
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
class q{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch(()=>{}),1===t.length?t(e):t(e,n))}}}
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
 */function $(t){return t.endsWith(".cloudworkstations.dev")}const z={};let H=!1;function K(t,e){if("undefined"==typeof window||"undefined"==typeof document||!$(window.location.host)||z[t]===e||z[t]||H)return;function n(t){return`__firebase__banner__${t}`}z[t]=e;const r="__firebase__banner",s=function(){const t={prod:[],emulator:[]};for(const e of Object.keys(z))z[e]?t.emulator.push(e):t.prod.push(e);return t}().prod.length>0;function i(){const t=document.createElement("span");return t.style.cursor="pointer",t.style.marginLeft="16px",t.style.fontSize="24px",t.innerHTML=" &times;",t.onclick=()=>{H=!0,function(){const t=document.getElementById(r);t&&t.remove()}()},t}function o(){const t=function(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}(r),e=n("text"),o=document.getElementById(e)||document.createElement("span"),a=n("learnmore"),c=document.getElementById(a)||document.createElement("a"),u=n("preprendIcon"),h=document.getElementById(u)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(t.created){const e=t.element;!function(t){t.style.display="flex",t.style.background="#7faaf0",t.style.position="fixed",t.style.bottom="5px",t.style.left="5px",t.style.padding=".5em",t.style.borderRadius="5px",t.style.alignItems="center"}(e),function(t,e){t.setAttribute("id",e),t.innerText="Learn more",t.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",t.setAttribute("target","__blank"),t.style.paddingLeft="5px",t.style.textDecoration="underline"}(c,a);const n=i();!function(t,e){t.setAttribute("width","24"),t.setAttribute("id",e),t.setAttribute("height","24"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.style.marginLeft="-6px"}(h,u),e.append(h,o,c,n),document.body.appendChild(e)}s?(o.innerText="Preview backend disconnected.",h.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(h.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',o.innerText="Preview backend running in this workspace."),o.setAttribute("id",e)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",o):o()}
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
 */function G(){return!function(){var t;const e=null===(t=U())||void 0===t?void 0:t.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(n){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}class Q extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,Q.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,W.prototype.create)}}class W{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},r=`${this.service}/${t}`,s=this.errors[t],i=s?function(t,e){return t.replace(X,(t,n)=>{const r=e[n];return null!=r?String(r):`<${n}?>`})}(s,n):"Error",o=`${this.serviceName}: ${i} (${r}).`;return new Q(r,o,n)}}const X=/\{\$([^}]+)}/g;function Y(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const n=t[s],i=e[s];if(J(n)&&J(i)){if(!Y(n,i))return!1}else if(n!==i)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function J(t){return null!==t&&"object"==typeof t}
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
 */function Z(t){return t&&t._delegate?t._delegate:t}class tt{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}
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
 */const et="[DEFAULT]";
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
 */class nt{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const t=new q;if(this.instancesDeferred.set(e,t),this.isInitialized(e)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:e});n&&t.resolve(n)}catch(n){}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),r=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
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
 */(t))try{this.getOrInitializeService({instanceIdentifier:et})}catch(e){}for(const[t,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const t=this.getOrInitializeService({instanceIdentifier:r});n.resolve(t)}catch(e){}}}}clearInstance(t=et){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...t.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return null!=this.component}isInitialized(t=et){return this.instances.has(t)}getOptions(t=et){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[s,i]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(s)&&i.resolve(r)}return r}onInit(t,e){var n;const r=this.normalizeInstanceIdentifier(e),s=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;s.add(t),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&t(i,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch(r){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=t,r===et?void 0:r),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch(s){}var r;return n||null}normalizeInstanceIdentifier(t=et){return this.component?this.component.multipleInstances?t:et:t}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class rt{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new nt(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}
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
 */var st,it;(it=st||(st={}))[it.DEBUG=0]="DEBUG",it[it.VERBOSE=1]="VERBOSE",it[it.INFO=2]="INFO",it[it.WARN=3]="WARN",it[it.ERROR=4]="ERROR",it[it.SILENT=5]="SILENT";const ot={debug:st.DEBUG,verbose:st.VERBOSE,info:st.INFO,warn:st.WARN,error:st.ERROR,silent:st.SILENT},at=st.INFO,ct={[st.DEBUG]:"log",[st.VERBOSE]:"log",[st.INFO]:"info",[st.WARN]:"warn",[st.ERROR]:"error"},ut=(t,e,...n)=>{if(e<t.logLevel)return;(new Date).toISOString();if(!ct[e])throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ht{constructor(t){this.name=t,this._logLevel=at,this._logHandler=ut,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in st))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?ot[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,st.DEBUG,...t),this._logHandler(this,st.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,st.VERBOSE,...t),this._logHandler(this,st.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,st.INFO,...t),this._logHandler(this,st.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,st.WARN,...t),this._logHandler(this,st.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,st.ERROR,...t),this._logHandler(this,st.ERROR,...t)}}let lt,dt;const ft=new WeakMap,pt=new WeakMap,gt=new WeakMap,mt=new WeakMap,yt=new WeakMap;let vt={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return pt.get(t);if("objectStoreNames"===e)return t.objectStoreNames||gt.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return bt(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function wt(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(dt||(dt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(Tt(this),e),bt(ft.get(this))}:function(...e){return bt(t.apply(Tt(this),e))}:function(e,...n){const r=t.call(Tt(this),e,...n);return gt.set(r,e.sort?e.sort():[e]),bt(r)}}function Et(t){return"function"==typeof t?wt(t):(t instanceof IDBTransaction&&function(t){if(pt.has(t))return;const e=new Promise((e,n)=>{const r=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",i),t.removeEventListener("abort",i)},s=()=>{e(),r()},i=()=>{n(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",s),t.addEventListener("error",i),t.addEventListener("abort",i)});pt.set(t,e)}(t),e=t,(lt||(lt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(t=>e instanceof t)?new Proxy(t,vt):t);var e}function bt(t){if(t instanceof IDBRequest)return function(t){const e=new Promise((e,n)=>{const r=()=>{t.removeEventListener("success",s),t.removeEventListener("error",i)},s=()=>{e(bt(t.result)),r()},i=()=>{n(t.error),r()};t.addEventListener("success",s),t.addEventListener("error",i)});return e.then(e=>{e instanceof IDBCursor&&ft.set(e,t)}).catch(()=>{}),yt.set(e,t),e}(t);if(mt.has(t))return mt.get(t);const e=Et(t);return e!==t&&(mt.set(t,e),yt.set(e,t)),e}const Tt=t=>yt.get(t);const _t=["get","getKey","getAll","getAllKeys","count"],Ct=["put","add","delete","clear"],It=new Map;function St(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(It.get(e))return It.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Ct.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!s&&!_t.includes(n))return;const i=async function(t,...e){const i=this.transaction(t,s?"readwrite":"readonly");let o=i.store;return r&&(o=o.index(e.shift())),(await Promise.all([o[n](...e),s&&i.done]))[0]};return It.set(e,i),i}vt=(t=>({...t,get:(e,n,r)=>St(e,n)||t.get(e,n,r),has:(e,n)=>!!St(e,n)||t.has(e,n)}))(vt);
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
class At{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null}).filter(t=>t).join(" ")}}const Dt="@firebase/app",kt="0.13.1",Nt=new ht("@firebase/app"),xt="@firebase/app-compat",Rt="@firebase/analytics-compat",Ot="@firebase/analytics",Lt="@firebase/app-check-compat",Mt="@firebase/app-check",Pt="@firebase/auth",Vt="@firebase/auth-compat",Ft="@firebase/database",Ut="@firebase/data-connect",Bt="@firebase/database-compat",jt="@firebase/functions",qt="@firebase/functions-compat",$t="@firebase/installations",zt="@firebase/installations-compat",Ht="@firebase/messaging",Kt="@firebase/messaging-compat",Gt="@firebase/performance",Qt="@firebase/performance-compat",Wt="@firebase/remote-config",Xt="@firebase/remote-config-compat",Yt="@firebase/storage",Jt="@firebase/storage-compat",Zt="@firebase/firestore",te="@firebase/ai",ee="@firebase/firestore-compat",ne="firebase",re="[DEFAULT]",se={[Dt]:"fire-core",[xt]:"fire-core-compat",[Ot]:"fire-analytics",[Rt]:"fire-analytics-compat",[Mt]:"fire-app-check",[Lt]:"fire-app-check-compat",[Pt]:"fire-auth",[Vt]:"fire-auth-compat",[Ft]:"fire-rtdb",[Ut]:"fire-data-connect",[Bt]:"fire-rtdb-compat",[jt]:"fire-fn",[qt]:"fire-fn-compat",[$t]:"fire-iid",[zt]:"fire-iid-compat",[Ht]:"fire-fcm",[Kt]:"fire-fcm-compat",[Gt]:"fire-perf",[Qt]:"fire-perf-compat",[Wt]:"fire-rc",[Xt]:"fire-rc-compat",[Yt]:"fire-gcs",[Jt]:"fire-gcs-compat",[Zt]:"fire-fst",[ee]:"fire-fst-compat",[te]:"fire-vertex","fire-js":"fire-js",[ne]:"fire-js-all"},ie=new Map,oe=new Map,ae=new Map;function ce(t,e){try{t.container.addComponent(e)}catch(n){Nt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ue(t){const e=t.name;if(ae.has(e))return Nt.debug(`There were multiple attempts to register component ${e}.`),!1;ae.set(e,t);for(const n of ie.values())ce(n,t);for(const n of oe.values())ce(n,t);return!0}
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
const he=new W("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
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
class le{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new tt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw he.create("app-deleted",{appName:this._name})}}
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
 */function de(t,e={}){let n=t;if("object"!=typeof e){e={name:e}}const r=Object.assign({name:re,automaticDataCollectionEnabled:!0},e),s=r.name;if("string"!=typeof s||!s)throw he.create("bad-app-name",{appName:String(s)});if(n||(n=j()),!n)throw he.create("no-options");const i=ie.get(s);if(i){if(Y(n,i.options)&&Y(r,i.config))return i;throw he.create("duplicate-app",{appName:s})}const o=new rt(s);for(const c of ae.values())o.addComponent(c);const a=new le(n,r,o);return ie.set(s,a),a}function fe(t,e,n){var r;let s=null!==(r=se[t])&&void 0!==r?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const t=[`Unable to register library "${s}" with version "${e}":`];return i&&t.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&t.push("and"),o&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void Nt.warn(t.join(" "))}ue(new tt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}
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
 */const pe="firebase-heartbeat-store";let ge=null;function me(){return ge||(ge=function(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=bt(o);return r&&o.addEventListener("upgradeneeded",t=>{r(bt(o.result),t.oldVersion,t.newVersion,bt(o.transaction),t)}),n&&o.addEventListener("blocked",t=>n(t.oldVersion,t.newVersion,t)),a.then(t=>{i&&t.addEventListener("close",()=>i()),s&&t.addEventListener("versionchange",t=>s(t.oldVersion,t.newVersion,t))}).catch(()=>{}),a}("firebase-heartbeat-database",1,{upgrade:(t,e)=>{if(0===e)try{t.createObjectStore(pe)}catch(n){}}}).catch(t=>{throw he.create("idb-open",{originalErrorMessage:t.message})})),ge}async function ye(t,e){try{const n=(await me()).transaction(pe,"readwrite"),r=n.objectStore(pe);await r.put(e,ve(t)),await n.done}catch(n){if(n instanceof Q)Nt.warn(n.message);else{const t=he.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});Nt.warn(t.message)}}}function ve(t){return`${t.name}!${t.options.appId}`}
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
 */class we{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new be(e),this._heartbeatsCachePromise=this._storage.read().then(t=>(this._heartbeatsCache=t,t))}async triggerHeartbeat(){var t,e;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ee();if(null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(t=>t.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>30){const t=function(t){if(0===t.length)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}
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
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(t,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){Nt.warn(n)}}async getHeartbeatsHeader(){var t;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const e=Ee(),{heartbeatsToSend:n,unsentEntries:r}=function(t,e=1024){const n=[];let r=t.slice();for(const s of t){const t=n.find(t=>t.agent===s.agent);if(t){if(t.dates.push(s.date),Te(n)>e){t.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Te(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),s=P(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Nt.warn(e),""}}}function Ee(){return(new Date).toISOString().substring(0,10)}class be{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(t){return!1}}()&&new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var t;e((null===(t=s.error)||void 0===t?void 0:t.message)||"")}}catch(n){e(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const t=await async function(t){try{const e=(await me()).transaction(pe),n=await e.objectStore(pe).get(ve(t));return await e.done,n}catch(e){if(e instanceof Q)Nt.warn(e.message);else{const t=he.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});Nt.warn(t.message)}}}(this.app);return(null==t?void 0:t.heartbeats)?t:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return ye(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}}async add(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return ye(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}}}function Te(t){return P(JSON.stringify({version:2,heartbeats:t})).length}var _e;_e="",ue(new tt("platform-logger",t=>new At(t),"PRIVATE")),ue(new tt("heartbeat",t=>new we(t),"PRIVATE")),fe(Dt,kt,_e),fe(Dt,kt,"esm2017"),fe("fire-js","");
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
fe("firebase","11.9.1","app");var Ce,Ie,Se="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function e(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(t,e,n){n||(n=0);var r=Array(16);if("string"==typeof e)for(var s=0;16>s;++s)r[s]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(s=0;16>s;++s)r[s]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],s=t.g[2];var i=t.g[3],o=e+(i^n&(s^i))+r[0]+3614090360&4294967295;o=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=n+(o<<7&4294967295|o>>>25))+((o=i+(s^e&(n^s))+r[1]+3905402710&4294967295)<<12&4294967295|o>>>20))+((o=s+(n^i&(e^n))+r[2]+606105819&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^s&(i^e))+r[3]+3250441966&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(s^i))+r[4]+4118548399&4294967295)<<7&4294967295|o>>>25))+((o=i+(s^e&(n^s))+r[5]+1200080426&4294967295)<<12&4294967295|o>>>20))+((o=s+(n^i&(e^n))+r[6]+2821735955&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^s&(i^e))+r[7]+4249261313&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(s^i))+r[8]+1770035416&4294967295)<<7&4294967295|o>>>25))+((o=i+(s^e&(n^s))+r[9]+2336552879&4294967295)<<12&4294967295|o>>>20))+((o=s+(n^i&(e^n))+r[10]+4294925233&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^s&(i^e))+r[11]+2304563134&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(s^i))+r[12]+1804603682&4294967295)<<7&4294967295|o>>>25))+((o=i+(s^e&(n^s))+r[13]+4254626195&4294967295)<<12&4294967295|o>>>20))+((o=s+(n^i&(e^n))+r[14]+2792965006&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^s&(i^e))+r[15]+1236535329&4294967295)<<22&4294967295|o>>>10))+((o=e+(s^i&(n^s))+r[1]+4129170786&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^s&(e^n))+r[6]+3225465664&4294967295)<<9&4294967295|o>>>23))+((o=s+(e^n&(i^e))+r[11]+643717713&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(s^i))+r[0]+3921069994&4294967295)<<20&4294967295|o>>>12))+((o=e+(s^i&(n^s))+r[5]+3593408605&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^s&(e^n))+r[10]+38016083&4294967295)<<9&4294967295|o>>>23))+((o=s+(e^n&(i^e))+r[15]+3634488961&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(s^i))+r[4]+3889429448&4294967295)<<20&4294967295|o>>>12))+((o=e+(s^i&(n^s))+r[9]+568446438&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^s&(e^n))+r[14]+3275163606&4294967295)<<9&4294967295|o>>>23))+((o=s+(e^n&(i^e))+r[3]+4107603335&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(s^i))+r[8]+1163531501&4294967295)<<20&4294967295|o>>>12))+((o=e+(s^i&(n^s))+r[13]+2850285829&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^s&(e^n))+r[2]+4243563512&4294967295)<<9&4294967295|o>>>23))+((o=s+(e^n&(i^e))+r[7]+1735328473&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(s^i))+r[12]+2368359562&4294967295)<<20&4294967295|o>>>12))+((o=e+(n^s^i)+r[5]+4294588738&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^s)+r[8]+2272392833&4294967295)<<11&4294967295|o>>>21))+((o=s+(i^e^n)+r[11]+1839030562&4294967295)<<16&4294967295|o>>>16))+((o=n+(s^i^e)+r[14]+4259657740&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^s^i)+r[1]+2763975236&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^s)+r[4]+1272893353&4294967295)<<11&4294967295|o>>>21))+((o=s+(i^e^n)+r[7]+4139469664&4294967295)<<16&4294967295|o>>>16))+((o=n+(s^i^e)+r[10]+3200236656&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^s^i)+r[13]+681279174&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^s)+r[0]+3936430074&4294967295)<<11&4294967295|o>>>21))+((o=s+(i^e^n)+r[3]+3572445317&4294967295)<<16&4294967295|o>>>16))+((o=n+(s^i^e)+r[6]+76029189&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^s^i)+r[9]+3654602809&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^s)+r[12]+3873151461&4294967295)<<11&4294967295|o>>>21))+((o=s+(i^e^n)+r[15]+530742520&4294967295)<<16&4294967295|o>>>16))+((o=n+(s^i^e)+r[2]+3299628645&4294967295)<<23&4294967295|o>>>9))+((o=e+(s^(n|~i))+r[0]+4096336452&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~s))+r[7]+1126891415&4294967295)<<10&4294967295|o>>>22))+((o=s+(e^(i|~n))+r[14]+2878612391&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(s|~e))+r[5]+4237533241&4294967295)<<21&4294967295|o>>>11))+((o=e+(s^(n|~i))+r[12]+1700485571&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~s))+r[3]+2399980690&4294967295)<<10&4294967295|o>>>22))+((o=s+(e^(i|~n))+r[10]+4293915773&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(s|~e))+r[1]+2240044497&4294967295)<<21&4294967295|o>>>11))+((o=e+(s^(n|~i))+r[8]+1873313359&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~s))+r[15]+4264355552&4294967295)<<10&4294967295|o>>>22))+((o=s+(e^(i|~n))+r[6]+2734768916&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(s|~e))+r[13]+1309151649&4294967295)<<21&4294967295|o>>>11))+((i=(e=n+((o=e+(s^(n|~i))+r[4]+4149444226&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~s))+r[11]+3174756917&4294967295)<<10&4294967295|o>>>22))^((s=i+((o=s+(e^(i|~n))+r[2]+718787259&4294967295)<<15&4294967295|o>>>17))|~e))+r[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(s+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+s&4294967295,t.g[3]=t.g[3]+i&4294967295}function r(t,e){this.h=e;for(var n=[],r=!0,s=t.length-1;0<=s;s--){var i=0|t[s];r&&i==e||(n[s]=i,r=!1)}this.g=n}!function(t,e){function n(){}n.prototype=e.prototype,t.D=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.C=function(t,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return e.prototype[n].apply(t,s)}}(e,function(){this.blockSize=-1}),e.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.u=function(t,e){void 0===e&&(e=t.length);for(var r=e-this.blockSize,s=this.B,i=this.h,o=0;o<e;){if(0==i)for(;o<=r;)n(this,t,o),o+=this.blockSize;if("string"==typeof t){for(;o<e;)if(s[i++]=t.charCodeAt(o++),i==this.blockSize){n(this,s),i=0;break}}else for(;o<e;)if(s[i++]=t[o++],i==this.blockSize){n(this,s),i=0;break}}this.h=i,this.o+=e},e.prototype.v=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.o;for(e=t.length-8;e<t.length;++e)t[e]=255&n,n/=256;for(this.u(t),t=Array(16),e=n=0;4>e;++e)for(var r=0;32>r;r+=8)t[n++]=this.g[e]>>>r&255;return t};var s={};function i(t){return-128<=t&&128>t?function(t,e){var n=s;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,function(t){return new r([0|t],0>t?-1:0)}):new r([0|t],0>t?-1:0)}function o(t){if(isNaN(t)||!isFinite(t))return a;if(0>t)return d(o(-t));for(var e=[],n=1,s=0;t>=n;s++)e[s]=t/n|0,n*=4294967296;return new r(e,0)}var a=i(0),c=i(1),u=i(16777216);function h(t){if(0!=t.h)return!1;for(var e=0;e<t.g.length;e++)if(0!=t.g[e])return!1;return!0}function l(t){return-1==t.h}function d(t){for(var e=t.g.length,n=[],s=0;s<e;s++)n[s]=~t.g[s];return new r(n,~t.h).add(c)}function f(t,e){return t.add(d(e))}function p(t,e){for(;(65535&t[e])!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function g(t,e){this.g=t,this.h=e}function m(t,e){if(h(e))throw Error("division by zero");if(h(t))return new g(a,a);if(l(t))return e=m(d(t),e),new g(d(e.g),d(e.h));if(l(e))return e=m(t,d(e)),new g(d(e.g),e.h);if(30<t.g.length){if(l(t)||l(e))throw Error("slowDivide_ only works with positive integers.");for(var n=c,r=e;0>=r.l(t);)n=y(n),r=y(r);var s=v(n,1),i=v(r,1);for(r=v(r,2),n=v(n,2);!h(r);){var u=i.add(r);0>=u.l(t)&&(s=s.add(n),i=u),r=v(r,1),n=v(n,1)}return e=f(t,s.j(e)),new g(s,e)}for(s=a;0<=t.l(e);){for(n=Math.max(1,Math.floor(t.m()/e.m())),r=48>=(r=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,r-48),u=(i=o(n)).j(e);l(u)||0<u.l(t);)u=(i=o(n-=r)).j(e);h(i)&&(i=c),s=s.add(i),t=f(t,u)}return new g(s,t)}function y(t){for(var e=t.g.length+1,n=[],s=0;s<e;s++)n[s]=t.i(s)<<1|t.i(s-1)>>>31;return new r(n,t.h)}function v(t,e){var n=e>>5;e%=32;for(var s=t.g.length-n,i=[],o=0;o<s;o++)i[o]=0<e?t.i(o+n)>>>e|t.i(o+n+1)<<32-e:t.i(o+n);return new r(i,t.h)}(t=r.prototype).m=function(){if(l(this))return-d(this).m();for(var t=0,e=1,n=0;n<this.g.length;n++){var r=this.i(n);t+=(0<=r?r:4294967296+r)*e,e*=4294967296}return t},t.toString=function(t){if(2>(t=t||10)||36<t)throw Error("radix out of range: "+t);if(h(this))return"0";if(l(this))return"-"+d(this).toString(t);for(var e=o(Math.pow(t,6)),n=this,r="";;){var s=m(n,e).g,i=((0<(n=f(n,s.j(e))).g.length?n.g[0]:n.h)>>>0).toString(t);if(h(n=s))return i+r;for(;6>i.length;)i="0"+i;r=i+r}},t.i=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h},t.l=function(t){return l(t=f(this,t))?-1:h(t)?0:1},t.abs=function(){return l(this)?d(this):this},t.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0,i=0;i<=e;i++){var o=s+(65535&this.i(i))+(65535&t.i(i)),a=(o>>>16)+(this.i(i)>>>16)+(t.i(i)>>>16);s=a>>>16,o&=65535,a&=65535,n[i]=a<<16|o}return new r(n,-2147483648&n[n.length-1]?-1:0)},t.j=function(t){if(h(this)||h(t))return a;if(l(this))return l(t)?d(this).j(d(t)):d(d(this).j(t));if(l(t))return d(this.j(d(t)));if(0>this.l(u)&&0>t.l(u))return o(this.m()*t.m());for(var e=this.g.length+t.g.length,n=[],s=0;s<2*e;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(var i=0;i<t.g.length;i++){var c=this.i(s)>>>16,f=65535&this.i(s),g=t.i(i)>>>16,m=65535&t.i(i);n[2*s+2*i]+=f*m,p(n,2*s+2*i),n[2*s+2*i+1]+=c*m,p(n,2*s+2*i+1),n[2*s+2*i+1]+=f*g,p(n,2*s+2*i+1),n[2*s+2*i+2]+=c*g,p(n,2*s+2*i+2)}for(s=0;s<e;s++)n[s]=n[2*s+1]<<16|n[2*s];for(s=e;s<2*e;s++)n[s]=0;return new r(n,0)},t.A=function(t){return m(this,t).h},t.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.i(s)&t.i(s);return new r(n,this.h&t.h)},t.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.i(s)|t.i(s);return new r(n,this.h|t.h)},t.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.i(s)^t.i(s);return new r(n,this.h^t.h)},e.prototype.digest=e.prototype.v,e.prototype.reset=e.prototype.s,e.prototype.update=e.prototype.u,Ie=e,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.A,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=o,r.fromString=function t(e,n){if(0==e.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==e.charAt(0))return d(t(e.substring(1),n));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var r=o(Math.pow(n,8)),s=a,i=0;i<e.length;i+=8){var c=Math.min(8,e.length-i),u=parseInt(e.substring(i,i+c),n);8>c?(c=o(Math.pow(n,c)),s=s.j(c).add(o(u))):s=(s=s.j(r)).add(o(u))}return s},Ce=r}).apply(void 0!==Se?Se:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var Ae,De,ke,Ne,xe,Re,Oe,Le,Me="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t,e="function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,n){return t==Array.prototype||t==Object.prototype||(t[e]=n.value),t};var n=function(t){t=["object"==typeof globalThis&&globalThis,t,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof Me&&Me];for(var e=0;e<t.length;++e){var n=t[e];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);!function(t,r){if(r)t:{var s=n;t=t.split(".");for(var i=0;i<t.length-1;i++){var o=t[i];if(!(o in s))break t;s=s[o]}(r=r(i=s[t=t[t.length-1]]))!=i&&null!=r&&e(s,t,{configurable:!0,writable:!0,value:r})}}("Array.prototype.values",function(t){return t||function(){return function(t,e){t instanceof String&&(t+="");var n=0,r=!1,s={next:function(){if(!r&&n<t.length){var s=n++;return{value:e(s,t[s]),done:!1}}return r=!0,{done:!0,value:void 0}}};return s[Symbol.iterator]=function(){return s},s}(this,function(t,e){return e})}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var r=r||{},s=this||self;function i(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function o(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}function a(t,e,n){return t.call.apply(t.bind,arguments)}function c(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function u(t,e,n){return(u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?a:c).apply(null,arguments)}function h(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function l(t,e){function n(){}n.prototype=e.prototype,t.aa=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Qb=function(t,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return e.prototype[n].apply(t,s)}}function d(t){const e=t.length;if(0<e){const n=Array(e);for(let r=0;r<e;r++)n[r]=t[r];return n}return[]}function f(t,e){for(let n=1;n<arguments.length;n++){const e=arguments[n];if(i(e)){const n=t.length||0,r=e.length||0;t.length=n+r;for(let s=0;s<r;s++)t[n+s]=e[s]}else t.push(e)}}function p(t){return/^[\s\xa0]*$/.test(t)}function g(){var t=s.navigator;return t&&(t=t.userAgent)?t:""}function m(t){return m[" "](t),t}m[" "]=function(){};var y=!(-1==g().indexOf("Gecko")||-1!=g().toLowerCase().indexOf("webkit")&&-1==g().indexOf("Edge")||-1!=g().indexOf("Trident")||-1!=g().indexOf("MSIE")||-1!=g().indexOf("Edge"));function v(t,e,n){for(const r in t)e.call(n,t[r],r,t)}function w(t){const e={};for(const n in t)e[n]=t[n];return e}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function b(t,e){let n,r;for(let s=1;s<arguments.length;s++){for(n in r=arguments[s],r)t[n]=r[n];for(let e=0;e<E.length;e++)n=E[e],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function T(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function _(t){s.setTimeout(()=>{throw t},0)}function C(){var t=k;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var I=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new S,t=>t.reset());class S{constructor(){this.next=this.g=this.h=null}set(t,e){this.h=t,this.g=e,this.next=null}reset(){this.next=this.g=this.h=null}}let A,D=!1,k=new class{constructor(){this.h=this.g=null}add(t,e){const n=I.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n}},N=()=>{const t=s.Promise.resolve(void 0);A=()=>{t.then(x)}};var x=()=>{for(var t;t=C();){try{t.h.call(t.g)}catch(n){_(n)}var e=I;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}D=!1};function R(){this.s=this.s,this.C=this.C}function O(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}R.prototype.s=!1,R.prototype.ma=function(){this.s||(this.s=!0,this.N())},R.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},O.prototype.h=function(){this.defaultPrevented=!0};var L=function(){if(!s.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const t=()=>{};s.addEventListener("test",t,e),s.removeEventListener("test",t,e)}catch(n){}return t}();function M(t,e){if(O.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(y){t:{try{m(e.nodeName);var s=!0;break t}catch(i){}s=!1}s||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:P[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&M.aa.h.call(this)}}l(M,O);var P={2:"touch",3:"pen",4:"mouse"};M.prototype.h=function(){M.aa.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var V="closure_listenable_"+(1e6*Math.random()|0),F=0;function U(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.ha=s,this.key=++F,this.da=this.fa=!1}function B(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function j(t){this.src=t,this.g={},this.h=0}function q(t,e){var n=e.type;if(n in t.g){var r,s=t.g[n],i=Array.prototype.indexOf.call(s,e,void 0);(r=0<=i)&&Array.prototype.splice.call(s,i,1),r&&(B(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function $(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.da&&i.listener==e&&i.capture==!!n&&i.ha==r)return s}return-1}j.prototype.add=function(t,e,n,r,s){var i=t.toString();(t=this.g[i])||(t=this.g[i]=[],this.h++);var o=$(t,e,r,s);return-1<o?(e=t[o],n||(e.fa=!1)):((e=new U(e,this.src,i,!!r,s)).fa=n,t.push(e)),e};var z="closure_lm_"+(1e6*Math.random()|0),H={};function K(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)K(t,e[i],n,r,s);return null}return n=Z(n),t&&t[V]?t.K(e,n,!!o(r)&&!!r.capture,s):function(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var a=o(s)?!!s.capture:!!s,c=Y(t);if(c||(t[z]=c=new j(t)),n=c.add(e,n,r,a,i),n.proxy)return n;if(r=function(){function t(n){return e.call(t.src,t.listener,n)}const e=X;return t}(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)L||(s=a),void 0===s&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(W(e.toString()),r);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(r)}return n}(t,e,n,!1,r,s)}function G(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)G(t,e[i],n,r,s);else r=o(r)?!!r.capture:!!r,n=Z(n),t&&t[V]?(t=t.i,(e=String(e).toString())in t.g&&(-1<(n=$(i=t.g[e],n,r,s))&&(B(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.g[e],t.h--)))):t&&(t=Y(t))&&(e=t.g[e.toString()],t=-1,e&&(t=$(e,n,r,s)),(n=-1<t?e[t]:null)&&Q(n))}function Q(t){if("number"!=typeof t&&t&&!t.da){var e=t.src;if(e&&e[V])q(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(W(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=Y(e))?(q(n,t),0==n.h&&(n.src=null,e[z]=null)):B(t)}}}function W(t){return t in H?H[t]:H[t]="on"+t}function X(t,e){if(t.da)t=!0;else{e=new M(e,this);var n=t.listener,r=t.ha||t.src;t.fa&&Q(t),t=n.call(r,e)}return t}function Y(t){return(t=t[z])instanceof j?t:null}var J="__closure_events_fn_"+(1e9*Math.random()>>>0);function Z(t){return"function"==typeof t?t:(t[J]||(t[J]=function(e){return t.handleEvent(e)}),t[J])}function tt(){R.call(this),this.i=new j(this),this.M=this,this.F=null}function et(t,e){var n,r=t.F;if(r)for(n=[];r;r=r.F)n.push(r);if(t=t.M,r=e.type||e,"string"==typeof e)e=new O(e,t);else if(e instanceof O)e.target=e.target||t;else{var s=e;b(e=new O(r,t),s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];s=nt(o,r,!0,e)&&s}if(s=nt(o=e.g=t,r,!0,e)&&s,s=nt(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)s=nt(o=e.g=n[i],r,!1,e)&&s}function nt(t,e,n,r){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.da&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.fa&&q(t.i,o),s=!1!==a.call(c,r)&&s}}return s&&!r.defaultPrevented}function rt(t,e,n){if("function"==typeof t)n&&(t=u(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=u(t.handleEvent,t)}return 2147483647<Number(e)?-1:s.setTimeout(t,e||0)}function st(t){t.g=rt(()=>{t.g=null,t.i&&(t.i=!1,st(t))},t.l);const e=t.h;t.h=null,t.m.apply(null,e)}l(tt,R),tt.prototype[V]=!0,tt.prototype.removeEventListener=function(t,e,n,r){G(this,t,e,n,r)},tt.prototype.N=function(){if(tt.aa.N.call(this),this.i){var t,e=this.i;for(t in e.g){for(var n=e.g[t],r=0;r<n.length;r++)B(n[r]);delete e.g[t],e.h--}}this.F=null},tt.prototype.K=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)},tt.prototype.L=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};class it extends R{constructor(t,e){super(),this.m=t,this.l=e,this.h=null,this.i=!1,this.g=null}j(t){this.h=arguments,this.g?this.i=!0:st(this)}N(){super.N(),this.g&&(s.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ot(t){R.call(this),this.h=t,this.g={}}l(ot,R);var at=[];function ct(t){v(t.g,function(t,e){this.g.hasOwnProperty(e)&&Q(t)},t),t.g={}}ot.prototype.N=function(){ot.aa.N.call(this),ct(this)},ot.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ut=s.JSON.stringify,ht=s.JSON.parse,lt=class{stringify(t){return s.JSON.stringify(t,void 0)}parse(t){return s.JSON.parse(t,void 0)}};function dt(){}function ft(t){return t.h||(t.h=t.i())}function pt(){}dt.prototype.h=null;var gt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function mt(){O.call(this,"d")}function yt(){O.call(this,"c")}l(mt,O),l(yt,O);var vt={},wt=null;function Et(){return wt=wt||new tt}function bt(t){O.call(this,vt.La,t)}function Tt(t){const e=Et();et(e,new bt(e))}function _t(t,e){O.call(this,vt.STAT_EVENT,t),this.stat=e}function Ct(t){const e=Et();et(e,new _t(e,t))}function It(t,e){O.call(this,vt.Ma,t),this.size=e}function St(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return s.setTimeout(function(){t()},e)}function At(){this.g=!0}function Dt(t,e,n,r){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<s.length;o++)s[o]=""}}}return ut(n)}catch(a){return e}}(t,n)+(r?" "+r:"")})}vt.La="serverreachability",l(bt,O),vt.STAT_EVENT="statevent",l(_t,O),vt.Ma="timingevent",l(It,O),At.prototype.xa=function(){this.g=!1},At.prototype.info=function(){};var kt,Nt={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},xt={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function Rt(){}function Ot(t,e,n,r){this.j=t,this.i=e,this.l=n,this.R=r||1,this.U=new ot(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Lt}function Lt(){this.i=null,this.g="",this.h=!1}l(Rt,dt),Rt.prototype.g=function(){return new XMLHttpRequest},Rt.prototype.i=function(){return{}},kt=new Rt;var Mt={},Pt={};function Vt(t,e,n){t.L=1,t.v=ue(se(e)),t.m=n,t.P=!0,Ft(t,null)}function Ft(t,e){t.F=Date.now(),jt(t),t.A=se(t.v);var n=t.A,r=t.R;Array.isArray(r)||(r=[String(r)]),Te(n.i,"t",r),t.C=0,n=t.j.J,t.h=new Lt,t.g=wn(t.j,n?e:null,!t.m),0<t.O&&(t.M=new it(u(t.Y,t,t.g),t.O)),e=t.U,n=t.g,r=t.ca;var s="readystatechange";Array.isArray(s)||(s&&(at[0]=s.toString()),s=at);for(var i=0;i<s.length;i++){var o=K(n,s[i],r||e.handleEvent,!1,e.h||e);if(!o)break;e.g[o.key]=o}e=t.H?w(t.H):{},t.m?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.m,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),Tt(),function(t,e,n,r,s,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&"type"==l[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+"\n"+n+"\n"+o})}(t.i,t.u,t.A,t.l,t.R,t.m)}function Ut(t){return!!t.g&&("GET"==t.u&&2!=t.L&&t.j.Ca)}function Bt(t,e){var n=t.C,r=e.indexOf("\n",n);return-1==r?Pt:(n=Number(e.substring(n,r)),isNaN(n)?Mt:(r+=1)+n>e.length?Pt:(e=e.slice(r,r+n),t.C=r+n,e))}function jt(t){t.S=Date.now()+t.I,qt(t,t.I)}function qt(t,e){if(null!=t.B)throw Error("WatchDog timer not null");t.B=St(u(t.ba,t),e)}function $t(t){t.B&&(s.clearTimeout(t.B),t.B=null)}function zt(t){0==t.j.G||t.J||pn(t.j,t)}function Ht(t){$t(t);var e=t.M;e&&"function"==typeof e.ma&&e.ma(),t.M=null,ct(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.ma())}function Kt(t,e){try{var n=t.j;if(0!=n.G&&(n.g==t||Yt(n.h,t)))if(!t.K&&Yt(n.h,t)&&3==n.G){try{var r=n.Da.g.parse(e)}catch(h){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){t:if(!n.u){if(n.g){if(!(n.g.F+3e3<t.F))break t;fn(n),nn(n)}hn(n),Ct(18)}}else n.za=s[1],0<n.za-n.T&&37500>s[2]&&n.F&&0==n.v&&!n.C&&(n.C=St(u(n.Za,n),6e3));if(1>=Xt(n.h)&&n.ca){try{n.ca()}catch(h){}n.ca=void 0}}else mn(n,11)}else if((t.K||n.g==t)&&fn(n),!p(e))for(s=n.Da.g.parse(e),e=0;e<s.length;e++){let u=s[e];if(n.T=u[0],u=u[1],2==n.G)if("c"==u[0]){n.K=u[1],n.ia=u[2];const e=u[3];null!=e&&(n.la=e,n.j.info("VER="+n.la));const s=u[4];null!=s&&(n.Aa=s,n.j.info("SVER="+n.Aa));const h=u[5];null!=h&&"number"==typeof h&&0<h&&(r=1.5*h,n.L=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const l=t.g;if(l){const t=l.g?l.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(t){var i=r.h;i.g||-1==t.indexOf("spdy")&&-1==t.indexOf("quic")&&-1==t.indexOf("h2")||(i.j=i.l,i.g=new Set,i.h&&(Jt(i,i.h),i.h=null))}if(r.D){const t=l.g?l.g.getResponseHeader("X-HTTP-Session-Id"):null;t&&(r.ya=t,ce(r.I,r.D,t))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-t.F,n.j.info("Handshake RTT: "+n.R+"ms"));var o=t;if((r=n).qa=vn(r,r.J?r.ia:null,r.W),o.K){Zt(r.h,o);var a=o,c=r.L;c&&(a.I=c),a.B&&($t(a),jt(a)),r.g=o}else un(r);0<n.i.length&&sn(n)}else"stop"!=u[0]&&"close"!=u[0]||mn(n,7);else 3==n.G&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?mn(n,7):en(n):"noop"!=u[0]&&n.l&&n.l.ta(u),n.v=0)}Tt()}catch(h){}}Ot.prototype.ca=function(t){t=t.target;const e=this.M;e&&3==Ye(t)?e.j():this.Y(t)},Ot.prototype.Y=function(t){try{if(t==this.g)t:{const d=Ye(this.g);var e=this.g.Ba();this.g.Z();if(!(3>d)&&(3!=d||this.g&&(this.h.h||this.g.oa()||Je(this.g)))){this.J||4!=d||7==e||Tt(),$t(this);var n=this.g.Z();this.X=n;e:if(Ut(this)){var r=Je(this.g);t="";var i=r.length,o=4==Ye(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){Ht(this),zt(this);var a="";break e}this.h.i=new s.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,t+=this.h.i.decode(r[e],{stream:!(o&&e==i-1)});r.length=0,this.h.g+=t,this.C=0,a=this.h.g}else a=this.g.oa();if(this.o=200==n,function(t,e,n,r,s,i,o){t.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+"\n"+n+"\n"+i+" "+o})}(this.i,this.u,this.A,this.l,this.R,d,n),this.o){if(this.T&&!this.K){e:{if(this.g){var c,u=this.g;if((c=u.g?u.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(c)){var h=c;break e}}h=null}if(!(n=h)){this.o=!1,this.s=3,Ct(12),Ht(this),zt(this);break t}Dt(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Kt(this,n)}if(this.P){let t;for(n=!0;!this.J&&this.C<a.length;){if(t=Bt(this,a),t==Pt){4==d&&(this.s=4,Ct(14),n=!1),Dt(this.i,this.l,null,"[Incomplete Response]");break}if(t==Mt){this.s=4,Ct(15),Dt(this.i,this.l,a,"[Invalid Chunk]"),n=!1;break}Dt(this.i,this.l,t,null),Kt(this,t)}if(Ut(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=d||0!=a.length||this.h.h||(this.s=1,Ct(16),n=!1),this.o=this.o&&n,n){if(0<a.length&&!this.W){this.W=!0;var l=this.j;l.g==this&&l.ba&&!l.M&&(l.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),ln(l),l.M=!0,Ct(11))}}else Dt(this.i,this.l,a,"[Invalid Chunked Response]"),Ht(this),zt(this)}else Dt(this.i,this.l,a,null),Kt(this,a);4==d&&Ht(this),this.o&&!this.J&&(4==d?pn(this.j,this):(this.o=!1,jt(this)))}else(function(t){const e={};t=(t.g&&2<=Ye(t)&&t.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<t.length;r++){if(p(t[r]))continue;var n=T(t[r]);const s=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const i=e[s]||[];e[s]=i,i.push(n)}!function(t,e){for(const n in t)e.call(void 0,t[n],n,t)}(e,function(t){return t.join(", ")})})(this.g),400==n&&0<a.indexOf("Unknown SID")?(this.s=3,Ct(12)):(this.s=0,Ct(13)),Ht(this),zt(this)}}}catch(d){}},Ot.prototype.cancel=function(){this.J=!0,Ht(this)},Ot.prototype.ba=function(){this.B=null;const t=Date.now();0<=t-this.S?(function(t,e){t.info(function(){return"TIMEOUT: "+e})}(this.i,this.A),2!=this.L&&(Tt(),Ct(17)),Ht(this),this.s=2,zt(this)):qt(this,this.S-t)};var Gt=class{constructor(t,e){this.g=t,this.map=e}};function Qt(t){this.l=t||10,s.PerformanceNavigationTiming?t=0<(t=s.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(s.chrome&&s.chrome.loadTimes&&s.chrome.loadTimes()&&s.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Wt(t){return!!t.h||!!t.g&&t.g.size>=t.j}function Xt(t){return t.h?1:t.g?t.g.size:0}function Yt(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function Jt(t,e){t.g?t.g.add(e):t.h=e}function Zt(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function te(t){if(null!=t.h)return t.i.concat(t.h.D);if(null!=t.g&&0!==t.g.size){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return d(t.i)}function ee(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(i(t)||"string"==typeof t)Array.prototype.forEach.call(t,e,void 0);else for(var n=function(t){if(t.na&&"function"==typeof t.na)return t.na();if(!t.V||"function"!=typeof t.V){if("undefined"!=typeof Map&&t instanceof Map)return Array.from(t.keys());if(!("undefined"!=typeof Set&&t instanceof Set)){if(i(t)||"string"==typeof t){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const r in t)e[n++]=r;return e}}}(t),r=function(t){if(t.V&&"function"==typeof t.V)return t.V();if("undefined"!=typeof Map&&t instanceof Map||"undefined"!=typeof Set&&t instanceof Set)return Array.from(t.values());if("string"==typeof t)return t.split("");if(i(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}for(r in e=[],n=0,t)e[n++]=t[r];return e}(t),s=r.length,o=0;o<s;o++)e.call(void 0,r[o],n&&n[o],t)}Qt.prototype.cancel=function(){if(this.i=te(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const t of this.g.values())t.cancel();this.g.clear()}};var ne=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function re(t){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,t instanceof re){this.h=t.h,ie(this,t.j),this.o=t.o,this.g=t.g,oe(this,t.s),this.l=t.l;var e=t.i,n=new ve;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),ae(this,n),this.m=t.m}else t&&(e=String(t).match(ne))?(this.h=!1,ie(this,e[1]||"",!0),this.o=he(e[2]||""),this.g=he(e[3]||"",!0),oe(this,e[4]),this.l=he(e[5]||"",!0),ae(this,e[6]||"",!0),this.m=he(e[7]||"")):(this.h=!1,this.i=new ve(null,this.h))}function se(t){return new re(t)}function ie(t,e,n){t.j=n?he(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function oe(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.s=e}else t.s=null}function ae(t,e,n){e instanceof ve?(t.i=e,function(t,e){e&&!t.j&&(we(t),t.i=null,t.g.forEach(function(t,e){var n=e.toLowerCase();e!=n&&(Ee(this,e),Te(this,n,t))},t)),t.j=e}(t.i,t.h)):(n||(e=le(e,me)),t.i=new ve(e,t.h))}function ce(t,e,n){t.i.set(e,n)}function ue(t){return ce(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function he(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function le(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,de),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function de(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}re.prototype.toString=function(){var t=[],e=this.j;e&&t.push(le(e,fe,!0),":");var n=this.g;return(n||"file"==e)&&(t.push("//"),(e=this.o)&&t.push(le(e,fe,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.s)&&t.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&t.push("/"),t.push(le(n,"/"==n.charAt(0)?ge:pe,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.m)&&t.push("#",le(n,ye)),t.join("")};var fe=/[#\/\?@]/g,pe=/[#\?:]/g,ge=/[#\?]/g,me=/[#\?@]/g,ye=/#/g;function ve(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function we(t){t.g||(t.g=new Map,t.h=0,t.i&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}function Ee(t,e){we(t),e=_e(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function be(t,e){return we(t),e=_e(t,e),t.g.has(e)}function Te(t,e,n){Ee(t,e),0<n.length&&(t.i=null,t.g.set(_e(t,e),d(n)),t.h+=n.length)}function _e(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Ce(t,e,n,r,s){try{s&&(s.onload=null,s.onerror=null,s.onabort=null,s.ontimeout=null),r(n)}catch(i){}}function Ie(){this.g=new lt}function Se(t,e,n){const r=n||"";try{ee(t,function(t,n){let s=t;o(t)&&(s=ut(t)),e.push(r+n+"="+encodeURIComponent(s))})}catch(s){throw e.push(r+"type="+encodeURIComponent("_badmap")),s}}function Pe(t){this.l=t.Ub||null,this.j=t.eb||!1}function Ve(t,e){tt.call(this),this.D=t,this.o=e,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function Fe(t){t.j.read().then(t.Pa.bind(t)).catch(t.ga.bind(t))}function Ue(t){t.readyState=4,t.l=null,t.j=null,t.v=null,Be(t)}function Be(t){t.onreadystatechange&&t.onreadystatechange.call(t)}function je(t){let e="";return v(t,function(t,n){e+=n,e+=":",e+=t,e+="\r\n"}),e}function qe(t,e,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=je(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):ce(t,e,n))}function $e(t){tt.call(this),this.headers=new Map,this.o=t||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(t=ve.prototype).add=function(t,e){we(this),this.i=null,t=_e(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},t.forEach=function(t,e){we(this),this.g.forEach(function(n,r){n.forEach(function(n){t.call(e,n,r,this)},this)},this)},t.na=function(){we(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let r=0;r<e.length;r++){const s=t[r];for(let t=0;t<s.length;t++)n.push(e[r])}return n},t.V=function(t){we(this);let e=[];if("string"==typeof t)be(this,t)&&(e=e.concat(this.g.get(_e(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e},t.set=function(t,e){return we(this),this.i=null,be(this,t=_e(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},t.get=function(t,e){return t&&0<(t=this.V(t)).length?String(t[0]):e},t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var r=e[n];const i=encodeURIComponent(String(r)),o=this.V(r);for(r=0;r<o.length;r++){var s=i;""!==o[r]&&(s+="="+encodeURIComponent(String(o[r]))),t.push(s)}}return this.i=t.join("&")},l(Pe,dt),Pe.prototype.g=function(){return new Ve(this.l,this.j)},Pe.prototype.i=function(t){return function(){return t}}({}),l(Ve,tt),(t=Ve.prototype).open=function(t,e){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=t,this.A=e,this.readyState=1,Be(this)},t.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.u,method:this.B,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||s).fetch(new Request(this.A,e)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Ue(this)),this.readyState=0},t.Sa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Be(this)),this.g&&(this.readyState=3,Be(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==s.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Fe(this)}else t.text().then(this.Ra.bind(this),this.ga.bind(this))},t.Pa=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var e=t.value?t.value:new Uint8Array(0);(e=this.v.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Ue(this):Be(this),3==this.readyState&&Fe(this)}},t.Ra=function(t){this.g&&(this.response=this.responseText=t,Ue(this))},t.Qa=function(t){this.g&&(this.response=t,Ue(this))},t.ga=function(){this.g&&Ue(this)},t.setRequestHeader=function(t,e){this.u.append(t,e)},t.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(Ve.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}}),l($e,tt);var ze=/^https?$/i,He=["POST","PUT"];function Ke(t,e){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=e,t.m=5,Ge(t),We(t)}function Ge(t){t.A||(t.A=!0,et(t,"complete"),et(t,"error"))}function Qe(t){if(t.h&&void 0!==r&&(!t.v[1]||4!=Ye(t)||2!=t.Z()))if(t.u&&4==Ye(t))rt(t.Ea,0,t);else if(et(t,"readystatechange"),4==Ye(t)){t.h=!1;try{const r=t.Z();t:switch(r){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var n;if(!(n=e)){var i;if(i=0===r){var o=String(t.D).match(ne)[1]||null;!o&&s.self&&s.self.location&&(o=s.self.location.protocol.slice(0,-1)),i=!ze.test(o?o.toLowerCase():"")}n=i}if(n)et(t,"complete"),et(t,"success");else{t.m=6;try{var a=2<Ye(t)?t.g.statusText:""}catch(c){a=""}t.l=a+" ["+t.Z()+"]",Ge(t)}}finally{We(t)}}}function We(t,e){if(t.g){Xe(t);const r=t.g,s=t.v[0]?()=>{}:null;t.g=null,t.v=null,e||et(t,"ready");try{r.onreadystatechange=s}catch(n){}}}function Xe(t){t.I&&(s.clearTimeout(t.I),t.I=null)}function Ye(t){return t.g?t.g.readyState:0}function Je(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.H){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(e){return null}}function Ze(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function tn(t){this.Aa=0,this.i=[],this.j=new At,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ze("failFast",!1,t),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ze("baseRetryDelayMs",5e3,t),this.cb=Ze("retryDelaySeedMs",1e4,t),this.Wa=Ze("forwardChannelMaxRetries",2,t),this.wa=Ze("forwardChannelRequestTimeoutMs",2e4,t),this.pa=t&&t.xmlHttpFactory||void 0,this.Xa=t&&t.Tb||void 0,this.Ca=t&&t.useFetchStreams||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.h=new Qt(t&&t.concurrentRequestLimit),this.Da=new Ie,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=t&&t.Rb||!1,t&&t.xa&&this.j.xa(),t&&t.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&t&&t.detectBufferingProxy||!1,this.ja=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.ja=t.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function en(t){if(rn(t),3==t.G){var e=t.U++,n=se(t.I);if(ce(n,"SID",t.K),ce(n,"RID",e),ce(n,"TYPE","terminate"),an(t,n),(e=new Ot(t,t.j,e)).L=2,e.v=ue(se(n)),n=!1,s.navigator&&s.navigator.sendBeacon)try{n=s.navigator.sendBeacon(e.v.toString(),"")}catch(r){}!n&&s.Image&&((new Image).src=e.v,n=!0),n||(e.g=wn(e.j,null),e.g.ea(e.v)),e.F=Date.now(),jt(e)}yn(t)}function nn(t){t.g&&(ln(t),t.g.cancel(),t.g=null)}function rn(t){nn(t),t.u&&(s.clearTimeout(t.u),t.u=null),fn(t),t.h.cancel(),t.s&&("number"==typeof t.s&&s.clearTimeout(t.s),t.s=null)}function sn(t){if(!Wt(t.h)&&!t.s){t.s=!0;var e=t.Ga;A||N(),D||(A(),D=!0),k.add(e,t),t.B=0}}function on(t,e){var n;n=e?e.l:t.U++;const r=se(t.I);ce(r,"SID",t.K),ce(r,"RID",n),ce(r,"AID",t.T),an(t,r),t.m&&t.o&&qe(r,t.m,t.o),n=new Ot(t,t.j,n,t.B+1),null===t.m&&(n.H=t.o),e&&(t.i=e.D.concat(t.i)),e=cn(t,n,1e3),n.I=Math.round(.5*t.wa)+Math.round(.5*t.wa*Math.random()),Jt(t.h,n),Vt(n,r,e)}function an(t,e){t.H&&v(t.H,function(t,n){ce(e,n,t)}),t.l&&ee({},function(t,n){ce(e,n,t)})}function cn(t,e,n){n=Math.min(t.i.length,n);var r=t.l?u(t.l.Na,t.l,t):null;t:{var s=t.i;let e=-1;for(;;){const t=["count="+n];-1==e?0<n?(e=s[0].g,t.push("ofs="+e)):e=0:t.push("ofs="+e);let o=!0;for(let a=0;a<n;a++){let n=s[a].g;const c=s[a].map;if(n-=e,0>n)e=Math.max(0,s[a].g-100),o=!1;else try{Se(c,t,"req"+n+"_")}catch(i){r&&r(c)}}if(o){r=t.join("&");break t}}}return t=t.i.splice(0,n),e.D=t,r}function un(t){if(!t.g&&!t.u){t.Y=1;var e=t.Fa;A||N(),D||(A(),D=!0),k.add(e,t),t.v=0}}function hn(t){return!(t.g||t.u||3<=t.v)&&(t.Y++,t.u=St(u(t.Fa,t),gn(t,t.v)),t.v++,!0)}function ln(t){null!=t.A&&(s.clearTimeout(t.A),t.A=null)}function dn(t){t.g=new Ot(t,t.j,"rpc",t.Y),null===t.m&&(t.g.H=t.o),t.g.O=0;var e=se(t.qa);ce(e,"RID","rpc"),ce(e,"SID",t.K),ce(e,"AID",t.T),ce(e,"CI",t.F?"0":"1"),!t.F&&t.ja&&ce(e,"TO",t.ja),ce(e,"TYPE","xmlhttp"),an(t,e),t.m&&t.o&&qe(e,t.m,t.o),t.L&&(t.g.I=t.L);var n=t.g;t=t.ia,n.L=1,n.v=ue(se(e)),n.m=null,n.P=!0,Ft(n,t)}function fn(t){null!=t.C&&(s.clearTimeout(t.C),t.C=null)}function pn(t,e){var n=null;if(t.g==e){fn(t),ln(t),t.g=null;var r=2}else{if(!Yt(t.h,e))return;n=e.D,Zt(t.h,e),r=1}if(0!=t.G)if(e.o)if(1==r){n=e.m?e.m.length:0,e=Date.now()-e.F;var s=t.B;et(r=Et(),new It(r,n)),sn(t)}else un(t);else if(3==(s=e.s)||0==s&&0<e.X||!(1==r&&function(t,e){return!(Xt(t.h)>=t.h.j-(t.s?1:0)||(t.s?(t.i=e.D.concat(t.i),0):1==t.G||2==t.G||t.B>=(t.Va?0:t.Wa)||(t.s=St(u(t.Ga,t,e),gn(t,t.B)),t.B++,0)))}(t,e)||2==r&&hn(t)))switch(n&&0<n.length&&(e=t.h,e.i=e.i.concat(n)),s){case 1:mn(t,5);break;case 4:mn(t,10);break;case 3:mn(t,6);break;default:mn(t,2)}}function gn(t,e){let n=t.Ta+Math.floor(Math.random()*t.cb);return t.isActive()||(n*=2),n*e}function mn(t,e){if(t.j.info("Error code "+e),2==e){var n=u(t.fb,t),r=t.Xa;const e=!r;r=new re(r||"//www.google.com/images/cleardot.gif"),s.location&&"http"==s.location.protocol||ie(r,"https"),ue(r),e?function(t,e){const n=new At;if(s.Image){const r=new Image;r.onload=h(Ce,n,"TestLoadImage: loaded",!0,e,r),r.onerror=h(Ce,n,"TestLoadImage: error",!1,e,r),r.onabort=h(Ce,n,"TestLoadImage: abort",!1,e,r),r.ontimeout=h(Ce,n,"TestLoadImage: timeout",!1,e,r),s.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=t}else e(!1)}(r.toString(),n):function(t,e){new At;const n=new AbortController,r=setTimeout(()=>{n.abort(),Ce(0,0,!1,e)},1e4);fetch(t,{signal:n.signal}).then(t=>{clearTimeout(r),t.ok?Ce(0,0,!0,e):Ce(0,0,!1,e)}).catch(()=>{clearTimeout(r),Ce(0,0,!1,e)})}(r.toString(),n)}else Ct(2);t.G=0,t.l&&t.l.sa(e),yn(t),rn(t)}function yn(t){if(t.G=0,t.ka=[],t.l){const e=te(t.h);0==e.length&&0==t.i.length||(f(t.ka,e),f(t.ka,t.i),t.h.i.length=0,d(t.i),t.i.length=0),t.l.ra()}}function vn(t,e,n){var r=n instanceof re?se(n):new re(n);if(""!=r.g)e&&(r.g=e+"."+r.g),oe(r,r.s);else{var i=s.location;r=i.protocol,e=e?e+"."+i.hostname:i.hostname,i=+i.port;var o=new re(null);r&&ie(o,r),e&&(o.g=e),i&&oe(o,i),n&&(o.l=n),r=o}return n=t.D,e=t.ya,n&&e&&ce(r,n,e),ce(r,"VER",t.la),an(t,r),r}function wn(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return(e=t.Ca&&!t.pa?new $e(new Pe({eb:n})):new $e(t.pa)).Ha(t.J),e}function En(){}function bn(){}function Tn(t,e){tt.call(this),this.g=new tn(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.va&&(t?t["X-WebChannel-Client-Profile"]=e.va:t={"X-WebChannel-Client-Profile":e.va}),this.g.S=t,(t=e&&e.Sb)&&!p(t)&&(this.g.m=t),this.v=e&&e.supportsCrossDomainXhr||!1,this.u=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!p(e)&&(this.g.D=e,null!==(t=this.h)&&e in t&&(e in(t=this.h)&&delete t[e])),this.j=new In(this)}function _n(t){mt.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){t:{for(const n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function Cn(){yt.call(this),this.status=1}function In(t){this.g=t}(t=$e.prototype).Ha=function(t){this.J=t},t.ea=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);e=e?e.toUpperCase():"GET",this.D=t,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():kt.g(),this.v=this.o?ft(this.o):ft(kt),this.g.onreadystatechange=u(this.Ea,this);try{this.B=!0,this.g.open(e,String(t),!0),this.B=!1}catch(o){return void Ke(this,o)}if(t=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else{if("function"!=typeof r.keys||"function"!=typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const t of r.keys())n.set(t,r.get(t))}r=Array.from(n.keys()).find(t=>"content-type"==t.toLowerCase()),i=s.FormData&&t instanceof s.FormData,!(0<=Array.prototype.indexOf.call(He,e,void 0))||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[s,a]of n)this.g.setRequestHeader(s,a);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Xe(this),this.u=!0,this.g.send(t),this.u=!1}catch(o){Ke(this,o)}},t.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=t||7,et(this,"complete"),et(this,"abort"),We(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),We(this,!0)),$e.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Qe(this):this.bb())},t.bb=function(){Qe(this)},t.isActive=function(){return!!this.g},t.Z=function(){try{return 2<Ye(this)?this.g.status:-1}catch(t){return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch(t){return""}},t.Oa=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),ht(e)}},t.Ba=function(){return this.m},t.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(t=tn.prototype).la=8,t.G=1,t.connect=function(t,e,n,r){Ct(0),this.W=t,this.H=e||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.I=vn(this,null,this.W),sn(this)},t.Ga=function(t){if(this.s)if(this.s=null,1==this.G){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const s=new Ot(this,this.j,t);let i=this.o;if(this.S&&(i?(i=w(i),b(i,this.S)):i=this.S),null!==this.m||this.O||(s.H=i,i=null),this.P)t:{for(var e=0,n=0;n<this.i.length;n++){var r=this.i[n];if(void 0===(r="__data__"in r.map&&"string"==typeof(r=r.map.__data__)?r.length:void 0))break;if(4096<(e+=r)){e=n;break t}if(4096===e||n===this.i.length-1){e=n+1;break t}}e=1e3}else e=1e3;e=cn(this,s,e),ce(n=se(this.I),"RID",t),ce(n,"CVER",22),this.D&&ce(n,"X-HTTP-Session-Id",this.D),an(this,n),i&&(this.O?e="headers="+encodeURIComponent(String(je(i)))+"&"+e:this.m&&qe(n,this.m,i)),Jt(this.h,s),this.Ua&&ce(n,"TYPE","init"),this.P?(ce(n,"$req",e),ce(n,"SID","null"),s.T=!0,Vt(s,n,null)):Vt(s,n,e),this.G=2}}else 3==this.G&&(t?on(this,t):0==this.i.length||Wt(this.h)||on(this))},t.Fa=function(){if(this.u=null,dn(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var t=2*this.R;this.j.info("BP detection timer enabled: "+t),this.A=St(u(this.ab,this),t)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ct(10),nn(this),dn(this))},t.Za=function(){null!=this.C&&(this.C=null,nn(this),hn(this),Ct(19))},t.fb=function(t){t?(this.j.info("Successfully pinged google.com"),Ct(2)):(this.j.info("Failed to ping google.com"),Ct(1))},t.isActive=function(){return!!this.l&&this.l.isActive(this)},(t=En.prototype).ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){},bn.prototype.g=function(t,e){return new Tn(t,e)},l(Tn,tt),Tn.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Tn.prototype.close=function(){en(this.g)},Tn.prototype.o=function(t){var e=this.g;if("string"==typeof t){var n={};n.__data__=t,t=n}else this.u&&((n={}).__data__=ut(t),t=n);e.i.push(new Gt(e.Ya++,t)),3==e.G&&sn(e)},Tn.prototype.N=function(){this.g.l=null,delete this.j,en(this.g),delete this.g,Tn.aa.N.call(this)},l(_n,mt),l(Cn,yt),l(In,En),In.prototype.ua=function(){et(this.g,"a")},In.prototype.ta=function(t){et(this.g,new _n(t))},In.prototype.sa=function(t){et(this.g,new Cn)},In.prototype.ra=function(){et(this.g,"b")},bn.prototype.createWebChannel=bn.prototype.g,Tn.prototype.send=Tn.prototype.o,Tn.prototype.open=Tn.prototype.m,Tn.prototype.close=Tn.prototype.close,Le=function(){return new bn},Oe=function(){return Et()},Re=vt,xe={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Nt.NO_ERROR=0,Nt.TIMEOUT=8,Nt.HTTP_ERROR=6,Ne=Nt,xt.COMPLETE="complete",ke=xt,pt.EventType=gt,gt.OPEN="a",gt.CLOSE="b",gt.ERROR="c",gt.MESSAGE="d",tt.prototype.listen=tt.prototype.K,De=pt,$e.prototype.listenOnce=$e.prototype.L,$e.prototype.getLastError=$e.prototype.Ka,$e.prototype.getLastErrorCode=$e.prototype.Ba,$e.prototype.getStatus=$e.prototype.Z,$e.prototype.getResponseJson=$e.prototype.Oa,$e.prototype.getResponseText=$e.prototype.oa,$e.prototype.send=$e.prototype.ea,$e.prototype.setWithCredentials=$e.prototype.Ha,Ae=$e}).apply(void 0!==Me?Me:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const Pe="@firebase/firestore",Ve="4.7.17";
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
 */class Fe{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Fe.UNAUTHENTICATED=new Fe(null),Fe.GOOGLE_CREDENTIALS=new Fe("google-credentials-uid"),Fe.FIRST_PARTY=new Fe("first-party-uid"),Fe.MOCK_USER=new Fe("mock-user");
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
let Ue="11.9.0";
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
 */const Be=new ht("@firebase/firestore");function je(){return Be.logLevel}function qe(t,...e){if(Be.logLevel<=st.DEBUG){const n=e.map(He);Be.debug(`Firestore (${Ue}): ${t}`,...n)}}function $e(t,...e){if(Be.logLevel<=st.ERROR){const n=e.map(He);Be.error(`Firestore (${Ue}): ${t}`,...n)}}function ze(t,...e){if(Be.logLevel<=st.WARN){const n=e.map(He);Be.warn(`Firestore (${Ue}): ${t}`,...n)}}function He(t){if("string"==typeof t)return t;try{
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
 */function Ke(t,e,n){let r="Unexpected state";"string"==typeof e?r=e:n=e,Ge(t,r,n)}function Ge(t,e,n){let r=`FIRESTORE (${Ue}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(s){r+=" CONTEXT: "+n}throw $e(r),new Error(r)}function Qe(t,e,n,r){let s="Unexpected state";"string"==typeof n?s=n:r=n,t||Ge(e,s,r)}function We(t,e){return t}
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
 */const Xe={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Ye extends Q{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
 */class Je{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}
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
 */class Ze{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class tn{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(Fe.UNAUTHENTICATED))}shutdown(){}}class en{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class nn{constructor(t){this.t=t,this.currentUser=Fe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Qe(void 0===this.o,42304);let n=this.i;const r=t=>this.i!==n?(n=this.i,e(t)):Promise.resolve();let s=new Je;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Je,t.enqueueRetryable(()=>r(this.currentUser))};const i=()=>{const e=s;t.enqueueRetryable(async()=>{await e.promise,await r(this.currentUser)})},o=t=>{qe("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=t,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(t=>o(t)),setTimeout(()=>{if(!this.auth){const t=this.t.getImmediate({optional:!0});t?o(t):(qe("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Je)}},0),i()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(e=>this.i!==t?(qe("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(Qe("string"==typeof e.accessToken,31837,{l:e}),new Ze(e.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Qe(null===t||"string"==typeof t,2055,{h:t}),new Fe(t)}}class rn{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=Fe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class sn{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new rn(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(Fe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class on{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class an{constructor(t,e){var n;this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,null!=(n=t)&&void 0!==n.settings&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Qe(void 0===this.o,3512);const n=t=>{null!=t.error&&qe("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`);const n=t.token!==this.m;return this.m=t.token,qe("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?e(t.token):Promise.resolve()};this.o=e=>{t.enqueueRetryable(()=>n(e))};const r=t=>{qe("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=t,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(t=>r(t)),setTimeout(()=>{if(!this.appCheck){const t=this.V.getImmediate({optional:!0});t?r(t):qe("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new on(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(t=>t?(Qe("string"==typeof t.token,44558,{tokenResult:t}),this.m=t.token,new on(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
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
 */function cn(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}
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
 */function un(){return new TextEncoder}
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
 */class hn{static newId(){const t=62*Math.floor(256/62);let e="";for(;e.length<20;){const n=cn(40);for(let r=0;r<n.length;++r)e.length<20&&n[r]<t&&(e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return e}}function ln(t,e){return t<e?-1:t>e?1:0}function dn(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=t.codePointAt(n),s=e.codePointAt(n);if(r!==s){if(r<128&&s<128)return ln(r,s);{const i=un(),o=pn(i.encode(fn(t,n)),i.encode(fn(e,n)));return 0!==o?o:ln(r,s)}}n+=r>65535?2:1}return ln(t.length,e.length)}function fn(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function pn(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return ln(t[n],e[n]);return ln(t.length,e.length)}function gn(t,e,n){return t.length===e.length&&t.every((t,r)=>n(t,e[r]))}
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
 */const mn=-62135596800,yn=1e6;class vn{static now(){return vn.fromMillis(Date.now())}static fromDate(t){return vn.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*yn);return new vn(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new Ye(Xe.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new Ye(Xe.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<mn)throw new Ye(Xe.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new Ye(Xe.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/yn}_compareTo(t){return this.seconds===t.seconds?ln(this.nanoseconds,t.nanoseconds):ln(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-mn;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
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
 */class wn{static fromTimestamp(t){return new wn(t)}static min(){return new wn(new vn(0,0))}static max(){return new wn(new vn(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */const En="__name__";class bn{constructor(t,e,n){void 0===e?e=0:e>t.length&&Ke(637,{offset:e,range:t.length}),void 0===n?n=t.length-e:n>t.length-e&&Ke(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===bn.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof bn?t.forEach(t=>{e.push(t)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=bn.compareSegments(t.get(r),e.get(r));if(0!==n)return n}return ln(t.length,e.length)}static compareSegments(t,e){const n=bn.isNumericId(t),r=bn.isNumericId(e);return n&&!r?-1:!n&&r?1:n&&r?bn.extractNumericId(t).compare(bn.extractNumericId(e)):dn(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Ce.fromString(t.substring(4,t.length-2))}}class Tn extends bn{construct(t,e,n){return new Tn(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new Ye(Xe.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(t=>t.length>0))}return new Tn(e)}static emptyPath(){return new Tn([])}}const _n=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Cn extends bn{construct(t,e,n){return new Cn(t,e,n)}static isValidIdentifier(t){return _n.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Cn.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===En}static keyField(){return new Cn([En])}static fromServerFormat(t){const e=[];let n="",r=0;const s=()=>{if(0===n.length)throw new Ye(Xe.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new Ye(Xe.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new Ye(Xe.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(i=!i,r++):"."!==e||i?(n+=e,r++):(s(),r++)}if(s(),i)throw new Ye(Xe.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Cn(e)}static emptyPath(){return new Cn([])}}
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
 */class In{constructor(t){this.path=t}static fromPath(t){return new In(Tn.fromString(t))}static fromName(t){return new In(Tn.fromString(t).popFirst(5))}static empty(){return new In(Tn.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return null!==t&&0===Tn.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Tn.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new In(new Tn(t.slice()))}}
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
 */function Sn(t){return new An(t.readTime,t.key,-1)}class An{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new An(wn.min(),In.empty(),-1)}static max(){return new An(wn.max(),In.empty(),-1)}}function Dn(t,e){let n=t.readTime.compareTo(e.readTime);return 0!==n?n:(n=In.comparator(t.documentKey,e.documentKey),0!==n?n:ln(t.largestBatchId,e.largestBatchId)
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
 */)}class kn{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}
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
 */async function Nn(t){if(t.code!==Xe.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==t.message)throw t;qe("LocalStore","Unexpectedly lost primary lease")}
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
 */class xn{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&Ke(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new xn((n,r)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,r)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,r)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof xn?e:xn.resolve(e)}catch(e){return xn.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):xn.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):xn.reject(e)}static resolve(t){return new xn((e,n)=>{e(t)})}static reject(t){return new xn((e,n)=>{n(t)})}static waitFor(t){return new xn((e,n)=>{let r=0,s=0,i=!1;t.forEach(t=>{++r,t.next(()=>{++s,i&&s===r&&e()},t=>n(t))}),i=!0,s===r&&e()})}static or(t){let e=xn.resolve(!1);for(const n of t)e=e.next(t=>t?xn.resolve(t):n());return e}static forEach(t,e){const n=[];return t.forEach((t,r)=>{n.push(e.call(this,t,r))}),this.waitFor(n)}static mapArray(t,e){return new xn((n,r)=>{const s=t.length,i=new Array(s);let o=0;for(let a=0;a<s;a++){const c=a;e(t[c]).next(t=>{i[c]=t,++o,o===s&&n(i)},t=>r(t))}})}static doWhile(t,e){return new xn((n,r)=>{const s=()=>{!0===t()?e().next(()=>{s()},r):n()};s()})}}function Rn(t){return"IndexedDbTransactionError"===t.name}
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
 */class On{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.ue(t),this.ce=t=>e.writeSequenceNumber(t))}ue(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ce&&this.ce(t),t}}On.le=-1;function Ln(t){return null==t}function Mn(t){return 0===t&&1/t==-1/0}function Pn(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const e=t.charAt(s);switch(e){case"\0":n+="";break;case"":n+="";break;default:n+=e}}return n}function Vn(t){return t+""}
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
 */function Fn(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Un(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Bn(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
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
 */class jn{constructor(t,e){this.comparator=t,this.root=e||$n.EMPTY}insert(t,e){return new jn(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,$n.BLACK,null,null))}remove(t){return new jn(this.comparator,this.root.remove(t,this.comparator).copy(null,null,$n.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new qn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new qn(this.root,t,this.comparator,!1)}getReverseIterator(){return new qn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new qn(this.root,t,this.comparator,!0)}}class qn{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?n(t.key,e):1,e&&r&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(0===s){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class $n{constructor(t,e,n,r,s){this.key=t,this.value=e,this.color=null!=n?n:$n.RED,this.left=null!=r?r:$n.EMPTY,this.right=null!=s?s:$n.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,s){return new $n(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const s=n(t,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===s?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return $n.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return $n.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,$n.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,$n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Ke(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Ke(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw Ke(27949);return t+(this.isRed()?0:1)}}$n.EMPTY=null,$n.RED=!0,$n.BLACK=!1,$n.EMPTY=new class{constructor(){this.size=0}get key(){throw Ke(57766)}get value(){throw Ke(16141)}get color(){throw Ke(16727)}get left(){throw Ke(29726)}get right(){throw Ke(36894)}copy(t,e,n,r,s){return this}insert(t,e,n){return new $n(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class zn{constructor(t){this.comparator=t,this.data=new jn(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Hn(this.data.getIterator())}getIteratorFrom(t){return new Hn(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(t=>{e=e.add(t)}),e}isEqual(t){if(!(t instanceof zn))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new zn(this.comparator);return e.data=t,e}}class Hn{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
 */class Kn{constructor(t){this.fields=t,t.sort(Cn.comparator)}static empty(){return new Kn([])}unionWith(t){let e=new zn(Cn.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Kn(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return gn(this.fields,t.fields,(t,e)=>t.isEqual(e))}}
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
 */class Gn extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
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
 */class Qn{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(t){try{return atob(t)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new Gn("Invalid base64 string: "+e):e}}(t);return new Qn(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new Qn(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return ln(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Qn.EMPTY_BYTE_STRING=new Qn("");const Wn=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Xn(t){if(Qe(!!t,39018),"string"==typeof t){let e=0;const n=Wn.exec(t);if(Qe(!!n,46558,{timestamp:t}),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Yn(t.seconds),nanos:Yn(t.nanos)}}function Yn(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function Jn(t){return"string"==typeof t?Qn.fromBase64String(t):Qn.fromUint8Array(t)}
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
 */const Zn="server_timestamp",tr="__type__",er="__previous_value__",nr="__local_write_time__";function rr(t){var e,n;return(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{})[tr])||void 0===n?void 0:n.stringValue)===Zn}function sr(t){const e=t.mapValue.fields[er];return rr(e)?sr(e):e}function ir(t){const e=Xn(t.mapValue.fields[nr].timestampValue);return new vn(e.seconds,e.nanos)}
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
 */class or{constructor(t,e,n,r,s,i,o,a,c,u){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=u}}const ar="(default)";class cr{constructor(t,e){this.projectId=t,this.database=e||ar}static empty(){return new cr("","")}get isDefaultDatabase(){return this.database===ar}isEqual(t){return t instanceof cr&&t.projectId===this.projectId&&t.database===this.database}}
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
 */const ur="__type__",hr="__max__",lr={},dr="__vector__",fr="value";function pr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?rr(t)?4:function(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===hr}
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
 */(t)?9007199254740991:function(t){var e,n;return(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{})[ur])||void 0===n?void 0:n.stringValue)===dr}(t)?10:11:Ke(28295,{value:t})}function gr(t,e){if(t===e)return!0;const n=pr(t);if(n!==pr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return ir(t).isEqual(ir(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=Xn(t.timestampValue),r=Xn(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return r=e,Jn(t.bytesValue).isEqual(Jn(r.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return Yn(t.geoPointValue.latitude)===Yn(e.geoPointValue.latitude)&&Yn(t.geoPointValue.longitude)===Yn(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return Yn(t.integerValue)===Yn(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=Yn(t.doubleValue),r=Yn(e.doubleValue);return n===r?Mn(n)===Mn(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return gn(t.arrayValue.values||[],e.arrayValue.values||[],gr);case 10:case 11:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(Fn(n)!==Fn(r))return!1;for(const s in n)if(n.hasOwnProperty(s)&&(void 0===r[s]||!gr(n[s],r[s])))return!1;return!0}(t,e);default:return Ke(52216,{left:t})}var r}function mr(t,e){return void 0!==(t.values||[]).find(t=>gr(t,e))}function yr(t,e){if(t===e)return 0;const n=pr(t),r=pr(e);if(n!==r)return ln(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ln(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=Yn(t.integerValue||t.doubleValue),r=Yn(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return vr(t.timestampValue,e.timestampValue);case 4:return vr(ir(t),ir(e));case 5:return dn(t.stringValue,e.stringValue);case 6:return function(t,e){const n=Jn(t),r=Jn(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let s=0;s<n.length&&s<r.length;s++){const t=ln(n[s],r[s]);if(0!==t)return t}return ln(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=ln(Yn(t.latitude),Yn(e.latitude));return 0!==n?n:ln(Yn(t.longitude),Yn(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return wr(t.arrayValue,e.arrayValue);case 10:return function(t,e){var n,r,s,i;const o=t.fields||{},a=e.fields||{},c=null===(n=o[fr])||void 0===n?void 0:n.arrayValue,u=null===(r=a[fr])||void 0===r?void 0:r.arrayValue,h=ln((null===(s=null==c?void 0:c.values)||void 0===s?void 0:s.length)||0,(null===(i=null==u?void 0:u.values)||void 0===i?void 0:i.length)||0);return 0!==h?h:wr(c,u)}(t.mapValue,e.mapValue);case 11:return function(t,e){if(t===lr&&e===lr)return 0;if(t===lr)return 1;if(e===lr)return-1;const n=t.fields||{},r=Object.keys(n),s=e.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let o=0;o<r.length&&o<i.length;++o){const t=dn(r[o],i[o]);if(0!==t)return t;const e=yr(n[r[o]],s[i[o]]);if(0!==e)return e}return ln(r.length,i.length)}(t.mapValue,e.mapValue);default:throw Ke(23264,{Pe:n})}}function vr(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return ln(t,e);const n=Xn(t),r=Xn(e),s=ln(n.seconds,r.seconds);return 0!==s?s:ln(n.nanos,r.nanos)}function wr(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const t=yr(n[s],r[s]);if(t)return t}return ln(n.length,r.length)}function Er(t){return br(t)}function br(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=Xn(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?Jn(t.bytesValue).toBase64():"referenceValue"in t?function(t){return In.fromName(t).toString()}(t.referenceValue):"geoPointValue"in t?function(t){return`geo(${t.latitude},${t.longitude})`}(t.geoPointValue):"arrayValue"in t?function(t){let e="[",n=!0;for(const r of t.values||[])n?n=!1:e+=",",e+=br(r);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",r=!0;for(const s of e)r?r=!1:n+=",",n+=`${s}:${br(t.fields[s])}`;return n+"}"}(t.mapValue):Ke(61005,{value:t})}function Tr(t){switch(pr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=sr(t);return e?16+Tr(e):16;case 5:return 2*t.stringValue.length;case 6:return Jn(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(t.arrayValue.values||[]).reduce((t,e)=>t+Tr(e),0);case 10:case 11:return function(t){let e=0;return Un(t.fields,(t,n)=>{e+=t.length+Tr(n)}),e}(t.mapValue);default:throw Ke(13486,{value:t})}}function _r(t){return!!t&&"integerValue"in t}function Cr(t){return!!t&&"arrayValue"in t}function Ir(t){return!!t&&"nullValue"in t}function Sr(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ar(t){return!!t&&"mapValue"in t}function Dr(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Un(t.mapValue.fields,(t,n)=>e.mapValue.fields[t]=Dr(n)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Dr(t.arrayValue.values[n]);return e}return Object.assign({},t)}class kr{constructor(t){this.value=t}static empty(){return new kr({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Ar(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Dr(e)}setAll(t){let e=Cn.emptyPath(),n={},r=[];t.forEach((t,s)=>{if(!e.isImmediateParentOf(s)){const t=this.getFieldsMap(e);this.applyChanges(t,n,r),n={},r=[],e=s.popLast()}t?n[s.lastSegment()]=Dr(t):r.push(s.lastSegment())});const s=this.getFieldsMap(e);this.applyChanges(s,n,r)}delete(t){const e=this.field(t.popLast());Ar(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return gr(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let r=e.mapValue.fields[t.get(n)];Ar(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,n){Un(e,(e,n)=>t[e]=n);for(const r of n)delete t[r]}clone(){return new kr(Dr(this.value))}}function Nr(t){const e=[];return Un(t.fields,(t,n)=>{const r=new Cn([t]);if(Ar(n)){const t=Nr(n.mapValue).fields;if(0===t.length)e.push(r);else for(const n of t)e.push(r.child(n))}else e.push(r)}),new Kn(e)
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
 */}class xr{constructor(t,e,n,r,s,i,o){this.key=t,this.documentType=e,this.version=n,this.readTime=r,this.createTime=s,this.data=i,this.documentState=o}static newInvalidDocument(t){return new xr(t,0,wn.min(),wn.min(),wn.min(),kr.empty(),0)}static newFoundDocument(t,e,n,r){return new xr(t,1,e,wn.min(),n,r,0)}static newNoDocument(t,e){return new xr(t,2,e,wn.min(),wn.min(),kr.empty(),0)}static newUnknownDocument(t,e){return new xr(t,3,e,wn.min(),wn.min(),kr.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(wn.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=kr.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=kr.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=wn.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof xr&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new xr(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class Rr{constructor(t,e){this.position=t,this.inclusive=e}}function Or(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(r=i.field.isKeyField()?In.comparator(In.fromName(o.referenceValue),n.key):yr(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return r}function Lr(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!gr(t.position[n],e.position[n]))return!1;return!0}
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
 */class Mr{constructor(t,e="asc"){this.field=t,this.dir=e}}function Pr(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}
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
 */class Vr{}class Fr extends Vr{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.createKeyFieldInFilter(t,e,n):new Hr(t,e,n):"array-contains"===e?new Wr(t,n):"in"===e?new Xr(t,n):"not-in"===e?new Yr(t,n):"array-contains-any"===e?new Jr(t,n):new Fr(t,e,n)}static createKeyFieldInFilter(t,e,n){return"in"===e?new Kr(t,n):new Gr(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&void 0===e.nullValue&&this.matchesComparison(yr(e,this.value)):null!==e&&pr(this.value)===pr(e)&&this.matchesComparison(yr(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return Ke(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ur extends Vr{constructor(t,e){super(),this.filters=t,this.op=e,this.Te=null}static create(t,e){return new Ur(t,e)}matches(t){return Br(this)?void 0===this.filters.find(e=>!e.matches(t)):void 0!==this.filters.find(e=>e.matches(t))}getFlattenedFilters(){return null!==this.Te||(this.Te=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function Br(t){return"and"===t.op}function jr(t){return function(t){for(const e of t.filters)if(e instanceof Ur)return!1;return!0}(t)&&Br(t)}function qr(t){if(t instanceof Fr)return t.field.canonicalString()+t.op.toString()+Er(t.value);if(jr(t))return t.filters.map(t=>qr(t)).join(",");{const e=t.filters.map(t=>qr(t)).join(",");return`${t.op}(${e})`}}function $r(t,e){return t instanceof Fr?(n=t,(r=e)instanceof Fr&&n.op===r.op&&n.field.isEqual(r.field)&&gr(n.value,r.value)):t instanceof Ur?function(t,e){return e instanceof Ur&&t.op===e.op&&t.filters.length===e.filters.length&&t.filters.reduce((t,n,r)=>t&&$r(n,e.filters[r]),!0)}(t,e):void Ke(19439);var n,r}function zr(t){return t instanceof Fr?`${(e=t).field.canonicalString()} ${e.op} ${Er(e.value)}`:t instanceof Ur?function(t){return t.op.toString()+" {"+t.getFilters().map(zr).join(" ,")+"}"}(t):"Filter";var e}class Hr extends Fr{constructor(t,e,n){super(t,e,n),this.key=In.fromName(n.referenceValue)}matches(t){const e=In.comparator(t.key,this.key);return this.matchesComparison(e)}}class Kr extends Fr{constructor(t,e){super(t,"in",e),this.keys=Qr("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Gr extends Fr{constructor(t,e){super(t,"not-in",e),this.keys=Qr("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Qr(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map(t=>In.fromName(t.referenceValue))}class Wr extends Fr{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Cr(e)&&mr(e.arrayValue,this.value)}}class Xr extends Fr{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&mr(this.value.arrayValue,e)}}class Yr extends Fr{constructor(t,e){super(t,"not-in",e)}matches(t){if(mr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&void 0===e.nullValue&&!mr(this.value.arrayValue,e)}}class Jr extends Fr{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Cr(e)||!e.arrayValue.values)&&e.arrayValue.values.some(t=>mr(this.value.arrayValue,t))}}
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
 */class Zr{constructor(t,e=null,n=[],r=[],s=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.Ie=null}}function ts(t,e=null,n=[],r=[],s=null,i=null,o=null){return new Zr(t,e,n,r,s,i,o)}function es(t){const e=We(t);if(null===e.Ie){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(t=>qr(t)).join(","),t+="|ob:",t+=e.orderBy.map(t=>{return(e=t).field.canonicalString()+e.dir;var e}).join(","),Ln(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(t=>Er(t)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(t=>Er(t)).join(",")),e.Ie=t}return e.Ie}function ns(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Pr(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!$r(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Lr(t.startAt,e.startAt)&&Lr(t.endAt,e.endAt)}function rs(t){return In.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}
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
 */class ss{constructor(t,e=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function is(t){return new ss(t)}function os(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}function as(t){const e=We(t);if(null===e.Ee){e.Ee=[];const t=new Set;for(const r of e.explicitOrderBy)e.Ee.push(r),t.add(r.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(t){let e=new zn(Cn.comparator);return t.filters.forEach(t=>{t.getFlattenedFilters().forEach(t=>{t.isInequality()&&(e=e.add(t.field))})}),e})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.Ee.push(new Mr(r,n))}),t.has(Cn.keyField().canonicalString())||e.Ee.push(new Mr(Cn.keyField(),n))}return e.Ee}function cs(t){const e=We(t);return e.de||(e.de=function(t,e){if("F"===t.limitType)return ts(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(t=>{const e="desc"===t.dir?"asc":"desc";return new Mr(t.field,e)});const n=t.endAt?new Rr(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Rr(t.startAt.position,t.startAt.inclusive):null;return ts(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}(e,as(t))),e.de}function us(t,e,n){return new ss(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function hs(t,e){return ns(cs(t),cs(e))&&t.limitType===e.limitType}function ls(t){return`${es(cs(t))}|lt:${t.limitType}`}function ds(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map(t=>zr(t)).join(", ")}]`),Ln(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map(t=>{return`${(e=t).field.canonicalString()} (${e.dir})`;var e}).join(", ")}]`),t.startAt&&(e+=", startAt: ",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(t=>Er(t)).join(",")),t.endAt&&(e+=", endAt: ",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(t=>Er(t)).join(",")),`Target(${e})`}(cs(t))}; limitType=${t.limitType})`}function fs(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):In.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of as(t))if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&(r=e,!((n=t).startAt&&!function(t,e,n){const r=Or(t,e,n);return t.inclusive?r<=0:r<0}(n.startAt,as(n),r)||n.endAt&&!function(t,e,n){const r=Or(t,e,n);return t.inclusive?r>=0:r>0}(n.endAt,as(n),r)));var n,r}function ps(t){return(e,n)=>{let r=!1;for(const s of as(t)){const t=gs(s,e,n);if(0!==t)return t;r=r||s.field.isKeyField()}return 0}}function gs(t,e,n){const r=t.field.isKeyField()?In.comparator(e.key,n.key):function(t,e,n){const r=e.data.field(t),s=n.data.field(t);return null!==r&&null!==s?yr(r,s):Ke(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return Ke(19790,{direction:t.dir})}}
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
 */class ms{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[r,s]of n)if(this.equalsFn(r,t))return s}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),r=this.inner[n];if(void 0===r)return this.inner[n]=[[t,e]],void this.innerSize++;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return void(r[s]=[t,e]);r.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],t))return 1===n.length?delete this.inner[e]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(t){Un(this.inner,(e,n)=>{for(const[r,s]of n)t(r,s)})}isEmpty(){return Bn(this.inner)}size(){return this.innerSize}}
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
 */const ys=new jn(In.comparator);function vs(){return ys}const ws=new jn(In.comparator);function Es(...t){let e=ws;for(const n of t)e=e.insert(n.key,n);return e}function bs(t){let e=ws;return t.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function Ts(){return Cs()}function _s(){return Cs()}function Cs(){return new ms(t=>t.toString(),(t,e)=>t.isEqual(e))}const Is=new jn(In.comparator),Ss=new zn(In.comparator);function As(...t){let e=Ss;for(const n of t)e=e.add(n);return e}const Ds=new zn(ln);
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
function ks(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Mn(e)?"-0":e}}function Ns(t){return{integerValue:""+t}}function xs(t,e){return function(t){return"number"==typeof t&&Number.isInteger(t)&&!Mn(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
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
 */(e)?Ns(e):ks(t,e)}
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
 */class Rs{constructor(){this._=void 0}}function Os(t,e,n){return t instanceof Ps?function(t,e){const n={fields:{[tr]:{stringValue:Zn},[nr]:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&rr(e)&&(e=sr(e)),e&&(n.fields[er]=e),{mapValue:n}}(n,e):t instanceof Vs?Fs(t,e):t instanceof Us?Bs(t,e):function(t,e){const n=Ms(t,e),r=qs(n)+qs(t.Re);return _r(n)&&_r(t.Re)?Ns(r):ks(t.serializer,r)}(t,e)}function Ls(t,e,n){return t instanceof Vs?Fs(t,e):t instanceof Us?Bs(t,e):n}function Ms(t,e){return t instanceof js?_r(n=e)||(r=n)&&"doubleValue"in r?e:{integerValue:0}:null;var n,r}class Ps extends Rs{}class Vs extends Rs{constructor(t){super(),this.elements=t}}function Fs(t,e){const n=$s(e);for(const r of t.elements)n.some(t=>gr(t,r))||n.push(r);return{arrayValue:{values:n}}}class Us extends Rs{constructor(t){super(),this.elements=t}}function Bs(t,e){let n=$s(e);for(const r of t.elements)n=n.filter(t=>!gr(t,r));return{arrayValue:{values:n}}}class js extends Rs{constructor(t,e){super(),this.serializer=t,this.Re=e}}function qs(t){return Yn(t.integerValue||t.doubleValue)}function $s(t){return Cr(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
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
 */class zs{constructor(t,e){this.field=t,this.transform=e}}class Hs{constructor(t,e){this.version=t,this.transformResults=e}}class Ks{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Ks}static exists(t){return new Ks(void 0,t)}static updateTime(t){return new Ks(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Gs(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class Qs{}function Ws(t,e){if(!t.hasLocalMutations||e&&0===e.fields.length)return null;if(null===e)return t.isNoDocument()?new ii(t.key,Ks.none()):new ti(t.key,t.data,Ks.none());{const n=t.data,r=kr.empty();let s=new zn(Cn.comparator);for(let t of e.fields)if(!s.has(t)){let e=n.field(t);null===e&&t.length>1&&(t=t.popLast(),e=n.field(t)),null===e?r.delete(t):r.set(t,e),s=s.add(t)}return new ei(t.key,r,new Kn(s.toArray()),Ks.none())}}function Xs(t,e,n){var r;t instanceof ti?function(t,e,n){const r=t.value.clone(),s=ri(t.fieldTransforms,e,n.transformResults);r.setAll(s),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):t instanceof ei?function(t,e,n){if(!Gs(t.precondition,e))return void e.convertToUnknownDocument(n.version);const r=ri(t.fieldTransforms,e,n.transformResults),s=e.data;s.setAll(ni(t)),s.setAll(r),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):(r=n,e.convertToNoDocument(r.version).setHasCommittedMutations())}function Ys(t,e,n,r){return t instanceof ti?function(t,e,n,r){if(!Gs(t.precondition,e))return n;const s=t.value.clone(),i=si(t.fieldTransforms,r,e);return s.setAll(i),e.convertToFoundDocument(e.version,s).setHasLocalMutations(),null}(t,e,n,r):t instanceof ei?function(t,e,n,r){if(!Gs(t.precondition,e))return n;const s=si(t.fieldTransforms,r,e),i=e.data;return i.setAll(ni(t)),i.setAll(s),e.convertToFoundDocument(e.version,i).setHasLocalMutations(),null===n?null:n.unionWith(t.fieldMask.fields).unionWith(t.fieldTransforms.map(t=>t.field))}(t,e,n,r):(s=e,i=n,Gs(t.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):i);var s,i}function Js(t,e){let n=null;for(const r of t.fieldTransforms){const t=e.data.field(r.field),s=Ms(r.transform,t||null);null!=s&&(null===n&&(n=kr.empty()),n.set(r.field,s))}return n||null}function Zs(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&(n=t.fieldTransforms,r=e.fieldTransforms,!!(void 0===n&&void 0===r||n&&r&&gn(n,r,(t,e)=>function(t,e){return t.field.isEqual(e.field)&&(n=t.transform,r=e.transform,n instanceof Vs&&r instanceof Vs||n instanceof Us&&r instanceof Us?gn(n.elements,r.elements,gr):n instanceof js&&r instanceof js?gr(n.Re,r.Re):n instanceof Ps&&r instanceof Ps);var n,r}(t,e)))&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask)));var n,r}class ti extends Qs{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class ei extends Qs{constructor(t,e,n,r,s=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function ni(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function ri(t,e,n){const r=new Map;Qe(t.length===n.length,32656,{Ve:n.length,me:t.length});for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,Ls(o,a,n[s]))}return r}function si(t,e,n){const r=new Map;for(const s of t){const t=s.transform,i=n.data.field(s.field);r.set(s.field,Os(t,i,e))}return r}class ii extends Qs{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class oi extends Qs{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
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
 */class ai{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let r=0;r<this.mutations.length;r++){const e=this.mutations[r];e.key.isEqual(t.key)&&Xs(e,t,n[r])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=Ys(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=Ys(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=_s();return this.mutations.forEach(r=>{const s=t.get(r.key),i=s.overlayedDocument;let o=this.applyToLocalView(i,s.mutatedFields);o=e.has(r.key)?null:o;const a=Ws(i,o);null!==a&&n.set(r.key,a),i.isValidDocument()||i.convertToNoDocument(wn.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),As())}isEqual(t){return this.batchId===t.batchId&&gn(this.mutations,t.mutations,(t,e)=>Zs(t,e))&&gn(this.baseMutations,t.baseMutations,(t,e)=>Zs(t,e))}}class ci{constructor(t,e,n,r){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=r}static from(t,e,n){Qe(t.mutations.length===n.length,58842,{fe:t.mutations.length,ge:n.length});let r=function(){return Is}();const s=t.mutations;for(let i=0;i<s.length;i++)r=r.insert(s[i].key,n[i].version);return new ci(t,e,n,r)}}
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
 */class ui{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return null!==t&&this.mutation===t.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
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
 */class hi{constructor(t,e){this.count=t,this.unchangedNames=e}}
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
 */var li,di;function fi(t){if(void 0===t)return $e("GRPC error has no .code"),Xe.UNKNOWN;switch(t){case li.OK:return Xe.OK;case li.CANCELLED:return Xe.CANCELLED;case li.UNKNOWN:return Xe.UNKNOWN;case li.DEADLINE_EXCEEDED:return Xe.DEADLINE_EXCEEDED;case li.RESOURCE_EXHAUSTED:return Xe.RESOURCE_EXHAUSTED;case li.INTERNAL:return Xe.INTERNAL;case li.UNAVAILABLE:return Xe.UNAVAILABLE;case li.UNAUTHENTICATED:return Xe.UNAUTHENTICATED;case li.INVALID_ARGUMENT:return Xe.INVALID_ARGUMENT;case li.NOT_FOUND:return Xe.NOT_FOUND;case li.ALREADY_EXISTS:return Xe.ALREADY_EXISTS;case li.PERMISSION_DENIED:return Xe.PERMISSION_DENIED;case li.FAILED_PRECONDITION:return Xe.FAILED_PRECONDITION;case li.ABORTED:return Xe.ABORTED;case li.OUT_OF_RANGE:return Xe.OUT_OF_RANGE;case li.UNIMPLEMENTED:return Xe.UNIMPLEMENTED;case li.DATA_LOSS:return Xe.DATA_LOSS;default:return Ke(39323,{code:t})}}(di=li||(li={}))[di.OK=0]="OK",di[di.CANCELLED=1]="CANCELLED",di[di.UNKNOWN=2]="UNKNOWN",di[di.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",di[di.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",di[di.NOT_FOUND=5]="NOT_FOUND",di[di.ALREADY_EXISTS=6]="ALREADY_EXISTS",di[di.PERMISSION_DENIED=7]="PERMISSION_DENIED",di[di.UNAUTHENTICATED=16]="UNAUTHENTICATED",di[di.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",di[di.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",di[di.ABORTED=10]="ABORTED",di[di.OUT_OF_RANGE=11]="OUT_OF_RANGE",di[di.UNIMPLEMENTED=12]="UNIMPLEMENTED",di[di.INTERNAL=13]="INTERNAL",di[di.UNAVAILABLE=14]="UNAVAILABLE",di[di.DATA_LOSS=15]="DATA_LOSS";
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
const pi=new Ce([4294967295,4294967295],0);function gi(t){const e=un().encode(t),n=new Ie;return n.update(e),new Uint8Array(n.digest())}function mi(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Ce([n,r],0),new Ce([s,i],0)]}class yi{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new vi(`Invalid padding: ${e}`);if(n<0)throw new vi(`Invalid hash count: ${n}`);if(t.length>0&&0===this.hashCount)throw new vi(`Invalid hash count: ${n}`);if(0===t.length&&0!==e)throw new vi(`Invalid padding when bitmap length is 0: ${e}`);this.pe=8*t.length-e,this.ye=Ce.fromNumber(this.pe)}we(t,e,n){let r=t.add(e.multiply(Ce.fromNumber(n)));return 1===r.compare(pi)&&(r=new Ce([r.getBits(0),r.getBits(1)],0)),r.modulo(this.ye).toNumber()}be(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(0===this.pe)return!1;const e=gi(t),[n,r]=mi(e);for(let s=0;s<this.hashCount;s++){const t=this.we(n,r,s);if(!this.be(t))return!1}return!0}static create(t,e,n){const r=t%8==0?0:8-t%8,s=new Uint8Array(Math.ceil(t/8)),i=new yi(s,r,e);return n.forEach(t=>i.insert(t)),i}insert(t){if(0===this.pe)return;const e=gi(t),[n,r]=mi(e);for(let s=0;s<this.hashCount;s++){const t=this.we(n,r,s);this.Se(t)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class vi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
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
 */class wi{constructor(t,e,n,r,s){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const r=new Map;return r.set(t,Ei.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new wi(wn.min(),r,new jn(ln),vs(),As())}}class Ei{constructor(t,e,n,r,s){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Ei(n,e,As(),As(),As())}}
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
 */class bi{constructor(t,e,n,r){this.De=t,this.removedTargetIds=e,this.key=n,this.ve=r}}class Ti{constructor(t,e){this.targetId=t,this.Ce=e}}class _i{constructor(t,e,n=Qn.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=r}}class Ci{constructor(){this.Fe=0,this.Me=Ai(),this.xe=Qn.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return 0!==this.Fe}get Le(){return this.Ne}ke(t){t.approximateByteSize()>0&&(this.Ne=!0,this.xe=t)}qe(){let t=As(),e=As(),n=As();return this.Me.forEach((r,s)=>{switch(s){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:n=n.add(r);break;default:Ke(38017,{changeType:s})}}),new Ei(this.xe,this.Oe,t,e,n)}Qe(){this.Ne=!1,this.Me=Ai()}$e(t,e){this.Ne=!0,this.Me=this.Me.insert(t,e)}Ue(t){this.Ne=!0,this.Me=this.Me.remove(t)}Ke(){this.Fe+=1}We(){this.Fe-=1,Qe(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class Ii{constructor(t){this.ze=t,this.je=new Map,this.He=vs(),this.Je=Si(),this.Ye=Si(),this.Ze=new jn(ln)}Xe(t){for(const e of t.De)t.ve&&t.ve.isFoundDocument()?this.et(e,t.ve):this.tt(e,t.key,t.ve);for(const e of t.removedTargetIds)this.tt(e,t.key,t.ve)}nt(t){this.forEachTarget(t,e=>{const n=this.rt(e);switch(t.state){case 0:this.it(e)&&n.ke(t.resumeToken);break;case 1:n.We(),n.Be||n.Qe(),n.ke(t.resumeToken);break;case 2:n.We(),n.Be||this.removeTarget(e);break;case 3:this.it(e)&&(n.Ge(),n.ke(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),n.ke(t.resumeToken));break;default:Ke(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach((t,n)=>{this.it(n)&&e(n)})}ot(t){const e=t.targetId,n=t.Ce.count,r=this._t(e);if(r){const s=r.target;if(rs(s))if(0===n){const t=new In(s.path);this.tt(e,t,xr.newNoDocument(t,wn.min()))}else Qe(1===n,20013,{expectedCount:n});else{const r=this.ut(e);if(r!==n){const n=this.ct(t),s=n?this.lt(n,t,r):1;if(0!==s){this.st(e);const t=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,t)}}}}}ct(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:s=0}=e;let i,o;try{i=Jn(n).toUint8Array()}catch(a){if(a instanceof Gn)return ze("Decoding the base64 bloom filter in existence filter failed ("+a.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw a}try{o=new yi(i,r,s)}catch(a){return ze(a instanceof vi?"BloomFilter error: ":"Applying bloom filter failed: ",a),null}return 0===o.pe?null:o}lt(t,e,n){return e.Ce.count===n-this.Tt(t,e.targetId)?0:2}Tt(t,e){const n=this.ze.getRemoteKeysForTarget(e);let r=0;return n.forEach(n=>{const s=this.ze.Pt(),i=`projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;t.mightContain(i)||(this.tt(e,n,null),r++)}),r}It(t){const e=new Map;this.je.forEach((n,r)=>{const s=this._t(r);if(s){if(n.current&&rs(s.target)){const e=new In(s.target.path);this.Et(e).has(r)||this.dt(r,e)||this.tt(r,e,xr.newNoDocument(e,t))}n.Le&&(e.set(r,n.qe()),n.Qe())}});let n=As();this.Ye.forEach((t,e)=>{let r=!0;e.forEachWhile(t=>{const e=this._t(t);return!e||"TargetPurposeLimboResolution"===e.purpose||(r=!1,!1)}),r&&(n=n.add(t))}),this.He.forEach((e,n)=>n.setReadTime(t));const r=new wi(t,e,this.Ze,this.He,n);return this.He=vs(),this.Je=Si(),this.Ye=Si(),this.Ze=new jn(ln),r}et(t,e){if(!this.it(t))return;const n=this.dt(t,e.key)?2:0;this.rt(t).$e(e.key,n),this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.Ye=this.Ye.insert(e.key,this.At(e.key).add(t))}tt(t,e,n){if(!this.it(t))return;const r=this.rt(t);this.dt(t,e)?r.$e(e,1):r.Ue(e),this.Ye=this.Ye.insert(e,this.At(e).delete(t)),this.Ye=this.Ye.insert(e,this.At(e).add(t)),n&&(this.He=this.He.insert(e,n))}removeTarget(t){this.je.delete(t)}ut(t){const e=this.rt(t).qe();return this.ze.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ke(t){this.rt(t).Ke()}rt(t){let e=this.je.get(t);return e||(e=new Ci,this.je.set(t,e)),e}At(t){let e=this.Ye.get(t);return e||(e=new zn(ln),this.Ye=this.Ye.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new zn(ln),this.Je=this.Je.insert(t,e)),e}it(t){const e=null!==this._t(t);return e||qe("WatchChangeAggregator","Detected inactive target",t),e}_t(t){const e=this.je.get(t);return e&&e.Be?null:this.ze.Rt(t)}st(t){this.je.set(t,new Ci),this.ze.getRemoteKeysForTarget(t).forEach(e=>{this.tt(t,e,null)})}dt(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function Si(){return new jn(In.comparator)}function Ai(){return new jn(In.comparator)}const Di=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),ki=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Ni=(()=>({and:"AND",or:"OR"}))();class xi{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Ri(t,e){return t.useProto3Json||Ln(e)?e:{value:e}}function Oi(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Li(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Mi(t,e){return Oi(t,e.toTimestamp())}function Pi(t){return Qe(!!t,49232),wn.fromTimestamp(function(t){const e=Xn(t);return new vn(e.seconds,e.nanos)}(t))}function Vi(t,e){return Fi(t,e).canonicalString()}function Fi(t,e){const n=(r=t,new Tn(["projects",r.projectId,"databases",r.database])).child("documents");var r;return void 0===e?n:n.child(e)}function Ui(t){const e=Tn.fromString(t);return Qe(ro(e),10190,{key:e.toString()}),e}function Bi(t,e){return Vi(t.databaseId,e.path)}function ji(t,e){const n=Ui(e);if(n.get(1)!==t.databaseId.projectId)throw new Ye(Xe.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Ye(Xe.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new In(zi(n))}function qi(t,e){return Vi(t.databaseId,e)}function $i(t){return new Tn(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function zi(t){return Qe(t.length>4&&"documents"===t.get(4),29091,{key:t.toString()}),t.popFirst(5)}function Hi(t,e,n){return{name:Bi(t,e),fields:n.value.mapValue.fields}}function Ki(t,e){return{documents:[qi(t,e.path)]}}function Gi(t,e){const n={structuredQuery:{}},r=e.path;let s;null!==e.collectionGroup?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=qi(t,s);const i=function(t){if(0!==t.length)return eo(Ur.create(t,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(t){if(0!==t.length)return t.map(t=>{return{field:Zi((e=t).field),direction:Xi(e.dir)};var e})}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Ri(t,e.limit);return null!==a&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt={before:(c=e.startAt).inclusive,values:c.position}),e.endAt&&(n.structuredQuery.endAt=function(t){return{before:!t.inclusive,values:t.position}}(e.endAt)),{gt:n,parent:s};var c}function Qi(t){let e=function(t){const e=Ui(t);return 4===e.length?Tn.emptyPath():zi(e)}(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Qe(1===r,65062);const t=n.from[0];t.allDescendants?s=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=function(t){const e=Wi(t);return e instanceof Ur&&jr(e)?e.getFilters():[e]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(t=>{return new Mr(to((e=t).field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction));var e}));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,Ln(e)?null:e}(n.limit));let c=null;n.startAt&&(c=function(t){const e=!!t.before,n=t.values||[];return new Rr(n,e)}(n.startAt));let u=null;return n.endAt&&(u=function(t){const e=!t.before,n=t.values||[];return new Rr(n,e)}(n.endAt)),function(t,e,n,r,s,i,o,a){return new ss(t,e,n,r,s,i,o,a)}(e,s,o,i,a,"F",c,u)}function Wi(t){return void 0!==t.unaryFilter?function(t){switch(t.unaryFilter.op){case"IS_NAN":const e=to(t.unaryFilter.field);return Fr.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=to(t.unaryFilter.field);return Fr.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=to(t.unaryFilter.field);return Fr.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=to(t.unaryFilter.field);return Fr.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Ke(61313);default:return Ke(60726)}}(t):void 0!==t.fieldFilter?(e=t,Fr.create(to(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Ke(58110);default:return Ke(50506)}}(e.fieldFilter.op),e.fieldFilter.value)):void 0!==t.compositeFilter?function(t){return Ur.create(t.compositeFilter.filters.map(t=>Wi(t)),function(t){switch(t){case"AND":return"and";case"OR":return"or";default:return Ke(1026)}}(t.compositeFilter.op))}(t):Ke(30097,{filter:t});var e}function Xi(t){return Di[t]}function Yi(t){return ki[t]}function Ji(t){return Ni[t]}function Zi(t){return{fieldPath:t.canonicalString()}}function to(t){return Cn.fromServerFormat(t.fieldPath)}function eo(t){return t instanceof Fr?function(t){if("=="===t.op){if(Sr(t.value))return{unaryFilter:{field:Zi(t.field),op:"IS_NAN"}};if(Ir(t.value))return{unaryFilter:{field:Zi(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(Sr(t.value))return{unaryFilter:{field:Zi(t.field),op:"IS_NOT_NAN"}};if(Ir(t.value))return{unaryFilter:{field:Zi(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Zi(t.field),op:Yi(t.op),value:t.value}}}(t):t instanceof Ur?function(t){const e=t.getFilters().map(t=>eo(t));return 1===e.length?e[0]:{compositeFilter:{op:Ji(t.op),filters:e}}}(t):Ke(54877,{filter:t})}function no(t){const e=[];return t.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ro(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
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
 */class so{constructor(t,e,n,r,s=wn.min(),i=wn.min(),o=Qn.EMPTY_BYTE_STRING,a=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(t){return new so(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new so(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new so(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new so(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}
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
 */class io{constructor(t){this.wt=t}}function oo(t){const e=Qi({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?us(e,e.limit,"L"):e}
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
 */class ao{constructor(){this.Cn=new co}addToCollectionParentIndex(t,e){return this.Cn.add(e),xn.resolve()}getCollectionParents(t,e){return xn.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return xn.resolve()}deleteFieldIndex(t,e){return xn.resolve()}deleteAllFieldIndexes(t){return xn.resolve()}createTargetIndexes(t,e){return xn.resolve()}getDocumentsMatchingTarget(t,e){return xn.resolve(null)}getIndexType(t,e){return xn.resolve(0)}getFieldIndexes(t,e){return xn.resolve([])}getNextCollectionGroupToUpdate(t){return xn.resolve(null)}getMinOffset(t,e){return xn.resolve(An.min())}getMinOffsetFromCollectionGroup(t,e){return xn.resolve(An.min())}updateCollectionGroup(t,e,n){return xn.resolve()}updateIndexEntries(t,e){return xn.resolve()}}class co{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e]||new zn(Tn.comparator),s=!r.has(n);return this.index[e]=r.add(n),s}has(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e];return r&&r.has(n)}getEntries(t){return(this.index[t]||new zn(Tn.comparator)).toArray()}}
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
 */const uo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ho=41943040;class lo{static withCacheSize(t){return new lo(t,lo.DEFAULT_COLLECTION_PERCENTILE,lo.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}
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
 */lo.DEFAULT_COLLECTION_PERCENTILE=10,lo.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,lo.DEFAULT=new lo(ho,lo.DEFAULT_COLLECTION_PERCENTILE,lo.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),lo.DISABLED=new lo(-1,0,0);
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
class fo{constructor(t){this.ur=t}next(){return this.ur+=2,this.ur}static cr(){return new fo(0)}static lr(){return new fo(-1)}}
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
 */const po="LruGarbageCollector";function go([t,e],[n,r]){const s=ln(t,n);return 0===s?ln(e,r):s}class mo{constructor(t){this.Er=t,this.buffer=new zn(go),this.dr=0}Ar(){return++this.dr}Rr(t){const e=[t,this.Ar()];if(this.buffer.size<this.Er)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();go(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class yo{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Vr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.mr(6e4)}stop(){this.Vr&&(this.Vr.cancel(),this.Vr=null)}get started(){return null!==this.Vr}mr(t){qe(po,`Garbage collection scheduled in ${t}ms`),this.Vr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Vr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Rn(t)?qe(po,"Ignoring IndexedDB error during garbage collection: ",t):await Nn(t)}await this.mr(3e5)})}}class vo{constructor(t,e){this.gr=t,this.params=e}calculateTargetCount(t,e){return this.gr.pr(t).next(t=>Math.floor(e/100*t))}nthSequenceNumber(t,e){if(0===e)return xn.resolve(On.le);const n=new mo(e);return this.gr.forEachTarget(t,t=>n.Rr(t.sequenceNumber)).next(()=>this.gr.yr(t,t=>n.Rr(t))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.gr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.gr.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(qe("LruGarbageCollector","Garbage collection skipped; disabled"),xn.resolve(uo)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(qe("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),uo):this.wr(t,e))}getCacheSize(t){return this.gr.getCacheSize(t)}wr(t,e){let n,r,s,i,o,a,c;const u=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(e=>(e>this.params.maximumSequenceNumbersToCollect?(qe("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),r=this.params.maximumSequenceNumbersToCollect):r=e,i=Date.now(),this.nthSequenceNumber(t,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(t,n,e))).next(e=>(s=e,a=Date.now(),this.removeOrphanedDocuments(t,n))).next(t=>(c=Date.now(),je()<=st.DEBUG&&qe("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-u}ms\n\tDetermined least recently used ${r} in `+(o-i)+`ms\n\tRemoved ${s} targets in `+(a-o)+`ms\n\tRemoved ${t} documents in `+(c-a)+`ms\nTotal Duration: ${c-u}ms`),xn.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:t})))}}
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
class wo{constructor(){this.changes=new ms(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,xr.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?xn.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
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
 */class Eo{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}
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
 */class bo{constructor(t,e,n,r){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=r}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(r=>(n=r,this.remoteDocumentCache.getEntry(t,e))).next(t=>(null!==n&&Ys(n.mutation,t,Kn.empty(),vn.now()),t))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.getLocalViewOfDocuments(t,e,As()).next(()=>e))}getLocalViewOfDocuments(t,e,n=As()){const r=Ts();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,n).next(t=>{let e=Es();return t.forEach((t,n)=>{e=e.insert(t,n.overlayedDocument)}),e}))}getOverlayedDocuments(t,e){const n=Ts();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,As()))}populateOverlays(t,e,n){const r=[];return n.forEach(t=>{e.has(t)||r.push(t)}),this.documentOverlayCache.getOverlays(t,r).next(t=>{t.forEach((t,n)=>{e.set(t,n)})})}computeViews(t,e,n,r){let s=vs();const i=Cs(),o=Cs();return e.forEach((t,e)=>{const o=n.get(e.key);r.has(e.key)&&(void 0===o||o.mutation instanceof ei)?s=s.insert(e.key,e):void 0!==o?(i.set(e.key,o.mutation.getFieldMask()),Ys(o.mutation,e,o.mutation.getFieldMask(),vn.now())):i.set(e.key,Kn.empty())}),this.recalculateAndSaveOverlays(t,s).next(t=>(t.forEach((t,e)=>i.set(t,e)),e.forEach((t,e)=>{var n;return o.set(t,new Eo(e,null!==(n=i.get(t))&&void 0!==n?n:null))}),o))}recalculateAndSaveOverlays(t,e){const n=Cs();let r=new jn((t,e)=>t-e),s=As();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(t=>{for(const s of t)s.keys().forEach(t=>{const i=e.get(t);if(null===i)return;let o=n.get(t)||Kn.empty();o=s.applyToLocalView(i,o),n.set(t,o);const a=(r.get(s.batchId)||As()).add(t);r=r.insert(s.batchId,a)})}).next(()=>{const i=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,u=_s();c.forEach(t=>{if(!s.has(t)){const r=Ws(e.get(t),n.get(t));null!==r&&u.set(t,r),s=s.add(t)}}),i.push(this.documentOverlayCache.saveOverlays(t,a,u))}return xn.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.recalculateAndSaveOverlays(t,e))}getDocumentsMatchingQuery(t,e,n,r){return s=e,In.isDocumentKey(s.path)&&null===s.collectionGroup&&0===s.filters.length?this.getDocumentsMatchingDocumentQuery(t,e.path):function(t){return null!==t.collectionGroup}(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,r):this.getDocumentsMatchingCollectionQuery(t,e,n,r);var s}getNextDocuments(t,e,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,r).next(s=>{const i=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,r-s.size):xn.resolve(Ts());let o=-1,a=s;return i.next(e=>xn.forEach(e,(e,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),s.get(e)?xn.resolve():this.remoteDocumentCache.getEntry(t,e).next(t=>{a=a.insert(e,t)}))).next(()=>this.populateOverlays(t,e,s)).next(()=>this.computeViews(t,a,e,As())).next(t=>({batchId:o,changes:bs(t)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new In(e)).next(t=>{let e=Es();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e})}getDocumentsMatchingCollectionGroupQuery(t,e,n,r){const s=e.collectionGroup;let i=Es();return this.indexManager.getCollectionParents(t,s).next(o=>xn.forEach(o,o=>{const a=(c=e,u=o.child(s),new ss(u,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt));var c,u;return this.getDocumentsMatchingCollectionQuery(t,a,n,r).next(t=>{t.forEach((t,e)=>{i=i.insert(t,e)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(t,e,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,s,r))).next(t=>{s.forEach((e,n)=>{const r=n.getKey();null===t.get(r)&&(t=t.insert(r,xr.newInvalidDocument(r)))});let n=Es();return t.forEach((t,r)=>{const i=s.get(t);void 0!==i&&Ys(i.mutation,r,Kn.empty(),vn.now()),fs(e,r)&&(n=n.insert(t,r))}),n})}}
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
 */class To{constructor(t){this.serializer=t,this.kr=new Map,this.qr=new Map}getBundleMetadata(t,e){return xn.resolve(this.kr.get(e))}saveBundleMetadata(t,e){return this.kr.set(e.id,{id:(n=e).id,version:n.version,createTime:Pi(n.createTime)}),xn.resolve();var n}getNamedQuery(t,e){return xn.resolve(this.qr.get(e))}saveNamedQuery(t,e){return this.qr.set(e.name,{name:(n=e).name,query:oo(n.bundledQuery),readTime:Pi(n.readTime)}),xn.resolve();var n}}
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
 */class _o{constructor(){this.overlays=new jn(In.comparator),this.Qr=new Map}getOverlay(t,e){return xn.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Ts();return xn.forEach(e,e=>this.getOverlay(t,e).next(t=>{null!==t&&n.set(e,t)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((n,r)=>{this.St(t,e,r)}),xn.resolve()}removeOverlaysForBatchId(t,e,n){const r=this.Qr.get(n);return void 0!==r&&(r.forEach(t=>this.overlays=this.overlays.remove(t)),this.Qr.delete(n)),xn.resolve()}getOverlaysForCollection(t,e,n){const r=Ts(),s=e.length+1,i=new In(e.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const t=o.getNext().value,i=t.getKey();if(!e.isPrefixOf(i.path))break;i.path.length===s&&t.largestBatchId>n&&r.set(t.getKey(),t)}return xn.resolve(r)}getOverlaysForCollectionGroup(t,e,n,r){let s=new jn((t,e)=>t-e);const i=this.overlays.getIterator();for(;i.hasNext();){const t=i.getNext().value;if(t.getKey().getCollectionGroup()===e&&t.largestBatchId>n){let e=s.get(t.largestBatchId);null===e&&(e=Ts(),s=s.insert(t.largestBatchId,e)),e.set(t.getKey(),t)}}const o=Ts(),a=s.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((t,e)=>o.set(t,e)),!(o.size()>=r)););return xn.resolve(o)}St(t,e,n){const r=this.overlays.get(n.key);if(null!==r){const t=this.Qr.get(r.largestBatchId).delete(n.key);this.Qr.set(r.largestBatchId,t)}this.overlays=this.overlays.insert(n.key,new ui(e,n));let s=this.Qr.get(e);void 0===s&&(s=As(),this.Qr.set(e,s)),this.Qr.set(e,s.add(n.key))}}
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
 */class Co{constructor(){this.sessionToken=Qn.EMPTY_BYTE_STRING}getSessionToken(t){return xn.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,xn.resolve()}}
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
 */class Io{constructor(){this.$r=new zn(So.Ur),this.Kr=new zn(So.Wr)}isEmpty(){return this.$r.isEmpty()}addReference(t,e){const n=new So(t,e);this.$r=this.$r.add(n),this.Kr=this.Kr.add(n)}Gr(t,e){t.forEach(t=>this.addReference(t,e))}removeReference(t,e){this.zr(new So(t,e))}jr(t,e){t.forEach(t=>this.removeReference(t,e))}Hr(t){const e=new In(new Tn([])),n=new So(e,t),r=new So(e,t+1),s=[];return this.Kr.forEachInRange([n,r],t=>{this.zr(t),s.push(t.key)}),s}Jr(){this.$r.forEach(t=>this.zr(t))}zr(t){this.$r=this.$r.delete(t),this.Kr=this.Kr.delete(t)}Yr(t){const e=new In(new Tn([])),n=new So(e,t),r=new So(e,t+1);let s=As();return this.Kr.forEachInRange([n,r],t=>{s=s.add(t.key)}),s}containsKey(t){const e=new So(t,0),n=this.$r.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class So{constructor(t,e){this.key=t,this.Zr=e}static Ur(t,e){return In.comparator(t.key,e.key)||ln(t.Zr,e.Zr)}static Wr(t,e){return ln(t.Zr,e.Zr)||In.comparator(t.key,e.key)}}
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
 */class Ao{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.nr=1,this.Xr=new zn(So.Ur)}checkEmpty(t){return xn.resolve(0===this.mutationQueue.length)}addMutationBatch(t,e,n,r){const s=this.nr;this.nr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new ai(s,e,n,r);this.mutationQueue.push(i);for(const o of r)this.Xr=this.Xr.add(new So(o.key,s)),this.indexManager.addToCollectionParentIndex(t,o.key.path.popLast());return xn.resolve(i)}lookupMutationBatch(t,e){return xn.resolve(this.ei(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=this.ti(n),s=r<0?0:r;return xn.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return xn.resolve(0===this.mutationQueue.length?-1:this.nr-1)}getAllMutationBatches(t){return xn.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new So(e,0),r=new So(e,Number.POSITIVE_INFINITY),s=[];return this.Xr.forEachInRange([n,r],t=>{const e=this.ei(t.Zr);s.push(e)}),xn.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new zn(ln);return e.forEach(t=>{const e=new So(t,0),r=new So(t,Number.POSITIVE_INFINITY);this.Xr.forEachInRange([e,r],t=>{n=n.add(t.Zr)})}),xn.resolve(this.ni(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1;let s=n;In.isDocumentKey(s)||(s=s.child(""));const i=new So(new In(s),0);let o=new zn(ln);return this.Xr.forEachWhile(t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===r&&(o=o.add(t.Zr)),!0)},i),xn.resolve(this.ni(o))}ni(t){const e=[];return t.forEach(t=>{const n=this.ei(t);null!==n&&e.push(n)}),e}removeMutationBatch(t,e){Qe(0===this.ri(e.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Xr;return xn.forEach(e.mutations,r=>{const s=new So(r.key,e.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)}).next(()=>{this.Xr=n})}sr(t){}containsKey(t,e){const n=new So(e,0),r=this.Xr.firstAfterOrEqual(n);return xn.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this.mutationQueue.length,xn.resolve()}ri(t,e){return this.ti(t)}ti(t){return 0===this.mutationQueue.length?0:t-this.mutationQueue[0].batchId}ei(t){const e=this.ti(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}
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
 */class Do{constructor(t){this.ii=t,this.docs=new jn(In.comparator),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,r=this.docs.get(n),s=r?r.size:0,i=this.ii(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return xn.resolve(n?n.document.mutableCopy():xr.newInvalidDocument(e))}getEntries(t,e){let n=vs();return e.forEach(t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.mutableCopy():xr.newInvalidDocument(t))}),xn.resolve(n)}getDocumentsMatchingQuery(t,e,n,r){let s=vs();const i=e.path,o=new In(i.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:t,value:{document:o}}=a.getNext();if(!i.isPrefixOf(t.path))break;t.path.length>i.length+1||Dn(Sn(o),n)<=0||(r.has(o.key)||fs(e,o))&&(s=s.insert(o.key,o.mutableCopy()))}return xn.resolve(s)}getAllFromCollectionGroup(t,e,n,r){Ke(9500)}si(t,e){return xn.forEach(this.docs,t=>e(t))}newChangeBuffer(t){return new ko(this)}getSize(t){return xn.resolve(this.size)}}class ko extends wo{constructor(t){super(),this.Br=t}applyChanges(t){const e=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?e.push(this.Br.addEntry(t,r)):this.Br.removeEntry(n)}),xn.waitFor(e)}getFromCache(t,e){return this.Br.getEntry(t,e)}getAllFromCache(t,e){return this.Br.getEntries(t,e)}}
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
 */class No{constructor(t){this.persistence=t,this.oi=new ms(t=>es(t),ns),this.lastRemoteSnapshotVersion=wn.min(),this.highestTargetId=0,this._i=0,this.ai=new Io,this.targetCount=0,this.ui=fo.cr()}forEachTarget(t,e){return this.oi.forEach((t,n)=>e(n)),xn.resolve()}getLastRemoteSnapshotVersion(t){return xn.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return xn.resolve(this._i)}allocateTargetId(t){return this.highestTargetId=this.ui.next(),xn.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this._i&&(this._i=e),xn.resolve()}Tr(t){this.oi.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ui=new fo(e),this.highestTargetId=e),t.sequenceNumber>this._i&&(this._i=t.sequenceNumber)}addTargetData(t,e){return this.Tr(e),this.targetCount+=1,xn.resolve()}updateTargetData(t,e){return this.Tr(e),xn.resolve()}removeTargetData(t,e){return this.oi.delete(e.target),this.ai.Hr(e.targetId),this.targetCount-=1,xn.resolve()}removeTargets(t,e,n){let r=0;const s=[];return this.oi.forEach((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.oi.delete(i),s.push(this.removeMatchingKeysForTargetId(t,o.targetId)),r++)}),xn.waitFor(s).next(()=>r)}getTargetCount(t){return xn.resolve(this.targetCount)}getTargetData(t,e){const n=this.oi.get(e)||null;return xn.resolve(n)}addMatchingKeys(t,e,n){return this.ai.Gr(e,n),xn.resolve()}removeMatchingKeys(t,e,n){this.ai.jr(e,n);const r=this.persistence.referenceDelegate,s=[];return r&&e.forEach(e=>{s.push(r.markPotentiallyOrphaned(t,e))}),xn.waitFor(s)}removeMatchingKeysForTargetId(t,e){return this.ai.Hr(e),xn.resolve()}getMatchingKeysForTargetId(t,e){const n=this.ai.Yr(e);return xn.resolve(n)}containsKey(t,e){return xn.resolve(this.ai.containsKey(e))}}
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
 */class xo{constructor(t,e){this.ci={},this.overlays={},this.li=new On(0),this.hi=!1,this.hi=!0,this.Pi=new Co,this.referenceDelegate=t(this),this.Ti=new No(this),this.indexManager=new ao,this.remoteDocumentCache=new Do(t=>this.referenceDelegate.Ii(t)),this.serializer=new io(e),this.Ei=new To(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.hi=!1,Promise.resolve()}get started(){return this.hi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new _o,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ci[t.toKey()];return n||(n=new Ao(e,this.referenceDelegate),this.ci[t.toKey()]=n),n}getGlobalsCache(){return this.Pi}getTargetCache(){return this.Ti}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ei}runTransaction(t,e,n){qe("MemoryPersistence","Starting transaction:",t);const r=new Ro(this.li.next());return this.referenceDelegate.di(),n(r).next(t=>this.referenceDelegate.Ai(r).next(()=>t)).toPromise().then(t=>(r.raiseOnCommittedEvent(),t))}Ri(t,e){return xn.or(Object.values(this.ci).map(n=>()=>n.containsKey(t,e)))}}class Ro extends kn{constructor(t){super(),this.currentSequenceNumber=t}}class Oo{constructor(t){this.persistence=t,this.Vi=new Io,this.mi=null}static fi(t){return new Oo(t)}get gi(){if(this.mi)return this.mi;throw Ke(60996)}addReference(t,e,n){return this.Vi.addReference(n,e),this.gi.delete(n.toString()),xn.resolve()}removeReference(t,e,n){return this.Vi.removeReference(n,e),this.gi.add(n.toString()),xn.resolve()}markPotentiallyOrphaned(t,e){return this.gi.add(e.toString()),xn.resolve()}removeTarget(t,e){this.Vi.Hr(e.targetId).forEach(t=>this.gi.add(t.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(t=>{t.forEach(t=>this.gi.add(t.toString()))}).next(()=>n.removeTargetData(t,e))}di(){this.mi=new Set}Ai(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return xn.forEach(this.gi,n=>{const r=In.fromPath(n);return this.pi(t,r).next(t=>{t||e.removeEntry(r,wn.min())})}).next(()=>(this.mi=null,e.apply(t)))}updateLimboDocument(t,e){return this.pi(t,e).next(t=>{t?this.gi.delete(e.toString()):this.gi.add(e.toString())})}Ii(t){return 0}pi(t,e){return xn.or([()=>xn.resolve(this.Vi.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ri(t,e)])}}class Lo{constructor(t,e){this.persistence=t,this.yi=new ms(t=>function(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Vn(e)),e=Pn(t.get(n),e);return Vn(e)}(t.path),(t,e)=>t.isEqual(e)),this.garbageCollector=function(t,e){return new vo(t,e)}(this,e)}static fi(t,e){return new Lo(t,e)}di(){}Ai(t){return xn.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}pr(t){const e=this.br(t);return this.persistence.getTargetCache().getTargetCount(t).next(t=>e.next(e=>t+e))}br(t){let e=0;return this.yr(t,t=>{e++}).next(()=>e)}yr(t,e){return xn.forEach(this.yi,(n,r)=>this.Dr(t,n,r).next(t=>t?xn.resolve():e(r)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.si(t,r=>this.Dr(t,r,e).next(t=>{t||(n++,s.removeEntry(r,wn.min()))})).next(()=>s.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.yi.set(e,t.currentSequenceNumber),xn.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.yi.set(n,t.currentSequenceNumber),xn.resolve()}removeReference(t,e,n){return this.yi.set(n,t.currentSequenceNumber),xn.resolve()}updateLimboDocument(t,e){return this.yi.set(e,t.currentSequenceNumber),xn.resolve()}Ii(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Tr(t.data.value)),e}Dr(t,e,n){return xn.or([()=>this.persistence.Ri(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const t=this.yi.get(e);return xn.resolve(void 0!==t&&t>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}
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
 */class Mo{constructor(t,e,n,r){this.targetId=t,this.fromCache=e,this.ds=n,this.As=r}static Rs(t,e){let n=As(),r=As();for(const s of e.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:r=r.add(s.doc.key)}return new Mo(t,e.fromCache,n,r)}}
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
 */class Po{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}
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
 */class Vo{constructor(){this.Vs=!1,this.fs=!1,this.gs=100,this.ps=G()?8:function(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}("undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:"")>0?6:4}initialize(t,e){this.ys=t,this.indexManager=e,this.Vs=!0}getDocumentsMatchingQuery(t,e,n,r){const s={result:null};return this.ws(t,e).next(t=>{s.result=t}).next(()=>{if(!s.result)return this.bs(t,e,r,n).next(t=>{s.result=t})}).next(()=>{if(s.result)return;const n=new Po;return this.Ss(t,e,n).next(r=>{if(s.result=r,this.fs)return this.Ds(t,e,n,r.size)})}).next(()=>s.result)}Ds(t,e,n,r){return n.documentReadCount<this.gs?(je()<=st.DEBUG&&qe("QueryEngine","SDK will not create cache indexes for query:",ds(e),"since it only creates cache indexes for collection contains","more than or equal to",this.gs,"documents"),xn.resolve()):(je()<=st.DEBUG&&qe("QueryEngine","Query:",ds(e),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.ps*r?(je()<=st.DEBUG&&qe("QueryEngine","The SDK decides to create cache indexes for query:",ds(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,cs(e))):xn.resolve())}ws(t,e){if(os(e))return xn.resolve(null);let n=cs(e);return this.indexManager.getIndexType(t,n).next(r=>0===r?null:(null!==e.limit&&1===r&&(e=us(e,null,"F"),n=cs(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(r=>{const s=As(...r);return this.ys.getDocuments(t,s).next(r=>this.indexManager.getMinOffset(t,n).next(n=>{const i=this.vs(e,r);return this.Cs(e,i,s,n.readTime)?this.ws(t,us(e,null,"F")):this.Fs(t,i,e,n)}))})))}bs(t,e,n,r){return os(e)||r.isEqual(wn.min())?xn.resolve(null):this.ys.getDocuments(t,n).next(s=>{const i=this.vs(e,s);return this.Cs(e,i,n,r)?xn.resolve(null):(je()<=st.DEBUG&&qe("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),ds(e)),this.Fs(t,i,e,function(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=wn.fromTimestamp(1e9===r?new vn(n+1,0):new vn(n,r));return new An(s,In.empty(),e)}(r,-1)).next(t=>t))})}vs(t,e){let n=new zn(ps(t));return e.forEach((e,r)=>{fs(t,r)&&(n=n.add(r))}),n}Cs(t,e,n,r){if(null===t.limit)return!1;if(n.size!==e.size)return!0;const s="F"===t.limitType?e.last():e.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}Ss(t,e,n){return je()<=st.DEBUG&&qe("QueryEngine","Using full collection scan to execute query:",ds(e)),this.ys.getDocumentsMatchingQuery(t,e,An.min(),n)}Fs(t,e,n,r){return this.ys.getDocumentsMatchingQuery(t,n,r).next(t=>(e.forEach(e=>{t=t.insert(e.key,e)}),t))}}
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
 */const Fo="LocalStore";class Uo{constructor(t,e,n,r){this.persistence=t,this.Ms=e,this.serializer=r,this.xs=new jn(ln),this.Os=new ms(t=>es(t),ns),this.Ns=new Map,this.Bs=t.getRemoteDocumentCache(),this.Ti=t.getTargetCache(),this.Ei=t.getBundleCache(),this.Ls(n)}Ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new bo(this.Bs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Bs.setIndexManager(this.indexManager),this.Ms.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.xs))}}async function Bo(t,e){const n=We(t);return await n.persistence.runTransaction("Handle user change","readonly",t=>{let r;return n.mutationQueue.getAllMutationBatches(t).next(s=>(r=s,n.Ls(e),n.mutationQueue.getAllMutationBatches(t))).next(e=>{const s=[],i=[];let o=As();for(const t of r){s.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){i.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return n.localDocuments.getDocuments(t,o).next(t=>({ks:t,removedBatchIds:s,addedBatchIds:i}))})})}function jo(t){const e=We(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ti.getLastRemoteSnapshotVersion(t))}function qo(t,e){const n=We(t),r=e.snapshotVersion;let s=n.xs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",t=>{const i=n.Bs.newChangeBuffer({trackRemovals:!0});s=n.xs;const o=[];e.targetChanges.forEach((i,a)=>{const c=s.get(a);if(!c)return;o.push(n.Ti.removeMatchingKeys(t,i.removedDocuments,a).next(()=>n.Ti.addMatchingKeys(t,i.addedDocuments,a)));let u=c.withSequenceNumber(t.currentSequenceNumber);null!==e.targetMismatches.get(a)?u=u.withResumeToken(Qn.EMPTY_BYTE_STRING,wn.min()).withLastLimboFreeSnapshotVersion(wn.min()):i.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(i.resumeToken,r)),s=s.insert(a,u),function(t,e,n){if(0===t.resumeToken.approximateByteSize())return!0;if(e.snapshotVersion.toMicroseconds()-t.snapshotVersion.toMicroseconds()>=3e8)return!0;return n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(c,u,i)&&o.push(n.Ti.updateTargetData(t,u))});let a=vs(),c=As();if(e.documentUpdates.forEach(r=>{e.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,r))}),o.push(function(t,e,n){let r=As(),s=As();return n.forEach(t=>r=r.add(t)),e.getEntries(t,r).next(t=>{let r=vs();return n.forEach((n,i)=>{const o=t.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(s=s.add(n)),i.isNoDocument()&&i.version.isEqual(wn.min())?(e.removeEntry(n,i.readTime),r=r.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(e.addEntry(i),r=r.insert(n,i)):qe(Fo,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)}),{qs:r,Qs:s}})}(t,i,e.documentUpdates).next(t=>{a=t.qs,c=t.Qs})),!r.isEqual(wn.min())){const e=n.Ti.getLastRemoteSnapshotVersion(t).next(e=>n.Ti.setTargetsMetadata(t,t.currentSequenceNumber,r));o.push(e)}return xn.waitFor(o).next(()=>i.apply(t)).next(()=>n.localDocuments.getLocalViewOfDocuments(t,a,c)).next(()=>a)}).then(t=>(n.xs=s,t))}function $o(t,e){const n=We(t);return n.persistence.runTransaction("Get next mutation batch","readonly",t=>(void 0===e&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(t,e)))}async function zo(t,e,n){const r=We(t),s=r.xs.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,t=>r.persistence.referenceDelegate.removeTarget(t,s))}catch(o){if(!Rn(o))throw o;qe(Fo,`Failed to update sequence numbers for target ${e}: ${o}`)}r.xs=r.xs.remove(e),r.Os.delete(s.target)}function Ho(t,e,n){const r=We(t);let s=wn.min(),i=As();return r.persistence.runTransaction("Execute query","readwrite",t=>function(t,e,n){const r=We(t),s=r.Os.get(n);return void 0!==s?xn.resolve(r.xs.get(s)):r.Ti.getTargetData(e,n)}(r,t,cs(e)).next(e=>{if(e)return s=e.lastLimboFreeSnapshotVersion,r.Ti.getMatchingKeysForTargetId(t,e.targetId).next(t=>{i=t})}).next(()=>r.Ms.getDocumentsMatchingQuery(t,e,n?s:wn.min(),n?i:As())).next(t=>(function(t,e,n){let r=t.Ns.get(e)||wn.min();n.forEach((t,e)=>{e.readTime.compareTo(r)>0&&(r=e.readTime)}),t.Ns.set(e,r)}(r,function(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}(e),t),{documents:t,$s:i})))}class Ko{constructor(){this.activeTargetIds=Ds}js(t){this.activeTargetIds=this.activeTargetIds.add(t)}Hs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}zs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Go{constructor(){this.xo=new Ko,this.Oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.xo.js(t),this.Oo[t]||"not-current"}updateQueryState(t,e,n){this.Oo[t]=e}removeLocalQueryTarget(t){this.xo.Hs(t)}isLocalQueryTarget(t){return this.xo.activeTargetIds.has(t)}clearQueryState(t){delete this.Oo[t]}getAllActiveQueryTargets(){return this.xo.activeTargetIds}isActiveQueryTarget(t){return this.xo.activeTargetIds.has(t)}start(){return this.xo=new Ko,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}
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
 */class Qo{No(t){}shutdown(){}}
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
 */const Wo="ConnectivityMonitor";class Xo{constructor(){this.Bo=()=>this.Lo(),this.ko=()=>this.qo(),this.Qo=[],this.$o()}No(t){this.Qo.push(t)}shutdown(){window.removeEventListener("online",this.Bo),window.removeEventListener("offline",this.ko)}$o(){window.addEventListener("online",this.Bo),window.addEventListener("offline",this.ko)}Lo(){qe(Wo,"Network connectivity changed: AVAILABLE");for(const t of this.Qo)t(0)}qo(){qe(Wo,"Network connectivity changed: UNAVAILABLE");for(const t of this.Qo)t(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
 */let Yo=null;function Jo(){return null===Yo?Yo=268435456+Math.round(2147483648*Math.random()):Yo++,"0x"+Yo.toString(16)
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
 */}const Zo="RestConnection",ta={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class ea{get Uo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Ko=e+"://"+t.host,this.Wo=`projects/${n}/databases/${r}`,this.Go=this.databaseId.database===ar?`project_id=${n}`:`project_id=${n}&database_id=${r}`}zo(t,e,n,r,s){const i=Jo(),o=this.jo(t,e.toUriEncodedString());qe(Zo,`Sending RPC '${t}' ${i}:`,o,n);const a={"google-cloud-resource-prefix":this.Wo,"x-goog-request-params":this.Go};this.Ho(a,r,s);const{host:c}=new URL(o),u=$(c);return this.Jo(t,o,a,n,u).then(e=>(qe(Zo,`Received RPC '${t}' ${i}: `,e),e),e=>{throw ze(Zo,`RPC '${t}' ${i} failed with error: `,e,"url: ",o,"request:",n),e})}Yo(t,e,n,r,s,i){return this.zo(t,e,n,r,s)}Ho(t,e,n){t["X-Goog-Api-Client"]="gl-js/ fire/"+Ue,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((e,n)=>t[n]=e),n&&n.headers.forEach((e,n)=>t[n]=e)}jo(t,e){const n=ta[t];return`${this.Ko}/v1/${e}:${n}`}terminate(){}}
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
 */class na{constructor(t){this.Zo=t.Zo,this.Xo=t.Xo}e_(t){this.t_=t}n_(t){this.r_=t}i_(t){this.s_=t}onMessage(t){this.o_=t}close(){this.Xo()}send(t){this.Zo(t)}__(){this.t_()}a_(){this.r_()}u_(t){this.s_(t)}c_(t){this.o_(t)}}
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
 */const ra="WebChannelConnection";class sa extends ea{constructor(t){super(t),this.l_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,n,r,s){const i=Jo();return new Promise((s,o)=>{const a=new Ae;a.setWithCredentials(!0),a.listenOnce(ke.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case Ne.NO_ERROR:const e=a.getResponseJson();qe(ra,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(e)),s(e);break;case Ne.TIMEOUT:qe(ra,`RPC '${t}' ${i} timed out`),o(new Ye(Xe.DEADLINE_EXCEEDED,"Request time out"));break;case Ne.HTTP_ERROR:const n=a.getStatus();if(qe(ra,`RPC '${t}' ${i} failed with status:`,n,"response text:",a.getResponseText()),n>0){let t=a.getResponseJson();Array.isArray(t)&&(t=t[0]);const e=null==t?void 0:t.error;if(e&&e.status&&e.message){const t=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(Xe).indexOf(e)>=0?e:Xe.UNKNOWN}(e.status);o(new Ye(t,e.message))}else o(new Ye(Xe.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new Ye(Xe.UNAVAILABLE,"Connection failed."));break;default:Ke(9055,{h_:t,streamId:i,P_:a.getLastErrorCode(),T_:a.getLastError()})}}finally{qe(ra,`RPC '${t}' ${i} completed.`)}});const c=JSON.stringify(r);qe(ra,`RPC '${t}' ${i} sending request:`,r),a.send(e,"POST",c,n,15)})}I_(t,e,n){const r=Jo(),s=[this.Ko,"/","google.firestore.v1.Firestore","/",t,"/channel"],i=Le(),o=Oe(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.Ho(a.initMessageHeaders,e,n),a.encodeInitMessageHeaders=!0;const u=s.join("");qe(ra,`Creating RPC '${t}' stream ${r}: ${u}`,a);const h=i.createWebChannel(u,a);this.E_(h);let l=!1,d=!1;const f=new na({Zo:e=>{d?qe(ra,`Not sending because RPC '${t}' stream ${r} is closed:`,e):(l||(qe(ra,`Opening RPC '${t}' stream ${r} transport.`),h.open(),l=!0),qe(ra,`RPC '${t}' stream ${r} sending:`,e),h.send(e))},Xo:()=>h.close()}),p=(t,e,n)=>{t.listen(e,t=>{try{n(t)}catch(e){setTimeout(()=>{throw e},0)}})};return p(h,De.EventType.OPEN,()=>{d||(qe(ra,`RPC '${t}' stream ${r} transport opened.`),f.__())}),p(h,De.EventType.CLOSE,()=>{d||(d=!0,qe(ra,`RPC '${t}' stream ${r} transport closed`),f.u_(),this.d_(h))}),p(h,De.EventType.ERROR,e=>{d||(d=!0,ze(ra,`RPC '${t}' stream ${r} transport errored. Name:`,e.name,"Message:",e.message),f.u_(new Ye(Xe.UNAVAILABLE,"The operation could not be completed")))}),p(h,De.EventType.MESSAGE,e=>{var n;if(!d){const s=e.data[0];Qe(!!s,16349);const i=s,o=(null==i?void 0:i.error)||(null===(n=i[0])||void 0===n?void 0:n.error);if(o){qe(ra,`RPC '${t}' stream ${r} received error:`,o);const e=o.status;let n=function(t){const e=li[t];if(void 0!==e)return fi(e)}(e),s=o.message;void 0===n&&(n=Xe.INTERNAL,s="Unknown error status: "+e+" with message "+o.message),d=!0,f.u_(new Ye(n,s)),h.close()}else qe(ra,`RPC '${t}' stream ${r} received:`,s),f.c_(s)}}),p(o,Re.STAT_EVENT,e=>{e.stat===xe.PROXY?qe(ra,`RPC '${t}' stream ${r} detected buffering proxy`):e.stat===xe.NOPROXY&&qe(ra,`RPC '${t}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{f.a_()},0),f}terminate(){this.l_.forEach(t=>t.close()),this.l_=[]}E_(t){this.l_.push(t)}d_(t){this.l_=this.l_.filter(e=>e===t)}}function ia(){return"undefined"!=typeof document?document:null}
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
 */function oa(t){return new xi(t,!0)}
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
 */class aa{constructor(t,e,n=1e3,r=1.5,s=6e4){this.xi=t,this.timerId=e,this.A_=n,this.R_=r,this.V_=s,this.m_=0,this.f_=null,this.g_=Date.now(),this.reset()}reset(){this.m_=0}p_(){this.m_=this.V_}y_(t){this.cancel();const e=Math.floor(this.m_+this.w_()),n=Math.max(0,Date.now()-this.g_),r=Math.max(0,e-n);r>0&&qe("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.m_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.f_=this.xi.enqueueAfterDelay(this.timerId,r,()=>(this.g_=Date.now(),t())),this.m_*=this.R_,this.m_<this.A_&&(this.m_=this.A_),this.m_>this.V_&&(this.m_=this.V_)}b_(){null!==this.f_&&(this.f_.skipDelay(),this.f_=null)}cancel(){null!==this.f_&&(this.f_.cancel(),this.f_=null)}w_(){return(Math.random()-.5)*this.m_}}
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
 */const ca="PersistentStream";class ua{constructor(t,e,n,r,s,i,o,a){this.xi=t,this.S_=n,this.D_=r,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.v_=0,this.C_=null,this.F_=null,this.stream=null,this.M_=0,this.x_=new aa(t,e)}O_(){return 1===this.state||5===this.state||this.N_()}N_(){return 2===this.state||3===this.state}start(){this.M_=0,4!==this.state?this.auth():this.B_()}async stop(){this.O_()&&await this.close(0)}L_(){this.state=0,this.x_.reset()}k_(){this.N_()&&null===this.C_&&(this.C_=this.xi.enqueueAfterDelay(this.S_,6e4,()=>this.q_()))}Q_(t){this.U_(),this.stream.send(t)}async q_(){if(this.N_())return this.close(0)}U_(){this.C_&&(this.C_.cancel(),this.C_=null)}K_(){this.F_&&(this.F_.cancel(),this.F_=null)}async close(t,e){this.U_(),this.K_(),this.x_.cancel(),this.v_++,4!==t?this.x_.reset():e&&e.code===Xe.RESOURCE_EXHAUSTED?($e(e.toString()),$e("Using maximum backoff delay to prevent overloading the backend."),this.x_.p_()):e&&e.code===Xe.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.i_(e)}W_(){}auth(){this.state=1;const t=this.G_(this.v_),e=this.v_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([t,n])=>{this.v_===e&&this.z_(t,n)},e=>{t(()=>{const t=new Ye(Xe.UNKNOWN,"Fetching auth token failed: "+e.message);return this.j_(t)})})}z_(t,e){const n=this.G_(this.v_);this.stream=this.H_(t,e),this.stream.e_(()=>{n(()=>this.listener.e_())}),this.stream.n_(()=>{n(()=>(this.state=2,this.F_=this.xi.enqueueAfterDelay(this.D_,1e4,()=>(this.N_()&&(this.state=3),Promise.resolve())),this.listener.n_()))}),this.stream.i_(t=>{n(()=>this.j_(t))}),this.stream.onMessage(t=>{n(()=>1==++this.M_?this.J_(t):this.onNext(t))})}B_(){this.state=5,this.x_.y_(async()=>{this.state=0,this.start()})}j_(t){return qe(ca,`close with error: ${t}`),this.stream=null,this.close(4,t)}G_(t){return e=>{this.xi.enqueueAndForget(()=>this.v_===t?e():(qe(ca,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ha extends ua{constructor(t,e,n,r,s,i){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,r,i),this.serializer=s}H_(t,e){return this.connection.I_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.x_.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const s="NO_CHANGE"===(r=e.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:Ke(39313,{state:r}),i=e.targetChange.targetIds||[],o=function(t,e){return t.useProto3Json?(Qe(void 0===e||"string"==typeof e,58123),Qn.fromBase64String(e||"")):(Qe(void 0===e||e instanceof Buffer||e instanceof Uint8Array,16193),Qn.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(t){const e=void 0===t.code?Xe.UNKNOWN:fi(t.code);return new Ye(e,t.message||"")}(a);n=new _i(s,i,o,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=ji(t,r.document.name),i=Pi(r.document.updateTime),o=r.document.createTime?Pi(r.document.createTime):wn.min(),a=new kr({mapValue:{fields:r.document.fields}}),c=xr.newFoundDocument(s,i,o,a),u=r.targetIds||[],h=r.removedTargetIds||[];n=new bi(u,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=ji(t,r.document),i=r.readTime?Pi(r.readTime):wn.min(),o=xr.newNoDocument(s,i),a=r.removedTargetIds||[];n=new bi([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=ji(t,r.document),i=r.removedTargetIds||[];n=new bi([],i,s,null)}else{if(!("filter"in e))return Ke(11601,{Vt:e});{e.filter;const t=e.filter;t.targetId;const{count:r=0,unchangedNames:s}=t,i=new hi(r,s),o=t.targetId;n=new Ti(o,i)}}var r;return n}(this.serializer,t),n=function(t){if(!("targetChange"in t))return wn.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?wn.min():e.readTime?Pi(e.readTime):wn.min()}(t);return this.listener.Y_(e,n)}Z_(t){const e={};e.database=$i(this.serializer),e.addTarget=function(t,e){let n;const r=e.target;if(n=rs(r)?{documents:Ki(t,r)}:{query:Gi(t,r).gt},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0){n.resumeToken=Li(t,e.resumeToken);const r=Ri(t,e.expectedCount);null!==r&&(n.expectedCount=r)}else if(e.snapshotVersion.compareTo(wn.min())>0){n.readTime=Oi(t,e.snapshotVersion.toTimestamp());const r=Ri(t,e.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,t);const n=function(t,e){const n=function(t){switch(t){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Ke(28987,{purpose:t})}}(e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,t);n&&(e.labels=n),this.Q_(e)}X_(t){const e={};e.database=$i(this.serializer),e.removeTarget=t,this.Q_(e)}}class la extends ua{constructor(t,e,n,r,s,i){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,r,i),this.serializer=s}get ea(){return this.M_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.ea&&this.ta([])}H_(t,e){return this.connection.I_("Write",t,e)}J_(t){return Qe(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Qe(!t.writeResults||0===t.writeResults.length,55816),this.listener.na()}onNext(t){Qe(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.x_.reset();const e=function(t,e){return t&&t.length>0?(Qe(void 0!==e,14353),t.map(t=>function(t,e){let n=t.updateTime?Pi(t.updateTime):Pi(e);return n.isEqual(wn.min())&&(n=Pi(e)),new Hs(n,t.transformResults||[])}(t,e))):[]}(t.writeResults,t.commitTime),n=Pi(t.commitTime);return this.listener.ra(n,e)}ia(){const t={};t.database=$i(this.serializer),this.Q_(t)}ta(t){const e={streamToken:this.lastStreamToken,writes:t.map(t=>function(t,e){let n;if(e instanceof ti)n={update:Hi(t,e.key,e.value)};else if(e instanceof ii)n={delete:Bi(t,e.key)};else if(e instanceof ei)n={update:Hi(t,e.key,e.data),updateMask:no(e.fieldMask)};else{if(!(e instanceof oi))return Ke(16599,{ft:e.type});n={verify:Bi(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(t=>function(t,e){const n=e.transform;if(n instanceof Ps)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Vs)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Us)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof js)return{fieldPath:e.field.canonicalString(),increment:n.Re};throw Ke(20930,{transform:e.transform})}(0,t))),e.precondition.isNone||(n.currentDocument=(r=t,void 0!==(s=e.precondition).updateTime?{updateTime:Mi(r,s.updateTime)}:void 0!==s.exists?{exists:s.exists}:Ke(27497))),n;var r,s}(this.serializer,t))};this.Q_(e)}}
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
 */class da{}class fa extends da{constructor(t,e,n,r){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=r,this.sa=!1}oa(){if(this.sa)throw new Ye(Xe.FAILED_PRECONDITION,"The client has already been terminated.")}zo(t,e,n,r){return this.oa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.zo(t,Fi(e,n),r,s,i)).catch(t=>{throw"FirebaseError"===t.name?(t.code===Xe.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new Ye(Xe.UNKNOWN,t.toString())})}Yo(t,e,n,r,s){return this.oa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Yo(t,Fi(e,n),r,i,o,s)).catch(t=>{throw"FirebaseError"===t.name?(t.code===Xe.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new Ye(Xe.UNKNOWN,t.toString())})}terminate(){this.sa=!0,this.connection.terminate()}}class pa{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this._a=0,this.aa=null,this.ua=!0}ca(){0===this._a&&(this.la("Unknown"),this.aa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.aa=null,this.ha("Backend didn't respond within 10 seconds."),this.la("Offline"),Promise.resolve())))}Pa(t){"Online"===this.state?this.la("Unknown"):(this._a++,this._a>=1&&(this.Ta(),this.ha(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.la("Offline")))}set(t){this.Ta(),this._a=0,"Online"===t&&(this.ua=!1),this.la(t)}la(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ha(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ua?($e(e),this.ua=!1):qe("OnlineStateTracker",e)}Ta(){null!==this.aa&&(this.aa.cancel(),this.aa=null)}}
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
 */const ga="RemoteStore";class ma{constructor(t,e,n,r,s){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Ia=[],this.Ea=new Map,this.da=new Set,this.Aa=[],this.Ra=s,this.Ra.No(t=>{n.enqueueAndForget(async()=>{Ia(this)&&(qe(ga,"Restarting streams for network reachability change."),await async function(t){const e=We(t);e.da.add(4),await va(e),e.Va.set("Unknown"),e.da.delete(4),await ya(e)}(this))})}),this.Va=new pa(n,r)}}async function ya(t){if(Ia(t))for(const e of t.Aa)await e(!0)}async function va(t){for(const e of t.Aa)await e(!1)}function wa(t,e){const n=We(t);n.Ea.has(e.targetId)||(n.Ea.set(e.targetId,e),Ca(n)?_a(n):$a(n).N_()&&ba(n,e))}function Ea(t,e){const n=We(t),r=$a(n);n.Ea.delete(e),r.N_()&&Ta(n,e),0===n.Ea.size&&(r.N_()?r.k_():Ia(n)&&n.Va.set("Unknown"))}function ba(t,e){if(t.ma.Ke(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(wn.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}$a(t).Z_(e)}function Ta(t,e){t.ma.Ke(e),$a(t).X_(e)}function _a(t){t.ma=new Ii({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),Rt:e=>t.Ea.get(e)||null,Pt:()=>t.datastore.serializer.databaseId}),$a(t).start(),t.Va.ca()}function Ca(t){return Ia(t)&&!$a(t).O_()&&t.Ea.size>0}function Ia(t){return 0===We(t).da.size}function Sa(t){t.ma=void 0}async function Aa(t){t.Va.set("Online")}async function Da(t){t.Ea.forEach((e,n)=>{ba(t,e)})}async function ka(t,e){Sa(t),Ca(t)?(t.Va.Pa(e),_a(t)):t.Va.set("Unknown")}async function Na(t,e,n){if(t.Va.set("Online"),e instanceof _i&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const r of e.targetIds)t.Ea.has(r)&&(await t.remoteSyncer.rejectListen(r,n),t.Ea.delete(r),t.ma.removeTarget(r))}(t,e)}catch(r){qe(ga,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await xa(t,r)}else if(e instanceof bi?t.ma.Xe(e):e instanceof Ti?t.ma.ot(e):t.ma.nt(e),!n.isEqual(wn.min()))try{const e=await jo(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.ma.It(e);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=t.Ea.get(r);s&&t.Ea.set(r,s.withResumeToken(n.resumeToken,e))}}),n.targetMismatches.forEach((e,n)=>{const r=t.Ea.get(e);if(!r)return;t.Ea.set(e,r.withResumeToken(Qn.EMPTY_BYTE_STRING,r.snapshotVersion)),Ta(t,e);const s=new so(r.target,e,n,r.sequenceNumber);ba(t,s)}),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(s){qe(ga,"Failed to raise snapshot:",s),await xa(t,s)}}async function xa(t,e,n){if(!Rn(e))throw e;t.da.add(1),await va(t),t.Va.set("Offline"),n||(n=()=>jo(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{qe(ga,"Retrying IndexedDB access"),await n(),t.da.delete(1),await ya(t)})}function Ra(t,e){return e().catch(n=>xa(t,n,e))}async function Oa(t){const e=We(t),n=za(e);let r=e.Ia.length>0?e.Ia[e.Ia.length-1].batchId:-1;for(;La(e);)try{const t=await $o(e.localStore,r);if(null===t){0===e.Ia.length&&n.k_();break}r=t.batchId,Ma(e,t)}catch(s){await xa(e,s)}Pa(e)&&Va(e)}function La(t){return Ia(t)&&t.Ia.length<10}function Ma(t,e){t.Ia.push(e);const n=za(t);n.N_()&&n.ea&&n.ta(e.mutations)}function Pa(t){return Ia(t)&&!za(t).O_()&&t.Ia.length>0}function Va(t){za(t).start()}async function Fa(t){za(t).ia()}async function Ua(t){const e=za(t);for(const n of t.Ia)e.ta(n.mutations)}async function Ba(t,e,n){const r=t.Ia.shift(),s=ci.from(r,e,n);await Ra(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Oa(t)}async function ja(t,e){e&&za(t).ea&&await async function(t,e){if(function(t){switch(t){case Xe.OK:return Ke(64938);case Xe.CANCELLED:case Xe.UNKNOWN:case Xe.DEADLINE_EXCEEDED:case Xe.RESOURCE_EXHAUSTED:case Xe.INTERNAL:case Xe.UNAVAILABLE:case Xe.UNAUTHENTICATED:return!1;case Xe.INVALID_ARGUMENT:case Xe.NOT_FOUND:case Xe.ALREADY_EXISTS:case Xe.PERMISSION_DENIED:case Xe.FAILED_PRECONDITION:case Xe.ABORTED:case Xe.OUT_OF_RANGE:case Xe.UNIMPLEMENTED:case Xe.DATA_LOSS:return!0;default:return Ke(15467,{code:t})}}(n=e.code)&&n!==Xe.ABORTED){const n=t.Ia.shift();za(t).L_(),await Ra(t,()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e)),await Oa(t)}var n}(t,e),Pa(t)&&Va(t)}async function qa(t,e){const n=We(t);n.asyncQueue.verifyOperationInProgress(),qe(ga,"RemoteStore received new credentials");const r=Ia(n);n.da.add(3),await va(n),r&&n.Va.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.da.delete(3),await ya(n)}function $a(t){return t.fa||(t.fa=function(t,e,n){const r=We(t);return r.oa(),new ha(e,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(t.datastore,t.asyncQueue,{e_:Aa.bind(null,t),n_:Da.bind(null,t),i_:ka.bind(null,t),Y_:Na.bind(null,t)}),t.Aa.push(async e=>{e?(t.fa.L_(),Ca(t)?_a(t):t.Va.set("Unknown")):(await t.fa.stop(),Sa(t))})),t.fa}function za(t){return t.ga||(t.ga=function(t,e,n){const r=We(t);return r.oa(),new la(e,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(t.datastore,t.asyncQueue,{e_:()=>Promise.resolve(),n_:Fa.bind(null,t),i_:ja.bind(null,t),na:Ua.bind(null,t),ra:Ba.bind(null,t)}),t.Aa.push(async e=>{e?(t.ga.L_(),await Oa(t)):(await t.ga.stop(),t.Ia.length>0&&(qe(ga,`Stopping write stream with ${t.Ia.length} pending writes`),t.Ia=[]))})),t.ga
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
 */}class Ha{constructor(t,e,n,r,s){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new Je,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(t=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,r,s){const i=Date.now()+n,o=new Ha(t,e,i,r,s);return o.start(n),o}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Ye(Xe.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ka(t,e){if($e("AsyncQueue",`${e}: ${t}`),Rn(t))return new Ye(Xe.UNAVAILABLE,`${e}: ${t}`);throw t}
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
 */class Ga{static emptySet(t){return new Ga(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||In.comparator(e.key,n.key):(t,e)=>In.comparator(t.key,e.key),this.keyedMap=Es(),this.sortedSet=new jn(this.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Ga))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(!t.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new Ga;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
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
 */class Qa{constructor(){this.pa=new jn(In.comparator)}track(t){const e=t.doc.key,n=this.pa.get(e);n?0!==t.type&&3===n.type?this.pa=this.pa.insert(e,t):3===t.type&&1!==n.type?this.pa=this.pa.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.pa=this.pa.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.pa=this.pa.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.pa=this.pa.remove(e):1===t.type&&2===n.type?this.pa=this.pa.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.pa=this.pa.insert(e,{type:2,doc:t.doc}):Ke(63341,{Vt:t,ya:n}):this.pa=this.pa.insert(e,t)}wa(){const t=[];return this.pa.inorderTraversal((e,n)=>{t.push(n)}),t}}class Wa{constructor(t,e,n,r,s,i,o,a,c){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(t,e,n,r,s){const i=[];return e.forEach(t=>{i.push({type:0,doc:t})}),new Wa(t,e,Ga.emptySet(e),i,n,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&hs(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let r=0;r<e.length;r++)if(e[r].type!==n[r].type||!e[r].doc.isEqual(n[r].doc))return!1;return!0}}
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
 */class Xa{constructor(){this.ba=void 0,this.Sa=[]}Da(){return this.Sa.some(t=>t.va())}}class Ya{constructor(){this.queries=Ja(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(t,e){const n=We(t),r=n.queries;n.queries=Ja(),r.forEach((t,n)=>{for(const r of n.Sa)r.onError(e)})}(this,new Ye(Xe.ABORTED,"Firestore shutting down"))}}function Ja(){return new ms(t=>ls(t),hs)}function Za(t,e){const n=We(t);let r=!1;for(const s of e){const t=s.query,e=n.queries.get(t);if(e){for(const t of e.Sa)t.Ma(s)&&(r=!0);e.ba=s}}r&&ec(n)}function tc(t,e,n){const r=We(t),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(n);r.queries.delete(e)}function ec(t){t.Ca.forEach(t=>{t.next()})}var nc,rc;(rc=nc||(nc={})).xa="default",rc.Cache="cache";class sc{constructor(t,e,n){this.query=t,this.Oa=e,this.Na=!1,this.Ba=null,this.onlineState="Unknown",this.options=n||{}}Ma(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new Wa(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Na?this.La(t)&&(this.Oa.next(t),e=!0):this.ka(t,this.onlineState)&&(this.qa(t),e=!0),this.Ba=t,e}onError(t){this.Oa.error(t)}Fa(t){this.onlineState=t;let e=!1;return this.Ba&&!this.Na&&this.ka(this.Ba,t)&&(this.qa(this.Ba),e=!0),e}ka(t,e){if(!t.fromCache)return!0;if(!this.va())return!0;const n="Offline"!==e;return(!this.options.Qa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||"Offline"===e)}La(t){if(t.docChanges.length>0)return!0;const e=this.Ba&&this.Ba.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}qa(t){t=Wa.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Na=!0,this.Oa.next(t)}va(){return this.options.source!==nc.Cache}}
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
 */class ic{constructor(t){this.key=t}}class oc{constructor(t){this.key=t}}class ac{constructor(t,e){this.query=t,this.Ha=e,this.Ja=null,this.hasCachedResults=!1,this.current=!1,this.Ya=As(),this.mutatedKeys=As(),this.Za=ps(t),this.Xa=new Ga(this.Za)}get eu(){return this.Ha}tu(t,e){const n=e?e.nu:new Qa,r=e?e.Xa:this.Xa;let s=e?e.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal((t,e)=>{const u=r.get(t),h=fs(this.query,e)?e:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.ru(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.Za(h,a)>0||c&&this.Za(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(i=i.add(h),s=d?s.add(t):s.delete(t)):(i=i.delete(t),s=s.delete(t)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const t="F"===this.query.limitType?i.last():i.first();i=i.delete(t.key),s=s.delete(t.key),n.track({type:1,doc:t})}return{Xa:i,nu:n,Cs:o,mutatedKeys:s}}ru(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,r){const s=this.Xa;this.Xa=t.Xa,this.mutatedKeys=t.mutatedKeys;const i=t.nu.wa();i.sort((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Ke(20277,{Vt:t})}};return n(t)-n(e)}(t.type,e.type)||this.Za(t.doc,e.doc)),this.iu(n),r=null!=r&&r;const o=e&&!r?this.su():[],a=0===this.Ya.size&&this.current&&!r?1:0,c=a!==this.Ja;return this.Ja=a,0!==i.length||c?{snapshot:new Wa(this.query,t.Xa,s,i,t.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),ou:o}:{ou:o}}Fa(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({Xa:this.Xa,nu:new Qa,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{ou:[]}}_u(t){return!this.Ha.has(t)&&!!this.Xa.has(t)&&!this.Xa.get(t).hasLocalMutations}iu(t){t&&(t.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),t.modifiedDocuments.forEach(t=>{}),t.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=t.current)}su(){if(!this.current)return[];const t=this.Ya;this.Ya=As(),this.Xa.forEach(t=>{this._u(t.key)&&(this.Ya=this.Ya.add(t.key))});const e=[];return t.forEach(t=>{this.Ya.has(t)||e.push(new oc(t))}),this.Ya.forEach(n=>{t.has(n)||e.push(new ic(n))}),e}au(t){this.Ha=t.$s,this.Ya=As();const e=this.tu(t.documents);return this.applyChanges(e,!0)}uu(){return Wa.fromInitialDocuments(this.query,this.Xa,this.mutatedKeys,0===this.Ja,this.hasCachedResults)}}const cc="SyncEngine";class uc{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class hc{constructor(t){this.key=t,this.cu=!1}}class lc{constructor(t,e,n,r,s,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.lu={},this.hu=new ms(t=>ls(t),hs),this.Pu=new Map,this.Tu=new Set,this.Iu=new jn(In.comparator),this.Eu=new Map,this.du=new Io,this.Au={},this.Ru=new Map,this.Vu=fo.lr(),this.onlineState="Unknown",this.mu=void 0}get isPrimaryClient(){return!0===this.mu}}async function dc(t,e,n=!0){const r=Oc(t);let s;const i=r.hu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.uu()):s=await pc(r,e,n,!0),s}async function fc(t,e){const n=Oc(t);await pc(n,e,!0,!1)}async function pc(t,e,n,r){const s=await function(t,e){const n=We(t);return n.persistence.runTransaction("Allocate target","readwrite",t=>{let r;return n.Ti.getTargetData(t,e).next(s=>s?(r=s,xn.resolve(r)):n.Ti.allocateTargetId(t).next(s=>(r=new so(e,s,"TargetPurposeListen",t.currentSequenceNumber),n.Ti.addTargetData(t,r).next(()=>r))))}).then(t=>{const r=n.xs.get(t.targetId);return(null===r||t.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.xs=n.xs.insert(t.targetId,t),n.Os.set(e,t.targetId)),t})}(t.localStore,cs(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let a;return r&&(a=await async function(t,e,n,r,s){t.fu=(e,n,r)=>async function(t,e,n,r){let s=e.view.tu(n);s.Cs&&(s=await Ho(t.localStore,e.query,!1).then(({documents:t})=>e.view.tu(t,s)));const i=r&&r.targetChanges.get(e.targetId),o=r&&null!=r.targetMismatches.get(e.targetId),a=e.view.applyChanges(s,t.isPrimaryClient,i,o);return Ac(t,e.targetId,a.ou),a.snapshot}(t,e,n,r);const i=await Ho(t.localStore,e,!0),o=new ac(e,i.$s),a=o.tu(i.documents),c=Ei.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==t.onlineState,s),u=o.applyChanges(a,t.isPrimaryClient,c);Ac(t,n,u.ou);const h=new uc(e,n,o);return t.hu.set(e,h),t.Pu.has(n)?t.Pu.get(n).push(e):t.Pu.set(n,[e]),u.snapshot}(t,e,i,"current"===o,s.resumeToken)),t.isPrimaryClient&&n&&wa(t.remoteStore,s),a}async function gc(t,e,n){const r=We(t),s=r.hu.get(e),i=r.Pu.get(s.targetId);if(i.length>1)return r.Pu.set(s.targetId,i.filter(t=>!hs(t,e))),void r.hu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await zo(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Ea(r.remoteStore,s.targetId),Ic(r,s.targetId)}).catch(Nn)):(Ic(r,s.targetId),await zo(r.localStore,s.targetId,!0))}async function mc(t,e){const n=We(t),r=n.hu.get(e),s=n.Pu.get(r.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Ea(n.remoteStore,r.targetId))}async function yc(t,e,n){const r=function(t){const e=We(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=bc.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Tc.bind(null,e),e}(t);try{const t=await function(t,e){const n=We(t),r=vn.now(),s=e.reduce((t,e)=>t.add(e.key),As());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",t=>{let a=vs(),c=As();return n.Bs.getEntries(t,s).next(t=>{a=t,a.forEach((t,e)=>{e.isValidDocument()||(c=c.add(t))})}).next(()=>n.localDocuments.getOverlayedDocuments(t,a)).next(s=>{i=s;const o=[];for(const t of e){const e=Js(t,i.get(t.key).overlayedDocument);null!=e&&o.push(new ei(t.key,e,Nr(e.value.mapValue),Ks.exists(!0)))}return n.mutationQueue.addMutationBatch(t,r,o,e)}).next(e=>{o=e;const r=e.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(t,e.batchId,r)})}).then(()=>({batchId:o.batchId,changes:bs(i)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let r=t.Au[t.currentUser.toKey()];r||(r=new jn(ln)),r=r.insert(e,n),t.Au[t.currentUser.toKey()]=r}(r,t.batchId,n),await Nc(r,t.changes),await Oa(r.remoteStore)}catch(s){const t=Ka(s,"Failed to persist write");n.reject(t)}}async function vc(t,e){const n=We(t);try{const t=await qo(n.localStore,e);e.targetChanges.forEach((t,e)=>{const r=n.Eu.get(e);r&&(Qe(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1,22616),t.addedDocuments.size>0?r.cu=!0:t.modifiedDocuments.size>0?Qe(r.cu,14607):t.removedDocuments.size>0&&(Qe(r.cu,42227),r.cu=!1))}),await Nc(n,t,e)}catch(r){await Nn(r)}}function wc(t,e,n){const r=We(t);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const t=[];r.hu.forEach((n,r)=>{const s=r.view.Fa(e);s.snapshot&&t.push(s.snapshot)}),function(t,e){const n=We(t);n.onlineState=e;let r=!1;n.queries.forEach((t,n)=>{for(const s of n.Sa)s.Fa(e)&&(r=!0)}),r&&ec(n)}(r.eventManager,e),t.length&&r.lu.Y_(t),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Ec(t,e,n){const r=We(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Eu.get(e),i=s&&s.key;if(i){let t=new jn(In.comparator);t=t.insert(i,xr.newNoDocument(i,wn.min()));const n=As().add(i),s=new wi(wn.min(),new Map,new jn(ln),t,n);await vc(r,s),r.Iu=r.Iu.remove(i),r.Eu.delete(e),kc(r)}else await zo(r.localStore,e,!1).then(()=>Ic(r,e,n)).catch(Nn)}async function bc(t,e){const n=We(t),r=e.batch.batchId;try{const t=await function(t,e){const n=We(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",t=>{const r=e.batch.keys(),s=n.Bs.newChangeBuffer({trackRemovals:!0});return function(t,e,n,r){const s=n.batch,i=s.keys();let o=xn.resolve();return i.forEach(t=>{o=o.next(()=>r.getEntry(e,t)).next(e=>{const i=n.docVersions.get(t);Qe(null!==i,48541),e.version.compareTo(i)<0&&(s.applyToRemoteDocument(e,n),e.isValidDocument()&&(e.setReadTime(n.commitVersion),r.addEntry(e)))})}),o.next(()=>t.mutationQueue.removeMutationBatch(e,s))}(n,t,e,s).next(()=>s.apply(t)).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,function(t){let e=As();for(let n=0;n<t.mutationResults.length;++n)t.mutationResults[n].transformResults.length>0&&(e=e.add(t.batch.mutations[n].key));return e}(e))).next(()=>n.localDocuments.getDocuments(t,r))})}(n.localStore,e);Cc(n,r,null),_c(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Nc(n,t)}catch(s){await Nn(s)}}async function Tc(t,e,n){const r=We(t);try{const t=await function(t,e){const n=We(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",t=>{let r;return n.mutationQueue.lookupMutationBatch(t,e).next(e=>(Qe(null!==e,37113),r=e.keys(),n.mutationQueue.removeMutationBatch(t,e))).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,r,e)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,r)).next(()=>n.localDocuments.getDocuments(t,r))})}(r.localStore,e);Cc(r,e,n),_c(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Nc(r,t)}catch(s){await Nn(s)}}function _c(t,e){(t.Ru.get(e)||[]).forEach(t=>{t.resolve()}),t.Ru.delete(e)}function Cc(t,e,n){const r=We(t);let s=r.Au[r.currentUser.toKey()];if(s){const t=s.get(e);t&&(n?t.reject(n):t.resolve(),s=s.remove(e)),r.Au[r.currentUser.toKey()]=s}}function Ic(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Pu.get(e))t.hu.delete(r),n&&t.lu.gu(r,n);t.Pu.delete(e),t.isPrimaryClient&&t.du.Hr(e).forEach(e=>{t.du.containsKey(e)||Sc(t,e)})}function Sc(t,e){t.Tu.delete(e.path.canonicalString());const n=t.Iu.get(e);null!==n&&(Ea(t.remoteStore,n),t.Iu=t.Iu.remove(e),t.Eu.delete(n),kc(t))}function Ac(t,e,n){for(const r of n)r instanceof ic?(t.du.addReference(r.key,e),Dc(t,r)):r instanceof oc?(qe(cc,"Document no longer in limbo: "+r.key),t.du.removeReference(r.key,e),t.du.containsKey(r.key)||Sc(t,r.key)):Ke(19791,{pu:r})}function Dc(t,e){const n=e.key,r=n.path.canonicalString();t.Iu.get(n)||t.Tu.has(r)||(qe(cc,"New document in limbo: "+n),t.Tu.add(r),kc(t))}function kc(t){for(;t.Tu.size>0&&t.Iu.size<t.maxConcurrentLimboResolutions;){const e=t.Tu.values().next().value;t.Tu.delete(e);const n=new In(Tn.fromString(e)),r=t.Vu.next();t.Eu.set(r,new hc(n)),t.Iu=t.Iu.insert(n,r),wa(t.remoteStore,new so(cs(is(n.path)),r,"TargetPurposeLimboResolution",On.le))}}async function Nc(t,e,n){const r=We(t),s=[],i=[],o=[];r.hu.isEmpty()||(r.hu.forEach((t,a)=>{o.push(r.fu(a,e,n).then(t=>{var e;if((t||n)&&r.isPrimaryClient){const s=t?!t.fromCache:null===(e=null==n?void 0:n.targetChanges.get(a.targetId))||void 0===e?void 0:e.current;r.sharedClientState.updateQueryState(a.targetId,s?"current":"not-current")}if(t){s.push(t);const e=Mo.Rs(a.targetId,t);i.push(e)}}))}),await Promise.all(o),r.lu.Y_(s),await async function(t,e){const n=We(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",t=>xn.forEach(e,e=>xn.forEach(e.ds,r=>n.persistence.referenceDelegate.addReference(t,e.targetId,r)).next(()=>xn.forEach(e.As,r=>n.persistence.referenceDelegate.removeReference(t,e.targetId,r)))))}catch(r){if(!Rn(r))throw r;qe(Fo,"Failed to update sequence numbers: "+r)}for(const s of e){const t=s.targetId;if(!s.fromCache){const e=n.xs.get(t),r=e.snapshotVersion,s=e.withLastLimboFreeSnapshotVersion(r);n.xs=n.xs.insert(t,s)}}}(r.localStore,i))}async function xc(t,e){const n=We(t);if(!n.currentUser.isEqual(e)){qe(cc,"User change. New user:",e.toKey());const t=await Bo(n.localStore,e);n.currentUser=e,s="'waitForPendingWrites' promise is rejected due to a user change.",(r=n).Ru.forEach(t=>{t.forEach(t=>{t.reject(new Ye(Xe.CANCELLED,s))})}),r.Ru.clear(),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await Nc(n,t.ks)}var r,s}function Rc(t,e){const n=We(t),r=n.Eu.get(e);if(r&&r.cu)return As().add(r.key);{let t=As();const r=n.Pu.get(e);if(!r)return t;for(const e of r){const r=n.hu.get(e);t=t.unionWith(r.view.eu)}return t}}function Oc(t){const e=We(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=vc.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Rc.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Ec.bind(null,e),e.lu.Y_=Za.bind(null,e.eventManager),e.lu.gu=tc.bind(null,e.eventManager),e}class Lc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=oa(t.databaseInfo.databaseId),this.sharedClientState=this.bu(t),this.persistence=this.Su(t),await this.persistence.start(),this.localStore=this.Du(t),this.gcScheduler=this.vu(t,this.localStore),this.indexBackfillerScheduler=this.Cu(t,this.localStore)}vu(t,e){return null}Cu(t,e){return null}Du(t){return function(t,e,n,r){return new Uo(t,e,n,r)}(this.persistence,new Vo,t.initialUser,this.serializer)}Su(t){return new xo(Oo.fi,this.serializer)}bu(t){return new Go}async terminate(){var t,e;null===(t=this.gcScheduler)||void 0===t||t.stop(),null===(e=this.indexBackfillerScheduler)||void 0===e||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Lc.provider={build:()=>new Lc};class Mc extends Lc{constructor(t){super(),this.cacheSizeBytes=t}vu(t,e){Qe(this.persistence.referenceDelegate instanceof Lo,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new yo(n,t.asyncQueue,e)}Su(t){const e=void 0!==this.cacheSizeBytes?lo.withCacheSize(this.cacheSizeBytes):lo.DEFAULT;return new xo(t=>Lo.fi(t,e),this.serializer)}}class Pc{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>wc(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=xc.bind(null,this.syncEngine),await async function(t,e){const n=We(t);e?(n.da.delete(2),await ya(n)):e||(n.da.add(2),await va(n),n.Va.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new Ya}createDatastore(t){const e=oa(t.databaseInfo.databaseId),n=(r=t.databaseInfo,new sa(r));var r;return function(t,e,n,r){return new fa(t,e,n,r)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,r=t.asyncQueue,s=t=>wc(this.syncEngine,t,0),i=Xo.C()?new Xo:new Qo,new ma(e,n,r,s,i);var e,n,r,s,i}createSyncEngine(t,e){return function(t,e,n,r,s,i,o){const a=new lc(t,e,n,r,s,i);return o&&(a.mu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(t){const e=We(t);qe(ga,"RemoteStore shutting down."),e.da.add(5),await va(e),e.Ra.shutdown(),e.Va.set("Unknown")}(this.remoteStore),null===(t=this.datastore)||void 0===t||t.terminate(),null===(e=this.eventManager)||void 0===e||e.terminate()}}Pc.provider={build:()=>new Pc};
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
class Vc{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Mu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Mu(this.observer.error,t):$e("Uncaught Error in snapshot listener:",t.toString()))}xu(){this.muted=!0}Mu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}
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
 */const Fc="FirestoreClient";class Uc{constructor(t,e,n,r,s){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=r,this.user=Fe.UNAUTHENTICATED,this.clientId=hn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async t=>{qe(Fc,"Received user=",t.uid),await this.authCredentialListener(t),this.user=t}),this.appCheckCredentials.start(n,t=>(qe(Fc,"Received new app check token=",t),this.appCheckCredentialListener(t,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Je;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Ka(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function Bc(t,e){t.asyncQueue.verifyOperationInProgress(),qe(Fc,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async t=>{r.isEqual(t)||(await Bo(e.localStore,t),r=t)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function jc(t,e){t.asyncQueue.verifyOperationInProgress();const n=await async function(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){qe(Fc,"Using user provided OfflineComponentProvider");try{await Bc(t,t._uninitializedComponentsProvider._offline)}catch(e){const s=e;if(!("FirebaseError"===(n=s).name?n.code===Xe.FAILED_PRECONDITION||n.code===Xe.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&n instanceof DOMException)||22===n.code||20===n.code||11===n.code))throw s;ze("Error using user provided cache. Falling back to memory cache: "+s),await Bc(t,new Lc)}}else qe(Fc,"Using default OfflineComponentProvider"),await Bc(t,new Mc(void 0));var n;return t._offlineComponents}(t);qe(Fc,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(t=>qa(e.remoteStore,t)),t.setAppCheckTokenChangeListener((t,n)=>qa(e.remoteStore,n)),t._onlineComponents=e}async function qc(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(qe(Fc,"Using user provided OnlineComponentProvider"),await jc(t,t._uninitializedComponentsProvider._online)):(qe(Fc,"Using default OnlineComponentProvider"),await jc(t,new Pc))),t._onlineComponents}async function $c(t){const e=await qc(t),n=e.eventManager;return n.onListen=dc.bind(null,e.syncEngine),n.onUnlisten=gc.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=fc.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=mc.bind(null,e.syncEngine),n}function zc(t,e,n={}){const r=new Je;return t.asyncQueue.enqueueAndForget(async()=>function(t,e,n,r,s){const i=new Vc({next:a=>{i.xu(),e.enqueueAndForget(()=>async function(t,e){const n=We(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const t=i.Sa.indexOf(e);t>=0&&(i.Sa.splice(t,1),0===i.Sa.length?s=e.va()?0:1:!i.Da()&&e.va()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}(t,o));const c=a.docs.has(n);!c&&a.fromCache?s.reject(new Ye(Xe.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&r&&"server"===r.source?s.reject(new Ye(Xe.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(a)},error:t=>s.reject(t)}),o=new sc(is(n.path),i,{includeMetadataChanges:!0,Qa:!0});return async function(e,n){const r=We(e);let s=3;const i=n.query;let o=r.queries.get(i);o?!o.Da()&&n.va()&&(s=2):(o=new Xa,s=n.va()?0:1);try{switch(s){case 0:o.ba=await r.onListen(i,!0);break;case 1:o.ba=await r.onListen(i,!1);break;case 2:await r.onFirstRemoteStoreListen(i)}}catch(t){const r=Ka(t,`Initialization of query '${ds(n.query)}' failed`);return void n.onError(r)}r.queries.set(i,o),o.Sa.push(n),n.Fa(r.onlineState),o.ba&&n.Ma(o.ba)&&ec(r)}(t,o)}(await $c(t),t.asyncQueue,e,n,r)),r.promise
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
 */}function Hc(t){const e={};return void 0!==t.timeoutSeconds&&(e.timeoutSeconds=t.timeoutSeconds),e
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
 */}const Kc=new Map;
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
 */function Gc(t){if(!In.isDocumentKey(t))throw new Ye(Xe.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Qc(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const n=(e=t).constructor?e.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var e;return"function"==typeof t?"a function":Ke(12329,{type:typeof t})}function Wc(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Ye(Xe.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Qc(t);throw new Ye(Xe.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
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
 */const Xc="firestore.googleapis.com",Yc=!0;class Jc{constructor(t){var e,n;if(void 0===t.host){if(void 0!==t.ssl)throw new Ye(Xe.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Xc,this.ssl=Yc}else this.host=t.host,this.ssl=null!==(e=t.ssl)&&void 0!==e?e:Yc;if(this.isUsingEmulator=void 0!==t.emulatorOptions,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,void 0===t.cacheSizeBytes)this.cacheSizeBytes=ho;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new Ye(Xe.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}(function(t,e,n,r){if(!0===e&&!0===r)throw new Ye(Xe.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)})("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===t.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Hc(null!==(n=t.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(t){if(void 0!==t.timeoutSeconds){if(isNaN(t.timeoutSeconds))throw new Ye(Xe.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (must not be NaN)`);if(t.timeoutSeconds<5)throw new Ye(Xe.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (minimum allowed value is 5)`);if(t.timeoutSeconds>30)throw new Ye(Xe.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(e=this.experimentalLongPollingOptions,n=t.experimentalLongPollingOptions,e.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams;var e,n}}class Zc{constructor(t,e,n,r){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Jc({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Ye(Xe.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new Ye(Xe.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Jc(t),this._emulatorOptions=t.emulatorOptions||{},void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new tn;switch(t.type){case"firstParty":return new sn(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new Ye(Xe.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Kc.get(t);e&&(qe("ComponentProvider","Removing Datastore"),Kc.delete(t),e.terminate())}(this),Promise.resolve()}}function tu(t,e,n,r={}){var s;t=Wc(t,Zc);const i=$(e),o=t._getSettings(),a=Object.assign(Object.assign({},o),{emulatorOptions:t._getEmulatorOptions()}),c=`${e}:${n}`;i&&(async function(t){(await fetch(t,{credentials:"include"})).ok}
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
 */(`https://${c}`),K("Firestore",!0)),o.host!==Xc&&o.host!==c&&ze("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u=Object.assign(Object.assign({},o),{host:c,ssl:i,emulatorOptions:r});if(!Y(u,a)&&(t._setSettings(u),r.mockUserToken)){let e,n;if("string"==typeof r.mockUserToken)e=r.mockUserToken,n=Fe.MOCK_USER;else{e=function(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=e||"demo-project",r=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const i=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[P(JSON.stringify({alg:"none",type:"JWT"})),P(JSON.stringify(i)),""].join(".")}(r.mockUserToken,null===(s=t._app)||void 0===s?void 0:s.options.projectId);const i=r.mockUserToken.sub||r.mockUserToken.user_id;if(!i)throw new Ye(Xe.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new Fe(i)}t._authCredentials=new en(new Ze(e,n))}}
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
 */class eu{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new eu(this.firestore,t,this._query)}}class nu{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ru(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new nu(this.firestore,t,this._key)}}class ru extends eu{constructor(t,e,n){super(t,e,is(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new nu(this.firestore,null,new In(t))}withConverter(t){return new ru(this.firestore,t,this._path)}}function su(t,e,...n){if(t=Z(t),1===arguments.length&&(e=hn.newId()),function(t,e,n){if(!n)throw new Ye(Xe.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}("doc","path",e),t instanceof Zc){const r=Tn.fromString(e,...n);return Gc(r),new nu(t,null,new In(r))}{if(!(t instanceof nu||t instanceof ru))throw new Ye(Xe.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Tn.fromString(e,...n));return Gc(r),new nu(t.firestore,t instanceof ru?t.converter:null,new In(r))}}
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
 */const iu="AsyncQueue";class ou{constructor(t=Promise.resolve()){this.Ju=[],this.Yu=!1,this.Zu=[],this.Xu=null,this.ec=!1,this.tc=!1,this.nc=[],this.x_=new aa(this,"async_queue_retry"),this.rc=()=>{const t=ia();t&&qe(iu,"Visibility state changed to "+t.visibilityState),this.x_.b_()},this.sc=t;const e=ia();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.rc)}get isShuttingDown(){return this.Yu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.oc(),this._c(t)}enterRestrictedMode(t){if(!this.Yu){this.Yu=!0,this.tc=t||!1;const e=ia();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.rc)}}enqueue(t){if(this.oc(),this.Yu)return new Promise(()=>{});const e=new Je;return this._c(()=>this.Yu&&this.tc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Ju.push(t),this.ac()))}async ac(){if(0!==this.Ju.length){try{await this.Ju[0](),this.Ju.shift(),this.x_.reset()}catch(t){if(!Rn(t))throw t;qe(iu,"Operation failed with retryable error: "+t)}this.Ju.length>0&&this.x_.y_(()=>this.ac())}}_c(t){const e=this.sc.then(()=>(this.ec=!0,t().catch(t=>{throw this.Xu=t,this.ec=!1,$e("INTERNAL UNHANDLED ERROR: ",au(t)),t}).then(t=>(this.ec=!1,t))));return this.sc=e,e}enqueueAfterDelay(t,e,n){this.oc(),this.nc.indexOf(t)>-1&&(e=0);const r=Ha.createAndSchedule(this,t,e,n,t=>this.uc(t));return this.Zu.push(r),r}oc(){this.Xu&&Ke(47125,{cc:au(this.Xu)})}verifyOperationInProgress(){}async lc(){let t;do{t=this.sc,await t}while(t!==this.sc)}hc(t){for(const e of this.Zu)if(e.timerId===t)return!0;return!1}Pc(t){return this.lc().then(()=>{this.Zu.sort((t,e)=>t.targetTimeMs-e.targetTimeMs);for(const e of this.Zu)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.lc()})}Tc(t){this.nc.push(t)}uc(t){const e=this.Zu.indexOf(t);this.Zu.splice(e,1)}}function au(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}class cu extends Zc{constructor(t,e,n,r){super(t,e,n,r),this.type="firestore",this._queue=new ou,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new ou(t),this._firestoreClient=void 0,await t}}}function uu(t){if(t._terminated)throw new Ye(Xe.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||function(t){var e,n,r;const s=t._freezeSettings(),i=(o=t._databaseId,a=(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",c=t._persistenceKey,u=s,new or(o,a,c,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,Hc(u.experimentalLongPollingOptions),u.useFetchStreams,u.isUsingEmulator));var o,a,c,u;t._componentsProvider||(null===(n=s.localCache)||void 0===n?void 0:n._offlineComponentProvider)&&(null===(r=s.localCache)||void 0===r?void 0:r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new Uc(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(t){const e=null==t?void 0:t._online.build();return{_offline:null==t?void 0:t._offline.build(e),_online:e}}(t._componentsProvider))}
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
 */(t),t._firestoreClient}class hu{constructor(t){this._byteString=t}static fromBase64String(t){try{return new hu(Qn.fromBase64String(t))}catch(e){throw new Ye(Xe.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new hu(Qn.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
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
 */class lu{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new Ye(Xe.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Cn(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
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
 */class du{constructor(t){this._methodName=t}}
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
 */class fu{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new Ye(Xe.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new Ye(Xe.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return ln(this._lat,t._lat)||ln(this._long,t._long)}}
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
 */class pu{constructor(t){this._values=(t||[]).map(t=>t)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(t[n]!==e[n])return!1;return!0}(this._values,t._values)}}
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
 */const gu=/^__.*__$/;class mu{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new ei(t,this.data,this.fieldMask,e,this.fieldTransforms):new ti(t,this.data,e,this.fieldTransforms)}}class yu{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new ei(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function vu(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Ke(40011,{Ic:t})}}class wu{constructor(t,e,n,r,s,i){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===s&&this.Ec(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Ic(){return this.settings.Ic}dc(t){return new wu(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Ac(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.dc({path:n,Rc:!1});return r.Vc(t),r}mc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.dc({path:n,Rc:!1});return r.Ec(),r}fc(t){return this.dc({path:void 0,Rc:!0})}gc(t){return Ru(t,this.settings.methodName,this.settings.yc||!1,this.path,this.settings.wc)}contains(t){return void 0!==this.fieldMask.find(e=>t.isPrefixOf(e))||void 0!==this.fieldTransforms.find(e=>t.isPrefixOf(e.field))}Ec(){if(this.path)for(let t=0;t<this.path.length;t++)this.Vc(this.path.get(t))}Vc(t){if(0===t.length)throw this.gc("Document fields must not be empty");if(vu(this.Ic)&&gu.test(t))throw this.gc('Document fields cannot begin and end with "__"')}}class Eu{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||oa(t)}bc(t,e,n,r=!1){return new wu({Ic:t,methodName:e,wc:n,path:Cn.emptyPath(),Rc:!1,yc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function bu(t){const e=t._freezeSettings(),n=oa(t._databaseId);return new Eu(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Tu(t,e,n,r,s,i={}){const o=t.bc(i.merge||i.mergeFields?2:0,e,n,s);Du("Data must be an object, but it was:",o,r);const a=Su(r,o);let c,u;if(i.merge)c=new Kn(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const r of i.mergeFields){const s=ku(e,r,n);if(!o.contains(s))throw new Ye(Xe.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);Ou(t,s)||t.push(s)}c=new Kn(t),u=o.fieldTransforms.filter(t=>c.covers(t.field))}else c=null,u=o.fieldTransforms;return new mu(new kr(a),c,u)}class _u extends du{_toFieldTransform(t){if(2!==t.Ic)throw 1===t.Ic?t.gc(`${this._methodName}() can only appear at the top level of your update data`):t.gc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof _u}}class Cu extends du{constructor(t,e){super(t),this.Dc=e}_toFieldTransform(t){const e=new js(t.serializer,xs(t.serializer,this.Dc));return new zs(t.path,e)}isEqual(t){return t instanceof Cu&&this.Dc===t.Dc}}function Iu(t,e){if(Au(t=Z(t)))return Du("Unsupported field value:",e,t),Su(t,e);if(t instanceof du)return function(t,e){if(!vu(e.Ic))throw e.gc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.gc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.Rc&&4!==e.Ic)throw e.gc("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const s of t){let t=Iu(s,e.fc(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=Z(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return xs(e.serializer,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=vn.fromDate(t);return{timestampValue:Oi(e.serializer,n)}}if(t instanceof vn){const n=new vn(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Oi(e.serializer,n)}}if(t instanceof fu)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof hu)return{bytesValue:Li(e.serializer,t._byteString)};if(t instanceof nu){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e.gc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Vi(t.firestore._databaseId||e.databaseId,t._key.path)}}if(t instanceof pu)return n=t,r=e,{mapValue:{fields:{[ur]:{stringValue:dr},[fr]:{arrayValue:{values:n.toArray().map(t=>{if("number"!=typeof t)throw r.gc("VectorValues must only contain numeric values.");return ks(r.serializer,t)})}}}}};var n,r;throw e.gc(`Unsupported field value: ${Qc(t)}`)}(t,e)}function Su(t,e){const n={};return Bn(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Un(t,(t,r)=>{const s=Iu(r,e.Ac(t));null!=s&&(n[t]=s)}),{mapValue:{fields:n}}}function Au(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof vn||t instanceof fu||t instanceof hu||t instanceof nu||t instanceof du||t instanceof pu)}function Du(t,e,n){if(!Au(n)||("object"!=typeof(r=n)||null===r||Object.getPrototypeOf(r)!==Object.prototype&&null!==Object.getPrototypeOf(r))){const r=Qc(n);throw"an object"===r?e.gc(t+" a custom object"):e.gc(t+" "+r)}var r}function ku(t,e,n){if((e=Z(e))instanceof lu)return e._internalPath;if("string"==typeof e)return xu(t,e);throw Ru("Field path arguments must be of type string or ",t,!1,void 0,n)}const Nu=new RegExp("[~\\*/\\[\\]]");function xu(t,e,n){if(e.search(Nu)>=0)throw Ru(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new lu(...e.split("."))._internalPath}catch(r){throw Ru(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Ru(t,e,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new Ye(Xe.INVALID_ARGUMENT,a+t+c)}function Ou(t,e){return t.some(t=>t.isEqual(e))}
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
 */class Lu{constructor(t,e,n,r,s){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new nu(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new Mu(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Pu("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class Mu extends Lu{data(){return super.data()}}function Pu(t,e){return"string"==typeof e?xu(t,e):e instanceof lu?e._internalPath:e._delegate._internalPath}class Vu{convertValue(t,e="none"){switch(pr(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Yn(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Jn(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw Ke(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Un(t,(t,r)=>{n[t]=this.convertValue(r,e)}),n}convertVectorValue(t){var e,n,r;const s=null===(r=null===(n=null===(e=t.fields)||void 0===e?void 0:e[fr].arrayValue)||void 0===n?void 0:n.values)||void 0===r?void 0:r.map(t=>Yn(t.doubleValue));return new pu(s)}convertGeoPoint(t){return new fu(Yn(t.latitude),Yn(t.longitude))}convertArray(t,e){return(t.values||[]).map(t=>this.convertValue(t,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=sr(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(ir(t));default:return null}}convertTimestamp(t){const e=Xn(t);return new vn(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Tn.fromString(t);Qe(ro(n),9688,{name:t});const r=new cr(n.get(1),n.get(3)),s=new In(n.popFirst(5));return r.isEqual(e)||$e(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}
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
class Fu{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Uu extends Lu{constructor(t,e,n,r,s,i){super(t,e,n,r,i),this._firestore=t,this._firestoreImpl=t,this.metadata=s}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Bu(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Pu("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class Bu extends Uu{data(t={}){return super.data(t)}}
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
 */function ju(t){t=Wc(t,nu);const e=Wc(t.firestore,cu);return zc(uu(e),t._key).then(n=>function(t,e,n){const r=n.docs.get(e._key),s=new qu(t);return new Uu(t,s,e._key,r,new Fu(n.hasPendingWrites,n.fromCache),e.converter)}(e,t,n))}class qu extends Vu{constructor(t){super(),this.firestore=t}convertBytes(t){return new hu(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new nu(this.firestore,null,e)}}function $u(t,e,n){t=Wc(t,nu);const r=Wc(t.firestore,cu),s=function(t,e){let n;return n=t?t.toFirestore(e):e,n}(t.converter,e);return Hu(r,[Tu(bu(r),"setDoc",t._key,s,null!==t.converter,n).toMutation(t._key,Ks.none())])}function zu(t,e,n,...r){t=Wc(t,nu);const s=Wc(t.firestore,cu),i=bu(s);let o;return o="string"==typeof(e=Z(e))||e instanceof lu?function(t,e,n,r,s,i){const o=t.bc(1,e,n),a=[ku(e,r,n)],c=[s];if(i.length%2!=0)throw new Ye(Xe.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(ku(e,i[d])),c.push(i[d+1]);const u=[],h=kr.empty();for(let d=a.length-1;d>=0;--d)if(!Ou(u,a[d])){const t=a[d];let e=c[d];e=Z(e);const n=o.mc(t);if(e instanceof _u)u.push(t);else{const r=Iu(e,n);null!=r&&(u.push(t),h.set(t,r))}}const l=new Kn(u);return new yu(h,l,o.fieldTransforms)}(i,"updateDoc",t._key,e,n,r):function(t,e,n,r){const s=t.bc(1,e,n);Du("Data must be an object, but it was:",s,r);const i=[],o=kr.empty();Un(r,(t,r)=>{const a=xu(e,t,n);r=Z(r);const c=s.mc(a);if(r instanceof _u)i.push(a);else{const t=Iu(r,c);null!=t&&(i.push(a),o.set(a,t))}});const a=new Kn(i);return new yu(o,a,s.fieldTransforms)}(i,"updateDoc",t._key,e),Hu(s,[o.toMutation(t._key,Ks.exists(!0))])}function Hu(t,e){return function(t,e){const n=new Je;return t.asyncQueue.enqueueAndForget(async()=>yc(await function(t){return qc(t).then(t=>t.syncEngine)}(t),e,n)),n.promise}(uu(t),e)}function Ku(t){return new Cu("increment",t)}!function(t,e=!0){Ue="11.9.0",ue(new tt("firestore",(t,{instanceIdentifier:n,options:r})=>{const s=t.getProvider("app").getImmediate(),i=new cu(new nn(t.getProvider("auth-internal")),new an(s,t.getProvider("app-check-internal")),function(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new Ye(Xe.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new cr(t.options.projectId,e)}(s,n),s);return r=Object.assign({useFetchStreams:e},r),i._setSettings(r),i},"PUBLIC").setMultipleInstances(!0)),fe(Pe,Ve,t),fe(Pe,Ve,"esm2017")}();const Gu=function(t){const e="object"==typeof t?t:function(t=re){const e=ie.get(t);if(!e&&t===re&&j())return de();if(!e)throw he.create("no-app",{appName:t});return e}(),n="string"==typeof t?t:ar,r=function(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}(e,"firestore").getImmediate({identifier:n});if(!r._initialized){const t=B("firestore");t&&tu(r,...t)}return r}(de({apiKey:"AIzaSyCWhnqOzsDExtNu14s_gxUpAWeV-PPPog8",authDomain:"click-counter-4f529.firebaseapp.com",projectId:"click-counter-4f529",storageBucket:"click-counter-4f529.appspot.com",messagingSenderId:"950861743362",appId:"1:950861743362:web:77dc41eb31b34334566e1b",measurementId:"G-7EEMWQS33Z"})),Qu=su(Gu,"clicks","counter"),Wu=su(Gu,"terminal","stats");async function Xu(){try{(await ju(Wu)).exists()?await zu(Wu,{totalVisits:Ku(1),lastVisit:(new Date).toISOString()}):await $u(Wu,{totalVisits:1,totalCommands:0,commandStats:{},lastVisit:(new Date).toISOString()})}catch(t){}}async function Yu(t){try{const e=await ju(Wu);if(e.exists()){const n=e.data().commandStats||{};n[t]=(n[t]||0)+1,await zu(Wu,{totalCommands:Ku(1),commandStats:n})}else await $u(Wu,{totalVisits:0,totalCommands:1,commandStats:{[t]:1},lastVisit:(new Date).toISOString()})}catch(e){}}async function Ju(){try{const t=await ju(Wu);if(t.exists()){const e=t.data();return{totalVisits:e.totalVisits||0,totalCommands:e.totalCommands||0,commandStats:e.commandStats||{},lastVisit:e.lastVisit?new Date(e.lastVisit):null}}return{totalVisits:0,totalCommands:0,commandStats:{},lastVisit:null}}catch(t){return{totalVisits:0,totalCommands:0,commandStats:{},lastVisit:null}}}const Zu={key:0},th={key:1},eh={class:"nes-container is-dark with-title is-centered is-rounded"};const nh={class:"content"};const rh=[{path:"/",component:()=>w(()=>import("./pixelTransition-DCnRY8xR.js"),__vite__mapDeps([0,1,2,3,4,5]))},{path:"/terminal",component:()=>w(()=>import("./home-Bs-htu3r.js"),__vite__mapDeps([6,1,2,3,7,5]))},{path:"/under_construction",component:y({name:"UnderConstruction",components:{ClickCounter:y({name:"ClickCounter",data:()=>({counter:null,loading:!0}),async mounted(){this.counter=await async function(){const t=await ju(Qu);return t.exists()?t.data().count:0}(),this.loading=!1},methods:{async incrementCounter(){this.counter++;try{await async function(){await zu(Qu,{count:Ku(1)})}()}catch{this.counter--}}}},[["render",function(t,s,i,o,a,c){return n(),e("div",null,[a.loading?(n(),e("p",Zu,"Loading...")):(n(),e("div",th,[r("div",eh,[s[1]||(s[1]=r("p",{class:"title"},"Waste your time",-1)),r("button",{id:"clicker",class:"nes-btn is-normal small-font",onClick:s[0]||(s[0]=(...t)=>c.incrementCounter&&c.incrementCounter(...t))}," ONE CLICK AT A TIME "),r("p",null,[r("span",null,f(a.counter),1)])])]))])}],["__scopeId","data-v-f8425273"]])}},[["render",function(i,o,a,c,u,h){const l=t("ClickCounter");return n(),e("div",nh,[o[0]||(o[0]=r("div",{class:"nes-container is-dark is-rounded"},[r("p",null,"Under Construction"),r("img",{src:"/assets/img/construction.gif",alt:"construction GIF",class:"construction-gif"}),r("p")],-1)),s(l)])}],["__scopeId","data-v-e06d0779"]])},{path:"/secret_link",component:k},{path:"/game",component:()=>w(()=>import("./game-BrEHgKzf.js").then(t=>t.G),__vite__mapDeps([2,1,3]))},{path:"/contact",component:()=>w(()=>import("./Contact-BwNEUtbL.js"),__vite__mapDeps([8,1,2,3,9]))},{path:"/sport",component:()=>w(()=>import("./sport-DCUSFl1a.js"),__vite__mapDeps([10,1]))},{path:"/:pathMatch(.*)*",component:x}],sh=p({history:g("/"),routes:rh});m(D).use(sh).mount("#app");export{T as S,Xu as a,Ju as l,Yu as t};
