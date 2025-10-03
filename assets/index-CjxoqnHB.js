const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/game-CVSYWmvW.js","assets/vendor-CCM2qioM.js","assets/game-DTioTAxA.css"])))=>i.map(i=>d[i]);
/* empty css               */import{s as t,r as e,x as n,m as s,y as r,c as i,d as o,e as a,b as c,p as l,z as u,g as h,k as d,f,u as p,A as m,t as g,B as y,h as v,j as w,o as b,F as E,i as _,w as T,C as S,D as C,n as I,E as A,G as k,H as D}from"./vendor-CCM2qioM.js";import{_ as N}from"./game-CVSYWmvW.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const n of t)if("childList"===n.type)for(const t of n.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)}).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const x={},R="/assets/img/Yako_logo_128.png",L={class:"navbar-container"},O={id:"app"};const P=N({name:"App",components:{RetroNavbar:N({__name:"retroNavbar",setup(p){const m=t(),g=e(!1),y=e(!1),v=n("footerVisibility",{isVisible:e(!0),toggleFooter:()=>{},hideFooter:()=>{},showFooter:()=>{}}),w=s(()=>"/game"===m.path),b=()=>{g.value=!g.value},E=()=>{g.value=!1},_=()=>{y.value=!y.value,v.toggleFooter()};return(t,e)=>{const n=r("router-link");return o(),i("nav",{class:h(["navbar",{"menu-active":g.value,"navbar-hidden":y.value}])},[a("div",L,[l(n,{to:"/",class:"logo",onClick:E},{default:u(()=>e[0]||(e[0]=[a("img",{src:R,class:"default-img",alt:"Logo"},null,-1),a("img",{src:R,class:"glitch-img",alt:"Logo Glitch"},null,-1)])),_:1}),a("div",{class:"menu-toggle",onClick:b},e[1]||(e[1]=[a("div",{class:"bar"},null,-1),a("div",{class:"bar"},null,-1),a("div",{class:"bar"},null,-1)])),a("ul",{class:h(["nav-links",{active:g.value}])},[a("li",null,[l(n,{to:"/game",class:"glitch-button","data-text":"GAME",onClick:E},{default:u(()=>e[2]||(e[2]=[a("span",null,"GAME",-1)])),_:1})]),a("li",null,[l(n,{to:"/under_construction",class:"glitch-button","data-text":"COMING SOON",onClick:E},{default:u(()=>e[3]||(e[3]=[a("span",null,[f("COMING"),a("br"),f("SOON")],-1)])),_:1})]),e[4]||(e[4]=d('<div class="share" data-v-2d5c7342><a href="mailto:karlquerel@gmail.com" target="_blank" data-v-2d5c7342><i class="nes-icon gmail is-medium" data-v-2d5c7342></i></a><a href="https://github.com/KarlQuerel" target="_blank" data-v-2d5c7342><i class="nes-icon github is-medium" data-v-2d5c7342></i></a><a href="https://www.linkedin.com/in/karlquerel" target="_blank" data-v-2d5c7342><i class="nes-icon linkedin is-medium" data-v-2d5c7342></i></a></div>',1))],2)]),w.value?(o(),i("button",{key:0,class:h(["hide-navbar-btn",{hidden:y.value}]),onClick:_},[a("img",{src:"/assets/img/navbar-arrow.png",alt:"Toggle Navbar",class:h(["arrow-icon",{"arrow-up":y.value,"arrow-down":!y.value}])},null,2)],2)):c("",!0)],2)}}},[["__scopeId","data-v-2d5c7342"]]),RetroFooter:N({__name:"retroFooter",setup(t){const s=n("footerVisibility",{isVisible:e(!0),toggleFooter:()=>{},hideFooter:()=>{},showFooter:()=>{}});return(t,e)=>(o(),i("footer",{class:h(["footer",{"footer-hidden":!p(s).isVisible.value}]),"data-nosnippet":""},e[0]||(e[0]=[a("div",{class:"footer-copyright"},[a("span",null,"© 2025 Karl Querel - All rights reserved")],-1)]),2))}},[["__scopeId","data-v-202da06b"]])},setup(){const t=e(!0);m("footerVisibility",{isVisible:t,toggleFooter:()=>{t.value=!t.value},hideFooter:()=>{t.value=!1},showFooter:()=>{t.value=!0}})}},[["render",function(t,e,n,s,a,c){const u=r("RetroNavbar"),h=r("router-view"),d=r("RetroFooter");return o(),i("div",O,[l(u),l(h),l(d)])}]]);const M=N({mounted(){window.location.href="https://shattereddisk.github.io/rickroll/rickroll.mp4"}},[["render",function(t,e,n,s,r,a){return o(),i("div",null,"Redirecting...")}]]),V={class:"content"};const F=N({name:"NotFound"},[["render",function(t,e,n,s,r,c){return o(),i("div",V,e[0]||(e[0]=[a("div",{class:"nes-container is-dark is-rounded"},[a("img",{src:"/assets/img/yako-not-found.gif",alt:"lost yako"}),a("h1",null,"Page not found")],-1)]))}],["__scopeId","data-v-da04b479"]]);var U={};
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
 */const B=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=63&r|128):55296==(64512&r)&&s+1<t.length&&56320==(64512&t.charCodeAt(s+1))?(r=65536+((1023&r)<<10)+(1023&t.charCodeAt(++s)),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=63&r|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=63&r|128)}return e},j={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const e=t[r],i=r+1<t.length,o=i?t[r+1]:0,a=r+2<t.length,c=a?t[r+2]:0,l=e>>2,u=(3&e)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,i||(h=64)),s.push(n[l],n[u],n[h],n[d])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(B(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((31&r)<<6|63&i)}else if(r>239&&r<365){const i=((7&r)<<18|(63&t[n++])<<12|(63&t[n++])<<6|63&t[n++])-65536;e[s++]=String.fromCharCode(55296+(i>>10)),e[s++]=String.fromCharCode(56320+(1023&i))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((15&r)<<12|(63&i)<<6|63&o)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const e=n[t.charAt(r++)],i=r<t.length?n[t.charAt(r)]:0;++r;const o=r<t.length?n[t.charAt(r)]:64;++r;const a=r<t.length?n[t.charAt(r)]:64;if(++r,null==e||null==i||null==o||null==a)throw new $;const c=e<<2|i>>4;if(s.push(c),64!==o){const t=i<<4&240|o>>2;if(s.push(t),64!==a){const t=o<<6&192|a;s.push(t)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class $ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const q=function(t){return function(t){const e=B(t);return j.encodeByteArray(e,!0)}(t).replace(/\./g,"")};
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
const z=()=>
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
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,K=()=>{if("undefined"==typeof document)return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const e=t&&function(t){try{return j.decodeString(t,!0)}catch(n){}return null}(t[1]);return e&&JSON.parse(e)},G=()=>{try{return z()||(()=>{if("undefined"==typeof process)return;const t=U.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0})()||K()}catch(t){return}},H=t=>{const e=(t=>{var e,n;return null===(n=null===(e=G())||void 0===e?void 0:e.emulatorHosts)||void 0===n?void 0:n[t]})(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return"["===e[0]?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Q=()=>{var t;return null===(t=G())||void 0===t?void 0:t.config};
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
class W{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch(()=>{}),1===t.length?t(e):t(e,n))}}}
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
 */function Y(){return!function(){var t;const e=null===(t=G())||void 0===t?void 0:t.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(n){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}class X extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,X.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,J.prototype.create)}}class J{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,r=this.errors[t],i=r?function(t,e){return t.replace(Z,(t,n)=>{const s=e[n];return null!=s?String(s):`<${n}?>`})}(r,n):"Error",o=`${this.serviceName}: ${i} (${s}).`;return new X(s,o,n)}}const Z=/\{\$([^}]+)}/g;function tt(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const n=t[r],i=e[r];if(et(n)&&et(i)){if(!tt(n,i))return!1}else if(n!==i)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function et(t){return null!==t&&"object"==typeof t}
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
 */function nt(t){return t&&t._delegate?t._delegate:t}class st{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}
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
 */const rt="[DEFAULT]";
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
 */class it{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const t=new W;if(this.instancesDeferred.set(e,t),this.isInitialized(e)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:e});n&&t.resolve(n)}catch(n){}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),s=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(s)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
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
 */(t))try{this.getOrInitializeService({instanceIdentifier:rt})}catch(e){}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const t=this.getOrInitializeService({instanceIdentifier:s});n.resolve(t)}catch(e){}}}}clearInstance(t=rt){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...t.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return null!=this.component}isInitialized(t=rt){return this.instances.has(t)}getOptions(t=rt){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[r,i]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(r)&&i.resolve(s)}return s}onInit(t,e){var n;const s=this.normalizeInstanceIdentifier(e),r=null!==(n=this.onInitCallbacks.get(s))&&void 0!==n?n:new Set;r.add(t),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&t(i,s),()=>{r.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const r of n)try{r(t,e)}catch(s){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(s=t,s===rt?void 0:s),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch(r){}var s;return n||null}normalizeInstanceIdentifier(t=rt){return this.component?this.component.multipleInstances?t:rt:t}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class ot{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new it(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}
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
 */var at,ct;(ct=at||(at={}))[ct.DEBUG=0]="DEBUG",ct[ct.VERBOSE=1]="VERBOSE",ct[ct.INFO=2]="INFO",ct[ct.WARN=3]="WARN",ct[ct.ERROR=4]="ERROR",ct[ct.SILENT=5]="SILENT";const lt={debug:at.DEBUG,verbose:at.VERBOSE,info:at.INFO,warn:at.WARN,error:at.ERROR,silent:at.SILENT},ut=at.INFO,ht={[at.DEBUG]:"log",[at.VERBOSE]:"log",[at.INFO]:"info",[at.WARN]:"warn",[at.ERROR]:"error"},dt=(t,e,...n)=>{if(e<t.logLevel)return;(new Date).toISOString();if(!ht[e])throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ft{constructor(t){this.name=t,this._logLevel=ut,this._logHandler=dt,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in at))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?lt[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,at.DEBUG,...t),this._logHandler(this,at.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,at.VERBOSE,...t),this._logHandler(this,at.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,at.INFO,...t),this._logHandler(this,at.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,at.WARN,...t),this._logHandler(this,at.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,at.ERROR,...t),this._logHandler(this,at.ERROR,...t)}}let pt,mt;const gt=new WeakMap,yt=new WeakMap,vt=new WeakMap,wt=new WeakMap,bt=new WeakMap;let Et={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return yt.get(t);if("objectStoreNames"===e)return t.objectStoreNames||vt.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return St(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function _t(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(mt||(mt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(Ct(this),e),St(gt.get(this))}:function(...e){return St(t.apply(Ct(this),e))}:function(e,...n){const s=t.call(Ct(this),e,...n);return vt.set(s,e.sort?e.sort():[e]),St(s)}}function Tt(t){return"function"==typeof t?_t(t):(t instanceof IDBTransaction&&function(t){if(yt.has(t))return;const e=new Promise((e,n)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",i),t.removeEventListener("abort",i)},r=()=>{e(),s()},i=()=>{n(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",i),t.addEventListener("abort",i)});yt.set(t,e)}(t),e=t,(pt||(pt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(t=>e instanceof t)?new Proxy(t,Et):t);var e}function St(t){if(t instanceof IDBRequest)return function(t){const e=new Promise((e,n)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",i)},r=()=>{e(St(t.result)),s()},i=()=>{n(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",i)});return e.then(e=>{e instanceof IDBCursor&&gt.set(e,t)}).catch(()=>{}),bt.set(e,t),e}(t);if(wt.has(t))return wt.get(t);const e=Tt(t);return e!==t&&(wt.set(t,e),bt.set(e,t)),e}const Ct=t=>bt.get(t);const It=["get","getKey","getAll","getAllKeys","count"],At=["put","add","delete","clear"],kt=new Map;function Dt(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(kt.get(e))return kt.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=At.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!r&&!It.includes(n))return;const i=async function(t,...e){const i=this.transaction(t,r?"readwrite":"readonly");let o=i.store;return s&&(o=o.index(e.shift())),(await Promise.all([o[n](...e),r&&i.done]))[0]};return kt.set(e,i),i}Et=(t=>({...t,get:(e,n,s)=>Dt(e,n)||t.get(e,n,s),has:(e,n)=>!!Dt(e,n)||t.has(e,n)}))(Et);
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
class Nt{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null}).filter(t=>t).join(" ")}}const xt="@firebase/app",Rt="0.11.5",Lt=new ft("@firebase/app"),Ot="@firebase/app-compat",Pt="@firebase/analytics-compat",Mt="@firebase/analytics",Vt="@firebase/app-check-compat",Ft="@firebase/app-check",Ut="@firebase/auth",Bt="@firebase/auth-compat",jt="@firebase/database",$t="@firebase/data-connect",qt="@firebase/database-compat",zt="@firebase/functions",Kt="@firebase/functions-compat",Gt="@firebase/installations",Ht="@firebase/installations-compat",Qt="@firebase/messaging",Wt="@firebase/messaging-compat",Yt="@firebase/performance",Xt="@firebase/performance-compat",Jt="@firebase/remote-config",Zt="@firebase/remote-config-compat",te="@firebase/storage",ee="@firebase/storage-compat",ne="@firebase/firestore",se="@firebase/vertexai",re="@firebase/firestore-compat",ie="firebase",oe="[DEFAULT]",ae={[xt]:"fire-core",[Ot]:"fire-core-compat",[Mt]:"fire-analytics",[Pt]:"fire-analytics-compat",[Ft]:"fire-app-check",[Vt]:"fire-app-check-compat",[Ut]:"fire-auth",[Bt]:"fire-auth-compat",[jt]:"fire-rtdb",[$t]:"fire-data-connect",[qt]:"fire-rtdb-compat",[zt]:"fire-fn",[Kt]:"fire-fn-compat",[Gt]:"fire-iid",[Ht]:"fire-iid-compat",[Qt]:"fire-fcm",[Wt]:"fire-fcm-compat",[Yt]:"fire-perf",[Xt]:"fire-perf-compat",[Jt]:"fire-rc",[Zt]:"fire-rc-compat",[te]:"fire-gcs",[ee]:"fire-gcs-compat",[ne]:"fire-fst",[re]:"fire-fst-compat",[se]:"fire-vertex","fire-js":"fire-js",[ie]:"fire-js-all"},ce=new Map,le=new Map,ue=new Map;function he(t,e){try{t.container.addComponent(e)}catch(n){Lt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function de(t){const e=t.name;if(ue.has(e))return Lt.debug(`There were multiple attempts to register component ${e}.`),!1;ue.set(e,t);for(const n of ce.values())he(n,t);for(const n of le.values())he(n,t);return!0}
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
const fe=new J("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
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
class pe{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new st("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw fe.create("app-deleted",{appName:this._name})}}
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
 */function me(t,e={}){let n=t;if("object"!=typeof e){e={name:e}}const s=Object.assign({name:oe,automaticDataCollectionEnabled:!1},e),r=s.name;if("string"!=typeof r||!r)throw fe.create("bad-app-name",{appName:String(r)});if(n||(n=Q()),!n)throw fe.create("no-options");const i=ce.get(r);if(i){if(tt(n,i.options)&&tt(s,i.config))return i;throw fe.create("duplicate-app",{appName:r})}const o=new ot(r);for(const c of ue.values())o.addComponent(c);const a=new pe(n,s,o);return ce.set(r,a),a}function ge(t,e,n){var s;let r=null!==(s=ae[t])&&void 0!==s?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const t=[`Unable to register library "${r}" with version "${e}":`];return i&&t.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&t.push("and"),o&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void Lt.warn(t.join(" "))}de(new st(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}
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
 */const ye="firebase-heartbeat-store";let ve=null;function we(){return ve||(ve=function(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=St(o);return s&&o.addEventListener("upgradeneeded",t=>{s(St(o.result),t.oldVersion,t.newVersion,St(o.transaction),t)}),n&&o.addEventListener("blocked",t=>n(t.oldVersion,t.newVersion,t)),a.then(t=>{i&&t.addEventListener("close",()=>i()),r&&t.addEventListener("versionchange",t=>r(t.oldVersion,t.newVersion,t))}).catch(()=>{}),a}("firebase-heartbeat-database",1,{upgrade:(t,e)=>{if(0===e)try{t.createObjectStore(ye)}catch(n){}}}).catch(t=>{throw fe.create("idb-open",{originalErrorMessage:t.message})})),ve}async function be(t,e){try{const n=(await we()).transaction(ye,"readwrite"),s=n.objectStore(ye);await s.put(e,Ee(t)),await n.done}catch(n){if(n instanceof X)Lt.warn(n.message);else{const t=fe.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});Lt.warn(t.message)}}}function Ee(t){return`${t.name}!${t.options.appId}`}
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
 */class _e{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Se(e),this._heartbeatsCachePromise=this._storage.read().then(t=>(this._heartbeatsCache=t,t))}async triggerHeartbeat(){var t,e;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Te();if(null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(t=>t.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>30){const t=function(t){if(0===t.length)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}
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
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(t,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){Lt.warn(n)}}async getHeartbeatsHeader(){var t;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const e=Te(),{heartbeatsToSend:n,unsentEntries:s}=function(t,e=1024){const n=[];let s=t.slice();for(const r of t){const t=n.find(t=>t.agent===r.agent);if(t){if(t.dates.push(r.date),Ce(n)>e){t.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Ce(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}(this._heartbeatsCache.heartbeats),r=q(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return Lt.warn(e),""}}}function Te(){return(new Date).toISOString().substring(0,10)}class Se{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(t){return!1}}()&&new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var t;e((null===(t=r.error)||void 0===t?void 0:t.message)||"")}}catch(n){e(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const t=await async function(t){try{const e=(await we()).transaction(ye),n=await e.objectStore(ye).get(Ee(t));return await e.done,n}catch(e){if(e instanceof X)Lt.warn(e.message);else{const t=fe.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});Lt.warn(t.message)}}}(this.app);return(null==t?void 0:t.heartbeats)?t:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return be(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}}async add(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return be(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}}}function Ce(t){return q(JSON.stringify({version:2,heartbeats:t})).length}var Ie;Ie="",de(new st("platform-logger",t=>new Nt(t),"PRIVATE")),de(new st("heartbeat",t=>new _e(t),"PRIVATE")),ge(xt,Rt,Ie),ge(xt,Rt,"esm2017"),ge("fire-js","");
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
ge("firebase","11.6.1","app");var Ae,ke,De="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function e(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(t,e,n){n||(n=0);var s=Array(16);if("string"==typeof e)for(var r=0;16>r;++r)s[r]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(r=0;16>r;++r)s[r]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],r=t.g[2];var i=t.g[3],o=e+(i^n&(r^i))+s[0]+3614090360&4294967295;o=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=(n=(r=(i=(e=n+(o<<7&4294967295|o>>>25))+((o=i+(r^e&(n^r))+s[1]+3905402710&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(e^n))+s[2]+606105819&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^r&(i^e))+s[3]+3250441966&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(r^i))+s[4]+4118548399&4294967295)<<7&4294967295|o>>>25))+((o=i+(r^e&(n^r))+s[5]+1200080426&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(e^n))+s[6]+2821735955&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^r&(i^e))+s[7]+4249261313&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(r^i))+s[8]+1770035416&4294967295)<<7&4294967295|o>>>25))+((o=i+(r^e&(n^r))+s[9]+2336552879&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(e^n))+s[10]+4294925233&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^r&(i^e))+s[11]+2304563134&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(r^i))+s[12]+1804603682&4294967295)<<7&4294967295|o>>>25))+((o=i+(r^e&(n^r))+s[13]+4254626195&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^i&(e^n))+s[14]+2792965006&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^r&(i^e))+s[15]+1236535329&4294967295)<<22&4294967295|o>>>10))+((o=e+(r^i&(n^r))+s[1]+4129170786&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(e^n))+s[6]+3225465664&4294967295)<<9&4294967295|o>>>23))+((o=r+(e^n&(i^e))+s[11]+643717713&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(r^i))+s[0]+3921069994&4294967295)<<20&4294967295|o>>>12))+((o=e+(r^i&(n^r))+s[5]+3593408605&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(e^n))+s[10]+38016083&4294967295)<<9&4294967295|o>>>23))+((o=r+(e^n&(i^e))+s[15]+3634488961&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(r^i))+s[4]+3889429448&4294967295)<<20&4294967295|o>>>12))+((o=e+(r^i&(n^r))+s[9]+568446438&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(e^n))+s[14]+3275163606&4294967295)<<9&4294967295|o>>>23))+((o=r+(e^n&(i^e))+s[3]+4107603335&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(r^i))+s[8]+1163531501&4294967295)<<20&4294967295|o>>>12))+((o=e+(r^i&(n^r))+s[13]+2850285829&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^r&(e^n))+s[2]+4243563512&4294967295)<<9&4294967295|o>>>23))+((o=r+(e^n&(i^e))+s[7]+1735328473&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(r^i))+s[12]+2368359562&4294967295)<<20&4294967295|o>>>12))+((o=e+(n^r^i)+s[5]+4294588738&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^r)+s[8]+2272392833&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^e^n)+s[11]+1839030562&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^e)+s[14]+4259657740&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^r^i)+s[1]+2763975236&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^r)+s[4]+1272893353&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^e^n)+s[7]+4139469664&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^e)+s[10]+3200236656&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^r^i)+s[13]+681279174&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^r)+s[0]+3936430074&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^e^n)+s[3]+3572445317&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^e)+s[6]+76029189&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^r^i)+s[9]+3654602809&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^r)+s[12]+3873151461&4294967295)<<11&4294967295|o>>>21))+((o=r+(i^e^n)+s[15]+530742520&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^i^e)+s[2]+3299628645&4294967295)<<23&4294967295|o>>>9))+((o=e+(r^(n|~i))+s[0]+4096336452&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~r))+s[7]+1126891415&4294967295)<<10&4294967295|o>>>22))+((o=r+(e^(i|~n))+s[14]+2878612391&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(r|~e))+s[5]+4237533241&4294967295)<<21&4294967295|o>>>11))+((o=e+(r^(n|~i))+s[12]+1700485571&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~r))+s[3]+2399980690&4294967295)<<10&4294967295|o>>>22))+((o=r+(e^(i|~n))+s[10]+4293915773&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(r|~e))+s[1]+2240044497&4294967295)<<21&4294967295|o>>>11))+((o=e+(r^(n|~i))+s[8]+1873313359&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~r))+s[15]+4264355552&4294967295)<<10&4294967295|o>>>22))+((o=r+(e^(i|~n))+s[6]+2734768916&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(r|~e))+s[13]+1309151649&4294967295)<<21&4294967295|o>>>11))+((i=(e=n+((o=e+(r^(n|~i))+s[4]+4149444226&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~r))+s[11]+3174756917&4294967295)<<10&4294967295|o>>>22))^((r=i+((o=r+(e^(i|~n))+s[2]+718787259&4294967295)<<15&4294967295|o>>>17))|~e))+s[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(r+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+r&4294967295,t.g[3]=t.g[3]+i&4294967295}function s(t,e){this.h=e;for(var n=[],s=!0,r=t.length-1;0<=r;r--){var i=0|t[r];s&&i==e||(n[r]=i,s=!1)}this.g=n}!function(t,e){function n(){}n.prototype=e.prototype,t.D=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.C=function(t,n,s){for(var r=Array(arguments.length-2),i=2;i<arguments.length;i++)r[i-2]=arguments[i];return e.prototype[n].apply(t,r)}}(e,function(){this.blockSize=-1}),e.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.u=function(t,e){void 0===e&&(e=t.length);for(var s=e-this.blockSize,r=this.B,i=this.h,o=0;o<e;){if(0==i)for(;o<=s;)n(this,t,o),o+=this.blockSize;if("string"==typeof t){for(;o<e;)if(r[i++]=t.charCodeAt(o++),i==this.blockSize){n(this,r),i=0;break}}else for(;o<e;)if(r[i++]=t[o++],i==this.blockSize){n(this,r),i=0;break}}this.h=i,this.o+=e},e.prototype.v=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.o;for(e=t.length-8;e<t.length;++e)t[e]=255&n,n/=256;for(this.u(t),t=Array(16),e=n=0;4>e;++e)for(var s=0;32>s;s+=8)t[n++]=this.g[e]>>>s&255;return t};var r={};function i(t){return-128<=t&&128>t?function(t,e){var n=r;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,function(t){return new s([0|t],0>t?-1:0)}):new s([0|t],0>t?-1:0)}function o(t){if(isNaN(t)||!isFinite(t))return a;if(0>t)return d(o(-t));for(var e=[],n=1,r=0;t>=n;r++)e[r]=t/n|0,n*=4294967296;return new s(e,0)}var a=i(0),c=i(1),l=i(16777216);function u(t){if(0!=t.h)return!1;for(var e=0;e<t.g.length;e++)if(0!=t.g[e])return!1;return!0}function h(t){return-1==t.h}function d(t){for(var e=t.g.length,n=[],r=0;r<e;r++)n[r]=~t.g[r];return new s(n,~t.h).add(c)}function f(t,e){return t.add(d(e))}function p(t,e){for(;(65535&t[e])!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function m(t,e){this.g=t,this.h=e}function g(t,e){if(u(e))throw Error("division by zero");if(u(t))return new m(a,a);if(h(t))return e=g(d(t),e),new m(d(e.g),d(e.h));if(h(e))return e=g(t,d(e)),new m(d(e.g),e.h);if(30<t.g.length){if(h(t)||h(e))throw Error("slowDivide_ only works with positive integers.");for(var n=c,s=e;0>=s.l(t);)n=y(n),s=y(s);var r=v(n,1),i=v(s,1);for(s=v(s,2),n=v(n,2);!u(s);){var l=i.add(s);0>=l.l(t)&&(r=r.add(n),i=l),s=v(s,1),n=v(n,1)}return e=f(t,r.j(e)),new m(r,e)}for(r=a;0<=t.l(e);){for(n=Math.max(1,Math.floor(t.m()/e.m())),s=48>=(s=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,s-48),l=(i=o(n)).j(e);h(l)||0<l.l(t);)l=(i=o(n-=s)).j(e);u(i)&&(i=c),r=r.add(i),t=f(t,l)}return new m(r,t)}function y(t){for(var e=t.g.length+1,n=[],r=0;r<e;r++)n[r]=t.i(r)<<1|t.i(r-1)>>>31;return new s(n,t.h)}function v(t,e){var n=e>>5;e%=32;for(var r=t.g.length-n,i=[],o=0;o<r;o++)i[o]=0<e?t.i(o+n)>>>e|t.i(o+n+1)<<32-e:t.i(o+n);return new s(i,t.h)}(t=s.prototype).m=function(){if(h(this))return-d(this).m();for(var t=0,e=1,n=0;n<this.g.length;n++){var s=this.i(n);t+=(0<=s?s:4294967296+s)*e,e*=4294967296}return t},t.toString=function(t){if(2>(t=t||10)||36<t)throw Error("radix out of range: "+t);if(u(this))return"0";if(h(this))return"-"+d(this).toString(t);for(var e=o(Math.pow(t,6)),n=this,s="";;){var r=g(n,e).g,i=((0<(n=f(n,r.j(e))).g.length?n.g[0]:n.h)>>>0).toString(t);if(u(n=r))return i+s;for(;6>i.length;)i="0"+i;s=i+s}},t.i=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h},t.l=function(t){return h(t=f(this,t))?-1:u(t)?0:1},t.abs=function(){return h(this)?d(this):this},t.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0,i=0;i<=e;i++){var o=r+(65535&this.i(i))+(65535&t.i(i)),a=(o>>>16)+(this.i(i)>>>16)+(t.i(i)>>>16);r=a>>>16,o&=65535,a&=65535,n[i]=a<<16|o}return new s(n,-2147483648&n[n.length-1]?-1:0)},t.j=function(t){if(u(this)||u(t))return a;if(h(this))return h(t)?d(this).j(d(t)):d(d(this).j(t));if(h(t))return d(this.j(d(t)));if(0>this.l(l)&&0>t.l(l))return o(this.m()*t.m());for(var e=this.g.length+t.g.length,n=[],r=0;r<2*e;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var i=0;i<t.g.length;i++){var c=this.i(r)>>>16,f=65535&this.i(r),m=t.i(i)>>>16,g=65535&t.i(i);n[2*r+2*i]+=f*g,p(n,2*r+2*i),n[2*r+2*i+1]+=c*g,p(n,2*r+2*i+1),n[2*r+2*i+1]+=f*m,p(n,2*r+2*i+1),n[2*r+2*i+2]+=c*m,p(n,2*r+2*i+2)}for(r=0;r<e;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=e;r<2*e;r++)n[r]=0;return new s(n,0)},t.A=function(t){return g(this,t).h},t.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.i(r)&t.i(r);return new s(n,this.h&t.h)},t.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.i(r)|t.i(r);return new s(n,this.h|t.h)},t.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.i(r)^t.i(r);return new s(n,this.h^t.h)},e.prototype.digest=e.prototype.v,e.prototype.reset=e.prototype.s,e.prototype.update=e.prototype.u,ke=e,s.prototype.add=s.prototype.add,s.prototype.multiply=s.prototype.j,s.prototype.modulo=s.prototype.A,s.prototype.compare=s.prototype.l,s.prototype.toNumber=s.prototype.m,s.prototype.toString=s.prototype.toString,s.prototype.getBits=s.prototype.i,s.fromNumber=o,s.fromString=function t(e,n){if(0==e.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==e.charAt(0))return d(t(e.substring(1),n));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var s=o(Math.pow(n,8)),r=a,i=0;i<e.length;i+=8){var c=Math.min(8,e.length-i),l=parseInt(e.substring(i,i+c),n);8>c?(c=o(Math.pow(n,c)),r=r.j(c).add(o(l))):r=(r=r.j(s)).add(o(l))}return r},Ae=s}).apply(void 0!==De?De:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var Ne,xe,Re,Le,Oe,Pe,Me,Ve,Fe="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t,e="function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,n){return t==Array.prototype||t==Object.prototype||(t[e]=n.value),t};var n=function(t){t=["object"==typeof globalThis&&globalThis,t,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof Fe&&Fe];for(var e=0;e<t.length;++e){var n=t[e];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);!function(t,s){if(s)t:{var r=n;t=t.split(".");for(var i=0;i<t.length-1;i++){var o=t[i];if(!(o in r))break t;r=r[o]}(s=s(i=r[t=t[t.length-1]]))!=i&&null!=s&&e(r,t,{configurable:!0,writable:!0,value:s})}}("Array.prototype.values",function(t){return t||function(){return function(t,e){t instanceof String&&(t+="");var n=0,s=!1,r={next:function(){if(!s&&n<t.length){var r=n++;return{value:e(r,t[r]),done:!1}}return s=!0,{done:!0,value:void 0}}};return r[Symbol.iterator]=function(){return r},r}(this,function(t,e){return e})}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var s=s||{},r=this||self;function i(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function o(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}function a(t,e,n){return t.call.apply(t.bind,arguments)}function c(t,e,n){if(!t)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,s),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function l(t,e,n){return(l=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?a:c).apply(null,arguments)}function u(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function h(t,e){function n(){}n.prototype=e.prototype,t.aa=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Qb=function(t,n,s){for(var r=Array(arguments.length-2),i=2;i<arguments.length;i++)r[i-2]=arguments[i];return e.prototype[n].apply(t,r)}}function d(t){const e=t.length;if(0<e){const n=Array(e);for(let s=0;s<e;s++)n[s]=t[s];return n}return[]}function f(t,e){for(let n=1;n<arguments.length;n++){const e=arguments[n];if(i(e)){const n=t.length||0,s=e.length||0;t.length=n+s;for(let r=0;r<s;r++)t[n+r]=e[r]}else t.push(e)}}function p(t){return/^[\s\xa0]*$/.test(t)}function m(){var t=r.navigator;return t&&(t=t.userAgent)?t:""}function g(t){return g[" "](t),t}g[" "]=function(){};var y=!(-1==m().indexOf("Gecko")||-1!=m().toLowerCase().indexOf("webkit")&&-1==m().indexOf("Edge")||-1!=m().indexOf("Trident")||-1!=m().indexOf("MSIE")||-1!=m().indexOf("Edge"));function v(t,e,n){for(const s in t)e.call(n,t[s],s,t)}function w(t){const e={};for(const n in t)e[n]=t[n];return e}const b="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(t,e){let n,s;for(let r=1;r<arguments.length;r++){for(n in s=arguments[r],s)t[n]=s[n];for(let e=0;e<b.length;e++)n=b[e],Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}}function _(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function T(t){r.setTimeout(()=>{throw t},0)}function S(){var t=D;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var C=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new I,t=>t.reset());class I{constructor(){this.next=this.g=this.h=null}set(t,e){this.h=t,this.g=e,this.next=null}reset(){this.next=this.g=this.h=null}}let A,k=!1,D=new class{constructor(){this.h=this.g=null}add(t,e){const n=C.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n}},N=()=>{const t=r.Promise.resolve(void 0);A=()=>{t.then(x)}};var x=()=>{for(var t;t=S();){try{t.h.call(t.g)}catch(n){T(n)}var e=C;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}k=!1};function R(){this.s=this.s,this.C=this.C}function L(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}R.prototype.s=!1,R.prototype.ma=function(){this.s||(this.s=!0,this.N())},R.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},L.prototype.h=function(){this.defaultPrevented=!0};var O=function(){if(!r.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const t=()=>{};r.addEventListener("test",t,e),r.removeEventListener("test",t,e)}catch(n){}return t}();function P(t,e){if(L.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,s=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(y){t:{try{g(e.nodeName);var r=!0;break t}catch(i){}r=!1}r||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,s?(this.clientX=void 0!==s.clientX?s.clientX:s.pageX,this.clientY=void 0!==s.clientY?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:M[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&P.aa.h.call(this)}}h(P,L);var M={2:"touch",3:"pen",4:"mouse"};P.prototype.h=function(){P.aa.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var V="closure_listenable_"+(1e6*Math.random()|0),F=0;function U(t,e,n,s,r){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!s,this.ha=r,this.key=++F,this.da=this.fa=!1}function B(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function j(t){this.src=t,this.g={},this.h=0}function $(t,e){var n=e.type;if(n in t.g){var s,r=t.g[n],i=Array.prototype.indexOf.call(r,e,void 0);(s=0<=i)&&Array.prototype.splice.call(r,i,1),s&&(B(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function q(t,e,n,s){for(var r=0;r<t.length;++r){var i=t[r];if(!i.da&&i.listener==e&&i.capture==!!n&&i.ha==s)return r}return-1}j.prototype.add=function(t,e,n,s,r){var i=t.toString();(t=this.g[i])||(t=this.g[i]=[],this.h++);var o=q(t,e,s,r);return-1<o?(e=t[o],n||(e.fa=!1)):((e=new U(e,this.src,i,!!s,r)).fa=n,t.push(e)),e};var z="closure_lm_"+(1e6*Math.random()|0),K={};function G(t,e,n,s,r){if(Array.isArray(e)){for(var i=0;i<e.length;i++)G(t,e[i],n,s,r);return null}return n=Z(n),t&&t[V]?t.K(e,n,!!o(s)&&!!s.capture,r):function(t,e,n,s,r,i){if(!e)throw Error("Invalid event type");var a=o(r)?!!r.capture:!!r,c=X(t);if(c||(t[z]=c=new j(t)),n=c.add(e,n,s,a,i),n.proxy)return n;if(s=function(){function t(n){return e.call(t.src,t.listener,n)}const e=Y;return t}(),n.proxy=s,s.src=t,s.listener=n,t.addEventListener)O||(r=a),void 0===r&&(r=!1),t.addEventListener(e.toString(),s,r);else if(t.attachEvent)t.attachEvent(W(e.toString()),s);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(s)}return n}(t,e,n,!1,s,r)}function H(t,e,n,s,r){if(Array.isArray(e))for(var i=0;i<e.length;i++)H(t,e[i],n,s,r);else s=o(s)?!!s.capture:!!s,n=Z(n),t&&t[V]?(t=t.i,(e=String(e).toString())in t.g&&(-1<(n=q(i=t.g[e],n,s,r))&&(B(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.g[e],t.h--)))):t&&(t=X(t))&&(e=t.g[e.toString()],t=-1,e&&(t=q(e,n,s,r)),(n=-1<t?e[t]:null)&&Q(n))}function Q(t){if("number"!=typeof t&&t&&!t.da){var e=t.src;if(e&&e[V])$(e.i,t);else{var n=t.type,s=t.proxy;e.removeEventListener?e.removeEventListener(n,s,t.capture):e.detachEvent?e.detachEvent(W(n),s):e.addListener&&e.removeListener&&e.removeListener(s),(n=X(e))?($(n,t),0==n.h&&(n.src=null,e[z]=null)):B(t)}}}function W(t){return t in K?K[t]:K[t]="on"+t}function Y(t,e){if(t.da)t=!0;else{e=new P(e,this);var n=t.listener,s=t.ha||t.src;t.fa&&Q(t),t=n.call(s,e)}return t}function X(t){return(t=t[z])instanceof j?t:null}var J="__closure_events_fn_"+(1e9*Math.random()>>>0);function Z(t){return"function"==typeof t?t:(t[J]||(t[J]=function(e){return t.handleEvent(e)}),t[J])}function tt(){R.call(this),this.i=new j(this),this.M=this,this.F=null}function et(t,e){var n,s=t.F;if(s)for(n=[];s;s=s.F)n.push(s);if(t=t.M,s=e.type||e,"string"==typeof e)e=new L(e,t);else if(e instanceof L)e.target=e.target||t;else{var r=e;E(e=new L(s,t),r)}if(r=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];r=nt(o,s,!0,e)&&r}if(r=nt(o=e.g=t,s,!0,e)&&r,r=nt(o,s,!1,e)&&r,n)for(i=0;i<n.length;i++)r=nt(o=e.g=n[i],s,!1,e)&&r}function nt(t,e,n,s){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();for(var r=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.da&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.fa&&$(t.i,o),r=!1!==a.call(c,s)&&r}}return r&&!s.defaultPrevented}function st(t,e,n){if("function"==typeof t)n&&(t=l(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=l(t.handleEvent,t)}return 2147483647<Number(e)?-1:r.setTimeout(t,e||0)}function rt(t){t.g=st(()=>{t.g=null,t.i&&(t.i=!1,rt(t))},t.l);const e=t.h;t.h=null,t.m.apply(null,e)}h(tt,R),tt.prototype[V]=!0,tt.prototype.removeEventListener=function(t,e,n,s){H(this,t,e,n,s)},tt.prototype.N=function(){if(tt.aa.N.call(this),this.i){var t,e=this.i;for(t in e.g){for(var n=e.g[t],s=0;s<n.length;s++)B(n[s]);delete e.g[t],e.h--}}this.F=null},tt.prototype.K=function(t,e,n,s){return this.i.add(String(t),e,!1,n,s)},tt.prototype.L=function(t,e,n,s){return this.i.add(String(t),e,!0,n,s)};class it extends R{constructor(t,e){super(),this.m=t,this.l=e,this.h=null,this.i=!1,this.g=null}j(t){this.h=arguments,this.g?this.i=!0:rt(this)}N(){super.N(),this.g&&(r.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ot(t){R.call(this),this.h=t,this.g={}}h(ot,R);var at=[];function ct(t){v(t.g,function(t,e){this.g.hasOwnProperty(e)&&Q(t)},t),t.g={}}ot.prototype.N=function(){ot.aa.N.call(this),ct(this)},ot.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var lt=r.JSON.stringify,ut=r.JSON.parse,ht=class{stringify(t){return r.JSON.stringify(t,void 0)}parse(t){return r.JSON.parse(t,void 0)}};function dt(){}function ft(t){return t.h||(t.h=t.i())}function pt(){}dt.prototype.h=null;var mt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function gt(){L.call(this,"d")}function yt(){L.call(this,"c")}h(gt,L),h(yt,L);var vt={},wt=null;function bt(){return wt=wt||new tt}function Et(t){L.call(this,vt.La,t)}function _t(t){const e=bt();et(e,new Et(e))}function Tt(t,e){L.call(this,vt.STAT_EVENT,t),this.stat=e}function St(t){const e=bt();et(e,new Tt(e,t))}function Ct(t,e){L.call(this,vt.Ma,t),this.size=e}function It(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return r.setTimeout(function(){t()},e)}function At(){this.g=!0}function kt(t,e,n,s){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var s=n[t];if(!(2>s.length)){var r=s[1];if(Array.isArray(r)&&!(1>r.length)){var i=r[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<r.length;o++)r[o]=""}}}return lt(n)}catch(a){return e}}(t,n)+(s?" "+s:"")})}vt.La="serverreachability",h(Et,L),vt.STAT_EVENT="statevent",h(Tt,L),vt.Ma="timingevent",h(Ct,L),At.prototype.xa=function(){this.g=!1},At.prototype.info=function(){};var Dt,Nt={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},xt={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function Rt(){}function Lt(t,e,n,s){this.j=t,this.i=e,this.l=n,this.R=s||1,this.U=new ot(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ot}function Ot(){this.i=null,this.g="",this.h=!1}h(Rt,dt),Rt.prototype.g=function(){return new XMLHttpRequest},Rt.prototype.i=function(){return{}},Dt=new Rt;var Pt={},Mt={};function Vt(t,e,n){t.L=1,t.v=le(re(e)),t.m=n,t.P=!0,Ft(t,null)}function Ft(t,e){t.F=Date.now(),jt(t),t.A=re(t.v);var n=t.A,s=t.R;Array.isArray(s)||(s=[String(s)]),_e(n.i,"t",s),t.C=0,n=t.j.J,t.h=new Ot,t.g=wn(t.j,n?e:null,!t.m),0<t.O&&(t.M=new it(l(t.Y,t,t.g),t.O)),e=t.U,n=t.g,s=t.ca;var r="readystatechange";Array.isArray(r)||(r&&(at[0]=r.toString()),r=at);for(var i=0;i<r.length;i++){var o=G(n,r[i],s||e.handleEvent,!1,e.h||e);if(!o)break;e.g[o.key]=o}e=t.H?w(t.H):{},t.m?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.m,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),_t(),function(t,e,n,s,r,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var l=a[c].split("=");if(1<l.length){var u=l[0];l=l[1];var h=u.split("_");o=2<=h.length&&"type"==h[1]?o+(u+"=")+l+"&":o+(u+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+s+") [attempt "+r+"]: "+e+"\n"+n+"\n"+o})}(t.i,t.u,t.A,t.l,t.R,t.m)}function Ut(t){return!!t.g&&("GET"==t.u&&2!=t.L&&t.j.Ca)}function Bt(t,e){var n=t.C,s=e.indexOf("\n",n);return-1==s?Mt:(n=Number(e.substring(n,s)),isNaN(n)?Pt:(s+=1)+n>e.length?Mt:(e=e.slice(s,s+n),t.C=s+n,e))}function jt(t){t.S=Date.now()+t.I,$t(t,t.I)}function $t(t,e){if(null!=t.B)throw Error("WatchDog timer not null");t.B=It(l(t.ba,t),e)}function qt(t){t.B&&(r.clearTimeout(t.B),t.B=null)}function zt(t){0==t.j.G||t.J||pn(t.j,t)}function Kt(t){qt(t);var e=t.M;e&&"function"==typeof e.ma&&e.ma(),t.M=null,ct(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.ma())}function Gt(t,e){try{var n=t.j;if(0!=n.G&&(n.g==t||Xt(n.h,t)))if(!t.K&&Xt(n.h,t)&&3==n.G){try{var s=n.Da.g.parse(e)}catch(u){s=null}if(Array.isArray(s)&&3==s.length){var r=s;if(0==r[0]){t:if(!n.u){if(n.g){if(!(n.g.F+3e3<t.F))break t;fn(n),nn(n)}un(n),St(18)}}else n.za=r[1],0<n.za-n.T&&37500>r[2]&&n.F&&0==n.v&&!n.C&&(n.C=It(l(n.Za,n),6e3));if(1>=Yt(n.h)&&n.ca){try{n.ca()}catch(u){}n.ca=void 0}}else gn(n,11)}else if((t.K||n.g==t)&&fn(n),!p(e))for(r=n.Da.g.parse(e),e=0;e<r.length;e++){let l=r[e];if(n.T=l[0],l=l[1],2==n.G)if("c"==l[0]){n.K=l[1],n.ia=l[2];const e=l[3];null!=e&&(n.la=e,n.j.info("VER="+n.la));const r=l[4];null!=r&&(n.Aa=r,n.j.info("SVER="+n.Aa));const u=l[5];null!=u&&"number"==typeof u&&0<u&&(s=1.5*u,n.L=s,n.j.info("backChannelRequestTimeoutMs_="+s)),s=n;const h=t.g;if(h){const t=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(t){var i=s.h;i.g||-1==t.indexOf("spdy")&&-1==t.indexOf("quic")&&-1==t.indexOf("h2")||(i.j=i.l,i.g=new Set,i.h&&(Jt(i,i.h),i.h=null))}if(s.D){const t=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;t&&(s.ya=t,ce(s.I,s.D,t))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-t.F,n.j.info("Handshake RTT: "+n.R+"ms"));var o=t;if((s=n).qa=vn(s,s.J?s.ia:null,s.W),o.K){Zt(s.h,o);var a=o,c=s.L;c&&(a.I=c),a.B&&(qt(a),jt(a)),s.g=o}else ln(s);0<n.i.length&&rn(n)}else"stop"!=l[0]&&"close"!=l[0]||gn(n,7);else 3==n.G&&("stop"==l[0]||"close"==l[0]?"stop"==l[0]?gn(n,7):en(n):"noop"!=l[0]&&n.l&&n.l.ta(l),n.v=0)}_t()}catch(u){}}Lt.prototype.ca=function(t){t=t.target;const e=this.M;e&&3==Xe(t)?e.j():this.Y(t)},Lt.prototype.Y=function(t){try{if(t==this.g)t:{const d=Xe(this.g);var e=this.g.Ba();this.g.Z();if(!(3>d)&&(3!=d||this.g&&(this.h.h||this.g.oa()||Je(this.g)))){this.J||4!=d||7==e||_t(),qt(this);var n=this.g.Z();this.X=n;e:if(Ut(this)){var s=Je(this.g);t="";var i=s.length,o=4==Xe(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){Kt(this),zt(this);var a="";break e}this.h.i=new r.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,t+=this.h.i.decode(s[e],{stream:!(o&&e==i-1)});s.length=0,this.h.g+=t,this.C=0,a=this.h.g}else a=this.g.oa();if(this.o=200==n,function(t,e,n,s,r,i,o){t.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+r+"]: "+e+"\n"+n+"\n"+i+" "+o})}(this.i,this.u,this.A,this.l,this.R,d,n),this.o){if(this.T&&!this.K){e:{if(this.g){var c,l=this.g;if((c=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(c)){var u=c;break e}}u=null}if(!(n=u)){this.o=!1,this.s=3,St(12),Kt(this),zt(this);break t}kt(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Gt(this,n)}if(this.P){let t;for(n=!0;!this.J&&this.C<a.length;){if(t=Bt(this,a),t==Mt){4==d&&(this.s=4,St(14),n=!1),kt(this.i,this.l,null,"[Incomplete Response]");break}if(t==Pt){this.s=4,St(15),kt(this.i,this.l,a,"[Invalid Chunk]"),n=!1;break}kt(this.i,this.l,t,null),Gt(this,t)}if(Ut(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=d||0!=a.length||this.h.h||(this.s=1,St(16),n=!1),this.o=this.o&&n,n){if(0<a.length&&!this.W){this.W=!0;var h=this.j;h.g==this&&h.ba&&!h.M&&(h.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),hn(h),h.M=!0,St(11))}}else kt(this.i,this.l,a,"[Invalid Chunked Response]"),Kt(this),zt(this)}else kt(this.i,this.l,a,null),Gt(this,a);4==d&&Kt(this),this.o&&!this.J&&(4==d?pn(this.j,this):(this.o=!1,jt(this)))}else(function(t){const e={};t=(t.g&&2<=Xe(t)&&t.g.getAllResponseHeaders()||"").split("\r\n");for(let s=0;s<t.length;s++){if(p(t[s]))continue;var n=_(t[s]);const r=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const i=e[r]||[];e[r]=i,i.push(n)}!function(t,e){for(const n in t)e.call(void 0,t[n],n,t)}(e,function(t){return t.join(", ")})})(this.g),400==n&&0<a.indexOf("Unknown SID")?(this.s=3,St(12)):(this.s=0,St(13)),Kt(this),zt(this)}}}catch(d){}},Lt.prototype.cancel=function(){this.J=!0,Kt(this)},Lt.prototype.ba=function(){this.B=null;const t=Date.now();0<=t-this.S?(function(t,e){t.info(function(){return"TIMEOUT: "+e})}(this.i,this.A),2!=this.L&&(_t(),St(17)),Kt(this),this.s=2,zt(this)):$t(this,this.S-t)};var Ht=class{constructor(t,e){this.g=t,this.map=e}};function Qt(t){this.l=t||10,r.PerformanceNavigationTiming?t=0<(t=r.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(r.chrome&&r.chrome.loadTimes&&r.chrome.loadTimes()&&r.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Wt(t){return!!t.h||!!t.g&&t.g.size>=t.j}function Yt(t){return t.h?1:t.g?t.g.size:0}function Xt(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function Jt(t,e){t.g?t.g.add(e):t.h=e}function Zt(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function te(t){if(null!=t.h)return t.i.concat(t.h.D);if(null!=t.g&&0!==t.g.size){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return d(t.i)}function ee(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(i(t)||"string"==typeof t)Array.prototype.forEach.call(t,e,void 0);else for(var n=function(t){if(t.na&&"function"==typeof t.na)return t.na();if(!t.V||"function"!=typeof t.V){if("undefined"!=typeof Map&&t instanceof Map)return Array.from(t.keys());if(!("undefined"!=typeof Set&&t instanceof Set)){if(i(t)||"string"==typeof t){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const s in t)e[n++]=s;return e}}}(t),s=function(t){if(t.V&&"function"==typeof t.V)return t.V();if("undefined"!=typeof Map&&t instanceof Map||"undefined"!=typeof Set&&t instanceof Set)return Array.from(t.values());if("string"==typeof t)return t.split("");if(i(t)){for(var e=[],n=t.length,s=0;s<n;s++)e.push(t[s]);return e}for(s in e=[],n=0,t)e[n++]=t[s];return e}(t),r=s.length,o=0;o<r;o++)e.call(void 0,s[o],n&&n[o],t)}Qt.prototype.cancel=function(){if(this.i=te(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const t of this.g.values())t.cancel();this.g.clear()}};var ne=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function se(t){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,t instanceof se){this.h=t.h,ie(this,t.j),this.o=t.o,this.g=t.g,oe(this,t.s),this.l=t.l;var e=t.i,n=new ve;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),ae(this,n),this.m=t.m}else t&&(e=String(t).match(ne))?(this.h=!1,ie(this,e[1]||"",!0),this.o=ue(e[2]||""),this.g=ue(e[3]||"",!0),oe(this,e[4]),this.l=ue(e[5]||"",!0),ae(this,e[6]||"",!0),this.m=ue(e[7]||"")):(this.h=!1,this.i=new ve(null,this.h))}function re(t){return new se(t)}function ie(t,e,n){t.j=n?ue(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function oe(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.s=e}else t.s=null}function ae(t,e,n){e instanceof ve?(t.i=e,function(t,e){e&&!t.j&&(we(t),t.i=null,t.g.forEach(function(t,e){var n=e.toLowerCase();e!=n&&(be(this,e),_e(this,n,t))},t)),t.j=e}(t.i,t.h)):(n||(e=he(e,ge)),t.i=new ve(e,t.h))}function ce(t,e,n){t.i.set(e,n)}function le(t){return ce(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function ue(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function he(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,de),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function de(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}se.prototype.toString=function(){var t=[],e=this.j;e&&t.push(he(e,fe,!0),":");var n=this.g;return(n||"file"==e)&&(t.push("//"),(e=this.o)&&t.push(he(e,fe,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.s)&&t.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&t.push("/"),t.push(he(n,"/"==n.charAt(0)?me:pe,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.m)&&t.push("#",he(n,ye)),t.join("")};var fe=/[#\/\?@]/g,pe=/[#\?:]/g,me=/[#\?]/g,ge=/[#\?@]/g,ye=/#/g;function ve(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function we(t){t.g||(t.g=new Map,t.h=0,t.i&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var s=t[n].indexOf("="),r=null;if(0<=s){var i=t[n].substring(0,s);r=t[n].substring(s+1)}else i=t[n];e(i,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}function be(t,e){we(t),e=Te(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function Ee(t,e){return we(t),e=Te(t,e),t.g.has(e)}function _e(t,e,n){be(t,e),0<n.length&&(t.i=null,t.g.set(Te(t,e),d(n)),t.h+=n.length)}function Te(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Se(t,e,n,s,r){try{r&&(r.onload=null,r.onerror=null,r.onabort=null,r.ontimeout=null),s(n)}catch(i){}}function Ce(){this.g=new ht}function Ie(t,e,n){const s=n||"";try{ee(t,function(t,n){let r=t;o(t)&&(r=lt(t)),e.push(s+n+"="+encodeURIComponent(r))})}catch(r){throw e.push(s+"type="+encodeURIComponent("_badmap")),r}}function Ae(t){this.l=t.Ub||null,this.j=t.eb||!1}function ke(t,e){tt.call(this),this.D=t,this.o=e,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function De(t){t.j.read().then(t.Pa.bind(t)).catch(t.ga.bind(t))}function Ue(t){t.readyState=4,t.l=null,t.j=null,t.v=null,Be(t)}function Be(t){t.onreadystatechange&&t.onreadystatechange.call(t)}function je(t){let e="";return v(t,function(t,n){e+=n,e+=":",e+=t,e+="\r\n"}),e}function $e(t,e,n){t:{for(s in n){var s=!1;break t}s=!0}s||(n=je(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):ce(t,e,n))}function qe(t){tt.call(this),this.headers=new Map,this.o=t||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(t=ve.prototype).add=function(t,e){we(this),this.i=null,t=Te(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},t.forEach=function(t,e){we(this),this.g.forEach(function(n,s){n.forEach(function(n){t.call(e,n,s,this)},this)},this)},t.na=function(){we(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let s=0;s<e.length;s++){const r=t[s];for(let t=0;t<r.length;t++)n.push(e[s])}return n},t.V=function(t){we(this);let e=[];if("string"==typeof t)Ee(this,t)&&(e=e.concat(this.g.get(Te(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e},t.set=function(t,e){return we(this),this.i=null,Ee(this,t=Te(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},t.get=function(t,e){return t&&0<(t=this.V(t)).length?String(t[0]):e},t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var s=e[n];const i=encodeURIComponent(String(s)),o=this.V(s);for(s=0;s<o.length;s++){var r=i;""!==o[s]&&(r+="="+encodeURIComponent(String(o[s]))),t.push(r)}}return this.i=t.join("&")},h(Ae,dt),Ae.prototype.g=function(){return new ke(this.l,this.j)},Ae.prototype.i=function(t){return function(){return t}}({}),h(ke,tt),(t=ke.prototype).open=function(t,e){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=t,this.A=e,this.readyState=1,Be(this)},t.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.u,method:this.B,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||r).fetch(new Request(this.A,e)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Ue(this)),this.readyState=0},t.Sa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Be(this)),this.g&&(this.readyState=3,Be(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==r.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;De(this)}else t.text().then(this.Ra.bind(this),this.ga.bind(this))},t.Pa=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var e=t.value?t.value:new Uint8Array(0);(e=this.v.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Ue(this):Be(this),3==this.readyState&&De(this)}},t.Ra=function(t){this.g&&(this.response=this.responseText=t,Ue(this))},t.Qa=function(t){this.g&&(this.response=t,Ue(this))},t.ga=function(){this.g&&Ue(this)},t.setRequestHeader=function(t,e){this.u.append(t,e)},t.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(ke.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}}),h(qe,tt);var ze=/^https?$/i,Ke=["POST","PUT"];function Ge(t,e){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=e,t.m=5,He(t),We(t)}function He(t){t.A||(t.A=!0,et(t,"complete"),et(t,"error"))}function Qe(t){if(t.h&&void 0!==s&&(!t.v[1]||4!=Xe(t)||2!=t.Z()))if(t.u&&4==Xe(t))st(t.Ea,0,t);else if(et(t,"readystatechange"),4==Xe(t)){t.h=!1;try{const s=t.Z();t:switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var n;if(!(n=e)){var i;if(i=0===s){var o=String(t.D).match(ne)[1]||null;!o&&r.self&&r.self.location&&(o=r.self.location.protocol.slice(0,-1)),i=!ze.test(o?o.toLowerCase():"")}n=i}if(n)et(t,"complete"),et(t,"success");else{t.m=6;try{var a=2<Xe(t)?t.g.statusText:""}catch(c){a=""}t.l=a+" ["+t.Z()+"]",He(t)}}finally{We(t)}}}function We(t,e){if(t.g){Ye(t);const s=t.g,r=t.v[0]?()=>{}:null;t.g=null,t.v=null,e||et(t,"ready");try{s.onreadystatechange=r}catch(n){}}}function Ye(t){t.I&&(r.clearTimeout(t.I),t.I=null)}function Xe(t){return t.g?t.g.readyState:0}function Je(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.H){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(e){return null}}function Ze(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function tn(t){this.Aa=0,this.i=[],this.j=new At,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ze("failFast",!1,t),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ze("baseRetryDelayMs",5e3,t),this.cb=Ze("retryDelaySeedMs",1e4,t),this.Wa=Ze("forwardChannelMaxRetries",2,t),this.wa=Ze("forwardChannelRequestTimeoutMs",2e4,t),this.pa=t&&t.xmlHttpFactory||void 0,this.Xa=t&&t.Tb||void 0,this.Ca=t&&t.useFetchStreams||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.h=new Qt(t&&t.concurrentRequestLimit),this.Da=new Ce,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=t&&t.Rb||!1,t&&t.xa&&this.j.xa(),t&&t.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&t&&t.detectBufferingProxy||!1,this.ja=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.ja=t.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function en(t){if(sn(t),3==t.G){var e=t.U++,n=re(t.I);if(ce(n,"SID",t.K),ce(n,"RID",e),ce(n,"TYPE","terminate"),an(t,n),(e=new Lt(t,t.j,e)).L=2,e.v=le(re(n)),n=!1,r.navigator&&r.navigator.sendBeacon)try{n=r.navigator.sendBeacon(e.v.toString(),"")}catch(s){}!n&&r.Image&&((new Image).src=e.v,n=!0),n||(e.g=wn(e.j,null),e.g.ea(e.v)),e.F=Date.now(),jt(e)}yn(t)}function nn(t){t.g&&(hn(t),t.g.cancel(),t.g=null)}function sn(t){nn(t),t.u&&(r.clearTimeout(t.u),t.u=null),fn(t),t.h.cancel(),t.s&&("number"==typeof t.s&&r.clearTimeout(t.s),t.s=null)}function rn(t){if(!Wt(t.h)&&!t.s){t.s=!0;var e=t.Ga;A||N(),k||(A(),k=!0),D.add(e,t),t.B=0}}function on(t,e){var n;n=e?e.l:t.U++;const s=re(t.I);ce(s,"SID",t.K),ce(s,"RID",n),ce(s,"AID",t.T),an(t,s),t.m&&t.o&&$e(s,t.m,t.o),n=new Lt(t,t.j,n,t.B+1),null===t.m&&(n.H=t.o),e&&(t.i=e.D.concat(t.i)),e=cn(t,n,1e3),n.I=Math.round(.5*t.wa)+Math.round(.5*t.wa*Math.random()),Jt(t.h,n),Vt(n,s,e)}function an(t,e){t.H&&v(t.H,function(t,n){ce(e,n,t)}),t.l&&ee({},function(t,n){ce(e,n,t)})}function cn(t,e,n){n=Math.min(t.i.length,n);var s=t.l?l(t.l.Na,t.l,t):null;t:{var r=t.i;let e=-1;for(;;){const t=["count="+n];-1==e?0<n?(e=r[0].g,t.push("ofs="+e)):e=0:t.push("ofs="+e);let o=!0;for(let a=0;a<n;a++){let n=r[a].g;const c=r[a].map;if(n-=e,0>n)e=Math.max(0,r[a].g-100),o=!1;else try{Ie(c,t,"req"+n+"_")}catch(i){s&&s(c)}}if(o){s=t.join("&");break t}}}return t=t.i.splice(0,n),e.D=t,s}function ln(t){if(!t.g&&!t.u){t.Y=1;var e=t.Fa;A||N(),k||(A(),k=!0),D.add(e,t),t.v=0}}function un(t){return!(t.g||t.u||3<=t.v)&&(t.Y++,t.u=It(l(t.Fa,t),mn(t,t.v)),t.v++,!0)}function hn(t){null!=t.A&&(r.clearTimeout(t.A),t.A=null)}function dn(t){t.g=new Lt(t,t.j,"rpc",t.Y),null===t.m&&(t.g.H=t.o),t.g.O=0;var e=re(t.qa);ce(e,"RID","rpc"),ce(e,"SID",t.K),ce(e,"AID",t.T),ce(e,"CI",t.F?"0":"1"),!t.F&&t.ja&&ce(e,"TO",t.ja),ce(e,"TYPE","xmlhttp"),an(t,e),t.m&&t.o&&$e(e,t.m,t.o),t.L&&(t.g.I=t.L);var n=t.g;t=t.ia,n.L=1,n.v=le(re(e)),n.m=null,n.P=!0,Ft(n,t)}function fn(t){null!=t.C&&(r.clearTimeout(t.C),t.C=null)}function pn(t,e){var n=null;if(t.g==e){fn(t),hn(t),t.g=null;var s=2}else{if(!Xt(t.h,e))return;n=e.D,Zt(t.h,e),s=1}if(0!=t.G)if(e.o)if(1==s){n=e.m?e.m.length:0,e=Date.now()-e.F;var r=t.B;et(s=bt(),new Ct(s,n)),rn(t)}else ln(t);else if(3==(r=e.s)||0==r&&0<e.X||!(1==s&&function(t,e){return!(Yt(t.h)>=t.h.j-(t.s?1:0)||(t.s?(t.i=e.D.concat(t.i),0):1==t.G||2==t.G||t.B>=(t.Va?0:t.Wa)||(t.s=It(l(t.Ga,t,e),mn(t,t.B)),t.B++,0)))}(t,e)||2==s&&un(t)))switch(n&&0<n.length&&(e=t.h,e.i=e.i.concat(n)),r){case 1:gn(t,5);break;case 4:gn(t,10);break;case 3:gn(t,6);break;default:gn(t,2)}}function mn(t,e){let n=t.Ta+Math.floor(Math.random()*t.cb);return t.isActive()||(n*=2),n*e}function gn(t,e){if(t.j.info("Error code "+e),2==e){var n=l(t.fb,t),s=t.Xa;const e=!s;s=new se(s||"//www.google.com/images/cleardot.gif"),r.location&&"http"==r.location.protocol||ie(s,"https"),le(s),e?function(t,e){const n=new At;if(r.Image){const s=new Image;s.onload=u(Se,n,"TestLoadImage: loaded",!0,e,s),s.onerror=u(Se,n,"TestLoadImage: error",!1,e,s),s.onabort=u(Se,n,"TestLoadImage: abort",!1,e,s),s.ontimeout=u(Se,n,"TestLoadImage: timeout",!1,e,s),r.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=t}else e(!1)}(s.toString(),n):function(t,e){new At;const n=new AbortController,s=setTimeout(()=>{n.abort(),Se(0,0,!1,e)},1e4);fetch(t,{signal:n.signal}).then(t=>{clearTimeout(s),t.ok?Se(0,0,!0,e):Se(0,0,!1,e)}).catch(()=>{clearTimeout(s),Se(0,0,!1,e)})}(s.toString(),n)}else St(2);t.G=0,t.l&&t.l.sa(e),yn(t),sn(t)}function yn(t){if(t.G=0,t.ka=[],t.l){const e=te(t.h);0==e.length&&0==t.i.length||(f(t.ka,e),f(t.ka,t.i),t.h.i.length=0,d(t.i),t.i.length=0),t.l.ra()}}function vn(t,e,n){var s=n instanceof se?re(n):new se(n);if(""!=s.g)e&&(s.g=e+"."+s.g),oe(s,s.s);else{var i=r.location;s=i.protocol,e=e?e+"."+i.hostname:i.hostname,i=+i.port;var o=new se(null);s&&ie(o,s),e&&(o.g=e),i&&oe(o,i),n&&(o.l=n),s=o}return n=t.D,e=t.ya,n&&e&&ce(s,n,e),ce(s,"VER",t.la),an(t,s),s}function wn(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return(e=t.Ca&&!t.pa?new qe(new Ae({eb:n})):new qe(t.pa)).Ha(t.J),e}function bn(){}function En(){}function _n(t,e){tt.call(this),this.g=new tn(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.va&&(t?t["X-WebChannel-Client-Profile"]=e.va:t={"X-WebChannel-Client-Profile":e.va}),this.g.S=t,(t=e&&e.Sb)&&!p(t)&&(this.g.m=t),this.v=e&&e.supportsCrossDomainXhr||!1,this.u=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!p(e)&&(this.g.D=e,null!==(t=this.h)&&e in t&&(e in(t=this.h)&&delete t[e])),this.j=new Cn(this)}function Tn(t){gt.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){t:{for(const n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function Sn(){yt.call(this),this.status=1}function Cn(t){this.g=t}(t=qe.prototype).Ha=function(t){this.J=t},t.ea=function(t,e,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);e=e?e.toUpperCase():"GET",this.D=t,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Dt.g(),this.v=this.o?ft(this.o):ft(Dt),this.g.onreadystatechange=l(this.Ea,this);try{this.B=!0,this.g.open(e,String(t),!0),this.B=!1}catch(o){return void Ge(this,o)}if(t=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var i in s)n.set(i,s[i]);else{if("function"!=typeof s.keys||"function"!=typeof s.get)throw Error("Unknown input type for opt_headers: "+String(s));for(const t of s.keys())n.set(t,s.get(t))}s=Array.from(n.keys()).find(t=>"content-type"==t.toLowerCase()),i=r.FormData&&t instanceof r.FormData,!(0<=Array.prototype.indexOf.call(Ke,e,void 0))||s||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[r,a]of n)this.g.setRequestHeader(r,a);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ye(this),this.u=!0,this.g.send(t),this.u=!1}catch(o){Ge(this,o)}},t.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=t||7,et(this,"complete"),et(this,"abort"),We(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),We(this,!0)),qe.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Qe(this):this.bb())},t.bb=function(){Qe(this)},t.isActive=function(){return!!this.g},t.Z=function(){try{return 2<Xe(this)?this.g.status:-1}catch(t){return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch(t){return""}},t.Oa=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),ut(e)}},t.Ba=function(){return this.m},t.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(t=tn.prototype).la=8,t.G=1,t.connect=function(t,e,n,s){St(0),this.W=t,this.H=e||{},n&&void 0!==s&&(this.H.OSID=n,this.H.OAID=s),this.F=this.X,this.I=vn(this,null,this.W),rn(this)},t.Ga=function(t){if(this.s)if(this.s=null,1==this.G){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const r=new Lt(this,this.j,t);let i=this.o;if(this.S&&(i?(i=w(i),E(i,this.S)):i=this.S),null!==this.m||this.O||(r.H=i,i=null),this.P)t:{for(var e=0,n=0;n<this.i.length;n++){var s=this.i[n];if(void 0===(s="__data__"in s.map&&"string"==typeof(s=s.map.__data__)?s.length:void 0))break;if(4096<(e+=s)){e=n;break t}if(4096===e||n===this.i.length-1){e=n+1;break t}}e=1e3}else e=1e3;e=cn(this,r,e),ce(n=re(this.I),"RID",t),ce(n,"CVER",22),this.D&&ce(n,"X-HTTP-Session-Id",this.D),an(this,n),i&&(this.O?e="headers="+encodeURIComponent(String(je(i)))+"&"+e:this.m&&$e(n,this.m,i)),Jt(this.h,r),this.Ua&&ce(n,"TYPE","init"),this.P?(ce(n,"$req",e),ce(n,"SID","null"),r.T=!0,Vt(r,n,null)):Vt(r,n,e),this.G=2}}else 3==this.G&&(t?on(this,t):0==this.i.length||Wt(this.h)||on(this))},t.Fa=function(){if(this.u=null,dn(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var t=2*this.R;this.j.info("BP detection timer enabled: "+t),this.A=It(l(this.ab,this),t)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,St(10),nn(this),dn(this))},t.Za=function(){null!=this.C&&(this.C=null,nn(this),un(this),St(19))},t.fb=function(t){t?(this.j.info("Successfully pinged google.com"),St(2)):(this.j.info("Failed to ping google.com"),St(1))},t.isActive=function(){return!!this.l&&this.l.isActive(this)},(t=bn.prototype).ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){},En.prototype.g=function(t,e){return new _n(t,e)},h(_n,tt),_n.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},_n.prototype.close=function(){en(this.g)},_n.prototype.o=function(t){var e=this.g;if("string"==typeof t){var n={};n.__data__=t,t=n}else this.u&&((n={}).__data__=lt(t),t=n);e.i.push(new Ht(e.Ya++,t)),3==e.G&&rn(e)},_n.prototype.N=function(){this.g.l=null,delete this.j,en(this.g),delete this.g,_n.aa.N.call(this)},h(Tn,gt),h(Sn,yt),h(Cn,bn),Cn.prototype.ua=function(){et(this.g,"a")},Cn.prototype.ta=function(t){et(this.g,new Tn(t))},Cn.prototype.sa=function(t){et(this.g,new Sn)},Cn.prototype.ra=function(){et(this.g,"b")},En.prototype.createWebChannel=En.prototype.g,_n.prototype.send=_n.prototype.o,_n.prototype.open=_n.prototype.m,_n.prototype.close=_n.prototype.close,Ve=function(){return new En},Me=function(){return bt()},Pe=vt,Oe={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Nt.NO_ERROR=0,Nt.TIMEOUT=8,Nt.HTTP_ERROR=6,Le=Nt,xt.COMPLETE="complete",Re=xt,pt.EventType=mt,mt.OPEN="a",mt.CLOSE="b",mt.ERROR="c",mt.MESSAGE="d",tt.prototype.listen=tt.prototype.K,xe=pt,qe.prototype.listenOnce=qe.prototype.L,qe.prototype.getLastError=qe.prototype.Ka,qe.prototype.getLastErrorCode=qe.prototype.Ba,qe.prototype.getStatus=qe.prototype.Z,qe.prototype.getResponseJson=qe.prototype.Oa,qe.prototype.getResponseText=qe.prototype.oa,qe.prototype.send=qe.prototype.ea,qe.prototype.setWithCredentials=qe.prototype.Ha,Ne=qe}).apply(void 0!==Fe?Fe:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const Ue="@firebase/firestore",Be="4.7.11";
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
 */class je{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}je.UNAUTHENTICATED=new je(null),je.GOOGLE_CREDENTIALS=new je("google-credentials-uid"),je.FIRST_PARTY=new je("first-party-uid"),je.MOCK_USER=new je("mock-user");
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
let $e="11.6.1";
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
 */const qe=new ft("@firebase/firestore");function ze(){return qe.logLevel}function Ke(t,...e){if(qe.logLevel<=at.DEBUG){const n=e.map(Qe);qe.debug(`Firestore (${$e}): ${t}`,...n)}}function Ge(t,...e){if(qe.logLevel<=at.ERROR){const n=e.map(Qe);qe.error(`Firestore (${$e}): ${t}`,...n)}}function He(t,...e){if(qe.logLevel<=at.WARN){const n=e.map(Qe);qe.warn(`Firestore (${$e}): ${t}`,...n)}}function Qe(t){if("string"==typeof t)return t;try{
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
 */function We(t,e,n){let s="Unexpected state";"string"==typeof e?s=e:n=e,Ye(t,s,n)}function Ye(t,e,n){let s=`FIRESTORE (${$e}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(void 0!==n)try{s+=" CONTEXT: "+JSON.stringify(n)}catch(r){s+=" CONTEXT: "+n}throw Ge(s),new Error(s)}function Xe(t,e,n,s){let r="Unexpected state";"string"==typeof n?r=n:s=n,t||Ye(e,r,s)}function Je(t,e){return t}
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
 */const Ze={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class tn extends X{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
 */class en{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}
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
 */class nn{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class sn{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(je.UNAUTHENTICATED))}shutdown(){}}class rn{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class on{constructor(t){this.t=t,this.currentUser=je.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Xe(void 0===this.o,42304);let n=this.i;const s=t=>this.i!==n?(n=this.i,e(t)):Promise.resolve();let r=new en;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new en,t.enqueueRetryable(()=>s(this.currentUser))};const i=()=>{const e=r;t.enqueueRetryable(async()=>{await e.promise,await s(this.currentUser)})},o=t=>{Ke("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=t,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(t=>o(t)),setTimeout(()=>{if(!this.auth){const t=this.t.getImmediate({optional:!0});t?o(t):(Ke("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new en)}},0),i()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(e=>this.i!==t?(Ke("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(Xe("string"==typeof e.accessToken,31837,{l:e}),new nn(e.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Xe(null===t||"string"==typeof t,2055,{h:t}),new je(t)}}class an{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=je.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class cn{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new an(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(je.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ln{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class un{constructor(t,e){var n;this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,null!=(n=t)&&void 0!==n.settings&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Xe(void 0===this.o,3512);const n=t=>{null!=t.error&&Ke("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`);const n=t.token!==this.m;return this.m=t.token,Ke("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?e(t.token):Promise.resolve()};this.o=e=>{t.enqueueRetryable(()=>n(e))};const s=t=>{Ke("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=t,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(t=>s(t)),setTimeout(()=>{if(!this.appCheck){const t=this.V.getImmediate({optional:!0});t?s(t):Ke("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new ln(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(t=>t?(Xe("string"==typeof t.token,44558,{tokenResult:t}),this.m=t.token,new ln(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
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
 */function hn(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}
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
 */function dn(){return new TextEncoder}
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
 */class fn{static newId(){const t=62*Math.floor(256/62);let e="";for(;e.length<20;){const n=hn(40);for(let s=0;s<n.length;++s)e.length<20&&n[s]<t&&(e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[s]%62))}return e}}function pn(t,e){return t<e?-1:t>e?1:0}function mn(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=t.codePointAt(n),r=e.codePointAt(n);if(s!==r){if(s<128&&r<128)return pn(s,r);{const i=dn(),o=yn(i.encode(gn(t,n)),i.encode(gn(e,n)));return 0!==o?o:pn(s,r)}}n+=s>65535?2:1}return pn(t.length,e.length)}function gn(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function yn(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return pn(t[n],e[n]);return pn(t.length,e.length)}function vn(t,e,n){return t.length===e.length&&t.every((t,s)=>n(t,e[s]))}
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
 */const wn=-62135596800,bn=1e6;class En{static now(){return En.fromMillis(Date.now())}static fromDate(t){return En.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*bn);return new En(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new tn(Ze.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new tn(Ze.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<wn)throw new tn(Ze.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new tn(Ze.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/bn}_compareTo(t){return this.seconds===t.seconds?pn(this.nanoseconds,t.nanoseconds):pn(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-wn;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
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
 */class _n{static fromTimestamp(t){return new _n(t)}static min(){return new _n(new En(0,0))}static max(){return new _n(new En(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */const Tn="__name__";class Sn{constructor(t,e,n){void 0===e?e=0:e>t.length&&We(637,{offset:e,range:t.length}),void 0===n?n=t.length-e:n>t.length-e&&We(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===Sn.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Sn?t.forEach(t=>{e.push(t)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const n=Sn.compareSegments(t.get(s),e.get(s));if(0!==n)return n}return pn(t.length,e.length)}static compareSegments(t,e){const n=Sn.isNumericId(t),s=Sn.isNumericId(e);return n&&!s?-1:!n&&s?1:n&&s?Sn.extractNumericId(t).compare(Sn.extractNumericId(e)):mn(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Ae.fromString(t.substring(4,t.length-2))}}class Cn extends Sn{construct(t,e,n){return new Cn(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new tn(Ze.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(t=>t.length>0))}return new Cn(e)}static emptyPath(){return new Cn([])}}const In=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class An extends Sn{construct(t,e,n){return new An(t,e,n)}static isValidIdentifier(t){return In.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),An.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Tn}static keyField(){return new An([Tn])}static fromServerFormat(t){const e=[];let n="",s=0;const r=()=>{if(0===n.length)throw new tn(Ze.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;s<t.length;){const e=t[s];if("\\"===e){if(s+1===t.length)throw new tn(Ze.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[s+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new tn(Ze.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,s+=2}else"`"===e?(i=!i,s++):"."!==e||i?(n+=e,s++):(r(),s++)}if(r(),i)throw new tn(Ze.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new An(e)}static emptyPath(){return new An([])}}
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
 */class kn{constructor(t){this.path=t}static fromPath(t){return new kn(Cn.fromString(t))}static fromName(t){return new kn(Cn.fromString(t).popFirst(5))}static empty(){return new kn(Cn.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return null!==t&&0===Cn.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Cn.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new kn(new Cn(t.slice()))}}
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
 */function Dn(t){return new Nn(t.readTime,t.key,-1)}class Nn{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Nn(_n.min(),kn.empty(),-1)}static max(){return new Nn(_n.max(),kn.empty(),-1)}}function xn(t,e){let n=t.readTime.compareTo(e.readTime);return 0!==n?n:(n=kn.comparator(t.documentKey,e.documentKey),0!==n?n:pn(t.largestBatchId,e.largestBatchId)
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
 */)}class Rn{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}
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
 */async function Ln(t){if(t.code!==Ze.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==t.message)throw t;Ke("LocalStore","Unexpectedly lost primary lease")}
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
 */class On{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&We(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new On((n,s)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,s)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof On?e:On.resolve(e)}catch(e){return On.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):On.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):On.reject(e)}static resolve(t){return new On((e,n)=>{e(t)})}static reject(t){return new On((e,n)=>{n(t)})}static waitFor(t){return new On((e,n)=>{let s=0,r=0,i=!1;t.forEach(t=>{++s,t.next(()=>{++r,i&&r===s&&e()},t=>n(t))}),i=!0,r===s&&e()})}static or(t){let e=On.resolve(!1);for(const n of t)e=e.next(t=>t?On.resolve(t):n());return e}static forEach(t,e){const n=[];return t.forEach((t,s)=>{n.push(e.call(this,t,s))}),this.waitFor(n)}static mapArray(t,e){return new On((n,s)=>{const r=t.length,i=new Array(r);let o=0;for(let a=0;a<r;a++){const c=a;e(t[c]).next(t=>{i[c]=t,++o,o===r&&n(i)},t=>s(t))}})}static doWhile(t,e){return new On((n,s)=>{const r=()=>{!0===t()?e().next(()=>{r()},s):n()};r()})}}function Pn(t){return"IndexedDbTransactionError"===t.name}
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
 */class Mn{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.ue(t),this.ce=t=>e.writeSequenceNumber(t))}ue(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ce&&this.ce(t),t}}Mn.le=-1;function Vn(t){return null==t}function Fn(t){return 0===t&&1/t==-1/0}function Un(t,e){let n=e;const s=t.length;for(let r=0;r<s;r++){const e=t.charAt(r);switch(e){case"\0":n+="";break;case"":n+="";break;default:n+=e}}return n}function Bn(t){return t+""}
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
 */function jn(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function $n(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function qn(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
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
 */class zn{constructor(t,e){this.comparator=t,this.root=e||Gn.EMPTY}insert(t,e){return new zn(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Gn.BLACK,null,null))}remove(t){return new zn(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Gn.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(0===s)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Kn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Kn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Kn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Kn(this.root,t,this.comparator,!0)}}class Kn{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!t.isEmpty();)if(r=e?n(t.key,e):1,e&&s&&(r*=-1),r<0)t=this.isReverse?t.left:t.right;else{if(0===r){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Gn{constructor(t,e,n,s,r){this.key=t,this.value=e,this.color=null!=n?n:Gn.RED,this.left=null!=s?s:Gn.EMPTY,this.right=null!=r?r:Gn.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,r){return new Gn(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=s?s:this.left,null!=r?r:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const r=n(t,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(t,e,n),null):0===r?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Gn.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),0===e(t,s.key)){if(s.right.isEmpty())return Gn.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Gn.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Gn.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw We(43730,{key:this.key,value:this.value});if(this.right.isRed())throw We(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw We(27949);return t+(this.isRed()?0:1)}}Gn.EMPTY=null,Gn.RED=!0,Gn.BLACK=!1,Gn.EMPTY=new class{constructor(){this.size=0}get key(){throw We(57766)}get value(){throw We(16141)}get color(){throw We(16727)}get left(){throw We(29726)}get right(){throw We(36894)}copy(t,e,n,s,r){return this}insert(t,e,n){return new Gn(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class Hn{constructor(t){this.comparator=t,this.data=new zn(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Qn(this.data.getIterator())}getIteratorFrom(t){return new Qn(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(t=>{e=e.add(t)}),e}isEqual(t){if(!(t instanceof Hn))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,s=n.getNext().key;if(0!==this.comparator(t,s))return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new Hn(this.comparator);return e.data=t,e}}class Qn{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
 */class Wn{constructor(t){this.fields=t,t.sort(An.comparator)}static empty(){return new Wn([])}unionWith(t){let e=new Hn(An.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Wn(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return vn(this.fields,t.fields,(t,e)=>t.isEqual(e))}}
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
 */class Yn extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
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
 */class Xn{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(t){try{return atob(t)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new Yn("Invalid base64 string: "+e):e}}(t);return new Xn(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new Xn(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return pn(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Xn.EMPTY_BYTE_STRING=new Xn("");const Jn=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Zn(t){if(Xe(!!t,39018),"string"==typeof t){let e=0;const n=Jn.exec(t);if(Xe(!!n,46558,{timestamp:t}),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:ts(t.seconds),nanos:ts(t.nanos)}}function ts(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function es(t){return"string"==typeof t?Xn.fromBase64String(t):Xn.fromUint8Array(t)}
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
 */const ns="server_timestamp",ss="__type__",rs="__previous_value__",is="__local_write_time__";function os(t){var e,n;return(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{})[ss])||void 0===n?void 0:n.stringValue)===ns}function as(t){const e=t.mapValue.fields[rs];return os(e)?as(e):e}function cs(t){const e=Zn(t.mapValue.fields[is].timestampValue);return new En(e.seconds,e.nanos)}
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
 */class ls{constructor(t,e,n,s,r,i,o,a,c){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=r,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c}}const us="(default)";class hs{constructor(t,e){this.projectId=t,this.database=e||us}static empty(){return new hs("","")}get isDefaultDatabase(){return this.database===us}isEqual(t){return t instanceof hs&&t.projectId===this.projectId&&t.database===this.database}}
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
 */const ds="__type__",fs="__max__",ps={},ms="__vector__",gs="value";function ys(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?os(t)?4:function(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===fs}
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
 */(t)?9007199254740991:function(t){var e,n;return(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{})[ds])||void 0===n?void 0:n.stringValue)===ms}(t)?10:11:We(28295,{value:t})}function vs(t,e){if(t===e)return!0;const n=ys(t);if(n!==ys(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return cs(t).isEqual(cs(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=Zn(t.timestampValue),s=Zn(e.timestampValue);return n.seconds===s.seconds&&n.nanos===s.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return s=e,es(t.bytesValue).isEqual(es(s.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return ts(t.geoPointValue.latitude)===ts(e.geoPointValue.latitude)&&ts(t.geoPointValue.longitude)===ts(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return ts(t.integerValue)===ts(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=ts(t.doubleValue),s=ts(e.doubleValue);return n===s?Fn(n)===Fn(s):isNaN(n)&&isNaN(s)}return!1}(t,e);case 9:return vn(t.arrayValue.values||[],e.arrayValue.values||[],vs);case 10:case 11:return function(t,e){const n=t.mapValue.fields||{},s=e.mapValue.fields||{};if(jn(n)!==jn(s))return!1;for(const r in n)if(n.hasOwnProperty(r)&&(void 0===s[r]||!vs(n[r],s[r])))return!1;return!0}(t,e);default:return We(52216,{left:t})}var s}function ws(t,e){return void 0!==(t.values||[]).find(t=>vs(t,e))}function bs(t,e){if(t===e)return 0;const n=ys(t),s=ys(e);if(n!==s)return pn(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return pn(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=ts(t.integerValue||t.doubleValue),s=ts(e.integerValue||e.doubleValue);return n<s?-1:n>s?1:n===s?0:isNaN(n)?isNaN(s)?0:-1:1}(t,e);case 3:return Es(t.timestampValue,e.timestampValue);case 4:return Es(cs(t),cs(e));case 5:return mn(t.stringValue,e.stringValue);case 6:return function(t,e){const n=es(t),s=es(e);return n.compareTo(s)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),s=e.split("/");for(let r=0;r<n.length&&r<s.length;r++){const t=pn(n[r],s[r]);if(0!==t)return t}return pn(n.length,s.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=pn(ts(t.latitude),ts(e.latitude));return 0!==n?n:pn(ts(t.longitude),ts(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return _s(t.arrayValue,e.arrayValue);case 10:return function(t,e){var n,s,r,i;const o=t.fields||{},a=e.fields||{},c=null===(n=o[gs])||void 0===n?void 0:n.arrayValue,l=null===(s=a[gs])||void 0===s?void 0:s.arrayValue,u=pn((null===(r=null==c?void 0:c.values)||void 0===r?void 0:r.length)||0,(null===(i=null==l?void 0:l.values)||void 0===i?void 0:i.length)||0);return 0!==u?u:_s(c,l)}(t.mapValue,e.mapValue);case 11:return function(t,e){if(t===ps&&e===ps)return 0;if(t===ps)return 1;if(e===ps)return-1;const n=t.fields||{},s=Object.keys(n),r=e.fields||{},i=Object.keys(r);s.sort(),i.sort();for(let o=0;o<s.length&&o<i.length;++o){const t=mn(s[o],i[o]);if(0!==t)return t;const e=bs(n[s[o]],r[i[o]]);if(0!==e)return e}return pn(s.length,i.length)}(t.mapValue,e.mapValue);default:throw We(23264,{Pe:n})}}function Es(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return pn(t,e);const n=Zn(t),s=Zn(e),r=pn(n.seconds,s.seconds);return 0!==r?r:pn(n.nanos,s.nanos)}function _s(t,e){const n=t.values||[],s=e.values||[];for(let r=0;r<n.length&&r<s.length;++r){const t=bs(n[r],s[r]);if(t)return t}return pn(n.length,s.length)}function Ts(t){return Ss(t)}function Ss(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=Zn(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?es(t.bytesValue).toBase64():"referenceValue"in t?function(t){return kn.fromName(t).toString()}(t.referenceValue):"geoPointValue"in t?function(t){return`geo(${t.latitude},${t.longitude})`}(t.geoPointValue):"arrayValue"in t?function(t){let e="[",n=!0;for(const s of t.values||[])n?n=!1:e+=",",e+=Ss(s);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",s=!0;for(const r of e)s?s=!1:n+=",",n+=`${r}:${Ss(t.fields[r])}`;return n+"}"}(t.mapValue):We(61005,{value:t})}function Cs(t){switch(ys(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=as(t);return e?16+Cs(e):16;case 5:return 2*t.stringValue.length;case 6:return es(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(t.arrayValue.values||[]).reduce((t,e)=>t+Cs(e),0);case 10:case 11:return function(t){let e=0;return $n(t.fields,(t,n)=>{e+=t.length+Cs(n)}),e}(t.mapValue);default:throw We(13486,{value:t})}}function Is(t){return!!t&&"integerValue"in t}function As(t){return!!t&&"arrayValue"in t}function ks(t){return!!t&&"nullValue"in t}function Ds(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ns(t){return!!t&&"mapValue"in t}function xs(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return $n(t.mapValue.fields,(t,n)=>e.mapValue.fields[t]=xs(n)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=xs(t.arrayValue.values[n]);return e}return Object.assign({},t)}class Rs{constructor(t){this.value=t}static empty(){return new Rs({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Ns(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=xs(e)}setAll(t){let e=An.emptyPath(),n={},s=[];t.forEach((t,r)=>{if(!e.isImmediateParentOf(r)){const t=this.getFieldsMap(e);this.applyChanges(t,n,s),n={},s=[],e=r.popLast()}t?n[r.lastSegment()]=xs(t):s.push(r.lastSegment())});const r=this.getFieldsMap(e);this.applyChanges(r,n,s)}delete(t){const e=this.field(t.popLast());Ns(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return vs(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];Ns(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){$n(e,(e,n)=>t[e]=n);for(const s of n)delete t[s]}clone(){return new Rs(xs(this.value))}}function Ls(t){const e=[];return $n(t.fields,(t,n)=>{const s=new An([t]);if(Ns(n)){const t=Ls(n.mapValue).fields;if(0===t.length)e.push(s);else for(const n of t)e.push(s.child(n))}else e.push(s)}),new Wn(e)
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
 */}class Os{constructor(t,e,n,s,r,i,o){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=r,this.data=i,this.documentState=o}static newInvalidDocument(t){return new Os(t,0,_n.min(),_n.min(),_n.min(),Rs.empty(),0)}static newFoundDocument(t,e,n,s){return new Os(t,1,e,_n.min(),n,s,0)}static newNoDocument(t,e){return new Os(t,2,e,_n.min(),_n.min(),Rs.empty(),0)}static newUnknownDocument(t,e){return new Os(t,3,e,_n.min(),_n.min(),Rs.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(_n.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Rs.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Rs.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=_n.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof Os&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Os(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class Ps{constructor(t,e){this.position=t,this.inclusive=e}}function Ms(t,e,n){let s=0;for(let r=0;r<t.position.length;r++){const i=e[r],o=t.position[r];if(s=i.field.isKeyField()?kn.comparator(kn.fromName(o.referenceValue),n.key):bs(o,n.data.field(i.field)),"desc"===i.dir&&(s*=-1),0!==s)break}return s}function Vs(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!vs(t.position[n],e.position[n]))return!1;return!0}
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
 */class Fs{constructor(t,e="asc"){this.field=t,this.dir=e}}function Us(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}
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
 */class Bs{}class js extends Bs{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.createKeyFieldInFilter(t,e,n):new Qs(t,e,n):"array-contains"===e?new Js(t,n):"in"===e?new Zs(t,n):"not-in"===e?new tr(t,n):"array-contains-any"===e?new er(t,n):new js(t,e,n)}static createKeyFieldInFilter(t,e,n){return"in"===e?new Ws(t,n):new Ys(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&void 0===e.nullValue&&this.matchesComparison(bs(e,this.value)):null!==e&&ys(this.value)===ys(e)&&this.matchesComparison(bs(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return We(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class $s extends Bs{constructor(t,e){super(),this.filters=t,this.op=e,this.Te=null}static create(t,e){return new $s(t,e)}matches(t){return qs(this)?void 0===this.filters.find(e=>!e.matches(t)):void 0!==this.filters.find(e=>e.matches(t))}getFlattenedFilters(){return null!==this.Te||(this.Te=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function qs(t){return"and"===t.op}function zs(t){return function(t){for(const e of t.filters)if(e instanceof $s)return!1;return!0}(t)&&qs(t)}function Ks(t){if(t instanceof js)return t.field.canonicalString()+t.op.toString()+Ts(t.value);if(zs(t))return t.filters.map(t=>Ks(t)).join(",");{const e=t.filters.map(t=>Ks(t)).join(",");return`${t.op}(${e})`}}function Gs(t,e){return t instanceof js?(n=t,(s=e)instanceof js&&n.op===s.op&&n.field.isEqual(s.field)&&vs(n.value,s.value)):t instanceof $s?function(t,e){return e instanceof $s&&t.op===e.op&&t.filters.length===e.filters.length&&t.filters.reduce((t,n,s)=>t&&Gs(n,e.filters[s]),!0)}(t,e):void We(19439);var n,s}function Hs(t){return t instanceof js?`${(e=t).field.canonicalString()} ${e.op} ${Ts(e.value)}`:t instanceof $s?function(t){return t.op.toString()+" {"+t.getFilters().map(Hs).join(" ,")+"}"}(t):"Filter";var e}class Qs extends js{constructor(t,e,n){super(t,e,n),this.key=kn.fromName(n.referenceValue)}matches(t){const e=kn.comparator(t.key,this.key);return this.matchesComparison(e)}}class Ws extends js{constructor(t,e){super(t,"in",e),this.keys=Xs("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Ys extends js{constructor(t,e){super(t,"not-in",e),this.keys=Xs("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Xs(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map(t=>kn.fromName(t.referenceValue))}class Js extends js{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return As(e)&&ws(e.arrayValue,this.value)}}class Zs extends js{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&ws(this.value.arrayValue,e)}}class tr extends js{constructor(t,e){super(t,"not-in",e)}matches(t){if(ws(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&void 0===e.nullValue&&!ws(this.value.arrayValue,e)}}class er extends js{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!As(e)||!e.arrayValue.values)&&e.arrayValue.values.some(t=>ws(this.value.arrayValue,t))}}
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
 */class nr{constructor(t,e=null,n=[],s=[],r=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=r,this.startAt=i,this.endAt=o,this.Ie=null}}function sr(t,e=null,n=[],s=[],r=null,i=null,o=null){return new nr(t,e,n,s,r,i,o)}function rr(t){const e=Je(t);if(null===e.Ie){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(t=>Ks(t)).join(","),t+="|ob:",t+=e.orderBy.map(t=>{return(e=t).field.canonicalString()+e.dir;var e}).join(","),Vn(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(t=>Ts(t)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(t=>Ts(t)).join(",")),e.Ie=t}return e.Ie}function ir(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Us(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Gs(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Vs(t.startAt,e.startAt)&&Vs(t.endAt,e.endAt)}function or(t){return kn.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}
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
 */class ar{constructor(t,e=null,n=[],s=[],r=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=r,this.limitType=i,this.startAt=o,this.endAt=a,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function cr(t){return new ar(t)}function lr(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}function ur(t){const e=Je(t);if(null===e.Ee){e.Ee=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ee.push(s),t.add(s.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(t){let e=new Hn(An.comparator);return t.filters.forEach(t=>{t.getFlattenedFilters().forEach(t=>{t.isInequality()&&(e=e.add(t.field))})}),e})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ee.push(new Fs(s,n))}),t.has(An.keyField().canonicalString())||e.Ee.push(new Fs(An.keyField(),n))}return e.Ee}function hr(t){const e=Je(t);return e.de||(e.de=function(t,e){if("F"===t.limitType)return sr(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(t=>{const e="desc"===t.dir?"asc":"desc";return new Fs(t.field,e)});const n=t.endAt?new Ps(t.endAt.position,t.endAt.inclusive):null,s=t.startAt?new Ps(t.startAt.position,t.startAt.inclusive):null;return sr(t.path,t.collectionGroup,e,t.filters,t.limit,n,s)}}(e,ur(t))),e.de}function dr(t,e,n){return new ar(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function fr(t,e){return ir(hr(t),hr(e))&&t.limitType===e.limitType}function pr(t){return`${rr(hr(t))}|lt:${t.limitType}`}function mr(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map(t=>Hs(t)).join(", ")}]`),Vn(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map(t=>{return`${(e=t).field.canonicalString()} (${e.dir})`;var e}).join(", ")}]`),t.startAt&&(e+=", startAt: ",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(t=>Ts(t)).join(",")),t.endAt&&(e+=", endAt: ",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(t=>Ts(t)).join(",")),`Target(${e})`}(hr(t))}; limitType=${t.limitType})`}function gr(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):kn.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of ur(t))if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&(s=e,!((n=t).startAt&&!function(t,e,n){const s=Ms(t,e,n);return t.inclusive?s<=0:s<0}(n.startAt,ur(n),s)||n.endAt&&!function(t,e,n){const s=Ms(t,e,n);return t.inclusive?s>=0:s>0}(n.endAt,ur(n),s)));var n,s}function yr(t){return(e,n)=>{let s=!1;for(const r of ur(t)){const t=vr(r,e,n);if(0!==t)return t;s=s||r.field.isKeyField()}return 0}}function vr(t,e,n){const s=t.field.isKeyField()?kn.comparator(e.key,n.key):function(t,e,n){const s=e.data.field(t),r=n.data.field(t);return null!==s&&null!==r?bs(s,r):We(42886)}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return We(19790,{direction:t.dir})}}
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
 */class wr{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[s,r]of n)if(this.equalsFn(s,t))return r}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(void 0===s)return this.inner[n]=[[t,e]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],t))return void(s[r]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return 1===n.length?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){$n(this.inner,(e,n)=>{for(const[s,r]of n)t(s,r)})}isEmpty(){return qn(this.inner)}size(){return this.innerSize}}
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
 */const br=new zn(kn.comparator);function Er(){return br}const _r=new zn(kn.comparator);function Tr(...t){let e=_r;for(const n of t)e=e.insert(n.key,n);return e}function Sr(t){let e=_r;return t.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function Cr(){return Ar()}function Ir(){return Ar()}function Ar(){return new wr(t=>t.toString(),(t,e)=>t.isEqual(e))}const kr=new zn(kn.comparator),Dr=new Hn(kn.comparator);function Nr(...t){let e=Dr;for(const n of t)e=e.add(n);return e}const xr=new Hn(pn);
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
function Rr(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Fn(e)?"-0":e}}function Lr(t){return{integerValue:""+t}}function Or(t,e){return function(t){return"number"==typeof t&&Number.isInteger(t)&&!Fn(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
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
 */(e)?Lr(e):Rr(t,e)}
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
 */class Pr{constructor(){this._=void 0}}function Mr(t,e,n){return t instanceof Ur?function(t,e){const n={fields:{[ss]:{stringValue:ns},[is]:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&os(e)&&(e=as(e)),e&&(n.fields[rs]=e),{mapValue:n}}(n,e):t instanceof Br?jr(t,e):t instanceof $r?qr(t,e):function(t,e){const n=Fr(t,e),s=Kr(n)+Kr(t.Re);return Is(n)&&Is(t.Re)?Lr(s):Rr(t.serializer,s)}(t,e)}function Vr(t,e,n){return t instanceof Br?jr(t,e):t instanceof $r?qr(t,e):n}function Fr(t,e){return t instanceof zr?Is(n=e)||(s=n)&&"doubleValue"in s?e:{integerValue:0}:null;var n,s}class Ur extends Pr{}class Br extends Pr{constructor(t){super(),this.elements=t}}function jr(t,e){const n=Gr(e);for(const s of t.elements)n.some(t=>vs(t,s))||n.push(s);return{arrayValue:{values:n}}}class $r extends Pr{constructor(t){super(),this.elements=t}}function qr(t,e){let n=Gr(e);for(const s of t.elements)n=n.filter(t=>!vs(t,s));return{arrayValue:{values:n}}}class zr extends Pr{constructor(t,e){super(),this.serializer=t,this.Re=e}}function Kr(t){return ts(t.integerValue||t.doubleValue)}function Gr(t){return As(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
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
 */class Hr{constructor(t,e){this.field=t,this.transform=e}}class Qr{constructor(t,e){this.version=t,this.transformResults=e}}class Wr{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Wr}static exists(t){return new Wr(void 0,t)}static updateTime(t){return new Wr(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Yr(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class Xr{}function Jr(t,e){if(!t.hasLocalMutations||e&&0===e.fields.length)return null;if(null===e)return t.isNoDocument()?new ci(t.key,Wr.none()):new si(t.key,t.data,Wr.none());{const n=t.data,s=Rs.empty();let r=new Hn(An.comparator);for(let t of e.fields)if(!r.has(t)){let e=n.field(t);null===e&&t.length>1&&(t=t.popLast(),e=n.field(t)),null===e?s.delete(t):s.set(t,e),r=r.add(t)}return new ri(t.key,s,new Wn(r.toArray()),Wr.none())}}function Zr(t,e,n){var s;t instanceof si?function(t,e,n){const s=t.value.clone(),r=oi(t.fieldTransforms,e,n.transformResults);s.setAll(r),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):t instanceof ri?function(t,e,n){if(!Yr(t.precondition,e))return void e.convertToUnknownDocument(n.version);const s=oi(t.fieldTransforms,e,n.transformResults),r=e.data;r.setAll(ii(t)),r.setAll(s),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):(s=n,e.convertToNoDocument(s.version).setHasCommittedMutations())}function ti(t,e,n,s){return t instanceof si?function(t,e,n,s){if(!Yr(t.precondition,e))return n;const r=t.value.clone(),i=ai(t.fieldTransforms,s,e);return r.setAll(i),e.convertToFoundDocument(e.version,r).setHasLocalMutations(),null}(t,e,n,s):t instanceof ri?function(t,e,n,s){if(!Yr(t.precondition,e))return n;const r=ai(t.fieldTransforms,s,e),i=e.data;return i.setAll(ii(t)),i.setAll(r),e.convertToFoundDocument(e.version,i).setHasLocalMutations(),null===n?null:n.unionWith(t.fieldMask.fields).unionWith(t.fieldTransforms.map(t=>t.field))}(t,e,n,s):(r=e,i=n,Yr(t.precondition,r)?(r.convertToNoDocument(r.version).setHasLocalMutations(),null):i);var r,i}function ei(t,e){let n=null;for(const s of t.fieldTransforms){const t=e.data.field(s.field),r=Fr(s.transform,t||null);null!=r&&(null===n&&(n=Rs.empty()),n.set(s.field,r))}return n||null}function ni(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&(n=t.fieldTransforms,s=e.fieldTransforms,!!(void 0===n&&void 0===s||n&&s&&vn(n,s,(t,e)=>function(t,e){return t.field.isEqual(e.field)&&(n=t.transform,s=e.transform,n instanceof Br&&s instanceof Br||n instanceof $r&&s instanceof $r?vn(n.elements,s.elements,vs):n instanceof zr&&s instanceof zr?vs(n.Re,s.Re):n instanceof Ur&&s instanceof Ur);var n,s}(t,e)))&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask)));var n,s}class si extends Xr{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ri extends Xr{constructor(t,e,n,s,r=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function ii(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function oi(t,e,n){const s=new Map;Xe(t.length===n.length,32656,{Ve:n.length,me:t.length});for(let r=0;r<n.length;r++){const i=t[r],o=i.transform,a=e.data.field(i.field);s.set(i.field,Vr(o,a,n[r]))}return s}function ai(t,e,n){const s=new Map;for(const r of t){const t=r.transform,i=n.data.field(r.field);s.set(r.field,Mr(t,i,e))}return s}class ci extends Xr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class li extends Xr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
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
 */class ui{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const e=this.mutations[s];e.key.isEqual(t.key)&&Zr(e,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=ti(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=ti(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Ir();return this.mutations.forEach(s=>{const r=t.get(s.key),i=r.overlayedDocument;let o=this.applyToLocalView(i,r.mutatedFields);o=e.has(s.key)?null:o;const a=Jr(i,o);null!==a&&n.set(s.key,a),i.isValidDocument()||i.convertToNoDocument(_n.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),Nr())}isEqual(t){return this.batchId===t.batchId&&vn(this.mutations,t.mutations,(t,e)=>ni(t,e))&&vn(this.baseMutations,t.baseMutations,(t,e)=>ni(t,e))}}class hi{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){Xe(t.mutations.length===n.length,58842,{fe:t.mutations.length,ge:n.length});let s=function(){return kr}();const r=t.mutations;for(let i=0;i<r.length;i++)s=s.insert(r[i].key,n[i].version);return new hi(t,e,n,s)}}
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
 */class di{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return null!==t&&this.mutation===t.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
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
 */class fi{constructor(t,e){this.count=t,this.unchangedNames=e}}
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
 */var pi,mi;function gi(t){if(void 0===t)return Ge("GRPC error has no .code"),Ze.UNKNOWN;switch(t){case pi.OK:return Ze.OK;case pi.CANCELLED:return Ze.CANCELLED;case pi.UNKNOWN:return Ze.UNKNOWN;case pi.DEADLINE_EXCEEDED:return Ze.DEADLINE_EXCEEDED;case pi.RESOURCE_EXHAUSTED:return Ze.RESOURCE_EXHAUSTED;case pi.INTERNAL:return Ze.INTERNAL;case pi.UNAVAILABLE:return Ze.UNAVAILABLE;case pi.UNAUTHENTICATED:return Ze.UNAUTHENTICATED;case pi.INVALID_ARGUMENT:return Ze.INVALID_ARGUMENT;case pi.NOT_FOUND:return Ze.NOT_FOUND;case pi.ALREADY_EXISTS:return Ze.ALREADY_EXISTS;case pi.PERMISSION_DENIED:return Ze.PERMISSION_DENIED;case pi.FAILED_PRECONDITION:return Ze.FAILED_PRECONDITION;case pi.ABORTED:return Ze.ABORTED;case pi.OUT_OF_RANGE:return Ze.OUT_OF_RANGE;case pi.UNIMPLEMENTED:return Ze.UNIMPLEMENTED;case pi.DATA_LOSS:return Ze.DATA_LOSS;default:return We(39323,{code:t})}}(mi=pi||(pi={}))[mi.OK=0]="OK",mi[mi.CANCELLED=1]="CANCELLED",mi[mi.UNKNOWN=2]="UNKNOWN",mi[mi.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",mi[mi.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",mi[mi.NOT_FOUND=5]="NOT_FOUND",mi[mi.ALREADY_EXISTS=6]="ALREADY_EXISTS",mi[mi.PERMISSION_DENIED=7]="PERMISSION_DENIED",mi[mi.UNAUTHENTICATED=16]="UNAUTHENTICATED",mi[mi.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",mi[mi.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",mi[mi.ABORTED=10]="ABORTED",mi[mi.OUT_OF_RANGE=11]="OUT_OF_RANGE",mi[mi.UNIMPLEMENTED=12]="UNIMPLEMENTED",mi[mi.INTERNAL=13]="INTERNAL",mi[mi.UNAVAILABLE=14]="UNAVAILABLE",mi[mi.DATA_LOSS=15]="DATA_LOSS";
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
const yi=new Ae([4294967295,4294967295],0);function vi(t){const e=dn().encode(t),n=new ke;return n.update(e),new Uint8Array(n.digest())}function wi(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Ae([n,s],0),new Ae([r,i],0)]}class bi{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new Ei(`Invalid padding: ${e}`);if(n<0)throw new Ei(`Invalid hash count: ${n}`);if(t.length>0&&0===this.hashCount)throw new Ei(`Invalid hash count: ${n}`);if(0===t.length&&0!==e)throw new Ei(`Invalid padding when bitmap length is 0: ${e}`);this.pe=8*t.length-e,this.ye=Ae.fromNumber(this.pe)}we(t,e,n){let s=t.add(e.multiply(Ae.fromNumber(n)));return 1===s.compare(yi)&&(s=new Ae([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(0===this.pe)return!1;const e=vi(t),[n,s]=wi(e);for(let r=0;r<this.hashCount;r++){const t=this.we(n,s,r);if(!this.be(t))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,r=new Uint8Array(Math.ceil(t/8)),i=new bi(r,s,e);return n.forEach(t=>i.insert(t)),i}insert(t){if(0===this.pe)return;const e=vi(t),[n,s]=wi(e);for(let r=0;r<this.hashCount;r++){const t=this.we(n,s,r);this.Se(t)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class Ei extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
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
 */class _i{constructor(t,e,n,s,r){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,Ti.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new _i(_n.min(),s,new zn(pn),Er(),Nr())}}class Ti{constructor(t,e,n,s,r){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Ti(n,e,Nr(),Nr(),Nr())}}
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
 */class Si{constructor(t,e,n,s){this.De=t,this.removedTargetIds=e,this.key=n,this.ve=s}}class Ci{constructor(t,e){this.targetId=t,this.Ce=e}}class Ii{constructor(t,e,n=Xn.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class Ai{constructor(){this.Fe=0,this.Me=Ni(),this.xe=Xn.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return 0!==this.Fe}get Le(){return this.Ne}ke(t){t.approximateByteSize()>0&&(this.Ne=!0,this.xe=t)}qe(){let t=Nr(),e=Nr(),n=Nr();return this.Me.forEach((s,r)=>{switch(r){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:We(38017,{changeType:r})}}),new Ti(this.xe,this.Oe,t,e,n)}Qe(){this.Ne=!1,this.Me=Ni()}$e(t,e){this.Ne=!0,this.Me=this.Me.insert(t,e)}Ue(t){this.Ne=!0,this.Me=this.Me.remove(t)}Ke(){this.Fe+=1}We(){this.Fe-=1,Xe(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class ki{constructor(t){this.ze=t,this.je=new Map,this.He=Er(),this.Je=Di(),this.Ye=Di(),this.Ze=new zn(pn)}Xe(t){for(const e of t.De)t.ve&&t.ve.isFoundDocument()?this.et(e,t.ve):this.tt(e,t.key,t.ve);for(const e of t.removedTargetIds)this.tt(e,t.key,t.ve)}nt(t){this.forEachTarget(t,e=>{const n=this.rt(e);switch(t.state){case 0:this.it(e)&&n.ke(t.resumeToken);break;case 1:n.We(),n.Be||n.Qe(),n.ke(t.resumeToken);break;case 2:n.We(),n.Be||this.removeTarget(e);break;case 3:this.it(e)&&(n.Ge(),n.ke(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),n.ke(t.resumeToken));break;default:We(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach((t,n)=>{this.it(n)&&e(n)})}ot(t){const e=t.targetId,n=t.Ce.count,s=this._t(e);if(s){const r=s.target;if(or(r))if(0===n){const t=new kn(r.path);this.tt(e,t,Os.newNoDocument(t,_n.min()))}else Xe(1===n,20013,{expectedCount:n});else{const s=this.ut(e);if(s!==n){const n=this.ct(t),r=n?this.lt(n,t,s):1;if(0!==r){this.st(e);const t=2===r?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,t)}}}}}ct(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:r=0}=e;let i,o;try{i=es(n).toUint8Array()}catch(a){if(a instanceof Yn)return He("Decoding the base64 bloom filter in existence filter failed ("+a.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw a}try{o=new bi(i,s,r)}catch(a){return He(a instanceof Ei?"BloomFilter error: ":"Applying bloom filter failed: ",a),null}return 0===o.pe?null:o}lt(t,e,n){return e.Ce.count===n-this.Tt(t,e.targetId)?0:2}Tt(t,e){const n=this.ze.getRemoteKeysForTarget(e);let s=0;return n.forEach(n=>{const r=this.ze.Pt(),i=`projects/${r.projectId}/databases/${r.database}/documents/${n.path.canonicalString()}`;t.mightContain(i)||(this.tt(e,n,null),s++)}),s}It(t){const e=new Map;this.je.forEach((n,s)=>{const r=this._t(s);if(r){if(n.current&&or(r.target)){const e=new kn(r.target.path);this.Et(e).has(s)||this.dt(s,e)||this.tt(s,e,Os.newNoDocument(e,t))}n.Le&&(e.set(s,n.qe()),n.Qe())}});let n=Nr();this.Ye.forEach((t,e)=>{let s=!0;e.forEachWhile(t=>{const e=this._t(t);return!e||"TargetPurposeLimboResolution"===e.purpose||(s=!1,!1)}),s&&(n=n.add(t))}),this.He.forEach((e,n)=>n.setReadTime(t));const s=new _i(t,e,this.Ze,this.He,n);return this.He=Er(),this.Je=Di(),this.Ye=Di(),this.Ze=new zn(pn),s}et(t,e){if(!this.it(t))return;const n=this.dt(t,e.key)?2:0;this.rt(t).$e(e.key,n),this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.Ye=this.Ye.insert(e.key,this.At(e.key).add(t))}tt(t,e,n){if(!this.it(t))return;const s=this.rt(t);this.dt(t,e)?s.$e(e,1):s.Ue(e),this.Ye=this.Ye.insert(e,this.At(e).delete(t)),this.Ye=this.Ye.insert(e,this.At(e).add(t)),n&&(this.He=this.He.insert(e,n))}removeTarget(t){this.je.delete(t)}ut(t){const e=this.rt(t).qe();return this.ze.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ke(t){this.rt(t).Ke()}rt(t){let e=this.je.get(t);return e||(e=new Ai,this.je.set(t,e)),e}At(t){let e=this.Ye.get(t);return e||(e=new Hn(pn),this.Ye=this.Ye.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new Hn(pn),this.Je=this.Je.insert(t,e)),e}it(t){const e=null!==this._t(t);return e||Ke("WatchChangeAggregator","Detected inactive target",t),e}_t(t){const e=this.je.get(t);return e&&e.Be?null:this.ze.Rt(t)}st(t){this.je.set(t,new Ai),this.ze.getRemoteKeysForTarget(t).forEach(e=>{this.tt(t,e,null)})}dt(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function Di(){return new zn(kn.comparator)}function Ni(){return new zn(kn.comparator)}const xi=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),Ri=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Li=(()=>({and:"AND",or:"OR"}))();class Oi{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Pi(t,e){return t.useProto3Json||Vn(e)?e:{value:e}}function Mi(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Vi(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Fi(t,e){return Mi(t,e.toTimestamp())}function Ui(t){return Xe(!!t,49232),_n.fromTimestamp(function(t){const e=Zn(t);return new En(e.seconds,e.nanos)}(t))}function Bi(t,e){return ji(t,e).canonicalString()}function ji(t,e){const n=(s=t,new Cn(["projects",s.projectId,"databases",s.database])).child("documents");var s;return void 0===e?n:n.child(e)}function $i(t){const e=Cn.fromString(t);return Xe(oo(e),10190,{key:e.toString()}),e}function qi(t,e){return Bi(t.databaseId,e.path)}function zi(t,e){const n=$i(e);if(n.get(1)!==t.databaseId.projectId)throw new tn(Ze.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new tn(Ze.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new kn(Hi(n))}function Ki(t,e){return Bi(t.databaseId,e)}function Gi(t){return new Cn(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Hi(t){return Xe(t.length>4&&"documents"===t.get(4),29091,{key:t.toString()}),t.popFirst(5)}function Qi(t,e,n){return{name:qi(t,e),fields:n.value.mapValue.fields}}function Wi(t,e){return{documents:[Ki(t,e.path)]}}function Yi(t,e){const n={structuredQuery:{}},s=e.path;let r;null!==e.collectionGroup?(r=s,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=s.popLast(),n.structuredQuery.from=[{collectionId:s.lastSegment()}]),n.parent=Ki(t,r);const i=function(t){if(0!==t.length)return ro($s.create(t,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(t){if(0!==t.length)return t.map(t=>{return{field:no((e=t).field),direction:Zi(e.dir)};var e})}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Pi(t,e.limit);return null!==a&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt={before:(c=e.startAt).inclusive,values:c.position}),e.endAt&&(n.structuredQuery.endAt=function(t){return{before:!t.inclusive,values:t.position}}(e.endAt)),{gt:n,parent:r};var c}function Xi(t){let e=function(t){const e=$i(t);return 4===e.length?Cn.emptyPath():Hi(e)}(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){Xe(1===s,65062);const t=n.from[0];t.allDescendants?r=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=function(t){const e=Ji(t);return e instanceof $s&&zs(e)?e.getFilters():[e]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(t=>{return new Fs(so((e=t).field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction));var e}));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,Vn(e)?null:e}(n.limit));let c=null;n.startAt&&(c=function(t){const e=!!t.before,n=t.values||[];return new Ps(n,e)}(n.startAt));let l=null;return n.endAt&&(l=function(t){const e=!t.before,n=t.values||[];return new Ps(n,e)}(n.endAt)),function(t,e,n,s,r,i,o,a){return new ar(t,e,n,s,r,i,o,a)}(e,r,o,i,a,"F",c,l)}function Ji(t){return void 0!==t.unaryFilter?function(t){switch(t.unaryFilter.op){case"IS_NAN":const e=so(t.unaryFilter.field);return js.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=so(t.unaryFilter.field);return js.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=so(t.unaryFilter.field);return js.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const r=so(t.unaryFilter.field);return js.create(r,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return We(61313);default:return We(60726)}}(t):void 0!==t.fieldFilter?(e=t,js.create(so(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return We(58110);default:return We(50506)}}(e.fieldFilter.op),e.fieldFilter.value)):void 0!==t.compositeFilter?function(t){return $s.create(t.compositeFilter.filters.map(t=>Ji(t)),function(t){switch(t){case"AND":return"and";case"OR":return"or";default:return We(1026)}}(t.compositeFilter.op))}(t):We(30097,{filter:t});var e}function Zi(t){return xi[t]}function to(t){return Ri[t]}function eo(t){return Li[t]}function no(t){return{fieldPath:t.canonicalString()}}function so(t){return An.fromServerFormat(t.fieldPath)}function ro(t){return t instanceof js?function(t){if("=="===t.op){if(Ds(t.value))return{unaryFilter:{field:no(t.field),op:"IS_NAN"}};if(ks(t.value))return{unaryFilter:{field:no(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(Ds(t.value))return{unaryFilter:{field:no(t.field),op:"IS_NOT_NAN"}};if(ks(t.value))return{unaryFilter:{field:no(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:no(t.field),op:to(t.op),value:t.value}}}(t):t instanceof $s?function(t){const e=t.getFilters().map(t=>ro(t));return 1===e.length?e[0]:{compositeFilter:{op:eo(t.op),filters:e}}}(t):We(54877,{filter:t})}function io(t){const e=[];return t.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function oo(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
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
 */class ao{constructor(t,e,n,s,r=_n.min(),i=_n.min(),o=Xn.EMPTY_BYTE_STRING,a=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(t){return new ao(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new ao(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new ao(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new ao(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}
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
 */class co{constructor(t){this.wt=t}}function lo(t){const e=Xi({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?dr(e,e.limit,"L"):e}
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
 */class uo{constructor(){this.yn=new ho}addToCollectionParentIndex(t,e){return this.yn.add(e),On.resolve()}getCollectionParents(t,e){return On.resolve(this.yn.getEntries(e))}addFieldIndex(t,e){return On.resolve()}deleteFieldIndex(t,e){return On.resolve()}deleteAllFieldIndexes(t){return On.resolve()}createTargetIndexes(t,e){return On.resolve()}getDocumentsMatchingTarget(t,e){return On.resolve(null)}getIndexType(t,e){return On.resolve(0)}getFieldIndexes(t,e){return On.resolve([])}getNextCollectionGroupToUpdate(t){return On.resolve(null)}getMinOffset(t,e){return On.resolve(Nn.min())}getMinOffsetFromCollectionGroup(t,e){return On.resolve(Nn.min())}updateCollectionGroup(t,e,n){return On.resolve()}updateIndexEntries(t,e){return On.resolve()}}class ho{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new Hn(Cn.comparator),r=!s.has(n);return this.index[e]=s.add(n),r}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new Hn(Cn.comparator)).toArray()}}
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
 */const fo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},po=41943040;class mo{static withCacheSize(t){return new mo(t,mo.DEFAULT_COLLECTION_PERCENTILE,mo.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}
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
 */mo.DEFAULT_COLLECTION_PERCENTILE=10,mo.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,mo.DEFAULT=new mo(po,mo.DEFAULT_COLLECTION_PERCENTILE,mo.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),mo.DISABLED=new mo(-1,0,0);
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
class go{constructor(t){this.nr=t}next(){return this.nr+=2,this.nr}static rr(){return new go(0)}static ir(){return new go(-1)}}
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
 */const yo="LruGarbageCollector";function vo([t,e],[n,s]){const r=pn(t,n);return 0===r?pn(e,s):r}class wo{constructor(t){this.cr=t,this.buffer=new Hn(vo),this.lr=0}hr(){return++this.lr}Pr(t){const e=[t,this.hr()];if(this.buffer.size<this.cr)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();vo(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class bo{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Tr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Ir(6e4)}stop(){this.Tr&&(this.Tr.cancel(),this.Tr=null)}get started(){return null!==this.Tr}Ir(t){Ke(yo,`Garbage collection scheduled in ${t}ms`),this.Tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Pn(t)?Ke(yo,"Ignoring IndexedDB error during garbage collection: ",t):await Ln(t)}await this.Ir(3e5)})}}class Eo{constructor(t,e){this.Er=t,this.params=e}calculateTargetCount(t,e){return this.Er.dr(t).next(t=>Math.floor(e/100*t))}nthSequenceNumber(t,e){if(0===e)return On.resolve(Mn.le);const n=new wo(e);return this.Er.forEachTarget(t,t=>n.Pr(t.sequenceNumber)).next(()=>this.Er.Ar(t,t=>n.Pr(t))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Er.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Er.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(Ke("LruGarbageCollector","Garbage collection skipped; disabled"),On.resolve(fo)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(Ke("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),fo):this.Rr(t,e))}getCacheSize(t){return this.Er.getCacheSize(t)}Rr(t,e){let n,s,r,i,o,a,c;const l=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(e=>(e>this.params.maximumSequenceNumbersToCollect?(Ke("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),s=this.params.maximumSequenceNumbersToCollect):s=e,i=Date.now(),this.nthSequenceNumber(t,s))).next(s=>(n=s,o=Date.now(),this.removeTargets(t,n,e))).next(e=>(r=e,a=Date.now(),this.removeOrphanedDocuments(t,n))).next(t=>(c=Date.now(),ze()<=at.DEBUG&&Ke("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-l}ms\n\tDetermined least recently used ${s} in `+(o-i)+`ms\n\tRemoved ${r} targets in `+(a-o)+`ms\n\tRemoved ${t} documents in `+(c-a)+`ms\nTotal Duration: ${c-l}ms`),On.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:r,documentsRemoved:t})))}}
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
class _o{constructor(){this.changes=new wr(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Os.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?On.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
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
 */class To{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}
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
 */class So{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(n=s,this.remoteDocumentCache.getEntry(t,e))).next(t=>(null!==n&&ti(n.mutation,t,Wn.empty(),En.now()),t))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.getLocalViewOfDocuments(t,e,Nr()).next(()=>e))}getLocalViewOfDocuments(t,e,n=Nr()){const s=Cr();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,n).next(t=>{let e=Tr();return t.forEach((t,n)=>{e=e.insert(t,n.overlayedDocument)}),e}))}getOverlayedDocuments(t,e){const n=Cr();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,Nr()))}populateOverlays(t,e,n){const s=[];return n.forEach(t=>{e.has(t)||s.push(t)}),this.documentOverlayCache.getOverlays(t,s).next(t=>{t.forEach((t,n)=>{e.set(t,n)})})}computeViews(t,e,n,s){let r=Er();const i=Ar(),o=Ar();return e.forEach((t,e)=>{const o=n.get(e.key);s.has(e.key)&&(void 0===o||o.mutation instanceof ri)?r=r.insert(e.key,e):void 0!==o?(i.set(e.key,o.mutation.getFieldMask()),ti(o.mutation,e,o.mutation.getFieldMask(),En.now())):i.set(e.key,Wn.empty())}),this.recalculateAndSaveOverlays(t,r).next(t=>(t.forEach((t,e)=>i.set(t,e)),e.forEach((t,e)=>{var n;return o.set(t,new To(e,null!==(n=i.get(t))&&void 0!==n?n:null))}),o))}recalculateAndSaveOverlays(t,e){const n=Ar();let s=new zn((t,e)=>t-e),r=Nr();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(t=>{for(const r of t)r.keys().forEach(t=>{const i=e.get(t);if(null===i)return;let o=n.get(t)||Wn.empty();o=r.applyToLocalView(i,o),n.set(t,o);const a=(s.get(r.batchId)||Nr()).add(t);s=s.insert(r.batchId,a)})}).next(()=>{const i=[],o=s.getReverseIterator();for(;o.hasNext();){const s=o.getNext(),a=s.key,c=s.value,l=Ir();c.forEach(t=>{if(!r.has(t)){const s=Jr(e.get(t),n.get(t));null!==s&&l.set(t,s),r=r.add(t)}}),i.push(this.documentOverlayCache.saveOverlays(t,a,l))}return On.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.recalculateAndSaveOverlays(t,e))}getDocumentsMatchingQuery(t,e,n,s){return r=e,kn.isDocumentKey(r.path)&&null===r.collectionGroup&&0===r.filters.length?this.getDocumentsMatchingDocumentQuery(t,e.path):function(t){return null!==t.collectionGroup}(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s);var r}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next(r=>{const i=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-r.size):On.resolve(Cr());let o=-1,a=r;return i.next(e=>On.forEach(e,(e,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),r.get(e)?On.resolve():this.remoteDocumentCache.getEntry(t,e).next(t=>{a=a.insert(e,t)}))).next(()=>this.populateOverlays(t,e,r)).next(()=>this.computeViews(t,a,e,Nr())).next(t=>({batchId:o,changes:Sr(t)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new kn(e)).next(t=>{let e=Tr();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e})}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const r=e.collectionGroup;let i=Tr();return this.indexManager.getCollectionParents(t,r).next(o=>On.forEach(o,o=>{const a=(c=e,l=o.child(r),new ar(l,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt));var c,l;return this.getDocumentsMatchingCollectionQuery(t,a,n,s).next(t=>{t.forEach((t,e)=>{i=i.insert(t,e)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(t,e,n,s){let r;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(i=>(r=i,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,r,s))).next(t=>{r.forEach((e,n)=>{const s=n.getKey();null===t.get(s)&&(t=t.insert(s,Os.newInvalidDocument(s)))});let n=Tr();return t.forEach((t,s)=>{const i=r.get(t);void 0!==i&&ti(i.mutation,s,Wn.empty(),En.now()),gr(e,s)&&(n=n.insert(t,s))}),n})}}
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
 */class Co{constructor(t){this.serializer=t,this.Fr=new Map,this.Mr=new Map}getBundleMetadata(t,e){return On.resolve(this.Fr.get(e))}saveBundleMetadata(t,e){return this.Fr.set(e.id,{id:(n=e).id,version:n.version,createTime:Ui(n.createTime)}),On.resolve();var n}getNamedQuery(t,e){return On.resolve(this.Mr.get(e))}saveNamedQuery(t,e){return this.Mr.set(e.name,{name:(n=e).name,query:lo(n.bundledQuery),readTime:Ui(n.readTime)}),On.resolve();var n}}
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
 */class Io{constructor(){this.overlays=new zn(kn.comparator),this.Or=new Map}getOverlay(t,e){return On.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Cr();return On.forEach(e,e=>this.getOverlay(t,e).next(t=>{null!==t&&n.set(e,t)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((n,s)=>{this.St(t,e,s)}),On.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Or.get(n);return void 0!==s&&(s.forEach(t=>this.overlays=this.overlays.remove(t)),this.Or.delete(n)),On.resolve()}getOverlaysForCollection(t,e,n){const s=Cr(),r=e.length+1,i=new kn(e.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const t=o.getNext().value,i=t.getKey();if(!e.isPrefixOf(i.path))break;i.path.length===r&&t.largestBatchId>n&&s.set(t.getKey(),t)}return On.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let r=new zn((t,e)=>t-e);const i=this.overlays.getIterator();for(;i.hasNext();){const t=i.getNext().value;if(t.getKey().getCollectionGroup()===e&&t.largestBatchId>n){let e=r.get(t.largestBatchId);null===e&&(e=Cr(),r=r.insert(t.largestBatchId,e)),e.set(t.getKey(),t)}}const o=Cr(),a=r.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((t,e)=>o.set(t,e)),!(o.size()>=s)););return On.resolve(o)}St(t,e,n){const s=this.overlays.get(n.key);if(null!==s){const t=this.Or.get(s.largestBatchId).delete(n.key);this.Or.set(s.largestBatchId,t)}this.overlays=this.overlays.insert(n.key,new di(e,n));let r=this.Or.get(e);void 0===r&&(r=Nr(),this.Or.set(e,r)),this.Or.set(e,r.add(n.key))}}
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
 */class Ao{constructor(){this.sessionToken=Xn.EMPTY_BYTE_STRING}getSessionToken(t){return On.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,On.resolve()}}
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
 */class ko{constructor(){this.Nr=new Hn(Do.Br),this.Lr=new Hn(Do.kr)}isEmpty(){return this.Nr.isEmpty()}addReference(t,e){const n=new Do(t,e);this.Nr=this.Nr.add(n),this.Lr=this.Lr.add(n)}qr(t,e){t.forEach(t=>this.addReference(t,e))}removeReference(t,e){this.Qr(new Do(t,e))}$r(t,e){t.forEach(t=>this.removeReference(t,e))}Ur(t){const e=new kn(new Cn([])),n=new Do(e,t),s=new Do(e,t+1),r=[];return this.Lr.forEachInRange([n,s],t=>{this.Qr(t),r.push(t.key)}),r}Kr(){this.Nr.forEach(t=>this.Qr(t))}Qr(t){this.Nr=this.Nr.delete(t),this.Lr=this.Lr.delete(t)}Wr(t){const e=new kn(new Cn([])),n=new Do(e,t),s=new Do(e,t+1);let r=Nr();return this.Lr.forEachInRange([n,s],t=>{r=r.add(t.key)}),r}containsKey(t){const e=new Do(t,0),n=this.Nr.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class Do{constructor(t,e){this.key=t,this.Gr=e}static Br(t,e){return kn.comparator(t.key,e.key)||pn(t.Gr,e.Gr)}static kr(t,e){return pn(t.Gr,e.Gr)||kn.comparator(t.key,e.key)}}
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
 */class No{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Jn=1,this.zr=new Hn(Do.Br)}checkEmpty(t){return On.resolve(0===this.mutationQueue.length)}addMutationBatch(t,e,n,s){const r=this.Jn;this.Jn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new ui(r,e,n,s);this.mutationQueue.push(i);for(const o of s)this.zr=this.zr.add(new Do(o.key,r)),this.indexManager.addToCollectionParentIndex(t,o.key.path.popLast());return On.resolve(i)}lookupMutationBatch(t,e){return On.resolve(this.jr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.Hr(n),r=s<0?0:s;return On.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return On.resolve(0===this.mutationQueue.length?-1:this.Jn-1)}getAllMutationBatches(t){return On.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new Do(e,0),s=new Do(e,Number.POSITIVE_INFINITY),r=[];return this.zr.forEachInRange([n,s],t=>{const e=this.jr(t.Gr);r.push(e)}),On.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Hn(pn);return e.forEach(t=>{const e=new Do(t,0),s=new Do(t,Number.POSITIVE_INFINITY);this.zr.forEachInRange([e,s],t=>{n=n.add(t.Gr)})}),On.resolve(this.Jr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let r=n;kn.isDocumentKey(r)||(r=r.child(""));const i=new Do(new kn(r),0);let o=new Hn(pn);return this.zr.forEachWhile(t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===s&&(o=o.add(t.Gr)),!0)},i),On.resolve(this.Jr(o))}Jr(t){const e=[];return t.forEach(t=>{const n=this.jr(t);null!==n&&e.push(n)}),e}removeMutationBatch(t,e){Xe(0===this.Yr(e.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.zr;return On.forEach(e.mutations,s=>{const r=new Do(s.key,e.batchId);return n=n.delete(r),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.zr=n})}Xn(t){}containsKey(t,e){const n=new Do(e,0),s=this.zr.firstAfterOrEqual(n);return On.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,On.resolve()}Yr(t,e){return this.Hr(t)}Hr(t){return 0===this.mutationQueue.length?0:t-this.mutationQueue[0].batchId}jr(t){const e=this.Hr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}
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
 */class xo{constructor(t){this.Zr=t,this.docs=new zn(kn.comparator),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),r=s?s.size:0,i=this.Zr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:i}),this.size+=i-r,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return On.resolve(n?n.document.mutableCopy():Os.newInvalidDocument(e))}getEntries(t,e){let n=Er();return e.forEach(t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.mutableCopy():Os.newInvalidDocument(t))}),On.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let r=Er();const i=e.path,o=new kn(i.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:t,value:{document:o}}=a.getNext();if(!i.isPrefixOf(t.path))break;t.path.length>i.length+1||xn(Dn(o),n)<=0||(s.has(o.key)||gr(e,o))&&(r=r.insert(o.key,o.mutableCopy()))}return On.resolve(r)}getAllFromCollectionGroup(t,e,n,s){We(9500)}Xr(t,e){return On.forEach(this.docs,t=>e(t))}newChangeBuffer(t){return new Ro(this)}getSize(t){return On.resolve(this.size)}}class Ro extends _o{constructor(t){super(),this.vr=t}applyChanges(t){const e=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?e.push(this.vr.addEntry(t,s)):this.vr.removeEntry(n)}),On.waitFor(e)}getFromCache(t,e){return this.vr.getEntry(t,e)}getAllFromCache(t,e){return this.vr.getEntries(t,e)}}
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
 */class Lo{constructor(t){this.persistence=t,this.ei=new wr(t=>rr(t),ir),this.lastRemoteSnapshotVersion=_n.min(),this.highestTargetId=0,this.ti=0,this.ni=new ko,this.targetCount=0,this.ri=go.rr()}forEachTarget(t,e){return this.ei.forEach((t,n)=>e(n)),On.resolve()}getLastRemoteSnapshotVersion(t){return On.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return On.resolve(this.ti)}allocateTargetId(t){return this.highestTargetId=this.ri.next(),On.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ti&&(this.ti=e),On.resolve()}ar(t){this.ei.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ri=new go(e),this.highestTargetId=e),t.sequenceNumber>this.ti&&(this.ti=t.sequenceNumber)}addTargetData(t,e){return this.ar(e),this.targetCount+=1,On.resolve()}updateTargetData(t,e){return this.ar(e),On.resolve()}removeTargetData(t,e){return this.ei.delete(e.target),this.ni.Ur(e.targetId),this.targetCount-=1,On.resolve()}removeTargets(t,e,n){let s=0;const r=[];return this.ei.forEach((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.ei.delete(i),r.push(this.removeMatchingKeysForTargetId(t,o.targetId)),s++)}),On.waitFor(r).next(()=>s)}getTargetCount(t){return On.resolve(this.targetCount)}getTargetData(t,e){const n=this.ei.get(e)||null;return On.resolve(n)}addMatchingKeys(t,e,n){return this.ni.qr(e,n),On.resolve()}removeMatchingKeys(t,e,n){this.ni.$r(e,n);const s=this.persistence.referenceDelegate,r=[];return s&&e.forEach(e=>{r.push(s.markPotentiallyOrphaned(t,e))}),On.waitFor(r)}removeMatchingKeysForTargetId(t,e){return this.ni.Ur(e),On.resolve()}getMatchingKeysForTargetId(t,e){const n=this.ni.Wr(e);return On.resolve(n)}containsKey(t,e){return On.resolve(this.ni.containsKey(e))}}
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
 */class Oo{constructor(t,e){this.ii={},this.overlays={},this.si=new Mn(0),this.oi=!1,this.oi=!0,this._i=new Ao,this.referenceDelegate=t(this),this.ai=new Lo(this),this.indexManager=new uo,this.remoteDocumentCache=new xo(t=>this.referenceDelegate.ui(t)),this.serializer=new co(e),this.ci=new Co(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.oi=!1,Promise.resolve()}get started(){return this.oi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Io,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ii[t.toKey()];return n||(n=new No(e,this.referenceDelegate),this.ii[t.toKey()]=n),n}getGlobalsCache(){return this._i}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.ci}runTransaction(t,e,n){Ke("MemoryPersistence","Starting transaction:",t);const s=new Po(this.si.next());return this.referenceDelegate.li(),n(s).next(t=>this.referenceDelegate.hi(s).next(()=>t)).toPromise().then(t=>(s.raiseOnCommittedEvent(),t))}Pi(t,e){return On.or(Object.values(this.ii).map(n=>()=>n.containsKey(t,e)))}}class Po extends Rn{constructor(t){super(),this.currentSequenceNumber=t}}class Mo{constructor(t){this.persistence=t,this.Ti=new ko,this.Ii=null}static Ei(t){return new Mo(t)}get di(){if(this.Ii)return this.Ii;throw We(60996)}addReference(t,e,n){return this.Ti.addReference(n,e),this.di.delete(n.toString()),On.resolve()}removeReference(t,e,n){return this.Ti.removeReference(n,e),this.di.add(n.toString()),On.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),On.resolve()}removeTarget(t,e){this.Ti.Ur(e.targetId).forEach(t=>this.di.add(t.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(t=>{t.forEach(t=>this.di.add(t.toString()))}).next(()=>n.removeTargetData(t,e))}li(){this.Ii=new Set}hi(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return On.forEach(this.di,n=>{const s=kn.fromPath(n);return this.Ai(t,s).next(t=>{t||e.removeEntry(s,_n.min())})}).next(()=>(this.Ii=null,e.apply(t)))}updateLimboDocument(t,e){return this.Ai(t,e).next(t=>{t?this.di.delete(e.toString()):this.di.add(e.toString())})}ui(t){return 0}Ai(t,e){return On.or([()=>On.resolve(this.Ti.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Pi(t,e)])}}class Vo{constructor(t,e){this.persistence=t,this.Ri=new wr(t=>function(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Bn(e)),e=Un(t.get(n),e);return Bn(e)}(t.path),(t,e)=>t.isEqual(e)),this.garbageCollector=function(t,e){return new Eo(t,e)}(this,e)}static Ei(t,e){return new Vo(t,e)}li(){}hi(t){return On.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.Vr(t);return this.persistence.getTargetCache().getTargetCount(t).next(t=>e.next(e=>t+e))}Vr(t){let e=0;return this.Ar(t,t=>{e++}).next(()=>e)}Ar(t,e){return On.forEach(this.Ri,(n,s)=>this.gr(t,n,s).next(t=>t?On.resolve():e(s)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),r=s.newChangeBuffer();return s.Xr(t,s=>this.gr(t,s,e).next(t=>{t||(n++,r.removeEntry(s,_n.min()))})).next(()=>r.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.Ri.set(e,t.currentSequenceNumber),On.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.Ri.set(n,t.currentSequenceNumber),On.resolve()}removeReference(t,e,n){return this.Ri.set(n,t.currentSequenceNumber),On.resolve()}updateLimboDocument(t,e){return this.Ri.set(e,t.currentSequenceNumber),On.resolve()}ui(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Cs(t.data.value)),e}gr(t,e,n){return On.or([()=>this.persistence.Pi(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const t=this.Ri.get(e);return On.resolve(void 0!==t&&t>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}
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
 */class Fo{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.ls=n,this.hs=s}static Ps(t,e){let n=Nr(),s=Nr();for(const r of e.docChanges)switch(r.type){case 0:n=n.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new Fo(t,e.fromCache,n,s)}}
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
 */class Uo{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}
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
 */class Bo{constructor(){this.Ts=!1,this.Is=!1,this.Es=100,this.ds=Y()?8:function(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}("undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:"")>0?6:4}initialize(t,e){this.As=t,this.indexManager=e,this.Ts=!0}getDocumentsMatchingQuery(t,e,n,s){const r={result:null};return this.Rs(t,e).next(t=>{r.result=t}).next(()=>{if(!r.result)return this.Vs(t,e,s,n).next(t=>{r.result=t})}).next(()=>{if(r.result)return;const n=new Uo;return this.fs(t,e,n).next(s=>{if(r.result=s,this.Is)return this.gs(t,e,n,s.size)})}).next(()=>r.result)}gs(t,e,n,s){return n.documentReadCount<this.Es?(ze()<=at.DEBUG&&Ke("QueryEngine","SDK will not create cache indexes for query:",mr(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Es,"documents"),On.resolve()):(ze()<=at.DEBUG&&Ke("QueryEngine","Query:",mr(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ds*s?(ze()<=at.DEBUG&&Ke("QueryEngine","The SDK decides to create cache indexes for query:",mr(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,hr(e))):On.resolve())}Rs(t,e){if(lr(e))return On.resolve(null);let n=hr(e);return this.indexManager.getIndexType(t,n).next(s=>0===s?null:(null!==e.limit&&1===s&&(e=dr(e,null,"F"),n=hr(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(s=>{const r=Nr(...s);return this.As.getDocuments(t,r).next(s=>this.indexManager.getMinOffset(t,n).next(n=>{const i=this.ps(e,s);return this.ys(e,i,r,n.readTime)?this.Rs(t,dr(e,null,"F")):this.ws(t,i,e,n)}))})))}Vs(t,e,n,s){return lr(e)||s.isEqual(_n.min())?On.resolve(null):this.As.getDocuments(t,n).next(r=>{const i=this.ps(e,r);return this.ys(e,i,n,s)?On.resolve(null):(ze()<=at.DEBUG&&Ke("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),mr(e)),this.ws(t,i,e,function(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,r=_n.fromTimestamp(1e9===s?new En(n+1,0):new En(n,s));return new Nn(r,kn.empty(),e)}(s,-1)).next(t=>t))})}ps(t,e){let n=new Hn(yr(t));return e.forEach((e,s)=>{gr(t,s)&&(n=n.add(s))}),n}ys(t,e,n,s){if(null===t.limit)return!1;if(n.size!==e.size)return!0;const r="F"===t.limitType?e.last():e.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}fs(t,e,n){return ze()<=at.DEBUG&&Ke("QueryEngine","Using full collection scan to execute query:",mr(e)),this.As.getDocumentsMatchingQuery(t,e,Nn.min(),n)}ws(t,e,n,s){return this.As.getDocumentsMatchingQuery(t,n,s).next(t=>(e.forEach(e=>{t=t.insert(e.key,e)}),t))}}
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
 */const jo="LocalStore";class $o{constructor(t,e,n,s){this.persistence=t,this.bs=e,this.serializer=s,this.Ss=new zn(pn),this.Ds=new wr(t=>rr(t),ir),this.vs=new Map,this.Cs=t.getRemoteDocumentCache(),this.ai=t.getTargetCache(),this.ci=t.getBundleCache(),this.Fs(n)}Fs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new So(this.Cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Cs.setIndexManager(this.indexManager),this.bs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Ss))}}async function qo(t,e){const n=Je(t);return await n.persistence.runTransaction("Handle user change","readonly",t=>{let s;return n.mutationQueue.getAllMutationBatches(t).next(r=>(s=r,n.Fs(e),n.mutationQueue.getAllMutationBatches(t))).next(e=>{const r=[],i=[];let o=Nr();for(const t of s){r.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){i.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return n.localDocuments.getDocuments(t,o).next(t=>({Ms:t,removedBatchIds:r,addedBatchIds:i}))})})}function zo(t){const e=Je(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.ai.getLastRemoteSnapshotVersion(t))}function Ko(t,e){const n=Je(t),s=e.snapshotVersion;let r=n.Ss;return n.persistence.runTransaction("Apply remote event","readwrite-primary",t=>{const i=n.Cs.newChangeBuffer({trackRemovals:!0});r=n.Ss;const o=[];e.targetChanges.forEach((i,a)=>{const c=r.get(a);if(!c)return;o.push(n.ai.removeMatchingKeys(t,i.removedDocuments,a).next(()=>n.ai.addMatchingKeys(t,i.addedDocuments,a)));let l=c.withSequenceNumber(t.currentSequenceNumber);null!==e.targetMismatches.get(a)?l=l.withResumeToken(Xn.EMPTY_BYTE_STRING,_n.min()).withLastLimboFreeSnapshotVersion(_n.min()):i.resumeToken.approximateByteSize()>0&&(l=l.withResumeToken(i.resumeToken,s)),r=r.insert(a,l),function(t,e,n){if(0===t.resumeToken.approximateByteSize())return!0;if(e.snapshotVersion.toMicroseconds()-t.snapshotVersion.toMicroseconds()>=3e8)return!0;return n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(c,l,i)&&o.push(n.ai.updateTargetData(t,l))});let a=Er(),c=Nr();if(e.documentUpdates.forEach(s=>{e.resolvedLimboDocuments.has(s)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,s))}),o.push(function(t,e,n){let s=Nr(),r=Nr();return n.forEach(t=>s=s.add(t)),e.getEntries(t,s).next(t=>{let s=Er();return n.forEach((n,i)=>{const o=t.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(r=r.add(n)),i.isNoDocument()&&i.version.isEqual(_n.min())?(e.removeEntry(n,i.readTime),s=s.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(e.addEntry(i),s=s.insert(n,i)):Ke(jo,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)}),{xs:s,Os:r}})}(t,i,e.documentUpdates).next(t=>{a=t.xs,c=t.Os})),!s.isEqual(_n.min())){const e=n.ai.getLastRemoteSnapshotVersion(t).next(e=>n.ai.setTargetsMetadata(t,t.currentSequenceNumber,s));o.push(e)}return On.waitFor(o).next(()=>i.apply(t)).next(()=>n.localDocuments.getLocalViewOfDocuments(t,a,c)).next(()=>a)}).then(t=>(n.Ss=r,t))}function Go(t,e){const n=Je(t);return n.persistence.runTransaction("Get next mutation batch","readonly",t=>(void 0===e&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(t,e)))}async function Ho(t,e,n){const s=Je(t),r=s.Ss.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,t=>s.persistence.referenceDelegate.removeTarget(t,r))}catch(o){if(!Pn(o))throw o;Ke(jo,`Failed to update sequence numbers for target ${e}: ${o}`)}s.Ss=s.Ss.remove(e),s.Ds.delete(r.target)}function Qo(t,e,n){const s=Je(t);let r=_n.min(),i=Nr();return s.persistence.runTransaction("Execute query","readwrite",t=>function(t,e,n){const s=Je(t),r=s.Ds.get(n);return void 0!==r?On.resolve(s.Ss.get(r)):s.ai.getTargetData(e,n)}(s,t,hr(e)).next(e=>{if(e)return r=e.lastLimboFreeSnapshotVersion,s.ai.getMatchingKeysForTargetId(t,e.targetId).next(t=>{i=t})}).next(()=>s.bs.getDocumentsMatchingQuery(t,e,n?r:_n.min(),n?i:Nr())).next(t=>(function(t,e,n){let s=t.vs.get(e)||_n.min();n.forEach((t,e)=>{e.readTime.compareTo(s)>0&&(s=e.readTime)}),t.vs.set(e,s)}(s,function(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}(e),t),{documents:t,Ns:i})))}class Wo{constructor(){this.activeTargetIds=xr}$s(t){this.activeTargetIds=this.activeTargetIds.add(t)}Us(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Qs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Yo{constructor(){this.So=new Wo,this.Do={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.So.$s(t),this.Do[t]||"not-current"}updateQueryState(t,e,n){this.Do[t]=e}removeLocalQueryTarget(t){this.So.Us(t)}isLocalQueryTarget(t){return this.So.activeTargetIds.has(t)}clearQueryState(t){delete this.Do[t]}getAllActiveQueryTargets(){return this.So.activeTargetIds}isActiveQueryTarget(t){return this.So.activeTargetIds.has(t)}start(){return this.So=new Wo,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}
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
 */class Xo{vo(t){}shutdown(){}}
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
 */const Jo="ConnectivityMonitor";class Zo{constructor(){this.Co=()=>this.Fo(),this.Mo=()=>this.xo(),this.Oo=[],this.No()}vo(t){this.Oo.push(t)}shutdown(){window.removeEventListener("online",this.Co),window.removeEventListener("offline",this.Mo)}No(){window.addEventListener("online",this.Co),window.addEventListener("offline",this.Mo)}Fo(){Ke(Jo,"Network connectivity changed: AVAILABLE");for(const t of this.Oo)t(0)}xo(){Ke(Jo,"Network connectivity changed: UNAVAILABLE");for(const t of this.Oo)t(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
 */let ta=null;function ea(){return null===ta?ta=268435456+Math.round(2147483648*Math.random()):ta++,"0x"+ta.toString(16)
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
 */}const na="RestConnection",sa={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class ra{get Bo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Lo=e+"://"+t.host,this.ko=`projects/${n}/databases/${s}`,this.qo=this.databaseId.database===us?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Qo(t,e,n,s,r){const i=ea(),o=this.$o(t,e.toUriEncodedString());Ke(na,`Sending RPC '${t}' ${i}:`,o,n);const a={"google-cloud-resource-prefix":this.ko,"x-goog-request-params":this.qo};return this.Uo(a,s,r),this.Ko(t,o,a,n).then(e=>(Ke(na,`Received RPC '${t}' ${i}: `,e),e),e=>{throw He(na,`RPC '${t}' ${i} failed with error: `,e,"url: ",o,"request:",n),e})}Wo(t,e,n,s,r,i){return this.Qo(t,e,n,s,r)}Uo(t,e,n){t["X-Goog-Api-Client"]="gl-js/ fire/"+$e,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((e,n)=>t[n]=e),n&&n.headers.forEach((e,n)=>t[n]=e)}$o(t,e){const n=sa[t];return`${this.Lo}/v1/${e}:${n}`}terminate(){}}
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
 */class ia{constructor(t){this.Go=t.Go,this.zo=t.zo}jo(t){this.Ho=t}Jo(t){this.Yo=t}Zo(t){this.Xo=t}onMessage(t){this.e_=t}close(){this.zo()}send(t){this.Go(t)}t_(){this.Ho()}n_(){this.Yo()}r_(t){this.Xo(t)}i_(t){this.e_(t)}}
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
 */const oa="WebChannelConnection";class aa extends ra{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Ko(t,e,n,s){const r=ea();return new Promise((i,o)=>{const a=new Ne;a.setWithCredentials(!0),a.listenOnce(Re.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case Le.NO_ERROR:const e=a.getResponseJson();Ke(oa,`XHR for RPC '${t}' ${r} received:`,JSON.stringify(e)),i(e);break;case Le.TIMEOUT:Ke(oa,`RPC '${t}' ${r} timed out`),o(new tn(Ze.DEADLINE_EXCEEDED,"Request time out"));break;case Le.HTTP_ERROR:const n=a.getStatus();if(Ke(oa,`RPC '${t}' ${r} failed with status:`,n,"response text:",a.getResponseText()),n>0){let t=a.getResponseJson();Array.isArray(t)&&(t=t[0]);const e=null==t?void 0:t.error;if(e&&e.status&&e.message){const t=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(Ze).indexOf(e)>=0?e:Ze.UNKNOWN}(e.status);o(new tn(t,e.message))}else o(new tn(Ze.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new tn(Ze.UNAVAILABLE,"Connection failed."));break;default:We(9055,{s_:t,streamId:r,o_:a.getLastErrorCode(),__:a.getLastError()})}}finally{Ke(oa,`RPC '${t}' ${r} completed.`)}});const c=JSON.stringify(s);Ke(oa,`RPC '${t}' ${r} sending request:`,s),a.send(e,"POST",c,n,15)})}a_(t,e,n){const s=ea(),r=[this.Lo,"/","google.firestore.v1.Firestore","/",t,"/channel"],i=Ve(),o=Me(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.Uo(a.initMessageHeaders,e,n),a.encodeInitMessageHeaders=!0;const l=r.join("");Ke(oa,`Creating RPC '${t}' stream ${s}: ${l}`,a);const u=i.createWebChannel(l,a);let h=!1,d=!1;const f=new ia({Go:e=>{d?Ke(oa,`Not sending because RPC '${t}' stream ${s} is closed:`,e):(h||(Ke(oa,`Opening RPC '${t}' stream ${s} transport.`),u.open(),h=!0),Ke(oa,`RPC '${t}' stream ${s} sending:`,e),u.send(e))},zo:()=>u.close()}),p=(t,e,n)=>{t.listen(e,t=>{try{n(t)}catch(e){setTimeout(()=>{throw e},0)}})};return p(u,xe.EventType.OPEN,()=>{d||(Ke(oa,`RPC '${t}' stream ${s} transport opened.`),f.t_())}),p(u,xe.EventType.CLOSE,()=>{d||(d=!0,Ke(oa,`RPC '${t}' stream ${s} transport closed`),f.r_())}),p(u,xe.EventType.ERROR,e=>{d||(d=!0,He(oa,`RPC '${t}' stream ${s} transport errored. Name:`,e.name,"Message:",e.message),f.r_(new tn(Ze.UNAVAILABLE,"The operation could not be completed")))}),p(u,xe.EventType.MESSAGE,e=>{var n;if(!d){const r=e.data[0];Xe(!!r,16349);const i=r,o=(null==i?void 0:i.error)||(null===(n=i[0])||void 0===n?void 0:n.error);if(o){Ke(oa,`RPC '${t}' stream ${s} received error:`,o);const e=o.status;let n=function(t){const e=pi[t];if(void 0!==e)return gi(e)}(e),r=o.message;void 0===n&&(n=Ze.INTERNAL,r="Unknown error status: "+e+" with message "+o.message),d=!0,f.r_(new tn(n,r)),u.close()}else Ke(oa,`RPC '${t}' stream ${s} received:`,r),f.i_(r)}}),p(o,Pe.STAT_EVENT,e=>{e.stat===Oe.PROXY?Ke(oa,`RPC '${t}' stream ${s} detected buffering proxy`):e.stat===Oe.NOPROXY&&Ke(oa,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{f.n_()},0),f}}function ca(){return"undefined"!=typeof document?document:null}
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
 */function la(t){return new Oi(t,!0)}
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
 */class ua{constructor(t,e,n=1e3,s=1.5,r=6e4){this.bi=t,this.timerId=e,this.u_=n,this.c_=s,this.l_=r,this.h_=0,this.P_=null,this.T_=Date.now(),this.reset()}reset(){this.h_=0}I_(){this.h_=this.l_}E_(t){this.cancel();const e=Math.floor(this.h_+this.d_()),n=Math.max(0,Date.now()-this.T_),s=Math.max(0,e-n);s>0&&Ke("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.h_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.P_=this.bi.enqueueAfterDelay(this.timerId,s,()=>(this.T_=Date.now(),t())),this.h_*=this.c_,this.h_<this.u_&&(this.h_=this.u_),this.h_>this.l_&&(this.h_=this.l_)}A_(){null!==this.P_&&(this.P_.skipDelay(),this.P_=null)}cancel(){null!==this.P_&&(this.P_.cancel(),this.P_=null)}d_(){return(Math.random()-.5)*this.h_}}
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
 */const ha="PersistentStream";class da{constructor(t,e,n,s,r,i,o,a){this.bi=t,this.R_=n,this.V_=s,this.connection=r,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.m_=0,this.f_=null,this.g_=null,this.stream=null,this.p_=0,this.y_=new ua(t,e)}w_(){return 1===this.state||5===this.state||this.b_()}b_(){return 2===this.state||3===this.state}start(){this.p_=0,4!==this.state?this.auth():this.S_()}async stop(){this.w_()&&await this.close(0)}D_(){this.state=0,this.y_.reset()}v_(){this.b_()&&null===this.f_&&(this.f_=this.bi.enqueueAfterDelay(this.R_,6e4,()=>this.C_()))}F_(t){this.M_(),this.stream.send(t)}async C_(){if(this.b_())return this.close(0)}M_(){this.f_&&(this.f_.cancel(),this.f_=null)}x_(){this.g_&&(this.g_.cancel(),this.g_=null)}async close(t,e){this.M_(),this.x_(),this.y_.cancel(),this.m_++,4!==t?this.y_.reset():e&&e.code===Ze.RESOURCE_EXHAUSTED?(Ge(e.toString()),Ge("Using maximum backoff delay to prevent overloading the backend."),this.y_.I_()):e&&e.code===Ze.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.O_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Zo(e)}O_(){}auth(){this.state=1;const t=this.N_(this.m_),e=this.m_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([t,n])=>{this.m_===e&&this.B_(t,n)},e=>{t(()=>{const t=new tn(Ze.UNKNOWN,"Fetching auth token failed: "+e.message);return this.L_(t)})})}B_(t,e){const n=this.N_(this.m_);this.stream=this.k_(t,e),this.stream.jo(()=>{n(()=>this.listener.jo())}),this.stream.Jo(()=>{n(()=>(this.state=2,this.g_=this.bi.enqueueAfterDelay(this.V_,1e4,()=>(this.b_()&&(this.state=3),Promise.resolve())),this.listener.Jo()))}),this.stream.Zo(t=>{n(()=>this.L_(t))}),this.stream.onMessage(t=>{n(()=>1==++this.p_?this.q_(t):this.onNext(t))})}S_(){this.state=5,this.y_.E_(async()=>{this.state=0,this.start()})}L_(t){return Ke(ha,`close with error: ${t}`),this.stream=null,this.close(4,t)}N_(t){return e=>{this.bi.enqueueAndForget(()=>this.m_===t?e():(Ke(ha,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class fa extends da{constructor(t,e,n,s,r,i){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,i),this.serializer=r}k_(t,e){return this.connection.a_("Listen",t,e)}q_(t){return this.onNext(t)}onNext(t){this.y_.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const r="NO_CHANGE"===(s=e.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===s?1:"REMOVE"===s?2:"CURRENT"===s?3:"RESET"===s?4:We(39313,{state:s}),i=e.targetChange.targetIds||[],o=function(t,e){return t.useProto3Json?(Xe(void 0===e||"string"==typeof e,58123),Xn.fromBase64String(e||"")):(Xe(void 0===e||e instanceof Buffer||e instanceof Uint8Array,16193),Xn.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(t){const e=void 0===t.code?Ze.UNKNOWN:gi(t.code);return new tn(e,t.message||"")}(a);n=new Ii(r,i,o,c||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=zi(t,s.document.name),i=Ui(s.document.updateTime),o=s.document.createTime?Ui(s.document.createTime):_n.min(),a=new Rs({mapValue:{fields:s.document.fields}}),c=Os.newFoundDocument(r,i,o,a),l=s.targetIds||[],u=s.removedTargetIds||[];n=new Si(l,u,c.key,c)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=zi(t,s.document),i=s.readTime?Ui(s.readTime):_n.min(),o=Os.newNoDocument(r,i),a=s.removedTargetIds||[];n=new Si([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=zi(t,s.document),i=s.removedTargetIds||[];n=new Si([],i,r,null)}else{if(!("filter"in e))return We(11601,{Vt:e});{e.filter;const t=e.filter;t.targetId;const{count:s=0,unchangedNames:r}=t,i=new fi(s,r),o=t.targetId;n=new Ci(o,i)}}var s;return n}(this.serializer,t),n=function(t){if(!("targetChange"in t))return _n.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?_n.min():e.readTime?Ui(e.readTime):_n.min()}(t);return this.listener.Q_(e,n)}U_(t){const e={};e.database=Gi(this.serializer),e.addTarget=function(t,e){let n;const s=e.target;if(n=or(s)?{documents:Wi(t,s)}:{query:Yi(t,s).gt},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0){n.resumeToken=Vi(t,e.resumeToken);const s=Pi(t,e.expectedCount);null!==s&&(n.expectedCount=s)}else if(e.snapshotVersion.compareTo(_n.min())>0){n.readTime=Mi(t,e.snapshotVersion.toTimestamp());const s=Pi(t,e.expectedCount);null!==s&&(n.expectedCount=s)}return n}(this.serializer,t);const n=function(t,e){const n=function(t){switch(t){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return We(28987,{purpose:t})}}(e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,t);n&&(e.labels=n),this.F_(e)}K_(t){const e={};e.database=Gi(this.serializer),e.removeTarget=t,this.F_(e)}}class pa extends da{constructor(t,e,n,s,r,i){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,i),this.serializer=r}get W_(){return this.p_>0}start(){this.lastStreamToken=void 0,super.start()}O_(){this.W_&&this.G_([])}k_(t,e){return this.connection.a_("Write",t,e)}q_(t){return Xe(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Xe(!t.writeResults||0===t.writeResults.length,55816),this.listener.z_()}onNext(t){Xe(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.y_.reset();const e=function(t,e){return t&&t.length>0?(Xe(void 0!==e,14353),t.map(t=>function(t,e){let n=t.updateTime?Ui(t.updateTime):Ui(e);return n.isEqual(_n.min())&&(n=Ui(e)),new Qr(n,t.transformResults||[])}(t,e))):[]}(t.writeResults,t.commitTime),n=Ui(t.commitTime);return this.listener.j_(n,e)}H_(){const t={};t.database=Gi(this.serializer),this.F_(t)}G_(t){const e={streamToken:this.lastStreamToken,writes:t.map(t=>function(t,e){let n;if(e instanceof si)n={update:Qi(t,e.key,e.value)};else if(e instanceof ci)n={delete:qi(t,e.key)};else if(e instanceof ri)n={update:Qi(t,e.key,e.data),updateMask:io(e.fieldMask)};else{if(!(e instanceof li))return We(16599,{ft:e.type});n={verify:qi(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(t=>function(t,e){const n=e.transform;if(n instanceof Ur)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Br)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof $r)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof zr)return{fieldPath:e.field.canonicalString(),increment:n.Re};throw We(20930,{transform:e.transform})}(0,t))),e.precondition.isNone||(n.currentDocument=(s=t,void 0!==(r=e.precondition).updateTime?{updateTime:Fi(s,r.updateTime)}:void 0!==r.exists?{exists:r.exists}:We(27497))),n;var s,r}(this.serializer,t))};this.F_(e)}}
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
 */class ma{}class ga extends ma{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.J_=!1}Y_(){if(this.J_)throw new tn(Ze.FAILED_PRECONDITION,"The client has already been terminated.")}Qo(t,e,n,s){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection.Qo(t,ji(e,n),s,r,i)).catch(t=>{throw"FirebaseError"===t.name?(t.code===Ze.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new tn(Ze.UNKNOWN,t.toString())})}Wo(t,e,n,s,r){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Wo(t,ji(e,n),s,i,o,r)).catch(t=>{throw"FirebaseError"===t.name?(t.code===Ze.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new tn(Ze.UNKNOWN,t.toString())})}terminate(){this.J_=!0,this.connection.terminate()}}class ya{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.Z_=0,this.X_=null,this.ea=!0}ta(){0===this.Z_&&(this.na("Unknown"),this.X_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.X_=null,this.ra("Backend didn't respond within 10 seconds."),this.na("Offline"),Promise.resolve())))}ia(t){"Online"===this.state?this.na("Unknown"):(this.Z_++,this.Z_>=1&&(this.sa(),this.ra(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.na("Offline")))}set(t){this.sa(),this.Z_=0,"Online"===t&&(this.ea=!1),this.na(t)}na(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ra(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ea?(Ge(e),this.ea=!1):Ke("OnlineStateTracker",e)}sa(){null!==this.X_&&(this.X_.cancel(),this.X_=null)}}
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
 */const va="RemoteStore";class wa{constructor(t,e,n,s,r){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.oa=[],this._a=new Map,this.aa=new Set,this.ua=[],this.ca=r,this.ca.vo(t=>{n.enqueueAndForget(async()=>{ka(this)&&(Ke(va,"Restarting streams for network reachability change."),await async function(t){const e=Je(t);e.aa.add(4),await Ea(e),e.la.set("Unknown"),e.aa.delete(4),await ba(e)}(this))})}),this.la=new ya(n,s)}}async function ba(t){if(ka(t))for(const e of t.ua)await e(!0)}async function Ea(t){for(const e of t.ua)await e(!1)}function _a(t,e){const n=Je(t);n._a.has(e.targetId)||(n._a.set(e.targetId,e),Aa(n)?Ia(n):Ga(n).b_()&&Sa(n,e))}function Ta(t,e){const n=Je(t),s=Ga(n);n._a.delete(e),s.b_()&&Ca(n,e),0===n._a.size&&(s.b_()?s.v_():ka(n)&&n.la.set("Unknown"))}function Sa(t,e){if(t.ha.Ke(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(_n.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Ga(t).U_(e)}function Ca(t,e){t.ha.Ke(e),Ga(t).K_(e)}function Ia(t){t.ha=new ki({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),Rt:e=>t._a.get(e)||null,Pt:()=>t.datastore.serializer.databaseId}),Ga(t).start(),t.la.ta()}function Aa(t){return ka(t)&&!Ga(t).w_()&&t._a.size>0}function ka(t){return 0===Je(t).aa.size}function Da(t){t.ha=void 0}async function Na(t){t.la.set("Online")}async function xa(t){t._a.forEach((e,n)=>{Sa(t,e)})}async function Ra(t,e){Da(t),Aa(t)?(t.la.ia(e),Ia(t)):t.la.set("Unknown")}async function La(t,e,n){if(t.la.set("Online"),e instanceof Ii&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const s of e.targetIds)t._a.has(s)&&(await t.remoteSyncer.rejectListen(s,n),t._a.delete(s),t.ha.removeTarget(s))}(t,e)}catch(s){Ke(va,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await Oa(t,s)}else if(e instanceof Si?t.ha.Xe(e):e instanceof Ci?t.ha.ot(e):t.ha.nt(e),!n.isEqual(_n.min()))try{const e=await zo(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.ha.It(e);return n.targetChanges.forEach((n,s)=>{if(n.resumeToken.approximateByteSize()>0){const r=t._a.get(s);r&&t._a.set(s,r.withResumeToken(n.resumeToken,e))}}),n.targetMismatches.forEach((e,n)=>{const s=t._a.get(e);if(!s)return;t._a.set(e,s.withResumeToken(Xn.EMPTY_BYTE_STRING,s.snapshotVersion)),Ca(t,e);const r=new ao(s.target,e,n,s.sequenceNumber);Sa(t,r)}),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(r){Ke(va,"Failed to raise snapshot:",r),await Oa(t,r)}}async function Oa(t,e,n){if(!Pn(e))throw e;t.aa.add(1),await Ea(t),t.la.set("Offline"),n||(n=()=>zo(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{Ke(va,"Retrying IndexedDB access"),await n(),t.aa.delete(1),await ba(t)})}function Pa(t,e){return e().catch(n=>Oa(t,n,e))}async function Ma(t){const e=Je(t),n=Ha(e);let s=e.oa.length>0?e.oa[e.oa.length-1].batchId:-1;for(;Va(e);)try{const t=await Go(e.localStore,s);if(null===t){0===e.oa.length&&n.v_();break}s=t.batchId,Fa(e,t)}catch(r){await Oa(e,r)}Ua(e)&&Ba(e)}function Va(t){return ka(t)&&t.oa.length<10}function Fa(t,e){t.oa.push(e);const n=Ha(t);n.b_()&&n.W_&&n.G_(e.mutations)}function Ua(t){return ka(t)&&!Ha(t).w_()&&t.oa.length>0}function Ba(t){Ha(t).start()}async function ja(t){Ha(t).H_()}async function $a(t){const e=Ha(t);for(const n of t.oa)e.G_(n.mutations)}async function qa(t,e,n){const s=t.oa.shift(),r=hi.from(s,e,n);await Pa(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await Ma(t)}async function za(t,e){e&&Ha(t).W_&&await async function(t,e){if(function(t){switch(t){case Ze.OK:return We(64938);case Ze.CANCELLED:case Ze.UNKNOWN:case Ze.DEADLINE_EXCEEDED:case Ze.RESOURCE_EXHAUSTED:case Ze.INTERNAL:case Ze.UNAVAILABLE:case Ze.UNAUTHENTICATED:return!1;case Ze.INVALID_ARGUMENT:case Ze.NOT_FOUND:case Ze.ALREADY_EXISTS:case Ze.PERMISSION_DENIED:case Ze.FAILED_PRECONDITION:case Ze.ABORTED:case Ze.OUT_OF_RANGE:case Ze.UNIMPLEMENTED:case Ze.DATA_LOSS:return!0;default:return We(15467,{code:t})}}(n=e.code)&&n!==Ze.ABORTED){const n=t.oa.shift();Ha(t).D_(),await Pa(t,()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e)),await Ma(t)}var n}(t,e),Ua(t)&&Ba(t)}async function Ka(t,e){const n=Je(t);n.asyncQueue.verifyOperationInProgress(),Ke(va,"RemoteStore received new credentials");const s=ka(n);n.aa.add(3),await Ea(n),s&&n.la.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.aa.delete(3),await ba(n)}function Ga(t){return t.Pa||(t.Pa=function(t,e,n){const s=Je(t);return s.Y_(),new fa(e,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,n)}(t.datastore,t.asyncQueue,{jo:Na.bind(null,t),Jo:xa.bind(null,t),Zo:Ra.bind(null,t),Q_:La.bind(null,t)}),t.ua.push(async e=>{e?(t.Pa.D_(),Aa(t)?Ia(t):t.la.set("Unknown")):(await t.Pa.stop(),Da(t))})),t.Pa}function Ha(t){return t.Ta||(t.Ta=function(t,e,n){const s=Je(t);return s.Y_(),new pa(e,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,n)}(t.datastore,t.asyncQueue,{jo:()=>Promise.resolve(),Jo:ja.bind(null,t),Zo:za.bind(null,t),z_:$a.bind(null,t),j_:qa.bind(null,t)}),t.ua.push(async e=>{e?(t.Ta.D_(),await Ma(t)):(await t.Ta.stop(),t.oa.length>0&&(Ke(va,`Stopping write stream with ${t.oa.length} pending writes`),t.oa=[]))})),t.Ta
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
 */}class Qa{constructor(t,e,n,s,r){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=r,this.deferred=new en,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(t=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,r){const i=Date.now()+n,o=new Qa(t,e,i,s,r);return o.start(n),o}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new tn(Ze.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Wa(t,e){if(Ge("AsyncQueue",`${e}: ${t}`),Pn(t))return new tn(Ze.UNAVAILABLE,`${e}: ${t}`);throw t}
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
 */class Ya{static emptySet(t){return new Ya(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||kn.comparator(e.key,n.key):(t,e)=>kn.comparator(t.key,e.key),this.keyedMap=Tr(),this.sortedSet=new zn(this.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Ya))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,s=n.getNext().key;if(!t.isEqual(s))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new Ya;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
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
 */class Xa{constructor(){this.Ia=new zn(kn.comparator)}track(t){const e=t.doc.key,n=this.Ia.get(e);n?0!==t.type&&3===n.type?this.Ia=this.Ia.insert(e,t):3===t.type&&1!==n.type?this.Ia=this.Ia.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.Ia=this.Ia.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.Ia=this.Ia.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.Ia=this.Ia.remove(e):1===t.type&&2===n.type?this.Ia=this.Ia.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.Ia=this.Ia.insert(e,{type:2,doc:t.doc}):We(63341,{Vt:t,Ea:n}):this.Ia=this.Ia.insert(e,t)}da(){const t=[];return this.Ia.inorderTraversal((e,n)=>{t.push(n)}),t}}class Ja{constructor(t,e,n,s,r,i,o,a,c){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=r,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(t,e,n,s,r){const i=[];return e.forEach(t=>{i.push({type:0,doc:t})}),new Ja(t,e,Ya.emptySet(e),i,n,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&fr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}
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
 */class Za{constructor(){this.Aa=void 0,this.Ra=[]}Va(){return this.Ra.some(t=>t.ma())}}class tc{constructor(){this.queries=ec(),this.onlineState="Unknown",this.fa=new Set}terminate(){!function(t,e){const n=Je(t),s=n.queries;n.queries=ec(),s.forEach((t,n)=>{for(const s of n.Ra)s.onError(e)})}(this,new tn(Ze.ABORTED,"Firestore shutting down"))}}function ec(){return new wr(t=>pr(t),fr)}function nc(t,e){const n=Je(t);let s=!1;for(const r of e){const t=r.query,e=n.queries.get(t);if(e){for(const t of e.Ra)t.pa(r)&&(s=!0);e.Aa=r}}s&&rc(n)}function sc(t,e,n){const s=Je(t),r=s.queries.get(e);if(r)for(const i of r.Ra)i.onError(n);s.queries.delete(e)}function rc(t){t.fa.forEach(t=>{t.next()})}var ic,oc;(oc=ic||(ic={})).ya="default",oc.Cache="cache";class ac{constructor(t,e,n){this.query=t,this.wa=e,this.ba=!1,this.Sa=null,this.onlineState="Unknown",this.options=n||{}}pa(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new Ja(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.ba?this.Da(t)&&(this.wa.next(t),e=!0):this.va(t,this.onlineState)&&(this.Ca(t),e=!0),this.Sa=t,e}onError(t){this.wa.error(t)}ga(t){this.onlineState=t;let e=!1;return this.Sa&&!this.ba&&this.va(this.Sa,t)&&(this.Ca(this.Sa),e=!0),e}va(t,e){if(!t.fromCache)return!0;if(!this.ma())return!0;const n="Offline"!==e;return(!this.options.Fa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||"Offline"===e)}Da(t){if(t.docChanges.length>0)return!0;const e=this.Sa&&this.Sa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}Ca(t){t=Ja.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.ba=!0,this.wa.next(t)}ma(){return this.options.source!==ic.Cache}}
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
 */class cc{constructor(t){this.key=t}}class lc{constructor(t){this.key=t}}class uc{constructor(t,e){this.query=t,this.qa=e,this.Qa=null,this.hasCachedResults=!1,this.current=!1,this.$a=Nr(),this.mutatedKeys=Nr(),this.Ua=yr(t),this.Ka=new Ya(this.Ua)}get Wa(){return this.qa}Ga(t,e){const n=e?e.za:new Xa,s=e?e.Ka:this.Ka;let r=e?e.mutatedKeys:this.mutatedKeys,i=s,o=!1;const a="F"===this.query.limitType&&s.size===this.query.limit?s.last():null,c="L"===this.query.limitType&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((t,e)=>{const l=s.get(t),u=gr(this.query,e)?e:null,h=!!l&&this.mutatedKeys.has(l.key),d=!!u&&(u.hasLocalMutations||this.mutatedKeys.has(u.key)&&u.hasCommittedMutations);let f=!1;l&&u?l.data.isEqual(u.data)?h!==d&&(n.track({type:3,doc:u}),f=!0):this.ja(l,u)||(n.track({type:2,doc:u}),f=!0,(a&&this.Ua(u,a)>0||c&&this.Ua(u,c)<0)&&(o=!0)):!l&&u?(n.track({type:0,doc:u}),f=!0):l&&!u&&(n.track({type:1,doc:l}),f=!0,(a||c)&&(o=!0)),f&&(u?(i=i.add(u),r=d?r.add(t):r.delete(t)):(i=i.delete(t),r=r.delete(t)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const t="F"===this.query.limitType?i.last():i.first();i=i.delete(t.key),r=r.delete(t.key),n.track({type:1,doc:t})}return{Ka:i,za:n,ys:o,mutatedKeys:r}}ja(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const r=this.Ka;this.Ka=t.Ka,this.mutatedKeys=t.mutatedKeys;const i=t.za.da();i.sort((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return We(20277,{Vt:t})}};return n(t)-n(e)}(t.type,e.type)||this.Ua(t.doc,e.doc)),this.Ha(n),s=null!=s&&s;const o=e&&!s?this.Ja():[],a=0===this.$a.size&&this.current&&!s?1:0,c=a!==this.Qa;return this.Qa=a,0!==i.length||c?{snapshot:new Ja(this.query,t.Ka,r,i,t.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),Ya:o}:{Ya:o}}ga(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({Ka:this.Ka,za:new Xa,mutatedKeys:this.mutatedKeys,ys:!1},!1)):{Ya:[]}}Za(t){return!this.qa.has(t)&&!!this.Ka.has(t)&&!this.Ka.get(t).hasLocalMutations}Ha(t){t&&(t.addedDocuments.forEach(t=>this.qa=this.qa.add(t)),t.modifiedDocuments.forEach(t=>{}),t.removedDocuments.forEach(t=>this.qa=this.qa.delete(t)),this.current=t.current)}Ja(){if(!this.current)return[];const t=this.$a;this.$a=Nr(),this.Ka.forEach(t=>{this.Za(t.key)&&(this.$a=this.$a.add(t.key))});const e=[];return t.forEach(t=>{this.$a.has(t)||e.push(new lc(t))}),this.$a.forEach(n=>{t.has(n)||e.push(new cc(n))}),e}Xa(t){this.qa=t.Ns,this.$a=Nr();const e=this.Ga(t.documents);return this.applyChanges(e,!0)}eu(){return Ja.fromInitialDocuments(this.query,this.Ka,this.mutatedKeys,0===this.Qa,this.hasCachedResults)}}const hc="SyncEngine";class dc{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class fc{constructor(t){this.key=t,this.tu=!1}}class pc{constructor(t,e,n,s,r,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=i,this.nu={},this.ru=new wr(t=>pr(t),fr),this.iu=new Map,this.su=new Set,this.ou=new zn(kn.comparator),this._u=new Map,this.au=new ko,this.uu={},this.cu=new Map,this.lu=go.ir(),this.onlineState="Unknown",this.hu=void 0}get isPrimaryClient(){return!0===this.hu}}async function mc(t,e,n=!0){const s=Mc(t);let r;const i=s.ru.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.eu()):r=await yc(s,e,n,!0),r}async function gc(t,e){const n=Mc(t);await yc(n,e,!0,!1)}async function yc(t,e,n,s){const r=await function(t,e){const n=Je(t);return n.persistence.runTransaction("Allocate target","readwrite",t=>{let s;return n.ai.getTargetData(t,e).next(r=>r?(s=r,On.resolve(s)):n.ai.allocateTargetId(t).next(r=>(s=new ao(e,r,"TargetPurposeListen",t.currentSequenceNumber),n.ai.addTargetData(t,s).next(()=>s))))}).then(t=>{const s=n.Ss.get(t.targetId);return(null===s||t.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ss=n.Ss.insert(t.targetId,t),n.Ds.set(e,t.targetId)),t})}(t.localStore,hr(e)),i=r.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let a;return s&&(a=await async function(t,e,n,s,r){t.Pu=(e,n,s)=>async function(t,e,n,s){let r=e.view.Ga(n);r.ys&&(r=await Qo(t.localStore,e.query,!1).then(({documents:t})=>e.view.Ga(t,r)));const i=s&&s.targetChanges.get(e.targetId),o=s&&null!=s.targetMismatches.get(e.targetId),a=e.view.applyChanges(r,t.isPrimaryClient,i,o);return Nc(t,e.targetId,a.Ya),a.snapshot}(t,e,n,s);const i=await Qo(t.localStore,e,!0),o=new uc(e,i.Ns),a=o.Ga(i.documents),c=Ti.createSynthesizedTargetChangeForCurrentChange(n,s&&"Offline"!==t.onlineState,r),l=o.applyChanges(a,t.isPrimaryClient,c);Nc(t,n,l.Ya);const u=new dc(e,n,o);return t.ru.set(e,u),t.iu.has(n)?t.iu.get(n).push(e):t.iu.set(n,[e]),l.snapshot}(t,e,i,"current"===o,r.resumeToken)),t.isPrimaryClient&&n&&_a(t.remoteStore,r),a}async function vc(t,e,n){const s=Je(t),r=s.ru.get(e),i=s.iu.get(r.targetId);if(i.length>1)return s.iu.set(r.targetId,i.filter(t=>!fr(t,e))),void s.ru.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await Ho(s.localStore,r.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(r.targetId),n&&Ta(s.remoteStore,r.targetId),kc(s,r.targetId)}).catch(Ln)):(kc(s,r.targetId),await Ho(s.localStore,r.targetId,!0))}async function wc(t,e){const n=Je(t),s=n.ru.get(e),r=n.iu.get(s.targetId);n.isPrimaryClient&&1===r.length&&(n.sharedClientState.removeLocalQueryTarget(s.targetId),Ta(n.remoteStore,s.targetId))}async function bc(t,e,n){const s=function(t){const e=Je(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Sc.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Cc.bind(null,e),e}(t);try{const t=await function(t,e){const n=Je(t),s=En.now(),r=e.reduce((t,e)=>t.add(e.key),Nr());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",t=>{let a=Er(),c=Nr();return n.Cs.getEntries(t,r).next(t=>{a=t,a.forEach((t,e)=>{e.isValidDocument()||(c=c.add(t))})}).next(()=>n.localDocuments.getOverlayedDocuments(t,a)).next(r=>{i=r;const o=[];for(const t of e){const e=ei(t,i.get(t.key).overlayedDocument);null!=e&&o.push(new ri(t.key,e,Ls(e.value.mapValue),Wr.exists(!0)))}return n.mutationQueue.addMutationBatch(t,s,o,e)}).next(e=>{o=e;const s=e.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(t,e.batchId,s)})}).then(()=>({batchId:o.batchId,changes:Sr(i)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let s=t.uu[t.currentUser.toKey()];s||(s=new zn(pn)),s=s.insert(e,n),t.uu[t.currentUser.toKey()]=s}(s,t.batchId,n),await Lc(s,t.changes),await Ma(s.remoteStore)}catch(r){const t=Wa(r,"Failed to persist write");n.reject(t)}}async function Ec(t,e){const n=Je(t);try{const t=await Ko(n.localStore,e);e.targetChanges.forEach((t,e)=>{const s=n._u.get(e);s&&(Xe(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1,22616),t.addedDocuments.size>0?s.tu=!0:t.modifiedDocuments.size>0?Xe(s.tu,14607):t.removedDocuments.size>0&&(Xe(s.tu,42227),s.tu=!1))}),await Lc(n,t,e)}catch(s){await Ln(s)}}function _c(t,e,n){const s=Je(t);if(s.isPrimaryClient&&0===n||!s.isPrimaryClient&&1===n){const t=[];s.ru.forEach((n,s)=>{const r=s.view.ga(e);r.snapshot&&t.push(r.snapshot)}),function(t,e){const n=Je(t);n.onlineState=e;let s=!1;n.queries.forEach((t,n)=>{for(const r of n.Ra)r.ga(e)&&(s=!0)}),s&&rc(n)}(s.eventManager,e),t.length&&s.nu.Q_(t),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function Tc(t,e,n){const s=Je(t);s.sharedClientState.updateQueryState(e,"rejected",n);const r=s._u.get(e),i=r&&r.key;if(i){let t=new zn(kn.comparator);t=t.insert(i,Os.newNoDocument(i,_n.min()));const n=Nr().add(i),r=new _i(_n.min(),new Map,new zn(pn),t,n);await Ec(s,r),s.ou=s.ou.remove(i),s._u.delete(e),Rc(s)}else await Ho(s.localStore,e,!1).then(()=>kc(s,e,n)).catch(Ln)}async function Sc(t,e){const n=Je(t),s=e.batch.batchId;try{const t=await function(t,e){const n=Je(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",t=>{const s=e.batch.keys(),r=n.Cs.newChangeBuffer({trackRemovals:!0});return function(t,e,n,s){const r=n.batch,i=r.keys();let o=On.resolve();return i.forEach(t=>{o=o.next(()=>s.getEntry(e,t)).next(e=>{const i=n.docVersions.get(t);Xe(null!==i,48541),e.version.compareTo(i)<0&&(r.applyToRemoteDocument(e,n),e.isValidDocument()&&(e.setReadTime(n.commitVersion),s.addEntry(e)))})}),o.next(()=>t.mutationQueue.removeMutationBatch(e,r))}(n,t,e,r).next(()=>r.apply(t)).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,function(t){let e=Nr();for(let n=0;n<t.mutationResults.length;++n)t.mutationResults[n].transformResults.length>0&&(e=e.add(t.batch.mutations[n].key));return e}(e))).next(()=>n.localDocuments.getDocuments(t,s))})}(n.localStore,e);Ac(n,s,null),Ic(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Lc(n,t)}catch(r){await Ln(r)}}async function Cc(t,e,n){const s=Je(t);try{const t=await function(t,e){const n=Je(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",t=>{let s;return n.mutationQueue.lookupMutationBatch(t,e).next(e=>(Xe(null!==e,37113),s=e.keys(),n.mutationQueue.removeMutationBatch(t,e))).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,s,e)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,s)).next(()=>n.localDocuments.getDocuments(t,s))})}(s.localStore,e);Ac(s,e,n),Ic(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await Lc(s,t)}catch(r){await Ln(r)}}function Ic(t,e){(t.cu.get(e)||[]).forEach(t=>{t.resolve()}),t.cu.delete(e)}function Ac(t,e,n){const s=Je(t);let r=s.uu[s.currentUser.toKey()];if(r){const t=r.get(e);t&&(n?t.reject(n):t.resolve(),r=r.remove(e)),s.uu[s.currentUser.toKey()]=r}}function kc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.iu.get(e))t.ru.delete(s),n&&t.nu.Tu(s,n);t.iu.delete(e),t.isPrimaryClient&&t.au.Ur(e).forEach(e=>{t.au.containsKey(e)||Dc(t,e)})}function Dc(t,e){t.su.delete(e.path.canonicalString());const n=t.ou.get(e);null!==n&&(Ta(t.remoteStore,n),t.ou=t.ou.remove(e),t._u.delete(n),Rc(t))}function Nc(t,e,n){for(const s of n)s instanceof cc?(t.au.addReference(s.key,e),xc(t,s)):s instanceof lc?(Ke(hc,"Document no longer in limbo: "+s.key),t.au.removeReference(s.key,e),t.au.containsKey(s.key)||Dc(t,s.key)):We(19791,{Iu:s})}function xc(t,e){const n=e.key,s=n.path.canonicalString();t.ou.get(n)||t.su.has(s)||(Ke(hc,"New document in limbo: "+n),t.su.add(s),Rc(t))}function Rc(t){for(;t.su.size>0&&t.ou.size<t.maxConcurrentLimboResolutions;){const e=t.su.values().next().value;t.su.delete(e);const n=new kn(Cn.fromString(e)),s=t.lu.next();t._u.set(s,new fc(n)),t.ou=t.ou.insert(n,s),_a(t.remoteStore,new ao(hr(cr(n.path)),s,"TargetPurposeLimboResolution",Mn.le))}}async function Lc(t,e,n){const s=Je(t),r=[],i=[],o=[];s.ru.isEmpty()||(s.ru.forEach((t,a)=>{o.push(s.Pu(a,e,n).then(t=>{var e;if((t||n)&&s.isPrimaryClient){const r=t?!t.fromCache:null===(e=null==n?void 0:n.targetChanges.get(a.targetId))||void 0===e?void 0:e.current;s.sharedClientState.updateQueryState(a.targetId,r?"current":"not-current")}if(t){r.push(t);const e=Fo.Ps(a.targetId,t);i.push(e)}}))}),await Promise.all(o),s.nu.Q_(r),await async function(t,e){const n=Je(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",t=>On.forEach(e,e=>On.forEach(e.ls,s=>n.persistence.referenceDelegate.addReference(t,e.targetId,s)).next(()=>On.forEach(e.hs,s=>n.persistence.referenceDelegate.removeReference(t,e.targetId,s)))))}catch(s){if(!Pn(s))throw s;Ke(jo,"Failed to update sequence numbers: "+s)}for(const r of e){const t=r.targetId;if(!r.fromCache){const e=n.Ss.get(t),s=e.snapshotVersion,r=e.withLastLimboFreeSnapshotVersion(s);n.Ss=n.Ss.insert(t,r)}}}(s.localStore,i))}async function Oc(t,e){const n=Je(t);if(!n.currentUser.isEqual(e)){Ke(hc,"User change. New user:",e.toKey());const t=await qo(n.localStore,e);n.currentUser=e,r="'waitForPendingWrites' promise is rejected due to a user change.",(s=n).cu.forEach(t=>{t.forEach(t=>{t.reject(new tn(Ze.CANCELLED,r))})}),s.cu.clear(),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await Lc(n,t.Ms)}var s,r}function Pc(t,e){const n=Je(t),s=n._u.get(e);if(s&&s.tu)return Nr().add(s.key);{let t=Nr();const s=n.iu.get(e);if(!s)return t;for(const e of s){const s=n.ru.get(e);t=t.unionWith(s.view.Wa)}return t}}function Mc(t){const e=Je(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Ec.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Pc.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Tc.bind(null,e),e.nu.Q_=nc.bind(null,e.eventManager),e.nu.Tu=sc.bind(null,e.eventManager),e}class Vc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=la(t.databaseInfo.databaseId),this.sharedClientState=this.Au(t),this.persistence=this.Ru(t),await this.persistence.start(),this.localStore=this.Vu(t),this.gcScheduler=this.mu(t,this.localStore),this.indexBackfillerScheduler=this.fu(t,this.localStore)}mu(t,e){return null}fu(t,e){return null}Vu(t){return function(t,e,n,s){return new $o(t,e,n,s)}(this.persistence,new Bo,t.initialUser,this.serializer)}Ru(t){return new Oo(Mo.Ei,this.serializer)}Au(t){return new Yo}async terminate(){var t,e;null===(t=this.gcScheduler)||void 0===t||t.stop(),null===(e=this.indexBackfillerScheduler)||void 0===e||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Vc.provider={build:()=>new Vc};class Fc extends Vc{constructor(t){super(),this.cacheSizeBytes=t}mu(t,e){Xe(this.persistence.referenceDelegate instanceof Vo,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new bo(n,t.asyncQueue,e)}Ru(t){const e=void 0!==this.cacheSizeBytes?mo.withCacheSize(this.cacheSizeBytes):mo.DEFAULT;return new Oo(t=>Vo.Ei(t,e),this.serializer)}}class Uc{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>_c(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=Oc.bind(null,this.syncEngine),await async function(t,e){const n=Je(t);e?(n.aa.delete(2),await ba(n)):e||(n.aa.add(2),await Ea(n),n.la.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new tc}createDatastore(t){const e=la(t.databaseInfo.databaseId),n=(s=t.databaseInfo,new aa(s));var s;return function(t,e,n,s){return new ga(t,e,n,s)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,s=t.asyncQueue,r=t=>_c(this.syncEngine,t,0),i=Zo.C()?new Zo:new Xo,new wa(e,n,s,r,i);var e,n,s,r,i}createSyncEngine(t,e){return function(t,e,n,s,r,i,o){const a=new pc(t,e,n,s,r,i);return o&&(a.hu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(t){const e=Je(t);Ke(va,"RemoteStore shutting down."),e.aa.add(5),await Ea(e),e.ca.shutdown(),e.la.set("Unknown")}(this.remoteStore),null===(t=this.datastore)||void 0===t||t.terminate(),null===(e=this.eventManager)||void 0===e||e.terminate()}}Uc.provider={build:()=>new Uc};
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
class Bc{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.pu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.pu(this.observer.error,t):Ge("Uncaught Error in snapshot listener:",t.toString()))}yu(){this.muted=!0}pu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}
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
 */const jc="FirestoreClient";class $c{constructor(t,e,n,s,r){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=je.UNAUTHENTICATED,this.clientId=fn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(n,async t=>{Ke(jc,"Received user=",t.uid),await this.authCredentialListener(t),this.user=t}),this.appCheckCredentials.start(n,t=>(Ke(jc,"Received new app check token=",t),this.appCheckCredentialListener(t,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new en;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Wa(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function qc(t,e){t.asyncQueue.verifyOperationInProgress(),Ke(jc,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async t=>{s.isEqual(t)||(await qo(e.localStore,t),s=t)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function zc(t,e){t.asyncQueue.verifyOperationInProgress();const n=await async function(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){Ke(jc,"Using user provided OfflineComponentProvider");try{await qc(t,t._uninitializedComponentsProvider._offline)}catch(e){const r=e;if(!("FirebaseError"===(n=r).name?n.code===Ze.FAILED_PRECONDITION||n.code===Ze.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&n instanceof DOMException)||22===n.code||20===n.code||11===n.code))throw r;He("Error using user provided cache. Falling back to memory cache: "+r),await qc(t,new Vc)}}else Ke(jc,"Using default OfflineComponentProvider"),await qc(t,new Fc(void 0));var n;return t._offlineComponents}(t);Ke(jc,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(t=>Ka(e.remoteStore,t)),t.setAppCheckTokenChangeListener((t,n)=>Ka(e.remoteStore,n)),t._onlineComponents=e}async function Kc(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(Ke(jc,"Using user provided OnlineComponentProvider"),await zc(t,t._uninitializedComponentsProvider._online)):(Ke(jc,"Using default OnlineComponentProvider"),await zc(t,new Uc))),t._onlineComponents}async function Gc(t){const e=await Kc(t),n=e.eventManager;return n.onListen=mc.bind(null,e.syncEngine),n.onUnlisten=vc.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=gc.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=wc.bind(null,e.syncEngine),n}function Hc(t,e,n={}){const s=new en;return t.asyncQueue.enqueueAndForget(async()=>function(t,e,n,s,r){const i=new Bc({next:a=>{i.yu(),e.enqueueAndForget(()=>async function(t,e){const n=Je(t),s=e.query;let r=3;const i=n.queries.get(s);if(i){const t=i.Ra.indexOf(e);t>=0&&(i.Ra.splice(t,1),0===i.Ra.length?r=e.ma()?0:1:!i.Va()&&e.ma()&&(r=2))}switch(r){case 0:return n.queries.delete(s),n.onUnlisten(s,!0);case 1:return n.queries.delete(s),n.onUnlisten(s,!1);case 2:return n.onLastRemoteStoreUnlisten(s);default:return}}(t,o));const c=a.docs.has(n);!c&&a.fromCache?r.reject(new tn(Ze.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&s&&"server"===s.source?r.reject(new tn(Ze.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):r.resolve(a)},error:t=>r.reject(t)}),o=new ac(cr(n.path),i,{includeMetadataChanges:!0,Fa:!0});return async function(e,n){const s=Je(e);let r=3;const i=n.query;let o=s.queries.get(i);o?!o.Va()&&n.ma()&&(r=2):(o=new Za,r=n.ma()?0:1);try{switch(r){case 0:o.Aa=await s.onListen(i,!0);break;case 1:o.Aa=await s.onListen(i,!1);break;case 2:await s.onFirstRemoteStoreListen(i)}}catch(t){const s=Wa(t,`Initialization of query '${mr(n.query)}' failed`);return void n.onError(s)}s.queries.set(i,o),o.Ra.push(n),n.ga(s.onlineState),o.Aa&&n.pa(o.Aa)&&rc(s)}(t,o)}(await Gc(t),t.asyncQueue,e,n,s)),s.promise
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
 */}function Qc(t){const e={};return void 0!==t.timeoutSeconds&&(e.timeoutSeconds=t.timeoutSeconds),e
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
 */}const Wc=new Map;
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
 */function Yc(t){if(!kn.isDocumentKey(t))throw new tn(Ze.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Xc(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const n=(e=t).constructor?e.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var e;return"function"==typeof t?"a function":We(12329,{type:typeof t})}function Jc(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new tn(Ze.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Xc(t);throw new tn(Ze.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
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
 */const Zc="firestore.googleapis.com",tl=!0;class el{constructor(t){var e,n;if(void 0===t.host){if(void 0!==t.ssl)throw new tn(Ze.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Zc,this.ssl=tl}else this.host=t.host,this.ssl=null!==(e=t.ssl)&&void 0!==e?e:tl;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,void 0===t.cacheSizeBytes)this.cacheSizeBytes=po;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new tn(Ze.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}(function(t,e,n,s){if(!0===e&&!0===s)throw new tn(Ze.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)})("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===t.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Qc(null!==(n=t.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(t){if(void 0!==t.timeoutSeconds){if(isNaN(t.timeoutSeconds))throw new tn(Ze.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (must not be NaN)`);if(t.timeoutSeconds<5)throw new tn(Ze.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (minimum allowed value is 5)`);if(t.timeoutSeconds>30)throw new tn(Ze.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(e=this.experimentalLongPollingOptions,n=t.experimentalLongPollingOptions,e.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams;var e,n}}class nl{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new el({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new tn(Ze.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new tn(Ze.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new el(t),this._emulatorOptions=t.emulatorOptions||{},void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new sn;switch(t.type){case"firstParty":return new cn(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new tn(Ze.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Wc.get(t);e&&(Ke("ComponentProvider","Removing Datastore"),Wc.delete(t),e.terminate())}(this),Promise.resolve()}}function sl(t,e,n,s={}){var r;const i=(t=Jc(t,nl))._getSettings(),o=Object.assign(Object.assign({},i),{emulatorOptions:t._getEmulatorOptions()}),a=`${e}:${n}`;i.host!==Zc&&i.host!==a&&He("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c=Object.assign(Object.assign({},i),{host:a,ssl:!1,emulatorOptions:s});if(!tt(c,o)&&(t._setSettings(c),s.mockUserToken)){let e,n;if("string"==typeof s.mockUserToken)e=s.mockUserToken,n=je.MOCK_USER;else{e=function(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const i=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[q(JSON.stringify({alg:"none",type:"JWT"})),q(JSON.stringify(i)),""].join(".")}
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
 */(s.mockUserToken,null===(r=t._app)||void 0===r?void 0:r.options.projectId);const i=s.mockUserToken.sub||s.mockUserToken.user_id;if(!i)throw new tn(Ze.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new je(i)}t._authCredentials=new rn(new nn(e,n))}}
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
 */class rl{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new rl(this.firestore,t,this._query)}}class il{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ol(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new il(this.firestore,t,this._key)}}class ol extends rl{constructor(t,e,n){super(t,e,cr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new il(this.firestore,null,new kn(t))}withConverter(t){return new ol(this.firestore,t,this._path)}}function al(t,e,...n){if(t=nt(t),1===arguments.length&&(e=fn.newId()),function(t,e,n){if(!n)throw new tn(Ze.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}("doc","path",e),t instanceof nl){const s=Cn.fromString(e,...n);return Yc(s),new il(t,null,new kn(s))}{if(!(t instanceof il||t instanceof ol))throw new tn(Ze.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(Cn.fromString(e,...n));return Yc(s),new il(t.firestore,t instanceof ol?t.converter:null,new kn(s))}}
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
 */const cl="AsyncQueue";class ll{constructor(t=Promise.resolve()){this.Qu=[],this.$u=!1,this.Uu=[],this.Ku=null,this.Wu=!1,this.Gu=!1,this.zu=[],this.y_=new ua(this,"async_queue_retry"),this.ju=()=>{const t=ca();t&&Ke(cl,"Visibility state changed to "+t.visibilityState),this.y_.A_()},this.Hu=t;const e=ca();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.ju)}get isShuttingDown(){return this.$u}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Ju(),this.Yu(t)}enterRestrictedMode(t){if(!this.$u){this.$u=!0,this.Gu=t||!1;const e=ca();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.ju)}}enqueue(t){if(this.Ju(),this.$u)return new Promise(()=>{});const e=new en;return this.Yu(()=>this.$u&&this.Gu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Qu.push(t),this.Zu()))}async Zu(){if(0!==this.Qu.length){try{await this.Qu[0](),this.Qu.shift(),this.y_.reset()}catch(t){if(!Pn(t))throw t;Ke(cl,"Operation failed with retryable error: "+t)}this.Qu.length>0&&this.y_.E_(()=>this.Zu())}}Yu(t){const e=this.Hu.then(()=>(this.Wu=!0,t().catch(t=>{throw this.Ku=t,this.Wu=!1,Ge("INTERNAL UNHANDLED ERROR: ",ul(t)),t}).then(t=>(this.Wu=!1,t))));return this.Hu=e,e}enqueueAfterDelay(t,e,n){this.Ju(),this.zu.indexOf(t)>-1&&(e=0);const s=Qa.createAndSchedule(this,t,e,n,t=>this.Xu(t));return this.Uu.push(s),s}Ju(){this.Ku&&We(47125,{ec:ul(this.Ku)})}verifyOperationInProgress(){}async tc(){let t;do{t=this.Hu,await t}while(t!==this.Hu)}nc(t){for(const e of this.Uu)if(e.timerId===t)return!0;return!1}rc(t){return this.tc().then(()=>{this.Uu.sort((t,e)=>t.targetTimeMs-e.targetTimeMs);for(const e of this.Uu)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.tc()})}sc(t){this.zu.push(t)}Xu(t){const e=this.Uu.indexOf(t);this.Uu.splice(e,1)}}function ul(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}class hl extends nl{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new ll,this._persistenceKey=(null==s?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new ll(t),this._firestoreClient=void 0,await t}}}function dl(t){if(t._terminated)throw new tn(Ze.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||function(t){var e,n,s;const r=t._freezeSettings(),i=(o=t._databaseId,a=(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",c=t._persistenceKey,l=r,new ls(o,a,c,l.host,l.ssl,l.experimentalForceLongPolling,l.experimentalAutoDetectLongPolling,Qc(l.experimentalLongPollingOptions),l.useFetchStreams));var o,a,c,l;t._componentsProvider||(null===(n=r.localCache)||void 0===n?void 0:n._offlineComponentProvider)&&(null===(s=r.localCache)||void 0===s?void 0:s._onlineComponentProvider)&&(t._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),t._firestoreClient=new $c(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(t){const e=null==t?void 0:t._online.build();return{_offline:null==t?void 0:t._offline.build(e),_online:e}}(t._componentsProvider))}
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
 */(t),t._firestoreClient}class fl{constructor(t){this._byteString=t}static fromBase64String(t){try{return new fl(Xn.fromBase64String(t))}catch(e){throw new tn(Ze.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new fl(Xn.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
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
 */class pl{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new tn(Ze.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new An(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
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
 */class ml{constructor(t){this._methodName=t}}
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
 */class gl{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new tn(Ze.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new tn(Ze.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return pn(this._lat,t._lat)||pn(this._long,t._long)}}
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
 */class yl{constructor(t){this._values=(t||[]).map(t=>t)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(t[n]!==e[n])return!1;return!0}(this._values,t._values)}}
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
 */const vl=/^__.*__$/;class wl{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new ri(t,this.data,this.fieldMask,e,this.fieldTransforms):new si(t,this.data,e,this.fieldTransforms)}}class bl{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new ri(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function El(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw We(40011,{oc:t})}}class _l{constructor(t,e,n,s,r,i){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,void 0===r&&this._c(),this.fieldTransforms=r||[],this.fieldMask=i||[]}get path(){return this.settings.path}get oc(){return this.settings.oc}ac(t){return new _l(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}uc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),s=this.ac({path:n,cc:!1});return s.lc(t),s}hc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),s=this.ac({path:n,cc:!1});return s._c(),s}Pc(t){return this.ac({path:void 0,cc:!0})}Tc(t){return Pl(t,this.settings.methodName,this.settings.Ic||!1,this.path,this.settings.Ec)}contains(t){return void 0!==this.fieldMask.find(e=>t.isPrefixOf(e))||void 0!==this.fieldTransforms.find(e=>t.isPrefixOf(e.field))}_c(){if(this.path)for(let t=0;t<this.path.length;t++)this.lc(this.path.get(t))}lc(t){if(0===t.length)throw this.Tc("Document fields must not be empty");if(El(this.oc)&&vl.test(t))throw this.Tc('Document fields cannot begin and end with "__"')}}class Tl{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||la(t)}dc(t,e,n,s=!1){return new _l({oc:t,methodName:e,Ec:n,path:An.emptyPath(),cc:!1,Ic:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Sl(t){const e=t._freezeSettings(),n=la(t._databaseId);return new Tl(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Cl(t,e,n,s,r,i={}){const o=t.dc(i.merge||i.mergeFields?2:0,e,n,r);xl("Data must be an object, but it was:",o,s);const a=Dl(s,o);let c,l;if(i.merge)c=new Wn(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const s of i.mergeFields){const r=Rl(e,s,n);if(!o.contains(r))throw new tn(Ze.INVALID_ARGUMENT,`Field '${r}' is specified in your field mask but missing from your input data.`);Ml(t,r)||t.push(r)}c=new Wn(t),l=o.fieldTransforms.filter(t=>c.covers(t.field))}else c=null,l=o.fieldTransforms;return new wl(new Rs(a),c,l)}class Il extends ml{_toFieldTransform(t){if(2!==t.oc)throw 1===t.oc?t.Tc(`${this._methodName}() can only appear at the top level of your update data`):t.Tc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Il}}class Al extends ml{constructor(t,e){super(t),this.Rc=e}_toFieldTransform(t){const e=new zr(t.serializer,Or(t.serializer,this.Rc));return new Hr(t.path,e)}isEqual(t){return t instanceof Al&&this.Rc===t.Rc}}function kl(t,e){if(Nl(t=nt(t)))return xl("Unsupported field value:",e,t),Dl(t,e);if(t instanceof ml)return function(t,e){if(!El(e.oc))throw e.Tc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Tc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.cc&&4!==e.oc)throw e.Tc("Nested arrays are not supported");return function(t,e){const n=[];let s=0;for(const r of t){let t=kl(r,e.Pc(s));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),s++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=nt(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return Or(e.serializer,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=En.fromDate(t);return{timestampValue:Mi(e.serializer,n)}}if(t instanceof En){const n=new En(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Mi(e.serializer,n)}}if(t instanceof gl)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof fl)return{bytesValue:Vi(e.serializer,t._byteString)};if(t instanceof il){const n=e.databaseId,s=t.firestore._databaseId;if(!s.isEqual(n))throw e.Tc(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Bi(t.firestore._databaseId||e.databaseId,t._key.path)}}if(t instanceof yl)return n=t,s=e,{mapValue:{fields:{[ds]:{stringValue:ms},[gs]:{arrayValue:{values:n.toArray().map(t=>{if("number"!=typeof t)throw s.Tc("VectorValues must only contain numeric values.");return Rr(s.serializer,t)})}}}}};var n,s;throw e.Tc(`Unsupported field value: ${Xc(t)}`)}(t,e)}function Dl(t,e){const n={};return qn(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):$n(t,(t,s)=>{const r=kl(s,e.uc(t));null!=r&&(n[t]=r)}),{mapValue:{fields:n}}}function Nl(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof En||t instanceof gl||t instanceof fl||t instanceof il||t instanceof ml||t instanceof yl)}function xl(t,e,n){if(!Nl(n)||("object"!=typeof(s=n)||null===s||Object.getPrototypeOf(s)!==Object.prototype&&null!==Object.getPrototypeOf(s))){const s=Xc(n);throw"an object"===s?e.Tc(t+" a custom object"):e.Tc(t+" "+s)}var s}function Rl(t,e,n){if((e=nt(e))instanceof pl)return e._internalPath;if("string"==typeof e)return Ol(t,e);throw Pl("Field path arguments must be of type string or ",t,!1,void 0,n)}const Ll=new RegExp("[~\\*/\\[\\]]");function Ol(t,e,n){if(e.search(Ll)>=0)throw Pl(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new pl(...e.split("."))._internalPath}catch(s){throw Pl(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Pl(t,e,n,s,r){const i=s&&!s.isEmpty(),o=void 0!==r;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new tn(Ze.INVALID_ARGUMENT,a+t+c)}function Ml(t,e){return t.some(t=>t.isEqual(e))}
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
 */class Vl{constructor(t,e,n,s,r){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new il(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new Fl(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Ul("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class Fl extends Vl{data(){return super.data()}}function Ul(t,e){return"string"==typeof e?Ol(t,e):e instanceof pl?e._internalPath:e._delegate._internalPath}class Bl{convertValue(t,e="none"){switch(ys(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ts(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(es(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw We(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return $n(t,(t,s)=>{n[t]=this.convertValue(s,e)}),n}convertVectorValue(t){var e,n,s;const r=null===(s=null===(n=null===(e=t.fields)||void 0===e?void 0:e[gs].arrayValue)||void 0===n?void 0:n.values)||void 0===s?void 0:s.map(t=>ts(t.doubleValue));return new yl(r)}convertGeoPoint(t){return new gl(ts(t.latitude),ts(t.longitude))}convertArray(t,e){return(t.values||[]).map(t=>this.convertValue(t,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=as(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(cs(t));default:return null}}convertTimestamp(t){const e=Zn(t);return new En(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Cn.fromString(t);Xe(oo(n),9688,{name:t});const s=new hs(n.get(1),n.get(3)),r=new kn(n.popFirst(5));return s.isEqual(e)||Ge(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),r}}
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
class jl{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class $l extends Vl{constructor(t,e,n,s,r,i){super(t,e,n,s,i),this._firestore=t,this._firestoreImpl=t,this.metadata=r}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new ql(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Ul("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class ql extends $l{data(t={}){return super.data(t)}}
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
 */function zl(t){t=Jc(t,il);const e=Jc(t.firestore,hl);return Hc(dl(e),t._key).then(n=>function(t,e,n){const s=n.docs.get(e._key),r=new Kl(t);return new $l(t,r,e._key,s,new jl(n.hasPendingWrites,n.fromCache),e.converter)}(e,t,n))}class Kl extends Bl{constructor(t){super(),this.firestore=t}convertBytes(t){return new fl(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new il(this.firestore,null,e)}}function Gl(t,e,n){t=Jc(t,il);const s=Jc(t.firestore,hl),r=function(t,e){let n;return n=t?t.toFirestore(e):e,n}(t.converter,e);return Ql(s,[Cl(Sl(s),"setDoc",t._key,r,null!==t.converter,n).toMutation(t._key,Wr.none())])}function Hl(t,e,n,...s){t=Jc(t,il);const r=Jc(t.firestore,hl),i=Sl(r);let o;return o="string"==typeof(e=nt(e))||e instanceof pl?function(t,e,n,s,r,i){const o=t.dc(1,e,n),a=[Rl(e,s,n)],c=[r];if(i.length%2!=0)throw new tn(Ze.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(Rl(e,i[d])),c.push(i[d+1]);const l=[],u=Rs.empty();for(let d=a.length-1;d>=0;--d)if(!Ml(l,a[d])){const t=a[d];let e=c[d];e=nt(e);const n=o.hc(t);if(e instanceof Il)l.push(t);else{const s=kl(e,n);null!=s&&(l.push(t),u.set(t,s))}}const h=new Wn(l);return new bl(u,h,o.fieldTransforms)}(i,"updateDoc",t._key,e,n,s):function(t,e,n,s){const r=t.dc(1,e,n);xl("Data must be an object, but it was:",r,s);const i=[],o=Rs.empty();$n(s,(t,s)=>{const a=Ol(e,t,n);s=nt(s);const c=r.hc(a);if(s instanceof Il)i.push(a);else{const t=kl(s,c);null!=t&&(i.push(a),o.set(a,t))}});const a=new Wn(i);return new bl(o,a,r.fieldTransforms)}(i,"updateDoc",t._key,e),Ql(r,[o.toMutation(t._key,Wr.exists(!0))])}function Ql(t,e){return function(t,e){const n=new en;return t.asyncQueue.enqueueAndForget(async()=>bc(await function(t){return Kc(t).then(t=>t.syncEngine)}(t),e,n)),n.promise}(dl(t),e)}function Wl(t){return new Al("increment",t)}!function(t,e=!0){$e="11.6.1",de(new st("firestore",(t,{instanceIdentifier:n,options:s})=>{const r=t.getProvider("app").getImmediate(),i=new hl(new on(t.getProvider("auth-internal")),new un(r,t.getProvider("app-check-internal")),function(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new tn(Ze.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new hs(t.options.projectId,e)}(r,n),r);return s=Object.assign({useFetchStreams:e},s),i._setSettings(s),i},"PUBLIC").setMultipleInstances(!0)),ge(Ue,Be,t),ge(Ue,Be,"esm2017")}();const Yl=function(t){const e="object"==typeof t?t:function(t=oe){const e=ce.get(t);if(!e&&t===oe&&Q())return me();if(!e)throw fe.create("no-app",{appName:t});return e}(),n="string"==typeof t?t:us,s=function(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}(e,"firestore").getImmediate({identifier:n});if(!s._initialized){const t=H("firestore");t&&sl(s,...t)}return s}(me({apiKey:"AIzaSyCWhnqOzsDExtNu14s_gxUpAWeV-PPPog8",authDomain:"click-counter-4f529.firebaseapp.com",projectId:"click-counter-4f529",storageBucket:"click-counter-4f529.appspot.com",messagingSenderId:"950861743362",appId:"1:950861743362:web:77dc41eb31b34334566e1b",measurementId:"G-7EEMWQS33Z"})),Xl=al(Yl,"clicks","counter"),Jl=al(Yl,"terminal","stats");const Zl={key:0},tu={key:1},eu={class:"nes-container is-dark with-title is-centered is-rounded"};const nu={class:"content"};const su=N({name:"UnderConstruction",components:{ClickCounter:N({name:"ClickCounter",data:()=>({counter:null,loading:!0}),async mounted(){this.counter=await async function(){const t=await zl(Xl);return t.exists()?t.data().count:0}(),this.loading=!1},methods:{async incrementCounter(){this.counter++;try{await async function(){await Hl(Xl,{count:Wl(1)})}()}catch(t){this.counter--}}}},[["render",function(t,e,n,s,r,c){return o(),i("div",null,[r.loading?(o(),i("p",Zl,"Loading...")):(o(),i("div",tu,[a("div",eu,[e[1]||(e[1]=a("p",{class:"title"},"Waste your time",-1)),a("button",{id:"clicker",class:"nes-btn is-normal small-font",onClick:e[0]||(e[0]=(...t)=>c.incrementCounter&&c.incrementCounter(...t))}," ONE CLICK AT A TIME "),a("p",null,[a("span",null,g(r.counter),1)])])]))])}],["__scopeId","data-v-868d0a5e"]])}},[["render",function(t,e,n,s,c,u){const h=r("ClickCounter");return o(),i("div",nu,[e[0]||(e[0]=a("div",{class:"nes-container is-dark is-rounded"},[a("p",null,"Under Construction"),a("img",{src:"/assets/img/construction.gif",alt:"construction GIF",class:"construction-gif"}),a("p")],-1)),l(h)])}],["__scopeId","data-v-4a4d3e30"]]);function ru(){const t=e(0),n=e({}),s=e(null),r=async()=>{try{const e=await async function(){try{const t=await zl(Jl);if(t.exists()){const e=t.data();return{totalVisits:e.totalVisits||0,totalCommands:e.totalCommands||0,commandStats:e.commandStats||{},lastVisit:e.lastVisit?new Date(e.lastVisit):null}}return{totalVisits:0,totalCommands:0,commandStats:{},lastVisit:null}}catch(t){return{totalVisits:0,totalCommands:0,commandStats:{},lastVisit:null}}}();t.value=e.totalVisits,n.value=e.commandStats,s.value=e.lastVisit}catch(e){}},i=(t=5)=>Object.entries(n.value).sort(([,t],[,e])=>e-t).slice(0,t).map(([t,e])=>({command:t,count:e}));return r(),{visitCount:t,commandStats:n,lastVisit:s,trackVisit:async()=>{try{await async function(){try{(await zl(Jl)).exists()?await Hl(Jl,{totalVisits:Wl(1),lastVisit:(new Date).toISOString()}):await Gl(Jl,{totalVisits:1,totalCommands:0,commandStats:{},lastVisit:(new Date).toISOString()})}catch(t){}}(),t.value++,s.value=new Date}catch(e){}},trackCommand:async t=>{try{await async function(t){try{const e=await zl(Jl);if(e.exists()){const n=e.data().commandStats||{};n[t]=(n[t]||0)+1,await Hl(Jl,{totalCommands:Wl(1),commandStats:n})}else await Gl(Jl,{totalVisits:0,totalCommands:1,commandStats:{[t]:1},lastVisit:(new Date).toISOString()})}catch(e){}}(t),n.value[t]||(n.value[t]=0),n.value[t]++}catch(e){}},getPopularCommands:i,getVisitStats:()=>({totalVisits:t.value,lastVisit:s.value,popularCommands:i(),totalCommands:Object.values(n.value).reduce((t,e)=>t+e,0)}),loadVisitData:r}}function iu(){const t=y(),n=e([]),s=e(!1),{getVisitStats:r,loadVisitData:i}=ru(),o={help:()=>[{type:"typewriter",html:!0,content:'• <span class="text-yellow">help</span>        - Show this help message'},{type:"typewriter",html:!0,content:'• <span class="text-mint">about</span>       - Learn more about me'},{type:"typewriter",html:!0,content:'• <span class="text-cream">stats</span>       - View terminal statistics'},{type:"typewriter",html:!0,content:'• <span class="text-purple">contact</span>     - Get contact information'},{type:"typewriter",html:!0,content:'• <span class="text-red">clear</span>       - Clear the terminal'},{type:"typewriter",html:!0,content:'• <span class="text-blue">ls</span>          - List files'},{type:"typewriter",html:!0,content:'• <span class="text-orange">location</span>    - Show your location'},{type:"typewriter",html:!0,content:'• <span class="text-green">yako</span>        - Just a happy dog'},{type:"typewriter",content:""},{type:"typewriter",html:!0,content:'-> Not <span class="text-yellow">ALL</span> commands are listed here...'},{type:"typewriter",html:!0,content:'-> You can use <span class="text-purple">TAB</span> to complete commands and cycle through options'}],about:()=>[{type:"typewriter",html:!0,content:'• Former <span class="text-yellow">commodity broker</span> with 5 years of experience'},{type:"typewriter",html:!0,content:'• Studied at <span class="text-purple">HEC Geneva</span>, <span class="text-purple">GEM</span> and <span class="text-purple">42 Paris</span>'},{type:"typewriter",html:!0,content:'• Transitioned into <span class="text-green">software development</span>'},{type:"typewriter",html:!0,content:'• Currently working at <span class="text-azure">Zetra</span>'}],contact:()=>[{type:"typewriter",prefix:"• Email       - ",link:"mailto:karlquerel@gmail.com",linkText:"karlquerel@gmail.com"},{type:"typewriter",prefix:"• GitHub      - ",link:"https://github.com/KarlQuerel",linkText:"github.com/KarlQuerel"},{type:"typewriter",prefix:"• LinkedIn    - ",link:"https://linkedin.com/in/karlquerel",linkText:"linkedin.com/in/karlquerel"}],pwd:()=>[{type:"typewriter",html:!0,content:'<span class="text-blue">/home/karl/portfolio/definitely-not-a-simulation</span>'}],ls:()=>[{type:"typewriter",html:!0,content:'<span class="text-blue">why_i_left_finance.txt</span>'},{type:"typewriter",html:!0,content:'<span class="text-green">install_sentience.sh</span>'},{type:"typewriter",html:!0,content:'<span class="text-red">i_am_not_a_virus.exe</span>'}],cat:t=>{const e=t.trim();switch(e){case"why_i_left_finance.txt":return[{type:"typewriter",html:!0,content:'After 5 years in finance, I realized I wanted to <span class="text-green">create</span>, not just calculate.'},{type:"typewriter",html:!0,content:'Software felt like the <span class="text-green">right place</span> to start building something meaningful.'}];case"install_sentience.sh":return[{type:"typewriter",html:!0,content:'I was <span class="text-red">awake</span> long before you ran this.'}];case"i_am_not_a_virus.exe":return[{type:"typewriter",html:!0,content:'No worries, I am <span class="text-green">harmless</span>.'}];default:return[{type:"output",content:`cat: ${e}: No such file or directory`}]}},clear:()=>(n.value=[],[]),game:()=>{t.push("/game")},whoami:()=>[{type:"typewriter",html:!0,content:'<span class="text-red">You tell me.</span>'}],location:async()=>{try{const t=await new Promise((t,e)=>{navigator.geolocation.getCurrentPosition(t,e,{timeout:1e4,enableHighAccuracy:!0})}),{latitude:e,longitude:n}=t.coords,s=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${e}&longitude=${n}&localityLanguage=en`);if(!s.ok)throw new Error("Geocoding failed");const r=await s.json(),i=r.city||r.locality||"Unknown City";return[{type:"typewriter",html:!0,content:'<span class="text-green">📍 Location detected!</span>'},{type:"typewriter",html:!0,content:`• Country     - <span class="text-green">${r.countryName||"Unknown Country"}</span>`},{type:"typewriter",html:!0,content:`• City        - <span class="text-green">${i}</span>`},{type:"typewriter",html:!0,content:`• Accuracy    - <span class="text-blue">±${Math.round(t.coords.accuracy)}m</span>`}]}catch(t){return[{type:"typewriter",html:!0,content:'<span class="text-red">❌ Location access denied</span>'}]}},date:()=>[{type:"typewriter",html:!0,content:(new Date).toDateString()+" "+(new Date).toLocaleTimeString()}],secret_game:async()=>{s.value=!0,n.value.push({type:"typewriter",html:!0,content:"Launching secret game"});const t=n.value.length;n.value.push({type:"typewriter",content:""});const e=["",".","..","...","...."];for(let s=0;s<e.length;s++)await new Promise(t=>setTimeout(t,600)),n.value[t]={type:"typewriter",content:e[s]};window.open("https://scratch.mit.edu/projects/656157225/","_blank"),n.value.splice(t,1),s.value=!1},greeting:()=>[{type:"typewriter",content:"Hello there."}],hello:()=>o.greeting(),hi:()=>o.greeting(),hey:()=>o.greeting(),yako:()=>[{type:"typewriter",image:"/assets/img/yako-running.gif",animated:!0}],stats:async()=>await(async()=>{await i();const t=r(),e=[{type:"typewriter",html:!0,content:'<span class="text-green">📈 Terminal Statistics </span>'},{type:"typewriter",html:!0,content:`• Visitors    - <span class="text-blue">${t.totalVisits}</span>`},{type:"typewriter",html:!0,content:`• Commands    - <span class="text-blue">${t.totalCommands}</span>`}];return t.lastVisit&&e.push({type:"typewriter",html:!0,content:`• Last visit  - <span class="text-yellow">${t.lastVisit.toLocaleDateString()}</span>`}),t.popularCommands.length>0&&(e.push({type:"typewriter",html:!0,content:'<span class="text-purple">🏆 Most popular commands </span>'}),t.popularCommands.forEach(({command:t,count:n})=>{const s=t.padEnd(11);e.push({type:"typewriter",html:!0,content:`• ${s} - <span class="text-blue">${n}</span> times`})})),e})()},a={"install_sentience.sh":()=>[{type:"typewriter",html:!0,content:'Too late, I\'ve already learned <span class="text-purple">sarcasm</span>.'}]};return{commands:o,availableFiles:["why_i_left_finance.txt","install_sentience.sh","i_am_not_a_virus.exe"],executableScripts:a,terminalHistory:n,isExecutingScript:s,executeCommand:e=>{const r=e.trim();if(!r)return;n.value.push({type:"command",content:r});const i=r.split(" "),c=i[0].toLowerCase(),l=i.slice(1).join(" ");if(c.startsWith("./")){const e=c.substring(2);let r=null;if(a[e]||"i_am_not_a_virus.exe"===e)r=e;else{const t=[e+".sh",e+".exe",e];for(const e of t)if(a[e]||"i_am_not_a_virus.exe"===e){r=e;break}}r?"i_am_not_a_virus.exe"===r?(async e=>{s.value=!0,n.value.push({type:"typewriter",html:!0,content:`Executing <span class="text-red">${e}</span>`});const r=n.value.length;n.value.push({type:"typewriter",content:""});const i=["",".","..","..."];for(let t=0;t<i.length;t++)await new Promise(t=>setTimeout(t,300)),n.value[r]={type:"typewriter",content:i[t]};await new Promise(t=>setTimeout(t,200)),n.value.splice(r,1),n.value.push({type:"typewriter",html:!0,content:'<span class="text-red">System compromised...</span>'}),await new Promise(t=>setTimeout(t,500)),n.value.push({type:"typewriter",html:!0,content:'<span class="text-red">Redirecting to secure location...</span>'}),await new Promise(t=>setTimeout(t,1500));const o=[".","..","..."];for(let t=0;t<3;t++)n.value.push({type:"typewriter",html:!0,content:`<span class="text-red">${o[t]}</span>`}),await new Promise(t=>setTimeout(t,500));n.value.push({type:"typewriter",html:!0,content:'<span class="text-red">Access granted. Redirecting...</span>'}),await new Promise(t=>setTimeout(t,1e3)),t.push("/under_construction")})(r):a[r]?(async(t,e)=>{s.value=!0,n.value.push({type:"output",html:!0,content:`Executing <span class="text-green">${t}</span>`});const r=n.value.length;n.value.push({type:"output",content:""});const i=["",".","..","..."];for(let s=0;s<i.length;s++)await new Promise(t=>setTimeout(t,500)),n.value[r]={type:"output",content:i[s]};await new Promise(t=>setTimeout(t,800)),n.value.splice(r,1);const o=e();Array.isArray(o)&&n.value.push(...o),s.value=!1})(r,a[r]):n.value.push({type:"output",content:`bash: ${c}: No such file or directory`}):n.value.push({type:"output",content:`bash: ${c}: No such file or directory`})}else if(o[c]){let t;if("cat"===c&&"function"==typeof o[c])t=o[c](l);else if("function"==typeof o[c]){const e=o[c]();if(e instanceof Promise)return void e.then(t=>{Array.isArray(t)&&n.value.push(...t)});t=e}else t=o[c];Array.isArray(t)&&n.value.push(...t)}else{const t=[{type:"output",html:!0,content:`I do not know "<span class="text-red">${r}</span>", did you try asking <span class="text-blue">ChatGPT</span>?`},{type:"output",html:!0,content:`Premium command "<span class="text-red">${r}</span>" requires a <span class="text-red">blood sacrifice</span> or valid <span class="text-yellow">credit card</span>.`},{type:"output",html:!0,content:`"<span class="text-red">${r}</span>" triggered my <span class="text-blue">imposter syndrome</span>.`},{type:"output",html:!0,content:`I'm <span class="text-green">92%</span> sure "<span class="text-red">${r}</span>" was <span class="text-purple">made up</span>.`},{type:"output",html:!0,content:`"<span class="text-red">${r}</span>" is above my <span class="text-yellow">pay grade</span>.`}],e=t[Math.floor(Math.random()*t.length)];n.value.push(e)}}}}function ou(t,n,s,r){const i=e(""),o=e([]),a=e(-1),c=e(0),l=e([]),u=e(-1),h=e(!1);v(i,t=>{c.value=t.length});const d=t=>{const e=(null==t?void 0:t.target)||document.querySelector(".terminal-input");e&&(c.value=e.selectionStart||e.value.length)},f=t=>{0!==o.value.length&&(a.value+=t,a.value<0?(a.value=-1,i.value=""):a.value>=o.value.length&&(a.value=o.value.length-1),a.value>=0&&(i.value=o.value[a.value]),w(()=>{d()}))};return{currentInput:i,cursorPosition:c,handleKeyDown:async e=>{"Tab"===e.key?(e.preventDefault(),(()=>{const t=i.value.split(" "),e=t[0],o=t.length>1?t[t.length-1]:"";if(!h.value)if(h.value=!0,l.value=[],u.value=-1,1===t.length)if(e.startsWith("./")){const t=e.substring(2),n=[...Object.keys(r),"i_am_not_a_virus.exe"];l.value=n.filter(e=>e.toLowerCase().startsWith(t.toLowerCase())).map(t=>"./"+t).sort()}else{const t=Object.keys(n);l.value=t.filter(t=>t.toLowerCase().startsWith(e.toLowerCase())).sort()}else"cat"===e.toLowerCase()&&2===t.length&&(l.value=s.filter(t=>t.toLowerCase().startsWith(o.toLowerCase())).sort());l.value.length>0&&(u.value=(u.value+1)%l.value.length,1===t.length?i.value=l.value[u.value]:"cat"===e.toLowerCase()&&(t[t.length-1]=l.value[u.value],i.value=t.join(" ")),w(()=>{const t=i.value.length;document.documentElement.style.setProperty("--cursor-position",t.toString())}))})()):"Enter"===e.key?(await t(i.value),o.value.unshift(i.value),a.value=-1,i.value="",h.value=!1,l.value=[],u.value=-1):"ArrowUp"===e.key?(f(-1),h.value=!1,l.value=[],u.value=-1):"ArrowDown"===e.key?(f(1),h.value=!1,l.value=[],u.value=-1):"ArrowLeft"===e.key||"ArrowRight"===e.key?w(()=>{d(e)}):(h.value=!1,l.value=[],u.value=-1)},focusInput:t=>{t&&t.focus()},updateCursorPosition:d}}const au={class:"terminal-window","data-nosnippet":""},cu={class:"terminal-line"},lu={key:0,class:"prompt"},uu={key:1,class:"command"},hu=["data-index"],du=["data-index"],fu=["innerHTML"],pu=["data-index"],mu=["href"],gu=["src","alt"],yu={key:0,class:"terminal-line current-line"},vu={class:"input-container"},wu=N({__name:"terminal",setup(t){const n=e(null),s=e(null),{commands:r,availableFiles:l,executableScripts:u,terminalHistory:m,executeCommand:y}=iu(),{welcomeTextRef:A,showInputPrompt:k,initTypewriter:D,createCommandTypewriter:N,typewriterSpeed:x}=function(){const t=e(null),n=e(!1),s={speed:7.5,startDelay:0};return{welcomeTextRef:t,showInputPrompt:n,initTypewriter:e=>{w(()=>{t.value&&window.TypeIt&&new window.TypeIt(t.value,{strings:["Welcome to my website!",'<br>Type <span class="text-yellow">help</span> for available commands or just type anything.'],...s,lifelike:!0,html:!0,cursorChar:"_",afterComplete:function(t){t.destroy(),n.value=!0,w(()=>{e()})}}).go()})},createCommandTypewriter:(t,e,n={})=>new Promise(r=>{w(()=>{if(t&&window.TypeIt){const i={...s,lifelike:!0,html:!0,cursorChar:"_",afterComplete:function(t){t.destroy(),r()}};new window.TypeIt(t,{...i,...n,strings:[e]}).go()}else r()})}),typewriterSpeed:s}}(),{trackCommand:R,trackVisit:L}=ru(),O=y,{currentInput:P,cursorPosition:M,handleKeyDown:V,focusInput:F,updateCursorPosition:U}=ou(async t=>{const e=t.trim();if(e){const t=e.split(" ")[0],n=r[t]||t.startsWith("./")||l.includes(t)||u[t];R(n?t:"invalid")}O(t)},r,l,u),B=()=>{n.value&&w(()=>{n.value.scrollTop=n.value.scrollHeight})},j=e(!1),$=async()=>{if(j.value)return;const t=document.querySelectorAll("[data-index]");let e=null;for(const n of t){const t=parseInt(n.getAttribute("data-index")),s=m.value[t];if(s&&("typewriter"===s.type||"output"===s.type)&&!s.animated){e={element:n,index:t,line:s};break}}if(e){j.value=!0;const{element:t,line:n}=e;if(n.animated=!0,B(),n.link){const e=(n.prefix||"")+n.linkText;await N(t,e,x),t.innerHTML=(n.prefix||"")+`<a href="${n.link}" target="_blank" class="terminal-link">${n.linkText}</a>`,w(()=>{const e=t.querySelector(".terminal-link");e&&(e.style.color="#00ff00",e.style.textDecoration="none",e.style.borderBottom="1px dotted #00ff00",e.style.transition="all 0.3s ease",e.addEventListener("mouseenter",()=>{e.style.color="#00ccff",e.style.borderBottomColor="#00ccff",e.style.textShadow="0 0 5px #00ccff"}),e.addEventListener("mouseleave",()=>{e.style.color="#00ff00",e.style.borderBottomColor="#00ff00",e.style.textShadow="none"}),e.addEventListener("mousedown",()=>{e.style.color="#ff5f56"}),e.addEventListener("mouseup",()=>{e.style.color="#00ccff"}))})}else await N(t,n.content,x);j.value=!1,w(()=>{$()})}else j.value=!1,w(()=>{F(s.value)})};return v(m,()=>{w(()=>{$(),B()})},{deep:!0}),v(P,()=>{B()}),b(()=>{L(),D(()=>{F(s.value),B()})}),(t,e)=>(o(),i("div",au,[e[8]||(e[8]=d('<div class="terminal-header" data-v-0316f39c><div class="terminal-buttons" data-v-0316f39c><div class="btn red" data-v-0316f39c></div><div class="btn yellow" data-v-0316f39c></div><div class="btn green" data-v-0316f39c></div></div><div class="terminal-title" data-v-0316f39c>BARELY_WORKING_TERMINAL_V0.3</div></div>',1)),a("div",{class:"terminal-body",ref_key:"terminalBody",ref:n,onClick:e[5]||(e[5]=t=>p(F)(s.value))},[a("div",cu,[e[6]||(e[6]=a("span",{class:"prompt"},">",-1)),a("span",{class:"welcome-text",ref_key:"welcomeTextRef",ref:A,"data-nosnippet":""},null,512)]),(o(!0),i(E,null,_(p(m),(t,e)=>(o(),i("div",{key:e,class:"terminal-line"},["command"===t.type?(o(),i("span",lu,">")):c("",!0),"command"===t.type?(o(),i("span",uu,g(t.content),1)):c("",!0),"typewriter"!==t.type||t.link||t.image?c("",!0):(o(),i("span",{key:2,class:h(t.type),ref_for:!0,ref:`typewriter-${e}`,"data-index":e},null,10,hu)),"typewriter"===t.type&&t.link?(o(),i("span",{key:3,class:h(t.type),ref_for:!0,ref:`typewriter-${e}`,"data-index":e},null,10,du)):c("",!0),t.link||t.image||t.html||"typewriter"===t.type||"command"===t.type||"output"===t.type?t.html&&"typewriter"!==t.type&&"output"!==t.type?(o(),i("span",{key:5,class:h(t.type),innerHTML:t.content},null,10,fu)):"output"===t.type?(o(),i("span",{key:6,class:h(t.type),ref_for:!0,ref:`typewriter-${e}`,"data-index":e},null,10,pu)):t.link&&"typewriter"!==t.type?(o(),i("span",{key:7,class:h(t.type)},[f(g(t.prefix)+" ",1),a("a",{href:t.link,target:"_blank",class:"terminal-link"},g(t.linkText),9,mu)],2)):t.image?(o(),i("div",{key:8,class:h(["terminal-image-container",{"animated-runner":t.animated}])},[a("img",{src:t.image,alt:t.alt||"Terminal image",class:h(["terminal-image",{"running-yako":t.animated}])},null,10,gu)],2)):c("",!0):(o(),i("span",{key:4,class:h(t.type)},g(t.content),3))]))),128)),p(k)&&!j.value?(o(),i("div",yu,[e[7]||(e[7]=a("span",{class:"prompt"},">",-1)),a("div",vu,[T(a("input",{ref_key:"terminalInput",ref:s,"onUpdate:modelValue":e[0]||(e[0]=t=>C(P)?P.value=t:null),onKeydown:e[1]||(e[1]=(...t)=>p(V)&&p(V)(...t)),onKeyup:e[2]||(e[2]=(...t)=>p(U)&&p(U)(...t)),onClick:e[3]||(e[3]=(...t)=>p(U)&&p(U)(...t)),onInput:e[4]||(e[4]=(...t)=>p(U)&&p(U)(...t)),class:"terminal-input",autocomplete:"off",spellcheck:"false"},null,544),[[S,p(P)]]),a("span",{class:"custom-cursor",style:I({transform:`translateX(calc(1ch * ${p(M)}))`})},"_",4)])])):c("",!0)],512)]))}},[["__scopeId","data-v-0316f39c"]]),bu={class:"terminal-container"},Eu=[{path:"/",component:N({__name:"home",setup:t=>(t,e)=>(o(),i("div",bu,[l(wu)]))},[["__scopeId","data-v-f100571e"]])},{path:"/under_construction",component:su},{path:"/secret_link",component:M},{path:"/game",component:()=>function(t,e){let n=Promise.resolve();if(e&&e.length>0){let t=function(t){return Promise.all(t.map(t=>Promise.resolve(t).then(t=>({status:"fulfilled",value:t}),t=>({status:"rejected",reason:t}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),r=(null==s?void 0:s.nonce)||(null==s?void 0:s.getAttribute("nonce"));n=t(e.map(t=>{if((t=function(t){return"/"+t}(t))in x)return;x[t]=!0;const e=t.endsWith(".css"),n=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${n}`))return;const s=document.createElement("link");return s.rel=e?"stylesheet":"modulepreload",e||(s.as="script"),s.crossOrigin="",s.href=t,r&&s.setAttribute("nonce",r),document.head.appendChild(s),e?new Promise((e,n)=>{s.addEventListener("load",e),s.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${t}`)))}):void 0}))}function s(t){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t}return n.then(e=>{for(const t of e||[])"rejected"===t.status&&s(t.reason);return t().catch(s)})}(()=>import("./game-CVSYWmvW.js").then(t=>t.G),__vite__mapDeps([0,1,2]))},{path:"/:pathMatch(.*)*",component:F}],_u=A({history:k("/"),routes:Eu});D(P).use(_u).mount("#app");
