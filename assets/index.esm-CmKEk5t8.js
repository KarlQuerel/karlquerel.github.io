import{F as t,q as e,t as n,u as r,v as i,w as s,x as o,l as a,e as u,y as l,L as c,i as h,z as d,S as f,h as p,C as m,r as g,g as y}from"./index.esm2017-Dnuhu9hg.js";var w,v="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function e(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(t,e,n){n||(n=0);var r=Array(16);if("string"==typeof e)for(var i=0;16>i;++i)r[i]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(i=0;16>i;++i)r[i]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],i=t.g[2];var s=t.g[3],o=e+(s^n&(i^s))+r[0]+3614090360&4294967295;o=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=(n=(i=(s=(e=n+(o<<7&4294967295|o>>>25))+((o=s+(i^e&(n^i))+r[1]+3905402710&4294967295)<<12&4294967295|o>>>20))+((o=i+(n^s&(e^n))+r[2]+606105819&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^i&(s^e))+r[3]+3250441966&4294967295)<<22&4294967295|o>>>10))+((o=e+(s^n&(i^s))+r[4]+4118548399&4294967295)<<7&4294967295|o>>>25))+((o=s+(i^e&(n^i))+r[5]+1200080426&4294967295)<<12&4294967295|o>>>20))+((o=i+(n^s&(e^n))+r[6]+2821735955&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^i&(s^e))+r[7]+4249261313&4294967295)<<22&4294967295|o>>>10))+((o=e+(s^n&(i^s))+r[8]+1770035416&4294967295)<<7&4294967295|o>>>25))+((o=s+(i^e&(n^i))+r[9]+2336552879&4294967295)<<12&4294967295|o>>>20))+((o=i+(n^s&(e^n))+r[10]+4294925233&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^i&(s^e))+r[11]+2304563134&4294967295)<<22&4294967295|o>>>10))+((o=e+(s^n&(i^s))+r[12]+1804603682&4294967295)<<7&4294967295|o>>>25))+((o=s+(i^e&(n^i))+r[13]+4254626195&4294967295)<<12&4294967295|o>>>20))+((o=i+(n^s&(e^n))+r[14]+2792965006&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^i&(s^e))+r[15]+1236535329&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^s&(n^i))+r[1]+4129170786&4294967295)<<5&4294967295|o>>>27))+((o=s+(n^i&(e^n))+r[6]+3225465664&4294967295)<<9&4294967295|o>>>23))+((o=i+(e^n&(s^e))+r[11]+643717713&4294967295)<<14&4294967295|o>>>18))+((o=n+(s^e&(i^s))+r[0]+3921069994&4294967295)<<20&4294967295|o>>>12))+((o=e+(i^s&(n^i))+r[5]+3593408605&4294967295)<<5&4294967295|o>>>27))+((o=s+(n^i&(e^n))+r[10]+38016083&4294967295)<<9&4294967295|o>>>23))+((o=i+(e^n&(s^e))+r[15]+3634488961&4294967295)<<14&4294967295|o>>>18))+((o=n+(s^e&(i^s))+r[4]+3889429448&4294967295)<<20&4294967295|o>>>12))+((o=e+(i^s&(n^i))+r[9]+568446438&4294967295)<<5&4294967295|o>>>27))+((o=s+(n^i&(e^n))+r[14]+3275163606&4294967295)<<9&4294967295|o>>>23))+((o=i+(e^n&(s^e))+r[3]+4107603335&4294967295)<<14&4294967295|o>>>18))+((o=n+(s^e&(i^s))+r[8]+1163531501&4294967295)<<20&4294967295|o>>>12))+((o=e+(i^s&(n^i))+r[13]+2850285829&4294967295)<<5&4294967295|o>>>27))+((o=s+(n^i&(e^n))+r[2]+4243563512&4294967295)<<9&4294967295|o>>>23))+((o=i+(e^n&(s^e))+r[7]+1735328473&4294967295)<<14&4294967295|o>>>18))+((o=n+(s^e&(i^s))+r[12]+2368359562&4294967295)<<20&4294967295|o>>>12))+((o=e+(n^i^s)+r[5]+4294588738&4294967295)<<4&4294967295|o>>>28))+((o=s+(e^n^i)+r[8]+2272392833&4294967295)<<11&4294967295|o>>>21))+((o=i+(s^e^n)+r[11]+1839030562&4294967295)<<16&4294967295|o>>>16))+((o=n+(i^s^e)+r[14]+4259657740&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^i^s)+r[1]+2763975236&4294967295)<<4&4294967295|o>>>28))+((o=s+(e^n^i)+r[4]+1272893353&4294967295)<<11&4294967295|o>>>21))+((o=i+(s^e^n)+r[7]+4139469664&4294967295)<<16&4294967295|o>>>16))+((o=n+(i^s^e)+r[10]+3200236656&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^i^s)+r[13]+681279174&4294967295)<<4&4294967295|o>>>28))+((o=s+(e^n^i)+r[0]+3936430074&4294967295)<<11&4294967295|o>>>21))+((o=i+(s^e^n)+r[3]+3572445317&4294967295)<<16&4294967295|o>>>16))+((o=n+(i^s^e)+r[6]+76029189&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^i^s)+r[9]+3654602809&4294967295)<<4&4294967295|o>>>28))+((o=s+(e^n^i)+r[12]+3873151461&4294967295)<<11&4294967295|o>>>21))+((o=i+(s^e^n)+r[15]+530742520&4294967295)<<16&4294967295|o>>>16))+((o=n+(i^s^e)+r[2]+3299628645&4294967295)<<23&4294967295|o>>>9))+((o=e+(i^(n|~s))+r[0]+4096336452&4294967295)<<6&4294967295|o>>>26))+((o=s+(n^(e|~i))+r[7]+1126891415&4294967295)<<10&4294967295|o>>>22))+((o=i+(e^(s|~n))+r[14]+2878612391&4294967295)<<15&4294967295|o>>>17))+((o=n+(s^(i|~e))+r[5]+4237533241&4294967295)<<21&4294967295|o>>>11))+((o=e+(i^(n|~s))+r[12]+1700485571&4294967295)<<6&4294967295|o>>>26))+((o=s+(n^(e|~i))+r[3]+2399980690&4294967295)<<10&4294967295|o>>>22))+((o=i+(e^(s|~n))+r[10]+4293915773&4294967295)<<15&4294967295|o>>>17))+((o=n+(s^(i|~e))+r[1]+2240044497&4294967295)<<21&4294967295|o>>>11))+((o=e+(i^(n|~s))+r[8]+1873313359&4294967295)<<6&4294967295|o>>>26))+((o=s+(n^(e|~i))+r[15]+4264355552&4294967295)<<10&4294967295|o>>>22))+((o=i+(e^(s|~n))+r[6]+2734768916&4294967295)<<15&4294967295|o>>>17))+((o=n+(s^(i|~e))+r[13]+1309151649&4294967295)<<21&4294967295|o>>>11))+((s=(e=n+((o=e+(i^(n|~s))+r[4]+4149444226&4294967295)<<6&4294967295|o>>>26))+((o=s+(n^(e|~i))+r[11]+3174756917&4294967295)<<10&4294967295|o>>>22))^((i=s+((o=i+(e^(s|~n))+r[2]+718787259&4294967295)<<15&4294967295|o>>>17))|~e))+r[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(i+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+i&4294967295,t.g[3]=t.g[3]+s&4294967295}function r(t,e){this.h=e;for(var n=[],r=!0,i=t.length-1;0<=i;i--){var s=0|t[i];r&&s==e||(n[i]=s,r=!1)}this.g=n}!function(t,e){function n(){}n.prototype=e.prototype,t.D=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.C=function(t,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return e.prototype[n].apply(t,i)}}(e,function(){this.blockSize=-1}),e.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.u=function(t,e){void 0===e&&(e=t.length);for(var r=e-this.blockSize,i=this.B,s=this.h,o=0;o<e;){if(0==s)for(;o<=r;)n(this,t,o),o+=this.blockSize;if("string"==typeof t){for(;o<e;)if(i[s++]=t.charCodeAt(o++),s==this.blockSize){n(this,i),s=0;break}}else for(;o<e;)if(i[s++]=t[o++],s==this.blockSize){n(this,i),s=0;break}}this.h=s,this.o+=e},e.prototype.v=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.o;for(e=t.length-8;e<t.length;++e)t[e]=255&n,n/=256;for(this.u(t),t=Array(16),e=n=0;4>e;++e)for(var r=0;32>r;r+=8)t[n++]=this.g[e]>>>r&255;return t};var i={};function s(t){return-128<=t&&128>t?function(t,e){var n=i;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,function(t){return new r([0|t],0>t?-1:0)}):new r([0|t],0>t?-1:0)}function o(t){if(isNaN(t)||!isFinite(t))return a;if(0>t)return d(o(-t));for(var e=[],n=1,i=0;t>=n;i++)e[i]=t/n|0,n*=4294967296;return new r(e,0)}var a=s(0),u=s(1),l=s(16777216);function c(t){if(0!=t.h)return!1;for(var e=0;e<t.g.length;e++)if(0!=t.g[e])return!1;return!0}function h(t){return-1==t.h}function d(t){for(var e=t.g.length,n=[],i=0;i<e;i++)n[i]=~t.g[i];return new r(n,~t.h).add(u)}function f(t,e){return t.add(d(e))}function p(t,e){for(;(65535&t[e])!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function m(t,e){this.g=t,this.h=e}function g(t,e){if(c(e))throw Error("division by zero");if(c(t))return new m(a,a);if(h(t))return e=g(d(t),e),new m(d(e.g),d(e.h));if(h(e))return e=g(t,d(e)),new m(d(e.g),e.h);if(30<t.g.length){if(h(t)||h(e))throw Error("slowDivide_ only works with positive integers.");for(var n=u,r=e;0>=r.l(t);)n=y(n),r=y(r);var i=v(n,1),s=v(r,1);for(r=v(r,2),n=v(n,2);!c(r);){var l=s.add(r);0>=l.l(t)&&(i=i.add(n),s=l),r=v(r,1),n=v(n,1)}return e=f(t,i.j(e)),new m(i,e)}for(i=a;0<=t.l(e);){for(n=Math.max(1,Math.floor(t.m()/e.m())),r=48>=(r=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,r-48),l=(s=o(n)).j(e);h(l)||0<l.l(t);)l=(s=o(n-=r)).j(e);c(s)&&(s=u),i=i.add(s),t=f(t,l)}return new m(i,t)}function y(t){for(var e=t.g.length+1,n=[],i=0;i<e;i++)n[i]=t.i(i)<<1|t.i(i-1)>>>31;return new r(n,t.h)}function v(t,e){var n=e>>5;e%=32;for(var i=t.g.length-n,s=[],o=0;o<i;o++)s[o]=0<e?t.i(o+n)>>>e|t.i(o+n+1)<<32-e:t.i(o+n);return new r(s,t.h)}(t=r.prototype).m=function(){if(h(this))return-d(this).m();for(var t=0,e=1,n=0;n<this.g.length;n++){var r=this.i(n);t+=(0<=r?r:4294967296+r)*e,e*=4294967296}return t},t.toString=function(t){if(2>(t=t||10)||36<t)throw Error("radix out of range: "+t);if(c(this))return"0";if(h(this))return"-"+d(this).toString(t);for(var e=o(Math.pow(t,6)),n=this,r="";;){var i=g(n,e).g,s=((0<(n=f(n,i.j(e))).g.length?n.g[0]:n.h)>>>0).toString(t);if(c(n=i))return s+r;for(;6>s.length;)s="0"+s;r=s+r}},t.i=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h},t.l=function(t){return h(t=f(this,t))?-1:c(t)?0:1},t.abs=function(){return h(this)?d(this):this},t.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],i=0,s=0;s<=e;s++){var o=i+(65535&this.i(s))+(65535&t.i(s)),a=(o>>>16)+(this.i(s)>>>16)+(t.i(s)>>>16);i=a>>>16,o&=65535,a&=65535,n[s]=a<<16|o}return new r(n,-2147483648&n[n.length-1]?-1:0)},t.j=function(t){if(c(this)||c(t))return a;if(h(this))return h(t)?d(this).j(d(t)):d(d(this).j(t));if(h(t))return d(this.j(d(t)));if(0>this.l(l)&&0>t.l(l))return o(this.m()*t.m());for(var e=this.g.length+t.g.length,n=[],i=0;i<2*e;i++)n[i]=0;for(i=0;i<this.g.length;i++)for(var s=0;s<t.g.length;s++){var u=this.i(i)>>>16,f=65535&this.i(i),m=t.i(s)>>>16,g=65535&t.i(s);n[2*i+2*s]+=f*g,p(n,2*i+2*s),n[2*i+2*s+1]+=u*g,p(n,2*i+2*s+1),n[2*i+2*s+1]+=f*m,p(n,2*i+2*s+1),n[2*i+2*s+2]+=u*m,p(n,2*i+2*s+2)}for(i=0;i<e;i++)n[i]=n[2*i+1]<<16|n[2*i];for(i=e;i<2*e;i++)n[i]=0;return new r(n,0)},t.A=function(t){return g(this,t).h},t.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],i=0;i<e;i++)n[i]=this.i(i)&t.i(i);return new r(n,this.h&t.h)},t.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],i=0;i<e;i++)n[i]=this.i(i)|t.i(i);return new r(n,this.h|t.h)},t.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],i=0;i<e;i++)n[i]=this.i(i)^t.i(i);return new r(n,this.h^t.h)},e.prototype.digest=e.prototype.v,e.prototype.reset=e.prototype.s,e.prototype.update=e.prototype.u,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.A,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=o,r.fromString=function t(e,n){if(0==e.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==e.charAt(0))return d(t(e.substring(1),n));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var r=o(Math.pow(n,8)),i=a,s=0;s<e.length;s+=8){var u=Math.min(8,e.length-s),l=parseInt(e.substring(s,s+u),n);8>u?(u=o(Math.pow(n,u)),i=i.j(u).add(o(l))):i=(i=i.j(r)).add(o(l))}return i},w=r}).apply(void 0!==v?v:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const _="4.7.17";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}b.UNAUTHENTICATED=new b(null),b.GOOGLE_CREDENTIALS=new b("google-credentials-uid"),b.FIRST_PARTY=new b("first-party-uid"),b.MOCK_USER=new b("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
let T="11.9.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E=new c("@firebase/firestore");function S(t){E.setLogLevel(t)}function k(t,...e){if(E.logLevel<=d.DEBUG){const n=e.map(V);E.debug(`Firestore (${T}): ${t}`,...n)}}function A(t,...e){if(E.logLevel<=d.ERROR){const n=e.map(V);E.error(`Firestore (${T}): ${t}`,...n)}}function I(t,...e){if(E.logLevel<=d.WARN){const n=e.map(V);E.warn(`Firestore (${T}): ${t}`,...n)}}function V(t){if("string"==typeof t)return t;try{
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
 */function x(t,e,n){let r="Unexpected state";"string"==typeof e?r=e:n=e,N(t,r,n)}function N(t,e,n){let r=`FIRESTORE (${T}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(i){r+=" CONTEXT: "+n}throw A(r),new Error(r)}function F(t,e,n,r){let i="Unexpected state";"string"==typeof n?i=n:r=n,t||N(e,i,r)}function D(t,e){return t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P="ok",O="cancelled",R="unknown",q="invalid-argument",C="deadline-exceeded",M="not-found",L="permission-denied",$="unauthenticated",U="resource-exhausted",j="failed-precondition",z="aborted",B="out-of-range",G="unimplemented",K="internal",Q="unavailable";class H extends t{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class J{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(b.UNAUTHENTICATED))}shutdown(){}}class X{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Z{constructor(t){this.auth=null,t.onInit(t=>{this.auth=t})}getToken(){return this.auth?this.auth.getToken().then(t=>t?(F("string"==typeof t.accessToken,42297,{t:t}),new Y(t.accessToken,new b(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}}class tt{constructor(t,e,n){this.i=t,this.o=e,this.u=n,this.type="FirstParty",this.user=b.FIRST_PARTY,this.l=new Map}h(){return this.u?this.u():null}get headers(){this.l.set("X-Goog-AuthUser",this.i);const t=this.h();return t&&this.l.set("Authorization",t),this.o&&this.l.set("X-Goog-Iam-Authorization-Token",this.o),this.l}}class et{constructor(t,e,n){this.i=t,this.o=e,this.u=n}getToken(){return Promise.resolve(new tt(this.i,this.o,this.u))}start(t,e){t.enqueueRetryable(()=>e(b.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class nt{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class rt{constructor(t,e){this.m=e,this.appCheck=null,this.T=null,y(t)&&t.settings.appCheckToken&&(this.T=t.settings.appCheckToken),e.onInit(t=>{this.appCheck=t})}getToken(){return this.T?Promise.resolve(new nt(this.T)):this.appCheck?this.appCheck.getToken().then(t=>t?(F("string"==typeof t.token,3470,{tokenResult:t}),new nt(t.token)):null):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(t,e,n,r,i,s,o,a,u,l){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=u,this.isUsingEmulator=l}}const st="(default)";class ot{constructor(t,e){this.projectId=t,this.database=e||st}static empty(){return new ot("","")}get isDefaultDatabase(){return this.database===st}isEqual(t){return t instanceof ot&&t.projectId===this.projectId&&t.database===this.database}}
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
 */function at(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}
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
 */class ut{static newId(){const t=62*Math.floor(256/62);let e="";for(;e.length<20;){const n=at(40);for(let r=0;r<n.length;++r)e.length<20&&n[r]<t&&(e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return e}}function lt(t,e){return t<e?-1:t>e?1:0}function ct(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=t.codePointAt(n),i=e.codePointAt(n);if(r!==i){if(r<128&&i<128)return lt(r,i);{const s=new TextEncoder,o=dt(s.encode(ht(t,n)),s.encode(ht(e,n)));return 0!==o?o:lt(r,i)}}n+=r>65535?2:1}return lt(t.length,e.length)}function ht(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function dt(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return lt(t[n],e[n]);return lt(t.length,e.length)}function ft(t,e,n){return t.length===e.length&&t.every((t,r)=>n(t,e[r]))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt="__name__";class mt{constructor(t,e,n){void 0===e?e=0:e>t.length&&x(637,{offset:e,range:t.length}),void 0===n?n=t.length-e:n>t.length-e&&x(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===mt.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof mt?t.forEach(t=>{e.push(t)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=mt.compareSegments(t.get(r),e.get(r));if(0!==n)return n}return lt(t.length,e.length)}static compareSegments(t,e){const n=mt.isNumericId(t),r=mt.isNumericId(e);return n&&!r?-1:!n&&r?1:n&&r?mt.extractNumericId(t).compare(mt.extractNumericId(e)):ct(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return w.fromString(t.substring(4,t.length-2))}}class gt extends mt{construct(t,e,n){return new gt(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new H(q,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(t=>t.length>0))}return new gt(e)}static emptyPath(){return new gt([])}}const yt=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class wt extends mt{construct(t,e,n){return new wt(t,e,n)}static isValidIdentifier(t){return yt.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),wt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===pt}static keyField(){return new wt([pt])}static fromServerFormat(t){const e=[];let n="",r=0;const i=()=>{if(0===n.length)throw new H(q,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let s=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new H(q,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new H(q,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(s=!s,r++):"."!==e||s?(n+=e,r++):(i(),r++)}if(i(),s)throw new H(q,"Unterminated ` in path: "+t);return new wt(e)}static emptyPath(){return new wt([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(t){this.path=t}static fromPath(t){return new vt(gt.fromString(t))}static fromName(t){return new vt(gt.fromString(t).popFirst(5))}static empty(){return new vt(gt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return null!==t&&0===gt.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return gt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new vt(new gt(t.slice()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(t,e,n){if(!n)throw new H(q,`Function ${t}() cannot be called with an empty ${e}.`)}function bt(t){if(!vt.isDocumentKey(t))throw new H(q,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Tt(t){if(vt.isDocumentKey(t))throw new H(q,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Et(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const n=(e=t).constructor?e.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var e;return"function"==typeof t?"a function":x(12329,{type:typeof t})}function St(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new H(q,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Et(t);throw new H(q,`Expected type '${e.name}', but it was: ${n}`)}}return t}function kt(t,e){if(e<=0)throw new H(q,`Function ${t}() requires a positive number, but it was: ${e}.`)}
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
 */function At(t){const e={};return void 0!==t.timeoutSeconds&&(e.timeoutSeconds=t.timeoutSeconds),e
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
 */}let It=null;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
function Vt(t){return null==t}function xt(t){return 0===t&&1/t==-1/0}
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
 */const Nt="RestConnection",Ft={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Dt{get A(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.P=e+"://"+t.host,this.R=`projects/${n}/databases/${r}`,this.I=this.databaseId.database===st?`project_id=${n}`:`project_id=${n}&database_id=${r}`}V(t,e,n,i,s){const o=(null===It?It=268435456+Math.round(2147483648*Math.random()):It++,"0x"+It.toString(16)),a=this.p(t,e.toUriEncodedString());k(Nt,`Sending RPC '${t}' ${o}:`,a,n);const u={"google-cloud-resource-prefix":this.R,"x-goog-request-params":this.I};this.F(u,i,s);const{host:l}=new URL(a),c=r(l);return this.v(t,a,u,n,c).then(e=>(k(Nt,`Received RPC '${t}' ${o}: `,e),e),e=>{throw I(Nt,`RPC '${t}' ${o} failed with error: `,e,"url: ",a,"request:",n),e})}D(t,e,n,r,i,s){return this.V(t,e,n,r,i)}F(t,e,n){t["X-Goog-Api-Client"]="gl-js/ fire/"+T,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((e,n)=>t[n]=e),n&&n.headers.forEach((e,n)=>t[n]=e)}p(t,e){const n=Ft[t];return`${this.P}/v1/${e}:${n}`}terminate(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pt,Ot;function Rt(t){if(void 0===t)return A("RPC_ERROR","HTTP error has no status"),R;switch(t){case 200:return P;case 400:return j;case 401:return $;case 403:return L;case 404:return M;case 409:return z;case 416:return B;case 429:return U;case 499:return O;case 500:return R;case 501:return G;case 503:return Q;case 504:return C;default:return t>=200&&t<300?P:t>=400&&t<500?j:t>=500&&t<600?K:R}}
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
 */(Ot=Pt||(Pt={}))[Ot.OK=0]="OK",Ot[Ot.CANCELLED=1]="CANCELLED",Ot[Ot.UNKNOWN=2]="UNKNOWN",Ot[Ot.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ot[Ot.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ot[Ot.NOT_FOUND=5]="NOT_FOUND",Ot[Ot.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ot[Ot.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ot[Ot.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ot[Ot.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ot[Ot.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ot[Ot.ABORTED=10]="ABORTED",Ot[Ot.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ot[Ot.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ot[Ot.INTERNAL=13]="INTERNAL",Ot[Ot.UNAVAILABLE=14]="UNAVAILABLE",Ot[Ot.DATA_LOSS=15]="DATA_LOSS";class qt extends Dt{C(t,e){throw new Error("Not supported by FetchConnection")}async v(t,e,n,r,i){var s;const o=JSON.stringify(r);let a;try{const t={method:"POST",headers:n,body:o};i&&(t.credentials="include"),a=await fetch(e,t)}catch(u){const t=u;throw new H(Rt(t.status),"Request failed with error: "+t.statusText)}if(!a.ok){let t=await a.json();Array.isArray(t)&&(t=t[0]);const e=null===(s=null==t?void 0:t.error)||void 0===s?void 0:s.message;throw new H(Rt(a.status),`Request failed with error: ${null!=e?e:a.statusText}`)}return a.json()}}
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
 */class Ct{constructor(t,e,n){this.alias=t,this.aggregateType=e,this.fieldPath=n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Lt(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}
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
 */class $t extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
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
 */class Ut{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(t){try{return atob(t)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new $t("Invalid base64 string: "+e):e}}(t);return new Ut(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new Ut(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return lt(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Ut.EMPTY_BYTE_STRING=new Ut("");const jt=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function zt(t){if(F(!!t,39018),"string"==typeof t){let e=0;const n=jt.exec(t);if(F(!!n,46558,{timestamp:t}),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Bt(t.seconds),nanos:Bt(t.nanos)}}function Bt(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function Gt(t){return"string"==typeof t?Ut.fromBase64String(t):Ut.fromUint8Array(t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kt=-62135596800,Qt=1e6;class Ht{static now(){return Ht.fromMillis(Date.now())}static fromDate(t){return Ht.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Qt);return new Ht(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new H(q,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new H(q,"Timestamp nanoseconds out of range: "+e);if(t<Kt)throw new H(q,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new H(q,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Qt}_compareTo(t){return this.seconds===t.seconds?lt(this.nanoseconds,t.nanoseconds):lt(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-Kt;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
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
 */function Wt(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function Yt(t){const e=t.mapValue.fields.__previous_value__;return Wt(e)?Yt(e):e}function Jt(t){const e=zt(t.mapValue.fields.__local_write_time__.timestampValue);return new Ht(e.seconds,e.nanos)}
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
 */const Xt="__type__",Zt={},te="__vector__",ee="value";function ne(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Wt(t)?4:"__max__"===(((t.mapValue||{}).fields||{}).__type__||{}).stringValue?9007199254740991:function(t){var e,n;return(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{})[Xt])||void 0===n?void 0:n.stringValue)===te}(t)?10:11:x(28295,{value:t})}function re(t,e){if(t===e)return!0;const n=ne(t);if(n!==ne(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Jt(t).isEqual(Jt(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=zt(t.timestampValue),r=zt(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return r=e,Gt(t.bytesValue).isEqual(Gt(r.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return Bt(t.geoPointValue.latitude)===Bt(e.geoPointValue.latitude)&&Bt(t.geoPointValue.longitude)===Bt(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return Bt(t.integerValue)===Bt(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=Bt(t.doubleValue),r=Bt(e.doubleValue);return n===r?xt(n)===xt(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return ft(t.arrayValue.values||[],e.arrayValue.values||[],re);case 10:case 11:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(Mt(n)!==Mt(r))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!re(n[i],r[i])))return!1;return!0}(t,e);default:return x(52216,{left:t})}var r}function ie(t,e){return void 0!==(t.values||[]).find(t=>re(t,e))}function se(t,e){if(t===e)return 0;const n=ne(t),r=ne(e);if(n!==r)return lt(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return lt(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=Bt(t.integerValue||t.doubleValue),r=Bt(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return oe(t.timestampValue,e.timestampValue);case 4:return oe(Jt(t),Jt(e));case 5:return ct(t.stringValue,e.stringValue);case 6:return function(t,e){const n=Gt(t),r=Gt(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let i=0;i<n.length&&i<r.length;i++){const t=lt(n[i],r[i]);if(0!==t)return t}return lt(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=lt(Bt(t.latitude),Bt(e.latitude));return 0!==n?n:lt(Bt(t.longitude),Bt(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return ae(t.arrayValue,e.arrayValue);case 10:return function(t,e){var n,r,i,s;const o=t.fields||{},a=e.fields||{},u=null===(n=o[ee])||void 0===n?void 0:n.arrayValue,l=null===(r=a[ee])||void 0===r?void 0:r.arrayValue,c=lt((null===(i=null==u?void 0:u.values)||void 0===i?void 0:i.length)||0,(null===(s=null==l?void 0:l.values)||void 0===s?void 0:s.length)||0);return 0!==c?c:ae(u,l)}(t.mapValue,e.mapValue);case 11:return function(t,e){if(t===Zt&&e===Zt)return 0;if(t===Zt)return 1;if(e===Zt)return-1;const n=t.fields||{},r=Object.keys(n),i=e.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let o=0;o<r.length&&o<s.length;++o){const t=ct(r[o],s[o]);if(0!==t)return t;const e=se(n[r[o]],i[s[o]]);if(0!==e)return e}return lt(r.length,s.length)}(t.mapValue,e.mapValue);default:throw x(23264,{S:n})}}function oe(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return lt(t,e);const n=zt(t),r=zt(e),i=lt(n.seconds,r.seconds);return 0!==i?i:lt(n.nanos,r.nanos)}function ae(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const t=se(n[i],r[i]);if(t)return t}return lt(n.length,r.length)}function ue(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function le(t){return!!t&&"arrayValue"in t}function ce(t){return!!t&&"nullValue"in t}function he(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function de(t){return!!t&&"mapValue"in t}function fe(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Lt(t.mapValue.fields,(t,n)=>e.mapValue.fields[t]=fe(n)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=fe(t.arrayValue.values[n]);return e}return Object.assign({},t)}class pe{constructor(t,e){this.position=t,this.inclusive=e}}function me(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!re(t.position[n],e.position[n]))return!1;return!0}
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
 */class ge{}class ye extends ge{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.createKeyFieldInFilter(t,e,n):new _e(t,e,n):"array-contains"===e?new Se(t,n):"in"===e?new ke(t,n):"not-in"===e?new Ae(t,n):"array-contains-any"===e?new Ie(t,n):new ye(t,e,n)}static createKeyFieldInFilter(t,e,n){return"in"===e?new be(t,n):new Te(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&void 0===e.nullValue&&this.matchesComparison(se(e,this.value)):null!==e&&ne(this.value)===ne(e)&&this.matchesComparison(se(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return x(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class we extends ge{constructor(t,e){super(),this.filters=t,this.op=e,this.N=null}static create(t,e){return new we(t,e)}matches(t){return"and"===this.op?void 0===this.filters.find(e=>!e.matches(t)):void 0!==this.filters.find(e=>e.matches(t))}getFlattenedFilters(){return null!==this.N||(this.N=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.N}getFilters(){return Object.assign([],this.filters)}}function ve(t,e){return t instanceof ye?(n=t,(r=e)instanceof ye&&n.op===r.op&&n.field.isEqual(r.field)&&re(n.value,r.value)):t instanceof we?function(t,e){return e instanceof we&&t.op===e.op&&t.filters.length===e.filters.length&&t.filters.reduce((t,n,r)=>t&&ve(n,e.filters[r]),!0)}(t,e):void x(19439);var n,r}class _e extends ye{constructor(t,e,n){super(t,e,n),this.key=vt.fromName(n.referenceValue)}matches(t){const e=vt.comparator(t.key,this.key);return this.matchesComparison(e)}}class be extends ye{constructor(t,e){super(t,"in",e),this.keys=Ee("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Te extends ye{constructor(t,e){super(t,"not-in",e),this.keys=Ee("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Ee(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map(t=>vt.fromName(t.referenceValue))}class Se extends ye{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return le(e)&&ie(e.arrayValue,this.value)}}class ke extends ye{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&ie(this.value.arrayValue,e)}}class Ae extends ye{constructor(t,e){super(t,"not-in",e)}matches(t){if(ie(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&void 0===e.nullValue&&!ie(this.value.arrayValue,e)}}class Ie extends ye{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!le(e)||!e.arrayValue.values)&&e.arrayValue.values.some(t=>ie(this.value.arrayValue,t))}}
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
 */class Ve{constructor(t,e="asc"){this.field=t,this.dir=e}}function xe(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{static fromTimestamp(t){return new Ne(t)}static min(){return new Ne(new Ht(0,0))}static max(){return new Ne(new Ht(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(t,e){this.comparator=t,this.root=e||Pe.EMPTY}insert(t,e){return new Fe(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Pe.BLACK,null,null))}remove(t){return new Fe(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Pe.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new De(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new De(this.root,t,this.comparator,!1)}getReverseIterator(){return new De(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new De(this.root,t,this.comparator,!0)}}class De{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&r&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(0===i){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Pe{constructor(t,e,n,r,i){this.key=t,this.value=e,this.color=null!=n?n:Pe.RED,this.left=null!=r?r:Pe.EMPTY,this.right=null!=i?i:Pe.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,i){return new Pe(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const i=n(t,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===i?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Pe.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return Pe.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Pe.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Pe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw x(43730,{key:this.key,value:this.value});if(this.right.isRed())throw x(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw x(27949);return t+(this.isRed()?0:1)}}Pe.EMPTY=null,Pe.RED=!0,Pe.BLACK=!1,Pe.EMPTY=new class{constructor(){this.size=0}get key(){throw x(57766)}get value(){throw x(16141)}get color(){throw x(16727)}get left(){throw x(29726)}get right(){throw x(36894)}copy(t,e,n,r,i){return this}insert(t,e,n){return new Pe(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
class Oe{constructor(t){this.comparator=t,this.data=new Fe(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Re(this.data.getIterator())}getIteratorFrom(t){return new Re(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(t=>{e=e.add(t)}),e}isEqual(t){if(!(t instanceof Oe))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new Oe(this.comparator);return e.data=t,e}}class Re{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
 */class qe{constructor(t){this.fields=t,t.sort(wt.comparator)}static empty(){return new qe([])}unionWith(t){let e=new Oe(wt.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new qe(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return ft(this.fields,t.fields,(t,e)=>t.isEqual(e))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(t){this.value=t}static empty(){return new Ce({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!de(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=fe(e)}setAll(t){let e=wt.emptyPath(),n={},r=[];t.forEach((t,i)=>{if(!e.isImmediateParentOf(i)){const t=this.getFieldsMap(e);this.applyChanges(t,n,r),n={},r=[],e=i.popLast()}t?n[i.lastSegment()]=fe(t):r.push(i.lastSegment())});const i=this.getFieldsMap(e);this.applyChanges(i,n,r)}delete(t){const e=this.field(t.popLast());de(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return re(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let r=e.mapValue.fields[t.get(n)];de(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,n){Lt(e,(e,n)=>t[e]=n);for(const r of n)delete t[r]}clone(){return new Ce(fe(this.value))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(t,e,n,r,i,s,o){this.key=t,this.documentType=e,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=o}static newInvalidDocument(t){return new Me(t,0,Ne.min(),Ne.min(),Ne.min(),Ce.empty(),0)}static newFoundDocument(t,e,n,r){return new Me(t,1,e,Ne.min(),n,r,0)}static newNoDocument(t,e){return new Me(t,2,e,Ne.min(),Ne.min(),Ce.empty(),0)}static newUnknownDocument(t,e){return new Me(t,3,e,Ne.min(),Ne.min(),Ce.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(Ne.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Ce.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Ce.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Ne.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof Me&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class Le{constructor(t,e=null,n=[],r=[],i=null,s=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.O=null}}function $e(t,e=null,n=[],r=[],i=null,s=null,o=null){return new Le(t,e,n,r,i,s,o)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(t,e=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.q=null,this.B=null,this.$=null,this.startAt,this.endAt}}function je(t){return null!==t.collectionGroup}function ze(t){const e=D(t);if(null===e.q){e.q=[];const t=new Set;for(const r of e.explicitOrderBy)e.q.push(r),t.add(r.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(t){let e=new Oe(wt.comparator);return t.filters.forEach(t=>{t.getFlattenedFilters().forEach(t=>{t.isInequality()&&(e=e.add(t.field))})}),e})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.q.push(new Ve(r,n))}),t.has(wt.keyField().canonicalString())||e.q.push(new Ve(wt.keyField(),n))}return e.q}function Be(t){const e=D(t);return e.B||(e.B=Ge(e,ze(t))),e.B}function Ge(t,e){if("F"===t.limitType)return $e(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(t=>{const e="desc"===t.dir?"asc":"desc";return new Ve(t.field,e)});const n=t.endAt?new pe(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new pe(t.startAt.position,t.startAt.inclusive):null;return $e(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Ke(t,e){const n=t.filters.concat([e]);return new Ue(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}
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
function Qe(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:xt(e)?"-0":e}}function He(t,e){return"number"==typeof(n=e)&&Number.isInteger(n)&&!xt(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER?function(t){return{integerValue:""+t}}(e):Qe(t,e);var n}
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
 */class We{constructor(){this._=void 0}}class Ye extends We{}class Je extends We{constructor(t){super(),this.elements=t}}class Xe extends We{constructor(t){super(),this.elements=t}}class Ze extends We{constructor(t,e){super(),this.serializer=t,this.L=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(t,e){this.field=t,this.transform=e}}class en{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new en}static exists(t){return new en(void 0,t)}static updateTime(t){return new en(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}class nn{}class rn extends nn{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class sn extends nn{constructor(t,e,n,r,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}class on extends nn{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class an extends nn{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),ln=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),cn=(()=>({and:"AND",or:"OR"}))();class hn{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function dn(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function fn(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function pn(t,e){return dn(t,e.toTimestamp())}function mn(t){return F(!!t,49232),Ne.fromTimestamp(function(t){const e=zt(t);return new Ht(e.seconds,e.nanos)}(t))}function gn(t,e){return yn(t,e).canonicalString()}function yn(t,e){const n=(r=t,new gt(["projects",r.projectId,"databases",r.database])).child("documents");var r;return void 0===e?n:n.child(e)}function wn(t,e){return gn(t.databaseId,e.path)}function vn(t,e){const n=function(t){const e=gt.fromString(t);return F(Vn(e),10190,{key:e.toString()}),e}(e);if(n.get(1)!==t.databaseId.projectId)throw new H(q,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new H(q,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new vt((F((r=n).length>4&&"documents"===r.get(4),29091,{key:r.toString()}),r.popFirst(5)));var r}function _n(t,e,n){return{name:wn(t,e),fields:n.value.mapValue.fields}}function bn(t,e){const n={structuredQuery:{}},r=e.path;let i;var s;null!==e.collectionGroup?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=(s=i,gn(t.databaseId,s));const o=function(t){if(0!==t.length)return An(we.create(t,"and"))}(e.filters);o&&(n.structuredQuery.where=o);const a=function(t){if(0!==t.length)return t.map(t=>{return{field:kn((e=t).field),direction:Tn(e.dir)};var e})}(e.orderBy);a&&(n.structuredQuery.orderBy=a);const u=function(t,e){return t.useProto3Json||Vt(e)?e:{value:e}}(t,e.limit);return null!==u&&(n.structuredQuery.limit=u),e.startAt&&(n.structuredQuery.startAt=function(t){return{before:t.inclusive,values:t.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(t){return{before:!t.inclusive,values:t.position}}(e.endAt)),{M:n,parent:i}}function Tn(t){return un[t]}function En(t){return ln[t]}function Sn(t){return cn[t]}function kn(t){return{fieldPath:t.canonicalString()}}function An(t){return t instanceof ye?function(t){if("=="===t.op){if(he(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NAN"}};if(ce(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(he(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NOT_NAN"}};if(ce(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:kn(t.field),op:En(t.op),value:t.value}}}(t):t instanceof we?function(t){const e=t.getFilters().map(t=>An(t));return 1===e.length?e[0]:{compositeFilter:{op:Sn(t.op),filters:e}}}(t):x(54877,{filter:t})}function In(t){const e=[];return t.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Vn(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
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
 */function xn(t){return new hn(t,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(t,e,n=1e3,r=1.5,i=6e4){this.U=t,this.timerId=e,this.j=n,this.W=r,this.K=i,this.G=0,this.H=null,this.J=Date.now(),this.reset()}reset(){this.G=0}Y(){this.G=this.K}Z(t){this.cancel();const e=Math.floor(this.G+this.X()),n=Math.max(0,Date.now()-this.J),r=Math.max(0,e-n);r>0&&k("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.G} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.H=this.U.enqueueAfterDelay(this.timerId,r,()=>(this.J=Date.now(),t())),this.G*=this.W,this.G<this.j&&(this.G=this.j),this.G>this.K&&(this.G=this.K)}tt(){null!==this.H&&(this.H.skipDelay(),this.H=null)}cancel(){null!==this.H&&(this.H.cancel(),this.H=null)}X(){return(Math.random()-.5)*this.G}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{}class Dn extends Fn{constructor(t,e,n,r){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=r,this.et=!1}rt(){if(this.et)throw new H(j,"The client has already been terminated.")}V(t,e,n,r){return this.rt(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.V(t,yn(e,n),r,i,s)).catch(t=>{throw"FirebaseError"===t.name?(t.code===$&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new H(R,t.toString())})}D(t,e,n,r,i){return this.rt(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.D(t,yn(e,n),r,s,o,i)).catch(t=>{throw"FirebaseError"===t.name?(t.code===$&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new H(R,t.toString())})}terminate(){this.et=!0,this.connection.terminate()}}async function Pn(t,e){const n=D(t),r={writes:e.map(t=>function(t,e){let n;if(e instanceof rn)n={update:_n(t,e.key,e.value)};else if(e instanceof on)n={delete:wn(t,e.key)};else if(e instanceof sn)n={update:_n(t,e.key,e.data),updateMask:In(e.fieldMask)};else{if(!(e instanceof an))return x(16599,{k:e.type});n={verify:wn(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(t=>function(t,e){const n=e.transform;if(n instanceof Ye)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Je)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Xe)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Ze)return{fieldPath:e.field.canonicalString(),increment:n.L};throw x(20930,{transform:e.transform})}(0,t))),e.precondition.isNone||(n.currentDocument=(r=t,void 0!==(i=e.precondition).updateTime?{updateTime:pn(r,i.updateTime)}:void 0!==i.exists?{exists:i.exists}:x(27497))),n;var r,i}(n.serializer,t))};await n.V("Commit",n.serializer.databaseId,gt.emptyPath(),r)}async function On(t,e){const n=D(t),r={documents:e.map(t=>wn(n.serializer,t))},i=await n.D("BatchGetDocuments",n.serializer.databaseId,gt.emptyPath(),r,e.length),s=new Map;i.forEach(t=>{const e=function(t,e){return"found"in e?function(t,e){F(!!e.found,43571),e.found.name,e.found.updateTime;const n=vn(t,e.found.name),r=mn(e.found.updateTime),i=e.found.createTime?mn(e.found.createTime):Ne.min(),s=new Ce({mapValue:{fields:e.found.fields}});return Me.newFoundDocument(n,r,i,s)}(t,e):"missing"in e?function(t,e){F(!!e.missing,3894),F(!!e.readTime,22933);const n=vn(t,e.missing),r=mn(e.readTime);return Me.newNoDocument(n,r)}(t,e):x(7234,{result:e})}(n.serializer,t);s.set(e.key.toString(),e)});const o=[];return e.forEach(t=>{const e=s.get(t.toString());F(!!e,55234,{key:t}),o.push(e)}),o}
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
const Rn="ComponentProvider",qn=new Map;function Cn(t){if(t._terminated)throw new H(j,"The client has already been terminated.");if(!qn.has(t)){k(Rn,"Initializing Datastore");const s=function(t){return new qt(t)}((e=t._databaseId,n=t.app.options.appId||"",r=t._persistenceKey,i=t._freezeSettings(),new it(e,n,r,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,At(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator))),o=xn(t._databaseId),a=function(t,e,n,r){return new Dn(t,e,n,r)}(t._authCredentials,t._appCheckCredentials,s,o);qn.set(t,a)}var e,n,r,i;return qn.get(t)}
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
 */const Mn="firestore.googleapis.com",Ln=!0;
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
 */class $n{constructor(t){var e,n;if(void 0===t.host){if(void 0!==t.ssl)throw new H(q,"Can't provide ssl option if host option is not set");this.host=Mn,this.ssl=Ln}else this.host=t.host,this.ssl=null!==(e=t.ssl)&&void 0!==e?e:Ln;if(this.isUsingEmulator=void 0!==t.emulatorOptions,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new H(q,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}!function(t,e,n,r){if(!0===e&&!0===r)throw new H(q,`${t} and ${n} cannot be used together.`)}("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===t.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=At(null!==(n=t.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(t){if(void 0!==t.timeoutSeconds){if(isNaN(t.timeoutSeconds))throw new H(q,`invalid long polling timeout: ${t.timeoutSeconds} (must not be NaN)`);if(t.timeoutSeconds<5)throw new H(q,`invalid long polling timeout: ${t.timeoutSeconds} (minimum allowed value is 5)`);if(t.timeoutSeconds>30)throw new H(q,`invalid long polling timeout: ${t.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(e=this.experimentalLongPollingOptions,n=t.experimentalLongPollingOptions,e.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams;var e,n}}class Un{constructor(t,e,n,r){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new $n({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new H(j,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new H(j,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new $n(t),this._emulatorOptions=t.emulatorOptions||{},void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new J;switch(t.type){case"firstParty":return new et(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new H(q,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=qn.get(t);e&&(k(Rn,"Removing Datastore"),qn.delete(t),e.terminate())}(this),Promise.resolve()}}function jn(t,e,n){n||(n=st);const r=u(t,"firestore/lite");if(r.isInitialized(n))throw new H(j,"Firestore can only be initialized once per app.");return r.initialize({options:e,instanceIdentifier:n})}function zn(t,e){const n="object"==typeof t?t:a(),r="string"==typeof t?t:e||"(default)",i=u(n,"firestore/lite").getImmediate({identifier:r});if(!i._initialized){const t=l("firestore");t&&Bn(i,...t)}return i}function Bn(t,e,a,u={}){var l;t=St(t,Un);const c=r(e),h=t._getSettings(),d=Object.assign(Object.assign({},h),{emulatorOptions:t._getEmulatorOptions()}),f=`${e}:${a}`;c&&(i(`https://${f}`),s("Firestore",!0)),h.host!==Mn&&h.host!==f&&I("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const p=Object.assign(Object.assign({},h),{host:f,ssl:c,emulatorOptions:u});if(!n(p,d)&&(t._setSettings(p),u.mockUserToken)){let e,n;if("string"==typeof u.mockUserToken)e=u.mockUserToken,n=b.MOCK_USER;else{e=o(u.mockUserToken,null===(l=t._app)||void 0===l?void 0:l.options.projectId);const r=u.mockUserToken.sub||u.mockUserToken.user_id;if(!r)throw new H(q,"mockUserToken must contain 'sub' or 'user_id' field!");n=new b(r)}t._authCredentials=new X(new Y(e,n))}}function Gn(t){return t=St(t,Un),h(t.app,"firestore/lite"),t._delete()
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
 */}class Kn{constructor(t="count",e){this._internalFieldPath=e,this.type="AggregateField",this.aggregateType=t}}class Qn{constructor(t,e,n){this._userDataWriter=e,this._data=n,this.type="AggregateQuerySnapshot",this.query=t}data(){return this._userDataWriter.convertObjectMap(this._data)}}
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
 */class Hn{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Hn(this.firestore,t,this._query)}}class Wn{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Yn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Wn(this.firestore,t,this._key)}}class Yn extends Hn{constructor(t,e,n){super(t,e,new Ue(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Wn(this.firestore,null,new vt(t))}withConverter(t){return new Yn(this.firestore,t,this._path)}}function Jn(t,n,...r){if(t=e(t),_t("collection","path",n),t instanceof Un){const e=gt.fromString(n,...r);return Tt(e),new Yn(t,null,e)}{if(!(t instanceof Wn||t instanceof Yn))throw new H(q,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const e=t._path.child(gt.fromString(n,...r));return Tt(e),new Yn(t.firestore,null,e)}}function Xn(t,e){if(t=St(t,Un),_t("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new H(q,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Hn(t,null,(n=e,new Ue(gt.emptyPath(),n)));var n}function Zn(t,n,...r){if(t=e(t),1===arguments.length&&(n=ut.newId()),_t("doc","path",n),t instanceof Un){const e=gt.fromString(n,...r);return bt(e),new Wn(t,null,new vt(e))}{if(!(t instanceof Wn||t instanceof Yn))throw new H(q,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const e=t._path.child(gt.fromString(n,...r));return bt(e),new Wn(t.firestore,t instanceof Yn?t.converter:null,new vt(e))}}function tr(t,n){return t=e(t),n=e(n),(t instanceof Wn||t instanceof Yn)&&(n instanceof Wn||n instanceof Yn)&&t.firestore===n.firestore&&t.path===n.path&&t.converter===n.converter}function er(t,n){return t=e(t),n=e(n),t instanceof Hn&&n instanceof Hn&&t.firestore===n.firestore&&function(t,e){return function(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!xe(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!ve(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!me(t.startAt,e.startAt)&&me(t.endAt,e.endAt)}(Be(t),Be(e))&&t.limitType===e.limitType}(t._query,n._query)&&t.converter===n.converter
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
 */}class nr{constructor(t){this._byteString=t}static fromBase64String(t){try{return new nr(Ut.fromBase64String(t))}catch(e){throw new H(q,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new nr(Ut.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
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
 */class rr{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new H(q,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new wt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}function ir(){return new rr(pt)}
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
 */class sr{constructor(t){this._methodName=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new H(q,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new H(q,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return lt(this._lat,t._lat)||lt(this._long,t._long)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class ar{constructor(t){this._values=(t||[]).map(t=>t)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(t[n]!==e[n])return!1;return!0}(this._values,t._values)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=/^__.*__$/;class lr{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new sn(t,this.data,this.fieldMask,e,this.fieldTransforms):new rn(t,this.data,e,this.fieldTransforms)}}class cr{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new sn(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function hr(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x(40011,{it:t})}}class dr{constructor(t,e,n,r,i,s){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.st(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get it(){return this.settings.it}ot(t){return new dr(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ut(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.ot({path:n,_t:!1});return r.ct(t),r}lt(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.ot({path:n,_t:!1});return r.st(),r}ht(t){return this.ot({path:void 0,_t:!0})}dt(t){return Dr(t,this.settings.methodName,this.settings.ft||!1,this.path,this.settings.Et)}contains(t){return void 0!==this.fieldMask.find(e=>t.isPrefixOf(e))||void 0!==this.fieldTransforms.find(e=>t.isPrefixOf(e.field))}st(){if(this.path)for(let t=0;t<this.path.length;t++)this.ct(this.path.get(t))}ct(t){if(0===t.length)throw this.dt("Document fields must not be empty");if(hr(this.it)&&ur.test(t))throw this.dt('Document fields cannot begin and end with "__"')}}class fr{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||xn(t)}Tt(t,e,n,r=!1){return new dr({it:t,methodName:e,Et:n,path:wt.emptyPath(),_t:!1,ft:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function pr(t){const e=t._freezeSettings(),n=xn(t._databaseId);return new fr(t._databaseId,!!e.ignoreUndefinedProperties,n)}function mr(t,e,n,r,i,s={}){const o=t.Tt(s.merge||s.mergeFields?2:0,e,n,i);Vr("Data must be an object, but it was:",o,r);const a=Ar(r,o);let u,l;if(s.merge)u=new qe(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){const t=[];for(const r of s.mergeFields){const i=xr(e,r,n);if(!o.contains(i))throw new H(q,`Field '${i}' is specified in your field mask but missing from your input data.`);Pr(t,i)||t.push(i)}u=new qe(t),l=o.fieldTransforms.filter(t=>u.covers(t.field))}else u=null,l=o.fieldTransforms;return new lr(new Ce(a),u,l)}class gr extends sr{_toFieldTransform(t){if(2!==t.it)throw 1===t.it?t.dt(`${this._methodName}() can only appear at the top level of your update data`):t.dt(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof gr}}function yr(t,e,n){return new dr({it:3,Et:e.settings.Et,methodName:t._methodName,_t:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class wr extends sr{_toFieldTransform(t){return new tn(t.path,new Ye)}isEqual(t){return t instanceof wr}}class vr extends sr{constructor(t,e){super(t),this.At=e}_toFieldTransform(t){const e=yr(this,t,!0),n=this.At.map(t=>kr(t,e)),r=new Je(n);return new tn(t.path,r)}isEqual(t){return t instanceof vr&&n(this.At,t.At)}}class _r extends sr{constructor(t,e){super(t),this.At=e}_toFieldTransform(t){const e=yr(this,t,!0),n=this.At.map(t=>kr(t,e)),r=new Xe(n);return new tn(t.path,r)}isEqual(t){return t instanceof _r&&n(this.At,t.At)}}class br extends sr{constructor(t,e){super(t),this.Pt=e}_toFieldTransform(t){const e=new Ze(t.serializer,He(t.serializer,this.Pt));return new tn(t.path,e)}isEqual(t){return t instanceof br&&this.Pt===t.Pt}}function Tr(t,n,r,i){const s=t.Tt(1,n,r);Vr("Data must be an object, but it was:",s,i);const o=[],a=Ce.empty();Lt(i,(t,i)=>{const u=Fr(n,t,r);i=e(i);const l=s.lt(u);if(i instanceof gr)o.push(u);else{const t=kr(i,l);null!=t&&(o.push(u),a.set(u,t))}});const u=new qe(o);return new cr(a,u,s.fieldTransforms)}function Er(t,n,r,i,s,o){const a=t.Tt(1,n,r),u=[xr(n,i,r)],l=[s];if(o.length%2!=0)throw new H(q,`Function ${n}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<o.length;e+=2)u.push(xr(n,o[e])),l.push(o[e+1]);const c=[],h=Ce.empty();for(let f=u.length-1;f>=0;--f)if(!Pr(c,u[f])){const t=u[f];let n=l[f];n=e(n);const r=a.lt(t);if(n instanceof gr)c.push(t);else{const e=kr(n,r);null!=e&&(c.push(t),h.set(t,e))}}const d=new qe(c);return new cr(h,d,a.fieldTransforms)}function Sr(t,e,n,r=!1){return kr(n,t.Tt(r?4:3,e))}function kr(t,n){if(Ir(t=e(t)))return Vr("Unsupported field value:",n,t),Ar(t,n);if(t instanceof sr)return function(t,e){if(!hr(e.it))throw e.dt(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.dt(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,n),null;if(void 0===t&&n.ignoreUndefinedProperties)return null;if(n.path&&n.fieldMask.push(n.path),t instanceof Array){if(n.settings._t&&4!==n.it)throw n.dt("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const i of t){let t=kr(i,e.ht(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,n)}return function(t,n){if(null===(t=e(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return He(n.serializer,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const e=Ht.fromDate(t);return{timestampValue:dn(n.serializer,e)}}if(t instanceof Ht){const e=new Ht(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:dn(n.serializer,e)}}if(t instanceof or)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof nr)return{bytesValue:fn(n.serializer,t._byteString)};if(t instanceof Wn){const e=n.databaseId,r=t.firestore._databaseId;if(!r.isEqual(e))throw n.dt(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${e.projectId}/${e.database}`);return{referenceValue:gn(t.firestore._databaseId||n.databaseId,t._key.path)}}if(t instanceof ar)return r=t,i=n,{mapValue:{fields:{[Xt]:{stringValue:te},[ee]:{arrayValue:{values:r.toArray().map(t=>{if("number"!=typeof t)throw i.dt("VectorValues must only contain numeric values.");return Qe(i.serializer,t)})}}}}};var r,i;throw n.dt(`Unsupported field value: ${Et(t)}`)}(t,n)}function Ar(t,e){const n={};return function(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Lt(t,(t,r)=>{const i=kr(r,e.ut(t));null!=i&&(n[t]=i)}),{mapValue:{fields:n}}}function Ir(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof Ht||t instanceof or||t instanceof nr||t instanceof Wn||t instanceof sr||t instanceof ar)}function Vr(t,e,n){if(!Ir(n)||("object"!=typeof(r=n)||null===r||Object.getPrototypeOf(r)!==Object.prototype&&null!==Object.getPrototypeOf(r))){const r=Et(n);throw"an object"===r?e.dt(t+" a custom object"):e.dt(t+" "+r)}var r}function xr(t,n,r){if((n=e(n))instanceof rr)return n._internalPath;if("string"==typeof n)return Fr(t,n);throw Dr("Field path arguments must be of type string or ",t,!1,void 0,r)}const Nr=new RegExp("[~\\*/\\[\\]]");function Fr(t,e,n){if(e.search(Nr)>=0)throw Dr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new rr(...e.split("."))._internalPath}catch(r){throw Dr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Dr(t,e,n,r,i){const s=r&&!r.isEmpty(),o=void 0!==i;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new H(q,a+t+u)}function Pr(t,e){return t.some(t=>t.isEqual(e))}
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
 */class Or{constructor(t,e,n,r,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Wn(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new Rr(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Mr("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class Rr extends Or{data(){return super.data()}}class qr{constructor(t,e){this._docs=e,this.query=t}get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return 0===this.docs.length}forEach(t,e){this._docs.forEach(t,e)}}function Cr(t,n){return t=e(t),n=e(n),t instanceof Or&&n instanceof Or?t._firestore===n._firestore&&t._key.isEqual(n._key)&&(null===t._document?null===n._document:t._document.isEqual(n._document))&&t._converter===n._converter:t instanceof qr&&n instanceof qr&&er(t.query,n.query)&&ft(t.docs,n.docs,Cr)}function Mr(t,e){return"string"==typeof e?Fr(t,e):e instanceof rr?e._internalPath:e._delegate._internalPath}
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
 */class Lr{}class $r extends Lr{}function Ur(t,e,...n){let r=[];e instanceof Lr&&r.push(e),r=r.concat(n),function(t){const e=t.filter(t=>t instanceof Br).length,n=t.filter(t=>t instanceof jr).length;if(e>1||e>0&&n>0)throw new H(q,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)t=i._apply(t);return t}class jr extends $r{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new jr(t,e,n)}_apply(t){const e=this._parse(t);return ai(t._query,e),new Hn(t.firestore,t.converter,Ke(t._query,e))}_parse(t){const e=pr(t.firestore);return function(t,e,n,r,i,s,o){let a;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new H(q,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){oi(o,s);const e=[];for(const n of o)e.push(si(r,t,n));a={arrayValue:{values:e}}}else a=si(r,t,o)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||oi(o,s),a=Sr(n,e,o,"in"===s||"not-in"===s);return ye.create(i,s,a)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function zr(t,e,n){const r=e,i=Mr("where",t);return jr._create(i,r,n)}class Br extends Lr{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Br(t,e)}_parse(t){const e=this._queryConstraints.map(e=>e._parse(t)).filter(t=>t.getFilters().length>0);return 1===e.length?e[0]:we.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return 0===e.getFilters().length?t:(function(t,e){let n=t;const r=e.getFlattenedFilters();for(const i of r)ai(n,i),n=Ke(n,i)}(t._query,e),new Hn(t.firestore,t.converter,Ke(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}function Gr(...t){return t.forEach(t=>ui("or",t)),Br._create("or",t)}function Kr(...t){return t.forEach(t=>ui("and",t)),Br._create("and",t)}class Qr extends $r{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Qr(t,e)}_apply(t){const e=function(t,e,n){if(null!==t.startAt)throw new H(q,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==t.endAt)throw new H(q,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ve(e,n)}(t._query,this._field,this._direction);return new Hn(t.firestore,t.converter,function(t,e){const n=t.explicitOrderBy.concat([e]);return new Ue(t.path,t.collectionGroup,n,t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(t._query,e))}}function Hr(t,e="asc"){const n=e,r=Mr("orderBy",t);return Qr._create(r,n)}class Wr extends $r{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new Wr(t,e,n)}_apply(t){return new Hn(t.firestore,t.converter,(e=t._query,n=this._limit,r=this._limitType,new Ue(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),n,r,e.startAt,e.endAt)));var e,n,r}}function Yr(t){return kt("limit",t),Wr._create("limit",t,"F")}function Jr(t){return kt("limitToLast",t),Wr._create("limitToLast",t,"L")}class Xr extends $r{constructor(t,e,n){super(),this.type=t,this._docOrFields=e,this._inclusive=n}static _create(t,e,n){return new Xr(t,e,n)}_apply(t){const e=ii(t,this.type,this._docOrFields,this._inclusive);return new Hn(t.firestore,t.converter,(n=t._query,r=e,new Ue(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,r,n.endAt)));var n,r}}function Zr(...t){return Xr._create("startAt",t,!0)}function ti(...t){return Xr._create("startAfter",t,!1)}class ei extends $r{constructor(t,e,n){super(),this.type=t,this._docOrFields=e,this._inclusive=n}static _create(t,e,n){return new ei(t,e,n)}_apply(t){const e=ii(t,this.type,this._docOrFields,this._inclusive);return new Hn(t.firestore,t.converter,(n=t._query,r=e,new Ue(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,n.startAt,r)));var n,r}}function ni(...t){return ei._create("endBefore",t,!1)}function ri(...t){return ei._create("endAt",t,!0)}function ii(t,n,r,i){if(r[0]=e(r[0]),r[0]instanceof Or)return function(t,e,n,r,i){if(!r)throw new H(M,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);const s=[];for(const o of ze(t))if(o.field.isKeyField())s.push(ue(e,r.key));else{const t=r.data.field(o.field);if(Wt(t))throw new H(q,'Invalid query. You are trying to start or end a query using a document for which the field "'+o.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===t){const t=o.field.canonicalString();throw new H(q,`Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`)}s.push(t)}return new pe(s,i)}(t._query,t.firestore._databaseId,n,r[0]._document,i);{const e=pr(t.firestore);return function(t,e,n,r,i,s){const o=t.explicitOrderBy;if(i.length>o.length)throw new H(q,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const a=[];for(let u=0;u<i.length;u++){const s=i[u];if(o[u].field.isKeyField()){if("string"!=typeof s)throw new H(q,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof s}`);if(!je(t)&&-1!==s.indexOf("/"))throw new H(q,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${s}' contains a slash.`);const n=t.path.child(gt.fromString(s));if(!vt.isDocumentKey(n))throw new H(q,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);const i=new vt(n);a.push(ue(e,i))}else{const t=Sr(n,r,s);a.push(t)}}return new pe(a,s)}(t._query,t.firestore._databaseId,e,n,r,i)}}function si(t,n,r){if("string"==typeof(r=e(r))){if(""===r)throw new H(q,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!je(n)&&-1!==r.indexOf("/"))throw new H(q,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${r}' contains a '/' character.`);const e=n.path.child(gt.fromString(r));if(!vt.isDocumentKey(e))throw new H(q,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${e}' is not because it has an odd number of segments (${e.length}).`);return ue(t,new vt(e))}if(r instanceof Wn)return ue(t,r._key);throw new H(q,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Et(r)}.`)}function oi(t,e){if(!Array.isArray(t)||0===t.length)throw new H(q,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function ai(t,e){const n=function(t,e){for(const n of t)for(const t of n.getFlattenedFilters())if(e.indexOf(t.op)>=0)return t.op;return null}(t.filters,function(t){switch(t){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(null!==n)throw n===e.op?new H(q,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new H(q,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}function ui(t,e){if(!(e instanceof jr||e instanceof Br))throw new H(q,`Function ${t}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class li{convertValue(t,e="none"){switch(ne(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Bt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Gt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw x(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Lt(t,(t,r)=>{n[t]=this.convertValue(r,e)}),n}convertVectorValue(t){var e,n,r;const i=null===(r=null===(n=null===(e=t.fields)||void 0===e?void 0:e[ee].arrayValue)||void 0===n?void 0:n.values)||void 0===r?void 0:r.map(t=>Bt(t.doubleValue));return new ar(i)}convertGeoPoint(t){return new or(Bt(t.latitude),Bt(t.longitude))}convertArray(t,e){return(t.values||[]).map(t=>this.convertValue(t,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=Yt(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Jt(t));default:return null}}convertTimestamp(t){const e=zt(t);return new Ht(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=gt.fromString(t);F(Vn(n),9688,{name:t});const r=new ot(n.get(1),n.get(3)),i=new vt(n.popFirst(5));return r.isEqual(e)||A(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}
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
 */function ci(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class hi extends li{constructor(t){super(),this.firestore=t}convertBytes(t){return new nr(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Wn(this.firestore,null,e)}}function di(t){const e=Cn((t=St(t,Wn)).firestore),n=new hi(t.firestore);return On(e,[t._key]).then(e=>{F(1===e.length,15618);const r=e[0];return new Or(t.firestore,n,t._key,r.isFoundDocument()?r:null,t.converter)})}function fi(t){!function(t){if("L"===t.limitType&&0===t.explicitOrderBy.length)throw new H(G,"limitToLast() queries require specifying at least one orderBy() clause")}((t=St(t,Hn))._query);const e=Cn(t.firestore),n=new hi(t.firestore);return async function(t,e){const n=D(t),{M:r,parent:i}=bn(n.serializer,Be(e));return(await n.D("RunQuery",n.serializer.databaseId,i,{structuredQuery:r.structuredQuery})).filter(t=>!!t.document).map(t=>function(t,e,n){const r=vn(t,e.name),i=mn(e.updateTime),s=e.createTime?mn(e.createTime):Ne.min(),o=new Ce({mapValue:{fields:e.fields}}),a=Me.newFoundDocument(r,i,s,o);return n?a.setHasCommittedMutations():a}(n.serializer,t.document,void 0))}(e,t._query).then(e=>{const r=e.map(e=>new Rr(t.firestore,n,e.key,e,t.converter));return"L"===t._query.limitType&&r.reverse(),new qr(t,r)})}function pi(t,e,n){const r=ci((t=St(t,Wn)).converter,e,n),i=mr(pr(t.firestore),"setDoc",t._key,r,null!==t.converter,n);return Pn(Cn(t.firestore),[i.toMutation(t._key,en.none())])}function mi(t,n,r,...i){const s=pr((t=St(t,Wn)).firestore);let o;return o="string"==typeof(n=e(n))||n instanceof rr?Er(s,"updateDoc",t._key,n,r,i):Tr(s,"updateDoc",t._key,n),Pn(Cn(t.firestore),[o.toMutation(t._key,en.exists(!0))])}function gi(t){return Pn(Cn((t=St(t,Wn)).firestore),[new on(t._key,en.none())])}function yi(t,e){const n=Zn(t=St(t,Yn)),r=ci(t.converter,e),i=mr(pr(t.firestore),"addDoc",n._key,r,null!==n.converter,{});return Pn(Cn(t.firestore),[i.toMutation(n._key,en.exists(!1))]).then(()=>n)}
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
 */function wi(t){return vi(t,{count:Ti()})}function vi(t,e){const n=St(t.firestore,Un),r=Cn(n),i=function(t,e){const n=[];for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.push(e(t[r],r,t));return n}(e,(t,e)=>new Ct(e,t.aggregateType,t._internalFieldPath));return async function(t,e,n){var r;const i=D(t),{request:s,nt:o,parent:a}=function(t,e,n){const{M:r,parent:i}=bn(t,e),s={},o=[];let a=0;return n.forEach(t=>{const e="aggregate_"+a++;s[e]=t.alias,"count"===t.aggregateType?o.push({alias:e,count:{}}):"avg"===t.aggregateType?o.push({alias:e,avg:{field:kn(t.fieldPath)}}):"sum"===t.aggregateType&&o.push({alias:e,sum:{field:kn(t.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:o,structuredQuery:r.structuredQuery},parent:r.parent},nt:s,parent:i}}(i.serializer,function(t){const e=D(t);return e.$||(e.$=Ge(e,t.explicitOrderBy)),e.$}(e),n);i.connection.A||delete s.parent;const u=(await i.D("RunAggregationQuery",i.serializer.databaseId,a,s,1)).filter(t=>!!t.result);F(1===u.length,64727);const l=null===(r=u[0].result)||void 0===r?void 0:r.aggregateFields;return Object.keys(l).reduce((t,e)=>(t[o[e]]=l[e],t),{})}(r,t._query,i).then(e=>function(t,e,n){const r=new hi(t);return new Qn(e,r,n)}(n,t,e))}function _i(t){return new Kn("sum",xr("sum",t))}function bi(t){return new Kn("avg",xr("average",t))}function Ti(){return new Kn("count")}function Ei(t,e){var n,r;return t instanceof Kn&&e instanceof Kn&&t.aggregateType===e.aggregateType&&(null===(n=t._internalFieldPath)||void 0===n?void 0:n.canonicalString())===(null===(r=e._internalFieldPath)||void 0===r?void 0:r.canonicalString())}function Si(t,e){return er(t.query,e.query)&&n(t.data(),e.data())}
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
 */function ki(){return new gr("deleteField")}function Ai(){return new wr("serverTimestamp")}function Ii(...t){return new vr("arrayUnion",t)}function Vi(...t){return new _r("arrayRemove",t)}function xi(t){return new br("increment",t)}function Ni(t){return new ar(t)}
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
 */class Fi{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=pr(t)}set(t,e,n){this._verifyNotCommitted();const r=Di(t,this._firestore),i=ci(r.converter,e,n),s=mr(this._dataReader,"WriteBatch.set",r._key,i,null!==r.converter,n);return this._mutations.push(s.toMutation(r._key,en.none())),this}update(t,n,r,...i){this._verifyNotCommitted();const s=Di(t,this._firestore);let o;return o="string"==typeof(n=e(n))||n instanceof rr?Er(this._dataReader,"WriteBatch.update",s._key,n,r,i):Tr(this._dataReader,"WriteBatch.update",s._key,n),this._mutations.push(o.toMutation(s._key,en.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=Di(t,this._firestore);return this._mutations=this._mutations.concat(new on(e._key,en.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new H(j,"A write batch can no longer be used after commit() has been called.")}}function Di(t,n){if((t=e(t)).firestore!==n)throw new H(q,"Provided document reference is from a different Firestore instance.");return t}function Pi(t){const e=Cn(t=St(t,Un));return new Fi(t,t=>Pn(e,t))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new H(q,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await On(this.datastore,t);return e.forEach(t=>this.recordVersion(t)),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(t.toString())}delete(t){this.write(new on(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach(e=>{t.delete(e.key.toString())}),t.forEach((t,e)=>{const n=vt.fromPath(e);this.mutations.push(new an(n,this.precondition(n)))}),await Pn(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw x(50498,{Rt:t.constructor.name});e=Ne.min()}const n=this.readVersions.get(t.key.toString());if(n){if(!e.isEqual(n))throw new H(z,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(Ne.min())?en.exists(!1):en.updateTime(e):en.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(Ne.min()))throw new H(q,"Can't update a document that doesn't exist.");return en.updateTime(e)}return en.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}
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
 */const Ri={maxAttempts:5};
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
 */class qi{constructor(t,e,n,r,i){this.asyncQueue=t,this.datastore=e,this.options=n,this.updateFunction=r,this.deferred=i,this.It=n.maxAttempts,this.Vt=new Nn(this.asyncQueue,"transaction_retry")}yt(){this.It-=1,this.gt()}gt(){this.Vt.Z(async()=>{const t=new Oi(this.datastore),e=this.wt(t);e&&e.then(e=>{this.asyncQueue.enqueueAndForget(()=>t.commit().then(()=>{this.deferred.resolve(e)}).catch(t=>{this.Ft(t)}))}).catch(t=>{this.Ft(t)})})}wt(t){try{const e=this.updateFunction(t);return!Vt(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Ft(t){this.It>0&&this.vt(t)?(this.It-=1,this.asyncQueue.enqueueAndForget(()=>(this.gt(),Promise.resolve()))):this.deferred.reject(t)}vt(t){if("FirebaseError"===t.name){const e=t.code;return"aborted"===e||"failed-precondition"===e||"already-exists"===e||!function(t){switch(t){case P:return x(64938);case O:case R:case C:case U:case K:case Q:case $:return!1;case q:case M:case"already-exists":case L:case j:case z:case B:case G:case"data-loss":return!0;default:return x(15467,{code:t})}}(e)}return!1}}
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
 */function Ci(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(t,e,n,r,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new W,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(t=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,r,i){const s=Date.now()+n,o=new Mi(t,e,s,r,i);return o.start(n),o}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new H(O,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}
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
 */const Li="AsyncQueue";class $i{constructor(t=Promise.resolve()){this.Dt=[],this.bt=!1,this.Ct=[],this.St=null,this.Nt=!1,this.Ot=!1,this.qt=[],this.Vt=new Nn(this,"async_queue_retry"),this.Bt=()=>{const t=Ci();t&&k(Li,"Visibility state changed to "+t.visibilityState),this.Vt.tt()},this.$t=t;const e=Ci();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Bt)}get isShuttingDown(){return this.bt}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Qt(),this.Lt(t)}enterRestrictedMode(t){if(!this.bt){this.bt=!0,this.Ot=t||!1;const e=Ci();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.Bt)}}enqueue(t){if(this.Qt(),this.bt)return new Promise(()=>{});const e=new W;return this.Lt(()=>this.bt&&this.Ot?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Dt.push(t),this.kt()))}async kt(){if(0!==this.Dt.length){try{await this.Dt[0](),this.Dt.shift(),this.Vt.reset()}catch(t){if("IndexedDbTransactionError"!==t.name)throw t;k(Li,"Operation failed with retryable error: "+t)}this.Dt.length>0&&this.Vt.Z(()=>this.kt())}}Lt(t){const e=this.$t.then(()=>(this.Nt=!0,t().catch(t=>{throw this.St=t,this.Nt=!1,A("INTERNAL UNHANDLED ERROR: ",Ui(t)),t}).then(t=>(this.Nt=!1,t))));return this.$t=e,e}enqueueAfterDelay(t,e,n){this.Qt(),this.qt.indexOf(t)>-1&&(e=0);const r=Mi.createAndSchedule(this,t,e,n,t=>this.Mt(t));return this.Ct.push(r),r}Qt(){this.St&&x(47125,{Ut:Ui(this.St)})}verifyOperationInProgress(){}async xt(){let t;do{t=this.$t,await t}while(t!==this.$t)}jt(t){for(const e of this.Ct)if(e.timerId===t)return!0;return!1}zt(t){return this.xt().then(()=>{this.Ct.sort((t,e)=>t.targetTimeMs-e.targetTimeMs);for(const e of this.Ct)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.xt()})}Wt(t){this.qt.push(t)}Mt(t){const e=this.Ct.indexOf(t);this.Ct.splice(e,1)}}function Ui(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e
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
 */}class ji{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=pr(t)}get(t){const e=Di(t,this._firestore),n=new hi(this._firestore);return this._transaction.lookup([e._key]).then(t=>{if(!t||1!==t.length)return x(24041);const r=t[0];if(r.isFoundDocument())return new Or(this._firestore,n,r.key,r,e.converter);if(r.isNoDocument())return new Or(this._firestore,n,e._key,null,e.converter);throw x(18433,{doc:r})})}set(t,e,n){const r=Di(t,this._firestore),i=ci(r.converter,e,n),s=mr(this._dataReader,"Transaction.set",r._key,i,null!==r.converter,n);return this._transaction.set(r._key,s),this}update(t,n,r,...i){const s=Di(t,this._firestore);let o;return o="string"==typeof(n=e(n))||n instanceof rr?Er(this._dataReader,"Transaction.update",s._key,n,r,i):Tr(this._dataReader,"Transaction.update",s._key,n),this._transaction.update(s._key,o),this}delete(t){const e=Di(t,this._firestore);return this._transaction.delete(e._key),this}}function zi(t,e,n){const r=Cn(t=St(t,Un)),i=Object.assign(Object.assign({},Ri),n);!function(t){if(t.maxAttempts<1)throw new H(q,"Max attempts must be at least 1")}(i);const s=new W;return new qi(new $i,r,i,n=>e(new ji(t,n)),s).yt(),s.promise}T=`${f}_lite`,p(new m("firestore/lite",(t,{instanceIdentifier:e,options:n})=>{const r=t.getProvider("app").getImmediate(),i=new Un(new Z(t.getProvider("auth-internal")),new rt(r,t.getProvider("app-check-internal")),function(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new H(q,'"projectId" not provided in firebase.initializeApp.');return new ot(t.options.projectId,e)}(r,e),r);return n&&i._setSettings(n),i},"PUBLIC").setMultipleInstances(!0)),g("firestore-lite",_,""),g("firestore-lite",_,"esm2017");export{Kn as AggregateField,Qn as AggregateQuerySnapshot,nr as Bytes,Yn as CollectionReference,Wn as DocumentReference,Or as DocumentSnapshot,rr as FieldPath,sr as FieldValue,Un as Firestore,H as FirestoreError,or as GeoPoint,Hn as Query,Br as QueryCompositeFilterConstraint,$r as QueryConstraint,Rr as QueryDocumentSnapshot,ei as QueryEndAtConstraint,jr as QueryFieldFilterConstraint,Wr as QueryLimitConstraint,Qr as QueryOrderByConstraint,qr as QuerySnapshot,Xr as QueryStartAtConstraint,Ht as Timestamp,ji as Transaction,ar as VectorValue,Fi as WriteBatch,yi as addDoc,Ei as aggregateFieldEqual,Si as aggregateQuerySnapshotEqual,Kr as and,Vi as arrayRemove,Ii as arrayUnion,bi as average,Jn as collection,Xn as collectionGroup,Bn as connectFirestoreEmulator,Ti as count,gi as deleteDoc,ki as deleteField,Zn as doc,ir as documentId,ri as endAt,ni as endBefore,vi as getAggregate,wi as getCount,di as getDoc,fi as getDocs,zn as getFirestore,xi as increment,jn as initializeFirestore,Yr as limit,Jr as limitToLast,Gr as or,Hr as orderBy,Ur as query,er as queryEqual,tr as refEqual,zi as runTransaction,Ai as serverTimestamp,pi as setDoc,S as setLogLevel,Cr as snapshotEqual,ti as startAfter,Zr as startAt,_i as sum,Gn as terminate,mi as updateDoc,Ni as vector,zr as where,Pi as writeBatch};
