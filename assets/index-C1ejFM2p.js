const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HeroIntro-5XmtTt-Q.js","assets/vendor-6_8o02co.js","assets/usePrefersReducedMotion-DRRbSeEv.js","assets/game-Dpp5zovV.js","assets/game-BIPyfkgn.css","assets/HeroIntro-wxHFNYB0.css","assets/styles-CiKfDS1c.css","assets/home-CBTyoJUG.js","assets/home-Da3nAulI.css","assets/About-DnLl50zc.js","assets/About-CzqATfuq.css","assets/Contact-C2WOJltI.js","assets/Contact-DIO89kZq.css","assets/sport-6OBsFATo.js"])))=>i.map(i=>d[i]);
/* empty css               */import{x as t,o as e,y as n,b as r,c as s,n as i,F as o,j as a,d as c,r as u,h,z as l,m as d,A as f,e as p,B as m,i as g,t as y,C as v,D as w,E}from"./vendor-6_8o02co.js";import{_ as b}from"./game-Dpp5zovV.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const n of t)if("childList"===n.type)for(const t of n.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)}).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const T={},_=function(t,e,n){let r=Promise.resolve();if(e&&e.length>0){let t=function(t){return Promise.all(t.map(t=>Promise.resolve(t).then(t=>({status:"fulfilled",value:t}),t=>({status:"rejected",reason:t}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),s=(null==n?void 0:n.nonce)||(null==n?void 0:n.getAttribute("nonce"));r=t(e.map(t=>{if((t=function(t){return"/"+t}(t))in T)return;T[t]=!0;const e=t.endsWith(".css"),n=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${n}`))return;const r=document.createElement("link");return r.rel=e?"stylesheet":"modulepreload",e||(r.as="script"),r.crossOrigin="",r.href=t,s&&r.setAttribute("nonce",s),document.head.appendChild(r),e?new Promise((e,n)=>{r.addEventListener("load",e),r.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${t}`)))}):void 0}))}function s(t){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t}return r.then(e=>{for(const t of e||[])"rejected"===t.status&&s(t.reason);return t().catch(s)})};function S(e){let n=0;return t(()=>{n&&cancelAnimationFrame(n)}),(...t)=>{n||(n=requestAnimationFrame(()=>{n=0,e(...t)}))}}const I={class:"site-header-animation"},C=["src"],A=["src"],D=b({__name:"SiteHeaderAnimation",setup(t){const l=[{src:"/assets/img/Yako_Animations/Run.gif",direction:"ltr",kind:"run"},{src:"/assets/img/Yako_Animations/Walk.gif",direction:"rtl",kind:"walk"}],d=u(l[0].src),f=u(l[0].direction),p=u(l[0].kind),m=u(11e3),g=u(0),y=u("undefined"!=typeof window?window.innerWidth:1280),v=h(()=>{const t="rtl"===f.value,e=T(),n=-Math.ceil(2*e/2),r=Math.ceil(y.value);return{"--header-gif-duration":`${m.value}ms`,"--header-gif-from":`${t?r:n}px`,"--header-gif-to":`${t?n:r}px`,"--header-gif-flip":t?"-1":"1"}});let w=0,E=0;function b(t,e,n){return Math.min(n,Math.max(t,e))}function T(){return y.value<=640?b(96,.3*y.value,150):b(120,.2*y.value,220)}function _(t){const e="walk"===t?156:196,n=Math.min(1,y.value/1280),r=e*Math.max(.45,n),s=function(){const t=T();return y.value+t}();return Math.round(s/r*1e3)}function D(){const t=l[w]??l[0];d.value=t.src,f.value=t.direction,p.value=t.kind,m.value=_(t.kind),g.value+=1}function k(){w=(w+1)%l.length,function(){E&&(window.clearTimeout(E),E=0);const t=(p.value,1200);E=window.setTimeout(()=>{E=0,D()},t)}()}const N=S(()=>{y.value=window.innerWidth});return e(()=>{y.value=window.innerWidth,w=0,D(),window.addEventListener("resize",N,{passive:!0})}),n(()=>{window.removeEventListener("resize",N),E&&window.clearTimeout(E)}),(t,e)=>(r(),s("header",I,[(r(),s("img",{key:g.value,class:"site-header-animation-gif",style:i(v.value),src:d.value,alt:"Yako animation walking across the screen",onAnimationend:k},null,44,C)),(r(),s(o,null,a(l,t=>c("img",{key:`header-gif-preload-${t.kind}`,class:"sr-only-preload",alt:"",src:t.src},null,8,A)),64))]))}},[["__scopeId","data-v-1a0b506a"]]),k={class:"site-chrome-bar site-chrome-bar--sticky-top","aria-label":"Main navigation"},N={class:"site-chrome-links"};const R=b({},[["render",function(t,e){const n=l("router-link");return r(),s("nav",k,[c("div",N,[d(n,{to:"/",class:"site-chrome-link"},{default:f(()=>[...e[0]||(e[0]=[p("Home",-1)])]),_:1}),d(n,{to:"/about",class:"site-chrome-link"},{default:f(()=>[...e[1]||(e[1]=[p("About",-1)])]),_:1}),d(n,{to:"/terminal",class:"site-chrome-link"},{default:f(()=>[...e[2]||(e[2]=[p("Terminal",-1)])]),_:1}),d(n,{to:"/game",class:"site-chrome-link"},{default:f(()=>[...e[3]||(e[3]=[p("Game",-1)])]),_:1})])])}]]),x={class:"site-chrome-bar site-chrome-bar--fixed-bottom","data-nosnippet":""},O={class:"site-chrome-copyright"};const L=b({},[["render",function(t,e){const n=l("router-link");return r(),s("footer",x,[c("span",O,[e[1]||(e[1]=p(" © 2026 Karl Querel - ",-1)),d(n,{to:"/contact",class:"site-chrome-link"},{default:f(()=>[...e[0]||(e[0]=[p("Contact",-1)])]),_:1})])])}]]),M=4,P=-45,V=120,F=800,U="spark",B="--spark-angle",j="data-no-spark",$="(hover: hover) and (pointer: fine)";function z(){let t=!1,r=null;function s(t,e,n){const r=document.createElement("div");r.className=U,r.style.left=`${t}px`,r.style.top=`${e}px`,r.style.setProperty(B,`${n}deg`),r.setAttribute("aria-hidden","true"),document.body.append(r),setTimeout(()=>r.remove(),F)}function i(e){if(!(0!==e.button||e.ctrlKey||e.shiftKey||e.altKey||e.metaKey||t||function(t){for(let e=t;e&&e!==document.body;e=e.parentElement)if(e.hasAttribute(j))return!0;return!1}(e.target))){for(let t=1;t<=M;t++)s(e.pageX,e.pageY,P*t);t=!0,setTimeout(()=>{t=!1},V)}}function o(){r.matches?document.body.addEventListener("pointerdown",i):document.body.removeEventListener("pointerdown",i)}e(()=>{r=window.matchMedia($),r.addEventListener("change",o),o()}),n(()=>{document.body.removeEventListener("pointerdown",i),null==r||r.removeEventListener("change",o)})}const q={class:"app-root"},K={class:"app-main"},G={__name:"App",setup(t){const e=["/","/sport","/about","/contact"];z();const i=m(),o=h(()=>e.includes(i.path.replace(/\/$/,"")||"/"));return g(o,t=>{document.documentElement.classList.toggle("page-scrollable",t),t||window.scrollTo(0,0)},{immediate:!0}),n(()=>{document.documentElement.classList.remove("page-scrollable")}),(t,e)=>{const n=l("router-view");return r(),s("div",q,[d(D),d(R),c("main",K,[d(n)]),d(L)])}}},H={__name:"secretRedirect",setup:t=>(e(()=>{window.location.href="https://shattereddisk.github.io/rickroll/rickroll.mp4"}),(t,e)=>(r(),s("div",null,"Redirecting...")))},Q={class:"content"};const W=b({},[["render",function(t,e){return r(),s("div",Q,[...e[0]||(e[0]=[c("div",{class:"nes-container is-dark is-rounded"},[c("img",{src:"/assets/img/yako-not-found.gif",alt:"lost yako"}),c("h1",null,"Page not found")],-1)])])}],["__scopeId","data-v-d7510990"]]);var Y={};
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
 */const X=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=63&s|128):55296==(64512&s)&&r+1<t.length&&56320==(64512&t.charCodeAt(r+1))?(s=65536+((1023&s)<<10)+(1023&t.charCodeAt(++r)),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=63&s|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=63&s|128)}return e},J={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const e=t[s],i=s+1<t.length,o=i?t[s+1]:0,a=s+2<t.length,c=a?t[s+2]:0,u=e>>2,h=(3&e)<<4|o>>4;let l=(15&o)<<2|c>>6,d=63&c;a||(d=64,i||(l=64)),r.push(n[u],n[h],n[l],n[d])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(X(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((31&s)<<6|63&i)}else if(s>239&&s<365){const i=((7&s)<<18|(63&t[n++])<<12|(63&t[n++])<<6|63&t[n++])-65536;e[r++]=String.fromCharCode(55296+(i>>10)),e[r++]=String.fromCharCode(56320+(1023&i))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((15&s)<<12|(63&i)<<6|63&o)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const e=n[t.charAt(s++)],i=s<t.length?n[t.charAt(s)]:0;++s;const o=s<t.length?n[t.charAt(s)]:64;++s;const a=s<t.length?n[t.charAt(s)]:64;if(++s,null==e||null==i||null==o||null==a)throw new Z;const c=e<<2|i>>4;if(r.push(c),64!==o){const t=i<<4&240|o>>2;if(r.push(t),64!==a){const t=o<<6&192|a;r.push(t)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Z extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const tt=function(t){return function(t){const e=X(t);return J.encodeByteArray(e,!0)}(t).replace(/\./g,"")};
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
const et=()=>
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
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,nt=()=>{if("undefined"==typeof document)return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const e=t&&function(t){try{return J.decodeString(t,!0)}catch(n){}return null}(t[1]);return e&&JSON.parse(e)},rt=()=>{try{return et()||(()=>{if("undefined"==typeof process)return;const t=Y.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0})()||nt()}catch(t){return}},st=t=>{const e=(t=>{var e,n;return null===(n=null===(e=rt())||void 0===e?void 0:e.emulatorHosts)||void 0===n?void 0:n[t]})(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return"["===e[0]?[e.substring(1,n-1),r]:[e.substring(0,n),r]},it=()=>{var t;return null===(t=rt())||void 0===t?void 0:t.config};
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
class ot{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch(()=>{}),1===t.length?t(e):t(e,n))}}}
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
 */function at(){return!function(){var t;const e=null===(t=rt())||void 0===t?void 0:t.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(n){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}class ct extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,ct.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ut.prototype.create)}}class ut{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},r=`${this.service}/${t}`,s=this.errors[t],i=s?function(t,e){return t.replace(ht,(t,n)=>{const r=e[n];return null!=r?String(r):`<${n}?>`})}(s,n):"Error",o=`${this.serviceName}: ${i} (${r}).`;return new ct(r,o,n)}}const ht=/\{\$([^}]+)}/g;function lt(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const n=t[s],i=e[s];if(dt(n)&&dt(i)){if(!lt(n,i))return!1}else if(n!==i)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function dt(t){return null!==t&&"object"==typeof t}
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
 */function ft(t){return t&&t._delegate?t._delegate:t}class pt{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}
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
 */const mt="[DEFAULT]";
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
 */class gt{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const t=new ot;if(this.instancesDeferred.set(e,t),this.isInitialized(e)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:e});n&&t.resolve(n)}catch(n){}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),r=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
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
 */(t))try{this.getOrInitializeService({instanceIdentifier:mt})}catch(e){}for(const[t,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const t=this.getOrInitializeService({instanceIdentifier:r});n.resolve(t)}catch(e){}}}}clearInstance(t=mt){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...t.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return null!=this.component}isInitialized(t=mt){return this.instances.has(t)}getOptions(t=mt){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[s,i]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(s)&&i.resolve(r)}return r}onInit(t,e){var n;const r=this.normalizeInstanceIdentifier(e),s=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;s.add(t),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&t(i,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch(r){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=t,r===mt?void 0:r),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch(s){}var r;return n||null}normalizeInstanceIdentifier(t=mt){return this.component?this.component.multipleInstances?t:mt:t}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class yt{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new gt(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}
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
 */var vt,wt;(wt=vt||(vt={}))[wt.DEBUG=0]="DEBUG",wt[wt.VERBOSE=1]="VERBOSE",wt[wt.INFO=2]="INFO",wt[wt.WARN=3]="WARN",wt[wt.ERROR=4]="ERROR",wt[wt.SILENT=5]="SILENT";const Et={debug:vt.DEBUG,verbose:vt.VERBOSE,info:vt.INFO,warn:vt.WARN,error:vt.ERROR,silent:vt.SILENT},bt=vt.INFO,Tt={[vt.DEBUG]:"log",[vt.VERBOSE]:"log",[vt.INFO]:"info",[vt.WARN]:"warn",[vt.ERROR]:"error"},_t=(t,e,...n)=>{if(e<t.logLevel)return;(new Date).toISOString();if(!Tt[e])throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class St{constructor(t){this.name=t,this._logLevel=bt,this._logHandler=_t,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in vt))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?Et[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,vt.DEBUG,...t),this._logHandler(this,vt.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,vt.VERBOSE,...t),this._logHandler(this,vt.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,vt.INFO,...t),this._logHandler(this,vt.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,vt.WARN,...t),this._logHandler(this,vt.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,vt.ERROR,...t),this._logHandler(this,vt.ERROR,...t)}}let It,Ct;const At=new WeakMap,Dt=new WeakMap,kt=new WeakMap,Nt=new WeakMap,Rt=new WeakMap;let xt={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return Dt.get(t);if("objectStoreNames"===e)return t.objectStoreNames||kt.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Mt(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function Ot(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(Ct||(Ct=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(Pt(this),e),Mt(At.get(this))}:function(...e){return Mt(t.apply(Pt(this),e))}:function(e,...n){const r=t.call(Pt(this),e,...n);return kt.set(r,e.sort?e.sort():[e]),Mt(r)}}function Lt(t){return"function"==typeof t?Ot(t):(t instanceof IDBTransaction&&function(t){if(Dt.has(t))return;const e=new Promise((e,n)=>{const r=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",i),t.removeEventListener("abort",i)},s=()=>{e(),r()},i=()=>{n(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",s),t.addEventListener("error",i),t.addEventListener("abort",i)});Dt.set(t,e)}(t),e=t,(It||(It=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(t=>e instanceof t)?new Proxy(t,xt):t);var e}function Mt(t){if(t instanceof IDBRequest)return function(t){const e=new Promise((e,n)=>{const r=()=>{t.removeEventListener("success",s),t.removeEventListener("error",i)},s=()=>{e(Mt(t.result)),r()},i=()=>{n(t.error),r()};t.addEventListener("success",s),t.addEventListener("error",i)});return e.then(e=>{e instanceof IDBCursor&&At.set(e,t)}).catch(()=>{}),Rt.set(e,t),e}(t);if(Nt.has(t))return Nt.get(t);const e=Lt(t);return e!==t&&(Nt.set(t,e),Rt.set(e,t)),e}const Pt=t=>Rt.get(t);const Vt=["get","getKey","getAll","getAllKeys","count"],Ft=["put","add","delete","clear"],Ut=new Map;function Bt(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(Ut.get(e))return Ut.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Ft.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!s&&!Vt.includes(n))return;const i=async function(t,...e){const i=this.transaction(t,s?"readwrite":"readonly");let o=i.store;return r&&(o=o.index(e.shift())),(await Promise.all([o[n](...e),s&&i.done]))[0]};return Ut.set(e,i),i}xt=(t=>({...t,get:(e,n,r)=>Bt(e,n)||t.get(e,n,r),has:(e,n)=>!!Bt(e,n)||t.has(e,n)}))(xt);
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
class jt{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null}).filter(t=>t).join(" ")}}const $t="@firebase/app",zt="0.11.5",qt=new St("@firebase/app"),Kt="@firebase/app-compat",Gt="@firebase/analytics-compat",Ht="@firebase/analytics",Qt="@firebase/app-check-compat",Wt="@firebase/app-check",Yt="@firebase/auth",Xt="@firebase/auth-compat",Jt="@firebase/database",Zt="@firebase/data-connect",te="@firebase/database-compat",ee="@firebase/functions",ne="@firebase/functions-compat",re="@firebase/installations",se="@firebase/installations-compat",ie="@firebase/messaging",oe="@firebase/messaging-compat",ae="@firebase/performance",ce="@firebase/performance-compat",ue="@firebase/remote-config",he="@firebase/remote-config-compat",le="@firebase/storage",de="@firebase/storage-compat",fe="@firebase/firestore",pe="@firebase/vertexai",me="@firebase/firestore-compat",ge="firebase",ye="[DEFAULT]",ve={[$t]:"fire-core",[Kt]:"fire-core-compat",[Ht]:"fire-analytics",[Gt]:"fire-analytics-compat",[Wt]:"fire-app-check",[Qt]:"fire-app-check-compat",[Yt]:"fire-auth",[Xt]:"fire-auth-compat",[Jt]:"fire-rtdb",[Zt]:"fire-data-connect",[te]:"fire-rtdb-compat",[ee]:"fire-fn",[ne]:"fire-fn-compat",[re]:"fire-iid",[se]:"fire-iid-compat",[ie]:"fire-fcm",[oe]:"fire-fcm-compat",[ae]:"fire-perf",[ce]:"fire-perf-compat",[ue]:"fire-rc",[he]:"fire-rc-compat",[le]:"fire-gcs",[de]:"fire-gcs-compat",[fe]:"fire-fst",[me]:"fire-fst-compat",[pe]:"fire-vertex","fire-js":"fire-js",[ge]:"fire-js-all"},we=new Map,Ee=new Map,be=new Map;function Te(t,e){try{t.container.addComponent(e)}catch(n){qt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function _e(t){const e=t.name;if(be.has(e))return qt.debug(`There were multiple attempts to register component ${e}.`),!1;be.set(e,t);for(const n of we.values())Te(n,t);for(const n of Ee.values())Te(n,t);return!0}
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
const Se=new ut("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
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
class Ie{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new pt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Se.create("app-deleted",{appName:this._name})}}
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
 */function Ce(t,e={}){let n=t;if("object"!=typeof e){e={name:e}}const r=Object.assign({name:ye,automaticDataCollectionEnabled:!1},e),s=r.name;if("string"!=typeof s||!s)throw Se.create("bad-app-name",{appName:String(s)});if(n||(n=it()),!n)throw Se.create("no-options");const i=we.get(s);if(i){if(lt(n,i.options)&&lt(r,i.config))return i;throw Se.create("duplicate-app",{appName:s})}const o=new yt(s);for(const c of be.values())o.addComponent(c);const a=new Ie(n,r,o);return we.set(s,a),a}function Ae(t,e,n){var r;let s=null!==(r=ve[t])&&void 0!==r?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const t=[`Unable to register library "${s}" with version "${e}":`];return i&&t.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&t.push("and"),o&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void qt.warn(t.join(" "))}_e(new pt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}
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
 */const De="firebase-heartbeat-store";let ke=null;function Ne(){return ke||(ke=function(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=Mt(o);return r&&o.addEventListener("upgradeneeded",t=>{r(Mt(o.result),t.oldVersion,t.newVersion,Mt(o.transaction),t)}),n&&o.addEventListener("blocked",t=>n(t.oldVersion,t.newVersion,t)),a.then(t=>{i&&t.addEventListener("close",()=>i()),s&&t.addEventListener("versionchange",t=>s(t.oldVersion,t.newVersion,t))}).catch(()=>{}),a}("firebase-heartbeat-database",1,{upgrade:(t,e)=>{if(0===e)try{t.createObjectStore(De)}catch(n){}}}).catch(t=>{throw Se.create("idb-open",{originalErrorMessage:t.message})})),ke}async function Re(t,e){try{const n=(await Ne()).transaction(De,"readwrite"),r=n.objectStore(De);await r.put(e,xe(t)),await n.done}catch(n){if(n instanceof ct)qt.warn(n.message);else{const t=Se.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});qt.warn(t.message)}}}function xe(t){return`${t.name}!${t.options.appId}`}
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
 */class Oe{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Me(e),this._heartbeatsCachePromise=this._storage.read().then(t=>(this._heartbeatsCache=t,t))}async triggerHeartbeat(){var t,e;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Le();if(null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(t=>t.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>30){const t=function(t){if(0===t.length)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}
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
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(t,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){qt.warn(n)}}async getHeartbeatsHeader(){var t;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const e=Le(),{heartbeatsToSend:n,unsentEntries:r}=function(t,e=1024){const n=[];let r=t.slice();for(const s of t){const t=n.find(t=>t.agent===s.agent);if(t){if(t.dates.push(s.date),Pe(n)>e){t.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Pe(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),s=tt(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return qt.warn(e),""}}}function Le(){return(new Date).toISOString().substring(0,10)}class Me{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(t){return!1}}()&&new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var t;e((null===(t=s.error)||void 0===t?void 0:t.message)||"")}}catch(n){e(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const t=await async function(t){try{const e=(await Ne()).transaction(De),n=await e.objectStore(De).get(xe(t));return await e.done,n}catch(e){if(e instanceof ct)qt.warn(e.message);else{const t=Se.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});qt.warn(t.message)}}}(this.app);return(null==t?void 0:t.heartbeats)?t:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return Re(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}}async add(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return Re(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}}}function Pe(t){return tt(JSON.stringify({version:2,heartbeats:t})).length}var Ve;Ve="",_e(new pt("platform-logger",t=>new jt(t),"PRIVATE")),_e(new pt("heartbeat",t=>new Oe(t),"PRIVATE")),Ae($t,zt,Ve),Ae($t,zt,"esm2017"),Ae("fire-js","");
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
Ae("firebase","11.6.1","app");var Fe,Ue,Be="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function e(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(t,e,n){n||(n=0);var r=Array(16);if("string"==typeof e)for(var s=0;16>s;++s)r[s]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(s=0;16>s;++s)r[s]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],s=t.g[2];var i=t.g[3],o=e+(i^n&(s^i))+r[0]+3614090360&4294967295;o=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=n+(o<<7&4294967295|o>>>25))+((o=i+(s^e&(n^s))+r[1]+3905402710&4294967295)<<12&4294967295|o>>>20))+((o=s+(n^i&(e^n))+r[2]+606105819&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^s&(i^e))+r[3]+3250441966&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(s^i))+r[4]+4118548399&4294967295)<<7&4294967295|o>>>25))+((o=i+(s^e&(n^s))+r[5]+1200080426&4294967295)<<12&4294967295|o>>>20))+((o=s+(n^i&(e^n))+r[6]+2821735955&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^s&(i^e))+r[7]+4249261313&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(s^i))+r[8]+1770035416&4294967295)<<7&4294967295|o>>>25))+((o=i+(s^e&(n^s))+r[9]+2336552879&4294967295)<<12&4294967295|o>>>20))+((o=s+(n^i&(e^n))+r[10]+4294925233&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^s&(i^e))+r[11]+2304563134&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(s^i))+r[12]+1804603682&4294967295)<<7&4294967295|o>>>25))+((o=i+(s^e&(n^s))+r[13]+4254626195&4294967295)<<12&4294967295|o>>>20))+((o=s+(n^i&(e^n))+r[14]+2792965006&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^s&(i^e))+r[15]+1236535329&4294967295)<<22&4294967295|o>>>10))+((o=e+(s^i&(n^s))+r[1]+4129170786&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^s&(e^n))+r[6]+3225465664&4294967295)<<9&4294967295|o>>>23))+((o=s+(e^n&(i^e))+r[11]+643717713&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(s^i))+r[0]+3921069994&4294967295)<<20&4294967295|o>>>12))+((o=e+(s^i&(n^s))+r[5]+3593408605&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^s&(e^n))+r[10]+38016083&4294967295)<<9&4294967295|o>>>23))+((o=s+(e^n&(i^e))+r[15]+3634488961&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(s^i))+r[4]+3889429448&4294967295)<<20&4294967295|o>>>12))+((o=e+(s^i&(n^s))+r[9]+568446438&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^s&(e^n))+r[14]+3275163606&4294967295)<<9&4294967295|o>>>23))+((o=s+(e^n&(i^e))+r[3]+4107603335&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(s^i))+r[8]+1163531501&4294967295)<<20&4294967295|o>>>12))+((o=e+(s^i&(n^s))+r[13]+2850285829&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^s&(e^n))+r[2]+4243563512&4294967295)<<9&4294967295|o>>>23))+((o=s+(e^n&(i^e))+r[7]+1735328473&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(s^i))+r[12]+2368359562&4294967295)<<20&4294967295|o>>>12))+((o=e+(n^s^i)+r[5]+4294588738&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^s)+r[8]+2272392833&4294967295)<<11&4294967295|o>>>21))+((o=s+(i^e^n)+r[11]+1839030562&4294967295)<<16&4294967295|o>>>16))+((o=n+(s^i^e)+r[14]+4259657740&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^s^i)+r[1]+2763975236&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^s)+r[4]+1272893353&4294967295)<<11&4294967295|o>>>21))+((o=s+(i^e^n)+r[7]+4139469664&4294967295)<<16&4294967295|o>>>16))+((o=n+(s^i^e)+r[10]+3200236656&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^s^i)+r[13]+681279174&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^s)+r[0]+3936430074&4294967295)<<11&4294967295|o>>>21))+((o=s+(i^e^n)+r[3]+3572445317&4294967295)<<16&4294967295|o>>>16))+((o=n+(s^i^e)+r[6]+76029189&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^s^i)+r[9]+3654602809&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^s)+r[12]+3873151461&4294967295)<<11&4294967295|o>>>21))+((o=s+(i^e^n)+r[15]+530742520&4294967295)<<16&4294967295|o>>>16))+((o=n+(s^i^e)+r[2]+3299628645&4294967295)<<23&4294967295|o>>>9))+((o=e+(s^(n|~i))+r[0]+4096336452&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~s))+r[7]+1126891415&4294967295)<<10&4294967295|o>>>22))+((o=s+(e^(i|~n))+r[14]+2878612391&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(s|~e))+r[5]+4237533241&4294967295)<<21&4294967295|o>>>11))+((o=e+(s^(n|~i))+r[12]+1700485571&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~s))+r[3]+2399980690&4294967295)<<10&4294967295|o>>>22))+((o=s+(e^(i|~n))+r[10]+4293915773&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(s|~e))+r[1]+2240044497&4294967295)<<21&4294967295|o>>>11))+((o=e+(s^(n|~i))+r[8]+1873313359&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~s))+r[15]+4264355552&4294967295)<<10&4294967295|o>>>22))+((o=s+(e^(i|~n))+r[6]+2734768916&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(s|~e))+r[13]+1309151649&4294967295)<<21&4294967295|o>>>11))+((i=(e=n+((o=e+(s^(n|~i))+r[4]+4149444226&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~s))+r[11]+3174756917&4294967295)<<10&4294967295|o>>>22))^((s=i+((o=s+(e^(i|~n))+r[2]+718787259&4294967295)<<15&4294967295|o>>>17))|~e))+r[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(s+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+s&4294967295,t.g[3]=t.g[3]+i&4294967295}function r(t,e){this.h=e;for(var n=[],r=!0,s=t.length-1;0<=s;s--){var i=0|t[s];r&&i==e||(n[s]=i,r=!1)}this.g=n}!function(t,e){function n(){}n.prototype=e.prototype,t.D=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.C=function(t,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return e.prototype[n].apply(t,s)}}(e,function(){this.blockSize=-1}),e.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.u=function(t,e){void 0===e&&(e=t.length);for(var r=e-this.blockSize,s=this.B,i=this.h,o=0;o<e;){if(0==i)for(;o<=r;)n(this,t,o),o+=this.blockSize;if("string"==typeof t){for(;o<e;)if(s[i++]=t.charCodeAt(o++),i==this.blockSize){n(this,s),i=0;break}}else for(;o<e;)if(s[i++]=t[o++],i==this.blockSize){n(this,s),i=0;break}}this.h=i,this.o+=e},e.prototype.v=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.o;for(e=t.length-8;e<t.length;++e)t[e]=255&n,n/=256;for(this.u(t),t=Array(16),e=n=0;4>e;++e)for(var r=0;32>r;r+=8)t[n++]=this.g[e]>>>r&255;return t};var s={};function i(t){return-128<=t&&128>t?function(t,e){var n=s;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,function(t){return new r([0|t],0>t?-1:0)}):new r([0|t],0>t?-1:0)}function o(t){if(isNaN(t)||!isFinite(t))return a;if(0>t)return d(o(-t));for(var e=[],n=1,s=0;t>=n;s++)e[s]=t/n|0,n*=4294967296;return new r(e,0)}var a=i(0),c=i(1),u=i(16777216);function h(t){if(0!=t.h)return!1;for(var e=0;e<t.g.length;e++)if(0!=t.g[e])return!1;return!0}function l(t){return-1==t.h}function d(t){for(var e=t.g.length,n=[],s=0;s<e;s++)n[s]=~t.g[s];return new r(n,~t.h).add(c)}function f(t,e){return t.add(d(e))}function p(t,e){for(;(65535&t[e])!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function m(t,e){this.g=t,this.h=e}function g(t,e){if(h(e))throw Error("division by zero");if(h(t))return new m(a,a);if(l(t))return e=g(d(t),e),new m(d(e.g),d(e.h));if(l(e))return e=g(t,d(e)),new m(d(e.g),e.h);if(30<t.g.length){if(l(t)||l(e))throw Error("slowDivide_ only works with positive integers.");for(var n=c,r=e;0>=r.l(t);)n=y(n),r=y(r);var s=v(n,1),i=v(r,1);for(r=v(r,2),n=v(n,2);!h(r);){var u=i.add(r);0>=u.l(t)&&(s=s.add(n),i=u),r=v(r,1),n=v(n,1)}return e=f(t,s.j(e)),new m(s,e)}for(s=a;0<=t.l(e);){for(n=Math.max(1,Math.floor(t.m()/e.m())),r=48>=(r=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,r-48),u=(i=o(n)).j(e);l(u)||0<u.l(t);)u=(i=o(n-=r)).j(e);h(i)&&(i=c),s=s.add(i),t=f(t,u)}return new m(s,t)}function y(t){for(var e=t.g.length+1,n=[],s=0;s<e;s++)n[s]=t.i(s)<<1|t.i(s-1)>>>31;return new r(n,t.h)}function v(t,e){var n=e>>5;e%=32;for(var s=t.g.length-n,i=[],o=0;o<s;o++)i[o]=0<e?t.i(o+n)>>>e|t.i(o+n+1)<<32-e:t.i(o+n);return new r(i,t.h)}(t=r.prototype).m=function(){if(l(this))return-d(this).m();for(var t=0,e=1,n=0;n<this.g.length;n++){var r=this.i(n);t+=(0<=r?r:4294967296+r)*e,e*=4294967296}return t},t.toString=function(t){if(2>(t=t||10)||36<t)throw Error("radix out of range: "+t);if(h(this))return"0";if(l(this))return"-"+d(this).toString(t);for(var e=o(Math.pow(t,6)),n=this,r="";;){var s=g(n,e).g,i=((0<(n=f(n,s.j(e))).g.length?n.g[0]:n.h)>>>0).toString(t);if(h(n=s))return i+r;for(;6>i.length;)i="0"+i;r=i+r}},t.i=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h},t.l=function(t){return l(t=f(this,t))?-1:h(t)?0:1},t.abs=function(){return l(this)?d(this):this},t.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0,i=0;i<=e;i++){var o=s+(65535&this.i(i))+(65535&t.i(i)),a=(o>>>16)+(this.i(i)>>>16)+(t.i(i)>>>16);s=a>>>16,o&=65535,a&=65535,n[i]=a<<16|o}return new r(n,-2147483648&n[n.length-1]?-1:0)},t.j=function(t){if(h(this)||h(t))return a;if(l(this))return l(t)?d(this).j(d(t)):d(d(this).j(t));if(l(t))return d(this.j(d(t)));if(0>this.l(u)&&0>t.l(u))return o(this.m()*t.m());for(var e=this.g.length+t.g.length,n=[],s=0;s<2*e;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(var i=0;i<t.g.length;i++){var c=this.i(s)>>>16,f=65535&this.i(s),m=t.i(i)>>>16,g=65535&t.i(i);n[2*s+2*i]+=f*g,p(n,2*s+2*i),n[2*s+2*i+1]+=c*g,p(n,2*s+2*i+1),n[2*s+2*i+1]+=f*m,p(n,2*s+2*i+1),n[2*s+2*i+2]+=c*m,p(n,2*s+2*i+2)}for(s=0;s<e;s++)n[s]=n[2*s+1]<<16|n[2*s];for(s=e;s<2*e;s++)n[s]=0;return new r(n,0)},t.A=function(t){return g(this,t).h},t.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.i(s)&t.i(s);return new r(n,this.h&t.h)},t.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.i(s)|t.i(s);return new r(n,this.h|t.h)},t.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.i(s)^t.i(s);return new r(n,this.h^t.h)},e.prototype.digest=e.prototype.v,e.prototype.reset=e.prototype.s,e.prototype.update=e.prototype.u,Ue=e,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.A,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=o,r.fromString=function t(e,n){if(0==e.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==e.charAt(0))return d(t(e.substring(1),n));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var r=o(Math.pow(n,8)),s=a,i=0;i<e.length;i+=8){var c=Math.min(8,e.length-i),u=parseInt(e.substring(i,i+c),n);8>c?(c=o(Math.pow(n,c)),s=s.j(c).add(o(u))):s=(s=s.j(r)).add(o(u))}return s},Fe=r}).apply(void 0!==Be?Be:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var je,$e,ze,qe,Ke,Ge,He,Qe,We="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t,e="function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,n){return t==Array.prototype||t==Object.prototype||(t[e]=n.value),t};var n=function(t){t=["object"==typeof globalThis&&globalThis,t,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof We&&We];for(var e=0;e<t.length;++e){var n=t[e];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);!function(t,r){if(r)t:{var s=n;t=t.split(".");for(var i=0;i<t.length-1;i++){var o=t[i];if(!(o in s))break t;s=s[o]}(r=r(i=s[t=t[t.length-1]]))!=i&&null!=r&&e(s,t,{configurable:!0,writable:!0,value:r})}}("Array.prototype.values",function(t){return t||function(){return function(t,e){t instanceof String&&(t+="");var n=0,r=!1,s={next:function(){if(!r&&n<t.length){var s=n++;return{value:e(s,t[s]),done:!1}}return r=!0,{done:!0,value:void 0}}};return s[Symbol.iterator]=function(){return s},s}(this,function(t,e){return e})}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var r=r||{},s=this||self;function i(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function o(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}function a(t,e,n){return t.call.apply(t.bind,arguments)}function c(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function u(t,e,n){return(u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?a:c).apply(null,arguments)}function h(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function l(t,e){function n(){}n.prototype=e.prototype,t.aa=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Qb=function(t,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return e.prototype[n].apply(t,s)}}function d(t){const e=t.length;if(0<e){const n=Array(e);for(let r=0;r<e;r++)n[r]=t[r];return n}return[]}function f(t,e){for(let n=1;n<arguments.length;n++){const e=arguments[n];if(i(e)){const n=t.length||0,r=e.length||0;t.length=n+r;for(let s=0;s<r;s++)t[n+s]=e[s]}else t.push(e)}}function p(t){return/^[\s\xa0]*$/.test(t)}function m(){var t=s.navigator;return t&&(t=t.userAgent)?t:""}function g(t){return g[" "](t),t}g[" "]=function(){};var y=!(-1==m().indexOf("Gecko")||-1!=m().toLowerCase().indexOf("webkit")&&-1==m().indexOf("Edge")||-1!=m().indexOf("Trident")||-1!=m().indexOf("MSIE")||-1!=m().indexOf("Edge"));function v(t,e,n){for(const r in t)e.call(n,t[r],r,t)}function w(t){const e={};for(const n in t)e[n]=t[n];return e}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function b(t,e){let n,r;for(let s=1;s<arguments.length;s++){for(n in r=arguments[s],r)t[n]=r[n];for(let e=0;e<E.length;e++)n=E[e],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function T(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function _(t){s.setTimeout(()=>{throw t},0)}function S(){var t=k;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var I=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new C,t=>t.reset());class C{constructor(){this.next=this.g=this.h=null}set(t,e){this.h=t,this.g=e,this.next=null}reset(){this.next=this.g=this.h=null}}let A,D=!1,k=new class{constructor(){this.h=this.g=null}add(t,e){const n=I.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n}},N=()=>{const t=s.Promise.resolve(void 0);A=()=>{t.then(R)}};var R=()=>{for(var t;t=S();){try{t.h.call(t.g)}catch(n){_(n)}var e=I;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}D=!1};function x(){this.s=this.s,this.C=this.C}function O(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}x.prototype.s=!1,x.prototype.ma=function(){this.s||(this.s=!0,this.N())},x.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},O.prototype.h=function(){this.defaultPrevented=!0};var L=function(){if(!s.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const t=()=>{};s.addEventListener("test",t,e),s.removeEventListener("test",t,e)}catch(n){}return t}();function M(t,e){if(O.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(y){t:{try{g(e.nodeName);var s=!0;break t}catch(i){}s=!1}s||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:P[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&M.aa.h.call(this)}}l(M,O);var P={2:"touch",3:"pen",4:"mouse"};M.prototype.h=function(){M.aa.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var V="closure_listenable_"+(1e6*Math.random()|0),F=0;function U(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.ha=s,this.key=++F,this.da=this.fa=!1}function B(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function j(t){this.src=t,this.g={},this.h=0}function $(t,e){var n=e.type;if(n in t.g){var r,s=t.g[n],i=Array.prototype.indexOf.call(s,e,void 0);(r=0<=i)&&Array.prototype.splice.call(s,i,1),r&&(B(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function z(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.da&&i.listener==e&&i.capture==!!n&&i.ha==r)return s}return-1}j.prototype.add=function(t,e,n,r,s){var i=t.toString();(t=this.g[i])||(t=this.g[i]=[],this.h++);var o=z(t,e,r,s);return-1<o?(e=t[o],n||(e.fa=!1)):((e=new U(e,this.src,i,!!r,s)).fa=n,t.push(e)),e};var q="closure_lm_"+(1e6*Math.random()|0),K={};function G(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)G(t,e[i],n,r,s);return null}return n=Z(n),t&&t[V]?t.K(e,n,!!o(r)&&!!r.capture,s):function(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var a=o(s)?!!s.capture:!!s,c=X(t);if(c||(t[q]=c=new j(t)),n=c.add(e,n,r,a,i),n.proxy)return n;if(r=function(){function t(n){return e.call(t.src,t.listener,n)}const e=Y;return t}(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)L||(s=a),void 0===s&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(W(e.toString()),r);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(r)}return n}(t,e,n,!1,r,s)}function H(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)H(t,e[i],n,r,s);else r=o(r)?!!r.capture:!!r,n=Z(n),t&&t[V]?(t=t.i,(e=String(e).toString())in t.g&&(-1<(n=z(i=t.g[e],n,r,s))&&(B(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.g[e],t.h--)))):t&&(t=X(t))&&(e=t.g[e.toString()],t=-1,e&&(t=z(e,n,r,s)),(n=-1<t?e[t]:null)&&Q(n))}function Q(t){if("number"!=typeof t&&t&&!t.da){var e=t.src;if(e&&e[V])$(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(W(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=X(e))?($(n,t),0==n.h&&(n.src=null,e[q]=null)):B(t)}}}function W(t){return t in K?K[t]:K[t]="on"+t}function Y(t,e){if(t.da)t=!0;else{e=new M(e,this);var n=t.listener,r=t.ha||t.src;t.fa&&Q(t),t=n.call(r,e)}return t}function X(t){return(t=t[q])instanceof j?t:null}var J="__closure_events_fn_"+(1e9*Math.random()>>>0);function Z(t){return"function"==typeof t?t:(t[J]||(t[J]=function(e){return t.handleEvent(e)}),t[J])}function tt(){x.call(this),this.i=new j(this),this.M=this,this.F=null}function et(t,e){var n,r=t.F;if(r)for(n=[];r;r=r.F)n.push(r);if(t=t.M,r=e.type||e,"string"==typeof e)e=new O(e,t);else if(e instanceof O)e.target=e.target||t;else{var s=e;b(e=new O(r,t),s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];s=nt(o,r,!0,e)&&s}if(s=nt(o=e.g=t,r,!0,e)&&s,s=nt(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)s=nt(o=e.g=n[i],r,!1,e)&&s}function nt(t,e,n,r){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.da&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.fa&&$(t.i,o),s=!1!==a.call(c,r)&&s}}return s&&!r.defaultPrevented}function rt(t,e,n){if("function"==typeof t)n&&(t=u(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=u(t.handleEvent,t)}return 2147483647<Number(e)?-1:s.setTimeout(t,e||0)}function st(t){t.g=rt(()=>{t.g=null,t.i&&(t.i=!1,st(t))},t.l);const e=t.h;t.h=null,t.m.apply(null,e)}l(tt,x),tt.prototype[V]=!0,tt.prototype.removeEventListener=function(t,e,n,r){H(this,t,e,n,r)},tt.prototype.N=function(){if(tt.aa.N.call(this),this.i){var t,e=this.i;for(t in e.g){for(var n=e.g[t],r=0;r<n.length;r++)B(n[r]);delete e.g[t],e.h--}}this.F=null},tt.prototype.K=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)},tt.prototype.L=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};class it extends x{constructor(t,e){super(),this.m=t,this.l=e,this.h=null,this.i=!1,this.g=null}j(t){this.h=arguments,this.g?this.i=!0:st(this)}N(){super.N(),this.g&&(s.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ot(t){x.call(this),this.h=t,this.g={}}l(ot,x);var at=[];function ct(t){v(t.g,function(t,e){this.g.hasOwnProperty(e)&&Q(t)},t),t.g={}}ot.prototype.N=function(){ot.aa.N.call(this),ct(this)},ot.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ut=s.JSON.stringify,ht=s.JSON.parse,lt=class{stringify(t){return s.JSON.stringify(t,void 0)}parse(t){return s.JSON.parse(t,void 0)}};function dt(){}function ft(t){return t.h||(t.h=t.i())}function pt(){}dt.prototype.h=null;var mt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function gt(){O.call(this,"d")}function yt(){O.call(this,"c")}l(gt,O),l(yt,O);var vt={},wt=null;function Et(){return wt=wt||new tt}function bt(t){O.call(this,vt.La,t)}function Tt(t){const e=Et();et(e,new bt(e))}function _t(t,e){O.call(this,vt.STAT_EVENT,t),this.stat=e}function St(t){const e=Et();et(e,new _t(e,t))}function It(t,e){O.call(this,vt.Ma,t),this.size=e}function Ct(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return s.setTimeout(function(){t()},e)}function At(){this.g=!0}function Dt(t,e,n,r){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<s.length;o++)s[o]=""}}}return ut(n)}catch(a){return e}}(t,n)+(r?" "+r:"")})}vt.La="serverreachability",l(bt,O),vt.STAT_EVENT="statevent",l(_t,O),vt.Ma="timingevent",l(It,O),At.prototype.xa=function(){this.g=!1},At.prototype.info=function(){};var kt,Nt={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Rt={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function xt(){}function Ot(t,e,n,r){this.j=t,this.i=e,this.l=n,this.R=r||1,this.U=new ot(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Lt}function Lt(){this.i=null,this.g="",this.h=!1}l(xt,dt),xt.prototype.g=function(){return new XMLHttpRequest},xt.prototype.i=function(){return{}},kt=new xt;var Mt={},Pt={};function Vt(t,e,n){t.L=1,t.v=ue(se(e)),t.m=n,t.P=!0,Ft(t,null)}function Ft(t,e){t.F=Date.now(),jt(t),t.A=se(t.v);var n=t.A,r=t.R;Array.isArray(r)||(r=[String(r)]),Te(n.i,"t",r),t.C=0,n=t.j.J,t.h=new Lt,t.g=wn(t.j,n?e:null,!t.m),0<t.O&&(t.M=new it(u(t.Y,t,t.g),t.O)),e=t.U,n=t.g,r=t.ca;var s="readystatechange";Array.isArray(s)||(s&&(at[0]=s.toString()),s=at);for(var i=0;i<s.length;i++){var o=G(n,s[i],r||e.handleEvent,!1,e.h||e);if(!o)break;e.g[o.key]=o}e=t.H?w(t.H):{},t.m?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.m,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),Tt(),function(t,e,n,r,s,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&"type"==l[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+"\n"+n+"\n"+o})}(t.i,t.u,t.A,t.l,t.R,t.m)}function Ut(t){return!!t.g&&("GET"==t.u&&2!=t.L&&t.j.Ca)}function Bt(t,e){var n=t.C,r=e.indexOf("\n",n);return-1==r?Pt:(n=Number(e.substring(n,r)),isNaN(n)?Mt:(r+=1)+n>e.length?Pt:(e=e.slice(r,r+n),t.C=r+n,e))}function jt(t){t.S=Date.now()+t.I,$t(t,t.I)}function $t(t,e){if(null!=t.B)throw Error("WatchDog timer not null");t.B=Ct(u(t.ba,t),e)}function zt(t){t.B&&(s.clearTimeout(t.B),t.B=null)}function qt(t){0==t.j.G||t.J||pn(t.j,t)}function Kt(t){zt(t);var e=t.M;e&&"function"==typeof e.ma&&e.ma(),t.M=null,ct(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.ma())}function Gt(t,e){try{var n=t.j;if(0!=n.G&&(n.g==t||Xt(n.h,t)))if(!t.K&&Xt(n.h,t)&&3==n.G){try{var r=n.Da.g.parse(e)}catch(h){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){t:if(!n.u){if(n.g){if(!(n.g.F+3e3<t.F))break t;fn(n),nn(n)}hn(n),St(18)}}else n.za=s[1],0<n.za-n.T&&37500>s[2]&&n.F&&0==n.v&&!n.C&&(n.C=Ct(u(n.Za,n),6e3));if(1>=Yt(n.h)&&n.ca){try{n.ca()}catch(h){}n.ca=void 0}}else gn(n,11)}else if((t.K||n.g==t)&&fn(n),!p(e))for(s=n.Da.g.parse(e),e=0;e<s.length;e++){let u=s[e];if(n.T=u[0],u=u[1],2==n.G)if("c"==u[0]){n.K=u[1],n.ia=u[2];const e=u[3];null!=e&&(n.la=e,n.j.info("VER="+n.la));const s=u[4];null!=s&&(n.Aa=s,n.j.info("SVER="+n.Aa));const h=u[5];null!=h&&"number"==typeof h&&0<h&&(r=1.5*h,n.L=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const l=t.g;if(l){const t=l.g?l.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(t){var i=r.h;i.g||-1==t.indexOf("spdy")&&-1==t.indexOf("quic")&&-1==t.indexOf("h2")||(i.j=i.l,i.g=new Set,i.h&&(Jt(i,i.h),i.h=null))}if(r.D){const t=l.g?l.g.getResponseHeader("X-HTTP-Session-Id"):null;t&&(r.ya=t,ce(r.I,r.D,t))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-t.F,n.j.info("Handshake RTT: "+n.R+"ms"));var o=t;if((r=n).qa=vn(r,r.J?r.ia:null,r.W),o.K){Zt(r.h,o);var a=o,c=r.L;c&&(a.I=c),a.B&&(zt(a),jt(a)),r.g=o}else un(r);0<n.i.length&&sn(n)}else"stop"!=u[0]&&"close"!=u[0]||gn(n,7);else 3==n.G&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?gn(n,7):en(n):"noop"!=u[0]&&n.l&&n.l.ta(u),n.v=0)}Tt()}catch(h){}}Ot.prototype.ca=function(t){t=t.target;const e=this.M;e&&3==Xe(t)?e.j():this.Y(t)},Ot.prototype.Y=function(t){try{if(t==this.g)t:{const d=Xe(this.g);var e=this.g.Ba();this.g.Z();if(!(3>d)&&(3!=d||this.g&&(this.h.h||this.g.oa()||Je(this.g)))){this.J||4!=d||7==e||Tt(),zt(this);var n=this.g.Z();this.X=n;e:if(Ut(this)){var r=Je(this.g);t="";var i=r.length,o=4==Xe(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){Kt(this),qt(this);var a="";break e}this.h.i=new s.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,t+=this.h.i.decode(r[e],{stream:!(o&&e==i-1)});r.length=0,this.h.g+=t,this.C=0,a=this.h.g}else a=this.g.oa();if(this.o=200==n,function(t,e,n,r,s,i,o){t.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+"\n"+n+"\n"+i+" "+o})}(this.i,this.u,this.A,this.l,this.R,d,n),this.o){if(this.T&&!this.K){e:{if(this.g){var c,u=this.g;if((c=u.g?u.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(c)){var h=c;break e}}h=null}if(!(n=h)){this.o=!1,this.s=3,St(12),Kt(this),qt(this);break t}Dt(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Gt(this,n)}if(this.P){let t;for(n=!0;!this.J&&this.C<a.length;){if(t=Bt(this,a),t==Pt){4==d&&(this.s=4,St(14),n=!1),Dt(this.i,this.l,null,"[Incomplete Response]");break}if(t==Mt){this.s=4,St(15),Dt(this.i,this.l,a,"[Invalid Chunk]"),n=!1;break}Dt(this.i,this.l,t,null),Gt(this,t)}if(Ut(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=d||0!=a.length||this.h.h||(this.s=1,St(16),n=!1),this.o=this.o&&n,n){if(0<a.length&&!this.W){this.W=!0;var l=this.j;l.g==this&&l.ba&&!l.M&&(l.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),ln(l),l.M=!0,St(11))}}else Dt(this.i,this.l,a,"[Invalid Chunked Response]"),Kt(this),qt(this)}else Dt(this.i,this.l,a,null),Gt(this,a);4==d&&Kt(this),this.o&&!this.J&&(4==d?pn(this.j,this):(this.o=!1,jt(this)))}else(function(t){const e={};t=(t.g&&2<=Xe(t)&&t.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<t.length;r++){if(p(t[r]))continue;var n=T(t[r]);const s=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const i=e[s]||[];e[s]=i,i.push(n)}!function(t,e){for(const n in t)e.call(void 0,t[n],n,t)}(e,function(t){return t.join(", ")})})(this.g),400==n&&0<a.indexOf("Unknown SID")?(this.s=3,St(12)):(this.s=0,St(13)),Kt(this),qt(this)}}}catch(d){}},Ot.prototype.cancel=function(){this.J=!0,Kt(this)},Ot.prototype.ba=function(){this.B=null;const t=Date.now();0<=t-this.S?(function(t,e){t.info(function(){return"TIMEOUT: "+e})}(this.i,this.A),2!=this.L&&(Tt(),St(17)),Kt(this),this.s=2,qt(this)):$t(this,this.S-t)};var Ht=class{constructor(t,e){this.g=t,this.map=e}};function Qt(t){this.l=t||10,s.PerformanceNavigationTiming?t=0<(t=s.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(s.chrome&&s.chrome.loadTimes&&s.chrome.loadTimes()&&s.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Wt(t){return!!t.h||!!t.g&&t.g.size>=t.j}function Yt(t){return t.h?1:t.g?t.g.size:0}function Xt(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function Jt(t,e){t.g?t.g.add(e):t.h=e}function Zt(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function te(t){if(null!=t.h)return t.i.concat(t.h.D);if(null!=t.g&&0!==t.g.size){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return d(t.i)}function ee(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(i(t)||"string"==typeof t)Array.prototype.forEach.call(t,e,void 0);else for(var n=function(t){if(t.na&&"function"==typeof t.na)return t.na();if(!t.V||"function"!=typeof t.V){if("undefined"!=typeof Map&&t instanceof Map)return Array.from(t.keys());if(!("undefined"!=typeof Set&&t instanceof Set)){if(i(t)||"string"==typeof t){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const r in t)e[n++]=r;return e}}}(t),r=function(t){if(t.V&&"function"==typeof t.V)return t.V();if("undefined"!=typeof Map&&t instanceof Map||"undefined"!=typeof Set&&t instanceof Set)return Array.from(t.values());if("string"==typeof t)return t.split("");if(i(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}for(r in e=[],n=0,t)e[n++]=t[r];return e}(t),s=r.length,o=0;o<s;o++)e.call(void 0,r[o],n&&n[o],t)}Qt.prototype.cancel=function(){if(this.i=te(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const t of this.g.values())t.cancel();this.g.clear()}};var ne=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function re(t){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,t instanceof re){this.h=t.h,ie(this,t.j),this.o=t.o,this.g=t.g,oe(this,t.s),this.l=t.l;var e=t.i,n=new ve;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),ae(this,n),this.m=t.m}else t&&(e=String(t).match(ne))?(this.h=!1,ie(this,e[1]||"",!0),this.o=he(e[2]||""),this.g=he(e[3]||"",!0),oe(this,e[4]),this.l=he(e[5]||"",!0),ae(this,e[6]||"",!0),this.m=he(e[7]||"")):(this.h=!1,this.i=new ve(null,this.h))}function se(t){return new re(t)}function ie(t,e,n){t.j=n?he(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function oe(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.s=e}else t.s=null}function ae(t,e,n){e instanceof ve?(t.i=e,function(t,e){e&&!t.j&&(we(t),t.i=null,t.g.forEach(function(t,e){var n=e.toLowerCase();e!=n&&(Ee(this,e),Te(this,n,t))},t)),t.j=e}(t.i,t.h)):(n||(e=le(e,ge)),t.i=new ve(e,t.h))}function ce(t,e,n){t.i.set(e,n)}function ue(t){return ce(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function he(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function le(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,de),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function de(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}re.prototype.toString=function(){var t=[],e=this.j;e&&t.push(le(e,fe,!0),":");var n=this.g;return(n||"file"==e)&&(t.push("//"),(e=this.o)&&t.push(le(e,fe,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.s)&&t.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&t.push("/"),t.push(le(n,"/"==n.charAt(0)?me:pe,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.m)&&t.push("#",le(n,ye)),t.join("")};var fe=/[#\/\?@]/g,pe=/[#\?:]/g,me=/[#\?]/g,ge=/[#\?@]/g,ye=/#/g;function ve(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function we(t){t.g||(t.g=new Map,t.h=0,t.i&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}function Ee(t,e){we(t),e=_e(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function be(t,e){return we(t),e=_e(t,e),t.g.has(e)}function Te(t,e,n){Ee(t,e),0<n.length&&(t.i=null,t.g.set(_e(t,e),d(n)),t.h+=n.length)}function _e(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Se(t,e,n,r,s){try{s&&(s.onload=null,s.onerror=null,s.onabort=null,s.ontimeout=null),r(n)}catch(i){}}function Ie(){this.g=new lt}function Ce(t,e,n){const r=n||"";try{ee(t,function(t,n){let s=t;o(t)&&(s=ut(t)),e.push(r+n+"="+encodeURIComponent(s))})}catch(s){throw e.push(r+"type="+encodeURIComponent("_badmap")),s}}function Ae(t){this.l=t.Ub||null,this.j=t.eb||!1}function De(t,e){tt.call(this),this.D=t,this.o=e,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function ke(t){t.j.read().then(t.Pa.bind(t)).catch(t.ga.bind(t))}function Ne(t){t.readyState=4,t.l=null,t.j=null,t.v=null,Re(t)}function Re(t){t.onreadystatechange&&t.onreadystatechange.call(t)}function xe(t){let e="";return v(t,function(t,n){e+=n,e+=":",e+=t,e+="\r\n"}),e}function Oe(t,e,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=xe(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):ce(t,e,n))}function Le(t){tt.call(this),this.headers=new Map,this.o=t||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(t=ve.prototype).add=function(t,e){we(this),this.i=null,t=_e(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},t.forEach=function(t,e){we(this),this.g.forEach(function(n,r){n.forEach(function(n){t.call(e,n,r,this)},this)},this)},t.na=function(){we(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let r=0;r<e.length;r++){const s=t[r];for(let t=0;t<s.length;t++)n.push(e[r])}return n},t.V=function(t){we(this);let e=[];if("string"==typeof t)be(this,t)&&(e=e.concat(this.g.get(_e(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e},t.set=function(t,e){return we(this),this.i=null,be(this,t=_e(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},t.get=function(t,e){return t&&0<(t=this.V(t)).length?String(t[0]):e},t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var r=e[n];const i=encodeURIComponent(String(r)),o=this.V(r);for(r=0;r<o.length;r++){var s=i;""!==o[r]&&(s+="="+encodeURIComponent(String(o[r]))),t.push(s)}}return this.i=t.join("&")},l(Ae,dt),Ae.prototype.g=function(){return new De(this.l,this.j)},Ae.prototype.i=function(t){return function(){return t}}({}),l(De,tt),(t=De.prototype).open=function(t,e){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=t,this.A=e,this.readyState=1,Re(this)},t.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.u,method:this.B,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||s).fetch(new Request(this.A,e)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Ne(this)),this.readyState=0},t.Sa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Re(this)),this.g&&(this.readyState=3,Re(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==s.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ke(this)}else t.text().then(this.Ra.bind(this),this.ga.bind(this))},t.Pa=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var e=t.value?t.value:new Uint8Array(0);(e=this.v.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Ne(this):Re(this),3==this.readyState&&ke(this)}},t.Ra=function(t){this.g&&(this.response=this.responseText=t,Ne(this))},t.Qa=function(t){this.g&&(this.response=t,Ne(this))},t.ga=function(){this.g&&Ne(this)},t.setRequestHeader=function(t,e){this.u.append(t,e)},t.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(De.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}}),l(Le,tt);var Me=/^https?$/i,Pe=["POST","PUT"];function Ve(t,e){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=e,t.m=5,Fe(t),Be(t)}function Fe(t){t.A||(t.A=!0,et(t,"complete"),et(t,"error"))}function Ue(t){if(t.h&&void 0!==r&&(!t.v[1]||4!=Xe(t)||2!=t.Z()))if(t.u&&4==Xe(t))rt(t.Ea,0,t);else if(et(t,"readystatechange"),4==Xe(t)){t.h=!1;try{const r=t.Z();t:switch(r){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var n;if(!(n=e)){var i;if(i=0===r){var o=String(t.D).match(ne)[1]||null;!o&&s.self&&s.self.location&&(o=s.self.location.protocol.slice(0,-1)),i=!Me.test(o?o.toLowerCase():"")}n=i}if(n)et(t,"complete"),et(t,"success");else{t.m=6;try{var a=2<Xe(t)?t.g.statusText:""}catch(c){a=""}t.l=a+" ["+t.Z()+"]",Fe(t)}}finally{Be(t)}}}function Be(t,e){if(t.g){Ye(t);const r=t.g,s=t.v[0]?()=>{}:null;t.g=null,t.v=null,e||et(t,"ready");try{r.onreadystatechange=s}catch(n){}}}function Ye(t){t.I&&(s.clearTimeout(t.I),t.I=null)}function Xe(t){return t.g?t.g.readyState:0}function Je(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.H){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(e){return null}}function Ze(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function tn(t){this.Aa=0,this.i=[],this.j=new At,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ze("failFast",!1,t),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ze("baseRetryDelayMs",5e3,t),this.cb=Ze("retryDelaySeedMs",1e4,t),this.Wa=Ze("forwardChannelMaxRetries",2,t),this.wa=Ze("forwardChannelRequestTimeoutMs",2e4,t),this.pa=t&&t.xmlHttpFactory||void 0,this.Xa=t&&t.Tb||void 0,this.Ca=t&&t.useFetchStreams||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.h=new Qt(t&&t.concurrentRequestLimit),this.Da=new Ie,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=t&&t.Rb||!1,t&&t.xa&&this.j.xa(),t&&t.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&t&&t.detectBufferingProxy||!1,this.ja=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.ja=t.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function en(t){if(rn(t),3==t.G){var e=t.U++,n=se(t.I);if(ce(n,"SID",t.K),ce(n,"RID",e),ce(n,"TYPE","terminate"),an(t,n),(e=new Ot(t,t.j,e)).L=2,e.v=ue(se(n)),n=!1,s.navigator&&s.navigator.sendBeacon)try{n=s.navigator.sendBeacon(e.v.toString(),"")}catch(r){}!n&&s.Image&&((new Image).src=e.v,n=!0),n||(e.g=wn(e.j,null),e.g.ea(e.v)),e.F=Date.now(),jt(e)}yn(t)}function nn(t){t.g&&(ln(t),t.g.cancel(),t.g=null)}function rn(t){nn(t),t.u&&(s.clearTimeout(t.u),t.u=null),fn(t),t.h.cancel(),t.s&&("number"==typeof t.s&&s.clearTimeout(t.s),t.s=null)}function sn(t){if(!Wt(t.h)&&!t.s){t.s=!0;var e=t.Ga;A||N(),D||(A(),D=!0),k.add(e,t),t.B=0}}function on(t,e){var n;n=e?e.l:t.U++;const r=se(t.I);ce(r,"SID",t.K),ce(r,"RID",n),ce(r,"AID",t.T),an(t,r),t.m&&t.o&&Oe(r,t.m,t.o),n=new Ot(t,t.j,n,t.B+1),null===t.m&&(n.H=t.o),e&&(t.i=e.D.concat(t.i)),e=cn(t,n,1e3),n.I=Math.round(.5*t.wa)+Math.round(.5*t.wa*Math.random()),Jt(t.h,n),Vt(n,r,e)}function an(t,e){t.H&&v(t.H,function(t,n){ce(e,n,t)}),t.l&&ee({},function(t,n){ce(e,n,t)})}function cn(t,e,n){n=Math.min(t.i.length,n);var r=t.l?u(t.l.Na,t.l,t):null;t:{var s=t.i;let e=-1;for(;;){const t=["count="+n];-1==e?0<n?(e=s[0].g,t.push("ofs="+e)):e=0:t.push("ofs="+e);let o=!0;for(let a=0;a<n;a++){let n=s[a].g;const c=s[a].map;if(n-=e,0>n)e=Math.max(0,s[a].g-100),o=!1;else try{Ce(c,t,"req"+n+"_")}catch(i){r&&r(c)}}if(o){r=t.join("&");break t}}}return t=t.i.splice(0,n),e.D=t,r}function un(t){if(!t.g&&!t.u){t.Y=1;var e=t.Fa;A||N(),D||(A(),D=!0),k.add(e,t),t.v=0}}function hn(t){return!(t.g||t.u||3<=t.v)&&(t.Y++,t.u=Ct(u(t.Fa,t),mn(t,t.v)),t.v++,!0)}function ln(t){null!=t.A&&(s.clearTimeout(t.A),t.A=null)}function dn(t){t.g=new Ot(t,t.j,"rpc",t.Y),null===t.m&&(t.g.H=t.o),t.g.O=0;var e=se(t.qa);ce(e,"RID","rpc"),ce(e,"SID",t.K),ce(e,"AID",t.T),ce(e,"CI",t.F?"0":"1"),!t.F&&t.ja&&ce(e,"TO",t.ja),ce(e,"TYPE","xmlhttp"),an(t,e),t.m&&t.o&&Oe(e,t.m,t.o),t.L&&(t.g.I=t.L);var n=t.g;t=t.ia,n.L=1,n.v=ue(se(e)),n.m=null,n.P=!0,Ft(n,t)}function fn(t){null!=t.C&&(s.clearTimeout(t.C),t.C=null)}function pn(t,e){var n=null;if(t.g==e){fn(t),ln(t),t.g=null;var r=2}else{if(!Xt(t.h,e))return;n=e.D,Zt(t.h,e),r=1}if(0!=t.G)if(e.o)if(1==r){n=e.m?e.m.length:0,e=Date.now()-e.F;var s=t.B;et(r=Et(),new It(r,n)),sn(t)}else un(t);else if(3==(s=e.s)||0==s&&0<e.X||!(1==r&&function(t,e){return!(Yt(t.h)>=t.h.j-(t.s?1:0)||(t.s?(t.i=e.D.concat(t.i),0):1==t.G||2==t.G||t.B>=(t.Va?0:t.Wa)||(t.s=Ct(u(t.Ga,t,e),mn(t,t.B)),t.B++,0)))}(t,e)||2==r&&hn(t)))switch(n&&0<n.length&&(e=t.h,e.i=e.i.concat(n)),s){case 1:gn(t,5);break;case 4:gn(t,10);break;case 3:gn(t,6);break;default:gn(t,2)}}function mn(t,e){let n=t.Ta+Math.floor(Math.random()*t.cb);return t.isActive()||(n*=2),n*e}function gn(t,e){if(t.j.info("Error code "+e),2==e){var n=u(t.fb,t),r=t.Xa;const e=!r;r=new re(r||"//www.google.com/images/cleardot.gif"),s.location&&"http"==s.location.protocol||ie(r,"https"),ue(r),e?function(t,e){const n=new At;if(s.Image){const r=new Image;r.onload=h(Se,n,"TestLoadImage: loaded",!0,e,r),r.onerror=h(Se,n,"TestLoadImage: error",!1,e,r),r.onabort=h(Se,n,"TestLoadImage: abort",!1,e,r),r.ontimeout=h(Se,n,"TestLoadImage: timeout",!1,e,r),s.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=t}else e(!1)}(r.toString(),n):function(t,e){new At;const n=new AbortController,r=setTimeout(()=>{n.abort(),Se(0,0,!1,e)},1e4);fetch(t,{signal:n.signal}).then(t=>{clearTimeout(r),t.ok?Se(0,0,!0,e):Se(0,0,!1,e)}).catch(()=>{clearTimeout(r),Se(0,0,!1,e)})}(r.toString(),n)}else St(2);t.G=0,t.l&&t.l.sa(e),yn(t),rn(t)}function yn(t){if(t.G=0,t.ka=[],t.l){const e=te(t.h);0==e.length&&0==t.i.length||(f(t.ka,e),f(t.ka,t.i),t.h.i.length=0,d(t.i),t.i.length=0),t.l.ra()}}function vn(t,e,n){var r=n instanceof re?se(n):new re(n);if(""!=r.g)e&&(r.g=e+"."+r.g),oe(r,r.s);else{var i=s.location;r=i.protocol,e=e?e+"."+i.hostname:i.hostname,i=+i.port;var o=new re(null);r&&ie(o,r),e&&(o.g=e),i&&oe(o,i),n&&(o.l=n),r=o}return n=t.D,e=t.ya,n&&e&&ce(r,n,e),ce(r,"VER",t.la),an(t,r),r}function wn(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return(e=t.Ca&&!t.pa?new Le(new Ae({eb:n})):new Le(t.pa)).Ha(t.J),e}function En(){}function bn(){}function Tn(t,e){tt.call(this),this.g=new tn(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.va&&(t?t["X-WebChannel-Client-Profile"]=e.va:t={"X-WebChannel-Client-Profile":e.va}),this.g.S=t,(t=e&&e.Sb)&&!p(t)&&(this.g.m=t),this.v=e&&e.supportsCrossDomainXhr||!1,this.u=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!p(e)&&(this.g.D=e,null!==(t=this.h)&&e in t&&(e in(t=this.h)&&delete t[e])),this.j=new In(this)}function _n(t){gt.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){t:{for(const n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function Sn(){yt.call(this),this.status=1}function In(t){this.g=t}(t=Le.prototype).Ha=function(t){this.J=t},t.ea=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);e=e?e.toUpperCase():"GET",this.D=t,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():kt.g(),this.v=this.o?ft(this.o):ft(kt),this.g.onreadystatechange=u(this.Ea,this);try{this.B=!0,this.g.open(e,String(t),!0),this.B=!1}catch(o){return void Ve(this,o)}if(t=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else{if("function"!=typeof r.keys||"function"!=typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const t of r.keys())n.set(t,r.get(t))}r=Array.from(n.keys()).find(t=>"content-type"==t.toLowerCase()),i=s.FormData&&t instanceof s.FormData,!(0<=Array.prototype.indexOf.call(Pe,e,void 0))||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[s,a]of n)this.g.setRequestHeader(s,a);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ye(this),this.u=!0,this.g.send(t),this.u=!1}catch(o){Ve(this,o)}},t.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=t||7,et(this,"complete"),et(this,"abort"),Be(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Be(this,!0)),Le.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Ue(this):this.bb())},t.bb=function(){Ue(this)},t.isActive=function(){return!!this.g},t.Z=function(){try{return 2<Xe(this)?this.g.status:-1}catch(t){return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch(t){return""}},t.Oa=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),ht(e)}},t.Ba=function(){return this.m},t.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(t=tn.prototype).la=8,t.G=1,t.connect=function(t,e,n,r){St(0),this.W=t,this.H=e||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.I=vn(this,null,this.W),sn(this)},t.Ga=function(t){if(this.s)if(this.s=null,1==this.G){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const s=new Ot(this,this.j,t);let i=this.o;if(this.S&&(i?(i=w(i),b(i,this.S)):i=this.S),null!==this.m||this.O||(s.H=i,i=null),this.P)t:{for(var e=0,n=0;n<this.i.length;n++){var r=this.i[n];if(void 0===(r="__data__"in r.map&&"string"==typeof(r=r.map.__data__)?r.length:void 0))break;if(4096<(e+=r)){e=n;break t}if(4096===e||n===this.i.length-1){e=n+1;break t}}e=1e3}else e=1e3;e=cn(this,s,e),ce(n=se(this.I),"RID",t),ce(n,"CVER",22),this.D&&ce(n,"X-HTTP-Session-Id",this.D),an(this,n),i&&(this.O?e="headers="+encodeURIComponent(String(xe(i)))+"&"+e:this.m&&Oe(n,this.m,i)),Jt(this.h,s),this.Ua&&ce(n,"TYPE","init"),this.P?(ce(n,"$req",e),ce(n,"SID","null"),s.T=!0,Vt(s,n,null)):Vt(s,n,e),this.G=2}}else 3==this.G&&(t?on(this,t):0==this.i.length||Wt(this.h)||on(this))},t.Fa=function(){if(this.u=null,dn(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var t=2*this.R;this.j.info("BP detection timer enabled: "+t),this.A=Ct(u(this.ab,this),t)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,St(10),nn(this),dn(this))},t.Za=function(){null!=this.C&&(this.C=null,nn(this),hn(this),St(19))},t.fb=function(t){t?(this.j.info("Successfully pinged google.com"),St(2)):(this.j.info("Failed to ping google.com"),St(1))},t.isActive=function(){return!!this.l&&this.l.isActive(this)},(t=En.prototype).ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){},bn.prototype.g=function(t,e){return new Tn(t,e)},l(Tn,tt),Tn.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Tn.prototype.close=function(){en(this.g)},Tn.prototype.o=function(t){var e=this.g;if("string"==typeof t){var n={};n.__data__=t,t=n}else this.u&&((n={}).__data__=ut(t),t=n);e.i.push(new Ht(e.Ya++,t)),3==e.G&&sn(e)},Tn.prototype.N=function(){this.g.l=null,delete this.j,en(this.g),delete this.g,Tn.aa.N.call(this)},l(_n,gt),l(Sn,yt),l(In,En),In.prototype.ua=function(){et(this.g,"a")},In.prototype.ta=function(t){et(this.g,new _n(t))},In.prototype.sa=function(t){et(this.g,new Sn)},In.prototype.ra=function(){et(this.g,"b")},bn.prototype.createWebChannel=bn.prototype.g,Tn.prototype.send=Tn.prototype.o,Tn.prototype.open=Tn.prototype.m,Tn.prototype.close=Tn.prototype.close,Qe=function(){return new bn},He=function(){return Et()},Ge=vt,Ke={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Nt.NO_ERROR=0,Nt.TIMEOUT=8,Nt.HTTP_ERROR=6,qe=Nt,Rt.COMPLETE="complete",ze=Rt,pt.EventType=mt,mt.OPEN="a",mt.CLOSE="b",mt.ERROR="c",mt.MESSAGE="d",tt.prototype.listen=tt.prototype.K,$e=pt,Le.prototype.listenOnce=Le.prototype.L,Le.prototype.getLastError=Le.prototype.Ka,Le.prototype.getLastErrorCode=Le.prototype.Ba,Le.prototype.getStatus=Le.prototype.Z,Le.prototype.getResponseJson=Le.prototype.Oa,Le.prototype.getResponseText=Le.prototype.oa,Le.prototype.send=Le.prototype.ea,Le.prototype.setWithCredentials=Le.prototype.Ha,je=Le}).apply(void 0!==We?We:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const Ye="@firebase/firestore",Xe="4.7.11";
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
 */class Je{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Je.UNAUTHENTICATED=new Je(null),Je.GOOGLE_CREDENTIALS=new Je("google-credentials-uid"),Je.FIRST_PARTY=new Je("first-party-uid"),Je.MOCK_USER=new Je("mock-user");
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
let Ze="11.6.1";
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
 */const tn=new St("@firebase/firestore");function en(){return tn.logLevel}function nn(t,...e){if(tn.logLevel<=vt.DEBUG){const n=e.map(on);tn.debug(`Firestore (${Ze}): ${t}`,...n)}}function rn(t,...e){if(tn.logLevel<=vt.ERROR){const n=e.map(on);tn.error(`Firestore (${Ze}): ${t}`,...n)}}function sn(t,...e){if(tn.logLevel<=vt.WARN){const n=e.map(on);tn.warn(`Firestore (${Ze}): ${t}`,...n)}}function on(t){if("string"==typeof t)return t;try{
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
 */function an(t,e,n){let r="Unexpected state";"string"==typeof e?r=e:n=e,cn(t,r,n)}function cn(t,e,n){let r=`FIRESTORE (${Ze}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(s){r+=" CONTEXT: "+n}throw rn(r),new Error(r)}function un(t,e,n,r){let s="Unexpected state";"string"==typeof n?s=n:r=n,t||cn(e,s,r)}function hn(t,e){return t}
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
 */const ln={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class dn extends ct{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
 */class fn{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}
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
 */class pn{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class mn{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(Je.UNAUTHENTICATED))}shutdown(){}}class gn{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class yn{constructor(t){this.t=t,this.currentUser=Je.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){un(void 0===this.o,42304);let n=this.i;const r=t=>this.i!==n?(n=this.i,e(t)):Promise.resolve();let s=new fn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new fn,t.enqueueRetryable(()=>r(this.currentUser))};const i=()=>{const e=s;t.enqueueRetryable(async()=>{await e.promise,await r(this.currentUser)})},o=t=>{nn("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=t,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(t=>o(t)),setTimeout(()=>{if(!this.auth){const t=this.t.getImmediate({optional:!0});t?o(t):(nn("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new fn)}},0),i()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(e=>this.i!==t?(nn("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(un("string"==typeof e.accessToken,31837,{l:e}),new pn(e.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return un(null===t||"string"==typeof t,2055,{h:t}),new Je(t)}}class vn{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=Je.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class wn{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new vn(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(Je.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class En{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class bn{constructor(t,e){var n;this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,null!=(n=t)&&void 0!==n.settings&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){un(void 0===this.o,3512);const n=t=>{null!=t.error&&nn("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`);const n=t.token!==this.m;return this.m=t.token,nn("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?e(t.token):Promise.resolve()};this.o=e=>{t.enqueueRetryable(()=>n(e))};const r=t=>{nn("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=t,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(t=>r(t)),setTimeout(()=>{if(!this.appCheck){const t=this.V.getImmediate({optional:!0});t?r(t):nn("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new En(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(t=>t?(un("string"==typeof t.token,44558,{tokenResult:t}),this.m=t.token,new En(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
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
 */function Tn(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}
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
 */function _n(){return new TextEncoder}
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
 */class Sn{static newId(){const t=62*Math.floor(256/62);let e="";for(;e.length<20;){const n=Tn(40);for(let r=0;r<n.length;++r)e.length<20&&n[r]<t&&(e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return e}}function In(t,e){return t<e?-1:t>e?1:0}function Cn(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=t.codePointAt(n),s=e.codePointAt(n);if(r!==s){if(r<128&&s<128)return In(r,s);{const i=_n(),o=Dn(i.encode(An(t,n)),i.encode(An(e,n)));return 0!==o?o:In(r,s)}}n+=r>65535?2:1}return In(t.length,e.length)}function An(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function Dn(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return In(t[n],e[n]);return In(t.length,e.length)}function kn(t,e,n){return t.length===e.length&&t.every((t,r)=>n(t,e[r]))}
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
 */const Nn=-62135596800,Rn=1e6;class xn{static now(){return xn.fromMillis(Date.now())}static fromDate(t){return xn.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Rn);return new xn(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new dn(ln.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new dn(ln.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Nn)throw new dn(ln.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new dn(ln.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Rn}_compareTo(t){return this.seconds===t.seconds?In(this.nanoseconds,t.nanoseconds):In(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-Nn;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
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
 */class On{static fromTimestamp(t){return new On(t)}static min(){return new On(new xn(0,0))}static max(){return new On(new xn(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */const Ln="__name__";class Mn{constructor(t,e,n){void 0===e?e=0:e>t.length&&an(637,{offset:e,range:t.length}),void 0===n?n=t.length-e:n>t.length-e&&an(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===Mn.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Mn?t.forEach(t=>{e.push(t)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=Mn.compareSegments(t.get(r),e.get(r));if(0!==n)return n}return In(t.length,e.length)}static compareSegments(t,e){const n=Mn.isNumericId(t),r=Mn.isNumericId(e);return n&&!r?-1:!n&&r?1:n&&r?Mn.extractNumericId(t).compare(Mn.extractNumericId(e)):Cn(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Fe.fromString(t.substring(4,t.length-2))}}class Pn extends Mn{construct(t,e,n){return new Pn(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new dn(ln.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(t=>t.length>0))}return new Pn(e)}static emptyPath(){return new Pn([])}}const Vn=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Fn extends Mn{construct(t,e,n){return new Fn(t,e,n)}static isValidIdentifier(t){return Vn.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Fn.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Ln}static keyField(){return new Fn([Ln])}static fromServerFormat(t){const e=[];let n="",r=0;const s=()=>{if(0===n.length)throw new dn(ln.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new dn(ln.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new dn(ln.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(i=!i,r++):"."!==e||i?(n+=e,r++):(s(),r++)}if(s(),i)throw new dn(ln.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Fn(e)}static emptyPath(){return new Fn([])}}
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
 */class Un{constructor(t){this.path=t}static fromPath(t){return new Un(Pn.fromString(t))}static fromName(t){return new Un(Pn.fromString(t).popFirst(5))}static empty(){return new Un(Pn.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return null!==t&&0===Pn.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Pn.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new Un(new Pn(t.slice()))}}
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
 */function Bn(t){return new jn(t.readTime,t.key,-1)}class jn{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new jn(On.min(),Un.empty(),-1)}static max(){return new jn(On.max(),Un.empty(),-1)}}function $n(t,e){let n=t.readTime.compareTo(e.readTime);return 0!==n?n:(n=Un.comparator(t.documentKey,e.documentKey),0!==n?n:In(t.largestBatchId,e.largestBatchId)
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
 */)}class zn{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}
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
 */async function qn(t){if(t.code!==ln.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==t.message)throw t;nn("LocalStore","Unexpectedly lost primary lease")}
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
 */class Kn{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&an(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new Kn((n,r)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,r)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,r)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof Kn?e:Kn.resolve(e)}catch(e){return Kn.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):Kn.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):Kn.reject(e)}static resolve(t){return new Kn((e,n)=>{e(t)})}static reject(t){return new Kn((e,n)=>{n(t)})}static waitFor(t){return new Kn((e,n)=>{let r=0,s=0,i=!1;t.forEach(t=>{++r,t.next(()=>{++s,i&&s===r&&e()},t=>n(t))}),i=!0,s===r&&e()})}static or(t){let e=Kn.resolve(!1);for(const n of t)e=e.next(t=>t?Kn.resolve(t):n());return e}static forEach(t,e){const n=[];return t.forEach((t,r)=>{n.push(e.call(this,t,r))}),this.waitFor(n)}static mapArray(t,e){return new Kn((n,r)=>{const s=t.length,i=new Array(s);let o=0;for(let a=0;a<s;a++){const c=a;e(t[c]).next(t=>{i[c]=t,++o,o===s&&n(i)},t=>r(t))}})}static doWhile(t,e){return new Kn((n,r)=>{const s=()=>{!0===t()?e().next(()=>{s()},r):n()};s()})}}function Gn(t){return"IndexedDbTransactionError"===t.name}
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
 */class Hn{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.ue(t),this.ce=t=>e.writeSequenceNumber(t))}ue(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ce&&this.ce(t),t}}Hn.le=-1;function Qn(t){return null==t}function Wn(t){return 0===t&&1/t==-1/0}function Yn(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const e=t.charAt(s);switch(e){case"\0":n+="";break;case"":n+="";break;default:n+=e}}return n}function Xn(t){return t+""}
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
 */function Jn(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Zn(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function tr(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
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
 */class er{constructor(t,e){this.comparator=t,this.root=e||rr.EMPTY}insert(t,e){return new er(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,rr.BLACK,null,null))}remove(t){return new er(this.comparator,this.root.remove(t,this.comparator).copy(null,null,rr.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new nr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new nr(this.root,t,this.comparator,!1)}getReverseIterator(){return new nr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new nr(this.root,t,this.comparator,!0)}}class nr{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?n(t.key,e):1,e&&r&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(0===s){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class rr{constructor(t,e,n,r,s){this.key=t,this.value=e,this.color=null!=n?n:rr.RED,this.left=null!=r?r:rr.EMPTY,this.right=null!=s?s:rr.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,s){return new rr(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const s=n(t,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===s?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return rr.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return rr.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,rr.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,rr.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw an(43730,{key:this.key,value:this.value});if(this.right.isRed())throw an(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw an(27949);return t+(this.isRed()?0:1)}}rr.EMPTY=null,rr.RED=!0,rr.BLACK=!1,rr.EMPTY=new class{constructor(){this.size=0}get key(){throw an(57766)}get value(){throw an(16141)}get color(){throw an(16727)}get left(){throw an(29726)}get right(){throw an(36894)}copy(t,e,n,r,s){return this}insert(t,e,n){return new rr(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class sr{constructor(t){this.comparator=t,this.data=new er(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new ir(this.data.getIterator())}getIteratorFrom(t){return new ir(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(t=>{e=e.add(t)}),e}isEqual(t){if(!(t instanceof sr))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new sr(this.comparator);return e.data=t,e}}class ir{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
 */class or{constructor(t){this.fields=t,t.sort(Fn.comparator)}static empty(){return new or([])}unionWith(t){let e=new sr(Fn.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new or(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return kn(this.fields,t.fields,(t,e)=>t.isEqual(e))}}
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
 */class ar extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
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
 */class cr{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(t){try{return atob(t)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new ar("Invalid base64 string: "+e):e}}(t);return new cr(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new cr(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return In(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}cr.EMPTY_BYTE_STRING=new cr("");const ur=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function hr(t){if(un(!!t,39018),"string"==typeof t){let e=0;const n=ur.exec(t);if(un(!!n,46558,{timestamp:t}),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:lr(t.seconds),nanos:lr(t.nanos)}}function lr(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function dr(t){return"string"==typeof t?cr.fromBase64String(t):cr.fromUint8Array(t)}
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
 */const fr="server_timestamp",pr="__type__",mr="__previous_value__",gr="__local_write_time__";function yr(t){var e,n;return(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{})[pr])||void 0===n?void 0:n.stringValue)===fr}function vr(t){const e=t.mapValue.fields[mr];return yr(e)?vr(e):e}function wr(t){const e=hr(t.mapValue.fields[gr].timestampValue);return new xn(e.seconds,e.nanos)}
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
 */class Er{constructor(t,e,n,r,s,i,o,a,c){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c}}const br="(default)";class Tr{constructor(t,e){this.projectId=t,this.database=e||br}static empty(){return new Tr("","")}get isDefaultDatabase(){return this.database===br}isEqual(t){return t instanceof Tr&&t.projectId===this.projectId&&t.database===this.database}}
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
 */const _r="__type__",Sr="__max__",Ir={},Cr="__vector__",Ar="value";function Dr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?yr(t)?4:function(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===Sr}
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
 */(t)?9007199254740991:function(t){var e,n;return(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{})[_r])||void 0===n?void 0:n.stringValue)===Cr}(t)?10:11:an(28295,{value:t})}function kr(t,e){if(t===e)return!0;const n=Dr(t);if(n!==Dr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return wr(t).isEqual(wr(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=hr(t.timestampValue),r=hr(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return r=e,dr(t.bytesValue).isEqual(dr(r.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return lr(t.geoPointValue.latitude)===lr(e.geoPointValue.latitude)&&lr(t.geoPointValue.longitude)===lr(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return lr(t.integerValue)===lr(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=lr(t.doubleValue),r=lr(e.doubleValue);return n===r?Wn(n)===Wn(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return kn(t.arrayValue.values||[],e.arrayValue.values||[],kr);case 10:case 11:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(Jn(n)!==Jn(r))return!1;for(const s in n)if(n.hasOwnProperty(s)&&(void 0===r[s]||!kr(n[s],r[s])))return!1;return!0}(t,e);default:return an(52216,{left:t})}var r}function Nr(t,e){return void 0!==(t.values||[]).find(t=>kr(t,e))}function Rr(t,e){if(t===e)return 0;const n=Dr(t),r=Dr(e);if(n!==r)return In(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return In(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=lr(t.integerValue||t.doubleValue),r=lr(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return xr(t.timestampValue,e.timestampValue);case 4:return xr(wr(t),wr(e));case 5:return Cn(t.stringValue,e.stringValue);case 6:return function(t,e){const n=dr(t),r=dr(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let s=0;s<n.length&&s<r.length;s++){const t=In(n[s],r[s]);if(0!==t)return t}return In(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=In(lr(t.latitude),lr(e.latitude));return 0!==n?n:In(lr(t.longitude),lr(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Or(t.arrayValue,e.arrayValue);case 10:return function(t,e){var n,r,s,i;const o=t.fields||{},a=e.fields||{},c=null===(n=o[Ar])||void 0===n?void 0:n.arrayValue,u=null===(r=a[Ar])||void 0===r?void 0:r.arrayValue,h=In((null===(s=null==c?void 0:c.values)||void 0===s?void 0:s.length)||0,(null===(i=null==u?void 0:u.values)||void 0===i?void 0:i.length)||0);return 0!==h?h:Or(c,u)}(t.mapValue,e.mapValue);case 11:return function(t,e){if(t===Ir&&e===Ir)return 0;if(t===Ir)return 1;if(e===Ir)return-1;const n=t.fields||{},r=Object.keys(n),s=e.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let o=0;o<r.length&&o<i.length;++o){const t=Cn(r[o],i[o]);if(0!==t)return t;const e=Rr(n[r[o]],s[i[o]]);if(0!==e)return e}return In(r.length,i.length)}(t.mapValue,e.mapValue);default:throw an(23264,{Pe:n})}}function xr(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return In(t,e);const n=hr(t),r=hr(e),s=In(n.seconds,r.seconds);return 0!==s?s:In(n.nanos,r.nanos)}function Or(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const t=Rr(n[s],r[s]);if(t)return t}return In(n.length,r.length)}function Lr(t){return Mr(t)}function Mr(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=hr(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?dr(t.bytesValue).toBase64():"referenceValue"in t?function(t){return Un.fromName(t).toString()}(t.referenceValue):"geoPointValue"in t?function(t){return`geo(${t.latitude},${t.longitude})`}(t.geoPointValue):"arrayValue"in t?function(t){let e="[",n=!0;for(const r of t.values||[])n?n=!1:e+=",",e+=Mr(r);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",r=!0;for(const s of e)r?r=!1:n+=",",n+=`${s}:${Mr(t.fields[s])}`;return n+"}"}(t.mapValue):an(61005,{value:t})}function Pr(t){switch(Dr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=vr(t);return e?16+Pr(e):16;case 5:return 2*t.stringValue.length;case 6:return dr(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(t.arrayValue.values||[]).reduce((t,e)=>t+Pr(e),0);case 10:case 11:return function(t){let e=0;return Zn(t.fields,(t,n)=>{e+=t.length+Pr(n)}),e}(t.mapValue);default:throw an(13486,{value:t})}}function Vr(t){return!!t&&"integerValue"in t}function Fr(t){return!!t&&"arrayValue"in t}function Ur(t){return!!t&&"nullValue"in t}function Br(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function jr(t){return!!t&&"mapValue"in t}function $r(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Zn(t.mapValue.fields,(t,n)=>e.mapValue.fields[t]=$r(n)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=$r(t.arrayValue.values[n]);return e}return Object.assign({},t)}class zr{constructor(t){this.value=t}static empty(){return new zr({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!jr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=$r(e)}setAll(t){let e=Fn.emptyPath(),n={},r=[];t.forEach((t,s)=>{if(!e.isImmediateParentOf(s)){const t=this.getFieldsMap(e);this.applyChanges(t,n,r),n={},r=[],e=s.popLast()}t?n[s.lastSegment()]=$r(t):r.push(s.lastSegment())});const s=this.getFieldsMap(e);this.applyChanges(s,n,r)}delete(t){const e=this.field(t.popLast());jr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return kr(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let r=e.mapValue.fields[t.get(n)];jr(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,n){Zn(e,(e,n)=>t[e]=n);for(const r of n)delete t[r]}clone(){return new zr($r(this.value))}}function qr(t){const e=[];return Zn(t.fields,(t,n)=>{const r=new Fn([t]);if(jr(n)){const t=qr(n.mapValue).fields;if(0===t.length)e.push(r);else for(const n of t)e.push(r.child(n))}else e.push(r)}),new or(e)
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
 */}class Kr{constructor(t,e,n,r,s,i,o){this.key=t,this.documentType=e,this.version=n,this.readTime=r,this.createTime=s,this.data=i,this.documentState=o}static newInvalidDocument(t){return new Kr(t,0,On.min(),On.min(),On.min(),zr.empty(),0)}static newFoundDocument(t,e,n,r){return new Kr(t,1,e,On.min(),n,r,0)}static newNoDocument(t,e){return new Kr(t,2,e,On.min(),On.min(),zr.empty(),0)}static newUnknownDocument(t,e){return new Kr(t,3,e,On.min(),On.min(),zr.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(On.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=zr.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=zr.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=On.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof Kr&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Kr(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class Gr{constructor(t,e){this.position=t,this.inclusive=e}}function Hr(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(r=i.field.isKeyField()?Un.comparator(Un.fromName(o.referenceValue),n.key):Rr(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return r}function Qr(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!kr(t.position[n],e.position[n]))return!1;return!0}
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
 */class Wr{constructor(t,e="asc"){this.field=t,this.dir=e}}function Yr(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}
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
 */class Xr{}class Jr extends Xr{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.createKeyFieldInFilter(t,e,n):new is(t,e,n):"array-contains"===e?new us(t,n):"in"===e?new hs(t,n):"not-in"===e?new ls(t,n):"array-contains-any"===e?new ds(t,n):new Jr(t,e,n)}static createKeyFieldInFilter(t,e,n){return"in"===e?new os(t,n):new as(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&void 0===e.nullValue&&this.matchesComparison(Rr(e,this.value)):null!==e&&Dr(this.value)===Dr(e)&&this.matchesComparison(Rr(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return an(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Zr extends Xr{constructor(t,e){super(),this.filters=t,this.op=e,this.Te=null}static create(t,e){return new Zr(t,e)}matches(t){return ts(this)?void 0===this.filters.find(e=>!e.matches(t)):void 0!==this.filters.find(e=>e.matches(t))}getFlattenedFilters(){return null!==this.Te||(this.Te=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function ts(t){return"and"===t.op}function es(t){return function(t){for(const e of t.filters)if(e instanceof Zr)return!1;return!0}(t)&&ts(t)}function ns(t){if(t instanceof Jr)return t.field.canonicalString()+t.op.toString()+Lr(t.value);if(es(t))return t.filters.map(t=>ns(t)).join(",");{const e=t.filters.map(t=>ns(t)).join(",");return`${t.op}(${e})`}}function rs(t,e){return t instanceof Jr?(n=t,(r=e)instanceof Jr&&n.op===r.op&&n.field.isEqual(r.field)&&kr(n.value,r.value)):t instanceof Zr?function(t,e){return e instanceof Zr&&t.op===e.op&&t.filters.length===e.filters.length&&t.filters.reduce((t,n,r)=>t&&rs(n,e.filters[r]),!0)}(t,e):void an(19439);var n,r}function ss(t){return t instanceof Jr?`${(e=t).field.canonicalString()} ${e.op} ${Lr(e.value)}`:t instanceof Zr?function(t){return t.op.toString()+" {"+t.getFilters().map(ss).join(" ,")+"}"}(t):"Filter";var e}class is extends Jr{constructor(t,e,n){super(t,e,n),this.key=Un.fromName(n.referenceValue)}matches(t){const e=Un.comparator(t.key,this.key);return this.matchesComparison(e)}}class os extends Jr{constructor(t,e){super(t,"in",e),this.keys=cs("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class as extends Jr{constructor(t,e){super(t,"not-in",e),this.keys=cs("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function cs(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map(t=>Un.fromName(t.referenceValue))}class us extends Jr{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Fr(e)&&Nr(e.arrayValue,this.value)}}class hs extends Jr{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&Nr(this.value.arrayValue,e)}}class ls extends Jr{constructor(t,e){super(t,"not-in",e)}matches(t){if(Nr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&void 0===e.nullValue&&!Nr(this.value.arrayValue,e)}}class ds extends Jr{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Fr(e)||!e.arrayValue.values)&&e.arrayValue.values.some(t=>Nr(this.value.arrayValue,t))}}
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
 */class fs{constructor(t,e=null,n=[],r=[],s=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.Ie=null}}function ps(t,e=null,n=[],r=[],s=null,i=null,o=null){return new fs(t,e,n,r,s,i,o)}function ms(t){const e=hn(t);if(null===e.Ie){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(t=>ns(t)).join(","),t+="|ob:",t+=e.orderBy.map(t=>{return(e=t).field.canonicalString()+e.dir;var e}).join(","),Qn(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(t=>Lr(t)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(t=>Lr(t)).join(",")),e.Ie=t}return e.Ie}function gs(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Yr(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!rs(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Qr(t.startAt,e.startAt)&&Qr(t.endAt,e.endAt)}function ys(t){return Un.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}
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
 */class vs{constructor(t,e=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function ws(t){return new vs(t)}function Es(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}function bs(t){const e=hn(t);if(null===e.Ee){e.Ee=[];const t=new Set;for(const r of e.explicitOrderBy)e.Ee.push(r),t.add(r.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(t){let e=new sr(Fn.comparator);return t.filters.forEach(t=>{t.getFlattenedFilters().forEach(t=>{t.isInequality()&&(e=e.add(t.field))})}),e})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.Ee.push(new Wr(r,n))}),t.has(Fn.keyField().canonicalString())||e.Ee.push(new Wr(Fn.keyField(),n))}return e.Ee}function Ts(t){const e=hn(t);return e.de||(e.de=function(t,e){if("F"===t.limitType)return ps(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(t=>{const e="desc"===t.dir?"asc":"desc";return new Wr(t.field,e)});const n=t.endAt?new Gr(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Gr(t.startAt.position,t.startAt.inclusive):null;return ps(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}(e,bs(t))),e.de}function _s(t,e,n){return new vs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Ss(t,e){return gs(Ts(t),Ts(e))&&t.limitType===e.limitType}function Is(t){return`${ms(Ts(t))}|lt:${t.limitType}`}function Cs(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map(t=>ss(t)).join(", ")}]`),Qn(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map(t=>{return`${(e=t).field.canonicalString()} (${e.dir})`;var e}).join(", ")}]`),t.startAt&&(e+=", startAt: ",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(t=>Lr(t)).join(",")),t.endAt&&(e+=", endAt: ",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(t=>Lr(t)).join(",")),`Target(${e})`}(Ts(t))}; limitType=${t.limitType})`}function As(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):Un.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of bs(t))if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&(r=e,!((n=t).startAt&&!function(t,e,n){const r=Hr(t,e,n);return t.inclusive?r<=0:r<0}(n.startAt,bs(n),r)||n.endAt&&!function(t,e,n){const r=Hr(t,e,n);return t.inclusive?r>=0:r>0}(n.endAt,bs(n),r)));var n,r}function Ds(t){return(e,n)=>{let r=!1;for(const s of bs(t)){const t=ks(s,e,n);if(0!==t)return t;r=r||s.field.isKeyField()}return 0}}function ks(t,e,n){const r=t.field.isKeyField()?Un.comparator(e.key,n.key):function(t,e,n){const r=e.data.field(t),s=n.data.field(t);return null!==r&&null!==s?Rr(r,s):an(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return an(19790,{direction:t.dir})}}
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
 */class Ns{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[r,s]of n)if(this.equalsFn(r,t))return s}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),r=this.inner[n];if(void 0===r)return this.inner[n]=[[t,e]],void this.innerSize++;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return void(r[s]=[t,e]);r.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],t))return 1===n.length?delete this.inner[e]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(t){Zn(this.inner,(e,n)=>{for(const[r,s]of n)t(r,s)})}isEmpty(){return tr(this.inner)}size(){return this.innerSize}}
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
 */const Rs=new er(Un.comparator);function xs(){return Rs}const Os=new er(Un.comparator);function Ls(...t){let e=Os;for(const n of t)e=e.insert(n.key,n);return e}function Ms(t){let e=Os;return t.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function Ps(){return Fs()}function Vs(){return Fs()}function Fs(){return new Ns(t=>t.toString(),(t,e)=>t.isEqual(e))}const Us=new er(Un.comparator),Bs=new sr(Un.comparator);function js(...t){let e=Bs;for(const n of t)e=e.add(n);return e}const $s=new sr(In);
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
function zs(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Wn(e)?"-0":e}}function qs(t){return{integerValue:""+t}}function Ks(t,e){return function(t){return"number"==typeof t&&Number.isInteger(t)&&!Wn(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
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
 */(e)?qs(e):zs(t,e)}
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
 */class Gs{constructor(){this._=void 0}}function Hs(t,e,n){return t instanceof Ys?function(t,e){const n={fields:{[pr]:{stringValue:fr},[gr]:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&yr(e)&&(e=vr(e)),e&&(n.fields[mr]=e),{mapValue:n}}(n,e):t instanceof Xs?Js(t,e):t instanceof Zs?ti(t,e):function(t,e){const n=Ws(t,e),r=ni(n)+ni(t.Re);return Vr(n)&&Vr(t.Re)?qs(r):zs(t.serializer,r)}(t,e)}function Qs(t,e,n){return t instanceof Xs?Js(t,e):t instanceof Zs?ti(t,e):n}function Ws(t,e){return t instanceof ei?Vr(n=e)||(r=n)&&"doubleValue"in r?e:{integerValue:0}:null;var n,r}class Ys extends Gs{}class Xs extends Gs{constructor(t){super(),this.elements=t}}function Js(t,e){const n=ri(e);for(const r of t.elements)n.some(t=>kr(t,r))||n.push(r);return{arrayValue:{values:n}}}class Zs extends Gs{constructor(t){super(),this.elements=t}}function ti(t,e){let n=ri(e);for(const r of t.elements)n=n.filter(t=>!kr(t,r));return{arrayValue:{values:n}}}class ei extends Gs{constructor(t,e){super(),this.serializer=t,this.Re=e}}function ni(t){return lr(t.integerValue||t.doubleValue)}function ri(t){return Fr(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
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
 */class si{constructor(t,e){this.field=t,this.transform=e}}class ii{constructor(t,e){this.version=t,this.transformResults=e}}class oi{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new oi}static exists(t){return new oi(void 0,t)}static updateTime(t){return new oi(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function ai(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class ci{}function ui(t,e){if(!t.hasLocalMutations||e&&0===e.fields.length)return null;if(null===e)return t.isNoDocument()?new wi(t.key,oi.none()):new pi(t.key,t.data,oi.none());{const n=t.data,r=zr.empty();let s=new sr(Fn.comparator);for(let t of e.fields)if(!s.has(t)){let e=n.field(t);null===e&&t.length>1&&(t=t.popLast(),e=n.field(t)),null===e?r.delete(t):r.set(t,e),s=s.add(t)}return new mi(t.key,r,new or(s.toArray()),oi.none())}}function hi(t,e,n){var r;t instanceof pi?function(t,e,n){const r=t.value.clone(),s=yi(t.fieldTransforms,e,n.transformResults);r.setAll(s),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):t instanceof mi?function(t,e,n){if(!ai(t.precondition,e))return void e.convertToUnknownDocument(n.version);const r=yi(t.fieldTransforms,e,n.transformResults),s=e.data;s.setAll(gi(t)),s.setAll(r),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):(r=n,e.convertToNoDocument(r.version).setHasCommittedMutations())}function li(t,e,n,r){return t instanceof pi?function(t,e,n,r){if(!ai(t.precondition,e))return n;const s=t.value.clone(),i=vi(t.fieldTransforms,r,e);return s.setAll(i),e.convertToFoundDocument(e.version,s).setHasLocalMutations(),null}(t,e,n,r):t instanceof mi?function(t,e,n,r){if(!ai(t.precondition,e))return n;const s=vi(t.fieldTransforms,r,e),i=e.data;return i.setAll(gi(t)),i.setAll(s),e.convertToFoundDocument(e.version,i).setHasLocalMutations(),null===n?null:n.unionWith(t.fieldMask.fields).unionWith(t.fieldTransforms.map(t=>t.field))}(t,e,n,r):(s=e,i=n,ai(t.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):i);var s,i}function di(t,e){let n=null;for(const r of t.fieldTransforms){const t=e.data.field(r.field),s=Ws(r.transform,t||null);null!=s&&(null===n&&(n=zr.empty()),n.set(r.field,s))}return n||null}function fi(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&(n=t.fieldTransforms,r=e.fieldTransforms,!!(void 0===n&&void 0===r||n&&r&&kn(n,r,(t,e)=>function(t,e){return t.field.isEqual(e.field)&&(n=t.transform,r=e.transform,n instanceof Xs&&r instanceof Xs||n instanceof Zs&&r instanceof Zs?kn(n.elements,r.elements,kr):n instanceof ei&&r instanceof ei?kr(n.Re,r.Re):n instanceof Ys&&r instanceof Ys);var n,r}(t,e)))&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask)));var n,r}class pi extends ci{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class mi extends ci{constructor(t,e,n,r,s=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function gi(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function yi(t,e,n){const r=new Map;un(t.length===n.length,32656,{Ve:n.length,me:t.length});for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,Qs(o,a,n[s]))}return r}function vi(t,e,n){const r=new Map;for(const s of t){const t=s.transform,i=n.data.field(s.field);r.set(s.field,Hs(t,i,e))}return r}class wi extends ci{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ei extends ci{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
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
 */class bi{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let r=0;r<this.mutations.length;r++){const e=this.mutations[r];e.key.isEqual(t.key)&&hi(e,t,n[r])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=li(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=li(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Vs();return this.mutations.forEach(r=>{const s=t.get(r.key),i=s.overlayedDocument;let o=this.applyToLocalView(i,s.mutatedFields);o=e.has(r.key)?null:o;const a=ui(i,o);null!==a&&n.set(r.key,a),i.isValidDocument()||i.convertToNoDocument(On.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),js())}isEqual(t){return this.batchId===t.batchId&&kn(this.mutations,t.mutations,(t,e)=>fi(t,e))&&kn(this.baseMutations,t.baseMutations,(t,e)=>fi(t,e))}}class Ti{constructor(t,e,n,r){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=r}static from(t,e,n){un(t.mutations.length===n.length,58842,{fe:t.mutations.length,ge:n.length});let r=function(){return Us}();const s=t.mutations;for(let i=0;i<s.length;i++)r=r.insert(s[i].key,n[i].version);return new Ti(t,e,n,r)}}
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
 */class _i{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return null!==t&&this.mutation===t.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
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
 */class Si{constructor(t,e){this.count=t,this.unchangedNames=e}}
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
 */var Ii,Ci;function Ai(t){if(void 0===t)return rn("GRPC error has no .code"),ln.UNKNOWN;switch(t){case Ii.OK:return ln.OK;case Ii.CANCELLED:return ln.CANCELLED;case Ii.UNKNOWN:return ln.UNKNOWN;case Ii.DEADLINE_EXCEEDED:return ln.DEADLINE_EXCEEDED;case Ii.RESOURCE_EXHAUSTED:return ln.RESOURCE_EXHAUSTED;case Ii.INTERNAL:return ln.INTERNAL;case Ii.UNAVAILABLE:return ln.UNAVAILABLE;case Ii.UNAUTHENTICATED:return ln.UNAUTHENTICATED;case Ii.INVALID_ARGUMENT:return ln.INVALID_ARGUMENT;case Ii.NOT_FOUND:return ln.NOT_FOUND;case Ii.ALREADY_EXISTS:return ln.ALREADY_EXISTS;case Ii.PERMISSION_DENIED:return ln.PERMISSION_DENIED;case Ii.FAILED_PRECONDITION:return ln.FAILED_PRECONDITION;case Ii.ABORTED:return ln.ABORTED;case Ii.OUT_OF_RANGE:return ln.OUT_OF_RANGE;case Ii.UNIMPLEMENTED:return ln.UNIMPLEMENTED;case Ii.DATA_LOSS:return ln.DATA_LOSS;default:return an(39323,{code:t})}}(Ci=Ii||(Ii={}))[Ci.OK=0]="OK",Ci[Ci.CANCELLED=1]="CANCELLED",Ci[Ci.UNKNOWN=2]="UNKNOWN",Ci[Ci.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ci[Ci.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ci[Ci.NOT_FOUND=5]="NOT_FOUND",Ci[Ci.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ci[Ci.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ci[Ci.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ci[Ci.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ci[Ci.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ci[Ci.ABORTED=10]="ABORTED",Ci[Ci.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ci[Ci.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ci[Ci.INTERNAL=13]="INTERNAL",Ci[Ci.UNAVAILABLE=14]="UNAVAILABLE",Ci[Ci.DATA_LOSS=15]="DATA_LOSS";
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
const Di=new Fe([4294967295,4294967295],0);function ki(t){const e=_n().encode(t),n=new Ue;return n.update(e),new Uint8Array(n.digest())}function Ni(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Fe([n,r],0),new Fe([s,i],0)]}class Ri{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new xi(`Invalid padding: ${e}`);if(n<0)throw new xi(`Invalid hash count: ${n}`);if(t.length>0&&0===this.hashCount)throw new xi(`Invalid hash count: ${n}`);if(0===t.length&&0!==e)throw new xi(`Invalid padding when bitmap length is 0: ${e}`);this.pe=8*t.length-e,this.ye=Fe.fromNumber(this.pe)}we(t,e,n){let r=t.add(e.multiply(Fe.fromNumber(n)));return 1===r.compare(Di)&&(r=new Fe([r.getBits(0),r.getBits(1)],0)),r.modulo(this.ye).toNumber()}be(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(0===this.pe)return!1;const e=ki(t),[n,r]=Ni(e);for(let s=0;s<this.hashCount;s++){const t=this.we(n,r,s);if(!this.be(t))return!1}return!0}static create(t,e,n){const r=t%8==0?0:8-t%8,s=new Uint8Array(Math.ceil(t/8)),i=new Ri(s,r,e);return n.forEach(t=>i.insert(t)),i}insert(t){if(0===this.pe)return;const e=ki(t),[n,r]=Ni(e);for(let s=0;s<this.hashCount;s++){const t=this.we(n,r,s);this.Se(t)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class xi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
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
 */class Oi{constructor(t,e,n,r,s){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const r=new Map;return r.set(t,Li.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new Oi(On.min(),r,new er(In),xs(),js())}}class Li{constructor(t,e,n,r,s){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Li(n,e,js(),js(),js())}}
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
 */class Mi{constructor(t,e,n,r){this.De=t,this.removedTargetIds=e,this.key=n,this.ve=r}}class Pi{constructor(t,e){this.targetId=t,this.Ce=e}}class Vi{constructor(t,e,n=cr.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=r}}class Fi{constructor(){this.Fe=0,this.Me=ji(),this.xe=cr.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return 0!==this.Fe}get Le(){return this.Ne}ke(t){t.approximateByteSize()>0&&(this.Ne=!0,this.xe=t)}qe(){let t=js(),e=js(),n=js();return this.Me.forEach((r,s)=>{switch(s){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:n=n.add(r);break;default:an(38017,{changeType:s})}}),new Li(this.xe,this.Oe,t,e,n)}Qe(){this.Ne=!1,this.Me=ji()}$e(t,e){this.Ne=!0,this.Me=this.Me.insert(t,e)}Ue(t){this.Ne=!0,this.Me=this.Me.remove(t)}Ke(){this.Fe+=1}We(){this.Fe-=1,un(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class Ui{constructor(t){this.ze=t,this.je=new Map,this.He=xs(),this.Je=Bi(),this.Ye=Bi(),this.Ze=new er(In)}Xe(t){for(const e of t.De)t.ve&&t.ve.isFoundDocument()?this.et(e,t.ve):this.tt(e,t.key,t.ve);for(const e of t.removedTargetIds)this.tt(e,t.key,t.ve)}nt(t){this.forEachTarget(t,e=>{const n=this.rt(e);switch(t.state){case 0:this.it(e)&&n.ke(t.resumeToken);break;case 1:n.We(),n.Be||n.Qe(),n.ke(t.resumeToken);break;case 2:n.We(),n.Be||this.removeTarget(e);break;case 3:this.it(e)&&(n.Ge(),n.ke(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),n.ke(t.resumeToken));break;default:an(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach((t,n)=>{this.it(n)&&e(n)})}ot(t){const e=t.targetId,n=t.Ce.count,r=this._t(e);if(r){const s=r.target;if(ys(s))if(0===n){const t=new Un(s.path);this.tt(e,t,Kr.newNoDocument(t,On.min()))}else un(1===n,20013,{expectedCount:n});else{const r=this.ut(e);if(r!==n){const n=this.ct(t),s=n?this.lt(n,t,r):1;if(0!==s){this.st(e);const t=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,t)}}}}}ct(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:s=0}=e;let i,o;try{i=dr(n).toUint8Array()}catch(a){if(a instanceof ar)return sn("Decoding the base64 bloom filter in existence filter failed ("+a.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw a}try{o=new Ri(i,r,s)}catch(a){return sn(a instanceof xi?"BloomFilter error: ":"Applying bloom filter failed: ",a),null}return 0===o.pe?null:o}lt(t,e,n){return e.Ce.count===n-this.Tt(t,e.targetId)?0:2}Tt(t,e){const n=this.ze.getRemoteKeysForTarget(e);let r=0;return n.forEach(n=>{const s=this.ze.Pt(),i=`projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;t.mightContain(i)||(this.tt(e,n,null),r++)}),r}It(t){const e=new Map;this.je.forEach((n,r)=>{const s=this._t(r);if(s){if(n.current&&ys(s.target)){const e=new Un(s.target.path);this.Et(e).has(r)||this.dt(r,e)||this.tt(r,e,Kr.newNoDocument(e,t))}n.Le&&(e.set(r,n.qe()),n.Qe())}});let n=js();this.Ye.forEach((t,e)=>{let r=!0;e.forEachWhile(t=>{const e=this._t(t);return!e||"TargetPurposeLimboResolution"===e.purpose||(r=!1,!1)}),r&&(n=n.add(t))}),this.He.forEach((e,n)=>n.setReadTime(t));const r=new Oi(t,e,this.Ze,this.He,n);return this.He=xs(),this.Je=Bi(),this.Ye=Bi(),this.Ze=new er(In),r}et(t,e){if(!this.it(t))return;const n=this.dt(t,e.key)?2:0;this.rt(t).$e(e.key,n),this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.Ye=this.Ye.insert(e.key,this.At(e.key).add(t))}tt(t,e,n){if(!this.it(t))return;const r=this.rt(t);this.dt(t,e)?r.$e(e,1):r.Ue(e),this.Ye=this.Ye.insert(e,this.At(e).delete(t)),this.Ye=this.Ye.insert(e,this.At(e).add(t)),n&&(this.He=this.He.insert(e,n))}removeTarget(t){this.je.delete(t)}ut(t){const e=this.rt(t).qe();return this.ze.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ke(t){this.rt(t).Ke()}rt(t){let e=this.je.get(t);return e||(e=new Fi,this.je.set(t,e)),e}At(t){let e=this.Ye.get(t);return e||(e=new sr(In),this.Ye=this.Ye.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new sr(In),this.Je=this.Je.insert(t,e)),e}it(t){const e=null!==this._t(t);return e||nn("WatchChangeAggregator","Detected inactive target",t),e}_t(t){const e=this.je.get(t);return e&&e.Be?null:this.ze.Rt(t)}st(t){this.je.set(t,new Fi),this.ze.getRemoteKeysForTarget(t).forEach(e=>{this.tt(t,e,null)})}dt(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function Bi(){return new er(Un.comparator)}function ji(){return new er(Un.comparator)}const $i=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),zi=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),qi=(()=>({and:"AND",or:"OR"}))();class Ki{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Gi(t,e){return t.useProto3Json||Qn(e)?e:{value:e}}function Hi(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Qi(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Wi(t,e){return Hi(t,e.toTimestamp())}function Yi(t){return un(!!t,49232),On.fromTimestamp(function(t){const e=hr(t);return new xn(e.seconds,e.nanos)}(t))}function Xi(t,e){return Ji(t,e).canonicalString()}function Ji(t,e){const n=(r=t,new Pn(["projects",r.projectId,"databases",r.database])).child("documents");var r;return void 0===e?n:n.child(e)}function Zi(t){const e=Pn.fromString(t);return un(vo(e),10190,{key:e.toString()}),e}function to(t,e){return Xi(t.databaseId,e.path)}function eo(t,e){const n=Zi(e);if(n.get(1)!==t.databaseId.projectId)throw new dn(ln.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new dn(ln.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Un(so(n))}function no(t,e){return Xi(t.databaseId,e)}function ro(t){return new Pn(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function so(t){return un(t.length>4&&"documents"===t.get(4),29091,{key:t.toString()}),t.popFirst(5)}function io(t,e,n){return{name:to(t,e),fields:n.value.mapValue.fields}}function oo(t,e){return{documents:[no(t,e.path)]}}function ao(t,e){const n={structuredQuery:{}},r=e.path;let s;null!==e.collectionGroup?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=no(t,s);const i=function(t){if(0!==t.length)return go(Zr.create(t,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(t){if(0!==t.length)return t.map(t=>{return{field:po((e=t).field),direction:ho(e.dir)};var e})}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Gi(t,e.limit);return null!==a&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt={before:(c=e.startAt).inclusive,values:c.position}),e.endAt&&(n.structuredQuery.endAt=function(t){return{before:!t.inclusive,values:t.position}}(e.endAt)),{gt:n,parent:s};var c}function co(t){let e=function(t){const e=Zi(t);return 4===e.length?Pn.emptyPath():so(e)}(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){un(1===r,65062);const t=n.from[0];t.allDescendants?s=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=function(t){const e=uo(t);return e instanceof Zr&&es(e)?e.getFilters():[e]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(t=>{return new Wr(mo((e=t).field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction));var e}));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,Qn(e)?null:e}(n.limit));let c=null;n.startAt&&(c=function(t){const e=!!t.before,n=t.values||[];return new Gr(n,e)}(n.startAt));let u=null;return n.endAt&&(u=function(t){const e=!t.before,n=t.values||[];return new Gr(n,e)}(n.endAt)),function(t,e,n,r,s,i,o,a){return new vs(t,e,n,r,s,i,o,a)}(e,s,o,i,a,"F",c,u)}function uo(t){return void 0!==t.unaryFilter?function(t){switch(t.unaryFilter.op){case"IS_NAN":const e=mo(t.unaryFilter.field);return Jr.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=mo(t.unaryFilter.field);return Jr.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=mo(t.unaryFilter.field);return Jr.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=mo(t.unaryFilter.field);return Jr.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return an(61313);default:return an(60726)}}(t):void 0!==t.fieldFilter?(e=t,Jr.create(mo(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return an(58110);default:return an(50506)}}(e.fieldFilter.op),e.fieldFilter.value)):void 0!==t.compositeFilter?function(t){return Zr.create(t.compositeFilter.filters.map(t=>uo(t)),function(t){switch(t){case"AND":return"and";case"OR":return"or";default:return an(1026)}}(t.compositeFilter.op))}(t):an(30097,{filter:t});var e}function ho(t){return $i[t]}function lo(t){return zi[t]}function fo(t){return qi[t]}function po(t){return{fieldPath:t.canonicalString()}}function mo(t){return Fn.fromServerFormat(t.fieldPath)}function go(t){return t instanceof Jr?function(t){if("=="===t.op){if(Br(t.value))return{unaryFilter:{field:po(t.field),op:"IS_NAN"}};if(Ur(t.value))return{unaryFilter:{field:po(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(Br(t.value))return{unaryFilter:{field:po(t.field),op:"IS_NOT_NAN"}};if(Ur(t.value))return{unaryFilter:{field:po(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:po(t.field),op:lo(t.op),value:t.value}}}(t):t instanceof Zr?function(t){const e=t.getFilters().map(t=>go(t));return 1===e.length?e[0]:{compositeFilter:{op:fo(t.op),filters:e}}}(t):an(54877,{filter:t})}function yo(t){const e=[];return t.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function vo(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
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
 */class wo{constructor(t,e,n,r,s=On.min(),i=On.min(),o=cr.EMPTY_BYTE_STRING,a=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(t){return new wo(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new wo(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new wo(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new wo(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}
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
 */class Eo{constructor(t){this.wt=t}}function bo(t){const e=co({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?_s(e,e.limit,"L"):e}
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
 */class To{constructor(){this.yn=new _o}addToCollectionParentIndex(t,e){return this.yn.add(e),Kn.resolve()}getCollectionParents(t,e){return Kn.resolve(this.yn.getEntries(e))}addFieldIndex(t,e){return Kn.resolve()}deleteFieldIndex(t,e){return Kn.resolve()}deleteAllFieldIndexes(t){return Kn.resolve()}createTargetIndexes(t,e){return Kn.resolve()}getDocumentsMatchingTarget(t,e){return Kn.resolve(null)}getIndexType(t,e){return Kn.resolve(0)}getFieldIndexes(t,e){return Kn.resolve([])}getNextCollectionGroupToUpdate(t){return Kn.resolve(null)}getMinOffset(t,e){return Kn.resolve(jn.min())}getMinOffsetFromCollectionGroup(t,e){return Kn.resolve(jn.min())}updateCollectionGroup(t,e,n){return Kn.resolve()}updateIndexEntries(t,e){return Kn.resolve()}}class _o{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e]||new sr(Pn.comparator),s=!r.has(n);return this.index[e]=r.add(n),s}has(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e];return r&&r.has(n)}getEntries(t){return(this.index[t]||new sr(Pn.comparator)).toArray()}}
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
 */const So={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Io=41943040;class Co{static withCacheSize(t){return new Co(t,Co.DEFAULT_COLLECTION_PERCENTILE,Co.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}
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
 */Co.DEFAULT_COLLECTION_PERCENTILE=10,Co.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Co.DEFAULT=new Co(Io,Co.DEFAULT_COLLECTION_PERCENTILE,Co.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Co.DISABLED=new Co(-1,0,0);
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
class Ao{constructor(t){this.nr=t}next(){return this.nr+=2,this.nr}static rr(){return new Ao(0)}static ir(){return new Ao(-1)}}
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
 */const Do="LruGarbageCollector";function ko([t,e],[n,r]){const s=In(t,n);return 0===s?In(e,r):s}class No{constructor(t){this.cr=t,this.buffer=new sr(ko),this.lr=0}hr(){return++this.lr}Pr(t){const e=[t,this.hr()];if(this.buffer.size<this.cr)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();ko(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Ro{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Tr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Ir(6e4)}stop(){this.Tr&&(this.Tr.cancel(),this.Tr=null)}get started(){return null!==this.Tr}Ir(t){nn(Do,`Garbage collection scheduled in ${t}ms`),this.Tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Gn(t)?nn(Do,"Ignoring IndexedDB error during garbage collection: ",t):await qn(t)}await this.Ir(3e5)})}}class xo{constructor(t,e){this.Er=t,this.params=e}calculateTargetCount(t,e){return this.Er.dr(t).next(t=>Math.floor(e/100*t))}nthSequenceNumber(t,e){if(0===e)return Kn.resolve(Hn.le);const n=new No(e);return this.Er.forEachTarget(t,t=>n.Pr(t.sequenceNumber)).next(()=>this.Er.Ar(t,t=>n.Pr(t))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Er.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Er.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(nn("LruGarbageCollector","Garbage collection skipped; disabled"),Kn.resolve(So)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(nn("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),So):this.Rr(t,e))}getCacheSize(t){return this.Er.getCacheSize(t)}Rr(t,e){let n,r,s,i,o,a,c;const u=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(e=>(e>this.params.maximumSequenceNumbersToCollect?(nn("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),r=this.params.maximumSequenceNumbersToCollect):r=e,i=Date.now(),this.nthSequenceNumber(t,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(t,n,e))).next(e=>(s=e,a=Date.now(),this.removeOrphanedDocuments(t,n))).next(t=>(c=Date.now(),en()<=vt.DEBUG&&nn("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-u}ms\n\tDetermined least recently used ${r} in `+(o-i)+`ms\n\tRemoved ${s} targets in `+(a-o)+`ms\n\tRemoved ${t} documents in `+(c-a)+`ms\nTotal Duration: ${c-u}ms`),Kn.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:t})))}}
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
class Oo{constructor(){this.changes=new Ns(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Kr.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?Kn.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
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
 */class Lo{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}
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
 */class Mo{constructor(t,e,n,r){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=r}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(r=>(n=r,this.remoteDocumentCache.getEntry(t,e))).next(t=>(null!==n&&li(n.mutation,t,or.empty(),xn.now()),t))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.getLocalViewOfDocuments(t,e,js()).next(()=>e))}getLocalViewOfDocuments(t,e,n=js()){const r=Ps();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,n).next(t=>{let e=Ls();return t.forEach((t,n)=>{e=e.insert(t,n.overlayedDocument)}),e}))}getOverlayedDocuments(t,e){const n=Ps();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,js()))}populateOverlays(t,e,n){const r=[];return n.forEach(t=>{e.has(t)||r.push(t)}),this.documentOverlayCache.getOverlays(t,r).next(t=>{t.forEach((t,n)=>{e.set(t,n)})})}computeViews(t,e,n,r){let s=xs();const i=Fs(),o=Fs();return e.forEach((t,e)=>{const o=n.get(e.key);r.has(e.key)&&(void 0===o||o.mutation instanceof mi)?s=s.insert(e.key,e):void 0!==o?(i.set(e.key,o.mutation.getFieldMask()),li(o.mutation,e,o.mutation.getFieldMask(),xn.now())):i.set(e.key,or.empty())}),this.recalculateAndSaveOverlays(t,s).next(t=>(t.forEach((t,e)=>i.set(t,e)),e.forEach((t,e)=>{var n;return o.set(t,new Lo(e,null!==(n=i.get(t))&&void 0!==n?n:null))}),o))}recalculateAndSaveOverlays(t,e){const n=Fs();let r=new er((t,e)=>t-e),s=js();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(t=>{for(const s of t)s.keys().forEach(t=>{const i=e.get(t);if(null===i)return;let o=n.get(t)||or.empty();o=s.applyToLocalView(i,o),n.set(t,o);const a=(r.get(s.batchId)||js()).add(t);r=r.insert(s.batchId,a)})}).next(()=>{const i=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,u=Vs();c.forEach(t=>{if(!s.has(t)){const r=ui(e.get(t),n.get(t));null!==r&&u.set(t,r),s=s.add(t)}}),i.push(this.documentOverlayCache.saveOverlays(t,a,u))}return Kn.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.recalculateAndSaveOverlays(t,e))}getDocumentsMatchingQuery(t,e,n,r){return s=e,Un.isDocumentKey(s.path)&&null===s.collectionGroup&&0===s.filters.length?this.getDocumentsMatchingDocumentQuery(t,e.path):function(t){return null!==t.collectionGroup}(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,r):this.getDocumentsMatchingCollectionQuery(t,e,n,r);var s}getNextDocuments(t,e,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,r).next(s=>{const i=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,r-s.size):Kn.resolve(Ps());let o=-1,a=s;return i.next(e=>Kn.forEach(e,(e,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),s.get(e)?Kn.resolve():this.remoteDocumentCache.getEntry(t,e).next(t=>{a=a.insert(e,t)}))).next(()=>this.populateOverlays(t,e,s)).next(()=>this.computeViews(t,a,e,js())).next(t=>({batchId:o,changes:Ms(t)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new Un(e)).next(t=>{let e=Ls();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e})}getDocumentsMatchingCollectionGroupQuery(t,e,n,r){const s=e.collectionGroup;let i=Ls();return this.indexManager.getCollectionParents(t,s).next(o=>Kn.forEach(o,o=>{const a=(c=e,u=o.child(s),new vs(u,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt));var c,u;return this.getDocumentsMatchingCollectionQuery(t,a,n,r).next(t=>{t.forEach((t,e)=>{i=i.insert(t,e)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(t,e,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,s,r))).next(t=>{s.forEach((e,n)=>{const r=n.getKey();null===t.get(r)&&(t=t.insert(r,Kr.newInvalidDocument(r)))});let n=Ls();return t.forEach((t,r)=>{const i=s.get(t);void 0!==i&&li(i.mutation,r,or.empty(),xn.now()),As(e,r)&&(n=n.insert(t,r))}),n})}}
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
 */class Po{constructor(t){this.serializer=t,this.Fr=new Map,this.Mr=new Map}getBundleMetadata(t,e){return Kn.resolve(this.Fr.get(e))}saveBundleMetadata(t,e){return this.Fr.set(e.id,{id:(n=e).id,version:n.version,createTime:Yi(n.createTime)}),Kn.resolve();var n}getNamedQuery(t,e){return Kn.resolve(this.Mr.get(e))}saveNamedQuery(t,e){return this.Mr.set(e.name,{name:(n=e).name,query:bo(n.bundledQuery),readTime:Yi(n.readTime)}),Kn.resolve();var n}}
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
 */class Vo{constructor(){this.overlays=new er(Un.comparator),this.Or=new Map}getOverlay(t,e){return Kn.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Ps();return Kn.forEach(e,e=>this.getOverlay(t,e).next(t=>{null!==t&&n.set(e,t)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((n,r)=>{this.St(t,e,r)}),Kn.resolve()}removeOverlaysForBatchId(t,e,n){const r=this.Or.get(n);return void 0!==r&&(r.forEach(t=>this.overlays=this.overlays.remove(t)),this.Or.delete(n)),Kn.resolve()}getOverlaysForCollection(t,e,n){const r=Ps(),s=e.length+1,i=new Un(e.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const t=o.getNext().value,i=t.getKey();if(!e.isPrefixOf(i.path))break;i.path.length===s&&t.largestBatchId>n&&r.set(t.getKey(),t)}return Kn.resolve(r)}getOverlaysForCollectionGroup(t,e,n,r){let s=new er((t,e)=>t-e);const i=this.overlays.getIterator();for(;i.hasNext();){const t=i.getNext().value;if(t.getKey().getCollectionGroup()===e&&t.largestBatchId>n){let e=s.get(t.largestBatchId);null===e&&(e=Ps(),s=s.insert(t.largestBatchId,e)),e.set(t.getKey(),t)}}const o=Ps(),a=s.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((t,e)=>o.set(t,e)),!(o.size()>=r)););return Kn.resolve(o)}St(t,e,n){const r=this.overlays.get(n.key);if(null!==r){const t=this.Or.get(r.largestBatchId).delete(n.key);this.Or.set(r.largestBatchId,t)}this.overlays=this.overlays.insert(n.key,new _i(e,n));let s=this.Or.get(e);void 0===s&&(s=js(),this.Or.set(e,s)),this.Or.set(e,s.add(n.key))}}
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
 */class Fo{constructor(){this.sessionToken=cr.EMPTY_BYTE_STRING}getSessionToken(t){return Kn.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,Kn.resolve()}}
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
 */class Uo{constructor(){this.Nr=new sr(Bo.Br),this.Lr=new sr(Bo.kr)}isEmpty(){return this.Nr.isEmpty()}addReference(t,e){const n=new Bo(t,e);this.Nr=this.Nr.add(n),this.Lr=this.Lr.add(n)}qr(t,e){t.forEach(t=>this.addReference(t,e))}removeReference(t,e){this.Qr(new Bo(t,e))}$r(t,e){t.forEach(t=>this.removeReference(t,e))}Ur(t){const e=new Un(new Pn([])),n=new Bo(e,t),r=new Bo(e,t+1),s=[];return this.Lr.forEachInRange([n,r],t=>{this.Qr(t),s.push(t.key)}),s}Kr(){this.Nr.forEach(t=>this.Qr(t))}Qr(t){this.Nr=this.Nr.delete(t),this.Lr=this.Lr.delete(t)}Wr(t){const e=new Un(new Pn([])),n=new Bo(e,t),r=new Bo(e,t+1);let s=js();return this.Lr.forEachInRange([n,r],t=>{s=s.add(t.key)}),s}containsKey(t){const e=new Bo(t,0),n=this.Nr.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class Bo{constructor(t,e){this.key=t,this.Gr=e}static Br(t,e){return Un.comparator(t.key,e.key)||In(t.Gr,e.Gr)}static kr(t,e){return In(t.Gr,e.Gr)||Un.comparator(t.key,e.key)}}
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
 */class jo{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Jn=1,this.zr=new sr(Bo.Br)}checkEmpty(t){return Kn.resolve(0===this.mutationQueue.length)}addMutationBatch(t,e,n,r){const s=this.Jn;this.Jn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new bi(s,e,n,r);this.mutationQueue.push(i);for(const o of r)this.zr=this.zr.add(new Bo(o.key,s)),this.indexManager.addToCollectionParentIndex(t,o.key.path.popLast());return Kn.resolve(i)}lookupMutationBatch(t,e){return Kn.resolve(this.jr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=this.Hr(n),s=r<0?0:r;return Kn.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return Kn.resolve(0===this.mutationQueue.length?-1:this.Jn-1)}getAllMutationBatches(t){return Kn.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new Bo(e,0),r=new Bo(e,Number.POSITIVE_INFINITY),s=[];return this.zr.forEachInRange([n,r],t=>{const e=this.jr(t.Gr);s.push(e)}),Kn.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new sr(In);return e.forEach(t=>{const e=new Bo(t,0),r=new Bo(t,Number.POSITIVE_INFINITY);this.zr.forEachInRange([e,r],t=>{n=n.add(t.Gr)})}),Kn.resolve(this.Jr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1;let s=n;Un.isDocumentKey(s)||(s=s.child(""));const i=new Bo(new Un(s),0);let o=new sr(In);return this.zr.forEachWhile(t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===r&&(o=o.add(t.Gr)),!0)},i),Kn.resolve(this.Jr(o))}Jr(t){const e=[];return t.forEach(t=>{const n=this.jr(t);null!==n&&e.push(n)}),e}removeMutationBatch(t,e){un(0===this.Yr(e.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.zr;return Kn.forEach(e.mutations,r=>{const s=new Bo(r.key,e.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)}).next(()=>{this.zr=n})}Xn(t){}containsKey(t,e){const n=new Bo(e,0),r=this.zr.firstAfterOrEqual(n);return Kn.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this.mutationQueue.length,Kn.resolve()}Yr(t,e){return this.Hr(t)}Hr(t){return 0===this.mutationQueue.length?0:t-this.mutationQueue[0].batchId}jr(t){const e=this.Hr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}
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
 */class $o{constructor(t){this.Zr=t,this.docs=new er(Un.comparator),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,r=this.docs.get(n),s=r?r.size:0,i=this.Zr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return Kn.resolve(n?n.document.mutableCopy():Kr.newInvalidDocument(e))}getEntries(t,e){let n=xs();return e.forEach(t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.mutableCopy():Kr.newInvalidDocument(t))}),Kn.resolve(n)}getDocumentsMatchingQuery(t,e,n,r){let s=xs();const i=e.path,o=new Un(i.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:t,value:{document:o}}=a.getNext();if(!i.isPrefixOf(t.path))break;t.path.length>i.length+1||$n(Bn(o),n)<=0||(r.has(o.key)||As(e,o))&&(s=s.insert(o.key,o.mutableCopy()))}return Kn.resolve(s)}getAllFromCollectionGroup(t,e,n,r){an(9500)}Xr(t,e){return Kn.forEach(this.docs,t=>e(t))}newChangeBuffer(t){return new zo(this)}getSize(t){return Kn.resolve(this.size)}}class zo extends Oo{constructor(t){super(),this.vr=t}applyChanges(t){const e=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?e.push(this.vr.addEntry(t,r)):this.vr.removeEntry(n)}),Kn.waitFor(e)}getFromCache(t,e){return this.vr.getEntry(t,e)}getAllFromCache(t,e){return this.vr.getEntries(t,e)}}
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
 */class qo{constructor(t){this.persistence=t,this.ei=new Ns(t=>ms(t),gs),this.lastRemoteSnapshotVersion=On.min(),this.highestTargetId=0,this.ti=0,this.ni=new Uo,this.targetCount=0,this.ri=Ao.rr()}forEachTarget(t,e){return this.ei.forEach((t,n)=>e(n)),Kn.resolve()}getLastRemoteSnapshotVersion(t){return Kn.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return Kn.resolve(this.ti)}allocateTargetId(t){return this.highestTargetId=this.ri.next(),Kn.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ti&&(this.ti=e),Kn.resolve()}ar(t){this.ei.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ri=new Ao(e),this.highestTargetId=e),t.sequenceNumber>this.ti&&(this.ti=t.sequenceNumber)}addTargetData(t,e){return this.ar(e),this.targetCount+=1,Kn.resolve()}updateTargetData(t,e){return this.ar(e),Kn.resolve()}removeTargetData(t,e){return this.ei.delete(e.target),this.ni.Ur(e.targetId),this.targetCount-=1,Kn.resolve()}removeTargets(t,e,n){let r=0;const s=[];return this.ei.forEach((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.ei.delete(i),s.push(this.removeMatchingKeysForTargetId(t,o.targetId)),r++)}),Kn.waitFor(s).next(()=>r)}getTargetCount(t){return Kn.resolve(this.targetCount)}getTargetData(t,e){const n=this.ei.get(e)||null;return Kn.resolve(n)}addMatchingKeys(t,e,n){return this.ni.qr(e,n),Kn.resolve()}removeMatchingKeys(t,e,n){this.ni.$r(e,n);const r=this.persistence.referenceDelegate,s=[];return r&&e.forEach(e=>{s.push(r.markPotentiallyOrphaned(t,e))}),Kn.waitFor(s)}removeMatchingKeysForTargetId(t,e){return this.ni.Ur(e),Kn.resolve()}getMatchingKeysForTargetId(t,e){const n=this.ni.Wr(e);return Kn.resolve(n)}containsKey(t,e){return Kn.resolve(this.ni.containsKey(e))}}
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
 */class Ko{constructor(t,e){this.ii={},this.overlays={},this.si=new Hn(0),this.oi=!1,this.oi=!0,this._i=new Fo,this.referenceDelegate=t(this),this.ai=new qo(this),this.indexManager=new To,this.remoteDocumentCache=new $o(t=>this.referenceDelegate.ui(t)),this.serializer=new Eo(e),this.ci=new Po(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.oi=!1,Promise.resolve()}get started(){return this.oi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Vo,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ii[t.toKey()];return n||(n=new jo(e,this.referenceDelegate),this.ii[t.toKey()]=n),n}getGlobalsCache(){return this._i}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.ci}runTransaction(t,e,n){nn("MemoryPersistence","Starting transaction:",t);const r=new Go(this.si.next());return this.referenceDelegate.li(),n(r).next(t=>this.referenceDelegate.hi(r).next(()=>t)).toPromise().then(t=>(r.raiseOnCommittedEvent(),t))}Pi(t,e){return Kn.or(Object.values(this.ii).map(n=>()=>n.containsKey(t,e)))}}class Go extends zn{constructor(t){super(),this.currentSequenceNumber=t}}class Ho{constructor(t){this.persistence=t,this.Ti=new Uo,this.Ii=null}static Ei(t){return new Ho(t)}get di(){if(this.Ii)return this.Ii;throw an(60996)}addReference(t,e,n){return this.Ti.addReference(n,e),this.di.delete(n.toString()),Kn.resolve()}removeReference(t,e,n){return this.Ti.removeReference(n,e),this.di.add(n.toString()),Kn.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),Kn.resolve()}removeTarget(t,e){this.Ti.Ur(e.targetId).forEach(t=>this.di.add(t.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(t=>{t.forEach(t=>this.di.add(t.toString()))}).next(()=>n.removeTargetData(t,e))}li(){this.Ii=new Set}hi(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Kn.forEach(this.di,n=>{const r=Un.fromPath(n);return this.Ai(t,r).next(t=>{t||e.removeEntry(r,On.min())})}).next(()=>(this.Ii=null,e.apply(t)))}updateLimboDocument(t,e){return this.Ai(t,e).next(t=>{t?this.di.delete(e.toString()):this.di.add(e.toString())})}ui(t){return 0}Ai(t,e){return Kn.or([()=>Kn.resolve(this.Ti.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Pi(t,e)])}}class Qo{constructor(t,e){this.persistence=t,this.Ri=new Ns(t=>function(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Xn(e)),e=Yn(t.get(n),e);return Xn(e)}(t.path),(t,e)=>t.isEqual(e)),this.garbageCollector=function(t,e){return new xo(t,e)}(this,e)}static Ei(t,e){return new Qo(t,e)}li(){}hi(t){return Kn.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.Vr(t);return this.persistence.getTargetCache().getTargetCount(t).next(t=>e.next(e=>t+e))}Vr(t){let e=0;return this.Ar(t,t=>{e++}).next(()=>e)}Ar(t,e){return Kn.forEach(this.Ri,(n,r)=>this.gr(t,n,r).next(t=>t?Kn.resolve():e(r)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.Xr(t,r=>this.gr(t,r,e).next(t=>{t||(n++,s.removeEntry(r,On.min()))})).next(()=>s.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.Ri.set(e,t.currentSequenceNumber),Kn.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.Ri.set(n,t.currentSequenceNumber),Kn.resolve()}removeReference(t,e,n){return this.Ri.set(n,t.currentSequenceNumber),Kn.resolve()}updateLimboDocument(t,e){return this.Ri.set(e,t.currentSequenceNumber),Kn.resolve()}ui(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Pr(t.data.value)),e}gr(t,e,n){return Kn.or([()=>this.persistence.Pi(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const t=this.Ri.get(e);return Kn.resolve(void 0!==t&&t>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}
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
 */class Wo{constructor(t,e,n,r){this.targetId=t,this.fromCache=e,this.ls=n,this.hs=r}static Ps(t,e){let n=js(),r=js();for(const s of e.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:r=r.add(s.doc.key)}return new Wo(t,e.fromCache,n,r)}}
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
 */class Yo{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}
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
 */class Xo{constructor(){this.Ts=!1,this.Is=!1,this.Es=100,this.ds=at()?8:function(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}("undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:"")>0?6:4}initialize(t,e){this.As=t,this.indexManager=e,this.Ts=!0}getDocumentsMatchingQuery(t,e,n,r){const s={result:null};return this.Rs(t,e).next(t=>{s.result=t}).next(()=>{if(!s.result)return this.Vs(t,e,r,n).next(t=>{s.result=t})}).next(()=>{if(s.result)return;const n=new Yo;return this.fs(t,e,n).next(r=>{if(s.result=r,this.Is)return this.gs(t,e,n,r.size)})}).next(()=>s.result)}gs(t,e,n,r){return n.documentReadCount<this.Es?(en()<=vt.DEBUG&&nn("QueryEngine","SDK will not create cache indexes for query:",Cs(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Es,"documents"),Kn.resolve()):(en()<=vt.DEBUG&&nn("QueryEngine","Query:",Cs(e),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.ds*r?(en()<=vt.DEBUG&&nn("QueryEngine","The SDK decides to create cache indexes for query:",Cs(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Ts(e))):Kn.resolve())}Rs(t,e){if(Es(e))return Kn.resolve(null);let n=Ts(e);return this.indexManager.getIndexType(t,n).next(r=>0===r?null:(null!==e.limit&&1===r&&(e=_s(e,null,"F"),n=Ts(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(r=>{const s=js(...r);return this.As.getDocuments(t,s).next(r=>this.indexManager.getMinOffset(t,n).next(n=>{const i=this.ps(e,r);return this.ys(e,i,s,n.readTime)?this.Rs(t,_s(e,null,"F")):this.ws(t,i,e,n)}))})))}Vs(t,e,n,r){return Es(e)||r.isEqual(On.min())?Kn.resolve(null):this.As.getDocuments(t,n).next(s=>{const i=this.ps(e,s);return this.ys(e,i,n,r)?Kn.resolve(null):(en()<=vt.DEBUG&&nn("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Cs(e)),this.ws(t,i,e,function(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=On.fromTimestamp(1e9===r?new xn(n+1,0):new xn(n,r));return new jn(s,Un.empty(),e)}(r,-1)).next(t=>t))})}ps(t,e){let n=new sr(Ds(t));return e.forEach((e,r)=>{As(t,r)&&(n=n.add(r))}),n}ys(t,e,n,r){if(null===t.limit)return!1;if(n.size!==e.size)return!0;const s="F"===t.limitType?e.last():e.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}fs(t,e,n){return en()<=vt.DEBUG&&nn("QueryEngine","Using full collection scan to execute query:",Cs(e)),this.As.getDocumentsMatchingQuery(t,e,jn.min(),n)}ws(t,e,n,r){return this.As.getDocumentsMatchingQuery(t,n,r).next(t=>(e.forEach(e=>{t=t.insert(e.key,e)}),t))}}
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
 */const Jo="LocalStore";class Zo{constructor(t,e,n,r){this.persistence=t,this.bs=e,this.serializer=r,this.Ss=new er(In),this.Ds=new Ns(t=>ms(t),gs),this.vs=new Map,this.Cs=t.getRemoteDocumentCache(),this.ai=t.getTargetCache(),this.ci=t.getBundleCache(),this.Fs(n)}Fs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Mo(this.Cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Cs.setIndexManager(this.indexManager),this.bs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Ss))}}async function ta(t,e){const n=hn(t);return await n.persistence.runTransaction("Handle user change","readonly",t=>{let r;return n.mutationQueue.getAllMutationBatches(t).next(s=>(r=s,n.Fs(e),n.mutationQueue.getAllMutationBatches(t))).next(e=>{const s=[],i=[];let o=js();for(const t of r){s.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){i.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return n.localDocuments.getDocuments(t,o).next(t=>({Ms:t,removedBatchIds:s,addedBatchIds:i}))})})}function ea(t){const e=hn(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.ai.getLastRemoteSnapshotVersion(t))}function na(t,e){const n=hn(t),r=e.snapshotVersion;let s=n.Ss;return n.persistence.runTransaction("Apply remote event","readwrite-primary",t=>{const i=n.Cs.newChangeBuffer({trackRemovals:!0});s=n.Ss;const o=[];e.targetChanges.forEach((i,a)=>{const c=s.get(a);if(!c)return;o.push(n.ai.removeMatchingKeys(t,i.removedDocuments,a).next(()=>n.ai.addMatchingKeys(t,i.addedDocuments,a)));let u=c.withSequenceNumber(t.currentSequenceNumber);null!==e.targetMismatches.get(a)?u=u.withResumeToken(cr.EMPTY_BYTE_STRING,On.min()).withLastLimboFreeSnapshotVersion(On.min()):i.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(i.resumeToken,r)),s=s.insert(a,u),function(t,e,n){if(0===t.resumeToken.approximateByteSize())return!0;if(e.snapshotVersion.toMicroseconds()-t.snapshotVersion.toMicroseconds()>=3e8)return!0;return n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(c,u,i)&&o.push(n.ai.updateTargetData(t,u))});let a=xs(),c=js();if(e.documentUpdates.forEach(r=>{e.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,r))}),o.push(function(t,e,n){let r=js(),s=js();return n.forEach(t=>r=r.add(t)),e.getEntries(t,r).next(t=>{let r=xs();return n.forEach((n,i)=>{const o=t.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(s=s.add(n)),i.isNoDocument()&&i.version.isEqual(On.min())?(e.removeEntry(n,i.readTime),r=r.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(e.addEntry(i),r=r.insert(n,i)):nn(Jo,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)}),{xs:r,Os:s}})}(t,i,e.documentUpdates).next(t=>{a=t.xs,c=t.Os})),!r.isEqual(On.min())){const e=n.ai.getLastRemoteSnapshotVersion(t).next(e=>n.ai.setTargetsMetadata(t,t.currentSequenceNumber,r));o.push(e)}return Kn.waitFor(o).next(()=>i.apply(t)).next(()=>n.localDocuments.getLocalViewOfDocuments(t,a,c)).next(()=>a)}).then(t=>(n.Ss=s,t))}function ra(t,e){const n=hn(t);return n.persistence.runTransaction("Get next mutation batch","readonly",t=>(void 0===e&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(t,e)))}async function sa(t,e,n){const r=hn(t),s=r.Ss.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,t=>r.persistence.referenceDelegate.removeTarget(t,s))}catch(o){if(!Gn(o))throw o;nn(Jo,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ss=r.Ss.remove(e),r.Ds.delete(s.target)}function ia(t,e,n){const r=hn(t);let s=On.min(),i=js();return r.persistence.runTransaction("Execute query","readwrite",t=>function(t,e,n){const r=hn(t),s=r.Ds.get(n);return void 0!==s?Kn.resolve(r.Ss.get(s)):r.ai.getTargetData(e,n)}(r,t,Ts(e)).next(e=>{if(e)return s=e.lastLimboFreeSnapshotVersion,r.ai.getMatchingKeysForTargetId(t,e.targetId).next(t=>{i=t})}).next(()=>r.bs.getDocumentsMatchingQuery(t,e,n?s:On.min(),n?i:js())).next(t=>(function(t,e,n){let r=t.vs.get(e)||On.min();n.forEach((t,e)=>{e.readTime.compareTo(r)>0&&(r=e.readTime)}),t.vs.set(e,r)}(r,function(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}(e),t),{documents:t,Ns:i})))}class oa{constructor(){this.activeTargetIds=$s}$s(t){this.activeTargetIds=this.activeTargetIds.add(t)}Us(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Qs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class aa{constructor(){this.So=new oa,this.Do={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.So.$s(t),this.Do[t]||"not-current"}updateQueryState(t,e,n){this.Do[t]=e}removeLocalQueryTarget(t){this.So.Us(t)}isLocalQueryTarget(t){return this.So.activeTargetIds.has(t)}clearQueryState(t){delete this.Do[t]}getAllActiveQueryTargets(){return this.So.activeTargetIds}isActiveQueryTarget(t){return this.So.activeTargetIds.has(t)}start(){return this.So=new oa,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}
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
 */class ca{vo(t){}shutdown(){}}
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
 */const ua="ConnectivityMonitor";class ha{constructor(){this.Co=()=>this.Fo(),this.Mo=()=>this.xo(),this.Oo=[],this.No()}vo(t){this.Oo.push(t)}shutdown(){window.removeEventListener("online",this.Co),window.removeEventListener("offline",this.Mo)}No(){window.addEventListener("online",this.Co),window.addEventListener("offline",this.Mo)}Fo(){nn(ua,"Network connectivity changed: AVAILABLE");for(const t of this.Oo)t(0)}xo(){nn(ua,"Network connectivity changed: UNAVAILABLE");for(const t of this.Oo)t(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
 */let la=null;function da(){return null===la?la=268435456+Math.round(2147483648*Math.random()):la++,"0x"+la.toString(16)
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
 */}const fa="RestConnection",pa={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class ma{get Bo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Lo=e+"://"+t.host,this.ko=`projects/${n}/databases/${r}`,this.qo=this.databaseId.database===br?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Qo(t,e,n,r,s){const i=da(),o=this.$o(t,e.toUriEncodedString());nn(fa,`Sending RPC '${t}' ${i}:`,o,n);const a={"google-cloud-resource-prefix":this.ko,"x-goog-request-params":this.qo};return this.Uo(a,r,s),this.Ko(t,o,a,n).then(e=>(nn(fa,`Received RPC '${t}' ${i}: `,e),e),e=>{throw sn(fa,`RPC '${t}' ${i} failed with error: `,e,"url: ",o,"request:",n),e})}Wo(t,e,n,r,s,i){return this.Qo(t,e,n,r,s)}Uo(t,e,n){t["X-Goog-Api-Client"]="gl-js/ fire/"+Ze,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((e,n)=>t[n]=e),n&&n.headers.forEach((e,n)=>t[n]=e)}$o(t,e){const n=pa[t];return`${this.Lo}/v1/${e}:${n}`}terminate(){}}
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
 */class ga{constructor(t){this.Go=t.Go,this.zo=t.zo}jo(t){this.Ho=t}Jo(t){this.Yo=t}Zo(t){this.Xo=t}onMessage(t){this.e_=t}close(){this.zo()}send(t){this.Go(t)}t_(){this.Ho()}n_(){this.Yo()}r_(t){this.Xo(t)}i_(t){this.e_(t)}}
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
 */const ya="WebChannelConnection";class va extends ma{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Ko(t,e,n,r){const s=da();return new Promise((i,o)=>{const a=new je;a.setWithCredentials(!0),a.listenOnce(ze.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case qe.NO_ERROR:const e=a.getResponseJson();nn(ya,`XHR for RPC '${t}' ${s} received:`,JSON.stringify(e)),i(e);break;case qe.TIMEOUT:nn(ya,`RPC '${t}' ${s} timed out`),o(new dn(ln.DEADLINE_EXCEEDED,"Request time out"));break;case qe.HTTP_ERROR:const n=a.getStatus();if(nn(ya,`RPC '${t}' ${s} failed with status:`,n,"response text:",a.getResponseText()),n>0){let t=a.getResponseJson();Array.isArray(t)&&(t=t[0]);const e=null==t?void 0:t.error;if(e&&e.status&&e.message){const t=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(ln).indexOf(e)>=0?e:ln.UNKNOWN}(e.status);o(new dn(t,e.message))}else o(new dn(ln.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new dn(ln.UNAVAILABLE,"Connection failed."));break;default:an(9055,{s_:t,streamId:s,o_:a.getLastErrorCode(),__:a.getLastError()})}}finally{nn(ya,`RPC '${t}' ${s} completed.`)}});const c=JSON.stringify(r);nn(ya,`RPC '${t}' ${s} sending request:`,r),a.send(e,"POST",c,n,15)})}a_(t,e,n){const r=da(),s=[this.Lo,"/","google.firestore.v1.Firestore","/",t,"/channel"],i=Qe(),o=He(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.Uo(a.initMessageHeaders,e,n),a.encodeInitMessageHeaders=!0;const u=s.join("");nn(ya,`Creating RPC '${t}' stream ${r}: ${u}`,a);const h=i.createWebChannel(u,a);let l=!1,d=!1;const f=new ga({Go:e=>{d?nn(ya,`Not sending because RPC '${t}' stream ${r} is closed:`,e):(l||(nn(ya,`Opening RPC '${t}' stream ${r} transport.`),h.open(),l=!0),nn(ya,`RPC '${t}' stream ${r} sending:`,e),h.send(e))},zo:()=>h.close()}),p=(t,e,n)=>{t.listen(e,t=>{try{n(t)}catch(e){setTimeout(()=>{throw e},0)}})};return p(h,$e.EventType.OPEN,()=>{d||(nn(ya,`RPC '${t}' stream ${r} transport opened.`),f.t_())}),p(h,$e.EventType.CLOSE,()=>{d||(d=!0,nn(ya,`RPC '${t}' stream ${r} transport closed`),f.r_())}),p(h,$e.EventType.ERROR,e=>{d||(d=!0,sn(ya,`RPC '${t}' stream ${r} transport errored. Name:`,e.name,"Message:",e.message),f.r_(new dn(ln.UNAVAILABLE,"The operation could not be completed")))}),p(h,$e.EventType.MESSAGE,e=>{var n;if(!d){const s=e.data[0];un(!!s,16349);const i=s,o=(null==i?void 0:i.error)||(null===(n=i[0])||void 0===n?void 0:n.error);if(o){nn(ya,`RPC '${t}' stream ${r} received error:`,o);const e=o.status;let n=function(t){const e=Ii[t];if(void 0!==e)return Ai(e)}(e),s=o.message;void 0===n&&(n=ln.INTERNAL,s="Unknown error status: "+e+" with message "+o.message),d=!0,f.r_(new dn(n,s)),h.close()}else nn(ya,`RPC '${t}' stream ${r} received:`,s),f.i_(s)}}),p(o,Ge.STAT_EVENT,e=>{e.stat===Ke.PROXY?nn(ya,`RPC '${t}' stream ${r} detected buffering proxy`):e.stat===Ke.NOPROXY&&nn(ya,`RPC '${t}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{f.n_()},0),f}}function wa(){return"undefined"!=typeof document?document:null}
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
 */function Ea(t){return new Ki(t,!0)}
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
 */class ba{constructor(t,e,n=1e3,r=1.5,s=6e4){this.bi=t,this.timerId=e,this.u_=n,this.c_=r,this.l_=s,this.h_=0,this.P_=null,this.T_=Date.now(),this.reset()}reset(){this.h_=0}I_(){this.h_=this.l_}E_(t){this.cancel();const e=Math.floor(this.h_+this.d_()),n=Math.max(0,Date.now()-this.T_),r=Math.max(0,e-n);r>0&&nn("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.h_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.P_=this.bi.enqueueAfterDelay(this.timerId,r,()=>(this.T_=Date.now(),t())),this.h_*=this.c_,this.h_<this.u_&&(this.h_=this.u_),this.h_>this.l_&&(this.h_=this.l_)}A_(){null!==this.P_&&(this.P_.skipDelay(),this.P_=null)}cancel(){null!==this.P_&&(this.P_.cancel(),this.P_=null)}d_(){return(Math.random()-.5)*this.h_}}
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
 */const Ta="PersistentStream";class _a{constructor(t,e,n,r,s,i,o,a){this.bi=t,this.R_=n,this.V_=r,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.m_=0,this.f_=null,this.g_=null,this.stream=null,this.p_=0,this.y_=new ba(t,e)}w_(){return 1===this.state||5===this.state||this.b_()}b_(){return 2===this.state||3===this.state}start(){this.p_=0,4!==this.state?this.auth():this.S_()}async stop(){this.w_()&&await this.close(0)}D_(){this.state=0,this.y_.reset()}v_(){this.b_()&&null===this.f_&&(this.f_=this.bi.enqueueAfterDelay(this.R_,6e4,()=>this.C_()))}F_(t){this.M_(),this.stream.send(t)}async C_(){if(this.b_())return this.close(0)}M_(){this.f_&&(this.f_.cancel(),this.f_=null)}x_(){this.g_&&(this.g_.cancel(),this.g_=null)}async close(t,e){this.M_(),this.x_(),this.y_.cancel(),this.m_++,4!==t?this.y_.reset():e&&e.code===ln.RESOURCE_EXHAUSTED?(rn(e.toString()),rn("Using maximum backoff delay to prevent overloading the backend."),this.y_.I_()):e&&e.code===ln.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.O_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Zo(e)}O_(){}auth(){this.state=1;const t=this.N_(this.m_),e=this.m_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([t,n])=>{this.m_===e&&this.B_(t,n)},e=>{t(()=>{const t=new dn(ln.UNKNOWN,"Fetching auth token failed: "+e.message);return this.L_(t)})})}B_(t,e){const n=this.N_(this.m_);this.stream=this.k_(t,e),this.stream.jo(()=>{n(()=>this.listener.jo())}),this.stream.Jo(()=>{n(()=>(this.state=2,this.g_=this.bi.enqueueAfterDelay(this.V_,1e4,()=>(this.b_()&&(this.state=3),Promise.resolve())),this.listener.Jo()))}),this.stream.Zo(t=>{n(()=>this.L_(t))}),this.stream.onMessage(t=>{n(()=>1==++this.p_?this.q_(t):this.onNext(t))})}S_(){this.state=5,this.y_.E_(async()=>{this.state=0,this.start()})}L_(t){return nn(Ta,`close with error: ${t}`),this.stream=null,this.close(4,t)}N_(t){return e=>{this.bi.enqueueAndForget(()=>this.m_===t?e():(nn(Ta,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Sa extends _a{constructor(t,e,n,r,s,i){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,r,i),this.serializer=s}k_(t,e){return this.connection.a_("Listen",t,e)}q_(t){return this.onNext(t)}onNext(t){this.y_.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const s="NO_CHANGE"===(r=e.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:an(39313,{state:r}),i=e.targetChange.targetIds||[],o=function(t,e){return t.useProto3Json?(un(void 0===e||"string"==typeof e,58123),cr.fromBase64String(e||"")):(un(void 0===e||e instanceof Buffer||e instanceof Uint8Array,16193),cr.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(t){const e=void 0===t.code?ln.UNKNOWN:Ai(t.code);return new dn(e,t.message||"")}(a);n=new Vi(s,i,o,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=eo(t,r.document.name),i=Yi(r.document.updateTime),o=r.document.createTime?Yi(r.document.createTime):On.min(),a=new zr({mapValue:{fields:r.document.fields}}),c=Kr.newFoundDocument(s,i,o,a),u=r.targetIds||[],h=r.removedTargetIds||[];n=new Mi(u,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=eo(t,r.document),i=r.readTime?Yi(r.readTime):On.min(),o=Kr.newNoDocument(s,i),a=r.removedTargetIds||[];n=new Mi([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=eo(t,r.document),i=r.removedTargetIds||[];n=new Mi([],i,s,null)}else{if(!("filter"in e))return an(11601,{Vt:e});{e.filter;const t=e.filter;t.targetId;const{count:r=0,unchangedNames:s}=t,i=new Si(r,s),o=t.targetId;n=new Pi(o,i)}}var r;return n}(this.serializer,t),n=function(t){if(!("targetChange"in t))return On.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?On.min():e.readTime?Yi(e.readTime):On.min()}(t);return this.listener.Q_(e,n)}U_(t){const e={};e.database=ro(this.serializer),e.addTarget=function(t,e){let n;const r=e.target;if(n=ys(r)?{documents:oo(t,r)}:{query:ao(t,r).gt},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0){n.resumeToken=Qi(t,e.resumeToken);const r=Gi(t,e.expectedCount);null!==r&&(n.expectedCount=r)}else if(e.snapshotVersion.compareTo(On.min())>0){n.readTime=Hi(t,e.snapshotVersion.toTimestamp());const r=Gi(t,e.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,t);const n=function(t,e){const n=function(t){switch(t){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return an(28987,{purpose:t})}}(e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,t);n&&(e.labels=n),this.F_(e)}K_(t){const e={};e.database=ro(this.serializer),e.removeTarget=t,this.F_(e)}}class Ia extends _a{constructor(t,e,n,r,s,i){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,r,i),this.serializer=s}get W_(){return this.p_>0}start(){this.lastStreamToken=void 0,super.start()}O_(){this.W_&&this.G_([])}k_(t,e){return this.connection.a_("Write",t,e)}q_(t){return un(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,un(!t.writeResults||0===t.writeResults.length,55816),this.listener.z_()}onNext(t){un(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.y_.reset();const e=function(t,e){return t&&t.length>0?(un(void 0!==e,14353),t.map(t=>function(t,e){let n=t.updateTime?Yi(t.updateTime):Yi(e);return n.isEqual(On.min())&&(n=Yi(e)),new ii(n,t.transformResults||[])}(t,e))):[]}(t.writeResults,t.commitTime),n=Yi(t.commitTime);return this.listener.j_(n,e)}H_(){const t={};t.database=ro(this.serializer),this.F_(t)}G_(t){const e={streamToken:this.lastStreamToken,writes:t.map(t=>function(t,e){let n;if(e instanceof pi)n={update:io(t,e.key,e.value)};else if(e instanceof wi)n={delete:to(t,e.key)};else if(e instanceof mi)n={update:io(t,e.key,e.data),updateMask:yo(e.fieldMask)};else{if(!(e instanceof Ei))return an(16599,{ft:e.type});n={verify:to(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(t=>function(t,e){const n=e.transform;if(n instanceof Ys)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Xs)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Zs)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof ei)return{fieldPath:e.field.canonicalString(),increment:n.Re};throw an(20930,{transform:e.transform})}(0,t))),e.precondition.isNone||(n.currentDocument=(r=t,void 0!==(s=e.precondition).updateTime?{updateTime:Wi(r,s.updateTime)}:void 0!==s.exists?{exists:s.exists}:an(27497))),n;var r,s}(this.serializer,t))};this.F_(e)}}
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
 */class Ca{}class Aa extends Ca{constructor(t,e,n,r){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=r,this.J_=!1}Y_(){if(this.J_)throw new dn(ln.FAILED_PRECONDITION,"The client has already been terminated.")}Qo(t,e,n,r){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Qo(t,Ji(e,n),r,s,i)).catch(t=>{throw"FirebaseError"===t.name?(t.code===ln.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new dn(ln.UNKNOWN,t.toString())})}Wo(t,e,n,r,s){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Wo(t,Ji(e,n),r,i,o,s)).catch(t=>{throw"FirebaseError"===t.name?(t.code===ln.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new dn(ln.UNKNOWN,t.toString())})}terminate(){this.J_=!0,this.connection.terminate()}}class Da{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.Z_=0,this.X_=null,this.ea=!0}ta(){0===this.Z_&&(this.na("Unknown"),this.X_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.X_=null,this.ra("Backend didn't respond within 10 seconds."),this.na("Offline"),Promise.resolve())))}ia(t){"Online"===this.state?this.na("Unknown"):(this.Z_++,this.Z_>=1&&(this.sa(),this.ra(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.na("Offline")))}set(t){this.sa(),this.Z_=0,"Online"===t&&(this.ea=!1),this.na(t)}na(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ra(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ea?(rn(e),this.ea=!1):nn("OnlineStateTracker",e)}sa(){null!==this.X_&&(this.X_.cancel(),this.X_=null)}}
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
 */const ka="RemoteStore";class Na{constructor(t,e,n,r,s){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.oa=[],this._a=new Map,this.aa=new Set,this.ua=[],this.ca=s,this.ca.vo(t=>{n.enqueueAndForget(async()=>{Ua(this)&&(nn(ka,"Restarting streams for network reachability change."),await async function(t){const e=hn(t);e.aa.add(4),await xa(e),e.la.set("Unknown"),e.aa.delete(4),await Ra(e)}(this))})}),this.la=new Da(n,r)}}async function Ra(t){if(Ua(t))for(const e of t.ua)await e(!0)}async function xa(t){for(const e of t.ua)await e(!1)}function Oa(t,e){const n=hn(t);n._a.has(e.targetId)||(n._a.set(e.targetId,e),Fa(n)?Va(n):rc(n).b_()&&Ma(n,e))}function La(t,e){const n=hn(t),r=rc(n);n._a.delete(e),r.b_()&&Pa(n,e),0===n._a.size&&(r.b_()?r.v_():Ua(n)&&n.la.set("Unknown"))}function Ma(t,e){if(t.ha.Ke(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(On.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}rc(t).U_(e)}function Pa(t,e){t.ha.Ke(e),rc(t).K_(e)}function Va(t){t.ha=new Ui({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),Rt:e=>t._a.get(e)||null,Pt:()=>t.datastore.serializer.databaseId}),rc(t).start(),t.la.ta()}function Fa(t){return Ua(t)&&!rc(t).w_()&&t._a.size>0}function Ua(t){return 0===hn(t).aa.size}function Ba(t){t.ha=void 0}async function ja(t){t.la.set("Online")}async function $a(t){t._a.forEach((e,n)=>{Ma(t,e)})}async function za(t,e){Ba(t),Fa(t)?(t.la.ia(e),Va(t)):t.la.set("Unknown")}async function qa(t,e,n){if(t.la.set("Online"),e instanceof Vi&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const r of e.targetIds)t._a.has(r)&&(await t.remoteSyncer.rejectListen(r,n),t._a.delete(r),t.ha.removeTarget(r))}(t,e)}catch(r){nn(ka,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ka(t,r)}else if(e instanceof Mi?t.ha.Xe(e):e instanceof Pi?t.ha.ot(e):t.ha.nt(e),!n.isEqual(On.min()))try{const e=await ea(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.ha.It(e);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=t._a.get(r);s&&t._a.set(r,s.withResumeToken(n.resumeToken,e))}}),n.targetMismatches.forEach((e,n)=>{const r=t._a.get(e);if(!r)return;t._a.set(e,r.withResumeToken(cr.EMPTY_BYTE_STRING,r.snapshotVersion)),Pa(t,e);const s=new wo(r.target,e,n,r.sequenceNumber);Ma(t,s)}),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(s){nn(ka,"Failed to raise snapshot:",s),await Ka(t,s)}}async function Ka(t,e,n){if(!Gn(e))throw e;t.aa.add(1),await xa(t),t.la.set("Offline"),n||(n=()=>ea(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{nn(ka,"Retrying IndexedDB access"),await n(),t.aa.delete(1),await Ra(t)})}function Ga(t,e){return e().catch(n=>Ka(t,n,e))}async function Ha(t){const e=hn(t),n=sc(e);let r=e.oa.length>0?e.oa[e.oa.length-1].batchId:-1;for(;Qa(e);)try{const t=await ra(e.localStore,r);if(null===t){0===e.oa.length&&n.v_();break}r=t.batchId,Wa(e,t)}catch(s){await Ka(e,s)}Ya(e)&&Xa(e)}function Qa(t){return Ua(t)&&t.oa.length<10}function Wa(t,e){t.oa.push(e);const n=sc(t);n.b_()&&n.W_&&n.G_(e.mutations)}function Ya(t){return Ua(t)&&!sc(t).w_()&&t.oa.length>0}function Xa(t){sc(t).start()}async function Ja(t){sc(t).H_()}async function Za(t){const e=sc(t);for(const n of t.oa)e.G_(n.mutations)}async function tc(t,e,n){const r=t.oa.shift(),s=Ti.from(r,e,n);await Ga(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Ha(t)}async function ec(t,e){e&&sc(t).W_&&await async function(t,e){if(function(t){switch(t){case ln.OK:return an(64938);case ln.CANCELLED:case ln.UNKNOWN:case ln.DEADLINE_EXCEEDED:case ln.RESOURCE_EXHAUSTED:case ln.INTERNAL:case ln.UNAVAILABLE:case ln.UNAUTHENTICATED:return!1;case ln.INVALID_ARGUMENT:case ln.NOT_FOUND:case ln.ALREADY_EXISTS:case ln.PERMISSION_DENIED:case ln.FAILED_PRECONDITION:case ln.ABORTED:case ln.OUT_OF_RANGE:case ln.UNIMPLEMENTED:case ln.DATA_LOSS:return!0;default:return an(15467,{code:t})}}(n=e.code)&&n!==ln.ABORTED){const n=t.oa.shift();sc(t).D_(),await Ga(t,()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e)),await Ha(t)}var n}(t,e),Ya(t)&&Xa(t)}async function nc(t,e){const n=hn(t);n.asyncQueue.verifyOperationInProgress(),nn(ka,"RemoteStore received new credentials");const r=Ua(n);n.aa.add(3),await xa(n),r&&n.la.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.aa.delete(3),await Ra(n)}function rc(t){return t.Pa||(t.Pa=function(t,e,n){const r=hn(t);return r.Y_(),new Sa(e,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(t.datastore,t.asyncQueue,{jo:ja.bind(null,t),Jo:$a.bind(null,t),Zo:za.bind(null,t),Q_:qa.bind(null,t)}),t.ua.push(async e=>{e?(t.Pa.D_(),Fa(t)?Va(t):t.la.set("Unknown")):(await t.Pa.stop(),Ba(t))})),t.Pa}function sc(t){return t.Ta||(t.Ta=function(t,e,n){const r=hn(t);return r.Y_(),new Ia(e,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(t.datastore,t.asyncQueue,{jo:()=>Promise.resolve(),Jo:Ja.bind(null,t),Zo:ec.bind(null,t),z_:Za.bind(null,t),j_:tc.bind(null,t)}),t.ua.push(async e=>{e?(t.Ta.D_(),await Ha(t)):(await t.Ta.stop(),t.oa.length>0&&(nn(ka,`Stopping write stream with ${t.oa.length} pending writes`),t.oa=[]))})),t.Ta
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
 */}class ic{constructor(t,e,n,r,s){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new fn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(t=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,r,s){const i=Date.now()+n,o=new ic(t,e,i,r,s);return o.start(n),o}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new dn(ln.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function oc(t,e){if(rn("AsyncQueue",`${e}: ${t}`),Gn(t))return new dn(ln.UNAVAILABLE,`${e}: ${t}`);throw t}
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
 */class ac{static emptySet(t){return new ac(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||Un.comparator(e.key,n.key):(t,e)=>Un.comparator(t.key,e.key),this.keyedMap=Ls(),this.sortedSet=new er(this.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof ac))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(!t.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new ac;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
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
 */class cc{constructor(){this.Ia=new er(Un.comparator)}track(t){const e=t.doc.key,n=this.Ia.get(e);n?0!==t.type&&3===n.type?this.Ia=this.Ia.insert(e,t):3===t.type&&1!==n.type?this.Ia=this.Ia.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.Ia=this.Ia.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.Ia=this.Ia.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.Ia=this.Ia.remove(e):1===t.type&&2===n.type?this.Ia=this.Ia.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.Ia=this.Ia.insert(e,{type:2,doc:t.doc}):an(63341,{Vt:t,Ea:n}):this.Ia=this.Ia.insert(e,t)}da(){const t=[];return this.Ia.inorderTraversal((e,n)=>{t.push(n)}),t}}class uc{constructor(t,e,n,r,s,i,o,a,c){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(t,e,n,r,s){const i=[];return e.forEach(t=>{i.push({type:0,doc:t})}),new uc(t,e,ac.emptySet(e),i,n,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Ss(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let r=0;r<e.length;r++)if(e[r].type!==n[r].type||!e[r].doc.isEqual(n[r].doc))return!1;return!0}}
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
 */class hc{constructor(){this.Aa=void 0,this.Ra=[]}Va(){return this.Ra.some(t=>t.ma())}}class lc{constructor(){this.queries=dc(),this.onlineState="Unknown",this.fa=new Set}terminate(){!function(t,e){const n=hn(t),r=n.queries;n.queries=dc(),r.forEach((t,n)=>{for(const r of n.Ra)r.onError(e)})}(this,new dn(ln.ABORTED,"Firestore shutting down"))}}function dc(){return new Ns(t=>Is(t),Ss)}function fc(t,e){const n=hn(t);let r=!1;for(const s of e){const t=s.query,e=n.queries.get(t);if(e){for(const t of e.Ra)t.pa(s)&&(r=!0);e.Aa=s}}r&&mc(n)}function pc(t,e,n){const r=hn(t),s=r.queries.get(e);if(s)for(const i of s.Ra)i.onError(n);r.queries.delete(e)}function mc(t){t.fa.forEach(t=>{t.next()})}var gc,yc;(yc=gc||(gc={})).ya="default",yc.Cache="cache";class vc{constructor(t,e,n){this.query=t,this.wa=e,this.ba=!1,this.Sa=null,this.onlineState="Unknown",this.options=n||{}}pa(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new uc(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.ba?this.Da(t)&&(this.wa.next(t),e=!0):this.va(t,this.onlineState)&&(this.Ca(t),e=!0),this.Sa=t,e}onError(t){this.wa.error(t)}ga(t){this.onlineState=t;let e=!1;return this.Sa&&!this.ba&&this.va(this.Sa,t)&&(this.Ca(this.Sa),e=!0),e}va(t,e){if(!t.fromCache)return!0;if(!this.ma())return!0;const n="Offline"!==e;return(!this.options.Fa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||"Offline"===e)}Da(t){if(t.docChanges.length>0)return!0;const e=this.Sa&&this.Sa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}Ca(t){t=uc.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.ba=!0,this.wa.next(t)}ma(){return this.options.source!==gc.Cache}}
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
 */class wc{constructor(t){this.key=t}}class Ec{constructor(t){this.key=t}}class bc{constructor(t,e){this.query=t,this.qa=e,this.Qa=null,this.hasCachedResults=!1,this.current=!1,this.$a=js(),this.mutatedKeys=js(),this.Ua=Ds(t),this.Ka=new ac(this.Ua)}get Wa(){return this.qa}Ga(t,e){const n=e?e.za:new cc,r=e?e.Ka:this.Ka;let s=e?e.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal((t,e)=>{const u=r.get(t),h=As(this.query,e)?e:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.ja(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.Ua(h,a)>0||c&&this.Ua(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(i=i.add(h),s=d?s.add(t):s.delete(t)):(i=i.delete(t),s=s.delete(t)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const t="F"===this.query.limitType?i.last():i.first();i=i.delete(t.key),s=s.delete(t.key),n.track({type:1,doc:t})}return{Ka:i,za:n,ys:o,mutatedKeys:s}}ja(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,r){const s=this.Ka;this.Ka=t.Ka,this.mutatedKeys=t.mutatedKeys;const i=t.za.da();i.sort((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return an(20277,{Vt:t})}};return n(t)-n(e)}(t.type,e.type)||this.Ua(t.doc,e.doc)),this.Ha(n),r=null!=r&&r;const o=e&&!r?this.Ja():[],a=0===this.$a.size&&this.current&&!r?1:0,c=a!==this.Qa;return this.Qa=a,0!==i.length||c?{snapshot:new uc(this.query,t.Ka,s,i,t.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),Ya:o}:{Ya:o}}ga(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({Ka:this.Ka,za:new cc,mutatedKeys:this.mutatedKeys,ys:!1},!1)):{Ya:[]}}Za(t){return!this.qa.has(t)&&!!this.Ka.has(t)&&!this.Ka.get(t).hasLocalMutations}Ha(t){t&&(t.addedDocuments.forEach(t=>this.qa=this.qa.add(t)),t.modifiedDocuments.forEach(t=>{}),t.removedDocuments.forEach(t=>this.qa=this.qa.delete(t)),this.current=t.current)}Ja(){if(!this.current)return[];const t=this.$a;this.$a=js(),this.Ka.forEach(t=>{this.Za(t.key)&&(this.$a=this.$a.add(t.key))});const e=[];return t.forEach(t=>{this.$a.has(t)||e.push(new Ec(t))}),this.$a.forEach(n=>{t.has(n)||e.push(new wc(n))}),e}Xa(t){this.qa=t.Ns,this.$a=js();const e=this.Ga(t.documents);return this.applyChanges(e,!0)}eu(){return uc.fromInitialDocuments(this.query,this.Ka,this.mutatedKeys,0===this.Qa,this.hasCachedResults)}}const Tc="SyncEngine";class _c{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Sc{constructor(t){this.key=t,this.tu=!1}}class Ic{constructor(t,e,n,r,s,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.nu={},this.ru=new Ns(t=>Is(t),Ss),this.iu=new Map,this.su=new Set,this.ou=new er(Un.comparator),this._u=new Map,this.au=new Uo,this.uu={},this.cu=new Map,this.lu=Ao.ir(),this.onlineState="Unknown",this.hu=void 0}get isPrimaryClient(){return!0===this.hu}}async function Cc(t,e,n=!0){const r=Hc(t);let s;const i=r.ru.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.eu()):s=await Dc(r,e,n,!0),s}async function Ac(t,e){const n=Hc(t);await Dc(n,e,!0,!1)}async function Dc(t,e,n,r){const s=await function(t,e){const n=hn(t);return n.persistence.runTransaction("Allocate target","readwrite",t=>{let r;return n.ai.getTargetData(t,e).next(s=>s?(r=s,Kn.resolve(r)):n.ai.allocateTargetId(t).next(s=>(r=new wo(e,s,"TargetPurposeListen",t.currentSequenceNumber),n.ai.addTargetData(t,r).next(()=>r))))}).then(t=>{const r=n.Ss.get(t.targetId);return(null===r||t.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ss=n.Ss.insert(t.targetId,t),n.Ds.set(e,t.targetId)),t})}(t.localStore,Ts(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let a;return r&&(a=await async function(t,e,n,r,s){t.Pu=(e,n,r)=>async function(t,e,n,r){let s=e.view.Ga(n);s.ys&&(s=await ia(t.localStore,e.query,!1).then(({documents:t})=>e.view.Ga(t,s)));const i=r&&r.targetChanges.get(e.targetId),o=r&&null!=r.targetMismatches.get(e.targetId),a=e.view.applyChanges(s,t.isPrimaryClient,i,o);return jc(t,e.targetId,a.Ya),a.snapshot}(t,e,n,r);const i=await ia(t.localStore,e,!0),o=new bc(e,i.Ns),a=o.Ga(i.documents),c=Li.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==t.onlineState,s),u=o.applyChanges(a,t.isPrimaryClient,c);jc(t,n,u.Ya);const h=new _c(e,n,o);return t.ru.set(e,h),t.iu.has(n)?t.iu.get(n).push(e):t.iu.set(n,[e]),u.snapshot}(t,e,i,"current"===o,s.resumeToken)),t.isPrimaryClient&&n&&Oa(t.remoteStore,s),a}async function kc(t,e,n){const r=hn(t),s=r.ru.get(e),i=r.iu.get(s.targetId);if(i.length>1)return r.iu.set(s.targetId,i.filter(t=>!Ss(t,e))),void r.ru.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await sa(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&La(r.remoteStore,s.targetId),Uc(r,s.targetId)}).catch(qn)):(Uc(r,s.targetId),await sa(r.localStore,s.targetId,!0))}async function Nc(t,e){const n=hn(t),r=n.ru.get(e),s=n.iu.get(r.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),La(n.remoteStore,r.targetId))}async function Rc(t,e,n){const r=function(t){const e=hn(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Mc.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Pc.bind(null,e),e}(t);try{const t=await function(t,e){const n=hn(t),r=xn.now(),s=e.reduce((t,e)=>t.add(e.key),js());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",t=>{let a=xs(),c=js();return n.Cs.getEntries(t,s).next(t=>{a=t,a.forEach((t,e)=>{e.isValidDocument()||(c=c.add(t))})}).next(()=>n.localDocuments.getOverlayedDocuments(t,a)).next(s=>{i=s;const o=[];for(const t of e){const e=di(t,i.get(t.key).overlayedDocument);null!=e&&o.push(new mi(t.key,e,qr(e.value.mapValue),oi.exists(!0)))}return n.mutationQueue.addMutationBatch(t,r,o,e)}).next(e=>{o=e;const r=e.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(t,e.batchId,r)})}).then(()=>({batchId:o.batchId,changes:Ms(i)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let r=t.uu[t.currentUser.toKey()];r||(r=new er(In)),r=r.insert(e,n),t.uu[t.currentUser.toKey()]=r}(r,t.batchId,n),await qc(r,t.changes),await Ha(r.remoteStore)}catch(s){const t=oc(s,"Failed to persist write");n.reject(t)}}async function xc(t,e){const n=hn(t);try{const t=await na(n.localStore,e);e.targetChanges.forEach((t,e)=>{const r=n._u.get(e);r&&(un(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1,22616),t.addedDocuments.size>0?r.tu=!0:t.modifiedDocuments.size>0?un(r.tu,14607):t.removedDocuments.size>0&&(un(r.tu,42227),r.tu=!1))}),await qc(n,t,e)}catch(r){await qn(r)}}function Oc(t,e,n){const r=hn(t);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const t=[];r.ru.forEach((n,r)=>{const s=r.view.ga(e);s.snapshot&&t.push(s.snapshot)}),function(t,e){const n=hn(t);n.onlineState=e;let r=!1;n.queries.forEach((t,n)=>{for(const s of n.Ra)s.ga(e)&&(r=!0)}),r&&mc(n)}(r.eventManager,e),t.length&&r.nu.Q_(t),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Lc(t,e,n){const r=hn(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r._u.get(e),i=s&&s.key;if(i){let t=new er(Un.comparator);t=t.insert(i,Kr.newNoDocument(i,On.min()));const n=js().add(i),s=new Oi(On.min(),new Map,new er(In),t,n);await xc(r,s),r.ou=r.ou.remove(i),r._u.delete(e),zc(r)}else await sa(r.localStore,e,!1).then(()=>Uc(r,e,n)).catch(qn)}async function Mc(t,e){const n=hn(t),r=e.batch.batchId;try{const t=await function(t,e){const n=hn(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",t=>{const r=e.batch.keys(),s=n.Cs.newChangeBuffer({trackRemovals:!0});return function(t,e,n,r){const s=n.batch,i=s.keys();let o=Kn.resolve();return i.forEach(t=>{o=o.next(()=>r.getEntry(e,t)).next(e=>{const i=n.docVersions.get(t);un(null!==i,48541),e.version.compareTo(i)<0&&(s.applyToRemoteDocument(e,n),e.isValidDocument()&&(e.setReadTime(n.commitVersion),r.addEntry(e)))})}),o.next(()=>t.mutationQueue.removeMutationBatch(e,s))}(n,t,e,s).next(()=>s.apply(t)).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,function(t){let e=js();for(let n=0;n<t.mutationResults.length;++n)t.mutationResults[n].transformResults.length>0&&(e=e.add(t.batch.mutations[n].key));return e}(e))).next(()=>n.localDocuments.getDocuments(t,r))})}(n.localStore,e);Fc(n,r,null),Vc(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await qc(n,t)}catch(s){await qn(s)}}async function Pc(t,e,n){const r=hn(t);try{const t=await function(t,e){const n=hn(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",t=>{let r;return n.mutationQueue.lookupMutationBatch(t,e).next(e=>(un(null!==e,37113),r=e.keys(),n.mutationQueue.removeMutationBatch(t,e))).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,r,e)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,r)).next(()=>n.localDocuments.getDocuments(t,r))})}(r.localStore,e);Fc(r,e,n),Vc(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await qc(r,t)}catch(s){await qn(s)}}function Vc(t,e){(t.cu.get(e)||[]).forEach(t=>{t.resolve()}),t.cu.delete(e)}function Fc(t,e,n){const r=hn(t);let s=r.uu[r.currentUser.toKey()];if(s){const t=s.get(e);t&&(n?t.reject(n):t.resolve(),s=s.remove(e)),r.uu[r.currentUser.toKey()]=s}}function Uc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.iu.get(e))t.ru.delete(r),n&&t.nu.Tu(r,n);t.iu.delete(e),t.isPrimaryClient&&t.au.Ur(e).forEach(e=>{t.au.containsKey(e)||Bc(t,e)})}function Bc(t,e){t.su.delete(e.path.canonicalString());const n=t.ou.get(e);null!==n&&(La(t.remoteStore,n),t.ou=t.ou.remove(e),t._u.delete(n),zc(t))}function jc(t,e,n){for(const r of n)r instanceof wc?(t.au.addReference(r.key,e),$c(t,r)):r instanceof Ec?(nn(Tc,"Document no longer in limbo: "+r.key),t.au.removeReference(r.key,e),t.au.containsKey(r.key)||Bc(t,r.key)):an(19791,{Iu:r})}function $c(t,e){const n=e.key,r=n.path.canonicalString();t.ou.get(n)||t.su.has(r)||(nn(Tc,"New document in limbo: "+n),t.su.add(r),zc(t))}function zc(t){for(;t.su.size>0&&t.ou.size<t.maxConcurrentLimboResolutions;){const e=t.su.values().next().value;t.su.delete(e);const n=new Un(Pn.fromString(e)),r=t.lu.next();t._u.set(r,new Sc(n)),t.ou=t.ou.insert(n,r),Oa(t.remoteStore,new wo(Ts(ws(n.path)),r,"TargetPurposeLimboResolution",Hn.le))}}async function qc(t,e,n){const r=hn(t),s=[],i=[],o=[];r.ru.isEmpty()||(r.ru.forEach((t,a)=>{o.push(r.Pu(a,e,n).then(t=>{var e;if((t||n)&&r.isPrimaryClient){const s=t?!t.fromCache:null===(e=null==n?void 0:n.targetChanges.get(a.targetId))||void 0===e?void 0:e.current;r.sharedClientState.updateQueryState(a.targetId,s?"current":"not-current")}if(t){s.push(t);const e=Wo.Ps(a.targetId,t);i.push(e)}}))}),await Promise.all(o),r.nu.Q_(s),await async function(t,e){const n=hn(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",t=>Kn.forEach(e,e=>Kn.forEach(e.ls,r=>n.persistence.referenceDelegate.addReference(t,e.targetId,r)).next(()=>Kn.forEach(e.hs,r=>n.persistence.referenceDelegate.removeReference(t,e.targetId,r)))))}catch(r){if(!Gn(r))throw r;nn(Jo,"Failed to update sequence numbers: "+r)}for(const s of e){const t=s.targetId;if(!s.fromCache){const e=n.Ss.get(t),r=e.snapshotVersion,s=e.withLastLimboFreeSnapshotVersion(r);n.Ss=n.Ss.insert(t,s)}}}(r.localStore,i))}async function Kc(t,e){const n=hn(t);if(!n.currentUser.isEqual(e)){nn(Tc,"User change. New user:",e.toKey());const t=await ta(n.localStore,e);n.currentUser=e,s="'waitForPendingWrites' promise is rejected due to a user change.",(r=n).cu.forEach(t=>{t.forEach(t=>{t.reject(new dn(ln.CANCELLED,s))})}),r.cu.clear(),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await qc(n,t.Ms)}var r,s}function Gc(t,e){const n=hn(t),r=n._u.get(e);if(r&&r.tu)return js().add(r.key);{let t=js();const r=n.iu.get(e);if(!r)return t;for(const e of r){const r=n.ru.get(e);t=t.unionWith(r.view.Wa)}return t}}function Hc(t){const e=hn(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=xc.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Gc.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Lc.bind(null,e),e.nu.Q_=fc.bind(null,e.eventManager),e.nu.Tu=pc.bind(null,e.eventManager),e}class Qc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Ea(t.databaseInfo.databaseId),this.sharedClientState=this.Au(t),this.persistence=this.Ru(t),await this.persistence.start(),this.localStore=this.Vu(t),this.gcScheduler=this.mu(t,this.localStore),this.indexBackfillerScheduler=this.fu(t,this.localStore)}mu(t,e){return null}fu(t,e){return null}Vu(t){return function(t,e,n,r){return new Zo(t,e,n,r)}(this.persistence,new Xo,t.initialUser,this.serializer)}Ru(t){return new Ko(Ho.Ei,this.serializer)}Au(t){return new aa}async terminate(){var t,e;null===(t=this.gcScheduler)||void 0===t||t.stop(),null===(e=this.indexBackfillerScheduler)||void 0===e||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Qc.provider={build:()=>new Qc};class Wc extends Qc{constructor(t){super(),this.cacheSizeBytes=t}mu(t,e){un(this.persistence.referenceDelegate instanceof Qo,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Ro(n,t.asyncQueue,e)}Ru(t){const e=void 0!==this.cacheSizeBytes?Co.withCacheSize(this.cacheSizeBytes):Co.DEFAULT;return new Ko(t=>Qo.Ei(t,e),this.serializer)}}class Yc{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>Oc(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=Kc.bind(null,this.syncEngine),await async function(t,e){const n=hn(t);e?(n.aa.delete(2),await Ra(n)):e||(n.aa.add(2),await xa(n),n.la.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new lc}createDatastore(t){const e=Ea(t.databaseInfo.databaseId),n=(r=t.databaseInfo,new va(r));var r;return function(t,e,n,r){return new Aa(t,e,n,r)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,r=t.asyncQueue,s=t=>Oc(this.syncEngine,t,0),i=ha.C()?new ha:new ca,new Na(e,n,r,s,i);var e,n,r,s,i}createSyncEngine(t,e){return function(t,e,n,r,s,i,o){const a=new Ic(t,e,n,r,s,i);return o&&(a.hu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(t){const e=hn(t);nn(ka,"RemoteStore shutting down."),e.aa.add(5),await xa(e),e.ca.shutdown(),e.la.set("Unknown")}(this.remoteStore),null===(t=this.datastore)||void 0===t||t.terminate(),null===(e=this.eventManager)||void 0===e||e.terminate()}}Yc.provider={build:()=>new Yc};
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
class Xc{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.pu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.pu(this.observer.error,t):rn("Uncaught Error in snapshot listener:",t.toString()))}yu(){this.muted=!0}pu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}
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
 */const Jc="FirestoreClient";class Zc{constructor(t,e,n,r,s){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=r,this.user=Je.UNAUTHENTICATED,this.clientId=Sn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async t=>{nn(Jc,"Received user=",t.uid),await this.authCredentialListener(t),this.user=t}),this.appCheckCredentials.start(n,t=>(nn(Jc,"Received new app check token=",t),this.appCheckCredentialListener(t,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new fn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=oc(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function tu(t,e){t.asyncQueue.verifyOperationInProgress(),nn(Jc,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async t=>{r.isEqual(t)||(await ta(e.localStore,t),r=t)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function eu(t,e){t.asyncQueue.verifyOperationInProgress();const n=await async function(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){nn(Jc,"Using user provided OfflineComponentProvider");try{await tu(t,t._uninitializedComponentsProvider._offline)}catch(e){const s=e;if(!("FirebaseError"===(n=s).name?n.code===ln.FAILED_PRECONDITION||n.code===ln.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&n instanceof DOMException)||22===n.code||20===n.code||11===n.code))throw s;sn("Error using user provided cache. Falling back to memory cache: "+s),await tu(t,new Qc)}}else nn(Jc,"Using default OfflineComponentProvider"),await tu(t,new Wc(void 0));var n;return t._offlineComponents}(t);nn(Jc,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(t=>nc(e.remoteStore,t)),t.setAppCheckTokenChangeListener((t,n)=>nc(e.remoteStore,n)),t._onlineComponents=e}async function nu(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(nn(Jc,"Using user provided OnlineComponentProvider"),await eu(t,t._uninitializedComponentsProvider._online)):(nn(Jc,"Using default OnlineComponentProvider"),await eu(t,new Yc))),t._onlineComponents}async function ru(t){const e=await nu(t),n=e.eventManager;return n.onListen=Cc.bind(null,e.syncEngine),n.onUnlisten=kc.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=Ac.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=Nc.bind(null,e.syncEngine),n}function su(t,e,n={}){const r=new fn;return t.asyncQueue.enqueueAndForget(async()=>function(t,e,n,r,s){const i=new Xc({next:a=>{i.yu(),e.enqueueAndForget(()=>async function(t,e){const n=hn(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const t=i.Ra.indexOf(e);t>=0&&(i.Ra.splice(t,1),0===i.Ra.length?s=e.ma()?0:1:!i.Va()&&e.ma()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}(t,o));const c=a.docs.has(n);!c&&a.fromCache?s.reject(new dn(ln.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&r&&"server"===r.source?s.reject(new dn(ln.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(a)},error:t=>s.reject(t)}),o=new vc(ws(n.path),i,{includeMetadataChanges:!0,Fa:!0});return async function(e,n){const r=hn(e);let s=3;const i=n.query;let o=r.queries.get(i);o?!o.Va()&&n.ma()&&(s=2):(o=new hc,s=n.ma()?0:1);try{switch(s){case 0:o.Aa=await r.onListen(i,!0);break;case 1:o.Aa=await r.onListen(i,!1);break;case 2:await r.onFirstRemoteStoreListen(i)}}catch(t){const r=oc(t,`Initialization of query '${Cs(n.query)}' failed`);return void n.onError(r)}r.queries.set(i,o),o.Ra.push(n),n.ga(r.onlineState),o.Aa&&n.pa(o.Aa)&&mc(r)}(t,o)}(await ru(t),t.asyncQueue,e,n,r)),r.promise
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
 */}function iu(t){const e={};return void 0!==t.timeoutSeconds&&(e.timeoutSeconds=t.timeoutSeconds),e
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
 */}const ou=new Map;
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
 */function au(t){if(!Un.isDocumentKey(t))throw new dn(ln.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function cu(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const n=(e=t).constructor?e.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var e;return"function"==typeof t?"a function":an(12329,{type:typeof t})}function uu(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new dn(ln.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=cu(t);throw new dn(ln.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
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
 */const hu="firestore.googleapis.com",lu=!0;class du{constructor(t){var e,n;if(void 0===t.host){if(void 0!==t.ssl)throw new dn(ln.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=hu,this.ssl=lu}else this.host=t.host,this.ssl=null!==(e=t.ssl)&&void 0!==e?e:lu;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,void 0===t.cacheSizeBytes)this.cacheSizeBytes=Io;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new dn(ln.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}(function(t,e,n,r){if(!0===e&&!0===r)throw new dn(ln.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)})("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===t.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=iu(null!==(n=t.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(t){if(void 0!==t.timeoutSeconds){if(isNaN(t.timeoutSeconds))throw new dn(ln.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (must not be NaN)`);if(t.timeoutSeconds<5)throw new dn(ln.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (minimum allowed value is 5)`);if(t.timeoutSeconds>30)throw new dn(ln.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(e=this.experimentalLongPollingOptions,n=t.experimentalLongPollingOptions,e.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams;var e,n}}class fu{constructor(t,e,n,r){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new du({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new dn(ln.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new dn(ln.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new du(t),this._emulatorOptions=t.emulatorOptions||{},void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new mn;switch(t.type){case"firstParty":return new wn(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new dn(ln.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=ou.get(t);e&&(nn("ComponentProvider","Removing Datastore"),ou.delete(t),e.terminate())}(this),Promise.resolve()}}function pu(t,e,n,r={}){var s;const i=(t=uu(t,fu))._getSettings(),o=Object.assign(Object.assign({},i),{emulatorOptions:t._getEmulatorOptions()}),a=`${e}:${n}`;i.host!==hu&&i.host!==a&&sn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c=Object.assign(Object.assign({},i),{host:a,ssl:!1,emulatorOptions:r});if(!lt(c,o)&&(t._setSettings(c),r.mockUserToken)){let e,n;if("string"==typeof r.mockUserToken)e=r.mockUserToken,n=Je.MOCK_USER;else{e=function(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=e||"demo-project",r=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const i=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[tt(JSON.stringify({alg:"none",type:"JWT"})),tt(JSON.stringify(i)),""].join(".")}
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
 */(r.mockUserToken,null===(s=t._app)||void 0===s?void 0:s.options.projectId);const i=r.mockUserToken.sub||r.mockUserToken.user_id;if(!i)throw new dn(ln.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new Je(i)}t._authCredentials=new gn(new pn(e,n))}}
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
 */class mu{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new mu(this.firestore,t,this._query)}}class gu{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new yu(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new gu(this.firestore,t,this._key)}}class yu extends mu{constructor(t,e,n){super(t,e,ws(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new gu(this.firestore,null,new Un(t))}withConverter(t){return new yu(this.firestore,t,this._path)}}function vu(t,e,...n){if(t=ft(t),1===arguments.length&&(e=Sn.newId()),function(t,e,n){if(!n)throw new dn(ln.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}("doc","path",e),t instanceof fu){const r=Pn.fromString(e,...n);return au(r),new gu(t,null,new Un(r))}{if(!(t instanceof gu||t instanceof yu))throw new dn(ln.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Pn.fromString(e,...n));return au(r),new gu(t.firestore,t instanceof yu?t.converter:null,new Un(r))}}
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
 */const wu="AsyncQueue";class Eu{constructor(t=Promise.resolve()){this.Qu=[],this.$u=!1,this.Uu=[],this.Ku=null,this.Wu=!1,this.Gu=!1,this.zu=[],this.y_=new ba(this,"async_queue_retry"),this.ju=()=>{const t=wa();t&&nn(wu,"Visibility state changed to "+t.visibilityState),this.y_.A_()},this.Hu=t;const e=wa();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.ju)}get isShuttingDown(){return this.$u}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Ju(),this.Yu(t)}enterRestrictedMode(t){if(!this.$u){this.$u=!0,this.Gu=t||!1;const e=wa();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.ju)}}enqueue(t){if(this.Ju(),this.$u)return new Promise(()=>{});const e=new fn;return this.Yu(()=>this.$u&&this.Gu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Qu.push(t),this.Zu()))}async Zu(){if(0!==this.Qu.length){try{await this.Qu[0](),this.Qu.shift(),this.y_.reset()}catch(t){if(!Gn(t))throw t;nn(wu,"Operation failed with retryable error: "+t)}this.Qu.length>0&&this.y_.E_(()=>this.Zu())}}Yu(t){const e=this.Hu.then(()=>(this.Wu=!0,t().catch(t=>{throw this.Ku=t,this.Wu=!1,rn("INTERNAL UNHANDLED ERROR: ",bu(t)),t}).then(t=>(this.Wu=!1,t))));return this.Hu=e,e}enqueueAfterDelay(t,e,n){this.Ju(),this.zu.indexOf(t)>-1&&(e=0);const r=ic.createAndSchedule(this,t,e,n,t=>this.Xu(t));return this.Uu.push(r),r}Ju(){this.Ku&&an(47125,{ec:bu(this.Ku)})}verifyOperationInProgress(){}async tc(){let t;do{t=this.Hu,await t}while(t!==this.Hu)}nc(t){for(const e of this.Uu)if(e.timerId===t)return!0;return!1}rc(t){return this.tc().then(()=>{this.Uu.sort((t,e)=>t.targetTimeMs-e.targetTimeMs);for(const e of this.Uu)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.tc()})}sc(t){this.zu.push(t)}Xu(t){const e=this.Uu.indexOf(t);this.Uu.splice(e,1)}}function bu(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}class Tu extends fu{constructor(t,e,n,r){super(t,e,n,r),this.type="firestore",this._queue=new Eu,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Eu(t),this._firestoreClient=void 0,await t}}}function _u(t){if(t._terminated)throw new dn(ln.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||function(t){var e,n,r;const s=t._freezeSettings(),i=(o=t._databaseId,a=(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",c=t._persistenceKey,u=s,new Er(o,a,c,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,iu(u.experimentalLongPollingOptions),u.useFetchStreams));var o,a,c,u;t._componentsProvider||(null===(n=s.localCache)||void 0===n?void 0:n._offlineComponentProvider)&&(null===(r=s.localCache)||void 0===r?void 0:r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new Zc(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(t){const e=null==t?void 0:t._online.build();return{_offline:null==t?void 0:t._offline.build(e),_online:e}}(t._componentsProvider))}
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
 */(t),t._firestoreClient}class Su{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Su(cr.fromBase64String(t))}catch(e){throw new dn(ln.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Su(cr.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
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
 */class Iu{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new dn(ln.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Fn(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
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
 */class Cu{constructor(t){this._methodName=t}}
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
 */class Au{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new dn(ln.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new dn(ln.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return In(this._lat,t._lat)||In(this._long,t._long)}}
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
 */class Du{constructor(t){this._values=(t||[]).map(t=>t)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(t[n]!==e[n])return!1;return!0}(this._values,t._values)}}
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
 */const ku=/^__.*__$/;class Nu{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new mi(t,this.data,this.fieldMask,e,this.fieldTransforms):new pi(t,this.data,e,this.fieldTransforms)}}class Ru{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new mi(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function xu(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw an(40011,{oc:t})}}class Ou{constructor(t,e,n,r,s,i){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===s&&this._c(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get oc(){return this.settings.oc}ac(t){return new Ou(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}uc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.ac({path:n,cc:!1});return r.lc(t),r}hc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.ac({path:n,cc:!1});return r._c(),r}Pc(t){return this.ac({path:void 0,cc:!0})}Tc(t){return Gu(t,this.settings.methodName,this.settings.Ic||!1,this.path,this.settings.Ec)}contains(t){return void 0!==this.fieldMask.find(e=>t.isPrefixOf(e))||void 0!==this.fieldTransforms.find(e=>t.isPrefixOf(e.field))}_c(){if(this.path)for(let t=0;t<this.path.length;t++)this.lc(this.path.get(t))}lc(t){if(0===t.length)throw this.Tc("Document fields must not be empty");if(xu(this.oc)&&ku.test(t))throw this.Tc('Document fields cannot begin and end with "__"')}}class Lu{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||Ea(t)}dc(t,e,n,r=!1){return new Ou({oc:t,methodName:e,Ec:n,path:Fn.emptyPath(),cc:!1,Ic:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Mu(t){const e=t._freezeSettings(),n=Ea(t._databaseId);return new Lu(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Pu(t,e,n,r,s,i={}){const o=t.dc(i.merge||i.mergeFields?2:0,e,n,s);$u("Data must be an object, but it was:",o,r);const a=Bu(r,o);let c,u;if(i.merge)c=new or(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const r of i.mergeFields){const s=zu(e,r,n);if(!o.contains(s))throw new dn(ln.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);Hu(t,s)||t.push(s)}c=new or(t),u=o.fieldTransforms.filter(t=>c.covers(t.field))}else c=null,u=o.fieldTransforms;return new Nu(new zr(a),c,u)}class Vu extends Cu{_toFieldTransform(t){if(2!==t.oc)throw 1===t.oc?t.Tc(`${this._methodName}() can only appear at the top level of your update data`):t.Tc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Vu}}class Fu extends Cu{constructor(t,e){super(t),this.Rc=e}_toFieldTransform(t){const e=new ei(t.serializer,Ks(t.serializer,this.Rc));return new si(t.path,e)}isEqual(t){return t instanceof Fu&&this.Rc===t.Rc}}function Uu(t,e){if(ju(t=ft(t)))return $u("Unsupported field value:",e,t),Bu(t,e);if(t instanceof Cu)return function(t,e){if(!xu(e.oc))throw e.Tc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Tc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.cc&&4!==e.oc)throw e.Tc("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const s of t){let t=Uu(s,e.Pc(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=ft(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return Ks(e.serializer,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=xn.fromDate(t);return{timestampValue:Hi(e.serializer,n)}}if(t instanceof xn){const n=new xn(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Hi(e.serializer,n)}}if(t instanceof Au)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof Su)return{bytesValue:Qi(e.serializer,t._byteString)};if(t instanceof gu){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e.Tc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Xi(t.firestore._databaseId||e.databaseId,t._key.path)}}if(t instanceof Du)return n=t,r=e,{mapValue:{fields:{[_r]:{stringValue:Cr},[Ar]:{arrayValue:{values:n.toArray().map(t=>{if("number"!=typeof t)throw r.Tc("VectorValues must only contain numeric values.");return zs(r.serializer,t)})}}}}};var n,r;throw e.Tc(`Unsupported field value: ${cu(t)}`)}(t,e)}function Bu(t,e){const n={};return tr(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Zn(t,(t,r)=>{const s=Uu(r,e.uc(t));null!=s&&(n[t]=s)}),{mapValue:{fields:n}}}function ju(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof xn||t instanceof Au||t instanceof Su||t instanceof gu||t instanceof Cu||t instanceof Du)}function $u(t,e,n){if(!ju(n)||("object"!=typeof(r=n)||null===r||Object.getPrototypeOf(r)!==Object.prototype&&null!==Object.getPrototypeOf(r))){const r=cu(n);throw"an object"===r?e.Tc(t+" a custom object"):e.Tc(t+" "+r)}var r}function zu(t,e,n){if((e=ft(e))instanceof Iu)return e._internalPath;if("string"==typeof e)return Ku(t,e);throw Gu("Field path arguments must be of type string or ",t,!1,void 0,n)}const qu=new RegExp("[~\\*/\\[\\]]");function Ku(t,e,n){if(e.search(qu)>=0)throw Gu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Iu(...e.split("."))._internalPath}catch(r){throw Gu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Gu(t,e,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new dn(ln.INVALID_ARGUMENT,a+t+c)}function Hu(t,e){return t.some(t=>t.isEqual(e))}
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
 */class Qu{constructor(t,e,n,r,s){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new gu(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new Wu(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Yu("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class Wu extends Qu{data(){return super.data()}}function Yu(t,e){return"string"==typeof e?Ku(t,e):e instanceof Iu?e._internalPath:e._delegate._internalPath}class Xu{convertValue(t,e="none"){switch(Dr(t)){case 0:return null;case 1:return t.booleanValue;case 2:return lr(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(dr(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw an(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Zn(t,(t,r)=>{n[t]=this.convertValue(r,e)}),n}convertVectorValue(t){var e,n,r;const s=null===(r=null===(n=null===(e=t.fields)||void 0===e?void 0:e[Ar].arrayValue)||void 0===n?void 0:n.values)||void 0===r?void 0:r.map(t=>lr(t.doubleValue));return new Du(s)}convertGeoPoint(t){return new Au(lr(t.latitude),lr(t.longitude))}convertArray(t,e){return(t.values||[]).map(t=>this.convertValue(t,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=vr(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(wr(t));default:return null}}convertTimestamp(t){const e=hr(t);return new xn(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Pn.fromString(t);un(vo(n),9688,{name:t});const r=new Tr(n.get(1),n.get(3)),s=new Un(n.popFirst(5));return r.isEqual(e)||rn(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}
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
class Ju{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Zu extends Qu{constructor(t,e,n,r,s,i){super(t,e,n,r,i),this._firestore=t,this._firestoreImpl=t,this.metadata=s}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new th(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Yu("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class th extends Zu{data(t={}){return super.data(t)}}
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
 */function eh(t){t=uu(t,gu);const e=uu(t.firestore,Tu);return su(_u(e),t._key).then(n=>function(t,e,n){const r=n.docs.get(e._key),s=new nh(t);return new Zu(t,s,e._key,r,new Ju(n.hasPendingWrites,n.fromCache),e.converter)}(e,t,n))}class nh extends Xu{constructor(t){super(),this.firestore=t}convertBytes(t){return new Su(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new gu(this.firestore,null,e)}}function rh(t,e,n){t=uu(t,gu);const r=uu(t.firestore,Tu),s=function(t,e){let n;return n=t?t.toFirestore(e):e,n}(t.converter,e);return ih(r,[Pu(Mu(r),"setDoc",t._key,s,null!==t.converter,n).toMutation(t._key,oi.none())])}function sh(t,e,n,...r){t=uu(t,gu);const s=uu(t.firestore,Tu),i=Mu(s);let o;return o="string"==typeof(e=ft(e))||e instanceof Iu?function(t,e,n,r,s,i){const o=t.dc(1,e,n),a=[zu(e,r,n)],c=[s];if(i.length%2!=0)throw new dn(ln.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(zu(e,i[d])),c.push(i[d+1]);const u=[],h=zr.empty();for(let d=a.length-1;d>=0;--d)if(!Hu(u,a[d])){const t=a[d];let e=c[d];e=ft(e);const n=o.hc(t);if(e instanceof Vu)u.push(t);else{const r=Uu(e,n);null!=r&&(u.push(t),h.set(t,r))}}const l=new or(u);return new Ru(h,l,o.fieldTransforms)}(i,"updateDoc",t._key,e,n,r):function(t,e,n,r){const s=t.dc(1,e,n);$u("Data must be an object, but it was:",s,r);const i=[],o=zr.empty();Zn(r,(t,r)=>{const a=Ku(e,t,n);r=ft(r);const c=s.hc(a);if(r instanceof Vu)i.push(a);else{const t=Uu(r,c);null!=t&&(i.push(a),o.set(a,t))}});const a=new or(i);return new Ru(o,a,s.fieldTransforms)}(i,"updateDoc",t._key,e),ih(s,[o.toMutation(t._key,oi.exists(!0))])}function ih(t,e){return function(t,e){const n=new fn;return t.asyncQueue.enqueueAndForget(async()=>Rc(await function(t){return nu(t).then(t=>t.syncEngine)}(t),e,n)),n.promise}(_u(t),e)}function oh(t){return new Fu("increment",t)}!function(t,e=!0){Ze="11.6.1",_e(new pt("firestore",(t,{instanceIdentifier:n,options:r})=>{const s=t.getProvider("app").getImmediate(),i=new Tu(new yn(t.getProvider("auth-internal")),new bn(s,t.getProvider("app-check-internal")),function(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new dn(ln.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Tr(t.options.projectId,e)}(s,n),s);return r=Object.assign({useFetchStreams:e},r),i._setSettings(r),i},"PUBLIC").setMultipleInstances(!0)),Ae(Ye,Xe,t),Ae(Ye,Xe,"esm2017")}();const ah=function(t){const e="object"==typeof t?t:function(t=ye){const e=we.get(t);if(!e&&t===ye&&it())return Ce();if(!e)throw Se.create("no-app",{appName:t});return e}(),n="string"==typeof t?t:br,r=function(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}(e,"firestore").getImmediate({identifier:n});if(!r._initialized){const t=st("firestore");t&&pu(r,...t)}return r}(Ce({apiKey:"AIzaSyCWhnqOzsDExtNu14s_gxUpAWeV-PPPog8",authDomain:"click-counter-4f529.firebaseapp.com",projectId:"click-counter-4f529",storageBucket:"click-counter-4f529.appspot.com",messagingSenderId:"950861743362",appId:"1:950861743362:web:77dc41eb31b34334566e1b",measurementId:"G-7EEMWQS33Z"})),ch=vu(ah,"clicks","counter"),uh=vu(ah,"terminal","stats");async function hh(){try{(await eh(uh)).exists()?await sh(uh,{totalVisits:oh(1),lastVisit:(new Date).toISOString()}):await rh(uh,{totalVisits:1,totalCommands:0,commandStats:{},lastVisit:(new Date).toISOString()})}catch(t){}}async function lh(t){try{const e=await eh(uh);if(e.exists()){const n=e.data().commandStats||{};n[t]=(n[t]||0)+1,await sh(uh,{totalCommands:oh(1),commandStats:n})}else await rh(uh,{totalVisits:0,totalCommands:1,commandStats:{[t]:1},lastVisit:(new Date).toISOString()})}catch(e){}}async function dh(){try{const t=await eh(uh);if(t.exists()){const e=t.data();return{totalVisits:e.totalVisits||0,totalCommands:e.totalCommands||0,commandStats:e.commandStats||{},lastVisit:e.lastVisit?new Date(e.lastVisit):null}}return{totalVisits:0,totalCommands:0,commandStats:{},lastVisit:null}}catch(t){return{totalVisits:0,totalCommands:0,commandStats:{},lastVisit:null}}}const fh={key:0},ph={key:1},mh={class:"nes-container is-dark with-title is-centered is-rounded"},gh=b({__name:"clickCounter",setup(t){const n=u(null),i=u(!0);async function o(){n.value++;try{await async function(){await sh(ch,{count:oh(1)})}()}catch{n.value--}}return e(async()=>{n.value=await async function(){const t=await eh(ch);return t.exists()?t.data().count:0}(),i.value=!1}),(t,e)=>(r(),s("div",null,[i.value?(r(),s("p",fh,"Loading...")):(r(),s("div",ph,[c("div",mh,[e[0]||(e[0]=c("p",{class:"title"},"Waste your time",-1)),c("button",{id:"clicker",class:"nes-btn is-normal small-font",onClick:o}," ONE CLICK AT A TIME "),c("p",null,[c("span",null,y(n.value),1)])])]))]))}},[["__scopeId","data-v-0cd637ab"]]),yh={class:"content"},vh=[{path:"/",component:()=>_(()=>import("./HeroIntro-5XmtTt-Q.js"),__vite__mapDeps([0,1,2,3,4,5,6]))},{path:"/terminal",component:()=>_(()=>import("./home-CBTyoJUG.js"),__vite__mapDeps([7,1,2,3,4,8,6]))},{path:"/about",component:()=>_(()=>import("./About-DnLl50zc.js"),__vite__mapDeps([9,1,2,3,4,10]))},{path:"/under_construction",component:b({__name:"underConstruction",setup:t=>(t,e)=>(r(),s("div",yh,[e[0]||(e[0]=c("div",{class:"nes-container is-dark is-rounded"},[c("p",null,"Under Construction"),c("img",{src:"/assets/img/construction.gif",alt:"construction GIF",class:"construction-gif"}),c("p")],-1)),d(gh)]))},[["__scopeId","data-v-5c2e00cd"]])},{path:"/secret_link",component:H},{path:"/game",component:()=>_(()=>import("./game-Dpp5zovV.js").then(t=>t.G),__vite__mapDeps([3,1,4]))},{path:"/contact",component:()=>_(()=>import("./Contact-C2WOJltI.js"),__vite__mapDeps([11,1,3,4,12]))},{path:"/sport",component:()=>_(()=>import("./sport-6OBsFATo.js"),__vite__mapDeps([13,1]))},{path:"/:pathMatch(.*)*",component:W}],wh=v({history:w("/"),routes:vh});E(G).use(wh).mount("#app");export{hh as a,dh as l,lh as t,S as u};
