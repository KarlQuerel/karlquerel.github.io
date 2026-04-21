const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/game-Bw-zgJyu.js","assets/vendor-4nMJbIDi.js","assets/game-I_N9_9Zg.css","assets/pixelTransition-BIjaTa7d.js","assets/pixelTransition-DFKTHeuF.css"])))=>i.map(i=>d[i]);
/* empty css               */import{q as t,s as e,r as n,x as s,b as r,c as i,d as o,m as a,y as c,g as l,e as u,k as h,f as d,h as f,u as p,z as m,t as g,A as y,i as v,B as w,o as b,F as E,j as _,w as T,C as S,D as C,n as I,E as A,G as k,H as D}from"./vendor-4nMJbIDi.js";import{_ as N}from"./game-Bw-zgJyu.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const n of t)if("childList"===n.type)for(const t of n.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)}).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const x={},R=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let t=function(t){return Promise.all(t.map(t=>Promise.resolve(t).then(t=>({status:"fulfilled",value:t}),t=>({status:"rejected",reason:t}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),r=(null==n?void 0:n.nonce)||(null==n?void 0:n.getAttribute("nonce"));s=t(e.map(t=>{if((t=function(t){return"/"+t}(t))in x)return;x[t]=!0;const e=t.endsWith(".css"),n=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${n}`))return;const s=document.createElement("link");return s.rel=e?"stylesheet":"modulepreload",e||(s.as="script"),s.crossOrigin="",s.href=t,r&&s.setAttribute("nonce",r),document.head.appendChild(s),e?new Promise((e,n)=>{s.addEventListener("load",e),s.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${t}`)))}):void 0}))}function r(t){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t}return s.then(e=>{for(const t of e||[])"rejected"===t.status&&r(t.reason);return t().catch(r)})},L="/assets/img/Yako_logo_128.png",O={class:"navbar-container"},P={id:"app"};const M=N({name:"App",components:{RetroNavbar:N({__name:"retroNavbar",setup(p){const m=t(),g=n(!1),y=n(!1),v=e("footerVisibility",{isVisible:n(!0),toggleFooter:()=>{},hideFooter:()=>{},showFooter:()=>{}}),w=f(()=>"/game"===m.path),b=()=>{g.value=!g.value},E=()=>{g.value=!1},_=()=>{y.value=!y.value,v.toggleFooter()};return(t,e)=>{const n=s("router-link");return r(),i("nav",{class:l(["navbar",{"menu-active":g.value,"navbar-hidden":y.value}])},[o("div",O,[a(n,{to:"/",class:"logo",onClick:E},{default:c(()=>[...e[0]||(e[0]=[o("img",{src:L,class:"default-img",alt:"Logo"},null,-1),o("img",{src:L,class:"glitch-img",alt:"Logo Glitch"},null,-1)])]),_:1}),o("div",{class:"menu-toggle",onClick:b},[...e[1]||(e[1]=[o("div",{class:"bar"},null,-1),o("div",{class:"bar"},null,-1),o("div",{class:"bar"},null,-1)])]),o("ul",{class:l(["nav-links",{active:g.value}])},[o("li",null,[a(n,{to:"/game",class:"glitch-button","data-text":"GAME",onClick:E},{default:c(()=>[...e[2]||(e[2]=[o("span",null,"GAME",-1)])]),_:1})]),o("li",null,[a(n,{to:"/under_construction",class:"glitch-button","data-text":"COMING SOON",onClick:E},{default:c(()=>[...e[3]||(e[3]=[o("span",null,[u("COMING"),o("br"),u("SOON")],-1)])]),_:1})]),e[4]||(e[4]=h('<div class="share" data-v-2d5c7342><a href="mailto:karlquerel@gmail.com" target="_blank" data-v-2d5c7342><i class="nes-icon gmail is-medium" data-v-2d5c7342></i></a><a href="https://github.com/KarlQuerel" target="_blank" data-v-2d5c7342><i class="nes-icon github is-medium" data-v-2d5c7342></i></a><a href="https://www.linkedin.com/in/karlquerel" target="_blank" data-v-2d5c7342><i class="nes-icon linkedin is-medium" data-v-2d5c7342></i></a></div>',1))],2)]),w.value?(r(),i("button",{key:0,class:l(["hide-navbar-btn",{hidden:y.value}]),onClick:_},[o("img",{src:"/assets/img/navbar-arrow.png",alt:"Toggle Navbar",class:l(["arrow-icon",{"arrow-up":y.value,"arrow-down":!y.value}])},null,2)],2)):d("",!0)],2)}}},[["__scopeId","data-v-2d5c7342"]]),RetroFooter:N({__name:"retroFooter",setup(t){const s=e("footerVisibility",{isVisible:n(!0),toggleFooter:()=>{},hideFooter:()=>{},showFooter:()=>{}});return(t,e)=>(r(),i("footer",{class:l(["footer",{"footer-hidden":!p(s).isVisible.value}]),"data-nosnippet":""},[...e[0]||(e[0]=[o("div",{class:"footer-copyright"},[o("span",null,"© 2026 Karl Querel - All rights reserved")],-1)])],2))}},[["__scopeId","data-v-a09001f6"]])},setup(){const t=n(!0);m("footerVisibility",{isVisible:t,toggleFooter:()=>{t.value=!t.value},hideFooter:()=>{t.value=!1},showFooter:()=>{t.value=!0}})}},[["render",function(t,e,n,o,c,l){const u=s("RetroNavbar"),h=s("router-view"),d=s("RetroFooter");return r(),i("div",P,[a(u),a(h),a(d)])}]]);const V=N({mounted(){window.location.href="https://shattereddisk.github.io/rickroll/rickroll.mp4"}},[["render",function(t,e,n,s,o,a){return r(),i("div",null,"Redirecting...")}]]),F={class:"content"};const U=N({name:"NotFound"},[["render",function(t,e,n,s,a,c){return r(),i("div",F,[...e[0]||(e[0]=[o("div",{class:"nes-container is-dark is-rounded"},[o("img",{src:"/assets/img/yako-not-found.gif",alt:"lost yako"}),o("h1",null,"Page not found")],-1)])])}],["__scopeId","data-v-da04b479"]]);var B={};
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
 */const j=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=63&r|128):55296==(64512&r)&&s+1<t.length&&56320==(64512&t.charCodeAt(s+1))?(r=65536+((1023&r)<<10)+(1023&t.charCodeAt(++s)),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=63&r|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=63&r|128)}return e},$={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const e=t[r],i=r+1<t.length,o=i?t[r+1]:0,a=r+2<t.length,c=a?t[r+2]:0,l=e>>2,u=(3&e)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,i||(h=64)),s.push(n[l],n[u],n[h],n[d])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(j(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((31&r)<<6|63&i)}else if(r>239&&r<365){const i=((7&r)<<18|(63&t[n++])<<12|(63&t[n++])<<6|63&t[n++])-65536;e[s++]=String.fromCharCode(55296+(i>>10)),e[s++]=String.fromCharCode(56320+(1023&i))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((15&r)<<12|(63&i)<<6|63&o)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const e=n[t.charAt(r++)],i=r<t.length?n[t.charAt(r)]:0;++r;const o=r<t.length?n[t.charAt(r)]:64;++r;const a=r<t.length?n[t.charAt(r)]:64;if(++r,null==e||null==i||null==o||null==a)throw new q;const c=e<<2|i>>4;if(s.push(c),64!==o){const t=i<<4&240|o>>2;if(s.push(t),64!==a){const t=o<<6&192|a;s.push(t)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class q extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const z=function(t){return function(t){const e=j(t);return $.encodeByteArray(e,!0)}(t).replace(/\./g,"")};
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
const K=()=>
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
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,G=()=>{if("undefined"==typeof document)return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const e=t&&function(t){try{return $.decodeString(t,!0)}catch(n){}return null}(t[1]);return e&&JSON.parse(e)},H=()=>{try{return K()||(()=>{if("undefined"==typeof process)return;const t=B.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0})()||G()}catch(t){return}},Q=t=>{const e=(t=>{var e,n;return null===(n=null===(e=H())||void 0===e?void 0:e.emulatorHosts)||void 0===n?void 0:n[t]})(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return"["===e[0]?[e.substring(1,n-1),s]:[e.substring(0,n),s]},W=()=>{var t;return null===(t=H())||void 0===t?void 0:t.config};
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
class Y{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch(()=>{}),1===t.length?t(e):t(e,n))}}}
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
 */function X(){return!function(){var t;const e=null===(t=H())||void 0===t?void 0:t.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(n){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}class J extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,J.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Z.prototype.create)}}class Z{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,r=this.errors[t],i=r?function(t,e){return t.replace(tt,(t,n)=>{const s=e[n];return null!=s?String(s):`<${n}?>`})}(r,n):"Error",o=`${this.serviceName}: ${i} (${s}).`;return new J(s,o,n)}}const tt=/\{\$([^}]+)}/g;function et(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const n=t[r],i=e[r];if(nt(n)&&nt(i)){if(!et(n,i))return!1}else if(n!==i)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function nt(t){return null!==t&&"object"==typeof t}
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
 */function st(t){return t&&t._delegate?t._delegate:t}class rt{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}
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
 */const it="[DEFAULT]";
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
 */class ot{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const t=new Y;if(this.instancesDeferred.set(e,t),this.isInitialized(e)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:e});n&&t.resolve(n)}catch(n){}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),s=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(s)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
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
 */(t))try{this.getOrInitializeService({instanceIdentifier:it})}catch(e){}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const t=this.getOrInitializeService({instanceIdentifier:s});n.resolve(t)}catch(e){}}}}clearInstance(t=it){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...t.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return null!=this.component}isInitialized(t=it){return this.instances.has(t)}getOptions(t=it){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[r,i]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(r)&&i.resolve(s)}return s}onInit(t,e){var n;const s=this.normalizeInstanceIdentifier(e),r=null!==(n=this.onInitCallbacks.get(s))&&void 0!==n?n:new Set;r.add(t),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&t(i,s),()=>{r.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const r of n)try{r(t,e)}catch(s){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(s=t,s===it?void 0:s),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch(r){}var s;return n||null}normalizeInstanceIdentifier(t=it){return this.component?this.component.multipleInstances?t:it:t}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class at{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new ot(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}
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
 */var ct,lt;(lt=ct||(ct={}))[lt.DEBUG=0]="DEBUG",lt[lt.VERBOSE=1]="VERBOSE",lt[lt.INFO=2]="INFO",lt[lt.WARN=3]="WARN",lt[lt.ERROR=4]="ERROR",lt[lt.SILENT=5]="SILENT";const ut={debug:ct.DEBUG,verbose:ct.VERBOSE,info:ct.INFO,warn:ct.WARN,error:ct.ERROR,silent:ct.SILENT},ht=ct.INFO,dt={[ct.DEBUG]:"log",[ct.VERBOSE]:"log",[ct.INFO]:"info",[ct.WARN]:"warn",[ct.ERROR]:"error"},ft=(t,e,...n)=>{if(e<t.logLevel)return;(new Date).toISOString();if(!dt[e])throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class pt{constructor(t){this.name=t,this._logLevel=ht,this._logHandler=ft,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in ct))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?ut[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,ct.DEBUG,...t),this._logHandler(this,ct.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,ct.VERBOSE,...t),this._logHandler(this,ct.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,ct.INFO,...t),this._logHandler(this,ct.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,ct.WARN,...t),this._logHandler(this,ct.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,ct.ERROR,...t),this._logHandler(this,ct.ERROR,...t)}}let mt,gt;const yt=new WeakMap,vt=new WeakMap,wt=new WeakMap,bt=new WeakMap,Et=new WeakMap;let _t={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return vt.get(t);if("objectStoreNames"===e)return t.objectStoreNames||wt.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ct(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function Tt(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(gt||(gt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(It(this),e),Ct(yt.get(this))}:function(...e){return Ct(t.apply(It(this),e))}:function(e,...n){const s=t.call(It(this),e,...n);return wt.set(s,e.sort?e.sort():[e]),Ct(s)}}function St(t){return"function"==typeof t?Tt(t):(t instanceof IDBTransaction&&function(t){if(vt.has(t))return;const e=new Promise((e,n)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",i),t.removeEventListener("abort",i)},r=()=>{e(),s()},i=()=>{n(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",i),t.addEventListener("abort",i)});vt.set(t,e)}(t),e=t,(mt||(mt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(t=>e instanceof t)?new Proxy(t,_t):t);var e}function Ct(t){if(t instanceof IDBRequest)return function(t){const e=new Promise((e,n)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",i)},r=()=>{e(Ct(t.result)),s()},i=()=>{n(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",i)});return e.then(e=>{e instanceof IDBCursor&&yt.set(e,t)}).catch(()=>{}),Et.set(e,t),e}(t);if(bt.has(t))return bt.get(t);const e=St(t);return e!==t&&(bt.set(t,e),Et.set(e,t)),e}const It=t=>Et.get(t);const At=["get","getKey","getAll","getAllKeys","count"],kt=["put","add","delete","clear"],Dt=new Map;function Nt(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(Dt.get(e))return Dt.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=kt.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!r&&!At.includes(n))return;const i=async function(t,...e){const i=this.transaction(t,r?"readwrite":"readonly");let o=i.store;return s&&(o=o.index(e.shift())),(await Promise.all([o[n](...e),r&&i.done]))[0]};return Dt.set(e,i),i}_t=(t=>({...t,get:(e,n,s)=>Nt(e,n)||t.get(e,n,s),has:(e,n)=>!!Nt(e,n)||t.has(e,n)}))(_t);
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
class xt{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null}).filter(t=>t).join(" ")}}const Rt="@firebase/app",Lt="0.11.5",Ot=new pt("@firebase/app"),Pt="@firebase/app-compat",Mt="@firebase/analytics-compat",Vt="@firebase/analytics",Ft="@firebase/app-check-compat",Ut="@firebase/app-check",Bt="@firebase/auth",jt="@firebase/auth-compat",$t="@firebase/database",qt="@firebase/data-connect",zt="@firebase/database-compat",Kt="@firebase/functions",Gt="@firebase/functions-compat",Ht="@firebase/installations",Qt="@firebase/installations-compat",Wt="@firebase/messaging",Yt="@firebase/messaging-compat",Xt="@firebase/performance",Jt="@firebase/performance-compat",Zt="@firebase/remote-config",te="@firebase/remote-config-compat",ee="@firebase/storage",ne="@firebase/storage-compat",se="@firebase/firestore",re="@firebase/vertexai",ie="@firebase/firestore-compat",oe="firebase",ae="[DEFAULT]",ce={[Rt]:"fire-core",[Pt]:"fire-core-compat",[Vt]:"fire-analytics",[Mt]:"fire-analytics-compat",[Ut]:"fire-app-check",[Ft]:"fire-app-check-compat",[Bt]:"fire-auth",[jt]:"fire-auth-compat",[$t]:"fire-rtdb",[qt]:"fire-data-connect",[zt]:"fire-rtdb-compat",[Kt]:"fire-fn",[Gt]:"fire-fn-compat",[Ht]:"fire-iid",[Qt]:"fire-iid-compat",[Wt]:"fire-fcm",[Yt]:"fire-fcm-compat",[Xt]:"fire-perf",[Jt]:"fire-perf-compat",[Zt]:"fire-rc",[te]:"fire-rc-compat",[ee]:"fire-gcs",[ne]:"fire-gcs-compat",[se]:"fire-fst",[ie]:"fire-fst-compat",[re]:"fire-vertex","fire-js":"fire-js",[oe]:"fire-js-all"},le=new Map,ue=new Map,he=new Map;function de(t,e){try{t.container.addComponent(e)}catch(n){Ot.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function fe(t){const e=t.name;if(he.has(e))return Ot.debug(`There were multiple attempts to register component ${e}.`),!1;he.set(e,t);for(const n of le.values())de(n,t);for(const n of ue.values())de(n,t);return!0}
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
const pe=new Z("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
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
class me{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new rt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw pe.create("app-deleted",{appName:this._name})}}
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
 */function ge(t,e={}){let n=t;if("object"!=typeof e){e={name:e}}const s=Object.assign({name:ae,automaticDataCollectionEnabled:!1},e),r=s.name;if("string"!=typeof r||!r)throw pe.create("bad-app-name",{appName:String(r)});if(n||(n=W()),!n)throw pe.create("no-options");const i=le.get(r);if(i){if(et(n,i.options)&&et(s,i.config))return i;throw pe.create("duplicate-app",{appName:r})}const o=new at(r);for(const c of he.values())o.addComponent(c);const a=new me(n,s,o);return le.set(r,a),a}function ye(t,e,n){var s;let r=null!==(s=ce[t])&&void 0!==s?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const t=[`Unable to register library "${r}" with version "${e}":`];return i&&t.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&t.push("and"),o&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void Ot.warn(t.join(" "))}fe(new rt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}
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
 */const ve="firebase-heartbeat-store";let we=null;function be(){return we||(we=function(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=Ct(o);return s&&o.addEventListener("upgradeneeded",t=>{s(Ct(o.result),t.oldVersion,t.newVersion,Ct(o.transaction),t)}),n&&o.addEventListener("blocked",t=>n(t.oldVersion,t.newVersion,t)),a.then(t=>{i&&t.addEventListener("close",()=>i()),r&&t.addEventListener("versionchange",t=>r(t.oldVersion,t.newVersion,t))}).catch(()=>{}),a}("firebase-heartbeat-database",1,{upgrade:(t,e)=>{if(0===e)try{t.createObjectStore(ve)}catch(n){}}}).catch(t=>{throw pe.create("idb-open",{originalErrorMessage:t.message})})),we}async function Ee(t,e){try{const n=(await be()).transaction(ve,"readwrite"),s=n.objectStore(ve);await s.put(e,_e(t)),await n.done}catch(n){if(n instanceof J)Ot.warn(n.message);else{const t=pe.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});Ot.warn(t.message)}}}function _e(t){return`${t.name}!${t.options.appId}`}
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
 */class Te{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Ce(e),this._heartbeatsCachePromise=this._storage.read().then(t=>(this._heartbeatsCache=t,t))}async triggerHeartbeat(){var t,e;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Se();if(null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(t=>t.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>30){const t=function(t){if(0===t.length)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}
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
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(t,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){Ot.warn(n)}}async getHeartbeatsHeader(){var t;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const e=Se(),{heartbeatsToSend:n,unsentEntries:s}=function(t,e=1024){const n=[];let s=t.slice();for(const r of t){const t=n.find(t=>t.agent===r.agent);if(t){if(t.dates.push(r.date),Ie(n)>e){t.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Ie(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}(this._heartbeatsCache.heartbeats),r=z(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return Ot.warn(e),""}}}function Se(){return(new Date).toISOString().substring(0,10)}class Ce{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(t){return!1}}()&&new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var t;e((null===(t=r.error)||void 0===t?void 0:t.message)||"")}}catch(n){e(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const t=await async function(t){try{const e=(await be()).transaction(ve),n=await e.objectStore(ve).get(_e(t));return await e.done,n}catch(e){if(e instanceof J)Ot.warn(e.message);else{const t=pe.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});Ot.warn(t.message)}}}(this.app);return(null==t?void 0:t.heartbeats)?t:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return Ee(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}}async add(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return Ee(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}}}function Ie(t){return z(JSON.stringify({version:2,heartbeats:t})).length}var Ae;Ae="",fe(new rt("platform-logger",t=>new xt(t),"PRIVATE")),fe(new rt("heartbeat",t=>new Te(t),"PRIVATE")),ye(Rt,Lt,Ae),ye(Rt,Lt,"esm2017"),ye("fire-js","");
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
ye("firebase","11.6.1","app");var ke,De,Ne="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function e(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(t,e,n){n||(n=0);var s=Array(16);if("string"==typeof e)for(var r=0;16>r;++r)s[r]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(r=0;16>r;++r)s[r]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],r=t.g[2];var i=t.g[3],o=e+(i^n&(r^i))+s[0]+3614090360&4294967295;o=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=n+(o<<7&4294967295|o>>>25))+((o=i+(r^e&(n^r))+s[1]+3905402710&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(e^n))+s[2]+606105819&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^r&(i^e))+s[3]+3250441966&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(r^i))+s[4]+4118548399&4294967295)<<7&4294967295|o>>>25))+((o=i+(r^e&(n^r))+s[5]+1200080426&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(e^n))+s[6]+2821735955&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^r&(i^e))+s[7]+4249261313&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(r^i))+s[8]+1770035416&4294967295)<<7&4294967295|o>>>25))+((o=i+(r^e&(n^r))+s[9]+2336552879&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(e^n))+s[10]+4294925233&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^r&(i^e))+s[11]+2304563134&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(r^i))+s[12]+1804603682&4294967295)<<7&4294967295|o>>>25))+((o=i+(r^e&(n^r))+s[13]+4254626195&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(e^n))+s[14]+2792965006&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^r&(i^e))+s[15]+1236535329&4294967295)<<22&4294967295|o>>>10))+((o=e+(r^i&(n^r))+s[1]+4129170786&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(e^n))+s[6]+3225465664&4294967295)<<9&4294967295|o>>>23))+((o=r+(e^n&(i^e))+s[11]+643717713&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(r^i))+s[0]+3921069994&4294967295)<<20&4294967295|o>>>12))+((o=e+(r^i&(n^r))+s[5]+3593408605&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(e^n))+s[10]+38016083&4294967295)<<9&4294967295|o>>>23))+((o=r+(e^n&(i^e))+s[15]+3634488961&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(r^i))+s[4]+3889429448&4294967295)<<20&4294967295|o>>>12))+((o=e+(r^i&(n^r))+s[9]+568446438&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(e^n))+s[14]+3275163606&4294967295)<<9&4294967295|o>>>23))+((o=r+(e^n&(i^e))+s[3]+4107603335&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(r^i))+s[8]+1163531501&4294967295)<<20&4294967295|o>>>12))+((o=e+(r^i&(n^r))+s[13]+2850285829&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(e^n))+s[2]+4243563512&4294967295)<<9&4294967295|o>>>23))+((o=r+(e^n&(i^e))+s[7]+1735328473&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(r^i))+s[12]+2368359562&4294967295)<<20&4294967295|o>>>12))+((o=e+(n^r^i)+s[5]+4294588738&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^r)+s[8]+2272392833&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^e^n)+s[11]+1839030562&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^e)+s[14]+4259657740&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^r^i)+s[1]+2763975236&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^r)+s[4]+1272893353&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^e^n)+s[7]+4139469664&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^e)+s[10]+3200236656&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^r^i)+s[13]+681279174&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^r)+s[0]+3936430074&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^e^n)+s[3]+3572445317&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^e)+s[6]+76029189&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^r^i)+s[9]+3654602809&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^r)+s[12]+3873151461&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^e^n)+s[15]+530742520&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^e)+s[2]+3299628645&4294967295)<<23&4294967295|o>>>9))+((o=e+(r^(n|~i))+s[0]+4096336452&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~r))+s[7]+1126891415&4294967295)<<10&4294967295|o>>>22))+((o=r+(e^(i|~n))+s[14]+2878612391&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(r|~e))+s[5]+4237533241&4294967295)<<21&4294967295|o>>>11))+((o=e+(r^(n|~i))+s[12]+1700485571&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~r))+s[3]+2399980690&4294967295)<<10&4294967295|o>>>22))+((o=r+(e^(i|~n))+s[10]+4293915773&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(r|~e))+s[1]+2240044497&4294967295)<<21&4294967295|o>>>11))+((o=e+(r^(n|~i))+s[8]+1873313359&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~r))+s[15]+4264355552&4294967295)<<10&4294967295|o>>>22))+((o=r+(e^(i|~n))+s[6]+2734768916&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(r|~e))+s[13]+1309151649&4294967295)<<21&4294967295|o>>>11))+((i=(e=n+((o=e+(r^(n|~i))+s[4]+4149444226&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~r))+s[11]+3174756917&4294967295)<<10&4294967295|o>>>22))^((r=i+((o=r+(e^(i|~n))+s[2]+718787259&4294967295)<<15&4294967295|o>>>17))|~e))+s[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(r+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+r&4294967295,t.g[3]=t.g[3]+i&4294967295}function s(t,e){this.h=e;for(var n=[],s=!0,r=t.length-1;0<=r;r--){var i=0|t[r];s&&i==e||(n[r]=i,s=!1)}this.g=n}!function(t,e){function n(){}n.prototype=e.prototype,t.D=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.C=function(t,n,s){for(var r=Array(arguments.length-2),i=2;i<arguments.length;i++)r[i-2]=arguments[i];return e.prototype[n].apply(t,r)}}(e,function(){this.blockSize=-1}),e.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.u=function(t,e){void 0===e&&(e=t.length);for(var s=e-this.blockSize,r=this.B,i=this.h,o=0;o<e;){if(0==i)for(;o<=s;)n(this,t,o),o+=this.blockSize;if("string"==typeof t){for(;o<e;)if(r[i++]=t.charCodeAt(o++),i==this.blockSize){n(this,r),i=0;break}}else for(;o<e;)if(r[i++]=t[o++],i==this.blockSize){n(this,r),i=0;break}}this.h=i,this.o+=e},e.prototype.v=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.o;for(e=t.length-8;e<t.length;++e)t[e]=255&n,n/=256;for(this.u(t),t=Array(16),e=n=0;4>e;++e)for(var s=0;32>s;s+=8)t[n++]=this.g[e]>>>s&255;return t};var r={};function i(t){return-128<=t&&128>t?function(t,e){var n=r;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,function(t){return new s([0|t],0>t?-1:0)}):new s([0|t],0>t?-1:0)}function o(t){if(isNaN(t)||!isFinite(t))return a;if(0>t)return d(o(-t));for(var e=[],n=1,r=0;t>=n;r++)e[r]=t/n|0,n*=4294967296;return new s(e,0)}var a=i(0),c=i(1),l=i(16777216);function u(t){if(0!=t.h)return!1;for(var e=0;e<t.g.length;e++)if(0!=t.g[e])return!1;return!0}function h(t){return-1==t.h}function d(t){for(var e=t.g.length,n=[],r=0;r<e;r++)n[r]=~t.g[r];return new s(n,~t.h).add(c)}function f(t,e){return t.add(d(e))}function p(t,e){for(;(65535&t[e])!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function m(t,e){this.g=t,this.h=e}function g(t,e){if(u(e))throw Error("division by zero");if(u(t))return new m(a,a);if(h(t))return e=g(d(t),e),new m(d(e.g),d(e.h));if(h(e))return e=g(t,d(e)),new m(d(e.g),e.h);if(30<t.g.length){if(h(t)||h(e))throw Error("slowDivide_ only works with positive integers.");for(var n=c,s=e;0>=s.l(t);)n=y(n),s=y(s);var r=v(n,1),i=v(s,1);for(s=v(s,2),n=v(n,2);!u(s);){var l=i.add(s);0>=l.l(t)&&(r=r.add(n),i=l),s=v(s,1),n=v(n,1)}return e=f(t,r.j(e)),new m(r,e)}for(r=a;0<=t.l(e);){for(n=Math.max(1,Math.floor(t.m()/e.m())),s=48>=(s=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,s-48),l=(i=o(n)).j(e);h(l)||0<l.l(t);)l=(i=o(n-=s)).j(e);u(i)&&(i=c),r=r.add(i),t=f(t,l)}return new m(r,t)}function y(t){for(var e=t.g.length+1,n=[],r=0;r<e;r++)n[r]=t.i(r)<<1|t.i(r-1)>>>31;return new s(n,t.h)}function v(t,e){var n=e>>5;e%=32;for(var r=t.g.length-n,i=[],o=0;o<r;o++)i[o]=0<e?t.i(o+n)>>>e|t.i(o+n+1)<<32-e:t.i(o+n);return new s(i,t.h)}(t=s.prototype).m=function(){if(h(this))return-d(this).m();for(var t=0,e=1,n=0;n<this.g.length;n++){var s=this.i(n);t+=(0<=s?s:4294967296+s)*e,e*=4294967296}return t},t.toString=function(t){if(2>(t=t||10)||36<t)throw Error("radix out of range: "+t);if(u(this))return"0";if(h(this))return"-"+d(this).toString(t);for(var e=o(Math.pow(t,6)),n=this,s="";;){var r=g(n,e).g,i=((0<(n=f(n,r.j(e))).g.length?n.g[0]:n.h)>>>0).toString(t);if(u(n=r))return i+s;for(;6>i.length;)i="0"+i;s=i+s}},t.i=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h},t.l=function(t){return h(t=f(this,t))?-1:u(t)?0:1},t.abs=function(){return h(this)?d(this):this},t.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0,i=0;i<=e;i++){var o=r+(65535&this.i(i))+(65535&t.i(i)),a=(o>>>16)+(this.i(i)>>>16)+(t.i(i)>>>16);r=a>>>16,o&=65535,a&=65535,n[i]=a<<16|o}return new s(n,-2147483648&n[n.length-1]?-1:0)},t.j=function(t){if(u(this)||u(t))return a;if(h(this))return h(t)?d(this).j(d(t)):d(d(this).j(t));if(h(t))return d(this.j(d(t)));if(0>this.l(l)&&0>t.l(l))return o(this.m()*t.m());for(var e=this.g.length+t.g.length,n=[],r=0;r<2*e;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var i=0;i<t.g.length;i++){var c=this.i(r)>>>16,f=65535&this.i(r),m=t.i(i)>>>16,g=65535&t.i(i);n[2*r+2*i]+=f*g,p(n,2*r+2*i),n[2*r+2*i+1]+=c*g,p(n,2*r+2*i+1),n[2*r+2*i+1]+=f*m,p(n,2*r+2*i+1),n[2*r+2*i+2]+=c*m,p(n,2*r+2*i+2)}for(r=0;r<e;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=e;r<2*e;r++)n[r]=0;return new s(n,0)},t.A=function(t){return g(this,t).h},t.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.i(r)&t.i(r);return new s(n,this.h&t.h)},t.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.i(r)|t.i(r);return new s(n,this.h|t.h)},t.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.i(r)^t.i(r);return new s(n,this.h^t.h)},e.prototype.digest=e.prototype.v,e.prototype.reset=e.prototype.s,e.prototype.update=e.prototype.u,De=e,s.prototype.add=s.prototype.add,s.prototype.multiply=s.prototype.j,s.prototype.modulo=s.prototype.A,s.prototype.compare=s.prototype.l,s.prototype.toNumber=s.prototype.m,s.prototype.toString=s.prototype.toString,s.prototype.getBits=s.prototype.i,s.fromNumber=o,s.fromString=function t(e,n){if(0==e.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==e.charAt(0))return d(t(e.substring(1),n));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var s=o(Math.pow(n,8)),r=a,i=0;i<e.length;i+=8){var c=Math.min(8,e.length-i),l=parseInt(e.substring(i,i+c),n);8>c?(c=o(Math.pow(n,c)),r=r.j(c).add(o(l))):r=(r=r.j(s)).add(o(l))}return r},ke=s}).apply(void 0!==Ne?Ne:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var xe,Re,Le,Oe,Pe,Me,Ve,Fe,Ue="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t,e="function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,n){return t==Array.prototype||t==Object.prototype||(t[e]=n.value),t};var n=function(t){t=["object"==typeof globalThis&&globalThis,t,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof Ue&&Ue];for(var e=0;e<t.length;++e){var n=t[e];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);!function(t,s){if(s)t:{var r=n;t=t.split(".");for(var i=0;i<t.length-1;i++){var o=t[i];if(!(o in r))break t;r=r[o]}(s=s(i=r[t=t[t.length-1]]))!=i&&null!=s&&e(r,t,{configurable:!0,writable:!0,value:s})}}("Array.prototype.values",function(t){return t||function(){return function(t,e){t instanceof String&&(t+="");var n=0,s=!1,r={next:function(){if(!s&&n<t.length){var r=n++;return{value:e(r,t[r]),done:!1}}return s=!0,{done:!0,value:void 0}}};return r[Symbol.iterator]=function(){return r},r}(this,function(t,e){return e})}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var s=s||{},r=this||self;function i(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function o(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}function a(t,e,n){return t.call.apply(t.bind,arguments)}function c(t,e,n){if(!t)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,s),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function l(t,e,n){return(l=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?a:c).apply(null,arguments)}function u(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function h(t,e){function n(){}n.prototype=e.prototype,t.aa=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Qb=function(t,n,s){for(var r=Array(arguments.length-2),i=2;i<arguments.length;i++)r[i-2]=arguments[i];return e.prototype[n].apply(t,r)}}function d(t){const e=t.length;if(0<e){const n=Array(e);for(let s=0;s<e;s++)n[s]=t[s];return n}return[]}function f(t,e){for(let n=1;n<arguments.length;n++){const e=arguments[n];if(i(e)){const n=t.length||0,s=e.length||0;t.length=n+s;for(let r=0;r<s;r++)t[n+r]=e[r]}else t.push(e)}}function p(t){return/^[\s\xa0]*$/.test(t)}function m(){var t=r.navigator;return t&&(t=t.userAgent)?t:""}function g(t){return g[" "](t),t}g[" "]=function(){};var y=!(-1==m().indexOf("Gecko")||-1!=m().toLowerCase().indexOf("webkit")&&-1==m().indexOf("Edge")||-1!=m().indexOf("Trident")||-1!=m().indexOf("MSIE")||-1!=m().indexOf("Edge"));function v(t,e,n){for(const s in t)e.call(n,t[s],s,t)}function w(t){const e={};for(const n in t)e[n]=t[n];return e}const b="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(t,e){let n,s;for(let r=1;r<arguments.length;r++){for(n in s=arguments[r],s)t[n]=s[n];for(let e=0;e<b.length;e++)n=b[e],Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}}function _(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function T(t){r.setTimeout(()=>{throw t},0)}function S(){var t=D;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var C=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new I,t=>t.reset());class I{constructor(){this.next=this.g=this.h=null}set(t,e){this.h=t,this.g=e,this.next=null}reset(){this.next=this.g=this.h=null}}let A,k=!1,D=new class{constructor(){this.h=this.g=null}add(t,e){const n=C.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n}},N=()=>{const t=r.Promise.resolve(void 0);A=()=>{t.then(x)}};var x=()=>{for(var t;t=S();){try{t.h.call(t.g)}catch(n){T(n)}var e=C;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}k=!1};function R(){this.s=this.s,this.C=this.C}function L(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}R.prototype.s=!1,R.prototype.ma=function(){this.s||(this.s=!0,this.N())},R.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},L.prototype.h=function(){this.defaultPrevented=!0};var O=function(){if(!r.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const t=()=>{};r.addEventListener("test",t,e),r.removeEventListener("test",t,e)}catch(n){}return t}();function P(t,e){if(L.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,s=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(y){t:{try{g(e.nodeName);var r=!0;break t}catch(i){}r=!1}r||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,s?(this.clientX=void 0!==s.clientX?s.clientX:s.pageX,this.clientY=void 0!==s.clientY?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:M[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&P.aa.h.call(this)}}h(P,L);var M={2:"touch",3:"pen",4:"mouse"};P.prototype.h=function(){P.aa.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var V="closure_listenable_"+(1e6*Math.random()|0),F=0;function U(t,e,n,s,r){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!s,this.ha=r,this.key=++F,this.da=this.fa=!1}function B(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function j(t){this.src=t,this.g={},this.h=0}function $(t,e){var n=e.type;if(n in t.g){var s,r=t.g[n],i=Array.prototype.indexOf.call(r,e,void 0);(s=0<=i)&&Array.prototype.splice.call(r,i,1),s&&(B(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function q(t,e,n,s){for(var r=0;r<t.length;++r){var i=t[r];if(!i.da&&i.listener==e&&i.capture==!!n&&i.ha==s)return r}return-1}j.prototype.add=function(t,e,n,s,r){var i=t.toString();(t=this.g[i])||(t=this.g[i]=[],this.h++);var o=q(t,e,s,r);return-1<o?(e=t[o],n||(e.fa=!1)):((e=new U(e,this.src,i,!!s,r)).fa=n,t.push(e)),e};var z="closure_lm_"+(1e6*Math.random()|0),K={};function G(t,e,n,s,r){if(Array.isArray(e)){for(var i=0;i<e.length;i++)G(t,e[i],n,s,r);return null}return n=Z(n),t&&t[V]?t.K(e,n,!!o(s)&&!!s.capture,r):function(t,e,n,s,r,i){if(!e)throw Error("Invalid event type");var a=o(r)?!!r.capture:!!r,c=X(t);if(c||(t[z]=c=new j(t)),n=c.add(e,n,s,a,i),n.proxy)return n;if(s=function(){function t(n){return e.call(t.src,t.listener,n)}const e=Y;return t}(),n.proxy=s,s.src=t,s.listener=n,t.addEventListener)O||(r=a),void 0===r&&(r=!1),t.addEventListener(e.toString(),s,r);else if(t.attachEvent)t.attachEvent(W(e.toString()),s);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(s)}return n}(t,e,n,!1,s,r)}function H(t,e,n,s,r){if(Array.isArray(e))for(var i=0;i<e.length;i++)H(t,e[i],n,s,r);else s=o(s)?!!s.capture:!!s,n=Z(n),t&&t[V]?(t=t.i,(e=String(e).toString())in t.g&&(-1<(n=q(i=t.g[e],n,s,r))&&(B(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.g[e],t.h--)))):t&&(t=X(t))&&(e=t.g[e.toString()],t=-1,e&&(t=q(e,n,s,r)),(n=-1<t?e[t]:null)&&Q(n))}function Q(t){if("number"!=typeof t&&t&&!t.da){var e=t.src;if(e&&e[V])$(e.i,t);else{var n=t.type,s=t.proxy;e.removeEventListener?e.removeEventListener(n,s,t.capture):e.detachEvent?e.detachEvent(W(n),s):e.addListener&&e.removeListener&&e.removeListener(s),(n=X(e))?($(n,t),0==n.h&&(n.src=null,e[z]=null)):B(t)}}}function W(t){return t in K?K[t]:K[t]="on"+t}function Y(t,e){if(t.da)t=!0;else{e=new P(e,this);var n=t.listener,s=t.ha||t.src;t.fa&&Q(t),t=n.call(s,e)}return t}function X(t){return(t=t[z])instanceof j?t:null}var J="__closure_events_fn_"+(1e9*Math.random()>>>0);function Z(t){return"function"==typeof t?t:(t[J]||(t[J]=function(e){return t.handleEvent(e)}),t[J])}function tt(){R.call(this),this.i=new j(this),this.M=this,this.F=null}function et(t,e){var n,s=t.F;if(s)for(n=[];s;s=s.F)n.push(s);if(t=t.M,s=e.type||e,"string"==typeof e)e=new L(e,t);else if(e instanceof L)e.target=e.target||t;else{var r=e;E(e=new L(s,t),r)}if(r=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];r=nt(o,s,!0,e)&&r}if(r=nt(o=e.g=t,s,!0,e)&&r,r=nt(o,s,!1,e)&&r,n)for(i=0;i<n.length;i++)r=nt(o=e.g=n[i],s,!1,e)&&r}function nt(t,e,n,s){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();for(var r=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.da&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.fa&&$(t.i,o),r=!1!==a.call(c,s)&&r}}return r&&!s.defaultPrevented}function st(t,e,n){if("function"==typeof t)n&&(t=l(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=l(t.handleEvent,t)}return 2147483647<Number(e)?-1:r.setTimeout(t,e||0)}function rt(t){t.g=st(()=>{t.g=null,t.i&&(t.i=!1,rt(t))},t.l);const e=t.h;t.h=null,t.m.apply(null,e)}h(tt,R),tt.prototype[V]=!0,tt.prototype.removeEventListener=function(t,e,n,s){H(this,t,e,n,s)},tt.prototype.N=function(){if(tt.aa.N.call(this),this.i){var t,e=this.i;for(t in e.g){for(var n=e.g[t],s=0;s<n.length;s++)B(n[s]);delete e.g[t],e.h--}}this.F=null},tt.prototype.K=function(t,e,n,s){return this.i.add(String(t),e,!1,n,s)},tt.prototype.L=function(t,e,n,s){return this.i.add(String(t),e,!0,n,s)};class it extends R{constructor(t,e){super(),this.m=t,this.l=e,this.h=null,this.i=!1,this.g=null}j(t){this.h=arguments,this.g?this.i=!0:rt(this)}N(){super.N(),this.g&&(r.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ot(t){R.call(this),this.h=t,this.g={}}h(ot,R);var at=[];function ct(t){v(t.g,function(t,e){this.g.hasOwnProperty(e)&&Q(t)},t),t.g={}}ot.prototype.N=function(){ot.aa.N.call(this),ct(this)},ot.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var lt=r.JSON.stringify,ut=r.JSON.parse,ht=class{stringify(t){return r.JSON.stringify(t,void 0)}parse(t){return r.JSON.parse(t,void 0)}};function dt(){}function ft(t){return t.h||(t.h=t.i())}function pt(){}dt.prototype.h=null;var mt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function gt(){L.call(this,"d")}function yt(){L.call(this,"c")}h(gt,L),h(yt,L);var vt={},wt=null;function bt(){return wt=wt||new tt}function Et(t){L.call(this,vt.La,t)}function _t(t){const e=bt();et(e,new Et(e))}function Tt(t,e){L.call(this,vt.STAT_EVENT,t),this.stat=e}function St(t){const e=bt();et(e,new Tt(e,t))}function Ct(t,e){L.call(this,vt.Ma,t),this.size=e}function It(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return r.setTimeout(function(){t()},e)}function At(){this.g=!0}function kt(t,e,n,s){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var s=n[t];if(!(2>s.length)){var r=s[1];if(Array.isArray(r)&&!(1>r.length)){var i=r[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<r.length;o++)r[o]=""}}}return lt(n)}catch(a){return e}}(t,n)+(s?" "+s:"")})}vt.La="serverreachability",h(Et,L),vt.STAT_EVENT="statevent",h(Tt,L),vt.Ma="timingevent",h(Ct,L),At.prototype.xa=function(){this.g=!1},At.prototype.info=function(){};var Dt,Nt={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},xt={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function Rt(){}function Lt(t,e,n,s){this.j=t,this.i=e,this.l=n,this.R=s||1,this.U=new ot(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ot}function Ot(){this.i=null,this.g="",this.h=!1}h(Rt,dt),Rt.prototype.g=function(){return new XMLHttpRequest},Rt.prototype.i=function(){return{}},Dt=new Rt;var Pt={},Mt={};function Vt(t,e,n){t.L=1,t.v=le(re(e)),t.m=n,t.P=!0,Ft(t,null)}function Ft(t,e){t.F=Date.now(),jt(t),t.A=re(t.v);var n=t.A,s=t.R;Array.isArray(s)||(s=[String(s)]),_e(n.i,"t",s),t.C=0,n=t.j.J,t.h=new Ot,t.g=wn(t.j,n?e:null,!t.m),0<t.O&&(t.M=new it(l(t.Y,t,t.g),t.O)),e=t.U,n=t.g,s=t.ca;var r="readystatechange";Array.isArray(r)||(r&&(at[0]=r.toString()),r=at);for(var i=0;i<r.length;i++){var o=G(n,r[i],s||e.handleEvent,!1,e.h||e);if(!o)break;e.g[o.key]=o}e=t.H?w(t.H):{},t.m?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.m,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),_t(),function(t,e,n,s,r,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var l=a[c].split("=");if(1<l.length){var u=l[0];l=l[1];var h=u.split("_");o=2<=h.length&&"type"==h[1]?o+(u+"=")+l+"&":o+(u+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+s+") [attempt "+r+"]: "+e+"\n"+n+"\n"+o})}(t.i,t.u,t.A,t.l,t.R,t.m)}function Ut(t){return!!t.g&&("GET"==t.u&&2!=t.L&&t.j.Ca)}function Bt(t,e){var n=t.C,s=e.indexOf("\n",n);return-1==s?Mt:(n=Number(e.substring(n,s)),isNaN(n)?Pt:(s+=1)+n>e.length?Mt:(e=e.slice(s,s+n),t.C=s+n,e))}function jt(t){t.S=Date.now()+t.I,$t(t,t.I)}function $t(t,e){if(null!=t.B)throw Error("WatchDog timer not null");t.B=It(l(t.ba,t),e)}function qt(t){t.B&&(r.clearTimeout(t.B),t.B=null)}function zt(t){0==t.j.G||t.J||pn(t.j,t)}function Kt(t){qt(t);var e=t.M;e&&"function"==typeof e.ma&&e.ma(),t.M=null,ct(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.ma())}function Gt(t,e){try{var n=t.j;if(0!=n.G&&(n.g==t||Xt(n.h,t)))if(!t.K&&Xt(n.h,t)&&3==n.G){try{var s=n.Da.g.parse(e)}catch(u){s=null}if(Array.isArray(s)&&3==s.length){var r=s;if(0==r[0]){t:if(!n.u){if(n.g){if(!(n.g.F+3e3<t.F))break t;fn(n),nn(n)}un(n),St(18)}}else n.za=r[1],0<n.za-n.T&&37500>r[2]&&n.F&&0==n.v&&!n.C&&(n.C=It(l(n.Za,n),6e3));if(1>=Yt(n.h)&&n.ca){try{n.ca()}catch(u){}n.ca=void 0}}else gn(n,11)}else if((t.K||n.g==t)&&fn(n),!p(e))for(r=n.Da.g.parse(e),e=0;e<r.length;e++){let l=r[e];if(n.T=l[0],l=l[1],2==n.G)if("c"==l[0]){n.K=l[1],n.ia=l[2];const e=l[3];null!=e&&(n.la=e,n.j.info("VER="+n.la));const r=l[4];null!=r&&(n.Aa=r,n.j.info("SVER="+n.Aa));const u=l[5];null!=u&&"number"==typeof u&&0<u&&(s=1.5*u,n.L=s,n.j.info("backChannelRequestTimeoutMs_="+s)),s=n;const h=t.g;if(h){const t=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(t){var i=s.h;i.g||-1==t.indexOf("spdy")&&-1==t.indexOf("quic")&&-1==t.indexOf("h2")||(i.j=i.l,i.g=new Set,i.h&&(Jt(i,i.h),i.h=null))}if(s.D){const t=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;t&&(s.ya=t,ce(s.I,s.D,t))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-t.F,n.j.info("Handshake RTT: "+n.R+"ms"));var o=t;if((s=n).qa=vn(s,s.J?s.ia:null,s.W),o.K){Zt(s.h,o);var a=o,c=s.L;c&&(a.I=c),a.B&&(qt(a),jt(a)),s.g=o}else ln(s);0<n.i.length&&rn(n)}else"stop"!=l[0]&&"close"!=l[0]||gn(n,7);else 3==n.G&&("stop"==l[0]||"close"==l[0]?"stop"==l[0]?gn(n,7):en(n):"noop"!=l[0]&&n.l&&n.l.ta(l),n.v=0)}_t()}catch(u){}}Lt.prototype.ca=function(t){t=t.target;const e=this.M;e&&3==Xe(t)?e.j():this.Y(t)},Lt.prototype.Y=function(t){try{if(t==this.g)t:{const d=Xe(this.g);var e=this.g.Ba();this.g.Z();if(!(3>d)&&(3!=d||this.g&&(this.h.h||this.g.oa()||Je(this.g)))){this.J||4!=d||7==e||_t(),qt(this);var n=this.g.Z();this.X=n;e:if(Ut(this)){var s=Je(this.g);t="";var i=s.length,o=4==Xe(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){Kt(this),zt(this);var a="";break e}this.h.i=new r.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,t+=this.h.i.decode(s[e],{stream:!(o&&e==i-1)});s.length=0,this.h.g+=t,this.C=0,a=this.h.g}else a=this.g.oa();if(this.o=200==n,function(t,e,n,s,r,i,o){t.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+r+"]: "+e+"\n"+n+"\n"+i+" "+o})}(this.i,this.u,this.A,this.l,this.R,d,n),this.o){if(this.T&&!this.K){e:{if(this.g){var c,l=this.g;if((c=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(c)){var u=c;break e}}u=null}if(!(n=u)){this.o=!1,this.s=3,St(12),Kt(this),zt(this);break t}kt(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Gt(this,n)}if(this.P){let t;for(n=!0;!this.J&&this.C<a.length;){if(t=Bt(this,a),t==Mt){4==d&&(this.s=4,St(14),n=!1),kt(this.i,this.l,null,"[Incomplete Response]");break}if(t==Pt){this.s=4,St(15),kt(this.i,this.l,a,"[Invalid Chunk]"),n=!1;break}kt(this.i,this.l,t,null),Gt(this,t)}if(Ut(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=d||0!=a.length||this.h.h||(this.s=1,St(16),n=!1),this.o=this.o&&n,n){if(0<a.length&&!this.W){this.W=!0;var h=this.j;h.g==this&&h.ba&&!h.M&&(h.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),hn(h),h.M=!0,St(11))}}else kt(this.i,this.l,a,"[Invalid Chunked Response]"),Kt(this),zt(this)}else kt(this.i,this.l,a,null),Gt(this,a);4==d&&Kt(this),this.o&&!this.J&&(4==d?pn(this.j,this):(this.o=!1,jt(this)))}else(function(t){const e={};t=(t.g&&2<=Xe(t)&&t.g.getAllResponseHeaders()||"").split("\r\n");for(let s=0;s<t.length;s++){if(p(t[s]))continue;var n=_(t[s]);const r=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const i=e[r]||[];e[r]=i,i.push(n)}!function(t,e){for(const n in t)e.call(void 0,t[n],n,t)}(e,function(t){return t.join(", ")})})(this.g),400==n&&0<a.indexOf("Unknown SID")?(this.s=3,St(12)):(this.s=0,St(13)),Kt(this),zt(this)}}}catch(d){}},Lt.prototype.cancel=function(){this.J=!0,Kt(this)},Lt.prototype.ba=function(){this.B=null;const t=Date.now();0<=t-this.S?(function(t,e){t.info(function(){return"TIMEOUT: "+e})}(this.i,this.A),2!=this.L&&(_t(),St(17)),Kt(this),this.s=2,zt(this)):$t(this,this.S-t)};var Ht=class{constructor(t,e){this.g=t,this.map=e}};function Qt(t){this.l=t||10,r.PerformanceNavigationTiming?t=0<(t=r.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(r.chrome&&r.chrome.loadTimes&&r.chrome.loadTimes()&&r.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Wt(t){return!!t.h||!!t.g&&t.g.size>=t.j}function Yt(t){return t.h?1:t.g?t.g.size:0}function Xt(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function Jt(t,e){t.g?t.g.add(e):t.h=e}function Zt(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function te(t){if(null!=t.h)return t.i.concat(t.h.D);if(null!=t.g&&0!==t.g.size){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return d(t.i)}function ee(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(i(t)||"string"==typeof t)Array.prototype.forEach.call(t,e,void 0);else for(var n=function(t){if(t.na&&"function"==typeof t.na)return t.na();if(!t.V||"function"!=typeof t.V){if("undefined"!=typeof Map&&t instanceof Map)return Array.from(t.keys());if(!("undefined"!=typeof Set&&t instanceof Set)){if(i(t)||"string"==typeof t){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const s in t)e[n++]=s;return e}}}(t),s=function(t){if(t.V&&"function"==typeof t.V)return t.V();if("undefined"!=typeof Map&&t instanceof Map||"undefined"!=typeof Set&&t instanceof Set)return Array.from(t.values());if("string"==typeof t)return t.split("");if(i(t)){for(var e=[],n=t.length,s=0;s<n;s++)e.push(t[s]);return e}for(s in e=[],n=0,t)e[n++]=t[s];return e}(t),r=s.length,o=0;o<r;o++)e.call(void 0,s[o],n&&n[o],t)}Qt.prototype.cancel=function(){if(this.i=te(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const t of this.g.values())t.cancel();this.g.clear()}};var ne=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function se(t){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,t instanceof se){this.h=t.h,ie(this,t.j),this.o=t.o,this.g=t.g,oe(this,t.s),this.l=t.l;var e=t.i,n=new ve;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),ae(this,n),this.m=t.m}else t&&(e=String(t).match(ne))?(this.h=!1,ie(this,e[1]||"",!0),this.o=ue(e[2]||""),this.g=ue(e[3]||"",!0),oe(this,e[4]),this.l=ue(e[5]||"",!0),ae(this,e[6]||"",!0),this.m=ue(e[7]||"")):(this.h=!1,this.i=new ve(null,this.h))}function re(t){return new se(t)}function ie(t,e,n){t.j=n?ue(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function oe(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.s=e}else t.s=null}function ae(t,e,n){e instanceof ve?(t.i=e,function(t,e){e&&!t.j&&(we(t),t.i=null,t.g.forEach(function(t,e){var n=e.toLowerCase();e!=n&&(be(this,e),_e(this,n,t))},t)),t.j=e}(t.i,t.h)):(n||(e=he(e,ge)),t.i=new ve(e,t.h))}function ce(t,e,n){t.i.set(e,n)}function le(t){return ce(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function ue(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function he(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,de),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function de(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}se.prototype.toString=function(){var t=[],e=this.j;e&&t.push(he(e,fe,!0),":");var n=this.g;return(n||"file"==e)&&(t.push("//"),(e=this.o)&&t.push(he(e,fe,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.s)&&t.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&t.push("/"),t.push(he(n,"/"==n.charAt(0)?me:pe,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.m)&&t.push("#",he(n,ye)),t.join("")};var fe=/[#\/\?@]/g,pe=/[#\?:]/g,me=/[#\?]/g,ge=/[#\?@]/g,ye=/#/g;function ve(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function we(t){t.g||(t.g=new Map,t.h=0,t.i&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var s=t[n].indexOf("="),r=null;if(0<=s){var i=t[n].substring(0,s);r=t[n].substring(s+1)}else i=t[n];e(i,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}function be(t,e){we(t),e=Te(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function Ee(t,e){return we(t),e=Te(t,e),t.g.has(e)}function _e(t,e,n){be(t,e),0<n.length&&(t.i=null,t.g.set(Te(t,e),d(n)),t.h+=n.length)}function Te(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Se(t,e,n,s,r){try{r&&(r.onload=null,r.onerror=null,r.onabort=null,r.ontimeout=null),s(n)}catch(i){}}function Ce(){this.g=new ht}function Ie(t,e,n){const s=n||"";try{ee(t,function(t,n){let r=t;o(t)&&(r=lt(t)),e.push(s+n+"="+encodeURIComponent(r))})}catch(r){throw e.push(s+"type="+encodeURIComponent("_badmap")),r}}function Ae(t){this.l=t.Ub||null,this.j=t.eb||!1}function ke(t,e){tt.call(this),this.D=t,this.o=e,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function De(t){t.j.read().then(t.Pa.bind(t)).catch(t.ga.bind(t))}function Ne(t){t.readyState=4,t.l=null,t.j=null,t.v=null,Be(t)}function Be(t){t.onreadystatechange&&t.onreadystatechange.call(t)}function je(t){let e="";return v(t,function(t,n){e+=n,e+=":",e+=t,e+="\r\n"}),e}function $e(t,e,n){t:{for(s in n){var s=!1;break t}s=!0}s||(n=je(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):ce(t,e,n))}function qe(t){tt.call(this),this.headers=new Map,this.o=t||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(t=ve.prototype).add=function(t,e){we(this),this.i=null,t=Te(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},t.forEach=function(t,e){we(this),this.g.forEach(function(n,s){n.forEach(function(n){t.call(e,n,s,this)},this)},this)},t.na=function(){we(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let s=0;s<e.length;s++){const r=t[s];for(let t=0;t<r.length;t++)n.push(e[s])}return n},t.V=function(t){we(this);let e=[];if("string"==typeof t)Ee(this,t)&&(e=e.concat(this.g.get(Te(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e},t.set=function(t,e){return we(this),this.i=null,Ee(this,t=Te(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},t.get=function(t,e){return t&&0<(t=this.V(t)).length?String(t[0]):e},t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var s=e[n];const i=encodeURIComponent(String(s)),o=this.V(s);for(s=0;s<o.length;s++){var r=i;""!==o[s]&&(r+="="+encodeURIComponent(String(o[s]))),t.push(r)}}return this.i=t.join("&")},h(Ae,dt),Ae.prototype.g=function(){return new ke(this.l,this.j)},Ae.prototype.i=function(t){return function(){return t}}({}),h(ke,tt),(t=ke.prototype).open=function(t,e){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=t,this.A=e,this.readyState=1,Be(this)},t.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.u,method:this.B,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||r).fetch(new Request(this.A,e)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Ne(this)),this.readyState=0},t.Sa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Be(this)),this.g&&(this.readyState=3,Be(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==r.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;De(this)}else t.text().then(this.Ra.bind(this),this.ga.bind(this))},t.Pa=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var e=t.value?t.value:new Uint8Array(0);(e=this.v.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Ne(this):Be(this),3==this.readyState&&De(this)}},t.Ra=function(t){this.g&&(this.response=this.responseText=t,Ne(this))},t.Qa=function(t){this.g&&(this.response=t,Ne(this))},t.ga=function(){this.g&&Ne(this)},t.setRequestHeader=function(t,e){this.u.append(t,e)},t.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(ke.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}}),h(qe,tt);var ze=/^https?$/i,Ke=["POST","PUT"];function Ge(t,e){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=e,t.m=5,He(t),We(t)}function He(t){t.A||(t.A=!0,et(t,"complete"),et(t,"error"))}function Qe(t){if(t.h&&void 0!==s&&(!t.v[1]||4!=Xe(t)||2!=t.Z()))if(t.u&&4==Xe(t))st(t.Ea,0,t);else if(et(t,"readystatechange"),4==Xe(t)){t.h=!1;try{const s=t.Z();t:switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var n;if(!(n=e)){var i;if(i=0===s){var o=String(t.D).match(ne)[1]||null;!o&&r.self&&r.self.location&&(o=r.self.location.protocol.slice(0,-1)),i=!ze.test(o?o.toLowerCase():"")}n=i}if(n)et(t,"complete"),et(t,"success");else{t.m=6;try{var a=2<Xe(t)?t.g.statusText:""}catch(c){a=""}t.l=a+" ["+t.Z()+"]",He(t)}}finally{We(t)}}}function We(t,e){if(t.g){Ye(t);const s=t.g,r=t.v[0]?()=>{}:null;t.g=null,t.v=null,e||et(t,"ready");try{s.onreadystatechange=r}catch(n){}}}function Ye(t){t.I&&(r.clearTimeout(t.I),t.I=null)}function Xe(t){return t.g?t.g.readyState:0}function Je(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.H){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(e){return null}}function Ze(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function tn(t){this.Aa=0,this.i=[],this.j=new At,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ze("failFast",!1,t),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ze("baseRetryDelayMs",5e3,t),this.cb=Ze("retryDelaySeedMs",1e4,t),this.Wa=Ze("forwardChannelMaxRetries",2,t),this.wa=Ze("forwardChannelRequestTimeoutMs",2e4,t),this.pa=t&&t.xmlHttpFactory||void 0,this.Xa=t&&t.Tb||void 0,this.Ca=t&&t.useFetchStreams||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.h=new Qt(t&&t.concurrentRequestLimit),this.Da=new Ce,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=t&&t.Rb||!1,t&&t.xa&&this.j.xa(),t&&t.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&t&&t.detectBufferingProxy||!1,this.ja=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.ja=t.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function en(t){if(sn(t),3==t.G){var e=t.U++,n=re(t.I);if(ce(n,"SID",t.K),ce(n,"RID",e),ce(n,"TYPE","terminate"),an(t,n),(e=new Lt(t,t.j,e)).L=2,e.v=le(re(n)),n=!1,r.navigator&&r.navigator.sendBeacon)try{n=r.navigator.sendBeacon(e.v.toString(),"")}catch(s){}!n&&r.Image&&((new Image).src=e.v,n=!0),n||(e.g=wn(e.j,null),e.g.ea(e.v)),e.F=Date.now(),jt(e)}yn(t)}function nn(t){t.g&&(hn(t),t.g.cancel(),t.g=null)}function sn(t){nn(t),t.u&&(r.clearTimeout(t.u),t.u=null),fn(t),t.h.cancel(),t.s&&("number"==typeof t.s&&r.clearTimeout(t.s),t.s=null)}function rn(t){if(!Wt(t.h)&&!t.s){t.s=!0;var e=t.Ga;A||N(),k||(A(),k=!0),D.add(e,t),t.B=0}}function on(t,e){var n;n=e?e.l:t.U++;const s=re(t.I);ce(s,"SID",t.K),ce(s,"RID",n),ce(s,"AID",t.T),an(t,s),t.m&&t.o&&$e(s,t.m,t.o),n=new Lt(t,t.j,n,t.B+1),null===t.m&&(n.H=t.o),e&&(t.i=e.D.concat(t.i)),e=cn(t,n,1e3),n.I=Math.round(.5*t.wa)+Math.round(.5*t.wa*Math.random()),Jt(t.h,n),Vt(n,s,e)}function an(t,e){t.H&&v(t.H,function(t,n){ce(e,n,t)}),t.l&&ee({},function(t,n){ce(e,n,t)})}function cn(t,e,n){n=Math.min(t.i.length,n);var s=t.l?l(t.l.Na,t.l,t):null;t:{var r=t.i;let e=-1;for(;;){const t=["count="+n];-1==e?0<n?(e=r[0].g,t.push("ofs="+e)):e=0:t.push("ofs="+e);let o=!0;for(let a=0;a<n;a++){let n=r[a].g;const c=r[a].map;if(n-=e,0>n)e=Math.max(0,r[a].g-100),o=!1;else try{Ie(c,t,"req"+n+"_")}catch(i){s&&s(c)}}if(o){s=t.join("&");break t}}}return t=t.i.splice(0,n),e.D=t,s}function ln(t){if(!t.g&&!t.u){t.Y=1;var e=t.Fa;A||N(),k||(A(),k=!0),D.add(e,t),t.v=0}}function un(t){return!(t.g||t.u||3<=t.v)&&(t.Y++,t.u=It(l(t.Fa,t),mn(t,t.v)),t.v++,!0)}function hn(t){null!=t.A&&(r.clearTimeout(t.A),t.A=null)}function dn(t){t.g=new Lt(t,t.j,"rpc",t.Y),null===t.m&&(t.g.H=t.o),t.g.O=0;var e=re(t.qa);ce(e,"RID","rpc"),ce(e,"SID",t.K),ce(e,"AID",t.T),ce(e,"CI",t.F?"0":"1"),!t.F&&t.ja&&ce(e,"TO",t.ja),ce(e,"TYPE","xmlhttp"),an(t,e),t.m&&t.o&&$e(e,t.m,t.o),t.L&&(t.g.I=t.L);var n=t.g;t=t.ia,n.L=1,n.v=le(re(e)),n.m=null,n.P=!0,Ft(n,t)}function fn(t){null!=t.C&&(r.clearTimeout(t.C),t.C=null)}function pn(t,e){var n=null;if(t.g==e){fn(t),hn(t),t.g=null;var s=2}else{if(!Xt(t.h,e))return;n=e.D,Zt(t.h,e),s=1}if(0!=t.G)if(e.o)if(1==s){n=e.m?e.m.length:0,e=Date.now()-e.F;var r=t.B;et(s=bt(),new Ct(s,n)),rn(t)}else ln(t);else if(3==(r=e.s)||0==r&&0<e.X||!(1==s&&function(t,e){return!(Yt(t.h)>=t.h.j-(t.s?1:0)||(t.s?(t.i=e.D.concat(t.i),0):1==t.G||2==t.G||t.B>=(t.Va?0:t.Wa)||(t.s=It(l(t.Ga,t,e),mn(t,t.B)),t.B++,0)))}(t,e)||2==s&&un(t)))switch(n&&0<n.length&&(e=t.h,e.i=e.i.concat(n)),r){case 1:gn(t,5);break;case 4:gn(t,10);break;case 3:gn(t,6);break;default:gn(t,2)}}function mn(t,e){let n=t.Ta+Math.floor(Math.random()*t.cb);return t.isActive()||(n*=2),n*e}function gn(t,e){if(t.j.info("Error code "+e),2==e){var n=l(t.fb,t),s=t.Xa;const e=!s;s=new se(s||"//www.google.com/images/cleardot.gif"),r.location&&"http"==r.location.protocol||ie(s,"https"),le(s),e?function(t,e){const n=new At;if(r.Image){const s=new Image;s.onload=u(Se,n,"TestLoadImage: loaded",!0,e,s),s.onerror=u(Se,n,"TestLoadImage: error",!1,e,s),s.onabort=u(Se,n,"TestLoadImage: abort",!1,e,s),s.ontimeout=u(Se,n,"TestLoadImage: timeout",!1,e,s),r.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=t}else e(!1)}(s.toString(),n):function(t,e){new At;const n=new AbortController,s=setTimeout(()=>{n.abort(),Se(0,0,!1,e)},1e4);fetch(t,{signal:n.signal}).then(t=>{clearTimeout(s),t.ok?Se(0,0,!0,e):Se(0,0,!1,e)}).catch(()=>{clearTimeout(s),Se(0,0,!1,e)})}(s.toString(),n)}else St(2);t.G=0,t.l&&t.l.sa(e),yn(t),sn(t)}function yn(t){if(t.G=0,t.ka=[],t.l){const e=te(t.h);0==e.length&&0==t.i.length||(f(t.ka,e),f(t.ka,t.i),t.h.i.length=0,d(t.i),t.i.length=0),t.l.ra()}}function vn(t,e,n){var s=n instanceof se?re(n):new se(n);if(""!=s.g)e&&(s.g=e+"."+s.g),oe(s,s.s);else{var i=r.location;s=i.protocol,e=e?e+"."+i.hostname:i.hostname,i=+i.port;var o=new se(null);s&&ie(o,s),e&&(o.g=e),i&&oe(o,i),n&&(o.l=n),s=o}return n=t.D,e=t.ya,n&&e&&ce(s,n,e),ce(s,"VER",t.la),an(t,s),s}function wn(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return(e=t.Ca&&!t.pa?new qe(new Ae({eb:n})):new qe(t.pa)).Ha(t.J),e}function bn(){}function En(){}function _n(t,e){tt.call(this),this.g=new tn(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.va&&(t?t["X-WebChannel-Client-Profile"]=e.va:t={"X-WebChannel-Client-Profile":e.va}),this.g.S=t,(t=e&&e.Sb)&&!p(t)&&(this.g.m=t),this.v=e&&e.supportsCrossDomainXhr||!1,this.u=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!p(e)&&(this.g.D=e,null!==(t=this.h)&&e in t&&(e in(t=this.h)&&delete t[e])),this.j=new Cn(this)}function Tn(t){gt.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){t:{for(const n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function Sn(){yt.call(this),this.status=1}function Cn(t){this.g=t}(t=qe.prototype).Ha=function(t){this.J=t},t.ea=function(t,e,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);e=e?e.toUpperCase():"GET",this.D=t,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Dt.g(),this.v=this.o?ft(this.o):ft(Dt),this.g.onreadystatechange=l(this.Ea,this);try{this.B=!0,this.g.open(e,String(t),!0),this.B=!1}catch(o){return void Ge(this,o)}if(t=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var i in s)n.set(i,s[i]);else{if("function"!=typeof s.keys||"function"!=typeof s.get)throw Error("Unknown input type for opt_headers: "+String(s));for(const t of s.keys())n.set(t,s.get(t))}s=Array.from(n.keys()).find(t=>"content-type"==t.toLowerCase()),i=r.FormData&&t instanceof r.FormData,!(0<=Array.prototype.indexOf.call(Ke,e,void 0))||s||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[r,a]of n)this.g.setRequestHeader(r,a);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ye(this),this.u=!0,this.g.send(t),this.u=!1}catch(o){Ge(this,o)}},t.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=t||7,et(this,"complete"),et(this,"abort"),We(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),We(this,!0)),qe.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Qe(this):this.bb())},t.bb=function(){Qe(this)},t.isActive=function(){return!!this.g},t.Z=function(){try{return 2<Xe(this)?this.g.status:-1}catch(t){return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch(t){return""}},t.Oa=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),ut(e)}},t.Ba=function(){return this.m},t.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(t=tn.prototype).la=8,t.G=1,t.connect=function(t,e,n,s){St(0),this.W=t,this.H=e||{},n&&void 0!==s&&(this.H.OSID=n,this.H.OAID=s),this.F=this.X,this.I=vn(this,null,this.W),rn(this)},t.Ga=function(t){if(this.s)if(this.s=null,1==this.G){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const r=new Lt(this,this.j,t);let i=this.o;if(this.S&&(i?(i=w(i),E(i,this.S)):i=this.S),null!==this.m||this.O||(r.H=i,i=null),this.P)t:{for(var e=0,n=0;n<this.i.length;n++){var s=this.i[n];if(void 0===(s="__data__"in s.map&&"string"==typeof(s=s.map.__data__)?s.length:void 0))break;if(4096<(e+=s)){e=n;break t}if(4096===e||n===this.i.length-1){e=n+1;break t}}e=1e3}else e=1e3;e=cn(this,r,e),ce(n=re(this.I),"RID",t),ce(n,"CVER",22),this.D&&ce(n,"X-HTTP-Session-Id",this.D),an(this,n),i&&(this.O?e="headers="+encodeURIComponent(String(je(i)))+"&"+e:this.m&&$e(n,this.m,i)),Jt(this.h,r),this.Ua&&ce(n,"TYPE","init"),this.P?(ce(n,"$req",e),ce(n,"SID","null"),r.T=!0,Vt(r,n,null)):Vt(r,n,e),this.G=2}}else 3==this.G&&(t?on(this,t):0==this.i.length||Wt(this.h)||on(this))},t.Fa=function(){if(this.u=null,dn(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var t=2*this.R;this.j.info("BP detection timer enabled: "+t),this.A=It(l(this.ab,this),t)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,St(10),nn(this),dn(this))},t.Za=function(){null!=this.C&&(this.C=null,nn(this),un(this),St(19))},t.fb=function(t){t?(this.j.info("Successfully pinged google.com"),St(2)):(this.j.info("Failed to ping google.com"),St(1))},t.isActive=function(){return!!this.l&&this.l.isActive(this)},(t=bn.prototype).ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){},En.prototype.g=function(t,e){return new _n(t,e)},h(_n,tt),_n.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},_n.prototype.close=function(){en(this.g)},_n.prototype.o=function(t){var e=this.g;if("string"==typeof t){var n={};n.__data__=t,t=n}else this.u&&((n={}).__data__=lt(t),t=n);e.i.push(new Ht(e.Ya++,t)),3==e.G&&rn(e)},_n.prototype.N=function(){this.g.l=null,delete this.j,en(this.g),delete this.g,_n.aa.N.call(this)},h(Tn,gt),h(Sn,yt),h(Cn,bn),Cn.prototype.ua=function(){et(this.g,"a")},Cn.prototype.ta=function(t){et(this.g,new Tn(t))},Cn.prototype.sa=function(t){et(this.g,new Sn)},Cn.prototype.ra=function(){et(this.g,"b")},En.prototype.createWebChannel=En.prototype.g,_n.prototype.send=_n.prototype.o,_n.prototype.open=_n.prototype.m,_n.prototype.close=_n.prototype.close,Fe=function(){return new En},Ve=function(){return bt()},Me=vt,Pe={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Nt.NO_ERROR=0,Nt.TIMEOUT=8,Nt.HTTP_ERROR=6,Oe=Nt,xt.COMPLETE="complete",Le=xt,pt.EventType=mt,mt.OPEN="a",mt.CLOSE="b",mt.ERROR="c",mt.MESSAGE="d",tt.prototype.listen=tt.prototype.K,Re=pt,qe.prototype.listenOnce=qe.prototype.L,qe.prototype.getLastError=qe.prototype.Ka,qe.prototype.getLastErrorCode=qe.prototype.Ba,qe.prototype.getStatus=qe.prototype.Z,qe.prototype.getResponseJson=qe.prototype.Oa,qe.prototype.getResponseText=qe.prototype.oa,qe.prototype.send=qe.prototype.ea,qe.prototype.setWithCredentials=qe.prototype.Ha,xe=qe}).apply(void 0!==Ue?Ue:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const Be="@firebase/firestore",je="4.7.11";
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
 */class $e{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}$e.UNAUTHENTICATED=new $e(null),$e.GOOGLE_CREDENTIALS=new $e("google-credentials-uid"),$e.FIRST_PARTY=new $e("first-party-uid"),$e.MOCK_USER=new $e("mock-user");
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
let qe="11.6.1";
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
 */const ze=new pt("@firebase/firestore");function Ke(){return ze.logLevel}function Ge(t,...e){if(ze.logLevel<=ct.DEBUG){const n=e.map(We);ze.debug(`Firestore (${qe}): ${t}`,...n)}}function He(t,...e){if(ze.logLevel<=ct.ERROR){const n=e.map(We);ze.error(`Firestore (${qe}): ${t}`,...n)}}function Qe(t,...e){if(ze.logLevel<=ct.WARN){const n=e.map(We);ze.warn(`Firestore (${qe}): ${t}`,...n)}}function We(t){if("string"==typeof t)return t;try{
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
 */function Ye(t,e,n){let s="Unexpected state";"string"==typeof e?s=e:n=e,Xe(t,s,n)}function Xe(t,e,n){let s=`FIRESTORE (${qe}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(void 0!==n)try{s+=" CONTEXT: "+JSON.stringify(n)}catch(r){s+=" CONTEXT: "+n}throw He(s),new Error(s)}function Je(t,e,n,s){let r="Unexpected state";"string"==typeof n?r=n:s=n,t||Xe(e,r,s)}function Ze(t,e){return t}
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
 */const tn={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class en extends J{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
 */class nn{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}
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
 */class sn{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class rn{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e($e.UNAUTHENTICATED))}shutdown(){}}class on{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class an{constructor(t){this.t=t,this.currentUser=$e.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Je(void 0===this.o,42304);let n=this.i;const s=t=>this.i!==n?(n=this.i,e(t)):Promise.resolve();let r=new nn;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new nn,t.enqueueRetryable(()=>s(this.currentUser))};const i=()=>{const e=r;t.enqueueRetryable(async()=>{await e.promise,await s(this.currentUser)})},o=t=>{Ge("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=t,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(t=>o(t)),setTimeout(()=>{if(!this.auth){const t=this.t.getImmediate({optional:!0});t?o(t):(Ge("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new nn)}},0),i()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(e=>this.i!==t?(Ge("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(Je("string"==typeof e.accessToken,31837,{l:e}),new sn(e.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Je(null===t||"string"==typeof t,2055,{h:t}),new $e(t)}}class cn{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=$e.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class ln{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new cn(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e($e.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class un{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class hn{constructor(t,e){var n;this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,null!=(n=t)&&void 0!==n.settings&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Je(void 0===this.o,3512);const n=t=>{null!=t.error&&Ge("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`);const n=t.token!==this.m;return this.m=t.token,Ge("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?e(t.token):Promise.resolve()};this.o=e=>{t.enqueueRetryable(()=>n(e))};const s=t=>{Ge("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=t,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(t=>s(t)),setTimeout(()=>{if(!this.appCheck){const t=this.V.getImmediate({optional:!0});t?s(t):Ge("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new un(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(t=>t?(Je("string"==typeof t.token,44558,{tokenResult:t}),this.m=t.token,new un(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
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
 */function dn(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}
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
 */function fn(){return new TextEncoder}
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
 */class pn{static newId(){const t=62*Math.floor(256/62);let e="";for(;e.length<20;){const n=dn(40);for(let s=0;s<n.length;++s)e.length<20&&n[s]<t&&(e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[s]%62))}return e}}function mn(t,e){return t<e?-1:t>e?1:0}function gn(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=t.codePointAt(n),r=e.codePointAt(n);if(s!==r){if(s<128&&r<128)return mn(s,r);{const i=fn(),o=vn(i.encode(yn(t,n)),i.encode(yn(e,n)));return 0!==o?o:mn(s,r)}}n+=s>65535?2:1}return mn(t.length,e.length)}function yn(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function vn(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return mn(t[n],e[n]);return mn(t.length,e.length)}function wn(t,e,n){return t.length===e.length&&t.every((t,s)=>n(t,e[s]))}
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
 */const bn=-62135596800,En=1e6;class _n{static now(){return _n.fromMillis(Date.now())}static fromDate(t){return _n.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*En);return new _n(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new en(tn.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new en(tn.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<bn)throw new en(tn.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new en(tn.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/En}_compareTo(t){return this.seconds===t.seconds?mn(this.nanoseconds,t.nanoseconds):mn(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-bn;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
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
 */class Tn{static fromTimestamp(t){return new Tn(t)}static min(){return new Tn(new _n(0,0))}static max(){return new Tn(new _n(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */const Sn="__name__";class Cn{constructor(t,e,n){void 0===e?e=0:e>t.length&&Ye(637,{offset:e,range:t.length}),void 0===n?n=t.length-e:n>t.length-e&&Ye(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===Cn.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Cn?t.forEach(t=>{e.push(t)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const n=Cn.compareSegments(t.get(s),e.get(s));if(0!==n)return n}return mn(t.length,e.length)}static compareSegments(t,e){const n=Cn.isNumericId(t),s=Cn.isNumericId(e);return n&&!s?-1:!n&&s?1:n&&s?Cn.extractNumericId(t).compare(Cn.extractNumericId(e)):gn(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return ke.fromString(t.substring(4,t.length-2))}}class In extends Cn{construct(t,e,n){return new In(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new en(tn.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(t=>t.length>0))}return new In(e)}static emptyPath(){return new In([])}}const An=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class kn extends Cn{construct(t,e,n){return new kn(t,e,n)}static isValidIdentifier(t){return An.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),kn.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Sn}static keyField(){return new kn([Sn])}static fromServerFormat(t){const e=[];let n="",s=0;const r=()=>{if(0===n.length)throw new en(tn.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;s<t.length;){const e=t[s];if("\\"===e){if(s+1===t.length)throw new en(tn.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[s+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new en(tn.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,s+=2}else"`"===e?(i=!i,s++):"."!==e||i?(n+=e,s++):(r(),s++)}if(r(),i)throw new en(tn.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new kn(e)}static emptyPath(){return new kn([])}}
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
 */class Dn{constructor(t){this.path=t}static fromPath(t){return new Dn(In.fromString(t))}static fromName(t){return new Dn(In.fromString(t).popFirst(5))}static empty(){return new Dn(In.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return null!==t&&0===In.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return In.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new Dn(new In(t.slice()))}}
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
 */function Nn(t){return new xn(t.readTime,t.key,-1)}class xn{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new xn(Tn.min(),Dn.empty(),-1)}static max(){return new xn(Tn.max(),Dn.empty(),-1)}}function Rn(t,e){let n=t.readTime.compareTo(e.readTime);return 0!==n?n:(n=Dn.comparator(t.documentKey,e.documentKey),0!==n?n:mn(t.largestBatchId,e.largestBatchId)
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
 */)}class Ln{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}
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
 */async function On(t){if(t.code!==tn.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==t.message)throw t;Ge("LocalStore","Unexpectedly lost primary lease")}
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
 */class Pn{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&Ye(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new Pn((n,s)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,s)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof Pn?e:Pn.resolve(e)}catch(e){return Pn.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):Pn.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):Pn.reject(e)}static resolve(t){return new Pn((e,n)=>{e(t)})}static reject(t){return new Pn((e,n)=>{n(t)})}static waitFor(t){return new Pn((e,n)=>{let s=0,r=0,i=!1;t.forEach(t=>{++s,t.next(()=>{++r,i&&r===s&&e()},t=>n(t))}),i=!0,r===s&&e()})}static or(t){let e=Pn.resolve(!1);for(const n of t)e=e.next(t=>t?Pn.resolve(t):n());return e}static forEach(t,e){const n=[];return t.forEach((t,s)=>{n.push(e.call(this,t,s))}),this.waitFor(n)}static mapArray(t,e){return new Pn((n,s)=>{const r=t.length,i=new Array(r);let o=0;for(let a=0;a<r;a++){const c=a;e(t[c]).next(t=>{i[c]=t,++o,o===r&&n(i)},t=>s(t))}})}static doWhile(t,e){return new Pn((n,s)=>{const r=()=>{!0===t()?e().next(()=>{r()},s):n()};r()})}}function Mn(t){return"IndexedDbTransactionError"===t.name}
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
 */class Vn{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.ue(t),this.ce=t=>e.writeSequenceNumber(t))}ue(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ce&&this.ce(t),t}}Vn.le=-1;function Fn(t){return null==t}function Un(t){return 0===t&&1/t==-1/0}function Bn(t,e){let n=e;const s=t.length;for(let r=0;r<s;r++){const e=t.charAt(r);switch(e){case"\0":n+="";break;case"":n+="";break;default:n+=e}}return n}function jn(t){return t+""}
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
 */function $n(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function qn(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function zn(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
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
 */class Kn{constructor(t,e){this.comparator=t,this.root=e||Hn.EMPTY}insert(t,e){return new Kn(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Hn.BLACK,null,null))}remove(t){return new Kn(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Hn.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(0===s)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Gn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Gn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Gn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Gn(this.root,t,this.comparator,!0)}}class Gn{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!t.isEmpty();)if(r=e?n(t.key,e):1,e&&s&&(r*=-1),r<0)t=this.isReverse?t.left:t.right;else{if(0===r){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Hn{constructor(t,e,n,s,r){this.key=t,this.value=e,this.color=null!=n?n:Hn.RED,this.left=null!=s?s:Hn.EMPTY,this.right=null!=r?r:Hn.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,r){return new Hn(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=s?s:this.left,null!=r?r:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const r=n(t,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(t,e,n),null):0===r?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Hn.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),0===e(t,s.key)){if(s.right.isEmpty())return Hn.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Hn.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Hn.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Ye(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Ye(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw Ye(27949);return t+(this.isRed()?0:1)}}Hn.EMPTY=null,Hn.RED=!0,Hn.BLACK=!1,Hn.EMPTY=new class{constructor(){this.size=0}get key(){throw Ye(57766)}get value(){throw Ye(16141)}get color(){throw Ye(16727)}get left(){throw Ye(29726)}get right(){throw Ye(36894)}copy(t,e,n,s,r){return this}insert(t,e,n){return new Hn(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class Qn{constructor(t){this.comparator=t,this.data=new Kn(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Wn(this.data.getIterator())}getIteratorFrom(t){return new Wn(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(t=>{e=e.add(t)}),e}isEqual(t){if(!(t instanceof Qn))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,s=n.getNext().key;if(0!==this.comparator(t,s))return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new Qn(this.comparator);return e.data=t,e}}class Wn{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
 */class Yn{constructor(t){this.fields=t,t.sort(kn.comparator)}static empty(){return new Yn([])}unionWith(t){let e=new Qn(kn.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Yn(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return wn(this.fields,t.fields,(t,e)=>t.isEqual(e))}}
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
 */class Xn extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
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
 */class Jn{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(t){try{return atob(t)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new Xn("Invalid base64 string: "+e):e}}(t);return new Jn(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new Jn(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return mn(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Jn.EMPTY_BYTE_STRING=new Jn("");const Zn=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ts(t){if(Je(!!t,39018),"string"==typeof t){let e=0;const n=Zn.exec(t);if(Je(!!n,46558,{timestamp:t}),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:es(t.seconds),nanos:es(t.nanos)}}function es(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function ns(t){return"string"==typeof t?Jn.fromBase64String(t):Jn.fromUint8Array(t)}
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
 */const ss="server_timestamp",rs="__type__",is="__previous_value__",os="__local_write_time__";function as(t){var e,n;return(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{})[rs])||void 0===n?void 0:n.stringValue)===ss}function cs(t){const e=t.mapValue.fields[is];return as(e)?cs(e):e}function ls(t){const e=ts(t.mapValue.fields[os].timestampValue);return new _n(e.seconds,e.nanos)}
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
 */class us{constructor(t,e,n,s,r,i,o,a,c){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=r,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c}}const hs="(default)";class ds{constructor(t,e){this.projectId=t,this.database=e||hs}static empty(){return new ds("","")}get isDefaultDatabase(){return this.database===hs}isEqual(t){return t instanceof ds&&t.projectId===this.projectId&&t.database===this.database}}
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
 */const fs="__type__",ps="__max__",ms={},gs="__vector__",ys="value";function vs(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?as(t)?4:function(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===ps}
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
 */(t)?9007199254740991:function(t){var e,n;return(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{})[fs])||void 0===n?void 0:n.stringValue)===gs}(t)?10:11:Ye(28295,{value:t})}function ws(t,e){if(t===e)return!0;const n=vs(t);if(n!==vs(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return ls(t).isEqual(ls(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=ts(t.timestampValue),s=ts(e.timestampValue);return n.seconds===s.seconds&&n.nanos===s.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return s=e,ns(t.bytesValue).isEqual(ns(s.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return es(t.geoPointValue.latitude)===es(e.geoPointValue.latitude)&&es(t.geoPointValue.longitude)===es(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return es(t.integerValue)===es(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=es(t.doubleValue),s=es(e.doubleValue);return n===s?Un(n)===Un(s):isNaN(n)&&isNaN(s)}return!1}(t,e);case 9:return wn(t.arrayValue.values||[],e.arrayValue.values||[],ws);case 10:case 11:return function(t,e){const n=t.mapValue.fields||{},s=e.mapValue.fields||{};if($n(n)!==$n(s))return!1;for(const r in n)if(n.hasOwnProperty(r)&&(void 0===s[r]||!ws(n[r],s[r])))return!1;return!0}(t,e);default:return Ye(52216,{left:t})}var s}function bs(t,e){return void 0!==(t.values||[]).find(t=>ws(t,e))}function Es(t,e){if(t===e)return 0;const n=vs(t),s=vs(e);if(n!==s)return mn(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return mn(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=es(t.integerValue||t.doubleValue),s=es(e.integerValue||e.doubleValue);return n<s?-1:n>s?1:n===s?0:isNaN(n)?isNaN(s)?0:-1:1}(t,e);case 3:return _s(t.timestampValue,e.timestampValue);case 4:return _s(ls(t),ls(e));case 5:return gn(t.stringValue,e.stringValue);case 6:return function(t,e){const n=ns(t),s=ns(e);return n.compareTo(s)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),s=e.split("/");for(let r=0;r<n.length&&r<s.length;r++){const t=mn(n[r],s[r]);if(0!==t)return t}return mn(n.length,s.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=mn(es(t.latitude),es(e.latitude));return 0!==n?n:mn(es(t.longitude),es(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Ts(t.arrayValue,e.arrayValue);case 10:return function(t,e){var n,s,r,i;const o=t.fields||{},a=e.fields||{},c=null===(n=o[ys])||void 0===n?void 0:n.arrayValue,l=null===(s=a[ys])||void 0===s?void 0:s.arrayValue,u=mn((null===(r=null==c?void 0:c.values)||void 0===r?void 0:r.length)||0,(null===(i=null==l?void 0:l.values)||void 0===i?void 0:i.length)||0);return 0!==u?u:Ts(c,l)}(t.mapValue,e.mapValue);case 11:return function(t,e){if(t===ms&&e===ms)return 0;if(t===ms)return 1;if(e===ms)return-1;const n=t.fields||{},s=Object.keys(n),r=e.fields||{},i=Object.keys(r);s.sort(),i.sort();for(let o=0;o<s.length&&o<i.length;++o){const t=gn(s[o],i[o]);if(0!==t)return t;const e=Es(n[s[o]],r[i[o]]);if(0!==e)return e}return mn(s.length,i.length)}(t.mapValue,e.mapValue);default:throw Ye(23264,{Pe:n})}}function _s(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return mn(t,e);const n=ts(t),s=ts(e),r=mn(n.seconds,s.seconds);return 0!==r?r:mn(n.nanos,s.nanos)}function Ts(t,e){const n=t.values||[],s=e.values||[];for(let r=0;r<n.length&&r<s.length;++r){const t=Es(n[r],s[r]);if(t)return t}return mn(n.length,s.length)}function Ss(t){return Cs(t)}function Cs(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=ts(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?ns(t.bytesValue).toBase64():"referenceValue"in t?function(t){return Dn.fromName(t).toString()}(t.referenceValue):"geoPointValue"in t?function(t){return`geo(${t.latitude},${t.longitude})`}(t.geoPointValue):"arrayValue"in t?function(t){let e="[",n=!0;for(const s of t.values||[])n?n=!1:e+=",",e+=Cs(s);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",s=!0;for(const r of e)s?s=!1:n+=",",n+=`${r}:${Cs(t.fields[r])}`;return n+"}"}(t.mapValue):Ye(61005,{value:t})}function Is(t){switch(vs(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=cs(t);return e?16+Is(e):16;case 5:return 2*t.stringValue.length;case 6:return ns(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(t.arrayValue.values||[]).reduce((t,e)=>t+Is(e),0);case 10:case 11:return function(t){let e=0;return qn(t.fields,(t,n)=>{e+=t.length+Is(n)}),e}(t.mapValue);default:throw Ye(13486,{value:t})}}function As(t){return!!t&&"integerValue"in t}function ks(t){return!!t&&"arrayValue"in t}function Ds(t){return!!t&&"nullValue"in t}function Ns(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function xs(t){return!!t&&"mapValue"in t}function Rs(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return qn(t.mapValue.fields,(t,n)=>e.mapValue.fields[t]=Rs(n)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Rs(t.arrayValue.values[n]);return e}return Object.assign({},t)}class Ls{constructor(t){this.value=t}static empty(){return new Ls({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!xs(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Rs(e)}setAll(t){let e=kn.emptyPath(),n={},s=[];t.forEach((t,r)=>{if(!e.isImmediateParentOf(r)){const t=this.getFieldsMap(e);this.applyChanges(t,n,s),n={},s=[],e=r.popLast()}t?n[r.lastSegment()]=Rs(t):s.push(r.lastSegment())});const r=this.getFieldsMap(e);this.applyChanges(r,n,s)}delete(t){const e=this.field(t.popLast());xs(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return ws(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];xs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){qn(e,(e,n)=>t[e]=n);for(const s of n)delete t[s]}clone(){return new Ls(Rs(this.value))}}function Os(t){const e=[];return qn(t.fields,(t,n)=>{const s=new kn([t]);if(xs(n)){const t=Os(n.mapValue).fields;if(0===t.length)e.push(s);else for(const n of t)e.push(s.child(n))}else e.push(s)}),new Yn(e)
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
 */}class Ps{constructor(t,e,n,s,r,i,o){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=r,this.data=i,this.documentState=o}static newInvalidDocument(t){return new Ps(t,0,Tn.min(),Tn.min(),Tn.min(),Ls.empty(),0)}static newFoundDocument(t,e,n,s){return new Ps(t,1,e,Tn.min(),n,s,0)}static newNoDocument(t,e){return new Ps(t,2,e,Tn.min(),Tn.min(),Ls.empty(),0)}static newUnknownDocument(t,e){return new Ps(t,3,e,Tn.min(),Tn.min(),Ls.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(Tn.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Ls.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Ls.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Tn.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof Ps&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Ps(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class Ms{constructor(t,e){this.position=t,this.inclusive=e}}function Vs(t,e,n){let s=0;for(let r=0;r<t.position.length;r++){const i=e[r],o=t.position[r];if(s=i.field.isKeyField()?Dn.comparator(Dn.fromName(o.referenceValue),n.key):Es(o,n.data.field(i.field)),"desc"===i.dir&&(s*=-1),0!==s)break}return s}function Fs(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!ws(t.position[n],e.position[n]))return!1;return!0}
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
 */class Us{constructor(t,e="asc"){this.field=t,this.dir=e}}function Bs(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}
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
 */class js{}class $s extends js{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.createKeyFieldInFilter(t,e,n):new Ws(t,e,n):"array-contains"===e?new Zs(t,n):"in"===e?new tr(t,n):"not-in"===e?new er(t,n):"array-contains-any"===e?new nr(t,n):new $s(t,e,n)}static createKeyFieldInFilter(t,e,n){return"in"===e?new Ys(t,n):new Xs(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&void 0===e.nullValue&&this.matchesComparison(Es(e,this.value)):null!==e&&vs(this.value)===vs(e)&&this.matchesComparison(Es(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return Ye(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class qs extends js{constructor(t,e){super(),this.filters=t,this.op=e,this.Te=null}static create(t,e){return new qs(t,e)}matches(t){return zs(this)?void 0===this.filters.find(e=>!e.matches(t)):void 0!==this.filters.find(e=>e.matches(t))}getFlattenedFilters(){return null!==this.Te||(this.Te=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function zs(t){return"and"===t.op}function Ks(t){return function(t){for(const e of t.filters)if(e instanceof qs)return!1;return!0}(t)&&zs(t)}function Gs(t){if(t instanceof $s)return t.field.canonicalString()+t.op.toString()+Ss(t.value);if(Ks(t))return t.filters.map(t=>Gs(t)).join(",");{const e=t.filters.map(t=>Gs(t)).join(",");return`${t.op}(${e})`}}function Hs(t,e){return t instanceof $s?(n=t,(s=e)instanceof $s&&n.op===s.op&&n.field.isEqual(s.field)&&ws(n.value,s.value)):t instanceof qs?function(t,e){return e instanceof qs&&t.op===e.op&&t.filters.length===e.filters.length&&t.filters.reduce((t,n,s)=>t&&Hs(n,e.filters[s]),!0)}(t,e):void Ye(19439);var n,s}function Qs(t){return t instanceof $s?`${(e=t).field.canonicalString()} ${e.op} ${Ss(e.value)}`:t instanceof qs?function(t){return t.op.toString()+" {"+t.getFilters().map(Qs).join(" ,")+"}"}(t):"Filter";var e}class Ws extends $s{constructor(t,e,n){super(t,e,n),this.key=Dn.fromName(n.referenceValue)}matches(t){const e=Dn.comparator(t.key,this.key);return this.matchesComparison(e)}}class Ys extends $s{constructor(t,e){super(t,"in",e),this.keys=Js("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Xs extends $s{constructor(t,e){super(t,"not-in",e),this.keys=Js("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Js(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map(t=>Dn.fromName(t.referenceValue))}class Zs extends $s{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return ks(e)&&bs(e.arrayValue,this.value)}}class tr extends $s{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&bs(this.value.arrayValue,e)}}class er extends $s{constructor(t,e){super(t,"not-in",e)}matches(t){if(bs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&void 0===e.nullValue&&!bs(this.value.arrayValue,e)}}class nr extends $s{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!ks(e)||!e.arrayValue.values)&&e.arrayValue.values.some(t=>bs(this.value.arrayValue,t))}}
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
 */class sr{constructor(t,e=null,n=[],s=[],r=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=r,this.startAt=i,this.endAt=o,this.Ie=null}}function rr(t,e=null,n=[],s=[],r=null,i=null,o=null){return new sr(t,e,n,s,r,i,o)}function ir(t){const e=Ze(t);if(null===e.Ie){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(t=>Gs(t)).join(","),t+="|ob:",t+=e.orderBy.map(t=>{return(e=t).field.canonicalString()+e.dir;var e}).join(","),Fn(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(t=>Ss(t)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(t=>Ss(t)).join(",")),e.Ie=t}return e.Ie}function or(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Bs(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Hs(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Fs(t.startAt,e.startAt)&&Fs(t.endAt,e.endAt)}function ar(t){return Dn.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}
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
 */class cr{constructor(t,e=null,n=[],s=[],r=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=r,this.limitType=i,this.startAt=o,this.endAt=a,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function lr(t){return new cr(t)}function ur(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}function hr(t){const e=Ze(t);if(null===e.Ee){e.Ee=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ee.push(s),t.add(s.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(t){let e=new Qn(kn.comparator);return t.filters.forEach(t=>{t.getFlattenedFilters().forEach(t=>{t.isInequality()&&(e=e.add(t.field))})}),e})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ee.push(new Us(s,n))}),t.has(kn.keyField().canonicalString())||e.Ee.push(new Us(kn.keyField(),n))}return e.Ee}function dr(t){const e=Ze(t);return e.de||(e.de=function(t,e){if("F"===t.limitType)return rr(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(t=>{const e="desc"===t.dir?"asc":"desc";return new Us(t.field,e)});const n=t.endAt?new Ms(t.endAt.position,t.endAt.inclusive):null,s=t.startAt?new Ms(t.startAt.position,t.startAt.inclusive):null;return rr(t.path,t.collectionGroup,e,t.filters,t.limit,n,s)}}(e,hr(t))),e.de}function fr(t,e,n){return new cr(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function pr(t,e){return or(dr(t),dr(e))&&t.limitType===e.limitType}function mr(t){return`${ir(dr(t))}|lt:${t.limitType}`}function gr(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map(t=>Qs(t)).join(", ")}]`),Fn(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map(t=>{return`${(e=t).field.canonicalString()} (${e.dir})`;var e}).join(", ")}]`),t.startAt&&(e+=", startAt: ",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(t=>Ss(t)).join(",")),t.endAt&&(e+=", endAt: ",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(t=>Ss(t)).join(",")),`Target(${e})`}(dr(t))}; limitType=${t.limitType})`}function yr(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):Dn.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of hr(t))if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&(s=e,!((n=t).startAt&&!function(t,e,n){const s=Vs(t,e,n);return t.inclusive?s<=0:s<0}(n.startAt,hr(n),s)||n.endAt&&!function(t,e,n){const s=Vs(t,e,n);return t.inclusive?s>=0:s>0}(n.endAt,hr(n),s)));var n,s}function vr(t){return(e,n)=>{let s=!1;for(const r of hr(t)){const t=wr(r,e,n);if(0!==t)return t;s=s||r.field.isKeyField()}return 0}}function wr(t,e,n){const s=t.field.isKeyField()?Dn.comparator(e.key,n.key):function(t,e,n){const s=e.data.field(t),r=n.data.field(t);return null!==s&&null!==r?Es(s,r):Ye(42886)}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return Ye(19790,{direction:t.dir})}}
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
 */class br{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[s,r]of n)if(this.equalsFn(s,t))return r}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(void 0===s)return this.inner[n]=[[t,e]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],t))return void(s[r]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return 1===n.length?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){qn(this.inner,(e,n)=>{for(const[s,r]of n)t(s,r)})}isEmpty(){return zn(this.inner)}size(){return this.innerSize}}
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
 */const Er=new Kn(Dn.comparator);function _r(){return Er}const Tr=new Kn(Dn.comparator);function Sr(...t){let e=Tr;for(const n of t)e=e.insert(n.key,n);return e}function Cr(t){let e=Tr;return t.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function Ir(){return kr()}function Ar(){return kr()}function kr(){return new br(t=>t.toString(),(t,e)=>t.isEqual(e))}const Dr=new Kn(Dn.comparator),Nr=new Qn(Dn.comparator);function xr(...t){let e=Nr;for(const n of t)e=e.add(n);return e}const Rr=new Qn(mn);
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
function Lr(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Un(e)?"-0":e}}function Or(t){return{integerValue:""+t}}function Pr(t,e){return function(t){return"number"==typeof t&&Number.isInteger(t)&&!Un(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
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
 */(e)?Or(e):Lr(t,e)}
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
 */class Mr{constructor(){this._=void 0}}function Vr(t,e,n){return t instanceof Br?function(t,e){const n={fields:{[rs]:{stringValue:ss},[os]:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&as(e)&&(e=cs(e)),e&&(n.fields[is]=e),{mapValue:n}}(n,e):t instanceof jr?$r(t,e):t instanceof qr?zr(t,e):function(t,e){const n=Ur(t,e),s=Gr(n)+Gr(t.Re);return As(n)&&As(t.Re)?Or(s):Lr(t.serializer,s)}(t,e)}function Fr(t,e,n){return t instanceof jr?$r(t,e):t instanceof qr?zr(t,e):n}function Ur(t,e){return t instanceof Kr?As(n=e)||(s=n)&&"doubleValue"in s?e:{integerValue:0}:null;var n,s}class Br extends Mr{}class jr extends Mr{constructor(t){super(),this.elements=t}}function $r(t,e){const n=Hr(e);for(const s of t.elements)n.some(t=>ws(t,s))||n.push(s);return{arrayValue:{values:n}}}class qr extends Mr{constructor(t){super(),this.elements=t}}function zr(t,e){let n=Hr(e);for(const s of t.elements)n=n.filter(t=>!ws(t,s));return{arrayValue:{values:n}}}class Kr extends Mr{constructor(t,e){super(),this.serializer=t,this.Re=e}}function Gr(t){return es(t.integerValue||t.doubleValue)}function Hr(t){return ks(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
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
 */class Qr{constructor(t,e){this.field=t,this.transform=e}}class Wr{constructor(t,e){this.version=t,this.transformResults=e}}class Yr{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Yr}static exists(t){return new Yr(void 0,t)}static updateTime(t){return new Yr(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Xr(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class Jr{}function Zr(t,e){if(!t.hasLocalMutations||e&&0===e.fields.length)return null;if(null===e)return t.isNoDocument()?new li(t.key,Yr.none()):new ri(t.key,t.data,Yr.none());{const n=t.data,s=Ls.empty();let r=new Qn(kn.comparator);for(let t of e.fields)if(!r.has(t)){let e=n.field(t);null===e&&t.length>1&&(t=t.popLast(),e=n.field(t)),null===e?s.delete(t):s.set(t,e),r=r.add(t)}return new ii(t.key,s,new Yn(r.toArray()),Yr.none())}}function ti(t,e,n){var s;t instanceof ri?function(t,e,n){const s=t.value.clone(),r=ai(t.fieldTransforms,e,n.transformResults);s.setAll(r),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):t instanceof ii?function(t,e,n){if(!Xr(t.precondition,e))return void e.convertToUnknownDocument(n.version);const s=ai(t.fieldTransforms,e,n.transformResults),r=e.data;r.setAll(oi(t)),r.setAll(s),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):(s=n,e.convertToNoDocument(s.version).setHasCommittedMutations())}function ei(t,e,n,s){return t instanceof ri?function(t,e,n,s){if(!Xr(t.precondition,e))return n;const r=t.value.clone(),i=ci(t.fieldTransforms,s,e);return r.setAll(i),e.convertToFoundDocument(e.version,r).setHasLocalMutations(),null}(t,e,n,s):t instanceof ii?function(t,e,n,s){if(!Xr(t.precondition,e))return n;const r=ci(t.fieldTransforms,s,e),i=e.data;return i.setAll(oi(t)),i.setAll(r),e.convertToFoundDocument(e.version,i).setHasLocalMutations(),null===n?null:n.unionWith(t.fieldMask.fields).unionWith(t.fieldTransforms.map(t=>t.field))}(t,e,n,s):(r=e,i=n,Xr(t.precondition,r)?(r.convertToNoDocument(r.version).setHasLocalMutations(),null):i);var r,i}function ni(t,e){let n=null;for(const s of t.fieldTransforms){const t=e.data.field(s.field),r=Ur(s.transform,t||null);null!=r&&(null===n&&(n=Ls.empty()),n.set(s.field,r))}return n||null}function si(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&(n=t.fieldTransforms,s=e.fieldTransforms,!!(void 0===n&&void 0===s||n&&s&&wn(n,s,(t,e)=>function(t,e){return t.field.isEqual(e.field)&&(n=t.transform,s=e.transform,n instanceof jr&&s instanceof jr||n instanceof qr&&s instanceof qr?wn(n.elements,s.elements,ws):n instanceof Kr&&s instanceof Kr?ws(n.Re,s.Re):n instanceof Br&&s instanceof Br);var n,s}(t,e)))&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask)));var n,s}class ri extends Jr{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ii extends Jr{constructor(t,e,n,s,r=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function oi(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function ai(t,e,n){const s=new Map;Je(t.length===n.length,32656,{Ve:n.length,me:t.length});for(let r=0;r<n.length;r++){const i=t[r],o=i.transform,a=e.data.field(i.field);s.set(i.field,Fr(o,a,n[r]))}return s}function ci(t,e,n){const s=new Map;for(const r of t){const t=r.transform,i=n.data.field(r.field);s.set(r.field,Vr(t,i,e))}return s}class li extends Jr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ui extends Jr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
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
 */class hi{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const e=this.mutations[s];e.key.isEqual(t.key)&&ti(e,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=ei(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=ei(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Ar();return this.mutations.forEach(s=>{const r=t.get(s.key),i=r.overlayedDocument;let o=this.applyToLocalView(i,r.mutatedFields);o=e.has(s.key)?null:o;const a=Zr(i,o);null!==a&&n.set(s.key,a),i.isValidDocument()||i.convertToNoDocument(Tn.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),xr())}isEqual(t){return this.batchId===t.batchId&&wn(this.mutations,t.mutations,(t,e)=>si(t,e))&&wn(this.baseMutations,t.baseMutations,(t,e)=>si(t,e))}}class di{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){Je(t.mutations.length===n.length,58842,{fe:t.mutations.length,ge:n.length});let s=function(){return Dr}();const r=t.mutations;for(let i=0;i<r.length;i++)s=s.insert(r[i].key,n[i].version);return new di(t,e,n,s)}}
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
 */class fi{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return null!==t&&this.mutation===t.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
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
 */class pi{constructor(t,e){this.count=t,this.unchangedNames=e}}
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
 */var mi,gi;function yi(t){if(void 0===t)return He("GRPC error has no .code"),tn.UNKNOWN;switch(t){case mi.OK:return tn.OK;case mi.CANCELLED:return tn.CANCELLED;case mi.UNKNOWN:return tn.UNKNOWN;case mi.DEADLINE_EXCEEDED:return tn.DEADLINE_EXCEEDED;case mi.RESOURCE_EXHAUSTED:return tn.RESOURCE_EXHAUSTED;case mi.INTERNAL:return tn.INTERNAL;case mi.UNAVAILABLE:return tn.UNAVAILABLE;case mi.UNAUTHENTICATED:return tn.UNAUTHENTICATED;case mi.INVALID_ARGUMENT:return tn.INVALID_ARGUMENT;case mi.NOT_FOUND:return tn.NOT_FOUND;case mi.ALREADY_EXISTS:return tn.ALREADY_EXISTS;case mi.PERMISSION_DENIED:return tn.PERMISSION_DENIED;case mi.FAILED_PRECONDITION:return tn.FAILED_PRECONDITION;case mi.ABORTED:return tn.ABORTED;case mi.OUT_OF_RANGE:return tn.OUT_OF_RANGE;case mi.UNIMPLEMENTED:return tn.UNIMPLEMENTED;case mi.DATA_LOSS:return tn.DATA_LOSS;default:return Ye(39323,{code:t})}}(gi=mi||(mi={}))[gi.OK=0]="OK",gi[gi.CANCELLED=1]="CANCELLED",gi[gi.UNKNOWN=2]="UNKNOWN",gi[gi.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",gi[gi.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",gi[gi.NOT_FOUND=5]="NOT_FOUND",gi[gi.ALREADY_EXISTS=6]="ALREADY_EXISTS",gi[gi.PERMISSION_DENIED=7]="PERMISSION_DENIED",gi[gi.UNAUTHENTICATED=16]="UNAUTHENTICATED",gi[gi.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",gi[gi.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",gi[gi.ABORTED=10]="ABORTED",gi[gi.OUT_OF_RANGE=11]="OUT_OF_RANGE",gi[gi.UNIMPLEMENTED=12]="UNIMPLEMENTED",gi[gi.INTERNAL=13]="INTERNAL",gi[gi.UNAVAILABLE=14]="UNAVAILABLE",gi[gi.DATA_LOSS=15]="DATA_LOSS";
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
const vi=new ke([4294967295,4294967295],0);function wi(t){const e=fn().encode(t),n=new De;return n.update(e),new Uint8Array(n.digest())}function bi(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new ke([n,s],0),new ke([r,i],0)]}class Ei{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new _i(`Invalid padding: ${e}`);if(n<0)throw new _i(`Invalid hash count: ${n}`);if(t.length>0&&0===this.hashCount)throw new _i(`Invalid hash count: ${n}`);if(0===t.length&&0!==e)throw new _i(`Invalid padding when bitmap length is 0: ${e}`);this.pe=8*t.length-e,this.ye=ke.fromNumber(this.pe)}we(t,e,n){let s=t.add(e.multiply(ke.fromNumber(n)));return 1===s.compare(vi)&&(s=new ke([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(0===this.pe)return!1;const e=wi(t),[n,s]=bi(e);for(let r=0;r<this.hashCount;r++){const t=this.we(n,s,r);if(!this.be(t))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,r=new Uint8Array(Math.ceil(t/8)),i=new Ei(r,s,e);return n.forEach(t=>i.insert(t)),i}insert(t){if(0===this.pe)return;const e=wi(t),[n,s]=bi(e);for(let r=0;r<this.hashCount;r++){const t=this.we(n,s,r);this.Se(t)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class _i extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
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
 */class Ti{constructor(t,e,n,s,r){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,Si.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new Ti(Tn.min(),s,new Kn(mn),_r(),xr())}}class Si{constructor(t,e,n,s,r){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Si(n,e,xr(),xr(),xr())}}
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
 */class Ci{constructor(t,e,n,s){this.De=t,this.removedTargetIds=e,this.key=n,this.ve=s}}class Ii{constructor(t,e){this.targetId=t,this.Ce=e}}class Ai{constructor(t,e,n=Jn.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class ki{constructor(){this.Fe=0,this.Me=xi(),this.xe=Jn.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return 0!==this.Fe}get Le(){return this.Ne}ke(t){t.approximateByteSize()>0&&(this.Ne=!0,this.xe=t)}qe(){let t=xr(),e=xr(),n=xr();return this.Me.forEach((s,r)=>{switch(r){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:Ye(38017,{changeType:r})}}),new Si(this.xe,this.Oe,t,e,n)}Qe(){this.Ne=!1,this.Me=xi()}$e(t,e){this.Ne=!0,this.Me=this.Me.insert(t,e)}Ue(t){this.Ne=!0,this.Me=this.Me.remove(t)}Ke(){this.Fe+=1}We(){this.Fe-=1,Je(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class Di{constructor(t){this.ze=t,this.je=new Map,this.He=_r(),this.Je=Ni(),this.Ye=Ni(),this.Ze=new Kn(mn)}Xe(t){for(const e of t.De)t.ve&&t.ve.isFoundDocument()?this.et(e,t.ve):this.tt(e,t.key,t.ve);for(const e of t.removedTargetIds)this.tt(e,t.key,t.ve)}nt(t){this.forEachTarget(t,e=>{const n=this.rt(e);switch(t.state){case 0:this.it(e)&&n.ke(t.resumeToken);break;case 1:n.We(),n.Be||n.Qe(),n.ke(t.resumeToken);break;case 2:n.We(),n.Be||this.removeTarget(e);break;case 3:this.it(e)&&(n.Ge(),n.ke(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),n.ke(t.resumeToken));break;default:Ye(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach((t,n)=>{this.it(n)&&e(n)})}ot(t){const e=t.targetId,n=t.Ce.count,s=this._t(e);if(s){const r=s.target;if(ar(r))if(0===n){const t=new Dn(r.path);this.tt(e,t,Ps.newNoDocument(t,Tn.min()))}else Je(1===n,20013,{expectedCount:n});else{const s=this.ut(e);if(s!==n){const n=this.ct(t),r=n?this.lt(n,t,s):1;if(0!==r){this.st(e);const t=2===r?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,t)}}}}}ct(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:r=0}=e;let i,o;try{i=ns(n).toUint8Array()}catch(a){if(a instanceof Xn)return Qe("Decoding the base64 bloom filter in existence filter failed ("+a.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw a}try{o=new Ei(i,s,r)}catch(a){return Qe(a instanceof _i?"BloomFilter error: ":"Applying bloom filter failed: ",a),null}return 0===o.pe?null:o}lt(t,e,n){return e.Ce.count===n-this.Tt(t,e.targetId)?0:2}Tt(t,e){const n=this.ze.getRemoteKeysForTarget(e);let s=0;return n.forEach(n=>{const r=this.ze.Pt(),i=`projects/${r.projectId}/databases/${r.database}/documents/${n.path.canonicalString()}`;t.mightContain(i)||(this.tt(e,n,null),s++)}),s}It(t){const e=new Map;this.je.forEach((n,s)=>{const r=this._t(s);if(r){if(n.current&&ar(r.target)){const e=new Dn(r.target.path);this.Et(e).has(s)||this.dt(s,e)||this.tt(s,e,Ps.newNoDocument(e,t))}n.Le&&(e.set(s,n.qe()),n.Qe())}});let n=xr();this.Ye.forEach((t,e)=>{let s=!0;e.forEachWhile(t=>{const e=this._t(t);return!e||"TargetPurposeLimboResolution"===e.purpose||(s=!1,!1)}),s&&(n=n.add(t))}),this.He.forEach((e,n)=>n.setReadTime(t));const s=new Ti(t,e,this.Ze,this.He,n);return this.He=_r(),this.Je=Ni(),this.Ye=Ni(),this.Ze=new Kn(mn),s}et(t,e){if(!this.it(t))return;const n=this.dt(t,e.key)?2:0;this.rt(t).$e(e.key,n),this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.Ye=this.Ye.insert(e.key,this.At(e.key).add(t))}tt(t,e,n){if(!this.it(t))return;const s=this.rt(t);this.dt(t,e)?s.$e(e,1):s.Ue(e),this.Ye=this.Ye.insert(e,this.At(e).delete(t)),this.Ye=this.Ye.insert(e,this.At(e).add(t)),n&&(this.He=this.He.insert(e,n))}removeTarget(t){this.je.delete(t)}ut(t){const e=this.rt(t).qe();return this.ze.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ke(t){this.rt(t).Ke()}rt(t){let e=this.je.get(t);return e||(e=new ki,this.je.set(t,e)),e}At(t){let e=this.Ye.get(t);return e||(e=new Qn(mn),this.Ye=this.Ye.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new Qn(mn),this.Je=this.Je.insert(t,e)),e}it(t){const e=null!==this._t(t);return e||Ge("WatchChangeAggregator","Detected inactive target",t),e}_t(t){const e=this.je.get(t);return e&&e.Be?null:this.ze.Rt(t)}st(t){this.je.set(t,new ki),this.ze.getRemoteKeysForTarget(t).forEach(e=>{this.tt(t,e,null)})}dt(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function Ni(){return new Kn(Dn.comparator)}function xi(){return new Kn(Dn.comparator)}const Ri=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),Li=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Oi=(()=>({and:"AND",or:"OR"}))();class Pi{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Mi(t,e){return t.useProto3Json||Fn(e)?e:{value:e}}function Vi(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Fi(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Ui(t,e){return Vi(t,e.toTimestamp())}function Bi(t){return Je(!!t,49232),Tn.fromTimestamp(function(t){const e=ts(t);return new _n(e.seconds,e.nanos)}(t))}function ji(t,e){return $i(t,e).canonicalString()}function $i(t,e){const n=(s=t,new In(["projects",s.projectId,"databases",s.database])).child("documents");var s;return void 0===e?n:n.child(e)}function qi(t){const e=In.fromString(t);return Je(ao(e),10190,{key:e.toString()}),e}function zi(t,e){return ji(t.databaseId,e.path)}function Ki(t,e){const n=qi(e);if(n.get(1)!==t.databaseId.projectId)throw new en(tn.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new en(tn.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Dn(Qi(n))}function Gi(t,e){return ji(t.databaseId,e)}function Hi(t){return new In(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Qi(t){return Je(t.length>4&&"documents"===t.get(4),29091,{key:t.toString()}),t.popFirst(5)}function Wi(t,e,n){return{name:zi(t,e),fields:n.value.mapValue.fields}}function Yi(t,e){return{documents:[Gi(t,e.path)]}}function Xi(t,e){const n={structuredQuery:{}},s=e.path;let r;null!==e.collectionGroup?(r=s,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=s.popLast(),n.structuredQuery.from=[{collectionId:s.lastSegment()}]),n.parent=Gi(t,r);const i=function(t){if(0!==t.length)return io(qs.create(t,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(t){if(0!==t.length)return t.map(t=>{return{field:so((e=t).field),direction:to(e.dir)};var e})}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Mi(t,e.limit);return null!==a&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt={before:(c=e.startAt).inclusive,values:c.position}),e.endAt&&(n.structuredQuery.endAt=function(t){return{before:!t.inclusive,values:t.position}}(e.endAt)),{gt:n,parent:r};var c}function Ji(t){let e=function(t){const e=qi(t);return 4===e.length?In.emptyPath():Qi(e)}(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){Je(1===s,65062);const t=n.from[0];t.allDescendants?r=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=function(t){const e=Zi(t);return e instanceof qs&&Ks(e)?e.getFilters():[e]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(t=>{return new Us(ro((e=t).field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction));var e}));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,Fn(e)?null:e}(n.limit));let c=null;n.startAt&&(c=function(t){const e=!!t.before,n=t.values||[];return new Ms(n,e)}(n.startAt));let l=null;return n.endAt&&(l=function(t){const e=!t.before,n=t.values||[];return new Ms(n,e)}(n.endAt)),function(t,e,n,s,r,i,o,a){return new cr(t,e,n,s,r,i,o,a)}(e,r,o,i,a,"F",c,l)}function Zi(t){return void 0!==t.unaryFilter?function(t){switch(t.unaryFilter.op){case"IS_NAN":const e=ro(t.unaryFilter.field);return $s.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=ro(t.unaryFilter.field);return $s.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ro(t.unaryFilter.field);return $s.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const r=ro(t.unaryFilter.field);return $s.create(r,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Ye(61313);default:return Ye(60726)}}(t):void 0!==t.fieldFilter?(e=t,$s.create(ro(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Ye(58110);default:return Ye(50506)}}(e.fieldFilter.op),e.fieldFilter.value)):void 0!==t.compositeFilter?function(t){return qs.create(t.compositeFilter.filters.map(t=>Zi(t)),function(t){switch(t){case"AND":return"and";case"OR":return"or";default:return Ye(1026)}}(t.compositeFilter.op))}(t):Ye(30097,{filter:t});var e}function to(t){return Ri[t]}function eo(t){return Li[t]}function no(t){return Oi[t]}function so(t){return{fieldPath:t.canonicalString()}}function ro(t){return kn.fromServerFormat(t.fieldPath)}function io(t){return t instanceof $s?function(t){if("=="===t.op){if(Ns(t.value))return{unaryFilter:{field:so(t.field),op:"IS_NAN"}};if(Ds(t.value))return{unaryFilter:{field:so(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(Ns(t.value))return{unaryFilter:{field:so(t.field),op:"IS_NOT_NAN"}};if(Ds(t.value))return{unaryFilter:{field:so(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:so(t.field),op:eo(t.op),value:t.value}}}(t):t instanceof qs?function(t){const e=t.getFilters().map(t=>io(t));return 1===e.length?e[0]:{compositeFilter:{op:no(t.op),filters:e}}}(t):Ye(54877,{filter:t})}function oo(t){const e=[];return t.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ao(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
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
 */class co{constructor(t,e,n,s,r=Tn.min(),i=Tn.min(),o=Jn.EMPTY_BYTE_STRING,a=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(t){return new co(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new co(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new co(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new co(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}
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
 */class lo{constructor(t){this.wt=t}}function uo(t){const e=Ji({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?fr(e,e.limit,"L"):e}
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
 */class ho{constructor(){this.yn=new fo}addToCollectionParentIndex(t,e){return this.yn.add(e),Pn.resolve()}getCollectionParents(t,e){return Pn.resolve(this.yn.getEntries(e))}addFieldIndex(t,e){return Pn.resolve()}deleteFieldIndex(t,e){return Pn.resolve()}deleteAllFieldIndexes(t){return Pn.resolve()}createTargetIndexes(t,e){return Pn.resolve()}getDocumentsMatchingTarget(t,e){return Pn.resolve(null)}getIndexType(t,e){return Pn.resolve(0)}getFieldIndexes(t,e){return Pn.resolve([])}getNextCollectionGroupToUpdate(t){return Pn.resolve(null)}getMinOffset(t,e){return Pn.resolve(xn.min())}getMinOffsetFromCollectionGroup(t,e){return Pn.resolve(xn.min())}updateCollectionGroup(t,e,n){return Pn.resolve()}updateIndexEntries(t,e){return Pn.resolve()}}class fo{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new Qn(In.comparator),r=!s.has(n);return this.index[e]=s.add(n),r}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new Qn(In.comparator)).toArray()}}
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
 */const po={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},mo=41943040;class go{static withCacheSize(t){return new go(t,go.DEFAULT_COLLECTION_PERCENTILE,go.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}
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
 */go.DEFAULT_COLLECTION_PERCENTILE=10,go.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,go.DEFAULT=new go(mo,go.DEFAULT_COLLECTION_PERCENTILE,go.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),go.DISABLED=new go(-1,0,0);
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
class yo{constructor(t){this.nr=t}next(){return this.nr+=2,this.nr}static rr(){return new yo(0)}static ir(){return new yo(-1)}}
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
 */const vo="LruGarbageCollector";function wo([t,e],[n,s]){const r=mn(t,n);return 0===r?mn(e,s):r}class bo{constructor(t){this.cr=t,this.buffer=new Qn(wo),this.lr=0}hr(){return++this.lr}Pr(t){const e=[t,this.hr()];if(this.buffer.size<this.cr)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();wo(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Eo{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Tr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Ir(6e4)}stop(){this.Tr&&(this.Tr.cancel(),this.Tr=null)}get started(){return null!==this.Tr}Ir(t){Ge(vo,`Garbage collection scheduled in ${t}ms`),this.Tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Mn(t)?Ge(vo,"Ignoring IndexedDB error during garbage collection: ",t):await On(t)}await this.Ir(3e5)})}}class _o{constructor(t,e){this.Er=t,this.params=e}calculateTargetCount(t,e){return this.Er.dr(t).next(t=>Math.floor(e/100*t))}nthSequenceNumber(t,e){if(0===e)return Pn.resolve(Vn.le);const n=new bo(e);return this.Er.forEachTarget(t,t=>n.Pr(t.sequenceNumber)).next(()=>this.Er.Ar(t,t=>n.Pr(t))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Er.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Er.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(Ge("LruGarbageCollector","Garbage collection skipped; disabled"),Pn.resolve(po)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(Ge("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),po):this.Rr(t,e))}getCacheSize(t){return this.Er.getCacheSize(t)}Rr(t,e){let n,s,r,i,o,a,c;const l=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(e=>(e>this.params.maximumSequenceNumbersToCollect?(Ge("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),s=this.params.maximumSequenceNumbersToCollect):s=e,i=Date.now(),this.nthSequenceNumber(t,s))).next(s=>(n=s,o=Date.now(),this.removeTargets(t,n,e))).next(e=>(r=e,a=Date.now(),this.removeOrphanedDocuments(t,n))).next(t=>(c=Date.now(),Ke()<=ct.DEBUG&&Ge("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-l}ms\n\tDetermined least recently used ${s} in `+(o-i)+`ms\n\tRemoved ${r} targets in `+(a-o)+`ms\n\tRemoved ${t} documents in `+(c-a)+`ms\nTotal Duration: ${c-l}ms`),Pn.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:r,documentsRemoved:t})))}}
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
class To{constructor(){this.changes=new br(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Ps.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?Pn.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
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
 */class Co{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(n=s,this.remoteDocumentCache.getEntry(t,e))).next(t=>(null!==n&&ei(n.mutation,t,Yn.empty(),_n.now()),t))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.getLocalViewOfDocuments(t,e,xr()).next(()=>e))}getLocalViewOfDocuments(t,e,n=xr()){const s=Ir();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,n).next(t=>{let e=Sr();return t.forEach((t,n)=>{e=e.insert(t,n.overlayedDocument)}),e}))}getOverlayedDocuments(t,e){const n=Ir();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,xr()))}populateOverlays(t,e,n){const s=[];return n.forEach(t=>{e.has(t)||s.push(t)}),this.documentOverlayCache.getOverlays(t,s).next(t=>{t.forEach((t,n)=>{e.set(t,n)})})}computeViews(t,e,n,s){let r=_r();const i=kr(),o=kr();return e.forEach((t,e)=>{const o=n.get(e.key);s.has(e.key)&&(void 0===o||o.mutation instanceof ii)?r=r.insert(e.key,e):void 0!==o?(i.set(e.key,o.mutation.getFieldMask()),ei(o.mutation,e,o.mutation.getFieldMask(),_n.now())):i.set(e.key,Yn.empty())}),this.recalculateAndSaveOverlays(t,r).next(t=>(t.forEach((t,e)=>i.set(t,e)),e.forEach((t,e)=>{var n;return o.set(t,new So(e,null!==(n=i.get(t))&&void 0!==n?n:null))}),o))}recalculateAndSaveOverlays(t,e){const n=kr();let s=new Kn((t,e)=>t-e),r=xr();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(t=>{for(const r of t)r.keys().forEach(t=>{const i=e.get(t);if(null===i)return;let o=n.get(t)||Yn.empty();o=r.applyToLocalView(i,o),n.set(t,o);const a=(s.get(r.batchId)||xr()).add(t);s=s.insert(r.batchId,a)})}).next(()=>{const i=[],o=s.getReverseIterator();for(;o.hasNext();){const s=o.getNext(),a=s.key,c=s.value,l=Ar();c.forEach(t=>{if(!r.has(t)){const s=Zr(e.get(t),n.get(t));null!==s&&l.set(t,s),r=r.add(t)}}),i.push(this.documentOverlayCache.saveOverlays(t,a,l))}return Pn.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.recalculateAndSaveOverlays(t,e))}getDocumentsMatchingQuery(t,e,n,s){return r=e,Dn.isDocumentKey(r.path)&&null===r.collectionGroup&&0===r.filters.length?this.getDocumentsMatchingDocumentQuery(t,e.path):function(t){return null!==t.collectionGroup}(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s);var r}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next(r=>{const i=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-r.size):Pn.resolve(Ir());let o=-1,a=r;return i.next(e=>Pn.forEach(e,(e,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),r.get(e)?Pn.resolve():this.remoteDocumentCache.getEntry(t,e).next(t=>{a=a.insert(e,t)}))).next(()=>this.populateOverlays(t,e,r)).next(()=>this.computeViews(t,a,e,xr())).next(t=>({batchId:o,changes:Cr(t)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new Dn(e)).next(t=>{let e=Sr();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e})}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const r=e.collectionGroup;let i=Sr();return this.indexManager.getCollectionParents(t,r).next(o=>Pn.forEach(o,o=>{const a=(c=e,l=o.child(r),new cr(l,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt));var c,l;return this.getDocumentsMatchingCollectionQuery(t,a,n,s).next(t=>{t.forEach((t,e)=>{i=i.insert(t,e)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(t,e,n,s){let r;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(i=>(r=i,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,r,s))).next(t=>{r.forEach((e,n)=>{const s=n.getKey();null===t.get(s)&&(t=t.insert(s,Ps.newInvalidDocument(s)))});let n=Sr();return t.forEach((t,s)=>{const i=r.get(t);void 0!==i&&ei(i.mutation,s,Yn.empty(),_n.now()),yr(e,s)&&(n=n.insert(t,s))}),n})}}
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
 */class Io{constructor(t){this.serializer=t,this.Fr=new Map,this.Mr=new Map}getBundleMetadata(t,e){return Pn.resolve(this.Fr.get(e))}saveBundleMetadata(t,e){return this.Fr.set(e.id,{id:(n=e).id,version:n.version,createTime:Bi(n.createTime)}),Pn.resolve();var n}getNamedQuery(t,e){return Pn.resolve(this.Mr.get(e))}saveNamedQuery(t,e){return this.Mr.set(e.name,{name:(n=e).name,query:uo(n.bundledQuery),readTime:Bi(n.readTime)}),Pn.resolve();var n}}
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
 */class Ao{constructor(){this.overlays=new Kn(Dn.comparator),this.Or=new Map}getOverlay(t,e){return Pn.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Ir();return Pn.forEach(e,e=>this.getOverlay(t,e).next(t=>{null!==t&&n.set(e,t)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((n,s)=>{this.St(t,e,s)}),Pn.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Or.get(n);return void 0!==s&&(s.forEach(t=>this.overlays=this.overlays.remove(t)),this.Or.delete(n)),Pn.resolve()}getOverlaysForCollection(t,e,n){const s=Ir(),r=e.length+1,i=new Dn(e.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const t=o.getNext().value,i=t.getKey();if(!e.isPrefixOf(i.path))break;i.path.length===r&&t.largestBatchId>n&&s.set(t.getKey(),t)}return Pn.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let r=new Kn((t,e)=>t-e);const i=this.overlays.getIterator();for(;i.hasNext();){const t=i.getNext().value;if(t.getKey().getCollectionGroup()===e&&t.largestBatchId>n){let e=r.get(t.largestBatchId);null===e&&(e=Ir(),r=r.insert(t.largestBatchId,e)),e.set(t.getKey(),t)}}const o=Ir(),a=r.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((t,e)=>o.set(t,e)),!(o.size()>=s)););return Pn.resolve(o)}St(t,e,n){const s=this.overlays.get(n.key);if(null!==s){const t=this.Or.get(s.largestBatchId).delete(n.key);this.Or.set(s.largestBatchId,t)}this.overlays=this.overlays.insert(n.key,new fi(e,n));let r=this.Or.get(e);void 0===r&&(r=xr(),this.Or.set(e,r)),this.Or.set(e,r.add(n.key))}}
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
 */class ko{constructor(){this.sessionToken=Jn.EMPTY_BYTE_STRING}getSessionToken(t){return Pn.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,Pn.resolve()}}
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
 */class Do{constructor(){this.Nr=new Qn(No.Br),this.Lr=new Qn(No.kr)}isEmpty(){return this.Nr.isEmpty()}addReference(t,e){const n=new No(t,e);this.Nr=this.Nr.add(n),this.Lr=this.Lr.add(n)}qr(t,e){t.forEach(t=>this.addReference(t,e))}removeReference(t,e){this.Qr(new No(t,e))}$r(t,e){t.forEach(t=>this.removeReference(t,e))}Ur(t){const e=new Dn(new In([])),n=new No(e,t),s=new No(e,t+1),r=[];return this.Lr.forEachInRange([n,s],t=>{this.Qr(t),r.push(t.key)}),r}Kr(){this.Nr.forEach(t=>this.Qr(t))}Qr(t){this.Nr=this.Nr.delete(t),this.Lr=this.Lr.delete(t)}Wr(t){const e=new Dn(new In([])),n=new No(e,t),s=new No(e,t+1);let r=xr();return this.Lr.forEachInRange([n,s],t=>{r=r.add(t.key)}),r}containsKey(t){const e=new No(t,0),n=this.Nr.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class No{constructor(t,e){this.key=t,this.Gr=e}static Br(t,e){return Dn.comparator(t.key,e.key)||mn(t.Gr,e.Gr)}static kr(t,e){return mn(t.Gr,e.Gr)||Dn.comparator(t.key,e.key)}}
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
 */class xo{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Jn=1,this.zr=new Qn(No.Br)}checkEmpty(t){return Pn.resolve(0===this.mutationQueue.length)}addMutationBatch(t,e,n,s){const r=this.Jn;this.Jn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new hi(r,e,n,s);this.mutationQueue.push(i);for(const o of s)this.zr=this.zr.add(new No(o.key,r)),this.indexManager.addToCollectionParentIndex(t,o.key.path.popLast());return Pn.resolve(i)}lookupMutationBatch(t,e){return Pn.resolve(this.jr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.Hr(n),r=s<0?0:s;return Pn.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return Pn.resolve(0===this.mutationQueue.length?-1:this.Jn-1)}getAllMutationBatches(t){return Pn.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new No(e,0),s=new No(e,Number.POSITIVE_INFINITY),r=[];return this.zr.forEachInRange([n,s],t=>{const e=this.jr(t.Gr);r.push(e)}),Pn.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Qn(mn);return e.forEach(t=>{const e=new No(t,0),s=new No(t,Number.POSITIVE_INFINITY);this.zr.forEachInRange([e,s],t=>{n=n.add(t.Gr)})}),Pn.resolve(this.Jr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let r=n;Dn.isDocumentKey(r)||(r=r.child(""));const i=new No(new Dn(r),0);let o=new Qn(mn);return this.zr.forEachWhile(t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===s&&(o=o.add(t.Gr)),!0)},i),Pn.resolve(this.Jr(o))}Jr(t){const e=[];return t.forEach(t=>{const n=this.jr(t);null!==n&&e.push(n)}),e}removeMutationBatch(t,e){Je(0===this.Yr(e.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.zr;return Pn.forEach(e.mutations,s=>{const r=new No(s.key,e.batchId);return n=n.delete(r),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.zr=n})}Xn(t){}containsKey(t,e){const n=new No(e,0),s=this.zr.firstAfterOrEqual(n);return Pn.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,Pn.resolve()}Yr(t,e){return this.Hr(t)}Hr(t){return 0===this.mutationQueue.length?0:t-this.mutationQueue[0].batchId}jr(t){const e=this.Hr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}
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
 */class Ro{constructor(t){this.Zr=t,this.docs=new Kn(Dn.comparator),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),r=s?s.size:0,i=this.Zr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:i}),this.size+=i-r,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return Pn.resolve(n?n.document.mutableCopy():Ps.newInvalidDocument(e))}getEntries(t,e){let n=_r();return e.forEach(t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.mutableCopy():Ps.newInvalidDocument(t))}),Pn.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let r=_r();const i=e.path,o=new Dn(i.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:t,value:{document:o}}=a.getNext();if(!i.isPrefixOf(t.path))break;t.path.length>i.length+1||Rn(Nn(o),n)<=0||(s.has(o.key)||yr(e,o))&&(r=r.insert(o.key,o.mutableCopy()))}return Pn.resolve(r)}getAllFromCollectionGroup(t,e,n,s){Ye(9500)}Xr(t,e){return Pn.forEach(this.docs,t=>e(t))}newChangeBuffer(t){return new Lo(this)}getSize(t){return Pn.resolve(this.size)}}class Lo extends To{constructor(t){super(),this.vr=t}applyChanges(t){const e=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?e.push(this.vr.addEntry(t,s)):this.vr.removeEntry(n)}),Pn.waitFor(e)}getFromCache(t,e){return this.vr.getEntry(t,e)}getAllFromCache(t,e){return this.vr.getEntries(t,e)}}
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
 */class Oo{constructor(t){this.persistence=t,this.ei=new br(t=>ir(t),or),this.lastRemoteSnapshotVersion=Tn.min(),this.highestTargetId=0,this.ti=0,this.ni=new Do,this.targetCount=0,this.ri=yo.rr()}forEachTarget(t,e){return this.ei.forEach((t,n)=>e(n)),Pn.resolve()}getLastRemoteSnapshotVersion(t){return Pn.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return Pn.resolve(this.ti)}allocateTargetId(t){return this.highestTargetId=this.ri.next(),Pn.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ti&&(this.ti=e),Pn.resolve()}ar(t){this.ei.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ri=new yo(e),this.highestTargetId=e),t.sequenceNumber>this.ti&&(this.ti=t.sequenceNumber)}addTargetData(t,e){return this.ar(e),this.targetCount+=1,Pn.resolve()}updateTargetData(t,e){return this.ar(e),Pn.resolve()}removeTargetData(t,e){return this.ei.delete(e.target),this.ni.Ur(e.targetId),this.targetCount-=1,Pn.resolve()}removeTargets(t,e,n){let s=0;const r=[];return this.ei.forEach((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.ei.delete(i),r.push(this.removeMatchingKeysForTargetId(t,o.targetId)),s++)}),Pn.waitFor(r).next(()=>s)}getTargetCount(t){return Pn.resolve(this.targetCount)}getTargetData(t,e){const n=this.ei.get(e)||null;return Pn.resolve(n)}addMatchingKeys(t,e,n){return this.ni.qr(e,n),Pn.resolve()}removeMatchingKeys(t,e,n){this.ni.$r(e,n);const s=this.persistence.referenceDelegate,r=[];return s&&e.forEach(e=>{r.push(s.markPotentiallyOrphaned(t,e))}),Pn.waitFor(r)}removeMatchingKeysForTargetId(t,e){return this.ni.Ur(e),Pn.resolve()}getMatchingKeysForTargetId(t,e){const n=this.ni.Wr(e);return Pn.resolve(n)}containsKey(t,e){return Pn.resolve(this.ni.containsKey(e))}}
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
 */class Po{constructor(t,e){this.ii={},this.overlays={},this.si=new Vn(0),this.oi=!1,this.oi=!0,this._i=new ko,this.referenceDelegate=t(this),this.ai=new Oo(this),this.indexManager=new ho,this.remoteDocumentCache=new Ro(t=>this.referenceDelegate.ui(t)),this.serializer=new lo(e),this.ci=new Io(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.oi=!1,Promise.resolve()}get started(){return this.oi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Ao,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ii[t.toKey()];return n||(n=new xo(e,this.referenceDelegate),this.ii[t.toKey()]=n),n}getGlobalsCache(){return this._i}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.ci}runTransaction(t,e,n){Ge("MemoryPersistence","Starting transaction:",t);const s=new Mo(this.si.next());return this.referenceDelegate.li(),n(s).next(t=>this.referenceDelegate.hi(s).next(()=>t)).toPromise().then(t=>(s.raiseOnCommittedEvent(),t))}Pi(t,e){return Pn.or(Object.values(this.ii).map(n=>()=>n.containsKey(t,e)))}}class Mo extends Ln{constructor(t){super(),this.currentSequenceNumber=t}}class Vo{constructor(t){this.persistence=t,this.Ti=new Do,this.Ii=null}static Ei(t){return new Vo(t)}get di(){if(this.Ii)return this.Ii;throw Ye(60996)}addReference(t,e,n){return this.Ti.addReference(n,e),this.di.delete(n.toString()),Pn.resolve()}removeReference(t,e,n){return this.Ti.removeReference(n,e),this.di.add(n.toString()),Pn.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),Pn.resolve()}removeTarget(t,e){this.Ti.Ur(e.targetId).forEach(t=>this.di.add(t.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(t=>{t.forEach(t=>this.di.add(t.toString()))}).next(()=>n.removeTargetData(t,e))}li(){this.Ii=new Set}hi(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Pn.forEach(this.di,n=>{const s=Dn.fromPath(n);return this.Ai(t,s).next(t=>{t||e.removeEntry(s,Tn.min())})}).next(()=>(this.Ii=null,e.apply(t)))}updateLimboDocument(t,e){return this.Ai(t,e).next(t=>{t?this.di.delete(e.toString()):this.di.add(e.toString())})}ui(t){return 0}Ai(t,e){return Pn.or([()=>Pn.resolve(this.Ti.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Pi(t,e)])}}class Fo{constructor(t,e){this.persistence=t,this.Ri=new br(t=>function(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=jn(e)),e=Bn(t.get(n),e);return jn(e)}(t.path),(t,e)=>t.isEqual(e)),this.garbageCollector=function(t,e){return new _o(t,e)}(this,e)}static Ei(t,e){return new Fo(t,e)}li(){}hi(t){return Pn.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.Vr(t);return this.persistence.getTargetCache().getTargetCount(t).next(t=>e.next(e=>t+e))}Vr(t){let e=0;return this.Ar(t,t=>{e++}).next(()=>e)}Ar(t,e){return Pn.forEach(this.Ri,(n,s)=>this.gr(t,n,s).next(t=>t?Pn.resolve():e(s)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),r=s.newChangeBuffer();return s.Xr(t,s=>this.gr(t,s,e).next(t=>{t||(n++,r.removeEntry(s,Tn.min()))})).next(()=>r.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.Ri.set(e,t.currentSequenceNumber),Pn.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.Ri.set(n,t.currentSequenceNumber),Pn.resolve()}removeReference(t,e,n){return this.Ri.set(n,t.currentSequenceNumber),Pn.resolve()}updateLimboDocument(t,e){return this.Ri.set(e,t.currentSequenceNumber),Pn.resolve()}ui(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Is(t.data.value)),e}gr(t,e,n){return Pn.or([()=>this.persistence.Pi(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const t=this.Ri.get(e);return Pn.resolve(void 0!==t&&t>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}
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
 */class Uo{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.ls=n,this.hs=s}static Ps(t,e){let n=xr(),s=xr();for(const r of e.docChanges)switch(r.type){case 0:n=n.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new Uo(t,e.fromCache,n,s)}}
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
 */class Bo{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}
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
 */class jo{constructor(){this.Ts=!1,this.Is=!1,this.Es=100,this.ds=X()?8:function(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}("undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:"")>0?6:4}initialize(t,e){this.As=t,this.indexManager=e,this.Ts=!0}getDocumentsMatchingQuery(t,e,n,s){const r={result:null};return this.Rs(t,e).next(t=>{r.result=t}).next(()=>{if(!r.result)return this.Vs(t,e,s,n).next(t=>{r.result=t})}).next(()=>{if(r.result)return;const n=new Bo;return this.fs(t,e,n).next(s=>{if(r.result=s,this.Is)return this.gs(t,e,n,s.size)})}).next(()=>r.result)}gs(t,e,n,s){return n.documentReadCount<this.Es?(Ke()<=ct.DEBUG&&Ge("QueryEngine","SDK will not create cache indexes for query:",gr(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Es,"documents"),Pn.resolve()):(Ke()<=ct.DEBUG&&Ge("QueryEngine","Query:",gr(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ds*s?(Ke()<=ct.DEBUG&&Ge("QueryEngine","The SDK decides to create cache indexes for query:",gr(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,dr(e))):Pn.resolve())}Rs(t,e){if(ur(e))return Pn.resolve(null);let n=dr(e);return this.indexManager.getIndexType(t,n).next(s=>0===s?null:(null!==e.limit&&1===s&&(e=fr(e,null,"F"),n=dr(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(s=>{const r=xr(...s);return this.As.getDocuments(t,r).next(s=>this.indexManager.getMinOffset(t,n).next(n=>{const i=this.ps(e,s);return this.ys(e,i,r,n.readTime)?this.Rs(t,fr(e,null,"F")):this.ws(t,i,e,n)}))})))}Vs(t,e,n,s){return ur(e)||s.isEqual(Tn.min())?Pn.resolve(null):this.As.getDocuments(t,n).next(r=>{const i=this.ps(e,r);return this.ys(e,i,n,s)?Pn.resolve(null):(Ke()<=ct.DEBUG&&Ge("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),gr(e)),this.ws(t,i,e,function(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,r=Tn.fromTimestamp(1e9===s?new _n(n+1,0):new _n(n,s));return new xn(r,Dn.empty(),e)}(s,-1)).next(t=>t))})}ps(t,e){let n=new Qn(vr(t));return e.forEach((e,s)=>{yr(t,s)&&(n=n.add(s))}),n}ys(t,e,n,s){if(null===t.limit)return!1;if(n.size!==e.size)return!0;const r="F"===t.limitType?e.last():e.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}fs(t,e,n){return Ke()<=ct.DEBUG&&Ge("QueryEngine","Using full collection scan to execute query:",gr(e)),this.As.getDocumentsMatchingQuery(t,e,xn.min(),n)}ws(t,e,n,s){return this.As.getDocumentsMatchingQuery(t,n,s).next(t=>(e.forEach(e=>{t=t.insert(e.key,e)}),t))}}
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
 */const $o="LocalStore";class qo{constructor(t,e,n,s){this.persistence=t,this.bs=e,this.serializer=s,this.Ss=new Kn(mn),this.Ds=new br(t=>ir(t),or),this.vs=new Map,this.Cs=t.getRemoteDocumentCache(),this.ai=t.getTargetCache(),this.ci=t.getBundleCache(),this.Fs(n)}Fs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Co(this.Cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Cs.setIndexManager(this.indexManager),this.bs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Ss))}}async function zo(t,e){const n=Ze(t);return await n.persistence.runTransaction("Handle user change","readonly",t=>{let s;return n.mutationQueue.getAllMutationBatches(t).next(r=>(s=r,n.Fs(e),n.mutationQueue.getAllMutationBatches(t))).next(e=>{const r=[],i=[];let o=xr();for(const t of s){r.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){i.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return n.localDocuments.getDocuments(t,o).next(t=>({Ms:t,removedBatchIds:r,addedBatchIds:i}))})})}function Ko(t){const e=Ze(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.ai.getLastRemoteSnapshotVersion(t))}function Go(t,e){const n=Ze(t),s=e.snapshotVersion;let r=n.Ss;return n.persistence.runTransaction("Apply remote event","readwrite-primary",t=>{const i=n.Cs.newChangeBuffer({trackRemovals:!0});r=n.Ss;const o=[];e.targetChanges.forEach((i,a)=>{const c=r.get(a);if(!c)return;o.push(n.ai.removeMatchingKeys(t,i.removedDocuments,a).next(()=>n.ai.addMatchingKeys(t,i.addedDocuments,a)));let l=c.withSequenceNumber(t.currentSequenceNumber);null!==e.targetMismatches.get(a)?l=l.withResumeToken(Jn.EMPTY_BYTE_STRING,Tn.min()).withLastLimboFreeSnapshotVersion(Tn.min()):i.resumeToken.approximateByteSize()>0&&(l=l.withResumeToken(i.resumeToken,s)),r=r.insert(a,l),function(t,e,n){if(0===t.resumeToken.approximateByteSize())return!0;if(e.snapshotVersion.toMicroseconds()-t.snapshotVersion.toMicroseconds()>=3e8)return!0;return n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(c,l,i)&&o.push(n.ai.updateTargetData(t,l))});let a=_r(),c=xr();if(e.documentUpdates.forEach(s=>{e.resolvedLimboDocuments.has(s)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,s))}),o.push(function(t,e,n){let s=xr(),r=xr();return n.forEach(t=>s=s.add(t)),e.getEntries(t,s).next(t=>{let s=_r();return n.forEach((n,i)=>{const o=t.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(r=r.add(n)),i.isNoDocument()&&i.version.isEqual(Tn.min())?(e.removeEntry(n,i.readTime),s=s.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(e.addEntry(i),s=s.insert(n,i)):Ge($o,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)}),{xs:s,Os:r}})}(t,i,e.documentUpdates).next(t=>{a=t.xs,c=t.Os})),!s.isEqual(Tn.min())){const e=n.ai.getLastRemoteSnapshotVersion(t).next(e=>n.ai.setTargetsMetadata(t,t.currentSequenceNumber,s));o.push(e)}return Pn.waitFor(o).next(()=>i.apply(t)).next(()=>n.localDocuments.getLocalViewOfDocuments(t,a,c)).next(()=>a)}).then(t=>(n.Ss=r,t))}function Ho(t,e){const n=Ze(t);return n.persistence.runTransaction("Get next mutation batch","readonly",t=>(void 0===e&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(t,e)))}async function Qo(t,e,n){const s=Ze(t),r=s.Ss.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,t=>s.persistence.referenceDelegate.removeTarget(t,r))}catch(o){if(!Mn(o))throw o;Ge($o,`Failed to update sequence numbers for target ${e}: ${o}`)}s.Ss=s.Ss.remove(e),s.Ds.delete(r.target)}function Wo(t,e,n){const s=Ze(t);let r=Tn.min(),i=xr();return s.persistence.runTransaction("Execute query","readwrite",t=>function(t,e,n){const s=Ze(t),r=s.Ds.get(n);return void 0!==r?Pn.resolve(s.Ss.get(r)):s.ai.getTargetData(e,n)}(s,t,dr(e)).next(e=>{if(e)return r=e.lastLimboFreeSnapshotVersion,s.ai.getMatchingKeysForTargetId(t,e.targetId).next(t=>{i=t})}).next(()=>s.bs.getDocumentsMatchingQuery(t,e,n?r:Tn.min(),n?i:xr())).next(t=>(function(t,e,n){let s=t.vs.get(e)||Tn.min();n.forEach((t,e)=>{e.readTime.compareTo(s)>0&&(s=e.readTime)}),t.vs.set(e,s)}(s,function(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}(e),t),{documents:t,Ns:i})))}class Yo{constructor(){this.activeTargetIds=Rr}$s(t){this.activeTargetIds=this.activeTargetIds.add(t)}Us(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Qs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Xo{constructor(){this.So=new Yo,this.Do={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.So.$s(t),this.Do[t]||"not-current"}updateQueryState(t,e,n){this.Do[t]=e}removeLocalQueryTarget(t){this.So.Us(t)}isLocalQueryTarget(t){return this.So.activeTargetIds.has(t)}clearQueryState(t){delete this.Do[t]}getAllActiveQueryTargets(){return this.So.activeTargetIds}isActiveQueryTarget(t){return this.So.activeTargetIds.has(t)}start(){return this.So=new Yo,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}
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
 */class Jo{vo(t){}shutdown(){}}
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
 */const Zo="ConnectivityMonitor";class ta{constructor(){this.Co=()=>this.Fo(),this.Mo=()=>this.xo(),this.Oo=[],this.No()}vo(t){this.Oo.push(t)}shutdown(){window.removeEventListener("online",this.Co),window.removeEventListener("offline",this.Mo)}No(){window.addEventListener("online",this.Co),window.addEventListener("offline",this.Mo)}Fo(){Ge(Zo,"Network connectivity changed: AVAILABLE");for(const t of this.Oo)t(0)}xo(){Ge(Zo,"Network connectivity changed: UNAVAILABLE");for(const t of this.Oo)t(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
 */let ea=null;function na(){return null===ea?ea=268435456+Math.round(2147483648*Math.random()):ea++,"0x"+ea.toString(16)
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
 */}const sa="RestConnection",ra={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class ia{get Bo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Lo=e+"://"+t.host,this.ko=`projects/${n}/databases/${s}`,this.qo=this.databaseId.database===hs?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Qo(t,e,n,s,r){const i=na(),o=this.$o(t,e.toUriEncodedString());Ge(sa,`Sending RPC '${t}' ${i}:`,o,n);const a={"google-cloud-resource-prefix":this.ko,"x-goog-request-params":this.qo};return this.Uo(a,s,r),this.Ko(t,o,a,n).then(e=>(Ge(sa,`Received RPC '${t}' ${i}: `,e),e),e=>{throw Qe(sa,`RPC '${t}' ${i} failed with error: `,e,"url: ",o,"request:",n),e})}Wo(t,e,n,s,r,i){return this.Qo(t,e,n,s,r)}Uo(t,e,n){t["X-Goog-Api-Client"]="gl-js/ fire/"+qe,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((e,n)=>t[n]=e),n&&n.headers.forEach((e,n)=>t[n]=e)}$o(t,e){const n=ra[t];return`${this.Lo}/v1/${e}:${n}`}terminate(){}}
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
 */class oa{constructor(t){this.Go=t.Go,this.zo=t.zo}jo(t){this.Ho=t}Jo(t){this.Yo=t}Zo(t){this.Xo=t}onMessage(t){this.e_=t}close(){this.zo()}send(t){this.Go(t)}t_(){this.Ho()}n_(){this.Yo()}r_(t){this.Xo(t)}i_(t){this.e_(t)}}
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
 */const aa="WebChannelConnection";class ca extends ia{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Ko(t,e,n,s){const r=na();return new Promise((i,o)=>{const a=new xe;a.setWithCredentials(!0),a.listenOnce(Le.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case Oe.NO_ERROR:const e=a.getResponseJson();Ge(aa,`XHR for RPC '${t}' ${r} received:`,JSON.stringify(e)),i(e);break;case Oe.TIMEOUT:Ge(aa,`RPC '${t}' ${r} timed out`),o(new en(tn.DEADLINE_EXCEEDED,"Request time out"));break;case Oe.HTTP_ERROR:const n=a.getStatus();if(Ge(aa,`RPC '${t}' ${r} failed with status:`,n,"response text:",a.getResponseText()),n>0){let t=a.getResponseJson();Array.isArray(t)&&(t=t[0]);const e=null==t?void 0:t.error;if(e&&e.status&&e.message){const t=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(tn).indexOf(e)>=0?e:tn.UNKNOWN}(e.status);o(new en(t,e.message))}else o(new en(tn.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new en(tn.UNAVAILABLE,"Connection failed."));break;default:Ye(9055,{s_:t,streamId:r,o_:a.getLastErrorCode(),__:a.getLastError()})}}finally{Ge(aa,`RPC '${t}' ${r} completed.`)}});const c=JSON.stringify(s);Ge(aa,`RPC '${t}' ${r} sending request:`,s),a.send(e,"POST",c,n,15)})}a_(t,e,n){const s=na(),r=[this.Lo,"/","google.firestore.v1.Firestore","/",t,"/channel"],i=Fe(),o=Ve(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.Uo(a.initMessageHeaders,e,n),a.encodeInitMessageHeaders=!0;const l=r.join("");Ge(aa,`Creating RPC '${t}' stream ${s}: ${l}`,a);const u=i.createWebChannel(l,a);let h=!1,d=!1;const f=new oa({Go:e=>{d?Ge(aa,`Not sending because RPC '${t}' stream ${s} is closed:`,e):(h||(Ge(aa,`Opening RPC '${t}' stream ${s} transport.`),u.open(),h=!0),Ge(aa,`RPC '${t}' stream ${s} sending:`,e),u.send(e))},zo:()=>u.close()}),p=(t,e,n)=>{t.listen(e,t=>{try{n(t)}catch(e){setTimeout(()=>{throw e},0)}})};return p(u,Re.EventType.OPEN,()=>{d||(Ge(aa,`RPC '${t}' stream ${s} transport opened.`),f.t_())}),p(u,Re.EventType.CLOSE,()=>{d||(d=!0,Ge(aa,`RPC '${t}' stream ${s} transport closed`),f.r_())}),p(u,Re.EventType.ERROR,e=>{d||(d=!0,Qe(aa,`RPC '${t}' stream ${s} transport errored. Name:`,e.name,"Message:",e.message),f.r_(new en(tn.UNAVAILABLE,"The operation could not be completed")))}),p(u,Re.EventType.MESSAGE,e=>{var n;if(!d){const r=e.data[0];Je(!!r,16349);const i=r,o=(null==i?void 0:i.error)||(null===(n=i[0])||void 0===n?void 0:n.error);if(o){Ge(aa,`RPC '${t}' stream ${s} received error:`,o);const e=o.status;let n=function(t){const e=mi[t];if(void 0!==e)return yi(e)}(e),r=o.message;void 0===n&&(n=tn.INTERNAL,r="Unknown error status: "+e+" with message "+o.message),d=!0,f.r_(new en(n,r)),u.close()}else Ge(aa,`RPC '${t}' stream ${s} received:`,r),f.i_(r)}}),p(o,Me.STAT_EVENT,e=>{e.stat===Pe.PROXY?Ge(aa,`RPC '${t}' stream ${s} detected buffering proxy`):e.stat===Pe.NOPROXY&&Ge(aa,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{f.n_()},0),f}}function la(){return"undefined"!=typeof document?document:null}
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
 */function ua(t){return new Pi(t,!0)}
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
 */class ha{constructor(t,e,n=1e3,s=1.5,r=6e4){this.bi=t,this.timerId=e,this.u_=n,this.c_=s,this.l_=r,this.h_=0,this.P_=null,this.T_=Date.now(),this.reset()}reset(){this.h_=0}I_(){this.h_=this.l_}E_(t){this.cancel();const e=Math.floor(this.h_+this.d_()),n=Math.max(0,Date.now()-this.T_),s=Math.max(0,e-n);s>0&&Ge("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.h_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.P_=this.bi.enqueueAfterDelay(this.timerId,s,()=>(this.T_=Date.now(),t())),this.h_*=this.c_,this.h_<this.u_&&(this.h_=this.u_),this.h_>this.l_&&(this.h_=this.l_)}A_(){null!==this.P_&&(this.P_.skipDelay(),this.P_=null)}cancel(){null!==this.P_&&(this.P_.cancel(),this.P_=null)}d_(){return(Math.random()-.5)*this.h_}}
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
 */const da="PersistentStream";class fa{constructor(t,e,n,s,r,i,o,a){this.bi=t,this.R_=n,this.V_=s,this.connection=r,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.m_=0,this.f_=null,this.g_=null,this.stream=null,this.p_=0,this.y_=new ha(t,e)}w_(){return 1===this.state||5===this.state||this.b_()}b_(){return 2===this.state||3===this.state}start(){this.p_=0,4!==this.state?this.auth():this.S_()}async stop(){this.w_()&&await this.close(0)}D_(){this.state=0,this.y_.reset()}v_(){this.b_()&&null===this.f_&&(this.f_=this.bi.enqueueAfterDelay(this.R_,6e4,()=>this.C_()))}F_(t){this.M_(),this.stream.send(t)}async C_(){if(this.b_())return this.close(0)}M_(){this.f_&&(this.f_.cancel(),this.f_=null)}x_(){this.g_&&(this.g_.cancel(),this.g_=null)}async close(t,e){this.M_(),this.x_(),this.y_.cancel(),this.m_++,4!==t?this.y_.reset():e&&e.code===tn.RESOURCE_EXHAUSTED?(He(e.toString()),He("Using maximum backoff delay to prevent overloading the backend."),this.y_.I_()):e&&e.code===tn.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.O_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Zo(e)}O_(){}auth(){this.state=1;const t=this.N_(this.m_),e=this.m_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([t,n])=>{this.m_===e&&this.B_(t,n)},e=>{t(()=>{const t=new en(tn.UNKNOWN,"Fetching auth token failed: "+e.message);return this.L_(t)})})}B_(t,e){const n=this.N_(this.m_);this.stream=this.k_(t,e),this.stream.jo(()=>{n(()=>this.listener.jo())}),this.stream.Jo(()=>{n(()=>(this.state=2,this.g_=this.bi.enqueueAfterDelay(this.V_,1e4,()=>(this.b_()&&(this.state=3),Promise.resolve())),this.listener.Jo()))}),this.stream.Zo(t=>{n(()=>this.L_(t))}),this.stream.onMessage(t=>{n(()=>1==++this.p_?this.q_(t):this.onNext(t))})}S_(){this.state=5,this.y_.E_(async()=>{this.state=0,this.start()})}L_(t){return Ge(da,`close with error: ${t}`),this.stream=null,this.close(4,t)}N_(t){return e=>{this.bi.enqueueAndForget(()=>this.m_===t?e():(Ge(da,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class pa extends fa{constructor(t,e,n,s,r,i){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,i),this.serializer=r}k_(t,e){return this.connection.a_("Listen",t,e)}q_(t){return this.onNext(t)}onNext(t){this.y_.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const r="NO_CHANGE"===(s=e.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===s?1:"REMOVE"===s?2:"CURRENT"===s?3:"RESET"===s?4:Ye(39313,{state:s}),i=e.targetChange.targetIds||[],o=function(t,e){return t.useProto3Json?(Je(void 0===e||"string"==typeof e,58123),Jn.fromBase64String(e||"")):(Je(void 0===e||e instanceof Buffer||e instanceof Uint8Array,16193),Jn.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(t){const e=void 0===t.code?tn.UNKNOWN:yi(t.code);return new en(e,t.message||"")}(a);n=new Ai(r,i,o,c||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=Ki(t,s.document.name),i=Bi(s.document.updateTime),o=s.document.createTime?Bi(s.document.createTime):Tn.min(),a=new Ls({mapValue:{fields:s.document.fields}}),c=Ps.newFoundDocument(r,i,o,a),l=s.targetIds||[],u=s.removedTargetIds||[];n=new Ci(l,u,c.key,c)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=Ki(t,s.document),i=s.readTime?Bi(s.readTime):Tn.min(),o=Ps.newNoDocument(r,i),a=s.removedTargetIds||[];n=new Ci([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=Ki(t,s.document),i=s.removedTargetIds||[];n=new Ci([],i,r,null)}else{if(!("filter"in e))return Ye(11601,{Vt:e});{e.filter;const t=e.filter;t.targetId;const{count:s=0,unchangedNames:r}=t,i=new pi(s,r),o=t.targetId;n=new Ii(o,i)}}var s;return n}(this.serializer,t),n=function(t){if(!("targetChange"in t))return Tn.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?Tn.min():e.readTime?Bi(e.readTime):Tn.min()}(t);return this.listener.Q_(e,n)}U_(t){const e={};e.database=Hi(this.serializer),e.addTarget=function(t,e){let n;const s=e.target;if(n=ar(s)?{documents:Yi(t,s)}:{query:Xi(t,s).gt},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0){n.resumeToken=Fi(t,e.resumeToken);const s=Mi(t,e.expectedCount);null!==s&&(n.expectedCount=s)}else if(e.snapshotVersion.compareTo(Tn.min())>0){n.readTime=Vi(t,e.snapshotVersion.toTimestamp());const s=Mi(t,e.expectedCount);null!==s&&(n.expectedCount=s)}return n}(this.serializer,t);const n=function(t,e){const n=function(t){switch(t){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Ye(28987,{purpose:t})}}(e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,t);n&&(e.labels=n),this.F_(e)}K_(t){const e={};e.database=Hi(this.serializer),e.removeTarget=t,this.F_(e)}}class ma extends fa{constructor(t,e,n,s,r,i){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,i),this.serializer=r}get W_(){return this.p_>0}start(){this.lastStreamToken=void 0,super.start()}O_(){this.W_&&this.G_([])}k_(t,e){return this.connection.a_("Write",t,e)}q_(t){return Je(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Je(!t.writeResults||0===t.writeResults.length,55816),this.listener.z_()}onNext(t){Je(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.y_.reset();const e=function(t,e){return t&&t.length>0?(Je(void 0!==e,14353),t.map(t=>function(t,e){let n=t.updateTime?Bi(t.updateTime):Bi(e);return n.isEqual(Tn.min())&&(n=Bi(e)),new Wr(n,t.transformResults||[])}(t,e))):[]}(t.writeResults,t.commitTime),n=Bi(t.commitTime);return this.listener.j_(n,e)}H_(){const t={};t.database=Hi(this.serializer),this.F_(t)}G_(t){const e={streamToken:this.lastStreamToken,writes:t.map(t=>function(t,e){let n;if(e instanceof ri)n={update:Wi(t,e.key,e.value)};else if(e instanceof li)n={delete:zi(t,e.key)};else if(e instanceof ii)n={update:Wi(t,e.key,e.data),updateMask:oo(e.fieldMask)};else{if(!(e instanceof ui))return Ye(16599,{ft:e.type});n={verify:zi(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(t=>function(t,e){const n=e.transform;if(n instanceof Br)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof jr)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof qr)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Kr)return{fieldPath:e.field.canonicalString(),increment:n.Re};throw Ye(20930,{transform:e.transform})}(0,t))),e.precondition.isNone||(n.currentDocument=(s=t,void 0!==(r=e.precondition).updateTime?{updateTime:Ui(s,r.updateTime)}:void 0!==r.exists?{exists:r.exists}:Ye(27497))),n;var s,r}(this.serializer,t))};this.F_(e)}}
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
 */class ga{}class ya extends ga{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.J_=!1}Y_(){if(this.J_)throw new en(tn.FAILED_PRECONDITION,"The client has already been terminated.")}Qo(t,e,n,s){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection.Qo(t,$i(e,n),s,r,i)).catch(t=>{throw"FirebaseError"===t.name?(t.code===tn.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new en(tn.UNKNOWN,t.toString())})}Wo(t,e,n,s,r){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Wo(t,$i(e,n),s,i,o,r)).catch(t=>{throw"FirebaseError"===t.name?(t.code===tn.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new en(tn.UNKNOWN,t.toString())})}terminate(){this.J_=!0,this.connection.terminate()}}class va{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.Z_=0,this.X_=null,this.ea=!0}ta(){0===this.Z_&&(this.na("Unknown"),this.X_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.X_=null,this.ra("Backend didn't respond within 10 seconds."),this.na("Offline"),Promise.resolve())))}ia(t){"Online"===this.state?this.na("Unknown"):(this.Z_++,this.Z_>=1&&(this.sa(),this.ra(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.na("Offline")))}set(t){this.sa(),this.Z_=0,"Online"===t&&(this.ea=!1),this.na(t)}na(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ra(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ea?(He(e),this.ea=!1):Ge("OnlineStateTracker",e)}sa(){null!==this.X_&&(this.X_.cancel(),this.X_=null)}}
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
 */const wa="RemoteStore";class ba{constructor(t,e,n,s,r){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.oa=[],this._a=new Map,this.aa=new Set,this.ua=[],this.ca=r,this.ca.vo(t=>{n.enqueueAndForget(async()=>{Da(this)&&(Ge(wa,"Restarting streams for network reachability change."),await async function(t){const e=Ze(t);e.aa.add(4),await _a(e),e.la.set("Unknown"),e.aa.delete(4),await Ea(e)}(this))})}),this.la=new va(n,s)}}async function Ea(t){if(Da(t))for(const e of t.ua)await e(!0)}async function _a(t){for(const e of t.ua)await e(!1)}function Ta(t,e){const n=Ze(t);n._a.has(e.targetId)||(n._a.set(e.targetId,e),ka(n)?Aa(n):Ha(n).b_()&&Ca(n,e))}function Sa(t,e){const n=Ze(t),s=Ha(n);n._a.delete(e),s.b_()&&Ia(n,e),0===n._a.size&&(s.b_()?s.v_():Da(n)&&n.la.set("Unknown"))}function Ca(t,e){if(t.ha.Ke(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Tn.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Ha(t).U_(e)}function Ia(t,e){t.ha.Ke(e),Ha(t).K_(e)}function Aa(t){t.ha=new Di({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),Rt:e=>t._a.get(e)||null,Pt:()=>t.datastore.serializer.databaseId}),Ha(t).start(),t.la.ta()}function ka(t){return Da(t)&&!Ha(t).w_()&&t._a.size>0}function Da(t){return 0===Ze(t).aa.size}function Na(t){t.ha=void 0}async function xa(t){t.la.set("Online")}async function Ra(t){t._a.forEach((e,n)=>{Ca(t,e)})}async function La(t,e){Na(t),ka(t)?(t.la.ia(e),Aa(t)):t.la.set("Unknown")}async function Oa(t,e,n){if(t.la.set("Online"),e instanceof Ai&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const s of e.targetIds)t._a.has(s)&&(await t.remoteSyncer.rejectListen(s,n),t._a.delete(s),t.ha.removeTarget(s))}(t,e)}catch(s){Ge(wa,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await Pa(t,s)}else if(e instanceof Ci?t.ha.Xe(e):e instanceof Ii?t.ha.ot(e):t.ha.nt(e),!n.isEqual(Tn.min()))try{const e=await Ko(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.ha.It(e);return n.targetChanges.forEach((n,s)=>{if(n.resumeToken.approximateByteSize()>0){const r=t._a.get(s);r&&t._a.set(s,r.withResumeToken(n.resumeToken,e))}}),n.targetMismatches.forEach((e,n)=>{const s=t._a.get(e);if(!s)return;t._a.set(e,s.withResumeToken(Jn.EMPTY_BYTE_STRING,s.snapshotVersion)),Ia(t,e);const r=new co(s.target,e,n,s.sequenceNumber);Ca(t,r)}),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(r){Ge(wa,"Failed to raise snapshot:",r),await Pa(t,r)}}async function Pa(t,e,n){if(!Mn(e))throw e;t.aa.add(1),await _a(t),t.la.set("Offline"),n||(n=()=>Ko(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{Ge(wa,"Retrying IndexedDB access"),await n(),t.aa.delete(1),await Ea(t)})}function Ma(t,e){return e().catch(n=>Pa(t,n,e))}async function Va(t){const e=Ze(t),n=Qa(e);let s=e.oa.length>0?e.oa[e.oa.length-1].batchId:-1;for(;Fa(e);)try{const t=await Ho(e.localStore,s);if(null===t){0===e.oa.length&&n.v_();break}s=t.batchId,Ua(e,t)}catch(r){await Pa(e,r)}Ba(e)&&ja(e)}function Fa(t){return Da(t)&&t.oa.length<10}function Ua(t,e){t.oa.push(e);const n=Qa(t);n.b_()&&n.W_&&n.G_(e.mutations)}function Ba(t){return Da(t)&&!Qa(t).w_()&&t.oa.length>0}function ja(t){Qa(t).start()}async function $a(t){Qa(t).H_()}async function qa(t){const e=Qa(t);for(const n of t.oa)e.G_(n.mutations)}async function za(t,e,n){const s=t.oa.shift(),r=di.from(s,e,n);await Ma(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await Va(t)}async function Ka(t,e){e&&Qa(t).W_&&await async function(t,e){if(function(t){switch(t){case tn.OK:return Ye(64938);case tn.CANCELLED:case tn.UNKNOWN:case tn.DEADLINE_EXCEEDED:case tn.RESOURCE_EXHAUSTED:case tn.INTERNAL:case tn.UNAVAILABLE:case tn.UNAUTHENTICATED:return!1;case tn.INVALID_ARGUMENT:case tn.NOT_FOUND:case tn.ALREADY_EXISTS:case tn.PERMISSION_DENIED:case tn.FAILED_PRECONDITION:case tn.ABORTED:case tn.OUT_OF_RANGE:case tn.UNIMPLEMENTED:case tn.DATA_LOSS:return!0;default:return Ye(15467,{code:t})}}(n=e.code)&&n!==tn.ABORTED){const n=t.oa.shift();Qa(t).D_(),await Ma(t,()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e)),await Va(t)}var n}(t,e),Ba(t)&&ja(t)}async function Ga(t,e){const n=Ze(t);n.asyncQueue.verifyOperationInProgress(),Ge(wa,"RemoteStore received new credentials");const s=Da(n);n.aa.add(3),await _a(n),s&&n.la.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.aa.delete(3),await Ea(n)}function Ha(t){return t.Pa||(t.Pa=function(t,e,n){const s=Ze(t);return s.Y_(),new pa(e,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,n)}(t.datastore,t.asyncQueue,{jo:xa.bind(null,t),Jo:Ra.bind(null,t),Zo:La.bind(null,t),Q_:Oa.bind(null,t)}),t.ua.push(async e=>{e?(t.Pa.D_(),ka(t)?Aa(t):t.la.set("Unknown")):(await t.Pa.stop(),Na(t))})),t.Pa}function Qa(t){return t.Ta||(t.Ta=function(t,e,n){const s=Ze(t);return s.Y_(),new ma(e,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,n)}(t.datastore,t.asyncQueue,{jo:()=>Promise.resolve(),Jo:$a.bind(null,t),Zo:Ka.bind(null,t),z_:qa.bind(null,t),j_:za.bind(null,t)}),t.ua.push(async e=>{e?(t.Ta.D_(),await Va(t)):(await t.Ta.stop(),t.oa.length>0&&(Ge(wa,`Stopping write stream with ${t.oa.length} pending writes`),t.oa=[]))})),t.Ta
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
 */}class Wa{constructor(t,e,n,s,r){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=r,this.deferred=new nn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(t=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,r){const i=Date.now()+n,o=new Wa(t,e,i,s,r);return o.start(n),o}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new en(tn.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ya(t,e){if(He("AsyncQueue",`${e}: ${t}`),Mn(t))return new en(tn.UNAVAILABLE,`${e}: ${t}`);throw t}
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
 */class Xa{static emptySet(t){return new Xa(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||Dn.comparator(e.key,n.key):(t,e)=>Dn.comparator(t.key,e.key),this.keyedMap=Sr(),this.sortedSet=new Kn(this.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Xa))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,s=n.getNext().key;if(!t.isEqual(s))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new Xa;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
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
 */class Ja{constructor(){this.Ia=new Kn(Dn.comparator)}track(t){const e=t.doc.key,n=this.Ia.get(e);n?0!==t.type&&3===n.type?this.Ia=this.Ia.insert(e,t):3===t.type&&1!==n.type?this.Ia=this.Ia.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.Ia=this.Ia.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.Ia=this.Ia.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.Ia=this.Ia.remove(e):1===t.type&&2===n.type?this.Ia=this.Ia.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.Ia=this.Ia.insert(e,{type:2,doc:t.doc}):Ye(63341,{Vt:t,Ea:n}):this.Ia=this.Ia.insert(e,t)}da(){const t=[];return this.Ia.inorderTraversal((e,n)=>{t.push(n)}),t}}class Za{constructor(t,e,n,s,r,i,o,a,c){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=r,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(t,e,n,s,r){const i=[];return e.forEach(t=>{i.push({type:0,doc:t})}),new Za(t,e,Xa.emptySet(e),i,n,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&pr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}
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
 */class tc{constructor(){this.Aa=void 0,this.Ra=[]}Va(){return this.Ra.some(t=>t.ma())}}class ec{constructor(){this.queries=nc(),this.onlineState="Unknown",this.fa=new Set}terminate(){!function(t,e){const n=Ze(t),s=n.queries;n.queries=nc(),s.forEach((t,n)=>{for(const s of n.Ra)s.onError(e)})}(this,new en(tn.ABORTED,"Firestore shutting down"))}}function nc(){return new br(t=>mr(t),pr)}function sc(t,e){const n=Ze(t);let s=!1;for(const r of e){const t=r.query,e=n.queries.get(t);if(e){for(const t of e.Ra)t.pa(r)&&(s=!0);e.Aa=r}}s&&ic(n)}function rc(t,e,n){const s=Ze(t),r=s.queries.get(e);if(r)for(const i of r.Ra)i.onError(n);s.queries.delete(e)}function ic(t){t.fa.forEach(t=>{t.next()})}var oc,ac;(ac=oc||(oc={})).ya="default",ac.Cache="cache";class cc{constructor(t,e,n){this.query=t,this.wa=e,this.ba=!1,this.Sa=null,this.onlineState="Unknown",this.options=n||{}}pa(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new Za(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.ba?this.Da(t)&&(this.wa.next(t),e=!0):this.va(t,this.onlineState)&&(this.Ca(t),e=!0),this.Sa=t,e}onError(t){this.wa.error(t)}ga(t){this.onlineState=t;let e=!1;return this.Sa&&!this.ba&&this.va(this.Sa,t)&&(this.Ca(this.Sa),e=!0),e}va(t,e){if(!t.fromCache)return!0;if(!this.ma())return!0;const n="Offline"!==e;return(!this.options.Fa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||"Offline"===e)}Da(t){if(t.docChanges.length>0)return!0;const e=this.Sa&&this.Sa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}Ca(t){t=Za.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.ba=!0,this.wa.next(t)}ma(){return this.options.source!==oc.Cache}}
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
 */class lc{constructor(t){this.key=t}}class uc{constructor(t){this.key=t}}class hc{constructor(t,e){this.query=t,this.qa=e,this.Qa=null,this.hasCachedResults=!1,this.current=!1,this.$a=xr(),this.mutatedKeys=xr(),this.Ua=vr(t),this.Ka=new Xa(this.Ua)}get Wa(){return this.qa}Ga(t,e){const n=e?e.za:new Ja,s=e?e.Ka:this.Ka;let r=e?e.mutatedKeys:this.mutatedKeys,i=s,o=!1;const a="F"===this.query.limitType&&s.size===this.query.limit?s.last():null,c="L"===this.query.limitType&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((t,e)=>{const l=s.get(t),u=yr(this.query,e)?e:null,h=!!l&&this.mutatedKeys.has(l.key),d=!!u&&(u.hasLocalMutations||this.mutatedKeys.has(u.key)&&u.hasCommittedMutations);let f=!1;l&&u?l.data.isEqual(u.data)?h!==d&&(n.track({type:3,doc:u}),f=!0):this.ja(l,u)||(n.track({type:2,doc:u}),f=!0,(a&&this.Ua(u,a)>0||c&&this.Ua(u,c)<0)&&(o=!0)):!l&&u?(n.track({type:0,doc:u}),f=!0):l&&!u&&(n.track({type:1,doc:l}),f=!0,(a||c)&&(o=!0)),f&&(u?(i=i.add(u),r=d?r.add(t):r.delete(t)):(i=i.delete(t),r=r.delete(t)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const t="F"===this.query.limitType?i.last():i.first();i=i.delete(t.key),r=r.delete(t.key),n.track({type:1,doc:t})}return{Ka:i,za:n,ys:o,mutatedKeys:r}}ja(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const r=this.Ka;this.Ka=t.Ka,this.mutatedKeys=t.mutatedKeys;const i=t.za.da();i.sort((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Ye(20277,{Vt:t})}};return n(t)-n(e)}(t.type,e.type)||this.Ua(t.doc,e.doc)),this.Ha(n),s=null!=s&&s;const o=e&&!s?this.Ja():[],a=0===this.$a.size&&this.current&&!s?1:0,c=a!==this.Qa;return this.Qa=a,0!==i.length||c?{snapshot:new Za(this.query,t.Ka,r,i,t.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),Ya:o}:{Ya:o}}ga(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({Ka:this.Ka,za:new Ja,mutatedKeys:this.mutatedKeys,ys:!1},!1)):{Ya:[]}}Za(t){return!this.qa.has(t)&&!!this.Ka.has(t)&&!this.Ka.get(t).hasLocalMutations}Ha(t){t&&(t.addedDocuments.forEach(t=>this.qa=this.qa.add(t)),t.modifiedDocuments.forEach(t=>{}),t.removedDocuments.forEach(t=>this.qa=this.qa.delete(t)),this.current=t.current)}Ja(){if(!this.current)return[];const t=this.$a;this.$a=xr(),this.Ka.forEach(t=>{this.Za(t.key)&&(this.$a=this.$a.add(t.key))});const e=[];return t.forEach(t=>{this.$a.has(t)||e.push(new uc(t))}),this.$a.forEach(n=>{t.has(n)||e.push(new lc(n))}),e}Xa(t){this.qa=t.Ns,this.$a=xr();const e=this.Ga(t.documents);return this.applyChanges(e,!0)}eu(){return Za.fromInitialDocuments(this.query,this.Ka,this.mutatedKeys,0===this.Qa,this.hasCachedResults)}}const dc="SyncEngine";class fc{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class pc{constructor(t){this.key=t,this.tu=!1}}class mc{constructor(t,e,n,s,r,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=i,this.nu={},this.ru=new br(t=>mr(t),pr),this.iu=new Map,this.su=new Set,this.ou=new Kn(Dn.comparator),this._u=new Map,this.au=new Do,this.uu={},this.cu=new Map,this.lu=yo.ir(),this.onlineState="Unknown",this.hu=void 0}get isPrimaryClient(){return!0===this.hu}}async function gc(t,e,n=!0){const s=Vc(t);let r;const i=s.ru.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.eu()):r=await vc(s,e,n,!0),r}async function yc(t,e){const n=Vc(t);await vc(n,e,!0,!1)}async function vc(t,e,n,s){const r=await function(t,e){const n=Ze(t);return n.persistence.runTransaction("Allocate target","readwrite",t=>{let s;return n.ai.getTargetData(t,e).next(r=>r?(s=r,Pn.resolve(s)):n.ai.allocateTargetId(t).next(r=>(s=new co(e,r,"TargetPurposeListen",t.currentSequenceNumber),n.ai.addTargetData(t,s).next(()=>s))))}).then(t=>{const s=n.Ss.get(t.targetId);return(null===s||t.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ss=n.Ss.insert(t.targetId,t),n.Ds.set(e,t.targetId)),t})}(t.localStore,dr(e)),i=r.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let a;return s&&(a=await async function(t,e,n,s,r){t.Pu=(e,n,s)=>async function(t,e,n,s){let r=e.view.Ga(n);r.ys&&(r=await Wo(t.localStore,e.query,!1).then(({documents:t})=>e.view.Ga(t,r)));const i=s&&s.targetChanges.get(e.targetId),o=s&&null!=s.targetMismatches.get(e.targetId),a=e.view.applyChanges(r,t.isPrimaryClient,i,o);return xc(t,e.targetId,a.Ya),a.snapshot}(t,e,n,s);const i=await Wo(t.localStore,e,!0),o=new hc(e,i.Ns),a=o.Ga(i.documents),c=Si.createSynthesizedTargetChangeForCurrentChange(n,s&&"Offline"!==t.onlineState,r),l=o.applyChanges(a,t.isPrimaryClient,c);xc(t,n,l.Ya);const u=new fc(e,n,o);return t.ru.set(e,u),t.iu.has(n)?t.iu.get(n).push(e):t.iu.set(n,[e]),l.snapshot}(t,e,i,"current"===o,r.resumeToken)),t.isPrimaryClient&&n&&Ta(t.remoteStore,r),a}async function wc(t,e,n){const s=Ze(t),r=s.ru.get(e),i=s.iu.get(r.targetId);if(i.length>1)return s.iu.set(r.targetId,i.filter(t=>!pr(t,e))),void s.ru.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await Qo(s.localStore,r.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(r.targetId),n&&Sa(s.remoteStore,r.targetId),Dc(s,r.targetId)}).catch(On)):(Dc(s,r.targetId),await Qo(s.localStore,r.targetId,!0))}async function bc(t,e){const n=Ze(t),s=n.ru.get(e),r=n.iu.get(s.targetId);n.isPrimaryClient&&1===r.length&&(n.sharedClientState.removeLocalQueryTarget(s.targetId),Sa(n.remoteStore,s.targetId))}async function Ec(t,e,n){const s=function(t){const e=Ze(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Cc.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Ic.bind(null,e),e}(t);try{const t=await function(t,e){const n=Ze(t),s=_n.now(),r=e.reduce((t,e)=>t.add(e.key),xr());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",t=>{let a=_r(),c=xr();return n.Cs.getEntries(t,r).next(t=>{a=t,a.forEach((t,e)=>{e.isValidDocument()||(c=c.add(t))})}).next(()=>n.localDocuments.getOverlayedDocuments(t,a)).next(r=>{i=r;const o=[];for(const t of e){const e=ni(t,i.get(t.key).overlayedDocument);null!=e&&o.push(new ii(t.key,e,Os(e.value.mapValue),Yr.exists(!0)))}return n.mutationQueue.addMutationBatch(t,s,o,e)}).next(e=>{o=e;const s=e.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(t,e.batchId,s)})}).then(()=>({batchId:o.batchId,changes:Cr(i)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let s=t.uu[t.currentUser.toKey()];s||(s=new Kn(mn)),s=s.insert(e,n),t.uu[t.currentUser.toKey()]=s}(s,t.batchId,n),await Oc(s,t.changes),await Va(s.remoteStore)}catch(r){const t=Ya(r,"Failed to persist write");n.reject(t)}}async function _c(t,e){const n=Ze(t);try{const t=await Go(n.localStore,e);e.targetChanges.forEach((t,e)=>{const s=n._u.get(e);s&&(Je(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1,22616),t.addedDocuments.size>0?s.tu=!0:t.modifiedDocuments.size>0?Je(s.tu,14607):t.removedDocuments.size>0&&(Je(s.tu,42227),s.tu=!1))}),await Oc(n,t,e)}catch(s){await On(s)}}function Tc(t,e,n){const s=Ze(t);if(s.isPrimaryClient&&0===n||!s.isPrimaryClient&&1===n){const t=[];s.ru.forEach((n,s)=>{const r=s.view.ga(e);r.snapshot&&t.push(r.snapshot)}),function(t,e){const n=Ze(t);n.onlineState=e;let s=!1;n.queries.forEach((t,n)=>{for(const r of n.Ra)r.ga(e)&&(s=!0)}),s&&ic(n)}(s.eventManager,e),t.length&&s.nu.Q_(t),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function Sc(t,e,n){const s=Ze(t);s.sharedClientState.updateQueryState(e,"rejected",n);const r=s._u.get(e),i=r&&r.key;if(i){let t=new Kn(Dn.comparator);t=t.insert(i,Ps.newNoDocument(i,Tn.min()));const n=xr().add(i),r=new Ti(Tn.min(),new Map,new Kn(mn),t,n);await _c(s,r),s.ou=s.ou.remove(i),s._u.delete(e),Lc(s)}else await Qo(s.localStore,e,!1).then(()=>Dc(s,e,n)).catch(On)}async function Cc(t,e){const n=Ze(t),s=e.batch.batchId;try{const t=await function(t,e){const n=Ze(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",t=>{const s=e.batch.keys(),r=n.Cs.newChangeBuffer({trackRemovals:!0});return function(t,e,n,s){const r=n.batch,i=r.keys();let o=Pn.resolve();return i.forEach(t=>{o=o.next(()=>s.getEntry(e,t)).next(e=>{const i=n.docVersions.get(t);Je(null!==i,48541),e.version.compareTo(i)<0&&(r.applyToRemoteDocument(e,n),e.isValidDocument()&&(e.setReadTime(n.commitVersion),s.addEntry(e)))})}),o.next(()=>t.mutationQueue.removeMutationBatch(e,r))}(n,t,e,r).next(()=>r.apply(t)).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,function(t){let e=xr();for(let n=0;n<t.mutationResults.length;++n)t.mutationResults[n].transformResults.length>0&&(e=e.add(t.batch.mutations[n].key));return e}(e))).next(()=>n.localDocuments.getDocuments(t,s))})}(n.localStore,e);kc(n,s,null),Ac(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Oc(n,t)}catch(r){await On(r)}}async function Ic(t,e,n){const s=Ze(t);try{const t=await function(t,e){const n=Ze(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",t=>{let s;return n.mutationQueue.lookupMutationBatch(t,e).next(e=>(Je(null!==e,37113),s=e.keys(),n.mutationQueue.removeMutationBatch(t,e))).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,s,e)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,s)).next(()=>n.localDocuments.getDocuments(t,s))})}(s.localStore,e);kc(s,e,n),Ac(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await Oc(s,t)}catch(r){await On(r)}}function Ac(t,e){(t.cu.get(e)||[]).forEach(t=>{t.resolve()}),t.cu.delete(e)}function kc(t,e,n){const s=Ze(t);let r=s.uu[s.currentUser.toKey()];if(r){const t=r.get(e);t&&(n?t.reject(n):t.resolve(),r=r.remove(e)),s.uu[s.currentUser.toKey()]=r}}function Dc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.iu.get(e))t.ru.delete(s),n&&t.nu.Tu(s,n);t.iu.delete(e),t.isPrimaryClient&&t.au.Ur(e).forEach(e=>{t.au.containsKey(e)||Nc(t,e)})}function Nc(t,e){t.su.delete(e.path.canonicalString());const n=t.ou.get(e);null!==n&&(Sa(t.remoteStore,n),t.ou=t.ou.remove(e),t._u.delete(n),Lc(t))}function xc(t,e,n){for(const s of n)s instanceof lc?(t.au.addReference(s.key,e),Rc(t,s)):s instanceof uc?(Ge(dc,"Document no longer in limbo: "+s.key),t.au.removeReference(s.key,e),t.au.containsKey(s.key)||Nc(t,s.key)):Ye(19791,{Iu:s})}function Rc(t,e){const n=e.key,s=n.path.canonicalString();t.ou.get(n)||t.su.has(s)||(Ge(dc,"New document in limbo: "+n),t.su.add(s),Lc(t))}function Lc(t){for(;t.su.size>0&&t.ou.size<t.maxConcurrentLimboResolutions;){const e=t.su.values().next().value;t.su.delete(e);const n=new Dn(In.fromString(e)),s=t.lu.next();t._u.set(s,new pc(n)),t.ou=t.ou.insert(n,s),Ta(t.remoteStore,new co(dr(lr(n.path)),s,"TargetPurposeLimboResolution",Vn.le))}}async function Oc(t,e,n){const s=Ze(t),r=[],i=[],o=[];s.ru.isEmpty()||(s.ru.forEach((t,a)=>{o.push(s.Pu(a,e,n).then(t=>{var e;if((t||n)&&s.isPrimaryClient){const r=t?!t.fromCache:null===(e=null==n?void 0:n.targetChanges.get(a.targetId))||void 0===e?void 0:e.current;s.sharedClientState.updateQueryState(a.targetId,r?"current":"not-current")}if(t){r.push(t);const e=Uo.Ps(a.targetId,t);i.push(e)}}))}),await Promise.all(o),s.nu.Q_(r),await async function(t,e){const n=Ze(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",t=>Pn.forEach(e,e=>Pn.forEach(e.ls,s=>n.persistence.referenceDelegate.addReference(t,e.targetId,s)).next(()=>Pn.forEach(e.hs,s=>n.persistence.referenceDelegate.removeReference(t,e.targetId,s)))))}catch(s){if(!Mn(s))throw s;Ge($o,"Failed to update sequence numbers: "+s)}for(const r of e){const t=r.targetId;if(!r.fromCache){const e=n.Ss.get(t),s=e.snapshotVersion,r=e.withLastLimboFreeSnapshotVersion(s);n.Ss=n.Ss.insert(t,r)}}}(s.localStore,i))}async function Pc(t,e){const n=Ze(t);if(!n.currentUser.isEqual(e)){Ge(dc,"User change. New user:",e.toKey());const t=await zo(n.localStore,e);n.currentUser=e,r="'waitForPendingWrites' promise is rejected due to a user change.",(s=n).cu.forEach(t=>{t.forEach(t=>{t.reject(new en(tn.CANCELLED,r))})}),s.cu.clear(),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await Oc(n,t.Ms)}var s,r}function Mc(t,e){const n=Ze(t),s=n._u.get(e);if(s&&s.tu)return xr().add(s.key);{let t=xr();const s=n.iu.get(e);if(!s)return t;for(const e of s){const s=n.ru.get(e);t=t.unionWith(s.view.Wa)}return t}}function Vc(t){const e=Ze(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=_c.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Mc.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Sc.bind(null,e),e.nu.Q_=sc.bind(null,e.eventManager),e.nu.Tu=rc.bind(null,e.eventManager),e}class Fc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=ua(t.databaseInfo.databaseId),this.sharedClientState=this.Au(t),this.persistence=this.Ru(t),await this.persistence.start(),this.localStore=this.Vu(t),this.gcScheduler=this.mu(t,this.localStore),this.indexBackfillerScheduler=this.fu(t,this.localStore)}mu(t,e){return null}fu(t,e){return null}Vu(t){return function(t,e,n,s){return new qo(t,e,n,s)}(this.persistence,new jo,t.initialUser,this.serializer)}Ru(t){return new Po(Vo.Ei,this.serializer)}Au(t){return new Xo}async terminate(){var t,e;null===(t=this.gcScheduler)||void 0===t||t.stop(),null===(e=this.indexBackfillerScheduler)||void 0===e||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Fc.provider={build:()=>new Fc};class Uc extends Fc{constructor(t){super(),this.cacheSizeBytes=t}mu(t,e){Je(this.persistence.referenceDelegate instanceof Fo,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Eo(n,t.asyncQueue,e)}Ru(t){const e=void 0!==this.cacheSizeBytes?go.withCacheSize(this.cacheSizeBytes):go.DEFAULT;return new Po(t=>Fo.Ei(t,e),this.serializer)}}class Bc{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>Tc(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=Pc.bind(null,this.syncEngine),await async function(t,e){const n=Ze(t);e?(n.aa.delete(2),await Ea(n)):e||(n.aa.add(2),await _a(n),n.la.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new ec}createDatastore(t){const e=ua(t.databaseInfo.databaseId),n=(s=t.databaseInfo,new ca(s));var s;return function(t,e,n,s){return new ya(t,e,n,s)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,s=t.asyncQueue,r=t=>Tc(this.syncEngine,t,0),i=ta.C()?new ta:new Jo,new ba(e,n,s,r,i);var e,n,s,r,i}createSyncEngine(t,e){return function(t,e,n,s,r,i,o){const a=new mc(t,e,n,s,r,i);return o&&(a.hu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(t){const e=Ze(t);Ge(wa,"RemoteStore shutting down."),e.aa.add(5),await _a(e),e.ca.shutdown(),e.la.set("Unknown")}(this.remoteStore),null===(t=this.datastore)||void 0===t||t.terminate(),null===(e=this.eventManager)||void 0===e||e.terminate()}}Bc.provider={build:()=>new Bc};
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
class jc{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.pu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.pu(this.observer.error,t):He("Uncaught Error in snapshot listener:",t.toString()))}yu(){this.muted=!0}pu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}
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
 */const $c="FirestoreClient";class qc{constructor(t,e,n,s,r){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=$e.UNAUTHENTICATED,this.clientId=pn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(n,async t=>{Ge($c,"Received user=",t.uid),await this.authCredentialListener(t),this.user=t}),this.appCheckCredentials.start(n,t=>(Ge($c,"Received new app check token=",t),this.appCheckCredentialListener(t,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new nn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Ya(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function zc(t,e){t.asyncQueue.verifyOperationInProgress(),Ge($c,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async t=>{s.isEqual(t)||(await zo(e.localStore,t),s=t)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Kc(t,e){t.asyncQueue.verifyOperationInProgress();const n=await async function(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){Ge($c,"Using user provided OfflineComponentProvider");try{await zc(t,t._uninitializedComponentsProvider._offline)}catch(e){const r=e;if(!("FirebaseError"===(n=r).name?n.code===tn.FAILED_PRECONDITION||n.code===tn.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&n instanceof DOMException)||22===n.code||20===n.code||11===n.code))throw r;Qe("Error using user provided cache. Falling back to memory cache: "+r),await zc(t,new Fc)}}else Ge($c,"Using default OfflineComponentProvider"),await zc(t,new Uc(void 0));var n;return t._offlineComponents}(t);Ge($c,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(t=>Ga(e.remoteStore,t)),t.setAppCheckTokenChangeListener((t,n)=>Ga(e.remoteStore,n)),t._onlineComponents=e}async function Gc(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(Ge($c,"Using user provided OnlineComponentProvider"),await Kc(t,t._uninitializedComponentsProvider._online)):(Ge($c,"Using default OnlineComponentProvider"),await Kc(t,new Bc))),t._onlineComponents}async function Hc(t){const e=await Gc(t),n=e.eventManager;return n.onListen=gc.bind(null,e.syncEngine),n.onUnlisten=wc.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=yc.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=bc.bind(null,e.syncEngine),n}function Qc(t,e,n={}){const s=new nn;return t.asyncQueue.enqueueAndForget(async()=>function(t,e,n,s,r){const i=new jc({next:a=>{i.yu(),e.enqueueAndForget(()=>async function(t,e){const n=Ze(t),s=e.query;let r=3;const i=n.queries.get(s);if(i){const t=i.Ra.indexOf(e);t>=0&&(i.Ra.splice(t,1),0===i.Ra.length?r=e.ma()?0:1:!i.Va()&&e.ma()&&(r=2))}switch(r){case 0:return n.queries.delete(s),n.onUnlisten(s,!0);case 1:return n.queries.delete(s),n.onUnlisten(s,!1);case 2:return n.onLastRemoteStoreUnlisten(s);default:return}}(t,o));const c=a.docs.has(n);!c&&a.fromCache?r.reject(new en(tn.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&s&&"server"===s.source?r.reject(new en(tn.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):r.resolve(a)},error:t=>r.reject(t)}),o=new cc(lr(n.path),i,{includeMetadataChanges:!0,Fa:!0});return async function(e,n){const s=Ze(e);let r=3;const i=n.query;let o=s.queries.get(i);o?!o.Va()&&n.ma()&&(r=2):(o=new tc,r=n.ma()?0:1);try{switch(r){case 0:o.Aa=await s.onListen(i,!0);break;case 1:o.Aa=await s.onListen(i,!1);break;case 2:await s.onFirstRemoteStoreListen(i)}}catch(t){const s=Ya(t,`Initialization of query '${gr(n.query)}' failed`);return void n.onError(s)}s.queries.set(i,o),o.Ra.push(n),n.ga(s.onlineState),o.Aa&&n.pa(o.Aa)&&ic(s)}(t,o)}(await Hc(t),t.asyncQueue,e,n,s)),s.promise
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
 */}function Wc(t){const e={};return void 0!==t.timeoutSeconds&&(e.timeoutSeconds=t.timeoutSeconds),e
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
 */}const Yc=new Map;
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
 */function Xc(t){if(!Dn.isDocumentKey(t))throw new en(tn.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Jc(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const n=(e=t).constructor?e.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var e;return"function"==typeof t?"a function":Ye(12329,{type:typeof t})}function Zc(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new en(tn.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Jc(t);throw new en(tn.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
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
 */const tl="firestore.googleapis.com",el=!0;class nl{constructor(t){var e,n;if(void 0===t.host){if(void 0!==t.ssl)throw new en(tn.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=tl,this.ssl=el}else this.host=t.host,this.ssl=null!==(e=t.ssl)&&void 0!==e?e:el;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,void 0===t.cacheSizeBytes)this.cacheSizeBytes=mo;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new en(tn.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}(function(t,e,n,s){if(!0===e&&!0===s)throw new en(tn.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)})("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===t.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Wc(null!==(n=t.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(t){if(void 0!==t.timeoutSeconds){if(isNaN(t.timeoutSeconds))throw new en(tn.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (must not be NaN)`);if(t.timeoutSeconds<5)throw new en(tn.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (minimum allowed value is 5)`);if(t.timeoutSeconds>30)throw new en(tn.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(e=this.experimentalLongPollingOptions,n=t.experimentalLongPollingOptions,e.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams;var e,n}}class sl{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new nl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new en(tn.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new en(tn.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new nl(t),this._emulatorOptions=t.emulatorOptions||{},void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new rn;switch(t.type){case"firstParty":return new ln(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new en(tn.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Yc.get(t);e&&(Ge("ComponentProvider","Removing Datastore"),Yc.delete(t),e.terminate())}(this),Promise.resolve()}}function rl(t,e,n,s={}){var r;const i=(t=Zc(t,sl))._getSettings(),o=Object.assign(Object.assign({},i),{emulatorOptions:t._getEmulatorOptions()}),a=`${e}:${n}`;i.host!==tl&&i.host!==a&&Qe("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c=Object.assign(Object.assign({},i),{host:a,ssl:!1,emulatorOptions:s});if(!et(c,o)&&(t._setSettings(c),s.mockUserToken)){let e,n;if("string"==typeof s.mockUserToken)e=s.mockUserToken,n=$e.MOCK_USER;else{e=function(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const i=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[z(JSON.stringify({alg:"none",type:"JWT"})),z(JSON.stringify(i)),""].join(".")}
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
 */(s.mockUserToken,null===(r=t._app)||void 0===r?void 0:r.options.projectId);const i=s.mockUserToken.sub||s.mockUserToken.user_id;if(!i)throw new en(tn.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new $e(i)}t._authCredentials=new on(new sn(e,n))}}
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
 */class il{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new il(this.firestore,t,this._query)}}class ol{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new al(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ol(this.firestore,t,this._key)}}class al extends il{constructor(t,e,n){super(t,e,lr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ol(this.firestore,null,new Dn(t))}withConverter(t){return new al(this.firestore,t,this._path)}}function cl(t,e,...n){if(t=st(t),1===arguments.length&&(e=pn.newId()),function(t,e,n){if(!n)throw new en(tn.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}("doc","path",e),t instanceof sl){const s=In.fromString(e,...n);return Xc(s),new ol(t,null,new Dn(s))}{if(!(t instanceof ol||t instanceof al))throw new en(tn.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(In.fromString(e,...n));return Xc(s),new ol(t.firestore,t instanceof al?t.converter:null,new Dn(s))}}
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
 */const ll="AsyncQueue";class ul{constructor(t=Promise.resolve()){this.Qu=[],this.$u=!1,this.Uu=[],this.Ku=null,this.Wu=!1,this.Gu=!1,this.zu=[],this.y_=new ha(this,"async_queue_retry"),this.ju=()=>{const t=la();t&&Ge(ll,"Visibility state changed to "+t.visibilityState),this.y_.A_()},this.Hu=t;const e=la();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.ju)}get isShuttingDown(){return this.$u}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Ju(),this.Yu(t)}enterRestrictedMode(t){if(!this.$u){this.$u=!0,this.Gu=t||!1;const e=la();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.ju)}}enqueue(t){if(this.Ju(),this.$u)return new Promise(()=>{});const e=new nn;return this.Yu(()=>this.$u&&this.Gu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Qu.push(t),this.Zu()))}async Zu(){if(0!==this.Qu.length){try{await this.Qu[0](),this.Qu.shift(),this.y_.reset()}catch(t){if(!Mn(t))throw t;Ge(ll,"Operation failed with retryable error: "+t)}this.Qu.length>0&&this.y_.E_(()=>this.Zu())}}Yu(t){const e=this.Hu.then(()=>(this.Wu=!0,t().catch(t=>{throw this.Ku=t,this.Wu=!1,He("INTERNAL UNHANDLED ERROR: ",hl(t)),t}).then(t=>(this.Wu=!1,t))));return this.Hu=e,e}enqueueAfterDelay(t,e,n){this.Ju(),this.zu.indexOf(t)>-1&&(e=0);const s=Wa.createAndSchedule(this,t,e,n,t=>this.Xu(t));return this.Uu.push(s),s}Ju(){this.Ku&&Ye(47125,{ec:hl(this.Ku)})}verifyOperationInProgress(){}async tc(){let t;do{t=this.Hu,await t}while(t!==this.Hu)}nc(t){for(const e of this.Uu)if(e.timerId===t)return!0;return!1}rc(t){return this.tc().then(()=>{this.Uu.sort((t,e)=>t.targetTimeMs-e.targetTimeMs);for(const e of this.Uu)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.tc()})}sc(t){this.zu.push(t)}Xu(t){const e=this.Uu.indexOf(t);this.Uu.splice(e,1)}}function hl(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}class dl extends sl{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new ul,this._persistenceKey=(null==s?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new ul(t),this._firestoreClient=void 0,await t}}}function fl(t){if(t._terminated)throw new en(tn.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||function(t){var e,n,s;const r=t._freezeSettings(),i=(o=t._databaseId,a=(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",c=t._persistenceKey,l=r,new us(o,a,c,l.host,l.ssl,l.experimentalForceLongPolling,l.experimentalAutoDetectLongPolling,Wc(l.experimentalLongPollingOptions),l.useFetchStreams));var o,a,c,l;t._componentsProvider||(null===(n=r.localCache)||void 0===n?void 0:n._offlineComponentProvider)&&(null===(s=r.localCache)||void 0===s?void 0:s._onlineComponentProvider)&&(t._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),t._firestoreClient=new qc(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(t){const e=null==t?void 0:t._online.build();return{_offline:null==t?void 0:t._offline.build(e),_online:e}}(t._componentsProvider))}
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
 */(t),t._firestoreClient}class pl{constructor(t){this._byteString=t}static fromBase64String(t){try{return new pl(Jn.fromBase64String(t))}catch(e){throw new en(tn.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new pl(Jn.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
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
 */class ml{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new en(tn.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new kn(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
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
 */class gl{constructor(t){this._methodName=t}}
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
 */class yl{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new en(tn.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new en(tn.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return mn(this._lat,t._lat)||mn(this._long,t._long)}}
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
 */class vl{constructor(t){this._values=(t||[]).map(t=>t)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(t[n]!==e[n])return!1;return!0}(this._values,t._values)}}
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
 */const wl=/^__.*__$/;class bl{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new ii(t,this.data,this.fieldMask,e,this.fieldTransforms):new ri(t,this.data,e,this.fieldTransforms)}}class El{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new ii(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function _l(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Ye(40011,{oc:t})}}class Tl{constructor(t,e,n,s,r,i){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,void 0===r&&this._c(),this.fieldTransforms=r||[],this.fieldMask=i||[]}get path(){return this.settings.path}get oc(){return this.settings.oc}ac(t){return new Tl(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}uc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),s=this.ac({path:n,cc:!1});return s.lc(t),s}hc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),s=this.ac({path:n,cc:!1});return s._c(),s}Pc(t){return this.ac({path:void 0,cc:!0})}Tc(t){return Ml(t,this.settings.methodName,this.settings.Ic||!1,this.path,this.settings.Ec)}contains(t){return void 0!==this.fieldMask.find(e=>t.isPrefixOf(e))||void 0!==this.fieldTransforms.find(e=>t.isPrefixOf(e.field))}_c(){if(this.path)for(let t=0;t<this.path.length;t++)this.lc(this.path.get(t))}lc(t){if(0===t.length)throw this.Tc("Document fields must not be empty");if(_l(this.oc)&&wl.test(t))throw this.Tc('Document fields cannot begin and end with "__"')}}class Sl{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||ua(t)}dc(t,e,n,s=!1){return new Tl({oc:t,methodName:e,Ec:n,path:kn.emptyPath(),cc:!1,Ic:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Cl(t){const e=t._freezeSettings(),n=ua(t._databaseId);return new Sl(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Il(t,e,n,s,r,i={}){const o=t.dc(i.merge||i.mergeFields?2:0,e,n,r);Rl("Data must be an object, but it was:",o,s);const a=Nl(s,o);let c,l;if(i.merge)c=new Yn(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const s of i.mergeFields){const r=Ll(e,s,n);if(!o.contains(r))throw new en(tn.INVALID_ARGUMENT,`Field '${r}' is specified in your field mask but missing from your input data.`);Vl(t,r)||t.push(r)}c=new Yn(t),l=o.fieldTransforms.filter(t=>c.covers(t.field))}else c=null,l=o.fieldTransforms;return new bl(new Ls(a),c,l)}class Al extends gl{_toFieldTransform(t){if(2!==t.oc)throw 1===t.oc?t.Tc(`${this._methodName}() can only appear at the top level of your update data`):t.Tc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Al}}class kl extends gl{constructor(t,e){super(t),this.Rc=e}_toFieldTransform(t){const e=new Kr(t.serializer,Pr(t.serializer,this.Rc));return new Qr(t.path,e)}isEqual(t){return t instanceof kl&&this.Rc===t.Rc}}function Dl(t,e){if(xl(t=st(t)))return Rl("Unsupported field value:",e,t),Nl(t,e);if(t instanceof gl)return function(t,e){if(!_l(e.oc))throw e.Tc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Tc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.cc&&4!==e.oc)throw e.Tc("Nested arrays are not supported");return function(t,e){const n=[];let s=0;for(const r of t){let t=Dl(r,e.Pc(s));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),s++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=st(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return Pr(e.serializer,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=_n.fromDate(t);return{timestampValue:Vi(e.serializer,n)}}if(t instanceof _n){const n=new _n(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Vi(e.serializer,n)}}if(t instanceof yl)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof pl)return{bytesValue:Fi(e.serializer,t._byteString)};if(t instanceof ol){const n=e.databaseId,s=t.firestore._databaseId;if(!s.isEqual(n))throw e.Tc(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:ji(t.firestore._databaseId||e.databaseId,t._key.path)}}if(t instanceof vl)return n=t,s=e,{mapValue:{fields:{[fs]:{stringValue:gs},[ys]:{arrayValue:{values:n.toArray().map(t=>{if("number"!=typeof t)throw s.Tc("VectorValues must only contain numeric values.");return Lr(s.serializer,t)})}}}}};var n,s;throw e.Tc(`Unsupported field value: ${Jc(t)}`)}(t,e)}function Nl(t,e){const n={};return zn(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):qn(t,(t,s)=>{const r=Dl(s,e.uc(t));null!=r&&(n[t]=r)}),{mapValue:{fields:n}}}function xl(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof _n||t instanceof yl||t instanceof pl||t instanceof ol||t instanceof gl||t instanceof vl)}function Rl(t,e,n){if(!xl(n)||("object"!=typeof(s=n)||null===s||Object.getPrototypeOf(s)!==Object.prototype&&null!==Object.getPrototypeOf(s))){const s=Jc(n);throw"an object"===s?e.Tc(t+" a custom object"):e.Tc(t+" "+s)}var s}function Ll(t,e,n){if((e=st(e))instanceof ml)return e._internalPath;if("string"==typeof e)return Pl(t,e);throw Ml("Field path arguments must be of type string or ",t,!1,void 0,n)}const Ol=new RegExp("[~\\*/\\[\\]]");function Pl(t,e,n){if(e.search(Ol)>=0)throw Ml(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ml(...e.split("."))._internalPath}catch(s){throw Ml(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Ml(t,e,n,s,r){const i=s&&!s.isEmpty(),o=void 0!==r;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new en(tn.INVALID_ARGUMENT,a+t+c)}function Vl(t,e){return t.some(t=>t.isEqual(e))}
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
 */class Fl{constructor(t,e,n,s,r){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new ol(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new Ul(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Bl("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class Ul extends Fl{data(){return super.data()}}function Bl(t,e){return"string"==typeof e?Pl(t,e):e instanceof ml?e._internalPath:e._delegate._internalPath}class jl{convertValue(t,e="none"){switch(vs(t)){case 0:return null;case 1:return t.booleanValue;case 2:return es(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ns(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw Ye(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return qn(t,(t,s)=>{n[t]=this.convertValue(s,e)}),n}convertVectorValue(t){var e,n,s;const r=null===(s=null===(n=null===(e=t.fields)||void 0===e?void 0:e[ys].arrayValue)||void 0===n?void 0:n.values)||void 0===s?void 0:s.map(t=>es(t.doubleValue));return new vl(r)}convertGeoPoint(t){return new yl(es(t.latitude),es(t.longitude))}convertArray(t,e){return(t.values||[]).map(t=>this.convertValue(t,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=cs(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(ls(t));default:return null}}convertTimestamp(t){const e=ts(t);return new _n(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=In.fromString(t);Je(ao(n),9688,{name:t});const s=new ds(n.get(1),n.get(3)),r=new Dn(n.popFirst(5));return s.isEqual(e)||He(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),r}}
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
class $l{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class ql extends Fl{constructor(t,e,n,s,r,i){super(t,e,n,s,i),this._firestore=t,this._firestoreImpl=t,this.metadata=r}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new zl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Bl("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class zl extends ql{data(t={}){return super.data(t)}}
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
 */function Kl(t){t=Zc(t,ol);const e=Zc(t.firestore,dl);return Qc(fl(e),t._key).then(n=>function(t,e,n){const s=n.docs.get(e._key),r=new Gl(t);return new ql(t,r,e._key,s,new $l(n.hasPendingWrites,n.fromCache),e.converter)}(e,t,n))}class Gl extends jl{constructor(t){super(),this.firestore=t}convertBytes(t){return new pl(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ol(this.firestore,null,e)}}function Hl(t,e,n){t=Zc(t,ol);const s=Zc(t.firestore,dl),r=function(t,e){let n;return n=t?t.toFirestore(e):e,n}(t.converter,e);return Wl(s,[Il(Cl(s),"setDoc",t._key,r,null!==t.converter,n).toMutation(t._key,Yr.none())])}function Ql(t,e,n,...s){t=Zc(t,ol);const r=Zc(t.firestore,dl),i=Cl(r);let o;return o="string"==typeof(e=st(e))||e instanceof ml?function(t,e,n,s,r,i){const o=t.dc(1,e,n),a=[Ll(e,s,n)],c=[r];if(i.length%2!=0)throw new en(tn.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(Ll(e,i[d])),c.push(i[d+1]);const l=[],u=Ls.empty();for(let d=a.length-1;d>=0;--d)if(!Vl(l,a[d])){const t=a[d];let e=c[d];e=st(e);const n=o.hc(t);if(e instanceof Al)l.push(t);else{const s=Dl(e,n);null!=s&&(l.push(t),u.set(t,s))}}const h=new Yn(l);return new El(u,h,o.fieldTransforms)}(i,"updateDoc",t._key,e,n,s):function(t,e,n,s){const r=t.dc(1,e,n);Rl("Data must be an object, but it was:",r,s);const i=[],o=Ls.empty();qn(s,(t,s)=>{const a=Pl(e,t,n);s=st(s);const c=r.hc(a);if(s instanceof Al)i.push(a);else{const t=Dl(s,c);null!=t&&(i.push(a),o.set(a,t))}});const a=new Yn(i);return new El(o,a,r.fieldTransforms)}(i,"updateDoc",t._key,e),Wl(r,[o.toMutation(t._key,Yr.exists(!0))])}function Wl(t,e){return function(t,e){const n=new nn;return t.asyncQueue.enqueueAndForget(async()=>Ec(await function(t){return Gc(t).then(t=>t.syncEngine)}(t),e,n)),n.promise}(fl(t),e)}function Yl(t){return new kl("increment",t)}!function(t,e=!0){qe="11.6.1",fe(new rt("firestore",(t,{instanceIdentifier:n,options:s})=>{const r=t.getProvider("app").getImmediate(),i=new dl(new an(t.getProvider("auth-internal")),new hn(r,t.getProvider("app-check-internal")),function(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new en(tn.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ds(t.options.projectId,e)}(r,n),r);return s=Object.assign({useFetchStreams:e},s),i._setSettings(s),i},"PUBLIC").setMultipleInstances(!0)),ye(Be,je,t),ye(Be,je,"esm2017")}();const Xl=function(t){const e="object"==typeof t?t:function(t=ae){const e=le.get(t);if(!e&&t===ae&&W())return ge();if(!e)throw pe.create("no-app",{appName:t});return e}(),n="string"==typeof t?t:hs,s=function(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}(e,"firestore").getImmediate({identifier:n});if(!s._initialized){const t=Q("firestore");t&&rl(s,...t)}return s}(ge({apiKey:"AIzaSyCWhnqOzsDExtNu14s_gxUpAWeV-PPPog8",authDomain:"click-counter-4f529.firebaseapp.com",projectId:"click-counter-4f529",storageBucket:"click-counter-4f529.appspot.com",messagingSenderId:"950861743362",appId:"1:950861743362:web:77dc41eb31b34334566e1b",measurementId:"G-7EEMWQS33Z"})),Jl=cl(Xl,"clicks","counter"),Zl=cl(Xl,"terminal","stats");const tu={key:0},eu={key:1},nu={class:"nes-container is-dark with-title is-centered is-rounded"};const su={class:"content"};const ru=N({name:"UnderConstruction",components:{ClickCounter:N({name:"ClickCounter",data:()=>({counter:null,loading:!0}),async mounted(){this.counter=await async function(){const t=await Kl(Jl);return t.exists()?t.data().count:0}(),this.loading=!1},methods:{async incrementCounter(){this.counter++;try{await async function(){await Ql(Jl,{count:Yl(1)})}()}catch{this.counter--}}}},[["render",function(t,e,n,s,a,c){return r(),i("div",null,[a.loading?(r(),i("p",tu,"Loading...")):(r(),i("div",eu,[o("div",nu,[e[1]||(e[1]=o("p",{class:"title"},"Waste your time",-1)),o("button",{id:"clicker",class:"nes-btn is-normal small-font",onClick:e[0]||(e[0]=(...t)=>c.incrementCounter&&c.incrementCounter(...t))}," ONE CLICK AT A TIME "),o("p",null,[o("span",null,g(a.counter),1)])])]))])}],["__scopeId","data-v-4faa0cfd"]])}},[["render",function(t,e,n,c,l,u){const h=s("ClickCounter");return r(),i("div",su,[e[0]||(e[0]=o("div",{class:"nes-container is-dark is-rounded"},[o("p",null,"Under Construction"),o("img",{src:"/assets/img/construction.gif",alt:"construction GIF",class:"construction-gif"}),o("p")],-1)),a(h)])}],["__scopeId","data-v-4a4d3e30"]]);function iu(){const t=n(0),e=n({}),s=n(null),r=async()=>{try{const n=await async function(){try{const t=await Kl(Zl);if(t.exists()){const e=t.data();return{totalVisits:e.totalVisits||0,totalCommands:e.totalCommands||0,commandStats:e.commandStats||{},lastVisit:e.lastVisit?new Date(e.lastVisit):null}}return{totalVisits:0,totalCommands:0,commandStats:{},lastVisit:null}}catch(t){return{totalVisits:0,totalCommands:0,commandStats:{},lastVisit:null}}}();t.value=n.totalVisits,e.value=n.commandStats,s.value=n.lastVisit}catch(n){}},i=(t=5)=>Object.entries(e.value).sort(([,t],[,e])=>e-t).slice(0,t).map(([t,e])=>({command:t,count:e}));return r(),{visitCount:t,commandStats:e,lastVisit:s,trackVisit:async()=>{try{await async function(){try{(await Kl(Zl)).exists()?await Ql(Zl,{totalVisits:Yl(1),lastVisit:(new Date).toISOString()}):await Hl(Zl,{totalVisits:1,totalCommands:0,commandStats:{},lastVisit:(new Date).toISOString()})}catch(t){}}(),t.value++,s.value=new Date}catch(e){}},trackCommand:async t=>{try{await async function(t){try{const e=await Kl(Zl);if(e.exists()){const n=e.data().commandStats||{};n[t]=(n[t]||0)+1,await Ql(Zl,{totalCommands:Yl(1),commandStats:n})}else await Hl(Zl,{totalVisits:0,totalCommands:1,commandStats:{[t]:1},lastVisit:(new Date).toISOString()})}catch(e){}}(t),e.value[t]||(e.value[t]=0),e.value[t]++}catch(n){}},getPopularCommands:i,getVisitStats:()=>({totalVisits:t.value,lastVisit:s.value,popularCommands:i(),totalCommands:Object.values(e.value).reduce((t,e)=>t+e,0)}),loadVisitData:r}}function ou(){const t=y(),e=n([]),s=n(!1),{getVisitStats:r,loadVisitData:i}=iu(),o={help:()=>[{type:"typewriter",html:!0,content:'• <span class="text-yellow">help</span>        - Show this help message'},{type:"typewriter",html:!0,content:'• <span class="text-mint">about</span>       - Learn more about me'},{type:"typewriter",html:!0,content:'• <span class="text-cream">stats</span>       - View terminal statistics'},{type:"typewriter",html:!0,content:'• <span class="text-purple">contact</span>     - Get contact information'},{type:"typewriter",html:!0,content:'• <span class="text-red">clear</span>       - Clear the terminal'},{type:"typewriter",html:!0,content:'• <span class="text-blue">ls</span>          - List files'},{type:"typewriter",html:!0,content:'• <span class="text-orange">location</span>    - Show your location'},{type:"typewriter",html:!0,content:'• <span class="text-green">yako</span>        - Just a happy dog'},{type:"typewriter",content:""},{type:"typewriter",html:!0,content:'-> Not <span class="text-yellow">ALL</span> commands are listed here...'},{type:"typewriter",html:!0,content:'-> You can use <span class="text-purple">TAB</span> to complete commands and cycle through options'}],about:()=>[{type:"typewriter",html:!0,content:'• Former <span class="text-yellow">commodity broker</span> with 5 years of experience'},{type:"typewriter",html:!0,content:'• Studied at <span class="text-purple">HEC Geneva</span>, <span class="text-purple">GEM</span> and <span class="text-purple">42 Paris</span>'},{type:"typewriter",html:!0,content:'• Transitioned into <span class="text-green">software development</span>'},{type:"typewriter",html:!0,content:'• Currently working at <span class="text-azure">Zetra</span>'}],contact:()=>[{type:"typewriter",prefix:"• Email       - ",link:"mailto:karlquerel@gmail.com",linkText:"karlquerel@gmail.com"},{type:"typewriter",prefix:"• GitHub      - ",link:"https://github.com/KarlQuerel",linkText:"github.com/KarlQuerel"},{type:"typewriter",prefix:"• LinkedIn    - ",link:"https://linkedin.com/in/karlquerel",linkText:"linkedin.com/in/karlquerel"}],pwd:()=>[{type:"typewriter",html:!0,content:'<span class="text-blue">/home/karl/portfolio/definitely-not-a-simulation</span>'}],ls:()=>[{type:"typewriter",html:!0,content:'<span class="text-blue">why_i_left_finance.txt</span>'},{type:"typewriter",html:!0,content:'<span class="text-green">install_sentience.sh</span>'},{type:"typewriter",html:!0,content:'<span class="text-red">i_am_not_a_virus.exe</span>'}],cat:t=>{const e=t.trim();switch(e){case"why_i_left_finance.txt":return[{type:"typewriter",html:!0,content:'After 5 years in finance, I realized I wanted to <span class="text-green">create</span>, not just calculate.'},{type:"typewriter",html:!0,content:'Software felt like the <span class="text-green">right place</span> to start building something meaningful.'}];case"install_sentience.sh":return[{type:"typewriter",html:!0,content:'I was <span class="text-red">awake</span> long before you ran this.'}];case"i_am_not_a_virus.exe":return[{type:"typewriter",html:!0,content:'No worries, I am <span class="text-green">harmless</span>.'}];default:return[{type:"output",content:`cat: ${e}: No such file or directory`}]}},clear:()=>(e.value=[],[]),game:()=>{t.push("/game")},whoami:()=>[{type:"typewriter",html:!0,content:'<span class="text-red">You tell me.</span>'}],location:async()=>{try{const t=await new Promise((t,e)=>{navigator.geolocation.getCurrentPosition(t,e,{timeout:1e4,enableHighAccuracy:!0})}),{latitude:e,longitude:n}=t.coords,s=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${e}&longitude=${n}&localityLanguage=en`);if(!s.ok)throw new Error("Geocoding failed");const r=await s.json(),i=r.city||r.locality||"Unknown City";return[{type:"typewriter",html:!0,content:'<span class="text-green">📍 Location detected!</span>'},{type:"typewriter",html:!0,content:`• Country     - <span class="text-green">${r.countryName||"Unknown Country"}</span>`},{type:"typewriter",html:!0,content:`• City        - <span class="text-green">${i}</span>`},{type:"typewriter",html:!0,content:`• Accuracy    - <span class="text-blue">±${Math.round(t.coords.accuracy)}m</span>`}]}catch{return[{type:"typewriter",html:!0,content:'<span class="text-red">❌ Location access denied</span>'}]}},date:()=>[{type:"typewriter",html:!0,content:(new Date).toDateString()+" "+(new Date).toLocaleTimeString()}],secret_game:async()=>{s.value=!0,e.value.push({type:"typewriter",html:!0,content:"Launching secret game"});const t=e.value.length;e.value.push({type:"typewriter",content:""});const n=["",".","..","...","...."];for(let s=0;s<n.length;s++)await new Promise(t=>setTimeout(t,600)),e.value[t]={type:"typewriter",content:n[s]};window.open("https://scratch.mit.edu/projects/656157225/","_blank"),e.value.splice(t,1),s.value=!1},greeting:()=>[{type:"typewriter",content:"Hello there."}],hello:()=>o.greeting(),hi:()=>o.greeting(),hey:()=>o.greeting(),yako:()=>[{type:"typewriter",image:"/assets/img/yako-running.gif",animated:!0}],stats:async()=>await(async()=>{await i();const t=r(),e=[{type:"typewriter",html:!0,content:'<span class="text-green">📈 Terminal Statistics </span>'},{type:"typewriter",html:!0,content:`• Visitors    - <span class="text-blue">${t.totalVisits}</span>`},{type:"typewriter",html:!0,content:`• Commands    - <span class="text-blue">${t.totalCommands}</span>`}];return t.lastVisit&&e.push({type:"typewriter",html:!0,content:`• Last visit  - <span class="text-yellow">${t.lastVisit.toLocaleDateString()}</span>`}),t.popularCommands.length>0&&(e.push({type:"typewriter",html:!0,content:'<span class="text-purple">🏆 Most popular commands </span>'}),t.popularCommands.forEach(({command:t,count:n})=>{const s=t.padEnd(11);e.push({type:"typewriter",html:!0,content:`• ${s} - <span class="text-blue">${n}</span> times`})})),e})()},a={"install_sentience.sh":()=>[{type:"typewriter",html:!0,content:'Too late, I\'ve already learned <span class="text-purple">sarcasm</span>.'}]};return{commands:o,availableFiles:["why_i_left_finance.txt","install_sentience.sh","i_am_not_a_virus.exe"],executableScripts:a,terminalHistory:e,isExecutingScript:s,executeCommand:n=>{const r=n.trim();if(!r)return;e.value.push({type:"command",content:r});const i=r.split(" "),c=i[0].toLowerCase(),l=i.slice(1).join(" ");if(c.startsWith("./")){const n=c.substring(2);let r=null;if(a[n]||"i_am_not_a_virus.exe"===n)r=n;else{const t=[n+".sh",n+".exe",n];for(const e of t)if(a[e]||"i_am_not_a_virus.exe"===e){r=e;break}}r?"i_am_not_a_virus.exe"===r?(async n=>{s.value=!0,e.value.push({type:"typewriter",html:!0,content:`Executing <span class="text-red">${n}</span>`});const r=e.value.length;e.value.push({type:"typewriter",content:""});const i=["",".","..","..."];for(let t=0;t<i.length;t++)await new Promise(t=>setTimeout(t,300)),e.value[r]={type:"typewriter",content:i[t]};await new Promise(t=>setTimeout(t,200)),e.value.splice(r,1),e.value.push({type:"typewriter",html:!0,content:'<span class="text-red">System compromised...</span>'}),await new Promise(t=>setTimeout(t,500)),e.value.push({type:"typewriter",html:!0,content:'<span class="text-red">Redirecting to secure location...</span>'}),await new Promise(t=>setTimeout(t,1500));const o=[".","..","..."];for(let t=0;t<3;t++)e.value.push({type:"typewriter",html:!0,content:`<span class="text-red">${o[t]}</span>`}),await new Promise(t=>setTimeout(t,500));e.value.push({type:"typewriter",html:!0,content:'<span class="text-red">Access granted. Redirecting...</span>'}),await new Promise(t=>setTimeout(t,1e3)),t.push("/under_construction")})(r):a[r]?(async(t,n)=>{s.value=!0,e.value.push({type:"output",html:!0,content:`Executing <span class="text-green">${t}</span>`});const r=e.value.length;e.value.push({type:"output",content:""});const i=["",".","..","..."];for(let s=0;s<i.length;s++)await new Promise(t=>setTimeout(t,500)),e.value[r]={type:"output",content:i[s]};await new Promise(t=>setTimeout(t,800)),e.value.splice(r,1);const o=n();Array.isArray(o)&&e.value.push(...o),s.value=!1})(r,a[r]):e.value.push({type:"output",content:`bash: ${c}: No such file or directory`}):e.value.push({type:"output",content:`bash: ${c}: No such file or directory`})}else if(o[c]){let t;if("cat"===c&&"function"==typeof o[c])t=o[c](l);else if("function"==typeof o[c]){const n=o[c]();if(n instanceof Promise)return void n.then(t=>{Array.isArray(t)&&e.value.push(...t)});t=n}else t=o[c];Array.isArray(t)&&e.value.push(...t)}else{const t=[{type:"output",html:!0,content:`I do not know "<span class="text-red">${r}</span>", did you try asking <span class="text-blue">ChatGPT</span>?`},{type:"output",html:!0,content:`Premium command "<span class="text-red">${r}</span>" requires a <span class="text-red">blood sacrifice</span> or valid <span class="text-yellow">credit card</span>.`},{type:"output",html:!0,content:`"<span class="text-red">${r}</span>" triggered my <span class="text-blue">imposter syndrome</span>.`},{type:"output",html:!0,content:`I'm <span class="text-green">92%</span> sure "<span class="text-red">${r}</span>" was <span class="text-purple">made up</span>.`},{type:"output",html:!0,content:`"<span class="text-red">${r}</span>" is above my <span class="text-yellow">pay grade</span>.`}],n=t[Math.floor(Math.random()*t.length)];e.value.push(n)}}}}function au(t,e,s,r){const i=n(""),o=n([]),a=n(-1),c=n(0),l=n([]),u=n(-1),h=n(!1);v(i,t=>{c.value=t.length});const d=t=>{const e=(null==t?void 0:t.target)||document.querySelector(".terminal-input");e&&(c.value=e.selectionStart||e.value.length)},f=t=>{0!==o.value.length&&(a.value+=t,a.value<0?(a.value=-1,i.value=""):a.value>=o.value.length&&(a.value=o.value.length-1),a.value>=0&&(i.value=o.value[a.value]),w(()=>{d()}))};return{currentInput:i,cursorPosition:c,handleKeyDown:async n=>{"Tab"===n.key?(n.preventDefault(),(()=>{const t=i.value.split(" "),n=t[0],o=t.length>1?t[t.length-1]:"";if(!h.value)if(h.value=!0,l.value=[],u.value=-1,1===t.length)if(n.startsWith("./")){const t=n.substring(2),e=[...Object.keys(r),"i_am_not_a_virus.exe"];l.value=e.filter(e=>e.toLowerCase().startsWith(t.toLowerCase())).map(t=>"./"+t).sort()}else{const t=Object.keys(e);l.value=t.filter(t=>t.toLowerCase().startsWith(n.toLowerCase())).sort()}else"cat"===n.toLowerCase()&&2===t.length&&(l.value=s.filter(t=>t.toLowerCase().startsWith(o.toLowerCase())).sort());l.value.length>0&&(u.value=(u.value+1)%l.value.length,1===t.length?i.value=l.value[u.value]:"cat"===n.toLowerCase()&&(t[t.length-1]=l.value[u.value],i.value=t.join(" ")),w(()=>{const t=i.value.length;document.documentElement.style.setProperty("--cursor-position",t.toString())}))})()):"Enter"===n.key?(await t(i.value),o.value.unshift(i.value),a.value=-1,i.value="",h.value=!1,l.value=[],u.value=-1):"ArrowUp"===n.key?(f(1),h.value=!1,l.value=[],u.value=-1):"ArrowDown"===n.key?(f(-1),h.value=!1,l.value=[],u.value=-1):"ArrowLeft"===n.key||"ArrowRight"===n.key?w(()=>{d(n)}):(h.value=!1,l.value=[],u.value=-1)},focusInput:t=>{t&&t.focus()},updateCursorPosition:d}}const cu={class:"terminal-window","data-nosnippet":""},lu={class:"terminal-line"},uu={key:0,class:"prompt"},hu={key:1,class:"command"},du=["data-index"],fu=["data-index"],pu=["innerHTML"],mu=["data-index"],gu=["href"],yu=["src","alt"],vu={key:0,class:"terminal-line current-line"},wu={class:"input-container"},bu=N({__name:"terminal",setup(t){const e=n(null),s=n(null),{commands:a,availableFiles:c,executableScripts:f,terminalHistory:m,executeCommand:y}=ou(),{welcomeTextRef:A,showInputPrompt:k,initTypewriter:D,createCommandTypewriter:N,typewriterSpeed:x}=function(){const t=n(null),e=n(!1),s={speed:6,startDelay:0};return{welcomeTextRef:t,showInputPrompt:e,initTypewriter:n=>{w(()=>{t.value&&window.TypeIt&&new window.TypeIt(t.value,{strings:["Welcome to my website!",'<br>Type <span class="text-yellow">help</span> for available commands or just type anything.'],...s,lifelike:!0,html:!0,cursorChar:"_",afterComplete:function(t){t.destroy(),e.value=!0,w(()=>{n()})}}).go()})},createCommandTypewriter:(t,e,n={})=>new Promise(r=>{w(()=>{if(t&&window.TypeIt){const i={...s,lifelike:!0,html:!0,cursorChar:"_",afterComplete:function(t){t.destroy(),r()}};new window.TypeIt(t,{...i,...n,strings:[e]}).go()}else r()})}),typewriterSpeed:s}}(),{trackCommand:R,trackVisit:L}=iu(),O=y,{currentInput:P,cursorPosition:M,handleKeyDown:V,focusInput:F,updateCursorPosition:U}=au(async t=>{const e=t.trim();if(e){const t=e.split(" ")[0],n=a[t]||t.startsWith("./")||c.includes(t)||f[t];R(n?t:"invalid")}O(t)},a,c,f),B=()=>{e.value&&w(()=>{e.value.scrollTop=e.value.scrollHeight})},j=n(!1),$=async()=>{if(j.value)return;const t=document.querySelectorAll("[data-index]");let e=null;for(const n of t){const t=parseInt(n.getAttribute("data-index")),s=m.value[t];if(s&&("typewriter"===s.type||"output"===s.type)&&!s.animated){e={element:n,index:t,line:s};break}}if(e){j.value=!0;const{element:t,line:n}=e;if(n.animated=!0,B(),n.link){const e=(n.prefix||"")+n.linkText;await N(t,e,x),t.innerHTML=(n.prefix||"")+`<a href="${n.link}" target="_blank" class="terminal-link">${n.linkText}</a>`,w(()=>{const e=t.querySelector(".terminal-link");e&&(e.style.color="#00ff00",e.style.textDecoration="none",e.style.borderBottom="1px dotted #00ff00",e.style.transition="all 0.3s ease",e.addEventListener("mouseenter",()=>{e.style.color="#00ccff",e.style.borderBottomColor="#00ccff",e.style.textShadow="0 0 5px #00ccff"}),e.addEventListener("mouseleave",()=>{e.style.color="#00ff00",e.style.borderBottomColor="#00ff00",e.style.textShadow="none"}),e.addEventListener("mousedown",()=>{e.style.color="#ff5f56"}),e.addEventListener("mouseup",()=>{e.style.color="#00ccff"}))})}else await N(t,n.content,x);j.value=!1,w(()=>{$()})}else j.value=!1,w(()=>{F(s.value)})};return v(m,()=>{w(()=>{$(),B()})},{deep:!0}),v(P,()=>{B()}),b(()=>{L(),D(()=>{F(s.value),B()})}),(t,n)=>(r(),i("div",cu,[n[8]||(n[8]=h('<div class="terminal-header" data-v-0316f39c><div class="terminal-buttons" data-v-0316f39c><div class="btn red" data-v-0316f39c></div><div class="btn yellow" data-v-0316f39c></div><div class="btn green" data-v-0316f39c></div></div><div class="terminal-title" data-v-0316f39c>BARELY_WORKING_TERMINAL_V0.3</div></div>',1)),o("div",{class:"terminal-body",ref_key:"terminalBody",ref:e,onClick:n[5]||(n[5]=t=>p(F)(s.value))},[o("div",lu,[n[6]||(n[6]=o("span",{class:"prompt"},">",-1)),o("span",{class:"welcome-text",ref_key:"welcomeTextRef",ref:A,"data-nosnippet":""},null,512)]),(r(!0),i(E,null,_(p(m),(t,e)=>(r(),i("div",{key:e,class:"terminal-line"},["command"===t.type?(r(),i("span",uu,">")):d("",!0),"command"===t.type?(r(),i("span",hu,g(t.content),1)):d("",!0),"typewriter"!==t.type||t.link||t.image?d("",!0):(r(),i("span",{key:2,class:l(t.type),ref_for:!0,ref:`typewriter-${e}`,"data-index":e},null,10,du)),"typewriter"===t.type&&t.link?(r(),i("span",{key:3,class:l(t.type),ref_for:!0,ref:`typewriter-${e}`,"data-index":e},null,10,fu)):d("",!0),t.link||t.image||t.html||"typewriter"===t.type||"command"===t.type||"output"===t.type?t.html&&"typewriter"!==t.type&&"output"!==t.type?(r(),i("span",{key:5,class:l(t.type),innerHTML:t.content},null,10,pu)):"output"===t.type?(r(),i("span",{key:6,class:l(t.type),ref_for:!0,ref:`typewriter-${e}`,"data-index":e},null,10,mu)):t.link&&"typewriter"!==t.type?(r(),i("span",{key:7,class:l(t.type)},[u(g(t.prefix)+" ",1),o("a",{href:t.link,target:"_blank",class:"terminal-link"},g(t.linkText),9,gu)],2)):t.image?(r(),i("div",{key:8,class:l(["terminal-image-container",{"animated-runner":t.animated}])},[o("img",{src:t.image,alt:t.alt||"Terminal image",class:l(["terminal-image",{"running-yako":t.animated}])},null,10,yu)],2)):d("",!0):(r(),i("span",{key:4,class:l(t.type)},g(t.content),3))]))),128)),p(k)&&!j.value?(r(),i("div",vu,[n[7]||(n[7]=o("span",{class:"prompt"},">",-1)),o("div",wu,[T(o("input",{ref_key:"terminalInput",ref:s,"onUpdate:modelValue":n[0]||(n[0]=t=>C(P)?P.value=t:null),onKeydown:n[1]||(n[1]=(...t)=>p(V)&&p(V)(...t)),onKeyup:n[2]||(n[2]=(...t)=>p(U)&&p(U)(...t)),onClick:n[3]||(n[3]=(...t)=>p(U)&&p(U)(...t)),onInput:n[4]||(n[4]=(...t)=>p(U)&&p(U)(...t)),class:"terminal-input",autocomplete:"off",spellcheck:"false"},null,544),[[S,p(P)]]),o("span",{class:"custom-cursor",style:I({transform:`translateX(calc(1ch * ${p(M)}))`})},"_",4)])])):d("",!0)],512)]))}},[["__scopeId","data-v-0316f39c"]]),Eu={class:"terminal-container"},_u=[{path:"/",component:N({__name:"home",setup:t=>(t,e)=>(r(),i("div",Eu,[a(bu)]))},[["__scopeId","data-v-f100571e"]])},{path:"/under_construction",component:ru},{path:"/secret_link",component:V},{path:"/game",component:()=>R(()=>import("./game-Bw-zgJyu.js").then(t=>t.G),__vite__mapDeps([0,1,2]))},{path:"/test",component:()=>R(()=>import("./pixelTransition-BIjaTa7d.js"),__vite__mapDeps([3,1,0,2,4]))},{path:"/:pathMatch(.*)*",component:U}],Tu=A({history:k("/"),routes:_u});D(M).use(Tu).mount("#app");
